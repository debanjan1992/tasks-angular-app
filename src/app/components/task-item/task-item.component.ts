import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { Menu, MenuModule } from 'primeng/menu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TagModule } from 'primeng/tag';

import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { deleteTask, moveTaskToList, updateTask } from '../../store/tasks.actions';
import { ApplicationState, List, NewTask, Task, UpdateTaskPayload } from '../../store/types';
import { CreateEditTaskComponent } from '../create-edit-task/create-edit-task.component';
import { differenceInMinutes, formatRelative } from 'date-fns';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DueDateModalComponent } from '../due-date-modal/due-date-modal.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, MenuModule, CreateEditTaskComponent, OverlayPanelModule, ContextMenuModule, TagModule, DynamicDialogModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() list!: List;
  @Input() task!: Task;
  @Input() active = false;

  @Output() deleteClicked = new EventEmitter<void>();

  @ViewChild(OverlayPanel, { read: OverlayPanel }) overlayPanelEl!: OverlayPanel;

  taskCheckUncheckHover = false;
  showActions = false;
  menuItems: MenuItem[];
  contextMenuItems: MenuItem[];

  constructor(private store: Store<ApplicationState>, private dialogService: DialogService) {
    this.menuItems = [];
    this.contextMenuItems = [];
  }

  ngOnInit() {

    this.store.select(state => state.tasks.lists).subscribe(lists => {

      const items = lists.filter(list => list.id !== this.list.id).map(list => ({ label: list.label, command: () => this.moveTaskToList(list.id) }));

      this.contextMenuItems = items;

      this.menuItems = [
        {
          label: "Edit",
          command: (e) => this.overlayPanelEl.show(e.originalEvent),
        },
        {
          label: "Delete",
          command: () => this.deleteTask()
        },
      ];
    });
  }

  moveTaskToList(listId: string) {
    this.store.dispatch(moveTaskToList({ taskId: this.task.id, listId }));
  }

  toggleCompleted() {
    this.store.dispatch(updateTask({ taskId: this.task.id, task: { completed: !this.task.completed } }));
  }

  toggleStarred() {
    this.store.dispatch(updateTask({ taskId: this.task.id, task: { starred: !this.task.starred } }));
  }

  showMenu(event: Event, menu: Menu) {
    menu.show(event);
  }

  deleteTask() {
    this.store.dispatch(deleteTask({ id: this.task.id }));
    this.deleteClicked.emit();
  }

  getDue() {
    if (this.task.dueDate) {
      return formatRelative(this.task.dueDate, new Date());
    }
    return '';
  }

  getSeverityClass(): "secondary" | "info" | "warning" | "danger" {
    if (this.task.dueDate && !this.task.completed) {
      const diffInMins = differenceInMinutes(this.task.dueDate, new Date());
      if (diffInMins <= 0) {
        return "danger";
      } else if (diffInMins > 0 && diffInMins <= 360) {
        return "warning";
      }
    }
    if (this.task.dueDate && this.task.completed) {
      return "secondary";
    }
    return 'info';
  }

  onUpdate(task: UpdateTaskPayload) {
    this.store.dispatch(updateTask({ taskId: this.task?.id, task: task }));
  }

  openDueDateDialog() {
    const ref = this.dialogService.open(DueDateModalComponent, {
      closable: true,
      modal: true,
      showHeader: false,
      styleClass: 'due-date-dialog',
      contentStyle: {
        overflow: 'visible',
      }
    });

    ref.onClose.subscribe((data: { date?: Date, delete: boolean } | null) => {
      if (data?.date) {
        this.store.dispatch(updateTask({ taskId: this.task.id, task: { dueDate: data.date.getTime() } }));
      } else if (data?.delete) {
        this.store.dispatch(updateTask({ taskId: this.task.id, task: { dueDate: null } }));
      }
    });
  }
}
