<template>
  <Todo/>
</template>

<script lang="ts">
import Vue from 'vue'
import Todo from '../components/Todo.vue'

export default Vue.extend({
  components: { Todo },
  name: 'IndexPage',
})
</script>
