<template>
    <header class="row w-100 px-5 mt-3 mx-0">
        <div class="col-2 p-0"></div>
        <div class="col-8 p-0"><div class="logo text-center">Languages Learner</div></div>
        <div class="col-2 p-0 d-flex align-items-center justify-content-end">
            <div class="split-button d-flex align-items-center justify-content-center" :class="{ enabled: _splitScreenEnable, disabled: !_splitScreenEnable }" @click="_splitScreen">
                <i class="fa fa-strikethrough" aria-hidden="true"></i>
            </div>
        </div>
    </header>
</template>

<script>
/* Mixins */
import { styleMixin } from '~/vuex-mixins/style'

export default {
    mixins: [styleMixin]
}
</script>

<style scoped>
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
