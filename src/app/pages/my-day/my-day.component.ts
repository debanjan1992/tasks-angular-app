import { Component } from '@angular/core';
import { ApplicationState, List, Task } from '../../store/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListPanelComponent } from '../../components/list-panel/list-panel.component';
import { Store } from '@ngrx/store';
import { differenceInHours, endOfDay, isAfter, isBefore } from 'date-fns';
import { animations } from '../all-tasks-page/animations';

@Component({
  selector: 'app-my-day',
  standalone: true,
  imports: [ListPanelComponent, FormsModule, CommonModule],
  templateUrl: './my-day.component.html',
  styleUrl: './my-day.component.scss',
  animations: animations,
})
export class MyDayComponent {
  dayList!: List;
  tasks: Task[];

  constructor(private store: Store<ApplicationState>) {
    this.dayList = {
      id: "day",
      label: "My Day",
      default: true,
    };
    this.tasks = [];
    this.store.select(state => state.tasks.tasks).subscribe(tasks => {
      this.tasks = this.getTasksForMyDay(tasks);
    });
  }

  getTasksForMyDay(tasks: Task[]) {
    const myDayTasks: Task[] = [];
    const date = new Date();
    const todayEndOfDay = endOfDay(date).getTime();
    tasks.forEach(task => {
      if (task.dueDate) {
        if (isBefore(task.dueDate, todayEndOfDay) && isAfter(task.dueDate, date.getTime())) {
          myDayTasks.push(task);
        }
      }
    });
    return myDayTasks;
  }
}
