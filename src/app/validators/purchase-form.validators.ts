import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function currencyValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    // Verifica se o valor está vazio ou não é uma string
    if (!value || typeof value !== 'string') {
      return { invalidFormat: true };
    }

    // Remove "R$", espaços, e pontos
    let cleanedValue = value.replace(/R\$|\s|\./g, '');

    // Remove os dois últimos dígitos após a vírgula
    const integerValue = cleanedValue.split(',')[0];

    // Tenta converter a parte inteira para número
    const numericValue = parseInt(integerValue, 10);

    // Verifica se é um número válido e se é maior ou igual a 1000
    if (isNaN(numericValue) || numericValue > 1000) {
      return { maxLimitExceeded: true }; // Retorna erro se for maior ou igual a 1000
    }

    if (isNaN(numericValue) || numericValue < 10) {
      return { minLimitExceeded: true }; // Retorna erro se for menor que 1000
    }

    // Retorna null se a validação for bem-sucedida
    return null;
  };
}

export const noSpecialCharacters: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const regex = /^[a-zA-Z ]+$/;
  const isValid = regex.test(control.value);

  return isValid ? null : { noSpecialCharacters: true };
}

export const spaceRequired: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if(control.value != null && control.value.indexOf(' ') == -1){
      return { spaceRequired: true }
  }
  return null;
}

export function completeNameRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();

    // Verificar se é uma string válida
    if (typeof value !== 'string') {
      return { completeNameRequired: true };
    }

    // Verifica se há pelo menos duas palavras separadas por um ou mais espaços, e permite espaço(s) no final
    const regex = /^[a-zA-Z]+( [a-zA-Z]+)+\s*$/;

    // Se o valor for válido, retorna null (sem erros), senão retorna um erro
    return regex.test(value) ? null : { completeNameRequired: true };
  };
}

// Função para validar CPF
export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;

    if (!cpf) {
      return null; // Não valida se o campo está vazio
    }

    // Remove caracteres não numéricos (separadores como . e -)
    const cpfClean = cpf.replace(/\D/g, '');

    // Verifica se tem 11 dígitos após a remoção dos caracteres especiais
    if (cpfClean.length !== 11) {
      return { invalidCpf: true };
    }

    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cpfClean)) {
      return { invalidCpf: true };
    }

    // Valida os dois dígitos verificadores
    if (!validarDigitosCPF(cpfClean)) {
      return { invalidCpf: true };
    }

    return null; // CPF é válido
  };
}

// Função auxiliar para validar os dois dígitos verificadores do CPF
function validarDigitosCPF(cpf: string): boolean {
  let soma = 0;
  let resto;

  // Cálculo do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  soma = 0;

  // Cálculo do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }

  return true;
}
