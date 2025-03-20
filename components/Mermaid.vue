<template>
    <div v-html="svgRef"></div>
</template>

<script setup ts>
import { ref, onMounted } from 'vue'
import mermaid from 'mermaid'

const props = defineProps({
    id: String,
    code: String,
})

const render = async (id, code) => {
    mermaid.initialize({ startOnLoad: false })
    const { svg } = await mermaid.render(id, code)
    return svg
}

onMounted(async () => {
    svgRef.value = await render(props.id, decodeURIComponent(props.code))
})

const svgRef = ref('')
</script>