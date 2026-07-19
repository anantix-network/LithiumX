# Storage

LithiumX provides a pluggable storage system for persisting player state, analytics data, and saved queues. All storage implementations follow the `StorageStrategy` interface.

## Interface

```typescript
interface StorageStrategy {
    save(key: string, data: unknown): Promise<void>;
    load(key: string): Promise<unknown>;
    delete(key: string): Promise<void>;
    getAll(): Promise<string[]>;
}
```

## Built-in Strategies

### MemoryStorage (default)

In-process memory storage. Data is lost when the process exits. Suitable for single-instance deployments or when persistence is not required.

```typescript
import { MemoryStorage } from 'lithiumx';

const storage = new MemoryStorage();
```

### RedisStorage

Persistent storage using Redis. Suitable for multi-instance deployments or when state must survive restarts.

```typescript
import { RedisStorage } from 'lithiumx';

const storage = new RedisStorage('redis://localhost:6379', 'lithium:player:');
```

**Constructor parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `redisUrl` | `string` | — | Redis connection URL |
| `prefix` | `string` | `'lithium:player:'` | Key prefix for namespacing |

## Usage in Components

### Player Auto-Resume

```typescript
const manager = new LithiumXManager({
    nodes: [{
        host: 'localhost',
        port: 2333,
        password: 'youshallnotpass',
        autoResume: true,
        autoResumeInterval: 60000,
        storageStrategy: 'memory',  // or omit for default
    }],
    // ...
});
```

### Analytics

```typescript
import { Analytics, RedisStorage } from 'lithiumx';

const analytics = new Analytics(manager, {
    storage: new RedisStorage('redis://localhost:6379', 'lithium:analytics:'),
    saveInterval: 300000,  // save every 5 minutes
    historyRetention: 30,  // keep 30 days of history
    trackUsers: true,
});
```

### Queue Storage

```typescript
import { QueueManager, RedisStorage } from 'lithiumx';

const queueManager = new QueueManager(manager, {
    storage: new RedisStorage('redis://localhost:6379', 'lithium:queue:'),
});
```

## Custom Storage

Implement the `StorageStrategy` interface to create custom backends (e.g., SQLite, PostgreSQL, S3):

```typescript
import type { StorageStrategy } from 'lithiumx';

class MyStorage implements StorageStrategy {
    async save(key: string, data: unknown): Promise<void> {
        // your implementation
    }
    async load(key: string): Promise<unknown> {
        // your implementation
    }
    async delete(key: string): Promise<void> {
        // your implementation
    }
    async getAll(): Promise<string[]> {
        // your implementation
    }
}
```
