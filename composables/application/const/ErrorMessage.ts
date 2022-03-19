import { TodoAppRuntimeError } from '../exception/TodoAppRuntimeError';

/**
 * エラーメッセージ定義クラス
 */
export class ErrorMessage {
  static readonly errors: { [index: string]: string } = {
    'e.runtime.title.not_blank':
      'タイトルがありません。タイトルは必ずいれてください。',
  };

  static getReadableMessage(raw: string): string {
    if (!this.errors[raw]) {
      throw new TodoAppRuntimeError('e.system.general.unexpected_error');
    }
    return this.errors[raw];
  }
}
