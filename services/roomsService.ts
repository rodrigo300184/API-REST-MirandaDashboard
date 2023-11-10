import { RoomInterface } from '../interfaces/roomsInterface'
import { selectQuery } from '../utils/api_connection';

async function fetchAll() {
  const getAllRooms = await selectQuery(`
  SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS photos,  GROUP_CONCAT(DISTINCT amenities) AS amenities FROM room r 
  LEFT JOIN photo p ON r.id = p.room_id
  LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id  
  LEFT JOIN amenity a ON a.id = ahr.amenity_id
  GROUP BY r.id`);
  return getAllRooms;
}

async function fetchOne(id: string) {
  const room = await selectQuery(`
  SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS photos,  GROUP_CONCAT(DISTINCT amenities) AS amenities FROM room r 
  LEFT JOIN photo p ON r.id = p.room_id
  LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id  
  LEFT JOIN amenity a ON a.id = ahr.amenity_id
  WHERE r.id = ?`,[id]);
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