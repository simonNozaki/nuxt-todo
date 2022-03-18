<template>
    <div class="container">
        <table>
        <tr>
            <th> # </th>
            <th> TODO </th>
            <th> コメント </th>
            <th> ステータス </th>
            <th> 更新 </th>
            <th> 完了 </th>
        </tr>
        <tbody v-for="(item, index) in items" :key="index">
            <tr>
                <td> {{ index }} </td>
                <td> {{ item.title }} </td>
                <td> {{ item.description }} </td>
                <td> {{ item.status }} </td>
                <td>
                    <label for="todo-status"> ステータスを更新... </label>
                    <select v-model="currentItemStatus" multiple name="todo-status" @change="updateStatus(item.id)">
                        <option value="着手中">着手中</option>
                        <option value="対処しない">対処しない</option>
                    </select>
                </td>
                <td> <button @click="complete(item.id)"> 完了 </button> </td>
            </tr>
        </tbody>
        </table>

        <form>
            <label> TODOの追加 </label>
            <input type="text" v-model="currentItemTitle" placeholder="タイトルを入力...">
            <input type="text" v-model="currentItemDescription" placeholder="コメントを入力...">
            <button @click="addTask()"> 追加 </button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide } from '@nuxtjs/composition-api'
import useTodoItems from '@/composables/useTodoItems'
import { InMemoryTodoItemState, TodoItemKey, TodoItemState } from '@/composables/useGlobalState'

export default defineComponent({
    setup() {
        provide<TodoItemState>(TodoItemKey, new InMemoryTodoItemState())

        const todoItemState: TodoItemState | undefined = inject<TodoItemState>(TodoItemKey)
        if (!todoItemState) {
            throw new Error('コンポーネントの初期化に失敗')
        }

        const {
            currentItemTitle,
            currentItemDescription,
            currentItemStatus,
            items,
            addTask,
            updateStatus,
            complete
        } = useTodoItems(todoItemState)

        return {
            currentItemTitle,
            currentItemDescription,
            currentItemStatus,
            items,
            addTask,
            updateStatus,
            complete
        }
    },
})
</script>
