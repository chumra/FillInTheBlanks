import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicFillComponent } from '../dynamic-fill/dynamic-fill.component';
import { SelectOption } from '../../models/config.model';
import { FillInBlankItem, SelectItem } from '../../models/fill-in-blanks.model';

@Component({
  selector: 'app-options-select',
  standalone: true,
  imports: [NgbDropdownModule, DynamicFillComponent],
  templateUrl: './options-select.component.html',
  styleUrl: './options-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: OptionsSelectComponent,
    },
  ],
})
export class OptionsSelectComponent implements ControlValueAccessor {
  @Input({ required: true }) selectData?: SelectItem;
  @Input() placeholder: string = '';

  @Output() selected = new EventEmitter<string>();

  selectedOption?: SelectOption;
  isDisabled: boolean = false;

  onChange = (value: string) => {};
  onTouched = () => {};
  writeValue(value: string): void {
    if (this.selectData) {
      this.selectedOption = this.selectData.options?.find(
        (o: SelectOption) => o.value === value,
      );
    }
  }

  registerOnChange(onChange: (option: string) => {}): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => {}): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  select(selectedOption: SelectOption): void {
    this.selectedOption = selectedOption;
    this.selected.emit(selectedOption.value);
    this.onChange(selectedOption.value);
    this.onTouched();
  }
}
