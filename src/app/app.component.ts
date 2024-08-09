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
      'slideInFromLeft',
      [
        transition(':enter', [
          style({ opacity: 0, position: 'relative', left: '-400px' }),
          animate('0.4s 0.2s ease-in',
            style({ opacity: 1, position: 'relative', left: '0' }))
        ]),
        transition(':leave', [
          style({ opacity: 1, position: 'relative', left: '0', }),
          animate('0.4s',
            style({ opacity: 0, position: 'relative', left: '-400px' })),
        ])
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
