<template>
    <div>
        <DefaultHeader />
        <Nuxt />
        <DefaultHooter />
    </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@nuxtjs/composition-api'
import { TodoItemRepository } from '@/composables/repository/TodoItemRepository'
import { TodoItemKey, InMemoryTodoItemRepository } from '~/composables/repository/InMemoryTodoItemRepository'

export default defineComponent({
    setup() {
        provide<TodoItemRepository>(TodoItemKey, new InMemoryTodoItemRepository())
    },
})
</script>
