import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator',
  standalone: true
})
export class ThousandSeparator implements PipeTransform {

  transform(value: number | string): string {
    if (!value && value !== 0) {
      return '';
    }

    const parsedValue = typeof value === 'number' ? value : parseFloat(value);

    if (isNaN(parsedValue)) {
      return value.toString(); // Retorna o valor como string se não for um número válido
    }

    // Formata o número com separador de milhar, sem casas decimais
    return parsedValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
}