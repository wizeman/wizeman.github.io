/* eslint-env browser, jquery */
/* global CodeMirror:false */

CodeMirror.defineSimpleMode('simplemode', {
  start: [
    {regex: /"(?:(?:\\\/)|(?:\\\\)|(?:\\n)|(?:\\\r)|(?:\\\t)|(?:\\")|(?:[^"\\]))*?"/,
     token: "string"},
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
    readOnly: true
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
    readOnly: 'nocursor'
});

var socket = null;

var btn = document.getElementById('run');
btn.onclick = function() {
  var contents = editor.doc.getValue();

  if (socket !== null) {
    socket.onopen = function (event) {};
    socket.onmessage = function (event) {};
    socket.close();
  }
  socket = new WebSocket('wss://home.wizy.org', 'irene');
  socket.onmessage = function (event) {
    result.doc.setValue(event.data);
  };
  socket.onopen = function (event) {
    socket.send(contents);
  };
};
