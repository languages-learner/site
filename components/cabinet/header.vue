<template>
    <header>
        <b-row no-gutters class="w-100">
            <b-col cols-sm="4" cols-md="2" class="title">{{ title }}</b-col>
            <b-col cols-sm="8" cols-md="10" class="avatar-container">
                <b-avatar rounded text="AC" size="2rem"></b-avatar>
                <span class="px-2">{{ 'Chernigin Alexander' }}</span>
            </b-col>
        </b-row>
    </header>
</template>

<script>
/* Mixins */
import { styleMixin } from '~/vuex-mixins/style'

export default {
    mixins: [styleMixin],
    computed: {
        title() {
            var el = this.$route.path.split('/')
            var str = el[el.length - 1]
            if (str && str.length > 0)
                return str[0].toUpperCase() + str.substring(1)
            return ''
        }
    }
}
</script>

<style lang="less" scoped>
header {
    width: 100%;

    .title {
        font-size: 0.8rem;
        color: rgba(58, 189, 230, 0.705);
        font-weight: bold;
    }

    .avatar-container {
        display: flex;
        flex-flow: row-reverse;
        align-items: center;

        span {
            font-size: 0.7rem;
            font-weight: bold;
        }
    }
}

.split-button {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    text-align: center;
    cursor: pointer;
}

.split-button.enabled {
    background: #007bff;
    color: white;
}
.split-button.enabled:hover {
    border: #007bff solid 1px;
    background: white;
    color: #007bff;
}

.split-button.disabled {
    border: #007bff solid 1px;
    background: white;
    color: #007bff;
}
.split-button.disabled:hover {
    background: #007bff;
    color: white;
}
</style>
