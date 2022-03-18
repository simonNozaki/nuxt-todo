export interface TodoItem {
    id: string,
    title: string,
    description: string,
    status: TodoItemStatus
}

export type TodoItemStatus = '未着手' | '着手中' | '完了' | '対処しない'
