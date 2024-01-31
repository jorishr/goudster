/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js":
/*!******************************************************************!*\
  !*** ./node_modules/@googlemaps/js-api-loader/dist/index.esm.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_ID: () => (/* binding */ DEFAULT_ID),
/* harmony export */   Loader: () => (/* binding */ Loader),
/* harmony export */   LoaderStatus: () => (/* binding */ LoaderStatus)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// do not edit .js files directly - edit src/index.jst



var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ID = "__googleMapsScriptId";
/**
 * The status of the [[Loader]].
 */
var LoaderStatus;
(function (LoaderStatus) {
    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */
class Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version, }) {
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.apiKey = apiKey;
        this.authReferrerPolicy = authReferrerPolicy;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.language = language;
        this.libraries = libraries;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.region = region;
        this.retries = retries;
        this.url = url;
        this.version = version;
        if (Loader.instance) {
            if (!fastDeepEqual(this.options, Loader.instance.options)) {
                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
            }
            return Loader.instance;
        }
        Loader.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
            authReferrerPolicy: this.authReferrerPolicy,
        };
    }
    get status() {
        if (this.errors.length) {
            return LoaderStatus.FAILURE;
        }
        if (this.done) {
            return LoaderStatus.SUCCESS;
        }
        if (this.loading) {
            return LoaderStatus.LOADING;
        }
        return LoaderStatus.INITIALIZED;
    }
    get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     * @deprecated
     */
    createUrl() {
        let url = this.url;
        url += `?callback=__googleMapsCallback`;
        if (this.apiKey) {
            url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
            url += `&channel=${this.channel}`;
        }
        if (this.client) {
            url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
            url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
            url += `&language=${this.language}`;
        }
        if (this.region) {
            url += `&region=${this.region}`;
        }
        if (this.version) {
            url += `&v=${this.version}`;
        }
        if (this.mapIds) {
            url += `&map_ids=${this.mapIds.join(",")}`;
        }
        if (this.authReferrerPolicy) {
            url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
        }
        return url;
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
            script.remove();
        }
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     * @deprecated, use importLibrary() instead.
     */
    load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     * @deprecated, use importLibrary() instead.
     */
    loadPromise() {
        return new Promise((resolve, reject) => {
            this.loadCallback((err) => {
                if (!err) {
                    resolve(window.google);
                }
                else {
                    reject(err.error);
                }
            });
        });
    }
    importLibrary(name) {
        this.execute();
        return google.maps.importLibrary(name);
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     * @deprecated, use importLibrary() instead.
     */
    loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */
    setScript() {
        var _a, _b;
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const params = {
            key: this.apiKey,
            channel: this.channel,
            client: this.client,
            libraries: this.libraries.length && this.libraries,
            v: this.version,
            mapIds: this.mapIds,
            language: this.language,
            region: this.region,
            authReferrerPolicy: this.authReferrerPolicy,
        };
        // keep the URL minimal:
        Object.keys(params).forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key) => !params[key] && delete params[key]);
        if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
            // tweaked copy of https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import
            // which also sets the base url, the id, and the nonce
            /* eslint-disable */
            ((g) => {
                // @ts-ignore
                let h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
                // @ts-ignore
                b = b[c] || (b[c] = {});
                // @ts-ignore
                const d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () => 
                // @ts-ignore
                h || (h = new Promise((f, n) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    yield (a = m.createElement("script"));
                    a.id = this.id;
                    e.set("libraries", [...r] + "");
                    // @ts-ignore
                    for (k in g)
                        e.set(k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()), g[k]);
                    e.set("callback", c + ".maps." + q);
                    a.src = this.url + `?` + e;
                    d[q] = f;
                    a.onerror = () => (h = n(Error(p + " could not load.")));
                    // @ts-ignore
                    a.nonce = this.nonce || ((_a = m.querySelector("script[nonce]")) === null || _a === void 0 ? void 0 : _a.nonce) || "";
                    m.head.append(a);
                })));
                // @ts-ignore
                d[l] ? console.warn(p + " only loads once. Ignoring:", g) : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
            })(params);
            /* eslint-enable */
        }
        // While most libraries populate the global namespace when loaded via bootstrap params,
        // this is not the case for "marker" when used with the inline bootstrap loader
        // (and maybe others in the future). So ensure there is an importLibrary for each:
        const libraryPromises = this.libraries.map((library) => this.importLibrary(library));
        // ensure at least one library, to kick off loading...
        if (!libraryPromises.length) {
            libraryPromises.push(this.importLibrary("core"));
        }
        Promise.all(libraryPromises).then(() => this.callback(), (error) => {
            const event = new ErrorEvent("error", { error }); // for backwards compat
            this.loadErrorCallback(event);
        });
    }
    /**
     * Reset the loader state.
     */
    reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
        if (this.failed) {
            this.reset();
        }
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.error(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(() => {
                this.deleteScript();
                this.setScript();
            }, delay);
        }
        else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb) => {
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        this.resetIfRetryingFailed();
        if (this.done) {
            this.callback();
        }
        else {
            // short circuit and warn if google.maps is already loaded
            if (window.google && window.google.maps && window.google.maps.version) {
                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." +
                    "This may result in undesirable behavior as options and script parameters may not match.");
                this.callback();
                return;
            }
            if (this.loading) ;
            else {
                this.loading = true;
                this.setScript();
            }
        }
    }
}


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/snowAnimationSwitchStyles.css":
/*!***********************************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/snowAnimationSwitchStyles.css ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "8df0af50b30aee47b144.css";

/***/ }),

/***/ "./app/public/scripts/vendor/maps.js":
/*!*******************************************!*\
  !*** ./app/public/scripts/vendor/maps.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initMap)
/* harmony export */ });
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @googlemaps/js-api-loader */ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/* 
### Reference documentation 
https://developers.google.com/maps/documentation/javascript/load-maps-js-api 

### API KEY
Note that the public API key is not loaded dynamically. It is added to during the build process with a Gulp task. This code will run in a browser environment without .env file. During development or for maintenance tasks, add the key manually. When done set the string to the value as is.

Similar thing for the mapId. In development use DEMO-MAP-ID. The gulp task will replace it with the correct one.
*/


function initMap() {
  var maps_API_KEY = "GOOGLE_MAPS_API";
  var mapElement = document.getElementById("map");
  if (mapElement) {
    var mapOptions = {
      center: {
        lat: 50.948139,
        lng: 5.11457
      },
      zoom: 10,
      mapId: "DEMO_MAP_ID"
    };
    var loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__.Loader({
      apiKey: maps_API_KEY,
      version: "weekly",
      libraries: ["marker"]
    });
    var map;
    loader.load().then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _yield$google$maps$im, Map, InfoWindow, _yield$google$maps$im2, AdvancedMarkerElement, infoWindow, buildMarkerIcon, _iterator, _step, _loop;
      return _regeneratorRuntime().wrap(function _callee$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            buildMarkerIcon = function _buildMarkerIcon() {
              var markerIcon = document.createElement("img");
              markerIcon.src = "/images/favicon.ico";
              return markerIcon;
            };
            _context2.next = 3;
            return google.maps.importLibrary("maps");
          case 3:
            _yield$google$maps$im = _context2.sent;
            Map = _yield$google$maps$im.Map;
            InfoWindow = _yield$google$maps$im.InfoWindow;
            _context2.next = 8;
            return google.maps.importLibrary("marker");
          case 8:
            _yield$google$maps$im2 = _context2.sent;
            AdvancedMarkerElement = _yield$google$maps$im2.AdvancedMarkerElement;
            map = new Map(mapElement, mapOptions);
            infoWindow = new InfoWindow();
            _iterator = _createForOfIteratorHelper(places);
            _context2.prev = 13;
            _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
              var place, AdvancedMarkerElement;
              return _regeneratorRuntime().wrap(function _loop$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    place = _step.value;
                    AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
                      map: map,
                      content: buildMarkerIcon(),
                      position: place.position,
                      title: place.title
                    });
                    AdvancedMarkerElement.addListener("click", function (_ref2) {
                      var domEvent = _ref2.domEvent,
                        latLng = _ref2.latLng;
                      var target = domEvent.target;
                      infoWindow.close();
                      infoWindow.setContent(AdvancedMarkerElement.title);
                      infoWindow.open(AdvancedMarkerElement.map, AdvancedMarkerElement);
                    });
                  case 3:
                  case "end":
                    return _context.stop();
                }
              }, _loop);
            });
            _iterator.s();
          case 16:
            if ((_step = _iterator.n()).done) {
              _context2.next = 20;
              break;
            }
            return _context2.delegateYield(_loop(), "t0", 18);
          case 18:
            _context2.next = 16;
            break;
          case 20:
            _context2.next = 25;
            break;
          case 22:
            _context2.prev = 22;
            _context2.t1 = _context2["catch"](13);
            _iterator.e(_context2.t1);
          case 25:
            _context2.prev = 25;
            _iterator.f();
            return _context2.finish(25);
          case 28:
          case "end":
            return _context2.stop();
        }
      }, _callee, null, [[13, 22, 25, 28]]);
    })))["catch"](function (e) {
      return console.error("Error when loading Google Maps", e);
    });
  }
}
var places = [{
  title: "Golf, Lummen",
  position: {
    lat: 50.993705,
    lng: 5.226711
  }
}, {
  title: "'t Vloot, Linkhout",
  position: {
    lat: 50.963271,
    lng: 5.146496
  }
}, {
  title: "Café De Markt, Halen",
  position: {
    lat: 50.948305,
    lng: 5.113703
  }
}, {
  title: "Vandepoel Drinkcenter, Halen",
  position: {
    lat: 50.948095,
    lng: 5.108037
  }
}, {
  title: "Thomas Drink, Zoutleeuw",
  position: {
    lat: 50.830499,
    lng: 5.113714
  }
}, {
  title: "Sportcafé De Koekoek, Halen",
  position: {
    lat: 50.946865,
    lng: 5.11589
  }
}, {
  title: "Buurthuis-De Toekomst, Zellik",
  position: {
    lat: 50.953,
    lng: 5.084273
  }
}, {
  title: "Brasserie 3punt, Halen",
  position: {
    lat: 50.94941,
    lng: 5.114359
  }
}, {
  title: "Den AperO, Diest",
  position: {
    lat: 50.984152,
    lng: 5.05078
  }
}, {
  title: "De Rotemse Molen, Halen",
  position: {
    lat: 50.928832,
    lng: 5.092178
  }
}, {
  title: "Huis van Hem, Halen",
  position: {
    lat: 50.940806,
    lng: 5.105423
  }
}, {
  title: "Immigrand, Diest",
  position: {
    lat: 50.979488,
    lng: 5.054977
  }
}, {
  title: "Proxy Delhaize, Halen",
  position: {
    lat: 50.949516,
    lng: 5.114395
  }
}, {
  title: "Spar, Halen",
  position: {
    lat: 50.948102,
    lng: 5.108236
  }
}, {
  title: "Drankenhandel Claes, Lummen",
  position: {
    lat: 50.988164,
    lng: 5.195896
  }
}, {
  title: "Café Groenhof, Schaffen",
  position: {
    lat: 50.990513,
    lng: 5.081114
  }
}, {
  title: "De Sigaret, Diest",
  position: {
    lat: 50.983599,
    lng: 5.054736
  }
}, {
  title: "De Groene Munt, Diest",
  position: {
    lat: 50.984894,
    lng: 5.053982
  }
}, {
  title: "Place Douze, Halen",
  position: {
    lat: 50.947809,
    lng: 5.114072
  }
}, {
  title: "Museum de Reinvoart, Halen",
  position: {
    lat: 50.932681,
    lng: 5.063551
  }
}, {
  title: "Stamineeke, Webbekom",
  position: {
    lat: 50.972876,
    lng: 5.071093
  }
}, {
  title: "Brasserie Huys Frederic, Herk-de-Stad",
  position: {
    lat: 50.95721,
    lng: 5.176336
  }
}, {
  title: "Omnidrinks Bungeneers, Nieuwerkerken",
  position: {
    lat: 50.889616,
    lng: 5.191029
  }
}, {
  title: "Mucca Rosa, Herk-de-Stad",
  position: {
    lat: 50.948292,
    lng: 5.123005
  }
}, {
  title: "Traiteur Nico, Halen",
  position: {
    lat: 50.947701,
    lng: 5.1094
  }
}, {
  title: "Lavendelhoeve, Stokrooi",
  position: {
    lat: 50.9635,
    lng: 5.277173
  }
}, {
  title: "Schmedz, Diest",
  position: {
    lat: 50.984274,
    lng: 5.050664
  }
}, {
  title: "t Puur Genot, Diest",
  position: {
    lat: 50.984668,
    lng: 5.049057
  }
}, {
  title: "Oud Diest, Diest",
  position: {
    lat: 50.984176,
    lng: 5.050766
  }
}, {
  title: "Herberg De Pastorie, Zelem",
  position: {
    lat: 50.97845,
    lng: 5.099864
  }
}, {
  title: "Drankenhandel KEFO-JANNES, Diest",
  position: {
    lat: 50.980845,
    lng: 5.060089
  }
}, {
  title: "De XIIe Oogst, Halen",
  position: {
    lat: 50.94836,
    lng: 5.115024
  }
}];

/***/ }),

/***/ "./node_modules/snowfall-js-plugin/autoStart.js":
/*!******************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/autoStart.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAutoStart: () => (/* binding */ getAutoStart)
/* harmony export */ });
/* harmony import */ var _userSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userSettings.js */ "./node_modules/snowfall-js-plugin/userSettings.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.js */ "./node_modules/snowfall-js-plugin/logger.js");



function getAutoStart(configParams) {
  const autostartConfig = getAutostartConfig(configParams);
  const userPreference = (0,_userSettings_js__WEBPACK_IMPORTED_MODULE_0__.checkUserSettings)(); // true, false or undefined

  (0,_logger_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)(`Autostart Config Value: ${autostartConfig}`);
  (0,_logger_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)(`User Preference: ${userPreference}`);

  // user preferences takes precedence over autoStartConfig
  if (userPreference !== undefined) {
    return userPreference;
  } else return autostartConfig;
}

function getAutostartConfig(configParams) {
  if (configParams.autostartOnMobile && configParams.autostartOnDesktop) {
    return true;
  } else {
    if (window.innerWidth >= 768 && configParams.autostartOnDesktop)
      return true;
    else if (window.innerHeight <= 768 && configParams.autostartOnMobile)
      return true;
    else return false;
  }
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/canRunAnimation.js":
/*!************************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/canRunAnimation.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canRunAnimation: () => (/* binding */ canRunAnimation)
/* harmony export */ });
/* harmony import */ var _checkDateRange_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkDateRange.js */ "./node_modules/snowfall-js-plugin/checkDateRange.js");
/* harmony import */ var _checkHardware_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkHardware.js */ "./node_modules/snowfall-js-plugin/checkHardware.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger.js */ "./node_modules/snowfall-js-plugin/logger.js");
/* harmony import */ var _prefersReducedMotion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prefersReducedMotion.js */ "./node_modules/snowfall-js-plugin/prefersReducedMotion.js");





function canRunAnimation(configParams) {
  let hardwareCheck;
  let insideDateRange;
  let accessibilityCheck = true;
  if (configParams.checkHardware) {
    hardwareCheck = (0,_checkHardware_js__WEBPACK_IMPORTED_MODULE_1__.checkHardware)();
  } else hardwareCheck = true;
  if (configParams.checkDateRange) {
    insideDateRange = (0,_checkDateRange_js__WEBPACK_IMPORTED_MODULE_0__.checkDateRange)(configParams.dateRange);
  } else insideDateRange = true;
  if (configParams.checkReducedMotionPreference) {
    accessibilityCheck = (0,_prefersReducedMotion_js__WEBPACK_IMPORTED_MODULE_3__.checkReducedMotionConfig)(configParams);
  }
  (0,_logger_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)(
    `Result of canRunAnimationCheck: hardwareCheck: ${hardwareCheck}; insideDateRange: ${insideDateRange}; accessibilityCheck: ${accessibilityCheck}`
  );

  return hardwareCheck && insideDateRange && accessibilityCheck;
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/checkDateRange.js":
/*!***********************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/checkDateRange.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkDateRange: () => (/* binding */ checkDateRange),
/* harmony export */   isValidDate: () => (/* binding */ isValidDate)
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "./node_modules/snowfall-js-plugin/logger.js");


function checkDateRange(dateRange = {}) {
  let result = false;
  let validDateRange = true;
  if (Object.keys(dateRange).length !== 0) {
    validDateRange =
      isValidDate(dateRange.startMonth, dateRange.startDay) &&
      isValidDate(dateRange.endMonth, dateRange.endDay);
    if (
      dateRange.startMonth === dateRange.endMonth &&
      dateRange.startDay >= dateRange.endDay
    ) {
      validDateRange = false;
    }
  }

  validDateRange
    ? (result = checkCurrentDate(dateRange))
    : (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.logError)(
        "Invalid date range values provided in the config file. Check documentation for more information."
      );

  (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)(`Check Date Range Result: ${result}`);
  return result;
}

function checkCurrentDate(dateRange) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // Define the start and end dates for the condition, fallback to default
  const startMonth = dateRange.startMonth || 12; // December
  const startDay = dateRange.startDay || 15;
  const endMonth = dateRange.endMonth || 2; // February
  const endDay = dateRange.endDay || 15;

  return isInDateRange(
    currentMonth,
    currentDay,
    startMonth,
    endMonth,
    startDay,
    endDay
  );
}

function isInDateRange(
  currentMonth,
  currentDay,
  startMonth,
  endMonth,
  startDay,
  endDay
) {
  if (startMonth < endMonth) {
    return (
      (currentMonth === startMonth && currentDay >= startDay) ||
      (currentMonth > startMonth && currentMonth < endMonth) ||
      (currentMonth === endMonth && currentDay <= endDay)
    );
  } else if (startMonth === endMonth) {
    return currentDay >= startDay && currentDay <= endDay;
  } else {
    return (
      (currentMonth === startMonth && currentDay >= startDay) ||
      (currentMonth > startMonth && currentMonth <= 12) ||
      (currentMonth >= 1 && currentMonth < endMonth) ||
      (currentMonth === endMonth && currentDay <= endDay)
    );
  }
}

function isValidDate(month, day) {
  if (typeof month !== "number" || typeof day !== "number") {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  // Check if the day is in the valid range based on the month
  if (day < 1 || day > getDaysInMonth(month)) {
    return false;
  }

  return true;
}

function getDaysInMonth(month) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month - 1];
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/checkHardware.js":
/*!**********************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/checkHardware.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkHardware: () => (/* binding */ checkHardware)
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "./node_modules/snowfall-js-plugin/logger.js");


function checkHardware() {
  const cpuCores = navigator.hardwareConcurrency;
  const deviceMemory = navigator.deviceMemory;

  (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)(`Hardware Memory: ${deviceMemory} GB`);
  (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)(`Number of CPU cores: ${cpuCores}`);

  if (deviceMemory >= 4 || cpuCores >= 4) {
    return true;
  } else return false;
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/config/defaultParams.js":
/*!*****************************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/config/defaultParams.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultParams: () => (/* binding */ getDefaultParams)
/* harmony export */ });
function getDefaultParams() {
  return defaultParams;
}

const defaultParams = {
  logLevel: "default", // default or info
  checkHardware: true,
  checkDateRange: true,
  dateRange: {
    startMonth: 12, // 1-12
    endMonth: 2, // 1-12
    startDay: 15, // 1-31
    endDay: 15, // 1-31
  },
  autostartOnMobile: true,
  autostartOnDesktop: true,
  checkReducedMotionPreference: true,
  setReducedMotion: "disable", // "disable" or "reduce"
  reduceMultiplier: 0.5,
  // experimental: reduces snowfall count by 50%, use value between 0.1-0.9
  snowfall: {
    count: 100, // number of snowflakes
    minRadius: 10, // min size of snowflakes
    maxRadius: 30, // max size of snowflakes
    minSpeed: 3, // min fall speed of snowflakes
    maxSpeed: 10, // max fall speed of snowflakes
    text: "\u2744", // symbol or text of the snowflakes
    color: "#99ccff", // color of the snowflakes
    zIndex: "1000", // adjust according to project stacking context
    canvasHeightLimit: 0, // 0 = no limit; "1" = 100vh, "2" = 200vh
  },
  switches: {
    show: true,
    storeUserSettings: true,
    txt: "Snow on/off",
    txtElemAttributes: [],
    injectCSS: true,
    styles: {
      /* background color of the switch when turned off */
      bgClrOff: "rgba(189, 195, 199, 1)", // #bdc3c7
      /* background color of the switch when turned on */
      bgClrOn: "rgba(149, 165, 166, 1)", // #95a5a6
      /* color of the moving toggle inside switch */
      toggleClr: "#ffffff",
      /* color and position of the text next to the switch */
      txtClr: "rgba(33, 37, 41, 1)", // #212529
      txtPosition: "2", // 1 = left of switch or 2 = right of switch
    },
  },
};


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/config/validateParams.js":
/*!******************************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/config/validateParams.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deepMergeWithValidation: () => (/* binding */ deepMergeWithValidation),
/* harmony export */   setParams: () => (/* binding */ setParams)
/* harmony export */ });
/* harmony import */ var _defaultParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultParams.js */ "./node_modules/snowfall-js-plugin/config/defaultParams.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger.js */ "./node_modules/snowfall-js-plugin/logger.js");
/* harmony import */ var _prefersReducedMotion_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../prefersReducedMotion.js */ "./node_modules/snowfall-js-plugin/prefersReducedMotion.js");




function setParams(configParams) {
  const defaultParams = (0,_defaultParams_js__WEBPACK_IMPORTED_MODULE_0__.getDefaultParams)();
  const params = deepMergeWithValidation(defaultParams, configParams);
  (0,_logger_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)("Done setting snowfall-js-plugin parameters.");
  return params;
}

function deepMergeWithValidation(defaultConfig, configParams) {
  const mergedConfig = { ...defaultConfig };

  for (const key in configParams) {
    if (configParams.hasOwnProperty(key)) {
      // Validate if the key exists in the defaultConfig
      if (!(key in defaultConfig)) {
        (0,_logger_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(
          `Warning: '${key}' does not exist in the default configuration and will be ignored.`
        );
        continue;
      }

      const configValue = configParams[key];
      const defaultValue = defaultConfig[key];

      // Validate if the types match
      if (typeof configValue !== typeof defaultValue) {
        (0,_logger_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(`Warning: Type mismatch for '${key}'. Using default value.`);
        continue;
      }

      // Recursive merge for nested objects
      if (
        configValue instanceof Object &&
        !Array.isArray(configValue) &&
        defaultValue instanceof Object &&
        !Array.isArray(defaultValue)
      ) {
        mergedConfig[key] = deepMergeWithValidation(defaultValue, configValue);
      } else {
        // Overwrite values from configParams into mergedConfig
        mergedConfig[key] = configValue;
      }
    }
  }
  if (
    configParams !== null &&
    configParams.checkReducedMotionPreference === true &&
    configParams.hasOwnProperty("setReducedMotion") &&
    configParams.setReducedMotion === "reduce"
  ) {
    const reduceMultiplier = (0,_prefersReducedMotion_js__WEBPACK_IMPORTED_MODULE_2__.validateReduceMultiplier)(
      mergedConfig,
      configParams
    );
    mergedConfig.snowfall.count = Math.round(
      mergedConfig.snowfall.count * reduceMultiplier
    );
  }
  return mergedConfig;
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/index.js":
/*!**************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initSnowfall: () => (/* binding */ initSnowfall),
/* harmony export */   params: () => (/* binding */ params),
/* harmony export */   snowAnimationStart: () => (/* binding */ snowAnimationStart),
/* harmony export */   snowfallState: () => (/* binding */ snowfallState)
/* harmony export */ });
/* harmony import */ var _snowfall_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snowfall.js */ "./node_modules/snowfall-js-plugin/snowfall.js");
/* harmony import */ var _canRunAnimation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canRunAnimation.js */ "./node_modules/snowfall-js-plugin/canRunAnimation.js");
/* harmony import */ var _switch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./switch.js */ "./node_modules/snowfall-js-plugin/switch.js");
/* harmony import */ var _config_validateParams_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/validateParams.js */ "./node_modules/snowfall-js-plugin/config/validateParams.js");
/* harmony import */ var _autoStart_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./autoStart.js */ "./node_modules/snowfall-js-plugin/autoStart.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logger.js */ "./node_modules/snowfall-js-plugin/logger.js");






const snowfallState = {
  snowfallInstance: undefined,
  isAnimationRunning: false,
};


let params = {};

function snowAnimationStart(configParams = {}) {
  if (configParams.logLevel === "info") params.logLevel = "info";
  (0,_logger_js__WEBPACK_IMPORTED_MODULE_5__.logInfo)("Validating snowfall-js-plugin parameters...");

  params = (0,_config_validateParams_js__WEBPACK_IMPORTED_MODULE_3__.setParams)(configParams);
  const canRun = (0,_canRunAnimation_js__WEBPACK_IMPORTED_MODULE_1__.canRunAnimation)(params);

  if (canRun) {
    const autoStart = (0,_autoStart_js__WEBPACK_IMPORTED_MODULE_4__.getAutoStart)(params);
    (0,_switch_js__WEBPACK_IMPORTED_MODULE_2__.switchesAppendToDOM)(params);
    (0,_switch_js__WEBPACK_IMPORTED_MODULE_2__.switchesSetupEventHandlers)(params);

    if (autoStart) {
      snowfallState.snowfallInstance = initSnowfall(params.snowfall);
      snowfallState.isAnimationRunning = true;
      (0,_switch_js__WEBPACK_IMPORTED_MODULE_2__.switchesToggleOn)();
      (0,_logger_js__WEBPACK_IMPORTED_MODULE_5__.logInfo)("Done loading and starting animation.");
    }
  } else return;
}

function initSnowfall(params) {
  const snowfall = new _snowfall_js__WEBPACK_IMPORTED_MODULE_0__.Snowfall(params);
  return snowfall;
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/logger.js":
/*!***************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/logger.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   logError: () => (/* binding */ logError),
/* harmony export */   logInfo: () => (/* binding */ logInfo),
/* harmony export */   logWarn: () => (/* binding */ logWarn)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/snowfall-js-plugin/index.js");


function logError(message) {
  console.error(`[ERROR] ${message}`);
}

function logWarn(message) {
  if (_index_js__WEBPACK_IMPORTED_MODULE_0__.params.logLevel === "info") {
    console.warn(`[WARN] ${message}`);
  }
}

function logInfo(message) {
  if (_index_js__WEBPACK_IMPORTED_MODULE_0__.params.logLevel === "info") {
    console.log(`[INFO] ${message}`);
  }
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/prefersReducedMotion.js":
/*!*****************************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/prefersReducedMotion.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkReducedMotionConfig: () => (/* binding */ checkReducedMotionConfig),
/* harmony export */   validateReduceMultiplier: () => (/* binding */ validateReduceMultiplier)
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "./node_modules/snowfall-js-plugin/logger.js");


//see canRunAnimation.js
function checkReducedMotionConfig(configParams) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion)"
  ).matches;

  if (prefersReducedMotion && configParams.setReducedMotion === "disable") {
    return false;
  } else {
    return true; // case: setReducedMotion = "reduce" or no-preference set in browser configuration
  }
}

//see validateParams.js
function validateReduceMultiplier(configParams) {
  const inRange =
    configParams.reduceMultiplier > 0.1 && configParams.reduceMultiplier < 0.9;
  if (inRange) {
    return configParams.reduceMultiplier;
  } else {
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.logWarn)(
      `Input ${configParams.reduceMultiplier} is an invalid motion reduce multiplier value. Use a number value between 0.1 and 0.9! Fallback value 0.5 will be used.`
    );
    return 0.5;
  }
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/snowfall.js":
/*!*****************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/snowfall.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Snowfall: () => (/* binding */ Snowfall),
/* harmony export */   Snowflake: () => (/* binding */ Snowflake)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/snowfall-js-plugin/index.js");
/*!
 * Snowfall.js - A JavaScript library for creating and animating snowflakes on a web page
 * https://github.com/Andrey-1988-dev/snowfall.js
 *
 * Author: Andrey Yurkevich (https://github.com/Andrey-1988-dev)
 * Contact: yurkevich.a.n.1988@gmail.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Version: 1.1.0
 * Date: 2021-11-27T00:00Z
 */


// Class for creating snowflakes
class Snowflake {
  // Constructor takes x and y coordinates, radius, speed and color of the snowflake
  constructor(canvas, h, s, c, t) {
    // Generate a random x coordinate within the canvas width
    this.x = Math.random() * canvas.width; // x coordinate
    // Generate a random y coordinate within the canvas height
    this.y = Math.random() * canvas.height; // y coordinate
    this.h = h; // font size
    this.s = s; // speed
    this.c = c; // color
    this.t = t; // text
  }

  // Function to calculate the new position of the snowflake relative to the edge of the canvas
  calculateNewPosition = (oldPosition, oldCanvasSize, newCanvasSize) => {
    // Calculate the old position of the snowflake from the edge in percentage
    let percentage = oldPosition / (oldCanvasSize / 100);
    // Calculate the new position of the snowflake from the edge in pixels
    // Return the new position
    return (newCanvasSize / 100) * percentage;
  };

  updateAfterCanvasResize = (
    oldCanvasWidth,
    oldCanvasHeight,
    newCanvasWidth,
    newCanvasHeight
  ) => {
    if (oldCanvasWidth !== newCanvasWidth) {
      // Call the function to calculate the new position of the snowflake from the left edge
      this.x = this.calculateNewPosition(
        this.x,
        oldCanvasWidth,
        newCanvasWidth
      );
    }
    if (oldCanvasHeight !== newCanvasHeight) {
      // Call the function to calculate the new position of the snowflake from the top edge
      this.y = this.calculateNewPosition(
        this.y,
        oldCanvasHeight,
        newCanvasHeight
      );
    }
  };

  // Method to draw the snowflake on the canvas
  draw = (ctx) => {
    // Check if the snowflake is within the visible area
    if (
      this.x + this.h >= window.scrollX &&
      this.x - this.h <= window.scrollX + window.innerWidth &&
      this.y + this.h >= window.scrollY &&
      this.y - this.h <= window.scrollY + window.innerHeight
    ) {
      ctx.fillStyle = this.c; // set the color
      ctx.font = this.h + "px Arial, sans-serif"; // set the font and text size
      ctx.fillText(this.t, this.x, this.y); // draw the text with the snowflake symbol
    }
  };

  // Batch draw the snowflakes for better performance
  static batchDraw(
    ctx,
    snowflakes,
    scrollX,
    scrollY,
    windowWidth,
    windowHeight
  ) {
    // FillStyle is the same for all snowflakes
    ctx.fillStyle = snowflakes[0].c;

    ctx.beginPath();

    for (let snowflake of snowflakes) {
      if (snowflake.isVisible(scrollX, scrollY, windowWidth, windowHeight)) {
        ctx.font = snowflake.h + "px Arial, sans-serif";
        ctx.fillText(snowflake.t, snowflake.x, snowflake.y);
      }
    }

    ctx.closePath();
    ctx.fill();
  }

  // Check if the snowflake is inside the visible window
  isVisible = (scrollX, scrollY, windowWidth, windowHeight) => {
    return (
      this.x + this.h >= scrollX &&
      this.x - this.h <= scrollX + windowWidth &&
      this.y + this.h >= scrollY &&
      this.y - this.h <= scrollY + windowHeight
    );
  };

  // Method to update the position of the snowflake
  update = (canvas) => {
    this.y += this.s; // increase the y coordinate by the speed
    // if the snowflake goes beyond the bottom edge of the canvas, move it to the top
    if (this.s > 0) {
      if (this.y > canvas.height) {
        this.y = -this.h;
        this.x = Math.random() * canvas.width;
      }
    } else {
      if (this.y < 0) {
        this.y = canvas.height + this.h;
        this.x = Math.random() * canvas.width;
      }
    }
  };
}

class Snowfall {
  requestAnimationFrame;

  // Constructor takes parameters for creating snowflakes
  constructor(options = {}) {
    let {
      count = 100,
      minRadius = 10,
      maxRadius = 30,
      minSpeed = 3,
      maxSpeed = 10,
      text = "❄",
      color = "#99ccff",
      zIndex = "1000",
    } = options;

    count = Number(count);
    minRadius = Number(minRadius);
    if (minRadius <= 0) {
      minRadius = 10;
    }
    maxRadius = Number(maxRadius);
    if (maxRadius <= 0) {
      maxRadius = 30;
    }
    minSpeed = Number(minSpeed);
    maxSpeed = Number(maxSpeed);

    const snowfieldCanvas = document.createElement("canvas");
    snowfieldCanvas.id = "snowfall";
    snowfieldCanvas.style.zIndex = zIndex;
    snowfieldCanvas.style.position = "absolute";
    snowfieldCanvas.style.top = "0";
    snowfieldCanvas.style.left = "0";
    snowfieldCanvas.style.pointerEvents = "none";

    document.body.append(snowfieldCanvas);

    // Get the canvas element by id
    this.canvas = snowfieldCanvas;
    // Get the drawing context on the canvas
    this.ctx = this.canvas.getContext("2d");
    // Set the width and height of the canvas equal to the width and height of the browser window
    this.resizeCanvas();
    // Add an event handler to resize the canvas when the window size changes
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler = () => {
      requestAnimationFrame(this.resizeCanvas.bind(this));
    };
    // Create an array to store the snowflakes
    this.snowflakes = [];
    // Set the number of snowflakes
    this.count = count;
    // Set the minimum and maximum radius of the snowflakes
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    // Set the speed of the snowflakes
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    // Set the color of the snowflakes
    this.color = color;
    // Set the text
    this.text = text;
    // Call the function to create the snowflakes
    this.createSnowflakes();
    // Call the function to animate the snowflakes
    this.animateSnowflakes();
  }

  // Function to resize the canvas
  resizeCanvas = () => {
    let oldCanvasWidth, oldCanvasHeight;
    if (this.snowflakes) {
      oldCanvasWidth = this.canvas.width;
      oldCanvasHeight = this.canvas.height;
    }
    this.canvas.style.display = "none";

    // Set the width and height of the canvas equal to the width and height of the browser window
    if (window.devicePixelRatio > 1) {
      let scrollWidth = document.documentElement.scrollWidth;
      let scrollHeight;
      if (_index_js__WEBPACK_IMPORTED_MODULE_0__.params.snowfall.canvasHeightLimit !== 0) {
        scrollHeight = Math.min(
          document.documentElement.scrollHeight,
          window.innerHeight * _index_js__WEBPACK_IMPORTED_MODULE_0__.params.snowfall.canvasHeightLimit
        );
      } else scrollHeight = document.documentElement.scrollHeight;
      this.canvas.width = scrollWidth * window.devicePixelRatio;
      this.canvas.height = scrollHeight * window.devicePixelRatio;
      this.canvas.style.width = scrollWidth + "px";
      this.canvas.style.height = scrollHeight + "px";
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    } else {
      this.canvas.width = document.documentElement.scrollWidth;
      this.canvas.height = document.documentElement.scrollHeight;
    }
    this.canvas.style.display = "";
    if (this.snowflakes) {
      let newCanvasWidth = this.canvas.width;
      let newCanvasHeight = this.canvas.height;
      // Loop through the array of snowflakes
      for (let snowflake of this.snowflakes) {
        // Update the position of the snowflake after resizing the canvas
        snowflake.updateAfterCanvasResize(
          oldCanvasWidth,
          oldCanvasHeight,
          newCanvasWidth,
          newCanvasHeight
        );
      }
    }
  };

  // Function to create snowflakes and add them to the array
  createSnowflakes = () => {
    // Loop through the number of snowflakes
    for (let i = 0; i < this.count; i++) {
      // Generate a random radius within the minimum and maximum radius
      let r =
        this.minRadius + Math.random() * (this.maxRadius - this.minRadius);
      // Generate the speed based on the size of the snowflake
      let rp;
      if (this.minRadius !== this.maxRadius) {
        rp = (r - this.minRadius) / ((this.maxRadius - this.minRadius) / 100);
      } else {
        rp = 100;
      }
      let s = this.minSpeed + ((this.maxSpeed - this.minSpeed) / 100) * rp;
      // Create a new snowflake object with the given parameters
      let snowflake = new Snowflake(this.canvas, r, s, this.color, this.text);
      // Add the snowflake to the array
      this.snowflakes.push(snowflake);
    }
  };

  // Function to animate the snowflakes
  animateSnowflakes = () => {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    Snowflake.batchDraw(
      this.ctx,
      this.snowflakes,
      window.scrollX,
      window.scrollY,
      window.innerWidth,
      window.innerHeight
    );

    // Update the positions of the snowflakes
    for (let snowflake of this.snowflakes) {
      snowflake.update(this.canvas);
    }

    // Request a new animation frame
    this.requestAnimationFrame = requestAnimationFrame(this.animateSnowflakes);
  };

  // Method to destroy the snowfall and remove the canvas element
  destroy = () => {
    // Remove the event listener for resize
    window.removeEventListener("resize", this.resizeHandler);
    // Remove the canvas and animation frame
    cancelAnimationFrame(this.requestAnimationFrame);
    document.getElementById("snowfall").remove();
    for (let name in this) {
      delete this[name];
    }
    // Empty the array of snowflakes
    this.snowflakes = [];
  };
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/switch.js":
/*!***************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/switch.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   switchesAppendToDOM: () => (/* binding */ switchesAppendToDOM),
/* harmony export */   switchesSetupEventHandlers: () => (/* binding */ switchesSetupEventHandlers),
/* harmony export */   switchesToggleOn: () => (/* binding */ switchesToggleOn)
/* harmony export */ });
/* harmony import */ var _userSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userSettings.js */ "./node_modules/snowfall-js-plugin/userSettings.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/snowfall-js-plugin/index.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger.js */ "./node_modules/snowfall-js-plugin/logger.js");




/* Find container elements in the DOM */
function switchesAppendToDOM(params) {
  const switchContainers = document.querySelectorAll(".snow-animation-switch");

  if (switchContainers.length > 0) {
    switchContainers.forEach((container, i) => {
      const switchElements = buildSwitch(i, params);
      switchElements.forEach((elem) => container.appendChild(elem));
      container.classList.add("snow-animation-switch--show");
    });

    if (params.switches.injectCSS) {
      injectCSS(params);
    }

    (0,_logger_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)(
      `${switchContainers.length} switch container elements found and ${switchContainers.length} switch toggles appended to the DOM.`
    );
  } else {
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_2__.logWarn)(
      "No switch container elements found in the DOM. Make sure you have at least one <div class='snow-animation-switch'></div>."
    );
    return null;
  }
}

function buildSwitch(i, params) {
  const inputElem = document.createElement("input");
  const label = document.createElement("label");
  const textElem = document.createElement("span");

  inputElem.classList.add("snow-animation-switch__input");
  inputElem.type = "checkbox";
  inputElem.id = `snow-animation-switch__input${i}`;

  label.classList.add("snow-animation-switch__label");
  label.htmlFor = `snow-animation-switch__input${i}`;
  label.tabIndex = 0;

  textElem.classList.add("snow-animation-switch__text");
  textElem.textContent = params.switches.txt;
  if (params.switches.txtElemAttributes.length > 0) {
    setElemAttributes(textElem, params.switches.txtElemAttributes);
  }

  return [inputElem, label, textElem];
}

function setElemAttributes(elem, attributes) {
  attributes.forEach((attr) => {
    if (attr.type === "data-attribute") {
      elem.dataset[attr.name] = attr.value;
    } else {
      elem[attr.name] = attr.value;
    }
  });
}

function injectCSS(params) {
  const linkElement = document.createElement("link");
  const root = document.documentElement;
  const rootStyles = params.switches.styles;

  for (const key in rootStyles) {
    root.style.setProperty(`--snow-animation-switch-${key}`, rootStyles[key]);
    if (key === "txtPosition" && rootStyles[key] === "1")
      root.style.setProperty(
        `--snow-animation-switch-txtMargin`,
        "0 0.75em 0 0"
      );
  }

  linkElement.rel = "stylesheet";
  linkElement.type = "text/css";
  linkElement.href = new URL(/* asset import */ __webpack_require__(/*! snowAnimationSwitchStyles.css */ "./node_modules/snowfall-js-plugin/snowAnimationSwitchStyles.css"), __webpack_require__.b);

  document.head.appendChild(linkElement);
}

function switchesToggleOn() {
  const inputElems = document.querySelectorAll(".snow-animation-switch__input");
  inputElems.forEach((elem) => {
    elem.checked = true;
    elem.ariaChecked = true;
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)("Switch toggled ON");
  });
}

/* the label element is the visible part of the switch */
function switchesSetupEventHandlers(params) {
  const labelElems = document.querySelectorAll(".snow-animation-switch__label");
  labelElems.forEach((label) => {
    label.addEventListener("click", (event) =>
      handleEvents(event, undefined, params)
    );
    label.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.key === "Enter" || event.keyCode === 13) {
        handleEvents(event, label, params);
      }
    });
  });
}

function handleEvents(event, label, params) {
  if (_index_js__WEBPACK_IMPORTED_MODULE_1__.snowfallState.isAnimationRunning) {
    stopAnimation(event, params);
    /* the enter key event does not check the checkbox automatically */
    if (label) {
      label.previousElementSibling.checked = false;
      label.previousElementSibling.ariaChecked = false;
    }
  } else {
    startAnimation(event, params);
    if (label) {
      label.previousElementSibling.checked = true;
      label.previousElementSibling.ariaChecked = true;
    }
  }
}

function stopAnimation(event, params) {
  _index_js__WEBPACK_IMPORTED_MODULE_1__.snowfallState.snowfallInstance.destroy();
  _index_js__WEBPACK_IMPORTED_MODULE_1__.snowfallState.isAnimationRunning = false;
  (0,_logger_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)("Animation stopped.");
  if (params.switches.storeUserSettings)
    (0,_userSettings_js__WEBPACK_IMPORTED_MODULE_0__.setUserSettings)({ runSnowfallAnimation: false });
  syncStateOtherSwitches(event);
}

function startAnimation(event, params) {
  _index_js__WEBPACK_IMPORTED_MODULE_1__.snowfallState.snowfallInstance = (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.initSnowfall)(params.snowfall);
  _index_js__WEBPACK_IMPORTED_MODULE_1__.snowfallState.isAnimationRunning = true;
  (0,_logger_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)("Animation started.");
  if (params.switches.storeUserSettings)
    (0,_userSettings_js__WEBPACK_IMPORTED_MODULE_0__.setUserSettings)({ runSnowfallAnimation: true });
  syncStateOtherSwitches(event);
}

function syncStateOtherSwitches(event) {
  document.querySelectorAll(".snow-animation-switch__input").forEach((elem) => {
    if (elem.id !== event.target.previousElementSibling.id) {
      elem.checked = _index_js__WEBPACK_IMPORTED_MODULE_1__.snowfallState.isAnimationRunning;
      elem.ariaChecked = _index_js__WEBPACK_IMPORTED_MODULE_1__.snowfallState.isAnimationRunning;
      (0,_logger_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)("Switch state synced.");
    }
  });
}


/***/ }),

/***/ "./node_modules/snowfall-js-plugin/userSettings.js":
/*!*********************************************************!*\
  !*** ./node_modules/snowfall-js-plugin/userSettings.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkUserSettings: () => (/* binding */ checkUserSettings),
/* harmony export */   getUserSettings: () => (/* binding */ getUserSettings),
/* harmony export */   setUserSettings: () => (/* binding */ setUserSettings)
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "./node_modules/snowfall-js-plugin/logger.js");


function checkUserSettings() {
  if (getUserSettings().runSnowfallAnimation) {
    return true;
  } else if (getUserSettings().runSnowfallAnimation === false) return false;
  else return undefined;
}

function getUserSettings() {
  try {
    const settingsJSON = localStorage.getItem("userSettings");
    const settings = JSON.parse(settingsJSON) || {};
    return settings;
  } catch (error) {
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.logError)(`Error retrieving user settings: ${error}`);
    return null;
  }
}

function setUserSettings(newSettings) {
  try {
    const existingSettingsJSON = localStorage.getItem("userSettings");
    const existingSettings = JSON.parse(existingSettingsJSON) || {};

    const mergedSettings = { ...existingSettings, ...newSettings };

    const mergedSettingsJSON = JSON.stringify(mergedSettings);

    localStorage.setItem("userSettings", mergedSettingsJSON);
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)("User settings saved successfully.");
  } catch (error) {
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.logError)(`Error saving user settings: ${error}`);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"vendor": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************************!*\
  !*** ./app/public/scripts/vendor/vendor.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _maps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maps.js */ "./app/public/scripts/vendor/maps.js");
/* harmony import */ var snowfall_js_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! snowfall-js-plugin */ "./node_modules/snowfall-js-plugin/index.js");


(0,_maps_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
document.addEventListener("DOMContentLoaded", function () {
  (0,snowfall_js_plugin__WEBPACK_IMPORTED_MODULE_1__.snowAnimationStart)({
    logLevel: "info",
    snowfall: {
      count: 33,
      maxSpeed: 6,
      canvasHeightLimit: 1
    },
    switches: {
      txt: "Sneeuw",
      styles: {
        bgClrOff: "#202020",
        bgClrOn: "#7a2800",
        toggleClr: "#ffffc0",
        txtClr: "#ffffc0",
        txtPosition: "1"
      }
    }
  });
});
})();

/******/ })()
;
//# sourceMappingURL=vendor-bundle.js.map