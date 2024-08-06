import { Component, Input } from '@angular/core';
import { ApplicationState, List, Task } from '../../store/types';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { deleteList } from '../../store/tasks.actions';
import { CreateEditListModalComponent } from '../dialogs/create-edit-list-modal/create-edit-list-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskItemComponent } from "../task-item/task-item.component";
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { CreateEditTaskComponent } from "../create-edit-task/create-edit-task.component";

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
  ],
  templateUrl: './list-panel.component.html',
  styleUrl: './list-panel.component.scss'
})
export class ListPanelComponent {
  @Input() list!: List;
  @Input() variant: 'default' | 'starred' = 'default';

  menuItems: MenuItem[];
  editModalVisible = false;
  tasks: Task[];
  completedTasksExpanded = false;

  constructor(private store: Store<ApplicationState>) {
    this.tasks = [];
    this.menuItems = [];
  }

  get incompleteTasks() {
    return this.tasks.filter(t => !t.completed);
  }

  get completeTasks() {
    return this.tasks.filter(t => t.completed);
  }

  ngOnInit() {
    this.store.select(state => state.tasks).subscribe(tasksState => {
      if (this.variant === 'default') {
        this.tasks = tasksState.tasks.filter(task => task.listId === this.list.id);
      } else if (this.variant === 'starred') {
        this.tasks = tasksState.tasks.filter(task => task.starred);
      }
    });

    if (this.variant === 'default') {
      this.menuItems = [{
        label: "Rename list",
        command: () => this.editModalVisible = true,
      }, {
        label: "Delete list",
        command: () => this.onDelete()
      }];
    }
  }

  onDelete() {
    this.store.dispatch(deleteList({ id: this.list.id }));
  }

}
