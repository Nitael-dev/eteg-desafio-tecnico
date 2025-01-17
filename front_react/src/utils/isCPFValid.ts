export function isCPFValid(cpf: string): boolean {
  // Remove caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (caso contrário, não é válido)
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rest = sum % 11;

  const firstValidationDigit = rest < 2 ? 0 : 11 - rest;

  // Verifica o primeiro dígito verificador
  if (parseInt(cpf.charAt(9)) !== firstValidationDigit) {
    return false;
  }

  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rest = sum % 11;

  const secondValidationDigit = rest < 2 ? 0 : 11 - rest;

  // Verifica o segundo dígito verificador
  if (parseInt(cpf.charAt(10)) !== secondValidationDigit) {
    return false;
  }

  return true;
}
