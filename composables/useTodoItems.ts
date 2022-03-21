import { Ref, ref } from '@nuxtjs/composition-api';
import { TodoItem, TodoItemStatus } from '../type/TodoItem';
import * as uuid from 'uuid';
import { Title } from './type/ValueObjects';
import { TodoAppRuntimeError } from './application/exception/TodoAppRuntimeError';
import { ErrorMessage } from './application/const/ErrorMessage';
import { TodoItemRepository } from './repository/TodoItemRepository';

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

    try {
      const title = new Title(currentItemTitle.value);

      todoItemRepository.save({
        id: uuid.v4().toString(),
        title: title.value,
        description: currentItemDescription.value,
        status: '未着手',
      });

      currentItemTitle.value = '';
      currentItemDescription.value = '';
    } catch (e) {
      if (e instanceof TodoAppRuntimeError) {
        console.log(e)
        errorMessage.value = e.message;
      } else {
        errorMessage.value = ErrorMessage.getUnexpectedError()
      }
    }
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
