"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
var book_model_1 = require("../models/book.model");
/**
 * Book Controller
 * Handles book-related operations such as creating, retrieving, and listing books.
 *
 * @module controllers/books.controller
 */
// 1. Create Book
var createBook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var book, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                book = new book_model_1.Book(req.body);
                return [4 /*yield*/, book.save()];
            case 1:
                _a.sent();
                res.status(201).json({
                    success: true,
                    message: 'Book created successfully',
                    data: book,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createBook = createBook;
// 2. Get All Books
var getAllBooks = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, sortBy, sortOrder, limit, query, books, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                filter = req.query.filter;
                sortBy = req.query.sortBy || 'createdAt';
                sortOrder = req.query.sort === 'asc' ? 1 : -1;
                limit = parseInt(req.query.limit) || 10;
                query = {};
                if (filter)
                    query.genre = filter;
                return [4 /*yield*/, book_model_1.Book.find(query)
                        .sort((_a = {}, _a[sortBy] = sortOrder, _a))
                        .limit(limit)];
            case 1:
                books = _b.sent();
                res.status(200).json({
                    success: true,
                    message: 'Books retrieved successfully',
                    data: books,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllBooks = getAllBooks;
// 3. Get Book by ID
var getBookById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var book, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, book_model_1.Book.findById(req.params.bookId)];
            case 1:
                book = _a.sent();
                if (!book) {
                    res.status(404).json({ success: false, message: 'Book not found', error: 'NotFound' });
                    return [2 /*return*/];
                }
                res.status(200).json({ success: true, message: 'Book retrieved successfully', data: book });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookById = getBookById;
// 4. Update Book
var updateBook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var book, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, book_model_1.Book.findById(req.params.bookId)];
            case 1:
                book = _a.sent();
                if (!book) {
                    res.status(404).json({
                        success: false,
                        message: 'Book not found',
                        error: 'NotFound'
                    });
                    return [2 /*return*/];
                }
                Object.assign(book, req.body);
                return [4 /*yield*/, book.save()];
            case 2:
                _a.sent();
                res.status(200).json({
                    success: true,
                    message: 'Book updated successfully',
                    data: book
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateBook = updateBook;
// 5. Delete Book
var deleteBook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var book, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, book_model_1.Book.findByIdAndDelete(req.params.bookId)];
            case 1:
                book = _a.sent();
                if (!book) {
                    res.status(404).json({
                        success: false,
                        message: 'Book not found',
                        error: 'NotFound'
                    });
                    return [2 /*return*/];
                }
                res.status(200).json({
                    success: true,
                    message: 'Book deleted successfully',
                    data: null
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteBook = deleteBook;
