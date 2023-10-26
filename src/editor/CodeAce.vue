<template>
  <div class="ace-editor-main" v-loading="loading"></div>
</template>

<script>
import { keywords } from '../data/option-keywords';
import { loadScriptsAsync, formatCode } from '../common/helper';
import { store, loadExampleCode, parseSourceCode } from '../common/store';
import { SCRIPT_URLS } from '../common/config';

function ensureACE() {
  if (typeof ace === 'undefined') {
    return loadScriptsAsync([
      SCRIPT_URLS.aceDir + '/ace.js',
      SCRIPT_URLS.aceDir + '/ext-language_tools.js'
    ]).then(function () {
      const lnTools = ace.require('ace/ext/language_tools');

      const completions = [];
      keywords.forEach((keyword) => {
        completions.push({
          caption: keyword.name,
          value: keyword.name,
          score: keyword.count,
          metal: 'local'
        });
      });

      lnTools.addCompleter({
        getCompletions: function (editor, session, pos, prefix, callback) {
          callback(null, completions);
        }
      });
    });
  }
  return Promise.resolve();
}

export default {
  props: ['initialCode'],

  data() {
    return {
      shared: store,
      loading: false
    };
  },

  mounted() {
    this.loading = true;
    ensureACE()
      .then(() => {
        const editor = ace.edit(this.$el);
        editor.getSession().setMode('ace/mode/javascript');
        editor.setOptions({
          enableBasicAutocompletion: true,
          enableSnippets: true,
          tabSize: 2,
          enableLiveAutocompletion: true
        });

        this._editor = editor;

        editor.on('change', () => {
          store.sourceCode = store.runCode = editor.getValue();
          window.parent.postMessage(editor.getValue());
        });

        if (this.initialCode) {
          this.setInitialCode(this.initialCode);
        }

        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });

    window.addEventListener(
      'message',
      (e) => {
        // console.log(e, 'parent');
        if (
          typeof e.data === 'string' &&
          (JSON.parse(e.data)?.code || JSON.parse(e.data)?.c)
        ) {
          window.result = JSON.parse(e.data)?.result;
          console.log(window);
          !c
            ? formatCode(JSON.parse(e.data)?.code).then((v) => {
                this.setInitialCode(v);
              })
            : loadExampleCode(c).then((code) => {
                // Only set the code in editor. editor will sync to the store.
                const resCode = parseSourceCode(code);
                this.setInitialCode(resCode);
                // if (store.initialCode !== CODE_CHANGED_FLAG) {
                //   store.initialCode = this.initialCode;
                // }
              });
        }
      },
      false
    );
  },

  methods: {
    setInitialCode(code) {
      if (this._editor && code) {
        this._editor.setValue(code || '');
        this._editor.selection.setSelectionRange({
          start: {
            row: 1,
            column: 4
          },
          end: {
            row: 1,
            column: 4
          }
        });
      }
    }
  },

  watch: {
    initialCode(newVal) {
      this.setInitialCode(newVal);
    }
  }
};
</script>

<style lang="scss">
.ace-editor-main {
  font-family: 'Source Code Pro', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas',
    monospace;
  font-size: 12px;
  line-height: 18px;
  padding: 10px;
  // height: 100%;

  // Fix safari
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
