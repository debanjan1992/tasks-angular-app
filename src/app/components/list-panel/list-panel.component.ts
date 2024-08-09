import { ChangeDetectorRef, Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { ApplicationState, List, NewTask, Task } from '../../store/types';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { createNewTask, deleteList } from '../../store/tasks.actions';
import { CreateEditListModalComponent } from '../dialogs/create-edit-list-modal/create-edit-list-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskItemComponent } from "../task-item/task-item.component";
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { CreateEditTaskComponent } from "../create-edit-task/create-edit-task.component";
import { animations } from './animations';
import { EmptyContentComponent } from "../empty-content/empty-content.component";

@Component({
  selector: 'app-list-panel',
  standalone: true,
  imports: [CommonModule,
    CardModule,
    MenuModule,
    CreateEditListModalComponent,
    OverlayPanelModule,
    ButtonModule,
    ReactiveFormsModule,
    TaskItemComponent,
    ClickOutsideDirective,
    CreateEditTaskComponent,
    EmptyContentComponent],
  templateUrl: './list-panel.component.html',
  styleUrl: './list-panel.component.scss',
  animations: animations,
})
export class ListPanelComponent {
  @Input({ required: true }) list!: List;
  @Input({ required: true }) tasks: Task[];
  @Input({ required: true }) addTaskButtonText: string;
  @Input() hideAddTaskBtn = false;
  @Input() noTasksTpl!: TemplateRef<EmptyContentComponent>;

  menuItems: MenuItem[];
  editModalVisible = false;
  completedTasksExpanded = false;

  constructor(private store: Store<ApplicationState>, private cdr: ChangeDetectorRef) {
    this.tasks = [];
    this.menuItems = [];
    this.addTaskButtonText = '';
  }

  get incompleteTasks() {
    return this.tasks.filter(t => !t.completed);
  }

  get completeTasks() {
    return this.tasks.filter(t => t.completed);
  }

  ngOnInit() {

    if (!this.list.default) {
      this.menuItems = [
        {
          label: "Rename list",
          command: () => this.editModalVisible = true,
        },
        {
          label: "Delete list",
          command: () => this.onDeleteList()
        }
      ];
    }
  }

  onDeleteList() {
    this.store.dispatch(deleteList({ id: this.list.id }));
  }

  identify(idx: number, _: Task) {
    return idx;
  }

  onSave(newTask: NewTask) {
    if (!newTask.title) {
      return;
    }
    this.store.dispatch(createNewTask({ listId: this.list.id, newTask }));
  }

}
