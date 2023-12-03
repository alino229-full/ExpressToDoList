// Définitions liées aux tâches
export interface Task {
    id?: number;
    title: string;
    description: string;
    status: boolean;
    deadline?: string;
}

export interface TaskManager {
    fetchTasks: () => Promise<Task[]>;
    addTask: (task: Task) => Promise<Task>;
    updateTask: (taskId: number, task: Task) => Promise<Task>;
    deleteTask: (taskId: number) => Promise<void>;
}
