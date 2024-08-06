import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

import { HeaderComponent } from './components/header/header.component';
import { SidepanelComponent } from "./components/sidepanel/sidepanel.component";
import { ApplicationState } from './store/types';
import { fetchLists, fetchSelectedLists, fetchTasks } from './store/tasks.actions';
import { AppService } from './services/app.service';
import { AboutMeComponent } from './components/about-me/about-me.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, SidepanelComponent, ToastModule, SidebarModule, AboutMeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
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
  aboutMeVisible: boolean;

  constructor(private store: Store<ApplicationState>, private appService: AppService) {
    this.sidebarVisible = false;
    this.aboutMeVisible = false;
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
