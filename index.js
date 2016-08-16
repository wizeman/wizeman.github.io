/* eslint-env browser, jquery */
/* global CodeMirror:false */

function createEditor(id) {
  var editor = ace.edit(id);

  editor.$blockScrolling = Infinity;
  editor.setTheme('ace/theme/neweclipse');
  editor.setTheme('ace/theme/neweclipse');
  editor.setReadOnly(true);
  editor.setAutoScrollEditorIntoView(true);
  editor.setShowPrintMargin(false);
  editor.setDisplayIndentGuides(false);
  editor.setHighlightActiveLine(false);
  editor.setHighlightGutterLine(false);
  editor.setShowFoldWidgets(false);
  editor.setOptions({
    minLines: 1,
    maxLines: 5000,
    fontSize: '12pt',
  });

  editor.renderer.setOption('fixedWidthGutter', false);

  var session = editor.getSession();

  session.setOption('indentedSoftWrap', false);
  session.setUseWrapMode(true);
  session.setUseSoftTabs(false);
  session.setMode('ace/mode/irene');

  return editor;
}

var editor = createEditor('editor', true);

$.get('example.ire', function(data) {
  editor.setValue(data, -1);
  editor.setReadOnly(false);
}, "text");

var result = createEditor('result', 'nocursor');

var btn = document.getElementById('run');

btn.onclick = function() {
  var contents = editor.getValue();

  result.setValue('Esperando respuesta del servidor...', -1);

  $.ajax({
    method: 'POST',
    crossDomain: true,
    url: 'https://home.wizy.org/run_irene',
    contentType: 'text/plain; charset=UTF-8',
    data: contents,
    dataType: 'text',
    timeout: 60000,

/*eslint-disable no-unused-vars*/
    success: function(data, textStatus, jqXHR) {
/*eslint-enable no-unused-vars*/
      result.setValue(data.trim(), -1);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      var errorMsg = "Error contactando servidor: " + textStatus;
      if ((errorThrown !== null) && (errorThrown.trim() !== "") && (errorThrown !== textStatus)) {
        errorMsg = errorMsg + " (" + errorThrown + ")";
      }
      result.setValue(errorMsg, -1);
    },
  });
};
