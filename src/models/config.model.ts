export type ValidatorType = 'required';

export interface ConfigData {
  formData: Record<string, ConfigFormDataOption>;
  formDataFillInTheBlanks: ConfigScaffold;
}

export interface ConfigNode {
  filter: { $in: string[] };
  children: ConfigScaffoldItem[];
}

export interface TextItem {
  type: 'text';
  data: string;
}

export interface ConfigFieldControlItem {
  type: 'fieldControl';
  data?: string;
  formDataPointer: string;
  validators?: { type: ValidatorType }[];
  nodes?: ConfigNode[];
}

export type ConfigScaffoldItem = TextItem | ConfigFieldControlItem;

export interface ConfigScaffold {
  data: ConfigScaffoldItem[];
}

export interface ConfigFormDataOption {
  placeholder: string;
  default: string | null;
  type: 'input' | 'select-with-options';
  options?: SelectOption[];
}

export interface SelectOption {
  name: string;
  value: string;
}
