import { createReducer, on } from "@ngrx/store";
import { TasksState } from "./types";
import { createNewTask, deleteTask, fetchLists, fetchListsFailure, fetchListsSuccess, fetchSelectedLists, fetchSelectedListsSuccess, fetchTasks, fetchTasksFailure, fetchTasksSuccess, updateSelectedListsSuccess, updateTask } from "./tasks.actions";

const initialState: TasksState = {
    lists: [],
    selectedLists: [],
    tasks: [],
    pageLoading: false,
    error: null,
};

export const tasksReducer = createReducer(
    initialState,
    on(fetchLists, (state) => {
        return {
            ...state,
            pageLoading: true,
        };
    }),
    on(fetchListsSuccess, (state, { lists }) => {
        return {
            ...state,
            lists: lists,
            pageLoading: false,
        };
    }),
    on(fetchListsFailure, fetchTasksFailure, (state, error) => {
        return {
            ...state,
            pageLoading: false,
            error,
        };
    }),
    on(fetchTasks, (state) => {
        return {
            ...state,
            pageLoading: true,
        };
    }),
    on(fetchTasksSuccess, (state, { tasks }) => {
        return {
            ...state,
            tasks,
            pageLoading: false,
        };
    }),
    on(fetchSelectedListsSuccess, (state, { ids }) => {
        return {
            ...state,
            selectedLists: ids,
        };
    }),
)