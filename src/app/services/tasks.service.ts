import { Injectable } from "@angular/core";
import { List, NewTask, Task, UpdateTaskPayload } from "../store/types";
import { Observable, of, tap, throwError } from "rxjs";
import * as uuid from "uuid";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: "root" })
export class TasksService {

    private Keys = {
        Lists: "lists",
        SelectedLists: "selectedLists",
        Tasks: "tasks",
    };

    constructor(private messageService: MessageService) {
        if (!localStorage.getItem(this.Keys.Lists)) {
            localStorage.setItem(this.Keys.Lists, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.Keys.SelectedLists)) {
            localStorage.setItem(this.Keys.SelectedLists, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.Keys.Tasks)) {
            localStorage.setItem(this.Keys.Tasks, JSON.stringify([]));
        }
    }

    private getListsFromLocalStorage(): List[] {
        return JSON.parse(localStorage.getItem(this.Keys.Lists) ?? "[]");
    }

    private writeListsToLocalStorage(lists: List[]) {
        localStorage.setItem(this.Keys.Lists, JSON.stringify(lists));
    }

    private getSelectedListsFromLocalStorage(): string[] {
        return JSON.parse(localStorage.getItem(this.Keys.SelectedLists) ?? "[]");
    }

    private writeSelectedListsToLocalStorage(ids: string[]) {
        localStorage.setItem(this.Keys.SelectedLists, JSON.stringify(ids));
    }

    private getTasksFromLocalStorage(): Task[] {
        return JSON.parse(localStorage.getItem(this.Keys.Tasks) ?? "[]");
    }

    private writeTasksToLocalStorage(tasks: Task[]) {
        localStorage.setItem(this.Keys.Tasks, JSON.stringify(tasks));
    }

    fetchLists(): Observable<{ lists: List[] }> {
        const data = this.getListsFromLocalStorage();
        return of({ lists: data });
    }

    fetchSelectedLists(): Observable<string[]> {
        const data = this.getSelectedListsFromLocalStorage();
        return of(data);
    }

    updateSelectedLists(ids: string[]) {
        this.writeSelectedListsToLocalStorage(ids);
        return of({ success: true });
    }

    createNewList(name: string) {
        const lists = this.getListsFromLocalStorage();

        const isListNameUnique = !lists.some(list => list.label === name);

        if (!isListNameUnique) {
            return throwError(() => new Error("list name already exists!"));
        }

        const id = uuid.v4();

        lists.push({
            id,
            label: name,
        });

        this.writeListsToLocalStorage(lists);

        return of({ success: true, id: id }).pipe(
            tap(() => this.messageService.add({ severity: 'contrast', summary: 'list created!' }))
        );
    }

    updateList(listId: string, list: List) {
        const lists = this.getListsFromLocalStorage();

        const listIndex = lists.findIndex(list => list.id === listId);

        if (listIndex == -1) {
            return throwError(() => new Error("invalid list!"));
        }

        lists.splice(listIndex, 1, {
            ...list,
            id: lists[listIndex].id,
        });

        this.writeListsToLocalStorage(lists);

        return of({ success: true, list }).pipe(
            tap(() => this.messageService.add({ severity: 'contrast', summary: 'list updated!' }))
        );
    }

    deleteList(listId: string) {
        const lists = this.getListsFromLocalStorage();
        const selectedLists = this.getSelectedListsFromLocalStorage();

        const listIndex = lists.findIndex(list => list.id === listId);
        const selectedListIndex = selectedLists.findIndex(selectedList => selectedList === listId);

        if (listIndex == -1) {
            return throwError(() => new Error("invalid list!"));
        }

        if (selectedListIndex !== -1) {
            selectedLists.splice(selectedListIndex, 1);
            this.writeSelectedListsToLocalStorage(selectedLists);
        }

        lists.splice(listIndex, 1);

        this.writeListsToLocalStorage(lists);

        return of({ success: true }).pipe(
            tap(() => this.messageService.add({ severity: 'contrast', summary: 'list deleted!' }))
        );
    }

    fetchAllTasks(): Observable<{ tasks: Task[] }> {
        const data = this.getTasksFromLocalStorage();
        return of({ tasks: data });
    }

    createNewTask(listId: string, newTask: NewTask) {
        const date = new Date().toUTCString();
        const tasks = this.getTasksFromLocalStorage();
        const newTaskObject: Task = {
            ...newTask,
            listId,
            id: uuid.v4(),
            completed: false,
            createdAt: date,
            modifiedAt: date,
        };

        tasks.push(newTaskObject);
        this.writeTasksToLocalStorage(tasks);

        return of({ success: true, task: newTaskObject }).pipe(
            tap(() => this.messageService.add({ severity: 'contrast', summary: 'task created!' }))
        );
    }

    updateTask(taskId: string, task: UpdateTaskPayload) {
        const date = new Date().toUTCString();
        const allTasks = this.getTasksFromLocalStorage();

        const taskIndex = allTasks.findIndex(task => task.id === taskId);

        if (taskIndex === -1) {
            throw new Error("task not found!");
        }

        allTasks[taskIndex] = {
            ...allTasks[taskIndex],
            ...task,
            id: allTasks[taskIndex].id,
            createdAt: allTasks[taskIndex].createdAt,
            modifiedAt: date,
        };

        if (allTasks[taskIndex].completed) {
            allTasks[taskIndex].starred = false;
        }

        this.writeTasksToLocalStorage(allTasks);
        return of({ success: true, task: allTasks[taskIndex] }).pipe(
            tap(() => this.messageService.add({ severity: 'contrast', summary: 'task updated!' }))
        );
    }

    deleteTask(taskId: string) {
        const tasks = this.getTasksFromLocalStorage();

        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex == -1) {
            return throwError(() => new Error("invalid task!"));
        }

        tasks.splice(taskIndex, 1);

        this.writeTasksToLocalStorage(tasks);

        return of({ success: true }).pipe(
            tap(() => this.messageService.add({ severity: 'contrast', summary: 'list deleted!' }))
        );
    }

    moveTaskToList(taskId: string, listId: string) {
        const tasks = this.getTasksFromLocalStorage();
        const lists = this.getListsFromLocalStorage();

        const taskIndex = tasks.findIndex(task => task.id === taskId);
        const listIndex = lists.findIndex(list => list.id === listId);

        if (taskIndex == -1 || listIndex === -1) {
            return throwError(() => new Error("invalid task/list!"));
        }

        tasks[taskIndex].listId = listId;

        this.writeTasksToLocalStorage(tasks);

        return of({ success: true }).pipe(
            tap(() => this.messageService.add({ severity: 'contrast', summary: 'task moved!' }))
        );
    }
}