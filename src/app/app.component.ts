import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';

import { Todo } from './models/todo';
import { TodosService } from './services/todos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HTTP';
  public todos: Todo[] = [];
  public todoTitle: string = '';
  public loading: boolean = false;
  public error: string = '';

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.fetchTodos();
  }

  public addTodo() {
    if (!this.todoTitle.trim()) return;

    this.todosService.addTodo({
      title: this.todoTitle,
      completed: false
    })
      .subscribe((todo) => {
        console.log(todo);
        this.todos.unshift(todo);
        this.todoTitle = '';
      });
  }

  public fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodos()
      .subscribe((todos) => {
        this.todos = todos;
        this.loading = false;
        console.log(todos);
      }, (error) => {
        console.log(error.message);
        this.error = error.message;
        this.loading = false;
      });
  }

  public removeTodo(id: any) {
    this.todosService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
  }

  public completeTodo(id: any) {
    this.todosService.completeTodo(id)
      .subscribe(() => {
        const todo = this.todos.find((todo) => todo.id === id)!.completed = true;
      });
  }

}
