"use strict";
exports.__esModule = true;
exports.borrowBookSchema = void 0;
// src/validations/borrow.validation.ts
var zod_1 = require("zod");
exports.borrowBookSchema = zod_1.z.object({
    book: zod_1.z.string({ required_error: 'Book ID is required' }),
    quantity: zod_1.z
        .number({ required_error: 'Quantity is required' })
        .int()
        .positive('Quantity must be a positive number'),
    dueDate: zod_1.z.string({ required_error: 'Due date is required' }).refine(function (val) { return !isNaN(Date.parse(val)); }, {
        message: 'Invalid date format'
    })
});
