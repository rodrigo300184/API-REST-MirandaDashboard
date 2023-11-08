import { RoomInterface } from '../interfaces/roomsInterface'
import { selectQuery } from '../utils/api_connection';

async function fetchAll() {
  const getAllRooms = await selectQuery('SELECT * FROM room;');
  return getAllRooms;
}

async function fetchOne(id: string) {
  const room = await selectQuery(`SELECT * FROM room WHERE id = ?`,[id]);
  if (!room.length) throw new Error("Error obtaining the room or the room doesn't exist");
  return room[0];
}

async function createOne(room: RoomInterface) {
  const query = `INSERT INTO room (room_number, room_type, description, price, offer_price, discount, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  const data = [room.room_number, room.room_type, room.description, room.price, room.offer_price, room.discount,room.status];
  const newRoom = await selectQuery(query, data);
  if (newRoom.affectedRows===0) throw new Error("The room couldn't be created");
  const createdRoom = await fetchOne(newRoom.insertId);
  return createdRoom;
}

async function editOne(id: string, update: Partial<RoomInterface>) {
  const query = `UPDATE room SET room_number = ?, room_type = ?, description = ?, price = ?, offer_price = ?, discount = ?, status = ? WHERE id = ?`;
  const data = [update.room_number, update.room_type, update.description, update.price, update.offer_price, update.discount,update.status, id];
  const roomUpdate = await selectQuery(query, data);
  if (roomUpdate.affectedRows===0) throw new Error("The room doesn't exist or couldn't be updated");
  const updatedRoom = await fetchOne(id);
  return updatedRoom;
}

async function deleteOne(id: string) {
  const deletedRoom = await selectQuery(`DELETE FROM room WHERE id = ${id}`);
  if (deletedRoom.affectedRows===0) throw new Error("The room doesn't exist or couldn't be deleted");
  return
}

export const roomsService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};