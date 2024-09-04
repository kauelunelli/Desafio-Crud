import { createPerson } from "../services/PersonService";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Modal } from "../components/modal";
import { IPerson } from "../interface/IPerson";
import { applyMask } from "../lib/mask";
import { useCallback, useEffect, useState } from "react";
import { validateCPF } from "../lib/validateCPF";
import { useAlert } from "../alert/AlertContext";

export function CreatePersonModal({
  closeModalCreate,
}: {
  closeModalCreate: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert } = useAlert();
  const [alertShownForZip, setAlertShownForZip] = useState<string | null>(null);
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

  const handleCreatePerson = async (person: IPerson) => {
    setIsLoading(true);
    if (
      !person.cpf ||
      !person.name ||
      !person.zipCode ||
      !person.address ||
      !person.number ||
      !person.neighborhood ||
      !person.city ||
      !person.state
    ) {
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
      await createPerson(person);
      addAlert("Pessoa criada com sucesso", "success");
      closeModalCreate();
    } catch (error) {
      addAlert(`${error}`, "error");
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

  const handleFetchAddress = useCallback(
    async (zipCode: string) => {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${zipCode}/json/`
        );
        const data = await response.json();
        if (data.erro) {
          if (alertShownForZip !== zipCode) {
            addAlert("CEP não encontrado", "warning");
            setAlertShownForZip(zipCode);
          }
          return;
        }
        setPerson((prevPerson) => ({
          ...prevPerson,
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
        setAlertShownForZip(null);
      } catch {
        addAlert("Um erro inesperado ao trazer os dados", "error");
      }
    },
    [addAlert, alertShownForZip]
  );

  useEffect(() => {
    if (person.zipCode.length === 9) {
      handleFetchAddress(person.zipCode);
    }
  }, [person.zipCode, handleFetchAddress]);

  return (
    <>
      <Modal
        title="Nova pessoa"
        subtitle="Preencha os campos abaixo para cadastrar uma nova pessoa"
        isOpen={true}
        onClose={closeModalCreate}
      >
        <div className="grid grid-cols-2 gap-6">
          {inputs.map((input, index) => (
            <div key={index} className="">
              <Input {...input} />
            </div>
          ))}
        </div>

        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={() => handleCreatePerson(person)}
        >
          Salvar
        </Button>
      </Modal>
    </>
  );
}
