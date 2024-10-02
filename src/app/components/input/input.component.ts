import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CheckInput } from '../../models/check-input.interface';
import { fadeInOut } from '../../animations/transition-animations';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

type InputTypes = "text" | "email" | "password" | "date" | "search" | "tel" | "number";


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  animations: [fadeInOut]
})


export class InputComponent implements ControlValueAccessor{
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() formControlName: string = '';
  @Input() isInvalid: boolean = false;
  @Input() mask: string = '';
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Output() inputElement = new EventEmitter<CheckInput>;


  hideShowPassword = input<boolean>(false);
  showPassword: boolean = false;
  value: string = "";

  onValueChange(event: any) {
    this.value = event.replace(/\D/g, ''); //remove all non-digit characters
  }



  

  //NGVALUEACCESSOR

  onChange: any = () => {};
  onTouched: any = () => {};

  
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

//NGVALUEACCESSOR end

  
}
