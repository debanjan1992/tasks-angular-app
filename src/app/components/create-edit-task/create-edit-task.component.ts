import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

import { ApplicationState, List, Task } from '../../store/types';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DueDateModalComponent } from '../due-date-modal/due-date-modal.component';

@Component({
  selector: 'app-create-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputTextareaModule, CalendarModule],
  templateUrl: './create-edit-task.component.html',
  styleUrl: './create-edit-task.component.scss'
})
export class CreateEditTaskComponent {
  @Input() list!: List;
  @Input({ required: true }) variant: 'new-task' | 'edit-task' = 'new-task';
  @Input() task?: Task;
  @Output() submit = new EventEmitter<any>();
  @Output() dismiss = new EventEmitter<void>();

  taskForm!: FormGroup;
  ref: DynamicDialogRef | undefined;

  constructor(private store: Store<ApplicationState>, private fb: FormBuilder, public dialogService: DialogService) {
  }

  ngOnInit() {
    let title = '', description = '', dueDate: Date | null = null;

    if (this.variant === 'edit-task') {
      title = this.task?.title ?? '';
      description = this.task?.description ?? '';
      dueDate = this.task?.dueDate ? new Date(this.task.dueDate) : null;
    }

    this.taskForm = this.fb.group({
      title: this.fb.control(title, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      description: this.fb.control(description, [Validators.minLength(10), Validators.maxLength(500)]),
      dueDate: this.fb.control(dueDate),
    });
  }

  get title() {
    return this.taskForm.get("title");
  }

  get description() {
    return this.taskForm.get("description");
  }

  get dueDate() {
    return this.taskForm.get("dueDate");
  }

  onSave() {
    if (this.taskForm.invalid) {
      return;
    }
    this.submit.emit({
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate ? this.taskForm.value.dueDate.getTime() : null,
    });
  }

  onUpdate() {
    if (this.taskForm.invalid || !this.task) {
      return;
    }
    this.submit.emit({
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate ? this.taskForm.value.dueDate.getTime() : null,
    });
  }

  showDueDateDialog() {
    this.ref = this.dialogService.open(DueDateModalComponent, {
      closable: true,
      modal: true,
      showHeader: false,
      styleClass: 'due-date-dialog',
      contentStyle: {
        overflow: 'visible',
      },
      data: {
        task: this.task,
      }
    });

    this.ref.onClose.subscribe((data: { date?: Date, delete: boolean } | null) => {
      if (data?.date) {
        this.taskForm.patchValue({ dueDate: data?.date });
      } else if (data?.delete) {
        this.taskForm.patchValue({ dueDate: null });
      }
    });
  }
}
