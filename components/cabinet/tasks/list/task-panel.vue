<template>
    <div
        class="shadow px-0 task-panel pointer"
        @click="$emit('selectTask', task)"
    >
        <div class="row task-panel mx-0 py-md-3 py-2">
            <div class="col-md-4 col-12 my-auto">
                <b>{{ task.name }}</b>
            </div>
            <div
                class="col-md-3 col-12 my-auto"
                :class="{
                    'text-warning': task.statusId == 1,
                    'text-success': task.statusId == 2,
                    'text-info': task.statusId == 3,
                    'pre-checked': task.statusId == 4
                }"
            >
                {{ _nameStatusTask(task.statusId) }}
            </div>
            <!--<div class="col-md col-6 my-auto">
            {{ nameTypeTask(task.typeId) }}
        </div>-->
            <div class="col-md col-12 my-auto">
                Ex: {{ task.valueExceptions }} ({{
                    ((task.valueExceptions / task.value) * 100).toFixed(0)
                }}%)
            </div>
            <div class="col-md col-12 my-auto text-muted">
                {{ $format.dateSmall(task.create) }}
            </div>
        </div>
    </div>
</template>

<script>
/* Components */

export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    computed: {}
}
</script>

<style lang="less">
.task-panel {
    max-width: 870px;
    max-height: 110px;

    background: white;
    border-radius: 10px !important;
    -moz-transition: all 0.1s linear;
    -o-transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
}

.pre-checked {
    color: rgb(158, 0, 158);
}
</style>

<style scoped>
.task-panel {
    border-radius: 10px;
}
.task-panel:hover {
    box-shadow: 0 0.7rem 1.2rem rgba(0, 0, 0, 0.3) !important;
}
</style>
