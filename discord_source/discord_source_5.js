webpackJsonp([105], {
    617: function(e, r, t) {
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
        var f = function(e) {
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
                }), l("polygon", {
                    className: r,
                    fill: t,
                    fillRule: "nonzero",
                    points: "13 4.16 11 4.16 11 16.16 5.5 10.66 4.08 12.08 12 20 19.92 12.08 18.5 10.66 13 16.16"
                }))
            }
            ,
            r
        }(i.PureComponent);
        f.defaultProps = {
            width: 24,
            height: 24,
            color: "currentColor"
        },
        r.default = f,
        e.exports = r.default
    }
});
//# sourceMappingURL=105.0401de3c6e87a955c119.js.map
