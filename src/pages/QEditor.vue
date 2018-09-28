<template>
    <div id="qeditor">
        <quill-editor ref="myTextEditor"
                      :config="editorOption"
                      @change="onEditorChange($event)"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
    </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["image", "link", "code-block"]
          ]
        }
      }
    };
  },
  methods: {
    // upData(content){
    //   this.$emit('changeContent',content);
    // },

    onEditorChange({ editor, html, text }) {
      (this.content = html), console.log("invoke onEditorChange");
      console.log("content = " + this.content);
      // this.upData(content);
      this.$emit('changeContent', this.content);
    },
    show({ editor, html, text }) {
      console.log("this content  = " + this.content);
    },
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    }
  },
  components: {
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  }
};
</script>

<style scoped>
.quill-editor {
  height: 600px;
  width: 1200px;
  



}
</style>

