import { faker } from '@faker-js/faker';
import { UsersInterface } from './interfaces/usersInterface';
import { BookingInterface } from './interfaces/bookingsInterface';
import { RoomInterface } from './interfaces/roomsInterface';
import { Rooms } from './models/roomsModel';
import { Bookings } from './models/bookingsModel';
import mongoose from 'mongoose';
import 'dotenv/config';
import { Users } from './models/usersModel';
import { Contacts } from './models/contactsModel';

const UrlMongo = process.env.URL_ATLAS;
const UrlLocal = process.env.URL_LOCAL;

(async () => {
    try {
        await mongoose.connect(UrlLocal as string, {
            dbName: 'Miranda_API',

        })
        console.log('Conectado a Mongo')

    } catch (error) {
        console.log(error);
    }
})()

ScriptSeed()


export async function ScriptSeed() {
    const quantity = 20;
    const rooms = [];
    Bookings.collection.drop();
    Rooms.collection.drop();
    Contacts.collection.drop();
    Users.collection.drop();
    

    //hashed password = 1234
    await Users.create(
        {
            "full_name": faker.person.fullName(),
            "email": 'email@email.com',
            "password": "$2a$10$sZVl1VpxdgSnawuwPj7z.eyJDBZmOiRAqHqjT4zTtIh7qIHbMznuC",
            "photo": faker.image.avatar(),
            "start_date": faker.date.between({ from: '1970-01-01T00:00:00.000Z', to: '2005-12-31T00:00:00.000Z' }).toISOString().slice(0,10),
            "description": faker.person.jobDescriptor(),
            "phone_number": faker.phone.number(),
            "status": faker.helpers.arrayElement(['Active', 'Inactive'])
        }
    )


    for (let i = 0; i < quantity; i++) {
        const newRoom = createRandomRoom();
        const room = await Rooms.create(newRoom)
        rooms.push(room);

    }

    for (let i = 0; i < quantity; i++) {
        const randomRoom: any = rooms[Math.floor(Math.random() * (quantity - 1))];
        const booking = createRandomBooking(randomRoom)
        await Bookings.create(booking);

    }

    for (let i = 0; i < quantity; i++) {
        const user = createRandomUser()
        await Users.create(user);
    }

    function createRandomUser(): UsersInterface {
        return {
            "full_name": faker.person.fullName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "photo": faker.image.avatar(),
            "start_date": faker.date.between({ from: '1970-01-01T00:00:00.000Z', to: '2005-12-31T00:00:00.000Z' }).toISOString().slice(0,10),
            "description": faker.person.jobDescriptor(),
            "phone_number": faker.phone.number(),
            "status": faker.helpers.arrayElement(['Active', 'Inactive'])
        };
    }

    function createRandomRoom(): RoomInterface {
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
        const roomType = faker.helpers.arrayElement(['Double Superior', 'Single Bed', 'Suite', 'Double Bed']);
        const amenities = roomType === 'Double Superior' ? amenitiesDoubleSuperior :
            roomType === 'Single Bed' ? amenitiesSingleBed :
                roomType === 'Suite' ? amenitiesSuite : amenitiesDoubleBed;
        const price = roomType === 'Double Superior' ? 250 :
            roomType === 'Single Bed' ? 140 :
                roomType === 'Suite' ? 370 : 180;
        const offer = faker.datatype.boolean(0.3);
        const discount = offer ? Math.floor(Math.random() * (25 - 5) + 5) : 0;
        const roomNumber = Math.floor(Math.random() * (9) + 1) * 100 + Math.floor(Math.random() * (9) + 1)

        return {
            "room_number": roomNumber.toString(),
            "room_photo": [faker.image.urlPicsumPhotos()],
            "room_type": roomType,
            "amenities": amenities,
            "price": price,
            "offer_price": offer,
            "discount": discount,
            "status": faker.helpers.arrayElement(['Available', 'Booked']),
        };
    }

    function createRandomBooking(room: RoomInterface): BookingInterface {
        const date = faker.date.between({ from: '2000-01-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' });
        const date2 = faker.date.between({ from: date, to: '2023-10-31T00:00:00.000Z' });
        const date3 = faker.date.between({ from: date2, to: '2023-10-31T00:00:00.000Z' });


        return {
            "guest": faker.person.fullName(),
            "phone_number": faker.phone.number(),
            "order_date": date.toISOString().slice(0,10),
            "check_in": date2.toISOString().slice(0,10),
            "check_out": date3.toISOString().slice(0,10),
            "special_request": faker.lorem.words({ min: 1, max: 25 }),
            "room_id": room._id || '',
            "room_type": room.room_type,
            "room_number": room.room_number,
            "status": faker.helpers.arrayElement(['Check In', 'Check Out', 'In Progress']),
            "photos": ["https://example.com/room_photos/single_bed_1_medium.jpg",
                "https://example.com/room_photos/single_bed_2_medium.jpg",
                "https://example.com/room_photos/single_bed_3_medium.jpg"]
        };
    }
    mongoose.disconnect()
}

