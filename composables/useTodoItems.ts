import { Ref, ref } from '@nuxtjs/composition-api'
import { TodoItem, TodoItemStatus } from '../type/TodoItem'
import * as uuid from 'uuid'
import { TodoItemState } from './useGlobalState'

export default function useTodoItems (todoItemState: TodoItemState) {
    const rawItems: TodoItem[] = todoItemState.getAll()

    // state
    const currentItemTitle: Ref<string> = ref<string>('')
    const currentItemDescription: Ref<string> = ref<string>('')
    const currentItemStatus: Ref<TodoItemStatus> = ref<TodoItemStatus>('未着手')
    const items: Ref<TodoItem[]> = ref<TodoItem[]>(rawItems)

    /**
     * タスクを新規追加
     */
    const addTask = (): void => {
        items.value.push({
            id: uuid.v4().toString(),
            title: currentItemTitle.value,
            description: currentItemDescription.value,
            status: '未着手'
        })

        currentItemTitle.value = ''
        currentItemDescription.value = ''
    }

    /**
     * 任意のステータスに変更する
     * @param id 
     * @param status 
     */
    const updateStatus = (id: string): void => {
        console.log(id, currentItemStatus.value)
        const first = items.value
                .filter((item) => item.id === id)[0]
        first.status = currentItemStatus.value
        items.value[0] = first
    }

    /**
     * 完了にする
     * @param {string} id
     */
    const complete = (id: string): void => {
        items.value
            .filter((item) => item.id === id)
            .map((item) => item.status = '完了')
        items.value = items.value.filter((item) => item.id !== id)
    }

    return {
        currentItemTitle,
        currentItemDescription,
        currentItemStatus,
        items,
        addTask,
        updateStatus,
        complete
    }
}