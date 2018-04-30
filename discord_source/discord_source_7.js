webpackJsonp([11], {
    711: function(e, r, t) {
        "use strict";
        r.__esModule = !0;
        var o, n = Object.assign || function(e) {
            for (var r = 1; r < arguments.length; r++) {
                var t = arguments[r];
                for (var o in t)
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
            }
            return e
        }
        , l = (o = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
        function(e, r, t, n) {
            var l = e && e.defaultProps
              , i = arguments.length - 3;
            if (r || 0 === i || (r = {}),
            r && l)
                for (var f in l)
                    void 0 === r[f] && (r[f] = l[f]);
            else
                r || (r = l || {});
            if (1 === i)
                r.children = n;
            else if (i > 1) {
                for (var u = Array(i), a = 0; a < i; a++)
                    u[a] = arguments[a + 3];
                r.children = u
            }
            return {
                $$typeof: o,
                type: e,
                key: void 0 === t ? null : "" + t,
                ref: null,
                props: r,
                _owner: null
            }
        }
        ), i = function(e) {
            if (e && e.__esModule)
                return e;
            var r = {};
            if (null != e)
                for (var t in e)
                    Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
            return r.default = e,
            r
        }(t(3));
        var f = l("polygon", {
            points: "0 0 24 0 24 24 0 24"
        })
          , u = l("rect", {
            width: "24",
            height: "24"
        })
          , a = function(e) {
            function r() {
                return function(e, r) {
                    if (!(e instanceof r))
                        throw new TypeError("Cannot call a class as a function")
                }(this, r),
                function(e, r) {
                    if (!e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !r || "object" != typeof r && "function" != typeof r ? e : r
                }(this, e.apply(this, arguments))
            }
            return function(e, r) {
                if ("function" != typeof r && null !== r)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
                e.prototype = Object.create(r && r.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r)
            }(r, e),
            r.prototype.render = function() {
                var e = this.props
                  , r = e.foreground
                  , t = e.color
                  , o = function(e, r) {
                    var t = {};
                    for (var o in e)
                        r.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }(e, ["foreground", "color"]);
                return i.createElement("svg", n({}, o, {
                    viewBox: "0 0 24 24"
                }), l("g", {
                    fill: "none",
                    fillRule: "evenodd"
                }, void 0, f, l("path", {
                    className: r,
                    fill: t,
                    fillRule: "nonzero",
                    d: "M17,10.5 L17,7 C17,6.45 16.55,6 16,6 L4,6 C3.45,6 3,6.45 3,7 L3,17 C3,17.55 3.45,18 4,18 L16,18 C16.55,18 17,17.55 17,17 L17,13.5 L21,17.5 L21,6.5 L17,10.5 Z"
                }), u))
            }
            ,
            r
        }(i.PureComponent);
        a.defaultProps = {
            width: 16,
            height: 16,
            color: "currentColor"
        },
        r.default = a,
        e.exports = r.default
    }
});
//# sourceMappingURL=11.de3c2073b5b62b7db259.js.map
