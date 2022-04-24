import { TodoItem, TodoItemStatus } from '../../type/TodoItem';
import * as uuid from 'uuid';
import { ref, Ref } from '@nuxtjs/composition-api';
import { TodoItemRepository } from './TodoItemRepository';

export const TodoItemKey = Symbol('TodoItemKey');

/**
 * TODOアイテムインメモリ状態管理
 */
export class InMemoryTodoItemRepository implements TodoItemRepository {
  private readonly _items: Ref<TodoItem[]> = ref<TodoItem[]>([
    {
      id: Math.random().toString(),
      title: '相談する',
      description: '',
      status: '未着手',
    },
    {
      id: uuid.v4().toString(),
      title: 'レビュー',
      description: '',
      status: '未着手',
    },
  ]);

  getAll(): Ref<TodoItem[]> {
    return this._items;
  }

  save(item: TodoItem): void {
    this._items.value.push(item);
  }
  updateStatus(id: string, status: Ref<TodoItemStatus>): void {
    const first = this._items.value.filter((item) => item.id === id)[0];
    first.status = status.value;
    this._items.value[0] = first;
  }

  complete(id: string): void {
    this._items.value
      .filter((item) => item.id === id)
      .map((item) => (item.status = '完了'));
    this._items.value = this._items.value.filter((item) => item.id !== id);
  }
}
