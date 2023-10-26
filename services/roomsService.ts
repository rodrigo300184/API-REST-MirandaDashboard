import roomsData from '../assets/data/roomsData.json';
import { RoomInterface } from '../models/roomsModel'

async function get() {
  const getAllRooms = await roomsData;
  if (!getAllRooms) throw new Error('Error obtaining all rooms');
  return getAllRooms;
}

async function getById(id: string) {
  const room = await roomsData.filter((element) => { return element.id === id })
  if (room.length === 0) throw new Error("Error obtaining the room or the room doesn't exist");
  return room;
}

async function post(newRoom: RoomInterface) {
  await roomsData.push(newRoom);
  return roomsData;
}

async function put(id: string, update: Partial<RoomInterface>) {
  const index = roomsData.findIndex((element) => element.id === id)
  roomsData[index] = { ...roomsData[index], ...update };
  return roomsData;
}

async function _delete(id: string) {
  const index = roomsData.findIndex((element) => element.id === id)
  if (index === -1) throw new Error("The room doesn't exist or couldn't be deleted");
  roomsData.splice(index, 1)
  return
}

export const roomsService = {
  get,
  getById,
  post,
  put,
  delete: _delete,
};