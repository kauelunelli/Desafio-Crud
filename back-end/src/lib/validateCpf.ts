import { ClientError } from "../errors/client-error";
import { cpf } from 'cpf-cnpj-validator';


export function validateCpf(parameter: any) {
  if (!cpf) {
    throw new ClientError("CPF é obrigatório");
  }

  if (!cpf.isValid(parameter)) {
    throw new ClientError("CPF inválido");
  }
}