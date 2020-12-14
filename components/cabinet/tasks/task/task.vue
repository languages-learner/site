<template>
    <div
        class="mx-auto"
        :class="{
            'col-md-8 col-12': !splitScreenEnable,
            'col-12': splitScreenEnable
        }"
    >
        <div class="row mt-3 mx-0 justify-content-center">
            <div class="col-12 text-center pointer" @click="toTextMode">
                <b>{{ task.name }}</b>
                <i
                    v-if="!textMode"
                    class="fa fa-pencil px-2 pt-2"
                    aria-hidden="true"
                ></i>
                <i
                    v-else
                    class="fa fa-file-text-o px-2 pt-2"
                    aria-hidden="true"
                ></i>
                <p class="text-muted m-0">
                    words: {{ taskInfo.value }}, ex:
                    {{ taskInfo.valueExceptions }}
                </p>
            </div>

            <!-- Html форма -->
            <div
                v-if="!textMode"
                class="mx-auto mt-3 task-html text-left"
                v-html="taskInfo.html"
            ></div>

            <!-- Изменение статуса -->
            <div
                v-show="textMode"
                class="col-12 mt-3 m-0 p-0 justify-content-center"
            >
                <b-form-select
                    class="col-md-3 col-12 my-1"
                    v-model="task.statusId"
                    :options="
                        statusesTask.map(x => {
                            return { value: x.id, text: x.name }
                        })
                    "
                    @change="ChangeTaskStatus"
                ></b-form-select>
            </div>

            <!-- Текстовая форма -->
            <b-form-textarea
                v-if="textMode"
                class="col-md-12 col-12 p-0 mt-3 task-changer"
                v-model="taskInfo.text"
                ref="task-changer"
                rows="3"
                max-rows="35"
                plaintext
            ></b-form-textarea>

            <!-- Изменение -->
            <div
                v-if="textMode && editMode"
                class="row col-12 mt-2 m-0 p-0 justify-content-center"
            >
                <div class="col-12"><b>Edit</b></div>

                <b-form-select
                    class="col-md-3 col-12 my-1"
                    v-model="selectedTypeEditId"
                    :options="
                        typesChangeTask.map(x => {
                            return { value: x.id, text: x.name }
                        })
                    "
                ></b-form-select>

                <div class="col-12">
                    Selected text: "{{ selectedText.text }}"
                </div>

                <div class="col-md-6 col-12">
                    <div class="text-center">Changed text</div>
                    <b-form-textarea
                        class="mt-2"
                        size="lg"
                        v-model="selectedText.editText"
                    ></b-form-textarea>
                </div>

                <div class="col-md-6 col-12">
                    <div class="text-center">Reason</div>
                    <b-form-textarea
                        class="mt-2"
                        size="lg"
                        v-model="selectedText.reason"
                    ></b-form-textarea>
                </div>

                <div class="col-md-3 col-12 mt-4 text-center">
                    <b-button
                        class="w-100"
                        variant="outline-primary"
                        @click="editText"
                        >Change</b-button
                    >
                </div>
                <div class="col-md-3 col-12 mt-4 text-center">
                    <b-button
                        class="w-100"
                        variant="outline-danger"
                        @click="cancelEditText"
                        >Cancel</b-button
                    >
                </div>
            </div>

            <!-- Список изменений -->
            <div
                v-show="textMode"
                class="col-md-12 col-12 mt-3 m-0 p-0 justify-content-center"
            >
                <div class="text-center">
                    <b
                        >Changes ({{
                            taskInfo.changes.filter(x => x.statusId == 1)
                                .length
                        }})</b
                    >
                </div>
                <div
                    class="text-center text-muted mb-3 pointer"
                    @click="showChanges = !showChanges"
                >
                    <b>{{ showChanges ? 'hide' : 'show' }}</b>
                </div>
                <b-table
                    v-show="showChanges"
                    :fields="[
                        { key: 'lastText', label: 'Text' },
                        { key: 'text', label: 'Changed' },
                        { key: 'reason', label: 'Reason' },
                        { key: 'typeId', label: 'Type' },
                        { key: 'delete', label: '' }
                    ]"
                    :items="taskInfo.changes.filter(x => x.statusId == 1)"
                    small
                    hover
                    responsive
                >
                    <template slot="lastText" slot-scope="data">
                        <span>{{ data.value }}</span>
                    </template>

                    <template slot="text" slot-scope="data">
                        <span>{{ data.value }}</span>
                    </template>

                    <template slot="reason" slot-scope="data">
                        <b-form-textarea
                            v-model="data.value"
                            :plaintext="data.item.id != inFocus"
                            rows="3"
                            @focus="eventChangeFocus(data.item)"
                            @blur="eventChangeFocus(data.item)"
                            @update="eventChangeReason(data.item, data.value)"
                        ></b-form-textarea>
                    </template>

                    <template slot="typeId" slot-scope="data">
                        <span
                            v-if="data.value == 1"
                            class="text-muted change-task-type"
                            ><i class="fa fa-paragraph" aria-hidden="true"></i
                        ></span>
                        <span
                            v-if="data.value == 2"
                            class="text-muted change-task-type"
                            ><i class="fa fa-font" aria-hidden="true"></i
                        ></span>
                        <!--<span>{{ nameChangeTask(data.value) }}</span>-->
                    </template>

                    <template slot="delete" slot-scope="data">
                        <span class="pointer" @click="removeChange(data.item)"
                            ><i class="fa fa-times" aria-hidden="true"></i
                        ></span>
                        <span
                            class="pointer"
                            v-if="changedReasons[data.item.id]"
                            @click="changeReason(data.item)"
                            ><i class="fa fa-floppy-o" aria-hidden="true"></i
                        ></span>
                    </template>
                </b-table>
            </div>

            <!-- История изменений -->
            <div
                v-show="textMode"
                class="col-md-12 col-12 mt-3 m-0 p-0 justify-content-center"
            >
                <div class="text-center">
                    <b
                        >History Changes ({{
                            taskInfo.historyChanges.length
                        }})</b
                    >
                </div>
                <div
                    class="text-center text-muted mb-3 pointer"
                    @click="showHistoryChanges = !showHistoryChanges"
                >
                    <b>{{ showHistoryChanges ? 'hide' : 'show' }}</b>
                </div>
                <b-table
                    v-show="showHistoryChanges"
                    :fields="[
                        { key: 'typeId', label: 'Type' },
                        { key: 'changeTaskId', label: 'Change' },
                        { key: 'timeStamp', label: 'Date' }
                    ]"
                    :items="
                        taskInfo.historyChanges.map(x => {
                            return {
                                typeId: x.typeId,
                                changeTaskId: x.changeTaskId,
                                timeStamp: x.timeStamp,
                                changeJson: x.changeJson
                                    ? JSON.parse(x.changeJson)
                                    : null,
                                task: taskChangeById(x.changeTaskId),
                                _rowVariant: rowVariantHistoryChange(x.typeId)
                            }
                        })
                    "
                    small
                    hover
                    responsive
                >
                    <template slot="typeId" slot-scope="data">
                        <span>{{
                            _nameHistoryTypeChangeTask(data.value)
                        }}</span>
                    </template>

                    <template slot="changeTaskId" slot-scope="data">
                        <!-- Add or Remove or Replacement-->
                        <span
                            v-if="
                                data.item.typeId == 1 ||
                                    data.item.typeId == 2 ||
                                    data.item.typeId == 5
                            "
                        >
                            "{{ data.item.task.lastText }}"
                            <span class="px-2">-></span>
                            "{{ data.item.task.text }}"
                        </span>

                        <!-- Update Status-->
                        <span v-if="data.item.typeId == 3">{{
                            _nameStatusTask(data.item.changeJson.Value)
                        }}</span>

                        <!-- Update Reason-->
                        <span v-if="data.item.typeId == 4">
                            <p class="m-0">
                                ["{{ data.item.task.lastText }}"
                                <span>-></span>
                                "{{ data.item.task.text }}"]:
                                <br />
                                {{ data.item.changeJson.Value }}
                            </p>
                        </span>
                    </template>

                    <template slot="timeStamp" slot-scope="data">
                        <span>{{ $format.dateBig(data.value) }}</span>
                    </template>
                </b-table>
            </div>

            <!-- Контекстное меню -->
            <div id="context-menu" class="m-0 justify-content-center">
                <div class="row w-100 p-0 m-0">
                    <div class="col-12 px-0 py-1 menu-item" @click="selectText">
                        Change
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Mixins */
import { styleMixin } from '~/vuex-mixins/style'

/* Components */
import jQuery from 'jquery'
import $ from 'jquery'

export default {
    mixins: [styleMixin],
    props: {
        task: {
            type: Object,
            require: true
            /* id, name, typeId, statusId, languageId */
        }
    },
    data() {
        return {
            showChanges: false,
            showHistoryChanges: false,

            textMode: false,
            editMode: false,

            taskInfo: {
                text: '',
                html: '',
                changes: [
                    /* id, taskId, lastText, text, typeId, create, update */
                ],
                historyChanges: [
                    /*  */
                ]
            },
            selectedText: {
                startIndex: 0,
                stopIndex: 0,
                text: '',
                editText: '',
                reason: ''
            },
            selectedTypeEditId: 1,

            inFocus: -1,
            changedReasons: {}
        }
    },
    methods: {
        taskChangeById(id) {
            return this.taskInfo.changes.find(x => x.id == id)
        },
        rowVariantHistoryChange(typeId) {
            switch (typeId) {
                // Add
                case 1:
                    return 'success'
                // Remove
                case 2:
                    return 'danger'
                // Update Status
                case 3:
                    return 'info'
                // Update Reason
                case 4:
                    return 'info'
                // Replacement
                case 5:
                    return 'warning'
                default:
                    break
            }
            return ''
        },
        getTaskInformation() {
            this.getTaskInfo(this.task.id).then(data => {
                this.$set(this, 'taskInfo', data)
            })
        },
        toTextMode() {
            this.textMode = !this.textMode
        },
        selectText() {
            var startIndex = this.$refs['task-changer'].selectionStart
            var endIndex = this.$refs['task-changer'].selectionEnd

            this.selectedText = {
                startIndex: startIndex,
                endIndex: endIndex,
                text: this.taskInfo.text.substring(startIndex, endIndex),
                editText: this.taskInfo.text.substring(startIndex, endIndex)
            }

            this.editMode = true
        },
        editText() {
            this.changeTaskText({
                id: this.task.id,
                startIndex: this.selectedText.startIndex,
                endIndex: this.selectedText.endIndex,
                text: this.selectedText.editText,
                reason: this.selectedText.reason,
                typeEditId: this.selectedTypeEditId
            }).then(data => {
                this.$notifySuccess('Change saved successfully')
                this.$set(this, 'taskInfo', data)
                this.task.valueExceptions = this.taskInfo.valueExceptions
                this.cancelEditText()
            })
        },
        cancelEditText() {
            this.selectedText = {
                startIndex: 0,
                endIndex: 0,
                text: '',
                editText: ''
            }
            this.editMode = false
        },
        removeChange(change) {
            this.removeTaskChange({
                changeTaskId: change.id
            }).then(data => {
                this.$notifySuccess('Change successfully deleted')
                this.$set(this, 'taskInfo', data)
                this.task.valueExceptions = this.taskInfo.valueExceptions
            })
        },
        ChangeTaskStatus(value) {
            this.changeTaskStatus({
                id: this.task.id,
                statusId: value
            }).then(data => {
                this.$notifySuccess('Status changed successfully')
                this.taskInfo.historyChanges.push({
                    changeTaskId: this.task.id,
                    timeStamp: Date.now() - 3 * 60 * 60 * 1000,
                    typeId: 3,
                    changeJson: JSON.stringify({ LastValue: 1, Value: value })
                })
            })
        },
        eventChangeFocus(select) {
            this.inFocus = select.id
        },
        eventChangeReason(select, value) {
            this.$set(this.changedReasons, select.id, { change: value })
        },
        changeReason(select) {
            if (!this.changedReasons[select.id]) return

            this.changeReasonChange({
                changeId: select.id,
                reason: this.changedReasons[select.id].change
            }).then(data => {
                this.$notifySuccess('Reason for change successfully changed')
                this.inFocus = -1
                this.taskInfo.historyChanges.push({
                    changeTaskId: select.id,
                    timeStamp: Date.now() - 3 * 60 * 60 * 1000,
                    typeId: 4,
                    changeJson: JSON.stringify({
                        LastValue: '',
                        Value: this.changedReasons[select.id].change
                    })
                })
                this.$set(this.changedReasons, select.id, null)
            })
        }
    },
    watch: {
        textMode() {
            jQuery(document).ready($ => {
                var $cm = $('#context-menu')

                $('.task-changer').contextmenu(function(e) {
                    $cm.css({
                        display: 'flex',
                        width: '130px',
                        left: e.pageX,
                        top: e.pageY - 124,
                        background: '#FFFFFF',
                        border: '1px solid #dddddd'
                    })

                    return false
                })

                $('html').click(function() {
                    $cm.hide()
                })
            })
        },
        task() {
            this.cancelEditText()
            this.showChanges = false
            this.showHistoryChanges = false
            this.getTaskInformation()
        }
    },
    created() {
        this.getTaskInformation()
    }
}
</script>

<style lang="less">
.task-html {
    font-size: 19px;
    b {
        color: red;
    }
    .aa {
        color: red;
    }
}

.task-changer {
    font-size: 19px;
}

.change-task-type {
    font-size: 10px;
}

#context-menu {
    position: absolute;
    display: none;

    .dropdown-menu {
        width: 130px;
    }

    .menu-item {
        cursor: pointer;
    }
    .menu-item:hover {
        background: gray;
    }
}
</style>
