<template>
    <div>
        <div class="w-100 mt-4">
            <h6 class="value-words-label">WORDS: {{ valueWords }}</h6>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        valueWords: {
            type: Number
        }
    }
}
</script>

<style lang="less" scoped>
.value-words-label {
    color: #6c757d;
    font-size: 0.7rem;
}
</style>
