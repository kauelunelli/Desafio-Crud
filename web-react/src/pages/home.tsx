import { getPersons, deletePerson } from "../services/PersonService";
import { useEffect, useState } from "react";
import { IPerson } from "../interface/IPerson";
import { Button } from "../components/button";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "../components/input";
import { applyMask, removeMask } from "../lib/mask";
import { CreatePeoplePage } from "./createPeople";

interface ISearch {
  name: string;
  cpf: string;
}

export function HomePage() {
  const [persons, setPersons] = useState([] as IPerson[]);

  const token = localStorage.getItem("token");
  // const [limit, setLimit] = useState(50);
  // const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState<ISearch>({ name: "", cpf: "" });

  const inputs = [
    {
      type: "text",
      placeholder: "Nome",
      value: search.name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch({ ...search, name: e.target.value }),
    },
    {
      type: "text",
      placeholder: "CPF",
      value: search.cpf,
      maxLength: 14,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch({ ...search, cpf: applyMask(e.target.value, "cpf") }),
    },
  ];

  useEffect(() => {
    if (token) {
      getPersons().then((response) => {
        setPersons(response);
      });
    }
  }, [token]);

  const handleSearch = async () => {
    try {
      const response = await getPersons({
        name: search.name,
        cpf: removeMask(search.cpf),
        // limit,
        // offset,
      });
      setPersons(response);
    } catch (error) {
      console.error("An error occurred during search", error);
    }
  };

  return (
    <>
      {/* <CreatePeoplePage closeModalCreate={() => {}} /> */}
      <div
        className="h-lvh p-16 dark:bg-gray-900
    "
      >
        <div className="rounded-lg m-auto max-w-screen-2xl  ">
          <div className="grid justify-items-end items-end grid-cols-6 gap-10 my-5">
            <Button>
              <Plus />
              Nova pessoa
            </Button>
            <div className="col-span-5">
              <div className="grid grid-cols-3 gap-6 ">
                {inputs.map((input, index) => (
                  <Input key={index} {...input} value={input.value} />
                ))}
                <Button onClick={handleSearch}>
                  <Search />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    Nome
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    CPF
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    RG
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    CEP
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {persons.map((person) => (
                  <tr>
                    <>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {applyMask(person.cpf, "cpf")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {person.rg}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {applyMask(person.zipCode, "zipCode")}
                      </td>
                      <td className="px-4 grid grid-cols-2 py-2 text-gray-700 dark:text-gray-200">
                        <Button size="small">
                          <Edit2 />
                        </Button>
                        <Button
                          onClick={() => person.id && deletePerson(person.id)}
                          size="small"
                          variant="secondary"
                        >
                          <Trash2 />
                        </Button>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 dark:border-gray-700">
            <ol className="flex justify-end gap-1 text-xs font-medium">
              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  1
                </a>
              </li>

              <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 dark:text-white">
                2
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  4
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
