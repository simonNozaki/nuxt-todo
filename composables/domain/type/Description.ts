/**
 * コメント 値オブジェクト
 */
export class Description {
  private readonly _errors: string[] = [];
  constructor(private _value: string) {
    if (this._value.length > 500) {
      this._errors.push('e.runtime.description.not_blank');
    }
  }
  get value(): string {
    return this._value;
  }
  get errors(): string[] {
    return this._errors;
  }

  hasError(): boolean {
    return this._errors.length > 0;
  }
}
