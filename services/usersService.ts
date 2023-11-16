import { Users } from '../models/usersModel';
import { UsersInterface } from '../interfaces/usersInterface';
import  bcrypt from 'bcryptjs'; 

async function fetchAll() {
  const getAllUsers = await Users.find();
  if (!getAllUsers) throw new Error('Error obtaining all employees');
  return getAllUsers;
}

async function fetchOne(id: string) {
  const user = await Users.findById(id);
  if (!user) throw new Error("Error obtaining the employee or the employee doesn't exist");
  return user;
}

async function createOne(user: UsersInterface) {
  user.password = bcrypt.hashSync(user.password || '', 10);
  const newUser = await Users.create(user);
  if(!newUser) throw new Error("The employee couldn't be created")
  return newUser;
}

async function editOne(id: string, update: Partial<UsersInterface>) {
  const updatedUser = await Users.findByIdAndUpdate(id,update);
  if (!updatedUser) throw new Error("The employee doesn't exist or couldn't be updated");
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