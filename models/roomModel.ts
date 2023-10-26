
export interface RoomInterface {
    "id": string,
    "room_photo": string,
    "room_type": string,
    "amenities": [
        { "name": string, "description": string },
        { "name": string, "description": string },
        { "name": string, "description": string },
        { "name": string, "description": string },
        { "name": string, "description": string },
        { "name": string, "description": string },
        { "name": string, "description": string },
        { "name": string, "description": string },
        { "name": string, "description": string }
    ],
    "price": number,
    "offer_price": boolean,
    "discount": number,
    "status": string
}