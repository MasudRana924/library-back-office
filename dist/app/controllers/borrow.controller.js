"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = exports.getBorrowSummary = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
// GET /api/borrow - Borrowed Books Summary using Aggregation
const getBorrowSummary = async (req, res, next) => {
    try {
        const summary = await borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails',
                },
            },
            { $unwind: '$bookDetails' },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookDetails.title',
                        isbn: '$bookDetails.isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBorrowSummary = getBorrowSummary;
// POST /api/borrow - Borrow a Book
const borrowBook = async (req, res, next) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        // Validate input
        if (!bookId || !quantity || !dueDate) {
            res.status(400).json({
                success: false,
                message: 'All fields (book, quantity, dueDate) are required',
                error: 'BadRequest',
            });
            return;
        }
        const book = await book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'NotFound',
            });
            return;
        }
        if (book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available',
                error: 'InsufficientStock',
            });
            return;
        }
        // Update book inventory
        book.copies -= quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        await book.save();
        const borrow = new borrow_model_1.Borrow({ book: bookId, quantity, dueDate });
        await borrow.save();
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.borrowBook = borrowBook;
