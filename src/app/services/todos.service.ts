import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  public BASE_URL = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {
  }

  public addTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({
      'my-custom-header': Math.random().toString()
    });
    return this.http.post<Todo>(`${ this.BASE_URL }todos`, todo, {
      headers
    });
  }

  public fetchTodos(): Observable<Todo[]> {
    let params = new HttpParams();
    params = params.append('_limit', '3');
    params = params.append('userId', '2')
    return this.http.get<Todo[]>(`${ this.BASE_URL }todos`, {
      // params: new HttpParams().set('_limit', '3')
      params
    })
      .pipe(
        delay(500),
        catchError((error) => {
          console.log('Error:', error.message);
          return throwError(error);
        })
      );
  }

  public removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${ this.BASE_URL }todos/${ id }`);
  }

  public completeTodo(id: number): Observable<Todo> {
    return this.http.put<Todo>(`${ this.BASE_URL }todos/${ id }`, {
      completed: true
    });
  }
}
