import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  const id = req.user._id;
  try {
    const contacts = await contactsService.listContacts(id);
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsService.getContact({
      _id: id,
      owner: req.user._id,
    });
    if (contact === null) {
      throw HttpError(404, "Not found");
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsService.removeContact({
      _id: id,
      owner: req.user._id,
    });
    if (contact === null) {
      throw HttpError(404, "Not found");
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = await contactsService.addContact(req.body, req.user._id);
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "Body must have at least one field");
    }
    const contact = await contactsService.updateContact(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body
    );
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const contact = await contactsService.updateContact(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body
    );
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};
