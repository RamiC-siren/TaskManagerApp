import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }
  addTask(task: Task): Observable<Task> {
  return this.http.post<Task>(this.apiUrl, task);
}
  getTaskById(id: number): Observable<Task>{
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }
  deleteTask(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}


}
