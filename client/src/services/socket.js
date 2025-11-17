import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

class SocketService {
    constructor() {
        this.socket = null;
        this.currentWorkspaceId = null;
    }

    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, {
                withCredentials: true,
                transports: ['websocket', 'polling'],
            });

            this.socket.on('connect', () => {
                console.log('Socket.IO connected:', this.socket.id);
            });

            this.socket.on('disconnect', () => {
                console.log('Socket.IO disconnected');
            });

            this.socket.on('connect_error', (error) => {
                console.error('Socket.IO connection error:', error);
            });
        }
        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.currentWorkspaceId = null;
        }
    }

    joinWorkspace(workspaceId) {
        if (this.socket && workspaceId) {
            // Leave previous workspace if any
            if (this.currentWorkspaceId) {
                this.socket.emit('leave-workspace', this.currentWorkspaceId);
            }
            
            // Join new workspace
            this.socket.emit('join-workspace', workspaceId);
            this.currentWorkspaceId = workspaceId;
            console.log('Joined workspace:', workspaceId);
        }
    }

    leaveWorkspace(workspaceId) {
        if (this.socket && workspaceId) {
            this.socket.emit('leave-workspace', workspaceId);
            if (this.currentWorkspaceId === workspaceId) {
                this.currentWorkspaceId = null;
            }
            console.log('Left workspace:', workspaceId);
        }
    }

    // Event listeners
    onTaskCreated(callback) {
        if (this.socket) {
            this.socket.on('task-created', callback);
        }
    }

    onTaskUpdated(callback) {
        if (this.socket) {
            this.socket.on('task-updated', callback);
        }
    }

    onTaskDeleted(callback) {
        if (this.socket) {
            this.socket.on('task-deleted', callback);
        }
    }

    // Remove event listeners
    offTaskCreated(callback) {
        if (this.socket) {
            this.socket.off('task-created', callback);
        }
    }

    offTaskUpdated(callback) {
        if (this.socket) {
            this.socket.off('task-updated', callback);
        }
    }

    offTaskDeleted(callback) {
        if (this.socket) {
            this.socket.off('task-deleted', callback);
        }
    }
}

// Export singleton instance
const socketService = new SocketService();
export default socketService;
