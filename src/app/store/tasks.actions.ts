import { createAction, props } from "@ngrx/store";
import { List, NewTask, Task, UpdateTaskPayload } from "./types";

export const fetchLists = createAction("[Tasks] Fetch lists");
export const fetchListsSuccess = createAction("[Tasks] Fetch lists success", props<{ lists: List[] }>());
export const fetchListsFailure = createAction("[Tasks] Fetch lists failure", props<any>());

export const fetchSelectedLists = createAction("[Tasks] Fetch selected lists");
export const fetchSelectedListsSuccess = createAction("[Tasks] Fetch selected lists success", props<{ ids: string[] }>());
export const fetchSelectedListsFailure = createAction("[Tasks] Fetch selected lists failure", props<any>());

export const createList = createAction("[Tasks] Create list", props<{ label: string; }>());
export const createListSuccess = createAction("[Tasks] Create list success", props<{ success: boolean; id: string; }>());
export const createListFailure = createAction("[Tasks] Create list failure", props<any>());

export const updateList = createAction("[Tasks] Update list", props<{ id: string; list: List }>());
export const updateListSuccess = createAction("[Tasks] Update list success", props<{ success: boolean; list: List; }>());
export const updateListFailure = createAction("[Tasks] Update list failure", props<any>());

export const updateSelectedLists = createAction("[Tasks] Update selected list", props<{ ids: string[]; }>());
export const updateSelectedListsSuccess = createAction("[Tasks] Update selected list success", props<{ success: boolean; }>());
export const updateSelectedListsFailure = createAction("[Tasks] Update selected list failure", props<any>());

export const deleteList = createAction("[Tasks] Delete list", props<{ id: string; }>());
export const deleteListSuccess = createAction("[Tasks] Delete list success", props<{ success: boolean; }>());
export const deleteListFailure = createAction("[Tasks] Delete list failure", props<any>());

export const fetchTasks = createAction("[Tasks] Fetch tasks");
export const fetchTasksSuccess = createAction("[Tasks] Fetch tasks success", props<{ tasks: Task[] }>());
export const fetchTasksFailure = createAction("[Tasks] Fetch tasks failure", props<any>());

export const createNewTask = createAction("[Tasks] Create new task", props<{ listId: string, newTask: NewTask }>());
export const createNewTaskSuccess = createAction("[Tasks] Create new task success", props<{ success: boolean, task: Task }>());
export const createNewTaskFailure = createAction("[Tasks] Create new task failure", props<any>());

export const updateTask = createAction("[Tasks] Update task", props<{ taskId: string, task: UpdateTaskPayload }>());
export const updateTaskSuccess = createAction("[Tasks] Update task success", props<{ success: boolean, task: Task }>());
export const updateTaskFailure = createAction("[Tasks] Update task failure", props<any>());

export const deleteTask = createAction("[Tasks] Delete task", props<{ id: string; }>());
export const deleteTaskSuccess = createAction("[Tasks] Delete task success", props<{ success: boolean; }>());
export const deleteTaskFailure = createAction("[Tasks] Delete task failure", props<any>());

export const moveTaskToList = createAction("[Tasks] Move task to list", props<{ taskId: string; listId: string; }>());
export const moveTaskToListSuccess = createAction("[Tasks] Move task to list success", props<{ success: boolean; }>());
export const moveTaskToListFailure = createAction("[Tasks] Move task to list failure", props<any>());