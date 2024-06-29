import {
  ConfigNode,
  SelectOption,
  TextItem,
  ValidatorType,
} from './config.model';

interface FormControlItem {
  type: 'input' | 'select-with-options';
  data: string | null;
  placeholder: string;
  default: string | null;
  validators?: { type: ValidatorType }[];
  formDataPointer: string;
}

export interface InputItem extends FormControlItem {
  type: 'input';
}

export interface SelectItem extends FormControlItem {
  type: 'select-with-options';
  options?: SelectOption[];
  nodes?: FillInBlankItemNode[];
}

export type FillInBlankItem = TextItem | InputItem | SelectItem;

export interface FillInBlankItemNode extends Omit<ConfigNode, 'children'> {
  children: FillInBlankItem[];
}
