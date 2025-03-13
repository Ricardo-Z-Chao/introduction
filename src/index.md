---
layout: home

hero:
  name: 你好，我是Ricardo.Z.Chao
  text: 这是一个自己的学习笔记的网站
  tagline: 建设中...
  actions:
    - theme: brand
      text: View on GitHub
      link: https://github.com/Ricardo-Z-Chao/notes.git
---

<script setup>
import { ref } from 'vue';

const contributions = ref('https://ghchart.rshah.org/Ricardo-Z-Chao');
</script>

<div><img :src="contributions"/></div>
