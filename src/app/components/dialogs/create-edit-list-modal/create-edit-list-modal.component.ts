import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { ApplicationState, List } from '../../../store/types';
import { Store } from '@ngrx/store';
import { createList, updateList } from '../../../store/tasks.actions';

@Component({
  selector: 'app-create-edit-list-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule, FormsModule, CommonModule, InputTextModule],
  templateUrl: './create-edit-list-modal.component.html',
  styleUrl: './create-edit-list-modal.component.scss'
})
export class CreateEditListModalComponent {
  @Input() visible = false;
  @Input() editMode = false;
  @Input() list!: List;
  @Output() dismiss = new EventEmitter<void>();

  listName = this.editMode && this.list ? this.list.label : '';

  constructor(private store: Store<ApplicationState>) {
    this.listName = "";
  }

  ngOnChanges() {
    if (this.editMode) {
      this.listName = this.list.label;
    }
  }

  onDoneClick() {
    if (this.editMode) {
      this.store.dispatch(updateList({ id: this.list.id, list: { ...this.list, label: this.listName } }))
    } else {
      this.store.dispatch(createList({ label: this.listName }));
    }
    this.dismiss.emit();
  }
}
