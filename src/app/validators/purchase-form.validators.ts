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
    if (isNaN(numericValue) || numericValue >= 1000) {
      return { maxLimitExceeded: true }; // Retorna erro se for maior ou igual a 1000
    }

    if (isNaN(numericValue) || numericValue < 10) {
      return { minLimitExceeded: true }; // Retorna erro se for menor que 1000
    }

    // Retorna null se a validação for bem-sucedida
    return null;
  };
}
