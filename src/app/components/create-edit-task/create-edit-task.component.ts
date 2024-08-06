import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { ApplicationState, List, NewTask, Task, UpdateTaskPayload } from '../../store/types';
import { createNewTask, updateTask } from '../../store/tasks.actions';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-create-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputTextareaModule],
  templateUrl: './create-edit-task.component.html',
  styleUrl: './create-edit-task.component.scss'
})
export class CreateEditTaskComponent {
  @Input() list!: List;
  @Input({ required: true }) variant: 'new-task' | 'edit-task' | 'new-starred-task' = 'new-task';
  @Input() task?: Task;
  @Output() dismiss = new EventEmitter<void>();

  taskForm!: FormGroup;

  constructor(private store: Store<ApplicationState>, private fb: FormBuilder) {
  }

  ngOnInit() {
    let title = '', description = '';

    if (this.variant === 'edit-task') {
      title = this.task?.title ?? '';
      description = this.task?.description ?? '';
    }

    this.taskForm = this.fb.group({
      title: this.fb.control(title, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      description: this.fb.control(description, [Validators.minLength(10), Validators.maxLength(500)]),
    });
  }

  get title() {
    return this.taskForm.get("title");
  }

  get description() {
    return this.taskForm.get("description");
  }

  onSave() {
    if (this.taskForm.invalid) {
      return;
    }
    const newTask: NewTask = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      starred: this.variant === 'new-starred-task',
    };
    this.store.dispatch(createNewTask({ listId: this.list.id, newTask }));
    this.dismiss.emit();
  }

  onUpdate() {
    if (this.taskForm.invalid || !this.task) {
      return;
    }
    const newTask: UpdateTaskPayload = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
    };
    this.store.dispatch(updateTask({ taskId: this.task?.id, task: newTask }));
    this.dismiss.emit();
  }
}
