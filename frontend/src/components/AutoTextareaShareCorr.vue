<template>
    <div class="textarea">
        <textarea
            v-model="currentValue"
            :style="inputStyle"
            id="ShareText"
            class="bigtextarea input"
            form="ShareToBeCorrected"
            type="textarea"
            @keydown="checkShareForm"
            @input="checkShareForm"
            name="ShareText"
        ></textarea>
        <textarea class="shadow" v-model="currentValue" ref="shadow" tabindex="0"></textarea>
    </div>
</template>

<script>
    export default {
        name: "AutoTextareaShareCorr",
        props: {
            value: String,
        },
        data() {
            return {
                currentValue: "",
                inputHeight: "",
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
            const oldText = document.getElementById("oldShareText").textContent;
            console.log(oldText);
            this.currentValue = oldText;
            // const SH = document.getElementById("oldShareText").scrollHeight;
            // sessionStorage.getItem("SH", SH);
            this.resize();
        },
        methods: {
            resize() {
                this.inputHeight = `${this.$refs.shadow.scrollHeight + 40}px`;

                // this.inputHeight = `${sessionStorage.getItem("SH") + this.$refs.shadow.scrollHeight + 40}px`;
                // sessionStorage.removeItem("SH");
            },

            checkShareForm() {
                const noblank = document.getElementById("ShareText").value.trim();
                if (noblank != "" && noblank.length > 2) {
                    document.getElementById("ShareBtn").disabled = false;
                } else {
                    document.getElementById("ShareBtn").disabled = true;
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
