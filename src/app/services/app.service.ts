import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  sidebarExpandSubject = new BehaviorSubject(true);

  constructor() { }

  toggleSidebar() {
    this.sidebarExpandSubject.next(!this.isSidebarExpanded());
  }

  listenForSidebarChanges() {
    return this.sidebarExpandSubject.asObservable();
  }

  isSidebarExpanded() {
    return this.sidebarExpandSubject.getValue();
  }
}
