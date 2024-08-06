import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { AppService } from '../../services/app.service';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { ApplicationState, List } from '../../store/types';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CreateEditListModalComponent } from "../dialogs/create-edit-list-modal/create-edit-list-modal.component";
import { RouterModule } from '@angular/router';
import { updateSelectedLists } from '../../store/tasks.actions';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [SidebarModule, CommonModule, AccordionModule, CheckboxModule, ButtonModule, FormsModule, CreateEditListModalComponent, RouterModule],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.scss'
})
export class SidepanelComponent {
  visible = false;
  appService = inject(AppService);
  listsExpanded = true;
  lists: List[];
  selectedLists: string[];
  newListModalVisible = false;

  constructor(private store: Store<ApplicationState>) {
    this.lists = [];
    this.selectedLists = [];
    this.store.select(state => state.tasks).subscribe(tasks => {
      this.lists = tasks.lists;
      this.selectedLists = tasks.selectedLists;
    });
  }

  ngOnInit() {
    this.appService.listenForSidebarChanges().subscribe(expanded => {
      this.visible = expanded;
    });
  }

  onDismiss() {
    this.appService.toggleSidebar();
  }

  onCheckboxToggle(event: CheckboxChangeEvent) {
    this.store.dispatch(updateSelectedLists({ ids: event.checked }));
  }
}
