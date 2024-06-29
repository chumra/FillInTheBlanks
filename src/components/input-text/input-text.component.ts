import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputTextComponent,
    },
  ],
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = '';

  formControl: FormControl<string | null> = new FormControl(null);

  destroyRef: DestroyRef = inject(DestroyRef);

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.formControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(onChange: (value: string) => {}): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => {}): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(200),
        tap((value) => this.onChange(value ?? '')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
