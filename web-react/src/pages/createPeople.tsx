import { createPerson } from "../services/PersonService";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Modal } from "../components/modal";
import { IPerson } from "../interface/IPerson";
import { applyMask } from "../lib/mask";
import { useState } from "react";

export function CreatePeoplePage({
  closeModalCreate,
}: {
  closeModalCreate: () => void;
}) {
  const [person, setPerson] = useState<IPerson>({
    cpf: "",
    name: "",
    rg: "",
    zipCode: "",
    address: "",
    number: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "",
  });

  const inputs = [
    {
      type: "text",
      placeholder: "Nome",
      value: person.name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, name: e.target.value }),
    },
    {
      type: "text",
      placeholder: "CPF",
      value: person.cpf,
      maxLength: 14,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, cpf: applyMask(e.target.value, "cpf") }),
    },
    {
      type: "text",
      placeholder: "RG",
      value: person.rg,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, rg: e.target.value }),
    },
    {
      type: "text",
      placeholder: "CEP",
      value: person.zipCode,
      maxLength: 9,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, zipCode: applyMask(e.target.value, "zipCode") }),
    },
    {
      type: "text",
      placeholder: "Endereço",
      value: person.address,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, address: e.target.value }),
    },
    {
      type: "text",
      placeholder: "Número",
      value: person.number,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, number: e.target.value }),
    },
    {
      type: "text",
      placeholder: "Estado",
      value: person.state,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, state: e.target.value }),
    },
    {
      type: "text",
      placeholder: "Bairro",
      value: person.neighborhood,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, neighborhood: e.target.value }),
    },
    {
      type: "text",
      placeholder: "Complemento",
      value: person.complement,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, complement: e.target.value }),
    },
    {
      type: "text",
      placeholder: "Cidade",
      value: person.city,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, city: e.target.value }),
    },
  ];

  return (
    <>
      <Modal
        title="Nova pessoa"
        subtitle="Preencha os campos abaixo para cadastrar uma nova pessoa"
        isOpen={true}
        onClose={closeModalCreate}
      >
        <form>
          {inputs.map((input, index) => (
            <div key={index} className="mb-4">
              <Input {...input} />
            </div>
          ))}
        </form>
        <Button onClick={() => createPerson(person)}>Salvar</Button>
      </Modal>
    </>
  );
}
