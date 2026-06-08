import type { LithiumXManager } from './Manager';
import { MemoryStorage, type StorageStrategy } from './Node';
import type { LithiumXPlayer, Track, UnresolvedTrack } from './Player';

/**
 * Interface for saved queue data
 */
export interface SavedQueue {
	/** Unique identifier for the queue */
	id: string;
	/** Name of the saved queue */
	name: string;
	/** Tracks in the queue */
	tracks: (Track | UnresolvedTrack)[];
	/** User who saved the queue */
	savedBy: string;
	/** When the queue was saved */
	savedAt: number;
	/** Guild ID where the queue was saved from */
	sourceGuild: string;
	/** Custom metadata for the queue */
	metadata?: Record<string, unknown>;
}

/**
 * Options for queue saving
 */
export interface SaveQueueOptions {
	/** Custom name for the saved queue */
	name?: string;
	/** Whether to include the current playing track */
	includeCurrentTrack?: boolean;
	/** Custom metadata to store with the queue */
	metadata?: Record<string, unknown>;
	/** Whether this is a global queue (available to all guilds) */
	global?: boolean;
	/** Override existing queue with same ID */
	override?: boolean;
}

/**
 * Options for queue loading
 */
export interface LoadQueueOptions {
	/** Whether to clear the existing queue before loading */
	clearExisting?: boolean;
	/** Whether to start playing immediately */
	startPlaying?: boolean;
	/** Whether to shuffle the loaded queue */
	shuffle?: boolean;
	/** Position to insert tracks (default: end) */
	position?: number;
}

/**
 * Result of queue operations
 */
export interface QueueOperationResult {
	/** Whether the operation was successful */
	success: boolean;
	/** The queue that was operated on */
	queue?: SavedQueue;
	/** Any error message if failed */
	error?: string;
	/** Number of tracks affected */
	trackCount?: number;
}

/**
 * Queue management system for saving and loading queues
 */
export class QueueManager {
	private manager: LithiumXManager;
	private storage: StorageStrategy;

	/**
	 * Create a new Queue Manager
	 * @param manager The LithiumX manager instance
	 * @param options Configuration options
	 */
	constructor(manager: LithiumXManager, options: QueueManagerOptions = {}) {
		this.manager = manager;
		this.storage = options.storage ?? new MemoryStorage();
	}

	/**
	 * Save the current queue to storage
	 * @param player The player containing the queue
	 * @param options Save options
	 */
	public async saveQueue(player: LithiumXPlayer, options: SaveQueueOptions = {}): Promise<QueueOperationResult> {
		try {
			if (player.queue.totalSize === 0 && !player.queue.current) {
				return {
					success: false,
					error: 'Queue is empty',
				};
			}

			const queueName = options.name || `Queue-${Date.now()}`;
			const queueId = `queue-${player.guild}-${Date.now()}`;

			// Get all tracks from the queue
			const tracks = [...player.queue];

			// Add current track if requested
			if (options.includeCurrentTrack && player.queue.current) {
				tracks.unshift(player.queue.current);
			}

			if (tracks.length === 0) {
				return {
					success: false,
					error: 'No tracks to save',
				};
			}

			const savedBy = player.get<string>('requester') || 'Unknown';

			// Create saved queue data
			const savedQueue: SavedQueue = {
				id: queueId,
				name: queueName,
				tracks: tracks,
				savedBy,
				savedAt: Date.now(),
				sourceGuild: player.guild,
				...(options.metadata !== undefined ? { metadata: options.metadata } : {}),
			};

			// Check if queue with same name exists for this guild
			const existingQueues = await this.listQueues(player.guild);
			const existingQueue = existingQueues.find((q) => q.name === queueName);

			if (existingQueue && !options.override) {
				return {
					success: false,
					error: `Queue with name "${queueName}" already exists`,
				};
			}

			// If it exists and override is true, delete the old one first
			if (existingQueue && options.override) {
				await this.deleteQueue(existingQueue.id, player.guild);
			}

			// Save the queue
			const storagePath = options.global ? 'global' : player.guild;
			await this.storage.save(`${storagePath}/${queueId}`, savedQueue);

			this.manager.emit('QueueSaved', player, savedQueue);

			return {
				success: true,
				queue: savedQueue,
				trackCount: tracks.length,
			};
		} catch (error: unknown) {
			console.error('Error saving queue:', error);
			return {
				success: false,
				error: `Failed to save queue: ${error instanceof Error ? error.message : String(error)}`,
			};
		}
	}

	/**
	 * Load a saved queue into a player
	 * @param queueId The saved queue ID to load
	 * @param player The player to load the queue into
	 * @param options Load options
	 */
	public async loadQueue(queueId: string, player: LithiumXPlayer, options: LoadQueueOptions = {}): Promise<QueueOperationResult> {
		try {
			// Try to find the queue in guild-specific storage first
			let savedQueue: SavedQueue;

			try {
				// Try guild-specific queue first
				savedQueue = (await this.storage.load(`${player.guild}/${queueId}`)) as SavedQueue;
			} catch {
				try {
					// Try global queue if guild-specific not found
					savedQueue = (await this.storage.load(`global/${queueId}`)) as SavedQueue;
				} catch {
					return {
						success: false,
						error: `Queue with ID "${queueId}" not found`,
					};
				}
			}

			if (!savedQueue?.tracks || !Array.isArray(savedQueue.tracks)) {
				return {
					success: false,
					error: 'Invalid queue data',
				};
			}

			// Clear existing queue if requested
			if (options.clearExisting) {
				player.queue.clear();
			}

			const tracks = [...savedQueue.tracks];

			// Shuffle if requested
			if (options.shuffle) {
				for (let i = tracks.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					const a = tracks[i] as Track | UnresolvedTrack;
					const b = tracks[j] as Track | UnresolvedTrack;
					tracks[i] = b;
					tracks[j] = a;
				}
			}

			// Add tracks to specified position
			if (options.position !== undefined && options.position >= 0) {
				const currentQueue = [...player.queue];
				player.queue.clear();

				// Add tracks before position
				for (let i = 0; i < options.position; i++) {
					if (i < currentQueue.length) {
						const track = currentQueue[i];
						if (track) player.queue.add(track);
					}
				}

				// Add loaded tracks
				for (const track of tracks) {
					player.queue.add(track);
				}

				// Add remaining tracks
				for (let i = options.position; i < currentQueue.length; i++) {
					const track = currentQueue[i];
					if (track) player.queue.add(track);
				}
			} else {
				// Add tracks to the end
				for (const track of tracks) {
					player.queue.add(track);
				}
			}

			// Start playing if requested and not already playing
			if (options.startPlaying && !player.playing && player.queue.totalSize > 0) {
				player.play();
			}

			this.manager.emit('QueueLoaded', player, savedQueue);

			return {
				success: true,
				queue: savedQueue,
				trackCount: tracks.length,
			};
		} catch (error: unknown) {
			console.error('Error loading queue:', error);
			return {
				success: false,
				error: `Failed to load queue: ${error instanceof Error ? error.message : String(error)}`,
			};
		}
	}

	/**
	 * Delete a saved queue
	 * @param queueId The queue ID to delete
	 * @param guildId The guild ID the queue belongs to (optional for global queues)
	 */
	public async deleteQueue(queueId: string, guildId?: string): Promise<QueueOperationResult> {
		try {
			let deleted = false;

			// Try to delete from guild-specific storage
			if (guildId) {
				try {
					await this.storage.delete(`${guildId}/${queueId}`);
					deleted = true;
				} catch {
					// No-op, try global next
				}
			}

			// If not found or no guild specified, try global
			if (!deleted) {
				try {
					await this.storage.delete(`global/${queueId}`);
					deleted = true;
				} catch {
					// No-op, will return error below if not deleted
				}
			}

			if (!deleted) {
				return {
					success: false,
					error: `Queue with ID "${queueId}" not found`,
				};
			}

			return {
				success: true,
			};
		} catch (error: unknown) {
			console.error('Error deleting queue:', error);
			return {
				success: false,
				error: `Failed to delete queue: ${error instanceof Error ? error.message : String(error)}`,
			};
		}
	}

	/**
	 * List available saved queues for a guild
	 * @param guildId The guild ID to list queues for
	 * @param includeGlobal Whether to include global queues
	 */
	public async listQueues(guildId: string, includeGlobal = true): Promise<SavedQueue[]> {
		try {
			const queues: SavedQueue[] = [];

			// Get guild-specific queues
			try {
				const guildQueueIds = await this.storage.getAll();
				const guildQueues = guildQueueIds.filter((id) => id.startsWith(`${guildId}/`)).map((id) => id.substring(`${guildId}/`.length));

				for (const queueId of guildQueues) {
					try {
						const queue = (await this.storage.load(`${guildId}/${queueId}`)) as SavedQueue;
						if (queue) queues.push(queue);
					} catch {
						// Skip invalid entries
					}
				}
			} catch {
				// No-op, continue with global queues
			}

			// Get global queues if requested
			if (includeGlobal) {
				try {
					const allQueueIds = await this.storage.getAll();
					const globalQueues = allQueueIds.filter((id) => id.startsWith('global/')).map((id) => id.substring('global/'.length));

					for (const queueId of globalQueues) {
						try {
							const queue = (await this.storage.load(`global/${queueId}`)) as SavedQueue;
							if (queue) queues.push(queue);
						} catch {
							// Skip invalid entries
						}
					}
				} catch {
					// No-op
				}
			}

			// Sort by date, newest first
			return queues.sort((a, b) => b.savedAt - a.savedAt);
		} catch (error: unknown) {
			console.error('Error listing queues:', error);
			return [];
		}
	}

	/**
	 * Share a queue from one guild to another
	 * @param queueId The queue ID to share
	 * @param sourceGuildId The source guild ID
	 * @param targetGuildId The target guild ID
	 */
	public async shareQueue(queueId: string, sourceGuildId: string, targetGuildId: string): Promise<QueueOperationResult> {
		try {
			// Load the queue from source guild
			let savedQueue: SavedQueue;

			try {
				// Try guild-specific queue first
				savedQueue = (await this.storage.load(`${sourceGuildId}/${queueId}`)) as SavedQueue;
			} catch {
				try {
					// Try global queue if guild-specific not found
					savedQueue = (await this.storage.load(`global/${queueId}`)) as SavedQueue;
				} catch {
					return {
						success: false,
						error: `Queue with ID "${queueId}" not found in source guild`,
					};
				}
			}

			if (!savedQueue?.tracks || !Array.isArray(savedQueue.tracks)) {
				return {
					success: false,
					error: 'Invalid queue data',
				};
			}

			// Create a new ID for the shared queue
			const newQueueId = `queue-shared-${Date.now()}`;
			const sharedQueue: SavedQueue = {
				...savedQueue,
				id: newQueueId,
				name: `${savedQueue.name} (Shared)`,
				savedAt: Date.now(),
				sourceGuild: sourceGuildId,
				metadata: {
					...savedQueue.metadata,
					sharedFrom: sourceGuildId,
					originalId: savedQueue.id,
				},
			};

			// Save to target guild
			await this.storage.save(`${targetGuildId}/${newQueueId}`, sharedQueue);

			return {
				success: true,
				queue: sharedQueue,
				trackCount: sharedQueue.tracks.length,
			};
		} catch (error: unknown) {
			console.error('Error sharing queue:', error);
			return {
				success: false,
				error: `Failed to share queue: ${error instanceof Error ? error.message : String(error)}`,
			};
		}
	}
}

/**
 * Options for the Queue Manager
 */
export interface QueueManagerOptions {
	/** Custom storage implementation */
	storage?: StorageStrategy;
}
