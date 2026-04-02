function Rg(t, r) {
  for (var o = 0; o < r.length; o++) {
    const l = r[o]
    if (typeof l != 'string' && !Array.isArray(l)) {
      for (const a in l)
        if (a !== 'default' && !(a in t)) {
          const d = Object.getOwnPropertyDescriptor(l, a)
          d && Object.defineProperty(t, a, d.get ? d : { enumerable: !0, get: () => l[a] })
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }))
}
var SE =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof global < 'u'
        ? global
        : typeof self < 'u'
          ? self
          : {}
function jg(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t
}
var Va = { exports: {} },
  Fi = {},
  Na = { exports: {} },
  se = {}
var rh
function _g() {
  if (rh) return se
  rh = 1
  var t = Symbol.for('react.element'),
    r = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    l = Symbol.for('react.strict_mode'),
    a = Symbol.for('react.profiler'),
    d = Symbol.for('react.provider'),
    f = Symbol.for('react.context'),
    y = Symbol.for('react.forward_ref'),
    h = Symbol.for('react.suspense'),
    p = Symbol.for('react.memo'),
    g = Symbol.for('react.lazy'),
    k = Symbol.iterator
  function E(T) {
    return T === null || typeof T != 'object'
      ? null
      : ((T = (k && T[k]) || T['@@iterator']), typeof T == 'function' ? T : null)
  }
  var S = {
      isMounted: function () {
        return !1
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    C = Object.assign,
    A = {}
  function P(T, W, ie) {
    ;((this.props = T), (this.context = W), (this.refs = A), (this.updater = ie || S))
  }
  ;((P.prototype.isReactComponent = {}),
    (P.prototype.setState = function (T, W) {
      if (typeof T != 'object' && typeof T != 'function' && T != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        )
      this.updater.enqueueSetState(this, T, W, 'setState')
    }),
    (P.prototype.forceUpdate = function (T) {
      this.updater.enqueueForceUpdate(this, T, 'forceUpdate')
    }))
  function D() {}
  D.prototype = P.prototype
  function V(T, W, ie) {
    ;((this.props = T), (this.context = W), (this.refs = A), (this.updater = ie || S))
  }
  var F = (V.prototype = new D())
  ;((F.constructor = V), C(F, P.prototype), (F.isPureReactComponent = !0))
  var z = Array.isArray,
    H = Object.prototype.hasOwnProperty,
    q = { current: null },
    re = { key: !0, ref: !0, __self: !0, __source: !0 }
  function Q(T, W, ie) {
    var le,
      ue = {},
      ce = null,
      ge = null
    if (W != null)
      for (le in (W.ref !== void 0 && (ge = W.ref), W.key !== void 0 && (ce = '' + W.key), W))
        H.call(W, le) && !re.hasOwnProperty(le) && (ue[le] = W[le])
    var he = arguments.length - 2
    if (he === 1) ue.children = ie
    else if (1 < he) {
      for (var xe = Array(he), ut = 0; ut < he; ut++) xe[ut] = arguments[ut + 2]
      ue.children = xe
    }
    if (T && T.defaultProps)
      for (le in ((he = T.defaultProps), he)) ue[le] === void 0 && (ue[le] = he[le])
    return { $$typeof: t, type: T, key: ce, ref: ge, props: ue, _owner: q.current }
  }
  function me(T, W) {
    return { $$typeof: t, type: T.type, key: W, ref: T.ref, props: T.props, _owner: T._owner }
  }
  function de(T) {
    return typeof T == 'object' && T !== null && T.$$typeof === t
  }
  function Fe(T) {
    var W = { '=': '=0', ':': '=2' }
    return (
      '$' +
      T.replace(/[=:]/g, function (ie) {
        return W[ie]
      })
    )
  }
  var Ge = /\/+/g
  function Ie(T, W) {
    return typeof T == 'object' && T !== null && T.key != null ? Fe('' + T.key) : W.toString(36)
  }
  function He(T, W, ie, le, ue) {
    var ce = typeof T
    ;(ce === 'undefined' || ce === 'boolean') && (T = null)
    var ge = !1
    if (T === null) ge = !0
    else
      switch (ce) {
        case 'string':
        case 'number':
          ge = !0
          break
        case 'object':
          switch (T.$$typeof) {
            case t:
            case r:
              ge = !0
          }
      }
    if (ge)
      return (
        (ge = T),
        (ue = ue(ge)),
        (T = le === '' ? '.' + Ie(ge, 0) : le),
        z(ue)
          ? ((ie = ''),
            T != null && (ie = T.replace(Ge, '$&/') + '/'),
            He(ue, W, ie, '', function (ut) {
              return ut
            }))
          : ue != null &&
            (de(ue) &&
              (ue = me(
                ue,
                ie +
                  (!ue.key || (ge && ge.key === ue.key)
                    ? ''
                    : ('' + ue.key).replace(Ge, '$&/') + '/') +
                  T
              )),
            W.push(ue)),
        1
      )
    if (((ge = 0), (le = le === '' ? '.' : le + ':'), z(T)))
      for (var he = 0; he < T.length; he++) {
        ce = T[he]
        var xe = le + Ie(ce, he)
        ge += He(ce, W, ie, xe, ue)
      }
    else if (((xe = E(T)), typeof xe == 'function'))
      for (T = xe.call(T), he = 0; !(ce = T.next()).done; )
        ((ce = ce.value), (xe = le + Ie(ce, he++)), (ge += He(ce, W, ie, xe, ue)))
    else if (ce === 'object')
      throw (
        (W = String(T)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (W === '[object Object]' ? 'object with keys {' + Object.keys(T).join(', ') + '}' : W) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      )
    return ge
  }
  function at(T, W, ie) {
    if (T == null) return T
    var le = [],
      ue = 0
    return (
      He(T, le, '', '', function (ce) {
        return W.call(ie, ce, ue++)
      }),
      le
    )
  }
  function Xe(T) {
    if (T._status === -1) {
      var W = T._result
      ;((W = W()),
        W.then(
          function (ie) {
            ;(T._status === 0 || T._status === -1) && ((T._status = 1), (T._result = ie))
          },
          function (ie) {
            ;(T._status === 0 || T._status === -1) && ((T._status = 2), (T._result = ie))
          }
        ),
        T._status === -1 && ((T._status = 0), (T._result = W)))
    }
    if (T._status === 1) return T._result.default
    throw T._result
  }
  var oe = { current: null },
    U = { transition: null },
    X = { ReactCurrentDispatcher: oe, ReactCurrentBatchConfig: U, ReactCurrentOwner: q }
  function K() {
    throw Error('act(...) is not supported in production builds of React.')
  }
  return (
    (se.Children = {
      map: at,
      forEach: function (T, W, ie) {
        at(
          T,
          function () {
            W.apply(this, arguments)
          },
          ie
        )
      },
      count: function (T) {
        var W = 0
        return (
          at(T, function () {
            W++
          }),
          W
        )
      },
      toArray: function (T) {
        return (
          at(T, function (W) {
            return W
          }) || []
        )
      },
      only: function (T) {
        if (!de(T))
          throw Error('React.Children.only expected to receive a single React element child.')
        return T
      },
    }),
    (se.Component = P),
    (se.Fragment = o),
    (se.Profiler = a),
    (se.PureComponent = V),
    (se.StrictMode = l),
    (se.Suspense = h),
    (se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = X),
    (se.act = K),
    (se.cloneElement = function (T, W, ie) {
      if (T == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' + T + '.'
        )
      var le = C({}, T.props),
        ue = T.key,
        ce = T.ref,
        ge = T._owner
      if (W != null) {
        if (
          (W.ref !== void 0 && ((ce = W.ref), (ge = q.current)),
          W.key !== void 0 && (ue = '' + W.key),
          T.type && T.type.defaultProps)
        )
          var he = T.type.defaultProps
        for (xe in W)
          H.call(W, xe) &&
            !re.hasOwnProperty(xe) &&
            (le[xe] = W[xe] === void 0 && he !== void 0 ? he[xe] : W[xe])
      }
      var xe = arguments.length - 2
      if (xe === 1) le.children = ie
      else if (1 < xe) {
        he = Array(xe)
        for (var ut = 0; ut < xe; ut++) he[ut] = arguments[ut + 2]
        le.children = he
      }
      return { $$typeof: t, type: T.type, key: ue, ref: ce, props: le, _owner: ge }
    }),
    (se.createContext = function (T) {
      return (
        (T = {
          $$typeof: f,
          _currentValue: T,
          _currentValue2: T,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (T.Provider = { $$typeof: d, _context: T }),
        (T.Consumer = T)
      )
    }),
    (se.createElement = Q),
    (se.createFactory = function (T) {
      var W = Q.bind(null, T)
      return ((W.type = T), W)
    }),
    (se.createRef = function () {
      return { current: null }
    }),
    (se.forwardRef = function (T) {
      return { $$typeof: y, render: T }
    }),
    (se.isValidElement = de),
    (se.lazy = function (T) {
      return { $$typeof: g, _payload: { _status: -1, _result: T }, _init: Xe }
    }),
    (se.memo = function (T, W) {
      return { $$typeof: p, type: T, compare: W === void 0 ? null : W }
    }),
    (se.startTransition = function (T) {
      var W = U.transition
      U.transition = {}
      try {
        T()
      } finally {
        U.transition = W
      }
    }),
    (se.unstable_act = K),
    (se.useCallback = function (T, W) {
      return oe.current.useCallback(T, W)
    }),
    (se.useContext = function (T) {
      return oe.current.useContext(T)
    }),
    (se.useDebugValue = function () {}),
    (se.useDeferredValue = function (T) {
      return oe.current.useDeferredValue(T)
    }),
    (se.useEffect = function (T, W) {
      return oe.current.useEffect(T, W)
    }),
    (se.useId = function () {
      return oe.current.useId()
    }),
    (se.useImperativeHandle = function (T, W, ie) {
      return oe.current.useImperativeHandle(T, W, ie)
    }),
    (se.useInsertionEffect = function (T, W) {
      return oe.current.useInsertionEffect(T, W)
    }),
    (se.useLayoutEffect = function (T, W) {
      return oe.current.useLayoutEffect(T, W)
    }),
    (se.useMemo = function (T, W) {
      return oe.current.useMemo(T, W)
    }),
    (se.useReducer = function (T, W, ie) {
      return oe.current.useReducer(T, W, ie)
    }),
    (se.useRef = function (T) {
      return oe.current.useRef(T)
    }),
    (se.useState = function (T) {
      return oe.current.useState(T)
    }),
    (se.useSyncExternalStore = function (T, W, ie) {
      return oe.current.useSyncExternalStore(T, W, ie)
    }),
    (se.useTransition = function () {
      return oe.current.useTransition()
    }),
    (se.version = '18.3.1'),
    se
  )
}
var ih
function Su() {
  return (ih || ((ih = 1), (Na.exports = _g())), Na.exports)
}
var oh
function Fg() {
  if (oh) return Fi
  oh = 1
  var t = Su(),
    r = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    l = Object.prototype.hasOwnProperty,
    a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    d = { key: !0, ref: !0, __self: !0, __source: !0 }
  function f(y, h, p) {
    var g,
      k = {},
      E = null,
      S = null
    ;(p !== void 0 && (E = '' + p),
      h.key !== void 0 && (E = '' + h.key),
      h.ref !== void 0 && (S = h.ref))
    for (g in h) l.call(h, g) && !d.hasOwnProperty(g) && (k[g] = h[g])
    if (y && y.defaultProps) for (g in ((h = y.defaultProps), h)) k[g] === void 0 && (k[g] = h[g])
    return { $$typeof: r, type: y, key: E, ref: S, props: k, _owner: a.current }
  }
  return ((Fi.Fragment = o), (Fi.jsx = f), (Fi.jsxs = f), Fi)
}
var sh
function Dg() {
  return (sh || ((sh = 1), (Va.exports = Fg())), Va.exports)
}
var tu = Dg(),
  _ = Su()
const m = jg(_),
  Vg = Rg({ __proto__: null, default: m }, [_])
var hs = {},
  Wa = { exports: {} },
  st = {},
  Oa = { exports: {} },
  Ia = {}
var lh
function Ng() {
  return (
    lh ||
      ((lh = 1),
      (function (t) {
        function r(U, X) {
          var K = U.length
          U.push(X)
          e: for (; 0 < K; ) {
            var T = (K - 1) >>> 1,
              W = U[T]
            if (0 < a(W, X)) ((U[T] = X), (U[K] = W), (K = T))
            else break e
          }
        }
        function o(U) {
          return U.length === 0 ? null : U[0]
        }
        function l(U) {
          if (U.length === 0) return null
          var X = U[0],
            K = U.pop()
          if (K !== X) {
            U[0] = K
            e: for (var T = 0, W = U.length, ie = W >>> 1; T < ie; ) {
              var le = 2 * (T + 1) - 1,
                ue = U[le],
                ce = le + 1,
                ge = U[ce]
              if (0 > a(ue, K))
                ce < W && 0 > a(ge, ue)
                  ? ((U[T] = ge), (U[ce] = K), (T = ce))
                  : ((U[T] = ue), (U[le] = K), (T = le))
              else if (ce < W && 0 > a(ge, K)) ((U[T] = ge), (U[ce] = K), (T = ce))
              else break e
            }
          }
          return X
        }
        function a(U, X) {
          var K = U.sortIndex - X.sortIndex
          return K !== 0 ? K : U.id - X.id
        }
        if (typeof performance == 'object' && typeof performance.now == 'function') {
          var d = performance
          t.unstable_now = function () {
            return d.now()
          }
        } else {
          var f = Date,
            y = f.now()
          t.unstable_now = function () {
            return f.now() - y
          }
        }
        var h = [],
          p = [],
          g = 1,
          k = null,
          E = 3,
          S = !1,
          C = !1,
          A = !1,
          P = typeof setTimeout == 'function' ? setTimeout : null,
          D = typeof clearTimeout == 'function' ? clearTimeout : null,
          V = typeof setImmediate < 'u' ? setImmediate : null
        typeof navigator < 'u' &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling)
        function F(U) {
          for (var X = o(p); X !== null; ) {
            if (X.callback === null) l(p)
            else if (X.startTime <= U) (l(p), (X.sortIndex = X.expirationTime), r(h, X))
            else break
            X = o(p)
          }
        }
        function z(U) {
          if (((A = !1), F(U), !C))
            if (o(h) !== null) ((C = !0), Xe(H))
            else {
              var X = o(p)
              X !== null && oe(z, X.startTime - U)
            }
        }
        function H(U, X) {
          ;((C = !1), A && ((A = !1), D(Q), (Q = -1)), (S = !0))
          var K = E
          try {
            for (F(X), k = o(h); k !== null && (!(k.expirationTime > X) || (U && !Fe())); ) {
              var T = k.callback
              if (typeof T == 'function') {
                ;((k.callback = null), (E = k.priorityLevel))
                var W = T(k.expirationTime <= X)
                ;((X = t.unstable_now()),
                  typeof W == 'function' ? (k.callback = W) : k === o(h) && l(h),
                  F(X))
              } else l(h)
              k = o(h)
            }
            if (k !== null) var ie = !0
            else {
              var le = o(p)
              ;(le !== null && oe(z, le.startTime - X), (ie = !1))
            }
            return ie
          } finally {
            ;((k = null), (E = K), (S = !1))
          }
        }
        var q = !1,
          re = null,
          Q = -1,
          me = 5,
          de = -1
        function Fe() {
          return !(t.unstable_now() - de < me)
        }
        function Ge() {
          if (re !== null) {
            var U = t.unstable_now()
            de = U
            var X = !0
            try {
              X = re(!0, U)
            } finally {
              X ? Ie() : ((q = !1), (re = null))
            }
          } else q = !1
        }
        var Ie
        if (typeof V == 'function')
          Ie = function () {
            V(Ge)
          }
        else if (typeof MessageChannel < 'u') {
          var He = new MessageChannel(),
            at = He.port2
          ;((He.port1.onmessage = Ge),
            (Ie = function () {
              at.postMessage(null)
            }))
        } else
          Ie = function () {
            P(Ge, 0)
          }
        function Xe(U) {
          ;((re = U), q || ((q = !0), Ie()))
        }
        function oe(U, X) {
          Q = P(function () {
            U(t.unstable_now())
          }, X)
        }
        ;((t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (U) {
            U.callback = null
          }),
          (t.unstable_continueExecution = function () {
            C || S || ((C = !0), Xe(H))
          }),
          (t.unstable_forceFrameRate = function (U) {
            0 > U || 125 < U
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (me = 0 < U ? Math.floor(1e3 / U) : 5)
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return E
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return o(h)
          }),
          (t.unstable_next = function (U) {
            switch (E) {
              case 1:
              case 2:
              case 3:
                var X = 3
                break
              default:
                X = E
            }
            var K = E
            E = X
            try {
              return U()
            } finally {
              E = K
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (U, X) {
            switch (U) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break
              default:
                U = 3
            }
            var K = E
            E = U
            try {
              return X()
            } finally {
              E = K
            }
          }),
          (t.unstable_scheduleCallback = function (U, X, K) {
            var T = t.unstable_now()
            switch (
              (typeof K == 'object' && K !== null
                ? ((K = K.delay), (K = typeof K == 'number' && 0 < K ? T + K : T))
                : (K = T),
              U)
            ) {
              case 1:
                var W = -1
                break
              case 2:
                W = 250
                break
              case 5:
                W = 1073741823
                break
              case 4:
                W = 1e4
                break
              default:
                W = 5e3
            }
            return (
              (W = K + W),
              (U = {
                id: g++,
                callback: X,
                priorityLevel: U,
                startTime: K,
                expirationTime: W,
                sortIndex: -1,
              }),
              K > T
                ? ((U.sortIndex = K),
                  r(p, U),
                  o(h) === null && U === o(p) && (A ? (D(Q), (Q = -1)) : (A = !0), oe(z, K - T)))
                : ((U.sortIndex = W), r(h, U), C || S || ((C = !0), Xe(H))),
              U
            )
          }),
          (t.unstable_shouldYield = Fe),
          (t.unstable_wrapCallback = function (U) {
            var X = E
            return function () {
              var K = E
              E = X
              try {
                return U.apply(this, arguments)
              } finally {
                E = K
              }
            }
          }))
      })(Ia)),
    Ia
  )
}
var ah
function Wg() {
  return (ah || ((ah = 1), (Oa.exports = Ng())), Oa.exports)
}
var uh
function Og() {
  if (uh) return st
  uh = 1
  var t = Su(),
    r = Wg()
  function o(e) {
    for (
      var n = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, i = 1;
      i < arguments.length;
      i++
    )
      n += '&args[]=' + encodeURIComponent(arguments[i])
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      n +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    )
  }
  var l = new Set(),
    a = {}
  function d(e, n) {
    ;(f(e, n), f(e + 'Capture', n))
  }
  function f(e, n) {
    for (a[e] = n, e = 0; e < n.length; e++) l.add(n[e])
  }
  var y = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    h = Object.prototype.hasOwnProperty,
    p =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    g = {},
    k = {}
  function E(e) {
    return h.call(k, e) ? !0 : h.call(g, e) ? !1 : p.test(e) ? (k[e] = !0) : ((g[e] = !0), !1)
  }
  function S(e, n, i, s) {
    if (i !== null && i.type === 0) return !1
    switch (typeof n) {
      case 'function':
      case 'symbol':
        return !0
      case 'boolean':
        return s
          ? !1
          : i !== null
            ? !i.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-')
      default:
        return !1
    }
  }
  function C(e, n, i, s) {
    if (n === null || typeof n > 'u' || S(e, n, i, s)) return !0
    if (s) return !1
    if (i !== null)
      switch (i.type) {
        case 3:
          return !n
        case 4:
          return n === !1
        case 5:
          return isNaN(n)
        case 6:
          return isNaN(n) || 1 > n
      }
    return !1
  }
  function A(e, n, i, s, u, c, v) {
    ;((this.acceptsBooleans = n === 2 || n === 3 || n === 4),
      (this.attributeName = s),
      (this.attributeNamespace = u),
      (this.mustUseProperty = i),
      (this.propertyName = e),
      (this.type = n),
      (this.sanitizeURL = c),
      (this.removeEmptyString = v))
  }
  var P = {}
  ;('children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (e) {
      P[e] = new A(e, 0, !1, e, null, !1, !1)
    }),
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (e) {
      var n = e[0]
      P[n] = new A(n, 1, !1, e[1], null, !1, !1)
    }),
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
      P[e] = new A(e, 2, !1, e.toLowerCase(), null, !1, !1)
    }),
    ['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(
      function (e) {
        P[e] = new A(e, 2, !1, e, null, !1, !1)
      }
    ),
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (e) {
        P[e] = new A(e, 3, !1, e.toLowerCase(), null, !1, !1)
      }),
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
      P[e] = new A(e, 3, !0, e, null, !1, !1)
    }),
    ['capture', 'download'].forEach(function (e) {
      P[e] = new A(e, 4, !1, e, null, !1, !1)
    }),
    ['cols', 'rows', 'size', 'span'].forEach(function (e) {
      P[e] = new A(e, 6, !1, e, null, !1, !1)
    }),
    ['rowSpan', 'start'].forEach(function (e) {
      P[e] = new A(e, 5, !1, e.toLowerCase(), null, !1, !1)
    }))
  var D = /[\-:]([a-z])/g
  function V(e) {
    return e[1].toUpperCase()
  }
  ;('accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (e) {
      var n = e.replace(D, V)
      P[n] = new A(n, 1, !1, e, null, !1, !1)
    }),
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (e) {
        var n = e.replace(D, V)
        P[n] = new A(n, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1)
      }),
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
      var n = e.replace(D, V)
      P[n] = new A(n, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1)
    }),
    ['tabIndex', 'crossOrigin'].forEach(function (e) {
      P[e] = new A(e, 1, !1, e.toLowerCase(), null, !1, !1)
    }),
    (P.xlinkHref = new A('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1)),
    ['src', 'href', 'action', 'formAction'].forEach(function (e) {
      P[e] = new A(e, 1, !1, e.toLowerCase(), null, !0, !0)
    }))
  function F(e, n, i, s) {
    var u = P.hasOwnProperty(n) ? P[n] : null
    ;(u !== null
      ? u.type !== 0
      : s || !(2 < n.length) || (n[0] !== 'o' && n[0] !== 'O') || (n[1] !== 'n' && n[1] !== 'N')) &&
      (C(n, i, u, s) && (i = null),
      s || u === null
        ? E(n) && (i === null ? e.removeAttribute(n) : e.setAttribute(n, '' + i))
        : u.mustUseProperty
          ? (e[u.propertyName] = i === null ? (u.type === 3 ? !1 : '') : i)
          : ((n = u.attributeName),
            (s = u.attributeNamespace),
            i === null
              ? e.removeAttribute(n)
              : ((u = u.type),
                (i = u === 3 || (u === 4 && i === !0) ? '' : '' + i),
                s ? e.setAttributeNS(s, n, i) : e.setAttribute(n, i))))
  }
  var z = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    H = Symbol.for('react.element'),
    q = Symbol.for('react.portal'),
    re = Symbol.for('react.fragment'),
    Q = Symbol.for('react.strict_mode'),
    me = Symbol.for('react.profiler'),
    de = Symbol.for('react.provider'),
    Fe = Symbol.for('react.context'),
    Ge = Symbol.for('react.forward_ref'),
    Ie = Symbol.for('react.suspense'),
    He = Symbol.for('react.suspense_list'),
    at = Symbol.for('react.memo'),
    Xe = Symbol.for('react.lazy'),
    oe = Symbol.for('react.offscreen'),
    U = Symbol.iterator
  function X(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (U && e[U]) || e['@@iterator']), typeof e == 'function' ? e : null)
  }
  var K = Object.assign,
    T
  function W(e) {
    if (T === void 0)
      try {
        throw Error()
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/)
        T = (n && n[1]) || ''
      }
    return (
      `
` +
      T +
      e
    )
  }
  var ie = !1
  function le(e, n) {
    if (!e || ie) return ''
    ie = !0
    var i = Error.prepareStackTrace
    Error.prepareStackTrace = void 0
    try {
      if (n)
        if (
          ((n = function () {
            throw Error()
          }),
          Object.defineProperty(n.prototype, 'props', {
            set: function () {
              throw Error()
            },
          }),
          typeof Reflect == 'object' && Reflect.construct)
        ) {
          try {
            Reflect.construct(n, [])
          } catch (j) {
            var s = j
          }
          Reflect.construct(e, [], n)
        } else {
          try {
            n.call()
          } catch (j) {
            s = j
          }
          e.call(n.prototype)
        }
      else {
        try {
          throw Error()
        } catch (j) {
          s = j
        }
        e()
      }
    } catch (j) {
      if (j && s && typeof j.stack == 'string') {
        for (
          var u = j.stack.split(`
`),
            c = s.stack.split(`
`),
            v = u.length - 1,
            x = c.length - 1;
          1 <= v && 0 <= x && u[v] !== c[x];

        )
          x--
        for (; 1 <= v && 0 <= x; v--, x--)
          if (u[v] !== c[x]) {
            if (v !== 1 || x !== 1)
              do
                if ((v--, x--, 0 > x || u[v] !== c[x])) {
                  var w =
                    `
` + u[v].replace(' at new ', ' at ')
                  return (
                    e.displayName &&
                      w.includes('<anonymous>') &&
                      (w = w.replace('<anonymous>', e.displayName)),
                    w
                  )
                }
              while (1 <= v && 0 <= x)
            break
          }
      }
    } finally {
      ;((ie = !1), (Error.prepareStackTrace = i))
    }
    return (e = e ? e.displayName || e.name : '') ? W(e) : ''
  }
  function ue(e) {
    switch (e.tag) {
      case 5:
        return W(e.type)
      case 16:
        return W('Lazy')
      case 13:
        return W('Suspense')
      case 19:
        return W('SuspenseList')
      case 0:
      case 2:
      case 15:
        return ((e = le(e.type, !1)), e)
      case 11:
        return ((e = le(e.type.render, !1)), e)
      case 1:
        return ((e = le(e.type, !0)), e)
      default:
        return ''
    }
  }
  function ce(e) {
    if (e == null) return null
    if (typeof e == 'function') return e.displayName || e.name || null
    if (typeof e == 'string') return e
    switch (e) {
      case re:
        return 'Fragment'
      case q:
        return 'Portal'
      case me:
        return 'Profiler'
      case Q:
        return 'StrictMode'
      case Ie:
        return 'Suspense'
      case He:
        return 'SuspenseList'
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Fe:
          return (e.displayName || 'Context') + '.Consumer'
        case de:
          return (e._context.displayName || 'Context') + '.Provider'
        case Ge:
          var n = e.render
          return (
            (e = e.displayName),
            e ||
              ((e = n.displayName || n.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          )
        case at:
          return ((n = e.displayName || null), n !== null ? n : ce(e.type) || 'Memo')
        case Xe:
          ;((n = e._payload), (e = e._init))
          try {
            return ce(e(n))
          } catch {}
      }
    return null
  }
  function ge(e) {
    var n = e.type
    switch (e.tag) {
      case 24:
        return 'Cache'
      case 9:
        return (n.displayName || 'Context') + '.Consumer'
      case 10:
        return (n._context.displayName || 'Context') + '.Provider'
      case 18:
        return 'DehydratedFragment'
      case 11:
        return (
          (e = n.render),
          (e = e.displayName || e.name || ''),
          n.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
        )
      case 7:
        return 'Fragment'
      case 5:
        return n
      case 4:
        return 'Portal'
      case 3:
        return 'Root'
      case 6:
        return 'Text'
      case 16:
        return ce(n)
      case 8:
        return n === Q ? 'StrictMode' : 'Mode'
      case 22:
        return 'Offscreen'
      case 12:
        return 'Profiler'
      case 21:
        return 'Scope'
      case 13:
        return 'Suspense'
      case 19:
        return 'SuspenseList'
      case 25:
        return 'TracingMarker'
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof n == 'function') return n.displayName || n.name || null
        if (typeof n == 'string') return n
    }
    return null
  }
  function he(e) {
    switch (typeof e) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e
      case 'object':
        return e
      default:
        return ''
    }
  }
  function xe(e) {
    var n = e.type
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (n === 'checkbox' || n === 'radio')
  }
  function ut(e) {
    var n = xe(e) ? 'checked' : 'value',
      i = Object.getOwnPropertyDescriptor(e.constructor.prototype, n),
      s = '' + e[n]
    if (
      !e.hasOwnProperty(n) &&
      typeof i < 'u' &&
      typeof i.get == 'function' &&
      typeof i.set == 'function'
    ) {
      var u = i.get,
        c = i.set
      return (
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function () {
            return u.call(this)
          },
          set: function (v) {
            ;((s = '' + v), c.call(this, v))
          },
        }),
        Object.defineProperty(e, n, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return s
          },
          setValue: function (v) {
            s = '' + v
          },
          stopTracking: function () {
            ;((e._valueTracker = null), delete e[n])
          },
        }
      )
    }
  }
  function no(e) {
    e._valueTracker || (e._valueTracker = ut(e))
  }
  function ac(e) {
    if (!e) return !1
    var n = e._valueTracker
    if (!n) return !0
    var i = n.getValue(),
      s = ''
    return (
      e && (s = xe(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = s),
      e !== i ? (n.setValue(e), !0) : !1
    )
  }
  function ro(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null
    try {
      return e.activeElement || e.body
    } catch {
      return e.body
    }
  }
  function Us(e, n) {
    var i = n.checked
    return K({}, n, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: i ?? e._wrapperState.initialChecked,
    })
  }
  function uc(e, n) {
    var i = n.defaultValue == null ? '' : n.defaultValue,
      s = n.checked != null ? n.checked : n.defaultChecked
    ;((i = he(n.value != null ? n.value : i)),
      (e._wrapperState = {
        initialChecked: s,
        initialValue: i,
        controlled:
          n.type === 'checkbox' || n.type === 'radio' ? n.checked != null : n.value != null,
      }))
  }
  function cc(e, n) {
    ;((n = n.checked), n != null && F(e, 'checked', n, !1))
  }
  function Hs(e, n) {
    cc(e, n)
    var i = he(n.value),
      s = n.type
    if (i != null)
      s === 'number'
        ? ((i === 0 && e.value === '') || e.value != i) && (e.value = '' + i)
        : e.value !== '' + i && (e.value = '' + i)
    else if (s === 'submit' || s === 'reset') {
      e.removeAttribute('value')
      return
    }
    ;(n.hasOwnProperty('value')
      ? $s(e, n.type, i)
      : n.hasOwnProperty('defaultValue') && $s(e, n.type, he(n.defaultValue)),
      n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked))
  }
  function fc(e, n, i) {
    if (n.hasOwnProperty('value') || n.hasOwnProperty('defaultValue')) {
      var s = n.type
      if (!((s !== 'submit' && s !== 'reset') || (n.value !== void 0 && n.value !== null))) return
      ;((n = '' + e._wrapperState.initialValue),
        i || n === e.value || (e.value = n),
        (e.defaultValue = n))
    }
    ;((i = e.name),
      i !== '' && (e.name = ''),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      i !== '' && (e.name = i))
  }
  function $s(e, n, i) {
    ;(n !== 'number' || ro(e.ownerDocument) !== e) &&
      (i == null
        ? (e.defaultValue = '' + e._wrapperState.initialValue)
        : e.defaultValue !== '' + i && (e.defaultValue = '' + i))
  }
  var br = Array.isArray
  function ur(e, n, i, s) {
    if (((e = e.options), n)) {
      n = {}
      for (var u = 0; u < i.length; u++) n['$' + i[u]] = !0
      for (i = 0; i < e.length; i++)
        ((u = n.hasOwnProperty('$' + e[i].value)),
          e[i].selected !== u && (e[i].selected = u),
          u && s && (e[i].defaultSelected = !0))
    } else {
      for (i = '' + he(i), n = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          ;((e[u].selected = !0), s && (e[u].defaultSelected = !0))
          return
        }
        n !== null || e[u].disabled || (n = e[u])
      }
      n !== null && (n.selected = !0)
    }
  }
  function Ks(e, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(o(91))
    return K({}, n, {
      value: void 0,
      defaultValue: void 0,
      children: '' + e._wrapperState.initialValue,
    })
  }
  function dc(e, n) {
    var i = n.value
    if (i == null) {
      if (((i = n.children), (n = n.defaultValue), i != null)) {
        if (n != null) throw Error(o(92))
        if (br(i)) {
          if (1 < i.length) throw Error(o(93))
          i = i[0]
        }
        n = i
      }
      ;(n == null && (n = ''), (i = n))
    }
    e._wrapperState = { initialValue: he(i) }
  }
  function hc(e, n) {
    var i = he(n.value),
      s = he(n.defaultValue)
    ;(i != null &&
      ((i = '' + i),
      i !== e.value && (e.value = i),
      n.defaultValue == null && e.defaultValue !== i && (e.defaultValue = i)),
      s != null && (e.defaultValue = '' + s))
  }
  function pc(e) {
    var n = e.textContent
    n === e._wrapperState.initialValue && n !== '' && n !== null && (e.value = n)
  }
  function mc(e) {
    switch (e) {
      case 'svg':
        return 'http://www.w3.org/2000/svg'
      case 'math':
        return 'http://www.w3.org/1998/Math/MathML'
      default:
        return 'http://www.w3.org/1999/xhtml'
    }
  }
  function Zs(e, n) {
    return e == null || e === 'http://www.w3.org/1999/xhtml'
      ? mc(n)
      : e === 'http://www.w3.org/2000/svg' && n === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e
  }
  var io,
    gc = (function (e) {
      return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
        ? function (n, i, s, u) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(n, i, s, u)
            })
          }
        : e
    })(function (e, n) {
      if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = n
      else {
        for (
          io = io || document.createElement('div'),
            io.innerHTML = '<svg>' + n.valueOf().toString() + '</svg>',
            n = io.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild)
        for (; n.firstChild; ) e.appendChild(n.firstChild)
      }
    })
  function Qr(e, n) {
    if (n) {
      var i = e.firstChild
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = n
        return
      }
    }
    e.textContent = n
  }
  var Gr = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Dm = ['Webkit', 'ms', 'Moz', 'O']
  Object.keys(Gr).forEach(function (e) {
    Dm.forEach(function (n) {
      ;((n = n + e.charAt(0).toUpperCase() + e.substring(1)), (Gr[n] = Gr[e]))
    })
  })
  function yc(e, n, i) {
    return n == null || typeof n == 'boolean' || n === ''
      ? ''
      : i || typeof n != 'number' || n === 0 || (Gr.hasOwnProperty(e) && Gr[e])
        ? ('' + n).trim()
        : n + 'px'
  }
  function vc(e, n) {
    e = e.style
    for (var i in n)
      if (n.hasOwnProperty(i)) {
        var s = i.indexOf('--') === 0,
          u = yc(i, n[i], s)
        ;(i === 'float' && (i = 'cssFloat'), s ? e.setProperty(i, u) : (e[i] = u))
      }
  }
  var Vm = K(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  )
  function Ys(e, n) {
    if (n) {
      if (Vm[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(o(137, e))
      if (n.dangerouslySetInnerHTML != null) {
        if (n.children != null) throw Error(o(60))
        if (
          typeof n.dangerouslySetInnerHTML != 'object' ||
          !('__html' in n.dangerouslySetInnerHTML)
        )
          throw Error(o(61))
      }
      if (n.style != null && typeof n.style != 'object') throw Error(o(62))
    }
  }
  function bs(e, n) {
    if (e.indexOf('-') === -1) return typeof n.is == 'string'
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1
      default:
        return !0
    }
  }
  var Qs = null
  function Gs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    )
  }
  var Xs = null,
    cr = null,
    fr = null
  function kc(e) {
    if ((e = vi(e))) {
      if (typeof Xs != 'function') throw Error(o(280))
      var n = e.stateNode
      n && ((n = Mo(n)), Xs(e.stateNode, e.type, n))
    }
  }
  function Ec(e) {
    cr ? (fr ? fr.push(e) : (fr = [e])) : (cr = e)
  }
  function xc() {
    if (cr) {
      var e = cr,
        n = fr
      if (((fr = cr = null), kc(e), n)) for (e = 0; e < n.length; e++) kc(n[e])
    }
  }
  function wc(e, n) {
    return e(n)
  }
  function Lc() {}
  var qs = !1
  function Sc(e, n, i) {
    if (qs) return e(n, i)
    qs = !0
    try {
      return wc(e, n, i)
    } finally {
      ;((qs = !1), (cr !== null || fr !== null) && (Lc(), xc()))
    }
  }
  function Xr(e, n) {
    var i = e.stateNode
    if (i === null) return null
    var s = Mo(i)
    if (s === null) return null
    i = s[n]
    e: switch (n) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ;((s = !s.disabled) ||
          ((e = e.type),
          (s = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !s))
        break e
      default:
        e = !1
    }
    if (e) return null
    if (i && typeof i != 'function') throw Error(o(231, n, typeof i))
    return i
  }
  var Js = !1
  if (y)
    try {
      var qr = {}
      ;(Object.defineProperty(qr, 'passive', {
        get: function () {
          Js = !0
        },
      }),
        window.addEventListener('test', qr, qr),
        window.removeEventListener('test', qr, qr))
    } catch {
      Js = !1
    }
  function Nm(e, n, i, s, u, c, v, x, w) {
    var j = Array.prototype.slice.call(arguments, 3)
    try {
      n.apply(i, j)
    } catch (O) {
      this.onError(O)
    }
  }
  var Jr = !1,
    oo = null,
    so = !1,
    el = null,
    Wm = {
      onError: function (e) {
        ;((Jr = !0), (oo = e))
      },
    }
  function Om(e, n, i, s, u, c, v, x, w) {
    ;((Jr = !1), (oo = null), Nm.apply(Wm, arguments))
  }
  function Im(e, n, i, s, u, c, v, x, w) {
    if ((Om.apply(this, arguments), Jr)) {
      if (Jr) {
        var j = oo
        ;((Jr = !1), (oo = null))
      } else throw Error(o(198))
      so || ((so = !0), (el = j))
    }
  }
  function Mn(e) {
    var n = e,
      i = e
    if (e.alternate) for (; n.return; ) n = n.return
    else {
      e = n
      do ((n = e), (n.flags & 4098) !== 0 && (i = n.return), (e = n.return))
      while (e)
    }
    return n.tag === 3 ? i : null
  }
  function Pc(e) {
    if (e.tag === 13) {
      var n = e.memoizedState
      if ((n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)), n !== null))
        return n.dehydrated
    }
    return null
  }
  function Cc(e) {
    if (Mn(e) !== e) throw Error(o(188))
  }
  function Bm(e) {
    var n = e.alternate
    if (!n) {
      if (((n = Mn(e)), n === null)) throw Error(o(188))
      return n !== e ? null : e
    }
    for (var i = e, s = n; ; ) {
      var u = i.return
      if (u === null) break
      var c = u.alternate
      if (c === null) {
        if (((s = u.return), s !== null)) {
          i = s
          continue
        }
        break
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === i) return (Cc(u), e)
          if (c === s) return (Cc(u), n)
          c = c.sibling
        }
        throw Error(o(188))
      }
      if (i.return !== s.return) ((i = u), (s = c))
      else {
        for (var v = !1, x = u.child; x; ) {
          if (x === i) {
            ;((v = !0), (i = u), (s = c))
            break
          }
          if (x === s) {
            ;((v = !0), (s = u), (i = c))
            break
          }
          x = x.sibling
        }
        if (!v) {
          for (x = c.child; x; ) {
            if (x === i) {
              ;((v = !0), (i = c), (s = u))
              break
            }
            if (x === s) {
              ;((v = !0), (s = c), (i = u))
              break
            }
            x = x.sibling
          }
          if (!v) throw Error(o(189))
        }
      }
      if (i.alternate !== s) throw Error(o(190))
    }
    if (i.tag !== 3) throw Error(o(188))
    return i.stateNode.current === i ? e : n
  }
  function Tc(e) {
    return ((e = Bm(e)), e !== null ? Mc(e) : null)
  }
  function Mc(e) {
    if (e.tag === 5 || e.tag === 6) return e
    for (e = e.child; e !== null; ) {
      var n = Mc(e)
      if (n !== null) return n
      e = e.sibling
    }
    return null
  }
  var Ac = r.unstable_scheduleCallback,
    Rc = r.unstable_cancelCallback,
    zm = r.unstable_shouldYield,
    Um = r.unstable_requestPaint,
    Ae = r.unstable_now,
    Hm = r.unstable_getCurrentPriorityLevel,
    tl = r.unstable_ImmediatePriority,
    jc = r.unstable_UserBlockingPriority,
    lo = r.unstable_NormalPriority,
    $m = r.unstable_LowPriority,
    _c = r.unstable_IdlePriority,
    ao = null,
    Ft = null
  function Km(e) {
    if (Ft && typeof Ft.onCommitFiberRoot == 'function')
      try {
        Ft.onCommitFiberRoot(ao, e, void 0, (e.current.flags & 128) === 128)
      } catch {}
  }
  var Pt = Math.clz32 ? Math.clz32 : bm,
    Zm = Math.log,
    Ym = Math.LN2
  function bm(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Zm(e) / Ym) | 0)) | 0)
  }
  var uo = 64,
    co = 4194304
  function ei(e) {
    switch (e & -e) {
      case 1:
        return 1
      case 2:
        return 2
      case 4:
        return 4
      case 8:
        return 8
      case 16:
        return 16
      case 32:
        return 32
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424
      case 134217728:
        return 134217728
      case 268435456:
        return 268435456
      case 536870912:
        return 536870912
      case 1073741824:
        return 1073741824
      default:
        return e
    }
  }
  function fo(e, n) {
    var i = e.pendingLanes
    if (i === 0) return 0
    var s = 0,
      u = e.suspendedLanes,
      c = e.pingedLanes,
      v = i & 268435455
    if (v !== 0) {
      var x = v & ~u
      x !== 0 ? (s = ei(x)) : ((c &= v), c !== 0 && (s = ei(c)))
    } else ((v = i & ~u), v !== 0 ? (s = ei(v)) : c !== 0 && (s = ei(c)))
    if (s === 0) return 0
    if (
      n !== 0 &&
      n !== s &&
      (n & u) === 0 &&
      ((u = s & -s), (c = n & -n), u >= c || (u === 16 && (c & 4194240) !== 0))
    )
      return n
    if (((s & 4) !== 0 && (s |= i & 16), (n = e.entangledLanes), n !== 0))
      for (e = e.entanglements, n &= s; 0 < n; )
        ((i = 31 - Pt(n)), (u = 1 << i), (s |= e[i]), (n &= ~u))
    return s
  }
  function Qm(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return n + 250
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1
      default:
        return -1
    }
  }
  function Gm(e, n) {
    for (
      var i = e.suspendedLanes, s = e.pingedLanes, u = e.expirationTimes, c = e.pendingLanes;
      0 < c;

    ) {
      var v = 31 - Pt(c),
        x = 1 << v,
        w = u[v]
      ;(w === -1
        ? ((x & i) === 0 || (x & s) !== 0) && (u[v] = Qm(x, n))
        : w <= n && (e.expiredLanes |= x),
        (c &= ~x))
    }
  }
  function nl(e) {
    return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0)
  }
  function Fc() {
    var e = uo
    return ((uo <<= 1), (uo & 4194240) === 0 && (uo = 64), e)
  }
  function rl(e) {
    for (var n = [], i = 0; 31 > i; i++) n.push(e)
    return n
  }
  function ti(e, n, i) {
    ;((e.pendingLanes |= n),
      n !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (n = 31 - Pt(n)),
      (e[n] = i))
  }
  function Xm(e, n) {
    var i = e.pendingLanes & ~n
    ;((e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= n),
      (e.mutableReadLanes &= n),
      (e.entangledLanes &= n),
      (n = e.entanglements))
    var s = e.eventTimes
    for (e = e.expirationTimes; 0 < i; ) {
      var u = 31 - Pt(i),
        c = 1 << u
      ;((n[u] = 0), (s[u] = -1), (e[u] = -1), (i &= ~c))
    }
  }
  function il(e, n) {
    var i = (e.entangledLanes |= n)
    for (e = e.entanglements; i; ) {
      var s = 31 - Pt(i),
        u = 1 << s
      ;((u & n) | (e[s] & n) && (e[s] |= n), (i &= ~u))
    }
  }
  var pe = 0
  function Dc(e) {
    return ((e &= -e), 1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1)
  }
  var Vc,
    ol,
    Nc,
    Wc,
    Oc,
    sl = !1,
    ho = [],
    Jt = null,
    en = null,
    tn = null,
    ni = new Map(),
    ri = new Map(),
    nn = [],
    qm =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' '
      )
  function Ic(e, n) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Jt = null
        break
      case 'dragenter':
      case 'dragleave':
        en = null
        break
      case 'mouseover':
      case 'mouseout':
        tn = null
        break
      case 'pointerover':
      case 'pointerout':
        ni.delete(n.pointerId)
        break
      case 'gotpointercapture':
      case 'lostpointercapture':
        ri.delete(n.pointerId)
    }
  }
  function ii(e, n, i, s, u, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: n,
          domEventName: i,
          eventSystemFlags: s,
          nativeEvent: c,
          targetContainers: [u],
        }),
        n !== null && ((n = vi(n)), n !== null && ol(n)),
        e)
      : ((e.eventSystemFlags |= s),
        (n = e.targetContainers),
        u !== null && n.indexOf(u) === -1 && n.push(u),
        e)
  }
  function Jm(e, n, i, s, u) {
    switch (n) {
      case 'focusin':
        return ((Jt = ii(Jt, e, n, i, s, u)), !0)
      case 'dragenter':
        return ((en = ii(en, e, n, i, s, u)), !0)
      case 'mouseover':
        return ((tn = ii(tn, e, n, i, s, u)), !0)
      case 'pointerover':
        var c = u.pointerId
        return (ni.set(c, ii(ni.get(c) || null, e, n, i, s, u)), !0)
      case 'gotpointercapture':
        return ((c = u.pointerId), ri.set(c, ii(ri.get(c) || null, e, n, i, s, u)), !0)
    }
    return !1
  }
  function Bc(e) {
    var n = An(e.target)
    if (n !== null) {
      var i = Mn(n)
      if (i !== null) {
        if (((n = i.tag), n === 13)) {
          if (((n = Pc(i)), n !== null)) {
            ;((e.blockedOn = n),
              Oc(e.priority, function () {
                Nc(i)
              }))
            return
          }
        } else if (n === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null
          return
        }
      }
    }
    e.blockedOn = null
  }
  function po(e) {
    if (e.blockedOn !== null) return !1
    for (var n = e.targetContainers; 0 < n.length; ) {
      var i = al(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent)
      if (i === null) {
        i = e.nativeEvent
        var s = new i.constructor(i.type, i)
        ;((Qs = s), i.target.dispatchEvent(s), (Qs = null))
      } else return ((n = vi(i)), n !== null && ol(n), (e.blockedOn = i), !1)
      n.shift()
    }
    return !0
  }
  function zc(e, n, i) {
    po(e) && i.delete(n)
  }
  function e0() {
    ;((sl = !1),
      Jt !== null && po(Jt) && (Jt = null),
      en !== null && po(en) && (en = null),
      tn !== null && po(tn) && (tn = null),
      ni.forEach(zc),
      ri.forEach(zc))
  }
  function oi(e, n) {
    e.blockedOn === n &&
      ((e.blockedOn = null),
      sl || ((sl = !0), r.unstable_scheduleCallback(r.unstable_NormalPriority, e0)))
  }
  function si(e) {
    function n(u) {
      return oi(u, e)
    }
    if (0 < ho.length) {
      oi(ho[0], e)
      for (var i = 1; i < ho.length; i++) {
        var s = ho[i]
        s.blockedOn === e && (s.blockedOn = null)
      }
    }
    for (
      Jt !== null && oi(Jt, e),
        en !== null && oi(en, e),
        tn !== null && oi(tn, e),
        ni.forEach(n),
        ri.forEach(n),
        i = 0;
      i < nn.length;
      i++
    )
      ((s = nn[i]), s.blockedOn === e && (s.blockedOn = null))
    for (; 0 < nn.length && ((i = nn[0]), i.blockedOn === null); )
      (Bc(i), i.blockedOn === null && nn.shift())
  }
  var dr = z.ReactCurrentBatchConfig,
    mo = !0
  function t0(e, n, i, s) {
    var u = pe,
      c = dr.transition
    dr.transition = null
    try {
      ;((pe = 1), ll(e, n, i, s))
    } finally {
      ;((pe = u), (dr.transition = c))
    }
  }
  function n0(e, n, i, s) {
    var u = pe,
      c = dr.transition
    dr.transition = null
    try {
      ;((pe = 4), ll(e, n, i, s))
    } finally {
      ;((pe = u), (dr.transition = c))
    }
  }
  function ll(e, n, i, s) {
    if (mo) {
      var u = al(e, n, i, s)
      if (u === null) (Pl(e, n, s, go, i), Ic(e, s))
      else if (Jm(u, e, n, i, s)) s.stopPropagation()
      else if ((Ic(e, s), n & 4 && -1 < qm.indexOf(e))) {
        for (; u !== null; ) {
          var c = vi(u)
          if (
            (c !== null && Vc(c), (c = al(e, n, i, s)), c === null && Pl(e, n, s, go, i), c === u)
          )
            break
          u = c
        }
        u !== null && s.stopPropagation()
      } else Pl(e, n, s, null, i)
    }
  }
  var go = null
  function al(e, n, i, s) {
    if (((go = null), (e = Gs(s)), (e = An(e)), e !== null))
      if (((n = Mn(e)), n === null)) e = null
      else if (((i = n.tag), i === 13)) {
        if (((e = Pc(n)), e !== null)) return e
        e = null
      } else if (i === 3) {
        if (n.stateNode.current.memoizedState.isDehydrated)
          return n.tag === 3 ? n.stateNode.containerInfo : null
        e = null
      } else n !== e && (e = null)
    return ((go = e), null)
  }
  function Uc(e) {
    switch (e) {
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 1
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'toggle':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 4
      case 'message':
        switch (Hm()) {
          case tl:
            return 1
          case jc:
            return 4
          case lo:
          case $m:
            return 16
          case _c:
            return 536870912
          default:
            return 16
        }
      default:
        return 16
    }
  }
  var rn = null,
    ul = null,
    yo = null
  function Hc() {
    if (yo) return yo
    var e,
      n = ul,
      i = n.length,
      s,
      u = 'value' in rn ? rn.value : rn.textContent,
      c = u.length
    for (e = 0; e < i && n[e] === u[e]; e++);
    var v = i - e
    for (s = 1; s <= v && n[i - s] === u[c - s]; s++);
    return (yo = u.slice(e, 1 < s ? 1 - s : void 0))
  }
  function vo(e) {
    var n = e.keyCode
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && n === 13 && (e = 13)) : (e = n),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    )
  }
  function ko() {
    return !0
  }
  function $c() {
    return !1
  }
  function ct(e) {
    function n(i, s, u, c, v) {
      ;((this._reactName = i),
        (this._targetInst = u),
        (this.type = s),
        (this.nativeEvent = c),
        (this.target = v),
        (this.currentTarget = null))
      for (var x in e) e.hasOwnProperty(x) && ((i = e[x]), (this[x] = i ? i(c) : c[x]))
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? ko
          : $c),
        (this.isPropagationStopped = $c),
        this
      )
    }
    return (
      K(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0
          var i = this.nativeEvent
          i &&
            (i.preventDefault
              ? i.preventDefault()
              : typeof i.returnValue != 'unknown' && (i.returnValue = !1),
            (this.isDefaultPrevented = ko))
        },
        stopPropagation: function () {
          var i = this.nativeEvent
          i &&
            (i.stopPropagation
              ? i.stopPropagation()
              : typeof i.cancelBubble != 'unknown' && (i.cancelBubble = !0),
            (this.isPropagationStopped = ko))
        },
        persist: function () {},
        isPersistent: ko,
      }),
      n
    )
  }
  var hr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now()
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    cl = ct(hr),
    li = K({}, hr, { view: 0, detail: 0 }),
    r0 = ct(li),
    fl,
    dl,
    ai,
    Eo = K({}, li, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: pl,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== ai &&
              (ai && e.type === 'mousemove'
                ? ((fl = e.screenX - ai.screenX), (dl = e.screenY - ai.screenY))
                : (dl = fl = 0),
              (ai = e)),
            fl)
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : dl
      },
    }),
    Kc = ct(Eo),
    i0 = K({}, Eo, { dataTransfer: 0 }),
    o0 = ct(i0),
    s0 = K({}, li, { relatedTarget: 0 }),
    hl = ct(s0),
    l0 = K({}, hr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    a0 = ct(l0),
    u0 = K({}, hr, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData
      },
    }),
    c0 = ct(u0),
    f0 = K({}, hr, { data: 0 }),
    Zc = ct(f0),
    d0 = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    h0 = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    p0 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' }
  function m0(e) {
    var n = this.nativeEvent
    return n.getModifierState ? n.getModifierState(e) : (e = p0[e]) ? !!n[e] : !1
  }
  function pl() {
    return m0
  }
  var g0 = K({}, li, {
      key: function (e) {
        if (e.key) {
          var n = d0[e.key] || e.key
          if (n !== 'Unidentified') return n
        }
        return e.type === 'keypress'
          ? ((e = vo(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? h0[e.keyCode] || 'Unidentified'
            : ''
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: pl,
      charCode: function (e) {
        return e.type === 'keypress' ? vo(e) : 0
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0
      },
      which: function (e) {
        return e.type === 'keypress'
          ? vo(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0
      },
    }),
    y0 = ct(g0),
    v0 = K({}, Eo, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Yc = ct(v0),
    k0 = K({}, li, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: pl,
    }),
    E0 = ct(k0),
    x0 = K({}, hr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    w0 = ct(x0),
    L0 = K({}, Eo, {
      deltaX: function (e) {
        return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    S0 = ct(L0),
    P0 = [9, 13, 27, 32],
    ml = y && 'CompositionEvent' in window,
    ui = null
  y && 'documentMode' in document && (ui = document.documentMode)
  var C0 = y && 'TextEvent' in window && !ui,
    bc = y && (!ml || (ui && 8 < ui && 11 >= ui)),
    Qc = ' ',
    Gc = !1
  function Xc(e, n) {
    switch (e) {
      case 'keyup':
        return P0.indexOf(n.keyCode) !== -1
      case 'keydown':
        return n.keyCode !== 229
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0
      default:
        return !1
    }
  }
  function qc(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null)
  }
  var pr = !1
  function T0(e, n) {
    switch (e) {
      case 'compositionend':
        return qc(n)
      case 'keypress':
        return n.which !== 32 ? null : ((Gc = !0), Qc)
      case 'textInput':
        return ((e = n.data), e === Qc && Gc ? null : e)
      default:
        return null
    }
  }
  function M0(e, n) {
    if (pr)
      return e === 'compositionend' || (!ml && Xc(e, n))
        ? ((e = Hc()), (yo = ul = rn = null), (pr = !1), e)
        : null
    switch (e) {
      case 'paste':
        return null
      case 'keypress':
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char
          if (n.which) return String.fromCharCode(n.which)
        }
        return null
      case 'compositionend':
        return bc && n.locale !== 'ko' ? null : n.data
      default:
        return null
    }
  }
  var A0 = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  }
  function Jc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase()
    return n === 'input' ? !!A0[e.type] : n === 'textarea'
  }
  function ef(e, n, i, s) {
    ;(Ec(s),
      (n = Po(n, 'onChange')),
      0 < n.length &&
        ((i = new cl('onChange', 'change', null, i, s)), e.push({ event: i, listeners: n })))
  }
  var ci = null,
    fi = null
  function R0(e) {
    kf(e, 0)
  }
  function xo(e) {
    var n = kr(e)
    if (ac(n)) return e
  }
  function j0(e, n) {
    if (e === 'change') return n
  }
  var tf = !1
  if (y) {
    var gl
    if (y) {
      var yl = 'oninput' in document
      if (!yl) {
        var nf = document.createElement('div')
        ;(nf.setAttribute('oninput', 'return;'), (yl = typeof nf.oninput == 'function'))
      }
      gl = yl
    } else gl = !1
    tf = gl && (!document.documentMode || 9 < document.documentMode)
  }
  function rf() {
    ci && (ci.detachEvent('onpropertychange', of), (fi = ci = null))
  }
  function of(e) {
    if (e.propertyName === 'value' && xo(fi)) {
      var n = []
      ;(ef(n, fi, e, Gs(e)), Sc(R0, n))
    }
  }
  function _0(e, n, i) {
    e === 'focusin'
      ? (rf(), (ci = n), (fi = i), ci.attachEvent('onpropertychange', of))
      : e === 'focusout' && rf()
  }
  function F0(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return xo(fi)
  }
  function D0(e, n) {
    if (e === 'click') return xo(n)
  }
  function V0(e, n) {
    if (e === 'input' || e === 'change') return xo(n)
  }
  function N0(e, n) {
    return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n)
  }
  var Ct = typeof Object.is == 'function' ? Object.is : N0
  function di(e, n) {
    if (Ct(e, n)) return !0
    if (typeof e != 'object' || e === null || typeof n != 'object' || n === null) return !1
    var i = Object.keys(e),
      s = Object.keys(n)
    if (i.length !== s.length) return !1
    for (s = 0; s < i.length; s++) {
      var u = i[s]
      if (!h.call(n, u) || !Ct(e[u], n[u])) return !1
    }
    return !0
  }
  function sf(e) {
    for (; e && e.firstChild; ) e = e.firstChild
    return e
  }
  function lf(e, n) {
    var i = sf(e)
    e = 0
    for (var s; i; ) {
      if (i.nodeType === 3) {
        if (((s = e + i.textContent.length), e <= n && s >= n)) return { node: i, offset: n - e }
        e = s
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling
            break e
          }
          i = i.parentNode
        }
        i = void 0
      }
      i = sf(i)
    }
  }
  function af(e, n) {
    return e && n
      ? e === n
        ? !0
        : e && e.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? af(e, n.parentNode)
            : 'contains' in e
              ? e.contains(n)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(n) & 16)
                : !1
      : !1
  }
  function uf() {
    for (var e = window, n = ro(); n instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == 'string'
      } catch {
        i = !1
      }
      if (i) e = n.contentWindow
      else break
      n = ro(e.document)
    }
    return n
  }
  function vl(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase()
    return (
      n &&
      ((n === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        n === 'textarea' ||
        e.contentEditable === 'true')
    )
  }
  function W0(e) {
    var n = uf(),
      i = e.focusedElem,
      s = e.selectionRange
    if (n !== i && i && i.ownerDocument && af(i.ownerDocument.documentElement, i)) {
      if (s !== null && vl(i)) {
        if (((n = s.start), (e = s.end), e === void 0 && (e = n), 'selectionStart' in i))
          ((i.selectionStart = n), (i.selectionEnd = Math.min(e, i.value.length)))
        else if (
          ((e = ((n = i.ownerDocument || document) && n.defaultView) || window), e.getSelection)
        ) {
          e = e.getSelection()
          var u = i.textContent.length,
            c = Math.min(s.start, u)
          ;((s = s.end === void 0 ? c : Math.min(s.end, u)),
            !e.extend && c > s && ((u = s), (s = c), (c = u)),
            (u = lf(i, c)))
          var v = lf(i, s)
          u &&
            v &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== u.node ||
              e.anchorOffset !== u.offset ||
              e.focusNode !== v.node ||
              e.focusOffset !== v.offset) &&
            ((n = n.createRange()),
            n.setStart(u.node, u.offset),
            e.removeAllRanges(),
            c > s
              ? (e.addRange(n), e.extend(v.node, v.offset))
              : (n.setEnd(v.node, v.offset), e.addRange(n)))
        }
      }
      for (n = [], e = i; (e = e.parentNode); )
        e.nodeType === 1 && n.push({ element: e, left: e.scrollLeft, top: e.scrollTop })
      for (typeof i.focus == 'function' && i.focus(), i = 0; i < n.length; i++)
        ((e = n[i]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top))
    }
  }
  var O0 = y && 'documentMode' in document && 11 >= document.documentMode,
    mr = null,
    kl = null,
    hi = null,
    El = !1
  function cf(e, n, i) {
    var s = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument
    El ||
      mr == null ||
      mr !== ro(s) ||
      ((s = mr),
      'selectionStart' in s && vl(s)
        ? (s = { start: s.selectionStart, end: s.selectionEnd })
        : ((s = ((s.ownerDocument && s.ownerDocument.defaultView) || window).getSelection()),
          (s = {
            anchorNode: s.anchorNode,
            anchorOffset: s.anchorOffset,
            focusNode: s.focusNode,
            focusOffset: s.focusOffset,
          })),
      (hi && di(hi, s)) ||
        ((hi = s),
        (s = Po(kl, 'onSelect')),
        0 < s.length &&
          ((n = new cl('onSelect', 'select', null, n, i)),
          e.push({ event: n, listeners: s }),
          (n.target = mr))))
  }
  function wo(e, n) {
    var i = {}
    return (
      (i[e.toLowerCase()] = n.toLowerCase()),
      (i['Webkit' + e] = 'webkit' + n),
      (i['Moz' + e] = 'moz' + n),
      i
    )
  }
  var gr = {
      animationend: wo('Animation', 'AnimationEnd'),
      animationiteration: wo('Animation', 'AnimationIteration'),
      animationstart: wo('Animation', 'AnimationStart'),
      transitionend: wo('Transition', 'TransitionEnd'),
    },
    xl = {},
    ff = {}
  y &&
    ((ff = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete gr.animationend.animation,
      delete gr.animationiteration.animation,
      delete gr.animationstart.animation),
    'TransitionEvent' in window || delete gr.transitionend.transition)
  function Lo(e) {
    if (xl[e]) return xl[e]
    if (!gr[e]) return e
    var n = gr[e],
      i
    for (i in n) if (n.hasOwnProperty(i) && i in ff) return (xl[e] = n[i])
    return e
  }
  var df = Lo('animationend'),
    hf = Lo('animationiteration'),
    pf = Lo('animationstart'),
    mf = Lo('transitionend'),
    gf = new Map(),
    yf =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      )
  function on(e, n) {
    ;(gf.set(e, n), d(n, [e]))
  }
  for (var wl = 0; wl < yf.length; wl++) {
    var Ll = yf[wl],
      I0 = Ll.toLowerCase(),
      B0 = Ll[0].toUpperCase() + Ll.slice(1)
    on(I0, 'on' + B0)
  }
  ;(on(df, 'onAnimationEnd'),
    on(hf, 'onAnimationIteration'),
    on(pf, 'onAnimationStart'),
    on('dblclick', 'onDoubleClick'),
    on('focusin', 'onFocus'),
    on('focusout', 'onBlur'),
    on(mf, 'onTransitionEnd'),
    f('onMouseEnter', ['mouseout', 'mouseover']),
    f('onMouseLeave', ['mouseout', 'mouseover']),
    f('onPointerEnter', ['pointerout', 'pointerover']),
    f('onPointerLeave', ['pointerout', 'pointerover']),
    d('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    d(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    d('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    d('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    d(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    d(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ))
  var pi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    z0 = new Set('cancel close invalid load scroll toggle'.split(' ').concat(pi))
  function vf(e, n, i) {
    var s = e.type || 'unknown-event'
    ;((e.currentTarget = i), Im(s, n, void 0, e), (e.currentTarget = null))
  }
  function kf(e, n) {
    n = (n & 4) !== 0
    for (var i = 0; i < e.length; i++) {
      var s = e[i],
        u = s.event
      s = s.listeners
      e: {
        var c = void 0
        if (n)
          for (var v = s.length - 1; 0 <= v; v--) {
            var x = s[v],
              w = x.instance,
              j = x.currentTarget
            if (((x = x.listener), w !== c && u.isPropagationStopped())) break e
            ;(vf(u, x, j), (c = w))
          }
        else
          for (v = 0; v < s.length; v++) {
            if (
              ((x = s[v]),
              (w = x.instance),
              (j = x.currentTarget),
              (x = x.listener),
              w !== c && u.isPropagationStopped())
            )
              break e
            ;(vf(u, x, j), (c = w))
          }
      }
    }
    if (so) throw ((e = el), (so = !1), (el = null), e)
  }
  function ve(e, n) {
    var i = n[jl]
    i === void 0 && (i = n[jl] = new Set())
    var s = e + '__bubble'
    i.has(s) || (Ef(n, e, 2, !1), i.add(s))
  }
  function Sl(e, n, i) {
    var s = 0
    ;(n && (s |= 4), Ef(i, e, s, n))
  }
  var So = '_reactListening' + Math.random().toString(36).slice(2)
  function mi(e) {
    if (!e[So]) {
      ;((e[So] = !0),
        l.forEach(function (i) {
          i !== 'selectionchange' && (z0.has(i) || Sl(i, !1, e), Sl(i, !0, e))
        }))
      var n = e.nodeType === 9 ? e : e.ownerDocument
      n === null || n[So] || ((n[So] = !0), Sl('selectionchange', !1, n))
    }
  }
  function Ef(e, n, i, s) {
    switch (Uc(n)) {
      case 1:
        var u = t0
        break
      case 4:
        u = n0
        break
      default:
        u = ll
    }
    ;((i = u.bind(null, n, i, e)),
      (u = void 0),
      !Js || (n !== 'touchstart' && n !== 'touchmove' && n !== 'wheel') || (u = !0),
      s
        ? u !== void 0
          ? e.addEventListener(n, i, { capture: !0, passive: u })
          : e.addEventListener(n, i, !0)
        : u !== void 0
          ? e.addEventListener(n, i, { passive: u })
          : e.addEventListener(n, i, !1))
  }
  function Pl(e, n, i, s, u) {
    var c = s
    if ((n & 1) === 0 && (n & 2) === 0 && s !== null)
      e: for (;;) {
        if (s === null) return
        var v = s.tag
        if (v === 3 || v === 4) {
          var x = s.stateNode.containerInfo
          if (x === u || (x.nodeType === 8 && x.parentNode === u)) break
          if (v === 4)
            for (v = s.return; v !== null; ) {
              var w = v.tag
              if (
                (w === 3 || w === 4) &&
                ((w = v.stateNode.containerInfo),
                w === u || (w.nodeType === 8 && w.parentNode === u))
              )
                return
              v = v.return
            }
          for (; x !== null; ) {
            if (((v = An(x)), v === null)) return
            if (((w = v.tag), w === 5 || w === 6)) {
              s = c = v
              continue e
            }
            x = x.parentNode
          }
        }
        s = s.return
      }
    Sc(function () {
      var j = c,
        O = Gs(i),
        I = []
      e: {
        var N = gf.get(e)
        if (N !== void 0) {
          var $ = cl,
            Y = e
          switch (e) {
            case 'keypress':
              if (vo(i) === 0) break e
            case 'keydown':
            case 'keyup':
              $ = y0
              break
            case 'focusin':
              ;((Y = 'focus'), ($ = hl))
              break
            case 'focusout':
              ;((Y = 'blur'), ($ = hl))
              break
            case 'beforeblur':
            case 'afterblur':
              $ = hl
              break
            case 'click':
              if (i.button === 2) break e
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              $ = Kc
              break
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              $ = o0
              break
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              $ = E0
              break
            case df:
            case hf:
            case pf:
              $ = a0
              break
            case mf:
              $ = w0
              break
            case 'scroll':
              $ = r0
              break
            case 'wheel':
              $ = S0
              break
            case 'copy':
            case 'cut':
            case 'paste':
              $ = c0
              break
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              $ = Yc
          }
          var b = (n & 4) !== 0,
            Re = !b && e === 'scroll',
            M = b ? (N !== null ? N + 'Capture' : null) : N
          b = []
          for (var L = j, R; L !== null; ) {
            R = L
            var B = R.stateNode
            if (
              (R.tag === 5 &&
                B !== null &&
                ((R = B), M !== null && ((B = Xr(L, M)), B != null && b.push(gi(L, B, R)))),
              Re)
            )
              break
            L = L.return
          }
          0 < b.length && ((N = new $(N, Y, null, i, O)), I.push({ event: N, listeners: b }))
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((N = e === 'mouseover' || e === 'pointerover'),
            ($ = e === 'mouseout' || e === 'pointerout'),
            N && i !== Qs && (Y = i.relatedTarget || i.fromElement) && (An(Y) || Y[Bt]))
          )
            break e
          if (
            ($ || N) &&
            ((N =
              O.window === O
                ? O
                : (N = O.ownerDocument)
                  ? N.defaultView || N.parentWindow
                  : window),
            $
              ? ((Y = i.relatedTarget || i.toElement),
                ($ = j),
                (Y = Y ? An(Y) : null),
                Y !== null &&
                  ((Re = Mn(Y)), Y !== Re || (Y.tag !== 5 && Y.tag !== 6)) &&
                  (Y = null))
              : (($ = null), (Y = j)),
            $ !== Y)
          ) {
            if (
              ((b = Kc),
              (B = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (L = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((b = Yc), (B = 'onPointerLeave'), (M = 'onPointerEnter'), (L = 'pointer')),
              (Re = $ == null ? N : kr($)),
              (R = Y == null ? N : kr(Y)),
              (N = new b(B, L + 'leave', $, i, O)),
              (N.target = Re),
              (N.relatedTarget = R),
              (B = null),
              An(O) === j &&
                ((b = new b(M, L + 'enter', Y, i, O)),
                (b.target = R),
                (b.relatedTarget = Re),
                (B = b)),
              (Re = B),
              $ && Y)
            )
              t: {
                for (b = $, M = Y, L = 0, R = b; R; R = yr(R)) L++
                for (R = 0, B = M; B; B = yr(B)) R++
                for (; 0 < L - R; ) ((b = yr(b)), L--)
                for (; 0 < R - L; ) ((M = yr(M)), R--)
                for (; L--; ) {
                  if (b === M || (M !== null && b === M.alternate)) break t
                  ;((b = yr(b)), (M = yr(M)))
                }
                b = null
              }
            else b = null
            ;($ !== null && xf(I, N, $, b, !1), Y !== null && Re !== null && xf(I, Re, Y, b, !0))
          }
        }
        e: {
          if (
            ((N = j ? kr(j) : window),
            ($ = N.nodeName && N.nodeName.toLowerCase()),
            $ === 'select' || ($ === 'input' && N.type === 'file'))
          )
            var G = j0
          else if (Jc(N))
            if (tf) G = V0
            else {
              G = F0
              var J = _0
            }
          else
            ($ = N.nodeName) &&
              $.toLowerCase() === 'input' &&
              (N.type === 'checkbox' || N.type === 'radio') &&
              (G = D0)
          if (G && (G = G(e, j))) {
            ef(I, G, i, O)
            break e
          }
          ;(J && J(e, N, j),
            e === 'focusout' &&
              (J = N._wrapperState) &&
              J.controlled &&
              N.type === 'number' &&
              $s(N, 'number', N.value))
        }
        switch (((J = j ? kr(j) : window), e)) {
          case 'focusin':
            ;(Jc(J) || J.contentEditable === 'true') && ((mr = J), (kl = j), (hi = null))
            break
          case 'focusout':
            hi = kl = mr = null
            break
          case 'mousedown':
            El = !0
            break
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ;((El = !1), cf(I, i, O))
            break
          case 'selectionchange':
            if (O0) break
          case 'keydown':
          case 'keyup':
            cf(I, i, O)
        }
        var ee
        if (ml)
          e: {
            switch (e) {
              case 'compositionstart':
                var ne = 'onCompositionStart'
                break e
              case 'compositionend':
                ne = 'onCompositionEnd'
                break e
              case 'compositionupdate':
                ne = 'onCompositionUpdate'
                break e
            }
            ne = void 0
          }
        else
          pr
            ? Xc(e, i) && (ne = 'onCompositionEnd')
            : e === 'keydown' && i.keyCode === 229 && (ne = 'onCompositionStart')
        ;(ne &&
          (bc &&
            i.locale !== 'ko' &&
            (pr || ne !== 'onCompositionStart'
              ? ne === 'onCompositionEnd' && pr && (ee = Hc())
              : ((rn = O), (ul = 'value' in rn ? rn.value : rn.textContent), (pr = !0))),
          (J = Po(j, ne)),
          0 < J.length &&
            ((ne = new Zc(ne, e, null, i, O)),
            I.push({ event: ne, listeners: J }),
            ee ? (ne.data = ee) : ((ee = qc(i)), ee !== null && (ne.data = ee)))),
          (ee = C0 ? T0(e, i) : M0(e, i)) &&
            ((j = Po(j, 'onBeforeInput')),
            0 < j.length &&
              ((O = new Zc('onBeforeInput', 'beforeinput', null, i, O)),
              I.push({ event: O, listeners: j }),
              (O.data = ee))))
      }
      kf(I, n)
    })
  }
  function gi(e, n, i) {
    return { instance: e, listener: n, currentTarget: i }
  }
  function Po(e, n) {
    for (var i = n + 'Capture', s = []; e !== null; ) {
      var u = e,
        c = u.stateNode
      ;(u.tag === 5 &&
        c !== null &&
        ((u = c),
        (c = Xr(e, i)),
        c != null && s.unshift(gi(e, c, u)),
        (c = Xr(e, n)),
        c != null && s.push(gi(e, c, u))),
        (e = e.return))
    }
    return s
  }
  function yr(e) {
    if (e === null) return null
    do e = e.return
    while (e && e.tag !== 5)
    return e || null
  }
  function xf(e, n, i, s, u) {
    for (var c = n._reactName, v = []; i !== null && i !== s; ) {
      var x = i,
        w = x.alternate,
        j = x.stateNode
      if (w !== null && w === s) break
      ;(x.tag === 5 &&
        j !== null &&
        ((x = j),
        u
          ? ((w = Xr(i, c)), w != null && v.unshift(gi(i, w, x)))
          : u || ((w = Xr(i, c)), w != null && v.push(gi(i, w, x)))),
        (i = i.return))
    }
    v.length !== 0 && e.push({ event: n, listeners: v })
  }
  var U0 = /\r\n?/g,
    H0 = /\u0000|\uFFFD/g
  function wf(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        U0,
        `
`
      )
      .replace(H0, '')
  }
  function Co(e, n, i) {
    if (((n = wf(n)), wf(e) !== n && i)) throw Error(o(425))
  }
  function To() {}
  var Cl = null,
    Tl = null
  function Ml(e, n) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof n.children == 'string' ||
      typeof n.children == 'number' ||
      (typeof n.dangerouslySetInnerHTML == 'object' &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    )
  }
  var Al = typeof setTimeout == 'function' ? setTimeout : void 0,
    $0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Lf = typeof Promise == 'function' ? Promise : void 0,
    K0 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Lf < 'u'
          ? function (e) {
              return Lf.resolve(null).then(e).catch(Z0)
            }
          : Al
  function Z0(e) {
    setTimeout(function () {
      throw e
    })
  }
  function Rl(e, n) {
    var i = n,
      s = 0
    do {
      var u = i.nextSibling
      if ((e.removeChild(i), u && u.nodeType === 8))
        if (((i = u.data), i === '/$')) {
          if (s === 0) {
            ;(e.removeChild(u), si(n))
            return
          }
          s--
        } else (i !== '$' && i !== '$?' && i !== '$!') || s++
      i = u
    } while (i)
    si(n)
  }
  function sn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType
      if (n === 1 || n === 3) break
      if (n === 8) {
        if (((n = e.data), n === '$' || n === '$!' || n === '$?')) break
        if (n === '/$') return null
      }
    }
    return e
  }
  function Sf(e) {
    e = e.previousSibling
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data
        if (i === '$' || i === '$!' || i === '$?') {
          if (n === 0) return e
          n--
        } else i === '/$' && n++
      }
      e = e.previousSibling
    }
    return null
  }
  var vr = Math.random().toString(36).slice(2),
    Dt = '__reactFiber$' + vr,
    yi = '__reactProps$' + vr,
    Bt = '__reactContainer$' + vr,
    jl = '__reactEvents$' + vr,
    Y0 = '__reactListeners$' + vr,
    b0 = '__reactHandles$' + vr
  function An(e) {
    var n = e[Dt]
    if (n) return n
    for (var i = e.parentNode; i; ) {
      if ((n = i[Bt] || i[Dt])) {
        if (((i = n.alternate), n.child !== null || (i !== null && i.child !== null)))
          for (e = Sf(e); e !== null; ) {
            if ((i = e[Dt])) return i
            e = Sf(e)
          }
        return n
      }
      ;((e = i), (i = e.parentNode))
    }
    return null
  }
  function vi(e) {
    return (
      (e = e[Dt] || e[Bt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
    )
  }
  function kr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode
    throw Error(o(33))
  }
  function Mo(e) {
    return e[yi] || null
  }
  var _l = [],
    Er = -1
  function ln(e) {
    return { current: e }
  }
  function ke(e) {
    0 > Er || ((e.current = _l[Er]), (_l[Er] = null), Er--)
  }
  function ye(e, n) {
    ;(Er++, (_l[Er] = e.current), (e.current = n))
  }
  var an = {},
    $e = ln(an),
    tt = ln(!1),
    Rn = an
  function xr(e, n) {
    var i = e.type.contextTypes
    if (!i) return an
    var s = e.stateNode
    if (s && s.__reactInternalMemoizedUnmaskedChildContext === n)
      return s.__reactInternalMemoizedMaskedChildContext
    var u = {},
      c
    for (c in i) u[c] = n[c]
    return (
      s &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = n),
        (e.__reactInternalMemoizedMaskedChildContext = u)),
      u
    )
  }
  function nt(e) {
    return ((e = e.childContextTypes), e != null)
  }
  function Ao() {
    ;(ke(tt), ke($e))
  }
  function Pf(e, n, i) {
    if ($e.current !== an) throw Error(o(168))
    ;(ye($e, n), ye(tt, i))
  }
  function Cf(e, n, i) {
    var s = e.stateNode
    if (((n = n.childContextTypes), typeof s.getChildContext != 'function')) return i
    s = s.getChildContext()
    for (var u in s) if (!(u in n)) throw Error(o(108, ge(e) || 'Unknown', u))
    return K({}, i, s)
  }
  function Ro(e) {
    return (
      (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || an),
      (Rn = $e.current),
      ye($e, e),
      ye(tt, tt.current),
      !0
    )
  }
  function Tf(e, n, i) {
    var s = e.stateNode
    if (!s) throw Error(o(169))
    ;(i
      ? ((e = Cf(e, n, Rn)),
        (s.__reactInternalMemoizedMergedChildContext = e),
        ke(tt),
        ke($e),
        ye($e, e))
      : ke(tt),
      ye(tt, i))
  }
  var zt = null,
    jo = !1,
    Fl = !1
  function Mf(e) {
    zt === null ? (zt = [e]) : zt.push(e)
  }
  function Q0(e) {
    ;((jo = !0), Mf(e))
  }
  function un() {
    if (!Fl && zt !== null) {
      Fl = !0
      var e = 0,
        n = pe
      try {
        var i = zt
        for (pe = 1; e < i.length; e++) {
          var s = i[e]
          do s = s(!0)
          while (s !== null)
        }
        ;((zt = null), (jo = !1))
      } catch (u) {
        throw (zt !== null && (zt = zt.slice(e + 1)), Ac(tl, un), u)
      } finally {
        ;((pe = n), (Fl = !1))
      }
    }
    return null
  }
  var wr = [],
    Lr = 0,
    _o = null,
    Fo = 0,
    gt = [],
    yt = 0,
    jn = null,
    Ut = 1,
    Ht = ''
  function _n(e, n) {
    ;((wr[Lr++] = Fo), (wr[Lr++] = _o), (_o = e), (Fo = n))
  }
  function Af(e, n, i) {
    ;((gt[yt++] = Ut), (gt[yt++] = Ht), (gt[yt++] = jn), (jn = e))
    var s = Ut
    e = Ht
    var u = 32 - Pt(s) - 1
    ;((s &= ~(1 << u)), (i += 1))
    var c = 32 - Pt(n) + u
    if (30 < c) {
      var v = u - (u % 5)
      ;((c = (s & ((1 << v) - 1)).toString(32)),
        (s >>= v),
        (u -= v),
        (Ut = (1 << (32 - Pt(n) + u)) | (i << u) | s),
        (Ht = c + e))
    } else ((Ut = (1 << c) | (i << u) | s), (Ht = e))
  }
  function Dl(e) {
    e.return !== null && (_n(e, 1), Af(e, 1, 0))
  }
  function Vl(e) {
    for (; e === _o; ) ((_o = wr[--Lr]), (wr[Lr] = null), (Fo = wr[--Lr]), (wr[Lr] = null))
    for (; e === jn; )
      ((jn = gt[--yt]),
        (gt[yt] = null),
        (Ht = gt[--yt]),
        (gt[yt] = null),
        (Ut = gt[--yt]),
        (gt[yt] = null))
  }
  var ft = null,
    dt = null,
    we = !1,
    Tt = null
  function Rf(e, n) {
    var i = xt(5, null, null, 0)
    ;((i.elementType = 'DELETED'),
      (i.stateNode = n),
      (i.return = e),
      (n = e.deletions),
      n === null ? ((e.deletions = [i]), (e.flags |= 16)) : n.push(i))
  }
  function jf(e, n) {
    switch (e.tag) {
      case 5:
        var i = e.type
        return (
          (n = n.nodeType !== 1 || i.toLowerCase() !== n.nodeName.toLowerCase() ? null : n),
          n !== null ? ((e.stateNode = n), (ft = e), (dt = sn(n.firstChild)), !0) : !1
        )
      case 6:
        return (
          (n = e.pendingProps === '' || n.nodeType !== 3 ? null : n),
          n !== null ? ((e.stateNode = n), (ft = e), (dt = null), !0) : !1
        )
      case 13:
        return (
          (n = n.nodeType !== 8 ? null : n),
          n !== null
            ? ((i = jn !== null ? { id: Ut, overflow: Ht } : null),
              (e.memoizedState = { dehydrated: n, treeContext: i, retryLane: 1073741824 }),
              (i = xt(18, null, null, 0)),
              (i.stateNode = n),
              (i.return = e),
              (e.child = i),
              (ft = e),
              (dt = null),
              !0)
            : !1
        )
      default:
        return !1
    }
  }
  function Nl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
  }
  function Wl(e) {
    if (we) {
      var n = dt
      if (n) {
        var i = n
        if (!jf(e, n)) {
          if (Nl(e)) throw Error(o(418))
          n = sn(i.nextSibling)
          var s = ft
          n && jf(e, n) ? Rf(s, i) : ((e.flags = (e.flags & -4097) | 2), (we = !1), (ft = e))
        }
      } else {
        if (Nl(e)) throw Error(o(418))
        ;((e.flags = (e.flags & -4097) | 2), (we = !1), (ft = e))
      }
    }
  }
  function _f(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return
    ft = e
  }
  function Do(e) {
    if (e !== ft) return !1
    if (!we) return (_f(e), (we = !0), !1)
    var n
    if (
      ((n = e.tag !== 3) &&
        !(n = e.tag !== 5) &&
        ((n = e.type), (n = n !== 'head' && n !== 'body' && !Ml(e.type, e.memoizedProps))),
      n && (n = dt))
    ) {
      if (Nl(e)) throw (Ff(), Error(o(418)))
      for (; n; ) (Rf(e, n), (n = sn(n.nextSibling)))
    }
    if ((_f(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317))
      e: {
        for (e = e.nextSibling, n = 0; e; ) {
          if (e.nodeType === 8) {
            var i = e.data
            if (i === '/$') {
              if (n === 0) {
                dt = sn(e.nextSibling)
                break e
              }
              n--
            } else (i !== '$' && i !== '$!' && i !== '$?') || n++
          }
          e = e.nextSibling
        }
        dt = null
      }
    } else dt = ft ? sn(e.stateNode.nextSibling) : null
    return !0
  }
  function Ff() {
    for (var e = dt; e; ) e = sn(e.nextSibling)
  }
  function Sr() {
    ;((dt = ft = null), (we = !1))
  }
  function Ol(e) {
    Tt === null ? (Tt = [e]) : Tt.push(e)
  }
  var G0 = z.ReactCurrentBatchConfig
  function ki(e, n, i) {
    if (((e = i.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
      if (i._owner) {
        if (((i = i._owner), i)) {
          if (i.tag !== 1) throw Error(o(309))
          var s = i.stateNode
        }
        if (!s) throw Error(o(147, e))
        var u = s,
          c = '' + e
        return n !== null && n.ref !== null && typeof n.ref == 'function' && n.ref._stringRef === c
          ? n.ref
          : ((n = function (v) {
              var x = u.refs
              v === null ? delete x[c] : (x[c] = v)
            }),
            (n._stringRef = c),
            n)
      }
      if (typeof e != 'string') throw Error(o(284))
      if (!i._owner) throw Error(o(290, e))
    }
    return e
  }
  function Vo(e, n) {
    throw (
      (e = Object.prototype.toString.call(n)),
      Error(
        o(31, e === '[object Object]' ? 'object with keys {' + Object.keys(n).join(', ') + '}' : e)
      )
    )
  }
  function Df(e) {
    var n = e._init
    return n(e._payload)
  }
  function Vf(e) {
    function n(M, L) {
      if (e) {
        var R = M.deletions
        R === null ? ((M.deletions = [L]), (M.flags |= 16)) : R.push(L)
      }
    }
    function i(M, L) {
      if (!e) return null
      for (; L !== null; ) (n(M, L), (L = L.sibling))
      return null
    }
    function s(M, L) {
      for (M = new Map(); L !== null; )
        (L.key !== null ? M.set(L.key, L) : M.set(L.index, L), (L = L.sibling))
      return M
    }
    function u(M, L) {
      return ((M = yn(M, L)), (M.index = 0), (M.sibling = null), M)
    }
    function c(M, L, R) {
      return (
        (M.index = R),
        e
          ? ((R = M.alternate),
            R !== null ? ((R = R.index), R < L ? ((M.flags |= 2), L) : R) : ((M.flags |= 2), L))
          : ((M.flags |= 1048576), L)
      )
    }
    function v(M) {
      return (e && M.alternate === null && (M.flags |= 2), M)
    }
    function x(M, L, R, B) {
      return L === null || L.tag !== 6
        ? ((L = Aa(R, M.mode, B)), (L.return = M), L)
        : ((L = u(L, R)), (L.return = M), L)
    }
    function w(M, L, R, B) {
      var G = R.type
      return G === re
        ? O(M, L, R.props.children, B, R.key)
        : L !== null &&
            (L.elementType === G ||
              (typeof G == 'object' && G !== null && G.$$typeof === Xe && Df(G) === L.type))
          ? ((B = u(L, R.props)), (B.ref = ki(M, L, R)), (B.return = M), B)
          : ((B = os(R.type, R.key, R.props, null, M.mode, B)),
            (B.ref = ki(M, L, R)),
            (B.return = M),
            B)
    }
    function j(M, L, R, B) {
      return L === null ||
        L.tag !== 4 ||
        L.stateNode.containerInfo !== R.containerInfo ||
        L.stateNode.implementation !== R.implementation
        ? ((L = Ra(R, M.mode, B)), (L.return = M), L)
        : ((L = u(L, R.children || [])), (L.return = M), L)
    }
    function O(M, L, R, B, G) {
      return L === null || L.tag !== 7
        ? ((L = Bn(R, M.mode, B, G)), (L.return = M), L)
        : ((L = u(L, R)), (L.return = M), L)
    }
    function I(M, L, R) {
      if ((typeof L == 'string' && L !== '') || typeof L == 'number')
        return ((L = Aa('' + L, M.mode, R)), (L.return = M), L)
      if (typeof L == 'object' && L !== null) {
        switch (L.$$typeof) {
          case H:
            return (
              (R = os(L.type, L.key, L.props, null, M.mode, R)),
              (R.ref = ki(M, null, L)),
              (R.return = M),
              R
            )
          case q:
            return ((L = Ra(L, M.mode, R)), (L.return = M), L)
          case Xe:
            var B = L._init
            return I(M, B(L._payload), R)
        }
        if (br(L) || X(L)) return ((L = Bn(L, M.mode, R, null)), (L.return = M), L)
        Vo(M, L)
      }
      return null
    }
    function N(M, L, R, B) {
      var G = L !== null ? L.key : null
      if ((typeof R == 'string' && R !== '') || typeof R == 'number')
        return G !== null ? null : x(M, L, '' + R, B)
      if (typeof R == 'object' && R !== null) {
        switch (R.$$typeof) {
          case H:
            return R.key === G ? w(M, L, R, B) : null
          case q:
            return R.key === G ? j(M, L, R, B) : null
          case Xe:
            return ((G = R._init), N(M, L, G(R._payload), B))
        }
        if (br(R) || X(R)) return G !== null ? null : O(M, L, R, B, null)
        Vo(M, R)
      }
      return null
    }
    function $(M, L, R, B, G) {
      if ((typeof B == 'string' && B !== '') || typeof B == 'number')
        return ((M = M.get(R) || null), x(L, M, '' + B, G))
      if (typeof B == 'object' && B !== null) {
        switch (B.$$typeof) {
          case H:
            return ((M = M.get(B.key === null ? R : B.key) || null), w(L, M, B, G))
          case q:
            return ((M = M.get(B.key === null ? R : B.key) || null), j(L, M, B, G))
          case Xe:
            var J = B._init
            return $(M, L, R, J(B._payload), G)
        }
        if (br(B) || X(B)) return ((M = M.get(R) || null), O(L, M, B, G, null))
        Vo(L, B)
      }
      return null
    }
    function Y(M, L, R, B) {
      for (
        var G = null, J = null, ee = L, ne = (L = 0), Oe = null;
        ee !== null && ne < R.length;
        ne++
      ) {
        ee.index > ne ? ((Oe = ee), (ee = null)) : (Oe = ee.sibling)
        var fe = N(M, ee, R[ne], B)
        if (fe === null) {
          ee === null && (ee = Oe)
          break
        }
        ;(e && ee && fe.alternate === null && n(M, ee),
          (L = c(fe, L, ne)),
          J === null ? (G = fe) : (J.sibling = fe),
          (J = fe),
          (ee = Oe))
      }
      if (ne === R.length) return (i(M, ee), we && _n(M, ne), G)
      if (ee === null) {
        for (; ne < R.length; ne++)
          ((ee = I(M, R[ne], B)),
            ee !== null && ((L = c(ee, L, ne)), J === null ? (G = ee) : (J.sibling = ee), (J = ee)))
        return (we && _n(M, ne), G)
      }
      for (ee = s(M, ee); ne < R.length; ne++)
        ((Oe = $(ee, M, ne, R[ne], B)),
          Oe !== null &&
            (e && Oe.alternate !== null && ee.delete(Oe.key === null ? ne : Oe.key),
            (L = c(Oe, L, ne)),
            J === null ? (G = Oe) : (J.sibling = Oe),
            (J = Oe)))
      return (
        e &&
          ee.forEach(function (vn) {
            return n(M, vn)
          }),
        we && _n(M, ne),
        G
      )
    }
    function b(M, L, R, B) {
      var G = X(R)
      if (typeof G != 'function') throw Error(o(150))
      if (((R = G.call(R)), R == null)) throw Error(o(151))
      for (
        var J = (G = null), ee = L, ne = (L = 0), Oe = null, fe = R.next();
        ee !== null && !fe.done;
        ne++, fe = R.next()
      ) {
        ee.index > ne ? ((Oe = ee), (ee = null)) : (Oe = ee.sibling)
        var vn = N(M, ee, fe.value, B)
        if (vn === null) {
          ee === null && (ee = Oe)
          break
        }
        ;(e && ee && vn.alternate === null && n(M, ee),
          (L = c(vn, L, ne)),
          J === null ? (G = vn) : (J.sibling = vn),
          (J = vn),
          (ee = Oe))
      }
      if (fe.done) return (i(M, ee), we && _n(M, ne), G)
      if (ee === null) {
        for (; !fe.done; ne++, fe = R.next())
          ((fe = I(M, fe.value, B)),
            fe !== null && ((L = c(fe, L, ne)), J === null ? (G = fe) : (J.sibling = fe), (J = fe)))
        return (we && _n(M, ne), G)
      }
      for (ee = s(M, ee); !fe.done; ne++, fe = R.next())
        ((fe = $(ee, M, ne, fe.value, B)),
          fe !== null &&
            (e && fe.alternate !== null && ee.delete(fe.key === null ? ne : fe.key),
            (L = c(fe, L, ne)),
            J === null ? (G = fe) : (J.sibling = fe),
            (J = fe)))
      return (
        e &&
          ee.forEach(function (Ag) {
            return n(M, Ag)
          }),
        we && _n(M, ne),
        G
      )
    }
    function Re(M, L, R, B) {
      if (
        (typeof R == 'object' &&
          R !== null &&
          R.type === re &&
          R.key === null &&
          (R = R.props.children),
        typeof R == 'object' && R !== null)
      ) {
        switch (R.$$typeof) {
          case H:
            e: {
              for (var G = R.key, J = L; J !== null; ) {
                if (J.key === G) {
                  if (((G = R.type), G === re)) {
                    if (J.tag === 7) {
                      ;(i(M, J.sibling), (L = u(J, R.props.children)), (L.return = M), (M = L))
                      break e
                    }
                  } else if (
                    J.elementType === G ||
                    (typeof G == 'object' && G !== null && G.$$typeof === Xe && Df(G) === J.type)
                  ) {
                    ;(i(M, J.sibling),
                      (L = u(J, R.props)),
                      (L.ref = ki(M, J, R)),
                      (L.return = M),
                      (M = L))
                    break e
                  }
                  i(M, J)
                  break
                } else n(M, J)
                J = J.sibling
              }
              R.type === re
                ? ((L = Bn(R.props.children, M.mode, B, R.key)), (L.return = M), (M = L))
                : ((B = os(R.type, R.key, R.props, null, M.mode, B)),
                  (B.ref = ki(M, L, R)),
                  (B.return = M),
                  (M = B))
            }
            return v(M)
          case q:
            e: {
              for (J = R.key; L !== null; ) {
                if (L.key === J)
                  if (
                    L.tag === 4 &&
                    L.stateNode.containerInfo === R.containerInfo &&
                    L.stateNode.implementation === R.implementation
                  ) {
                    ;(i(M, L.sibling), (L = u(L, R.children || [])), (L.return = M), (M = L))
                    break e
                  } else {
                    i(M, L)
                    break
                  }
                else n(M, L)
                L = L.sibling
              }
              ;((L = Ra(R, M.mode, B)), (L.return = M), (M = L))
            }
            return v(M)
          case Xe:
            return ((J = R._init), Re(M, L, J(R._payload), B))
        }
        if (br(R)) return Y(M, L, R, B)
        if (X(R)) return b(M, L, R, B)
        Vo(M, R)
      }
      return (typeof R == 'string' && R !== '') || typeof R == 'number'
        ? ((R = '' + R),
          L !== null && L.tag === 6
            ? (i(M, L.sibling), (L = u(L, R)), (L.return = M), (M = L))
            : (i(M, L), (L = Aa(R, M.mode, B)), (L.return = M), (M = L)),
          v(M))
        : i(M, L)
    }
    return Re
  }
  var Pr = Vf(!0),
    Nf = Vf(!1),
    No = ln(null),
    Wo = null,
    Cr = null,
    Il = null
  function Bl() {
    Il = Cr = Wo = null
  }
  function zl(e) {
    var n = No.current
    ;(ke(No), (e._currentValue = n))
  }
  function Ul(e, n, i) {
    for (; e !== null; ) {
      var s = e.alternate
      if (
        ((e.childLanes & n) !== n
          ? ((e.childLanes |= n), s !== null && (s.childLanes |= n))
          : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n),
        e === i)
      )
        break
      e = e.return
    }
  }
  function Tr(e, n) {
    ;((Wo = e),
      (Il = Cr = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & n) !== 0 && (rt = !0), (e.firstContext = null)))
  }
  function vt(e) {
    var n = e._currentValue
    if (Il !== e)
      if (((e = { context: e, memoizedValue: n, next: null }), Cr === null)) {
        if (Wo === null) throw Error(o(308))
        ;((Cr = e), (Wo.dependencies = { lanes: 0, firstContext: e }))
      } else Cr = Cr.next = e
    return n
  }
  var Fn = null
  function Hl(e) {
    Fn === null ? (Fn = [e]) : Fn.push(e)
  }
  function Wf(e, n, i, s) {
    var u = n.interleaved
    return (
      u === null ? ((i.next = i), Hl(n)) : ((i.next = u.next), (u.next = i)),
      (n.interleaved = i),
      $t(e, s)
    )
  }
  function $t(e, n) {
    e.lanes |= n
    var i = e.alternate
    for (i !== null && (i.lanes |= n), i = e, e = e.return; e !== null; )
      ((e.childLanes |= n),
        (i = e.alternate),
        i !== null && (i.childLanes |= n),
        (i = e),
        (e = e.return))
    return i.tag === 3 ? i.stateNode : null
  }
  var cn = !1
  function $l(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    }
  }
  function Of(e, n) {
    ;((e = e.updateQueue),
      n.updateQueue === e &&
        (n.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }))
  }
  function Kt(e, n) {
    return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null }
  }
  function fn(e, n, i) {
    var s = e.updateQueue
    if (s === null) return null
    if (((s = s.shared), (ae & 2) !== 0)) {
      var u = s.pending
      return (
        u === null ? (n.next = n) : ((n.next = u.next), (u.next = n)),
        (s.pending = n),
        $t(e, i)
      )
    }
    return (
      (u = s.interleaved),
      u === null ? ((n.next = n), Hl(s)) : ((n.next = u.next), (u.next = n)),
      (s.interleaved = n),
      $t(e, i)
    )
  }
  function Oo(e, n, i) {
    if (((n = n.updateQueue), n !== null && ((n = n.shared), (i & 4194240) !== 0))) {
      var s = n.lanes
      ;((s &= e.pendingLanes), (i |= s), (n.lanes = i), il(e, i))
    }
  }
  function If(e, n) {
    var i = e.updateQueue,
      s = e.alternate
    if (s !== null && ((s = s.updateQueue), i === s)) {
      var u = null,
        c = null
      if (((i = i.firstBaseUpdate), i !== null)) {
        do {
          var v = {
            eventTime: i.eventTime,
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          }
          ;(c === null ? (u = c = v) : (c = c.next = v), (i = i.next))
        } while (i !== null)
        c === null ? (u = c = n) : (c = c.next = n)
      } else u = c = n
      ;((i = {
        baseState: s.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: s.shared,
        effects: s.effects,
      }),
        (e.updateQueue = i))
      return
    }
    ;((e = i.lastBaseUpdate),
      e === null ? (i.firstBaseUpdate = n) : (e.next = n),
      (i.lastBaseUpdate = n))
  }
  function Io(e, n, i, s) {
    var u = e.updateQueue
    cn = !1
    var c = u.firstBaseUpdate,
      v = u.lastBaseUpdate,
      x = u.shared.pending
    if (x !== null) {
      u.shared.pending = null
      var w = x,
        j = w.next
      ;((w.next = null), v === null ? (c = j) : (v.next = j), (v = w))
      var O = e.alternate
      O !== null &&
        ((O = O.updateQueue),
        (x = O.lastBaseUpdate),
        x !== v && (x === null ? (O.firstBaseUpdate = j) : (x.next = j), (O.lastBaseUpdate = w)))
    }
    if (c !== null) {
      var I = u.baseState
      ;((v = 0), (O = j = w = null), (x = c))
      do {
        var N = x.lane,
          $ = x.eventTime
        if ((s & N) === N) {
          O !== null &&
            (O = O.next =
              {
                eventTime: $,
                lane: 0,
                tag: x.tag,
                payload: x.payload,
                callback: x.callback,
                next: null,
              })
          e: {
            var Y = e,
              b = x
            switch (((N = n), ($ = i), b.tag)) {
              case 1:
                if (((Y = b.payload), typeof Y == 'function')) {
                  I = Y.call($, I, N)
                  break e
                }
                I = Y
                break e
              case 3:
                Y.flags = (Y.flags & -65537) | 128
              case 0:
                if (
                  ((Y = b.payload), (N = typeof Y == 'function' ? Y.call($, I, N) : Y), N == null)
                )
                  break e
                I = K({}, I, N)
                break e
              case 2:
                cn = !0
            }
          }
          x.callback !== null &&
            x.lane !== 0 &&
            ((e.flags |= 64), (N = u.effects), N === null ? (u.effects = [x]) : N.push(x))
        } else
          (($ = {
            eventTime: $,
            lane: N,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null,
          }),
            O === null ? ((j = O = $), (w = I)) : (O = O.next = $),
            (v |= N))
        if (((x = x.next), x === null)) {
          if (((x = u.shared.pending), x === null)) break
          ;((N = x),
            (x = N.next),
            (N.next = null),
            (u.lastBaseUpdate = N),
            (u.shared.pending = null))
        }
      } while (!0)
      if (
        (O === null && (w = I),
        (u.baseState = w),
        (u.firstBaseUpdate = j),
        (u.lastBaseUpdate = O),
        (n = u.shared.interleaved),
        n !== null)
      ) {
        u = n
        do ((v |= u.lane), (u = u.next))
        while (u !== n)
      } else c === null && (u.shared.lanes = 0)
      ;((Nn |= v), (e.lanes = v), (e.memoizedState = I))
    }
  }
  function Bf(e, n, i) {
    if (((e = n.effects), (n.effects = null), e !== null))
      for (n = 0; n < e.length; n++) {
        var s = e[n],
          u = s.callback
        if (u !== null) {
          if (((s.callback = null), (s = i), typeof u != 'function')) throw Error(o(191, u))
          u.call(s)
        }
      }
  }
  var Ei = {},
    Vt = ln(Ei),
    xi = ln(Ei),
    wi = ln(Ei)
  function Dn(e) {
    if (e === Ei) throw Error(o(174))
    return e
  }
  function Kl(e, n) {
    switch ((ye(wi, n), ye(xi, e), ye(Vt, Ei), (e = n.nodeType), e)) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : Zs(null, '')
        break
      default:
        ;((e = e === 8 ? n.parentNode : n),
          (n = e.namespaceURI || null),
          (e = e.tagName),
          (n = Zs(n, e)))
    }
    ;(ke(Vt), ye(Vt, n))
  }
  function Mr() {
    ;(ke(Vt), ke(xi), ke(wi))
  }
  function zf(e) {
    Dn(wi.current)
    var n = Dn(Vt.current),
      i = Zs(n, e.type)
    n !== i && (ye(xi, e), ye(Vt, i))
  }
  function Zl(e) {
    xi.current === e && (ke(Vt), ke(xi))
  }
  var Le = ln(0)
  function Bo(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState
        if (i !== null && ((i = i.dehydrated), i === null || i.data === '$?' || i.data === '$!'))
          return n
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n
      } else if (n.child !== null) {
        ;((n.child.return = n), (n = n.child))
        continue
      }
      if (n === e) break
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null
        n = n.return
      }
      ;((n.sibling.return = n.return), (n = n.sibling))
    }
    return null
  }
  var Yl = []
  function bl() {
    for (var e = 0; e < Yl.length; e++) Yl[e]._workInProgressVersionPrimary = null
    Yl.length = 0
  }
  var zo = z.ReactCurrentDispatcher,
    Ql = z.ReactCurrentBatchConfig,
    Vn = 0,
    Se = null,
    De = null,
    Ne = null,
    Uo = !1,
    Li = !1,
    Si = 0,
    X0 = 0
  function Ke() {
    throw Error(o(321))
  }
  function Gl(e, n) {
    if (n === null) return !1
    for (var i = 0; i < n.length && i < e.length; i++) if (!Ct(e[i], n[i])) return !1
    return !0
  }
  function Xl(e, n, i, s, u, c) {
    if (
      ((Vn = c),
      (Se = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (zo.current = e === null || e.memoizedState === null ? tg : ng),
      (e = i(s, u)),
      Li)
    ) {
      c = 0
      do {
        if (((Li = !1), (Si = 0), 25 <= c)) throw Error(o(301))
        ;((c += 1), (Ne = De = null), (n.updateQueue = null), (zo.current = rg), (e = i(s, u)))
      } while (Li)
    }
    if (
      ((zo.current = Ko),
      (n = De !== null && De.next !== null),
      (Vn = 0),
      (Ne = De = Se = null),
      (Uo = !1),
      n)
    )
      throw Error(o(300))
    return e
  }
  function ql() {
    var e = Si !== 0
    return ((Si = 0), e)
  }
  function Nt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null }
    return (Ne === null ? (Se.memoizedState = Ne = e) : (Ne = Ne.next = e), Ne)
  }
  function kt() {
    if (De === null) {
      var e = Se.alternate
      e = e !== null ? e.memoizedState : null
    } else e = De.next
    var n = Ne === null ? Se.memoizedState : Ne.next
    if (n !== null) ((Ne = n), (De = e))
    else {
      if (e === null) throw Error(o(310))
      ;((De = e),
        (e = {
          memoizedState: De.memoizedState,
          baseState: De.baseState,
          baseQueue: De.baseQueue,
          queue: De.queue,
          next: null,
        }),
        Ne === null ? (Se.memoizedState = Ne = e) : (Ne = Ne.next = e))
    }
    return Ne
  }
  function Pi(e, n) {
    return typeof n == 'function' ? n(e) : n
  }
  function Jl(e) {
    var n = kt(),
      i = n.queue
    if (i === null) throw Error(o(311))
    i.lastRenderedReducer = e
    var s = De,
      u = s.baseQueue,
      c = i.pending
    if (c !== null) {
      if (u !== null) {
        var v = u.next
        ;((u.next = c.next), (c.next = v))
      }
      ;((s.baseQueue = u = c), (i.pending = null))
    }
    if (u !== null) {
      ;((c = u.next), (s = s.baseState))
      var x = (v = null),
        w = null,
        j = c
      do {
        var O = j.lane
        if ((Vn & O) === O)
          (w !== null &&
            (w = w.next =
              {
                lane: 0,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null,
              }),
            (s = j.hasEagerState ? j.eagerState : e(s, j.action)))
        else {
          var I = {
            lane: O,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null,
          }
          ;(w === null ? ((x = w = I), (v = s)) : (w = w.next = I), (Se.lanes |= O), (Nn |= O))
        }
        j = j.next
      } while (j !== null && j !== c)
      ;(w === null ? (v = s) : (w.next = x),
        Ct(s, n.memoizedState) || (rt = !0),
        (n.memoizedState = s),
        (n.baseState = v),
        (n.baseQueue = w),
        (i.lastRenderedState = s))
    }
    if (((e = i.interleaved), e !== null)) {
      u = e
      do ((c = u.lane), (Se.lanes |= c), (Nn |= c), (u = u.next))
      while (u !== e)
    } else u === null && (i.lanes = 0)
    return [n.memoizedState, i.dispatch]
  }
  function ea(e) {
    var n = kt(),
      i = n.queue
    if (i === null) throw Error(o(311))
    i.lastRenderedReducer = e
    var s = i.dispatch,
      u = i.pending,
      c = n.memoizedState
    if (u !== null) {
      i.pending = null
      var v = (u = u.next)
      do ((c = e(c, v.action)), (v = v.next))
      while (v !== u)
      ;(Ct(c, n.memoizedState) || (rt = !0),
        (n.memoizedState = c),
        n.baseQueue === null && (n.baseState = c),
        (i.lastRenderedState = c))
    }
    return [c, s]
  }
  function Uf() {}
  function Hf(e, n) {
    var i = Se,
      s = kt(),
      u = n(),
      c = !Ct(s.memoizedState, u)
    if (
      (c && ((s.memoizedState = u), (rt = !0)),
      (s = s.queue),
      ta(Zf.bind(null, i, s, e), [e]),
      s.getSnapshot !== n || c || (Ne !== null && Ne.memoizedState.tag & 1))
    ) {
      if (((i.flags |= 2048), Ci(9, Kf.bind(null, i, s, u, n), void 0, null), We === null))
        throw Error(o(349))
      ;(Vn & 30) !== 0 || $f(i, n, u)
    }
    return u
  }
  function $f(e, n, i) {
    ;((e.flags |= 16384),
      (e = { getSnapshot: n, value: i }),
      (n = Se.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }), (Se.updateQueue = n), (n.stores = [e]))
        : ((i = n.stores), i === null ? (n.stores = [e]) : i.push(e)))
  }
  function Kf(e, n, i, s) {
    ;((n.value = i), (n.getSnapshot = s), Yf(n) && bf(e))
  }
  function Zf(e, n, i) {
    return i(function () {
      Yf(n) && bf(e)
    })
  }
  function Yf(e) {
    var n = e.getSnapshot
    e = e.value
    try {
      var i = n()
      return !Ct(e, i)
    } catch {
      return !0
    }
  }
  function bf(e) {
    var n = $t(e, 1)
    n !== null && jt(n, e, 1, -1)
  }
  function Qf(e) {
    var n = Nt()
    return (
      typeof e == 'function' && (e = e()),
      (n.memoizedState = n.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pi,
        lastRenderedState: e,
      }),
      (n.queue = e),
      (e = e.dispatch = eg.bind(null, Se, e)),
      [n.memoizedState, e]
    )
  }
  function Ci(e, n, i, s) {
    return (
      (e = { tag: e, create: n, destroy: i, deps: s, next: null }),
      (n = Se.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (Se.updateQueue = n),
          (n.lastEffect = e.next = e))
        : ((i = n.lastEffect),
          i === null
            ? (n.lastEffect = e.next = e)
            : ((s = i.next), (i.next = e), (e.next = s), (n.lastEffect = e))),
      e
    )
  }
  function Gf() {
    return kt().memoizedState
  }
  function Ho(e, n, i, s) {
    var u = Nt()
    ;((Se.flags |= e), (u.memoizedState = Ci(1 | n, i, void 0, s === void 0 ? null : s)))
  }
  function $o(e, n, i, s) {
    var u = kt()
    s = s === void 0 ? null : s
    var c = void 0
    if (De !== null) {
      var v = De.memoizedState
      if (((c = v.destroy), s !== null && Gl(s, v.deps))) {
        u.memoizedState = Ci(n, i, c, s)
        return
      }
    }
    ;((Se.flags |= e), (u.memoizedState = Ci(1 | n, i, c, s)))
  }
  function Xf(e, n) {
    return Ho(8390656, 8, e, n)
  }
  function ta(e, n) {
    return $o(2048, 8, e, n)
  }
  function qf(e, n) {
    return $o(4, 2, e, n)
  }
  function Jf(e, n) {
    return $o(4, 4, e, n)
  }
  function ed(e, n) {
    if (typeof n == 'function')
      return (
        (e = e()),
        n(e),
        function () {
          n(null)
        }
      )
    if (n != null)
      return (
        (e = e()),
        (n.current = e),
        function () {
          n.current = null
        }
      )
  }
  function td(e, n, i) {
    return ((i = i != null ? i.concat([e]) : null), $o(4, 4, ed.bind(null, n, e), i))
  }
  function na() {}
  function nd(e, n) {
    var i = kt()
    n = n === void 0 ? null : n
    var s = i.memoizedState
    return s !== null && n !== null && Gl(n, s[1]) ? s[0] : ((i.memoizedState = [e, n]), e)
  }
  function rd(e, n) {
    var i = kt()
    n = n === void 0 ? null : n
    var s = i.memoizedState
    return s !== null && n !== null && Gl(n, s[1])
      ? s[0]
      : ((e = e()), (i.memoizedState = [e, n]), e)
  }
  function id(e, n, i) {
    return (Vn & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (rt = !0)), (e.memoizedState = i))
      : (Ct(i, n) || ((i = Fc()), (Se.lanes |= i), (Nn |= i), (e.baseState = !0)), n)
  }
  function q0(e, n) {
    var i = pe
    ;((pe = i !== 0 && 4 > i ? i : 4), e(!0))
    var s = Ql.transition
    Ql.transition = {}
    try {
      ;(e(!1), n())
    } finally {
      ;((pe = i), (Ql.transition = s))
    }
  }
  function od() {
    return kt().memoizedState
  }
  function J0(e, n, i) {
    var s = mn(e)
    if (((i = { lane: s, action: i, hasEagerState: !1, eagerState: null, next: null }), sd(e)))
      ld(n, i)
    else if (((i = Wf(e, n, i, s)), i !== null)) {
      var u = Je()
      ;(jt(i, e, s, u), ad(i, n, s))
    }
  }
  function eg(e, n, i) {
    var s = mn(e),
      u = { lane: s, action: i, hasEagerState: !1, eagerState: null, next: null }
    if (sd(e)) ld(n, u)
    else {
      var c = e.alternate
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = n.lastRenderedReducer), c !== null)
      )
        try {
          var v = n.lastRenderedState,
            x = c(v, i)
          if (((u.hasEagerState = !0), (u.eagerState = x), Ct(x, v))) {
            var w = n.interleaved
            ;(w === null ? ((u.next = u), Hl(n)) : ((u.next = w.next), (w.next = u)),
              (n.interleaved = u))
            return
          }
        } catch {}
      ;((i = Wf(e, n, u, s)), i !== null && ((u = Je()), jt(i, e, s, u), ad(i, n, s)))
    }
  }
  function sd(e) {
    var n = e.alternate
    return e === Se || (n !== null && n === Se)
  }
  function ld(e, n) {
    Li = Uo = !0
    var i = e.pending
    ;(i === null ? (n.next = n) : ((n.next = i.next), (i.next = n)), (e.pending = n))
  }
  function ad(e, n, i) {
    if ((i & 4194240) !== 0) {
      var s = n.lanes
      ;((s &= e.pendingLanes), (i |= s), (n.lanes = i), il(e, i))
    }
  }
  var Ko = {
      readContext: vt,
      useCallback: Ke,
      useContext: Ke,
      useEffect: Ke,
      useImperativeHandle: Ke,
      useInsertionEffect: Ke,
      useLayoutEffect: Ke,
      useMemo: Ke,
      useReducer: Ke,
      useRef: Ke,
      useState: Ke,
      useDebugValue: Ke,
      useDeferredValue: Ke,
      useTransition: Ke,
      useMutableSource: Ke,
      useSyncExternalStore: Ke,
      useId: Ke,
      unstable_isNewReconciler: !1,
    },
    tg = {
      readContext: vt,
      useCallback: function (e, n) {
        return ((Nt().memoizedState = [e, n === void 0 ? null : n]), e)
      },
      useContext: vt,
      useEffect: Xf,
      useImperativeHandle: function (e, n, i) {
        return ((i = i != null ? i.concat([e]) : null), Ho(4194308, 4, ed.bind(null, n, e), i))
      },
      useLayoutEffect: function (e, n) {
        return Ho(4194308, 4, e, n)
      },
      useInsertionEffect: function (e, n) {
        return Ho(4, 2, e, n)
      },
      useMemo: function (e, n) {
        var i = Nt()
        return ((n = n === void 0 ? null : n), (e = e()), (i.memoizedState = [e, n]), e)
      },
      useReducer: function (e, n, i) {
        var s = Nt()
        return (
          (n = i !== void 0 ? i(n) : n),
          (s.memoizedState = s.baseState = n),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (s.queue = e),
          (e = e.dispatch = J0.bind(null, Se, e)),
          [s.memoizedState, e]
        )
      },
      useRef: function (e) {
        var n = Nt()
        return ((e = { current: e }), (n.memoizedState = e))
      },
      useState: Qf,
      useDebugValue: na,
      useDeferredValue: function (e) {
        return (Nt().memoizedState = e)
      },
      useTransition: function () {
        var e = Qf(!1),
          n = e[0]
        return ((e = q0.bind(null, e[1])), (Nt().memoizedState = e), [n, e])
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, n, i) {
        var s = Se,
          u = Nt()
        if (we) {
          if (i === void 0) throw Error(o(407))
          i = i()
        } else {
          if (((i = n()), We === null)) throw Error(o(349))
          ;(Vn & 30) !== 0 || $f(s, n, i)
        }
        u.memoizedState = i
        var c = { value: i, getSnapshot: n }
        return (
          (u.queue = c),
          Xf(Zf.bind(null, s, c, e), [e]),
          (s.flags |= 2048),
          Ci(9, Kf.bind(null, s, c, i, n), void 0, null),
          i
        )
      },
      useId: function () {
        var e = Nt(),
          n = We.identifierPrefix
        if (we) {
          var i = Ht,
            s = Ut
          ;((i = (s & ~(1 << (32 - Pt(s) - 1))).toString(32) + i),
            (n = ':' + n + 'R' + i),
            (i = Si++),
            0 < i && (n += 'H' + i.toString(32)),
            (n += ':'))
        } else ((i = X0++), (n = ':' + n + 'r' + i.toString(32) + ':'))
        return (e.memoizedState = n)
      },
      unstable_isNewReconciler: !1,
    },
    ng = {
      readContext: vt,
      useCallback: nd,
      useContext: vt,
      useEffect: ta,
      useImperativeHandle: td,
      useInsertionEffect: qf,
      useLayoutEffect: Jf,
      useMemo: rd,
      useReducer: Jl,
      useRef: Gf,
      useState: function () {
        return Jl(Pi)
      },
      useDebugValue: na,
      useDeferredValue: function (e) {
        var n = kt()
        return id(n, De.memoizedState, e)
      },
      useTransition: function () {
        var e = Jl(Pi)[0],
          n = kt().memoizedState
        return [e, n]
      },
      useMutableSource: Uf,
      useSyncExternalStore: Hf,
      useId: od,
      unstable_isNewReconciler: !1,
    },
    rg = {
      readContext: vt,
      useCallback: nd,
      useContext: vt,
      useEffect: ta,
      useImperativeHandle: td,
      useInsertionEffect: qf,
      useLayoutEffect: Jf,
      useMemo: rd,
      useReducer: ea,
      useRef: Gf,
      useState: function () {
        return ea(Pi)
      },
      useDebugValue: na,
      useDeferredValue: function (e) {
        var n = kt()
        return De === null ? (n.memoizedState = e) : id(n, De.memoizedState, e)
      },
      useTransition: function () {
        var e = ea(Pi)[0],
          n = kt().memoizedState
        return [e, n]
      },
      useMutableSource: Uf,
      useSyncExternalStore: Hf,
      useId: od,
      unstable_isNewReconciler: !1,
    }
  function Mt(e, n) {
    if (e && e.defaultProps) {
      ;((n = K({}, n)), (e = e.defaultProps))
      for (var i in e) n[i] === void 0 && (n[i] = e[i])
      return n
    }
    return n
  }
  function ra(e, n, i, s) {
    ;((n = e.memoizedState),
      (i = i(s, n)),
      (i = i == null ? n : K({}, n, i)),
      (e.memoizedState = i),
      e.lanes === 0 && (e.updateQueue.baseState = i))
  }
  var Zo = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? Mn(e) === e : !1
    },
    enqueueSetState: function (e, n, i) {
      e = e._reactInternals
      var s = Je(),
        u = mn(e),
        c = Kt(s, u)
      ;((c.payload = n),
        i != null && (c.callback = i),
        (n = fn(e, c, u)),
        n !== null && (jt(n, e, u, s), Oo(n, e, u)))
    },
    enqueueReplaceState: function (e, n, i) {
      e = e._reactInternals
      var s = Je(),
        u = mn(e),
        c = Kt(s, u)
      ;((c.tag = 1),
        (c.payload = n),
        i != null && (c.callback = i),
        (n = fn(e, c, u)),
        n !== null && (jt(n, e, u, s), Oo(n, e, u)))
    },
    enqueueForceUpdate: function (e, n) {
      e = e._reactInternals
      var i = Je(),
        s = mn(e),
        u = Kt(i, s)
      ;((u.tag = 2),
        n != null && (u.callback = n),
        (n = fn(e, u, s)),
        n !== null && (jt(n, e, s, i), Oo(n, e, s)))
    },
  }
  function ud(e, n, i, s, u, c, v) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(s, c, v)
        : n.prototype && n.prototype.isPureReactComponent
          ? !di(i, s) || !di(u, c)
          : !0
    )
  }
  function cd(e, n, i) {
    var s = !1,
      u = an,
      c = n.contextType
    return (
      typeof c == 'object' && c !== null
        ? (c = vt(c))
        : ((u = nt(n) ? Rn : $e.current),
          (s = n.contextTypes),
          (c = (s = s != null) ? xr(e, u) : an)),
      (n = new n(i, c)),
      (e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
      (n.updater = Zo),
      (e.stateNode = n),
      (n._reactInternals = e),
      s &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = u),
        (e.__reactInternalMemoizedMaskedChildContext = c)),
      n
    )
  }
  function fd(e, n, i, s) {
    ;((e = n.state),
      typeof n.componentWillReceiveProps == 'function' && n.componentWillReceiveProps(i, s),
      typeof n.UNSAFE_componentWillReceiveProps == 'function' &&
        n.UNSAFE_componentWillReceiveProps(i, s),
      n.state !== e && Zo.enqueueReplaceState(n, n.state, null))
  }
  function ia(e, n, i, s) {
    var u = e.stateNode
    ;((u.props = i), (u.state = e.memoizedState), (u.refs = {}), $l(e))
    var c = n.contextType
    ;(typeof c == 'object' && c !== null
      ? (u.context = vt(c))
      : ((c = nt(n) ? Rn : $e.current), (u.context = xr(e, c))),
      (u.state = e.memoizedState),
      (c = n.getDerivedStateFromProps),
      typeof c == 'function' && (ra(e, n, c, i), (u.state = e.memoizedState)),
      typeof n.getDerivedStateFromProps == 'function' ||
        typeof u.getSnapshotBeforeUpdate == 'function' ||
        (typeof u.UNSAFE_componentWillMount != 'function' &&
          typeof u.componentWillMount != 'function') ||
        ((n = u.state),
        typeof u.componentWillMount == 'function' && u.componentWillMount(),
        typeof u.UNSAFE_componentWillMount == 'function' && u.UNSAFE_componentWillMount(),
        n !== u.state && Zo.enqueueReplaceState(u, u.state, null),
        Io(e, i, u, s),
        (u.state = e.memoizedState)),
      typeof u.componentDidMount == 'function' && (e.flags |= 4194308))
  }
  function Ar(e, n) {
    try {
      var i = '',
        s = n
      do ((i += ue(s)), (s = s.return))
      while (s)
      var u = i
    } catch (c) {
      u =
        `
Error generating stack: ` +
        c.message +
        `
` +
        c.stack
    }
    return { value: e, source: n, stack: u, digest: null }
  }
  function oa(e, n, i) {
    return { value: e, source: null, stack: i ?? null, digest: n ?? null }
  }
  function sa(e, n) {
    try {
      console.error(n.value)
    } catch (i) {
      setTimeout(function () {
        throw i
      })
    }
  }
  var ig = typeof WeakMap == 'function' ? WeakMap : Map
  function dd(e, n, i) {
    ;((i = Kt(-1, i)), (i.tag = 3), (i.payload = { element: null }))
    var s = n.value
    return (
      (i.callback = function () {
        ;(Jo || ((Jo = !0), (xa = s)), sa(e, n))
      }),
      i
    )
  }
  function hd(e, n, i) {
    ;((i = Kt(-1, i)), (i.tag = 3))
    var s = e.type.getDerivedStateFromError
    if (typeof s == 'function') {
      var u = n.value
      ;((i.payload = function () {
        return s(u)
      }),
        (i.callback = function () {
          sa(e, n)
        }))
    }
    var c = e.stateNode
    return (
      c !== null &&
        typeof c.componentDidCatch == 'function' &&
        (i.callback = function () {
          ;(sa(e, n),
            typeof s != 'function' && (hn === null ? (hn = new Set([this])) : hn.add(this)))
          var v = n.stack
          this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' })
        }),
      i
    )
  }
  function pd(e, n, i) {
    var s = e.pingCache
    if (s === null) {
      s = e.pingCache = new ig()
      var u = new Set()
      s.set(n, u)
    } else ((u = s.get(n)), u === void 0 && ((u = new Set()), s.set(n, u)))
    u.has(i) || (u.add(i), (e = vg.bind(null, e, n, i)), n.then(e, e))
  }
  function md(e) {
    do {
      var n
      if (
        ((n = e.tag === 13) &&
          ((n = e.memoizedState), (n = n !== null ? n.dehydrated !== null : !0)),
        n)
      )
        return e
      e = e.return
    } while (e !== null)
    return null
  }
  function gd(e, n, i, s, u) {
    return (e.mode & 1) === 0
      ? (e === n
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (i.flags |= 131072),
            (i.flags &= -52805),
            i.tag === 1 &&
              (i.alternate === null ? (i.tag = 17) : ((n = Kt(-1, 1)), (n.tag = 2), fn(i, n, 1))),
            (i.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = u), e)
  }
  var og = z.ReactCurrentOwner,
    rt = !1
  function qe(e, n, i, s) {
    n.child = e === null ? Nf(n, null, i, s) : Pr(n, e.child, i, s)
  }
  function yd(e, n, i, s, u) {
    i = i.render
    var c = n.ref
    return (
      Tr(n, u),
      (s = Xl(e, n, i, s, c, u)),
      (i = ql()),
      e !== null && !rt
        ? ((n.updateQueue = e.updateQueue), (n.flags &= -2053), (e.lanes &= ~u), Zt(e, n, u))
        : (we && i && Dl(n), (n.flags |= 1), qe(e, n, s, u), n.child)
    )
  }
  function vd(e, n, i, s, u) {
    if (e === null) {
      var c = i.type
      return typeof c == 'function' &&
        !Ma(c) &&
        c.defaultProps === void 0 &&
        i.compare === null &&
        i.defaultProps === void 0
        ? ((n.tag = 15), (n.type = c), kd(e, n, c, s, u))
        : ((e = os(i.type, null, s, n, n.mode, u)), (e.ref = n.ref), (e.return = n), (n.child = e))
    }
    if (((c = e.child), (e.lanes & u) === 0)) {
      var v = c.memoizedProps
      if (((i = i.compare), (i = i !== null ? i : di), i(v, s) && e.ref === n.ref))
        return Zt(e, n, u)
    }
    return ((n.flags |= 1), (e = yn(c, s)), (e.ref = n.ref), (e.return = n), (n.child = e))
  }
  function kd(e, n, i, s, u) {
    if (e !== null) {
      var c = e.memoizedProps
      if (di(c, s) && e.ref === n.ref)
        if (((rt = !1), (n.pendingProps = s = c), (e.lanes & u) !== 0))
          (e.flags & 131072) !== 0 && (rt = !0)
        else return ((n.lanes = e.lanes), Zt(e, n, u))
    }
    return la(e, n, i, s, u)
  }
  function Ed(e, n, i) {
    var s = n.pendingProps,
      u = s.children,
      c = e !== null ? e.memoizedState : null
    if (s.mode === 'hidden')
      if ((n.mode & 1) === 0)
        ((n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          ye(jr, ht),
          (ht |= i))
      else {
        if ((i & 1073741824) === 0)
          return (
            (e = c !== null ? c.baseLanes | i : i),
            (n.lanes = n.childLanes = 1073741824),
            (n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
            (n.updateQueue = null),
            ye(jr, ht),
            (ht |= e),
            null
          )
        ;((n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          (s = c !== null ? c.baseLanes : i),
          ye(jr, ht),
          (ht |= s))
      }
    else
      (c !== null ? ((s = c.baseLanes | i), (n.memoizedState = null)) : (s = i),
        ye(jr, ht),
        (ht |= s))
    return (qe(e, n, u, i), n.child)
  }
  function xd(e, n) {
    var i = n.ref
    ;((e === null && i !== null) || (e !== null && e.ref !== i)) &&
      ((n.flags |= 512), (n.flags |= 2097152))
  }
  function la(e, n, i, s, u) {
    var c = nt(i) ? Rn : $e.current
    return (
      (c = xr(n, c)),
      Tr(n, u),
      (i = Xl(e, n, i, s, c, u)),
      (s = ql()),
      e !== null && !rt
        ? ((n.updateQueue = e.updateQueue), (n.flags &= -2053), (e.lanes &= ~u), Zt(e, n, u))
        : (we && s && Dl(n), (n.flags |= 1), qe(e, n, i, u), n.child)
    )
  }
  function wd(e, n, i, s, u) {
    if (nt(i)) {
      var c = !0
      Ro(n)
    } else c = !1
    if ((Tr(n, u), n.stateNode === null)) (bo(e, n), cd(n, i, s), ia(n, i, s, u), (s = !0))
    else if (e === null) {
      var v = n.stateNode,
        x = n.memoizedProps
      v.props = x
      var w = v.context,
        j = i.contextType
      typeof j == 'object' && j !== null
        ? (j = vt(j))
        : ((j = nt(i) ? Rn : $e.current), (j = xr(n, j)))
      var O = i.getDerivedStateFromProps,
        I = typeof O == 'function' || typeof v.getSnapshotBeforeUpdate == 'function'
      ;(I ||
        (typeof v.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof v.componentWillReceiveProps != 'function') ||
        ((x !== s || w !== j) && fd(n, v, s, j)),
        (cn = !1))
      var N = n.memoizedState
      ;((v.state = N),
        Io(n, s, v, u),
        (w = n.memoizedState),
        x !== s || N !== w || tt.current || cn
          ? (typeof O == 'function' && (ra(n, i, O, s), (w = n.memoizedState)),
            (x = cn || ud(n, i, x, s, N, w, j))
              ? (I ||
                  (typeof v.UNSAFE_componentWillMount != 'function' &&
                    typeof v.componentWillMount != 'function') ||
                  (typeof v.componentWillMount == 'function' && v.componentWillMount(),
                  typeof v.UNSAFE_componentWillMount == 'function' &&
                    v.UNSAFE_componentWillMount()),
                typeof v.componentDidMount == 'function' && (n.flags |= 4194308))
              : (typeof v.componentDidMount == 'function' && (n.flags |= 4194308),
                (n.memoizedProps = s),
                (n.memoizedState = w)),
            (v.props = s),
            (v.state = w),
            (v.context = j),
            (s = x))
          : (typeof v.componentDidMount == 'function' && (n.flags |= 4194308), (s = !1)))
    } else {
      ;((v = n.stateNode),
        Of(e, n),
        (x = n.memoizedProps),
        (j = n.type === n.elementType ? x : Mt(n.type, x)),
        (v.props = j),
        (I = n.pendingProps),
        (N = v.context),
        (w = i.contextType),
        typeof w == 'object' && w !== null
          ? (w = vt(w))
          : ((w = nt(i) ? Rn : $e.current), (w = xr(n, w))))
      var $ = i.getDerivedStateFromProps
      ;((O = typeof $ == 'function' || typeof v.getSnapshotBeforeUpdate == 'function') ||
        (typeof v.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof v.componentWillReceiveProps != 'function') ||
        ((x !== I || N !== w) && fd(n, v, s, w)),
        (cn = !1),
        (N = n.memoizedState),
        (v.state = N),
        Io(n, s, v, u))
      var Y = n.memoizedState
      x !== I || N !== Y || tt.current || cn
        ? (typeof $ == 'function' && (ra(n, i, $, s), (Y = n.memoizedState)),
          (j = cn || ud(n, i, j, s, N, Y, w) || !1)
            ? (O ||
                (typeof v.UNSAFE_componentWillUpdate != 'function' &&
                  typeof v.componentWillUpdate != 'function') ||
                (typeof v.componentWillUpdate == 'function' && v.componentWillUpdate(s, Y, w),
                typeof v.UNSAFE_componentWillUpdate == 'function' &&
                  v.UNSAFE_componentWillUpdate(s, Y, w)),
              typeof v.componentDidUpdate == 'function' && (n.flags |= 4),
              typeof v.getSnapshotBeforeUpdate == 'function' && (n.flags |= 1024))
            : (typeof v.componentDidUpdate != 'function' ||
                (x === e.memoizedProps && N === e.memoizedState) ||
                (n.flags |= 4),
              typeof v.getSnapshotBeforeUpdate != 'function' ||
                (x === e.memoizedProps && N === e.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = s),
              (n.memoizedState = Y)),
          (v.props = s),
          (v.state = Y),
          (v.context = w),
          (s = j))
        : (typeof v.componentDidUpdate != 'function' ||
            (x === e.memoizedProps && N === e.memoizedState) ||
            (n.flags |= 4),
          typeof v.getSnapshotBeforeUpdate != 'function' ||
            (x === e.memoizedProps && N === e.memoizedState) ||
            (n.flags |= 1024),
          (s = !1))
    }
    return aa(e, n, i, s, c, u)
  }
  function aa(e, n, i, s, u, c) {
    xd(e, n)
    var v = (n.flags & 128) !== 0
    if (!s && !v) return (u && Tf(n, i, !1), Zt(e, n, c))
    ;((s = n.stateNode), (og.current = n))
    var x = v && typeof i.getDerivedStateFromError != 'function' ? null : s.render()
    return (
      (n.flags |= 1),
      e !== null && v
        ? ((n.child = Pr(n, e.child, null, c)), (n.child = Pr(n, null, x, c)))
        : qe(e, n, x, c),
      (n.memoizedState = s.state),
      u && Tf(n, i, !0),
      n.child
    )
  }
  function Ld(e) {
    var n = e.stateNode
    ;(n.pendingContext
      ? Pf(e, n.pendingContext, n.pendingContext !== n.context)
      : n.context && Pf(e, n.context, !1),
      Kl(e, n.containerInfo))
  }
  function Sd(e, n, i, s, u) {
    return (Sr(), Ol(u), (n.flags |= 256), qe(e, n, i, s), n.child)
  }
  var ua = { dehydrated: null, treeContext: null, retryLane: 0 }
  function ca(e) {
    return { baseLanes: e, cachePool: null, transitions: null }
  }
  function Pd(e, n, i) {
    var s = n.pendingProps,
      u = Le.current,
      c = !1,
      v = (n.flags & 128) !== 0,
      x
    if (
      ((x = v) || (x = e !== null && e.memoizedState === null ? !1 : (u & 2) !== 0),
      x ? ((c = !0), (n.flags &= -129)) : (e === null || e.memoizedState !== null) && (u |= 1),
      ye(Le, u & 1),
      e === null)
    )
      return (
        Wl(n),
        (e = n.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((n.mode & 1) === 0
              ? (n.lanes = 1)
              : e.data === '$!'
                ? (n.lanes = 8)
                : (n.lanes = 1073741824),
            null)
          : ((v = s.children),
            (e = s.fallback),
            c
              ? ((s = n.mode),
                (c = n.child),
                (v = { mode: 'hidden', children: v }),
                (s & 1) === 0 && c !== null
                  ? ((c.childLanes = 0), (c.pendingProps = v))
                  : (c = ss(v, s, 0, null)),
                (e = Bn(e, s, i, null)),
                (c.return = n),
                (e.return = n),
                (c.sibling = e),
                (n.child = c),
                (n.child.memoizedState = ca(i)),
                (n.memoizedState = ua),
                e)
              : fa(n, v))
      )
    if (((u = e.memoizedState), u !== null && ((x = u.dehydrated), x !== null)))
      return sg(e, n, v, s, x, u, i)
    if (c) {
      ;((c = s.fallback), (v = n.mode), (u = e.child), (x = u.sibling))
      var w = { mode: 'hidden', children: s.children }
      return (
        (v & 1) === 0 && n.child !== u
          ? ((s = n.child), (s.childLanes = 0), (s.pendingProps = w), (n.deletions = null))
          : ((s = yn(u, w)), (s.subtreeFlags = u.subtreeFlags & 14680064)),
        x !== null ? (c = yn(x, c)) : ((c = Bn(c, v, i, null)), (c.flags |= 2)),
        (c.return = n),
        (s.return = n),
        (s.sibling = c),
        (n.child = s),
        (s = c),
        (c = n.child),
        (v = e.child.memoizedState),
        (v =
          v === null
            ? ca(i)
            : { baseLanes: v.baseLanes | i, cachePool: null, transitions: v.transitions }),
        (c.memoizedState = v),
        (c.childLanes = e.childLanes & ~i),
        (n.memoizedState = ua),
        s
      )
    }
    return (
      (c = e.child),
      (e = c.sibling),
      (s = yn(c, { mode: 'visible', children: s.children })),
      (n.mode & 1) === 0 && (s.lanes = i),
      (s.return = n),
      (s.sibling = null),
      e !== null &&
        ((i = n.deletions), i === null ? ((n.deletions = [e]), (n.flags |= 16)) : i.push(e)),
      (n.child = s),
      (n.memoizedState = null),
      s
    )
  }
  function fa(e, n) {
    return (
      (n = ss({ mode: 'visible', children: n }, e.mode, 0, null)),
      (n.return = e),
      (e.child = n)
    )
  }
  function Yo(e, n, i, s) {
    return (
      s !== null && Ol(s),
      Pr(n, e.child, null, i),
      (e = fa(n, n.pendingProps.children)),
      (e.flags |= 2),
      (n.memoizedState = null),
      e
    )
  }
  function sg(e, n, i, s, u, c, v) {
    if (i)
      return n.flags & 256
        ? ((n.flags &= -257), (s = oa(Error(o(422)))), Yo(e, n, v, s))
        : n.memoizedState !== null
          ? ((n.child = e.child), (n.flags |= 128), null)
          : ((c = s.fallback),
            (u = n.mode),
            (s = ss({ mode: 'visible', children: s.children }, u, 0, null)),
            (c = Bn(c, u, v, null)),
            (c.flags |= 2),
            (s.return = n),
            (c.return = n),
            (s.sibling = c),
            (n.child = s),
            (n.mode & 1) !== 0 && Pr(n, e.child, null, v),
            (n.child.memoizedState = ca(v)),
            (n.memoizedState = ua),
            c)
    if ((n.mode & 1) === 0) return Yo(e, n, v, null)
    if (u.data === '$!') {
      if (((s = u.nextSibling && u.nextSibling.dataset), s)) var x = s.dgst
      return ((s = x), (c = Error(o(419))), (s = oa(c, s, void 0)), Yo(e, n, v, s))
    }
    if (((x = (v & e.childLanes) !== 0), rt || x)) {
      if (((s = We), s !== null)) {
        switch (v & -v) {
          case 4:
            u = 2
            break
          case 16:
            u = 8
            break
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            u = 32
            break
          case 536870912:
            u = 268435456
            break
          default:
            u = 0
        }
        ;((u = (u & (s.suspendedLanes | v)) !== 0 ? 0 : u),
          u !== 0 && u !== c.retryLane && ((c.retryLane = u), $t(e, u), jt(s, e, u, -1)))
      }
      return (Ta(), (s = oa(Error(o(421)))), Yo(e, n, v, s))
    }
    return u.data === '$?'
      ? ((n.flags |= 128), (n.child = e.child), (n = kg.bind(null, e)), (u._reactRetry = n), null)
      : ((e = c.treeContext),
        (dt = sn(u.nextSibling)),
        (ft = n),
        (we = !0),
        (Tt = null),
        e !== null &&
          ((gt[yt++] = Ut),
          (gt[yt++] = Ht),
          (gt[yt++] = jn),
          (Ut = e.id),
          (Ht = e.overflow),
          (jn = n)),
        (n = fa(n, s.children)),
        (n.flags |= 4096),
        n)
  }
  function Cd(e, n, i) {
    e.lanes |= n
    var s = e.alternate
    ;(s !== null && (s.lanes |= n), Ul(e.return, n, i))
  }
  function da(e, n, i, s, u) {
    var c = e.memoizedState
    c === null
      ? (e.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: s,
          tail: i,
          tailMode: u,
        })
      : ((c.isBackwards = n),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = s),
        (c.tail = i),
        (c.tailMode = u))
  }
  function Td(e, n, i) {
    var s = n.pendingProps,
      u = s.revealOrder,
      c = s.tail
    if ((qe(e, n, s.children, i), (s = Le.current), (s & 2) !== 0))
      ((s = (s & 1) | 2), (n.flags |= 128))
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = n.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Cd(e, i, n)
          else if (e.tag === 19) Cd(e, i, n)
          else if (e.child !== null) {
            ;((e.child.return = e), (e = e.child))
            continue
          }
          if (e === n) break e
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === n) break e
            e = e.return
          }
          ;((e.sibling.return = e.return), (e = e.sibling))
        }
      s &= 1
    }
    if ((ye(Le, s), (n.mode & 1) === 0)) n.memoizedState = null
    else
      switch (u) {
        case 'forwards':
          for (i = n.child, u = null; i !== null; )
            ((e = i.alternate), e !== null && Bo(e) === null && (u = i), (i = i.sibling))
          ;((i = u),
            i === null ? ((u = n.child), (n.child = null)) : ((u = i.sibling), (i.sibling = null)),
            da(n, !1, u, i, c))
          break
        case 'backwards':
          for (i = null, u = n.child, n.child = null; u !== null; ) {
            if (((e = u.alternate), e !== null && Bo(e) === null)) {
              n.child = u
              break
            }
            ;((e = u.sibling), (u.sibling = i), (i = u), (u = e))
          }
          da(n, !0, i, null, c)
          break
        case 'together':
          da(n, !1, null, null, void 0)
          break
        default:
          n.memoizedState = null
      }
    return n.child
  }
  function bo(e, n) {
    ;(n.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (n.alternate = null), (n.flags |= 2))
  }
  function Zt(e, n, i) {
    if (
      (e !== null && (n.dependencies = e.dependencies), (Nn |= n.lanes), (i & n.childLanes) === 0)
    )
      return null
    if (e !== null && n.child !== e.child) throw Error(o(153))
    if (n.child !== null) {
      for (e = n.child, i = yn(e, e.pendingProps), n.child = i, i.return = n; e.sibling !== null; )
        ((e = e.sibling), (i = i.sibling = yn(e, e.pendingProps)), (i.return = n))
      i.sibling = null
    }
    return n.child
  }
  function lg(e, n, i) {
    switch (n.tag) {
      case 3:
        ;(Ld(n), Sr())
        break
      case 5:
        zf(n)
        break
      case 1:
        nt(n.type) && Ro(n)
        break
      case 4:
        Kl(n, n.stateNode.containerInfo)
        break
      case 10:
        var s = n.type._context,
          u = n.memoizedProps.value
        ;(ye(No, s._currentValue), (s._currentValue = u))
        break
      case 13:
        if (((s = n.memoizedState), s !== null))
          return s.dehydrated !== null
            ? (ye(Le, Le.current & 1), (n.flags |= 128), null)
            : (i & n.child.childLanes) !== 0
              ? Pd(e, n, i)
              : (ye(Le, Le.current & 1), (e = Zt(e, n, i)), e !== null ? e.sibling : null)
        ye(Le, Le.current & 1)
        break
      case 19:
        if (((s = (i & n.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (s) return Td(e, n, i)
          n.flags |= 128
        }
        if (
          ((u = n.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          ye(Le, Le.current),
          s)
        )
          break
        return null
      case 22:
      case 23:
        return ((n.lanes = 0), Ed(e, n, i))
    }
    return Zt(e, n, i)
  }
  var Md, ha, Ad, Rd
  ;((Md = function (e, n) {
    for (var i = n.child; i !== null; ) {
      if (i.tag === 5 || i.tag === 6) e.appendChild(i.stateNode)
      else if (i.tag !== 4 && i.child !== null) {
        ;((i.child.return = i), (i = i.child))
        continue
      }
      if (i === n) break
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === n) return
        i = i.return
      }
      ;((i.sibling.return = i.return), (i = i.sibling))
    }
  }),
    (ha = function () {}),
    (Ad = function (e, n, i, s) {
      var u = e.memoizedProps
      if (u !== s) {
        ;((e = n.stateNode), Dn(Vt.current))
        var c = null
        switch (i) {
          case 'input':
            ;((u = Us(e, u)), (s = Us(e, s)), (c = []))
            break
          case 'select':
            ;((u = K({}, u, { value: void 0 })), (s = K({}, s, { value: void 0 })), (c = []))
            break
          case 'textarea':
            ;((u = Ks(e, u)), (s = Ks(e, s)), (c = []))
            break
          default:
            typeof u.onClick != 'function' && typeof s.onClick == 'function' && (e.onclick = To)
        }
        Ys(i, s)
        var v
        i = null
        for (j in u)
          if (!s.hasOwnProperty(j) && u.hasOwnProperty(j) && u[j] != null)
            if (j === 'style') {
              var x = u[j]
              for (v in x) x.hasOwnProperty(v) && (i || (i = {}), (i[v] = ''))
            } else
              j !== 'dangerouslySetInnerHTML' &&
                j !== 'children' &&
                j !== 'suppressContentEditableWarning' &&
                j !== 'suppressHydrationWarning' &&
                j !== 'autoFocus' &&
                (a.hasOwnProperty(j) ? c || (c = []) : (c = c || []).push(j, null))
        for (j in s) {
          var w = s[j]
          if (((x = u?.[j]), s.hasOwnProperty(j) && w !== x && (w != null || x != null)))
            if (j === 'style')
              if (x) {
                for (v in x)
                  !x.hasOwnProperty(v) || (w && w.hasOwnProperty(v)) || (i || (i = {}), (i[v] = ''))
                for (v in w) w.hasOwnProperty(v) && x[v] !== w[v] && (i || (i = {}), (i[v] = w[v]))
              } else (i || (c || (c = []), c.push(j, i)), (i = w))
            else
              j === 'dangerouslySetInnerHTML'
                ? ((w = w ? w.__html : void 0),
                  (x = x ? x.__html : void 0),
                  w != null && x !== w && (c = c || []).push(j, w))
                : j === 'children'
                  ? (typeof w != 'string' && typeof w != 'number') || (c = c || []).push(j, '' + w)
                  : j !== 'suppressContentEditableWarning' &&
                    j !== 'suppressHydrationWarning' &&
                    (a.hasOwnProperty(j)
                      ? (w != null && j === 'onScroll' && ve('scroll', e), c || x === w || (c = []))
                      : (c = c || []).push(j, w))
        }
        i && (c = c || []).push('style', i)
        var j = c
        ;(n.updateQueue = j) && (n.flags |= 4)
      }
    }),
    (Rd = function (e, n, i, s) {
      i !== s && (n.flags |= 4)
    }))
  function Ti(e, n) {
    if (!we)
      switch (e.tailMode) {
        case 'hidden':
          n = e.tail
          for (var i = null; n !== null; ) (n.alternate !== null && (i = n), (n = n.sibling))
          i === null ? (e.tail = null) : (i.sibling = null)
          break
        case 'collapsed':
          i = e.tail
          for (var s = null; i !== null; ) (i.alternate !== null && (s = i), (i = i.sibling))
          s === null
            ? n || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (s.sibling = null)
      }
  }
  function Ze(e) {
    var n = e.alternate !== null && e.alternate.child === e.child,
      i = 0,
      s = 0
    if (n)
      for (var u = e.child; u !== null; )
        ((i |= u.lanes | u.childLanes),
          (s |= u.subtreeFlags & 14680064),
          (s |= u.flags & 14680064),
          (u.return = e),
          (u = u.sibling))
    else
      for (u = e.child; u !== null; )
        ((i |= u.lanes | u.childLanes),
          (s |= u.subtreeFlags),
          (s |= u.flags),
          (u.return = e),
          (u = u.sibling))
    return ((e.subtreeFlags |= s), (e.childLanes = i), n)
  }
  function ag(e, n, i) {
    var s = n.pendingProps
    switch ((Vl(n), n.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ze(n), null)
      case 1:
        return (nt(n.type) && Ao(), Ze(n), null)
      case 3:
        return (
          (s = n.stateNode),
          Mr(),
          ke(tt),
          ke($e),
          bl(),
          s.pendingContext && ((s.context = s.pendingContext), (s.pendingContext = null)),
          (e === null || e.child === null) &&
            (Do(n)
              ? (n.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), Tt !== null && (Sa(Tt), (Tt = null)))),
          ha(e, n),
          Ze(n),
          null
        )
      case 5:
        Zl(n)
        var u = Dn(wi.current)
        if (((i = n.type), e !== null && n.stateNode != null))
          (Ad(e, n, i, s, u), e.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152)))
        else {
          if (!s) {
            if (n.stateNode === null) throw Error(o(166))
            return (Ze(n), null)
          }
          if (((e = Dn(Vt.current)), Do(n))) {
            ;((s = n.stateNode), (i = n.type))
            var c = n.memoizedProps
            switch (((s[Dt] = n), (s[yi] = c), (e = (n.mode & 1) !== 0), i)) {
              case 'dialog':
                ;(ve('cancel', s), ve('close', s))
                break
              case 'iframe':
              case 'object':
              case 'embed':
                ve('load', s)
                break
              case 'video':
              case 'audio':
                for (u = 0; u < pi.length; u++) ve(pi[u], s)
                break
              case 'source':
                ve('error', s)
                break
              case 'img':
              case 'image':
              case 'link':
                ;(ve('error', s), ve('load', s))
                break
              case 'details':
                ve('toggle', s)
                break
              case 'input':
                ;(uc(s, c), ve('invalid', s))
                break
              case 'select':
                ;((s._wrapperState = { wasMultiple: !!c.multiple }), ve('invalid', s))
                break
              case 'textarea':
                ;(dc(s, c), ve('invalid', s))
            }
            ;(Ys(i, c), (u = null))
            for (var v in c)
              if (c.hasOwnProperty(v)) {
                var x = c[v]
                v === 'children'
                  ? typeof x == 'string'
                    ? s.textContent !== x &&
                      (c.suppressHydrationWarning !== !0 && Co(s.textContent, x, e),
                      (u = ['children', x]))
                    : typeof x == 'number' &&
                      s.textContent !== '' + x &&
                      (c.suppressHydrationWarning !== !0 && Co(s.textContent, x, e),
                      (u = ['children', '' + x]))
                  : a.hasOwnProperty(v) && x != null && v === 'onScroll' && ve('scroll', s)
              }
            switch (i) {
              case 'input':
                ;(no(s), fc(s, c, !0))
                break
              case 'textarea':
                ;(no(s), pc(s))
                break
              case 'select':
              case 'option':
                break
              default:
                typeof c.onClick == 'function' && (s.onclick = To)
            }
            ;((s = u), (n.updateQueue = s), s !== null && (n.flags |= 4))
          } else {
            ;((v = u.nodeType === 9 ? u : u.ownerDocument),
              e === 'http://www.w3.org/1999/xhtml' && (e = mc(i)),
              e === 'http://www.w3.org/1999/xhtml'
                ? i === 'script'
                  ? ((e = v.createElement('div')),
                    (e.innerHTML = '<script><\/script>'),
                    (e = e.removeChild(e.firstChild)))
                  : typeof s.is == 'string'
                    ? (e = v.createElement(i, { is: s.is }))
                    : ((e = v.createElement(i)),
                      i === 'select' &&
                        ((v = e), s.multiple ? (v.multiple = !0) : s.size && (v.size = s.size)))
                : (e = v.createElementNS(e, i)),
              (e[Dt] = n),
              (e[yi] = s),
              Md(e, n, !1, !1),
              (n.stateNode = e))
            e: {
              switch (((v = bs(i, s)), i)) {
                case 'dialog':
                  ;(ve('cancel', e), ve('close', e), (u = s))
                  break
                case 'iframe':
                case 'object':
                case 'embed':
                  ;(ve('load', e), (u = s))
                  break
                case 'video':
                case 'audio':
                  for (u = 0; u < pi.length; u++) ve(pi[u], e)
                  u = s
                  break
                case 'source':
                  ;(ve('error', e), (u = s))
                  break
                case 'img':
                case 'image':
                case 'link':
                  ;(ve('error', e), ve('load', e), (u = s))
                  break
                case 'details':
                  ;(ve('toggle', e), (u = s))
                  break
                case 'input':
                  ;(uc(e, s), (u = Us(e, s)), ve('invalid', e))
                  break
                case 'option':
                  u = s
                  break
                case 'select':
                  ;((e._wrapperState = { wasMultiple: !!s.multiple }),
                    (u = K({}, s, { value: void 0 })),
                    ve('invalid', e))
                  break
                case 'textarea':
                  ;(dc(e, s), (u = Ks(e, s)), ve('invalid', e))
                  break
                default:
                  u = s
              }
              ;(Ys(i, u), (x = u))
              for (c in x)
                if (x.hasOwnProperty(c)) {
                  var w = x[c]
                  c === 'style'
                    ? vc(e, w)
                    : c === 'dangerouslySetInnerHTML'
                      ? ((w = w ? w.__html : void 0), w != null && gc(e, w))
                      : c === 'children'
                        ? typeof w == 'string'
                          ? (i !== 'textarea' || w !== '') && Qr(e, w)
                          : typeof w == 'number' && Qr(e, '' + w)
                        : c !== 'suppressContentEditableWarning' &&
                          c !== 'suppressHydrationWarning' &&
                          c !== 'autoFocus' &&
                          (a.hasOwnProperty(c)
                            ? w != null && c === 'onScroll' && ve('scroll', e)
                            : w != null && F(e, c, w, v))
                }
              switch (i) {
                case 'input':
                  ;(no(e), fc(e, s, !1))
                  break
                case 'textarea':
                  ;(no(e), pc(e))
                  break
                case 'option':
                  s.value != null && e.setAttribute('value', '' + he(s.value))
                  break
                case 'select':
                  ;((e.multiple = !!s.multiple),
                    (c = s.value),
                    c != null
                      ? ur(e, !!s.multiple, c, !1)
                      : s.defaultValue != null && ur(e, !!s.multiple, s.defaultValue, !0))
                  break
                default:
                  typeof u.onClick == 'function' && (e.onclick = To)
              }
              switch (i) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  s = !!s.autoFocus
                  break e
                case 'img':
                  s = !0
                  break e
                default:
                  s = !1
              }
            }
            s && (n.flags |= 4)
          }
          n.ref !== null && ((n.flags |= 512), (n.flags |= 2097152))
        }
        return (Ze(n), null)
      case 6:
        if (e && n.stateNode != null) Rd(e, n, e.memoizedProps, s)
        else {
          if (typeof s != 'string' && n.stateNode === null) throw Error(o(166))
          if (((i = Dn(wi.current)), Dn(Vt.current), Do(n))) {
            if (
              ((s = n.stateNode),
              (i = n.memoizedProps),
              (s[Dt] = n),
              (c = s.nodeValue !== i) && ((e = ft), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Co(s.nodeValue, i, (e.mode & 1) !== 0)
                  break
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Co(s.nodeValue, i, (e.mode & 1) !== 0)
              }
            c && (n.flags |= 4)
          } else
            ((s = (i.nodeType === 9 ? i : i.ownerDocument).createTextNode(s)),
              (s[Dt] = n),
              (n.stateNode = s))
        }
        return (Ze(n), null)
      case 13:
        if (
          (ke(Le),
          (s = n.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (we && dt !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0)
            (Ff(), Sr(), (n.flags |= 98560), (c = !1))
          else if (((c = Do(n)), s !== null && s.dehydrated !== null)) {
            if (e === null) {
              if (!c) throw Error(o(318))
              if (((c = n.memoizedState), (c = c !== null ? c.dehydrated : null), !c))
                throw Error(o(317))
              c[Dt] = n
            } else (Sr(), (n.flags & 128) === 0 && (n.memoizedState = null), (n.flags |= 4))
            ;(Ze(n), (c = !1))
          } else (Tt !== null && (Sa(Tt), (Tt = null)), (c = !0))
          if (!c) return n.flags & 65536 ? n : null
        }
        return (n.flags & 128) !== 0
          ? ((n.lanes = i), n)
          : ((s = s !== null),
            s !== (e !== null && e.memoizedState !== null) &&
              s &&
              ((n.child.flags |= 8192),
              (n.mode & 1) !== 0 &&
                (e === null || (Le.current & 1) !== 0 ? Ve === 0 && (Ve = 3) : Ta())),
            n.updateQueue !== null && (n.flags |= 4),
            Ze(n),
            null)
      case 4:
        return (Mr(), ha(e, n), e === null && mi(n.stateNode.containerInfo), Ze(n), null)
      case 10:
        return (zl(n.type._context), Ze(n), null)
      case 17:
        return (nt(n.type) && Ao(), Ze(n), null)
      case 19:
        if ((ke(Le), (c = n.memoizedState), c === null)) return (Ze(n), null)
        if (((s = (n.flags & 128) !== 0), (v = c.rendering), v === null))
          if (s) Ti(c, !1)
          else {
            if (Ve !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = n.child; e !== null; ) {
                if (((v = Bo(e)), v !== null)) {
                  for (
                    n.flags |= 128,
                      Ti(c, !1),
                      s = v.updateQueue,
                      s !== null && ((n.updateQueue = s), (n.flags |= 4)),
                      n.subtreeFlags = 0,
                      s = i,
                      i = n.child;
                    i !== null;

                  )
                    ((c = i),
                      (e = s),
                      (c.flags &= 14680066),
                      (v = c.alternate),
                      v === null
                        ? ((c.childLanes = 0),
                          (c.lanes = e),
                          (c.child = null),
                          (c.subtreeFlags = 0),
                          (c.memoizedProps = null),
                          (c.memoizedState = null),
                          (c.updateQueue = null),
                          (c.dependencies = null),
                          (c.stateNode = null))
                        : ((c.childLanes = v.childLanes),
                          (c.lanes = v.lanes),
                          (c.child = v.child),
                          (c.subtreeFlags = 0),
                          (c.deletions = null),
                          (c.memoizedProps = v.memoizedProps),
                          (c.memoizedState = v.memoizedState),
                          (c.updateQueue = v.updateQueue),
                          (c.type = v.type),
                          (e = v.dependencies),
                          (c.dependencies =
                            e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                      (i = i.sibling))
                  return (ye(Le, (Le.current & 1) | 2), n.child)
                }
                e = e.sibling
              }
            c.tail !== null &&
              Ae() > _r &&
              ((n.flags |= 128), (s = !0), Ti(c, !1), (n.lanes = 4194304))
          }
        else {
          if (!s)
            if (((e = Bo(v)), e !== null)) {
              if (
                ((n.flags |= 128),
                (s = !0),
                (i = e.updateQueue),
                i !== null && ((n.updateQueue = i), (n.flags |= 4)),
                Ti(c, !0),
                c.tail === null && c.tailMode === 'hidden' && !v.alternate && !we)
              )
                return (Ze(n), null)
            } else
              2 * Ae() - c.renderingStartTime > _r &&
                i !== 1073741824 &&
                ((n.flags |= 128), (s = !0), Ti(c, !1), (n.lanes = 4194304))
          c.isBackwards
            ? ((v.sibling = n.child), (n.child = v))
            : ((i = c.last), i !== null ? (i.sibling = v) : (n.child = v), (c.last = v))
        }
        return c.tail !== null
          ? ((n = c.tail),
            (c.rendering = n),
            (c.tail = n.sibling),
            (c.renderingStartTime = Ae()),
            (n.sibling = null),
            (i = Le.current),
            ye(Le, s ? (i & 1) | 2 : i & 1),
            n)
          : (Ze(n), null)
      case 22:
      case 23:
        return (
          Ca(),
          (s = n.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== s && (n.flags |= 8192),
          s && (n.mode & 1) !== 0
            ? (ht & 1073741824) !== 0 && (Ze(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : Ze(n),
          null
        )
      case 24:
        return null
      case 25:
        return null
    }
    throw Error(o(156, n.tag))
  }
  function ug(e, n) {
    switch ((Vl(n), n.tag)) {
      case 1:
        return (
          nt(n.type) && Ao(),
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        )
      case 3:
        return (
          Mr(),
          ke(tt),
          ke($e),
          bl(),
          (e = n.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((n.flags = (e & -65537) | 128), n) : null
        )
      case 5:
        return (Zl(n), null)
      case 13:
        if ((ke(Le), (e = n.memoizedState), e !== null && e.dehydrated !== null)) {
          if (n.alternate === null) throw Error(o(340))
          Sr()
        }
        return ((e = n.flags), e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null)
      case 19:
        return (ke(Le), null)
      case 4:
        return (Mr(), null)
      case 10:
        return (zl(n.type._context), null)
      case 22:
      case 23:
        return (Ca(), null)
      case 24:
        return null
      default:
        return null
    }
  }
  var Qo = !1,
    Ye = !1,
    cg = typeof WeakSet == 'function' ? WeakSet : Set,
    Z = null
  function Rr(e, n) {
    var i = e.ref
    if (i !== null)
      if (typeof i == 'function')
        try {
          i(null)
        } catch (s) {
          Te(e, n, s)
        }
      else i.current = null
  }
  function pa(e, n, i) {
    try {
      i()
    } catch (s) {
      Te(e, n, s)
    }
  }
  var jd = !1
  function fg(e, n) {
    if (((Cl = mo), (e = uf()), vl(e))) {
      if ('selectionStart' in e) var i = { start: e.selectionStart, end: e.selectionEnd }
      else
        e: {
          i = ((i = e.ownerDocument) && i.defaultView) || window
          var s = i.getSelection && i.getSelection()
          if (s && s.rangeCount !== 0) {
            i = s.anchorNode
            var u = s.anchorOffset,
              c = s.focusNode
            s = s.focusOffset
            try {
              ;(i.nodeType, c.nodeType)
            } catch {
              i = null
              break e
            }
            var v = 0,
              x = -1,
              w = -1,
              j = 0,
              O = 0,
              I = e,
              N = null
            t: for (;;) {
              for (
                var $;
                I !== i || (u !== 0 && I.nodeType !== 3) || (x = v + u),
                  I !== c || (s !== 0 && I.nodeType !== 3) || (w = v + s),
                  I.nodeType === 3 && (v += I.nodeValue.length),
                  ($ = I.firstChild) !== null;

              )
                ((N = I), (I = $))
              for (;;) {
                if (I === e) break t
                if (
                  (N === i && ++j === u && (x = v),
                  N === c && ++O === s && (w = v),
                  ($ = I.nextSibling) !== null)
                )
                  break
                ;((I = N), (N = I.parentNode))
              }
              I = $
            }
            i = x === -1 || w === -1 ? null : { start: x, end: w }
          } else i = null
        }
      i = i || { start: 0, end: 0 }
    } else i = null
    for (Tl = { focusedElem: e, selectionRange: i }, mo = !1, Z = n; Z !== null; )
      if (((n = Z), (e = n.child), (n.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = n), (Z = e))
      else
        for (; Z !== null; ) {
          n = Z
          try {
            var Y = n.alternate
            if ((n.flags & 1024) !== 0)
              switch (n.tag) {
                case 0:
                case 11:
                case 15:
                  break
                case 1:
                  if (Y !== null) {
                    var b = Y.memoizedProps,
                      Re = Y.memoizedState,
                      M = n.stateNode,
                      L = M.getSnapshotBeforeUpdate(
                        n.elementType === n.type ? b : Mt(n.type, b),
                        Re
                      )
                    M.__reactInternalSnapshotBeforeUpdate = L
                  }
                  break
                case 3:
                  var R = n.stateNode.containerInfo
                  R.nodeType === 1
                    ? (R.textContent = '')
                    : R.nodeType === 9 && R.documentElement && R.removeChild(R.documentElement)
                  break
                case 5:
                case 6:
                case 4:
                case 17:
                  break
                default:
                  throw Error(o(163))
              }
          } catch (B) {
            Te(n, n.return, B)
          }
          if (((e = n.sibling), e !== null)) {
            ;((e.return = n.return), (Z = e))
            break
          }
          Z = n.return
        }
    return ((Y = jd), (jd = !1), Y)
  }
  function Mi(e, n, i) {
    var s = n.updateQueue
    if (((s = s !== null ? s.lastEffect : null), s !== null)) {
      var u = (s = s.next)
      do {
        if ((u.tag & e) === e) {
          var c = u.destroy
          ;((u.destroy = void 0), c !== void 0 && pa(n, i, c))
        }
        u = u.next
      } while (u !== s)
    }
  }
  function Go(e, n) {
    if (((n = n.updateQueue), (n = n !== null ? n.lastEffect : null), n !== null)) {
      var i = (n = n.next)
      do {
        if ((i.tag & e) === e) {
          var s = i.create
          i.destroy = s()
        }
        i = i.next
      } while (i !== n)
    }
  }
  function ma(e) {
    var n = e.ref
    if (n !== null) {
      var i = e.stateNode
      ;(e.tag, (e = i), typeof n == 'function' ? n(e) : (n.current = e))
    }
  }
  function _d(e) {
    var n = e.alternate
    ;(n !== null && ((e.alternate = null), _d(n)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((n = e.stateNode),
        n !== null && (delete n[Dt], delete n[yi], delete n[jl], delete n[Y0], delete n[b0])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null))
  }
  function Fd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
  }
  function Dd(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Fd(e.return)) return null
        e = e.return
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e
        ;((e.child.return = e), (e = e.child))
      }
      if (!(e.flags & 2)) return e.stateNode
    }
  }
  function ga(e, n, i) {
    var s = e.tag
    if (s === 5 || s === 6)
      ((e = e.stateNode),
        n
          ? i.nodeType === 8
            ? i.parentNode.insertBefore(e, n)
            : i.insertBefore(e, n)
          : (i.nodeType === 8
              ? ((n = i.parentNode), n.insertBefore(e, i))
              : ((n = i), n.appendChild(e)),
            (i = i._reactRootContainer),
            i != null || n.onclick !== null || (n.onclick = To)))
    else if (s !== 4 && ((e = e.child), e !== null))
      for (ga(e, n, i), e = e.sibling; e !== null; ) (ga(e, n, i), (e = e.sibling))
  }
  function ya(e, n, i) {
    var s = e.tag
    if (s === 5 || s === 6) ((e = e.stateNode), n ? i.insertBefore(e, n) : i.appendChild(e))
    else if (s !== 4 && ((e = e.child), e !== null))
      for (ya(e, n, i), e = e.sibling; e !== null; ) (ya(e, n, i), (e = e.sibling))
  }
  var Be = null,
    At = !1
  function dn(e, n, i) {
    for (i = i.child; i !== null; ) (Vd(e, n, i), (i = i.sibling))
  }
  function Vd(e, n, i) {
    if (Ft && typeof Ft.onCommitFiberUnmount == 'function')
      try {
        Ft.onCommitFiberUnmount(ao, i)
      } catch {}
    switch (i.tag) {
      case 5:
        Ye || Rr(i, n)
      case 6:
        var s = Be,
          u = At
        ;((Be = null),
          dn(e, n, i),
          (Be = s),
          (At = u),
          Be !== null &&
            (At
              ? ((e = Be),
                (i = i.stateNode),
                e.nodeType === 8 ? e.parentNode.removeChild(i) : e.removeChild(i))
              : Be.removeChild(i.stateNode)))
        break
      case 18:
        Be !== null &&
          (At
            ? ((e = Be),
              (i = i.stateNode),
              e.nodeType === 8 ? Rl(e.parentNode, i) : e.nodeType === 1 && Rl(e, i),
              si(e))
            : Rl(Be, i.stateNode))
        break
      case 4:
        ;((s = Be),
          (u = At),
          (Be = i.stateNode.containerInfo),
          (At = !0),
          dn(e, n, i),
          (Be = s),
          (At = u))
        break
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ye && ((s = i.updateQueue), s !== null && ((s = s.lastEffect), s !== null))) {
          u = s = s.next
          do {
            var c = u,
              v = c.destroy
            ;((c = c.tag),
              v !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && pa(i, n, v),
              (u = u.next))
          } while (u !== s)
        }
        dn(e, n, i)
        break
      case 1:
        if (!Ye && (Rr(i, n), (s = i.stateNode), typeof s.componentWillUnmount == 'function'))
          try {
            ;((s.props = i.memoizedProps), (s.state = i.memoizedState), s.componentWillUnmount())
          } catch (x) {
            Te(i, n, x)
          }
        dn(e, n, i)
        break
      case 21:
        dn(e, n, i)
        break
      case 22:
        i.mode & 1
          ? ((Ye = (s = Ye) || i.memoizedState !== null), dn(e, n, i), (Ye = s))
          : dn(e, n, i)
        break
      default:
        dn(e, n, i)
    }
  }
  function Nd(e) {
    var n = e.updateQueue
    if (n !== null) {
      e.updateQueue = null
      var i = e.stateNode
      ;(i === null && (i = e.stateNode = new cg()),
        n.forEach(function (s) {
          var u = Eg.bind(null, e, s)
          i.has(s) || (i.add(s), s.then(u, u))
        }))
    }
  }
  function Rt(e, n) {
    var i = n.deletions
    if (i !== null)
      for (var s = 0; s < i.length; s++) {
        var u = i[s]
        try {
          var c = e,
            v = n,
            x = v
          e: for (; x !== null; ) {
            switch (x.tag) {
              case 5:
                ;((Be = x.stateNode), (At = !1))
                break e
              case 3:
                ;((Be = x.stateNode.containerInfo), (At = !0))
                break e
              case 4:
                ;((Be = x.stateNode.containerInfo), (At = !0))
                break e
            }
            x = x.return
          }
          if (Be === null) throw Error(o(160))
          ;(Vd(c, v, u), (Be = null), (At = !1))
          var w = u.alternate
          ;(w !== null && (w.return = null), (u.return = null))
        } catch (j) {
          Te(u, n, j)
        }
      }
    if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) (Wd(n, e), (n = n.sibling))
  }
  function Wd(e, n) {
    var i = e.alternate,
      s = e.flags
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Rt(n, e), Wt(e), s & 4)) {
          try {
            ;(Mi(3, e, e.return), Go(3, e))
          } catch (b) {
            Te(e, e.return, b)
          }
          try {
            Mi(5, e, e.return)
          } catch (b) {
            Te(e, e.return, b)
          }
        }
        break
      case 1:
        ;(Rt(n, e), Wt(e), s & 512 && i !== null && Rr(i, i.return))
        break
      case 5:
        if ((Rt(n, e), Wt(e), s & 512 && i !== null && Rr(i, i.return), e.flags & 32)) {
          var u = e.stateNode
          try {
            Qr(u, '')
          } catch (b) {
            Te(e, e.return, b)
          }
        }
        if (s & 4 && ((u = e.stateNode), u != null)) {
          var c = e.memoizedProps,
            v = i !== null ? i.memoizedProps : c,
            x = e.type,
            w = e.updateQueue
          if (((e.updateQueue = null), w !== null))
            try {
              ;(x === 'input' && c.type === 'radio' && c.name != null && cc(u, c), bs(x, v))
              var j = bs(x, c)
              for (v = 0; v < w.length; v += 2) {
                var O = w[v],
                  I = w[v + 1]
                O === 'style'
                  ? vc(u, I)
                  : O === 'dangerouslySetInnerHTML'
                    ? gc(u, I)
                    : O === 'children'
                      ? Qr(u, I)
                      : F(u, O, I, j)
              }
              switch (x) {
                case 'input':
                  Hs(u, c)
                  break
                case 'textarea':
                  hc(u, c)
                  break
                case 'select':
                  var N = u._wrapperState.wasMultiple
                  u._wrapperState.wasMultiple = !!c.multiple
                  var $ = c.value
                  $ != null
                    ? ur(u, !!c.multiple, $, !1)
                    : N !== !!c.multiple &&
                      (c.defaultValue != null
                        ? ur(u, !!c.multiple, c.defaultValue, !0)
                        : ur(u, !!c.multiple, c.multiple ? [] : '', !1))
              }
              u[yi] = c
            } catch (b) {
              Te(e, e.return, b)
            }
        }
        break
      case 6:
        if ((Rt(n, e), Wt(e), s & 4)) {
          if (e.stateNode === null) throw Error(o(162))
          ;((u = e.stateNode), (c = e.memoizedProps))
          try {
            u.nodeValue = c
          } catch (b) {
            Te(e, e.return, b)
          }
        }
        break
      case 3:
        if ((Rt(n, e), Wt(e), s & 4 && i !== null && i.memoizedState.isDehydrated))
          try {
            si(n.containerInfo)
          } catch (b) {
            Te(e, e.return, b)
          }
        break
      case 4:
        ;(Rt(n, e), Wt(e))
        break
      case 13:
        ;(Rt(n, e),
          Wt(e),
          (u = e.child),
          u.flags & 8192 &&
            ((c = u.memoizedState !== null),
            (u.stateNode.isHidden = c),
            !c || (u.alternate !== null && u.alternate.memoizedState !== null) || (Ea = Ae())),
          s & 4 && Nd(e))
        break
      case 22:
        if (
          ((O = i !== null && i.memoizedState !== null),
          e.mode & 1 ? ((Ye = (j = Ye) || O), Rt(n, e), (Ye = j)) : Rt(n, e),
          Wt(e),
          s & 8192)
        ) {
          if (
            ((j = e.memoizedState !== null), (e.stateNode.isHidden = j) && !O && (e.mode & 1) !== 0)
          )
            for (Z = e, O = e.child; O !== null; ) {
              for (I = Z = O; Z !== null; ) {
                switch (((N = Z), ($ = N.child), N.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Mi(4, N, N.return)
                    break
                  case 1:
                    Rr(N, N.return)
                    var Y = N.stateNode
                    if (typeof Y.componentWillUnmount == 'function') {
                      ;((s = N), (i = N.return))
                      try {
                        ;((n = s),
                          (Y.props = n.memoizedProps),
                          (Y.state = n.memoizedState),
                          Y.componentWillUnmount())
                      } catch (b) {
                        Te(s, i, b)
                      }
                    }
                    break
                  case 5:
                    Rr(N, N.return)
                    break
                  case 22:
                    if (N.memoizedState !== null) {
                      Bd(I)
                      continue
                    }
                }
                $ !== null ? (($.return = N), (Z = $)) : Bd(I)
              }
              O = O.sibling
            }
          e: for (O = null, I = e; ; ) {
            if (I.tag === 5) {
              if (O === null) {
                O = I
                try {
                  ;((u = I.stateNode),
                    j
                      ? ((c = u.style),
                        typeof c.setProperty == 'function'
                          ? c.setProperty('display', 'none', 'important')
                          : (c.display = 'none'))
                      : ((x = I.stateNode),
                        (w = I.memoizedProps.style),
                        (v = w != null && w.hasOwnProperty('display') ? w.display : null),
                        (x.style.display = yc('display', v))))
                } catch (b) {
                  Te(e, e.return, b)
                }
              }
            } else if (I.tag === 6) {
              if (O === null)
                try {
                  I.stateNode.nodeValue = j ? '' : I.memoizedProps
                } catch (b) {
                  Te(e, e.return, b)
                }
            } else if (
              ((I.tag !== 22 && I.tag !== 23) || I.memoizedState === null || I === e) &&
              I.child !== null
            ) {
              ;((I.child.return = I), (I = I.child))
              continue
            }
            if (I === e) break e
            for (; I.sibling === null; ) {
              if (I.return === null || I.return === e) break e
              ;(O === I && (O = null), (I = I.return))
            }
            ;(O === I && (O = null), (I.sibling.return = I.return), (I = I.sibling))
          }
        }
        break
      case 19:
        ;(Rt(n, e), Wt(e), s & 4 && Nd(e))
        break
      case 21:
        break
      default:
        ;(Rt(n, e), Wt(e))
    }
  }
  function Wt(e) {
    var n = e.flags
    if (n & 2) {
      try {
        e: {
          for (var i = e.return; i !== null; ) {
            if (Fd(i)) {
              var s = i
              break e
            }
            i = i.return
          }
          throw Error(o(160))
        }
        switch (s.tag) {
          case 5:
            var u = s.stateNode
            s.flags & 32 && (Qr(u, ''), (s.flags &= -33))
            var c = Dd(e)
            ya(e, c, u)
            break
          case 3:
          case 4:
            var v = s.stateNode.containerInfo,
              x = Dd(e)
            ga(e, x, v)
            break
          default:
            throw Error(o(161))
        }
      } catch (w) {
        Te(e, e.return, w)
      }
      e.flags &= -3
    }
    n & 4096 && (e.flags &= -4097)
  }
  function dg(e, n, i) {
    ;((Z = e), Od(e))
  }
  function Od(e, n, i) {
    for (var s = (e.mode & 1) !== 0; Z !== null; ) {
      var u = Z,
        c = u.child
      if (u.tag === 22 && s) {
        var v = u.memoizedState !== null || Qo
        if (!v) {
          var x = u.alternate,
            w = (x !== null && x.memoizedState !== null) || Ye
          x = Qo
          var j = Ye
          if (((Qo = v), (Ye = w) && !j))
            for (Z = u; Z !== null; )
              ((v = Z),
                (w = v.child),
                v.tag === 22 && v.memoizedState !== null
                  ? zd(u)
                  : w !== null
                    ? ((w.return = v), (Z = w))
                    : zd(u))
          for (; c !== null; ) ((Z = c), Od(c), (c = c.sibling))
          ;((Z = u), (Qo = x), (Ye = j))
        }
        Id(e)
      } else (u.subtreeFlags & 8772) !== 0 && c !== null ? ((c.return = u), (Z = c)) : Id(e)
    }
  }
  function Id(e) {
    for (; Z !== null; ) {
      var n = Z
      if ((n.flags & 8772) !== 0) {
        var i = n.alternate
        try {
          if ((n.flags & 8772) !== 0)
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                Ye || Go(5, n)
                break
              case 1:
                var s = n.stateNode
                if (n.flags & 4 && !Ye)
                  if (i === null) s.componentDidMount()
                  else {
                    var u = n.elementType === n.type ? i.memoizedProps : Mt(n.type, i.memoizedProps)
                    s.componentDidUpdate(u, i.memoizedState, s.__reactInternalSnapshotBeforeUpdate)
                  }
                var c = n.updateQueue
                c !== null && Bf(n, c, s)
                break
              case 3:
                var v = n.updateQueue
                if (v !== null) {
                  if (((i = null), n.child !== null))
                    switch (n.child.tag) {
                      case 5:
                        i = n.child.stateNode
                        break
                      case 1:
                        i = n.child.stateNode
                    }
                  Bf(n, v, i)
                }
                break
              case 5:
                var x = n.stateNode
                if (i === null && n.flags & 4) {
                  i = x
                  var w = n.memoizedProps
                  switch (n.type) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      w.autoFocus && i.focus()
                      break
                    case 'img':
                      w.src && (i.src = w.src)
                  }
                }
                break
              case 6:
                break
              case 4:
                break
              case 12:
                break
              case 13:
                if (n.memoizedState === null) {
                  var j = n.alternate
                  if (j !== null) {
                    var O = j.memoizedState
                    if (O !== null) {
                      var I = O.dehydrated
                      I !== null && si(I)
                    }
                  }
                }
                break
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break
              default:
                throw Error(o(163))
            }
          Ye || (n.flags & 512 && ma(n))
        } catch (N) {
          Te(n, n.return, N)
        }
      }
      if (n === e) {
        Z = null
        break
      }
      if (((i = n.sibling), i !== null)) {
        ;((i.return = n.return), (Z = i))
        break
      }
      Z = n.return
    }
  }
  function Bd(e) {
    for (; Z !== null; ) {
      var n = Z
      if (n === e) {
        Z = null
        break
      }
      var i = n.sibling
      if (i !== null) {
        ;((i.return = n.return), (Z = i))
        break
      }
      Z = n.return
    }
  }
  function zd(e) {
    for (; Z !== null; ) {
      var n = Z
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var i = n.return
            try {
              Go(4, n)
            } catch (w) {
              Te(n, i, w)
            }
            break
          case 1:
            var s = n.stateNode
            if (typeof s.componentDidMount == 'function') {
              var u = n.return
              try {
                s.componentDidMount()
              } catch (w) {
                Te(n, u, w)
              }
            }
            var c = n.return
            try {
              ma(n)
            } catch (w) {
              Te(n, c, w)
            }
            break
          case 5:
            var v = n.return
            try {
              ma(n)
            } catch (w) {
              Te(n, v, w)
            }
        }
      } catch (w) {
        Te(n, n.return, w)
      }
      if (n === e) {
        Z = null
        break
      }
      var x = n.sibling
      if (x !== null) {
        ;((x.return = n.return), (Z = x))
        break
      }
      Z = n.return
    }
  }
  var hg = Math.ceil,
    Xo = z.ReactCurrentDispatcher,
    va = z.ReactCurrentOwner,
    Et = z.ReactCurrentBatchConfig,
    ae = 0,
    We = null,
    _e = null,
    ze = 0,
    ht = 0,
    jr = ln(0),
    Ve = 0,
    Ai = null,
    Nn = 0,
    qo = 0,
    ka = 0,
    Ri = null,
    it = null,
    Ea = 0,
    _r = 1 / 0,
    Yt = null,
    Jo = !1,
    xa = null,
    hn = null,
    es = !1,
    pn = null,
    ts = 0,
    ji = 0,
    wa = null,
    ns = -1,
    rs = 0
  function Je() {
    return (ae & 6) !== 0 ? Ae() : ns !== -1 ? ns : (ns = Ae())
  }
  function mn(e) {
    return (e.mode & 1) === 0
      ? 1
      : (ae & 2) !== 0 && ze !== 0
        ? ze & -ze
        : G0.transition !== null
          ? (rs === 0 && (rs = Fc()), rs)
          : ((e = pe), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Uc(e.type))), e)
  }
  function jt(e, n, i, s) {
    if (50 < ji) throw ((ji = 0), (wa = null), Error(o(185)))
    ;(ti(e, i, s),
      ((ae & 2) === 0 || e !== We) &&
        (e === We && ((ae & 2) === 0 && (qo |= i), Ve === 4 && gn(e, ze)),
        ot(e, s),
        i === 1 && ae === 0 && (n.mode & 1) === 0 && ((_r = Ae() + 500), jo && un())))
  }
  function ot(e, n) {
    var i = e.callbackNode
    Gm(e, n)
    var s = fo(e, e === We ? ze : 0)
    if (s === 0) (i !== null && Rc(i), (e.callbackNode = null), (e.callbackPriority = 0))
    else if (((n = s & -s), e.callbackPriority !== n)) {
      if ((i != null && Rc(i), n === 1))
        (e.tag === 0 ? Q0(Hd.bind(null, e)) : Mf(Hd.bind(null, e)),
          K0(function () {
            ;(ae & 6) === 0 && un()
          }),
          (i = null))
      else {
        switch (Dc(s)) {
          case 1:
            i = tl
            break
          case 4:
            i = jc
            break
          case 16:
            i = lo
            break
          case 536870912:
            i = _c
            break
          default:
            i = lo
        }
        i = Xd(i, Ud.bind(null, e))
      }
      ;((e.callbackPriority = n), (e.callbackNode = i))
    }
  }
  function Ud(e, n) {
    if (((ns = -1), (rs = 0), (ae & 6) !== 0)) throw Error(o(327))
    var i = e.callbackNode
    if (Fr() && e.callbackNode !== i) return null
    var s = fo(e, e === We ? ze : 0)
    if (s === 0) return null
    if ((s & 30) !== 0 || (s & e.expiredLanes) !== 0 || n) n = is(e, s)
    else {
      n = s
      var u = ae
      ae |= 2
      var c = Kd()
      ;(We !== e || ze !== n) && ((Yt = null), (_r = Ae() + 500), On(e, n))
      do
        try {
          gg()
          break
        } catch (x) {
          $d(e, x)
        }
      while (!0)
      ;(Bl(), (Xo.current = c), (ae = u), _e !== null ? (n = 0) : ((We = null), (ze = 0), (n = Ve)))
    }
    if (n !== 0) {
      if ((n === 2 && ((u = nl(e)), u !== 0 && ((s = u), (n = La(e, u)))), n === 1))
        throw ((i = Ai), On(e, 0), gn(e, s), ot(e, Ae()), i)
      if (n === 6) gn(e, s)
      else {
        if (
          ((u = e.current.alternate),
          (s & 30) === 0 &&
            !pg(u) &&
            ((n = is(e, s)),
            n === 2 && ((c = nl(e)), c !== 0 && ((s = c), (n = La(e, c)))),
            n === 1))
        )
          throw ((i = Ai), On(e, 0), gn(e, s), ot(e, Ae()), i)
        switch (((e.finishedWork = u), (e.finishedLanes = s), n)) {
          case 0:
          case 1:
            throw Error(o(345))
          case 2:
            In(e, it, Yt)
            break
          case 3:
            if ((gn(e, s), (s & 130023424) === s && ((n = Ea + 500 - Ae()), 10 < n))) {
              if (fo(e, 0) !== 0) break
              if (((u = e.suspendedLanes), (u & s) !== s)) {
                ;(Je(), (e.pingedLanes |= e.suspendedLanes & u))
                break
              }
              e.timeoutHandle = Al(In.bind(null, e, it, Yt), n)
              break
            }
            In(e, it, Yt)
            break
          case 4:
            if ((gn(e, s), (s & 4194240) === s)) break
            for (n = e.eventTimes, u = -1; 0 < s; ) {
              var v = 31 - Pt(s)
              ;((c = 1 << v), (v = n[v]), v > u && (u = v), (s &= ~c))
            }
            if (
              ((s = u),
              (s = Ae() - s),
              (s =
                (120 > s
                  ? 120
                  : 480 > s
                    ? 480
                    : 1080 > s
                      ? 1080
                      : 1920 > s
                        ? 1920
                        : 3e3 > s
                          ? 3e3
                          : 4320 > s
                            ? 4320
                            : 1960 * hg(s / 1960)) - s),
              10 < s)
            ) {
              e.timeoutHandle = Al(In.bind(null, e, it, Yt), s)
              break
            }
            In(e, it, Yt)
            break
          case 5:
            In(e, it, Yt)
            break
          default:
            throw Error(o(329))
        }
      }
    }
    return (ot(e, Ae()), e.callbackNode === i ? Ud.bind(null, e) : null)
  }
  function La(e, n) {
    var i = Ri
    return (
      e.current.memoizedState.isDehydrated && (On(e, n).flags |= 256),
      (e = is(e, n)),
      e !== 2 && ((n = it), (it = i), n !== null && Sa(n)),
      e
    )
  }
  function Sa(e) {
    it === null ? (it = e) : it.push.apply(it, e)
  }
  function pg(e) {
    for (var n = e; ; ) {
      if (n.flags & 16384) {
        var i = n.updateQueue
        if (i !== null && ((i = i.stores), i !== null))
          for (var s = 0; s < i.length; s++) {
            var u = i[s],
              c = u.getSnapshot
            u = u.value
            try {
              if (!Ct(c(), u)) return !1
            } catch {
              return !1
            }
          }
      }
      if (((i = n.child), n.subtreeFlags & 16384 && i !== null)) ((i.return = n), (n = i))
      else {
        if (n === e) break
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0
          n = n.return
        }
        ;((n.sibling.return = n.return), (n = n.sibling))
      }
    }
    return !0
  }
  function gn(e, n) {
    for (
      n &= ~ka, n &= ~qo, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes;
      0 < n;

    ) {
      var i = 31 - Pt(n),
        s = 1 << i
      ;((e[i] = -1), (n &= ~s))
    }
  }
  function Hd(e) {
    if ((ae & 6) !== 0) throw Error(o(327))
    Fr()
    var n = fo(e, 0)
    if ((n & 1) === 0) return (ot(e, Ae()), null)
    var i = is(e, n)
    if (e.tag !== 0 && i === 2) {
      var s = nl(e)
      s !== 0 && ((n = s), (i = La(e, s)))
    }
    if (i === 1) throw ((i = Ai), On(e, 0), gn(e, n), ot(e, Ae()), i)
    if (i === 6) throw Error(o(345))
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = n),
      In(e, it, Yt),
      ot(e, Ae()),
      null
    )
  }
  function Pa(e, n) {
    var i = ae
    ae |= 1
    try {
      return e(n)
    } finally {
      ;((ae = i), ae === 0 && ((_r = Ae() + 500), jo && un()))
    }
  }
  function Wn(e) {
    pn !== null && pn.tag === 0 && (ae & 6) === 0 && Fr()
    var n = ae
    ae |= 1
    var i = Et.transition,
      s = pe
    try {
      if (((Et.transition = null), (pe = 1), e)) return e()
    } finally {
      ;((pe = s), (Et.transition = i), (ae = n), (ae & 6) === 0 && un())
    }
  }
  function Ca() {
    ;((ht = jr.current), ke(jr))
  }
  function On(e, n) {
    ;((e.finishedWork = null), (e.finishedLanes = 0))
    var i = e.timeoutHandle
    if ((i !== -1 && ((e.timeoutHandle = -1), $0(i)), _e !== null))
      for (i = _e.return; i !== null; ) {
        var s = i
        switch ((Vl(s), s.tag)) {
          case 1:
            ;((s = s.type.childContextTypes), s != null && Ao())
            break
          case 3:
            ;(Mr(), ke(tt), ke($e), bl())
            break
          case 5:
            Zl(s)
            break
          case 4:
            Mr()
            break
          case 13:
            ke(Le)
            break
          case 19:
            ke(Le)
            break
          case 10:
            zl(s.type._context)
            break
          case 22:
          case 23:
            Ca()
        }
        i = i.return
      }
    if (
      ((We = e),
      (_e = e = yn(e.current, null)),
      (ze = ht = n),
      (Ve = 0),
      (Ai = null),
      (ka = qo = Nn = 0),
      (it = Ri = null),
      Fn !== null)
    ) {
      for (n = 0; n < Fn.length; n++)
        if (((i = Fn[n]), (s = i.interleaved), s !== null)) {
          i.interleaved = null
          var u = s.next,
            c = i.pending
          if (c !== null) {
            var v = c.next
            ;((c.next = u), (s.next = v))
          }
          i.pending = s
        }
      Fn = null
    }
    return e
  }
  function $d(e, n) {
    do {
      var i = _e
      try {
        if ((Bl(), (zo.current = Ko), Uo)) {
          for (var s = Se.memoizedState; s !== null; ) {
            var u = s.queue
            ;(u !== null && (u.pending = null), (s = s.next))
          }
          Uo = !1
        }
        if (
          ((Vn = 0),
          (Ne = De = Se = null),
          (Li = !1),
          (Si = 0),
          (va.current = null),
          i === null || i.return === null)
        ) {
          ;((Ve = 1), (Ai = n), (_e = null))
          break
        }
        e: {
          var c = e,
            v = i.return,
            x = i,
            w = n
          if (
            ((n = ze),
            (x.flags |= 32768),
            w !== null && typeof w == 'object' && typeof w.then == 'function')
          ) {
            var j = w,
              O = x,
              I = O.tag
            if ((O.mode & 1) === 0 && (I === 0 || I === 11 || I === 15)) {
              var N = O.alternate
              N
                ? ((O.updateQueue = N.updateQueue),
                  (O.memoizedState = N.memoizedState),
                  (O.lanes = N.lanes))
                : ((O.updateQueue = null), (O.memoizedState = null))
            }
            var $ = md(v)
            if ($ !== null) {
              ;(($.flags &= -257), gd($, v, x, c, n), $.mode & 1 && pd(c, j, n), (n = $), (w = j))
              var Y = n.updateQueue
              if (Y === null) {
                var b = new Set()
                ;(b.add(w), (n.updateQueue = b))
              } else Y.add(w)
              break e
            } else {
              if ((n & 1) === 0) {
                ;(pd(c, j, n), Ta())
                break e
              }
              w = Error(o(426))
            }
          } else if (we && x.mode & 1) {
            var Re = md(v)
            if (Re !== null) {
              ;((Re.flags & 65536) === 0 && (Re.flags |= 256), gd(Re, v, x, c, n), Ol(Ar(w, x)))
              break e
            }
          }
          ;((c = w = Ar(w, x)),
            Ve !== 4 && (Ve = 2),
            Ri === null ? (Ri = [c]) : Ri.push(c),
            (c = v))
          do {
            switch (c.tag) {
              case 3:
                ;((c.flags |= 65536), (n &= -n), (c.lanes |= n))
                var M = dd(c, w, n)
                If(c, M)
                break e
              case 1:
                x = w
                var L = c.type,
                  R = c.stateNode
                if (
                  (c.flags & 128) === 0 &&
                  (typeof L.getDerivedStateFromError == 'function' ||
                    (R !== null &&
                      typeof R.componentDidCatch == 'function' &&
                      (hn === null || !hn.has(R))))
                ) {
                  ;((c.flags |= 65536), (n &= -n), (c.lanes |= n))
                  var B = hd(c, x, n)
                  If(c, B)
                  break e
                }
            }
            c = c.return
          } while (c !== null)
        }
        Yd(i)
      } catch (G) {
        ;((n = G), _e === i && i !== null && (_e = i = i.return))
        continue
      }
      break
    } while (!0)
  }
  function Kd() {
    var e = Xo.current
    return ((Xo.current = Ko), e === null ? Ko : e)
  }
  function Ta() {
    ;((Ve === 0 || Ve === 3 || Ve === 2) && (Ve = 4),
      We === null || ((Nn & 268435455) === 0 && (qo & 268435455) === 0) || gn(We, ze))
  }
  function is(e, n) {
    var i = ae
    ae |= 2
    var s = Kd()
    ;(We !== e || ze !== n) && ((Yt = null), On(e, n))
    do
      try {
        mg()
        break
      } catch (u) {
        $d(e, u)
      }
    while (!0)
    if ((Bl(), (ae = i), (Xo.current = s), _e !== null)) throw Error(o(261))
    return ((We = null), (ze = 0), Ve)
  }
  function mg() {
    for (; _e !== null; ) Zd(_e)
  }
  function gg() {
    for (; _e !== null && !zm(); ) Zd(_e)
  }
  function Zd(e) {
    var n = Gd(e.alternate, e, ht)
    ;((e.memoizedProps = e.pendingProps), n === null ? Yd(e) : (_e = n), (va.current = null))
  }
  function Yd(e) {
    var n = e
    do {
      var i = n.alternate
      if (((e = n.return), (n.flags & 32768) === 0)) {
        if (((i = ag(i, n, ht)), i !== null)) {
          _e = i
          return
        }
      } else {
        if (((i = ug(i, n)), i !== null)) {
          ;((i.flags &= 32767), (_e = i))
          return
        }
        if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null))
        else {
          ;((Ve = 6), (_e = null))
          return
        }
      }
      if (((n = n.sibling), n !== null)) {
        _e = n
        return
      }
      _e = n = e
    } while (n !== null)
    Ve === 0 && (Ve = 5)
  }
  function In(e, n, i) {
    var s = pe,
      u = Et.transition
    try {
      ;((Et.transition = null), (pe = 1), yg(e, n, i, s))
    } finally {
      ;((Et.transition = u), (pe = s))
    }
    return null
  }
  function yg(e, n, i, s) {
    do Fr()
    while (pn !== null)
    if ((ae & 6) !== 0) throw Error(o(327))
    i = e.finishedWork
    var u = e.finishedLanes
    if (i === null) return null
    if (((e.finishedWork = null), (e.finishedLanes = 0), i === e.current)) throw Error(o(177))
    ;((e.callbackNode = null), (e.callbackPriority = 0))
    var c = i.lanes | i.childLanes
    if (
      (Xm(e, c),
      e === We && ((_e = We = null), (ze = 0)),
      ((i.subtreeFlags & 2064) === 0 && (i.flags & 2064) === 0) ||
        es ||
        ((es = !0),
        Xd(lo, function () {
          return (Fr(), null)
        })),
      (c = (i.flags & 15990) !== 0),
      (i.subtreeFlags & 15990) !== 0 || c)
    ) {
      ;((c = Et.transition), (Et.transition = null))
      var v = pe
      pe = 1
      var x = ae
      ;((ae |= 4),
        (va.current = null),
        fg(e, i),
        Wd(i, e),
        W0(Tl),
        (mo = !!Cl),
        (Tl = Cl = null),
        (e.current = i),
        dg(i),
        Um(),
        (ae = x),
        (pe = v),
        (Et.transition = c))
    } else e.current = i
    if (
      (es && ((es = !1), (pn = e), (ts = u)),
      (c = e.pendingLanes),
      c === 0 && (hn = null),
      Km(i.stateNode),
      ot(e, Ae()),
      n !== null)
    )
      for (s = e.onRecoverableError, i = 0; i < n.length; i++)
        ((u = n[i]), s(u.value, { componentStack: u.stack, digest: u.digest }))
    if (Jo) throw ((Jo = !1), (e = xa), (xa = null), e)
    return (
      (ts & 1) !== 0 && e.tag !== 0 && Fr(),
      (c = e.pendingLanes),
      (c & 1) !== 0 ? (e === wa ? ji++ : ((ji = 0), (wa = e))) : (ji = 0),
      un(),
      null
    )
  }
  function Fr() {
    if (pn !== null) {
      var e = Dc(ts),
        n = Et.transition,
        i = pe
      try {
        if (((Et.transition = null), (pe = 16 > e ? 16 : e), pn === null)) var s = !1
        else {
          if (((e = pn), (pn = null), (ts = 0), (ae & 6) !== 0)) throw Error(o(331))
          var u = ae
          for (ae |= 4, Z = e.current; Z !== null; ) {
            var c = Z,
              v = c.child
            if ((Z.flags & 16) !== 0) {
              var x = c.deletions
              if (x !== null) {
                for (var w = 0; w < x.length; w++) {
                  var j = x[w]
                  for (Z = j; Z !== null; ) {
                    var O = Z
                    switch (O.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Mi(8, O, c)
                    }
                    var I = O.child
                    if (I !== null) ((I.return = O), (Z = I))
                    else
                      for (; Z !== null; ) {
                        O = Z
                        var N = O.sibling,
                          $ = O.return
                        if ((_d(O), O === j)) {
                          Z = null
                          break
                        }
                        if (N !== null) {
                          ;((N.return = $), (Z = N))
                          break
                        }
                        Z = $
                      }
                  }
                }
                var Y = c.alternate
                if (Y !== null) {
                  var b = Y.child
                  if (b !== null) {
                    Y.child = null
                    do {
                      var Re = b.sibling
                      ;((b.sibling = null), (b = Re))
                    } while (b !== null)
                  }
                }
                Z = c
              }
            }
            if ((c.subtreeFlags & 2064) !== 0 && v !== null) ((v.return = c), (Z = v))
            else
              e: for (; Z !== null; ) {
                if (((c = Z), (c.flags & 2048) !== 0))
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Mi(9, c, c.return)
                  }
                var M = c.sibling
                if (M !== null) {
                  ;((M.return = c.return), (Z = M))
                  break e
                }
                Z = c.return
              }
          }
          var L = e.current
          for (Z = L; Z !== null; ) {
            v = Z
            var R = v.child
            if ((v.subtreeFlags & 2064) !== 0 && R !== null) ((R.return = v), (Z = R))
            else
              e: for (v = L; Z !== null; ) {
                if (((x = Z), (x.flags & 2048) !== 0))
                  try {
                    switch (x.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Go(9, x)
                    }
                  } catch (G) {
                    Te(x, x.return, G)
                  }
                if (x === v) {
                  Z = null
                  break e
                }
                var B = x.sibling
                if (B !== null) {
                  ;((B.return = x.return), (Z = B))
                  break e
                }
                Z = x.return
              }
          }
          if (((ae = u), un(), Ft && typeof Ft.onPostCommitFiberRoot == 'function'))
            try {
              Ft.onPostCommitFiberRoot(ao, e)
            } catch {}
          s = !0
        }
        return s
      } finally {
        ;((pe = i), (Et.transition = n))
      }
    }
    return !1
  }
  function bd(e, n, i) {
    ;((n = Ar(i, n)),
      (n = dd(e, n, 1)),
      (e = fn(e, n, 1)),
      (n = Je()),
      e !== null && (ti(e, 1, n), ot(e, n)))
  }
  function Te(e, n, i) {
    if (e.tag === 3) bd(e, e, i)
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          bd(n, e, i)
          break
        } else if (n.tag === 1) {
          var s = n.stateNode
          if (
            typeof n.type.getDerivedStateFromError == 'function' ||
            (typeof s.componentDidCatch == 'function' && (hn === null || !hn.has(s)))
          ) {
            ;((e = Ar(i, e)),
              (e = hd(n, e, 1)),
              (n = fn(n, e, 1)),
              (e = Je()),
              n !== null && (ti(n, 1, e), ot(n, e)))
            break
          }
        }
        n = n.return
      }
  }
  function vg(e, n, i) {
    var s = e.pingCache
    ;(s !== null && s.delete(n),
      (n = Je()),
      (e.pingedLanes |= e.suspendedLanes & i),
      We === e &&
        (ze & i) === i &&
        (Ve === 4 || (Ve === 3 && (ze & 130023424) === ze && 500 > Ae() - Ea)
          ? On(e, 0)
          : (ka |= i)),
      ot(e, n))
  }
  function Qd(e, n) {
    n === 0 &&
      ((e.mode & 1) === 0
        ? (n = 1)
        : ((n = co), (co <<= 1), (co & 130023424) === 0 && (co = 4194304)))
    var i = Je()
    ;((e = $t(e, n)), e !== null && (ti(e, n, i), ot(e, i)))
  }
  function kg(e) {
    var n = e.memoizedState,
      i = 0
    ;(n !== null && (i = n.retryLane), Qd(e, i))
  }
  function Eg(e, n) {
    var i = 0
    switch (e.tag) {
      case 13:
        var s = e.stateNode,
          u = e.memoizedState
        u !== null && (i = u.retryLane)
        break
      case 19:
        s = e.stateNode
        break
      default:
        throw Error(o(314))
    }
    ;(s !== null && s.delete(n), Qd(e, i))
  }
  var Gd
  Gd = function (e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps || tt.current) rt = !0
      else {
        if ((e.lanes & i) === 0 && (n.flags & 128) === 0) return ((rt = !1), lg(e, n, i))
        rt = (e.flags & 131072) !== 0
      }
    else ((rt = !1), we && (n.flags & 1048576) !== 0 && Af(n, Fo, n.index))
    switch (((n.lanes = 0), n.tag)) {
      case 2:
        var s = n.type
        ;(bo(e, n), (e = n.pendingProps))
        var u = xr(n, $e.current)
        ;(Tr(n, i), (u = Xl(null, n, s, e, u, i)))
        var c = ql()
        return (
          (n.flags |= 1),
          typeof u == 'object' &&
          u !== null &&
          typeof u.render == 'function' &&
          u.$$typeof === void 0
            ? ((n.tag = 1),
              (n.memoizedState = null),
              (n.updateQueue = null),
              nt(s) ? ((c = !0), Ro(n)) : (c = !1),
              (n.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null),
              $l(n),
              (u.updater = Zo),
              (n.stateNode = u),
              (u._reactInternals = n),
              ia(n, s, e, i),
              (n = aa(null, n, s, !0, c, i)))
            : ((n.tag = 0), we && c && Dl(n), qe(null, n, u, i), (n = n.child)),
          n
        )
      case 16:
        s = n.elementType
        e: {
          switch (
            (bo(e, n),
            (e = n.pendingProps),
            (u = s._init),
            (s = u(s._payload)),
            (n.type = s),
            (u = n.tag = wg(s)),
            (e = Mt(s, e)),
            u)
          ) {
            case 0:
              n = la(null, n, s, e, i)
              break e
            case 1:
              n = wd(null, n, s, e, i)
              break e
            case 11:
              n = yd(null, n, s, e, i)
              break e
            case 14:
              n = vd(null, n, s, Mt(s.type, e), i)
              break e
          }
          throw Error(o(306, s, ''))
        }
        return n
      case 0:
        return (
          (s = n.type),
          (u = n.pendingProps),
          (u = n.elementType === s ? u : Mt(s, u)),
          la(e, n, s, u, i)
        )
      case 1:
        return (
          (s = n.type),
          (u = n.pendingProps),
          (u = n.elementType === s ? u : Mt(s, u)),
          wd(e, n, s, u, i)
        )
      case 3:
        e: {
          if ((Ld(n), e === null)) throw Error(o(387))
          ;((s = n.pendingProps),
            (c = n.memoizedState),
            (u = c.element),
            Of(e, n),
            Io(n, s, null, i))
          var v = n.memoizedState
          if (((s = v.element), c.isDehydrated))
            if (
              ((c = {
                element: s,
                isDehydrated: !1,
                cache: v.cache,
                pendingSuspenseBoundaries: v.pendingSuspenseBoundaries,
                transitions: v.transitions,
              }),
              (n.updateQueue.baseState = c),
              (n.memoizedState = c),
              n.flags & 256)
            ) {
              ;((u = Ar(Error(o(423)), n)), (n = Sd(e, n, s, i, u)))
              break e
            } else if (s !== u) {
              ;((u = Ar(Error(o(424)), n)), (n = Sd(e, n, s, i, u)))
              break e
            } else
              for (
                dt = sn(n.stateNode.containerInfo.firstChild),
                  ft = n,
                  we = !0,
                  Tt = null,
                  i = Nf(n, null, s, i),
                  n.child = i;
                i;

              )
                ((i.flags = (i.flags & -3) | 4096), (i = i.sibling))
          else {
            if ((Sr(), s === u)) {
              n = Zt(e, n, i)
              break e
            }
            qe(e, n, s, i)
          }
          n = n.child
        }
        return n
      case 5:
        return (
          zf(n),
          e === null && Wl(n),
          (s = n.type),
          (u = n.pendingProps),
          (c = e !== null ? e.memoizedProps : null),
          (v = u.children),
          Ml(s, u) ? (v = null) : c !== null && Ml(s, c) && (n.flags |= 32),
          xd(e, n),
          qe(e, n, v, i),
          n.child
        )
      case 6:
        return (e === null && Wl(n), null)
      case 13:
        return Pd(e, n, i)
      case 4:
        return (
          Kl(n, n.stateNode.containerInfo),
          (s = n.pendingProps),
          e === null ? (n.child = Pr(n, null, s, i)) : qe(e, n, s, i),
          n.child
        )
      case 11:
        return (
          (s = n.type),
          (u = n.pendingProps),
          (u = n.elementType === s ? u : Mt(s, u)),
          yd(e, n, s, u, i)
        )
      case 7:
        return (qe(e, n, n.pendingProps, i), n.child)
      case 8:
        return (qe(e, n, n.pendingProps.children, i), n.child)
      case 12:
        return (qe(e, n, n.pendingProps.children, i), n.child)
      case 10:
        e: {
          if (
            ((s = n.type._context),
            (u = n.pendingProps),
            (c = n.memoizedProps),
            (v = u.value),
            ye(No, s._currentValue),
            (s._currentValue = v),
            c !== null)
          )
            if (Ct(c.value, v)) {
              if (c.children === u.children && !tt.current) {
                n = Zt(e, n, i)
                break e
              }
            } else
              for (c = n.child, c !== null && (c.return = n); c !== null; ) {
                var x = c.dependencies
                if (x !== null) {
                  v = c.child
                  for (var w = x.firstContext; w !== null; ) {
                    if (w.context === s) {
                      if (c.tag === 1) {
                        ;((w = Kt(-1, i & -i)), (w.tag = 2))
                        var j = c.updateQueue
                        if (j !== null) {
                          j = j.shared
                          var O = j.pending
                          ;(O === null ? (w.next = w) : ((w.next = O.next), (O.next = w)),
                            (j.pending = w))
                        }
                      }
                      ;((c.lanes |= i),
                        (w = c.alternate),
                        w !== null && (w.lanes |= i),
                        Ul(c.return, i, n),
                        (x.lanes |= i))
                      break
                    }
                    w = w.next
                  }
                } else if (c.tag === 10) v = c.type === n.type ? null : c.child
                else if (c.tag === 18) {
                  if (((v = c.return), v === null)) throw Error(o(341))
                  ;((v.lanes |= i),
                    (x = v.alternate),
                    x !== null && (x.lanes |= i),
                    Ul(v, i, n),
                    (v = c.sibling))
                } else v = c.child
                if (v !== null) v.return = c
                else
                  for (v = c; v !== null; ) {
                    if (v === n) {
                      v = null
                      break
                    }
                    if (((c = v.sibling), c !== null)) {
                      ;((c.return = v.return), (v = c))
                      break
                    }
                    v = v.return
                  }
                c = v
              }
          ;(qe(e, n, u.children, i), (n = n.child))
        }
        return n
      case 9:
        return (
          (u = n.type),
          (s = n.pendingProps.children),
          Tr(n, i),
          (u = vt(u)),
          (s = s(u)),
          (n.flags |= 1),
          qe(e, n, s, i),
          n.child
        )
      case 14:
        return ((s = n.type), (u = Mt(s, n.pendingProps)), (u = Mt(s.type, u)), vd(e, n, s, u, i))
      case 15:
        return kd(e, n, n.type, n.pendingProps, i)
      case 17:
        return (
          (s = n.type),
          (u = n.pendingProps),
          (u = n.elementType === s ? u : Mt(s, u)),
          bo(e, n),
          (n.tag = 1),
          nt(s) ? ((e = !0), Ro(n)) : (e = !1),
          Tr(n, i),
          cd(n, s, u),
          ia(n, s, u, i),
          aa(null, n, s, !0, e, i)
        )
      case 19:
        return Td(e, n, i)
      case 22:
        return Ed(e, n, i)
    }
    throw Error(o(156, n.tag))
  }
  function Xd(e, n) {
    return Ac(e, n)
  }
  function xg(e, n, i, s) {
    ;((this.tag = e),
      (this.key = i),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = n),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = s),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null))
  }
  function xt(e, n, i, s) {
    return new xg(e, n, i, s)
  }
  function Ma(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent))
  }
  function wg(e) {
    if (typeof e == 'function') return Ma(e) ? 1 : 0
    if (e != null) {
      if (((e = e.$$typeof), e === Ge)) return 11
      if (e === at) return 14
    }
    return 2
  }
  function yn(e, n) {
    var i = e.alternate
    return (
      i === null
        ? ((i = xt(e.tag, n, e.key, e.mode)),
          (i.elementType = e.elementType),
          (i.type = e.type),
          (i.stateNode = e.stateNode),
          (i.alternate = e),
          (e.alternate = i))
        : ((i.pendingProps = n),
          (i.type = e.type),
          (i.flags = 0),
          (i.subtreeFlags = 0),
          (i.deletions = null)),
      (i.flags = e.flags & 14680064),
      (i.childLanes = e.childLanes),
      (i.lanes = e.lanes),
      (i.child = e.child),
      (i.memoizedProps = e.memoizedProps),
      (i.memoizedState = e.memoizedState),
      (i.updateQueue = e.updateQueue),
      (n = e.dependencies),
      (i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (i.sibling = e.sibling),
      (i.index = e.index),
      (i.ref = e.ref),
      i
    )
  }
  function os(e, n, i, s, u, c) {
    var v = 2
    if (((s = e), typeof e == 'function')) Ma(e) && (v = 1)
    else if (typeof e == 'string') v = 5
    else
      e: switch (e) {
        case re:
          return Bn(i.children, u, c, n)
        case Q:
          ;((v = 8), (u |= 8))
          break
        case me:
          return ((e = xt(12, i, n, u | 2)), (e.elementType = me), (e.lanes = c), e)
        case Ie:
          return ((e = xt(13, i, n, u)), (e.elementType = Ie), (e.lanes = c), e)
        case He:
          return ((e = xt(19, i, n, u)), (e.elementType = He), (e.lanes = c), e)
        case oe:
          return ss(i, u, c, n)
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case de:
                v = 10
                break e
              case Fe:
                v = 9
                break e
              case Ge:
                v = 11
                break e
              case at:
                v = 14
                break e
              case Xe:
                ;((v = 16), (s = null))
                break e
            }
          throw Error(o(130, e == null ? e : typeof e, ''))
      }
    return ((n = xt(v, i, n, u)), (n.elementType = e), (n.type = s), (n.lanes = c), n)
  }
  function Bn(e, n, i, s) {
    return ((e = xt(7, e, s, n)), (e.lanes = i), e)
  }
  function ss(e, n, i, s) {
    return (
      (e = xt(22, e, s, n)),
      (e.elementType = oe),
      (e.lanes = i),
      (e.stateNode = { isHidden: !1 }),
      e
    )
  }
  function Aa(e, n, i) {
    return ((e = xt(6, e, null, n)), (e.lanes = i), e)
  }
  function Ra(e, n, i) {
    return (
      (n = xt(4, e.children !== null ? e.children : [], e.key, n)),
      (n.lanes = i),
      (n.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      n
    )
  }
  function Lg(e, n, i, s, u) {
    ;((this.tag = n),
      (this.containerInfo = e),
      (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = rl(0)),
      (this.expirationTimes = rl(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = rl(0)),
      (this.identifierPrefix = s),
      (this.onRecoverableError = u),
      (this.mutableSourceEagerHydrationData = null))
  }
  function ja(e, n, i, s, u, c, v, x, w) {
    return (
      (e = new Lg(e, n, i, x, w)),
      n === 1 ? ((n = 1), c === !0 && (n |= 8)) : (n = 0),
      (c = xt(3, null, null, n)),
      (e.current = c),
      (c.stateNode = e),
      (c.memoizedState = {
        element: s,
        isDehydrated: i,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      $l(c),
      e
    )
  }
  function Sg(e, n, i) {
    var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
    return {
      $$typeof: q,
      key: s == null ? null : '' + s,
      children: e,
      containerInfo: n,
      implementation: i,
    }
  }
  function qd(e) {
    if (!e) return an
    e = e._reactInternals
    e: {
      if (Mn(e) !== e || e.tag !== 1) throw Error(o(170))
      var n = e
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context
            break e
          case 1:
            if (nt(n.type)) {
              n = n.stateNode.__reactInternalMemoizedMergedChildContext
              break e
            }
        }
        n = n.return
      } while (n !== null)
      throw Error(o(171))
    }
    if (e.tag === 1) {
      var i = e.type
      if (nt(i)) return Cf(e, i, n)
    }
    return n
  }
  function Jd(e, n, i, s, u, c, v, x, w) {
    return (
      (e = ja(i, s, !0, e, u, c, v, x, w)),
      (e.context = qd(null)),
      (i = e.current),
      (s = Je()),
      (u = mn(i)),
      (c = Kt(s, u)),
      (c.callback = n ?? null),
      fn(i, c, u),
      (e.current.lanes = u),
      ti(e, u, s),
      ot(e, s),
      e
    )
  }
  function ls(e, n, i, s) {
    var u = n.current,
      c = Je(),
      v = mn(u)
    return (
      (i = qd(i)),
      n.context === null ? (n.context = i) : (n.pendingContext = i),
      (n = Kt(c, v)),
      (n.payload = { element: e }),
      (s = s === void 0 ? null : s),
      s !== null && (n.callback = s),
      (e = fn(u, n, v)),
      e !== null && (jt(e, u, v, c), Oo(e, u, v)),
      v
    )
  }
  function as(e) {
    return ((e = e.current), e.child ? (e.child.tag === 5, e.child.stateNode) : null)
  }
  function eh(e, n) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var i = e.retryLane
      e.retryLane = i !== 0 && i < n ? i : n
    }
  }
  function _a(e, n) {
    ;(eh(e, n), (e = e.alternate) && eh(e, n))
  }
  function Pg() {
    return null
  }
  var th =
    typeof reportError == 'function'
      ? reportError
      : function (e) {
          console.error(e)
        }
  function Fa(e) {
    this._internalRoot = e
  }
  ;((us.prototype.render = Fa.prototype.render =
    function (e) {
      var n = this._internalRoot
      if (n === null) throw Error(o(409))
      ls(e, n, null, null)
    }),
    (us.prototype.unmount = Fa.prototype.unmount =
      function () {
        var e = this._internalRoot
        if (e !== null) {
          this._internalRoot = null
          var n = e.containerInfo
          ;(Wn(function () {
            ls(null, e, null, null)
          }),
            (n[Bt] = null))
        }
      }))
  function us(e) {
    this._internalRoot = e
  }
  us.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var n = Wc()
      e = { blockedOn: null, target: e, priority: n }
      for (var i = 0; i < nn.length && n !== 0 && n < nn[i].priority; i++);
      ;(nn.splice(i, 0, e), i === 0 && Bc(e))
    }
  }
  function Da(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
  }
  function cs(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
    )
  }
  function nh() {}
  function Cg(e, n, i, s, u) {
    if (u) {
      if (typeof s == 'function') {
        var c = s
        s = function () {
          var j = as(v)
          c.call(j)
        }
      }
      var v = Jd(n, s, e, 0, null, !1, !1, '', nh)
      return (
        (e._reactRootContainer = v),
        (e[Bt] = v.current),
        mi(e.nodeType === 8 ? e.parentNode : e),
        Wn(),
        v
      )
    }
    for (; (u = e.lastChild); ) e.removeChild(u)
    if (typeof s == 'function') {
      var x = s
      s = function () {
        var j = as(w)
        x.call(j)
      }
    }
    var w = ja(e, 0, !1, null, null, !1, !1, '', nh)
    return (
      (e._reactRootContainer = w),
      (e[Bt] = w.current),
      mi(e.nodeType === 8 ? e.parentNode : e),
      Wn(function () {
        ls(n, w, i, s)
      }),
      w
    )
  }
  function fs(e, n, i, s, u) {
    var c = i._reactRootContainer
    if (c) {
      var v = c
      if (typeof u == 'function') {
        var x = u
        u = function () {
          var w = as(v)
          x.call(w)
        }
      }
      ls(n, v, e, u)
    } else v = Cg(i, n, e, u, s)
    return as(v)
  }
  ;((Vc = function (e) {
    switch (e.tag) {
      case 3:
        var n = e.stateNode
        if (n.current.memoizedState.isDehydrated) {
          var i = ei(n.pendingLanes)
          i !== 0 && (il(n, i | 1), ot(n, Ae()), (ae & 6) === 0 && ((_r = Ae() + 500), un()))
        }
        break
      case 13:
        ;(Wn(function () {
          var s = $t(e, 1)
          if (s !== null) {
            var u = Je()
            jt(s, e, 1, u)
          }
        }),
          _a(e, 1))
    }
  }),
    (ol = function (e) {
      if (e.tag === 13) {
        var n = $t(e, 134217728)
        if (n !== null) {
          var i = Je()
          jt(n, e, 134217728, i)
        }
        _a(e, 134217728)
      }
    }),
    (Nc = function (e) {
      if (e.tag === 13) {
        var n = mn(e),
          i = $t(e, n)
        if (i !== null) {
          var s = Je()
          jt(i, e, n, s)
        }
        _a(e, n)
      }
    }),
    (Wc = function () {
      return pe
    }),
    (Oc = function (e, n) {
      var i = pe
      try {
        return ((pe = e), n())
      } finally {
        pe = i
      }
    }),
    (Xs = function (e, n, i) {
      switch (n) {
        case 'input':
          if ((Hs(e, i), (n = i.name), i.type === 'radio' && n != null)) {
            for (i = e; i.parentNode; ) i = i.parentNode
            for (
              i = i.querySelectorAll('input[name=' + JSON.stringify('' + n) + '][type="radio"]'),
                n = 0;
              n < i.length;
              n++
            ) {
              var s = i[n]
              if (s !== e && s.form === e.form) {
                var u = Mo(s)
                if (!u) throw Error(o(90))
                ;(ac(s), Hs(s, u))
              }
            }
          }
          break
        case 'textarea':
          hc(e, i)
          break
        case 'select':
          ;((n = i.value), n != null && ur(e, !!i.multiple, n, !1))
      }
    }),
    (wc = Pa),
    (Lc = Wn))
  var Tg = { usingClientEntryPoint: !1, Events: [vi, kr, Mo, Ec, xc, Pa] },
    _i = {
      findFiberByHostInstance: An,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom',
    },
    Mg = {
      bundleType: _i.bundleType,
      version: _i.version,
      rendererPackageName: _i.rendererPackageName,
      rendererConfig: _i.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: z.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = Tc(e)), e === null ? null : e.stateNode)
      },
      findFiberByHostInstance: _i.findFiberByHostInstance || Pg,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    }
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var ds = __REACT_DEVTOOLS_GLOBAL_HOOK__
    if (!ds.isDisabled && ds.supportsFiber)
      try {
        ;((ao = ds.inject(Mg)), (Ft = ds))
      } catch {}
  }
  return (
    (st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Tg),
    (st.createPortal = function (e, n) {
      var i = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
      if (!Da(n)) throw Error(o(200))
      return Sg(e, n, null, i)
    }),
    (st.createRoot = function (e, n) {
      if (!Da(e)) throw Error(o(299))
      var i = !1,
        s = '',
        u = th
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (u = n.onRecoverableError)),
        (n = ja(e, 1, !1, null, null, i, !1, s, u)),
        (e[Bt] = n.current),
        mi(e.nodeType === 8 ? e.parentNode : e),
        new Fa(n)
      )
    }),
    (st.findDOMNode = function (e) {
      if (e == null) return null
      if (e.nodeType === 1) return e
      var n = e._reactInternals
      if (n === void 0)
        throw typeof e.render == 'function'
          ? Error(o(188))
          : ((e = Object.keys(e).join(',')), Error(o(268, e)))
      return ((e = Tc(n)), (e = e === null ? null : e.stateNode), e)
    }),
    (st.flushSync = function (e) {
      return Wn(e)
    }),
    (st.hydrate = function (e, n, i) {
      if (!cs(n)) throw Error(o(200))
      return fs(null, e, n, !0, i)
    }),
    (st.hydrateRoot = function (e, n, i) {
      if (!Da(e)) throw Error(o(405))
      var s = (i != null && i.hydratedSources) || null,
        u = !1,
        c = '',
        v = th
      if (
        (i != null &&
          (i.unstable_strictMode === !0 && (u = !0),
          i.identifierPrefix !== void 0 && (c = i.identifierPrefix),
          i.onRecoverableError !== void 0 && (v = i.onRecoverableError)),
        (n = Jd(n, null, e, 1, i ?? null, u, !1, c, v)),
        (e[Bt] = n.current),
        mi(e),
        s)
      )
        for (e = 0; e < s.length; e++)
          ((i = s[e]),
            (u = i._getVersion),
            (u = u(i._source)),
            n.mutableSourceEagerHydrationData == null
              ? (n.mutableSourceEagerHydrationData = [i, u])
              : n.mutableSourceEagerHydrationData.push(i, u))
      return new us(n)
    }),
    (st.render = function (e, n, i) {
      if (!cs(n)) throw Error(o(200))
      return fs(null, e, n, !1, i)
    }),
    (st.unmountComponentAtNode = function (e) {
      if (!cs(e)) throw Error(o(40))
      return e._reactRootContainer
        ? (Wn(function () {
            fs(null, null, e, !1, function () {
              ;((e._reactRootContainer = null), (e[Bt] = null))
            })
          }),
          !0)
        : !1
    }),
    (st.unstable_batchedUpdates = Pa),
    (st.unstable_renderSubtreeIntoContainer = function (e, n, i, s) {
      if (!cs(i)) throw Error(o(200))
      if (e == null || e._reactInternals === void 0) throw Error(o(38))
      return fs(e, n, i, !1, s)
    }),
    (st.version = '18.3.1-next-f1338f8080-20240426'),
    st
  )
}
var ch
function zp() {
  if (ch) return Wa.exports
  ch = 1
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)
      } catch (r) {
        console.error(r)
      }
  }
  return (t(), (Wa.exports = Og()), Wa.exports)
}
var fh
function Ig() {
  if (fh) return hs
  fh = 1
  var t = zp()
  return ((hs.createRoot = t.createRoot), (hs.hydrateRoot = t.hydrateRoot), hs)
}
var PE = Ig()
zp()
function $i() {
  return (
    ($i = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var r = 1; r < arguments.length; r++) {
            var o = arguments[r]
            for (var l in o) Object.prototype.hasOwnProperty.call(o, l) && (t[l] = o[l])
          }
          return t
        }),
    $i.apply(this, arguments)
  )
}
var En
;(function (t) {
  ;((t.Pop = 'POP'), (t.Push = 'PUSH'), (t.Replace = 'REPLACE'))
})(En || (En = {}))
const dh = 'popstate'
function Bg(t) {
  t === void 0 && (t = {})
  function r(a, d) {
    let { pathname: f = '/', search: y = '', hash: h = '' } = Yn(a.location.hash.substr(1))
    return (
      !f.startsWith('/') && !f.startsWith('.') && (f = '/' + f),
      nu(
        '',
        { pathname: f, search: y, hash: h },
        (d.state && d.state.usr) || null,
        (d.state && d.state.key) || 'default'
      )
    )
  }
  function o(a, d) {
    let f = a.document.querySelector('base'),
      y = ''
    if (f && f.getAttribute('href')) {
      let h = a.location.href,
        p = h.indexOf('#')
      y = p === -1 ? h : h.slice(0, p)
    }
    return y + '#' + (typeof d == 'string' ? d : Ls(d))
  }
  function l(a, d) {
    Fs(
      a.pathname.charAt(0) === '/',
      'relative pathnames are not supported in hash history.push(' + JSON.stringify(d) + ')'
    )
  }
  return Ug(r, o, l, t)
}
function Ce(t, r) {
  if (t === !1 || t === null || typeof t > 'u') throw new Error(r)
}
function Fs(t, r) {
  if (!t) {
    typeof console < 'u' && console.warn(r)
    try {
      throw new Error(r)
    } catch {}
  }
}
function zg() {
  return Math.random().toString(36).substr(2, 8)
}
function hh(t, r) {
  return { usr: t.state, key: t.key, idx: r }
}
function nu(t, r, o, l) {
  return (
    o === void 0 && (o = null),
    $i(
      { pathname: typeof t == 'string' ? t : t.pathname, search: '', hash: '' },
      typeof r == 'string' ? Yn(r) : r,
      { state: o, key: (r && r.key) || l || zg() }
    )
  )
}
function Ls(t) {
  let { pathname: r = '/', search: o = '', hash: l = '' } = t
  return (
    o && o !== '?' && (r += o.charAt(0) === '?' ? o : '?' + o),
    l && l !== '#' && (r += l.charAt(0) === '#' ? l : '#' + l),
    r
  )
}
function Yn(t) {
  let r = {}
  if (t) {
    let o = t.indexOf('#')
    o >= 0 && ((r.hash = t.substr(o)), (t = t.substr(0, o)))
    let l = t.indexOf('?')
    ;(l >= 0 && ((r.search = t.substr(l)), (t = t.substr(0, l))), t && (r.pathname = t))
  }
  return r
}
function Ug(t, r, o, l) {
  l === void 0 && (l = {})
  let { window: a = document.defaultView, v5Compat: d = !1 } = l,
    f = a.history,
    y = En.Pop,
    h = null,
    p = g()
  p == null && ((p = 0), f.replaceState($i({}, f.state, { idx: p }), ''))
  function g() {
    return (f.state || { idx: null }).idx
  }
  function k() {
    y = En.Pop
    let P = g(),
      D = P == null ? null : P - p
    ;((p = P), h && h({ action: y, location: A.location, delta: D }))
  }
  function E(P, D) {
    y = En.Push
    let V = nu(A.location, P, D)
    ;(o && o(V, P), (p = g() + 1))
    let F = hh(V, p),
      z = A.createHref(V)
    try {
      f.pushState(F, '', z)
    } catch (H) {
      if (H instanceof DOMException && H.name === 'DataCloneError') throw H
      a.location.assign(z)
    }
    d && h && h({ action: y, location: A.location, delta: 1 })
  }
  function S(P, D) {
    y = En.Replace
    let V = nu(A.location, P, D)
    ;(o && o(V, P), (p = g()))
    let F = hh(V, p),
      z = A.createHref(V)
    ;(f.replaceState(F, '', z), d && h && h({ action: y, location: A.location, delta: 0 }))
  }
  function C(P) {
    let D = a.location.origin !== 'null' ? a.location.origin : a.location.href,
      V = typeof P == 'string' ? P : Ls(P)
    return (
      (V = V.replace(/ $/, '%20')),
      Ce(D, 'No window.location.(origin|href) available to create URL for href: ' + V),
      new URL(V, D)
    )
  }
  let A = {
    get action() {
      return y
    },
    get location() {
      return t(a, f)
    },
    listen(P) {
      if (h) throw new Error('A history only accepts one active listener')
      return (
        a.addEventListener(dh, k),
        (h = P),
        () => {
          ;(a.removeEventListener(dh, k), (h = null))
        }
      )
    },
    createHref(P) {
      return r(a, P)
    },
    createURL: C,
    encodeLocation(P) {
      let D = C(P)
      return { pathname: D.pathname, search: D.search, hash: D.hash }
    },
    push: E,
    replace: S,
    go(P) {
      return f.go(P)
    },
  }
  return A
}
var ph
;(function (t) {
  ;((t.data = 'data'), (t.deferred = 'deferred'), (t.redirect = 'redirect'), (t.error = 'error'))
})(ph || (ph = {}))
function Hg(t, r, o) {
  return (o === void 0 && (o = '/'), $g(t, r, o))
}
function $g(t, r, o, l) {
  let a = typeof r == 'string' ? Yn(r) : r,
    d = Br(a.pathname || '/', o)
  if (d == null) return null
  let f = Up(t)
  Kg(f)
  let y = null
  for (let h = 0; y == null && h < f.length; ++h) {
    let p = ny(d)
    y = ey(f[h], p)
  }
  return y
}
function Up(t, r, o, l) {
  ;(r === void 0 && (r = []), o === void 0 && (o = []), l === void 0 && (l = ''))
  let a = (d, f, y) => {
    let h = {
      relativePath: y === void 0 ? d.path || '' : y,
      caseSensitive: d.caseSensitive === !0,
      childrenIndex: f,
      route: d,
    }
    h.relativePath.startsWith('/') &&
      (Ce(
        h.relativePath.startsWith(l),
        'Absolute route path "' +
          h.relativePath +
          '" nested under path ' +
          ('"' + l + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.'
      ),
      (h.relativePath = h.relativePath.slice(l.length)))
    let p = wn([l, h.relativePath]),
      g = o.concat(h)
    ;(d.children &&
      d.children.length > 0 &&
      (Ce(
        d.index !== !0,
        'Index routes must not have child routes. Please remove ' +
          ('all child routes from route path "' + p + '".')
      ),
      Up(d.children, r, g, p)),
      !(d.path == null && !d.index) && r.push({ path: p, score: qg(p, d.index), routesMeta: g }))
  }
  return (
    t.forEach((d, f) => {
      var y
      if (d.path === '' || !((y = d.path) != null && y.includes('?'))) a(d, f)
      else for (let h of Hp(d.path)) a(d, f, h)
    }),
    r
  )
}
function Hp(t) {
  let r = t.split('/')
  if (r.length === 0) return []
  let [o, ...l] = r,
    a = o.endsWith('?'),
    d = o.replace(/\?$/, '')
  if (l.length === 0) return a ? [d, ''] : [d]
  let f = Hp(l.join('/')),
    y = []
  return (
    y.push(...f.map((h) => (h === '' ? d : [d, h].join('/')))),
    a && y.push(...f),
    y.map((h) => (t.startsWith('/') && h === '' ? '/' : h))
  )
}
function Kg(t) {
  t.sort((r, o) =>
    r.score !== o.score
      ? o.score - r.score
      : Jg(
          r.routesMeta.map((l) => l.childrenIndex),
          o.routesMeta.map((l) => l.childrenIndex)
        )
  )
}
const Zg = /^:[\w-]+$/,
  Yg = 3,
  bg = 2,
  Qg = 1,
  Gg = 10,
  Xg = -2,
  mh = (t) => t === '*'
function qg(t, r) {
  let o = t.split('/'),
    l = o.length
  return (
    o.some(mh) && (l += Xg),
    r && (l += bg),
    o.filter((a) => !mh(a)).reduce((a, d) => a + (Zg.test(d) ? Yg : d === '' ? Qg : Gg), l)
  )
}
function Jg(t, r) {
  return t.length === r.length && t.slice(0, -1).every((l, a) => l === r[a])
    ? t[t.length - 1] - r[r.length - 1]
    : 0
}
function ey(t, r, o) {
  let { routesMeta: l } = t,
    a = {},
    d = '/',
    f = []
  for (let y = 0; y < l.length; ++y) {
    let h = l[y],
      p = y === l.length - 1,
      g = d === '/' ? r : r.slice(d.length) || '/',
      k = ru({ path: h.relativePath, caseSensitive: h.caseSensitive, end: p }, g),
      E = h.route
    if (!k) return null
    ;(Object.assign(a, k.params),
      f.push({
        params: a,
        pathname: wn([d, k.pathname]),
        pathnameBase: ly(wn([d, k.pathnameBase])),
        route: E,
      }),
      k.pathnameBase !== '/' && (d = wn([d, k.pathnameBase])))
  }
  return f
}
function ru(t, r) {
  typeof t == 'string' && (t = { path: t, caseSensitive: !1, end: !0 })
  let [o, l] = ty(t.path, t.caseSensitive, t.end),
    a = r.match(o)
  if (!a) return null
  let d = a[0],
    f = d.replace(/(.)\/+$/, '$1'),
    y = a.slice(1)
  return {
    params: l.reduce((p, g, k) => {
      let { paramName: E, isOptional: S } = g
      if (E === '*') {
        let A = y[k] || ''
        f = d.slice(0, d.length - A.length).replace(/(.)\/+$/, '$1')
      }
      const C = y[k]
      return (S && !C ? (p[E] = void 0) : (p[E] = (C || '').replace(/%2F/g, '/')), p)
    }, {}),
    pathname: d,
    pathnameBase: f,
    pattern: t,
  }
}
function ty(t, r, o) {
  ;(r === void 0 && (r = !1),
    o === void 0 && (o = !0),
    Fs(
      t === '*' || !t.endsWith('*') || t.endsWith('/*'),
      'Route path "' +
        t +
        '" will be treated as if it were ' +
        ('"' + t.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + t.replace(/\*$/, '/*') + '".')
    ))
  let l = [],
    a =
      '^' +
      t
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (f, y, h) => (
            l.push({ paramName: y, isOptional: h != null }),
            h ? '/?([^\\/]+)?' : '/([^\\/]+)'
          )
        )
  return (
    t.endsWith('*')
      ? (l.push({ paramName: '*' }), (a += t === '*' || t === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
        ? (a += '\\/*$')
        : t !== '' && t !== '/' && (a += '(?:(?=\\/|$))'),
    [new RegExp(a, r ? void 0 : 'i'), l]
  )
}
function ny(t) {
  try {
    return t
      .split('/')
      .map((r) => decodeURIComponent(r).replace(/\//g, '%2F'))
      .join('/')
  } catch (r) {
    return (
      Fs(
        !1,
        'The URL path "' +
          t +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ('encoding (' + r + ').')
      ),
      t
    )
  }
}
function Br(t, r) {
  if (r === '/') return t
  if (!t.toLowerCase().startsWith(r.toLowerCase())) return null
  let o = r.endsWith('/') ? r.length - 1 : r.length,
    l = t.charAt(o)
  return l && l !== '/' ? null : t.slice(o) || '/'
}
const ry = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  iy = (t) => ry.test(t)
function oy(t, r) {
  r === void 0 && (r = '/')
  let { pathname: o, search: l = '', hash: a = '' } = typeof t == 'string' ? Yn(t) : t,
    d
  if (o)
    if (iy(o)) d = o
    else {
      if (o.includes('//')) {
        let f = o
        ;((o = o.replace(/\/\/+/g, '/')),
          Fs(!1, 'Pathnames cannot have embedded double slashes - normalizing ' + (f + ' -> ' + o)))
      }
      o.startsWith('/') ? (d = gh(o.substring(1), '/')) : (d = gh(o, r))
    }
  else d = r
  return { pathname: d, search: ay(l), hash: uy(a) }
}
function gh(t, r) {
  let o = r.replace(/\/+$/, '').split('/')
  return (
    t.split('/').forEach((a) => {
      a === '..' ? o.length > 1 && o.pop() : a !== '.' && o.push(a)
    }),
    o.length > 1 ? o.join('/') : '/'
  )
}
function Ba(t, r, o, l) {
  return (
    "Cannot include a '" +
    t +
    "' character in a manually specified " +
    ('`to.' + r + '` field [' + JSON.stringify(l) + '].  Please separate it out to the ') +
    ('`to.' + o + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  )
}
function sy(t) {
  return t.filter((r, o) => o === 0 || (r.route.path && r.route.path.length > 0))
}
function Pu(t, r) {
  let o = sy(t)
  return r
    ? o.map((l, a) => (a === o.length - 1 ? l.pathname : l.pathnameBase))
    : o.map((l) => l.pathnameBase)
}
function Cu(t, r, o, l) {
  l === void 0 && (l = !1)
  let a
  typeof t == 'string'
    ? (a = Yn(t))
    : ((a = $i({}, t)),
      Ce(!a.pathname || !a.pathname.includes('?'), Ba('?', 'pathname', 'search', a)),
      Ce(!a.pathname || !a.pathname.includes('#'), Ba('#', 'pathname', 'hash', a)),
      Ce(!a.search || !a.search.includes('#'), Ba('#', 'search', 'hash', a)))
  let d = t === '' || a.pathname === '',
    f = d ? '/' : a.pathname,
    y
  if (f == null) y = o
  else {
    let k = r.length - 1
    if (!l && f.startsWith('..')) {
      let E = f.split('/')
      for (; E[0] === '..'; ) (E.shift(), (k -= 1))
      a.pathname = E.join('/')
    }
    y = k >= 0 ? r[k] : '/'
  }
  let h = oy(a, y),
    p = f && f !== '/' && f.endsWith('/'),
    g = (d || f === '.') && o.endsWith('/')
  return (!h.pathname.endsWith('/') && (p || g) && (h.pathname += '/'), h)
}
const wn = (t) => t.join('/').replace(/\/\/+/g, '/'),
  ly = (t) => t.replace(/\/+$/, '').replace(/^\/*/, '/'),
  ay = (t) => (!t || t === '?' ? '' : t.startsWith('?') ? t : '?' + t),
  uy = (t) => (!t || t === '#' ? '' : t.startsWith('#') ? t : '#' + t)
function cy(t) {
  return (
    t != null &&
    typeof t.status == 'number' &&
    typeof t.statusText == 'string' &&
    typeof t.internal == 'boolean' &&
    'data' in t
  )
}
const $p = ['post', 'put', 'patch', 'delete']
new Set($p)
const fy = ['get', ...$p]
new Set(fy)
function Ki() {
  return (
    (Ki = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var r = 1; r < arguments.length; r++) {
            var o = arguments[r]
            for (var l in o) Object.prototype.hasOwnProperty.call(o, l) && (t[l] = o[l])
          }
          return t
        }),
    Ki.apply(this, arguments)
  )
}
const Ds = _.createContext(null),
  Kp = _.createContext(null),
  qt = _.createContext(null),
  Vs = _.createContext(null),
  Cn = _.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Zp = _.createContext(null)
function dy(t, r) {
  let { relative: o } = r === void 0 ? {} : r
  $r() || Ce(!1)
  let { basename: l, navigator: a } = _.useContext(qt),
    { hash: d, pathname: f, search: y } = Ns(t, { relative: o }),
    h = f
  return (
    l !== '/' && (h = f === '/' ? l : wn([l, f])),
    a.createHref({ pathname: h, search: y, hash: d })
  )
}
function $r() {
  return _.useContext(Vs) != null
}
function Kr() {
  return ($r() || Ce(!1), _.useContext(Vs).location)
}
function Yp(t) {
  _.useContext(qt).static || _.useLayoutEffect(t)
}
function bp() {
  let { isDataRoute: t } = _.useContext(Cn)
  return t ? Py() : hy()
}
function hy() {
  $r() || Ce(!1)
  let t = _.useContext(Ds),
    { basename: r, future: o, navigator: l } = _.useContext(qt),
    { matches: a } = _.useContext(Cn),
    { pathname: d } = Kr(),
    f = JSON.stringify(Pu(a, o.v7_relativeSplatPath)),
    y = _.useRef(!1)
  return (
    Yp(() => {
      y.current = !0
    }),
    _.useCallback(
      function (p, g) {
        if ((g === void 0 && (g = {}), !y.current)) return
        if (typeof p == 'number') {
          l.go(p)
          return
        }
        let k = Cu(p, JSON.parse(f), d, g.relative === 'path')
        ;(t == null && r !== '/' && (k.pathname = k.pathname === '/' ? r : wn([r, k.pathname])),
          (g.replace ? l.replace : l.push)(k, g.state, g))
      },
      [r, l, f, d, t]
    )
  )
}
function Ns(t, r) {
  let { relative: o } = r === void 0 ? {} : r,
    { future: l } = _.useContext(qt),
    { matches: a } = _.useContext(Cn),
    { pathname: d } = Kr(),
    f = JSON.stringify(Pu(a, l.v7_relativeSplatPath))
  return _.useMemo(() => Cu(t, JSON.parse(f), d, o === 'path'), [t, f, d, o])
}
function py(t, r) {
  return my(t, r)
}
function my(t, r, o, l) {
  $r() || Ce(!1)
  let { navigator: a } = _.useContext(qt),
    { matches: d } = _.useContext(Cn),
    f = d[d.length - 1],
    y = f ? f.params : {}
  f && f.pathname
  let h = f ? f.pathnameBase : '/'
  f && f.route
  let p = Kr(),
    g
  if (r) {
    var k
    let P = typeof r == 'string' ? Yn(r) : r
    ;(h === '/' || ((k = P.pathname) != null && k.startsWith(h)) || Ce(!1), (g = P))
  } else g = p
  let E = g.pathname || '/',
    S = E
  if (h !== '/') {
    let P = h.replace(/^\//, '').split('/')
    S = '/' + E.replace(/^\//, '').split('/').slice(P.length).join('/')
  }
  let C = Hg(t, { pathname: S }),
    A = Ey(
      C &&
        C.map((P) =>
          Object.assign({}, P, {
            params: Object.assign({}, y, P.params),
            pathname: wn([
              h,
              a.encodeLocation ? a.encodeLocation(P.pathname).pathname : P.pathname,
            ]),
            pathnameBase:
              P.pathnameBase === '/'
                ? h
                : wn([
                    h,
                    a.encodeLocation ? a.encodeLocation(P.pathnameBase).pathname : P.pathnameBase,
                  ]),
          })
        ),
      d,
      o,
      l
    )
  return r && A
    ? _.createElement(
        Vs.Provider,
        {
          value: {
            location: Ki({ pathname: '/', search: '', hash: '', state: null, key: 'default' }, g),
            navigationType: En.Pop,
          },
        },
        A
      )
    : A
}
function gy() {
  let t = Sy(),
    r = cy(t) ? t.status + ' ' + t.statusText : t instanceof Error ? t.message : JSON.stringify(t),
    o = t instanceof Error ? t.stack : null,
    a = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' }
  return _.createElement(
    _.Fragment,
    null,
    _.createElement('h2', null, 'Unexpected Application Error!'),
    _.createElement('h3', { style: { fontStyle: 'italic' } }, r),
    o ? _.createElement('pre', { style: a }, o) : null,
    null
  )
}
const yy = _.createElement(gy, null)
class vy extends _.Component {
  constructor(r) {
    ;(super(r),
      (this.state = { location: r.location, revalidation: r.revalidation, error: r.error }))
  }
  static getDerivedStateFromError(r) {
    return { error: r }
  }
  static getDerivedStateFromProps(r, o) {
    return o.location !== r.location || (o.revalidation !== 'idle' && r.revalidation === 'idle')
      ? { error: r.error, location: r.location, revalidation: r.revalidation }
      : {
          error: r.error !== void 0 ? r.error : o.error,
          location: o.location,
          revalidation: r.revalidation || o.revalidation,
        }
  }
  componentDidCatch(r, o) {
    console.error('React Router caught the following error during render', r, o)
  }
  render() {
    return this.state.error !== void 0
      ? _.createElement(
          Cn.Provider,
          { value: this.props.routeContext },
          _.createElement(Zp.Provider, { value: this.state.error, children: this.props.component })
        )
      : this.props.children
  }
}
function ky(t) {
  let { routeContext: r, match: o, children: l } = t,
    a = _.useContext(Ds)
  return (
    a &&
      a.static &&
      a.staticContext &&
      (o.route.errorElement || o.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = o.route.id),
    _.createElement(Cn.Provider, { value: r }, l)
  )
}
function Ey(t, r, o, l) {
  var a
  if (
    (r === void 0 && (r = []), o === void 0 && (o = null), l === void 0 && (l = null), t == null)
  ) {
    var d
    if (!o) return null
    if (o.errors) t = o.matches
    else if (
      (d = l) != null &&
      d.v7_partialHydration &&
      r.length === 0 &&
      !o.initialized &&
      o.matches.length > 0
    )
      t = o.matches
    else return null
  }
  let f = t,
    y = (a = o) == null ? void 0 : a.errors
  if (y != null) {
    let g = f.findIndex((k) => k.route.id && y?.[k.route.id] !== void 0)
    ;(g >= 0 || Ce(!1), (f = f.slice(0, Math.min(f.length, g + 1))))
  }
  let h = !1,
    p = -1
  if (o && l && l.v7_partialHydration)
    for (let g = 0; g < f.length; g++) {
      let k = f[g]
      if (((k.route.HydrateFallback || k.route.hydrateFallbackElement) && (p = g), k.route.id)) {
        let { loaderData: E, errors: S } = o,
          C = k.route.loader && E[k.route.id] === void 0 && (!S || S[k.route.id] === void 0)
        if (k.route.lazy || C) {
          ;((h = !0), p >= 0 ? (f = f.slice(0, p + 1)) : (f = [f[0]]))
          break
        }
      }
    }
  return f.reduceRight((g, k, E) => {
    let S,
      C = !1,
      A = null,
      P = null
    o &&
      ((S = y && k.route.id ? y[k.route.id] : void 0),
      (A = k.route.errorElement || yy),
      h &&
        (p < 0 && E === 0
          ? (Cy('route-fallback'), (C = !0), (P = null))
          : p === E && ((C = !0), (P = k.route.hydrateFallbackElement || null))))
    let D = r.concat(f.slice(0, E + 1)),
      V = () => {
        let F
        return (
          S
            ? (F = A)
            : C
              ? (F = P)
              : k.route.Component
                ? (F = _.createElement(k.route.Component, null))
                : k.route.element
                  ? (F = k.route.element)
                  : (F = g),
          _.createElement(ky, {
            match: k,
            routeContext: { outlet: g, matches: D, isDataRoute: o != null },
            children: F,
          })
        )
      }
    return o && (k.route.ErrorBoundary || k.route.errorElement || E === 0)
      ? _.createElement(vy, {
          location: o.location,
          revalidation: o.revalidation,
          component: A,
          error: S,
          children: V(),
          routeContext: { outlet: null, matches: D, isDataRoute: !0 },
        })
      : V()
  }, null)
}
var Qp = (function (t) {
    return (
      (t.UseBlocker = 'useBlocker'),
      (t.UseRevalidator = 'useRevalidator'),
      (t.UseNavigateStable = 'useNavigate'),
      t
    )
  })(Qp || {}),
  Gp = (function (t) {
    return (
      (t.UseBlocker = 'useBlocker'),
      (t.UseLoaderData = 'useLoaderData'),
      (t.UseActionData = 'useActionData'),
      (t.UseRouteError = 'useRouteError'),
      (t.UseNavigation = 'useNavigation'),
      (t.UseRouteLoaderData = 'useRouteLoaderData'),
      (t.UseMatches = 'useMatches'),
      (t.UseRevalidator = 'useRevalidator'),
      (t.UseNavigateStable = 'useNavigate'),
      (t.UseRouteId = 'useRouteId'),
      t
    )
  })(Gp || {})
function xy(t) {
  let r = _.useContext(Ds)
  return (r || Ce(!1), r)
}
function wy(t) {
  let r = _.useContext(Kp)
  return (r || Ce(!1), r)
}
function Ly(t) {
  let r = _.useContext(Cn)
  return (r || Ce(!1), r)
}
function Xp(t) {
  let r = Ly(),
    o = r.matches[r.matches.length - 1]
  return (o.route.id || Ce(!1), o.route.id)
}
function Sy() {
  var t
  let r = _.useContext(Zp),
    o = wy(),
    l = Xp()
  return r !== void 0 ? r : (t = o.errors) == null ? void 0 : t[l]
}
function Py() {
  let { router: t } = xy(Qp.UseNavigateStable),
    r = Xp(Gp.UseNavigateStable),
    o = _.useRef(!1)
  return (
    Yp(() => {
      o.current = !0
    }),
    _.useCallback(
      function (a, d) {
        ;(d === void 0 && (d = {}),
          o.current &&
            (typeof a == 'number' ? t.navigate(a) : t.navigate(a, Ki({ fromRouteId: r }, d))))
      },
      [t, r]
    )
  )
}
const yh = {}
function Cy(t, r, o) {
  yh[t] || (yh[t] = !0)
}
function Ty(t, r) {
  ;(t?.v7_startTransition, t?.v7_relativeSplatPath)
}
function CE(t) {
  let { to: r, replace: o, state: l, relative: a } = t
  $r() || Ce(!1)
  let { future: d, static: f } = _.useContext(qt),
    { matches: y } = _.useContext(Cn),
    { pathname: h } = Kr(),
    p = bp(),
    g = Cu(r, Pu(y, d.v7_relativeSplatPath), h, a === 'path'),
    k = JSON.stringify(g)
  return (
    _.useEffect(() => p(JSON.parse(k), { replace: o, state: l, relative: a }), [p, k, a, o, l]),
    null
  )
}
function My(t) {
  Ce(!1)
}
function Ay(t) {
  let {
    basename: r = '/',
    children: o = null,
    location: l,
    navigationType: a = En.Pop,
    navigator: d,
    static: f = !1,
    future: y,
  } = t
  $r() && Ce(!1)
  let h = r.replace(/^\/*/, '/'),
    p = _.useMemo(
      () => ({ basename: h, navigator: d, static: f, future: Ki({ v7_relativeSplatPath: !1 }, y) }),
      [h, y, d, f]
    )
  typeof l == 'string' && (l = Yn(l))
  let { pathname: g = '/', search: k = '', hash: E = '', state: S = null, key: C = 'default' } = l,
    A = _.useMemo(() => {
      let P = Br(g, h)
      return P == null
        ? null
        : { location: { pathname: P, search: k, hash: E, state: S, key: C }, navigationType: a }
    }, [h, g, k, E, S, C, a])
  return A == null
    ? null
    : _.createElement(
        qt.Provider,
        { value: p },
        _.createElement(Vs.Provider, { children: o, value: A })
      )
}
function TE(t) {
  let { children: r, location: o } = t
  return py(iu(r), o)
}
new Promise(() => {})
function iu(t, r) {
  r === void 0 && (r = [])
  let o = []
  return (
    _.Children.forEach(t, (l, a) => {
      if (!_.isValidElement(l)) return
      let d = [...r, a]
      if (l.type === _.Fragment) {
        o.push.apply(o, iu(l.props.children, d))
        return
      }
      ;(l.type !== My && Ce(!1), !l.props.index || !l.props.children || Ce(!1))
      let f = {
        id: l.props.id || d.join('-'),
        caseSensitive: l.props.caseSensitive,
        element: l.props.element,
        Component: l.props.Component,
        index: l.props.index,
        path: l.props.path,
        loader: l.props.loader,
        action: l.props.action,
        errorElement: l.props.errorElement,
        ErrorBoundary: l.props.ErrorBoundary,
        hasErrorBoundary: l.props.ErrorBoundary != null || l.props.errorElement != null,
        shouldRevalidate: l.props.shouldRevalidate,
        handle: l.props.handle,
        lazy: l.props.lazy,
      }
      ;(l.props.children && (f.children = iu(l.props.children, d)), o.push(f))
    }),
    o
  )
}
function Ss() {
  return (
    (Ss = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var r = 1; r < arguments.length; r++) {
            var o = arguments[r]
            for (var l in o) Object.prototype.hasOwnProperty.call(o, l) && (t[l] = o[l])
          }
          return t
        }),
    Ss.apply(this, arguments)
  )
}
function qp(t, r) {
  if (t == null) return {}
  var o = {},
    l = Object.keys(t),
    a,
    d
  for (d = 0; d < l.length; d++) ((a = l[d]), !(r.indexOf(a) >= 0) && (o[a] = t[a]))
  return o
}
function Ry(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey)
}
function jy(t, r) {
  return t.button === 0 && (!r || r === '_self') && !Ry(t)
}
const _y = [
    'onClick',
    'relative',
    'reloadDocument',
    'replace',
    'state',
    'target',
    'to',
    'preventScrollReset',
    'viewTransition',
  ],
  Fy = [
    'aria-current',
    'caseSensitive',
    'className',
    'end',
    'style',
    'to',
    'viewTransition',
    'children',
  ],
  Dy = '6'
try {
  window.__reactRouterVersion = Dy
} catch {}
const Vy = _.createContext({ isTransitioning: !1 }),
  Ny = 'startTransition',
  vh = Vg[Ny]
function ME(t) {
  let { basename: r, children: o, future: l, window: a } = t,
    d = _.useRef()
  d.current == null && (d.current = Bg({ window: a, v5Compat: !0 }))
  let f = d.current,
    [y, h] = _.useState({ action: f.action, location: f.location }),
    { v7_startTransition: p } = l || {},
    g = _.useCallback(
      (k) => {
        p && vh ? vh(() => h(k)) : h(k)
      },
      [h, p]
    )
  return (
    _.useLayoutEffect(() => f.listen(g), [f, g]),
    _.useEffect(() => Ty(l), [l]),
    _.createElement(Ay, {
      basename: r,
      children: o,
      location: y.location,
      navigationType: y.action,
      navigator: f,
      future: l,
    })
  )
}
const Wy =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  Oy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Iy = _.forwardRef(function (r, o) {
    let {
        onClick: l,
        relative: a,
        reloadDocument: d,
        replace: f,
        state: y,
        target: h,
        to: p,
        preventScrollReset: g,
        viewTransition: k,
      } = r,
      E = qp(r, _y),
      { basename: S } = _.useContext(qt),
      C,
      A = !1
    if (typeof p == 'string' && Oy.test(p) && ((C = p), Wy))
      try {
        let F = new URL(window.location.href),
          z = p.startsWith('//') ? new URL(F.protocol + p) : new URL(p),
          H = Br(z.pathname, S)
        z.origin === F.origin && H != null ? (p = H + z.search + z.hash) : (A = !0)
      } catch {}
    let P = dy(p, { relative: a }),
      D = zy(p, {
        replace: f,
        state: y,
        target: h,
        preventScrollReset: g,
        relative: a,
        viewTransition: k,
      })
    function V(F) {
      ;(l && l(F), F.defaultPrevented || D(F))
    }
    return _.createElement(
      'a',
      Ss({}, E, { href: C || P, onClick: A || d ? l : V, ref: o, target: h })
    )
  }),
  AE = _.forwardRef(function (r, o) {
    let {
        'aria-current': l = 'page',
        caseSensitive: a = !1,
        className: d = '',
        end: f = !1,
        style: y,
        to: h,
        viewTransition: p,
        children: g,
      } = r,
      k = qp(r, Fy),
      E = Ns(h, { relative: k.relative }),
      S = Kr(),
      C = _.useContext(Kp),
      { navigator: A, basename: P } = _.useContext(qt),
      D = C != null && Uy(E) && p === !0,
      V = A.encodeLocation ? A.encodeLocation(E).pathname : E.pathname,
      F = S.pathname,
      z = C && C.navigation && C.navigation.location ? C.navigation.location.pathname : null
    ;(a || ((F = F.toLowerCase()), (z = z ? z.toLowerCase() : null), (V = V.toLowerCase())),
      z && P && (z = Br(z, P) || z))
    const H = V !== '/' && V.endsWith('/') ? V.length - 1 : V.length
    let q = F === V || (!f && F.startsWith(V) && F.charAt(H) === '/'),
      re = z != null && (z === V || (!f && z.startsWith(V) && z.charAt(V.length) === '/')),
      Q = { isActive: q, isPending: re, isTransitioning: D },
      me = q ? l : void 0,
      de
    typeof d == 'function'
      ? (de = d(Q))
      : (de = [d, q ? 'active' : null, re ? 'pending' : null, D ? 'transitioning' : null]
          .filter(Boolean)
          .join(' '))
    let Fe = typeof y == 'function' ? y(Q) : y
    return _.createElement(
      Iy,
      Ss({}, k, { 'aria-current': me, className: de, ref: o, style: Fe, to: h, viewTransition: p }),
      typeof g == 'function' ? g(Q) : g
    )
  })
var ou
;(function (t) {
  ;((t.UseScrollRestoration = 'useScrollRestoration'),
    (t.UseSubmit = 'useSubmit'),
    (t.UseSubmitFetcher = 'useSubmitFetcher'),
    (t.UseFetcher = 'useFetcher'),
    (t.useViewTransitionState = 'useViewTransitionState'))
})(ou || (ou = {}))
var kh
;(function (t) {
  ;((t.UseFetcher = 'useFetcher'),
    (t.UseFetchers = 'useFetchers'),
    (t.UseScrollRestoration = 'useScrollRestoration'))
})(kh || (kh = {}))
function By(t) {
  let r = _.useContext(Ds)
  return (r || Ce(!1), r)
}
function zy(t, r) {
  let {
      target: o,
      replace: l,
      state: a,
      preventScrollReset: d,
      relative: f,
      viewTransition: y,
    } = r === void 0 ? {} : r,
    h = bp(),
    p = Kr(),
    g = Ns(t, { relative: f })
  return _.useCallback(
    (k) => {
      if (jy(k, o)) {
        k.preventDefault()
        let E = l !== void 0 ? l : Ls(p) === Ls(g)
        h(t, { replace: E, state: a, preventScrollReset: d, relative: f, viewTransition: y })
      }
    },
    [p, h, g, l, a, o, t, d, f, y]
  )
}
function Uy(t, r) {
  r === void 0 && (r = {})
  let o = _.useContext(Vy)
  o == null && Ce(!1)
  let { basename: l } = By(ou.useViewTransitionState),
    a = Ns(t, { relative: r.relative })
  if (!o.isTransitioning) return !1
  let d = Br(o.currentLocation.pathname, l) || o.currentLocation.pathname,
    f = Br(o.nextLocation.pathname, l) || o.nextLocation.pathname
  return ru(a.pathname, f) != null || ru(a.pathname, d) != null
}
const Jp = _.createContext({})
function Hy(t) {
  const r = _.useRef(null)
  return (r.current === null && (r.current = t()), r.current)
}
const Tu = _.createContext(null),
  e1 = _.createContext({ transformPagePoint: (t) => t, isStatic: !1, reducedMotion: 'never' })
function $y(t = !0) {
  const r = _.useContext(Tu)
  if (r === null) return [!0, null]
  const { isPresent: o, onExitComplete: l, register: a } = r,
    d = _.useId()
  _.useEffect(() => {
    t && a(d)
  }, [t])
  const f = _.useCallback(() => t && l && l(d), [d, l, t])
  return !o && l ? [!1, f] : [!0]
}
const Mu = typeof window < 'u',
  Ky = Mu ? _.useLayoutEffect : _.useEffect,
  pt = (t) => t
let t1 = pt
function Au(t) {
  let r
  return () => (r === void 0 && (r = t()), r)
}
const zr = (t, r, o) => {
    const l = r - t
    return l === 0 ? 1 : (o - t) / l
  },
  Qt = (t) => t * 1e3,
  Gt = (t) => t / 1e3,
  Zy = { useManualTiming: !1 }
function Yy(t) {
  let r = new Set(),
    o = new Set(),
    l = !1,
    a = !1
  const d = new WeakSet()
  let f = { delta: 0, timestamp: 0, isProcessing: !1 }
  function y(p) {
    ;(d.has(p) && (h.schedule(p), t()), p(f))
  }
  const h = {
    schedule: (p, g = !1, k = !1) => {
      const S = k && l ? r : o
      return (g && d.add(p), S.has(p) || S.add(p), p)
    },
    cancel: (p) => {
      ;(o.delete(p), d.delete(p))
    },
    process: (p) => {
      if (((f = p), l)) {
        a = !0
        return
      }
      ;((l = !0),
        ([r, o] = [o, r]),
        r.forEach(y),
        r.clear(),
        (l = !1),
        a && ((a = !1), h.process(p)))
    },
  }
  return h
}
const ps = ['read', 'resolveKeyframes', 'update', 'preRender', 'render', 'postRender'],
  by = 40
function n1(t, r) {
  let o = !1,
    l = !0
  const a = { delta: 0, timestamp: 0, isProcessing: !1 },
    d = () => (o = !0),
    f = ps.reduce((D, V) => ((D[V] = Yy(d)), D), {}),
    { read: y, resolveKeyframes: h, update: p, preRender: g, render: k, postRender: E } = f,
    S = () => {
      const D = performance.now()
      ;((o = !1),
        (a.delta = l ? 1e3 / 60 : Math.max(Math.min(D - a.timestamp, by), 1)),
        (a.timestamp = D),
        (a.isProcessing = !0),
        y.process(a),
        h.process(a),
        p.process(a),
        g.process(a),
        k.process(a),
        E.process(a),
        (a.isProcessing = !1),
        o && r && ((l = !1), t(S)))
    },
    C = () => {
      ;((o = !0), (l = !0), a.isProcessing || t(S))
    }
  return {
    schedule: ps.reduce((D, V) => {
      const F = f[V]
      return ((D[V] = (z, H = !1, q = !1) => (o || C(), F.schedule(z, H, q))), D)
    }, {}),
    cancel: (D) => {
      for (let V = 0; V < ps.length; V++) f[ps[V]].cancel(D)
    },
    state: a,
    steps: f,
  }
}
const {
    schedule: Ee,
    cancel: Sn,
    state: Ue,
    steps: za,
  } = n1(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : pt, !0),
  r1 = _.createContext({ strict: !1 }),
  Eh = {
    animation: [
      'animate',
      'variants',
      'whileHover',
      'whileTap',
      'exit',
      'whileInView',
      'whileFocus',
      'whileDrag',
    ],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId'],
  },
  Ur = {}
for (const t in Eh) Ur[t] = { isEnabled: (r) => Eh[t].some((o) => !!r[o]) }
function Qy(t) {
  for (const r in t) Ur[r] = { ...Ur[r], ...t[r] }
}
const Gy = new Set([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'custom',
  'inherit',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'globalTapTarget',
  'ignoreStrict',
  'viewport',
])
function Ps(t) {
  return (
    t.startsWith('while') ||
    (t.startsWith('drag') && t !== 'draggable') ||
    t.startsWith('layout') ||
    t.startsWith('onTap') ||
    t.startsWith('onPan') ||
    t.startsWith('onLayout') ||
    Gy.has(t)
  )
}
let i1 = (t) => !Ps(t)
function Xy(t) {
  t && (i1 = (r) => (r.startsWith('on') ? !Ps(r) : t(r)))
}
try {
  Xy(require('@emotion/is-prop-valid').default)
} catch {}
function qy(t, r, o) {
  const l = {}
  for (const a in t)
    (a === 'values' && typeof t.values == 'object') ||
      ((i1(a) ||
        (o === !0 && Ps(a)) ||
        (!r && !Ps(a)) ||
        (t.draggable && a.startsWith('onDrag'))) &&
        (l[a] = t[a]))
  return l
}
function Jy(t) {
  if (typeof Proxy > 'u') return t
  const r = new Map(),
    o = (...l) => t(...l)
  return new Proxy(o, {
    get: (l, a) => (a === 'create' ? t : (r.has(a) || r.set(a, t(a)), r.get(a))),
  })
}
const Ws = _.createContext({})
function Zi(t) {
  return typeof t == 'string' || Array.isArray(t)
}
function Os(t) {
  return t !== null && typeof t == 'object' && typeof t.start == 'function'
}
const Ru = ['animate', 'whileInView', 'whileFocus', 'whileHover', 'whileTap', 'whileDrag', 'exit'],
  ju = ['initial', ...Ru]
function Is(t) {
  return Os(t.animate) || ju.some((r) => Zi(t[r]))
}
function o1(t) {
  return !!(Is(t) || t.variants)
}
function e2(t, r) {
  if (Is(t)) {
    const { initial: o, animate: l } = t
    return { initial: o === !1 || Zi(o) ? o : void 0, animate: Zi(l) ? l : void 0 }
  }
  return t.inherit !== !1 ? r : {}
}
function t2(t) {
  const { initial: r, animate: o } = e2(t, _.useContext(Ws))
  return _.useMemo(() => ({ initial: r, animate: o }), [xh(r), xh(o)])
}
function xh(t) {
  return Array.isArray(t) ? t.join(' ') : t
}
const n2 = Symbol.for('motionComponentSymbol')
function Vr(t) {
  return t && typeof t == 'object' && Object.prototype.hasOwnProperty.call(t, 'current')
}
function r2(t, r, o) {
  return _.useCallback(
    (l) => {
      ;(l && t.onMount && t.onMount(l),
        r && (l ? r.mount(l) : r.unmount()),
        o && (typeof o == 'function' ? o(l) : Vr(o) && (o.current = l)))
    },
    [r]
  )
}
const _u = (t) => t.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase(),
  i2 = 'framerAppearId',
  s1 = 'data-' + _u(i2),
  { schedule: Fu } = n1(queueMicrotask, !1),
  l1 = _.createContext({})
function o2(t, r, o, l, a) {
  var d, f
  const { visualElement: y } = _.useContext(Ws),
    h = _.useContext(r1),
    p = _.useContext(Tu),
    g = _.useContext(e1).reducedMotion,
    k = _.useRef(null)
  ;((l = l || h.renderer),
    !k.current &&
      l &&
      (k.current = l(t, {
        visualState: r,
        parent: y,
        props: o,
        presenceContext: p,
        blockInitialAnimation: p ? p.initial === !1 : !1,
        reducedMotionConfig: g,
      })))
  const E = k.current,
    S = _.useContext(l1)
  E && !E.projection && a && (E.type === 'html' || E.type === 'svg') && s2(k.current, o, a, S)
  const C = _.useRef(!1)
  _.useInsertionEffect(() => {
    E && C.current && E.update(o, p)
  })
  const A = o[s1],
    P = _.useRef(
      !!A &&
        !(!((d = window.MotionHandoffIsComplete) === null || d === void 0) && d.call(window, A)) &&
        ((f = window.MotionHasOptimisedAnimation) === null || f === void 0
          ? void 0
          : f.call(window, A))
    )
  return (
    Ky(() => {
      E &&
        ((C.current = !0),
        (window.MotionIsMounted = !0),
        E.updateFeatures(),
        Fu.render(E.render),
        P.current && E.animationState && E.animationState.animateChanges())
    }),
    _.useEffect(() => {
      E &&
        (!P.current && E.animationState && E.animationState.animateChanges(),
        P.current &&
          (queueMicrotask(() => {
            var D
            ;(D = window.MotionHandoffMarkAsComplete) === null || D === void 0 || D.call(window, A)
          }),
          (P.current = !1)))
    }),
    E
  )
}
function s2(t, r, o, l) {
  const { layoutId: a, layout: d, drag: f, dragConstraints: y, layoutScroll: h, layoutRoot: p } = r
  ;((t.projection = new o(t.latestValues, r['data-framer-portal-id'] ? void 0 : a1(t.parent))),
    t.projection.setOptions({
      layoutId: a,
      layout: d,
      alwaysMeasureLayout: !!f || (y && Vr(y)),
      visualElement: t,
      animationType: typeof d == 'string' ? d : 'both',
      initialPromotionConfig: l,
      layoutScroll: h,
      layoutRoot: p,
    }))
}
function a1(t) {
  if (t) return t.options.allowProjection !== !1 ? t.projection : a1(t.parent)
}
function l2({
  preloadedFeatures: t,
  createVisualElement: r,
  useRender: o,
  useVisualState: l,
  Component: a,
}) {
  var d, f
  t && Qy(t)
  function y(p, g) {
    let k
    const E = { ..._.useContext(e1), ...p, layoutId: a2(p) },
      { isStatic: S } = E,
      C = t2(p),
      A = l(p, S)
    if (!S && Mu) {
      u2()
      const P = c2(E)
      ;((k = P.MeasureLayout), (C.visualElement = o2(a, A, E, r, P.ProjectionNode)))
    }
    return tu.jsxs(Ws.Provider, {
      value: C,
      children: [
        k && C.visualElement ? tu.jsx(k, { visualElement: C.visualElement, ...E }) : null,
        o(a, p, r2(A, C.visualElement, g), A, S, C.visualElement),
      ],
    })
  }
  y.displayName = `motion.${typeof a == 'string' ? a : `create(${(f = (d = a.displayName) !== null && d !== void 0 ? d : a.name) !== null && f !== void 0 ? f : ''})`}`
  const h = _.forwardRef(y)
  return ((h[n2] = a), h)
}
function a2({ layoutId: t }) {
  const r = _.useContext(Jp).id
  return r && t !== void 0 ? r + '-' + t : t
}
function u2(t, r) {
  _.useContext(r1).strict
}
function c2(t) {
  const { drag: r, layout: o } = Ur
  if (!r && !o) return {}
  const l = { ...r, ...o }
  return {
    MeasureLayout: r?.isEnabled(t) || o?.isEnabled(t) ? l.MeasureLayout : void 0,
    ProjectionNode: l.ProjectionNode,
  }
}
const f2 = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view',
]
function Du(t) {
  return typeof t != 'string' || t.includes('-') ? !1 : !!(f2.indexOf(t) > -1 || /[A-Z]/u.test(t))
}
function wh(t) {
  const r = [{}, {}]
  return (
    t?.values.forEach((o, l) => {
      ;((r[0][l] = o.get()), (r[1][l] = o.getVelocity()))
    }),
    r
  )
}
function Vu(t, r, o, l) {
  if (typeof r == 'function') {
    const [a, d] = wh(l)
    r = r(o !== void 0 ? o : t.custom, a, d)
  }
  if ((typeof r == 'string' && (r = t.variants && t.variants[r]), typeof r == 'function')) {
    const [a, d] = wh(l)
    r = r(o !== void 0 ? o : t.custom, a, d)
  }
  return r
}
const su = (t) => Array.isArray(t),
  d2 = (t) => !!(t && typeof t == 'object' && t.mix && t.toValue),
  h2 = (t) => (su(t) ? t[t.length - 1] || 0 : t),
  Qe = (t) => !!(t && t.getVelocity)
function Es(t) {
  const r = Qe(t) ? t.get() : t
  return d2(r) ? r.toValue() : r
}
function p2({ scrapeMotionValuesFromProps: t, createRenderState: r, onUpdate: o }, l, a, d) {
  const f = { latestValues: m2(l, a, d, t), renderState: r() }
  return (
    o && ((f.onMount = (y) => o({ props: l, current: y, ...f })), (f.onUpdate = (y) => o(y))),
    f
  )
}
const u1 = (t) => (r, o) => {
  const l = _.useContext(Ws),
    a = _.useContext(Tu),
    d = () => p2(t, r, l, a)
  return o ? d() : Hy(d)
}
function m2(t, r, o, l) {
  const a = {},
    d = l(t, {})
  for (const E in d) a[E] = Es(d[E])
  let { initial: f, animate: y } = t
  const h = Is(t),
    p = o1(t)
  r &&
    p &&
    !h &&
    t.inherit !== !1 &&
    (f === void 0 && (f = r.initial), y === void 0 && (y = r.animate))
  let g = o ? o.initial === !1 : !1
  g = g || f === !1
  const k = g ? y : f
  if (k && typeof k != 'boolean' && !Os(k)) {
    const E = Array.isArray(k) ? k : [k]
    for (let S = 0; S < E.length; S++) {
      const C = Vu(t, E[S])
      if (C) {
        const { transitionEnd: A, transition: P, ...D } = C
        for (const V in D) {
          let F = D[V]
          if (Array.isArray(F)) {
            const z = g ? F.length - 1 : 0
            F = F[z]
          }
          F !== null && (a[V] = F)
        }
        for (const V in A) a[V] = A[V]
      }
    }
  }
  return a
}
const Zr = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
  ],
  bn = new Set(Zr),
  c1 = (t) => (r) => typeof r == 'string' && r.startsWith(t),
  f1 = c1('--'),
  g2 = c1('var(--'),
  Nu = (t) => (g2(t) ? y2.test(t.split('/*')[0].trim()) : !1),
  y2 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  d1 = (t, r) => (r && typeof t == 'number' ? r.transform(t) : t),
  Xt = (t, r, o) => (o > r ? r : o < t ? t : o),
  Yr = { test: (t) => typeof t == 'number', parse: parseFloat, transform: (t) => t },
  Yi = { ...Yr, transform: (t) => Xt(0, 1, t) },
  ms = { ...Yr, default: 1 },
  Xi = (t) => ({
    test: (r) => typeof r == 'string' && r.endsWith(t) && r.split(' ').length === 1,
    parse: parseFloat,
    transform: (r) => `${r}${t}`,
  }),
  kn = Xi('deg'),
  Ot = Xi('%'),
  te = Xi('px'),
  v2 = Xi('vh'),
  k2 = Xi('vw'),
  Lh = { ...Ot, parse: (t) => Ot.parse(t) / 100, transform: (t) => Ot.transform(t * 100) },
  E2 = {
    borderWidth: te,
    borderTopWidth: te,
    borderRightWidth: te,
    borderBottomWidth: te,
    borderLeftWidth: te,
    borderRadius: te,
    radius: te,
    borderTopLeftRadius: te,
    borderTopRightRadius: te,
    borderBottomRightRadius: te,
    borderBottomLeftRadius: te,
    width: te,
    maxWidth: te,
    height: te,
    maxHeight: te,
    top: te,
    right: te,
    bottom: te,
    left: te,
    padding: te,
    paddingTop: te,
    paddingRight: te,
    paddingBottom: te,
    paddingLeft: te,
    margin: te,
    marginTop: te,
    marginRight: te,
    marginBottom: te,
    marginLeft: te,
    backgroundPositionX: te,
    backgroundPositionY: te,
  },
  x2 = {
    rotate: kn,
    rotateX: kn,
    rotateY: kn,
    rotateZ: kn,
    scale: ms,
    scaleX: ms,
    scaleY: ms,
    scaleZ: ms,
    skew: kn,
    skewX: kn,
    skewY: kn,
    distance: te,
    translateX: te,
    translateY: te,
    translateZ: te,
    x: te,
    y: te,
    z: te,
    perspective: te,
    transformPerspective: te,
    opacity: Yi,
    originX: Lh,
    originY: Lh,
    originZ: te,
  },
  Sh = { ...Yr, transform: Math.round },
  Wu = { ...E2, ...x2, zIndex: Sh, size: te, fillOpacity: Yi, strokeOpacity: Yi, numOctaves: Sh },
  w2 = { x: 'translateX', y: 'translateY', z: 'translateZ', transformPerspective: 'perspective' },
  L2 = Zr.length
function S2(t, r, o) {
  let l = '',
    a = !0
  for (let d = 0; d < L2; d++) {
    const f = Zr[d],
      y = t[f]
    if (y === void 0) continue
    let h = !0
    if (
      (typeof y == 'number'
        ? (h = y === (f.startsWith('scale') ? 1 : 0))
        : (h = parseFloat(y) === 0),
      !h || o)
    ) {
      const p = d1(y, Wu[f])
      if (!h) {
        a = !1
        const g = w2[f] || f
        l += `${g}(${p}) `
      }
      o && (r[f] = p)
    }
  }
  return ((l = l.trim()), o ? (l = o(r, a ? '' : l)) : a && (l = 'none'), l)
}
function Ou(t, r, o) {
  const { style: l, vars: a, transformOrigin: d } = t
  let f = !1,
    y = !1
  for (const h in r) {
    const p = r[h]
    if (bn.has(h)) {
      f = !0
      continue
    } else if (f1(h)) {
      a[h] = p
      continue
    } else {
      const g = d1(p, Wu[h])
      h.startsWith('origin') ? ((y = !0), (d[h] = g)) : (l[h] = g)
    }
  }
  if (
    (r.transform ||
      (f || o ? (l.transform = S2(r, t.transform, o)) : l.transform && (l.transform = 'none')),
    y)
  ) {
    const { originX: h = '50%', originY: p = '50%', originZ: g = 0 } = d
    l.transformOrigin = `${h} ${p} ${g}`
  }
}
const P2 = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  C2 = { offset: 'strokeDashoffset', array: 'strokeDasharray' }
function T2(t, r, o = 1, l = 0, a = !0) {
  t.pathLength = 1
  const d = a ? P2 : C2
  t[d.offset] = te.transform(-l)
  const f = te.transform(r),
    y = te.transform(o)
  t[d.array] = `${f} ${y}`
}
function Ph(t, r, o) {
  return typeof t == 'string' ? t : te.transform(r + o * t)
}
function M2(t, r, o) {
  const l = Ph(r, t.x, t.width),
    a = Ph(o, t.y, t.height)
  return `${l} ${a}`
}
function Iu(
  t,
  {
    attrX: r,
    attrY: o,
    attrScale: l,
    originX: a,
    originY: d,
    pathLength: f,
    pathSpacing: y = 1,
    pathOffset: h = 0,
    ...p
  },
  g,
  k
) {
  if ((Ou(t, p, k), g)) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox)
    return
  }
  ;((t.attrs = t.style), (t.style = {}))
  const { attrs: E, style: S, dimensions: C } = t
  ;(E.transform && (C && (S.transform = E.transform), delete E.transform),
    C &&
      (a !== void 0 || d !== void 0 || S.transform) &&
      (S.transformOrigin = M2(C, a !== void 0 ? a : 0.5, d !== void 0 ? d : 0.5)),
    r !== void 0 && (E.x = r),
    o !== void 0 && (E.y = o),
    l !== void 0 && (E.scale = l),
    f !== void 0 && T2(E, f, y, h, !1))
}
const Bu = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} }),
  h1 = () => ({ ...Bu(), attrs: {} }),
  zu = (t) => typeof t == 'string' && t.toLowerCase() === 'svg'
function p1(t, { style: r, vars: o }, l, a) {
  Object.assign(t.style, r, a && a.getProjectionStyles(l))
  for (const d in o) t.style.setProperty(d, o[d])
}
const m1 = new Set([
  'baseFrequency',
  'diffuseConstant',
  'kernelMatrix',
  'kernelUnitLength',
  'keySplines',
  'keyTimes',
  'limitingConeAngle',
  'markerHeight',
  'markerWidth',
  'numOctaves',
  'targetX',
  'targetY',
  'surfaceScale',
  'specularConstant',
  'specularExponent',
  'stdDeviation',
  'tableValues',
  'viewBox',
  'gradientTransform',
  'pathLength',
  'startOffset',
  'textLength',
  'lengthAdjust',
])
function g1(t, r, o, l) {
  p1(t, r, void 0, l)
  for (const a in r.attrs) t.setAttribute(m1.has(a) ? a : _u(a), r.attrs[a])
}
const Cs = {}
function A2(t) {
  Object.assign(Cs, t)
}
function y1(t, { layout: r, layoutId: o }) {
  return (
    bn.has(t) || t.startsWith('origin') || ((r || o !== void 0) && (!!Cs[t] || t === 'opacity'))
  )
}
function Uu(t, r, o) {
  var l
  const { style: a } = t,
    d = {}
  for (const f in a)
    (Qe(a[f]) ||
      (r.style && Qe(r.style[f])) ||
      y1(f, t) ||
      ((l = o?.getValue(f)) === null || l === void 0 ? void 0 : l.liveStyle) !== void 0) &&
      (d[f] = a[f])
  return d
}
function v1(t, r, o) {
  const l = Uu(t, r, o)
  for (const a in t)
    if (Qe(t[a]) || Qe(r[a])) {
      const d = Zr.indexOf(a) !== -1 ? 'attr' + a.charAt(0).toUpperCase() + a.substring(1) : a
      l[d] = t[a]
    }
  return l
}
function R2(t, r) {
  try {
    r.dimensions = typeof t.getBBox == 'function' ? t.getBBox() : t.getBoundingClientRect()
  } catch {
    r.dimensions = { x: 0, y: 0, width: 0, height: 0 }
  }
}
const Ch = ['x', 'y', 'width', 'height', 'cx', 'cy', 'r'],
  j2 = {
    useVisualState: u1({
      scrapeMotionValuesFromProps: v1,
      createRenderState: h1,
      onUpdate: ({ props: t, prevProps: r, current: o, renderState: l, latestValues: a }) => {
        if (!o) return
        let d = !!t.drag
        if (!d) {
          for (const y in a)
            if (bn.has(y)) {
              d = !0
              break
            }
        }
        if (!d) return
        let f = !r
        if (r)
          for (let y = 0; y < Ch.length; y++) {
            const h = Ch[y]
            t[h] !== r[h] && (f = !0)
          }
        f &&
          Ee.read(() => {
            ;(R2(o, l),
              Ee.render(() => {
                ;(Iu(l, a, zu(o.tagName), t.transformTemplate), g1(o, l))
              }))
          })
      },
    }),
  },
  _2 = { useVisualState: u1({ scrapeMotionValuesFromProps: Uu, createRenderState: Bu }) }
function k1(t, r, o) {
  for (const l in r) !Qe(r[l]) && !y1(l, o) && (t[l] = r[l])
}
function F2({ transformTemplate: t }, r) {
  return _.useMemo(() => {
    const o = Bu()
    return (Ou(o, r, t), Object.assign({}, o.vars, o.style))
  }, [r])
}
function D2(t, r) {
  const o = t.style || {},
    l = {}
  return (k1(l, o, t), Object.assign(l, F2(t, r)), l)
}
function V2(t, r) {
  const o = {},
    l = D2(t, r)
  return (
    t.drag &&
      t.dragListener !== !1 &&
      ((o.draggable = !1),
      (l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = 'none'),
      (l.touchAction = t.drag === !0 ? 'none' : `pan-${t.drag === 'x' ? 'y' : 'x'}`)),
    t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (o.tabIndex = 0),
    (o.style = l),
    o
  )
}
function N2(t, r, o, l) {
  const a = _.useMemo(() => {
    const d = h1()
    return (Iu(d, r, zu(l), t.transformTemplate), { ...d.attrs, style: { ...d.style } })
  }, [r])
  if (t.style) {
    const d = {}
    ;(k1(d, t.style, t), (a.style = { ...d, ...a.style }))
  }
  return a
}
function W2(t = !1) {
  return (o, l, a, { latestValues: d }, f) => {
    const h = (Du(o) ? N2 : V2)(l, d, f, o),
      p = qy(l, typeof o == 'string', t),
      g = o !== _.Fragment ? { ...p, ...h, ref: a } : {},
      { children: k } = l,
      E = _.useMemo(() => (Qe(k) ? k.get() : k), [k])
    return _.createElement(o, { ...g, children: E })
  }
}
function O2(t, r) {
  return function (l, { forwardMotionProps: a } = { forwardMotionProps: !1 }) {
    const f = {
      ...(Du(l) ? j2 : _2),
      preloadedFeatures: t,
      useRender: W2(a),
      createVisualElement: r,
      Component: l,
    }
    return l2(f)
  }
}
function E1(t, r) {
  if (!Array.isArray(r)) return !1
  const o = r.length
  if (o !== t.length) return !1
  for (let l = 0; l < o; l++) if (r[l] !== t[l]) return !1
  return !0
}
function Bs(t, r, o) {
  const l = t.getProps()
  return Vu(l, r, o !== void 0 ? o : l.custom, t)
}
const I2 = Au(() => window.ScrollTimeline !== void 0)
class B2 {
  constructor(r) {
    ;((this.stop = () => this.runAll('stop')), (this.animations = r.filter(Boolean)))
  }
  get finished() {
    return Promise.all(this.animations.map((r) => ('finished' in r ? r.finished : r)))
  }
  getAll(r) {
    return this.animations[0][r]
  }
  setAll(r, o) {
    for (let l = 0; l < this.animations.length; l++) this.animations[l][r] = o
  }
  attachTimeline(r, o) {
    const l = this.animations.map((a) => {
      if (I2() && a.attachTimeline) return a.attachTimeline(r)
      if (typeof o == 'function') return o(a)
    })
    return () => {
      l.forEach((a, d) => {
        ;(a && a(), this.animations[d].stop())
      })
    }
  }
  get time() {
    return this.getAll('time')
  }
  set time(r) {
    this.setAll('time', r)
  }
  get speed() {
    return this.getAll('speed')
  }
  set speed(r) {
    this.setAll('speed', r)
  }
  get startTime() {
    return this.getAll('startTime')
  }
  get duration() {
    let r = 0
    for (let o = 0; o < this.animations.length; o++) r = Math.max(r, this.animations[o].duration)
    return r
  }
  runAll(r) {
    this.animations.forEach((o) => o[r]())
  }
  flatten() {
    this.runAll('flatten')
  }
  play() {
    this.runAll('play')
  }
  pause() {
    this.runAll('pause')
  }
  cancel() {
    this.runAll('cancel')
  }
  complete() {
    this.runAll('complete')
  }
}
class z2 extends B2 {
  then(r, o) {
    return Promise.all(this.animations).then(r).catch(o)
  }
}
function Hu(t, r) {
  return t ? t[r] || t.default || t : void 0
}
const lu = 2e4
function x1(t) {
  let r = 0
  const o = 50
  let l = t.next(r)
  for (; !l.done && r < lu; ) ((r += o), (l = t.next(r)))
  return r >= lu ? 1 / 0 : r
}
function $u(t) {
  return typeof t == 'function'
}
function Th(t, r) {
  ;((t.timeline = r), (t.onfinish = null))
}
const Ku = (t) => Array.isArray(t) && typeof t[0] == 'number',
  U2 = { linearEasing: void 0 }
function H2(t, r) {
  const o = Au(t)
  return () => {
    var l
    return (l = U2[r]) !== null && l !== void 0 ? l : o()
  }
}
const Ts = H2(() => {
    try {
      document.createElement('div').animate({ opacity: 0 }, { easing: 'linear(0, 1)' })
    } catch {
      return !1
    }
    return !0
  }, 'linearEasing'),
  w1 = (t, r, o = 10) => {
    let l = ''
    const a = Math.max(Math.round(r / o), 2)
    for (let d = 0; d < a; d++) l += t(zr(0, a - 1, d)) + ', '
    return `linear(${l.substring(0, l.length - 2)})`
  }
function L1(t) {
  return !!(
    (typeof t == 'function' && Ts()) ||
    !t ||
    (typeof t == 'string' && (t in au || Ts())) ||
    Ku(t) ||
    (Array.isArray(t) && t.every(L1))
  )
}
const Vi = ([t, r, o, l]) => `cubic-bezier(${t}, ${r}, ${o}, ${l})`,
  au = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: Vi([0, 0.65, 0.55, 1]),
    circOut: Vi([0.55, 0, 1, 0.45]),
    backIn: Vi([0.31, 0.01, 0.66, -0.59]),
    backOut: Vi([0.33, 1.53, 0.69, 0.99]),
  }
function S1(t, r) {
  if (t)
    return typeof t == 'function' && Ts()
      ? w1(t, r)
      : Ku(t)
        ? Vi(t)
        : Array.isArray(t)
          ? t.map((o) => S1(o, r) || au.easeOut)
          : au[t]
}
const _t = { x: !1, y: !1 }
function P1() {
  return _t.x || _t.y
}
function $2(t, r, o) {
  var l
  if (t instanceof Element) return [t]
  if (typeof t == 'string') {
    let a = document
    const d = (l = void 0) !== null && l !== void 0 ? l : a.querySelectorAll(t)
    return d ? Array.from(d) : []
  }
  return Array.from(t)
}
function C1(t, r) {
  const o = $2(t),
    l = new AbortController(),
    a = { passive: !0, ...r, signal: l.signal }
  return [o, a, () => l.abort()]
}
function Mh(t) {
  return (r) => {
    r.pointerType === 'touch' || P1() || t(r)
  }
}
function K2(t, r, o = {}) {
  const [l, a, d] = C1(t, o),
    f = Mh((y) => {
      const { target: h } = y,
        p = r(y)
      if (typeof p != 'function' || !h) return
      const g = Mh((k) => {
        ;(p(k), h.removeEventListener('pointerleave', g))
      })
      h.addEventListener('pointerleave', g, a)
    })
  return (
    l.forEach((y) => {
      y.addEventListener('pointerenter', f, a)
    }),
    d
  )
}
const T1 = (t, r) => (r ? (t === r ? !0 : T1(t, r.parentElement)) : !1),
  Zu = (t) =>
    t.pointerType === 'mouse' ? typeof t.button != 'number' || t.button <= 0 : t.isPrimary !== !1,
  Z2 = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'])
function Y2(t) {
  return Z2.has(t.tagName) || t.tabIndex !== -1
}
const Ni = new WeakSet()
function Ah(t) {
  return (r) => {
    r.key === 'Enter' && t(r)
  }
}
function Ua(t, r) {
  t.dispatchEvent(new PointerEvent('pointer' + r, { isPrimary: !0, bubbles: !0 }))
}
const b2 = (t, r) => {
  const o = t.currentTarget
  if (!o) return
  const l = Ah(() => {
    if (Ni.has(o)) return
    Ua(o, 'down')
    const a = Ah(() => {
        Ua(o, 'up')
      }),
      d = () => Ua(o, 'cancel')
    ;(o.addEventListener('keyup', a, r), o.addEventListener('blur', d, r))
  })
  ;(o.addEventListener('keydown', l, r),
    o.addEventListener('blur', () => o.removeEventListener('keydown', l), r))
}
function Rh(t) {
  return Zu(t) && !P1()
}
function Q2(t, r, o = {}) {
  const [l, a, d] = C1(t, o),
    f = (y) => {
      const h = y.currentTarget
      if (!Rh(y) || Ni.has(h)) return
      Ni.add(h)
      const p = r(y),
        g = (S, C) => {
          ;(window.removeEventListener('pointerup', k),
            window.removeEventListener('pointercancel', E),
            !(!Rh(S) || !Ni.has(h)) &&
              (Ni.delete(h), typeof p == 'function' && p(S, { success: C })))
        },
        k = (S) => {
          g(S, o.useGlobalTarget || T1(h, S.target))
        },
        E = (S) => {
          g(S, !1)
        }
      ;(window.addEventListener('pointerup', k, a), window.addEventListener('pointercancel', E, a))
    }
  return (
    l.forEach((y) => {
      ;(!Y2(y) && y.getAttribute('tabindex') === null && (y.tabIndex = 0),
        (o.useGlobalTarget ? window : y).addEventListener('pointerdown', f, a),
        y.addEventListener('focus', (p) => b2(p, a), a))
    }),
    d
  )
}
function G2(t) {
  return t === 'x' || t === 'y'
    ? _t[t]
      ? null
      : ((_t[t] = !0),
        () => {
          _t[t] = !1
        })
    : _t.x || _t.y
      ? null
      : ((_t.x = _t.y = !0),
        () => {
          _t.x = _t.y = !1
        })
}
const M1 = new Set(['width', 'height', 'top', 'left', 'right', 'bottom', ...Zr])
let xs
function X2() {
  xs = void 0
}
const It = {
  now: () => (
    xs === void 0 &&
      It.set(Ue.isProcessing || Zy.useManualTiming ? Ue.timestamp : performance.now()),
    xs
  ),
  set: (t) => {
    ;((xs = t), queueMicrotask(X2))
  },
}
function Yu(t, r) {
  t.indexOf(r) === -1 && t.push(r)
}
function bu(t, r) {
  const o = t.indexOf(r)
  o > -1 && t.splice(o, 1)
}
class Qu {
  constructor() {
    this.subscriptions = []
  }
  add(r) {
    return (Yu(this.subscriptions, r), () => bu(this.subscriptions, r))
  }
  notify(r, o, l) {
    const a = this.subscriptions.length
    if (a)
      if (a === 1) this.subscriptions[0](r, o, l)
      else
        for (let d = 0; d < a; d++) {
          const f = this.subscriptions[d]
          f && f(r, o, l)
        }
  }
  getSize() {
    return this.subscriptions.length
  }
  clear() {
    this.subscriptions.length = 0
  }
}
function A1(t, r) {
  return r ? t * (1e3 / r) : 0
}
const jh = 30,
  q2 = (t) => !isNaN(parseFloat(t))
class J2 {
  constructor(r, o = {}) {
    ;((this.version = '11.18.2'),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (l, a = !0) => {
        const d = It.now()
        ;(this.updatedAt !== d && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(l),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          a && this.events.renderRequest && this.events.renderRequest.notify(this.current))
      }),
      (this.hasAnimated = !1),
      this.setCurrent(r),
      (this.owner = o.owner))
  }
  setCurrent(r) {
    ;((this.current = r),
      (this.updatedAt = It.now()),
      this.canTrackVelocity === null && r !== void 0 && (this.canTrackVelocity = q2(this.current)))
  }
  setPrevFrameValue(r = this.current) {
    ;((this.prevFrameValue = r), (this.prevUpdatedAt = this.updatedAt))
  }
  onChange(r) {
    return this.on('change', r)
  }
  on(r, o) {
    this.events[r] || (this.events[r] = new Qu())
    const l = this.events[r].add(o)
    return r === 'change'
      ? () => {
          ;(l(),
            Ee.read(() => {
              this.events.change.getSize() || this.stop()
            }))
        }
      : l
  }
  clearListeners() {
    for (const r in this.events) this.events[r].clear()
  }
  attach(r, o) {
    ;((this.passiveEffect = r), (this.stopPassiveEffect = o))
  }
  set(r, o = !0) {
    !o || !this.passiveEffect
      ? this.updateAndNotify(r, o)
      : this.passiveEffect(r, this.updateAndNotify)
  }
  setWithVelocity(r, o, l) {
    ;(this.set(o),
      (this.prev = void 0),
      (this.prevFrameValue = r),
      (this.prevUpdatedAt = this.updatedAt - l))
  }
  jump(r, o = !0) {
    ;(this.updateAndNotify(r),
      (this.prev = r),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      o && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect())
  }
  get() {
    return this.current
  }
  getPrevious() {
    return this.prev
  }
  getVelocity() {
    const r = It.now()
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || r - this.updatedAt > jh)
      return 0
    const o = Math.min(this.updatedAt - this.prevUpdatedAt, jh)
    return A1(parseFloat(this.current) - parseFloat(this.prevFrameValue), o)
  }
  start(r) {
    return (
      this.stop(),
      new Promise((o) => {
        ;((this.hasAnimated = !0),
          (this.animation = r(o)),
          this.events.animationStart && this.events.animationStart.notify())
      }).then(() => {
        ;(this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation())
      })
    )
  }
  stop() {
    ;(this.animation &&
      (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation())
  }
  isAnimating() {
    return !!this.animation
  }
  clearAnimation() {
    delete this.animation
  }
  destroy() {
    ;(this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect())
  }
}
function bi(t, r) {
  return new J2(t, r)
}
function ev(t, r, o) {
  t.hasValue(r) ? t.getValue(r).set(o) : t.addValue(r, bi(o))
}
function tv(t, r) {
  const o = Bs(t, r)
  let { transitionEnd: l = {}, transition: a = {}, ...d } = o || {}
  d = { ...d, ...l }
  for (const f in d) {
    const y = h2(d[f])
    ev(t, f, y)
  }
}
function nv(t) {
  return !!(Qe(t) && t.add)
}
function uu(t, r) {
  const o = t.getValue('willChange')
  if (nv(o)) return o.add(r)
}
function R1(t) {
  return t.props[s1]
}
const j1 = (t, r, o) => (((1 - 3 * o + 3 * r) * t + (3 * o - 6 * r)) * t + 3 * r) * t,
  rv = 1e-7,
  iv = 12
function ov(t, r, o, l, a) {
  let d,
    f,
    y = 0
  do ((f = r + (o - r) / 2), (d = j1(f, l, a) - t), d > 0 ? (o = f) : (r = f))
  while (Math.abs(d) > rv && ++y < iv)
  return f
}
function qi(t, r, o, l) {
  if (t === r && o === l) return pt
  const a = (d) => ov(d, 0, 1, t, o)
  return (d) => (d === 0 || d === 1 ? d : j1(a(d), r, l))
}
const _1 = (t) => (r) => (r <= 0.5 ? t(2 * r) / 2 : (2 - t(2 * (1 - r))) / 2),
  F1 = (t) => (r) => 1 - t(1 - r),
  D1 = qi(0.33, 1.53, 0.69, 0.99),
  Gu = F1(D1),
  V1 = _1(Gu),
  N1 = (t) => ((t *= 2) < 1 ? 0.5 * Gu(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)))),
  Xu = (t) => 1 - Math.sin(Math.acos(t)),
  W1 = F1(Xu),
  O1 = _1(Xu),
  I1 = (t) => /^0[^.\s]+$/u.test(t)
function sv(t) {
  return typeof t == 'number' ? t === 0 : t !== null ? t === 'none' || t === '0' || I1(t) : !0
}
const Bi = (t) => Math.round(t * 1e5) / 1e5,
  qu = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu
function lv(t) {
  return t == null
}
const av =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  Ju = (t, r) => (o) =>
    !!(
      (typeof o == 'string' && av.test(o) && o.startsWith(t)) ||
      (r && !lv(o) && Object.prototype.hasOwnProperty.call(o, r))
    ),
  B1 = (t, r, o) => (l) => {
    if (typeof l != 'string') return l
    const [a, d, f, y] = l.match(qu)
    return {
      [t]: parseFloat(a),
      [r]: parseFloat(d),
      [o]: parseFloat(f),
      alpha: y !== void 0 ? parseFloat(y) : 1,
    }
  },
  uv = (t) => Xt(0, 255, t),
  Ha = { ...Yr, transform: (t) => Math.round(uv(t)) },
  $n = {
    test: Ju('rgb', 'red'),
    parse: B1('red', 'green', 'blue'),
    transform: ({ red: t, green: r, blue: o, alpha: l = 1 }) =>
      'rgba(' +
      Ha.transform(t) +
      ', ' +
      Ha.transform(r) +
      ', ' +
      Ha.transform(o) +
      ', ' +
      Bi(Yi.transform(l)) +
      ')',
  }
function cv(t) {
  let r = '',
    o = '',
    l = '',
    a = ''
  return (
    t.length > 5
      ? ((r = t.substring(1, 3)),
        (o = t.substring(3, 5)),
        (l = t.substring(5, 7)),
        (a = t.substring(7, 9)))
      : ((r = t.substring(1, 2)),
        (o = t.substring(2, 3)),
        (l = t.substring(3, 4)),
        (a = t.substring(4, 5)),
        (r += r),
        (o += o),
        (l += l),
        (a += a)),
    {
      red: parseInt(r, 16),
      green: parseInt(o, 16),
      blue: parseInt(l, 16),
      alpha: a ? parseInt(a, 16) / 255 : 1,
    }
  )
}
const cu = { test: Ju('#'), parse: cv, transform: $n.transform },
  Nr = {
    test: Ju('hsl', 'hue'),
    parse: B1('hue', 'saturation', 'lightness'),
    transform: ({ hue: t, saturation: r, lightness: o, alpha: l = 1 }) =>
      'hsla(' +
      Math.round(t) +
      ', ' +
      Ot.transform(Bi(r)) +
      ', ' +
      Ot.transform(Bi(o)) +
      ', ' +
      Bi(Yi.transform(l)) +
      ')',
  },
  be = {
    test: (t) => $n.test(t) || cu.test(t) || Nr.test(t),
    parse: (t) => ($n.test(t) ? $n.parse(t) : Nr.test(t) ? Nr.parse(t) : cu.parse(t)),
    transform: (t) =>
      typeof t == 'string' ? t : t.hasOwnProperty('red') ? $n.transform(t) : Nr.transform(t),
  },
  fv =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu
function dv(t) {
  var r, o
  return (
    isNaN(t) &&
    typeof t == 'string' &&
    (((r = t.match(qu)) === null || r === void 0 ? void 0 : r.length) || 0) +
      (((o = t.match(fv)) === null || o === void 0 ? void 0 : o.length) || 0) >
      0
  )
}
const z1 = 'number',
  U1 = 'color',
  hv = 'var',
  pv = 'var(',
  _h = '${}',
  mv =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu
function Qi(t) {
  const r = t.toString(),
    o = [],
    l = { color: [], number: [], var: [] },
    a = []
  let d = 0
  const y = r
    .replace(
      mv,
      (h) => (
        be.test(h)
          ? (l.color.push(d), a.push(U1), o.push(be.parse(h)))
          : h.startsWith(pv)
            ? (l.var.push(d), a.push(hv), o.push(h))
            : (l.number.push(d), a.push(z1), o.push(parseFloat(h))),
        ++d,
        _h
      )
    )
    .split(_h)
  return { values: o, split: y, indexes: l, types: a }
}
function H1(t) {
  return Qi(t).values
}
function $1(t) {
  const { split: r, types: o } = Qi(t),
    l = r.length
  return (a) => {
    let d = ''
    for (let f = 0; f < l; f++)
      if (((d += r[f]), a[f] !== void 0)) {
        const y = o[f]
        y === z1 ? (d += Bi(a[f])) : y === U1 ? (d += be.transform(a[f])) : (d += a[f])
      }
    return d
  }
}
const gv = (t) => (typeof t == 'number' ? 0 : t)
function yv(t) {
  const r = H1(t)
  return $1(t)(r.map(gv))
}
const Pn = { test: dv, parse: H1, createTransformer: $1, getAnimatableNone: yv },
  vv = new Set(['brightness', 'contrast', 'saturate', 'opacity'])
function kv(t) {
  const [r, o] = t.slice(0, -1).split('(')
  if (r === 'drop-shadow') return t
  const [l] = o.match(qu) || []
  if (!l) return t
  const a = o.replace(l, '')
  let d = vv.has(r) ? 1 : 0
  return (l !== o && (d *= 100), r + '(' + d + a + ')')
}
const Ev = /\b([a-z-]*)\(.*?\)/gu,
  fu = {
    ...Pn,
    getAnimatableNone: (t) => {
      const r = t.match(Ev)
      return r ? r.map(kv).join(' ') : t
    },
  },
  xv = {
    ...Wu,
    color: be,
    backgroundColor: be,
    outlineColor: be,
    fill: be,
    stroke: be,
    borderColor: be,
    borderTopColor: be,
    borderRightColor: be,
    borderBottomColor: be,
    borderLeftColor: be,
    filter: fu,
    WebkitFilter: fu,
  },
  ec = (t) => xv[t]
function K1(t, r) {
  let o = ec(t)
  return (o !== fu && (o = Pn), o.getAnimatableNone ? o.getAnimatableNone(r) : void 0)
}
const wv = new Set(['auto', 'none', '0'])
function Lv(t, r, o) {
  let l = 0,
    a
  for (; l < t.length && !a; ) {
    const d = t[l]
    ;(typeof d == 'string' && !wv.has(d) && Qi(d).values.length && (a = t[l]), l++)
  }
  if (a && o) for (const d of r) t[d] = K1(o, a)
}
const Fh = (t) => t === Yr || t === te,
  Dh = (t, r) => parseFloat(t.split(', ')[r]),
  Vh =
    (t, r) =>
    (o, { transform: l }) => {
      if (l === 'none' || !l) return 0
      const a = l.match(/^matrix3d\((.+)\)$/u)
      if (a) return Dh(a[1], r)
      {
        const d = l.match(/^matrix\((.+)\)$/u)
        return d ? Dh(d[1], t) : 0
      }
    },
  Sv = new Set(['x', 'y', 'z']),
  Pv = Zr.filter((t) => !Sv.has(t))
function Cv(t) {
  const r = []
  return (
    Pv.forEach((o) => {
      const l = t.getValue(o)
      l !== void 0 && (r.push([o, l.get()]), l.set(o.startsWith('scale') ? 1 : 0))
    }),
    r
  )
}
const Hr = {
  width: ({ x: t }, { paddingLeft: r = '0', paddingRight: o = '0' }) =>
    t.max - t.min - parseFloat(r) - parseFloat(o),
  height: ({ y: t }, { paddingTop: r = '0', paddingBottom: o = '0' }) =>
    t.max - t.min - parseFloat(r) - parseFloat(o),
  top: (t, { top: r }) => parseFloat(r),
  left: (t, { left: r }) => parseFloat(r),
  bottom: ({ y: t }, { top: r }) => parseFloat(r) + (t.max - t.min),
  right: ({ x: t }, { left: r }) => parseFloat(r) + (t.max - t.min),
  x: Vh(4, 13),
  y: Vh(5, 14),
}
Hr.translateX = Hr.x
Hr.translateY = Hr.y
const Kn = new Set()
let du = !1,
  hu = !1
function Z1() {
  if (hu) {
    const t = Array.from(Kn).filter((l) => l.needsMeasurement),
      r = new Set(t.map((l) => l.element)),
      o = new Map()
    ;(r.forEach((l) => {
      const a = Cv(l)
      a.length && (o.set(l, a), l.render())
    }),
      t.forEach((l) => l.measureInitialState()),
      r.forEach((l) => {
        l.render()
        const a = o.get(l)
        a &&
          a.forEach(([d, f]) => {
            var y
            ;(y = l.getValue(d)) === null || y === void 0 || y.set(f)
          })
      }),
      t.forEach((l) => l.measureEndState()),
      t.forEach((l) => {
        l.suspendedScrollY !== void 0 && window.scrollTo(0, l.suspendedScrollY)
      }))
  }
  ;((hu = !1), (du = !1), Kn.forEach((t) => t.complete()), Kn.clear())
}
function Y1() {
  Kn.forEach((t) => {
    ;(t.readKeyframes(), t.needsMeasurement && (hu = !0))
  })
}
function Tv() {
  ;(Y1(), Z1())
}
class tc {
  constructor(r, o, l, a, d, f = !1) {
    ;((this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...r]),
      (this.onComplete = o),
      (this.name = l),
      (this.motionValue = a),
      (this.element = d),
      (this.isAsync = f))
  }
  scheduleResolve() {
    ;((this.isScheduled = !0),
      this.isAsync
        ? (Kn.add(this), du || ((du = !0), Ee.read(Y1), Ee.resolveKeyframes(Z1)))
        : (this.readKeyframes(), this.complete()))
  }
  readKeyframes() {
    const { unresolvedKeyframes: r, name: o, element: l, motionValue: a } = this
    for (let d = 0; d < r.length; d++)
      if (r[d] === null)
        if (d === 0) {
          const f = a?.get(),
            y = r[r.length - 1]
          if (f !== void 0) r[0] = f
          else if (l && o) {
            const h = l.readValue(o, y)
            h != null && (r[0] = h)
          }
          ;(r[0] === void 0 && (r[0] = y), a && f === void 0 && a.set(r[0]))
        } else r[d] = r[d - 1]
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    ;((this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      Kn.delete(this))
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), Kn.delete(this))
  }
  resume() {
    this.isComplete || this.scheduleResolve()
  }
}
const b1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),
  Mv = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
function Av(t) {
  const r = Mv.exec(t)
  if (!r) return [,]
  const [, o, l, a] = r
  return [`--${o ?? l}`, a]
}
function Q1(t, r, o = 1) {
  const [l, a] = Av(t)
  if (!l) return
  const d = window.getComputedStyle(r).getPropertyValue(l)
  if (d) {
    const f = d.trim()
    return b1(f) ? parseFloat(f) : f
  }
  return Nu(a) ? Q1(a, r, o + 1) : a
}
const G1 = (t) => (r) => r.test(t),
  Rv = { test: (t) => t === 'auto', parse: (t) => t },
  X1 = [Yr, te, Ot, kn, k2, v2, Rv],
  Nh = (t) => X1.find(G1(t))
class q1 extends tc {
  constructor(r, o, l, a, d) {
    super(r, o, l, a, d, !0)
  }
  readKeyframes() {
    const { unresolvedKeyframes: r, element: o, name: l } = this
    if (!o || !o.current) return
    super.readKeyframes()
    for (let h = 0; h < r.length; h++) {
      let p = r[h]
      if (typeof p == 'string' && ((p = p.trim()), Nu(p))) {
        const g = Q1(p, o.current)
        ;(g !== void 0 && (r[h] = g), h === r.length - 1 && (this.finalKeyframe = p))
      }
    }
    if ((this.resolveNoneKeyframes(), !M1.has(l) || r.length !== 2)) return
    const [a, d] = r,
      f = Nh(a),
      y = Nh(d)
    if (f !== y)
      if (Fh(f) && Fh(y))
        for (let h = 0; h < r.length; h++) {
          const p = r[h]
          typeof p == 'string' && (r[h] = parseFloat(p))
        }
      else this.needsMeasurement = !0
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: r, name: o } = this,
      l = []
    for (let a = 0; a < r.length; a++) sv(r[a]) && l.push(a)
    l.length && Lv(r, l, o)
  }
  measureInitialState() {
    const { element: r, unresolvedKeyframes: o, name: l } = this
    if (!r || !r.current) return
    ;(l === 'height' && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Hr[l](r.measureViewportBox(), window.getComputedStyle(r.current))),
      (o[0] = this.measuredOrigin))
    const a = o[o.length - 1]
    a !== void 0 && r.getValue(l, a).jump(a, !1)
  }
  measureEndState() {
    var r
    const { element: o, name: l, unresolvedKeyframes: a } = this
    if (!o || !o.current) return
    const d = o.getValue(l)
    d && d.jump(this.measuredOrigin, !1)
    const f = a.length - 1,
      y = a[f]
    ;((a[f] = Hr[l](o.measureViewportBox(), window.getComputedStyle(o.current))),
      y !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = y),
      !((r = this.removedTransforms) === null || r === void 0) &&
        r.length &&
        this.removedTransforms.forEach(([h, p]) => {
          o.getValue(h).set(p)
        }),
      this.resolveNoneKeyframes())
  }
}
const Wh = (t, r) =>
  r === 'zIndex'
    ? !1
    : !!(
        typeof t == 'number' ||
        Array.isArray(t) ||
        (typeof t == 'string' && (Pn.test(t) || t === '0') && !t.startsWith('url('))
      )
function jv(t) {
  const r = t[0]
  if (t.length === 1) return !0
  for (let o = 0; o < t.length; o++) if (t[o] !== r) return !0
}
function _v(t, r, o, l) {
  const a = t[0]
  if (a === null) return !1
  if (r === 'display' || r === 'visibility') return !0
  const d = t[t.length - 1],
    f = Wh(a, r),
    y = Wh(d, r)
  return !f || !y ? !1 : jv(t) || ((o === 'spring' || $u(o)) && l)
}
const Fv = (t) => t !== null
function zs(t, { repeat: r, repeatType: o = 'loop' }, l) {
  const a = t.filter(Fv),
    d = r && o !== 'loop' && r % 2 === 1 ? 0 : a.length - 1
  return !d || l === void 0 ? a[d] : l
}
const Dv = 40
class J1 {
  constructor({
    autoplay: r = !0,
    delay: o = 0,
    type: l = 'keyframes',
    repeat: a = 0,
    repeatDelay: d = 0,
    repeatType: f = 'loop',
    ...y
  }) {
    ;((this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = It.now()),
      (this.options = {
        autoplay: r,
        delay: o,
        type: l,
        repeat: a,
        repeatDelay: d,
        repeatType: f,
        ...y,
      }),
      this.updateFinishedPromise())
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > Dv
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt
  }
  get resolved() {
    return (!this._resolved && !this.hasAttemptedResolve && Tv(), this._resolved)
  }
  onKeyframesResolved(r, o) {
    ;((this.resolvedAt = It.now()), (this.hasAttemptedResolve = !0))
    const {
      name: l,
      type: a,
      velocity: d,
      delay: f,
      onComplete: y,
      onUpdate: h,
      isGenerator: p,
    } = this.options
    if (!p && !_v(r, l, a, d))
      if (f) this.options.duration = 0
      else {
        ;(h && h(zs(r, this.options, o)), y && y(), this.resolveFinishedPromise())
        return
      }
    const g = this.initPlayback(r, o)
    g !== !1 && ((this._resolved = { keyframes: r, finalKeyframe: o, ...g }), this.onPostResolved())
  }
  onPostResolved() {}
  then(r, o) {
    return this.currentFinishedPromise.then(r, o)
  }
  flatten() {
    ;((this.options.type = 'keyframes'), (this.options.ease = 'linear'))
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((r) => {
      this.resolveFinishedPromise = r
    })
  }
}
const Pe = (t, r, o) => t + (r - t) * o
function $a(t, r, o) {
  return (
    o < 0 && (o += 1),
    o > 1 && (o -= 1),
    o < 1 / 6 ? t + (r - t) * 6 * o : o < 1 / 2 ? r : o < 2 / 3 ? t + (r - t) * (2 / 3 - o) * 6 : t
  )
}
function Vv({ hue: t, saturation: r, lightness: o, alpha: l }) {
  ;((t /= 360), (r /= 100), (o /= 100))
  let a = 0,
    d = 0,
    f = 0
  if (!r) a = d = f = o
  else {
    const y = o < 0.5 ? o * (1 + r) : o + r - o * r,
      h = 2 * o - y
    ;((a = $a(h, y, t + 1 / 3)), (d = $a(h, y, t)), (f = $a(h, y, t - 1 / 3)))
  }
  return {
    red: Math.round(a * 255),
    green: Math.round(d * 255),
    blue: Math.round(f * 255),
    alpha: l,
  }
}
function Ms(t, r) {
  return (o) => (o > 0 ? r : t)
}
const Ka = (t, r, o) => {
    const l = t * t,
      a = o * (r * r - l) + l
    return a < 0 ? 0 : Math.sqrt(a)
  },
  Nv = [cu, $n, Nr],
  Wv = (t) => Nv.find((r) => r.test(t))
function Oh(t) {
  const r = Wv(t)
  if (!r) return !1
  let o = r.parse(t)
  return (r === Nr && (o = Vv(o)), o)
}
const Ih = (t, r) => {
    const o = Oh(t),
      l = Oh(r)
    if (!o || !l) return Ms(t, r)
    const a = { ...o }
    return (d) => (
      (a.red = Ka(o.red, l.red, d)),
      (a.green = Ka(o.green, l.green, d)),
      (a.blue = Ka(o.blue, l.blue, d)),
      (a.alpha = Pe(o.alpha, l.alpha, d)),
      $n.transform(a)
    )
  },
  Ov = (t, r) => (o) => r(t(o)),
  Ji = (...t) => t.reduce(Ov),
  pu = new Set(['none', 'hidden'])
function Iv(t, r) {
  return pu.has(t) ? (o) => (o <= 0 ? t : r) : (o) => (o >= 1 ? r : t)
}
function Bv(t, r) {
  return (o) => Pe(t, r, o)
}
function nc(t) {
  return typeof t == 'number'
    ? Bv
    : typeof t == 'string'
      ? Nu(t)
        ? Ms
        : be.test(t)
          ? Ih
          : Hv
      : Array.isArray(t)
        ? em
        : typeof t == 'object'
          ? be.test(t)
            ? Ih
            : zv
          : Ms
}
function em(t, r) {
  const o = [...t],
    l = o.length,
    a = t.map((d, f) => nc(d)(d, r[f]))
  return (d) => {
    for (let f = 0; f < l; f++) o[f] = a[f](d)
    return o
  }
}
function zv(t, r) {
  const o = { ...t, ...r },
    l = {}
  for (const a in o) t[a] !== void 0 && r[a] !== void 0 && (l[a] = nc(t[a])(t[a], r[a]))
  return (a) => {
    for (const d in l) o[d] = l[d](a)
    return o
  }
}
function Uv(t, r) {
  var o
  const l = [],
    a = { color: 0, var: 0, number: 0 }
  for (let d = 0; d < r.values.length; d++) {
    const f = r.types[d],
      y = t.indexes[f][a[f]],
      h = (o = t.values[y]) !== null && o !== void 0 ? o : 0
    ;((l[d] = h), a[f]++)
  }
  return l
}
const Hv = (t, r) => {
  const o = Pn.createTransformer(r),
    l = Qi(t),
    a = Qi(r)
  return l.indexes.var.length === a.indexes.var.length &&
    l.indexes.color.length === a.indexes.color.length &&
    l.indexes.number.length >= a.indexes.number.length
    ? (pu.has(t) && !a.values.length) || (pu.has(r) && !l.values.length)
      ? Iv(t, r)
      : Ji(em(Uv(l, a), a.values), o)
    : Ms(t, r)
}
function tm(t, r, o) {
  return typeof t == 'number' && typeof r == 'number' && typeof o == 'number'
    ? Pe(t, r, o)
    : nc(t)(t, r)
}
const $v = 5
function nm(t, r, o) {
  const l = Math.max(r - $v, 0)
  return A1(o - t(l), r - l)
}
const Me = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  Za = 0.001
function Kv({
  duration: t = Me.duration,
  bounce: r = Me.bounce,
  velocity: o = Me.velocity,
  mass: l = Me.mass,
}) {
  let a,
    d,
    f = 1 - r
  ;((f = Xt(Me.minDamping, Me.maxDamping, f)),
    (t = Xt(Me.minDuration, Me.maxDuration, Gt(t))),
    f < 1
      ? ((a = (p) => {
          const g = p * f,
            k = g * t,
            E = g - o,
            S = mu(p, f),
            C = Math.exp(-k)
          return Za - (E / S) * C
        }),
        (d = (p) => {
          const k = p * f * t,
            E = k * o + o,
            S = Math.pow(f, 2) * Math.pow(p, 2) * t,
            C = Math.exp(-k),
            A = mu(Math.pow(p, 2), f)
          return ((-a(p) + Za > 0 ? -1 : 1) * ((E - S) * C)) / A
        }))
      : ((a = (p) => {
          const g = Math.exp(-p * t),
            k = (p - o) * t + 1
          return -Za + g * k
        }),
        (d = (p) => {
          const g = Math.exp(-p * t),
            k = (o - p) * (t * t)
          return g * k
        })))
  const y = 5 / t,
    h = Yv(a, d, y)
  if (((t = Qt(t)), isNaN(h))) return { stiffness: Me.stiffness, damping: Me.damping, duration: t }
  {
    const p = Math.pow(h, 2) * l
    return { stiffness: p, damping: f * 2 * Math.sqrt(l * p), duration: t }
  }
}
const Zv = 12
function Yv(t, r, o) {
  let l = o
  for (let a = 1; a < Zv; a++) l = l - t(l) / r(l)
  return l
}
function mu(t, r) {
  return t * Math.sqrt(1 - r * r)
}
const bv = ['duration', 'bounce'],
  Qv = ['stiffness', 'damping', 'mass']
function Bh(t, r) {
  return r.some((o) => t[o] !== void 0)
}
function Gv(t) {
  let r = {
    velocity: Me.velocity,
    stiffness: Me.stiffness,
    damping: Me.damping,
    mass: Me.mass,
    isResolvedFromDuration: !1,
    ...t,
  }
  if (!Bh(t, Qv) && Bh(t, bv))
    if (t.visualDuration) {
      const o = t.visualDuration,
        l = (2 * Math.PI) / (o * 1.2),
        a = l * l,
        d = 2 * Xt(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(a)
      r = { ...r, mass: Me.mass, stiffness: a, damping: d }
    } else {
      const o = Kv(t)
      ;((r = { ...r, ...o, mass: Me.mass }), (r.isResolvedFromDuration = !0))
    }
  return r
}
function rm(t = Me.visualDuration, r = Me.bounce) {
  const o = typeof t != 'object' ? { visualDuration: t, keyframes: [0, 1], bounce: r } : t
  let { restSpeed: l, restDelta: a } = o
  const d = o.keyframes[0],
    f = o.keyframes[o.keyframes.length - 1],
    y = { done: !1, value: d },
    {
      stiffness: h,
      damping: p,
      mass: g,
      duration: k,
      velocity: E,
      isResolvedFromDuration: S,
    } = Gv({ ...o, velocity: -Gt(o.velocity || 0) }),
    C = E || 0,
    A = p / (2 * Math.sqrt(h * g)),
    P = f - d,
    D = Gt(Math.sqrt(h / g)),
    V = Math.abs(P) < 5
  ;(l || (l = V ? Me.restSpeed.granular : Me.restSpeed.default),
    a || (a = V ? Me.restDelta.granular : Me.restDelta.default))
  let F
  if (A < 1) {
    const H = mu(D, A)
    F = (q) => {
      const re = Math.exp(-A * D * q)
      return f - re * (((C + A * D * P) / H) * Math.sin(H * q) + P * Math.cos(H * q))
    }
  } else if (A === 1) F = (H) => f - Math.exp(-D * H) * (P + (C + D * P) * H)
  else {
    const H = D * Math.sqrt(A * A - 1)
    F = (q) => {
      const re = Math.exp(-A * D * q),
        Q = Math.min(H * q, 300)
      return f - (re * ((C + A * D * P) * Math.sinh(Q) + H * P * Math.cosh(Q))) / H
    }
  }
  const z = {
    calculatedDuration: (S && k) || null,
    next: (H) => {
      const q = F(H)
      if (S) y.done = H >= k
      else {
        let re = 0
        A < 1 && (re = H === 0 ? Qt(C) : nm(F, H, q))
        const Q = Math.abs(re) <= l,
          me = Math.abs(f - q) <= a
        y.done = Q && me
      }
      return ((y.value = y.done ? f : q), y)
    },
    toString: () => {
      const H = Math.min(x1(z), lu),
        q = w1((re) => z.next(H * re).value, H, 30)
      return H + 'ms ' + q
    },
  }
  return z
}
function zh({
  keyframes: t,
  velocity: r = 0,
  power: o = 0.8,
  timeConstant: l = 325,
  bounceDamping: a = 10,
  bounceStiffness: d = 500,
  modifyTarget: f,
  min: y,
  max: h,
  restDelta: p = 0.5,
  restSpeed: g,
}) {
  const k = t[0],
    E = { done: !1, value: k },
    S = (Q) => (y !== void 0 && Q < y) || (h !== void 0 && Q > h),
    C = (Q) => (y === void 0 ? h : h === void 0 || Math.abs(y - Q) < Math.abs(h - Q) ? y : h)
  let A = o * r
  const P = k + A,
    D = f === void 0 ? P : f(P)
  D !== P && (A = D - k)
  const V = (Q) => -A * Math.exp(-Q / l),
    F = (Q) => D + V(Q),
    z = (Q) => {
      const me = V(Q),
        de = F(Q)
      ;((E.done = Math.abs(me) <= p), (E.value = E.done ? D : de))
    }
  let H, q
  const re = (Q) => {
    S(E.value) &&
      ((H = Q),
      (q = rm({
        keyframes: [E.value, C(E.value)],
        velocity: nm(F, Q, E.value),
        damping: a,
        stiffness: d,
        restDelta: p,
        restSpeed: g,
      })))
  }
  return (
    re(0),
    {
      calculatedDuration: null,
      next: (Q) => {
        let me = !1
        return (
          !q && H === void 0 && ((me = !0), z(Q), re(Q)),
          H !== void 0 && Q >= H ? q.next(Q - H) : (!me && z(Q), E)
        )
      },
    }
  )
}
const Xv = qi(0.42, 0, 1, 1),
  qv = qi(0, 0, 0.58, 1),
  im = qi(0.42, 0, 0.58, 1),
  Jv = (t) => Array.isArray(t) && typeof t[0] != 'number',
  e8 = {
    linear: pt,
    easeIn: Xv,
    easeInOut: im,
    easeOut: qv,
    circIn: Xu,
    circInOut: O1,
    circOut: W1,
    backIn: Gu,
    backInOut: V1,
    backOut: D1,
    anticipate: N1,
  },
  Uh = (t) => {
    if (Ku(t)) {
      t1(t.length === 4)
      const [r, o, l, a] = t
      return qi(r, o, l, a)
    } else if (typeof t == 'string') return e8[t]
    return t
  }
function t8(t, r, o) {
  const l = [],
    a = o || tm,
    d = t.length - 1
  for (let f = 0; f < d; f++) {
    let y = a(t[f], t[f + 1])
    if (r) {
      const h = Array.isArray(r) ? r[f] || pt : r
      y = Ji(h, y)
    }
    l.push(y)
  }
  return l
}
function n8(t, r, { clamp: o = !0, ease: l, mixer: a } = {}) {
  const d = t.length
  if ((t1(d === r.length), d === 1)) return () => r[0]
  if (d === 2 && r[0] === r[1]) return () => r[1]
  const f = t[0] === t[1]
  t[0] > t[d - 1] && ((t = [...t].reverse()), (r = [...r].reverse()))
  const y = t8(r, l, a),
    h = y.length,
    p = (g) => {
      if (f && g < t[0]) return r[0]
      let k = 0
      if (h > 1) for (; k < t.length - 2 && !(g < t[k + 1]); k++);
      const E = zr(t[k], t[k + 1], g)
      return y[k](E)
    }
  return o ? (g) => p(Xt(t[0], t[d - 1], g)) : p
}
function r8(t, r) {
  const o = t[t.length - 1]
  for (let l = 1; l <= r; l++) {
    const a = zr(0, r, l)
    t.push(Pe(o, 1, a))
  }
}
function i8(t) {
  const r = [0]
  return (r8(r, t.length - 1), r)
}
function o8(t, r) {
  return t.map((o) => o * r)
}
function s8(t, r) {
  return t.map(() => r || im).splice(0, t.length - 1)
}
function As({ duration: t = 300, keyframes: r, times: o, ease: l = 'easeInOut' }) {
  const a = Jv(l) ? l.map(Uh) : Uh(l),
    d = { done: !1, value: r[0] },
    f = o8(o && o.length === r.length ? o : i8(r), t),
    y = n8(f, r, { ease: Array.isArray(a) ? a : s8(r, a) })
  return { calculatedDuration: t, next: (h) => ((d.value = y(h)), (d.done = h >= t), d) }
}
const l8 = (t) => {
    const r = ({ timestamp: o }) => t(o)
    return {
      start: () => Ee.update(r, !0),
      stop: () => Sn(r),
      now: () => (Ue.isProcessing ? Ue.timestamp : It.now()),
    }
  },
  a8 = { decay: zh, inertia: zh, tween: As, keyframes: As, spring: rm },
  u8 = (t) => t / 100
class rc extends J1 {
  constructor(r) {
    ;(super(r),
      (this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = 'running'),
      (this.startTime = null),
      (this.state = 'idle'),
      (this.stop = () => {
        if ((this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')) return
        this.teardown()
        const { onStop: h } = this.options
        h && h()
      }))
    const { name: o, motionValue: l, element: a, keyframes: d } = this.options,
      f = a?.KeyframeResolver || tc,
      y = (h, p) => this.onKeyframesResolved(h, p)
    ;((this.resolver = new f(d, y, o, l, a)), this.resolver.scheduleResolve())
  }
  flatten() {
    ;(super.flatten(),
      this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes)))
  }
  initPlayback(r) {
    const {
        type: o = 'keyframes',
        repeat: l = 0,
        repeatDelay: a = 0,
        repeatType: d,
        velocity: f = 0,
      } = this.options,
      y = $u(o) ? o : a8[o] || As
    let h, p
    y !== As && typeof r[0] != 'number' && ((h = Ji(u8, tm(r[0], r[1]))), (r = [0, 100]))
    const g = y({ ...this.options, keyframes: r })
    ;(d === 'mirror' && (p = y({ ...this.options, keyframes: [...r].reverse(), velocity: -f })),
      g.calculatedDuration === null && (g.calculatedDuration = x1(g)))
    const { calculatedDuration: k } = g,
      E = k + a,
      S = E * (l + 1) - a
    return {
      generator: g,
      mirroredGenerator: p,
      mapPercentToKeyframes: h,
      calculatedDuration: k,
      resolvedDuration: E,
      totalDuration: S,
    }
  }
  onPostResolved() {
    const { autoplay: r = !0 } = this.options
    ;(this.play(),
      this.pendingPlayState === 'paused' || !r
        ? this.pause()
        : (this.state = this.pendingPlayState))
  }
  tick(r, o = !1) {
    const { resolved: l } = this
    if (!l) {
      const { keyframes: Q } = this.options
      return { done: !0, value: Q[Q.length - 1] }
    }
    const {
      finalKeyframe: a,
      generator: d,
      mirroredGenerator: f,
      mapPercentToKeyframes: y,
      keyframes: h,
      calculatedDuration: p,
      totalDuration: g,
      resolvedDuration: k,
    } = l
    if (this.startTime === null) return d.next(0)
    const { delay: E, repeat: S, repeatType: C, repeatDelay: A, onUpdate: P } = this.options
    ;(this.speed > 0
      ? (this.startTime = Math.min(this.startTime, r))
      : this.speed < 0 && (this.startTime = Math.min(r - g / this.speed, this.startTime)),
      o
        ? (this.currentTime = r)
        : this.holdTime !== null
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(r - this.startTime) * this.speed))
    const D = this.currentTime - E * (this.speed >= 0 ? 1 : -1),
      V = this.speed >= 0 ? D < 0 : D > g
    ;((this.currentTime = Math.max(D, 0)),
      this.state === 'finished' && this.holdTime === null && (this.currentTime = g))
    let F = this.currentTime,
      z = d
    if (S) {
      const Q = Math.min(this.currentTime, g) / k
      let me = Math.floor(Q),
        de = Q % 1
      ;(!de && Q >= 1 && (de = 1),
        de === 1 && me--,
        (me = Math.min(me, S + 1)),
        me % 2 &&
          (C === 'reverse' ? ((de = 1 - de), A && (de -= A / k)) : C === 'mirror' && (z = f)),
        (F = Xt(0, 1, de) * k))
    }
    const H = V ? { done: !1, value: h[0] } : z.next(F)
    y && (H.value = y(H.value))
    let { done: q } = H
    !V && p !== null && (q = this.speed >= 0 ? this.currentTime >= g : this.currentTime <= 0)
    const re =
      this.holdTime === null && (this.state === 'finished' || (this.state === 'running' && q))
    return (
      re && a !== void 0 && (H.value = zs(h, this.options, a)),
      P && P(H.value),
      re && this.finish(),
      H
    )
  }
  get duration() {
    const { resolved: r } = this
    return r ? Gt(r.calculatedDuration) : 0
  }
  get time() {
    return Gt(this.currentTime)
  }
  set time(r) {
    ;((r = Qt(r)),
      (this.currentTime = r),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = r)
        : this.driver && (this.startTime = this.driver.now() - r / this.speed))
  }
  get speed() {
    return this.playbackSpeed
  }
  set speed(r) {
    const o = this.playbackSpeed !== r
    ;((this.playbackSpeed = r), o && (this.time = Gt(this.currentTime)))
  }
  play() {
    if ((this.resolver.isScheduled || this.resolver.resume(), !this._resolved)) {
      this.pendingPlayState = 'running'
      return
    }
    if (this.isStopped) return
    const { driver: r = l8, onPlay: o, startTime: l } = this.options
    ;(this.driver || (this.driver = r((d) => this.tick(d))), o && o())
    const a = this.driver.now()
    ;(this.holdTime !== null
      ? (this.startTime = a - this.holdTime)
      : this.startTime
        ? this.state === 'finished' && (this.startTime = a)
        : (this.startTime = l ?? this.calcStartTime()),
      this.state === 'finished' && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = 'running'),
      this.driver.start())
  }
  pause() {
    var r
    if (!this._resolved) {
      this.pendingPlayState = 'paused'
      return
    }
    ;((this.state = 'paused'),
      (this.holdTime = (r = this.currentTime) !== null && r !== void 0 ? r : 0))
  }
  complete() {
    ;(this.state !== 'running' && this.play(),
      (this.pendingPlayState = this.state = 'finished'),
      (this.holdTime = null))
  }
  finish() {
    ;(this.teardown(), (this.state = 'finished'))
    const { onComplete: r } = this.options
    r && r()
  }
  cancel() {
    ;(this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise())
  }
  teardown() {
    ;((this.state = 'idle'),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel())
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0))
  }
  sample(r) {
    return ((this.startTime = 0), this.tick(r, !0))
  }
}
const c8 = new Set(['opacity', 'clipPath', 'filter', 'transform'])
function f8(
  t,
  r,
  o,
  {
    delay: l = 0,
    duration: a = 300,
    repeat: d = 0,
    repeatType: f = 'loop',
    ease: y = 'easeInOut',
    times: h,
  } = {}
) {
  const p = { [r]: o }
  h && (p.offset = h)
  const g = S1(y, a)
  return (
    Array.isArray(g) && (p.easing = g),
    t.animate(p, {
      delay: l,
      duration: a,
      easing: Array.isArray(g) ? 'linear' : g,
      fill: 'both',
      iterations: d + 1,
      direction: f === 'reverse' ? 'alternate' : 'normal',
    })
  )
}
const d8 = Au(() => Object.hasOwnProperty.call(Element.prototype, 'animate')),
  Rs = 10,
  h8 = 2e4
function p8(t) {
  return $u(t.type) || t.type === 'spring' || !L1(t.ease)
}
function m8(t, r) {
  const o = new rc({ ...r, keyframes: t, repeat: 0, delay: 0, isGenerator: !0 })
  let l = { done: !1, value: t[0] }
  const a = []
  let d = 0
  for (; !l.done && d < h8; ) ((l = o.sample(d)), a.push(l.value), (d += Rs))
  return { times: void 0, keyframes: a, duration: d - Rs, ease: 'linear' }
}
const om = { anticipate: N1, backInOut: V1, circInOut: O1 }
function g8(t) {
  return t in om
}
class Hh extends J1 {
  constructor(r) {
    super(r)
    const { name: o, motionValue: l, element: a, keyframes: d } = this.options
    ;((this.resolver = new q1(d, (f, y) => this.onKeyframesResolved(f, y), o, l, a)),
      this.resolver.scheduleResolve())
  }
  initPlayback(r, o) {
    let {
      duration: l = 300,
      times: a,
      ease: d,
      type: f,
      motionValue: y,
      name: h,
      startTime: p,
    } = this.options
    if (!y.owner || !y.owner.current) return !1
    if ((typeof d == 'string' && Ts() && g8(d) && (d = om[d]), p8(this.options))) {
      const { onComplete: k, onUpdate: E, motionValue: S, element: C, ...A } = this.options,
        P = m8(r, A)
      ;((r = P.keyframes),
        r.length === 1 && (r[1] = r[0]),
        (l = P.duration),
        (a = P.times),
        (d = P.ease),
        (f = 'keyframes'))
    }
    const g = f8(y.owner.current, h, r, { ...this.options, duration: l, times: a, ease: d })
    return (
      (g.startTime = p ?? this.calcStartTime()),
      this.pendingTimeline
        ? (Th(g, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (g.onfinish = () => {
            const { onComplete: k } = this.options
            ;(y.set(zs(r, this.options, o)), k && k(), this.cancel(), this.resolveFinishedPromise())
          }),
      { animation: g, duration: l, times: a, type: f, ease: d, keyframes: r }
    )
  }
  get duration() {
    const { resolved: r } = this
    if (!r) return 0
    const { duration: o } = r
    return Gt(o)
  }
  get time() {
    const { resolved: r } = this
    if (!r) return 0
    const { animation: o } = r
    return Gt(o.currentTime || 0)
  }
  set time(r) {
    const { resolved: o } = this
    if (!o) return
    const { animation: l } = o
    l.currentTime = Qt(r)
  }
  get speed() {
    const { resolved: r } = this
    if (!r) return 1
    const { animation: o } = r
    return o.playbackRate
  }
  set speed(r) {
    const { resolved: o } = this
    if (!o) return
    const { animation: l } = o
    l.playbackRate = r
  }
  get state() {
    const { resolved: r } = this
    if (!r) return 'idle'
    const { animation: o } = r
    return o.playState
  }
  get startTime() {
    const { resolved: r } = this
    if (!r) return null
    const { animation: o } = r
    return o.startTime
  }
  attachTimeline(r) {
    if (!this._resolved) this.pendingTimeline = r
    else {
      const { resolved: o } = this
      if (!o) return pt
      const { animation: l } = o
      Th(l, r)
    }
    return pt
  }
  play() {
    if (this.isStopped) return
    const { resolved: r } = this
    if (!r) return
    const { animation: o } = r
    ;(o.playState === 'finished' && this.updateFinishedPromise(), o.play())
  }
  pause() {
    const { resolved: r } = this
    if (!r) return
    const { animation: o } = r
    o.pause()
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')) return
    ;(this.resolveFinishedPromise(), this.updateFinishedPromise())
    const { resolved: r } = this
    if (!r) return
    const { animation: o, keyframes: l, duration: a, type: d, ease: f, times: y } = r
    if (o.playState === 'idle' || o.playState === 'finished') return
    if (this.time) {
      const { motionValue: p, onUpdate: g, onComplete: k, element: E, ...S } = this.options,
        C = new rc({
          ...S,
          keyframes: l,
          duration: a,
          type: d,
          ease: f,
          times: y,
          isGenerator: !0,
        }),
        A = Qt(this.time)
      p.setWithVelocity(C.sample(A - Rs).value, C.sample(A).value, Rs)
    }
    const { onStop: h } = this.options
    ;(h && h(), this.cancel())
  }
  complete() {
    const { resolved: r } = this
    r && r.animation.finish()
  }
  cancel() {
    const { resolved: r } = this
    r && r.animation.cancel()
  }
  static supports(r) {
    const { motionValue: o, name: l, repeatDelay: a, repeatType: d, damping: f, type: y } = r
    if (!o || !o.owner || !(o.owner.current instanceof HTMLElement)) return !1
    const { onUpdate: h, transformTemplate: p } = o.owner.getProps()
    return d8() && l && c8.has(l) && !h && !p && !a && d !== 'mirror' && f !== 0 && y !== 'inertia'
  }
}
const y8 = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  v8 = (t) => ({
    type: 'spring',
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  k8 = { type: 'keyframes', duration: 0.8 },
  E8 = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  x8 = (t, { keyframes: r }) =>
    r.length > 2 ? k8 : bn.has(t) ? (t.startsWith('scale') ? v8(r[1]) : y8) : E8
function w8({
  when: t,
  delay: r,
  delayChildren: o,
  staggerChildren: l,
  staggerDirection: a,
  repeat: d,
  repeatType: f,
  repeatDelay: y,
  from: h,
  elapsed: p,
  ...g
}) {
  return !!Object.keys(g).length
}
const ic =
  (t, r, o, l = {}, a, d) =>
  (f) => {
    const y = Hu(l, t) || {},
      h = y.delay || l.delay || 0
    let { elapsed: p = 0 } = l
    p = p - Qt(h)
    let g = {
      keyframes: Array.isArray(o) ? o : [null, o],
      ease: 'easeOut',
      velocity: r.getVelocity(),
      ...y,
      delay: -p,
      onUpdate: (E) => {
        ;(r.set(E), y.onUpdate && y.onUpdate(E))
      },
      onComplete: () => {
        ;(f(), y.onComplete && y.onComplete())
      },
      name: t,
      motionValue: r,
      element: d ? void 0 : a,
    }
    ;(w8(y) || (g = { ...g, ...x8(t, g) }),
      g.duration && (g.duration = Qt(g.duration)),
      g.repeatDelay && (g.repeatDelay = Qt(g.repeatDelay)),
      g.from !== void 0 && (g.keyframes[0] = g.from))
    let k = !1
    if (
      ((g.type === !1 || (g.duration === 0 && !g.repeatDelay)) &&
        ((g.duration = 0), g.delay === 0 && (k = !0)),
      k && !d && r.get() !== void 0)
    ) {
      const E = zs(g.keyframes, y)
      if (E !== void 0)
        return (
          Ee.update(() => {
            ;(g.onUpdate(E), g.onComplete())
          }),
          new z2([])
        )
    }
    return !d && Hh.supports(g) ? new Hh(g) : new rc(g)
  }
function L8({ protectedKeys: t, needsAnimating: r }, o) {
  const l = t.hasOwnProperty(o) && r[o] !== !0
  return ((r[o] = !1), l)
}
function sm(t, r, { delay: o = 0, transitionOverride: l, type: a } = {}) {
  var d
  let { transition: f = t.getDefaultTransition(), transitionEnd: y, ...h } = r
  l && (f = l)
  const p = [],
    g = a && t.animationState && t.animationState.getState()[a]
  for (const k in h) {
    const E = t.getValue(k, (d = t.latestValues[k]) !== null && d !== void 0 ? d : null),
      S = h[k]
    if (S === void 0 || (g && L8(g, k))) continue
    const C = { delay: o, ...Hu(f || {}, k) }
    let A = !1
    if (window.MotionHandoffAnimation) {
      const D = R1(t)
      if (D) {
        const V = window.MotionHandoffAnimation(D, k, Ee)
        V !== null && ((C.startTime = V), (A = !0))
      }
    }
    ;(uu(t, k), E.start(ic(k, E, S, t.shouldReduceMotion && M1.has(k) ? { type: !1 } : C, t, A)))
    const P = E.animation
    P && p.push(P)
  }
  return (
    y &&
      Promise.all(p).then(() => {
        Ee.update(() => {
          y && tv(t, y)
        })
      }),
    p
  )
}
function gu(t, r, o = {}) {
  var l
  const a = Bs(
    t,
    r,
    o.type === 'exit'
      ? (l = t.presenceContext) === null || l === void 0
        ? void 0
        : l.custom
      : void 0
  )
  let { transition: d = t.getDefaultTransition() || {} } = a || {}
  o.transitionOverride && (d = o.transitionOverride)
  const f = a ? () => Promise.all(sm(t, a, o)) : () => Promise.resolve(),
    y =
      t.variantChildren && t.variantChildren.size
        ? (p = 0) => {
            const { delayChildren: g = 0, staggerChildren: k, staggerDirection: E } = d
            return S8(t, r, g + p, k, E, o)
          }
        : () => Promise.resolve(),
    { when: h } = d
  if (h) {
    const [p, g] = h === 'beforeChildren' ? [f, y] : [y, f]
    return p().then(() => g())
  } else return Promise.all([f(), y(o.delay)])
}
function S8(t, r, o = 0, l = 0, a = 1, d) {
  const f = [],
    y = (t.variantChildren.size - 1) * l,
    h = a === 1 ? (p = 0) => p * l : (p = 0) => y - p * l
  return (
    Array.from(t.variantChildren)
      .sort(P8)
      .forEach((p, g) => {
        ;(p.notify('AnimationStart', r),
          f.push(gu(p, r, { ...d, delay: o + h(g) }).then(() => p.notify('AnimationComplete', r))))
      }),
    Promise.all(f)
  )
}
function P8(t, r) {
  return t.sortNodePosition(r)
}
function C8(t, r, o = {}) {
  t.notify('AnimationStart', r)
  let l
  if (Array.isArray(r)) {
    const a = r.map((d) => gu(t, d, o))
    l = Promise.all(a)
  } else if (typeof r == 'string') l = gu(t, r, o)
  else {
    const a = typeof r == 'function' ? Bs(t, r, o.custom) : r
    l = Promise.all(sm(t, a, o))
  }
  return l.then(() => {
    t.notify('AnimationComplete', r)
  })
}
const T8 = ju.length
function lm(t) {
  if (!t) return
  if (!t.isControllingVariants) {
    const o = t.parent ? lm(t.parent) || {} : {}
    return (t.props.initial !== void 0 && (o.initial = t.props.initial), o)
  }
  const r = {}
  for (let o = 0; o < T8; o++) {
    const l = ju[o],
      a = t.props[l]
    ;(Zi(a) || a === !1) && (r[l] = a)
  }
  return r
}
const M8 = [...Ru].reverse(),
  A8 = Ru.length
function R8(t) {
  return (r) => Promise.all(r.map(({ animation: o, options: l }) => C8(t, o, l)))
}
function j8(t) {
  let r = R8(t),
    o = $h(),
    l = !0
  const a = (h) => (p, g) => {
    var k
    const E = Bs(
      t,
      g,
      h === 'exit' ? ((k = t.presenceContext) === null || k === void 0 ? void 0 : k.custom) : void 0
    )
    if (E) {
      const { transition: S, transitionEnd: C, ...A } = E
      p = { ...p, ...A, ...C }
    }
    return p
  }
  function d(h) {
    r = h(t)
  }
  function f(h) {
    const { props: p } = t,
      g = lm(t.parent) || {},
      k = [],
      E = new Set()
    let S = {},
      C = 1 / 0
    for (let P = 0; P < A8; P++) {
      const D = M8[P],
        V = o[D],
        F = p[D] !== void 0 ? p[D] : g[D],
        z = Zi(F),
        H = D === h ? V.isActive : null
      H === !1 && (C = P)
      let q = F === g[D] && F !== p[D] && z
      if (
        (q && l && t.manuallyAnimateOnMount && (q = !1),
        (V.protectedKeys = { ...S }),
        (!V.isActive && H === null) || (!F && !V.prevProp) || Os(F) || typeof F == 'boolean')
      )
        continue
      const re = _8(V.prevProp, F)
      let Q = re || (D === h && V.isActive && !q && z) || (P > C && z),
        me = !1
      const de = Array.isArray(F) ? F : [F]
      let Fe = de.reduce(a(D), {})
      H === !1 && (Fe = {})
      const { prevResolvedValues: Ge = {} } = V,
        Ie = { ...Ge, ...Fe },
        He = (oe) => {
          ;((Q = !0), E.has(oe) && ((me = !0), E.delete(oe)), (V.needsAnimating[oe] = !0))
          const U = t.getValue(oe)
          U && (U.liveStyle = !1)
        }
      for (const oe in Ie) {
        const U = Fe[oe],
          X = Ge[oe]
        if (S.hasOwnProperty(oe)) continue
        let K = !1
        ;(su(U) && su(X) ? (K = !E1(U, X)) : (K = U !== X),
          K
            ? U != null
              ? He(oe)
              : E.add(oe)
            : U !== void 0 && E.has(oe)
              ? He(oe)
              : (V.protectedKeys[oe] = !0))
      }
      ;((V.prevProp = F),
        (V.prevResolvedValues = Fe),
        V.isActive && (S = { ...S, ...Fe }),
        l && t.blockInitialAnimation && (Q = !1),
        Q &&
          (!(q && re) || me) &&
          k.push(...de.map((oe) => ({ animation: oe, options: { type: D } }))))
    }
    if (E.size) {
      const P = {}
      ;(E.forEach((D) => {
        const V = t.getBaseTarget(D),
          F = t.getValue(D)
        ;(F && (F.liveStyle = !0), (P[D] = V ?? null))
      }),
        k.push({ animation: P }))
    }
    let A = !!k.length
    return (
      l && (p.initial === !1 || p.initial === p.animate) && !t.manuallyAnimateOnMount && (A = !1),
      (l = !1),
      A ? r(k) : Promise.resolve()
    )
  }
  function y(h, p) {
    var g
    if (o[h].isActive === p) return Promise.resolve()
    ;((g = t.variantChildren) === null ||
      g === void 0 ||
      g.forEach((E) => {
        var S
        return (S = E.animationState) === null || S === void 0 ? void 0 : S.setActive(h, p)
      }),
      (o[h].isActive = p))
    const k = f(h)
    for (const E in o) o[E].protectedKeys = {}
    return k
  }
  return {
    animateChanges: f,
    setActive: y,
    setAnimateFunction: d,
    getState: () => o,
    reset: () => {
      ;((o = $h()), (l = !0))
    },
  }
}
function _8(t, r) {
  return typeof r == 'string' ? r !== t : Array.isArray(r) ? !E1(r, t) : !1
}
function zn(t = !1) {
  return { isActive: t, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} }
}
function $h() {
  return {
    animate: zn(!0),
    whileInView: zn(),
    whileHover: zn(),
    whileTap: zn(),
    whileDrag: zn(),
    whileFocus: zn(),
    exit: zn(),
  }
}
class Tn {
  constructor(r) {
    ;((this.isMounted = !1), (this.node = r))
  }
  update() {}
}
class F8 extends Tn {
  constructor(r) {
    ;(super(r), r.animationState || (r.animationState = j8(r)))
  }
  updateAnimationControlsSubscription() {
    const { animate: r } = this.node.getProps()
    Os(r) && (this.unmountControls = r.subscribe(this.node))
  }
  mount() {
    this.updateAnimationControlsSubscription()
  }
  update() {
    const { animate: r } = this.node.getProps(),
      { animate: o } = this.node.prevProps || {}
    r !== o && this.updateAnimationControlsSubscription()
  }
  unmount() {
    var r
    ;(this.node.animationState.reset(),
      (r = this.unmountControls) === null || r === void 0 || r.call(this))
  }
}
let D8 = 0
class V8 extends Tn {
  constructor() {
    ;(super(...arguments), (this.id = D8++))
  }
  update() {
    if (!this.node.presenceContext) return
    const { isPresent: r, onExitComplete: o } = this.node.presenceContext,
      { isPresent: l } = this.node.prevPresenceContext || {}
    if (!this.node.animationState || r === l) return
    const a = this.node.animationState.setActive('exit', !r)
    o && !r && a.then(() => o(this.id))
  }
  mount() {
    const { register: r } = this.node.presenceContext || {}
    r && (this.unmount = r(this.id))
  }
  unmount() {}
}
const N8 = { animation: { Feature: F8 }, exit: { Feature: V8 } }
function Gi(t, r, o, l = { passive: !0 }) {
  return (t.addEventListener(r, o, l), () => t.removeEventListener(r, o))
}
function eo(t) {
  return { point: { x: t.pageX, y: t.pageY } }
}
const W8 = (t) => (r) => Zu(r) && t(r, eo(r))
function zi(t, r, o, l) {
  return Gi(t, r, W8(o), l)
}
const Kh = (t, r) => Math.abs(t - r)
function O8(t, r) {
  const o = Kh(t.x, r.x),
    l = Kh(t.y, r.y)
  return Math.sqrt(o ** 2 + l ** 2)
}
class am {
  constructor(r, o, { transformPagePoint: l, contextWindow: a, dragSnapToOrigin: d = !1 } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return
        const k = ba(this.lastMoveEventInfo, this.history),
          E = this.startEvent !== null,
          S = O8(k.offset, { x: 0, y: 0 }) >= 3
        if (!E && !S) return
        const { point: C } = k,
          { timestamp: A } = Ue
        this.history.push({ ...C, timestamp: A })
        const { onStart: P, onMove: D } = this.handlers
        ;(E || (P && P(this.lastMoveEvent, k), (this.startEvent = this.lastMoveEvent)),
          D && D(this.lastMoveEvent, k))
      }),
      (this.handlePointerMove = (k, E) => {
        ;((this.lastMoveEvent = k),
          (this.lastMoveEventInfo = Ya(E, this.transformPagePoint)),
          Ee.update(this.updatePoint, !0))
      }),
      (this.handlePointerUp = (k, E) => {
        this.end()
        const { onEnd: S, onSessionEnd: C, resumeAnimation: A } = this.handlers
        if ((this.dragSnapToOrigin && A && A(), !(this.lastMoveEvent && this.lastMoveEventInfo)))
          return
        const P = ba(
          k.type === 'pointercancel' ? this.lastMoveEventInfo : Ya(E, this.transformPagePoint),
          this.history
        )
        ;(this.startEvent && S && S(k, P), C && C(k, P))
      }),
      !Zu(r))
    )
      return
    ;((this.dragSnapToOrigin = d),
      (this.handlers = o),
      (this.transformPagePoint = l),
      (this.contextWindow = a || window))
    const f = eo(r),
      y = Ya(f, this.transformPagePoint),
      { point: h } = y,
      { timestamp: p } = Ue
    this.history = [{ ...h, timestamp: p }]
    const { onSessionStart: g } = o
    ;(g && g(r, ba(y, this.history)),
      (this.removeListeners = Ji(
        zi(this.contextWindow, 'pointermove', this.handlePointerMove),
        zi(this.contextWindow, 'pointerup', this.handlePointerUp),
        zi(this.contextWindow, 'pointercancel', this.handlePointerUp)
      )))
  }
  updateHandlers(r) {
    this.handlers = r
  }
  end() {
    ;(this.removeListeners && this.removeListeners(), Sn(this.updatePoint))
  }
}
function Ya(t, r) {
  return r ? { point: r(t.point) } : t
}
function Zh(t, r) {
  return { x: t.x - r.x, y: t.y - r.y }
}
function ba({ point: t }, r) {
  return { point: t, delta: Zh(t, um(r)), offset: Zh(t, I8(r)), velocity: B8(r, 0.1) }
}
function I8(t) {
  return t[0]
}
function um(t) {
  return t[t.length - 1]
}
function B8(t, r) {
  if (t.length < 2) return { x: 0, y: 0 }
  let o = t.length - 1,
    l = null
  const a = um(t)
  for (; o >= 0 && ((l = t[o]), !(a.timestamp - l.timestamp > Qt(r))); ) o--
  if (!l) return { x: 0, y: 0 }
  const d = Gt(a.timestamp - l.timestamp)
  if (d === 0) return { x: 0, y: 0 }
  const f = { x: (a.x - l.x) / d, y: (a.y - l.y) / d }
  return (f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f)
}
const cm = 1e-4,
  z8 = 1 - cm,
  U8 = 1 + cm,
  fm = 0.01,
  H8 = 0 - fm,
  $8 = 0 + fm
function mt(t) {
  return t.max - t.min
}
function K8(t, r, o) {
  return Math.abs(t - r) <= o
}
function Yh(t, r, o, l = 0.5) {
  ;((t.origin = l),
    (t.originPoint = Pe(r.min, r.max, t.origin)),
    (t.scale = mt(o) / mt(r)),
    (t.translate = Pe(o.min, o.max, t.origin) - t.originPoint),
    ((t.scale >= z8 && t.scale <= U8) || isNaN(t.scale)) && (t.scale = 1),
    ((t.translate >= H8 && t.translate <= $8) || isNaN(t.translate)) && (t.translate = 0))
}
function Ui(t, r, o, l) {
  ;(Yh(t.x, r.x, o.x, l ? l.originX : void 0), Yh(t.y, r.y, o.y, l ? l.originY : void 0))
}
function bh(t, r, o) {
  ;((t.min = o.min + r.min), (t.max = t.min + mt(r)))
}
function Z8(t, r, o) {
  ;(bh(t.x, r.x, o.x), bh(t.y, r.y, o.y))
}
function Qh(t, r, o) {
  ;((t.min = r.min - o.min), (t.max = t.min + mt(r)))
}
function Hi(t, r, o) {
  ;(Qh(t.x, r.x, o.x), Qh(t.y, r.y, o.y))
}
function Y8(t, { min: r, max: o }, l) {
  return (
    r !== void 0 && t < r
      ? (t = l ? Pe(r, t, l.min) : Math.max(t, r))
      : o !== void 0 && t > o && (t = l ? Pe(o, t, l.max) : Math.min(t, o)),
    t
  )
}
function Gh(t, r, o) {
  return {
    min: r !== void 0 ? t.min + r : void 0,
    max: o !== void 0 ? t.max + o - (t.max - t.min) : void 0,
  }
}
function b8(t, { top: r, left: o, bottom: l, right: a }) {
  return { x: Gh(t.x, o, a), y: Gh(t.y, r, l) }
}
function Xh(t, r) {
  let o = r.min - t.min,
    l = r.max - t.max
  return (r.max - r.min < t.max - t.min && ([o, l] = [l, o]), { min: o, max: l })
}
function Q8(t, r) {
  return { x: Xh(t.x, r.x), y: Xh(t.y, r.y) }
}
function G8(t, r) {
  let o = 0.5
  const l = mt(t),
    a = mt(r)
  return (
    a > l ? (o = zr(r.min, r.max - l, t.min)) : l > a && (o = zr(t.min, t.max - a, r.min)),
    Xt(0, 1, o)
  )
}
function X8(t, r) {
  const o = {}
  return (
    r.min !== void 0 && (o.min = r.min - t.min),
    r.max !== void 0 && (o.max = r.max - t.min),
    o
  )
}
const yu = 0.35
function q8(t = yu) {
  return (
    t === !1 ? (t = 0) : t === !0 && (t = yu),
    { x: qh(t, 'left', 'right'), y: qh(t, 'top', 'bottom') }
  )
}
function qh(t, r, o) {
  return { min: Jh(t, r), max: Jh(t, o) }
}
function Jh(t, r) {
  return typeof t == 'number' ? t : t[r] || 0
}
const ep = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Wr = () => ({ x: ep(), y: ep() }),
  tp = () => ({ min: 0, max: 0 }),
  je = () => ({ x: tp(), y: tp() })
function St(t) {
  return [t('x'), t('y')]
}
function dm({ top: t, left: r, right: o, bottom: l }) {
  return { x: { min: r, max: o }, y: { min: t, max: l } }
}
function J8({ x: t, y: r }) {
  return { top: r.min, right: t.max, bottom: r.max, left: t.min }
}
function ek(t, r) {
  if (!r) return t
  const o = r({ x: t.left, y: t.top }),
    l = r({ x: t.right, y: t.bottom })
  return { top: o.y, left: o.x, bottom: l.y, right: l.x }
}
function Qa(t) {
  return t === void 0 || t === 1
}
function vu({ scale: t, scaleX: r, scaleY: o }) {
  return !Qa(t) || !Qa(r) || !Qa(o)
}
function Un(t) {
  return vu(t) || hm(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY
}
function hm(t) {
  return np(t.x) || np(t.y)
}
function np(t) {
  return t && t !== '0%'
}
function js(t, r, o) {
  const l = t - o,
    a = r * l
  return o + a
}
function rp(t, r, o, l, a) {
  return (a !== void 0 && (t = js(t, a, l)), js(t, o, l) + r)
}
function ku(t, r = 0, o = 1, l, a) {
  ;((t.min = rp(t.min, r, o, l, a)), (t.max = rp(t.max, r, o, l, a)))
}
function pm(t, { x: r, y: o }) {
  ;(ku(t.x, r.translate, r.scale, r.originPoint), ku(t.y, o.translate, o.scale, o.originPoint))
}
const ip = 0.999999999999,
  op = 1.0000000000001
function tk(t, r, o, l = !1) {
  const a = o.length
  if (!a) return
  r.x = r.y = 1
  let d, f
  for (let y = 0; y < a; y++) {
    ;((d = o[y]), (f = d.projectionDelta))
    const { visualElement: h } = d.options
    ;(h && h.props.style && h.props.style.display === 'contents') ||
      (l &&
        d.options.layoutScroll &&
        d.scroll &&
        d !== d.root &&
        Ir(t, { x: -d.scroll.offset.x, y: -d.scroll.offset.y }),
      f && ((r.x *= f.x.scale), (r.y *= f.y.scale), pm(t, f)),
      l && Un(d.latestValues) && Ir(t, d.latestValues))
  }
  ;(r.x < op && r.x > ip && (r.x = 1), r.y < op && r.y > ip && (r.y = 1))
}
function Or(t, r) {
  ;((t.min = t.min + r), (t.max = t.max + r))
}
function sp(t, r, o, l, a = 0.5) {
  const d = Pe(t.min, t.max, a)
  ku(t, r, o, d, l)
}
function Ir(t, r) {
  ;(sp(t.x, r.x, r.scaleX, r.scale, r.originX), sp(t.y, r.y, r.scaleY, r.scale, r.originY))
}
function mm(t, r) {
  return dm(ek(t.getBoundingClientRect(), r))
}
function nk(t, r, o) {
  const l = mm(t, o),
    { scroll: a } = r
  return (a && (Or(l.x, a.offset.x), Or(l.y, a.offset.y)), l)
}
const gm = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
  rk = new WeakMap()
class ik {
  constructor(r) {
    ;((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = je()),
      (this.visualElement = r))
  }
  start(r, { snapToCursor: o = !1 } = {}) {
    const { presenceContext: l } = this.visualElement
    if (l && l.isPresent === !1) return
    const a = (g) => {
        const { dragSnapToOrigin: k } = this.getProps()
        ;(k ? this.pauseAnimation() : this.stopAnimation(), o && this.snapToCursor(eo(g).point))
      },
      d = (g, k) => {
        const { drag: E, dragPropagation: S, onDragStart: C } = this.getProps()
        if (
          E &&
          !S &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = G2(E)),
          !this.openDragLock)
        )
          return
        ;((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          St((P) => {
            let D = this.getAxisMotionValue(P).get() || 0
            if (Ot.test(D)) {
              const { projection: V } = this.visualElement
              if (V && V.layout) {
                const F = V.layout.layoutBox[P]
                F && (D = mt(F) * (parseFloat(D) / 100))
              }
            }
            this.originPoint[P] = D
          }),
          C && Ee.postRender(() => C(g, k)),
          uu(this.visualElement, 'transform'))
        const { animationState: A } = this.visualElement
        A && A.setActive('whileDrag', !0)
      },
      f = (g, k) => {
        const {
          dragPropagation: E,
          dragDirectionLock: S,
          onDirectionLock: C,
          onDrag: A,
        } = this.getProps()
        if (!E && !this.openDragLock) return
        const { offset: P } = k
        if (S && this.currentDirection === null) {
          ;((this.currentDirection = ok(P)),
            this.currentDirection !== null && C && C(this.currentDirection))
          return
        }
        ;(this.updateAxis('x', k.point, P),
          this.updateAxis('y', k.point, P),
          this.visualElement.render(),
          A && A(g, k))
      },
      y = (g, k) => this.stop(g, k),
      h = () =>
        St((g) => {
          var k
          return (
            this.getAnimationState(g) === 'paused' &&
            ((k = this.getAxisMotionValue(g).animation) === null || k === void 0
              ? void 0
              : k.play())
          )
        }),
      { dragSnapToOrigin: p } = this.getProps()
    this.panSession = new am(
      r,
      { onSessionStart: a, onStart: d, onMove: f, onSessionEnd: y, resumeAnimation: h },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: p,
        contextWindow: gm(this.visualElement),
      }
    )
  }
  stop(r, o) {
    const l = this.isDragging
    if ((this.cancel(), !l)) return
    const { velocity: a } = o
    this.startAnimation(a)
    const { onDragEnd: d } = this.getProps()
    d && Ee.postRender(() => d(r, o))
  }
  cancel() {
    this.isDragging = !1
    const { projection: r, animationState: o } = this.visualElement
    ;(r && (r.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0))
    const { dragPropagation: l } = this.getProps()
    ;(!l && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
      o && o.setActive('whileDrag', !1))
  }
  updateAxis(r, o, l) {
    const { drag: a } = this.getProps()
    if (!l || !gs(r, a, this.currentDirection)) return
    const d = this.getAxisMotionValue(r)
    let f = this.originPoint[r] + l[r]
    ;(this.constraints && this.constraints[r] && (f = Y8(f, this.constraints[r], this.elastic[r])),
      d.set(f))
  }
  resolveConstraints() {
    var r
    const { dragConstraints: o, dragElastic: l } = this.getProps(),
      a =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (r = this.visualElement.projection) === null || r === void 0
            ? void 0
            : r.layout,
      d = this.constraints
    ;(o && Vr(o)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : o && a
        ? (this.constraints = b8(a.layoutBox, o))
        : (this.constraints = !1),
      (this.elastic = q8(l)),
      d !== this.constraints &&
        a &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        St((f) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(f) &&
            (this.constraints[f] = X8(a.layoutBox[f], this.constraints[f]))
        }))
  }
  resolveRefConstraints() {
    const { dragConstraints: r, onMeasureDragConstraints: o } = this.getProps()
    if (!r || !Vr(r)) return !1
    const l = r.current,
      { projection: a } = this.visualElement
    if (!a || !a.layout) return !1
    const d = nk(l, a.root, this.visualElement.getTransformPagePoint())
    let f = Q8(a.layout.layoutBox, d)
    if (o) {
      const y = o(J8(f))
      ;((this.hasMutatedConstraints = !!y), y && (f = dm(y)))
    }
    return f
  }
  startAnimation(r) {
    const {
        drag: o,
        dragMomentum: l,
        dragElastic: a,
        dragTransition: d,
        dragSnapToOrigin: f,
        onDragTransitionEnd: y,
      } = this.getProps(),
      h = this.constraints || {},
      p = St((g) => {
        if (!gs(g, o, this.currentDirection)) return
        let k = (h && h[g]) || {}
        f && (k = { min: 0, max: 0 })
        const E = a ? 200 : 1e6,
          S = a ? 40 : 1e7,
          C = {
            type: 'inertia',
            velocity: l ? r[g] : 0,
            bounceStiffness: E,
            bounceDamping: S,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...d,
            ...k,
          }
        return this.startAxisValueAnimation(g, C)
      })
    return Promise.all(p).then(y)
  }
  startAxisValueAnimation(r, o) {
    const l = this.getAxisMotionValue(r)
    return (uu(this.visualElement, r), l.start(ic(r, l, 0, o, this.visualElement, !1)))
  }
  stopAnimation() {
    St((r) => this.getAxisMotionValue(r).stop())
  }
  pauseAnimation() {
    St((r) => {
      var o
      return (o = this.getAxisMotionValue(r).animation) === null || o === void 0
        ? void 0
        : o.pause()
    })
  }
  getAnimationState(r) {
    var o
    return (o = this.getAxisMotionValue(r).animation) === null || o === void 0 ? void 0 : o.state
  }
  getAxisMotionValue(r) {
    const o = `_drag${r.toUpperCase()}`,
      l = this.visualElement.getProps(),
      a = l[o]
    return a || this.visualElement.getValue(r, (l.initial ? l.initial[r] : void 0) || 0)
  }
  snapToCursor(r) {
    St((o) => {
      const { drag: l } = this.getProps()
      if (!gs(o, l, this.currentDirection)) return
      const { projection: a } = this.visualElement,
        d = this.getAxisMotionValue(o)
      if (a && a.layout) {
        const { min: f, max: y } = a.layout.layoutBox[o]
        d.set(r[o] - Pe(f, y, 0.5))
      }
    })
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return
    const { drag: r, dragConstraints: o } = this.getProps(),
      { projection: l } = this.visualElement
    if (!Vr(o) || !l || !this.constraints) return
    this.stopAnimation()
    const a = { x: 0, y: 0 }
    St((f) => {
      const y = this.getAxisMotionValue(f)
      if (y && this.constraints !== !1) {
        const h = y.get()
        a[f] = G8({ min: h, max: h }, this.constraints[f])
      }
    })
    const { transformTemplate: d } = this.visualElement.getProps()
    ;((this.visualElement.current.style.transform = d ? d({}, '') : 'none'),
      l.root && l.root.updateScroll(),
      l.updateLayout(),
      this.resolveConstraints(),
      St((f) => {
        if (!gs(f, r, null)) return
        const y = this.getAxisMotionValue(f),
          { min: h, max: p } = this.constraints[f]
        y.set(Pe(h, p, a[f]))
      }))
  }
  addListeners() {
    if (!this.visualElement.current) return
    rk.set(this.visualElement, this)
    const r = this.visualElement.current,
      o = zi(r, 'pointerdown', (h) => {
        const { drag: p, dragListener: g = !0 } = this.getProps()
        p && g && this.start(h)
      }),
      l = () => {
        const { dragConstraints: h } = this.getProps()
        Vr(h) && h.current && (this.constraints = this.resolveRefConstraints())
      },
      { projection: a } = this.visualElement,
      d = a.addEventListener('measure', l)
    ;(a && !a.layout && (a.root && a.root.updateScroll(), a.updateLayout()), Ee.read(l))
    const f = Gi(window, 'resize', () => this.scalePositionWithinConstraints()),
      y = a.addEventListener('didUpdate', ({ delta: h, hasLayoutChanged: p }) => {
        this.isDragging &&
          p &&
          (St((g) => {
            const k = this.getAxisMotionValue(g)
            k && ((this.originPoint[g] += h[g].translate), k.set(k.get() + h[g].translate))
          }),
          this.visualElement.render())
      })
    return () => {
      ;(f(), o(), d(), y && y())
    }
  }
  getProps() {
    const r = this.visualElement.getProps(),
      {
        drag: o = !1,
        dragDirectionLock: l = !1,
        dragPropagation: a = !1,
        dragConstraints: d = !1,
        dragElastic: f = yu,
        dragMomentum: y = !0,
      } = r
    return {
      ...r,
      drag: o,
      dragDirectionLock: l,
      dragPropagation: a,
      dragConstraints: d,
      dragElastic: f,
      dragMomentum: y,
    }
  }
}
function gs(t, r, o) {
  return (r === !0 || r === t) && (o === null || o === t)
}
function ok(t, r = 10) {
  let o = null
  return (Math.abs(t.y) > r ? (o = 'y') : Math.abs(t.x) > r && (o = 'x'), o)
}
class sk extends Tn {
  constructor(r) {
    ;(super(r),
      (this.removeGroupControls = pt),
      (this.removeListeners = pt),
      (this.controls = new ik(r)))
  }
  mount() {
    const { dragControls: r } = this.node.getProps()
    ;(r && (this.removeGroupControls = r.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || pt))
  }
  unmount() {
    ;(this.removeGroupControls(), this.removeListeners())
  }
}
const lp = (t) => (r, o) => {
  t && Ee.postRender(() => t(r, o))
}
class lk extends Tn {
  constructor() {
    ;(super(...arguments), (this.removePointerDownListener = pt))
  }
  onPointerDown(r) {
    this.session = new am(r, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: gm(this.node),
    })
  }
  createPanHandlers() {
    const { onPanSessionStart: r, onPanStart: o, onPan: l, onPanEnd: a } = this.node.getProps()
    return {
      onSessionStart: lp(r),
      onStart: lp(o),
      onMove: l,
      onEnd: (d, f) => {
        ;(delete this.session, a && Ee.postRender(() => a(d, f)))
      },
    }
  }
  mount() {
    this.removePointerDownListener = zi(this.node.current, 'pointerdown', (r) =>
      this.onPointerDown(r)
    )
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers())
  }
  unmount() {
    ;(this.removePointerDownListener(), this.session && this.session.end())
  }
}
const ws = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 }
function ap(t, r) {
  return r.max === r.min ? 0 : (t / (r.max - r.min)) * 100
}
const Di = {
    correct: (t, r) => {
      if (!r.target) return t
      if (typeof t == 'string')
        if (te.test(t)) t = parseFloat(t)
        else return t
      const o = ap(t, r.target.x),
        l = ap(t, r.target.y)
      return `${o}% ${l}%`
    },
  },
  ak = {
    correct: (t, { treeScale: r, projectionDelta: o }) => {
      const l = t,
        a = Pn.parse(t)
      if (a.length > 5) return l
      const d = Pn.createTransformer(t),
        f = typeof a[0] != 'number' ? 1 : 0,
        y = o.x.scale * r.x,
        h = o.y.scale * r.y
      ;((a[0 + f] /= y), (a[1 + f] /= h))
      const p = Pe(y, h, 0.5)
      return (
        typeof a[2 + f] == 'number' && (a[2 + f] /= p),
        typeof a[3 + f] == 'number' && (a[3 + f] /= p),
        d(a)
      )
    },
  }
class uk extends _.Component {
  componentDidMount() {
    const { visualElement: r, layoutGroup: o, switchLayoutGroup: l, layoutId: a } = this.props,
      { projection: d } = r
    ;(A2(ck),
      d &&
        (o.group && o.group.add(d),
        l && l.register && a && l.register(d),
        d.root.didUpdate(),
        d.addEventListener('animationComplete', () => {
          this.safeToRemove()
        }),
        d.setOptions({ ...d.options, onExitComplete: () => this.safeToRemove() })),
      (ws.hasEverUpdated = !0))
  }
  getSnapshotBeforeUpdate(r) {
    const { layoutDependency: o, visualElement: l, drag: a, isPresent: d } = this.props,
      f = l.projection
    return (
      f &&
        ((f.isPresent = d),
        a || r.layoutDependency !== o || o === void 0 ? f.willUpdate() : this.safeToRemove(),
        r.isPresent !== d &&
          (d
            ? f.promote()
            : f.relegate() ||
              Ee.postRender(() => {
                const y = f.getStack()
                ;(!y || !y.members.length) && this.safeToRemove()
              }))),
      null
    )
  }
  componentDidUpdate() {
    const { projection: r } = this.props.visualElement
    r &&
      (r.root.didUpdate(),
      Fu.postRender(() => {
        !r.currentAnimation && r.isLead() && this.safeToRemove()
      }))
  }
  componentWillUnmount() {
    const { visualElement: r, layoutGroup: o, switchLayoutGroup: l } = this.props,
      { projection: a } = r
    a &&
      (a.scheduleCheckAfterUnmount(),
      o && o.group && o.group.remove(a),
      l && l.deregister && l.deregister(a))
  }
  safeToRemove() {
    const { safeToRemove: r } = this.props
    r && r()
  }
  render() {
    return null
  }
}
function ym(t) {
  const [r, o] = $y(),
    l = _.useContext(Jp)
  return tu.jsx(uk, {
    ...t,
    layoutGroup: l,
    switchLayoutGroup: _.useContext(l1),
    isPresent: r,
    safeToRemove: o,
  })
}
const ck = {
  borderRadius: {
    ...Di,
    applyTo: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ],
  },
  borderTopLeftRadius: Di,
  borderTopRightRadius: Di,
  borderBottomLeftRadius: Di,
  borderBottomRightRadius: Di,
  boxShadow: ak,
}
function fk(t, r, o) {
  const l = Qe(t) ? t : bi(t)
  return (l.start(ic('', l, r, o)), l.animation)
}
function dk(t) {
  return t instanceof SVGElement && t.tagName !== 'svg'
}
const hk = (t, r) => t.depth - r.depth
class pk {
  constructor() {
    ;((this.children = []), (this.isDirty = !1))
  }
  add(r) {
    ;(Yu(this.children, r), (this.isDirty = !0))
  }
  remove(r) {
    ;(bu(this.children, r), (this.isDirty = !0))
  }
  forEach(r) {
    ;(this.isDirty && this.children.sort(hk), (this.isDirty = !1), this.children.forEach(r))
  }
}
function mk(t, r) {
  const o = It.now(),
    l = ({ timestamp: a }) => {
      const d = a - o
      d >= r && (Sn(l), t(d - r))
    }
  return (Ee.read(l, !0), () => Sn(l))
}
const vm = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  gk = vm.length,
  up = (t) => (typeof t == 'string' ? parseFloat(t) : t),
  cp = (t) => typeof t == 'number' || te.test(t)
function yk(t, r, o, l, a, d) {
  a
    ? ((t.opacity = Pe(0, o.opacity !== void 0 ? o.opacity : 1, vk(l))),
      (t.opacityExit = Pe(r.opacity !== void 0 ? r.opacity : 1, 0, kk(l))))
    : d &&
      (t.opacity = Pe(
        r.opacity !== void 0 ? r.opacity : 1,
        o.opacity !== void 0 ? o.opacity : 1,
        l
      ))
  for (let f = 0; f < gk; f++) {
    const y = `border${vm[f]}Radius`
    let h = fp(r, y),
      p = fp(o, y)
    if (h === void 0 && p === void 0) continue
    ;(h || (h = 0),
      p || (p = 0),
      h === 0 || p === 0 || cp(h) === cp(p)
        ? ((t[y] = Math.max(Pe(up(h), up(p), l), 0)), (Ot.test(p) || Ot.test(h)) && (t[y] += '%'))
        : (t[y] = p))
  }
  ;(r.rotate || o.rotate) && (t.rotate = Pe(r.rotate || 0, o.rotate || 0, l))
}
function fp(t, r) {
  return t[r] !== void 0 ? t[r] : t.borderRadius
}
const vk = km(0, 0.5, W1),
  kk = km(0.5, 0.95, pt)
function km(t, r, o) {
  return (l) => (l < t ? 0 : l > r ? 1 : o(zr(t, r, l)))
}
function dp(t, r) {
  ;((t.min = r.min), (t.max = r.max))
}
function wt(t, r) {
  ;(dp(t.x, r.x), dp(t.y, r.y))
}
function hp(t, r) {
  ;((t.translate = r.translate),
    (t.scale = r.scale),
    (t.originPoint = r.originPoint),
    (t.origin = r.origin))
}
function pp(t, r, o, l, a) {
  return ((t -= r), (t = js(t, 1 / o, l)), a !== void 0 && (t = js(t, 1 / a, l)), t)
}
function Ek(t, r = 0, o = 1, l = 0.5, a, d = t, f = t) {
  if (
    (Ot.test(r) && ((r = parseFloat(r)), (r = Pe(f.min, f.max, r / 100) - f.min)),
    typeof r != 'number')
  )
    return
  let y = Pe(d.min, d.max, l)
  ;(t === d && (y -= r), (t.min = pp(t.min, r, o, y, a)), (t.max = pp(t.max, r, o, y, a)))
}
function mp(t, r, [o, l, a], d, f) {
  Ek(t, r[o], r[l], r[a], r.scale, d, f)
}
const xk = ['x', 'scaleX', 'originX'],
  wk = ['y', 'scaleY', 'originY']
function gp(t, r, o, l) {
  ;(mp(t.x, r, xk, o ? o.x : void 0, l ? l.x : void 0),
    mp(t.y, r, wk, o ? o.y : void 0, l ? l.y : void 0))
}
function yp(t) {
  return t.translate === 0 && t.scale === 1
}
function Em(t) {
  return yp(t.x) && yp(t.y)
}
function vp(t, r) {
  return t.min === r.min && t.max === r.max
}
function Lk(t, r) {
  return vp(t.x, r.x) && vp(t.y, r.y)
}
function kp(t, r) {
  return Math.round(t.min) === Math.round(r.min) && Math.round(t.max) === Math.round(r.max)
}
function xm(t, r) {
  return kp(t.x, r.x) && kp(t.y, r.y)
}
function Ep(t) {
  return mt(t.x) / mt(t.y)
}
function xp(t, r) {
  return t.translate === r.translate && t.scale === r.scale && t.originPoint === r.originPoint
}
class Sk {
  constructor() {
    this.members = []
  }
  add(r) {
    ;(Yu(this.members, r), r.scheduleRender())
  }
  remove(r) {
    if ((bu(this.members, r), r === this.prevLead && (this.prevLead = void 0), r === this.lead)) {
      const o = this.members[this.members.length - 1]
      o && this.promote(o)
    }
  }
  relegate(r) {
    const o = this.members.findIndex((a) => r === a)
    if (o === 0) return !1
    let l
    for (let a = o; a >= 0; a--) {
      const d = this.members[a]
      if (d.isPresent !== !1) {
        l = d
        break
      }
    }
    return l ? (this.promote(l), !0) : !1
  }
  promote(r, o) {
    const l = this.lead
    if (r !== l && ((this.prevLead = l), (this.lead = r), r.show(), l)) {
      ;(l.instance && l.scheduleRender(),
        r.scheduleRender(),
        (r.resumeFrom = l),
        o && (r.resumeFrom.preserveOpacity = !0),
        l.snapshot &&
          ((r.snapshot = l.snapshot),
          (r.snapshot.latestValues = l.animationValues || l.latestValues)),
        r.root && r.root.isUpdating && (r.isLayoutDirty = !0))
      const { crossfade: a } = r.options
      a === !1 && l.hide()
    }
  }
  exitAnimationComplete() {
    this.members.forEach((r) => {
      const { options: o, resumingFrom: l } = r
      ;(o.onExitComplete && o.onExitComplete(),
        l && l.options.onExitComplete && l.options.onExitComplete())
    })
  }
  scheduleRender() {
    this.members.forEach((r) => {
      r.instance && r.scheduleRender(!1)
    })
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
  }
}
function Pk(t, r, o) {
  let l = ''
  const a = t.x.translate / r.x,
    d = t.y.translate / r.y,
    f = o?.z || 0
  if (
    ((a || d || f) && (l = `translate3d(${a}px, ${d}px, ${f}px) `),
    (r.x !== 1 || r.y !== 1) && (l += `scale(${1 / r.x}, ${1 / r.y}) `),
    o)
  ) {
    const { transformPerspective: p, rotate: g, rotateX: k, rotateY: E, skewX: S, skewY: C } = o
    ;(p && (l = `perspective(${p}px) ${l}`),
      g && (l += `rotate(${g}deg) `),
      k && (l += `rotateX(${k}deg) `),
      E && (l += `rotateY(${E}deg) `),
      S && (l += `skewX(${S}deg) `),
      C && (l += `skewY(${C}deg) `))
  }
  const y = t.x.scale * r.x,
    h = t.y.scale * r.y
  return ((y !== 1 || h !== 1) && (l += `scale(${y}, ${h})`), l || 'none')
}
const Hn = {
    type: 'projectionFrame',
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  Wi = typeof window < 'u' && window.MotionDebug !== void 0,
  Ga = ['', 'X', 'Y', 'Z'],
  Ck = { visibility: 'hidden' },
  wp = 1e3
let Tk = 0
function Xa(t, r, o, l) {
  const { latestValues: a } = r
  a[t] && ((o[t] = a[t]), r.setStaticValue(t, 0), l && (l[t] = 0))
}
function wm(t) {
  if (((t.hasCheckedOptimisedAppear = !0), t.root === t)) return
  const { visualElement: r } = t.options
  if (!r) return
  const o = R1(r)
  if (window.MotionHasOptimisedAnimation(o, 'transform')) {
    const { layout: a, layoutId: d } = t.options
    window.MotionCancelOptimisedAnimation(o, 'transform', Ee, !(a || d))
  }
  const { parent: l } = t
  l && !l.hasCheckedOptimisedAppear && wm(l)
}
function Lm({
  attachResizeListener: t,
  defaultParent: r,
  measureScroll: o,
  checkIsScrollRoot: l,
  resetTransform: a,
}) {
  return class {
    constructor(f = {}, y = r?.()) {
      ;((this.id = Tk++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots())
        }),
        (this.updateProjection = () => {
          ;((this.projectionUpdateScheduled = !1),
            Wi && (Hn.totalNodes = Hn.resolvedTargetDeltas = Hn.recalculatedProjection = 0),
            this.nodes.forEach(Rk),
            this.nodes.forEach(Vk),
            this.nodes.forEach(Nk),
            this.nodes.forEach(jk),
            Wi && window.MotionDebug.record(Hn))
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = f),
        (this.root = y ? y.root || y : this),
        (this.path = y ? [...y.path, y] : []),
        (this.parent = y),
        (this.depth = y ? y.depth + 1 : 0))
      for (let h = 0; h < this.path.length; h++) this.path[h].shouldResetTransform = !0
      this.root === this && (this.nodes = new pk())
    }
    addEventListener(f, y) {
      return (
        this.eventHandlers.has(f) || this.eventHandlers.set(f, new Qu()),
        this.eventHandlers.get(f).add(y)
      )
    }
    notifyListeners(f, ...y) {
      const h = this.eventHandlers.get(f)
      h && h.notify(...y)
    }
    hasListeners(f) {
      return this.eventHandlers.has(f)
    }
    mount(f, y = this.root.hasTreeAnimated) {
      if (this.instance) return
      ;((this.isSVG = dk(f)), (this.instance = f))
      const { layoutId: h, layout: p, visualElement: g } = this.options
      if (
        (g && !g.current && g.mount(f),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        y && (p || h) && (this.isLayoutDirty = !0),
        t)
      ) {
        let k
        const E = () => (this.root.updateBlockedByResize = !1)
        t(f, () => {
          ;((this.root.updateBlockedByResize = !0),
            k && k(),
            (k = mk(E, 250)),
            ws.hasAnimatedSinceResize && ((ws.hasAnimatedSinceResize = !1), this.nodes.forEach(Sp)))
        })
      }
      ;(h && this.root.registerSharedNode(h, this),
        this.options.animate !== !1 &&
          g &&
          (h || p) &&
          this.addEventListener(
            'didUpdate',
            ({ delta: k, hasLayoutChanged: E, hasRelativeTargetChanged: S, layout: C }) => {
              if (this.isTreeAnimationBlocked()) {
                ;((this.target = void 0), (this.relativeTarget = void 0))
                return
              }
              const A = this.options.transition || g.getDefaultTransition() || zk,
                { onLayoutAnimationStart: P, onLayoutAnimationComplete: D } = g.getProps(),
                V = !this.targetLayout || !xm(this.targetLayout, C) || S,
                F = !E && S
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                F ||
                (E && (V || !this.currentAnimation))
              ) {
                ;(this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(k, F))
                const z = { ...Hu(A, 'layout'), onPlay: P, onComplete: D }
                ;((g.shouldReduceMotion || this.options.layoutRoot) &&
                  ((z.delay = 0), (z.type = !1)),
                  this.startAnimation(z))
              } else
                (E || Sp(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete())
              this.targetLayout = C
            }
          ))
    }
    unmount() {
      ;(this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this))
      const f = this.getStack()
      ;(f && f.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Sn(this.updateProjection))
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(Wk), this.animationId++)
    }
    getTransformTemplate() {
      const { visualElement: f } = this.options
      return f && f.getProps().transformTemplate
    }
    willUpdate(f = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete()
        return
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && wm(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return
      this.isLayoutDirty = !0
      for (let g = 0; g < this.path.length; g++) {
        const k = this.path[g]
        ;((k.shouldResetTransform = !0),
          k.updateScroll('snapshot'),
          k.options.layoutRoot && k.willUpdate(!1))
      }
      const { layoutId: y, layout: h } = this.options
      if (y === void 0 && !h) return
      const p = this.getTransformTemplate()
      ;((this.prevTransformTemplateValue = p ? p(this.latestValues, '') : void 0),
        this.updateSnapshot(),
        f && this.notifyListeners('willUpdate'))
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        ;(this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Lp))
        return
      }
      ;(this.isUpdating || this.nodes.forEach(Fk),
        (this.isUpdating = !1),
        this.nodes.forEach(Dk),
        this.nodes.forEach(Mk),
        this.nodes.forEach(Ak),
        this.clearAllSnapshots())
      const y = It.now()
      ;((Ue.delta = Xt(0, 1e3 / 60, y - Ue.timestamp)),
        (Ue.timestamp = y),
        (Ue.isProcessing = !0),
        za.update.process(Ue),
        za.preRender.process(Ue),
        za.render.process(Ue),
        (Ue.isProcessing = !1))
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), Fu.read(this.scheduleUpdate))
    }
    clearAllSnapshots() {
      ;(this.nodes.forEach(_k), this.sharedNodes.forEach(Ok))
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), Ee.preRender(this.updateProjection, !1, !0))
    }
    scheduleCheckAfterUnmount() {
      Ee.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
      })
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure())
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let h = 0; h < this.path.length; h++) this.path[h].updateScroll()
      const f = this.layout
      ;((this.layout = this.measure(!1)),
        (this.layoutCorrected = je()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox))
      const { visualElement: y } = this.options
      y && y.notify('LayoutMeasure', this.layout.layoutBox, f ? f.layoutBox : void 0)
    }
    updateScroll(f = 'measure') {
      let y = !!(this.options.layoutScroll && this.instance)
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === f &&
          (y = !1),
        y)
      ) {
        const h = l(this.instance)
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: h,
          offset: o(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : h,
        }
      }
    }
    resetTransform() {
      if (!a) return
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        y = this.projectionDelta && !Em(this.projectionDelta),
        h = this.getTransformTemplate(),
        p = h ? h(this.latestValues, '') : void 0,
        g = p !== this.prevTransformTemplateValue
      f &&
        (y || Un(this.latestValues) || g) &&
        (a(this.instance, p), (this.shouldResetTransform = !1), this.scheduleRender())
    }
    measure(f = !0) {
      const y = this.measurePageBox()
      let h = this.removeElementScroll(y)
      return (
        f && (h = this.removeTransform(h)),
        Uk(h),
        {
          animationId: this.root.animationId,
          measuredBox: y,
          layoutBox: h,
          latestValues: {},
          source: this.id,
        }
      )
    }
    measurePageBox() {
      var f
      const { visualElement: y } = this.options
      if (!y) return je()
      const h = y.measureViewportBox()
      if (
        !(((f = this.scroll) === null || f === void 0 ? void 0 : f.wasRoot) || this.path.some(Hk))
      ) {
        const { scroll: g } = this.root
        g && (Or(h.x, g.offset.x), Or(h.y, g.offset.y))
      }
      return h
    }
    removeElementScroll(f) {
      var y
      const h = je()
      if ((wt(h, f), !((y = this.scroll) === null || y === void 0) && y.wasRoot)) return h
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p],
          { scroll: k, options: E } = g
        g !== this.root &&
          k &&
          E.layoutScroll &&
          (k.wasRoot && wt(h, f), Or(h.x, k.offset.x), Or(h.y, k.offset.y))
      }
      return h
    }
    applyTransform(f, y = !1) {
      const h = je()
      wt(h, f)
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p]
        ;(!y &&
          g.options.layoutScroll &&
          g.scroll &&
          g !== g.root &&
          Ir(h, { x: -g.scroll.offset.x, y: -g.scroll.offset.y }),
          Un(g.latestValues) && Ir(h, g.latestValues))
      }
      return (Un(this.latestValues) && Ir(h, this.latestValues), h)
    }
    removeTransform(f) {
      const y = je()
      wt(y, f)
      for (let h = 0; h < this.path.length; h++) {
        const p = this.path[h]
        if (!p.instance || !Un(p.latestValues)) continue
        vu(p.latestValues) && p.updateSnapshot()
        const g = je(),
          k = p.measurePageBox()
        ;(wt(g, k), gp(y, p.latestValues, p.snapshot ? p.snapshot.layoutBox : void 0, g))
      }
      return (Un(this.latestValues) && gp(y, this.latestValues), y)
    }
    setTargetDelta(f) {
      ;((this.targetDelta = f), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0))
    }
    setOptions(f) {
      this.options = { ...this.options, ...f, crossfade: f.crossfade !== void 0 ? f.crossfade : !0 }
    }
    clearMeasurements() {
      ;((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1))
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== Ue.timestamp &&
        this.relativeParent.resolveTargetDelta(!0)
    }
    resolveTargetDelta(f = !1) {
      var y
      const h = this.getLead()
      ;(this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty))
      const p = !!this.resumingFrom || this !== h
      if (
        !(
          f ||
          (p && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((y = this.parent) === null || y === void 0) && y.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return
      const { layout: k, layoutId: E } = this.options
      if (!(!this.layout || !(k || E))) {
        if (
          ((this.resolvedRelativeTargetAt = Ue.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const S = this.getClosestProjectingParent()
          S && S.layout && this.animationProgress !== 1
            ? ((this.relativeParent = S),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = je()),
              (this.relativeTargetOrigin = je()),
              Hi(this.relativeTargetOrigin, this.layout.layoutBox, S.layout.layoutBox),
              wt(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0)
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target || ((this.target = je()), (this.targetWithTransforms = je())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                Z8(this.target, this.relativeTarget, this.relativeParent.target))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : wt(this.target, this.layout.layoutBox),
                  pm(this.target, this.targetDelta))
                : wt(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1
            const S = this.getClosestProjectingParent()
            S &&
            !!S.resumingFrom == !!this.resumingFrom &&
            !S.options.layoutScroll &&
            S.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = S),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = je()),
                (this.relativeTargetOrigin = je()),
                Hi(this.relativeTargetOrigin, this.target, S.target),
                wt(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0)
          }
          Wi && Hn.resolvedTargetDeltas++
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || vu(this.parent.latestValues) || hm(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
    }
    calcProjection() {
      var f
      const y = this.getLead(),
        h = !!this.resumingFrom || this !== y
      let p = !0
      if (
        ((this.isProjectionDirty ||
          (!((f = this.parent) === null || f === void 0) && f.isProjectionDirty)) &&
          (p = !1),
        h && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1),
        this.resolvedRelativeTargetAt === Ue.timestamp && (p = !1),
        p)
      )
        return
      const { layout: g, layoutId: k } = this.options
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(g || k))
      )
        return
      wt(this.layoutCorrected, this.layout.layoutBox)
      const E = this.treeScale.x,
        S = this.treeScale.y
      ;(tk(this.layoutCorrected, this.treeScale, this.path, h),
        y.layout &&
          !y.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((y.target = y.layout.layoutBox), (y.targetWithTransforms = je())))
      const { target: C } = y
      if (!C) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender())
        return
      }
      ;(!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (hp(this.prevProjectionDelta.x, this.projectionDelta.x),
          hp(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Ui(this.projectionDelta, this.layoutCorrected, C, this.latestValues),
        (this.treeScale.x !== E ||
          this.treeScale.y !== S ||
          !xp(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !xp(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners('projectionUpdate', C)),
        Wi && Hn.recalculatedProjection++)
    }
    hide() {
      this.isVisible = !1
    }
    show() {
      this.isVisible = !0
    }
    scheduleRender(f = !0) {
      var y
      if (((y = this.options.visualElement) === null || y === void 0 || y.scheduleRender(), f)) {
        const h = this.getStack()
        h && h.scheduleRender()
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
    }
    createProjectionDeltas() {
      ;((this.prevProjectionDelta = Wr()),
        (this.projectionDelta = Wr()),
        (this.projectionDeltaWithTransform = Wr()))
    }
    setAnimationOrigin(f, y = !1) {
      const h = this.snapshot,
        p = h ? h.latestValues : {},
        g = { ...this.latestValues },
        k = Wr()
      ;((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !y))
      const E = je(),
        S = h ? h.source : void 0,
        C = this.layout ? this.layout.source : void 0,
        A = S !== C,
        P = this.getStack(),
        D = !P || P.members.length <= 1,
        V = !!(A && !D && this.options.crossfade === !0 && !this.path.some(Bk))
      this.animationProgress = 0
      let F
      ;((this.mixTargetDelta = (z) => {
        const H = z / 1e3
        ;(Pp(k.x, f.x, H),
          Pp(k.y, f.y, H),
          this.setTargetDelta(k),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Hi(E, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            Ik(this.relativeTarget, this.relativeTargetOrigin, E, H),
            F && Lk(this.relativeTarget, F) && (this.isProjectionDirty = !1),
            F || (F = je()),
            wt(F, this.relativeTarget)),
          A && ((this.animationValues = g), yk(g, p, this.latestValues, H, V, D)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = H))
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0))
    }
    startAnimation(f) {
      ;(this.notifyListeners('animationStart'),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation && (Sn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Ee.update(() => {
          ;((ws.hasAnimatedSinceResize = !0),
            (this.currentAnimation = fk(0, wp, {
              ...f,
              onUpdate: (y) => {
                ;(this.mixTargetDelta(y), f.onUpdate && f.onUpdate(y))
              },
              onComplete: () => {
                ;(f.onComplete && f.onComplete(), this.completeAnimation())
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0))
        })))
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0))
      const f = this.getStack()
      ;(f && f.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners('animationComplete'))
    }
    finishAnimation() {
      ;(this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(wp), this.currentAnimation.stop()),
        this.completeAnimation())
    }
    applyTransformsToTarget() {
      const f = this.getLead()
      let { targetWithTransforms: y, target: h, layout: p, latestValues: g } = f
      if (!(!y || !h || !p)) {
        if (
          this !== f &&
          this.layout &&
          p &&
          Sm(this.options.animationType, this.layout.layoutBox, p.layoutBox)
        ) {
          h = this.target || je()
          const k = mt(this.layout.layoutBox.x)
          ;((h.x.min = f.target.x.min), (h.x.max = h.x.min + k))
          const E = mt(this.layout.layoutBox.y)
          ;((h.y.min = f.target.y.min), (h.y.max = h.y.min + E))
        }
        ;(wt(y, h), Ir(y, g), Ui(this.projectionDeltaWithTransform, this.layoutCorrected, y, g))
      }
    }
    registerSharedNode(f, y) {
      ;(this.sharedNodes.has(f) || this.sharedNodes.set(f, new Sk()),
        this.sharedNodes.get(f).add(y))
      const p = y.options.initialPromotionConfig
      y.promote({
        transition: p ? p.transition : void 0,
        preserveFollowOpacity:
          p && p.shouldPreserveFollowOpacity ? p.shouldPreserveFollowOpacity(y) : void 0,
      })
    }
    isLead() {
      const f = this.getStack()
      return f ? f.lead === this : !0
    }
    getLead() {
      var f
      const { layoutId: y } = this.options
      return y ? ((f = this.getStack()) === null || f === void 0 ? void 0 : f.lead) || this : this
    }
    getPrevLead() {
      var f
      const { layoutId: y } = this.options
      return y ? ((f = this.getStack()) === null || f === void 0 ? void 0 : f.prevLead) : void 0
    }
    getStack() {
      const { layoutId: f } = this.options
      if (f) return this.root.sharedNodes.get(f)
    }
    promote({ needsReset: f, transition: y, preserveFollowOpacity: h } = {}) {
      const p = this.getStack()
      ;(p && p.promote(this, h),
        f && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        y && this.setOptions({ transition: y }))
    }
    relegate() {
      const f = this.getStack()
      return f ? f.relegate(this) : !1
    }
    resetSkewAndRotation() {
      const { visualElement: f } = this.options
      if (!f) return
      let y = !1
      const { latestValues: h } = f
      if (
        ((h.z || h.rotate || h.rotateX || h.rotateY || h.rotateZ || h.skewX || h.skewY) && (y = !0),
        !y)
      )
        return
      const p = {}
      h.z && Xa('z', f, p, this.animationValues)
      for (let g = 0; g < Ga.length; g++)
        (Xa(`rotate${Ga[g]}`, f, p, this.animationValues),
          Xa(`skew${Ga[g]}`, f, p, this.animationValues))
      f.render()
      for (const g in p)
        (f.setStaticValue(g, p[g]), this.animationValues && (this.animationValues[g] = p[g]))
      f.scheduleRender()
    }
    getProjectionStyles(f) {
      var y, h
      if (!this.instance || this.isSVG) return
      if (!this.isVisible) return Ck
      const p = { visibility: '' },
        g = this.getTransformTemplate()
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (p.opacity = ''),
          (p.pointerEvents = Es(f?.pointerEvents) || ''),
          (p.transform = g ? g(this.latestValues, '') : 'none'),
          p
        )
      const k = this.getLead()
      if (!this.projectionDelta || !this.layout || !k.target) {
        const A = {}
        return (
          this.options.layoutId &&
            ((A.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
            (A.pointerEvents = Es(f?.pointerEvents) || '')),
          this.hasProjected &&
            !Un(this.latestValues) &&
            ((A.transform = g ? g({}, '') : 'none'), (this.hasProjected = !1)),
          A
        )
      }
      const E = k.animationValues || k.latestValues
      ;(this.applyTransformsToTarget(),
        (p.transform = Pk(this.projectionDeltaWithTransform, this.treeScale, E)),
        g && (p.transform = g(E, p.transform)))
      const { x: S, y: C } = this.projectionDelta
      ;((p.transformOrigin = `${S.origin * 100}% ${C.origin * 100}% 0`),
        k.animationValues
          ? (p.opacity =
              k === this
                ? (h = (y = E.opacity) !== null && y !== void 0 ? y : this.latestValues.opacity) !==
                    null && h !== void 0
                  ? h
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : E.opacityExit)
          : (p.opacity =
              k === this
                ? E.opacity !== void 0
                  ? E.opacity
                  : ''
                : E.opacityExit !== void 0
                  ? E.opacityExit
                  : 0))
      for (const A in Cs) {
        if (E[A] === void 0) continue
        const { correct: P, applyTo: D } = Cs[A],
          V = p.transform === 'none' ? E[A] : P(E[A], k)
        if (D) {
          const F = D.length
          for (let z = 0; z < F; z++) p[D[z]] = V
        } else p[A] = V
      }
      return (
        this.options.layoutId &&
          (p.pointerEvents = k === this ? Es(f?.pointerEvents) || '' : 'none'),
        p
      )
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0
    }
    resetTree() {
      ;(this.root.nodes.forEach((f) => {
        var y
        return (y = f.currentAnimation) === null || y === void 0 ? void 0 : y.stop()
      }),
        this.root.nodes.forEach(Lp),
        this.root.sharedNodes.clear())
    }
  }
}
function Mk(t) {
  t.updateLayout()
}
function Ak(t) {
  var r
  const o = ((r = t.resumeFrom) === null || r === void 0 ? void 0 : r.snapshot) || t.snapshot
  if (t.isLead() && t.layout && o && t.hasListeners('didUpdate')) {
    const { layoutBox: l, measuredBox: a } = t.layout,
      { animationType: d } = t.options,
      f = o.source !== t.layout.source
    d === 'size'
      ? St((k) => {
          const E = f ? o.measuredBox[k] : o.layoutBox[k],
            S = mt(E)
          ;((E.min = l[k].min), (E.max = E.min + S))
        })
      : Sm(d, o.layoutBox, l) &&
        St((k) => {
          const E = f ? o.measuredBox[k] : o.layoutBox[k],
            S = mt(l[k])
          ;((E.max = E.min + S),
            t.relativeTarget &&
              !t.currentAnimation &&
              ((t.isProjectionDirty = !0), (t.relativeTarget[k].max = t.relativeTarget[k].min + S)))
        })
    const y = Wr()
    Ui(y, l, o.layoutBox)
    const h = Wr()
    f ? Ui(h, t.applyTransform(a, !0), o.measuredBox) : Ui(h, l, o.layoutBox)
    const p = !Em(y)
    let g = !1
    if (!t.resumeFrom) {
      const k = t.getClosestProjectingParent()
      if (k && !k.resumeFrom) {
        const { snapshot: E, layout: S } = k
        if (E && S) {
          const C = je()
          Hi(C, o.layoutBox, E.layoutBox)
          const A = je()
          ;(Hi(A, l, S.layoutBox),
            xm(C, A) || (g = !0),
            k.options.layoutRoot &&
              ((t.relativeTarget = A), (t.relativeTargetOrigin = C), (t.relativeParent = k)))
        }
      }
    }
    t.notifyListeners('didUpdate', {
      layout: l,
      snapshot: o,
      delta: h,
      layoutDelta: y,
      hasLayoutChanged: p,
      hasRelativeTargetChanged: g,
    })
  } else if (t.isLead()) {
    const { onExitComplete: l } = t.options
    l && l()
  }
  t.options.transition = void 0
}
function Rk(t) {
  ;(Wi && Hn.totalNodes++,
    t.parent &&
      (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
      t.isSharedProjectionDirty ||
        (t.isSharedProjectionDirty = !!(
          t.isProjectionDirty ||
          t.parent.isProjectionDirty ||
          t.parent.isSharedProjectionDirty
        )),
      t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty)))
}
function jk(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
}
function _k(t) {
  t.clearSnapshot()
}
function Lp(t) {
  t.clearMeasurements()
}
function Fk(t) {
  t.isLayoutDirty = !1
}
function Dk(t) {
  const { visualElement: r } = t.options
  ;(r && r.getProps().onBeforeLayoutMeasure && r.notify('BeforeLayoutMeasure'), t.resetTransform())
}
function Sp(t) {
  ;(t.finishAnimation(),
    (t.targetDelta = t.relativeTarget = t.target = void 0),
    (t.isProjectionDirty = !0))
}
function Vk(t) {
  t.resolveTargetDelta()
}
function Nk(t) {
  t.calcProjection()
}
function Wk(t) {
  t.resetSkewAndRotation()
}
function Ok(t) {
  t.removeLeadSnapshot()
}
function Pp(t, r, o) {
  ;((t.translate = Pe(r.translate, 0, o)),
    (t.scale = Pe(r.scale, 1, o)),
    (t.origin = r.origin),
    (t.originPoint = r.originPoint))
}
function Cp(t, r, o, l) {
  ;((t.min = Pe(r.min, o.min, l)), (t.max = Pe(r.max, o.max, l)))
}
function Ik(t, r, o, l) {
  ;(Cp(t.x, r.x, o.x, l), Cp(t.y, r.y, o.y, l))
}
function Bk(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0
}
const zk = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Tp = (t) =>
    typeof navigator < 'u' && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t),
  Mp = Tp('applewebkit/') && !Tp('chrome/') ? Math.round : pt
function Ap(t) {
  ;((t.min = Mp(t.min)), (t.max = Mp(t.max)))
}
function Uk(t) {
  ;(Ap(t.x), Ap(t.y))
}
function Sm(t, r, o) {
  return t === 'position' || (t === 'preserve-aspect' && !K8(Ep(r), Ep(o), 0.2))
}
function Hk(t) {
  var r
  return t !== t.root && ((r = t.scroll) === null || r === void 0 ? void 0 : r.wasRoot)
}
const $k = Lm({
    attachResizeListener: (t, r) => Gi(t, 'resize', r),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  qa = { current: void 0 },
  Pm = Lm({
    measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
    defaultParent: () => {
      if (!qa.current) {
        const t = new $k({})
        ;(t.mount(window), t.setOptions({ layoutScroll: !0 }), (qa.current = t))
      }
      return qa.current
    },
    resetTransform: (t, r) => {
      t.style.transform = r !== void 0 ? r : 'none'
    },
    checkIsScrollRoot: (t) => window.getComputedStyle(t).position === 'fixed',
  }),
  Kk = { pan: { Feature: lk }, drag: { Feature: sk, ProjectionNode: Pm, MeasureLayout: ym } }
function Rp(t, r, o) {
  const { props: l } = t
  t.animationState && l.whileHover && t.animationState.setActive('whileHover', o === 'Start')
  const a = 'onHover' + o,
    d = l[a]
  d && Ee.postRender(() => d(r, eo(r)))
}
class Zk extends Tn {
  mount() {
    const { current: r } = this.node
    r && (this.unmount = K2(r, (o) => (Rp(this.node, o, 'Start'), (l) => Rp(this.node, l, 'End'))))
  }
  unmount() {}
}
class Yk extends Tn {
  constructor() {
    ;(super(...arguments), (this.isActive = !1))
  }
  onFocus() {
    let r = !1
    try {
      r = this.node.current.matches(':focus-visible')
    } catch {
      r = !0
    }
    !r ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !0), (this.isActive = !0))
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !1), (this.isActive = !1))
  }
  mount() {
    this.unmount = Ji(
      Gi(this.node.current, 'focus', () => this.onFocus()),
      Gi(this.node.current, 'blur', () => this.onBlur())
    )
  }
  unmount() {}
}
function jp(t, r, o) {
  const { props: l } = t
  t.animationState && l.whileTap && t.animationState.setActive('whileTap', o === 'Start')
  const a = 'onTap' + (o === 'End' ? '' : o),
    d = l[a]
  d && Ee.postRender(() => d(r, eo(r)))
}
class bk extends Tn {
  mount() {
    const { current: r } = this.node
    r &&
      (this.unmount = Q2(
        r,
        (o) => (
          jp(this.node, o, 'Start'),
          (l, { success: a }) => jp(this.node, l, a ? 'End' : 'Cancel')
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ))
  }
  unmount() {}
}
const Eu = new WeakMap(),
  Ja = new WeakMap(),
  Qk = (t) => {
    const r = Eu.get(t.target)
    r && r(t)
  },
  Gk = (t) => {
    t.forEach(Qk)
  }
function Xk({ root: t, ...r }) {
  const o = t || document
  Ja.has(o) || Ja.set(o, {})
  const l = Ja.get(o),
    a = JSON.stringify(r)
  return (l[a] || (l[a] = new IntersectionObserver(Gk, { root: t, ...r })), l[a])
}
function qk(t, r, o) {
  const l = Xk(r)
  return (
    Eu.set(t, o),
    l.observe(t),
    () => {
      ;(Eu.delete(t), l.unobserve(t))
    }
  )
}
const Jk = { some: 0, all: 1 }
class e4 extends Tn {
  constructor() {
    ;(super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1))
  }
  startObserver() {
    this.unmount()
    const { viewport: r = {} } = this.node.getProps(),
      { root: o, margin: l, amount: a = 'some', once: d } = r,
      f = {
        root: o ? o.current : void 0,
        rootMargin: l,
        threshold: typeof a == 'number' ? a : Jk[a],
      },
      y = (h) => {
        const { isIntersecting: p } = h
        if (this.isInView === p || ((this.isInView = p), d && !p && this.hasEnteredView)) return
        ;(p && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive('whileInView', p))
        const { onViewportEnter: g, onViewportLeave: k } = this.node.getProps(),
          E = p ? g : k
        E && E(h)
      }
    return qk(this.node.current, f, y)
  }
  mount() {
    this.startObserver()
  }
  update() {
    if (typeof IntersectionObserver > 'u') return
    const { props: r, prevProps: o } = this.node
    ;['amount', 'margin', 'root'].some(t4(r, o)) && this.startObserver()
  }
  unmount() {}
}
function t4({ viewport: t = {} }, { viewport: r = {} } = {}) {
  return (o) => t[o] !== r[o]
}
const n4 = {
    inView: { Feature: e4 },
    tap: { Feature: bk },
    focus: { Feature: Yk },
    hover: { Feature: Zk },
  },
  r4 = { layout: { ProjectionNode: Pm, MeasureLayout: ym } },
  xu = { current: null },
  Cm = { current: !1 }
function i4() {
  if (((Cm.current = !0), !!Mu))
    if (window.matchMedia) {
      const t = window.matchMedia('(prefers-reduced-motion)'),
        r = () => (xu.current = t.matches)
      ;(t.addListener(r), r())
    } else xu.current = !1
}
const o4 = [...X1, be, Pn],
  s4 = (t) => o4.find(G1(t)),
  _p = new WeakMap()
function l4(t, r, o) {
  for (const l in r) {
    const a = r[l],
      d = o[l]
    if (Qe(a)) t.addValue(l, a)
    else if (Qe(d)) t.addValue(l, bi(a, { owner: t }))
    else if (d !== a)
      if (t.hasValue(l)) {
        const f = t.getValue(l)
        f.liveStyle === !0 ? f.jump(a) : f.hasAnimated || f.set(a)
      } else {
        const f = t.getStaticValue(l)
        t.addValue(l, bi(f !== void 0 ? f : a, { owner: t }))
      }
  }
  for (const l in o) r[l] === void 0 && t.removeValue(l)
  return r
}
const Fp = [
  'AnimationStart',
  'AnimationComplete',
  'Update',
  'BeforeLayoutMeasure',
  'LayoutMeasure',
  'LayoutAnimationStart',
  'LayoutAnimationComplete',
]
class a4 {
  scrapeMotionValuesFromProps(r, o, l) {
    return {}
  }
  constructor(
    {
      parent: r,
      props: o,
      presenceContext: l,
      reducedMotionConfig: a,
      blockInitialAnimation: d,
      visualState: f,
    },
    y = {}
  ) {
    ;((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = tc),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const S = It.now()
        this.renderScheduledAt < S && ((this.renderScheduledAt = S), Ee.render(this.render, !1, !0))
      }))
    const { latestValues: h, renderState: p, onUpdate: g } = f
    ;((this.onUpdate = g),
      (this.latestValues = h),
      (this.baseTarget = { ...h }),
      (this.initialValues = o.initial ? { ...h } : {}),
      (this.renderState = p),
      (this.parent = r),
      (this.props = o),
      (this.presenceContext = l),
      (this.depth = r ? r.depth + 1 : 0),
      (this.reducedMotionConfig = a),
      (this.options = y),
      (this.blockInitialAnimation = !!d),
      (this.isControllingVariants = Is(o)),
      (this.isVariantNode = o1(o)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(r && r.current)))
    const { willChange: k, ...E } = this.scrapeMotionValuesFromProps(o, {}, this)
    for (const S in E) {
      const C = E[S]
      h[S] !== void 0 && Qe(C) && C.set(h[S], !1)
    }
  }
  mount(r) {
    ;((this.current = r),
      _p.set(r, this),
      this.projection && !this.projection.instance && this.projection.mount(r),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((o, l) => this.bindToMotionValue(l, o)),
      Cm.current || i4(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === 'never'
          ? !1
          : this.reducedMotionConfig === 'always'
            ? !0
            : xu.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext))
  }
  unmount() {
    ;(_p.delete(this.current),
      this.projection && this.projection.unmount(),
      Sn(this.notifyUpdate),
      Sn(this.render),
      this.valueSubscriptions.forEach((r) => r()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this))
    for (const r in this.events) this.events[r].clear()
    for (const r in this.features) {
      const o = this.features[r]
      o && (o.unmount(), (o.isMounted = !1))
    }
    this.current = null
  }
  bindToMotionValue(r, o) {
    this.valueSubscriptions.has(r) && this.valueSubscriptions.get(r)()
    const l = bn.has(r),
      a = o.on('change', (y) => {
        ;((this.latestValues[r] = y),
          this.props.onUpdate && Ee.preRender(this.notifyUpdate),
          l && this.projection && (this.projection.isTransformDirty = !0))
      }),
      d = o.on('renderRequest', this.scheduleRender)
    let f
    ;(window.MotionCheckAppearSync && (f = window.MotionCheckAppearSync(this, r, o)),
      this.valueSubscriptions.set(r, () => {
        ;(a(), d(), f && f(), o.owner && o.stop())
      }))
  }
  sortNodePosition(r) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== r.type
      ? 0
      : this.sortInstanceNodePosition(this.current, r.current)
  }
  updateFeatures() {
    let r = 'animation'
    for (r in Ur) {
      const o = Ur[r]
      if (!o) continue
      const { isEnabled: l, Feature: a } = o
      if (
        (!this.features[r] && a && l(this.props) && (this.features[r] = new a(this)),
        this.features[r])
      ) {
        const d = this.features[r]
        d.isMounted ? d.update() : (d.mount(), (d.isMounted = !0))
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props)
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : je()
  }
  getStaticValue(r) {
    return this.latestValues[r]
  }
  setStaticValue(r, o) {
    this.latestValues[r] = o
  }
  update(r, o) {
    ;((r.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = r),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = o))
    for (let l = 0; l < Fp.length; l++) {
      const a = Fp[l]
      this.propEventSubscriptions[a] &&
        (this.propEventSubscriptions[a](), delete this.propEventSubscriptions[a])
      const d = 'on' + a,
        f = r[d]
      f && (this.propEventSubscriptions[a] = this.on(a, f))
    }
    ;((this.prevMotionValues = l4(
      this,
      this.scrapeMotionValuesFromProps(r, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue(),
      this.onUpdate && this.onUpdate(this))
  }
  getProps() {
    return this.props
  }
  getVariant(r) {
    return this.props.variants ? this.props.variants[r] : void 0
  }
  getDefaultTransition() {
    return this.props.transition
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
  }
  addVariantChild(r) {
    const o = this.getClosestVariantNode()
    if (o) return (o.variantChildren && o.variantChildren.add(r), () => o.variantChildren.delete(r))
  }
  addValue(r, o) {
    const l = this.values.get(r)
    o !== l &&
      (l && this.removeValue(r),
      this.bindToMotionValue(r, o),
      this.values.set(r, o),
      (this.latestValues[r] = o.get()))
  }
  removeValue(r) {
    this.values.delete(r)
    const o = this.valueSubscriptions.get(r)
    ;(o && (o(), this.valueSubscriptions.delete(r)),
      delete this.latestValues[r],
      this.removeValueFromRenderState(r, this.renderState))
  }
  hasValue(r) {
    return this.values.has(r)
  }
  getValue(r, o) {
    if (this.props.values && this.props.values[r]) return this.props.values[r]
    let l = this.values.get(r)
    return (
      l === void 0 &&
        o !== void 0 &&
        ((l = bi(o === null ? void 0 : o, { owner: this })), this.addValue(r, l)),
      l
    )
  }
  readValue(r, o) {
    var l
    let a =
      this.latestValues[r] !== void 0 || !this.current
        ? this.latestValues[r]
        : (l = this.getBaseTargetFromProps(this.props, r)) !== null && l !== void 0
          ? l
          : this.readValueFromInstance(this.current, r, this.options)
    return (
      a != null &&
        (typeof a == 'string' && (b1(a) || I1(a))
          ? (a = parseFloat(a))
          : !s4(a) && Pn.test(o) && (a = K1(r, o)),
        this.setBaseTarget(r, Qe(a) ? a.get() : a)),
      Qe(a) ? a.get() : a
    )
  }
  setBaseTarget(r, o) {
    this.baseTarget[r] = o
  }
  getBaseTarget(r) {
    var o
    const { initial: l } = this.props
    let a
    if (typeof l == 'string' || typeof l == 'object') {
      const f = Vu(
        this.props,
        l,
        (o = this.presenceContext) === null || o === void 0 ? void 0 : o.custom
      )
      f && (a = f[r])
    }
    if (l && a !== void 0) return a
    const d = this.getBaseTargetFromProps(this.props, r)
    return d !== void 0 && !Qe(d)
      ? d
      : this.initialValues[r] !== void 0 && a === void 0
        ? void 0
        : this.baseTarget[r]
  }
  on(r, o) {
    return (this.events[r] || (this.events[r] = new Qu()), this.events[r].add(o))
  }
  notify(r, ...o) {
    this.events[r] && this.events[r].notify(...o)
  }
}
class Tm extends a4 {
  constructor() {
    ;(super(...arguments), (this.KeyframeResolver = q1))
  }
  sortInstanceNodePosition(r, o) {
    return r.compareDocumentPosition(o) & 2 ? 1 : -1
  }
  getBaseTargetFromProps(r, o) {
    return r.style ? r.style[o] : void 0
  }
  removeValueFromRenderState(r, { vars: o, style: l }) {
    ;(delete o[r], delete l[r])
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription)
    const { children: r } = this.props
    Qe(r) &&
      (this.childSubscription = r.on('change', (o) => {
        this.current && (this.current.textContent = `${o}`)
      }))
  }
}
function u4(t) {
  return window.getComputedStyle(t)
}
class c4 extends Tm {
  constructor() {
    ;(super(...arguments), (this.type = 'html'), (this.renderInstance = p1))
  }
  readValueFromInstance(r, o) {
    if (bn.has(o)) {
      const l = ec(o)
      return (l && l.default) || 0
    } else {
      const l = u4(r),
        a = (f1(o) ? l.getPropertyValue(o) : l[o]) || 0
      return typeof a == 'string' ? a.trim() : a
    }
  }
  measureInstanceViewportBox(r, { transformPagePoint: o }) {
    return mm(r, o)
  }
  build(r, o, l) {
    Ou(r, o, l.transformTemplate)
  }
  scrapeMotionValuesFromProps(r, o, l) {
    return Uu(r, o, l)
  }
}
class f4 extends Tm {
  constructor() {
    ;(super(...arguments),
      (this.type = 'svg'),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = je))
  }
  getBaseTargetFromProps(r, o) {
    return r[o]
  }
  readValueFromInstance(r, o) {
    if (bn.has(o)) {
      const l = ec(o)
      return (l && l.default) || 0
    }
    return ((o = m1.has(o) ? o : _u(o)), r.getAttribute(o))
  }
  scrapeMotionValuesFromProps(r, o, l) {
    return v1(r, o, l)
  }
  build(r, o, l) {
    Iu(r, o, this.isSVGTag, l.transformTemplate)
  }
  renderInstance(r, o, l, a) {
    g1(r, o, l, a)
  }
  mount(r) {
    ;((this.isSVGTag = zu(r.tagName)), super.mount(r))
  }
}
const d4 = (t, r) => (Du(t) ? new f4(r) : new c4(r, { allowProjection: t !== _.Fragment })),
  h4 = O2({ ...N8, ...n4, ...Kk, ...r4 }, d4),
  jE = Jy(h4)
var p4 = _.createContext({ color: 'currentColor', size: '1em', weight: 'regular', mirrored: !1 }),
  lt = function (r, o, l) {
    var a = l.get(r)
    return a
      ? a(o)
      : (console.error(
          'Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".'
        ),
        null)
  }
function Dp(t, r) {
  if (t == null) return {}
  var o = {},
    l = Object.keys(t),
    a,
    d
  for (d = 0; d < l.length; d++) ((a = l[d]), !(r.indexOf(a) >= 0) && (o[a] = t[a]))
  return o
}
var et = _.forwardRef(function (t, r) {
  var o = t.alt,
    l = t.color,
    a = t.size,
    d = t.weight,
    f = t.mirrored,
    y = t.children,
    h = t.renderPath,
    p = Dp(t, ['alt', 'color', 'size', 'weight', 'mirrored', 'children', 'renderPath']),
    g = _.useContext(p4),
    k = g.color,
    E = k === void 0 ? 'currentColor' : k,
    S = g.size,
    C = g.weight,
    A = C === void 0 ? 'regular' : C,
    P = g.mirrored,
    D = P === void 0 ? !1 : P,
    V = Dp(g, ['color', 'size', 'weight', 'mirrored'])
  return m.createElement(
    'svg',
    Object.assign(
      {
        ref: r,
        xmlns: 'http://www.w3.org/2000/svg',
        width: a ?? S,
        height: a ?? S,
        fill: l ?? E,
        viewBox: '0 0 256 256',
        transform: f || D ? 'scale(-1, 1)' : void 0,
      },
      V,
      p
    ),
    !!o && m.createElement('title', null, o),
    y,
    m.createElement('rect', { width: '256', height: '256', fill: 'none' }),
    h(d ?? A, l ?? E)
  )
})
et.displayName = 'IconBase'
var Qn = new Map()
Qn.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Qn.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', { d: 'M128,128,44.9,176h-.1A96.1,96.1,0,0,1,128,32Z', opacity: '0.2' }),
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Qn.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M218.3,76.4a.8.8,0,0,1-.2-.4l-.4-.5a104,104,0,0,0-180,104.1l.2.4.3.4a104,104,0,0,0,180.1-104Zm-18.4.9L136,114.1V40.4A88.2,88.2,0,0,1,199.9,77.3ZM128,216a88,88,0,0,1-71.9-37.3L207.9,91.1A88,88,0,0,1,128,216Z',
    })
  )
})
Qn.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Qn.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Qn.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var m4 = function (r, o) {
    return lt(r, o, Qn)
  },
  g4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: m4 }))
  })
g4.displayName = 'ChartPie'
var Gn = new Map()
Gn.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M184.6,128H224a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H71.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('circle', { cx: '188', cy: '168', r: '16' })
  )
})
Gn.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('rect', {
      x: '24',
      y: '128',
      width: '208',
      height: '80',
      rx: '8',
      opacity: '0.2',
    }),
    m.createElement('path', {
      d: 'M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('circle', { cx: '188', cy: '168', r: '12' })
  )
})
Gn.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M74.3,85.7A8.1,8.1,0,0,1,85.7,74.3L120,108.7V24a8,8,0,0,1,16,0v84.7l34.3-34.4a8.1,8.1,0,0,1,11.4,11.4l-48,48a8.2,8.2,0,0,1-11.4,0ZM240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H84.4a3.6,3.6,0,0,1,2.8,1.2L111,145a24.1,24.1,0,0,0,34,0l23.8-23.8a3.6,3.6,0,0,1,2.8-1.2H224A16,16,0,0,1,240,136Zm-40,32a12,12,0,1,0-12,12A12,12,0,0,0,200,168Z',
    })
  )
})
Gn.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('circle', { cx: '188', cy: '168', r: '10' })
  )
})
Gn.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('circle', { cx: '188', cy: '168', r: '8' })
  )
})
Gn.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('circle', { cx: '188', cy: '168', r: '12' })
  )
})
var y4 = function (r, o) {
    return lt(r, o, Gn)
  },
  v4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: y4 }))
  })
v4.displayName = 'Download'
var Xn = new Map()
Xn.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Xn.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z',
      opacity: '0.2',
    }),
    m.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Xn.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M247.3,124.8c-.3-.8-8.8-19.6-27.6-38.5C194.6,61.3,162.9,48,128,48S61.4,61.3,36.3,86.3C17.5,105.2,9,124,8.7,124.8a7.9,7.9,0,0,0,0,6.4c.3.8,8.8,19.6,27.6,38.5C61.4,194.7,93.1,208,128,208s66.6-13.3,91.7-38.3c18.8-18.9,27.3-37.7,27.6-38.5A7.9,7.9,0,0,0,247.3,124.8ZM128,92a36,36,0,1,1-36,36A36,36,0,0,1,128,92Z',
    })
  )
})
Xn.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Xn.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Xn.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var k4 = function (r, o) {
    return lt(r, o, Xn)
  },
  E4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: k4 }))
  })
E4.displayName = 'Eye'
var qn = new Map()
qn.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M214.4,163.6C232.1,145.7,240,128,240,128S208,56,128,56c-3.8,0-7.4.2-11,.5',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
qn.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z',
      opacity: '0.2',
    }),
    m.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M154.9,157.6A39.6,39.6,0,0,1,128,168a40,40,0,0,1-26.9-69.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M208.6,169.1C230.4,149.6,240,128,240,128S208,56,128,56a123.9,123.9,0,0,0-20.7,1.7',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M135.5,88.7a39.9,39.9,0,0,1,32.3,35.5',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
qn.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M247.3,124.8c-.3-.8-8.8-19.6-27.6-38.5C194.6,61.3,162.9,48,128,48a132.4,132.4,0,0,0-22,1.8,8.1,8.1,0,0,0-4.6,13.3L202.7,174.5a8,8,0,0,0,5.9,2.6,8.6,8.6,0,0,0,5.4-2c22.8-20.5,32.9-42.9,33.3-43.8A8.2,8.2,0,0,0,247.3,124.8Z',
    }),
    m.createElement('path', {
      d: 'M53.9,34.6A8,8,0,0,0,42.1,45.4L61.3,66.5C25,88.8,9.4,123.2,8.7,124.8a8.2,8.2,0,0,0,0,6.5c.3.7,8.8,19.5,27.6,38.4C61.4,194.7,93.1,208,128,208a126.9,126.9,0,0,0,52.1-10.8l22,24.2A8,8,0,0,0,208,224a8.2,8.2,0,0,0,5.4-2.1,7.9,7.9,0,0,0,.5-11.3ZM128,164a36,36,0,0,1-29.5-56.6l47.2,51.9A35.4,35.4,0,0,1,128,164Z',
    })
  )
})
qn.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M154.9,157.6A39.6,39.6,0,0,1,128,168a40,40,0,0,1-26.9-69.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M208.6,169.1C230.4,149.6,240,128,240,128S208,56,128,56a123.9,123.9,0,0,0-20.7,1.7',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M135.5,88.7a39.9,39.9,0,0,1,32.3,35.5',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
qn.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M154.9,157.6A39.6,39.6,0,0,1,128,168a40,40,0,0,1-26.9-69.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M208.6,169.1C230.4,149.6,240,128,240,128S208,56,128,56a123.9,123.9,0,0,0-20.7,1.7',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M135.5,88.7a39.9,39.9,0,0,1,32.3,35.5',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
qn.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M154.9,157.6A39.6,39.6,0,0,1,128,168a40,40,0,0,1-26.9-69.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M208.6,169.1C230.4,149.6,240,128,240,128S208,56,128,56a123.9,123.9,0,0,0-20.7,1.7',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M135.5,88.7a39.9,39.9,0,0,1,32.3,35.5',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var x4 = function (r, o) {
    return lt(r, o, qn)
  },
  w4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: x4 }))
  })
w4.displayName = 'EyeSlash'
var Jn = new Map()
Jn.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Jn.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      opacity: '0.2',
    }),
    m.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Jn.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M240,160v24a16,16,0,0,1-16,16H115.5a4,4,0,0,1-3.2-6.4L178,108a8.2,8.2,0,0,0-1.1-11.3A7.9,7.9,0,0,0,165.5,98L88.4,198.4a3.8,3.8,0,0,1-3.1,1.6H32a16,16,0,0,1-16-16V161.1a116.1,116.1,0,0,1,2.2-22.2L40.9,145l2.1.2a8,8,0,0,0,7.8-6.2,8.1,8.1,0,0,0-6-9.6l-22.4-6C37,82,74.9,51.5,120,48.3V71.7a8.2,8.2,0,0,0,7.5,8.3,8,8,0,0,0,8.5-8V48.3a111.5,111.5,0,0,1,71.1,32.4,112.7,112.7,0,0,1,26.8,42.6l-22.7,6.1a8.1,8.1,0,0,0-6,9.6,8,8,0,0,0,7.8,6.2l2.1-.2,22.9-6.2A114.5,114.5,0,0,1,240,160Z',
    })
  )
})
Jn.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Jn.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Jn.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var L4 = function (r, o) {
    return lt(r, o, Jn)
  },
  S4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: L4 }))
  })
S4.displayName = 'Gauge'
var er = new Map()
er.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '136',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '136',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '136',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
er.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
er.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM86.6,42.1l-29.3,27-11.9-11A8,8,0,0,0,34.6,69.9l17.3,16A8,8,0,0,0,57.3,88a8.2,8.2,0,0,0,5.5-2.1l34.6-32A8,8,0,1,0,86.6,42.1Zm0,64-29.3,27-11.9-11a8,8,0,1,0-10.8,11.8l17.3,16a8,8,0,0,0,5.4,2.1,8.2,8.2,0,0,0,5.5-2.1l34.6-32a8,8,0,1,0-10.8-11.8Zm0,64-29.3,27-11.9-11a8,8,0,1,0-10.8,11.8l17.3,16a8,8,0,0,0,5.4,2.1,8.2,8.2,0,0,0,5.5-2.1l34.6-32a8,8,0,0,0-10.8-11.8Z',
    })
  )
})
er.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
er.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
er.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var P4 = function (r, o) {
    return lt(r, o, er)
  },
  C4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: P4 }))
  })
C4.displayName = 'ListChecks'
var tr = new Map()
tr.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('rect', {
      x: '48',
      y: '48',
      width: '60',
      height: '60',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('rect', {
      x: '48',
      y: '148',
      width: '60',
      height: '60',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('rect', {
      x: '148',
      y: '48',
      width: '60',
      height: '60',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '148',
      y1: '148',
      x2: '148',
      y2: '172',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('polyline', {
      points: '148 208 184 208 184 148',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '184',
      y1: '164',
      x2: '208',
      y2: '164',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
tr.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      opacity: '0.2',
    }),
    m.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      opacity: '0.2',
    }),
    m.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      opacity: '0.2',
    }),
    m.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '144',
      y1: '144',
      x2: '144',
      y2: '176',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '144 208 176 208 176 144',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '176',
      y1: '160',
      x2: '208',
      y2: '160',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '208',
      y1: '192',
      x2: '208',
      y2: '208',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
tr.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('rect', { x: '40', y: '40', width: '80', height: '80', rx: '16' }),
    m.createElement('rect', { x: '40', y: '136', width: '80', height: '80', rx: '16' }),
    m.createElement('rect', { x: '136', y: '40', width: '80', height: '80', rx: '16' }),
    m.createElement('path', {
      d: 'M144,184a8,8,0,0,0,8-8V144a8,8,0,0,0-16,0v32A8,8,0,0,0,144,184Z',
    }),
    m.createElement('path', {
      d: 'M208,152H184v-8a8,8,0,0,0-16,0v56H144a8,8,0,0,0,0,16h32a8,8,0,0,0,8-8V168h24a8,8,0,0,0,0-16Z',
    }),
    m.createElement('path', {
      d: 'M208,184a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V192A8,8,0,0,0,208,184Z',
    })
  )
})
tr.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '144',
      y1: '144',
      x2: '144',
      y2: '176',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('polyline', {
      points: '144 208 176 208 176 144',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '176',
      y1: '160',
      x2: '208',
      y2: '160',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '208',
      y1: '192',
      x2: '208',
      y2: '208',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
tr.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '144',
      y1: '144',
      x2: '144',
      y2: '176',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('polyline', {
      points: '144 208 176 208 176 144',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '176',
      y1: '160',
      x2: '208',
      y2: '160',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '208',
      y1: '192',
      x2: '208',
      y2: '208',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
tr.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '144',
      y1: '144',
      x2: '144',
      y2: '176',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '144 208 176 208 176 144',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '176',
      y1: '160',
      x2: '208',
      y2: '160',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '208',
      y1: '192',
      x2: '208',
      y2: '208',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var T4 = function (r, o) {
    return lt(r, o, tr)
  },
  M4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: T4 }))
  })
M4.displayName = 'QrCode'
var nr = new Map()
nr.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
nr.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      opacity: '0.2',
    }),
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
nr.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M208,40H48A16,16,0,0,0,32,56v58.7c0,89.4,75.8,119.1,91,124.1a16,16,0,0,0,10,0c15.2-5,91-34.7,91-124.1V56A16,16,0,0,0,208,40Z',
    })
  )
})
nr.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
nr.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
nr.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var A4 = function (r, o) {
    return lt(r, o, nr)
  },
  R4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: A4 }))
  })
R4.displayName = 'Shield'
var rr = new Map()
rr.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
rr.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      opacity: '0.2',
    }),
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
rr.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M208,40H48A16,16,0,0,0,32,56v58.7c0,89.4,75.8,119.1,91,124.1a16,16,0,0,0,10,0c15.2-5,91-34.7,91-124.1V56A16,16,0,0,0,208,40Zm-30.5,69.8-58.6,56a8.1,8.1,0,0,1-5.6,2.2,7.9,7.9,0,0,1-5.5-2.2l-29.3-28a8,8,0,1,1,11-11.6l23.8,22.7,53.2-50.7a8,8,0,0,1,11,11.6Z',
    })
  )
})
rr.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
rr.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
rr.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var j4 = function (r, o) {
    return lt(r, o, rr)
  },
  _4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: j4 }))
  })
_4.displayName = 'ShieldCheck'
var ir = new Map()
ir.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
ir.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      opacity: '0.2',
    }),
    m.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
ir.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M208.9,144a15.8,15.8,0,0,1-10.5,15l-52.2,19.2L127,230.4a16,16,0,0,1-30,0L77.8,178.2,25.6,159a16,16,0,0,1,0-30l52.2-19.2L97,57.6a16,16,0,0,1,30,0l19.2,52.2L198.4,129A15.8,15.8,0,0,1,208.9,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z',
    })
  )
})
ir.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
ir.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
ir.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var F4 = function (r, o) {
    return lt(r, o, ir)
  },
  D4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: F4 }))
  })
D4.displayName = 'Sparkle'
var or = new Map()
or.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,0,67.8,47.1,47.1,0,0,0,13.2-24.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M195.9,60.1A96.1,96.1,0,1,0,218,94.6',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
or.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', { cx: '128', cy: '128', r: '48', opacity: '0.2' }),
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,14,31.2',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
or.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M211.2,79.4a8,8,0,0,0-3.8,10.7,88,88,0,1,1-23.1-29.7L161.5,83.2a56,56,0,0,0-73.1,84.4h0a56,56,0,0,0,95.5-42.8,7.9,7.9,0,0,0-8.4-7.5,8,8,0,0,0-7.6,8.4,40,40,0,0,1-62,35.7l24-24,37.7-37.7h0l62.1-62a8.1,8.1,0,0,0-11.4-11.4L195.7,49A104,104,0,0,0,54.5,54.5a103.8,103.8,0,0,0,0,147,103.8,103.8,0,0,0,147,0A104,104,0,0,0,221.9,83.2,8,8,0,0,0,211.2,79.4Z',
    })
  )
})
or.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,14,31.2',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
or.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,14,31.2',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
or.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,14,31.2',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var V4 = function (r, o) {
    return lt(r, o, or)
  },
  N4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: V4 }))
  })
N4.displayName = 'Target'
var sr = new Map()
sr.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
sr.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
sr.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M240,56v64a8,8,0,0,1-4.9,7.4,8.5,8.5,0,0,1-3.1.6,8.3,8.3,0,0,1-5.7-2.3L200,99.3l-58.3,58.4a8.1,8.1,0,0,1-11.4,0L96,123.3,29.7,189.7A8.3,8.3,0,0,1,24,192a8.5,8.5,0,0,1-5.7-2.3,8.1,8.1,0,0,1,0-11.4l72-72a8.1,8.1,0,0,1,11.4,0L136,140.7,188.7,88,162.3,61.7a8.4,8.4,0,0,1-1.7-8.8A8.1,8.1,0,0,1,168,48h64A8,8,0,0,1,240,56Z',
    })
  )
})
sr.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
sr.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
sr.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var W4 = function (r, o) {
    return lt(r, o, sr)
  },
  O4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: W4 }))
  })
O4.displayName = 'TrendUp'
var lr = new Map()
lr.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M204.5,116.6A60.1,60.1,0,0,1,244,140',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M167.1,70.2A32,32,0,1,1,204,115',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M52,115A32,32,0,1,1,88.9,70.2',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M12,140a60.1,60.1,0,0,1,39.5-23.4',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
lr.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', { cx: '128', cy: '140', r: '40', opacity: '0.2' }),
    m.createElement('circle', { cx: '60', cy: '84', r: '32', opacity: '0.2' }),
    m.createElement('circle', { cx: '196', cy: '84', r: '32', opacity: '0.2' }),
    m.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M196,116a59.8,59.8,0,0,1,48,24',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M12,140a59.8,59.8,0,0,1,48-24',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M60,116A32,32,0,1,1,91.4,78',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M164.6,78A32,32,0,1,1,196,116',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
lr.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M64,140a7.9,7.9,0,0,1-8,8H12a8.2,8.2,0,0,1-7.2-4.4,8.2,8.2,0,0,1,.8-8.4A67.8,67.8,0,0,1,33,113.5a40,40,0,1,1,66.3-37,8.1,8.1,0,0,1-3.8,8.4,64.3,64.3,0,0,0-27.8,33.8A61.6,61.6,0,0,0,64,140Zm186.4-4.8A67.8,67.8,0,0,0,223,113.5a40,40,0,1,0-66.3-37,8.1,8.1,0,0,0,3.8,8.4,64,64,0,0,1,27.8,33.8A61.6,61.6,0,0,1,192,140a7.9,7.9,0,0,0,8,8h44a8,8,0,0,0,6.4-12.8Zm-93.2,42.9a48,48,0,1,0-58.4,0,72.1,72.1,0,0,0-35.6,34.4,7.8,7.8,0,0,0,.5,7.7,7.8,7.8,0,0,0,6.7,3.8H185.6a7.8,7.8,0,0,0,6.7-3.8,7.8,7.8,0,0,0,.5-7.7A72.1,72.1,0,0,0,157.2,178.1Z',
    })
  )
})
lr.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M196,116a59.8,59.8,0,0,1,48,24',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M12,140a59.8,59.8,0,0,1,48-24',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M60,116A32,32,0,1,1,91.4,78',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M164.6,78A32,32,0,1,1,196,116',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
lr.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M196,116a59.8,59.8,0,0,1,48,24',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M12,140a59.8,59.8,0,0,1,48-24',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M60,116A32,32,0,1,1,91.4,78',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M164.6,78A32,32,0,1,1,196,116',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
lr.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M196,116a59.8,59.8,0,0,1,48,24',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M12,140a59.8,59.8,0,0,1,48-24',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M60,116A32,32,0,1,1,91.4,78',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M164.6,78A32,32,0,1,1,196,116',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var I4 = function (r, o) {
    return lt(r, o, lr)
  },
  B4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: I4 }))
  })
B4.displayName = 'UsersThree'
var ar = new Map()
ar.set('bold', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '104',
      x2: '128',
      y2: '136',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    m.createElement('circle', { cx: '128', cy: '176', r: '16' })
  )
})
ar.set('duotone', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      opacity: '0.2',
    }),
    m.createElement('line', {
      x1: '128',
      y1: '112',
      x2: '128',
      y2: '144',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('circle', { cx: '128', cy: '180', r: '12' })
  )
})
ar.set('fill', function () {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('path', {
      d: 'M236.7,188,148.8,36a24,24,0,0,0-41.6,0h0L19.3,188A23.9,23.9,0,0,0,40,224H216a23.9,23.9,0,0,0,20.7-36ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z',
    })
  )
})
ar.set('light', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '104',
      x2: '128',
      y2: '144',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    m.createElement('circle', { cx: '128', cy: '180', r: '10' })
  )
})
ar.set('thin', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '104',
      x2: '128',
      y2: '144',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    m.createElement('circle', { cx: '128', cy: '180', r: '8' })
  )
})
ar.set('regular', function (t) {
  return m.createElement(
    m.Fragment,
    null,
    m.createElement('line', {
      x1: '128',
      y1: '104',
      x2: '128',
      y2: '144',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: t,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    m.createElement('circle', { cx: '128', cy: '180', r: '12' })
  )
})
var z4 = function (r, o) {
    return lt(r, o, ar)
  },
  U4 = _.forwardRef(function (t, r) {
    return m.createElement(et, Object.assign({ ref: r }, t, { renderPath: z4 }))
  })
U4.displayName = 'Warning'
function to(t) {
  return (t + 0.5) | 0
}
const xn = (t, r, o) => Math.max(Math.min(t, o), r)
function Oi(t) {
  return xn(to(t * 2.55), 0, 255)
}
function Ln(t) {
  return xn(to(t * 255), 0, 255)
}
function bt(t) {
  return xn(to(t / 2.55) / 100, 0, 1)
}
function Vp(t) {
  return xn(to(t * 100), 0, 100)
}
const Lt = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
  },
  wu = [...'0123456789ABCDEF'],
  H4 = (t) => wu[t & 15],
  $4 = (t) => wu[(t & 240) >> 4] + wu[t & 15],
  ys = (t) => (t & 240) >> 4 === (t & 15),
  K4 = (t) => ys(t.r) && ys(t.g) && ys(t.b) && ys(t.a)
function Z4(t) {
  var r = t.length,
    o
  return (
    t[0] === '#' &&
      (r === 4 || r === 5
        ? (o = {
            r: 255 & (Lt[t[1]] * 17),
            g: 255 & (Lt[t[2]] * 17),
            b: 255 & (Lt[t[3]] * 17),
            a: r === 5 ? Lt[t[4]] * 17 : 255,
          })
        : (r === 7 || r === 9) &&
          (o = {
            r: (Lt[t[1]] << 4) | Lt[t[2]],
            g: (Lt[t[3]] << 4) | Lt[t[4]],
            b: (Lt[t[5]] << 4) | Lt[t[6]],
            a: r === 9 ? (Lt[t[7]] << 4) | Lt[t[8]] : 255,
          })),
    o
  )
}
const Y4 = (t, r) => (t < 255 ? r(t) : '')
function b4(t) {
  var r = K4(t) ? H4 : $4
  return t ? '#' + r(t.r) + r(t.g) + r(t.b) + Y4(t.a, r) : void 0
}
const Q4 =
  /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/
function Mm(t, r, o) {
  const l = r * Math.min(o, 1 - o),
    a = (d, f = (d + t / 30) % 12) => o - l * Math.max(Math.min(f - 3, 9 - f, 1), -1)
  return [a(0), a(8), a(4)]
}
function G4(t, r, o) {
  const l = (a, d = (a + t / 60) % 6) => o - o * r * Math.max(Math.min(d, 4 - d, 1), 0)
  return [l(5), l(3), l(1)]
}
function X4(t, r, o) {
  const l = Mm(t, 1, 0.5)
  let a
  for (r + o > 1 && ((a = 1 / (r + o)), (r *= a), (o *= a)), a = 0; a < 3; a++)
    ((l[a] *= 1 - r - o), (l[a] += r))
  return l
}
function q4(t, r, o, l, a) {
  return t === a ? (r - o) / l + (r < o ? 6 : 0) : r === a ? (o - t) / l + 2 : (t - r) / l + 4
}
function oc(t) {
  const o = t.r / 255,
    l = t.g / 255,
    a = t.b / 255,
    d = Math.max(o, l, a),
    f = Math.min(o, l, a),
    y = (d + f) / 2
  let h, p, g
  return (
    d !== f &&
      ((g = d - f),
      (p = y > 0.5 ? g / (2 - d - f) : g / (d + f)),
      (h = q4(o, l, a, g, d)),
      (h = h * 60 + 0.5)),
    [h | 0, p || 0, y]
  )
}
function sc(t, r, o, l) {
  return (Array.isArray(r) ? t(r[0], r[1], r[2]) : t(r, o, l)).map(Ln)
}
function lc(t, r, o) {
  return sc(Mm, t, r, o)
}
function J4(t, r, o) {
  return sc(X4, t, r, o)
}
function eE(t, r, o) {
  return sc(G4, t, r, o)
}
function Am(t) {
  return ((t % 360) + 360) % 360
}
function tE(t) {
  const r = Q4.exec(t)
  let o = 255,
    l
  if (!r) return
  r[5] !== l && (o = r[6] ? Oi(+r[5]) : Ln(+r[5]))
  const a = Am(+r[2]),
    d = +r[3] / 100,
    f = +r[4] / 100
  return (
    r[1] === 'hwb' ? (l = J4(a, d, f)) : r[1] === 'hsv' ? (l = eE(a, d, f)) : (l = lc(a, d, f)),
    { r: l[0], g: l[1], b: l[2], a: o }
  )
}
function nE(t, r) {
  var o = oc(t)
  ;((o[0] = Am(o[0] + r)), (o = lc(o)), (t.r = o[0]), (t.g = o[1]), (t.b = o[2]))
}
function rE(t) {
  if (!t) return
  const r = oc(t),
    o = r[0],
    l = Vp(r[1]),
    a = Vp(r[2])
  return t.a < 255 ? `hsla(${o}, ${l}%, ${a}%, ${bt(t.a)})` : `hsl(${o}, ${l}%, ${a}%)`
}
const Np = {
    x: 'dark',
    Z: 'light',
    Y: 're',
    X: 'blu',
    W: 'gr',
    V: 'medium',
    U: 'slate',
    A: 'ee',
    T: 'ol',
    S: 'or',
    B: 'ra',
    C: 'lateg',
    D: 'ights',
    R: 'in',
    Q: 'turquois',
    E: 'hi',
    P: 'ro',
    O: 'al',
    N: 'le',
    M: 'de',
    L: 'yello',
    F: 'en',
    K: 'ch',
    G: 'arks',
    H: 'ea',
    I: 'ightg',
    J: 'wh',
  },
  Wp = {
    OiceXe: 'f0f8ff',
    antiquewEte: 'faebd7',
    aqua: 'ffff',
    aquamarRe: '7fffd4',
    azuY: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '0',
    blanKedOmond: 'ffebcd',
    Xe: 'ff',
    XeviTet: '8a2be2',
    bPwn: 'a52a2a',
    burlywood: 'deb887',
    caMtXe: '5f9ea0',
    KartYuse: '7fff00',
    KocTate: 'd2691e',
    cSO: 'ff7f50',
    cSnflowerXe: '6495ed',
    cSnsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: 'ffff',
    xXe: '8b',
    xcyan: '8b8b',
    xgTMnPd: 'b8860b',
    xWay: 'a9a9a9',
    xgYF: '6400',
    xgYy: 'a9a9a9',
    xkhaki: 'bdb76b',
    xmagFta: '8b008b',
    xTivegYF: '556b2f',
    xSange: 'ff8c00',
    xScEd: '9932cc',
    xYd: '8b0000',
    xsOmon: 'e9967a',
    xsHgYF: '8fbc8f',
    xUXe: '483d8b',
    xUWay: '2f4f4f',
    xUgYy: '2f4f4f',
    xQe: 'ced1',
    xviTet: '9400d3',
    dAppRk: 'ff1493',
    dApskyXe: 'bfff',
    dimWay: '696969',
    dimgYy: '696969',
    dodgerXe: '1e90ff',
    fiYbrick: 'b22222',
    flSOwEte: 'fffaf0',
    foYstWAn: '228b22',
    fuKsia: 'ff00ff',
    gaRsbSo: 'dcdcdc',
    ghostwEte: 'f8f8ff',
    gTd: 'ffd700',
    gTMnPd: 'daa520',
    Way: '808080',
    gYF: '8000',
    gYFLw: 'adff2f',
    gYy: '808080',
    honeyMw: 'f0fff0',
    hotpRk: 'ff69b4',
    RdianYd: 'cd5c5c',
    Rdigo: '4b0082',
    ivSy: 'fffff0',
    khaki: 'f0e68c',
    lavFMr: 'e6e6fa',
    lavFMrXsh: 'fff0f5',
    lawngYF: '7cfc00',
    NmoncEffon: 'fffacd',
    ZXe: 'add8e6',
    ZcSO: 'f08080',
    Zcyan: 'e0ffff',
    ZgTMnPdLw: 'fafad2',
    ZWay: 'd3d3d3',
    ZgYF: '90ee90',
    ZgYy: 'd3d3d3',
    ZpRk: 'ffb6c1',
    ZsOmon: 'ffa07a',
    ZsHgYF: '20b2aa',
    ZskyXe: '87cefa',
    ZUWay: '778899',
    ZUgYy: '778899',
    ZstAlXe: 'b0c4de',
    ZLw: 'ffffe0',
    lime: 'ff00',
    limegYF: '32cd32',
    lRF: 'faf0e6',
    magFta: 'ff00ff',
    maPon: '800000',
    VaquamarRe: '66cdaa',
    VXe: 'cd',
    VScEd: 'ba55d3',
    VpurpN: '9370db',
    VsHgYF: '3cb371',
    VUXe: '7b68ee',
    VsprRggYF: 'fa9a',
    VQe: '48d1cc',
    VviTetYd: 'c71585',
    midnightXe: '191970',
    mRtcYam: 'f5fffa',
    mistyPse: 'ffe4e1',
    moccasR: 'ffe4b5',
    navajowEte: 'ffdead',
    navy: '80',
    Tdlace: 'fdf5e6',
    Tive: '808000',
    TivedBb: '6b8e23',
    Sange: 'ffa500',
    SangeYd: 'ff4500',
    ScEd: 'da70d6',
    pOegTMnPd: 'eee8aa',
    pOegYF: '98fb98',
    pOeQe: 'afeeee',
    pOeviTetYd: 'db7093',
    papayawEp: 'ffefd5',
    pHKpuff: 'ffdab9',
    peru: 'cd853f',
    pRk: 'ffc0cb',
    plum: 'dda0dd',
    powMrXe: 'b0e0e6',
    purpN: '800080',
    YbeccapurpN: '663399',
    Yd: 'ff0000',
    Psybrown: 'bc8f8f',
    PyOXe: '4169e1',
    saddNbPwn: '8b4513',
    sOmon: 'fa8072',
    sandybPwn: 'f4a460',
    sHgYF: '2e8b57',
    sHshell: 'fff5ee',
    siFna: 'a0522d',
    silver: 'c0c0c0',
    skyXe: '87ceeb',
    UXe: '6a5acd',
    UWay: '708090',
    UgYy: '708090',
    snow: 'fffafa',
    sprRggYF: 'ff7f',
    stAlXe: '4682b4',
    tan: 'd2b48c',
    teO: '8080',
    tEstN: 'd8bfd8',
    tomato: 'ff6347',
    Qe: '40e0d0',
    viTet: 'ee82ee',
    JHt: 'f5deb3',
    wEte: 'ffffff',
    wEtesmoke: 'f5f5f5',
    Lw: 'ffff00',
    LwgYF: '9acd32',
  }
function iE() {
  const t = {},
    r = Object.keys(Wp),
    o = Object.keys(Np)
  let l, a, d, f, y
  for (l = 0; l < r.length; l++) {
    for (f = y = r[l], a = 0; a < o.length; a++) ((d = o[a]), (y = y.replace(d, Np[d])))
    ;((d = parseInt(Wp[f], 16)), (t[y] = [(d >> 16) & 255, (d >> 8) & 255, d & 255]))
  }
  return t
}
let vs
function oE(t) {
  vs || ((vs = iE()), (vs.transparent = [0, 0, 0, 0]))
  const r = vs[t.toLowerCase()]
  return r && { r: r[0], g: r[1], b: r[2], a: r.length === 4 ? r[3] : 255 }
}
const sE =
  /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/
function lE(t) {
  const r = sE.exec(t)
  let o = 255,
    l,
    a,
    d
  if (r) {
    if (r[7] !== l) {
      const f = +r[7]
      o = r[8] ? Oi(f) : xn(f * 255, 0, 255)
    }
    return (
      (l = +r[1]),
      (a = +r[3]),
      (d = +r[5]),
      (l = 255 & (r[2] ? Oi(l) : xn(l, 0, 255))),
      (a = 255 & (r[4] ? Oi(a) : xn(a, 0, 255))),
      (d = 255 & (r[6] ? Oi(d) : xn(d, 0, 255))),
      { r: l, g: a, b: d, a: o }
    )
  }
}
function aE(t) {
  return (
    t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${bt(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`)
  )
}
const eu = (t) => (t <= 0.0031308 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055),
  Dr = (t) => (t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4))
function uE(t, r, o) {
  const l = Dr(bt(t.r)),
    a = Dr(bt(t.g)),
    d = Dr(bt(t.b))
  return {
    r: Ln(eu(l + o * (Dr(bt(r.r)) - l))),
    g: Ln(eu(a + o * (Dr(bt(r.g)) - a))),
    b: Ln(eu(d + o * (Dr(bt(r.b)) - d))),
    a: t.a + o * (r.a - t.a),
  }
}
function ks(t, r, o) {
  if (t) {
    let l = oc(t)
    ;((l[r] = Math.max(0, Math.min(l[r] + l[r] * o, r === 0 ? 360 : 1))),
      (l = lc(l)),
      (t.r = l[0]),
      (t.g = l[1]),
      (t.b = l[2]))
  }
}
function Rm(t, r) {
  return t && Object.assign(r || {}, t)
}
function Op(t) {
  var r = { r: 0, g: 0, b: 0, a: 255 }
  return (
    Array.isArray(t)
      ? t.length >= 3 &&
        ((r = { r: t[0], g: t[1], b: t[2], a: 255 }), t.length > 3 && (r.a = Ln(t[3])))
      : ((r = Rm(t, { r: 0, g: 0, b: 0, a: 1 })), (r.a = Ln(r.a))),
    r
  )
}
function cE(t) {
  return t.charAt(0) === 'r' ? lE(t) : tE(t)
}
class Lu {
  constructor(r) {
    if (r instanceof Lu) return r
    const o = typeof r
    let l
    ;(o === 'object' ? (l = Op(r)) : o === 'string' && (l = Z4(r) || oE(r) || cE(r)),
      (this._rgb = l),
      (this._valid = !!l))
  }
  get valid() {
    return this._valid
  }
  get rgb() {
    var r = Rm(this._rgb)
    return (r && (r.a = bt(r.a)), r)
  }
  set rgb(r) {
    this._rgb = Op(r)
  }
  rgbString() {
    return this._valid ? aE(this._rgb) : void 0
  }
  hexString() {
    return this._valid ? b4(this._rgb) : void 0
  }
  hslString() {
    return this._valid ? rE(this._rgb) : void 0
  }
  mix(r, o) {
    if (r) {
      const l = this.rgb,
        a = r.rgb
      let d
      const f = o === d ? 0.5 : o,
        y = 2 * f - 1,
        h = l.a - a.a,
        p = ((y * h === -1 ? y : (y + h) / (1 + y * h)) + 1) / 2
      ;((d = 1 - p),
        (l.r = 255 & (p * l.r + d * a.r + 0.5)),
        (l.g = 255 & (p * l.g + d * a.g + 0.5)),
        (l.b = 255 & (p * l.b + d * a.b + 0.5)),
        (l.a = f * l.a + (1 - f) * a.a),
        (this.rgb = l))
    }
    return this
  }
  interpolate(r, o) {
    return (r && (this._rgb = uE(this._rgb, r._rgb, o)), this)
  }
  clone() {
    return new Lu(this.rgb)
  }
  alpha(r) {
    return ((this._rgb.a = Ln(r)), this)
  }
  clearer(r) {
    const o = this._rgb
    return ((o.a *= 1 - r), this)
  }
  greyscale() {
    const r = this._rgb,
      o = to(r.r * 0.3 + r.g * 0.59 + r.b * 0.11)
    return ((r.r = r.g = r.b = o), this)
  }
  opaquer(r) {
    const o = this._rgb
    return ((o.a *= 1 + r), this)
  }
  negate() {
    const r = this._rgb
    return ((r.r = 255 - r.r), (r.g = 255 - r.g), (r.b = 255 - r.b), this)
  }
  lighten(r) {
    return (ks(this._rgb, 2, r), this)
  }
  darken(r) {
    return (ks(this._rgb, 2, -r), this)
  }
  saturate(r) {
    return (ks(this._rgb, 1, r), this)
  }
  desaturate(r) {
    return (ks(this._rgb, 1, -r), this)
  }
  rotate(r) {
    return (nE(this._rgb, r), this)
  }
}
var fE = Object.defineProperty,
  _s = Object.getOwnPropertySymbols,
  jm = Object.prototype.hasOwnProperty,
  _m = Object.prototype.propertyIsEnumerable,
  Ip = (t, r, o) =>
    r in t ? fE(t, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (t[r] = o),
  Bp = (t, r) => {
    for (var o in r || (r = {})) jm.call(r, o) && Ip(t, o, r[o])
    if (_s) for (var o of _s(r)) _m.call(r, o) && Ip(t, o, r[o])
    return t
  },
  dE = (t, r) => {
    var o = {}
    for (var l in t) jm.call(t, l) && r.indexOf(l) < 0 && (o[l] = t[l])
    if (t != null && _s) for (var l of _s(t)) r.indexOf(l) < 0 && _m.call(t, l) && (o[l] = t[l])
    return o
  }
var Zn
;((t) => {
  const r = class {
    constructor(h, p, g, k) {
      if (
        ((this.version = h),
        (this.errorCorrectionLevel = p),
        (this.modules = []),
        (this.isFunction = []),
        h < r.MIN_VERSION || h > r.MAX_VERSION)
      )
        throw new RangeError('Version value out of range')
      if (k < -1 || k > 7) throw new RangeError('Mask value out of range')
      this.size = h * 4 + 17
      let E = []
      for (let C = 0; C < this.size; C++) E.push(!1)
      for (let C = 0; C < this.size; C++)
        (this.modules.push(E.slice()), this.isFunction.push(E.slice()))
      this.drawFunctionPatterns()
      const S = this.addEccAndInterleave(g)
      if ((this.drawCodewords(S), k == -1)) {
        let C = 1e9
        for (let A = 0; A < 8; A++) {
          ;(this.applyMask(A), this.drawFormatBits(A))
          const P = this.getPenaltyScore()
          ;(P < C && ((k = A), (C = P)), this.applyMask(A))
        }
      }
      ;(d(0 <= k && k <= 7),
        (this.mask = k),
        this.applyMask(k),
        this.drawFormatBits(k),
        (this.isFunction = []))
    }
    static encodeText(h, p) {
      const g = t.QrSegment.makeSegments(h)
      return r.encodeSegments(g, p)
    }
    static encodeBinary(h, p) {
      const g = t.QrSegment.makeBytes(h)
      return r.encodeSegments([g], p)
    }
    static encodeSegments(h, p, g = 1, k = 40, E = -1, S = !0) {
      if (!(r.MIN_VERSION <= g && g <= k && k <= r.MAX_VERSION) || E < -1 || E > 7)
        throw new RangeError('Invalid value')
      let C, A
      for (C = g; ; C++) {
        const F = r.getNumDataCodewords(C, p) * 8,
          z = y.getTotalBits(h, C)
        if (z <= F) {
          A = z
          break
        }
        if (C >= k) throw new RangeError('Data too long')
      }
      for (const F of [r.Ecc.MEDIUM, r.Ecc.QUARTILE, r.Ecc.HIGH])
        S && A <= r.getNumDataCodewords(C, F) * 8 && (p = F)
      let P = []
      for (const F of h) {
        ;(l(F.mode.modeBits, 4, P), l(F.numChars, F.mode.numCharCountBits(C), P))
        for (const z of F.getData()) P.push(z)
      }
      d(P.length == A)
      const D = r.getNumDataCodewords(C, p) * 8
      ;(d(P.length <= D),
        l(0, Math.min(4, D - P.length), P),
        l(0, (8 - (P.length % 8)) % 8, P),
        d(P.length % 8 == 0))
      for (let F = 236; P.length < D; F ^= 253) l(F, 8, P)
      let V = []
      for (; V.length * 8 < P.length; ) V.push(0)
      return (P.forEach((F, z) => (V[z >>> 3] |= F << (7 - (z & 7)))), new r(C, p, V, E))
    }
    getModule(h, p) {
      return 0 <= h && h < this.size && 0 <= p && p < this.size && this.modules[p][h]
    }
    getModules() {
      return this.modules
    }
    drawFunctionPatterns() {
      for (let g = 0; g < this.size; g++)
        (this.setFunctionModule(6, g, g % 2 == 0), this.setFunctionModule(g, 6, g % 2 == 0))
      ;(this.drawFinderPattern(3, 3),
        this.drawFinderPattern(this.size - 4, 3),
        this.drawFinderPattern(3, this.size - 4))
      const h = this.getAlignmentPatternPositions(),
        p = h.length
      for (let g = 0; g < p; g++)
        for (let k = 0; k < p; k++)
          (g == 0 && k == 0) ||
            (g == 0 && k == p - 1) ||
            (g == p - 1 && k == 0) ||
            this.drawAlignmentPattern(h[g], h[k])
      ;(this.drawFormatBits(0), this.drawVersion())
    }
    drawFormatBits(h) {
      const p = (this.errorCorrectionLevel.formatBits << 3) | h
      let g = p
      for (let E = 0; E < 10; E++) g = (g << 1) ^ ((g >>> 9) * 1335)
      const k = ((p << 10) | g) ^ 21522
      d(k >>> 15 == 0)
      for (let E = 0; E <= 5; E++) this.setFunctionModule(8, E, a(k, E))
      ;(this.setFunctionModule(8, 7, a(k, 6)),
        this.setFunctionModule(8, 8, a(k, 7)),
        this.setFunctionModule(7, 8, a(k, 8)))
      for (let E = 9; E < 15; E++) this.setFunctionModule(14 - E, 8, a(k, E))
      for (let E = 0; E < 8; E++) this.setFunctionModule(this.size - 1 - E, 8, a(k, E))
      for (let E = 8; E < 15; E++) this.setFunctionModule(8, this.size - 15 + E, a(k, E))
      this.setFunctionModule(8, this.size - 8, !0)
    }
    drawVersion() {
      if (this.version < 7) return
      let h = this.version
      for (let g = 0; g < 12; g++) h = (h << 1) ^ ((h >>> 11) * 7973)
      const p = (this.version << 12) | h
      d(p >>> 18 == 0)
      for (let g = 0; g < 18; g++) {
        const k = a(p, g),
          E = this.size - 11 + (g % 3),
          S = Math.floor(g / 3)
        ;(this.setFunctionModule(E, S, k), this.setFunctionModule(S, E, k))
      }
    }
    drawFinderPattern(h, p) {
      for (let g = -4; g <= 4; g++)
        for (let k = -4; k <= 4; k++) {
          const E = Math.max(Math.abs(k), Math.abs(g)),
            S = h + k,
            C = p + g
          0 <= S &&
            S < this.size &&
            0 <= C &&
            C < this.size &&
            this.setFunctionModule(S, C, E != 2 && E != 4)
        }
    }
    drawAlignmentPattern(h, p) {
      for (let g = -2; g <= 2; g++)
        for (let k = -2; k <= 2; k++)
          this.setFunctionModule(h + k, p + g, Math.max(Math.abs(k), Math.abs(g)) != 1)
    }
    setFunctionModule(h, p, g) {
      ;((this.modules[p][h] = g), (this.isFunction[p][h] = !0))
    }
    addEccAndInterleave(h) {
      const p = this.version,
        g = this.errorCorrectionLevel
      if (h.length != r.getNumDataCodewords(p, g)) throw new RangeError('Invalid argument')
      const k = r.NUM_ERROR_CORRECTION_BLOCKS[g.ordinal][p],
        E = r.ECC_CODEWORDS_PER_BLOCK[g.ordinal][p],
        S = Math.floor(r.getNumRawDataModules(p) / 8),
        C = k - (S % k),
        A = Math.floor(S / k)
      let P = []
      const D = r.reedSolomonComputeDivisor(E)
      for (let F = 0, z = 0; F < k; F++) {
        let H = h.slice(z, z + A - E + (F < C ? 0 : 1))
        z += H.length
        const q = r.reedSolomonComputeRemainder(H, D)
        ;(F < C && H.push(0), P.push(H.concat(q)))
      }
      let V = []
      for (let F = 0; F < P[0].length; F++)
        P.forEach((z, H) => {
          ;(F != A - E || H >= C) && V.push(z[F])
        })
      return (d(V.length == S), V)
    }
    drawCodewords(h) {
      if (h.length != Math.floor(r.getNumRawDataModules(this.version) / 8))
        throw new RangeError('Invalid argument')
      let p = 0
      for (let g = this.size - 1; g >= 1; g -= 2) {
        g == 6 && (g = 5)
        for (let k = 0; k < this.size; k++)
          for (let E = 0; E < 2; E++) {
            const S = g - E,
              A = ((g + 1) & 2) == 0 ? this.size - 1 - k : k
            !this.isFunction[A][S] &&
              p < h.length * 8 &&
              ((this.modules[A][S] = a(h[p >>> 3], 7 - (p & 7))), p++)
          }
      }
      d(p == h.length * 8)
    }
    applyMask(h) {
      if (h < 0 || h > 7) throw new RangeError('Mask value out of range')
      for (let p = 0; p < this.size; p++)
        for (let g = 0; g < this.size; g++) {
          let k
          switch (h) {
            case 0:
              k = (g + p) % 2 == 0
              break
            case 1:
              k = p % 2 == 0
              break
            case 2:
              k = g % 3 == 0
              break
            case 3:
              k = (g + p) % 3 == 0
              break
            case 4:
              k = (Math.floor(g / 3) + Math.floor(p / 2)) % 2 == 0
              break
            case 5:
              k = ((g * p) % 2) + ((g * p) % 3) == 0
              break
            case 6:
              k = (((g * p) % 2) + ((g * p) % 3)) % 2 == 0
              break
            case 7:
              k = (((g + p) % 2) + ((g * p) % 3)) % 2 == 0
              break
            default:
              throw new Error('Unreachable')
          }
          !this.isFunction[p][g] && k && (this.modules[p][g] = !this.modules[p][g])
        }
    }
    getPenaltyScore() {
      let h = 0
      for (let E = 0; E < this.size; E++) {
        let S = !1,
          C = 0,
          A = [0, 0, 0, 0, 0, 0, 0]
        for (let P = 0; P < this.size; P++)
          this.modules[E][P] == S
            ? (C++, C == 5 ? (h += r.PENALTY_N1) : C > 5 && h++)
            : (this.finderPenaltyAddHistory(C, A),
              S || (h += this.finderPenaltyCountPatterns(A) * r.PENALTY_N3),
              (S = this.modules[E][P]),
              (C = 1))
        h += this.finderPenaltyTerminateAndCount(S, C, A) * r.PENALTY_N3
      }
      for (let E = 0; E < this.size; E++) {
        let S = !1,
          C = 0,
          A = [0, 0, 0, 0, 0, 0, 0]
        for (let P = 0; P < this.size; P++)
          this.modules[P][E] == S
            ? (C++, C == 5 ? (h += r.PENALTY_N1) : C > 5 && h++)
            : (this.finderPenaltyAddHistory(C, A),
              S || (h += this.finderPenaltyCountPatterns(A) * r.PENALTY_N3),
              (S = this.modules[P][E]),
              (C = 1))
        h += this.finderPenaltyTerminateAndCount(S, C, A) * r.PENALTY_N3
      }
      for (let E = 0; E < this.size - 1; E++)
        for (let S = 0; S < this.size - 1; S++) {
          const C = this.modules[E][S]
          C == this.modules[E][S + 1] &&
            C == this.modules[E + 1][S] &&
            C == this.modules[E + 1][S + 1] &&
            (h += r.PENALTY_N2)
        }
      let p = 0
      for (const E of this.modules) p = E.reduce((S, C) => S + (C ? 1 : 0), p)
      const g = this.size * this.size,
        k = Math.ceil(Math.abs(p * 20 - g * 10) / g) - 1
      return (d(0 <= k && k <= 9), (h += k * r.PENALTY_N4), d(0 <= h && h <= 2568888), h)
    }
    getAlignmentPatternPositions() {
      if (this.version == 1) return []
      {
        const h = Math.floor(this.version / 7) + 2,
          p = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (h * 2 - 2)) * 2
        let g = [6]
        for (let k = this.size - 7; g.length < h; k -= p) g.splice(1, 0, k)
        return g
      }
    }
    static getNumRawDataModules(h) {
      if (h < r.MIN_VERSION || h > r.MAX_VERSION)
        throw new RangeError('Version number out of range')
      let p = (16 * h + 128) * h + 64
      if (h >= 2) {
        const g = Math.floor(h / 7) + 2
        ;((p -= (25 * g - 10) * g - 55), h >= 7 && (p -= 36))
      }
      return (d(208 <= p && p <= 29648), p)
    }
    static getNumDataCodewords(h, p) {
      return (
        Math.floor(r.getNumRawDataModules(h) / 8) -
        r.ECC_CODEWORDS_PER_BLOCK[p.ordinal][h] * r.NUM_ERROR_CORRECTION_BLOCKS[p.ordinal][h]
      )
    }
    static reedSolomonComputeDivisor(h) {
      if (h < 1 || h > 255) throw new RangeError('Degree out of range')
      let p = []
      for (let k = 0; k < h - 1; k++) p.push(0)
      p.push(1)
      let g = 1
      for (let k = 0; k < h; k++) {
        for (let E = 0; E < p.length; E++)
          ((p[E] = r.reedSolomonMultiply(p[E], g)), E + 1 < p.length && (p[E] ^= p[E + 1]))
        g = r.reedSolomonMultiply(g, 2)
      }
      return p
    }
    static reedSolomonComputeRemainder(h, p) {
      let g = p.map((k) => 0)
      for (const k of h) {
        const E = k ^ g.shift()
        ;(g.push(0), p.forEach((S, C) => (g[C] ^= r.reedSolomonMultiply(S, E))))
      }
      return g
    }
    static reedSolomonMultiply(h, p) {
      if (h >>> 8 || p >>> 8) throw new RangeError('Byte out of range')
      let g = 0
      for (let k = 7; k >= 0; k--) ((g = (g << 1) ^ ((g >>> 7) * 285)), (g ^= ((p >>> k) & 1) * h))
      return (d(g >>> 8 == 0), g)
    }
    finderPenaltyCountPatterns(h) {
      const p = h[1]
      d(p <= this.size * 3)
      const g = p > 0 && h[2] == p && h[3] == p * 3 && h[4] == p && h[5] == p
      return (g && h[0] >= p * 4 && h[6] >= p ? 1 : 0) + (g && h[6] >= p * 4 && h[0] >= p ? 1 : 0)
    }
    finderPenaltyTerminateAndCount(h, p, g) {
      return (
        h && (this.finderPenaltyAddHistory(p, g), (p = 0)),
        (p += this.size),
        this.finderPenaltyAddHistory(p, g),
        this.finderPenaltyCountPatterns(g)
      )
    }
    finderPenaltyAddHistory(h, p) {
      ;(p[0] == 0 && (h += this.size), p.pop(), p.unshift(h))
    }
  }
  let o = r
  ;((o.MIN_VERSION = 1),
    (o.MAX_VERSION = 40),
    (o.PENALTY_N1 = 3),
    (o.PENALTY_N2 = 3),
    (o.PENALTY_N3 = 40),
    (o.PENALTY_N4 = 10),
    (o.ECC_CODEWORDS_PER_BLOCK = [
      [
        -1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28,
        30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
      ],
      [
        -1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28,
        28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
      ],
      [
        -1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30,
        30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
      ],
      [
        -1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24,
        30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
      ],
    ]),
    (o.NUM_ERROR_CORRECTION_BLOCKS = [
      [
        -1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13,
        14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25,
      ],
      [
        -1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21,
        23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49,
      ],
      [
        -1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29,
        34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68,
      ],
      [
        -1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32,
        35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81,
      ],
    ]),
    (t.QrCode = o))
  function l(h, p, g) {
    if (p < 0 || p > 31 || h >>> p) throw new RangeError('Value out of range')
    for (let k = p - 1; k >= 0; k--) g.push((h >>> k) & 1)
  }
  function a(h, p) {
    return ((h >>> p) & 1) != 0
  }
  function d(h) {
    if (!h) throw new Error('Assertion error')
  }
  const f = class {
    constructor(h, p, g) {
      if (((this.mode = h), (this.numChars = p), (this.bitData = g), p < 0))
        throw new RangeError('Invalid argument')
      this.bitData = g.slice()
    }
    static makeBytes(h) {
      let p = []
      for (const g of h) l(g, 8, p)
      return new f(f.Mode.BYTE, h.length, p)
    }
    static makeNumeric(h) {
      if (!f.isNumeric(h)) throw new RangeError('String contains non-numeric characters')
      let p = []
      for (let g = 0; g < h.length; ) {
        const k = Math.min(h.length - g, 3)
        ;(l(parseInt(h.substr(g, k), 10), k * 3 + 1, p), (g += k))
      }
      return new f(f.Mode.NUMERIC, h.length, p)
    }
    static makeAlphanumeric(h) {
      if (!f.isAlphanumeric(h))
        throw new RangeError('String contains unencodable characters in alphanumeric mode')
      let p = [],
        g
      for (g = 0; g + 2 <= h.length; g += 2) {
        let k = f.ALPHANUMERIC_CHARSET.indexOf(h.charAt(g)) * 45
        ;((k += f.ALPHANUMERIC_CHARSET.indexOf(h.charAt(g + 1))), l(k, 11, p))
      }
      return (
        g < h.length && l(f.ALPHANUMERIC_CHARSET.indexOf(h.charAt(g)), 6, p),
        new f(f.Mode.ALPHANUMERIC, h.length, p)
      )
    }
    static makeSegments(h) {
      return h == ''
        ? []
        : f.isNumeric(h)
          ? [f.makeNumeric(h)]
          : f.isAlphanumeric(h)
            ? [f.makeAlphanumeric(h)]
            : [f.makeBytes(f.toUtf8ByteArray(h))]
    }
    static makeEci(h) {
      let p = []
      if (h < 0) throw new RangeError('ECI assignment value out of range')
      if (h < 128) l(h, 8, p)
      else if (h < 16384) (l(2, 2, p), l(h, 14, p))
      else if (h < 1e6) (l(6, 3, p), l(h, 21, p))
      else throw new RangeError('ECI assignment value out of range')
      return new f(f.Mode.ECI, 0, p)
    }
    static isNumeric(h) {
      return f.NUMERIC_REGEX.test(h)
    }
    static isAlphanumeric(h) {
      return f.ALPHANUMERIC_REGEX.test(h)
    }
    getData() {
      return this.bitData.slice()
    }
    static getTotalBits(h, p) {
      let g = 0
      for (const k of h) {
        const E = k.mode.numCharCountBits(p)
        if (k.numChars >= 1 << E) return 1 / 0
        g += 4 + E + k.bitData.length
      }
      return g
    }
    static toUtf8ByteArray(h) {
      h = encodeURI(h)
      let p = []
      for (let g = 0; g < h.length; g++)
        h.charAt(g) != '%'
          ? p.push(h.charCodeAt(g))
          : (p.push(parseInt(h.substr(g + 1, 2), 16)), (g += 2))
      return p
    }
  }
  let y = f
  ;((y.NUMERIC_REGEX = /^[0-9]*$/),
    (y.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/),
    (y.ALPHANUMERIC_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'),
    (t.QrSegment = y))
})(Zn || (Zn = {}))
;((t) => {
  ;((r) => {
    const o = class {
      constructor(a, d) {
        ;((this.ordinal = a), (this.formatBits = d))
      }
    }
    let l = o
    ;((l.LOW = new o(0, 1)),
      (l.MEDIUM = new o(1, 0)),
      (l.QUARTILE = new o(2, 3)),
      (l.HIGH = new o(3, 2)),
      (r.Ecc = l))
  })(t.QrCode || (t.QrCode = {}))
})(Zn || (Zn = {}))
;((t) => {
  ;((r) => {
    const o = class {
      constructor(a, d) {
        ;((this.modeBits = a), (this.numBitsCharCount = d))
      }
      numCharCountBits(a) {
        return this.numBitsCharCount[Math.floor((a + 7) / 17)]
      }
    }
    let l = o
    ;((l.NUMERIC = new o(1, [10, 12, 14])),
      (l.ALPHANUMERIC = new o(2, [9, 11, 13])),
      (l.BYTE = new o(4, [8, 16, 16])),
      (l.KANJI = new o(8, [8, 10, 12])),
      (l.ECI = new o(7, [0, 0, 0])),
      (r.Mode = l))
  })(t.QrSegment || (t.QrSegment = {}))
})(Zn || (Zn = {}))
var Ii = Zn
var hE = {
    L: Ii.QrCode.Ecc.LOW,
    M: Ii.QrCode.Ecc.MEDIUM,
    Q: Ii.QrCode.Ecc.QUARTILE,
    H: Ii.QrCode.Ecc.HIGH,
  },
  pE = 128,
  mE = 'L',
  gE = '#FFFFFF',
  yE = '#000000',
  vE = !1,
  Fm = 4,
  kE = 0.1
function EE(t, r = 0) {
  const o = []
  return (
    t.forEach(function (l, a) {
      let d = null
      l.forEach(function (f, y) {
        if (!f && d !== null) {
          ;(o.push(`M${d + r} ${a + r}h${y - d}v1H${d + r}z`), (d = null))
          return
        }
        if (y === l.length - 1) {
          if (!f) return
          d === null
            ? o.push(`M${y + r},${a + r} h1v1H${y + r}z`)
            : o.push(`M${d + r},${a + r} h${y + 1 - d}v1H${d + r}z`)
          return
        }
        f && d === null && (d = y)
      })
    }),
    o.join('')
  )
}
function xE(t, r) {
  return t
    .slice()
    .map((o, l) =>
      l < r.y || l >= r.y + r.h ? o : o.map((a, d) => (d < r.x || d >= r.x + r.w ? a : !1))
    )
}
function wE(t, r, o, l) {
  if (l == null) return null
  const a = o ? Fm : 0,
    d = t.length + a * 2,
    f = Math.floor(r * kE),
    y = d / r,
    h = (l.width || f) * y,
    p = (l.height || f) * y,
    g = l.x == null ? t.length / 2 - h / 2 : l.x * y,
    k = l.y == null ? t.length / 2 - p / 2 : l.y * y
  let E = null
  if (l.excavate) {
    let S = Math.floor(g),
      C = Math.floor(k),
      A = Math.ceil(h + g - S),
      P = Math.ceil(p + k - C)
    E = { x: S, y: C, w: A, h: P }
  }
  return { x: g, y: k, h: p, w: h, excavation: E }
}
var LE = (function () {
  try {
    new Path2D().addPath(new Path2D())
  } catch {
    return !1
  }
  return !0
})()
function _E(t) {
  const r = t,
    {
      value: o,
      size: l = pE,
      level: a = mE,
      bgColor: d = gE,
      fgColor: f = yE,
      includeMargin: y = vE,
      style: h,
      imageSettings: p,
    } = r,
    g = dE(r, [
      'value',
      'size',
      'level',
      'bgColor',
      'fgColor',
      'includeMargin',
      'style',
      'imageSettings',
    ]),
    k = p?.src,
    E = m.useRef(null),
    S = m.useRef(null),
    [C, A] = m.useState(!1)
  ;(m.useEffect(() => {
    if (E.current != null) {
      const V = E.current,
        F = V.getContext('2d')
      if (!F) return
      let z = Ii.QrCode.encodeText(o, hE[a]).getModules()
      const H = y ? Fm : 0,
        q = z.length + H * 2,
        re = wE(z, l, y, p),
        Q = S.current,
        me = re != null && Q !== null && Q.complete && Q.naturalHeight !== 0 && Q.naturalWidth !== 0
      me && re.excavation != null && (z = xE(z, re.excavation))
      const de = window.devicePixelRatio || 1
      V.height = V.width = l * de
      const Fe = (l / q) * de
      ;(F.scale(Fe, Fe),
        (F.fillStyle = d),
        F.fillRect(0, 0, q, q),
        (F.fillStyle = f),
        LE
          ? F.fill(new Path2D(EE(z, H)))
          : z.forEach(function (Ge, Ie) {
              Ge.forEach(function (He, at) {
                He && F.fillRect(at + H, Ie + H, 1, 1)
              })
            }),
        me && F.drawImage(Q, re.x + H, re.y + H, re.w, re.h))
    }
  }),
    m.useEffect(() => {
      A(!1)
    }, [k]))
  const P = Bp({ height: l, width: l }, h)
  let D = null
  return (
    k != null &&
      (D = m.createElement('img', {
        src: k,
        key: k,
        style: { display: 'none' },
        onLoad: () => {
          A(!0)
        },
        ref: S,
      })),
    m.createElement(
      m.Fragment,
      null,
      m.createElement('canvas', Bp({ style: P, height: l, width: l, ref: E }, g)),
      D
    )
  )
}
export {
  Lu as C,
  v4 as D,
  w4 as E,
  S4 as G,
  ME as H,
  Iy as L,
  AE as N,
  M4 as Q,
  m as R,
  D4 as S,
  O4 as T,
  B4 as U,
  U4 as W,
  N4 as a,
  _4 as b,
  SE as c,
  TE as d,
  My as e,
  CE as f,
  PE as g,
  R4 as h,
  g4 as i,
  tu as j,
  C4 as k,
  _E as l,
  jE as m,
  E4 as n,
  _ as r,
  bp as u,
}
