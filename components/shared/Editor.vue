<template>
    <div id="editor-post" :class="`${theme ? 'light-mode-editor' : 'dark-mode-editor'}`">
        <p :class="`${theme ? 'text-black' : 'text-[#fff]'} mt-5`">
            Nội dung bài viết<span style="color:red">*</span>
        </p>
        <vue-editor v-model="content" @blur="saveContent" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { VueEditor } from 'vue2-editor';

    export default {
        components: {
            VueEditor,
        },

        data() {
            return {
                content: '',
            };
        },
        computed: {
            ...mapState('setting/theme', ['theme']),
        },
        methods: {
            saveContent() {
                this.$emit('getContent', this.content);
            },
        },
    };
</script>
<style>
.ql-toolbar.ql-snow {
    border-radius: 10px;
}
.dark-mode-editor .ql-snow .ql-picker {
    color:#fff;
}
.light-mode-editor .ql-snow .ql-picker {
    color:#000;
}
.dark-mode-editor .quillWrapper .ql-snow .ql-stroke{
    stroke: #fff;
}
.light-mode-editor .quillWrapper .ql-snow .ql-stroke{
    stroke: #000;
}
.ql-snow .ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar button.ql-active, .ql-snow .ql-toolbar button:focus, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar button.ql-active, .ql-snow.ql-toolbar button:focus, .ql-snow.ql-toolbar button:hover {
    color: #3aa554 !important;
}
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter {
    stroke: #3aa554 !important;
}
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill {
    fill:#3aa554 !important;
}
.dark-mode-editor .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
    fill: #fff;
}
.light-mode-editor .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
    fill: #000;
}
.ql-container.ql-snow, .dark-mode-editor .ql-toolbar.ql-snow {
    border-radius: 16px;
    margin-top: 20px;

}
.dark-mode-editor .ql-container.ql-snow, .dark-mode-editor .ql-toolbar.ql-snow{
    border: 1px solid #3a3b3c !important;
}
.light-mode-editor .ql-container.ql-snow, .dark-mode-editor .ql-toolbar.ql-snow {
    border: 1px solid light-gray !important;
}
.dark-mode-editor .ql-editor {
    background-color: #18191a !important;
    border-radius: 16px;
    color: #fff;
}
.dark-mode-editor .ql-snow .ql-picker-options .ql-picker-item, .dark-mode-editor .ql-snow .ql-picker-options{
    color: #fff;
    background-color: #242526
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label, .ql-toolbar.ql-snow .ql-picker-options {
    border:0 !important;
}
.quillWrapper .ql-snow.ql-toolbar {
    margin-top: 0;
}
</style>
