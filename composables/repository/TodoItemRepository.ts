import { Ref } from '@nuxtjs/composition-api';
import { TodoItem } from '~/type/TodoItem';

/**
 * TODO項目 リポジトリ
 */
export interface TodoItemRepository {
  getAll(): Ref<TodoItem[]>;

  save(item: TodoItem): void;

  updateStatus(id: string, status: Ref<string>): void;

  complete(id: string): void;
}
