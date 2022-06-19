<template>
    <div class="textarea">
        <textarea
            v-model="currentValue"
            :style="inputStyle"
            :id="`CommentOnACommentText-${commentid}`"
            class="bigtextarea textarea input"
            form="CommentOnACommentText"
            type="textarea"
            @keydown="checkCommentOnCommentForm(`${commentid}`)"
            @input="checkCommentOnCommentForm(`${commentid}`)"
            placeholder="..."
            name="CommentOnACommentText"
        ></textarea>

        <textarea class="shadow" v-model="currentValue" ref="shadow" tabindex="0"></textarea>
    </div>
</template>

<script>
    export default {
        name: "AutoTextareaCommentOnAComment",
        props: {
            value: String,
            commentid: Number,
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

            checkCommentOnCommentForm(i) {
                const noblank = document.getElementById(`CommentOnACommentText-` + i).value.trim();
                if (noblank != "" && noblank.length > 2) {
                    document.getElementById(`CommentOnACommentBtn-` + i).disabled = false;
                } else {
                    document.getElementById(`CommentOnACommentBtn-` + i).disabled = true;
                }
            },
        },
    };
</script>

<style scoped lang="scss">
    .textarea {
        display: flex;
        flex-direction: column;
        textarea {
            width: 100%;
            padding: 20px;
            //   border: 1px solid #aeaeae;
            resize: none;
            overflow: hidden;
            font-size: 16px;
            height: 40;
            border-radius: 6px;

            &.shadow {
                margin: 0;
                padding: 0;
                border: none;
                max-height: 0;
                pointer-events: none;
                visibility: hidden;
                opacity: 0;
                margin: 0;
            }
        }
    }
</style>
