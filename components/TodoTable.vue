<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th> # </th>
                    <th> TODO </th>
                    <th> コメント </th>
                    <th> ステータス </th>
                    <th> </th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in items" :key="index">
                <tr>
                    <td> {{ index }} </td>
                    <td> {{ item.title }} </td>
                    <td> {{ item.description }} </td>
                    <td> {{ item.status }} </td>
                    <td>
                        <label for="todo-status"> ステータスを更新... </label>
                        <select v-model="currentItemStatus" id="todo-status" @change="updateStatus(item.id)">
                            <option value="着手中">着手中</option>
                            <option value="対処しない">対処しない</option>
                        </select>
                    </td>
                    <td>
                        <button class="waves-effect waves-light btn" @click="complete(item.id)"> 完了 </button>
                    </td>
                </tr>
            </tbody>
        </table>
        {{ errorMessage }}
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import useTodoItems from '@/composables/useTodoItems'
import { TodoItemKey } from '~/composables/repository/InMemoryTodoItemRepository'
import { TodoItemRepository } from '@/composables/repository/TodoItemRepository'

export default defineComponent({
    setup() {
        const todoItemState: TodoItemRepository | undefined = inject<TodoItemRepository>(TodoItemKey)
        if (!todoItemState) {
            throw new Error('コンポーネントの初期化に失敗')
        }

        const {
            currentItemTitle,
            currentItemDescription,
            currentItemStatus,
            items,
            errorMessage,
            updateStatus,
            complete
        } = useTodoItems(todoItemState)

        return {
            currentItemTitle,
            currentItemDescription,
            currentItemStatus,
            items,
            errorMessage,
            updateStatus,
            complete
        }
    },
})
</script>
