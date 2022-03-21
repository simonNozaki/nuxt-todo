<template>
  <div class="container">
    <TodoTable />
    <TodoError />
    <TodoForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoTable from '../components/TodoTable.vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoError from '@/components/TodoError.vue'

export default Vue.extend({
  components: {
    TodoTable,
    TodoForm,
    TodoError
  },
  name: 'IndexPage',
})
</script>
