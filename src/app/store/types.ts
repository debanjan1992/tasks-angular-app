export interface ApplicationState {
    tasks: TasksState;
}

export interface TasksState {
    lists: List[];
    tasks: Task[];
    selectedLists: string[];
    pageLoading: boolean;
    error: any;
}

export interface List {
    id: string;
    label: string;
    default?: boolean;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    starred: boolean;
    listId: string;
    dueDate: number | null;
    createdAt: number;
    modifiedAt: number;
}

export interface NewTask {
    title: string;
    description: string;
    starred: boolean;
    dueDate: number | null;
}

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    completed?: boolean;
    starred?: boolean;
    listId?: string;
    dueDate?: number | null;
}