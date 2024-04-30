import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './pages/todo/todo-list/todo-list.component';
import { TodoDetailComponent } from './pages/todo/todo-detail/todo-detail.component';
import { AddTodoComponent } from './pages/todo/add-todo/add-todo.component';
import { UpdateTodoComponent } from './pages/todo/update-todo/update-todo.component';

import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { UpdateUserComponent } from './pages/user/update-user/update-user.component';

const routes: Routes = [
  {
    path: 'todos',
    children: [
      { path: '', component: TodoListComponent },
      { path: 'add', component: AddTodoComponent },
      { path: 'edit/:id', component: UpdateTodoComponent },
      { path: 'detail/:id', component: TodoDetailComponent },
    ],
  },

  {
    path: 'users',
    children: [
      { path: '', component: UserListComponent },
      { path: 'add', component: AddUserComponent },
      { path: 'edit/:id', component: UpdateUserComponent },
      { path: 'detail/:id', component: UserDetailComponent },
    ],
  },

  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/todos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
