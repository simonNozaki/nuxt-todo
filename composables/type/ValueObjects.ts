import { TodoAppRuntimeError } from '../application/exception/TodoAppRuntimeError';

export class Title {
  constructor(private _value: string) {
    if (_value === '') {
      throw new TodoAppRuntimeError('e.runtime.title.not_blank');
    }
  }
  get value(): string {
    return this._value;
  }
}
