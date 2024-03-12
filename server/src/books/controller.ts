import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/handle_response";
import { Book } from "./model";
import { IBook } from "./types";
import { create_book, id_required, update_book } from "./validation";

export async function getBooks(req: Request, res: Response) {
  try {
    const result = await Book.find();
    return sendSuccess(res, 200, result);
  } catch (error) {
    console.log("ERROR WHILE FETCHING BOOKS", error);
    return sendError(res, 500, "Internal Server Error");
  }
}

export async function createBook(req: Request, res: Response) {
  try {
    const validation = create_book.validate(req.body);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);
    const validated_req = validation.value as IBook;
    const book = new Book(validated_req);
    return sendSuccess(res, 201, await book.save());
  } catch (error) {
    console.log("ERROR WHILE CREATING BOOKS", error);
    return sendError(res, 500, "Internal Server Error");
  }
}

export async function updateBook(req: Request, res: Response) {
  try {
    req.body.id = req.params.id;
    const validation = update_book.validate(req.body);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);
    const validated_req = validation.value as IBook;

    const book = await Book.findById(validated_req.id);
    if (!book) return sendError(res, 404, "Book not found");
    return sendSuccess(res, 200, await book.updateOne(validated_req));
  } catch (error) {
    console.log("ERROR WHILE CREATING BOOKS", error);
    return sendError(res, 500, "Internal Server Error");
  }
}

export async function deleteBook(req: Request, res: Response) {
  try {
    req.body.id = req.params.id;
    const validation = id_required.validate(req.params.id);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);
    let book = await Book.findById(validation.value);
    if (!book) return sendError(res, 404, "Book not found");
    return sendSuccess(res, 200, await book.deleteOne());
  } catch (error) {
    console.log("ERROR WHILE CREATING BOOKS", error);
    return sendError(res, 500, "Internal Server Error");
  }
}
