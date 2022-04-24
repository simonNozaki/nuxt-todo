import { Ref, ref } from '@nuxtjs/composition-api';
import { TodoItem, TodoItemStatus } from '../type/TodoItem';
import * as uuid from 'uuid';
import { TodoItemRepository } from './repository/TodoItemRepository';
import { Description } from './domain/type/Description';
import { Title } from './domain/type/Title';

export default function useTodoItems(todoItemRepository: TodoItemRepository) {
  // state
  const items: Ref<TodoItem[]> = todoItemRepository.getAll();
  const currentItemTitle: Ref<string> = ref<string>('');
  const currentItemDescription: Ref<string> = ref<string>('');
  const currentItemStatus: Ref<TodoItemStatus> = ref<TodoItemStatus>('未着手');
  const errorMessage: Ref<string> = ref<string>('');

  /**
   * タスクを新規追加
   */
  const addTask = (): void => {
    clearError();

    const title = new Title(currentItemTitle.value);
    const description = new Description(currentItemDescription.value);
    if (title.hasError() || description.hasError()) {
      const message = title.errors
        .concat(description.errors)
        .map((e) => `${e}; `)
        .join();
      errorMessage.value = message;
      return;
    }

    todoItemRepository.save({
      id: uuid.v4().toString(),
      title: title.value,
      description: currentItemDescription.value,
      status: '未着手',
    });

    currentItemTitle.value = '';
    currentItemDescription.value = '';
  };

  /**
   * 任意のステータスに変更する
   * @param id
   */
  const updateStatus = (id: string): void => {
    todoItemRepository.updateStatus(id, currentItemStatus);
  };

  /**
   * 完了にする
   * @param {string} id
   */
  const complete = (id: string): void => {
    items.value
      .filter((item) => item.id === id)
      .map((item) => (item.status = '完了'));
    items.value = items.value.filter((item) => item.id !== id);
  };

  const clearError = (): void => {
    errorMessage.value = '';
  };

  return {
    currentItemTitle,
    currentItemDescription,
    currentItemStatus,
    items,
    errorMessage,
    addTask,
    updateStatus,
    complete,
  };
}
