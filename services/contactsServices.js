import fs from "fs/promises";
import path from "path";

const contactsPath = path.join(process.cwd(), "/db/contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removed = contacts.splice(index, 1);
  await writeContacts(contacts);
  return removed[0];
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

export async function updateContact(id, info) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const newContact = { ...contacts[index], ...info };
  contacts[index] = newContact;
  writeContacts(contacts);
  return newContact;
}
