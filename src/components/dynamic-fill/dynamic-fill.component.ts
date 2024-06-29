import { Component, Input, SkipSelf } from '@angular/core';
import { InputTextComponent } from '../input-text/input-text.component';
import { OptionsSelectComponent } from '../options-select/options-select.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FillInTheBlanksComponent } from '../fill-in-the-blanks/fill-in-the-blanks.component';
import { FilterNodesPipe } from '../../pipes/filter-nodes.pipe';
import { FillInBlankItem } from '../../models/fill-in-blanks.model';

@Component({
  selector: 'app-dynamic-fill',
  standalone: true,
  templateUrl: './dynamic-fill.component.html',
  styleUrl: './dynamic-fill.component.scss',
  imports: [
    InputTextComponent,
    OptionsSelectComponent,
    ReactiveFormsModule,
    FilterNodesPipe,
  ],
})
export class DynamicFillComponent {
  @Input({ required: true }) items: FillInBlankItem[] = [];

  formGroup: FormGroup;

  constructor(
    @SkipSelf() private fillInTheBlanksComponent: FillInTheBlanksComponent,
  ) {
    this.formGroup = <FormGroup>this.fillInTheBlanksComponent.form;
  }
}
