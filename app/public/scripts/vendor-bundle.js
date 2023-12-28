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

/***/ "./app/helpers/checkDateRange.js":
/*!***************************************!*\
  !*** ./app/helpers/checkDateRange.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkDataRange)
/* harmony export */ });
// this function helps snowfall.js to determine whether it should run

function checkDataRange() {
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth() + 1;
  var currentDay = currentDate.getDate();

  // Define the start and end dates for the condition
  var startMonth = 12; // December
  var startDay = 15;
  var endMonth = 2; // February
  var endDay = 15;

  // Check if the current date is within the specified range
  var isInDateRange = currentMonth === startMonth && currentDay >= startDay || currentMonth > startMonth && currentMonth < endMonth || currentMonth === endMonth && currentDay <= endDay;
  if (isInDateRange) {
    return true;
  } else {
    return false;
  }
}

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

/***/ "./app/public/scripts/vendor/snowfall.js":
/*!***********************************************!*\
  !*** ./app/public/scripts/vendor/snowfall.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ runSnowfall)
/* harmony export */ });
/* harmony import */ var _helpers_checkDateRange_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/checkDateRange.js */ "./app/helpers/checkDateRange.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

/*!
 * This animation should run between 15 decemeber and 15 february. Condition
 * checked by helper function.
 *
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

"use strict";

// Class for creating snowflakes
var Snowflake = /*#__PURE__*/_createClass(
// Constructor takes x and y coordinates, radius, speed and color of the snowflake
function Snowflake(_canvas, h, s, c, t) {
  var _this = this;
  _classCallCheck(this, Snowflake);
  // Function to calculate the new position of the snowflake relative to the edge of the canvas
  _defineProperty(this, "calculateNewPosition", function (oldPosition, oldCanvasSize, newCanvasSize) {
    // Calculate the old position of the snowflake from the edge in percentage
    var percentage = oldPosition / (oldCanvasSize / 100);
    // Calculate the new position of the snowflake from the edge in pixels
    // Return the new position
    return newCanvasSize / 100 * percentage;
  });
  _defineProperty(this, "updateAfterCanvasResize", function (oldCanvasWidth, oldCanvasHeight, newCanvasWidth, newCanvasHeight) {
    if (oldCanvasWidth !== newCanvasWidth) {
      // Call the function to calculate the new position of the snowflake from the left edge
      _this.x = _this.calculateNewPosition(_this.x, oldCanvasWidth, newCanvasWidth);
    }
    if (oldCanvasHeight !== newCanvasHeight) {
      // Call the function to calculate the new position of the snowflake from the top edge
      _this.y = _this.calculateNewPosition(_this.y, oldCanvasHeight, newCanvasHeight);
    }
  });
  // Method to draw the snowflake on the canvas
  _defineProperty(this, "draw", function (ctx) {
    // Check if the snowflake is within the visible area
    if (_this.x + _this.h >= window.scrollX && _this.x - _this.h <= window.scrollX + window.innerWidth && _this.y + _this.h >= window.scrollY && _this.y - _this.h <= window.scrollY + window.innerHeight) {
      ctx.font = _this.h + "px Arial, sans-serif"; // set the font and text size
      ctx.fillText(_this.t, _this.x, _this.y); // draw the text with the snowflake symbol
      ctx.fillStyle = _this.c; // set the color
    }
  });
  // Method to update the position of the snowflake
  _defineProperty(this, "update", function (canvas) {
    _this.y += _this.s; // increase the y coordinate by the speed
    // if the snowflake goes beyond the bottom edge of the canvas, move it to the top
    if (_this.s > 0) {
      if (_this.y > canvas.height) {
        _this.y = -_this.h;
        _this.x = Math.random() * canvas.width;
      }
    } else {
      if (_this.y < 0) {
        _this.y = canvas.height + _this.h;
        _this.x = Math.random() * canvas.width;
      }
    }
  });
  // Generate a random x coordinate within the canvas width
  this.x = Math.random() * _canvas.width; // x coordinate
  // Generate a random y coordinate within the canvas height
  this.y = Math.random() * _canvas.height; // y coordinate
  this.h = h; // font size
  this.s = s; // speed
  this.c = c; // color
  this.t = t; // text
});
var Snowfall = /*#__PURE__*/_createClass(
// Constructor takes parameters for creating snowflakes
function Snowfall() {
  var _this2 = this;
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, Snowfall);
  _defineProperty(this, "requestAnimationFrame", void 0);
  // Function to resize the canvas
  _defineProperty(this, "resizeCanvas", function () {
    var oldCanvasWidth, oldCanvasHeight;
    if (_this2.snowflakes) {
      oldCanvasWidth = _this2.canvas.width;
      oldCanvasHeight = _this2.canvas.height;
    }
    _this2.canvas.style.display = "none";

    // Set the width and height of the canvas equal to the width and height of the browser window
    if (window.devicePixelRatio > 1) {
      var scrollWidth = document.documentElement.scrollWidth;
      var scrollHeight = document.documentElement.scrollHeight;
      _this2.canvas.width = scrollWidth * window.devicePixelRatio;
      _this2.canvas.height = scrollHeight * window.devicePixelRatio;
      _this2.canvas.style.width = scrollWidth + "px";
      _this2.canvas.style.height = scrollHeight + "px";
      _this2.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    } else {
      _this2.canvas.width = document.documentElement.scrollWidth;
      _this2.canvas.height = document.documentElement.scrollHeight;
    }
    _this2.canvas.style.display = "";
    if (_this2.snowflakes) {
      var newCanvasWidth = _this2.canvas.width;
      var newCanvasHeight = _this2.canvas.height;
      // Loop through the array of snowflakes
      var _iterator = _createForOfIteratorHelper(_this2.snowflakes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var snowflake = _step.value;
          // Update the position of the snowflake after resizing the canvas
          snowflake.updateAfterCanvasResize(oldCanvasWidth, oldCanvasHeight, newCanvasWidth, newCanvasHeight);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  });
  // Function to create snowflakes and add them to the array
  _defineProperty(this, "createSnowflakes", function () {
    // Loop through the number of snowflakes
    for (var i = 0; i < _this2.count; i++) {
      // Generate a random radius within the minimum and maximum radius
      var r = _this2.minRadius + Math.random() * (_this2.maxRadius - _this2.minRadius);
      // Generate the speed based on the size of the snowflake
      var rp = void 0;
      if (_this2.minRadius !== _this2.maxRadius) {
        rp = (r - _this2.minRadius) / ((_this2.maxRadius - _this2.minRadius) / 100);
      } else {
        rp = 100;
      }
      var s = _this2.minSpeed + (_this2.maxSpeed - _this2.minSpeed) / 100 * rp;
      // Create a new snowflake object with the given parameters
      var snowflake = new Snowflake(_this2.canvas, r, s, _this2.color, _this2.text);
      // Add the snowflake to the array
      _this2.snowflakes.push(snowflake);
    }
  });
  // Function to animate the snowflakes
  _defineProperty(this, "animateSnowflakes", function () {
    // Clear the canvas
    _this2.ctx.clearRect(0, 0, _this2.canvas.width, _this2.canvas.height);

    // Loop through the array of snowflakes
    var _iterator2 = _createForOfIteratorHelper(_this2.snowflakes),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var snowflake = _step2.value;
        // Draw the snowflake on the canvas
        snowflake.draw(_this2.ctx);
        // Update the position of the snowflake
        snowflake.update(_this2.canvas);
      }
      // Request a new animation frame
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    _this2.requestAnimationFrame = requestAnimationFrame(_this2.animateSnowflakes);
  });
  // Method to destroy the snowfall and remove the canvas element
  _defineProperty(this, "destroy", function () {
    cancelAnimationFrame(_this2.requestAnimationFrame);
    document.getElementById("snowfall").remove();
    for (var name in _this2) {
      delete _this2[name];
    }
    // Empty the array of snowflakes
    _this2.snowflakes = [];
    // Remove the event listener for resize
    window.removeEventListener("resize", _this2.resizeCanvas);
  });
  var _options$count = options.count,
    count = _options$count === void 0 ? 100 : _options$count,
    _options$minRadius = options.minRadius,
    minRadius = _options$minRadius === void 0 ? 10 : _options$minRadius,
    _options$maxRadius = options.maxRadius,
    maxRadius = _options$maxRadius === void 0 ? 30 : _options$maxRadius,
    _options$minSpeed = options.minSpeed,
    minSpeed = _options$minSpeed === void 0 ? 3 : _options$minSpeed,
    _options$maxSpeed = options.maxSpeed,
    maxSpeed = _options$maxSpeed === void 0 ? 10 : _options$maxSpeed,
    _options$text = options.text,
    text = _options$text === void 0 ? "❄" : _options$text,
    _options$color = options.color,
    color = _options$color === void 0 ? "#99ccff" : _options$color,
    _options$zIndex = options.zIndex,
    zIndex = _options$zIndex === void 0 ? "1000" : _options$zIndex;
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
  var snowfieldCanvas = document.createElement("canvas");
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
  window.addEventListener("resize", function () {
    // Use requestAnimationFrame to optimize the resizing
    requestAnimationFrame(_this2.resizeCanvas.bind(_this2));
  });

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
});
function runSnowfall() {
  var shouldRun = (0,_helpers_checkDateRange_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  if (shouldRun) {
    var snowfall = initSnowFall();
    var isRunning = true;
    var snowToggleContainer = document.querySelector(".snow-toggle");
    var snowToggleCheckbox = document.querySelector(".snow-toggle__checkbox");
    var snowToggleLabel = document.querySelector(".snow-toggle__label");
    snowToggleContainer.classList.add("snow-toggle--show");
    snowToggleCheckbox.checked = true;
    snowToggleLabel.addEventListener("click", function () {
      if (isRunning) {
        snowfall.destroy();
        isRunning = false;
      } else {
        snowfall = initSnowFall();
        isRunning = true;
      }
    });
  }
}
function initSnowFall() {
  var snowfall = new Snowfall({
    // number of snowflakes
    count: 100,
    // min/max size
    minRadius: 10,
    maxRadius: 30,
    // min/max speed
    minSpeed: 1,
    maxSpeed: 3,
    // custom symbol or text for snowflakes
    text: "\u2744",
    // color of snowflakes
    color: "#ffffff",
    // z-index for the canvas
    zIndex: "1000"
  });
  return snowfall;
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************************!*\
  !*** ./app/public/scripts/vendor/vendor.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _maps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maps.js */ "./app/public/scripts/vendor/maps.js");
/* harmony import */ var _snowfall_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snowfall.js */ "./app/public/scripts/vendor/snowfall.js");


(0,_maps_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_snowfall_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=vendor-bundle.js.map