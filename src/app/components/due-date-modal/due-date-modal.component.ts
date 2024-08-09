import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-due-date-modal',
  standalone: true,
  imports: [CalendarModule, CommonModule, FormsModule, ButtonModule],
  templateUrl: './due-date-modal.component.html',
  styleUrl: './due-date-modal.component.scss'
})
export class DueDateModalComponent {
  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  date = '';

  ngOnInit() {
    this.date = this.config.data?.dueDate ?? '';
  }

  onDismiss() {
    this.ref.close();
  }

  onSubmit() {
    this.ref.close({ date: new Date(this.date) });
  }

  onDelete() {
    this.ref.close({ delete: true });
  }
}
