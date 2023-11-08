export interface Iamenities { "name": string, "description": string }

export interface RoomInterface {
    "id"?: number,
    "room_number": string,
    "room_type": string,
    "description": string;
    "price": number,
    "offer_price": boolean,
    "discount": number,
    "status": string
}