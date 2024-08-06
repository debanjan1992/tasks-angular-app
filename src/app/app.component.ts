import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidepanelComponent } from "./components/sidepanel/sidepanel.component";
import { Store } from '@ngrx/store';
import { ApplicationState } from './store/types';
import { fetchLists, fetchSelectedLists, fetchTasks } from './store/tasks.actions';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppService } from './services/app.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, SidepanelComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
  animations: [
    trigger(
      'slideAnimation',
      [
        state("visible", style({
          position: 'relative',
          transform: 'translateX(0)',
        })),
        state("hidden", style({
          position: 'relative',
          transform: 'translateX(-400px)',
        })),
        transition("visible <=> hidden", animate('1000ms linear')),
      ]
    )
  ]
})
export class AppComponent {
  sidebarVisible: boolean;

  constructor(private store: Store<ApplicationState>, private appService: AppService) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.sidebarVisible = this.appService.isSidebarExpanded();
    this.store.dispatch(fetchLists());
    this.store.dispatch(fetchTasks());
    this.store.dispatch(fetchSelectedLists());
    this.appService.listenForSidebarChanges().subscribe(expanded => {
      this.sidebarVisible = expanded;
    });
  }
}
