import { TodoAppRuntimeError } from '../exception/TodoAppRuntimeError';

/**
 * エラーメッセージ定義クラス
 */
export class ErrorMessage {
  static readonly errors: { [index: string]: string } = {
    'e.runtime.title.not_blank':
      'タイトルがありません。タイトルは必ずいれてください。',
    'e.system.general.unexpected_error':
      '予期しないエラーが発生しました'
  };

  static getUnexpectedError(): string {
    return this.errors['e.system.general.unexpected_error']
  }

  static getReadableMessage(raw: string): string {
    if (!this.errors[raw]) {
      throw new TodoAppRuntimeError('e.system.general.unexpected_error');
    }
    return this.errors[raw];
  }
}
