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
}

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    starred: boolean;
    listId: string;
    createdAt: string;
    modifiedAt: string;
}

export interface NewTask {
    title: string;
    description: string;
    starred: boolean;
}

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    completed?: boolean;
    starred?: boolean;
    listId?: string;
}