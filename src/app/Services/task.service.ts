import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Models/task/task.module';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  username='Sarah';
  password='sarra';
  private kanbanAppUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  updateTask2(task: Task): Observable<Task> {
    let headers = new HttpHeaders().set( 'Content-Type','application/json' ).set( 'Authorization', 'Basic ' + btoa(this.username + ':' + this.password) );
    let options = { headers: headers };
    return this.http.put<Task>(
      this.kanbanAppUrl + '/task/' + task.id,
      task,
      options);
  }
  
  updateTask(task) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    let id=task.id;
    return this.http.put(
      `http://localhost:8080/task/${id}`
            , task,{headers});
  }

  getTaskById(id: string): Observable<Task> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.get<Task>(this.kanbanAppUrl + '/task/' + id,{headers});
  }

  deleteTaskById(id: string): Observable<Task> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.delete<Task>(this.kanbanAppUrl + '/task/' + id,{headers});
  }

  deleteTask(id){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.delete(`http://localhost:8080/task/${id}`, {headers,responseType: 'text'});
  }
}
