import { TodoAppRuntimeError } from '~/composables/application/exception/TodoAppRuntimeError';
import { Description } from '../type/Description';
import { Title } from '../type/Title';

type Status = '未着手' | '着手中' | '完了' | '対処しない';

/**
 * Todo項目 ドメインオブジェクト
 */
export class TodoItem {
  constructor(
    private id: string,
    private title: Title,
    private description: Description,
    private status: Status,
  ) {}

  makeStatusProceeding(status: Status): TodoItem {
    if (status === '未着手') {
      throw new TodoAppRuntimeError();
    }
    this.status = status;
    return this;
  }

  complete(): TodoItem {
    this.status = '完了';
    return this;
  }
}
