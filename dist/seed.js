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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptSeed = void 0;
const faker_1 = require("@faker-js/faker");
const roomsModel_1 = require("./models/roomsModel");
const bookingsModel_1 = require("./models/bookingsModel");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const usersModel_1 = require("./models/usersModel");
const UrlMongo = process.env.URL_ATLAS;
const UrlLocal = process.env.URL_LOCAL;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(UrlLocal, {
            dbName: 'Miranda_API',
        });
        console.log('Conectado a Mongo');
    }
    catch (error) {
        console.log(error);
    }
}))();
// Bookings.collection.drop();
// Rooms.collection.drop();
// Contacts.collection.drop();
// Users.collection.drop();
ScriptSeed();
function ScriptSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        const quantity = 20;
        const rooms = [];
        yield usersModel_1.Users.create({
            "full_name": faker_1.faker.person.fullName(),
            "email": 'email@email.com',
            "password": '1234',
            "photo": faker_1.faker.image.avatar(),
            "start_date": faker_1.faker.date.between({ from: '1970-01-01T00:00:00.000Z', to: '2005-12-31T00:00:00.000Z' }).toLocaleDateString(),
            "description": faker_1.faker.person.jobDescriptor(),
            "phone_number": faker_1.faker.phone.number(),
            "status": faker_1.faker.helpers.arrayElement(['Active', 'Inactive'])
        });
        for (let i = 0; i < quantity; i++) {
            const newRoom = createRandomRoom();
            const room = yield roomsModel_1.Rooms.create(newRoom);
            rooms.push(room);
        }
        for (let i = 0; i < quantity; i++) {
            const randomRoom = rooms[Math.floor(Math.random() * (quantity - 1))];
            const booking = createRandomBooking(randomRoom);
            yield bookingsModel_1.Bookings.create(booking);
        }
        for (let i = 0; i < quantity; i++) {
            const user = createRandomUser();
            yield usersModel_1.Users.create(user);
        }
        function createRandomUser() {
            return {
                "full_name": faker_1.faker.person.fullName(),
                "email": faker_1.faker.internet.email(),
                "password": faker_1.faker.internet.password(),
                "photo": faker_1.faker.image.avatar(),
                "start_date": faker_1.faker.date.between({ from: '1970-01-01T00:00:00.000Z', to: '2005-12-31T00:00:00.000Z' }).toLocaleDateString(),
                "description": faker_1.faker.person.jobDescriptor(),
                "phone_number": faker_1.faker.phone.number(),
                "status": faker_1.faker.helpers.arrayElement(['Active', 'Inactive'])
            };
        }
        function createRandomRoom() {
            const amenitiesSuite = [
                { "name": "1/3 Bed Space", "description": "Spacious bed area" },
                { "name": "24-Hour Guard", "description": "Security available around the clock" },
                { "name": "Free Wifi", "description": "High-speed internet access" },
                { "name": "Air Conditioner", "description": "Climate control" },
                { "name": "Television", "description": "Flat-screen TV" },
                { "name": "Towels", "description": "Fresh towels provided" },
                { "name": "Mini Bar", "description": "Mini bar with refreshments" },
                { "name": "Coffee Set", "description": "Coffee and tea making facilities" },
                { "name": "Bathtub", "description": "Luxurious bathtub" },
                { "name": "Jacuzzi", "description": "Private Jacuzzi" },
                { "name": "Nice Views", "description": "Scenic views from the room" }
            ];
            const amenitiesDoubleBed = [
                { "name": "1/2 Bathroom", "description": "Private half bathroom" },
                { "name": "Air Conditioner", "description": "Climate control" },
                { "name": "Television", "description": "Flat-screen TV" },
                { "name": "Towels", "description": "Fresh towels provided" },
                { "name": "Mini Bar", "description": "Mini bar with refreshments" },
                { "name": "Coffee Set", "description": "Coffee and tea making facilities" }
            ];
            const amenitiesDoubleSuperior = [
                { "name": "1/3 Bed Space", "description": "Spacious bed area" },
                { "name": "24-Hour Guard", "description": "Security available around the clock" },
                { "name": "Free Wifi", "description": "High-speed internet access" },
                { "name": "Air Conditioner", "description": "Climate control" },
                { "name": "Television", "description": "Flat-screen TV" },
                { "name": "Towels", "description": "Fresh towels provided" },
                { "name": "Mini Bar", "description": "Mini bar with refreshments" },
                { "name": "Coffee Set", "description": "Coffee and tea making facilities" },
                { "name": "Nice Views", "description": "Scenic views from the room" }
            ];
            const amenitiesSingleBed = [
                { "name": "1/3 Bed Space", "description": "Cozy bed area" },
                { "name": "Free Wifi", "description": "Complimentary Wi-Fi" },
                { "name": "Air Conditioner", "description": "Climate control" },
                { "name": "Television", "description": "Flat-screen TV" },
                { "name": "Towels", "description": "Fresh towels provided" },
                { "name": "Coffee Set", "description": "Coffee and tea making facilities" }
            ];
            const roomType = faker_1.faker.helpers.arrayElement(['Double Superior', 'Single Bed', 'Suite', 'Double Bed']);
            const amenities = roomType === 'Double Superior' ? amenitiesDoubleSuperior :
                roomType === 'Single Bed' ? amenitiesSingleBed :
                    roomType === 'Suite' ? amenitiesSuite : amenitiesDoubleBed;
            const price = roomType === 'Double Superior' ? 250 :
                roomType === 'Single Bed' ? 140 :
                    roomType === 'Suite' ? 370 : 180;
            const offer = faker_1.faker.datatype.boolean(0.3);
            const discount = offer ? Math.floor(Math.random() * (25 - 5) + 5) : 0;
            const roomNumber = Math.floor(Math.random() * (9) + 1) * 100 + Math.floor(Math.random() * (9) + 1);
            return {
                "room_number": roomNumber.toString(),
                "room_photo": faker_1.faker.helpers.arrayElement(["https://example.com/room_photos/single_bed_1_medium.jpg",
                    "https://example.com/room_photos/single_bed_2_medium.jpg",
                    "https://example.com/room_photos/single_bed_3_medium.jpg"]) || '',
                "room_type": roomType,
                "amenities": amenities,
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
                "order_date": date.toLocaleDateString(),
                "check_in": date2.toLocaleDateString(),
                "check_out": date3.toLocaleDateString(),
                "special_request": faker_1.faker.lorem.words({ min: 1, max: 25 }),
                "room_id": room._id || '',
                "room_type": room.room_type,
                "room_number": room.room_number,
                "status": faker_1.faker.helpers.arrayElement(['Available', 'Booked']),
                "photos": ["https://example.com/room_photos/single_bed_1_medium.jpg",
                    "https://example.com/room_photos/single_bed_2_medium.jpg",
                    "https://example.com/room_photos/single_bed_3_medium.jpg"]
            };
        }
        mongoose_1.default.disconnect();
    });
}
exports.ScriptSeed = ScriptSeed;
//# sourceMappingURL=seed.js.map