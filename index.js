/* eslint-env browser, jquery */
/* global CodeMirror:false */

CodeMirror.defineSimpleMode('simplemode', {
  start: [
    {regex: /"/,
     token: "string", next: "string"},
    {regex: /(?:def|elif|then|else|do|mod|continue|break|and|or|not)\b/,
     token: "keyword"},
    {regex: /(?:struct|if|while)\b/,
     token: "keyword", indent: true},
    {regex: /(?:end)/,
     token: "keyword", dedent: true},
    {regex: /true|false/, token: "atom"},
    {regex: /\d+/i,
     token: "number"},
    {regex: /\/\/.*/, token: "comment"},
    {regex: /[-+\/*=<>:,]+/, token: "operator"},
    {regex: /\(/, indent: true},
    {regex: /\)/, dedent: true},
    {regex: /[a-zA-Z][\w@_]*/, token: "variable"},
    {regex: /@[\w@_]*/, token: "variable-2"},
    {regex: /_[\w@_]*/, token: "variable-3"},
  ],
  string: [
    {regex: /(?:(?:\\\\)|(?:\\n)|(?:\\\r)|(?:\\\t)|(?:\\")|(?:[^"\\]))*?"/,
     token: "string", next: "start"},
    {regex: /(?:(?:\\\\)|(?:\\n)|(?:\\\r)|(?:\\\t)|(?:\\")|(?:[^"\\]))*?\\$/,
     token: "string"},
    {regex: /.*/, token: "error", next: "error"},
  ],
  error: [
    {regex: /.*/, token: "error"},
  ],
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});

var editor = CodeMirror.fromTextArea(document.getElementById('demoirene'), {
    lineNumbers: true,
    mode: 'simplemode',
    matchBrackets: true,
    viewportMargin: Infinity,
    indentWithTabs: true,
    indentUnit: 4,
    readOnly: true,
    lineWrapping: true
});

$.get('example.ire', function(data) {
  editor.doc.setValue(data);
  editor.setOption('readOnly', false);
}, "text");

var result = CodeMirror.fromTextArea(document.getElementById('result'), {
    lineNumbers: true,
    mode: 'simplemode',
    matchBrackets: true,
    viewportMargin: Infinity,
    indentWithTabs: true,
    indentUnit: 4,
    readOnly: 'nocursor',
    lineWrapping: true
});

var btn = document.getElementById('run');
btn.onclick = function() {
  var contents = editor.doc.getValue();

  result.doc.setValue('Esperando respuesta del servidor...');

  $.ajax({
    method: 'POST',
    crossDomain: true,
    url: 'https://home.wizy.org/run_irene',
    contentType: 'text/plain; charset=UTF-8',
    data: contents,
    dataType: 'text',

/*eslint-disable no-unused-vars*/
    success: function(data, textStatus, jqXHR) {
/*eslint-enable no-unused-vars*/
      result.doc.setValue(data);
    },
  });
};
