import { Contacts } from '../models/contactsModel';
import { ContactInterfase } from '../interfaces/contactsInterface';

async function fetchAll() {
  const getAllContacts = await Contacts.find();
  if (!getAllContacts) throw new Error('Error obtaining all contacts');
  return getAllContacts;
}

async function fetchOne(id: string) {
  const contact = await Contacts.findById(id);
  if (!contact) throw new Error("Error obtaining the contact or the contact doesn't exist");
  return contact;
}

async function createOne(contact: ContactInterfase) {
  const newContact = await Contacts.create(contact);
  if (!newContact) throw new Error("The contact couldn't be created");
  return newContact;
}

async function editOne(id: string, update: Partial<ContactInterfase>) {
  const updatedContact = Contacts.findByIdAndUpdate(id, update);
  if (!updatedContact) throw new Error("The contact doesn't exist or couldn't be updated");
  return updatedContact;
}

async function deleteOne(id: string) {
  const deletedContact = Contacts.findByIdAndDelete(id);
  if (!deletedContact) throw new Error("The contact doesn't exist or couldn't be deleted");
  return deletedContact;
}

export const contactsService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};