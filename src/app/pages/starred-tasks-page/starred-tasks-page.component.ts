import { Component } from '@angular/core';
import { ApplicationState, List, Task } from '../../store/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListPanelComponent } from '../../components/list-panel/list-panel.component';
import { Store } from '@ngrx/store';
import { EmptyContentComponent } from '../../components/empty-content/empty-content.component';
import { animations } from '../all-tasks-page/animations';

@Component({
  selector: 'app-starred-tasks-page',
  standalone: true,
  imports: [ListPanelComponent, FormsModule, CommonModule, EmptyContentComponent],
  templateUrl: './starred-tasks-page.component.html',
  styleUrl: './starred-tasks-page.component.scss',
  animations: animations,
})
export class StarredTasksPageComponent {
  starredList!: List;
  starredTasks: Task[];

  constructor(private store: Store<ApplicationState>) {
    this.starredTasks = [];
    this.starredList = {
      id: "starred",
      label: "Starred tasks",
      default: true,
    };

    this.store.select(state => state.tasks.tasks).subscribe(tasks => {
      this.starredTasks = tasks.filter(t => t.starred);
    });

  }
}
