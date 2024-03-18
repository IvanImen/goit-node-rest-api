import { Contact } from "../db/models/Contact.js";

export async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

export async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  return contact;
}

export async function removeContact(contactId) {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
}

export async function addContact(name, email, phone) {
  const newContact = new Contact({ name, email, phone });
  const contact = await newContact.save();
  return contact;
}

export async function updateContact(id, info) {
  const updatedContact = await Contact.findByIdAndUpdate(id, info, {
    new: true,
  });
  return updatedContact;
}
