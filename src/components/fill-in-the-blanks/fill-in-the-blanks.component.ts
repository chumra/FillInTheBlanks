import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicFillComponent } from '../dynamic-fill/dynamic-fill.component';
import {
  ConfigData,
  ConfigFormDataOption,
  ConfigNode,
} from '../../models/config.model';
import {
  FillInBlankItem,
  FillInBlankItemNode,
} from '../../models/fill-in-blanks.model';

function mapConfigDataToFillInBlanksItems(
  configData: ConfigData,
): FillInBlankItem[] {
  return configData.formDataFillInTheBlanks.data.map((data) => {
    if (data.type === 'text') return data;

    return {
      ...data,
      ...configData.formData[data.formDataPointer],
      nodes: mapNodes(configData.formData, data.nodes),
    } as FillInBlankItem;
  });
}

function mapNodes(
  formData: Record<string, ConfigFormDataOption>,
  nodes?: ConfigNode[],
): FillInBlankItemNode[] | undefined {
  if (!nodes) return undefined;

  return nodes.map((node) => {
    const children = node.children.map((child) => {
      if (child.type === 'text') return child;

      return {
        ...child,
        ...formData[child.formDataPointer],
        nodes: mapNodes(formData, child.nodes),
      };
    });

    return { children, filter: node.filter };
  }) as FillInBlankItemNode[];
}

function createForm(items: FillInBlankItem[]): FormGroup {
  const group = new FormGroup({});

  items.forEach((item) => {
    if (item.type === 'text') {
      return;
    }

    const validators = item.validators?.map(
      (validator) => Validators[validator.type],
    );

    group.addControl(
      item.formDataPointer,
      new FormControl<string | null>(item.default, { validators }),
    );
  });

  return group;
}

@Component({
  selector: 'app-fill-in-the-blanks',
  standalone: true,
  imports: [ReactiveFormsModule, DynamicFillComponent],
  templateUrl: './fill-in-the-blanks.component.html',
  styleUrl: './fill-in-the-blanks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FillInTheBlanksComponent {
  @Input({ required: true }) set data(data: ConfigData) {
    this.items = mapConfigDataToFillInBlanksItems(data);
    this.form = createForm(this.items);
  }

  items?: FillInBlankItem[];
  form?: FormGroup;
}
