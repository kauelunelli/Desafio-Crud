import { applyMask } from "../lib/mask";
import { IPerson } from "../interface/IPerson";
import { getPerson, updatePerson } from "../services";
import { useEffect, useState } from "react";
import { Input } from "../components/input";
import { Modal } from "../components/modal";
import { Button } from "../components/button";
import { validateCPF } from "../lib/validateCPF";
import { useAlert } from "../alert/AlertContext";

interface UpdatePersonModalProps {
  closeModalUpdate: () => void;
  personId: string;
}

export function UpdatePersonModal({
  closeModalUpdate,
  personId,
}: UpdatePersonModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert } = useAlert();
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
      setPerson({
        ...response,
        cpf: applyMask(response.cpf, "cpf"),
        zipCode: applyMask(response.zipCode, "zipCode"),
      });
    });
  }, [personId]);

  const handleUpdatePerson = async (person: IPerson) => {
    setIsLoading(true);
    if (!person.cpf || !person.name || !person.zipCode || !person.address) {
      addAlert("Preencha todos os campos obrigatórios", "error");
      setIsLoading(false);
      return;
    }
    if (!validateCPF(person.cpf)) {
      addAlert("CPF inválido", "warning");
      setIsLoading(false);
      return;
    }
    try {
      await updatePerson(person);
      addAlert("Pessoa atualizada com sucesso", "success");
      closeModalUpdate();
    } catch (error) {
      addAlert(`Ocorreu um erro ${error}`, "error");
    } finally {
      setIsLoading(false);
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
      label: "RG",
      placeholder: "RG",
      value: person.rg,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, rg: e.target.value }),
    },
    {
      type: "text",
      label: "CEP",
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
    {
      type: "text",
      placeholder: "Cidade",
      value: person.city,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, city: e.target.value }),
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
      placeholder: "Complemento",
      value: person.complement,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPerson({ ...person, complement: e.target.value }),
    },
  ];

  return (
    <>
      <Modal
        title="Editar pessoa"
        subtitle="Preencha os campos para editar"
        isOpen={true}
        onClose={closeModalUpdate}
      >
        <div className="grid grid-cols-2 gap-6">
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
        </div>
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={() => handleUpdatePerson(person)}
        >
          Salvar
        </Button>
      </Modal>
    </>
  );
}
