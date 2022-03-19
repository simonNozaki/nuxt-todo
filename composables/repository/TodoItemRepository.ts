import { Ref } from '@nuxtjs/composition-api';
import { TodoItem } from '~/type/TodoItem';

/**
 * TODOアイテム状態管理
 */
export interface TodoItemRepository {
  getAll(): Ref<TodoItem[]>;

  save(item: TodoItem): void;

  updateStatus(id: string, status: Ref<string>): void;
}
