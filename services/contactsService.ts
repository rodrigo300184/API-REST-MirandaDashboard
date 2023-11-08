import { Contact } from '../models/contactsModel';
import { ContactInterfase } from '../interfaces/contactsInterface';
import { selectQuery } from '../utils/api_connection';

async function fetchAll() {
  const getAllContacts = await selectQuery('SELECT * FROM contact;');
  return getAllContacts;
}

async function fetchOne(id: string) {
  const contact = await selectQuery(`SELECT * FROM contact WHERE id = ?`,[id]);
  if (!contact.length) throw new Error("Error obtaining the contact or the contact doesn't exist");
  return contact[0];
}

async function createOne(contact: ContactInterfase) {
  const query = `INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  const data = [contact.full_name,contact.email,contact.phone_number,contact.subject_of_review,contact.review_body,contact.date,contact.status];
  const newContact = await selectQuery(query, data);
  if (newContact.affectedRows === 0) throw new Error("The contact couldn't be created");
  const createdContact = await fetchOne(newContact.insertId);
  return createdContact;
}

async function editOne(id: string, update: Partial<ContactInterfase>) {
  const query = `UPDATE contact SET full_name = ?, email = ?, phone_number = ?, subject_of_review = ?, review_body = ?, date = ?, status = ? WHERE id = ?;`;
  const data = [update.full_name,update.email,update.phone_number,update.subject_of_review,update.review_body,update.date,update.status,id];
  const contactUpdate = await selectQuery(query, data);
  if (contactUpdate.affectedRows === 0) throw new Error("The contact doesn't exist or couldn't be updated");
  const updatedContact = await fetchOne(id);
  return updatedContact;
}

async function deleteOne(id: string) {
  const deletedContact = await selectQuery('DELETE FROM contact WHERE id = ?;',[id]);
  if (deletedContact.affectedRows === 0) throw new Error("The contact doesn't exist or couldn't be deleted");
  return
}

export const contactsService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};