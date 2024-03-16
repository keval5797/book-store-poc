import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './books/book-form/book-form.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'book-form',
    component: BookFormComponent,
  },
  {
    path: 'book-form/:id',
    component: BookFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
