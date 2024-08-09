import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { AppService } from '../../services/app.service';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { ApplicationState, List } from '../../store/types';
import { FormsModule } from '@angular/forms';
import { CreateEditListModalComponent } from "../dialogs/create-edit-list-modal/create-edit-list-modal.component";
import { RouterModule } from '@angular/router';
import { createNewTask, fetchLists, fetchSelectedLists, fetchTasks, updateSelectedLists } from '../../store/tasks.actions';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [SidebarModule, CommonModule, AccordionModule, CheckboxModule, ButtonModule, FormsModule, CreateEditListModalComponent, RouterModule, DynamicDialogModule],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.scss'
})
export class SidepanelComponent {
  appService = inject(AppService);
  listsExpanded = true;
  lists: List[];
  selectedLists: string[];
  newListModalVisible = false;

  constructor(private store: Store<ApplicationState>, private dialogService: DialogService, private tasksService: TasksService) {
    this.lists = [];
    this.selectedLists = [];
    this.store.select(state => state.tasks).subscribe(tasks => {
      this.lists = tasks.lists;
      this.selectedLists = tasks.selectedLists;
    });
  }

  ngOnInit() {
  }

  onDismiss() {
    this.appService.toggleSidebar();
  }

  onCheckboxToggle(event: CheckboxChangeEvent) {
    this.store.dispatch(updateSelectedLists({ ids: event.checked }));
  }

  showCreateDialog() {
    const ref = this.dialogService.open(CreateTaskComponent, {
      closable: true,
      modal: true,
      showHeader: true,
      width: '30vw',
      header: "Create task",
      contentStyle: {
        overflow: 'visible',
      },
      data: {
        lists: this.lists,
      }
    });

    ref.onClose.subscribe((data: any) => {
      if (data) {
        this.store.dispatch(createNewTask({ listId: data.listId, newTask: data }));
      }
    });
  }

  generateMocks() {
    this.tasksService.generateMocks();
    this.store.dispatch(fetchLists());
    this.store.dispatch(fetchTasks());
    this.store.dispatch(fetchSelectedLists());
  }

  deleteMocks() {
    this.tasksService.deleteStorage();
    this.store.dispatch(fetchLists());
    this.store.dispatch(fetchTasks());
    this.store.dispatch(fetchSelectedLists());
  }
}
