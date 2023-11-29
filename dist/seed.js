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
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const api_connection_1 = require("./utils/api_connection");
scriptSeed();
function scriptSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        const bookingsQuantity = 60;
        const roomsQuantity = 20;
        const userQuantity = 20;
        const contactQuantity = 20;
        const rooms = [];
        const images = ["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1260&h=750&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1260&h=750&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1260&h=750&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1570737209810-87a8e7245f88?q=80&w=1260&h=750&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1260&h=750&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1633505650701-6104c4fc72c2?q=80&w=1260&h=750&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1640109478916-f445f8f19b11?q=80&w=1260&h=750&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ];
        yield (0, api_connection_1.selectQuery)(`CREATE TABLE IF NOT EXISTS room (id INT NOT NULL AUTO_INCREMENT, room_number INT NOT NULL,
                     room_type VARCHAR(45) NOT NULL, description LONGTEXT NOT NULL, price INT NOT NULL,
                     offer_price TINYINT(1) NOT NULL, discount INT NOT NULL, status VARCHAR(45) NOT NULL, PRIMARY KEY(id));`);
        yield (0, api_connection_1.selectQuery)(`CREATE TABLE IF NOT EXISTS booking (id INT NOT NULL AUTO_INCREMENT,
                                                           guest VARCHAR(255) NOT NULL,
                                                           phone_number VARCHAR(45) NOT NULL,
                                                           email VARCHAR(255) NOT NULL,
                                                           order_date DATE NOT NULL DEFAULT (CURRENT_DATE),
                                                           check_in DATE NOT NULL,
                                                           check_out DATE NOT NULL,
                                                           special_request VARCHAR(255) NOT NULL,
                                                           status VARCHAR(45) NOT NULL,
                                                           room_id INT NOT NULL,
                                                           PRIMARY KEY(id),
                                                           FOREIGN KEY (room_id) REFERENCES room (id) ON DELETE CASCADE ON UPDATE CASCADE);`);
        yield (0, api_connection_1.selectQuery)(`CREATE TABLE IF NOT EXISTS user (id INT NOT NULL AUTO_INCREMENT,
                                                        full_name VARCHAR(255) NOT NULL,
                                                        email VARCHAR(255) NOT NULL,
                                                        photo VARCHAR(255) NOT NULL,
                                                        start_date DATE NOT NULL,
                                                        description VARCHAR(255) NOT NULL,
                                                        phone_number VARCHAR(45) NOT NULL,
                                                        status VARCHAR(45) NOT NULL,
                                                        PRIMARY KEY (id));`);
        yield (0, api_connection_1.selectQuery)(`CREATE TABLE IF NOT EXISTS contact (id INT NOT NULL AUTO_INCREMENT,
                                                           full_name VARCHAR(255) NOT NULL,
                                                           email VARCHAR(255) NOT NULL,
                                                           phone_number VARCHAR(45) NOT NULL,
                                                           subject_of_review VARCHAR(255) NOT NULL,
                                                           review_body LONGTEXT NOT NULL,
                                                           date DATE NOT NULL,
                                                           status VARCHAR(45) NOT NULL,
                                                           PRIMARY KEY (id));`);
        yield (0, api_connection_1.selectQuery)(`CREATE TABLE IF NOT EXISTS photo (id INT NOT NULL AUTO_INCREMENT,
                                                         photos VARCHAR(255) NOT NULL,
                                                         room_id INT NOT NULL,
                                                         PRIMARY KEY (id),
                                                         FOREIGN KEY (room_id) REFERENCES room (id) ON DELETE CASCADE ON UPDATE CASCADE);`);
        yield (0, api_connection_1.selectQuery)(`CREATE TABLE IF NOT EXISTS amenity (id INT NOT NULL AUTO_INCREMENT,
                                                           amenities VARCHAR(255) NOT NULL,
                                                           PRIMARY KEY (id));`);
        yield (0, api_connection_1.selectQuery)(`CREATE TABLE IF NOT EXISTS amenities_has_room (room_id INT NOT NULL,
                                                                      amenity_id INT NOT NULL,
                                                                      FOREIGN KEY (room_id) REFERENCES room (id) ON DELETE CASCADE ON UPDATE CASCADE,
                                                                      FOREIGN KEY (amenity_id) REFERENCES amenity (id), 
                                                                      PRIMARY KEY (room_id, amenity_id));`);
        yield (0, api_connection_1.selectQuery)(`INSERT INTO amenity (amenities) VALUES ('Free Wifi'), ('Automobile'), ('Cocktails'), ('Gym'), ('Extra Bed'), ('No Smoking'), ('Air Conditioner');`);
        for (let i = 0; i < roomsQuantity; i++) {
            const room = createRandomRoom();
            const data = [room.room_number, room.room_type, room.description, room.price, room.offer_price, room.discount, room.status];
            const query = `INSERT INTO room (room_number, room_type, description, price, offer_price, discount, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
            const newRoom = yield (0, api_connection_1.selectQuery)(query, data);
            const createdRoom = yield (0, api_connection_1.selectQuery)(`SELECT * FROM room WHERE id = ?`, [newRoom.insertId]);
            yield (0, api_connection_1.selectQuery)(`INSERT INTO photo (photos,room_id) VALUES (?,?);`, [images[Math.floor(Math.random() * 10)], newRoom.insertId]);
            const amenitiesNumber = Math.floor(Math.random() * 3 + 4);
            if (amenitiesNumber === 4) {
                yield (0, api_connection_1.selectQuery)(`INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (?, ?), (?, ?), (?, ?), (?, ?);`, [newRoom.insertId, 1, newRoom.insertId, 2, newRoom.insertId, 3, newRoom.insertId, 4]);
            }
            else if (amenitiesNumber === 5) {
                yield (0, api_connection_1.selectQuery)(`INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (?, ?), (?, ?), (?, ?), (?, ?),(?,?);`, [newRoom.insertId, 1, newRoom.insertId, 2, newRoom.insertId, 3, newRoom.insertId, 4, newRoom.insertId, 5]);
            }
            else if (amenitiesNumber === 6) {
                yield (0, api_connection_1.selectQuery)(`INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (?, ?), (?, ?), (?, ?), (?, ?),(?,?),(?,?);`, [newRoom.insertId, 1, newRoom.insertId, 2, newRoom.insertId, 3, newRoom.insertId, 4, newRoom.insertId, 5, newRoom.insertId, 6]);
            }
            else {
                yield (0, api_connection_1.selectQuery)(`INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (?, ?), (?, ?), (?, ?), (?, ?), (?, ?),(?,?),(?,?);`, [newRoom.insertId, 1, newRoom.insertId, 2, newRoom.insertId, 3, newRoom.insertId, 4, newRoom.insertId, 5, newRoom.insertId, 6, newRoom.insertId, 7]);
            }
            rooms.push(createdRoom[0]);
        }
        for (let i = 0; i < bookingsQuantity; i++) {
            const randomRoom = rooms[Math.floor(Math.random() * (roomsQuantity - 1))];
            const booking = createRandomBooking(randomRoom);
            const query = `INSERT INTO booking (guest,phone_number, order_date, check_in, check_out,special_request, status, room_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
            const data = [booking.guest, booking.phone_number, booking.order_date, booking.check_in, booking.check_out, booking.special_request,
                booking.status, booking.room_id];
            yield (0, api_connection_1.selectQuery)(query, data);
        }
        for (let i = 0; i < userQuantity; i++) {
            const user = createRandomUser();
            const query = `INSERT INTO user (full_name, email, photo, start_date, description, phone_number, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
            const data = [user.full_name, user.email, user.photo, user.start_date, user.description, user.phone_number, user.status];
            yield (0, api_connection_1.selectQuery)(query, data);
        }
        for (let i = 0; i < contactQuantity; i++) {
            const contact = createRandomContact();
            const query = `INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
            const data = [contact.full_name, contact.email, contact.phone_number, contact.subject_of_review, contact.review_body, contact.date, contact.status];
            yield (0, api_connection_1.selectQuery)(query, data);
        }
        function createRandomUser() {
            return {
                "full_name": faker_1.faker.person.fullName(),
                "email": faker_1.faker.internet.email(),
                "photo": faker_1.faker.image.avatar(),
                "start_date": faker_1.faker.date.between({ from: '1970-01-01T00:00:00.000Z', to: '2005-12-31T00:00:00.000Z' }).toISOString().split('T')[0],
                "description": faker_1.faker.person.jobDescriptor(),
                "phone_number": faker_1.faker.phone.number(),
                "status": faker_1.faker.helpers.arrayElement(['Active', 'Inactive'])
            };
        }
        function createRandomContact() {
            return {
                "full_name": faker_1.faker.person.fullName(),
                "email": faker_1.faker.internet.email(),
                "phone_number": faker_1.faker.phone.number(),
                "subject_of_review": faker_1.faker.lorem.words({ min: 1, max: 7 }),
                "review_body": faker_1.faker.lorem.words({ min: 1, max: 50 }),
                "date": faker_1.faker.date.between({ from: '1970-01-01T00:00:00.000Z', to: '2005-12-31T00:00:00.000Z' }).toISOString().split('T')[0],
                "status": faker_1.faker.helpers.arrayElement(['Active', 'Inactive'])
            };
        }
        function createRandomRoom() {
            const roomType = faker_1.faker.helpers.arrayElement(['Double Superior', 'Luxury', 'Suite', 'Double Bed']);
            const price = roomType === 'Double Superior' ? 250 :
                roomType === 'Single Bed' ? 140 :
                    roomType === 'Suite' ? 370 : 180;
            const offer = faker_1.faker.datatype.boolean(0.3);
            const discount = offer ? Math.floor(Math.random() * (25 - 5) + 5) : 0;
            const roomNumber = Math.floor(Math.random() * (9) + 1) * 100 + Math.floor(Math.random() * (9) + 1);
            return {
                "room_number": roomNumber.toString(),
                "room_type": roomType,
                "description": faker_1.faker.lorem.words({ min: 12, max: 18 }),
                "price": price,
                "offer_price": offer,
                "discount": discount,
                "status": faker_1.faker.helpers.arrayElement(['Available', 'Booked']),
            };
        }
        function createRandomBooking(room) {
            const date = faker_1.faker.date.between({ from: '2000-01-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' });
            const date2 = faker_1.faker.date.between({ from: date, to: '2023-10-31T00:00:00.000Z' });
            const date3 = faker_1.faker.date.between({ from: date2, to: '2023-10-31T00:00:00.000Z' });
            return {
                "guest": faker_1.faker.person.fullName(),
                "phone_number": faker_1.faker.phone.number(),
                "email": faker_1.faker.internet.email(),
                "order_date": date.toISOString().split('T')[0],
                "check_in": date2.toISOString().split('T')[0],
                "check_out": date3.toISOString().split('T')[0],
                "special_request": faker_1.faker.lorem.words({ min: 1, max: 25 }),
                "room_id": room.id || 0,
                "status": faker_1.faker.helpers.arrayElement(['Available', 'Booked']),
            };
        }
        process.exit();
    });
}
//# sourceMappingURL=seed.js.map