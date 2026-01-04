
export interface DemoComponent {
  id: string;
  name: string;
  description: string;
  category: 'button' | 'input' | 'card' | 'list' | 'toggle' | 'display';
  icon: string; // ionicon name
  defaultProps: Record<string, any>;
  propDefinitions: DemoProp[];
  templateGenerator: (props: Record<string, any>) => string;
  typescriptGenerator: (props: Record<string, any>) => string;
}

export interface DemoProp {
  name: string;
  label: string;
  type: 'text' | 'select' | 'boolean' | 'number' | 'color';
  options?: SelectOption[]; // For select type
  defaultValue: any;
  description: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface DemoCategory {
  id: string;
  name: string;
  description: string;
  components: DemoComponent[];
}
