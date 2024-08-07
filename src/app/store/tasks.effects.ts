import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TasksService } from "../services/tasks.service";
import { createList, createListFailure, createListSuccess, createNewTask, createNewTaskFailure, createNewTaskSuccess, deleteList, deleteListFailure, deleteListSuccess, deleteTask, deleteTaskFailure, deleteTaskSuccess, fetchLists, fetchListsFailure, fetchListsSuccess, fetchSelectedLists, fetchSelectedListsFailure, fetchSelectedListsSuccess, fetchTasks, fetchTasksFailure, fetchTasksSuccess, moveTaskToList, moveTaskToListFailure, moveTaskToListSuccess, updateList, updateListFailure, updateListSuccess, updateSelectedLists, updateSelectedListsFailure, updateSelectedListsSuccess, updateTask, updateTaskFailure, updateTaskSuccess } from "./tasks.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class TasksEffects {
    constructor(
        private actions$: Actions,
        private tasksService: TasksService,
    ) { }

    fetchLists$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchLists, updateListSuccess, createListSuccess, deleteListSuccess),
            switchMap(() => this.tasksService.fetchLists()),
            map(listResponse => fetchListsSuccess(listResponse)),
            catchError(error => of(fetchListsFailure(error))
            )
        )
    )

    fetchSelectedLists$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchSelectedLists, updateSelectedListsSuccess, deleteListSuccess),
            switchMap(() => this.tasksService.fetchSelectedLists()),
            map(response => fetchSelectedListsSuccess({ ids: response })),
            catchError(error => of(fetchSelectedListsFailure(error))
            )
        )
    )

    createList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createList),
            switchMap(payload => this.tasksService.createNewList(payload.label)),
            map(response => createListSuccess(response)),
            catchError(error => of(createListFailure(error))
            )
        )
    )

    updateList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateList),
            switchMap(payload => this.tasksService.updateList(payload.id, payload.list)),
            map(response => updateListSuccess(response)),
            catchError(error => of(updateListFailure(error))
            )
        )
    )

    updateSelectedLists$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateSelectedLists),
            switchMap(payload => this.tasksService.updateSelectedLists(payload.ids)),
            map(response => updateSelectedListsSuccess(response)),
            catchError(error => of(updateSelectedListsFailure(error))
            )
        )
    )

    deleteList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteList),
            switchMap(payload => this.tasksService.deleteList(payload.id)),
            map(response => deleteListSuccess(response)),
            catchError(error => of(deleteListFailure(error))
            )
        )
    )

    fetchTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTasks, createNewTaskSuccess, updateTaskSuccess, deleteTaskSuccess, moveTaskToListSuccess, deleteListSuccess),
            switchMap(() => this.tasksService.fetchAllTasks()),
            map(response => fetchTasksSuccess(response)),
            catchError(error => of(fetchTasksFailure(error))
            )
        )
    )

    createNewTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createNewTask),
            switchMap(payload => this.tasksService.createNewTask(payload.listId, payload.newTask)),
            map(response => createNewTaskSuccess(response)),
            catchError(error => of(createNewTaskFailure(error))
            )
        )
    )

    updateTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTask),
            switchMap(payload => this.tasksService.updateTask(payload.taskId, payload.task)),
            map(response => updateTaskSuccess(response)),
            catchError(error => of(updateTaskFailure(error))
            )
        )
    )

    deleteTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTask),
            switchMap(payload => this.tasksService.deleteTask(payload.id)),
            map(response => deleteTaskSuccess(response)),
            catchError(error => of(deleteTaskFailure(error))
            )
        )
    )

    moveTaskToList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(moveTaskToList),
            switchMap(payload => this.tasksService.moveTaskToList(payload.taskId, payload.listId)),
            map(response => moveTaskToListSuccess(response)),
            catchError(error => of(moveTaskToListFailure(error))
            )
        )
    )
}