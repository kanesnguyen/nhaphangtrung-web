<template>
    <div id="editor-post" class="light-mode-editor">
        <p class="text-black mt-5">
            Nội dung bài viết<span style="color:red">*</span>
        </p>
        <vue-editor v-model="content" @blur="saveContent" :isEdit="isEdit"/>
    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor';

    export default {
        components: {
            VueEditor,
        },
        props: {
            contentProps: {
                type: String,
                default: null,
            },
            isEdit: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                content: this.contentProps || '',
            };
        },
        computed: {
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
.ql-snow .ql-picker {
    color:#000;
}
.quillWrapper .ql-snow .ql-stroke{
    stroke: #000;
}
.ql-snow .ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar button.ql-active, .ql-snow .ql-toolbar button:focus, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar button.ql-active, .ql-snow.ql-toolbar button:focus, .ql-snow.ql-toolbar button:hover {
    color: #f6b900 !important;
}
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter {
    stroke: #f6b900 !important;
}
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill {
    fill:#f6b900 !important;
}
.ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
    fill: #000;
}
.ql-container.ql-snow, .ql-toolbar.ql-snow {
    border-radius: 12px;
    margin-top: 20px;

}
.ql-container.ql-snow, .ql-toolbar.ql-snow {
    border: 1px solid light-gray !important;
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label, .ql-toolbar.ql-snow .ql-picker-options {
    border:0 !important;
}
.quillWrapper .ql-snow.ql-toolbar {
    margin-top: 0;
}
</style>
