import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApplicationState, List, Task } from '../../store/types';
import { ListPanelComponent } from "../../components/list-panel/list-panel.component";
import { animations } from './animations';
import { EmptyContentComponent } from "../../components/empty-content/empty-content.component";

@Component({
  selector: 'app-all-tasks-page',
  standalone: true,
  imports: [ListPanelComponent, FormsModule, CommonModule, EmptyContentComponent],
  templateUrl: './all-tasks-page.component.html',
  styleUrl: './all-tasks-page.component.scss',
  animations: animations,
})
export class AllTasksPageComponent {
  activeLists: List[] = [];
  allTasks: Task[] = [];

  constructor(private store: Store<ApplicationState>) {
    this.store.select(state => state.tasks).subscribe(state => {
      this.activeLists = [];
      this.allTasks = state.tasks;
      state.lists.forEach(list => {
        if (state.selectedLists.includes(list.id)) {
          this.activeLists.push(list);
        }
      })
    });
  }

  identify(idx: number, _: List) {
    return _.id;
  }

  getTasks(listId: string) {
    return this.allTasks.filter(task => task.listId === listId);
  }
}
