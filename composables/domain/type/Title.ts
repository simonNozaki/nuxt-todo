/**
 * タイトル値オブジェクト
 */
export class Title {
  private readonly _errors: string[] = [];
  constructor(private _value: string) {
    if (this._value === '') {
      this._errors.push('e.runtime.title.not_blank');
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
