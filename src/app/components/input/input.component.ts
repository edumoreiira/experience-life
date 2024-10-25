import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef, input, viewChild } from '@angular/core';
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


export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() type: InputTypes = "text";
  @Input() title: string = "";
  @Input() placeholder: string = "";
  @Input() formControlName: string = '';
  @Input() isInvalid: boolean = false;
  @Input() rightInfo: boolean = false;
  @Output() inputElement = new EventEmitter<CheckInput>;
  @Input({ required: true }) id = '';

  //accessibility
  @Input() ariaLabel: string = '';
  @Input() ariaLabelledby: string = '';
  @Input() ariaRequired: boolean = false;
  

  //ngxmask inputs
  @Input() dropSpecialCharacters: boolean = false;
  @Input() mask: string = '';
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  //input control
  @Input() maxLength: number = 0;


  hideShowPassword = input<boolean>(false);
  passwordVisible: boolean = false;
  inputErrorId: string = '';
  value: string = "";

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    this.inputErrorId = "input-error-" + this.id;
  }

  get hasInvalidClass() {
    return this.element.nativeElement.classList.contains('ng-invalid') && this.element.nativeElement.classList.contains('ng-dirty');
  }

  showPassword() {
    this.passwordVisible = false;
  }

  hidePassword() {
    this.passwordVisible = true;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  

  //NGVALUEACCESSOR

  onChange: any = () => {};
  onTouched: any = () => {};

  
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    setTimeout(() => { // settTimetout to avoid ngxmask override the value
      this.value = value;
    });
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
