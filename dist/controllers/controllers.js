"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const express_1 = require("express");
exports.controllers = (0, express_1.Router)();
exports.controllers.get('/', (req, res) => {
    res.send('En serio?!');
});
exports.controllers.get('/bookings', (req, res) => {
    res.send('Hello Bookings!');
});
exports.controllers.get('/bookings/:id', (req, res) => {
    res.send(`Hello Bookings ${req.params.id}!`);
});
exports.controllers.get('/rooms', (req, res) => {
    res.send('Hello Rooms!');
});
exports.controllers.get('/rooms/{id}', (req, res) => {
    res.send('Hello Rooms ID!');
});
exports.controllers.get('/contact', (req, res) => {
    res.send('Hello Bookings!');
});
exports.controllers.get('/users', (req, res) => {
    res.send('Hello Bookings!');
});
