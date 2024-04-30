import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KanbanService } from 'src/app/Services/kanban.service';

@Component({
  selector: 'app-kanban-create',
  templateUrl: './kanban-create.component.html',
  styleUrls: ['./kanban-create.component.scss']
})
export class KanbanCreateComponent implements OnInit {

  title : string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<KanbanCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private kanbanService: KanbanService) { 

      this.form = fb.group({
        title: [this.title, Validators.required]
    });
    }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  } 

  save() {
    this.title = this.form.get('title').value;
    if (this.title) {
      this.kanbanService.saveNewKanban(this.title).subscribe(

        response => {
          console.log(response)
        }
      )
    }
    this.dialogRef.close();
    window.location.reload();
  }

}
