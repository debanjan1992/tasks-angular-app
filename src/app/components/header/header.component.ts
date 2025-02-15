import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Store } from '@ngrx/store';

import { AppService } from '../../services/app.service';
import { TasksService } from '../../services/tasks.service';
import { ApplicationState } from '../../store/types';
import { fetchLists, fetchSelectedLists, fetchTasks } from '../../store/tasks.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, CommonModule, FormsModule, AvatarModule, DialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() profileClicked = new EventEmitter<void>();
  today!: Date;
  date!: Date;
  newTaskVisible = false;

  constructor(private appService: AppService) {
    this.today = new Date();
    this.date = this.today;
  }

  onSidebarToggle() {
    this.appService.toggleSidebar();
  }
}
