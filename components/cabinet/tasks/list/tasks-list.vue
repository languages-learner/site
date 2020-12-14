<template>
    <div>
        <div class="mt-3 mx-0 justify-content-center">
            <task-panel
                v-for="(task, index) in tasks"
                :task="task"
                class="mx-auto mt-4"
                :key="index + 'rule'"
                @selectTask="task => $emit('selectTask', task)"
            />
        </div>
    </div>
</template>

<script>
/* Components */
import TaskPanel from './task-panel'

export default {
    components: {
        'task-panel': TaskPanel
    },
    props: {
        tasks: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedRule: null
        }
    }
}
</script>

<style></style>
