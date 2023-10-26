import contactData from '../assets/data/client_review.json';
import { ContactInterfase } from '../models/contactsModel';

async function get() {
  const getAllContacts = await contactData;
  if (!getAllContacts) throw new Error('Error obtaining all contacts');
  return getAllContacts;
}

async function getById(id: string) {
  const contact = await contactData.filter((element) => { return element.id === id })
  if (contact.length === 0) throw new Error("Error obtaining the contact or the contact doesn't exist");
  return contact;
}

async function post(newContact: ContactInterfase) {
  await contactData.push(newContact);
  return contactData;
}

async function put(id: string, update: Partial<ContactInterfase>) {
  const index = contactData.findIndex((element) => element.id === id)
  if (index === -1) throw new Error("The contact doesn't exist or couldn't be updated");
  contactData[index] = { ...contactData[index], ...update };
  return contactData;
}

async function _delete(id: string) {
  const index = contactData.findIndex((element) => element.id === id)
  if (index === -1) throw new Error("The contact doesn't exist or couldn't be deleted");
  contactData.splice(index, 1)
  return
}

export const contactsService = {
  get,
  getById,
  post,
  put,
  delete: _delete,
};