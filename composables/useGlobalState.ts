import { TodoItem } from '../type/TodoItem';
import * as uuid from 'uuid'

export const TodoItemKey = Symbol('TodoItemKey')

/**
 * TODOアイテム状態管理
 */
export interface TodoItemState {
    getAll(): TodoItem[]
}

/**
 * TODOアイテムインメモリ状態管理
 */
export class InMemoryTodoItemState implements TodoItemState {
    getAll(): TodoItem[] {
        return [
            {
                id: Math.random().toString(),
                title: '相談する',
                description: '',
                status: '未着手'
            },
            {
                id: uuid.v4().toString(),
                title: 'レビュー',
                description: '',
                status: '未着手'
            }
        ]
    }
}

