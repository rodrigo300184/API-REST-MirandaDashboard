import { Users } from '../models/usersModel';
import { UsersInterface } from '../interfaces/usersInterface';

async function fetchAll() {
  const getAllUsers = await Users.find();
  if (!getAllUsers) throw new Error('Error obtaining all users');
  return getAllUsers;
}

async function fetchOne(id: string) {
  const user = await Users.findById(id);
  if (!user) throw new Error("Error obtaining the user or the user doesn't exist");
  return user;
}

async function createOne(user: UsersInterface) {
  const newUser = await Users.create(user);
  if(!newUser) throw new Error("The user couldn't be created")
  return newUser;
}

async function editOne(id: string, update: Partial<UsersInterface>) {
  const updatedUser = await Users.findByIdAndUpdate(id,update);
  if (!updatedUser) throw new Error("The user doesn't exist or couldn't be updated");
  return updatedUser;
}

async function deleteOne(id: string) {
  const deletedUser = await Users.findByIdAndDelete(id);
  if (!deletedUser) throw new Error("The user doesn't exist or couldn't be deleted");
  return deletedUser;
}

export const usersService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};