import { Rooms } from '../models/roomsModel';
import { RoomInterface } from '../interfaces/roomsInterface'

async function fetchAll() {
  const getAllRooms = await Rooms.find();
  if (!getAllRooms) throw new Error('Error obtaining all rooms');
  return getAllRooms;
}

async function fetchOne(id: string) {
  const room = await Rooms.findById(id);
  if (!room) throw new Error("Error obtaining the room or the room doesn't exist");
  return room;
}

async function createOne(room: RoomInterface) {
  const newRoom = await Rooms.create(room);
  if (!newRoom) throw new Error("The room couldn't be created");
  return newRoom;
}

async function editOne(id: string, update: Partial<RoomInterface>) {
  const updatedRoom = Rooms.findByIdAndUpdate(id,update)
  if (!updatedRoom) throw new Error("The room doesn't exist or couldn't be updated");
  return updatedRoom;
}

async function deleteOne(id: string) {
  const deletedRoom = Rooms.findByIdAndDelete(id);
  if (!deletedRoom) throw new Error("The room doesn't exist or couldn't be deleted");
  return deletedRoom;
}

export const roomsService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};