<template>
    <header>
        <b-row no-gutters class="w-100">
            <b-col
                cols-sm="4"
                cols-md="2"
                class="title d-flex align-items-center"
                >{{ title }}</b-col
            >
            <b-col cols-sm="8" cols-md="10" class="avatar-container">
                <b-dropdown
                    size="lg"
                    variant="link"
                    toggle-class="text-decoration-none p-0"
                    no-caret
                    right
                >
                    <template #button-content>
                        <span class="px-2 name">{{ currentUserFullName }}</span>
                        <b-avatar
                            rounded
                            :text="currentUserInitials"
                            size="2rem"
                        ></b-avatar>
                    </template>
                    <b-dropdown-item href="#"
                        ><n-link
                            tag="div"
                            :to="localePath('/cabinet/profile')"
                            class="nav-item"
                        >
                            Profile
                        </n-link></b-dropdown-item
                    >
                    <b-dropdown-item href="#">Logout</b-dropdown-item>
                </b-dropdown>
            </b-col>
        </b-row>
    </header>
</template>

<script>
/* Mixins */
import { userMixin } from '~/vuex-mixins/user.js'

export default {
    mixins: [userMixin],
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

        .name {
            color: black;
        }
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
