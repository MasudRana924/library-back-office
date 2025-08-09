"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
/**
 * Book Controller
 * Handles book-related operations such as creating, retrieving, and listing books.
 *
 * @module controllers/books.controller
 */
// 1. Create Book
const createBook = async (req, res, next) => {
    try {
        const book = new book_model_1.Book(req.body);
        await book.save();
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBook = createBook;
// 2. Get All Books
const getAllBooks = async (req, res, next) => {
    try {
        const filter = req.query.filter;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sort === 'asc' ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = await book_model_1.Book.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBooks = getAllBooks;
// 3. Get Book by ID
const getBookById = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found', error: 'NotFound' });
            return;
        }
        res.status(200).json({ success: true, message: 'Book retrieved successfully', data: book });
    }
    catch (error) {
        next(error);
    }
};
exports.getBookById = getBookById;
// 4. Update Book
const updateBook = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'NotFound'
            });
            return;
        }
        Object.assign(book, req.body);
        await book.save();
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateBook = updateBook;
// 5. Delete Book
const deleteBook = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'NotFound'
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBook = deleteBook;
