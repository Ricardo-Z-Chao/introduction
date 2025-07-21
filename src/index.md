---
layout: home

hero:
  name: 你好，我是Ricardo.Z.Chao
  text: 这是一个自己的学习笔记网站
  tagline: 建设中...
---

<script setup>
import { ref } from 'vue';

const contributions = ref('https://ghchart.rshah.org/Ricardo-Z-Chao');
</script>

<div><img :src="contributions"/></div>
