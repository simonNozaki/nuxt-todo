<template>
  <div>
    <input type="text" v-model="currentItemTitle" placeholder="タイトルを入力...">
    <input type="text" v-model="currentItemDescription" placeholder="コメントを入力...">
    <button class="waves-effect waves-light btn" @click="addTask()"> 追加 </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { TodoItemKey } from '../composables/repository/InMemoryTodoItemRepository'
import { TodoItemRepository } from '../composables/repository/TodoItemRepository'
import useTodoItems from '../composables/useTodoItems'

export default defineComponent({
  setup() {
    const todoItemRepository: TodoItemRepository | undefined = inject<TodoItemRepository>(TodoItemKey)
    if (!todoItemRepository) {
      throw new Error('コンポーネントの初期化に失敗')
    }

    const {
      currentItemTitle,
      currentItemDescription,
      addTask
    } = useTodoItems(todoItemRepository)

    return {
      currentItemTitle,
      currentItemDescription,
      addTask
    }
  },
})
</script>
