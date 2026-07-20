import type { FilterOptions } from './Filters';
import type { LithiumXNode } from './Node';

/** Handles the requests sent to the Lavalink REST API. */
class LithiumXRest {
	/** The Node that this Rest instance is connected to. */
	private node: LithiumXNode;
	/** The ID of the current session. */
	private sessionId: string | null;
	/** The password for the Node. */
	private readonly password: string;

	constructor(node: LithiumXNode) {
		this.node = node;
		this.sessionId = node.sessionId;
		this.password = node.options.password ?? 'youshallnotpass';
	}

	/**
	 * Sets the session ID.
	 * @returns {string} Returns the session ID.
	 */
	public setSessionId(sessionId: string): string {
		this.sessionId = sessionId;
		return this.sessionId;
	}

	/** Retrieves all the players that are currently running on the node. */
	public async getAllPlayers(): Promise<unknown> {
		return await this.get(`/v4/sessions/${this.sessionId}/players`);
	}

	/** Sends a PATCH request to update player related data. */
	public async updatePlayer(options: playOptions): Promise<unknown> {
		return await this.patch(`/v4/sessions/${this.sessionId}/players/${options.guildId}?noReplace=false`, options.data);
	}

	/** Sends a DELETE request to the server to destroy the player. */
	public async destroyPlayer(guildId: string): Promise<void> {
		await this.delete(`/v4/sessions/${this.sessionId}/players/${guildId}`);
	}

	// Add method to apply filters
	public async applyFilters(guildId: string, filters: FilterOptions): Promise<void> {
		await this.updatePlayer({
			guildId,
			data: {
				filters,
			},
		});
	}

	/* Sends a GET request to the specified endpoint and returns the response data. */
	private async request<T>(method: Method, endpoint: string, body?: unknown): Promise<T | null> {
		const config: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.password,
			},
			body: body ? JSON.stringify(body) : null,
		};
		try {
			const response = await fetch(`http${this.node.options.secure ? 's' : ''}://${this.node.options.host}:${this.node.options.port}${endpoint}`, config);
			const contentType = response.headers.get('content-type');
			if (!contentType?.includes('application/json')) {
				return response.status >= 200 && response.status < 300 ? ({} as T) : null;
			}
			const text = await response.text();
			if (!text || text.trim() === '') return {} as T;
			return JSON.parse(text) as T;
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : String(error);
			console.error(`REST Error (${method} ${endpoint}):`, message);
			if (error instanceof Error) {
				const httpError = error as Error & { response?: { status?: number } };
				if (httpError.response?.status === 404) {
					this.node.destroy();
					this.node.manager.createNode(this.node.options).connect();
				}
			}
			return null;
		}
	}

	/* Sends a GET request to the specified endpoint and returns the response data. */
	public async get<T = unknown>(endpoint: string): Promise<T | null> {
		return await this.request<T>('GET', endpoint);
	}

	/* Sends a PATCH request to the specified endpoint and returns the response data. */
	public async patch<T = unknown>(endpoint: string, body: unknown): Promise<T | null> {
		return await this.request<T>('PATCH', endpoint, body);
	}

	/* Sends a POST request to the specified endpoint and returns the response data. */
	public async post<T = unknown>(endpoint: string, body: unknown): Promise<T | null> {
		return await this.request<T>('POST', endpoint, body);
	}

	/* Sends a DELETE request to the specified endpoint and returns the response data. */
	public async delete<T = unknown>(endpoint: string): Promise<T | null> {
		return await this.request<T>('DELETE', endpoint);
	}
}

interface playOptions {
	guildId: string;
	data: {
		/** The base64 encoded track. `null` stops the currently playing track. */
		encodedTrack?: string | null;
		/** The track ID. */
		identifier?: string;
		/** The track time to start at. */
		startTime?: number;
		/** The track time to end at. */
		endTime?: number;
		/** The player volume level. */
		volume?: number;
		/** The player position in a track. */
		position?: number;
		/** Whether the player is paused. */
		paused?: boolean;
		/** The audio effects. */
		filters?: object;
		/** voice payload. */
		voice?: {
			token: string;
			sessionId: string;
			endpoint: string;
			channelId: string;
		};
		/** Whether to not replace the track if a play payload is sent. */
		noReplace?: boolean;
	};
}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export { LithiumXRest, type Method };
