"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
app_1.app.get('/', (req, res) => {
    res.send('En serio?!');
});
app_1.app.get('/bookings', (req, res) => {
    res.send('Hello Bookings!');
});
app_1.app.get('/bookings/{id}', (req, res) => {
    res.send('Hello Bookings ID!');
});
app_1.app.get('/rooms', (req, res) => {
    res.send('Hello Rooms!');
});
app_1.app.get('/rooms/{id}', (req, res) => {
    res.send('Hello Rooms ID!');
});
app_1.app.get('/contact', (req, res) => {
    res.send('Hello Bookings!');
});
app_1.app.get('/users', (req, res) => {
    res.send('Hello Bookings!');
});
