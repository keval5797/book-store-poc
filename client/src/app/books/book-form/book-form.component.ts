import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });
  bookId: string = '';
  constructor(
    private bookService: BooksService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.bookId = activeRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.fetchBookById();
  }

  fetchBookById() {
    console.log(this.bookId);
    this.bookService.getBookById(this.bookId).subscribe((res) => {
      this.bookForm.patchValue({ ...res['result'] });
    });
  }
  onSubmit(): void {
    if (this.bookForm.valid) {
      const book = this.bookForm.value;
      if (!this.bookId) {
        this.bookService.addBook(book).subscribe(() => {
          this.navigateToBooksPage();
        });
      } else {
        this.bookService.updateBook(this.bookId, book).subscribe(() => {
          this.navigateToBooksPage();
        });
      }
    }
  }

  navigateToBooksPage() {
    this.router.navigate(['books']);
  }
}
