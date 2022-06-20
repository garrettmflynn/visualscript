(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/prismjs/prism.js
  var require_prism = __commonJS({
    "node_modules/prismjs/prism.js"(exports, module) {
      var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
      var Prism2 = function(_self2) {
        var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
        var uniqueId = 0;
        var plainTextGrammar = {};
        var _3 = {
          manual: _self2.Prism && _self2.Prism.manual,
          disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
          util: {
            encode: function encode9(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode9(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode9);
              } else {
                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
              }
            },
            type: function(o12) {
              return Object.prototype.toString.call(o12).slice(8, -1);
            },
            objId: function(obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", { value: ++uniqueId });
              }
              return obj["__id"];
            },
            clone: function deepClone2(o12, visited) {
              visited = visited || {};
              var clone;
              var id;
              switch (_3.util.type(o12)) {
                case "Object":
                  id = _3.util.objId(o12);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = {};
                  visited[id] = clone;
                  for (var key in o12) {
                    if (o12.hasOwnProperty(key)) {
                      clone[key] = deepClone2(o12[key], visited);
                    }
                  }
                  return clone;
                case "Array":
                  id = _3.util.objId(o12);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = [];
                  visited[id] = clone;
                  o12.forEach(function(v3, i9) {
                    clone[i9] = deepClone2(v3, visited);
                  });
                  return clone;
                default:
                  return o12;
              }
            },
            getLanguage: function(element) {
              while (element) {
                var m3 = lang.exec(element.className);
                if (m3) {
                  return m3[1].toLowerCase();
                }
                element = element.parentElement;
              }
              return "none";
            },
            setLanguage: function(element, language) {
              element.className = element.className.replace(RegExp(lang, "gi"), "");
              element.classList.add("language-" + language);
            },
            currentScript: function() {
              if (typeof document === "undefined") {
                return null;
              }
              if ("currentScript" in document && 1 < 2) {
                return document.currentScript;
              }
              try {
                throw new Error();
              } catch (err2) {
                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err2.stack) || [])[1];
                if (src) {
                  var scripts = document.getElementsByTagName("script");
                  for (var i9 in scripts) {
                    if (scripts[i9].src == src) {
                      return scripts[i9];
                    }
                  }
                }
                return null;
              }
            },
            isActive: function(element, className, defaultActivation) {
              var no = "no-" + className;
              while (element) {
                var classList = element.classList;
                if (classList.contains(className)) {
                  return true;
                }
                if (classList.contains(no)) {
                  return false;
                }
                element = element.parentElement;
              }
              return !!defaultActivation;
            }
          },
          languages: {
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            extend: function(id, redef) {
              var lang2 = _3.util.clone(_3.languages[id]);
              for (var key in redef) {
                lang2[key] = redef[key];
              }
              return lang2;
            },
            insertBefore: function(inside, before, insert, root) {
              root = root || _3.languages;
              var grammar = root[inside];
              var ret = {};
              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }
                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }
              var old = root[inside];
              root[inside] = ret;
              _3.languages.DFS(_3.languages, function(key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });
              return ret;
            },
            DFS: function DFS(o12, callback, type7, visited) {
              visited = visited || {};
              var objId = _3.util.objId;
              for (var i9 in o12) {
                if (o12.hasOwnProperty(i9)) {
                  callback.call(o12, i9, o12[i9], type7 || i9);
                  var property = o12[i9];
                  var propertyType = _3.util.type(property);
                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === "Array" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i9, visited);
                  }
                }
              }
            }
          },
          plugins: {},
          highlightAll: function(async, callback) {
            _3.highlightAllUnder(document, async, callback);
          },
          highlightAllUnder: function(container, async, callback) {
            var env = {
              callback,
              container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _3.hooks.run("before-highlightall", env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _3.hooks.run("before-all-elements-highlight", env);
            for (var i9 = 0, element; element = env.elements[i9++]; ) {
              _3.highlightElement(element, async === true, env.callback);
            }
          },
          highlightElement: function(element, async, callback) {
            var language = _3.util.getLanguage(element);
            var grammar = _3.languages[language];
            _3.util.setLanguage(element, language);
            var parent2 = element.parentElement;
            if (parent2 && parent2.nodeName.toLowerCase() === "pre") {
              _3.util.setLanguage(parent2, language);
            }
            var code = element.textContent;
            var env = {
              element,
              language,
              grammar,
              code
            };
            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;
              _3.hooks.run("before-insert", env);
              env.element.innerHTML = env.highlightedCode;
              _3.hooks.run("after-highlight", env);
              _3.hooks.run("complete", env);
              callback && callback.call(env.element);
            }
            _3.hooks.run("before-sanity-check", env);
            parent2 = env.element.parentElement;
            if (parent2 && parent2.nodeName.toLowerCase() === "pre" && !parent2.hasAttribute("tabindex")) {
              parent2.setAttribute("tabindex", "0");
            }
            if (!env.code) {
              _3.hooks.run("complete", env);
              callback && callback.call(env.element);
              return;
            }
            _3.hooks.run("before-highlight", env);
            if (!env.grammar) {
              insertHighlightedCode(_3.util.encode(env.code));
              return;
            }
            if (async && _self2.Worker) {
              var worker = new Worker(_3.filename);
              worker.onmessage = function(evt) {
                insertHighlightedCode(evt.data);
              };
              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_3.highlight(env.code, env.grammar, env.language));
            }
          },
          highlight: function(text, grammar, language) {
            var env = {
              code: text,
              grammar,
              language
            };
            _3.hooks.run("before-tokenize", env);
            if (!env.grammar) {
              throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _3.tokenize(env.code, env.grammar);
            _3.hooks.run("after-tokenize", env);
            return Token.stringify(_3.util.encode(env.tokens), env.language);
          },
          tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }
              delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },
          hooks: {
            all: {},
            add: function(name2, callback) {
              var hooks = _3.hooks.all;
              hooks[name2] = hooks[name2] || [];
              hooks[name2].push(callback);
            },
            run: function(name2, env) {
              var callbacks = _3.hooks.all[name2];
              if (!callbacks || !callbacks.length) {
                return;
              }
              for (var i9 = 0, callback; callback = callbacks[i9++]; ) {
                callback(env);
              }
            }
          },
          Token
        };
        _self2.Prism = _3;
        function Token(type7, content, alias, matchedStr) {
          this.type = type7;
          this.content = content;
          this.alias = alias;
          this.length = (matchedStr || "").length | 0;
        }
        Token.stringify = function stringify(o12, language) {
          if (typeof o12 == "string") {
            return o12;
          }
          if (Array.isArray(o12)) {
            var s10 = "";
            o12.forEach(function(e11) {
              s10 += stringify(e11, language);
            });
            return s10;
          }
          var env = {
            type: o12.type,
            content: stringify(o12.content, language),
            tag: "span",
            classes: ["token", o12.type],
            attributes: {},
            language
          };
          var aliases = o12.alias;
          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }
          _3.hooks.run("wrap", env);
          var attributes = "";
          for (var name2 in env.attributes) {
            attributes += " " + name2 + '="' + (env.attributes[name2] || "").replace(/"/g, "&quot;") + '"';
          }
          return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
        };
        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (match && lookbehind && match[1]) {
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          return match;
        }
        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];
            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j) {
                return;
              }
              var patternObj = patterns[j];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;
              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }
              var pattern = patternObj.pattern || patternObj;
              for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }
                var str = currentNode.value;
                if (tokenList.length > text.length) {
                  return;
                }
                if (str instanceof Token) {
                  continue;
                }
                var removeCount = 1;
                var match;
                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);
                  if (!match || match.index >= text.length) {
                    break;
                  }
                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p3 = pos;
                  p3 += currentNode.value.length;
                  while (from >= p3) {
                    currentNode = currentNode.next;
                    p3 += currentNode.value.length;
                  }
                  p3 -= currentNode.value.length;
                  pos = p3;
                  if (currentNode.value instanceof Token) {
                    continue;
                  }
                  for (var k3 = currentNode; k3 !== tokenList.tail && (p3 < to || typeof k3.value === "string"); k3 = k3.next) {
                    removeCount++;
                    p3 += k3.value.length;
                  }
                  removeCount--;
                  str = text.slice(pos, p3);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);
                  if (!match) {
                    continue;
                  }
                }
                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);
                var reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }
                var removeFrom = currentNode.prev;
                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }
                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _3.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);
                if (after) {
                  addAfter(tokenList, currentNode, after);
                }
                if (removeCount > 1) {
                  var nestedRematch = {
                    cause: token + "," + j,
                    reach
                  };
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }
        function LinkedList() {
          var head = { value: null, prev: null, next: null };
          var tail = { value: null, prev: head, next: null };
          head.next = tail;
          this.head = head;
          this.tail = tail;
          this.length = 0;
        }
        function addAfter(list, node, value) {
          var next = node.next;
          var newNode = { value, prev: node, next };
          node.next = newNode;
          next.prev = newNode;
          list.length++;
          return newNode;
        }
        function removeRange(list, node, count) {
          var next = node.next;
          for (var i9 = 0; i9 < count && next !== list.tail; i9++) {
            next = next.next;
          }
          node.next = next;
          next.prev = node;
          list.length -= i9;
        }
        function toArray(list) {
          var array = [];
          var node = list.head.next;
          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }
          return array;
        }
        if (!_self2.document) {
          if (!_self2.addEventListener) {
            return _3;
          }
          if (!_3.disableWorkerMessageHandler) {
            _self2.addEventListener("message", function(evt) {
              var message = JSON.parse(evt.data);
              var lang2 = message.language;
              var code = message.code;
              var immediateClose = message.immediateClose;
              _self2.postMessage(_3.highlight(code, _3.languages[lang2], lang2));
              if (immediateClose) {
                _self2.close();
              }
            }, false);
          }
          return _3;
        }
        var script = _3.util.currentScript();
        if (script) {
          _3.filename = script.src;
          if (script.hasAttribute("data-manual")) {
            _3.manual = true;
          }
        }
        function highlightAutomaticallyCallback() {
          if (!_3.manual) {
            _3.highlightAll();
          }
        }
        if (!_3.manual) {
          var readyState = document.readyState;
          if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
            document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }
        return _3;
      }(_self);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Prism2;
      }
      if (typeof global !== "undefined") {
        global.Prism = Prism2;
      }
      Prism2.languages.markup = {
        "comment": {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true
        },
        "prolog": {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true
        },
        "doctype": {
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null
            },
            "string": {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
          }
        },
        "cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true
        },
        "tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            "tag": {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                "punctuation": /^<\/?/,
                "namespace": /^[^\s>\/:]+:/
              }
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            },
            "punctuation": /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                "namespace": /^[^\s>\/:]+:/
              }
            }
          }
        },
        "entity": [
          {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
          },
          /&#x?[\da-f]{1,8};/i
        ]
      };
      Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
      Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
      Prism2.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism2.languages[lang]
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism2.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
              return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside
          };
          Prism2.languages.insertBefore("markup", "cdata", def);
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
        value: function(attrName, lang) {
          Prism2.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  "value": {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism2.languages[lang]
                  },
                  "punctuation": [
                    {
                      pattern: /^=/,
                      alias: "attr-equals"
                    },
                    /"|'/
                  ]
                }
              }
            }
          });
        }
      });
      Prism2.languages.html = Prism2.languages.markup;
      Prism2.languages.mathml = Prism2.languages.markup;
      Prism2.languages.svg = Prism2.languages.markup;
      Prism2.languages.xml = Prism2.languages.extend("markup", {});
      Prism2.languages.ssml = Prism2.languages.xml;
      Prism2.languages.atom = Prism2.languages.xml;
      Prism2.languages.rss = Prism2.languages.xml;
      (function(Prism3) {
        var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        Prism3.languages.css = {
          "comment": /\/\*[\s\S]*?\*\//,
          "atrule": {
            pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
            inside: {
              "rule": /^@[\w-]+/,
              "selector-function-argument": {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector"
              },
              "keyword": {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              }
            }
          },
          "url": {
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
              "function": /^url/i,
              "punctuation": /^\(|\)$/,
              "string": {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url"
              }
            }
          },
          "selector": {
            pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
          },
          "string": {
            pattern: string,
            greedy: true
          },
          "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
          },
          "important": /!important\b/i,
          "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
          },
          "punctuation": /[(){};:,]/
        };
        Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
        var markup = Prism3.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism2);
      Prism2.languages.clike = {
        "comment": [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        "string": {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            "punctuation": /[.\\]/
          }
        },
        "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        "boolean": /\b(?:false|true)\b/,
        "function": /\b\w+(?=\()/,
        "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        "punctuation": /[{}[\];(),.:]/
      };
      Prism2.languages.javascript = Prism2.languages.extend("clike", {
        "class-name": [
          Prism2.languages.clike["class-name"],
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
          }
        ],
        "keyword": [
          {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
          },
          {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
          }
        ],
        "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        "number": {
          pattern: RegExp(/(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source),
          lookbehind: true
        },
        "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
      Prism2.languages.insertBefore("javascript", "keyword", {
        "regex": {
          pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism2.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
          }
        },
        "function-variable": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function"
        },
        "parameter": [
          {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          }
        ],
        "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism2.languages.insertBefore("javascript", "string", {
        "hashbang": {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment"
        },
        "template-string": {
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "interpolation": {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                rest: Prism2.languages.javascript
              }
            },
            "string": /[\s\S]+/
          }
        },
        "string-property": {
          pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property"
        }
      });
      Prism2.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property"
        }
      });
      if (Prism2.languages.markup) {
        Prism2.languages.markup.tag.addInlined("script", "javascript");
        Prism2.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
      }
      Prism2.languages.js = Prism2.languages.javascript;
      (function() {
        if (typeof Prism2 === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        var LOADING_MESSAGE = "Loading\u2026";
        var FAILURE_MESSAGE = function(status, message) {
          return "\u2716 Error " + status + " while fetching file: " + message;
        };
        var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
        var EXTENSIONS = {
          "js": "javascript",
          "py": "python",
          "rb": "ruby",
          "ps1": "powershell",
          "psm1": "powershell",
          "sh": "bash",
          "bat": "batch",
          "h": "c",
          "tex": "latex"
        };
        var STATUS_ATTR = "data-src-status";
        var STATUS_LOADING = "loading";
        var STATUS_LOADED = "loaded";
        var STATUS_FAILED = "failed";
        var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
        function loadFile(src, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                success(xhr.responseText);
              } else {
                if (xhr.status >= 400) {
                  error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                } else {
                  error(FAILURE_EMPTY_MESSAGE);
                }
              }
            }
          };
          xhr.send(null);
        }
        function parseRange(range) {
          var m3 = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
          if (m3) {
            var start = Number(m3[1]);
            var comma = m3[2];
            var end = m3[3];
            if (!comma) {
              return [start, start];
            }
            if (!end) {
              return [start, void 0];
            }
            return [start, Number(end)];
          }
          return void 0;
        }
        Prism2.hooks.add("before-highlightall", function(env) {
          env.selector += ", " + SELECTOR;
        });
        Prism2.hooks.add("before-sanity-check", function(env) {
          var pre = env.element;
          if (pre.matches(SELECTOR)) {
            env.code = "";
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
            var code = pre.appendChild(document.createElement("CODE"));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute("data-src");
            var language = env.language;
            if (language === "none") {
              var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
              language = EXTENSIONS[extension] || extension;
            }
            Prism2.util.setLanguage(code, language);
            Prism2.util.setLanguage(pre, language);
            var autoloader = Prism2.plugins.autoloader;
            if (autoloader) {
              autoloader.loadLanguages(language);
            }
            loadFile(src, function(text) {
              pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
              var range = parseRange(pre.getAttribute("data-range"));
              if (range) {
                var lines = text.split(/\r\n?|\n/g);
                var start = range[0];
                var end = range[1] == null ? lines.length : range[1];
                if (start < 0) {
                  start += lines.length;
                }
                start = Math.max(0, Math.min(start - 1, lines.length));
                if (end < 0) {
                  end += lines.length;
                }
                end = Math.max(0, Math.min(end, lines.length));
                text = lines.slice(start, end).join("\n");
                if (!pre.hasAttribute("data-start")) {
                  pre.setAttribute("data-start", String(start + 1));
                }
              }
              code.textContent = text;
              Prism2.highlightElement(code);
            }, function(error) {
              pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
              code.textContent = error;
            });
          }
        });
        Prism2.plugins.fileHighlight = {
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for (var i9 = 0, element; element = elements[i9++]; ) {
              Prism2.highlightElement(element);
            }
          }
        };
        var logged = false;
        Prism2.fileHighlight = function() {
          if (!logged) {
            console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
            logged = true;
          }
          Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();
    }
  });

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var e = Symbol();
  var n = /* @__PURE__ */ new Map();
  var s = class {
    constructor(t7, n12) {
      if (this._$cssResult$ = true, n12 !== e)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7;
    }
    get styleSheet() {
      let e11 = n.get(this.cssText);
      return t && e11 === void 0 && (n.set(this.cssText, e11 = new CSSStyleSheet()), e11.replaceSync(this.cssText)), e11;
    }
    toString() {
      return this.cssText;
    }
  };
  var o = (t7) => new s(typeof t7 == "string" ? t7 : t7 + "", e);
  var r = (t7, ...n12) => {
    const o12 = t7.length === 1 ? t7[0] : n12.reduce((e11, n13, s10) => e11 + ((t8) => {
      if (t8._$cssResult$ === true)
        return t8.cssText;
      if (typeof t8 == "number")
        return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(n13) + t7[s10 + 1], t7[0]);
    return new s(o12, e);
  };
  var i = (e11, n12) => {
    t ? e11.adoptedStyleSheets = n12.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet) : n12.forEach((t7) => {
      const n13 = document.createElement("style"), s10 = window.litNonce;
      s10 !== void 0 && n13.setAttribute("nonce", s10), n13.textContent = t7.cssText, e11.appendChild(n13);
    });
  };
  var S = t ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e11 = "";
    for (const n12 of t8.cssRules)
      e11 += n12.cssText;
    return o(e11);
  })(t7) : t7;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window.trustedTypes;
  var r2 = e2 ? e2.emptyScript : "";
  var h = window.reactiveElementPolyfillSupport;
  var o2 = { toAttribute(t7, i9) {
    switch (i9) {
      case Boolean:
        t7 = t7 ? r2 : null;
        break;
      case Object:
      case Array:
        t7 = t7 == null ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, i9) {
    let s10 = t7;
    switch (i9) {
      case Boolean:
        s10 = t7 !== null;
        break;
      case Number:
        s10 = t7 === null ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          s10 = JSON.parse(t7);
        } catch (t8) {
          s10 = null;
        }
    }
    return s10;
  } };
  var n2 = (t7, i9) => i9 !== t7 && (i9 == i9 || t7 == t7);
  var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
  var a = class extends HTMLElement {
    constructor() {
      super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
    }
    static addInitializer(t7) {
      var i9;
      (i9 = this.l) !== null && i9 !== void 0 || (this.l = []), this.l.push(t7);
    }
    static get observedAttributes() {
      this.finalize();
      const t7 = [];
      return this.elementProperties.forEach((i9, s10) => {
        const e11 = this._$Eh(s10, i9);
        e11 !== void 0 && (this._$Eu.set(e11, s10), t7.push(e11));
      }), t7;
    }
    static createProperty(t7, i9 = l) {
      if (i9.state && (i9.attribute = false), this.finalize(), this.elementProperties.set(t7, i9), !i9.noAccessor && !this.prototype.hasOwnProperty(t7)) {
        const s10 = typeof t7 == "symbol" ? Symbol() : "__" + t7, e11 = this.getPropertyDescriptor(t7, s10, i9);
        e11 !== void 0 && Object.defineProperty(this.prototype, t7, e11);
      }
    }
    static getPropertyDescriptor(t7, i9, s10) {
      return { get() {
        return this[i9];
      }, set(e11) {
        const r10 = this[t7];
        this[i9] = e11, this.requestUpdate(t7, r10, s10);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t7 = Object.getPrototypeOf(this);
      if (t7.finalize(), this.elementProperties = new Map(t7.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t8 = this.properties, i9 = [...Object.getOwnPropertyNames(t8), ...Object.getOwnPropertySymbols(t8)];
        for (const s10 of i9)
          this.createProperty(s10, t8[s10]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i9) {
      const s10 = [];
      if (Array.isArray(i9)) {
        const e11 = new Set(i9.flat(1 / 0).reverse());
        for (const i10 of e11)
          s10.unshift(S(i10));
      } else
        i9 !== void 0 && s10.push(S(i9));
      return s10;
    }
    static _$Eh(t7, i9) {
      const s10 = i9.attribute;
      return s10 === false ? void 0 : typeof s10 == "string" ? s10 : typeof t7 == "string" ? t7.toLowerCase() : void 0;
    }
    o() {
      var t7;
      this._$Ep = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t7 = this.constructor.l) === null || t7 === void 0 || t7.forEach((t8) => t8(this));
    }
    addController(t7) {
      var i9, s10;
      ((i9 = this._$Eg) !== null && i9 !== void 0 ? i9 : this._$Eg = []).push(t7), this.renderRoot !== void 0 && this.isConnected && ((s10 = t7.hostConnected) === null || s10 === void 0 || s10.call(t7));
    }
    removeController(t7) {
      var i9;
      (i9 = this._$Eg) === null || i9 === void 0 || i9.splice(this._$Eg.indexOf(t7) >>> 0, 1);
    }
    _$Em() {
      this.constructor.elementProperties.forEach((t7, i9) => {
        this.hasOwnProperty(i9) && (this._$Et.set(i9, this[i9]), delete this[i9]);
      });
    }
    createRenderRoot() {
      var t7;
      const s10 = (t7 = this.shadowRoot) !== null && t7 !== void 0 ? t7 : this.attachShadow(this.constructor.shadowRootOptions);
      return i(s10, this.constructor.elementStyles), s10;
    }
    connectedCallback() {
      var t7;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t7 = this._$Eg) === null || t7 === void 0 || t7.forEach((t8) => {
        var i9;
        return (i9 = t8.hostConnected) === null || i9 === void 0 ? void 0 : i9.call(t8);
      });
    }
    enableUpdating(t7) {
    }
    disconnectedCallback() {
      var t7;
      (t7 = this._$Eg) === null || t7 === void 0 || t7.forEach((t8) => {
        var i9;
        return (i9 = t8.hostDisconnected) === null || i9 === void 0 ? void 0 : i9.call(t8);
      });
    }
    attributeChangedCallback(t7, i9, s10) {
      this._$AK(t7, s10);
    }
    _$ES(t7, i9, s10 = l) {
      var e11, r10;
      const h8 = this.constructor._$Eh(t7, s10);
      if (h8 !== void 0 && s10.reflect === true) {
        const n12 = ((r10 = (e11 = s10.converter) === null || e11 === void 0 ? void 0 : e11.toAttribute) !== null && r10 !== void 0 ? r10 : o2.toAttribute)(i9, s10.type);
        this._$Ei = t7, n12 == null ? this.removeAttribute(h8) : this.setAttribute(h8, n12), this._$Ei = null;
      }
    }
    _$AK(t7, i9) {
      var s10, e11, r10;
      const h8 = this.constructor, n12 = h8._$Eu.get(t7);
      if (n12 !== void 0 && this._$Ei !== n12) {
        const t8 = h8.getPropertyOptions(n12), l9 = t8.converter, a5 = (r10 = (e11 = (s10 = l9) === null || s10 === void 0 ? void 0 : s10.fromAttribute) !== null && e11 !== void 0 ? e11 : typeof l9 == "function" ? l9 : null) !== null && r10 !== void 0 ? r10 : o2.fromAttribute;
        this._$Ei = n12, this[n12] = a5(i9, t8.type), this._$Ei = null;
      }
    }
    requestUpdate(t7, i9, s10) {
      let e11 = true;
      t7 !== void 0 && (((s10 = s10 || this.constructor.getPropertyOptions(t7)).hasChanged || n2)(this[t7], i9) ? (this._$AL.has(t7) || this._$AL.set(t7, i9), s10.reflect === true && this._$Ei !== t7 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t7, s10))) : e11 = false), !this.isUpdatePending && e11 && (this._$Ep = this._$E_());
    }
    async _$E_() {
      this.isUpdatePending = true;
      try {
        await this._$Ep;
      } catch (t8) {
        Promise.reject(t8);
      }
      const t7 = this.scheduleUpdate();
      return t7 != null && await t7, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t7;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Et && (this._$Et.forEach((t8, i10) => this[i10] = t8), this._$Et = void 0);
      let i9 = false;
      const s10 = this._$AL;
      try {
        i9 = this.shouldUpdate(s10), i9 ? (this.willUpdate(s10), (t7 = this._$Eg) === null || t7 === void 0 || t7.forEach((t8) => {
          var i10;
          return (i10 = t8.hostUpdate) === null || i10 === void 0 ? void 0 : i10.call(t8);
        }), this.update(s10)) : this._$EU();
      } catch (t8) {
        throw i9 = false, this._$EU(), t8;
      }
      i9 && this._$AE(s10);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      var i9;
      (i9 = this._$Eg) === null || i9 === void 0 || i9.forEach((t8) => {
        var i10;
        return (i10 = t8.hostUpdated) === null || i10 === void 0 ? void 0 : i10.call(t8);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$Ep;
    }
    shouldUpdate(t7) {
      return true;
    }
    update(t7) {
      this._$EC !== void 0 && (this._$EC.forEach((t8, i9) => this._$ES(i9, this[i9], t8)), this._$EC = void 0), this._$EU();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, h == null || h({ ReactiveElement: a }), ((s2 = globalThis.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : globalThis.reactiveElementVersions = []).push("1.3.1");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = globalThis.trustedTypes;
  var s3 = i2 ? i2.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var e3 = `lit$${(Math.random() + "").slice(9)}$`;
  var o3 = "?" + e3;
  var n3 = `<${o3}>`;
  var l2 = document;
  var h2 = (t7 = "") => l2.createComment(t7);
  var r3 = (t7) => t7 === null || typeof t7 != "object" && typeof t7 != "function";
  var d = Array.isArray;
  var u = (t7) => {
    var i9;
    return d(t7) || typeof ((i9 = t7) === null || i9 === void 0 ? void 0 : i9[Symbol.iterator]) == "function";
  };
  var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var a2 = />/g;
  var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
  var _ = /'/g;
  var m = /"/g;
  var g = /^(?:script|style|textarea|title)$/i;
  var p = (t7) => (i9, ...s10) => ({ _$litType$: t7, strings: i9, values: s10 });
  var $ = p(1);
  var y = p(2);
  var b = Symbol.for("lit-noChange");
  var w = Symbol.for("lit-nothing");
  var T = /* @__PURE__ */ new WeakMap();
  var x = (t7, i9, s10) => {
    var e11, o12;
    const n12 = (e11 = s10 == null ? void 0 : s10.renderBefore) !== null && e11 !== void 0 ? e11 : i9;
    let l9 = n12._$litPart$;
    if (l9 === void 0) {
      const t8 = (o12 = s10 == null ? void 0 : s10.renderBefore) !== null && o12 !== void 0 ? o12 : null;
      n12._$litPart$ = l9 = new N(i9.insertBefore(h2(), t8), t8, void 0, s10 != null ? s10 : {});
    }
    return l9._$AI(t7), l9;
  };
  var A = l2.createTreeWalker(l2, 129, null, false);
  var C = (t7, i9) => {
    const o12 = t7.length - 1, l9 = [];
    let h8, r10 = i9 === 2 ? "<svg>" : "", d4 = c;
    for (let i10 = 0; i10 < o12; i10++) {
      const s10 = t7[i10];
      let o13, u4, p3 = -1, $3 = 0;
      for (; $3 < s10.length && (d4.lastIndex = $3, u4 = d4.exec(s10), u4 !== null); )
        $3 = d4.lastIndex, d4 === c ? u4[1] === "!--" ? d4 = v : u4[1] !== void 0 ? d4 = a2 : u4[2] !== void 0 ? (g.test(u4[2]) && (h8 = RegExp("</" + u4[2], "g")), d4 = f) : u4[3] !== void 0 && (d4 = f) : d4 === f ? u4[0] === ">" ? (d4 = h8 != null ? h8 : c, p3 = -1) : u4[1] === void 0 ? p3 = -2 : (p3 = d4.lastIndex - u4[2].length, o13 = u4[1], d4 = u4[3] === void 0 ? f : u4[3] === '"' ? m : _) : d4 === m || d4 === _ ? d4 = f : d4 === v || d4 === a2 ? d4 = c : (d4 = f, h8 = void 0);
      const y3 = d4 === f && t7[i10 + 1].startsWith("/>") ? " " : "";
      r10 += d4 === c ? s10 + n3 : p3 >= 0 ? (l9.push(o13), s10.slice(0, p3) + "$lit$" + s10.slice(p3) + e3 + y3) : s10 + e3 + (p3 === -2 ? (l9.push(void 0), i10) : y3);
    }
    const u3 = r10 + (t7[o12] || "<?>") + (i9 === 2 ? "</svg>" : "");
    if (!Array.isArray(t7) || !t7.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [s3 !== void 0 ? s3.createHTML(u3) : u3, l9];
  };
  var E = class {
    constructor({ strings: t7, _$litType$: s10 }, n12) {
      let l9;
      this.parts = [];
      let r10 = 0, d4 = 0;
      const u3 = t7.length - 1, c4 = this.parts, [v3, a5] = C(t7, s10);
      if (this.el = E.createElement(v3, n12), A.currentNode = this.el.content, s10 === 2) {
        const t8 = this.el.content, i9 = t8.firstChild;
        i9.remove(), t8.append(...i9.childNodes);
      }
      for (; (l9 = A.nextNode()) !== null && c4.length < u3; ) {
        if (l9.nodeType === 1) {
          if (l9.hasAttributes()) {
            const t8 = [];
            for (const i9 of l9.getAttributeNames())
              if (i9.endsWith("$lit$") || i9.startsWith(e3)) {
                const s11 = a5[d4++];
                if (t8.push(i9), s11 !== void 0) {
                  const t9 = l9.getAttribute(s11.toLowerCase() + "$lit$").split(e3), i10 = /([.?@])?(.*)/.exec(s11);
                  c4.push({ type: 1, index: r10, name: i10[2], strings: t9, ctor: i10[1] === "." ? M : i10[1] === "?" ? H : i10[1] === "@" ? I : S2 });
                } else
                  c4.push({ type: 6, index: r10 });
              }
            for (const i9 of t8)
              l9.removeAttribute(i9);
          }
          if (g.test(l9.tagName)) {
            const t8 = l9.textContent.split(e3), s11 = t8.length - 1;
            if (s11 > 0) {
              l9.textContent = i2 ? i2.emptyScript : "";
              for (let i9 = 0; i9 < s11; i9++)
                l9.append(t8[i9], h2()), A.nextNode(), c4.push({ type: 2, index: ++r10 });
              l9.append(t8[s11], h2());
            }
          }
        } else if (l9.nodeType === 8)
          if (l9.data === o3)
            c4.push({ type: 2, index: r10 });
          else {
            let t8 = -1;
            for (; (t8 = l9.data.indexOf(e3, t8 + 1)) !== -1; )
              c4.push({ type: 7, index: r10 }), t8 += e3.length - 1;
          }
        r10++;
      }
    }
    static createElement(t7, i9) {
      const s10 = l2.createElement("template");
      return s10.innerHTML = t7, s10;
    }
  };
  function P(t7, i9, s10 = t7, e11) {
    var o12, n12, l9, h8;
    if (i9 === b)
      return i9;
    let d4 = e11 !== void 0 ? (o12 = s10._$Cl) === null || o12 === void 0 ? void 0 : o12[e11] : s10._$Cu;
    const u3 = r3(i9) ? void 0 : i9._$litDirective$;
    return (d4 == null ? void 0 : d4.constructor) !== u3 && ((n12 = d4 == null ? void 0 : d4._$AO) === null || n12 === void 0 || n12.call(d4, false), u3 === void 0 ? d4 = void 0 : (d4 = new u3(t7), d4._$AT(t7, s10, e11)), e11 !== void 0 ? ((l9 = (h8 = s10)._$Cl) !== null && l9 !== void 0 ? l9 : h8._$Cl = [])[e11] = d4 : s10._$Cu = d4), d4 !== void 0 && (i9 = P(t7, d4._$AS(t7, i9.values), d4, e11)), i9;
  }
  var V = class {
    constructor(t7, i9) {
      this.v = [], this._$AN = void 0, this._$AD = t7, this._$AM = i9;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    p(t7) {
      var i9;
      const { el: { content: s10 }, parts: e11 } = this._$AD, o12 = ((i9 = t7 == null ? void 0 : t7.creationScope) !== null && i9 !== void 0 ? i9 : l2).importNode(s10, true);
      A.currentNode = o12;
      let n12 = A.nextNode(), h8 = 0, r10 = 0, d4 = e11[0];
      for (; d4 !== void 0; ) {
        if (h8 === d4.index) {
          let i10;
          d4.type === 2 ? i10 = new N(n12, n12.nextSibling, this, t7) : d4.type === 1 ? i10 = new d4.ctor(n12, d4.name, d4.strings, this, t7) : d4.type === 6 && (i10 = new L(n12, this, t7)), this.v.push(i10), d4 = e11[++r10];
        }
        h8 !== (d4 == null ? void 0 : d4.index) && (n12 = A.nextNode(), h8++);
      }
      return o12;
    }
    m(t7) {
      let i9 = 0;
      for (const s10 of this.v)
        s10 !== void 0 && (s10.strings !== void 0 ? (s10._$AI(t7, s10, i9), i9 += s10.strings.length - 2) : s10._$AI(t7[i9])), i9++;
    }
  };
  var N = class {
    constructor(t7, i9, s10, e11) {
      var o12;
      this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t7, this._$AB = i9, this._$AM = s10, this.options = e11, this._$Cg = (o12 = e11 == null ? void 0 : e11.isConnected) === null || o12 === void 0 || o12;
    }
    get _$AU() {
      var t7, i9;
      return (i9 = (t7 = this._$AM) === null || t7 === void 0 ? void 0 : t7._$AU) !== null && i9 !== void 0 ? i9 : this._$Cg;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i9 = this._$AM;
      return i9 !== void 0 && t7.nodeType === 11 && (t7 = i9.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i9 = this) {
      t7 = P(this, t7, i9), r3(t7) ? t7 === w || t7 == null || t7 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t7 !== this._$AH && t7 !== b && this.$(t7) : t7._$litType$ !== void 0 ? this.T(t7) : t7.nodeType !== void 0 ? this.k(t7) : u(t7) ? this.S(t7) : this.$(t7);
    }
    A(t7, i9 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t7, i9);
    }
    k(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.A(t7));
    }
    $(t7) {
      this._$AH !== w && r3(this._$AH) ? this._$AA.nextSibling.data = t7 : this.k(l2.createTextNode(t7)), this._$AH = t7;
    }
    T(t7) {
      var i9;
      const { values: s10, _$litType$: e11 } = t7, o12 = typeof e11 == "number" ? this._$AC(t7) : (e11.el === void 0 && (e11.el = E.createElement(e11.h, this.options)), e11);
      if (((i9 = this._$AH) === null || i9 === void 0 ? void 0 : i9._$AD) === o12)
        this._$AH.m(s10);
      else {
        const t8 = new V(o12, this), i10 = t8.p(this.options);
        t8.m(s10), this.k(i10), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i9 = T.get(t7.strings);
      return i9 === void 0 && T.set(t7.strings, i9 = new E(t7)), i9;
    }
    S(t7) {
      d(this._$AH) || (this._$AH = [], this._$AR());
      const i9 = this._$AH;
      let s10, e11 = 0;
      for (const o12 of t7)
        e11 === i9.length ? i9.push(s10 = new N(this.A(h2()), this.A(h2()), this, this.options)) : s10 = i9[e11], s10._$AI(o12), e11++;
      e11 < i9.length && (this._$AR(s10 && s10._$AB.nextSibling, e11), i9.length = e11);
    }
    _$AR(t7 = this._$AA.nextSibling, i9) {
      var s10;
      for ((s10 = this._$AP) === null || s10 === void 0 || s10.call(this, false, true, i9); t7 && t7 !== this._$AB; ) {
        const i10 = t7.nextSibling;
        t7.remove(), t7 = i10;
      }
    }
    setConnected(t7) {
      var i9;
      this._$AM === void 0 && (this._$Cg = t7, (i9 = this._$AP) === null || i9 === void 0 || i9.call(this, t7));
    }
  };
  var S2 = class {
    constructor(t7, i9, s10, e11, o12) {
      this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t7, this.name = i9, this._$AM = e11, this.options = o12, s10.length > 2 || s10[0] !== "" || s10[1] !== "" ? (this._$AH = Array(s10.length - 1).fill(new String()), this.strings = s10) : this._$AH = w;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7, i9 = this, s10, e11) {
      const o12 = this.strings;
      let n12 = false;
      if (o12 === void 0)
        t7 = P(this, t7, i9, 0), n12 = !r3(t7) || t7 !== this._$AH && t7 !== b, n12 && (this._$AH = t7);
      else {
        const e12 = t7;
        let l9, h8;
        for (t7 = o12[0], l9 = 0; l9 < o12.length - 1; l9++)
          h8 = P(this, e12[s10 + l9], i9, l9), h8 === b && (h8 = this._$AH[l9]), n12 || (n12 = !r3(h8) || h8 !== this._$AH[l9]), h8 === w ? t7 = w : t7 !== w && (t7 += (h8 != null ? h8 : "") + o12[l9 + 1]), this._$AH[l9] = h8;
      }
      n12 && !e11 && this.C(t7);
    }
    C(t7) {
      t7 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 != null ? t7 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    C(t7) {
      this.element[this.name] = t7 === w ? void 0 : t7;
    }
  };
  var k = i2 ? i2.emptyScript : "";
  var H = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    C(t7) {
      t7 && t7 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }
  };
  var I = class extends S2 {
    constructor(t7, i9, s10, e11, o12) {
      super(t7, i9, s10, e11, o12), this.type = 5;
    }
    _$AI(t7, i9 = this) {
      var s10;
      if ((t7 = (s10 = P(this, t7, i9, 0)) !== null && s10 !== void 0 ? s10 : w) === b)
        return;
      const e11 = this._$AH, o12 = t7 === w && e11 !== w || t7.capture !== e11.capture || t7.once !== e11.once || t7.passive !== e11.passive, n12 = t7 !== w && (e11 === w || o12);
      o12 && this.element.removeEventListener(this.name, this, e11), n12 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      var i9, s10;
      typeof this._$AH == "function" ? this._$AH.call((s10 = (i9 = this.options) === null || i9 === void 0 ? void 0 : i9.host) !== null && s10 !== void 0 ? s10 : this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var L = class {
    constructor(t7, i9, s10) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i9, this.options = s10;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      P(this, t7);
    }
  };
  var R = { P: "$lit$", L: e3, V: o3, I: 1, N: C, R: V, D: u, j: P, H: N, O: S2, F: H, B: I, W: M, Z: L };
  var z = window.litHtmlPolyfillSupport;
  z == null || z(E, N), ((t2 = globalThis.litHtmlVersions) !== null && t2 !== void 0 ? t2 : globalThis.litHtmlVersions = []).push("2.2.1");

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends a {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
    }
    createRenderRoot() {
      var t7, e11;
      const i9 = super.createRenderRoot();
      return (t7 = (e11 = this.renderOptions).renderBefore) !== null && t7 !== void 0 || (e11.renderBefore = i9.firstChild), i9;
    }
    update(t7) {
      const i9 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Dt = x(i9, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t7;
      super.connectedCallback(), (t7 = this._$Dt) === null || t7 === void 0 || t7.setConnected(true);
    }
    disconnectedCallback() {
      var t7;
      super.disconnectedCallback(), (t7 = this._$Dt) === null || t7 === void 0 || t7.setConnected(false);
    }
    render() {
      return b;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === void 0 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  n4 == null || n4({ LitElement: s4 });
  ((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.2.0");

  // src/components/streams/audio/Volume.ts
  var Volume = class extends s4 {
    constructor(props = {}) {
      super();
      this.volume = props.volume ?? 0;
      this.backgroundColor = props.backgroundColor ?? "#69ce2b";
      this.count = props.count ?? 10;
    }
    static get styles() {
      return r`

      :host {
        width: 100%;
      }

      #wrapper{
        width: 100%;
      }

      `;
    }
    static get properties() {
      return {
        volume: {
          type: Number
        },
        count: {
          type: Number
        },
        backgroundColor: {
          type: String,
          reflect: true
        }
      };
    }
    willUpdate(changedProps) {
      if (changedProps.has("volume")) {
        if (!this.volume || this.volume < 0)
          this.volume = 0;
        else if (this.volume > 1)
          this.volume = 1;
      }
    }
    render() {
      const numToColor = Math.round(this.count * (this.volume ?? 0));
      return $`
      <style>
        .target{
          width: calc(${100 / this.count}% - 10px);
          height: 10px;
          display: inline-block;
          margin: 5px;
          background-color: #e6e7e8;
        }

        .active {
          background-color: ${this.backgroundColor};
        }
        
      </style>

        <div id="wrapper">
          ${Array.from({ length: this.count }, (_3, i9) => $`<div class=${i9 < numToColor ? "target active" : "target"}></div>`)}
        </div>
    `;
    }
  };
  customElements.define("visualscript-audio-volume", Volume);

  // src/components/streams/video/Player.ts
  var Player = class extends s4 {
    constructor(props = {}) {
      super();
      this.source = props.source;
      this.autoplay = props.autoplay;
      this.controls = props.controls;
    }
    static get styles() {
      return r`

      video {
        width: 100%;
      }

      `;
    }
    static get properties() {
      return {
        source: {
          converter: {
            toAttribute(value) {
              return value;
            },
            fromAttribute(value) {
              return value;
            }
          }
        },
        autoplay: { type: Boolean },
        controls: { type: Boolean }
      };
    }
    willUpdate(_3) {
    }
    render() {
      let video = document.createElement("video");
      if (typeof this.source === "object")
        video.srcObject = this.source;
      else {
        if (this.source) {
          const source = document.createElement("source");
          source.src = this.source;
          video.insertAdjacentElement("beforeend", source);
        }
      }
      if (this.autoplay)
        video.autoplay = this.autoplay;
      if (this.controls)
        video.controls = this.controls;
      return video;
    }
  };
  customElements.define("visualscript-video-player", Player);

  // node_modules/webgl-plot/dist/webglplot.esm.mjs
  var ColorRGBA = class {
    constructor(r10, g3, b3, a5) {
      this.r = r10;
      this.g = g3;
      this.b = b3;
      this.a = a5;
    }
  };
  var WebglBase = class {
    constructor() {
      this.scaleX = 1;
      this.scaleY = 1;
      this.offsetX = 0;
      this.offsetY = 0;
      this.loop = false;
      this._vbuffer = 0;
      this._coord = 0;
      this.visible = true;
      this.intensity = 1;
      this.xy = new Float32Array([]);
      this.numPoints = 0;
      this.color = new ColorRGBA(0, 0, 0, 1);
      this.webglNumPoints = 0;
    }
  };
  var WebglLine = class extends WebglBase {
    constructor(c4, numPoints) {
      super();
      this.currentIndex = 0;
      this.webglNumPoints = numPoints;
      this.numPoints = numPoints;
      this.color = c4;
      this.xy = new Float32Array(2 * this.webglNumPoints);
    }
    setX(index, x3) {
      this.xy[index * 2] = x3;
    }
    setY(index, y3) {
      this.xy[index * 2 + 1] = y3;
    }
    getX(index) {
      return this.xy[index * 2];
    }
    getY(index) {
      return this.xy[index * 2 + 1];
    }
    lineSpaceX(start, stepSize) {
      for (let i9 = 0; i9 < this.numPoints; i9++) {
        this.setX(i9, start + stepSize * i9);
      }
    }
    arrangeX() {
      this.lineSpaceX(-1, 2 / this.numPoints);
    }
    constY(c4) {
      for (let i9 = 0; i9 < this.numPoints; i9++) {
        this.setY(i9, c4);
      }
    }
    shiftAdd(data) {
      const shiftSize = data.length;
      for (let i9 = 0; i9 < this.numPoints - shiftSize; i9++) {
        this.setY(i9, this.getY(i9 + shiftSize));
      }
      for (let i9 = 0; i9 < shiftSize; i9++) {
        this.setY(i9 + this.numPoints - shiftSize, data[i9]);
      }
    }
    addArrayY(yArray) {
      if (this.currentIndex + yArray.length <= this.numPoints) {
        for (let i9 = 0; i9 < yArray.length; i9++) {
          this.setY(this.currentIndex, yArray[i9]);
          this.currentIndex++;
        }
      }
    }
    replaceArrayY(yArray) {
      if (yArray.length == this.numPoints) {
        for (let i9 = 0; i9 < this.numPoints; i9++) {
          this.setY(i9, yArray[i9]);
        }
      }
    }
  };
  var WebglPlot = class {
    constructor(canvas, options) {
      this.debug = false;
      this.addLine = this.addDataLine;
      if (options == void 0) {
        this.webgl = canvas.getContext("webgl", {
          antialias: true,
          transparent: false
        });
      } else {
        this.webgl = canvas.getContext("webgl", {
          antialias: options.antialias,
          transparent: options.transparent,
          desynchronized: options.deSync,
          powerPerformance: options.powerPerformance,
          preserveDrawing: options.preserveDrawing
        });
        this.debug = options.debug == void 0 ? false : options.debug;
      }
      this.log("canvas type is: " + canvas.constructor.name);
      this.log(`[webgl-plot]:width=${canvas.width}, height=${canvas.height}`);
      this._linesData = [];
      this._linesAux = [];
      this._thickLines = [];
      this._surfaces = [];
      this.gScaleX = 1;
      this.gScaleY = 1;
      this.gXYratio = 1;
      this.gOffsetX = 0;
      this.gOffsetY = 0;
      this.gLog10X = false;
      this.gLog10Y = false;
      this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);
      this.webgl.viewport(0, 0, canvas.width, canvas.height);
      this._progLine = this.webgl.createProgram();
      this.initThinLineProgram();
      this.webgl.enable(this.webgl.BLEND);
      this.webgl.blendFunc(this.webgl.SRC_ALPHA, this.webgl.ONE_MINUS_SRC_ALPHA);
    }
    get linesData() {
      return this._linesData;
    }
    get linesAux() {
      return this._linesAux;
    }
    get thickLines() {
      return this._thickLines;
    }
    get surfaces() {
      return this._surfaces;
    }
    _drawLines(lines) {
      const webgl = this.webgl;
      lines.forEach((line) => {
        if (line.visible) {
          webgl.useProgram(this._progLine);
          const uscale = webgl.getUniformLocation(this._progLine, "uscale");
          webgl.uniformMatrix2fv(uscale, false, new Float32Array([
            line.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1),
            0,
            0,
            line.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)
          ]));
          const uoffset = webgl.getUniformLocation(this._progLine, "uoffset");
          webgl.uniform2fv(uoffset, new Float32Array([line.offsetX + this.gOffsetX, line.offsetY + this.gOffsetY]));
          const isLog = webgl.getUniformLocation(this._progLine, "is_log");
          webgl.uniform2iv(isLog, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
          const uColor = webgl.getUniformLocation(this._progLine, "uColor");
          webgl.uniform4fv(uColor, [line.color.r, line.color.g, line.color.b, line.color.a]);
          webgl.bufferData(webgl.ARRAY_BUFFER, line.xy, webgl.STREAM_DRAW);
          webgl.drawArrays(line.loop ? webgl.LINE_LOOP : webgl.LINE_STRIP, 0, line.webglNumPoints);
        }
      });
    }
    _drawSurfaces(squares) {
      const webgl = this.webgl;
      squares.forEach((square) => {
        if (square.visible) {
          webgl.useProgram(this._progLine);
          const uscale = webgl.getUniformLocation(this._progLine, "uscale");
          webgl.uniformMatrix2fv(uscale, false, new Float32Array([
            square.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1),
            0,
            0,
            square.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)
          ]));
          const uoffset = webgl.getUniformLocation(this._progLine, "uoffset");
          webgl.uniform2fv(uoffset, new Float32Array([square.offsetX + this.gOffsetX, square.offsetY + this.gOffsetY]));
          const isLog = webgl.getUniformLocation(this._progLine, "is_log");
          webgl.uniform2iv(isLog, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
          const uColor = webgl.getUniformLocation(this._progLine, "uColor");
          webgl.uniform4fv(uColor, [square.color.r, square.color.g, square.color.b, square.color.a]);
          webgl.bufferData(webgl.ARRAY_BUFFER, square.xy, webgl.STREAM_DRAW);
          webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, square.webglNumPoints);
        }
      });
    }
    _drawTriangles(thickLine) {
      const webgl = this.webgl;
      webgl.bufferData(webgl.ARRAY_BUFFER, thickLine.xy, webgl.STREAM_DRAW);
      webgl.useProgram(this._progLine);
      const uscale = webgl.getUniformLocation(this._progLine, "uscale");
      webgl.uniformMatrix2fv(uscale, false, new Float32Array([
        thickLine.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1),
        0,
        0,
        thickLine.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)
      ]));
      const uoffset = webgl.getUniformLocation(this._progLine, "uoffset");
      webgl.uniform2fv(uoffset, new Float32Array([thickLine.offsetX + this.gOffsetX, thickLine.offsetY + this.gOffsetY]));
      const isLog = webgl.getUniformLocation(this._progLine, "is_log");
      webgl.uniform2iv(isLog, new Int32Array([0, 0]));
      const uColor = webgl.getUniformLocation(this._progLine, "uColor");
      webgl.uniform4fv(uColor, [
        thickLine.color.r,
        thickLine.color.g,
        thickLine.color.b,
        thickLine.color.a
      ]);
      webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, thickLine.xy.length / 2);
    }
    _drawThickLines() {
      this._thickLines.forEach((thickLine) => {
        if (thickLine.visible) {
          const calibFactor = Math.min(this.gScaleX, this.gScaleY);
          thickLine.setActualThickness(thickLine.getThickness() / calibFactor);
          thickLine.convertToTriPoints();
          this._drawTriangles(thickLine);
        }
      });
    }
    update() {
      this.clear();
      this.draw();
    }
    draw() {
      this._drawLines(this.linesData);
      this._drawLines(this.linesAux);
      this._drawThickLines();
      this._drawSurfaces(this.surfaces);
    }
    clear() {
      this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);
    }
    _addLine(line) {
      line._vbuffer = this.webgl.createBuffer();
      this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, line._vbuffer);
      this.webgl.bufferData(this.webgl.ARRAY_BUFFER, line.xy, this.webgl.STREAM_DRAW);
      line._coord = this.webgl.getAttribLocation(this._progLine, "coordinates");
      this.webgl.vertexAttribPointer(line._coord, 2, this.webgl.FLOAT, false, 0, 0);
      this.webgl.enableVertexAttribArray(line._coord);
    }
    addDataLine(line) {
      this._addLine(line);
      this.linesData.push(line);
    }
    addAuxLine(line) {
      this._addLine(line);
      this.linesAux.push(line);
    }
    addThickLine(thickLine) {
      this._addLine(thickLine);
      this._thickLines.push(thickLine);
    }
    addSurface(surface) {
      this._addLine(surface);
      this.surfaces.push(surface);
    }
    initThinLineProgram() {
      const vertCode = `
      attribute vec2 coordinates;
      uniform mat2 uscale;
      uniform vec2 uoffset;
      uniform ivec2 is_log;

      void main(void) {
         float x = (is_log[0]==1) ? log(coordinates.x) : coordinates.x;
         float y = (is_log[1]==1) ? log(coordinates.y) : coordinates.y;
         vec2 line = vec2(x, y);
         gl_Position = vec4(uscale*line + uoffset, 0.0, 1.0);
      }`;
      const vertShader = this.webgl.createShader(this.webgl.VERTEX_SHADER);
      this.webgl.shaderSource(vertShader, vertCode);
      this.webgl.compileShader(vertShader);
      const fragCode = `
         precision mediump float;
         uniform highp vec4 uColor;
         void main(void) {
            gl_FragColor =  uColor;
         }`;
      const fragShader = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
      this.webgl.shaderSource(fragShader, fragCode);
      this.webgl.compileShader(fragShader);
      this._progLine = this.webgl.createProgram();
      this.webgl.attachShader(this._progLine, vertShader);
      this.webgl.attachShader(this._progLine, fragShader);
      this.webgl.linkProgram(this._progLine);
    }
    popDataLine() {
      this.linesData.pop();
    }
    removeAllLines() {
      this._linesData = [];
      this._linesAux = [];
      this._thickLines = [];
      this._surfaces = [];
    }
    removeDataLines() {
      this._linesData = [];
    }
    removeAuxLines() {
      this._linesAux = [];
    }
    viewport(a5, b3, c4, d4) {
      this.webgl.viewport(a5, b3, c4, d4);
    }
    log(str) {
      if (this.debug) {
        console.log("[webgl-plot]:" + str);
      }
    }
  };

  // libraries/webglplotutil/webgl-plot-utils.js
  var WebglLinePlotUtils = class {
    constructor(canvas, overlay = true) {
      __publicField(this, "updateAllLines", (newAmplitudes = [], linesSPS = [], autoscale = true, centerZero = false) => {
        let passed = true;
        let sps = [...linesSPS];
        newAmplitudes.forEach((arr, i9) => {
          if (arr.length !== this.linesY[i9]?.length) {
            if (arr.length > this.linesY[i9]?.length) {
              this.linesY[i9] = WebglLinePlotUtils.downsample(arr, this.linesY[i9].length);
            } else
              this.linesY[i9] = WebglLinePlotUtils.upsample(arr, this.linesY[i9]);
            sps[i9] = Math.ceil(arr.length / this.nSecGraph);
            if (autoscale) {
              this.linesY[i9] = this.autoscale(arr, i9, this.nLines, centerZero);
            }
            passed = false;
          } else {
            if (autoscale) {
              this.linesY[i9] = this.autoscale(arr, i9, this.nLines, centerZero);
            } else
              this.linesY[i9] = arr;
          }
        });
        if (!passed) {
          this.deinitPlot();
          this.initPlot(newAmplitudes.length, sps);
        }
        if (this.useOverlay) {
          this.overlayctx.clearRect(0, 0, this.overlay.width, this.overlay.height);
          this.overlayctx.font = "1em Courier";
          this.overlayctx.fillStyle = "white";
        }
        this.linesY.forEach((arr, i9) => {
          for (let j = 0; j < arr.length; j++) {
            this.lines[i9].setY(j, arr[j]);
          }
          if (this.useOverlay) {
            this.overlayctx.fillText(this.lineSettings[i9].ymax.toFixed(2), this.overlay.width - 70, this.overlay.height * (i9 + 0.1) / this.lines.length);
            this.overlayctx.fillText(this.lineSettings[i9].ymin.toFixed(2), this.overlay.width - 70, this.overlay.height * (i9 + 0.9) / this.lines.length);
          }
        });
      });
      __publicField(this, "updateLine", (newAmplitudes = [], lineSPS = 500, lineIdx = 0, autoscale = true, centerZero = false) => {
        if (newAmplitudes.length !== lineSPS * this.nSecGraph) {
          lineSPS = newAmplitudes.length / this.nSecGraph;
          this.linesSPS[lineIdx] = lineSPS;
          this.deinitPlot();
          this.initPlot(this.lines.length, this.linesSPS);
        }
        if (newAmplitudes.length !== this.linesY[lineIdx].length) {
          if (newAmplitudes.length > this.linesY[lineIdx].length) {
            this.linesY[lineIdx] = WebglLinePlotUtils.downsample(newAmplitudes, this.linesY[lineIdx].length);
          } else
            this.linesY[lineIdx] = WebglLinePlotUtils.upsample(newAmplitudes, this.linesY[lineIdx]);
          if (autoscale)
            this.linesY[lineIdx] = this.autoscale(newAmplitudes, lineIdx, this.nLines, centerZero);
        } else {
          if (autoscale)
            this.linesY[lineIdx] = this.autoscale(newAmplitudes, lineIdx, this.nLines, centerZero);
          else
            this.linesY[lineIdx] = newAmplitudes;
        }
        for (let i9 = 0; i9 < this.linesY[lineIdx].length; i9++) {
          this.lines[lineIdx].setY(i9, this.linesY[lineIdx][i9]);
        }
        if (this.useOverlay) {
          this.overlayctx.clearRect(0, this.overlay.height * lineIdx / this.lines.length, this.overlay.width, this.overlay.height * (lineIdx + 1) / this.lines.length);
          this.overlayctx.fillText(this.lineSettings[lineIdx].ymax.toFixed(2), this.overlay.width - 70, this.overlay.height * (lineIdx + 0.1) / this.lines.length);
          this.overlayctx.fillText(this.lineSettings[lineIdx].ymin.toFixed(2), this.overlay.width - 70, this.overlay.height * (lineIdx + 0.9) / this.lines.length);
        }
      });
      if (!canvas)
        throw new Error("Supply a canvas to the webgl plot!");
      this.canvas = canvas;
      this.useOverlay = overlay;
      this.overlay;
      this.overlayctx;
      this.plot = new WebglPlot(canvas);
      if (this.useOverlay) {
        this.overlay = document.createElement("canvas");
        this.overlay.style = this.canvas.style;
        this.overlay.width = this.canvas.width;
        this.overlay.height = this.canvas.height;
        this.overlay.style.position = "absolute";
        this.overlay.style.zIndex = this.canvas.style.zIndex + 1;
        this.overlayctx = this.overlay.getContext("2d");
        this.canvas.parentNode.insertAdjacentElement("afterbegin", this.overlay);
      }
      this.lines = [];
      this.linesY = [];
      this.linesSPS = [];
      this.axes = [];
      this.dividers = [];
      this.colors = [];
      this.lineSettings = [];
      this.axisscalar = 1;
      this.nLines = 0;
      this.nSecGraph = 10;
      this.nMaxPointsPerSec = 512;
      this.animationSpeed = 6.9;
    }
    autoscale(array, lineIdx = 0, nLines = 1, centerZero = false) {
      let max = Math.max(...array);
      let min = Math.min(...array);
      this.lineSettings[lineIdx].ymax = max;
      this.lineSettings[lineIdx].ymin = min;
      let _lines = 1 / nLines;
      let scalar;
      if (centerZero) {
        let absmax = Math.max(Math.abs(min), Math.abs(max));
        scalar = _lines / absmax;
        return array.map((y3) => y3 * scalar + (_lines * (lineIdx + 1) * 2 - 1 - _lines));
      } else {
        scalar = _lines / (max - min);
        return array.map((y3) => 2 * ((y3 - min) * scalar - 1 / (2 * nLines)) + (_lines * (lineIdx + 1) * 2 - 1 - _lines));
      }
    }
    static absmax(array) {
      return Math.max(Math.abs(Math.min(...array)), Math.max(...array));
    }
    static downsample(array, fitCount, scalar = 1) {
      if (array.length > fitCount) {
        let output = new Array(fitCount);
        let incr = array.length / fitCount;
        let lastIdx = array.length - 1;
        let last = 0;
        let counter = 0;
        for (let i9 = incr; i9 < array.length; i9 += incr) {
          let rounded = Math.round(i9);
          if (rounded > lastIdx)
            rounded = lastIdx;
          for (let j = last; j < rounded; j++) {
            output[counter] += array[j];
          }
          output[counter] /= (rounded - last) * scalar;
          counter++;
          last = rounded;
        }
        return output;
      } else
        return array;
    }
    static upsample(array, fitCount, scalar = 1) {
      var linearInterpolate = function(before2, after2, atPoint2) {
        return (before2 + (after2 - before2) * atPoint2) * scalar;
      };
      var newData = new Array(fitCount);
      var springFactor = new Number((array.length - 1) / (fitCount - 1));
      newData[0] = array[0];
      for (var i9 = 1; i9 < fitCount - 1; i9++) {
        var tmp = i9 * springFactor;
        var before = new Number(Math.floor(tmp)).toFixed();
        var after = new Number(Math.ceil(tmp)).toFixed();
        var atPoint = tmp - before;
        newData[i9] = linearInterpolate(array[before], array[after], atPoint);
      }
      newData[fitCount - 1] = array[array.length - 1];
      return newData;
    }
    deinitPlot() {
      this.plot?.clear();
      this.plot?.removeAllLines();
    }
    HSLToRGB(h8, s10, l9) {
      s10 /= 100;
      l9 /= 100;
      let c4 = (1 - Math.abs(2 * l9 - 1)) * s10, x3 = c4 * (1 - Math.abs(h8 / 60 % 2 - 1)), m3 = l9 - c4 / 2, r10 = 0, g3 = 0, b3 = 0;
      if (0 <= h8 && h8 < 60) {
        r10 = c4;
        g3 = x3;
        b3 = 0;
      } else if (60 <= h8 && h8 < 120) {
        r10 = x3;
        g3 = c4;
        b3 = 0;
      } else if (120 <= h8 && h8 < 180) {
        r10 = 0;
        g3 = c4;
        b3 = x3;
      } else if (180 <= h8 && h8 < 240) {
        r10 = 0;
        g3 = x3;
        b3 = c4;
      } else if (240 <= h8 && h8 < 300) {
        r10 = x3;
        g3 = 0;
        b3 = c4;
      } else if (300 <= h8 && h8 < 360) {
        r10 = c4;
        g3 = 0;
        b3 = x3;
      }
      r10 = Math.round((r10 + m3) * 255);
      g3 = Math.round((g3 + m3) * 255);
      b3 = Math.round((b3 + m3) * 255);
      return [r10, g3, b3];
    }
    initPlot(nLines = 1, linesSPS = [], nSecGraph = this.nSecGraph, nMaxPointsPerSec = this.nMaxPointsPerSec) {
      this.nSecGraph = nSecGraph;
      this.nMaxPointsPerSec = nMaxPointsPerSec;
      let xaxisColor = new ColorRGBA(1, 1, 1, 0.3);
      let dividerColor = new ColorRGBA(1, 1, 1, 1);
      let axisscalar = 1 / nLines;
      this.nLines = nLines;
      this.lines = [];
      this.linesSPS = linesSPS;
      for (let i9 = 0; i9 < nLines; i9++) {
        let rgb = this.HSLToRGB(360 * (i9 / nLines) % 360, 100, 50);
        let color = new ColorRGBA(rgb[0], rgb[1], rgb[2], 1);
        this.colors.push(color);
        let numX = 10;
        if (linesSPS[i9] > nMaxPointsPerSec)
          numX = nSecGraph * nMaxPointsPerSec;
        else
          numX = linesSPS[i9] * nSecGraph;
        numX = Math.floor(numX);
        let line = new WebglLine(color, numX);
        line.arrangeX();
        this.lines.push(line);
        if (this.linesY.length < this.lines.length) {
          this.linesY.push(new Array(numX));
        }
        this.plot.addDataLine(line);
        let xaxisY = axisscalar * (i9 + 1) * 2 - 1 - axisscalar;
        let xaxis = new WebglLine(xaxisColor, 2);
        xaxis.constY(xaxisY);
        xaxis.arrangeX();
        xaxis.xy[2] = 1;
        this.plot.addAuxLine(xaxis);
        this.axes.push(xaxis);
        if (i9 !== nLines - 1) {
          let dividerY = axisscalar * (i9 + 1) * 2 - 1;
          let divider = new WebglLine(dividerColor, 2);
          divider.constY(dividerY);
          divider.arrangeX();
          divider.xy[2] = 1;
          this.plot.addAuxLine(divider);
          this.dividers.push(divider);
        }
        this.lineSettings[i9] = {
          color,
          sps: linesSPS[i9],
          ymin: -1,
          ymax: 1
        };
      }
      if (this.linesY.length > this.lines.length)
        this.linesY.splice(this.lines.length);
      return true;
    }
    update() {
      this.plot.update();
    }
    animate() {
      this.update();
      setTimeout(() => {
        requestAnimationFrame(this.animate);
      }, this.animationSpeed);
    }
    static test(canvasId) {
      const canvas = document.getElementById(canvasId);
      const devicePixelRatio = globalThis.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
      let sps = 512;
      let sps2 = 256;
      let nSec = 3;
      let nPointsRenderedPerSec = 512;
      const freq = 1;
      const amp = 0.5;
      const noise = 0.5;
      let line = new Array(sps * nSec);
      let line2 = new Array(sps2 * nSec);
      let plotutil = new WebglLinePlotUtils(canvas);
      plotutil.initPlot(2, [sps, sps2], nSec, nPointsRenderedPerSec);
      function update(line3 = [], sps3 = 512, sec = 10) {
        let len = sps3 * sec;
        let tincr = sec / len;
        let time = 0;
        for (let i9 = 0; i9 < sps3 * sec; i9++) {
          const ySin = Math.sin(Math.PI * time * freq * Math.PI * 2 + performance.now() * 1e-3);
          const yNoise = Math.random() - 0.5;
          line3[i9] = ySin * amp + yNoise * noise;
          time += tincr;
        }
      }
      let newFrame = () => {
        update(line, sps, nSec);
        update(line2, sps2, nSec);
        plotutil.updateAllLines([line, line2], [sps, sps2], true);
        plotutil.update();
        requestAnimationFrame(newFrame);
      };
      requestAnimationFrame(newFrame);
    }
  };

  // src/components/streams/data/TimeSeries.ts
  var TimeSeries = class extends s4 {
    constructor(props = { seconds: 5, sps: 512 }) {
      super();
      this.data = [];
      this.spss = [];
      this.buffers = [];
      this.updateData = (data) => {
        this.data = data;
      };
      this.init = () => {
        const length = this.data.length;
        let nPointsRenderedPerSec = 60;
        this.sps = this.seconds * nPointsRenderedPerSec;
        this.spss = Array.from({ length }, (_3) => this.sps);
        this.buffers = Array.from({ length }, (_3) => []);
        this.util.initPlot(length, this.spss, this.seconds, nPointsRenderedPerSec);
      };
      this.clear = () => {
        this.util.plot.clear();
        this.buffers = [];
        this.data = [];
      };
      this.draw = () => {
        if (this.data.length != this.buffers.length)
          this.init();
        this.data.forEach((data, i9) => {
          if (this.buffers[i9].length === 0)
            this.buffers[i9] = Array.from({ length: this.spss[i9] }, (_3) => data);
          else {
            if (!Array.isArray(data))
              data = [data];
            data.forEach(() => this.buffers[i9].pop());
            this.buffers[i9].unshift(...data);
          }
        });
      };
      this.canvas = document.createElement("canvas");
      this.util = new WebglLinePlotUtils(this.canvas, false);
      this.sps = props.sps ?? 512;
      this.seconds = props.seconds ?? 5;
      this.backgroundColor = props.backgroundColor ?? "#69ce2b";
      let newFrame = () => {
        if (this.buffers.length > 0) {
          this.util.updateAllLines(this.buffers, this.spss, true);
          this.util.update();
        }
        requestAnimationFrame(newFrame);
      };
      requestAnimationFrame(newFrame);
    }
    static get styles() {
      return r`

      canvas{
        background: black;
        width: 100%;
        height: 100%;
      }

      `;
    }
    static get properties() {
      return {
        data: {
          type: Array,
          reflect: true
        },
        sps: {
          type: Number,
          reflect: true
        },
        seconds: {
          type: Number,
          reflect: true
        },
        backgroundColor: {
          type: String,
          reflect: true
        }
      };
    }
    willUpdate(updatedProps) {
      if (updatedProps.has("data"))
        this.draw();
      if (updatedProps.has("seconds")) {
        if (!this.seconds)
          this.seconds = 1e-3;
        this.init();
      }
    }
    render() {
      return this.canvas;
    }
  };
  customElements.define("visualscript-timeseries-stream", TimeSeries);

  // src/components/streams/data/Spectrogram.ts
  var Spectrogram = class extends s4 {
    constructor(props = {}) {
      super();
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.reset = false;
      this.offset = true;
      this.colorScale = ["#000000", "#030106", "#06010c", "#090211", "#0c0215", "#0e0318", "#10031b", "#12041f", "#130522", "#140525", "#150628", "#15072c", "#16082f", "#160832", "#160936", "#160939", "#17093d", "#170a40", "#170a44", "#170a48", "#17094b", "#17094f", "#170953", "#170956", "#16085a", "#16085e", "#150762", "#140766", "#140669", "#13066d", "#110571", "#100475", "#0e0479", "#0b037d", "#080281", "#050185", "#020089", "#00008d", "#000090", "#000093", "#000096", "#000099", "#00009c", "#00009f", "#0000a2", "#0000a5", "#0000a8", "#0000ab", "#0000ae", "#0000b2", "#0000b5", "#0000b8", "#0000bb", "#0000be", "#0000c1", "#0000c5", "#0000c8", "#0000cb", "#0000ce", "#0000d1", "#0000d5", "#0000d8", "#0000db", "#0000de", "#0000e2", "#0000e5", "#0000e8", "#0000ec", "#0000ef", "#0000f2", "#0000f5", "#0000f9", "#0000fc", "#0803fe", "#2615f9", "#3520f4", "#3f29ef", "#4830eb", "#4e37e6", "#543ee1", "#5944dc", "#5e49d7", "#614fd2", "#6554cd", "#6759c8", "#6a5ec3", "#6c63be", "#6e68b9", "#6f6db4", "#7072af", "#7177aa", "#717ba5", "#7180a0", "#71859b", "#718996", "#708e91", "#6f928b", "#6e9786", "#6c9b80", "#6aa07b", "#68a475", "#65a96f", "#62ad69", "#5eb163", "#5ab65d", "#55ba56", "#4fbf4f", "#48c347", "#40c73f", "#36cc35", "#34ce32", "#37cf31", "#3ad130", "#3cd230", "#3fd32f", "#41d52f", "#44d62e", "#46d72d", "#48d92c", "#4bda2c", "#4ddc2b", "#4fdd2a", "#51de29", "#53e029", "#55e128", "#58e227", "#5ae426", "#5ce525", "#5ee624", "#60e823", "#62e922", "#64eb20", "#66ec1f", "#67ed1e", "#69ef1d", "#6bf01b", "#6df11a", "#6ff318", "#71f416", "#73f614", "#75f712", "#76f810", "#78fa0d", "#7afb0a", "#7cfd06", "#7efe03", "#80ff00", "#85ff00", "#89ff00", "#8eff00", "#92ff00", "#96ff00", "#9aff00", "#9eff00", "#a2ff00", "#a6ff00", "#aaff00", "#adff00", "#b1ff00", "#b5ff00", "#b8ff00", "#bcff00", "#bfff00", "#c3ff00", "#c6ff00", "#c9ff00", "#cdff00", "#d0ff00", "#d3ff00", "#d6ff00", "#daff00", "#ddff00", "#e0ff00", "#e3ff00", "#e6ff00", "#e9ff00", "#ecff00", "#efff00", "#f3ff00", "#f6ff00", "#f9ff00", "#fcff00", "#ffff00", "#fffb00", "#fff600", "#fff100", "#ffec00", "#ffe700", "#ffe200", "#ffdd00", "#ffd800", "#ffd300", "#ffcd00", "#ffc800", "#ffc300", "#ffbe00", "#ffb900", "#ffb300", "#ffae00", "#ffa900", "#ffa300", "#ff9e00", "#ff9800", "#ff9300", "#ff8d00", "#ff8700", "#ff8100", "#ff7b00", "#ff7500", "#ff6f00", "#ff6800", "#ff6100", "#ff5a00", "#ff5200", "#ff4900", "#ff4000", "#ff3600", "#ff2800", "#ff1500", "#ff0004", "#ff000c", "#ff0013", "#ff0019", "#ff001e", "#ff0023", "#ff0027", "#ff002b", "#ff012f", "#ff0133", "#ff0137", "#ff013b", "#ff023e", "#ff0242", "#ff0246", "#ff0349", "#ff034d", "#ff0450", "#ff0454", "#ff0557", "#ff065b", "#ff065e", "#ff0762", "#ff0865", "#ff0969", "#ff0a6c", "#ff0a70", "#ff0b73", "#ff0c77", "#ff0d7a", "#ff0e7e", "#ff0f81", "#ff1085", "#ff1188", "#ff128c", "#ff138f", "#ff1493"];
      this.data = [];
      this.dynNormalize = true;
      this.init = () => {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.offscreenctx.fillStyle = "black";
        this.offscreenctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      };
      this.updateData = (data) => {
        this.data = data;
      };
      this.onresize = () => {
        const width = this.canvas.parentNode?.clientWidth;
        const height = this.canvas.parentNode?.clientHeight;
        if (width) {
          this.canvas.width = this.canvas.parentNode?.clientWidth;
          this.canvas.style.width = width.toString();
        }
        if (height) {
          this.canvas.height = this.canvas.parentNode?.clientHeight;
          this.canvas.style.height = height.toString();
        }
      };
      this.draw = () => {
        var width = this.canvas.width;
        var height = Math.floor(this.canvas.height);
        var tempCanvasContext = this.offscreenctx;
        var tempCanvas = tempCanvasContext.canvas;
        tempCanvasContext.drawImage(this.canvas, 0, 0, width, height);
        var data = [...Array.from(this.data)];
        if (data.length !== height) {
          var interp = data;
          data = this.interpolateArray(interp, height);
        }
        var offset = 0;
        if (this.offset === true) {
          offset = Math.pow(10, Math.floor(Math.log10(Math.min(...data))));
        }
        if (this.dynNormalize === true) {
          this.normalizeFactor = 1 / Math.pow(10, Math.floor(Math.log10(Math.max(...data)) + 0.5));
        }
        for (var i9 = 0; i9 < data.length; i9++) {
          var value = Math.floor((data[i9] - offset) * this.normalizeFactor * 255);
          if (value > 255) {
            value = 255;
          } else if (value < 0) {
            value = 0;
          }
          this.ctx.fillStyle = this.colorScale[value];
          this.ctx.fillRect(width - 1, height - i9, 1, 1);
        }
        if (this.reset === false) {
          this.ctx.translate(-1, 0);
          this.ctx.drawImage(tempCanvas, 0, 0, width, height);
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          this.reset = false;
        }
      };
      this.max = props.max ?? 1;
      this.normalizeFactor = props.max ? 1 / props.max : 1;
      this.backgroundColor = props.backgroundColor ?? "#69ce2b";
      window.addEventListener("resize", () => {
        this.onresize();
      });
      this.offscreen = new OffscreenCanvas(this.canvas.width, this.canvas.height);
      this.offscreenctx = this.offscreen.getContext("2d");
      this.init();
      this.data = props.data ?? new Array(this.canvas.height).fill(0);
      this.onresize();
    }
    static get styles() {
      return r`

      canvas{
        background: black;
        width: 100%;
        height: 100%;
      }

      `;
    }
    static get properties() {
      return {
        max: {
          type: Number,
          reflect: true
        },
        data: {
          type: Array,
          reflect: true
        },
        backgroundColor: {
          type: String,
          reflect: true
        }
      };
    }
    willUpdate(changedProps) {
      if (changedProps.has("data"))
        this.draw();
    }
    interpolateArray(data, fitCount) {
      var norm = this.canvas.height / data.length;
      var linearInterpolate = function(before2, after2, atPoint2) {
        return (before2 + (after2 - before2) * atPoint2) * norm;
      };
      var newData = new Array();
      var springFactor = new Number((data.length - 1) / (fitCount - 1));
      newData[0] = data[0];
      for (var i9 = 1; i9 < fitCount - 1; i9++) {
        var tmp = i9 * springFactor;
        var beforeNum = new Number(Math.floor(tmp));
        var before = beforeNum.toFixed();
        var after = new Number(Math.ceil(tmp)).toFixed();
        var atPoint = tmp - beforeNum;
        newData[i9] = linearInterpolate(data[before], data[after], atPoint);
      }
      newData[fitCount - 1] = data[data.length - 1];
      return newData;
    }
    render() {
      return this.canvas;
    }
  };
  customElements.define("visualscript-spectrogram-stream", Spectrogram);

  // src/components/general/Nav.ts
  var Nav = class extends s4 {
    constructor(props = { brand: {}, primary: { menu: [], options: [] }, secondary: [] }) {
      super();
      this.stringToFunction = (value) => {
        let regex = new RegExp("(|[a-zA-Z]w*|([a-zA-Z]w*(,s*[a-zA-Z]w*)*))s*=>");
        let func = typeof value === "string" ? value.substring(0, 8) == "function" : false;
        let arrow = typeof value === "string" ? regex.test(value) : false;
        return func || arrow ? (0, eval)("(" + value + ")") : value;
      };
      this.getElement = (o12) => {
        if (o12.onClick)
          o12.onClick = this.stringToFunction(o12.onClick);
        switch (o12.type) {
          case "button":
            const button = document.createElement("visualscript-button");
            button.id = o12.id;
            button.size = "small";
            button.onClick = o12.onClick ?? (() => {
            });
            button.innerHTML = o12.content;
            return button;
          default:
            return $`<a href="${o12.link}" id=${o12.id}  target=${o12.external ? "_blank" : "_self"} class="decorate">${o12.content}</a>`;
        }
      };
      this.primary = props.primary ?? { menu: [], options: [] };
      this.secondary = props.secondary ?? [];
      this.color = props.color ?? "blue";
      this.brand = props.brand ?? { content: "My Brand" };
    }
    static get styles() {
      return r`

    
    :host {
      z-index: 2;
      border-bottom: 1px solid rgb(180,180,180);
      background: white;
      color: black;
      display:flex;
      align-items: center;
      width: 100%;
      grid-area: nav;
      z-index: 100;
      overflow: hidden;
    }

    header {
      width: 100%;
    }

    :host * {
      box-sizing: border-box;
    }
    
    h1 {
      margin: 0;
    }

    nav {
      width: 100%;
      padding:  25px;
      display: flex;
      align-items: center;
    }

    #primary {
      position: sticky; 
      top: 0;
      left: 0;
      max-height: 100px;
      justify-content: space-between;
      font-size: 80%;
    }

    #primary > * > * {
      flex-grow: 1;
      display: flex;
    }

    #primary > * {
      height: 100%;
    }

    #primary > div:lastchild {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row-reverse;
    }

    #menu, #options {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    #secondary {
      height: 50px;
      justify-content: flex-end;
      border-bottom: 1px solid #3d3d3d;
      font-size: 75%;
    }

    a{
      color: black;
      text-decoration: none;
    }

    .brand {
      height: 100%;
      padding-right: 15px;
      display: flex;
      align-items: center;
    }

    a:not(.brand) {
      height: 100%;
      display: flex;
      align-items: center; 
      justify-content: center;
      text-align: center;
    }

    .decorate {
      padding: 10px 15px;
    }

    #primary .decorate:hover {
      box-shadow: 0 4px 0 #0fb3ff inset;
    }

    #secondary .decorate:hover {
      box-shadow: 0 3px 0 #c4c4c4 inset;
    }
    
    nav button:last-child {
      margin-right: 0px;
    }

    @media only screen and (max-width: 800px) {
      #primary #menu {
        display: none;
      }
    }

    @media (prefers-color-scheme: dark) {
      :host {
        background: #060606;
        color: white;
      }

      a {
        color: white;
      }
    }

    `;
    }
    static get properties() {
      return {
        primary: {
          type: Object
        },
        secondary: {
          type: Array,
          reflect: true
        },
        brand: {
          type: Object
        },
        color: {
          type: String,
          reflect: true
        }
      };
    }
    willUpdate(changedProps) {
    }
    render() {
      return $`
      <header>
      ${this.secondary.length > 0 ? $`<nav id="secondary">${this.secondary?.map((o12) => this.getElement(o12))}</nav>` : ``}
      <nav id="primary">
      ${$`<div><a class="brand" target=${this.brand.external ? "_blank" : "_self"} href=${this.brand.link}>${this.brand.content ? /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.brand.content) ? $`<img src="${this.brand.content}"></img>` : $`<h1>${this.brand.content}</h1><slot></slot>` : $`<h1><slot></slot></h1>`}</a></div>`}
        <div>
          <div id="options">
          ${this.primary.options?.map((o12) => this.getElement(o12))}
          </div>
          <div id="menu">
            ${this.primary.menu?.map((o12) => this.getElement(o12))}
          </div>
        </div>

      </nav>
      </header>
    `;
    }
  };
  customElements.define("visualscript-nav", Nav);

  // src/components/general/Loader.ts
  var Loader = class extends s4 {
    constructor(props = {}) {
      super();
      this.progress = props.progress;
      this.color = props.color;
      this.background = props.background ?? "#f3f3f3";
      this.type = props.type ?? "default";
      this.showPercent = props.showPercent ?? true;
      this.text = props.text;
      this.textBackground = props.textBackground;
      this.textColor = props.textColor;
      this.size = props.size ?? "13px";
      if (!this.color) {
        if (this.type === "default")
          this.color = "blue";
        else
          this.color = "#7aff80";
      }
    }
    static get styles() {
      return r`
    
    :host {
      
    }

    #container {  
      width: 100%;
    }

    #indicator { 
      width: 100%;
      overflow: hidden;
      animate: 0.5s;
      opacity: 0.7;
    }

    #indicator > div {
      width: 100%;
      height: 100%;
    }

    #linear-text {  
      padding: 10px 15px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      font-size: 75%;
      background: white;
    }

    .loader-container {
      width: 80px;
      height: 80px;
      position: relative;
      color: #5b5b5b;
    }

    .loader {
      width: 100%;
      height: 100%;
      border: 4px solid;
      background: white;
      border-right: none;
      border-top: none;
      border-left: none;
      z-index: 2000;
      background-color: transparent;
      border-radius: 100%;
      transform: rotateZ(0);
    }

    .loader-container > span{
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 80%;
      transform: translate(-50%, -50%);
      user-select: none;
    }

    .loader.active {
      opacity: 0.45;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }

    /* @-moz-keyframes spin {  . . . } */
    
    
    /* @-ms-keyframes spin {  . . . } */
    
    
    /* @-o-keyframes spin { . . . } */
    
    @-webkit-keyframes spin {
      from {
        transform: rotateZ(0deg) scale(1);
      }
      50% {
        transform: rotateZ(540deg) scale(0.9);
        filter: brightness(50%);        
      }
      to {
        transform: rotateZ(1080deg) scale(1);
      }
    }
    
    @keyframes spin {
      from {
        transform: rotateZ(0deg) scale(1);
      }
      50% {
        transform: rotateZ(540deg) scale(0.9);
        filter: brightness(50%);
      }
      to {
        transform: rotateZ(1080deg) scale(1);
      }
    }
    `;
    }
    static get properties() {
      return {
        progress: {
          type: Number,
          reflect: true
        },
        text: {
          type: String,
          reflect: true
        },
        type: {
          type: String,
          reflect: true
        },
        color: {
          type: String,
          reflect: true
        },
        background: {
          type: String,
          reflect: true
        },
        textBackground: {
          type: String,
          reflect: true
        },
        textColor: {
          type: String,
          reflect: true
        },
        size: {
          type: String,
          reflect: true
        }
      };
    }
    willUpdate(_3) {
    }
    render() {
      const progress = this.progress ?? 0;
      const text = this.text != void 0 ? this.text : this.showPercent ? `${(progress * 100).toFixed(1)}%` : "";
      switch (this.type) {
        case "linear":
          return $`
            ${text ? $`<div id="linear-text" style="background: ${this.textBackground}; color: ${this.textColor};">${text}</div>` : ""}
            <div id="indicator" style="height:${this.size}; background:${this.background}; opacity:${progress === 1 ? 1 : ""};">
                <div style="width:${progress * 100}%; background: ${this.color}"></div>
              </div>
            `;
        default:
          return $`
            <div class="loader-container" style="height:${this.size}; width:${this.size}; background: ${this.textBackground};">
              ${text ? $`<span style="color: ${this.textColor};">${text}</span>` : ""}
              <div class="loader active" style="border-color: ${this.color};"></div>
            </div>
            `;
      }
    }
  };
  customElements.define("visualscript-loader", Loader);

  // node_modules/lit-html/directive.js
  var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e4 = (t7) => (...e11) => ({ _$litDirective$: t7, values: e11 });
  var i3 = class {
    constructor(t7) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t7, e11, i9) {
      this._$Ct = t7, this._$AM = e11, this._$Ci = i9;
    }
    _$AS(t7, e11) {
      return this.update(t7, e11);
    }
    update(t7, e11) {
      return this.render(...e11);
    }
  };

  // node_modules/lit-html/directives/style-map.js
  var i4 = e4(class extends i3 {
    constructor(t7) {
      var e11;
      if (super(t7), t7.type !== t3.ATTRIBUTE || t7.name !== "style" || ((e11 = t7.strings) === null || e11 === void 0 ? void 0 : e11.length) > 2)
        throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t7) {
      return Object.keys(t7).reduce((e11, r10) => {
        const s10 = t7[r10];
        return s10 == null ? e11 : e11 + `${r10 = r10.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s10};`;
      }, "");
    }
    update(e11, [r10]) {
      const { style: s10 } = e11.element;
      if (this.ct === void 0) {
        this.ct = /* @__PURE__ */ new Set();
        for (const t7 in r10)
          this.ct.add(t7);
        return this.render(r10);
      }
      this.ct.forEach((t7) => {
        r10[t7] == null && (this.ct.delete(t7), t7.includes("-") ? s10.removeProperty(t7) : s10[t7] = "");
      });
      for (const t7 in r10) {
        const e12 = r10[t7];
        e12 != null && (this.ct.add(t7), t7.includes("-") ? s10.setProperty(t7, e12) : s10[t7] = e12);
      }
      return b;
    }
  });

  // src/components/general/Button.ts
  var Button = class extends s4 {
    constructor(props = {}) {
      super();
      this.primary = props.primary;
      this.backgroundColor = props.backgroundColor;
      this.size = props.size;
      this.onClick = props.onClick;
    }
    static get styles() {
      return r`

    .storybook-button {
      font-weight: 700;
      border: 0;
      border-radius: 1em;
      cursor: pointer;
      display: inline-block;
      line-height: 1;
      overflow: hidden;
    }

    .storybook-button--primary {
      color: white;
      background-color: #1ea7fd;
    }
    .storybook-button--secondary {
      color: #333;
      background-color: transparent;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
    }
    .storybook-button--extra-small {
      font-size: 10px;
      padding: 7px 12px;
    }

    .storybook-button--small {
      font-size: 12px;
      padding: 10px 16px;
    }
    .storybook-button--medium {
      font-size: 14px;
      padding: 11px 20px;
    }
    .storybook-button--large {
      font-size: 16px;
      padding: 12px 24px;
    }


    @media (prefers-color-scheme: dark) {
      .storybook-button--secondary {
        color: #cccccc;
        background-color: transparent;
        box-shadow: rgba(255, 255, 255, 0.50) 0px 0px 0px 1px inset;
      }
    }

    `;
    }
    static get properties() {
      return {
        primary: {
          type: Boolean,
          reflect: true
        },
        backgroundColor: {
          type: String,
          reflect: true
        },
        size: {
          type: String,
          reflect: true
        },
        onClick: {
          type: Function,
          reflect: true
        }
      };
    }
    willUpdate(_3) {
    }
    render() {
      const mode = this.primary ? "storybook-button--primary" : "storybook-button--secondary";
      return $`
      <button
           type="button"
            class=${["storybook-button", `storybook-button--${this.size || "medium"}`, mode].join(" ")}
            style=${i4({ backgroundColor: this.backgroundColor })}
            @click=${this.onClick}
      >
        <slot>Button</slot>
      </button>
    `;
    }
  };
  customElements.define("visualscript-button", Button);

  // src/components/general/Modal.ts
  var Modal = class extends s4 {
    constructor(props = {}) {
      super();
      this.toggle = () => this.open = !this.open;
      this.open = props.open;
      this.header = props.header;
      this.footer = props.footer;
    }
    static get styles() {
      return r`
/* Modal Header */

  :host {
    
    z-index: 101;
  }
  
  :host * {
    box-sizing: border-box;
    
  }

.modal-header {
  padding: 12px 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
}

.modal-header span {
  font-weight: 800;
  font-size: 120%;
}


/* Modal Body */
.modal-body {
  padding: 16px;
  overflow: scroll;
  width: 100%;
  flex-grow: 1;
}

/* Modal Footer */
.modal-footer {
  border-top: 1px solid #e3e3e3;
  padding: 12px 16px;
  width: 100%;
}

.modal-footer span {
  font-size: 80%;
}

/* Modal Content */
.modal-content {
  
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);

  background-color: #fefefe;
  margin: auto;
  border-radius: 4px;
  padding: 0;
  width: 80vw;
  height: 80vh;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
  transition: opacity 0.5s;
  display: flex; 
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  pointer-events: none;
  z-index: 102;
  opacity: 0;
}

.modal-content.open {
  opacity: 1;
  pointer-events: all;
}

    `;
    }
    static get properties() {
      return {
        open: {
          type: Boolean,
          reflect: true
        },
        header: {
          type: Object,
          reflect: true
        },
        footer: {
          type: String,
          reflect: true
        }
      };
    }
    willUpdate(_3) {
    }
    render() {
      return $`
      <div class="modal-content ${this.open ? "open" : ""}">
        ${this.header ? $`<div class="modal-header">
          <span>${this.header}</span>
          <visualscript-button secondary size="extra-small" @click="${this.toggle}">Close</visualscript-button>
        </div>` : ""}
        <div class="modal-body">
          <slot>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla dolor vitae hendrerit feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ultricies arcu nec nibh commodo aliquam at in felis. Mauris lorem dui, porttitor et lectus vel, ornare sodales risus. Sed eu rhoncus ex. Donec tristique nibh lacus, sed dictum lacus lacinia eu. Nunc imperdiet a ante et feugiat. Praesent euismod tortor lacus, et euismod turpis mollis vitae. Etiam sagittis vehicula pulvinar. Aliquam id tincidunt tortor, sed feugiat nulla. Donec sollicitudin tincidunt viverra. Nunc condimentum molestie massa a feugiat. Nam mattis bibendum sodales. Nulla at maximus arcu, quis tempus lacus.

Vestibulum pharetra pretium neque eu faucibus. Morbi aliquam urna non lacinia congue. Donec sed odio interdum, imperdiet tellus in, porttitor erat. Mauris erat velit, facilisis ut luctus sit amet, laoreet vitae ligula. Morbi a mi ultrices, feugiat ante in, convallis enim. Etiam sollicitudin leo purus, ut commodo ex placerat et. Proin ut nulla non risus luctus eleifend eu id orci.

Ut aliquam tristique massa. Nullam a ipsum tincidunt, malesuada ipsum non, suscipit lectus. Suspendisse sit amet risus ut lectus efficitur feugiat in ut urna. Suspendisse odio felis, efficitur eu molestie eu, malesuada nec nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque fermentum sit amet odio id convallis. Donec luctus risus ac pretium ultrices. Quisque congue velit sed hendrerit posuere. Integer dictum felis eu tortor mattis scelerisque. Fusce facilisis justo nec velit vehicula gravida sit amet at erat. Suspendisse sit amet nibh metus. Aenean euismod, tortor a venenatis laoreet, sapien arcu semper turpis, non molestie risus ligula nec velit.

Nulla eget ultrices justo, non posuere dui. Praesent ultrices dui eget erat accumsan varius. Ut ut mi arcu. Integer porttitor, neque vitae fermentum dictum, tellus quam tincidunt mauris, eget tristique turpis mauris nec magna. Phasellus ut tortor eros. Ut vehicula non purus in efficitur. Quisque justo elit, varius id luctus et, pulvinar eget ipsum. Sed tristique et odio eu facilisis.

Phasellus sodales eros at erat elementum, a semper ligula facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi at maximus nunc. In porttitor rutrum rhoncus. Ut dignissim viverra erat in aliquet. Suspendisse potenti. Donec lorem sem, vulputate non diam a, facilisis luctus tortor. In pellentesque ut eros id vulputate. Proin rutrum tincidunt libero, vel dictum libero ullamcorper in. Nam nec ultricies tortor, sit amet pellentesque ante. Sed tellus purus, pharetra vitae purus quis, accumsan vestibulum tellus. Vivamus porttitor urna a odio tincidunt tristique. Integer ut metus finibus, ultricies magna sed, congue eros. Duis velit velit, consectetur at faucibus ac, scelerisque nec diam.
</slot>
        </div>
        ${this.footer ? $`<div class="modal-footer">
          <span>${this.footer}</span>
        </div>` : ""}
      </div>
      <visualscript-overlay .open=${this.open}></visualscript-overlay>
    `;
    }
  };
  customElements.define("visualscript-modal", Modal);

  // src/components/general/Footer.ts
  var Footer = class extends s4 {
    static get styles() {
      return r`

    :host {
      padding: 25px;
      border-top: 1px solid rgb(180,180,180);
      background: white;
      color: black;
      display:flex;
      align-items: center;
      width: 100%;
      font-size: 70%;
      box-sizing: border-box;
      z-index: 100;
      grid-area: foot;
    }

    :host * {
      box-sizing: border-box;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        background: #060606;
        color: white;
      }

      a {
        color: white;
      }
    }
    `;
    }
    static get properties() {
      return {};
    }
    constructor(props = {}) {
      super();
    }
    render() {
      return $`

      <slot></slot>
    `;
    }
  };
  customElements.define("visualscript-footer", Footer);

  // src/components/general/Overlay.ts
  var Overlay = class extends s4 {
    constructor(props = {}) {
      super();
      this.open = false;
      this.open = props.open ?? false;
    }
    static get styles() {
      return r`

    div {
      opacity: 0;
      width: 100vw;
      height: 100vh;
      transition: 0.5s;
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 50;
      color: black;
      background: rgb(255,255, 255, 0.7);
    }
    

    div[open] {
      opacity: 1;
      pointer-events: all;
      backdrop-filter: blur(3px);
    }

    @media (prefers-color-scheme: dark) {
      div {
        color: white;
        background: rgb(0,0,0, 0.5);
      }
    }

    `;
    }
    static get properties() {
      return {
        open: {
          type: Boolean,
          reflect: true
        }
      };
    }
    render() {
      return $`
      <div ?open=${this.open ? true : false}>
        <slot></slot>
      </div>
    `;
    }
  };
  customElements.define("visualscript-overlay", Overlay);

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n5;
  var e6 = ((n5 = window.HTMLSlotElement) === null || n5 === void 0 ? void 0 : n5.prototype.assignedElements) != null ? (o12, n12) => o12.assignedElements(n12) : (o12, n12) => o12.assignedNodes(n12).filter((o13) => o13.nodeType === Node.ELEMENT_NODE);

  // node_modules/lit-element/index.js
  console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");

  // node_modules/lit-html/directives/class-map.js
  var o6 = e4(class extends i3 {
    constructor(t7) {
      var i9;
      if (super(t7), t7.type !== t3.ATTRIBUTE || t7.name !== "class" || ((i9 = t7.strings) === null || i9 === void 0 ? void 0 : i9.length) > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t7) {
      return " " + Object.keys(t7).filter((i9) => t7[i9]).join(" ") + " ";
    }
    update(i9, [s10]) {
      var r10, o12;
      if (this.et === void 0) {
        this.et = /* @__PURE__ */ new Set(), i9.strings !== void 0 && (this.st = new Set(i9.strings.join(" ").split(/\s/).filter((t7) => t7 !== "")));
        for (const t7 in s10)
          s10[t7] && !((r10 = this.st) === null || r10 === void 0 ? void 0 : r10.has(t7)) && this.et.add(t7);
        return this.render(s10);
      }
      const e11 = i9.element.classList;
      this.et.forEach((t7) => {
        t7 in s10 || (e11.remove(t7), this.et.delete(t7));
      });
      for (const t7 in s10) {
        const i10 = !!s10[t7];
        i10 === this.et.has(t7) || ((o12 = this.st) === null || o12 === void 0 ? void 0 : o12.has(t7)) || (i10 ? (e11.add(t7), this.et.add(t7)) : (e11.remove(t7), this.et.delete(t7)));
      }
      return b;
    }
  });

  // src/components/input/persistable.ts
  var PersistableProps = {
    label: {
      type: String,
      reflect: true
    },
    persist: {
      type: Boolean,
      reflect: true
    },
    value: {
      type: String,
      reflect: true
    },
    onChange: {
      type: Function,
      reflect: true
    }
  };
  var setPersistent = (o12) => {
    if (o12.persist && o12.label)
      localStorage.setItem(o12.label, String(o12.value));
  };
  var getPersistent = (props) => {
    if (props.value)
      return props.value;
    else if (props.persist && props.label) {
      const val = localStorage.getItem(props.label);
      if (val === "null")
        return null;
      else if (val === "undefined")
        return void 0;
      else
        return val;
    }
  };

  // src/components/input/Input.ts
  var Input = class extends s4 {
    constructor(props = {}) {
      super();
      this.value = props.value ?? "";
      this.outline = props.outline ?? false;
      this.disabled = props.disabled ?? false;
      this.label = props.label;
      this.persist = props.persist;
      this.onChange = props.onChange;
      this.onInput = props.onInput;
      const val = getPersistent(props);
      if (val)
        this.value = val;
    }
    static get properties() {
      return Object.assign(PersistableProps, {
        disabled: { type: Boolean, reflect: true },
        outline: { type: Boolean, reflect: true }
      });
    }
    willUpdate(changedProps) {
      if (changedProps.has("value"))
        setPersistent(this);
    }
    static get styles() {
      return r`

        :host {
            width: 100%;
            font-size: 15px;

        }
*{
box-sizing: border-box;
}
.form-group {
position: relative;
margin: 15px 0;
}
input.outline {
border: 1px solid  #333333;
border-radius: 5px;
}
label {
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
color: gray;
padding: 0 0.3rem;
margin: 0 0.5rem;
transition: 0.1s ease-out;
transform-origin: left top;
pointer-events: none;
}
input {
outline: none;
border: none;
border-radius: 0px;
padding: 15px 0.6rem 10px 0.6rem;
transition: 0.1s ease-out;
border-bottom: 1px solid  #333333;
background: transparent;
cursor: text;
margin-left: auto;
width: 95%;
margin-right: auto;
}
input::placeholder {
    color: transparent;
}
input:focus{
border-color:  #b949d5;
}
input:focus + label{
color:  #b949d5;
top: 0;
transform: translateY(-50%) scale(0.9);
}
input:not(:placeholder-shown) + label{
top: 0;
transform: translateY(-50%) scale(0.9);
}
input:focus:not(.outline) ~ label,
input:not(:placeholder-shown):not(.outline) ~ label
{
padding-left: 0px;
}
input:disabled,  input:disabled ~ .label {
opacity: 0.5;
}

@media (prefers-color-scheme: dark) {
    label {
      color: rgb(120,120,120);
    }
  }
`;
    }
    render() {
      return $`
            <div class="form-group">
                <input
                class=${o6({
        outline: this.outline
      })}
                type="${this.type}"
                placeholder="${this.label}"
                .value=${this.value != "null" && this.value != "undefined" ? this.value : ""}
                ?disabled="${this.disabled}"

                @change=${(ev) => {
        this.value = ev.target.value;
        if (this.onChange instanceof Function)
          this.onChange(ev);
      }}

                @input=${(ev) => {
        if (this.onInput instanceof Function)
          this.onInput(ev);
      }}
                />
                <label>${this.label}</label>
            </div>
        `;
    }
  };
  customElements.define("visualscript-input", Input);

  // src/components/general/Search.ts
  var Search = class extends s4 {
    constructor(props = {}) {
      super();
      this.getModal = () => {
        return this.shadowRoot.querySelector("visualscript-modal");
      };
      if (props.items)
        this.items = props.items;
      window.onkeydown = (ev) => {
        switch (ev.code) {
          case "Enter":
            this.modal.open = false;
            break;
          case "ArrowUp":
            console.log("Up!");
            break;
          case "ArrowDown":
            console.log("Down!");
            break;
          case "Escape":
            this.modal.open = false;
            break;
        }
      };
    }
    static get styles() {
      return r`

    :host {
      display: flex;
      align-items: center;
      padding: 10px;
    }

    :host * {
      
      box-sizing: border-box;
      
    }

    button {
      padding: 5px;
      border-radius: 5px;
    }

    `;
    }
    static get properties() {
      return {
        placeholder: {
          type: String
        },
        items: {
          type: Object
        },
        value: {
          type: String,
          reflect: true
        }
      };
    }
    render() {
      const regex = new RegExp(this.value, "i");
      return $`
        <visualscript-button @click=${() => {
        this.modal = this.getModal();
        this.modal.toggle();
      }}>Search</visualscript-button>
        <visualscript-modal 
          .header=${$`<visualscript-input label="Search" @input=${(ev) => {
        this.value = ev.composedPath()[0].value;
      }}></visualscript-input>`}
          .footer=${$`<div id=commands>Enter to select. Up and Down Arrows to navigate. Esc to close.</div>`}
        >
        <div>${this.items.map((i9) => {
        let matched = false;
        if (this.value) {
          if (i9.tags)
            i9.tags.forEach((v3) => {
              if (v3.match(regex))
                matched = true;
            });
          if (i9.name.match(regex))
            matched = true;
        } else
          matched = true;
        if (matched)
          return $`<div><h3>${i9.name}</h3><small>${i9.tags ?? "No Tags"}</small></div>`;
      })}</div>
        </visualscript-modal>
      `;
    }
  };
  customElements.define("visualscript-search", Search);

  // src/components/input/Select.ts
  var Select = class extends s4 {
    constructor(props = {}) {
      super();
      this.persist = false;
      this.optionChecked = "";
      this.optionHoveredIndex = -1;
      this.options = [];
      this.onChange = () => {
      };
      this.add = (option) => {
        this.options = [...this.options, option];
      };
      this.openSelectCustom = () => {
        this.elements.elSelectCustom.classList.add("isActive");
        this.elements.elSelectCustom.setAttribute("aria-hidden", "false");
        if (this.optionChecked) {
          const optionCheckedIndex = this.elements.customOptsList.findIndex((el) => el.getAttribute("data-value") === this.optionChecked);
          this.updateCustomSelectHovered(optionCheckedIndex);
        }
        document.addEventListener("keydown", this.supportKeyboardNavigation);
      };
      this.closeSelectCustom = () => {
        this.elements.elSelectCustom.classList.remove("isActive");
        this.elements.elSelectCustom.setAttribute("aria-hidden", "true");
        this.updateCustomSelectHovered(-1);
        document.removeEventListener("keydown", this.supportKeyboardNavigation);
      };
      this.updateCustomSelectHovered = (newIndex) => {
        const prevOption = this.elements.elSelectCustomOpts.children[this.optionHoveredIndex];
        const option = this.elements.elSelectCustomOpts.children[newIndex];
        if (prevOption) {
          prevOption.classList.remove("isHover");
        }
        if (option) {
          option.classList.add("isHover");
        }
        this.optionHoveredIndex = newIndex;
      };
      this.updateCustomSelectChecked = (value, text) => {
        if (this.elements) {
          if (!text)
            text = this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0]?.textContent;
          const prevValue = this.optionChecked;
          const elPrevOption = this.elements.elSelectCustomOpts.querySelector(`[data-value="${prevValue}"`);
          const elOption = this.elements.elSelectCustomOpts.querySelector(`[data-value="${value}"`);
          if (elPrevOption) {
            elPrevOption.classList.remove("isActive");
          }
          if (elOption) {
            elOption.classList.add("isActive");
          }
          const elSelectCustomBox = this.elements.elSelectCustom.children[0].children[0];
          elSelectCustomBox.textContent = text;
          this.optionChecked = value;
        }
      };
      this.watchClickOutside = (e11) => {
        const didClickedOutside = !this.contains(e11.target);
        if (didClickedOutside) {
          this.closeSelectCustom();
        }
      };
      this.supportKeyboardNavigation = (e11) => {
        if (e11.keyCode === 40 && this.optionHoveredIndex < this.optionsCount - 1) {
          let index = this.optionHoveredIndex;
          e11.preventDefault();
          this.updateCustomSelectHovered(this.optionHoveredIndex + 1);
        }
        if (e11.keyCode === 38 && this.optionHoveredIndex > 0) {
          e11.preventDefault();
          this.updateCustomSelectHovered(this.optionHoveredIndex - 1);
        }
        if (e11.keyCode === 13 || e11.keyCode === 32) {
          e11.preventDefault();
          const option = this.elements.elSelectCustomOpts.children[this.optionHoveredIndex];
          const value = option && option.getAttribute("data-value");
          if (value) {
            this.elements.elSelectNative.value = value;
            this.updateCustomSelectChecked(value, option.textContent);
          }
          this.closeSelectCustom();
        }
        if (e11.keyCode === 27) {
          this.closeSelectCustom();
        }
      };
      this.options = props.options ?? [];
      if (props.onChange)
        this.onChange = props.onChange;
      if (props.label)
        this.label = props.label;
      if (props.persist)
        this.persist = props.persist;
      const val = getPersistent(props);
      if (val && this.options.includes(val))
        this.value = val;
    }
    static get styles() {
      return r`

    #container { 
      position: relative;
    }

    :host * {
      box-sizing: border-box;
    }

    .selectNative, .selectCustom {
      position: relative;
      width: 100%;
      font-size: 15px;
    }

    
    .selectCustom {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      background: white;
    }
    
    .selectNative:focus,
    .selectCustom.isActive .selectCustom-trigger {
      outline: none;
      box-shadow: white 0 0 5px 2px;
    }
    

    .select {
      position: relative;
    }
    
    .selectLabel {
      display: block;
      font-weight: bold;
      margin-bottom: 0.4rem;
    }
    
    .selectNative, .selectCustom-trigger {
      border: 1px solid #6f6f6f;
      border-radius: 0.4rem;
    }
    
    .selectNative {
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
      background-repeat: no-repeat;
      background-position-x: 100%;
      background-position-y: 0.45rem;
      padding: 10px 10px;
    }
    
    .selectCustom-trigger  > div {
      overflow: scroll;
      white-space: nowrap;
    }

    .selectCustom-trigger {
      display: flex;
      align-items: center;
      position: relative;
      padding: 0px 10px;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    
    .selectCustom-trigger::after {
      content: "▾";
      position: absolute;
      top: 0;
      line-height: 3.2rem;
      right: 0.5rem;
    }
    
    .selectCustom-trigger:hover {
      border-color: #028ee6;
    }
    
    .selectCustom-options {
      position: absolute;
      top: calc(2.8rem + 0.8rem);
      left: 0;
      width: 100%;
      border: 1px solid #6f6f6f;
      border-radius: 0.4rem;
      background-color: whitesmoke;
      box-shadow: 0 0 4px #e9e1f8;
      z-index: 1;
      padding: 0.8rem 0;
      display: none;
    }
    
    .selectCustom.isActive .selectCustom-options {
      display: block;
    }
    
    .selectCustom-option {
      position: relative;
      padding: 0.8rem;
      padding-left: 2.5rem;
      font-size: 80%;
    }

    .selectCustom-option.isHover,
    .selectCustom-option:hover {
      background-color: #1ea7fd; // contrast AA
      color: white;
      cursor: default;
    }
    
    .selectCustom-option:not(:last-of-type)::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: 1px solid #d3d3d3;
    }
    
    .selectCustom-option.isActive::before {
      content: "✓";
      position: absolute;
      left: 0.8rem;
    }


    /* This makes the Custom Select work... 
      Issues: Doesn't work inside of another component (e.g. Control), it clicks on that instead
    @media (hover: hover) {
      
      .selectCustom {
        display: block;
      }
    
      .selectNative:focus + .selectCustom {
        display: none;
      }
    }
    */

    @media (prefers-color-scheme: dark) {
      .selectCustom {
        background: rgb(59, 59, 59);
      }

      .selectNative {
        background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
      }

      .selectCustom-options {
        background: rgb(45, 45, 45);
      }
    }
    `;
    }
    static get properties() {
      return Object.assign({
        options: {
          type: Array,
          reflect: true
        }
      }, PersistableProps);
    }
    willUpdate(changedProps) {
      if (changedProps.has("value"))
        setPersistent(this);
      if (changedProps.has("options")) {
        const firstOption = this.options[0]?.value ?? this.options[0];
        this.value = this.value ?? firstOption;
      }
    }
    updated(changedProperties) {
      const elSelectNative = this.shadowRoot.querySelectorAll(".js-selectNative")[0];
      const elSelectCustom = this.shadowRoot.querySelectorAll(".js-selectCustom")[0];
      const elSelectCustomOpts = elSelectCustom.children[1];
      const customOptsList = Array.from(elSelectCustomOpts.children);
      this.optionsCount = customOptsList.length;
      this.elements = {
        elSelectNative,
        elSelectCustom,
        elSelectCustomOpts,
        customOptsList
      };
      if (this.value)
        this.updateCustomSelectChecked(this.value);
    }
    render() {
      return $`
      <div id=container>
      <select class="selectNative js-selectNative" aria-labelledby="${this.label}Label" 
      @change=${(e11) => {
        const value = e11.target.value;
        const elRespectiveCustomOption = this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0];
        this.updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
        this.value = e11.target.value;
        this.onChange(e11);
      }}>
      ${this.options.length === 0 ? $`<slot></slot>` : this.options.map((o12, i9) => {
        if (typeof o12 != "object")
          o12 = { value: o12, text: o12 };
        return $`<option 
          value=${o12.value} 
          ?selected=${o12.value === this.value} 
          >
            ${o12.text}
          </option>`;
      })}
    </select>

    <div class="selectCustom js-selectCustom" aria-hidden="true"}>
      <div class="selectCustom-trigger" @click=${(e11) => {
        const isClosed = !e11.target.parentNode.classList.contains("isActive");
        if (isClosed) {
          this.openSelectCustom();
        } else {
          this.closeSelectCustom();
        }
      }}>
        <div></div>
      </div>
        <div class="selectCustom-options">
        ${this.options.map((o12, i9) => {
        if (typeof o12 != "object")
          o12 = { value: o12, text: o12 };
        return $` <div 
          class="selectCustom-option" 
          data-value=${o12.value}
          @mouseenter=${(e11) => {
          this.updateCustomSelectHovered(i9);
        }}
          @click=${(e11) => {
          const value = e11.target.getAttribute("data-value");
          this.elements.elSelectNative.value = value;
          this.updateCustomSelectChecked(value, e11.target.textContent);
          this.closeSelectCustom();
        }}
          >
            ${o12.text}
          </div>`;
      })}
          </div>
        </div>
      </div>
    </div>
    `;
    }
  };
  customElements.define("visualscript-select", Select);

  // src/components/input/File.ts
  var File = class extends s4 {
    constructor(props = {}) {
      super();
      this.onChange = () => {
      };
      if (props.accept)
        this.accept = props.accept;
      if (props.onChange)
        this.onChange = props.onChange;
      if (props.webkitdirectory)
        this.webkitdirectory = props.webkitdirectory;
      if (props.directory)
        this.directory = props.directory;
      if (props.multiple)
        this.multiple = props.multiple;
    }
    static get styles() {
      return r`

    :host {
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
    
    input[type=file] {
      display: none;
    }

    :host * {
      box-sizing: border-box;
    }
    
    button {
      flex: auto;
      padding: 8px 12px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border: none;  
      color: #ffffff;
      background-color: #1ea7fd;
      width: 100%;
      cursor: pointer;    
      /* white-space: nowrap; */
      font-weight: bold;
    }

    .hide {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      border: 0;
    }

    input[type=text] {
      flex-grow: 1;
      padding: 10px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border: none;
      overflow: hidden;
    }

    input[type=text] {
      flex-grow: 1;
      padding: 8px 8px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border: none;
      color: black;
      background-color: white;
    }

    @media (prefers-color-scheme: dark) {
      input[type=text] {
        color: white;
        background-color: rgb(59, 59, 59);
      }
    }
    
    `;
    }
    static get properties() {
      return {
        accept: {
          type: String,
          reflect: true
        },
        onChange: {
          type: Function,
          reflect: true
        },
        webkitdirectory: {
          type: Boolean,
          reflect: true
        },
        directory: {
          type: Boolean,
          reflect: true
        },
        multiple: {
          type: Boolean,
          reflect: true
        }
      };
    }
    render() {
      const input = document.createElement("input");
      input.type = "file";
      input.id = "fileupload";
      input.accept = this.accept;
      input.webkitdirectory = this.webkitdirectory;
      input.directory = this.directory;
      input.multiple = this.multiple;
      input.onchange = (ev) => {
        const lenFiles = ev.target.files.length;
        const fileUploaded = ev.target.files[0];
        const input2 = this.shadowRoot.querySelector("input[type=text]");
        var filename = lenFiles === 1 ? fileUploaded.name : `${lenFiles} files`;
        input2.value = filename;
        input2.placeholder = filename;
        input2.focus();
        this.onChange(ev);
      };
      return $`
      <label for="fileupload" id="buttonlabel">
        <button aria-controls="filename" tabindex="0" @click=${() => {
        if (input)
          input.click();
      }}>Choose File</button>
      </label>
      ${input}
      <label for="filename" class="hide">
        uploaded file
      </label>
      <input type="text" id="filename" autocomplete="off" readonly placeholder="no file chosen">  
    `;
    }
  };
  customElements.define("visualscript-file", File);

  // src/components/input/Switch.ts
  var Switch = class extends s4 {
    constructor(props = {}) {
      super();
      this.persist = false;
      this.onChange = () => {
      };
      if (props.onChange)
        this.onChange = props.onChange;
      if (props.label)
        this.label = props.label;
      if (props.persist)
        this.persist = props.persist;
      const val = getPersistent(props);
      if (val)
        this.value = val;
    }
    static get styles() {
      return r`

    :host * {
      box-sizing: border-box;
    }

    [role="switch"] {  
      position: relative;
      border-radius: 0.5rem;
      padding: 1em 2em;
      cursor: pointer;
      background-color: white;
      border: none;
      border-radius: 14px;
      -webkit-transition: .4s;
      transition: .4s;
    }

    [role="switch"] * {
      pointer-events: none;
    }


    [role="switch"][aria-pressed="true"] {
      background-color: #1ea7fd;
    }

    [role="switch"][aria-pressed="true"] > .slider{
      -webkit-transform: translateY(-50%) translateX(100%);
      -ms-transform: translateY(-50%) translateX(100%);
      transform: translateY(-50%) translateX(100%);
    }

    /* Remove the default outline and 
    add the outset shadow */  
    [aria-pressed]:focus {
      outline: none;
      box-shadow: white 0 0 5px 2px;
    }

    /* The slider */
    .slider {
      padding: 3px;
      position: absolute;
      cursor: pointer;
      top: 50%;
      left: 0;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      -webkit-transition: .4s;
      transition: .4s;
      height: 100%;
      aspect-ratio: 1/1;
    }
    .slider > * {
      background-color: #ccc;
      width: 100%;
      height: 100%;
    }

    /* Rounded sliders */
    .slider.round > * {
      border-radius: 34px;
    }

    `;
    }
    static get properties() {
      return PersistableProps;
    }
    willUpdate(changedProps) {
      if (changedProps.has("value"))
        setPersistent(this);
    }
    render() {
      return $`
      <button class="switch" role="switch" aria-pressed="${String(this.value)}" aria-labelledby=${this.label} @click=${(e11) => {
        let pressed = e11.target.getAttribute("aria-pressed") === "true";
        this.value = !pressed;
        e11.target.setAttribute("aria-pressed", String(this.value));
        this.onChange(e11);
      }}>
        <div class="slider round"><div></div></div>
    </button>
    `;
    }
  };
  customElements.define("visualscript-switch", Switch);

  // src/components/input/Range.ts
  var Range = class extends s4 {
    constructor(props = {}) {
      super();
      this.persist = false;
      this.value = 0;
      this.min = 0;
      this.max = 100;
      this.onChange = () => {
      };
      this.onInput = () => {
      };
      if (props.onChange)
        this.onChange = props.onChange;
      if (props.label)
        this.label = props.label;
      if (props.persist)
        this.persist = props.persist;
      if (props.min)
        this.min = props.min;
      if (props.max)
        this.max = props.max;
      const val = getPersistent(props);
      if (val)
        this.value = val;
    }
    static get styles() {
      return r`

    :host {
      width: 100%;
      height: 100%;
    }

    :host * {
      box-sizing: border-box;
    }

    .wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    input[type="range"] {
      -webkit-appearance: none;
      position: relative;
      overflow: hidden;
      height: 30%;
      width: 100%;
      cursor: pointer;
      border: none;
      margin: 0;
  }
  
  output {
      position: absolute; 
      user-select: none; 
      pointer-events: none; 
      z-index: 1;
      top: 50%;
      left: 10px;
      transform: translate(0%, calc(-50% - 0.12rem));
      font-size: 80%;
  }
  
  input[type="range"]::-webkit-slider-runnable-track {
  }
  
  input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 0; /* 1 */
      height: 20px;
      box-shadow: -100vw 0 0 100vw #1ea7fd;
      opacity: 0.9;
      transition: opacity 0.5s;
  }
  
  input[type="range"]:hover::-webkit-slider-thumb{
      opacity: 1;
  }
  
  input[type="range"]::-moz-range-track {

  }
  
    .visually-hidden { 
        position: absolute !important;
        height: 1px; 
        width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap; /* added line */
    }

    `;
    }
    static get properties() {
      return Object.assign(PersistableProps, {
        min: {
          type: Number,
          reflect: true
        },
        max: {
          type: Number,
          reflect: true
        }
      });
    }
    willUpdate(changedProps) {
      if (changedProps.has("value"))
        setPersistent(this);
    }
    render() {
      return $`
      <div class="wrapper">
        <input type="range" min="${this.min}" max="${this.max}" id="${this.label}" @change=${(ev) => {
        this.value = ev.target.value;
        this.onChange(ev);
      }} @input=${(ev) => {
        this.onInput(ev);
      }}/>
        <output for="${this.label}">${this.value}</output>
        <label class="visually-hidden" for="${this.label}">${this.label}</label>
      </div>
    `;
    }
  };
  customElements.define("visualscript-range", Range);

  // node_modules/lit-html/directive-helpers.js
  var { H: i5 } = R;
  var t4 = (o12) => o12 === null || typeof o12 != "object" && typeof o12 != "function";
  var r5 = (o12) => o12.strings === void 0;

  // node_modules/lit-html/async-directive.js
  var e7 = (i9, t7) => {
    var s10, o12;
    const n12 = i9._$AN;
    if (n12 === void 0)
      return false;
    for (const i10 of n12)
      (o12 = (s10 = i10)._$AO) === null || o12 === void 0 || o12.call(s10, t7, false), e7(i10, t7);
    return true;
  };
  var o7 = (i9) => {
    let t7, s10;
    do {
      if ((t7 = i9._$AM) === void 0)
        break;
      s10 = t7._$AN, s10.delete(i9), i9 = t7;
    } while ((s10 == null ? void 0 : s10.size) === 0);
  };
  var n6 = (i9) => {
    for (let t7; t7 = i9._$AM; i9 = t7) {
      let s10 = t7._$AN;
      if (s10 === void 0)
        t7._$AN = s10 = /* @__PURE__ */ new Set();
      else if (s10.has(i9))
        break;
      s10.add(i9), l5(t7);
    }
  };
  function r6(i9) {
    this._$AN !== void 0 ? (o7(this), this._$AM = i9, n6(this)) : this._$AM = i9;
  }
  function h4(i9, t7 = false, s10 = 0) {
    const n12 = this._$AH, r10 = this._$AN;
    if (r10 !== void 0 && r10.size !== 0)
      if (t7)
        if (Array.isArray(n12))
          for (let i10 = s10; i10 < n12.length; i10++)
            e7(n12[i10], false), o7(n12[i10]);
        else
          n12 != null && (e7(n12, false), o7(n12));
      else
        e7(this, i9);
  }
  var l5 = (i9) => {
    var t7, e11, o12, n12;
    i9.type == t3.CHILD && ((t7 = (o12 = i9)._$AP) !== null && t7 !== void 0 || (o12._$AP = h4), (e11 = (n12 = i9)._$AQ) !== null && e11 !== void 0 || (n12._$AQ = r6));
  };
  var d2 = class extends i3 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i9, t7, s10) {
      super._$AT(i9, t7, s10), n6(this), this.isConnected = i9._$AU;
    }
    _$AO(i9, t7 = true) {
      var s10, n12;
      i9 !== this.isConnected && (this.isConnected = i9, i9 ? (s10 = this.reconnected) === null || s10 === void 0 || s10.call(this) : (n12 = this.disconnected) === null || n12 === void 0 || n12.call(this)), t7 && (e7(this, i9), o7(this));
    }
    setValue(t7) {
      if (r5(this._$Ct))
        this._$Ct._$AI(t7, this);
      else {
        const i9 = [...this._$Ct._$AH];
        i9[this._$Ci] = t7, this._$Ct._$AI(i9, this, 0);
      }
    }
    disconnected() {
    }
    reconnected() {
    }
  };

  // node_modules/lit-html/directives/private-async-helpers.js
  var s5 = class {
    constructor(t7) {
      this.U = t7;
    }
    disconnect() {
      this.U = void 0;
    }
    reconnect(t7) {
      this.U = t7;
    }
    deref() {
      return this.U;
    }
  };
  var i6 = class {
    constructor() {
      this.Y = void 0, this.q = void 0;
    }
    get() {
      return this.Y;
    }
    pause() {
      var t7;
      (t7 = this.Y) !== null && t7 !== void 0 || (this.Y = new Promise((t8) => this.q = t8));
    }
    resume() {
      var t7;
      (t7 = this.q) === null || t7 === void 0 || t7.call(this), this.Y = this.q = void 0;
    }
  };

  // node_modules/lit-html/directives/until.js
  var n7 = (t7) => !t4(t7) && typeof t7.then == "function";
  var h5 = class extends d2 {
    constructor() {
      super(...arguments), this._$Cwt = 1073741823, this._$Cyt = [], this._$CG = new s5(this), this._$CK = new i6();
    }
    render(...s10) {
      var i9;
      return (i9 = s10.find((t7) => !n7(t7))) !== null && i9 !== void 0 ? i9 : b;
    }
    update(s10, i9) {
      const r10 = this._$Cyt;
      let e11 = r10.length;
      this._$Cyt = i9;
      const o12 = this._$CG, h8 = this._$CK;
      this.isConnected || this.disconnected();
      for (let t7 = 0; t7 < i9.length && !(t7 > this._$Cwt); t7++) {
        const s11 = i9[t7];
        if (!n7(s11))
          return this._$Cwt = t7, s11;
        t7 < e11 && s11 === r10[t7] || (this._$Cwt = 1073741823, e11 = 0, Promise.resolve(s11).then(async (t8) => {
          for (; h8.get(); )
            await h8.get();
          const i10 = o12.deref();
          if (i10 !== void 0) {
            const r11 = i10._$Cyt.indexOf(s11);
            r11 > -1 && r11 < i10._$Cwt && (i10._$Cwt = r11, i10.setValue(t8));
          }
        }));
      }
      return b;
    }
    disconnected() {
      this._$CG.disconnect(), this._$CK.pause();
    }
    reconnected() {
      this._$CG.reconnect(this), this._$CK.resume();
    }
  };
  var c2 = e4(h5);

  // src/components/plots/TimeSeries.ts
  var colorscales = ["Hot", "Cold", "YlGnBu", "YlOrRd", "RdBu", "Portland", "Picnic", "Jet", "Greys", "Greens", "Electric", "Earth", "Bluered", "Blackbody"];
  var TimeSeries2 = class extends s4 {
    constructor(props = {}) {
      super();
      this.colorscale = "Electric";
      this.div = document.createElement("div");
      this.data = [];
      this.plotData = [];
      this.layout = {};
      this.windowSize = 300;
      this.binWidth = 256;
      this.colorscales = colorscales;
      this.config = {};
      this.getTraces = () => {
        return this.data.map((o12) => Object.assign({
          type: "scatter",
          mode: "lines"
        }, o12));
      };
      this.getConfig = () => {
        return Object.assign({
          displaylogo: false,
          responsive: true
        }, this.config);
      };
      this.getLayout = () => {
        return Object.assign({}, this.layout);
      };
      this.data = props.data ?? [];
      if (props.layout)
        this.layout = props.layout;
      if (window.Plotly)
        props.Plotly = window.Plotly;
      if (props.colorscale)
        this.colorscale = props.colorscale;
      if (props.onClick)
        this.onClick = props.onClick;
      if (props.onLegendClick)
        this.onLegendClick = props.onLegendClick;
      if (props.config)
        this.config = props.config;
      if (props.Plotly) {
        this.Plotly = props.Plotly;
        this.Plotly.newPlot(this.div, this.getTraces(), this.getLayout(), this.getConfig());
      } else
        console.warn("<visualscript-timeseries->: Plotly instance not provided...");
    }
    static get styles() {
      return r`

      :host {
        overflow: hidden;
      }
      
      `;
    }
    createRenderRoot() {
      return this;
    }
    static get properties() {
      return {
        max: {
          type: Number,
          reflect: true
        },
        data: {
          type: Array,
          reflect: true
        },
        layout: {
          type: Object,
          reflect: true
        },
        config: {
          type: Object,
          reflect: true
        },
        colorscale: {
          type: Object,
          reflect: true
        },
        backgroundColor: {
          type: String,
          reflect: true
        },
        onLegendClick: {
          type: Function,
          reflect: true
        },
        onClick: {
          type: Function,
          reflect: true
        }
      };
    }
    transpose(a5) {
      return Object.keys(a5[0]).map(function(c4) {
        return a5.map(function(r10) {
          return r10[c4];
        });
      });
    }
    willUpdate(changedProps) {
      if (changedProps.has("data")) {
        this.Plotly.newPlot(this.div, this.getTraces(), this.getLayout(), this.getConfig());
      }
      if (changedProps.has("onClick")) {
        this.div.on("plotly_click", this.onClick);
      }
      if (changedProps.has("onLegendClick")) {
        this.div.on("plotly_legendclick", this.onLegendClick);
      }
    }
    render() {
      return this.div;
    }
  };
  TimeSeries2.colorscales = colorscales;
  customElements.define("visualscript-timeseries", TimeSeries2);

  // src/components/plots/Spectrogram.ts
  var colorscales2 = ["Hot", "Cold", "YlGnBu", "YlOrRd", "RdBu", "Portland", "Picnic", "Jet", "Greys", "Greens", "Electric", "Earth", "Bluered", "Blackbody"];
  var Spectrogram2 = class extends s4 {
    constructor(props = {}) {
      super();
      this.colorscale = "Electric";
      this.div = document.createElement("div");
      this.data = [];
      this.plotData = [];
      this.layout = {};
      this.windowSize = 300;
      this.binWidth = 256;
      this.config = {};
      this.colorscales = colorscales2;
      this.getConfig = () => {
        return Object.assign({
          displaylogo: false,
          responsive: true
        }, this.config);
      };
      this.data = props.data ?? [[]];
      if (props.colorscale)
        this.colorscale = props.colorscale;
      if (props.config)
        this.config = props.config;
      if (window.Plotly)
        props.Plotly = window.Plotly;
      this.plotData = [
        {
          x: [1, 2],
          z: this.transpose(this.data),
          showscale: true,
          colorscale: this.colorscale,
          type: "heatmap"
        }
      ];
      this.layout = {};
      if (props.Plotly) {
        this.Plotly = props.Plotly;
        this.Plotly.newPlot(this.div, this.plotData, this.layout, this.getConfig());
      } else
        console.warn("<-spectrogram>: Plotly instance not provided...");
    }
    static get styles() {
      return r`

      `;
    }
    createRenderRoot() {
      return this;
    }
    static get properties() {
      return {
        max: {
          type: Number,
          reflect: true
        },
        data: {
          type: Array,
          reflect: true
        },
        config: {
          type: Object,
          reflect: true
        },
        colorscale: {
          type: Object,
          reflect: true
        },
        backgroundColor: {
          type: String,
          reflect: true
        }
      };
    }
    transpose(a5) {
      return Object.keys(a5[0]).map(function(c4) {
        return a5.map(function(r10) {
          return r10[c4];
        });
      });
    }
    willUpdate(changedProps) {
      if (changedProps.has("colorscale")) {
        if (!Array.isArray(this.colorscale) && !this.colorscales.includes(this.colorscale))
          this.colorscale = "Electric";
        this.Plotly.restyle(this.div, "colorscale", this.colorscale);
      }
      if (changedProps.has("data")) {
        this.plotData[0].z = this.transpose(this.data);
        this.Plotly.newPlot(this.div, this.plotData, this.layout, this.getConfig());
      }
    }
    render() {
      return this.div;
    }
  };
  Spectrogram2.colorscales = colorscales2;
  customElements.define("visualscript-spectrogram", Spectrogram2);

  // src/components/editors/ObjectEditor.ts
  var ObjectEditor = class extends s4 {
    constructor(props = { target: {}, header: "Object" }) {
      super();
      this.history = [];
      this.getMode = (target, plot) => {
        return plot ? "plot" : "view";
      };
      this.set = async (target = {}, plot = false) => {
        if (this.preprocess instanceof Function)
          this.target = await this.preprocess(target);
        else
          this.target = target;
        this.keys = Object.keys(this.target);
        this.mode = this.getMode(this.target, plot);
      };
      this.checkToPlot = (key, o12) => this.plot.length !== 0 && this.plot.reduce((a5, f3) => a5 + f3(key, o12), 0) === this.plot.length;
      this.getActions = async (key, o12) => {
        let actions;
        const val = await Promise.resolve(o12[key]);
        if (typeof val === "object") {
          const mode = this.getMode(val, this.checkToPlot(key, o12));
          actions = $`<visualscript-button primary=true size="small" @click="${async () => {
            this.history.push({ parent: o12, key: this.header });
            await this.set(val, this.checkToPlot(key, o12));
            this.header = key;
          }}">${mode[0].toUpperCase() + mode.slice(1)}</visualscript-button>`;
        }
        return $`
      <div class="actions">
            ${actions}
      </div>
      `;
      };
      this.getElement = async (key, o12) => {
        let display;
        const val = await Promise.resolve(o12[key]);
        if (typeof val === "string" && val.includes("data:image")) {
          display = document.createElement("img");
          display.src = val;
          display.style.height = "100%";
        } else {
          display = new Input();
          display.value = val;
          display.oninput = () => {
            o12[key] = display.value;
          };
        }
        const isObject = typeof val === "object";
        return $`
        <div class="attribute separate">
        <div class="info">
          <span class="name">${key}</span><br>
          <span class="value">${isObject ? Object.keys(val).length ? val.constructor?.name : $`Empty ${val.constructor?.name}` : ""}</span>
        </div>
          ${isObject ? await this.getActions(key, o12) : display}
        </div>`;
      };
      this.set(props.target);
      this.header = props.header ?? "Object";
      this.mode = props.mode ?? "view";
      this.plot = props.plot ?? [];
      this.onPlot = props.onPlot;
      if (props.preprocess)
        this.preprocess = props.preprocess;
      this.timeseries = new TimeSeries2({
        data: []
      });
    }
    static get styles() {
      return r`

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
      height: 100%;
      width: 100%;
      position: relative;
    }

    img {
      max-height: 100px;
    }

    .header {
      padding: 5px 10px;
      font-size: 70%;
      text-align: right;
    }

    .header span {
      font-weight: 800;
      font-size: 120%;
    }

    .container {
      width: 100%;
      padding: 10px;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: scroll;
      height: 100%;
    }

    .separate {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .attribute {
      width: 100%;
      font-size: 90%;
      padding: 15px;
      flex-grow: 1;
      flex-wrap: wrap;
    }

    .info {
      display: flex;
      align-items: center;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    @media (prefers-color-scheme: dark) {
      :host > * {
        background-color: rgb(40, 40, 40);
        box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
      }

      .header {
        border-bottom: 1px solid gray;
      }
    }

    `;
    }
    static get properties() {
      return {
        keys: {
          type: Object,
          reflect: true
        },
        plot: {
          type: Object,
          reflect: true
        },
        header: {
          type: String,
          reflect: true
        },
        mode: {
          type: String,
          reflect: true
        },
        onPlot: {
          type: Function,
          reflect: true
        },
        preprocess: {
          type: Function,
          reflect: true
        }
      };
    }
    render() {
      if (this.mode === "plot") {
        if (this.onPlot instanceof Function)
          this.onPlot(this);
        this.insertAdjacentElement("afterend", this.timeseries);
      } else
        this.timeseries.remove();
      const content = this.mode === "view" ? this.keys?.map((key) => this.getElement(key, this.target)) : [];
      return c2(Promise.all(content).then((data) => {
        return $`
        <div>
          <div class="header">
            ${this.history.length > 0 ? $`<visualscript-button size="extra-small" @click="${() => {
          const historyItem = this.history.pop();
          this.set(historyItem.parent);
          this.header = historyItem.key;
        }}">Go Back</visualscript-button>` : ``}
          </div>
          <div class="container">
                ${data}
          </div>
        </div>
      `;
      }), $`<span>Loading...</span>`);
    }
  };
  customElements.define("visualscript-object-editor", ObjectEditor);

  // src/components/editors/CodeEditor.ts
  var import_prismjs = __toESM(require_prism(), 1);
  var CodeEditor = class extends s4 {
    constructor(props = {}) {
      super();
      this.textArea = document.createElement("textarea");
      this.text = (text) => {
        const highlight = this.shadowRoot.getElementById("highlight");
        if (highlight) {
          const el = highlight.querySelector("code");
          let replacedText = text.replace(new RegExp("&", "g"), "&amp").replace(new RegExp("<", "g"), "&lt;");
          el.innerHTML = replacedText;
          import_prismjs.default.highlightElement(el);
        }
      };
      this.scroll = (element) => {
        const highlight = this.shadowRoot.getElementById("highlight");
        if (highlight) {
          highlight.scrollTop = element.scrollTop;
          if (highlight.scrollTop < element.scrollTop)
            element.scrollTop = highlight.scrollTop;
          highlight.scrollLeft = element.scrollLeft;
        }
      };
      this.value = props.value ?? "";
      if (props.onInput)
        this.onInput = props.onInput;
      if (props.onSave)
        this.onSave = props.onSave;
      if (props.onReset)
        this.onReset = props.onReset;
      if (props.onClose)
        this.onClose = props.onClose;
      this.textArea.id = "editor";
      this.textArea.spellcheck = false;
      this.textArea.oninput = (ev) => {
        this.text(this.textArea.value);
        this.scroll(ev.target);
        if (this.onInput instanceof Function)
          this.onInput(ev);
      };
    }
    static get styles() {
      return r`

    
    :host {
      
      width: 100%; 
      height: 100%; 
      overflow: scroll;
      background: rgb(205,205,205);

    }

    :host * {
      box-sizing: border-box;
      
    }

    :host > * {
      overflow: hidden;
    }

    #editorContainer {
      position: relative;
       width: 100%; 
       height: 100%;
    }

    h3 {
      margin: 0;
    }

    #actions {
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      padding: 10px 25px;
      z-index: 2;
    }

  button {
      margin: 0px;
      border-radius: 0px;
      border: 1px solid rgb(35,35,35);
      padding: 0px 15px;
      font-size: 60%;
  }
  
  textarea {
      border: none;
  }
  
  #editor {
      background: transparent;
      z-index: 1;
  }
  
  
  #highlight {
      // background-color: rgba(0,0,0,0.8) !important; 
      z-index: -1 !important;
      white-space: pre !important;
      position:absolute !important;
      top: 0 !important;
      left: 0 !important;
  }
  
  #editor, #highlight {
    margin: 0px !important;
    width: 100% !important;
    height: 100% !important;
    overflow: auto !important;
    white-space: nowrap !important;
    padding: 25px !important;
    resize: none !important;
    -moz-tab-size : 4 !important;
      -o-tab-size : 4 !important;
         tab-size : 4 !important;
  }
  
  #editor, #highlight, #highlight code {
      font-size: 12px !important;
      font-family: monospace !important;
      line-height: 20pt !important;
      box-sizing: border-box !important;
  }
  
  @media (prefers-color-scheme: dark) {

    #editorContainer {
      background-color: rgb(20, 20, 20);
    }

    #editor {
      caret-color: white;
    }
  }

    `;
    }
    static get properties() {
      return {
        value: {
          type: String,
          reflect: true
        }
      };
    }
    willUpdate(changedProps) {
    }
    render() {
      const language = "javascript";
      this.textArea.placeholder = `Write your ${language} code...`;
      this.textArea.value = this.value;
      return $`
      <div id='editorContainer'>
        ${this.textArea}"
          <pre id="highlight" aria-hidden="true">
            <code class="language-${language}"></code>
        </pre>
    </div>
    `;
    }
  };
  customElements.define("visualscript-code-editor", CodeEditor);

  // src/components/editors/GraphEditor.ts
  var GraphEditor = class extends s4 {
    constructor(props = { tree: {} }) {
      super();
      this.history = [];
      this.set = async (tree = {}) => {
        this.tree = tree;
        this.keys = Object.keys(this.tree);
      };
      this.getElement = async (key, o12) => {
        let display;
        const val = await Promise.resolve(o12[key]);
        if (typeof val === "string" && val.includes("data:image")) {
          display = document.createElement("img");
          display.src = val;
          display.style.height = "100%";
        } else {
          display = new Input();
          display.value = val;
          display.oninput = () => {
            o12[key] = display.value;
          };
        }
        const isObject = typeof val === "object";
        return $`
        <div class="attribute separate">
        <div class="info">
          <span class="name">${key}</span><br>
          <span class="value">${isObject ? Object.keys(val).length ? val.constructor?.name : $`Empty ${val.constructor?.name}` : ""}</span>
        </div>
          ${key}${o12}
        </div>`;
      };
      this.set(props.tree);
    }
    static get styles() {
      return r`

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }

    img {
      max-height: 100px;
    }

    .container {
      width: 100%;
      padding: 10px;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: scroll;
      height: 100%;
    }

    .separate {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .attribute {
      width: 100%;
      font-size: 90%;
      padding: 15px;
      flex-grow: 1;
      flex-wrap: wrap;
    }

    .info {
      display: flex;
      align-items: center;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    @media (prefers-color-scheme: dark) {
      :host > * {
        background-color: rgb(40, 40, 40);
      }
    }

    `;
    }
    static get properties() {
      return {
        keys: {
          type: Object,
          reflect: true
        }
      };
    }
    render() {
      return $`
          <div class="container">
                ${this.tree}
          </div>
      `;
    }
  };
  customElements.define("visualscript-graph-editor", GraphEditor);

  // src/components/editors/DeviceEditor.ts
  var DeviceEditor = class extends s4 {
    static get styles() {
      return r`
    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `;
    }
    static get properties() {
      return {};
    }
    constructor(props = { target: {}, header: "Object" }) {
      super();
    }
    render() {
      return $`

      <slot></slot>
    `;
    }
  };
  customElements.define("visualscript-device-editor", DeviceEditor);

  // src/components/editors/SessionEditor.ts
  var SessionEditor = class extends s4 {
    static get styles() {
      return r`
    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `;
    }
    static get properties() {
      return {};
    }
    constructor(props = { target: {}, header: "Object" }) {
      super();
    }
    render() {
      return $`

      <slot></slot>
    `;
    }
  };
  customElements.define("visualscript-session-editor", SessionEditor);

  // src/components/dashboard/Dashboard.ts
  var slotGrid = r`

slot {
  display: grid;
  grid-template-columns: 1fr fit-content(100%);
  grid-template-rows: fit-content(75px) 1fr fit-content(75px);
  grid-template-areas: 
          "nav nav"
          "main side"
          "foot foot";

  width: 100%;
  height: 100%;
}

`;
  var Dashboard = class extends s4 {
    constructor(props = {}) {
      super();
      this.apps = /* @__PURE__ */ new Map();
      this.open = props.open ?? true;
      this.closeHandler = props.closeHandler ?? (() => {
      });
      if (props.toggletext)
        this.toggletext = props.toggletext;
      this.toggle = typeof props.toggle === "string" ? document.getElementById(props.toggle) : props.toggle;
    }
    static get styles() {
      return r`
    
    :host {
      color-scheme: light dark;
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      grid-area: main;
      overflow: hidden;
    }

    :host([global]) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      pointer-events: none;
    }

    :host([open]) {
      pointer-events: all;
    }


    :host([global]) slot {
      opacity: 0;
      pointer-events: none;
    }

    :host([open]) #close {
      display: block;
    }

    :host * {
      box-sizing: border-box;
    }

    slot {
      background: white;
      color: black;
    }

    ${slotGrid}

    :host([open]) slot {
      opacity: 1;
      pointer-events: all;
    }

    #close {
      position: absolute; 
      top: 22px;
      right: 22px;
      z-index: 101;
      display: none;
    }

    #dashboard-toggle {
      background: white;
      position: absolute; 
      pointer-events: all;
      top: 0px;
      right: 22px;
      z-index: 1000;
      color: black;
      border: 1px solid black;
      border-top: none;
      padding: 10px 15px;
      cursor: pointer;
      font-size: 70%;
      font-weight: bold;
      border-bottom-left-radius: 7px;
      border-bottom-right-radius: 7px;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
    }

    :host([open]) #dashboard-toggle {
      display: none;
    }

    @media (prefers-color-scheme: dark) {
      slot {
        color: white;
        background: black;
      }

      #dashboard-toggle { 
        border: 1px solid white;
        border-top: none;
        color: white;
        box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
        background: black;
      }
    }
    `;
    }
    static get properties() {
      return {
        toggletext: {
          type: String,
          reflect: true
        },
        toggle: {
          type: Object,
          reflect: true
        },
        open: {
          type: Boolean,
          reflect: true
        },
        closeHandler: {
          type: Function,
          reflect: true
        },
        global: {
          type: Boolean,
          reflect: true
        }
      };
    }
    render() {
      if (this.global)
        this.classList.add("global");
      else
        this.classList.remove("global");
      if (this.global) {
        const apps = document.querySelectorAll("visualscript-app");
        for (var i9 = 0; i9 < apps.length; i9++) {
          const app2 = apps[i9];
          if (!this.apps.has(app2.name))
            this.apps.set(app2.name, app2);
        }
      }
      if (this.open)
        this.classList.add("open");
      else {
        this.classList.remove("open");
        this.dispatchEvent(new CustomEvent("close"));
      }
      this.main = this.querySelector("visualscript-main");
      this.footer = this.querySelector("visualscript-footer");
      this.nav = this.querySelector("visualscript-nav");
      this.sidebar = this.querySelector("visualscript-sidebar");
      const onClick = () => {
        this.open = true;
        const selectedApp = this.apps.values().next().value;
        selectedApp.toggle.shadowRoot.querySelector("button").click();
      };
      if (this.toggle)
        this.toggle.onclick = onClick;
      return $`
      ${this.global && !this.toggle ? $`<div id="dashboard-toggle" @click=${onClick}>${this.toggletext ?? "Edit"}</div>` : ""}
      ${this.global ? $`<visualscript-button id='close' secondary size="small" @click=${() => this.open = false}>Close</visualscript-button>` : ``}
      <slot>
      </slot>
    `;
    }
  };
  customElements.define("visualscript-dashboard", Dashboard);

  // src/components/dashboard/tabs/TabToggle.ts
  var TabTogglePropsLit = {
    name: {
      type: String,
      reflect: true
    },
    selected: {
      type: Boolean,
      reflect: true
    }
  };
  var TabToggle = class extends s4 {
    constructor(tab) {
      super();
      this.select = (toggles) => {
        this.to.on(this);
        if (!toggles) {
          const parent2 = this.parentNode;
          const tabContainer = parent2.getRootNode().host;
          toggles = Array.from(tabContainer.tabs.values()).map((tab) => tab.toggle);
        }
        if (toggles) {
          this.selected = true;
          toggles.forEach((t7) => {
            if (t7 != this) {
              t7.selected = false;
              t7.to.style.display = "none";
              t7.to.off(this);
            } else {
              t7.to.style.display = "";
            }
          });
        } else
          console.warn("No TabBar instance in the global Main");
        const dashboard = this.to.dashboard;
        if (dashboard) {
          const sidebar = dashboard.querySelector("visualscript-sidebar");
          if (sidebar) {
            sidebar.content = this.to.controlPanel.children.length ? this.to.controlPanel : "";
          }
        }
      };
      this.to = tab;
    }
    static get styles() {
      return r`

    :host {
      flex-grow: 1;
    }

    :host * {
      box-sizing: border-box;
    }

    button {
        color: black;
        background: rgb(205,205,205);
        border-right: 1px solid rgb(230,230,230);
        border: 0px;
        padding: 6px 20px;
        text-align: center;
        font-size: 80%;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    button > span {
      font-size: 60%;
    }

    button:hover {
        background: rgb(230,230,230);
      }
  
      button:active {
        background: rgb(210,210,210);
      }
  
      button.selected {
        background: rgb(230,230,230);
      }


      @media (prefers-color-scheme: dark) {
        button {
            color: white;
            background: rgb(50,50,50);
            border-right: 1px solid rgb(25,25,25);
        }

        button:hover {
            background: rgb(60,60,60);
        }
      
        button:active {
        background: rgb(75,75,75);
        }
      
        button.selected {
        background: rgb(60,60,60);
        }

      }
    `;
    }
    static get properties() {
      return TabTogglePropsLit;
    }
    render() {
      return $`
      <button class="${this.selected ? "selected" : ""}"  @click=${() => this.select()}>${this.to.name ?? `Tab`}</button>
    `;
    }
  };
  customElements.define("visualscript-tab-toggle", TabToggle);

  // src/components/dashboard/Control.ts
  var Control = class extends s4 {
    constructor(props = {}) {
      super();
      this.label = "Control";
      this.type = "button";
      this.persist = false;
      this.options = [];
      this.onChange = () => {
      };
      this.getElement = () => {
        if (this.type === "select")
          this.element = new Select(this);
        else if (this.type === "file")
          this.element = new File(this);
        else if (this.type === "switch")
          this.element = new Switch(this);
        else if (this.type === "range")
          this.element = new Range(this);
        else if (["input", "text", "number"].includes(this.type))
          this.element = new Input(this);
        else
          this.element = new Button(this);
      };
      this.willUpdate = (changedProps) => {
        changedProps.forEach((v3, k3) => {
          if (this.element)
            this.element[k3] = this[k3];
        });
      };
      if (props.label)
        this.label = props.label;
      if (props.type)
        this.type = props.type;
      if (props.park)
        this.park = props.park;
      if (props.persist)
        this.persist = props.persist;
      if (props.options)
        this.options = props.options;
      if (props.value)
        this.value = props.value;
      if (props.onChange)
        this.onChange = props.onChange;
      if (props.accept)
        this.accept = props.accept;
      if (props.webkitdirectory)
        this.webkitdirectory = props.webkitdirectory;
      if (props.directory)
        this.directory = props.directory;
      if (props.multiple)
        this.multiple = props.multiple;
      if (props.onClick)
        this.onClick = props.onClick;
      if (props.primary)
        this.primary = props.primary;
      if (props.backgroundColor)
        this.backgroundColor = props.backgroundColor;
      if (props.size)
        this.size = props.size;
    }
    static get styles() {
      return r`

    :host {
      width: 100%;
      height: 100%;
    }

    slot {
      display: none;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 5px;
      margin: 10px;
      border: 1px solid rgb(180,180,180);
      /* white-space: nowrap; */
    }

    h5 {
      margin: 0;
    }


    div > * {
      padding: 10px;
    }

    span { 
      flex-grow: 1;
    }

    @media (prefers-color-scheme: dark) {
      div {
        border: 1px solid rgb(120,120,120);
      }
    }

    `;
    }
    static get properties() {
      return {
        label: {
          type: String,
          reflect: true
        },
        type: {
          type: String,
          reflect: true
        },
        persist: {
          type: Boolean,
          reflect: true
        },
        park: {
          type: Boolean,
          reflect: true
        },
        value: {
          type: Object,
          reflect: true
        },
        options: {
          type: Object,
          reflect: true
        },
        onChange: {
          type: Object,
          reflect: true
        },
        accept: {
          type: String,
          reflect: true
        },
        webkitdirectory: {
          type: Boolean,
          reflect: true
        },
        directory: {
          type: Boolean,
          reflect: true
        },
        multiple: {
          type: Boolean,
          reflect: true
        },
        primary: {
          type: Boolean,
          reflect: true
        },
        backgroundColor: {
          type: String,
          reflect: true
        },
        size: {
          type: String,
          reflect: true
        },
        onClick: {
          type: Object,
          reflect: true
        }
      };
    }
    render() {
      this.getElement();
      return $`<div><h5>${this.label}</h5>${this.element}</div><slot></slot>`;
    }
    updated(changedProperties) {
      const slot = this.shadowRoot.querySelector("slot");
      const nodes = slot.assignedNodes();
      if (this.type === "button" && nodes.length)
        nodes.forEach((el) => this.element.appendChild(el.cloneNode()));
    }
  };
  customElements.define("visualscript-control", Control);

  // src/components/dashboard/tabs/Tab.ts
  var tabStyle = r`

:host {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: inherit;
  display: block;
}

slot {
  overflow: scroll;
}

:host * {
  
  box-sizing: border-box;
  
}
`;
  var TabPropsLit = {
    name: {
      type: String,
      reflect: true
    },
    controls: {
      type: Array,
      reflect: true
    },
    on: {
      type: Function,
      reflect: true
    },
    off: {
      type: Function,
      reflect: true
    }
  };
  var Tab = class extends s4 {
    constructor(props = {}) {
      super();
      this.controls = [];
      this.on = () => {
      };
      this.off = () => {
      };
      this.type = "tab";
      this.addControl = (instance) => {
        this.controlPanel.appendChild(instance);
      };
      this.updated = () => {
        const controls = this.querySelectorAll("visualscript-control");
        controls.forEach((control) => {
          if (this.type === "app")
            control.park = true;
          else if (!control.park)
            this.addControl(control);
        });
      };
      if (props.name)
        this.name = props.name;
      if (props.controls)
        this.controls = props.controls;
      if (props.on)
        this.on = props.on;
      if (props.off)
        this.off = props.off;
      let dashboards = document.body.querySelectorAll("visualscript-dashboard");
      this.dashboard = Array.from(dashboards).find((o12) => o12.parentNode === document.body) ?? new Dashboard();
      this.dashboard.global = true;
      this.dashboard.open = false;
      this.toggle = new TabToggle(this);
      this.dashboard.addEventListener("close", (ev) => {
        this.off(this.toggle);
      });
    }
    static get styles() {
      return tabStyle;
    }
    static get properties() {
      return TabPropsLit;
    }
    willUpdate(changedProps) {
      if (changedProps.has("controls")) {
        this.controlPanel = document.createElement("div");
        this.controls.forEach((o12) => {
          this.addControl(new Control(o12));
        });
      }
    }
    render() {
      return $`
      <slot></slot>
    `;
    }
  };
  customElements.define("visualscript-tab", Tab);

  // src/components/dashboard/App.ts
  var App = class extends Tab {
    constructor(props = {}) {
      const tabProps = Object.assign({
        on: (target) => {
          this.dashboard.main.appendChild(this);
          if (props.on instanceof Function)
            props.on(target);
        },
        off: (target) => {
          this.style.display = "";
          this.parent.appendChild(this);
          if (props.off instanceof Function)
            props.off(target);
        }
      }, props);
      tabProps.name = props.name;
      super(tabProps);
      this.name = props.name;
      this.type = "app";
      this.parent = this.parentNode;
    }
    static get styles() {
      return r`
    :host {
      color-scheme: light dark;
      max-width: 100vw;
      max-height: 100vh;
    }


    slot {
      overflow: hidden !important;
    }

    ${tabStyle}
    ${slotGrid}
    `;
    }
    static get properties() {
      return Object.assign({}, TabPropsLit);
    }
    render() {
      if (!parent)
        this.parent = this.parentNode;
      return $`
        <slot></slot>
      `;
    }
  };
  customElements.define("visualscript-app", App);

  // src/components/dashboard/tabs/TabBar.ts
  var TabBarPropsLit = {};
  var TabBar = class extends s4 {
    static get styles() {
      return r`

    :host {
      background: whitesmoke;
      overflow-y: hidden;
      overflow-x: scroll;
      display: flex;
      position: sticky;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1000;
    }

    /* Tab Scrollbar */
    :host::-webkit-scrollbar {
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    :host::-webkit-scrollbar-track {
      background: transparent;
    }

    :host::-webkit-scrollbar-thumb {
      border-radius: 10px;
    }

    /* Handle on hover */
    :host(:hover)::-webkit-scrollbar-thumb {
      background: rgb(118, 222, 255);
    }

      @media (prefers-color-scheme: dark) {

        :host {
          background: rgb(25,25,25);
        }

        :host(:hover)::-webkit-scrollbar-thumb {
          background: rgb(240, 240, 240);
        }

      }
    `;
    }
    static get properties() {
      return TabBarPropsLit;
    }
    constructor(props = {}) {
      super();
    }
    render() {
      return $`
      <slot></slot>
    `;
    }
  };
  customElements.define("visualscript-tab-bar", TabBar);

  // src/components/dashboard/Main.ts
  var Main = class extends s4 {
    constructor(props = { target: {}, header: "Object" }) {
      super();
      this.tabs = /* @__PURE__ */ new Map();
      this.getTabs = () => {
        const tabs = [];
        if (this.parentNode?.global) {
          const apps = document.querySelectorAll("visualscript-app");
          for (var i9 = 0; i9 < apps.length; i9++) {
            if (!tabs.includes(apps[i9]))
              tabs.push(apps[i9]);
          }
        }
        for (var i9 = 0; i9 < this.children.length; i9++) {
          const child = this.children[i9];
          if (child instanceof Tab)
            tabs.push(child);
        }
        tabs.forEach((tab) => this.tabs.set(tab.name, tab));
        return tabs;
      };
    }
    static get styles() {
      return r`

    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      grid-area: main;
      overflow: hidden;
      background: inherit;
      color: inherit;
      position: relative;
    }

    :host * {
      box-sizing: border-box;
    }
    `;
    }
    static get properties() {
      return {
        tabs: {
          type: Object
        }
      };
    }
    render() {
      const tabs = this.getTabs();
      const toggles = tabs.map((t7, i9) => {
        if (i9 !== 0)
          t7.style.display = "none";
        return t7.toggle;
      });
      return $`
      <visualscript-tab-bar style="${toggles.length < 1 ? "display: none;" : ""}">${toggles}</visualscript-tab-bar>
      <slot></slot>
    `;
    }
  };
  customElements.define("visualscript-main", Main);

  // src/components/dashboard/Gallery.ts
  var Gallery = class extends s4 {
    constructor(props = {}) {
      super();
      this.things = [];
      this.search = false;
      this.load = (thing, i9) => {
        thing.style.display = "none";
        return $`<div id=tile @click=${() => {
          console.log("clicked!");
        }}>
        <div>
          <h3>${thing.name}</h3>
          <p>Item #${i9}.</p>
        <div>
      </div>`;
      };
      this.getThings = () => {
        this.things = [];
        for (var i9 = 0; i9 < this.children.length; i9++) {
          const child = this.children[i9];
          if (child.name)
            this.things.push(child);
        }
        return this.things;
      };
      if (props.search)
        this.search = props.search;
    }
    static get styles() {
      return r`

    :host {
      width: 100%;
      height: 100%;
    } 

    #things {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    #tile {
      box-sizing: border-box;
      flex: 1 0 auto;
      aspect-ratio: 1 / 1 ;
      max-width: 200px;
      border-radius: 10px;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.2);
      cursor: pointer;
      transition: 0.5s;
    }

    #tile:hover{
      background: rgba(0,0,0,0.1);
    }

    #tile > div {
      padding: 25px;
    }
    `;
    }
    static get properties() {
      return {};
    }
    render() {
      this.getThings();
      return $`
      <visualscript-search .items=${this.things}></visualscript-search>
      <div id=things>
      ${this.things.map(this.load)}
      </div>
      <section>
        <slot></slot>
      </section>
    `;
    }
  };
  customElements.define("visualscript-gallery", Gallery);

  // src/components/dashboard/tabs/TabContainer.ts
  var TabContainer = class extends s4 {
    constructor(props = {}) {
      super();
      this.tabs = /* @__PURE__ */ new Map();
      this.tabLabels = [];
      this.addTab = (tab) => {
        this.insertAdjacentElement("beforeend", tab);
        this.tabs.set(tab.name, tab);
        this.updateTabs();
      };
      this.removeTab = (tab) => {
        if (tab instanceof Tab)
          tab = tab.name;
        const tabObj = this.tabs.get(tab);
        tabObj.remove();
        this.updateTabs();
        this.tabs.delete(tab);
      };
      this.updateTabs = () => {
        this.tabLabels = Array.from(this.tabs.values()).map((t7) => t7.name);
      };
      this.getTabs = () => {
        this.tabs = /* @__PURE__ */ new Map();
        for (var i9 = 0; i9 < this.children.length; i9++) {
          const child = this.children[i9];
          if (child instanceof Tab)
            this.tabs.set(child.name, child);
        }
        this.updateTabs();
        return Array.from(this.tabs.values());
      };
    }
    static get styles() {
      return r`

    :host {
      box-sizing: border-box;
      grid-area: main;
      overflow: hidden;
      background: inherit;
      color: inherit;
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-areas:
          "tabs"
          "content";
      grid-template-rows: min-content 1fr;
    }

    :host * {
      box-sizing: border-box;
    }

    #notabs {
      width: 100%;
      height: 100%;
      display: flex; 
      align-items: center;
      justify-content: center;
      font-size: 80%;
    }
    `;
    }
    static get properties() {
      return {
        tabLabels: {
          type: Object,
          reflect: true
        },
        tabs: {
          type: Object
        }
      };
    }
    render() {
      const tabs = this.getTabs();
      const toggles = tabs.map((t7, i9) => {
        if (i9 !== 0)
          t7.style.display = "none";
        return t7.toggle;
      });
      const firstToggle = toggles[0];
      if (firstToggle)
        firstToggle.select(toggles);
      return $`
      <visualscript-tab-bar style="${toggles.length < 1 ? "display: none;" : ""}">${toggles}</visualscript-tab-bar>
      <slot><div id="notabs">No Tabs Open</div></slot>
    `;
    }
  };
  customElements.define("visualscript-tab-container", TabContainer);

  // src/components/dashboard/sidebar/Sidebar.ts
  var collapseThreshold = 600;
  var Sidebar = class extends s4 {
    constructor(props = {}) {
      super();
      this.content = "";
      this.interacted = false;
      this.closed = props.closed;
      this.classList.add("default");
    }
    static get styles() {
      return r`

    
    :host {

      --collapse-width: ${collapseThreshold}px;
      --dark-color: rgb(25, 25, 25);
      --light-color: rgb(240, 240, 240);

      --blue-spiral: repeating-linear-gradient(
        45deg,
        rgb(30, 167, 253),
        rgb(30, 167, 253) 10px,
        rgb(118, 222, 255) 10px,
        rgb(118, 222, 255) 20px
      );

      /* Light Hue: 118, 222, 255 */
      /* Dark Hue: 0, 116, 196 */

      --light-spiral: repeating-linear-gradient(
        45deg,
        rgb(190, 190, 190),
        rgb(190, 190, 190) 10px,
        rgb(240, 240, 240) 10px,
        rgb(240, 240, 240) 20px
      );

      --dark-spiral: repeating-linear-gradient(
        45deg,
        rgb(25, 25, 25),
        rgb(25, 25, 25) 10px,
        rgb(75, 75, 75) 10px,
        rgb(75, 75, 75) 20px
      );

      --final-toggle-width: 15px;

      color: black;
      grid-area: side;
      background: var(--light-color);
      position: relative;
      display: flex;
      overflow: hidden;
      max-width: 50vw;
    }


    :host > * {
      box-sizing: border-box;
    }

    :host([closed]) > #main {
        width: 0px;
        overflow: hidden;
    }

    :host([closed]) > #toggle {
      width: var(--final-toggle-width);
    }

    #main {
      overflow: hidden;
    }

    #toggle:hover { 
      background: var(--blue-spiral)
    }

    .hidden {
      display: none;
    }

    #toggle {
      height: 100%;
      width: 10px;
      background: rgb(25, 25, 25);
      cursor: pointer;
      background: var(--light-spiral);
      border:none;
    }

    #toggle:active {
      background: var(--blue-spiral)
    }

    #controls {
      overflow-x: hidden;
      overflow-y: scroll;
      height: 100%;
    }

    @media only screen and (max-width: ${collapseThreshold}px) {
      :host {
        max-width: 100%;
      }

      :host(.default) > #main {
          width: 0px;
          overflow: hidden;
      }

      :host(.default) > #toggle {
        width: var(--final-toggle-width);
      }
    }


    #toggle {
      position: sticky;
      left:0;
      top: 0;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        color: white;
        background: var(--dark-color);
      }

      #toggle {
        background: var(--dark-spiral)
      }
    }

    `;
    }
    static get properties() {
      return {
        closed: {
          type: Boolean,
          reflect: true
        },
        content: {
          type: Object,
          reflect: true
        }
      };
    }
    render() {
      const renderToggle = this.content || this.children?.length;
      return $`
        <button id=toggle class="${!!renderToggle ? "" : "hidden"}" @click=${() => {
        const wasDefault = this.classList.contains("default");
        this.classList.remove("default");
        if (window.innerWidth < collapseThreshold) {
          if (!wasDefault)
            this.closed = !this.closed;
        } else
          this.closed = !this.closed;
      }}></button>
        <div id=main>
          <div id=controls>
          ${this.content}
          <slot></slot>
          </div>
        </div>
      `;
    }
  };
  customElements.define("visualscript-sidebar", Sidebar);

  // src/components/dashboard/sidebar/SidebarHeader.ts
  var SidebarHeader = class extends s4 {
    static get styles() {
      return r`

    :host {
      width: 100%;
    }

    h4 {
      background: rgb(25, 25, 25);
      color: white;
      margin: 0px;
      padding: 10px 25px;
    }

    @media (prefers-color-scheme: dark) {
      h4 {
        color: black;
        background: rgb(60, 60, 60);
      }
    }

    `;
    }
    static get properties() {
      return {};
    }
    constructor(props = {}) {
      super();
    }
    render() {
      return $`
          <h4><slot></slot></h4>
      `;
    }
  };
  customElements.define("visualscript-sidebar-header", SidebarHeader);

  // src/components/tree/icons/index.js
  var icons_exports = {};
  __export(icons_exports, {
    file: () => file,
    folder: () => folder,
    openfolder: () => openfolder
  });
  var folder = $`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
  var openfolder = $`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>`;
  var file = $`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/><path d="M20.41,8.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 C21,9.3,20.79,8.79,20.41,8.41z M7,7h7v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10V13z"/></g></svg>`;

  // src/components/tree/Icon.ts
  var Icon = class extends s4 {
    constructor(props = {}) {
      super();
      this.type = props.type ?? "folder";
    }
    static get styles() {
      return r`

    :host  * {
      box-sizing: border-box;
    }

    div {
      padding: 0px 7px;
    }


    svg {
      width: 15px;
      height: 15px;
      fill: black;
    }

    @media (prefers-color-scheme: dark) {

      svg {
        fill: rgb(210, 210, 210);
      }
    }

    `;
    }
    static get properties() {
      return {
        type: {
          type: String,
          reflect: true
        }
      };
    }
    render() {
      return $`
      <div>
       ${icons_exports[this.type]}
      </div>
    `;
    }
  };
  customElements.define("visualscript-icon", Icon);

  // src/components/tree/TreeItem.ts
  var TreeItem = class extends s4 {
    constructor(props) {
      super();
      this.type = "folder";
      this.removeLast = () => {
        if (this.li)
          this.li.classList.remove("last");
        window.removeEventListener("click", this.removeLast);
      };
      this.key = props.key;
      this.value = props.value;
      this.parent = props.parent;
      this.onClick = props.onClick;
      if (props.type)
        this.type = props.type;
    }
    static get styles() {
      return r`

    :host * {
      box-sizing: border-box;
    }

    li {
        width: 100%;
    }

    li > div > div {
        display: flex;
        font-size: 12px;
        padding: 6px;
        flex-grow: 1;
        align-items: center;
        flex-wrap: wrap;
        user-select: none;
    }

    li.last > div { background: #b6e3ff;}

    li.last > div:hover { background: #b6e3ff; }

    li > div:hover {
        background: rgb(240,240,240);
        cursor: pointer;
    }

    @media (prefers-color-scheme: dark) {

      li > div:hover{ background-color: rgb(70, 70, 70) }

      li.last > div { background: #0091ea;}

        li.last > div:hover { background: #0091ea; }


    }

    `;
    }
    static get properties() {
      return {
        type: {
          type: String,
          reflect: true
        },
        key: {
          type: String,
          reflect: true
        },
        open: {
          type: Boolean,
          reflect: true
        }
      };
    }
    render() {
      const icon = new Icon({ type: this.type });
      const leftPad = 8 * (this.parent.depth ?? 0);
      return $`
        <li>
        <div @click=${() => {
        this.li = this.shadowRoot.querySelector("li");
        this.li.classList.add("last");
        window.addEventListener("mousedown", this.removeLast);
        if (this.type === "file") {
          if (this.onClick instanceof Function)
            this.onClick(this.key, this.value);
        } else {
          if (this.type === "folder") {
            this.type = "openfolder";
            this.open = true;
          } else {
            this.type = "folder";
            this.open = false;
          }
        }
      }}>
            <div style="padding-left: ${leftPad}px">
             ${icon}
            <span class="name">${this.key}</span>
            </div>
          </div>
          ${this.open ? new Tree({ target: this.value, depth: this.parent.depth + 1, onClick: this.onClick }) : ""}
        </li>
      `;
    }
  };
  customElements.define("visualscript-tree-item", TreeItem);

  // src/components/tree/Tree.ts
  var Tree = class extends s4 {
    constructor(props = { target: {} }) {
      super();
      this.depth = 0;
      this.set = async (target = {}) => {
        this.target = target;
        this.keys = Object.keys(this.target);
      };
      this.getElement = async (key, o12) => {
        const value = o12[key];
        let type7 = value.constructor.name === "Object" ? "folder" : "file";
        const treeItem = new TreeItem({
          key,
          type: type7,
          value,
          parent: this,
          onClick: this.onClick
        });
        return treeItem;
      };
      if (props.depth)
        this.depth = props.depth;
      if (props.onClick)
        this.onClick = props.onClick;
      this.set(props.target);
    }
    static get styles() {
      return r`

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      height: 100%;
      width: 100%;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        font-size: 90%;
    }

    .container {
      width: 100%;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: scroll;
      height: 100%;
    }

    .info {
      display: flex;
      align-items: center;
    }

    .name {
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    @media (prefers-color-scheme: dark) {
      :host > * {
        background-color: rgb(40, 40, 40);
      }
    }

    `;
    }
    static get properties() {
      return {
        keys: {
          type: Object,
          reflect: true
        },
        depth: {
          type: Number,
          reflect: true
        },
        onClick: {
          type: Function,
          reflect: true
        }
      };
    }
    render() {
      const content = this.keys?.map((key) => this.getElement(key, this.target));
      return c2(Promise.all(content).then((data) => {
        return $`
          <ul class="container">
                ${data}
          </ul>
      `;
      }), $`<span>Loading...</span>`);
    }
  };
  customElements.define("visualscript-tree", Tree);

  // examples/editor/external/freerange/index.esm.js
  var __defProp2 = Object.defineProperty;
  var __export2 = (target, all) => {
    for (var name2 in all)
      __defProp2(target, name2, { get: all[name2], enumerable: true });
  };
  var zipped = (suffix2, mimeType, codecs) => mimeType && mimeType === codecs.getType("gz") || suffix2.includes("gz");
  var fullSuffix = (fileName = "") => fileName.split(".").slice(1);
  var suffix = (fileName = "") => {
    const suffix2 = fullSuffix(fileName);
    const isZip = zipped(suffix2);
    if (isZip)
      suffix2.pop();
    return suffix2.join(".");
  };
  var name = (path) => path ? path.split("/").slice(-1)[0] : void 0;
  var directory = (path) => path ? path.split("/").slice(0, -1).join("/") : void 0;
  var esm = (suffix2) => suffix2 === "js" || suffix2 === "mjs";
  var get = (type7, name2, codecs) => {
    let mimeType = type7;
    const isZipped = zipped(fullSuffix(name2), mimeType, codecs);
    const sfx = suffix(name2);
    if (isZipped || !mimeType)
      mimeType = codecs.getType(sfx);
    if (esm(sfx))
      mimeType = codecs.getType("js");
    return { mimeType, zipped: isZipped, suffix: sfx };
  };
  var gzip_exports = {};
  __export2(gzip_exports, {
    decode: () => decode,
    encode: () => encode,
    suffixes: () => suffixes,
    type: () => type
  });
  var Z_FIXED$1 = 4;
  var Z_BINARY = 0;
  var Z_TEXT = 1;
  var Z_UNKNOWN$1 = 2;
  function zero$1(buf) {
    let len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  var MIN_MATCH$1 = 3;
  var MAX_MATCH$1 = 258;
  var LENGTH_CODES$1 = 29;
  var LITERALS$1 = 256;
  var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
  var D_CODES$1 = 30;
  var BL_CODES$1 = 19;
  var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
  var MAX_BITS$1 = 15;
  var Buf_size = 16;
  var MAX_BL_BITS = 7;
  var END_BLOCK = 256;
  var REP_3_6 = 16;
  var REPZ_3_10 = 17;
  var REPZ_11_138 = 18;
  var extra_lbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
  var extra_dbits = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
  var extra_blbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
  var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var DIST_CODE_LEN = 512;
  var static_ltree = new Array((L_CODES$1 + 2) * 2);
  zero$1(static_ltree);
  var static_dtree = new Array(D_CODES$1 * 2);
  zero$1(static_dtree);
  var _dist_code = new Array(DIST_CODE_LEN);
  zero$1(_dist_code);
  var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
  zero$1(_length_code);
  var base_length = new Array(LENGTH_CODES$1);
  zero$1(base_length);
  var base_dist = new Array(D_CODES$1);
  zero$1(base_dist);
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    this.extra_bits = extra_bits;
    this.extra_base = extra_base;
    this.elems = elems;
    this.max_length = max_length;
    this.has_stree = static_tree && static_tree.length;
  }
  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;
  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    this.max_code = 0;
    this.stat_desc = stat_desc;
  }
  var d_code = (dist) => {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  };
  var put_short = (s10, w3) => {
    s10.pending_buf[s10.pending++] = w3 & 255;
    s10.pending_buf[s10.pending++] = w3 >>> 8 & 255;
  };
  var send_bits = (s10, value, length) => {
    if (s10.bi_valid > Buf_size - length) {
      s10.bi_buf |= value << s10.bi_valid & 65535;
      put_short(s10, s10.bi_buf);
      s10.bi_buf = value >> Buf_size - s10.bi_valid;
      s10.bi_valid += length - Buf_size;
    } else {
      s10.bi_buf |= value << s10.bi_valid & 65535;
      s10.bi_valid += length;
    }
  };
  var send_code = (s10, c4, tree) => {
    send_bits(s10, tree[c4 * 2], tree[c4 * 2 + 1]);
  };
  var bi_reverse = (code, len) => {
    let res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  };
  var bi_flush = (s10) => {
    if (s10.bi_valid === 16) {
      put_short(s10, s10.bi_buf);
      s10.bi_buf = 0;
      s10.bi_valid = 0;
    } else if (s10.bi_valid >= 8) {
      s10.pending_buf[s10.pending++] = s10.bi_buf & 255;
      s10.bi_buf >>= 8;
      s10.bi_valid -= 8;
    }
  };
  var gen_bitlen = (s10, desc) => {
    const tree = desc.dyn_tree;
    const max_code = desc.max_code;
    const stree = desc.stat_desc.static_tree;
    const has_stree = desc.stat_desc.has_stree;
    const extra = desc.stat_desc.extra_bits;
    const base = desc.stat_desc.extra_base;
    const max_length = desc.stat_desc.max_length;
    let h8;
    let n12, m3;
    let bits;
    let xbits;
    let f3;
    let overflow = 0;
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      s10.bl_count[bits] = 0;
    }
    tree[s10.heap[s10.heap_max] * 2 + 1] = 0;
    for (h8 = s10.heap_max + 1; h8 < HEAP_SIZE$1; h8++) {
      n12 = s10.heap[h8];
      bits = tree[tree[n12 * 2 + 1] * 2 + 1] + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n12 * 2 + 1] = bits;
      if (n12 > max_code) {
        continue;
      }
      s10.bl_count[bits]++;
      xbits = 0;
      if (n12 >= base) {
        xbits = extra[n12 - base];
      }
      f3 = tree[n12 * 2];
      s10.opt_len += f3 * (bits + xbits);
      if (has_stree) {
        s10.static_len += f3 * (stree[n12 * 2 + 1] + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }
    do {
      bits = max_length - 1;
      while (s10.bl_count[bits] === 0) {
        bits--;
      }
      s10.bl_count[bits]--;
      s10.bl_count[bits + 1] += 2;
      s10.bl_count[max_length]--;
      overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length; bits !== 0; bits--) {
      n12 = s10.bl_count[bits];
      while (n12 !== 0) {
        m3 = s10.heap[--h8];
        if (m3 > max_code) {
          continue;
        }
        if (tree[m3 * 2 + 1] !== bits) {
          s10.opt_len += (bits - tree[m3 * 2 + 1]) * tree[m3 * 2];
          tree[m3 * 2 + 1] = bits;
        }
        n12--;
      }
    }
  };
  var gen_codes = (tree, max_code, bl_count) => {
    const next_code = new Array(MAX_BITS$1 + 1);
    let code = 0;
    let bits;
    let n12;
    for (bits = 1; bits <= MAX_BITS$1; bits++) {
      next_code[bits] = code = code + bl_count[bits - 1] << 1;
    }
    for (n12 = 0; n12 <= max_code; n12++) {
      let len = tree[n12 * 2 + 1];
      if (len === 0) {
        continue;
      }
      tree[n12 * 2] = bi_reverse(next_code[len]++, len);
    }
  };
  var tr_static_init = () => {
    let n12;
    let bits;
    let length;
    let code;
    let dist;
    const bl_count = new Array(MAX_BITS$1 + 1);
    length = 0;
    for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
      base_length[code] = length;
      for (n12 = 0; n12 < 1 << extra_lbits[code]; n12++) {
        _length_code[length++] = code;
      }
    }
    _length_code[length - 1] = code;
    dist = 0;
    for (code = 0; code < 16; code++) {
      base_dist[code] = dist;
      for (n12 = 0; n12 < 1 << extra_dbits[code]; n12++) {
        _dist_code[dist++] = code;
      }
    }
    dist >>= 7;
    for (; code < D_CODES$1; code++) {
      base_dist[code] = dist << 7;
      for (n12 = 0; n12 < 1 << extra_dbits[code] - 7; n12++) {
        _dist_code[256 + dist++] = code;
      }
    }
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      bl_count[bits] = 0;
    }
    n12 = 0;
    while (n12 <= 143) {
      static_ltree[n12 * 2 + 1] = 8;
      n12++;
      bl_count[8]++;
    }
    while (n12 <= 255) {
      static_ltree[n12 * 2 + 1] = 9;
      n12++;
      bl_count[9]++;
    }
    while (n12 <= 279) {
      static_ltree[n12 * 2 + 1] = 7;
      n12++;
      bl_count[7]++;
    }
    while (n12 <= 287) {
      static_ltree[n12 * 2 + 1] = 8;
      n12++;
      bl_count[8]++;
    }
    gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
    for (n12 = 0; n12 < D_CODES$1; n12++) {
      static_dtree[n12 * 2 + 1] = 5;
      static_dtree[n12 * 2] = bi_reverse(n12, 5);
    }
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
  };
  var init_block = (s10) => {
    let n12;
    for (n12 = 0; n12 < L_CODES$1; n12++) {
      s10.dyn_ltree[n12 * 2] = 0;
    }
    for (n12 = 0; n12 < D_CODES$1; n12++) {
      s10.dyn_dtree[n12 * 2] = 0;
    }
    for (n12 = 0; n12 < BL_CODES$1; n12++) {
      s10.bl_tree[n12 * 2] = 0;
    }
    s10.dyn_ltree[END_BLOCK * 2] = 1;
    s10.opt_len = s10.static_len = 0;
    s10.last_lit = s10.matches = 0;
  };
  var bi_windup = (s10) => {
    if (s10.bi_valid > 8) {
      put_short(s10, s10.bi_buf);
    } else if (s10.bi_valid > 0) {
      s10.pending_buf[s10.pending++] = s10.bi_buf;
    }
    s10.bi_buf = 0;
    s10.bi_valid = 0;
  };
  var copy_block = (s10, buf, len, header) => {
    bi_windup(s10);
    if (header) {
      put_short(s10, len);
      put_short(s10, ~len);
    }
    s10.pending_buf.set(s10.window.subarray(buf, buf + len), s10.pending);
    s10.pending += len;
  };
  var smaller = (tree, n12, m3, depth) => {
    const _n2 = n12 * 2;
    const _m2 = m3 * 2;
    return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n12] <= depth[m3];
  };
  var pqdownheap = (s10, tree, k3) => {
    const v3 = s10.heap[k3];
    let j = k3 << 1;
    while (j <= s10.heap_len) {
      if (j < s10.heap_len && smaller(tree, s10.heap[j + 1], s10.heap[j], s10.depth)) {
        j++;
      }
      if (smaller(tree, v3, s10.heap[j], s10.depth)) {
        break;
      }
      s10.heap[k3] = s10.heap[j];
      k3 = j;
      j <<= 1;
    }
    s10.heap[k3] = v3;
  };
  var compress_block = (s10, ltree, dtree) => {
    let dist;
    let lc;
    let lx = 0;
    let code;
    let extra;
    if (s10.last_lit !== 0) {
      do {
        dist = s10.pending_buf[s10.d_buf + lx * 2] << 8 | s10.pending_buf[s10.d_buf + lx * 2 + 1];
        lc = s10.pending_buf[s10.l_buf + lx];
        lx++;
        if (dist === 0) {
          send_code(s10, lc, ltree);
        } else {
          code = _length_code[lc];
          send_code(s10, code + LITERALS$1 + 1, ltree);
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s10, lc, extra);
          }
          dist--;
          code = d_code(dist);
          send_code(s10, code, dtree);
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s10, dist, extra);
          }
        }
      } while (lx < s10.last_lit);
    }
    send_code(s10, END_BLOCK, ltree);
  };
  var build_tree = (s10, desc) => {
    const tree = desc.dyn_tree;
    const stree = desc.stat_desc.static_tree;
    const has_stree = desc.stat_desc.has_stree;
    const elems = desc.stat_desc.elems;
    let n12, m3;
    let max_code = -1;
    let node;
    s10.heap_len = 0;
    s10.heap_max = HEAP_SIZE$1;
    for (n12 = 0; n12 < elems; n12++) {
      if (tree[n12 * 2] !== 0) {
        s10.heap[++s10.heap_len] = max_code = n12;
        s10.depth[n12] = 0;
      } else {
        tree[n12 * 2 + 1] = 0;
      }
    }
    while (s10.heap_len < 2) {
      node = s10.heap[++s10.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] = 1;
      s10.depth[node] = 0;
      s10.opt_len--;
      if (has_stree) {
        s10.static_len -= stree[node * 2 + 1];
      }
    }
    desc.max_code = max_code;
    for (n12 = s10.heap_len >> 1; n12 >= 1; n12--) {
      pqdownheap(s10, tree, n12);
    }
    node = elems;
    do {
      n12 = s10.heap[1];
      s10.heap[1] = s10.heap[s10.heap_len--];
      pqdownheap(s10, tree, 1);
      m3 = s10.heap[1];
      s10.heap[--s10.heap_max] = n12;
      s10.heap[--s10.heap_max] = m3;
      tree[node * 2] = tree[n12 * 2] + tree[m3 * 2];
      s10.depth[node] = (s10.depth[n12] >= s10.depth[m3] ? s10.depth[n12] : s10.depth[m3]) + 1;
      tree[n12 * 2 + 1] = tree[m3 * 2 + 1] = node;
      s10.heap[1] = node++;
      pqdownheap(s10, tree, 1);
    } while (s10.heap_len >= 2);
    s10.heap[--s10.heap_max] = s10.heap[1];
    gen_bitlen(s10, desc);
    gen_codes(tree, max_code, s10.bl_count);
  };
  var scan_tree = (s10, tree, max_code) => {
    let n12;
    let prevlen = -1;
    let curlen;
    let nextlen = tree[0 * 2 + 1];
    let count = 0;
    let max_count = 7;
    let min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] = 65535;
    for (n12 = 0; n12 <= max_code; n12++) {
      curlen = nextlen;
      nextlen = tree[(n12 + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s10.bl_tree[curlen * 2] += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s10.bl_tree[curlen * 2]++;
        }
        s10.bl_tree[REP_3_6 * 2]++;
      } else if (count <= 10) {
        s10.bl_tree[REPZ_3_10 * 2]++;
      } else {
        s10.bl_tree[REPZ_11_138 * 2]++;
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  };
  var send_tree = (s10, tree, max_code) => {
    let n12;
    let prevlen = -1;
    let curlen;
    let nextlen = tree[0 * 2 + 1];
    let count = 0;
    let max_count = 7;
    let min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    for (n12 = 0; n12 <= max_code; n12++) {
      curlen = nextlen;
      nextlen = tree[(n12 + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s10, curlen, s10.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s10, curlen, s10.bl_tree);
          count--;
        }
        send_code(s10, REP_3_6, s10.bl_tree);
        send_bits(s10, count - 3, 2);
      } else if (count <= 10) {
        send_code(s10, REPZ_3_10, s10.bl_tree);
        send_bits(s10, count - 3, 3);
      } else {
        send_code(s10, REPZ_11_138, s10.bl_tree);
        send_bits(s10, count - 11, 7);
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  };
  var build_bl_tree = (s10) => {
    let max_blindex;
    scan_tree(s10, s10.dyn_ltree, s10.l_desc.max_code);
    scan_tree(s10, s10.dyn_dtree, s10.d_desc.max_code);
    build_tree(s10, s10.bl_desc);
    for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
      if (s10.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
        break;
      }
    }
    s10.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex;
  };
  var send_all_trees = (s10, lcodes, dcodes, blcodes) => {
    let rank2;
    send_bits(s10, lcodes - 257, 5);
    send_bits(s10, dcodes - 1, 5);
    send_bits(s10, blcodes - 4, 4);
    for (rank2 = 0; rank2 < blcodes; rank2++) {
      send_bits(s10, s10.bl_tree[bl_order[rank2] * 2 + 1], 3);
    }
    send_tree(s10, s10.dyn_ltree, lcodes - 1);
    send_tree(s10, s10.dyn_dtree, dcodes - 1);
  };
  var detect_data_type = (s10) => {
    let black_mask = 4093624447;
    let n12;
    for (n12 = 0; n12 <= 31; n12++, black_mask >>>= 1) {
      if (black_mask & 1 && s10.dyn_ltree[n12 * 2] !== 0) {
        return Z_BINARY;
      }
    }
    if (s10.dyn_ltree[9 * 2] !== 0 || s10.dyn_ltree[10 * 2] !== 0 || s10.dyn_ltree[13 * 2] !== 0) {
      return Z_TEXT;
    }
    for (n12 = 32; n12 < LITERALS$1; n12++) {
      if (s10.dyn_ltree[n12 * 2] !== 0) {
        return Z_TEXT;
      }
    }
    return Z_BINARY;
  };
  var static_init_done = false;
  var _tr_init$1 = (s10) => {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }
    s10.l_desc = new TreeDesc(s10.dyn_ltree, static_l_desc);
    s10.d_desc = new TreeDesc(s10.dyn_dtree, static_d_desc);
    s10.bl_desc = new TreeDesc(s10.bl_tree, static_bl_desc);
    s10.bi_buf = 0;
    s10.bi_valid = 0;
    init_block(s10);
  };
  var _tr_stored_block$1 = (s10, buf, stored_len, last) => {
    send_bits(s10, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
    copy_block(s10, buf, stored_len, true);
  };
  var _tr_align$1 = (s10) => {
    send_bits(s10, STATIC_TREES << 1, 3);
    send_code(s10, END_BLOCK, static_ltree);
    bi_flush(s10);
  };
  var _tr_flush_block$1 = (s10, buf, stored_len, last) => {
    let opt_lenb, static_lenb;
    let max_blindex = 0;
    if (s10.level > 0) {
      if (s10.strm.data_type === Z_UNKNOWN$1) {
        s10.strm.data_type = detect_data_type(s10);
      }
      build_tree(s10, s10.l_desc);
      build_tree(s10, s10.d_desc);
      max_blindex = build_bl_tree(s10);
      opt_lenb = s10.opt_len + 3 + 7 >>> 3;
      static_lenb = s10.static_len + 3 + 7 >>> 3;
      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      opt_lenb = static_lenb = stored_len + 5;
    }
    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      _tr_stored_block$1(s10, buf, stored_len, last);
    } else if (s10.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
      send_bits(s10, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s10, static_ltree, static_dtree);
    } else {
      send_bits(s10, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s10, s10.l_desc.max_code + 1, s10.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s10, s10.dyn_ltree, s10.dyn_dtree);
    }
    init_block(s10);
    if (last) {
      bi_windup(s10);
    }
  };
  var _tr_tally$1 = (s10, dist, lc) => {
    s10.pending_buf[s10.d_buf + s10.last_lit * 2] = dist >>> 8 & 255;
    s10.pending_buf[s10.d_buf + s10.last_lit * 2 + 1] = dist & 255;
    s10.pending_buf[s10.l_buf + s10.last_lit] = lc & 255;
    s10.last_lit++;
    if (dist === 0) {
      s10.dyn_ltree[lc * 2]++;
    } else {
      s10.matches++;
      dist--;
      s10.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
      s10.dyn_dtree[d_code(dist) * 2]++;
    }
    return s10.last_lit === s10.lit_bufsize - 1;
  };
  var _tr_init_1 = _tr_init$1;
  var _tr_stored_block_1 = _tr_stored_block$1;
  var _tr_flush_block_1 = _tr_flush_block$1;
  var _tr_tally_1 = _tr_tally$1;
  var _tr_align_1 = _tr_align$1;
  var trees = {
    _tr_init: _tr_init_1,
    _tr_stored_block: _tr_stored_block_1,
    _tr_flush_block: _tr_flush_block_1,
    _tr_tally: _tr_tally_1,
    _tr_align: _tr_align_1
  };
  var adler32 = (adler, buf, len, pos) => {
    let s1 = adler & 65535 | 0, s22 = adler >>> 16 & 65535 | 0, n12 = 0;
    while (len !== 0) {
      n12 = len > 2e3 ? 2e3 : len;
      len -= n12;
      do {
        s1 = s1 + buf[pos++] | 0;
        s22 = s22 + s1 | 0;
      } while (--n12);
      s1 %= 65521;
      s22 %= 65521;
    }
    return s1 | s22 << 16 | 0;
  };
  var adler32_1 = adler32;
  var makeTable = () => {
    let c4, table = [];
    for (var n12 = 0; n12 < 256; n12++) {
      c4 = n12;
      for (var k3 = 0; k3 < 8; k3++) {
        c4 = c4 & 1 ? 3988292384 ^ c4 >>> 1 : c4 >>> 1;
      }
      table[n12] = c4;
    }
    return table;
  };
  var crcTable = new Uint32Array(makeTable());
  var crc32 = (crc, buf, len, pos) => {
    const t7 = crcTable;
    const end = pos + len;
    crc ^= -1;
    for (let i9 = pos; i9 < end; i9++) {
      crc = crc >>> 8 ^ t7[(crc ^ buf[i9]) & 255];
    }
    return crc ^ -1;
  };
  var crc32_1 = crc32;
  var messages = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
  };
  var constants$2 = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
  };
  var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
  var {
    Z_NO_FLUSH: Z_NO_FLUSH$2,
    Z_PARTIAL_FLUSH,
    Z_FULL_FLUSH: Z_FULL_FLUSH$1,
    Z_FINISH: Z_FINISH$3,
    Z_BLOCK: Z_BLOCK$1,
    Z_OK: Z_OK$3,
    Z_STREAM_END: Z_STREAM_END$3,
    Z_STREAM_ERROR: Z_STREAM_ERROR$2,
    Z_DATA_ERROR: Z_DATA_ERROR$2,
    Z_BUF_ERROR: Z_BUF_ERROR$1,
    Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
    Z_FILTERED,
    Z_HUFFMAN_ONLY,
    Z_RLE,
    Z_FIXED,
    Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
    Z_UNKNOWN,
    Z_DEFLATED: Z_DEFLATED$2
  } = constants$2;
  var MAX_MEM_LEVEL = 9;
  var MAX_WBITS$1 = 15;
  var DEF_MEM_LEVEL = 8;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
  var PRESET_DICT = 32;
  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;
  var BS_NEED_MORE = 1;
  var BS_BLOCK_DONE = 2;
  var BS_FINISH_STARTED = 3;
  var BS_FINISH_DONE = 4;
  var OS_CODE = 3;
  var err = (strm, errorCode) => {
    strm.msg = messages[errorCode];
    return errorCode;
  };
  var rank = (f3) => {
    return (f3 << 1) - (f3 > 4 ? 9 : 0);
  };
  var zero = (buf) => {
    let len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  };
  var HASH_ZLIB = (s10, prev, data) => (prev << s10.hash_shift ^ data) & s10.hash_mask;
  var HASH = HASH_ZLIB;
  var flush_pending = (strm) => {
    const s10 = strm.state;
    let len = s10.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }
    strm.output.set(s10.pending_buf.subarray(s10.pending_out, s10.pending_out + len), strm.next_out);
    strm.next_out += len;
    s10.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s10.pending -= len;
    if (s10.pending === 0) {
      s10.pending_out = 0;
    }
  };
  var flush_block_only = (s10, last) => {
    _tr_flush_block(s10, s10.block_start >= 0 ? s10.block_start : -1, s10.strstart - s10.block_start, last);
    s10.block_start = s10.strstart;
    flush_pending(s10.strm);
  };
  var put_byte = (s10, b3) => {
    s10.pending_buf[s10.pending++] = b3;
  };
  var putShortMSB = (s10, b3) => {
    s10.pending_buf[s10.pending++] = b3 >>> 8 & 255;
    s10.pending_buf[s10.pending++] = b3 & 255;
  };
  var read_buf = (strm, buf, start, size) => {
    let len = strm.avail_in;
    if (len > size) {
      len = size;
    }
    if (len === 0) {
      return 0;
    }
    strm.avail_in -= len;
    buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32_1(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32_1(strm.adler, buf, len, start);
    }
    strm.next_in += len;
    strm.total_in += len;
    return len;
  };
  var longest_match = (s10, cur_match) => {
    let chain_length = s10.max_chain_length;
    let scan = s10.strstart;
    let match;
    let len;
    let best_len = s10.prev_length;
    let nice_match = s10.nice_match;
    const limit = s10.strstart > s10.w_size - MIN_LOOKAHEAD ? s10.strstart - (s10.w_size - MIN_LOOKAHEAD) : 0;
    const _win = s10.window;
    const wmask = s10.w_mask;
    const prev = s10.prev;
    const strend = s10.strstart + MAX_MATCH;
    let scan_end1 = _win[scan + best_len - 1];
    let scan_end = _win[scan + best_len];
    if (s10.prev_length >= s10.good_match) {
      chain_length >>= 2;
    }
    if (nice_match > s10.lookahead) {
      nice_match = s10.lookahead;
    }
    do {
      match = cur_match;
      if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
        continue;
      }
      scan += 2;
      match++;
      do {
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;
      if (len > best_len) {
        s10.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
    if (best_len <= s10.lookahead) {
      return best_len;
    }
    return s10.lookahead;
  };
  var fill_window = (s10) => {
    const _w_size = s10.w_size;
    let p3, n12, m3, more, str;
    do {
      more = s10.window_size - s10.lookahead - s10.strstart;
      if (s10.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        s10.window.set(s10.window.subarray(_w_size, _w_size + _w_size), 0);
        s10.match_start -= _w_size;
        s10.strstart -= _w_size;
        s10.block_start -= _w_size;
        n12 = s10.hash_size;
        p3 = n12;
        do {
          m3 = s10.head[--p3];
          s10.head[p3] = m3 >= _w_size ? m3 - _w_size : 0;
        } while (--n12);
        n12 = _w_size;
        p3 = n12;
        do {
          m3 = s10.prev[--p3];
          s10.prev[p3] = m3 >= _w_size ? m3 - _w_size : 0;
        } while (--n12);
        more += _w_size;
      }
      if (s10.strm.avail_in === 0) {
        break;
      }
      n12 = read_buf(s10.strm, s10.window, s10.strstart + s10.lookahead, more);
      s10.lookahead += n12;
      if (s10.lookahead + s10.insert >= MIN_MATCH) {
        str = s10.strstart - s10.insert;
        s10.ins_h = s10.window[str];
        s10.ins_h = HASH(s10, s10.ins_h, s10.window[str + 1]);
        while (s10.insert) {
          s10.ins_h = HASH(s10, s10.ins_h, s10.window[str + MIN_MATCH - 1]);
          s10.prev[str & s10.w_mask] = s10.head[s10.ins_h];
          s10.head[s10.ins_h] = str;
          str++;
          s10.insert--;
          if (s10.lookahead + s10.insert < MIN_MATCH) {
            break;
          }
        }
      }
    } while (s10.lookahead < MIN_LOOKAHEAD && s10.strm.avail_in !== 0);
  };
  var deflate_stored = (s10, flush) => {
    let max_block_size = 65535;
    if (max_block_size > s10.pending_buf_size - 5) {
      max_block_size = s10.pending_buf_size - 5;
    }
    for (; ; ) {
      if (s10.lookahead <= 1) {
        fill_window(s10);
        if (s10.lookahead === 0 && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s10.lookahead === 0) {
          break;
        }
      }
      s10.strstart += s10.lookahead;
      s10.lookahead = 0;
      const max_start = s10.block_start + max_block_size;
      if (s10.strstart === 0 || s10.strstart >= max_start) {
        s10.lookahead = s10.strstart - max_start;
        s10.strstart = max_start;
        flush_block_only(s10, false);
        if (s10.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      if (s10.strstart - s10.block_start >= s10.w_size - MIN_LOOKAHEAD) {
        flush_block_only(s10, false);
        if (s10.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s10.insert = 0;
    if (flush === Z_FINISH$3) {
      flush_block_only(s10, true);
      if (s10.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s10.strstart > s10.block_start) {
      flush_block_only(s10, false);
      if (s10.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_NEED_MORE;
  };
  var deflate_fast = (s10, flush) => {
    let hash_head;
    let bflush;
    for (; ; ) {
      if (s10.lookahead < MIN_LOOKAHEAD) {
        fill_window(s10);
        if (s10.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s10.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s10.lookahead >= MIN_MATCH) {
        s10.ins_h = HASH(s10, s10.ins_h, s10.window[s10.strstart + MIN_MATCH - 1]);
        hash_head = s10.prev[s10.strstart & s10.w_mask] = s10.head[s10.ins_h];
        s10.head[s10.ins_h] = s10.strstart;
      }
      if (hash_head !== 0 && s10.strstart - hash_head <= s10.w_size - MIN_LOOKAHEAD) {
        s10.match_length = longest_match(s10, hash_head);
      }
      if (s10.match_length >= MIN_MATCH) {
        bflush = _tr_tally(s10, s10.strstart - s10.match_start, s10.match_length - MIN_MATCH);
        s10.lookahead -= s10.match_length;
        if (s10.match_length <= s10.max_lazy_match && s10.lookahead >= MIN_MATCH) {
          s10.match_length--;
          do {
            s10.strstart++;
            s10.ins_h = HASH(s10, s10.ins_h, s10.window[s10.strstart + MIN_MATCH - 1]);
            hash_head = s10.prev[s10.strstart & s10.w_mask] = s10.head[s10.ins_h];
            s10.head[s10.ins_h] = s10.strstart;
          } while (--s10.match_length !== 0);
          s10.strstart++;
        } else {
          s10.strstart += s10.match_length;
          s10.match_length = 0;
          s10.ins_h = s10.window[s10.strstart];
          s10.ins_h = HASH(s10, s10.ins_h, s10.window[s10.strstart + 1]);
        }
      } else {
        bflush = _tr_tally(s10, 0, s10.window[s10.strstart]);
        s10.lookahead--;
        s10.strstart++;
      }
      if (bflush) {
        flush_block_only(s10, false);
        if (s10.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s10.insert = s10.strstart < MIN_MATCH - 1 ? s10.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$3) {
      flush_block_only(s10, true);
      if (s10.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s10.last_lit) {
      flush_block_only(s10, false);
      if (s10.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  var deflate_slow = (s10, flush) => {
    let hash_head;
    let bflush;
    let max_insert;
    for (; ; ) {
      if (s10.lookahead < MIN_LOOKAHEAD) {
        fill_window(s10);
        if (s10.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s10.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s10.lookahead >= MIN_MATCH) {
        s10.ins_h = HASH(s10, s10.ins_h, s10.window[s10.strstart + MIN_MATCH - 1]);
        hash_head = s10.prev[s10.strstart & s10.w_mask] = s10.head[s10.ins_h];
        s10.head[s10.ins_h] = s10.strstart;
      }
      s10.prev_length = s10.match_length;
      s10.prev_match = s10.match_start;
      s10.match_length = MIN_MATCH - 1;
      if (hash_head !== 0 && s10.prev_length < s10.max_lazy_match && s10.strstart - hash_head <= s10.w_size - MIN_LOOKAHEAD) {
        s10.match_length = longest_match(s10, hash_head);
        if (s10.match_length <= 5 && (s10.strategy === Z_FILTERED || s10.match_length === MIN_MATCH && s10.strstart - s10.match_start > 4096)) {
          s10.match_length = MIN_MATCH - 1;
        }
      }
      if (s10.prev_length >= MIN_MATCH && s10.match_length <= s10.prev_length) {
        max_insert = s10.strstart + s10.lookahead - MIN_MATCH;
        bflush = _tr_tally(s10, s10.strstart - 1 - s10.prev_match, s10.prev_length - MIN_MATCH);
        s10.lookahead -= s10.prev_length - 1;
        s10.prev_length -= 2;
        do {
          if (++s10.strstart <= max_insert) {
            s10.ins_h = HASH(s10, s10.ins_h, s10.window[s10.strstart + MIN_MATCH - 1]);
            hash_head = s10.prev[s10.strstart & s10.w_mask] = s10.head[s10.ins_h];
            s10.head[s10.ins_h] = s10.strstart;
          }
        } while (--s10.prev_length !== 0);
        s10.match_available = 0;
        s10.match_length = MIN_MATCH - 1;
        s10.strstart++;
        if (bflush) {
          flush_block_only(s10, false);
          if (s10.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      } else if (s10.match_available) {
        bflush = _tr_tally(s10, 0, s10.window[s10.strstart - 1]);
        if (bflush) {
          flush_block_only(s10, false);
        }
        s10.strstart++;
        s10.lookahead--;
        if (s10.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        s10.match_available = 1;
        s10.strstart++;
        s10.lookahead--;
      }
    }
    if (s10.match_available) {
      bflush = _tr_tally(s10, 0, s10.window[s10.strstart - 1]);
      s10.match_available = 0;
    }
    s10.insert = s10.strstart < MIN_MATCH - 1 ? s10.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$3) {
      flush_block_only(s10, true);
      if (s10.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s10.last_lit) {
      flush_block_only(s10, false);
      if (s10.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  var deflate_rle = (s10, flush) => {
    let bflush;
    let prev;
    let scan, strend;
    const _win = s10.window;
    for (; ; ) {
      if (s10.lookahead <= MAX_MATCH) {
        fill_window(s10);
        if (s10.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s10.lookahead === 0) {
          break;
        }
      }
      s10.match_length = 0;
      if (s10.lookahead >= MIN_MATCH && s10.strstart > 0) {
        scan = s10.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s10.strstart + MAX_MATCH;
          do {
          } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
          s10.match_length = MAX_MATCH - (strend - scan);
          if (s10.match_length > s10.lookahead) {
            s10.match_length = s10.lookahead;
          }
        }
      }
      if (s10.match_length >= MIN_MATCH) {
        bflush = _tr_tally(s10, 1, s10.match_length - MIN_MATCH);
        s10.lookahead -= s10.match_length;
        s10.strstart += s10.match_length;
        s10.match_length = 0;
      } else {
        bflush = _tr_tally(s10, 0, s10.window[s10.strstart]);
        s10.lookahead--;
        s10.strstart++;
      }
      if (bflush) {
        flush_block_only(s10, false);
        if (s10.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s10.insert = 0;
    if (flush === Z_FINISH$3) {
      flush_block_only(s10, true);
      if (s10.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s10.last_lit) {
      flush_block_only(s10, false);
      if (s10.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  var deflate_huff = (s10, flush) => {
    let bflush;
    for (; ; ) {
      if (s10.lookahead === 0) {
        fill_window(s10);
        if (s10.lookahead === 0) {
          if (flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }
          break;
        }
      }
      s10.match_length = 0;
      bflush = _tr_tally(s10, 0, s10.window[s10.strstart]);
      s10.lookahead--;
      s10.strstart++;
      if (bflush) {
        flush_block_only(s10, false);
        if (s10.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s10.insert = 0;
    if (flush === Z_FINISH$3) {
      flush_block_only(s10, true);
      if (s10.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s10.last_lit) {
      flush_block_only(s10, false);
      if (s10.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }
  var configuration_table = [
    new Config(0, 0, 0, 0, deflate_stored),
    new Config(4, 4, 8, 4, deflate_fast),
    new Config(4, 5, 16, 8, deflate_fast),
    new Config(4, 6, 32, 32, deflate_fast),
    new Config(4, 4, 16, 16, deflate_slow),
    new Config(8, 16, 32, 32, deflate_slow),
    new Config(8, 16, 128, 128, deflate_slow),
    new Config(8, 32, 128, 256, deflate_slow),
    new Config(32, 128, 258, 1024, deflate_slow),
    new Config(32, 258, 258, 4096, deflate_slow)
  ];
  var lm_init = (s10) => {
    s10.window_size = 2 * s10.w_size;
    zero(s10.head);
    s10.max_lazy_match = configuration_table[s10.level].max_lazy;
    s10.good_match = configuration_table[s10.level].good_length;
    s10.nice_match = configuration_table[s10.level].nice_length;
    s10.max_chain_length = configuration_table[s10.level].max_chain;
    s10.strstart = 0;
    s10.block_start = 0;
    s10.lookahead = 0;
    s10.insert = 0;
    s10.match_length = s10.prev_length = MIN_MATCH - 1;
    s10.match_available = 0;
    s10.ins_h = 0;
  };
  function DeflateState() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED$2;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
    this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
    this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new Uint16Array(MAX_BITS + 1);
    this.heap = new Uint16Array(2 * L_CODES + 1);
    zero(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new Uint16Array(2 * L_CODES + 1);
    zero(this.depth);
    this.l_buf = 0;
    this.lit_bufsize = 0;
    this.last_lit = 0;
    this.d_buf = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  var deflateResetKeep = (strm) => {
    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR$2);
    }
    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN;
    const s10 = strm.state;
    s10.pending = 0;
    s10.pending_out = 0;
    if (s10.wrap < 0) {
      s10.wrap = -s10.wrap;
    }
    s10.status = s10.wrap ? INIT_STATE : BUSY_STATE;
    strm.adler = s10.wrap === 2 ? 0 : 1;
    s10.last_flush = Z_NO_FLUSH$2;
    _tr_init(s10);
    return Z_OK$3;
  };
  var deflateReset = (strm) => {
    const ret = deflateResetKeep(strm);
    if (ret === Z_OK$3) {
      lm_init(strm.state);
    }
    return ret;
  };
  var deflateSetHeader = (strm, head) => {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$2;
    }
    if (strm.state.wrap !== 2) {
      return Z_STREAM_ERROR$2;
    }
    strm.state.gzhead = head;
    return Z_OK$3;
  };
  var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
    if (!strm) {
      return Z_STREAM_ERROR$2;
    }
    let wrap = 1;
    if (level === Z_DEFAULT_COMPRESSION$1) {
      level = 6;
    }
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2;
      windowBits -= 16;
    }
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
      return err(strm, Z_STREAM_ERROR$2);
    }
    if (windowBits === 8) {
      windowBits = 9;
    }
    const s10 = new DeflateState();
    strm.state = s10;
    s10.strm = strm;
    s10.wrap = wrap;
    s10.gzhead = null;
    s10.w_bits = windowBits;
    s10.w_size = 1 << s10.w_bits;
    s10.w_mask = s10.w_size - 1;
    s10.hash_bits = memLevel + 7;
    s10.hash_size = 1 << s10.hash_bits;
    s10.hash_mask = s10.hash_size - 1;
    s10.hash_shift = ~~((s10.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    s10.window = new Uint8Array(s10.w_size * 2);
    s10.head = new Uint16Array(s10.hash_size);
    s10.prev = new Uint16Array(s10.w_size);
    s10.lit_bufsize = 1 << memLevel + 6;
    s10.pending_buf_size = s10.lit_bufsize * 4;
    s10.pending_buf = new Uint8Array(s10.pending_buf_size);
    s10.d_buf = 1 * s10.lit_bufsize;
    s10.l_buf = (1 + 2) * s10.lit_bufsize;
    s10.level = level;
    s10.strategy = strategy;
    s10.method = method;
    return deflateReset(strm);
  };
  var deflateInit = (strm, level) => {
    return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
  };
  var deflate$2 = (strm, flush) => {
    let beg, val;
    if (!strm || !strm.state || flush > Z_BLOCK$1 || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
    }
    const s10 = strm.state;
    if (!strm.output || !strm.input && strm.avail_in !== 0 || s10.status === FINISH_STATE && flush !== Z_FINISH$3) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
    }
    s10.strm = strm;
    const old_flush = s10.last_flush;
    s10.last_flush = flush;
    if (s10.status === INIT_STATE) {
      if (s10.wrap === 2) {
        strm.adler = 0;
        put_byte(s10, 31);
        put_byte(s10, 139);
        put_byte(s10, 8);
        if (!s10.gzhead) {
          put_byte(s10, 0);
          put_byte(s10, 0);
          put_byte(s10, 0);
          put_byte(s10, 0);
          put_byte(s10, 0);
          put_byte(s10, s10.level === 9 ? 2 : s10.strategy >= Z_HUFFMAN_ONLY || s10.level < 2 ? 4 : 0);
          put_byte(s10, OS_CODE);
          s10.status = BUSY_STATE;
        } else {
          put_byte(s10, (s10.gzhead.text ? 1 : 0) + (s10.gzhead.hcrc ? 2 : 0) + (!s10.gzhead.extra ? 0 : 4) + (!s10.gzhead.name ? 0 : 8) + (!s10.gzhead.comment ? 0 : 16));
          put_byte(s10, s10.gzhead.time & 255);
          put_byte(s10, s10.gzhead.time >> 8 & 255);
          put_byte(s10, s10.gzhead.time >> 16 & 255);
          put_byte(s10, s10.gzhead.time >> 24 & 255);
          put_byte(s10, s10.level === 9 ? 2 : s10.strategy >= Z_HUFFMAN_ONLY || s10.level < 2 ? 4 : 0);
          put_byte(s10, s10.gzhead.os & 255);
          if (s10.gzhead.extra && s10.gzhead.extra.length) {
            put_byte(s10, s10.gzhead.extra.length & 255);
            put_byte(s10, s10.gzhead.extra.length >> 8 & 255);
          }
          if (s10.gzhead.hcrc) {
            strm.adler = crc32_1(strm.adler, s10.pending_buf, s10.pending, 0);
          }
          s10.gzindex = 0;
          s10.status = EXTRA_STATE;
        }
      } else {
        let header = Z_DEFLATED$2 + (s10.w_bits - 8 << 4) << 8;
        let level_flags = -1;
        if (s10.strategy >= Z_HUFFMAN_ONLY || s10.level < 2) {
          level_flags = 0;
        } else if (s10.level < 6) {
          level_flags = 1;
        } else if (s10.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= level_flags << 6;
        if (s10.strstart !== 0) {
          header |= PRESET_DICT;
        }
        header += 31 - header % 31;
        s10.status = BUSY_STATE;
        putShortMSB(s10, header);
        if (s10.strstart !== 0) {
          putShortMSB(s10, strm.adler >>> 16);
          putShortMSB(s10, strm.adler & 65535);
        }
        strm.adler = 1;
      }
    }
    if (s10.status === EXTRA_STATE) {
      if (s10.gzhead.extra) {
        beg = s10.pending;
        while (s10.gzindex < (s10.gzhead.extra.length & 65535)) {
          if (s10.pending === s10.pending_buf_size) {
            if (s10.gzhead.hcrc && s10.pending > beg) {
              strm.adler = crc32_1(strm.adler, s10.pending_buf, s10.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s10.pending;
            if (s10.pending === s10.pending_buf_size) {
              break;
            }
          }
          put_byte(s10, s10.gzhead.extra[s10.gzindex] & 255);
          s10.gzindex++;
        }
        if (s10.gzhead.hcrc && s10.pending > beg) {
          strm.adler = crc32_1(strm.adler, s10.pending_buf, s10.pending - beg, beg);
        }
        if (s10.gzindex === s10.gzhead.extra.length) {
          s10.gzindex = 0;
          s10.status = NAME_STATE;
        }
      } else {
        s10.status = NAME_STATE;
      }
    }
    if (s10.status === NAME_STATE) {
      if (s10.gzhead.name) {
        beg = s10.pending;
        do {
          if (s10.pending === s10.pending_buf_size) {
            if (s10.gzhead.hcrc && s10.pending > beg) {
              strm.adler = crc32_1(strm.adler, s10.pending_buf, s10.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s10.pending;
            if (s10.pending === s10.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s10.gzindex < s10.gzhead.name.length) {
            val = s10.gzhead.name.charCodeAt(s10.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s10, val);
        } while (val !== 0);
        if (s10.gzhead.hcrc && s10.pending > beg) {
          strm.adler = crc32_1(strm.adler, s10.pending_buf, s10.pending - beg, beg);
        }
        if (val === 0) {
          s10.gzindex = 0;
          s10.status = COMMENT_STATE;
        }
      } else {
        s10.status = COMMENT_STATE;
      }
    }
    if (s10.status === COMMENT_STATE) {
      if (s10.gzhead.comment) {
        beg = s10.pending;
        do {
          if (s10.pending === s10.pending_buf_size) {
            if (s10.gzhead.hcrc && s10.pending > beg) {
              strm.adler = crc32_1(strm.adler, s10.pending_buf, s10.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s10.pending;
            if (s10.pending === s10.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s10.gzindex < s10.gzhead.comment.length) {
            val = s10.gzhead.comment.charCodeAt(s10.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s10, val);
        } while (val !== 0);
        if (s10.gzhead.hcrc && s10.pending > beg) {
          strm.adler = crc32_1(strm.adler, s10.pending_buf, s10.pending - beg, beg);
        }
        if (val === 0) {
          s10.status = HCRC_STATE;
        }
      } else {
        s10.status = HCRC_STATE;
      }
    }
    if (s10.status === HCRC_STATE) {
      if (s10.gzhead.hcrc) {
        if (s10.pending + 2 > s10.pending_buf_size) {
          flush_pending(strm);
        }
        if (s10.pending + 2 <= s10.pending_buf_size) {
          put_byte(s10, strm.adler & 255);
          put_byte(s10, strm.adler >> 8 & 255);
          strm.adler = 0;
          s10.status = BUSY_STATE;
        }
      } else {
        s10.status = BUSY_STATE;
      }
    }
    if (s10.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s10.last_flush = -1;
        return Z_OK$3;
      }
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (s10.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (strm.avail_in !== 0 || s10.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s10.status !== FINISH_STATE) {
      let bstate = s10.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s10, flush) : s10.strategy === Z_RLE ? deflate_rle(s10, flush) : configuration_table[s10.level].func(s10, flush);
      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s10.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s10.last_flush = -1;
        }
        return Z_OK$3;
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          _tr_align(s10);
        } else if (flush !== Z_BLOCK$1) {
          _tr_stored_block(s10, 0, 0, false);
          if (flush === Z_FULL_FLUSH$1) {
            zero(s10.head);
            if (s10.lookahead === 0) {
              s10.strstart = 0;
              s10.block_start = 0;
              s10.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s10.last_flush = -1;
          return Z_OK$3;
        }
      }
    }
    if (flush !== Z_FINISH$3) {
      return Z_OK$3;
    }
    if (s10.wrap <= 0) {
      return Z_STREAM_END$3;
    }
    if (s10.wrap === 2) {
      put_byte(s10, strm.adler & 255);
      put_byte(s10, strm.adler >> 8 & 255);
      put_byte(s10, strm.adler >> 16 & 255);
      put_byte(s10, strm.adler >> 24 & 255);
      put_byte(s10, strm.total_in & 255);
      put_byte(s10, strm.total_in >> 8 & 255);
      put_byte(s10, strm.total_in >> 16 & 255);
      put_byte(s10, strm.total_in >> 24 & 255);
    } else {
      putShortMSB(s10, strm.adler >>> 16);
      putShortMSB(s10, strm.adler & 65535);
    }
    flush_pending(strm);
    if (s10.wrap > 0) {
      s10.wrap = -s10.wrap;
    }
    return s10.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
  };
  var deflateEnd = (strm) => {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$2;
    }
    const status = strm.state.status;
    if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
      return err(strm, Z_STREAM_ERROR$2);
    }
    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
  };
  var deflateSetDictionary = (strm, dictionary) => {
    let dictLength = dictionary.length;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$2;
    }
    const s10 = strm.state;
    const wrap = s10.wrap;
    if (wrap === 2 || wrap === 1 && s10.status !== INIT_STATE || s10.lookahead) {
      return Z_STREAM_ERROR$2;
    }
    if (wrap === 1) {
      strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
    }
    s10.wrap = 0;
    if (dictLength >= s10.w_size) {
      if (wrap === 0) {
        zero(s10.head);
        s10.strstart = 0;
        s10.block_start = 0;
        s10.insert = 0;
      }
      let tmpDict = new Uint8Array(s10.w_size);
      tmpDict.set(dictionary.subarray(dictLength - s10.w_size, dictLength), 0);
      dictionary = tmpDict;
      dictLength = s10.w_size;
    }
    const avail = strm.avail_in;
    const next = strm.next_in;
    const input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s10);
    while (s10.lookahead >= MIN_MATCH) {
      let str = s10.strstart;
      let n12 = s10.lookahead - (MIN_MATCH - 1);
      do {
        s10.ins_h = HASH(s10, s10.ins_h, s10.window[str + MIN_MATCH - 1]);
        s10.prev[str & s10.w_mask] = s10.head[s10.ins_h];
        s10.head[s10.ins_h] = str;
        str++;
      } while (--n12);
      s10.strstart = str;
      s10.lookahead = MIN_MATCH - 1;
      fill_window(s10);
    }
    s10.strstart += s10.lookahead;
    s10.block_start = s10.strstart;
    s10.insert = s10.lookahead;
    s10.lookahead = 0;
    s10.match_length = s10.prev_length = MIN_MATCH - 1;
    s10.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s10.wrap = wrap;
    return Z_OK$3;
  };
  var deflateInit_1 = deflateInit;
  var deflateInit2_1 = deflateInit2;
  var deflateReset_1 = deflateReset;
  var deflateResetKeep_1 = deflateResetKeep;
  var deflateSetHeader_1 = deflateSetHeader;
  var deflate_2$1 = deflate$2;
  var deflateEnd_1 = deflateEnd;
  var deflateSetDictionary_1 = deflateSetDictionary;
  var deflateInfo = "pako deflate (from Nodeca project)";
  var deflate_1$2 = {
    deflateInit: deflateInit_1,
    deflateInit2: deflateInit2_1,
    deflateReset: deflateReset_1,
    deflateResetKeep: deflateResetKeep_1,
    deflateSetHeader: deflateSetHeader_1,
    deflate: deflate_2$1,
    deflateEnd: deflateEnd_1,
    deflateSetDictionary: deflateSetDictionary_1,
    deflateInfo
  };
  var _has = (obj, key) => {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };
  var assign = function(obj) {
    const sources = Array.prototype.slice.call(arguments, 1);
    while (sources.length) {
      const source = sources.shift();
      if (!source) {
        continue;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be non-object");
      }
      for (const p3 in source) {
        if (_has(source, p3)) {
          obj[p3] = source[p3];
        }
      }
    }
    return obj;
  };
  var flattenChunks = (chunks) => {
    let len = 0;
    for (let i9 = 0, l9 = chunks.length; i9 < l9; i9++) {
      len += chunks[i9].length;
    }
    const result = new Uint8Array(len);
    for (let i9 = 0, pos = 0, l9 = chunks.length; i9 < l9; i9++) {
      let chunk = chunks[i9];
      result.set(chunk, pos);
      pos += chunk.length;
    }
    return result;
  };
  var common = {
    assign,
    flattenChunks
  };
  var STR_APPLY_UIA_OK = true;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (__) {
    STR_APPLY_UIA_OK = false;
  }
  var _utf8len = new Uint8Array(256);
  for (let q = 0; q < 256; q++) {
    _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
  }
  _utf8len[254] = _utf8len[254] = 1;
  var string2buf = (str) => {
    if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
      return new TextEncoder().encode(str);
    }
    let buf, c4, c22, m_pos, i9, str_len = str.length, buf_len = 0;
    for (m_pos = 0; m_pos < str_len; m_pos++) {
      c4 = str.charCodeAt(m_pos);
      if ((c4 & 64512) === 55296 && m_pos + 1 < str_len) {
        c22 = str.charCodeAt(m_pos + 1);
        if ((c22 & 64512) === 56320) {
          c4 = 65536 + (c4 - 55296 << 10) + (c22 - 56320);
          m_pos++;
        }
      }
      buf_len += c4 < 128 ? 1 : c4 < 2048 ? 2 : c4 < 65536 ? 3 : 4;
    }
    buf = new Uint8Array(buf_len);
    for (i9 = 0, m_pos = 0; i9 < buf_len; m_pos++) {
      c4 = str.charCodeAt(m_pos);
      if ((c4 & 64512) === 55296 && m_pos + 1 < str_len) {
        c22 = str.charCodeAt(m_pos + 1);
        if ((c22 & 64512) === 56320) {
          c4 = 65536 + (c4 - 55296 << 10) + (c22 - 56320);
          m_pos++;
        }
      }
      if (c4 < 128) {
        buf[i9++] = c4;
      } else if (c4 < 2048) {
        buf[i9++] = 192 | c4 >>> 6;
        buf[i9++] = 128 | c4 & 63;
      } else if (c4 < 65536) {
        buf[i9++] = 224 | c4 >>> 12;
        buf[i9++] = 128 | c4 >>> 6 & 63;
        buf[i9++] = 128 | c4 & 63;
      } else {
        buf[i9++] = 240 | c4 >>> 18;
        buf[i9++] = 128 | c4 >>> 12 & 63;
        buf[i9++] = 128 | c4 >>> 6 & 63;
        buf[i9++] = 128 | c4 & 63;
      }
    }
    return buf;
  };
  var buf2binstring = (buf, len) => {
    if (len < 65534) {
      if (buf.subarray && STR_APPLY_UIA_OK) {
        return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
      }
    }
    let result = "";
    for (let i9 = 0; i9 < len; i9++) {
      result += String.fromCharCode(buf[i9]);
    }
    return result;
  };
  var buf2string = (buf, max) => {
    const len = max || buf.length;
    if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
      return new TextDecoder().decode(buf.subarray(0, max));
    }
    let i9, out;
    const utf16buf = new Array(len * 2);
    for (out = 0, i9 = 0; i9 < len; ) {
      let c4 = buf[i9++];
      if (c4 < 128) {
        utf16buf[out++] = c4;
        continue;
      }
      let c_len = _utf8len[c4];
      if (c_len > 4) {
        utf16buf[out++] = 65533;
        i9 += c_len - 1;
        continue;
      }
      c4 &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i9 < len) {
        c4 = c4 << 6 | buf[i9++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out++] = 65533;
        continue;
      }
      if (c4 < 65536) {
        utf16buf[out++] = c4;
      } else {
        c4 -= 65536;
        utf16buf[out++] = 55296 | c4 >> 10 & 1023;
        utf16buf[out++] = 56320 | c4 & 1023;
      }
    }
    return buf2binstring(utf16buf, out);
  };
  var utf8border = (buf, max) => {
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    let pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };
  var strings = {
    string2buf,
    buf2string,
    utf8border
  };
  function ZStream() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  var zstream = ZStream;
  var toString$1 = Object.prototype.toString;
  var {
    Z_NO_FLUSH: Z_NO_FLUSH$1,
    Z_SYNC_FLUSH,
    Z_FULL_FLUSH,
    Z_FINISH: Z_FINISH$2,
    Z_OK: Z_OK$2,
    Z_STREAM_END: Z_STREAM_END$2,
    Z_DEFAULT_COMPRESSION,
    Z_DEFAULT_STRATEGY,
    Z_DEFLATED: Z_DEFLATED$1
  } = constants$2;
  function Deflate$1(options) {
    this.options = common.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY
    }, options || {});
    let opt = this.options;
    if (opt.raw && opt.windowBits > 0) {
      opt.windowBits = -opt.windowBits;
    } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
      opt.windowBits += 16;
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new zstream();
    this.strm.avail_out = 0;
    let status = deflate_1$2.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    if (opt.header) {
      deflate_1$2.deflateSetHeader(this.strm, opt.header);
    }
    if (opt.dictionary) {
      let dict;
      if (typeof opt.dictionary === "string") {
        dict = strings.string2buf(opt.dictionary);
      } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }
      status = deflate_1$2.deflateSetDictionary(this.strm, dict);
      if (status !== Z_OK$2) {
        throw new Error(messages[status]);
      }
      this._dict_set = true;
    }
  }
  Deflate$1.prototype.push = function(data, flush_mode) {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    let status, _flush_mode;
    if (this.ended) {
      return false;
    }
    if (flush_mode === ~~flush_mode)
      _flush_mode = flush_mode;
    else
      _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
    if (typeof data === "string") {
      strm.input = strings.string2buf(data);
    } else if (toString$1.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    for (; ; ) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
        this.onData(strm.output.subarray(0, strm.next_out));
        strm.avail_out = 0;
        continue;
      }
      status = deflate_1$2.deflate(strm, _flush_mode);
      if (status === Z_STREAM_END$2) {
        if (strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
        }
        status = deflate_1$2.deflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return status === Z_OK$2;
      }
      if (strm.avail_out === 0) {
        this.onData(strm.output);
        continue;
      }
      if (_flush_mode > 0 && strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
        strm.avail_out = 0;
        continue;
      }
      if (strm.avail_in === 0)
        break;
    }
    return true;
  };
  Deflate$1.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Deflate$1.prototype.onEnd = function(status) {
    if (status === Z_OK$2) {
      this.result = common.flattenChunks(this.chunks);
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function deflate$1(input, options) {
    const deflator = new Deflate$1(options);
    deflator.push(input, true);
    if (deflator.err) {
      throw deflator.msg || messages[deflator.err];
    }
    return deflator.result;
  }
  function deflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return deflate$1(input, options);
  }
  function gzip$1(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate$1(input, options);
  }
  var Deflate_1$1 = Deflate$1;
  var deflate_2 = deflate$1;
  var deflateRaw_1$1 = deflateRaw$1;
  var gzip_1$1 = gzip$1;
  var constants$1 = constants$2;
  var deflate_1$1 = {
    Deflate: Deflate_1$1,
    deflate: deflate_2,
    deflateRaw: deflateRaw_1$1,
    gzip: gzip_1$1,
    constants: constants$1
  };
  var BAD$1 = 30;
  var TYPE$1 = 12;
  var inffast = function inflate_fast(strm, start) {
    let _in;
    let last;
    let _out;
    let beg;
    let end;
    let dmax;
    let wsize;
    let whave;
    let wnext;
    let s_window;
    let hold;
    let bits;
    let lcode;
    let dcode;
    let lmask;
    let dmask;
    let here;
    let op;
    let len;
    let dist;
    let from;
    let from_source;
    let input, output;
    const state2 = strm.state;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
    dmax = state2.dmax;
    wsize = state2.wsize;
    whave = state2.whave;
    wnext = state2.wnext;
    s_window = state2.window;
    hold = state2.hold;
    bits = state2.bits;
    lcode = state2.lencode;
    dcode = state2.distcode;
    lmask = (1 << state2.lenbits) - 1;
    dmask = (1 << state2.distbits) - 1;
    top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = lcode[hold & lmask];
        dolen:
          for (; ; ) {
            op = here >>> 24;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 255;
            if (op === 0) {
              output[_out++] = here & 65535;
            } else if (op & 16) {
              len = here & 65535;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & (1 << op) - 1;
                hold >>>= op;
                bits -= op;
              }
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist:
                for (; ; ) {
                  op = here >>> 24;
                  hold >>>= op;
                  bits -= op;
                  op = here >>> 16 & 255;
                  if (op & 16) {
                    dist = here & 65535;
                    op &= 15;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                    }
                    dist += hold & (1 << op) - 1;
                    if (dist > dmax) {
                      strm.msg = "invalid distance too far back";
                      state2.mode = BAD$1;
                      break top;
                    }
                    hold >>>= op;
                    bits -= op;
                    op = _out - beg;
                    if (dist > op) {
                      op = dist - op;
                      if (op > whave) {
                        if (state2.sane) {
                          strm.msg = "invalid distance too far back";
                          state2.mode = BAD$1;
                          break top;
                        }
                      }
                      from = 0;
                      from_source = s_window;
                      if (wnext === 0) {
                        from += wsize - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      } else if (wnext < op) {
                        from += wsize + wnext - op;
                        op -= wnext;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = 0;
                          if (wnext < len) {
                            op = wnext;
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                      } else {
                        from += wnext - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                      while (len > 2) {
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        len -= 3;
                      }
                      if (len) {
                        output[_out++] = from_source[from++];
                        if (len > 1) {
                          output[_out++] = from_source[from++];
                        }
                      }
                    } else {
                      from = _out - dist;
                      do {
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        len -= 3;
                      } while (len > 2);
                      if (len) {
                        output[_out++] = output[from++];
                        if (len > 1) {
                          output[_out++] = output[from++];
                        }
                      }
                    }
                  } else if ((op & 64) === 0) {
                    here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                    continue dodist;
                  } else {
                    strm.msg = "invalid distance code";
                    state2.mode = BAD$1;
                    break top;
                  }
                  break;
                }
            } else if ((op & 64) === 0) {
              here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
              continue dolen;
            } else if (op & 32) {
              state2.mode = TYPE$1;
              break top;
            } else {
              strm.msg = "invalid literal/length code";
              state2.mode = BAD$1;
              break top;
            }
            break;
          }
      } while (_in < last && _out < end);
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state2.hold = hold;
    state2.bits = bits;
    return;
  };
  var MAXBITS = 15;
  var ENOUGH_LENS$1 = 852;
  var ENOUGH_DISTS$1 = 592;
  var CODES$1 = 0;
  var LENS$1 = 1;
  var DISTS$1 = 2;
  var lbase = new Uint16Array([
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ]);
  var lext = new Uint8Array([
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ]);
  var dbase = new Uint16Array([
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ]);
  var dext = new Uint8Array([
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ]);
  var inflate_table = (type7, lens, lens_index, codes, table, table_index, work, opts) => {
    const bits = opts.bits;
    let len = 0;
    let sym = 0;
    let min = 0, max = 0;
    let root = 0;
    let curr = 0;
    let drop = 0;
    let left = 0;
    let used = 0;
    let huff = 0;
    let incr;
    let fill;
    let low;
    let mask;
    let next;
    let base = null;
    let base_index = 0;
    let end;
    const count = new Uint16Array(MAXBITS + 1);
    const offs = new Uint16Array(MAXBITS + 1);
    let extra = null;
    let extra_index = 0;
    let here_bits, here_op, here_val;
    for (len = 0; len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    root = bits;
    for (max = MAXBITS; max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) {
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
    }
    for (min = 1; min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }
    if (root < min) {
      root = min;
    }
    left = 1;
    for (len = 1; len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      }
    }
    if (left > 0 && (type7 === CODES$1 || max !== 1)) {
      return -1;
    }
    offs[1] = 0;
    for (len = 1; len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }
    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    if (type7 === CODES$1) {
      base = extra = work;
      end = 19;
    } else if (type7 === LENS$1) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
    } else {
      base = dbase;
      extra = dext;
      end = -1;
    }
    huff = 0;
    sym = 0;
    len = min;
    next = table_index;
    curr = root;
    drop = 0;
    low = -1;
    used = 1 << root;
    mask = used - 1;
    if (type7 === LENS$1 && used > ENOUGH_LENS$1 || type7 === DISTS$1 && used > ENOUGH_DISTS$1) {
      return 1;
    }
    for (; ; ) {
      here_bits = len - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64;
        here_val = 0;
      }
      incr = 1 << len - drop;
      fill = 1 << curr;
      min = fill;
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      incr = 1 << len - 1;
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }
      sym++;
      if (--count[len] === 0) {
        if (len === max) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }
      if (len > root && (huff & mask) !== low) {
        if (drop === 0) {
          drop = root;
        }
        next += min;
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }
        used += 1 << curr;
        if (type7 === LENS$1 && used > ENOUGH_LENS$1 || type7 === DISTS$1 && used > ENOUGH_DISTS$1) {
          return 1;
        }
        low = huff & mask;
        table[low] = root << 24 | curr << 16 | next - table_index | 0;
      }
    }
    if (huff !== 0) {
      table[next + huff] = len - drop << 24 | 64 << 16 | 0;
    }
    opts.bits = root;
    return 0;
  };
  var inftrees = inflate_table;
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var {
    Z_FINISH: Z_FINISH$1,
    Z_BLOCK,
    Z_TREES,
    Z_OK: Z_OK$1,
    Z_STREAM_END: Z_STREAM_END$1,
    Z_NEED_DICT: Z_NEED_DICT$1,
    Z_STREAM_ERROR: Z_STREAM_ERROR$1,
    Z_DATA_ERROR: Z_DATA_ERROR$1,
    Z_MEM_ERROR: Z_MEM_ERROR$1,
    Z_BUF_ERROR,
    Z_DEFLATED
  } = constants$2;
  var HEAD = 1;
  var FLAGS = 2;
  var TIME = 3;
  var OS = 4;
  var EXLEN = 5;
  var EXTRA = 6;
  var NAME = 7;
  var COMMENT = 8;
  var HCRC = 9;
  var DICTID = 10;
  var DICT = 11;
  var TYPE = 12;
  var TYPEDO = 13;
  var STORED = 14;
  var COPY_ = 15;
  var COPY = 16;
  var TABLE = 17;
  var LENLENS = 18;
  var CODELENS = 19;
  var LEN_ = 20;
  var LEN = 21;
  var LENEXT = 22;
  var DIST = 23;
  var DISTEXT = 24;
  var MATCH = 25;
  var LIT = 26;
  var CHECK = 27;
  var LENGTH = 28;
  var DONE = 29;
  var BAD = 30;
  var MEM = 31;
  var SYNC = 32;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var MAX_WBITS = 15;
  var DEF_WBITS = MAX_WBITS;
  var zswap32 = (q) => {
    return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
  };
  function InflateState() {
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new Uint16Array(320);
    this.work = new Uint16Array(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
  }
  var inflateResetKeep = (strm) => {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    const state2 = strm.state;
    strm.total_in = strm.total_out = state2.total = 0;
    strm.msg = "";
    if (state2.wrap) {
      strm.adler = state2.wrap & 1;
    }
    state2.mode = HEAD;
    state2.last = 0;
    state2.havedict = 0;
    state2.dmax = 32768;
    state2.head = null;
    state2.hold = 0;
    state2.bits = 0;
    state2.lencode = state2.lendyn = new Int32Array(ENOUGH_LENS);
    state2.distcode = state2.distdyn = new Int32Array(ENOUGH_DISTS);
    state2.sane = 1;
    state2.back = -1;
    return Z_OK$1;
  };
  var inflateReset = (strm) => {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    const state2 = strm.state;
    state2.wsize = 0;
    state2.whave = 0;
    state2.wnext = 0;
    return inflateResetKeep(strm);
  };
  var inflateReset2 = (strm, windowBits) => {
    let wrap;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    const state2 = strm.state;
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 1;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR$1;
    }
    if (state2.window !== null && state2.wbits !== windowBits) {
      state2.window = null;
    }
    state2.wrap = wrap;
    state2.wbits = windowBits;
    return inflateReset(strm);
  };
  var inflateInit2 = (strm, windowBits) => {
    if (!strm) {
      return Z_STREAM_ERROR$1;
    }
    const state2 = new InflateState();
    strm.state = state2;
    state2.window = null;
    const ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK$1) {
      strm.state = null;
    }
    return ret;
  };
  var inflateInit = (strm) => {
    return inflateInit2(strm, DEF_WBITS);
  };
  var virgin = true;
  var lenfix;
  var distfix;
  var fixedtables = (state2) => {
    if (virgin) {
      lenfix = new Int32Array(512);
      distfix = new Int32Array(32);
      let sym = 0;
      while (sym < 144) {
        state2.lens[sym++] = 8;
      }
      while (sym < 256) {
        state2.lens[sym++] = 9;
      }
      while (sym < 280) {
        state2.lens[sym++] = 7;
      }
      while (sym < 288) {
        state2.lens[sym++] = 8;
      }
      inftrees(LENS, state2.lens, 0, 288, lenfix, 0, state2.work, { bits: 9 });
      sym = 0;
      while (sym < 32) {
        state2.lens[sym++] = 5;
      }
      inftrees(DISTS, state2.lens, 0, 32, distfix, 0, state2.work, { bits: 5 });
      virgin = false;
    }
    state2.lencode = lenfix;
    state2.lenbits = 9;
    state2.distcode = distfix;
    state2.distbits = 5;
  };
  var updatewindow = (strm, src, end, copy) => {
    let dist;
    const state2 = strm.state;
    if (state2.window === null) {
      state2.wsize = 1 << state2.wbits;
      state2.wnext = 0;
      state2.whave = 0;
      state2.window = new Uint8Array(state2.wsize);
    }
    if (copy >= state2.wsize) {
      state2.window.set(src.subarray(end - state2.wsize, end), 0);
      state2.wnext = 0;
      state2.whave = state2.wsize;
    } else {
      dist = state2.wsize - state2.wnext;
      if (dist > copy) {
        dist = copy;
      }
      state2.window.set(src.subarray(end - copy, end - copy + dist), state2.wnext);
      copy -= dist;
      if (copy) {
        state2.window.set(src.subarray(end - copy, end), 0);
        state2.wnext = copy;
        state2.whave = state2.wsize;
      } else {
        state2.wnext += dist;
        if (state2.wnext === state2.wsize) {
          state2.wnext = 0;
        }
        if (state2.whave < state2.wsize) {
          state2.whave += dist;
        }
      }
    }
    return 0;
  };
  var inflate$2 = (strm, flush) => {
    let state2;
    let input, output;
    let next;
    let put;
    let have, left;
    let hold;
    let bits;
    let _in, _out;
    let copy;
    let from;
    let from_source;
    let here = 0;
    let here_bits, here_op, here_val;
    let last_bits, last_op, last_val;
    let len;
    let ret;
    const hbuf = new Uint8Array(4);
    let opts;
    let n12;
    const order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
      return Z_STREAM_ERROR$1;
    }
    state2 = strm.state;
    if (state2.mode === TYPE) {
      state2.mode = TYPEDO;
    }
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state2.hold;
    bits = state2.bits;
    _in = have;
    _out = left;
    ret = Z_OK$1;
    inf_leave:
      for (; ; ) {
        switch (state2.mode) {
          case HEAD:
            if (state2.wrap === 0) {
              state2.mode = TYPEDO;
              break;
            }
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state2.wrap & 2 && hold === 35615) {
              state2.check = 0;
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state2.check = crc32_1(state2.check, hbuf, 2, 0);
              hold = 0;
              bits = 0;
              state2.mode = FLAGS;
              break;
            }
            state2.flags = 0;
            if (state2.head) {
              state2.head.done = false;
            }
            if (!(state2.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
              strm.msg = "incorrect header check";
              state2.mode = BAD;
              break;
            }
            if ((hold & 15) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state2.mode = BAD;
              break;
            }
            hold >>>= 4;
            bits -= 4;
            len = (hold & 15) + 8;
            if (state2.wbits === 0) {
              state2.wbits = len;
            } else if (len > state2.wbits) {
              strm.msg = "invalid window size";
              state2.mode = BAD;
              break;
            }
            state2.dmax = 1 << state2.wbits;
            strm.adler = state2.check = 1;
            state2.mode = hold & 512 ? DICTID : TYPE;
            hold = 0;
            bits = 0;
            break;
          case FLAGS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state2.flags = hold;
            if ((state2.flags & 255) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state2.mode = BAD;
              break;
            }
            if (state2.flags & 57344) {
              strm.msg = "unknown header flags set";
              state2.mode = BAD;
              break;
            }
            if (state2.head) {
              state2.head.text = hold >> 8 & 1;
            }
            if (state2.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state2.check = crc32_1(state2.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state2.mode = TIME;
          case TIME:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state2.head) {
              state2.head.time = hold;
            }
            if (state2.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              hbuf[2] = hold >>> 16 & 255;
              hbuf[3] = hold >>> 24 & 255;
              state2.check = crc32_1(state2.check, hbuf, 4, 0);
            }
            hold = 0;
            bits = 0;
            state2.mode = OS;
          case OS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state2.head) {
              state2.head.xflags = hold & 255;
              state2.head.os = hold >> 8;
            }
            if (state2.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state2.check = crc32_1(state2.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state2.mode = EXLEN;
          case EXLEN:
            if (state2.flags & 1024) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state2.length = hold;
              if (state2.head) {
                state2.head.extra_len = hold;
              }
              if (state2.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state2.check = crc32_1(state2.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
            } else if (state2.head) {
              state2.head.extra = null;
            }
            state2.mode = EXTRA;
          case EXTRA:
            if (state2.flags & 1024) {
              copy = state2.length;
              if (copy > have) {
                copy = have;
              }
              if (copy) {
                if (state2.head) {
                  len = state2.head.extra_len - state2.length;
                  if (!state2.head.extra) {
                    state2.head.extra = new Uint8Array(state2.head.extra_len);
                  }
                  state2.head.extra.set(input.subarray(next, next + copy), len);
                }
                if (state2.flags & 512) {
                  state2.check = crc32_1(state2.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state2.length -= copy;
              }
              if (state2.length) {
                break inf_leave;
              }
            }
            state2.length = 0;
            state2.mode = NAME;
          case NAME:
            if (state2.flags & 2048) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state2.head && len && state2.length < 65536) {
                  state2.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state2.flags & 512) {
                state2.check = crc32_1(state2.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state2.head) {
              state2.head.name = null;
            }
            state2.length = 0;
            state2.mode = COMMENT;
          case COMMENT:
            if (state2.flags & 4096) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state2.head && len && state2.length < 65536) {
                  state2.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state2.flags & 512) {
                state2.check = crc32_1(state2.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state2.head) {
              state2.head.comment = null;
            }
            state2.mode = HCRC;
          case HCRC:
            if (state2.flags & 512) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state2.check & 65535)) {
                strm.msg = "header crc mismatch";
                state2.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            if (state2.head) {
              state2.head.hcrc = state2.flags >> 9 & 1;
              state2.head.done = true;
            }
            strm.adler = state2.check = 0;
            state2.mode = TYPE;
            break;
          case DICTID:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            strm.adler = state2.check = zswap32(hold);
            hold = 0;
            bits = 0;
            state2.mode = DICT;
          case DICT:
            if (state2.havedict === 0) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state2.hold = hold;
              state2.bits = bits;
              return Z_NEED_DICT$1;
            }
            strm.adler = state2.check = 1;
            state2.mode = TYPE;
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) {
              break inf_leave;
            }
          case TYPEDO:
            if (state2.last) {
              hold >>>= bits & 7;
              bits -= bits & 7;
              state2.mode = CHECK;
              break;
            }
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state2.last = hold & 1;
            hold >>>= 1;
            bits -= 1;
            switch (hold & 3) {
              case 0:
                state2.mode = STORED;
                break;
              case 1:
                fixedtables(state2);
                state2.mode = LEN_;
                if (flush === Z_TREES) {
                  hold >>>= 2;
                  bits -= 2;
                  break inf_leave;
                }
                break;
              case 2:
                state2.mode = TABLE;
                break;
              case 3:
                strm.msg = "invalid block type";
                state2.mode = BAD;
            }
            hold >>>= 2;
            bits -= 2;
            break;
          case STORED:
            hold >>>= bits & 7;
            bits -= bits & 7;
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
              strm.msg = "invalid stored block lengths";
              state2.mode = BAD;
              break;
            }
            state2.length = hold & 65535;
            hold = 0;
            bits = 0;
            state2.mode = COPY_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case COPY_:
            state2.mode = COPY;
          case COPY:
            copy = state2.length;
            if (copy) {
              if (copy > have) {
                copy = have;
              }
              if (copy > left) {
                copy = left;
              }
              if (copy === 0) {
                break inf_leave;
              }
              output.set(input.subarray(next, next + copy), put);
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state2.length -= copy;
              break;
            }
            state2.mode = TYPE;
            break;
          case TABLE:
            while (bits < 14) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state2.nlen = (hold & 31) + 257;
            hold >>>= 5;
            bits -= 5;
            state2.ndist = (hold & 31) + 1;
            hold >>>= 5;
            bits -= 5;
            state2.ncode = (hold & 15) + 4;
            hold >>>= 4;
            bits -= 4;
            if (state2.nlen > 286 || state2.ndist > 30) {
              strm.msg = "too many length or distance symbols";
              state2.mode = BAD;
              break;
            }
            state2.have = 0;
            state2.mode = LENLENS;
          case LENLENS:
            while (state2.have < state2.ncode) {
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state2.lens[order[state2.have++]] = hold & 7;
              hold >>>= 3;
              bits -= 3;
            }
            while (state2.have < 19) {
              state2.lens[order[state2.have++]] = 0;
            }
            state2.lencode = state2.lendyn;
            state2.lenbits = 7;
            opts = { bits: state2.lenbits };
            ret = inftrees(CODES, state2.lens, 0, 19, state2.lencode, 0, state2.work, opts);
            state2.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid code lengths set";
              state2.mode = BAD;
              break;
            }
            state2.have = 0;
            state2.mode = CODELENS;
          case CODELENS:
            while (state2.have < state2.nlen + state2.ndist) {
              for (; ; ) {
                here = state2.lencode[hold & (1 << state2.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_val < 16) {
                hold >>>= here_bits;
                bits -= here_bits;
                state2.lens[state2.have++] = here_val;
              } else {
                if (here_val === 16) {
                  n12 = here_bits + 2;
                  while (bits < n12) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  if (state2.have === 0) {
                    strm.msg = "invalid bit length repeat";
                    state2.mode = BAD;
                    break;
                  }
                  len = state2.lens[state2.have - 1];
                  copy = 3 + (hold & 3);
                  hold >>>= 2;
                  bits -= 2;
                } else if (here_val === 17) {
                  n12 = here_bits + 3;
                  while (bits < n12) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 3 + (hold & 7);
                  hold >>>= 3;
                  bits -= 3;
                } else {
                  n12 = here_bits + 7;
                  while (bits < n12) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 11 + (hold & 127);
                  hold >>>= 7;
                  bits -= 7;
                }
                if (state2.have + copy > state2.nlen + state2.ndist) {
                  strm.msg = "invalid bit length repeat";
                  state2.mode = BAD;
                  break;
                }
                while (copy--) {
                  state2.lens[state2.have++] = len;
                }
              }
            }
            if (state2.mode === BAD) {
              break;
            }
            if (state2.lens[256] === 0) {
              strm.msg = "invalid code -- missing end-of-block";
              state2.mode = BAD;
              break;
            }
            state2.lenbits = 9;
            opts = { bits: state2.lenbits };
            ret = inftrees(LENS, state2.lens, 0, state2.nlen, state2.lencode, 0, state2.work, opts);
            state2.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid literal/lengths set";
              state2.mode = BAD;
              break;
            }
            state2.distbits = 6;
            state2.distcode = state2.distdyn;
            opts = { bits: state2.distbits };
            ret = inftrees(DISTS, state2.lens, state2.nlen, state2.ndist, state2.distcode, 0, state2.work, opts);
            state2.distbits = opts.bits;
            if (ret) {
              strm.msg = "invalid distances set";
              state2.mode = BAD;
              break;
            }
            state2.mode = LEN_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case LEN_:
            state2.mode = LEN;
          case LEN:
            if (have >= 6 && left >= 258) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state2.hold = hold;
              state2.bits = bits;
              inffast(strm, _out);
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state2.hold;
              bits = state2.bits;
              if (state2.mode === TYPE) {
                state2.back = -1;
              }
              break;
            }
            state2.back = 0;
            for (; ; ) {
              here = state2.lencode[hold & (1 << state2.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_op && (here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state2.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state2.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state2.back += here_bits;
            state2.length = here_val;
            if (here_op === 0) {
              state2.mode = LIT;
              break;
            }
            if (here_op & 32) {
              state2.back = -1;
              state2.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = "invalid literal/length code";
              state2.mode = BAD;
              break;
            }
            state2.extra = here_op & 15;
            state2.mode = LENEXT;
          case LENEXT:
            if (state2.extra) {
              n12 = state2.extra;
              while (bits < n12) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state2.length += hold & (1 << state2.extra) - 1;
              hold >>>= state2.extra;
              bits -= state2.extra;
              state2.back += state2.extra;
            }
            state2.was = state2.length;
            state2.mode = DIST;
          case DIST:
            for (; ; ) {
              here = state2.distcode[hold & (1 << state2.distbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state2.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state2.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state2.back += here_bits;
            if (here_op & 64) {
              strm.msg = "invalid distance code";
              state2.mode = BAD;
              break;
            }
            state2.offset = here_val;
            state2.extra = here_op & 15;
            state2.mode = DISTEXT;
          case DISTEXT:
            if (state2.extra) {
              n12 = state2.extra;
              while (bits < n12) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state2.offset += hold & (1 << state2.extra) - 1;
              hold >>>= state2.extra;
              bits -= state2.extra;
              state2.back += state2.extra;
            }
            if (state2.offset > state2.dmax) {
              strm.msg = "invalid distance too far back";
              state2.mode = BAD;
              break;
            }
            state2.mode = MATCH;
          case MATCH:
            if (left === 0) {
              break inf_leave;
            }
            copy = _out - left;
            if (state2.offset > copy) {
              copy = state2.offset - copy;
              if (copy > state2.whave) {
                if (state2.sane) {
                  strm.msg = "invalid distance too far back";
                  state2.mode = BAD;
                  break;
                }
              }
              if (copy > state2.wnext) {
                copy -= state2.wnext;
                from = state2.wsize - copy;
              } else {
                from = state2.wnext - copy;
              }
              if (copy > state2.length) {
                copy = state2.length;
              }
              from_source = state2.window;
            } else {
              from_source = output;
              from = put - state2.offset;
              copy = state2.length;
            }
            if (copy > left) {
              copy = left;
            }
            left -= copy;
            state2.length -= copy;
            do {
              output[put++] = from_source[from++];
            } while (--copy);
            if (state2.length === 0) {
              state2.mode = LEN;
            }
            break;
          case LIT:
            if (left === 0) {
              break inf_leave;
            }
            output[put++] = state2.length;
            left--;
            state2.mode = LEN;
            break;
          case CHECK:
            if (state2.wrap) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold |= input[next++] << bits;
                bits += 8;
              }
              _out -= left;
              strm.total_out += _out;
              state2.total += _out;
              if (_out) {
                strm.adler = state2.check = state2.flags ? crc32_1(state2.check, output, _out, put - _out) : adler32_1(state2.check, output, _out, put - _out);
              }
              _out = left;
              if ((state2.flags ? hold : zswap32(hold)) !== state2.check) {
                strm.msg = "incorrect data check";
                state2.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state2.mode = LENGTH;
          case LENGTH:
            if (state2.wrap && state2.flags) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state2.total & 4294967295)) {
                strm.msg = "incorrect length check";
                state2.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state2.mode = DONE;
          case DONE:
            ret = Z_STREAM_END$1;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR$1;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR$1;
          case SYNC:
          default:
            return Z_STREAM_ERROR$1;
        }
      }
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state2.hold = hold;
    state2.bits = bits;
    if (state2.wsize || _out !== strm.avail_out && state2.mode < BAD && (state2.mode < CHECK || flush !== Z_FINISH$1)) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
        ;
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state2.total += _out;
    if (state2.wrap && _out) {
      strm.adler = state2.check = state2.flags ? crc32_1(state2.check, output, _out, strm.next_out - _out) : adler32_1(state2.check, output, _out, strm.next_out - _out);
    }
    strm.data_type = state2.bits + (state2.last ? 64 : 0) + (state2.mode === TYPE ? 128 : 0) + (state2.mode === LEN_ || state2.mode === COPY_ ? 256 : 0);
    if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
      ret = Z_BUF_ERROR;
    }
    return ret;
  };
  var inflateEnd = (strm) => {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    let state2 = strm.state;
    if (state2.window) {
      state2.window = null;
    }
    strm.state = null;
    return Z_OK$1;
  };
  var inflateGetHeader = (strm, head) => {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    const state2 = strm.state;
    if ((state2.wrap & 2) === 0) {
      return Z_STREAM_ERROR$1;
    }
    state2.head = head;
    head.done = false;
    return Z_OK$1;
  };
  var inflateSetDictionary = (strm, dictionary) => {
    const dictLength = dictionary.length;
    let state2;
    let dictid;
    let ret;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    state2 = strm.state;
    if (state2.wrap !== 0 && state2.mode !== DICT) {
      return Z_STREAM_ERROR$1;
    }
    if (state2.mode === DICT) {
      dictid = 1;
      dictid = adler32_1(dictid, dictionary, dictLength, 0);
      if (dictid !== state2.check) {
        return Z_DATA_ERROR$1;
      }
    }
    ret = updatewindow(strm, dictionary, dictLength, dictLength);
    if (ret) {
      state2.mode = MEM;
      return Z_MEM_ERROR$1;
    }
    state2.havedict = 1;
    return Z_OK$1;
  };
  var inflateReset_1 = inflateReset;
  var inflateReset2_1 = inflateReset2;
  var inflateResetKeep_1 = inflateResetKeep;
  var inflateInit_1 = inflateInit;
  var inflateInit2_1 = inflateInit2;
  var inflate_2$1 = inflate$2;
  var inflateEnd_1 = inflateEnd;
  var inflateGetHeader_1 = inflateGetHeader;
  var inflateSetDictionary_1 = inflateSetDictionary;
  var inflateInfo = "pako inflate (from Nodeca project)";
  var inflate_1$2 = {
    inflateReset: inflateReset_1,
    inflateReset2: inflateReset2_1,
    inflateResetKeep: inflateResetKeep_1,
    inflateInit: inflateInit_1,
    inflateInit2: inflateInit2_1,
    inflate: inflate_2$1,
    inflateEnd: inflateEnd_1,
    inflateGetHeader: inflateGetHeader_1,
    inflateSetDictionary: inflateSetDictionary_1,
    inflateInfo
  };
  function GZheader() {
    this.text = 0;
    this.time = 0;
    this.xflags = 0;
    this.os = 0;
    this.extra = null;
    this.extra_len = 0;
    this.name = "";
    this.comment = "";
    this.hcrc = 0;
    this.done = false;
  }
  var gzheader = GZheader;
  var toString = Object.prototype.toString;
  var {
    Z_NO_FLUSH,
    Z_FINISH,
    Z_OK,
    Z_STREAM_END,
    Z_NEED_DICT,
    Z_STREAM_ERROR,
    Z_DATA_ERROR,
    Z_MEM_ERROR
  } = constants$2;
  function Inflate$1(options) {
    this.options = common.assign({
      chunkSize: 1024 * 64,
      windowBits: 15,
      to: ""
    }, options || {});
    const opt = this.options;
    if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
      opt.windowBits = -opt.windowBits;
      if (opt.windowBits === 0) {
        opt.windowBits = -15;
      }
    }
    if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
      opt.windowBits += 32;
    }
    if (opt.windowBits > 15 && opt.windowBits < 48) {
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new zstream();
    this.strm.avail_out = 0;
    let status = inflate_1$2.inflateInit2(this.strm, opt.windowBits);
    if (status !== Z_OK) {
      throw new Error(messages[status]);
    }
    this.header = new gzheader();
    inflate_1$2.inflateGetHeader(this.strm, this.header);
    if (opt.dictionary) {
      if (typeof opt.dictionary === "string") {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }
      if (opt.raw) {
        status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== Z_OK) {
          throw new Error(messages[status]);
        }
      }
    }
  }
  Inflate$1.prototype.push = function(data, flush_mode) {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    const dictionary = this.options.dictionary;
    let status, _flush_mode, last_avail_out;
    if (this.ended)
      return false;
    if (flush_mode === ~~flush_mode)
      _flush_mode = flush_mode;
    else
      _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
    if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    for (; ; ) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = inflate_1$2.inflate(strm, _flush_mode);
      if (status === Z_NEED_DICT && dictionary) {
        status = inflate_1$2.inflateSetDictionary(strm, dictionary);
        if (status === Z_OK) {
          status = inflate_1$2.inflate(strm, _flush_mode);
        } else if (status === Z_DATA_ERROR) {
          status = Z_NEED_DICT;
        }
      }
      while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
        inflate_1$2.inflateReset(strm);
        status = inflate_1$2.inflate(strm, _flush_mode);
      }
      switch (status) {
        case Z_STREAM_ERROR:
        case Z_DATA_ERROR:
        case Z_NEED_DICT:
        case Z_MEM_ERROR:
          this.onEnd(status);
          this.ended = true;
          return false;
      }
      last_avail_out = strm.avail_out;
      if (strm.next_out) {
        if (strm.avail_out === 0 || status === Z_STREAM_END) {
          if (this.options.to === "string") {
            let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
            let tail = strm.next_out - next_out_utf8;
            let utf8str = strings.buf2string(strm.output, next_out_utf8);
            strm.next_out = tail;
            strm.avail_out = chunkSize - tail;
            if (tail)
              strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
            this.onData(utf8str);
          } else {
            this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
          }
        }
      }
      if (status === Z_OK && last_avail_out === 0)
        continue;
      if (status === Z_STREAM_END) {
        status = inflate_1$2.inflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return true;
      }
      if (strm.avail_in === 0)
        break;
    }
    return true;
  };
  Inflate$1.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Inflate$1.prototype.onEnd = function(status) {
    if (status === Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = common.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function inflate$1(input, options) {
    const inflator = new Inflate$1(options);
    inflator.push(input);
    if (inflator.err)
      throw inflator.msg || messages[inflator.err];
    return inflator.result;
  }
  function inflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return inflate$1(input, options);
  }
  var Inflate_1$1 = Inflate$1;
  var inflate_2 = inflate$1;
  var inflateRaw_1$1 = inflateRaw$1;
  var ungzip$1 = inflate$1;
  var constants = constants$2;
  var inflate_1$1 = {
    Inflate: Inflate_1$1,
    inflate: inflate_2,
    inflateRaw: inflateRaw_1$1,
    ungzip: ungzip$1,
    constants
  };
  var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
  var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
  var Deflate_1 = Deflate;
  var deflate_1 = deflate;
  var deflateRaw_1 = deflateRaw;
  var gzip_1 = gzip;
  var Inflate_1 = Inflate;
  var inflate_1 = inflate;
  var inflateRaw_1 = inflateRaw;
  var ungzip_1 = ungzip;
  var constants_1 = constants$2;
  var pako = {
    Deflate: Deflate_1,
    deflate: deflate_1,
    deflateRaw: deflateRaw_1,
    gzip: gzip_1,
    Inflate: Inflate_1,
    inflate: inflate_1,
    inflateRaw: inflateRaw_1,
    ungzip: ungzip_1,
    constants: constants_1
  };
  var decode = (o12) => {
    return new Promise((resolve, reject) => {
      try {
        o12.buffer = pako.inflate(o12.buffer).buffer;
        resolve(o12);
      } catch (e11) {
        console.error(e11);
        return reject(false);
      }
    });
  };
  var encode = (o12) => pako.deflate(o12);
  var type = "application/x-gzip";
  var suffixes = "gz";
  var text_exports = {};
  __export2(text_exports, {
    decode: () => decode2,
    encode: () => encode2,
    suffixes: () => suffixes2,
    type: () => type2
  });
  var type2 = "text/plain";
  var suffixes2 = "txt";
  var encode2 = (o12) => new TextEncoder().encode(o12 ? o12.toString() : "");
  var decode2 = (o12) => new TextDecoder().decode(o12.buffer);
  var decode3 = async (o12, type7, name2, config, defaultCodec = text_exports, codecs) => {
    const { mimeType, zipped: zipped2 } = get(type7, name2, codecs);
    if (zipped2)
      o12 = await decode(o12);
    if (mimeType && (mimeType.includes("image/") || mimeType.includes("video/")))
      return o12.dataurl;
    const codec = codecs ? codecs.get(mimeType) : null;
    if (codec && codec.decode instanceof Function)
      return codec.decode(o12, config);
    else {
      console.warn(`No decoder for ${mimeType}. Defaulting to ${defaultCodec.type}...`);
      return defaultCodec.decode(o12, config);
    }
  };
  var decode_default = decode3;
  var encode3 = (o12) => {
    var byteString = atob(o12.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    var iab = new Uint8Array(ab);
    for (var i9 = 0; i9 < byteString.length; i9++) {
      iab[i9] = byteString.charCodeAt(i9);
    }
    return iab;
  };
  var encode4 = async (o12, type7, name2, config, defaultCodec = text_exports, codecs) => {
    let buffer = new ArrayBuffer(0);
    const { mimeType, zipped: zipped2 } = get(type7, name2, codecs);
    if (mimeType && (mimeType.includes("image/") || mimeType.includes("video/")))
      return encode3(o12);
    const codec = codecs ? codecs.get(mimeType) : null;
    if (codec && codec.encode instanceof Function)
      buffer = codec.encode(o12, config);
    else {
      console.warn(`No encoder for ${mimeType}. Defaulting to ${defaultCodec.type}...`);
      buffer = defaultCodec.encode(o12, config);
    }
    if (zipped2)
      buffer = await encode(buffer);
    return buffer;
  };
  var encode_default = encode4;
  var transferEach = async (f3, system) => {
    const path = f3.path;
    if (!f3.storage.buffer)
      f3.storage.buffer = await f3.getFileData();
    const blob = new Blob([f3.storage.buffer]);
    blob.name = f3.name;
    const newFile = await system.load(blob, path);
    if (!f3.fileSystemHandle) {
      f3.fileSystemHandle = newFile.fileSystemHandle;
      f3.method = "transferred";
    }
  };
  var transfer = async (previousSystem, targetSystem, transferList) => {
    if (!targetSystem) {
      const SystemConstructor = previousSystem.constructor;
      targetSystem = new SystemConstructor(void 0, {
        native: previousSystem.native,
        debug: previousSystem.debug,
        ignore: previousSystem.ignore,
        writable: true,
        progress: previousSystem.progress,
        codecs: previousSystem.codecs
      });
      await targetSystem.init();
    }
    if (!transferList)
      transferList = Array.from(previousSystem.files.list.values());
    console.warn(`Starting transfer of ${transferList.length} files from ${previousSystem.name} to ${targetSystem.name}`);
    const tic = performance.now();
    await Promise.all(transferList.map(async (f3) => transferEach(f3, targetSystem)));
    const toc = performance.now();
    console.warn(`Time to transfer files to ${targetSystem.name}: ${toc - tic}ms`);
  };
  var transfer_default = transfer;
  function isClass(obj = {}) {
    const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === "class";
    if (obj.prototype === void 0) {
      return isCtorClass;
    }
    const isPrototypeCtorClass = obj.prototype.constructor && obj.prototype.constructor.toString && obj.prototype.constructor.toString().substring(0, 5) === "class";
    return isCtorClass || isPrototypeCtorClass;
  }
  var get2 = (path, rel = "") => {
    if (rel[rel.length - 1] === "/")
      rel = rel.slice(0, -1);
    let dirTokens = rel.split("/");
    if (dirTokens.length === 1 && dirTokens[0] === "")
      dirTokens = [];
    const potentialFile = dirTokens.pop();
    if (potentialFile && !potentialFile.includes("."))
      dirTokens.push(potentialFile);
    const extensionTokens = path.split("/").filter((str) => {
      if (str === "..") {
        if (dirTokens.length == 0)
          console.error("Derived path is going out of the valid filesystem!");
        dirTokens.pop();
        return false;
      } else if (str === ".")
        return false;
      else
        return true;
    });
    const newPath = [...dirTokens, ...extensionTokens].join("/");
    return newPath;
  };
  var getURL = (path) => {
    let url;
    try {
      url = new URL(path).href;
    } catch {
      url = get2(path, window.location.href);
    }
    return url;
  };
  var handleFetch = async (path, options = {}, progressCallback) => {
    if (!options.mode)
      options.mode = "cors";
    const url = getURL(path);
    const response = await fetchRemote(url, options, progressCallback);
    if (!response)
      throw new Error("No response received.");
    const type7 = response.type.split(";")[0];
    return {
      url,
      type: type7,
      buffer: response.buffer
    };
  };
  var fetchRemote = async (url, options = {}, progressCallback) => {
    options.timeout = 3e3;
    const response = await fetchWithTimeout(url, options);
    return new Promise(async (resolve) => {
      if (response) {
        const type7 = response.headers.get("Content-Type");
        if (globalThis.FREERANGE_NODE) {
          const buffer = await response.arrayBuffer();
          resolve({ buffer, type: type7 });
        } else {
          const reader = response.body.getReader();
          const bytes = parseInt(response.headers.get("Content-Length"), 10);
          let bytesReceived = 0;
          let buffer = [];
          const processBuffer = async ({ done, value }) => {
            if (done) {
              const config = {};
              if (typeof type7 === "string")
                config.type = type7;
              const blob = new Blob(buffer, config);
              const ab = await blob.arrayBuffer();
              resolve({ buffer: new Uint8Array(ab), type: type7 });
              return;
            }
            bytesReceived += value.length;
            const chunk = value;
            buffer.push(chunk);
            if (progressCallback instanceof Function)
              progressCallback(response.headers.get("Range"), bytesReceived / bytes, bytes);
            return reader.read().then(processBuffer);
          };
          reader.read().then(processBuffer);
        }
      } else {
        console.warn("Response not received!", options.headers);
        resolve();
      }
    });
  };
  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8e3 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => {
      console.warn(`Request to ${resource} took longer than ${(timeout / 1e3).toFixed(2)}s`);
      controller.abort();
    }, timeout);
    const response = await globalThis.fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  }
  var iterAsync = async (iterable, asyncCallback) => {
    const promises = [];
    let i9 = 0;
    for await (const entry of iterable) {
      promises.push(asyncCallback(entry, i9));
      i9++;
    }
    const arr = await Promise.all(promises);
    return arr;
  };
  var iterate_default = iterAsync;
  var useRawArrayBuffer = ["nii", "nwb"];
  var RangeFile = class {
    constructor(file2, options) {
      this.rangeConfig = null;
      this.rangeSupported = false;
      this.createFile = async (buffer, oldFile = this.file, create = false) => {
        let newFile = new Blob([buffer], oldFile);
        newFile.lastModified = oldFile.lastModified;
        newFile.name = oldFile.name;
        newFile.webkitRelativePath = oldFile.webkitRelativePath || get2(this.path || this.name, this.system.root);
        if (create && !this.fileSystemHandle) {
          console.warn(`Native file handle for ${this.path} does not exist. Choosing a filesystem to mount...`);
          await transfer_default(this.system);
          return;
        }
        return newFile;
      };
      this.loadFileInfo = (file3 = this.file) => {
        if (file3) {
          this.name = file3.name;
          this.type = file3.type;
          const { mimeType, zipped: zipped2, suffix: suffix2 } = get(file3.type, file3.name, this.system.codecs);
          this.mimeType = mimeType;
          this.zipped = zipped2;
          this.suffix = suffix2;
        } else
          console.warn("Valid file object not provided...");
      };
      this.init = async () => {
        if (!this.file && this.fileSystemHandle) {
          this.file = await this.fileSystemHandle.getFile();
          this.loadFileInfo(this.file);
        }
        const loader = this.system.codecs.get(this.mimeType);
        const rangeConfig = loader?.config;
        if (rangeConfig)
          this.rangeConfig = rangeConfig;
        else {
          if (!loader)
            console.warn(`Cannot find a configuration file for ${this.path}. Please provide the correct codec.`);
        }
        this.rangeSupported = !!this.rangeConfig;
        let converted = false;
        if (this.method === "native") {
          this.storage = await this.getFileData().catch(this.onError);
          if (!converted) {
            if (this.storage?.buffer)
              this.file = await this.createFile(this.storage.buffer);
            else if (this.debug)
              console.warn(`No buffer created for ${this.path}...`);
          }
        }
        await this.setupByteGetters();
      };
      this.setOriginal = async (reference = "body") => {
        if (this.rangeSupported) {
          this[`#original${reference}`] = null;
          if (this.debug)
            console.warn("Will not stringify bodies that support range requests.");
        } else if (isClass(this[`#${reference}`])) {
          this[`#original${reference}`] = null;
          if (this.debug)
            console.warn("Will not deep clone file bodies that are class instances");
        } else {
          try {
            const tic = performance.now();
            const value = await this[`#${reference}`];
            if (typeof this[`#${reference}`] === "object")
              this[`#original${reference}`] = JSON.parse(JSON.stringify(value));
            else
              this[`#original${reference}`] = value;
            const toc = performance.now();
            if (this.debug)
              console.warn(`Time to Deep Clone (${this.path}): ${toc - tic}ms`);
          } catch (e11) {
            this[`#original${reference}`] = null;
            if (this.debug)
              console.warn("Could not deep clone", e11);
          }
        }
      };
      this.get = async (ref = "body", codec) => {
        try {
          if (!this[`#${ref}`]) {
            const ticDecode = performance.now();
            const storageExists = this.storage.buffer;
            if (!storageExists && !this.rangeSupported)
              this.storage = await this.getFileData();
            this[`#${ref}`] = codec ? await codec.decode(this.storage, this.config) : await this.system.codecs.decode(this.storage, this.mimeType, this.file.name, this.config).catch(this.onError);
            const tocDecode = performance.now();
            if (this.debug)
              console.warn(`Time to Decode (${this.path}): ${tocDecode - ticDecode}ms`);
          }
          if (this[`#original${ref}`] === void 0)
            await this.setOriginal(ref);
          return this[`#${ref}`];
        } catch (e11) {
          const msg = `Decoder failed for ${this.path} - ${this.mimeType || "No file type recognized"}`;
          if (this.debug)
            console.warn(msg, e11);
          return {};
        }
      };
      this.set = (val, ref = "body") => this[`#${ref}`] = val;
      this.reencode = async (ref = "body", codec) => {
        try {
          const value = await this[`${ref}`];
          const modifiedString = JSON.stringify(value);
          const ogString = JSON.stringify(this[`#original${ref}`]);
          const different = modifiedString !== ogString;
          if (different) {
            if (this.debug)
              console.warn(`Synching file contents with buffer (${this.path})`, different ? `${ogString} > ${modifiedString}` : modifiedString);
            const toEncode = value ?? "";
            try {
              const ticEncode = performance.now();
              const buffer = codec ? await codec.encode(toEncode, this.config) : await this.system.codecs.encode(toEncode, this.mimeType, this.file.name, this.config);
              const tocEncode = performance.now();
              if (this.debug)
                console.warn(`Time to Encode (${this.path}): ${tocEncode - ticEncode}ms`);
              return buffer;
            } catch (e11) {
              console.error("Could not encode as a buffer", toEncode, this.mimeType, this.zipped, codec);
              this.onError(e11);
            }
          }
        } catch (e11) {
          console.warn(e11, this[`#${ref}`], this[`#original${ref}`]);
        }
      };
      this.sync = async (force = !(this.file instanceof Blob), create = void 0) => {
        if (this.rangeSupported) {
          if (this.debug)
            console.warn(`Write access is disabled for RangeFile with range-gettable properties (${this.path})`);
          return true;
        } else {
          const bodyEncoded = await this.reencode();
          const textEncoded = await this.reencode("text", text_exports);
          const toSave = bodyEncoded ?? textEncoded;
          if (force || toSave) {
            if (toSave)
              this.storage.buffer = toSave;
            const newFile = await this.createFile(this.storage.buffer, this.file, create);
            if (newFile)
              this.file = newFile;
            else {
              if (this.debug)
                console.warn(`New file not created for ${this.path}`);
              return;
            }
            if (toSave) {
              if (textEncoded)
                this["#body"] = null;
              if (bodyEncoded)
                this["#text"] = null;
            } else {
              await this.setOriginal();
              await this.setOriginal("text");
            }
            return this.file;
          } else
            return true;
        }
      };
      this.save = async (force = !!this.remote) => {
        const file3 = await this.sync(force, true);
        if (file3 instanceof Blob) {
          const writable = await this.fileSystemHandle.createWritable();
          const stream = file3.stream();
          const tic = performance.now();
          await stream.pipeTo(writable);
          const toc = performance.now();
          if (this.debug)
            console.warn(`Time to stream into file (${this.path}): ${toc - tic}ms`);
        }
        const dependents = this.system.dependents[this.path];
        if (dependents)
          await iterate_default(dependents.values(), async (f3) => f3["#body"] = null);
      };
      this.onError = (e11) => {
        console.error(e11);
      };
      this.getFromBytes = async (key, property = this.rangeConfig.properties[key], parent2, i9) => {
        if (property) {
          let start = await this.getProperty(property.start, parent2, i9);
          const length = await this.getProperty(property.length, parent2, i9);
          let bytes = new ArrayBuffer(0);
          if (this.method === "remote") {
            bytes = await this.getRemote({ start, length });
          } else {
            let tempBytes = [];
            if (!Array.isArray(start))
              start = [start];
            start.forEach((i22) => tempBytes.push(this.storage.buffer.slice(i22, i22 + length)));
            const totalLen = tempBytes.reduce((a5, b3) => a5 + b3.length, 0);
            const tic2 = performance.now();
            let offset = 0;
            let uBytes = new Uint8Array(totalLen);
            tempBytes.forEach((arr) => {
              uBytes.set(arr, offset);
              offset += arr.length;
            });
            bytes = uBytes;
            const toc2 = performance.now();
            if (this.debug && start.length > 1)
              console.warn(`Time to merge arrays (${this.path}): ${toc2 - tic2}ms`);
          }
          const tic = performance.now();
          let output = property.ignoreGlobalPostprocess ? bytes : this.rangeConfig.preprocess(bytes);
          if (property.postprocess instanceof Function)
            output = await property.postprocess(output, this["#body"], i9);
          const toc = performance.now();
          if (this.debug)
            console.warn(`Time to postprocess bytes (${this.path}, ${key}, ${start}-${start + length}): ${toc - tic}ms`);
          return output;
        } else {
          if (this.debug)
            console.warn(`No getter for ${key}`);
        }
      };
      this.getProperty = async (property, parent2, i9 = void 0) => {
        if (property instanceof Function) {
          try {
            return property(this["#body"], parent2, i9).catch((e11) => console.error(e11));
          } catch {
            return property(this["#body"], parent2, i9);
          }
        } else
          return property;
      };
      this.defineProperty = async (key, property, parent2, i9 = void 0) => {
        if ("start" in property && property.length) {
          Object.defineProperties(parent2, {
            [key]: {
              enumerable: true,
              get: () => {
                if (!parent2[`#${key}`])
                  parent2[`#${key}`] = this.getFromBytes(key, property, parent2, i9);
                return parent2[`#${key}`];
              }
            },
            [`#${key}`]: {
              writable: true,
              enumerable: false
            }
          });
        } else if (property.n && property.properties) {
          this["#body"][key] = [];
          const n12 = await this.getProperty(property.n, property);
          for (let i22 = 0; i22 < n12; i22++) {
            const value = {};
            Object.defineProperty(value, "n", { get: () => n12 });
            for (let prop in property.properties) {
              await this.defineProperty(prop, property.properties[prop], value, i22);
            }
            this["#body"][key].push(value);
          }
        }
      };
      this.setupByteGetters = async () => {
        Object.defineProperties(this, {
          ["body"]: {
            enumerable: true,
            get: async () => this.get(),
            set: (val) => this.set(val)
          },
          [`#body`]: {
            writable: true,
            enumerable: false
          }
        });
        Object.defineProperties(this, {
          ["text"]: {
            enumerable: true,
            get: async () => this.get("text", text_exports),
            set: (val) => this.set(val, "text")
          },
          [`#text`]: {
            writable: true,
            enumerable: false
          }
        });
        if (this.rangeSupported) {
          this[`#body`] = {};
          for (let key in this.rangeConfig.properties)
            await this.defineProperty(key, this.rangeConfig.properties[key], this["#body"]);
          if (this.rangeConfig.metadata instanceof Function)
            await this.rangeConfig.metadata(this["#body"], this.rangeConfig);
        }
      };
      this.getRemote = async (property = {}) => {
        let { start, length } = property;
        const options2 = Object.assign({}, this.remoteOptions);
        if (!Array.isArray(start))
          start = [start];
        if (start.length < 1)
          return new Uint8Array();
        else {
          const isDefined = start[0] != void 0;
          if (isDefined) {
            let Range2 = `bytes=${start.map((val) => `${length ? `${val}-${val + length - 1}` : val}`).join(", ")}`;
            const maxHeaderLength = 15e3;
            if (Range2.length > maxHeaderLength) {
              const splitRange = Range2.slice(0, maxHeaderLength).split(", ");
              console.warn(`Only sending ${splitRange.length - 1} from ${start.length} range requests to remain under the --max-http-header-size=${1600} limit`);
              Range2 = splitRange.slice(0, splitRange.length - 1).join(", ");
            }
            options2.headers = Object.assign({ Range: Range2 }, options2.headers);
          }
          const o12 = await fetchRemote(get2(this.remote.path, this.remote.origin), options2);
          return o12.buffer;
        }
      };
      this.getFileData = () => {
        return new Promise(async (resolve, reject) => {
          if (this.method === "remote") {
            const buffer = await this.getRemote();
            this.file = await this.createFile(buffer);
            resolve({ file: this.file, buffer });
          } else {
            let method = "buffer";
            if (this.file.type && (this.file.type.includes("image/") || this.file.type.includes("video/")))
              method = "dataurl";
            if (globalThis.FREERANGE_NODE) {
              const methods = {
                "dataurl": "dataURL",
                "buffer": "arrayBuffer"
              };
              const data = await this.file[methods[method]]();
              resolve({ file: this.file, [method]: this.handleData(data) });
            } else {
              const methods = {
                "dataurl": "readAsDataURL",
                "buffer": "readAsArrayBuffer"
              };
              const reader = new FileReader();
              reader.onloadend = (e11) => {
                if (e11.target.readyState == FileReader.DONE) {
                  if (!e11.target.result)
                    return reject(`No result returned using the ${method} method on ${this.file.name}`);
                  let data = e11.target.result;
                  resolve({ file: this.file, [method]: this.handleData(data) });
                } else if (e11.target.readyState == FileReader.EMPTY) {
                  if (this.debug)
                    console.warn(`${this.file.name} is empty`);
                  resolve({ file: this.file, [method]: new Uint8Array() });
                }
              };
              reader[methods[method]](this.file);
            }
          }
        });
      };
      this.handleData = (data) => {
        if ((data["byteLength"] ?? data["length"]) === 0) {
          if (this.debug)
            console.warn(`${this.file.name} appears to be empty`);
          return new Uint8Array();
        } else if (data instanceof ArrayBuffer && !useRawArrayBuffer.includes(this.suffix))
          return new Uint8Array(data);
        else
          return data;
      };
      if (file2.constructor.name === "FileSystemFileHandle") {
        this.fileSystemHandle = file2;
      } else
        this.file = file2;
      this.config = options;
      this.debug = options.debug;
      this.system = options.system;
      this.path = options.path;
      this.method = file2.origin != void 0 && file2.path != void 0 ? "remote" : "native";
      if (this.method === "remote") {
        this.remote = file2;
        const split = file2.path.split("/");
        file2.name = split[split.length - 1];
        this.remoteOptions = file2.options;
        this.type = null;
      }
      if (this.file)
        this.loadFileInfo(this.file);
      this.storage = {};
      this.rangeSupported = false;
      this[`#originalbody`] = void 0;
      this[`#originaltext`] = void 0;
    }
  };
  var codecs_exports = {};
  __export2(codecs_exports, {
    csv: () => csv_exports,
    gzip: () => gzip_exports,
    js: () => js_exports,
    json: () => json_exports,
    text: () => text_exports,
    tsv: () => tsv_exports
  });
  var json_exports = {};
  __export2(json_exports, {
    decode: () => decode4,
    encode: () => encode5,
    suffixes: () => suffixes3,
    type: () => type3
  });
  var type3 = "application/json";
  var suffixes3 = "json";
  var encode5 = (o12) => encode2(JSON.stringify(o12));
  var decode4 = (o12) => {
    const textContent = !o12.text ? decode2(o12) : o12.text;
    return JSON.parse(textContent || `{}`);
  };
  var tsv_exports = {};
  __export2(tsv_exports, {
    decode: () => decode6,
    encode: () => encode7,
    suffixes: () => suffixes5,
    type: () => type5
  });
  var csv_exports = {};
  __export2(csv_exports, {
    decode: () => decode5,
    encode: () => encode6,
    suffixes: () => suffixes4,
    type: () => type4
  });
  var stripBOM = (str) => str.replace(/^\uFEFF/, "");
  var normalizeEOL = (str) => str.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  var isContentfulRow = (row) => row && !/^\s*$/.test(row);
  var addBOM = (str) => `\uFEFF${str}`;
  var suffixes4 = "csv";
  var type4 = "text/csv";
  var encode6 = (arr, separator) => {
    const rows = arr.length ? [Object.keys(arr[0]), ...arr.map((o12) => Object.values(o12))] : [];
    let content = rows.map((row) => row.join(separator)).join("\n");
    content = addBOM(content);
    return new TextEncoder().encode(content);
  };
  var decode5 = (o12, separator = ",") => {
    if (!o12.text)
      o12.text = new TextDecoder().decode(o12.buffer);
    let contents = o12.text;
    const collection = [];
    contents = stripBOM(contents);
    const rows = normalizeEOL(contents).split("\n").filter(isContentfulRow).map((str) => str.split(separator));
    const headers = rows.length ? rows.splice(0, 1)[0] : [];
    rows.forEach((arr, i9) => {
      let strObject = `{`;
      strObject += arr.map((val, j) => {
        try {
          const parsed = JSON.parse(val);
          return `"${headers[j]}":${parsed}`;
        } catch {
          return `"${headers[j]}":"${val}"`;
        }
      }).join(",");
      strObject += "}";
      collection.push(strObject);
    });
    return collection.map((v3) => JSON.parse(v3));
  };
  var type5 = "text/tab-separated-values";
  var suffixes5 = "tsv";
  var encode7 = (arr) => encode6(arr, "	");
  var decode6 = (arr) => decode5(arr, "	");
  var js_exports = {};
  __export2(js_exports, {
    decode: () => decode7,
    encode: () => encode8,
    suffixes: () => suffixes6,
    type: () => type6
  });
  var objToString = (obj) => {
    let ret = "{";
    for (let k3 in obj) {
      let v3 = obj[k3];
      if (typeof v3 === "function") {
        v3 = v3.toString();
      } else if (v3 instanceof Array) {
        v3 = JSON.stringify(v3);
      } else if (typeof v3 === "object" && !!v3) {
        v3 = objToString(v3);
      } else if (typeof v3 === "string") {
        v3 = `"${v3}"`;
      } else {
        v3 = `${v3}`;
      }
      ret += `
  ${k3}: ${v3},`;
    }
    ret += "\n}";
    return ret;
  };
  var esmImport = async (text) => {
    const moduleDataURI = "data:text/javascript;base64," + btoa(text);
    let imported = await import(moduleDataURI);
    if (imported.default && Object.keys(imported).length === 1)
      imported = imported.default;
    return imported;
  };
  var safeESMImport = async (text, config = {}, onBlob) => {
    try {
      return await esmImport(text);
    } catch (e11) {
      console.warn(`${config.path} contains ES6 imports. Manually importing these modules...`);
      const base = get2("", config.path);
      let childBase = config.system.root ? get2(base, config.system.root) : base;
      const importInfo = {};
      var re = /import([ \n\t]*(?:[^ \n\t\{\}]+[ \n\t]*,?)?(?:[ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)from[ \n\t]*(['"])([^'"\n]+)(?:['"])/g;
      let m3;
      do {
        m3 = re.exec(text);
        if (m3 == null)
          m3 = re.exec(text);
        if (m3) {
          text = text.replace(m3[0], ``);
          const variables = m3[1].trim().split(",");
          importInfo[m3[3]] = variables;
        }
      } while (m3);
      for (let path in importInfo) {
        let correctPath = get2(path, childBase);
        const variables = importInfo[path];
        const existingFile = config.system.files.list.get(get2(path));
        let blob = existingFile?.file;
        if (!blob) {
          const info = await handleFetch(correctPath);
          blob = new Blob([info.buffer], { type: info.type });
          await config.system.load(blob, correctPath, config.path);
        }
        let thisText = await blob.text();
        const imported = await safeESMImport(thisText, {
          path: correctPath,
          system: config.system
        }, onBlob);
        if (variables.length > 1) {
          variables.forEach((str) => {
            text = `const ${str} = ${objToString(imported[str])}
${text}`;
          });
        } else {
          text = `const ${variables[0]} = ${objToString(imported)}
${text}`;
        }
      }
      const tryImport = await esmImport(text);
      return tryImport;
    }
  };
  var import_default = safeESMImport;
  var type6 = "application/javascript";
  var suffixes6 = "js";
  var encode8 = () => void 0;
  var decode7 = async (o12, config) => {
    const textContent = !o12.text ? await decode2(o12) : o12.text;
    const imported = await import_default(textContent, config);
    if (imported)
      return imported;
    else
      return textContent;
  };
  var Codecs = class {
    constructor(codecsInput) {
      this.suffixToType = {};
      this.collection = /* @__PURE__ */ new Map();
      this.add = (codec) => {
        this.collection.set(codec.type, codec);
        let suffixes7 = codec.suffixes ? codec.suffixes : codec.type.split("-").splice(-1)[0];
        if (!Array.isArray(suffixes7))
          suffixes7 = [suffixes7];
        suffixes7.forEach((suffix2) => this.suffixToType[suffix2] = codec.type);
      };
      this.get = (mimeType) => this.collection.get(mimeType);
      this.getType = (suffix2) => this.suffixToType[suffix2];
      this.decode = (o12, type7, name2, config) => decode_default(o12, type7, name2, config, void 0, this);
      this.encode = (o12, type7, name2, config) => encode_default(o12, type7, name2, config, void 0, this);
      this.hasDependencies = (file2) => {
        return file2.mimeType === "application/javascript";
      };
      if (!Array.isArray(codecsInput))
        codecsInput = [codecsInput];
      codecsInput.forEach((codecs) => {
        if (codecs instanceof Codecs)
          codecs.collection.forEach(this.add);
        else
          for (let key in codecs)
            this.add(codecs[key]);
      });
    }
  };
  var deepClone = (o12 = {}) => {
    return JSON.parse(JSON.stringify(o12));
  };
  var clone_default = deepClone;
  var open = async (path, config) => {
    config = Object.assign({}, config);
    const useNative = !!config.system?.native;
    let file2 = config.system.files.list.get(path);
    if (file2)
      return file2;
    else {
      if (useNative && config.system.openNative instanceof Function)
        file2 = await config.system.openNative(path, config);
      else {
        try {
          file2 = await config.system.openRemote(path, config);
        } catch (e11) {
          console.warn("Remote failed", e11);
        }
      }
      if (file2)
        return file2;
      else
        console.error(`Could not open ${path}...`);
    }
  };
  var open_default = open;
  var createFile = (file2 = {}, path, system) => {
    return Object.assign(file2, {
      origin: system.root,
      path,
      options: {
        mode: "cors"
      }
    });
  };
  var load = async (file2, config) => {
    let { path, system, codecs, debug } = config;
    if (!path)
      path = file2.webkitRelativePath ?? file2.relativePath ?? file2.path ?? "";
    config.path = path;
    let fileConfig = config;
    if (!(file2 instanceof RangeFile)) {
      if (system.native) {
        if (file2.constructor.name !== "FileSystemFileHandle") {
          const openInfo = await open_default(path, {
            path,
            system,
            create: config.create,
            codecs,
            debug
          });
          if (openInfo && openInfo.constructor.name === "FileSystemDirectoryHandle") {
            file2 = openInfo;
          }
        }
      } else {
        if (fileConfig.system.root) {
          const directoryPath = new URL(fileConfig.system.root).pathname.split("/");
          const url = new URL(fileConfig.path);
          path = file2.path = fileConfig.path = url.pathname.split("/").filter((str, i9) => directoryPath?.[i9] != str).join("/");
        } else
          path = file2.path = fileConfig.path;
      }
      file2 = new RangeFile(file2, fileConfig);
      await file2.init();
    }
    system.add(file2);
    return file2;
  };
  var createFile2 = (file2 = {}, path, system) => {
    if (system.native)
      return file2;
    else
      return createFile(file2, path, system);
  };
  var saveEach = async (rangeFile, config, counter, length) => {
    await rangeFile.save(config.force);
    counter = counter + 1;
    if (config.progressCallback instanceof Function)
      config.progressCallback(config.name, counter / length, length);
  };
  var save = (name2, files, force, progressCallback) => {
    let length = files;
    return new Promise(async (resolve, reject) => {
      let i9 = 0;
      const firstFile = files.shift();
      await saveEach(firstFile, { progressCallback, name: name2, force }, i9, length);
      await iterate_default(files, (f3) => saveEach(f3, { progressCallback, name: name2, force }, i9, length));
      resolve();
    });
  };
  var save_default = save;
  var openRemote = async (path, config) => {
    let {
      system
    } = config;
    return await handleFetch(path).then(async (info) => {
      const splitURL = info.url.split("/");
      const fileName = splitURL.pop();
      let blob = new Blob([info.buffer], { type: info.type });
      blob.name = fileName;
      const file2 = createFile(blob, info.url, system);
      const rangeFile = await system.load(file2, info.url);
      return rangeFile;
    });
  };
  var open_default2 = openRemote;
  var mountRemote = async (url, config) => {
    let filePath;
    await handleFetch(url, void 0, config.progress).then(async (response) => {
      if (response.type === "application/json") {
        config.system.name = config.system.root = filePath = response.url;
        const datasets = JSON.parse(new TextDecoder().decode(response.buffer));
        let files = [];
        const drill = (o12) => {
          for (let key in o12) {
            const target = o12[key];
            if (typeof target === "string") {
              const path = `${response.url}/${target}`;
              const file2 = createFile(void 0, path, config.system);
              files.push({ file: file2, path });
            } else
              drill(target);
          }
        };
        drill(datasets);
        let filesIterable = files.entries();
        await iterate_default(filesIterable, async ([i9, { file: file2, path }]) => await config.system.load(file2, path));
      } else
        throw "Endpoint is not a freerange filesystem!";
    }).catch((e11) => {
      throw "Unable to connect to freerange filesystem!";
    });
    return filePath;
  };
  var mount_default = mountRemote;
  var isURL = (path) => {
    try {
      const url = new URL(path);
      return true;
    } catch {
      return false;
    }
  };
  var System = class {
    constructor(name2, systemInfo = {}) {
      this.dependencies = {};
      this.dependents = {};
      this.changelog = [];
      this.files = {};
      this.groups = {};
      this.groupConditions = /* @__PURE__ */ new Set();
      this.init = async () => {
        let mountConfig = {
          system: this,
          progress: this.progress
        };
        if (this.isNative(this.name)) {
          const native = await this.mountNative(this.name, mountConfig);
          if (!native)
            console.error("Unable to mount native filesystem!");
        } else {
          const path = this.name;
          const isURL2 = isURL(path);
          const fileName = name(path);
          const suffix2 = suffix(path);
          if (isURL2) {
            if (fileName && suffix2) {
              const path2 = this.name;
              this.root = directory(path2);
              const file2 = await this.open(fileName);
              await file2.body;
            } else {
              await this.mountRemote(this.name, mountConfig).catch((e11) => console.warn("System initialization failed.", e11));
            }
          } else if (this.name)
            this.root = "";
        }
      };
      this.addGroup = (name22, initial, condition) => {
        this.files[name22] = initial;
        this.groups[name22] = this.cloneGroup({ initial, condition });
        this.groupConditions.add(condition);
      };
      this.cloneGroup = (o12) => {
        let newO = { condition: o12.condition };
        if (o12.initial instanceof Map)
          newO.initial = new Map(o12.initial);
        else
          newO.initial = clone_default(o12.initial);
        return newO;
      };
      this.subsystem = async (path) => {
        const split = path.split("/");
        const name22 = split[split.length - 1];
        const subDir = split.shift();
        path = split.join("/");
        let target = this.files.system[subDir];
        split.forEach((str) => target = target[str]);
        const systemConstructor = this.constructor;
        const system = new systemConstructor(name22, {
          native: this.native,
          debug: this.debug,
          ignore: this.ignore,
          writable: this.writable,
          progress: this.progress,
          codecs: this.codecs
        });
        await system.init();
        let drill = async (target2, base) => {
          for (let key in target2) {
            const newBase = get2(key, base);
            const file2 = target2[key];
            if (file2 instanceof RangeFile)
              await system.load(file2, get2(key, base));
            else
              await drill(file2, newBase);
          }
        };
        await drill(target, path);
        return system;
      };
      this.reset = () => {
        this.changelog = [];
        this.files = this.createFileSystemInfo();
      };
      this.createFileSystemInfo = () => {
        const files = {};
        for (let name22 in this.groups) {
          let group = this.groups[name22];
          const groupInfo = this.cloneGroup(group);
          files[name22] = groupInfo.initial;
        }
        return files;
      };
      this.checkToLoad = (name22) => {
        return this.ignore.reduce((a5, b3) => a5 * (name22?.includes(b3) ? 0 : 1), 1);
      };
      this.load = async (file2, path, dependent) => {
        const existingFile = this.files.list.get(path);
        if (existingFile)
          return existingFile;
        else {
          if (!file2.name)
            file2.name = name(path);
          if (!this.native)
            file2 = createFile(file2, path, this);
          const toLoad = this.checkToLoad(file2.name ?? file2.path ?? path);
          if (toLoad) {
            const rangeFile = await load(file2, {
              path,
              system: this,
              debug: this.debug,
              codecs: this.codecs,
              create: this.writable
            });
            if (dependent) {
              if (!this.dependencies[dependent])
                this.dependencies[dependent] = /* @__PURE__ */ new Map();
              this.dependencies[dependent].set(rangeFile.path, rangeFile);
              if (!this.dependents[rangeFile.path])
                this.dependents[rangeFile.path] = /* @__PURE__ */ new Map();
              const file22 = this.files.list.get(dependent);
              this.dependents[rangeFile.path].set(file22.path, file22);
            }
            return rangeFile;
          } else
            console.warn(`Ignoring ${file2.name}`);
        }
      };
      this.add = (file2) => {
        if (!this.files.list.has(file2.path)) {
          this.groupConditions.forEach((func) => func(file2, file2.path, this.files));
        } else
          console.warn(`${this.name}/${file2.path} already exists!`);
      };
      this.isNative = () => false;
      this.openRemote = open_default2;
      this.mountRemote = mount_default;
      this.open = async (path, create) => {
        if (!this.native)
          path = get2(path, this.root);
        const rangeFile = await open_default(path, {
          path,
          debug: this.debug,
          system: this,
          create: create ?? this.writable,
          codecs: this.codecs
        });
        return rangeFile;
      };
      this.save = async (force, progress = this.progress) => await save_default(this.name, Array.from(this.files.list.values()), force, progress);
      this.sync = async () => await iterate_default(this.files.list.values(), async (entry) => await entry.sync());
      this.transfer = async (target) => await transfer_default(this, target);
      this.name = name2;
      this.native = systemInfo.native;
      this.debug = systemInfo.debug;
      this.ignore = systemInfo.ignore ?? [];
      this.writable = systemInfo.writable;
      this.progress = systemInfo.progress;
      this.codecs = new Codecs([codecs_exports, systemInfo.codecs]);
      this.addGroup("system", {}, (file2, path, files) => {
        let target = files.system;
        let split = path.split("/");
        split = split.slice(0, split.length - 1);
        if (path)
          split.forEach((k3, i9) => {
            if (!target[k3])
              target[k3] = {};
            target = target[k3];
          });
        target[file2.name] = file2;
      });
      this.addGroup("types", {}, (file2, _3, files) => {
        const suffix2 = file2.suffix ?? file2.name;
        if (suffix2) {
          if (!files.types[suffix2])
            files.types[suffix2] = [];
          files.types[suffix2].push(file2);
        }
      });
      this.addGroup("n", 0, (_3, __, files) => files.n++);
      this.addGroup("list", /* @__PURE__ */ new Map(), (file2, _3, files) => files.list.set(file2.path, file2));
    }
  };
  var openNative = async (path, config) => {
    let nativeHandle = config.system.native;
    let fileSystem = config.system?.files?.["system"];
    let { system, create } = config;
    let pathTokens = path.split("/");
    let fileName = config.type === "directory" ? null : pathTokens.pop();
    pathTokens = pathTokens.filter((f3) => !!f3);
    if (pathTokens.length > 0) {
      for (const token of pathTokens) {
        const handle = await nativeHandle.getDirectoryHandle(token, { create }).catch((e11) => {
          if (create)
            console.warn(`${token} is an invalid file system handle`, e11);
          else
            console.warn(`Directory ${token} does not already exist.`);
        });
        if (handle) {
          nativeHandle = handle;
          if (!fileSystem[token])
            fileSystem[token] = {};
          if (!(fileSystem[token] instanceof RangeFile))
            fileSystem = fileSystem[token];
        }
      }
    }
    if (fileName) {
      let existingFile = fileSystem[fileName];
      if (!(existingFile instanceof RangeFile)) {
        const fileHandle = await nativeHandle.getFileHandle(fileName, { create }).catch((e11) => {
          if (config.create)
            console.warn(`Could not create ${fileName}. There may be a directory of the same name...`, e11);
          else
            console.warn(`No file found at ${path}.`);
        });
        if (!fileHandle)
          return;
        const file2 = createFile2(fileHandle, path, system);
        existingFile = await system.load(file2, path);
      }
      return existingFile;
    } else
      return nativeHandle;
  };
  var open_default3 = openNative;
  var verifyPermission = async (fileHandle, withWrite = false) => {
    const opts = {};
    if (withWrite)
      opts.mode = "readwrite";
    const state2 = await fileHandle.queryPermission(opts);
    if (await state2 === "granted")
      return true;
    const requestState = await fileHandle.requestPermission(opts);
    if (requestState === "granted")
      return true;
    return false;
  };
  var verify_default = verifyPermission;
  var onhandle = async (handle, base = "", system, progressCallback = void 0) => {
    await verify_default(handle, true);
    if (handle.name != system.name)
      base = base ? get2(handle.name, base) : handle.name;
    const files = [];
    if (handle.kind === "file") {
      if (progressCallback instanceof Function)
        files.push({ handle, base });
      else
        await system.load(handle, base);
    } else if (handle.kind === "directory") {
      const arr = await iterate_default(handle.values(), (entry) => {
        return onhandle(entry, base, system, progressCallback);
      });
      files.push(...arr.flat());
    }
    if (!base) {
      let count = 0;
      await iterate_default(files, async (o12) => {
        await system.load(o12.handle, o12.base);
        count++;
        progressCallback(system.name, count / files.length, files.length);
      });
    }
    return files;
  };
  var mountNative = async (handle, config) => {
    if (!handle)
      handle = await window.showDirectoryPicker();
    if (config?.system) {
      config.system.name = config.system.root = handle.name;
      config.system.native = handle;
    }
    await onhandle(handle, null, config?.system, config?.progress);
    return handle;
  };
  var mount_default2 = mountNative;
  var LocalSystem = class extends System {
    constructor(name2, info) {
      super(name2, info);
      this.isNative = (info2) => !info2 || info2 instanceof FileSystemDirectoryHandle;
      this.openNative = open_default3;
      this.mountNative = mount_default2;
    }
  };

  // examples/editor/external/brainsatplay/Graph.ts
  function getFnParamNames(fn) {
    var fstr = fn.toString();
    return fstr.match(/\(.*?\)/)[0].replace(/[()]/gi, "").replace(/\s/gi, "").split(",");
  }
  function parseFunctionFromText(method = "") {
    let getFunctionBody = (methodString) => {
      return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i, "$2$3$4");
    };
    let getFunctionHead = (methodString) => {
      let startindex = methodString.indexOf(")");
      return methodString.slice(0, methodString.indexOf("{", startindex) + 1);
    };
    let newFuncHead = getFunctionHead(method);
    let newFuncBody = getFunctionBody(method);
    let newFunc;
    if (newFuncHead.includes("function ")) {
      let varName = newFuncHead.split("(")[1].split(")")[0];
      newFunc = new Function(varName, newFuncBody);
    } else {
      if (newFuncHead.substring(0, 6) === newFuncBody.substring(0, 6)) {
        let varName = newFuncHead.split("(")[1].split(")")[0];
        newFunc = new Function(varName, newFuncBody.substring(newFuncBody.indexOf("{") + 1, newFuncBody.length - 1));
      } else {
        try {
          newFunc = (0, eval)(newFuncHead + newFuncBody + "}");
        } catch {
        }
      }
    }
    return newFunc;
  }
  var state = {
    pushToState: {},
    data: {},
    triggers: {},
    setState(updateObj) {
      Object.assign(state.data, updateObj);
      for (const prop of Object.getOwnPropertyNames(updateObj)) {
        if (state.triggers[prop])
          state.triggers[prop].forEach((obj) => obj.onchange(state.data[prop]));
      }
      return state.data;
    },
    subscribeTrigger(key, onchange) {
      if (key) {
        if (!state.triggers[key]) {
          state.triggers[key] = [];
        }
        let l9 = state.triggers[key].length;
        state.triggers[key].push({ idx: l9, onchange });
        return state.triggers[key].length - 1;
      } else
        return void 0;
    },
    unsubscribeTrigger(key, sub) {
      let idx = void 0;
      let triggers = state.triggers[key];
      if (triggers) {
        if (!sub)
          delete state.triggers[key];
        else {
          let obj = triggers.find((o12) => {
            if (o12.idx === sub) {
              return true;
            }
          });
          if (obj)
            triggers.splice(idx, 1);
          return true;
        }
      }
    },
    subscribeTriggerOnce(key = void 0, onchange) {
      let sub;
      let changed = (value) => {
        onchange(value);
        state.unsubscribeTrigger(key, sub);
      };
      sub = state.subscribeTrigger(key, changed);
    }
  };
  var GraphNode = class {
    constructor(properties = {}, parentNode, graph) {
      this.nodes = /* @__PURE__ */ new Map();
      this.attributes = /* @__PURE__ */ new Set();
      this.state = state;
      this.isLooping = false;
      this.isAnimating = false;
      this.looper = void 0;
      this.animation = void 0;
      this.forward = true;
      this.backward = false;
      this.runSync = false;
      this.firstRun = true;
      this.operator = (self2 = this, origin, ...args) => {
        return args;
      };
      this.runOp = (node = this, origin = this, ...args) => {
        let result = node.operator(node, origin, ...args);
        if (result instanceof Promise) {
          result.then((res) => {
            this.setState({ [node.tag]: res });
            return res;
          });
        } else {
          this.setState({ [node.tag]: result });
        }
        return result;
      };
      this.run = (...args) => {
        return this._run(this, void 0, ...args);
      };
      this._run = (node = this, origin, ...args) => {
        if (!(node instanceof GraphNode)) {
          if (Object.getPrototypeOf(node) === String.prototype) {
            let fnd;
            if (this.graph)
              fnd = this.graph.nodes.get(node);
            if (!fnd)
              fnd = this.nodes.get(node);
            node = fnd;
          }
        }
        if (!node)
          return void 0;
        if (node.firstRun) {
          node.firstRun = false;
          if (!(node.children && node.forward || node.parent && node.backward || node.repeat || node.delay || node.frame || node.recursive))
            node.runSync = true;
          if (node.animate && !node.isAnimating) {
            node.runAnimation(node.animation, args, node, origin);
            return;
          }
          if (node.loop && typeof node.loop === "number" && !node.isLooping) {
            node.runLoop(node.looper, args, node, origin);
            return;
          }
        }
        if (node.runSync) {
          let res = node.runOp(node, origin, ...args);
          return res;
        }
        return new Promise(async (resolve) => {
          if (node) {
            let run = (node2, tick = 0, ...input) => {
              return new Promise(async (r10) => {
                tick++;
                let res = await node2.runOp(node2, origin, ...input);
                if (node2.repeat) {
                  while (tick < node2.repeat) {
                    if (node2.delay) {
                      setTimeout(async () => {
                        r10(await run(node2, tick, ...input));
                      }, node2.delay);
                      break;
                    } else if (node2.frame && window?.requestAnimationFrame) {
                      requestAnimationFrame(async () => {
                        r10(await run(node2, tick, ...input));
                      });
                      break;
                    } else
                      res = await node2.runOp(node2, origin, ...input);
                    tick++;
                  }
                  if (tick === node2.repeat) {
                    r10(res);
                    return;
                  }
                } else if (node2.recursive) {
                  while (tick < node2.recursive) {
                    if (node2.delay) {
                      setTimeout(async () => {
                        r10(await run(node2, tick, ...res));
                      }, node2.delay);
                      break;
                    } else if (node2.frame && window?.requestAnimationFrame) {
                      requestAnimationFrame(async () => {
                        r10(await run(node2, tick, ...res));
                      });
                      break;
                    } else
                      res = await node2.runOp(node2, origin, ...res);
                    tick++;
                  }
                  if (tick === node2.recursive) {
                    r10(res);
                    return;
                  }
                } else {
                  r10(res);
                  return;
                }
              });
            };
            let runnode = async () => {
              let res = await run(node, void 0, ...args);
              if (node.backward && node.parent?._run) {
                if (Array.isArray(res))
                  await this.runParent(node, ...res);
                else
                  await this.runParent(node, res);
              }
              if (node.children && node.forward) {
                if (Array.isArray(res))
                  await this.runChildren(node, ...res);
                else
                  await this.runChildren(node, res);
              }
              return res;
            };
            if (node.delay) {
              setTimeout(async () => {
                resolve(await runnode());
              }, node.delay);
            } else if (node.frame && window?.requestAnimationFrame) {
              requestAnimationFrame(async () => {
                resolve(await runnode());
              });
            } else {
              resolve(await runnode());
            }
          } else
            resolve(void 0);
        });
      };
      this.runParent = async (node, ...args) => {
        if (node.backward && node.parent) {
          if (typeof node.parent === "string") {
            if (node.graph && node.graph?.get(node.parent)) {
              node.parent = node.graph;
              if (node.parent)
                this.nodes.set(node.parent.tag, node.parent);
            } else
              node.parent = this.nodes.get(node.parent);
          }
          if (node.parent?.run)
            await node.parent._run(node.parent, this, ...args);
        }
      };
      this.runChildren = async (node, ...args) => {
        if (Array.isArray(node.children)) {
          for (let i9 = 0; i9 < node.children.length; i9++) {
            if (Object.getPrototypeOf(node.children[i9]) === String.prototype) {
              if (node.graph && node.graph?.get(node.children[i9])) {
                node.children[i9] = node.graph.get(node.children[i9]);
                if (!node.nodes.get(node.children[i9].tag))
                  node.nodes.set(node.children[i9].tag, node.children[i9]);
              }
              if (!node.children[i9] && node.nodes.get(node.children[i9]))
                node.children[i9] = node.nodes.get(node.children[i9]);
            }
            if (node.children[i9]?.runOp)
              await node.children[i9]._run(node.children[i9], node, ...args);
          }
        } else if (node.children) {
          if (Object.getPrototypeOf(node.children) === String.prototype) {
            if (node.graph && node.graph?.get(node.children)) {
              node.children = node.graph.get(node.children);
              if (!node.nodes.get(node.children.tag))
                node.nodes.set(node.children.tag, node.children);
            }
            if (!node.children && node.nodes.get(node.children))
              node.children = node.nodes.get(node.children);
          }
          if (node.children?.runOp)
            await node.children._run(node.children, node, ...args);
        }
      };
      this.runAnimation = (animation = this.animation, args = [], node = this, origin) => {
        this.animation = animation;
        if (!animation)
          this.animation = this.operator;
        if (node.animate && !node.isAnimating) {
          node.isAnimating = true;
          let anim = async () => {
            if (node.isAnimating) {
              let result = this.animation(node, origin, ...args);
              if (result instanceof Promise) {
                result = await result;
              }
              if (result !== void 0) {
                if (this.tag)
                  this.setState({ [this.tag]: result });
                if (node.backward && node.parent?._run) {
                  if (Array.isArray(result))
                    await this.runParent(node, ...result);
                  else
                    await this.runParent(node, result);
                }
                if (node.children && node.forward) {
                  if (Array.isArray(result))
                    await this.runChildren(node, ...result);
                  else
                    await this.runChildren(node, result);
                }
                this.setState({ [node.tag]: result });
              }
              requestAnimationFrame(anim);
            }
          };
          requestAnimationFrame(anim);
        }
      };
      this.runLoop = (loop = this.looper, args = [], node = this, origin, timeout = node.loop) => {
        node.looper = loop;
        if (!loop)
          node.looper = node.operator;
        if (typeof timeout === "number" && !node.isLooping) {
          node.isLooping = true;
          let looping = async () => {
            if (node.isLooping) {
              let result = node.looper(node, origin, ...args);
              if (result instanceof Promise) {
                result = await result;
              }
              if (result !== void 0) {
                if (node.tag)
                  node.setState({ [node.tag]: result });
                if (node.backward && node.parent?._run) {
                  if (Array.isArray(result))
                    await this.runParent(node, ...result);
                  else
                    await this.runParent(node, result);
                }
                if (node.children && node.forward) {
                  if (Array.isArray(result))
                    await this.runChildren(node, ...result);
                  else
                    await this.runChildren(node, result);
                }
                node.setState({ [node.tag]: result });
              }
              setTimeout(async () => {
                await looping();
              }, timeout);
            }
          };
          looping();
        }
      };
      this.setOperator = (operator) => {
        this.operator = operator;
      };
      this.setParent = (parent2) => {
        this.parent = parent2;
        if (this.backward)
          this.runSync = false;
      };
      this.setChildren = (children) => {
        this.children = children;
        if (this.forward)
          this.runSync = false;
      };
      this.add = (node = {}) => {
        if (typeof node === "function")
          node = { operator: node };
        if (!(node instanceof GraphNode))
          node = new GraphNode(node, this, this.graph);
        this.nodes.set(node.tag, node);
        if (this.graph)
          this.graph.nodes.set(node.tag, node);
        return node;
      };
      this.remove = (node) => {
        if (typeof node === "string")
          node = this.nodes.get(node);
        if (node instanceof GraphNode) {
          this.nodes.delete(node.tag);
          if (this.graph)
            this.graph.nodes.delete(node.tag);
          this.nodes.forEach((n12) => {
            if (n12.nodes.get(node.tag))
              n12.nodes.delete(node.tag);
          });
        }
      };
      this.append = (node, parentNode = this) => {
        if (typeof node === "string")
          node = this.nodes.get(node);
        if (node instanceof GraphNode) {
          parentNode.addChildren(node);
          if (node.forward)
            node.runSync = false;
        }
      };
      this.subscribe = (callback, tag = this.tag) => {
        if (callback instanceof GraphNode) {
          return this.subscribeNode(callback);
        } else
          return this.state.subscribeTrigger(tag, callback);
      };
      this.unsubscribe = (sub, tag = this.tag) => {
        this.state.unsubscribeTrigger(tag, sub);
      };
      this.addChildren = (children) => {
        if (!this.children)
          this.children = [];
        if (!Array.isArray(this.children)) {
          this.children = [children];
          if (typeof children === "object" && children.tag) {
            this.nodes.set(children.tag, children);
            if (this.graph)
              this.graph.nodes.set(children.tag, children);
          }
        } else if (Array.isArray(children)) {
          this.children.push(...children);
          children.forEach((c4) => {
            if (typeof c4 === "object" && c4.tag) {
              this.nodes.set(c4.tag, c4);
              if (this.graph)
                this.graph.nodes.set(c4.tag, c4);
            }
          });
        } else {
          this.children.push(children);
          if (typeof children === "object" && children.tag) {
            this.nodes.set(children.tag, children);
            if (this.graph)
              this.graph.nodes.set(children.tag, children);
          }
        }
        if (this.forward)
          this.runSync = false;
      };
      this.callParent = (...args) => {
        const origin = this;
        if (typeof this.parent === "string") {
          if (this.graph && this.graph?.get(this.parent)) {
            this.parent = this.graph;
            if (this.parent)
              this.nodes.set(this.parent.tag, this.parent);
          } else
            this.parent = this.nodes.get(this.parent);
        }
        if (typeof this.parent?.operator === "function")
          return this.parent.runOp(this.parent, origin, ...args);
      };
      this.callChildren = (idx, ...args) => {
        const origin = this;
        let result;
        if (Array.isArray(this.children)) {
          if (idx) {
            if (Object.getPrototypeOf(this.children[idx]) === String.prototype) {
              if (this.graph && this.graph.get(this.children[idx])) {
                this.children[idx] = this.graph.get(this.children[idx]);
                if (!this.nodes.get(this.children[idx].tag))
                  this.nodes.set(this.children[idx].tag, this.children[idx]);
              }
              if (!this.children[idx] && this.nodes.get(this.children[idx]))
                this.children[idx] = this.nodes.get(this.children[idx]);
            }
            if (this.children[idx]?.runOp)
              result = this.children[idx].runOp(this.children[idx], origin, ...args);
          } else {
            result = [];
            for (let i9 = 0; i9 < this.children.length; i9++) {
              if (Object.getPrototypeOf(this.children[i9]) === String.prototype) {
                if (this.graph && this.graph.get(this.children[i9])) {
                  this.children[i9] = this.graph.get(this.children[i9]);
                  if (!this.nodes.get(this.children[i9].tag))
                    this.nodes.set(this.children[i9].tag, this.children[i9]);
                }
                if (!this.children[i9] && this.nodes.get(this.children[i9]))
                  this.children[i9] = this.nodes.get(this.children[i9]);
              }
              if (this.children[i9]?.runOp)
                result.push(this.children[i9].runOp(this.children[i9], origin, ...args));
            }
          }
        } else if (this.children) {
          if (Object.getPrototypeOf(this.children) === String.prototype) {
            if (this.graph && this.graph.get(this.children)) {
              this.children = this.graph.get(this.children);
              if (!this.nodes.get(this.children.tag))
                this.nodes.set(this.children.tag, this.children);
            }
            if (!this.children && this.nodes.get(this.children))
              this.children = this.nodes.get(this.children);
          }
          result = this.children.runOp(this.children, origin, ...args);
        }
        return result;
      };
      this.setProps = (props = {}) => {
        Object.assign(this, props);
        if (!(this.children && this.forward || this.parent && this.backward || this.repeat || this.delay || this.frame || this.recursive))
          this.runSync = true;
      };
      this.removeTree = (node) => {
        if (node) {
          if (Object.getPrototypeOf(node) === String.prototype)
            node = this.nodes.get(node);
        }
        if (node instanceof GraphNode) {
          const recursivelyRemove = (node2) => {
            if (node2.children) {
              if (Array.isArray(node2.children)) {
                node2.children.forEach((c4) => {
                  if (c4.stopNode)
                    c4.stopNode();
                  if (c4.tag) {
                    if (this.nodes.get(c4.tag))
                      this.nodes.delete(c4.tag);
                  }
                  this.nodes.forEach((n12) => {
                    if (n12.nodes.get(c4.tag))
                      n12.nodes.delete(c4.tag);
                  });
                  recursivelyRemove(c4);
                });
              } else if (typeof node2.children === "object") {
                if (node2.stopNode)
                  node2.stopNode();
                if (node2.tag) {
                  if (this.nodes.get(node2.tag))
                    this.nodes.delete(node2.tag);
                }
                this.nodes.forEach((n12) => {
                  if (n12.nodes.get(node2.tag))
                    n12.nodes.delete(node2.tag);
                });
                recursivelyRemove(node2);
              }
            }
          };
          if (node.stopNode)
            node.stopNode();
          if (node.tag) {
            this.nodes.delete(node.tag);
            this.nodes.forEach((n12) => {
              if (n12.nodes.get(node.tag))
                n12.nodes.delete(node.tag);
            });
            recursivelyRemove(node);
            if (this.graph)
              this.graph.nodes.removeTree(node);
          }
        }
      };
      this.convertChildrenToNodes = (n12) => {
        if (n12?.children instanceof GraphNode) {
          if (!this.graph?.nodes.get(n12.tag))
            this.graph.nodes.set(n12.tag, n12);
          if (!this.nodes.get(n12.tag))
            this.nodes.set(n12.tag, n12);
        } else if (Array.isArray(n12.children)) {
          for (let i9 = 0; i9 < n12.children.length; i9++) {
            if (n12.children[i9] instanceof GraphNode) {
              if (!this.graph?.nodes.get(n12.children[i9].tag))
                this.graph.nodes.set(n12.children[i9].tag, n12.children[i9]);
              if (!this.nodes.get(n12.children[i9].tag))
                this.nodes.set(n12.children[i9].tag, n12.children[i9]);
              continue;
            } else if (typeof n12.children[i9] === "object") {
              n12.children[i9] = new GraphNode(n12.children[i9], n12, this.graph);
              this.nodes.set(n12.children[i9].tag, n12.children[i9]);
              this.convertChildrenToNodes(n12.children[i9]);
            } else if (typeof n12.children[i9] === "string") {
              if (this.graph && this.graph.get(n12.children[i9])) {
                n12.children[i9] = this.graph.get(n12.children[i9]);
                if (!this.nodes.get(n12.children[i9].tag))
                  this.nodes.set(n12.children[i9].tag, n12.children[i9]);
              }
              if (!n12.children[i9] && this.nodes.get(n12.children[i9]))
                n12.children[i9] = this.nodes.get(n12.children[i9]);
            }
          }
        } else if (typeof n12.children === "object") {
          n12.children = new GraphNode(n12.children, n12, this.graph);
          this.nodes.set(n12.children.tag, n12.children);
          this.convertChildrenToNodes(n12.children);
        } else if (typeof n12.children === "string") {
          if (this.graph && this.graph.get(n12.children)) {
            n12.children = this.graph.get(n12.children);
            if (!this.nodes.get(n12.children.tag))
              this.nodes.set(n12.children.tag, n12.children);
          }
          if (!n12.children && this.nodes.get(n12.children))
            n12.children = this.nodes.get(n12.children);
        }
        return n12.children;
      };
      this.get = (tag) => {
        return this.nodes.get(tag);
      };
      this.stopLooping = (node = this) => {
        node.isLooping = false;
      };
      this.stopAnimating = (node = this) => {
        node.isAnimating = false;
      };
      this.stopNode = (node = this) => {
        node.stopAnimating(node);
        node.stopLooping(node);
      };
      this.subscribeNode = (node) => {
        if (node.tag)
          this.nodes.set(node.tag, node);
        return this.state.subscribeTrigger(this.tag, (res) => {
          node._run(node, this, res);
        });
      };
      this.print = (node = this, printChildren = true, nodesPrinted = []) => {
        let dummyNode = new GraphNode();
        if (typeof node === "string")
          node = this.nodes.get(node);
        if (node instanceof GraphNode) {
          nodesPrinted.push(node.tag);
          let jsonToPrint = {
            tag: node.tag,
            operator: node.operator.toString()
          };
          if (node.parent)
            jsonToPrint.parent = node.parent.tag;
          if (node.children) {
            if (Array.isArray(node.children)) {
              node.children = node.children.map((c4) => {
                if (typeof c4 === "string")
                  return c4;
                if (nodesPrinted.includes(c4.tag))
                  return c4.tag;
                else if (!printChildren) {
                  return c4.tag;
                } else
                  return c4.print(c4, printChildren, nodesPrinted);
              });
            } else if (typeof node.children === "object") {
              if (!printChildren) {
                jsonToPrint.children = [node.children.tag];
              }
              if (nodesPrinted.includes(node.children.tag))
                jsonToPrint.children = [node.children.tag];
              else
                jsonToPrint.children = [node.children.print(node.children, printChildren, nodesPrinted)];
            } else if (typeof node.children === "string")
              jsonToPrint.children = [node.children];
          }
          for (const prop in node) {
            if (prop === "parent" || prop === "children")
              continue;
            if (typeof dummyNode[prop] === "undefined") {
              if (typeof node[prop] === "function") {
                jsonToPrint[prop] = node[prop].toString();
              } else if (typeof node[prop] === "object") {
                jsonToPrint[prop] = JSON.stringifyWithCircularRefs(node[prop]);
              } else {
                jsonToPrint[prop] = node[prop];
              }
            }
          }
          return JSON.stringify(jsonToPrint);
        }
      };
      this.reconstruct = (json) => {
        let parsed = reconstructObject(json);
        if (parsed)
          return this.add(parsed);
      };
      this.setState = this.state.setState;
      if (typeof properties === "function") {
        properties = { operator: properties };
      }
      if (typeof properties === "object") {
        if (properties?.operator) {
          let params = getFnParamNames(properties.operator);
          if (!(params[0] == "self" || params[0] == "node" || params[1] == "origin" || params[1] == "parent" || params[1] == "graph" || params[1] == "router")) {
            let fn = properties.operator;
            properties.operator = (self2, origin, ...args) => {
              return fn(...args);
            };
          }
        }
        if (!properties.tag && graph) {
          properties.tag = `node${graph.nNodes}`;
        } else if (!properties.tag) {
          properties.tag = `node${Math.floor(Math.random() * 1e10)}`;
        }
        Object.assign(this, properties);
      } else if (graph) {
        this.tag = `node${graph.nNodes}`;
      } else {
        this.tag = `node${Math.floor(Math.random() * 1e10)}`;
      }
      this.parent = parentNode;
      this.graph = graph;
      if (graph) {
        graph.nNodes++;
        graph.nodes.set(this.tag, this);
      }
      if (this.children)
        this.convertChildrenToNodes(this);
    }
  };
  var Graph = class {
    constructor(tree, tag) {
      this.nNodes = 0;
      this.nodes = /* @__PURE__ */ new Map();
      this.state = state;
      this.tree = {};
      this.add = (node = {}) => {
        let props = node;
        if (!(node instanceof GraphNode))
          node = new GraphNode(props, void 0, this);
        this.tree[node.tag] = props;
        return node;
      };
      this.setTree = (tree = this.tree) => {
        if (!tree)
          return;
        for (const node in tree) {
          if (!this.nodes.get(node)) {
            if (typeof tree[node] === "function") {
              this.add({ tag: node, operator: tree[node] });
            } else if (typeof tree[node] === "object") {
              if (!tree[node].tag)
                tree[node].tag = node;
              let newNode = this.add(tree[node]);
              if (tree[node].aliases) {
                tree[node].aliases.forEach((a5) => {
                  this.nodes.set(a5, newNode);
                });
              }
            }
          }
        }
      };
      this.get = (tag) => {
        return this.nodes.get(tag);
      };
      this.run = (node, ...args) => {
        if (typeof node === "string")
          node = this.nodes.get(node);
        if (node instanceof GraphNode)
          return node._run(node, this, ...args);
        else
          return void 0;
      };
      this._run = (node, origin = this, ...args) => {
        if (typeof node === "string")
          node = this.nodes.get(node);
        if (node instanceof GraphNode)
          return node._run(node, origin, ...args);
        else
          return void 0;
      };
      this.removeTree = (node) => {
        if (typeof node === "string")
          node = this.nodes.get(node);
        if (node instanceof GraphNode) {
          const recursivelyRemove = (node2) => {
            if (node2.children) {
              if (Array.isArray(node2.children)) {
                node2.children.forEach((c4) => {
                  if (c4.stopNode)
                    c4.stopNode();
                  if (c4.tag) {
                    if (this.nodes.get(c4.tag))
                      this.nodes.delete(c4.tag);
                  }
                  this.nodes.forEach((n12) => {
                    if (n12.nodes.get(c4.tag))
                      n12.nodes.delete(c4.tag);
                  });
                  recursivelyRemove(c4);
                });
              } else if (typeof node2.children === "object") {
                if (node2.stopNode)
                  node2.stopNode();
                if (node2.tag) {
                  if (this.nodes.get(node2.tag))
                    this.nodes.delete(node2.tag);
                }
                this.nodes.forEach((n12) => {
                  if (n12.nodes.get(node2.tag))
                    n12.nodes.delete(node2.tag);
                });
                recursivelyRemove(node2);
              }
            }
          };
          if (node.stopNode)
            node.stopNode();
          if (node.tag) {
            this.nodes.delete(node.tag);
            this.nodes.forEach((n12) => {
              if (n12.nodes.get(node.tag))
                n12.nodes.delete(node.tag);
            });
            recursivelyRemove(node);
          }
        }
      };
      this.remove = (node) => {
        if (typeof node === "string")
          node = this.nodes.get(node);
        if (node?.tag) {
          node.stopNode();
          if (node?.tag)
            this.nodes.delete(node.tag);
          if (node?.tag) {
            if (this.nodes.get(node.tag)) {
              this.nodes.delete(node.tag);
              this.nodes.forEach((n12) => {
                if (n12.nodes.get(node.tag))
                  n12.nodes.delete(node.tag);
              });
            }
          }
        }
      };
      this.append = (node, parentNode) => {
        parentNode.addChildren(node);
      };
      this.callParent = async (node, origin = node, ...args) => {
        if (node?.parent) {
          return await node.callParent(node, origin, ...args);
        }
      };
      this.callChildren = async (node, idx, ...args) => {
        if (node?.children) {
          return await node.callChildren(idx, ...args);
        }
      };
      this.subscribe = (node, callback) => {
        if (!callback)
          return;
        if (typeof node !== "string")
          node = node.tag;
        if (node instanceof GraphNode) {
          return node.subscribe(callback);
        } else
          return this.state.subscribeTrigger(node, callback);
      };
      this.unsubscribe = (tag, sub) => {
        this.state.unsubscribeTrigger(tag, sub);
      };
      this.subscribeNode = (inputNode, outputNode) => {
        let tag;
        if (inputNode?.tag)
          tag = inputNode.tag;
        else if (typeof inputNode === "string")
          tag = inputNode;
        return this.state.subscribeTrigger(tag, (res) => {
          this.run(outputNode, inputNode, ...res);
        });
      };
      this.stopNode = (node) => {
        if (typeof node === "string") {
          node = this.nodes.get(node);
        }
        if (node instanceof GraphNode) {
          node.stopNode();
        }
      };
      this.print = (node = void 0, printChildren = true) => {
        if (node instanceof GraphNode)
          return node.print(node, printChildren);
        else {
          let printed = `{`;
          this.nodes.forEach((n12) => {
            printed += `
"${n12.tag}:${n12.print(n12, printChildren)}"`;
          });
          return printed;
        }
      };
      this.reconstruct = (json) => {
        let parsed = reconstructObject(json);
        if (parsed)
          return this.add(parsed);
      };
      this.create = (operator, parentNode, props) => {
        return createNode(operator, parentNode, props, this);
      };
      this.setState = this.state.setState;
      this.tag = tag ? tag : `graph${Math.floor(Math.random() * 1e11)}`;
      if (tree || Object.keys(this.tree).length > 0)
        this.setTree(tree);
    }
  };
  function reconstructObject(json = "{}") {
    try {
      let parsed = typeof json === "string" ? JSON.parse(json) : json;
      const parseObj = (obj) => {
        for (const prop in obj) {
          if (typeof obj[prop] === "string") {
            let funcParsed = parseFunctionFromText(obj[prop]);
            if (typeof funcParsed === "function") {
              obj[prop] = funcParsed;
            }
          } else if (typeof obj[prop] === "object") {
            parseObj(obj[prop]);
          }
        }
        return obj;
      };
      return parseObj(parsed);
    } catch (err2) {
      console.error(err2);
      return void 0;
    }
  }
  var stringifyWithCircularRefs = function() {
    const refs = /* @__PURE__ */ new Map();
    const parents = [];
    const path = ["this"];
    function clear() {
      refs.clear();
      parents.length = 0;
      path.length = 1;
    }
    function updateParents(key, value) {
      var idx = parents.length - 1;
      var prev = parents[idx];
      if (typeof prev === "object") {
        if (prev[key] === value || idx === 0) {
          path.push(key);
          parents.push(value.pushed);
        } else {
          while (idx-- >= 0) {
            prev = parents[idx];
            if (typeof prev === "object") {
              if (prev[key] === value) {
                idx += 2;
                parents.length = idx;
                path.length = idx;
                --idx;
                parents[idx] = value;
                path[idx] = key;
                break;
              }
            }
            idx--;
          }
        }
      }
    }
    function checkCircular(key, value) {
      if (value != null) {
        if (typeof value === "object") {
          if (key) {
            updateParents(key, value);
          }
          let other = refs.get(value);
          if (other) {
            return "[Circular Reference]" + other;
          } else {
            refs.set(value, path.join("."));
          }
        }
      }
      return value;
    }
    return function stringifyWithCircularRefs2(obj, space) {
      try {
        parents.push(obj);
        return JSON.stringify(obj, checkCircular, space);
      } finally {
        clear();
      }
    };
  }();
  if (JSON.stringifyWithCircularRefs === void 0) {
    JSON.stringifyWithCircularRefs = stringifyWithCircularRefs;
  }
  var stringifyFast = function() {
    const refs = /* @__PURE__ */ new Map();
    const parents = [];
    const path = ["this"];
    function clear() {
      refs.clear();
      parents.length = 0;
      path.length = 1;
    }
    function updateParents(key, value) {
      var idx = parents.length - 1;
      if (parents[idx]) {
        var prev = parents[idx];
        if (typeof prev === "object") {
          if (prev[key] === value || idx === 0) {
            path.push(key);
            parents.push(value.pushed);
          } else {
            while (idx-- >= 0) {
              prev = parents[idx];
              if (typeof prev === "object") {
                if (prev[key] === value) {
                  idx += 2;
                  parents.length = idx;
                  path.length = idx;
                  --idx;
                  parents[idx] = value;
                  path[idx] = key;
                  break;
                }
              }
              idx++;
            }
          }
        }
      }
    }
    function checkValues(key, value) {
      let val;
      if (value != null) {
        if (typeof value === "object") {
          let c4 = value.constructor.name;
          if (key && c4 === "Object") {
            updateParents(key, value);
          }
          let other = refs.get(value);
          if (other) {
            return "[Circular Reference]" + other;
          } else {
            refs.set(value, path.join("."));
          }
          if (c4 === "Array") {
            if (value.length > 20) {
              val = value.slice(value.length - 20);
            } else
              val = value;
          } else if (c4.includes("Set")) {
            val = Array.from(value);
          } else if (c4 !== "Object" && c4 !== "Number" && c4 !== "String" && c4 !== "Boolean") {
            val = "instanceof_" + c4;
          } else if (c4 === "Object") {
            let obj = {};
            for (const prop in value) {
              if (value[prop] == null) {
                obj[prop] = value[prop];
              } else if (Array.isArray(value[prop])) {
                if (value[prop].length > 20)
                  obj[prop] = value[prop].slice(value[prop].length - 20);
                else
                  obj[prop] = value[prop];
              } else if (value[prop].constructor.name === "Object") {
                obj[prop] = {};
                for (const p3 in value[prop]) {
                  if (Array.isArray(value[prop][p3])) {
                    if (value[prop][p3].length > 20)
                      obj[prop][p3] = value[prop][p3].slice(value[prop][p3].length - 20);
                    else
                      obj[prop][p3] = value[prop][p3];
                  } else {
                    if (value[prop][p3] != null) {
                      let con = value[prop][p3].constructor.name;
                      if (con.includes("Set")) {
                        obj[prop][p3] = Array.from(value[prop][p3]);
                      } else if (con !== "Number" && con !== "String" && con !== "Boolean") {
                        obj[prop][p3] = "instanceof_" + con;
                      } else {
                        obj[prop][p3] = value[prop][p3];
                      }
                    } else {
                      obj[prop][p3] = value[prop][p3];
                    }
                  }
                }
              } else {
                let con = value[prop].constructor.name;
                if (con.includes("Set")) {
                  obj[prop] = Array.from(value[prop]);
                } else if (con !== "Number" && con !== "String" && con !== "Boolean") {
                  obj[prop] = "instanceof_" + con;
                } else {
                  obj[prop] = value[prop];
                }
              }
            }
            val = obj;
          } else {
            val = value;
          }
        } else {
          val = value;
        }
      }
      return val;
    }
    return function stringifyFast2(obj, space) {
      parents.push(obj);
      let res = JSON.stringify(obj, checkValues, space);
      clear();
      return res;
    };
  }();
  if (JSON.stringifyFast === void 0) {
    JSON.stringifyFast = stringifyFast;
  }
  function createNode(operator, parentNode, props, graph) {
    if (typeof props === "object") {
      props.operator = operator;
      return new GraphNode(props, parentNode, graph);
    }
    return new GraphNode({ operator }, parentNode, graph);
  }

  // examples/editor/App.ts
  var App2 = class {
    constructor(tree) {
      this.init = async () => {
        await this.compile();
        await this.start();
      };
      this.set = (tree) => {
        this.tree = tree;
      };
      this.start = async () => {
        this.graph = new Graph(this.tree, "graph");
        for (let key in this.graph.tree) {
          const nodeInfo = this.graph.tree[key];
          const node = this.graph.nodes.get(nodeInfo.tag);
          if (node.loop)
            node.loop = parseFloat(node.loop);
          node.run();
        }
        if (this.onstart instanceof Function)
          this.onstart();
      };
      this.compile = async () => {
        if (this.import)
          console.warn("Recompiling the application...");
        if (this.graph)
          this.graph.nodes.forEach(this.graph.removeTree);
        this.graph = null;
        if (this.oncompile instanceof Function)
          this.tree = await this.oncompile();
      };
      this.save = async () => {
        if (this.onsave instanceof Function)
          await this.onsave();
        await this.init();
      };
      this.onsave = null;
      this.oncompile = null;
      this.onstart = null;
      this.set(tree);
      this.graph = null;
      this.import = null;
      this.animated = {};
    }
  };

  // examples/editor/node_modules/@lit/reactive-element/css-tag.js
  var t5 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var e8 = Symbol();
  var n8 = /* @__PURE__ */ new Map();
  var s6 = class {
    constructor(t7, n12) {
      if (this._$cssResult$ = true, n12 !== e8)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7;
    }
    get styleSheet() {
      let e11 = n8.get(this.cssText);
      return t5 && e11 === void 0 && (n8.set(this.cssText, e11 = new CSSStyleSheet()), e11.replaceSync(this.cssText)), e11;
    }
    toString() {
      return this.cssText;
    }
  };
  var o8 = (t7) => new s6(typeof t7 == "string" ? t7 : t7 + "", e8);
  var r7 = (t7, ...n12) => {
    const o12 = t7.length === 1 ? t7[0] : n12.reduce((e11, n13, s10) => e11 + ((t8) => {
      if (t8._$cssResult$ === true)
        return t8.cssText;
      if (typeof t8 == "number")
        return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(n13) + t7[s10 + 1], t7[0]);
    return new s6(o12, e8);
  };
  var i7 = (e11, n12) => {
    t5 ? e11.adoptedStyleSheets = n12.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet) : n12.forEach((t7) => {
      const n13 = document.createElement("style"), s10 = window.litNonce;
      s10 !== void 0 && n13.setAttribute("nonce", s10), n13.textContent = t7.cssText, e11.appendChild(n13);
    });
  };
  var S3 = t5 ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e11 = "";
    for (const n12 of t8.cssRules)
      e11 += n12.cssText;
    return o8(e11);
  })(t7) : t7;

  // examples/editor/node_modules/@lit/reactive-element/reactive-element.js
  var s7;
  var e9 = window.trustedTypes;
  var r8 = e9 ? e9.emptyScript : "";
  var h6 = window.reactiveElementPolyfillSupport;
  var o9 = { toAttribute(t7, i9) {
    switch (i9) {
      case Boolean:
        t7 = t7 ? r8 : null;
        break;
      case Object:
      case Array:
        t7 = t7 == null ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, i9) {
    let s10 = t7;
    switch (i9) {
      case Boolean:
        s10 = t7 !== null;
        break;
      case Number:
        s10 = t7 === null ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          s10 = JSON.parse(t7);
        } catch (t8) {
          s10 = null;
        }
    }
    return s10;
  } };
  var n9 = (t7, i9) => i9 !== t7 && (i9 == i9 || t7 == t7);
  var l6 = { attribute: true, type: String, converter: o9, reflect: false, hasChanged: n9 };
  var a3 = class extends HTMLElement {
    constructor() {
      super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
    }
    static addInitializer(t7) {
      var i9;
      (i9 = this.l) !== null && i9 !== void 0 || (this.l = []), this.l.push(t7);
    }
    static get observedAttributes() {
      this.finalize();
      const t7 = [];
      return this.elementProperties.forEach((i9, s10) => {
        const e11 = this._$Eh(s10, i9);
        e11 !== void 0 && (this._$Eu.set(e11, s10), t7.push(e11));
      }), t7;
    }
    static createProperty(t7, i9 = l6) {
      if (i9.state && (i9.attribute = false), this.finalize(), this.elementProperties.set(t7, i9), !i9.noAccessor && !this.prototype.hasOwnProperty(t7)) {
        const s10 = typeof t7 == "symbol" ? Symbol() : "__" + t7, e11 = this.getPropertyDescriptor(t7, s10, i9);
        e11 !== void 0 && Object.defineProperty(this.prototype, t7, e11);
      }
    }
    static getPropertyDescriptor(t7, i9, s10) {
      return { get() {
        return this[i9];
      }, set(e11) {
        const r10 = this[t7];
        this[i9] = e11, this.requestUpdate(t7, r10, s10);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) || l6;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t7 = Object.getPrototypeOf(this);
      if (t7.finalize(), this.elementProperties = new Map(t7.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t8 = this.properties, i9 = [...Object.getOwnPropertyNames(t8), ...Object.getOwnPropertySymbols(t8)];
        for (const s10 of i9)
          this.createProperty(s10, t8[s10]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i9) {
      const s10 = [];
      if (Array.isArray(i9)) {
        const e11 = new Set(i9.flat(1 / 0).reverse());
        for (const i10 of e11)
          s10.unshift(S3(i10));
      } else
        i9 !== void 0 && s10.push(S3(i9));
      return s10;
    }
    static _$Eh(t7, i9) {
      const s10 = i9.attribute;
      return s10 === false ? void 0 : typeof s10 == "string" ? s10 : typeof t7 == "string" ? t7.toLowerCase() : void 0;
    }
    o() {
      var t7;
      this._$Ep = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t7 = this.constructor.l) === null || t7 === void 0 || t7.forEach((t8) => t8(this));
    }
    addController(t7) {
      var i9, s10;
      ((i9 = this._$Eg) !== null && i9 !== void 0 ? i9 : this._$Eg = []).push(t7), this.renderRoot !== void 0 && this.isConnected && ((s10 = t7.hostConnected) === null || s10 === void 0 || s10.call(t7));
    }
    removeController(t7) {
      var i9;
      (i9 = this._$Eg) === null || i9 === void 0 || i9.splice(this._$Eg.indexOf(t7) >>> 0, 1);
    }
    _$Em() {
      this.constructor.elementProperties.forEach((t7, i9) => {
        this.hasOwnProperty(i9) && (this._$Et.set(i9, this[i9]), delete this[i9]);
      });
    }
    createRenderRoot() {
      var t7;
      const s10 = (t7 = this.shadowRoot) !== null && t7 !== void 0 ? t7 : this.attachShadow(this.constructor.shadowRootOptions);
      return i7(s10, this.constructor.elementStyles), s10;
    }
    connectedCallback() {
      var t7;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t7 = this._$Eg) === null || t7 === void 0 || t7.forEach((t8) => {
        var i9;
        return (i9 = t8.hostConnected) === null || i9 === void 0 ? void 0 : i9.call(t8);
      });
    }
    enableUpdating(t7) {
    }
    disconnectedCallback() {
      var t7;
      (t7 = this._$Eg) === null || t7 === void 0 || t7.forEach((t8) => {
        var i9;
        return (i9 = t8.hostDisconnected) === null || i9 === void 0 ? void 0 : i9.call(t8);
      });
    }
    attributeChangedCallback(t7, i9, s10) {
      this._$AK(t7, s10);
    }
    _$ES(t7, i9, s10 = l6) {
      var e11, r10;
      const h8 = this.constructor._$Eh(t7, s10);
      if (h8 !== void 0 && s10.reflect === true) {
        const n12 = ((r10 = (e11 = s10.converter) === null || e11 === void 0 ? void 0 : e11.toAttribute) !== null && r10 !== void 0 ? r10 : o9.toAttribute)(i9, s10.type);
        this._$Ei = t7, n12 == null ? this.removeAttribute(h8) : this.setAttribute(h8, n12), this._$Ei = null;
      }
    }
    _$AK(t7, i9) {
      var s10, e11, r10;
      const h8 = this.constructor, n12 = h8._$Eu.get(t7);
      if (n12 !== void 0 && this._$Ei !== n12) {
        const t8 = h8.getPropertyOptions(n12), l9 = t8.converter, a5 = (r10 = (e11 = (s10 = l9) === null || s10 === void 0 ? void 0 : s10.fromAttribute) !== null && e11 !== void 0 ? e11 : typeof l9 == "function" ? l9 : null) !== null && r10 !== void 0 ? r10 : o9.fromAttribute;
        this._$Ei = n12, this[n12] = a5(i9, t8.type), this._$Ei = null;
      }
    }
    requestUpdate(t7, i9, s10) {
      let e11 = true;
      t7 !== void 0 && (((s10 = s10 || this.constructor.getPropertyOptions(t7)).hasChanged || n9)(this[t7], i9) ? (this._$AL.has(t7) || this._$AL.set(t7, i9), s10.reflect === true && this._$Ei !== t7 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t7, s10))) : e11 = false), !this.isUpdatePending && e11 && (this._$Ep = this._$E_());
    }
    async _$E_() {
      this.isUpdatePending = true;
      try {
        await this._$Ep;
      } catch (t8) {
        Promise.reject(t8);
      }
      const t7 = this.scheduleUpdate();
      return t7 != null && await t7, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t7;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Et && (this._$Et.forEach((t8, i10) => this[i10] = t8), this._$Et = void 0);
      let i9 = false;
      const s10 = this._$AL;
      try {
        i9 = this.shouldUpdate(s10), i9 ? (this.willUpdate(s10), (t7 = this._$Eg) === null || t7 === void 0 || t7.forEach((t8) => {
          var i10;
          return (i10 = t8.hostUpdate) === null || i10 === void 0 ? void 0 : i10.call(t8);
        }), this.update(s10)) : this._$EU();
      } catch (t8) {
        throw i9 = false, this._$EU(), t8;
      }
      i9 && this._$AE(s10);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      var i9;
      (i9 = this._$Eg) === null || i9 === void 0 || i9.forEach((t8) => {
        var i10;
        return (i10 = t8.hostUpdated) === null || i10 === void 0 ? void 0 : i10.call(t8);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$Ep;
    }
    shouldUpdate(t7) {
      return true;
    }
    update(t7) {
      this._$EC !== void 0 && (this._$EC.forEach((t8, i9) => this._$ES(i9, this[i9], t8)), this._$EC = void 0), this._$EU();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  a3.finalized = true, a3.elementProperties = /* @__PURE__ */ new Map(), a3.elementStyles = [], a3.shadowRootOptions = { mode: "open" }, h6 == null || h6({ ReactiveElement: a3 }), ((s7 = globalThis.reactiveElementVersions) !== null && s7 !== void 0 ? s7 : globalThis.reactiveElementVersions = []).push("1.3.2");

  // examples/editor/node_modules/lit-html/lit-html.js
  var t6;
  var i8 = globalThis.trustedTypes;
  var s8 = i8 ? i8.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var e10 = `lit$${(Math.random() + "").slice(9)}$`;
  var o10 = "?" + e10;
  var n10 = `<${o10}>`;
  var l7 = document;
  var h7 = (t7 = "") => l7.createComment(t7);
  var r9 = (t7) => t7 === null || typeof t7 != "object" && typeof t7 != "function";
  var d3 = Array.isArray;
  var u2 = (t7) => {
    var i9;
    return d3(t7) || typeof ((i9 = t7) === null || i9 === void 0 ? void 0 : i9[Symbol.iterator]) == "function";
  };
  var c3 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v2 = /-->/g;
  var a4 = />/g;
  var f2 = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
  var _2 = /'/g;
  var m2 = /"/g;
  var g2 = /^(?:script|style|textarea|title)$/i;
  var p2 = (t7) => (i9, ...s10) => ({ _$litType$: t7, strings: i9, values: s10 });
  var $2 = p2(1);
  var y2 = p2(2);
  var b2 = Symbol.for("lit-noChange");
  var w2 = Symbol.for("lit-nothing");
  var T2 = /* @__PURE__ */ new WeakMap();
  var x2 = (t7, i9, s10) => {
    var e11, o12;
    const n12 = (e11 = s10 == null ? void 0 : s10.renderBefore) !== null && e11 !== void 0 ? e11 : i9;
    let l9 = n12._$litPart$;
    if (l9 === void 0) {
      const t8 = (o12 = s10 == null ? void 0 : s10.renderBefore) !== null && o12 !== void 0 ? o12 : null;
      n12._$litPart$ = l9 = new N2(i9.insertBefore(h7(), t8), t8, void 0, s10 != null ? s10 : {});
    }
    return l9._$AI(t7), l9;
  };
  var A2 = l7.createTreeWalker(l7, 129, null, false);
  var C2 = (t7, i9) => {
    const o12 = t7.length - 1, l9 = [];
    let h8, r10 = i9 === 2 ? "<svg>" : "", d4 = c3;
    for (let i10 = 0; i10 < o12; i10++) {
      const s10 = t7[i10];
      let o13, u4, p3 = -1, $3 = 0;
      for (; $3 < s10.length && (d4.lastIndex = $3, u4 = d4.exec(s10), u4 !== null); )
        $3 = d4.lastIndex, d4 === c3 ? u4[1] === "!--" ? d4 = v2 : u4[1] !== void 0 ? d4 = a4 : u4[2] !== void 0 ? (g2.test(u4[2]) && (h8 = RegExp("</" + u4[2], "g")), d4 = f2) : u4[3] !== void 0 && (d4 = f2) : d4 === f2 ? u4[0] === ">" ? (d4 = h8 != null ? h8 : c3, p3 = -1) : u4[1] === void 0 ? p3 = -2 : (p3 = d4.lastIndex - u4[2].length, o13 = u4[1], d4 = u4[3] === void 0 ? f2 : u4[3] === '"' ? m2 : _2) : d4 === m2 || d4 === _2 ? d4 = f2 : d4 === v2 || d4 === a4 ? d4 = c3 : (d4 = f2, h8 = void 0);
      const y3 = d4 === f2 && t7[i10 + 1].startsWith("/>") ? " " : "";
      r10 += d4 === c3 ? s10 + n10 : p3 >= 0 ? (l9.push(o13), s10.slice(0, p3) + "$lit$" + s10.slice(p3) + e10 + y3) : s10 + e10 + (p3 === -2 ? (l9.push(void 0), i10) : y3);
    }
    const u3 = r10 + (t7[o12] || "<?>") + (i9 === 2 ? "</svg>" : "");
    if (!Array.isArray(t7) || !t7.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [s8 !== void 0 ? s8.createHTML(u3) : u3, l9];
  };
  var E2 = class {
    constructor({ strings: t7, _$litType$: s10 }, n12) {
      let l9;
      this.parts = [];
      let r10 = 0, d4 = 0;
      const u3 = t7.length - 1, c4 = this.parts, [v3, a5] = C2(t7, s10);
      if (this.el = E2.createElement(v3, n12), A2.currentNode = this.el.content, s10 === 2) {
        const t8 = this.el.content, i9 = t8.firstChild;
        i9.remove(), t8.append(...i9.childNodes);
      }
      for (; (l9 = A2.nextNode()) !== null && c4.length < u3; ) {
        if (l9.nodeType === 1) {
          if (l9.hasAttributes()) {
            const t8 = [];
            for (const i9 of l9.getAttributeNames())
              if (i9.endsWith("$lit$") || i9.startsWith(e10)) {
                const s11 = a5[d4++];
                if (t8.push(i9), s11 !== void 0) {
                  const t9 = l9.getAttribute(s11.toLowerCase() + "$lit$").split(e10), i10 = /([.?@])?(.*)/.exec(s11);
                  c4.push({ type: 1, index: r10, name: i10[2], strings: t9, ctor: i10[1] === "." ? M2 : i10[1] === "?" ? H2 : i10[1] === "@" ? I2 : S4 });
                } else
                  c4.push({ type: 6, index: r10 });
              }
            for (const i9 of t8)
              l9.removeAttribute(i9);
          }
          if (g2.test(l9.tagName)) {
            const t8 = l9.textContent.split(e10), s11 = t8.length - 1;
            if (s11 > 0) {
              l9.textContent = i8 ? i8.emptyScript : "";
              for (let i9 = 0; i9 < s11; i9++)
                l9.append(t8[i9], h7()), A2.nextNode(), c4.push({ type: 2, index: ++r10 });
              l9.append(t8[s11], h7());
            }
          }
        } else if (l9.nodeType === 8)
          if (l9.data === o10)
            c4.push({ type: 2, index: r10 });
          else {
            let t8 = -1;
            for (; (t8 = l9.data.indexOf(e10, t8 + 1)) !== -1; )
              c4.push({ type: 7, index: r10 }), t8 += e10.length - 1;
          }
        r10++;
      }
    }
    static createElement(t7, i9) {
      const s10 = l7.createElement("template");
      return s10.innerHTML = t7, s10;
    }
  };
  function P2(t7, i9, s10 = t7, e11) {
    var o12, n12, l9, h8;
    if (i9 === b2)
      return i9;
    let d4 = e11 !== void 0 ? (o12 = s10._$Cl) === null || o12 === void 0 ? void 0 : o12[e11] : s10._$Cu;
    const u3 = r9(i9) ? void 0 : i9._$litDirective$;
    return (d4 == null ? void 0 : d4.constructor) !== u3 && ((n12 = d4 == null ? void 0 : d4._$AO) === null || n12 === void 0 || n12.call(d4, false), u3 === void 0 ? d4 = void 0 : (d4 = new u3(t7), d4._$AT(t7, s10, e11)), e11 !== void 0 ? ((l9 = (h8 = s10)._$Cl) !== null && l9 !== void 0 ? l9 : h8._$Cl = [])[e11] = d4 : s10._$Cu = d4), d4 !== void 0 && (i9 = P2(t7, d4._$AS(t7, i9.values), d4, e11)), i9;
  }
  var V2 = class {
    constructor(t7, i9) {
      this.v = [], this._$AN = void 0, this._$AD = t7, this._$AM = i9;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    p(t7) {
      var i9;
      const { el: { content: s10 }, parts: e11 } = this._$AD, o12 = ((i9 = t7 == null ? void 0 : t7.creationScope) !== null && i9 !== void 0 ? i9 : l7).importNode(s10, true);
      A2.currentNode = o12;
      let n12 = A2.nextNode(), h8 = 0, r10 = 0, d4 = e11[0];
      for (; d4 !== void 0; ) {
        if (h8 === d4.index) {
          let i10;
          d4.type === 2 ? i10 = new N2(n12, n12.nextSibling, this, t7) : d4.type === 1 ? i10 = new d4.ctor(n12, d4.name, d4.strings, this, t7) : d4.type === 6 && (i10 = new L2(n12, this, t7)), this.v.push(i10), d4 = e11[++r10];
        }
        h8 !== (d4 == null ? void 0 : d4.index) && (n12 = A2.nextNode(), h8++);
      }
      return o12;
    }
    m(t7) {
      let i9 = 0;
      for (const s10 of this.v)
        s10 !== void 0 && (s10.strings !== void 0 ? (s10._$AI(t7, s10, i9), i9 += s10.strings.length - 2) : s10._$AI(t7[i9])), i9++;
    }
  };
  var N2 = class {
    constructor(t7, i9, s10, e11) {
      var o12;
      this.type = 2, this._$AH = w2, this._$AN = void 0, this._$AA = t7, this._$AB = i9, this._$AM = s10, this.options = e11, this._$Cg = (o12 = e11 == null ? void 0 : e11.isConnected) === null || o12 === void 0 || o12;
    }
    get _$AU() {
      var t7, i9;
      return (i9 = (t7 = this._$AM) === null || t7 === void 0 ? void 0 : t7._$AU) !== null && i9 !== void 0 ? i9 : this._$Cg;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i9 = this._$AM;
      return i9 !== void 0 && t7.nodeType === 11 && (t7 = i9.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i9 = this) {
      t7 = P2(this, t7, i9), r9(t7) ? t7 === w2 || t7 == null || t7 === "" ? (this._$AH !== w2 && this._$AR(), this._$AH = w2) : t7 !== this._$AH && t7 !== b2 && this.$(t7) : t7._$litType$ !== void 0 ? this.T(t7) : t7.nodeType !== void 0 ? this.k(t7) : u2(t7) ? this.S(t7) : this.$(t7);
    }
    M(t7, i9 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t7, i9);
    }
    k(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.M(t7));
    }
    $(t7) {
      this._$AH !== w2 && r9(this._$AH) ? this._$AA.nextSibling.data = t7 : this.k(l7.createTextNode(t7)), this._$AH = t7;
    }
    T(t7) {
      var i9;
      const { values: s10, _$litType$: e11 } = t7, o12 = typeof e11 == "number" ? this._$AC(t7) : (e11.el === void 0 && (e11.el = E2.createElement(e11.h, this.options)), e11);
      if (((i9 = this._$AH) === null || i9 === void 0 ? void 0 : i9._$AD) === o12)
        this._$AH.m(s10);
      else {
        const t8 = new V2(o12, this), i10 = t8.p(this.options);
        t8.m(s10), this.k(i10), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i9 = T2.get(t7.strings);
      return i9 === void 0 && T2.set(t7.strings, i9 = new E2(t7)), i9;
    }
    S(t7) {
      d3(this._$AH) || (this._$AH = [], this._$AR());
      const i9 = this._$AH;
      let s10, e11 = 0;
      for (const o12 of t7)
        e11 === i9.length ? i9.push(s10 = new N2(this.M(h7()), this.M(h7()), this, this.options)) : s10 = i9[e11], s10._$AI(o12), e11++;
      e11 < i9.length && (this._$AR(s10 && s10._$AB.nextSibling, e11), i9.length = e11);
    }
    _$AR(t7 = this._$AA.nextSibling, i9) {
      var s10;
      for ((s10 = this._$AP) === null || s10 === void 0 || s10.call(this, false, true, i9); t7 && t7 !== this._$AB; ) {
        const i10 = t7.nextSibling;
        t7.remove(), t7 = i10;
      }
    }
    setConnected(t7) {
      var i9;
      this._$AM === void 0 && (this._$Cg = t7, (i9 = this._$AP) === null || i9 === void 0 || i9.call(this, t7));
    }
  };
  var S4 = class {
    constructor(t7, i9, s10, e11, o12) {
      this.type = 1, this._$AH = w2, this._$AN = void 0, this.element = t7, this.name = i9, this._$AM = e11, this.options = o12, s10.length > 2 || s10[0] !== "" || s10[1] !== "" ? (this._$AH = Array(s10.length - 1).fill(new String()), this.strings = s10) : this._$AH = w2;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7, i9 = this, s10, e11) {
      const o12 = this.strings;
      let n12 = false;
      if (o12 === void 0)
        t7 = P2(this, t7, i9, 0), n12 = !r9(t7) || t7 !== this._$AH && t7 !== b2, n12 && (this._$AH = t7);
      else {
        const e12 = t7;
        let l9, h8;
        for (t7 = o12[0], l9 = 0; l9 < o12.length - 1; l9++)
          h8 = P2(this, e12[s10 + l9], i9, l9), h8 === b2 && (h8 = this._$AH[l9]), n12 || (n12 = !r9(h8) || h8 !== this._$AH[l9]), h8 === w2 ? t7 = w2 : t7 !== w2 && (t7 += (h8 != null ? h8 : "") + o12[l9 + 1]), this._$AH[l9] = h8;
      }
      n12 && !e11 && this.C(t7);
    }
    C(t7) {
      t7 === w2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 != null ? t7 : "");
    }
  };
  var M2 = class extends S4 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    C(t7) {
      this.element[this.name] = t7 === w2 ? void 0 : t7;
    }
  };
  var k2 = i8 ? i8.emptyScript : "";
  var H2 = class extends S4 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    C(t7) {
      t7 && t7 !== w2 ? this.element.setAttribute(this.name, k2) : this.element.removeAttribute(this.name);
    }
  };
  var I2 = class extends S4 {
    constructor(t7, i9, s10, e11, o12) {
      super(t7, i9, s10, e11, o12), this.type = 5;
    }
    _$AI(t7, i9 = this) {
      var s10;
      if ((t7 = (s10 = P2(this, t7, i9, 0)) !== null && s10 !== void 0 ? s10 : w2) === b2)
        return;
      const e11 = this._$AH, o12 = t7 === w2 && e11 !== w2 || t7.capture !== e11.capture || t7.once !== e11.once || t7.passive !== e11.passive, n12 = t7 !== w2 && (e11 === w2 || o12);
      o12 && this.element.removeEventListener(this.name, this, e11), n12 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      var i9, s10;
      typeof this._$AH == "function" ? this._$AH.call((s10 = (i9 = this.options) === null || i9 === void 0 ? void 0 : i9.host) !== null && s10 !== void 0 ? s10 : this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var L2 = class {
    constructor(t7, i9, s10) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i9, this.options = s10;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      P2(this, t7);
    }
  };
  var z2 = window.litHtmlPolyfillSupport;
  z2 == null || z2(E2, N2), ((t6 = globalThis.litHtmlVersions) !== null && t6 !== void 0 ? t6 : globalThis.litHtmlVersions = []).push("2.2.5");

  // examples/editor/node_modules/lit-element/lit-element.js
  var l8;
  var o11;
  var s9 = class extends a3 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
    }
    createRenderRoot() {
      var t7, e11;
      const i9 = super.createRenderRoot();
      return (t7 = (e11 = this.renderOptions).renderBefore) !== null && t7 !== void 0 || (e11.renderBefore = i9.firstChild), i9;
    }
    update(t7) {
      const i9 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Dt = x2(i9, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t7;
      super.connectedCallback(), (t7 = this._$Dt) === null || t7 === void 0 || t7.setConnected(true);
    }
    disconnectedCallback() {
      var t7;
      super.disconnectedCallback(), (t7 = this._$Dt) === null || t7 === void 0 || t7.setConnected(false);
    }
    render() {
      return b2;
    }
  };
  s9.finalized = true, s9._$litElement$ = true, (l8 = globalThis.litElementHydrateSupport) === null || l8 === void 0 || l8.call(globalThis, { LitElement: s9 });
  var n11 = globalThis.litElementPolyfillSupport;
  n11 == null || n11({ LitElement: s9 });
  ((o11 = globalThis.litElementVersions) !== null && o11 !== void 0 ? o11 : globalThis.litElementVersions = []).push("3.2.0");

  // examples/editor/components/Plugin.ts
  var Plugin = class extends s9 {
    constructor(props = {}) {
      super();
      this.module = {};
      this.metadata = {};
      this.set = (imported, metadata) => {
        this.module = imported;
        this.metadata = metadata;
      };
    }
    static get styles() {
      return r7`

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
      height: 100%;
      width: 100%;
    }

    img {
      max-height: 100px;
    }

    .header {
      padding: 10px 20px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      font-size: 70%;
      border-bottom: 1px solid #e3e3e3;
    }

    .header span {
      font-weight: 800;
      font-size: 120%;
    }

    .container {
      width: 100%;
      padding: 10px;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      overflow: scroll;
      height: 100%;
    }

    .separate {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .attribute {
      width: 100%;
      font-size: 90%;
      padding: 15px;
      flex-grow: 1;
      flex-wrap: wrap;
    }

    .info {
      display: flex;
      align-items: center;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    @media (prefers-color-scheme: dark) {
      :host > * {
        background-color: rgb(40, 40, 40);
        box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
      }

      .header {
        border-bottom: 1px solid gray;
      }
    }

    `;
    }
    static get properties() {
      return {
        metadata: {
          type: Object,
          reflect: true
        }
      };
    }
    render() {
      const operator = this.module.operator ?? this.module.looper ?? this.module.animation;
      return $2`
        <div>
          <div class="header separate">
            <span>${this.metadata.name ?? "Tag"}</span>
          </div>
          <div class="container">
            <h4>Author</h4>
            <p>${this.metadata.author}</p>

            <h4>Description</h4>
            <p>${this.metadata.description}</p>

            ${operator ? $2`
              <h4>Operator Arguments</h4> 
              ${getFnParamNames(operator).map((str) => $2`<p>${str}</p>`)}
              ` : ""}
          </div>
        </div>
      `;
    }
  };
  customElements.define("visualscript-plugin", Plugin);

  // examples/editor/Plugins.ts
  var Plugins = class {
    constructor(source = "https://raw.githubusercontent.com/brainsatplay/awesome-brainsatplay/main/plugins.js") {
      this.readyState = false;
      this.list = /* @__PURE__ */ new Set();
      this.init = async () => {
        if (!this.filesystem) {
          this.filesystem = new LocalSystem("plugins", {
            ignore: ["DS_Store"]
          });
          await this.filesystem.init();
          const file2 = await this.filesystem.open(this.source);
          const plugins = await file2.body;
          for (let key in plugins) {
            this.list.add(key);
            const path = plugins[key];
            this.plugins[key] = { path };
          }
        } else {
          this.filesystem.files.list.forEach((f3) => {
            this.list.add(f3.path);
            this.plugins[f3.path] = {
              path: f3.path,
              module: f3
            };
          });
          const metadata = await this.metadata(`index.js`);
          console.log("metadata", metadata);
        }
        this.readyState = true;
      };
      this.get = async (url) => {
        return await this.filesystem.open(url);
      };
      this.metadata = async (name2) => {
        const path = this.plugins[name2].path ?? name2;
        const splitPath = path.split("/").slice(0, -1);
        splitPath.push(".brainsatplay/metadata.js");
        this.plugins[name2].metadata = this.plugins[name2].metadata ?? await this.get(splitPath.join("/"));
        return await this.plugins[name2].metadata.body;
      };
      this.module = async (name2) => {
        const path = this.plugins[name2].path ?? name2;
        this.plugins[name2].module = this.plugins[name2].module ?? await this.get(path);
        return await this.plugins[name2].module.body;
      };
      if (typeof source === "string")
        this.source = source;
      else {
        this.source = source.name;
        this.filesystem = source;
      }
      this.plugins = {};
    }
  };

  // examples/editor/components/Editor.ts
  var Editor = class extends s9 {
    constructor(props = {}) {
      super();
      this.ui = document.createElement("visualscript-tab");
      this.files = new TabContainer();
      this.info = new TabContainer();
      this.fileHistory = {};
      this.fileUpdate = 0;
      this.graph = new GraphEditor();
      this.properties = new ObjectEditor();
      this.tree = new Tree();
      this.setApp = (app2) => {
        this.app = app2;
        this.graph.set(this.app);
      };
      this.setUI = (ui) => {
        this.ui.innerHTML = "";
        this.ui.appendChild(ui);
      };
      this.setSystem = async (system) => {
        this.filesystem = system;
        this.tree.set(system.files.system);
        const files = Array.from(system.files.list.values());
        this.plugins = new Plugins(this.filesystem);
        await this.plugins.init();
        const previousTabs = new Set(Object.keys(this.fileHistory));
        const allProperties = {};
        const importedFileInfo = {};
        const importedFileMetadata = {};
        await Promise.all(files.map(async (f3) => {
          importedFileInfo[f3.path] = await this.plugins.module(f3.path);
          importedFileMetadata[f3.path] = await this.plugins.metadata(f3.path);
          allProperties[importedFileMetadata[f3.path].name] = importedFileInfo[f3.path];
        }));
        const openTabs = {};
        this.tree.onClick = async (key, f3) => {
          if (!openTabs[f3.path]) {
            const metadata = importedFileMetadata[f3.path];
            const imported = importedFileInfo[f3.path];
            let tabInfo = this.fileHistory[f3.path];
            const plugin = this.plugins.plugins[f3.path];
            previousTabs.delete(f3.path);
            if (!tabInfo) {
              const tab = new Tab();
              tabInfo = { tab };
              tab.name = `${f3.path}`;
              let container = new TabContainer();
              const codeTab = new Tab({ name: "Code" });
              if (plugin.module) {
                const infoTab = new Tab({ name: "Info" });
                tabInfo.plugin = new Plugin();
                infoTab.appendChild(tabInfo.plugin);
                container.addTab(infoTab);
                const objectTab = new Tab({ name: "Properties" });
                tabInfo.object = new ObjectEditor();
                objectTab.appendChild(tabInfo.object);
                container.addTab(objectTab);
              }
              tabInfo.code = new CodeEditor();
              codeTab.appendChild(tabInfo.code);
              container.addTab(codeTab);
              tab.appendChild(container);
              this.files.addTab(tab);
              this.fileHistory[f3.path] = tabInfo;
            }
            if (tabInfo.plugin)
              tabInfo.plugin.set(imported, metadata);
            if (tabInfo.object) {
              tabInfo.object.set(imported);
              tabInfo.object.header = metadata.name;
            }
            const fileText = await f3.text;
            tabInfo.code.value = fileText;
            tabInfo.code.onInput = (ev) => f3.text = ev.target.value, tabInfo.code.onSave = async () => {
              await f3.save();
              await this.app.init();
            };
          }
          openTabs[f3.path] = true;
        };
        this.properties.set(allProperties);
        previousTabs.forEach((str) => {
          const info = this.fileHistory[str];
          info.tab.remove();
          delete this.fileHistory[str];
        });
        this.fileUpdate = this.fileUpdate + 1;
      };
      this.ui.setAttribute("name", "UI");
      if (props.app)
        this.setApp(props.app);
      if (props.ui)
        this.setUI(props.ui);
      if (props.filesystem)
        this.setSystem(props.filesystem);
    }
    static get styles() {
      return r7`

    :host { 
      width: 100%;
      height: 100%;
      overflow: scroll;
      display: flex;
    }

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      flex-grow: 1;
    }

    #files {
      display: flex;
      height: 100%;
    }

    #files > visualscript-tree {
      width: 200px;
    }


    `;
    }
    static get properties() {
      return {
        fileUpdate: {
          type: Number,
          reflect: true
        }
      };
    }
    render() {
      return $2`
          ${this.ui}
          <visualscript-tab-container>
            <visualscript-tab name="Properties">
              ${this.properties}
            </visualscript-tab>
              <visualscript-tab name="Graph">
               ${this.graph}
              </visualscript-tab>
              <visualscript-tab name="Files">
              <div id="files">
                ${this.tree}
                ${this.files}
                </div>
              </visualscript-tab>
          </visualscript-tab-container>
      `;
    }
  };
  customElements.define("visualscript-editor", Editor);

  // examples/editor/index.js
  var systems = {};
  var createSystem = async (input) => {
    let system = new LocalSystem(input, {
      debug: true,
      ignore: ["DS_Store"]
    });
    await system.init();
    systems[system.name] = system;
    console.log(`----------------------- New System (${system.name}) -----------------------`);
    return system;
  };
  var appPath = "https://raw.githubusercontent.com/brainsatplay/brainsatplay-starter-kit/main/app/index.js";
  var nav = document.querySelector("visualscript-nav");
  var editor = document.querySelector("visualscript-editor");
  nav.primary = { options: [
    {
      "content": "Select Project",
      "id": "select",
      "type": "button",
      onClick: async () => {
        const system = await createSystem();
        startApp(system);
      }
    }
  ] };
  var app = new App2();
  editor.setApp(app);
  createSystem(appPath).then((system) => startApp(system)).catch((e11) => console.error("Remote app not available", e11));
  document.onkeydown = async (e11) => {
    if (e11.metaKey && e11.code == "KeyS") {
      e11.preventDefault();
      app.save();
    }
  };
  var startApp = (system) => {
    console.log(`File System Selected (${system.name})`, system.files);
    app.onsave = async () => {
      await system.save();
    };
    app.oncompile = async () => {
      const file2 = system.files.list.get("index.js");
      if (file2) {
        editor.setSystem(system);
        const imported = await file2.body;
        return imported;
      } else
        console.error("Not a valid Brains@Play project...");
    };
    app.onstart = () => {
      const ui = new TimeSeries();
      editor.setUI(ui);
      app.graph.nodes.forEach((n12) => {
        if (n12.tag === "sine")
          n12.subscribe((data) => {
            ui.data = [data];
            ui.draw();
          });
      });
    };
    app.init();
  };
})();
/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
