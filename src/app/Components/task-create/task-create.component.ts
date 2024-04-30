import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/Models/task/task.module';
import { KanbanService } from 'src/app/Services/kanban.service';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  dialogTitle: String;
  kanbanId: String;
  task: Task;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private kanbanService: KanbanService,
    private taskService: TaskService) {

    this.dialogTitle = data.title;
    this.kanbanId = data.kanbanId;
    this.task = data.task;

    this.form = fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required],
      date: [this.task.date,Validators.required]
  });
   }

  ngOnInit() {
  }

  save() {
    this.mapFormToTaskModel();
    if (!this.task.id) {
      this.kanbanService.saveNewTaskInKanban(this.kanbanId, this.task).subscribe();
    } else {
      this.taskService.updateTask(this.task).subscribe();
    }
    this.dialogRef.close();
    window.location.reload();
  }

  close() {
      this.dialogRef.close();
  } 

  private mapFormToTaskModel(): void {
    this.task.title = this.form.get('title').value;
    this.task.description = this.form.get('description').value;
    this.task.date = this.form.get('date').value;
    this.task.status = 'TODO';
  }


}
