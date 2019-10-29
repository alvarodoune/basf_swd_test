import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  constructor(
    private api: ApiService
  ) {
  }

  // // Simulate POST /todos
  // addTodo(todo: Todo): Observable<Todo> {
  //   return this.api.createTodo(todo);
  // }
  //
  // // Simulate DELETE /todos/:id
  // deleteTodoById(todoId: number): Observable<Todo> {
  //   return this.api.deleteTodoById(todoId);
  // }
  //
  // // Simulate PUT /todos/:id
  // updateTodo(todo: Todo): Observable<Todo> {
  //   return this.api.updateTodo(todo);
  // }

  // Simulate GET /todos
  getAdminData() {
    return this.api.getAdminData();
  }

  // // Simulate GET /todos/:id
  // getTodoById(todoId: number): Observable<Todo> {
  //   return this.api.getTodoById(todoId);
  // }
  //
  // // Toggle complete
  // toggleTodoComplete(todo: Todo) {
  //   todo.complete = !todo.complete;
  //   return this.api.updateTodo(todo);
  // }
}
