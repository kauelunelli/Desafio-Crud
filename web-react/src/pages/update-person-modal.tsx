import { applyMask } from "../lib/mask";
import { IPerson } from "../interface/IPerson";
import { getPerson, updatePerson } from "../services/PersonService";
import { useEffect, useState } from "react";
import { Input } from "../components/input";

interface UpdatePersonModalProps {
  closeModalUpdate: () => void;
  personId: string;
}

export function UpdatePersonModal({
  closeModalUpdate,
  personId,
}: UpdatePersonModalProps) {
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

  useEffect(() => {
    getPerson(personId).then((response) => {
      setPerson(response);
    });
  }, [personId]);

  const handleUpdatePerson = async (person: IPerson) => {
    try {
      await updatePerson(person);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

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
      placeholder: "Bairro",
      value: person.neighborhood,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, neighborhood: e.target.value }),
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModalUpdate}>
          &times;
        </span>
        <h2>Atualizar pessoa</h2>
        <div className="form">
          {inputs.map((input, index) => (
            <Input
              key={index}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              maxLength={input.maxLength}
              onChange={input.onChange}
            />
          ))}
          <button onClick={() => handleUpdatePerson(person)}>Atualizar</button>
        </div>
      </div>
    </div>
  );
}
