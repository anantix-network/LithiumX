import { StorageStrategy } from '../Structures/Node';
import Redis from 'ioredis';

export class RedisStorage implements StorageStrategy {
    private client: Redis;
    private prefix: string;
    private connected: boolean = false;

    constructor(redisUrl: string, prefix: string = 'lithium:player:') {
        this.client = new Redis(redisUrl);
        this.prefix = prefix;
        this.setupConnection();
    }

    private setupConnection(): void {
        this.client.on('connect', () => {
            this.connected = true;
        });

        this.client.on('error', (err) => {
            console.error('Redis connection error:', err);
        });
    }

    private async ensureConnection(): Promise<void> {
        if (!this.connected) {
            // Wait for connection if still connecting
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (this.connected) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
            });
        }
    }

    async save(key: string, data: unknown): Promise<void> {
        await this.ensureConnection();
        const fullKey = `${this.prefix}${key}`;
        await this.client.set(fullKey, JSON.stringify(data));
        if ((data as any).autoResumeMaxAge) await this.client.expire(fullKey, Math.floor((data as any).autoResumeMaxAge / 1000));
    }

    async load(key: string): Promise<any> {
        await this.ensureConnection();
        const data = await this.client.get(`${this.prefix}${key}`);
        return data ? JSON.parse(data) : null;
    }

    async delete(key: string): Promise<void> {
        await this.ensureConnection();
        await this.client.del(`${this.prefix}${key}`);
    }

    async getAll(): Promise<string[]> {
        await this.ensureConnection();
        const keys = await this.client.keys(`${this.prefix}*`);
        return keys.map(k => k.substring(this.prefix.length));
    }

    async disconnect(): Promise<void> {
        if (this.connected) {
            await this.client.quit();
            this.connected = false;
        }
    }
}
