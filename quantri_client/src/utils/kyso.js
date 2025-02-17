/**
* td-esign 2018-10-09
* @version 1.1.0 
* @author Nguyễn Khắc Chính
* @copyright (c)Tandan JSC 2015
*/
var TD = TD || {};
TD.utils = TD.utils || {}
var a = 1
    , b = 0
    , c = 2
    , d = 3
    , e = 4
    , f = 5
    , g = 1
    , h = 0
    , i = 1
    , j = 2
    , k = 3
    , l = 4
    , m = 0
    , n = 1
    , o = 2;
TD.utils.downloadFile = function (a, b, c) {
    var d = new XMLHttpRequest;
    d.open("GET", a),
        d.responseType = "arraybuffer",
        d.onload = function () {
            if (200 === this.status) {
                var a = new Uint8Array(this.response);
                c(!0, a)
            } else
                c(!1)
        }
        ,
        d.send()
}
    ;
var p = function (a, b) {
    var c, d = new FileReader;
    d.addEventListener("loadend", function () {
        c = this.result;
        var a = new Uint8Array(c);
        b(a)
    }),
        d.readAsArrayBuffer(a)
};
TD.utils.downloadUrl = function (a) {
    var b = document.createElement("iframe");
    b.setAttribute("src", a),
        b.style.display = "none",
        b.onload = function () {
            this.parentNode.removeChild(this)
        }
        ,
        document.body.appendChild(b)
}
    ,
    TD.Signer = function () {
        this.useCaServer = null,
            this.dataType = TD.Signer.DataTypes.XML,
            this.data = null,
            this.key = null,
            this.allowConvert = !1,
            this.fileExtension = null,
            this.staUrl = null,
            this.onError = null,
            this.onClose = null,
            this.done = null,
            this.onConverted = null,
            this.useCaServer = null,
            this.customSignatureOnly = null,
            this.options = null,
            this._fireOnError = function (a) {
                this.onError && this.onError(a)
            }
            ,
            this._fireOnClose = function () {
                this.onClose && this.onClose()
            }
            ,
            this._fireDone = function (a) {
                this.done && this.done(a)
            }
    }
    ,
    TD.Signer.prototype = {
        sign: function () {
            function q(g) {
                var h = this;
                h.onmessage = r,
                    p(g.data, function (g) {
                        switch (g[0]) {
                            case a:
                                h.send(w.key);
                                break;
                            case c:
                                w._fireOnError(TD.Signer.ErrorCode.notActivated);
                                break;
                            case d:
                                w._fireOnError(TD.Signer.ErrorCode.securityBlocked);
                                break;
                            case e:
                            case f:
                                w._fireOnError(TD.Signer.ErrorCode.unknowFileType);
                                break;
                            case b:
                            default:
                                w._fireOnError(TD.Signer.ErrorCode.unknowError)
                        }
                    })
            }
            function r(a) {
                var b = this;
                w.allowConvert ? b.onmessage = s : b.onmessage = u,
                    p(a.data, function (a) {
                        switch (a[0]) {
                            case g:
                                b.send(w.data);
                                break;
                            case h:
                                w._fireOnError(TD.Signer.ErrorCode.invalidKey);
                                break;
                            default:
                                w._fireOnError(TD.Signer.ErrorCode.unknowError)
                        }
                    })
            }
            function s(a) {
                this.onmessage = t,
                    p(a.data, function (a) {
                        switch (a[0]) {
                            case m:
                            case n:
                                break;
                            case o:
                                w._fireOnError(TD.Signer.ErrorCode.convertError);
                                break;
                            default:
                                w._fireOnError(TD.Signer.ErrorCode.unknowError)
                        }
                    })
            }
            function t(a) {
                this.onmessage = u,
                    this.onConverted && this.onConverted({
                        extension: a.data
                    })
            }
            function u(a) {
                this.onmessage = v;
                p(a.data, function (a) {
                    switch (a[0]) {
                        case i:
                            break;
                        case j:
                            w._fireOnError(TD.Signer.ErrorCode.canceled);
                            break;
                        case k:
                            w._fireOnError(TD.Signer.ErrorCode.invalidCertificate);
                            break;
                        case l:
                            w._fireOnError(TD.Signer.ErrorCode.certificateNotFound);
                            break;
                        default:
                            w._fireOnError(TD.Signer.ErrorCode.unknowError)
                    }
                })
            }
            function v(a) {
                w._fireDone(a.data)
            }
            var w = this
                , x = !1;
            if (!w.data)
                return void w._fireOnError(TD.Signer.ErrorCode.noData);
            var y = w.options || {};
            if (w.appInfo)
                for (var z in w.appInfo)
                    w.appInfo.hasOwnProperty(z) && (y[z] = w.appInfo[z]);
            var A;
            try {
                A = new WebSocket("ws://127.0.0.1:7802", "sign"),
                    A.onerror = function (a) {
                        x || w._fireOnError(TD.Signer.ErrorCode.connectionError)
                    }
                    ,
                    A.onmessage = function (a) {
                        switch (a.data) {
                            case "1":
                                var b = new Uint8Array(2);
                                b[0] |= 16,
                                    b[0] |= w.dataType,
                                    w.useCaServer && (b[0] |= 128),
                                    w.key && (b[0] |= 64),
                                    w.allowConvert && (b[0] |= 32),
                                    w.additionalSignature && (b[1] |= 1),
                                    w.customSignatureOnly && (b[1] |= 2),
                                    A.onmessage = q,
                                    A.send(b);
                                var c = y ? JSON.stringify(y) : null;
                                A.send(c || ""),
                                    w.allowConvert && A.send(w.fileExtension || ""),
                                    w.additionalSignature && A.send(w.additionalSignature || "");
                                break;
                            case "2":
                                w._fireOnError(TD.Signer.ErrorCode.unknowProtocol);
                                break;
                            case "3":
                                w._fireOnError(TD.Signer.ErrorCode.securityBlocked)
                        }
                    }
                    ,
                    A.onopen = function (a) {
                        x = !0
                    }
                    ,
                    A.onclose = function () {
                        w._fireOnClose()
                    }
            } catch (a) {
                x || w._fireOnError(TD.Signer.ErrorCode.connectionError)
            }
        },
        getCert: function (a) {
            return new Promise(function (b, c) {
                try {
                    var d = function (a) {
                        b(JSON.parse(a.data))
                    };
                    mSocket = new WebSocket("ws://127.0.0.1:7802?get=" + encodeURIComponent(a), "getcert"),
                        mSocket.onerror = c,
                        mSocket.onmessage = function (a) {
                            "1" == a.data ? mSocket.onmessage = d : c("")
                        }
                } catch (a) {
                    c(a)
                }
            }
            )
        }
    },
    TD.Signer.ErrorCode = {
        unknowProtocol: 1,
        securityBlocked: 2,
        invalidStaUrl: 3,
        noData: 4,
        canceled: 5,
        invalidCertificate: 6,
        connectionError: 7,
        unknowDataType: 8,
        unknowFileType: 8,
        notActivated: 9,
        invalidKey: 10,
        convertError: 11,
        certificateNotFound: 12,
        unknowError: 15
    },
    TD.Signer.DataTypes = {
        XML: 1,
        PDF: 2,
        MS_OFFICE: 3
    },
    TD.Signer.downloadClient = function () {
        TD.utils.downloadUrl("https://tandan.com.vn/download/esign/v1.1/latest/esign-setup.zip")
    }
//# sourceMappingURL=td.esign.min.js.map
export {TD}