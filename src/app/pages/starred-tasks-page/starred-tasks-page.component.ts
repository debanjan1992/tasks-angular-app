import { Component } from '@angular/core';
import { List } from '../../store/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListPanelComponent } from '../../components/list-panel/list-panel.component';

@Component({
  selector: 'app-starred-tasks-page',
  standalone: true,
  imports: [ListPanelComponent, FormsModule, CommonModule],
  templateUrl: './starred-tasks-page.component.html',
  styleUrl: './starred-tasks-page.component.scss'
})
export class StarredTasksPageComponent {
  starredList!: List;

  constructor() {
    this.starredList = {
      id: "starred",
      label: "Starred tasks"
    };
  }
}
