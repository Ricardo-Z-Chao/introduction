<template>
  <ul>
    <li v-for="content of contents">
      <a :href="content.url">{{ content.frontmatter.title }}</a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { data } from '../catalog.data.ts'
import { Category } from '../constants/category-const.mts';

const props = defineProps({
    category: Category,
})

let contents = ref([]);

onMounted(() => {
    contents.value = data.filter(e => e.url.startsWith(`/${props.category}`));
});
</script>
