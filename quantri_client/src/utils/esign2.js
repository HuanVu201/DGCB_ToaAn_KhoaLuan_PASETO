/*! ****************************************************************************
* @td/esign - Tandan eSign browser extension and integration API
*
* v2.0.10 - 2021-07-27
*
* Copyright (c) 2021 TANDAN INFOMATICS JSC
* www.tandan.com.vn
* Author: Nguyễn Khắc Chính
***************************************************************************** */

var n, e;
n = this,
e = function(n) {
    "use strict";
    n.FontStyle = void 0,
    (k = n.FontStyle || (n.FontStyle = {}))[k.Regular = 0] = "Regular",
    k[k.Bold = 1] = "Bold",
    k[k.Italic = 2] = "Italic",
    k[k.Underline = 4] = "Underline";
    function e(n, s, c, u) {
        return new (c = c || Promise)(function(t, e) {
            function o(n) {
                try {
                    r(u.next(n))
                } catch (n) {
                    e(n)
                }
            }
            function i(n) {
                try {
                    r(u.throw(n))
                } catch (n) {
                    e(n)
                }
            }
            function r(n) {
                var e;
                n.done ? t(n.value) : ((e = n.value)instanceof c ? e : new c(function(n) {
                    n(e)
                }
                )).then(o, i)
            }
            r((u = u.apply(n, s || [])).next())
        }
        )
    }
    function c(t, o) {
        var i, r, s, c = {
            label: 0,
            sent: function() {
                if (1 & s[0])
                    throw s[1];
                return s[1]
            },
            trys: [],
            ops: []
        }, n = {
            next: e(0),
            throw: e(1),
            return: e(2)
        };
        return "function" == typeof Symbol && (n[Symbol.iterator] = function() {
            return this
        }
        ),
        n;
        function e(e) {
            return function(n) {
                return function(e) {
                    if (i)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (i = 1,
                            r && (s = 2 & e[0] ? r.return : e[0] ? r.throw || ((s = r.return) && s.call(r),
                            0) : r.next) && !(s = s.call(r, e[1])).done)
                                return s;
                            switch (r = 0,
                            (e = s ? [2 & e[0], s.value] : e)[0]) {
                            case 0:
                            case 1:
                                s = e;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: e[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = e[1],
                                e = [0];
                                continue;
                            case 7:
                                e = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(s = 0 < (s = c.trys).length && s[s.length - 1]) && (6 === e[0] || 2 === e[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === e[0] && (!s || e[1] > s[0] && e[1] < s[3])) {
                                    c.label = e[1];
                                    break
                                }
                                if (6 === e[0] && c.label < s[1]) {
                                    c.label = s[1],
                                    s = e;
                                    break
                                }
                                if (s && c.label < s[2]) {
                                    c.label = s[2],
                                    c.ops.push(e);
                                    break
                                }
                                s[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            e = o.call(t, c)
                        } catch (n) {
                            e = [6, n],
                            r = 0
                        } finally {
                            i = s = 0
                        }
                    if (5 & e[0])
                        throw e[1];
                    return {
                        value: e[0] ? e[1] : void 0,
                        done: !0
                    }
                }([e, n])
            }
        }
    }
    function o(n, e) {
        var t = "function" == typeof Symbol && n[Symbol.iterator];
        if (!t)
            return n;
        var o, i, r = t.call(n), s = [];
        try {
            for (; (void 0 === e || 0 < e--) && !(o = r.next()).done; )
                s.push(o.value)
        } catch (n) {
            i = {
                error: n
            }
        } finally {
            try {
                o && !o.done && (t = r.return) && t.call(r)
            } finally {
                if (i)
                    throw i.error
            }
        }
        return s
    }
    var i = "vn.com.tandan.esign";
    function t(e, n) {
        var t;
        try {
            if ((t = n(e))instanceof Promise)
                return t.catch(function(n) {}).then(function(n) {
                    return e.disconnect(),
                    n
                })
        } catch (n) {
            return e.disconnect(),
            Promise.reject(n)
        }
        return e.disconnect(),
        Promise.resolve(t)
    }
    function r() {
        if (!window.$__tdEsign2Loaded__)
            return Promise.reject("eSign extension is not available.");
        return a({
            action: "connect"
        }).then(function(n) {
            return new s(n)
        }).catch(function(n) {
            throw console.error("error connect to eSign host."),
            n
        })
    }
    var s = (Object.defineProperty(u.prototype, "isAlive", {
        get: function() {
            return this.alive
        },
        enumerable: !1,
        configurable: !0
    }),
    u.prototype.send = function(n, e, t) {
        return a({
            controller: n,
            action: e,
            data: function() {
                for (var n = [], e = 0; e < arguments.length; e++)
                    n = n.concat(o(arguments[e]));
                return n
            }([this.connectionId], t = void 0 === t ? [] : t)
        })
    }
    ,
    u.prototype.sendBinary = function(n) {
        throw "method not implemented"
    }
    ,
    u.prototype.receiveBinary = function() {
        throw "method not implemented"
    }
    ,
    u.prototype.disconnect = function() {
        var e = this;
        a({
            action: "disconnect",
            data: [this.connectionId]
        }).then(function(n) {
            return e.alive = !1
        })
    }
    ,
    u);
    function u(n) {
        this.connectionId = n,
        this.alive = !0
    }
    function a(n) {
        var o = new MessageChannel;
        return new Promise(function(e, t) {
            o.port1.onmessage = function(n) {
                n = n.data;
                n.success ? e(n.data) : t(n.error)
            }
            ,
            window.postMessage({
                type: i,
                body: n
            }, "chrome-extension://abnjkiloehbjeflhekmmoolnigfdlond/", [o.port2])
        }
        )
    }
    function f() {
        return new Promise(function(e, n) {
            var t = new WebSocket("ws://127.0.0.1:21521/");
            t.binaryType = "arraybuffer",
            t.onerror = n,
            t.onopen = function(n) {
                return e(new l(t))
            }
        }
        )
    }
    var l = (Object.defineProperty(h.prototype, "isAlive", {
        get: function() {
            return this.alive
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(h.prototype, "closeReason", {
        get: function() {
            return this.reason
        },
        enumerable: !1,
        configurable: !0
    }),
    h.prototype.send = function(n, e, t) {
        var o, i = this, t = JSON.stringify({
            controller: n,
            action: e,
            data: t
        });
        this.ws.send(t);
        var r = "";
        return new Promise(function(e, t) {
            i.binListeners.push(null),
            i.listeners.push(function(n) {
                if (!n.success)
                    return t(n.error);
                n = n.result;
                if (n.__chunks__)
                    return o = n.msgLen,
                    !0;
                if (o) {
                    if ((r += n).length < o)
                        return !0;
                    e(JSON.parse(r))
                } else
                    e(n)
            })
        }
        )
    }
    ,
    h.prototype.sendBinary = function(n) {
        this.ws.send(n)
    }
    ,
    h.prototype.receiveBinary = function() {
        var n = this;
        return new Promise(function(e) {
            n.binListeners.length ? (n.binListeners[0] || (n.binListeners[0] = [])).push(new d(function(n) {
                return e(new Blob(n))
            }
            )) : e(void 0)
        }
        )
    }
    ,
    h.prototype.disconnect = function() {
        this.alive && (this.ws.close(),
        this.alive = !1)
    }
    ,
    h);
    function h(n) {
        var t = this;
        this.ws = n;
        var r = []
          , s = [];
        this.listeners = r,
        this.binListeners = s,
        this.alive = !0,
        n.onmessage = function(e) {
            if (e.data instanceof ArrayBuffer) {
                for (var n = s[0]; s.length && (!n || !n.length || !n.find(function(n) {
                    return !n.isFinished()
                })); )
                    s.splice(0, 1),
                    n = s[0];
                n && n.length && (n.forEach(function(n) {
                    return n.isFinished() || n.receive(e.data)
                }),
                n.find(function(n) {
                    return !n.isFinished()
                }) || 0 <= (i = s.indexOf(n)) && s.splice(i, 1))
            } else {
                var t, o = r[0], i = void 0;
                if (o) {
                    try {
                        t = JSON.parse(e.data)
                    } catch (e) {
                        t = e.data
                    }
                    i = o({
                        success: !0,
                        result: t
                    })
                }
                i || r.shift()
            }
        }
        ,
        n.onclose = function(n) {
            var e;
            t.listeners && t.listeners.length && (e = {
                success: !1,
                error: "Connetion closed"
            },
            t.listeners.forEach(function(n) {
                return n(e)
            })),
            t.binListeners && t.binListeners.length && t.binListeners.forEach(function(n) {
                return n && n.length && n.forEach(function(n) {
                    return n.end()
                })
            }),
            t.alive = !1,
            4003 == n.code && (t.reason = "forbidden")
        }
    }
    var d = (p.prototype.isFinished = function() {
        return this.finished
    }
    ,
    p.prototype.receive = function(n) {
        if (!this.finished)
            if (this.len) {
                if (this.frames.push(n),
                this.read += n.byteLength,
                this.read >= this.len)
                    return this.callback(this.frames),
                    this.finished = !0
            } else {
                n = new Uint32Array(n);
                this.len = n[0],
                this.frames = [],
                this.read = 0
            }
    }
    ,
    p.prototype.end = function() {
        this.finished || (this.callback(this.frames),
        this.finished = !0)
    }
    ,
    p);
    function p(n) {
        this.callback = n
    }
    function y() {
        var e;
        return f().catch(function(n) {
            return e = n,
            r()
        }).catch(function(n) {
            throw {
                errors: [e, n]
            }
        })
    }
    function v(n, e) {
        return n.then(function(n) {
            if (n.success)
                return e ? e(n.data) : n.data;
            throw n.error
        })
    }
    var b = (g.prototype.getHostInfo = function() {
        return v(this.connection.send(void 0, "getHostInfo"))
    }
    ,
    g.prototype.getCertificates = function() {
        for (var n = [], e = 0; e < arguments.length; e++)
            n[e] = arguments[e];
        return v(this.connection.send(void 0, "getCertificates", n))
    }
    ,
    g);
    function g(n) {
        this.connection = n
    }
    function m(r, s) {
        return e(this, void 0, void 0, function() {
            var e, t, o, i;
            return c(this, function(n) {
                switch (n.label) {
                case 0:
                    e = [],
                    t = 0,
                    n.label = 1;
                case 1:
                    return t < r.length ? (i = (o = e).push,
                    [4, s(r[t], t)]) : [3, 4];
                case 2:
                    i.apply(o, [n.sent()]),
                    n.label = 3;
                case 3:
                    return t++,
                    [3, 1];
                case 4:
                    return [2, e]
                }
            })
        })
    }
    function w(n) {
        var e = document.createElement("iframe");
        e.setAttribute("src", n),
        e.style.display = "none",
        document.body.appendChild(e),
        setTimeout(function() {
            return e.parentNode.removeChild(e)
        }, 1e4)
    }
    var S = Object.freeze({
        __proto__: null,
        mapSeries: m,
        downloadFile: function(o, i) {
            var r = this;
            return new Promise(function(n, e) {
                var t = new XMLHttpRequest;
                t.open("GET", o),
                t.responseType = "arraybuffer",
                i && i(t),
                t.onload = function() {
                    return 200 <= t.status && t.status < 300 ? n(r.response) : e(t.statusText)
                }
                ,
                t.onerror = function() {
                    return e(t.statusText)
                }
                ,
                t.send()
            }
            )
        },
        userDownload: w,
        downloadClient: function(n) {
            w("https://update.tandan.com.vn/updates/esign/v2/latest/TDeSign-v2-setup." + (n ? "zip" : "exe"))
        }
    })
      , P = (A.prototype.push = function(n, e, t) {
        var o, i, r, s, c, u, a = {};
        if (n instanceof Blob) {
            var f = e || (n instanceof File ? n.name : void 0);
            f && (a.name = f),
            a.type = t || n.type,
            a.size = n.size,
            o = this.connection.send("file", "push", [a]),
            i = n,
            r = this.connection,
            s = i.size,
            c = 4096,
            u = 0,
            f = new Uint32Array([s]).buffer,
            r.sendBinary(f),
            h()
        } else {
            if (!(n instanceof Uint8Array || n instanceof ArrayBuffer))
                throw "invalid arguments";
            e && (a.name = e),
            t && (a.type = t),
            a.size = n.byteLength,
            o = this.connection.send("file", "push", [a]),
            function(n, e) {
                var t = n.slice(0, 4096)
                  , o = t.byteLength
                  , i = new Uint32Array([o]).buffer;
                e.sendBinary(i);
                for (; t.byteLength; )
                    e.sendBinary(t instanceof Uint8Array ? t.buffer : t),
                    t = n.slice(o, o + 4096)
            }(n, this.connection)
        }
        function l(n) {
            if (n.target.error)
                throw n.target.error;
            n = n.target.result;
            u += n.byteLength,
            r.sendBinary(n),
            u < s && h()
        }
        function h() {
            var n = new FileReader
              , e = i.slice(u, c + u);
            n.onload = l,
            n.readAsArrayBuffer(e)
        }
        return v(o)
    }
    ,
    A.prototype.bulkPush = function(t) {
        return e(this, void 0, void 0, function() {
            var e = this;
            return c(this, function(n) {
                return [2, m(t, function(n) {
                    return n instanceof File ? e.push(n) : n.blob ? e.push(n.blob, n.name, n.type || n.blob.type) : void (n.data && e.push(n.data, n.name, n.type))
                })]
            })
        })
    }
    ,
    A.prototype.getInfo = function(n) {
        return v(this.connection.send("file", "getInfo", [n]))
    }
    ,
    A.prototype.pull = function(n) {
        return Promise.all([v(this.connection.send("file", "pull", [n])), this.connection.receiveBinary()]).then(function(n) {
            var e = o(n, 2)
              , n = e[0]
              , e = e[1];
            return new File([e],n.name,{
                type: n.type
            })
        })
    }
    ,
    A.prototype.remove = function(n) {
        return v(this.connection.send("file", "delete", [n]))
    }
    ,
    A);
    function A(n) {
        this.connection = n
    }
    var x = (L.prototype.canConvertToPdf = function(n) {
        return v(this.connection.send("conversion", "canConvertToPdf", [n]))
    }
    ,
    L.prototype.convertToPdf = function(n) {
        return v(this.connection.send("conversion", "convertToPdf", [n]))
    }
    ,
    L.prototype.isPdf = function(n) {
        return v(this.connection.send("conversion", "isPdf", [n]))
    }
    ,
    L.prototype.isXml = function(n) {
        return v(this.connection.send("conversion", "isXml", [n]))
    }
    ,
    L.prototype.isOfficeDocument = function(n) {
        return v(this.connection.send("conversion", "isOfficeDocument", [n]))
    }
    ,
    L.prototype.isLegacyOfficeDocument = function(n) {
        return v(this.connection.send("conversion", "isLegacyOfficeDocument", [n]))
    }
    ,
    L.prototype.isOoxmlOfficeDocument = function(n) {
        return v(this.connection.send("conversion", "isOoxmlOfficeDocument", [n]))
    }
    ,
    L);
    function L(n) {
        this.connection = n
    }
    var k = (O.prototype.signWithNativeUI = function(n, e) {
        return v(this.connection.send("signature", "signWithNativeUI", [n, e]))
    }
    ,
    O.prototype.bulkSign = function(n, e) {
        return v(this.connection.send("signature", "bulkSign", [n, e]))
    }
    ,
    O);
    function O(n) {
        this.connection = n
    }
    n.ConversionApi = x,
    n.FileApi = P,
    n.InfoApi = b,
    n.SignatureApi = k,
    n.apiVersion = "2.0",
    n.connect = y,
    n.connectNative = r,
    n.connectSocket = f,
    n.safeConnect = function(n) {
        return y().then(function(e) {
            return e.isAlive ? t(e, n).then(function(n) {
                return {
                    reason: e.closeReason
                }
            }) : {
                reason: e.closeReason
            }
        })
    }
    ,
    n.safeConnectNative = function(n) {
        return r().then(function(e) {
            return t(e, n).then(function(n) {
                return {
                    reason: e.closeReason
                }
            })
        })
    }
    ,
    n.safeConnectSocket = function(n) {
        return f().then(function(e) {
            return e.isAlive ? t(e, n).then(function(n) {
                return {
                    reason: e.closeReason
                }
            }) : {
                reason: e.closeReason
            }
        })
    }
    ,
    n.safeConnectionDelegate = function(e) {
        return function(n) {
            return t(n, e)
        }
    }
    ,
    n.safeExecConnectionTask = t,
    n.supportCustomXAdESStruct = !1,
    n.supportDataSigning = !1,
    n.supportPdfEncription = !1,
    n.utils = S,
    n.version = "1.0.0",
    Object.defineProperty(n, "__esModule", {
        value: !0
    })
}
,
"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(((n = "undefined" != typeof globalThis ? globalThis : n || self).td = n.td || {},
n.td.eSign = {}));
//# sourceMappingURL=eSign.api.js.map
