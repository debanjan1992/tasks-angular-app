import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

import { DueDateModalComponent } from '../due-date-modal/due-date-modal.component';
import { List } from '../../store/types';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputTextareaModule, DropdownModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  taskForm!: FormGroup;
  lists!: List[];

  constructor(private fb: FormBuilder, private dialogService: DialogService, private dialogConfig: DynamicDialogConfig, private dialogRef: DynamicDialogRef) { }

  ngOnInit() {
    this.lists = this.dialogConfig.data.lists ?? [];
    this.taskForm = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      description: this.fb.control('', [Validators.minLength(10), Validators.maxLength(500)]),
      dueDate: this.fb.control(''),
      list: this.fb.control('', [Validators.required]),
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

  get list() {
    return this.taskForm.get("list");
  }

  onSave() {
    if (this.taskForm.invalid) {
      return;
    }
    this.dialogRef.close({
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate ? this.taskForm.value.dueDate.getTime() : null,
      listId: this.taskForm.value.list.id,
    });
  }

  showDueDateDialog() {
    const ref = this.dialogService.open(DueDateModalComponent, {
      closable: true,
      modal: true,
      showHeader: false,
      styleClass: 'due-date-dialog',
      contentStyle: {
        overflow: 'visible',
      }
    });

    ref.onClose.subscribe((data: { date?: Date, delete: boolean } | null) => {
      if (data?.date) {
        this.taskForm.patchValue({ dueDate: data?.date });
      } else if (data?.delete) {
        this.taskForm.patchValue({ dueDate: null });
      }
    });
  }
}
