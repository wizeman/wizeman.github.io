/* global define:false */
/*eslint-disable no-unused-vars*/
define('ace/mode/irene', function(require, exports, module) {
/*eslint-enable no-unused-vars*/
	var oop = require("ace/lib/oop");
	var TextMode = require("ace/mode/text").Mode;
	var IreneHighlightRules = require("ace/mode/irene_highlight_rules").IreneHighlightRules;

	var Mode = function() {
		this.HighlightRules = IreneHighlightRules;
	};
	oop.inherits(Mode, TextMode);

	(function() {
	}).call(Mode.prototype);

	exports.Mode = Mode;
});

/*eslint-disable no-unused-vars*/
define('ace/mode/irene_highlight_rules', function(require, exports, module) {
/*eslint-enable no-unused-vars*/
	var oop = require("ace/lib/oop");
	var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

	var IreneHighlightRules = function() {
		this.$rules = {
			start: [
				{
					token: "comment",
					regex: '//.*$'
				},
				{
					token: "string",
					regex: '"',
					next: "string"
				},
				{
					token: "keyword.source",
					regex: '\\b(?:def|elif|then|else|do|mod|continue|break|and|or|not|struct|if|while|end|return|self)\\b'
				},
				{
					token: "constant.buildin.language.source",
					regex: '\\b(?:true|false)\\b'
				},
				{
					token: "keyword.operator",
					regex: '[-+\/*=<>:,]+'
				},
				{
					token: "constant.numeric",
					regex: '\\b\\d+\\b'
				},
				{
					token: "variable2",
					regex: '[a-zA-Z][\\w_]*'
				},
				{
					token: "tag",
					regex: 'self\.[\\w_]*'
				},
				{
					token: "function",
					regex: '_[\\w_]*'
				},
			],
			string: [
				{
					token: "string",
					regex: '(?:(?:\\\\\\\\)|(?:\\\\n)|(?:\\\\\\r)|(?:\\\\\\t)|(?:\\\\")|(?:[^"\\\\]))*?"',
					next: "start"
				},
				{
					token: "string",
					regex: '(?:(?:\\\\\\\\)|(?:\\\\n)|(?:\\\\\\r)|(?:\\\\\\t)|(?:\\\\")|(?:[^"\\\\]))*?\\\\$',
					next: "string"
				},
				{
					token: "error",
					regex: '.*',
					next: "error"
				},
			],
			error: [
				{
					token: "error",
					regex: '.*',
				},
			],
		};
	}

	oop.inherits(IreneHighlightRules, TextHighlightRules);

	exports.IreneHighlightRules = IreneHighlightRules;
});
