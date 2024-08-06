import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApplicationState, List } from '../../store/types';
import { ListPanelComponent } from "../../components/list-panel/list-panel.component";
import { animations } from './animations';

@Component({
  selector: 'app-all-tasks-page',
  standalone: true,
  imports: [ListPanelComponent, FormsModule, CommonModule],
  templateUrl: './all-tasks-page.component.html',
  styleUrl: './all-tasks-page.component.scss',
  animations: animations,
})
export class AllTasksPageComponent {
  activeLists: List[] = [];

  constructor(private store: Store<ApplicationState>) {
    this.store.select(state => state.tasks).subscribe(state => {
      this.activeLists = [];
      state.lists.forEach(list => {
        if (state.selectedLists.includes(list.id)) {
          this.activeLists.push(list);
        }
      })
    });
  }

  identify(_: number, list: List) {
    return list.id;
  }
}
