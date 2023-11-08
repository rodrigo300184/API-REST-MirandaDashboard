import { User } from '../models/usersModel';
import { UsersInterface } from '../interfaces/usersInterface';
import { selectQuery } from '../utils/api_connection';

async function fetchAll() {
  const getAllUsers = await selectQuery('SELECT * FROM user;');
  return getAllUsers;
}

async function fetchOne(id: string) {
  const user = await selectQuery(`SELECT * FROM user WHERE id = ?`, [id]);
  if (!user.length) throw new Error("Error obtaining the user or the user doesn't exist");
  return user[0];
}

async function createOne(user: UsersInterface) {
  const query = `INSERT INTO user (full_name, email, photo, start_date, description, phone_number, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  const data = [user.full_name, user.email, user.photo, user.start_date, user.description, user.phone_number, user.status];
  const newUser = await selectQuery(query, data);
  if(newUser.affectedRows === 0) throw new Error("The user couldn't be created")
  const createdUser = await fetchOne(newUser.insertId);
  return createdUser;
}

async function editOne(id: string, update: Partial<UsersInterface>) {
  const query = `UPDATE user SET full_name = ?, email = ?, photo = ?, start_date = ?, description = ?, phone_number = ?, status = ? WHERE id = ?;`;
  const data = [update.full_name,update.email,update.photo,update.start_date,update.description,update.phone_number,update.status,id];
  const userUpdate = await selectQuery(query, data);
  if (!userUpdate) throw new Error("The user doesn't exist or couldn't be updated");
  const updatedUser = await fetchOne(id);
  return updatedUser;
}

async function deleteOne(id: string) {
  const deletedUser = await selectQuery(`DELETE FROM user WHERE id = ?`, [id]);
  if (deletedUser.affectedRows === 0) throw new Error("The user doesn't exist or couldn't be deleted");
  return
}

export const usersService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};