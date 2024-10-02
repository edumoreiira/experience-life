import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) {
      return 'R$ 0,00';
    }
  
    // Remove caracteres que não sejam números
    let newValue = value.toString().replace(/\D/g, '');
  
    // Caso o valor tenha menos de dois dígitos, adiciona zeros no final
    if (newValue.length === 1) {
      newValue = `00${newValue}`; // Se for apenas um dígito, adicionar dois zeros
    } else if (newValue.length === 2) {
      newValue = `0${newValue}`; // Se for dois dígitos, adicionar um zero
    }
  
    // Divide os centavos
    const integerPart = newValue.slice(0, -2) || '0';
    const decimalPart = newValue.slice(-2);
  
    // Formata no padrão R$ 00,00, garantindo que sempre terá dois decimais
    const formattedValue = `R$ ${parseInt(integerPart, 10).toLocaleString('pt-BR')},${decimalPart.padEnd(2, '0')}`;
    
    return formattedValue;
  }
}