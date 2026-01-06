export interface MarbleEvent {
  id: string;
  value: any;
  time: number; // milliseconds from start
  color: string;
  type: 'value' | 'error' | 'complete';
}

export interface MarbleStream {
  id: string;
  name: string;
  events: MarbleEvent[];
  duration: number; // total timeline duration in ms
}

export interface OperatorConfig {
  id: string;
  name: string;
  category: 'transformation' | 'filtering' | 'combination' | 'utility' | 'error';
  description: string;
  signature: string;
  example: string;
  marbleExample: {
    input: MarbleStream;
    output: MarbleStream;
  };
  codeGenerator: (input: string) => string;
}

export interface StreamState {
  isPlaying: boolean;
  currentTime: number;
  speed: number; // 0.5x, 1x, 2x
  activeSubscriptions: number;
}

export interface RxJSPattern {
  id: string;
  name: string;
  description: string;
  useCase: string;
  code: string;
  explanation: string;
  avoidCommonMistake?: string;
}
