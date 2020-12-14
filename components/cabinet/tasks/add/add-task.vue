<template>
    <div class="row justify-content-center mt-5 m-0">
        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Text</div>
            <b-form-textarea
                class="mt-2"
                v-model="text"
                rows="10"
                max-rows="35"
                @update="eventUpdateText"
            ></b-form-textarea>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Language</div>
            <b-form-select
                class="mt-2"
                v-model="selectedLangId"
                :options="_languagesOptions"
            ></b-form-select>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Task Type</div>
            <b-form-select
                class="mt-2"
                v-model="selectedTaskTypeId"
                :options="_taskTypesOptions"
            ></b-form-select>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Task Status</div>
            <b-form-select
                class="mt-2"
                v-model="selectedTaskStatusId"
                :options="_taskStatusesOptions"
            ></b-form-select>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4">
            <div class="text-center">Title</div>
            <b-form-textarea
                class="mt-2"
                size="sm"
                v-model="title"
                @update="eventUpdateText"
            ></b-form-textarea>
        </div>

        <div class="col-md-6 col-12 mt-4 mx-md-4 text-center">
            <b-button class="w-100" variant="outline-primary" @click="AddTask"
                >Добавить</b-button
            >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedLangId: 2,
            selectedTaskTypeId: 2,
            selectedTaskStatusId: 1,

            title: '',
            text: ''
        }
    },
    methods: {
        AddTask() {
            this.$emit('addTask', {
                name: this.title,
                typeId: this.selectedTaskTypeId,
                statusId: this.selectedTaskStatusId,
                languageId: this.selectedLangId,
                text: this.text
            })
        },

        eventUpdateText() {
            localStorage.task = JSON.stringify({
                title: this.title,
                text: this.text
            })
        }
    },
    mounted() {
        try {
            var localTask = JSON.parse(localStorage.task)
            if (localTask) {
                this.title = localTask.title
                this.text = localTask.text
            }
        } catch {}
    }
}
</script>
