(function () {
    'use strict';

    /*
		This is rot.js, the ROguelike Toolkit in JavaScript.
		Version 0.7~dev, generated on Thu 24 Nov 2016 08:07:39 MST.
	*/
    var ROT = {
        /**
		 * @returns {bool} Is rot.js supported by this browser?
		 */
        isSupported: function() {
            return !!(document.createElement("canvas").getContext && Function.prototype.bind);
        },

        /** Default with for display and map generators */
        DEFAULT_WIDTH: 80,
        /** Default height for display and map generators */
        DEFAULT_HEIGHT: 25,

        /** Directional constants. Ordering is important! */
        DIRS: {
            "4": [
                [ 0, -1],
                [ 1,  0],
                [ 0,  1],
                [-1,  0]
            ],
            "8": [
                [ 0, -1],
                [ 1, -1],
                [ 1,  0],
                [ 1,  1],
                [ 0,  1],
                [-1,  1],
                [-1,  0],
                [-1, -1]
            ],
            "6": [
                [-1, -1],
                [ 1, -1],
                [ 2,  0],
                [ 1,  1],
                [-1,  1],
                [-2,  0]
            ]
        },

        /** Cancel key. */
        VK_CANCEL: 3,
        /** Help key. */
        VK_HELP: 6,
        /** Backspace key. */
        VK_BACK_SPACE: 8,
        /** Tab key. */
        VK_TAB: 9,
        /** 5 key on Numpad when NumLock is unlocked. Or on Mac, clear key which is positioned at NumLock key. */
        VK_CLEAR: 12,
        /** Return/enter key on the main keyboard. */
        VK_RETURN: 13,
        /** Reserved, but not used. */
        VK_ENTER: 14,
        /** Shift key. */
        VK_SHIFT: 16,
        /** Control key. */
        VK_CONTROL: 17,
        /** Alt (Option on Mac) key. */
        VK_ALT: 18,
        /** Pause key. */
        VK_PAUSE: 19,
        /** Caps lock. */
        VK_CAPS_LOCK: 20,
        /** Escape key. */
        VK_ESCAPE: 27,
        /** Space bar. */
        VK_SPACE: 32,
        /** Page Up key. */
        VK_PAGE_UP: 33,
        /** Page Down key. */
        VK_PAGE_DOWN: 34,
        /** End key. */
        VK_END: 35,
        /** Home key. */
        VK_HOME: 36,
        /** Left arrow. */
        VK_LEFT: 37,
        /** Up arrow. */
        VK_UP: 38,
        /** Right arrow. */
        VK_RIGHT: 39,
        /** Down arrow. */
        VK_DOWN: 40,
        /** Print Screen key. */
        VK_PRINTSCREEN: 44,
        /** Ins(ert) key. */
        VK_INSERT: 45,
        /** Del(ete) key. */
        VK_DELETE: 46,
        /***/
        VK_0: 48,
        /***/
        VK_1: 49,
        /***/
        VK_2: 50,
        /***/
        VK_3: 51,
        /***/
        VK_4: 52,
        /***/
        VK_5: 53,
        /***/
        VK_6: 54,
        /***/
        VK_7: 55,
        /***/
        VK_8: 56,
        /***/
        VK_9: 57,
        /** Colon (:) key. Requires Gecko 15.0 */
        VK_COLON: 58,
        /** Semicolon (;) key. */
        VK_SEMICOLON: 59,
        /** Less-than (<) key. Requires Gecko 15.0 */
        VK_LESS_THAN: 60,
        /** Equals (=) key. */
        VK_EQUALS: 61,
        /** Greater-than (>) key. Requires Gecko 15.0 */
        VK_GREATER_THAN: 62,
        /** Question mark (?) key. Requires Gecko 15.0 */
        VK_QUESTION_MARK: 63,
        /** Atmark (@) key. Requires Gecko 15.0 */
        VK_AT: 64,
        /***/
        VK_A: 65,
        /***/
        VK_B: 66,
        /***/
        VK_C: 67,
        /***/
        VK_D: 68,
        /***/
        VK_E: 69,
        /***/
        VK_F: 70,
        /***/
        VK_G: 71,
        /***/
        VK_H: 72,
        /***/
        VK_I: 73,
        /***/
        VK_J: 74,
        /***/
        VK_K: 75,
        /***/
        VK_L: 76,
        /***/
        VK_M: 77,
        /***/
        VK_N: 78,
        /***/
        VK_O: 79,
        /***/
        VK_P: 80,
        /***/
        VK_Q: 81,
        /***/
        VK_R: 82,
        /***/
        VK_S: 83,
        /***/
        VK_T: 84,
        /***/
        VK_U: 85,
        /***/
        VK_V: 86,
        /***/
        VK_W: 87,
        /***/
        VK_X: 88,
        /***/
        VK_Y: 89,
        /***/
        VK_Z: 90,
        /***/
        VK_CONTEXT_MENU: 93,
        /** 0 on the numeric keypad. */
        VK_NUMPAD0: 96,
        /** 1 on the numeric keypad. */
        VK_NUMPAD1: 97,
        /** 2 on the numeric keypad. */
        VK_NUMPAD2: 98,
        /** 3 on the numeric keypad. */
        VK_NUMPAD3: 99,
        /** 4 on the numeric keypad. */
        VK_NUMPAD4: 100,
        /** 5 on the numeric keypad. */
        VK_NUMPAD5: 101,
        /** 6 on the numeric keypad. */
        VK_NUMPAD6: 102,
        /** 7 on the numeric keypad. */
        VK_NUMPAD7: 103,
        /** 8 on the numeric keypad. */
        VK_NUMPAD8: 104,
        /** 9 on the numeric keypad. */
        VK_NUMPAD9: 105,
        /** * on the numeric keypad. */
        VK_MULTIPLY: 106,
        /** + on the numeric keypad. */
        VK_ADD: 107,
        /***/
        VK_SEPARATOR: 108,
        /** - on the numeric keypad. */
        VK_SUBTRACT: 109,
        /** Decimal point on the numeric keypad. */
        VK_DECIMAL: 110,
        /** / on the numeric keypad. */
        VK_DIVIDE: 111,
        /** F1 key. */
        VK_F1: 112,
        /** F2 key. */
        VK_F2: 113,
        /** F3 key. */
        VK_F3: 114,
        /** F4 key. */
        VK_F4: 115,
        /** F5 key. */
        VK_F5: 116,
        /** F6 key. */
        VK_F6: 117,
        /** F7 key. */
        VK_F7: 118,
        /** F8 key. */
        VK_F8: 119,
        /** F9 key. */
        VK_F9: 120,
        /** F10 key. */
        VK_F10: 121,
        /** F11 key. */
        VK_F11: 122,
        /** F12 key. */
        VK_F12: 123,
        /** F13 key. */
        VK_F13: 124,
        /** F14 key. */
        VK_F14: 125,
        /** F15 key. */
        VK_F15: 126,
        /** F16 key. */
        VK_F16: 127,
        /** F17 key. */
        VK_F17: 128,
        /** F18 key. */
        VK_F18: 129,
        /** F19 key. */
        VK_F19: 130,
        /** F20 key. */
        VK_F20: 131,
        /** F21 key. */
        VK_F21: 132,
        /** F22 key. */
        VK_F22: 133,
        /** F23 key. */
        VK_F23: 134,
        /** F24 key. */
        VK_F24: 135,
        /** Num Lock key. */
        VK_NUM_LOCK: 144,
        /** Scroll Lock key. */
        VK_SCROLL_LOCK: 145,
        /** Circumflex (^) key. Requires Gecko 15.0 */
        VK_CIRCUMFLEX: 160,
        /** Exclamation (!) key. Requires Gecko 15.0 */
        VK_EXCLAMATION: 161,
        /** Double quote () key. Requires Gecko 15.0 */
        VK_DOUBLE_QUOTE: 162,
        /** Hash (#) key. Requires Gecko 15.0 */
        VK_HASH: 163,
        /** Dollar sign ($) key. Requires Gecko 15.0 */
        VK_DOLLAR: 164,
        /** Percent (%) key. Requires Gecko 15.0 */
        VK_PERCENT: 165,
        /** Ampersand (&) key. Requires Gecko 15.0 */
        VK_AMPERSAND: 166,
        /** Underscore (_) key. Requires Gecko 15.0 */
        VK_UNDERSCORE: 167,
        /** Open parenthesis (() key. Requires Gecko 15.0 */
        VK_OPEN_PAREN: 168,
        /** Close parenthesis ()) key. Requires Gecko 15.0 */
        VK_CLOSE_PAREN: 169,
        /* Asterisk (*) key. Requires Gecko 15.0 */
        VK_ASTERISK: 170,
        /** Plus (+) key. Requires Gecko 15.0 */
        VK_PLUS: 171,
        /** Pipe (|) key. Requires Gecko 15.0 */
        VK_PIPE: 172,
        /** Hyphen-US/docs/Minus (-) key. Requires Gecko 15.0 */
        VK_HYPHEN_MINUS: 173,
        /** Open curly bracket ({) key. Requires Gecko 15.0 */
        VK_OPEN_CURLY_BRACKET: 174,
        /** Close curly bracket (}) key. Requires Gecko 15.0 */
        VK_CLOSE_CURLY_BRACKET: 175,
        /** Tilde (~) key. Requires Gecko 15.0 */
        VK_TILDE: 176,
        /** Comma (,) key. */
        VK_COMMA: 188,
        /** Period (.) key. */
        VK_PERIOD: 190,
        /** Slash (/) key. */
        VK_SLASH: 191,
        /** Back tick (`) key. */
        VK_BACK_QUOTE: 192,
        /** Open square bracket ([) key. */
        VK_OPEN_BRACKET: 219,
        /** Back slash (\) key. */
        VK_BACK_SLASH: 220,
        /** Close square bracket (]) key. */
        VK_CLOSE_BRACKET: 221,
        /** Quote (''') key. */
        VK_QUOTE: 222,
        /** Meta key on Linux, Command key on Mac. */
        VK_META: 224,
        /** AltGr key on Linux. Requires Gecko 15.0 */
        VK_ALTGR: 225,
        /** Windows logo key on Windows. Or Super or Hyper key on Linux. Requires Gecko 15.0 */
        VK_WIN: 91,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_KANA: 21,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_HANGUL: 21,
        /** 英数 key on Japanese Mac keyboard. Requires Gecko 15.0 */
        VK_EISU: 22,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_JUNJA: 23,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_FINAL: 24,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_HANJA: 25,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_KANJI: 25,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_CONVERT: 28,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_NONCONVERT: 29,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_ACCEPT: 30,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_MODECHANGE: 31,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_SELECT: 41,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_PRINT: 42,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_EXECUTE: 43,
        /** Linux support for this keycode was added in Gecko 4.0.	 */
        VK_SLEEP: 95
    };
    /**
	 * @namespace
	 * Contains text tokenization and breaking routines
	 */
    ROT.Text = {
        RE_COLORS: /%([bc]){([^}]*)}/g,

        /* token types */
        TYPE_TEXT:		0,
        TYPE_NEWLINE:	1,
        TYPE_FG:		2,
        TYPE_BG:		3,

        /**
		 * Measure size of a resulting text block
		 */
        measure: function(str, maxWidth) {
            var result = {width:0, height:1};
            var tokens = this.tokenize(str, maxWidth);
            var lineWidth = 0;

            for (var i=0;i<tokens.length;i++) {
                var token = tokens[i];
                switch (token.type) {
                case this.TYPE_TEXT:
                    lineWidth += token.value.length;
                    break;

                case this.TYPE_NEWLINE:
                    result.height++;
                    result.width = Math.max(result.width, lineWidth);
                    lineWidth = 0;
                    break;
                }
            }
            result.width = Math.max(result.width, lineWidth);

            return result;
        },

        /**
		 * Convert string to a series of a formatting commands
		 */
        tokenize: function(str, maxWidth) {
            var result = [];

            /* first tokenization pass - split texts and color formatting commands */
            var offset = 0;
            str.replace(this.RE_COLORS, function(match, type, name, index) {
                /* string before */
                var part = str.substring(offset, index);
                if (part.length) {
                    result.push({
                        type: ROT.Text.TYPE_TEXT,
                        value: part
                    });
                }

                /* color command */
                result.push({
                    type: (type == "c" ? ROT.Text.TYPE_FG : ROT.Text.TYPE_BG),
                    value: name.trim()
                });

                offset = index + match.length;
                return "";
            });

            /* last remaining part */
            var part = str.substring(offset);
            if (part.length) {
                result.push({
                    type: ROT.Text.TYPE_TEXT,
                    value: part
                });
            }

            return this._breakLines(result, maxWidth);
        },

        /* insert line breaks into first-pass tokenized data */
        _breakLines: function(tokens, maxWidth) {
            if (!maxWidth) { maxWidth = Infinity; }

            var i = 0;
            var lineLength = 0;
            var lastTokenWithSpace = -1;

            while (i < tokens.length) { /* take all text tokens, remove space, apply linebreaks */
                var token = tokens[i];
                if (token.type == ROT.Text.TYPE_NEWLINE) { /* reset */
                    lineLength = 0;
                    lastTokenWithSpace = -1;
                }
                if (token.type != ROT.Text.TYPE_TEXT) { /* skip non-text tokens */
                    i++;
                    continue;
                }

                /* remove spaces at the beginning of line */
                while (lineLength == 0 && token.value.charAt(0) == " ") { token.value = token.value.substring(1); }

                /* forced newline? insert two new tokens after this one */
                var index = token.value.indexOf("\n");
                if (index != -1) {
                    token.value = this._breakInsideToken(tokens, i, index, true);

                    /* if there are spaces at the end, we must remove them (we do not want the line too long) */
                    var arr = token.value.split("");
                    while (arr.length && arr[arr.length-1] == " ") { arr.pop(); }
                    token.value = arr.join("");
                }

                /* token degenerated? */
                if (!token.value.length) {
                    tokens.splice(i, 1);
                    continue;
                }

                if (lineLength + token.value.length > maxWidth) { /* line too long, find a suitable breaking spot */

                    /* is it possible to break within this token? */
                    var index = -1;
                    while (1) {
                        var nextIndex = token.value.indexOf(" ", index+1);
                        if (nextIndex == -1) { break; }
                        if (lineLength + nextIndex > maxWidth) { break; }
                        index = nextIndex;
                    }

                    if (index != -1) { /* break at space within this one */
                        token.value = this._breakInsideToken(tokens, i, index, true);
                    } else if (lastTokenWithSpace != -1) { /* is there a previous token where a break can occur? */
                        var token = tokens[lastTokenWithSpace];
                        var breakIndex = token.value.lastIndexOf(" ");
                        token.value = this._breakInsideToken(tokens, lastTokenWithSpace, breakIndex, true);
                        i = lastTokenWithSpace;
                    } else { /* force break in this token */
                        token.value = this._breakInsideToken(tokens, i, maxWidth-lineLength, false);
                    }

                } else { /* line not long, continue */
                    lineLength += token.value.length;
                    if (token.value.indexOf(" ") != -1) { lastTokenWithSpace = i; }
                }

                i++; /* advance to next token */
            }

            tokens.push({type: ROT.Text.TYPE_NEWLINE}); /* insert fake newline to fix the last text line */

            /* remove trailing space from text tokens before newlines */
            var lastTextToken = null;
            for (var i=0;i<tokens.length;i++) {
                var token = tokens[i];
                switch (token.type) {
                case ROT.Text.TYPE_TEXT: lastTextToken = token; break;
                case ROT.Text.TYPE_NEWLINE:
                    if (lastTextToken) { /* remove trailing space */
                        var arr = lastTextToken.value.split("");
                        while (arr.length && arr[arr.length-1] == " ") { arr.pop(); }
                        lastTextToken.value = arr.join("");
                    }
                    lastTextToken = null;
                    break;
                }
            }

            tokens.pop(); /* remove fake token */

            return tokens;
        },

        /**
		 * Create new tokens and insert them into the stream
		 * @param {object[]} tokens
		 * @param {int} tokenIndex Token being processed
		 * @param {int} breakIndex Index within current token's value
		 * @param {bool} removeBreakChar Do we want to remove the breaking character?
		 * @returns {string} remaining unbroken token value
		 */
        _breakInsideToken: function(tokens, tokenIndex, breakIndex, removeBreakChar) {
            var newBreakToken = {
                type: ROT.Text.TYPE_NEWLINE
            };
            var newTextToken = {
                type: ROT.Text.TYPE_TEXT,
                value: tokens[tokenIndex].value.substring(breakIndex + (removeBreakChar ? 1 : 0))
            };
            tokens.splice(tokenIndex+1, 0, newBreakToken, newTextToken);
            return tokens[tokenIndex].value.substring(0, breakIndex);
        }
    };
    /**
	 * @returns {any} Randomly picked item, null when length=0
	 */
    Array.prototype.random = Array.prototype.random || function() {
        if (!this.length) { return null; }
        return this[Math.floor(ROT.RNG.getUniform() * this.length)];
    };

    /**
	 * @returns {array} New array with randomized items
	 */
    Array.prototype.randomize = Array.prototype.randomize || function() {
	  var result = [];
	  var clone = this.slice();
	  while (clone.length) {
	    var index = clone.indexOf(clone.random());
	    result.push(clone.splice(index, 1)[0]);
	  }
	  return result;
    };
    /**
	 * Always positive modulus
	 * @param {int} n Modulus
	 * @returns {int} this modulo n
	 */
    Number.prototype.mod = Number.prototype.mod || function(n) {
        return ((this%n)+n)%n;
    };
    /**
	 * @returns {string} First letter capitalized
	 */
    String.prototype.capitalize = String.prototype.capitalize || function() {
        return this.charAt(0).toUpperCase() + this.substring(1);
    };

    /**
	 * Left pad
	 * @param {string} [character="0"]
	 * @param {int} [count=2]
	 */
    String.prototype.lpad = String.prototype.lpad || function(character, count) {
        var ch = character || "0";
        var cnt = count || 2;

        var s = "";
        while (s.length < (cnt - this.length)) { s += ch; }
        s = s.substring(0, cnt-this.length);
        return s+this;
    };

    /**
	 * Right pad
	 * @param {string} [character="0"]
	 * @param {int} [count=2]
	 */
    String.prototype.rpad = String.prototype.rpad || function(character, count) {
        var ch = character || "0";
        var cnt = count || 2;

        var s = "";
        while (s.length < (cnt - this.length)) { s += ch; }
        s = s.substring(0, cnt-this.length);
        return this+s;
    };

    /**
	 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
	 * @param {string} template
	 * @param {any} [argv]
	 */
    String.format = String.format || function(template) {
        var map = String.format.map;
        var args = Array.prototype.slice.call(arguments, 1);

        var replacer = function(match, group1, group2, index) {
            if (template.charAt(index-1) == "%") { return match.substring(1); }
            if (!args.length) { return match; }
            var obj = args[0];

            var group = group1 || group2;
            var parts = group.split(",");
            var name = parts.shift();
            var method = map[name.toLowerCase()];
            if (!method) { return match; }

            var obj = args.shift();
            var replaced = obj[method].apply(obj, parts);

            var first = name.charAt(0);
            if (first != first.toLowerCase()) { replaced = replaced.capitalize(); }

            return replaced;
        };
        return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
    };

    String.format.map = String.format.map || {
        "s": "toString"
    };

    /**
	 * Convenience shortcut to String.format(this)
	 */
    String.prototype.format = String.prototype.format || function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this);
        return String.format.apply(String, args);
    };

    if (!Object.create) {
        /**
		 * ES5 Object.create
		 */
        Object.create = function(o) {
            var tmp = function() {};
            tmp.prototype = o;
            return new tmp();
        };
    }
    /**
	 * Sets prototype of this function to an instance of parent function
	 * @param {function} parent
	 */
    Function.prototype.extend = Function.prototype.extend || function(parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
        return this;
    };
    if (typeof window != "undefined") {
        window.requestAnimationFrame =
			window.requestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame
			|| function(cb) { return setTimeout(cb, 1000/60); };

        window.cancelAnimationFrame =
			window.cancelAnimationFrame
			|| window.mozCancelAnimationFrame
			|| window.webkitCancelAnimationFrame
			|| window.oCancelAnimationFrame
			|| window.msCancelAnimationFrame
			|| function(id) { return clearTimeout(id); };
    }
    /**
	 * @class Visual map display
	 * @param {object} [options]
	 * @param {int} [options.width=ROT.DEFAULT_WIDTH]
	 * @param {int} [options.height=ROT.DEFAULT_HEIGHT]
	 * @param {int} [options.fontSize=15]
	 * @param {string} [options.fontFamily="monospace"]
	 * @param {string} [options.fontStyle=""] bold/italic/none/both
	 * @param {string} [options.fg="#ccc"]
	 * @param {string} [options.bg="#000"]
	 * @param {float} [options.spacing=1]
	 * @param {float} [options.border=0]
	 * @param {string} [options.layout="rect"]
	 * @param {bool} [options.forceSquareRatio=false]
	 * @param {int} [options.tileWidth=32]
	 * @param {int} [options.tileHeight=32]
	 * @param {object} [options.tileMap={}]
	 * @param {image} [options.tileSet=null]
	 * @param {image} [options.tileColorize=false]
	 */
    ROT.Display = function(options) {
        var canvas = document.createElement("canvas");
        this._context = canvas.getContext("2d");
        this._data = {};
        this._dirty = false; /* false = nothing, true = all, object = dirty cells */
        this._options = {};
        this._backend = null;

        var defaultOptions = {
            width: ROT.DEFAULT_WIDTH,
            height: ROT.DEFAULT_HEIGHT,
            transpose: false,
            layout: "rect",
            fontSize: 15,
            spacing: 1,
            border: 0,
            forceSquareRatio: false,
            fontFamily: "monospace",
            fontStyle: "",
            fg: "#ccc",
            bg: "#000",
            tileWidth: 32,
            tileHeight: 32,
            tileMap: {},
            tileSet: null,
            tileColorize: false,
            termColor: "xterm"
        };
        for (var p in options) { defaultOptions[p] = options[p]; }
        this.setOptions(defaultOptions);
        this.DEBUG = this.DEBUG.bind(this);

        this._tick = this._tick.bind(this);
        requestAnimationFrame(this._tick);
    };

    /**
	 * Debug helper, ideal as a map generator callback. Always bound to this.
	 * @param {int} x
	 * @param {int} y
	 * @param {int} what
	 */
    ROT.Display.prototype.DEBUG = function(x, y, what) {
        var colors = [this._options.bg, this._options.fg];
        this.draw(x, y, null, null, colors[what % colors.length]);
    };

    /**
	 * Clear the whole display (cover it with background color)
	 */
    ROT.Display.prototype.clear = function() {
        this._data = {};
        this._dirty = true;
    };

    /**
	 * @see ROT.Display
	 */
    ROT.Display.prototype.setOptions = function(options) {
        for (var p in options) { this._options[p] = options[p]; }
        if (options.width || options.height || options.fontSize || options.fontFamily || options.spacing || options.layout) {
            if (options.layout) {
                this._backend = new ROT.Display[options.layout.capitalize()](this._context);
            }

            var font = (this._options.fontStyle ? this._options.fontStyle + " " : "") + this._options.fontSize + "px " + this._options.fontFamily;
            this._context.font = font;
            this._backend.compute(this._options);
            this._context.font = font;
            this._context.textAlign = "center";
            this._context.textBaseline = "middle";
            this._dirty = true;
        }
        return this;
    };

    /**
	 * Returns currently set options
	 * @returns {object} Current options object
	 */
    ROT.Display.prototype.getOptions = function() {
        return this._options;
    };

    /**
	 * Returns the DOM node of this display
	 * @returns {node} DOM node
	 */
    ROT.Display.prototype.getContainer = function() {
        return this._context.canvas;
    };

    /**
	 * Compute the maximum width/height to fit into a set of given constraints
	 * @param {int} availWidth Maximum allowed pixel width
	 * @param {int} availHeight Maximum allowed pixel height
	 * @returns {int[2]} cellWidth,cellHeight
	 */
    ROT.Display.prototype.computeSize = function(availWidth, availHeight) {
        return this._backend.computeSize(availWidth, availHeight, this._options);
    };

    /**
	 * Compute the maximum font size to fit into a set of given constraints
	 * @param {int} availWidth Maximum allowed pixel width
	 * @param {int} availHeight Maximum allowed pixel height
	 * @returns {int} fontSize
	 */
    ROT.Display.prototype.computeFontSize = function(availWidth, availHeight) {
        return this._backend.computeFontSize(availWidth, availHeight, this._options);
    };

    /**
	 * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
	 * @param {Event} e event
	 * @returns {int[2]} -1 for values outside of the canvas
	 */
    ROT.Display.prototype.eventToPosition = function(e) {
        if (e.touches) {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
        } else {
            var x = e.clientX;
            var y = e.clientY;
        }

        var rect = this._context.canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;

        x *= this._context.canvas.width / this._context.canvas.clientWidth;
        y *= this._context.canvas.height / this._context.canvas.clientHeight;

        if (x < 0 || y < 0 || x >= this._context.canvas.width || y >= this._context.canvas.height) { return [-1, -1]; }

        return this._backend.eventToPosition(x, y);
    };

    /**
	 * @param {int} x
	 * @param {int} y
	 * @param {string || string[]} ch One or more chars (will be overlapping themselves)
	 * @param {string} [fg] foreground color
	 * @param {string} [bg] background color
	 */
    ROT.Display.prototype.draw = function(x, y, ch, fg, bg) {
        if (!fg) { fg = this._options.fg; }
        if (!bg) { bg = this._options.bg; }
        this._data[x+","+y] = [x, y, ch, fg, bg];

        if (this._dirty === true) { return; } /* will already redraw everything */
        if (!this._dirty) { this._dirty = {}; } /* first! */
        this._dirty[x+","+y] = true;
    };

    /**
	 * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
	 * @param {int} x
	 * @param {int} y
	 * @param {string} text May contain color/background format specifiers, %c{name}/%b{name}, both optional. %c{}/%b{} resets to default.
	 * @param {int} [maxWidth] wrap at what width?
	 * @returns {int} lines drawn
	 */
    ROT.Display.prototype.drawText = function(x, y, text, maxWidth) {
        var fg = null;
        var bg = null;
        var cx = x;
        var cy = y;
        var lines = 1;
        if (!maxWidth) { maxWidth = this._options.width-x; }

        var tokens = ROT.Text.tokenize(text, maxWidth);

        while (tokens.length) { /* interpret tokenized opcode stream */
            var token = tokens.shift();
            switch (token.type) {
            case ROT.Text.TYPE_TEXT:
                var isSpace = false, isPrevSpace = false, isFullWidth = false, isPrevFullWidth = false;
                for (var i=0;i<token.value.length;i++) {
                    var cc = token.value.charCodeAt(i);
                    var c = token.value.charAt(i);
                    // Assign to `true` when the current char is full-width.
                    isFullWidth = (cc > 0xff00 && cc < 0xff61) || (cc > 0xffdc && cc < 0xffe8) || cc > 0xffee;
                    // Current char is space, whatever full-width or half-width both are OK.
                    isSpace = (c.charCodeAt(0) == 0x20 || c.charCodeAt(0) == 0x3000);
                    // The previous char is full-width and
                    // current char is nether half-width nor a space.
                    if (isPrevFullWidth && !isFullWidth && !isSpace) { cx++; } // add an extra position
                    // The current char is full-width and
                    // the previous char is not a space.
                    if(isFullWidth && !isPrevSpace) { cx++; } // add an extra position
                    this.draw(cx++, cy, c, fg, bg);
                    isPrevSpace = isSpace;
                    isPrevFullWidth = isFullWidth;
                }
                break;

            case ROT.Text.TYPE_FG:
                fg = token.value || null;
                break;

            case ROT.Text.TYPE_BG:
                bg = token.value || null;
                break;

            case ROT.Text.TYPE_NEWLINE:
                cx = x;
                cy++;
                lines++;
                break;
            }
        }

        return lines;
    };

    /**
	 * Timer tick: update dirty parts
	 */
    ROT.Display.prototype._tick = function() {
        requestAnimationFrame(this._tick);

        if (!this._dirty) { return; }

        if (this._dirty === true) { /* draw all */
            this._context.fillStyle = this._options.bg;
            this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);

            for (var id in this._data) { /* redraw cached data */
                this._draw(id, false);
            }

        } else { /* draw only dirty */
            for (var key in this._dirty) {
                this._draw(key, true);
            }
        }

        this._dirty = false;
    };

    /**
	 * @param {string} key What to draw
	 * @param {bool} clearBefore Is it necessary to clean before?
	 */
    ROT.Display.prototype._draw = function(key, clearBefore) {
        var data = this._data[key];
        if (data[4] != this._options.bg) { clearBefore = true; }

        this._backend.draw(data, clearBefore);
    };
    /**
	 * @class Abstract display backend module
	 * @private
	 */
    ROT.Display.Backend = function(context) {
        this._context = context;
    };

    ROT.Display.Backend.prototype.compute = function(options) {
    };

    ROT.Display.Backend.prototype.draw = function(data, clearBefore) {
    };

    ROT.Display.Backend.prototype.computeSize = function(availWidth, availHeight) {
    };

    ROT.Display.Backend.prototype.computeFontSize = function(availWidth, availHeight) {
    };

    ROT.Display.Backend.prototype.eventToPosition = function(x, y) {
    };
    /**
	 * @class Rectangular backend
	 * @private
	 */
    ROT.Display.Rect = function(context) {
        ROT.Display.Backend.call(this, context);

        this._spacingX = 0;
        this._spacingY = 0;
        this._canvasCache = {};
        this._options = {};
    };
    ROT.Display.Rect.extend(ROT.Display.Backend);

    ROT.Display.Rect.cache = false;

    ROT.Display.Rect.prototype.compute = function(options) {
        this._canvasCache = {};
        this._options = options;

        var charWidth = Math.ceil(this._context.measureText("▔").width);
        this._spacingX = Math.ceil(options.spacing * charWidth);
        this._spacingY = Math.ceil(options.spacing * options.fontSize);

        if (this._options.forceSquareRatio) {
            this._spacingX = this._spacingY = Math.max(this._spacingX, this._spacingY);
        }

        this._context.canvas.width = options.width * this._spacingX;
        this._context.canvas.height = options.height * this._spacingY;
    };

    ROT.Display.Rect.prototype.draw = function(data, clearBefore) {
        if (this.constructor.cache) {
            this._drawWithCache(data, clearBefore);
        } else {
            this._drawNoCache(data, clearBefore);
        }
    };

    ROT.Display.Rect.prototype._drawWithCache = function(data, clearBefore) {
        var x = data[0];
        var y = data[1];
        var ch = data[2];
        var fg = data[3];
        var bg = data[4];

        var hash = ""+ch+fg+bg;
        if (hash in this._canvasCache) {
            var canvas = this._canvasCache[hash];
        } else {
            var b = this._options.border;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = this._spacingX;
            canvas.height = this._spacingY;
            ctx.fillStyle = bg;
            ctx.fillRect(b, b, canvas.width-b, canvas.height-b);

            if (ch) {
                ctx.fillStyle = fg;
                ctx.font = this._context.font;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                var chars = [].concat(ch);
                for (var i=0;i<chars.length;i++) {
                    ctx.fillText(chars[i], this._spacingX/2, Math.ceil(this._spacingY/2));
                }
            }
            this._canvasCache[hash] = canvas;
        }

        this._context.drawImage(canvas, x*this._spacingX, y*this._spacingY);
    };

    ROT.Display.Rect.prototype._drawNoCache = function(data, clearBefore) {
        var x = data[0];
        var y = data[1];
        var ch = data[2];
        var fg = data[3];
        var bg = data[4];

        if (clearBefore) {
            var b = this._options.border;
            this._context.fillStyle = bg;
            this._context.fillRect(x*this._spacingX + b, y*this._spacingY + b, this._spacingX - b, this._spacingY - b);
        }

        if (!ch) { return; }

        this._context.fillStyle = fg;

        var chars = [].concat(ch);
        for (var i=0;i<chars.length;i++) {
            this._context.fillText(chars[i], (x+0.5) * this._spacingX, Math.ceil((y+0.5) * this._spacingY));
        }
    };

    ROT.Display.Rect.prototype.computeSize = function(availWidth, availHeight) {
        var width = Math.floor(availWidth / this._spacingX);
        var height = Math.floor(availHeight / this._spacingY);
        return [width, height];
    };

    ROT.Display.Rect.prototype.computeFontSize = function(availWidth, availHeight) {
        var boxWidth = Math.floor(availWidth / this._options.width);
        var boxHeight = Math.floor(availHeight / this._options.height);

        /* compute char ratio */
        var oldFont = this._context.font;
        this._context.font = "100px " + this._options.fontFamily;
        var width = Math.ceil(this._context.measureText("▔").width);
        this._context.font = oldFont;
        var ratio = width / 100;

        var widthFraction = ratio * boxHeight / boxWidth;
        if (widthFraction > 1) { /* too wide with current aspect ratio */
            boxHeight = Math.floor(boxHeight / widthFraction);
        }
        return Math.floor(boxHeight / this._options.spacing);
    };

    ROT.Display.Rect.prototype.eventToPosition = function(x, y) {
        return [Math.floor(x/this._spacingX), Math.floor(y/this._spacingY)];
    };
    /**
	 * @class Hexagonal backend
	 * @private
	 */
    ROT.Display.Hex = function(context) {
        ROT.Display.Backend.call(this, context);

        this._spacingX = 0;
        this._spacingY = 0;
        this._hexSize = 0;
        this._options = {};
    };
    ROT.Display.Hex.extend(ROT.Display.Backend);

    ROT.Display.Hex.prototype.compute = function(options) {
        this._options = options;

        /* FIXME char size computation does not respect transposed hexes */
        var charWidth = Math.ceil(this._context.measureText("▔").width);
        this._hexSize = Math.floor(options.spacing * (options.fontSize + charWidth/Math.sqrt(3)) / 2);
        this._spacingX = this._hexSize * Math.sqrt(3) / 2;
        this._spacingY = this._hexSize * 1.5;

        if (options.transpose) {
            var xprop = "height";
            var yprop = "width";
        } else {
            var xprop = "width";
            var yprop = "height";
        }
        this._context.canvas[xprop] = Math.ceil( (options.width + 1) * this._spacingX );
        this._context.canvas[yprop] = Math.ceil( (options.height - 1) * this._spacingY + 2*this._hexSize );
    };

    ROT.Display.Hex.prototype.draw = function(data, clearBefore) {
        var x = data[0];
        var y = data[1];
        var ch = data[2];
        var fg = data[3];
        var bg = data[4];

        var px = [
            (x+1) * this._spacingX,
            y * this._spacingY + this._hexSize
        ];
        if (this._options.transpose) { px.reverse(); }

        if (clearBefore) {
            this._context.fillStyle = bg;
            this._fill(px[0], px[1]);
        }

        if (!ch) { return; }

        this._context.fillStyle = fg;

        var chars = [].concat(ch);
        for (var i=0;i<chars.length;i++) {
            this._context.fillText(chars[i], px[0], Math.ceil(px[1]));
        }
    };

    ROT.Display.Hex.prototype.computeSize = function(availWidth, availHeight) {
        if (this._options.transpose) {
            availWidth += availHeight;
            availHeight = availWidth - availHeight;
            availWidth -= availHeight;
        }

        var width = Math.floor(availWidth / this._spacingX) - 1;
        var height = Math.floor((availHeight - 2*this._hexSize) / this._spacingY + 1);
        return [width, height];
    };

    ROT.Display.Hex.prototype.computeFontSize = function(availWidth, availHeight) {
        if (this._options.transpose) {
            availWidth += availHeight;
            availHeight = availWidth - availHeight;
            availWidth -= availHeight;
        }

        var hexSizeWidth = 2*availWidth / ((this._options.width+1) * Math.sqrt(3)) - 1;
        var hexSizeHeight = availHeight / (2 + 1.5*(this._options.height-1));
        var hexSize = Math.min(hexSizeWidth, hexSizeHeight);

        /* compute char ratio */
        var oldFont = this._context.font;
        this._context.font = "100px " + this._options.fontFamily;
        var width = Math.ceil(this._context.measureText("▔").width);
        this._context.font = oldFont;
        var ratio = width / 100;

        hexSize = Math.floor(hexSize)+1; /* closest larger hexSize */

        /* FIXME char size computation does not respect transposed hexes */
        var fontSize = 2*hexSize / (this._options.spacing * (1 + ratio / Math.sqrt(3)));

        /* closest smaller fontSize */
        return Math.ceil(fontSize)-1;
    };

    ROT.Display.Hex.prototype.eventToPosition = function(x, y) {
        if (this._options.transpose) {
            x += y;
            y = x-y;
            x -= y;
            var nodeSize = this._context.canvas.width;
        } else {
            var nodeSize = this._context.canvas.height;
        }
        var size = nodeSize / this._options.height;
        y = Math.floor(y/size);

        if (y.mod(2)) { /* odd row */
            x -= this._spacingX;
            x = 1 + 2*Math.floor(x/(2*this._spacingX));
        } else {
            x = 2*Math.floor(x/(2*this._spacingX));
        }

        return [x, y];
    };

    /**
	 * Arguments are pixel values. If "transposed" mode is enabled, then these two are already swapped.
	 */
    ROT.Display.Hex.prototype._fill = function(cx, cy) {
        var a = this._hexSize;
        var b = this._options.border;

        this._context.beginPath();

        if (this._options.transpose) {
            this._context.moveTo(cx-a+b,	cy);
            this._context.lineTo(cx-a/2+b,	cy+this._spacingX-b);
            this._context.lineTo(cx+a/2-b,	cy+this._spacingX-b);
            this._context.lineTo(cx+a-b,	cy);
            this._context.lineTo(cx+a/2-b,	cy-this._spacingX+b);
            this._context.lineTo(cx-a/2+b,	cy-this._spacingX+b);
            this._context.lineTo(cx-a+b,	cy);
        } else {
            this._context.moveTo(cx,					cy-a+b);
            this._context.lineTo(cx+this._spacingX-b,	cy-a/2+b);
            this._context.lineTo(cx+this._spacingX-b,	cy+a/2-b);
            this._context.lineTo(cx,					cy+a-b);
            this._context.lineTo(cx-this._spacingX+b,	cy+a/2-b);
            this._context.lineTo(cx-this._spacingX+b,	cy-a/2+b);
            this._context.lineTo(cx,					cy-a+b);
        }
        this._context.fill();
    };
    /**
	 * @class Tile backend
	 * @private
	 */
    ROT.Display.Tile = function(context) {
        ROT.Display.Rect.call(this, context);

        this._options = {};
        this._colorCanvas = document.createElement("canvas");
    };
    ROT.Display.Tile.extend(ROT.Display.Rect);

    ROT.Display.Tile.prototype.compute = function(options) {
        this._options = options;
        this._context.canvas.width = options.width * options.tileWidth;
        this._context.canvas.height = options.height * options.tileHeight;
        this._colorCanvas.width = options.tileWidth;
        this._colorCanvas.height = options.tileHeight;
    };

    ROT.Display.Tile.prototype.draw = function(data, clearBefore) {
        var x = data[0];
        var y = data[1];
        var ch = data[2];
        var fg = data[3];
        var bg = data[4];

        var tileWidth = this._options.tileWidth;
        var tileHeight = this._options.tileHeight;

        if (clearBefore) {
            if (this._options.tileColorize) {
                this._context.clearRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
            } else {
                this._context.fillStyle = bg;
                this._context.fillRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
            }
        }

        if (!ch) { return; }

        var chars = [].concat(ch);
        for (var i=0;i<chars.length;i++) {
            var tile = this._options.tileMap[chars[i]];
            if (!tile) { throw new Error("Char '" + chars[i] + "' not found in tileMap"); }

            if (this._options.tileColorize) { /* apply colorization */
                var canvas = this._colorCanvas;
                var context = canvas.getContext("2d");
                context.clearRect(0, 0, tileWidth, tileHeight);

                context.drawImage(
                    this._options.tileSet,
                    tile[0], tile[1], tileWidth, tileHeight,
                    0, 0, tileWidth, tileHeight
                );

                if (fg != "transparent") {
                    context.fillStyle = fg;
                    context.globalCompositeOperation = "source-atop";
                    context.fillRect(0, 0, tileWidth, tileHeight);
                }

                if (bg != "transparent") {
                    context.fillStyle = bg;
                    context.globalCompositeOperation = "destination-over";
                    context.fillRect(0, 0, tileWidth, tileHeight);
                }

                this._context.drawImage(canvas, x*tileWidth, y*tileHeight, tileWidth, tileHeight);

            } else { /* no colorizing, easy */
                this._context.drawImage(
                    this._options.tileSet,
                    tile[0], tile[1], tileWidth, tileHeight,
                    x*tileWidth, y*tileHeight, tileWidth, tileHeight
                );
            }
        }
    };

    ROT.Display.Tile.prototype.computeSize = function(availWidth, availHeight) {
        var width = Math.floor(availWidth / this._options.tileWidth);
        var height = Math.floor(availHeight / this._options.tileHeight);
        return [width, height];
    };

    ROT.Display.Tile.prototype.computeFontSize = function(availWidth, availHeight) {
        var width = Math.floor(availWidth / this._options.width);
        var height = Math.floor(availHeight / this._options.height);
        return [width, height];
    };

    ROT.Display.Tile.prototype.eventToPosition = function(x, y) {
        return [Math.floor(x/this._options.tileWidth), Math.floor(y/this._options.tileHeight)];
    };
    /**
	 * @namespace
	 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
	 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
	 */
    ROT.RNG = {
        /**
		 * @returns {number}
		 */
        getSeed: function() {
            return this._seed;
        },

        /**
		 * @param {number} seed Seed the number generator
		 */
        setSeed: function(seed) {
            seed = (seed < 1 ? 1/seed : seed);

            this._seed = seed;
            this._s0 = (seed >>> 0) * this._frac;

            seed = (seed*69069 + 1) >>> 0;
            this._s1 = seed * this._frac;

            seed = (seed*69069 + 1) >>> 0;
            this._s2 = seed * this._frac;

            this._c = 1;
            return this;
        },

        /**
		 * @returns {float} Pseudorandom value [0,1), uniformly distributed
		 */
        getUniform: function() {
            var t = 2091639 * this._s0 + this._c * this._frac;
            this._s0 = this._s1;
            this._s1 = this._s2;
            this._c = t | 0;
            this._s2 = t - this._c;
            return this._s2;
        },

        /**
		 * @param {int} lowerBound The lower end of the range to return a value from, inclusive
		 * @param {int} upperBound The upper end of the range to return a value from, inclusive
		 * @returns {int} Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
		 */
        getUniformInt: function(lowerBound, upperBound) {
            var max = Math.max(lowerBound, upperBound);
            var min = Math.min(lowerBound, upperBound);
            return Math.floor(this.getUniform() * (max - min + 1)) + min;
        },

        /**
		 * @param {float} [mean=0] Mean value
		 * @param {float} [stddev=1] Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
		 * @returns {float} A normally distributed pseudorandom value
		 */
        getNormal: function(mean, stddev) {
            do {
                var u = 2*this.getUniform()-1;
                var v = 2*this.getUniform()-1;
                var r = u*u + v*v;
            } while (r > 1 || r == 0);

            var gauss = u * Math.sqrt(-2*Math.log(r)/r);
            return (mean || 0) + gauss*(stddev || 1);
        },

        /**
		 * @returns {int} Pseudorandom value [1,100] inclusive, uniformly distributed
		 */
        getPercentage: function() {
            return 1 + Math.floor(this.getUniform()*100);
        },

        /**
		 * @param {object} data key=whatever, value=weight (relative probability)
		 * @returns {string} whatever
		 */
        getWeightedValue: function(data) {
            var total = 0;

            for (var id in data) {
                total += data[id];
            }
            var random = this.getUniform()*total;

            var part = 0;
            for (var id in data) {
                part += data[id];
                if (random < part) { return id; }
            }

            // If by some floating-point annoyance we have
            // random >= total, just return the last id.
            return id;
        },

        /**
		 * Get RNG state. Useful for storing the state and re-setting it via setState.
		 * @returns {?} Internal state
		 */
        getState: function() {
            return [this._s0, this._s1, this._s2, this._c];
        },

        /**
		 * Set a previously retrieved state.
		 * @param {?} state
		 */
        setState: function(state) {
            this._s0 = state[0];
            this._s1 = state[1];
            this._s2 = state[2];
            this._c  = state[3];
            return this;
        },

        /**
		 * Returns a cloned RNG
		 */
        clone: function() {
            var clone = Object.create(this);
            clone.setState(this.getState());
            return clone;
        },

        _s0: 0,
        _s1: 0,
        _s2: 0,
        _c: 0,
        _frac: 2.3283064365386963e-10 /* 2^-32 */
    };

    ROT.RNG.setSeed(Date.now());
    /**
	 * @class (Markov process)-based string generator.
	 * Copied from a <a href="http://www.roguebasin.roguelikedevelopment.org/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme">RogueBasin article</a>.
	 * Offers configurable order and prior.
	 * @param {object} [options]
	 * @param {bool} [options.words=false] Use word mode?
	 * @param {int} [options.order=3]
	 * @param {float} [options.prior=0.001]
	 */
    ROT.StringGenerator = function(options) {
        this._options = {
            words: false,
            order: 3,
            prior: 0.001
        };
        for (var p in options) { this._options[p] = options[p]; }

        this._boundary = String.fromCharCode(0);
        this._suffix = this._boundary;
        this._prefix = [];
        for (var i=0;i<this._options.order;i++) { this._prefix.push(this._boundary); }

        this._priorValues = {};
        this._priorValues[this._boundary] = this._options.prior;

        this._data = {};
    };

    /**
	 * Remove all learning data
	 */
    ROT.StringGenerator.prototype.clear = function() {
        this._data = {};
        this._priorValues = {};
    };

    /**
	 * @returns {string} Generated string
	 */
    ROT.StringGenerator.prototype.generate = function() {
        var result = [this._sample(this._prefix)];
        while (result[result.length-1] != this._boundary) {
            result.push(this._sample(result));
        }
        return this._join(result.slice(0, -1));
    };

    /**
	 * Observe (learn) a string from a training set
	 */
    ROT.StringGenerator.prototype.observe = function(string) {
        var tokens = this._split(string);

        for (var i=0; i<tokens.length; i++) {
            this._priorValues[tokens[i]] = this._options.prior;
        }

        tokens = this._prefix.concat(tokens).concat(this._suffix); /* add boundary symbols */

        for (var i=this._options.order; i<tokens.length; i++) {
            var context = tokens.slice(i-this._options.order, i);
            var event = tokens[i];
            for (var j=0; j<context.length; j++) {
                var subcontext = context.slice(j);
                this._observeEvent(subcontext, event);
            }
        }
    };

    ROT.StringGenerator.prototype.getStats = function() {
        var parts = [];

        var priorCount = 0;
        for (var p in this._priorValues) { priorCount++; }
        priorCount--; /* boundary */
        parts.push("distinct samples: " + priorCount);

        var dataCount = 0;
        var eventCount = 0;
        for (var p in this._data) {
            dataCount++;
            for (var key in this._data[p]) {
                eventCount++;
            }
        }
        parts.push("dictionary size (contexts): " + dataCount);
        parts.push("dictionary size (events): " + eventCount);

        return parts.join(", ");
    };

    /**
	 * @param {string}
	 * @returns {string[]}
	 */
    ROT.StringGenerator.prototype._split = function(str) {
        return str.split(this._options.words ? /\s+/ : "");
    };

    /**
	 * @param {string[]}
	 * @returns {string}
	 */
    ROT.StringGenerator.prototype._join = function(arr) {
        return arr.join(this._options.words ? " " : "");
    };

    /**
	 * @param {string[]} context
	 * @param {string} event
	 */
    ROT.StringGenerator.prototype._observeEvent = function(context, event) {
        var key = this._join(context);
        if (!(key in this._data)) { this._data[key] = {}; }
        var data = this._data[key];

        if (!(event in data)) { data[event] = 0; }
        data[event]++;
    };

    /**
	 * @param {string[]}
	 * @returns {string}
	 */
    ROT.StringGenerator.prototype._sample = function(context) {
        context = this._backoff(context);
        var key = this._join(context);
        var data = this._data[key];

        var available = {};

        if (this._options.prior) {
            for (var event in this._priorValues) { available[event] = this._priorValues[event]; }
            for (var event in data) { available[event] += data[event]; }
        } else {
            available = data;
        }

        return ROT.RNG.getWeightedValue(available);
    };

    /**
	 * @param {string[]}
	 * @returns {string[]}
	 */
    ROT.StringGenerator.prototype._backoff = function(context) {
        if (context.length > this._options.order) {
            context = context.slice(-this._options.order);
        } else if (context.length < this._options.order) {
            context = this._prefix.slice(0, this._options.order - context.length).concat(context);
        }

        while (!(this._join(context) in this._data) && context.length > 0) { context = context.slice(1); }

        return context;
    };
    /**
	 * @class Generic event queue: stores events and retrieves them based on their time
	 */
    ROT.EventQueue = function() {
        this._time = 0;
        this._events = [];
        this._eventTimes = [];
    };

    /**
	 * @returns {number} Elapsed time
	 */
    ROT.EventQueue.prototype.getTime = function() {
        return this._time;
    };

    /**
	 * Clear all scheduled events
	 */
    ROT.EventQueue.prototype.clear = function() {
        this._events = [];
        this._eventTimes = [];
        return this;
    };

    /**
	 * @param {?} event
	 * @param {number} time
	 */
    ROT.EventQueue.prototype.add = function(event, time) {
        var index = this._events.length;
        for (var i=0;i<this._eventTimes.length;i++) {
            if (this._eventTimes[i] > time) {
                index = i;
                break;
            }
        }

        this._events.splice(index, 0, event);
        this._eventTimes.splice(index, 0, time);
    };

    /**
	 * Locates the nearest event, advances time if necessary. Returns that event and removes it from the queue.
	 * @returns {? || null} The event previously added by addEvent, null if no event available
	 */
    ROT.EventQueue.prototype.get = function() {
        if (!this._events.length) { return null; }

        var time = this._eventTimes.splice(0, 1)[0];
        if (time > 0) { /* advance */
            this._time += time;
            for (var i=0;i<this._eventTimes.length;i++) { this._eventTimes[i] -= time; }
        }

        return this._events.splice(0, 1)[0];
    };

    /**
	 * Get the time associated with the given event
	 * @param {?} event
	 * @returns {number} time
	 */
    ROT.EventQueue.prototype.getEventTime = function(event) {
        var index = this._events.indexOf(event);
        if (index == -1) { return undefined }
        return this._eventTimes[index];
    };

    /**
	 * Remove an event from the queue
	 * @param {?} event
	 * @returns {bool} success?
	 */
    ROT.EventQueue.prototype.remove = function(event) {
        var index = this._events.indexOf(event);
        if (index == -1) { return false }
        this._remove(index);
        return true;
    };

    /**
	 * Remove an event from the queue
	 * @param {int} index
	 */
    ROT.EventQueue.prototype._remove = function(index) {
        this._events.splice(index, 1);
        this._eventTimes.splice(index, 1);
    };
    /**
	 * @class Abstract scheduler
	 */
    ROT.Scheduler = function() {
        this._queue = new ROT.EventQueue();
        this._repeat = [];
        this._current = null;
    };

    /**
	 * @see ROT.EventQueue#getTime
	 */
    ROT.Scheduler.prototype.getTime = function() {
        return this._queue.getTime();
    };

    /**
	 * @param {?} item
	 * @param {bool} repeat
	 */
    ROT.Scheduler.prototype.add = function(item, repeat) {
        if (repeat) { this._repeat.push(item); }
        return this;
    };

    /**
	 * Get the time the given item is scheduled for
	 * @param {?} item
	 * @returns {number} time
	 */
    ROT.Scheduler.prototype.getTimeOf = function(item) {
        return this._queue.getEventTime(item);
    };

    /**
	 * Clear all items
	 */
    ROT.Scheduler.prototype.clear = function() {
        this._queue.clear();
        this._repeat = [];
        this._current = null;
        return this;
    };

    /**
	 * Remove a previously added item
	 * @param {?} item
	 * @returns {bool} successful?
	 */
    ROT.Scheduler.prototype.remove = function(item) {
        var result = this._queue.remove(item);

        var index = this._repeat.indexOf(item);
        if (index != -1) { this._repeat.splice(index, 1); }

        if (this._current == item) { this._current = null; }

        return result;
    };

    /**
	 * Schedule next item
	 * @returns {?}
	 */
    ROT.Scheduler.prototype.next = function() {
        this._current = this._queue.get();
        return this._current;
    };
    /**
	 * @class Simple fair scheduler (round-robin style)
	 * @augments ROT.Scheduler
	 */
    ROT.Scheduler.Simple = function() {
        ROT.Scheduler.call(this);
    };
    ROT.Scheduler.Simple.extend(ROT.Scheduler);

    /**
	 * @see ROT.Scheduler#add
	 */
    ROT.Scheduler.Simple.prototype.add = function(item, repeat) {
        this._queue.add(item, 0);
        return ROT.Scheduler.prototype.add.call(this, item, repeat);
    };

    /**
	 * @see ROT.Scheduler#next
	 */
    ROT.Scheduler.Simple.prototype.next = function() {
        if (this._current && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, 0);
        }
        return ROT.Scheduler.prototype.next.call(this);
    };
    /**
	 * @class Speed-based scheduler
	 * @augments ROT.Scheduler
	 */
    ROT.Scheduler.Speed = function() {
        ROT.Scheduler.call(this);
    };
    ROT.Scheduler.Speed.extend(ROT.Scheduler);

    /**
	 * @param {object} item anything with "getSpeed" method
	 * @param {bool} repeat
	 * @param {number} [time=1/item.getSpeed()]
	 * @see ROT.Scheduler#add
	 */
    ROT.Scheduler.Speed.prototype.add = function(item, repeat, time) {
        this._queue.add(item, time !== undefined ? time : 1/item.getSpeed());
        return ROT.Scheduler.prototype.add.call(this, item, repeat);
    };

    /**
	 * @see ROT.Scheduler#next
	 */
    ROT.Scheduler.Speed.prototype.next = function() {
        if (this._current && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, 1/this._current.getSpeed());
        }
        return ROT.Scheduler.prototype.next.call(this);
    };
    /**
	 * @class Action-based scheduler
	 * @augments ROT.Scheduler
	 */
    ROT.Scheduler.Action = function() {
        ROT.Scheduler.call(this);
        this._defaultDuration = 1; /* for newly added */
        this._duration = this._defaultDuration; /* for this._current */
    };
    ROT.Scheduler.Action.extend(ROT.Scheduler);

    /**
	 * @param {object} item
	 * @param {bool} repeat
	 * @param {number} [time=1]
	 * @see ROT.Scheduler#add
	 */
    ROT.Scheduler.Action.prototype.add = function(item, repeat, time) {
        this._queue.add(item, time || this._defaultDuration);
        return ROT.Scheduler.prototype.add.call(this, item, repeat);
    };

    ROT.Scheduler.Action.prototype.clear = function() {
        this._duration = this._defaultDuration;
        return ROT.Scheduler.prototype.clear.call(this);
    };

    ROT.Scheduler.Action.prototype.remove = function(item) {
        if (item == this._current) { this._duration = this._defaultDuration; }
        return ROT.Scheduler.prototype.remove.call(this, item);
    };

    /**
	 * @see ROT.Scheduler#next
	 */
    ROT.Scheduler.Action.prototype.next = function() {
        if (this._current && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, this._duration || this._defaultDuration);
            this._duration = this._defaultDuration;
        }
        return ROT.Scheduler.prototype.next.call(this);
    };

    /**
	 * Set duration for the active item
	 */
    ROT.Scheduler.Action.prototype.setDuration = function(time) {
        if (this._current) { this._duration = time; }
        return this;
    };
    /**
	 * @class Asynchronous main loop
	 * @param {ROT.Scheduler} scheduler
	 */
    ROT.Engine = function(scheduler) {
        this._scheduler = scheduler;
        this._lock = 1;
    };

    /**
	 * Start the main loop. When this call returns, the loop is locked.
	 */
    ROT.Engine.prototype.start = function() {
        return this.unlock();
    };

    /**
	 * Interrupt the engine by an asynchronous action
	 */
    ROT.Engine.prototype.lock = function() {
        this._lock++;
        return this;
    };

    /**
	 * Resume execution (paused by a previous lock)
	 */
    ROT.Engine.prototype.unlock = function() {
        if (!this._lock) { throw new Error("Cannot unlock unlocked engine"); }
        this._lock--;

        while (!this._lock) {
            var actor = this._scheduler.next();
            if (!actor) { return this.lock(); } /* no actors */
            var result = actor.act();
            if (result && result.then) { /* actor returned a "thenable", looks like a Promise */
                this.lock();
                result.then(this.unlock.bind(this));
            }
        }

        return this;
    };
    /**
	 * @class Base map generator
	 * @param {int} [width=ROT.DEFAULT_WIDTH]
	 * @param {int} [height=ROT.DEFAULT_HEIGHT]
	 */
    ROT.Map = function(width, height) {
        this._width = width || ROT.DEFAULT_WIDTH;
        this._height = height || ROT.DEFAULT_HEIGHT;
    };

    ROT.Map.prototype.create = function(callback) {};

    ROT.Map.prototype._fillMap = function(value) {
        var map = [];
        for (var i=0;i<this._width;i++) {
            map.push([]);
            for (var j=0;j<this._height;j++) { map[i].push(value); }
        }
        return map;
    };
    /**
	 * @class Simple empty rectangular room
	 * @augments ROT.Map
	 */
    ROT.Map.Arena = function(width, height) {
        ROT.Map.call(this, width, height);
    };
    ROT.Map.Arena.extend(ROT.Map);

    ROT.Map.Arena.prototype.create = function(callback) {
        var w = this._width-1;
        var h = this._height-1;
        for (var i=0;i<=w;i++) {
            for (var j=0;j<=h;j++) {
                var empty = (i && j && i<w && j<h);
                callback(i, j, empty ? 0 : 1);
            }
        }
        return this;
    };
    /**
	 * @class Recursively divided maze, http://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
	 * @augments ROT.Map
	 */
    ROT.Map.DividedMaze = function(width, height) {
        ROT.Map.call(this, width, height);
        this._stack = [];
    };
    ROT.Map.DividedMaze.extend(ROT.Map);

    ROT.Map.DividedMaze.prototype.create = function(callback) {
        var w = this._width;
        var h = this._height;

        this._map = [];

        for (var i=0;i<w;i++) {
            this._map.push([]);
            for (var j=0;j<h;j++) {
                var border = (i == 0 || j == 0 || i+1 == w || j+1 == h);
                this._map[i].push(border ? 1 : 0);
            }
        }

        this._stack = [
            [1, 1, w-2, h-2]
        ];
        this._process();

        for (var i=0;i<w;i++) {
            for (var j=0;j<h;j++) {
                callback(i, j, this._map[i][j]);
            }
        }
        this._map = null;
        return this;
    };

    ROT.Map.DividedMaze.prototype._process = function() {
        while (this._stack.length) {
            var room = this._stack.shift(); /* [left, top, right, bottom] */
            this._partitionRoom(room);
        }
    };

    ROT.Map.DividedMaze.prototype._partitionRoom = function(room) {
        var availX = [];
        var availY = [];

        for (var i=room[0]+1;i<room[2];i++) {
            var top = this._map[i][room[1]-1];
            var bottom = this._map[i][room[3]+1];
            if (top && bottom && !(i % 2)) { availX.push(i); }
        }

        for (var j=room[1]+1;j<room[3];j++) {
            var left = this._map[room[0]-1][j];
            var right = this._map[room[2]+1][j];
            if (left && right && !(j % 2)) { availY.push(j); }
        }

        if (!availX.length || !availY.length) { return; }

        var x = availX.random();
        var y = availY.random();

        this._map[x][y] = 1;

        var walls = [];

        var w = []; walls.push(w); /* left part */
        for (var i=room[0]; i<x; i++) {
            this._map[i][y] = 1;
            w.push([i, y]);
        }

        var w = []; walls.push(w); /* right part */
        for (var i=x+1; i<=room[2]; i++) {
            this._map[i][y] = 1;
            w.push([i, y]);
        }

        var w = []; walls.push(w); /* top part */
        for (var j=room[1]; j<y; j++) {
            this._map[x][j] = 1;
            w.push([x, j]);
        }

        var w = []; walls.push(w); /* bottom part */
        for (var j=y+1; j<=room[3]; j++) {
            this._map[x][j] = 1;
            w.push([x, j]);
        }

        var solid = walls.random();
        for (var i=0;i<walls.length;i++) {
            var w = walls[i];
            if (w == solid) { continue; }

            var hole = w.random();
            this._map[hole[0]][hole[1]] = 0;
        }

        this._stack.push([room[0], room[1], x-1, y-1]); /* left top */
        this._stack.push([x+1, room[1], room[2], y-1]); /* right top */
        this._stack.push([room[0], y+1, x-1, room[3]]); /* left bottom */
        this._stack.push([x+1, y+1, room[2], room[3]]); /* right bottom */
    };
    /**
	 * @class Icey's Maze generator
	 * See http://www.roguebasin.roguelikedevelopment.org/index.php?title=Simple_maze for explanation
	 * @augments ROT.Map
	 */
    ROT.Map.IceyMaze = function(width, height, regularity) {
        ROT.Map.call(this, width, height);
        this._regularity = regularity || 0;
    };
    ROT.Map.IceyMaze.extend(ROT.Map);

    ROT.Map.IceyMaze.prototype.create = function(callback) {
        var width = this._width;
        var height = this._height;

        var map = this._fillMap(1);

        width -= (width % 2 ? 1 : 2);
        height -= (height % 2 ? 1 : 2);

        var cx = 0;
        var cy = 0;
        var nx = 0;
        var ny = 0;

        var done = 0;
        var blocked = false;
        var dirs = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        do {
            cx = 1 + 2*Math.floor(ROT.RNG.getUniform()*(width-1) / 2);
            cy = 1 + 2*Math.floor(ROT.RNG.getUniform()*(height-1) / 2);

            if (!done) { map[cx][cy] = 0; }

            if (!map[cx][cy]) {
                this._randomize(dirs);
                do {
                    if (Math.floor(ROT.RNG.getUniform()*(this._regularity+1)) == 0) { this._randomize(dirs); }
                    blocked = true;
                    for (var i=0;i<4;i++) {
                        nx = cx + dirs[i][0]*2;
                        ny = cy + dirs[i][1]*2;
                        if (this._isFree(map, nx, ny, width, height)) {
                            map[nx][ny] = 0;
                            map[cx + dirs[i][0]][cy + dirs[i][1]] = 0;

                            cx = nx;
                            cy = ny;
                            blocked = false;
                            done++;
                            break;
                        }
                    }
                } while (!blocked);
            }
        } while (done+1 < width*height/4);

        for (var i=0;i<this._width;i++) {
            for (var j=0;j<this._height;j++) {
                callback(i, j, map[i][j]);
            }
        }
        this._map = null;
        return this;
    };

    ROT.Map.IceyMaze.prototype._randomize = function(dirs) {
        for (var i=0;i<4;i++) {
            dirs[i][0] = 0;
            dirs[i][1] = 0;
        }

        switch (Math.floor(ROT.RNG.getUniform()*4)) {
        case 0:
            dirs[0][0] = -1; dirs[1][0] = 1;
            dirs[2][1] = -1; dirs[3][1] = 1;
            break;
        case 1:
            dirs[3][0] = -1; dirs[2][0] = 1;
            dirs[1][1] = -1; dirs[0][1] = 1;
            break;
        case 2:
            dirs[2][0] = -1; dirs[3][0] = 1;
            dirs[0][1] = -1; dirs[1][1] = 1;
            break;
        case 3:
            dirs[1][0] = -1; dirs[0][0] = 1;
            dirs[3][1] = -1; dirs[2][1] = 1;
            break;
        }
    };

    ROT.Map.IceyMaze.prototype._isFree = function(map, x, y, width, height) {
        if (x < 1 || y < 1 || x >= width || y >= height) { return false; }
        return map[x][y];
    };
    /**
	 * @class Maze generator - Eller's algorithm
	 * See http://homepages.cwi.nl/~tromp/maze.html for explanation
	 * @augments ROT.Map
	 */
    ROT.Map.EllerMaze = function(width, height) {
        ROT.Map.call(this, width, height);
    };
    ROT.Map.EllerMaze.extend(ROT.Map);

    ROT.Map.EllerMaze.prototype.create = function(callback) {
        var map = this._fillMap(1);
        var w = Math.ceil((this._width-2)/2);

        var rand = 9/24;

        var L = [];
        var R = [];

        for (var i=0;i<w;i++) {
            L.push(i);
            R.push(i);
        }
        L.push(w-1); /* fake stop-block at the right side */

        for (var j=1;j+3<this._height;j+=2) {
            /* one row */
            for (var i=0;i<w;i++) {
                /* cell coords (will be always empty) */
                var x = 2*i+1;
                var y = j;
                map[x][y] = 0;

                /* right connection */
                if (i != L[i+1] && ROT.RNG.getUniform() > rand) {
                    this._addToList(i, L, R);
                    map[x+1][y] = 0;
                }

                /* bottom connection */
                if (i != L[i] && ROT.RNG.getUniform() > rand) {
                    /* remove connection */
                    this._removeFromList(i, L, R);
                } else {
                    /* create connection */
                    map[x][y+1] = 0;
                }
            }
        }

        /* last row */
        for (var i=0;i<w;i++) {
            /* cell coords (will be always empty) */
            var x = 2*i+1;
            var y = j;
            map[x][y] = 0;

            /* right connection */
            if (i != L[i+1] && (i == L[i] || ROT.RNG.getUniform() > rand)) {
                /* dig right also if the cell is separated, so it gets connected to the rest of maze */
                this._addToList(i, L, R);
                map[x+1][y] = 0;
            }

            this._removeFromList(i, L, R);
        }

        for (var i=0;i<this._width;i++) {
            for (var j=0;j<this._height;j++) {
                callback(i, j, map[i][j]);
            }
        }

        return this;
    };

    /**
	 * Remove "i" from its list
	 */
    ROT.Map.EllerMaze.prototype._removeFromList = function(i, L, R) {
        R[L[i]] = R[i];
        L[R[i]] = L[i];
        R[i] = i;
        L[i] = i;
    };

    /**
	 * Join lists with "i" and "i+1"
	 */
    ROT.Map.EllerMaze.prototype._addToList = function(i, L, R) {
        R[L[i+1]] = R[i];
        L[R[i]] = L[i+1];
        R[i] = i+1;
        L[i+1] = i;
    };
    /**
	 * @class Cellular automaton map generator
	 * @augments ROT.Map
	 * @param {int} [width=ROT.DEFAULT_WIDTH]
	 * @param {int} [height=ROT.DEFAULT_HEIGHT]
	 * @param {object} [options] Options
	 * @param {int[]} [options.born] List of neighbor counts for a new cell to be born in empty space
	 * @param {int[]} [options.survive] List of neighbor counts for an existing  cell to survive
	 * @param {int} [options.topology] Topology 4 or 6 or 8
	 */
    ROT.Map.Cellular = function(width, height, options) {
        ROT.Map.call(this, width, height);
        this._options = {
            born: [5, 6, 7, 8],
            survive: [4, 5, 6, 7, 8],
            topology: 8
        };
        this.setOptions(options);

        this._dirs = ROT.DIRS[this._options.topology];
        this._map = this._fillMap(0);
    };
    ROT.Map.Cellular.extend(ROT.Map);

    /**
	 * Fill the map with random values
	 * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
	 */
    ROT.Map.Cellular.prototype.randomize = function(probability) {
        for (var i=0;i<this._width;i++) {
            for (var j=0;j<this._height;j++) {
                this._map[i][j] = (ROT.RNG.getUniform() < probability ? 1 : 0);
            }
        }
        return this;
    };

    /**
	 * Change options.
	 * @see ROT.Map.Cellular
	 */
    ROT.Map.Cellular.prototype.setOptions = function(options) {
        for (var p in options) { this._options[p] = options[p]; }
    };

    ROT.Map.Cellular.prototype.set = function(x, y, value) {
        this._map[x][y] = value;
    };

    ROT.Map.Cellular.prototype.create = function(callback) {
        var newMap = this._fillMap(0);
        var born = this._options.born;
        var survive = this._options.survive;

        for (var j=0;j<this._height;j++) {
            var widthStep = 1;
            var widthStart = 0;
            if (this._options.topology == 6) {
                widthStep = 2;
                widthStart = j%2;
            }

            for (var i=widthStart; i<this._width; i+=widthStep) {

                var cur = this._map[i][j];
                var ncount = this._getNeighbors(i, j);

                if (cur && survive.indexOf(ncount) != -1) { /* survive */
                    newMap[i][j] = 1;
                } else if (!cur && born.indexOf(ncount) != -1) { /* born */
                    newMap[i][j] = 1;
                }
            }
        }

        this._map = newMap;

        this.serviceCallback(callback);
    };

    ROT.Map.Cellular.prototype.serviceCallback = function(callback) {
        if (!callback) { return; }

        for (var j=0;j<this._height;j++) {
            var widthStep = 1;
            var widthStart = 0;
            if (this._options.topology == 6) {
                widthStep = 2;
                widthStart = j%2;
            }
            for (var i=widthStart; i<this._width; i+=widthStep) {
                callback(i, j, this._map[i][j]);
            }
        }
    };

    /**
	 * Get neighbor count at [i,j] in this._map
	 */
    ROT.Map.Cellular.prototype._getNeighbors = function(cx, cy) {
        var result = 0;
        for (var i=0;i<this._dirs.length;i++) {
            var dir = this._dirs[i];
            var x = cx + dir[0];
            var y = cy + dir[1];

            if (x < 0 || x >= this._width || y < 0 || y >= this._width) { continue; }
            result += (this._map[x][y] == 1 ? 1 : 0);
        }

        return result;
    };

    /**
	 * Make sure every non-wall space is accessible.
	 * @param {function} callback to call to display map when do
	 * @param {int} value to consider empty space - defaults to 0
	 * @param {function} callback to call when a new connection is made
	 */
    ROT.Map.Cellular.prototype.connect = function(callback, value, connectionCallback) {
        if (!value) value = 0;

        var allFreeSpace = [];
        var notConnected = {};
        // find all free space
        for (var x = 0; x < this._width; x++) {
            for (var y = 0; y < this._height; y++) {
                if (this._freeSpace(x, y, value)) {
                    var p = [x, y];
                    notConnected[this._pointKey(p)] = p;
                    allFreeSpace.push([x, y]);
                }
            }
        }
        var start = allFreeSpace[ROT.RNG.getUniformInt(0, allFreeSpace.length - 1)];

        var key = this._pointKey(start);
        var connected = {};
        connected[key] = start;
        delete notConnected[key];

        // find what's connected to the starting point
        this._findConnected(connected, notConnected, [start], false, value);

        while (Object.keys(notConnected).length > 0) {

            // find two points from notConnected to connected
            var p = this._getFromTo(connected, notConnected);
            var from = p[0]; // notConnected
            var to = p[1]; // connected

            // find everything connected to the starting point
            var local = {};
            local[this._pointKey(from)] = from;
            this._findConnected(local, notConnected, [from], true, value);

            // connect to a connected square
            this._tunnelToConnected(to, from, connected, notConnected, value, connectionCallback);

            // now all of local is connected
            for (var k in local) {
                var pp = local[k];
                this._map[pp[0]][pp[1]] = value;
                connected[k] = pp;
                delete notConnected[k];
            }
        }

        this.serviceCallback(callback);
    };

    /**
	 * Find random points to connect. Search for the closest point in the larger space.
	 * This is to minimize the length of the passage while maintaining good performance.
	 */
    ROT.Map.Cellular.prototype._getFromTo = function(connected, notConnected) {
        var from, to, d;
        var connectedKeys = Object.keys(connected);
        var notConnectedKeys = Object.keys(notConnected);
        for (var i = 0; i < 5; i++) {
            if (connectedKeys.length < notConnectedKeys.length) {
                var keys = connectedKeys;
                to = connected[keys[ROT.RNG.getUniformInt(0, keys.length - 1)]];
                from = this._getClosest(to, notConnected);
            } else {
                var keys = notConnectedKeys;
                from = notConnected[keys[ROT.RNG.getUniformInt(0, keys.length - 1)]];
                to = this._getClosest(from, connected);
            }
            d = (from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]);
            if (d < 64) {
                break;
            }
        }
        // console.log(">>> connected=" + to + " notConnected=" + from + " dist=" + d);
        return [from, to];
    };

    ROT.Map.Cellular.prototype._getClosest = function(point, space) {
        var minPoint = null;
        var minDist = null;
        for (k in space) {
            var p = space[k];
            var d = (p[0] - point[0]) * (p[0] - point[0]) + (p[1] - point[1]) * (p[1] - point[1]);
            if (minDist == null || d < minDist) {
                minDist = d;
                minPoint = p;
            }
        }
        return minPoint;
    };

    ROT.Map.Cellular.prototype._findConnected = function(connected, notConnected, stack, keepNotConnected, value) {
        while(stack.length > 0) {
            var p = stack.splice(0, 1)[0];
            var tests = [
                [p[0] + 1, p[1]],
                [p[0] - 1, p[1]],
                [p[0],     p[1] + 1],
                [p[0],     p[1] - 1]
            ];
            for (var i = 0; i < tests.length; i++) {
                var key = this._pointKey(tests[i]);
                if (connected[key] == null && this._freeSpace(tests[i][0], tests[i][1], value)) {
                    connected[key] = tests[i];
                    if (!keepNotConnected) {
                        delete notConnected[key];
                    }
                    stack.push(tests[i]);
                }
            }
        }
    };

    ROT.Map.Cellular.prototype._tunnelToConnected = function(to, from, connected, notConnected, value, connectionCallback) {
        var key = this._pointKey(from);
        var a, b;
        if (from[0] < to[0]) {
            a = from;
            b = to;
        } else {
            a = to;
            b = from;
        }
        for (var xx = a[0]; xx <= b[0]; xx++) {
            this._map[xx][a[1]] = value;
            var p = [xx, a[1]];
            var pkey = this._pointKey(p);
            connected[pkey] = p;
            delete notConnected[pkey];
        }
        if (connectionCallback && a[0] < b[0]) {
            connectionCallback(a, [b[0], a[1]]);
        }

        // x is now fixed
        var x = b[0];

        if (from[1] < to[1]) {
            a = from;
            b = to;
        } else {
            a = to;
            b = from;
        }
        for (var yy = a[1]; yy < b[1]; yy++) {
            this._map[x][yy] = value;
            var p = [x, yy];
            var pkey = this._pointKey(p);
            connected[pkey] = p;
            delete notConnected[pkey];
        }
        if (connectionCallback && a[1] < b[1]) {
            connectionCallback([b[0], a[1]], [b[0], b[1]]);
        }
    };

    ROT.Map.Cellular.prototype._freeSpace = function(x, y, value) {
        return x >= 0 && x < this._width && y >= 0 && y < this._height && this._map[x][y] == value;
    };

    ROT.Map.Cellular.prototype._pointKey = function(p) {
        return p[0] + "." + p[1];
    };
    /**
	 * @class Dungeon map: has rooms and corridors
	 * @augments ROT.Map
	 */
    ROT.Map.Dungeon = function(width, height) {
        ROT.Map.call(this, width, height);
        this._rooms = []; /* list of all rooms */
        this._corridors = [];
    };
    ROT.Map.Dungeon.extend(ROT.Map);

    /**
	 * Get all generated rooms
	 * @returns {ROT.Map.Feature.Room[]}
	 */
    ROT.Map.Dungeon.prototype.getRooms = function() {
        return this._rooms;
    };

    /**
	 * Get all generated corridors
	 * @returns {ROT.Map.Feature.Corridor[]}
	 */
    ROT.Map.Dungeon.prototype.getCorridors = function() {
        return this._corridors;
    };
    /**
	 * @class Random dungeon generator using human-like digging patterns.
	 * Heavily based on Mike Anderson's ideas from the "Tyrant" algo, mentioned at
	 * http://www.roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm.
	 * @augments ROT.Map.Dungeon
	 */
    ROT.Map.Digger = function(width, height, options) {
        ROT.Map.Dungeon.call(this, width, height);

        this._options = {
            roomWidth: [3, 9], /* room minimum and maximum width */
            roomHeight: [3, 5], /* room minimum and maximum height */
            corridorLength: [3, 10], /* corridor minimum and maximum length */
            dugPercentage: 0.2, /* we stop after this percentage of level area has been dug out */
            timeLimit: 1000 /* we stop after this much time has passed (msec) */
        };
        for (var p in options) { this._options[p] = options[p]; }

        this._features = {
            "Room": 4,
            "Corridor": 4
        };
        this._featureAttempts = 20; /* how many times do we try to create a feature on a suitable wall */
        this._walls = {}; /* these are available for digging */

        this._digCallback = this._digCallback.bind(this);
        this._canBeDugCallback = this._canBeDugCallback.bind(this);
        this._isWallCallback = this._isWallCallback.bind(this);
        this._priorityWallCallback = this._priorityWallCallback.bind(this);
    };
    ROT.Map.Digger.extend(ROT.Map.Dungeon);

    /**
	 * Create a map
	 * @see ROT.Map#create
	 */
    ROT.Map.Digger.prototype.create = function(callback) {
        this._rooms = [];
        this._corridors = [];
        this._map = this._fillMap(1);
        this._walls = {};
        this._dug = 0;
        var area = (this._width-2) * (this._height-2);

        this._firstRoom();

        var t1 = Date.now();

        do {
            var t2 = Date.now();
            if (t2 - t1 > this._options.timeLimit) { break; }

            /* find a good wall */
            var wall = this._findWall();
            if (!wall) { break; } /* no more walls */

            var parts = wall.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            var dir = this._getDiggingDirection(x, y);
            if (!dir) { continue; } /* this wall is not suitable */

            //		console.log("wall", x, y);

            /* try adding a feature */
            var featureAttempts = 0;
            do {
                featureAttempts++;
                if (this._tryFeature(x, y, dir[0], dir[1])) { /* feature added */
                    //if (this._rooms.length + this._corridors.length == 2) { this._rooms[0].addDoor(x, y); } /* first room oficially has doors */
                    this._removeSurroundingWalls(x, y);
                    this._removeSurroundingWalls(x-dir[0], y-dir[1]);
                    break;
                }
            } while (featureAttempts < this._featureAttempts);

            var priorityWalls = 0;
            for (var id in this._walls) {
                if (this._walls[id] > 1) { priorityWalls++; }
            }

        } while (this._dug/area < this._options.dugPercentage || priorityWalls); /* fixme number of priority walls */

        this._addDoors();

        if (callback) {
            for (var i=0;i<this._width;i++) {
                for (var j=0;j<this._height;j++) {
                    callback(i, j, this._map[i][j]);
                }
            }
        }

        this._walls = {};
        this._map = null;

        return this;
    };

    ROT.Map.Digger.prototype._digCallback = function(x, y, value) {
        if (value == 0 || value == 2) { /* empty */
            this._map[x][y] = 0;
            this._dug++;
        } else { /* wall */
            this._walls[x+","+y] = 1;
        }
    };

    ROT.Map.Digger.prototype._isWallCallback = function(x, y) {
        if (x < 0 || y < 0 || x >= this._width || y >= this._height) { return false; }
        return (this._map[x][y] == 1);
    };

    ROT.Map.Digger.prototype._canBeDugCallback = function(x, y) {
        if (x < 1 || y < 1 || x+1 >= this._width || y+1 >= this._height) { return false; }
        return (this._map[x][y] == 1);
    };

    ROT.Map.Digger.prototype._priorityWallCallback = function(x, y) {
        this._walls[x+","+y] = 2;
    };

    ROT.Map.Digger.prototype._firstRoom = function() {
        var cx = Math.floor(this._width/2);
        var cy = Math.floor(this._height/2);
        var room = ROT.Map.Feature.Room.createRandomCenter(cx, cy, this._options);
        this._rooms.push(room);
        room.create(this._digCallback);
    };

    /**
	 * Get a suitable wall
	 */
    ROT.Map.Digger.prototype._findWall = function() {
        var prio1 = [];
        var prio2 = [];
        for (var id in this._walls) {
            var prio = this._walls[id];
            if (prio == 2) {
                prio2.push(id);
            } else {
                prio1.push(id);
            }
        }

        var arr = (prio2.length ? prio2 : prio1);
        if (!arr.length) { return null; } /* no walls :/ */

        var id = arr.random();
        delete this._walls[id];

        return id;
    };

    /**
	 * Tries adding a feature
	 * @returns {bool} was this a successful try?
	 */
    ROT.Map.Digger.prototype._tryFeature = function(x, y, dx, dy) {
        var feature = ROT.RNG.getWeightedValue(this._features);
        feature = ROT.Map.Feature[feature].createRandomAt(x, y, dx, dy, this._options);

        if (!feature.isValid(this._isWallCallback, this._canBeDugCallback)) {
            //		console.log("not valid");
            //		feature.debug();
            return false;
        }

        feature.create(this._digCallback);
        //	feature.debug();

        if (feature instanceof ROT.Map.Feature.Room) { this._rooms.push(feature); }
        if (feature instanceof ROT.Map.Feature.Corridor) {
            feature.createPriorityWalls(this._priorityWallCallback);
            this._corridors.push(feature);
        }

        return true;
    };

    ROT.Map.Digger.prototype._removeSurroundingWalls = function(cx, cy) {
        var deltas = ROT.DIRS[4];

        for (var i=0;i<deltas.length;i++) {
            var delta = deltas[i];
            var x = cx + delta[0];
            var y = cy + delta[1];
            delete this._walls[x+","+y];
            var x = cx + 2*delta[0];
            var y = cy + 2*delta[1];
            delete this._walls[x+","+y];
        }
    };

    /**
	 * Returns vector in "digging" direction, or false, if this does not exist (or is not unique)
	 */
    ROT.Map.Digger.prototype._getDiggingDirection = function(cx, cy) {
        if (cx <= 0 || cy <= 0 || cx >= this._width - 1 || cy >= this._height - 1) { return null; }

        var result = null;
        var deltas = ROT.DIRS[4];

        for (var i=0;i<deltas.length;i++) {
            var delta = deltas[i];
            var x = cx + delta[0];
            var y = cy + delta[1];

            if (!this._map[x][y]) { /* there already is another empty neighbor! */
                if (result) { return null; }
                result = delta;
            }
        }

        /* no empty neighbor */
        if (!result) { return null; }

        return [-result[0], -result[1]];
    };

    /**
	 * Find empty spaces surrounding rooms, and apply doors.
	 */
    ROT.Map.Digger.prototype._addDoors = function() {
        var data = this._map;
        var isWallCallback = function(x, y) {
            return (data[x][y] == 1);
        };
        for (var i = 0; i < this._rooms.length; i++ ) {
            var room = this._rooms[i];
            room.clearDoors();
            room.addDoors(isWallCallback);
        }
    };
    /**
	 * @class Dungeon generator which tries to fill the space evenly. Generates independent rooms and tries to connect them.
	 * @augments ROT.Map.Dungeon
	 */
    ROT.Map.Uniform = function(width, height, options) {
        ROT.Map.Dungeon.call(this, width, height);

        this._options = {
            roomWidth: [3, 9], /* room minimum and maximum width */
            roomHeight: [3, 5], /* room minimum and maximum height */
            roomDugPercentage: 0.1, /* we stop after this percentage of level area has been dug out by rooms */
            timeLimit: 1000 /* we stop after this much time has passed (msec) */
        };
        for (var p in options) { this._options[p] = options[p]; }

        this._roomAttempts = 20; /* new room is created N-times until is considered as impossible to generate */
        this._corridorAttempts = 20; /* corridors are tried N-times until the level is considered as impossible to connect */

        this._connected = []; /* list of already connected rooms */
        this._unconnected = []; /* list of remaining unconnected rooms */

        this._digCallback = this._digCallback.bind(this);
        this._canBeDugCallback = this._canBeDugCallback.bind(this);
        this._isWallCallback = this._isWallCallback.bind(this);
    };
    ROT.Map.Uniform.extend(ROT.Map.Dungeon);

    /**
	 * Create a map. If the time limit has been hit, returns null.
	 * @see ROT.Map#create
	 */
    ROT.Map.Uniform.prototype.create = function(callback) {
        var t1 = Date.now();
        while (1) {
            var t2 = Date.now();
            if (t2 - t1 > this._options.timeLimit) { return null; } /* time limit! */

            this._map = this._fillMap(1);
            this._dug = 0;
            this._rooms = [];
            this._unconnected = [];
            this._generateRooms();
            if (this._rooms.length < 2) { continue; }
            if (this._generateCorridors()) { break; }
        }

        if (callback) {
            for (var i=0;i<this._width;i++) {
                for (var j=0;j<this._height;j++) {
                    callback(i, j, this._map[i][j]);
                }
            }
        }

        return this;
    };

    /**
	 * Generates a suitable amount of rooms
	 */
    ROT.Map.Uniform.prototype._generateRooms = function() {
        var w = this._width-2;
        var h = this._height-2;

        do {
            var room = this._generateRoom();
            if (this._dug/(w*h) > this._options.roomDugPercentage) { break; } /* achieved requested amount of free space */
        } while (room);

        /* either enough rooms, or not able to generate more of them :) */
    };

    /**
	 * Try to generate one room
	 */
    ROT.Map.Uniform.prototype._generateRoom = function() {
        var count = 0;
        while (count < this._roomAttempts) {
            count++;

            var room = ROT.Map.Feature.Room.createRandom(this._width, this._height, this._options);
            if (!room.isValid(this._isWallCallback, this._canBeDugCallback)) { continue; }

            room.create(this._digCallback);
            this._rooms.push(room);
            return room;
        }

        /* no room was generated in a given number of attempts */
        return null;
    };

    /**
	 * Generates connectors beween rooms
	 * @returns {bool} success Was this attempt successfull?
	 */
    ROT.Map.Uniform.prototype._generateCorridors = function() {
        var cnt = 0;
        while (cnt < this._corridorAttempts) {
            cnt++;
            this._corridors = [];

            /* dig rooms into a clear map */
            this._map = this._fillMap(1);
            for (var i=0;i<this._rooms.length;i++) {
                var room = this._rooms[i];
                room.clearDoors();
                room.create(this._digCallback);
            }

            this._unconnected = this._rooms.slice().randomize();
            this._connected = [];
            if (this._unconnected.length) { this._connected.push(this._unconnected.pop()); } /* first one is always connected */

            while (1) {
                /* 1. pick random connected room */
                var connected = this._connected.random();

                /* 2. find closest unconnected */
                var room1 = this._closestRoom(this._unconnected, connected);

                /* 3. connect it to closest connected */
                var room2 = this._closestRoom(this._connected, room1);

                var ok = this._connectRooms(room1, room2);
                if (!ok) { break; } /* stop connecting, re-shuffle */

                if (!this._unconnected.length) { return true; } /* done; no rooms remain */
            }
        }
        return false;
    };

    /**
	 * For a given room, find the closest one from the list
	 */
    ROT.Map.Uniform.prototype._closestRoom = function(rooms, room) {
        var dist = Infinity;
        var center = room.getCenter();
        var result = null;

        for (var i=0;i<rooms.length;i++) {
            var r = rooms[i];
            var c = r.getCenter();
            var dx = c[0]-center[0];
            var dy = c[1]-center[1];
            var d = dx*dx+dy*dy;

            if (d < dist) {
                dist = d;
                result = r;
            }
        }

        return result;
    };

    ROT.Map.Uniform.prototype._connectRooms = function(room1, room2) {
        /*
			room1.debug();
			room2.debug();
		*/

        var center1 = room1.getCenter();
        var center2 = room2.getCenter();

        var diffX = center2[0] - center1[0];
        var diffY = center2[1] - center1[1];

        if (Math.abs(diffX) < Math.abs(diffY)) { /* first try connecting north-south walls */
            var dirIndex1 = (diffY > 0 ? 2 : 0);
            var dirIndex2 = (dirIndex1 + 2) % 4;
            var min = room2.getLeft();
            var max = room2.getRight();
            var index = 0;
        } else { /* first try connecting east-west walls */
            var dirIndex1 = (diffX > 0 ? 1 : 3);
            var dirIndex2 = (dirIndex1 + 2) % 4;
            var min = room2.getTop();
            var max = room2.getBottom();
            var index = 1;
        }

        var start = this._placeInWall(room1, dirIndex1); /* corridor will start here */
        if (!start) { return false; }

        if (start[index] >= min && start[index] <= max) { /* possible to connect with straight line (I-like) */
            var end = start.slice();
            var value = null;
            switch (dirIndex2) {
            case 0: value = room2.getTop()-1; break;
            case 1: value = room2.getRight()+1; break;
            case 2: value = room2.getBottom()+1; break;
            case 3: value = room2.getLeft()-1; break;
            }
            end[(index+1)%2] = value;
            this._digLine([start, end]);

        } else if (start[index] < min-1 || start[index] > max+1) { /* need to switch target wall (L-like) */

            var diff = start[index] - center2[index];
            switch (dirIndex2) {
            case 0:
            case 1:	var rotation = (diff < 0 ? 3 : 1); break;
            case 2:
            case 3:	var rotation = (diff < 0 ? 1 : 3); break;
            }
            dirIndex2 = (dirIndex2 + rotation) % 4;

            var end = this._placeInWall(room2, dirIndex2);
            if (!end) { return false; }

            var mid = [0, 0];
            mid[index] = start[index];
            var index2 = (index+1)%2;
            mid[index2] = end[index2];
            this._digLine([start, mid, end]);

        } else { /* use current wall pair, but adjust the line in the middle (S-like) */

            var index2 = (index+1)%2;
            var end = this._placeInWall(room2, dirIndex2);
            if (!end) { return false; }
            var mid = Math.round((end[index2] + start[index2])/2);

            var mid1 = [0, 0];
            var mid2 = [0, 0];
            mid1[index] = start[index];
            mid1[index2] = mid;
            mid2[index] = end[index];
            mid2[index2] = mid;
            this._digLine([start, mid1, mid2, end]);
        }

        room1.addDoor(start[0], start[1]);
        room2.addDoor(end[0], end[1]);

        var index = this._unconnected.indexOf(room1);
        if (index != -1) {
            this._unconnected.splice(index, 1);
            this._connected.push(room1);
        }

        var index = this._unconnected.indexOf(room2);
        if (index != -1) {
            this._unconnected.splice(index, 1);
            this._connected.push(room2);
        }

        return true;
    };

    ROT.Map.Uniform.prototype._placeInWall = function(room, dirIndex) {
        var start = [0, 0];
        var dir = [0, 0];
        var length = 0;

        switch (dirIndex) {
        case 0:
            dir = [1, 0];
            start = [room.getLeft(), room.getTop()-1];
            length = room.getRight()-room.getLeft()+1;
            break;
        case 1:
            dir = [0, 1];
            start = [room.getRight()+1, room.getTop()];
            length = room.getBottom()-room.getTop()+1;
            break;
        case 2:
            dir = [1, 0];
            start = [room.getLeft(), room.getBottom()+1];
            length = room.getRight()-room.getLeft()+1;
            break;
        case 3:
            dir = [0, 1];
            start = [room.getLeft()-1, room.getTop()];
            length = room.getBottom()-room.getTop()+1;
            break;
        }

        var avail = [];
        var lastBadIndex = -2;

        for (var i=0;i<length;i++) {
            var x = start[0] + i*dir[0];
            var y = start[1] + i*dir[1];
            avail.push(null);

            var isWall = (this._map[x][y] == 1);
            if (isWall) {
                if (lastBadIndex != i-1) { avail[i] = [x, y]; }
            } else {
                lastBadIndex = i;
                if (i) { avail[i-1] = null; }
            }
        }

        for (var i=avail.length-1; i>=0; i--) {
            if (!avail[i]) { avail.splice(i, 1); }
        }
        return (avail.length ? avail.random() : null);
    };

    /**
	 * Dig a polyline.
	 */
    ROT.Map.Uniform.prototype._digLine = function(points) {
        for (var i=1;i<points.length;i++) {
            var start = points[i-1];
            var end = points[i];
            var corridor = new ROT.Map.Feature.Corridor(start[0], start[1], end[0], end[1]);
            corridor.create(this._digCallback);
            this._corridors.push(corridor);
        }
    };

    ROT.Map.Uniform.prototype._digCallback = function(x, y, value) {
        this._map[x][y] = value;
        if (value == 0) { this._dug++; }
    };

    ROT.Map.Uniform.prototype._isWallCallback = function(x, y) {
        if (x < 0 || y < 0 || x >= this._width || y >= this._height) { return false; }
        return (this._map[x][y] == 1);
    };

    ROT.Map.Uniform.prototype._canBeDugCallback = function(x, y) {
        if (x < 1 || y < 1 || x+1 >= this._width || y+1 >= this._height) { return false; }
        return (this._map[x][y] == 1);
    };

    /**
	 * @author hyakugei
	 * @class Dungeon generator which uses the "orginal" Rogue dungeon generation algorithm. See http://kuoi.com/~kamikaze/GameDesign/art07_rogue_dungeon.php
	 * @augments ROT.Map
	 * @param {int} [width=ROT.DEFAULT_WIDTH]
	 * @param {int} [height=ROT.DEFAULT_HEIGHT]
	 * @param {object} [options] Options
	 * @param {int[]} [options.cellWidth=3] Number of cells to create on the horizontal (number of rooms horizontally)
	 * @param {int[]} [options.cellHeight=3] Number of cells to create on the vertical (number of rooms vertically)
	 * @param {int} [options.roomWidth] Room min and max width - normally set auto-magically via the constructor.
	 * @param {int} [options.roomHeight] Room min and max height - normally set auto-magically via the constructor.
	 */
    ROT.Map.Rogue = function (width, height, options) {
        ROT.Map.call(this, width, height);

        this._options = {
            cellWidth: 3,  // NOTE to self, these could probably work the same as the roomWidth/room Height values
            cellHeight: 3  //     ie. as an array with min-max values for each direction....
        };

        for (var p in options) { this._options[p] = options[p]; }

        /*
		Set the room sizes according to the over-all width of the map,
		and the cell sizes.
		*/
        if (!this._options.hasOwnProperty("roomWidth")) {
            this._options["roomWidth"] = this._calculateRoomSize(this._width, this._options["cellWidth"]);
        }
        if (!this._options.hasOwnProperty("roomHeight")) {
            this._options["roomHeight"] = this._calculateRoomSize(this._height, this._options["cellHeight"]);
        }

    };

    ROT.Map.Rogue.extend(ROT.Map);

    /**
	 * @see ROT.Map#create
	 */
    ROT.Map.Rogue.prototype.create = function (callback) {
        this.map = this._fillMap(1);
        this.rooms = [];
        this.connectedCells = [];

        this._initRooms();
        this._connectRooms();
        this._connectUnconnectedRooms();
        this._createRandomRoomConnections();
        this._createRooms();
        this._createCorridors();

        if (callback) {
            for (var i = 0; i < this._width; i++) {
                for (var j = 0; j < this._height; j++) {
                    callback(i, j, this.map[i][j]);
                }
            }
        }

        return this;
    };

    ROT.Map.Rogue.prototype._calculateRoomSize = function (size, cell) {
        var max = Math.floor((size/cell) * 0.8);
        var min = Math.floor((size/cell) * 0.25);
        if (min < 2) { min = 2; }
        if (max < 2) { max = 2; }
        return [min, max];
    };

    ROT.Map.Rogue.prototype._initRooms = function () {
        // create rooms array. This is the "grid" list from the algo.
        for (var i = 0; i < this._options.cellWidth; i++) {
            this.rooms.push([]);
            for(var j = 0; j < this._options.cellHeight; j++) {
                this.rooms[i].push({"x":0, "y":0, "width":0, "height":0, "connections":[], "cellx":i, "celly":j});
            }
        }
    };

    ROT.Map.Rogue.prototype._connectRooms = function () {
        //pick random starting grid
        var cgx = ROT.RNG.getUniformInt(0, this._options.cellWidth-1);
        var cgy = ROT.RNG.getUniformInt(0, this._options.cellHeight-1);

        var idx;
        var ncgx;
        var ncgy;

        var found = false;
        var room;
        var otherRoom;

        // find  unconnected neighbour cells
        do {

            //var dirToCheck = [0, 1, 2, 3, 4, 5, 6, 7];
            var dirToCheck = [0, 2, 4, 6];
            dirToCheck = dirToCheck.randomize();

            do {
                found = false;
                idx = dirToCheck.pop();

                ncgx = cgx + ROT.DIRS[8][idx][0];
                ncgy = cgy + ROT.DIRS[8][idx][1];

                if (ncgx < 0 || ncgx >= this._options.cellWidth) { continue; }
                if (ncgy < 0 || ncgy >= this._options.cellHeight) { continue; }

                room = this.rooms[cgx][cgy];

                if (room["connections"].length > 0) {
                    // as long as this room doesn't already coonect to me, we are ok with it.
                    if (room["connections"][0][0] == ncgx && room["connections"][0][1] == ncgy) {
                        break;
                    }
                }

                otherRoom = this.rooms[ncgx][ncgy];

                if (otherRoom["connections"].length == 0) {
                    otherRoom["connections"].push([cgx, cgy]);

                    this.connectedCells.push([ncgx, ncgy]);
                    cgx = ncgx;
                    cgy = ncgy;
                    found = true;
                }

            } while (dirToCheck.length > 0 && found == false);

        } while (dirToCheck.length > 0);

    };

    ROT.Map.Rogue.prototype._connectUnconnectedRooms = function () {
        //While there are unconnected rooms, try to connect them to a random connected neighbor
        //(if a room has no connected neighbors yet, just keep cycling, you'll fill out to it eventually).
        var cw = this._options.cellWidth;
        var ch = this._options.cellHeight;

        this.connectedCells = this.connectedCells.randomize();
        var room;
        var otherRoom;
        var validRoom;

        for (var i = 0; i < this._options.cellWidth; i++) {
            for (var j = 0; j < this._options.cellHeight; j++)  {

                room = this.rooms[i][j];

                if (room["connections"].length == 0) {
                    var directions = [0, 2, 4, 6];
                    directions = directions.randomize();

                    validRoom = false;

                    do {

                        var dirIdx = directions.pop();
                        var newI = i + ROT.DIRS[8][dirIdx][0];
                        var newJ = j + ROT.DIRS[8][dirIdx][1];

                        if (newI < 0 || newI >= cw || newJ < 0 || newJ >= ch) { continue; }

                        otherRoom = this.rooms[newI][newJ];

                        validRoom = true;

                        if (otherRoom["connections"].length == 0) { break; }

                        for (var k = 0; k < otherRoom["connections"].length; k++) {
                            if (otherRoom["connections"][k][0] == i && otherRoom["connections"][k][1] == j) {
                                validRoom = false;
                                break;
                            }
                        }

                        if (validRoom) { break; }

                    } while (directions.length);

                    if (validRoom) {
                        room["connections"].push([otherRoom["cellx"], otherRoom["celly"]]);
                    } else {
                        console.log("-- Unable to connect room.");
                    }
                }
            }
        }
    };

    ROT.Map.Rogue.prototype._createRandomRoomConnections = function (connections) {
        // Empty for now.
    };

    ROT.Map.Rogue.prototype._createRooms = function () {
        // Create Rooms

        var w = this._width;
        var h = this._height;

        var cw = this._options.cellWidth;
        var ch = this._options.cellHeight;

        var cwp = Math.floor(this._width / cw);
        var chp = Math.floor(this._height / ch);

        var roomw;
        var roomh;
        var roomWidth = this._options["roomWidth"];
        var roomHeight = this._options["roomHeight"];
        var sx;
        var sy;
        var otherRoom;

        for (var i = 0; i < cw; i++) {
            for (var j = 0; j < ch; j++) {
                sx = cwp * i;
                sy = chp * j;

                if (sx == 0) { sx = 1; }
                if (sy == 0) { sy = 1; }

                roomw = ROT.RNG.getUniformInt(roomWidth[0], roomWidth[1]);
                roomh = ROT.RNG.getUniformInt(roomHeight[0], roomHeight[1]);

                if (j > 0) {
                    otherRoom = this.rooms[i][j-1];
                    while (sy - (otherRoom["y"] + otherRoom["height"] ) < 3) {
                        sy++;
                    }
                }

                if (i > 0) {
                    otherRoom = this.rooms[i-1][j];
                    while(sx - (otherRoom["x"] + otherRoom["width"]) < 3) {
                        sx++;
                    }
                }

                var sxOffset = Math.round(ROT.RNG.getUniformInt(0, cwp-roomw)/2);
                var syOffset = Math.round(ROT.RNG.getUniformInt(0, chp-roomh)/2);

                while (sx + sxOffset + roomw >= w) {
                    if(sxOffset) {
                        sxOffset--;
                    } else {
                        roomw--;
                    }
                }

                while (sy + syOffset + roomh >= h) {
                    if(syOffset) {
                        syOffset--;
                    } else {
                        roomh--;
                    }
                }

                sx = sx + sxOffset;
                sy = sy + syOffset;

                this.rooms[i][j]["x"] = sx;
                this.rooms[i][j]["y"] = sy;
                this.rooms[i][j]["width"] = roomw;
                this.rooms[i][j]["height"] = roomh;

                for (var ii = sx; ii < sx + roomw; ii++) {
                    for (var jj = sy; jj < sy + roomh; jj++) {
                        this.map[ii][jj] = 0;
                    }
                }
            }
        }
    };

    ROT.Map.Rogue.prototype._getWallPosition = function (aRoom, aDirection) {
        var rx;
        var ry;
        var door;

        if (aDirection == 1 || aDirection == 3) {
            rx = ROT.RNG.getUniformInt(aRoom["x"] + 1, aRoom["x"] + aRoom["width"] - 2);
            if (aDirection == 1) {
                ry = aRoom["y"] - 2;
                door = ry + 1;
            } else {
                ry = aRoom["y"] + aRoom["height"] + 1;
                door = ry -1;
            }

            this.map[rx][door] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.

        } else if (aDirection == 2 || aDirection == 4) {
            ry = ROT.RNG.getUniformInt(aRoom["y"] + 1, aRoom["y"] + aRoom["height"] - 2);
            if(aDirection == 2) {
                rx = aRoom["x"] + aRoom["width"] + 1;
                door = rx - 1;
            } else {
                rx = aRoom["x"] - 2;
                door = rx + 1;
            }

            this.map[door][ry] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.

        }
        return [rx, ry];
    };

    /***
	* @param startPosition a 2 element array
	* @param endPosition a 2 element array
	*/
    ROT.Map.Rogue.prototype._drawCorridor = function (startPosition, endPosition) {
        var xOffset = endPosition[0] - startPosition[0];
        var yOffset = endPosition[1] - startPosition[1];

        var xpos = startPosition[0];
        var ypos = startPosition[1];

        var tempDist;
        var xDir;
        var yDir;

        var move; // 2 element array, element 0 is the direction, element 1 is the total value to move.
        var moves = []; // a list of 2 element arrays

        var xAbs = Math.abs(xOffset);
        var yAbs = Math.abs(yOffset);

        var percent = ROT.RNG.getUniform(); // used to split the move at different places along the long axis
        var firstHalf = percent;
        var secondHalf = 1 - percent;

        xDir = xOffset > 0 ? 2 : 6;
        yDir = yOffset > 0 ? 4 : 0;

        if (xAbs < yAbs) {
            // move firstHalf of the y offset
            tempDist = Math.ceil(yAbs * firstHalf);
            moves.push([yDir, tempDist]);
            // move all the x offset
            moves.push([xDir, xAbs]);
            // move sendHalf of the  y offset
            tempDist = Math.floor(yAbs * secondHalf);
            moves.push([yDir, tempDist]);
        } else {
            //  move firstHalf of the x offset
            tempDist = Math.ceil(xAbs * firstHalf);
            moves.push([xDir, tempDist]);
            // move all the y offset
            moves.push([yDir, yAbs]);
            // move secondHalf of the x offset.
            tempDist = Math.floor(xAbs * secondHalf);
            moves.push([xDir, tempDist]);
        }

        this.map[xpos][ypos] = 0;

        while (moves.length > 0) {
            move = moves.pop();
            while (move[1] > 0) {
                xpos += ROT.DIRS[8][move[0]][0];
                ypos += ROT.DIRS[8][move[0]][1];
                this.map[xpos][ypos] = 0;
                move[1] = move[1] - 1;
            }
        }
    };

    ROT.Map.Rogue.prototype._createCorridors = function () {
        // Draw Corridors between connected rooms

        var cw = this._options.cellWidth;
        var ch = this._options.cellHeight;
        var room;
        var connection;
        var otherRoom;
        var wall;
        var otherWall;

        for (var i = 0; i < cw; i++) {
            for (var j = 0; j < ch; j++) {
                room = this.rooms[i][j];

                for (var k = 0; k < room["connections"].length; k++) {

                    connection = room["connections"][k];

                    otherRoom = this.rooms[connection[0]][connection[1]];

                    // figure out what wall our corridor will start one.
                    // figure out what wall our corridor will end on.
                    if (otherRoom["cellx"] > room["cellx"]) {
                        wall = 2;
                        otherWall = 4;
                    } else if (otherRoom["cellx"] < room["cellx"]) {
                        wall = 4;
                        otherWall = 2;
                    } else if(otherRoom["celly"] > room["celly"]) {
                        wall = 3;
                        otherWall = 1;
                    } else if(otherRoom["celly"] < room["celly"]) {
                        wall = 1;
                        otherWall = 3;
                    }

                    this._drawCorridor(this._getWallPosition(room, wall), this._getWallPosition(otherRoom, otherWall));
                }
            }
        }
    };
    /**
	 * @class Dungeon feature; has own .create() method
	 */
    ROT.Map.Feature = function() {};
    ROT.Map.Feature.prototype.isValid = function(canBeDugCallback) {};
    ROT.Map.Feature.prototype.create = function(digCallback) {};
    ROT.Map.Feature.prototype.debug = function() {};
    ROT.Map.Feature.createRandomAt = function(x, y, dx, dy, options) {};

    /**
	 * @class Room
	 * @augments ROT.Map.Feature
	 * @param {int} x1
	 * @param {int} y1
	 * @param {int} x2
	 * @param {int} y2
	 * @param {int} [doorX]
	 * @param {int} [doorY]
	 */
    ROT.Map.Feature.Room = function(x1, y1, x2, y2, doorX, doorY) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this._doors = {};
        if (arguments.length > 4) { this.addDoor(doorX, doorY); }
    };
    ROT.Map.Feature.Room.extend(ROT.Map.Feature);

    /**
	 * Room of random size, with a given doors and direction
	 */
    ROT.Map.Feature.Room.createRandomAt = function(x, y, dx, dy, options) {
        var min = options.roomWidth[0];
        var max = options.roomWidth[1];
        var width = ROT.RNG.getUniformInt(min, max);

        var min = options.roomHeight[0];
        var max = options.roomHeight[1];
        var height = ROT.RNG.getUniformInt(min, max);

        if (dx == 1) { /* to the right */
            var y2 = y - Math.floor(ROT.RNG.getUniform() * height);
            return new this(x+1, y2, x+width, y2+height-1, x, y);
        }

        if (dx == -1) { /* to the left */
            var y2 = y - Math.floor(ROT.RNG.getUniform() * height);
            return new this(x-width, y2, x-1, y2+height-1, x, y);
        }

        if (dy == 1) { /* to the bottom */
            var x2 = x - Math.floor(ROT.RNG.getUniform() * width);
            return new this(x2, y+1, x2+width-1, y+height, x, y);
        }

        if (dy == -1) { /* to the top */
            var x2 = x - Math.floor(ROT.RNG.getUniform() * width);
            return new this(x2, y-height, x2+width-1, y-1, x, y);
        }

	        throw new Error("dx or dy must be 1 or -1");
    };

    /**
	 * Room of random size, positioned around center coords
	 */
    ROT.Map.Feature.Room.createRandomCenter = function(cx, cy, options) {
        var min = options.roomWidth[0];
        var max = options.roomWidth[1];
        var width = ROT.RNG.getUniformInt(min, max);

        var min = options.roomHeight[0];
        var max = options.roomHeight[1];
        var height = ROT.RNG.getUniformInt(min, max);

        var x1 = cx - Math.floor(ROT.RNG.getUniform()*width);
        var y1 = cy - Math.floor(ROT.RNG.getUniform()*height);
        var x2 = x1 + width - 1;
        var y2 = y1 + height - 1;

        return new this(x1, y1, x2, y2);
    };

    /**
	 * Room of random size within a given dimensions
	 */
    ROT.Map.Feature.Room.createRandom = function(availWidth, availHeight, options) {
        var min = options.roomWidth[0];
        var max = options.roomWidth[1];
        var width = ROT.RNG.getUniformInt(min, max);

        var min = options.roomHeight[0];
        var max = options.roomHeight[1];
        var height = ROT.RNG.getUniformInt(min, max);

        var left = availWidth - width - 1;
        var top = availHeight - height - 1;

        var x1 = 1 + Math.floor(ROT.RNG.getUniform()*left);
        var y1 = 1 + Math.floor(ROT.RNG.getUniform()*top);
        var x2 = x1 + width - 1;
        var y2 = y1 + height - 1;

        return new this(x1, y1, x2, y2);
    };

    ROT.Map.Feature.Room.prototype.addDoor = function(x, y) {
        this._doors[x+","+y] = 1;
        return this;
    };

    /**
	 * @param {function}
	 */
    ROT.Map.Feature.Room.prototype.getDoors = function(callback) {
        for (var key in this._doors) {
            var parts = key.split(",");
            callback(parseInt(parts[0]), parseInt(parts[1]));
        }
        return this;
    };

    ROT.Map.Feature.Room.prototype.clearDoors = function() {
        this._doors = {};
        return this;
    };

    ROT.Map.Feature.Room.prototype.addDoors = function(isWallCallback) {
        var left = this._x1-1;
        var right = this._x2+1;
        var top = this._y1-1;
        var bottom = this._y2+1;

        for (var x=left; x<=right; x++) {
            for (var y=top; y<=bottom; y++) {
                if (x != left && x != right && y != top && y != bottom) { continue; }
                if (isWallCallback(x, y)) { continue; }

                this.addDoor(x, y);
            }
        }

        return this;
    };

    ROT.Map.Feature.Room.prototype.debug = function() {
        console.log("room", this._x1, this._y1, this._x2, this._y2);
    };

    ROT.Map.Feature.Room.prototype.isValid = function(isWallCallback, canBeDugCallback) {
        var left = this._x1-1;
        var right = this._x2+1;
        var top = this._y1-1;
        var bottom = this._y2+1;

        for (var x=left; x<=right; x++) {
            for (var y=top; y<=bottom; y++) {
                if (x == left || x == right || y == top || y == bottom) {
                    if (!isWallCallback(x, y)) { return false; }
                } else {
                    if (!canBeDugCallback(x, y)) { return false; }
                }
            }
        }

        return true;
    };

    /**
	 * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty, 1 = wall, 2 = door. Multiple doors are allowed.
	 */
    ROT.Map.Feature.Room.prototype.create = function(digCallback) {
        var left = this._x1-1;
        var right = this._x2+1;
        var top = this._y1-1;
        var bottom = this._y2+1;

        var value = 0;
        for (var x=left; x<=right; x++) {
            for (var y=top; y<=bottom; y++) {
                if (x+","+y in this._doors) {
                    value = 2;
                } else if (x == left || x == right || y == top || y == bottom) {
                    value = 1;
                } else {
                    value = 0;
                }
                digCallback(x, y, value);
            }
        }
    };

    ROT.Map.Feature.Room.prototype.getCenter = function() {
        return [Math.round((this._x1 + this._x2)/2), Math.round((this._y1 + this._y2)/2)];
    };

    ROT.Map.Feature.Room.prototype.getLeft = function() {
        return this._x1;
    };

    ROT.Map.Feature.Room.prototype.getRight = function() {
        return this._x2;
    };

    ROT.Map.Feature.Room.prototype.getTop = function() {
        return this._y1;
    };

    ROT.Map.Feature.Room.prototype.getBottom = function() {
        return this._y2;
    };

    /**
	 * @class Corridor
	 * @augments ROT.Map.Feature
	 * @param {int} startX
	 * @param {int} startY
	 * @param {int} endX
	 * @param {int} endY
	 */
    ROT.Map.Feature.Corridor = function(startX, startY, endX, endY) {
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
        this._endsWithAWall = true;
    };
    ROT.Map.Feature.Corridor.extend(ROT.Map.Feature);

    ROT.Map.Feature.Corridor.createRandomAt = function(x, y, dx, dy, options) {
        var min = options.corridorLength[0];
        var max = options.corridorLength[1];
        var length = ROT.RNG.getUniformInt(min, max);

        return new this(x, y, x + dx*length, y + dy*length);
    };

    ROT.Map.Feature.Corridor.prototype.debug = function() {
        console.log("corridor", this._startX, this._startY, this._endX, this._endY);
    };

    ROT.Map.Feature.Corridor.prototype.isValid = function(isWallCallback, canBeDugCallback){
        var sx = this._startX;
        var sy = this._startY;
        var dx = this._endX-sx;
        var dy = this._endY-sy;
        var length = 1 + Math.max(Math.abs(dx), Math.abs(dy));

        if (dx) { dx = dx/Math.abs(dx); }
        if (dy) { dy = dy/Math.abs(dy); }
        var nx = dy;
        var ny = -dx;

        var ok = true;
        for (var i=0; i<length; i++) {
            var x = sx + i*dx;
            var y = sy + i*dy;

            if (!canBeDugCallback(     x,      y)) { ok = false; }
            if (!isWallCallback(x + nx, y + ny)) { ok = false; }
            if (!isWallCallback(x - nx, y - ny)) { ok = false; }

            if (!ok) {
                length = i;
                this._endX = x-dx;
                this._endY = y-dy;
                break;
            }
        }

        /**
		 * If the length degenerated, this corridor might be invalid
		 */

        /* not supported */
        if (length == 0) { return false; }

		 /* length 1 allowed only if the next space is empty */
        if (length == 1 && isWallCallback(this._endX + dx, this._endY + dy)) { return false; }

        /**
		 * We do not want the corridor to crash into a corner of a room;
		 * if any of the ending corners is empty, the N+1th cell of this corridor must be empty too.
		 *
		 * Situation:
		 * #######1
		 * .......?
		 * #######2
		 *
		 * The corridor was dug from left to right.
		 * 1, 2 - problematic corners, ? = N+1th cell (not dug)
		 */
        var firstCornerBad = !isWallCallback(this._endX + dx + nx, this._endY + dy + ny);
        var secondCornerBad = !isWallCallback(this._endX + dx - nx, this._endY + dy - ny);
        this._endsWithAWall = isWallCallback(this._endX + dx, this._endY + dy);
        if ((firstCornerBad || secondCornerBad) && this._endsWithAWall) { return false; }

        return true;
    };

    /**
	 * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty.
	 */
    ROT.Map.Feature.Corridor.prototype.create = function(digCallback) {
        var sx = this._startX;
        var sy = this._startY;
        var dx = this._endX-sx;
        var dy = this._endY-sy;
        var length = 1+Math.max(Math.abs(dx), Math.abs(dy));

        if (dx) { dx = dx/Math.abs(dx); }
        if (dy) { dy = dy/Math.abs(dy); }
        var nx = dy;
        var ny = -dx;

        for (var i=0; i<length; i++) {
            var x = sx + i*dx;
            var y = sy + i*dy;
            digCallback(x, y, 0);
        }

        return true;
    };

    ROT.Map.Feature.Corridor.prototype.createPriorityWalls = function(priorityWallCallback) {
        if (!this._endsWithAWall) { return; }

        var sx = this._startX;
        var sy = this._startY;

        var dx = this._endX-sx;
        var dy = this._endY-sy;
        if (dx) { dx = dx/Math.abs(dx); }
        if (dy) { dy = dy/Math.abs(dy); }
        var nx = dy;
        var ny = -dx;

        priorityWallCallback(this._endX + dx, this._endY + dy);
        priorityWallCallback(this._endX + nx, this._endY + ny);
        priorityWallCallback(this._endX - nx, this._endY - ny);
    };
    /**
	 * @class Base noise generator
	 */
    ROT.Noise = function() {
    };

    ROT.Noise.prototype.get = function(x, y) {};
    /**
	 * A simple 2d implementation of simplex noise by Ondrej Zara
	 *
	 * Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
	 * Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
	 * With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
	 * Better rank ordering method by Stefan Gustavson in 2012.
	 */

    /**
	 * @class 2D simplex noise generator
	 * @param {int} [gradients=256] Random gradients
	 */
    ROT.Noise.Simplex = function(gradients) {
        ROT.Noise.call(this);

        this._F2 = 0.5 * (Math.sqrt(3) - 1);
        this._G2 = (3 - Math.sqrt(3)) / 6;

        this._gradients = [
            [ 0, -1],
            [ 1, -1],
            [ 1,  0],
            [ 1,  1],
            [ 0,  1],
            [-1,  1],
            [-1,  0],
            [-1, -1]
        ];

        var permutations = [];
        var count = gradients || 256;
        for (var i=0;i<count;i++) { permutations.push(i); }
        permutations = permutations.randomize();

        this._perms = [];
        this._indexes = [];

        for (var i=0;i<2*count;i++) {
            this._perms.push(permutations[i % count]);
            this._indexes.push(this._perms[i] % this._gradients.length);
        }

    };
    ROT.Noise.Simplex.extend(ROT.Noise);

    ROT.Noise.Simplex.prototype.get = function(xin, yin) {
        var perms = this._perms;
        var indexes = this._indexes;
        var count = perms.length/2;
        var G2 = this._G2;

        var n0 =0, n1 = 0, n2 = 0, gi; // Noise contributions from the three corners

        // Skew the input space to determine which simplex cell we're in
        var s = (xin + yin) * this._F2; // Hairy factor for 2D
        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var t = (i + j) * G2;
        var X0 = i - t; // Unskew the cell origin back to (x,y) space
        var Y0 = j - t;
        var x0 = xin - X0; // The x,y distances from the cell origin
        var y0 = yin - Y0;

        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        } else { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
            i1 = 0;
            j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)

        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        var y1 = y0 - j1 + G2;
        var x2 = x0 - 1 + 2*G2; // Offsets for last corner in (x,y) unskewed coords
        var y2 = y0 - 1 + 2*G2;

        // Work out the hashed gradient indices of the three simplex corners
        var ii = i.mod(count);
        var jj = j.mod(count);

        // Calculate the contribution from the three corners
        var t0 = 0.5 - x0*x0 - y0*y0;
        if (t0 >= 0) {
            t0 *= t0;
            gi = indexes[ii+perms[jj]];
            var grad = this._gradients[gi];
            n0 = t0 * t0 * (grad[0] * x0 + grad[1] * y0);
        }

        var t1 = 0.5 - x1*x1 - y1*y1;
        if (t1 >= 0) {
            t1 *= t1;
            gi = indexes[ii+i1+perms[jj+j1]];
            var grad = this._gradients[gi];
            n1 = t1 * t1 * (grad[0] * x1 + grad[1] * y1);
        }

        var t2 = 0.5 - x2*x2 - y2*y2;
        if (t2 >= 0) {
            t2 *= t2;
            gi = indexes[ii+1+perms[jj+1]];
            var grad = this._gradients[gi];
            n2 = t2 * t2 * (grad[0] * x2 + grad[1] * y2);
        }

        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70 * (n0 + n1 + n2);
    };
    /**
	 * @class Abstract FOV algorithm
	 * @param {function} lightPassesCallback Does the light pass through x,y?
	 * @param {object} [options]
	 * @param {int} [options.topology=8] 4/6/8
	 */
    ROT.FOV = function(lightPassesCallback, options) {
        this._lightPasses = lightPassesCallback;
        this._options = {
            topology: 8
        };
        for (var p in options) { this._options[p] = options[p]; }
    };

    /**
	 * Compute visibility for a 360-degree circle
	 * @param {int} x
	 * @param {int} y
	 * @param {int} R Maximum visibility radius
	 * @param {function} callback
	 */
    ROT.FOV.prototype.compute = function(x, y, R, callback) {};

    /**
	 * Return all neighbors in a concentric ring
	 * @param {int} cx center-x
	 * @param {int} cy center-y
	 * @param {int} r range
	 */
    ROT.FOV.prototype._getCircle = function(cx, cy, r) {
        var result = [];
        var dirs, countFactor, startOffset;

        switch (this._options.topology) {
        case 4:
            countFactor = 1;
            startOffset = [0, 1];
            dirs = [
                ROT.DIRS[8][7],
                ROT.DIRS[8][1],
                ROT.DIRS[8][3],
                ROT.DIRS[8][5]
            ];
            break;

        case 6:
            dirs = ROT.DIRS[6];
            countFactor = 1;
            startOffset = [-1, 1];
            break;

        case 8:
            dirs = ROT.DIRS[4];
            countFactor = 2;
            startOffset = [-1, 1];
            break;
        }

        /* starting neighbor */
        var x = cx + startOffset[0]*r;
        var y = cy + startOffset[1]*r;

        /* circle */
        for (var i=0;i<dirs.length;i++) {
            for (var j=0;j<r*countFactor;j++) {
                result.push([x, y]);
                x += dirs[i][0];
                y += dirs[i][1];

            }
        }

        return result;
    };
    /**
	 * @class Discrete shadowcasting algorithm. Obsoleted by Precise shadowcasting.
	 * @augments ROT.FOV
	 */
    ROT.FOV.DiscreteShadowcasting = function(lightPassesCallback, options) {
        ROT.FOV.call(this, lightPassesCallback, options);
    };
    ROT.FOV.DiscreteShadowcasting.extend(ROT.FOV);

    /**
	 * @see ROT.FOV#compute
	 */
    ROT.FOV.DiscreteShadowcasting.prototype.compute = function(x, y, R, callback) {
        var center = this._coords;
        var map = this._map;

        /* this place is always visible */
        callback(x, y, 0, 1);

        /* standing in a dark place. FIXME is this a good idea?  */
        if (!this._lightPasses(x, y)) { return; }

        /* start and end angles */
        var DATA = [];

        var A, B, cx, cy, blocks;

        /* analyze surrounding cells in concentric rings, starting from the center */
        for (var r=1; r<=R; r++) {
            var neighbors = this._getCircle(x, y, r);
            var angle = 360 / neighbors.length;

            for (var i=0;i<neighbors.length;i++) {
                cx = neighbors[i][0];
                cy = neighbors[i][1];
                A = angle * (i - 0.5);
                B = A + angle;

                blocks = !this._lightPasses(cx, cy);
                if (this._visibleCoords(Math.floor(A), Math.ceil(B), blocks, DATA)) { callback(cx, cy, r, 1); }

                if (DATA.length == 2 && DATA[0] == 0 && DATA[1] == 360) { return; } /* cutoff? */

            } /* for all cells in this ring */
        } /* for all rings */
    };

    /**
	 * @param {int} A start angle
	 * @param {int} B end angle
	 * @param {bool} blocks Does current cell block visibility?
	 * @param {int[][]} DATA shadowed angle pairs
	 */
    ROT.FOV.DiscreteShadowcasting.prototype._visibleCoords = function(A, B, blocks, DATA) {
        if (A < 0) {
            var v1 = arguments.callee(0, B, blocks, DATA);
            var v2 = arguments.callee(360+A, 360, blocks, DATA);
            return v1 || v2;
        }

        var index = 0;
        while (index < DATA.length && DATA[index] < A) { index++; }

        if (index == DATA.length) { /* completely new shadow */
            if (blocks) { DATA.push(A, B); }
            return true;
        }

        var count = 0;

        if (index % 2) { /* this shadow starts in an existing shadow, or within its ending boundary */
            while (index < DATA.length && DATA[index] < B) {
                index++;
                count++;
            }

            if (count == 0) { return false; }

            if (blocks) {
                if (count % 2) {
                    DATA.splice(index-count, count, B);
                } else {
                    DATA.splice(index-count, count);
                }
            }

            return true;

        } else { /* this shadow starts outside an existing shadow, or within a starting boundary */
            while (index < DATA.length && DATA[index] < B) {
                index++;
                count++;
            }

            /* visible when outside an existing shadow, or when overlapping */
            if (A == DATA[index-count] && count == 1) { return false; }

            if (blocks) {
                if (count % 2) {
                    DATA.splice(index-count, count, A);
                } else {
                    DATA.splice(index-count, count, A, B);
                }
            }

            return true;
        }
    };
    /**
	 * @class Precise shadowcasting algorithm
	 * @augments ROT.FOV
	 */
    ROT.FOV.PreciseShadowcasting = function(lightPassesCallback, options) {
        ROT.FOV.call(this, lightPassesCallback, options);
    };
    ROT.FOV.PreciseShadowcasting.extend(ROT.FOV);

    /**
	 * @see ROT.FOV#compute
	 */
    ROT.FOV.PreciseShadowcasting.prototype.compute = function(x, y, R, callback) {
        /* this place is always visible */
        callback(x, y, 0, 1);

        /* standing in a dark place. FIXME is this a good idea?  */
        if (!this._lightPasses(x, y)) { return; }

        /* list of all shadows */
        var SHADOWS = [];

        var cx, cy, blocks, A1, A2, visibility;

        /* analyze surrounding cells in concentric rings, starting from the center */
        for (var r=1; r<=R; r++) {
            var neighbors = this._getCircle(x, y, r);
            var neighborCount = neighbors.length;

            for (var i=0;i<neighborCount;i++) {
                cx = neighbors[i][0];
                cy = neighbors[i][1];
                /* shift half-an-angle backwards to maintain consistency of 0-th cells */
                A1 = [i ? 2*i-1 : 2*neighborCount-1, 2*neighborCount];
                A2 = [2*i+1, 2*neighborCount];

                blocks = !this._lightPasses(cx, cy);
                visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);
                if (visibility) { callback(cx, cy, r, visibility); }

                if (SHADOWS.length == 2 && SHADOWS[0][0] == 0 && SHADOWS[1][0] == SHADOWS[1][1]) { return; } /* cutoff? */

            } /* for all cells in this ring */
        } /* for all rings */
    };

    /**
	 * @param {int[2]} A1 arc start
	 * @param {int[2]} A2 arc end
	 * @param {bool} blocks Does current arc block visibility?
	 * @param {int[][]} SHADOWS list of active shadows
	 */
    ROT.FOV.PreciseShadowcasting.prototype._checkVisibility = function(A1, A2, blocks, SHADOWS) {
        if (A1[0] > A2[0]) { /* split into two sub-arcs */
            var v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);
            var v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);
            return (v1+v2)/2;
        }

        /* index1: first shadow >= A1 */
        var index1 = 0, edge1 = false;
        while (index1 < SHADOWS.length) {
            var old = SHADOWS[index1];
            var diff = old[0]*A1[1] - A1[0]*old[1];
            if (diff >= 0) { /* old >= A1 */
                if (diff == 0 && !(index1 % 2)) { edge1 = true; }
                break;
            }
            index1++;
        }

        /* index2: last shadow <= A2 */
        var index2 = SHADOWS.length, edge2 = false;
        while (index2--) {
            var old = SHADOWS[index2];
            var diff = A2[0]*old[1] - old[0]*A2[1];
            if (diff >= 0) { /* old <= A2 */
                if (diff == 0 && (index2 % 2)) { edge2 = true; }
                break;
            }
        }

        var visible = true;
        if (index1 == index2 && (edge1 || edge2)) {  /* subset of existing shadow, one of the edges match */
            visible = false;
        } else if (edge1 && edge2 && index1+1==index2 && (index2 % 2)) { /* completely equivalent with existing shadow */
            visible = false;
        } else if (index1 > index2 && (index1 % 2)) { /* subset of existing shadow, not touching */
            visible = false;
        }

        if (!visible) { return 0; } /* fast case: not visible */

        var visibleLength, P;

        /* compute the length of visible arc, adjust list of shadows (if blocking) */
        var remove = index2-index1+1;
        if (remove % 2) {
            if (index1 % 2) { /* first edge within existing shadow, second outside */
                var P = SHADOWS[index1];
                visibleLength = (A2[0]*P[1] - P[0]*A2[1]) / (P[1] * A2[1]);
                if (blocks) { SHADOWS.splice(index1, remove, A2); }
            } else { /* second edge within existing shadow, first outside */
                var P = SHADOWS[index2];
                visibleLength = (P[0]*A1[1] - A1[0]*P[1]) / (A1[1] * P[1]);
                if (blocks) { SHADOWS.splice(index1, remove, A1); }
            }
        } else {
            if (index1 % 2) { /* both edges within existing shadows */
                var P1 = SHADOWS[index1];
                var P2 = SHADOWS[index2];
                visibleLength = (P2[0]*P1[1] - P1[0]*P2[1]) / (P1[1] * P2[1]);
                if (blocks) { SHADOWS.splice(index1, remove); }
            } else { /* both edges outside existing shadows */
                if (blocks) { SHADOWS.splice(index1, remove, A1, A2); }
                return 1; /* whole arc visible! */
            }
        }

        var arcLength = (A2[0]*A1[1] - A1[0]*A2[1]) / (A1[1] * A2[1]);

        return visibleLength/arcLength;
    };
    /**
	 * @class Recursive shadowcasting algorithm
	 * Currently only supports 4/8 topologies, not hexagonal.
	 * Based on Peter Harkins' implementation of Björn Bergström's algorithm described here: http://www.roguebasin.com/index.php?title=FOV_using_recursive_shadowcasting
	 * @augments ROT.FOV
	 */
    ROT.FOV.RecursiveShadowcasting = function(lightPassesCallback, options) {
        ROT.FOV.call(this, lightPassesCallback, options);
    };
    ROT.FOV.RecursiveShadowcasting.extend(ROT.FOV);

    /** Octants used for translating recursive shadowcasting offsets */
    ROT.FOV.RecursiveShadowcasting.OCTANTS = [
        [-1,  0,  0,  1],
        [ 0, -1,  1,  0],
        [ 0, -1, -1,  0],
        [-1,  0,  0, -1],
        [ 1,  0,  0, -1],
        [ 0,  1, -1,  0],
        [ 0,  1,  1,  0],
        [ 1,  0,  0,  1]
    ];

    /**
	 * Compute visibility for a 360-degree circle
	 * @param {int} x
	 * @param {int} y
	 * @param {int} R Maximum visibility radius
	 * @param {function} callback
	 */
    ROT.FOV.RecursiveShadowcasting.prototype.compute = function(x, y, R, callback) {
        //You can always see your own tile
        callback(x, y, 0, 1);
        for(var i = 0; i < ROT.FOV.RecursiveShadowcasting.OCTANTS.length; i++) {
            this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[i], R, callback);
        }
    };

    /**
	 * Compute visibility for a 180-degree arc
	 * @param {int} x
	 * @param {int} y
	 * @param {int} R Maximum visibility radius
	 * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
	 * @param {function} callback
	 */
    ROT.FOV.RecursiveShadowcasting.prototype.compute180 = function(x, y, R, dir, callback) {
        //You can always see your own tile
        callback(x, y, 0, 1);
        var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 180 degrees
        var nextPreviousOctant = (dir - 2 + 8) % 8; //Need to retrieve the previous two octants to render a full 180 degrees
        var nextOctant = (dir+ 1 + 8) % 8; //Need to grab to next octant to render a full 180 degrees
        this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[nextPreviousOctant], R, callback);
        this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[previousOctant], R, callback);
        this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[dir], R, callback);
        this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[nextOctant], R, callback);
    };

    /**
	 * Compute visibility for a 90-degree arc
	 * @param {int} x
	 * @param {int} y
	 * @param {int} R Maximum visibility radius
	 * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
	 * @param {function} callback
	 */
    ROT.FOV.RecursiveShadowcasting.prototype.compute90 = function(x, y, R, dir, callback) {
        //You can always see your own tile
        callback(x, y, 0, 1);
        var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 90 degrees
        this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[dir], R, callback);
        this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[previousOctant], R, callback);
    };

    /**
	 * Render one octant (45-degree arc) of the viewshed
	 * @param {int} x
	 * @param {int} y
	 * @param {int} octant Octant to be rendered
	 * @param {int} R Maximum visibility radius
	 * @param {function} callback
	 */
    ROT.FOV.RecursiveShadowcasting.prototype._renderOctant = function(x, y, octant, R, callback) {
        //Radius incremented by 1 to provide same coverage area as other shadowcasting radiuses
        this._castVisibility(x, y, 1, 1.0, 0.0, R + 1, octant[0], octant[1], octant[2], octant[3], callback);
    };

    /**
	 * Actually calculates the visibility
	 * @param {int} startX The starting X coordinate
	 * @param {int} startY The starting Y coordinate
	 * @param {int} row The row to render
	 * @param {float} visSlopeStart The slope to start at
	 * @param {float} visSlopeEnd The slope to end at
	 * @param {int} radius The radius to reach out to
	 * @param {int} xx
	 * @param {int} xy
	 * @param {int} yx
	 * @param {int} yy
	 * @param {function} callback The callback to use when we hit a block that is visible
	 */
    ROT.FOV.RecursiveShadowcasting.prototype._castVisibility = function(startX, startY, row, visSlopeStart, visSlopeEnd, radius, xx, xy, yx, yy, callback) {
        if(visSlopeStart < visSlopeEnd) { return; }
        for(var i = row; i <= radius; i++) {
            var dx = -i - 1;
            var dy = -i;
            var blocked = false;
            var newStart = 0;

            //'Row' could be column, names here assume octant 0 and would be flipped for half the octants
            while(dx <= 0) {
                dx += 1;

                //Translate from relative coordinates to map coordinates
                var mapX = startX + dx * xx + dy * xy;
                var mapY = startY + dx * yx + dy * yy;

                //Range of the row
                var slopeStart = (dx - 0.5) / (dy + 0.5);
                var slopeEnd = (dx + 0.5) / (dy - 0.5);

                //Ignore if not yet at left edge of Octant
                if(slopeEnd > visSlopeStart) { continue; }

                //Done if past right edge
                if(slopeStart < visSlopeEnd) { break; }

                //If it's in range, it's visible
                if((dx * dx + dy * dy) < (radius * radius)) {
                    callback(mapX, mapY, i, 1);
                }

                if(!blocked) {
                    //If tile is a blocking tile, cast around it
                    if(!this._lightPasses(mapX, mapY) && i < radius) {
                        blocked = true;
                        this._castVisibility(startX, startY, i + 1, visSlopeStart, slopeStart, radius, xx, xy, yx, yy, callback);
                        newStart = slopeEnd;
                    }
                } else {
                    //Keep narrowing if scanning across a block
                    if(!this._lightPasses(mapX, mapY)) {
                        newStart = slopeEnd;
                        continue;
                    }

                    //Block has ended
                    blocked = false;
                    visSlopeStart = newStart;
                }
            }
            if(blocked) { break; }
        }
    };
    /**
	 * @namespace Color operations
	 */
    ROT.Color = {
        fromString: function(str) {
            var cached, r;
            if (str in this._cache) {
                cached = this._cache[str];
            } else {
                if (str.charAt(0) == "#") { /* hex rgb */

                    var values = str.match(/[0-9a-f]/gi).map(function(x) { return parseInt(x, 16); });
                    if (values.length == 3) {
                        cached = values.map(function(x) { return x*17; });
                    } else {
                        for (var i=0;i<3;i++) {
                            values[i+1] += 16*values[i];
                            values.splice(i, 1);
                        }
                        cached = values;
                    }

                } else if ((r = str.match(/rgb\(([0-9, ]+)\)/i))) { /* decimal rgb */
                    cached = r[1].split(/\s*,\s*/).map(function(x) { return parseInt(x); });
                } else { /* html name */
                    cached = [0, 0, 0];
                }

                this._cache[str] = cached;
            }

            return cached.slice();
        },

        /**
		 * Add two or more colors
		 * @param {number[]} color1
		 * @param {number[]} color2
		 * @returns {number[]}
		 */
        add: function(color1, color2) {
            var result = color1.slice();
            for (var i=0;i<3;i++) {
                for (var j=1;j<arguments.length;j++) {
                    result[i] += arguments[j][i];
                }
            }
            return result;
        },

        /**
		 * Add two or more colors, MODIFIES FIRST ARGUMENT
		 * @param {number[]} color1
		 * @param {number[]} color2
		 * @returns {number[]}
		 */
        add_: function(color1, color2) {
            for (var i=0;i<3;i++) {
                for (var j=1;j<arguments.length;j++) {
                    color1[i] += arguments[j][i];
                }
            }
            return color1;
        },

        /**
		 * Multiply (mix) two or more colors
		 * @param {number[]} color1
		 * @param {number[]} color2
		 * @returns {number[]}
		 */
        multiply: function(color1, color2) {
            var result = color1.slice();
            for (var i=0;i<3;i++) {
                for (var j=1;j<arguments.length;j++) {
                    result[i] *= arguments[j][i] / 255;
                }
                result[i] = Math.round(result[i]);
            }
            return result;
        },

        /**
		 * Multiply (mix) two or more colors, MODIFIES FIRST ARGUMENT
		 * @param {number[]} color1
		 * @param {number[]} color2
		 * @returns {number[]}
		 */
        multiply_: function(color1, color2) {
            for (var i=0;i<3;i++) {
                for (var j=1;j<arguments.length;j++) {
                    color1[i] *= arguments[j][i] / 255;
                }
                color1[i] = Math.round(color1[i]);
            }
            return color1;
        },

        /**
		 * Interpolate (blend) two colors with a given factor
		 * @param {number[]} color1
		 * @param {number[]} color2
		 * @param {float} [factor=0.5] 0..1
		 * @returns {number[]}
		 */
        interpolate: function(color1, color2, factor) {
            if (arguments.length < 3) { factor = 0.5; }
            var result = color1.slice();
            for (var i=0;i<3;i++) {
                result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
            }
            return result;
        },

        /**
		 * Interpolate (blend) two colors with a given factor in HSL mode
		 * @param {number[]} color1
		 * @param {number[]} color2
		 * @param {float} [factor=0.5] 0..1
		 * @returns {number[]}
		 */
        interpolateHSL: function(color1, color2, factor) {
            if (arguments.length < 3) { factor = 0.5; }
            var hsl1 = this.rgb2hsl(color1);
            var hsl2 = this.rgb2hsl(color2);
            for (var i=0;i<3;i++) {
                hsl1[i] += factor*(hsl2[i]-hsl1[i]);
            }
            return this.hsl2rgb(hsl1);
        },

        /**
		 * Create a new random color based on this one
		 * @param {number[]} color
		 * @param {number[]} diff Set of standard deviations
		 * @returns {number[]}
		 */
        randomize: function(color, diff) {
            if (!(diff instanceof Array)) { diff = Math.round(ROT.RNG.getNormal(0, diff)); }
            var result = color.slice();
            for (var i=0;i<3;i++) {
                result[i] += (diff instanceof Array ? Math.round(ROT.RNG.getNormal(0, diff[i])) : diff);
            }
            return result;
        },

        /**
		 * Converts an RGB color value to HSL. Expects 0..255 inputs, produces 0..1 outputs.
		 * @param {number[]} color
		 * @returns {number[]}
		 */
        rgb2hsl: function(color) {
            var r = color[0]/255;
            var g = color[1]/255;
            var b = color[2]/255;

            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
                switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return [h, s, l];
        },

        /**
		 * Converts an HSL color value to RGB. Expects 0..1 inputs, produces 0..255 outputs.
		 * @param {number[]} color
		 * @returns {number[]}
		 */
        hsl2rgb: function(color) {
            var l = color[2];

            if (color[1] == 0) {
                l = Math.round(l*255);
                return [l, l, l];
            } else {
                var hue2rgb = function(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };

                var s = color[1];
                var q = (l < 0.5 ? l * (1 + s) : l + s - l * s);
                var p = 2 * l - q;
                var r = hue2rgb(p, q, color[0] + 1/3);
                var g = hue2rgb(p, q, color[0]);
                var b = hue2rgb(p, q, color[0] - 1/3);
                return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
            }
        },

        toRGB: function(color) {
            return "rgb(" + this._clamp(color[0]) + "," + this._clamp(color[1]) + "," + this._clamp(color[2]) + ")";
        },

        toHex: function(color) {
            var parts = [];
            for (var i=0;i<3;i++) {
                parts.push(this._clamp(color[i]).toString(16).lpad("0", 2));
            }
            return "#" + parts.join("");
        },

        _clamp: function(num) {
            if (num < 0) {
                return 0;
            } else if (num > 255) {
                return 255;
            } else {
                return num;
            }
        },

        _cache: {
            "black": [0,0,0],
            "navy": [0,0,128],
            "darkblue": [0,0,139],
            "mediumblue": [0,0,205],
            "blue": [0,0,255],
            "darkgreen": [0,100,0],
            "green": [0,128,0],
            "teal": [0,128,128],
            "darkcyan": [0,139,139],
            "deepskyblue": [0,191,255],
            "darkturquoise": [0,206,209],
            "mediumspringgreen": [0,250,154],
            "lime": [0,255,0],
            "springgreen": [0,255,127],
            "aqua": [0,255,255],
            "cyan": [0,255,255],
            "midnightblue": [25,25,112],
            "dodgerblue": [30,144,255],
            "forestgreen": [34,139,34],
            "seagreen": [46,139,87],
            "darkslategray": [47,79,79],
            "darkslategrey": [47,79,79],
            "limegreen": [50,205,50],
            "mediumseagreen": [60,179,113],
            "turquoise": [64,224,208],
            "royalblue": [65,105,225],
            "steelblue": [70,130,180],
            "darkslateblue": [72,61,139],
            "mediumturquoise": [72,209,204],
            "indigo": [75,0,130],
            "darkolivegreen": [85,107,47],
            "cadetblue": [95,158,160],
            "cornflowerblue": [100,149,237],
            "mediumaquamarine": [102,205,170],
            "dimgray": [105,105,105],
            "dimgrey": [105,105,105],
            "slateblue": [106,90,205],
            "olivedrab": [107,142,35],
            "slategray": [112,128,144],
            "slategrey": [112,128,144],
            "lightslategray": [119,136,153],
            "lightslategrey": [119,136,153],
            "mediumslateblue": [123,104,238],
            "lawngreen": [124,252,0],
            "chartreuse": [127,255,0],
            "aquamarine": [127,255,212],
            "maroon": [128,0,0],
            "purple": [128,0,128],
            "olive": [128,128,0],
            "gray": [128,128,128],
            "grey": [128,128,128],
            "skyblue": [135,206,235],
            "lightskyblue": [135,206,250],
            "blueviolet": [138,43,226],
            "darkred": [139,0,0],
            "darkmagenta": [139,0,139],
            "saddlebrown": [139,69,19],
            "darkseagreen": [143,188,143],
            "lightgreen": [144,238,144],
            "mediumpurple": [147,112,216],
            "darkviolet": [148,0,211],
            "palegreen": [152,251,152],
            "darkorchid": [153,50,204],
            "yellowgreen": [154,205,50],
            "sienna": [160,82,45],
            "brown": [165,42,42],
            "darkgray": [169,169,169],
            "darkgrey": [169,169,169],
            "lightblue": [173,216,230],
            "greenyellow": [173,255,47],
            "paleturquoise": [175,238,238],
            "lightsteelblue": [176,196,222],
            "powderblue": [176,224,230],
            "firebrick": [178,34,34],
            "darkgoldenrod": [184,134,11],
            "mediumorchid": [186,85,211],
            "rosybrown": [188,143,143],
            "darkkhaki": [189,183,107],
            "silver": [192,192,192],
            "mediumvioletred": [199,21,133],
            "indianred": [205,92,92],
            "peru": [205,133,63],
            "chocolate": [210,105,30],
            "tan": [210,180,140],
            "lightgray": [211,211,211],
            "lightgrey": [211,211,211],
            "palevioletred": [216,112,147],
            "thistle": [216,191,216],
            "orchid": [218,112,214],
            "goldenrod": [218,165,32],
            "crimson": [220,20,60],
            "gainsboro": [220,220,220],
            "plum": [221,160,221],
            "burlywood": [222,184,135],
            "lightcyan": [224,255,255],
            "lavender": [230,230,250],
            "darksalmon": [233,150,122],
            "violet": [238,130,238],
            "palegoldenrod": [238,232,170],
            "lightcoral": [240,128,128],
            "khaki": [240,230,140],
            "aliceblue": [240,248,255],
            "honeydew": [240,255,240],
            "azure": [240,255,255],
            "sandybrown": [244,164,96],
            "wheat": [245,222,179],
            "beige": [245,245,220],
            "whitesmoke": [245,245,245],
            "mintcream": [245,255,250],
            "ghostwhite": [248,248,255],
            "salmon": [250,128,114],
            "antiquewhite": [250,235,215],
            "linen": [250,240,230],
            "lightgoldenrodyellow": [250,250,210],
            "oldlace": [253,245,230],
            "red": [255,0,0],
            "fuchsia": [255,0,255],
            "magenta": [255,0,255],
            "deeppink": [255,20,147],
            "orangered": [255,69,0],
            "tomato": [255,99,71],
            "hotpink": [255,105,180],
            "coral": [255,127,80],
            "darkorange": [255,140,0],
            "lightsalmon": [255,160,122],
            "orange": [255,165,0],
            "lightpink": [255,182,193],
            "pink": [255,192,203],
            "gold": [255,215,0],
            "peachpuff": [255,218,185],
            "navajowhite": [255,222,173],
            "moccasin": [255,228,181],
            "bisque": [255,228,196],
            "mistyrose": [255,228,225],
            "blanchedalmond": [255,235,205],
            "papayawhip": [255,239,213],
            "lavenderblush": [255,240,245],
            "seashell": [255,245,238],
            "cornsilk": [255,248,220],
            "lemonchiffon": [255,250,205],
            "floralwhite": [255,250,240],
            "snow": [255,250,250],
            "yellow": [255,255,0],
            "lightyellow": [255,255,224],
            "ivory": [255,255,240],
            "white": [255,255,255]
        }
    };
    /**
	 * @class Lighting computation, based on a traditional FOV for multiple light sources and multiple passes.
	 * @param {function} reflectivityCallback Callback to retrieve cell reflectivity (0..1)
	 * @param {object} [options]
	 * @param {int} [options.passes=1] Number of passes. 1 equals to simple FOV of all light sources, >1 means a *highly simplified* radiosity-like algorithm.
	 * @param {int} [options.emissionThreshold=100] Cells with emissivity > threshold will be treated as light source in the next pass.
	 * @param {int} [options.range=10] Max light range
	 */
    ROT.Lighting = function(reflectivityCallback, options) {
        this._reflectivityCallback = reflectivityCallback;
        this._options = {
            passes: 1,
            emissionThreshold: 100,
            range: 10
        };
        this._fov = null;

        this._lights = {};
        this._reflectivityCache = {};
        this._fovCache = {};

        this.setOptions(options);
    };

    /**
	 * Adjust options at runtime
	 * @see ROT.Lighting
	 * @param {object} [options]
	 */
    ROT.Lighting.prototype.setOptions = function(options) {
        for (var p in options) { this._options[p] = options[p]; }
        if (options && options.range) { this.reset(); }
        return this;
    };

    /**
	 * Set the used Field-Of-View algo
	 * @param {ROT.FOV} fov
	 */
    ROT.Lighting.prototype.setFOV = function(fov) {
        this._fov = fov;
        this._fovCache = {};
        return this;
    };

    /**
	 * Set (or remove) a light source
	 * @param {int} x
	 * @param {int} y
	 * @param {null || string || number[3]} color
	 */
    ROT.Lighting.prototype.setLight = function(x, y, color) {
	  var key = x + "," + y;

	  if (color) {
	    this._lights[key] = (typeof(color) == "string" ? ROT.Color.fromString(color) : color);
	  } else {
	    delete this._lights[key];
	  }
	  return this;
    };

    /**
	 * Remove all light sources
	 */
    ROT.Lighting.prototype.clearLights = function() {
	    this._lights = {};
    };

    /**
	 * Reset the pre-computed topology values. Call whenever the underlying map changes its light-passability.
	 */
    ROT.Lighting.prototype.reset = function() {
        this._reflectivityCache = {};
        this._fovCache = {};

        return this;
    };

    /**
	 * Compute the lighting
	 * @param {function} lightingCallback Will be called with (x, y, color) for every lit cell
	 */
    ROT.Lighting.prototype.compute = function(lightingCallback) {
        var doneCells = {};
        var emittingCells = {};
        var litCells = {};

        for (var key in this._lights) { /* prepare emitters for first pass */
            var light = this._lights[key];
            emittingCells[key] = [0, 0, 0];
            ROT.Color.add_(emittingCells[key], light);
        }

        for (var i=0;i<this._options.passes;i++) { /* main loop */
            this._emitLight(emittingCells, litCells, doneCells);
            if (i+1 == this._options.passes) { continue; } /* not for the last pass */
            emittingCells = this._computeEmitters(litCells, doneCells);
        }

        for (var litKey in litCells) { /* let the user know what and how is lit */
            var parts = litKey.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            lightingCallback(x, y, litCells[litKey]);
        }

        return this;
    };

    /**
	 * Compute one iteration from all emitting cells
	 * @param {object} emittingCells These emit light
	 * @param {object} litCells Add projected light to these
	 * @param {object} doneCells These already emitted, forbid them from further calculations
	 */
    ROT.Lighting.prototype._emitLight = function(emittingCells, litCells, doneCells) {
        for (var key in emittingCells) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this._emitLightFromCell(x, y, emittingCells[key], litCells);
            doneCells[key] = 1;
        }
        return this;
    };

    /**
	 * Prepare a list of emitters for next pass
	 * @param {object} litCells
	 * @param {object} doneCells
	 * @returns {object}
	 */
    ROT.Lighting.prototype._computeEmitters = function(litCells, doneCells) {
        var result = {};

        for (var key in litCells) {
            if (key in doneCells) { continue; } /* already emitted */

            var color = litCells[key];

            if (key in this._reflectivityCache) {
                var reflectivity = this._reflectivityCache[key];
            } else {
                var parts = key.split(",");
                var x = parseInt(parts[0]);
                var y = parseInt(parts[1]);
                var reflectivity = this._reflectivityCallback(x, y);
                this._reflectivityCache[key] = reflectivity;
            }

            if (reflectivity == 0) { continue; } /* will not reflect at all */

            /* compute emission color */
            var emission = [];
            var intensity = 0;
            for (var i=0;i<3;i++) {
                var part = Math.round(color[i]*reflectivity);
                emission[i] = part;
                intensity += part;
            }
            if (intensity > this._options.emissionThreshold) { result[key] = emission; }
        }

        return result;
    };

    /**
	 * Compute one iteration from one cell
	 * @param {int} x
	 * @param {int} y
	 * @param {number[]} color
	 * @param {object} litCells Cell data to by updated
	 */
    ROT.Lighting.prototype._emitLightFromCell = function(x, y, color, litCells) {
        var key = x+","+y;
        if (key in this._fovCache) {
            var fov = this._fovCache[key];
        } else {
            var fov = this._updateFOV(x, y);
        }

        for (var fovKey in fov) {
            var formFactor = fov[fovKey];

            if (fovKey in litCells) { /* already lit */
                var result = litCells[fovKey];
            } else { /* newly lit */
                var result = [0, 0, 0];
                litCells[fovKey] = result;
            }

            for (var i=0;i<3;i++) { result[i] += Math.round(color[i]*formFactor); } /* add light color */
        }

        return this;
    };

    /**
	 * Compute FOV ("form factor") for a potential light source at [x,y]
	 * @param {int} x
	 * @param {int} y
	 * @returns {object}
	 */
    ROT.Lighting.prototype._updateFOV = function(x, y) {
        var key1 = x+","+y;
        var cache = {};
        this._fovCache[key1] = cache;
        var range = this._options.range;
        var cb = function(x, y, r, vis) {
            var key2 = x+","+y;
            var formFactor = vis * (1-r/range);
            if (formFactor == 0) { return; }
            cache[key2] = formFactor;
        };
        this._fov.compute(x, y, range, cb.bind(this));

        return cache;
    };
    /**
	 * @class Abstract pathfinder
	 * @param {int} toX Target X coord
	 * @param {int} toY Target Y coord
	 * @param {function} passableCallback Callback to determine map passability
	 * @param {object} [options]
	 * @param {int} [options.topology=8]
	 */
    ROT.Path = function(toX, toY, passableCallback, options) {
        this._toX = toX;
        this._toY = toY;
        this._fromX = null;
        this._fromY = null;
        this._passableCallback = passableCallback;
        this._options = {
            topology: 8
        };
        for (var p in options) { this._options[p] = options[p]; }

        this._dirs = ROT.DIRS[this._options.topology];
        if (this._options.topology == 8) { /* reorder dirs for more aesthetic result (vertical/horizontal first) */
            this._dirs = [
                this._dirs[0],
                this._dirs[2],
                this._dirs[4],
                this._dirs[6],
                this._dirs[1],
                this._dirs[3],
                this._dirs[5],
                this._dirs[7]
            ];
        }
    };

    /**
	 * Compute a path from a given point
	 * @param {int} fromX
	 * @param {int} fromY
	 * @param {function} callback Will be called for every path item with arguments "x" and "y"
	 */
    ROT.Path.prototype.compute = function(fromX, fromY, callback) {
    };

    ROT.Path.prototype._getNeighbors = function(cx, cy) {
        var result = [];
        for (var i=0;i<this._dirs.length;i++) {
            var dir = this._dirs[i];
            var x = cx + dir[0];
            var y = cy + dir[1];

            if (!this._passableCallback(x, y)) { continue; }
            result.push([x, y]);
        }

        return result;
    };
    /**
	 * @class Simplified Dijkstra's algorithm: all edges have a value of 1
	 * @augments ROT.Path
	 * @see ROT.Path
	 */
    ROT.Path.Dijkstra = function(toX, toY, passableCallback, options) {
        ROT.Path.call(this, toX, toY, passableCallback, options);

        this._computed = {};
        this._todo = [];
        this._add(toX, toY, null);
    };
    ROT.Path.Dijkstra.extend(ROT.Path);

    /**
	 * Compute a path from a given point
	 * @see ROT.Path#compute
	 */
    ROT.Path.Dijkstra.prototype.compute = function(fromX, fromY, callback) {
        var key = fromX+","+fromY;
        if (!(key in this._computed)) { this._compute(fromX, fromY); }
        if (!(key in this._computed)) { return; }

        var item = this._computed[key];
        while (item) {
            callback(item.x, item.y);
            item = item.prev;
        }
    };

    /**
	 * Compute a non-cached value
	 */
    ROT.Path.Dijkstra.prototype._compute = function(fromX, fromY) {
        while (this._todo.length) {
            var item = this._todo.shift();
            if (item.x == fromX && item.y == fromY) { return; }

            var neighbors = this._getNeighbors(item.x, item.y);

            for (var i=0;i<neighbors.length;i++) {
                var neighbor = neighbors[i];
                var x = neighbor[0];
                var y = neighbor[1];
                var id = x+","+y;
                if (id in this._computed) { continue; } /* already done */
                this._add(x, y, item);
            }
        }
    };

    ROT.Path.Dijkstra.prototype._add = function(x, y, prev) {
        var obj = {
            x: x,
            y: y,
            prev: prev
        };
        this._computed[x+","+y] = obj;
        this._todo.push(obj);
    };
    /**
	 * @class Simplified A* algorithm: all edges have a value of 1
	 * @augments ROT.Path
	 * @see ROT.Path
	 */
    ROT.Path.AStar = function(toX, toY, passableCallback, options) {
        ROT.Path.call(this, toX, toY, passableCallback, options);

        this._todo = [];
        this._done = {};
        this._fromX = null;
        this._fromY = null;
    };
    ROT.Path.AStar.extend(ROT.Path);

    /**
	 * Compute a path from a given point
	 * @see ROT.Path#compute
	 */
    ROT.Path.AStar.prototype.compute = function(fromX, fromY, callback) {
        this._todo = [];
        this._done = {};
        this._fromX = fromX;
        this._fromY = fromY;
        this._add(this._toX, this._toY, null);

        while (this._todo.length) {
            var item = this._todo.shift();
            if (item.x == fromX && item.y == fromY) { break; }
            var neighbors = this._getNeighbors(item.x, item.y);

            for (var i=0;i<neighbors.length;i++) {
                var neighbor = neighbors[i];
                var x = neighbor[0];
                var y = neighbor[1];
                var id = x+","+y;
                if (id in this._done) { continue; }
                this._add(x, y, item);
            }
        }

        var item = this._done[fromX+","+fromY];
        if (!item) { return; }

        while (item) {
            callback(item.x, item.y);
            item = item.prev;
        }
    };

    ROT.Path.AStar.prototype._add = function(x, y, prev) {
        var h = this._distance(x, y);
        var obj = {
            x: x,
            y: y,
            prev: prev,
            g: (prev ? prev.g+1 : 0),
            h: h
        };
        this._done[x+","+y] = obj;

        /* insert into priority queue */

        var f = obj.g + obj.h;
        for (var i=0;i<this._todo.length;i++) {
            var item = this._todo[i];
            var itemF = item.g + item.h;
            if (f < itemF || (f == itemF && h < item.h)) {
                this._todo.splice(i, 0, obj);
                return;
            }
        }

        this._todo.push(obj);
    };

    ROT.Path.AStar.prototype._distance = function(x, y) {
        switch (this._options.topology) {
        case 4:
            return (Math.abs(x-this._fromX) + Math.abs(y-this._fromY));
            break;

        case 6:
            var dx = Math.abs(x - this._fromX);
            var dy = Math.abs(y - this._fromY);
            return dy + Math.max(0, (dx-dy)/2);
            break;

        case 8:
            return Math.max(Math.abs(x-this._fromX), Math.abs(y-this._fromY));
            break;
        }

	        throw new Error("Illegal topology");
    };

    var options = {
	    fontFamily: '"Courier New", Courier, monospace',
	    fontSize: 30,
	    spacing: 0.9,
    };

    const sun = 1;

    const map = [];
    map.width = 100;
    map.height = 100;
    map.centre = { x: map.width * 0.5 , y: map.height * 0.5 };

    const actors = [];
    const centre = { x: 0, y: 0 };
    const noise = new ROT.Noise.Simplex();

    function Glyph( ch, r, g, b ) {
	    return {
	    	ch: ch,
	    	r: r,
	    	g: g,
	    	b: b
	    }
    }

    const glyphs = {
	    PC: Glyph( '👤', 245, 3, 255 ),
	    VOID: Glyph( ' ', 0, 0, 0 ),
	    GRASS1: Glyph( "'", 36, 120, 0 ),
	    GRASS2: Glyph( '"', 36, 120, 0 ),
	    PAVING: Glyph( '⬛', 40, 40, 40 ),
	    WALL: Glyph( '⏹', 164, 164, 164 ),
	    WATER: Glyph( "〜", 120, 154, 235 ),
	    TREE: Glyph( '🌳', 36, 120, 0 ),
    };

    const blocksmove = [ glyphs.PC, glyphs.NPC, glyphs.VOID, glyphs.WALL, glyphs.TREE ];

    function Tile( glyph, x, y ) {
	    return {
	    	glyph: glyph,
	    	r: 1,
	    	g: 1,
	    	b: 1,
	    	x: x,
	    	y: y,
	    	things: [],
	    }
    }

    function Thing( type, glyph, x, y, z ) {
	    return {
	    	type: type,
	    	glyph: glyph,
	    	tile: tileAt( x, y ),
	    	z: z
	    }
    }

    function Actor( glyph, x, y, z ) {
	    var actor = Thing( Actor, glyph, x, y, z );
	    actors.push( actor );
	    return actor
    }

    function act( actor ) {

    }

    for ( var y = map.height; y--; ) {
	    for ( var x = map.width; x--; ) {
	    	map[ y * map.width + x ] = Tile( glyphs.VOID, x, y );
	    }
    }

    function tileAt( x, y ) {
	    if ( x < 0 || y < 0 || x >= map.width || y >= map.height ) return null
	    return map[ y * map.width + x ]
    }

    function contains( tile, glyphlist ) {
	    if ( glyphlist.indexOf( tile.glyph ) > -1 ) return true
	    var things = tile.things;
	    for ( var i = things.length; i--; ) {
	    	if ( glyphlist.indexOf( things[ i ].glyph ) > -1 ) return true
	    }
	    return false
    }

    function push( thing, tile ) {
	    pop( thing );
	    thing.tile = tile;
	    var things = tile.things;
	    var i = things.indexOf( thing );
	    if ( i > -1 ) return
	    things.splice( sortedIndex( things, thing.z ), 0, thing );
    }

    function pop( thing ) {
	    if ( ! thing.tile ) return null
	    var things = thing.tile.things;
	    var i = things.indexOf( thing );
	    if ( i > -1 ) things.splice( i, 1 );
	    thing.tile = null;
    }

    function sortedIndex( things, z ) {
	    var low = 0;
	    var high = things.length;
	    while ( low < high ) {
	    	var mid = ( low + high ) >>> 1;
	    	if ( things[ mid ].z > z ) low = mid + 1;
	    	else high = mid;
	    }
	    return low
    }

    const drawinfo = [ 0/*x*/, 1/*y*/, 2/*ch*/, 3/*colour*/ ];

    function next() {
	    for ( var i = actors.length; i--; ) act( actors[ i ] );
	    render();
	    input( function() { setTimeout( next, 0 ); } );
    }

    function render() {
	    display._backend._context.fillStyle = 'black';
	    display._backend._context.fillRect( 0, 0, window.innerWidth, window.innerHeight );
	    var focus = pc.tile;
	    var minx = Math.min( Math.max( focus.x - centre.x, 0 ), map.width - options.width );
	    var miny = Math.min( Math.max( focus.y - centre.y, 0 ), map.height - options.height );
	    var endx = minx + options.width;
	    var endy = miny + options.height;
	    var y = miny;
	    while ( y < endy ) {
	    	drawinfo[ 1 ] = ( y - miny );
	    	var x = minx;
	    	while ( x < endx ) {
	    		drawinfo[ 0 ] = ( x - minx );
	    		var tile = tileAt( x, y );
	    		var glyph = tile.glyph;
	    		drawinfo[ 2 ] = glyph.ch;
	    		drawinfo[ 3 ] = rgb( glyph.r * tile.r, glyph.g * tile.g, glyph.b * tile.b, sun );
	    		display._backend._drawNoCache( drawinfo );
	    		var things = tile.things;
	    		for ( var i = things.length; i--; ) {
	    			var thing = things[ i ];
	    			glyph = thing.glyph;
	    			drawinfo[ 2 ] = glyph.ch;
	    			drawinfo[ 3 ] = rgb( glyph.r, glyph.g, glyph.b, sun );
	    			display._backend._drawNoCache( drawinfo );
	    		}
	    		x++;
	    	}
	    	y++;
	    }
    }

    function rgb( r, g, b, n ) {
	    return 'rgb( ' + Math.round( r * n ) + ', ' + Math.round( g * n ) + ', ' + Math.round( b * n ) + ' )'
    }

    function fit() {
	    options = display.getOptions();
	    var size = display.computeSize( window.innerWidth, window.innerHeight );
	    options.width = size[ 0 ];
	    options.height = size[ 1 ];
	    display.setOptions( options );
	    display._dirty = false;
	    centre.x = Math.floor( options.width * 0.5 );
	    centre.y = Math.floor( options.height * 0.5 );
	    render();
    }

    const actions = {
	    NONE: 0,
	    NORTH: 1,
	    SOUTH: 2,
	    WEST: 3,
	    EAST: 4,
	    NORTHWEST: 5,
	    NORTHEAST: 6,
	    SOUTHWEST: 7,
	    SOUTHEAST: 8
    };

    function input( resolve ) {
	    input.resolve = function ( action ) {
	    	var x = pc.tile.x;
	    	var y = pc.tile.y;
	    	if ( action === actions.NORTH || action == actions.NORTHWEST || action === actions.NORTHEAST ) y--;
	    	if ( action === actions.SOUTH || action == actions.SOUTHWEST || action === actions.SOUTHEAST ) y++;
	    	if ( action === actions.WEST || action == actions.NORTHWEST || action === actions.SOUTHWEST ) x--;
	    	if ( action === actions.EAST || action == actions.NORTHEAST || action === actions.SOUTHEAST ) x++;
	    	if ( x !== pc.tile.x || y !== pc.tile.y ) {
	    		var to = tileAt( x, y );
	    		if ( to && ! contains( to, blocksmove ) ) {
	    			push( pc, to );
	    			resolve();
	    			return
	    		}
	    	}
	    	document.addEventListener( 'keydown', keydown );
	    };
	    document.addEventListener( 'keydown', keydown );
    }

    function keydown( event ) {
	    if ( event.altKey || event.metaKey ) return
	    var key = event.key;
	    var action = actions.NONE;
	    if ( [ 'ArrowUp', 'k' ].indexOf( key ) > - 1) {
	    	action = event.shiftKey ? actions.NORTHEAST : actions.NORTH;
	    } else if ( [ 'K' ].indexOf( key ) > - 1) {
	    	action = actions.NORTHEAST;
	    } else if ( [ 'ArrowDown', 'j' ].indexOf( key ) > - 1) {
	    	action = event.shiftKey ? actions.SOUTHWEST : actions.SOUTH;
	    } else if ( [ 'J' ].indexOf( key ) > - 1) {
	    	action = actions.NORTHWEST;
	    } else if ( [ 'ArrowRight', 'l' ].indexOf( key ) > - 1) {
	    	action = event.shiftKey ? actions.SOUTHEAST: actions.EAST;
	    } else if ( [ 'L' ].indexOf( key ) > - 1) {
	    	action = actions.SOUTHEAST;
	    } else if ( [ 'ArrowLeft', 'h' ].indexOf( key ) > - 1) {
	    	action = event.shiftKey ? actions.NORTHWEST: actions.WEST;
	    } else if ( [ 'H' ].indexOf( key ) > - 1) {
	    	action = actions.SOUTHWEST;
	    }
	    document.removeEventListener( 'keydown', keydown );
	    input.resolve( action );
    }

    const display = new ROT.Display( options );
    document.body.appendChild( display.getContainer() );

    const pc = Actor( glyphs.PC, 0, 0, 0 );

    fit()

    ;( function ( timeout, blocked ) {
	    var handler = function() {
	    	blocked = timeout;
	    	timeout || ( fit(), timeout = setTimeout( function() {
	    		timeout = null;
	    		blocked && handler();
	    	}, 500 ) );
	    };
	    window.addEventListener( 'resize', handler );
    } )();

    function area( x0, y0, x1, y1, callback ) {
	    var sx = x0 < x1 ? 1 : -1;
	    var sy = y0 < y1 ? 1 : -1;
	    var x = x0;
	    while ( true ) {
	    	callback( x, y0 );
	    	if ( x === x1 && y0 === y1 ) break
	    	if ( x === x1 ) { x = x0; y0 += sy; }
	    	else { x += sx; }
	    }
    }

    function grass( x0, y0, x1, y1 ) {
	    area( x0, y0, x1, y1, function( x, y ) {
	        var tile = tileAt( x, y );
	        var n = noise.get( x, y );
	        if ( noise.get( x * 0.04, y * 0.04 ) < 0 ) {
	            tile.glyph = [ glyphs.GRASS1, glyphs.GRASS2 ][ n < 0 ? 0 : 1 ];
	        } else {
	            if ( noise.get( ( x + 100 ) * 0.07, ( y + 360 ) * 0.07 ) < 0 ) {
	                tile.glyph = glyphs.TREE;
	            } else {
	                tile.glyph = [ glyphs.GRASS1, glyphs.GRASS2 ][ n < 0 ? 0 : 1 ];
	            }
	        }
	        tile.g = noise.get( x * 0.05, y * 0.05 ) < 0 ? 0.6 : 0.8;
	        tile.g += n * 0.25;
	        tile.b = ( n + 1 ) * 1;
	    } );
    }

    grass( 0, 0, map.height - 1, map.width - 1 );

    var start = tileAt( ROT.RNG.getUniformInt( 0, map.width - 1 ), ROT.RNG.getUniformInt( 0, map.width - 1 ) );
    while ( start.glyph === glyphs.TREE ) {
	    start = tileAt( ROT.RNG.getUniformInt( 0, map.width - 1 ), ROT.RNG.getUniformInt( 0, map.width - 1 ) );
    }

    push( pc, start );

    next();

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9ndWVsaWtlLmpzIiwic291cmNlcyI6WyJzcmMvcm90LmpzIiwic3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuXHRUaGlzIGlzIHJvdC5qcywgdGhlIFJPZ3VlbGlrZSBUb29sa2l0IGluIEphdmFTY3JpcHQuXHJcblx0VmVyc2lvbiAwLjd+ZGV2LCBnZW5lcmF0ZWQgb24gVGh1IDI0IE5vdiAyMDE2IDA4OjA3OjM5IE1TVC5cclxuKi9cclxudmFyIFJPVCA9IHtcclxuXHQvKipcclxuXHQgKiBAcmV0dXJucyB7Ym9vbH0gSXMgcm90LmpzIHN1cHBvcnRlZCBieSB0aGlzIGJyb3dzZXI/XHJcblx0ICovXHJcblx0aXNTdXBwb3J0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuICEhKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dCAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCk7XHJcblx0fSxcclxuXHJcblx0LyoqIERlZmF1bHQgd2l0aCBmb3IgZGlzcGxheSBhbmQgbWFwIGdlbmVyYXRvcnMgKi9cclxuXHRERUZBVUxUX1dJRFRIOiA4MCxcclxuXHQvKiogRGVmYXVsdCBoZWlnaHQgZm9yIGRpc3BsYXkgYW5kIG1hcCBnZW5lcmF0b3JzICovXHJcblx0REVGQVVMVF9IRUlHSFQ6IDI1LFxyXG5cclxuXHQvKiogRGlyZWN0aW9uYWwgY29uc3RhbnRzLiBPcmRlcmluZyBpcyBpbXBvcnRhbnQhICovXHJcblx0RElSUzoge1xyXG5cdFx0XCI0XCI6IFtcclxuXHRcdFx0WyAwLCAtMV0sXHJcblx0XHRcdFsgMSwgIDBdLFxyXG5cdFx0XHRbIDAsICAxXSxcclxuXHRcdFx0Wy0xLCAgMF1cclxuXHRcdF0sXHJcblx0XHRcIjhcIjogW1xyXG5cdFx0XHRbIDAsIC0xXSxcclxuXHRcdFx0WyAxLCAtMV0sXHJcblx0XHRcdFsgMSwgIDBdLFxyXG5cdFx0XHRbIDEsICAxXSxcclxuXHRcdFx0WyAwLCAgMV0sXHJcblx0XHRcdFstMSwgIDFdLFxyXG5cdFx0XHRbLTEsICAwXSxcclxuXHRcdFx0Wy0xLCAtMV1cclxuXHRcdF0sXHJcblx0XHRcIjZcIjogW1xyXG5cdFx0XHRbLTEsIC0xXSxcclxuXHRcdFx0WyAxLCAtMV0sXHJcblx0XHRcdFsgMiwgIDBdLFxyXG5cdFx0XHRbIDEsICAxXSxcclxuXHRcdFx0Wy0xLCAgMV0sXHJcblx0XHRcdFstMiwgIDBdXHJcblx0XHRdXHJcblx0fSxcclxuXHJcblx0LyoqIENhbmNlbCBrZXkuICovXHJcblx0VktfQ0FOQ0VMOiAzLCBcclxuXHQvKiogSGVscCBrZXkuICovXHJcblx0VktfSEVMUDogNiwgXHJcblx0LyoqIEJhY2tzcGFjZSBrZXkuICovXHJcblx0VktfQkFDS19TUEFDRTogOCwgXHJcblx0LyoqIFRhYiBrZXkuICovXHJcblx0VktfVEFCOiA5LCBcclxuXHQvKiogNSBrZXkgb24gTnVtcGFkIHdoZW4gTnVtTG9jayBpcyB1bmxvY2tlZC4gT3Igb24gTWFjLCBjbGVhciBrZXkgd2hpY2ggaXMgcG9zaXRpb25lZCBhdCBOdW1Mb2NrIGtleS4gKi9cclxuXHRWS19DTEVBUjogMTIsIFxyXG5cdC8qKiBSZXR1cm4vZW50ZXIga2V5IG9uIHRoZSBtYWluIGtleWJvYXJkLiAqL1xyXG5cdFZLX1JFVFVSTjogMTMsIFxyXG5cdC8qKiBSZXNlcnZlZCwgYnV0IG5vdCB1c2VkLiAqL1xyXG5cdFZLX0VOVEVSOiAxNCwgXHJcblx0LyoqIFNoaWZ0IGtleS4gKi9cclxuXHRWS19TSElGVDogMTYsIFxyXG5cdC8qKiBDb250cm9sIGtleS4gKi9cclxuXHRWS19DT05UUk9MOiAxNywgXHJcblx0LyoqIEFsdCAoT3B0aW9uIG9uIE1hYykga2V5LiAqL1xyXG5cdFZLX0FMVDogMTgsIFxyXG5cdC8qKiBQYXVzZSBrZXkuICovXHJcblx0VktfUEFVU0U6IDE5LCBcclxuXHQvKiogQ2FwcyBsb2NrLiAqL1xyXG5cdFZLX0NBUFNfTE9DSzogMjAsIFxyXG5cdC8qKiBFc2NhcGUga2V5LiAqL1xyXG5cdFZLX0VTQ0FQRTogMjcsIFxyXG5cdC8qKiBTcGFjZSBiYXIuICovXHJcblx0VktfU1BBQ0U6IDMyLCBcclxuXHQvKiogUGFnZSBVcCBrZXkuICovXHJcblx0VktfUEFHRV9VUDogMzMsIFxyXG5cdC8qKiBQYWdlIERvd24ga2V5LiAqL1xyXG5cdFZLX1BBR0VfRE9XTjogMzQsIFxyXG5cdC8qKiBFbmQga2V5LiAqL1xyXG5cdFZLX0VORDogMzUsIFxyXG5cdC8qKiBIb21lIGtleS4gKi9cclxuXHRWS19IT01FOiAzNiwgXHJcblx0LyoqIExlZnQgYXJyb3cuICovXHJcblx0VktfTEVGVDogMzcsIFxyXG5cdC8qKiBVcCBhcnJvdy4gKi9cclxuXHRWS19VUDogMzgsIFxyXG5cdC8qKiBSaWdodCBhcnJvdy4gKi9cclxuXHRWS19SSUdIVDogMzksIFxyXG5cdC8qKiBEb3duIGFycm93LiAqL1xyXG5cdFZLX0RPV046IDQwLCBcclxuXHQvKiogUHJpbnQgU2NyZWVuIGtleS4gKi9cclxuXHRWS19QUklOVFNDUkVFTjogNDQsIFxyXG5cdC8qKiBJbnMoZXJ0KSBrZXkuICovXHJcblx0VktfSU5TRVJUOiA0NSwgXHJcblx0LyoqIERlbChldGUpIGtleS4gKi9cclxuXHRWS19ERUxFVEU6IDQ2LCBcclxuXHQvKioqL1xyXG5cdFZLXzA6IDQ4LFxyXG5cdC8qKiovXHJcblx0VktfMTogNDksXHJcblx0LyoqKi9cclxuXHRWS18yOiA1MCxcclxuXHQvKioqL1xyXG5cdFZLXzM6IDUxLFxyXG5cdC8qKiovXHJcblx0VktfNDogNTIsXHJcblx0LyoqKi9cclxuXHRWS181OiA1MyxcclxuXHQvKioqL1xyXG5cdFZLXzY6IDU0LFxyXG5cdC8qKiovXHJcblx0VktfNzogNTUsXHJcblx0LyoqKi9cclxuXHRWS184OiA1NixcclxuXHQvKioqL1xyXG5cdFZLXzk6IDU3LFxyXG5cdC8qKiBDb2xvbiAoOikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfQ09MT046IDU4LCBcclxuXHQvKiogU2VtaWNvbG9uICg7KSBrZXkuICovXHJcblx0VktfU0VNSUNPTE9OOiA1OSwgXHJcblx0LyoqIExlc3MtdGhhbiAoPCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfTEVTU19USEFOOiA2MCwgXHJcblx0LyoqIEVxdWFscyAoPSkga2V5LiAqL1xyXG5cdFZLX0VRVUFMUzogNjEsIFxyXG5cdC8qKiBHcmVhdGVyLXRoYW4gKD4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xyXG5cdFZLX0dSRUFURVJfVEhBTjogNjIsIFxyXG5cdC8qKiBRdWVzdGlvbiBtYXJrICg/KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cclxuXHRWS19RVUVTVElPTl9NQVJLOiA2MywgXHJcblx0LyoqIEF0bWFyayAoQCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfQVQ6IDY0LCBcclxuXHQvKioqL1xyXG5cdFZLX0E6IDY1LFxyXG5cdC8qKiovXHJcblx0VktfQjogNjYsXHJcblx0LyoqKi9cclxuXHRWS19DOiA2NyxcclxuXHQvKioqL1xyXG5cdFZLX0Q6IDY4LFxyXG5cdC8qKiovXHJcblx0VktfRTogNjksXHJcblx0LyoqKi9cclxuXHRWS19GOiA3MCxcclxuXHQvKioqL1xyXG5cdFZLX0c6IDcxLFxyXG5cdC8qKiovXHJcblx0VktfSDogNzIsXHJcblx0LyoqKi9cclxuXHRWS19JOiA3MyxcclxuXHQvKioqL1xyXG5cdFZLX0o6IDc0LFxyXG5cdC8qKiovXHJcblx0VktfSzogNzUsXHJcblx0LyoqKi9cclxuXHRWS19MOiA3NixcclxuXHQvKioqL1xyXG5cdFZLX006IDc3LFxyXG5cdC8qKiovXHJcblx0VktfTjogNzgsXHJcblx0LyoqKi9cclxuXHRWS19POiA3OSxcclxuXHQvKioqL1xyXG5cdFZLX1A6IDgwLFxyXG5cdC8qKiovXHJcblx0VktfUTogODEsXHJcblx0LyoqKi9cclxuXHRWS19SOiA4MixcclxuXHQvKioqL1xyXG5cdFZLX1M6IDgzLFxyXG5cdC8qKiovXHJcblx0VktfVDogODQsXHJcblx0LyoqKi9cclxuXHRWS19VOiA4NSxcclxuXHQvKioqL1xyXG5cdFZLX1Y6IDg2LFxyXG5cdC8qKiovXHJcblx0VktfVzogODcsXHJcblx0LyoqKi9cclxuXHRWS19YOiA4OCxcclxuXHQvKioqL1xyXG5cdFZLX1k6IDg5LFxyXG5cdC8qKiovXHJcblx0VktfWjogOTAsXHJcblx0LyoqKi9cclxuXHRWS19DT05URVhUX01FTlU6IDkzLFxyXG5cdC8qKiAwIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cclxuXHRWS19OVU1QQUQwOiA5NiwgXHJcblx0LyoqIDEgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xyXG5cdFZLX05VTVBBRDE6IDk3LCBcclxuXHQvKiogMiBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXHJcblx0VktfTlVNUEFEMjogOTgsIFxyXG5cdC8qKiAzIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cclxuXHRWS19OVU1QQUQzOiA5OSwgXHJcblx0LyoqIDQgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xyXG5cdFZLX05VTVBBRDQ6IDEwMCwgXHJcblx0LyoqIDUgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xyXG5cdFZLX05VTVBBRDU6IDEwMSwgXHJcblx0LyoqIDYgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xyXG5cdFZLX05VTVBBRDY6IDEwMiwgXHJcblx0LyoqIDcgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xyXG5cdFZLX05VTVBBRDc6IDEwMywgXHJcblx0LyoqIDggb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xyXG5cdFZLX05VTVBBRDg6IDEwNCwgXHJcblx0LyoqIDkgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xyXG5cdFZLX05VTVBBRDk6IDEwNSwgXHJcblx0LyoqICogb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xyXG5cdFZLX01VTFRJUExZOiAxMDYsXHJcblx0LyoqICsgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xyXG5cdFZLX0FERDogMTA3LCBcclxuXHQvKioqL1xyXG5cdFZLX1NFUEFSQVRPUjogMTA4LFxyXG5cdC8qKiAtIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cclxuXHRWS19TVUJUUkFDVDogMTA5LCBcclxuXHQvKiogRGVjaW1hbCBwb2ludCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXHJcblx0VktfREVDSU1BTDogMTEwLCBcclxuXHQvKiogLyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXHJcblx0VktfRElWSURFOiAxMTEsIFxyXG5cdC8qKiBGMSBrZXkuICovXHJcblx0VktfRjE6IDExMiwgXHJcblx0LyoqIEYyIGtleS4gKi9cclxuXHRWS19GMjogMTEzLCBcclxuXHQvKiogRjMga2V5LiAqL1xyXG5cdFZLX0YzOiAxMTQsIFxyXG5cdC8qKiBGNCBrZXkuICovXHJcblx0VktfRjQ6IDExNSwgXHJcblx0LyoqIEY1IGtleS4gKi9cclxuXHRWS19GNTogMTE2LCBcclxuXHQvKiogRjYga2V5LiAqL1xyXG5cdFZLX0Y2OiAxMTcsIFxyXG5cdC8qKiBGNyBrZXkuICovXHJcblx0VktfRjc6IDExOCwgXHJcblx0LyoqIEY4IGtleS4gKi9cclxuXHRWS19GODogMTE5LCBcclxuXHQvKiogRjkga2V5LiAqL1xyXG5cdFZLX0Y5OiAxMjAsIFxyXG5cdC8qKiBGMTAga2V5LiAqL1xyXG5cdFZLX0YxMDogMTIxLCBcclxuXHQvKiogRjExIGtleS4gKi9cclxuXHRWS19GMTE6IDEyMiwgXHJcblx0LyoqIEYxMiBrZXkuICovXHJcblx0VktfRjEyOiAxMjMsIFxyXG5cdC8qKiBGMTMga2V5LiAqL1xyXG5cdFZLX0YxMzogMTI0LCBcclxuXHQvKiogRjE0IGtleS4gKi9cclxuXHRWS19GMTQ6IDEyNSwgXHJcblx0LyoqIEYxNSBrZXkuICovXHJcblx0VktfRjE1OiAxMjYsIFxyXG5cdC8qKiBGMTYga2V5LiAqL1xyXG5cdFZLX0YxNjogMTI3LCBcclxuXHQvKiogRjE3IGtleS4gKi9cclxuXHRWS19GMTc6IDEyOCwgXHJcblx0LyoqIEYxOCBrZXkuICovXHJcblx0VktfRjE4OiAxMjksIFxyXG5cdC8qKiBGMTkga2V5LiAqL1xyXG5cdFZLX0YxOTogMTMwLCBcclxuXHQvKiogRjIwIGtleS4gKi9cclxuXHRWS19GMjA6IDEzMSwgXHJcblx0LyoqIEYyMSBrZXkuICovXHJcblx0VktfRjIxOiAxMzIsIFxyXG5cdC8qKiBGMjIga2V5LiAqL1xyXG5cdFZLX0YyMjogMTMzLCBcclxuXHQvKiogRjIzIGtleS4gKi9cclxuXHRWS19GMjM6IDEzNCwgXHJcblx0LyoqIEYyNCBrZXkuICovXHJcblx0VktfRjI0OiAxMzUsIFxyXG5cdC8qKiBOdW0gTG9jayBrZXkuICovXHJcblx0VktfTlVNX0xPQ0s6IDE0NCwgXHJcblx0LyoqIFNjcm9sbCBMb2NrIGtleS4gKi9cclxuXHRWS19TQ1JPTExfTE9DSzogMTQ1LCBcclxuXHQvKiogQ2lyY3VtZmxleCAoXikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfQ0lSQ1VNRkxFWDogMTYwLCBcclxuXHQvKiogRXhjbGFtYXRpb24gKCEpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xyXG5cdFZLX0VYQ0xBTUFUSU9OOiAxNjEsIFxyXG5cdC8qKiBEb3VibGUgcXVvdGUgKCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfRE9VQkxFX1FVT1RFOiAxNjIsIFxyXG5cdC8qKiBIYXNoICgjKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cclxuXHRWS19IQVNIOiAxNjMsIFxyXG5cdC8qKiBEb2xsYXIgc2lnbiAoJCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfRE9MTEFSOiAxNjQsIFxyXG5cdC8qKiBQZXJjZW50ICglKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cclxuXHRWS19QRVJDRU5UOiAxNjUsIFxyXG5cdC8qKiBBbXBlcnNhbmQgKCYpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xyXG5cdFZLX0FNUEVSU0FORDogMTY2LCBcclxuXHQvKiogVW5kZXJzY29yZSAoXykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfVU5ERVJTQ09SRTogMTY3LCBcclxuXHQvKiogT3BlbiBwYXJlbnRoZXNpcyAoKCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfT1BFTl9QQVJFTjogMTY4LCBcclxuXHQvKiogQ2xvc2UgcGFyZW50aGVzaXMgKCkpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xyXG5cdFZLX0NMT1NFX1BBUkVOOiAxNjksIFxyXG5cdC8qIEFzdGVyaXNrICgqKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cclxuXHRWS19BU1RFUklTSzogMTcwLFxyXG5cdC8qKiBQbHVzICgrKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cclxuXHRWS19QTFVTOiAxNzEsIFxyXG5cdC8qKiBQaXBlICh8KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cclxuXHRWS19QSVBFOiAxNzIsIFxyXG5cdC8qKiBIeXBoZW4tVVMvZG9jcy9NaW51cyAoLSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfSFlQSEVOX01JTlVTOiAxNzMsIFxyXG5cdC8qKiBPcGVuIGN1cmx5IGJyYWNrZXQgKHspIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xyXG5cdFZLX09QRU5fQ1VSTFlfQlJBQ0tFVDogMTc0LCBcclxuXHQvKiogQ2xvc2UgY3VybHkgYnJhY2tldCAofSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfQ0xPU0VfQ1VSTFlfQlJBQ0tFVDogMTc1LCBcclxuXHQvKiogVGlsZGUgKH4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xyXG5cdFZLX1RJTERFOiAxNzYsIFxyXG5cdC8qKiBDb21tYSAoLCkga2V5LiAqL1xyXG5cdFZLX0NPTU1BOiAxODgsIFxyXG5cdC8qKiBQZXJpb2QgKC4pIGtleS4gKi9cclxuXHRWS19QRVJJT0Q6IDE5MCwgXHJcblx0LyoqIFNsYXNoICgvKSBrZXkuICovXHJcblx0VktfU0xBU0g6IDE5MSwgXHJcblx0LyoqIEJhY2sgdGljayAoYCkga2V5LiAqL1xyXG5cdFZLX0JBQ0tfUVVPVEU6IDE5MiwgXHJcblx0LyoqIE9wZW4gc3F1YXJlIGJyYWNrZXQgKFspIGtleS4gKi9cclxuXHRWS19PUEVOX0JSQUNLRVQ6IDIxOSwgXHJcblx0LyoqIEJhY2sgc2xhc2ggKFxcKSBrZXkuICovXHJcblx0VktfQkFDS19TTEFTSDogMjIwLCBcclxuXHQvKiogQ2xvc2Ugc3F1YXJlIGJyYWNrZXQgKF0pIGtleS4gKi9cclxuXHRWS19DTE9TRV9CUkFDS0VUOiAyMjEsIFxyXG5cdC8qKiBRdW90ZSAoJycnKSBrZXkuICovXHJcblx0VktfUVVPVEU6IDIyMiwgXHJcblx0LyoqIE1ldGEga2V5IG9uIExpbnV4LCBDb21tYW5kIGtleSBvbiBNYWMuICovXHJcblx0VktfTUVUQTogMjI0LCBcclxuXHQvKiogQWx0R3Iga2V5IG9uIExpbnV4LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfQUxUR1I6IDIyNSwgXHJcblx0LyoqIFdpbmRvd3MgbG9nbyBrZXkgb24gV2luZG93cy4gT3IgU3VwZXIgb3IgSHlwZXIga2V5IG9uIExpbnV4LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfV0lOOiA5MSwgXHJcblx0LyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xyXG5cdFZLX0tBTkE6IDIxLCBcclxuXHQvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXHJcblx0VktfSEFOR1VMOiAyMSwgXHJcblx0LyoqIOiLseaVsCBrZXkgb24gSmFwYW5lc2UgTWFjIGtleWJvYXJkLiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXHJcblx0VktfRUlTVTogMjIsIFxyXG5cdC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cclxuXHRWS19KVU5KQTogMjMsIFxyXG5cdC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cclxuXHRWS19GSU5BTDogMjQsIFxyXG5cdC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cclxuXHRWS19IQU5KQTogMjUsIFxyXG5cdC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cclxuXHRWS19LQU5KSTogMjUsIFxyXG5cdC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cclxuXHRWS19DT05WRVJUOiAyOCwgXHJcblx0LyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xyXG5cdFZLX05PTkNPTlZFUlQ6IDI5LCBcclxuXHQvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXHJcblx0VktfQUNDRVBUOiAzMCwgXHJcblx0LyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xyXG5cdFZLX01PREVDSEFOR0U6IDMxLCBcclxuXHQvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXHJcblx0VktfU0VMRUNUOiA0MSwgXHJcblx0LyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xyXG5cdFZLX1BSSU5UOiA0MiwgXHJcblx0LyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xyXG5cdFZLX0VYRUNVVEU6IDQzLCBcclxuXHQvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuXHQgKi9cclxuXHRWS19TTEVFUDogOTUgXHJcbn07XHJcbi8qKlxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqIENvbnRhaW5zIHRleHQgdG9rZW5pemF0aW9uIGFuZCBicmVha2luZyByb3V0aW5lc1xyXG4gKi9cclxuUk9ULlRleHQgPSB7XHJcblx0UkVfQ09MT1JTOiAvJShbYmNdKXsoW159XSopfS9nLFxyXG5cclxuXHQvKiB0b2tlbiB0eXBlcyAqL1xyXG5cdFRZUEVfVEVYVDpcdFx0MCxcclxuXHRUWVBFX05FV0xJTkU6XHQxLFxyXG5cdFRZUEVfRkc6XHRcdDIsXHJcblx0VFlQRV9CRzpcdFx0MyxcclxuXHJcblx0LyoqXHJcblx0ICogTWVhc3VyZSBzaXplIG9mIGEgcmVzdWx0aW5nIHRleHQgYmxvY2tcclxuXHQgKi9cclxuXHRtZWFzdXJlOiBmdW5jdGlvbihzdHIsIG1heFdpZHRoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0ge3dpZHRoOjAsIGhlaWdodDoxfTtcclxuXHRcdHZhciB0b2tlbnMgPSB0aGlzLnRva2VuaXplKHN0ciwgbWF4V2lkdGgpO1xyXG5cdFx0dmFyIGxpbmVXaWR0aCA9IDA7XHJcblxyXG5cdFx0Zm9yICh2YXIgaT0wO2k8dG9rZW5zLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0dmFyIHRva2VuID0gdG9rZW5zW2ldO1xyXG5cdFx0XHRzd2l0Y2ggKHRva2VuLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlIHRoaXMuVFlQRV9URVhUOlxyXG5cdFx0XHRcdFx0bGluZVdpZHRoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSB0aGlzLlRZUEVfTkVXTElORTpcclxuXHRcdFx0XHRcdHJlc3VsdC5oZWlnaHQrKztcclxuXHRcdFx0XHRcdHJlc3VsdC53aWR0aCA9IE1hdGgubWF4KHJlc3VsdC53aWR0aCwgbGluZVdpZHRoKTtcclxuXHRcdFx0XHRcdGxpbmVXaWR0aCA9IDA7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJlc3VsdC53aWR0aCA9IE1hdGgubWF4KHJlc3VsdC53aWR0aCwgbGluZVdpZHRoKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnQgc3RyaW5nIHRvIGEgc2VyaWVzIG9mIGEgZm9ybWF0dGluZyBjb21tYW5kc1xyXG5cdCAqL1xyXG5cdHRva2VuaXplOiBmdW5jdGlvbihzdHIsIG1heFdpZHRoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblxyXG5cdFx0LyogZmlyc3QgdG9rZW5pemF0aW9uIHBhc3MgLSBzcGxpdCB0ZXh0cyBhbmQgY29sb3IgZm9ybWF0dGluZyBjb21tYW5kcyAqL1xyXG5cdFx0dmFyIG9mZnNldCA9IDA7XHJcblx0XHRzdHIucmVwbGFjZSh0aGlzLlJFX0NPTE9SUywgZnVuY3Rpb24obWF0Y2gsIHR5cGUsIG5hbWUsIGluZGV4KSB7XHJcblx0XHRcdC8qIHN0cmluZyBiZWZvcmUgKi9cclxuXHRcdFx0dmFyIHBhcnQgPSBzdHIuc3Vic3RyaW5nKG9mZnNldCwgaW5kZXgpO1xyXG5cdFx0XHRpZiAocGFydC5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaCh7XHJcblx0XHRcdFx0XHR0eXBlOiBST1QuVGV4dC5UWVBFX1RFWFQsXHJcblx0XHRcdFx0XHR2YWx1ZTogcGFydFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvKiBjb2xvciBjb21tYW5kICovXHJcblx0XHRcdHJlc3VsdC5wdXNoKHtcclxuXHRcdFx0XHR0eXBlOiAodHlwZSA9PSBcImNcIiA/IFJPVC5UZXh0LlRZUEVfRkcgOiBST1QuVGV4dC5UWVBFX0JHKSxcclxuXHRcdFx0XHR2YWx1ZTogbmFtZS50cmltKClcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRvZmZzZXQgPSBpbmRleCArIG1hdGNoLmxlbmd0aDtcclxuXHRcdFx0cmV0dXJuIFwiXCI7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvKiBsYXN0IHJlbWFpbmluZyBwYXJ0ICovXHJcblx0XHR2YXIgcGFydCA9IHN0ci5zdWJzdHJpbmcob2Zmc2V0KTtcclxuXHRcdGlmIChwYXJ0Lmxlbmd0aCkge1xyXG5cdFx0XHRyZXN1bHQucHVzaCh7XHJcblx0XHRcdFx0dHlwZTogUk9ULlRleHQuVFlQRV9URVhULFxyXG5cdFx0XHRcdHZhbHVlOiBwYXJ0XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9icmVha0xpbmVzKHJlc3VsdCwgbWF4V2lkdGgpO1xyXG5cdH0sXHJcblxyXG5cdC8qIGluc2VydCBsaW5lIGJyZWFrcyBpbnRvIGZpcnN0LXBhc3MgdG9rZW5pemVkIGRhdGEgKi9cclxuXHRfYnJlYWtMaW5lczogZnVuY3Rpb24odG9rZW5zLCBtYXhXaWR0aCkge1xyXG5cdFx0aWYgKCFtYXhXaWR0aCkgeyBtYXhXaWR0aCA9IEluZmluaXR5OyB9XHJcblxyXG5cdFx0dmFyIGkgPSAwO1xyXG5cdFx0dmFyIGxpbmVMZW5ndGggPSAwO1xyXG5cdFx0dmFyIGxhc3RUb2tlbldpdGhTcGFjZSA9IC0xO1xyXG5cclxuXHRcdHdoaWxlIChpIDwgdG9rZW5zLmxlbmd0aCkgeyAvKiB0YWtlIGFsbCB0ZXh0IHRva2VucywgcmVtb3ZlIHNwYWNlLCBhcHBseSBsaW5lYnJlYWtzICovXHJcblx0XHRcdHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcclxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gUk9ULlRleHQuVFlQRV9ORVdMSU5FKSB7IC8qIHJlc2V0ICovXHJcblx0XHRcdFx0bGluZUxlbmd0aCA9IDA7IFxyXG5cdFx0XHRcdGxhc3RUb2tlbldpdGhTcGFjZSA9IC0xO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0b2tlbi50eXBlICE9IFJPVC5UZXh0LlRZUEVfVEVYVCkgeyAvKiBza2lwIG5vbi10ZXh0IHRva2VucyAqL1xyXG5cdFx0XHRcdGkrKztcclxuXHRcdFx0XHRjb250aW51ZTsgXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8qIHJlbW92ZSBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBsaW5lICovXHJcblx0XHRcdHdoaWxlIChsaW5lTGVuZ3RoID09IDAgJiYgdG9rZW4udmFsdWUuY2hhckF0KDApID09IFwiIFwiKSB7IHRva2VuLnZhbHVlID0gdG9rZW4udmFsdWUuc3Vic3RyaW5nKDEpOyB9XHJcblxyXG5cdFx0XHQvKiBmb3JjZWQgbmV3bGluZT8gaW5zZXJ0IHR3byBuZXcgdG9rZW5zIGFmdGVyIHRoaXMgb25lICovXHJcblx0XHRcdHZhciBpbmRleCA9IHRva2VuLnZhbHVlLmluZGV4T2YoXCJcXG5cIik7XHJcblx0XHRcdGlmIChpbmRleCAhPSAtMSkgeyBcclxuXHRcdFx0XHR0b2tlbi52YWx1ZSA9IHRoaXMuX2JyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBpLCBpbmRleCwgdHJ1ZSk7IFxyXG5cclxuXHRcdFx0XHQvKiBpZiB0aGVyZSBhcmUgc3BhY2VzIGF0IHRoZSBlbmQsIHdlIG11c3QgcmVtb3ZlIHRoZW0gKHdlIGRvIG5vdCB3YW50IHRoZSBsaW5lIHRvbyBsb25nKSAqL1xyXG5cdFx0XHRcdHZhciBhcnIgPSB0b2tlbi52YWx1ZS5zcGxpdChcIlwiKTtcclxuXHRcdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCAmJiBhcnJbYXJyLmxlbmd0aC0xXSA9PSBcIiBcIikgeyBhcnIucG9wKCk7IH1cclxuXHRcdFx0XHR0b2tlbi52YWx1ZSA9IGFyci5qb2luKFwiXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvKiB0b2tlbiBkZWdlbmVyYXRlZD8gKi9cclxuXHRcdFx0aWYgKCF0b2tlbi52YWx1ZS5sZW5ndGgpIHtcclxuXHRcdFx0XHR0b2tlbnMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobGluZUxlbmd0aCArIHRva2VuLnZhbHVlLmxlbmd0aCA+IG1heFdpZHRoKSB7IC8qIGxpbmUgdG9vIGxvbmcsIGZpbmQgYSBzdWl0YWJsZSBicmVha2luZyBzcG90ICovXHJcblxyXG5cdFx0XHRcdC8qIGlzIGl0IHBvc3NpYmxlIHRvIGJyZWFrIHdpdGhpbiB0aGlzIHRva2VuPyAqL1xyXG5cdFx0XHRcdHZhciBpbmRleCA9IC0xO1xyXG5cdFx0XHRcdHdoaWxlICgxKSB7XHJcblx0XHRcdFx0XHR2YXIgbmV4dEluZGV4ID0gdG9rZW4udmFsdWUuaW5kZXhPZihcIiBcIiwgaW5kZXgrMSk7XHJcblx0XHRcdFx0XHRpZiAobmV4dEluZGV4ID09IC0xKSB7IGJyZWFrOyB9XHJcblx0XHRcdFx0XHRpZiAobGluZUxlbmd0aCArIG5leHRJbmRleCA+IG1heFdpZHRoKSB7IGJyZWFrOyB9XHJcblx0XHRcdFx0XHRpbmRleCA9IG5leHRJbmRleDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChpbmRleCAhPSAtMSkgeyAvKiBicmVhayBhdCBzcGFjZSB3aXRoaW4gdGhpcyBvbmUgKi9cclxuXHRcdFx0XHRcdHRva2VuLnZhbHVlID0gdGhpcy5fYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIGluZGV4LCB0cnVlKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGxhc3RUb2tlbldpdGhTcGFjZSAhPSAtMSkgeyAvKiBpcyB0aGVyZSBhIHByZXZpb3VzIHRva2VuIHdoZXJlIGEgYnJlYWsgY2FuIG9jY3VyPyAqL1xyXG5cdFx0XHRcdFx0dmFyIHRva2VuID0gdG9rZW5zW2xhc3RUb2tlbldpdGhTcGFjZV07XHJcblx0XHRcdFx0XHR2YXIgYnJlYWtJbmRleCA9IHRva2VuLnZhbHVlLmxhc3RJbmRleE9mKFwiIFwiKTtcclxuXHRcdFx0XHRcdHRva2VuLnZhbHVlID0gdGhpcy5fYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGxhc3RUb2tlbldpdGhTcGFjZSwgYnJlYWtJbmRleCwgdHJ1ZSk7XHJcblx0XHRcdFx0XHRpID0gbGFzdFRva2VuV2l0aFNwYWNlO1xyXG5cdFx0XHRcdH0gZWxzZSB7IC8qIGZvcmNlIGJyZWFrIGluIHRoaXMgdG9rZW4gKi9cclxuXHRcdFx0XHRcdHRva2VuLnZhbHVlID0gdGhpcy5fYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIG1heFdpZHRoLWxpbmVMZW5ndGgsIGZhbHNlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2UgeyAvKiBsaW5lIG5vdCBsb25nLCBjb250aW51ZSAqL1xyXG5cdFx0XHRcdGxpbmVMZW5ndGggKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xyXG5cdFx0XHRcdGlmICh0b2tlbi52YWx1ZS5pbmRleE9mKFwiIFwiKSAhPSAtMSkgeyBsYXN0VG9rZW5XaXRoU3BhY2UgPSBpOyB9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGkrKzsgLyogYWR2YW5jZSB0byBuZXh0IHRva2VuICovXHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHRva2Vucy5wdXNoKHt0eXBlOiBST1QuVGV4dC5UWVBFX05FV0xJTkV9KTsgLyogaW5zZXJ0IGZha2UgbmV3bGluZSB0byBmaXggdGhlIGxhc3QgdGV4dCBsaW5lICovXHJcblxyXG5cdFx0LyogcmVtb3ZlIHRyYWlsaW5nIHNwYWNlIGZyb20gdGV4dCB0b2tlbnMgYmVmb3JlIG5ld2xpbmVzICovXHJcblx0XHR2YXIgbGFzdFRleHRUb2tlbiA9IG51bGw7XHJcblx0XHRmb3IgKHZhciBpPTA7aTx0b2tlbnMubGVuZ3RoO2krKykge1xyXG5cdFx0XHR2YXIgdG9rZW4gPSB0b2tlbnNbaV07XHJcblx0XHRcdHN3aXRjaCAodG9rZW4udHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgUk9ULlRleHQuVFlQRV9URVhUOiBsYXN0VGV4dFRva2VuID0gdG9rZW47IGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgUk9ULlRleHQuVFlQRV9ORVdMSU5FOiBcclxuXHRcdFx0XHRcdGlmIChsYXN0VGV4dFRva2VuKSB7IC8qIHJlbW92ZSB0cmFpbGluZyBzcGFjZSAqL1xyXG5cdFx0XHRcdFx0XHR2YXIgYXJyID0gbGFzdFRleHRUb2tlbi52YWx1ZS5zcGxpdChcIlwiKTtcclxuXHRcdFx0XHRcdFx0d2hpbGUgKGFyci5sZW5ndGggJiYgYXJyW2Fyci5sZW5ndGgtMV0gPT0gXCIgXCIpIHsgYXJyLnBvcCgpOyB9XHJcblx0XHRcdFx0XHRcdGxhc3RUZXh0VG9rZW4udmFsdWUgPSBhcnIuam9pbihcIlwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGxhc3RUZXh0VG9rZW4gPSBudWxsO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dG9rZW5zLnBvcCgpOyAvKiByZW1vdmUgZmFrZSB0b2tlbiAqL1xyXG5cclxuXHRcdHJldHVybiB0b2tlbnM7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIG5ldyB0b2tlbnMgYW5kIGluc2VydCB0aGVtIGludG8gdGhlIHN0cmVhbVxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0W119IHRva2Vuc1xyXG5cdCAqIEBwYXJhbSB7aW50fSB0b2tlbkluZGV4IFRva2VuIGJlaW5nIHByb2Nlc3NlZFxyXG5cdCAqIEBwYXJhbSB7aW50fSBicmVha0luZGV4IEluZGV4IHdpdGhpbiBjdXJyZW50IHRva2VuJ3MgdmFsdWVcclxuXHQgKiBAcGFyYW0ge2Jvb2x9IHJlbW92ZUJyZWFrQ2hhciBEbyB3ZSB3YW50IHRvIHJlbW92ZSB0aGUgYnJlYWtpbmcgY2hhcmFjdGVyP1xyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IHJlbWFpbmluZyB1bmJyb2tlbiB0b2tlbiB2YWx1ZVxyXG5cdCAqL1xyXG5cdF9icmVha0luc2lkZVRva2VuOiBmdW5jdGlvbih0b2tlbnMsIHRva2VuSW5kZXgsIGJyZWFrSW5kZXgsIHJlbW92ZUJyZWFrQ2hhcikge1xyXG5cdFx0dmFyIG5ld0JyZWFrVG9rZW4gPSB7XHJcblx0XHRcdHR5cGU6IFJPVC5UZXh0LlRZUEVfTkVXTElORVxyXG5cdFx0fTtcclxuXHRcdHZhciBuZXdUZXh0VG9rZW4gPSB7XHJcblx0XHRcdHR5cGU6IFJPVC5UZXh0LlRZUEVfVEVYVCxcclxuXHRcdFx0dmFsdWU6IHRva2Vuc1t0b2tlbkluZGV4XS52YWx1ZS5zdWJzdHJpbmcoYnJlYWtJbmRleCArIChyZW1vdmVCcmVha0NoYXIgPyAxIDogMCkpXHJcblx0XHR9O1xyXG5cdFx0dG9rZW5zLnNwbGljZSh0b2tlbkluZGV4KzEsIDAsIG5ld0JyZWFrVG9rZW4sIG5ld1RleHRUb2tlbik7XHJcblx0XHRyZXR1cm4gdG9rZW5zW3Rva2VuSW5kZXhdLnZhbHVlLnN1YnN0cmluZygwLCBicmVha0luZGV4KTtcclxuXHR9XHJcbn07XHJcbi8qKlxyXG4gKiBAcmV0dXJucyB7YW55fSBSYW5kb21seSBwaWNrZWQgaXRlbSwgbnVsbCB3aGVuIGxlbmd0aD0wXHJcbiAqL1xyXG5BcnJheS5wcm90b3R5cGUucmFuZG9tID0gQXJyYXkucHJvdG90eXBlLnJhbmRvbSB8fCBmdW5jdGlvbigpIHtcclxuXHRpZiAoIXRoaXMubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblx0cmV0dXJuIHRoaXNbTWF0aC5mbG9vcihST1QuUk5HLmdldFVuaWZvcm0oKSAqIHRoaXMubGVuZ3RoKV07XHJcbn07XHJcblxyXG4vKipcclxuICogQHJldHVybnMge2FycmF5fSBOZXcgYXJyYXkgd2l0aCByYW5kb21pemVkIGl0ZW1zXHJcbiAqL1xyXG5BcnJheS5wcm90b3R5cGUucmFuZG9taXplID0gQXJyYXkucHJvdG90eXBlLnJhbmRvbWl6ZSB8fCBmdW5jdGlvbigpIHtcclxuICB2YXIgcmVzdWx0ID0gW107XHJcbiAgdmFyIGNsb25lID0gdGhpcy5zbGljZSgpO1xyXG4gIHdoaWxlIChjbG9uZS5sZW5ndGgpIHtcclxuICAgIHZhciBpbmRleCA9IGNsb25lLmluZGV4T2YoY2xvbmUucmFuZG9tKCkpO1xyXG4gICAgcmVzdWx0LnB1c2goY2xvbmUuc3BsaWNlKGluZGV4LCAxKVswXSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbi8qKlxyXG4gKiBBbHdheXMgcG9zaXRpdmUgbW9kdWx1c1xyXG4gKiBAcGFyYW0ge2ludH0gbiBNb2R1bHVzXHJcbiAqIEByZXR1cm5zIHtpbnR9IHRoaXMgbW9kdWxvIG5cclxuICovXHJcbk51bWJlci5wcm90b3R5cGUubW9kID0gTnVtYmVyLnByb3RvdHlwZS5tb2QgfHwgZnVuY3Rpb24obikge1xyXG5cdHJldHVybiAoKHRoaXMlbikrbiklbjtcclxufTtcclxuLyoqXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxyXG4gKi9cclxuU3RyaW5nLnByb3RvdHlwZS5jYXBpdGFsaXplID0gU3RyaW5nLnByb3RvdHlwZS5jYXBpdGFsaXplIHx8IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5zdWJzdHJpbmcoMSk7XHJcbn07XHJcblxyXG4vKiogXHJcbiAqIExlZnQgcGFkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY2hhcmFjdGVyPVwiMFwiXVxyXG4gKiBAcGFyYW0ge2ludH0gW2NvdW50PTJdXHJcbiAqL1xyXG5TdHJpbmcucHJvdG90eXBlLmxwYWQgPSBTdHJpbmcucHJvdG90eXBlLmxwYWQgfHwgZnVuY3Rpb24oY2hhcmFjdGVyLCBjb3VudCkge1xyXG5cdHZhciBjaCA9IGNoYXJhY3RlciB8fCBcIjBcIjtcclxuXHR2YXIgY250ID0gY291bnQgfHwgMjtcclxuXHJcblx0dmFyIHMgPSBcIlwiO1xyXG5cdHdoaWxlIChzLmxlbmd0aCA8IChjbnQgLSB0aGlzLmxlbmd0aCkpIHsgcyArPSBjaDsgfVxyXG5cdHMgPSBzLnN1YnN0cmluZygwLCBjbnQtdGhpcy5sZW5ndGgpO1xyXG5cdHJldHVybiBzK3RoaXM7XHJcbn07XHJcblxyXG4vKiogXHJcbiAqIFJpZ2h0IHBhZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NoYXJhY3Rlcj1cIjBcIl1cclxuICogQHBhcmFtIHtpbnR9IFtjb3VudD0yXVxyXG4gKi9cclxuU3RyaW5nLnByb3RvdHlwZS5ycGFkID0gU3RyaW5nLnByb3RvdHlwZS5ycGFkIHx8IGZ1bmN0aW9uKGNoYXJhY3RlciwgY291bnQpIHtcclxuXHR2YXIgY2ggPSBjaGFyYWN0ZXIgfHwgXCIwXCI7XHJcblx0dmFyIGNudCA9IGNvdW50IHx8IDI7XHJcblxyXG5cdHZhciBzID0gXCJcIjtcclxuXHR3aGlsZSAocy5sZW5ndGggPCAoY250IC0gdGhpcy5sZW5ndGgpKSB7IHMgKz0gY2g7IH1cclxuXHRzID0gcy5zdWJzdHJpbmcoMCwgY250LXRoaXMubGVuZ3RoKTtcclxuXHRyZXR1cm4gdGhpcytzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZvcm1hdCBhIHN0cmluZyBpbiBhIGZsZXhpYmxlIHdheS4gU2NhbnMgZm9yICVzIHN0cmluZ3MgYW5kIHJlcGxhY2VzIHRoZW0gd2l0aCBhcmd1bWVudHMuIExpc3Qgb2YgcGF0dGVybnMgaXMgbW9kaWZpYWJsZSB2aWEgU3RyaW5nLmZvcm1hdC5tYXAuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZVxyXG4gKiBAcGFyYW0ge2FueX0gW2FyZ3ZdXHJcbiAqL1xyXG5TdHJpbmcuZm9ybWF0ID0gU3RyaW5nLmZvcm1hdCB8fCBmdW5jdGlvbih0ZW1wbGF0ZSkge1xyXG5cdHZhciBtYXAgPSBTdHJpbmcuZm9ybWF0Lm1hcDtcclxuXHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblxyXG5cdHZhciByZXBsYWNlciA9IGZ1bmN0aW9uKG1hdGNoLCBncm91cDEsIGdyb3VwMiwgaW5kZXgpIHtcclxuXHRcdGlmICh0ZW1wbGF0ZS5jaGFyQXQoaW5kZXgtMSkgPT0gXCIlXCIpIHsgcmV0dXJuIG1hdGNoLnN1YnN0cmluZygxKTsgfVxyXG5cdFx0aWYgKCFhcmdzLmxlbmd0aCkgeyByZXR1cm4gbWF0Y2g7IH1cclxuXHRcdHZhciBvYmogPSBhcmdzWzBdO1xyXG5cclxuXHRcdHZhciBncm91cCA9IGdyb3VwMSB8fCBncm91cDI7XHJcblx0XHR2YXIgcGFydHMgPSBncm91cC5zcGxpdChcIixcIik7XHJcblx0XHR2YXIgbmFtZSA9IHBhcnRzLnNoaWZ0KCk7XHJcblx0XHR2YXIgbWV0aG9kID0gbWFwW25hbWUudG9Mb3dlckNhc2UoKV07XHJcblx0XHRpZiAoIW1ldGhvZCkgeyByZXR1cm4gbWF0Y2g7IH1cclxuXHJcblx0XHR2YXIgb2JqID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0dmFyIHJlcGxhY2VkID0gb2JqW21ldGhvZF0uYXBwbHkob2JqLCBwYXJ0cyk7XHJcblxyXG5cdFx0dmFyIGZpcnN0ID0gbmFtZS5jaGFyQXQoMCk7XHJcblx0XHRpZiAoZmlyc3QgIT0gZmlyc3QudG9Mb3dlckNhc2UoKSkgeyByZXBsYWNlZCA9IHJlcGxhY2VkLmNhcGl0YWxpemUoKTsgfVxyXG5cclxuXHRcdHJldHVybiByZXBsYWNlZDtcclxuXHR9O1xyXG5cdHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKC8lKD86KFthLXpdKyl8KD86eyhbXn1dKyl9KSkvZ2ksIHJlcGxhY2VyKTtcclxufTtcclxuXHJcblN0cmluZy5mb3JtYXQubWFwID0gU3RyaW5nLmZvcm1hdC5tYXAgfHwge1xyXG5cdFwic1wiOiBcInRvU3RyaW5nXCJcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZW5pZW5jZSBzaG9ydGN1dCB0byBTdHJpbmcuZm9ybWF0KHRoaXMpXHJcbiAqL1xyXG5TdHJpbmcucHJvdG90eXBlLmZvcm1hdCA9IFN0cmluZy5wcm90b3R5cGUuZm9ybWF0IHx8IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuXHRhcmdzLnVuc2hpZnQodGhpcyk7XHJcblx0cmV0dXJuIFN0cmluZy5mb3JtYXQuYXBwbHkoU3RyaW5nLCBhcmdzKTtcclxufTtcclxuXHJcbmlmICghT2JqZWN0LmNyZWF0ZSkgeyAgXHJcblx0LyoqXHJcblx0ICogRVM1IE9iamVjdC5jcmVhdGVcclxuXHQgKi9cclxuXHRPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24obykgeyAgXHJcblx0XHR2YXIgdG1wID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdHRtcC5wcm90b3R5cGUgPSBvO1xyXG5cdFx0cmV0dXJuIG5ldyB0bXAoKTtcclxuXHR9OyAgXHJcbn0gIFxyXG4vKipcclxuICogU2V0cyBwcm90b3R5cGUgb2YgdGhpcyBmdW5jdGlvbiB0byBhbiBpbnN0YW5jZSBvZiBwYXJlbnQgZnVuY3Rpb25cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gcGFyZW50XHJcbiAqL1xyXG5GdW5jdGlvbi5wcm90b3R5cGUuZXh0ZW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmV4dGVuZCB8fCBmdW5jdGlvbihwYXJlbnQpIHtcclxuXHR0aGlzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XHJcblx0dGhpcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzO1xyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5pZiAodHlwZW9mIHdpbmRvdyAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9XHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcblx0XHR8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcblx0XHR8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcblx0XHR8fCB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZVxyXG5cdFx0fHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcblx0XHR8fCBmdW5jdGlvbihjYikgeyByZXR1cm4gc2V0VGltZW91dChjYiwgMTAwMC82MCk7IH07XHJcblxyXG5cdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XHJcblx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWVcclxuXHRcdHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZVxyXG5cdFx0fHwgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lXHJcblx0XHR8fCB3aW5kb3cub0NhbmNlbEFuaW1hdGlvbkZyYW1lXHJcblx0XHR8fCB3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZVxyXG5cdFx0fHwgZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7IH07XHJcbn1cclxuLyoqXHJcbiAqIEBjbGFzcyBWaXN1YWwgbWFwIGRpc3BsYXlcclxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMud2lkdGg9Uk9ULkRFRkFVTFRfV0lEVEhdXHJcbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy5oZWlnaHQ9Uk9ULkRFRkFVTFRfSEVJR0hUXVxyXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMuZm9udFNpemU9MTVdXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5mb250RmFtaWx5PVwibW9ub3NwYWNlXCJdXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5mb250U3R5bGU9XCJcIl0gYm9sZC9pdGFsaWMvbm9uZS9ib3RoXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5mZz1cIiNjY2NcIl1cclxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmJnPVwiIzAwMFwiXVxyXG4gKiBAcGFyYW0ge2Zsb2F0fSBbb3B0aW9ucy5zcGFjaW5nPTFdXHJcbiAqIEBwYXJhbSB7ZmxvYXR9IFtvcHRpb25zLmJvcmRlcj0wXVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubGF5b3V0PVwicmVjdFwiXVxyXG4gKiBAcGFyYW0ge2Jvb2x9IFtvcHRpb25zLmZvcmNlU3F1YXJlUmF0aW89ZmFsc2VdXHJcbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50aWxlV2lkdGg9MzJdXHJcbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50aWxlSGVpZ2h0PTMyXVxyXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMudGlsZU1hcD17fV1cclxuICogQHBhcmFtIHtpbWFnZX0gW29wdGlvbnMudGlsZVNldD1udWxsXVxyXG4gKiBAcGFyYW0ge2ltYWdlfSBbb3B0aW9ucy50aWxlQ29sb3JpemU9ZmFsc2VdXHJcbiAqL1xyXG5ST1QuRGlzcGxheSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuXHR0aGlzLl9jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHR0aGlzLl9kYXRhID0ge307XHJcblx0dGhpcy5fZGlydHkgPSBmYWxzZTsgLyogZmFsc2UgPSBub3RoaW5nLCB0cnVlID0gYWxsLCBvYmplY3QgPSBkaXJ0eSBjZWxscyAqL1xyXG5cdHRoaXMuX29wdGlvbnMgPSB7fTtcclxuXHR0aGlzLl9iYWNrZW5kID0gbnVsbDtcclxuXHRcclxuXHR2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XHJcblx0XHR3aWR0aDogUk9ULkRFRkFVTFRfV0lEVEgsXHJcblx0XHRoZWlnaHQ6IFJPVC5ERUZBVUxUX0hFSUdIVCxcclxuXHRcdHRyYW5zcG9zZTogZmFsc2UsXHJcblx0XHRsYXlvdXQ6IFwicmVjdFwiLFxyXG5cdFx0Zm9udFNpemU6IDE1LFxyXG5cdFx0c3BhY2luZzogMSxcclxuXHRcdGJvcmRlcjogMCxcclxuXHRcdGZvcmNlU3F1YXJlUmF0aW86IGZhbHNlLFxyXG5cdFx0Zm9udEZhbWlseTogXCJtb25vc3BhY2VcIixcclxuXHRcdGZvbnRTdHlsZTogXCJcIixcclxuXHRcdGZnOiBcIiNjY2NcIixcclxuXHRcdGJnOiBcIiMwMDBcIixcclxuXHRcdHRpbGVXaWR0aDogMzIsXHJcblx0XHR0aWxlSGVpZ2h0OiAzMixcclxuXHRcdHRpbGVNYXA6IHt9LFxyXG5cdFx0dGlsZVNldDogbnVsbCxcclxuXHRcdHRpbGVDb2xvcml6ZTogZmFsc2UsXHJcblx0XHR0ZXJtQ29sb3I6IFwieHRlcm1cIlxyXG5cdH07XHJcblx0Zm9yICh2YXIgcCBpbiBvcHRpb25zKSB7IGRlZmF1bHRPcHRpb25zW3BdID0gb3B0aW9uc1twXTsgfVxyXG5cdHRoaXMuc2V0T3B0aW9ucyhkZWZhdWx0T3B0aW9ucyk7XHJcblx0dGhpcy5ERUJVRyA9IHRoaXMuREVCVUcuYmluZCh0aGlzKTtcclxuXHJcblx0dGhpcy5fdGljayA9IHRoaXMuX3RpY2suYmluZCh0aGlzKTtcclxuXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdGljayk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVidWcgaGVscGVyLCBpZGVhbCBhcyBhIG1hcCBnZW5lcmF0b3IgY2FsbGJhY2suIEFsd2F5cyBib3VuZCB0byB0aGlzLlxyXG4gKiBAcGFyYW0ge2ludH0geFxyXG4gKiBAcGFyYW0ge2ludH0geVxyXG4gKiBAcGFyYW0ge2ludH0gd2hhdFxyXG4gKi9cclxuUk9ULkRpc3BsYXkucHJvdG90eXBlLkRFQlVHID0gZnVuY3Rpb24oeCwgeSwgd2hhdCkge1xyXG5cdHZhciBjb2xvcnMgPSBbdGhpcy5fb3B0aW9ucy5iZywgdGhpcy5fb3B0aW9ucy5mZ107XHJcblx0dGhpcy5kcmF3KHgsIHksIG51bGwsIG51bGwsIGNvbG9yc1t3aGF0ICUgY29sb3JzLmxlbmd0aF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsZWFyIHRoZSB3aG9sZSBkaXNwbGF5IChjb3ZlciBpdCB3aXRoIGJhY2tncm91bmQgY29sb3IpXHJcbiAqL1xyXG5ST1QuRGlzcGxheS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuXHR0aGlzLl9kYXRhID0ge307XHJcblx0dGhpcy5fZGlydHkgPSB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzZWUgUk9ULkRpc3BsYXlcclxuICovXHJcblJPVC5EaXNwbGF5LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdGZvciAodmFyIHAgaW4gb3B0aW9ucykgeyB0aGlzLl9vcHRpb25zW3BdID0gb3B0aW9uc1twXTsgfVxyXG5cdGlmIChvcHRpb25zLndpZHRoIHx8IG9wdGlvbnMuaGVpZ2h0IHx8IG9wdGlvbnMuZm9udFNpemUgfHwgb3B0aW9ucy5mb250RmFtaWx5IHx8IG9wdGlvbnMuc3BhY2luZyB8fCBvcHRpb25zLmxheW91dCkge1xyXG5cdFx0aWYgKG9wdGlvbnMubGF5b3V0KSB7IFxyXG5cdFx0XHR0aGlzLl9iYWNrZW5kID0gbmV3IFJPVC5EaXNwbGF5W29wdGlvbnMubGF5b3V0LmNhcGl0YWxpemUoKV0odGhpcy5fY29udGV4dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGZvbnQgPSAodGhpcy5fb3B0aW9ucy5mb250U3R5bGUgPyB0aGlzLl9vcHRpb25zLmZvbnRTdHlsZSArIFwiIFwiIDogXCJcIikgKyB0aGlzLl9vcHRpb25zLmZvbnRTaXplICsgXCJweCBcIiArIHRoaXMuX29wdGlvbnMuZm9udEZhbWlseTtcclxuXHRcdHRoaXMuX2NvbnRleHQuZm9udCA9IGZvbnQ7XHJcblx0XHR0aGlzLl9iYWNrZW5kLmNvbXB1dGUodGhpcy5fb3B0aW9ucyk7XHJcblx0XHR0aGlzLl9jb250ZXh0LmZvbnQgPSBmb250O1xyXG5cdFx0dGhpcy5fY29udGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cdFx0dGhpcy5fY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xyXG5cdFx0dGhpcy5fZGlydHkgPSB0cnVlO1xyXG5cdH1cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGN1cnJlbnRseSBzZXQgb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBDdXJyZW50IG9wdGlvbnMgb2JqZWN0IFxyXG4gKi9cclxuUk9ULkRpc3BsYXkucHJvdG90eXBlLmdldE9wdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcy5fb3B0aW9ucztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBET00gbm9kZSBvZiB0aGlzIGRpc3BsYXlcclxuICogQHJldHVybnMge25vZGV9IERPTSBub2RlXHJcbiAqL1xyXG5ST1QuRGlzcGxheS5wcm90b3R5cGUuZ2V0Q29udGFpbmVyID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXMuX2NvbnRleHQuY2FudmFzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgdGhlIG1heGltdW0gd2lkdGgvaGVpZ2h0IHRvIGZpdCBpbnRvIGEgc2V0IG9mIGdpdmVuIGNvbnN0cmFpbnRzXHJcbiAqIEBwYXJhbSB7aW50fSBhdmFpbFdpZHRoIE1heGltdW0gYWxsb3dlZCBwaXhlbCB3aWR0aFxyXG4gKiBAcGFyYW0ge2ludH0gYXZhaWxIZWlnaHQgTWF4aW11bSBhbGxvd2VkIHBpeGVsIGhlaWdodFxyXG4gKiBAcmV0dXJucyB7aW50WzJdfSBjZWxsV2lkdGgsY2VsbEhlaWdodFxyXG4gKi9cclxuUk9ULkRpc3BsYXkucHJvdG90eXBlLmNvbXB1dGVTaXplID0gZnVuY3Rpb24oYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcclxuXHRyZXR1cm4gdGhpcy5fYmFja2VuZC5jb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCwgdGhpcy5fb3B0aW9ucyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB0aGUgbWF4aW11bSBmb250IHNpemUgdG8gZml0IGludG8gYSBzZXQgb2YgZ2l2ZW4gY29uc3RyYWludHNcclxuICogQHBhcmFtIHtpbnR9IGF2YWlsV2lkdGggTWF4aW11bSBhbGxvd2VkIHBpeGVsIHdpZHRoXHJcbiAqIEBwYXJhbSB7aW50fSBhdmFpbEhlaWdodCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgaGVpZ2h0XHJcbiAqIEByZXR1cm5zIHtpbnR9IGZvbnRTaXplXHJcbiAqL1xyXG5ST1QuRGlzcGxheS5wcm90b3R5cGUuY29tcHV0ZUZvbnRTaXplID0gZnVuY3Rpb24oYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcclxuXHRyZXR1cm4gdGhpcy5fYmFja2VuZC5jb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQsIHRoaXMuX29wdGlvbnMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgYSBET00gZXZlbnQgKG1vdXNlIG9yIHRvdWNoKSB0byBtYXAgY29vcmRpbmF0ZXMuIFVzZXMgZmlyc3QgdG91Y2ggZm9yIG11bHRpLXRvdWNoLlxyXG4gKiBAcGFyYW0ge0V2ZW50fSBlIGV2ZW50XHJcbiAqIEByZXR1cm5zIHtpbnRbMl19IC0xIGZvciB2YWx1ZXMgb3V0c2lkZSBvZiB0aGUgY2FudmFzXHJcbiAqL1xyXG5ST1QuRGlzcGxheS5wcm90b3R5cGUuZXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24oZSkge1xyXG5cdGlmIChlLnRvdWNoZXMpIHtcclxuXHRcdHZhciB4ID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XHJcblx0XHR2YXIgeSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgeCA9IGUuY2xpZW50WDtcclxuXHRcdHZhciB5ID0gZS5jbGllbnRZO1xyXG5cdH1cclxuXHJcblx0dmFyIHJlY3QgPSB0aGlzLl9jb250ZXh0LmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHR4IC09IHJlY3QubGVmdDtcclxuXHR5IC09IHJlY3QudG9wO1xyXG5cdFxyXG5cdHggKj0gdGhpcy5fY29udGV4dC5jYW52YXMud2lkdGggLyB0aGlzLl9jb250ZXh0LmNhbnZhcy5jbGllbnRXaWR0aDtcclxuXHR5ICo9IHRoaXMuX2NvbnRleHQuY2FudmFzLmhlaWdodCAvIHRoaXMuX2NvbnRleHQuY2FudmFzLmNsaWVudEhlaWdodDtcclxuXHJcblx0aWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gdGhpcy5fY29udGV4dC5jYW52YXMud2lkdGggfHwgeSA+PSB0aGlzLl9jb250ZXh0LmNhbnZhcy5oZWlnaHQpIHsgcmV0dXJuIFstMSwgLTFdOyB9XHJcblxyXG5cdHJldHVybiB0aGlzLl9iYWNrZW5kLmV2ZW50VG9Qb3NpdGlvbih4LCB5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge2ludH0geFxyXG4gKiBAcGFyYW0ge2ludH0geVxyXG4gKiBAcGFyYW0ge3N0cmluZyB8fCBzdHJpbmdbXX0gY2ggT25lIG9yIG1vcmUgY2hhcnMgKHdpbGwgYmUgb3ZlcmxhcHBpbmcgdGhlbXNlbHZlcylcclxuICogQHBhcmFtIHtzdHJpbmd9IFtmZ10gZm9yZWdyb3VuZCBjb2xvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2JnXSBiYWNrZ3JvdW5kIGNvbG9yXHJcbiAqL1xyXG5ST1QuRGlzcGxheS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKHgsIHksIGNoLCBmZywgYmcpIHtcclxuXHRpZiAoIWZnKSB7IGZnID0gdGhpcy5fb3B0aW9ucy5mZzsgfVxyXG5cdGlmICghYmcpIHsgYmcgPSB0aGlzLl9vcHRpb25zLmJnOyB9XHJcblx0dGhpcy5fZGF0YVt4K1wiLFwiK3ldID0gW3gsIHksIGNoLCBmZywgYmddO1xyXG5cdFxyXG5cdGlmICh0aGlzLl9kaXJ0eSA9PT0gdHJ1ZSkgeyByZXR1cm47IH0gLyogd2lsbCBhbHJlYWR5IHJlZHJhdyBldmVyeXRoaW5nICovXHJcblx0aWYgKCF0aGlzLl9kaXJ0eSkgeyB0aGlzLl9kaXJ0eSA9IHt9OyB9IC8qIGZpcnN0ISAqL1xyXG5cdHRoaXMuX2RpcnR5W3grXCIsXCIreV0gPSB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERyYXdzIGEgdGV4dCBhdCBnaXZlbiBwb3NpdGlvbi4gT3B0aW9uYWxseSB3cmFwcyBhdCBhIG1heGltdW0gbGVuZ3RoLiBDdXJyZW50bHkgZG9lcyBub3Qgd29yayB3aXRoIGhleCBsYXlvdXQuXHJcbiAqIEBwYXJhbSB7aW50fSB4XHJcbiAqIEBwYXJhbSB7aW50fSB5XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IE1heSBjb250YWluIGNvbG9yL2JhY2tncm91bmQgZm9ybWF0IHNwZWNpZmllcnMsICVje25hbWV9LyVie25hbWV9LCBib3RoIG9wdGlvbmFsLiAlY3t9LyVie30gcmVzZXRzIHRvIGRlZmF1bHQuXHJcbiAqIEBwYXJhbSB7aW50fSBbbWF4V2lkdGhdIHdyYXAgYXQgd2hhdCB3aWR0aD9cclxuICogQHJldHVybnMge2ludH0gbGluZXMgZHJhd25cclxuICovXHJcblJPVC5EaXNwbGF5LnByb3RvdHlwZS5kcmF3VGV4dCA9IGZ1bmN0aW9uKHgsIHksIHRleHQsIG1heFdpZHRoKSB7XHJcblx0dmFyIGZnID0gbnVsbDtcclxuXHR2YXIgYmcgPSBudWxsO1xyXG5cdHZhciBjeCA9IHg7XHJcblx0dmFyIGN5ID0geTtcclxuXHR2YXIgbGluZXMgPSAxO1xyXG5cdGlmICghbWF4V2lkdGgpIHsgbWF4V2lkdGggPSB0aGlzLl9vcHRpb25zLndpZHRoLXg7IH1cclxuXHJcblx0dmFyIHRva2VucyA9IFJPVC5UZXh0LnRva2VuaXplKHRleHQsIG1heFdpZHRoKTtcclxuXHJcblx0d2hpbGUgKHRva2Vucy5sZW5ndGgpIHsgLyogaW50ZXJwcmV0IHRva2VuaXplZCBvcGNvZGUgc3RyZWFtICovXHJcblx0XHR2YXIgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKTtcclxuXHRcdHN3aXRjaCAodG9rZW4udHlwZSkge1xyXG5cdFx0XHRjYXNlIFJPVC5UZXh0LlRZUEVfVEVYVDpcclxuXHRcdFx0XHR2YXIgaXNTcGFjZSA9IGZhbHNlLCBpc1ByZXZTcGFjZSA9IGZhbHNlLCBpc0Z1bGxXaWR0aCA9IGZhbHNlLCBpc1ByZXZGdWxsV2lkdGggPSBmYWxzZTtcclxuXHRcdFx0XHRmb3IgKHZhciBpPTA7aTx0b2tlbi52YWx1ZS5sZW5ndGg7aSsrKSB7XHJcblx0XHRcdFx0XHR2YXIgY2MgPSB0b2tlbi52YWx1ZS5jaGFyQ29kZUF0KGkpO1xyXG5cdFx0XHRcdFx0dmFyIGMgPSB0b2tlbi52YWx1ZS5jaGFyQXQoaSk7XHJcblx0XHRcdFx0XHQvLyBBc3NpZ24gdG8gYHRydWVgIHdoZW4gdGhlIGN1cnJlbnQgY2hhciBpcyBmdWxsLXdpZHRoLlxyXG5cdFx0XHRcdFx0aXNGdWxsV2lkdGggPSAoY2MgPiAweGZmMDAgJiYgY2MgPCAweGZmNjEpIHx8IChjYyA+IDB4ZmZkYyAmJiBjYyA8IDB4ZmZlOCkgfHwgY2MgPiAweGZmZWU7XHJcblx0XHRcdFx0XHQvLyBDdXJyZW50IGNoYXIgaXMgc3BhY2UsIHdoYXRldmVyIGZ1bGwtd2lkdGggb3IgaGFsZi13aWR0aCBib3RoIGFyZSBPSy5cclxuXHRcdFx0XHRcdGlzU3BhY2UgPSAoYy5jaGFyQ29kZUF0KDApID09IDB4MjAgfHwgYy5jaGFyQ29kZUF0KDApID09IDB4MzAwMCk7XHJcblx0XHRcdFx0XHQvLyBUaGUgcHJldmlvdXMgY2hhciBpcyBmdWxsLXdpZHRoIGFuZFxyXG5cdFx0XHRcdFx0Ly8gY3VycmVudCBjaGFyIGlzIG5ldGhlciBoYWxmLXdpZHRoIG5vciBhIHNwYWNlLlxyXG5cdFx0XHRcdFx0aWYgKGlzUHJldkZ1bGxXaWR0aCAmJiAhaXNGdWxsV2lkdGggJiYgIWlzU3BhY2UpIHsgY3grKzsgfSAvLyBhZGQgYW4gZXh0cmEgcG9zaXRpb25cclxuXHRcdFx0XHRcdC8vIFRoZSBjdXJyZW50IGNoYXIgaXMgZnVsbC13aWR0aCBhbmRcclxuXHRcdFx0XHRcdC8vIHRoZSBwcmV2aW91cyBjaGFyIGlzIG5vdCBhIHNwYWNlLlxyXG5cdFx0XHRcdFx0aWYoaXNGdWxsV2lkdGggJiYgIWlzUHJldlNwYWNlKSB7IGN4Kys7IH0gLy8gYWRkIGFuIGV4dHJhIHBvc2l0aW9uXHJcblx0XHRcdFx0XHR0aGlzLmRyYXcoY3grKywgY3ksIGMsIGZnLCBiZyk7XHJcblx0XHRcdFx0XHRpc1ByZXZTcGFjZSA9IGlzU3BhY2U7XHJcblx0XHRcdFx0XHRpc1ByZXZGdWxsV2lkdGggPSBpc0Z1bGxXaWR0aDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBST1QuVGV4dC5UWVBFX0ZHOlxyXG5cdFx0XHRcdGZnID0gdG9rZW4udmFsdWUgfHwgbnVsbDtcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFJPVC5UZXh0LlRZUEVfQkc6XHJcblx0XHRcdFx0YmcgPSB0b2tlbi52YWx1ZSB8fCBudWxsO1xyXG5cdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgUk9ULlRleHQuVFlQRV9ORVdMSU5FOlxyXG5cdFx0XHRcdGN4ID0geDtcclxuXHRcdFx0XHRjeSsrO1xyXG5cdFx0XHRcdGxpbmVzKys7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGxpbmVzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRpbWVyIHRpY2s6IHVwZGF0ZSBkaXJ0eSBwYXJ0c1xyXG4gKi9cclxuUk9ULkRpc3BsYXkucHJvdG90eXBlLl90aWNrID0gZnVuY3Rpb24oKSB7XHJcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3RpY2spO1xyXG5cclxuXHRpZiAoIXRoaXMuX2RpcnR5KSB7IHJldHVybjsgfVxyXG5cclxuXHRpZiAodGhpcy5fZGlydHkgPT09IHRydWUpIHsgLyogZHJhdyBhbGwgKi9cclxuXHRcdHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fb3B0aW9ucy5iZztcclxuXHRcdHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fY29udGV4dC5jYW52YXMud2lkdGgsIHRoaXMuX2NvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcblxyXG5cdFx0Zm9yICh2YXIgaWQgaW4gdGhpcy5fZGF0YSkgeyAvKiByZWRyYXcgY2FjaGVkIGRhdGEgKi9cclxuXHRcdFx0dGhpcy5fZHJhdyhpZCwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHR9IGVsc2UgeyAvKiBkcmF3IG9ubHkgZGlydHkgKi9cclxuXHRcdGZvciAodmFyIGtleSBpbiB0aGlzLl9kaXJ0eSkge1xyXG5cdFx0XHR0aGlzLl9kcmF3KGtleSwgdHJ1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0aGlzLl9kaXJ0eSA9IGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgV2hhdCB0byBkcmF3XHJcbiAqIEBwYXJhbSB7Ym9vbH0gY2xlYXJCZWZvcmUgSXMgaXQgbmVjZXNzYXJ5IHRvIGNsZWFuIGJlZm9yZT9cclxuICovXHJcblJPVC5EaXNwbGF5LnByb3RvdHlwZS5fZHJhdyA9IGZ1bmN0aW9uKGtleSwgY2xlYXJCZWZvcmUpIHtcclxuXHR2YXIgZGF0YSA9IHRoaXMuX2RhdGFba2V5XTtcclxuXHRpZiAoZGF0YVs0XSAhPSB0aGlzLl9vcHRpb25zLmJnKSB7IGNsZWFyQmVmb3JlID0gdHJ1ZTsgfVxyXG5cclxuXHR0aGlzLl9iYWNrZW5kLmRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpO1xyXG59O1xyXG4vKipcclxuICogQGNsYXNzIEFic3RyYWN0IGRpc3BsYXkgYmFja2VuZCBtb2R1bGVcclxuICogQHByaXZhdGVcclxuICovXHJcblJPVC5EaXNwbGF5LkJhY2tlbmQgPSBmdW5jdGlvbihjb250ZXh0KSB7XHJcblx0dGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XHJcbn07XHJcblxyXG5ST1QuRGlzcGxheS5CYWNrZW5kLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG59O1xyXG5cclxuUk9ULkRpc3BsYXkuQmFja2VuZC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGRhdGEsIGNsZWFyQmVmb3JlKSB7XHJcbn07XHJcblxyXG5ST1QuRGlzcGxheS5CYWNrZW5kLnByb3RvdHlwZS5jb21wdXRlU2l6ZSA9IGZ1bmN0aW9uKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XHJcbn07XHJcblxyXG5ST1QuRGlzcGxheS5CYWNrZW5kLnByb3RvdHlwZS5jb21wdXRlRm9udFNpemUgPSBmdW5jdGlvbihhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xyXG59O1xyXG5cclxuUk9ULkRpc3BsYXkuQmFja2VuZC5wcm90b3R5cGUuZXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24oeCwgeSkge1xyXG59O1xyXG4vKipcclxuICogQGNsYXNzIFJlY3Rhbmd1bGFyIGJhY2tlbmRcclxuICogQHByaXZhdGVcclxuICovXHJcblJPVC5EaXNwbGF5LlJlY3QgPSBmdW5jdGlvbihjb250ZXh0KSB7XHJcblx0Uk9ULkRpc3BsYXkuQmFja2VuZC5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG5cdFxyXG5cdHRoaXMuX3NwYWNpbmdYID0gMDtcclxuXHR0aGlzLl9zcGFjaW5nWSA9IDA7XHJcblx0dGhpcy5fY2FudmFzQ2FjaGUgPSB7fTtcclxuXHR0aGlzLl9vcHRpb25zID0ge307XHJcbn07XHJcblJPVC5EaXNwbGF5LlJlY3QuZXh0ZW5kKFJPVC5EaXNwbGF5LkJhY2tlbmQpO1xyXG5cclxuUk9ULkRpc3BsYXkuUmVjdC5jYWNoZSA9IGZhbHNlO1xyXG5cclxuUk9ULkRpc3BsYXkuUmVjdC5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHR0aGlzLl9jYW52YXNDYWNoZSA9IHt9O1xyXG5cdHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuXHR2YXIgY2hhcldpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2NvbnRleHQubWVhc3VyZVRleHQoXCLilpRcIikud2lkdGgpO1xyXG5cdHRoaXMuX3NwYWNpbmdYID0gTWF0aC5jZWlsKG9wdGlvbnMuc3BhY2luZyAqIGNoYXJXaWR0aCk7XHJcblx0dGhpcy5fc3BhY2luZ1kgPSBNYXRoLmNlaWwob3B0aW9ucy5zcGFjaW5nICogb3B0aW9ucy5mb250U2l6ZSk7XHJcblxyXG5cdGlmICh0aGlzLl9vcHRpb25zLmZvcmNlU3F1YXJlUmF0aW8pIHtcclxuXHRcdHRoaXMuX3NwYWNpbmdYID0gdGhpcy5fc3BhY2luZ1kgPSBNYXRoLm1heCh0aGlzLl9zcGFjaW5nWCwgdGhpcy5fc3BhY2luZ1kpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5fY29udGV4dC5jYW52YXMud2lkdGggPSBvcHRpb25zLndpZHRoICogdGhpcy5fc3BhY2luZ1g7XHJcblx0dGhpcy5fY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgKiB0aGlzLl9zcGFjaW5nWTtcclxufTtcclxuXHJcblJPVC5EaXNwbGF5LlJlY3QucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihkYXRhLCBjbGVhckJlZm9yZSkge1xyXG5cdGlmICh0aGlzLmNvbnN0cnVjdG9yLmNhY2hlKSB7XHJcblx0XHR0aGlzLl9kcmF3V2l0aENhY2hlKGRhdGEsIGNsZWFyQmVmb3JlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhpcy5fZHJhd05vQ2FjaGUoZGF0YSwgY2xlYXJCZWZvcmUpO1xyXG5cdH1cclxufTtcclxuXHJcblJPVC5EaXNwbGF5LlJlY3QucHJvdG90eXBlLl9kcmF3V2l0aENhY2hlID0gZnVuY3Rpb24oZGF0YSwgY2xlYXJCZWZvcmUpIHtcclxuXHR2YXIgeCA9IGRhdGFbMF07XHJcblx0dmFyIHkgPSBkYXRhWzFdO1xyXG5cdHZhciBjaCA9IGRhdGFbMl07XHJcblx0dmFyIGZnID0gZGF0YVszXTtcclxuXHR2YXIgYmcgPSBkYXRhWzRdO1xyXG5cclxuXHR2YXIgaGFzaCA9IFwiXCIrY2grZmcrYmc7XHJcblx0aWYgKGhhc2ggaW4gdGhpcy5fY2FudmFzQ2FjaGUpIHtcclxuXHRcdHZhciBjYW52YXMgPSB0aGlzLl9jYW52YXNDYWNoZVtoYXNoXTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcclxuXHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblx0XHRjYW52YXMud2lkdGggPSB0aGlzLl9zcGFjaW5nWDtcclxuXHRcdGNhbnZhcy5oZWlnaHQgPSB0aGlzLl9zcGFjaW5nWTtcclxuXHRcdGN0eC5maWxsU3R5bGUgPSBiZztcclxuXHRcdGN0eC5maWxsUmVjdChiLCBiLCBjYW52YXMud2lkdGgtYiwgY2FudmFzLmhlaWdodC1iKTtcclxuXHRcdFxyXG5cdFx0aWYgKGNoKSB7XHJcblx0XHRcdGN0eC5maWxsU3R5bGUgPSBmZztcclxuXHRcdFx0Y3R4LmZvbnQgPSB0aGlzLl9jb250ZXh0LmZvbnQ7XHJcblx0XHRcdGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cdFx0XHRjdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcclxuXHJcblx0XHRcdHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XHJcblx0XHRcdGZvciAodmFyIGk9MDtpPGNoYXJzLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0XHRjdHguZmlsbFRleHQoY2hhcnNbaV0sIHRoaXMuX3NwYWNpbmdYLzIsIE1hdGguY2VpbCh0aGlzLl9zcGFjaW5nWS8yKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuX2NhbnZhc0NhY2hlW2hhc2hdID0gY2FudmFzO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShjYW52YXMsIHgqdGhpcy5fc3BhY2luZ1gsIHkqdGhpcy5fc3BhY2luZ1kpO1xyXG59O1xyXG5cclxuUk9ULkRpc3BsYXkuUmVjdC5wcm90b3R5cGUuX2RyYXdOb0NhY2hlID0gZnVuY3Rpb24oZGF0YSwgY2xlYXJCZWZvcmUpIHtcclxuXHR2YXIgeCA9IGRhdGFbMF07XHJcblx0dmFyIHkgPSBkYXRhWzFdO1xyXG5cdHZhciBjaCA9IGRhdGFbMl07XHJcblx0dmFyIGZnID0gZGF0YVszXTtcclxuXHR2YXIgYmcgPSBkYXRhWzRdO1xyXG5cclxuXHRpZiAoY2xlYXJCZWZvcmUpIHsgXHJcblx0XHR2YXIgYiA9IHRoaXMuX29wdGlvbnMuYm9yZGVyO1xyXG5cdFx0dGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBiZztcclxuXHRcdHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoeCp0aGlzLl9zcGFjaW5nWCArIGIsIHkqdGhpcy5fc3BhY2luZ1kgKyBiLCB0aGlzLl9zcGFjaW5nWCAtIGIsIHRoaXMuX3NwYWNpbmdZIC0gYik7XHJcblx0fVxyXG5cdFxyXG5cdGlmICghY2gpIHsgcmV0dXJuOyB9XHJcblxyXG5cdHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gZmc7XHJcblxyXG5cdHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XHJcblx0Zm9yICh2YXIgaT0wO2k8Y2hhcnMubGVuZ3RoO2krKykge1xyXG5cdFx0dGhpcy5fY29udGV4dC5maWxsVGV4dChjaGFyc1tpXSwgKHgrMC41KSAqIHRoaXMuX3NwYWNpbmdYLCBNYXRoLmNlaWwoKHkrMC41KSAqIHRoaXMuX3NwYWNpbmdZKSk7XHJcblx0fVxyXG59O1xyXG5cclxuUk9ULkRpc3BsYXkuUmVjdC5wcm90b3R5cGUuY29tcHV0ZVNpemUgPSBmdW5jdGlvbihhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xyXG5cdHZhciB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX3NwYWNpbmdYKTtcclxuXHR2YXIgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX3NwYWNpbmdZKTtcclxuXHRyZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xyXG59O1xyXG5cclxuUk9ULkRpc3BsYXkuUmVjdC5wcm90b3R5cGUuY29tcHV0ZUZvbnRTaXplID0gZnVuY3Rpb24oYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcclxuXHR2YXIgYm94V2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLndpZHRoKTtcclxuXHR2YXIgYm94SGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0KTtcclxuXHJcblx0LyogY29tcHV0ZSBjaGFyIHJhdGlvICovXHJcblx0dmFyIG9sZEZvbnQgPSB0aGlzLl9jb250ZXh0LmZvbnQ7XHJcblx0dGhpcy5fY29udGV4dC5mb250ID0gXCIxMDBweCBcIiArIHRoaXMuX29wdGlvbnMuZm9udEZhbWlseTtcclxuXHR2YXIgd2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY29udGV4dC5tZWFzdXJlVGV4dChcIuKWlFwiKS53aWR0aCk7XHJcblx0dGhpcy5fY29udGV4dC5mb250ID0gb2xkRm9udDtcclxuXHR2YXIgcmF0aW8gPSB3aWR0aCAvIDEwMDtcclxuXHRcdFxyXG5cdHZhciB3aWR0aEZyYWN0aW9uID0gcmF0aW8gKiBib3hIZWlnaHQgLyBib3hXaWR0aDtcclxuXHRpZiAod2lkdGhGcmFjdGlvbiA+IDEpIHsgLyogdG9vIHdpZGUgd2l0aCBjdXJyZW50IGFzcGVjdCByYXRpbyAqL1xyXG5cdFx0Ym94SGVpZ2h0ID0gTWF0aC5mbG9vcihib3hIZWlnaHQgLyB3aWR0aEZyYWN0aW9uKTtcclxuXHR9XHJcblx0cmV0dXJuIE1hdGguZmxvb3IoYm94SGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5zcGFjaW5nKTtcclxufTtcclxuXHJcblJPVC5EaXNwbGF5LlJlY3QucHJvdG90eXBlLmV2ZW50VG9Qb3NpdGlvbiA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuXHRyZXR1cm4gW01hdGguZmxvb3IoeC90aGlzLl9zcGFjaW5nWCksIE1hdGguZmxvb3IoeS90aGlzLl9zcGFjaW5nWSldO1xyXG59O1xyXG4vKipcclxuICogQGNsYXNzIEhleGFnb25hbCBiYWNrZW5kXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5ST1QuRGlzcGxheS5IZXggPSBmdW5jdGlvbihjb250ZXh0KSB7XHJcblx0Uk9ULkRpc3BsYXkuQmFja2VuZC5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG5cclxuXHR0aGlzLl9zcGFjaW5nWCA9IDA7XHJcblx0dGhpcy5fc3BhY2luZ1kgPSAwO1xyXG5cdHRoaXMuX2hleFNpemUgPSAwO1xyXG5cdHRoaXMuX29wdGlvbnMgPSB7fTtcclxufTtcclxuUk9ULkRpc3BsYXkuSGV4LmV4dGVuZChST1QuRGlzcGxheS5CYWNrZW5kKTtcclxuXHJcblJPVC5EaXNwbGF5LkhleC5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHR0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuXHJcblx0LyogRklYTUUgY2hhciBzaXplIGNvbXB1dGF0aW9uIGRvZXMgbm90IHJlc3BlY3QgdHJhbnNwb3NlZCBoZXhlcyAqL1xyXG5cdHZhciBjaGFyV2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY29udGV4dC5tZWFzdXJlVGV4dChcIuKWlFwiKS53aWR0aCk7XHJcblx0dGhpcy5faGV4U2l6ZSA9IE1hdGguZmxvb3Iob3B0aW9ucy5zcGFjaW5nICogKG9wdGlvbnMuZm9udFNpemUgKyBjaGFyV2lkdGgvTWF0aC5zcXJ0KDMpKSAvIDIpO1xyXG5cdHRoaXMuX3NwYWNpbmdYID0gdGhpcy5faGV4U2l6ZSAqIE1hdGguc3FydCgzKSAvIDI7XHJcblx0dGhpcy5fc3BhY2luZ1kgPSB0aGlzLl9oZXhTaXplICogMS41O1xyXG5cclxuXHRpZiAob3B0aW9ucy50cmFuc3Bvc2UpIHtcclxuXHRcdHZhciB4cHJvcCA9IFwiaGVpZ2h0XCI7XHJcblx0XHR2YXIgeXByb3AgPSBcIndpZHRoXCI7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciB4cHJvcCA9IFwid2lkdGhcIjtcclxuXHRcdHZhciB5cHJvcCA9IFwiaGVpZ2h0XCI7XHJcblx0fVxyXG5cdHRoaXMuX2NvbnRleHQuY2FudmFzW3hwcm9wXSA9IE1hdGguY2VpbCggKG9wdGlvbnMud2lkdGggKyAxKSAqIHRoaXMuX3NwYWNpbmdYICk7XHJcblx0dGhpcy5fY29udGV4dC5jYW52YXNbeXByb3BdID0gTWF0aC5jZWlsKCAob3B0aW9ucy5oZWlnaHQgLSAxKSAqIHRoaXMuX3NwYWNpbmdZICsgMip0aGlzLl9oZXhTaXplICk7XHJcbn07XHJcblxyXG5ST1QuRGlzcGxheS5IZXgucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihkYXRhLCBjbGVhckJlZm9yZSkge1xyXG5cdHZhciB4ID0gZGF0YVswXTtcclxuXHR2YXIgeSA9IGRhdGFbMV07XHJcblx0dmFyIGNoID0gZGF0YVsyXTtcclxuXHR2YXIgZmcgPSBkYXRhWzNdO1xyXG5cdHZhciBiZyA9IGRhdGFbNF07XHJcblxyXG5cdHZhciBweCA9IFtcclxuXHRcdCh4KzEpICogdGhpcy5fc3BhY2luZ1gsXHJcblx0XHR5ICogdGhpcy5fc3BhY2luZ1kgKyB0aGlzLl9oZXhTaXplXHJcblx0XTtcclxuXHRpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHsgcHgucmV2ZXJzZSgpOyB9XHJcblxyXG5cdGlmIChjbGVhckJlZm9yZSkge1xyXG5cdFx0dGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBiZztcclxuXHRcdHRoaXMuX2ZpbGwocHhbMF0sIHB4WzFdKTtcclxuXHR9XHJcblxyXG5cdGlmICghY2gpIHsgcmV0dXJuOyB9XHJcblxyXG5cdHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gZmc7XHJcblxyXG5cdHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XHJcblx0Zm9yICh2YXIgaT0wO2k8Y2hhcnMubGVuZ3RoO2krKykge1xyXG5cdFx0dGhpcy5fY29udGV4dC5maWxsVGV4dChjaGFyc1tpXSwgcHhbMF0sIE1hdGguY2VpbChweFsxXSkpO1xyXG5cdH1cclxufTtcclxuXHJcblJPVC5EaXNwbGF5LkhleC5wcm90b3R5cGUuY29tcHV0ZVNpemUgPSBmdW5jdGlvbihhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xyXG5cdGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xyXG5cdFx0YXZhaWxXaWR0aCArPSBhdmFpbEhlaWdodDtcclxuXHRcdGF2YWlsSGVpZ2h0ID0gYXZhaWxXaWR0aCAtIGF2YWlsSGVpZ2h0O1xyXG5cdFx0YXZhaWxXaWR0aCAtPSBhdmFpbEhlaWdodDtcclxuXHR9XHJcblxyXG5cdHZhciB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX3NwYWNpbmdYKSAtIDE7XHJcblx0dmFyIGhlaWdodCA9IE1hdGguZmxvb3IoKGF2YWlsSGVpZ2h0IC0gMip0aGlzLl9oZXhTaXplKSAvIHRoaXMuX3NwYWNpbmdZICsgMSk7XHJcblx0cmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcclxufTtcclxuXHJcblJPVC5EaXNwbGF5LkhleC5wcm90b3R5cGUuY29tcHV0ZUZvbnRTaXplID0gZnVuY3Rpb24oYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcclxuXHRpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcclxuXHRcdGF2YWlsV2lkdGggKz0gYXZhaWxIZWlnaHQ7XHJcblx0XHRhdmFpbEhlaWdodCA9IGF2YWlsV2lkdGggLSBhdmFpbEhlaWdodDtcclxuXHRcdGF2YWlsV2lkdGggLT0gYXZhaWxIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHR2YXIgaGV4U2l6ZVdpZHRoID0gMiphdmFpbFdpZHRoIC8gKCh0aGlzLl9vcHRpb25zLndpZHRoKzEpICogTWF0aC5zcXJ0KDMpKSAtIDE7XHJcblx0dmFyIGhleFNpemVIZWlnaHQgPSBhdmFpbEhlaWdodCAvICgyICsgMS41Kih0aGlzLl9vcHRpb25zLmhlaWdodC0xKSk7XHJcblx0dmFyIGhleFNpemUgPSBNYXRoLm1pbihoZXhTaXplV2lkdGgsIGhleFNpemVIZWlnaHQpO1xyXG5cclxuXHQvKiBjb21wdXRlIGNoYXIgcmF0aW8gKi9cclxuXHR2YXIgb2xkRm9udCA9IHRoaXMuX2NvbnRleHQuZm9udDtcclxuXHR0aGlzLl9jb250ZXh0LmZvbnQgPSBcIjEwMHB4IFwiICsgdGhpcy5fb3B0aW9ucy5mb250RmFtaWx5O1xyXG5cdHZhciB3aWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jb250ZXh0Lm1lYXN1cmVUZXh0KFwi4paUXCIpLndpZHRoKTtcclxuXHR0aGlzLl9jb250ZXh0LmZvbnQgPSBvbGRGb250O1xyXG5cdHZhciByYXRpbyA9IHdpZHRoIC8gMTAwO1xyXG5cclxuXHRoZXhTaXplID0gTWF0aC5mbG9vcihoZXhTaXplKSsxOyAvKiBjbG9zZXN0IGxhcmdlciBoZXhTaXplICovXHJcblxyXG5cdC8qIEZJWE1FIGNoYXIgc2l6ZSBjb21wdXRhdGlvbiBkb2VzIG5vdCByZXNwZWN0IHRyYW5zcG9zZWQgaGV4ZXMgKi9cclxuXHR2YXIgZm9udFNpemUgPSAyKmhleFNpemUgLyAodGhpcy5fb3B0aW9ucy5zcGFjaW5nICogKDEgKyByYXRpbyAvIE1hdGguc3FydCgzKSkpO1xyXG5cclxuXHQvKiBjbG9zZXN0IHNtYWxsZXIgZm9udFNpemUgKi9cclxuXHRyZXR1cm4gTWF0aC5jZWlsKGZvbnRTaXplKS0xO1xyXG59O1xyXG5cclxuUk9ULkRpc3BsYXkuSGV4LnByb3RvdHlwZS5ldmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbih4LCB5KSB7XHJcblx0aWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XHJcblx0XHR4ICs9IHk7XHJcblx0XHR5ID0geC15O1xyXG5cdFx0eCAtPSB5O1xyXG5cdFx0dmFyIG5vZGVTaXplID0gdGhpcy5fY29udGV4dC5jYW52YXMud2lkdGg7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBub2RlU2l6ZSA9IHRoaXMuX2NvbnRleHQuY2FudmFzLmhlaWdodDtcclxuXHR9XHJcblx0dmFyIHNpemUgPSBub2RlU2l6ZSAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0O1xyXG5cdHkgPSBNYXRoLmZsb29yKHkvc2l6ZSk7XHJcblxyXG5cdGlmICh5Lm1vZCgyKSkgeyAvKiBvZGQgcm93ICovXHJcblx0XHR4IC09IHRoaXMuX3NwYWNpbmdYO1xyXG5cdFx0eCA9IDEgKyAyKk1hdGguZmxvb3IoeC8oMip0aGlzLl9zcGFjaW5nWCkpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR4ID0gMipNYXRoLmZsb29yKHgvKDIqdGhpcy5fc3BhY2luZ1gpKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBbeCwgeV07XHJcbn07XHJcblxyXG4vKipcclxuICogQXJndW1lbnRzIGFyZSBwaXhlbCB2YWx1ZXMuIElmIFwidHJhbnNwb3NlZFwiIG1vZGUgaXMgZW5hYmxlZCwgdGhlbiB0aGVzZSB0d28gYXJlIGFscmVhZHkgc3dhcHBlZC5cclxuICovXHJcblJPVC5EaXNwbGF5LkhleC5wcm90b3R5cGUuX2ZpbGwgPSBmdW5jdGlvbihjeCwgY3kpIHtcclxuXHR2YXIgYSA9IHRoaXMuX2hleFNpemU7XHJcblx0dmFyIGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcclxuXHJcblx0dGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcblx0aWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XHJcblx0XHR0aGlzLl9jb250ZXh0Lm1vdmVUbyhjeC1hK2IsXHRjeSk7XHJcblx0XHR0aGlzLl9jb250ZXh0LmxpbmVUbyhjeC1hLzIrYixcdGN5K3RoaXMuX3NwYWNpbmdYLWIpO1xyXG5cdFx0dGhpcy5fY29udGV4dC5saW5lVG8oY3grYS8yLWIsXHRjeSt0aGlzLl9zcGFjaW5nWC1iKTtcclxuXHRcdHRoaXMuX2NvbnRleHQubGluZVRvKGN4K2EtYixcdGN5KTtcclxuXHRcdHRoaXMuX2NvbnRleHQubGluZVRvKGN4K2EvMi1iLFx0Y3ktdGhpcy5fc3BhY2luZ1grYik7XHJcblx0XHR0aGlzLl9jb250ZXh0LmxpbmVUbyhjeC1hLzIrYixcdGN5LXRoaXMuX3NwYWNpbmdYK2IpO1xyXG5cdFx0dGhpcy5fY29udGV4dC5saW5lVG8oY3gtYStiLFx0Y3kpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aGlzLl9jb250ZXh0Lm1vdmVUbyhjeCxcdFx0XHRcdFx0Y3ktYStiKTtcclxuXHRcdHRoaXMuX2NvbnRleHQubGluZVRvKGN4K3RoaXMuX3NwYWNpbmdYLWIsXHRjeS1hLzIrYik7XHJcblx0XHR0aGlzLl9jb250ZXh0LmxpbmVUbyhjeCt0aGlzLl9zcGFjaW5nWC1iLFx0Y3krYS8yLWIpO1xyXG5cdFx0dGhpcy5fY29udGV4dC5saW5lVG8oY3gsXHRcdFx0XHRcdGN5K2EtYik7XHJcblx0XHR0aGlzLl9jb250ZXh0LmxpbmVUbyhjeC10aGlzLl9zcGFjaW5nWCtiLFx0Y3krYS8yLWIpO1xyXG5cdFx0dGhpcy5fY29udGV4dC5saW5lVG8oY3gtdGhpcy5fc3BhY2luZ1grYixcdGN5LWEvMitiKTtcclxuXHRcdHRoaXMuX2NvbnRleHQubGluZVRvKGN4LFx0XHRcdFx0XHRjeS1hK2IpO1xyXG5cdH1cclxuXHR0aGlzLl9jb250ZXh0LmZpbGwoKTtcclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBUaWxlIGJhY2tlbmRcclxuICogQHByaXZhdGVcclxuICovXHJcblJPVC5EaXNwbGF5LlRpbGUgPSBmdW5jdGlvbihjb250ZXh0KSB7XHJcblx0Uk9ULkRpc3BsYXkuUmVjdC5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG5cdFxyXG5cdHRoaXMuX29wdGlvbnMgPSB7fTtcclxuXHR0aGlzLl9jb2xvckNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbn07XHJcblJPVC5EaXNwbGF5LlRpbGUuZXh0ZW5kKFJPVC5EaXNwbGF5LlJlY3QpO1xyXG5cclxuUk9ULkRpc3BsYXkuVGlsZS5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHR0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuXHR0aGlzLl9jb250ZXh0LmNhbnZhcy53aWR0aCA9IG9wdGlvbnMud2lkdGggKiBvcHRpb25zLnRpbGVXaWR0aDtcclxuXHR0aGlzLl9jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCAqIG9wdGlvbnMudGlsZUhlaWdodDtcclxuXHR0aGlzLl9jb2xvckNhbnZhcy53aWR0aCA9IG9wdGlvbnMudGlsZVdpZHRoO1xyXG5cdHRoaXMuX2NvbG9yQ2FudmFzLmhlaWdodCA9IG9wdGlvbnMudGlsZUhlaWdodDtcclxufTtcclxuXHJcblJPVC5EaXNwbGF5LlRpbGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihkYXRhLCBjbGVhckJlZm9yZSkge1xyXG5cdHZhciB4ID0gZGF0YVswXTtcclxuXHR2YXIgeSA9IGRhdGFbMV07XHJcblx0dmFyIGNoID0gZGF0YVsyXTtcclxuXHR2YXIgZmcgPSBkYXRhWzNdO1xyXG5cdHZhciBiZyA9IGRhdGFbNF07XHJcblxyXG5cdHZhciB0aWxlV2lkdGggPSB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aDtcclxuXHR2YXIgdGlsZUhlaWdodCA9IHRoaXMuX29wdGlvbnMudGlsZUhlaWdodDtcclxuXHJcblx0aWYgKGNsZWFyQmVmb3JlKSB7XHJcblx0XHRpZiAodGhpcy5fb3B0aW9ucy50aWxlQ29sb3JpemUpIHtcclxuXHRcdFx0dGhpcy5fY29udGV4dC5jbGVhclJlY3QoeCp0aWxlV2lkdGgsIHkqdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gYmc7XHJcblx0XHRcdHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoeCp0aWxlV2lkdGgsIHkqdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmICghY2gpIHsgcmV0dXJuOyB9XHJcblxyXG5cdHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XHJcblx0Zm9yICh2YXIgaT0wO2k8Y2hhcnMubGVuZ3RoO2krKykge1xyXG5cdFx0dmFyIHRpbGUgPSB0aGlzLl9vcHRpb25zLnRpbGVNYXBbY2hhcnNbaV1dO1xyXG5cdFx0aWYgKCF0aWxlKSB7IHRocm93IG5ldyBFcnJvcihcIkNoYXIgJ1wiICsgY2hhcnNbaV0gKyBcIicgbm90IGZvdW5kIGluIHRpbGVNYXBcIik7IH1cclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7IC8qIGFwcGx5IGNvbG9yaXphdGlvbiAqL1xyXG5cdFx0XHR2YXIgY2FudmFzID0gdGhpcy5fY29sb3JDYW52YXM7XHJcblx0XHRcdHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHRcdFx0Y29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcclxuXHJcblx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKFxyXG5cdFx0XHRcdHRoaXMuX29wdGlvbnMudGlsZVNldCxcclxuXHRcdFx0XHR0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsXHJcblx0XHRcdFx0MCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0XHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRpZiAoZmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XHJcblx0XHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcclxuXHRcdFx0XHRjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWF0b3BcIjtcclxuXHRcdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChiZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcclxuXHRcdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xyXG5cdFx0XHRcdGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdmVyXCI7XHJcblx0XHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShjYW52YXMsIHgqdGlsZVdpZHRoLCB5KnRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XHJcblxyXG5cdFx0fSBlbHNlIHsgLyogbm8gY29sb3JpemluZywgZWFzeSAqL1xyXG5cdFx0XHR0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShcclxuXHRcdFx0XHR0aGlzLl9vcHRpb25zLnRpbGVTZXQsXHJcblx0XHRcdFx0dGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LFxyXG5cdFx0XHRcdHgqdGlsZVdpZHRoLCB5KnRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblJPVC5EaXNwbGF5LlRpbGUucHJvdG90eXBlLmNvbXB1dGVTaXplID0gZnVuY3Rpb24oYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcclxuXHR2YXIgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCk7XHJcblx0dmFyIGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpO1xyXG5cdHJldHVybiBbd2lkdGgsIGhlaWdodF07XHJcbn07XHJcblxyXG5ST1QuRGlzcGxheS5UaWxlLnByb3RvdHlwZS5jb21wdXRlRm9udFNpemUgPSBmdW5jdGlvbihhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xyXG5cdHZhciB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMud2lkdGgpO1xyXG5cdHZhciBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5oZWlnaHQpO1xyXG5cdHJldHVybiBbd2lkdGgsIGhlaWdodF07XHJcbn07XHJcblxyXG5ST1QuRGlzcGxheS5UaWxlLnByb3RvdHlwZS5ldmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbih4LCB5KSB7XHJcblx0cmV0dXJuIFtNYXRoLmZsb29yKHgvdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpLCBNYXRoLmZsb29yKHkvdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KV07XHJcbn07XHJcbi8qKlxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqIFRoaXMgY29kZSBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBBbGVhIGFsZ29yaXRobTsgKEMpIDIwMTAgSm9oYW5uZXMgQmFhZ8O4ZS5cclxuICogQWxlYSBpcyBsaWNlbnNlZCBhY2NvcmRpbmcgdG8gdGhlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2UuXHJcbiAqL1xyXG5ST1QuUk5HID0ge1xyXG5cdC8qKlxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9IFxyXG5cdCAqL1xyXG5cdGdldFNlZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlZWQ7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHNlZWQgU2VlZCB0aGUgbnVtYmVyIGdlbmVyYXRvclxyXG5cdCAqL1xyXG5cdHNldFNlZWQ6IGZ1bmN0aW9uKHNlZWQpIHtcclxuXHRcdHNlZWQgPSAoc2VlZCA8IDEgPyAxL3NlZWQgOiBzZWVkKTtcclxuXHJcblx0XHR0aGlzLl9zZWVkID0gc2VlZDtcclxuXHRcdHRoaXMuX3MwID0gKHNlZWQgPj4+IDApICogdGhpcy5fZnJhYztcclxuXHJcblx0XHRzZWVkID0gKHNlZWQqNjkwNjkgKyAxKSA+Pj4gMDtcclxuXHRcdHRoaXMuX3MxID0gc2VlZCAqIHRoaXMuX2ZyYWM7XHJcblxyXG5cdFx0c2VlZCA9IChzZWVkKjY5MDY5ICsgMSkgPj4+IDA7XHJcblx0XHR0aGlzLl9zMiA9IHNlZWQgKiB0aGlzLl9mcmFjO1xyXG5cclxuXHRcdHRoaXMuX2MgPSAxO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogQHJldHVybnMge2Zsb2F0fSBQc2V1ZG9yYW5kb20gdmFsdWUgWzAsMSksIHVuaWZvcm1seSBkaXN0cmlidXRlZFxyXG5cdCAqL1xyXG5cdGdldFVuaWZvcm06IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHQgPSAyMDkxNjM5ICogdGhpcy5fczAgKyB0aGlzLl9jICogdGhpcy5fZnJhYztcclxuXHRcdHRoaXMuX3MwID0gdGhpcy5fczE7XHJcblx0XHR0aGlzLl9zMSA9IHRoaXMuX3MyO1xyXG5cdFx0dGhpcy5fYyA9IHQgfCAwO1xyXG5cdFx0dGhpcy5fczIgPSB0IC0gdGhpcy5fYztcclxuXHRcdHJldHVybiB0aGlzLl9zMjtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge2ludH0gbG93ZXJCb3VuZCBUaGUgbG93ZXIgZW5kIG9mIHRoZSByYW5nZSB0byByZXR1cm4gYSB2YWx1ZSBmcm9tLCBpbmNsdXNpdmVcclxuXHQgKiBAcGFyYW0ge2ludH0gdXBwZXJCb3VuZCBUaGUgdXBwZXIgZW5kIG9mIHRoZSByYW5nZSB0byByZXR1cm4gYSB2YWx1ZSBmcm9tLCBpbmNsdXNpdmVcclxuXHQgKiBAcmV0dXJucyB7aW50fSBQc2V1ZG9yYW5kb20gdmFsdWUgW2xvd2VyQm91bmQsIHVwcGVyQm91bmRdLCB1c2luZyBST1QuUk5HLmdldFVuaWZvcm0oKSB0byBkaXN0cmlidXRlIHRoZSB2YWx1ZVxyXG5cdCAqL1xyXG5cdGdldFVuaWZvcm1JbnQ6IGZ1bmN0aW9uKGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcclxuXHRcdHZhciBtYXggPSBNYXRoLm1heChsb3dlckJvdW5kLCB1cHBlckJvdW5kKTtcclxuXHRcdHZhciBtaW4gPSBNYXRoLm1pbihsb3dlckJvdW5kLCB1cHBlckJvdW5kKTtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge2Zsb2F0fSBbbWVhbj0wXSBNZWFuIHZhbHVlXHJcblx0ICogQHBhcmFtIHtmbG9hdH0gW3N0ZGRldj0xXSBTdGFuZGFyZCBkZXZpYXRpb24uIH45NSUgb2YgdGhlIGFic29sdXRlIHZhbHVlcyB3aWxsIGJlIGxvd2VyIHRoYW4gMipzdGRkZXYuXHJcblx0ICogQHJldHVybnMge2Zsb2F0fSBBIG5vcm1hbGx5IGRpc3RyaWJ1dGVkIHBzZXVkb3JhbmRvbSB2YWx1ZVxyXG5cdCAqL1xyXG5cdGdldE5vcm1hbDogZnVuY3Rpb24obWVhbiwgc3RkZGV2KSB7XHJcblx0XHRkbyB7XHJcblx0XHRcdHZhciB1ID0gMip0aGlzLmdldFVuaWZvcm0oKS0xO1xyXG5cdFx0XHR2YXIgdiA9IDIqdGhpcy5nZXRVbmlmb3JtKCktMTtcclxuXHRcdFx0dmFyIHIgPSB1KnUgKyB2KnY7XHJcblx0XHR9IHdoaWxlIChyID4gMSB8fCByID09IDApO1xyXG5cclxuXHRcdHZhciBnYXVzcyA9IHUgKiBNYXRoLnNxcnQoLTIqTWF0aC5sb2cocikvcik7XHJcblx0XHRyZXR1cm4gKG1lYW4gfHwgMCkgKyBnYXVzcyooc3RkZGV2IHx8IDEpO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIEByZXR1cm5zIHtpbnR9IFBzZXVkb3JhbmRvbSB2YWx1ZSBbMSwxMDBdIGluY2x1c2l2ZSwgdW5pZm9ybWx5IGRpc3RyaWJ1dGVkXHJcblx0ICovXHJcblx0Z2V0UGVyY2VudGFnZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gMSArIE1hdGguZmxvb3IodGhpcy5nZXRVbmlmb3JtKCkqMTAwKTtcclxuXHR9LFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIGtleT13aGF0ZXZlciwgdmFsdWU9d2VpZ2h0IChyZWxhdGl2ZSBwcm9iYWJpbGl0eSlcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSB3aGF0ZXZlclxyXG5cdCAqL1xyXG5cdGdldFdlaWdodGVkVmFsdWU6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdHZhciB0b3RhbCA9IDA7XHJcblx0XHRcclxuXHRcdGZvciAodmFyIGlkIGluIGRhdGEpIHtcclxuXHRcdFx0dG90YWwgKz0gZGF0YVtpZF07XHJcblx0XHR9XHJcblx0XHR2YXIgcmFuZG9tID0gdGhpcy5nZXRVbmlmb3JtKCkqdG90YWw7XHJcblx0XHRcclxuXHRcdHZhciBwYXJ0ID0gMDtcclxuXHRcdGZvciAodmFyIGlkIGluIGRhdGEpIHtcclxuXHRcdFx0cGFydCArPSBkYXRhW2lkXTtcclxuXHRcdFx0aWYgKHJhbmRvbSA8IHBhcnQpIHsgcmV0dXJuIGlkOyB9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSWYgYnkgc29tZSBmbG9hdGluZy1wb2ludCBhbm5veWFuY2Ugd2UgaGF2ZVxyXG5cdFx0Ly8gcmFuZG9tID49IHRvdGFsLCBqdXN0IHJldHVybiB0aGUgbGFzdCBpZC5cclxuXHRcdHJldHVybiBpZDtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgUk5HIHN0YXRlLiBVc2VmdWwgZm9yIHN0b3JpbmcgdGhlIHN0YXRlIGFuZCByZS1zZXR0aW5nIGl0IHZpYSBzZXRTdGF0ZS5cclxuXHQgKiBAcmV0dXJucyB7P30gSW50ZXJuYWwgc3RhdGVcclxuXHQgKi9cclxuXHRnZXRTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gW3RoaXMuX3MwLCB0aGlzLl9zMSwgdGhpcy5fczIsIHRoaXMuX2NdO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBhIHByZXZpb3VzbHkgcmV0cmlldmVkIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSB7P30gc3RhdGVcclxuXHQgKi9cclxuXHRzZXRTdGF0ZTogZnVuY3Rpb24oc3RhdGUpIHtcclxuXHRcdHRoaXMuX3MwID0gc3RhdGVbMF07XHJcblx0XHR0aGlzLl9zMSA9IHN0YXRlWzFdO1xyXG5cdFx0dGhpcy5fczIgPSBzdGF0ZVsyXTtcclxuXHRcdHRoaXMuX2MgID0gc3RhdGVbM107XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgY2xvbmVkIFJOR1xyXG5cdCAqL1xyXG5cdGNsb25lOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjbG9uZSA9IE9iamVjdC5jcmVhdGUodGhpcyk7XHJcblx0XHRjbG9uZS5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlKCkpO1xyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH0sXHJcblxyXG5cdF9zMDogMCxcclxuXHRfczE6IDAsXHJcblx0X3MyOiAwLFxyXG5cdF9jOiAwLFxyXG5cdF9mcmFjOiAyLjMyODMwNjQzNjUzODY5NjNlLTEwIC8qIDJeLTMyICovXHJcbn07XHJcblxyXG5ST1QuUk5HLnNldFNlZWQoRGF0ZS5ub3coKSk7XHJcbi8qKlxyXG4gKiBAY2xhc3MgKE1hcmtvdiBwcm9jZXNzKS1iYXNlZCBzdHJpbmcgZ2VuZXJhdG9yLiBcclxuICogQ29waWVkIGZyb20gYSA8YSBocmVmPVwiaHR0cDovL3d3dy5yb2d1ZWJhc2luLnJvZ3VlbGlrZWRldmVsb3BtZW50Lm9yZy9pbmRleC5waHA/dGl0bGU9TmFtZXNfZnJvbV9hX2hpZ2hfb3JkZXJfTWFya292X1Byb2Nlc3NfYW5kX2Ffc2ltcGxpZmllZF9LYXR6X2JhY2stb2ZmX3NjaGVtZVwiPlJvZ3VlQmFzaW4gYXJ0aWNsZTwvYT4uIFxyXG4gKiBPZmZlcnMgY29uZmlndXJhYmxlIG9yZGVyIGFuZCBwcmlvci5cclxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gKiBAcGFyYW0ge2Jvb2x9IFtvcHRpb25zLndvcmRzPWZhbHNlXSBVc2Ugd29yZCBtb2RlP1xyXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMub3JkZXI9M11cclxuICogQHBhcmFtIHtmbG9hdH0gW29wdGlvbnMucHJpb3I9MC4wMDFdXHJcbiAqL1xyXG5ST1QuU3RyaW5nR2VuZXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdHRoaXMuX29wdGlvbnMgPSB7XHJcblx0XHR3b3JkczogZmFsc2UsXHJcblx0XHRvcmRlcjogMyxcclxuXHRcdHByaW9yOiAwLjAwMVxyXG5cdH07XHJcblx0Zm9yICh2YXIgcCBpbiBvcHRpb25zKSB7IHRoaXMuX29wdGlvbnNbcF0gPSBvcHRpb25zW3BdOyB9XHJcblxyXG5cdHRoaXMuX2JvdW5kYXJ5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSgwKTtcclxuXHR0aGlzLl9zdWZmaXggPSB0aGlzLl9ib3VuZGFyeTtcclxuXHR0aGlzLl9wcmVmaXggPSBbXTtcclxuXHRmb3IgKHZhciBpPTA7aTx0aGlzLl9vcHRpb25zLm9yZGVyO2krKykgeyB0aGlzLl9wcmVmaXgucHVzaCh0aGlzLl9ib3VuZGFyeSk7IH1cclxuXHJcblx0dGhpcy5fcHJpb3JWYWx1ZXMgPSB7fTtcclxuXHR0aGlzLl9wcmlvclZhbHVlc1t0aGlzLl9ib3VuZGFyeV0gPSB0aGlzLl9vcHRpb25zLnByaW9yO1xyXG5cclxuXHR0aGlzLl9kYXRhID0ge307XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFsbCBsZWFybmluZyBkYXRhXHJcbiAqL1xyXG5ST1QuU3RyaW5nR2VuZXJhdG9yLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xyXG5cdHRoaXMuX2RhdGEgPSB7fTtcclxuXHR0aGlzLl9wcmlvclZhbHVlcyA9IHt9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEdlbmVyYXRlZCBzdHJpbmdcclxuICovXHJcblJPVC5TdHJpbmdHZW5lcmF0b3IucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIHJlc3VsdCA9IFt0aGlzLl9zYW1wbGUodGhpcy5fcHJlZml4KV07XHJcblx0d2hpbGUgKHJlc3VsdFtyZXN1bHQubGVuZ3RoLTFdICE9IHRoaXMuX2JvdW5kYXJ5KSB7XHJcblx0XHRyZXN1bHQucHVzaCh0aGlzLl9zYW1wbGUocmVzdWx0KSk7XHJcblx0fVxyXG5cdHJldHVybiB0aGlzLl9qb2luKHJlc3VsdC5zbGljZSgwLCAtMSkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9ic2VydmUgKGxlYXJuKSBhIHN0cmluZyBmcm9tIGEgdHJhaW5pbmcgc2V0XHJcbiAqL1xyXG5ST1QuU3RyaW5nR2VuZXJhdG9yLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24oc3RyaW5nKSB7XHJcblx0dmFyIHRva2VucyA9IHRoaXMuX3NwbGl0KHN0cmluZyk7XHJcblxyXG5cdGZvciAodmFyIGk9MDsgaTx0b2tlbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHRoaXMuX3ByaW9yVmFsdWVzW3Rva2Vuc1tpXV0gPSB0aGlzLl9vcHRpb25zLnByaW9yO1xyXG5cdH1cclxuXHJcblx0dG9rZW5zID0gdGhpcy5fcHJlZml4LmNvbmNhdCh0b2tlbnMpLmNvbmNhdCh0aGlzLl9zdWZmaXgpOyAvKiBhZGQgYm91bmRhcnkgc3ltYm9scyAqL1xyXG5cclxuXHRmb3IgKHZhciBpPXRoaXMuX29wdGlvbnMub3JkZXI7IGk8dG9rZW5zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRva2Vucy5zbGljZShpLXRoaXMuX29wdGlvbnMub3JkZXIsIGkpO1xyXG5cdFx0dmFyIGV2ZW50ID0gdG9rZW5zW2ldO1xyXG5cdFx0Zm9yICh2YXIgaj0wOyBqPGNvbnRleHQubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0dmFyIHN1YmNvbnRleHQgPSBjb250ZXh0LnNsaWNlKGopO1xyXG5cdFx0XHR0aGlzLl9vYnNlcnZlRXZlbnQoc3ViY29udGV4dCwgZXZlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblJPVC5TdHJpbmdHZW5lcmF0b3IucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIHBhcnRzID0gW107XHJcblxyXG5cdHZhciBwcmlvckNvdW50ID0gMDtcclxuXHRmb3IgKHZhciBwIGluIHRoaXMuX3ByaW9yVmFsdWVzKSB7IHByaW9yQ291bnQrKzsgfVxyXG5cdHByaW9yQ291bnQtLTsgLyogYm91bmRhcnkgKi9cclxuXHRwYXJ0cy5wdXNoKFwiZGlzdGluY3Qgc2FtcGxlczogXCIgKyBwcmlvckNvdW50KTtcclxuXHJcblx0dmFyIGRhdGFDb3VudCA9IDA7XHJcblx0dmFyIGV2ZW50Q291bnQgPSAwO1xyXG5cdGZvciAodmFyIHAgaW4gdGhpcy5fZGF0YSkgeyBcclxuXHRcdGRhdGFDb3VudCsrOyBcclxuXHRcdGZvciAodmFyIGtleSBpbiB0aGlzLl9kYXRhW3BdKSB7XHJcblx0XHRcdGV2ZW50Q291bnQrKztcclxuXHRcdH1cclxuXHR9XHJcblx0cGFydHMucHVzaChcImRpY3Rpb25hcnkgc2l6ZSAoY29udGV4dHMpOiBcIiArIGRhdGFDb3VudCk7XHJcblx0cGFydHMucHVzaChcImRpY3Rpb25hcnkgc2l6ZSAoZXZlbnRzKTogXCIgKyBldmVudENvdW50KTtcclxuXHJcblx0cmV0dXJuIHBhcnRzLmpvaW4oXCIsIFwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ31cclxuICogQHJldHVybnMge3N0cmluZ1tdfVxyXG4gKi9cclxuUk9ULlN0cmluZ0dlbmVyYXRvci5wcm90b3R5cGUuX3NwbGl0ID0gZnVuY3Rpb24oc3RyKSB7XHJcblx0cmV0dXJuIHN0ci5zcGxpdCh0aGlzLl9vcHRpb25zLndvcmRzID8gL1xccysvIDogXCJcIik7XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtzdHJpbmdbXX1cclxuICogQHJldHVybnMge3N0cmluZ30gXHJcbiAqL1xyXG5ST1QuU3RyaW5nR2VuZXJhdG9yLnByb3RvdHlwZS5fam9pbiA9IGZ1bmN0aW9uKGFycikge1xyXG5cdHJldHVybiBhcnIuam9pbih0aGlzLl9vcHRpb25zLndvcmRzID8gXCIgXCIgOiBcIlwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBjb250ZXh0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxyXG4gKi9cclxuUk9ULlN0cmluZ0dlbmVyYXRvci5wcm90b3R5cGUuX29ic2VydmVFdmVudCA9IGZ1bmN0aW9uKGNvbnRleHQsIGV2ZW50KSB7XHJcblx0dmFyIGtleSA9IHRoaXMuX2pvaW4oY29udGV4dCk7XHJcblx0aWYgKCEoa2V5IGluIHRoaXMuX2RhdGEpKSB7IHRoaXMuX2RhdGFba2V5XSA9IHt9OyB9XHJcblx0dmFyIGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XHJcblxyXG5cdGlmICghKGV2ZW50IGluIGRhdGEpKSB7IGRhdGFbZXZlbnRdID0gMDsgfVxyXG5cdGRhdGFbZXZlbnRdKys7XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtzdHJpbmdbXX1cclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblJPVC5TdHJpbmdHZW5lcmF0b3IucHJvdG90eXBlLl9zYW1wbGUgPSBmdW5jdGlvbihjb250ZXh0KSB7XHJcblx0Y29udGV4dCA9IHRoaXMuX2JhY2tvZmYoY29udGV4dCk7XHJcblx0dmFyIGtleSA9IHRoaXMuX2pvaW4oY29udGV4dCk7XHJcblx0dmFyIGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XHJcblxyXG5cdHZhciBhdmFpbGFibGUgPSB7fTtcclxuXHJcblx0aWYgKHRoaXMuX29wdGlvbnMucHJpb3IpIHtcclxuXHRcdGZvciAodmFyIGV2ZW50IGluIHRoaXMuX3ByaW9yVmFsdWVzKSB7IGF2YWlsYWJsZVtldmVudF0gPSB0aGlzLl9wcmlvclZhbHVlc1tldmVudF07IH1cclxuXHRcdGZvciAodmFyIGV2ZW50IGluIGRhdGEpIHsgYXZhaWxhYmxlW2V2ZW50XSArPSBkYXRhW2V2ZW50XTsgfVxyXG5cdH0gZWxzZSB7IFxyXG5cdFx0YXZhaWxhYmxlID0gZGF0YTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBST1QuUk5HLmdldFdlaWdodGVkVmFsdWUoYXZhaWxhYmxlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ1tdfVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XHJcbiAqL1xyXG5ST1QuU3RyaW5nR2VuZXJhdG9yLnByb3RvdHlwZS5fYmFja29mZiA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcclxuXHRpZiAoY29udGV4dC5sZW5ndGggPiB0aGlzLl9vcHRpb25zLm9yZGVyKSB7XHJcblx0XHRjb250ZXh0ID0gY29udGV4dC5zbGljZSgtdGhpcy5fb3B0aW9ucy5vcmRlcik7XHJcblx0fSBlbHNlIGlmIChjb250ZXh0Lmxlbmd0aCA8IHRoaXMuX29wdGlvbnMub3JkZXIpIHtcclxuXHRcdGNvbnRleHQgPSB0aGlzLl9wcmVmaXguc2xpY2UoMCwgdGhpcy5fb3B0aW9ucy5vcmRlciAtIGNvbnRleHQubGVuZ3RoKS5jb25jYXQoY29udGV4dCk7XHJcblx0fVxyXG5cclxuXHR3aGlsZSAoISh0aGlzLl9qb2luKGNvbnRleHQpIGluIHRoaXMuX2RhdGEpICYmIGNvbnRleHQubGVuZ3RoID4gMCkgeyBjb250ZXh0ID0gY29udGV4dC5zbGljZSgxKTsgfVxyXG5cclxuXHRyZXR1cm4gY29udGV4dDtcclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmljIGV2ZW50IHF1ZXVlOiBzdG9yZXMgZXZlbnRzIGFuZCByZXRyaWV2ZXMgdGhlbSBiYXNlZCBvbiB0aGVpciB0aW1lXHJcbiAqL1xyXG5ST1QuRXZlbnRRdWV1ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdHRoaXMuX3RpbWUgPSAwO1xyXG5cdHRoaXMuX2V2ZW50cyA9IFtdO1xyXG5cdHRoaXMuX2V2ZW50VGltZXMgPSBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBFbGFwc2VkIHRpbWVcclxuICovXHJcblJPVC5FdmVudFF1ZXVlLnByb3RvdHlwZS5nZXRUaW1lID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXMuX3RpbWU7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2xlYXIgYWxsIHNjaGVkdWxlZCBldmVudHNcclxuICovXHJcblJPVC5FdmVudFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xyXG5cdHRoaXMuX2V2ZW50cyA9IFtdO1xyXG5cdHRoaXMuX2V2ZW50VGltZXMgPSBbXTtcclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gez99IGV2ZW50XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXHJcbiAqL1xyXG5ST1QuRXZlbnRRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZXZlbnQsIHRpbWUpIHtcclxuXHR2YXIgaW5kZXggPSB0aGlzLl9ldmVudHMubGVuZ3RoO1xyXG5cdGZvciAodmFyIGk9MDtpPHRoaXMuX2V2ZW50VGltZXMubGVuZ3RoO2krKykge1xyXG5cdFx0aWYgKHRoaXMuX2V2ZW50VGltZXNbaV0gPiB0aW1lKSB7XHJcblx0XHRcdGluZGV4ID0gaTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0aGlzLl9ldmVudHMuc3BsaWNlKGluZGV4LCAwLCBldmVudCk7XHJcblx0dGhpcy5fZXZlbnRUaW1lcy5zcGxpY2UoaW5kZXgsIDAsIHRpbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvY2F0ZXMgdGhlIG5lYXJlc3QgZXZlbnQsIGFkdmFuY2VzIHRpbWUgaWYgbmVjZXNzYXJ5LiBSZXR1cm5zIHRoYXQgZXZlbnQgYW5kIHJlbW92ZXMgaXQgZnJvbSB0aGUgcXVldWUuXHJcbiAqIEByZXR1cm5zIHs/IHx8IG51bGx9IFRoZSBldmVudCBwcmV2aW91c2x5IGFkZGVkIGJ5IGFkZEV2ZW50LCBudWxsIGlmIG5vIGV2ZW50IGF2YWlsYWJsZVxyXG4gKi9cclxuUk9ULkV2ZW50UXVldWUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xyXG5cdGlmICghdGhpcy5fZXZlbnRzLmxlbmd0aCkgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuXHR2YXIgdGltZSA9IHRoaXMuX2V2ZW50VGltZXMuc3BsaWNlKDAsIDEpWzBdO1xyXG5cdGlmICh0aW1lID4gMCkgeyAvKiBhZHZhbmNlICovXHJcblx0XHR0aGlzLl90aW1lICs9IHRpbWU7XHJcblx0XHRmb3IgKHZhciBpPTA7aTx0aGlzLl9ldmVudFRpbWVzLmxlbmd0aDtpKyspIHsgdGhpcy5fZXZlbnRUaW1lc1tpXSAtPSB0aW1lOyB9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGhpcy5fZXZlbnRzLnNwbGljZSgwLCAxKVswXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRpbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBldmVudFxyXG4gKiBAcGFyYW0gez99IGV2ZW50XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRpbWVcclxuICovXHJcblJPVC5FdmVudFF1ZXVlLnByb3RvdHlwZS5nZXRFdmVudFRpbWUgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdHZhciBpbmRleCA9IHRoaXMuX2V2ZW50cy5pbmRleE9mKGV2ZW50KTtcclxuXHRpZiAoaW5kZXggPT0gLTEpIHsgcmV0dXJuIHVuZGVmaW5lZCB9XHJcblx0cmV0dXJuIHRoaXMuX2V2ZW50VGltZXNbaW5kZXhdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbiBldmVudCBmcm9tIHRoZSBxdWV1ZVxyXG4gKiBAcGFyYW0gez99IGV2ZW50XHJcbiAqIEByZXR1cm5zIHtib29sfSBzdWNjZXNzP1xyXG4gKi9cclxuUk9ULkV2ZW50UXVldWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0dmFyIGluZGV4ID0gdGhpcy5fZXZlbnRzLmluZGV4T2YoZXZlbnQpO1xyXG5cdGlmIChpbmRleCA9PSAtMSkgeyByZXR1cm4gZmFsc2UgfVxyXG5cdHRoaXMuX3JlbW92ZShpbmRleCk7XHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFuIGV2ZW50IGZyb20gdGhlIHF1ZXVlXHJcbiAqIEBwYXJhbSB7aW50fSBpbmRleFxyXG4gKi9cclxuUk9ULkV2ZW50UXVldWUucHJvdG90eXBlLl9yZW1vdmUgPSBmdW5jdGlvbihpbmRleCkge1xyXG5cdHRoaXMuX2V2ZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdHRoaXMuX2V2ZW50VGltZXMuc3BsaWNlKGluZGV4LCAxKTtcclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBBYnN0cmFjdCBzY2hlZHVsZXJcclxuICovXHJcblJPVC5TY2hlZHVsZXIgPSBmdW5jdGlvbigpIHtcclxuXHR0aGlzLl9xdWV1ZSA9IG5ldyBST1QuRXZlbnRRdWV1ZSgpO1xyXG5cdHRoaXMuX3JlcGVhdCA9IFtdO1xyXG5cdHRoaXMuX2N1cnJlbnQgPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzZWUgUk9ULkV2ZW50UXVldWUjZ2V0VGltZVxyXG4gKi9cclxuUk9ULlNjaGVkdWxlci5wcm90b3R5cGUuZ2V0VGltZSA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzLl9xdWV1ZS5nZXRUaW1lKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/fSBpdGVtXHJcbiAqIEBwYXJhbSB7Ym9vbH0gcmVwZWF0XHJcbiAqL1xyXG5ST1QuU2NoZWR1bGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihpdGVtLCByZXBlYXQpIHtcclxuXHRpZiAocmVwZWF0KSB7IHRoaXMuX3JlcGVhdC5wdXNoKGl0ZW0pOyB9XHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0aW1lIHRoZSBnaXZlbiBpdGVtIGlzIHNjaGVkdWxlZCBmb3JcclxuICogQHBhcmFtIHs/fSBpdGVtXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRpbWVcclxuICovXHJcblJPVC5TY2hlZHVsZXIucHJvdG90eXBlLmdldFRpbWVPZiA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRyZXR1cm4gdGhpcy5fcXVldWUuZ2V0RXZlbnRUaW1lKGl0ZW0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsZWFyIGFsbCBpdGVtc1xyXG4gKi9cclxuUk9ULlNjaGVkdWxlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuXHR0aGlzLl9xdWV1ZS5jbGVhcigpO1xyXG5cdHRoaXMuX3JlcGVhdCA9IFtdO1xyXG5cdHRoaXMuX2N1cnJlbnQgPSBudWxsO1xyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIHByZXZpb3VzbHkgYWRkZWQgaXRlbVxyXG4gKiBAcGFyYW0gez99IGl0ZW1cclxuICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3NmdWw/XHJcbiAqL1xyXG5ST1QuU2NoZWR1bGVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihpdGVtKSB7XHJcblx0dmFyIHJlc3VsdCA9IHRoaXMuX3F1ZXVlLnJlbW92ZShpdGVtKTtcclxuXHJcblx0dmFyIGluZGV4ID0gdGhpcy5fcmVwZWF0LmluZGV4T2YoaXRlbSk7XHJcblx0aWYgKGluZGV4ICE9IC0xKSB7IHRoaXMuX3JlcGVhdC5zcGxpY2UoaW5kZXgsIDEpOyB9XHJcblxyXG5cdGlmICh0aGlzLl9jdXJyZW50ID09IGl0ZW0pIHsgdGhpcy5fY3VycmVudCA9IG51bGw7IH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTY2hlZHVsZSBuZXh0IGl0ZW1cclxuICogQHJldHVybnMgez99XHJcbiAqL1xyXG5ST1QuU2NoZWR1bGVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XHJcblx0dGhpcy5fY3VycmVudCA9IHRoaXMuX3F1ZXVlLmdldCgpO1xyXG5cdHJldHVybiB0aGlzLl9jdXJyZW50O1xyXG59O1xyXG4vKipcclxuICogQGNsYXNzIFNpbXBsZSBmYWlyIHNjaGVkdWxlciAocm91bmQtcm9iaW4gc3R5bGUpXHJcbiAqIEBhdWdtZW50cyBST1QuU2NoZWR1bGVyXHJcbiAqL1xyXG5ST1QuU2NoZWR1bGVyLlNpbXBsZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFJPVC5TY2hlZHVsZXIuY2FsbCh0aGlzKTtcclxufTtcclxuUk9ULlNjaGVkdWxlci5TaW1wbGUuZXh0ZW5kKFJPVC5TY2hlZHVsZXIpO1xyXG5cclxuLyoqXHJcbiAqIEBzZWUgUk9ULlNjaGVkdWxlciNhZGRcclxuICovXHJcblJPVC5TY2hlZHVsZXIuU2ltcGxlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihpdGVtLCByZXBlYXQpIHtcclxuXHR0aGlzLl9xdWV1ZS5hZGQoaXRlbSwgMCk7XHJcblx0cmV0dXJuIFJPVC5TY2hlZHVsZXIucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsIGl0ZW0sIHJlcGVhdCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHNlZSBST1QuU2NoZWR1bGVyI25leHRcclxuICovXHJcblJPVC5TY2hlZHVsZXIuU2ltcGxlLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XHJcblx0aWYgKHRoaXMuX2N1cnJlbnQgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcclxuXHRcdHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCAwKTtcclxuXHR9XHJcblx0cmV0dXJuIFJPVC5TY2hlZHVsZXIucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzKTtcclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBTcGVlZC1iYXNlZCBzY2hlZHVsZXJcclxuICogQGF1Z21lbnRzIFJPVC5TY2hlZHVsZXJcclxuICovXHJcblJPVC5TY2hlZHVsZXIuU3BlZWQgPSBmdW5jdGlvbigpIHtcclxuXHRST1QuU2NoZWR1bGVyLmNhbGwodGhpcyk7XHJcbn07XHJcblJPVC5TY2hlZHVsZXIuU3BlZWQuZXh0ZW5kKFJPVC5TY2hlZHVsZXIpO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtIGFueXRoaW5nIHdpdGggXCJnZXRTcGVlZFwiIG1ldGhvZFxyXG4gKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxyXG4gKiBAcGFyYW0ge251bWJlcn0gW3RpbWU9MS9pdGVtLmdldFNwZWVkKCldXHJcbiAqIEBzZWUgUk9ULlNjaGVkdWxlciNhZGRcclxuICovXHJcblJPVC5TY2hlZHVsZXIuU3BlZWQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGl0ZW0sIHJlcGVhdCwgdGltZSkge1xyXG5cdHRoaXMuX3F1ZXVlLmFkZChpdGVtLCB0aW1lICE9PSB1bmRlZmluZWQgPyB0aW1lIDogMS9pdGVtLmdldFNwZWVkKCkpO1xyXG5cdHJldHVybiBST1QuU2NoZWR1bGVyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBpdGVtLCByZXBlYXQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzZWUgUk9ULlNjaGVkdWxlciNuZXh0XHJcbiAqL1xyXG5ST1QuU2NoZWR1bGVyLlNwZWVkLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XHJcblx0aWYgKHRoaXMuX2N1cnJlbnQgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcclxuXHRcdHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCAxL3RoaXMuX2N1cnJlbnQuZ2V0U3BlZWQoKSk7XHJcblx0fVxyXG5cdHJldHVybiBST1QuU2NoZWR1bGVyLnByb3RvdHlwZS5uZXh0LmNhbGwodGhpcyk7XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgQWN0aW9uLWJhc2VkIHNjaGVkdWxlclxyXG4gKiBAYXVnbWVudHMgUk9ULlNjaGVkdWxlclxyXG4gKi9cclxuUk9ULlNjaGVkdWxlci5BY3Rpb24gPSBmdW5jdGlvbigpIHtcclxuXHRST1QuU2NoZWR1bGVyLmNhbGwodGhpcyk7XHJcblx0dGhpcy5fZGVmYXVsdER1cmF0aW9uID0gMTsgLyogZm9yIG5ld2x5IGFkZGVkICovXHJcblx0dGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247IC8qIGZvciB0aGlzLl9jdXJyZW50ICovXHJcbn07XHJcblJPVC5TY2hlZHVsZXIuQWN0aW9uLmV4dGVuZChST1QuU2NoZWR1bGVyKTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gaXRlbVxyXG4gKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxyXG4gKiBAcGFyYW0ge251bWJlcn0gW3RpbWU9MV1cclxuICogQHNlZSBST1QuU2NoZWR1bGVyI2FkZFxyXG4gKi9cclxuUk9ULlNjaGVkdWxlci5BY3Rpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGl0ZW0sIHJlcGVhdCwgdGltZSkge1xyXG5cdHRoaXMuX3F1ZXVlLmFkZChpdGVtLCB0aW1lIHx8IHRoaXMuX2RlZmF1bHREdXJhdGlvbik7XHJcblx0cmV0dXJuIFJPVC5TY2hlZHVsZXIucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsIGl0ZW0sIHJlcGVhdCk7XHJcbn07XHJcblxyXG5ST1QuU2NoZWR1bGVyLkFjdGlvbi5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuXHR0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcclxuXHRyZXR1cm4gUk9ULlNjaGVkdWxlci5wcm90b3R5cGUuY2xlYXIuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcblJPVC5TY2hlZHVsZXIuQWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihpdGVtKSB7XHJcblx0aWYgKGl0ZW0gPT0gdGhpcy5fY3VycmVudCkgeyB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjsgfVxyXG5cdHJldHVybiBST1QuU2NoZWR1bGVyLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzLCBpdGVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAc2VlIFJPVC5TY2hlZHVsZXIjbmV4dFxyXG4gKi9cclxuUk9ULlNjaGVkdWxlci5BY3Rpb24ucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcclxuXHRpZiAodGhpcy5fY3VycmVudCAmJiB0aGlzLl9yZXBlYXQuaW5kZXhPZih0aGlzLl9jdXJyZW50KSAhPSAtMSkge1xyXG5cdFx0dGhpcy5fcXVldWUuYWRkKHRoaXMuX2N1cnJlbnQsIHRoaXMuX2R1cmF0aW9uIHx8IHRoaXMuX2RlZmF1bHREdXJhdGlvbik7XHJcblx0XHR0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcclxuXHR9XHJcblx0cmV0dXJuIFJPVC5TY2hlZHVsZXIucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgZHVyYXRpb24gZm9yIHRoZSBhY3RpdmUgaXRlbVxyXG4gKi9cclxuUk9ULlNjaGVkdWxlci5BY3Rpb24ucHJvdG90eXBlLnNldER1cmF0aW9uID0gZnVuY3Rpb24odGltZSkge1xyXG5cdGlmICh0aGlzLl9jdXJyZW50KSB7IHRoaXMuX2R1cmF0aW9uID0gdGltZTsgfVxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG4vKipcclxuICogQGNsYXNzIEFzeW5jaHJvbm91cyBtYWluIGxvb3BcclxuICogQHBhcmFtIHtST1QuU2NoZWR1bGVyfSBzY2hlZHVsZXJcclxuICovXHJcblJPVC5FbmdpbmUgPSBmdW5jdGlvbihzY2hlZHVsZXIpIHtcclxuXHR0aGlzLl9zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XHJcblx0dGhpcy5fbG9jayA9IDE7XHJcbn07XHJcblxyXG4vKipcclxuICogU3RhcnQgdGhlIG1haW4gbG9vcC4gV2hlbiB0aGlzIGNhbGwgcmV0dXJucywgdGhlIGxvb3AgaXMgbG9ja2VkLlxyXG4gKi9cclxuUk9ULkVuZ2luZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcy51bmxvY2soKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbnRlcnJ1cHQgdGhlIGVuZ2luZSBieSBhbiBhc3luY2hyb25vdXMgYWN0aW9uXHJcbiAqL1xyXG5ST1QuRW5naW5lLnByb3RvdHlwZS5sb2NrID0gZnVuY3Rpb24oKSB7XHJcblx0dGhpcy5fbG9jaysrO1xyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlc3VtZSBleGVjdXRpb24gKHBhdXNlZCBieSBhIHByZXZpb3VzIGxvY2spXHJcbiAqL1xyXG5ST1QuRW5naW5lLnByb3RvdHlwZS51bmxvY2sgPSBmdW5jdGlvbigpIHtcclxuXHRpZiAoIXRoaXMuX2xvY2spIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHVubG9jayB1bmxvY2tlZCBlbmdpbmVcIik7IH1cclxuXHR0aGlzLl9sb2NrLS07XHJcblxyXG5cdHdoaWxlICghdGhpcy5fbG9jaykge1xyXG5cdFx0dmFyIGFjdG9yID0gdGhpcy5fc2NoZWR1bGVyLm5leHQoKTtcclxuXHRcdGlmICghYWN0b3IpIHsgcmV0dXJuIHRoaXMubG9jaygpOyB9IC8qIG5vIGFjdG9ycyAqL1xyXG5cdFx0dmFyIHJlc3VsdCA9IGFjdG9yLmFjdCgpO1xyXG5cdFx0aWYgKHJlc3VsdCAmJiByZXN1bHQudGhlbikgeyAvKiBhY3RvciByZXR1cm5lZCBhIFwidGhlbmFibGVcIiwgbG9va3MgbGlrZSBhIFByb21pc2UgKi9cclxuXHRcdFx0dGhpcy5sb2NrKCk7XHJcblx0XHRcdHJlc3VsdC50aGVuKHRoaXMudW5sb2NrLmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgQmFzZSBtYXAgZ2VuZXJhdG9yXHJcbiAqIEBwYXJhbSB7aW50fSBbd2lkdGg9Uk9ULkRFRkFVTFRfV0lEVEhdXHJcbiAqIEBwYXJhbSB7aW50fSBbaGVpZ2h0PVJPVC5ERUZBVUxUX0hFSUdIVF1cclxuICovXHJcblJPVC5NYXAgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcblx0dGhpcy5fd2lkdGggPSB3aWR0aCB8fCBST1QuREVGQVVMVF9XSURUSDtcclxuXHR0aGlzLl9oZWlnaHQgPSBoZWlnaHQgfHwgUk9ULkRFRkFVTFRfSEVJR0hUO1xyXG59O1xyXG5cclxuUk9ULk1hcC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oY2FsbGJhY2spIHt9O1xyXG5cclxuUk9ULk1hcC5wcm90b3R5cGUuX2ZpbGxNYXAgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdHZhciBtYXAgPSBbXTtcclxuXHRmb3IgKHZhciBpPTA7aTx0aGlzLl93aWR0aDtpKyspIHtcclxuXHRcdG1hcC5wdXNoKFtdKTtcclxuXHRcdGZvciAodmFyIGo9MDtqPHRoaXMuX2hlaWdodDtqKyspIHsgbWFwW2ldLnB1c2godmFsdWUpOyB9XHJcblx0fVxyXG5cdHJldHVybiBtYXA7XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgU2ltcGxlIGVtcHR5IHJlY3Rhbmd1bGFyIHJvb21cclxuICogQGF1Z21lbnRzIFJPVC5NYXBcclxuICovXHJcblJPVC5NYXAuQXJlbmEgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcblx0Uk9ULk1hcC5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpO1xyXG59O1xyXG5ST1QuTWFwLkFyZW5hLmV4dGVuZChST1QuTWFwKTtcclxuXHJcblJPVC5NYXAuQXJlbmEucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0dmFyIHcgPSB0aGlzLl93aWR0aC0xO1xyXG5cdHZhciBoID0gdGhpcy5faGVpZ2h0LTE7XHJcblx0Zm9yICh2YXIgaT0wO2k8PXc7aSsrKSB7XHJcblx0XHRmb3IgKHZhciBqPTA7ajw9aDtqKyspIHtcclxuXHRcdFx0dmFyIGVtcHR5ID0gKGkgJiYgaiAmJiBpPHcgJiYgajxoKTtcclxuXHRcdFx0Y2FsbGJhY2soaSwgaiwgZW1wdHkgPyAwIDogMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG4vKipcclxuICogQGNsYXNzIFJlY3Vyc2l2ZWx5IGRpdmlkZWQgbWF6ZSwgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NYXplX2dlbmVyYXRpb25fYWxnb3JpdGhtI1JlY3Vyc2l2ZV9kaXZpc2lvbl9tZXRob2RcclxuICogQGF1Z21lbnRzIFJPVC5NYXBcclxuICovXHJcblJPVC5NYXAuRGl2aWRlZE1hemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcblx0Uk9ULk1hcC5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpO1xyXG5cdHRoaXMuX3N0YWNrID0gW107XHJcbn07XHJcblJPVC5NYXAuRGl2aWRlZE1hemUuZXh0ZW5kKFJPVC5NYXApO1xyXG5cclxuUk9ULk1hcC5EaXZpZGVkTWF6ZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHR2YXIgdyA9IHRoaXMuX3dpZHRoO1xyXG5cdHZhciBoID0gdGhpcy5faGVpZ2h0O1xyXG5cdFxyXG5cdHRoaXMuX21hcCA9IFtdO1xyXG5cdFxyXG5cdGZvciAodmFyIGk9MDtpPHc7aSsrKSB7XHJcblx0XHR0aGlzLl9tYXAucHVzaChbXSk7XHJcblx0XHRmb3IgKHZhciBqPTA7ajxoO2orKykge1xyXG5cdFx0XHR2YXIgYm9yZGVyID0gKGkgPT0gMCB8fCBqID09IDAgfHwgaSsxID09IHcgfHwgaisxID09IGgpO1xyXG5cdFx0XHR0aGlzLl9tYXBbaV0ucHVzaChib3JkZXIgPyAxIDogMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuX3N0YWNrID0gW1xyXG5cdFx0WzEsIDEsIHctMiwgaC0yXVxyXG5cdF07XHJcblx0dGhpcy5fcHJvY2VzcygpO1xyXG5cdFxyXG5cdGZvciAodmFyIGk9MDtpPHc7aSsrKSB7XHJcblx0XHRmb3IgKHZhciBqPTA7ajxoO2orKykge1xyXG5cdFx0XHRjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR0aGlzLl9tYXAgPSBudWxsO1xyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuUk9ULk1hcC5EaXZpZGVkTWF6ZS5wcm90b3R5cGUuX3Byb2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuXHR3aGlsZSAodGhpcy5fc3RhY2subGVuZ3RoKSB7XHJcblx0XHR2YXIgcm9vbSA9IHRoaXMuX3N0YWNrLnNoaWZ0KCk7IC8qIFtsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b21dICovXHJcblx0XHR0aGlzLl9wYXJ0aXRpb25Sb29tKHJvb20pO1xyXG5cdH1cclxufTtcclxuXHJcblJPVC5NYXAuRGl2aWRlZE1hemUucHJvdG90eXBlLl9wYXJ0aXRpb25Sb29tID0gZnVuY3Rpb24ocm9vbSkge1xyXG5cdHZhciBhdmFpbFggPSBbXTtcclxuXHR2YXIgYXZhaWxZID0gW107XHJcblx0XHJcblx0Zm9yICh2YXIgaT1yb29tWzBdKzE7aTxyb29tWzJdO2krKykge1xyXG5cdFx0dmFyIHRvcCA9IHRoaXMuX21hcFtpXVtyb29tWzFdLTFdO1xyXG5cdFx0dmFyIGJvdHRvbSA9IHRoaXMuX21hcFtpXVtyb29tWzNdKzFdO1xyXG5cdFx0aWYgKHRvcCAmJiBib3R0b20gJiYgIShpICUgMikpIHsgYXZhaWxYLnB1c2goaSk7IH1cclxuXHR9XHJcblx0XHJcblx0Zm9yICh2YXIgaj1yb29tWzFdKzE7ajxyb29tWzNdO2orKykge1xyXG5cdFx0dmFyIGxlZnQgPSB0aGlzLl9tYXBbcm9vbVswXS0xXVtqXTtcclxuXHRcdHZhciByaWdodCA9IHRoaXMuX21hcFtyb29tWzJdKzFdW2pdO1xyXG5cdFx0aWYgKGxlZnQgJiYgcmlnaHQgJiYgIShqICUgMikpIHsgYXZhaWxZLnB1c2goaik7IH1cclxuXHR9XHJcblxyXG5cdGlmICghYXZhaWxYLmxlbmd0aCB8fCAhYXZhaWxZLmxlbmd0aCkgeyByZXR1cm47IH1cclxuXHJcblx0dmFyIHggPSBhdmFpbFgucmFuZG9tKCk7XHJcblx0dmFyIHkgPSBhdmFpbFkucmFuZG9tKCk7XHJcblx0XHJcblx0dGhpcy5fbWFwW3hdW3ldID0gMTtcclxuXHRcclxuXHR2YXIgd2FsbHMgPSBbXTtcclxuXHRcclxuXHR2YXIgdyA9IFtdOyB3YWxscy5wdXNoKHcpOyAvKiBsZWZ0IHBhcnQgKi9cclxuXHRmb3IgKHZhciBpPXJvb21bMF07IGk8eDsgaSsrKSB7IFxyXG5cdFx0dGhpcy5fbWFwW2ldW3ldID0gMTtcclxuXHRcdHcucHVzaChbaSwgeV0pOyBcclxuXHR9XHJcblx0XHJcblx0dmFyIHcgPSBbXTsgd2FsbHMucHVzaCh3KTsgLyogcmlnaHQgcGFydCAqL1xyXG5cdGZvciAodmFyIGk9eCsxOyBpPD1yb29tWzJdOyBpKyspIHsgXHJcblx0XHR0aGlzLl9tYXBbaV1beV0gPSAxO1xyXG5cdFx0dy5wdXNoKFtpLCB5XSk7IFxyXG5cdH1cclxuXHJcblx0dmFyIHcgPSBbXTsgd2FsbHMucHVzaCh3KTsgLyogdG9wIHBhcnQgKi9cclxuXHRmb3IgKHZhciBqPXJvb21bMV07IGo8eTsgaisrKSB7IFxyXG5cdFx0dGhpcy5fbWFwW3hdW2pdID0gMTtcclxuXHRcdHcucHVzaChbeCwgal0pOyBcclxuXHR9XHJcblx0XHJcblx0dmFyIHcgPSBbXTsgd2FsbHMucHVzaCh3KTsgLyogYm90dG9tIHBhcnQgKi9cclxuXHRmb3IgKHZhciBqPXkrMTsgajw9cm9vbVszXTsgaisrKSB7IFxyXG5cdFx0dGhpcy5fbWFwW3hdW2pdID0gMTtcclxuXHRcdHcucHVzaChbeCwgal0pOyBcclxuXHR9XHJcblx0XHRcclxuXHR2YXIgc29saWQgPSB3YWxscy5yYW5kb20oKTtcclxuXHRmb3IgKHZhciBpPTA7aTx3YWxscy5sZW5ndGg7aSsrKSB7XHJcblx0XHR2YXIgdyA9IHdhbGxzW2ldO1xyXG5cdFx0aWYgKHcgPT0gc29saWQpIHsgY29udGludWU7IH1cclxuXHRcdFxyXG5cdFx0dmFyIGhvbGUgPSB3LnJhbmRvbSgpO1xyXG5cdFx0dGhpcy5fbWFwW2hvbGVbMF1dW2hvbGVbMV1dID0gMDtcclxuXHR9XHJcblxyXG5cdHRoaXMuX3N0YWNrLnB1c2goW3Jvb21bMF0sIHJvb21bMV0sIHgtMSwgeS0xXSk7IC8qIGxlZnQgdG9wICovXHJcblx0dGhpcy5fc3RhY2sucHVzaChbeCsxLCByb29tWzFdLCByb29tWzJdLCB5LTFdKTsgLyogcmlnaHQgdG9wICovXHJcblx0dGhpcy5fc3RhY2sucHVzaChbcm9vbVswXSwgeSsxLCB4LTEsIHJvb21bM11dKTsgLyogbGVmdCBib3R0b20gKi9cclxuXHR0aGlzLl9zdGFjay5wdXNoKFt4KzEsIHkrMSwgcm9vbVsyXSwgcm9vbVszXV0pOyAvKiByaWdodCBib3R0b20gKi9cclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBJY2V5J3MgTWF6ZSBnZW5lcmF0b3JcclxuICogU2VlIGh0dHA6Ly93d3cucm9ndWViYXNpbi5yb2d1ZWxpa2VkZXZlbG9wbWVudC5vcmcvaW5kZXgucGhwP3RpdGxlPVNpbXBsZV9tYXplIGZvciBleHBsYW5hdGlvblxyXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxyXG4gKi9cclxuUk9ULk1hcC5JY2V5TWF6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIHJlZ3VsYXJpdHkpIHtcclxuXHRST1QuTWFwLmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCk7XHJcblx0dGhpcy5fcmVndWxhcml0eSA9IHJlZ3VsYXJpdHkgfHwgMDtcclxufTtcclxuUk9ULk1hcC5JY2V5TWF6ZS5leHRlbmQoUk9ULk1hcCk7XHJcblxyXG5ST1QuTWFwLkljZXlNYXplLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdHZhciB3aWR0aCA9IHRoaXMuX3dpZHRoO1xyXG5cdHZhciBoZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XHJcblx0XHJcblx0dmFyIG1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XHJcblx0XHJcblx0d2lkdGggLT0gKHdpZHRoICUgMiA/IDEgOiAyKTtcclxuXHRoZWlnaHQgLT0gKGhlaWdodCAlIDIgPyAxIDogMik7XHJcblxyXG5cdHZhciBjeCA9IDA7XHJcblx0dmFyIGN5ID0gMDtcclxuXHR2YXIgbnggPSAwO1xyXG5cdHZhciBueSA9IDA7XHJcblxyXG5cdHZhciBkb25lID0gMDtcclxuXHR2YXIgYmxvY2tlZCA9IGZhbHNlO1xyXG5cdHZhciBkaXJzID0gW1xyXG5cdFx0WzAsIDBdLFxyXG5cdFx0WzAsIDBdLFxyXG5cdFx0WzAsIDBdLFxyXG5cdFx0WzAsIDBdXHJcblx0XTtcclxuXHRkbyB7XHJcblx0XHRjeCA9IDEgKyAyKk1hdGguZmxvb3IoUk9ULlJORy5nZXRVbmlmb3JtKCkqKHdpZHRoLTEpIC8gMik7XHJcblx0XHRjeSA9IDEgKyAyKk1hdGguZmxvb3IoUk9ULlJORy5nZXRVbmlmb3JtKCkqKGhlaWdodC0xKSAvIDIpO1xyXG5cclxuXHRcdGlmICghZG9uZSkgeyBtYXBbY3hdW2N5XSA9IDA7IH1cclxuXHRcdFxyXG5cdFx0aWYgKCFtYXBbY3hdW2N5XSkge1xyXG5cdFx0XHR0aGlzLl9yYW5kb21pemUoZGlycyk7XHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHRpZiAoTWF0aC5mbG9vcihST1QuUk5HLmdldFVuaWZvcm0oKSoodGhpcy5fcmVndWxhcml0eSsxKSkgPT0gMCkgeyB0aGlzLl9yYW5kb21pemUoZGlycyk7IH1cclxuXHRcdFx0XHRibG9ja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRmb3IgKHZhciBpPTA7aTw0O2krKykge1xyXG5cdFx0XHRcdFx0bnggPSBjeCArIGRpcnNbaV1bMF0qMjtcclxuXHRcdFx0XHRcdG55ID0gY3kgKyBkaXJzW2ldWzFdKjI7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5faXNGcmVlKG1hcCwgbngsIG55LCB3aWR0aCwgaGVpZ2h0KSkge1xyXG5cdFx0XHRcdFx0XHRtYXBbbnhdW255XSA9IDA7XHJcblx0XHRcdFx0XHRcdG1hcFtjeCArIGRpcnNbaV1bMF1dW2N5ICsgZGlyc1tpXVsxXV0gPSAwO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0Y3ggPSBueDtcclxuXHRcdFx0XHRcdFx0Y3kgPSBueTtcclxuXHRcdFx0XHRcdFx0YmxvY2tlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRkb25lKys7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSB3aGlsZSAoIWJsb2NrZWQpO1xyXG5cdFx0fVxyXG5cdH0gd2hpbGUgKGRvbmUrMSA8IHdpZHRoKmhlaWdodC80KTtcclxuXHRcclxuXHRmb3IgKHZhciBpPTA7aTx0aGlzLl93aWR0aDtpKyspIHtcclxuXHRcdGZvciAodmFyIGo9MDtqPHRoaXMuX2hlaWdodDtqKyspIHtcclxuXHRcdFx0Y2FsbGJhY2soaSwgaiwgbWFwW2ldW2pdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dGhpcy5fbWFwID0gbnVsbDtcclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblJPVC5NYXAuSWNleU1hemUucHJvdG90eXBlLl9yYW5kb21pemUgPSBmdW5jdGlvbihkaXJzKSB7XHJcblx0Zm9yICh2YXIgaT0wO2k8NDtpKyspIHtcclxuXHRcdGRpcnNbaV1bMF0gPSAwO1xyXG5cdFx0ZGlyc1tpXVsxXSA9IDA7XHJcblx0fVxyXG5cdFxyXG5cdHN3aXRjaCAoTWF0aC5mbG9vcihST1QuUk5HLmdldFVuaWZvcm0oKSo0KSkge1xyXG5cdFx0Y2FzZSAwOlxyXG5cdFx0XHRkaXJzWzBdWzBdID0gLTE7IGRpcnNbMV1bMF0gPSAxO1xyXG5cdFx0XHRkaXJzWzJdWzFdID0gLTE7IGRpcnNbM11bMV0gPSAxO1xyXG5cdFx0YnJlYWs7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdGRpcnNbM11bMF0gPSAtMTsgZGlyc1syXVswXSA9IDE7XHJcblx0XHRcdGRpcnNbMV1bMV0gPSAtMTsgZGlyc1swXVsxXSA9IDE7XHJcblx0XHRicmVhaztcclxuXHRcdGNhc2UgMjpcclxuXHRcdFx0ZGlyc1syXVswXSA9IC0xOyBkaXJzWzNdWzBdID0gMTtcclxuXHRcdFx0ZGlyc1swXVsxXSA9IC0xOyBkaXJzWzFdWzFdID0gMTtcclxuXHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAzOlxyXG5cdFx0XHRkaXJzWzFdWzBdID0gLTE7IGRpcnNbMF1bMF0gPSAxO1xyXG5cdFx0XHRkaXJzWzNdWzFdID0gLTE7IGRpcnNbMl1bMV0gPSAxO1xyXG5cdFx0YnJlYWs7XHJcblx0fVxyXG59O1xyXG5cclxuUk9ULk1hcC5JY2V5TWF6ZS5wcm90b3R5cGUuX2lzRnJlZSA9IGZ1bmN0aW9uKG1hcCwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG5cdGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ID49IHdpZHRoIHx8IHkgPj0gaGVpZ2h0KSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdHJldHVybiBtYXBbeF1beV07XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgTWF6ZSBnZW5lcmF0b3IgLSBFbGxlcidzIGFsZ29yaXRobVxyXG4gKiBTZWUgaHR0cDovL2hvbWVwYWdlcy5jd2kubmwvfnRyb21wL21hemUuaHRtbCBmb3IgZXhwbGFuYXRpb25cclxuICogQGF1Z21lbnRzIFJPVC5NYXBcclxuICovXHJcblJPVC5NYXAuRWxsZXJNYXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG5cdFJPVC5NYXAuY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KTtcclxufTtcclxuUk9ULk1hcC5FbGxlck1hemUuZXh0ZW5kKFJPVC5NYXApO1xyXG5cclxuUk9ULk1hcC5FbGxlck1hemUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0dmFyIG1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XHJcblx0dmFyIHcgPSBNYXRoLmNlaWwoKHRoaXMuX3dpZHRoLTIpLzIpO1xyXG5cdFxyXG5cdHZhciByYW5kID0gOS8yNDtcclxuXHRcclxuXHR2YXIgTCA9IFtdO1xyXG5cdHZhciBSID0gW107XHJcblx0XHJcblx0Zm9yICh2YXIgaT0wO2k8dztpKyspIHtcclxuXHRcdEwucHVzaChpKTtcclxuXHRcdFIucHVzaChpKTtcclxuXHR9XHJcblx0TC5wdXNoKHctMSk7IC8qIGZha2Ugc3RvcC1ibG9jayBhdCB0aGUgcmlnaHQgc2lkZSAqL1xyXG5cclxuXHRmb3IgKHZhciBqPTE7aiszPHRoaXMuX2hlaWdodDtqKz0yKSB7XHJcblx0XHQvKiBvbmUgcm93ICovXHJcblx0XHRmb3IgKHZhciBpPTA7aTx3O2krKykge1xyXG5cdFx0XHQvKiBjZWxsIGNvb3JkcyAod2lsbCBiZSBhbHdheXMgZW1wdHkpICovXHJcblx0XHRcdHZhciB4ID0gMippKzE7XHJcblx0XHRcdHZhciB5ID0gajtcclxuXHRcdFx0bWFwW3hdW3ldID0gMDtcclxuXHRcdFx0XHJcblx0XHRcdC8qIHJpZ2h0IGNvbm5lY3Rpb24gKi9cclxuXHRcdFx0aWYgKGkgIT0gTFtpKzFdICYmIFJPVC5STkcuZ2V0VW5pZm9ybSgpID4gcmFuZCkge1xyXG5cdFx0XHRcdHRoaXMuX2FkZFRvTGlzdChpLCBMLCBSKTtcclxuXHRcdFx0XHRtYXBbeCsxXVt5XSA9IDA7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdC8qIGJvdHRvbSBjb25uZWN0aW9uICovXHJcblx0XHRcdGlmIChpICE9IExbaV0gJiYgUk9ULlJORy5nZXRVbmlmb3JtKCkgPiByYW5kKSB7XHJcblx0XHRcdFx0LyogcmVtb3ZlIGNvbm5lY3Rpb24gKi9cclxuXHRcdFx0XHR0aGlzLl9yZW1vdmVGcm9tTGlzdChpLCBMLCBSKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvKiBjcmVhdGUgY29ubmVjdGlvbiAqL1xyXG5cdFx0XHRcdG1hcFt4XVt5KzFdID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyogbGFzdCByb3cgKi9cclxuXHRmb3IgKHZhciBpPTA7aTx3O2krKykge1xyXG5cdFx0LyogY2VsbCBjb29yZHMgKHdpbGwgYmUgYWx3YXlzIGVtcHR5KSAqL1xyXG5cdFx0dmFyIHggPSAyKmkrMTtcclxuXHRcdHZhciB5ID0gajtcclxuXHRcdG1hcFt4XVt5XSA9IDA7XHJcblx0XHRcclxuXHRcdC8qIHJpZ2h0IGNvbm5lY3Rpb24gKi9cclxuXHRcdGlmIChpICE9IExbaSsxXSAmJiAoaSA9PSBMW2ldIHx8IFJPVC5STkcuZ2V0VW5pZm9ybSgpID4gcmFuZCkpIHtcclxuXHRcdFx0LyogZGlnIHJpZ2h0IGFsc28gaWYgdGhlIGNlbGwgaXMgc2VwYXJhdGVkLCBzbyBpdCBnZXRzIGNvbm5lY3RlZCB0byB0aGUgcmVzdCBvZiBtYXplICovXHJcblx0XHRcdHRoaXMuX2FkZFRvTGlzdChpLCBMLCBSKTtcclxuXHRcdFx0bWFwW3grMV1beV0gPSAwO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aGlzLl9yZW1vdmVGcm9tTGlzdChpLCBMLCBSKTtcclxuXHR9XHJcblx0XHJcblx0Zm9yICh2YXIgaT0wO2k8dGhpcy5fd2lkdGg7aSsrKSB7XHJcblx0XHRmb3IgKHZhciBqPTA7ajx0aGlzLl9oZWlnaHQ7aisrKSB7XHJcblx0XHRcdGNhbGxiYWNrKGksIGosIG1hcFtpXVtqXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBcImlcIiBmcm9tIGl0cyBsaXN0XHJcbiAqL1xyXG5ST1QuTWFwLkVsbGVyTWF6ZS5wcm90b3R5cGUuX3JlbW92ZUZyb21MaXN0ID0gZnVuY3Rpb24oaSwgTCwgUikge1xyXG5cdFJbTFtpXV0gPSBSW2ldO1xyXG5cdExbUltpXV0gPSBMW2ldO1xyXG5cdFJbaV0gPSBpO1xyXG5cdExbaV0gPSBpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEpvaW4gbGlzdHMgd2l0aCBcImlcIiBhbmQgXCJpKzFcIlxyXG4gKi9cclxuUk9ULk1hcC5FbGxlck1hemUucHJvdG90eXBlLl9hZGRUb0xpc3QgPSBmdW5jdGlvbihpLCBMLCBSKSB7XHJcblx0UltMW2krMV1dID0gUltpXTtcclxuXHRMW1JbaV1dID0gTFtpKzFdO1xyXG5cdFJbaV0gPSBpKzE7XHJcblx0TFtpKzFdID0gaTtcclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBDZWxsdWxhciBhdXRvbWF0b24gbWFwIGdlbmVyYXRvclxyXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxyXG4gKiBAcGFyYW0ge2ludH0gW3dpZHRoPVJPVC5ERUZBVUxUX1dJRFRIXVxyXG4gKiBAcGFyYW0ge2ludH0gW2hlaWdodD1ST1QuREVGQVVMVF9IRUlHSFRdXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gT3B0aW9uc1xyXG4gKiBAcGFyYW0ge2ludFtdfSBbb3B0aW9ucy5ib3JuXSBMaXN0IG9mIG5laWdoYm9yIGNvdW50cyBmb3IgYSBuZXcgY2VsbCB0byBiZSBib3JuIGluIGVtcHR5IHNwYWNlXHJcbiAqIEBwYXJhbSB7aW50W119IFtvcHRpb25zLnN1cnZpdmVdIExpc3Qgb2YgbmVpZ2hib3IgY291bnRzIGZvciBhbiBleGlzdGluZyAgY2VsbCB0byBzdXJ2aXZlXHJcbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neV0gVG9wb2xvZ3kgNCBvciA2IG9yIDhcclxuICovXHJcblJPVC5NYXAuQ2VsbHVsYXIgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XHJcblx0Uk9ULk1hcC5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpO1xyXG5cdHRoaXMuX29wdGlvbnMgPSB7XHJcblx0XHRib3JuOiBbNSwgNiwgNywgOF0sXHJcblx0XHRzdXJ2aXZlOiBbNCwgNSwgNiwgNywgOF0sXHJcblx0XHR0b3BvbG9neTogOFxyXG5cdH07XHJcblx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuXHR0aGlzLl9kaXJzID0gUk9ULkRJUlNbdGhpcy5fb3B0aW9ucy50b3BvbG9neV07XHJcblx0dGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgwKTtcclxufTtcclxuUk9ULk1hcC5DZWxsdWxhci5leHRlbmQoUk9ULk1hcCk7XHJcblxyXG4vKipcclxuICogRmlsbCB0aGUgbWFwIHdpdGggcmFuZG9tIHZhbHVlc1xyXG4gKiBAcGFyYW0ge2Zsb2F0fSBwcm9iYWJpbGl0eSBQcm9iYWJpbGl0eSBmb3IgYSBjZWxsIHRvIGJlY29tZSBhbGl2ZTsgMCA9IGFsbCBlbXB0eSwgMSA9IGFsbCBmdWxsXHJcbiAqL1xyXG5ST1QuTWFwLkNlbGx1bGFyLnByb3RvdHlwZS5yYW5kb21pemUgPSBmdW5jdGlvbihwcm9iYWJpbGl0eSkge1xyXG5cdGZvciAodmFyIGk9MDtpPHRoaXMuX3dpZHRoO2krKykge1xyXG5cdFx0Zm9yICh2YXIgaj0wO2o8dGhpcy5faGVpZ2h0O2orKykge1xyXG5cdFx0XHR0aGlzLl9tYXBbaV1bal0gPSAoUk9ULlJORy5nZXRVbmlmb3JtKCkgPCBwcm9iYWJpbGl0eSA/IDEgOiAwKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hhbmdlIG9wdGlvbnMuXHJcbiAqIEBzZWUgUk9ULk1hcC5DZWxsdWxhclxyXG4gKi9cclxuUk9ULk1hcC5DZWxsdWxhci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRmb3IgKHZhciBwIGluIG9wdGlvbnMpIHsgdGhpcy5fb3B0aW9uc1twXSA9IG9wdGlvbnNbcF07IH1cclxufTtcclxuXHJcblJPVC5NYXAuQ2VsbHVsYXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHgsIHksIHZhbHVlKSB7XHJcblx0dGhpcy5fbWFwW3hdW3ldID0gdmFsdWU7XHJcbn07XHJcblxyXG5ST1QuTWFwLkNlbGx1bGFyLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdHZhciBuZXdNYXAgPSB0aGlzLl9maWxsTWFwKDApO1xyXG5cdHZhciBib3JuID0gdGhpcy5fb3B0aW9ucy5ib3JuO1xyXG5cdHZhciBzdXJ2aXZlID0gdGhpcy5fb3B0aW9ucy5zdXJ2aXZlO1xyXG5cclxuXHJcblx0Zm9yICh2YXIgaj0wO2o8dGhpcy5faGVpZ2h0O2orKykge1xyXG5cdFx0dmFyIHdpZHRoU3RlcCA9IDE7XHJcblx0XHR2YXIgd2lkdGhTdGFydCA9IDA7XHJcblx0XHRpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XHJcblx0XHRcdHdpZHRoU3RlcCA9IDI7XHJcblx0XHRcdHdpZHRoU3RhcnQgPSBqJTI7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaT13aWR0aFN0YXJ0OyBpPHRoaXMuX3dpZHRoOyBpKz13aWR0aFN0ZXApIHtcclxuXHJcblx0XHRcdHZhciBjdXIgPSB0aGlzLl9tYXBbaV1bal07XHJcblx0XHRcdHZhciBuY291bnQgPSB0aGlzLl9nZXROZWlnaGJvcnMoaSwgaik7XHJcblxyXG5cdFx0XHRpZiAoY3VyICYmIHN1cnZpdmUuaW5kZXhPZihuY291bnQpICE9IC0xKSB7IC8qIHN1cnZpdmUgKi9cclxuXHRcdFx0XHRuZXdNYXBbaV1bal0gPSAxO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCFjdXIgJiYgYm9ybi5pbmRleE9mKG5jb3VudCkgIT0gLTEpIHsgLyogYm9ybiAqL1xyXG5cdFx0XHRcdG5ld01hcFtpXVtqXSA9IDE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRoaXMuX21hcCA9IG5ld01hcDtcclxuXHJcblx0dGhpcy5zZXJ2aWNlQ2FsbGJhY2soY2FsbGJhY2spO1xyXG59O1xyXG5cclxuUk9ULk1hcC5DZWxsdWxhci5wcm90b3R5cGUuc2VydmljZUNhbGxiYWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRpZiAoIWNhbGxiYWNrKSB7IHJldHVybjsgfVxyXG5cclxuXHRmb3IgKHZhciBqPTA7ajx0aGlzLl9oZWlnaHQ7aisrKSB7XHJcblx0XHR2YXIgd2lkdGhTdGVwID0gMTtcclxuXHRcdHZhciB3aWR0aFN0YXJ0ID0gMDtcclxuXHRcdGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcclxuXHRcdFx0d2lkdGhTdGVwID0gMjtcclxuXHRcdFx0d2lkdGhTdGFydCA9IGolMjtcclxuXHRcdH1cclxuXHRcdGZvciAodmFyIGk9d2lkdGhTdGFydDsgaTx0aGlzLl93aWR0aDsgaSs9d2lkdGhTdGVwKSB7XHJcblx0XHRcdGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBuZWlnaGJvciBjb3VudCBhdCBbaSxqXSBpbiB0aGlzLl9tYXBcclxuICovXHJcblJPVC5NYXAuQ2VsbHVsYXIucHJvdG90eXBlLl9nZXROZWlnaGJvcnMgPSBmdW5jdGlvbihjeCwgY3kpIHtcclxuXHR2YXIgcmVzdWx0ID0gMDtcclxuXHRmb3IgKHZhciBpPTA7aTx0aGlzLl9kaXJzLmxlbmd0aDtpKyspIHtcclxuXHRcdHZhciBkaXIgPSB0aGlzLl9kaXJzW2ldO1xyXG5cdFx0dmFyIHggPSBjeCArIGRpclswXTtcclxuXHRcdHZhciB5ID0gY3kgKyBkaXJbMV07XHJcblxyXG5cdFx0aWYgKHggPCAwIHx8IHggPj0gdGhpcy5fd2lkdGggfHwgeSA8IDAgfHwgeSA+PSB0aGlzLl93aWR0aCkgeyBjb250aW51ZTsgfVxyXG5cdFx0cmVzdWx0ICs9ICh0aGlzLl9tYXBbeF1beV0gPT0gMSA/IDEgOiAwKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFrZSBzdXJlIGV2ZXJ5IG5vbi13YWxsIHNwYWNlIGlzIGFjY2Vzc2libGUuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIHRvIGNhbGwgdG8gZGlzcGxheSBtYXAgd2hlbiBkb1xyXG4gKiBAcGFyYW0ge2ludH0gdmFsdWUgdG8gY29uc2lkZXIgZW1wdHkgc3BhY2UgLSBkZWZhdWx0cyB0byAwXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIHRvIGNhbGwgd2hlbiBhIG5ldyBjb25uZWN0aW9uIGlzIG1hZGVcclxuICovXHJcblJPVC5NYXAuQ2VsbHVsYXIucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbihjYWxsYmFjaywgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjaykge1xyXG5cdGlmICghdmFsdWUpIHZhbHVlID0gMDtcclxuXHJcblx0dmFyIGFsbEZyZWVTcGFjZSA9IFtdO1xyXG5cdHZhciBub3RDb25uZWN0ZWQgPSB7fTtcclxuXHQvLyBmaW5kIGFsbCBmcmVlIHNwYWNlXHJcblx0Zm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLl93aWR0aDsgeCsrKSB7XHJcblx0XHRmb3IgKHZhciB5ID0gMDsgeSA8IHRoaXMuX2hlaWdodDsgeSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLl9mcmVlU3BhY2UoeCwgeSwgdmFsdWUpKSB7XHJcblx0XHRcdFx0dmFyIHAgPSBbeCwgeV07XHJcblx0XHRcdFx0bm90Q29ubmVjdGVkW3RoaXMuX3BvaW50S2V5KHApXSA9IHA7XHJcblx0XHRcdFx0YWxsRnJlZVNwYWNlLnB1c2goW3gsIHldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIgc3RhcnQgPSBhbGxGcmVlU3BhY2VbUk9ULlJORy5nZXRVbmlmb3JtSW50KDAsIGFsbEZyZWVTcGFjZS5sZW5ndGggLSAxKV07XHJcblxyXG5cdHZhciBrZXkgPSB0aGlzLl9wb2ludEtleShzdGFydCk7XHJcblx0dmFyIGNvbm5lY3RlZCA9IHt9O1xyXG5cdGNvbm5lY3RlZFtrZXldID0gc3RhcnQ7XHJcblx0ZGVsZXRlIG5vdENvbm5lY3RlZFtrZXldO1xyXG5cclxuXHQvLyBmaW5kIHdoYXQncyBjb25uZWN0ZWQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50XHJcblx0dGhpcy5fZmluZENvbm5lY3RlZChjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgW3N0YXJ0XSwgZmFsc2UsIHZhbHVlKTtcclxuXHJcblx0d2hpbGUgKE9iamVjdC5rZXlzKG5vdENvbm5lY3RlZCkubGVuZ3RoID4gMCkge1xyXG5cclxuXHRcdC8vIGZpbmQgdHdvIHBvaW50cyBmcm9tIG5vdENvbm5lY3RlZCB0byBjb25uZWN0ZWRcclxuXHRcdHZhciBwID0gdGhpcy5fZ2V0RnJvbVRvKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkKTtcclxuXHRcdHZhciBmcm9tID0gcFswXTsgLy8gbm90Q29ubmVjdGVkXHJcblx0XHR2YXIgdG8gPSBwWzFdOyAvLyBjb25uZWN0ZWRcclxuXHJcblx0XHQvLyBmaW5kIGV2ZXJ5dGhpbmcgY29ubmVjdGVkIHRvIHRoZSBzdGFydGluZyBwb2ludFxyXG5cdFx0dmFyIGxvY2FsID0ge307XHJcblx0XHRsb2NhbFt0aGlzLl9wb2ludEtleShmcm9tKV0gPSBmcm9tO1xyXG5cdFx0dGhpcy5fZmluZENvbm5lY3RlZChsb2NhbCwgbm90Q29ubmVjdGVkLCBbZnJvbV0sIHRydWUsIHZhbHVlKTtcclxuXHJcblx0XHQvLyBjb25uZWN0IHRvIGEgY29ubmVjdGVkIHNxdWFyZVxyXG5cdFx0dGhpcy5fdHVubmVsVG9Db25uZWN0ZWQodG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKTtcclxuXHJcblx0XHQvLyBub3cgYWxsIG9mIGxvY2FsIGlzIGNvbm5lY3RlZFxyXG5cdFx0Zm9yICh2YXIgayBpbiBsb2NhbCkge1xyXG5cdFx0XHR2YXIgcHAgPSBsb2NhbFtrXTtcclxuXHRcdFx0dGhpcy5fbWFwW3BwWzBdXVtwcFsxXV0gPSB2YWx1ZTtcclxuXHRcdFx0Y29ubmVjdGVkW2tdID0gcHA7XHJcblx0XHRcdGRlbGV0ZSBub3RDb25uZWN0ZWRba107XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0aGlzLnNlcnZpY2VDYWxsYmFjayhjYWxsYmFjayk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmluZCByYW5kb20gcG9pbnRzIHRvIGNvbm5lY3QuIFNlYXJjaCBmb3IgdGhlIGNsb3Nlc3QgcG9pbnQgaW4gdGhlIGxhcmdlciBzcGFjZS5cclxuICogVGhpcyBpcyB0byBtaW5pbWl6ZSB0aGUgbGVuZ3RoIG9mIHRoZSBwYXNzYWdlIHdoaWxlIG1haW50YWluaW5nIGdvb2QgcGVyZm9ybWFuY2UuXHJcbiAqL1xyXG5ST1QuTWFwLkNlbGx1bGFyLnByb3RvdHlwZS5fZ2V0RnJvbVRvID0gZnVuY3Rpb24oY29ubmVjdGVkLCBub3RDb25uZWN0ZWQpIHtcclxuXHR2YXIgZnJvbSwgdG8sIGQ7XHJcblx0dmFyIGNvbm5lY3RlZEtleXMgPSBPYmplY3Qua2V5cyhjb25uZWN0ZWQpO1xyXG5cdHZhciBub3RDb25uZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMobm90Q29ubmVjdGVkKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xyXG5cdFx0aWYgKGNvbm5lY3RlZEtleXMubGVuZ3RoIDwgbm90Q29ubmVjdGVkS2V5cy5sZW5ndGgpIHtcclxuXHRcdFx0dmFyIGtleXMgPSBjb25uZWN0ZWRLZXlzO1xyXG5cdFx0XHR0byA9IGNvbm5lY3RlZFtrZXlzW1JPVC5STkcuZ2V0VW5pZm9ybUludCgwLCBrZXlzLmxlbmd0aCAtIDEpXV07XHJcblx0XHRcdGZyb20gPSB0aGlzLl9nZXRDbG9zZXN0KHRvLCBub3RDb25uZWN0ZWQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGtleXMgPSBub3RDb25uZWN0ZWRLZXlzO1xyXG5cdFx0XHRmcm9tID0gbm90Q29ubmVjdGVkW2tleXNbUk9ULlJORy5nZXRVbmlmb3JtSW50KDAsIGtleXMubGVuZ3RoIC0gMSldXTtcclxuXHRcdFx0dG8gPSB0aGlzLl9nZXRDbG9zZXN0KGZyb20sIGNvbm5lY3RlZCk7XHJcblx0XHR9XHJcblx0XHRkID0gKGZyb21bMF0gLSB0b1swXSkgKiAoZnJvbVswXSAtIHRvWzBdKSArIChmcm9tWzFdIC0gdG9bMV0pICogKGZyb21bMV0gLSB0b1sxXSk7XHJcblx0XHRpZiAoZCA8IDY0KSB7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvLyBjb25zb2xlLmxvZyhcIj4+PiBjb25uZWN0ZWQ9XCIgKyB0byArIFwiIG5vdENvbm5lY3RlZD1cIiArIGZyb20gKyBcIiBkaXN0PVwiICsgZCk7XHJcblx0cmV0dXJuIFtmcm9tLCB0b107XHJcbn07XHJcblxyXG5ST1QuTWFwLkNlbGx1bGFyLnByb3RvdHlwZS5fZ2V0Q2xvc2VzdCA9IGZ1bmN0aW9uKHBvaW50LCBzcGFjZSkge1xyXG5cdHZhciBtaW5Qb2ludCA9IG51bGw7XHJcblx0dmFyIG1pbkRpc3QgPSBudWxsO1xyXG5cdGZvciAoayBpbiBzcGFjZSkge1xyXG5cdFx0dmFyIHAgPSBzcGFjZVtrXTtcclxuXHRcdHZhciBkID0gKHBbMF0gLSBwb2ludFswXSkgKiAocFswXSAtIHBvaW50WzBdKSArIChwWzFdIC0gcG9pbnRbMV0pICogKHBbMV0gLSBwb2ludFsxXSk7XHJcblx0XHRpZiAobWluRGlzdCA9PSBudWxsIHx8IGQgPCBtaW5EaXN0KSB7XHJcblx0XHRcdG1pbkRpc3QgPSBkO1xyXG5cdFx0XHRtaW5Qb2ludCA9IHA7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBtaW5Qb2ludDtcclxufTtcclxuXHJcblJPVC5NYXAuQ2VsbHVsYXIucHJvdG90eXBlLl9maW5kQ29ubmVjdGVkID0gZnVuY3Rpb24oY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHN0YWNrLCBrZWVwTm90Q29ubmVjdGVkLCB2YWx1ZSkge1xyXG5cdHdoaWxlKHN0YWNrLmxlbmd0aCA+IDApIHtcclxuXHRcdHZhciBwID0gc3RhY2suc3BsaWNlKDAsIDEpWzBdO1xyXG5cdFx0dmFyIHRlc3RzID0gW1xyXG5cdFx0XHRbcFswXSArIDEsIHBbMV1dLFxyXG5cdFx0XHRbcFswXSAtIDEsIHBbMV1dLFxyXG5cdFx0XHRbcFswXSwgICAgIHBbMV0gKyAxXSxcclxuXHRcdFx0W3BbMF0sICAgICBwWzFdIC0gMV1cclxuXHRcdF07XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRlc3RzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBrZXkgPSB0aGlzLl9wb2ludEtleSh0ZXN0c1tpXSk7XHJcblx0XHRcdGlmIChjb25uZWN0ZWRba2V5XSA9PSBudWxsICYmIHRoaXMuX2ZyZWVTcGFjZSh0ZXN0c1tpXVswXSwgdGVzdHNbaV1bMV0sIHZhbHVlKSkge1xyXG5cdFx0XHRcdGNvbm5lY3RlZFtrZXldID0gdGVzdHNbaV07XHJcblx0XHRcdFx0aWYgKCFrZWVwTm90Q29ubmVjdGVkKSB7XHJcblx0XHRcdFx0XHRkZWxldGUgbm90Q29ubmVjdGVkW2tleV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHN0YWNrLnB1c2godGVzdHNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuUk9ULk1hcC5DZWxsdWxhci5wcm90b3R5cGUuX3R1bm5lbFRvQ29ubmVjdGVkID0gZnVuY3Rpb24odG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKSB7XHJcblx0dmFyIGtleSA9IHRoaXMuX3BvaW50S2V5KGZyb20pO1xyXG5cdHZhciBhLCBiO1xyXG5cdGlmIChmcm9tWzBdIDwgdG9bMF0pIHtcclxuXHRcdGEgPSBmcm9tO1xyXG5cdFx0YiA9IHRvO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhID0gdG87XHJcblx0XHRiID0gZnJvbTtcclxuXHR9XHJcblx0Zm9yICh2YXIgeHggPSBhWzBdOyB4eCA8PSBiWzBdOyB4eCsrKSB7XHJcblx0XHR0aGlzLl9tYXBbeHhdW2FbMV1dID0gdmFsdWU7XHJcblx0XHR2YXIgcCA9IFt4eCwgYVsxXV07XHJcblx0XHR2YXIgcGtleSA9IHRoaXMuX3BvaW50S2V5KHApO1xyXG5cdFx0Y29ubmVjdGVkW3BrZXldID0gcDtcclxuXHRcdGRlbGV0ZSBub3RDb25uZWN0ZWRbcGtleV07XHJcblx0fVxyXG5cdGlmIChjb25uZWN0aW9uQ2FsbGJhY2sgJiYgYVswXSA8IGJbMF0pIHtcclxuXHRcdGNvbm5lY3Rpb25DYWxsYmFjayhhLCBbYlswXSwgYVsxXV0pO1xyXG5cdH1cclxuXHJcblx0Ly8geCBpcyBub3cgZml4ZWRcclxuXHR2YXIgeCA9IGJbMF07XHJcblxyXG5cdGlmIChmcm9tWzFdIDwgdG9bMV0pIHtcclxuXHRcdGEgPSBmcm9tO1xyXG5cdFx0YiA9IHRvO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhID0gdG87XHJcblx0XHRiID0gZnJvbTtcclxuXHR9XHJcblx0Zm9yICh2YXIgeXkgPSBhWzFdOyB5eSA8IGJbMV07IHl5KyspIHtcclxuXHRcdHRoaXMuX21hcFt4XVt5eV0gPSB2YWx1ZTtcclxuXHRcdHZhciBwID0gW3gsIHl5XTtcclxuXHRcdHZhciBwa2V5ID0gdGhpcy5fcG9pbnRLZXkocCk7XHJcblx0XHRjb25uZWN0ZWRbcGtleV0gPSBwO1xyXG5cdFx0ZGVsZXRlIG5vdENvbm5lY3RlZFtwa2V5XTtcclxuXHR9XHJcblx0aWYgKGNvbm5lY3Rpb25DYWxsYmFjayAmJiBhWzFdIDwgYlsxXSkge1xyXG5cdFx0Y29ubmVjdGlvbkNhbGxiYWNrKFtiWzBdLCBhWzFdXSwgW2JbMF0sIGJbMV1dKTtcclxuXHR9XHJcbn07XHJcblxyXG5ST1QuTWFwLkNlbGx1bGFyLnByb3RvdHlwZS5fZnJlZVNwYWNlID0gZnVuY3Rpb24oeCwgeSwgdmFsdWUpIHtcclxuXHRyZXR1cm4geCA+PSAwICYmIHggPCB0aGlzLl93aWR0aCAmJiB5ID49IDAgJiYgeSA8IHRoaXMuX2hlaWdodCAmJiB0aGlzLl9tYXBbeF1beV0gPT0gdmFsdWU7XHJcbn07XHJcblxyXG5ST1QuTWFwLkNlbGx1bGFyLnByb3RvdHlwZS5fcG9pbnRLZXkgPSBmdW5jdGlvbihwKSB7XHJcblx0cmV0dXJuIHBbMF0gKyBcIi5cIiArIHBbMV07XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgRHVuZ2VvbiBtYXA6IGhhcyByb29tcyBhbmQgY29ycmlkb3JzXHJcbiAqIEBhdWdtZW50cyBST1QuTWFwXHJcbiAqL1xyXG5ST1QuTWFwLkR1bmdlb24gPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcblx0Uk9ULk1hcC5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpO1xyXG5cdHRoaXMuX3Jvb21zID0gW107IC8qIGxpc3Qgb2YgYWxsIHJvb21zICovXHJcblx0dGhpcy5fY29ycmlkb3JzID0gW107XHJcbn07XHJcblJPVC5NYXAuRHVuZ2Vvbi5leHRlbmQoUk9ULk1hcCk7XHJcblxyXG4vKipcclxuICogR2V0IGFsbCBnZW5lcmF0ZWQgcm9vbXNcclxuICogQHJldHVybnMge1JPVC5NYXAuRmVhdHVyZS5Sb29tW119XHJcbiAqL1xyXG5ST1QuTWFwLkR1bmdlb24ucHJvdG90eXBlLmdldFJvb21zID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXMuX3Jvb21zO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbGwgZ2VuZXJhdGVkIGNvcnJpZG9yc1xyXG4gKiBAcmV0dXJucyB7Uk9ULk1hcC5GZWF0dXJlLkNvcnJpZG9yW119XHJcbiAqL1xyXG5ST1QuTWFwLkR1bmdlb24ucHJvdG90eXBlLmdldENvcnJpZG9ycyA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzLl9jb3JyaWRvcnM7XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgUmFuZG9tIGR1bmdlb24gZ2VuZXJhdG9yIHVzaW5nIGh1bWFuLWxpa2UgZGlnZ2luZyBwYXR0ZXJucy5cclxuICogSGVhdmlseSBiYXNlZCBvbiBNaWtlIEFuZGVyc29uJ3MgaWRlYXMgZnJvbSB0aGUgXCJUeXJhbnRcIiBhbGdvLCBtZW50aW9uZWQgYXQgXHJcbiAqIGh0dHA6Ly93d3cucm9ndWViYXNpbi5yb2d1ZWxpa2VkZXZlbG9wbWVudC5vcmcvaW5kZXgucGhwP3RpdGxlPUR1bmdlb24tQnVpbGRpbmdfQWxnb3JpdGhtLlxyXG4gKiBAYXVnbWVudHMgUk9ULk1hcC5EdW5nZW9uXHJcbiAqL1xyXG5ST1QuTWFwLkRpZ2dlciA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcclxuXHRST1QuTWFwLkR1bmdlb24uY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHRcclxuXHR0aGlzLl9vcHRpb25zID0ge1xyXG5cdFx0cm9vbVdpZHRoOiBbMywgOV0sIC8qIHJvb20gbWluaW11bSBhbmQgbWF4aW11bSB3aWR0aCAqL1xyXG5cdFx0cm9vbUhlaWdodDogWzMsIDVdLCAvKiByb29tIG1pbmltdW0gYW5kIG1heGltdW0gaGVpZ2h0ICovXHJcblx0XHRjb3JyaWRvckxlbmd0aDogWzMsIDEwXSwgLyogY29ycmlkb3IgbWluaW11bSBhbmQgbWF4aW11bSBsZW5ndGggKi9cclxuXHRcdGR1Z1BlcmNlbnRhZ2U6IDAuMiwgLyogd2Ugc3RvcCBhZnRlciB0aGlzIHBlcmNlbnRhZ2Ugb2YgbGV2ZWwgYXJlYSBoYXMgYmVlbiBkdWcgb3V0ICovXHJcblx0XHR0aW1lTGltaXQ6IDEwMDAgLyogd2Ugc3RvcCBhZnRlciB0aGlzIG11Y2ggdGltZSBoYXMgcGFzc2VkIChtc2VjKSAqL1xyXG5cdH07XHJcblx0Zm9yICh2YXIgcCBpbiBvcHRpb25zKSB7IHRoaXMuX29wdGlvbnNbcF0gPSBvcHRpb25zW3BdOyB9XHJcblx0XHJcblx0dGhpcy5fZmVhdHVyZXMgPSB7XHJcblx0XHRcIlJvb21cIjogNCxcclxuXHRcdFwiQ29ycmlkb3JcIjogNFxyXG5cdH07XHJcblx0dGhpcy5fZmVhdHVyZUF0dGVtcHRzID0gMjA7IC8qIGhvdyBtYW55IHRpbWVzIGRvIHdlIHRyeSB0byBjcmVhdGUgYSBmZWF0dXJlIG9uIGEgc3VpdGFibGUgd2FsbCAqL1xyXG5cdHRoaXMuX3dhbGxzID0ge307IC8qIHRoZXNlIGFyZSBhdmFpbGFibGUgZm9yIGRpZ2dpbmcgKi9cclxuXHRcclxuXHR0aGlzLl9kaWdDYWxsYmFjayA9IHRoaXMuX2RpZ0NhbGxiYWNrLmJpbmQodGhpcyk7XHJcblx0dGhpcy5fY2FuQmVEdWdDYWxsYmFjayA9IHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuXHR0aGlzLl9pc1dhbGxDYWxsYmFjayA9IHRoaXMuX2lzV2FsbENhbGxiYWNrLmJpbmQodGhpcyk7XHJcblx0dGhpcy5fcHJpb3JpdHlXYWxsQ2FsbGJhY2sgPSB0aGlzLl9wcmlvcml0eVdhbGxDYWxsYmFjay5iaW5kKHRoaXMpO1xyXG59O1xyXG5ST1QuTWFwLkRpZ2dlci5leHRlbmQoUk9ULk1hcC5EdW5nZW9uKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBtYXBcclxuICogQHNlZSBST1QuTWFwI2NyZWF0ZVxyXG4gKi9cclxuUk9ULk1hcC5EaWdnZXIucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0dGhpcy5fcm9vbXMgPSBbXTtcclxuXHR0aGlzLl9jb3JyaWRvcnMgPSBbXTtcclxuXHR0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xyXG5cdHRoaXMuX3dhbGxzID0ge307XHJcblx0dGhpcy5fZHVnID0gMDtcclxuXHR2YXIgYXJlYSA9ICh0aGlzLl93aWR0aC0yKSAqICh0aGlzLl9oZWlnaHQtMik7XHJcblxyXG5cdHRoaXMuX2ZpcnN0Um9vbSgpO1xyXG5cdFxyXG5cdHZhciB0MSA9IERhdGUubm93KCk7XHJcblxyXG5cdGRvIHtcclxuXHRcdHZhciB0MiA9IERhdGUubm93KCk7XHJcblx0XHRpZiAodDIgLSB0MSA+IHRoaXMuX29wdGlvbnMudGltZUxpbWl0KSB7IGJyZWFrOyB9XHJcblxyXG5cdFx0LyogZmluZCBhIGdvb2Qgd2FsbCAqL1xyXG5cdFx0dmFyIHdhbGwgPSB0aGlzLl9maW5kV2FsbCgpO1xyXG5cdFx0aWYgKCF3YWxsKSB7IGJyZWFrOyB9IC8qIG5vIG1vcmUgd2FsbHMgKi9cclxuXHRcdFxyXG5cdFx0dmFyIHBhcnRzID0gd2FsbC5zcGxpdChcIixcIik7XHJcblx0XHR2YXIgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcclxuXHRcdHZhciB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xyXG5cdFx0dmFyIGRpciA9IHRoaXMuX2dldERpZ2dpbmdEaXJlY3Rpb24oeCwgeSk7XHJcblx0XHRpZiAoIWRpcikgeyBjb250aW51ZTsgfSAvKiB0aGlzIHdhbGwgaXMgbm90IHN1aXRhYmxlICovXHJcblx0XHRcclxuLy9cdFx0Y29uc29sZS5sb2coXCJ3YWxsXCIsIHgsIHkpO1xyXG5cclxuXHRcdC8qIHRyeSBhZGRpbmcgYSBmZWF0dXJlICovXHJcblx0XHR2YXIgZmVhdHVyZUF0dGVtcHRzID0gMDtcclxuXHRcdGRvIHtcclxuXHRcdFx0ZmVhdHVyZUF0dGVtcHRzKys7XHJcblx0XHRcdGlmICh0aGlzLl90cnlGZWF0dXJlKHgsIHksIGRpclswXSwgZGlyWzFdKSkgeyAvKiBmZWF0dXJlIGFkZGVkICovXHJcblx0XHRcdFx0Ly9pZiAodGhpcy5fcm9vbXMubGVuZ3RoICsgdGhpcy5fY29ycmlkb3JzLmxlbmd0aCA9PSAyKSB7IHRoaXMuX3Jvb21zWzBdLmFkZERvb3IoeCwgeSk7IH0gLyogZmlyc3Qgcm9vbSBvZmljaWFsbHkgaGFzIGRvb3JzICovXHJcblx0XHRcdFx0dGhpcy5fcmVtb3ZlU3Vycm91bmRpbmdXYWxscyh4LCB5KTtcclxuXHRcdFx0XHR0aGlzLl9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKHgtZGlyWzBdLCB5LWRpclsxXSk7XHJcblx0XHRcdFx0YnJlYWs7IFxyXG5cdFx0XHR9XHJcblx0XHR9IHdoaWxlIChmZWF0dXJlQXR0ZW1wdHMgPCB0aGlzLl9mZWF0dXJlQXR0ZW1wdHMpO1xyXG5cdFx0XHJcblx0XHR2YXIgcHJpb3JpdHlXYWxscyA9IDA7XHJcblx0XHRmb3IgKHZhciBpZCBpbiB0aGlzLl93YWxscykgeyBcclxuXHRcdFx0aWYgKHRoaXMuX3dhbGxzW2lkXSA+IDEpIHsgcHJpb3JpdHlXYWxscysrOyB9XHJcblx0XHR9XHJcblxyXG5cdH0gd2hpbGUgKHRoaXMuX2R1Zy9hcmVhIDwgdGhpcy5fb3B0aW9ucy5kdWdQZXJjZW50YWdlIHx8IHByaW9yaXR5V2FsbHMpOyAvKiBmaXhtZSBudW1iZXIgb2YgcHJpb3JpdHkgd2FsbHMgKi9cclxuXHJcblx0dGhpcy5fYWRkRG9vcnMoKTtcclxuXHJcblx0aWYgKGNhbGxiYWNrKSB7XHJcblx0XHRmb3IgKHZhciBpPTA7aTx0aGlzLl93aWR0aDtpKyspIHtcclxuXHRcdFx0Zm9yICh2YXIgaj0wO2o8dGhpcy5faGVpZ2h0O2orKykge1xyXG5cdFx0XHRcdGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0dGhpcy5fd2FsbHMgPSB7fTtcclxuXHR0aGlzLl9tYXAgPSBudWxsO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblJPVC5NYXAuRGlnZ2VyLnByb3RvdHlwZS5fZGlnQ2FsbGJhY2sgPSBmdW5jdGlvbih4LCB5LCB2YWx1ZSkge1xyXG5cdGlmICh2YWx1ZSA9PSAwIHx8IHZhbHVlID09IDIpIHsgLyogZW1wdHkgKi9cclxuXHRcdHRoaXMuX21hcFt4XVt5XSA9IDA7XHJcblx0XHR0aGlzLl9kdWcrKztcclxuXHR9IGVsc2UgeyAvKiB3YWxsICovXHJcblx0XHR0aGlzLl93YWxsc1t4K1wiLFwiK3ldID0gMTtcclxuXHR9XHJcbn07XHJcblxyXG5ST1QuTWFwLkRpZ2dlci5wcm90b3R5cGUuX2lzV2FsbENhbGxiYWNrID0gZnVuY3Rpb24oeCwgeSkge1xyXG5cdGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xyXG59O1xyXG5cclxuUk9ULk1hcC5EaWdnZXIucHJvdG90eXBlLl9jYW5CZUR1Z0NhbGxiYWNrID0gZnVuY3Rpb24oeCwgeSkge1xyXG5cdGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4KzEgPj0gdGhpcy5fd2lkdGggfHwgeSsxID49IHRoaXMuX2hlaWdodCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRyZXR1cm4gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcclxufTtcclxuXHJcblJPVC5NYXAuRGlnZ2VyLnByb3RvdHlwZS5fcHJpb3JpdHlXYWxsQ2FsbGJhY2sgPSBmdW5jdGlvbih4LCB5KSB7XHJcblx0dGhpcy5fd2FsbHNbeCtcIixcIit5XSA9IDI7XHJcbn07XHJcblxyXG5ST1QuTWFwLkRpZ2dlci5wcm90b3R5cGUuX2ZpcnN0Um9vbSA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBjeCA9IE1hdGguZmxvb3IodGhpcy5fd2lkdGgvMik7XHJcblx0dmFyIGN5ID0gTWF0aC5mbG9vcih0aGlzLl9oZWlnaHQvMik7XHJcblx0dmFyIHJvb20gPSBST1QuTWFwLkZlYXR1cmUuUm9vbS5jcmVhdGVSYW5kb21DZW50ZXIoY3gsIGN5LCB0aGlzLl9vcHRpb25zKTtcclxuXHR0aGlzLl9yb29tcy5wdXNoKHJvb20pO1xyXG5cdHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgYSBzdWl0YWJsZSB3YWxsXHJcbiAqL1xyXG5ST1QuTWFwLkRpZ2dlci5wcm90b3R5cGUuX2ZpbmRXYWxsID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIHByaW8xID0gW107XHJcblx0dmFyIHByaW8yID0gW107XHJcblx0Zm9yICh2YXIgaWQgaW4gdGhpcy5fd2FsbHMpIHtcclxuXHRcdHZhciBwcmlvID0gdGhpcy5fd2FsbHNbaWRdO1xyXG5cdFx0aWYgKHByaW8gPT0gMikgeyBcclxuXHRcdFx0cHJpbzIucHVzaChpZCk7IFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cHJpbzEucHVzaChpZCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHZhciBhcnIgPSAocHJpbzIubGVuZ3RoID8gcHJpbzIgOiBwcmlvMSk7XHJcblx0aWYgKCFhcnIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9IC8qIG5vIHdhbGxzIDovICovXHJcblx0XHJcblx0dmFyIGlkID0gYXJyLnJhbmRvbSgpO1xyXG5cdGRlbGV0ZSB0aGlzLl93YWxsc1tpZF07XHJcblxyXG5cdHJldHVybiBpZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmllcyBhZGRpbmcgYSBmZWF0dXJlXHJcbiAqIEByZXR1cm5zIHtib29sfSB3YXMgdGhpcyBhIHN1Y2Nlc3NmdWwgdHJ5P1xyXG4gKi9cclxuUk9ULk1hcC5EaWdnZXIucHJvdG90eXBlLl90cnlGZWF0dXJlID0gZnVuY3Rpb24oeCwgeSwgZHgsIGR5KSB7XHJcblx0dmFyIGZlYXR1cmUgPSBST1QuUk5HLmdldFdlaWdodGVkVmFsdWUodGhpcy5fZmVhdHVyZXMpO1xyXG5cdGZlYXR1cmUgPSBST1QuTWFwLkZlYXR1cmVbZmVhdHVyZV0uY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCB0aGlzLl9vcHRpb25zKTtcclxuXHRcclxuXHRpZiAoIWZlYXR1cmUuaXNWYWxpZCh0aGlzLl9pc1dhbGxDYWxsYmFjaywgdGhpcy5fY2FuQmVEdWdDYWxsYmFjaykpIHtcclxuLy9cdFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XHJcbi8vXHRcdGZlYXR1cmUuZGVidWcoKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0ZmVhdHVyZS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xyXG4vL1x0ZmVhdHVyZS5kZWJ1ZygpO1xyXG5cclxuXHRpZiAoZmVhdHVyZSBpbnN0YW5jZW9mIFJPVC5NYXAuRmVhdHVyZS5Sb29tKSB7IHRoaXMuX3Jvb21zLnB1c2goZmVhdHVyZSk7IH1cclxuXHRpZiAoZmVhdHVyZSBpbnN0YW5jZW9mIFJPVC5NYXAuRmVhdHVyZS5Db3JyaWRvcikgeyBcclxuXHRcdGZlYXR1cmUuY3JlYXRlUHJpb3JpdHlXYWxscyh0aGlzLl9wcmlvcml0eVdhbGxDYWxsYmFjayk7XHJcblx0XHR0aGlzLl9jb3JyaWRvcnMucHVzaChmZWF0dXJlKTsgXHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuUk9ULk1hcC5EaWdnZXIucHJvdG90eXBlLl9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzID0gZnVuY3Rpb24oY3gsIGN5KSB7XHJcblx0dmFyIGRlbHRhcyA9IFJPVC5ESVJTWzRdO1xyXG5cclxuXHRmb3IgKHZhciBpPTA7aTxkZWx0YXMubGVuZ3RoO2krKykge1xyXG5cdFx0dmFyIGRlbHRhID0gZGVsdGFzW2ldO1xyXG5cdFx0dmFyIHggPSBjeCArIGRlbHRhWzBdO1xyXG5cdFx0dmFyIHkgPSBjeSArIGRlbHRhWzFdO1xyXG5cdFx0ZGVsZXRlIHRoaXMuX3dhbGxzW3grXCIsXCIreV07XHJcblx0XHR2YXIgeCA9IGN4ICsgMipkZWx0YVswXTtcclxuXHRcdHZhciB5ID0gY3kgKyAyKmRlbHRhWzFdO1xyXG5cdFx0ZGVsZXRlIHRoaXMuX3dhbGxzW3grXCIsXCIreV07XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdmVjdG9yIGluIFwiZGlnZ2luZ1wiIGRpcmVjdGlvbiwgb3IgZmFsc2UsIGlmIHRoaXMgZG9lcyBub3QgZXhpc3QgKG9yIGlzIG5vdCB1bmlxdWUpXHJcbiAqL1xyXG5ST1QuTWFwLkRpZ2dlci5wcm90b3R5cGUuX2dldERpZ2dpbmdEaXJlY3Rpb24gPSBmdW5jdGlvbihjeCwgY3kpIHtcclxuXHRpZiAoY3ggPD0gMCB8fCBjeSA8PSAwIHx8IGN4ID49IHRoaXMuX3dpZHRoIC0gMSB8fCBjeSA+PSB0aGlzLl9oZWlnaHQgLSAxKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG5cdHZhciByZXN1bHQgPSBudWxsO1xyXG5cdHZhciBkZWx0YXMgPSBST1QuRElSU1s0XTtcclxuXHRcclxuXHRmb3IgKHZhciBpPTA7aTxkZWx0YXMubGVuZ3RoO2krKykge1xyXG5cdFx0dmFyIGRlbHRhID0gZGVsdGFzW2ldO1xyXG5cdFx0dmFyIHggPSBjeCArIGRlbHRhWzBdO1xyXG5cdFx0dmFyIHkgPSBjeSArIGRlbHRhWzFdO1xyXG5cdFx0XHJcblx0XHRpZiAoIXRoaXMuX21hcFt4XVt5XSkgeyAvKiB0aGVyZSBhbHJlYWR5IGlzIGFub3RoZXIgZW1wdHkgbmVpZ2hib3IhICovXHJcblx0XHRcdGlmIChyZXN1bHQpIHsgcmV0dXJuIG51bGw7IH1cclxuXHRcdFx0cmVzdWx0ID0gZGVsdGE7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8qIG5vIGVtcHR5IG5laWdoYm9yICovXHJcblx0aWYgKCFyZXN1bHQpIHsgcmV0dXJuIG51bGw7IH1cclxuXHRcclxuXHRyZXR1cm4gWy1yZXN1bHRbMF0sIC1yZXN1bHRbMV1dO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbmQgZW1wdHkgc3BhY2VzIHN1cnJvdW5kaW5nIHJvb21zLCBhbmQgYXBwbHkgZG9vcnMuXHJcbiAqL1xyXG5ST1QuTWFwLkRpZ2dlci5wcm90b3R5cGUuX2FkZERvb3JzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGRhdGEgPSB0aGlzLl9tYXA7XHJcblx0dmFyIGlzV2FsbENhbGxiYWNrID0gZnVuY3Rpb24oeCwgeSkge1xyXG5cdFx0cmV0dXJuIChkYXRhW3hdW3ldID09IDEpO1xyXG5cdH07XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9yb29tcy5sZW5ndGg7IGkrKyApIHtcclxuXHRcdHZhciByb29tID0gdGhpcy5fcm9vbXNbaV07XHJcblx0XHRyb29tLmNsZWFyRG9vcnMoKTtcclxuXHRcdHJvb20uYWRkRG9vcnMoaXNXYWxsQ2FsbGJhY2spO1xyXG5cdH1cclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBEdW5nZW9uIGdlbmVyYXRvciB3aGljaCB0cmllcyB0byBmaWxsIHRoZSBzcGFjZSBldmVubHkuIEdlbmVyYXRlcyBpbmRlcGVuZGVudCByb29tcyBhbmQgdHJpZXMgdG8gY29ubmVjdCB0aGVtLlxyXG4gKiBAYXVnbWVudHMgUk9ULk1hcC5EdW5nZW9uXHJcbiAqL1xyXG5ST1QuTWFwLlVuaWZvcm0gPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XHJcblx0Uk9ULk1hcC5EdW5nZW9uLmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdHRoaXMuX29wdGlvbnMgPSB7XHJcblx0XHRyb29tV2lkdGg6IFszLCA5XSwgLyogcm9vbSBtaW5pbXVtIGFuZCBtYXhpbXVtIHdpZHRoICovXHJcblx0XHRyb29tSGVpZ2h0OiBbMywgNV0sIC8qIHJvb20gbWluaW11bSBhbmQgbWF4aW11bSBoZWlnaHQgKi9cclxuXHRcdHJvb21EdWdQZXJjZW50YWdlOiAwLjEsIC8qIHdlIHN0b3AgYWZ0ZXIgdGhpcyBwZXJjZW50YWdlIG9mIGxldmVsIGFyZWEgaGFzIGJlZW4gZHVnIG91dCBieSByb29tcyAqL1xyXG5cdFx0dGltZUxpbWl0OiAxMDAwIC8qIHdlIHN0b3AgYWZ0ZXIgdGhpcyBtdWNoIHRpbWUgaGFzIHBhc3NlZCAobXNlYykgKi9cclxuXHR9O1xyXG5cdGZvciAodmFyIHAgaW4gb3B0aW9ucykgeyB0aGlzLl9vcHRpb25zW3BdID0gb3B0aW9uc1twXTsgfVxyXG5cclxuXHR0aGlzLl9yb29tQXR0ZW1wdHMgPSAyMDsgLyogbmV3IHJvb20gaXMgY3JlYXRlZCBOLXRpbWVzIHVudGlsIGlzIGNvbnNpZGVyZWQgYXMgaW1wb3NzaWJsZSB0byBnZW5lcmF0ZSAqL1xyXG5cdHRoaXMuX2NvcnJpZG9yQXR0ZW1wdHMgPSAyMDsgLyogY29ycmlkb3JzIGFyZSB0cmllZCBOLXRpbWVzIHVudGlsIHRoZSBsZXZlbCBpcyBjb25zaWRlcmVkIGFzIGltcG9zc2libGUgdG8gY29ubmVjdCAqL1xyXG5cclxuXHR0aGlzLl9jb25uZWN0ZWQgPSBbXTsgLyogbGlzdCBvZiBhbHJlYWR5IGNvbm5lY3RlZCByb29tcyAqL1xyXG5cdHRoaXMuX3VuY29ubmVjdGVkID0gW107IC8qIGxpc3Qgb2YgcmVtYWluaW5nIHVuY29ubmVjdGVkIHJvb21zICovXHJcblx0XHJcblx0dGhpcy5fZGlnQ2FsbGJhY2sgPSB0aGlzLl9kaWdDYWxsYmFjay5iaW5kKHRoaXMpO1xyXG5cdHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2sgPSB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrLmJpbmQodGhpcyk7XHJcblx0dGhpcy5faXNXYWxsQ2FsbGJhY2sgPSB0aGlzLl9pc1dhbGxDYWxsYmFjay5iaW5kKHRoaXMpO1xyXG59O1xyXG5ST1QuTWFwLlVuaWZvcm0uZXh0ZW5kKFJPVC5NYXAuRHVuZ2Vvbik7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbWFwLiBJZiB0aGUgdGltZSBsaW1pdCBoYXMgYmVlbiBoaXQsIHJldHVybnMgbnVsbC5cclxuICogQHNlZSBST1QuTWFwI2NyZWF0ZVxyXG4gKi9cclxuUk9ULk1hcC5Vbmlmb3JtLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdHZhciB0MSA9IERhdGUubm93KCk7XHJcblx0d2hpbGUgKDEpIHtcclxuXHRcdHZhciB0MiA9IERhdGUubm93KCk7XHJcblx0XHRpZiAodDIgLSB0MSA+IHRoaXMuX29wdGlvbnMudGltZUxpbWl0KSB7IHJldHVybiBudWxsOyB9IC8qIHRpbWUgbGltaXQhICovXHJcblx0XHJcblx0XHR0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xyXG5cdFx0dGhpcy5fZHVnID0gMDtcclxuXHRcdHRoaXMuX3Jvb21zID0gW107XHJcblx0XHR0aGlzLl91bmNvbm5lY3RlZCA9IFtdO1xyXG5cdFx0dGhpcy5fZ2VuZXJhdGVSb29tcygpO1xyXG5cdFx0aWYgKHRoaXMuX3Jvb21zLmxlbmd0aCA8IDIpIHsgY29udGludWU7IH1cclxuXHRcdGlmICh0aGlzLl9nZW5lcmF0ZUNvcnJpZG9ycygpKSB7IGJyZWFrOyB9XHJcblx0fVxyXG5cdFxyXG5cdGlmIChjYWxsYmFjaykge1xyXG5cdFx0Zm9yICh2YXIgaT0wO2k8dGhpcy5fd2lkdGg7aSsrKSB7XHJcblx0XHRcdGZvciAodmFyIGo9MDtqPHRoaXMuX2hlaWdodDtqKyspIHtcclxuXHRcdFx0XHRjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHN1aXRhYmxlIGFtb3VudCBvZiByb29tc1xyXG4gKi9cclxuUk9ULk1hcC5Vbmlmb3JtLnByb3RvdHlwZS5fZ2VuZXJhdGVSb29tcyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciB3ID0gdGhpcy5fd2lkdGgtMjtcclxuXHR2YXIgaCA9IHRoaXMuX2hlaWdodC0yO1xyXG5cclxuXHRkbyB7XHJcblx0XHR2YXIgcm9vbSA9IHRoaXMuX2dlbmVyYXRlUm9vbSgpO1xyXG5cdFx0aWYgKHRoaXMuX2R1Zy8odypoKSA+IHRoaXMuX29wdGlvbnMucm9vbUR1Z1BlcmNlbnRhZ2UpIHsgYnJlYWs7IH0gLyogYWNoaWV2ZWQgcmVxdWVzdGVkIGFtb3VudCBvZiBmcmVlIHNwYWNlICovXHJcblx0fSB3aGlsZSAocm9vbSk7XHJcblxyXG5cdC8qIGVpdGhlciBlbm91Z2ggcm9vbXMsIG9yIG5vdCBhYmxlIHRvIGdlbmVyYXRlIG1vcmUgb2YgdGhlbSA6KSAqL1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBnZW5lcmF0ZSBvbmUgcm9vbVxyXG4gKi9cclxuUk9ULk1hcC5Vbmlmb3JtLnByb3RvdHlwZS5fZ2VuZXJhdGVSb29tID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGNvdW50ID0gMDtcclxuXHR3aGlsZSAoY291bnQgPCB0aGlzLl9yb29tQXR0ZW1wdHMpIHtcclxuXHRcdGNvdW50Kys7XHJcblx0XHRcclxuXHRcdHZhciByb29tID0gUk9ULk1hcC5GZWF0dXJlLlJvb20uY3JlYXRlUmFuZG9tKHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQsIHRoaXMuX29wdGlvbnMpO1xyXG5cdFx0aWYgKCFyb29tLmlzVmFsaWQodGhpcy5faXNXYWxsQ2FsbGJhY2ssIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2spKSB7IGNvbnRpbnVlOyB9XHJcblx0XHRcclxuXHRcdHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcclxuXHRcdHRoaXMuX3Jvb21zLnB1c2gocm9vbSk7XHJcblx0XHRyZXR1cm4gcm9vbTtcclxuXHR9IFxyXG5cclxuXHQvKiBubyByb29tIHdhcyBnZW5lcmF0ZWQgaW4gYSBnaXZlbiBudW1iZXIgb2YgYXR0ZW1wdHMgKi9cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgY29ubmVjdG9ycyBiZXdlZW4gcm9vbXNcclxuICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3MgV2FzIHRoaXMgYXR0ZW1wdCBzdWNjZXNzZnVsbD9cclxuICovXHJcblJPVC5NYXAuVW5pZm9ybS5wcm90b3R5cGUuX2dlbmVyYXRlQ29ycmlkb3JzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGNudCA9IDA7XHJcblx0d2hpbGUgKGNudCA8IHRoaXMuX2NvcnJpZG9yQXR0ZW1wdHMpIHtcclxuXHRcdGNudCsrO1xyXG5cdFx0dGhpcy5fY29ycmlkb3JzID0gW107XHJcblxyXG5cdFx0LyogZGlnIHJvb21zIGludG8gYSBjbGVhciBtYXAgKi9cclxuXHRcdHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XHJcblx0XHRmb3IgKHZhciBpPTA7aTx0aGlzLl9yb29tcy5sZW5ndGg7aSsrKSB7IFxyXG5cdFx0XHR2YXIgcm9vbSA9IHRoaXMuX3Jvb21zW2ldO1xyXG5cdFx0XHRyb29tLmNsZWFyRG9vcnMoKTtcclxuXHRcdFx0cm9vbS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spOyBcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl91bmNvbm5lY3RlZCA9IHRoaXMuX3Jvb21zLnNsaWNlKCkucmFuZG9taXplKCk7XHJcblx0XHR0aGlzLl9jb25uZWN0ZWQgPSBbXTtcclxuXHRcdGlmICh0aGlzLl91bmNvbm5lY3RlZC5sZW5ndGgpIHsgdGhpcy5fY29ubmVjdGVkLnB1c2godGhpcy5fdW5jb25uZWN0ZWQucG9wKCkpOyB9IC8qIGZpcnN0IG9uZSBpcyBhbHdheXMgY29ubmVjdGVkICovXHJcblx0XHRcclxuXHRcdHdoaWxlICgxKSB7XHJcblx0XHRcdC8qIDEuIHBpY2sgcmFuZG9tIGNvbm5lY3RlZCByb29tICovXHJcblx0XHRcdHZhciBjb25uZWN0ZWQgPSB0aGlzLl9jb25uZWN0ZWQucmFuZG9tKCk7XHJcblx0XHRcdFxyXG5cdFx0XHQvKiAyLiBmaW5kIGNsb3Nlc3QgdW5jb25uZWN0ZWQgKi9cclxuXHRcdFx0dmFyIHJvb20xID0gdGhpcy5fY2xvc2VzdFJvb20odGhpcy5fdW5jb25uZWN0ZWQsIGNvbm5lY3RlZCk7XHJcblx0XHRcdFxyXG5cdFx0XHQvKiAzLiBjb25uZWN0IGl0IHRvIGNsb3Nlc3QgY29ubmVjdGVkICovXHJcblx0XHRcdHZhciByb29tMiA9IHRoaXMuX2Nsb3Nlc3RSb29tKHRoaXMuX2Nvbm5lY3RlZCwgcm9vbTEpO1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIG9rID0gdGhpcy5fY29ubmVjdFJvb21zKHJvb20xLCByb29tMik7XHJcblx0XHRcdGlmICghb2spIHsgYnJlYWs7IH0gLyogc3RvcCBjb25uZWN0aW5nLCByZS1zaHVmZmxlICovXHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoIXRoaXMuX3VuY29ubmVjdGVkLmxlbmd0aCkgeyByZXR1cm4gdHJ1ZTsgfSAvKiBkb25lOyBubyByb29tcyByZW1haW4gKi9cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZvciBhIGdpdmVuIHJvb20sIGZpbmQgdGhlIGNsb3Nlc3Qgb25lIGZyb20gdGhlIGxpc3RcclxuICovXHJcblJPVC5NYXAuVW5pZm9ybS5wcm90b3R5cGUuX2Nsb3Nlc3RSb29tID0gZnVuY3Rpb24ocm9vbXMsIHJvb20pIHtcclxuXHR2YXIgZGlzdCA9IEluZmluaXR5O1xyXG5cdHZhciBjZW50ZXIgPSByb29tLmdldENlbnRlcigpO1xyXG5cdHZhciByZXN1bHQgPSBudWxsO1xyXG5cdFxyXG5cdGZvciAodmFyIGk9MDtpPHJvb21zLmxlbmd0aDtpKyspIHtcclxuXHRcdHZhciByID0gcm9vbXNbaV07XHJcblx0XHR2YXIgYyA9IHIuZ2V0Q2VudGVyKCk7XHJcblx0XHR2YXIgZHggPSBjWzBdLWNlbnRlclswXTtcclxuXHRcdHZhciBkeSA9IGNbMV0tY2VudGVyWzFdO1xyXG5cdFx0dmFyIGQgPSBkeCpkeCtkeSpkeTtcclxuXHRcdFxyXG5cdFx0aWYgKGQgPCBkaXN0KSB7XHJcblx0XHRcdGRpc3QgPSBkO1xyXG5cdFx0XHRyZXN1bHQgPSByO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuUk9ULk1hcC5Vbmlmb3JtLnByb3RvdHlwZS5fY29ubmVjdFJvb21zID0gZnVuY3Rpb24ocm9vbTEsIHJvb20yKSB7XHJcblx0LypcclxuXHRcdHJvb20xLmRlYnVnKCk7XHJcblx0XHRyb29tMi5kZWJ1ZygpO1xyXG5cdCovXHJcblxyXG5cdHZhciBjZW50ZXIxID0gcm9vbTEuZ2V0Q2VudGVyKCk7XHJcblx0dmFyIGNlbnRlcjIgPSByb29tMi5nZXRDZW50ZXIoKTtcclxuXHJcblx0dmFyIGRpZmZYID0gY2VudGVyMlswXSAtIGNlbnRlcjFbMF07XHJcblx0dmFyIGRpZmZZID0gY2VudGVyMlsxXSAtIGNlbnRlcjFbMV07XHJcblxyXG5cdGlmIChNYXRoLmFicyhkaWZmWCkgPCBNYXRoLmFicyhkaWZmWSkpIHsgLyogZmlyc3QgdHJ5IGNvbm5lY3Rpbmcgbm9ydGgtc291dGggd2FsbHMgKi9cclxuXHRcdHZhciBkaXJJbmRleDEgPSAoZGlmZlkgPiAwID8gMiA6IDApO1xyXG5cdFx0dmFyIGRpckluZGV4MiA9IChkaXJJbmRleDEgKyAyKSAlIDQ7XHJcblx0XHR2YXIgbWluID0gcm9vbTIuZ2V0TGVmdCgpO1xyXG5cdFx0dmFyIG1heCA9IHJvb20yLmdldFJpZ2h0KCk7XHJcblx0XHR2YXIgaW5kZXggPSAwO1xyXG5cdH0gZWxzZSB7IC8qIGZpcnN0IHRyeSBjb25uZWN0aW5nIGVhc3Qtd2VzdCB3YWxscyAqL1xyXG5cdFx0dmFyIGRpckluZGV4MSA9IChkaWZmWCA+IDAgPyAxIDogMyk7XHJcblx0XHR2YXIgZGlySW5kZXgyID0gKGRpckluZGV4MSArIDIpICUgNDtcclxuXHRcdHZhciBtaW4gPSByb29tMi5nZXRUb3AoKTtcclxuXHRcdHZhciBtYXggPSByb29tMi5nZXRCb3R0b20oKTtcclxuXHRcdHZhciBpbmRleCA9IDE7XHJcblx0fVxyXG5cclxuXHR2YXIgc3RhcnQgPSB0aGlzLl9wbGFjZUluV2FsbChyb29tMSwgZGlySW5kZXgxKTsgLyogY29ycmlkb3Igd2lsbCBzdGFydCBoZXJlICovXHJcblx0aWYgKCFzdGFydCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0aWYgKHN0YXJ0W2luZGV4XSA+PSBtaW4gJiYgc3RhcnRbaW5kZXhdIDw9IG1heCkgeyAvKiBwb3NzaWJsZSB0byBjb25uZWN0IHdpdGggc3RyYWlnaHQgbGluZSAoSS1saWtlKSAqL1xyXG5cdFx0dmFyIGVuZCA9IHN0YXJ0LnNsaWNlKCk7XHJcblx0XHR2YXIgdmFsdWUgPSBudWxsO1xyXG5cdFx0c3dpdGNoIChkaXJJbmRleDIpIHtcclxuXHRcdFx0Y2FzZSAwOiB2YWx1ZSA9IHJvb20yLmdldFRvcCgpLTE7IGJyZWFrO1xyXG5cdFx0XHRjYXNlIDE6IHZhbHVlID0gcm9vbTIuZ2V0UmlnaHQoKSsxOyBicmVhaztcclxuXHRcdFx0Y2FzZSAyOiB2YWx1ZSA9IHJvb20yLmdldEJvdHRvbSgpKzE7IGJyZWFrO1xyXG5cdFx0XHRjYXNlIDM6IHZhbHVlID0gcm9vbTIuZ2V0TGVmdCgpLTE7IGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0ZW5kWyhpbmRleCsxKSUyXSA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fZGlnTGluZShbc3RhcnQsIGVuZF0pO1xyXG5cdFx0XHJcblx0fSBlbHNlIGlmIChzdGFydFtpbmRleF0gPCBtaW4tMSB8fCBzdGFydFtpbmRleF0gPiBtYXgrMSkgeyAvKiBuZWVkIHRvIHN3aXRjaCB0YXJnZXQgd2FsbCAoTC1saWtlKSAqL1xyXG5cclxuXHRcdHZhciBkaWZmID0gc3RhcnRbaW5kZXhdIC0gY2VudGVyMltpbmRleF07XHJcblx0XHRzd2l0Y2ggKGRpckluZGV4Mikge1xyXG5cdFx0XHRjYXNlIDA6XHJcblx0XHRcdGNhc2UgMTpcdHZhciByb3RhdGlvbiA9IChkaWZmIDwgMCA/IDMgOiAxKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgMjpcclxuXHRcdFx0Y2FzZSAzOlx0dmFyIHJvdGF0aW9uID0gKGRpZmYgPCAwID8gMSA6IDMpOyBicmVhaztcclxuXHRcdH1cclxuXHRcdGRpckluZGV4MiA9IChkaXJJbmRleDIgKyByb3RhdGlvbikgJSA0O1xyXG5cdFx0XHJcblx0XHR2YXIgZW5kID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTIsIGRpckluZGV4Mik7XHJcblx0XHRpZiAoIWVuZCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0XHR2YXIgbWlkID0gWzAsIDBdO1xyXG5cdFx0bWlkW2luZGV4XSA9IHN0YXJ0W2luZGV4XTtcclxuXHRcdHZhciBpbmRleDIgPSAoaW5kZXgrMSklMjtcclxuXHRcdG1pZFtpbmRleDJdID0gZW5kW2luZGV4Ml07XHJcblx0XHR0aGlzLl9kaWdMaW5lKFtzdGFydCwgbWlkLCBlbmRdKTtcclxuXHRcdFxyXG5cdH0gZWxzZSB7IC8qIHVzZSBjdXJyZW50IHdhbGwgcGFpciwgYnV0IGFkanVzdCB0aGUgbGluZSBpbiB0aGUgbWlkZGxlIChTLWxpa2UpICovXHJcblx0XHJcblx0XHR2YXIgaW5kZXgyID0gKGluZGV4KzEpJTI7XHJcblx0XHR2YXIgZW5kID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTIsIGRpckluZGV4Mik7XHJcblx0XHRpZiAoIWVuZCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdHZhciBtaWQgPSBNYXRoLnJvdW5kKChlbmRbaW5kZXgyXSArIHN0YXJ0W2luZGV4Ml0pLzIpO1xyXG5cclxuXHRcdHZhciBtaWQxID0gWzAsIDBdO1xyXG5cdFx0dmFyIG1pZDIgPSBbMCwgMF07XHJcblx0XHRtaWQxW2luZGV4XSA9IHN0YXJ0W2luZGV4XTtcclxuXHRcdG1pZDFbaW5kZXgyXSA9IG1pZDtcclxuXHRcdG1pZDJbaW5kZXhdID0gZW5kW2luZGV4XTtcclxuXHRcdG1pZDJbaW5kZXgyXSA9IG1pZDtcclxuXHRcdHRoaXMuX2RpZ0xpbmUoW3N0YXJ0LCBtaWQxLCBtaWQyLCBlbmRdKTtcclxuXHR9XHJcblxyXG5cdHJvb20xLmFkZERvb3Ioc3RhcnRbMF0sIHN0YXJ0WzFdKTtcclxuXHRyb29tMi5hZGREb29yKGVuZFswXSwgZW5kWzFdKTtcclxuXHRcclxuXHR2YXIgaW5kZXggPSB0aGlzLl91bmNvbm5lY3RlZC5pbmRleE9mKHJvb20xKTtcclxuXHRpZiAoaW5kZXggIT0gLTEpIHtcclxuXHRcdHRoaXMuX3VuY29ubmVjdGVkLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHR0aGlzLl9jb25uZWN0ZWQucHVzaChyb29tMSk7XHJcblx0fVxyXG5cclxuXHR2YXIgaW5kZXggPSB0aGlzLl91bmNvbm5lY3RlZC5pbmRleE9mKHJvb20yKTtcclxuXHRpZiAoaW5kZXggIT0gLTEpIHtcclxuXHRcdHRoaXMuX3VuY29ubmVjdGVkLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHR0aGlzLl9jb25uZWN0ZWQucHVzaChyb29tMik7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuUk9ULk1hcC5Vbmlmb3JtLnByb3RvdHlwZS5fcGxhY2VJbldhbGwgPSBmdW5jdGlvbihyb29tLCBkaXJJbmRleCkge1xyXG5cdHZhciBzdGFydCA9IFswLCAwXTtcclxuXHR2YXIgZGlyID0gWzAsIDBdO1xyXG5cdHZhciBsZW5ndGggPSAwO1xyXG5cdFxyXG5cdHN3aXRjaCAoZGlySW5kZXgpIHtcclxuXHRcdGNhc2UgMDpcclxuXHRcdFx0ZGlyID0gWzEsIDBdO1xyXG5cdFx0XHRzdGFydCA9IFtyb29tLmdldExlZnQoKSwgcm9vbS5nZXRUb3AoKS0xXTtcclxuXHRcdFx0bGVuZ3RoID0gcm9vbS5nZXRSaWdodCgpLXJvb20uZ2V0TGVmdCgpKzE7XHJcblx0XHRicmVhaztcclxuXHRcdGNhc2UgMTpcclxuXHRcdFx0ZGlyID0gWzAsIDFdO1xyXG5cdFx0XHRzdGFydCA9IFtyb29tLmdldFJpZ2h0KCkrMSwgcm9vbS5nZXRUb3AoKV07XHJcblx0XHRcdGxlbmd0aCA9IHJvb20uZ2V0Qm90dG9tKCktcm9vbS5nZXRUb3AoKSsxO1xyXG5cdFx0YnJlYWs7XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdGRpciA9IFsxLCAwXTtcclxuXHRcdFx0c3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCksIHJvb20uZ2V0Qm90dG9tKCkrMV07XHJcblx0XHRcdGxlbmd0aCA9IHJvb20uZ2V0UmlnaHQoKS1yb29tLmdldExlZnQoKSsxO1xyXG5cdFx0YnJlYWs7XHJcblx0XHRjYXNlIDM6XHJcblx0XHRcdGRpciA9IFswLCAxXTtcclxuXHRcdFx0c3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCktMSwgcm9vbS5nZXRUb3AoKV07XHJcblx0XHRcdGxlbmd0aCA9IHJvb20uZ2V0Qm90dG9tKCktcm9vbS5nZXRUb3AoKSsxO1xyXG5cdFx0YnJlYWs7XHJcblx0fVxyXG5cdFxyXG5cdHZhciBhdmFpbCA9IFtdO1xyXG5cdHZhciBsYXN0QmFkSW5kZXggPSAtMjtcclxuXHJcblx0Zm9yICh2YXIgaT0wO2k8bGVuZ3RoO2krKykge1xyXG5cdFx0dmFyIHggPSBzdGFydFswXSArIGkqZGlyWzBdO1xyXG5cdFx0dmFyIHkgPSBzdGFydFsxXSArIGkqZGlyWzFdO1xyXG5cdFx0YXZhaWwucHVzaChudWxsKTtcclxuXHRcdFxyXG5cdFx0dmFyIGlzV2FsbCA9ICh0aGlzLl9tYXBbeF1beV0gPT0gMSk7XHJcblx0XHRpZiAoaXNXYWxsKSB7XHJcblx0XHRcdGlmIChsYXN0QmFkSW5kZXggIT0gaS0xKSB7IGF2YWlsW2ldID0gW3gsIHldOyB9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsYXN0QmFkSW5kZXggPSBpO1xyXG5cdFx0XHRpZiAoaSkgeyBhdmFpbFtpLTFdID0gbnVsbDsgfVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRmb3IgKHZhciBpPWF2YWlsLmxlbmd0aC0xOyBpPj0wOyBpLS0pIHtcclxuXHRcdGlmICghYXZhaWxbaV0pIHsgYXZhaWwuc3BsaWNlKGksIDEpOyB9XHJcblx0fVxyXG5cdHJldHVybiAoYXZhaWwubGVuZ3RoID8gYXZhaWwucmFuZG9tKCkgOiBudWxsKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaWcgYSBwb2x5bGluZS5cclxuICovXHJcblJPVC5NYXAuVW5pZm9ybS5wcm90b3R5cGUuX2RpZ0xpbmUgPSBmdW5jdGlvbihwb2ludHMpIHtcclxuXHRmb3IgKHZhciBpPTE7aTxwb2ludHMubGVuZ3RoO2krKykge1xyXG5cdFx0dmFyIHN0YXJ0ID0gcG9pbnRzW2ktMV07XHJcblx0XHR2YXIgZW5kID0gcG9pbnRzW2ldO1xyXG5cdFx0dmFyIGNvcnJpZG9yID0gbmV3IFJPVC5NYXAuRmVhdHVyZS5Db3JyaWRvcihzdGFydFswXSwgc3RhcnRbMV0sIGVuZFswXSwgZW5kWzFdKTtcclxuXHRcdGNvcnJpZG9yLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XHJcblx0XHR0aGlzLl9jb3JyaWRvcnMucHVzaChjb3JyaWRvcik7XHJcblx0fVxyXG59O1xyXG5cclxuUk9ULk1hcC5Vbmlmb3JtLnByb3RvdHlwZS5fZGlnQ2FsbGJhY2sgPSBmdW5jdGlvbih4LCB5LCB2YWx1ZSkge1xyXG5cdHRoaXMuX21hcFt4XVt5XSA9IHZhbHVlO1xyXG5cdGlmICh2YWx1ZSA9PSAwKSB7IHRoaXMuX2R1ZysrOyB9XHJcbn07XHJcblxyXG5ST1QuTWFwLlVuaWZvcm0ucHJvdG90eXBlLl9pc1dhbGxDYWxsYmFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuXHRpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5ID49IHRoaXMuX2hlaWdodCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRyZXR1cm4gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcclxufTtcclxuXHJcblJPVC5NYXAuVW5pZm9ybS5wcm90b3R5cGUuX2NhbkJlRHVnQ2FsbGJhY2sgPSBmdW5jdGlvbih4LCB5KSB7XHJcblx0aWYgKHggPCAxIHx8IHkgPCAxIHx8IHgrMSA+PSB0aGlzLl93aWR0aCB8fCB5KzEgPj0gdGhpcy5faGVpZ2h0KSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgaHlha3VnZWlcclxuICogQGNsYXNzIER1bmdlb24gZ2VuZXJhdG9yIHdoaWNoIHVzZXMgdGhlIFwib3JnaW5hbFwiIFJvZ3VlIGR1bmdlb24gZ2VuZXJhdGlvbiBhbGdvcml0aG0uIFNlZSBodHRwOi8va3VvaS5jb20vfmthbWlrYXplL0dhbWVEZXNpZ24vYXJ0MDdfcm9ndWVfZHVuZ2Vvbi5waHBcclxuICogQGF1Z21lbnRzIFJPVC5NYXBcclxuICogQHBhcmFtIHtpbnR9IFt3aWR0aD1ST1QuREVGQVVMVF9XSURUSF1cclxuICogQHBhcmFtIHtpbnR9IFtoZWlnaHQ9Uk9ULkRFRkFVTFRfSEVJR0hUXVxyXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIE9wdGlvbnNcclxuICogQHBhcmFtIHtpbnRbXX0gW29wdGlvbnMuY2VsbFdpZHRoPTNdIE51bWJlciBvZiBjZWxscyB0byBjcmVhdGUgb24gdGhlIGhvcml6b250YWwgKG51bWJlciBvZiByb29tcyBob3Jpem9udGFsbHkpXHJcbiAqIEBwYXJhbSB7aW50W119IFtvcHRpb25zLmNlbGxIZWlnaHQ9M10gTnVtYmVyIG9mIGNlbGxzIHRvIGNyZWF0ZSBvbiB0aGUgdmVydGljYWwgKG51bWJlciBvZiByb29tcyB2ZXJ0aWNhbGx5KVxyXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMucm9vbVdpZHRoXSBSb29tIG1pbiBhbmQgbWF4IHdpZHRoIC0gbm9ybWFsbHkgc2V0IGF1dG8tbWFnaWNhbGx5IHZpYSB0aGUgY29uc3RydWN0b3IuXHJcbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy5yb29tSGVpZ2h0XSBSb29tIG1pbiBhbmQgbWF4IGhlaWdodCAtIG5vcm1hbGx5IHNldCBhdXRvLW1hZ2ljYWxseSB2aWEgdGhlIGNvbnN0cnVjdG9yLlxyXG4gKi9cclxuUk9ULk1hcC5Sb2d1ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XHJcblx0Uk9ULk1hcC5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHR0aGlzLl9vcHRpb25zID0ge1xyXG5cdFx0Y2VsbFdpZHRoOiAzLCAgLy8gTk9URSB0byBzZWxmLCB0aGVzZSBjb3VsZCBwcm9iYWJseSB3b3JrIHRoZSBzYW1lIGFzIHRoZSByb29tV2lkdGgvcm9vbSBIZWlnaHQgdmFsdWVzXHJcblx0XHRjZWxsSGVpZ2h0OiAzICAvLyAgICAgaWUuIGFzIGFuIGFycmF5IHdpdGggbWluLW1heCB2YWx1ZXMgZm9yIGVhY2ggZGlyZWN0aW9uLi4uLlxyXG5cdH07XHJcblxyXG5cdGZvciAodmFyIHAgaW4gb3B0aW9ucykgeyB0aGlzLl9vcHRpb25zW3BdID0gb3B0aW9uc1twXTsgfVxyXG5cclxuXHQvKlxyXG5cdFNldCB0aGUgcm9vbSBzaXplcyBhY2NvcmRpbmcgdG8gdGhlIG92ZXItYWxsIHdpZHRoIG9mIHRoZSBtYXAsXHJcblx0YW5kIHRoZSBjZWxsIHNpemVzLlxyXG5cdCovXHJcblx0aWYgKCF0aGlzLl9vcHRpb25zLmhhc093blByb3BlcnR5KFwicm9vbVdpZHRoXCIpKSB7XHJcblx0XHR0aGlzLl9vcHRpb25zW1wicm9vbVdpZHRoXCJdID0gdGhpcy5fY2FsY3VsYXRlUm9vbVNpemUodGhpcy5fd2lkdGgsIHRoaXMuX29wdGlvbnNbXCJjZWxsV2lkdGhcIl0pO1xyXG5cdH1cclxuXHRpZiAoIXRoaXMuX29wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJyb29tSGVpZ2h0XCIpKSB7XHJcblx0XHR0aGlzLl9vcHRpb25zW1wicm9vbUhlaWdodFwiXSA9IHRoaXMuX2NhbGN1bGF0ZVJvb21TaXplKHRoaXMuX2hlaWdodCwgdGhpcy5fb3B0aW9uc1tcImNlbGxIZWlnaHRcIl0pO1xyXG5cdH1cclxuXHJcbn07XHJcblxyXG5ST1QuTWFwLlJvZ3VlLmV4dGVuZChST1QuTWFwKTtcclxuXHJcbi8qKlxyXG4gKiBAc2VlIFJPVC5NYXAjY3JlYXRlXHJcbiAqL1xyXG5ST1QuTWFwLlJvZ3VlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHR0aGlzLm1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XHJcblx0dGhpcy5yb29tcyA9IFtdO1xyXG5cdHRoaXMuY29ubmVjdGVkQ2VsbHMgPSBbXTtcclxuXHJcblx0dGhpcy5faW5pdFJvb21zKCk7XHJcblx0dGhpcy5fY29ubmVjdFJvb21zKCk7XHJcblx0dGhpcy5fY29ubmVjdFVuY29ubmVjdGVkUm9vbXMoKTtcclxuXHR0aGlzLl9jcmVhdGVSYW5kb21Sb29tQ29ubmVjdGlvbnMoKTtcclxuXHR0aGlzLl9jcmVhdGVSb29tcygpO1xyXG5cdHRoaXMuX2NyZWF0ZUNvcnJpZG9ycygpO1xyXG5cclxuXHRpZiAoY2FsbGJhY2spIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soaSwgaiwgdGhpcy5tYXBbaV1bal0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcblJPVC5NYXAuUm9ndWUucHJvdG90eXBlLl9jYWxjdWxhdGVSb29tU2l6ZSA9IGZ1bmN0aW9uIChzaXplLCBjZWxsKSB7XHJcblx0dmFyIG1heCA9IE1hdGguZmxvb3IoKHNpemUvY2VsbCkgKiAwLjgpO1xyXG5cdHZhciBtaW4gPSBNYXRoLmZsb29yKChzaXplL2NlbGwpICogMC4yNSk7XHJcblx0aWYgKG1pbiA8IDIpIHsgbWluID0gMjsgfVxyXG5cdGlmIChtYXggPCAyKSB7IG1heCA9IDI7IH1cclxuXHRyZXR1cm4gW21pbiwgbWF4XTtcclxufTtcclxuXHJcblJPVC5NYXAuUm9ndWUucHJvdG90eXBlLl9pbml0Um9vbXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0Ly8gY3JlYXRlIHJvb21zIGFycmF5LiBUaGlzIGlzIHRoZSBcImdyaWRcIiBsaXN0IGZyb20gdGhlIGFsZ28uXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDsgaSsrKSB7XHJcblx0XHR0aGlzLnJvb21zLnB1c2goW10pO1xyXG5cdFx0Zm9yKHZhciBqID0gMDsgaiA8IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDsgaisrKSB7XHJcblx0XHRcdHRoaXMucm9vbXNbaV0ucHVzaCh7XCJ4XCI6MCwgXCJ5XCI6MCwgXCJ3aWR0aFwiOjAsIFwiaGVpZ2h0XCI6MCwgXCJjb25uZWN0aW9uc1wiOltdLCBcImNlbGx4XCI6aSwgXCJjZWxseVwiOmp9KTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5ST1QuTWFwLlJvZ3VlLnByb3RvdHlwZS5fY29ubmVjdFJvb21zID0gZnVuY3Rpb24gKCkge1xyXG5cdC8vcGljayByYW5kb20gc3RhcnRpbmcgZ3JpZFxyXG5cdHZhciBjZ3ggPSBST1QuUk5HLmdldFVuaWZvcm1JbnQoMCwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGgtMSk7XHJcblx0dmFyIGNneSA9IFJPVC5STkcuZ2V0VW5pZm9ybUludCgwLCB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQtMSk7XHJcblxyXG5cdHZhciBpZHg7XHJcblx0dmFyIG5jZ3g7XHJcblx0dmFyIG5jZ3k7XHJcblxyXG5cdHZhciBmb3VuZCA9IGZhbHNlO1xyXG5cdHZhciByb29tO1xyXG5cdHZhciBvdGhlclJvb207XHJcblxyXG5cdC8vIGZpbmQgIHVuY29ubmVjdGVkIG5laWdoYm91ciBjZWxsc1xyXG5cdGRvIHtcclxuXHJcblx0XHQvL3ZhciBkaXJUb0NoZWNrID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xyXG5cdFx0dmFyIGRpclRvQ2hlY2sgPSBbMCwgMiwgNCwgNl07XHJcblx0XHRkaXJUb0NoZWNrID0gZGlyVG9DaGVjay5yYW5kb21pemUoKTtcclxuXHJcblx0XHRkbyB7XHJcblx0XHRcdGZvdW5kID0gZmFsc2U7XHJcblx0XHRcdGlkeCA9IGRpclRvQ2hlY2sucG9wKCk7XHJcblxyXG5cdFx0XHRuY2d4ID0gY2d4ICsgUk9ULkRJUlNbOF1baWR4XVswXTtcclxuXHRcdFx0bmNneSA9IGNneSArIFJPVC5ESVJTWzhdW2lkeF1bMV07XHJcblxyXG5cdFx0XHRpZiAobmNneCA8IDAgfHwgbmNneCA+PSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aCkgeyBjb250aW51ZTsgfVxyXG5cdFx0XHRpZiAobmNneSA8IDAgfHwgbmNneSA+PSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQpIHsgY29udGludWU7IH1cclxuXHJcblx0XHRcdHJvb20gPSB0aGlzLnJvb21zW2NneF1bY2d5XTtcclxuXHJcblx0XHRcdGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdC8vIGFzIGxvbmcgYXMgdGhpcyByb29tIGRvZXNuJ3QgYWxyZWFkeSBjb29uZWN0IHRvIG1lLCB3ZSBhcmUgb2sgd2l0aCBpdC5cclxuXHRcdFx0XHRpZiAocm9vbVtcImNvbm5lY3Rpb25zXCJdWzBdWzBdID09IG5jZ3ggJiYgcm9vbVtcImNvbm5lY3Rpb25zXCJdWzBdWzFdID09IG5jZ3kpIHtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3RoZXJSb29tID0gdGhpcy5yb29tc1tuY2d4XVtuY2d5XTtcclxuXHJcblx0XHRcdGlmIChvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRcdG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLnB1c2goW2NneCwgY2d5XSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuY29ubmVjdGVkQ2VsbHMucHVzaChbbmNneCwgbmNneV0pO1xyXG5cdFx0XHRcdGNneCA9IG5jZ3g7XHJcblx0XHRcdFx0Y2d5ID0gbmNneTtcclxuXHRcdFx0XHRmb3VuZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9IHdoaWxlIChkaXJUb0NoZWNrLmxlbmd0aCA+IDAgJiYgZm91bmQgPT0gZmFsc2UpO1xyXG5cclxuXHR9IHdoaWxlIChkaXJUb0NoZWNrLmxlbmd0aCA+IDApO1xyXG5cclxufTtcclxuXHJcblJPVC5NYXAuUm9ndWUucHJvdG90eXBlLl9jb25uZWN0VW5jb25uZWN0ZWRSb29tcyA9IGZ1bmN0aW9uICgpIHtcclxuXHQvL1doaWxlIHRoZXJlIGFyZSB1bmNvbm5lY3RlZCByb29tcywgdHJ5IHRvIGNvbm5lY3QgdGhlbSB0byBhIHJhbmRvbSBjb25uZWN0ZWQgbmVpZ2hib3JcclxuXHQvLyhpZiBhIHJvb20gaGFzIG5vIGNvbm5lY3RlZCBuZWlnaGJvcnMgeWV0LCBqdXN0IGtlZXAgY3ljbGluZywgeW91J2xsIGZpbGwgb3V0IHRvIGl0IGV2ZW50dWFsbHkpLlxyXG5cdHZhciBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xyXG5cdHZhciBjaCA9IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDtcclxuXHJcblx0dGhpcy5jb25uZWN0ZWRDZWxscyA9IHRoaXMuY29ubmVjdGVkQ2VsbHMucmFuZG9taXplKCk7XHJcblx0dmFyIHJvb207XHJcblx0dmFyIG90aGVyUm9vbTtcclxuXHR2YXIgdmFsaWRSb29tO1xyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoOyBpKyspIHtcclxuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0OyBqKyspICB7XHJcblxyXG5cdFx0XHRyb29tID0gdGhpcy5yb29tc1tpXVtqXTtcclxuXHJcblx0XHRcdGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcclxuXHRcdFx0XHR2YXIgZGlyZWN0aW9ucyA9IFswLCAyLCA0LCA2XTtcclxuXHRcdFx0XHRkaXJlY3Rpb25zID0gZGlyZWN0aW9ucy5yYW5kb21pemUoKTtcclxuXHJcblx0XHRcdFx0dmFsaWRSb29tID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGRvIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgZGlySWR4ID0gZGlyZWN0aW9ucy5wb3AoKTtcclxuXHRcdFx0XHRcdHZhciBuZXdJID0gaSArIFJPVC5ESVJTWzhdW2RpcklkeF1bMF07XHJcblx0XHRcdFx0XHR2YXIgbmV3SiA9IGogKyBST1QuRElSU1s4XVtkaXJJZHhdWzFdO1xyXG5cclxuXHRcdFx0XHRcdGlmIChuZXdJIDwgMCB8fCBuZXdJID49IGN3IHx8IG5ld0ogPCAwIHx8IG5ld0ogPj0gY2gpIHsgY29udGludWU7IH1cclxuXHJcblx0XHRcdFx0XHRvdGhlclJvb20gPSB0aGlzLnJvb21zW25ld0ldW25ld0pdO1xyXG5cclxuXHRcdFx0XHRcdHZhbGlkUm9vbSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA9PSAwKSB7IGJyZWFrOyB9XHJcblxyXG5cdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGg7IGsrKykge1xyXG5cdFx0XHRcdFx0XHRpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl1ba11bMF0gPT0gaSAmJiBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXVtrXVsxXSA9PSBqKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFsaWRSb29tID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAodmFsaWRSb29tKSB7IGJyZWFrOyB9XHJcblxyXG5cdFx0XHRcdH0gd2hpbGUgKGRpcmVjdGlvbnMubGVuZ3RoKTtcclxuXHJcblx0XHRcdFx0aWYgKHZhbGlkUm9vbSkge1xyXG5cdFx0XHRcdFx0cm9vbVtcImNvbm5lY3Rpb25zXCJdLnB1c2goW290aGVyUm9vbVtcImNlbGx4XCJdLCBvdGhlclJvb21bXCJjZWxseVwiXV0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIi0tIFVuYWJsZSB0byBjb25uZWN0IHJvb20uXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblJPVC5NYXAuUm9ndWUucHJvdG90eXBlLl9jcmVhdGVSYW5kb21Sb29tQ29ubmVjdGlvbnMgPSBmdW5jdGlvbiAoY29ubmVjdGlvbnMpIHtcclxuXHQvLyBFbXB0eSBmb3Igbm93LlxyXG59O1xyXG5cclxuXHJcblJPVC5NYXAuUm9ndWUucHJvdG90eXBlLl9jcmVhdGVSb29tcyA9IGZ1bmN0aW9uICgpIHtcclxuXHQvLyBDcmVhdGUgUm9vbXNcclxuXHJcblx0dmFyIHcgPSB0aGlzLl93aWR0aDtcclxuXHR2YXIgaCA9IHRoaXMuX2hlaWdodDtcclxuXHJcblx0dmFyIGN3ID0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7XHJcblx0dmFyIGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xyXG5cclxuXHR2YXIgY3dwID0gTWF0aC5mbG9vcih0aGlzLl93aWR0aCAvIGN3KTtcclxuXHR2YXIgY2hwID0gTWF0aC5mbG9vcih0aGlzLl9oZWlnaHQgLyBjaCk7XHJcblxyXG5cdHZhciByb29tdztcclxuXHR2YXIgcm9vbWg7XHJcblx0dmFyIHJvb21XaWR0aCA9IHRoaXMuX29wdGlvbnNbXCJyb29tV2lkdGhcIl07XHJcblx0dmFyIHJvb21IZWlnaHQgPSB0aGlzLl9vcHRpb25zW1wicm9vbUhlaWdodFwiXTtcclxuXHR2YXIgc3g7XHJcblx0dmFyIHN5O1xyXG5cdHZhciBvdGhlclJvb207XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY3c7IGkrKykge1xyXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaDsgaisrKSB7XHJcblx0XHRcdHN4ID0gY3dwICogaTtcclxuXHRcdFx0c3kgPSBjaHAgKiBqO1xyXG5cclxuXHRcdFx0aWYgKHN4ID09IDApIHsgc3ggPSAxOyB9XHJcblx0XHRcdGlmIChzeSA9PSAwKSB7IHN5ID0gMTsgfVxyXG5cclxuXHRcdFx0cm9vbXcgPSBST1QuUk5HLmdldFVuaWZvcm1JbnQocm9vbVdpZHRoWzBdLCByb29tV2lkdGhbMV0pO1xyXG5cdFx0XHRyb29taCA9IFJPVC5STkcuZ2V0VW5pZm9ybUludChyb29tSGVpZ2h0WzBdLCByb29tSGVpZ2h0WzFdKTtcclxuXHJcblx0XHRcdGlmIChqID4gMCkge1xyXG5cdFx0XHRcdG90aGVyUm9vbSA9IHRoaXMucm9vbXNbaV1bai0xXTtcclxuXHRcdFx0XHR3aGlsZSAoc3kgLSAob3RoZXJSb29tW1wieVwiXSArIG90aGVyUm9vbVtcImhlaWdodFwiXSApIDwgMykge1xyXG5cdFx0XHRcdFx0c3krKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpID4gMCkge1xyXG5cdFx0XHRcdG90aGVyUm9vbSA9IHRoaXMucm9vbXNbaS0xXVtqXTtcclxuXHRcdFx0XHR3aGlsZShzeCAtIChvdGhlclJvb21bXCJ4XCJdICsgb3RoZXJSb29tW1wid2lkdGhcIl0pIDwgMykge1xyXG5cdFx0XHRcdFx0c3grKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBzeE9mZnNldCA9IE1hdGgucm91bmQoUk9ULlJORy5nZXRVbmlmb3JtSW50KDAsIGN3cC1yb29tdykvMik7XHJcblx0XHRcdHZhciBzeU9mZnNldCA9IE1hdGgucm91bmQoUk9ULlJORy5nZXRVbmlmb3JtSW50KDAsIGNocC1yb29taCkvMik7XHJcblxyXG5cdFx0XHR3aGlsZSAoc3ggKyBzeE9mZnNldCArIHJvb213ID49IHcpIHtcclxuXHRcdFx0XHRpZihzeE9mZnNldCkge1xyXG5cdFx0XHRcdFx0c3hPZmZzZXQtLTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm9vbXctLTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChzeSArIHN5T2Zmc2V0ICsgcm9vbWggPj0gaCkge1xyXG5cdFx0XHRcdGlmKHN5T2Zmc2V0KSB7XHJcblx0XHRcdFx0XHRzeU9mZnNldC0tO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyb29taC0tO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3ggPSBzeCArIHN4T2Zmc2V0O1xyXG5cdFx0XHRzeSA9IHN5ICsgc3lPZmZzZXQ7XHJcblxyXG5cdFx0XHR0aGlzLnJvb21zW2ldW2pdW1wieFwiXSA9IHN4O1xyXG5cdFx0XHR0aGlzLnJvb21zW2ldW2pdW1wieVwiXSA9IHN5O1xyXG5cdFx0XHR0aGlzLnJvb21zW2ldW2pdW1wid2lkdGhcIl0gPSByb29tdztcclxuXHRcdFx0dGhpcy5yb29tc1tpXVtqXVtcImhlaWdodFwiXSA9IHJvb21oO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaWkgPSBzeDsgaWkgPCBzeCArIHJvb213OyBpaSsrKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgamogPSBzeTsgamogPCBzeSArIHJvb21oOyBqaisrKSB7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFtpaV1bampdID0gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5ST1QuTWFwLlJvZ3VlLnByb3RvdHlwZS5fZ2V0V2FsbFBvc2l0aW9uID0gZnVuY3Rpb24gKGFSb29tLCBhRGlyZWN0aW9uKSB7XHJcblx0dmFyIHJ4O1xyXG5cdHZhciByeTtcclxuXHR2YXIgZG9vcjtcclxuXHJcblx0aWYgKGFEaXJlY3Rpb24gPT0gMSB8fCBhRGlyZWN0aW9uID09IDMpIHtcclxuXHRcdHJ4ID0gUk9ULlJORy5nZXRVbmlmb3JtSW50KGFSb29tW1wieFwiXSArIDEsIGFSb29tW1wieFwiXSArIGFSb29tW1wid2lkdGhcIl0gLSAyKTtcclxuXHRcdGlmIChhRGlyZWN0aW9uID09IDEpIHtcclxuXHRcdFx0cnkgPSBhUm9vbVtcInlcIl0gLSAyO1xyXG5cdFx0XHRkb29yID0gcnkgKyAxO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cnkgPSBhUm9vbVtcInlcIl0gKyBhUm9vbVtcImhlaWdodFwiXSArIDE7XHJcblx0XHRcdGRvb3IgPSByeSAtMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm1hcFtyeF1bZG9vcl0gPSAwOyAvLyBpJ20gbm90IHNldHRpbmcgYSBzcGVjaWZpYyAnZG9vcicgdGlsZSB2YWx1ZSByaWdodCBub3csIGp1c3QgZW1wdHkgc3BhY2UuXHJcblxyXG5cdH0gZWxzZSBpZiAoYURpcmVjdGlvbiA9PSAyIHx8IGFEaXJlY3Rpb24gPT0gNCkge1xyXG5cdFx0cnkgPSBST1QuUk5HLmdldFVuaWZvcm1JbnQoYVJvb21bXCJ5XCJdICsgMSwgYVJvb21bXCJ5XCJdICsgYVJvb21bXCJoZWlnaHRcIl0gLSAyKTtcclxuXHRcdGlmKGFEaXJlY3Rpb24gPT0gMikge1xyXG5cdFx0XHRyeCA9IGFSb29tW1wieFwiXSArIGFSb29tW1wid2lkdGhcIl0gKyAxO1xyXG5cdFx0XHRkb29yID0gcnggLSAxO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cnggPSBhUm9vbVtcInhcIl0gLSAyO1xyXG5cdFx0XHRkb29yID0gcnggKyAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubWFwW2Rvb3JdW3J5XSA9IDA7IC8vIGknbSBub3Qgc2V0dGluZyBhIHNwZWNpZmljICdkb29yJyB0aWxlIHZhbHVlIHJpZ2h0IG5vdywganVzdCBlbXB0eSBzcGFjZS5cclxuXHJcblx0fVxyXG5cdHJldHVybiBbcngsIHJ5XTtcclxufTtcclxuXHJcbi8qKipcclxuKiBAcGFyYW0gc3RhcnRQb3NpdGlvbiBhIDIgZWxlbWVudCBhcnJheVxyXG4qIEBwYXJhbSBlbmRQb3NpdGlvbiBhIDIgZWxlbWVudCBhcnJheVxyXG4qL1xyXG5ST1QuTWFwLlJvZ3VlLnByb3RvdHlwZS5fZHJhd0NvcnJpZG9yID0gZnVuY3Rpb24gKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XHJcblx0dmFyIHhPZmZzZXQgPSBlbmRQb3NpdGlvblswXSAtIHN0YXJ0UG9zaXRpb25bMF07XHJcblx0dmFyIHlPZmZzZXQgPSBlbmRQb3NpdGlvblsxXSAtIHN0YXJ0UG9zaXRpb25bMV07XHJcblxyXG5cdHZhciB4cG9zID0gc3RhcnRQb3NpdGlvblswXTtcclxuXHR2YXIgeXBvcyA9IHN0YXJ0UG9zaXRpb25bMV07XHJcblxyXG5cdHZhciB0ZW1wRGlzdDtcclxuXHR2YXIgeERpcjtcclxuXHR2YXIgeURpcjtcclxuXHJcblx0dmFyIG1vdmU7IC8vIDIgZWxlbWVudCBhcnJheSwgZWxlbWVudCAwIGlzIHRoZSBkaXJlY3Rpb24sIGVsZW1lbnQgMSBpcyB0aGUgdG90YWwgdmFsdWUgdG8gbW92ZS5cclxuXHR2YXIgbW92ZXMgPSBbXTsgLy8gYSBsaXN0IG9mIDIgZWxlbWVudCBhcnJheXNcclxuXHJcblx0dmFyIHhBYnMgPSBNYXRoLmFicyh4T2Zmc2V0KTtcclxuXHR2YXIgeUFicyA9IE1hdGguYWJzKHlPZmZzZXQpO1xyXG5cclxuXHR2YXIgcGVyY2VudCA9IFJPVC5STkcuZ2V0VW5pZm9ybSgpOyAvLyB1c2VkIHRvIHNwbGl0IHRoZSBtb3ZlIGF0IGRpZmZlcmVudCBwbGFjZXMgYWxvbmcgdGhlIGxvbmcgYXhpc1xyXG5cdHZhciBmaXJzdEhhbGYgPSBwZXJjZW50O1xyXG5cdHZhciBzZWNvbmRIYWxmID0gMSAtIHBlcmNlbnQ7XHJcblxyXG5cdHhEaXIgPSB4T2Zmc2V0ID4gMCA/IDIgOiA2O1xyXG5cdHlEaXIgPSB5T2Zmc2V0ID4gMCA/IDQgOiAwO1xyXG5cclxuXHRpZiAoeEFicyA8IHlBYnMpIHtcclxuXHRcdC8vIG1vdmUgZmlyc3RIYWxmIG9mIHRoZSB5IG9mZnNldFxyXG5cdFx0dGVtcERpc3QgPSBNYXRoLmNlaWwoeUFicyAqIGZpcnN0SGFsZik7XHJcblx0XHRtb3Zlcy5wdXNoKFt5RGlyLCB0ZW1wRGlzdF0pO1xyXG5cdFx0Ly8gbW92ZSBhbGwgdGhlIHggb2Zmc2V0XHJcblx0XHRtb3Zlcy5wdXNoKFt4RGlyLCB4QWJzXSk7XHJcblx0XHQvLyBtb3ZlIHNlbmRIYWxmIG9mIHRoZSAgeSBvZmZzZXRcclxuXHRcdHRlbXBEaXN0ID0gTWF0aC5mbG9vcih5QWJzICogc2Vjb25kSGFsZik7XHJcblx0XHRtb3Zlcy5wdXNoKFt5RGlyLCB0ZW1wRGlzdF0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyAgbW92ZSBmaXJzdEhhbGYgb2YgdGhlIHggb2Zmc2V0XHJcblx0XHR0ZW1wRGlzdCA9IE1hdGguY2VpbCh4QWJzICogZmlyc3RIYWxmKTtcclxuXHRcdG1vdmVzLnB1c2goW3hEaXIsIHRlbXBEaXN0XSk7XHJcblx0XHQvLyBtb3ZlIGFsbCB0aGUgeSBvZmZzZXRcclxuXHRcdG1vdmVzLnB1c2goW3lEaXIsIHlBYnNdKTtcclxuXHRcdC8vIG1vdmUgc2Vjb25kSGFsZiBvZiB0aGUgeCBvZmZzZXQuXHJcblx0XHR0ZW1wRGlzdCA9IE1hdGguZmxvb3IoeEFicyAqIHNlY29uZEhhbGYpO1xyXG5cdFx0bW92ZXMucHVzaChbeERpciwgdGVtcERpc3RdKTtcclxuXHR9XHJcblxyXG5cdHRoaXMubWFwW3hwb3NdW3lwb3NdID0gMDtcclxuXHJcblx0d2hpbGUgKG1vdmVzLmxlbmd0aCA+IDApIHtcclxuXHRcdG1vdmUgPSBtb3Zlcy5wb3AoKTtcclxuXHRcdHdoaWxlIChtb3ZlWzFdID4gMCkge1xyXG5cdFx0XHR4cG9zICs9IFJPVC5ESVJTWzhdW21vdmVbMF1dWzBdO1xyXG5cdFx0XHR5cG9zICs9IFJPVC5ESVJTWzhdW21vdmVbMF1dWzFdO1xyXG5cdFx0XHR0aGlzLm1hcFt4cG9zXVt5cG9zXSA9IDA7XHJcblx0XHRcdG1vdmVbMV0gPSBtb3ZlWzFdIC0gMTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5ST1QuTWFwLlJvZ3VlLnByb3RvdHlwZS5fY3JlYXRlQ29ycmlkb3JzID0gZnVuY3Rpb24gKCkge1xyXG5cdC8vIERyYXcgQ29ycmlkb3JzIGJldHdlZW4gY29ubmVjdGVkIHJvb21zXHJcblxyXG5cdHZhciBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xyXG5cdHZhciBjaCA9IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDtcclxuXHR2YXIgcm9vbTtcclxuXHR2YXIgY29ubmVjdGlvbjtcclxuXHR2YXIgb3RoZXJSb29tO1xyXG5cdHZhciB3YWxsO1xyXG5cdHZhciBvdGhlcldhbGw7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY3c7IGkrKykge1xyXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaDsgaisrKSB7XHJcblx0XHRcdHJvb20gPSB0aGlzLnJvb21zW2ldW2pdO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCByb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoOyBrKyspIHtcclxuXHJcblx0XHRcdFx0Y29ubmVjdGlvbiA9IHJvb21bXCJjb25uZWN0aW9uc1wiXVtrXTtcclxuXHJcblx0XHRcdFx0b3RoZXJSb29tID0gdGhpcy5yb29tc1tjb25uZWN0aW9uWzBdXVtjb25uZWN0aW9uWzFdXTtcclxuXHJcblx0XHRcdFx0Ly8gZmlndXJlIG91dCB3aGF0IHdhbGwgb3VyIGNvcnJpZG9yIHdpbGwgc3RhcnQgb25lLlxyXG5cdFx0XHRcdC8vIGZpZ3VyZSBvdXQgd2hhdCB3YWxsIG91ciBjb3JyaWRvciB3aWxsIGVuZCBvbi5cclxuXHRcdFx0XHRpZiAob3RoZXJSb29tW1wiY2VsbHhcIl0gPiByb29tW1wiY2VsbHhcIl0pIHtcclxuXHRcdFx0XHRcdHdhbGwgPSAyO1xyXG5cdFx0XHRcdFx0b3RoZXJXYWxsID0gNDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG90aGVyUm9vbVtcImNlbGx4XCJdIDwgcm9vbVtcImNlbGx4XCJdKSB7XHJcblx0XHRcdFx0XHR3YWxsID0gNDtcclxuXHRcdFx0XHRcdG90aGVyV2FsbCA9IDI7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG90aGVyUm9vbVtcImNlbGx5XCJdID4gcm9vbVtcImNlbGx5XCJdKSB7XHJcblx0XHRcdFx0XHR3YWxsID0gMztcclxuXHRcdFx0XHRcdG90aGVyV2FsbCA9IDE7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG90aGVyUm9vbVtcImNlbGx5XCJdIDwgcm9vbVtcImNlbGx5XCJdKSB7XHJcblx0XHRcdFx0XHR3YWxsID0gMTtcclxuXHRcdFx0XHRcdG90aGVyV2FsbCA9IDM7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLl9kcmF3Q29ycmlkb3IodGhpcy5fZ2V0V2FsbFBvc2l0aW9uKHJvb20sIHdhbGwpLCB0aGlzLl9nZXRXYWxsUG9zaXRpb24ob3RoZXJSb29tLCBvdGhlcldhbGwpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBEdW5nZW9uIGZlYXR1cmU7IGhhcyBvd24gLmNyZWF0ZSgpIG1ldGhvZFxyXG4gKi9cclxuUk9ULk1hcC5GZWF0dXJlID0gZnVuY3Rpb24oKSB7fTtcclxuUk9ULk1hcC5GZWF0dXJlLnByb3RvdHlwZS5pc1ZhbGlkID0gZnVuY3Rpb24oY2FuQmVEdWdDYWxsYmFjaykge307XHJcblJPVC5NYXAuRmVhdHVyZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oZGlnQ2FsbGJhY2spIHt9O1xyXG5ST1QuTWFwLkZlYXR1cmUucHJvdG90eXBlLmRlYnVnID0gZnVuY3Rpb24oKSB7fTtcclxuUk9ULk1hcC5GZWF0dXJlLmNyZWF0ZVJhbmRvbUF0ID0gZnVuY3Rpb24oeCwgeSwgZHgsIGR5LCBvcHRpb25zKSB7fTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUm9vbVxyXG4gKiBAYXVnbWVudHMgUk9ULk1hcC5GZWF0dXJlXHJcbiAqIEBwYXJhbSB7aW50fSB4MVxyXG4gKiBAcGFyYW0ge2ludH0geTFcclxuICogQHBhcmFtIHtpbnR9IHgyXHJcbiAqIEBwYXJhbSB7aW50fSB5MlxyXG4gKiBAcGFyYW0ge2ludH0gW2Rvb3JYXVxyXG4gKiBAcGFyYW0ge2ludH0gW2Rvb3JZXVxyXG4gKi9cclxuUk9ULk1hcC5GZWF0dXJlLlJvb20gPSBmdW5jdGlvbih4MSwgeTEsIHgyLCB5MiwgZG9vclgsIGRvb3JZKSB7XHJcblx0dGhpcy5feDEgPSB4MTtcclxuXHR0aGlzLl95MSA9IHkxO1xyXG5cdHRoaXMuX3gyID0geDI7XHJcblx0dGhpcy5feTIgPSB5MjtcclxuXHR0aGlzLl9kb29ycyA9IHt9O1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gNCkgeyB0aGlzLmFkZERvb3IoZG9vclgsIGRvb3JZKTsgfVxyXG59O1xyXG5ST1QuTWFwLkZlYXR1cmUuUm9vbS5leHRlbmQoUk9ULk1hcC5GZWF0dXJlKTtcclxuXHJcbi8qKlxyXG4gKiBSb29tIG9mIHJhbmRvbSBzaXplLCB3aXRoIGEgZ2l2ZW4gZG9vcnMgYW5kIGRpcmVjdGlvblxyXG4gKi9cclxuUk9ULk1hcC5GZWF0dXJlLlJvb20uY3JlYXRlUmFuZG9tQXQgPSBmdW5jdGlvbih4LCB5LCBkeCwgZHksIG9wdGlvbnMpIHtcclxuXHR2YXIgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XHJcblx0dmFyIG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xyXG5cdHZhciB3aWR0aCA9IFJPVC5STkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XHJcblx0XHJcblx0dmFyIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcclxuXHR2YXIgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xyXG5cdHZhciBoZWlnaHQgPSBST1QuUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xyXG5cdFxyXG5cdGlmIChkeCA9PSAxKSB7IC8qIHRvIHRoZSByaWdodCAqL1xyXG5cdFx0dmFyIHkyID0geSAtIE1hdGguZmxvb3IoUk9ULlJORy5nZXRVbmlmb3JtKCkgKiBoZWlnaHQpO1xyXG5cdFx0cmV0dXJuIG5ldyB0aGlzKHgrMSwgeTIsIHgrd2lkdGgsIHkyK2hlaWdodC0xLCB4LCB5KTtcclxuXHR9XHJcblx0XHJcblx0aWYgKGR4ID09IC0xKSB7IC8qIHRvIHRoZSBsZWZ0ICovXHJcblx0XHR2YXIgeTIgPSB5IC0gTWF0aC5mbG9vcihST1QuUk5HLmdldFVuaWZvcm0oKSAqIGhlaWdodCk7XHJcblx0XHRyZXR1cm4gbmV3IHRoaXMoeC13aWR0aCwgeTIsIHgtMSwgeTIraGVpZ2h0LTEsIHgsIHkpO1xyXG5cdH1cclxuXHJcblx0aWYgKGR5ID09IDEpIHsgLyogdG8gdGhlIGJvdHRvbSAqL1xyXG5cdFx0dmFyIHgyID0geCAtIE1hdGguZmxvb3IoUk9ULlJORy5nZXRVbmlmb3JtKCkgKiB3aWR0aCk7XHJcblx0XHRyZXR1cm4gbmV3IHRoaXMoeDIsIHkrMSwgeDIrd2lkdGgtMSwgeStoZWlnaHQsIHgsIHkpO1xyXG5cdH1cclxuXHJcblx0aWYgKGR5ID09IC0xKSB7IC8qIHRvIHRoZSB0b3AgKi9cclxuXHRcdHZhciB4MiA9IHggLSBNYXRoLmZsb29yKFJPVC5STkcuZ2V0VW5pZm9ybSgpICogd2lkdGgpO1xyXG5cdFx0cmV0dXJuIG5ldyB0aGlzKHgyLCB5LWhlaWdodCwgeDIrd2lkdGgtMSwgeS0xLCB4LCB5KTtcclxuXHR9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImR4IG9yIGR5IG11c3QgYmUgMSBvciAtMVwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSb29tIG9mIHJhbmRvbSBzaXplLCBwb3NpdGlvbmVkIGFyb3VuZCBjZW50ZXIgY29vcmRzXHJcbiAqL1xyXG5ST1QuTWFwLkZlYXR1cmUuUm9vbS5jcmVhdGVSYW5kb21DZW50ZXIgPSBmdW5jdGlvbihjeCwgY3ksIG9wdGlvbnMpIHtcclxuXHR2YXIgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XHJcblx0dmFyIG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xyXG5cdHZhciB3aWR0aCA9IFJPVC5STkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XHJcblx0XHJcblx0dmFyIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcclxuXHR2YXIgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xyXG5cdHZhciBoZWlnaHQgPSBST1QuUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xyXG5cclxuXHR2YXIgeDEgPSBjeCAtIE1hdGguZmxvb3IoUk9ULlJORy5nZXRVbmlmb3JtKCkqd2lkdGgpO1xyXG5cdHZhciB5MSA9IGN5IC0gTWF0aC5mbG9vcihST1QuUk5HLmdldFVuaWZvcm0oKSpoZWlnaHQpO1xyXG5cdHZhciB4MiA9IHgxICsgd2lkdGggLSAxO1xyXG5cdHZhciB5MiA9IHkxICsgaGVpZ2h0IC0gMTtcclxuXHJcblx0cmV0dXJuIG5ldyB0aGlzKHgxLCB5MSwgeDIsIHkyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSb29tIG9mIHJhbmRvbSBzaXplIHdpdGhpbiBhIGdpdmVuIGRpbWVuc2lvbnNcclxuICovXHJcblJPVC5NYXAuRmVhdHVyZS5Sb29tLmNyZWF0ZVJhbmRvbSA9IGZ1bmN0aW9uKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0LCBvcHRpb25zKSB7XHJcblx0dmFyIG1pbiA9IG9wdGlvbnMucm9vbVdpZHRoWzBdO1xyXG5cdHZhciBtYXggPSBvcHRpb25zLnJvb21XaWR0aFsxXTtcclxuXHR2YXIgd2lkdGggPSBST1QuUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xyXG5cdFxyXG5cdHZhciBtaW4gPSBvcHRpb25zLnJvb21IZWlnaHRbMF07XHJcblx0dmFyIG1heCA9IG9wdGlvbnMucm9vbUhlaWdodFsxXTtcclxuXHR2YXIgaGVpZ2h0ID0gUk9ULlJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcclxuXHRcclxuXHR2YXIgbGVmdCA9IGF2YWlsV2lkdGggLSB3aWR0aCAtIDE7XHJcblx0dmFyIHRvcCA9IGF2YWlsSGVpZ2h0IC0gaGVpZ2h0IC0gMTtcclxuXHJcblx0dmFyIHgxID0gMSArIE1hdGguZmxvb3IoUk9ULlJORy5nZXRVbmlmb3JtKCkqbGVmdCk7XHJcblx0dmFyIHkxID0gMSArIE1hdGguZmxvb3IoUk9ULlJORy5nZXRVbmlmb3JtKCkqdG9wKTtcclxuXHR2YXIgeDIgPSB4MSArIHdpZHRoIC0gMTtcclxuXHR2YXIgeTIgPSB5MSArIGhlaWdodCAtIDE7XHJcblxyXG5cdHJldHVybiBuZXcgdGhpcyh4MSwgeTEsIHgyLCB5Mik7XHJcbn07XHJcblxyXG5ST1QuTWFwLkZlYXR1cmUuUm9vbS5wcm90b3R5cGUuYWRkRG9vciA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuXHR0aGlzLl9kb29yc1t4K1wiLFwiK3ldID0gMTtcclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufVxyXG4gKi9cclxuUk9ULk1hcC5GZWF0dXJlLlJvb20ucHJvdG90eXBlLmdldERvb3JzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRmb3IgKHZhciBrZXkgaW4gdGhpcy5fZG9vcnMpIHtcclxuXHRcdHZhciBwYXJ0cyA9IGtleS5zcGxpdChcIixcIik7XHJcblx0XHRjYWxsYmFjayhwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKSk7XHJcblx0fVxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuUk9ULk1hcC5GZWF0dXJlLlJvb20ucHJvdG90eXBlLmNsZWFyRG9vcnMgPSBmdW5jdGlvbigpIHtcclxuXHR0aGlzLl9kb29ycyA9IHt9O1xyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuUk9ULk1hcC5GZWF0dXJlLlJvb20ucHJvdG90eXBlLmFkZERvb3JzID0gZnVuY3Rpb24oaXNXYWxsQ2FsbGJhY2spIHtcclxuXHR2YXIgbGVmdCA9IHRoaXMuX3gxLTE7XHJcblx0dmFyIHJpZ2h0ID0gdGhpcy5feDIrMTtcclxuXHR2YXIgdG9wID0gdGhpcy5feTEtMTtcclxuXHR2YXIgYm90dG9tID0gdGhpcy5feTIrMTtcclxuXHJcblx0Zm9yICh2YXIgeD1sZWZ0OyB4PD1yaWdodDsgeCsrKSB7XHJcblx0XHRmb3IgKHZhciB5PXRvcDsgeTw9Ym90dG9tOyB5KyspIHtcclxuXHRcdFx0aWYgKHggIT0gbGVmdCAmJiB4ICE9IHJpZ2h0ICYmIHkgIT0gdG9wICYmIHkgIT0gYm90dG9tKSB7IGNvbnRpbnVlOyB9XHJcblx0XHRcdGlmIChpc1dhbGxDYWxsYmFjayh4LCB5KSkgeyBjb250aW51ZTsgfVxyXG5cclxuXHRcdFx0dGhpcy5hZGREb29yKHgsIHkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5ST1QuTWFwLkZlYXR1cmUuUm9vbS5wcm90b3R5cGUuZGVidWcgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zb2xlLmxvZyhcInJvb21cIiwgdGhpcy5feDEsIHRoaXMuX3kxLCB0aGlzLl94MiwgdGhpcy5feTIpO1xyXG59O1xyXG5cclxuUk9ULk1hcC5GZWF0dXJlLlJvb20ucHJvdG90eXBlLmlzVmFsaWQgPSBmdW5jdGlvbihpc1dhbGxDYWxsYmFjaywgY2FuQmVEdWdDYWxsYmFjaykgeyBcclxuXHR2YXIgbGVmdCA9IHRoaXMuX3gxLTE7XHJcblx0dmFyIHJpZ2h0ID0gdGhpcy5feDIrMTtcclxuXHR2YXIgdG9wID0gdGhpcy5feTEtMTtcclxuXHR2YXIgYm90dG9tID0gdGhpcy5feTIrMTtcclxuXHRcclxuXHRmb3IgKHZhciB4PWxlZnQ7IHg8PXJpZ2h0OyB4KyspIHtcclxuXHRcdGZvciAodmFyIHk9dG9wOyB5PD1ib3R0b207IHkrKykge1xyXG5cdFx0XHRpZiAoeCA9PSBsZWZ0IHx8IHggPT0gcmlnaHQgfHwgeSA9PSB0b3AgfHwgeSA9PSBib3R0b20pIHtcclxuXHRcdFx0XHRpZiAoIWlzV2FsbENhbGxiYWNrKHgsIHkpKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICghY2FuQmVEdWdDYWxsYmFjayh4LCB5KSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZGlnQ2FsbGJhY2sgRGlnIGNhbGxiYWNrIHdpdGggYSBzaWduYXR1cmUgKHgsIHksIHZhbHVlKS4gVmFsdWVzOiAwID0gZW1wdHksIDEgPSB3YWxsLCAyID0gZG9vci4gTXVsdGlwbGUgZG9vcnMgYXJlIGFsbG93ZWQuXHJcbiAqL1xyXG5ST1QuTWFwLkZlYXR1cmUuUm9vbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oZGlnQ2FsbGJhY2spIHsgXHJcblx0dmFyIGxlZnQgPSB0aGlzLl94MS0xO1xyXG5cdHZhciByaWdodCA9IHRoaXMuX3gyKzE7XHJcblx0dmFyIHRvcCA9IHRoaXMuX3kxLTE7XHJcblx0dmFyIGJvdHRvbSA9IHRoaXMuX3kyKzE7XHJcblx0XHJcblx0dmFyIHZhbHVlID0gMDtcclxuXHRmb3IgKHZhciB4PWxlZnQ7IHg8PXJpZ2h0OyB4KyspIHtcclxuXHRcdGZvciAodmFyIHk9dG9wOyB5PD1ib3R0b207IHkrKykge1xyXG5cdFx0XHRpZiAoeCtcIixcIit5IGluIHRoaXMuX2Rvb3JzKSB7XHJcblx0XHRcdFx0dmFsdWUgPSAyO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHggPT0gbGVmdCB8fCB4ID09IHJpZ2h0IHx8IHkgPT0gdG9wIHx8IHkgPT0gYm90dG9tKSB7XHJcblx0XHRcdFx0dmFsdWUgPSAxO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhbHVlID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRkaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuUk9ULk1hcC5GZWF0dXJlLlJvb20ucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBbTWF0aC5yb3VuZCgodGhpcy5feDEgKyB0aGlzLl94MikvMiksIE1hdGgucm91bmQoKHRoaXMuX3kxICsgdGhpcy5feTIpLzIpXTtcclxufTtcclxuXHJcblJPVC5NYXAuRmVhdHVyZS5Sb29tLnByb3RvdHlwZS5nZXRMZWZ0ID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXMuX3gxO1xyXG59O1xyXG5cclxuUk9ULk1hcC5GZWF0dXJlLlJvb20ucHJvdG90eXBlLmdldFJpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXMuX3gyO1xyXG59O1xyXG5cclxuUk9ULk1hcC5GZWF0dXJlLlJvb20ucHJvdG90eXBlLmdldFRvcCA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzLl95MTtcclxufTtcclxuXHJcblJPVC5NYXAuRmVhdHVyZS5Sb29tLnByb3RvdHlwZS5nZXRCb3R0b20gPSBmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcy5feTI7XHJcbn07XHJcblxyXG4vKipcclxuICogQGNsYXNzIENvcnJpZG9yXHJcbiAqIEBhdWdtZW50cyBST1QuTWFwLkZlYXR1cmVcclxuICogQHBhcmFtIHtpbnR9IHN0YXJ0WFxyXG4gKiBAcGFyYW0ge2ludH0gc3RhcnRZXHJcbiAqIEBwYXJhbSB7aW50fSBlbmRYXHJcbiAqIEBwYXJhbSB7aW50fSBlbmRZXHJcbiAqL1xyXG5ST1QuTWFwLkZlYXR1cmUuQ29ycmlkb3IgPSBmdW5jdGlvbihzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSkge1xyXG5cdHRoaXMuX3N0YXJ0WCA9IHN0YXJ0WDtcclxuXHR0aGlzLl9zdGFydFkgPSBzdGFydFk7XHJcblx0dGhpcy5fZW5kWCA9IGVuZFg7IFxyXG5cdHRoaXMuX2VuZFkgPSBlbmRZO1xyXG5cdHRoaXMuX2VuZHNXaXRoQVdhbGwgPSB0cnVlO1xyXG59O1xyXG5ST1QuTWFwLkZlYXR1cmUuQ29ycmlkb3IuZXh0ZW5kKFJPVC5NYXAuRmVhdHVyZSk7XHJcblxyXG5ST1QuTWFwLkZlYXR1cmUuQ29ycmlkb3IuY3JlYXRlUmFuZG9tQXQgPSBmdW5jdGlvbih4LCB5LCBkeCwgZHksIG9wdGlvbnMpIHtcclxuXHR2YXIgbWluID0gb3B0aW9ucy5jb3JyaWRvckxlbmd0aFswXTtcclxuXHR2YXIgbWF4ID0gb3B0aW9ucy5jb3JyaWRvckxlbmd0aFsxXTtcclxuXHR2YXIgbGVuZ3RoID0gUk9ULlJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcclxuXHRcclxuXHRyZXR1cm4gbmV3IHRoaXMoeCwgeSwgeCArIGR4Kmxlbmd0aCwgeSArIGR5Kmxlbmd0aCk7XHJcbn07XHJcblxyXG5ST1QuTWFwLkZlYXR1cmUuQ29ycmlkb3IucHJvdG90eXBlLmRlYnVnID0gZnVuY3Rpb24oKSB7XHJcblx0Y29uc29sZS5sb2coXCJjb3JyaWRvclwiLCB0aGlzLl9zdGFydFgsIHRoaXMuX3N0YXJ0WSwgdGhpcy5fZW5kWCwgdGhpcy5fZW5kWSk7XHJcbn07XHJcblxyXG5ST1QuTWFwLkZlYXR1cmUuQ29ycmlkb3IucHJvdG90eXBlLmlzVmFsaWQgPSBmdW5jdGlvbihpc1dhbGxDYWxsYmFjaywgY2FuQmVEdWdDYWxsYmFjayl7IFxyXG5cdHZhciBzeCA9IHRoaXMuX3N0YXJ0WDtcclxuXHR2YXIgc3kgPSB0aGlzLl9zdGFydFk7XHJcblx0dmFyIGR4ID0gdGhpcy5fZW5kWC1zeDtcclxuXHR2YXIgZHkgPSB0aGlzLl9lbmRZLXN5O1xyXG5cdHZhciBsZW5ndGggPSAxICsgTWF0aC5tYXgoTWF0aC5hYnMoZHgpLCBNYXRoLmFicyhkeSkpO1xyXG5cdFxyXG5cdGlmIChkeCkgeyBkeCA9IGR4L01hdGguYWJzKGR4KTsgfVxyXG5cdGlmIChkeSkgeyBkeSA9IGR5L01hdGguYWJzKGR5KTsgfVxyXG5cdHZhciBueCA9IGR5O1xyXG5cdHZhciBueSA9IC1keDtcclxuXHRcclxuXHR2YXIgb2sgPSB0cnVlO1xyXG5cdGZvciAodmFyIGk9MDsgaTxsZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHggPSBzeCArIGkqZHg7XHJcblx0XHR2YXIgeSA9IHN5ICsgaSpkeTtcclxuXHJcblx0XHRpZiAoIWNhbkJlRHVnQ2FsbGJhY2soICAgICB4LCAgICAgIHkpKSB7IG9rID0gZmFsc2U7IH1cclxuXHRcdGlmICghaXNXYWxsQ2FsbGJhY2sgICh4ICsgbngsIHkgKyBueSkpIHsgb2sgPSBmYWxzZTsgfVxyXG5cdFx0aWYgKCFpc1dhbGxDYWxsYmFjayAgKHggLSBueCwgeSAtIG55KSkgeyBvayA9IGZhbHNlOyB9XHJcblx0XHRcclxuXHRcdGlmICghb2spIHtcclxuXHRcdFx0bGVuZ3RoID0gaTtcclxuXHRcdFx0dGhpcy5fZW5kWCA9IHgtZHg7XHJcblx0XHRcdHRoaXMuX2VuZFkgPSB5LWR5O1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogSWYgdGhlIGxlbmd0aCBkZWdlbmVyYXRlZCwgdGhpcyBjb3JyaWRvciBtaWdodCBiZSBpbnZhbGlkXHJcblx0ICovXHJcblx0IFxyXG5cdC8qIG5vdCBzdXBwb3J0ZWQgKi9cclxuXHRpZiAobGVuZ3RoID09IDApIHsgcmV0dXJuIGZhbHNlOyB9IFxyXG5cdFxyXG5cdCAvKiBsZW5ndGggMSBhbGxvd2VkIG9ubHkgaWYgdGhlIG5leHQgc3BhY2UgaXMgZW1wdHkgKi9cclxuXHRpZiAobGVuZ3RoID09IDEgJiYgaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFdlIGRvIG5vdCB3YW50IHRoZSBjb3JyaWRvciB0byBjcmFzaCBpbnRvIGEgY29ybmVyIG9mIGEgcm9vbTtcclxuXHQgKiBpZiBhbnkgb2YgdGhlIGVuZGluZyBjb3JuZXJzIGlzIGVtcHR5LCB0aGUgTisxdGggY2VsbCBvZiB0aGlzIGNvcnJpZG9yIG11c3QgYmUgZW1wdHkgdG9vLlxyXG5cdCAqIFxyXG5cdCAqIFNpdHVhdGlvbjpcclxuXHQgKiAjIyMjIyMjMVxyXG5cdCAqIC4uLi4uLi4/XHJcblx0ICogIyMjIyMjIzJcclxuXHQgKiBcclxuXHQgKiBUaGUgY29ycmlkb3Igd2FzIGR1ZyBmcm9tIGxlZnQgdG8gcmlnaHQuXHJcblx0ICogMSwgMiAtIHByb2JsZW1hdGljIGNvcm5lcnMsID8gPSBOKzF0aCBjZWxsIChub3QgZHVnKVxyXG5cdCAqL1xyXG5cdHZhciBmaXJzdENvcm5lckJhZCA9ICFpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHggKyBueCwgdGhpcy5fZW5kWSArIGR5ICsgbnkpO1xyXG5cdHZhciBzZWNvbmRDb3JuZXJCYWQgPSAhaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4IC0gbngsIHRoaXMuX2VuZFkgKyBkeSAtIG55KTtcclxuXHR0aGlzLl9lbmRzV2l0aEFXYWxsID0gaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpO1xyXG5cdGlmICgoZmlyc3RDb3JuZXJCYWQgfHwgc2Vjb25kQ29ybmVyQmFkKSAmJiB0aGlzLl9lbmRzV2l0aEFXYWxsKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBkaWdDYWxsYmFjayBEaWcgY2FsbGJhY2sgd2l0aCBhIHNpZ25hdHVyZSAoeCwgeSwgdmFsdWUpLiBWYWx1ZXM6IDAgPSBlbXB0eS5cclxuICovXHJcblJPVC5NYXAuRmVhdHVyZS5Db3JyaWRvci5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oZGlnQ2FsbGJhY2spIHsgXHJcblx0dmFyIHN4ID0gdGhpcy5fc3RhcnRYO1xyXG5cdHZhciBzeSA9IHRoaXMuX3N0YXJ0WTtcclxuXHR2YXIgZHggPSB0aGlzLl9lbmRYLXN4O1xyXG5cdHZhciBkeSA9IHRoaXMuX2VuZFktc3k7XHJcblx0dmFyIGxlbmd0aCA9IDErTWF0aC5tYXgoTWF0aC5hYnMoZHgpLCBNYXRoLmFicyhkeSkpO1xyXG5cdFxyXG5cdGlmIChkeCkgeyBkeCA9IGR4L01hdGguYWJzKGR4KTsgfVxyXG5cdGlmIChkeSkgeyBkeSA9IGR5L01hdGguYWJzKGR5KTsgfVxyXG5cdHZhciBueCA9IGR5O1xyXG5cdHZhciBueSA9IC1keDtcclxuXHRcclxuXHRmb3IgKHZhciBpPTA7IGk8bGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciB4ID0gc3ggKyBpKmR4O1xyXG5cdFx0dmFyIHkgPSBzeSArIGkqZHk7XHJcblx0XHRkaWdDYWxsYmFjayh4LCB5LCAwKTtcclxuXHR9XHJcblx0XHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5ST1QuTWFwLkZlYXR1cmUuQ29ycmlkb3IucHJvdG90eXBlLmNyZWF0ZVByaW9yaXR5V2FsbHMgPSBmdW5jdGlvbihwcmlvcml0eVdhbGxDYWxsYmFjaykge1xyXG5cdGlmICghdGhpcy5fZW5kc1dpdGhBV2FsbCkgeyByZXR1cm47IH1cclxuXHJcblx0dmFyIHN4ID0gdGhpcy5fc3RhcnRYO1xyXG5cdHZhciBzeSA9IHRoaXMuX3N0YXJ0WTtcclxuXHJcblx0dmFyIGR4ID0gdGhpcy5fZW5kWC1zeDtcclxuXHR2YXIgZHkgPSB0aGlzLl9lbmRZLXN5O1xyXG5cdGlmIChkeCkgeyBkeCA9IGR4L01hdGguYWJzKGR4KTsgfVxyXG5cdGlmIChkeSkgeyBkeSA9IGR5L01hdGguYWJzKGR5KTsgfVxyXG5cdHZhciBueCA9IGR5O1xyXG5cdHZhciBueSA9IC1keDtcclxuXHJcblx0cHJpb3JpdHlXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpO1xyXG5cdHByaW9yaXR5V2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBueCwgdGhpcy5fZW5kWSArIG55KTtcclxuXHRwcmlvcml0eVdhbGxDYWxsYmFjayh0aGlzLl9lbmRYIC0gbngsIHRoaXMuX2VuZFkgLSBueSk7XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgQmFzZSBub2lzZSBnZW5lcmF0b3JcclxuICovXHJcblJPVC5Ob2lzZSA9IGZ1bmN0aW9uKCkge1xyXG59O1xyXG5cclxuUk9ULk5vaXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbih4LCB5KSB7fTtcclxuLyoqXHJcbiAqIEEgc2ltcGxlIDJkIGltcGxlbWVudGF0aW9uIG9mIHNpbXBsZXggbm9pc2UgYnkgT25kcmVqIFphcmFcclxuICpcclxuICogQmFzZWQgb24gYSBzcGVlZC1pbXByb3ZlZCBzaW1wbGV4IG5vaXNlIGFsZ29yaXRobSBmb3IgMkQsIDNEIGFuZCA0RCBpbiBKYXZhLlxyXG4gKiBXaGljaCBpcyBiYXNlZCBvbiBleGFtcGxlIGNvZGUgYnkgU3RlZmFuIEd1c3RhdnNvbiAoc3RlZ3VAaXRuLmxpdS5zZSkuXHJcbiAqIFdpdGggT3B0aW1pc2F0aW9ucyBieSBQZXRlciBFYXN0bWFuIChwZWFzdG1hbkBkcml6emxlLnN0YW5mb3JkLmVkdSkuXHJcbiAqIEJldHRlciByYW5rIG9yZGVyaW5nIG1ldGhvZCBieSBTdGVmYW4gR3VzdGF2c29uIGluIDIwMTIuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyAyRCBzaW1wbGV4IG5vaXNlIGdlbmVyYXRvclxyXG4gKiBAcGFyYW0ge2ludH0gW2dyYWRpZW50cz0yNTZdIFJhbmRvbSBncmFkaWVudHNcclxuICovXHJcblJPVC5Ob2lzZS5TaW1wbGV4ID0gZnVuY3Rpb24oZ3JhZGllbnRzKSB7XHJcblx0Uk9ULk5vaXNlLmNhbGwodGhpcyk7XHJcblxyXG5cdHRoaXMuX0YyID0gMC41ICogKE1hdGguc3FydCgzKSAtIDEpO1xyXG5cdHRoaXMuX0cyID0gKDMgLSBNYXRoLnNxcnQoMykpIC8gNjtcclxuXHJcblx0dGhpcy5fZ3JhZGllbnRzID0gW1xyXG5cdFx0WyAwLCAtMV0sXHJcblx0XHRbIDEsIC0xXSxcclxuXHRcdFsgMSwgIDBdLFxyXG5cdFx0WyAxLCAgMV0sXHJcblx0XHRbIDAsICAxXSxcclxuXHRcdFstMSwgIDFdLFxyXG5cdFx0Wy0xLCAgMF0sXHJcblx0XHRbLTEsIC0xXVxyXG5cdF07XHJcblxyXG5cdHZhciBwZXJtdXRhdGlvbnMgPSBbXTtcclxuXHR2YXIgY291bnQgPSBncmFkaWVudHMgfHwgMjU2O1xyXG5cdGZvciAodmFyIGk9MDtpPGNvdW50O2krKykgeyBwZXJtdXRhdGlvbnMucHVzaChpKTsgfVxyXG5cdHBlcm11dGF0aW9ucyA9IHBlcm11dGF0aW9ucy5yYW5kb21pemUoKTtcclxuXHJcblx0dGhpcy5fcGVybXMgPSBbXTtcclxuXHR0aGlzLl9pbmRleGVzID0gW107XHJcblxyXG5cdGZvciAodmFyIGk9MDtpPDIqY291bnQ7aSsrKSB7XHJcblx0XHR0aGlzLl9wZXJtcy5wdXNoKHBlcm11dGF0aW9uc1tpICUgY291bnRdKTtcclxuXHRcdHRoaXMuX2luZGV4ZXMucHVzaCh0aGlzLl9wZXJtc1tpXSAlIHRoaXMuX2dyYWRpZW50cy5sZW5ndGgpO1xyXG5cdH1cclxuXHJcbn07XHJcblJPVC5Ob2lzZS5TaW1wbGV4LmV4dGVuZChST1QuTm9pc2UpO1xyXG5cclxuUk9ULk5vaXNlLlNpbXBsZXgucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHhpbiwgeWluKSB7XHJcblx0dmFyIHBlcm1zID0gdGhpcy5fcGVybXM7XHJcblx0dmFyIGluZGV4ZXMgPSB0aGlzLl9pbmRleGVzO1xyXG5cdHZhciBjb3VudCA9IHBlcm1zLmxlbmd0aC8yO1xyXG5cdHZhciBHMiA9IHRoaXMuX0cyO1xyXG5cclxuXHR2YXIgbjAgPTAsIG4xID0gMCwgbjIgPSAwLCBnaTsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXHJcblxyXG5cdC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cclxuXHR2YXIgcyA9ICh4aW4gKyB5aW4pICogdGhpcy5fRjI7IC8vIEhhaXJ5IGZhY3RvciBmb3IgMkRcclxuXHR2YXIgaSA9IE1hdGguZmxvb3IoeGluICsgcyk7XHJcblx0dmFyIGogPSBNYXRoLmZsb29yKHlpbiArIHMpO1xyXG5cdHZhciB0ID0gKGkgKyBqKSAqIEcyO1xyXG5cdHZhciBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSkgc3BhY2VcclxuXHR2YXIgWTAgPSBqIC0gdDtcclxuXHR2YXIgeDAgPSB4aW4gLSBYMDsgLy8gVGhlIHgseSBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cclxuXHR2YXIgeTAgPSB5aW4gLSBZMDtcclxuXHJcblx0Ly8gRm9yIHRoZSAyRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhbiBlcXVpbGF0ZXJhbCB0cmlhbmdsZS5cclxuXHQvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXHJcblx0dmFyIGkxLCBqMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIChtaWRkbGUpIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGopIGNvb3Jkc1xyXG5cdGlmICh4MCA+IHkwKSB7XHJcblx0XHRpMSA9IDE7XHJcblx0XHRqMSA9IDA7XHJcblx0fSBlbHNlIHsgLy8gbG93ZXIgdHJpYW5nbGUsIFhZIG9yZGVyOiAoMCwwKS0+KDEsMCktPigxLDEpXHJcblx0XHRpMSA9IDA7XHJcblx0XHRqMSA9IDE7XHJcblx0fSAvLyB1cHBlciB0cmlhbmdsZSwgWVggb3JkZXI6ICgwLDApLT4oMCwxKS0+KDEsMSlcclxuXHJcblx0Ly8gQSBzdGVwIG9mICgxLDApIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoMS1jLC1jKSBpbiAoeCx5KSwgYW5kXHJcblx0Ly8gYSBzdGVwIG9mICgwLDEpIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jKSBpbiAoeCx5KSwgd2hlcmVcclxuXHQvLyBjID0gKDMtc3FydCgzKSkvNlxyXG5cdHZhciB4MSA9IHgwIC0gaTEgKyBHMjsgLy8gT2Zmc2V0cyBmb3IgbWlkZGxlIGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcclxuXHR2YXIgeTEgPSB5MCAtIGoxICsgRzI7XHJcblx0dmFyIHgyID0geDAgLSAxICsgMipHMjsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXHJcblx0dmFyIHkyID0geTAgLSAxICsgMipHMjtcclxuXHJcblx0Ly8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSB0aHJlZSBzaW1wbGV4IGNvcm5lcnNcclxuXHR2YXIgaWkgPSBpLm1vZChjb3VudCk7XHJcblx0dmFyIGpqID0gai5tb2QoY291bnQpO1xyXG5cclxuXHQvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXHJcblx0dmFyIHQwID0gMC41IC0geDAqeDAgLSB5MCp5MDtcclxuXHRpZiAodDAgPj0gMCkge1xyXG5cdFx0dDAgKj0gdDA7XHJcblx0XHRnaSA9IGluZGV4ZXNbaWkrcGVybXNbampdXTtcclxuXHRcdHZhciBncmFkID0gdGhpcy5fZ3JhZGllbnRzW2dpXTtcclxuXHRcdG4wID0gdDAgKiB0MCAqIChncmFkWzBdICogeDAgKyBncmFkWzFdICogeTApO1xyXG5cdH1cclxuXHRcclxuXHR2YXIgdDEgPSAwLjUgLSB4MSp4MSAtIHkxKnkxO1xyXG5cdGlmICh0MSA+PSAwKSB7XHJcblx0XHR0MSAqPSB0MTtcclxuXHRcdGdpID0gaW5kZXhlc1tpaStpMStwZXJtc1tqaitqMV1dO1xyXG5cdFx0dmFyIGdyYWQgPSB0aGlzLl9ncmFkaWVudHNbZ2ldO1xyXG5cdFx0bjEgPSB0MSAqIHQxICogKGdyYWRbMF0gKiB4MSArIGdyYWRbMV0gKiB5MSk7XHJcblx0fVxyXG5cdFxyXG5cdHZhciB0MiA9IDAuNSAtIHgyKngyIC0geTIqeTI7XHJcblx0aWYgKHQyID49IDApIHtcclxuXHRcdHQyICo9IHQyO1xyXG5cdFx0Z2kgPSBpbmRleGVzW2lpKzErcGVybXNbamorMV1dO1xyXG5cdFx0dmFyIGdyYWQgPSB0aGlzLl9ncmFkaWVudHNbZ2ldO1xyXG5cdFx0bjIgPSB0MiAqIHQyICogKGdyYWRbMF0gKiB4MiArIGdyYWRbMV0gKiB5Mik7XHJcblx0fVxyXG5cclxuXHQvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXHJcblx0Ly8gVGhlIHJlc3VsdCBpcyBzY2FsZWQgdG8gcmV0dXJuIHZhbHVlcyBpbiB0aGUgaW50ZXJ2YWwgWy0xLDFdLlxyXG5cdHJldHVybiA3MCAqIChuMCArIG4xICsgbjIpO1xyXG59XHJcbi8qKlxyXG4gKiBAY2xhc3MgQWJzdHJhY3QgRk9WIGFsZ29yaXRobVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaWdodFBhc3Nlc0NhbGxiYWNrIERvZXMgdGhlIGxpZ2h0IHBhc3MgdGhyb3VnaCB4LHk/XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5PThdIDQvNi84XHJcbiAqL1xyXG5ST1QuRk9WID0gZnVuY3Rpb24obGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucykge1xyXG5cdHRoaXMuX2xpZ2h0UGFzc2VzID0gbGlnaHRQYXNzZXNDYWxsYmFjaztcclxuXHR0aGlzLl9vcHRpb25zID0ge1xyXG5cdFx0dG9wb2xvZ3k6IDhcclxuXHR9O1xyXG5cdGZvciAodmFyIHAgaW4gb3B0aW9ucykgeyB0aGlzLl9vcHRpb25zW3BdID0gb3B0aW9uc1twXTsgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSAzNjAtZGVncmVlIGNpcmNsZVxyXG4gKiBAcGFyYW0ge2ludH0geFxyXG4gKiBAcGFyYW0ge2ludH0geVxyXG4gKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5ST1QuRk9WLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24oeCwgeSwgUiwgY2FsbGJhY2spIHt9O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhbGwgbmVpZ2hib3JzIGluIGEgY29uY2VudHJpYyByaW5nXHJcbiAqIEBwYXJhbSB7aW50fSBjeCBjZW50ZXIteFxyXG4gKiBAcGFyYW0ge2ludH0gY3kgY2VudGVyLXlcclxuICogQHBhcmFtIHtpbnR9IHIgcmFuZ2VcclxuICovXHJcblJPVC5GT1YucHJvdG90eXBlLl9nZXRDaXJjbGUgPSBmdW5jdGlvbihjeCwgY3ksIHIpIHtcclxuXHR2YXIgcmVzdWx0ID0gW107XHJcblx0dmFyIGRpcnMsIGNvdW50RmFjdG9yLCBzdGFydE9mZnNldDtcclxuXHJcblx0c3dpdGNoICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5KSB7XHJcblx0XHRjYXNlIDQ6XHJcblx0XHRcdGNvdW50RmFjdG9yID0gMTtcclxuXHRcdFx0c3RhcnRPZmZzZXQgPSBbMCwgMV07XHJcblx0XHRcdGRpcnMgPSBbXHJcblx0XHRcdFx0Uk9ULkRJUlNbOF1bN10sXHJcblx0XHRcdFx0Uk9ULkRJUlNbOF1bMV0sXHJcblx0XHRcdFx0Uk9ULkRJUlNbOF1bM10sXHJcblx0XHRcdFx0Uk9ULkRJUlNbOF1bNV1cclxuXHRcdFx0XTtcclxuXHRcdGJyZWFrO1xyXG5cclxuXHRcdGNhc2UgNjpcclxuXHRcdFx0ZGlycyA9IFJPVC5ESVJTWzZdO1xyXG5cdFx0XHRjb3VudEZhY3RvciA9IDE7XHJcblx0XHRcdHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcclxuXHRcdGJyZWFrO1xyXG5cclxuXHRcdGNhc2UgODpcclxuXHRcdFx0ZGlycyA9IFJPVC5ESVJTWzRdO1xyXG5cdFx0XHRjb3VudEZhY3RvciA9IDI7XHJcblx0XHRcdHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcclxuXHRcdGJyZWFrO1xyXG5cdH1cclxuXHJcblx0Lyogc3RhcnRpbmcgbmVpZ2hib3IgKi9cclxuXHR2YXIgeCA9IGN4ICsgc3RhcnRPZmZzZXRbMF0qcjtcclxuXHR2YXIgeSA9IGN5ICsgc3RhcnRPZmZzZXRbMV0qcjtcclxuXHJcblx0LyogY2lyY2xlICovXHJcblx0Zm9yICh2YXIgaT0wO2k8ZGlycy5sZW5ndGg7aSsrKSB7XHJcblx0XHRmb3IgKHZhciBqPTA7ajxyKmNvdW50RmFjdG9yO2orKykge1xyXG5cdFx0XHRyZXN1bHQucHVzaChbeCwgeV0pO1xyXG5cdFx0XHR4ICs9IGRpcnNbaV1bMF07XHJcblx0XHRcdHkgKz0gZGlyc1tpXVsxXTtcclxuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG4vKipcclxuICogQGNsYXNzIERpc2NyZXRlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtLiBPYnNvbGV0ZWQgYnkgUHJlY2lzZSBzaGFkb3djYXN0aW5nLlxyXG4gKiBAYXVnbWVudHMgUk9ULkZPVlxyXG4gKi9cclxuUk9ULkZPVi5EaXNjcmV0ZVNoYWRvd2Nhc3RpbmcgPSBmdW5jdGlvbihsaWdodFBhc3Nlc0NhbGxiYWNrLCBvcHRpb25zKSB7XHJcblx0Uk9ULkZPVi5jYWxsKHRoaXMsIGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMpO1xyXG59O1xyXG5ST1QuRk9WLkRpc2NyZXRlU2hhZG93Y2FzdGluZy5leHRlbmQoUk9ULkZPVik7XHJcblxyXG4vKipcclxuICogQHNlZSBST1QuRk9WI2NvbXB1dGVcclxuICovXHJcblJPVC5GT1YuRGlzY3JldGVTaGFkb3djYXN0aW5nLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24oeCwgeSwgUiwgY2FsbGJhY2spIHtcclxuXHR2YXIgY2VudGVyID0gdGhpcy5fY29vcmRzO1xyXG5cdHZhciBtYXAgPSB0aGlzLl9tYXA7XHJcblxyXG5cdC8qIHRoaXMgcGxhY2UgaXMgYWx3YXlzIHZpc2libGUgKi9cclxuXHRjYWxsYmFjayh4LCB5LCAwLCAxKTtcclxuXHJcblx0Lyogc3RhbmRpbmcgaW4gYSBkYXJrIHBsYWNlLiBGSVhNRSBpcyB0aGlzIGEgZ29vZCBpZGVhPyAgKi9cclxuXHRpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKHgsIHkpKSB7IHJldHVybjsgfVxyXG5cdFxyXG5cdC8qIHN0YXJ0IGFuZCBlbmQgYW5nbGVzICovXHJcblx0dmFyIERBVEEgPSBbXTtcclxuXHRcclxuXHR2YXIgQSwgQiwgY3gsIGN5LCBibG9ja3M7XHJcblxyXG5cdC8qIGFuYWx5emUgc3Vycm91bmRpbmcgY2VsbHMgaW4gY29uY2VudHJpYyByaW5ncywgc3RhcnRpbmcgZnJvbSB0aGUgY2VudGVyICovXHJcblx0Zm9yICh2YXIgcj0xOyByPD1SOyByKyspIHtcclxuXHRcdHZhciBuZWlnaGJvcnMgPSB0aGlzLl9nZXRDaXJjbGUoeCwgeSwgcik7XHJcblx0XHR2YXIgYW5nbGUgPSAzNjAgLyBuZWlnaGJvcnMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAodmFyIGk9MDtpPG5laWdoYm9ycy5sZW5ndGg7aSsrKSB7XHJcblx0XHRcdGN4ID0gbmVpZ2hib3JzW2ldWzBdO1xyXG5cdFx0XHRjeSA9IG5laWdoYm9yc1tpXVsxXTtcclxuXHRcdFx0QSA9IGFuZ2xlICogKGkgLSAwLjUpO1xyXG5cdFx0XHRCID0gQSArIGFuZ2xlO1xyXG5cdFx0XHRcclxuXHRcdFx0YmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XHJcblx0XHRcdGlmICh0aGlzLl92aXNpYmxlQ29vcmRzKE1hdGguZmxvb3IoQSksIE1hdGguY2VpbChCKSwgYmxvY2tzLCBEQVRBKSkgeyBjYWxsYmFjayhjeCwgY3ksIHIsIDEpOyB9XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoREFUQS5sZW5ndGggPT0gMiAmJiBEQVRBWzBdID09IDAgJiYgREFUQVsxXSA9PSAzNjApIHsgcmV0dXJuOyB9IC8qIGN1dG9mZj8gKi9cclxuXHJcblx0XHR9IC8qIGZvciBhbGwgY2VsbHMgaW4gdGhpcyByaW5nICovXHJcblx0fSAvKiBmb3IgYWxsIHJpbmdzICovXHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtpbnR9IEEgc3RhcnQgYW5nbGVcclxuICogQHBhcmFtIHtpbnR9IEIgZW5kIGFuZ2xlXHJcbiAqIEBwYXJhbSB7Ym9vbH0gYmxvY2tzIERvZXMgY3VycmVudCBjZWxsIGJsb2NrIHZpc2liaWxpdHk/XHJcbiAqIEBwYXJhbSB7aW50W11bXX0gREFUQSBzaGFkb3dlZCBhbmdsZSBwYWlyc1xyXG4gKi9cclxuUk9ULkZPVi5EaXNjcmV0ZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLl92aXNpYmxlQ29vcmRzID0gZnVuY3Rpb24oQSwgQiwgYmxvY2tzLCBEQVRBKSB7XHJcblx0aWYgKEEgPCAwKSB7IFxyXG5cdFx0dmFyIHYxID0gYXJndW1lbnRzLmNhbGxlZSgwLCBCLCBibG9ja3MsIERBVEEpO1xyXG5cdFx0dmFyIHYyID0gYXJndW1lbnRzLmNhbGxlZSgzNjArQSwgMzYwLCBibG9ja3MsIERBVEEpO1xyXG5cdFx0cmV0dXJuIHYxIHx8IHYyO1xyXG5cdH1cclxuXHRcclxuXHR2YXIgaW5kZXggPSAwO1xyXG5cdHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQSkgeyBpbmRleCsrOyB9XHJcblx0XHJcblx0aWYgKGluZGV4ID09IERBVEEubGVuZ3RoKSB7IC8qIGNvbXBsZXRlbHkgbmV3IHNoYWRvdyAqL1xyXG5cdFx0aWYgKGJsb2NrcykgeyBEQVRBLnB1c2goQSwgQik7IH0gXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0XHJcblx0dmFyIGNvdW50ID0gMDtcclxuXHRcclxuXHRpZiAoaW5kZXggJSAyKSB7IC8qIHRoaXMgc2hhZG93IHN0YXJ0cyBpbiBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdpdGhpbiBpdHMgZW5kaW5nIGJvdW5kYXJ5ICovXHJcblx0XHR3aGlsZSAoaW5kZXggPCBEQVRBLmxlbmd0aCAmJiBEQVRBW2luZGV4XSA8IEIpIHtcclxuXHRcdFx0aW5kZXgrKztcclxuXHRcdFx0Y291bnQrKztcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKGNvdW50ID09IDApIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcclxuXHRcdGlmIChibG9ja3MpIHsgXHJcblx0XHRcdGlmIChjb3VudCAlIDIpIHtcclxuXHRcdFx0XHREQVRBLnNwbGljZShpbmRleC1jb3VudCwgY291bnQsIEIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdERBVEEuc3BsaWNlKGluZGV4LWNvdW50LCBjb3VudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdH0gZWxzZSB7IC8qIHRoaXMgc2hhZG93IHN0YXJ0cyBvdXRzaWRlIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2l0aGluIGEgc3RhcnRpbmcgYm91bmRhcnkgKi9cclxuXHRcdHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQikge1xyXG5cdFx0XHRpbmRleCsrO1xyXG5cdFx0XHRjb3VudCsrO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvKiB2aXNpYmxlIHdoZW4gb3V0c2lkZSBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdoZW4gb3ZlcmxhcHBpbmcgKi9cclxuXHRcdGlmIChBID09IERBVEFbaW5kZXgtY291bnRdICYmIGNvdW50ID09IDEpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcclxuXHRcdGlmIChibG9ja3MpIHsgXHJcblx0XHRcdGlmIChjb3VudCAlIDIpIHtcclxuXHRcdFx0XHREQVRBLnNwbGljZShpbmRleC1jb3VudCwgY291bnQsIEEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdERBVEEuc3BsaWNlKGluZGV4LWNvdW50LCBjb3VudCwgQSwgQik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgUHJlY2lzZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobVxyXG4gKiBAYXVnbWVudHMgUk9ULkZPVlxyXG4gKi9cclxuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyA9IGZ1bmN0aW9uKGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMpIHtcclxuXHRST1QuRk9WLmNhbGwodGhpcywgbGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucyk7XHJcbn07XHJcblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcuZXh0ZW5kKFJPVC5GT1YpO1xyXG5cclxuLyoqXHJcbiAqIEBzZWUgUk9ULkZPViNjb21wdXRlXHJcbiAqL1xyXG5ST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24oeCwgeSwgUiwgY2FsbGJhY2spIHtcclxuXHQvKiB0aGlzIHBsYWNlIGlzIGFsd2F5cyB2aXNpYmxlICovXHJcblx0Y2FsbGJhY2soeCwgeSwgMCwgMSk7XHJcblxyXG5cdC8qIHN0YW5kaW5nIGluIGEgZGFyayBwbGFjZS4gRklYTUUgaXMgdGhpcyBhIGdvb2QgaWRlYT8gICovXHJcblx0aWYgKCF0aGlzLl9saWdodFBhc3Nlcyh4LCB5KSkgeyByZXR1cm47IH1cclxuXHRcclxuXHQvKiBsaXN0IG9mIGFsbCBzaGFkb3dzICovXHJcblx0dmFyIFNIQURPV1MgPSBbXTtcclxuXHRcclxuXHR2YXIgY3gsIGN5LCBibG9ja3MsIEExLCBBMiwgdmlzaWJpbGl0eTtcclxuXHJcblx0LyogYW5hbHl6ZSBzdXJyb3VuZGluZyBjZWxscyBpbiBjb25jZW50cmljIHJpbmdzLCBzdGFydGluZyBmcm9tIHRoZSBjZW50ZXIgKi9cclxuXHRmb3IgKHZhciByPTE7IHI8PVI7IHIrKykge1xyXG5cdFx0dmFyIG5laWdoYm9ycyA9IHRoaXMuX2dldENpcmNsZSh4LCB5LCByKTtcclxuXHRcdHZhciBuZWlnaGJvckNvdW50ID0gbmVpZ2hib3JzLmxlbmd0aDtcclxuXHJcblx0XHRmb3IgKHZhciBpPTA7aTxuZWlnaGJvckNvdW50O2krKykge1xyXG5cdFx0XHRjeCA9IG5laWdoYm9yc1tpXVswXTtcclxuXHRcdFx0Y3kgPSBuZWlnaGJvcnNbaV1bMV07XHJcblx0XHRcdC8qIHNoaWZ0IGhhbGYtYW4tYW5nbGUgYmFja3dhcmRzIHRvIG1haW50YWluIGNvbnNpc3RlbmN5IG9mIDAtdGggY2VsbHMgKi9cclxuXHRcdFx0QTEgPSBbaSA/IDIqaS0xIDogMipuZWlnaGJvckNvdW50LTEsIDIqbmVpZ2hib3JDb3VudF07XHJcblx0XHRcdEEyID0gWzIqaSsxLCAyKm5laWdoYm9yQ291bnRdOyBcclxuXHRcdFx0XHJcblx0XHRcdGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xyXG5cdFx0XHR2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcclxuXHRcdFx0aWYgKHZpc2liaWxpdHkpIHsgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTsgfVxyXG5cclxuXHRcdFx0aWYgKFNIQURPV1MubGVuZ3RoID09IDIgJiYgU0hBRE9XU1swXVswXSA9PSAwICYmIFNIQURPV1NbMV1bMF0gPT0gU0hBRE9XU1sxXVsxXSkgeyByZXR1cm47IH0gLyogY3V0b2ZmPyAqL1xyXG5cclxuXHRcdH0gLyogZm9yIGFsbCBjZWxscyBpbiB0aGlzIHJpbmcgKi9cclxuXHR9IC8qIGZvciBhbGwgcmluZ3MgKi9cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge2ludFsyXX0gQTEgYXJjIHN0YXJ0XHJcbiAqIEBwYXJhbSB7aW50WzJdfSBBMiBhcmMgZW5kXHJcbiAqIEBwYXJhbSB7Ym9vbH0gYmxvY2tzIERvZXMgY3VycmVudCBhcmMgYmxvY2sgdmlzaWJpbGl0eT9cclxuICogQHBhcmFtIHtpbnRbXVtdfSBTSEFET1dTIGxpc3Qgb2YgYWN0aXZlIHNoYWRvd3NcclxuICovXHJcblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLl9jaGVja1Zpc2liaWxpdHkgPSBmdW5jdGlvbihBMSwgQTIsIGJsb2NrcywgU0hBRE9XUykge1xyXG5cdGlmIChBMVswXSA+IEEyWzBdKSB7IC8qIHNwbGl0IGludG8gdHdvIHN1Yi1hcmNzICovXHJcblx0XHR2YXIgdjEgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoQTEsIFtBMVsxXSwgQTFbMV1dLCBibG9ja3MsIFNIQURPV1MpO1xyXG5cdFx0dmFyIHYyID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KFswLCAxXSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XHJcblx0XHRyZXR1cm4gKHYxK3YyKS8yO1xyXG5cdH1cclxuXHJcblx0LyogaW5kZXgxOiBmaXJzdCBzaGFkb3cgPj0gQTEgKi9cclxuXHR2YXIgaW5kZXgxID0gMCwgZWRnZTEgPSBmYWxzZTtcclxuXHR3aGlsZSAoaW5kZXgxIDwgU0hBRE9XUy5sZW5ndGgpIHtcclxuXHRcdHZhciBvbGQgPSBTSEFET1dTW2luZGV4MV07XHJcblx0XHR2YXIgZGlmZiA9IG9sZFswXSpBMVsxXSAtIEExWzBdKm9sZFsxXTtcclxuXHRcdGlmIChkaWZmID49IDApIHsgLyogb2xkID49IEExICovXHJcblx0XHRcdGlmIChkaWZmID09IDAgJiYgIShpbmRleDEgJSAyKSkgeyBlZGdlMSA9IHRydWU7IH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRpbmRleDErKztcclxuXHR9XHJcblxyXG5cdC8qIGluZGV4MjogbGFzdCBzaGFkb3cgPD0gQTIgKi9cclxuXHR2YXIgaW5kZXgyID0gU0hBRE9XUy5sZW5ndGgsIGVkZ2UyID0gZmFsc2U7XHJcblx0d2hpbGUgKGluZGV4Mi0tKSB7XHJcblx0XHR2YXIgb2xkID0gU0hBRE9XU1tpbmRleDJdO1xyXG5cdFx0dmFyIGRpZmYgPSBBMlswXSpvbGRbMV0gLSBvbGRbMF0qQTJbMV07XHJcblx0XHRpZiAoZGlmZiA+PSAwKSB7IC8qIG9sZCA8PSBBMiAqL1xyXG5cdFx0XHRpZiAoZGlmZiA9PSAwICYmIChpbmRleDIgJSAyKSkgeyBlZGdlMiA9IHRydWU7IH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgdmlzaWJsZSA9IHRydWU7XHJcblx0aWYgKGluZGV4MSA9PSBpbmRleDIgJiYgKGVkZ2UxIHx8IGVkZ2UyKSkgeyAgLyogc3Vic2V0IG9mIGV4aXN0aW5nIHNoYWRvdywgb25lIG9mIHRoZSBlZGdlcyBtYXRjaCAqL1xyXG5cdFx0dmlzaWJsZSA9IGZhbHNlOyBcclxuXHR9IGVsc2UgaWYgKGVkZ2UxICYmIGVkZ2UyICYmIGluZGV4MSsxPT1pbmRleDIgJiYgKGluZGV4MiAlIDIpKSB7IC8qIGNvbXBsZXRlbHkgZXF1aXZhbGVudCB3aXRoIGV4aXN0aW5nIHNoYWRvdyAqL1xyXG5cdFx0dmlzaWJsZSA9IGZhbHNlO1xyXG5cdH0gZWxzZSBpZiAoaW5kZXgxID4gaW5kZXgyICYmIChpbmRleDEgJSAyKSkgeyAvKiBzdWJzZXQgb2YgZXhpc3Rpbmcgc2hhZG93LCBub3QgdG91Y2hpbmcgKi9cclxuXHRcdHZpc2libGUgPSBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0aWYgKCF2aXNpYmxlKSB7IHJldHVybiAwOyB9IC8qIGZhc3QgY2FzZTogbm90IHZpc2libGUgKi9cclxuXHRcclxuXHR2YXIgdmlzaWJsZUxlbmd0aCwgUDtcclxuXHJcblx0LyogY29tcHV0ZSB0aGUgbGVuZ3RoIG9mIHZpc2libGUgYXJjLCBhZGp1c3QgbGlzdCBvZiBzaGFkb3dzIChpZiBibG9ja2luZykgKi9cclxuXHR2YXIgcmVtb3ZlID0gaW5kZXgyLWluZGV4MSsxO1xyXG5cdGlmIChyZW1vdmUgJSAyKSB7XHJcblx0XHRpZiAoaW5kZXgxICUgMikgeyAvKiBmaXJzdCBlZGdlIHdpdGhpbiBleGlzdGluZyBzaGFkb3csIHNlY29uZCBvdXRzaWRlICovXHJcblx0XHRcdHZhciBQID0gU0hBRE9XU1tpbmRleDFdO1xyXG5cdFx0XHR2aXNpYmxlTGVuZ3RoID0gKEEyWzBdKlBbMV0gLSBQWzBdKkEyWzFdKSAvIChQWzFdICogQTJbMV0pO1xyXG5cdFx0XHRpZiAoYmxvY2tzKSB7IFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlLCBBMik7IH1cclxuXHRcdH0gZWxzZSB7IC8qIHNlY29uZCBlZGdlIHdpdGhpbiBleGlzdGluZyBzaGFkb3csIGZpcnN0IG91dHNpZGUgKi9cclxuXHRcdFx0dmFyIFAgPSBTSEFET1dTW2luZGV4Ml07XHJcblx0XHRcdHZpc2libGVMZW5ndGggPSAoUFswXSpBMVsxXSAtIEExWzBdKlBbMV0pIC8gKEExWzFdICogUFsxXSk7XHJcblx0XHRcdGlmIChibG9ja3MpIHsgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUsIEExKTsgfVxyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRpZiAoaW5kZXgxICUgMikgeyAvKiBib3RoIGVkZ2VzIHdpdGhpbiBleGlzdGluZyBzaGFkb3dzICovXHJcblx0XHRcdHZhciBQMSA9IFNIQURPV1NbaW5kZXgxXTtcclxuXHRcdFx0dmFyIFAyID0gU0hBRE9XU1tpbmRleDJdO1xyXG5cdFx0XHR2aXNpYmxlTGVuZ3RoID0gKFAyWzBdKlAxWzFdIC0gUDFbMF0qUDJbMV0pIC8gKFAxWzFdICogUDJbMV0pO1xyXG5cdFx0XHRpZiAoYmxvY2tzKSB7IFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlKTsgfVxyXG5cdFx0fSBlbHNlIHsgLyogYm90aCBlZGdlcyBvdXRzaWRlIGV4aXN0aW5nIHNoYWRvd3MgKi9cclxuXHRcdFx0aWYgKGJsb2NrcykgeyBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTEsIEEyKTsgfVxyXG5cdFx0XHRyZXR1cm4gMTsgLyogd2hvbGUgYXJjIHZpc2libGUhICovXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgYXJjTGVuZ3RoID0gKEEyWzBdKkExWzFdIC0gQTFbMF0qQTJbMV0pIC8gKEExWzFdICogQTJbMV0pO1xyXG5cclxuXHRyZXR1cm4gdmlzaWJsZUxlbmd0aC9hcmNMZW5ndGg7XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgUmVjdXJzaXZlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtXHJcbiAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIDQvOCB0b3BvbG9naWVzLCBub3QgaGV4YWdvbmFsLlxyXG4gKiBCYXNlZCBvbiBQZXRlciBIYXJraW5zJyBpbXBsZW1lbnRhdGlvbiBvZiBCasO2cm4gQmVyZ3N0csO2bSdzIGFsZ29yaXRobSBkZXNjcmliZWQgaGVyZTogaHR0cDovL3d3dy5yb2d1ZWJhc2luLmNvbS9pbmRleC5waHA/dGl0bGU9Rk9WX3VzaW5nX3JlY3Vyc2l2ZV9zaGFkb3djYXN0aW5nXHJcbiAqIEBhdWdtZW50cyBST1QuRk9WXHJcbiAqL1xyXG5ST1QuRk9WLlJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcgPSBmdW5jdGlvbihsaWdodFBhc3Nlc0NhbGxiYWNrLCBvcHRpb25zKSB7XHJcblx0Uk9ULkZPVi5jYWxsKHRoaXMsIGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMpO1xyXG59O1xyXG5ST1QuRk9WLlJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcuZXh0ZW5kKFJPVC5GT1YpO1xyXG5cclxuLyoqIE9jdGFudHMgdXNlZCBmb3IgdHJhbnNsYXRpbmcgcmVjdXJzaXZlIHNoYWRvd2Nhc3Rpbmcgb2Zmc2V0cyAqL1xyXG5ST1QuRk9WLlJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcuT0NUQU5UUyA9IFtcclxuXHRbLTEsICAwLCAgMCwgIDFdLFxyXG5cdFsgMCwgLTEsICAxLCAgMF0sXHJcblx0WyAwLCAtMSwgLTEsICAwXSxcclxuXHRbLTEsICAwLCAgMCwgLTFdLFxyXG5cdFsgMSwgIDAsICAwLCAtMV0sXHJcblx0WyAwLCAgMSwgLTEsICAwXSxcclxuXHRbIDAsICAxLCAgMSwgIDBdLFxyXG5cdFsgMSwgIDAsICAwLCAgMV1cclxuXTtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgMzYwLWRlZ3JlZSBjaXJjbGVcclxuICogQHBhcmFtIHtpbnR9IHhcclxuICogQHBhcmFtIHtpbnR9IHlcclxuICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuUk9ULkZPVi5SZWN1cnNpdmVTaGFkb3djYXN0aW5nLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24oeCwgeSwgUiwgY2FsbGJhY2spIHtcclxuXHQvL1lvdSBjYW4gYWx3YXlzIHNlZSB5b3VyIG93biB0aWxlXHJcblx0Y2FsbGJhY2soeCwgeSwgMCwgMSk7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IFJPVC5GT1YuUmVjdXJzaXZlU2hhZG93Y2FzdGluZy5PQ1RBTlRTLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgUk9ULkZPVi5SZWN1cnNpdmVTaGFkb3djYXN0aW5nLk9DVEFOVFNbaV0sIFIsIGNhbGxiYWNrKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDE4MC1kZWdyZWUgYXJjXHJcbiAqIEBwYXJhbSB7aW50fSB4XHJcbiAqIEBwYXJhbSB7aW50fSB5XHJcbiAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcclxuICogQHBhcmFtIHtpbnR9IGRpciBEaXJlY3Rpb24gdG8gbG9vayBpbiAoZXhwcmVzc2VkIGluIGEgUk9ULkRJUlMgdmFsdWUpO1xyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuUk9ULkZPVi5SZWN1cnNpdmVTaGFkb3djYXN0aW5nLnByb3RvdHlwZS5jb21wdXRlMTgwID0gZnVuY3Rpb24oeCwgeSwgUiwgZGlyLCBjYWxsYmFjaykge1xyXG5cdC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcclxuXHRjYWxsYmFjayh4LCB5LCAwLCAxKTtcclxuXHR2YXIgcHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMSArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCAxODAgZGVncmVlc1xyXG5cdHZhciBuZXh0UHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMiArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyB0d28gb2N0YW50cyB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXHJcblx0dmFyIG5leHRPY3RhbnQgPSAoZGlyKyAxICsgOCkgJSA4OyAvL05lZWQgdG8gZ3JhYiB0byBuZXh0IG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXHJcblx0dGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIFJPVC5GT1YuUmVjdXJzaXZlU2hhZG93Y2FzdGluZy5PQ1RBTlRTW25leHRQcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcclxuXHR0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgUk9ULkZPVi5SZWN1cnNpdmVTaGFkb3djYXN0aW5nLk9DVEFOVFNbcHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XHJcblx0dGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIFJPVC5GT1YuUmVjdXJzaXZlU2hhZG93Y2FzdGluZy5PQ1RBTlRTW2Rpcl0sIFIsIGNhbGxiYWNrKTtcclxuXHR0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgUk9ULkZPVi5SZWN1cnNpdmVTaGFkb3djYXN0aW5nLk9DVEFOVFNbbmV4dE9jdGFudF0sIFIsIGNhbGxiYWNrKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgOTAtZGVncmVlIGFyY1xyXG4gKiBAcGFyYW0ge2ludH0geFxyXG4gKiBAcGFyYW0ge2ludH0geVxyXG4gKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXHJcbiAqIEBwYXJhbSB7aW50fSBkaXIgRGlyZWN0aW9uIHRvIGxvb2sgaW4gKGV4cHJlc3NlZCBpbiBhIFJPVC5ESVJTIHZhbHVlKTtcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcblJPVC5GT1YuUmVjdXJzaXZlU2hhZG93Y2FzdGluZy5wcm90b3R5cGUuY29tcHV0ZTkwID0gZnVuY3Rpb24oeCwgeSwgUiwgZGlyLCBjYWxsYmFjaykge1xyXG5cdC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcclxuXHRjYWxsYmFjayh4LCB5LCAwLCAxKTtcclxuXHR2YXIgcHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMSArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCA5MCBkZWdyZWVzXHJcblx0dGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIFJPVC5GT1YuUmVjdXJzaXZlU2hhZG93Y2FzdGluZy5PQ1RBTlRTW2Rpcl0sIFIsIGNhbGxiYWNrKTtcclxuXHR0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgUk9ULkZPVi5SZWN1cnNpdmVTaGFkb3djYXN0aW5nLk9DVEFOVFNbcHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVuZGVyIG9uZSBvY3RhbnQgKDQ1LWRlZ3JlZSBhcmMpIG9mIHRoZSB2aWV3c2hlZFxyXG4gKiBAcGFyYW0ge2ludH0geFxyXG4gKiBAcGFyYW0ge2ludH0geVxyXG4gKiBAcGFyYW0ge2ludH0gb2N0YW50IE9jdGFudCB0byBiZSByZW5kZXJlZFxyXG4gKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5ST1QuRk9WLlJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLl9yZW5kZXJPY3RhbnQgPSBmdW5jdGlvbih4LCB5LCBvY3RhbnQsIFIsIGNhbGxiYWNrKSB7XHJcblx0Ly9SYWRpdXMgaW5jcmVtZW50ZWQgYnkgMSB0byBwcm92aWRlIHNhbWUgY292ZXJhZ2UgYXJlYSBhcyBvdGhlciBzaGFkb3djYXN0aW5nIHJhZGl1c2VzXHJcblx0dGhpcy5fY2FzdFZpc2liaWxpdHkoeCwgeSwgMSwgMS4wLCAwLjAsIFIgKyAxLCBvY3RhbnRbMF0sIG9jdGFudFsxXSwgb2N0YW50WzJdLCBvY3RhbnRbM10sIGNhbGxiYWNrKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBY3R1YWxseSBjYWxjdWxhdGVzIHRoZSB2aXNpYmlsaXR5XHJcbiAqIEBwYXJhbSB7aW50fSBzdGFydFggVGhlIHN0YXJ0aW5nIFggY29vcmRpbmF0ZVxyXG4gKiBAcGFyYW0ge2ludH0gc3RhcnRZIFRoZSBzdGFydGluZyBZIGNvb3JkaW5hdGVcclxuICogQHBhcmFtIHtpbnR9IHJvdyBUaGUgcm93IHRvIHJlbmRlclxyXG4gKiBAcGFyYW0ge2Zsb2F0fSB2aXNTbG9wZVN0YXJ0IFRoZSBzbG9wZSB0byBzdGFydCBhdFxyXG4gKiBAcGFyYW0ge2Zsb2F0fSB2aXNTbG9wZUVuZCBUaGUgc2xvcGUgdG8gZW5kIGF0XHJcbiAqIEBwYXJhbSB7aW50fSByYWRpdXMgVGhlIHJhZGl1cyB0byByZWFjaCBvdXQgdG9cclxuICogQHBhcmFtIHtpbnR9IHh4IFxyXG4gKiBAcGFyYW0ge2ludH0geHkgXHJcbiAqIEBwYXJhbSB7aW50fSB5eCBcclxuICogQHBhcmFtIHtpbnR9IHl5IFxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gdXNlIHdoZW4gd2UgaGl0IGEgYmxvY2sgdGhhdCBpcyB2aXNpYmxlXHJcbiAqL1xyXG5ST1QuRk9WLlJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLl9jYXN0VmlzaWJpbGl0eSA9IGZ1bmN0aW9uKHN0YXJ0WCwgc3RhcnRZLCByb3csIHZpc1Nsb3BlU3RhcnQsIHZpc1Nsb3BlRW5kLCByYWRpdXMsIHh4LCB4eSwgeXgsIHl5LCBjYWxsYmFjaykge1xyXG5cdGlmKHZpc1Nsb3BlU3RhcnQgPCB2aXNTbG9wZUVuZCkgeyByZXR1cm47IH1cclxuXHRmb3IodmFyIGkgPSByb3c7IGkgPD0gcmFkaXVzOyBpKyspIHtcclxuXHRcdHZhciBkeCA9IC1pIC0gMTtcclxuXHRcdHZhciBkeSA9IC1pO1xyXG5cdFx0dmFyIGJsb2NrZWQgPSBmYWxzZTtcclxuXHRcdHZhciBuZXdTdGFydCA9IDA7XHJcblxyXG5cdFx0Ly8nUm93JyBjb3VsZCBiZSBjb2x1bW4sIG5hbWVzIGhlcmUgYXNzdW1lIG9jdGFudCAwIGFuZCB3b3VsZCBiZSBmbGlwcGVkIGZvciBoYWxmIHRoZSBvY3RhbnRzXHJcblx0XHR3aGlsZShkeCA8PSAwKSB7XHJcblx0XHRcdGR4ICs9IDE7XHJcblxyXG5cdFx0XHQvL1RyYW5zbGF0ZSBmcm9tIHJlbGF0aXZlIGNvb3JkaW5hdGVzIHRvIG1hcCBjb29yZGluYXRlc1xyXG5cdFx0XHR2YXIgbWFwWCA9IHN0YXJ0WCArIGR4ICogeHggKyBkeSAqIHh5O1xyXG5cdFx0XHR2YXIgbWFwWSA9IHN0YXJ0WSArIGR4ICogeXggKyBkeSAqIHl5O1xyXG5cclxuXHRcdFx0Ly9SYW5nZSBvZiB0aGUgcm93XHJcblx0XHRcdHZhciBzbG9wZVN0YXJ0ID0gKGR4IC0gMC41KSAvIChkeSArIDAuNSk7XHJcblx0XHRcdHZhciBzbG9wZUVuZCA9IChkeCArIDAuNSkgLyAoZHkgLSAwLjUpO1xyXG5cdFx0XHJcblx0XHRcdC8vSWdub3JlIGlmIG5vdCB5ZXQgYXQgbGVmdCBlZGdlIG9mIE9jdGFudFxyXG5cdFx0XHRpZihzbG9wZUVuZCA+IHZpc1Nsb3BlU3RhcnQpIHsgY29udGludWU7IH1cclxuXHRcdFx0XHJcblx0XHRcdC8vRG9uZSBpZiBwYXN0IHJpZ2h0IGVkZ2VcclxuXHRcdFx0aWYoc2xvcGVTdGFydCA8IHZpc1Nsb3BlRW5kKSB7IGJyZWFrOyB9XHJcblx0XHRcdFx0XHJcblx0XHRcdC8vSWYgaXQncyBpbiByYW5nZSwgaXQncyB2aXNpYmxlXHJcblx0XHRcdGlmKChkeCAqIGR4ICsgZHkgKiBkeSkgPCAocmFkaXVzICogcmFkaXVzKSkge1xyXG5cdFx0XHRcdGNhbGxiYWNrKG1hcFgsIG1hcFksIGksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHJcblx0XHRcdGlmKCFibG9ja2VkKSB7XHJcblx0XHRcdFx0Ly9JZiB0aWxlIGlzIGEgYmxvY2tpbmcgdGlsZSwgY2FzdCBhcm91bmQgaXRcclxuXHRcdFx0XHRpZighdGhpcy5fbGlnaHRQYXNzZXMobWFwWCwgbWFwWSkgJiYgaSA8IHJhZGl1cykge1xyXG5cdFx0XHRcdFx0YmxvY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLl9jYXN0VmlzaWJpbGl0eShzdGFydFgsIHN0YXJ0WSwgaSArIDEsIHZpc1Nsb3BlU3RhcnQsIHNsb3BlU3RhcnQsIHJhZGl1cywgeHgsIHh5LCB5eCwgeXksIGNhbGxiYWNrKTtcclxuXHRcdFx0XHRcdG5ld1N0YXJ0ID0gc2xvcGVFbmQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vS2VlcCBuYXJyb3dpbmcgaWYgc2Nhbm5pbmcgYWNyb3NzIGEgYmxvY2tcclxuXHRcdFx0XHRpZighdGhpcy5fbGlnaHRQYXNzZXMobWFwWCwgbWFwWSkpIHtcclxuXHRcdFx0XHRcdG5ld1N0YXJ0ID0gc2xvcGVFbmQ7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRcdC8vQmxvY2sgaGFzIGVuZGVkXHJcblx0XHRcdFx0YmxvY2tlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdHZpc1Nsb3BlU3RhcnQgPSBuZXdTdGFydDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYoYmxvY2tlZCkgeyBicmVhazsgfVxyXG5cdH1cclxufTtcclxuLyoqXHJcbiAqIEBuYW1lc3BhY2UgQ29sb3Igb3BlcmF0aW9uc1xyXG4gKi9cclxuUk9ULkNvbG9yID0ge1xyXG5cdGZyb21TdHJpbmc6IGZ1bmN0aW9uKHN0cikge1xyXG5cdFx0dmFyIGNhY2hlZCwgcjtcclxuXHRcdGlmIChzdHIgaW4gdGhpcy5fY2FjaGUpIHtcclxuXHRcdFx0Y2FjaGVkID0gdGhpcy5fY2FjaGVbc3RyXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChzdHIuY2hhckF0KDApID09IFwiI1wiKSB7IC8qIGhleCByZ2IgKi9cclxuXHJcblx0XHRcdFx0dmFyIHZhbHVlcyA9IHN0ci5tYXRjaCgvWzAtOWEtZl0vZ2kpLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiBwYXJzZUludCh4LCAxNik7IH0pO1xyXG5cdFx0XHRcdGlmICh2YWx1ZXMubGVuZ3RoID09IDMpIHtcclxuXHRcdFx0XHRcdGNhY2hlZCA9IHZhbHVlcy5tYXAoZnVuY3Rpb24oeCkgeyByZXR1cm4geCoxNzsgfSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGZvciAodmFyIGk9MDtpPDM7aSsrKSB7XHJcblx0XHRcdFx0XHRcdHZhbHVlc1tpKzFdICs9IDE2KnZhbHVlc1tpXTtcclxuXHRcdFx0XHRcdFx0dmFsdWVzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhY2hlZCA9IHZhbHVlcztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKChyID0gc3RyLm1hdGNoKC9yZ2JcXCgoWzAtOSwgXSspXFwpL2kpKSkgeyAvKiBkZWNpbWFsIHJnYiAqL1xyXG5cdFx0XHRcdGNhY2hlZCA9IHJbMV0uc3BsaXQoL1xccyosXFxzKi8pLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiBwYXJzZUludCh4KTsgfSk7XHJcblx0XHRcdH0gZWxzZSB7IC8qIGh0bWwgbmFtZSAqL1xyXG5cdFx0XHRcdGNhY2hlZCA9IFswLCAwLCAwXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fY2FjaGVbc3RyXSA9IGNhY2hlZDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2FjaGVkLnNsaWNlKCk7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHR3byBvciBtb3JlIGNvbG9yc1xyXG5cdCAqIEBwYXJhbSB7bnVtYmVyW119IGNvbG9yMVxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyW119IGNvbG9yMlxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJbXX1cclxuXHQgKi9cclxuXHRhZGQ6IGZ1bmN0aW9uKGNvbG9yMSwgY29sb3IyKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XHJcblx0XHRmb3IgKHZhciBpPTA7aTwzO2krKykge1xyXG5cdFx0XHRmb3IgKHZhciBqPTE7ajxhcmd1bWVudHMubGVuZ3RoO2orKykge1xyXG5cdFx0XHRcdHJlc3VsdFtpXSArPSBhcmd1bWVudHNbal1baV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHR3byBvciBtb3JlIGNvbG9ycywgTU9ESUZJRVMgRklSU1QgQVJHVU1FTlRcclxuXHQgKiBAcGFyYW0ge251bWJlcltdfSBjb2xvcjFcclxuXHQgKiBAcGFyYW0ge251bWJlcltdfSBjb2xvcjJcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyW119XHJcblx0ICovXHJcblx0YWRkXzogZnVuY3Rpb24oY29sb3IxLCBjb2xvcjIpIHtcclxuXHRcdGZvciAodmFyIGk9MDtpPDM7aSsrKSB7XHJcblx0XHRcdGZvciAodmFyIGo9MTtqPGFyZ3VtZW50cy5sZW5ndGg7aisrKSB7XHJcblx0XHRcdFx0Y29sb3IxW2ldICs9IGFyZ3VtZW50c1tqXVtpXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGNvbG9yMTtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBNdWx0aXBseSAobWl4KSB0d28gb3IgbW9yZSBjb2xvcnNcclxuXHQgKiBAcGFyYW0ge251bWJlcltdfSBjb2xvcjFcclxuXHQgKiBAcGFyYW0ge251bWJlcltdfSBjb2xvcjJcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyW119XHJcblx0ICovXHJcblx0bXVsdGlwbHk6IGZ1bmN0aW9uKGNvbG9yMSwgY29sb3IyKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XHJcblx0XHRmb3IgKHZhciBpPTA7aTwzO2krKykge1xyXG5cdFx0XHRmb3IgKHZhciBqPTE7ajxhcmd1bWVudHMubGVuZ3RoO2orKykge1xyXG5cdFx0XHRcdHJlc3VsdFtpXSAqPSBhcmd1bWVudHNbal1baV0gLyAyNTU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBNdWx0aXBseSAobWl4KSB0d28gb3IgbW9yZSBjb2xvcnMsIE1PRElGSUVTIEZJUlNUIEFSR1VNRU5UXHJcblx0ICogQHBhcmFtIHtudW1iZXJbXX0gY29sb3IxXHJcblx0ICogQHBhcmFtIHtudW1iZXJbXX0gY29sb3IyXHJcblx0ICogQHJldHVybnMge251bWJlcltdfVxyXG5cdCAqL1xyXG5cdG11bHRpcGx5XzogZnVuY3Rpb24oY29sb3IxLCBjb2xvcjIpIHtcclxuXHRcdGZvciAodmFyIGk9MDtpPDM7aSsrKSB7XHJcblx0XHRcdGZvciAodmFyIGo9MTtqPGFyZ3VtZW50cy5sZW5ndGg7aisrKSB7XHJcblx0XHRcdFx0Y29sb3IxW2ldICo9IGFyZ3VtZW50c1tqXVtpXSAvIDI1NTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb2xvcjFbaV0gPSBNYXRoLnJvdW5kKGNvbG9yMVtpXSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY29sb3IxO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIEludGVycG9sYXRlIChibGVuZCkgdHdvIGNvbG9ycyB3aXRoIGEgZ2l2ZW4gZmFjdG9yXHJcblx0ICogQHBhcmFtIHtudW1iZXJbXX0gY29sb3IxXHJcblx0ICogQHBhcmFtIHtudW1iZXJbXX0gY29sb3IyXHJcblx0ICogQHBhcmFtIHtmbG9hdH0gW2ZhY3Rvcj0wLjVdIDAuLjFcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyW119XHJcblx0ICovXHJcblx0aW50ZXJwb2xhdGU6IGZ1bmN0aW9uKGNvbG9yMSwgY29sb3IyLCBmYWN0b3IpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykgeyBmYWN0b3IgPSAwLjU7IH1cclxuXHRcdHZhciByZXN1bHQgPSBjb2xvcjEuc2xpY2UoKTtcclxuXHRcdGZvciAodmFyIGk9MDtpPDM7aSsrKSB7XHJcblx0XHRcdHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldICsgZmFjdG9yKihjb2xvcjJbaV0tY29sb3IxW2ldKSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIEludGVycG9sYXRlIChibGVuZCkgdHdvIGNvbG9ycyB3aXRoIGEgZ2l2ZW4gZmFjdG9yIGluIEhTTCBtb2RlXHJcblx0ICogQHBhcmFtIHtudW1iZXJbXX0gY29sb3IxXHJcblx0ICogQHBhcmFtIHtudW1iZXJbXX0gY29sb3IyXHJcblx0ICogQHBhcmFtIHtmbG9hdH0gW2ZhY3Rvcj0wLjVdIDAuLjFcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyW119XHJcblx0ICovXHJcblx0aW50ZXJwb2xhdGVIU0w6IGZ1bmN0aW9uKGNvbG9yMSwgY29sb3IyLCBmYWN0b3IpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykgeyBmYWN0b3IgPSAwLjU7IH1cclxuXHRcdHZhciBoc2wxID0gdGhpcy5yZ2IyaHNsKGNvbG9yMSk7XHJcblx0XHR2YXIgaHNsMiA9IHRoaXMucmdiMmhzbChjb2xvcjIpO1xyXG5cdFx0Zm9yICh2YXIgaT0wO2k8MztpKyspIHtcclxuXHRcdFx0aHNsMVtpXSArPSBmYWN0b3IqKGhzbDJbaV0taHNsMVtpXSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5oc2wycmdiKGhzbDEpO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBhIG5ldyByYW5kb20gY29sb3IgYmFzZWQgb24gdGhpcyBvbmVcclxuXHQgKiBAcGFyYW0ge251bWJlcltdfSBjb2xvclxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyW119IGRpZmYgU2V0IG9mIHN0YW5kYXJkIGRldmlhdGlvbnNcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyW119XHJcblx0ICovXHJcblx0cmFuZG9taXplOiBmdW5jdGlvbihjb2xvciwgZGlmZikge1xyXG5cdFx0aWYgKCEoZGlmZiBpbnN0YW5jZW9mIEFycmF5KSkgeyBkaWZmID0gTWF0aC5yb3VuZChST1QuUk5HLmdldE5vcm1hbCgwLCBkaWZmKSk7IH1cclxuXHRcdHZhciByZXN1bHQgPSBjb2xvci5zbGljZSgpO1xyXG5cdFx0Zm9yICh2YXIgaT0wO2k8MztpKyspIHtcclxuXHRcdFx0cmVzdWx0W2ldICs9IChkaWZmIGluc3RhbmNlb2YgQXJyYXkgPyBNYXRoLnJvdW5kKFJPVC5STkcuZ2V0Tm9ybWFsKDAsIGRpZmZbaV0pKSA6IGRpZmYpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLiBFeHBlY3RzIDAuLjI1NSBpbnB1dHMsIHByb2R1Y2VzIDAuLjEgb3V0cHV0cy5cclxuXHQgKiBAcGFyYW0ge251bWJlcltdfSBjb2xvclxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJbXX1cclxuXHQgKi9cclxuXHRyZ2IyaHNsOiBmdW5jdGlvbihjb2xvcikge1xyXG5cdFx0dmFyIHIgPSBjb2xvclswXS8yNTU7XHJcblx0XHR2YXIgZyA9IGNvbG9yWzFdLzI1NTtcclxuXHRcdHZhciBiID0gY29sb3JbMl0vMjU1O1xyXG5cclxuXHRcdHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XHJcblx0XHR2YXIgaCwgcywgbCA9IChtYXggKyBtaW4pIC8gMjtcclxuXHJcblx0XHRpZiAobWF4ID09IG1pbikge1xyXG5cdFx0XHRoID0gcyA9IDA7IC8vIGFjaHJvbWF0aWNcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBkID0gbWF4IC0gbWluO1xyXG5cdFx0XHRzID0gKGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pKTtcclxuXHRcdFx0c3dpdGNoKG1heCkge1xyXG5cdFx0XHRcdGNhc2UgcjogaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApOyBicmVhaztcclxuXHRcdFx0XHRjYXNlIGc6IGggPSAoYiAtIHIpIC8gZCArIDI7IGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgYjogaCA9IChyIC0gZykgLyBkICsgNDsgYnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0aCAvPSA2O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBbaCwgcywgbF07XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi4gRXhwZWN0cyAwLi4xIGlucHV0cywgcHJvZHVjZXMgMC4uMjU1IG91dHB1dHMuXHJcblx0ICogQHBhcmFtIHtudW1iZXJbXX0gY29sb3JcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyW119XHJcblx0ICovXHJcblx0aHNsMnJnYjogZnVuY3Rpb24oY29sb3IpIHtcclxuXHRcdHZhciBsID0gY29sb3JbMl07XHJcblxyXG5cdFx0aWYgKGNvbG9yWzFdID09IDApIHtcclxuXHRcdFx0bCA9IE1hdGgucm91bmQobCoyNTUpO1xyXG5cdFx0XHRyZXR1cm4gW2wsIGwsIGxdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGh1ZTJyZ2IgPSBmdW5jdGlvbihwLCBxLCB0KSB7XHJcblx0XHRcdFx0aWYgKHQgPCAwKSB0ICs9IDE7XHJcblx0XHRcdFx0aWYgKHQgPiAxKSB0IC09IDE7XHJcblx0XHRcdFx0aWYgKHQgPCAxLzYpIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xyXG5cdFx0XHRcdGlmICh0IDwgMS8yKSByZXR1cm4gcTtcclxuXHRcdFx0XHRpZiAodCA8IDIvMykgcmV0dXJuIHAgKyAocSAtIHApICogKDIvMyAtIHQpICogNjtcclxuXHRcdFx0XHRyZXR1cm4gcDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHMgPSBjb2xvclsxXTtcclxuXHRcdFx0dmFyIHEgPSAobCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcyk7XHJcblx0XHRcdHZhciBwID0gMiAqIGwgLSBxO1xyXG5cdFx0XHR2YXIgciA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0gKyAxLzMpO1xyXG5cdFx0XHR2YXIgZyA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0pO1xyXG5cdFx0XHR2YXIgYiA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0gLSAxLzMpO1xyXG5cdFx0XHRyZXR1cm4gW01hdGgucm91bmQocioyNTUpLCBNYXRoLnJvdW5kKGcqMjU1KSwgTWF0aC5yb3VuZChiKjI1NSldO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHRvUkdCOiBmdW5jdGlvbihjb2xvcikge1xyXG5cdFx0cmV0dXJuIFwicmdiKFwiICsgdGhpcy5fY2xhbXAoY29sb3JbMF0pICsgXCIsXCIgKyB0aGlzLl9jbGFtcChjb2xvclsxXSkgKyBcIixcIiArIHRoaXMuX2NsYW1wKGNvbG9yWzJdKSArIFwiKVwiO1xyXG5cdH0sXHJcblxyXG5cdHRvSGV4OiBmdW5jdGlvbihjb2xvcikge1xyXG5cdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRmb3IgKHZhciBpPTA7aTwzO2krKykge1xyXG5cdFx0XHRwYXJ0cy5wdXNoKHRoaXMuX2NsYW1wKGNvbG9yW2ldKS50b1N0cmluZygxNikubHBhZChcIjBcIiwgMikpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiI1wiICsgcGFydHMuam9pbihcIlwiKTtcclxuXHR9LFxyXG5cclxuXHRfY2xhbXA6IGZ1bmN0aW9uKG51bSkge1xyXG5cdFx0aWYgKG51bSA8IDApIHtcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9IGVsc2UgaWYgKG51bSA+IDI1NSkge1xyXG5cdFx0XHRyZXR1cm4gMjU1O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfY2FjaGU6IHtcclxuXHRcdFwiYmxhY2tcIjogWzAsMCwwXSxcclxuXHRcdFwibmF2eVwiOiBbMCwwLDEyOF0sXHJcblx0XHRcImRhcmtibHVlXCI6IFswLDAsMTM5XSxcclxuXHRcdFwibWVkaXVtYmx1ZVwiOiBbMCwwLDIwNV0sXHJcblx0XHRcImJsdWVcIjogWzAsMCwyNTVdLFxyXG5cdFx0XCJkYXJrZ3JlZW5cIjogWzAsMTAwLDBdLFxyXG5cdFx0XCJncmVlblwiOiBbMCwxMjgsMF0sXHJcblx0XHRcInRlYWxcIjogWzAsMTI4LDEyOF0sXHJcblx0XHRcImRhcmtjeWFuXCI6IFswLDEzOSwxMzldLFxyXG5cdFx0XCJkZWVwc2t5Ymx1ZVwiOiBbMCwxOTEsMjU1XSxcclxuXHRcdFwiZGFya3R1cnF1b2lzZVwiOiBbMCwyMDYsMjA5XSxcclxuXHRcdFwibWVkaXVtc3ByaW5nZ3JlZW5cIjogWzAsMjUwLDE1NF0sXHJcblx0XHRcImxpbWVcIjogWzAsMjU1LDBdLFxyXG5cdFx0XCJzcHJpbmdncmVlblwiOiBbMCwyNTUsMTI3XSxcclxuXHRcdFwiYXF1YVwiOiBbMCwyNTUsMjU1XSxcclxuXHRcdFwiY3lhblwiOiBbMCwyNTUsMjU1XSxcclxuXHRcdFwibWlkbmlnaHRibHVlXCI6IFsyNSwyNSwxMTJdLFxyXG5cdFx0XCJkb2RnZXJibHVlXCI6IFszMCwxNDQsMjU1XSxcclxuXHRcdFwiZm9yZXN0Z3JlZW5cIjogWzM0LDEzOSwzNF0sXHJcblx0XHRcInNlYWdyZWVuXCI6IFs0NiwxMzksODddLFxyXG5cdFx0XCJkYXJrc2xhdGVncmF5XCI6IFs0Nyw3OSw3OV0sXHJcblx0XHRcImRhcmtzbGF0ZWdyZXlcIjogWzQ3LDc5LDc5XSxcclxuXHRcdFwibGltZWdyZWVuXCI6IFs1MCwyMDUsNTBdLFxyXG5cdFx0XCJtZWRpdW1zZWFncmVlblwiOiBbNjAsMTc5LDExM10sXHJcblx0XHRcInR1cnF1b2lzZVwiOiBbNjQsMjI0LDIwOF0sXHJcblx0XHRcInJveWFsYmx1ZVwiOiBbNjUsMTA1LDIyNV0sXHJcblx0XHRcInN0ZWVsYmx1ZVwiOiBbNzAsMTMwLDE4MF0sXHJcblx0XHRcImRhcmtzbGF0ZWJsdWVcIjogWzcyLDYxLDEzOV0sXHJcblx0XHRcIm1lZGl1bXR1cnF1b2lzZVwiOiBbNzIsMjA5LDIwNF0sXHJcblx0XHRcImluZGlnb1wiOiBbNzUsMCwxMzBdLFxyXG5cdFx0XCJkYXJrb2xpdmVncmVlblwiOiBbODUsMTA3LDQ3XSxcclxuXHRcdFwiY2FkZXRibHVlXCI6IFs5NSwxNTgsMTYwXSxcclxuXHRcdFwiY29ybmZsb3dlcmJsdWVcIjogWzEwMCwxNDksMjM3XSxcclxuXHRcdFwibWVkaXVtYXF1YW1hcmluZVwiOiBbMTAyLDIwNSwxNzBdLFxyXG5cdFx0XCJkaW1ncmF5XCI6IFsxMDUsMTA1LDEwNV0sXHJcblx0XHRcImRpbWdyZXlcIjogWzEwNSwxMDUsMTA1XSxcclxuXHRcdFwic2xhdGVibHVlXCI6IFsxMDYsOTAsMjA1XSxcclxuXHRcdFwib2xpdmVkcmFiXCI6IFsxMDcsMTQyLDM1XSxcclxuXHRcdFwic2xhdGVncmF5XCI6IFsxMTIsMTI4LDE0NF0sXHJcblx0XHRcInNsYXRlZ3JleVwiOiBbMTEyLDEyOCwxNDRdLFxyXG5cdFx0XCJsaWdodHNsYXRlZ3JheVwiOiBbMTE5LDEzNiwxNTNdLFxyXG5cdFx0XCJsaWdodHNsYXRlZ3JleVwiOiBbMTE5LDEzNiwxNTNdLFxyXG5cdFx0XCJtZWRpdW1zbGF0ZWJsdWVcIjogWzEyMywxMDQsMjM4XSxcclxuXHRcdFwibGF3bmdyZWVuXCI6IFsxMjQsMjUyLDBdLFxyXG5cdFx0XCJjaGFydHJldXNlXCI6IFsxMjcsMjU1LDBdLFxyXG5cdFx0XCJhcXVhbWFyaW5lXCI6IFsxMjcsMjU1LDIxMl0sXHJcblx0XHRcIm1hcm9vblwiOiBbMTI4LDAsMF0sXHJcblx0XHRcInB1cnBsZVwiOiBbMTI4LDAsMTI4XSxcclxuXHRcdFwib2xpdmVcIjogWzEyOCwxMjgsMF0sXHJcblx0XHRcImdyYXlcIjogWzEyOCwxMjgsMTI4XSxcclxuXHRcdFwiZ3JleVwiOiBbMTI4LDEyOCwxMjhdLFxyXG5cdFx0XCJza3libHVlXCI6IFsxMzUsMjA2LDIzNV0sXHJcblx0XHRcImxpZ2h0c2t5Ymx1ZVwiOiBbMTM1LDIwNiwyNTBdLFxyXG5cdFx0XCJibHVldmlvbGV0XCI6IFsxMzgsNDMsMjI2XSxcclxuXHRcdFwiZGFya3JlZFwiOiBbMTM5LDAsMF0sXHJcblx0XHRcImRhcmttYWdlbnRhXCI6IFsxMzksMCwxMzldLFxyXG5cdFx0XCJzYWRkbGVicm93blwiOiBbMTM5LDY5LDE5XSxcclxuXHRcdFwiZGFya3NlYWdyZWVuXCI6IFsxNDMsMTg4LDE0M10sXHJcblx0XHRcImxpZ2h0Z3JlZW5cIjogWzE0NCwyMzgsMTQ0XSxcclxuXHRcdFwibWVkaXVtcHVycGxlXCI6IFsxNDcsMTEyLDIxNl0sXHJcblx0XHRcImRhcmt2aW9sZXRcIjogWzE0OCwwLDIxMV0sXHJcblx0XHRcInBhbGVncmVlblwiOiBbMTUyLDI1MSwxNTJdLFxyXG5cdFx0XCJkYXJrb3JjaGlkXCI6IFsxNTMsNTAsMjA0XSxcclxuXHRcdFwieWVsbG93Z3JlZW5cIjogWzE1NCwyMDUsNTBdLFxyXG5cdFx0XCJzaWVubmFcIjogWzE2MCw4Miw0NV0sXHJcblx0XHRcImJyb3duXCI6IFsxNjUsNDIsNDJdLFxyXG5cdFx0XCJkYXJrZ3JheVwiOiBbMTY5LDE2OSwxNjldLFxyXG5cdFx0XCJkYXJrZ3JleVwiOiBbMTY5LDE2OSwxNjldLFxyXG5cdFx0XCJsaWdodGJsdWVcIjogWzE3MywyMTYsMjMwXSxcclxuXHRcdFwiZ3JlZW55ZWxsb3dcIjogWzE3MywyNTUsNDddLFxyXG5cdFx0XCJwYWxldHVycXVvaXNlXCI6IFsxNzUsMjM4LDIzOF0sXHJcblx0XHRcImxpZ2h0c3RlZWxibHVlXCI6IFsxNzYsMTk2LDIyMl0sXHJcblx0XHRcInBvd2RlcmJsdWVcIjogWzE3NiwyMjQsMjMwXSxcclxuXHRcdFwiZmlyZWJyaWNrXCI6IFsxNzgsMzQsMzRdLFxyXG5cdFx0XCJkYXJrZ29sZGVucm9kXCI6IFsxODQsMTM0LDExXSxcclxuXHRcdFwibWVkaXVtb3JjaGlkXCI6IFsxODYsODUsMjExXSxcclxuXHRcdFwicm9zeWJyb3duXCI6IFsxODgsMTQzLDE0M10sXHJcblx0XHRcImRhcmtraGFraVwiOiBbMTg5LDE4MywxMDddLFxyXG5cdFx0XCJzaWx2ZXJcIjogWzE5MiwxOTIsMTkyXSxcclxuXHRcdFwibWVkaXVtdmlvbGV0cmVkXCI6IFsxOTksMjEsMTMzXSxcclxuXHRcdFwiaW5kaWFucmVkXCI6IFsyMDUsOTIsOTJdLFxyXG5cdFx0XCJwZXJ1XCI6IFsyMDUsMTMzLDYzXSxcclxuXHRcdFwiY2hvY29sYXRlXCI6IFsyMTAsMTA1LDMwXSxcclxuXHRcdFwidGFuXCI6IFsyMTAsMTgwLDE0MF0sXHJcblx0XHRcImxpZ2h0Z3JheVwiOiBbMjExLDIxMSwyMTFdLFxyXG5cdFx0XCJsaWdodGdyZXlcIjogWzIxMSwyMTEsMjExXSxcclxuXHRcdFwicGFsZXZpb2xldHJlZFwiOiBbMjE2LDExMiwxNDddLFxyXG5cdFx0XCJ0aGlzdGxlXCI6IFsyMTYsMTkxLDIxNl0sXHJcblx0XHRcIm9yY2hpZFwiOiBbMjE4LDExMiwyMTRdLFxyXG5cdFx0XCJnb2xkZW5yb2RcIjogWzIxOCwxNjUsMzJdLFxyXG5cdFx0XCJjcmltc29uXCI6IFsyMjAsMjAsNjBdLFxyXG5cdFx0XCJnYWluc2Jvcm9cIjogWzIyMCwyMjAsMjIwXSxcclxuXHRcdFwicGx1bVwiOiBbMjIxLDE2MCwyMjFdLFxyXG5cdFx0XCJidXJseXdvb2RcIjogWzIyMiwxODQsMTM1XSxcclxuXHRcdFwibGlnaHRjeWFuXCI6IFsyMjQsMjU1LDI1NV0sXHJcblx0XHRcImxhdmVuZGVyXCI6IFsyMzAsMjMwLDI1MF0sXHJcblx0XHRcImRhcmtzYWxtb25cIjogWzIzMywxNTAsMTIyXSxcclxuXHRcdFwidmlvbGV0XCI6IFsyMzgsMTMwLDIzOF0sXHJcblx0XHRcInBhbGVnb2xkZW5yb2RcIjogWzIzOCwyMzIsMTcwXSxcclxuXHRcdFwibGlnaHRjb3JhbFwiOiBbMjQwLDEyOCwxMjhdLFxyXG5cdFx0XCJraGFraVwiOiBbMjQwLDIzMCwxNDBdLFxyXG5cdFx0XCJhbGljZWJsdWVcIjogWzI0MCwyNDgsMjU1XSxcclxuXHRcdFwiaG9uZXlkZXdcIjogWzI0MCwyNTUsMjQwXSxcclxuXHRcdFwiYXp1cmVcIjogWzI0MCwyNTUsMjU1XSxcclxuXHRcdFwic2FuZHlicm93blwiOiBbMjQ0LDE2NCw5Nl0sXHJcblx0XHRcIndoZWF0XCI6IFsyNDUsMjIyLDE3OV0sXHJcblx0XHRcImJlaWdlXCI6IFsyNDUsMjQ1LDIyMF0sXHJcblx0XHRcIndoaXRlc21va2VcIjogWzI0NSwyNDUsMjQ1XSxcclxuXHRcdFwibWludGNyZWFtXCI6IFsyNDUsMjU1LDI1MF0sXHJcblx0XHRcImdob3N0d2hpdGVcIjogWzI0OCwyNDgsMjU1XSxcclxuXHRcdFwic2FsbW9uXCI6IFsyNTAsMTI4LDExNF0sXHJcblx0XHRcImFudGlxdWV3aGl0ZVwiOiBbMjUwLDIzNSwyMTVdLFxyXG5cdFx0XCJsaW5lblwiOiBbMjUwLDI0MCwyMzBdLFxyXG5cdFx0XCJsaWdodGdvbGRlbnJvZHllbGxvd1wiOiBbMjUwLDI1MCwyMTBdLFxyXG5cdFx0XCJvbGRsYWNlXCI6IFsyNTMsMjQ1LDIzMF0sXHJcblx0XHRcInJlZFwiOiBbMjU1LDAsMF0sXHJcblx0XHRcImZ1Y2hzaWFcIjogWzI1NSwwLDI1NV0sXHJcblx0XHRcIm1hZ2VudGFcIjogWzI1NSwwLDI1NV0sXHJcblx0XHRcImRlZXBwaW5rXCI6IFsyNTUsMjAsMTQ3XSxcclxuXHRcdFwib3JhbmdlcmVkXCI6IFsyNTUsNjksMF0sXHJcblx0XHRcInRvbWF0b1wiOiBbMjU1LDk5LDcxXSxcclxuXHRcdFwiaG90cGlua1wiOiBbMjU1LDEwNSwxODBdLFxyXG5cdFx0XCJjb3JhbFwiOiBbMjU1LDEyNyw4MF0sXHJcblx0XHRcImRhcmtvcmFuZ2VcIjogWzI1NSwxNDAsMF0sXHJcblx0XHRcImxpZ2h0c2FsbW9uXCI6IFsyNTUsMTYwLDEyMl0sXHJcblx0XHRcIm9yYW5nZVwiOiBbMjU1LDE2NSwwXSxcclxuXHRcdFwibGlnaHRwaW5rXCI6IFsyNTUsMTgyLDE5M10sXHJcblx0XHRcInBpbmtcIjogWzI1NSwxOTIsMjAzXSxcclxuXHRcdFwiZ29sZFwiOiBbMjU1LDIxNSwwXSxcclxuXHRcdFwicGVhY2hwdWZmXCI6IFsyNTUsMjE4LDE4NV0sXHJcblx0XHRcIm5hdmFqb3doaXRlXCI6IFsyNTUsMjIyLDE3M10sXHJcblx0XHRcIm1vY2Nhc2luXCI6IFsyNTUsMjI4LDE4MV0sXHJcblx0XHRcImJpc3F1ZVwiOiBbMjU1LDIyOCwxOTZdLFxyXG5cdFx0XCJtaXN0eXJvc2VcIjogWzI1NSwyMjgsMjI1XSxcclxuXHRcdFwiYmxhbmNoZWRhbG1vbmRcIjogWzI1NSwyMzUsMjA1XSxcclxuXHRcdFwicGFwYXlhd2hpcFwiOiBbMjU1LDIzOSwyMTNdLFxyXG5cdFx0XCJsYXZlbmRlcmJsdXNoXCI6IFsyNTUsMjQwLDI0NV0sXHJcblx0XHRcInNlYXNoZWxsXCI6IFsyNTUsMjQ1LDIzOF0sXHJcblx0XHRcImNvcm5zaWxrXCI6IFsyNTUsMjQ4LDIyMF0sXHJcblx0XHRcImxlbW9uY2hpZmZvblwiOiBbMjU1LDI1MCwyMDVdLFxyXG5cdFx0XCJmbG9yYWx3aGl0ZVwiOiBbMjU1LDI1MCwyNDBdLFxyXG5cdFx0XCJzbm93XCI6IFsyNTUsMjUwLDI1MF0sXHJcblx0XHRcInllbGxvd1wiOiBbMjU1LDI1NSwwXSxcclxuXHRcdFwibGlnaHR5ZWxsb3dcIjogWzI1NSwyNTUsMjI0XSxcclxuXHRcdFwiaXZvcnlcIjogWzI1NSwyNTUsMjQwXSxcclxuXHRcdFwid2hpdGVcIjogWzI1NSwyNTUsMjU1XVxyXG5cdH1cclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBMaWdodGluZyBjb21wdXRhdGlvbiwgYmFzZWQgb24gYSB0cmFkaXRpb25hbCBGT1YgZm9yIG11bHRpcGxlIGxpZ2h0IHNvdXJjZXMgYW5kIG11bHRpcGxlIHBhc3Nlcy5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gcmVmbGVjdGl2aXR5Q2FsbGJhY2sgQ2FsbGJhY2sgdG8gcmV0cmlldmUgY2VsbCByZWZsZWN0aXZpdHkgKDAuLjEpXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnBhc3Nlcz0xXSBOdW1iZXIgb2YgcGFzc2VzLiAxIGVxdWFscyB0byBzaW1wbGUgRk9WIG9mIGFsbCBsaWdodCBzb3VyY2VzLCA+MSBtZWFucyBhICpoaWdobHkgc2ltcGxpZmllZCogcmFkaW9zaXR5LWxpa2UgYWxnb3JpdGhtLlxyXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMuZW1pc3Npb25UaHJlc2hvbGQ9MTAwXSBDZWxscyB3aXRoIGVtaXNzaXZpdHkgPiB0aHJlc2hvbGQgd2lsbCBiZSB0cmVhdGVkIGFzIGxpZ2h0IHNvdXJjZSBpbiB0aGUgbmV4dCBwYXNzLlxyXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMucmFuZ2U9MTBdIE1heCBsaWdodCByYW5nZVxyXG4gKi9cclxuUk9ULkxpZ2h0aW5nID0gZnVuY3Rpb24ocmVmbGVjdGl2aXR5Q2FsbGJhY2ssIG9wdGlvbnMpIHtcclxuXHR0aGlzLl9yZWZsZWN0aXZpdHlDYWxsYmFjayA9IHJlZmxlY3Rpdml0eUNhbGxiYWNrO1xyXG5cdHRoaXMuX29wdGlvbnMgPSB7XHJcblx0XHRwYXNzZXM6IDEsXHJcblx0XHRlbWlzc2lvblRocmVzaG9sZDogMTAwLFxyXG5cdFx0cmFuZ2U6IDEwXHJcblx0fTtcclxuXHR0aGlzLl9mb3YgPSBudWxsO1xyXG5cclxuXHR0aGlzLl9saWdodHMgPSB7fTtcclxuXHR0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZSA9IHt9O1xyXG5cdHRoaXMuX2ZvdkNhY2hlID0ge307XHJcblxyXG5cdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGp1c3Qgb3B0aW9ucyBhdCBydW50aW1lXHJcbiAqIEBzZWUgUk9ULkxpZ2h0aW5nXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICovXHJcblJPVC5MaWdodGluZy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRmb3IgKHZhciBwIGluIG9wdGlvbnMpIHsgdGhpcy5fb3B0aW9uc1twXSA9IG9wdGlvbnNbcF07IH1cclxuXHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJhbmdlKSB7IHRoaXMucmVzZXQoKTsgfVxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdXNlZCBGaWVsZC1PZi1WaWV3IGFsZ29cclxuICogQHBhcmFtIHtST1QuRk9WfSBmb3ZcclxuICovXHJcblJPVC5MaWdodGluZy5wcm90b3R5cGUuc2V0Rk9WID0gZnVuY3Rpb24oZm92KSB7XHJcblx0dGhpcy5fZm92ID0gZm92O1xyXG5cdHRoaXMuX2ZvdkNhY2hlID0ge307XHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IChvciByZW1vdmUpIGEgbGlnaHQgc291cmNlXHJcbiAqIEBwYXJhbSB7aW50fSB4XHJcbiAqIEBwYXJhbSB7aW50fSB5XHJcbiAqIEBwYXJhbSB7bnVsbCB8fCBzdHJpbmcgfHwgbnVtYmVyWzNdfSBjb2xvclxyXG4gKi9cclxuUk9ULkxpZ2h0aW5nLnByb3RvdHlwZS5zZXRMaWdodCA9IGZ1bmN0aW9uKHgsIHksIGNvbG9yKSB7XHJcbiAgdmFyIGtleSA9IHggKyBcIixcIiArIHk7XHJcblxyXG4gIGlmIChjb2xvcikge1xyXG4gICAgdGhpcy5fbGlnaHRzW2tleV0gPSAodHlwZW9mKGNvbG9yKSA9PSBcInN0cmluZ1wiID8gUk9ULkNvbG9yLmZyb21TdHJpbmcoY29sb3IpIDogY29sb3IpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkZWxldGUgdGhpcy5fbGlnaHRzW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbGwgbGlnaHQgc291cmNlc1xyXG4gKi9cclxuUk9ULkxpZ2h0aW5nLnByb3RvdHlwZS5jbGVhckxpZ2h0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fbGlnaHRzID0ge307XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzZXQgdGhlIHByZS1jb21wdXRlZCB0b3BvbG9neSB2YWx1ZXMuIENhbGwgd2hlbmV2ZXIgdGhlIHVuZGVybHlpbmcgbWFwIGNoYW5nZXMgaXRzIGxpZ2h0LXBhc3NhYmlsaXR5LlxyXG4gKi9cclxuUk9ULkxpZ2h0aW5nLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xyXG5cdHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlID0ge307XHJcblx0dGhpcy5fZm92Q2FjaGUgPSB7fTtcclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB0aGUgbGlnaHRpbmdcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gbGlnaHRpbmdDYWxsYmFjayBXaWxsIGJlIGNhbGxlZCB3aXRoICh4LCB5LCBjb2xvcikgZm9yIGV2ZXJ5IGxpdCBjZWxsXHJcbiAqL1xyXG5ST1QuTGlnaHRpbmcucHJvdG90eXBlLmNvbXB1dGUgPSBmdW5jdGlvbihsaWdodGluZ0NhbGxiYWNrKSB7XHJcblx0dmFyIGRvbmVDZWxscyA9IHt9O1xyXG5cdHZhciBlbWl0dGluZ0NlbGxzID0ge307XHJcblx0dmFyIGxpdENlbGxzID0ge307XHJcblxyXG5cdGZvciAodmFyIGtleSBpbiB0aGlzLl9saWdodHMpIHsgLyogcHJlcGFyZSBlbWl0dGVycyBmb3IgZmlyc3QgcGFzcyAqL1xyXG5cdFx0dmFyIGxpZ2h0ID0gdGhpcy5fbGlnaHRzW2tleV07XHJcblx0XHRlbWl0dGluZ0NlbGxzW2tleV0gPSBbMCwgMCwgMF07XHJcblx0XHRST1QuQ29sb3IuYWRkXyhlbWl0dGluZ0NlbGxzW2tleV0sIGxpZ2h0KTtcclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGk9MDtpPHRoaXMuX29wdGlvbnMucGFzc2VzO2krKykgeyAvKiBtYWluIGxvb3AgKi9cclxuXHRcdHRoaXMuX2VtaXRMaWdodChlbWl0dGluZ0NlbGxzLCBsaXRDZWxscywgZG9uZUNlbGxzKTtcclxuXHRcdGlmIChpKzEgPT0gdGhpcy5fb3B0aW9ucy5wYXNzZXMpIHsgY29udGludWU7IH0gLyogbm90IGZvciB0aGUgbGFzdCBwYXNzICovXHJcblx0XHRlbWl0dGluZ0NlbGxzID0gdGhpcy5fY29tcHV0ZUVtaXR0ZXJzKGxpdENlbGxzLCBkb25lQ2VsbHMpO1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgbGl0S2V5IGluIGxpdENlbGxzKSB7IC8qIGxldCB0aGUgdXNlciBrbm93IHdoYXQgYW5kIGhvdyBpcyBsaXQgKi9cclxuXHRcdHZhciBwYXJ0cyA9IGxpdEtleS5zcGxpdChcIixcIik7XHJcblx0XHR2YXIgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcclxuXHRcdHZhciB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xyXG5cdFx0bGlnaHRpbmdDYWxsYmFjayh4LCB5LCBsaXRDZWxsc1tsaXRLZXldKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgb25lIGl0ZXJhdGlvbiBmcm9tIGFsbCBlbWl0dGluZyBjZWxsc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gZW1pdHRpbmdDZWxscyBUaGVzZSBlbWl0IGxpZ2h0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBsaXRDZWxscyBBZGQgcHJvamVjdGVkIGxpZ2h0IHRvIHRoZXNlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkb25lQ2VsbHMgVGhlc2UgYWxyZWFkeSBlbWl0dGVkLCBmb3JiaWQgdGhlbSBmcm9tIGZ1cnRoZXIgY2FsY3VsYXRpb25zXHJcbiAqL1xyXG5ST1QuTGlnaHRpbmcucHJvdG90eXBlLl9lbWl0TGlnaHQgPSBmdW5jdGlvbihlbWl0dGluZ0NlbGxzLCBsaXRDZWxscywgZG9uZUNlbGxzKSB7XHJcblx0Zm9yICh2YXIga2V5IGluIGVtaXR0aW5nQ2VsbHMpIHtcclxuXHRcdHZhciBwYXJ0cyA9IGtleS5zcGxpdChcIixcIik7XHJcblx0XHR2YXIgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcclxuXHRcdHZhciB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xyXG5cdFx0dGhpcy5fZW1pdExpZ2h0RnJvbUNlbGwoeCwgeSwgZW1pdHRpbmdDZWxsc1trZXldLCBsaXRDZWxscyk7XHJcblx0XHRkb25lQ2VsbHNba2V5XSA9IDE7XHJcblx0fVxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByZXBhcmUgYSBsaXN0IG9mIGVtaXR0ZXJzIGZvciBuZXh0IHBhc3NcclxuICogQHBhcmFtIHtvYmplY3R9IGxpdENlbGxzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkb25lQ2VsbHNcclxuICogQHJldHVybnMge29iamVjdH1cclxuICovXHJcblJPVC5MaWdodGluZy5wcm90b3R5cGUuX2NvbXB1dGVFbWl0dGVycyA9IGZ1bmN0aW9uKGxpdENlbGxzLCBkb25lQ2VsbHMpIHtcclxuXHR2YXIgcmVzdWx0ID0ge307XHJcblxyXG5cdGZvciAodmFyIGtleSBpbiBsaXRDZWxscykge1xyXG5cdFx0aWYgKGtleSBpbiBkb25lQ2VsbHMpIHsgY29udGludWU7IH0gLyogYWxyZWFkeSBlbWl0dGVkICovXHJcblxyXG5cdFx0dmFyIGNvbG9yID0gbGl0Q2VsbHNba2V5XTtcclxuXHJcblx0XHRpZiAoa2V5IGluIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlKSB7XHJcblx0XHRcdHZhciByZWZsZWN0aXZpdHkgPSB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZVtrZXldO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcclxuXHRcdFx0dmFyIHggPSBwYXJzZUludChwYXJ0c1swXSk7XHJcblx0XHRcdHZhciB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xyXG5cdFx0XHR2YXIgcmVmbGVjdGl2aXR5ID0gdGhpcy5fcmVmbGVjdGl2aXR5Q2FsbGJhY2soeCwgeSk7XHJcblx0XHRcdHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlW2tleV0gPSByZWZsZWN0aXZpdHk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHJlZmxlY3Rpdml0eSA9PSAwKSB7IGNvbnRpbnVlOyB9IC8qIHdpbGwgbm90IHJlZmxlY3QgYXQgYWxsICovXHJcblxyXG5cdFx0LyogY29tcHV0ZSBlbWlzc2lvbiBjb2xvciAqL1xyXG5cdFx0dmFyIGVtaXNzaW9uID0gW107XHJcblx0XHR2YXIgaW50ZW5zaXR5ID0gMDtcclxuXHRcdGZvciAodmFyIGk9MDtpPDM7aSsrKSB7XHJcblx0XHRcdHZhciBwYXJ0ID0gTWF0aC5yb3VuZChjb2xvcltpXSpyZWZsZWN0aXZpdHkpO1xyXG5cdFx0XHRlbWlzc2lvbltpXSA9IHBhcnQ7XHJcblx0XHRcdGludGVuc2l0eSArPSBwYXJ0O1xyXG5cdFx0fVxyXG5cdFx0aWYgKGludGVuc2l0eSA+IHRoaXMuX29wdGlvbnMuZW1pc3Npb25UaHJlc2hvbGQpIHsgcmVzdWx0W2tleV0gPSBlbWlzc2lvbjsgfVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIG9uZSBpdGVyYXRpb24gZnJvbSBvbmUgY2VsbFxyXG4gKiBAcGFyYW0ge2ludH0geFxyXG4gKiBAcGFyYW0ge2ludH0geVxyXG4gKiBAcGFyYW0ge251bWJlcltdfSBjb2xvclxyXG4gKiBAcGFyYW0ge29iamVjdH0gbGl0Q2VsbHMgQ2VsbCBkYXRhIHRvIGJ5IHVwZGF0ZWRcclxuICovXHJcblJPVC5MaWdodGluZy5wcm90b3R5cGUuX2VtaXRMaWdodEZyb21DZWxsID0gZnVuY3Rpb24oeCwgeSwgY29sb3IsIGxpdENlbGxzKSB7XHJcblx0dmFyIGtleSA9IHgrXCIsXCIreTtcclxuXHRpZiAoa2V5IGluIHRoaXMuX2ZvdkNhY2hlKSB7XHJcblx0XHR2YXIgZm92ID0gdGhpcy5fZm92Q2FjaGVba2V5XTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGZvdiA9IHRoaXMuX3VwZGF0ZUZPVih4LCB5KTtcclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGZvdktleSBpbiBmb3YpIHtcclxuXHRcdHZhciBmb3JtRmFjdG9yID0gZm92W2ZvdktleV07XHJcblxyXG5cdFx0aWYgKGZvdktleSBpbiBsaXRDZWxscykgeyAvKiBhbHJlYWR5IGxpdCAqL1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gbGl0Q2VsbHNbZm92S2V5XTtcclxuXHRcdH0gZWxzZSB7IC8qIG5ld2x5IGxpdCAqL1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gWzAsIDAsIDBdO1xyXG5cdFx0XHRsaXRDZWxsc1tmb3ZLZXldID0gcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGk9MDtpPDM7aSsrKSB7IHJlc3VsdFtpXSArPSBNYXRoLnJvdW5kKGNvbG9yW2ldKmZvcm1GYWN0b3IpOyB9IC8qIGFkZCBsaWdodCBjb2xvciAqL1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBGT1YgKFwiZm9ybSBmYWN0b3JcIikgZm9yIGEgcG90ZW50aWFsIGxpZ2h0IHNvdXJjZSBhdCBbeCx5XVxyXG4gKiBAcGFyYW0ge2ludH0geFxyXG4gKiBAcGFyYW0ge2ludH0geVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKi9cclxuUk9ULkxpZ2h0aW5nLnByb3RvdHlwZS5fdXBkYXRlRk9WID0gZnVuY3Rpb24oeCwgeSkge1xyXG5cdHZhciBrZXkxID0geCtcIixcIit5O1xyXG5cdHZhciBjYWNoZSA9IHt9O1xyXG5cdHRoaXMuX2ZvdkNhY2hlW2tleTFdID0gY2FjaGU7XHJcblx0dmFyIHJhbmdlID0gdGhpcy5fb3B0aW9ucy5yYW5nZTtcclxuXHR2YXIgY2IgPSBmdW5jdGlvbih4LCB5LCByLCB2aXMpIHtcclxuXHRcdHZhciBrZXkyID0geCtcIixcIit5O1xyXG5cdFx0dmFyIGZvcm1GYWN0b3IgPSB2aXMgKiAoMS1yL3JhbmdlKTtcclxuXHRcdGlmIChmb3JtRmFjdG9yID09IDApIHsgcmV0dXJuOyB9XHJcblx0XHRjYWNoZVtrZXkyXSA9IGZvcm1GYWN0b3I7XHJcblx0fTtcclxuXHR0aGlzLl9mb3YuY29tcHV0ZSh4LCB5LCByYW5nZSwgY2IuYmluZCh0aGlzKSk7XHJcblxyXG5cdHJldHVybiBjYWNoZTtcclxufTtcclxuLyoqXHJcbiAqIEBjbGFzcyBBYnN0cmFjdCBwYXRoZmluZGVyXHJcbiAqIEBwYXJhbSB7aW50fSB0b1ggVGFyZ2V0IFggY29vcmRcclxuICogQHBhcmFtIHtpbnR9IHRvWSBUYXJnZXQgWSBjb29yZFxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwYXNzYWJsZUNhbGxiYWNrIENhbGxiYWNrIHRvIGRldGVybWluZSBtYXAgcGFzc2FiaWxpdHlcclxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3k9OF1cclxuICovXHJcblJPVC5QYXRoID0gZnVuY3Rpb24odG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpIHtcclxuXHR0aGlzLl90b1ggPSB0b1g7XHJcblx0dGhpcy5fdG9ZID0gdG9ZO1xyXG5cdHRoaXMuX2Zyb21YID0gbnVsbDtcclxuXHR0aGlzLl9mcm9tWSA9IG51bGw7XHJcblx0dGhpcy5fcGFzc2FibGVDYWxsYmFjayA9IHBhc3NhYmxlQ2FsbGJhY2s7XHJcblx0dGhpcy5fb3B0aW9ucyA9IHtcclxuXHRcdHRvcG9sb2d5OiA4XHJcblx0fTtcclxuXHRmb3IgKHZhciBwIGluIG9wdGlvbnMpIHsgdGhpcy5fb3B0aW9uc1twXSA9IG9wdGlvbnNbcF07IH1cclxuXHJcblx0dGhpcy5fZGlycyA9IFJPVC5ESVJTW3RoaXMuX29wdGlvbnMudG9wb2xvZ3ldO1xyXG5cdGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDgpIHsgLyogcmVvcmRlciBkaXJzIGZvciBtb3JlIGFlc3RoZXRpYyByZXN1bHQgKHZlcnRpY2FsL2hvcml6b250YWwgZmlyc3QpICovXHJcblx0XHR0aGlzLl9kaXJzID0gW1xyXG5cdFx0XHR0aGlzLl9kaXJzWzBdLFxyXG5cdFx0XHR0aGlzLl9kaXJzWzJdLFxyXG5cdFx0XHR0aGlzLl9kaXJzWzRdLFxyXG5cdFx0XHR0aGlzLl9kaXJzWzZdLFxyXG5cdFx0XHR0aGlzLl9kaXJzWzFdLFxyXG5cdFx0XHR0aGlzLl9kaXJzWzNdLFxyXG5cdFx0XHR0aGlzLl9kaXJzWzVdLFxyXG5cdFx0XHR0aGlzLl9kaXJzWzddXHJcblx0XHRdXHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYSBwYXRoIGZyb20gYSBnaXZlbiBwb2ludFxyXG4gKiBAcGFyYW0ge2ludH0gZnJvbVhcclxuICogQHBhcmFtIHtpbnR9IGZyb21ZXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFdpbGwgYmUgY2FsbGVkIGZvciBldmVyeSBwYXRoIGl0ZW0gd2l0aCBhcmd1bWVudHMgXCJ4XCIgYW5kIFwieVwiXHJcbiAqL1xyXG5ST1QuUGF0aC5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uKGZyb21YLCBmcm9tWSwgY2FsbGJhY2spIHtcclxufTtcclxuXHJcblJPVC5QYXRoLnByb3RvdHlwZS5fZ2V0TmVpZ2hib3JzID0gZnVuY3Rpb24oY3gsIGN5KSB7XHJcblx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdGZvciAodmFyIGk9MDtpPHRoaXMuX2RpcnMubGVuZ3RoO2krKykge1xyXG5cdFx0dmFyIGRpciA9IHRoaXMuX2RpcnNbaV07XHJcblx0XHR2YXIgeCA9IGN4ICsgZGlyWzBdO1xyXG5cdFx0dmFyIHkgPSBjeSArIGRpclsxXTtcclxuXHRcdFxyXG5cdFx0aWYgKCF0aGlzLl9wYXNzYWJsZUNhbGxiYWNrKHgsIHkpKSB7IGNvbnRpbnVlOyB9XHJcblx0XHRyZXN1bHQucHVzaChbeCwgeV0pO1xyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG4vKipcclxuICogQGNsYXNzIFNpbXBsaWZpZWQgRGlqa3N0cmEncyBhbGdvcml0aG06IGFsbCBlZGdlcyBoYXZlIGEgdmFsdWUgb2YgMVxyXG4gKiBAYXVnbWVudHMgUk9ULlBhdGhcclxuICogQHNlZSBST1QuUGF0aFxyXG4gKi9cclxuUk9ULlBhdGguRGlqa3N0cmEgPSBmdW5jdGlvbih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucykge1xyXG5cdFJPVC5QYXRoLmNhbGwodGhpcywgdG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpO1xyXG5cclxuXHR0aGlzLl9jb21wdXRlZCA9IHt9O1xyXG5cdHRoaXMuX3RvZG8gPSBbXTtcclxuXHR0aGlzLl9hZGQodG9YLCB0b1ksIG51bGwpO1xyXG59O1xyXG5ST1QuUGF0aC5EaWprc3RyYS5leHRlbmQoUk9ULlBhdGgpO1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYSBwYXRoIGZyb20gYSBnaXZlbiBwb2ludFxyXG4gKiBAc2VlIFJPVC5QYXRoI2NvbXB1dGVcclxuICovXHJcblJPVC5QYXRoLkRpamtzdHJhLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24oZnJvbVgsIGZyb21ZLCBjYWxsYmFjaykge1xyXG5cdHZhciBrZXkgPSBmcm9tWCtcIixcIitmcm9tWTtcclxuXHRpZiAoIShrZXkgaW4gdGhpcy5fY29tcHV0ZWQpKSB7IHRoaXMuX2NvbXB1dGUoZnJvbVgsIGZyb21ZKTsgfVxyXG5cdGlmICghKGtleSBpbiB0aGlzLl9jb21wdXRlZCkpIHsgcmV0dXJuOyB9XHJcblx0XHJcblx0dmFyIGl0ZW0gPSB0aGlzLl9jb21wdXRlZFtrZXldO1xyXG5cdHdoaWxlIChpdGVtKSB7XHJcblx0XHRjYWxsYmFjayhpdGVtLngsIGl0ZW0ueSk7XHJcblx0XHRpdGVtID0gaXRlbS5wcmV2O1xyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIGEgbm9uLWNhY2hlZCB2YWx1ZVxyXG4gKi9cclxuUk9ULlBhdGguRGlqa3N0cmEucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24oZnJvbVgsIGZyb21ZKSB7XHJcblx0d2hpbGUgKHRoaXMuX3RvZG8ubGVuZ3RoKSB7XHJcblx0XHR2YXIgaXRlbSA9IHRoaXMuX3RvZG8uc2hpZnQoKTtcclxuXHRcdGlmIChpdGVtLnggPT0gZnJvbVggJiYgaXRlbS55ID09IGZyb21ZKSB7IHJldHVybjsgfVxyXG5cdFx0XHJcblx0XHR2YXIgbmVpZ2hib3JzID0gdGhpcy5fZ2V0TmVpZ2hib3JzKGl0ZW0ueCwgaXRlbS55KTtcclxuXHRcdFxyXG5cdFx0Zm9yICh2YXIgaT0wO2k8bmVpZ2hib3JzLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0dmFyIG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xyXG5cdFx0XHR2YXIgeCA9IG5laWdoYm9yWzBdO1xyXG5cdFx0XHR2YXIgeSA9IG5laWdoYm9yWzFdO1xyXG5cdFx0XHR2YXIgaWQgPSB4K1wiLFwiK3k7XHJcblx0XHRcdGlmIChpZCBpbiB0aGlzLl9jb21wdXRlZCkgeyBjb250aW51ZTsgfSAvKiBhbHJlYWR5IGRvbmUgKi9cdFxyXG5cdFx0XHR0aGlzLl9hZGQoeCwgeSwgaXRlbSk7IFxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblJPVC5QYXRoLkRpamtzdHJhLnByb3RvdHlwZS5fYWRkID0gZnVuY3Rpb24oeCwgeSwgcHJldikge1xyXG5cdHZhciBvYmogPSB7XHJcblx0XHR4OiB4LFxyXG5cdFx0eTogeSxcclxuXHRcdHByZXY6IHByZXZcclxuXHR9O1xyXG5cdHRoaXMuX2NvbXB1dGVkW3grXCIsXCIreV0gPSBvYmo7XHJcblx0dGhpcy5fdG9kby5wdXNoKG9iaik7XHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgU2ltcGxpZmllZCBBKiBhbGdvcml0aG06IGFsbCBlZGdlcyBoYXZlIGEgdmFsdWUgb2YgMVxyXG4gKiBAYXVnbWVudHMgUk9ULlBhdGhcclxuICogQHNlZSBST1QuUGF0aFxyXG4gKi9cclxuUk9ULlBhdGguQVN0YXIgPSBmdW5jdGlvbih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucykge1xyXG5cdFJPVC5QYXRoLmNhbGwodGhpcywgdG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpO1xyXG5cclxuXHR0aGlzLl90b2RvID0gW107XHJcblx0dGhpcy5fZG9uZSA9IHt9O1xyXG5cdHRoaXMuX2Zyb21YID0gbnVsbDtcclxuXHR0aGlzLl9mcm9tWSA9IG51bGw7XHJcbn07XHJcblJPVC5QYXRoLkFTdGFyLmV4dGVuZChST1QuUGF0aCk7XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhIHBhdGggZnJvbSBhIGdpdmVuIHBvaW50XHJcbiAqIEBzZWUgUk9ULlBhdGgjY29tcHV0ZVxyXG4gKi9cclxuUk9ULlBhdGguQVN0YXIucHJvdG90eXBlLmNvbXB1dGUgPSBmdW5jdGlvbihmcm9tWCwgZnJvbVksIGNhbGxiYWNrKSB7XHJcblx0dGhpcy5fdG9kbyA9IFtdO1xyXG5cdHRoaXMuX2RvbmUgPSB7fTtcclxuXHR0aGlzLl9mcm9tWCA9IGZyb21YO1xyXG5cdHRoaXMuX2Zyb21ZID0gZnJvbVk7XHJcblx0dGhpcy5fYWRkKHRoaXMuX3RvWCwgdGhpcy5fdG9ZLCBudWxsKTtcclxuXHJcblx0d2hpbGUgKHRoaXMuX3RvZG8ubGVuZ3RoKSB7XHJcblx0XHR2YXIgaXRlbSA9IHRoaXMuX3RvZG8uc2hpZnQoKTtcclxuXHRcdGlmIChpdGVtLnggPT0gZnJvbVggJiYgaXRlbS55ID09IGZyb21ZKSB7IGJyZWFrOyB9XHJcblx0XHR2YXIgbmVpZ2hib3JzID0gdGhpcy5fZ2V0TmVpZ2hib3JzKGl0ZW0ueCwgaXRlbS55KTtcclxuXHJcblx0XHRmb3IgKHZhciBpPTA7aTxuZWlnaGJvcnMubGVuZ3RoO2krKykge1xyXG5cdFx0XHR2YXIgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XHJcblx0XHRcdHZhciB4ID0gbmVpZ2hib3JbMF07XHJcblx0XHRcdHZhciB5ID0gbmVpZ2hib3JbMV07XHJcblx0XHRcdHZhciBpZCA9IHgrXCIsXCIreTtcclxuXHRcdFx0aWYgKGlkIGluIHRoaXMuX2RvbmUpIHsgY29udGludWU7IH1cclxuXHRcdFx0dGhpcy5fYWRkKHgsIHksIGl0ZW0pOyBcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0dmFyIGl0ZW0gPSB0aGlzLl9kb25lW2Zyb21YK1wiLFwiK2Zyb21ZXTtcclxuXHRpZiAoIWl0ZW0pIHsgcmV0dXJuOyB9XHJcblx0XHJcblx0d2hpbGUgKGl0ZW0pIHtcclxuXHRcdGNhbGxiYWNrKGl0ZW0ueCwgaXRlbS55KTtcclxuXHRcdGl0ZW0gPSBpdGVtLnByZXY7XHJcblx0fVxyXG59O1xyXG5cclxuUk9ULlBhdGguQVN0YXIucHJvdG90eXBlLl9hZGQgPSBmdW5jdGlvbih4LCB5LCBwcmV2KSB7XHJcblx0dmFyIGggPSB0aGlzLl9kaXN0YW5jZSh4LCB5KTtcclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0eDogeCxcclxuXHRcdHk6IHksXHJcblx0XHRwcmV2OiBwcmV2LFxyXG5cdFx0ZzogKHByZXYgPyBwcmV2LmcrMSA6IDApLFxyXG5cdFx0aDogaFxyXG5cdH07XHJcblx0dGhpcy5fZG9uZVt4K1wiLFwiK3ldID0gb2JqO1xyXG5cdFxyXG5cdC8qIGluc2VydCBpbnRvIHByaW9yaXR5IHF1ZXVlICovXHJcblx0XHJcblx0dmFyIGYgPSBvYmouZyArIG9iai5oO1xyXG5cdGZvciAodmFyIGk9MDtpPHRoaXMuX3RvZG8ubGVuZ3RoO2krKykge1xyXG5cdFx0dmFyIGl0ZW0gPSB0aGlzLl90b2RvW2ldO1xyXG5cdFx0dmFyIGl0ZW1GID0gaXRlbS5nICsgaXRlbS5oO1xyXG5cdFx0aWYgKGYgPCBpdGVtRiB8fCAoZiA9PSBpdGVtRiAmJiBoIDwgaXRlbS5oKSkge1xyXG5cdFx0XHR0aGlzLl90b2RvLnNwbGljZShpLCAwLCBvYmopO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuX3RvZG8ucHVzaChvYmopO1xyXG59O1xyXG5cclxuUk9ULlBhdGguQVN0YXIucHJvdG90eXBlLl9kaXN0YW5jZSA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuXHRzd2l0Y2ggKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kpIHtcclxuXHRcdGNhc2UgNDpcclxuXHRcdFx0cmV0dXJuIChNYXRoLmFicyh4LXRoaXMuX2Zyb21YKSArIE1hdGguYWJzKHktdGhpcy5fZnJvbVkpKTtcclxuXHRcdGJyZWFrO1xyXG5cclxuXHRcdGNhc2UgNjpcclxuXHRcdFx0dmFyIGR4ID0gTWF0aC5hYnMoeCAtIHRoaXMuX2Zyb21YKTtcclxuXHRcdFx0dmFyIGR5ID0gTWF0aC5hYnMoeSAtIHRoaXMuX2Zyb21ZKTtcclxuXHRcdFx0cmV0dXJuIGR5ICsgTWF0aC5tYXgoMCwgKGR4LWR5KS8yKTtcclxuXHRcdGJyZWFrO1xyXG5cclxuXHRcdGNhc2UgODogXHJcblx0XHRcdHJldHVybiBNYXRoLm1heChNYXRoLmFicyh4LXRoaXMuX2Zyb21YKSwgTWF0aC5hYnMoeS10aGlzLl9mcm9tWSkpO1xyXG5cdFx0YnJlYWs7XHJcblx0fVxyXG5cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbGxlZ2FsIHRvcG9sb2d5XCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgUk9UIH1cclxuIiwiaW1wb3J0IHsgUk9UIH0gZnJvbSAnLi9yb3QnXG5cbnZhciBvcHRpb25zID0ge1xuICAgIGZvbnRGYW1pbHk6ICdcIkNvdXJpZXIgTmV3XCIsIENvdXJpZXIsIG1vbm9zcGFjZScsXG4gICAgZm9udFNpemU6IDMwLFxuICAgIHNwYWNpbmc6IDAuOSxcbn1cblxuY29uc3Qgc3VuID0gMVxuXG5jb25zdCBtYXAgPSBbXVxubWFwLndpZHRoID0gMTAwXG5tYXAuaGVpZ2h0ID0gMTAwXG5tYXAuY2VudHJlID0geyB4OiBtYXAud2lkdGggKiAwLjUgLCB5OiBtYXAuaGVpZ2h0ICogMC41IH1cblxuY29uc3QgYWN0b3JzID0gW11cbmNvbnN0IGNlbnRyZSA9IHsgeDogMCwgeTogMCB9XG5jb25zdCBub2lzZSA9IG5ldyBST1QuTm9pc2UuU2ltcGxleCgpXG5cbmZ1bmN0aW9uIEdseXBoKCBjaCwgciwgZywgYiApIHtcbiAgICByZXR1cm4ge1xuICAgIFx0Y2g6IGNoLFxuICAgIFx0cjogcixcbiAgICBcdGc6IGcsXG4gICAgXHRiOiBiXG4gICAgfVxufVxuXG5jb25zdCBnbHlwaHMgPSB7XG4gICAgUEM6IEdseXBoKCAn8J+RpCcsIDI0NSwgMywgMjU1ICksXG4gICAgVk9JRDogR2x5cGgoICcgJywgMCwgMCwgMCApLFxuICAgIEdSQVNTMTogR2x5cGgoIFwiJ1wiLCAzNiwgMTIwLCAwICksXG4gICAgR1JBU1MyOiBHbHlwaCggJ1wiJywgMzYsIDEyMCwgMCApLFxuICAgIFBBVklORzogR2x5cGgoICfirJsnLCA0MCwgNDAsIDQwICksXG4gICAgV0FMTDogR2x5cGgoICfij7knLCAxNjQsIDE2NCwgMTY0ICksXG4gICAgV0FURVI6IEdseXBoKCBcIuOAnFwiLCAxMjAsIDE1NCwgMjM1ICksXG4gICAgVFJFRTogR2x5cGgoICfwn4yzJywgMzYsIDEyMCwgMCApLFxufVxuXG5jb25zdCBibG9ja3Ntb3ZlID0gWyBnbHlwaHMuUEMsIGdseXBocy5OUEMsIGdseXBocy5WT0lELCBnbHlwaHMuV0FMTCwgZ2x5cGhzLlRSRUUgXVxuXG5mdW5jdGlvbiBUaWxlKCBnbHlwaCwgeCwgeSApIHtcbiAgICByZXR1cm4ge1xuICAgIFx0Z2x5cGg6IGdseXBoLFxuICAgIFx0cjogMSxcbiAgICBcdGc6IDEsXG4gICAgXHRiOiAxLFxuICAgIFx0eDogeCxcbiAgICBcdHk6IHksXG4gICAgXHR0aGluZ3M6IFtdLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gVGhpbmcoIHR5cGUsIGdseXBoLCB4LCB5LCB6ICkge1xuICAgIHJldHVybiB7XG4gICAgXHR0eXBlOiB0eXBlLFxuICAgIFx0Z2x5cGg6IGdseXBoLFxuICAgIFx0dGlsZTogdGlsZUF0KCB4LCB5ICksXG4gICAgXHR6OiB6XG4gICAgfVxufVxuXG5mdW5jdGlvbiBBY3RvciggZ2x5cGgsIHgsIHksIHogKSB7XG4gICAgdmFyIGFjdG9yID0gVGhpbmcoIEFjdG9yLCBnbHlwaCwgeCwgeSwgeiApXG4gICAgYWN0b3JzLnB1c2goIGFjdG9yIClcbiAgICByZXR1cm4gYWN0b3Jcbn1cblxuZnVuY3Rpb24gYWN0KCBhY3RvciApIHtcblxufVxuXG5mb3IgKCB2YXIgeSA9IG1hcC5oZWlnaHQ7IHktLTsgKSB7XG4gICAgZm9yICggdmFyIHggPSBtYXAud2lkdGg7IHgtLTsgKSB7XG4gICAgXHRtYXBbIHkgKiBtYXAud2lkdGggKyB4IF0gPSBUaWxlKCBnbHlwaHMuVk9JRCwgeCwgeSApXG4gICAgfVxufVxuXG5mdW5jdGlvbiB0aWxlQXQoIHgsIHkgKSB7XG4gICAgaWYgKCB4IDwgMCB8fCB5IDwgMCB8fCB4ID49IG1hcC53aWR0aCB8fCB5ID49IG1hcC5oZWlnaHQgKSByZXR1cm4gbnVsbFxuICAgIHJldHVybiBtYXBbIHkgKiBtYXAud2lkdGggKyB4IF1cbn1cblxuZnVuY3Rpb24gY29udGFpbnMoIHRpbGUsIGdseXBobGlzdCApIHtcbiAgICBpZiAoIGdseXBobGlzdC5pbmRleE9mKCB0aWxlLmdseXBoICkgPiAtMSApIHJldHVybiB0cnVlXG4gICAgdmFyIHRoaW5ncyA9IHRpbGUudGhpbmdzXG4gICAgZm9yICggdmFyIGkgPSB0aGluZ3MubGVuZ3RoOyBpLS07ICkge1xuICAgIFx0aWYgKCBnbHlwaGxpc3QuaW5kZXhPZiggdGhpbmdzWyBpIF0uZ2x5cGggKSA+IC0xICkgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHB1c2goIHRoaW5nLCB0aWxlICkge1xuICAgIHBvcCggdGhpbmcgKVxuICAgIHRoaW5nLnRpbGUgPSB0aWxlXG4gICAgdmFyIHRoaW5ncyA9IHRpbGUudGhpbmdzXG4gICAgdmFyIGkgPSB0aGluZ3MuaW5kZXhPZiggdGhpbmcgKVxuICAgIGlmICggaSA+IC0xICkgcmV0dXJuXG4gICAgdGhpbmdzLnNwbGljZSggc29ydGVkSW5kZXgoIHRoaW5ncywgdGhpbmcueiApLCAwLCB0aGluZyApXG59XG5cbmZ1bmN0aW9uIHBvcCggdGhpbmcgKSB7XG4gICAgaWYgKCAhIHRoaW5nLnRpbGUgKSByZXR1cm4gbnVsbFxuICAgIHZhciB0aGluZ3MgPSB0aGluZy50aWxlLnRoaW5nc1xuICAgIHZhciBpID0gdGhpbmdzLmluZGV4T2YoIHRoaW5nIClcbiAgICBpZiAoIGkgPiAtMSApIHRoaW5ncy5zcGxpY2UoIGksIDEgKVxuICAgIHRoaW5nLnRpbGUgPSBudWxsXG59XG5cbmZ1bmN0aW9uIHJlc29ydCggdGlsZSApIHtcbiAgICB2YXIgdGhpbmdzID0gdGlsZS50aGluZ3NcbiAgICB2YXIgc29ydGVkID0gW11cbiAgICBmb3IgKCB2YXIgaSA9IHRoaW5ncy5sZW5ndGg7IGktLTsgKSB7XG4gICAgXHR2YXIgdGhpbmcgPSB0aGluZ3NbIGkgXVxuICAgIFx0c29ydGVkLnNwbGljZSggc29ydGVkSW5kZXgoIHNvcnRlZCwgdGhpbmcueiApLCAwLCB0aGluZyApXG4gICAgfVxuICAgIHRpbGUudGhpbmdzID0gc29ydGVkXG59XG5cbmZ1bmN0aW9uIHNvcnRlZEluZGV4KCB0aGluZ3MsIHogKSB7XG4gICAgdmFyIGxvdyA9IDBcbiAgICB2YXIgaGlnaCA9IHRoaW5ncy5sZW5ndGhcbiAgICB3aGlsZSAoIGxvdyA8IGhpZ2ggKSB7XG4gICAgXHR2YXIgbWlkID0gKCBsb3cgKyBoaWdoICkgPj4+IDFcbiAgICBcdGlmICggdGhpbmdzWyBtaWQgXS56ID4geiApIGxvdyA9IG1pZCArIDFcbiAgICBcdGVsc2UgaGlnaCA9IG1pZFxuICAgIH1cbiAgICByZXR1cm4gbG93XG59XG5cbmNvbnN0IGRyYXdpbmZvID0gWyAwLyp4Ki8sIDEvKnkqLywgMi8qY2gqLywgMy8qY29sb3VyKi8gXVxuXG5mdW5jdGlvbiBuZXh0KCkge1xuICAgIGZvciAoIHZhciBpID0gYWN0b3JzLmxlbmd0aDsgaS0tOyApIGFjdCggYWN0b3JzWyBpIF0gKVxuICAgIHJlbmRlcigpXG4gICAgaW5wdXQoIGZ1bmN0aW9uKCkgeyBzZXRUaW1lb3V0KCBuZXh0LCAwICkgfSApXG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBkaXNwbGF5Ll9iYWNrZW5kLl9jb250ZXh0LmZpbGxTdHlsZSA9ICdibGFjaydcbiAgICBkaXNwbGF5Ll9iYWNrZW5kLl9jb250ZXh0LmZpbGxSZWN0KCAwLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0IClcbiAgICB2YXIgZm9jdXMgPSBwYy50aWxlXG4gICAgdmFyIG1pbnggPSBNYXRoLm1pbiggTWF0aC5tYXgoIGZvY3VzLnggLSBjZW50cmUueCwgMCApLCBtYXAud2lkdGggLSBvcHRpb25zLndpZHRoIClcbiAgICB2YXIgbWlueSA9IE1hdGgubWluKCBNYXRoLm1heCggZm9jdXMueSAtIGNlbnRyZS55LCAwICksIG1hcC5oZWlnaHQgLSBvcHRpb25zLmhlaWdodCApXG4gICAgdmFyIGVuZHggPSBtaW54ICsgb3B0aW9ucy53aWR0aFxuICAgIHZhciBlbmR5ID0gbWlueSArIG9wdGlvbnMuaGVpZ2h0XG4gICAgdmFyIHkgPSBtaW55XG4gICAgd2hpbGUgKCB5IDwgZW5keSApIHtcbiAgICBcdGRyYXdpbmZvWyAxIF0gPSAoIHkgLSBtaW55IClcbiAgICBcdHZhciB4ID0gbWlueFxuICAgIFx0d2hpbGUgKCB4IDwgZW5keCApIHtcbiAgICBcdFx0ZHJhd2luZm9bIDAgXSA9ICggeCAtIG1pbnggKVxuICAgIFx0XHR2YXIgdGlsZSA9IHRpbGVBdCggeCwgeSApXG4gICAgXHRcdHZhciBnbHlwaCA9IHRpbGUuZ2x5cGhcbiAgICBcdFx0ZHJhd2luZm9bIDIgXSA9IGdseXBoLmNoXG4gICAgXHRcdGRyYXdpbmZvWyAzIF0gPSByZ2IoIGdseXBoLnIgKiB0aWxlLnIsIGdseXBoLmcgKiB0aWxlLmcsIGdseXBoLmIgKiB0aWxlLmIsIHN1biApXG4gICAgXHRcdGRpc3BsYXkuX2JhY2tlbmQuX2RyYXdOb0NhY2hlKCBkcmF3aW5mbyApXG4gICAgXHRcdHZhciB0aGluZ3MgPSB0aWxlLnRoaW5nc1xuICAgIFx0XHRmb3IgKCB2YXIgaSA9IHRoaW5ncy5sZW5ndGg7IGktLTsgKSB7XG4gICAgXHRcdFx0dmFyIHRoaW5nID0gdGhpbmdzWyBpIF1cbiAgICBcdFx0XHRnbHlwaCA9IHRoaW5nLmdseXBoXG4gICAgXHRcdFx0ZHJhd2luZm9bIDIgXSA9IGdseXBoLmNoXG4gICAgXHRcdFx0ZHJhd2luZm9bIDMgXSA9IHJnYiggZ2x5cGguciwgZ2x5cGguZywgZ2x5cGguYiwgc3VuIClcbiAgICBcdFx0XHRkaXNwbGF5Ll9iYWNrZW5kLl9kcmF3Tm9DYWNoZSggZHJhd2luZm8gKVxuICAgIFx0XHR9XG4gICAgXHRcdHgrK1xuICAgIFx0fVxuICAgIFx0eSsrXG4gICAgfVxufVxuXG5mdW5jdGlvbiByZ2IoIHIsIGcsIGIsIG4gKSB7XG4gICAgcmV0dXJuICdyZ2IoICcgKyBNYXRoLnJvdW5kKCByICogbiApICsgJywgJyArIE1hdGgucm91bmQoIGcgKiBuICkgKyAnLCAnICsgTWF0aC5yb3VuZCggYiAqIG4gKSArICcgKSdcbn1cblxuZnVuY3Rpb24gZml0KCkge1xuICAgIG9wdGlvbnMgPSBkaXNwbGF5LmdldE9wdGlvbnMoKVxuICAgIHZhciBzaXplID0gZGlzcGxheS5jb21wdXRlU2l6ZSggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApXG4gICAgb3B0aW9ucy53aWR0aCA9IHNpemVbIDAgXVxuICAgIG9wdGlvbnMuaGVpZ2h0ID0gc2l6ZVsgMSBdXG4gICAgZGlzcGxheS5zZXRPcHRpb25zKCBvcHRpb25zIClcbiAgICBkaXNwbGF5Ll9kaXJ0eSA9IGZhbHNlXG4gICAgY2VudHJlLnggPSBNYXRoLmZsb29yKCBvcHRpb25zLndpZHRoICogMC41IClcbiAgICBjZW50cmUueSA9IE1hdGguZmxvb3IoIG9wdGlvbnMuaGVpZ2h0ICogMC41IClcbiAgICByZW5kZXIoKVxufVxuXG5jb25zdCBhY3Rpb25zID0ge1xuICAgIE5PTkU6IDAsXG4gICAgTk9SVEg6IDEsXG4gICAgU09VVEg6IDIsXG4gICAgV0VTVDogMyxcbiAgICBFQVNUOiA0LFxuICAgIE5PUlRIV0VTVDogNSxcbiAgICBOT1JUSEVBU1Q6IDYsXG4gICAgU09VVEhXRVNUOiA3LFxuICAgIFNPVVRIRUFTVDogOFxufVxuXG5mdW5jdGlvbiBpbnB1dCggcmVzb2x2ZSApIHtcbiAgICBpbnB1dC5yZXNvbHZlID0gZnVuY3Rpb24gKCBhY3Rpb24gKSB7XG4gICAgXHR2YXIgeCA9IHBjLnRpbGUueFxuICAgIFx0dmFyIHkgPSBwYy50aWxlLnlcbiAgICBcdGlmICggYWN0aW9uID09PSBhY3Rpb25zLk5PUlRIIHx8IGFjdGlvbiA9PSBhY3Rpb25zLk5PUlRIV0VTVCB8fCBhY3Rpb24gPT09IGFjdGlvbnMuTk9SVEhFQVNUICkgeS0tXG4gICAgXHRpZiAoIGFjdGlvbiA9PT0gYWN0aW9ucy5TT1VUSCB8fCBhY3Rpb24gPT0gYWN0aW9ucy5TT1VUSFdFU1QgfHwgYWN0aW9uID09PSBhY3Rpb25zLlNPVVRIRUFTVCApIHkrK1xuICAgIFx0aWYgKCBhY3Rpb24gPT09IGFjdGlvbnMuV0VTVCB8fCBhY3Rpb24gPT0gYWN0aW9ucy5OT1JUSFdFU1QgfHwgYWN0aW9uID09PSBhY3Rpb25zLlNPVVRIV0VTVCApIHgtLVxuICAgIFx0aWYgKCBhY3Rpb24gPT09IGFjdGlvbnMuRUFTVCB8fCBhY3Rpb24gPT0gYWN0aW9ucy5OT1JUSEVBU1QgfHwgYWN0aW9uID09PSBhY3Rpb25zLlNPVVRIRUFTVCApIHgrK1xuICAgIFx0aWYgKCB4ICE9PSBwYy50aWxlLnggfHwgeSAhPT0gcGMudGlsZS55ICkge1xuICAgIFx0XHR2YXIgdG8gPSB0aWxlQXQoIHgsIHkgKVxuICAgIFx0XHRpZiAoIHRvICYmICEgY29udGFpbnMoIHRvLCBibG9ja3Ntb3ZlICkgKSB7XG4gICAgXHRcdFx0cHVzaCggcGMsIHRvIClcbiAgICBcdFx0XHRyZXNvbHZlKClcbiAgICBcdFx0XHRyZXR1cm5cbiAgICBcdFx0fVxuICAgIFx0fVxuICAgIFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBrZXlkb3duIClcbiAgICB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBrZXlkb3duIClcbn1cblxuZnVuY3Rpb24ga2V5ZG93biggZXZlbnQgKSB7XG4gICAgaWYgKCBldmVudC5hbHRLZXkgfHwgZXZlbnQubWV0YUtleSApIHJldHVyblxuICAgIHZhciBrZXkgPSBldmVudC5rZXlcbiAgICB2YXIgYWN0aW9uID0gYWN0aW9ucy5OT05FXG4gICAgaWYgKCBbICdBcnJvd1VwJywgJ2snIF0uaW5kZXhPZigga2V5ICkgPiAtIDEpIHtcbiAgICBcdGFjdGlvbiA9IGV2ZW50LnNoaWZ0S2V5ID8gYWN0aW9ucy5OT1JUSEVBU1QgOiBhY3Rpb25zLk5PUlRIXG4gICAgfSBlbHNlIGlmICggWyAnSycgXS5pbmRleE9mKCBrZXkgKSA+IC0gMSkge1xuICAgIFx0YWN0aW9uID0gYWN0aW9ucy5OT1JUSEVBU1RcbiAgICB9IGVsc2UgaWYgKCBbICdBcnJvd0Rvd24nLCAnaicgXS5pbmRleE9mKCBrZXkgKSA+IC0gMSkge1xuICAgIFx0YWN0aW9uID0gZXZlbnQuc2hpZnRLZXkgPyBhY3Rpb25zLlNPVVRIV0VTVCA6IGFjdGlvbnMuU09VVEhcbiAgICB9IGVsc2UgaWYgKCBbICdKJyBdLmluZGV4T2YoIGtleSApID4gLSAxKSB7XG4gICAgXHRhY3Rpb24gPSBhY3Rpb25zLk5PUlRIV0VTVFxuICAgIH0gZWxzZSBpZiAoIFsgJ0Fycm93UmlnaHQnLCAnbCcgXS5pbmRleE9mKCBrZXkgKSA+IC0gMSkge1xuICAgIFx0YWN0aW9uID0gZXZlbnQuc2hpZnRLZXkgPyBhY3Rpb25zLlNPVVRIRUFTVDogYWN0aW9ucy5FQVNUXG4gICAgfSBlbHNlIGlmICggWyAnTCcgXS5pbmRleE9mKCBrZXkgKSA+IC0gMSkge1xuICAgIFx0YWN0aW9uID0gYWN0aW9ucy5TT1VUSEVBU1RcbiAgICB9IGVsc2UgaWYgKCBbICdBcnJvd0xlZnQnLCAnaCcgXS5pbmRleE9mKCBrZXkgKSA+IC0gMSkge1xuICAgIFx0YWN0aW9uID0gZXZlbnQuc2hpZnRLZXkgPyBhY3Rpb25zLk5PUlRIV0VTVDogYWN0aW9ucy5XRVNUXG4gICAgfSBlbHNlIGlmICggWyAnSCcgXS5pbmRleE9mKCBrZXkgKSA+IC0gMSkge1xuICAgIFx0YWN0aW9uID0gYWN0aW9ucy5TT1VUSFdFU1RcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBrZXlkb3duIClcbiAgICBpbnB1dC5yZXNvbHZlKCBhY3Rpb24gKVxufVxuXG5jb25zdCBkaXNwbGF5ID0gbmV3IFJPVC5EaXNwbGF5KCBvcHRpb25zIClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGRpc3BsYXkuZ2V0Q29udGFpbmVyKCkgKVxuXG5jb25zdCBwYyA9IEFjdG9yKCBnbHlwaHMuUEMsIDAsIDAsIDAgKVxuXG5maXQoKVxuXG47KCBmdW5jdGlvbiAoIHRpbWVvdXQsIGJsb2NrZWQgKSB7XG4gICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICBcdGJsb2NrZWQgPSB0aW1lb3V0XG4gICAgXHR0aW1lb3V0IHx8ICggZml0KCksIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICBcdFx0dGltZW91dCA9IG51bGxcbiAgICBcdFx0YmxvY2tlZCAmJiBoYW5kbGVyKClcbiAgICBcdH0sIDUwMCApIClcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCBoYW5kbGVyIClcbn0gKSgpXG5cbmZ1bmN0aW9uIGxpbmUoIHgwLCB5MCwgeDEsIHkxLCBjYWxsYmFjayApIHtcbiAgICB2YXIgZHggPSBNYXRoLmFicyggeDEgLSB4MCApLCBzeCA9IHgwIDwgeDEgPyAxIDogLTFcbiAgICB2YXIgZHkgPSBNYXRoLmFicyggeTEgLSB5MCApLCBzeSA9IHkwIDwgeTEgPyAxIDogLTFcbiAgICB2YXIgZXJyID0gKCBkeCA+IGR5ID8gZHggOiAtZHkpIC8gMlxuICAgIHdoaWxlICggdHJ1ZSApIHtcbiAgICBcdGNhbGxiYWNrKCB4MCwgeTAgKVxuICAgIFx0aWYgKCB4MCA9PT0geDEgJiYgeTAgPT09IHkxICkgYnJlYWtcbiAgICBcdHZhciBlMiA9IGVyclxuICAgIFx0aWYgKCBlMiA+IC1keCApIHsgZXJyIC09IGR5OyB4MCArPSBzeDsgfVxuICAgIFx0aWYgKCBlMiA8IGR5ICkgeyBlcnIgKz0gZHg7IHkwICs9IHN5OyB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiB3YWxsKCB4MCwgeTAsIHgxLCB5MSApIHtcbiAgICBsaW5lKCB4MCwgeTAsIHgxLCB5MSwgZnVuY3Rpb24oIHgsIHkgKSB7XG4gICAgICAgIHZhciB0aWxlID0gdGlsZUF0KCB4LCB5IClcbiAgICAgICAgdGlsZS5nbHlwaCA9IGdseXBocy5XQUxMXG4gICAgICAgIHRpbGUuciA9IHRpbGUuZyA9IHRpbGUuYiA9IDFcbiAgICB9IClcbn1cblxuZnVuY3Rpb24gYXJlYSggeDAsIHkwLCB4MSwgeTEsIGNhbGxiYWNrICkge1xuICAgIHZhciBzeCA9IHgwIDwgeDEgPyAxIDogLTFcbiAgICB2YXIgc3kgPSB5MCA8IHkxID8gMSA6IC0xXG4gICAgdmFyIHggPSB4MFxuICAgIHdoaWxlICggdHJ1ZSApIHtcbiAgICBcdGNhbGxiYWNrKCB4LCB5MCApXG4gICAgXHRpZiAoIHggPT09IHgxICYmIHkwID09PSB5MSApIGJyZWFrXG4gICAgXHRpZiAoIHggPT09IHgxICkgeyB4ID0geDA7IHkwICs9IHN5OyB9XG4gICAgXHRlbHNlIHsgeCArPSBzeDsgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ3Jhc3MoIHgwLCB5MCwgeDEsIHkxICkge1xuICAgIGFyZWEoIHgwLCB5MCwgeDEsIHkxLCBmdW5jdGlvbiggeCwgeSApIHtcbiAgICAgICAgdmFyIHRpbGUgPSB0aWxlQXQoIHgsIHkgKVxuICAgICAgICB2YXIgbiA9IG5vaXNlLmdldCggeCwgeSApXG4gICAgICAgIGlmICggbm9pc2UuZ2V0KCB4ICogMC4wNCwgeSAqIDAuMDQgKSA8IDAgKSB7XG4gICAgICAgICAgICB0aWxlLmdseXBoID0gWyBnbHlwaHMuR1JBU1MxLCBnbHlwaHMuR1JBU1MyIF1bIG4gPCAwID8gMCA6IDEgXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCBub2lzZS5nZXQoICggeCArIDEwMCApICogMC4wNywgKCB5ICsgMzYwICkgKiAwLjA3ICkgPCAwICkge1xuICAgICAgICAgICAgICAgIHRpbGUuZ2x5cGggPSBnbHlwaHMuVFJFRVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aWxlLmdseXBoID0gWyBnbHlwaHMuR1JBU1MxLCBnbHlwaHMuR1JBU1MyIF1bIG4gPCAwID8gMCA6IDEgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRpbGUuZyA9IG5vaXNlLmdldCggeCAqIDAuMDUsIHkgKiAwLjA1ICkgPCAwID8gMC42IDogMC44IFxuICAgICAgICB0aWxlLmcgKz0gbiAqIDAuMjUgXG4gICAgICAgIHRpbGUuYiA9ICggbiArIDEgKSAqIDEgXG4gICAgfSApXG59XG5cbmZ1bmN0aW9uIHRyZWUoIHgwLCB5MCwgeDEsIHkxICkge1xuICAgIGFyZWEoIHgwLCB5MCwgeDEsIHkxLCBmdW5jdGlvbiggeCwgeSApIHtcbiAgICAgICAgdmFyIHRpbGUgPSB0aWxlQXQoIHgsIHkgKVxuICAgICAgICB2YXIgbiA9IG5vaXNlLmdldCggeCwgeSApXG4gICAgICAgIHRpbGUuZ2x5cGggPSBnbHlwaHMuVFJFRVxuICAgICAgICB0aWxlLnIgPSB0aWxlLmcgPSB0aWxlLmIgPSAxXG4gICAgfSApXG59XG5cblxuZ3Jhc3MoIDAsIDAsIG1hcC5oZWlnaHQgLSAxLCBtYXAud2lkdGggLSAxIClcblxuXG52YXIgc3RhcnQgPSB0aWxlQXQoIFJPVC5STkcuZ2V0VW5pZm9ybUludCggMCwgbWFwLndpZHRoIC0gMSApLCBST1QuUk5HLmdldFVuaWZvcm1JbnQoIDAsIG1hcC53aWR0aCAtIDEgKSApXG53aGlsZSAoIHN0YXJ0LmdseXBoID09PSBnbHlwaHMuVFJFRSApIHtcbiAgICBzdGFydCA9IHRpbGVBdCggUk9ULlJORy5nZXRVbmlmb3JtSW50KCAwLCBtYXAud2lkdGggLSAxICksIFJPVC5STkcuZ2V0VW5pZm9ybUludCggMCwgbWFwLndpZHRoIC0gMSApIClcbn1cblxucHVzaCggcGMsIHN0YXJ0IClcblxubmV4dCgpXG5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Q0FBQTtDQUNBO0NBQ0E7Q0FDQTtBQUNBLEtBQUksR0FBRyxHQUFHO0NBQ1Y7Q0FDQTtDQUNBO0NBQ0EsQ0FBQyxXQUFXLEVBQUUsV0FBVztDQUN6QixFQUFFLE9BQU8sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDcEYsRUFBRTs7Q0FFRjtDQUNBLENBQUMsYUFBYSxFQUFFLEVBQUU7Q0FDbEI7Q0FDQSxDQUFDLGNBQWMsRUFBRSxFQUFFOztDQUVuQjtDQUNBLENBQUMsSUFBSSxFQUFFO0NBQ1AsRUFBRSxHQUFHLEVBQUU7Q0FDUCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDWCxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNYLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDWCxHQUFHO0NBQ0gsRUFBRSxHQUFHLEVBQUU7Q0FDUCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ1gsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNYLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDWCxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNYLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDWCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ1gsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ1gsR0FBRztDQUNILEVBQUUsR0FBRyxFQUFFO0NBQ1AsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ1gsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNYLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDWCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ1gsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNYLEdBQUc7Q0FDSCxFQUFFOztDQUVGO0NBQ0EsQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUNiO0NBQ0EsQ0FBQyxPQUFPLEVBQUUsQ0FBQztDQUNYO0NBQ0EsQ0FBQyxhQUFhLEVBQUUsQ0FBQztDQUNqQjtDQUNBLENBQUMsTUFBTSxFQUFFLENBQUM7Q0FDVjtDQUNBLENBQUMsUUFBUSxFQUFFLEVBQUU7Q0FDYjtDQUNBLENBQUMsU0FBUyxFQUFFLEVBQUU7Q0FDZDtDQUNBLENBQUMsUUFBUSxFQUFFLEVBQUU7Q0FDYjtDQUNBLENBQUMsUUFBUSxFQUFFLEVBQUU7Q0FDYjtDQUNBLENBQUMsVUFBVSxFQUFFLEVBQUU7Q0FDZjtDQUNBLENBQUMsTUFBTSxFQUFFLEVBQUU7Q0FDWDtDQUNBLENBQUMsUUFBUSxFQUFFLEVBQUU7Q0FDYjtDQUNBLENBQUMsWUFBWSxFQUFFLEVBQUU7Q0FDakI7Q0FDQSxDQUFDLFNBQVMsRUFBRSxFQUFFO0NBQ2Q7Q0FDQSxDQUFDLFFBQVEsRUFBRSxFQUFFO0NBQ2I7Q0FDQSxDQUFDLFVBQVUsRUFBRSxFQUFFO0NBQ2Y7Q0FDQSxDQUFDLFlBQVksRUFBRSxFQUFFO0NBQ2pCO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsRUFBRTtDQUNYO0NBQ0EsQ0FBQyxPQUFPLEVBQUUsRUFBRTtDQUNaO0NBQ0EsQ0FBQyxPQUFPLEVBQUUsRUFBRTtDQUNaO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsRUFBRTtDQUNWO0NBQ0EsQ0FBQyxRQUFRLEVBQUUsRUFBRTtDQUNiO0NBQ0EsQ0FBQyxPQUFPLEVBQUUsRUFBRTtDQUNaO0NBQ0EsQ0FBQyxjQUFjLEVBQUUsRUFBRTtDQUNuQjtDQUNBLENBQUMsU0FBUyxFQUFFLEVBQUU7Q0FDZDtDQUNBLENBQUMsU0FBUyxFQUFFLEVBQUU7Q0FDZDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsUUFBUSxFQUFFLEVBQUU7Q0FDYjtDQUNBLENBQUMsWUFBWSxFQUFFLEVBQUU7Q0FDakI7Q0FDQSxDQUFDLFlBQVksRUFBRSxFQUFFO0NBQ2pCO0NBQ0EsQ0FBQyxTQUFTLEVBQUUsRUFBRTtDQUNkO0NBQ0EsQ0FBQyxlQUFlLEVBQUUsRUFBRTtDQUNwQjtDQUNBLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtDQUNyQjtDQUNBLENBQUMsS0FBSyxFQUFFLEVBQUU7Q0FDVjtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsSUFBSSxFQUFFLEVBQUU7Q0FDVDtDQUNBLENBQUMsZUFBZSxFQUFFLEVBQUU7Q0FDcEI7Q0FDQSxDQUFDLFVBQVUsRUFBRSxFQUFFO0NBQ2Y7Q0FDQSxDQUFDLFVBQVUsRUFBRSxFQUFFO0NBQ2Y7Q0FDQSxDQUFDLFVBQVUsRUFBRSxFQUFFO0NBQ2Y7Q0FDQSxDQUFDLFVBQVUsRUFBRSxFQUFFO0NBQ2Y7Q0FDQSxDQUFDLFVBQVUsRUFBRSxHQUFHO0NBQ2hCO0NBQ0EsQ0FBQyxVQUFVLEVBQUUsR0FBRztDQUNoQjtDQUNBLENBQUMsVUFBVSxFQUFFLEdBQUc7Q0FDaEI7Q0FDQSxDQUFDLFVBQVUsRUFBRSxHQUFHO0NBQ2hCO0NBQ0EsQ0FBQyxVQUFVLEVBQUUsR0FBRztDQUNoQjtDQUNBLENBQUMsVUFBVSxFQUFFLEdBQUc7Q0FDaEI7Q0FDQSxDQUFDLFdBQVcsRUFBRSxHQUFHO0NBQ2pCO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxZQUFZLEVBQUUsR0FBRztDQUNsQjtDQUNBLENBQUMsV0FBVyxFQUFFLEdBQUc7Q0FDakI7Q0FDQSxDQUFDLFVBQVUsRUFBRSxHQUFHO0NBQ2hCO0NBQ0EsQ0FBQyxTQUFTLEVBQUUsR0FBRztDQUNmO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsR0FBRztDQUNYO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsR0FBRztDQUNYO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsR0FBRztDQUNYO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsR0FBRztDQUNYO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsR0FBRztDQUNYO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsR0FBRztDQUNYO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsR0FBRztDQUNYO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsR0FBRztDQUNYO0NBQ0EsQ0FBQyxLQUFLLEVBQUUsR0FBRztDQUNYO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNaO0NBQ0EsQ0FBQyxXQUFXLEVBQUUsR0FBRztDQUNqQjtDQUNBLENB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LE1BQU0sRUFBRTtDQUNySCxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtDQUN0QixHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDL0UsR0FBRzs7Q0FFSCxFQUFFLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7Q0FDeEksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDNUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDdkMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDNUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Q0FDckMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7Q0FDeEMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztDQUNyQixFQUFFO0NBQ0YsQ0FBQyxPQUFPLElBQUksQ0FBQztDQUNiLENBQUMsQ0FBQzs7Q0FFRjtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxXQUFXO0NBQzlDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0NBQ3RCLENBQUMsQ0FBQzs7Q0FFRjtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxXQUFXO0NBQ2hELENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztDQUM3QixDQUFDLENBQUM7O0NBRUY7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsVUFBVSxFQUFFLFdBQVcsRUFBRTtDQUN0RSxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDMUUsQ0FBQyxDQUFDOztDQUVGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxTQUFTLFVBQVUsRUFBRSxXQUFXLEVBQUU7Q0FDMUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQzlFLENBQUMsQ0FBQzs7Q0FFRjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxFQUFFO0NBQ3BELENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO0NBQ2hCLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Q0FDL0IsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztDQUMvQixFQUFFLE1BQU07Q0FDUixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7Q0FDcEIsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0NBQ3BCLEVBQUU7O0NBRUYsQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0NBQ3pELENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDaEIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQztDQUNmO0NBQ0EsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztDQUNwRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOztDQUV0RSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7O0NBRWhILENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDNUMsQ0FBQyxDQUFDOztDQUVGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtDQUN4RCxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUNwQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUNwQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUMxQztDQUNBLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRTtDQUN0QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRTtDQUN4QyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Q0FDN0IsQ0FBQyxDQUFDOztDQUVGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Q0FDaEUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7Q0FDZixDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztDQUNmLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ1osQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDWixDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNmLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTs7Q0FFckQsQ0FBQyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7O0NBRWhELENBQUMsT0FBTyxNQUFNLENBQUMsTUFBTSxFQUFFO0NBQ3ZCLEVBQUUsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQzdCLEVBQUUsUUFBUSxLQUFLLENBQUMsSUFBSTtDQUNwQixHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTO0NBQzFCLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxFQUFFLFdBQVcsR0FBRyxLQUFLLEVBQUUsV0FBVyxHQUFHLEtBQUssRUFBRSxlQUFlLEdBQUcsS0FBSyxDQUFDO0NBQzNGLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFO0NBQzNDLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQztDQUNBLEtBQUssV0FBVyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sSUFBSSxFQUFFLEdBQUcsTUFBTSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUM7Q0FDL0Y7Q0FDQSxLQUFLLE9BQU8sSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDO0NBQ3RFO0NBQ0E7Q0FDQSxLQUFLLElBQUksZUFBZSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtDQUMvRDtDQUNBO0NBQ0EsS0FBSyxHQUFHLFdBQVcsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7Q0FDOUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ3BDLEtBQUssV0FBVyxHQUFHLE9BQU8sQ0FBQztDQUMzQixLQUFLLGVBQWUsR0FBRyxXQUFXLENBQUM7Q0FDbkMsS0FBSztDQUNMLEdBQUcsTUFBTTs7Q0FFVCxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPO0NBQ3hCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO0NBQzdCLEdBQUcsTUFBTTs7Q0FFVCxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPO0NBQ3hCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO0NBQzdCLEdBQUcsTUFBTTs7Q0FFVCxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZO0NBQzdCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNYLElBQUksRUFBRSxFQUFFLENBQUM7Q0FDVCxJQUFJLEtBQUssRUFBRSxDQUFDO0NBQ1osR0FBRyxNQUFNO0NBQ1QsR0FBRztDQUNILEVBQUU7O0NBRUYsQ0FBQyxPQUFPLEtBQUssQ0FBQztDQUNkLENBQUMsQ0FBQzs7Q0FFRjtDQUNBO0NBQ0E7Q0FDQSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsV0FBVztDQUN6QyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Q0FFbkMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRTs7Q0FFOUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO0NBQzNCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7Q0FDN0MsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Q0FFeEYsRUFBRSxLQUFLLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Q0FDN0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUN6QixHQUFHOztDQUVILEVBQUUsTUFBTTtDQUNSLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0NBQy9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDekIsR0FBRztDQUNILEVBQUU7O0NBRUYsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztDQUNyQixDQUFDLENBQUM7O0NBRUY7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLEVBQUUsV0FBVyxFQUFFO0NBQ3pELENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM1QixDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFOztDQUV6RCxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztDQUN2QyxDQUFDLENBQUM7Q0FDRjtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxFQUFFO0NBQ3hDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7Q0FDekIsQ0FBQyxDQUFDOztDQUVGLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLEVBQUU7Q0FDMUQsQ0FBQyxDQUFDOztDQUVGLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLEVBQUUsV0FBVyxFQUFFO0NBQ2pFLENBQUMsQ0FBQzs7Q0FFRixHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsVUFBVSxFQUFFLFdBQVcsRUFBRTtDQUM5RSxDQUFDLENBQUM7O0NBRUYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxTQUFTLFVBQVUsRUFBRSxXQUFXLEVBQUU7Q0FDbEYsQ0FBQyxDQUFDOztDQUVGLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0NBQy9ELENBQUMsQ0FBQztDQUNGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsU0FBUyxPQUFPLEVBQUU7Q0FDckMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ3pDO0NBQ0EsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztDQUNwQixDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0NBQ3BCLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7Q0FDeEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztDQUNwQixDQUFDLENBQUM7Q0FDRixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Q0FFN0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Q0FFL0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sRUFBRTtDQUN2RCxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0NBQ3hCLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O0NBRXpCLENBQUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNqRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQ3pELENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztDQUVoRSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtDQUNyQyxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQzdFLEVBQUU7O0NBRUYsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0NBQzdELENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztDQUMvRCxDQUFDLENBQUM7O0NBRUYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxTQUFTLElBQUksRUFBRSxXQUFXLEVBQUU7Q0FDOUQsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO0NBQzdCLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7Q0FDekMsRUFBRSxNQUFNO0NBQ1IsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztDQUN2QyxFQUFFO0NBQ0YsQ0FBQyxDQUFDOztDQUVGLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsU0FBUyxJQUFJLEVBQUUsV0FBVyxFQUFFO0NBQ3hFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pCLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2xCLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2xCLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztDQUVsQixDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUN4QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Q0FDaEMsRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3ZDLEVBQUUsTUFBTTtDQUNSLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Q0FDL0IsRUFBRSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ2hELEVBQUUsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNwQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztDQUNoQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztDQUNqQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0NBQ3JCLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEQ7Q0FDQSxFQUFFLElBQUksRUFBRSxFQUFFO0NBQ1YsR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztDQUN0QixHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Q0FDakMsR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztDQUM1QixHQUFHLEdBQUcsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDOztDQUUvQixHQUFHLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDN0IsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRTtDQUNwQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzFFLElBQUk7Q0FDSixHQUFHO0NBQ0gsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztDQUNuQyxFQUFFO0NBQ0Y7Q0FDQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3JFLENBQUMsQ0FBQzs7Q0FFRixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsSUFBSSxFQUFFLFdBQVcsRUFBRTtDQUN0RSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqQixDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNsQixDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNsQixDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Q0FFbEIsQ0FBQyxJQUFJLFdBQVcsRUFBRTtDQUNsQixFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0NBQy9CLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0NBQy9CLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQzdHLEVBQUU7Q0FDRjtDQUNBLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRTs7Q0FFckIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxF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QUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDVixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDVCxFQUFFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztDQUM1QyxFQUFFLE1BQU07Q0FDUixFQUFFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUM3QyxFQUFFO0NBQ0YsQ0FBQyxJQUFJLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Q0FDNUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7O0NBRXhCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO0NBQ2YsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztDQUN0QixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztDQUM3QyxFQUFFLE1BQU07Q0FDUixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0NBQ3pDLEVBQUU7O0NBRUYsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ2YsQ0FBQyxDQUFDOztDQUVGO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFO0NBQ25ELENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztDQUN2QixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDOztDQUU5QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7O0NBRTNCLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtDQUM5QixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ25DLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RELEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RELEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDbkMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEQsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEQsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNuQyxFQUFFLE1BQU07Q0FDUixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3ZDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RELEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RELEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdkMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEQsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEQsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN2QyxFQUFFO0NBQ0YsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0NBQ3RCLENBQUMsQ0FBQztDQUNGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcs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S0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQ2pDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFO0NBQzdDLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRTtDQUNsQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDYixHQUFHLE1BQU07Q0FDVCxHQUFHO0NBQ0gsRUFBRTs7Q0FFRixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDdEMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3pDLENBQUMsQ0FBQzs7Q0FFRjtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxXQUFXO0NBQzFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRTs7Q0FFM0MsQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDN0MsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7Q0FDZixFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO0NBQ3JCLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFB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LENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN2QyxFQUFFLElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtDQUNwRCxFQUFFO0NBQ0Y7Q0FDQSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0NBQ3JDLEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDckMsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN0QyxFQUFFLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtDQUNwRCxFQUFFOztDQUVGLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFOztDQUVsRCxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztDQUN6QixDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztDQUN6QjtDQUNBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDckI7Q0FDQSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUNoQjtDQUNBLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMzQixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqQixFQUFFO0NBQ0Y7Q0FDQSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDM0IsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtDQUNsQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pCLEVBQUU7O0NBRUYsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzNCLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtDQUMvQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcs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USxFQUFFO0NBQ3ZELENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztDQUN6QixDQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Q0FDM0I7Q0FDQSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDNUI7Q0FDQSxDQUFDLEtBQUssS0FBSyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUM5QixDQUFDLE1BQU0sS0FBSyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Q0FFaEMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDWixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNaLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ1osQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7O0NBRVosQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7Q0FDZCxDQUFDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztDQUNyQixDQUFDLElBQUksSUFBSSxHQUFHO0NBQ1osRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDUixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNSLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ1IsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDUixFQUFFLENBQUM7Q0FDSCxDQUFDLEdBQUc7Q0FDSixFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDNUQsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztDQUU3RCxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Q0FDakM7Q0FDQSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDcEIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3pCLEdBQUcsR0FBRztDQUNOLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtDQUM5RixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Q0FDbkIsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0NBQzFCLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzVCLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzVCLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRTtDQUNuRCxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDdEIsTUFBTSxH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QyxHQUFHLENBQUMsQ0FBQztDQUNuQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDbkMsRUFBRSxNQUFNO0NBQ1IsRUFBRSxLQUFLLENBQUM7Q0FDUixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDbkMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ25DLEVBQUUsTUFBTTtDQUNSLEVBQUU7Q0FDRixDQUFDLENBQUM7O0NBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7Q0FDeEUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUUsRUFBRSxPQUFPLEtBQUssQ0FBQyxFQUFFO0NBQ25FLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEIsQ0FBQyxDQUFDO0NBQ0Y7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRTtDQUM1QyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDbkMsQ0FBQyxDQUFDO0NBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Q0FFbEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLFFBQVEsRUFBRTtDQUN4RCxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDNUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDdEM7Q0FDQSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDakI7Q0FDQSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNaLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ1o7Q0FDQSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Q0FDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ1osRUFBRTtDQUNGLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0NBRWIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUNyQztDQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtDQUN4QjtDQUNBLEdBQUcsSUFB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QyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFO0NBQ3pDLEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM3QixHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztDQUNyQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0NBQ2xDLEdBQUc7O0NBRUgsRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7Q0FDdEQsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztDQUN2QixFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRTtDQUNsRjtDQUNBLEVBQUUsT0FBTyxDQUFDLEVBQUU7Q0FDWjtDQUNBLEdBQUcsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztDQUM1QztDQUNBO0NBQ0EsR0FBRyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDL0Q7Q0FDQTtDQUNBLEdBQUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3pEO0NBQ0EsR0FBRyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztDQUM3QyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUU7Q0FDdEI7Q0FDQSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUU7Q0FDbEQsR0FBRztDQUNILEVBQUU7Q0FDRixDQUFDLE9BQU8sS0FBSyxDQUFDO0NBQ2QsQ0FBQyxDQUFDOztDQUVGO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsU0FBUyxLQUFLLEVBQUUsSUFBSSxFQUFFO0NBQy9ELENBQUMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO0NBQ3JCLENBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0NBQy9CLENBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0NBQ25CO0NBQ0EsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRTtDQUNsQyxFQUFFLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUN4QixFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDMUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzFCLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0NBQ3RCO0NBQ0EsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7Q0FDaEIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0NBQ1osR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0NBQ2QsR0FBRztDQUNILEVBQUU7Q0FDRjtDQUNBLENBQUMsT0FBTyxNQUFNLENBQUM7Q0FDZixDQUFDLENBQUM7O0NBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxTQUFTLEtBQUssRUFBRSxLQUFLLEVBQUU7Q0FDakU7Q0FDQTtDQUNBO0NBQ0E7O0NBRUEsQ0FBQyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7Q0FDakMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7O0NBRWpDLENBQUMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNyQyxDQUFDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7O0NBRXJDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Q0FDeEMsRUFBRSxJQUFJLFNBQVMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUN0QyxFQUFFLElBQUksU0FBUyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDdEMsRUFBRSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDNUIsRUFBRSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Q0FDN0IsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsRUFBRSxNQUFNO0NBQ1IsRUFBRSxJQUFJLFNBQVMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUN0QyxFQUFFLElBQUksU0FBUyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDdEMsRUFBRSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7Q0FDM0IsRUFBRSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7Q0FDOUIsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsRUFBRTs7Q0FFRixDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ2pELENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUU7O0NBRTlCLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7Q0FDakQsRUFBRSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDMUIsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Q0FDbkIsRUFBRSxRQUFRLFNBQVM7Q0FDbkIsR0FBRyxLQUFLLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07Q0FDM0MsR0FBRyxLQUFLLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07Q0FDN0MsR0FBRyxLQUFLLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07Q0FDOUMsR0FBRyxLQUFLLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07Q0FDNUMsR0FBRztDQUNILEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDM0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFD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QixFQUFFLEtBQUssQ0FBQztDQUNSLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ2hCLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM3QyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM3QyxFQUFFLE1BQU07Q0FDUixFQUFFLEtBQUssQ0FBQztDQUNSLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ2hCLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztDQUM5QyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM3QyxFQUFFLE1BQU07Q0FDUixFQUFFLEtBQUssQ0FBQztDQUNSLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ2hCLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNoRCxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM3QyxFQUFFLE1BQU07Q0FDUixFQUFFLEtBQUssQ0FBQztDQUNSLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ2hCLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFB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R0FBRyxRQUFRLEdBQUcsS0FBSyxJQUFJLENBQUMsRUFBRTtDQUN0QyxJQUFJLEdBQUcsUUFBUSxFQUFFO0NBQ2pCLEtBQUssUUFBUSxFQUFFLENBQUM7Q0FDaEIsS0FBSyxNQUFNO0NBQ1gsS0FBSyxLQUFLLEVBQUUsQ0FBQztDQUNiLEtBQUs7Q0FDTCxJQUFJOztDQUVKLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUM7Q0FDdEIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQzs7Q0FFdEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUM5QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQzlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDckMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQzs7Q0FFdEMsR0FBRyxLQUFLLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtDQUM1QyxJQUFJLEtBQUssSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO0NBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDMUIsS0FBSztDQUNMLElBQUk7Q0FDSixHQUFHO0NBQ0gsRUFBRTtDQUNGLENBQUMsQ0FBQzs7Q0FFRixHQUFHLENBQUMsR0FBRyxDQUFD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QUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0NBQy9CO0NBQ0EsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDM0I7Q0FDQSxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQztDQUMzQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztDQUMvQixFQUFFOztDQUVGLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0NBRTFCLENBQUMsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtDQUMxQixFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDckIsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7Q0FDdEIsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQyxHQUFHLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ25DLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDNUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN6QixHQUFHO0NBQ0gsRUFBRTtDQUNGLENBQUMsQ0FBQzs7Q0FFRixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxT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QUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNWLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ1YsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDVixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ1YsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNWLEVBQUUsQ0FBQzs7Q0FFSCxDQUFDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztDQUN2QixDQUFDLElBQUksS0FBSyxHQUFHLFNBQVMsSUFBSSxHQUFHLENBQUM7Q0FDOUIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0NBQ3BELENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Q0FFekMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNsQixDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDOztDQUVwQixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFO0NBQzdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQzVDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzlELEVBQUU7O0NBRUYsQ0FBQyxDQUFDO0NBQ0YsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Q0FFcEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUU7Q0FDckQsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQ3pCLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztDQUM3QixDQUFDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0NBQzVCLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Q0FFbkIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7Q0FFL0I7Q0FDQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDO0NBQ2hDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDN0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUM3QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDdEIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNoQixDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7Q0FDbkIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDOztDQUVuQjtDQUNBO0NBQ0EsQ0FBQyxJQUFJ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SUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7Q0FDMUM7Q0FDQTtDQUNBLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2Y7Q0FDQSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQzs7Q0FFMUI7Q0FDQSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDMUIsRUFBRSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDM0MsRUFBRSxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQzs7Q0FFckMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRTtDQUN2QyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDeEIsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3hCLEdBQUcsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Q0FDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUNqQjtDQUNBLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDdkMsR0FBRyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENB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Q0FDM0IsRUFBRSxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7Q0FDaEIsRUFBRSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0NBQzFCLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDN0IsR0FBRyxNQUFNO0NBQ1QsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFOztDQUU3QixJQUFJLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3RGLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtDQUM1QixLQUFLLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZELEtBQUssTUFBTTtDQUNYLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtDQUMzQixNQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNsQyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzFCLE1BQU07Q0FDTixLQUFLLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDckIsS0FBSzs7Q0FFTCxJQUFJLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHO0NBQ3JELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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Q0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzVDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUMxQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3BELElBQUksT0FBTyxDQUFDLENBQUM7Q0FDYixLQUFJOztDQUVKLEdBQUcsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3BCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ25ELEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDckIsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pDLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbkMsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcs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QUM1QixFQUFFLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0NBQzdCLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7Q0FDdkIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUN0QixFQUFFLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0NBQzNCLEVBQUUsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDM0IsRUFBRSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztDQUM1QixFQUFFLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0NBQzdCLEVBQUUsZUFBZSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDaEMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0NBQ2pDLEVBQUUsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDN0IsRUFBRSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUMxQixFQUFFLGVBQWUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0NBQy9CLEVBQUUsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7Q0FDOUIsRUFBRSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztDQUM1QixFQUFFLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0NBQzVCLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDekIsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0NBQ2pDLEVBQUUsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7Q0FDMUIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztDQUN0QixFQUFFLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0NBQzNCLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDdEIsRUFBRSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztDQUM1QixFQUFFLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0NBQzVCLEVBQUUsZUFBZSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDaEMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztDQUMxQixFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0NBQ3pCLEVBQUUsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Q0FDM0IsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUN4QixFQUFFLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0NBQzVCLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDdkIsRUFBRSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztDQUM1QixFQUFFLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0NBQzVC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QyxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7Q0FDL0QsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRTtDQUMxQztDQUNBLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNoQyxDQUFDLE9BQU8sSUFBSSxFQUFFO0NBQ2QsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDM0IsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztDQUNuQixFQUFFO0NBQ0YsQ0FBQyxDQUFDOztDQUVGO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxLQUFLLEVBQUUsS0FBSyxFQUFFO0NBQzlELENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtDQUMzQixFQUFFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDaEMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFO0NBQ3JEO0NBQ0EsRUFBRSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3JEO0NBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRTtDQUN2QyxHQUFHLElBQUksUUFBUSxH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QUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDcEQsQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTtDQUMvQixFQUFFLEtBQUssQ0FBQztDQUNSLEdBQUcsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0NBQzlELEVBQUUsTUFBTTs7Q0FFUixFQUFFLEtBQUssQ0FBQztDQUNSLEdBQUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3RDLEdBQUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3RDLEdBQUcsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3RDLEVBQUUsTUFBTTs7Q0FFUixFQUFFLEtBQUssQ0FBQztDQUNSLEdBQUcsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztDQUNyRSxFQUFFLE1BQU07Q0FDUixFQUFFOztDQUVGLFFBQVEsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0NBQzVDLENBQUMsQ0FBQzs7QUMxc0tGLEtBQUksT0FBTyxHQUFHO0NBQ2QsSUFBSSxVQUFVLEVBQUUsbUNBQW1DO0NBQ25ELElBQUksUUFBUSxFQUFFLEVBQUU7Q0FD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LENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQztDQUM5QixLQUFLLEdBQUU7Q0FDUCxDQUFDOztBQUVELENBVUEsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUU7OztBQUc1QyxLQUFJLEtBQUssR0FBRyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUU7Q0FDMUcsUUFBUSxLQUFLLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxJQUFJLEdBQUc7Q0FDdEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFFO0NBQzFHLENBQUM7O0NBRUQsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEdBQUU7O0NBRWpCLElBQUksRUFBRTs7OzsifQ==
