<template>
    <div class="textarea">
        <textarea
            v-model="currentValue"
            :style="inputStyle"
            id="CommentText"
            class="bigtextarea input"
            form="CommentToBePosted"
            type="textarea"
            @keydown="checkCommentForm"
            @input="checkCommentForm"
            placeholder="..."
            name="CommentText"
        ></textarea>
        <textarea class="shadow" v-model="currentValue" ref="shadow" tabindex="0"></textarea>
    </div>
</template>

<script>
    export default {
        name: "AutoTextarea",
        props: {
            value: String,
        },
        data() {
            return {
                currentValue: "",
                inputHeight: "0",
            };
        },
        watch: {
            currentValue() {
                this.resize();
                this.$emit("input", this.currentValue);
            },
        },
        computed: {
            inputStyle() {
                return {
                    "min-height": this.inputHeight,
                };
            },
        },
        mounted() {
            this.resize();
        },
        methods: {
            resize() {
                this.inputHeight = `${this.$refs.shadow.scrollHeight + 40}px`;
            },

            checkCommentForm() {
                const noblank = document.getElementById("CommentText").value.trim();
                if (noblank != "" && noblank.length > 2) {
                    document.getElementById("CommentBtn").disabled = false;
                } else {
                    document.getElementById("CommentBtn").disabled = true;
                }
            },
        },
    };
</script>

<style scoped lang="scss">
    .textarea {
        display: flex;
        flex-direction:column;
        textarea {
            width: 100%;
            padding: 20px;
            //   border: 1px solid #aeaeae;
            resize: none;
            overflow: hidden;
            font-size: 16px;
            height: 40;
            border-radius:6px;

            &.shadow {
                margin: 0;
                padding:0;
                border: none;
                max-height: 0;
                pointer-events: none;
                visibility :hidden;
                opacity: 0;
                margin: 0;
            }
        }
    }
</style>
