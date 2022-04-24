<template>
  <div>
    <span v-text="errorMessage"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import useTodoItems from '@/composables/useTodoItems'
import { TodoItemKey } from '~/composables/repository/InMemoryTodoItemRepository'
import { TodoItemRepository } from '~/composables/repository/TodoItemRepository'

export default defineComponent({
  props: {
    errorMessage: String,
  },
  setup() {
    const todoItemState: TodoItemRepository | undefined = inject<TodoItemRepository>(TodoItemKey)
    if (!todoItemState) {
        throw new Error('コンポーネントの初期化に失敗')
    }

    const {
      errorMessage
    } = useTodoItems(todoItemState)

    return {
      errorMessage
    }
  },
})
</script>
