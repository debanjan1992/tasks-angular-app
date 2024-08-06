import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidepanelComponent } from "./components/sidepanel/sidepanel.component";
import { Store } from '@ngrx/store';
import { ApplicationState } from './store/types';
import { fetchLists, fetchSelectedLists, fetchTasks } from './store/tasks.actions';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidepanelComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.store.dispatch(fetchLists());
    this.store.dispatch(fetchTasks());
    this.store.dispatch(fetchSelectedLists());
  }
}
