import { g as t0 } from './scanner.js'
function n0(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n]
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const i in r)
        if (i !== 'default' && !(i in e)) {
          const o = Object.getOwnPropertyDescriptor(r, i)
          o && Object.defineProperty(e, i, o.get ? o : { enumerable: !0, get: () => r[i] })
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }))
}
var Xd = { exports: {} },
  ls = {},
  Jd = { exports: {} },
  V = {}
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mi = Symbol.for('react.element'),
  r0 = Symbol.for('react.portal'),
  i0 = Symbol.for('react.fragment'),
  o0 = Symbol.for('react.strict_mode'),
  s0 = Symbol.for('react.profiler'),
  l0 = Symbol.for('react.provider'),
  a0 = Symbol.for('react.context'),
  u0 = Symbol.for('react.forward_ref'),
  c0 = Symbol.for('react.suspense'),
  f0 = Symbol.for('react.memo'),
  d0 = Symbol.for('react.lazy'),
  dc = Symbol.iterator
function h0(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (dc && e[dc]) || e['@@iterator']), typeof e == 'function' ? e : null)
}
var qd = {
    isMounted: function () {
      return !1
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  eh = Object.assign,
  th = {}
function Er(e, t, n) {
  ;((this.props = e), (this.context = t), (this.refs = th), (this.updater = n || qd))
}
Er.prototype.isReactComponent = {}
Er.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    )
  this.updater.enqueueSetState(this, e, t, 'setState')
}
Er.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate')
}
function nh() {}
nh.prototype = Er.prototype
function Va(e, t, n) {
  ;((this.props = e), (this.context = t), (this.refs = th), (this.updater = n || qd))
}
var Na = (Va.prototype = new nh())
Na.constructor = Va
eh(Na, Er.prototype)
Na.isPureReactComponent = !0
var hc = Array.isArray,
  rh = Object.prototype.hasOwnProperty,
  Wa = { current: null },
  ih = { key: !0, ref: !0, __self: !0, __source: !0 }
function oh(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (o = '' + t.key), t))
      rh.call(t, r) && !ih.hasOwnProperty(r) && (i[r] = t[r])
  var a = arguments.length - 2
  if (a === 1) i.children = n
  else if (1 < a) {
    for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2]
    i.children = l
  }
  if (e && e.defaultProps) for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r])
  return { $$typeof: Mi, type: e, key: o, ref: s, props: i, _owner: Wa.current }
}
function p0(e, t) {
  return { $$typeof: Mi, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner }
}
function Oa(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Mi
}
function m0(e) {
  var t = { '=': '=0', ':': '=2' }
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n]
    })
  )
}
var pc = /\/+/g
function Fs(e, t) {
  return typeof e == 'object' && e !== null && e.key != null ? m0('' + e.key) : t.toString(36)
}
function fo(e, t, n, r, i) {
  var o = typeof e
  ;(o === 'undefined' || o === 'boolean') && (e = null)
  var s = !1
  if (e === null) s = !0
  else
    switch (o) {
      case 'string':
      case 'number':
        s = !0
        break
      case 'object':
        switch (e.$$typeof) {
          case Mi:
          case r0:
            s = !0
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === '' ? '.' + Fs(s, 0) : r),
      hc(i)
        ? ((n = ''),
          e != null && (n = e.replace(pc, '$&/') + '/'),
          fo(i, t, n, '', function (u) {
            return u
          }))
        : i != null &&
          (Oa(i) &&
            (i = p0(
              i,
              n +
                (!i.key || (s && s.key === i.key) ? '' : ('' + i.key).replace(pc, '$&/') + '/') +
                e
            )),
          t.push(i)),
      1
    )
  if (((s = 0), (r = r === '' ? '.' : r + ':'), hc(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a]
      var l = r + Fs(o, a)
      s += fo(o, t, n, l, i)
    }
  else if (((l = h0(e)), typeof l == 'function'))
    for (e = l.call(e), a = 0; !(o = e.next()).done; )
      ((o = o.value), (l = r + Fs(o, a++)), (s += fo(o, t, n, l, i)))
  else if (o === 'object')
    throw (
      (t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t) +
          '). If you meant to render a collection of children, use an array instead.'
      )
    )
  return s
}
function Ui(e, t, n) {
  if (e == null) return e
  var r = [],
    i = 0
  return (
    fo(e, r, '', '', function (o) {
      return t.call(n, o, i++)
    }),
    r
  )
}
function g0(e) {
  if (e._status === -1) {
    var t = e._result
    ;((t = t()),
      t.then(
        function (n) {
          ;(e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n))
        },
        function (n) {
          ;(e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n))
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)))
  }
  if (e._status === 1) return e._result.default
  throw e._result
}
var ke = { current: null },
  ho = { transition: null },
  y0 = { ReactCurrentDispatcher: ke, ReactCurrentBatchConfig: ho, ReactCurrentOwner: Wa }
function sh() {
  throw Error('act(...) is not supported in production builds of React.')
}
V.Children = {
  map: Ui,
  forEach: function (e, t, n) {
    Ui(
      e,
      function () {
        t.apply(this, arguments)
      },
      n
    )
  },
  count: function (e) {
    var t = 0
    return (
      Ui(e, function () {
        t++
      }),
      t
    )
  },
  toArray: function (e) {
    return (
      Ui(e, function (t) {
        return t
      }) || []
    )
  },
  only: function (e) {
    if (!Oa(e)) throw Error('React.Children.only expected to receive a single React element child.')
    return e
  },
}
V.Component = Er
V.Fragment = i0
V.Profiler = s0
V.PureComponent = Va
V.StrictMode = o0
V.Suspense = c0
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = y0
V.act = sh
V.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.'
    )
  var r = eh({}, e.props),
    i = e.key,
    o = e.ref,
    s = e._owner
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (s = Wa.current)),
      t.key !== void 0 && (i = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps
    for (l in t)
      rh.call(t, l) &&
        !ih.hasOwnProperty(l) &&
        (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l])
  }
  var l = arguments.length - 2
  if (l === 1) r.children = n
  else if (1 < l) {
    a = Array(l)
    for (var u = 0; u < l; u++) a[u] = arguments[u + 2]
    r.children = a
  }
  return { $$typeof: Mi, type: e.type, key: i, ref: o, props: r, _owner: s }
}
V.createContext = function (e) {
  return (
    (e = {
      $$typeof: a0,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: l0, _context: e }),
    (e.Consumer = e)
  )
}
V.createElement = oh
V.createFactory = function (e) {
  var t = oh.bind(null, e)
  return ((t.type = e), t)
}
V.createRef = function () {
  return { current: null }
}
V.forwardRef = function (e) {
  return { $$typeof: u0, render: e }
}
V.isValidElement = Oa
V.lazy = function (e) {
  return { $$typeof: d0, _payload: { _status: -1, _result: e }, _init: g0 }
}
V.memo = function (e, t) {
  return { $$typeof: f0, type: e, compare: t === void 0 ? null : t }
}
V.startTransition = function (e) {
  var t = ho.transition
  ho.transition = {}
  try {
    e()
  } finally {
    ho.transition = t
  }
}
V.unstable_act = sh
V.useCallback = function (e, t) {
  return ke.current.useCallback(e, t)
}
V.useContext = function (e) {
  return ke.current.useContext(e)
}
V.useDebugValue = function () {}
V.useDeferredValue = function (e) {
  return ke.current.useDeferredValue(e)
}
V.useEffect = function (e, t) {
  return ke.current.useEffect(e, t)
}
V.useId = function () {
  return ke.current.useId()
}
V.useImperativeHandle = function (e, t, n) {
  return ke.current.useImperativeHandle(e, t, n)
}
V.useInsertionEffect = function (e, t) {
  return ke.current.useInsertionEffect(e, t)
}
V.useLayoutEffect = function (e, t) {
  return ke.current.useLayoutEffect(e, t)
}
V.useMemo = function (e, t) {
  return ke.current.useMemo(e, t)
}
V.useReducer = function (e, t, n) {
  return ke.current.useReducer(e, t, n)
}
V.useRef = function (e) {
  return ke.current.useRef(e)
}
V.useState = function (e) {
  return ke.current.useState(e)
}
V.useSyncExternalStore = function (e, t, n) {
  return ke.current.useSyncExternalStore(e, t, n)
}
V.useTransition = function () {
  return ke.current.useTransition()
}
V.version = '18.3.1'
Jd.exports = V
var L = Jd.exports
const f = t0(L),
  v0 = n0({ __proto__: null, default: f }, [L])
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var k0 = L,
  E0 = Symbol.for('react.element'),
  x0 = Symbol.for('react.fragment'),
  w0 = Object.prototype.hasOwnProperty,
  L0 = k0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  S0 = { key: !0, ref: !0, __self: !0, __source: !0 }
function lh(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null
  ;(n !== void 0 && (o = '' + n),
    t.key !== void 0 && (o = '' + t.key),
    t.ref !== void 0 && (s = t.ref))
  for (r in t) w0.call(t, r) && !S0.hasOwnProperty(r) && (i[r] = t[r])
  if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r])
  return { $$typeof: E0, type: e, key: o, ref: s, props: i, _owner: L0.current }
}
ls.Fragment = x0
ls.jsx = lh
ls.jsxs = lh
Xd.exports = ls
var El = Xd.exports,
  ah = { exports: {} },
  De = {},
  uh = { exports: {} },
  ch = {}
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ ;(function (e) {
  function t(M, _) {
    var F = M.length
    M.push(_)
    e: for (; 0 < F; ) {
      var X = (F - 1) >>> 1,
        ie = M[X]
      if (0 < i(ie, _)) ((M[X] = _), (M[F] = ie), (F = X))
      else break e
    }
  }
  function n(M) {
    return M.length === 0 ? null : M[0]
  }
  function r(M) {
    if (M.length === 0) return null
    var _ = M[0],
      F = M.pop()
    if (F !== _) {
      M[0] = F
      e: for (var X = 0, ie = M.length, Bi = ie >>> 1; X < Bi; ) {
        var qt = 2 * (X + 1) - 1,
          _s = M[qt],
          en = qt + 1,
          zi = M[en]
        if (0 > i(_s, F))
          en < ie && 0 > i(zi, _s)
            ? ((M[X] = zi), (M[en] = F), (X = en))
            : ((M[X] = _s), (M[qt] = F), (X = qt))
        else if (en < ie && 0 > i(zi, F)) ((M[X] = zi), (M[en] = F), (X = en))
        else break e
      }
    }
    return _
  }
  function i(M, _) {
    var F = M.sortIndex - _.sortIndex
    return F !== 0 ? F : M.id - _.id
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var o = performance
    e.unstable_now = function () {
      return o.now()
    }
  } else {
    var s = Date,
      a = s.now()
    e.unstable_now = function () {
      return s.now() - a
    }
  }
  var l = [],
    u = [],
    c = 1,
    d = null,
    h = 3,
    y = !1,
    v = !1,
    k = !1,
    E = typeof setTimeout == 'function' ? setTimeout : null,
    m = typeof clearTimeout == 'function' ? clearTimeout : null,
    p = typeof setImmediate < 'u' ? setImmediate : null
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling)
  function g(M) {
    for (var _ = n(u); _ !== null; ) {
      if (_.callback === null) r(u)
      else if (_.startTime <= M) (r(u), (_.sortIndex = _.expirationTime), t(l, _))
      else break
      _ = n(u)
    }
  }
  function x(M) {
    if (((k = !1), g(M), !v))
      if (n(l) !== null) ((v = !0), Ii(w))
      else {
        var _ = n(u)
        _ !== null && te(x, _.startTime - M)
      }
  }
  function w(M, _) {
    ;((v = !1), k && ((k = !1), m(S), (S = -1)), (y = !0))
    var F = h
    try {
      for (g(_), d = n(l); d !== null && (!(d.expirationTime > _) || (M && !$())); ) {
        var X = d.callback
        if (typeof X == 'function') {
          ;((d.callback = null), (h = d.priorityLevel))
          var ie = X(d.expirationTime <= _)
          ;((_ = e.unstable_now()),
            typeof ie == 'function' ? (d.callback = ie) : d === n(l) && r(l),
            g(_))
        } else r(l)
        d = n(l)
      }
      if (d !== null) var Bi = !0
      else {
        var qt = n(u)
        ;(qt !== null && te(x, qt.startTime - _), (Bi = !1))
      }
      return Bi
    } finally {
      ;((d = null), (h = F), (y = !1))
    }
  }
  var P = !1,
    T = null,
    S = -1,
    D = 5,
    R = -1
  function $() {
    return !(e.unstable_now() - R < D)
  }
  function qe() {
    if (T !== null) {
      var M = e.unstable_now()
      R = M
      var _ = !0
      try {
        _ = T(!0, M)
      } finally {
        _ ? lt() : ((P = !1), (T = null))
      }
    } else P = !1
  }
  var lt
  if (typeof p == 'function')
    lt = function () {
      p(qe)
    }
  else if (typeof MessageChannel < 'u') {
    var Jt = new MessageChannel(),
      Oi = Jt.port2
    ;((Jt.port1.onmessage = qe),
      (lt = function () {
        Oi.postMessage(null)
      }))
  } else
    lt = function () {
      E(qe, 0)
    }
  function Ii(M) {
    ;((T = M), P || ((P = !0), lt()))
  }
  function te(M, _) {
    S = E(function () {
      M(e.unstable_now())
    }, _)
  }
  ;((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (M) {
      M.callback = null
    }),
    (e.unstable_continueExecution = function () {
      v || y || ((v = !0), Ii(w))
    }),
    (e.unstable_forceFrameRate = function (M) {
      0 > M || 125 < M
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (D = 0 < M ? Math.floor(1e3 / M) : 5)
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l)
    }),
    (e.unstable_next = function (M) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var _ = 3
          break
        default:
          _ = h
      }
      var F = h
      h = _
      try {
        return M()
      } finally {
        h = F
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (M, _) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break
        default:
          M = 3
      }
      var F = h
      h = M
      try {
        return _()
      } finally {
        h = F
      }
    }),
    (e.unstable_scheduleCallback = function (M, _, F) {
      var X = e.unstable_now()
      switch (
        (typeof F == 'object' && F !== null
          ? ((F = F.delay), (F = typeof F == 'number' && 0 < F ? X + F : X))
          : (F = X),
        M)
      ) {
        case 1:
          var ie = -1
          break
        case 2:
          ie = 250
          break
        case 5:
          ie = 1073741823
          break
        case 4:
          ie = 1e4
          break
        default:
          ie = 5e3
      }
      return (
        (ie = F + ie),
        (M = {
          id: c++,
          callback: _,
          priorityLevel: M,
          startTime: F,
          expirationTime: ie,
          sortIndex: -1,
        }),
        F > X
          ? ((M.sortIndex = F),
            t(u, M),
            n(l) === null && M === n(u) && (k ? (m(S), (S = -1)) : (k = !0), te(x, F - X)))
          : ((M.sortIndex = ie), t(l, M), v || y || ((v = !0), Ii(w))),
        M
      )
    }),
    (e.unstable_shouldYield = $),
    (e.unstable_wrapCallback = function (M) {
      var _ = h
      return function () {
        var F = h
        h = _
        try {
          return M.apply(this, arguments)
        } finally {
          h = F
        }
      }
    }))
})(ch)
uh.exports = ch
var P0 = uh.exports
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var C0 = L,
  _e = P0
function C(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n])
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  )
}
var fh = new Set(),
  ii = {}
function En(e, t) {
  ;(ur(e, t), ur(e + 'Capture', t))
}
function ur(e, t) {
  for (ii[e] = t, e = 0; e < t.length; e++) fh.add(t[e])
}
var gt = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  xl = Object.prototype.hasOwnProperty,
  T0 =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  mc = {},
  gc = {}
function M0(e) {
  return xl.call(gc, e) ? !0 : xl.call(mc, e) ? !1 : T0.test(e) ? (gc[e] = !0) : ((mc[e] = !0), !1)
}
function A0(e, t, n, r) {
  if (n !== null && n.type === 0) return !1
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0
    case 'boolean':
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-')
    default:
      return !1
  }
}
function R0(e, t, n, r) {
  if (t === null || typeof t > 'u' || A0(e, t, n, r)) return !0
  if (r) return !1
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t
      case 4:
        return t === !1
      case 5:
        return isNaN(t)
      case 6:
        return isNaN(t) || 1 > t
    }
  return !1
}
function Ee(e, t, n, r, i, o, s) {
  ;((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = s))
}
var ce = {}
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    ce[e] = new Ee(e, 0, !1, e, null, !1, !1)
  })
;[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0]
  ce[t] = new Ee(t, 1, !1, e[1], null, !1, !1)
})
;['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  ce[e] = new Ee(e, 2, !1, e.toLowerCase(), null, !1, !1)
})
;['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
  ce[e] = new Ee(e, 2, !1, e, null, !1, !1)
})
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    ce[e] = new Ee(e, 3, !1, e.toLowerCase(), null, !1, !1)
  })
;['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  ce[e] = new Ee(e, 3, !0, e, null, !1, !1)
})
;['capture', 'download'].forEach(function (e) {
  ce[e] = new Ee(e, 4, !1, e, null, !1, !1)
})
;['cols', 'rows', 'size', 'span'].forEach(function (e) {
  ce[e] = new Ee(e, 6, !1, e, null, !1, !1)
})
;['rowSpan', 'start'].forEach(function (e) {
  ce[e] = new Ee(e, 5, !1, e.toLowerCase(), null, !1, !1)
})
var Ia = /[\-:]([a-z])/g
function Ba(e) {
  return e[1].toUpperCase()
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ia, Ba)
    ce[t] = new Ee(t, 1, !1, e, null, !1, !1)
  })
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ia, Ba)
    ce[t] = new Ee(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1)
  })
;['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(Ia, Ba)
  ce[t] = new Ee(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1)
})
;['tabIndex', 'crossOrigin'].forEach(function (e) {
  ce[e] = new Ee(e, 1, !1, e.toLowerCase(), null, !1, !1)
})
ce.xlinkHref = new Ee('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1)
;['src', 'href', 'action', 'formAction'].forEach(function (e) {
  ce[e] = new Ee(e, 1, !1, e.toLowerCase(), null, !0, !0)
})
function za(e, t, n, r) {
  var i = ce.hasOwnProperty(t) ? ce[t] : null
  ;(i !== null
    ? i.type !== 0
    : r || !(2 < t.length) || (t[0] !== 'o' && t[0] !== 'O') || (t[1] !== 'n' && t[1] !== 'N')) &&
    (R0(t, n, i, r) && (n = null),
    r || i === null
      ? M0(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : '') : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var xt = C0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  $i = Symbol.for('react.element'),
  Bn = Symbol.for('react.portal'),
  zn = Symbol.for('react.fragment'),
  Ua = Symbol.for('react.strict_mode'),
  wl = Symbol.for('react.profiler'),
  dh = Symbol.for('react.provider'),
  hh = Symbol.for('react.context'),
  $a = Symbol.for('react.forward_ref'),
  Ll = Symbol.for('react.suspense'),
  Sl = Symbol.for('react.suspense_list'),
  Ha = Symbol.for('react.memo'),
  Pt = Symbol.for('react.lazy'),
  ph = Symbol.for('react.offscreen'),
  yc = Symbol.iterator
function Tr(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (yc && e[yc]) || e['@@iterator']), typeof e == 'function' ? e : null)
}
var Q = Object.assign,
  Ds
function Nr(e) {
  if (Ds === void 0)
    try {
      throw Error()
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/)
      Ds = (t && t[1]) || ''
    }
  return (
    `
` +
    Ds +
    e
  )
}
var Vs = !1
function Ns(e, t) {
  if (!e || Vs) return ''
  Vs = !0
  var n = Error.prepareStackTrace
  Error.prepareStackTrace = void 0
  try {
    if (t)
      if (
        ((t = function () {
          throw Error()
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error()
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, [])
        } catch (u) {
          var r = u
        }
        Reflect.construct(e, [], t)
      } else {
        try {
          t.call()
        } catch (u) {
          r = u
        }
        e.call(t.prototype)
      }
    else {
      try {
        throw Error()
      } catch (u) {
        r = u
      }
      e()
    }
  } catch (u) {
    if (u && r && typeof u.stack == 'string') {
      for (
        var i = u.stack.split(`
`),
          o = r.stack.split(`
`),
          s = i.length - 1,
          a = o.length - 1;
        1 <= s && 0 <= a && i[s] !== o[a];

      )
        a--
      for (; 1 <= s && 0 <= a; s--, a--)
        if (i[s] !== o[a]) {
          if (s !== 1 || a !== 1)
            do
              if ((s--, a--, 0 > a || i[s] !== o[a])) {
                var l =
                  `
` + i[s].replace(' at new ', ' at ')
                return (
                  e.displayName &&
                    l.includes('<anonymous>') &&
                    (l = l.replace('<anonymous>', e.displayName)),
                  l
                )
              }
            while (1 <= s && 0 <= a)
          break
        }
    }
  } finally {
    ;((Vs = !1), (Error.prepareStackTrace = n))
  }
  return (e = e ? e.displayName || e.name : '') ? Nr(e) : ''
}
function j0(e) {
  switch (e.tag) {
    case 5:
      return Nr(e.type)
    case 16:
      return Nr('Lazy')
    case 13:
      return Nr('Suspense')
    case 19:
      return Nr('SuspenseList')
    case 0:
    case 2:
    case 15:
      return ((e = Ns(e.type, !1)), e)
    case 11:
      return ((e = Ns(e.type.render, !1)), e)
    case 1:
      return ((e = Ns(e.type, !0)), e)
    default:
      return ''
  }
}
function Pl(e) {
  if (e == null) return null
  if (typeof e == 'function') return e.displayName || e.name || null
  if (typeof e == 'string') return e
  switch (e) {
    case zn:
      return 'Fragment'
    case Bn:
      return 'Portal'
    case wl:
      return 'Profiler'
    case Ua:
      return 'StrictMode'
    case Ll:
      return 'Suspense'
    case Sl:
      return 'SuspenseList'
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case hh:
        return (e.displayName || 'Context') + '.Consumer'
      case dh:
        return (e._context.displayName || 'Context') + '.Provider'
      case $a:
        var t = e.render
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        )
      case Ha:
        return ((t = e.displayName || null), t !== null ? t : Pl(e.type) || 'Memo')
      case Pt:
        ;((t = e._payload), (e = e._init))
        try {
          return Pl(e(t))
        } catch {}
    }
  return null
}
function _0(e) {
  var t = e.type
  switch (e.tag) {
    case 24:
      return 'Cache'
    case 9:
      return (t.displayName || 'Context') + '.Consumer'
    case 10:
      return (t._context.displayName || 'Context') + '.Provider'
    case 18:
      return 'DehydratedFragment'
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      )
    case 7:
      return 'Fragment'
    case 5:
      return t
    case 4:
      return 'Portal'
    case 3:
      return 'Root'
    case 6:
      return 'Text'
    case 16:
      return Pl(t)
    case 8:
      return t === Ua ? 'StrictMode' : 'Mode'
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
      if (typeof t == 'function') return t.displayName || t.name || null
      if (typeof t == 'string') return t
  }
  return null
}
function $t(e) {
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
function mh(e) {
  var t = e.type
  return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio')
}
function F0(e) {
  var t = mh(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t]
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var i = n.get,
      o = n.set
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this)
        },
        set: function (s) {
          ;((r = '' + s), o.call(this, s))
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r
        },
        setValue: function (s) {
          r = '' + s
        },
        stopTracking: function () {
          ;((e._valueTracker = null), delete e[t])
        },
      }
    )
  }
}
function Hi(e) {
  e._valueTracker || (e._valueTracker = F0(e))
}
function gh(e) {
  if (!e) return !1
  var t = e._valueTracker
  if (!t) return !0
  var n = t.getValue(),
    r = ''
  return (
    e && (r = mh(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  )
}
function To(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null
  try {
    return e.activeElement || e.body
  } catch {
    return e.body
  }
}
function Cl(e, t) {
  var n = t.checked
  return Q({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  })
}
function vc(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked
  ;((n = $t(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
    }))
}
function yh(e, t) {
  ;((t = t.checked), t != null && za(e, 'checked', t, !1))
}
function Tl(e, t) {
  yh(e, t)
  var n = $t(t.value),
    r = t.type
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n)
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value')
    return
  }
  ;(t.hasOwnProperty('value')
    ? Ml(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && Ml(e, t.type, $t(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked))
}
function kc(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type
    if (!((r !== 'submit' && r !== 'reset') || (t.value !== void 0 && t.value !== null))) return
    ;((t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t))
  }
  ;((n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n))
}
function Ml(e, t, n) {
  ;(t !== 'number' || To(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n))
}
var Wr = Array.isArray
function rr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {}
    for (var i = 0; i < n.length; i++) t['$' + n[i]] = !0
    for (n = 0; n < e.length; n++)
      ((i = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0))
  } else {
    for (n = '' + $t(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        ;((e[i].selected = !0), r && (e[i].defaultSelected = !0))
        return
      }
      t !== null || e[i].disabled || (t = e[i])
    }
    t !== null && (t.selected = !0)
  }
}
function Al(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(C(91))
  return Q({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  })
}
function Ec(e, t) {
  var n = t.value
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(C(92))
      if (Wr(n)) {
        if (1 < n.length) throw Error(C(93))
        n = n[0]
      }
      t = n
    }
    ;(t == null && (t = ''), (n = t))
  }
  e._wrapperState = { initialValue: $t(n) }
}
function vh(e, t) {
  var n = $t(t.value),
    r = $t(t.defaultValue)
  ;(n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r))
}
function xc(e) {
  var t = e.textContent
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t)
}
function kh(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg'
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML'
    default:
      return 'http://www.w3.org/1999/xhtml'
  }
}
function Rl(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? kh(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e
}
var Ki,
  Eh = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i)
          })
        }
      : e
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t
    else {
      for (
        Ki = Ki || document.createElement('div'),
          Ki.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Ki.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild)
      for (; t.firstChild; ) e.appendChild(t.firstChild)
    }
  })
function oi(e, t) {
  if (t) {
    var n = e.firstChild
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t
      return
    }
  }
  e.textContent = t
}
var Kr = {
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
  D0 = ['Webkit', 'ms', 'Moz', 'O']
Object.keys(Kr).forEach(function (e) {
  D0.forEach(function (t) {
    ;((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Kr[t] = Kr[e]))
  })
})
function xh(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (Kr.hasOwnProperty(e) && Kr[e])
      ? ('' + t).trim()
      : t + 'px'
}
function wh(e, t) {
  e = e.style
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        i = xh(n, t[n], r)
      ;(n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, i) : (e[n] = i))
    }
}
var V0 = Q(
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
function jl(e, t) {
  if (t) {
    if (V0[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(C(137, e))
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(C(60))
      if (typeof t.dangerouslySetInnerHTML != 'object' || !('__html' in t.dangerouslySetInnerHTML))
        throw Error(C(61))
    }
    if (t.style != null && typeof t.style != 'object') throw Error(C(62))
  }
}
function _l(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string'
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
var Fl = null
function Ka(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  )
}
var Dl = null,
  ir = null,
  or = null
function wc(e) {
  if ((e = ji(e))) {
    if (typeof Dl != 'function') throw Error(C(280))
    var t = e.stateNode
    t && ((t = ds(t)), Dl(e.stateNode, e.type, t))
  }
}
function Lh(e) {
  ir ? (or ? or.push(e) : (or = [e])) : (ir = e)
}
function Sh() {
  if (ir) {
    var e = ir,
      t = or
    if (((or = ir = null), wc(e), t)) for (e = 0; e < t.length; e++) wc(t[e])
  }
}
function Ph(e, t) {
  return e(t)
}
function Ch() {}
var Ws = !1
function Th(e, t, n) {
  if (Ws) return e(t, n)
  Ws = !0
  try {
    return Ph(e, t, n)
  } finally {
    ;((Ws = !1), (ir !== null || or !== null) && (Ch(), Sh()))
  }
}
function si(e, t) {
  var n = e.stateNode
  if (n === null) return null
  var r = ds(n)
  if (r === null) return null
  n = r[t]
  e: switch (t) {
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
      ;((r = !r.disabled) ||
        ((e = e.type),
        (r = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
        (e = !r))
      break e
    default:
      e = !1
  }
  if (e) return null
  if (n && typeof n != 'function') throw Error(C(231, t, typeof n))
  return n
}
var Vl = !1
if (gt)
  try {
    var Mr = {}
    ;(Object.defineProperty(Mr, 'passive', {
      get: function () {
        Vl = !0
      },
    }),
      window.addEventListener('test', Mr, Mr),
      window.removeEventListener('test', Mr, Mr))
  } catch {
    Vl = !1
  }
function N0(e, t, n, r, i, o, s, a, l) {
  var u = Array.prototype.slice.call(arguments, 3)
  try {
    t.apply(n, u)
  } catch (c) {
    this.onError(c)
  }
}
var Zr = !1,
  Mo = null,
  Ao = !1,
  Nl = null,
  W0 = {
    onError: function (e) {
      ;((Zr = !0), (Mo = e))
    },
  }
function O0(e, t, n, r, i, o, s, a, l) {
  ;((Zr = !1), (Mo = null), N0.apply(W0, arguments))
}
function I0(e, t, n, r, i, o, s, a, l) {
  if ((O0.apply(this, arguments), Zr)) {
    if (Zr) {
      var u = Mo
      ;((Zr = !1), (Mo = null))
    } else throw Error(C(198))
    Ao || ((Ao = !0), (Nl = u))
  }
}
function xn(e) {
  var t = e,
    n = e
  if (e.alternate) for (; t.return; ) t = t.return
  else {
    e = t
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return))
    while (e)
  }
  return t.tag === 3 ? n : null
}
function Mh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
      return t.dehydrated
  }
  return null
}
function Lc(e) {
  if (xn(e) !== e) throw Error(C(188))
}
function B0(e) {
  var t = e.alternate
  if (!t) {
    if (((t = xn(e)), t === null)) throw Error(C(188))
    return t !== e ? null : e
  }
  for (var n = e, r = t; ; ) {
    var i = n.return
    if (i === null) break
    var o = i.alternate
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r
        continue
      }
      break
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return (Lc(i), e)
        if (o === r) return (Lc(i), t)
        o = o.sibling
      }
      throw Error(C(188))
    }
    if (n.return !== r.return) ((n = i), (r = o))
    else {
      for (var s = !1, a = i.child; a; ) {
        if (a === n) {
          ;((s = !0), (n = i), (r = o))
          break
        }
        if (a === r) {
          ;((s = !0), (r = i), (n = o))
          break
        }
        a = a.sibling
      }
      if (!s) {
        for (a = o.child; a; ) {
          if (a === n) {
            ;((s = !0), (n = o), (r = i))
            break
          }
          if (a === r) {
            ;((s = !0), (r = o), (n = i))
            break
          }
          a = a.sibling
        }
        if (!s) throw Error(C(189))
      }
    }
    if (n.alternate !== r) throw Error(C(190))
  }
  if (n.tag !== 3) throw Error(C(188))
  return n.stateNode.current === n ? e : t
}
function Ah(e) {
  return ((e = B0(e)), e !== null ? Rh(e) : null)
}
function Rh(e) {
  if (e.tag === 5 || e.tag === 6) return e
  for (e = e.child; e !== null; ) {
    var t = Rh(e)
    if (t !== null) return t
    e = e.sibling
  }
  return null
}
var jh = _e.unstable_scheduleCallback,
  Sc = _e.unstable_cancelCallback,
  z0 = _e.unstable_shouldYield,
  U0 = _e.unstable_requestPaint,
  q = _e.unstable_now,
  $0 = _e.unstable_getCurrentPriorityLevel,
  Za = _e.unstable_ImmediatePriority,
  _h = _e.unstable_UserBlockingPriority,
  Ro = _e.unstable_NormalPriority,
  H0 = _e.unstable_LowPriority,
  Fh = _e.unstable_IdlePriority,
  as = null,
  rt = null
function K0(e) {
  if (rt && typeof rt.onCommitFiberRoot == 'function')
    try {
      rt.onCommitFiberRoot(as, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var Ge = Math.clz32 ? Math.clz32 : Q0,
  Z0 = Math.log,
  Y0 = Math.LN2
function Q0(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((Z0(e) / Y0) | 0)) | 0)
}
var Zi = 64,
  Yi = 4194304
function Or(e) {
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
function jo(e, t) {
  var n = e.pendingLanes
  if (n === 0) return 0
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    s = n & 268435455
  if (s !== 0) {
    var a = s & ~i
    a !== 0 ? (r = Or(a)) : ((o &= s), o !== 0 && (r = Or(o)))
  } else ((s = n & ~i), s !== 0 ? (r = Or(s)) : o !== 0 && (r = Or(o)))
  if (r === 0) return 0
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - Ge(t)), (i = 1 << n), (r |= e[n]), (t &= ~i))
  return r
}
function b0(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250
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
      return t + 5e3
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
function G0(e, t) {
  for (
    var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes;
    0 < o;

  ) {
    var s = 31 - Ge(o),
      a = 1 << s,
      l = i[s]
    ;(l === -1 ? (!(a & n) || a & r) && (i[s] = b0(a, t)) : l <= t && (e.expiredLanes |= a),
      (o &= ~a))
  }
}
function Wl(e) {
  return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0)
}
function Dh() {
  var e = Zi
  return ((Zi <<= 1), !(Zi & 4194240) && (Zi = 64), e)
}
function Os(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e)
  return t
}
function Ai(e, t, n) {
  ;((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ge(t)),
    (e[t] = n))
}
function X0(e, t) {
  var n = e.pendingLanes & ~t
  ;((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements))
  var r = e.eventTimes
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Ge(n),
      o = 1 << i
    ;((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o))
  }
}
function Ya(e, t) {
  var n = (e.entangledLanes |= t)
  for (e = e.entanglements; n; ) {
    var r = 31 - Ge(n),
      i = 1 << r
    ;((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i))
  }
}
var W = 0
function Vh(e) {
  return ((e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1)
}
var Nh,
  Qa,
  Wh,
  Oh,
  Ih,
  Ol = !1,
  Qi = [],
  Ft = null,
  Dt = null,
  Vt = null,
  li = new Map(),
  ai = new Map(),
  Tt = [],
  J0 =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    )
function Pc(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Ft = null
      break
    case 'dragenter':
    case 'dragleave':
      Dt = null
      break
    case 'mouseover':
    case 'mouseout':
      Vt = null
      break
    case 'pointerover':
    case 'pointerout':
      li.delete(t.pointerId)
      break
    case 'gotpointercapture':
    case 'lostpointercapture':
      ai.delete(t.pointerId)
  }
}
function Ar(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = ji(t)), t !== null && Qa(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e)
}
function q0(e, t, n, r, i) {
  switch (t) {
    case 'focusin':
      return ((Ft = Ar(Ft, e, t, n, r, i)), !0)
    case 'dragenter':
      return ((Dt = Ar(Dt, e, t, n, r, i)), !0)
    case 'mouseover':
      return ((Vt = Ar(Vt, e, t, n, r, i)), !0)
    case 'pointerover':
      var o = i.pointerId
      return (li.set(o, Ar(li.get(o) || null, e, t, n, r, i)), !0)
    case 'gotpointercapture':
      return ((o = i.pointerId), ai.set(o, Ar(ai.get(o) || null, e, t, n, r, i)), !0)
  }
  return !1
}
function Bh(e) {
  var t = ln(e.target)
  if (t !== null) {
    var n = xn(t)
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Mh(n)), t !== null)) {
          ;((e.blockedOn = t),
            Ih(e.priority, function () {
              Wh(n)
            }))
          return
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null
        return
      }
    }
  }
  e.blockedOn = null
}
function po(e) {
  if (e.blockedOn !== null) return !1
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Il(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent)
    if (n === null) {
      n = e.nativeEvent
      var r = new n.constructor(n.type, n)
      ;((Fl = r), n.target.dispatchEvent(r), (Fl = null))
    } else return ((t = ji(n)), t !== null && Qa(t), (e.blockedOn = n), !1)
    t.shift()
  }
  return !0
}
function Cc(e, t, n) {
  po(e) && n.delete(t)
}
function eg() {
  ;((Ol = !1),
    Ft !== null && po(Ft) && (Ft = null),
    Dt !== null && po(Dt) && (Dt = null),
    Vt !== null && po(Vt) && (Vt = null),
    li.forEach(Cc),
    ai.forEach(Cc))
}
function Rr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ol || ((Ol = !0), _e.unstable_scheduleCallback(_e.unstable_NormalPriority, eg)))
}
function ui(e) {
  function t(i) {
    return Rr(i, e)
  }
  if (0 < Qi.length) {
    Rr(Qi[0], e)
    for (var n = 1; n < Qi.length; n++) {
      var r = Qi[n]
      r.blockedOn === e && (r.blockedOn = null)
    }
  }
  for (
    Ft !== null && Rr(Ft, e),
      Dt !== null && Rr(Dt, e),
      Vt !== null && Rr(Vt, e),
      li.forEach(t),
      ai.forEach(t),
      n = 0;
    n < Tt.length;
    n++
  )
    ((r = Tt[n]), r.blockedOn === e && (r.blockedOn = null))
  for (; 0 < Tt.length && ((n = Tt[0]), n.blockedOn === null); )
    (Bh(n), n.blockedOn === null && Tt.shift())
}
var sr = xt.ReactCurrentBatchConfig,
  _o = !0
function tg(e, t, n, r) {
  var i = W,
    o = sr.transition
  sr.transition = null
  try {
    ;((W = 1), ba(e, t, n, r))
  } finally {
    ;((W = i), (sr.transition = o))
  }
}
function ng(e, t, n, r) {
  var i = W,
    o = sr.transition
  sr.transition = null
  try {
    ;((W = 4), ba(e, t, n, r))
  } finally {
    ;((W = i), (sr.transition = o))
  }
}
function ba(e, t, n, r) {
  if (_o) {
    var i = Il(e, t, n, r)
    if (i === null) (Qs(e, t, r, Fo, n), Pc(e, r))
    else if (q0(i, e, t, n, r)) r.stopPropagation()
    else if ((Pc(e, r), t & 4 && -1 < J0.indexOf(e))) {
      for (; i !== null; ) {
        var o = ji(i)
        if ((o !== null && Nh(o), (o = Il(e, t, n, r)), o === null && Qs(e, t, r, Fo, n), o === i))
          break
        i = o
      }
      i !== null && r.stopPropagation()
    } else Qs(e, t, r, null, n)
  }
}
var Fo = null
function Il(e, t, n, r) {
  if (((Fo = null), (e = Ka(r)), (e = ln(e)), e !== null))
    if (((t = xn(e)), t === null)) e = null
    else if (((n = t.tag), n === 13)) {
      if (((e = Mh(t)), e !== null)) return e
      e = null
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null
      e = null
    } else t !== e && (e = null)
  return ((Fo = e), null)
}
function zh(e) {
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
      switch ($0()) {
        case Za:
          return 1
        case _h:
          return 4
        case Ro:
        case H0:
          return 16
        case Fh:
          return 536870912
        default:
          return 16
      }
    default:
      return 16
  }
}
var At = null,
  Ga = null,
  mo = null
function Uh() {
  if (mo) return mo
  var e,
    t = Ga,
    n = t.length,
    r,
    i = 'value' in At ? At.value : At.textContent,
    o = i.length
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
  return (mo = i.slice(e, 1 < r ? 1 - r : void 0))
}
function go(e) {
  var t = e.keyCode
  return (
    'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  )
}
function bi() {
  return !0
}
function Tc() {
  return !1
}
function Ve(e) {
  function t(n, r, i, o, s) {
    ;((this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = s),
      (this.currentTarget = null))
    for (var a in e) e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]))
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? bi
        : Tc),
      (this.isPropagationStopped = Tc),
      this
    )
  }
  return (
    Q(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0
        var n = this.nativeEvent
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = bi))
      },
      stopPropagation: function () {
        var n = this.nativeEvent
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = bi))
      },
      persist: function () {},
      isPersistent: bi,
    }),
    t
  )
}
var xr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Xa = Ve(xr),
  Ri = Q({}, xr, { view: 0, detail: 0 }),
  rg = Ve(Ri),
  Is,
  Bs,
  jr,
  us = Q({}, Ri, {
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
    getModifierState: Ja,
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
        : (e !== jr &&
            (jr && e.type === 'mousemove'
              ? ((Is = e.screenX - jr.screenX), (Bs = e.screenY - jr.screenY))
              : (Bs = Is = 0),
            (jr = e)),
          Is)
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : Bs
    },
  }),
  Mc = Ve(us),
  ig = Q({}, us, { dataTransfer: 0 }),
  og = Ve(ig),
  sg = Q({}, Ri, { relatedTarget: 0 }),
  zs = Ve(sg),
  lg = Q({}, xr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  ag = Ve(lg),
  ug = Q({}, xr, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData
    },
  }),
  cg = Ve(ug),
  fg = Q({}, xr, { data: 0 }),
  Ac = Ve(fg),
  dg = {
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
  hg = {
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
  pg = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' }
function mg(e) {
  var t = this.nativeEvent
  return t.getModifierState ? t.getModifierState(e) : (e = pg[e]) ? !!t[e] : !1
}
function Ja() {
  return mg
}
var gg = Q({}, Ri, {
    key: function (e) {
      if (e.key) {
        var t = dg[e.key] || e.key
        if (t !== 'Unidentified') return t
      }
      return e.type === 'keypress'
        ? ((e = go(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? hg[e.keyCode] || 'Unidentified'
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
    getModifierState: Ja,
    charCode: function (e) {
      return e.type === 'keypress' ? go(e) : 0
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0
    },
    which: function (e) {
      return e.type === 'keypress'
        ? go(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0
    },
  }),
  yg = Ve(gg),
  vg = Q({}, us, {
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
  Rc = Ve(vg),
  kg = Q({}, Ri, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ja,
  }),
  Eg = Ve(kg),
  xg = Q({}, xr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  wg = Ve(xg),
  Lg = Q({}, us, {
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
  Sg = Ve(Lg),
  Pg = [9, 13, 27, 32],
  qa = gt && 'CompositionEvent' in window,
  Yr = null
gt && 'documentMode' in document && (Yr = document.documentMode)
var Cg = gt && 'TextEvent' in window && !Yr,
  $h = gt && (!qa || (Yr && 8 < Yr && 11 >= Yr)),
  jc = ' ',
  _c = !1
function Hh(e, t) {
  switch (e) {
    case 'keyup':
      return Pg.indexOf(t.keyCode) !== -1
    case 'keydown':
      return t.keyCode !== 229
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0
    default:
      return !1
  }
}
function Kh(e) {
  return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null)
}
var Un = !1
function Tg(e, t) {
  switch (e) {
    case 'compositionend':
      return Kh(t)
    case 'keypress':
      return t.which !== 32 ? null : ((_c = !0), jc)
    case 'textInput':
      return ((e = t.data), e === jc && _c ? null : e)
    default:
      return null
  }
}
function Mg(e, t) {
  if (Un)
    return e === 'compositionend' || (!qa && Hh(e, t))
      ? ((e = Uh()), (mo = Ga = At = null), (Un = !1), e)
      : null
  switch (e) {
    case 'paste':
      return null
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char
        if (t.which) return String.fromCharCode(t.which)
      }
      return null
    case 'compositionend':
      return $h && t.locale !== 'ko' ? null : t.data
    default:
      return null
  }
}
var Ag = {
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
function Fc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase()
  return t === 'input' ? !!Ag[e.type] : t === 'textarea'
}
function Zh(e, t, n, r) {
  ;(Lh(r),
    (t = Do(t, 'onChange')),
    0 < t.length &&
      ((n = new Xa('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t })))
}
var Qr = null,
  ci = null
function Rg(e) {
  rp(e, 0)
}
function cs(e) {
  var t = Kn(e)
  if (gh(t)) return e
}
function jg(e, t) {
  if (e === 'change') return t
}
var Yh = !1
if (gt) {
  var Us
  if (gt) {
    var $s = 'oninput' in document
    if (!$s) {
      var Dc = document.createElement('div')
      ;(Dc.setAttribute('oninput', 'return;'), ($s = typeof Dc.oninput == 'function'))
    }
    Us = $s
  } else Us = !1
  Yh = Us && (!document.documentMode || 9 < document.documentMode)
}
function Vc() {
  Qr && (Qr.detachEvent('onpropertychange', Qh), (ci = Qr = null))
}
function Qh(e) {
  if (e.propertyName === 'value' && cs(ci)) {
    var t = []
    ;(Zh(t, ci, e, Ka(e)), Th(Rg, t))
  }
}
function _g(e, t, n) {
  e === 'focusin'
    ? (Vc(), (Qr = t), (ci = n), Qr.attachEvent('onpropertychange', Qh))
    : e === 'focusout' && Vc()
}
function Fg(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return cs(ci)
}
function Dg(e, t) {
  if (e === 'click') return cs(t)
}
function Vg(e, t) {
  if (e === 'input' || e === 'change') return cs(t)
}
function Ng(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
}
var Je = typeof Object.is == 'function' ? Object.is : Ng
function fi(e, t) {
  if (Je(e, t)) return !0
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1
  var n = Object.keys(e),
    r = Object.keys(t)
  if (n.length !== r.length) return !1
  for (r = 0; r < n.length; r++) {
    var i = n[r]
    if (!xl.call(t, i) || !Je(e[i], t[i])) return !1
  }
  return !0
}
function Nc(e) {
  for (; e && e.firstChild; ) e = e.firstChild
  return e
}
function Wc(e, t) {
  var n = Nc(e)
  e = 0
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e }
      e = r
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling
          break e
        }
        n = n.parentNode
      }
      n = void 0
    }
    n = Nc(n)
  }
}
function bh(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? bh(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1
}
function Gh() {
  for (var e = window, t = To(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string'
    } catch {
      n = !1
    }
    if (n) e = t.contentWindow
    else break
    t = To(e.document)
  }
  return t
}
function eu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase()
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  )
}
function Wg(e) {
  var t = Gh(),
    n = e.focusedElem,
    r = e.selectionRange
  if (t !== n && n && n.ownerDocument && bh(n.ownerDocument.documentElement, n)) {
    if (r !== null && eu(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
        ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)))
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)
      ) {
        e = e.getSelection()
        var i = n.textContent.length,
          o = Math.min(r.start, i)
        ;((r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = Wc(n, o)))
        var s = Wc(n, r)
        i &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)))
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop })
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top))
  }
}
var Og = gt && 'documentMode' in document && 11 >= document.documentMode,
  $n = null,
  Bl = null,
  br = null,
  zl = !1
function Oc(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument
  zl ||
    $n == null ||
    $n !== To(r) ||
    ((r = $n),
    'selectionStart' in r && eu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (br && fi(br, r)) ||
      ((br = r),
      (r = Do(Bl, 'onSelect')),
      0 < r.length &&
        ((t = new Xa('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = $n))))
}
function Gi(e, t) {
  var n = {}
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  )
}
var Hn = {
    animationend: Gi('Animation', 'AnimationEnd'),
    animationiteration: Gi('Animation', 'AnimationIteration'),
    animationstart: Gi('Animation', 'AnimationStart'),
    transitionend: Gi('Transition', 'TransitionEnd'),
  },
  Hs = {},
  Xh = {}
gt &&
  ((Xh = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete Hn.animationend.animation,
    delete Hn.animationiteration.animation,
    delete Hn.animationstart.animation),
  'TransitionEvent' in window || delete Hn.transitionend.transition)
function fs(e) {
  if (Hs[e]) return Hs[e]
  if (!Hn[e]) return e
  var t = Hn[e],
    n
  for (n in t) if (t.hasOwnProperty(n) && n in Xh) return (Hs[e] = t[n])
  return e
}
var Jh = fs('animationend'),
  qh = fs('animationiteration'),
  ep = fs('animationstart'),
  tp = fs('transitionend'),
  np = new Map(),
  Ic =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    )
function Yt(e, t) {
  ;(np.set(e, t), En(t, [e]))
}
for (var Ks = 0; Ks < Ic.length; Ks++) {
  var Zs = Ic[Ks],
    Ig = Zs.toLowerCase(),
    Bg = Zs[0].toUpperCase() + Zs.slice(1)
  Yt(Ig, 'on' + Bg)
}
Yt(Jh, 'onAnimationEnd')
Yt(qh, 'onAnimationIteration')
Yt(ep, 'onAnimationStart')
Yt('dblclick', 'onDoubleClick')
Yt('focusin', 'onFocus')
Yt('focusout', 'onBlur')
Yt(tp, 'onTransitionEnd')
ur('onMouseEnter', ['mouseout', 'mouseover'])
ur('onMouseLeave', ['mouseout', 'mouseover'])
ur('onPointerEnter', ['pointerout', 'pointerover'])
ur('onPointerLeave', ['pointerout', 'pointerover'])
En('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' '))
En(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' ')
)
En('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste'])
En('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' '))
En('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' '))
En('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' '))
var Ir =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  zg = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Ir))
function Bc(e, t, n) {
  var r = e.type || 'unknown-event'
  ;((e.currentTarget = n), I0(r, t, void 0, e), (e.currentTarget = null))
}
function rp(e, t) {
  t = (t & 4) !== 0
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event
    r = r.listeners
    e: {
      var o = void 0
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var a = r[s],
            l = a.instance,
            u = a.currentTarget
          if (((a = a.listener), l !== o && i.isPropagationStopped())) break e
          ;(Bc(i, a, u), (o = l))
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((a = r[s]),
            (l = a.instance),
            (u = a.currentTarget),
            (a = a.listener),
            l !== o && i.isPropagationStopped())
          )
            break e
          ;(Bc(i, a, u), (o = l))
        }
    }
  }
  if (Ao) throw ((e = Nl), (Ao = !1), (Nl = null), e)
}
function I(e, t) {
  var n = t[Zl]
  n === void 0 && (n = t[Zl] = new Set())
  var r = e + '__bubble'
  n.has(r) || (ip(t, e, 2, !1), n.add(r))
}
function Ys(e, t, n) {
  var r = 0
  ;(t && (r |= 4), ip(n, e, r, t))
}
var Xi = '_reactListening' + Math.random().toString(36).slice(2)
function di(e) {
  if (!e[Xi]) {
    ;((e[Xi] = !0),
      fh.forEach(function (n) {
        n !== 'selectionchange' && (zg.has(n) || Ys(n, !1, e), Ys(n, !0, e))
      }))
    var t = e.nodeType === 9 ? e : e.ownerDocument
    t === null || t[Xi] || ((t[Xi] = !0), Ys('selectionchange', !1, t))
  }
}
function ip(e, t, n, r) {
  switch (zh(t)) {
    case 1:
      var i = tg
      break
    case 4:
      i = ng
      break
    default:
      i = ba
  }
  ;((n = i.bind(null, t, n, e)),
    (i = void 0),
    !Vl || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1))
}
function Qs(e, t, n, r, i) {
  var o = r
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return
      var s = r.tag
      if (s === 3 || s === 4) {
        var a = r.stateNode.containerInfo
        if (a === i || (a.nodeType === 8 && a.parentNode === i)) break
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var l = s.tag
            if (
              (l === 3 || l === 4) &&
              ((l = s.stateNode.containerInfo), l === i || (l.nodeType === 8 && l.parentNode === i))
            )
              return
            s = s.return
          }
        for (; a !== null; ) {
          if (((s = ln(a)), s === null)) return
          if (((l = s.tag), l === 5 || l === 6)) {
            r = o = s
            continue e
          }
          a = a.parentNode
        }
      }
      r = r.return
    }
  Th(function () {
    var u = o,
      c = Ka(n),
      d = []
    e: {
      var h = np.get(e)
      if (h !== void 0) {
        var y = Xa,
          v = e
        switch (e) {
          case 'keypress':
            if (go(n) === 0) break e
          case 'keydown':
          case 'keyup':
            y = yg
            break
          case 'focusin':
            ;((v = 'focus'), (y = zs))
            break
          case 'focusout':
            ;((v = 'blur'), (y = zs))
            break
          case 'beforeblur':
          case 'afterblur':
            y = zs
            break
          case 'click':
            if (n.button === 2) break e
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            y = Mc
            break
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            y = og
            break
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            y = Eg
            break
          case Jh:
          case qh:
          case ep:
            y = ag
            break
          case tp:
            y = wg
            break
          case 'scroll':
            y = rg
            break
          case 'wheel':
            y = Sg
            break
          case 'copy':
          case 'cut':
          case 'paste':
            y = cg
            break
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            y = Rc
        }
        var k = (t & 4) !== 0,
          E = !k && e === 'scroll',
          m = k ? (h !== null ? h + 'Capture' : null) : h
        k = []
        for (var p = u, g; p !== null; ) {
          g = p
          var x = g.stateNode
          if (
            (g.tag === 5 &&
              x !== null &&
              ((g = x), m !== null && ((x = si(p, m)), x != null && k.push(hi(p, x, g)))),
            E)
          )
            break
          p = p.return
        }
        0 < k.length && ((h = new y(h, v, null, n, c)), d.push({ event: h, listeners: k }))
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === 'mouseover' || e === 'pointerover'),
          (y = e === 'mouseout' || e === 'pointerout'),
          h && n !== Fl && (v = n.relatedTarget || n.fromElement) && (ln(v) || v[yt]))
        )
          break e
        if (
          (y || h) &&
          ((h =
            c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window),
          y
            ? ((v = n.relatedTarget || n.toElement),
              (y = u),
              (v = v ? ln(v) : null),
              v !== null && ((E = xn(v)), v !== E || (v.tag !== 5 && v.tag !== 6)) && (v = null))
            : ((y = null), (v = u)),
          y !== v)
        ) {
          if (
            ((k = Mc),
            (x = 'onMouseLeave'),
            (m = 'onMouseEnter'),
            (p = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((k = Rc), (x = 'onPointerLeave'), (m = 'onPointerEnter'), (p = 'pointer')),
            (E = y == null ? h : Kn(y)),
            (g = v == null ? h : Kn(v)),
            (h = new k(x, p + 'leave', y, n, c)),
            (h.target = E),
            (h.relatedTarget = g),
            (x = null),
            ln(c) === u &&
              ((k = new k(m, p + 'enter', v, n, c)),
              (k.target = g),
              (k.relatedTarget = E),
              (x = k)),
            (E = x),
            y && v)
          )
            t: {
              for (k = y, m = v, p = 0, g = k; g; g = On(g)) p++
              for (g = 0, x = m; x; x = On(x)) g++
              for (; 0 < p - g; ) ((k = On(k)), p--)
              for (; 0 < g - p; ) ((m = On(m)), g--)
              for (; p--; ) {
                if (k === m || (m !== null && k === m.alternate)) break t
                ;((k = On(k)), (m = On(m)))
              }
              k = null
            }
          else k = null
          ;(y !== null && zc(d, h, y, k, !1), v !== null && E !== null && zc(d, E, v, k, !0))
        }
      }
      e: {
        if (
          ((h = u ? Kn(u) : window),
          (y = h.nodeName && h.nodeName.toLowerCase()),
          y === 'select' || (y === 'input' && h.type === 'file'))
        )
          var w = jg
        else if (Fc(h))
          if (Yh) w = Vg
          else {
            w = Fg
            var P = _g
          }
        else
          (y = h.nodeName) &&
            y.toLowerCase() === 'input' &&
            (h.type === 'checkbox' || h.type === 'radio') &&
            (w = Dg)
        if (w && (w = w(e, u))) {
          Zh(d, w, n, c)
          break e
        }
        ;(P && P(e, h, u),
          e === 'focusout' &&
            (P = h._wrapperState) &&
            P.controlled &&
            h.type === 'number' &&
            Ml(h, 'number', h.value))
      }
      switch (((P = u ? Kn(u) : window), e)) {
        case 'focusin':
          ;(Fc(P) || P.contentEditable === 'true') && (($n = P), (Bl = u), (br = null))
          break
        case 'focusout':
          br = Bl = $n = null
          break
        case 'mousedown':
          zl = !0
          break
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ;((zl = !1), Oc(d, n, c))
          break
        case 'selectionchange':
          if (Og) break
        case 'keydown':
        case 'keyup':
          Oc(d, n, c)
      }
      var T
      if (qa)
        e: {
          switch (e) {
            case 'compositionstart':
              var S = 'onCompositionStart'
              break e
            case 'compositionend':
              S = 'onCompositionEnd'
              break e
            case 'compositionupdate':
              S = 'onCompositionUpdate'
              break e
          }
          S = void 0
        }
      else
        Un
          ? Hh(e, n) && (S = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (S = 'onCompositionStart')
      ;(S &&
        ($h &&
          n.locale !== 'ko' &&
          (Un || S !== 'onCompositionStart'
            ? S === 'onCompositionEnd' && Un && (T = Uh())
            : ((At = c), (Ga = 'value' in At ? At.value : At.textContent), (Un = !0))),
        (P = Do(u, S)),
        0 < P.length &&
          ((S = new Ac(S, e, null, n, c)),
          d.push({ event: S, listeners: P }),
          T ? (S.data = T) : ((T = Kh(n)), T !== null && (S.data = T)))),
        (T = Cg ? Tg(e, n) : Mg(e, n)) &&
          ((u = Do(u, 'onBeforeInput')),
          0 < u.length &&
            ((c = new Ac('onBeforeInput', 'beforeinput', null, n, c)),
            d.push({ event: c, listeners: u }),
            (c.data = T))))
    }
    rp(d, t)
  })
}
function hi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n }
}
function Do(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var i = e,
      o = i.stateNode
    ;(i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = si(e, n)),
      o != null && r.unshift(hi(e, o, i)),
      (o = si(e, t)),
      o != null && r.push(hi(e, o, i))),
      (e = e.return))
  }
  return r
}
function On(e) {
  if (e === null) return null
  do e = e.return
  while (e && e.tag !== 5)
  return e || null
}
function zc(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n,
      l = a.alternate,
      u = a.stateNode
    if (l !== null && l === r) break
    ;(a.tag === 5 &&
      u !== null &&
      ((a = u),
      i
        ? ((l = si(n, o)), l != null && s.unshift(hi(n, l, a)))
        : i || ((l = si(n, o)), l != null && s.push(hi(n, l, a)))),
      (n = n.return))
  }
  s.length !== 0 && e.push({ event: t, listeners: s })
}
var Ug = /\r\n?/g,
  $g = /\u0000|\uFFFD/g
function Uc(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      Ug,
      `
`
    )
    .replace($g, '')
}
function Ji(e, t, n) {
  if (((t = Uc(t)), Uc(e) !== t && n)) throw Error(C(425))
}
function Vo() {}
var Ul = null,
  $l = null
function Hl(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  )
}
var Kl = typeof setTimeout == 'function' ? setTimeout : void 0,
  Hg = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  $c = typeof Promise == 'function' ? Promise : void 0,
  Kg =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof $c < 'u'
        ? function (e) {
            return $c.resolve(null).then(e).catch(Zg)
          }
        : Kl
function Zg(e) {
  setTimeout(function () {
    throw e
  })
}
function bs(e, t) {
  var n = t,
    r = 0
  do {
    var i = n.nextSibling
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === '/$')) {
        if (r === 0) {
          ;(e.removeChild(i), ui(t))
          return
        }
        r--
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++
    n = i
  } while (n)
  ui(t)
}
function Nt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType
    if (t === 1 || t === 3) break
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break
      if (t === '/$') return null
    }
  }
  return e
}
function Hc(e) {
  e = e.previousSibling
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e
        t--
      } else n === '/$' && t++
    }
    e = e.previousSibling
  }
  return null
}
var wr = Math.random().toString(36).slice(2),
  nt = '__reactFiber$' + wr,
  pi = '__reactProps$' + wr,
  yt = '__reactContainer$' + wr,
  Zl = '__reactEvents$' + wr,
  Yg = '__reactListeners$' + wr,
  Qg = '__reactHandles$' + wr
function ln(e) {
  var t = e[nt]
  if (t) return t
  for (var n = e.parentNode; n; ) {
    if ((t = n[yt] || n[nt])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = Hc(e); e !== null; ) {
          if ((n = e[nt])) return n
          e = Hc(e)
        }
      return t
    }
    ;((e = n), (n = e.parentNode))
  }
  return null
}
function ji(e) {
  return (
    (e = e[nt] || e[yt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  )
}
function Kn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode
  throw Error(C(33))
}
function ds(e) {
  return e[pi] || null
}
var Yl = [],
  Zn = -1
function Qt(e) {
  return { current: e }
}
function B(e) {
  0 > Zn || ((e.current = Yl[Zn]), (Yl[Zn] = null), Zn--)
}
function O(e, t) {
  ;(Zn++, (Yl[Zn] = e.current), (e.current = t))
}
var Ht = {},
  ge = Qt(Ht),
  Se = Qt(!1),
  pn = Ht
function cr(e, t) {
  var n = e.type.contextTypes
  if (!n) return Ht
  var r = e.stateNode
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext
  var i = {},
    o
  for (o in n) i[o] = t[o]
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  )
}
function Pe(e) {
  return ((e = e.childContextTypes), e != null)
}
function No() {
  ;(B(Se), B(ge))
}
function Kc(e, t, n) {
  if (ge.current !== Ht) throw Error(C(168))
  ;(O(ge, t), O(Se, n))
}
function op(e, t, n) {
  var r = e.stateNode
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n
  r = r.getChildContext()
  for (var i in r) if (!(i in t)) throw Error(C(108, _0(e) || 'Unknown', i))
  return Q({}, n, r)
}
function Wo(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ht),
    (pn = ge.current),
    O(ge, e),
    O(Se, Se.current),
    !0
  )
}
function Zc(e, t, n) {
  var r = e.stateNode
  if (!r) throw Error(C(169))
  ;(n
    ? ((e = op(e, t, pn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      B(Se),
      B(ge),
      O(ge, e))
    : B(Se),
    O(Se, n))
}
var ut = null,
  hs = !1,
  Gs = !1
function sp(e) {
  ut === null ? (ut = [e]) : ut.push(e)
}
function bg(e) {
  ;((hs = !0), sp(e))
}
function bt() {
  if (!Gs && ut !== null) {
    Gs = !0
    var e = 0,
      t = W
    try {
      var n = ut
      for (W = 1; e < n.length; e++) {
        var r = n[e]
        do r = r(!0)
        while (r !== null)
      }
      ;((ut = null), (hs = !1))
    } catch (i) {
      throw (ut !== null && (ut = ut.slice(e + 1)), jh(Za, bt), i)
    } finally {
      ;((W = t), (Gs = !1))
    }
  }
  return null
}
var Yn = [],
  Qn = 0,
  Oo = null,
  Io = 0,
  Ie = [],
  Be = 0,
  mn = null,
  ft = 1,
  dt = ''
function nn(e, t) {
  ;((Yn[Qn++] = Io), (Yn[Qn++] = Oo), (Oo = e), (Io = t))
}
function lp(e, t, n) {
  ;((Ie[Be++] = ft), (Ie[Be++] = dt), (Ie[Be++] = mn), (mn = e))
  var r = ft
  e = dt
  var i = 32 - Ge(r) - 1
  ;((r &= ~(1 << i)), (n += 1))
  var o = 32 - Ge(t) + i
  if (30 < o) {
    var s = i - (i % 5)
    ;((o = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (ft = (1 << (32 - Ge(t) + i)) | (n << i) | r),
      (dt = o + e))
  } else ((ft = (1 << o) | (n << i) | r), (dt = e))
}
function tu(e) {
  e.return !== null && (nn(e, 1), lp(e, 1, 0))
}
function nu(e) {
  for (; e === Oo; ) ((Oo = Yn[--Qn]), (Yn[Qn] = null), (Io = Yn[--Qn]), (Yn[Qn] = null))
  for (; e === mn; )
    ((mn = Ie[--Be]),
      (Ie[Be] = null),
      (dt = Ie[--Be]),
      (Ie[Be] = null),
      (ft = Ie[--Be]),
      (Ie[Be] = null))
}
var Re = null,
  Ae = null,
  U = !1,
  be = null
function ap(e, t) {
  var n = ze(5, null, null, 0)
  ;((n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n))
}
function Yc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (Re = e), (Ae = Nt(t.firstChild)), !0) : !1
      )
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Re = e), (Ae = null), !0) : !1
      )
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = mn !== null ? { id: ft, overflow: dt } : null),
            (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
            (n = ze(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Re = e),
            (Ae = null),
            !0)
          : !1
      )
    default:
      return !1
  }
}
function Ql(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function bl(e) {
  if (U) {
    var t = Ae
    if (t) {
      var n = t
      if (!Yc(e, t)) {
        if (Ql(e)) throw Error(C(418))
        t = Nt(n.nextSibling)
        var r = Re
        t && Yc(e, t) ? ap(r, n) : ((e.flags = (e.flags & -4097) | 2), (U = !1), (Re = e))
      }
    } else {
      if (Ql(e)) throw Error(C(418))
      ;((e.flags = (e.flags & -4097) | 2), (U = !1), (Re = e))
    }
  }
}
function Qc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return
  Re = e
}
function qi(e) {
  if (e !== Re) return !1
  if (!U) return (Qc(e), (U = !0), !1)
  var t
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type), (t = t !== 'head' && t !== 'body' && !Hl(e.type, e.memoizedProps))),
    t && (t = Ae))
  ) {
    if (Ql(e)) throw (up(), Error(C(418)))
    for (; t; ) (ap(e, t), (t = Nt(t.nextSibling)))
  }
  if ((Qc(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(C(317))
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data
          if (n === '/$') {
            if (t === 0) {
              Ae = Nt(e.nextSibling)
              break e
            }
            t--
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++
        }
        e = e.nextSibling
      }
      Ae = null
    }
  } else Ae = Re ? Nt(e.stateNode.nextSibling) : null
  return !0
}
function up() {
  for (var e = Ae; e; ) e = Nt(e.nextSibling)
}
function fr() {
  ;((Ae = Re = null), (U = !1))
}
function ru(e) {
  be === null ? (be = [e]) : be.push(e)
}
var Gg = xt.ReactCurrentBatchConfig
function _r(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(C(309))
        var r = n.stateNode
      }
      if (!r) throw Error(C(147, e))
      var i = r,
        o = '' + e
      return t !== null && t.ref !== null && typeof t.ref == 'function' && t.ref._stringRef === o
        ? t.ref
        : ((t = function (s) {
            var a = i.refs
            s === null ? delete a[o] : (a[o] = s)
          }),
          (t._stringRef = o),
          t)
    }
    if (typeof e != 'string') throw Error(C(284))
    if (!n._owner) throw Error(C(290, e))
  }
  return e
}
function eo(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      C(31, e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e)
    )
  )
}
function bc(e) {
  var t = e._init
  return t(e._payload)
}
function cp(e) {
  function t(m, p) {
    if (e) {
      var g = m.deletions
      g === null ? ((m.deletions = [p]), (m.flags |= 16)) : g.push(p)
    }
  }
  function n(m, p) {
    if (!e) return null
    for (; p !== null; ) (t(m, p), (p = p.sibling))
    return null
  }
  function r(m, p) {
    for (m = new Map(); p !== null; )
      (p.key !== null ? m.set(p.key, p) : m.set(p.index, p), (p = p.sibling))
    return m
  }
  function i(m, p) {
    return ((m = Bt(m, p)), (m.index = 0), (m.sibling = null), m)
  }
  function o(m, p, g) {
    return (
      (m.index = g),
      e
        ? ((g = m.alternate),
          g !== null ? ((g = g.index), g < p ? ((m.flags |= 2), p) : g) : ((m.flags |= 2), p))
        : ((m.flags |= 1048576), p)
    )
  }
  function s(m) {
    return (e && m.alternate === null && (m.flags |= 2), m)
  }
  function a(m, p, g, x) {
    return p === null || p.tag !== 6
      ? ((p = rl(g, m.mode, x)), (p.return = m), p)
      : ((p = i(p, g)), (p.return = m), p)
  }
  function l(m, p, g, x) {
    var w = g.type
    return w === zn
      ? c(m, p, g.props.children, x, g.key)
      : p !== null &&
          (p.elementType === w ||
            (typeof w == 'object' && w !== null && w.$$typeof === Pt && bc(w) === p.type))
        ? ((x = i(p, g.props)), (x.ref = _r(m, p, g)), (x.return = m), x)
        : ((x = Lo(g.type, g.key, g.props, null, m.mode, x)),
          (x.ref = _r(m, p, g)),
          (x.return = m),
          x)
  }
  function u(m, p, g, x) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== g.containerInfo ||
      p.stateNode.implementation !== g.implementation
      ? ((p = il(g, m.mode, x)), (p.return = m), p)
      : ((p = i(p, g.children || [])), (p.return = m), p)
  }
  function c(m, p, g, x, w) {
    return p === null || p.tag !== 7
      ? ((p = dn(g, m.mode, x, w)), (p.return = m), p)
      : ((p = i(p, g)), (p.return = m), p)
  }
  function d(m, p, g) {
    if ((typeof p == 'string' && p !== '') || typeof p == 'number')
      return ((p = rl('' + p, m.mode, g)), (p.return = m), p)
    if (typeof p == 'object' && p !== null) {
      switch (p.$$typeof) {
        case $i:
          return (
            (g = Lo(p.type, p.key, p.props, null, m.mode, g)),
            (g.ref = _r(m, null, p)),
            (g.return = m),
            g
          )
        case Bn:
          return ((p = il(p, m.mode, g)), (p.return = m), p)
        case Pt:
          var x = p._init
          return d(m, x(p._payload), g)
      }
      if (Wr(p) || Tr(p)) return ((p = dn(p, m.mode, g, null)), (p.return = m), p)
      eo(m, p)
    }
    return null
  }
  function h(m, p, g, x) {
    var w = p !== null ? p.key : null
    if ((typeof g == 'string' && g !== '') || typeof g == 'number')
      return w !== null ? null : a(m, p, '' + g, x)
    if (typeof g == 'object' && g !== null) {
      switch (g.$$typeof) {
        case $i:
          return g.key === w ? l(m, p, g, x) : null
        case Bn:
          return g.key === w ? u(m, p, g, x) : null
        case Pt:
          return ((w = g._init), h(m, p, w(g._payload), x))
      }
      if (Wr(g) || Tr(g)) return w !== null ? null : c(m, p, g, x, null)
      eo(m, g)
    }
    return null
  }
  function y(m, p, g, x, w) {
    if ((typeof x == 'string' && x !== '') || typeof x == 'number')
      return ((m = m.get(g) || null), a(p, m, '' + x, w))
    if (typeof x == 'object' && x !== null) {
      switch (x.$$typeof) {
        case $i:
          return ((m = m.get(x.key === null ? g : x.key) || null), l(p, m, x, w))
        case Bn:
          return ((m = m.get(x.key === null ? g : x.key) || null), u(p, m, x, w))
        case Pt:
          var P = x._init
          return y(m, p, g, P(x._payload), w)
      }
      if (Wr(x) || Tr(x)) return ((m = m.get(g) || null), c(p, m, x, w, null))
      eo(p, x)
    }
    return null
  }
  function v(m, p, g, x) {
    for (var w = null, P = null, T = p, S = (p = 0), D = null; T !== null && S < g.length; S++) {
      T.index > S ? ((D = T), (T = null)) : (D = T.sibling)
      var R = h(m, T, g[S], x)
      if (R === null) {
        T === null && (T = D)
        break
      }
      ;(e && T && R.alternate === null && t(m, T),
        (p = o(R, p, S)),
        P === null ? (w = R) : (P.sibling = R),
        (P = R),
        (T = D))
    }
    if (S === g.length) return (n(m, T), U && nn(m, S), w)
    if (T === null) {
      for (; S < g.length; S++)
        ((T = d(m, g[S], x)),
          T !== null && ((p = o(T, p, S)), P === null ? (w = T) : (P.sibling = T), (P = T)))
      return (U && nn(m, S), w)
    }
    for (T = r(m, T); S < g.length; S++)
      ((D = y(T, m, S, g[S], x)),
        D !== null &&
          (e && D.alternate !== null && T.delete(D.key === null ? S : D.key),
          (p = o(D, p, S)),
          P === null ? (w = D) : (P.sibling = D),
          (P = D)))
    return (
      e &&
        T.forEach(function ($) {
          return t(m, $)
        }),
      U && nn(m, S),
      w
    )
  }
  function k(m, p, g, x) {
    var w = Tr(g)
    if (typeof w != 'function') throw Error(C(150))
    if (((g = w.call(g)), g == null)) throw Error(C(151))
    for (
      var P = (w = null), T = p, S = (p = 0), D = null, R = g.next();
      T !== null && !R.done;
      S++, R = g.next()
    ) {
      T.index > S ? ((D = T), (T = null)) : (D = T.sibling)
      var $ = h(m, T, R.value, x)
      if ($ === null) {
        T === null && (T = D)
        break
      }
      ;(e && T && $.alternate === null && t(m, T),
        (p = o($, p, S)),
        P === null ? (w = $) : (P.sibling = $),
        (P = $),
        (T = D))
    }
    if (R.done) return (n(m, T), U && nn(m, S), w)
    if (T === null) {
      for (; !R.done; S++, R = g.next())
        ((R = d(m, R.value, x)),
          R !== null && ((p = o(R, p, S)), P === null ? (w = R) : (P.sibling = R), (P = R)))
      return (U && nn(m, S), w)
    }
    for (T = r(m, T); !R.done; S++, R = g.next())
      ((R = y(T, m, S, R.value, x)),
        R !== null &&
          (e && R.alternate !== null && T.delete(R.key === null ? S : R.key),
          (p = o(R, p, S)),
          P === null ? (w = R) : (P.sibling = R),
          (P = R)))
    return (
      e &&
        T.forEach(function (qe) {
          return t(m, qe)
        }),
      U && nn(m, S),
      w
    )
  }
  function E(m, p, g, x) {
    if (
      (typeof g == 'object' &&
        g !== null &&
        g.type === zn &&
        g.key === null &&
        (g = g.props.children),
      typeof g == 'object' && g !== null)
    ) {
      switch (g.$$typeof) {
        case $i:
          e: {
            for (var w = g.key, P = p; P !== null; ) {
              if (P.key === w) {
                if (((w = g.type), w === zn)) {
                  if (P.tag === 7) {
                    ;(n(m, P.sibling), (p = i(P, g.props.children)), (p.return = m), (m = p))
                    break e
                  }
                } else if (
                  P.elementType === w ||
                  (typeof w == 'object' && w !== null && w.$$typeof === Pt && bc(w) === P.type)
                ) {
                  ;(n(m, P.sibling),
                    (p = i(P, g.props)),
                    (p.ref = _r(m, P, g)),
                    (p.return = m),
                    (m = p))
                  break e
                }
                n(m, P)
                break
              } else t(m, P)
              P = P.sibling
            }
            g.type === zn
              ? ((p = dn(g.props.children, m.mode, x, g.key)), (p.return = m), (m = p))
              : ((x = Lo(g.type, g.key, g.props, null, m.mode, x)),
                (x.ref = _r(m, p, g)),
                (x.return = m),
                (m = x))
          }
          return s(m)
        case Bn:
          e: {
            for (P = g.key; p !== null; ) {
              if (p.key === P)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === g.containerInfo &&
                  p.stateNode.implementation === g.implementation
                ) {
                  ;(n(m, p.sibling), (p = i(p, g.children || [])), (p.return = m), (m = p))
                  break e
                } else {
                  n(m, p)
                  break
                }
              else t(m, p)
              p = p.sibling
            }
            ;((p = il(g, m.mode, x)), (p.return = m), (m = p))
          }
          return s(m)
        case Pt:
          return ((P = g._init), E(m, p, P(g._payload), x))
      }
      if (Wr(g)) return v(m, p, g, x)
      if (Tr(g)) return k(m, p, g, x)
      eo(m, g)
    }
    return (typeof g == 'string' && g !== '') || typeof g == 'number'
      ? ((g = '' + g),
        p !== null && p.tag === 6
          ? (n(m, p.sibling), (p = i(p, g)), (p.return = m), (m = p))
          : (n(m, p), (p = rl(g, m.mode, x)), (p.return = m), (m = p)),
        s(m))
      : n(m, p)
  }
  return E
}
var dr = cp(!0),
  fp = cp(!1),
  Bo = Qt(null),
  zo = null,
  bn = null,
  iu = null
function ou() {
  iu = bn = zo = null
}
function su(e) {
  var t = Bo.current
  ;(B(Bo), (e._currentValue = t))
}
function Gl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break
    e = e.return
  }
}
function lr(e, t) {
  ;((zo = e),
    (iu = bn = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (Le = !0), (e.firstContext = null)))
}
function $e(e) {
  var t = e._currentValue
  if (iu !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), bn === null)) {
      if (zo === null) throw Error(C(308))
      ;((bn = e), (zo.dependencies = { lanes: 0, firstContext: e }))
    } else bn = bn.next = e
  return t
}
var an = null
function lu(e) {
  an === null ? (an = [e]) : an.push(e)
}
function dp(e, t, n, r) {
  var i = t.interleaved
  return (
    i === null ? ((n.next = n), lu(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    vt(e, r)
  )
}
function vt(e, t) {
  e.lanes |= t
  var n = e.alternate
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return))
  return n.tag === 3 ? n.stateNode : null
}
var Ct = !1
function au(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  }
}
function hp(e, t) {
  ;((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }))
}
function ht(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null }
}
function Wt(e, t, n) {
  var r = e.updateQueue
  if (r === null) return null
  if (((r = r.shared), N & 2)) {
    var i = r.pending
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      vt(e, n)
    )
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), lu(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    vt(e, n)
  )
}
function yo(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes
    ;((r &= e.pendingLanes), (n |= r), (t.lanes = n), Ya(e, n))
  }
}
function Gc(e, t) {
  var n = e.updateQueue,
    r = e.alternate
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        }
        ;(o === null ? (i = o = s) : (o = o.next = s), (n = n.next))
      } while (n !== null)
      o === null ? (i = o = t) : (o = o.next = t)
    } else i = o = t
    ;((n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n))
    return
  }
  ;((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t))
}
function Uo(e, t, n, r) {
  var i = e.updateQueue
  Ct = !1
  var o = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    a = i.shared.pending
  if (a !== null) {
    i.shared.pending = null
    var l = a,
      u = l.next
    ;((l.next = null), s === null ? (o = u) : (s.next = u), (s = l))
    var c = e.alternate
    c !== null &&
      ((c = c.updateQueue),
      (a = c.lastBaseUpdate),
      a !== s && (a === null ? (c.firstBaseUpdate = u) : (a.next = u), (c.lastBaseUpdate = l)))
  }
  if (o !== null) {
    var d = i.baseState
    ;((s = 0), (c = u = l = null), (a = o))
    do {
      var h = a.lane,
        y = a.eventTime
      if ((r & h) === h) {
        c !== null &&
          (c = c.next =
            {
              eventTime: y,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            })
        e: {
          var v = e,
            k = a
          switch (((h = t), (y = n), k.tag)) {
            case 1:
              if (((v = k.payload), typeof v == 'function')) {
                d = v.call(y, d, h)
                break e
              }
              d = v
              break e
            case 3:
              v.flags = (v.flags & -65537) | 128
            case 0:
              if (((v = k.payload), (h = typeof v == 'function' ? v.call(y, d, h) : v), h == null))
                break e
              d = Q({}, d, h)
              break e
            case 2:
              Ct = !0
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64), (h = i.effects), h === null ? (i.effects = [a]) : h.push(a))
      } else
        ((y = {
          eventTime: y,
          lane: h,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          c === null ? ((u = c = y), (l = d)) : (c = c.next = y),
          (s |= h))
      if (((a = a.next), a === null)) {
        if (((a = i.shared.pending), a === null)) break
        ;((h = a), (a = h.next), (h.next = null), (i.lastBaseUpdate = h), (i.shared.pending = null))
      }
    } while (!0)
    if (
      (c === null && (l = d),
      (i.baseState = l),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t
      do ((s |= i.lane), (i = i.next))
      while (i !== t)
    } else o === null && (i.shared.lanes = 0)
    ;((yn |= s), (e.lanes = s), (e.memoizedState = d))
  }
}
function Xc(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != 'function')) throw Error(C(191, i))
        i.call(r)
      }
    }
}
var _i = {},
  it = Qt(_i),
  mi = Qt(_i),
  gi = Qt(_i)
function un(e) {
  if (e === _i) throw Error(C(174))
  return e
}
function uu(e, t) {
  switch ((O(gi, t), O(mi, e), O(it, _i), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Rl(null, '')
      break
    default:
      ;((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Rl(t, e)))
  }
  ;(B(it), O(it, t))
}
function hr() {
  ;(B(it), B(mi), B(gi))
}
function pp(e) {
  un(gi.current)
  var t = un(it.current),
    n = Rl(t, e.type)
  t !== n && (O(mi, e), O(it, n))
}
function cu(e) {
  mi.current === e && (B(it), B(mi))
}
var H = Qt(0)
function $o(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState
      if (n !== null && ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!'))
        return t
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t
    } else if (t.child !== null) {
      ;((t.child.return = t), (t = t.child))
      continue
    }
    if (t === e) break
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null
      t = t.return
    }
    ;((t.sibling.return = t.return), (t = t.sibling))
  }
  return null
}
var Xs = []
function fu() {
  for (var e = 0; e < Xs.length; e++) Xs[e]._workInProgressVersionPrimary = null
  Xs.length = 0
}
var vo = xt.ReactCurrentDispatcher,
  Js = xt.ReactCurrentBatchConfig,
  gn = 0,
  Z = null,
  ne = null,
  oe = null,
  Ho = !1,
  Gr = !1,
  yi = 0,
  Xg = 0
function fe() {
  throw Error(C(321))
}
function du(e, t) {
  if (t === null) return !1
  for (var n = 0; n < t.length && n < e.length; n++) if (!Je(e[n], t[n])) return !1
  return !0
}
function hu(e, t, n, r, i, o) {
  if (
    ((gn = o),
    (Z = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (vo.current = e === null || e.memoizedState === null ? ty : ny),
    (e = n(r, i)),
    Gr)
  ) {
    o = 0
    do {
      if (((Gr = !1), (yi = 0), 25 <= o)) throw Error(C(301))
      ;((o += 1), (oe = ne = null), (t.updateQueue = null), (vo.current = ry), (e = n(r, i)))
    } while (Gr)
  }
  if (
    ((vo.current = Ko),
    (t = ne !== null && ne.next !== null),
    (gn = 0),
    (oe = ne = Z = null),
    (Ho = !1),
    t)
  )
    throw Error(C(300))
  return e
}
function pu() {
  var e = yi !== 0
  return ((yi = 0), e)
}
function tt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null }
  return (oe === null ? (Z.memoizedState = oe = e) : (oe = oe.next = e), oe)
}
function He() {
  if (ne === null) {
    var e = Z.alternate
    e = e !== null ? e.memoizedState : null
  } else e = ne.next
  var t = oe === null ? Z.memoizedState : oe.next
  if (t !== null) ((oe = t), (ne = e))
  else {
    if (e === null) throw Error(C(310))
    ;((ne = e),
      (e = {
        memoizedState: ne.memoizedState,
        baseState: ne.baseState,
        baseQueue: ne.baseQueue,
        queue: ne.queue,
        next: null,
      }),
      oe === null ? (Z.memoizedState = oe = e) : (oe = oe.next = e))
  }
  return oe
}
function vi(e, t) {
  return typeof t == 'function' ? t(e) : t
}
function qs(e) {
  var t = He(),
    n = t.queue
  if (n === null) throw Error(C(311))
  n.lastRenderedReducer = e
  var r = ne,
    i = r.baseQueue,
    o = n.pending
  if (o !== null) {
    if (i !== null) {
      var s = i.next
      ;((i.next = o.next), (o.next = s))
    }
    ;((r.baseQueue = i = o), (n.pending = null))
  }
  if (i !== null) {
    ;((o = i.next), (r = r.baseState))
    var a = (s = null),
      l = null,
      u = o
    do {
      var c = u.lane
      if ((gn & c) === c)
        (l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action)))
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        }
        ;(l === null ? ((a = l = d), (s = r)) : (l = l.next = d), (Z.lanes |= c), (yn |= c))
      }
      u = u.next
    } while (u !== null && u !== o)
    ;(l === null ? (s = r) : (l.next = a),
      Je(r, t.memoizedState) || (Le = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = l),
      (n.lastRenderedState = r))
  }
  if (((e = n.interleaved), e !== null)) {
    i = e
    do ((o = i.lane), (Z.lanes |= o), (yn |= o), (i = i.next))
    while (i !== e)
  } else i === null && (n.lanes = 0)
  return [t.memoizedState, n.dispatch]
}
function el(e) {
  var t = He(),
    n = t.queue
  if (n === null) throw Error(C(311))
  n.lastRenderedReducer = e
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState
  if (i !== null) {
    n.pending = null
    var s = (i = i.next)
    do ((o = e(o, s.action)), (s = s.next))
    while (s !== i)
    ;(Je(o, t.memoizedState) || (Le = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o))
  }
  return [o, r]
}
function mp() {}
function gp(e, t) {
  var n = Z,
    r = He(),
    i = t(),
    o = !Je(r.memoizedState, i)
  if (
    (o && ((r.memoizedState = i), (Le = !0)),
    (r = r.queue),
    mu(kp.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (oe !== null && oe.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), ki(9, vp.bind(null, n, r, i, t), void 0, null), se === null))
      throw Error(C(349))
    gn & 30 || yp(n, t, i)
  }
  return i
}
function yp(e, t, n) {
  ;((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Z.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Z.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)))
}
function vp(e, t, n, r) {
  ;((t.value = n), (t.getSnapshot = r), Ep(t) && xp(e))
}
function kp(e, t, n) {
  return n(function () {
    Ep(t) && xp(e)
  })
}
function Ep(e) {
  var t = e.getSnapshot
  e = e.value
  try {
    var n = t()
    return !Je(e, n)
  } catch {
    return !0
  }
}
function xp(e) {
  var t = vt(e, 1)
  t !== null && Xe(t, e, 1, -1)
}
function Jc(e) {
  var t = tt()
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: vi,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = ey.bind(null, Z, e)),
    [t.memoizedState, e]
  )
}
function ki(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Z.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Z.updateQueue = t), (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  )
}
function wp() {
  return He().memoizedState
}
function ko(e, t, n, r) {
  var i = tt()
  ;((Z.flags |= e), (i.memoizedState = ki(1 | t, n, void 0, r === void 0 ? null : r)))
}
function ps(e, t, n, r) {
  var i = He()
  r = r === void 0 ? null : r
  var o = void 0
  if (ne !== null) {
    var s = ne.memoizedState
    if (((o = s.destroy), r !== null && du(r, s.deps))) {
      i.memoizedState = ki(t, n, o, r)
      return
    }
  }
  ;((Z.flags |= e), (i.memoizedState = ki(1 | t, n, o, r)))
}
function qc(e, t) {
  return ko(8390656, 8, e, t)
}
function mu(e, t) {
  return ps(2048, 8, e, t)
}
function Lp(e, t) {
  return ps(4, 2, e, t)
}
function Sp(e, t) {
  return ps(4, 4, e, t)
}
function Pp(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null)
      }
    )
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null
      }
    )
}
function Cp(e, t, n) {
  return ((n = n != null ? n.concat([e]) : null), ps(4, 4, Pp.bind(null, t, e), n))
}
function gu() {}
function Tp(e, t) {
  var n = He()
  t = t === void 0 ? null : t
  var r = n.memoizedState
  return r !== null && t !== null && du(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e)
}
function Mp(e, t) {
  var n = He()
  t = t === void 0 ? null : t
  var r = n.memoizedState
  return r !== null && t !== null && du(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e)
}
function Ap(e, t, n) {
  return gn & 21
    ? (Je(n, t) || ((n = Dh()), (Z.lanes |= n), (yn |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (Le = !0)), (e.memoizedState = n))
}
function Jg(e, t) {
  var n = W
  ;((W = n !== 0 && 4 > n ? n : 4), e(!0))
  var r = Js.transition
  Js.transition = {}
  try {
    ;(e(!1), t())
  } finally {
    ;((W = n), (Js.transition = r))
  }
}
function Rp() {
  return He().memoizedState
}
function qg(e, t, n) {
  var r = It(e)
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), jp(e)))
    _p(t, n)
  else if (((n = dp(e, t, n, r)), n !== null)) {
    var i = ve()
    ;(Xe(n, e, r, i), Fp(n, t, r))
  }
}
function ey(e, t, n) {
  var r = It(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }
  if (jp(e)) _p(t, i)
  else {
    var o = e.alternate
    if (e.lanes === 0 && (o === null || o.lanes === 0) && ((o = t.lastRenderedReducer), o !== null))
      try {
        var s = t.lastRenderedState,
          a = o(s, n)
        if (((i.hasEagerState = !0), (i.eagerState = a), Je(a, s))) {
          var l = t.interleaved
          ;(l === null ? ((i.next = i), lu(t)) : ((i.next = l.next), (l.next = i)),
            (t.interleaved = i))
          return
        }
      } catch {
      } finally {
      }
    ;((n = dp(e, t, i, r)), n !== null && ((i = ve()), Xe(n, e, r, i), Fp(n, t, r)))
  }
}
function jp(e) {
  var t = e.alternate
  return e === Z || (t !== null && t === Z)
}
function _p(e, t) {
  Gr = Ho = !0
  var n = e.pending
  ;(n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t))
}
function Fp(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes
    ;((r &= e.pendingLanes), (n |= r), (t.lanes = n), Ya(e, n))
  }
}
var Ko = {
    readContext: $e,
    useCallback: fe,
    useContext: fe,
    useEffect: fe,
    useImperativeHandle: fe,
    useInsertionEffect: fe,
    useLayoutEffect: fe,
    useMemo: fe,
    useReducer: fe,
    useRef: fe,
    useState: fe,
    useDebugValue: fe,
    useDeferredValue: fe,
    useTransition: fe,
    useMutableSource: fe,
    useSyncExternalStore: fe,
    useId: fe,
    unstable_isNewReconciler: !1,
  },
  ty = {
    readContext: $e,
    useCallback: function (e, t) {
      return ((tt().memoizedState = [e, t === void 0 ? null : t]), e)
    },
    useContext: $e,
    useEffect: qc,
    useImperativeHandle: function (e, t, n) {
      return ((n = n != null ? n.concat([e]) : null), ko(4194308, 4, Pp.bind(null, t, e), n))
    },
    useLayoutEffect: function (e, t) {
      return ko(4194308, 4, e, t)
    },
    useInsertionEffect: function (e, t) {
      return ko(4, 2, e, t)
    },
    useMemo: function (e, t) {
      var n = tt()
      return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e)
    },
    useReducer: function (e, t, n) {
      var r = tt()
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = qg.bind(null, Z, e)),
        [r.memoizedState, e]
      )
    },
    useRef: function (e) {
      var t = tt()
      return ((e = { current: e }), (t.memoizedState = e))
    },
    useState: Jc,
    useDebugValue: gu,
    useDeferredValue: function (e) {
      return (tt().memoizedState = e)
    },
    useTransition: function () {
      var e = Jc(!1),
        t = e[0]
      return ((e = Jg.bind(null, e[1])), (tt().memoizedState = e), [t, e])
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Z,
        i = tt()
      if (U) {
        if (n === void 0) throw Error(C(407))
        n = n()
      } else {
        if (((n = t()), se === null)) throw Error(C(349))
        gn & 30 || yp(r, t, n)
      }
      i.memoizedState = n
      var o = { value: n, getSnapshot: t }
      return (
        (i.queue = o),
        qc(kp.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        ki(9, vp.bind(null, r, o, n, t), void 0, null),
        n
      )
    },
    useId: function () {
      var e = tt(),
        t = se.identifierPrefix
      if (U) {
        var n = dt,
          r = ft
        ;((n = (r & ~(1 << (32 - Ge(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = yi++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':'))
      } else ((n = Xg++), (t = ':' + t + 'r' + n.toString(32) + ':'))
      return (e.memoizedState = t)
    },
    unstable_isNewReconciler: !1,
  },
  ny = {
    readContext: $e,
    useCallback: Tp,
    useContext: $e,
    useEffect: mu,
    useImperativeHandle: Cp,
    useInsertionEffect: Lp,
    useLayoutEffect: Sp,
    useMemo: Mp,
    useReducer: qs,
    useRef: wp,
    useState: function () {
      return qs(vi)
    },
    useDebugValue: gu,
    useDeferredValue: function (e) {
      var t = He()
      return Ap(t, ne.memoizedState, e)
    },
    useTransition: function () {
      var e = qs(vi)[0],
        t = He().memoizedState
      return [e, t]
    },
    useMutableSource: mp,
    useSyncExternalStore: gp,
    useId: Rp,
    unstable_isNewReconciler: !1,
  },
  ry = {
    readContext: $e,
    useCallback: Tp,
    useContext: $e,
    useEffect: mu,
    useImperativeHandle: Cp,
    useInsertionEffect: Lp,
    useLayoutEffect: Sp,
    useMemo: Mp,
    useReducer: el,
    useRef: wp,
    useState: function () {
      return el(vi)
    },
    useDebugValue: gu,
    useDeferredValue: function (e) {
      var t = He()
      return ne === null ? (t.memoizedState = e) : Ap(t, ne.memoizedState, e)
    },
    useTransition: function () {
      var e = el(vi)[0],
        t = He().memoizedState
      return [e, t]
    },
    useMutableSource: mp,
    useSyncExternalStore: gp,
    useId: Rp,
    unstable_isNewReconciler: !1,
  }
function Ye(e, t) {
  if (e && e.defaultProps) {
    ;((t = Q({}, t)), (e = e.defaultProps))
    for (var n in e) t[n] === void 0 && (t[n] = e[n])
    return t
  }
  return t
}
function Xl(e, t, n, r) {
  ;((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Q({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n))
}
var ms = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? xn(e) === e : !1
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals
    var r = ve(),
      i = It(e),
      o = ht(r, i)
    ;((o.payload = t),
      n != null && (o.callback = n),
      (t = Wt(e, o, i)),
      t !== null && (Xe(t, e, i, r), yo(t, e, i)))
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals
    var r = ve(),
      i = It(e),
      o = ht(r, i)
    ;((o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = Wt(e, o, i)),
      t !== null && (Xe(t, e, i, r), yo(t, e, i)))
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals
    var n = ve(),
      r = It(e),
      i = ht(n, r)
    ;((i.tag = 2),
      t != null && (i.callback = t),
      (t = Wt(e, i, r)),
      t !== null && (Xe(t, e, r, n), yo(t, e, r)))
  },
}
function ef(e, t, n, r, i, o, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, o, s)
      : t.prototype && t.prototype.isPureReactComponent
        ? !fi(n, r) || !fi(i, o)
        : !0
  )
}
function Dp(e, t, n) {
  var r = !1,
    i = Ht,
    o = t.contextType
  return (
    typeof o == 'object' && o !== null
      ? (o = $e(o))
      : ((i = Pe(t) ? pn : ge.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? cr(e, i) : Ht)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = ms),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  )
}
function tf(e, t, n, r) {
  ;((e = t.state),
    typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && ms.enqueueReplaceState(t, t.state, null))
}
function Jl(e, t, n, r) {
  var i = e.stateNode
  ;((i.props = n), (i.state = e.memoizedState), (i.refs = {}), au(e))
  var o = t.contextType
  ;(typeof o == 'object' && o !== null
    ? (i.context = $e(o))
    : ((o = Pe(t) ? pn : ge.current), (i.context = cr(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == 'function' && (Xl(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof i.getSnapshotBeforeUpdate == 'function' ||
      (typeof i.UNSAFE_componentWillMount != 'function' &&
        typeof i.componentWillMount != 'function') ||
      ((t = i.state),
      typeof i.componentWillMount == 'function' && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
      t !== i.state && ms.enqueueReplaceState(i, i.state, null),
      Uo(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == 'function' && (e.flags |= 4194308))
}
function pr(e, t) {
  try {
    var n = '',
      r = t
    do ((n += j0(r)), (r = r.return))
    while (r)
    var i = n
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack
  }
  return { value: e, source: t, stack: i, digest: null }
}
function tl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null }
}
function ql(e, t) {
  try {
    console.error(t.value)
  } catch (n) {
    setTimeout(function () {
      throw n
    })
  }
}
var iy = typeof WeakMap == 'function' ? WeakMap : Map
function Vp(e, t, n) {
  ;((n = ht(-1, n)), (n.tag = 3), (n.payload = { element: null }))
  var r = t.value
  return (
    (n.callback = function () {
      ;(Yo || ((Yo = !0), (ua = r)), ql(e, t))
    }),
    n
  )
}
function Np(e, t, n) {
  ;((n = ht(-1, n)), (n.tag = 3))
  var r = e.type.getDerivedStateFromError
  if (typeof r == 'function') {
    var i = t.value
    ;((n.payload = function () {
      return r(i)
    }),
      (n.callback = function () {
        ql(e, t)
      }))
  }
  var o = e.stateNode
  return (
    o !== null &&
      typeof o.componentDidCatch == 'function' &&
      (n.callback = function () {
        ;(ql(e, t), typeof r != 'function' && (Ot === null ? (Ot = new Set([this])) : Ot.add(this)))
        var s = t.stack
        this.componentDidCatch(t.value, { componentStack: s !== null ? s : '' })
      }),
    n
  )
}
function nf(e, t, n) {
  var r = e.pingCache
  if (r === null) {
    r = e.pingCache = new iy()
    var i = new Set()
    r.set(t, i)
  } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)))
  i.has(n) || (i.add(n), (e = vy.bind(null, e, t, n)), t.then(e, e))
}
function rf(e) {
  do {
    var t
    if (
      ((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e
    e = e.return
  } while (e !== null)
  return null
}
function of(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null ? (n.tag = 17) : ((t = ht(-1, 1)), (t.tag = 2), Wt(n, t, 1))),
          (n.lanes |= 1)),
      e)
}
var oy = xt.ReactCurrentOwner,
  Le = !1
function ye(e, t, n, r) {
  t.child = e === null ? fp(t, null, n, r) : dr(t, e.child, n, r)
}
function sf(e, t, n, r, i) {
  n = n.render
  var o = t.ref
  return (
    lr(t, i),
    (r = hu(e, t, n, r, o, i)),
    (n = pu()),
    e !== null && !Le
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), kt(e, t, i))
      : (U && n && tu(t), (t.flags |= 1), ye(e, t, r, i), t.child)
  )
}
function lf(e, t, n, r, i) {
  if (e === null) {
    var o = n.type
    return typeof o == 'function' &&
      !Su(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Wp(e, t, o, r, i))
      : ((e = Lo(n.type, null, r, t, t.mode, i)), (e.ref = t.ref), (e.return = t), (t.child = e))
  }
  if (((o = e.child), !(e.lanes & i))) {
    var s = o.memoizedProps
    if (((n = n.compare), (n = n !== null ? n : fi), n(s, r) && e.ref === t.ref)) return kt(e, t, i)
  }
  return ((t.flags |= 1), (e = Bt(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e))
}
function Wp(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps
    if (fi(o, r) && e.ref === t.ref)
      if (((Le = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0)) e.flags & 131072 && (Le = !0)
      else return ((t.lanes = e.lanes), kt(e, t, i))
  }
  return ea(e, t, n, r, i)
}
function Op(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        O(Xn, Me),
        (Me |= n))
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          O(Xn, Me),
          (Me |= e),
          null
        )
      ;((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        O(Xn, Me),
        (Me |= r))
    }
  else
    (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n), O(Xn, Me), (Me |= r))
  return (ye(e, t, i, n), t.child)
}
function Ip(e, t) {
  var n = t.ref
  ;((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152))
}
function ea(e, t, n, r, i) {
  var o = Pe(n) ? pn : ge.current
  return (
    (o = cr(t, o)),
    lr(t, i),
    (n = hu(e, t, n, r, o, i)),
    (r = pu()),
    e !== null && !Le
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), kt(e, t, i))
      : (U && r && tu(t), (t.flags |= 1), ye(e, t, n, i), t.child)
  )
}
function af(e, t, n, r, i) {
  if (Pe(n)) {
    var o = !0
    Wo(t)
  } else o = !1
  if ((lr(t, i), t.stateNode === null)) (Eo(e, t), Dp(t, n, r), Jl(t, n, r, i), (r = !0))
  else if (e === null) {
    var s = t.stateNode,
      a = t.memoizedProps
    s.props = a
    var l = s.context,
      u = n.contextType
    typeof u == 'object' && u !== null
      ? (u = $e(u))
      : ((u = Pe(n) ? pn : ge.current), (u = cr(t, u)))
    var c = n.getDerivedStateFromProps,
      d = typeof c == 'function' || typeof s.getSnapshotBeforeUpdate == 'function'
    ;(d ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((a !== r || l !== u) && tf(t, s, r, u)),
      (Ct = !1))
    var h = t.memoizedState
    ;((s.state = h),
      Uo(t, r, s, i),
      (l = t.memoizedState),
      a !== r || h !== l || Se.current || Ct
        ? (typeof c == 'function' && (Xl(t, n, c, r), (l = t.memoizedState)),
          (a = Ct || ef(t, n, a, r, h, l, u))
            ? (d ||
                (typeof s.UNSAFE_componentWillMount != 'function' &&
                  typeof s.componentWillMount != 'function') ||
                (typeof s.componentWillMount == 'function' && s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == 'function' && s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (s.props = r),
          (s.state = l),
          (s.context = u),
          (r = a))
        : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1)))
  } else {
    ;((s = t.stateNode),
      hp(e, t),
      (a = t.memoizedProps),
      (u = t.type === t.elementType ? a : Ye(t.type, a)),
      (s.props = u),
      (d = t.pendingProps),
      (h = s.context),
      (l = n.contextType),
      typeof l == 'object' && l !== null
        ? (l = $e(l))
        : ((l = Pe(n) ? pn : ge.current), (l = cr(t, l))))
    var y = n.getDerivedStateFromProps
    ;((c = typeof y == 'function' || typeof s.getSnapshotBeforeUpdate == 'function') ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((a !== d || h !== l) && tf(t, s, r, l)),
      (Ct = !1),
      (h = t.memoizedState),
      (s.state = h),
      Uo(t, r, s, i))
    var v = t.memoizedState
    a !== d || h !== v || Se.current || Ct
      ? (typeof y == 'function' && (Xl(t, n, y, r), (v = t.memoizedState)),
        (u = Ct || ef(t, n, u, r, h, v, l) || !1)
          ? (c ||
              (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                typeof s.componentWillUpdate != 'function') ||
              (typeof s.componentWillUpdate == 'function' && s.componentWillUpdate(r, v, l),
              typeof s.UNSAFE_componentWillUpdate == 'function' &&
                s.UNSAFE_componentWillUpdate(r, v, l)),
            typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != 'function' ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != 'function' ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (s.props = r),
        (s.state = v),
        (s.context = l),
        (r = u))
      : (typeof s.componentDidUpdate != 'function' ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != 'function' ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1))
  }
  return ta(e, t, n, r, o, i)
}
function ta(e, t, n, r, i, o) {
  Ip(e, t)
  var s = (t.flags & 128) !== 0
  if (!r && !s) return (i && Zc(t, n, !1), kt(e, t, o))
  ;((r = t.stateNode), (oy.current = t))
  var a = s && typeof n.getDerivedStateFromError != 'function' ? null : r.render()
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = dr(t, e.child, null, o)), (t.child = dr(t, null, a, o)))
      : ye(e, t, a, o),
    (t.memoizedState = r.state),
    i && Zc(t, n, !0),
    t.child
  )
}
function Bp(e) {
  var t = e.stateNode
  ;(t.pendingContext
    ? Kc(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Kc(e, t.context, !1),
    uu(e, t.containerInfo))
}
function uf(e, t, n, r, i) {
  return (fr(), ru(i), (t.flags |= 256), ye(e, t, n, r), t.child)
}
var na = { dehydrated: null, treeContext: null, retryLane: 0 }
function ra(e) {
  return { baseLanes: e, cachePool: null, transitions: null }
}
function zp(e, t, n) {
  var r = t.pendingProps,
    i = H.current,
    o = !1,
    s = (t.flags & 128) !== 0,
    a
  if (
    ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a ? ((o = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (i |= 1),
    O(H, i & 1),
    e === null)
  )
    return (
      bl(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1 ? (e.data === '$!' ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (s = { mode: 'hidden', children: s }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = s))
                : (o = vs(s, r, 0, null)),
              (e = dn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = ra(n)),
              (t.memoizedState = na),
              e)
            : yu(t, s))
    )
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return sy(e, t, s, r, a, i, n)
  if (o) {
    ;((o = r.fallback), (s = t.mode), (i = e.child), (a = i.sibling))
    var l = { mode: 'hidden', children: r.children }
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = l), (t.deletions = null))
        : ((r = Bt(i, l)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (o = Bt(a, o)) : ((o = dn(o, s, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? ra(n)
          : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }),
      (o.memoizedState = s),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = na),
      r
    )
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Bt(o, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  )
}
function yu(e, t) {
  return (
    (t = vs({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  )
}
function to(e, t, n, r) {
  return (
    r !== null && ru(r),
    dr(t, e.child, null, n),
    (e = yu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  )
}
function sy(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = tl(Error(C(422)))), to(e, t, s, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (i = t.mode),
          (r = vs({ mode: 'visible', children: r.children }, i, 0, null)),
          (o = dn(o, i, s, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && dr(t, e.child, null, s),
          (t.child.memoizedState = ra(s)),
          (t.memoizedState = na),
          o)
  if (!(t.mode & 1)) return to(e, t, s, null)
  if (i.data === '$!') {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst
    return ((r = a), (o = Error(C(419))), (r = tl(o, r, void 0)), to(e, t, s, r))
  }
  if (((a = (s & e.childLanes) !== 0), Le || a)) {
    if (((r = se), r !== null)) {
      switch (s & -s) {
        case 4:
          i = 2
          break
        case 16:
          i = 8
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
          i = 32
          break
        case 536870912:
          i = 268435456
          break
        default:
          i = 0
      }
      ;((i = i & (r.suspendedLanes | s) ? 0 : i),
        i !== 0 && i !== o.retryLane && ((o.retryLane = i), vt(e, i), Xe(r, e, i, -1)))
    }
    return (Lu(), (r = tl(Error(C(421)))), to(e, t, s, r))
  }
  return i.data === '$?'
    ? ((t.flags |= 128), (t.child = e.child), (t = ky.bind(null, e)), (i._reactRetry = t), null)
    : ((e = o.treeContext),
      (Ae = Nt(i.nextSibling)),
      (Re = t),
      (U = !0),
      (be = null),
      e !== null &&
        ((Ie[Be++] = ft),
        (Ie[Be++] = dt),
        (Ie[Be++] = mn),
        (ft = e.id),
        (dt = e.overflow),
        (mn = t)),
      (t = yu(t, r.children)),
      (t.flags |= 4096),
      t)
}
function cf(e, t, n) {
  e.lanes |= t
  var r = e.alternate
  ;(r !== null && (r.lanes |= t), Gl(e.return, t, n))
}
function nl(e, t, n, r, i) {
  var o = e.memoizedState
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i))
}
function Up(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail
  if ((ye(e, t, r.children, n), (r = H.current), r & 2)) ((r = (r & 1) | 2), (t.flags |= 128))
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && cf(e, n, t)
        else if (e.tag === 19) cf(e, n, t)
        else if (e.child !== null) {
          ;((e.child.return = e), (e = e.child))
          continue
        }
        if (e === t) break e
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e
          e = e.return
        }
        ;((e.sibling.return = e.return), (e = e.sibling))
      }
    r &= 1
  }
  if ((O(H, r), !(t.mode & 1))) t.memoizedState = null
  else
    switch (i) {
      case 'forwards':
        for (n = t.child, i = null; n !== null; )
          ((e = n.alternate), e !== null && $o(e) === null && (i = n), (n = n.sibling))
        ;((n = i),
          n === null ? ((i = t.child), (t.child = null)) : ((i = n.sibling), (n.sibling = null)),
          nl(t, !1, i, n, o))
        break
      case 'backwards':
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && $o(e) === null)) {
            t.child = i
            break
          }
          ;((e = i.sibling), (i.sibling = n), (n = i), (i = e))
        }
        nl(t, !0, n, null, o)
        break
      case 'together':
        nl(t, !1, null, null, void 0)
        break
      default:
        t.memoizedState = null
    }
  return t.child
}
function Eo(e, t) {
  !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2))
}
function kt(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (yn |= t.lanes), !(n & t.childLanes)))
    return null
  if (e !== null && t.child !== e.child) throw Error(C(153))
  if (t.child !== null) {
    for (e = t.child, n = Bt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      ((e = e.sibling), (n = n.sibling = Bt(e, e.pendingProps)), (n.return = t))
    n.sibling = null
  }
  return t.child
}
function ly(e, t, n) {
  switch (t.tag) {
    case 3:
      ;(Bp(t), fr())
      break
    case 5:
      pp(t)
      break
    case 1:
      Pe(t.type) && Wo(t)
      break
    case 4:
      uu(t, t.stateNode.containerInfo)
      break
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value
      ;(O(Bo, r._currentValue), (r._currentValue = i))
      break
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (O(H, H.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? zp(e, t, n)
            : (O(H, H.current & 1), (e = kt(e, t, n)), e !== null ? e.sibling : null)
      O(H, H.current & 1)
      break
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Up(e, t, n)
        t.flags |= 128
      }
      if (
        ((i = t.memoizedState),
        i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        O(H, H.current),
        r)
      )
        break
      return null
    case 22:
    case 23:
      return ((t.lanes = 0), Op(e, t, n))
  }
  return kt(e, t, n)
}
var $p, ia, Hp, Kp
$p = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode)
    else if (n.tag !== 4 && n.child !== null) {
      ;((n.child.return = n), (n = n.child))
      continue
    }
    if (n === t) break
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return
      n = n.return
    }
    ;((n.sibling.return = n.return), (n = n.sibling))
  }
}
ia = function () {}
Hp = function (e, t, n, r) {
  var i = e.memoizedProps
  if (i !== r) {
    ;((e = t.stateNode), un(it.current))
    var o = null
    switch (n) {
      case 'input':
        ;((i = Cl(e, i)), (r = Cl(e, r)), (o = []))
        break
      case 'select':
        ;((i = Q({}, i, { value: void 0 })), (r = Q({}, r, { value: void 0 })), (o = []))
        break
      case 'textarea':
        ;((i = Al(e, i)), (r = Al(e, r)), (o = []))
        break
      default:
        typeof i.onClick != 'function' && typeof r.onClick == 'function' && (e.onclick = Vo)
    }
    jl(n, r)
    var s
    n = null
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === 'style') {
          var a = i[u]
          for (s in a) a.hasOwnProperty(s) && (n || (n = {}), (n[s] = ''))
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (ii.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null))
    for (u in r) {
      var l = r[u]
      if (
        ((a = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && l !== a && (l != null || a != null))
      )
        if (u === 'style')
          if (a) {
            for (s in a)
              !a.hasOwnProperty(s) || (l && l.hasOwnProperty(s)) || (n || (n = {}), (n[s] = ''))
            for (s in l) l.hasOwnProperty(s) && a[s] !== l[s] && (n || (n = {}), (n[s] = l[s]))
          } else (n || (o || (o = []), o.push(u, n)), (n = l))
        else
          u === 'dangerouslySetInnerHTML'
            ? ((l = l ? l.__html : void 0),
              (a = a ? a.__html : void 0),
              l != null && a !== l && (o = o || []).push(u, l))
            : u === 'children'
              ? (typeof l != 'string' && typeof l != 'number') || (o = o || []).push(u, '' + l)
              : u !== 'suppressContentEditableWarning' &&
                u !== 'suppressHydrationWarning' &&
                (ii.hasOwnProperty(u)
                  ? (l != null && u === 'onScroll' && I('scroll', e), o || a === l || (o = []))
                  : (o = o || []).push(u, l))
    }
    n && (o = o || []).push('style', n)
    var u = o
    ;(t.updateQueue = u) && (t.flags |= 4)
  }
}
Kp = function (e, t, n, r) {
  n !== r && (t.flags |= 4)
}
function Fr(e, t) {
  if (!U)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail
        for (var n = null; t !== null; ) (t.alternate !== null && (n = t), (t = t.sibling))
        n === null ? (e.tail = null) : (n.sibling = null)
        break
      case 'collapsed':
        n = e.tail
        for (var r = null; n !== null; ) (n.alternate !== null && (r = n), (n = n.sibling))
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null)
    }
}
function de(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0
  if (t)
    for (var i = e.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling))
  else
    for (i = e.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling))
  return ((e.subtreeFlags |= r), (e.childLanes = n), t)
}
function ay(e, t, n) {
  var r = t.pendingProps
  switch ((nu(t), t.tag)) {
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
      return (de(t), null)
    case 1:
      return (Pe(t.type) && No(), de(t), null)
    case 3:
      return (
        (r = t.stateNode),
        hr(),
        B(Se),
        B(ge),
        fu(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (qi(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), be !== null && (da(be), (be = null)))),
        ia(e, t),
        de(t),
        null
      )
    case 5:
      cu(t)
      var i = un(gi.current)
      if (((n = t.type), e !== null && t.stateNode != null))
        (Hp(e, t, n, r, i), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)))
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(C(166))
          return (de(t), null)
        }
        if (((e = un(it.current)), qi(t))) {
          ;((r = t.stateNode), (n = t.type))
          var o = t.memoizedProps
          switch (((r[nt] = t), (r[pi] = o), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              ;(I('cancel', r), I('close', r))
              break
            case 'iframe':
            case 'object':
            case 'embed':
              I('load', r)
              break
            case 'video':
            case 'audio':
              for (i = 0; i < Ir.length; i++) I(Ir[i], r)
              break
            case 'source':
              I('error', r)
              break
            case 'img':
            case 'image':
            case 'link':
              ;(I('error', r), I('load', r))
              break
            case 'details':
              I('toggle', r)
              break
            case 'input':
              ;(vc(r, o), I('invalid', r))
              break
            case 'select':
              ;((r._wrapperState = { wasMultiple: !!o.multiple }), I('invalid', r))
              break
            case 'textarea':
              ;(Ec(r, o), I('invalid', r))
          }
          ;(jl(n, o), (i = null))
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var a = o[s]
              s === 'children'
                ? typeof a == 'string'
                  ? r.textContent !== a &&
                    (o.suppressHydrationWarning !== !0 && Ji(r.textContent, a, e),
                    (i = ['children', a]))
                  : typeof a == 'number' &&
                    r.textContent !== '' + a &&
                    (o.suppressHydrationWarning !== !0 && Ji(r.textContent, a, e),
                    (i = ['children', '' + a]))
                : ii.hasOwnProperty(s) && a != null && s === 'onScroll' && I('scroll', r)
            }
          switch (n) {
            case 'input':
              ;(Hi(r), kc(r, o, !0))
              break
            case 'textarea':
              ;(Hi(r), xc(r))
              break
            case 'select':
            case 'option':
              break
            default:
              typeof o.onClick == 'function' && (r.onclick = Vo)
          }
          ;((r = i), (t.updateQueue = r), r !== null && (t.flags |= 4))
        } else {
          ;((s = i.nodeType === 9 ? i : i.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = kh(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = s.createElement('div')),
                  (e.innerHTML = '<script><\/script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = s.createElement(n, { is: r.is }))
                  : ((e = s.createElement(n)),
                    n === 'select' &&
                      ((s = e), r.multiple ? (s.multiple = !0) : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[nt] = t),
            (e[pi] = r),
            $p(e, t, !1, !1),
            (t.stateNode = e))
          e: {
            switch (((s = _l(n, r)), n)) {
              case 'dialog':
                ;(I('cancel', e), I('close', e), (i = r))
                break
              case 'iframe':
              case 'object':
              case 'embed':
                ;(I('load', e), (i = r))
                break
              case 'video':
              case 'audio':
                for (i = 0; i < Ir.length; i++) I(Ir[i], e)
                i = r
                break
              case 'source':
                ;(I('error', e), (i = r))
                break
              case 'img':
              case 'image':
              case 'link':
                ;(I('error', e), I('load', e), (i = r))
                break
              case 'details':
                ;(I('toggle', e), (i = r))
                break
              case 'input':
                ;(vc(e, r), (i = Cl(e, r)), I('invalid', e))
                break
              case 'option':
                i = r
                break
              case 'select':
                ;((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = Q({}, r, { value: void 0 })),
                  I('invalid', e))
                break
              case 'textarea':
                ;(Ec(e, r), (i = Al(e, r)), I('invalid', e))
                break
              default:
                i = r
            }
            ;(jl(n, i), (a = i))
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var l = a[o]
                o === 'style'
                  ? wh(e, l)
                  : o === 'dangerouslySetInnerHTML'
                    ? ((l = l ? l.__html : void 0), l != null && Eh(e, l))
                    : o === 'children'
                      ? typeof l == 'string'
                        ? (n !== 'textarea' || l !== '') && oi(e, l)
                        : typeof l == 'number' && oi(e, '' + l)
                      : o !== 'suppressContentEditableWarning' &&
                        o !== 'suppressHydrationWarning' &&
                        o !== 'autoFocus' &&
                        (ii.hasOwnProperty(o)
                          ? l != null && o === 'onScroll' && I('scroll', e)
                          : l != null && za(e, o, l, s))
              }
            switch (n) {
              case 'input':
                ;(Hi(e), kc(e, r, !1))
                break
              case 'textarea':
                ;(Hi(e), xc(e))
                break
              case 'option':
                r.value != null && e.setAttribute('value', '' + $t(r.value))
                break
              case 'select':
                ;((e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? rr(e, !!r.multiple, o, !1)
                    : r.defaultValue != null && rr(e, !!r.multiple, r.defaultValue, !0))
                break
              default:
                typeof i.onClick == 'function' && (e.onclick = Vo)
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus
                break e
              case 'img':
                r = !0
                break e
              default:
                r = !1
            }
          }
          r && (t.flags |= 4)
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152))
      }
      return (de(t), null)
    case 6:
      if (e && t.stateNode != null) Kp(e, t, e.memoizedProps, r)
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(C(166))
        if (((n = un(gi.current)), un(it.current), qi(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[nt] = t),
            (o = r.nodeValue !== n) && ((e = Re), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ji(r.nodeValue, n, (e.mode & 1) !== 0)
                break
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ji(r.nodeValue, n, (e.mode & 1) !== 0)
            }
          o && (t.flags |= 4)
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[nt] = t),
            (t.stateNode = r))
      }
      return (de(t), null)
    case 13:
      if (
        (B(H),
        (r = t.memoizedState),
        e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (U && Ae !== null && t.mode & 1 && !(t.flags & 128))
          (up(), fr(), (t.flags |= 98560), (o = !1))
        else if (((o = qi(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(C(318))
            if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o))
              throw Error(C(317))
            o[nt] = t
          } else (fr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4))
          ;(de(t), (o = !1))
        } else (be !== null && (da(be), (be = null)), (o = !0))
        if (!o) return t.flags & 65536 ? t : null
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 && (e === null || H.current & 1 ? re === 0 && (re = 3) : Lu())),
          t.updateQueue !== null && (t.flags |= 4),
          de(t),
          null)
    case 4:
      return (hr(), ia(e, t), e === null && di(t.stateNode.containerInfo), de(t), null)
    case 10:
      return (su(t.type._context), de(t), null)
    case 17:
      return (Pe(t.type) && No(), de(t), null)
    case 19:
      if ((B(H), (o = t.memoizedState), o === null)) return (de(t), null)
      if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
        if (r) Fr(o, !1)
        else {
          if (re !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = $o(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    Fr(o, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  ((o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (s = o.alternate),
                    s === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = s.childLanes),
                        (o.lanes = s.lanes),
                        (o.child = s.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = s.memoizedProps),
                        (o.memoizedState = s.memoizedState),
                        (o.updateQueue = s.updateQueue),
                        (o.type = s.type),
                        (e = s.dependencies),
                        (o.dependencies =
                          e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling))
                return (O(H, (H.current & 1) | 2), t.child)
              }
              e = e.sibling
            }
          o.tail !== null &&
            q() > mr &&
            ((t.flags |= 128), (r = !0), Fr(o, !1), (t.lanes = 4194304))
        }
      else {
        if (!r)
          if (((e = $o(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Fr(o, !0),
              o.tail === null && o.tailMode === 'hidden' && !s.alternate && !U)
            )
              return (de(t), null)
          } else
            2 * q() - o.renderingStartTime > mr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Fr(o, !1), (t.lanes = 4194304))
        o.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = o.last), n !== null ? (n.sibling = s) : (t.child = s), (o.last = s))
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = q()),
          (t.sibling = null),
          (n = H.current),
          O(H, r ? (n & 1) | 2 : n & 1),
          t)
        : (de(t), null)
    case 22:
    case 23:
      return (
        wu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Me & 1073741824 && (de(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : de(t),
        null
      )
    case 24:
      return null
    case 25:
      return null
  }
  throw Error(C(156, t.tag))
}
function uy(e, t) {
  switch ((nu(t), t.tag)) {
    case 1:
      return (
        Pe(t.type) && No(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 3:
      return (
        hr(),
        B(Se),
        B(ge),
        fu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 5:
      return (cu(t), null)
    case 13:
      if ((B(H), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(C(340))
        fr()
      }
      return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null)
    case 19:
      return (B(H), null)
    case 4:
      return (hr(), null)
    case 10:
      return (su(t.type._context), null)
    case 22:
    case 23:
      return (wu(), null)
    case 24:
      return null
    default:
      return null
  }
}
var no = !1,
  pe = !1,
  cy = typeof WeakSet == 'function' ? WeakSet : Set,
  A = null
function Gn(e, t) {
  var n = e.ref
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null)
      } catch (r) {
        G(e, t, r)
      }
    else n.current = null
}
function oa(e, t, n) {
  try {
    n()
  } catch (r) {
    G(e, t, r)
  }
}
var ff = !1
function fy(e, t) {
  if (((Ul = _o), (e = Gh()), eu(e))) {
    if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd }
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window
        var r = n.getSelection && n.getSelection()
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode
          var i = r.anchorOffset,
            o = r.focusNode
          r = r.focusOffset
          try {
            ;(n.nodeType, o.nodeType)
          } catch {
            n = null
            break e
          }
          var s = 0,
            a = -1,
            l = -1,
            u = 0,
            c = 0,
            d = e,
            h = null
          t: for (;;) {
            for (
              var y;
              d !== n || (i !== 0 && d.nodeType !== 3) || (a = s + i),
                d !== o || (r !== 0 && d.nodeType !== 3) || (l = s + r),
                d.nodeType === 3 && (s += d.nodeValue.length),
                (y = d.firstChild) !== null;

            )
              ((h = d), (d = y))
            for (;;) {
              if (d === e) break t
              if (
                (h === n && ++u === i && (a = s),
                h === o && ++c === r && (l = s),
                (y = d.nextSibling) !== null)
              )
                break
              ;((d = h), (h = d.parentNode))
            }
            d = y
          }
          n = a === -1 || l === -1 ? null : { start: a, end: l }
        } else n = null
      }
    n = n || { start: 0, end: 0 }
  } else n = null
  for ($l = { focusedElem: e, selectionRange: n }, _o = !1, A = t; A !== null; )
    if (((t = A), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (A = e))
    else
      for (; A !== null; ) {
        t = A
        try {
          var v = t.alternate
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break
              case 1:
                if (v !== null) {
                  var k = v.memoizedProps,
                    E = v.memoizedState,
                    m = t.stateNode,
                    p = m.getSnapshotBeforeUpdate(t.elementType === t.type ? k : Ye(t.type, k), E)
                  m.__reactInternalSnapshotBeforeUpdate = p
                }
                break
              case 3:
                var g = t.stateNode.containerInfo
                g.nodeType === 1
                  ? (g.textContent = '')
                  : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement)
                break
              case 5:
              case 6:
              case 4:
              case 17:
                break
              default:
                throw Error(C(163))
            }
        } catch (x) {
          G(t, t.return, x)
        }
        if (((e = t.sibling), e !== null)) {
          ;((e.return = t.return), (A = e))
          break
        }
        A = t.return
      }
  return ((v = ff), (ff = !1), v)
}
function Xr(e, t, n) {
  var r = t.updateQueue
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next)
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy
        ;((i.destroy = void 0), o !== void 0 && oa(t, n, o))
      }
      i = i.next
    } while (i !== r)
  }
}
function gs(e, t) {
  if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
    var n = (t = t.next)
    do {
      if ((n.tag & e) === e) {
        var r = n.create
        n.destroy = r()
      }
      n = n.next
    } while (n !== t)
  }
}
function sa(e) {
  var t = e.ref
  if (t !== null) {
    var n = e.stateNode
    switch (e.tag) {
      case 5:
        e = n
        break
      default:
        e = n
    }
    typeof t == 'function' ? t(e) : (t.current = e)
  }
}
function Zp(e) {
  var t = e.alternate
  ;(t !== null && ((e.alternate = null), Zp(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null && (delete t[nt], delete t[pi], delete t[Zl], delete t[Yg], delete t[Qg])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null))
}
function Yp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function df(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Yp(e.return)) return null
      e = e.return
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e
      ;((e.child.return = e), (e = e.child))
    }
    if (!(e.flags & 2)) return e.stateNode
  }
}
function la(e, t, n) {
  var r = e.tag
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Vo)))
  else if (r !== 4 && ((e = e.child), e !== null))
    for (la(e, t, n), e = e.sibling; e !== null; ) (la(e, t, n), (e = e.sibling))
}
function aa(e, t, n) {
  var r = e.tag
  if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e))
  else if (r !== 4 && ((e = e.child), e !== null))
    for (aa(e, t, n), e = e.sibling; e !== null; ) (aa(e, t, n), (e = e.sibling))
}
var le = null,
  Qe = !1
function Lt(e, t, n) {
  for (n = n.child; n !== null; ) (Qp(e, t, n), (n = n.sibling))
}
function Qp(e, t, n) {
  if (rt && typeof rt.onCommitFiberUnmount == 'function')
    try {
      rt.onCommitFiberUnmount(as, n)
    } catch {}
  switch (n.tag) {
    case 5:
      pe || Gn(n, t)
    case 6:
      var r = le,
        i = Qe
      ;((le = null),
        Lt(e, t, n),
        (le = r),
        (Qe = i),
        le !== null &&
          (Qe
            ? ((e = le),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : le.removeChild(n.stateNode)))
      break
    case 18:
      le !== null &&
        (Qe
          ? ((e = le),
            (n = n.stateNode),
            e.nodeType === 8 ? bs(e.parentNode, n) : e.nodeType === 1 && bs(e, n),
            ui(e))
          : bs(le, n.stateNode))
      break
    case 4:
      ;((r = le),
        (i = Qe),
        (le = n.stateNode.containerInfo),
        (Qe = !0),
        Lt(e, t, n),
        (le = r),
        (Qe = i))
      break
    case 0:
    case 11:
    case 14:
    case 15:
      if (!pe && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        i = r = r.next
        do {
          var o = i,
            s = o.destroy
          ;((o = o.tag), s !== void 0 && (o & 2 || o & 4) && oa(n, t, s), (i = i.next))
        } while (i !== r)
      }
      Lt(e, t, n)
      break
    case 1:
      if (!pe && (Gn(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
        try {
          ;((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount())
        } catch (a) {
          G(n, t, a)
        }
      Lt(e, t, n)
      break
    case 21:
      Lt(e, t, n)
      break
    case 22:
      n.mode & 1
        ? ((pe = (r = pe) || n.memoizedState !== null), Lt(e, t, n), (pe = r))
        : Lt(e, t, n)
      break
    default:
      Lt(e, t, n)
  }
}
function hf(e) {
  var t = e.updateQueue
  if (t !== null) {
    e.updateQueue = null
    var n = e.stateNode
    ;(n === null && (n = e.stateNode = new cy()),
      t.forEach(function (r) {
        var i = Ey.bind(null, e, r)
        n.has(r) || (n.add(r), r.then(i, i))
      }))
  }
}
function Ke(e, t) {
  var n = t.deletions
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r]
      try {
        var o = e,
          s = t,
          a = s
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              ;((le = a.stateNode), (Qe = !1))
              break e
            case 3:
              ;((le = a.stateNode.containerInfo), (Qe = !0))
              break e
            case 4:
              ;((le = a.stateNode.containerInfo), (Qe = !0))
              break e
          }
          a = a.return
        }
        if (le === null) throw Error(C(160))
        ;(Qp(o, s, i), (le = null), (Qe = !1))
        var l = i.alternate
        ;(l !== null && (l.return = null), (i.return = null))
      } catch (u) {
        G(i, t, u)
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) (bp(t, e), (t = t.sibling))
}
function bp(e, t) {
  var n = e.alternate,
    r = e.flags
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ke(t, e), et(e), r & 4)) {
        try {
          ;(Xr(3, e, e.return), gs(3, e))
        } catch (k) {
          G(e, e.return, k)
        }
        try {
          Xr(5, e, e.return)
        } catch (k) {
          G(e, e.return, k)
        }
      }
      break
    case 1:
      ;(Ke(t, e), et(e), r & 512 && n !== null && Gn(n, n.return))
      break
    case 5:
      if ((Ke(t, e), et(e), r & 512 && n !== null && Gn(n, n.return), e.flags & 32)) {
        var i = e.stateNode
        try {
          oi(i, '')
        } catch (k) {
          G(e, e.return, k)
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          s = n !== null ? n.memoizedProps : o,
          a = e.type,
          l = e.updateQueue
        if (((e.updateQueue = null), l !== null))
          try {
            ;(a === 'input' && o.type === 'radio' && o.name != null && yh(i, o), _l(a, s))
            var u = _l(a, o)
            for (s = 0; s < l.length; s += 2) {
              var c = l[s],
                d = l[s + 1]
              c === 'style'
                ? wh(i, d)
                : c === 'dangerouslySetInnerHTML'
                  ? Eh(i, d)
                  : c === 'children'
                    ? oi(i, d)
                    : za(i, c, d, u)
            }
            switch (a) {
              case 'input':
                Tl(i, o)
                break
              case 'textarea':
                vh(i, o)
                break
              case 'select':
                var h = i._wrapperState.wasMultiple
                i._wrapperState.wasMultiple = !!o.multiple
                var y = o.value
                y != null
                  ? rr(i, !!o.multiple, y, !1)
                  : h !== !!o.multiple &&
                    (o.defaultValue != null
                      ? rr(i, !!o.multiple, o.defaultValue, !0)
                      : rr(i, !!o.multiple, o.multiple ? [] : '', !1))
            }
            i[pi] = o
          } catch (k) {
            G(e, e.return, k)
          }
      }
      break
    case 6:
      if ((Ke(t, e), et(e), r & 4)) {
        if (e.stateNode === null) throw Error(C(162))
        ;((i = e.stateNode), (o = e.memoizedProps))
        try {
          i.nodeValue = o
        } catch (k) {
          G(e, e.return, k)
        }
      }
      break
    case 3:
      if ((Ke(t, e), et(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          ui(t.containerInfo)
        } catch (k) {
          G(e, e.return, k)
        }
      break
    case 4:
      ;(Ke(t, e), et(e))
      break
    case 13:
      ;(Ke(t, e),
        et(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o || (i.alternate !== null && i.alternate.memoizedState !== null) || (Eu = q())),
        r & 4 && hf(e))
      break
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((pe = (u = pe) || c), Ke(t, e), (pe = u)) : Ke(t, e),
        et(e),
        r & 8192)
      ) {
        if (((u = e.memoizedState !== null), (e.stateNode.isHidden = u) && !c && e.mode & 1))
          for (A = e, c = e.child; c !== null; ) {
            for (d = A = c; A !== null; ) {
              switch (((h = A), (y = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Xr(4, h, h.return)
                  break
                case 1:
                  Gn(h, h.return)
                  var v = h.stateNode
                  if (typeof v.componentWillUnmount == 'function') {
                    ;((r = h), (n = h.return))
                    try {
                      ;((t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount())
                    } catch (k) {
                      G(r, n, k)
                    }
                  }
                  break
                case 5:
                  Gn(h, h.return)
                  break
                case 22:
                  if (h.memoizedState !== null) {
                    mf(d)
                    continue
                  }
              }
              y !== null ? ((y.return = h), (A = y)) : mf(d)
            }
            c = c.sibling
          }
        e: for (c = null, d = e; ; ) {
          if (d.tag === 5) {
            if (c === null) {
              c = d
              try {
                ;((i = d.stateNode),
                  u
                    ? ((o = i.style),
                      typeof o.setProperty == 'function'
                        ? o.setProperty('display', 'none', 'important')
                        : (o.display = 'none'))
                    : ((a = d.stateNode),
                      (l = d.memoizedProps.style),
                      (s = l != null && l.hasOwnProperty('display') ? l.display : null),
                      (a.style.display = xh('display', s))))
              } catch (k) {
                G(e, e.return, k)
              }
            }
          } else if (d.tag === 6) {
            if (c === null)
              try {
                d.stateNode.nodeValue = u ? '' : d.memoizedProps
              } catch (k) {
                G(e, e.return, k)
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) || d.memoizedState === null || d === e) &&
            d.child !== null
          ) {
            ;((d.child.return = d), (d = d.child))
            continue
          }
          if (d === e) break e
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e
            ;(c === d && (c = null), (d = d.return))
          }
          ;(c === d && (c = null), (d.sibling.return = d.return), (d = d.sibling))
        }
      }
      break
    case 19:
      ;(Ke(t, e), et(e), r & 4 && hf(e))
      break
    case 21:
      break
    default:
      ;(Ke(t, e), et(e))
  }
}
function et(e) {
  var t = e.flags
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Yp(n)) {
            var r = n
            break e
          }
          n = n.return
        }
        throw Error(C(160))
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode
          r.flags & 32 && (oi(i, ''), (r.flags &= -33))
          var o = df(e)
          aa(e, o, i)
          break
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            a = df(e)
          la(e, a, s)
          break
        default:
          throw Error(C(161))
      }
    } catch (l) {
      G(e, e.return, l)
    }
    e.flags &= -3
  }
  t & 4096 && (e.flags &= -4097)
}
function dy(e, t, n) {
  ;((A = e), Gp(e))
}
function Gp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; A !== null; ) {
    var i = A,
      o = i.child
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || no
      if (!s) {
        var a = i.alternate,
          l = (a !== null && a.memoizedState !== null) || pe
        a = no
        var u = pe
        if (((no = s), (pe = l) && !u))
          for (A = i; A !== null; )
            ((s = A),
              (l = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? gf(i)
                : l !== null
                  ? ((l.return = s), (A = l))
                  : gf(i))
        for (; o !== null; ) ((A = o), Gp(o), (o = o.sibling))
        ;((A = i), (no = a), (pe = u))
      }
      pf(e)
    } else i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (A = o)) : pf(e)
  }
}
function pf(e) {
  for (; A !== null; ) {
    var t = A
    if (t.flags & 8772) {
      var n = t.alternate
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              pe || gs(5, t)
              break
            case 1:
              var r = t.stateNode
              if (t.flags & 4 && !pe)
                if (n === null) r.componentDidMount()
                else {
                  var i = t.elementType === t.type ? n.memoizedProps : Ye(t.type, n.memoizedProps)
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                }
              var o = t.updateQueue
              o !== null && Xc(t, o, r)
              break
            case 3:
              var s = t.updateQueue
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode
                      break
                    case 1:
                      n = t.child.stateNode
                  }
                Xc(t, s, n)
              }
              break
            case 5:
              var a = t.stateNode
              if (n === null && t.flags & 4) {
                n = a
                var l = t.memoizedProps
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    l.autoFocus && n.focus()
                    break
                  case 'img':
                    l.src && (n.src = l.src)
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
              if (t.memoizedState === null) {
                var u = t.alternate
                if (u !== null) {
                  var c = u.memoizedState
                  if (c !== null) {
                    var d = c.dehydrated
                    d !== null && ui(d)
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
              throw Error(C(163))
          }
        pe || (t.flags & 512 && sa(t))
      } catch (h) {
        G(t, t.return, h)
      }
    }
    if (t === e) {
      A = null
      break
    }
    if (((n = t.sibling), n !== null)) {
      ;((n.return = t.return), (A = n))
      break
    }
    A = t.return
  }
}
function mf(e) {
  for (; A !== null; ) {
    var t = A
    if (t === e) {
      A = null
      break
    }
    var n = t.sibling
    if (n !== null) {
      ;((n.return = t.return), (A = n))
      break
    }
    A = t.return
  }
}
function gf(e) {
  for (; A !== null; ) {
    var t = A
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return
          try {
            gs(4, t)
          } catch (l) {
            G(t, n, l)
          }
          break
        case 1:
          var r = t.stateNode
          if (typeof r.componentDidMount == 'function') {
            var i = t.return
            try {
              r.componentDidMount()
            } catch (l) {
              G(t, i, l)
            }
          }
          var o = t.return
          try {
            sa(t)
          } catch (l) {
            G(t, o, l)
          }
          break
        case 5:
          var s = t.return
          try {
            sa(t)
          } catch (l) {
            G(t, s, l)
          }
      }
    } catch (l) {
      G(t, t.return, l)
    }
    if (t === e) {
      A = null
      break
    }
    var a = t.sibling
    if (a !== null) {
      ;((a.return = t.return), (A = a))
      break
    }
    A = t.return
  }
}
var hy = Math.ceil,
  Zo = xt.ReactCurrentDispatcher,
  vu = xt.ReactCurrentOwner,
  Ue = xt.ReactCurrentBatchConfig,
  N = 0,
  se = null,
  ee = null,
  ue = 0,
  Me = 0,
  Xn = Qt(0),
  re = 0,
  Ei = null,
  yn = 0,
  ys = 0,
  ku = 0,
  Jr = null,
  we = null,
  Eu = 0,
  mr = 1 / 0,
  at = null,
  Yo = !1,
  ua = null,
  Ot = null,
  ro = !1,
  Rt = null,
  Qo = 0,
  qr = 0,
  ca = null,
  xo = -1,
  wo = 0
function ve() {
  return N & 6 ? q() : xo !== -1 ? xo : (xo = q())
}
function It(e) {
  return e.mode & 1
    ? N & 2 && ue !== 0
      ? ue & -ue
      : Gg.transition !== null
        ? (wo === 0 && (wo = Dh()), wo)
        : ((e = W), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : zh(e.type))), e)
    : 1
}
function Xe(e, t, n, r) {
  if (50 < qr) throw ((qr = 0), (ca = null), Error(C(185)))
  ;(Ai(e, n, r),
    (!(N & 2) || e !== se) &&
      (e === se && (!(N & 2) && (ys |= n), re === 4 && Mt(e, ue)),
      Ce(e, r),
      n === 1 && N === 0 && !(t.mode & 1) && ((mr = q() + 500), hs && bt())))
}
function Ce(e, t) {
  var n = e.callbackNode
  G0(e, t)
  var r = jo(e, e === se ? ue : 0)
  if (r === 0) (n !== null && Sc(n), (e.callbackNode = null), (e.callbackPriority = 0))
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Sc(n), t === 1))
      (e.tag === 0 ? bg(yf.bind(null, e)) : sp(yf.bind(null, e)),
        Kg(function () {
          !(N & 6) && bt()
        }),
        (n = null))
    else {
      switch (Vh(r)) {
        case 1:
          n = Za
          break
        case 4:
          n = _h
          break
        case 16:
          n = Ro
          break
        case 536870912:
          n = Fh
          break
        default:
          n = Ro
      }
      n = i1(n, Xp.bind(null, e))
    }
    ;((e.callbackPriority = t), (e.callbackNode = n))
  }
}
function Xp(e, t) {
  if (((xo = -1), (wo = 0), N & 6)) throw Error(C(327))
  var n = e.callbackNode
  if (ar() && e.callbackNode !== n) return null
  var r = jo(e, e === se ? ue : 0)
  if (r === 0) return null
  if (r & 30 || r & e.expiredLanes || t) t = bo(e, r)
  else {
    t = r
    var i = N
    N |= 2
    var o = qp()
    ;(se !== e || ue !== t) && ((at = null), (mr = q() + 500), fn(e, t))
    do
      try {
        gy()
        break
      } catch (a) {
        Jp(e, a)
      }
    while (!0)
    ;(ou(), (Zo.current = o), (N = i), ee !== null ? (t = 0) : ((se = null), (ue = 0), (t = re)))
  }
  if (t !== 0) {
    if ((t === 2 && ((i = Wl(e)), i !== 0 && ((r = i), (t = fa(e, i)))), t === 1))
      throw ((n = Ei), fn(e, 0), Mt(e, r), Ce(e, q()), n)
    if (t === 6) Mt(e, r)
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !py(i) &&
          ((t = bo(e, r)), t === 2 && ((o = Wl(e)), o !== 0 && ((r = o), (t = fa(e, o)))), t === 1))
      )
        throw ((n = Ei), fn(e, 0), Mt(e, r), Ce(e, q()), n)
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(C(345))
        case 2:
          rn(e, we, at)
          break
        case 3:
          if ((Mt(e, r), (r & 130023424) === r && ((t = Eu + 500 - q()), 10 < t))) {
            if (jo(e, 0) !== 0) break
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              ;(ve(), (e.pingedLanes |= e.suspendedLanes & i))
              break
            }
            e.timeoutHandle = Kl(rn.bind(null, e, we, at), t)
            break
          }
          rn(e, we, at)
          break
        case 4:
          if ((Mt(e, r), (r & 4194240) === r)) break
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - Ge(r)
            ;((o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o))
          }
          if (
            ((r = i),
            (r = q() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * hy(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Kl(rn.bind(null, e, we, at), r)
            break
          }
          rn(e, we, at)
          break
        case 5:
          rn(e, we, at)
          break
        default:
          throw Error(C(329))
      }
    }
  }
  return (Ce(e, q()), e.callbackNode === n ? Xp.bind(null, e) : null)
}
function fa(e, t) {
  var n = Jr
  return (
    e.current.memoizedState.isDehydrated && (fn(e, t).flags |= 256),
    (e = bo(e, t)),
    e !== 2 && ((t = we), (we = n), t !== null && da(t)),
    e
  )
}
function da(e) {
  we === null ? (we = e) : we.push.apply(we, e)
}
function py(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot
          i = i.value
          try {
            if (!Je(o(), i)) return !1
          } catch {
            return !1
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) ((n.return = t), (t = n))
    else {
      if (t === e) break
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0
        t = t.return
      }
      ;((t.sibling.return = t.return), (t = t.sibling))
    }
  }
  return !0
}
function Mt(e, t) {
  for (
    t &= ~ku, t &= ~ys, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Ge(t),
      r = 1 << n
    ;((e[n] = -1), (t &= ~r))
  }
}
function yf(e) {
  if (N & 6) throw Error(C(327))
  ar()
  var t = jo(e, 0)
  if (!(t & 1)) return (Ce(e, q()), null)
  var n = bo(e, t)
  if (e.tag !== 0 && n === 2) {
    var r = Wl(e)
    r !== 0 && ((t = r), (n = fa(e, r)))
  }
  if (n === 1) throw ((n = Ei), fn(e, 0), Mt(e, t), Ce(e, q()), n)
  if (n === 6) throw Error(C(345))
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    rn(e, we, at),
    Ce(e, q()),
    null
  )
}
function xu(e, t) {
  var n = N
  N |= 1
  try {
    return e(t)
  } finally {
    ;((N = n), N === 0 && ((mr = q() + 500), hs && bt()))
  }
}
function vn(e) {
  Rt !== null && Rt.tag === 0 && !(N & 6) && ar()
  var t = N
  N |= 1
  var n = Ue.transition,
    r = W
  try {
    if (((Ue.transition = null), (W = 1), e)) return e()
  } finally {
    ;((W = r), (Ue.transition = n), (N = t), !(N & 6) && bt())
  }
}
function wu() {
  ;((Me = Xn.current), B(Xn))
}
function fn(e, t) {
  ;((e.finishedWork = null), (e.finishedLanes = 0))
  var n = e.timeoutHandle
  if ((n !== -1 && ((e.timeoutHandle = -1), Hg(n)), ee !== null))
    for (n = ee.return; n !== null; ) {
      var r = n
      switch ((nu(r), r.tag)) {
        case 1:
          ;((r = r.type.childContextTypes), r != null && No())
          break
        case 3:
          ;(hr(), B(Se), B(ge), fu())
          break
        case 5:
          cu(r)
          break
        case 4:
          hr()
          break
        case 13:
          B(H)
          break
        case 19:
          B(H)
          break
        case 10:
          su(r.type._context)
          break
        case 22:
        case 23:
          wu()
      }
      n = n.return
    }
  if (
    ((se = e),
    (ee = e = Bt(e.current, null)),
    (ue = Me = t),
    (re = 0),
    (Ei = null),
    (ku = ys = yn = 0),
    (we = Jr = null),
    an !== null)
  ) {
    for (t = 0; t < an.length; t++)
      if (((n = an[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null
        var i = r.next,
          o = n.pending
        if (o !== null) {
          var s = o.next
          ;((o.next = i), (r.next = s))
        }
        n.pending = r
      }
    an = null
  }
  return e
}
function Jp(e, t) {
  do {
    var n = ee
    try {
      if ((ou(), (vo.current = Ko), Ho)) {
        for (var r = Z.memoizedState; r !== null; ) {
          var i = r.queue
          ;(i !== null && (i.pending = null), (r = r.next))
        }
        Ho = !1
      }
      if (
        ((gn = 0),
        (oe = ne = Z = null),
        (Gr = !1),
        (yi = 0),
        (vu.current = null),
        n === null || n.return === null)
      ) {
        ;((re = 1), (Ei = t), (ee = null))
        break
      }
      e: {
        var o = e,
          s = n.return,
          a = n,
          l = t
        if (
          ((t = ue),
          (a.flags |= 32768),
          l !== null && typeof l == 'object' && typeof l.then == 'function')
        ) {
          var u = l,
            c = a,
            d = c.tag
          if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var h = c.alternate
            h
              ? ((c.updateQueue = h.updateQueue),
                (c.memoizedState = h.memoizedState),
                (c.lanes = h.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null))
          }
          var y = rf(s)
          if (y !== null) {
            ;((y.flags &= -257), of(y, s, a, o, t), y.mode & 1 && nf(o, u, t), (t = y), (l = u))
            var v = t.updateQueue
            if (v === null) {
              var k = new Set()
              ;(k.add(l), (t.updateQueue = k))
            } else v.add(l)
            break e
          } else {
            if (!(t & 1)) {
              ;(nf(o, u, t), Lu())
              break e
            }
            l = Error(C(426))
          }
        } else if (U && a.mode & 1) {
          var E = rf(s)
          if (E !== null) {
            ;(!(E.flags & 65536) && (E.flags |= 256), of(E, s, a, o, t), ru(pr(l, a)))
            break e
          }
        }
        ;((o = l = pr(l, a)), re !== 4 && (re = 2), Jr === null ? (Jr = [o]) : Jr.push(o), (o = s))
        do {
          switch (o.tag) {
            case 3:
              ;((o.flags |= 65536), (t &= -t), (o.lanes |= t))
              var m = Vp(o, l, t)
              Gc(o, m)
              break e
            case 1:
              a = l
              var p = o.type,
                g = o.stateNode
              if (
                !(o.flags & 128) &&
                (typeof p.getDerivedStateFromError == 'function' ||
                  (g !== null &&
                    typeof g.componentDidCatch == 'function' &&
                    (Ot === null || !Ot.has(g))))
              ) {
                ;((o.flags |= 65536), (t &= -t), (o.lanes |= t))
                var x = Np(o, a, t)
                Gc(o, x)
                break e
              }
          }
          o = o.return
        } while (o !== null)
      }
      t1(n)
    } catch (w) {
      ;((t = w), ee === n && n !== null && (ee = n = n.return))
      continue
    }
    break
  } while (!0)
}
function qp() {
  var e = Zo.current
  return ((Zo.current = Ko), e === null ? Ko : e)
}
function Lu() {
  ;((re === 0 || re === 3 || re === 2) && (re = 4),
    se === null || (!(yn & 268435455) && !(ys & 268435455)) || Mt(se, ue))
}
function bo(e, t) {
  var n = N
  N |= 2
  var r = qp()
  ;(se !== e || ue !== t) && ((at = null), fn(e, t))
  do
    try {
      my()
      break
    } catch (i) {
      Jp(e, i)
    }
  while (!0)
  if ((ou(), (N = n), (Zo.current = r), ee !== null)) throw Error(C(261))
  return ((se = null), (ue = 0), re)
}
function my() {
  for (; ee !== null; ) e1(ee)
}
function gy() {
  for (; ee !== null && !z0(); ) e1(ee)
}
function e1(e) {
  var t = r1(e.alternate, e, Me)
  ;((e.memoizedProps = e.pendingProps), t === null ? t1(e) : (ee = t), (vu.current = null))
}
function t1(e) {
  var t = e
  do {
    var n = t.alternate
    if (((e = t.return), t.flags & 32768)) {
      if (((n = uy(n, t)), n !== null)) {
        ;((n.flags &= 32767), (ee = n))
        return
      }
      if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null))
      else {
        ;((re = 6), (ee = null))
        return
      }
    } else if (((n = ay(n, t, Me)), n !== null)) {
      ee = n
      return
    }
    if (((t = t.sibling), t !== null)) {
      ee = t
      return
    }
    ee = t = e
  } while (t !== null)
  re === 0 && (re = 5)
}
function rn(e, t, n) {
  var r = W,
    i = Ue.transition
  try {
    ;((Ue.transition = null), (W = 1), yy(e, t, n, r))
  } finally {
    ;((Ue.transition = i), (W = r))
  }
  return null
}
function yy(e, t, n, r) {
  do ar()
  while (Rt !== null)
  if (N & 6) throw Error(C(327))
  n = e.finishedWork
  var i = e.finishedLanes
  if (n === null) return null
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(C(177))
  ;((e.callbackNode = null), (e.callbackPriority = 0))
  var o = n.lanes | n.childLanes
  if (
    (X0(e, o),
    e === se && ((ee = se = null), (ue = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      ro ||
      ((ro = !0),
      i1(Ro, function () {
        return (ar(), null)
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    ;((o = Ue.transition), (Ue.transition = null))
    var s = W
    W = 1
    var a = N
    ;((N |= 4),
      (vu.current = null),
      fy(e, n),
      bp(n, e),
      Wg($l),
      (_o = !!Ul),
      ($l = Ul = null),
      (e.current = n),
      dy(n),
      U0(),
      (N = a),
      (W = s),
      (Ue.transition = o))
  } else e.current = n
  if (
    (ro && ((ro = !1), (Rt = e), (Qo = i)),
    (o = e.pendingLanes),
    o === 0 && (Ot = null),
    K0(n.stateNode),
    Ce(e, q()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest }))
  if (Yo) throw ((Yo = !1), (e = ua), (ua = null), e)
  return (
    Qo & 1 && e.tag !== 0 && ar(),
    (o = e.pendingLanes),
    o & 1 ? (e === ca ? qr++ : ((qr = 0), (ca = e))) : (qr = 0),
    bt(),
    null
  )
}
function ar() {
  if (Rt !== null) {
    var e = Vh(Qo),
      t = Ue.transition,
      n = W
    try {
      if (((Ue.transition = null), (W = 16 > e ? 16 : e), Rt === null)) var r = !1
      else {
        if (((e = Rt), (Rt = null), (Qo = 0), N & 6)) throw Error(C(331))
        var i = N
        for (N |= 4, A = e.current; A !== null; ) {
          var o = A,
            s = o.child
          if (A.flags & 16) {
            var a = o.deletions
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var u = a[l]
                for (A = u; A !== null; ) {
                  var c = A
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Xr(8, c, o)
                  }
                  var d = c.child
                  if (d !== null) ((d.return = c), (A = d))
                  else
                    for (; A !== null; ) {
                      c = A
                      var h = c.sibling,
                        y = c.return
                      if ((Zp(c), c === u)) {
                        A = null
                        break
                      }
                      if (h !== null) {
                        ;((h.return = y), (A = h))
                        break
                      }
                      A = y
                    }
                }
              }
              var v = o.alternate
              if (v !== null) {
                var k = v.child
                if (k !== null) {
                  v.child = null
                  do {
                    var E = k.sibling
                    ;((k.sibling = null), (k = E))
                  } while (k !== null)
                }
              }
              A = o
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) ((s.return = o), (A = s))
          else
            e: for (; A !== null; ) {
              if (((o = A), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Xr(9, o, o.return)
                }
              var m = o.sibling
              if (m !== null) {
                ;((m.return = o.return), (A = m))
                break e
              }
              A = o.return
            }
        }
        var p = e.current
        for (A = p; A !== null; ) {
          s = A
          var g = s.child
          if (s.subtreeFlags & 2064 && g !== null) ((g.return = s), (A = g))
          else
            e: for (s = p; A !== null; ) {
              if (((a = A), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      gs(9, a)
                  }
                } catch (w) {
                  G(a, a.return, w)
                }
              if (a === s) {
                A = null
                break e
              }
              var x = a.sibling
              if (x !== null) {
                ;((x.return = a.return), (A = x))
                break e
              }
              A = a.return
            }
        }
        if (((N = i), bt(), rt && typeof rt.onPostCommitFiberRoot == 'function'))
          try {
            rt.onPostCommitFiberRoot(as, e)
          } catch {}
        r = !0
      }
      return r
    } finally {
      ;((W = n), (Ue.transition = t))
    }
  }
  return !1
}
function vf(e, t, n) {
  ;((t = pr(n, t)),
    (t = Vp(e, t, 1)),
    (e = Wt(e, t, 1)),
    (t = ve()),
    e !== null && (Ai(e, 1, t), Ce(e, t)))
}
function G(e, t, n) {
  if (e.tag === 3) vf(e, e, n)
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        vf(t, e, n)
        break
      } else if (t.tag === 1) {
        var r = t.stateNode
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' && (Ot === null || !Ot.has(r)))
        ) {
          ;((e = pr(n, e)),
            (e = Np(t, e, 1)),
            (t = Wt(t, e, 1)),
            (e = ve()),
            t !== null && (Ai(t, 1, e), Ce(t, e)))
          break
        }
      }
      t = t.return
    }
}
function vy(e, t, n) {
  var r = e.pingCache
  ;(r !== null && r.delete(t),
    (t = ve()),
    (e.pingedLanes |= e.suspendedLanes & n),
    se === e &&
      (ue & n) === n &&
      (re === 4 || (re === 3 && (ue & 130023424) === ue && 500 > q() - Eu) ? fn(e, 0) : (ku |= n)),
    Ce(e, t))
}
function n1(e, t) {
  t === 0 && (e.mode & 1 ? ((t = Yi), (Yi <<= 1), !(Yi & 130023424) && (Yi = 4194304)) : (t = 1))
  var n = ve()
  ;((e = vt(e, t)), e !== null && (Ai(e, t, n), Ce(e, n)))
}
function ky(e) {
  var t = e.memoizedState,
    n = 0
  ;(t !== null && (n = t.retryLane), n1(e, n))
}
function Ey(e, t) {
  var n = 0
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState
      i !== null && (n = i.retryLane)
      break
    case 19:
      r = e.stateNode
      break
    default:
      throw Error(C(314))
  }
  ;(r !== null && r.delete(t), n1(e, n))
}
var r1
r1 = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Se.current) Le = !0
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Le = !1), ly(e, t, n))
      Le = !!(e.flags & 131072)
    }
  else ((Le = !1), U && t.flags & 1048576 && lp(t, Io, t.index))
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type
      ;(Eo(e, t), (e = t.pendingProps))
      var i = cr(t, ge.current)
      ;(lr(t, n), (i = hu(null, t, r, e, i, n)))
      var o = pu()
      return (
        (t.flags |= 1),
        typeof i == 'object' && i !== null && typeof i.render == 'function' && i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Pe(r) ? ((o = !0), Wo(t)) : (o = !1),
            (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
            au(t),
            (i.updater = ms),
            (t.stateNode = i),
            (i._reactInternals = t),
            Jl(t, r, e, n),
            (t = ta(null, t, r, !0, o, n)))
          : ((t.tag = 0), U && o && tu(t), ye(null, t, i, n), (t = t.child)),
        t
      )
    case 16:
      r = t.elementType
      e: {
        switch (
          (Eo(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = wy(r)),
          (e = Ye(r, e)),
          i)
        ) {
          case 0:
            t = ea(null, t, r, e, n)
            break e
          case 1:
            t = af(null, t, r, e, n)
            break e
          case 11:
            t = sf(null, t, r, e, n)
            break e
          case 14:
            t = lf(null, t, r, Ye(r.type, e), n)
            break e
        }
        throw Error(C(306, r, ''))
      }
      return t
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ye(r, i)),
        ea(e, t, r, i, n)
      )
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ye(r, i)),
        af(e, t, r, i, n)
      )
    case 3:
      e: {
        if ((Bp(t), e === null)) throw Error(C(387))
        ;((r = t.pendingProps), (o = t.memoizedState), (i = o.element), hp(e, t), Uo(t, r, null, n))
        var s = t.memoizedState
        if (((r = s.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            ;((i = pr(Error(C(423)), t)), (t = uf(e, t, r, n, i)))
            break e
          } else if (r !== i) {
            ;((i = pr(Error(C(424)), t)), (t = uf(e, t, r, n, i)))
            break e
          } else
            for (
              Ae = Nt(t.stateNode.containerInfo.firstChild),
                Re = t,
                U = !0,
                be = null,
                n = fp(t, null, r, n),
                t.child = n;
              n;

            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling))
        else {
          if ((fr(), r === i)) {
            t = kt(e, t, n)
            break e
          }
          ye(e, t, r, n)
        }
        t = t.child
      }
      return t
    case 5:
      return (
        pp(t),
        e === null && bl(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (s = i.children),
        Hl(r, i) ? (s = null) : o !== null && Hl(r, o) && (t.flags |= 32),
        Ip(e, t),
        ye(e, t, s, n),
        t.child
      )
    case 6:
      return (e === null && bl(t), null)
    case 13:
      return zp(e, t, n)
    case 4:
      return (
        uu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = dr(t, null, r, n)) : ye(e, t, r, n),
        t.child
      )
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ye(r, i)),
        sf(e, t, r, i, n)
      )
    case 7:
      return (ye(e, t, t.pendingProps, n), t.child)
    case 8:
      return (ye(e, t, t.pendingProps.children, n), t.child)
    case 12:
      return (ye(e, t, t.pendingProps.children, n), t.child)
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (s = i.value),
          O(Bo, r._currentValue),
          (r._currentValue = s),
          o !== null)
        )
          if (Je(o.value, s)) {
            if (o.children === i.children && !Se.current) {
              t = kt(e, t, n)
              break e
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var a = o.dependencies
              if (a !== null) {
                s = o.child
                for (var l = a.firstContext; l !== null; ) {
                  if (l.context === r) {
                    if (o.tag === 1) {
                      ;((l = ht(-1, n & -n)), (l.tag = 2))
                      var u = o.updateQueue
                      if (u !== null) {
                        u = u.shared
                        var c = u.pending
                        ;(c === null ? (l.next = l) : ((l.next = c.next), (c.next = l)),
                          (u.pending = l))
                      }
                    }
                    ;((o.lanes |= n),
                      (l = o.alternate),
                      l !== null && (l.lanes |= n),
                      Gl(o.return, n, t),
                      (a.lanes |= n))
                    break
                  }
                  l = l.next
                }
              } else if (o.tag === 10) s = o.type === t.type ? null : o.child
              else if (o.tag === 18) {
                if (((s = o.return), s === null)) throw Error(C(341))
                ;((s.lanes |= n),
                  (a = s.alternate),
                  a !== null && (a.lanes |= n),
                  Gl(s, n, t),
                  (s = o.sibling))
              } else s = o.child
              if (s !== null) s.return = o
              else
                for (s = o; s !== null; ) {
                  if (s === t) {
                    s = null
                    break
                  }
                  if (((o = s.sibling), o !== null)) {
                    ;((o.return = s.return), (s = o))
                    break
                  }
                  s = s.return
                }
              o = s
            }
        ;(ye(e, t, i.children, n), (t = t.child))
      }
      return t
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        lr(t, n),
        (i = $e(i)),
        (r = r(i)),
        (t.flags |= 1),
        ye(e, t, r, n),
        t.child
      )
    case 14:
      return ((r = t.type), (i = Ye(r, t.pendingProps)), (i = Ye(r.type, i)), lf(e, t, r, i, n))
    case 15:
      return Wp(e, t, t.type, t.pendingProps, n)
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ye(r, i)),
        Eo(e, t),
        (t.tag = 1),
        Pe(r) ? ((e = !0), Wo(t)) : (e = !1),
        lr(t, n),
        Dp(t, r, i),
        Jl(t, r, i, n),
        ta(null, t, r, !0, e, n)
      )
    case 19:
      return Up(e, t, n)
    case 22:
      return Op(e, t, n)
  }
  throw Error(C(156, t.tag))
}
function i1(e, t) {
  return jh(e, t)
}
function xy(e, t, n, r) {
  ;((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null))
}
function ze(e, t, n, r) {
  return new xy(e, t, n, r)
}
function Su(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent))
}
function wy(e) {
  if (typeof e == 'function') return Su(e) ? 1 : 0
  if (e != null) {
    if (((e = e.$$typeof), e === $a)) return 11
    if (e === Ha) return 14
  }
  return 2
}
function Bt(e, t) {
  var n = e.alternate
  return (
    n === null
      ? ((n = ze(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  )
}
function Lo(e, t, n, r, i, o) {
  var s = 2
  if (((r = e), typeof e == 'function')) Su(e) && (s = 1)
  else if (typeof e == 'string') s = 5
  else
    e: switch (e) {
      case zn:
        return dn(n.children, i, o, t)
      case Ua:
        ;((s = 8), (i |= 8))
        break
      case wl:
        return ((e = ze(12, n, t, i | 2)), (e.elementType = wl), (e.lanes = o), e)
      case Ll:
        return ((e = ze(13, n, t, i)), (e.elementType = Ll), (e.lanes = o), e)
      case Sl:
        return ((e = ze(19, n, t, i)), (e.elementType = Sl), (e.lanes = o), e)
      case ph:
        return vs(n, i, o, t)
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case dh:
              s = 10
              break e
            case hh:
              s = 9
              break e
            case $a:
              s = 11
              break e
            case Ha:
              s = 14
              break e
            case Pt:
              ;((s = 16), (r = null))
              break e
          }
        throw Error(C(130, e == null ? e : typeof e, ''))
    }
  return ((t = ze(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t)
}
function dn(e, t, n, r) {
  return ((e = ze(7, e, r, t)), (e.lanes = n), e)
}
function vs(e, t, n, r) {
  return (
    (e = ze(22, e, r, t)),
    (e.elementType = ph),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  )
}
function rl(e, t, n) {
  return ((e = ze(6, e, null, t)), (e.lanes = n), e)
}
function il(e, t, n) {
  return (
    (t = ze(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  )
}
function Ly(e, t, n, r, i) {
  ;((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Os(0)),
    (this.expirationTimes = Os(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Os(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null))
}
function Pu(e, t, n, r, i, o, s, a, l) {
  return (
    (e = new Ly(e, t, n, a, l)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = ze(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    au(o),
    e
  )
}
function Sy(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
  return {
    $$typeof: Bn,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  }
}
function o1(e) {
  if (!e) return Ht
  e = e._reactInternals
  e: {
    if (xn(e) !== e || e.tag !== 1) throw Error(C(170))
    var t = e
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context
          break e
        case 1:
          if (Pe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext
            break e
          }
      }
      t = t.return
    } while (t !== null)
    throw Error(C(171))
  }
  if (e.tag === 1) {
    var n = e.type
    if (Pe(n)) return op(e, n, t)
  }
  return t
}
function s1(e, t, n, r, i, o, s, a, l) {
  return (
    (e = Pu(n, r, !0, e, i, o, s, a, l)),
    (e.context = o1(null)),
    (n = e.current),
    (r = ve()),
    (i = It(n)),
    (o = ht(r, i)),
    (o.callback = t ?? null),
    Wt(n, o, i),
    (e.current.lanes = i),
    Ai(e, i, r),
    Ce(e, r),
    e
  )
}
function ks(e, t, n, r) {
  var i = t.current,
    o = ve(),
    s = It(i)
  return (
    (n = o1(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = ht(o, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Wt(i, t, s)),
    e !== null && (Xe(e, i, s, o), yo(e, i, s)),
    s
  )
}
function Go(e) {
  if (((e = e.current), !e.child)) return null
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode
    default:
      return e.child.stateNode
  }
}
function kf(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane
    e.retryLane = n !== 0 && n < t ? n : t
  }
}
function Cu(e, t) {
  ;(kf(e, t), (e = e.alternate) && kf(e, t))
}
function Py() {
  return null
}
var l1 =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e)
      }
function Tu(e) {
  this._internalRoot = e
}
Es.prototype.render = Tu.prototype.render = function (e) {
  var t = this._internalRoot
  if (t === null) throw Error(C(409))
  ks(e, t, null, null)
}
Es.prototype.unmount = Tu.prototype.unmount = function () {
  var e = this._internalRoot
  if (e !== null) {
    this._internalRoot = null
    var t = e.containerInfo
    ;(vn(function () {
      ks(null, e, null, null)
    }),
      (t[yt] = null))
  }
}
function Es(e) {
  this._internalRoot = e
}
Es.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Oh()
    e = { blockedOn: null, target: e, priority: t }
    for (var n = 0; n < Tt.length && t !== 0 && t < Tt[n].priority; n++);
    ;(Tt.splice(n, 0, e), n === 0 && Bh(e))
  }
}
function Mu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
}
function xs(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  )
}
function Ef() {}
function Cy(e, t, n, r, i) {
  if (i) {
    if (typeof r == 'function') {
      var o = r
      r = function () {
        var u = Go(s)
        o.call(u)
      }
    }
    var s = s1(t, r, e, 0, null, !1, !1, '', Ef)
    return (
      (e._reactRootContainer = s),
      (e[yt] = s.current),
      di(e.nodeType === 8 ? e.parentNode : e),
      vn(),
      s
    )
  }
  for (; (i = e.lastChild); ) e.removeChild(i)
  if (typeof r == 'function') {
    var a = r
    r = function () {
      var u = Go(l)
      a.call(u)
    }
  }
  var l = Pu(e, 0, !1, null, null, !1, !1, '', Ef)
  return (
    (e._reactRootContainer = l),
    (e[yt] = l.current),
    di(e.nodeType === 8 ? e.parentNode : e),
    vn(function () {
      ks(t, l, n, r)
    }),
    l
  )
}
function ws(e, t, n, r, i) {
  var o = n._reactRootContainer
  if (o) {
    var s = o
    if (typeof i == 'function') {
      var a = i
      i = function () {
        var l = Go(s)
        a.call(l)
      }
    }
    ks(t, s, e, i)
  } else s = Cy(n, t, e, i, r)
  return Go(s)
}
Nh = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode
      if (t.current.memoizedState.isDehydrated) {
        var n = Or(t.pendingLanes)
        n !== 0 && (Ya(t, n | 1), Ce(t, q()), !(N & 6) && ((mr = q() + 500), bt()))
      }
      break
    case 13:
      ;(vn(function () {
        var r = vt(e, 1)
        if (r !== null) {
          var i = ve()
          Xe(r, e, 1, i)
        }
      }),
        Cu(e, 1))
  }
}
Qa = function (e) {
  if (e.tag === 13) {
    var t = vt(e, 134217728)
    if (t !== null) {
      var n = ve()
      Xe(t, e, 134217728, n)
    }
    Cu(e, 134217728)
  }
}
Wh = function (e) {
  if (e.tag === 13) {
    var t = It(e),
      n = vt(e, t)
    if (n !== null) {
      var r = ve()
      Xe(n, e, t, r)
    }
    Cu(e, t)
  }
}
Oh = function () {
  return W
}
Ih = function (e, t) {
  var n = W
  try {
    return ((W = e), t())
  } finally {
    W = n
  }
}
Dl = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((Tl(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode
        for (
          n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'), t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t]
          if (r !== e && r.form === e.form) {
            var i = ds(r)
            if (!i) throw Error(C(90))
            ;(gh(r), Tl(r, i))
          }
        }
      }
      break
    case 'textarea':
      vh(e, n)
      break
    case 'select':
      ;((t = n.value), t != null && rr(e, !!n.multiple, t, !1))
  }
}
Ph = xu
Ch = vn
var Ty = { usingClientEntryPoint: !1, Events: [ji, Kn, ds, Lh, Sh, xu] },
  Dr = {
    findFiberByHostInstance: ln,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  My = {
    bundleType: Dr.bundleType,
    version: Dr.version,
    rendererPackageName: Dr.rendererPackageName,
    rendererConfig: Dr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: xt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = Ah(e)), e === null ? null : e.stateNode)
    },
    findFiberByHostInstance: Dr.findFiberByHostInstance || Py,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  }
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var io = __REACT_DEVTOOLS_GLOBAL_HOOK__
  if (!io.isDisabled && io.supportsFiber)
    try {
      ;((as = io.inject(My)), (rt = io))
    } catch {}
}
De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ty
De.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
  if (!Mu(t)) throw Error(C(200))
  return Sy(e, t, null, n)
}
De.createRoot = function (e, t) {
  if (!Mu(e)) throw Error(C(299))
  var n = !1,
    r = '',
    i = l1
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Pu(e, 1, !1, null, null, n, !1, r, i)),
    (e[yt] = t.current),
    di(e.nodeType === 8 ? e.parentNode : e),
    new Tu(t)
  )
}
De.findDOMNode = function (e) {
  if (e == null) return null
  if (e.nodeType === 1) return e
  var t = e._reactInternals
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(C(188))
      : ((e = Object.keys(e).join(',')), Error(C(268, e)))
  return ((e = Ah(t)), (e = e === null ? null : e.stateNode), e)
}
De.flushSync = function (e) {
  return vn(e)
}
De.hydrate = function (e, t, n) {
  if (!xs(t)) throw Error(C(200))
  return ws(null, e, t, !0, n)
}
De.hydrateRoot = function (e, t, n) {
  if (!Mu(e)) throw Error(C(405))
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = '',
    s = l1
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = s1(t, null, e, 1, n ?? null, i, !1, o, s)),
    (e[yt] = t.current),
    di(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i))
  return new Es(t)
}
De.render = function (e, t, n) {
  if (!xs(t)) throw Error(C(200))
  return ws(null, e, t, !1, n)
}
De.unmountComponentAtNode = function (e) {
  if (!xs(e)) throw Error(C(40))
  return e._reactRootContainer
    ? (vn(function () {
        ws(null, null, e, !1, function () {
          ;((e._reactRootContainer = null), (e[yt] = null))
        })
      }),
      !0)
    : !1
}
De.unstable_batchedUpdates = xu
De.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!xs(n)) throw Error(C(200))
  if (e == null || e._reactInternals === void 0) throw Error(C(38))
  return ws(e, t, n, !1, r)
}
De.version = '18.3.1-next-f1338f8080-20240426'
function a1() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a1)
    } catch (e) {
      console.error(e)
    }
}
;(a1(), (ah.exports = De))
var Ay = ah.exports,
  Ry,
  xf = Ay
;((Ry = xf.createRoot), xf.hydrateRoot)
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function xi() {
  return (
    (xi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    xi.apply(this, arguments)
  )
}
var jt
;(function (e) {
  ;((e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE'))
})(jt || (jt = {}))
const wf = 'popstate'
function jy(e) {
  e === void 0 && (e = {})
  function t(i, o) {
    let { pathname: s = '/', search: a = '', hash: l = '' } = wn(i.location.hash.substr(1))
    return (
      !s.startsWith('/') && !s.startsWith('.') && (s = '/' + s),
      ha(
        '',
        { pathname: s, search: a, hash: l },
        (o.state && o.state.usr) || null,
        (o.state && o.state.key) || 'default'
      )
    )
  }
  function n(i, o) {
    let s = i.document.querySelector('base'),
      a = ''
    if (s && s.getAttribute('href')) {
      let l = i.location.href,
        u = l.indexOf('#')
      a = u === -1 ? l : l.slice(0, u)
    }
    return a + '#' + (typeof o == 'string' ? o : Xo(o))
  }
  function r(i, o) {
    Ls(
      i.pathname.charAt(0) === '/',
      'relative pathnames are not supported in hash history.push(' + JSON.stringify(o) + ')'
    )
  }
  return Fy(t, n, r, e)
}
function Y(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t)
}
function Ls(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t)
    try {
      throw new Error(t)
    } catch {}
  }
}
function _y() {
  return Math.random().toString(36).substr(2, 8)
}
function Lf(e, t) {
  return { usr: e.state, key: e.key, idx: t }
}
function ha(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    xi(
      { pathname: typeof e == 'string' ? e : e.pathname, search: '', hash: '' },
      typeof t == 'string' ? wn(t) : t,
      { state: n, key: (t && t.key) || r || _y() }
    )
  )
}
function Xo(e) {
  let { pathname: t = '/', search: n = '', hash: r = '' } = e
  return (
    n && n !== '?' && (t += n.charAt(0) === '?' ? n : '?' + n),
    r && r !== '#' && (t += r.charAt(0) === '#' ? r : '#' + r),
    t
  )
}
function wn(e) {
  let t = {}
  if (e) {
    let n = e.indexOf('#')
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)))
    let r = e.indexOf('?')
    ;(r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))), e && (t.pathname = e))
  }
  return t
}
function Fy(e, t, n, r) {
  r === void 0 && (r = {})
  let { window: i = document.defaultView, v5Compat: o = !1 } = r,
    s = i.history,
    a = jt.Pop,
    l = null,
    u = c()
  u == null && ((u = 0), s.replaceState(xi({}, s.state, { idx: u }), ''))
  function c() {
    return (s.state || { idx: null }).idx
  }
  function d() {
    a = jt.Pop
    let E = c(),
      m = E == null ? null : E - u
    ;((u = E), l && l({ action: a, location: k.location, delta: m }))
  }
  function h(E, m) {
    a = jt.Push
    let p = ha(k.location, E, m)
    ;(n && n(p, E), (u = c() + 1))
    let g = Lf(p, u),
      x = k.createHref(p)
    try {
      s.pushState(g, '', x)
    } catch (w) {
      if (w instanceof DOMException && w.name === 'DataCloneError') throw w
      i.location.assign(x)
    }
    o && l && l({ action: a, location: k.location, delta: 1 })
  }
  function y(E, m) {
    a = jt.Replace
    let p = ha(k.location, E, m)
    ;(n && n(p, E), (u = c()))
    let g = Lf(p, u),
      x = k.createHref(p)
    ;(s.replaceState(g, '', x), o && l && l({ action: a, location: k.location, delta: 0 }))
  }
  function v(E) {
    let m = i.location.origin !== 'null' ? i.location.origin : i.location.href,
      p = typeof E == 'string' ? E : Xo(E)
    return (
      (p = p.replace(/ $/, '%20')),
      Y(m, 'No window.location.(origin|href) available to create URL for href: ' + p),
      new URL(p, m)
    )
  }
  let k = {
    get action() {
      return a
    },
    get location() {
      return e(i, s)
    },
    listen(E) {
      if (l) throw new Error('A history only accepts one active listener')
      return (
        i.addEventListener(wf, d),
        (l = E),
        () => {
          ;(i.removeEventListener(wf, d), (l = null))
        }
      )
    },
    createHref(E) {
      return t(i, E)
    },
    createURL: v,
    encodeLocation(E) {
      let m = v(E)
      return { pathname: m.pathname, search: m.search, hash: m.hash }
    },
    push: h,
    replace: y,
    go(E) {
      return s.go(E)
    },
  }
  return k
}
var Sf
;(function (e) {
  ;((e.data = 'data'), (e.deferred = 'deferred'), (e.redirect = 'redirect'), (e.error = 'error'))
})(Sf || (Sf = {}))
function Dy(e, t, n) {
  return (n === void 0 && (n = '/'), Vy(e, t, n))
}
function Vy(e, t, n, r) {
  let i = typeof t == 'string' ? wn(t) : t,
    o = gr(i.pathname || '/', n)
  if (o == null) return null
  let s = u1(e)
  Ny(s)
  let a = null
  for (let l = 0; a == null && l < s.length; ++l) {
    let u = Yy(o)
    a = Ky(s[l], u)
  }
  return a
}
function u1(e, t, n, r) {
  ;(t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = ''))
  let i = (o, s, a) => {
    let l = {
      relativePath: a === void 0 ? o.path || '' : a,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: s,
      route: o,
    }
    l.relativePath.startsWith('/') &&
      (Y(
        l.relativePath.startsWith(r),
        'Absolute route path "' +
          l.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.'
      ),
      (l.relativePath = l.relativePath.slice(r.length)))
    let u = zt([r, l.relativePath]),
      c = n.concat(l)
    ;(o.children &&
      o.children.length > 0 &&
      (Y(
        o.index !== !0,
        'Index routes must not have child routes. Please remove ' +
          ('all child routes from route path "' + u + '".')
      ),
      u1(o.children, t, c, u)),
      !(o.path == null && !o.index) && t.push({ path: u, score: $y(u, o.index), routesMeta: c }))
  }
  return (
    e.forEach((o, s) => {
      var a
      if (o.path === '' || !((a = o.path) != null && a.includes('?'))) i(o, s)
      else for (let l of c1(o.path)) i(o, s, l)
    }),
    t
  )
}
function c1(e) {
  let t = e.split('/')
  if (t.length === 0) return []
  let [n, ...r] = t,
    i = n.endsWith('?'),
    o = n.replace(/\?$/, '')
  if (r.length === 0) return i ? [o, ''] : [o]
  let s = c1(r.join('/')),
    a = []
  return (
    a.push(...s.map((l) => (l === '' ? o : [o, l].join('/')))),
    i && a.push(...s),
    a.map((l) => (e.startsWith('/') && l === '' ? '/' : l))
  )
}
function Ny(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Hy(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  )
}
const Wy = /^:[\w-]+$/,
  Oy = 3,
  Iy = 2,
  By = 1,
  zy = 10,
  Uy = -2,
  Pf = (e) => e === '*'
function $y(e, t) {
  let n = e.split('/'),
    r = n.length
  return (
    n.some(Pf) && (r += Uy),
    t && (r += Iy),
    n.filter((i) => !Pf(i)).reduce((i, o) => i + (Wy.test(o) ? Oy : o === '' ? By : zy), r)
  )
}
function Hy(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0
}
function Ky(e, t, n) {
  let { routesMeta: r } = e,
    i = {},
    o = '/',
    s = []
  for (let a = 0; a < r.length; ++a) {
    let l = r[a],
      u = a === r.length - 1,
      c = o === '/' ? t : t.slice(o.length) || '/',
      d = pa({ path: l.relativePath, caseSensitive: l.caseSensitive, end: u }, c),
      h = l.route
    if (!d) return null
    ;(Object.assign(i, d.params),
      s.push({
        params: i,
        pathname: zt([o, d.pathname]),
        pathnameBase: Jy(zt([o, d.pathnameBase])),
        route: h,
      }),
      d.pathnameBase !== '/' && (o = zt([o, d.pathnameBase])))
  }
  return s
}
function pa(e, t) {
  typeof e == 'string' && (e = { path: e, caseSensitive: !1, end: !0 })
  let [n, r] = Zy(e.path, e.caseSensitive, e.end),
    i = t.match(n)
  if (!i) return null
  let o = i[0],
    s = o.replace(/(.)\/+$/, '$1'),
    a = i.slice(1)
  return {
    params: r.reduce((u, c, d) => {
      let { paramName: h, isOptional: y } = c
      if (h === '*') {
        let k = a[d] || ''
        s = o.slice(0, o.length - k.length).replace(/(.)\/+$/, '$1')
      }
      const v = a[d]
      return (y && !v ? (u[h] = void 0) : (u[h] = (v || '').replace(/%2F/g, '/')), u)
    }, {}),
    pathname: o,
    pathnameBase: s,
    pattern: e,
  }
}
function Zy(e, t, n) {
  ;(t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Ls(
      e === '*' || !e.endsWith('*') || e.endsWith('/*'),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + e.replace(/\*$/, '/*') + '".')
    ))
  let r = [],
    i =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (s, a, l) => (
            r.push({ paramName: a, isOptional: l != null }),
            l ? '/?([^\\/]+)?' : '/([^\\/]+)'
          )
        )
  return (
    e.endsWith('*')
      ? (r.push({ paramName: '*' }), (i += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (i += '\\/*$')
        : e !== '' && e !== '/' && (i += '(?:(?=\\/|$))'),
    [new RegExp(i, t ? void 0 : 'i'), r]
  )
}
function Yy(e) {
  try {
    return e
      .split('/')
      .map((t) => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/')
  } catch (t) {
    return (
      Ls(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ('encoding (' + t + ').')
      ),
      e
    )
  }
}
function gr(e, t) {
  if (t === '/') return e
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n)
  return r && r !== '/' ? null : e.slice(n) || '/'
}
const Qy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  by = (e) => Qy.test(e)
function Gy(e, t) {
  t === void 0 && (t = '/')
  let { pathname: n, search: r = '', hash: i = '' } = typeof e == 'string' ? wn(e) : e,
    o
  if (n)
    if (by(n)) o = n
    else {
      if (n.includes('//')) {
        let s = n
        ;((n = n.replace(/\/\/+/g, '/')),
          Ls(!1, 'Pathnames cannot have embedded double slashes - normalizing ' + (s + ' -> ' + n)))
      }
      n.startsWith('/') ? (o = Cf(n.substring(1), '/')) : (o = Cf(n, t))
    }
  else o = t
  return { pathname: o, search: qy(r), hash: e2(i) }
}
function Cf(e, t) {
  let n = t.replace(/\/+$/, '').split('/')
  return (
    e.split('/').forEach((i) => {
      i === '..' ? n.length > 1 && n.pop() : i !== '.' && n.push(i)
    }),
    n.length > 1 ? n.join('/') : '/'
  )
}
function ol(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ('`to.' + t + '` field [' + JSON.stringify(r) + '].  Please separate it out to the ') +
    ('`to.' + n + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  )
}
function Xy(e) {
  return e.filter((t, n) => n === 0 || (t.route.path && t.route.path.length > 0))
}
function Au(e, t) {
  let n = Xy(e)
  return t
    ? n.map((r, i) => (i === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase)
}
function Ru(e, t, n, r) {
  r === void 0 && (r = !1)
  let i
  typeof e == 'string'
    ? (i = wn(e))
    : ((i = xi({}, e)),
      Y(!i.pathname || !i.pathname.includes('?'), ol('?', 'pathname', 'search', i)),
      Y(!i.pathname || !i.pathname.includes('#'), ol('#', 'pathname', 'hash', i)),
      Y(!i.search || !i.search.includes('#'), ol('#', 'search', 'hash', i)))
  let o = e === '' || i.pathname === '',
    s = o ? '/' : i.pathname,
    a
  if (s == null) a = n
  else {
    let d = t.length - 1
    if (!r && s.startsWith('..')) {
      let h = s.split('/')
      for (; h[0] === '..'; ) (h.shift(), (d -= 1))
      i.pathname = h.join('/')
    }
    a = d >= 0 ? t[d] : '/'
  }
  let l = Gy(i, a),
    u = s && s !== '/' && s.endsWith('/'),
    c = (o || s === '.') && n.endsWith('/')
  return (!l.pathname.endsWith('/') && (u || c) && (l.pathname += '/'), l)
}
const zt = (e) => e.join('/').replace(/\/\/+/g, '/'),
  Jy = (e) => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  qy = (e) => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  e2 = (e) => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e)
function t2(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  )
}
const f1 = ['post', 'put', 'patch', 'delete']
new Set(f1)
const n2 = ['get', ...f1]
new Set(n2)
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function wi() {
  return (
    (wi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    wi.apply(this, arguments)
  )
}
const Ss = L.createContext(null),
  d1 = L.createContext(null),
  wt = L.createContext(null),
  Ps = L.createContext(null),
  Gt = L.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  h1 = L.createContext(null)
function r2(e, t) {
  let { relative: n } = t === void 0 ? {} : t
  Lr() || Y(!1)
  let { basename: r, navigator: i } = L.useContext(wt),
    { hash: o, pathname: s, search: a } = Cs(e, { relative: n }),
    l = s
  return (
    r !== '/' && (l = s === '/' ? r : zt([r, s])),
    i.createHref({ pathname: l, search: a, hash: o })
  )
}
function Lr() {
  return L.useContext(Ps) != null
}
function Sr() {
  return (Lr() || Y(!1), L.useContext(Ps).location)
}
function p1(e) {
  L.useContext(wt).static || L.useLayoutEffect(e)
}
function m1() {
  let { isDataRoute: e } = L.useContext(Gt)
  return e ? g2() : i2()
}
function i2() {
  Lr() || Y(!1)
  let e = L.useContext(Ss),
    { basename: t, future: n, navigator: r } = L.useContext(wt),
    { matches: i } = L.useContext(Gt),
    { pathname: o } = Sr(),
    s = JSON.stringify(Au(i, n.v7_relativeSplatPath)),
    a = L.useRef(!1)
  return (
    p1(() => {
      a.current = !0
    }),
    L.useCallback(
      function (u, c) {
        if ((c === void 0 && (c = {}), !a.current)) return
        if (typeof u == 'number') {
          r.go(u)
          return
        }
        let d = Ru(u, JSON.parse(s), o, c.relative === 'path')
        ;(e == null && t !== '/' && (d.pathname = d.pathname === '/' ? t : zt([t, d.pathname])),
          (c.replace ? r.replace : r.push)(d, c.state, c))
      },
      [t, r, s, o, e]
    )
  )
}
function Cs(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = L.useContext(wt),
    { matches: i } = L.useContext(Gt),
    { pathname: o } = Sr(),
    s = JSON.stringify(Au(i, r.v7_relativeSplatPath))
  return L.useMemo(() => Ru(e, JSON.parse(s), o, n === 'path'), [e, s, o, n])
}
function o2(e, t) {
  return s2(e, t)
}
function s2(e, t, n, r) {
  Lr() || Y(!1)
  let { navigator: i } = L.useContext(wt),
    { matches: o } = L.useContext(Gt),
    s = o[o.length - 1],
    a = s ? s.params : {}
  s && s.pathname
  let l = s ? s.pathnameBase : '/'
  s && s.route
  let u = Sr(),
    c
  if (t) {
    var d
    let E = typeof t == 'string' ? wn(t) : t
    ;(l === '/' || ((d = E.pathname) != null && d.startsWith(l)) || Y(!1), (c = E))
  } else c = u
  let h = c.pathname || '/',
    y = h
  if (l !== '/') {
    let E = l.replace(/^\//, '').split('/')
    y = '/' + h.replace(/^\//, '').split('/').slice(E.length).join('/')
  }
  let v = Dy(e, { pathname: y }),
    k = f2(
      v &&
        v.map((E) =>
          Object.assign({}, E, {
            params: Object.assign({}, a, E.params),
            pathname: zt([
              l,
              i.encodeLocation ? i.encodeLocation(E.pathname).pathname : E.pathname,
            ]),
            pathnameBase:
              E.pathnameBase === '/'
                ? l
                : zt([
                    l,
                    i.encodeLocation ? i.encodeLocation(E.pathnameBase).pathname : E.pathnameBase,
                  ]),
          })
        ),
      o,
      n,
      r
    )
  return t && k
    ? L.createElement(
        Ps.Provider,
        {
          value: {
            location: wi({ pathname: '/', search: '', hash: '', state: null, key: 'default' }, c),
            navigationType: jt.Pop,
          },
        },
        k
      )
    : k
}
function l2() {
  let e = m2(),
    t = t2(e) ? e.status + ' ' + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' }
  return L.createElement(
    L.Fragment,
    null,
    L.createElement('h2', null, 'Unexpected Application Error!'),
    L.createElement('h3', { style: { fontStyle: 'italic' } }, t),
    n ? L.createElement('pre', { style: i }, n) : null,
    null
  )
}
const a2 = L.createElement(l2, null)
class u2 extends L.Component {
  constructor(t) {
    ;(super(t),
      (this.state = { location: t.location, revalidation: t.revalidation, error: t.error }))
  }
  static getDerivedStateFromError(t) {
    return { error: t }
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location || (n.revalidation !== 'idle' && t.revalidation === 'idle')
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        }
  }
  componentDidCatch(t, n) {
    console.error('React Router caught the following error during render', t, n)
  }
  render() {
    return this.state.error !== void 0
      ? L.createElement(
          Gt.Provider,
          { value: this.props.routeContext },
          L.createElement(h1.Provider, { value: this.state.error, children: this.props.component })
        )
      : this.props.children
  }
}
function c2(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = L.useContext(Ss)
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    L.createElement(Gt.Provider, { value: t }, r)
  )
}
function f2(e, t, n, r) {
  var i
  if (
    (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null)
  ) {
    var o
    if (!n) return null
    if (n.errors) e = n.matches
    else if (
      (o = r) != null &&
      o.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches
    else return null
  }
  let s = e,
    a = (i = n) == null ? void 0 : i.errors
  if (a != null) {
    let c = s.findIndex((d) => d.route.id && (a == null ? void 0 : a[d.route.id]) !== void 0)
    ;(c >= 0 || Y(!1), (s = s.slice(0, Math.min(s.length, c + 1))))
  }
  let l = !1,
    u = -1
  if (n && r && r.v7_partialHydration)
    for (let c = 0; c < s.length; c++) {
      let d = s[c]
      if (((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = c), d.route.id)) {
        let { loaderData: h, errors: y } = n,
          v = d.route.loader && h[d.route.id] === void 0 && (!y || y[d.route.id] === void 0)
        if (d.route.lazy || v) {
          ;((l = !0), u >= 0 ? (s = s.slice(0, u + 1)) : (s = [s[0]]))
          break
        }
      }
    }
  return s.reduceRight((c, d, h) => {
    let y,
      v = !1,
      k = null,
      E = null
    n &&
      ((y = a && d.route.id ? a[d.route.id] : void 0),
      (k = d.route.errorElement || a2),
      l &&
        (u < 0 && h === 0
          ? (y2('route-fallback'), (v = !0), (E = null))
          : u === h && ((v = !0), (E = d.route.hydrateFallbackElement || null))))
    let m = t.concat(s.slice(0, h + 1)),
      p = () => {
        let g
        return (
          y
            ? (g = k)
            : v
              ? (g = E)
              : d.route.Component
                ? (g = L.createElement(d.route.Component, null))
                : d.route.element
                  ? (g = d.route.element)
                  : (g = c),
          L.createElement(c2, {
            match: d,
            routeContext: { outlet: c, matches: m, isDataRoute: n != null },
            children: g,
          })
        )
      }
    return n && (d.route.ErrorBoundary || d.route.errorElement || h === 0)
      ? L.createElement(u2, {
          location: n.location,
          revalidation: n.revalidation,
          component: k,
          error: y,
          children: p(),
          routeContext: { outlet: null, matches: m, isDataRoute: !0 },
        })
      : p()
  }, null)
}
var g1 = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      e
    )
  })(g1 || {}),
  y1 = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseLoaderData = 'useLoaderData'),
      (e.UseActionData = 'useActionData'),
      (e.UseRouteError = 'useRouteError'),
      (e.UseNavigation = 'useNavigation'),
      (e.UseRouteLoaderData = 'useRouteLoaderData'),
      (e.UseMatches = 'useMatches'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      (e.UseRouteId = 'useRouteId'),
      e
    )
  })(y1 || {})
function d2(e) {
  let t = L.useContext(Ss)
  return (t || Y(!1), t)
}
function h2(e) {
  let t = L.useContext(d1)
  return (t || Y(!1), t)
}
function p2(e) {
  let t = L.useContext(Gt)
  return (t || Y(!1), t)
}
function v1(e) {
  let t = p2(),
    n = t.matches[t.matches.length - 1]
  return (n.route.id || Y(!1), n.route.id)
}
function m2() {
  var e
  let t = L.useContext(h1),
    n = h2(),
    r = v1()
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r]
}
function g2() {
  let { router: e } = d2(g1.UseNavigateStable),
    t = v1(y1.UseNavigateStable),
    n = L.useRef(!1)
  return (
    p1(() => {
      n.current = !0
    }),
    L.useCallback(
      function (i, o) {
        ;(o === void 0 && (o = {}),
          n.current &&
            (typeof i == 'number' ? e.navigate(i) : e.navigate(i, wi({ fromRouteId: t }, o))))
      },
      [e, t]
    )
  )
}
const Tf = {}
function y2(e, t, n) {
  Tf[e] || (Tf[e] = !0)
}
function v2(e, t) {
  ;(e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath)
}
function g6(e) {
  let { to: t, replace: n, state: r, relative: i } = e
  Lr() || Y(!1)
  let { future: o, static: s } = L.useContext(wt),
    { matches: a } = L.useContext(Gt),
    { pathname: l } = Sr(),
    u = m1(),
    c = Ru(t, Au(a, o.v7_relativeSplatPath), l, i === 'path'),
    d = JSON.stringify(c)
  return (
    L.useEffect(() => u(JSON.parse(d), { replace: n, state: r, relative: i }), [u, d, i, n, r]),
    null
  )
}
function k2(e) {
  Y(!1)
}
function E2(e) {
  let {
    basename: t = '/',
    children: n = null,
    location: r,
    navigationType: i = jt.Pop,
    navigator: o,
    static: s = !1,
    future: a,
  } = e
  Lr() && Y(!1)
  let l = t.replace(/^\/*/, '/'),
    u = L.useMemo(
      () => ({ basename: l, navigator: o, static: s, future: wi({ v7_relativeSplatPath: !1 }, a) }),
      [l, a, o, s]
    )
  typeof r == 'string' && (r = wn(r))
  let { pathname: c = '/', search: d = '', hash: h = '', state: y = null, key: v = 'default' } = r,
    k = L.useMemo(() => {
      let E = gr(c, l)
      return E == null
        ? null
        : { location: { pathname: E, search: d, hash: h, state: y, key: v }, navigationType: i }
    }, [l, c, d, h, y, v, i])
  return k == null
    ? null
    : L.createElement(
        wt.Provider,
        { value: u },
        L.createElement(Ps.Provider, { children: n, value: k })
      )
}
function y6(e) {
  let { children: t, location: n } = e
  return o2(ma(t), n)
}
new Promise(() => {})
function ma(e, t) {
  t === void 0 && (t = [])
  let n = []
  return (
    L.Children.forEach(e, (r, i) => {
      if (!L.isValidElement(r)) return
      let o = [...t, i]
      if (r.type === L.Fragment) {
        n.push.apply(n, ma(r.props.children, o))
        return
      }
      ;(r.type !== k2 && Y(!1), !r.props.index || !r.props.children || Y(!1))
      let s = {
        id: r.props.id || o.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      }
      ;(r.props.children && (s.children = ma(r.props.children, o)), n.push(s))
    }),
    n
  )
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Jo() {
  return (
    (Jo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    Jo.apply(this, arguments)
  )
}
function k1(e, t) {
  if (e == null) return {}
  var n = {},
    r = Object.keys(e),
    i,
    o
  for (o = 0; o < r.length; o++) ((i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]))
  return n
}
function x2(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function w2(e, t) {
  return e.button === 0 && (!t || t === '_self') && !x2(e)
}
const L2 = [
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
  S2 = [
    'aria-current',
    'caseSensitive',
    'className',
    'end',
    'style',
    'to',
    'viewTransition',
    'children',
  ],
  P2 = '6'
try {
  window.__reactRouterVersion = P2
} catch {}
const C2 = L.createContext({ isTransitioning: !1 }),
  T2 = 'startTransition',
  Mf = v0[T2]
function v6(e) {
  let { basename: t, children: n, future: r, window: i } = e,
    o = L.useRef()
  o.current == null && (o.current = jy({ window: i, v5Compat: !0 }))
  let s = o.current,
    [a, l] = L.useState({ action: s.action, location: s.location }),
    { v7_startTransition: u } = r || {},
    c = L.useCallback(
      (d) => {
        u && Mf ? Mf(() => l(d)) : l(d)
      },
      [l, u]
    )
  return (
    L.useLayoutEffect(() => s.listen(c), [s, c]),
    L.useEffect(() => v2(r), [r]),
    L.createElement(E2, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: s,
      future: r,
    })
  )
}
const M2 =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  A2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  R2 = L.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: i,
        reloadDocument: o,
        replace: s,
        state: a,
        target: l,
        to: u,
        preventScrollReset: c,
        viewTransition: d,
      } = t,
      h = k1(t, L2),
      { basename: y } = L.useContext(wt),
      v,
      k = !1
    if (typeof u == 'string' && A2.test(u) && ((v = u), M2))
      try {
        let g = new URL(window.location.href),
          x = u.startsWith('//') ? new URL(g.protocol + u) : new URL(u),
          w = gr(x.pathname, y)
        x.origin === g.origin && w != null ? (u = w + x.search + x.hash) : (k = !0)
      } catch {}
    let E = r2(u, { relative: i }),
      m = _2(u, {
        replace: s,
        state: a,
        target: l,
        preventScrollReset: c,
        relative: i,
        viewTransition: d,
      })
    function p(g) {
      ;(r && r(g), g.defaultPrevented || m(g))
    }
    return L.createElement(
      'a',
      Jo({}, h, { href: v || E, onClick: k || o ? r : p, ref: n, target: l })
    )
  }),
  k6 = L.forwardRef(function (t, n) {
    let {
        'aria-current': r = 'page',
        caseSensitive: i = !1,
        className: o = '',
        end: s = !1,
        style: a,
        to: l,
        viewTransition: u,
        children: c,
      } = t,
      d = k1(t, S2),
      h = Cs(l, { relative: d.relative }),
      y = Sr(),
      v = L.useContext(d1),
      { navigator: k, basename: E } = L.useContext(wt),
      m = v != null && F2(h) && u === !0,
      p = k.encodeLocation ? k.encodeLocation(h).pathname : h.pathname,
      g = y.pathname,
      x = v && v.navigation && v.navigation.location ? v.navigation.location.pathname : null
    ;(i || ((g = g.toLowerCase()), (x = x ? x.toLowerCase() : null), (p = p.toLowerCase())),
      x && E && (x = gr(x, E) || x))
    const w = p !== '/' && p.endsWith('/') ? p.length - 1 : p.length
    let P = g === p || (!s && g.startsWith(p) && g.charAt(w) === '/'),
      T = x != null && (x === p || (!s && x.startsWith(p) && x.charAt(p.length) === '/')),
      S = { isActive: P, isPending: T, isTransitioning: m },
      D = P ? r : void 0,
      R
    typeof o == 'function'
      ? (R = o(S))
      : (R = [o, P ? 'active' : null, T ? 'pending' : null, m ? 'transitioning' : null]
          .filter(Boolean)
          .join(' '))
    let $ = typeof a == 'function' ? a(S) : a
    return L.createElement(
      R2,
      Jo({}, d, { 'aria-current': D, className: R, ref: n, style: $, to: l, viewTransition: u }),
      typeof c == 'function' ? c(S) : c
    )
  })
var ga
;(function (e) {
  ;((e.UseScrollRestoration = 'useScrollRestoration'),
    (e.UseSubmit = 'useSubmit'),
    (e.UseSubmitFetcher = 'useSubmitFetcher'),
    (e.UseFetcher = 'useFetcher'),
    (e.useViewTransitionState = 'useViewTransitionState'))
})(ga || (ga = {}))
var Af
;(function (e) {
  ;((e.UseFetcher = 'useFetcher'),
    (e.UseFetchers = 'useFetchers'),
    (e.UseScrollRestoration = 'useScrollRestoration'))
})(Af || (Af = {}))
function j2(e) {
  let t = L.useContext(Ss)
  return (t || Y(!1), t)
}
function _2(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: o,
      relative: s,
      viewTransition: a,
    } = t === void 0 ? {} : t,
    l = m1(),
    u = Sr(),
    c = Cs(e, { relative: s })
  return L.useCallback(
    (d) => {
      if (w2(d, n)) {
        d.preventDefault()
        let h = r !== void 0 ? r : Xo(u) === Xo(c)
        l(e, { replace: h, state: i, preventScrollReset: o, relative: s, viewTransition: a })
      }
    },
    [u, l, c, r, i, n, e, o, s, a]
  )
}
function F2(e, t) {
  t === void 0 && (t = {})
  let n = L.useContext(C2)
  n == null && Y(!1)
  let { basename: r } = j2(ga.useViewTransitionState),
    i = Cs(e, { relative: t.relative })
  if (!n.isTransitioning) return !1
  let o = gr(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    s = gr(n.nextLocation.pathname, r) || n.nextLocation.pathname
  return pa(i.pathname, s) != null || pa(i.pathname, o) != null
}
const E1 = L.createContext({})
function D2(e) {
  const t = L.useRef(null)
  return (t.current === null && (t.current = e()), t.current)
}
const ju = L.createContext(null),
  x1 = L.createContext({ transformPagePoint: (e) => e, isStatic: !1, reducedMotion: 'never' })
function V2(e = !0) {
  const t = L.useContext(ju)
  if (t === null) return [!0, null]
  const { isPresent: n, onExitComplete: r, register: i } = t,
    o = L.useId()
  L.useEffect(() => {
    e && i(o)
  }, [e])
  const s = L.useCallback(() => e && r && r(o), [o, r, e])
  return !n && r ? [!1, s] : [!0]
}
const _u = typeof window < 'u',
  N2 = _u ? L.useLayoutEffect : L.useEffect,
  je = (e) => e
let w1 = je
function Fu(e) {
  let t
  return () => (t === void 0 && (t = e()), t)
}
const yr = (e, t, n) => {
    const r = t - e
    return r === 0 ? 1 : (n - e) / r
  },
  pt = (e) => e * 1e3,
  mt = (e) => e / 1e3,
  W2 = { useManualTiming: !1 }
function O2(e) {
  let t = new Set(),
    n = new Set(),
    r = !1,
    i = !1
  const o = new WeakSet()
  let s = { delta: 0, timestamp: 0, isProcessing: !1 }
  function a(u) {
    ;(o.has(u) && (l.schedule(u), e()), u(s))
  }
  const l = {
    schedule: (u, c = !1, d = !1) => {
      const y = d && r ? t : n
      return (c && o.add(u), y.has(u) || y.add(u), u)
    },
    cancel: (u) => {
      ;(n.delete(u), o.delete(u))
    },
    process: (u) => {
      if (((s = u), r)) {
        i = !0
        return
      }
      ;((r = !0),
        ([t, n] = [n, t]),
        t.forEach(a),
        t.clear(),
        (r = !1),
        i && ((i = !1), l.process(u)))
    },
  }
  return l
}
const oo = ['read', 'resolveKeyframes', 'update', 'preRender', 'render', 'postRender'],
  I2 = 40
function L1(e, t) {
  let n = !1,
    r = !0
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    o = () => (n = !0),
    s = oo.reduce((m, p) => ((m[p] = O2(o)), m), {}),
    { read: a, resolveKeyframes: l, update: u, preRender: c, render: d, postRender: h } = s,
    y = () => {
      const m = performance.now()
      ;((n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(m - i.timestamp, I2), 1)),
        (i.timestamp = m),
        (i.isProcessing = !0),
        a.process(i),
        l.process(i),
        u.process(i),
        c.process(i),
        d.process(i),
        h.process(i),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(y)))
    },
    v = () => {
      ;((n = !0), (r = !0), i.isProcessing || e(y))
    }
  return {
    schedule: oo.reduce((m, p) => {
      const g = s[p]
      return ((m[p] = (x, w = !1, P = !1) => (n || v(), g.schedule(x, w, P))), m)
    }, {}),
    cancel: (m) => {
      for (let p = 0; p < oo.length; p++) s[oo[p]].cancel(m)
    },
    state: i,
    steps: s,
  }
}
const {
    schedule: z,
    cancel: Kt,
    state: ae,
    steps: sl,
  } = L1(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : je, !0),
  S1 = L.createContext({ strict: !1 }),
  Rf = {
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
  vr = {}
for (const e in Rf) vr[e] = { isEnabled: (t) => Rf[e].some((n) => !!t[n]) }
function B2(e) {
  for (const t in e) vr[t] = { ...vr[t], ...e[t] }
}
const z2 = new Set([
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
function qo(e) {
  return (
    e.startsWith('while') ||
    (e.startsWith('drag') && e !== 'draggable') ||
    e.startsWith('layout') ||
    e.startsWith('onTap') ||
    e.startsWith('onPan') ||
    e.startsWith('onLayout') ||
    z2.has(e)
  )
}
let P1 = (e) => !qo(e)
function U2(e) {
  e && (P1 = (t) => (t.startsWith('on') ? !qo(t) : e(t)))
}
try {
  U2(require('@emotion/is-prop-valid').default)
} catch {}
function $2(e, t, n) {
  const r = {}
  for (const i in e)
    (i === 'values' && typeof e.values == 'object') ||
      ((P1(i) ||
        (n === !0 && qo(i)) ||
        (!t && !qo(i)) ||
        (e.draggable && i.startsWith('onDrag'))) &&
        (r[i] = e[i]))
  return r
}
function H2(e) {
  if (typeof Proxy > 'u') return e
  const t = new Map(),
    n = (...r) => e(...r)
  return new Proxy(n, {
    get: (r, i) => (i === 'create' ? e : (t.has(i) || t.set(i, e(i)), t.get(i))),
  })
}
const Ts = L.createContext({})
function Li(e) {
  return typeof e == 'string' || Array.isArray(e)
}
function Ms(e) {
  return e !== null && typeof e == 'object' && typeof e.start == 'function'
}
const Du = ['animate', 'whileInView', 'whileFocus', 'whileHover', 'whileTap', 'whileDrag', 'exit'],
  Vu = ['initial', ...Du]
function As(e) {
  return Ms(e.animate) || Vu.some((t) => Li(e[t]))
}
function C1(e) {
  return !!(As(e) || e.variants)
}
function K2(e, t) {
  if (As(e)) {
    const { initial: n, animate: r } = e
    return { initial: n === !1 || Li(n) ? n : void 0, animate: Li(r) ? r : void 0 }
  }
  return e.inherit !== !1 ? t : {}
}
function Z2(e) {
  const { initial: t, animate: n } = K2(e, L.useContext(Ts))
  return L.useMemo(() => ({ initial: t, animate: n }), [jf(t), jf(n)])
}
function jf(e) {
  return Array.isArray(e) ? e.join(' ') : e
}
const Y2 = Symbol.for('motionComponentSymbol')
function Jn(e) {
  return e && typeof e == 'object' && Object.prototype.hasOwnProperty.call(e, 'current')
}
function Q2(e, t, n) {
  return L.useCallback(
    (r) => {
      ;(r && e.onMount && e.onMount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == 'function' ? n(r) : Jn(n) && (n.current = r)))
    },
    [t]
  )
}
const Nu = (e) => e.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase(),
  b2 = 'framerAppearId',
  T1 = 'data-' + Nu(b2),
  { schedule: Wu } = L1(queueMicrotask, !1),
  M1 = L.createContext({})
function G2(e, t, n, r, i) {
  var o, s
  const { visualElement: a } = L.useContext(Ts),
    l = L.useContext(S1),
    u = L.useContext(ju),
    c = L.useContext(x1).reducedMotion,
    d = L.useRef(null)
  ;((r = r || l.renderer),
    !d.current &&
      r &&
      (d.current = r(e, {
        visualState: t,
        parent: a,
        props: n,
        presenceContext: u,
        blockInitialAnimation: u ? u.initial === !1 : !1,
        reducedMotionConfig: c,
      })))
  const h = d.current,
    y = L.useContext(M1)
  h && !h.projection && i && (h.type === 'html' || h.type === 'svg') && X2(d.current, n, i, y)
  const v = L.useRef(!1)
  L.useInsertionEffect(() => {
    h && v.current && h.update(n, u)
  })
  const k = n[T1],
    E = L.useRef(
      !!k &&
        !(!((o = window.MotionHandoffIsComplete) === null || o === void 0) && o.call(window, k)) &&
        ((s = window.MotionHasOptimisedAnimation) === null || s === void 0
          ? void 0
          : s.call(window, k))
    )
  return (
    N2(() => {
      h &&
        ((v.current = !0),
        (window.MotionIsMounted = !0),
        h.updateFeatures(),
        Wu.render(h.render),
        E.current && h.animationState && h.animationState.animateChanges())
    }),
    L.useEffect(() => {
      h &&
        (!E.current && h.animationState && h.animationState.animateChanges(),
        E.current &&
          (queueMicrotask(() => {
            var m
            ;(m = window.MotionHandoffMarkAsComplete) === null || m === void 0 || m.call(window, k)
          }),
          (E.current = !1)))
    }),
    h
  )
}
function X2(e, t, n, r) {
  const { layoutId: i, layout: o, drag: s, dragConstraints: a, layoutScroll: l, layoutRoot: u } = t
  ;((e.projection = new n(e.latestValues, t['data-framer-portal-id'] ? void 0 : A1(e.parent))),
    e.projection.setOptions({
      layoutId: i,
      layout: o,
      alwaysMeasureLayout: !!s || (a && Jn(a)),
      visualElement: e,
      animationType: typeof o == 'string' ? o : 'both',
      initialPromotionConfig: r,
      layoutScroll: l,
      layoutRoot: u,
    }))
}
function A1(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : A1(e.parent)
}
function J2({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: n,
  useVisualState: r,
  Component: i,
}) {
  var o, s
  e && B2(e)
  function a(u, c) {
    let d
    const h = { ...L.useContext(x1), ...u, layoutId: q2(u) },
      { isStatic: y } = h,
      v = Z2(u),
      k = r(u, y)
    if (!y && _u) {
      ev()
      const E = tv(h)
      ;((d = E.MeasureLayout), (v.visualElement = G2(i, k, h, t, E.ProjectionNode)))
    }
    return El.jsxs(Ts.Provider, {
      value: v,
      children: [
        d && v.visualElement ? El.jsx(d, { visualElement: v.visualElement, ...h }) : null,
        n(i, u, Q2(k, v.visualElement, c), k, y, v.visualElement),
      ],
    })
  }
  a.displayName = `motion.${typeof i == 'string' ? i : `create(${(s = (o = i.displayName) !== null && o !== void 0 ? o : i.name) !== null && s !== void 0 ? s : ''})`}`
  const l = L.forwardRef(a)
  return ((l[Y2] = i), l)
}
function q2({ layoutId: e }) {
  const t = L.useContext(E1).id
  return t && e !== void 0 ? t + '-' + e : e
}
function ev(e, t) {
  L.useContext(S1).strict
}
function tv(e) {
  const { drag: t, layout: n } = vr
  if (!t && !n) return {}
  const r = { ...t, ...n }
  return {
    MeasureLayout:
      (t != null && t.isEnabled(e)) || (n != null && n.isEnabled(e)) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode,
  }
}
const nv = [
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
function Ou(e) {
  return typeof e != 'string' || e.includes('-') ? !1 : !!(nv.indexOf(e) > -1 || /[A-Z]/u.test(e))
}
function _f(e) {
  const t = [{}, {}]
  return (
    e == null ||
      e.values.forEach((n, r) => {
        ;((t[0][r] = n.get()), (t[1][r] = n.getVelocity()))
      }),
    t
  )
}
function Iu(e, t, n, r) {
  if (typeof t == 'function') {
    const [i, o] = _f(r)
    t = t(n !== void 0 ? n : e.custom, i, o)
  }
  if ((typeof t == 'string' && (t = e.variants && e.variants[t]), typeof t == 'function')) {
    const [i, o] = _f(r)
    t = t(n !== void 0 ? n : e.custom, i, o)
  }
  return t
}
const ya = (e) => Array.isArray(e),
  rv = (e) => !!(e && typeof e == 'object' && e.mix && e.toValue),
  iv = (e) => (ya(e) ? e[e.length - 1] || 0 : e),
  me = (e) => !!(e && e.getVelocity)
function So(e) {
  const t = me(e) ? e.get() : e
  return rv(t) ? t.toValue() : t
}
function ov({ scrapeMotionValuesFromProps: e, createRenderState: t, onUpdate: n }, r, i, o) {
  const s = { latestValues: sv(r, i, o, e), renderState: t() }
  return (
    n && ((s.onMount = (a) => n({ props: r, current: a, ...s })), (s.onUpdate = (a) => n(a))),
    s
  )
}
const R1 = (e) => (t, n) => {
  const r = L.useContext(Ts),
    i = L.useContext(ju),
    o = () => ov(e, t, r, i)
  return n ? o() : D2(o)
}
function sv(e, t, n, r) {
  const i = {},
    o = r(e, {})
  for (const h in o) i[h] = So(o[h])
  let { initial: s, animate: a } = e
  const l = As(e),
    u = C1(e)
  t &&
    u &&
    !l &&
    e.inherit !== !1 &&
    (s === void 0 && (s = t.initial), a === void 0 && (a = t.animate))
  let c = n ? n.initial === !1 : !1
  c = c || s === !1
  const d = c ? a : s
  if (d && typeof d != 'boolean' && !Ms(d)) {
    const h = Array.isArray(d) ? d : [d]
    for (let y = 0; y < h.length; y++) {
      const v = Iu(e, h[y])
      if (v) {
        const { transitionEnd: k, transition: E, ...m } = v
        for (const p in m) {
          let g = m[p]
          if (Array.isArray(g)) {
            const x = c ? g.length - 1 : 0
            g = g[x]
          }
          g !== null && (i[p] = g)
        }
        for (const p in k) i[p] = k[p]
      }
    }
  }
  return i
}
const Pr = [
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
  Ln = new Set(Pr),
  j1 = (e) => (t) => typeof t == 'string' && t.startsWith(e),
  _1 = j1('--'),
  lv = j1('var(--'),
  Bu = (e) => (lv(e) ? av.test(e.split('/*')[0].trim()) : !1),
  av = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  F1 = (e, t) => (t && typeof e == 'number' ? t.transform(e) : e),
  Et = (e, t, n) => (n > t ? t : n < e ? e : n),
  Cr = { test: (e) => typeof e == 'number', parse: parseFloat, transform: (e) => e },
  Si = { ...Cr, transform: (e) => Et(0, 1, e) },
  so = { ...Cr, default: 1 },
  Fi = (e) => ({
    test: (t) => typeof t == 'string' && t.endsWith(e) && t.split(' ').length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  St = Fi('deg'),
  ot = Fi('%'),
  j = Fi('px'),
  uv = Fi('vh'),
  cv = Fi('vw'),
  Ff = { ...ot, parse: (e) => ot.parse(e) / 100, transform: (e) => ot.transform(e * 100) },
  fv = {
    borderWidth: j,
    borderTopWidth: j,
    borderRightWidth: j,
    borderBottomWidth: j,
    borderLeftWidth: j,
    borderRadius: j,
    radius: j,
    borderTopLeftRadius: j,
    borderTopRightRadius: j,
    borderBottomRightRadius: j,
    borderBottomLeftRadius: j,
    width: j,
    maxWidth: j,
    height: j,
    maxHeight: j,
    top: j,
    right: j,
    bottom: j,
    left: j,
    padding: j,
    paddingTop: j,
    paddingRight: j,
    paddingBottom: j,
    paddingLeft: j,
    margin: j,
    marginTop: j,
    marginRight: j,
    marginBottom: j,
    marginLeft: j,
    backgroundPositionX: j,
    backgroundPositionY: j,
  },
  dv = {
    rotate: St,
    rotateX: St,
    rotateY: St,
    rotateZ: St,
    scale: so,
    scaleX: so,
    scaleY: so,
    scaleZ: so,
    skew: St,
    skewX: St,
    skewY: St,
    distance: j,
    translateX: j,
    translateY: j,
    translateZ: j,
    x: j,
    y: j,
    z: j,
    perspective: j,
    transformPerspective: j,
    opacity: Si,
    originX: Ff,
    originY: Ff,
    originZ: j,
  },
  Df = { ...Cr, transform: Math.round },
  zu = { ...fv, ...dv, zIndex: Df, size: j, fillOpacity: Si, strokeOpacity: Si, numOctaves: Df },
  hv = { x: 'translateX', y: 'translateY', z: 'translateZ', transformPerspective: 'perspective' },
  pv = Pr.length
function mv(e, t, n) {
  let r = '',
    i = !0
  for (let o = 0; o < pv; o++) {
    const s = Pr[o],
      a = e[s]
    if (a === void 0) continue
    let l = !0
    if (
      (typeof a == 'number'
        ? (l = a === (s.startsWith('scale') ? 1 : 0))
        : (l = parseFloat(a) === 0),
      !l || n)
    ) {
      const u = F1(a, zu[s])
      if (!l) {
        i = !1
        const c = hv[s] || s
        r += `${c}(${u}) `
      }
      n && (t[s] = u)
    }
  }
  return ((r = r.trim()), n ? (r = n(t, i ? '' : r)) : i && (r = 'none'), r)
}
function Uu(e, t, n) {
  const { style: r, vars: i, transformOrigin: o } = e
  let s = !1,
    a = !1
  for (const l in t) {
    const u = t[l]
    if (Ln.has(l)) {
      s = !0
      continue
    } else if (_1(l)) {
      i[l] = u
      continue
    } else {
      const c = F1(u, zu[l])
      l.startsWith('origin') ? ((a = !0), (o[l] = c)) : (r[l] = c)
    }
  }
  if (
    (t.transform ||
      (s || n ? (r.transform = mv(t, e.transform, n)) : r.transform && (r.transform = 'none')),
    a)
  ) {
    const { originX: l = '50%', originY: u = '50%', originZ: c = 0 } = o
    r.transformOrigin = `${l} ${u} ${c}`
  }
}
const gv = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  yv = { offset: 'strokeDashoffset', array: 'strokeDasharray' }
function vv(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1
  const o = i ? gv : yv
  e[o.offset] = j.transform(-r)
  const s = j.transform(t),
    a = j.transform(n)
  e[o.array] = `${s} ${a}`
}
function Vf(e, t, n) {
  return typeof e == 'string' ? e : j.transform(t + n * e)
}
function kv(e, t, n) {
  const r = Vf(t, e.x, e.width),
    i = Vf(n, e.y, e.height)
  return `${r} ${i}`
}
function $u(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    originX: i,
    originY: o,
    pathLength: s,
    pathSpacing: a = 1,
    pathOffset: l = 0,
    ...u
  },
  c,
  d
) {
  if ((Uu(e, u, d), c)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox)
    return
  }
  ;((e.attrs = e.style), (e.style = {}))
  const { attrs: h, style: y, dimensions: v } = e
  ;(h.transform && (v && (y.transform = h.transform), delete h.transform),
    v &&
      (i !== void 0 || o !== void 0 || y.transform) &&
      (y.transformOrigin = kv(v, i !== void 0 ? i : 0.5, o !== void 0 ? o : 0.5)),
    t !== void 0 && (h.x = t),
    n !== void 0 && (h.y = n),
    r !== void 0 && (h.scale = r),
    s !== void 0 && vv(h, s, a, l, !1))
}
const Hu = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} }),
  D1 = () => ({ ...Hu(), attrs: {} }),
  Ku = (e) => typeof e == 'string' && e.toLowerCase() === 'svg'
function V1(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r))
  for (const o in n) e.style.setProperty(o, n[o])
}
const N1 = new Set([
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
function W1(e, t, n, r) {
  V1(e, t, void 0, r)
  for (const i in t.attrs) e.setAttribute(N1.has(i) ? i : Nu(i), t.attrs[i])
}
const es = {}
function Ev(e) {
  Object.assign(es, e)
}
function O1(e, { layout: t, layoutId: n }) {
  return (
    Ln.has(e) || e.startsWith('origin') || ((t || n !== void 0) && (!!es[e] || e === 'opacity'))
  )
}
function Zu(e, t, n) {
  var r
  const { style: i } = e,
    o = {}
  for (const s in i)
    (me(i[s]) ||
      (t.style && me(t.style[s])) ||
      O1(s, e) ||
      ((r = n == null ? void 0 : n.getValue(s)) === null || r === void 0 ? void 0 : r.liveStyle) !==
        void 0) &&
      (o[s] = i[s])
  return o
}
function I1(e, t, n) {
  const r = Zu(e, t, n)
  for (const i in e)
    if (me(e[i]) || me(t[i])) {
      const o = Pr.indexOf(i) !== -1 ? 'attr' + i.charAt(0).toUpperCase() + i.substring(1) : i
      r[o] = e[i]
    }
  return r
}
function xv(e, t) {
  try {
    t.dimensions = typeof e.getBBox == 'function' ? e.getBBox() : e.getBoundingClientRect()
  } catch {
    t.dimensions = { x: 0, y: 0, width: 0, height: 0 }
  }
}
const Nf = ['x', 'y', 'width', 'height', 'cx', 'cy', 'r'],
  wv = {
    useVisualState: R1({
      scrapeMotionValuesFromProps: I1,
      createRenderState: D1,
      onUpdate: ({ props: e, prevProps: t, current: n, renderState: r, latestValues: i }) => {
        if (!n) return
        let o = !!e.drag
        if (!o) {
          for (const a in i)
            if (Ln.has(a)) {
              o = !0
              break
            }
        }
        if (!o) return
        let s = !t
        if (t)
          for (let a = 0; a < Nf.length; a++) {
            const l = Nf[a]
            e[l] !== t[l] && (s = !0)
          }
        s &&
          z.read(() => {
            ;(xv(n, r),
              z.render(() => {
                ;($u(r, i, Ku(n.tagName), e.transformTemplate), W1(n, r))
              }))
          })
      },
    }),
  },
  Lv = { useVisualState: R1({ scrapeMotionValuesFromProps: Zu, createRenderState: Hu }) }
function B1(e, t, n) {
  for (const r in t) !me(t[r]) && !O1(r, n) && (e[r] = t[r])
}
function Sv({ transformTemplate: e }, t) {
  return L.useMemo(() => {
    const n = Hu()
    return (Uu(n, t, e), Object.assign({}, n.vars, n.style))
  }, [t])
}
function Pv(e, t) {
  const n = e.style || {},
    r = {}
  return (B1(r, n, e), Object.assign(r, Sv(e, t)), r)
}
function Cv(e, t) {
  const n = {},
    r = Pv(e, t)
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((n.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = 'none'),
      (r.touchAction = e.drag === !0 ? 'none' : `pan-${e.drag === 'x' ? 'y' : 'x'}`)),
    e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0),
    (n.style = r),
    n
  )
}
function Tv(e, t, n, r) {
  const i = L.useMemo(() => {
    const o = D1()
    return ($u(o, t, Ku(r), e.transformTemplate), { ...o.attrs, style: { ...o.style } })
  }, [t])
  if (e.style) {
    const o = {}
    ;(B1(o, e.style, e), (i.style = { ...o, ...i.style }))
  }
  return i
}
function Mv(e = !1) {
  return (n, r, i, { latestValues: o }, s) => {
    const l = (Ou(n) ? Tv : Cv)(r, o, s, n),
      u = $2(r, typeof n == 'string', e),
      c = n !== L.Fragment ? { ...u, ...l, ref: i } : {},
      { children: d } = r,
      h = L.useMemo(() => (me(d) ? d.get() : d), [d])
    return L.createElement(n, { ...c, children: h })
  }
}
function Av(e, t) {
  return function (r, { forwardMotionProps: i } = { forwardMotionProps: !1 }) {
    const s = {
      ...(Ou(r) ? wv : Lv),
      preloadedFeatures: e,
      useRender: Mv(i),
      createVisualElement: t,
      Component: r,
    }
    return J2(s)
  }
}
function z1(e, t) {
  if (!Array.isArray(t)) return !1
  const n = t.length
  if (n !== e.length) return !1
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1
  return !0
}
function Rs(e, t, n) {
  const r = e.getProps()
  return Iu(r, t, n !== void 0 ? n : r.custom, e)
}
const Rv = Fu(() => window.ScrollTimeline !== void 0)
class jv {
  constructor(t) {
    ;((this.stop = () => this.runAll('stop')), (this.animations = t.filter(Boolean)))
  }
  get finished() {
    return Promise.all(this.animations.map((t) => ('finished' in t ? t.finished : t)))
  }
  getAll(t) {
    return this.animations[0][t]
  }
  setAll(t, n) {
    for (let r = 0; r < this.animations.length; r++) this.animations[r][t] = n
  }
  attachTimeline(t, n) {
    const r = this.animations.map((i) => {
      if (Rv() && i.attachTimeline) return i.attachTimeline(t)
      if (typeof n == 'function') return n(i)
    })
    return () => {
      r.forEach((i, o) => {
        ;(i && i(), this.animations[o].stop())
      })
    }
  }
  get time() {
    return this.getAll('time')
  }
  set time(t) {
    this.setAll('time', t)
  }
  get speed() {
    return this.getAll('speed')
  }
  set speed(t) {
    this.setAll('speed', t)
  }
  get startTime() {
    return this.getAll('startTime')
  }
  get duration() {
    let t = 0
    for (let n = 0; n < this.animations.length; n++) t = Math.max(t, this.animations[n].duration)
    return t
  }
  runAll(t) {
    this.animations.forEach((n) => n[t]())
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
class _v extends jv {
  then(t, n) {
    return Promise.all(this.animations).then(t).catch(n)
  }
}
function Yu(e, t) {
  return e ? e[t] || e.default || e : void 0
}
const va = 2e4
function U1(e) {
  let t = 0
  const n = 50
  let r = e.next(t)
  for (; !r.done && t < va; ) ((t += n), (r = e.next(t)))
  return t >= va ? 1 / 0 : t
}
function Qu(e) {
  return typeof e == 'function'
}
function Wf(e, t) {
  ;((e.timeline = t), (e.onfinish = null))
}
const bu = (e) => Array.isArray(e) && typeof e[0] == 'number',
  Fv = { linearEasing: void 0 }
function Dv(e, t) {
  const n = Fu(e)
  return () => {
    var r
    return (r = Fv[t]) !== null && r !== void 0 ? r : n()
  }
}
const ts = Dv(() => {
    try {
      document.createElement('div').animate({ opacity: 0 }, { easing: 'linear(0, 1)' })
    } catch {
      return !1
    }
    return !0
  }, 'linearEasing'),
  $1 = (e, t, n = 10) => {
    let r = ''
    const i = Math.max(Math.round(t / n), 2)
    for (let o = 0; o < i; o++) r += e(yr(0, i - 1, o)) + ', '
    return `linear(${r.substring(0, r.length - 2)})`
  }
function H1(e) {
  return !!(
    (typeof e == 'function' && ts()) ||
    !e ||
    (typeof e == 'string' && (e in ka || ts())) ||
    bu(e) ||
    (Array.isArray(e) && e.every(H1))
  )
}
const Br = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  ka = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: Br([0, 0.65, 0.55, 1]),
    circOut: Br([0.55, 0, 1, 0.45]),
    backIn: Br([0.31, 0.01, 0.66, -0.59]),
    backOut: Br([0.33, 1.53, 0.69, 0.99]),
  }
function K1(e, t) {
  if (e)
    return typeof e == 'function' && ts()
      ? $1(e, t)
      : bu(e)
        ? Br(e)
        : Array.isArray(e)
          ? e.map((n) => K1(n, t) || ka.easeOut)
          : ka[e]
}
const Ze = { x: !1, y: !1 }
function Z1() {
  return Ze.x || Ze.y
}
function Vv(e, t, n) {
  var r
  if (e instanceof Element) return [e]
  if (typeof e == 'string') {
    let i = document
    const o = (r = void 0) !== null && r !== void 0 ? r : i.querySelectorAll(e)
    return o ? Array.from(o) : []
  }
  return Array.from(e)
}
function Y1(e, t) {
  const n = Vv(e),
    r = new AbortController(),
    i = { passive: !0, ...t, signal: r.signal }
  return [n, i, () => r.abort()]
}
function Of(e) {
  return (t) => {
    t.pointerType === 'touch' || Z1() || e(t)
  }
}
function Nv(e, t, n = {}) {
  const [r, i, o] = Y1(e, n),
    s = Of((a) => {
      const { target: l } = a,
        u = t(a)
      if (typeof u != 'function' || !l) return
      const c = Of((d) => {
        ;(u(d), l.removeEventListener('pointerleave', c))
      })
      l.addEventListener('pointerleave', c, i)
    })
  return (
    r.forEach((a) => {
      a.addEventListener('pointerenter', s, i)
    }),
    o
  )
}
const Q1 = (e, t) => (t ? (e === t ? !0 : Q1(e, t.parentElement)) : !1),
  Gu = (e) =>
    e.pointerType === 'mouse' ? typeof e.button != 'number' || e.button <= 0 : e.isPrimary !== !1,
  Wv = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'])
function Ov(e) {
  return Wv.has(e.tagName) || e.tabIndex !== -1
}
const zr = new WeakSet()
function If(e) {
  return (t) => {
    t.key === 'Enter' && e(t)
  }
}
function ll(e, t) {
  e.dispatchEvent(new PointerEvent('pointer' + t, { isPrimary: !0, bubbles: !0 }))
}
const Iv = (e, t) => {
  const n = e.currentTarget
  if (!n) return
  const r = If(() => {
    if (zr.has(n)) return
    ll(n, 'down')
    const i = If(() => {
        ll(n, 'up')
      }),
      o = () => ll(n, 'cancel')
    ;(n.addEventListener('keyup', i, t), n.addEventListener('blur', o, t))
  })
  ;(n.addEventListener('keydown', r, t),
    n.addEventListener('blur', () => n.removeEventListener('keydown', r), t))
}
function Bf(e) {
  return Gu(e) && !Z1()
}
function Bv(e, t, n = {}) {
  const [r, i, o] = Y1(e, n),
    s = (a) => {
      const l = a.currentTarget
      if (!Bf(a) || zr.has(l)) return
      zr.add(l)
      const u = t(a),
        c = (y, v) => {
          ;(window.removeEventListener('pointerup', d),
            window.removeEventListener('pointercancel', h),
            !(!Bf(y) || !zr.has(l)) &&
              (zr.delete(l), typeof u == 'function' && u(y, { success: v })))
        },
        d = (y) => {
          c(y, n.useGlobalTarget || Q1(l, y.target))
        },
        h = (y) => {
          c(y, !1)
        }
      ;(window.addEventListener('pointerup', d, i), window.addEventListener('pointercancel', h, i))
    }
  return (
    r.forEach((a) => {
      ;(!Ov(a) && a.getAttribute('tabindex') === null && (a.tabIndex = 0),
        (n.useGlobalTarget ? window : a).addEventListener('pointerdown', s, i),
        a.addEventListener('focus', (u) => Iv(u, i), i))
    }),
    o
  )
}
function zv(e) {
  return e === 'x' || e === 'y'
    ? Ze[e]
      ? null
      : ((Ze[e] = !0),
        () => {
          Ze[e] = !1
        })
    : Ze.x || Ze.y
      ? null
      : ((Ze.x = Ze.y = !0),
        () => {
          Ze.x = Ze.y = !1
        })
}
const b1 = new Set(['width', 'height', 'top', 'left', 'right', 'bottom', ...Pr])
let Po
function Uv() {
  Po = void 0
}
const st = {
  now: () => (
    Po === void 0 &&
      st.set(ae.isProcessing || W2.useManualTiming ? ae.timestamp : performance.now()),
    Po
  ),
  set: (e) => {
    ;((Po = e), queueMicrotask(Uv))
  },
}
function Xu(e, t) {
  e.indexOf(t) === -1 && e.push(t)
}
function Ju(e, t) {
  const n = e.indexOf(t)
  n > -1 && e.splice(n, 1)
}
class qu {
  constructor() {
    this.subscriptions = []
  }
  add(t) {
    return (Xu(this.subscriptions, t), () => Ju(this.subscriptions, t))
  }
  notify(t, n, r) {
    const i = this.subscriptions.length
    if (i)
      if (i === 1) this.subscriptions[0](t, n, r)
      else
        for (let o = 0; o < i; o++) {
          const s = this.subscriptions[o]
          s && s(t, n, r)
        }
  }
  getSize() {
    return this.subscriptions.length
  }
  clear() {
    this.subscriptions.length = 0
  }
}
function G1(e, t) {
  return t ? e * (1e3 / t) : 0
}
const zf = 30,
  $v = (e) => !isNaN(parseFloat(e))
class Hv {
  constructor(t, n = {}) {
    ;((this.version = '11.18.2'),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r, i = !0) => {
        const o = st.now()
        ;(this.updatedAt !== o && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          i && this.events.renderRequest && this.events.renderRequest.notify(this.current))
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = n.owner))
  }
  setCurrent(t) {
    ;((this.current = t),
      (this.updatedAt = st.now()),
      this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = $v(this.current)))
  }
  setPrevFrameValue(t = this.current) {
    ;((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt))
  }
  onChange(t) {
    return this.on('change', t)
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new qu())
    const r = this.events[t].add(n)
    return t === 'change'
      ? () => {
          ;(r(),
            z.read(() => {
              this.events.change.getSize() || this.stop()
            }))
        }
      : r
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear()
  }
  attach(t, n) {
    ;((this.passiveEffect = t), (this.stopPassiveEffect = n))
  }
  set(t, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(t, n)
      : this.passiveEffect(t, this.updateAndNotify)
  }
  setWithVelocity(t, n, r) {
    ;(this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = t),
      (this.prevUpdatedAt = this.updatedAt - r))
  }
  jump(t, n = !0) {
    ;(this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect())
  }
  get() {
    return this.current
  }
  getPrevious() {
    return this.prev
  }
  getVelocity() {
    const t = st.now()
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > zf)
      return 0
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, zf)
    return G1(parseFloat(this.current) - parseFloat(this.prevFrameValue), n)
  }
  start(t) {
    return (
      this.stop(),
      new Promise((n) => {
        ;((this.hasAnimated = !0),
          (this.animation = t(n)),
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
function Pi(e, t) {
  return new Hv(e, t)
}
function Kv(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Pi(n))
}
function Zv(e, t) {
  const n = Rs(e, t)
  let { transitionEnd: r = {}, transition: i = {}, ...o } = n || {}
  o = { ...o, ...r }
  for (const s in o) {
    const a = iv(o[s])
    Kv(e, s, a)
  }
}
function Yv(e) {
  return !!(me(e) && e.add)
}
function Ea(e, t) {
  const n = e.getValue('willChange')
  if (Yv(n)) return n.add(t)
}
function X1(e) {
  return e.props[T1]
}
const J1 = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  Qv = 1e-7,
  bv = 12
function Gv(e, t, n, r, i) {
  let o,
    s,
    a = 0
  do ((s = t + (n - t) / 2), (o = J1(s, r, i) - e), o > 0 ? (n = s) : (t = s))
  while (Math.abs(o) > Qv && ++a < bv)
  return s
}
function Di(e, t, n, r) {
  if (e === t && n === r) return je
  const i = (o) => Gv(o, 0, 1, e, n)
  return (o) => (o === 0 || o === 1 ? o : J1(i(o), t, r))
}
const q1 = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  em = (e) => (t) => 1 - e(1 - t),
  tm = Di(0.33, 1.53, 0.69, 0.99),
  ec = em(tm),
  nm = q1(ec),
  rm = (e) => ((e *= 2) < 1 ? 0.5 * ec(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1)))),
  tc = (e) => 1 - Math.sin(Math.acos(e)),
  im = em(tc),
  om = q1(tc),
  sm = (e) => /^0[^.\s]+$/u.test(e)
function Xv(e) {
  return typeof e == 'number' ? e === 0 : e !== null ? e === 'none' || e === '0' || sm(e) : !0
}
const ei = (e) => Math.round(e * 1e5) / 1e5,
  nc = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu
function Jv(e) {
  return e == null
}
const qv =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  rc = (e, t) => (n) =>
    !!(
      (typeof n == 'string' && qv.test(n) && n.startsWith(e)) ||
      (t && !Jv(n) && Object.prototype.hasOwnProperty.call(n, t))
    ),
  lm = (e, t, n) => (r) => {
    if (typeof r != 'string') return r
    const [i, o, s, a] = r.match(nc)
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(o),
      [n]: parseFloat(s),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    }
  },
  e8 = (e) => Et(0, 255, e),
  al = { ...Cr, transform: (e) => Math.round(e8(e)) },
  cn = {
    test: rc('rgb', 'red'),
    parse: lm('red', 'green', 'blue'),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      'rgba(' +
      al.transform(e) +
      ', ' +
      al.transform(t) +
      ', ' +
      al.transform(n) +
      ', ' +
      ei(Si.transform(r)) +
      ')',
  }
function t8(e) {
  let t = '',
    n = '',
    r = '',
    i = ''
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  )
}
const xa = { test: rc('#'), parse: t8, transform: cn.transform },
  qn = {
    test: rc('hsl', 'hue'),
    parse: lm('hue', 'saturation', 'lightness'),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      'hsla(' +
      Math.round(e) +
      ', ' +
      ot.transform(ei(t)) +
      ', ' +
      ot.transform(ei(n)) +
      ', ' +
      ei(Si.transform(r)) +
      ')',
  },
  he = {
    test: (e) => cn.test(e) || xa.test(e) || qn.test(e),
    parse: (e) => (cn.test(e) ? cn.parse(e) : qn.test(e) ? qn.parse(e) : xa.parse(e)),
    transform: (e) =>
      typeof e == 'string' ? e : e.hasOwnProperty('red') ? cn.transform(e) : qn.transform(e),
  },
  n8 =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu
function r8(e) {
  var t, n
  return (
    isNaN(e) &&
    typeof e == 'string' &&
    (((t = e.match(nc)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((n = e.match(n8)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  )
}
const am = 'number',
  um = 'color',
  i8 = 'var',
  o8 = 'var(',
  Uf = '${}',
  s8 =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu
function Ci(e) {
  const t = e.toString(),
    n = [],
    r = { color: [], number: [], var: [] },
    i = []
  let o = 0
  const a = t
    .replace(
      s8,
      (l) => (
        he.test(l)
          ? (r.color.push(o), i.push(um), n.push(he.parse(l)))
          : l.startsWith(o8)
            ? (r.var.push(o), i.push(i8), n.push(l))
            : (r.number.push(o), i.push(am), n.push(parseFloat(l))),
        ++o,
        Uf
      )
    )
    .split(Uf)
  return { values: n, split: a, indexes: r, types: i }
}
function cm(e) {
  return Ci(e).values
}
function fm(e) {
  const { split: t, types: n } = Ci(e),
    r = t.length
  return (i) => {
    let o = ''
    for (let s = 0; s < r; s++)
      if (((o += t[s]), i[s] !== void 0)) {
        const a = n[s]
        a === am ? (o += ei(i[s])) : a === um ? (o += he.transform(i[s])) : (o += i[s])
      }
    return o
  }
}
const l8 = (e) => (typeof e == 'number' ? 0 : e)
function a8(e) {
  const t = cm(e)
  return fm(e)(t.map(l8))
}
const Zt = { test: r8, parse: cm, createTransformer: fm, getAnimatableNone: a8 },
  u8 = new Set(['brightness', 'contrast', 'saturate', 'opacity'])
function c8(e) {
  const [t, n] = e.slice(0, -1).split('(')
  if (t === 'drop-shadow') return e
  const [r] = n.match(nc) || []
  if (!r) return e
  const i = n.replace(r, '')
  let o = u8.has(t) ? 1 : 0
  return (r !== n && (o *= 100), t + '(' + o + i + ')')
}
const f8 = /\b([a-z-]*)\(.*?\)/gu,
  wa = {
    ...Zt,
    getAnimatableNone: (e) => {
      const t = e.match(f8)
      return t ? t.map(c8).join(' ') : e
    },
  },
  d8 = {
    ...zu,
    color: he,
    backgroundColor: he,
    outlineColor: he,
    fill: he,
    stroke: he,
    borderColor: he,
    borderTopColor: he,
    borderRightColor: he,
    borderBottomColor: he,
    borderLeftColor: he,
    filter: wa,
    WebkitFilter: wa,
  },
  ic = (e) => d8[e]
function dm(e, t) {
  let n = ic(e)
  return (n !== wa && (n = Zt), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0)
}
const h8 = new Set(['auto', 'none', '0'])
function p8(e, t, n) {
  let r = 0,
    i
  for (; r < e.length && !i; ) {
    const o = e[r]
    ;(typeof o == 'string' && !h8.has(o) && Ci(o).values.length && (i = e[r]), r++)
  }
  if (i && n) for (const o of t) e[o] = dm(n, i)
}
const $f = (e) => e === Cr || e === j,
  Hf = (e, t) => parseFloat(e.split(', ')[t]),
  Kf =
    (e, t) =>
    (n, { transform: r }) => {
      if (r === 'none' || !r) return 0
      const i = r.match(/^matrix3d\((.+)\)$/u)
      if (i) return Hf(i[1], t)
      {
        const o = r.match(/^matrix\((.+)\)$/u)
        return o ? Hf(o[1], e) : 0
      }
    },
  m8 = new Set(['x', 'y', 'z']),
  g8 = Pr.filter((e) => !m8.has(e))
function y8(e) {
  const t = []
  return (
    g8.forEach((n) => {
      const r = e.getValue(n)
      r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith('scale') ? 1 : 0))
    }),
    t
  )
}
const kr = {
  width: ({ x: e }, { paddingLeft: t = '0', paddingRight: n = '0' }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = '0', paddingBottom: n = '0' }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: Kf(4, 13),
  y: Kf(5, 14),
}
kr.translateX = kr.x
kr.translateY = kr.y
const hn = new Set()
let La = !1,
  Sa = !1
function hm() {
  if (Sa) {
    const e = Array.from(hn).filter((r) => r.needsMeasurement),
      t = new Set(e.map((r) => r.element)),
      n = new Map()
    ;(t.forEach((r) => {
      const i = y8(r)
      i.length && (n.set(r, i), r.render())
    }),
      e.forEach((r) => r.measureInitialState()),
      t.forEach((r) => {
        r.render()
        const i = n.get(r)
        i &&
          i.forEach(([o, s]) => {
            var a
            ;(a = r.getValue(o)) === null || a === void 0 || a.set(s)
          })
      }),
      e.forEach((r) => r.measureEndState()),
      e.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY)
      }))
  }
  ;((Sa = !1), (La = !1), hn.forEach((e) => e.complete()), hn.clear())
}
function pm() {
  hn.forEach((e) => {
    ;(e.readKeyframes(), e.needsMeasurement && (Sa = !0))
  })
}
function v8() {
  ;(pm(), hm())
}
class oc {
  constructor(t, n, r, i, o, s = !1) {
    ;((this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = n),
      (this.name = r),
      (this.motionValue = i),
      (this.element = o),
      (this.isAsync = s))
  }
  scheduleResolve() {
    ;((this.isScheduled = !0),
      this.isAsync
        ? (hn.add(this), La || ((La = !0), z.read(pm), z.resolveKeyframes(hm)))
        : (this.readKeyframes(), this.complete()))
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: r, motionValue: i } = this
    for (let o = 0; o < t.length; o++)
      if (t[o] === null)
        if (o === 0) {
          const s = i == null ? void 0 : i.get(),
            a = t[t.length - 1]
          if (s !== void 0) t[0] = s
          else if (r && n) {
            const l = r.readValue(n, a)
            l != null && (t[0] = l)
          }
          ;(t[0] === void 0 && (t[0] = a), i && s === void 0 && i.set(t[0]))
        } else t[o] = t[o - 1]
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    ;((this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      hn.delete(this))
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), hn.delete(this))
  }
  resume() {
    this.isComplete || this.scheduleResolve()
  }
}
const mm = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  k8 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
function E8(e) {
  const t = k8.exec(e)
  if (!t) return [,]
  const [, n, r, i] = t
  return [`--${n ?? r}`, i]
}
function gm(e, t, n = 1) {
  const [r, i] = E8(e)
  if (!r) return
  const o = window.getComputedStyle(t).getPropertyValue(r)
  if (o) {
    const s = o.trim()
    return mm(s) ? parseFloat(s) : s
  }
  return Bu(i) ? gm(i, t, n + 1) : i
}
const ym = (e) => (t) => t.test(e),
  x8 = { test: (e) => e === 'auto', parse: (e) => e },
  vm = [Cr, j, ot, St, cv, uv, x8],
  Zf = (e) => vm.find(ym(e))
class km extends oc {
  constructor(t, n, r, i, o) {
    super(t, n, r, i, o, !0)
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this
    if (!n || !n.current) return
    super.readKeyframes()
    for (let l = 0; l < t.length; l++) {
      let u = t[l]
      if (typeof u == 'string' && ((u = u.trim()), Bu(u))) {
        const c = gm(u, n.current)
        ;(c !== void 0 && (t[l] = c), l === t.length - 1 && (this.finalKeyframe = u))
      }
    }
    if ((this.resolveNoneKeyframes(), !b1.has(r) || t.length !== 2)) return
    const [i, o] = t,
      s = Zf(i),
      a = Zf(o)
    if (s !== a)
      if ($f(s) && $f(a))
        for (let l = 0; l < t.length; l++) {
          const u = t[l]
          typeof u == 'string' && (t[l] = parseFloat(u))
        }
      else this.needsMeasurement = !0
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this,
      r = []
    for (let i = 0; i < t.length; i++) Xv(t[i]) && r.push(i)
    r.length && p8(t, r, n)
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this
    if (!t || !t.current) return
    ;(r === 'height' && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = kr[r](t.measureViewportBox(), window.getComputedStyle(t.current))),
      (n[0] = this.measuredOrigin))
    const i = n[n.length - 1]
    i !== void 0 && t.getValue(r, i).jump(i, !1)
  }
  measureEndState() {
    var t
    const { element: n, name: r, unresolvedKeyframes: i } = this
    if (!n || !n.current) return
    const o = n.getValue(r)
    o && o.jump(this.measuredOrigin, !1)
    const s = i.length - 1,
      a = i[s]
    ;((i[s] = kr[r](n.measureViewportBox(), window.getComputedStyle(n.current))),
      a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a),
      !((t = this.removedTransforms) === null || t === void 0) &&
        t.length &&
        this.removedTransforms.forEach(([l, u]) => {
          n.getValue(l).set(u)
        }),
      this.resolveNoneKeyframes())
  }
}
const Yf = (e, t) =>
  t === 'zIndex'
    ? !1
    : !!(
        typeof e == 'number' ||
        Array.isArray(e) ||
        (typeof e == 'string' && (Zt.test(e) || e === '0') && !e.startsWith('url('))
      )
function w8(e) {
  const t = e[0]
  if (e.length === 1) return !0
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0
}
function L8(e, t, n, r) {
  const i = e[0]
  if (i === null) return !1
  if (t === 'display' || t === 'visibility') return !0
  const o = e[e.length - 1],
    s = Yf(i, t),
    a = Yf(o, t)
  return !s || !a ? !1 : w8(e) || ((n === 'spring' || Qu(n)) && r)
}
const S8 = (e) => e !== null
function js(e, { repeat: t, repeatType: n = 'loop' }, r) {
  const i = e.filter(S8),
    o = t && n !== 'loop' && t % 2 === 1 ? 0 : i.length - 1
  return !o || r === void 0 ? i[o] : r
}
const P8 = 40
class Em {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: r = 'keyframes',
    repeat: i = 0,
    repeatDelay: o = 0,
    repeatType: s = 'loop',
    ...a
  }) {
    ;((this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = st.now()),
      (this.options = {
        autoplay: t,
        delay: n,
        type: r,
        repeat: i,
        repeatDelay: o,
        repeatType: s,
        ...a,
      }),
      this.updateFinishedPromise())
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > P8
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt
  }
  get resolved() {
    return (!this._resolved && !this.hasAttemptedResolve && v8(), this._resolved)
  }
  onKeyframesResolved(t, n) {
    ;((this.resolvedAt = st.now()), (this.hasAttemptedResolve = !0))
    const {
      name: r,
      type: i,
      velocity: o,
      delay: s,
      onComplete: a,
      onUpdate: l,
      isGenerator: u,
    } = this.options
    if (!u && !L8(t, r, i, o))
      if (s) this.options.duration = 0
      else {
        ;(l && l(js(t, this.options, n)), a && a(), this.resolveFinishedPromise())
        return
      }
    const c = this.initPlayback(t, n)
    c !== !1 && ((this._resolved = { keyframes: t, finalKeyframe: n, ...c }), this.onPostResolved())
  }
  onPostResolved() {}
  then(t, n) {
    return this.currentFinishedPromise.then(t, n)
  }
  flatten() {
    ;((this.options.type = 'keyframes'), (this.options.ease = 'linear'))
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((t) => {
      this.resolveFinishedPromise = t
    })
  }
}
const K = (e, t, n) => e + (t - e) * n
function ul(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
  )
}
function C8({ hue: e, saturation: t, lightness: n, alpha: r }) {
  ;((e /= 360), (t /= 100), (n /= 100))
  let i = 0,
    o = 0,
    s = 0
  if (!t) i = o = s = n
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      l = 2 * n - a
    ;((i = ul(l, a, e + 1 / 3)), (o = ul(l, a, e)), (s = ul(l, a, e - 1 / 3)))
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(s * 255),
    alpha: r,
  }
}
function ns(e, t) {
  return (n) => (n > 0 ? t : e)
}
const cl = (e, t, n) => {
    const r = e * e,
      i = n * (t * t - r) + r
    return i < 0 ? 0 : Math.sqrt(i)
  },
  T8 = [xa, cn, qn],
  M8 = (e) => T8.find((t) => t.test(e))
function Qf(e) {
  const t = M8(e)
  if (!t) return !1
  let n = t.parse(e)
  return (t === qn && (n = C8(n)), n)
}
const bf = (e, t) => {
    const n = Qf(e),
      r = Qf(t)
    if (!n || !r) return ns(e, t)
    const i = { ...n }
    return (o) => (
      (i.red = cl(n.red, r.red, o)),
      (i.green = cl(n.green, r.green, o)),
      (i.blue = cl(n.blue, r.blue, o)),
      (i.alpha = K(n.alpha, r.alpha, o)),
      cn.transform(i)
    )
  },
  A8 = (e, t) => (n) => t(e(n)),
  Vi = (...e) => e.reduce(A8),
  Pa = new Set(['none', 'hidden'])
function R8(e, t) {
  return Pa.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e)
}
function j8(e, t) {
  return (n) => K(e, t, n)
}
function sc(e) {
  return typeof e == 'number'
    ? j8
    : typeof e == 'string'
      ? Bu(e)
        ? ns
        : he.test(e)
          ? bf
          : D8
      : Array.isArray(e)
        ? xm
        : typeof e == 'object'
          ? he.test(e)
            ? bf
            : _8
          : ns
}
function xm(e, t) {
  const n = [...e],
    r = n.length,
    i = e.map((o, s) => sc(o)(o, t[s]))
  return (o) => {
    for (let s = 0; s < r; s++) n[s] = i[s](o)
    return n
  }
}
function _8(e, t) {
  const n = { ...e, ...t },
    r = {}
  for (const i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = sc(e[i])(e[i], t[i]))
  return (i) => {
    for (const o in r) n[o] = r[o](i)
    return n
  }
}
function F8(e, t) {
  var n
  const r = [],
    i = { color: 0, var: 0, number: 0 }
  for (let o = 0; o < t.values.length; o++) {
    const s = t.types[o],
      a = e.indexes[s][i[s]],
      l = (n = e.values[a]) !== null && n !== void 0 ? n : 0
    ;((r[o] = l), i[s]++)
  }
  return r
}
const D8 = (e, t) => {
  const n = Zt.createTransformer(t),
    r = Ci(e),
    i = Ci(t)
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? (Pa.has(e) && !i.values.length) || (Pa.has(t) && !r.values.length)
      ? R8(e, t)
      : Vi(xm(F8(r, i), i.values), n)
    : ns(e, t)
}
function wm(e, t, n) {
  return typeof e == 'number' && typeof t == 'number' && typeof n == 'number'
    ? K(e, t, n)
    : sc(e)(e, t)
}
const V8 = 5
function Lm(e, t, n) {
  const r = Math.max(t - V8, 0)
  return G1(n - e(r), t - r)
}
const b = {
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
  fl = 0.001
function N8({
  duration: e = b.duration,
  bounce: t = b.bounce,
  velocity: n = b.velocity,
  mass: r = b.mass,
}) {
  let i,
    o,
    s = 1 - t
  ;((s = Et(b.minDamping, b.maxDamping, s)),
    (e = Et(b.minDuration, b.maxDuration, mt(e))),
    s < 1
      ? ((i = (u) => {
          const c = u * s,
            d = c * e,
            h = c - n,
            y = Ca(u, s),
            v = Math.exp(-d)
          return fl - (h / y) * v
        }),
        (o = (u) => {
          const d = u * s * e,
            h = d * n + n,
            y = Math.pow(s, 2) * Math.pow(u, 2) * e,
            v = Math.exp(-d),
            k = Ca(Math.pow(u, 2), s)
          return ((-i(u) + fl > 0 ? -1 : 1) * ((h - y) * v)) / k
        }))
      : ((i = (u) => {
          const c = Math.exp(-u * e),
            d = (u - n) * e + 1
          return -fl + c * d
        }),
        (o = (u) => {
          const c = Math.exp(-u * e),
            d = (n - u) * (e * e)
          return c * d
        })))
  const a = 5 / e,
    l = O8(i, o, a)
  if (((e = pt(e)), isNaN(l))) return { stiffness: b.stiffness, damping: b.damping, duration: e }
  {
    const u = Math.pow(l, 2) * r
    return { stiffness: u, damping: s * 2 * Math.sqrt(r * u), duration: e }
  }
}
const W8 = 12
function O8(e, t, n) {
  let r = n
  for (let i = 1; i < W8; i++) r = r - e(r) / t(r)
  return r
}
function Ca(e, t) {
  return e * Math.sqrt(1 - t * t)
}
const I8 = ['duration', 'bounce'],
  B8 = ['stiffness', 'damping', 'mass']
function Gf(e, t) {
  return t.some((n) => e[n] !== void 0)
}
function z8(e) {
  let t = {
    velocity: b.velocity,
    stiffness: b.stiffness,
    damping: b.damping,
    mass: b.mass,
    isResolvedFromDuration: !1,
    ...e,
  }
  if (!Gf(e, B8) && Gf(e, I8))
    if (e.visualDuration) {
      const n = e.visualDuration,
        r = (2 * Math.PI) / (n * 1.2),
        i = r * r,
        o = 2 * Et(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i)
      t = { ...t, mass: b.mass, stiffness: i, damping: o }
    } else {
      const n = N8(e)
      ;((t = { ...t, ...n, mass: b.mass }), (t.isResolvedFromDuration = !0))
    }
  return t
}
function Sm(e = b.visualDuration, t = b.bounce) {
  const n = typeof e != 'object' ? { visualDuration: e, keyframes: [0, 1], bounce: t } : e
  let { restSpeed: r, restDelta: i } = n
  const o = n.keyframes[0],
    s = n.keyframes[n.keyframes.length - 1],
    a = { done: !1, value: o },
    {
      stiffness: l,
      damping: u,
      mass: c,
      duration: d,
      velocity: h,
      isResolvedFromDuration: y,
    } = z8({ ...n, velocity: -mt(n.velocity || 0) }),
    v = h || 0,
    k = u / (2 * Math.sqrt(l * c)),
    E = s - o,
    m = mt(Math.sqrt(l / c)),
    p = Math.abs(E) < 5
  ;(r || (r = p ? b.restSpeed.granular : b.restSpeed.default),
    i || (i = p ? b.restDelta.granular : b.restDelta.default))
  let g
  if (k < 1) {
    const w = Ca(m, k)
    g = (P) => {
      const T = Math.exp(-k * m * P)
      return s - T * (((v + k * m * E) / w) * Math.sin(w * P) + E * Math.cos(w * P))
    }
  } else if (k === 1) g = (w) => s - Math.exp(-m * w) * (E + (v + m * E) * w)
  else {
    const w = m * Math.sqrt(k * k - 1)
    g = (P) => {
      const T = Math.exp(-k * m * P),
        S = Math.min(w * P, 300)
      return s - (T * ((v + k * m * E) * Math.sinh(S) + w * E * Math.cosh(S))) / w
    }
  }
  const x = {
    calculatedDuration: (y && d) || null,
    next: (w) => {
      const P = g(w)
      if (y) a.done = w >= d
      else {
        let T = 0
        k < 1 && (T = w === 0 ? pt(v) : Lm(g, w, P))
        const S = Math.abs(T) <= r,
          D = Math.abs(s - P) <= i
        a.done = S && D
      }
      return ((a.value = a.done ? s : P), a)
    },
    toString: () => {
      const w = Math.min(U1(x), va),
        P = $1((T) => x.next(w * T).value, w, 30)
      return w + 'ms ' + P
    },
  }
  return x
}
function Xf({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: o = 500,
  modifyTarget: s,
  min: a,
  max: l,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const d = e[0],
    h = { done: !1, value: d },
    y = (S) => (a !== void 0 && S < a) || (l !== void 0 && S > l),
    v = (S) => (a === void 0 ? l : l === void 0 || Math.abs(a - S) < Math.abs(l - S) ? a : l)
  let k = n * t
  const E = d + k,
    m = s === void 0 ? E : s(E)
  m !== E && (k = m - d)
  const p = (S) => -k * Math.exp(-S / r),
    g = (S) => m + p(S),
    x = (S) => {
      const D = p(S),
        R = g(S)
      ;((h.done = Math.abs(D) <= u), (h.value = h.done ? m : R))
    }
  let w, P
  const T = (S) => {
    y(h.value) &&
      ((w = S),
      (P = Sm({
        keyframes: [h.value, v(h.value)],
        velocity: Lm(g, S, h.value),
        damping: i,
        stiffness: o,
        restDelta: u,
        restSpeed: c,
      })))
  }
  return (
    T(0),
    {
      calculatedDuration: null,
      next: (S) => {
        let D = !1
        return (
          !P && w === void 0 && ((D = !0), x(S), T(S)),
          w !== void 0 && S >= w ? P.next(S - w) : (!D && x(S), h)
        )
      },
    }
  )
}
const U8 = Di(0.42, 0, 1, 1),
  $8 = Di(0, 0, 0.58, 1),
  Pm = Di(0.42, 0, 0.58, 1),
  H8 = (e) => Array.isArray(e) && typeof e[0] != 'number',
  K8 = {
    linear: je,
    easeIn: U8,
    easeInOut: Pm,
    easeOut: $8,
    circIn: tc,
    circInOut: om,
    circOut: im,
    backIn: ec,
    backInOut: nm,
    backOut: tm,
    anticipate: rm,
  },
  Jf = (e) => {
    if (bu(e)) {
      w1(e.length === 4)
      const [t, n, r, i] = e
      return Di(t, n, r, i)
    } else if (typeof e == 'string') return K8[e]
    return e
  }
function Z8(e, t, n) {
  const r = [],
    i = n || wm,
    o = e.length - 1
  for (let s = 0; s < o; s++) {
    let a = i(e[s], e[s + 1])
    if (t) {
      const l = Array.isArray(t) ? t[s] || je : t
      a = Vi(l, a)
    }
    r.push(a)
  }
  return r
}
function Y8(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const o = e.length
  if ((w1(o === t.length), o === 1)) return () => t[0]
  if (o === 2 && t[0] === t[1]) return () => t[1]
  const s = e[0] === e[1]
  e[0] > e[o - 1] && ((e = [...e].reverse()), (t = [...t].reverse()))
  const a = Z8(t, r, i),
    l = a.length,
    u = (c) => {
      if (s && c < e[0]) return t[0]
      let d = 0
      if (l > 1) for (; d < e.length - 2 && !(c < e[d + 1]); d++);
      const h = yr(e[d], e[d + 1], c)
      return a[d](h)
    }
  return n ? (c) => u(Et(e[0], e[o - 1], c)) : u
}
function Q8(e, t) {
  const n = e[e.length - 1]
  for (let r = 1; r <= t; r++) {
    const i = yr(0, t, r)
    e.push(K(n, 1, i))
  }
}
function b8(e) {
  const t = [0]
  return (Q8(t, e.length - 1), t)
}
function G8(e, t) {
  return e.map((n) => n * t)
}
function X8(e, t) {
  return e.map(() => t || Pm).splice(0, e.length - 1)
}
function rs({ duration: e = 300, keyframes: t, times: n, ease: r = 'easeInOut' }) {
  const i = H8(r) ? r.map(Jf) : Jf(r),
    o = { done: !1, value: t[0] },
    s = G8(n && n.length === t.length ? n : b8(t), e),
    a = Y8(s, t, { ease: Array.isArray(i) ? i : X8(t, i) })
  return { calculatedDuration: e, next: (l) => ((o.value = a(l)), (o.done = l >= e), o) }
}
const J8 = (e) => {
    const t = ({ timestamp: n }) => e(n)
    return {
      start: () => z.update(t, !0),
      stop: () => Kt(t),
      now: () => (ae.isProcessing ? ae.timestamp : st.now()),
    }
  },
  q8 = { decay: Xf, inertia: Xf, tween: rs, keyframes: rs, spring: Sm },
  ek = (e) => e / 100
class lc extends Em {
  constructor(t) {
    ;(super(t),
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
        const { onStop: l } = this.options
        l && l()
      }))
    const { name: n, motionValue: r, element: i, keyframes: o } = this.options,
      s = (i == null ? void 0 : i.KeyframeResolver) || oc,
      a = (l, u) => this.onKeyframesResolved(l, u)
    ;((this.resolver = new s(o, a, n, r, i)), this.resolver.scheduleResolve())
  }
  flatten() {
    ;(super.flatten(),
      this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes)))
  }
  initPlayback(t) {
    const {
        type: n = 'keyframes',
        repeat: r = 0,
        repeatDelay: i = 0,
        repeatType: o,
        velocity: s = 0,
      } = this.options,
      a = Qu(n) ? n : q8[n] || rs
    let l, u
    a !== rs && typeof t[0] != 'number' && ((l = Vi(ek, wm(t[0], t[1]))), (t = [0, 100]))
    const c = a({ ...this.options, keyframes: t })
    ;(o === 'mirror' && (u = a({ ...this.options, keyframes: [...t].reverse(), velocity: -s })),
      c.calculatedDuration === null && (c.calculatedDuration = U1(c)))
    const { calculatedDuration: d } = c,
      h = d + i,
      y = h * (r + 1) - i
    return {
      generator: c,
      mirroredGenerator: u,
      mapPercentToKeyframes: l,
      calculatedDuration: d,
      resolvedDuration: h,
      totalDuration: y,
    }
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options
    ;(this.play(),
      this.pendingPlayState === 'paused' || !t
        ? this.pause()
        : (this.state = this.pendingPlayState))
  }
  tick(t, n = !1) {
    const { resolved: r } = this
    if (!r) {
      const { keyframes: S } = this.options
      return { done: !0, value: S[S.length - 1] }
    }
    const {
      finalKeyframe: i,
      generator: o,
      mirroredGenerator: s,
      mapPercentToKeyframes: a,
      keyframes: l,
      calculatedDuration: u,
      totalDuration: c,
      resolvedDuration: d,
    } = r
    if (this.startTime === null) return o.next(0)
    const { delay: h, repeat: y, repeatType: v, repeatDelay: k, onUpdate: E } = this.options
    ;(this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 && (this.startTime = Math.min(t - c / this.speed, this.startTime)),
      n
        ? (this.currentTime = t)
        : this.holdTime !== null
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(t - this.startTime) * this.speed))
    const m = this.currentTime - h * (this.speed >= 0 ? 1 : -1),
      p = this.speed >= 0 ? m < 0 : m > c
    ;((this.currentTime = Math.max(m, 0)),
      this.state === 'finished' && this.holdTime === null && (this.currentTime = c))
    let g = this.currentTime,
      x = o
    if (y) {
      const S = Math.min(this.currentTime, c) / d
      let D = Math.floor(S),
        R = S % 1
      ;(!R && S >= 1 && (R = 1),
        R === 1 && D--,
        (D = Math.min(D, y + 1)),
        !!(D % 2) &&
          (v === 'reverse' ? ((R = 1 - R), k && (R -= k / d)) : v === 'mirror' && (x = s)),
        (g = Et(0, 1, R) * d))
    }
    const w = p ? { done: !1, value: l[0] } : x.next(g)
    a && (w.value = a(w.value))
    let { done: P } = w
    !p && u !== null && (P = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0)
    const T =
      this.holdTime === null && (this.state === 'finished' || (this.state === 'running' && P))
    return (
      T && i !== void 0 && (w.value = js(l, this.options, i)),
      E && E(w.value),
      T && this.finish(),
      w
    )
  }
  get duration() {
    const { resolved: t } = this
    return t ? mt(t.calculatedDuration) : 0
  }
  get time() {
    return mt(this.currentTime)
  }
  set time(t) {
    ;((t = pt(t)),
      (this.currentTime = t),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.speed))
  }
  get speed() {
    return this.playbackSpeed
  }
  set speed(t) {
    const n = this.playbackSpeed !== t
    ;((this.playbackSpeed = t), n && (this.time = mt(this.currentTime)))
  }
  play() {
    if ((this.resolver.isScheduled || this.resolver.resume(), !this._resolved)) {
      this.pendingPlayState = 'running'
      return
    }
    if (this.isStopped) return
    const { driver: t = J8, onPlay: n, startTime: r } = this.options
    ;(this.driver || (this.driver = t((o) => this.tick(o))), n && n())
    const i = this.driver.now()
    ;(this.holdTime !== null
      ? (this.startTime = i - this.holdTime)
      : this.startTime
        ? this.state === 'finished' && (this.startTime = i)
        : (this.startTime = r ?? this.calcStartTime()),
      this.state === 'finished' && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = 'running'),
      this.driver.start())
  }
  pause() {
    var t
    if (!this._resolved) {
      this.pendingPlayState = 'paused'
      return
    }
    ;((this.state = 'paused'),
      (this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0))
  }
  complete() {
    ;(this.state !== 'running' && this.play(),
      (this.pendingPlayState = this.state = 'finished'),
      (this.holdTime = null))
  }
  finish() {
    ;(this.teardown(), (this.state = 'finished'))
    const { onComplete: t } = this.options
    t && t()
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
  sample(t) {
    return ((this.startTime = 0), this.tick(t, !0))
  }
}
const tk = new Set(['opacity', 'clipPath', 'filter', 'transform'])
function nk(
  e,
  t,
  n,
  {
    delay: r = 0,
    duration: i = 300,
    repeat: o = 0,
    repeatType: s = 'loop',
    ease: a = 'easeInOut',
    times: l,
  } = {}
) {
  const u = { [t]: n }
  l && (u.offset = l)
  const c = K1(a, i)
  return (
    Array.isArray(c) && (u.easing = c),
    e.animate(u, {
      delay: r,
      duration: i,
      easing: Array.isArray(c) ? 'linear' : c,
      fill: 'both',
      iterations: o + 1,
      direction: s === 'reverse' ? 'alternate' : 'normal',
    })
  )
}
const rk = Fu(() => Object.hasOwnProperty.call(Element.prototype, 'animate')),
  is = 10,
  ik = 2e4
function ok(e) {
  return Qu(e.type) || e.type === 'spring' || !H1(e.ease)
}
function sk(e, t) {
  const n = new lc({ ...t, keyframes: e, repeat: 0, delay: 0, isGenerator: !0 })
  let r = { done: !1, value: e[0] }
  const i = []
  let o = 0
  for (; !r.done && o < ik; ) ((r = n.sample(o)), i.push(r.value), (o += is))
  return { times: void 0, keyframes: i, duration: o - is, ease: 'linear' }
}
const Cm = { anticipate: rm, backInOut: nm, circInOut: om }
function lk(e) {
  return e in Cm
}
class qf extends Em {
  constructor(t) {
    super(t)
    const { name: n, motionValue: r, element: i, keyframes: o } = this.options
    ;((this.resolver = new km(o, (s, a) => this.onKeyframesResolved(s, a), n, r, i)),
      this.resolver.scheduleResolve())
  }
  initPlayback(t, n) {
    let {
      duration: r = 300,
      times: i,
      ease: o,
      type: s,
      motionValue: a,
      name: l,
      startTime: u,
    } = this.options
    if (!a.owner || !a.owner.current) return !1
    if ((typeof o == 'string' && ts() && lk(o) && (o = Cm[o]), ok(this.options))) {
      const { onComplete: d, onUpdate: h, motionValue: y, element: v, ...k } = this.options,
        E = sk(t, k)
      ;((t = E.keyframes),
        t.length === 1 && (t[1] = t[0]),
        (r = E.duration),
        (i = E.times),
        (o = E.ease),
        (s = 'keyframes'))
    }
    const c = nk(a.owner.current, l, t, { ...this.options, duration: r, times: i, ease: o })
    return (
      (c.startTime = u ?? this.calcStartTime()),
      this.pendingTimeline
        ? (Wf(c, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (c.onfinish = () => {
            const { onComplete: d } = this.options
            ;(a.set(js(t, this.options, n)), d && d(), this.cancel(), this.resolveFinishedPromise())
          }),
      { animation: c, duration: r, times: i, type: s, ease: o, keyframes: t }
    )
  }
  get duration() {
    const { resolved: t } = this
    if (!t) return 0
    const { duration: n } = t
    return mt(n)
  }
  get time() {
    const { resolved: t } = this
    if (!t) return 0
    const { animation: n } = t
    return mt(n.currentTime || 0)
  }
  set time(t) {
    const { resolved: n } = this
    if (!n) return
    const { animation: r } = n
    r.currentTime = pt(t)
  }
  get speed() {
    const { resolved: t } = this
    if (!t) return 1
    const { animation: n } = t
    return n.playbackRate
  }
  set speed(t) {
    const { resolved: n } = this
    if (!n) return
    const { animation: r } = n
    r.playbackRate = t
  }
  get state() {
    const { resolved: t } = this
    if (!t) return 'idle'
    const { animation: n } = t
    return n.playState
  }
  get startTime() {
    const { resolved: t } = this
    if (!t) return null
    const { animation: n } = t
    return n.startTime
  }
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t
    else {
      const { resolved: n } = this
      if (!n) return je
      const { animation: r } = n
      Wf(r, t)
    }
    return je
  }
  play() {
    if (this.isStopped) return
    const { resolved: t } = this
    if (!t) return
    const { animation: n } = t
    ;(n.playState === 'finished' && this.updateFinishedPromise(), n.play())
  }
  pause() {
    const { resolved: t } = this
    if (!t) return
    const { animation: n } = t
    n.pause()
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')) return
    ;(this.resolveFinishedPromise(), this.updateFinishedPromise())
    const { resolved: t } = this
    if (!t) return
    const { animation: n, keyframes: r, duration: i, type: o, ease: s, times: a } = t
    if (n.playState === 'idle' || n.playState === 'finished') return
    if (this.time) {
      const { motionValue: u, onUpdate: c, onComplete: d, element: h, ...y } = this.options,
        v = new lc({
          ...y,
          keyframes: r,
          duration: i,
          type: o,
          ease: s,
          times: a,
          isGenerator: !0,
        }),
        k = pt(this.time)
      u.setWithVelocity(v.sample(k - is).value, v.sample(k).value, is)
    }
    const { onStop: l } = this.options
    ;(l && l(), this.cancel())
  }
  complete() {
    const { resolved: t } = this
    t && t.animation.finish()
  }
  cancel() {
    const { resolved: t } = this
    t && t.animation.cancel()
  }
  static supports(t) {
    const { motionValue: n, name: r, repeatDelay: i, repeatType: o, damping: s, type: a } = t
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement)) return !1
    const { onUpdate: l, transformTemplate: u } = n.owner.getProps()
    return rk() && r && tk.has(r) && !l && !u && !i && o !== 'mirror' && s !== 0 && a !== 'inertia'
  }
}
const ak = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  uk = (e) => ({
    type: 'spring',
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  ck = { type: 'keyframes', duration: 0.8 },
  fk = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  dk = (e, { keyframes: t }) =>
    t.length > 2 ? ck : Ln.has(e) ? (e.startsWith('scale') ? uk(t[1]) : ak) : fk
function hk({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: o,
  repeatType: s,
  repeatDelay: a,
  from: l,
  elapsed: u,
  ...c
}) {
  return !!Object.keys(c).length
}
const ac =
  (e, t, n, r = {}, i, o) =>
  (s) => {
    const a = Yu(r, e) || {},
      l = a.delay || r.delay || 0
    let { elapsed: u = 0 } = r
    u = u - pt(l)
    let c = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: 'easeOut',
      velocity: t.getVelocity(),
      ...a,
      delay: -u,
      onUpdate: (h) => {
        ;(t.set(h), a.onUpdate && a.onUpdate(h))
      },
      onComplete: () => {
        ;(s(), a.onComplete && a.onComplete())
      },
      name: e,
      motionValue: t,
      element: o ? void 0 : i,
    }
    ;(hk(a) || (c = { ...c, ...dk(e, c) }),
      c.duration && (c.duration = pt(c.duration)),
      c.repeatDelay && (c.repeatDelay = pt(c.repeatDelay)),
      c.from !== void 0 && (c.keyframes[0] = c.from))
    let d = !1
    if (
      ((c.type === !1 || (c.duration === 0 && !c.repeatDelay)) &&
        ((c.duration = 0), c.delay === 0 && (d = !0)),
      d && !o && t.get() !== void 0)
    ) {
      const h = js(c.keyframes, a)
      if (h !== void 0)
        return (
          z.update(() => {
            ;(c.onUpdate(h), c.onComplete())
          }),
          new _v([])
        )
    }
    return !o && qf.supports(c) ? new qf(c) : new lc(c)
  }
function pk({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0
  return ((t[n] = !1), r)
}
function Tm(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var o
  let { transition: s = e.getDefaultTransition(), transitionEnd: a, ...l } = t
  r && (s = r)
  const u = [],
    c = i && e.animationState && e.animationState.getState()[i]
  for (const d in l) {
    const h = e.getValue(d, (o = e.latestValues[d]) !== null && o !== void 0 ? o : null),
      y = l[d]
    if (y === void 0 || (c && pk(c, d))) continue
    const v = { delay: n, ...Yu(s || {}, d) }
    let k = !1
    if (window.MotionHandoffAnimation) {
      const m = X1(e)
      if (m) {
        const p = window.MotionHandoffAnimation(m, d, z)
        p !== null && ((v.startTime = p), (k = !0))
      }
    }
    ;(Ea(e, d), h.start(ac(d, h, y, e.shouldReduceMotion && b1.has(d) ? { type: !1 } : v, e, k)))
    const E = h.animation
    E && u.push(E)
  }
  return (
    a &&
      Promise.all(u).then(() => {
        z.update(() => {
          a && Zv(e, a)
        })
      }),
    u
  )
}
function Ta(e, t, n = {}) {
  var r
  const i = Rs(
    e,
    t,
    n.type === 'exit'
      ? (r = e.presenceContext) === null || r === void 0
        ? void 0
        : r.custom
      : void 0
  )
  let { transition: o = e.getDefaultTransition() || {} } = i || {}
  n.transitionOverride && (o = n.transitionOverride)
  const s = i ? () => Promise.all(Tm(e, i, n)) : () => Promise.resolve(),
    a =
      e.variantChildren && e.variantChildren.size
        ? (u = 0) => {
            const { delayChildren: c = 0, staggerChildren: d, staggerDirection: h } = o
            return mk(e, t, c + u, d, h, n)
          }
        : () => Promise.resolve(),
    { when: l } = o
  if (l) {
    const [u, c] = l === 'beforeChildren' ? [s, a] : [a, s]
    return u().then(() => c())
  } else return Promise.all([s(), a(n.delay)])
}
function mk(e, t, n = 0, r = 0, i = 1, o) {
  const s = [],
    a = (e.variantChildren.size - 1) * r,
    l = i === 1 ? (u = 0) => u * r : (u = 0) => a - u * r
  return (
    Array.from(e.variantChildren)
      .sort(gk)
      .forEach((u, c) => {
        ;(u.notify('AnimationStart', t),
          s.push(Ta(u, t, { ...o, delay: n + l(c) }).then(() => u.notify('AnimationComplete', t))))
      }),
    Promise.all(s)
  )
}
function gk(e, t) {
  return e.sortNodePosition(t)
}
function yk(e, t, n = {}) {
  e.notify('AnimationStart', t)
  let r
  if (Array.isArray(t)) {
    const i = t.map((o) => Ta(e, o, n))
    r = Promise.all(i)
  } else if (typeof t == 'string') r = Ta(e, t, n)
  else {
    const i = typeof t == 'function' ? Rs(e, t, n.custom) : t
    r = Promise.all(Tm(e, i, n))
  }
  return r.then(() => {
    e.notify('AnimationComplete', t)
  })
}
const vk = Vu.length
function Mm(e) {
  if (!e) return
  if (!e.isControllingVariants) {
    const n = e.parent ? Mm(e.parent) || {} : {}
    return (e.props.initial !== void 0 && (n.initial = e.props.initial), n)
  }
  const t = {}
  for (let n = 0; n < vk; n++) {
    const r = Vu[n],
      i = e.props[r]
    ;(Li(i) || i === !1) && (t[r] = i)
  }
  return t
}
const kk = [...Du].reverse(),
  Ek = Du.length
function xk(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: r }) => yk(e, n, r)))
}
function wk(e) {
  let t = xk(e),
    n = ed(),
    r = !0
  const i = (l) => (u, c) => {
    var d
    const h = Rs(
      e,
      c,
      l === 'exit' ? ((d = e.presenceContext) === null || d === void 0 ? void 0 : d.custom) : void 0
    )
    if (h) {
      const { transition: y, transitionEnd: v, ...k } = h
      u = { ...u, ...k, ...v }
    }
    return u
  }
  function o(l) {
    t = l(e)
  }
  function s(l) {
    const { props: u } = e,
      c = Mm(e.parent) || {},
      d = [],
      h = new Set()
    let y = {},
      v = 1 / 0
    for (let E = 0; E < Ek; E++) {
      const m = kk[E],
        p = n[m],
        g = u[m] !== void 0 ? u[m] : c[m],
        x = Li(g),
        w = m === l ? p.isActive : null
      w === !1 && (v = E)
      let P = g === c[m] && g !== u[m] && x
      if (
        (P && r && e.manuallyAnimateOnMount && (P = !1),
        (p.protectedKeys = { ...y }),
        (!p.isActive && w === null) || (!g && !p.prevProp) || Ms(g) || typeof g == 'boolean')
      )
        continue
      const T = Lk(p.prevProp, g)
      let S = T || (m === l && p.isActive && !P && x) || (E > v && x),
        D = !1
      const R = Array.isArray(g) ? g : [g]
      let $ = R.reduce(i(m), {})
      w === !1 && ($ = {})
      const { prevResolvedValues: qe = {} } = p,
        lt = { ...qe, ...$ },
        Jt = (te) => {
          ;((S = !0), h.has(te) && ((D = !0), h.delete(te)), (p.needsAnimating[te] = !0))
          const M = e.getValue(te)
          M && (M.liveStyle = !1)
        }
      for (const te in lt) {
        const M = $[te],
          _ = qe[te]
        if (y.hasOwnProperty(te)) continue
        let F = !1
        ;(ya(M) && ya(_) ? (F = !z1(M, _)) : (F = M !== _),
          F
            ? M != null
              ? Jt(te)
              : h.add(te)
            : M !== void 0 && h.has(te)
              ? Jt(te)
              : (p.protectedKeys[te] = !0))
      }
      ;((p.prevProp = g),
        (p.prevResolvedValues = $),
        p.isActive && (y = { ...y, ...$ }),
        r && e.blockInitialAnimation && (S = !1),
        S &&
          (!(P && T) || D) &&
          d.push(...R.map((te) => ({ animation: te, options: { type: m } }))))
    }
    if (h.size) {
      const E = {}
      ;(h.forEach((m) => {
        const p = e.getBaseTarget(m),
          g = e.getValue(m)
        ;(g && (g.liveStyle = !0), (E[m] = p ?? null))
      }),
        d.push({ animation: E }))
    }
    let k = !!d.length
    return (
      r && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (k = !1),
      (r = !1),
      k ? t(d) : Promise.resolve()
    )
  }
  function a(l, u) {
    var c
    if (n[l].isActive === u) return Promise.resolve()
    ;((c = e.variantChildren) === null ||
      c === void 0 ||
      c.forEach((h) => {
        var y
        return (y = h.animationState) === null || y === void 0 ? void 0 : y.setActive(l, u)
      }),
      (n[l].isActive = u))
    const d = s(l)
    for (const h in n) n[h].protectedKeys = {}
    return d
  }
  return {
    animateChanges: s,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      ;((n = ed()), (r = !0))
    },
  }
}
function Lk(e, t) {
  return typeof t == 'string' ? t !== e : Array.isArray(t) ? !z1(t, e) : !1
}
function tn(e = !1) {
  return { isActive: e, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} }
}
function ed() {
  return {
    animate: tn(!0),
    whileInView: tn(),
    whileHover: tn(),
    whileTap: tn(),
    whileDrag: tn(),
    whileFocus: tn(),
    exit: tn(),
  }
}
class Xt {
  constructor(t) {
    ;((this.isMounted = !1), (this.node = t))
  }
  update() {}
}
class Sk extends Xt {
  constructor(t) {
    ;(super(t), t.animationState || (t.animationState = wk(t)))
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps()
    Ms(t) && (this.unmountControls = t.subscribe(this.node))
  }
  mount() {
    this.updateAnimationControlsSubscription()
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {}
    t !== n && this.updateAnimationControlsSubscription()
  }
  unmount() {
    var t
    ;(this.node.animationState.reset(),
      (t = this.unmountControls) === null || t === void 0 || t.call(this))
  }
}
let Pk = 0
class Ck extends Xt {
  constructor() {
    ;(super(...arguments), (this.id = Pk++))
  }
  update() {
    if (!this.node.presenceContext) return
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {}
    if (!this.node.animationState || t === r) return
    const i = this.node.animationState.setActive('exit', !t)
    n && !t && i.then(() => n(this.id))
  }
  mount() {
    const { register: t } = this.node.presenceContext || {}
    t && (this.unmount = t(this.id))
  }
  unmount() {}
}
const Tk = { animation: { Feature: Sk }, exit: { Feature: Ck } }
function Ti(e, t, n, r = { passive: !0 }) {
  return (e.addEventListener(t, n, r), () => e.removeEventListener(t, n))
}
function Ni(e) {
  return { point: { x: e.pageX, y: e.pageY } }
}
const Mk = (e) => (t) => Gu(t) && e(t, Ni(t))
function ti(e, t, n, r) {
  return Ti(e, t, Mk(n), r)
}
const td = (e, t) => Math.abs(e - t)
function Ak(e, t) {
  const n = td(e.x, t.x),
    r = td(e.y, t.y)
  return Math.sqrt(n ** 2 + r ** 2)
}
class Am {
  constructor(t, n, { transformPagePoint: r, contextWindow: i, dragSnapToOrigin: o = !1 } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return
        const d = hl(this.lastMoveEventInfo, this.history),
          h = this.startEvent !== null,
          y = Ak(d.offset, { x: 0, y: 0 }) >= 3
        if (!h && !y) return
        const { point: v } = d,
          { timestamp: k } = ae
        this.history.push({ ...v, timestamp: k })
        const { onStart: E, onMove: m } = this.handlers
        ;(h || (E && E(this.lastMoveEvent, d), (this.startEvent = this.lastMoveEvent)),
          m && m(this.lastMoveEvent, d))
      }),
      (this.handlePointerMove = (d, h) => {
        ;((this.lastMoveEvent = d),
          (this.lastMoveEventInfo = dl(h, this.transformPagePoint)),
          z.update(this.updatePoint, !0))
      }),
      (this.handlePointerUp = (d, h) => {
        this.end()
        const { onEnd: y, onSessionEnd: v, resumeAnimation: k } = this.handlers
        if ((this.dragSnapToOrigin && k && k(), !(this.lastMoveEvent && this.lastMoveEventInfo)))
          return
        const E = hl(
          d.type === 'pointercancel' ? this.lastMoveEventInfo : dl(h, this.transformPagePoint),
          this.history
        )
        ;(this.startEvent && y && y(d, E), v && v(d, E))
      }),
      !Gu(t))
    )
      return
    ;((this.dragSnapToOrigin = o),
      (this.handlers = n),
      (this.transformPagePoint = r),
      (this.contextWindow = i || window))
    const s = Ni(t),
      a = dl(s, this.transformPagePoint),
      { point: l } = a,
      { timestamp: u } = ae
    this.history = [{ ...l, timestamp: u }]
    const { onSessionStart: c } = n
    ;(c && c(t, hl(a, this.history)),
      (this.removeListeners = Vi(
        ti(this.contextWindow, 'pointermove', this.handlePointerMove),
        ti(this.contextWindow, 'pointerup', this.handlePointerUp),
        ti(this.contextWindow, 'pointercancel', this.handlePointerUp)
      )))
  }
  updateHandlers(t) {
    this.handlers = t
  }
  end() {
    ;(this.removeListeners && this.removeListeners(), Kt(this.updatePoint))
  }
}
function dl(e, t) {
  return t ? { point: t(e.point) } : e
}
function nd(e, t) {
  return { x: e.x - t.x, y: e.y - t.y }
}
function hl({ point: e }, t) {
  return { point: e, delta: nd(e, Rm(t)), offset: nd(e, Rk(t)), velocity: jk(t, 0.1) }
}
function Rk(e) {
  return e[0]
}
function Rm(e) {
  return e[e.length - 1]
}
function jk(e, t) {
  if (e.length < 2) return { x: 0, y: 0 }
  let n = e.length - 1,
    r = null
  const i = Rm(e)
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > pt(t))); ) n--
  if (!r) return { x: 0, y: 0 }
  const o = mt(i.timestamp - r.timestamp)
  if (o === 0) return { x: 0, y: 0 }
  const s = { x: (i.x - r.x) / o, y: (i.y - r.y) / o }
  return (s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s)
}
const jm = 1e-4,
  _k = 1 - jm,
  Fk = 1 + jm,
  _m = 0.01,
  Dk = 0 - _m,
  Vk = 0 + _m
function Fe(e) {
  return e.max - e.min
}
function Nk(e, t, n) {
  return Math.abs(e - t) <= n
}
function rd(e, t, n, r = 0.5) {
  ;((e.origin = r),
    (e.originPoint = K(t.min, t.max, e.origin)),
    (e.scale = Fe(n) / Fe(t)),
    (e.translate = K(n.min, n.max, e.origin) - e.originPoint),
    ((e.scale >= _k && e.scale <= Fk) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= Dk && e.translate <= Vk) || isNaN(e.translate)) && (e.translate = 0))
}
function ni(e, t, n, r) {
  ;(rd(e.x, t.x, n.x, r ? r.originX : void 0), rd(e.y, t.y, n.y, r ? r.originY : void 0))
}
function id(e, t, n) {
  ;((e.min = n.min + t.min), (e.max = e.min + Fe(t)))
}
function Wk(e, t, n) {
  ;(id(e.x, t.x, n.x), id(e.y, t.y, n.y))
}
function od(e, t, n) {
  ;((e.min = t.min - n.min), (e.max = e.min + Fe(t)))
}
function ri(e, t, n) {
  ;(od(e.x, t.x, n.x), od(e.y, t.y, n.y))
}
function Ok(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? K(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? K(n, e, r.max) : Math.min(e, n)),
    e
  )
}
function sd(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  }
}
function Ik(e, { top: t, left: n, bottom: r, right: i }) {
  return { x: sd(e.x, n, i), y: sd(e.y, t, r) }
}
function ld(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max
  return (t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r })
}
function Bk(e, t) {
  return { x: ld(e.x, t.x), y: ld(e.y, t.y) }
}
function zk(e, t) {
  let n = 0.5
  const r = Fe(e),
    i = Fe(t)
  return (
    i > r ? (n = yr(t.min, t.max - r, e.min)) : r > i && (n = yr(e.min, e.max - i, t.min)),
    Et(0, 1, n)
  )
}
function Uk(e, t) {
  const n = {}
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  )
}
const Ma = 0.35
function $k(e = Ma) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Ma),
    { x: ad(e, 'left', 'right'), y: ad(e, 'top', 'bottom') }
  )
}
function ad(e, t, n) {
  return { min: ud(e, t), max: ud(e, n) }
}
function ud(e, t) {
  return typeof e == 'number' ? e : e[t] || 0
}
const cd = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  er = () => ({ x: cd(), y: cd() }),
  fd = () => ({ min: 0, max: 0 }),
  J = () => ({ x: fd(), y: fd() })
function Oe(e) {
  return [e('x'), e('y')]
}
function Fm({ top: e, left: t, right: n, bottom: r }) {
  return { x: { min: t, max: n }, y: { min: e, max: r } }
}
function Hk({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min }
}
function Kk(e, t) {
  if (!t) return e
  const n = t({ x: e.left, y: e.top }),
    r = t({ x: e.right, y: e.bottom })
  return { top: n.y, left: n.x, bottom: r.y, right: r.x }
}
function pl(e) {
  return e === void 0 || e === 1
}
function Aa({ scale: e, scaleX: t, scaleY: n }) {
  return !pl(e) || !pl(t) || !pl(n)
}
function on(e) {
  return Aa(e) || Dm(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY
}
function Dm(e) {
  return dd(e.x) || dd(e.y)
}
function dd(e) {
  return e && e !== '0%'
}
function os(e, t, n) {
  const r = e - n,
    i = t * r
  return n + i
}
function hd(e, t, n, r, i) {
  return (i !== void 0 && (e = os(e, i, r)), os(e, n, r) + t)
}
function Ra(e, t = 0, n = 1, r, i) {
  ;((e.min = hd(e.min, t, n, r, i)), (e.max = hd(e.max, t, n, r, i)))
}
function Vm(e, { x: t, y: n }) {
  ;(Ra(e.x, t.translate, t.scale, t.originPoint), Ra(e.y, n.translate, n.scale, n.originPoint))
}
const pd = 0.999999999999,
  md = 1.0000000000001
function Zk(e, t, n, r = !1) {
  const i = n.length
  if (!i) return
  t.x = t.y = 1
  let o, s
  for (let a = 0; a < i; a++) {
    ;((o = n[a]), (s = o.projectionDelta))
    const { visualElement: l } = o.options
    ;(l && l.props.style && l.props.style.display === 'contents') ||
      (r &&
        o.options.layoutScroll &&
        o.scroll &&
        o !== o.root &&
        nr(e, { x: -o.scroll.offset.x, y: -o.scroll.offset.y }),
      s && ((t.x *= s.x.scale), (t.y *= s.y.scale), Vm(e, s)),
      r && on(o.latestValues) && nr(e, o.latestValues))
  }
  ;(t.x < md && t.x > pd && (t.x = 1), t.y < md && t.y > pd && (t.y = 1))
}
function tr(e, t) {
  ;((e.min = e.min + t), (e.max = e.max + t))
}
function gd(e, t, n, r, i = 0.5) {
  const o = K(e.min, e.max, i)
  Ra(e, t, n, o, r)
}
function nr(e, t) {
  ;(gd(e.x, t.x, t.scaleX, t.scale, t.originX), gd(e.y, t.y, t.scaleY, t.scale, t.originY))
}
function Nm(e, t) {
  return Fm(Kk(e.getBoundingClientRect(), t))
}
function Yk(e, t, n) {
  const r = Nm(e, n),
    { scroll: i } = t
  return (i && (tr(r.x, i.offset.x), tr(r.y, i.offset.y)), r)
}
const Wm = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  Qk = new WeakMap()
class bk {
  constructor(t) {
    ;((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = J()),
      (this.visualElement = t))
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: r } = this.visualElement
    if (r && r.isPresent === !1) return
    const i = (c) => {
        const { dragSnapToOrigin: d } = this.getProps()
        ;(d ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(Ni(c).point))
      },
      o = (c, d) => {
        const { drag: h, dragPropagation: y, onDragStart: v } = this.getProps()
        if (
          h &&
          !y &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = zv(h)),
          !this.openDragLock)
        )
          return
        ;((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          Oe((E) => {
            let m = this.getAxisMotionValue(E).get() || 0
            if (ot.test(m)) {
              const { projection: p } = this.visualElement
              if (p && p.layout) {
                const g = p.layout.layoutBox[E]
                g && (m = Fe(g) * (parseFloat(m) / 100))
              }
            }
            this.originPoint[E] = m
          }),
          v && z.postRender(() => v(c, d)),
          Ea(this.visualElement, 'transform'))
        const { animationState: k } = this.visualElement
        k && k.setActive('whileDrag', !0)
      },
      s = (c, d) => {
        const {
          dragPropagation: h,
          dragDirectionLock: y,
          onDirectionLock: v,
          onDrag: k,
        } = this.getProps()
        if (!h && !this.openDragLock) return
        const { offset: E } = d
        if (y && this.currentDirection === null) {
          ;((this.currentDirection = Gk(E)),
            this.currentDirection !== null && v && v(this.currentDirection))
          return
        }
        ;(this.updateAxis('x', d.point, E),
          this.updateAxis('y', d.point, E),
          this.visualElement.render(),
          k && k(c, d))
      },
      a = (c, d) => this.stop(c, d),
      l = () =>
        Oe((c) => {
          var d
          return (
            this.getAnimationState(c) === 'paused' &&
            ((d = this.getAxisMotionValue(c).animation) === null || d === void 0
              ? void 0
              : d.play())
          )
        }),
      { dragSnapToOrigin: u } = this.getProps()
    this.panSession = new Am(
      t,
      { onSessionStart: i, onStart: o, onMove: s, onSessionEnd: a, resumeAnimation: l },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: u,
        contextWindow: Wm(this.visualElement),
      }
    )
  }
  stop(t, n) {
    const r = this.isDragging
    if ((this.cancel(), !r)) return
    const { velocity: i } = n
    this.startAnimation(i)
    const { onDragEnd: o } = this.getProps()
    o && z.postRender(() => o(t, n))
  }
  cancel() {
    this.isDragging = !1
    const { projection: t, animationState: n } = this.visualElement
    ;(t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0))
    const { dragPropagation: r } = this.getProps()
    ;(!r && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive('whileDrag', !1))
  }
  updateAxis(t, n, r) {
    const { drag: i } = this.getProps()
    if (!r || !lo(t, i, this.currentDirection)) return
    const o = this.getAxisMotionValue(t)
    let s = this.originPoint[t] + r[t]
    ;(this.constraints && this.constraints[t] && (s = Ok(s, this.constraints[t], this.elastic[t])),
      o.set(s))
  }
  resolveConstraints() {
    var t
    const { dragConstraints: n, dragElastic: r } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (t = this.visualElement.projection) === null || t === void 0
            ? void 0
            : t.layout,
      o = this.constraints
    ;(n && Jn(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && i
        ? (this.constraints = Ik(i.layoutBox, n))
        : (this.constraints = !1),
      (this.elastic = $k(r)),
      o !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        Oe((s) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(s) &&
            (this.constraints[s] = Uk(i.layoutBox[s], this.constraints[s]))
        }))
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps()
    if (!t || !Jn(t)) return !1
    const r = t.current,
      { projection: i } = this.visualElement
    if (!i || !i.layout) return !1
    const o = Yk(r, i.root, this.visualElement.getTransformPagePoint())
    let s = Bk(i.layout.layoutBox, o)
    if (n) {
      const a = n(Hk(s))
      ;((this.hasMutatedConstraints = !!a), a && (s = Fm(a)))
    }
    return s
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: r,
        dragElastic: i,
        dragTransition: o,
        dragSnapToOrigin: s,
        onDragTransitionEnd: a,
      } = this.getProps(),
      l = this.constraints || {},
      u = Oe((c) => {
        if (!lo(c, n, this.currentDirection)) return
        let d = (l && l[c]) || {}
        s && (d = { min: 0, max: 0 })
        const h = i ? 200 : 1e6,
          y = i ? 40 : 1e7,
          v = {
            type: 'inertia',
            velocity: r ? t[c] : 0,
            bounceStiffness: h,
            bounceDamping: y,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...o,
            ...d,
          }
        return this.startAxisValueAnimation(c, v)
      })
    return Promise.all(u).then(a)
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t)
    return (Ea(this.visualElement, t), r.start(ac(t, r, 0, n, this.visualElement, !1)))
  }
  stopAnimation() {
    Oe((t) => this.getAxisMotionValue(t).stop())
  }
  pauseAnimation() {
    Oe((t) => {
      var n
      return (n = this.getAxisMotionValue(t).animation) === null || n === void 0
        ? void 0
        : n.pause()
    })
  }
  getAnimationState(t) {
    var n
    return (n = this.getAxisMotionValue(t).animation) === null || n === void 0 ? void 0 : n.state
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      r = this.visualElement.getProps(),
      i = r[n]
    return i || this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0)
  }
  snapToCursor(t) {
    Oe((n) => {
      const { drag: r } = this.getProps()
      if (!lo(n, r, this.currentDirection)) return
      const { projection: i } = this.visualElement,
        o = this.getAxisMotionValue(n)
      if (i && i.layout) {
        const { min: s, max: a } = i.layout.layoutBox[n]
        o.set(t[n] - K(s, a, 0.5))
      }
    })
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: r } = this.visualElement
    if (!Jn(n) || !r || !this.constraints) return
    this.stopAnimation()
    const i = { x: 0, y: 0 }
    Oe((s) => {
      const a = this.getAxisMotionValue(s)
      if (a && this.constraints !== !1) {
        const l = a.get()
        i[s] = zk({ min: l, max: l }, this.constraints[s])
      }
    })
    const { transformTemplate: o } = this.visualElement.getProps()
    ;((this.visualElement.current.style.transform = o ? o({}, '') : 'none'),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      Oe((s) => {
        if (!lo(s, t, null)) return
        const a = this.getAxisMotionValue(s),
          { min: l, max: u } = this.constraints[s]
        a.set(K(l, u, i[s]))
      }))
  }
  addListeners() {
    if (!this.visualElement.current) return
    Qk.set(this.visualElement, this)
    const t = this.visualElement.current,
      n = ti(t, 'pointerdown', (l) => {
        const { drag: u, dragListener: c = !0 } = this.getProps()
        u && c && this.start(l)
      }),
      r = () => {
        const { dragConstraints: l } = this.getProps()
        Jn(l) && l.current && (this.constraints = this.resolveRefConstraints())
      },
      { projection: i } = this.visualElement,
      o = i.addEventListener('measure', r)
    ;(i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), z.read(r))
    const s = Ti(window, 'resize', () => this.scalePositionWithinConstraints()),
      a = i.addEventListener('didUpdate', ({ delta: l, hasLayoutChanged: u }) => {
        this.isDragging &&
          u &&
          (Oe((c) => {
            const d = this.getAxisMotionValue(c)
            d && ((this.originPoint[c] += l[c].translate), d.set(d.get() + l[c].translate))
          }),
          this.visualElement.render())
      })
    return () => {
      ;(s(), n(), o(), a && a())
    }
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: i = !1,
        dragConstraints: o = !1,
        dragElastic: s = Ma,
        dragMomentum: a = !0,
      } = t
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: s,
      dragMomentum: a,
    }
  }
}
function lo(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e)
}
function Gk(e, t = 10) {
  let n = null
  return (Math.abs(e.y) > t ? (n = 'y') : Math.abs(e.x) > t && (n = 'x'), n)
}
class Xk extends Xt {
  constructor(t) {
    ;(super(t),
      (this.removeGroupControls = je),
      (this.removeListeners = je),
      (this.controls = new bk(t)))
  }
  mount() {
    const { dragControls: t } = this.node.getProps()
    ;(t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || je))
  }
  unmount() {
    ;(this.removeGroupControls(), this.removeListeners())
  }
}
const yd = (e) => (t, n) => {
  e && z.postRender(() => e(t, n))
}
class Jk extends Xt {
  constructor() {
    ;(super(...arguments), (this.removePointerDownListener = je))
  }
  onPointerDown(t) {
    this.session = new Am(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Wm(this.node),
    })
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: r, onPanEnd: i } = this.node.getProps()
    return {
      onSessionStart: yd(t),
      onStart: yd(n),
      onMove: r,
      onEnd: (o, s) => {
        ;(delete this.session, i && z.postRender(() => i(o, s)))
      },
    }
  }
  mount() {
    this.removePointerDownListener = ti(this.node.current, 'pointerdown', (t) =>
      this.onPointerDown(t)
    )
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers())
  }
  unmount() {
    ;(this.removePointerDownListener(), this.session && this.session.end())
  }
}
const Co = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 }
function vd(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100
}
const Vr = {
    correct: (e, t) => {
      if (!t.target) return e
      if (typeof e == 'string')
        if (j.test(e)) e = parseFloat(e)
        else return e
      const n = vd(e, t.target.x),
        r = vd(e, t.target.y)
      return `${n}% ${r}%`
    },
  },
  qk = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const r = e,
        i = Zt.parse(e)
      if (i.length > 5) return r
      const o = Zt.createTransformer(e),
        s = typeof i[0] != 'number' ? 1 : 0,
        a = n.x.scale * t.x,
        l = n.y.scale * t.y
      ;((i[0 + s] /= a), (i[1 + s] /= l))
      const u = K(a, l, 0.5)
      return (
        typeof i[2 + s] == 'number' && (i[2 + s] /= u),
        typeof i[3 + s] == 'number' && (i[3 + s] /= u),
        o(i)
      )
    },
  }
class e4 extends L.Component {
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r, layoutId: i } = this.props,
      { projection: o } = t
    ;(Ev(t4),
      o &&
        (n.group && n.group.add(o),
        r && r.register && i && r.register(o),
        o.root.didUpdate(),
        o.addEventListener('animationComplete', () => {
          this.safeToRemove()
        }),
        o.setOptions({ ...o.options, onExitComplete: () => this.safeToRemove() })),
      (Co.hasEverUpdated = !0))
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: r, drag: i, isPresent: o } = this.props,
      s = r.projection
    return (
      s &&
        ((s.isPresent = o),
        i || t.layoutDependency !== n || n === void 0 ? s.willUpdate() : this.safeToRemove(),
        t.isPresent !== o &&
          (o
            ? s.promote()
            : s.relegate() ||
              z.postRender(() => {
                const a = s.getStack()
                ;(!a || !a.members.length) && this.safeToRemove()
              }))),
      null
    )
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement
    t &&
      (t.root.didUpdate(),
      Wu.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove()
      }))
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r } = this.props,
      { projection: i } = t
    i &&
      (i.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(i),
      r && r.deregister && r.deregister(i))
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props
    t && t()
  }
  render() {
    return null
  }
}
function Om(e) {
  const [t, n] = V2(),
    r = L.useContext(E1)
  return El.jsx(e4, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: L.useContext(M1),
    isPresent: t,
    safeToRemove: n,
  })
}
const t4 = {
  borderRadius: {
    ...Vr,
    applyTo: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ],
  },
  borderTopLeftRadius: Vr,
  borderTopRightRadius: Vr,
  borderBottomLeftRadius: Vr,
  borderBottomRightRadius: Vr,
  boxShadow: qk,
}
function n4(e, t, n) {
  const r = me(e) ? e : Pi(e)
  return (r.start(ac('', r, t, n)), r.animation)
}
function r4(e) {
  return e instanceof SVGElement && e.tagName !== 'svg'
}
const i4 = (e, t) => e.depth - t.depth
class o4 {
  constructor() {
    ;((this.children = []), (this.isDirty = !1))
  }
  add(t) {
    ;(Xu(this.children, t), (this.isDirty = !0))
  }
  remove(t) {
    ;(Ju(this.children, t), (this.isDirty = !0))
  }
  forEach(t) {
    ;(this.isDirty && this.children.sort(i4), (this.isDirty = !1), this.children.forEach(t))
  }
}
function s4(e, t) {
  const n = st.now(),
    r = ({ timestamp: i }) => {
      const o = i - n
      o >= t && (Kt(r), e(o - t))
    }
  return (z.read(r, !0), () => Kt(r))
}
const Im = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  l4 = Im.length,
  kd = (e) => (typeof e == 'string' ? parseFloat(e) : e),
  Ed = (e) => typeof e == 'number' || j.test(e)
function a4(e, t, n, r, i, o) {
  i
    ? ((e.opacity = K(0, n.opacity !== void 0 ? n.opacity : 1, u4(r))),
      (e.opacityExit = K(t.opacity !== void 0 ? t.opacity : 1, 0, c4(r))))
    : o &&
      (e.opacity = K(t.opacity !== void 0 ? t.opacity : 1, n.opacity !== void 0 ? n.opacity : 1, r))
  for (let s = 0; s < l4; s++) {
    const a = `border${Im[s]}Radius`
    let l = xd(t, a),
      u = xd(n, a)
    if (l === void 0 && u === void 0) continue
    ;(l || (l = 0),
      u || (u = 0),
      l === 0 || u === 0 || Ed(l) === Ed(u)
        ? ((e[a] = Math.max(K(kd(l), kd(u), r), 0)), (ot.test(u) || ot.test(l)) && (e[a] += '%'))
        : (e[a] = u))
  }
  ;(t.rotate || n.rotate) && (e.rotate = K(t.rotate || 0, n.rotate || 0, r))
}
function xd(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius
}
const u4 = Bm(0, 0.5, im),
  c4 = Bm(0.5, 0.95, je)
function Bm(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(yr(e, t, r)))
}
function wd(e, t) {
  ;((e.min = t.min), (e.max = t.max))
}
function Ne(e, t) {
  ;(wd(e.x, t.x), wd(e.y, t.y))
}
function Ld(e, t) {
  ;((e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin))
}
function Sd(e, t, n, r, i) {
  return ((e -= t), (e = os(e, 1 / n, r)), i !== void 0 && (e = os(e, 1 / i, r)), e)
}
function f4(e, t = 0, n = 1, r = 0.5, i, o = e, s = e) {
  if (
    (ot.test(t) && ((t = parseFloat(t)), (t = K(s.min, s.max, t / 100) - s.min)),
    typeof t != 'number')
  )
    return
  let a = K(o.min, o.max, r)
  ;(e === o && (a -= t), (e.min = Sd(e.min, t, n, a, i)), (e.max = Sd(e.max, t, n, a, i)))
}
function Pd(e, t, [n, r, i], o, s) {
  f4(e, t[n], t[r], t[i], t.scale, o, s)
}
const d4 = ['x', 'scaleX', 'originX'],
  h4 = ['y', 'scaleY', 'originY']
function Cd(e, t, n, r) {
  ;(Pd(e.x, t, d4, n ? n.x : void 0, r ? r.x : void 0),
    Pd(e.y, t, h4, n ? n.y : void 0, r ? r.y : void 0))
}
function Td(e) {
  return e.translate === 0 && e.scale === 1
}
function zm(e) {
  return Td(e.x) && Td(e.y)
}
function Md(e, t) {
  return e.min === t.min && e.max === t.max
}
function p4(e, t) {
  return Md(e.x, t.x) && Md(e.y, t.y)
}
function Ad(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max)
}
function Um(e, t) {
  return Ad(e.x, t.x) && Ad(e.y, t.y)
}
function Rd(e) {
  return Fe(e.x) / Fe(e.y)
}
function jd(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint
}
class m4 {
  constructor() {
    this.members = []
  }
  add(t) {
    ;(Xu(this.members, t), t.scheduleRender())
  }
  remove(t) {
    if ((Ju(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead)) {
      const n = this.members[this.members.length - 1]
      n && this.promote(n)
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i)
    if (n === 0) return !1
    let r
    for (let i = n; i >= 0; i--) {
      const o = this.members[i]
      if (o.isPresent !== !1) {
        r = o
        break
      }
    }
    return r ? (this.promote(r), !0) : !1
  }
  promote(t, n) {
    const r = this.lead
    if (t !== r && ((this.prevLead = r), (this.lead = t), t.show(), r)) {
      ;(r.instance && r.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = r),
        n && (t.resumeFrom.preserveOpacity = !0),
        r.snapshot &&
          ((t.snapshot = r.snapshot),
          (t.snapshot.latestValues = r.animationValues || r.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0))
      const { crossfade: i } = t.options
      i === !1 && r.hide()
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t
      ;(n.onExitComplete && n.onExitComplete(),
        r && r.options.onExitComplete && r.options.onExitComplete())
    })
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1)
    })
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
  }
}
function g4(e, t, n) {
  let r = ''
  const i = e.x.translate / t.x,
    o = e.y.translate / t.y,
    s = (n == null ? void 0 : n.z) || 0
  if (
    ((i || o || s) && (r = `translate3d(${i}px, ${o}px, ${s}px) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const { transformPerspective: u, rotate: c, rotateX: d, rotateY: h, skewX: y, skewY: v } = n
    ;(u && (r = `perspective(${u}px) ${r}`),
      c && (r += `rotate(${c}deg) `),
      d && (r += `rotateX(${d}deg) `),
      h && (r += `rotateY(${h}deg) `),
      y && (r += `skewX(${y}deg) `),
      v && (r += `skewY(${v}deg) `))
  }
  const a = e.x.scale * t.x,
    l = e.y.scale * t.y
  return ((a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || 'none')
}
const sn = {
    type: 'projectionFrame',
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  Ur = typeof window < 'u' && window.MotionDebug !== void 0,
  ml = ['', 'X', 'Y', 'Z'],
  y4 = { visibility: 'hidden' },
  _d = 1e3
let v4 = 0
function gl(e, t, n, r) {
  const { latestValues: i } = t
  i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0))
}
function $m(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return
  const { visualElement: t } = e.options
  if (!t) return
  const n = X1(t)
  if (window.MotionHasOptimisedAnimation(n, 'transform')) {
    const { layout: i, layoutId: o } = e.options
    window.MotionCancelOptimisedAnimation(n, 'transform', z, !(i || o))
  }
  const { parent: r } = e
  r && !r.hasCheckedOptimisedAppear && $m(r)
}
function Hm({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(s = {}, a = t == null ? void 0 : t()) {
      ;((this.id = v4++),
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
            Ur && (sn.totalNodes = sn.resolvedTargetDeltas = sn.recalculatedProjection = 0),
            this.nodes.forEach(x4),
            this.nodes.forEach(C4),
            this.nodes.forEach(T4),
            this.nodes.forEach(w4),
            Ur && window.MotionDebug.record(sn))
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = s),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0))
      for (let l = 0; l < this.path.length; l++) this.path[l].shouldResetTransform = !0
      this.root === this && (this.nodes = new o4())
    }
    addEventListener(s, a) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new qu()),
        this.eventHandlers.get(s).add(a)
      )
    }
    notifyListeners(s, ...a) {
      const l = this.eventHandlers.get(s)
      l && l.notify(...a)
    }
    hasListeners(s) {
      return this.eventHandlers.has(s)
    }
    mount(s, a = this.root.hasTreeAnimated) {
      if (this.instance) return
      ;((this.isSVG = r4(s)), (this.instance = s))
      const { layoutId: l, layout: u, visualElement: c } = this.options
      if (
        (c && !c.current && c.mount(s),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        a && (u || l) && (this.isLayoutDirty = !0),
        e)
      ) {
        let d
        const h = () => (this.root.updateBlockedByResize = !1)
        e(s, () => {
          ;((this.root.updateBlockedByResize = !0),
            d && d(),
            (d = s4(h, 250)),
            Co.hasAnimatedSinceResize && ((Co.hasAnimatedSinceResize = !1), this.nodes.forEach(Dd)))
        })
      }
      ;(l && this.root.registerSharedNode(l, this),
        this.options.animate !== !1 &&
          c &&
          (l || u) &&
          this.addEventListener(
            'didUpdate',
            ({ delta: d, hasLayoutChanged: h, hasRelativeTargetChanged: y, layout: v }) => {
              if (this.isTreeAnimationBlocked()) {
                ;((this.target = void 0), (this.relativeTarget = void 0))
                return
              }
              const k = this.options.transition || c.getDefaultTransition() || _4,
                { onLayoutAnimationStart: E, onLayoutAnimationComplete: m } = c.getProps(),
                p = !this.targetLayout || !Um(this.targetLayout, v) || y,
                g = !h && y
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                g ||
                (h && (p || !this.currentAnimation))
              ) {
                ;(this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(d, g))
                const x = { ...Yu(k, 'layout'), onPlay: E, onComplete: m }
                ;((c.shouldReduceMotion || this.options.layoutRoot) &&
                  ((x.delay = 0), (x.type = !1)),
                  this.startAnimation(x))
              } else
                (h || Dd(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete())
              this.targetLayout = v
            }
          ))
    }
    unmount() {
      ;(this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this))
      const s = this.getStack()
      ;(s && s.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Kt(this.updateProjection))
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
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(M4), this.animationId++)
    }
    getTransformTemplate() {
      const { visualElement: s } = this.options
      return s && s.getProps().transformTemplate
    }
    willUpdate(s = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete()
        return
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && $m(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return
      this.isLayoutDirty = !0
      for (let c = 0; c < this.path.length; c++) {
        const d = this.path[c]
        ;((d.shouldResetTransform = !0),
          d.updateScroll('snapshot'),
          d.options.layoutRoot && d.willUpdate(!1))
      }
      const { layoutId: a, layout: l } = this.options
      if (a === void 0 && !l) return
      const u = this.getTransformTemplate()
      ;((this.prevTransformTemplateValue = u ? u(this.latestValues, '') : void 0),
        this.updateSnapshot(),
        s && this.notifyListeners('willUpdate'))
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        ;(this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Fd))
        return
      }
      ;(this.isUpdating || this.nodes.forEach(S4),
        (this.isUpdating = !1),
        this.nodes.forEach(P4),
        this.nodes.forEach(k4),
        this.nodes.forEach(E4),
        this.clearAllSnapshots())
      const a = st.now()
      ;((ae.delta = Et(0, 1e3 / 60, a - ae.timestamp)),
        (ae.timestamp = a),
        (ae.isProcessing = !0),
        sl.update.process(ae),
        sl.preRender.process(ae),
        sl.render.process(ae),
        (ae.isProcessing = !1))
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), Wu.read(this.scheduleUpdate))
    }
    clearAllSnapshots() {
      ;(this.nodes.forEach(L4), this.sharedNodes.forEach(A4))
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), z.preRender(this.updateProjection, !1, !0))
    }
    scheduleCheckAfterUnmount() {
      z.postRender(() => {
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
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll()
      const s = this.layout
      ;((this.layout = this.measure(!1)),
        (this.layoutCorrected = J()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox))
      const { visualElement: a } = this.options
      a && a.notify('LayoutMeasure', this.layout.layoutBox, s ? s.layoutBox : void 0)
    }
    updateScroll(s = 'measure') {
      let a = !!(this.options.layoutScroll && this.instance)
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === s &&
          (a = !1),
        a)
      ) {
        const l = r(this.instance)
        this.scroll = {
          animationId: this.root.animationId,
          phase: s,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l,
        }
      }
    }
    resetTransform() {
      if (!i) return
      const s = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        a = this.projectionDelta && !zm(this.projectionDelta),
        l = this.getTransformTemplate(),
        u = l ? l(this.latestValues, '') : void 0,
        c = u !== this.prevTransformTemplateValue
      s &&
        (a || on(this.latestValues) || c) &&
        (i(this.instance, u), (this.shouldResetTransform = !1), this.scheduleRender())
    }
    measure(s = !0) {
      const a = this.measurePageBox()
      let l = this.removeElementScroll(a)
      return (
        s && (l = this.removeTransform(l)),
        F4(l),
        {
          animationId: this.root.animationId,
          measuredBox: a,
          layoutBox: l,
          latestValues: {},
          source: this.id,
        }
      )
    }
    measurePageBox() {
      var s
      const { visualElement: a } = this.options
      if (!a) return J()
      const l = a.measureViewportBox()
      if (
        !(((s = this.scroll) === null || s === void 0 ? void 0 : s.wasRoot) || this.path.some(D4))
      ) {
        const { scroll: c } = this.root
        c && (tr(l.x, c.offset.x), tr(l.y, c.offset.y))
      }
      return l
    }
    removeElementScroll(s) {
      var a
      const l = J()
      if ((Ne(l, s), !((a = this.scroll) === null || a === void 0) && a.wasRoot)) return l
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u],
          { scroll: d, options: h } = c
        c !== this.root &&
          d &&
          h.layoutScroll &&
          (d.wasRoot && Ne(l, s), tr(l.x, d.offset.x), tr(l.y, d.offset.y))
      }
      return l
    }
    applyTransform(s, a = !1) {
      const l = J()
      Ne(l, s)
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u]
        ;(!a &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          nr(l, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
          on(c.latestValues) && nr(l, c.latestValues))
      }
      return (on(this.latestValues) && nr(l, this.latestValues), l)
    }
    removeTransform(s) {
      const a = J()
      Ne(a, s)
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l]
        if (!u.instance || !on(u.latestValues)) continue
        Aa(u.latestValues) && u.updateSnapshot()
        const c = J(),
          d = u.measurePageBox()
        ;(Ne(c, d), Cd(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c))
      }
      return (on(this.latestValues) && Cd(a, this.latestValues), a)
    }
    setTargetDelta(s) {
      ;((this.targetDelta = s), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0))
    }
    setOptions(s) {
      this.options = { ...this.options, ...s, crossfade: s.crossfade !== void 0 ? s.crossfade : !0 }
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
        this.relativeParent.resolvedRelativeTargetAt !== ae.timestamp &&
        this.relativeParent.resolveTargetDelta(!0)
    }
    resolveTargetDelta(s = !1) {
      var a
      const l = this.getLead()
      ;(this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = l.isSharedProjectionDirty))
      const u = !!this.resumingFrom || this !== l
      if (
        !(
          s ||
          (u && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((a = this.parent) === null || a === void 0) && a.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return
      const { layout: d, layoutId: h } = this.options
      if (!(!this.layout || !(d || h))) {
        if (
          ((this.resolvedRelativeTargetAt = ae.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const y = this.getClosestProjectingParent()
          y && y.layout && this.animationProgress !== 1
            ? ((this.relativeParent = y),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = J()),
              (this.relativeTargetOrigin = J()),
              ri(this.relativeTargetOrigin, this.layout.layoutBox, y.layout.layoutBox),
              Ne(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0)
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target || ((this.target = J()), (this.targetWithTransforms = J())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                Wk(this.target, this.relativeTarget, this.relativeParent.target))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : Ne(this.target, this.layout.layoutBox),
                  Vm(this.target, this.targetDelta))
                : Ne(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1
            const y = this.getClosestProjectingParent()
            y &&
            !!y.resumingFrom == !!this.resumingFrom &&
            !y.options.layoutScroll &&
            y.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = y),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = J()),
                (this.relativeTargetOrigin = J()),
                ri(this.relativeTargetOrigin, this.target, y.target),
                Ne(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0)
          }
          Ur && sn.resolvedTargetDeltas++
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Aa(this.parent.latestValues) || Dm(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
    }
    calcProjection() {
      var s
      const a = this.getLead(),
        l = !!this.resumingFrom || this !== a
      let u = !0
      if (
        ((this.isProjectionDirty ||
          (!((s = this.parent) === null || s === void 0) && s.isProjectionDirty)) &&
          (u = !1),
        l && (this.isSharedProjectionDirty || this.isTransformDirty) && (u = !1),
        this.resolvedRelativeTargetAt === ae.timestamp && (u = !1),
        u)
      )
        return
      const { layout: c, layoutId: d } = this.options
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(c || d))
      )
        return
      Ne(this.layoutCorrected, this.layout.layoutBox)
      const h = this.treeScale.x,
        y = this.treeScale.y
      ;(Zk(this.layoutCorrected, this.treeScale, this.path, l),
        a.layout &&
          !a.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((a.target = a.layout.layoutBox), (a.targetWithTransforms = J())))
      const { target: v } = a
      if (!v) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender())
        return
      }
      ;(!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (Ld(this.prevProjectionDelta.x, this.projectionDelta.x),
          Ld(this.prevProjectionDelta.y, this.projectionDelta.y)),
        ni(this.projectionDelta, this.layoutCorrected, v, this.latestValues),
        (this.treeScale.x !== h ||
          this.treeScale.y !== y ||
          !jd(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !jd(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners('projectionUpdate', v)),
        Ur && sn.recalculatedProjection++)
    }
    hide() {
      this.isVisible = !1
    }
    show() {
      this.isVisible = !0
    }
    scheduleRender(s = !0) {
      var a
      if (((a = this.options.visualElement) === null || a === void 0 || a.scheduleRender(), s)) {
        const l = this.getStack()
        l && l.scheduleRender()
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
    }
    createProjectionDeltas() {
      ;((this.prevProjectionDelta = er()),
        (this.projectionDelta = er()),
        (this.projectionDeltaWithTransform = er()))
    }
    setAnimationOrigin(s, a = !1) {
      const l = this.snapshot,
        u = l ? l.latestValues : {},
        c = { ...this.latestValues },
        d = er()
      ;((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a))
      const h = J(),
        y = l ? l.source : void 0,
        v = this.layout ? this.layout.source : void 0,
        k = y !== v,
        E = this.getStack(),
        m = !E || E.members.length <= 1,
        p = !!(k && !m && this.options.crossfade === !0 && !this.path.some(j4))
      this.animationProgress = 0
      let g
      ;((this.mixTargetDelta = (x) => {
        const w = x / 1e3
        ;(Vd(d.x, s.x, w),
          Vd(d.y, s.y, w),
          this.setTargetDelta(d),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (ri(h, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            R4(this.relativeTarget, this.relativeTargetOrigin, h, w),
            g && p4(this.relativeTarget, g) && (this.isProjectionDirty = !1),
            g || (g = J()),
            Ne(g, this.relativeTarget)),
          k && ((this.animationValues = c), a4(c, u, this.latestValues, w, p, m)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = w))
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0))
    }
    startAnimation(s) {
      ;(this.notifyListeners('animationStart'),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation && (Kt(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = z.update(() => {
          ;((Co.hasAnimatedSinceResize = !0),
            (this.currentAnimation = n4(0, _d, {
              ...s,
              onUpdate: (a) => {
                ;(this.mixTargetDelta(a), s.onUpdate && s.onUpdate(a))
              },
              onComplete: () => {
                ;(s.onComplete && s.onComplete(), this.completeAnimation())
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
      const s = this.getStack()
      ;(s && s.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners('animationComplete'))
    }
    finishAnimation() {
      ;(this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(_d), this.currentAnimation.stop()),
        this.completeAnimation())
    }
    applyTransformsToTarget() {
      const s = this.getLead()
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = s
      if (!(!a || !l || !u)) {
        if (
          this !== s &&
          this.layout &&
          u &&
          Km(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          l = this.target || J()
          const d = Fe(this.layout.layoutBox.x)
          ;((l.x.min = s.target.x.min), (l.x.max = l.x.min + d))
          const h = Fe(this.layout.layoutBox.y)
          ;((l.y.min = s.target.y.min), (l.y.max = l.y.min + h))
        }
        ;(Ne(a, l), nr(a, c), ni(this.projectionDeltaWithTransform, this.layoutCorrected, a, c))
      }
    }
    registerSharedNode(s, a) {
      ;(this.sharedNodes.has(s) || this.sharedNodes.set(s, new m4()),
        this.sharedNodes.get(s).add(a))
      const u = a.options.initialPromotionConfig
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity:
          u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0,
      })
    }
    isLead() {
      const s = this.getStack()
      return s ? s.lead === this : !0
    }
    getLead() {
      var s
      const { layoutId: a } = this.options
      return a ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) || this : this
    }
    getPrevLead() {
      var s
      const { layoutId: a } = this.options
      return a ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.prevLead) : void 0
    }
    getStack() {
      const { layoutId: s } = this.options
      if (s) return this.root.sharedNodes.get(s)
    }
    promote({ needsReset: s, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack()
      ;(u && u.promote(this, l),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        a && this.setOptions({ transition: a }))
    }
    relegate() {
      const s = this.getStack()
      return s ? s.relegate(this) : !1
    }
    resetSkewAndRotation() {
      const { visualElement: s } = this.options
      if (!s) return
      let a = !1
      const { latestValues: l } = s
      if (
        ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0),
        !a)
      )
        return
      const u = {}
      l.z && gl('z', s, u, this.animationValues)
      for (let c = 0; c < ml.length; c++)
        (gl(`rotate${ml[c]}`, s, u, this.animationValues),
          gl(`skew${ml[c]}`, s, u, this.animationValues))
      s.render()
      for (const c in u)
        (s.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]))
      s.scheduleRender()
    }
    getProjectionStyles(s) {
      var a, l
      if (!this.instance || this.isSVG) return
      if (!this.isVisible) return y4
      const u = { visibility: '' },
        c = this.getTransformTemplate()
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (u.opacity = ''),
          (u.pointerEvents = So(s == null ? void 0 : s.pointerEvents) || ''),
          (u.transform = c ? c(this.latestValues, '') : 'none'),
          u
        )
      const d = this.getLead()
      if (!this.projectionDelta || !this.layout || !d.target) {
        const k = {}
        return (
          this.options.layoutId &&
            ((k.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
            (k.pointerEvents = So(s == null ? void 0 : s.pointerEvents) || '')),
          this.hasProjected &&
            !on(this.latestValues) &&
            ((k.transform = c ? c({}, '') : 'none'), (this.hasProjected = !1)),
          k
        )
      }
      const h = d.animationValues || d.latestValues
      ;(this.applyTransformsToTarget(),
        (u.transform = g4(this.projectionDeltaWithTransform, this.treeScale, h)),
        c && (u.transform = c(h, u.transform)))
      const { x: y, y: v } = this.projectionDelta
      ;((u.transformOrigin = `${y.origin * 100}% ${v.origin * 100}% 0`),
        d.animationValues
          ? (u.opacity =
              d === this
                ? (l = (a = h.opacity) !== null && a !== void 0 ? a : this.latestValues.opacity) !==
                    null && l !== void 0
                  ? l
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : h.opacityExit)
          : (u.opacity =
              d === this
                ? h.opacity !== void 0
                  ? h.opacity
                  : ''
                : h.opacityExit !== void 0
                  ? h.opacityExit
                  : 0))
      for (const k in es) {
        if (h[k] === void 0) continue
        const { correct: E, applyTo: m } = es[k],
          p = u.transform === 'none' ? h[k] : E(h[k], d)
        if (m) {
          const g = m.length
          for (let x = 0; x < g; x++) u[m[x]] = p
        } else u[k] = p
      }
      return (
        this.options.layoutId &&
          (u.pointerEvents = d === this ? So(s == null ? void 0 : s.pointerEvents) || '' : 'none'),
        u
      )
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0
    }
    resetTree() {
      ;(this.root.nodes.forEach((s) => {
        var a
        return (a = s.currentAnimation) === null || a === void 0 ? void 0 : a.stop()
      }),
        this.root.nodes.forEach(Fd),
        this.root.sharedNodes.clear())
    }
  }
}
function k4(e) {
  e.updateLayout()
}
function E4(e) {
  var t
  const n = ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) || e.snapshot
  if (e.isLead() && e.layout && n && e.hasListeners('didUpdate')) {
    const { layoutBox: r, measuredBox: i } = e.layout,
      { animationType: o } = e.options,
      s = n.source !== e.layout.source
    o === 'size'
      ? Oe((d) => {
          const h = s ? n.measuredBox[d] : n.layoutBox[d],
            y = Fe(h)
          ;((h.min = r[d].min), (h.max = h.min + y))
        })
      : Km(o, n.layoutBox, r) &&
        Oe((d) => {
          const h = s ? n.measuredBox[d] : n.layoutBox[d],
            y = Fe(r[d])
          ;((h.max = h.min + y),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0), (e.relativeTarget[d].max = e.relativeTarget[d].min + y)))
        })
    const a = er()
    ni(a, r, n.layoutBox)
    const l = er()
    s ? ni(l, e.applyTransform(i, !0), n.measuredBox) : ni(l, r, n.layoutBox)
    const u = !zm(a)
    let c = !1
    if (!e.resumeFrom) {
      const d = e.getClosestProjectingParent()
      if (d && !d.resumeFrom) {
        const { snapshot: h, layout: y } = d
        if (h && y) {
          const v = J()
          ri(v, n.layoutBox, h.layoutBox)
          const k = J()
          ;(ri(k, r, y.layoutBox),
            Um(v, k) || (c = !0),
            d.options.layoutRoot &&
              ((e.relativeTarget = k), (e.relativeTargetOrigin = v), (e.relativeParent = d)))
        }
      }
    }
    e.notifyListeners('didUpdate', {
      layout: r,
      snapshot: n,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeTargetChanged: c,
    })
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options
    r && r()
  }
  e.options.transition = void 0
}
function x4(e) {
  ;(Ur && sn.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty)))
}
function w4(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1
}
function L4(e) {
  e.clearSnapshot()
}
function Fd(e) {
  e.clearMeasurements()
}
function S4(e) {
  e.isLayoutDirty = !1
}
function P4(e) {
  const { visualElement: t } = e.options
  ;(t && t.getProps().onBeforeLayoutMeasure && t.notify('BeforeLayoutMeasure'), e.resetTransform())
}
function Dd(e) {
  ;(e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0))
}
function C4(e) {
  e.resolveTargetDelta()
}
function T4(e) {
  e.calcProjection()
}
function M4(e) {
  e.resetSkewAndRotation()
}
function A4(e) {
  e.removeLeadSnapshot()
}
function Vd(e, t, n) {
  ;((e.translate = K(t.translate, 0, n)),
    (e.scale = K(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint))
}
function Nd(e, t, n, r) {
  ;((e.min = K(t.min, n.min, r)), (e.max = K(t.max, n.max, r)))
}
function R4(e, t, n, r) {
  ;(Nd(e.x, t.x, n.x, r), Nd(e.y, t.y, n.y, r))
}
function j4(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0
}
const _4 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Wd = (e) =>
    typeof navigator < 'u' && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
  Od = Wd('applewebkit/') && !Wd('chrome/') ? Math.round : je
function Id(e) {
  ;((e.min = Od(e.min)), (e.max = Od(e.max)))
}
function F4(e) {
  ;(Id(e.x), Id(e.y))
}
function Km(e, t, n) {
  return e === 'position' || (e === 'preserve-aspect' && !Nk(Rd(t), Rd(n), 0.2))
}
function D4(e) {
  var t
  return e !== e.root && ((t = e.scroll) === null || t === void 0 ? void 0 : t.wasRoot)
}
const V4 = Hm({
    attachResizeListener: (e, t) => Ti(e, 'resize', t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  yl = { current: void 0 },
  Zm = Hm({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!yl.current) {
        const e = new V4({})
        ;(e.mount(window), e.setOptions({ layoutScroll: !0 }), (yl.current = e))
      }
      return yl.current
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : 'none'
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === 'fixed',
  }),
  N4 = { pan: { Feature: Jk }, drag: { Feature: Xk, ProjectionNode: Zm, MeasureLayout: Om } }
function Bd(e, t, n) {
  const { props: r } = e
  e.animationState && r.whileHover && e.animationState.setActive('whileHover', n === 'Start')
  const i = 'onHover' + n,
    o = r[i]
  o && z.postRender(() => o(t, Ni(t)))
}
class W4 extends Xt {
  mount() {
    const { current: t } = this.node
    t && (this.unmount = Nv(t, (n) => (Bd(this.node, n, 'Start'), (r) => Bd(this.node, r, 'End'))))
  }
  unmount() {}
}
class O4 extends Xt {
  constructor() {
    ;(super(...arguments), (this.isActive = !1))
  }
  onFocus() {
    let t = !1
    try {
      t = this.node.current.matches(':focus-visible')
    } catch {
      t = !0
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !0), (this.isActive = !0))
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !1), (this.isActive = !1))
  }
  mount() {
    this.unmount = Vi(
      Ti(this.node.current, 'focus', () => this.onFocus()),
      Ti(this.node.current, 'blur', () => this.onBlur())
    )
  }
  unmount() {}
}
function zd(e, t, n) {
  const { props: r } = e
  e.animationState && r.whileTap && e.animationState.setActive('whileTap', n === 'Start')
  const i = 'onTap' + (n === 'End' ? '' : n),
    o = r[i]
  o && z.postRender(() => o(t, Ni(t)))
}
class I4 extends Xt {
  mount() {
    const { current: t } = this.node
    t &&
      (this.unmount = Bv(
        t,
        (n) => (
          zd(this.node, n, 'Start'),
          (r, { success: i }) => zd(this.node, r, i ? 'End' : 'Cancel')
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ))
  }
  unmount() {}
}
const ja = new WeakMap(),
  vl = new WeakMap(),
  B4 = (e) => {
    const t = ja.get(e.target)
    t && t(e)
  },
  z4 = (e) => {
    e.forEach(B4)
  }
function U4({ root: e, ...t }) {
  const n = e || document
  vl.has(n) || vl.set(n, {})
  const r = vl.get(n),
    i = JSON.stringify(t)
  return (r[i] || (r[i] = new IntersectionObserver(z4, { root: e, ...t })), r[i])
}
function $4(e, t, n) {
  const r = U4(t)
  return (
    ja.set(e, n),
    r.observe(e),
    () => {
      ;(ja.delete(e), r.unobserve(e))
    }
  )
}
const H4 = { some: 0, all: 1 }
class K4 extends Xt {
  constructor() {
    ;(super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1))
  }
  startObserver() {
    this.unmount()
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: r, amount: i = 'some', once: o } = t,
      s = {
        root: n ? n.current : void 0,
        rootMargin: r,
        threshold: typeof i == 'number' ? i : H4[i],
      },
      a = (l) => {
        const { isIntersecting: u } = l
        if (this.isInView === u || ((this.isInView = u), o && !u && this.hasEnteredView)) return
        ;(u && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive('whileInView', u))
        const { onViewportEnter: c, onViewportLeave: d } = this.node.getProps(),
          h = u ? c : d
        h && h(l)
      }
    return $4(this.node.current, s, a)
  }
  mount() {
    this.startObserver()
  }
  update() {
    if (typeof IntersectionObserver > 'u') return
    const { props: t, prevProps: n } = this.node
    ;['amount', 'margin', 'root'].some(Z4(t, n)) && this.startObserver()
  }
  unmount() {}
}
function Z4({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n]
}
const Y4 = {
    inView: { Feature: K4 },
    tap: { Feature: I4 },
    focus: { Feature: O4 },
    hover: { Feature: W4 },
  },
  Q4 = { layout: { ProjectionNode: Zm, MeasureLayout: Om } },
  _a = { current: null },
  Ym = { current: !1 }
function b4() {
  if (((Ym.current = !0), !!_u))
    if (window.matchMedia) {
      const e = window.matchMedia('(prefers-reduced-motion)'),
        t = () => (_a.current = e.matches)
      ;(e.addListener(t), t())
    } else _a.current = !1
}
const G4 = [...vm, he, Zt],
  X4 = (e) => G4.find(ym(e)),
  Ud = new WeakMap()
function J4(e, t, n) {
  for (const r in t) {
    const i = t[r],
      o = n[r]
    if (me(i)) e.addValue(r, i)
    else if (me(o)) e.addValue(r, Pi(i, { owner: e }))
    else if (o !== i)
      if (e.hasValue(r)) {
        const s = e.getValue(r)
        s.liveStyle === !0 ? s.jump(i) : s.hasAnimated || s.set(i)
      } else {
        const s = e.getStaticValue(r)
        e.addValue(r, Pi(s !== void 0 ? s : i, { owner: e }))
      }
  }
  for (const r in n) t[r] === void 0 && e.removeValue(r)
  return t
}
const $d = [
  'AnimationStart',
  'AnimationComplete',
  'Update',
  'BeforeLayoutMeasure',
  'LayoutMeasure',
  'LayoutAnimationStart',
  'LayoutAnimationComplete',
]
class q4 {
  scrapeMotionValuesFromProps(t, n, r) {
    return {}
  }
  constructor(
    {
      parent: t,
      props: n,
      presenceContext: r,
      reducedMotionConfig: i,
      blockInitialAnimation: o,
      visualState: s,
    },
    a = {}
  ) {
    ;((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = oc),
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
        const y = st.now()
        this.renderScheduledAt < y && ((this.renderScheduledAt = y), z.render(this.render, !1, !0))
      }))
    const { latestValues: l, renderState: u, onUpdate: c } = s
    ;((this.onUpdate = c),
      (this.latestValues = l),
      (this.baseTarget = { ...l }),
      (this.initialValues = n.initial ? { ...l } : {}),
      (this.renderState = u),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = r),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = a),
      (this.blockInitialAnimation = !!o),
      (this.isControllingVariants = As(n)),
      (this.isVariantNode = C1(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current)))
    const { willChange: d, ...h } = this.scrapeMotionValuesFromProps(n, {}, this)
    for (const y in h) {
      const v = h[y]
      l[y] !== void 0 && me(v) && v.set(l[y], !1)
    }
  }
  mount(t) {
    ;((this.current = t),
      Ud.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
      Ym.current || b4(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === 'never'
          ? !1
          : this.reducedMotionConfig === 'always'
            ? !0
            : _a.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext))
  }
  unmount() {
    ;(Ud.delete(this.current),
      this.projection && this.projection.unmount(),
      Kt(this.notifyUpdate),
      Kt(this.render),
      this.valueSubscriptions.forEach((t) => t()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this))
    for (const t in this.events) this.events[t].clear()
    for (const t in this.features) {
      const n = this.features[t]
      n && (n.unmount(), (n.isMounted = !1))
    }
    this.current = null
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)()
    const r = Ln.has(t),
      i = n.on('change', (a) => {
        ;((this.latestValues[t] = a),
          this.props.onUpdate && z.preRender(this.notifyUpdate),
          r && this.projection && (this.projection.isTransformDirty = !0))
      }),
      o = n.on('renderRequest', this.scheduleRender)
    let s
    ;(window.MotionCheckAppearSync && (s = window.MotionCheckAppearSync(this, t, n)),
      this.valueSubscriptions.set(t, () => {
        ;(i(), o(), s && s(), n.owner && n.stop())
      }))
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current)
  }
  updateFeatures() {
    let t = 'animation'
    for (t in vr) {
      const n = vr[t]
      if (!n) continue
      const { isEnabled: r, Feature: i } = n
      if (
        (!this.features[t] && i && r(this.props) && (this.features[t] = new i(this)),
        this.features[t])
      ) {
        const o = this.features[t]
        o.isMounted ? o.update() : (o.mount(), (o.isMounted = !0))
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props)
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : J()
  }
  getStaticValue(t) {
    return this.latestValues[t]
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n
  }
  update(t, n) {
    ;((t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n))
    for (let r = 0; r < $d.length; r++) {
      const i = $d[r]
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i])
      const o = 'on' + i,
        s = t[o]
      s && (this.propEventSubscriptions[i] = this.on(i, s))
    }
    ;((this.prevMotionValues = J4(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue(),
      this.onUpdate && this.onUpdate(this))
  }
  getProps() {
    return this.props
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0
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
  addVariantChild(t) {
    const n = this.getClosestVariantNode()
    if (n) return (n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t))
  }
  addValue(t, n) {
    const r = this.values.get(t)
    n !== r &&
      (r && this.removeValue(t),
      this.bindToMotionValue(t, n),
      this.values.set(t, n),
      (this.latestValues[t] = n.get()))
  }
  removeValue(t) {
    this.values.delete(t)
    const n = this.valueSubscriptions.get(t)
    ;(n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState))
  }
  hasValue(t) {
    return this.values.has(t)
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t]
    let r = this.values.get(t)
    return (
      r === void 0 &&
        n !== void 0 &&
        ((r = Pi(n === null ? void 0 : n, { owner: this })), this.addValue(t, r)),
      r
    )
  }
  readValue(t, n) {
    var r
    let i =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (r = this.getBaseTargetFromProps(this.props, t)) !== null && r !== void 0
          ? r
          : this.readValueFromInstance(this.current, t, this.options)
    return (
      i != null &&
        (typeof i == 'string' && (mm(i) || sm(i))
          ? (i = parseFloat(i))
          : !X4(i) && Zt.test(n) && (i = dm(t, n)),
        this.setBaseTarget(t, me(i) ? i.get() : i)),
      me(i) ? i.get() : i
    )
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n
  }
  getBaseTarget(t) {
    var n
    const { initial: r } = this.props
    let i
    if (typeof r == 'string' || typeof r == 'object') {
      const s = Iu(
        this.props,
        r,
        (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom
      )
      s && (i = s[t])
    }
    if (r && i !== void 0) return i
    const o = this.getBaseTargetFromProps(this.props, t)
    return o !== void 0 && !me(o)
      ? o
      : this.initialValues[t] !== void 0 && i === void 0
        ? void 0
        : this.baseTarget[t]
  }
  on(t, n) {
    return (this.events[t] || (this.events[t] = new qu()), this.events[t].add(n))
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n)
  }
}
class Qm extends q4 {
  constructor() {
    ;(super(...arguments), (this.KeyframeResolver = km))
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    ;(delete n[t], delete r[t])
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription)
    const { children: t } = this.props
    me(t) &&
      (this.childSubscription = t.on('change', (n) => {
        this.current && (this.current.textContent = `${n}`)
      }))
  }
}
function eE(e) {
  return window.getComputedStyle(e)
}
class tE extends Qm {
  constructor() {
    ;(super(...arguments), (this.type = 'html'), (this.renderInstance = V1))
  }
  readValueFromInstance(t, n) {
    if (Ln.has(n)) {
      const r = ic(n)
      return (r && r.default) || 0
    } else {
      const r = eE(t),
        i = (_1(n) ? r.getPropertyValue(n) : r[n]) || 0
      return typeof i == 'string' ? i.trim() : i
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Nm(t, n)
  }
  build(t, n, r) {
    Uu(t, n, r.transformTemplate)
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return Zu(t, n, r)
  }
}
class nE extends Qm {
  constructor() {
    ;(super(...arguments),
      (this.type = 'svg'),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = J))
  }
  getBaseTargetFromProps(t, n) {
    return t[n]
  }
  readValueFromInstance(t, n) {
    if (Ln.has(n)) {
      const r = ic(n)
      return (r && r.default) || 0
    }
    return ((n = N1.has(n) ? n : Nu(n)), t.getAttribute(n))
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return I1(t, n, r)
  }
  build(t, n, r) {
    $u(t, n, this.isSVGTag, r.transformTemplate)
  }
  renderInstance(t, n, r, i) {
    W1(t, n, r, i)
  }
  mount(t) {
    ;((this.isSVGTag = Ku(t.tagName)), super.mount(t))
  }
}
const rE = (e, t) => (Ou(e) ? new nE(t) : new tE(t, { allowProjection: e !== L.Fragment })),
  iE = Av({ ...Tk, ...Y4, ...N4, ...Q4 }, rE),
  x6 = H2(iE)
var oE = L.createContext({ color: 'currentColor', size: '1em', weight: 'regular', mirrored: !1 }),
  Te = function (t, n, r) {
    var i = r.get(t)
    return i
      ? i(n)
      : (console.error(
          'Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".'
        ),
        null)
  }
function Hd(e, t) {
  if (e == null) return {}
  var n = {},
    r = Object.keys(e),
    i,
    o
  for (o = 0; o < r.length; o++) ((i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]))
  return n
}
var xe = L.forwardRef(function (e, t) {
  var n = e.alt,
    r = e.color,
    i = e.size,
    o = e.weight,
    s = e.mirrored,
    a = e.children,
    l = e.renderPath,
    u = Hd(e, ['alt', 'color', 'size', 'weight', 'mirrored', 'children', 'renderPath']),
    c = L.useContext(oE),
    d = c.color,
    h = d === void 0 ? 'currentColor' : d,
    y = c.size,
    v = c.weight,
    k = v === void 0 ? 'regular' : v,
    E = c.mirrored,
    m = E === void 0 ? !1 : E,
    p = Hd(c, ['color', 'size', 'weight', 'mirrored'])
  return f.createElement(
    'svg',
    Object.assign(
      {
        ref: t,
        xmlns: 'http://www.w3.org/2000/svg',
        width: i ?? y,
        height: i ?? y,
        fill: r ?? h,
        viewBox: '0 0 256 256',
        transform: s || m ? 'scale(-1, 1)' : void 0,
      },
      p,
      u
    ),
    !!n && f.createElement('title', null, n),
    a,
    f.createElement('rect', { width: '256', height: '256', fill: 'none' }),
    l(o ?? k, r ?? h)
  )
})
xe.displayName = 'IconBase'
var Sn = new Map()
Sn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Sn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', { d: 'M128,128,44.9,176h-.1A96.1,96.1,0,0,1,128,32Z', opacity: '0.2' }),
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Sn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M218.3,76.4a.8.8,0,0,1-.2-.4l-.4-.5a104,104,0,0,0-180,104.1l.2.4.3.4a104,104,0,0,0,180.1-104Zm-18.4.9L136,114.1V40.4A88.2,88.2,0,0,1,199.9,77.3ZM128,216a88,88,0,0,1-71.9-37.3L207.9,91.1A88,88,0,0,1,128,216Z',
    })
  )
})
Sn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Sn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Sn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '96',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '128',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '211.1',
      y1: '80',
      x2: '44.9',
      y2: '176',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var sE = function (t, n) {
    return Te(t, n, Sn)
  },
  lE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: sE }))
  })
lE.displayName = 'ChartPie'
var Pn = new Map()
Pn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M184.6,128H224a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H71.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('circle', { cx: '188', cy: '168', r: '16' })
  )
})
Pn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('rect', {
      x: '24',
      y: '128',
      width: '208',
      height: '80',
      rx: '8',
      opacity: '0.2',
    }),
    f.createElement('path', {
      d: 'M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('circle', { cx: '188', cy: '168', r: '12' })
  )
})
Pn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M74.3,85.7A8.1,8.1,0,0,1,85.7,74.3L120,108.7V24a8,8,0,0,1,16,0v84.7l34.3-34.4a8.1,8.1,0,0,1,11.4,11.4l-48,48a8.2,8.2,0,0,1-11.4,0ZM240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H84.4a3.6,3.6,0,0,1,2.8,1.2L111,145a24.1,24.1,0,0,0,34,0l23.8-23.8a3.6,3.6,0,0,1,2.8-1.2H224A16,16,0,0,1,240,136Zm-40,32a12,12,0,1,0-12,12A12,12,0,0,0,200,168Z',
    })
  )
})
Pn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('circle', { cx: '188', cy: '168', r: '10' })
  )
})
Pn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('circle', { cx: '188', cy: '168', r: '8' })
  )
})
Pn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '24',
      x2: '128',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '80 80 128 128 176 80',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('circle', { cx: '188', cy: '168', r: '12' })
  )
})
var aE = function (t, n) {
    return Te(t, n, Pn)
  },
  uE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: aE }))
  })
uE.displayName = 'Download'
var Cn = new Map()
Cn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Cn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z',
      opacity: '0.2',
    }),
    f.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Cn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M247.3,124.8c-.3-.8-8.8-19.6-27.6-38.5C194.6,61.3,162.9,48,128,48S61.4,61.3,36.3,86.3C17.5,105.2,9,124,8.7,124.8a7.9,7.9,0,0,0,0,6.4c.3.8,8.8,19.6,27.6,38.5C61.4,194.7,93.1,208,128,208s66.6-13.3,91.7-38.3c18.8-18.9,27.3-37.7,27.6-38.5A7.9,7.9,0,0,0,247.3,124.8ZM128,92a36,36,0,1,1-36,36A36,36,0,0,1,128,92Z',
    })
  )
})
Cn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Cn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Cn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('circle', {
      cx: '128',
      cy: '128',
      r: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var cE = function (t, n) {
    return Te(t, n, Cn)
  },
  fE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: cE }))
  })
fE.displayName = 'Eye'
var Tn = new Map()
Tn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M214.4,163.6C232.1,145.7,240,128,240,128S208,56,128,56c-3.8,0-7.4.2-11,.5',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Tn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z',
      opacity: '0.2',
    }),
    f.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M154.9,157.6A39.6,39.6,0,0,1,128,168a40,40,0,0,1-26.9-69.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M208.6,169.1C230.4,149.6,240,128,240,128S208,56,128,56a123.9,123.9,0,0,0-20.7,1.7',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M135.5,88.7a39.9,39.9,0,0,1,32.3,35.5',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Tn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M247.3,124.8c-.3-.8-8.8-19.6-27.6-38.5C194.6,61.3,162.9,48,128,48a132.4,132.4,0,0,0-22,1.8,8.1,8.1,0,0,0-4.6,13.3L202.7,174.5a8,8,0,0,0,5.9,2.6,8.6,8.6,0,0,0,5.4-2c22.8-20.5,32.9-42.9,33.3-43.8A8.2,8.2,0,0,0,247.3,124.8Z',
    }),
    f.createElement('path', {
      d: 'M53.9,34.6A8,8,0,0,0,42.1,45.4L61.3,66.5C25,88.8,9.4,123.2,8.7,124.8a8.2,8.2,0,0,0,0,6.5c.3.7,8.8,19.5,27.6,38.4C61.4,194.7,93.1,208,128,208a126.9,126.9,0,0,0,52.1-10.8l22,24.2A8,8,0,0,0,208,224a8.2,8.2,0,0,0,5.4-2.1,7.9,7.9,0,0,0,.5-11.3ZM128,164a36,36,0,0,1-29.5-56.6l47.2,51.9A35.4,35.4,0,0,1,128,164Z',
    })
  )
})
Tn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M154.9,157.6A39.6,39.6,0,0,1,128,168a40,40,0,0,1-26.9-69.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M208.6,169.1C230.4,149.6,240,128,240,128S208,56,128,56a123.9,123.9,0,0,0-20.7,1.7',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M135.5,88.7a39.9,39.9,0,0,1,32.3,35.5',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Tn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M154.9,157.6A39.6,39.6,0,0,1,128,168a40,40,0,0,1-26.9-69.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M208.6,169.1C230.4,149.6,240,128,240,128S208,56,128,56a123.9,123.9,0,0,0-20.7,1.7',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M135.5,88.7a39.9,39.9,0,0,1,32.3,35.5',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Tn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '48',
      y1: '40',
      x2: '208',
      y2: '216',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M154.9,157.6A39.6,39.6,0,0,1,128,168a40,40,0,0,1-26.9-69.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M74,68.6C33.2,89.2,16,128,16,128s32,72,112,72a117.9,117.9,0,0,0,54-12.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M208.6,169.1C230.4,149.6,240,128,240,128S208,56,128,56a123.9,123.9,0,0,0-20.7,1.7',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M135.5,88.7a39.9,39.9,0,0,1,32.3,35.5',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var dE = function (t, n) {
    return Te(t, n, Tn)
  },
  hE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: dE }))
  })
hE.displayName = 'EyeSlash'
var Mn = new Map()
Mn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Mn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      opacity: '0.2',
    }),
    f.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Mn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M240,160v24a16,16,0,0,1-16,16H115.5a4,4,0,0,1-3.2-6.4L178,108a8.2,8.2,0,0,0-1.1-11.3A7.9,7.9,0,0,0,165.5,98L88.4,198.4a3.8,3.8,0,0,1-3.1,1.6H32a16,16,0,0,1-16-16V161.1a116.1,116.1,0,0,1,2.2-22.2L40.9,145l2.1.2a8,8,0,0,0,7.8-6.2,8.1,8.1,0,0,0-6-9.6l-22.4-6C37,82,74.9,51.5,120,48.3V71.7a8.2,8.2,0,0,0,7.5,8.3,8,8,0,0,0,8.5-8V48.3a111.5,111.5,0,0,1,71.1,32.4,112.7,112.7,0,0,1,26.8,42.6l-22.7,6.1a8.1,8.1,0,0,0-6,9.6,8,8,0,0,0,7.8,6.2l2.1-.2,22.9-6.2A114.5,114.5,0,0,1,240,160Z',
    })
  )
})
Mn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Mn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Mn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '56',
      x2: '128',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '27.5',
      y1: '133.1',
      x2: '58.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '228.5',
      y1: '133.1',
      x2: '197.5',
      y2: '141.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '103.4',
      y1: '192',
      x2: '171.8',
      y2: '102.9',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var pE = function (t, n) {
    return Te(t, n, Mn)
  },
  mE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: pE }))
  })
mE.displayName = 'Gauge'
var An = new Map()
An.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '136',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '136',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '136',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
An.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
An.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM86.6,42.1l-29.3,27-11.9-11A8,8,0,0,0,34.6,69.9l17.3,16A8,8,0,0,0,57.3,88a8.2,8.2,0,0,0,5.5-2.1l34.6-32A8,8,0,1,0,86.6,42.1Zm0,64-29.3,27-11.9-11a8,8,0,1,0-10.8,11.8l17.3,16a8,8,0,0,0,5.4,2.1,8.2,8.2,0,0,0,5.5-2.1l34.6-32a8,8,0,1,0-10.8-11.8Zm0,64-29.3,27-11.9-11a8,8,0,1,0-10.8,11.8l17.3,16a8,8,0,0,0,5.4,2.1,8.2,8.2,0,0,0,5.5-2.1l34.6-32a8,8,0,0,0-10.8-11.8Z',
    })
  )
})
An.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
An.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
An.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '216',
      y2: '128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '64',
      x2: '216',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '192',
      x2: '216',
      y2: '192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '92 48 57.3 80 40 64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '92 112 57.3 144 40 128',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '92 176 57.3 208 40 192',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var gE = function (t, n) {
    return Te(t, n, An)
  },
  yE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: gE }))
  })
yE.displayName = 'ListChecks'
var Rn = new Map()
Rn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('rect', {
      x: '48',
      y: '48',
      width: '60',
      height: '60',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('rect', {
      x: '48',
      y: '148',
      width: '60',
      height: '60',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('rect', {
      x: '148',
      y: '48',
      width: '60',
      height: '60',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '148',
      y1: '148',
      x2: '148',
      y2: '172',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('polyline', {
      points: '148 208 184 208 184 148',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '184',
      y1: '164',
      x2: '208',
      y2: '164',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Rn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      opacity: '0.2',
    }),
    f.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      opacity: '0.2',
    }),
    f.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      opacity: '0.2',
    }),
    f.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '144',
      y1: '144',
      x2: '144',
      y2: '176',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '144 208 176 208 176 144',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '176',
      y1: '160',
      x2: '208',
      y2: '160',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '208',
      y1: '192',
      x2: '208',
      y2: '208',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Rn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('rect', { x: '40', y: '40', width: '80', height: '80', rx: '16' }),
    f.createElement('rect', { x: '40', y: '136', width: '80', height: '80', rx: '16' }),
    f.createElement('rect', { x: '136', y: '40', width: '80', height: '80', rx: '16' }),
    f.createElement('path', {
      d: 'M144,184a8,8,0,0,0,8-8V144a8,8,0,0,0-16,0v32A8,8,0,0,0,144,184Z',
    }),
    f.createElement('path', {
      d: 'M208,152H184v-8a8,8,0,0,0-16,0v56H144a8,8,0,0,0,0,16h32a8,8,0,0,0,8-8V168h24a8,8,0,0,0,0-16Z',
    }),
    f.createElement('path', {
      d: 'M208,184a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V192A8,8,0,0,0,208,184Z',
    })
  )
})
Rn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '144',
      y1: '144',
      x2: '144',
      y2: '176',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('polyline', {
      points: '144 208 176 208 176 144',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '176',
      y1: '160',
      x2: '208',
      y2: '160',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '208',
      y1: '192',
      x2: '208',
      y2: '208',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Rn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '144',
      y1: '144',
      x2: '144',
      y2: '176',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('polyline', {
      points: '144 208 176 208 176 144',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '176',
      y1: '160',
      x2: '208',
      y2: '160',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '208',
      y1: '192',
      x2: '208',
      y2: '208',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Rn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('rect', {
      x: '48',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('rect', {
      x: '48',
      y: '144',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('rect', {
      x: '144',
      y: '48',
      width: '64',
      height: '64',
      rx: '8',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '144',
      y1: '144',
      x2: '144',
      y2: '176',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '144 208 176 208 176 144',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '176',
      y1: '160',
      x2: '208',
      y2: '160',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '208',
      y1: '192',
      x2: '208',
      y2: '208',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var vE = function (t, n) {
    return Te(t, n, Rn)
  },
  kE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: vE }))
  })
kE.displayName = 'QrCode'
var jn = new Map()
jn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
jn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      opacity: '0.2',
    }),
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
jn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M208,40H48A16,16,0,0,0,32,56v58.7c0,89.4,75.8,119.1,91,124.1a16,16,0,0,0,10,0c15.2-5,91-34.7,91-124.1V56A16,16,0,0,0,208,40Z',
    })
  )
})
jn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
jn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
jn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var EE = function (t, n) {
    return Te(t, n, jn)
  },
  xE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: EE }))
  })
xE.displayName = 'Shield'
var _n = new Map()
_n.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
_n.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      opacity: '0.2',
    }),
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
_n.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M208,40H48A16,16,0,0,0,32,56v58.7c0,89.4,75.8,119.1,91,124.1a16,16,0,0,0,10,0c15.2-5,91-34.7,91-124.1V56A16,16,0,0,0,208,40Zm-30.5,69.8-58.6,56a8.1,8.1,0,0,1-5.6,2.2,7.9,7.9,0,0,1-5.5-2.2l-29.3-28a8,8,0,1,1,11-11.6l23.8,22.7,53.2-50.7a8,8,0,0,1,11,11.6Z',
    })
  )
})
_n.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
_n.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
_n.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '172 104 113.3 160 84 132',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var wE = function (t, n) {
    return Te(t, n, _n)
  },
  LE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: wE }))
  })
LE.displayName = 'ShieldCheck'
var Fn = new Map()
Fn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Fn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      opacity: '0.2',
    }),
    f.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Fn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M208.9,144a15.8,15.8,0,0,1-10.5,15l-52.2,19.2L127,230.4a16,16,0,0,1-30,0L77.8,178.2,25.6,159a16,16,0,0,1,0-30l52.2-19.2L97,57.6a16,16,0,0,1,30,0l19.2,52.2L198.4,129A15.8,15.8,0,0,1,208.9,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z',
    })
  )
})
Fn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Fn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Fn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '176',
      y1: '16',
      x2: '176',
      y2: '64',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '200',
      y1: '40',
      x2: '152',
      y2: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '224',
      y1: '72',
      x2: '224',
      y2: '104',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('line', {
      x1: '240',
      y1: '88',
      x2: '208',
      y2: '88',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var SE = function (t, n) {
    return Te(t, n, Fn)
  },
  PE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: SE }))
  })
PE.displayName = 'Sparkle'
var Dn = new Map()
Dn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,0,67.8,47.1,47.1,0,0,0,13.2-24.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M195.9,60.1A96.1,96.1,0,1,0,218,94.6',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Dn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', { cx: '128', cy: '128', r: '48', opacity: '0.2' }),
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,14,31.2',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Dn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M211.2,79.4a8,8,0,0,0-3.8,10.7,88,88,0,1,1-23.1-29.7L161.5,83.2a56,56,0,0,0-73.1,84.4h0a56,56,0,0,0,95.5-42.8,7.9,7.9,0,0,0-8.4-7.5,8,8,0,0,0-7.6,8.4,40,40,0,0,1-62,35.7l24-24,37.7-37.7h0l62.1-62a8.1,8.1,0,0,0-11.4-11.4L195.7,49A104,104,0,0,0,54.5,54.5a103.8,103.8,0,0,0,0,147,103.8,103.8,0,0,0,147,0A104,104,0,0,0,221.9,83.2,8,8,0,0,0,211.2,79.4Z',
    })
  )
})
Dn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,14,31.2',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Dn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,14,31.2',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Dn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '128',
      x2: '224',
      y2: '32',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M161.9,94.1a47.9,47.9,0,1,0,14,31.2',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var CE = function (t, n) {
    return Te(t, n, Dn)
  },
  TE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: CE }))
  })
TE.displayName = 'Target'
var Vn = new Map()
Vn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Vn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Vn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M240,56v64a8,8,0,0,1-4.9,7.4,8.5,8.5,0,0,1-3.1.6,8.3,8.3,0,0,1-5.7-2.3L200,99.3l-58.3,58.4a8.1,8.1,0,0,1-11.4,0L96,123.3,29.7,189.7A8.3,8.3,0,0,1,24,192a8.5,8.5,0,0,1-5.7-2.3,8.1,8.1,0,0,1,0-11.4l72-72a8.1,8.1,0,0,1,11.4,0L136,140.7,188.7,88,162.3,61.7a8.4,8.4,0,0,1-1.7-8.8A8.1,8.1,0,0,1,168,48h64A8,8,0,0,1,240,56Z',
    })
  )
})
Vn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Vn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Vn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('polyline', {
      points: '232 56 136 152 96 112 24 184',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('polyline', {
      points: '232 120 232 56 168 56',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var ME = function (t, n) {
    return Te(t, n, Vn)
  },
  AE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: ME }))
  })
AE.displayName = 'TrendUp'
var Nn = new Map()
Nn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M204.5,116.6A60.1,60.1,0,0,1,244,140',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M167.1,70.2A32,32,0,1,1,204,115',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M52,115A32,32,0,1,1,88.9,70.2',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M12,140a60.1,60.1,0,0,1,39.5-23.4',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    })
  )
})
Nn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', { cx: '128', cy: '140', r: '40', opacity: '0.2' }),
    f.createElement('circle', { cx: '60', cy: '84', r: '32', opacity: '0.2' }),
    f.createElement('circle', { cx: '196', cy: '84', r: '32', opacity: '0.2' }),
    f.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M196,116a59.8,59.8,0,0,1,48,24',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M12,140a59.8,59.8,0,0,1,48-24',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M60,116A32,32,0,1,1,91.4,78',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M164.6,78A32,32,0,1,1,196,116',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
Nn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M64,140a7.9,7.9,0,0,1-8,8H12a8.2,8.2,0,0,1-7.2-4.4,8.2,8.2,0,0,1,.8-8.4A67.8,67.8,0,0,1,33,113.5a40,40,0,1,1,66.3-37,8.1,8.1,0,0,1-3.8,8.4,64.3,64.3,0,0,0-27.8,33.8A61.6,61.6,0,0,0,64,140Zm186.4-4.8A67.8,67.8,0,0,0,223,113.5a40,40,0,1,0-66.3-37,8.1,8.1,0,0,0,3.8,8.4,64,64,0,0,1,27.8,33.8A61.6,61.6,0,0,1,192,140a7.9,7.9,0,0,0,8,8h44a8,8,0,0,0,6.4-12.8Zm-93.2,42.9a48,48,0,1,0-58.4,0,72.1,72.1,0,0,0-35.6,34.4,7.8,7.8,0,0,0,.5,7.7,7.8,7.8,0,0,0,6.7,3.8H185.6a7.8,7.8,0,0,0,6.7-3.8,7.8,7.8,0,0,0,.5-7.7A72.1,72.1,0,0,0,157.2,178.1Z',
    })
  )
})
Nn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M196,116a59.8,59.8,0,0,1,48,24',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M12,140a59.8,59.8,0,0,1,48-24',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M60,116A32,32,0,1,1,91.4,78',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M164.6,78A32,32,0,1,1,196,116',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    })
  )
})
Nn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M196,116a59.8,59.8,0,0,1,48,24',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M12,140a59.8,59.8,0,0,1,48-24',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M60,116A32,32,0,1,1,91.4,78',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M164.6,78A32,32,0,1,1,196,116',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    })
  )
})
Nn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('circle', {
      cx: '128',
      cy: '140',
      r: '40',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M196,116a59.8,59.8,0,0,1,48,24',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M12,140a59.8,59.8,0,0,1,48-24',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M70.4,216a64.1,64.1,0,0,1,115.2,0',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M60,116A32,32,0,1,1,91.4,78',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M164.6,78A32,32,0,1,1,196,116',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    })
  )
})
var RE = function (t, n) {
    return Te(t, n, Nn)
  },
  jE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: RE }))
  })
jE.displayName = 'UsersThree'
var Wn = new Map()
Wn.set('bold', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '104',
      x2: '128',
      y2: '136',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '24',
    }),
    f.createElement('circle', { cx: '128', cy: '176', r: '16' })
  )
})
Wn.set('duotone', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      opacity: '0.2',
    }),
    f.createElement('line', {
      x1: '128',
      y1: '112',
      x2: '128',
      y2: '144',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('circle', { cx: '128', cy: '180', r: '12' })
  )
})
Wn.set('fill', function () {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('path', {
      d: 'M236.7,188,148.8,36a24,24,0,0,0-41.6,0h0L19.3,188A23.9,23.9,0,0,0,40,224H216a23.9,23.9,0,0,0,20.7-36ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z',
    })
  )
})
Wn.set('light', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '104',
      x2: '128',
      y2: '144',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '12',
    }),
    f.createElement('circle', { cx: '128', cy: '180', r: '10' })
  )
})
Wn.set('thin', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '104',
      x2: '128',
      y2: '144',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '8',
    }),
    f.createElement('circle', { cx: '128', cy: '180', r: '8' })
  )
})
Wn.set('regular', function (e) {
  return f.createElement(
    f.Fragment,
    null,
    f.createElement('line', {
      x1: '128',
      y1: '104',
      x2: '128',
      y2: '144',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('path', {
      d: 'M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z',
      fill: 'none',
      stroke: e,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '16',
    }),
    f.createElement('circle', { cx: '128', cy: '180', r: '12' })
  )
})
var _E = function (t, n) {
    return Te(t, n, Wn)
  },
  FE = L.forwardRef(function (e, t) {
    return f.createElement(xe, Object.assign({ ref: t }, e, { renderPath: _E }))
  })
FE.displayName = 'Warning'
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */ function Wi(e) {
  return (e + 0.5) | 0
}
const _t = (e, t, n) => Math.max(Math.min(e, n), t)
function $r(e) {
  return _t(Wi(e * 2.55), 0, 255)
}
function Ut(e) {
  return _t(Wi(e * 255), 0, 255)
}
function ct(e) {
  return _t(Wi(e / 2.55) / 100, 0, 1)
}
function Kd(e) {
  return _t(Wi(e * 100), 0, 100)
}
const We = {
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
  Fa = [...'0123456789ABCDEF'],
  DE = (e) => Fa[e & 15],
  VE = (e) => Fa[(e & 240) >> 4] + Fa[e & 15],
  ao = (e) => (e & 240) >> 4 === (e & 15),
  NE = (e) => ao(e.r) && ao(e.g) && ao(e.b) && ao(e.a)
function WE(e) {
  var t = e.length,
    n
  return (
    e[0] === '#' &&
      (t === 4 || t === 5
        ? (n = {
            r: 255 & (We[e[1]] * 17),
            g: 255 & (We[e[2]] * 17),
            b: 255 & (We[e[3]] * 17),
            a: t === 5 ? We[e[4]] * 17 : 255,
          })
        : (t === 7 || t === 9) &&
          (n = {
            r: (We[e[1]] << 4) | We[e[2]],
            g: (We[e[3]] << 4) | We[e[4]],
            b: (We[e[5]] << 4) | We[e[6]],
            a: t === 9 ? (We[e[7]] << 4) | We[e[8]] : 255,
          })),
    n
  )
}
const OE = (e, t) => (e < 255 ? t(e) : '')
function IE(e) {
  var t = NE(e) ? DE : VE
  return e ? '#' + t(e.r) + t(e.g) + t(e.b) + OE(e.a, t) : void 0
}
const BE =
  /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/
function bm(e, t, n) {
  const r = t * Math.min(n, 1 - n),
    i = (o, s = (o + e / 30) % 12) => n - r * Math.max(Math.min(s - 3, 9 - s, 1), -1)
  return [i(0), i(8), i(4)]
}
function zE(e, t, n) {
  const r = (i, o = (i + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0)
  return [r(5), r(3), r(1)]
}
function UE(e, t, n) {
  const r = bm(e, 1, 0.5)
  let i
  for (t + n > 1 && ((i = 1 / (t + n)), (t *= i), (n *= i)), i = 0; i < 3; i++)
    ((r[i] *= 1 - t - n), (r[i] += t))
  return r
}
function $E(e, t, n, r, i) {
  return e === i ? (t - n) / r + (t < n ? 6 : 0) : t === i ? (n - e) / r + 2 : (e - t) / r + 4
}
function uc(e) {
  const n = e.r / 255,
    r = e.g / 255,
    i = e.b / 255,
    o = Math.max(n, r, i),
    s = Math.min(n, r, i),
    a = (o + s) / 2
  let l, u, c
  return (
    o !== s &&
      ((c = o - s),
      (u = a > 0.5 ? c / (2 - o - s) : c / (o + s)),
      (l = $E(n, r, i, c, o)),
      (l = l * 60 + 0.5)),
    [l | 0, u || 0, a]
  )
}
function cc(e, t, n, r) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, r)).map(Ut)
}
function fc(e, t, n) {
  return cc(bm, e, t, n)
}
function HE(e, t, n) {
  return cc(UE, e, t, n)
}
function KE(e, t, n) {
  return cc(zE, e, t, n)
}
function Gm(e) {
  return ((e % 360) + 360) % 360
}
function ZE(e) {
  const t = BE.exec(e)
  let n = 255,
    r
  if (!t) return
  t[5] !== r && (n = t[6] ? $r(+t[5]) : Ut(+t[5]))
  const i = Gm(+t[2]),
    o = +t[3] / 100,
    s = +t[4] / 100
  return (
    t[1] === 'hwb' ? (r = HE(i, o, s)) : t[1] === 'hsv' ? (r = KE(i, o, s)) : (r = fc(i, o, s)),
    { r: r[0], g: r[1], b: r[2], a: n }
  )
}
function YE(e, t) {
  var n = uc(e)
  ;((n[0] = Gm(n[0] + t)), (n = fc(n)), (e.r = n[0]), (e.g = n[1]), (e.b = n[2]))
}
function QE(e) {
  if (!e) return
  const t = uc(e),
    n = t[0],
    r = Kd(t[1]),
    i = Kd(t[2])
  return e.a < 255 ? `hsla(${n}, ${r}%, ${i}%, ${ct(e.a)})` : `hsl(${n}, ${r}%, ${i}%)`
}
const Zd = {
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
  Yd = {
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
function bE() {
  const e = {},
    t = Object.keys(Yd),
    n = Object.keys(Zd)
  let r, i, o, s, a
  for (r = 0; r < t.length; r++) {
    for (s = a = t[r], i = 0; i < n.length; i++) ((o = n[i]), (a = a.replace(o, Zd[o])))
    ;((o = parseInt(Yd[s], 16)), (e[a] = [(o >> 16) & 255, (o >> 8) & 255, o & 255]))
  }
  return e
}
let uo
function GE(e) {
  uo || ((uo = bE()), (uo.transparent = [0, 0, 0, 0]))
  const t = uo[e.toLowerCase()]
  return t && { r: t[0], g: t[1], b: t[2], a: t.length === 4 ? t[3] : 255 }
}
const XE =
  /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/
function JE(e) {
  const t = XE.exec(e)
  let n = 255,
    r,
    i,
    o
  if (t) {
    if (t[7] !== r) {
      const s = +t[7]
      n = t[8] ? $r(s) : _t(s * 255, 0, 255)
    }
    return (
      (r = +t[1]),
      (i = +t[3]),
      (o = +t[5]),
      (r = 255 & (t[2] ? $r(r) : _t(r, 0, 255))),
      (i = 255 & (t[4] ? $r(i) : _t(i, 0, 255))),
      (o = 255 & (t[6] ? $r(o) : _t(o, 0, 255))),
      { r, g: i, b: o, a: n }
    )
  }
}
function qE(e) {
  return (
    e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${ct(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`)
  )
}
const kl = (e) => (e <= 0.0031308 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055),
  In = (e) => (e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4))
function e6(e, t, n) {
  const r = In(ct(e.r)),
    i = In(ct(e.g)),
    o = In(ct(e.b))
  return {
    r: Ut(kl(r + n * (In(ct(t.r)) - r))),
    g: Ut(kl(i + n * (In(ct(t.g)) - i))),
    b: Ut(kl(o + n * (In(ct(t.b)) - o))),
    a: e.a + n * (t.a - e.a),
  }
}
function co(e, t, n) {
  if (e) {
    let r = uc(e)
    ;((r[t] = Math.max(0, Math.min(r[t] + r[t] * n, t === 0 ? 360 : 1))),
      (r = fc(r)),
      (e.r = r[0]),
      (e.g = r[1]),
      (e.b = r[2]))
  }
}
function Xm(e, t) {
  return e && Object.assign(t || {}, e)
}
function Qd(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 }
  return (
    Array.isArray(e)
      ? e.length >= 3 &&
        ((t = { r: e[0], g: e[1], b: e[2], a: 255 }), e.length > 3 && (t.a = Ut(e[3])))
      : ((t = Xm(e, { r: 0, g: 0, b: 0, a: 1 })), (t.a = Ut(t.a))),
    t
  )
}
function t6(e) {
  return e.charAt(0) === 'r' ? JE(e) : ZE(e)
}
class Da {
  constructor(t) {
    if (t instanceof Da) return t
    const n = typeof t
    let r
    ;(n === 'object' ? (r = Qd(t)) : n === 'string' && (r = WE(t) || GE(t) || t6(t)),
      (this._rgb = r),
      (this._valid = !!r))
  }
  get valid() {
    return this._valid
  }
  get rgb() {
    var t = Xm(this._rgb)
    return (t && (t.a = ct(t.a)), t)
  }
  set rgb(t) {
    this._rgb = Qd(t)
  }
  rgbString() {
    return this._valid ? qE(this._rgb) : void 0
  }
  hexString() {
    return this._valid ? IE(this._rgb) : void 0
  }
  hslString() {
    return this._valid ? QE(this._rgb) : void 0
  }
  mix(t, n) {
    if (t) {
      const r = this.rgb,
        i = t.rgb
      let o
      const s = n === o ? 0.5 : n,
        a = 2 * s - 1,
        l = r.a - i.a,
        u = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2
      ;((o = 1 - u),
        (r.r = 255 & (u * r.r + o * i.r + 0.5)),
        (r.g = 255 & (u * r.g + o * i.g + 0.5)),
        (r.b = 255 & (u * r.b + o * i.b + 0.5)),
        (r.a = s * r.a + (1 - s) * i.a),
        (this.rgb = r))
    }
    return this
  }
  interpolate(t, n) {
    return (t && (this._rgb = e6(this._rgb, t._rgb, n)), this)
  }
  clone() {
    return new Da(this.rgb)
  }
  alpha(t) {
    return ((this._rgb.a = Ut(t)), this)
  }
  clearer(t) {
    const n = this._rgb
    return ((n.a *= 1 - t), this)
  }
  greyscale() {
    const t = this._rgb,
      n = Wi(t.r * 0.3 + t.g * 0.59 + t.b * 0.11)
    return ((t.r = t.g = t.b = n), this)
  }
  opaquer(t) {
    const n = this._rgb
    return ((n.a *= 1 + t), this)
  }
  negate() {
    const t = this._rgb
    return ((t.r = 255 - t.r), (t.g = 255 - t.g), (t.b = 255 - t.b), this)
  }
  lighten(t) {
    return (co(this._rgb, 2, t), this)
  }
  darken(t) {
    return (co(this._rgb, 2, -t), this)
  }
  saturate(t) {
    return (co(this._rgb, 1, t), this)
  }
  desaturate(t) {
    return (co(this._rgb, 1, -t), this)
  }
  rotate(t) {
    return (YE(this._rgb, t), this)
  }
}
var n6 = Object.defineProperty,
  ss = Object.getOwnPropertySymbols,
  Jm = Object.prototype.hasOwnProperty,
  qm = Object.prototype.propertyIsEnumerable,
  bd = (e, t, n) =>
    t in e ? n6(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n),
  Gd = (e, t) => {
    for (var n in t || (t = {})) Jm.call(t, n) && bd(e, n, t[n])
    if (ss) for (var n of ss(t)) qm.call(t, n) && bd(e, n, t[n])
    return e
  },
  r6 = (e, t) => {
    var n = {}
    for (var r in e) Jm.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r])
    if (e != null && ss) for (var r of ss(e)) t.indexOf(r) < 0 && qm.call(e, r) && (n[r] = e[r])
    return n
  }
/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */ var kn
;((e) => {
  const t = class {
    constructor(l, u, c, d) {
      if (
        ((this.version = l),
        (this.errorCorrectionLevel = u),
        (this.modules = []),
        (this.isFunction = []),
        l < t.MIN_VERSION || l > t.MAX_VERSION)
      )
        throw new RangeError('Version value out of range')
      if (d < -1 || d > 7) throw new RangeError('Mask value out of range')
      this.size = l * 4 + 17
      let h = []
      for (let v = 0; v < this.size; v++) h.push(!1)
      for (let v = 0; v < this.size; v++)
        (this.modules.push(h.slice()), this.isFunction.push(h.slice()))
      this.drawFunctionPatterns()
      const y = this.addEccAndInterleave(c)
      if ((this.drawCodewords(y), d == -1)) {
        let v = 1e9
        for (let k = 0; k < 8; k++) {
          ;(this.applyMask(k), this.drawFormatBits(k))
          const E = this.getPenaltyScore()
          ;(E < v && ((d = k), (v = E)), this.applyMask(k))
        }
      }
      ;(o(0 <= d && d <= 7),
        (this.mask = d),
        this.applyMask(d),
        this.drawFormatBits(d),
        (this.isFunction = []))
    }
    static encodeText(l, u) {
      const c = e.QrSegment.makeSegments(l)
      return t.encodeSegments(c, u)
    }
    static encodeBinary(l, u) {
      const c = e.QrSegment.makeBytes(l)
      return t.encodeSegments([c], u)
    }
    static encodeSegments(l, u, c = 1, d = 40, h = -1, y = !0) {
      if (!(t.MIN_VERSION <= c && c <= d && d <= t.MAX_VERSION) || h < -1 || h > 7)
        throw new RangeError('Invalid value')
      let v, k
      for (v = c; ; v++) {
        const g = t.getNumDataCodewords(v, u) * 8,
          x = a.getTotalBits(l, v)
        if (x <= g) {
          k = x
          break
        }
        if (v >= d) throw new RangeError('Data too long')
      }
      for (const g of [t.Ecc.MEDIUM, t.Ecc.QUARTILE, t.Ecc.HIGH])
        y && k <= t.getNumDataCodewords(v, g) * 8 && (u = g)
      let E = []
      for (const g of l) {
        ;(r(g.mode.modeBits, 4, E), r(g.numChars, g.mode.numCharCountBits(v), E))
        for (const x of g.getData()) E.push(x)
      }
      o(E.length == k)
      const m = t.getNumDataCodewords(v, u) * 8
      ;(o(E.length <= m),
        r(0, Math.min(4, m - E.length), E),
        r(0, (8 - (E.length % 8)) % 8, E),
        o(E.length % 8 == 0))
      for (let g = 236; E.length < m; g ^= 253) r(g, 8, E)
      let p = []
      for (; p.length * 8 < E.length; ) p.push(0)
      return (E.forEach((g, x) => (p[x >>> 3] |= g << (7 - (x & 7)))), new t(v, u, p, h))
    }
    getModule(l, u) {
      return 0 <= l && l < this.size && 0 <= u && u < this.size && this.modules[u][l]
    }
    getModules() {
      return this.modules
    }
    drawFunctionPatterns() {
      for (let c = 0; c < this.size; c++)
        (this.setFunctionModule(6, c, c % 2 == 0), this.setFunctionModule(c, 6, c % 2 == 0))
      ;(this.drawFinderPattern(3, 3),
        this.drawFinderPattern(this.size - 4, 3),
        this.drawFinderPattern(3, this.size - 4))
      const l = this.getAlignmentPatternPositions(),
        u = l.length
      for (let c = 0; c < u; c++)
        for (let d = 0; d < u; d++)
          (c == 0 && d == 0) ||
            (c == 0 && d == u - 1) ||
            (c == u - 1 && d == 0) ||
            this.drawAlignmentPattern(l[c], l[d])
      ;(this.drawFormatBits(0), this.drawVersion())
    }
    drawFormatBits(l) {
      const u = (this.errorCorrectionLevel.formatBits << 3) | l
      let c = u
      for (let h = 0; h < 10; h++) c = (c << 1) ^ ((c >>> 9) * 1335)
      const d = ((u << 10) | c) ^ 21522
      o(d >>> 15 == 0)
      for (let h = 0; h <= 5; h++) this.setFunctionModule(8, h, i(d, h))
      ;(this.setFunctionModule(8, 7, i(d, 6)),
        this.setFunctionModule(8, 8, i(d, 7)),
        this.setFunctionModule(7, 8, i(d, 8)))
      for (let h = 9; h < 15; h++) this.setFunctionModule(14 - h, 8, i(d, h))
      for (let h = 0; h < 8; h++) this.setFunctionModule(this.size - 1 - h, 8, i(d, h))
      for (let h = 8; h < 15; h++) this.setFunctionModule(8, this.size - 15 + h, i(d, h))
      this.setFunctionModule(8, this.size - 8, !0)
    }
    drawVersion() {
      if (this.version < 7) return
      let l = this.version
      for (let c = 0; c < 12; c++) l = (l << 1) ^ ((l >>> 11) * 7973)
      const u = (this.version << 12) | l
      o(u >>> 18 == 0)
      for (let c = 0; c < 18; c++) {
        const d = i(u, c),
          h = this.size - 11 + (c % 3),
          y = Math.floor(c / 3)
        ;(this.setFunctionModule(h, y, d), this.setFunctionModule(y, h, d))
      }
    }
    drawFinderPattern(l, u) {
      for (let c = -4; c <= 4; c++)
        for (let d = -4; d <= 4; d++) {
          const h = Math.max(Math.abs(d), Math.abs(c)),
            y = l + d,
            v = u + c
          0 <= y &&
            y < this.size &&
            0 <= v &&
            v < this.size &&
            this.setFunctionModule(y, v, h != 2 && h != 4)
        }
    }
    drawAlignmentPattern(l, u) {
      for (let c = -2; c <= 2; c++)
        for (let d = -2; d <= 2; d++)
          this.setFunctionModule(l + d, u + c, Math.max(Math.abs(d), Math.abs(c)) != 1)
    }
    setFunctionModule(l, u, c) {
      ;((this.modules[u][l] = c), (this.isFunction[u][l] = !0))
    }
    addEccAndInterleave(l) {
      const u = this.version,
        c = this.errorCorrectionLevel
      if (l.length != t.getNumDataCodewords(u, c)) throw new RangeError('Invalid argument')
      const d = t.NUM_ERROR_CORRECTION_BLOCKS[c.ordinal][u],
        h = t.ECC_CODEWORDS_PER_BLOCK[c.ordinal][u],
        y = Math.floor(t.getNumRawDataModules(u) / 8),
        v = d - (y % d),
        k = Math.floor(y / d)
      let E = []
      const m = t.reedSolomonComputeDivisor(h)
      for (let g = 0, x = 0; g < d; g++) {
        let w = l.slice(x, x + k - h + (g < v ? 0 : 1))
        x += w.length
        const P = t.reedSolomonComputeRemainder(w, m)
        ;(g < v && w.push(0), E.push(w.concat(P)))
      }
      let p = []
      for (let g = 0; g < E[0].length; g++)
        E.forEach((x, w) => {
          ;(g != k - h || w >= v) && p.push(x[g])
        })
      return (o(p.length == y), p)
    }
    drawCodewords(l) {
      if (l.length != Math.floor(t.getNumRawDataModules(this.version) / 8))
        throw new RangeError('Invalid argument')
      let u = 0
      for (let c = this.size - 1; c >= 1; c -= 2) {
        c == 6 && (c = 5)
        for (let d = 0; d < this.size; d++)
          for (let h = 0; h < 2; h++) {
            const y = c - h,
              k = ((c + 1) & 2) == 0 ? this.size - 1 - d : d
            !this.isFunction[k][y] &&
              u < l.length * 8 &&
              ((this.modules[k][y] = i(l[u >>> 3], 7 - (u & 7))), u++)
          }
      }
      o(u == l.length * 8)
    }
    applyMask(l) {
      if (l < 0 || l > 7) throw new RangeError('Mask value out of range')
      for (let u = 0; u < this.size; u++)
        for (let c = 0; c < this.size; c++) {
          let d
          switch (l) {
            case 0:
              d = (c + u) % 2 == 0
              break
            case 1:
              d = u % 2 == 0
              break
            case 2:
              d = c % 3 == 0
              break
            case 3:
              d = (c + u) % 3 == 0
              break
            case 4:
              d = (Math.floor(c / 3) + Math.floor(u / 2)) % 2 == 0
              break
            case 5:
              d = ((c * u) % 2) + ((c * u) % 3) == 0
              break
            case 6:
              d = (((c * u) % 2) + ((c * u) % 3)) % 2 == 0
              break
            case 7:
              d = (((c + u) % 2) + ((c * u) % 3)) % 2 == 0
              break
            default:
              throw new Error('Unreachable')
          }
          !this.isFunction[u][c] && d && (this.modules[u][c] = !this.modules[u][c])
        }
    }
    getPenaltyScore() {
      let l = 0
      for (let h = 0; h < this.size; h++) {
        let y = !1,
          v = 0,
          k = [0, 0, 0, 0, 0, 0, 0]
        for (let E = 0; E < this.size; E++)
          this.modules[h][E] == y
            ? (v++, v == 5 ? (l += t.PENALTY_N1) : v > 5 && l++)
            : (this.finderPenaltyAddHistory(v, k),
              y || (l += this.finderPenaltyCountPatterns(k) * t.PENALTY_N3),
              (y = this.modules[h][E]),
              (v = 1))
        l += this.finderPenaltyTerminateAndCount(y, v, k) * t.PENALTY_N3
      }
      for (let h = 0; h < this.size; h++) {
        let y = !1,
          v = 0,
          k = [0, 0, 0, 0, 0, 0, 0]
        for (let E = 0; E < this.size; E++)
          this.modules[E][h] == y
            ? (v++, v == 5 ? (l += t.PENALTY_N1) : v > 5 && l++)
            : (this.finderPenaltyAddHistory(v, k),
              y || (l += this.finderPenaltyCountPatterns(k) * t.PENALTY_N3),
              (y = this.modules[E][h]),
              (v = 1))
        l += this.finderPenaltyTerminateAndCount(y, v, k) * t.PENALTY_N3
      }
      for (let h = 0; h < this.size - 1; h++)
        for (let y = 0; y < this.size - 1; y++) {
          const v = this.modules[h][y]
          v == this.modules[h][y + 1] &&
            v == this.modules[h + 1][y] &&
            v == this.modules[h + 1][y + 1] &&
            (l += t.PENALTY_N2)
        }
      let u = 0
      for (const h of this.modules) u = h.reduce((y, v) => y + (v ? 1 : 0), u)
      const c = this.size * this.size,
        d = Math.ceil(Math.abs(u * 20 - c * 10) / c) - 1
      return (o(0 <= d && d <= 9), (l += d * t.PENALTY_N4), o(0 <= l && l <= 2568888), l)
    }
    getAlignmentPatternPositions() {
      if (this.version == 1) return []
      {
        const l = Math.floor(this.version / 7) + 2,
          u = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (l * 2 - 2)) * 2
        let c = [6]
        for (let d = this.size - 7; c.length < l; d -= u) c.splice(1, 0, d)
        return c
      }
    }
    static getNumRawDataModules(l) {
      if (l < t.MIN_VERSION || l > t.MAX_VERSION)
        throw new RangeError('Version number out of range')
      let u = (16 * l + 128) * l + 64
      if (l >= 2) {
        const c = Math.floor(l / 7) + 2
        ;((u -= (25 * c - 10) * c - 55), l >= 7 && (u -= 36))
      }
      return (o(208 <= u && u <= 29648), u)
    }
    static getNumDataCodewords(l, u) {
      return (
        Math.floor(t.getNumRawDataModules(l) / 8) -
        t.ECC_CODEWORDS_PER_BLOCK[u.ordinal][l] * t.NUM_ERROR_CORRECTION_BLOCKS[u.ordinal][l]
      )
    }
    static reedSolomonComputeDivisor(l) {
      if (l < 1 || l > 255) throw new RangeError('Degree out of range')
      let u = []
      for (let d = 0; d < l - 1; d++) u.push(0)
      u.push(1)
      let c = 1
      for (let d = 0; d < l; d++) {
        for (let h = 0; h < u.length; h++)
          ((u[h] = t.reedSolomonMultiply(u[h], c)), h + 1 < u.length && (u[h] ^= u[h + 1]))
        c = t.reedSolomonMultiply(c, 2)
      }
      return u
    }
    static reedSolomonComputeRemainder(l, u) {
      let c = u.map((d) => 0)
      for (const d of l) {
        const h = d ^ c.shift()
        ;(c.push(0), u.forEach((y, v) => (c[v] ^= t.reedSolomonMultiply(y, h))))
      }
      return c
    }
    static reedSolomonMultiply(l, u) {
      if (l >>> 8 || u >>> 8) throw new RangeError('Byte out of range')
      let c = 0
      for (let d = 7; d >= 0; d--) ((c = (c << 1) ^ ((c >>> 7) * 285)), (c ^= ((u >>> d) & 1) * l))
      return (o(c >>> 8 == 0), c)
    }
    finderPenaltyCountPatterns(l) {
      const u = l[1]
      o(u <= this.size * 3)
      const c = u > 0 && l[2] == u && l[3] == u * 3 && l[4] == u && l[5] == u
      return (c && l[0] >= u * 4 && l[6] >= u ? 1 : 0) + (c && l[6] >= u * 4 && l[0] >= u ? 1 : 0)
    }
    finderPenaltyTerminateAndCount(l, u, c) {
      return (
        l && (this.finderPenaltyAddHistory(u, c), (u = 0)),
        (u += this.size),
        this.finderPenaltyAddHistory(u, c),
        this.finderPenaltyCountPatterns(c)
      )
    }
    finderPenaltyAddHistory(l, u) {
      ;(u[0] == 0 && (l += this.size), u.pop(), u.unshift(l))
    }
  }
  let n = t
  ;((n.MIN_VERSION = 1),
    (n.MAX_VERSION = 40),
    (n.PENALTY_N1 = 3),
    (n.PENALTY_N2 = 3),
    (n.PENALTY_N3 = 40),
    (n.PENALTY_N4 = 10),
    (n.ECC_CODEWORDS_PER_BLOCK = [
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
    (n.NUM_ERROR_CORRECTION_BLOCKS = [
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
    (e.QrCode = n))
  function r(l, u, c) {
    if (u < 0 || u > 31 || l >>> u) throw new RangeError('Value out of range')
    for (let d = u - 1; d >= 0; d--) c.push((l >>> d) & 1)
  }
  function i(l, u) {
    return ((l >>> u) & 1) != 0
  }
  function o(l) {
    if (!l) throw new Error('Assertion error')
  }
  const s = class {
    constructor(l, u, c) {
      if (((this.mode = l), (this.numChars = u), (this.bitData = c), u < 0))
        throw new RangeError('Invalid argument')
      this.bitData = c.slice()
    }
    static makeBytes(l) {
      let u = []
      for (const c of l) r(c, 8, u)
      return new s(s.Mode.BYTE, l.length, u)
    }
    static makeNumeric(l) {
      if (!s.isNumeric(l)) throw new RangeError('String contains non-numeric characters')
      let u = []
      for (let c = 0; c < l.length; ) {
        const d = Math.min(l.length - c, 3)
        ;(r(parseInt(l.substr(c, d), 10), d * 3 + 1, u), (c += d))
      }
      return new s(s.Mode.NUMERIC, l.length, u)
    }
    static makeAlphanumeric(l) {
      if (!s.isAlphanumeric(l))
        throw new RangeError('String contains unencodable characters in alphanumeric mode')
      let u = [],
        c
      for (c = 0; c + 2 <= l.length; c += 2) {
        let d = s.ALPHANUMERIC_CHARSET.indexOf(l.charAt(c)) * 45
        ;((d += s.ALPHANUMERIC_CHARSET.indexOf(l.charAt(c + 1))), r(d, 11, u))
      }
      return (
        c < l.length && r(s.ALPHANUMERIC_CHARSET.indexOf(l.charAt(c)), 6, u),
        new s(s.Mode.ALPHANUMERIC, l.length, u)
      )
    }
    static makeSegments(l) {
      return l == ''
        ? []
        : s.isNumeric(l)
          ? [s.makeNumeric(l)]
          : s.isAlphanumeric(l)
            ? [s.makeAlphanumeric(l)]
            : [s.makeBytes(s.toUtf8ByteArray(l))]
    }
    static makeEci(l) {
      let u = []
      if (l < 0) throw new RangeError('ECI assignment value out of range')
      if (l < 128) r(l, 8, u)
      else if (l < 16384) (r(2, 2, u), r(l, 14, u))
      else if (l < 1e6) (r(6, 3, u), r(l, 21, u))
      else throw new RangeError('ECI assignment value out of range')
      return new s(s.Mode.ECI, 0, u)
    }
    static isNumeric(l) {
      return s.NUMERIC_REGEX.test(l)
    }
    static isAlphanumeric(l) {
      return s.ALPHANUMERIC_REGEX.test(l)
    }
    getData() {
      return this.bitData.slice()
    }
    static getTotalBits(l, u) {
      let c = 0
      for (const d of l) {
        const h = d.mode.numCharCountBits(u)
        if (d.numChars >= 1 << h) return 1 / 0
        c += 4 + h + d.bitData.length
      }
      return c
    }
    static toUtf8ByteArray(l) {
      l = encodeURI(l)
      let u = []
      for (let c = 0; c < l.length; c++)
        l.charAt(c) != '%'
          ? u.push(l.charCodeAt(c))
          : (u.push(parseInt(l.substr(c + 1, 2), 16)), (c += 2))
      return u
    }
  }
  let a = s
  ;((a.NUMERIC_REGEX = /^[0-9]*$/),
    (a.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/),
    (a.ALPHANUMERIC_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'),
    (e.QrSegment = a))
})(kn || (kn = {}))
;((e) => {
  ;((t) => {
    const n = class {
      constructor(i, o) {
        ;((this.ordinal = i), (this.formatBits = o))
      }
    }
    let r = n
    ;((r.LOW = new n(0, 1)),
      (r.MEDIUM = new n(1, 0)),
      (r.QUARTILE = new n(2, 3)),
      (r.HIGH = new n(3, 2)),
      (t.Ecc = r))
  })(e.QrCode || (e.QrCode = {}))
})(kn || (kn = {}))
;((e) => {
  ;((t) => {
    const n = class {
      constructor(i, o) {
        ;((this.modeBits = i), (this.numBitsCharCount = o))
      }
      numCharCountBits(i) {
        return this.numBitsCharCount[Math.floor((i + 7) / 17)]
      }
    }
    let r = n
    ;((r.NUMERIC = new n(1, [10, 12, 14])),
      (r.ALPHANUMERIC = new n(2, [9, 11, 13])),
      (r.BYTE = new n(4, [8, 16, 16])),
      (r.KANJI = new n(8, [8, 10, 12])),
      (r.ECI = new n(7, [0, 0, 0])),
      (t.Mode = r))
  })(e.QrSegment || (e.QrSegment = {}))
})(kn || (kn = {}))
var Hr = kn
/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */ var i6 = {
    L: Hr.QrCode.Ecc.LOW,
    M: Hr.QrCode.Ecc.MEDIUM,
    Q: Hr.QrCode.Ecc.QUARTILE,
    H: Hr.QrCode.Ecc.HIGH,
  },
  o6 = 128,
  s6 = 'L',
  l6 = '#FFFFFF',
  a6 = '#000000',
  u6 = !1,
  e0 = 4,
  c6 = 0.1
function f6(e, t = 0) {
  const n = []
  return (
    e.forEach(function (r, i) {
      let o = null
      r.forEach(function (s, a) {
        if (!s && o !== null) {
          ;(n.push(`M${o + t} ${i + t}h${a - o}v1H${o + t}z`), (o = null))
          return
        }
        if (a === r.length - 1) {
          if (!s) return
          o === null
            ? n.push(`M${a + t},${i + t} h1v1H${a + t}z`)
            : n.push(`M${o + t},${i + t} h${a + 1 - o}v1H${o + t}z`)
          return
        }
        s && o === null && (o = a)
      })
    }),
    n.join('')
  )
}
function d6(e, t) {
  return e
    .slice()
    .map((n, r) =>
      r < t.y || r >= t.y + t.h ? n : n.map((i, o) => (o < t.x || o >= t.x + t.w ? i : !1))
    )
}
function h6(e, t, n, r) {
  if (r == null) return null
  const i = n ? e0 : 0,
    o = e.length + i * 2,
    s = Math.floor(t * c6),
    a = o / t,
    l = (r.width || s) * a,
    u = (r.height || s) * a,
    c = r.x == null ? e.length / 2 - l / 2 : r.x * a,
    d = r.y == null ? e.length / 2 - u / 2 : r.y * a
  let h = null
  if (r.excavate) {
    let y = Math.floor(c),
      v = Math.floor(d),
      k = Math.ceil(l + c - y),
      E = Math.ceil(u + d - v)
    h = { x: y, y: v, w: k, h: E }
  }
  return { x: c, y: d, h: u, w: l, excavation: h }
}
var p6 = (function () {
  try {
    new Path2D().addPath(new Path2D())
  } catch {
    return !1
  }
  return !0
})()
function w6(e) {
  const t = e,
    {
      value: n,
      size: r = o6,
      level: i = s6,
      bgColor: o = l6,
      fgColor: s = a6,
      includeMargin: a = u6,
      style: l,
      imageSettings: u,
    } = t,
    c = r6(t, [
      'value',
      'size',
      'level',
      'bgColor',
      'fgColor',
      'includeMargin',
      'style',
      'imageSettings',
    ]),
    d = u == null ? void 0 : u.src,
    h = f.useRef(null),
    y = f.useRef(null),
    [v, k] = f.useState(!1)
  ;(f.useEffect(() => {
    if (h.current != null) {
      const p = h.current,
        g = p.getContext('2d')
      if (!g) return
      let x = Hr.QrCode.encodeText(n, i6[i]).getModules()
      const w = a ? e0 : 0,
        P = x.length + w * 2,
        T = h6(x, r, a, u),
        S = y.current,
        D = T != null && S !== null && S.complete && S.naturalHeight !== 0 && S.naturalWidth !== 0
      D && T.excavation != null && (x = d6(x, T.excavation))
      const R = window.devicePixelRatio || 1
      p.height = p.width = r * R
      const $ = (r / P) * R
      ;(g.scale($, $),
        (g.fillStyle = o),
        g.fillRect(0, 0, P, P),
        (g.fillStyle = s),
        p6
          ? g.fill(new Path2D(f6(x, w)))
          : x.forEach(function (qe, lt) {
              qe.forEach(function (Jt, Oi) {
                Jt && g.fillRect(Oi + w, lt + w, 1, 1)
              })
            }),
        D && g.drawImage(S, T.x + w, T.y + w, T.w, T.h))
    }
  }),
    f.useEffect(() => {
      k(!1)
    }, [d]))
  const E = Gd({ height: r, width: r }, l)
  let m = null
  return (
    d != null &&
      (m = f.createElement('img', {
        src: d,
        key: d,
        style: { display: 'none' },
        onLoad: () => {
          k(!0)
        },
        ref: y,
      })),
    f.createElement(
      f.Fragment,
      null,
      f.createElement('canvas', Gd({ style: E, height: r, width: r, ref: h }, c)),
      m
    )
  )
}
export {
  Da as C,
  uE as D,
  hE as E,
  mE as G,
  v6 as H,
  R2 as L,
  k6 as N,
  kE as Q,
  f as R,
  PE as S,
  AE as T,
  jE as U,
  FE as W,
  TE as a,
  LE as b,
  y6 as c,
  k2 as d,
  g6 as e,
  Ry as f,
  xE as g,
  lE as h,
  yE as i,
  El as j,
  w6 as k,
  fE as l,
  x6 as m,
  L as r,
  m1 as u,
}
