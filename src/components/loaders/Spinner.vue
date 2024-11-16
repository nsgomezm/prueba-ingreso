<template>
  <div class="spinner-border spinner-border-sm" role="status" v-if="props.isLoading">
      <span class="visually-hidden">Loading...</span>
  </div>
</template>
<script setup lang="ts">
  defineOptions({
    name: 'LoadersSpinner'
  })

  import { defineProps } from 'vue';

  const props =  defineProps({
    isLoading: {
      required: true,
      type: Boolean,
      default: false
    }
  })

</script>