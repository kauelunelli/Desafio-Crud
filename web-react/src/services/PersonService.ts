import { removeMask } from "../lib/mask";
import { IPerson } from "../interface/IPerson";
import { api } from "../lib/axios";

interface IGetPersons {

  name?: string;
  cpf?: string;
  limit?: number;
  offset?: number;
}

export const getPersons = async (params?: IGetPersons) => {
  try {
    const response = await api.get("/get-persons", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        name: params?.name,
        cpf: params?.cpf,
        limit: params?.limit,
        offset: params?.offset,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getPerson = async (id: string) => {
  try {
    const response = await api.get(`/get-person/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.person;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const createPerson = async (person: IPerson) => {
  person.cpf = removeMask(person.cpf);
  person.zipCode = removeMask(person.zipCode);
  try {
    const response = await api.post("/create-person", person, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.person;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const updatePerson = async (person: IPerson) => {
  person.cpf = removeMask(person.cpf);
  person.zipCode = removeMask(person.zipCode);
  try {
    const response = await api.put(`/update-person/${person.id}`, person, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.person;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const deletePerson = async (id: string) => {
  try {
    await api.delete(`/remove-person/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    window.location.reload();
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}