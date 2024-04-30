import { Component, OnInit } from '@angular/core';
import { Kanban } from 'src/app/Models/kanban/kanban.module';
import { KanbanService } from 'src/app/Services/kanban.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { KanbanCreateComponent } from '../kanban-create/kanban-create.component';
@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.scss']
})
export class KanbanListComponent implements OnInit {

  kanbanList: Kanban[];

  constructor(
    private kanbanService: KanbanService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.retrieveAllKanbanBoards();
  }

  openDialogForNewKanban(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      kanban: new Kanban()
    };
    this.dialog.open(KanbanCreateComponent, dialogConfig)
  }

  private retrieveAllKanbanBoards(): void {
    this.kanbanService.retrieveAllKanbanBoards().subscribe(

      response => {
        this.kanbanList = response;
      }
    )
  }
  DeleteKanban(id){
    this.kanbanService.deleteKanban(id).subscribe (
      response => {
        console.log(response);
        this.retrieveAllKanbanBoards();
      }
    )
  }

}
