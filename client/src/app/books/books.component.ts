import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../shared/component/confirmation-dialog/confirmation-dialog.component';
import { BooksService } from '../shared/services/books.service';
import { IBook } from './model/books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: IBook[] = [];

  constructor(
    private bookService: BooksService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe((res) => {
      this.books = res.result;
      console.log(this.books);
    });
  }

  navigateToBookFormPage(): void {
    this.router.navigate(['book-form']);
  }

  toggleDescription(book: IBook): void {
    book.isExpanded = !book.isExpanded;
  }
  editBook(bookId: string) {
    this.router.navigate(['book-form/', bookId]);
  }
  deleteBook(book: IBook) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Are You Sure ?',
        message: `You want to delete the book '${book.name}' ?`,
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.bookService.deleteBook(book._id).subscribe(() => {
          this.fetchBooks();
        });
      }
    });
    this.bookService;
  }
}
