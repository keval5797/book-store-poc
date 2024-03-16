import { environment } from 'src/environments/environment';

export const getBooksEndPoint = `${environment.baseUrl}/books`;
export const getBookByIdEndPoint = (id: string) =>
  `${environment.baseUrl}/books/${id}`;
export const postBooksEndPoint = `${environment.baseUrl}/books`;
export const putBooksEndPoint = (id: string) =>
  `${environment.baseUrl}/books/${id}`;
export const deleteBooksEndPoint = (id: string) =>
  `${environment.baseUrl}/books/${id}`;
