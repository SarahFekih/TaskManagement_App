import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kanban } from '../Models/kanban/kanban.module';
import { Task } from '../Models/task/task.module';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  username='Sarah';
  password='sarra';
  private kanbanAppUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  retrieveAllKanbanBoards(): Observable<Kanban[]> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.get<Kanban[]>(this.kanbanAppUrl + '/kanban',{headers});
  }

  retrieveKanbanById(id: String): Observable<Kanban> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.get<Kanban>(this.kanbanAppUrl + '/kanban/' + id,{headers});
  }

  saveNewKanban(title: string): Observable<string> {
    let headers = new HttpHeaders().set( 'Content-Type','application/json' ).set( 'Authorization', 'Basic ' + btoa(this.username + ':' + this.password) );
    let options = { headers: headers };
    let jsonObject = this.prepareTiTleJsonObject(title);
    return this.http.post<string>(
      this.kanbanAppUrl + '/kanban/',
      jsonObject,
      options
    );
  }

  saveNewTaskInKanban2(kanbanId: String, task: Task): Observable<Task> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.post<Task>(
      this.kanbanAppUrl + '/kanban/' + kanbanId + '/task/',
      task,
      options);
  }
  saveNewTaskInKanban(kanbanId: String, task: Task): Observable<any> {
    let headers = new HttpHeaders().set( 'Content-Type','application/json' ).set( 'Authorization', 'Basic ' + btoa(this.username + ':' + this.password) );
    let options = { headers: headers };
    return this.http.post<any>(
      this.kanbanAppUrl + '/task/',
      {
        id: task.id,
        title: task.title,
        status: task.status,
        date: task.date,
        description: task.description,
        kanban: { id: kanbanId } 
},
      options);
  }

  private prepareTiTleJsonObject(title: string) {
    const object = {
      title: title
    }
    return JSON.stringify(object);
  }
  deleteKanban(id) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.delete(`http://localhost:8080/kanban/${id}`, { headers,responseType: 'text' });
  }

}
