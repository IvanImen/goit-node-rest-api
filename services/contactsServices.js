import { Contact } from "../db/models/Contact.js";

export async function listContacts(id) {
  const contacts = await Contact.find({ owner: id });
  return contacts;
}

export async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  return contact;
}

export async function getContact(query) {
  const contact = await Contact.findOne(query);
  return contact;
}

export async function removeContact(query) {
  const contact = await Contact.findOneAndDelete(query);
  return contact;
}

export async function addContact({ name, email, phone }, owner) {
  const newContact = new Contact({ name, email, phone, owner });
  const contact = await newContact.save();
  return contact;
}

export async function updateContact(query, info) {
  const updatedContact = await Contact.findOneAndUpdate(query, info, {
    new: true,
  });
  return updatedContact;
}
