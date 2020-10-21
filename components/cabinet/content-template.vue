<template>
    <div class="cabinet-lay">
        <div class="welcome">{{ subTitle }}</div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        subTitle: {
            type: String,
            required: true
        }
    }
}
</script>
