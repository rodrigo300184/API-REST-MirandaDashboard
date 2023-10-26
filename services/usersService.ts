import usersData from '../assets/data/employee_data.json';
import { UsersInterface } from '../models/usersModel';

async function get() {
  const getAllUsers = await usersData;
  if (!getAllUsers) throw new Error('Error obtaining all users');
  return getAllUsers;
}

async function getById(id: string) {
  const user = await usersData.filter((element) => { return element.employee_id === id })
  if (user.length === 0) throw new Error("Error obtaining the user or the user doesn't exist");
  return user;
}

async function post(newUser: UsersInterface) {
  await usersData.push(newUser);
  return usersData;
}

async function put(id: string, update: Partial<UsersInterface>) {
  const index = usersData.findIndex((element) => element.employee_id === id)
  if (index === -1) throw new Error("The user doesn't exist or couldn't be updated");
  usersData[index] = { ...usersData[index], ...update };
  return usersData;
}

async function _delete(id: string) {
  const index = usersData.findIndex((element) => element.employee_id === id)
  if (index === -1) throw new Error("The user doesn't exist or couldn't be deleted");
  usersData.splice(index, 1)
  return
}

export const usersService = {
  get,
  getById,
  post,
  put,
  delete: _delete,
};