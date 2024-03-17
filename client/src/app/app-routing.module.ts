import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './books/book-form/book-form.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book-form',
    component: BookFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book-form/:id',
    component: BookFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
