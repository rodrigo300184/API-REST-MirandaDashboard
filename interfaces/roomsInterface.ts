export interface Iamenities { "name": string, "description": string }

export interface RoomInterface {
    "_id"?: string,
    "room_number": string,
    "room_photo": string,
    "room_type": string,
    "amenities": Iamenities[],
    "price": number,
    "offer_price": boolean,
    "discount": number,
    "status": string
}