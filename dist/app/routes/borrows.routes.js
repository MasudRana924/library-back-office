"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var borrow_controller_1 = require("../controllers/borrow.controller");
var validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
var borrow_validation_1 = require("../validations/borrow.validation");
var router = express_1["default"].Router();
// POST /api/borrow - Borrow a book
router.post('/borrow', (0, validateRequest_1["default"])(borrow_validation_1.borrowBookSchema), borrow_controller_1.borrowBook);
// GET /api/borrow - Get borrow summary using aggregation
router.get('/borrow', borrow_controller_1.getBorrowSummary);
exports["default"] = router;
