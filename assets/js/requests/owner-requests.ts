import { Field } from "../pages/owner/InitialSetup";

const axios = require('axios').default;

export const createOwner = (name: string) => {
  return axios.post("/sign-up-owner", { name });
};

export const addProductsFields = (fields: Field[]) => {
  return axios.post("/add-fields", { fields });
};

export const removeProductsFields = (fieldsNames: string) => {
  return axios.post("/remove-fields", { fieldsNames });
};
