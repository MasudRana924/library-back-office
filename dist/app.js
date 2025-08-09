"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var books_routes_1 = __importDefault(require("../src/app/routes/books.routes"));
var borrows_routes_1 = __importDefault(require("../src/app/routes/borrows.routes"));
var errorHandler_1 = __importDefault(require("./app/middlewares/errorHandler"));
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express_1["default"].json());
// ✅ Routes
app.use('/api', books_routes_1["default"]);
app.use('/api', borrows_routes_1["default"]);
// ✅ Error handling middleware
app.use(errorHandler_1["default"]);
// Test route
app.get('/', function (req, res) {
    res.send('Welcome to library');
});
exports["default"] = app;
