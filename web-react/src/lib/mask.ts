
export function removeMask(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

export function applyMask(value: string, type: string): string {
  if (type === 'cpf') {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  if (type === 'zipCode') {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  return value;
}