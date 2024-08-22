import { cpf } from 'cpf-cnpj-validator';


export function validateCPF(parameter: string) {
  if (!cpf) {
    return false;
  }

  if (!cpf.isValid(parameter)) {
    return false;
  }
  return true
}