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
    dueDate: string | null;
    createdAt: string;
    modifiedAt: string;
}

export interface NewTask {
    title: string;
    description: string;
    starred: boolean;
    dueDate: string | null;
}

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    completed?: boolean;
    starred?: boolean;
    listId?: string;
    dueDate?: string | null;
}