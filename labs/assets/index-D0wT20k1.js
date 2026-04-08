function kC(e, t) {
  for (var r = 0; r < t.length; r++) {
    const s = t[r]
    if (typeof s != 'string' && !Array.isArray(s)) {
      for (const a in s)
        if (a !== 'default' && !(a in e)) {
          const l = Object.getOwnPropertyDescriptor(s, a)
          l && Object.defineProperty(e, a, l.get ? l : { enumerable: !0, get: () => s[a] })
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }))
}
;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) s(a)
  new MutationObserver((a) => {
    for (const l of a)
      if (l.type === 'childList')
        for (const u of l.addedNodes) u.tagName === 'LINK' && u.rel === 'modulepreload' && s(u)
  }).observe(document, { childList: !0, subtree: !0 })
  function r(a) {
    const l = {}
    return (
      a.integrity && (l.integrity = a.integrity),
      a.referrerPolicy && (l.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === 'use-credentials'
        ? (l.credentials = 'include')
        : a.crossOrigin === 'anonymous'
          ? (l.credentials = 'omit')
          : (l.credentials = 'same-origin'),
      l
    )
  }
  function s(a) {
    if (a.ep) return
    a.ep = !0
    const l = r(a)
    fetch(a.href, l)
  }
})()
function wy(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e
}
var Xu = { exports: {} },
  si = {},
  qu = { exports: {} },
  Pe = {}
var ig
function RC() {
  if (ig) return Pe
  ig = 1
  var e = Symbol.for('react.element'),
    t = Symbol.for('react.portal'),
    r = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    a = Symbol.for('react.profiler'),
    l = Symbol.for('react.provider'),
    u = Symbol.for('react.context'),
    f = Symbol.for('react.forward_ref'),
    p = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    x = Symbol.for('react.lazy'),
    h = Symbol.iterator
  function w(A) {
    return A === null || typeof A != 'object'
      ? null
      : ((A = (h && A[h]) || A['@@iterator']), typeof A == 'function' ? A : null)
  }
  var S = {
      isMounted: function () {
        return !1
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    N = Object.assign,
    C = {}
  function E(A, $, J) {
    ;((this.props = A), (this.context = $), (this.refs = C), (this.updater = J || S))
  }
  ;((E.prototype.isReactComponent = {}),
    (E.prototype.setState = function (A, $) {
      if (typeof A != 'object' && typeof A != 'function' && A != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        )
      this.updater.enqueueSetState(this, A, $, 'setState')
    }),
    (E.prototype.forceUpdate = function (A) {
      this.updater.enqueueForceUpdate(this, A, 'forceUpdate')
    }))
  function P() {}
  P.prototype = E.prototype
  function j(A, $, J) {
    ;((this.props = A), (this.context = $), (this.refs = C), (this.updater = J || S))
  }
  var k = (j.prototype = new P())
  ;((k.constructor = j), N(k, E.prototype), (k.isPureReactComponent = !0))
  var _ = Array.isArray,
    I = Object.prototype.hasOwnProperty,
    B = { current: null },
    z = { key: !0, ref: !0, __self: !0, __source: !0 }
  function W(A, $, J) {
    var re,
      le = {},
      he = null,
      Y = null
    if ($ != null)
      for (re in ($.ref !== void 0 && (Y = $.ref), $.key !== void 0 && (he = '' + $.key), $))
        I.call($, re) && !z.hasOwnProperty(re) && (le[re] = $[re])
    var ee = arguments.length - 2
    if (ee === 1) le.children = J
    else if (1 < ee) {
      for (var we = Array(ee), Se = 0; Se < ee; Se++) we[Se] = arguments[Se + 2]
      le.children = we
    }
    if (A && A.defaultProps)
      for (re in ((ee = A.defaultProps), ee)) le[re] === void 0 && (le[re] = ee[re])
    return { $$typeof: e, type: A, key: he, ref: Y, props: le, _owner: B.current }
  }
  function oe(A, $) {
    return { $$typeof: e, type: A.type, key: $, ref: A.ref, props: A.props, _owner: A._owner }
  }
  function ne(A) {
    return typeof A == 'object' && A !== null && A.$$typeof === e
  }
  function me(A) {
    var $ = { '=': '=0', ':': '=2' }
    return (
      '$' +
      A.replace(/[=:]/g, function (J) {
        return $[J]
      })
    )
  }
  var te = /\/+/g
  function ue(A, $) {
    return typeof A == 'object' && A !== null && A.key != null ? me('' + A.key) : $.toString(36)
  }
  function fe(A, $, J, re, le) {
    var he = typeof A
    ;(he === 'undefined' || he === 'boolean') && (A = null)
    var Y = !1
    if (A === null) Y = !0
    else
      switch (he) {
        case 'string':
        case 'number':
          Y = !0
          break
        case 'object':
          switch (A.$$typeof) {
            case e:
            case t:
              Y = !0
          }
      }
    if (Y)
      return (
        (Y = A),
        (le = le(Y)),
        (A = re === '' ? '.' + ue(Y, 0) : re),
        _(le)
          ? ((J = ''),
            A != null && (J = A.replace(te, '$&/') + '/'),
            fe(le, $, J, '', function (Se) {
              return Se
            }))
          : le != null &&
            (ne(le) &&
              (le = oe(
                le,
                J +
                  (!le.key || (Y && Y.key === le.key)
                    ? ''
                    : ('' + le.key).replace(te, '$&/') + '/') +
                  A
              )),
            $.push(le)),
        1
      )
    if (((Y = 0), (re = re === '' ? '.' : re + ':'), _(A)))
      for (var ee = 0; ee < A.length; ee++) {
        he = A[ee]
        var we = re + ue(he, ee)
        Y += fe(he, $, J, we, le)
      }
    else if (((we = w(A)), typeof we == 'function'))
      for (A = we.call(A), ee = 0; !(he = A.next()).done; )
        ((he = he.value), (we = re + ue(he, ee++)), (Y += fe(he, $, J, we, le)))
    else if (he === 'object')
      throw (
        ($ = String(A)),
        Error(
          'Objects are not valid as a React child (found: ' +
            ($ === '[object Object]' ? 'object with keys {' + Object.keys(A).join(', ') + '}' : $) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      )
    return Y
  }
  function xe(A, $, J) {
    if (A == null) return A
    var re = [],
      le = 0
    return (
      fe(A, re, '', '', function (he) {
        return $.call(J, he, le++)
      }),
      re
    )
  }
  function X(A) {
    if (A._status === -1) {
      var $ = A._result
      ;(($ = $()),
        $.then(
          function (J) {
            ;(A._status === 0 || A._status === -1) && ((A._status = 1), (A._result = J))
          },
          function (J) {
            ;(A._status === 0 || A._status === -1) && ((A._status = 2), (A._result = J))
          }
        ),
        A._status === -1 && ((A._status = 0), (A._result = $)))
    }
    if (A._status === 1) return A._result.default
    throw A._result
  }
  var q = { current: null },
    L = { transition: null },
    V = { ReactCurrentDispatcher: q, ReactCurrentBatchConfig: L, ReactCurrentOwner: B }
  function U() {
    throw Error('act(...) is not supported in production builds of React.')
  }
  return (
    (Pe.Children = {
      map: xe,
      forEach: function (A, $, J) {
        xe(
          A,
          function () {
            $.apply(this, arguments)
          },
          J
        )
      },
      count: function (A) {
        var $ = 0
        return (
          xe(A, function () {
            $++
          }),
          $
        )
      },
      toArray: function (A) {
        return (
          xe(A, function ($) {
            return $
          }) || []
        )
      },
      only: function (A) {
        if (!ne(A))
          throw Error('React.Children.only expected to receive a single React element child.')
        return A
      },
    }),
    (Pe.Component = E),
    (Pe.Fragment = r),
    (Pe.Profiler = a),
    (Pe.PureComponent = j),
    (Pe.StrictMode = s),
    (Pe.Suspense = p),
    (Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = V),
    (Pe.act = U),
    (Pe.cloneElement = function (A, $, J) {
      if (A == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' + A + '.'
        )
      var re = N({}, A.props),
        le = A.key,
        he = A.ref,
        Y = A._owner
      if ($ != null) {
        if (
          ($.ref !== void 0 && ((he = $.ref), (Y = B.current)),
          $.key !== void 0 && (le = '' + $.key),
          A.type && A.type.defaultProps)
        )
          var ee = A.type.defaultProps
        for (we in $)
          I.call($, we) &&
            !z.hasOwnProperty(we) &&
            (re[we] = $[we] === void 0 && ee !== void 0 ? ee[we] : $[we])
      }
      var we = arguments.length - 2
      if (we === 1) re.children = J
      else if (1 < we) {
        ee = Array(we)
        for (var Se = 0; Se < we; Se++) ee[Se] = arguments[Se + 2]
        re.children = ee
      }
      return { $$typeof: e, type: A.type, key: le, ref: he, props: re, _owner: Y }
    }),
    (Pe.createContext = function (A) {
      return (
        (A = {
          $$typeof: u,
          _currentValue: A,
          _currentValue2: A,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (A.Provider = { $$typeof: l, _context: A }),
        (A.Consumer = A)
      )
    }),
    (Pe.createElement = W),
    (Pe.createFactory = function (A) {
      var $ = W.bind(null, A)
      return (($.type = A), $)
    }),
    (Pe.createRef = function () {
      return { current: null }
    }),
    (Pe.forwardRef = function (A) {
      return { $$typeof: f, render: A }
    }),
    (Pe.isValidElement = ne),
    (Pe.lazy = function (A) {
      return { $$typeof: x, _payload: { _status: -1, _result: A }, _init: X }
    }),
    (Pe.memo = function (A, $) {
      return { $$typeof: g, type: A, compare: $ === void 0 ? null : $ }
    }),
    (Pe.startTransition = function (A) {
      var $ = L.transition
      L.transition = {}
      try {
        A()
      } finally {
        L.transition = $
      }
    }),
    (Pe.unstable_act = U),
    (Pe.useCallback = function (A, $) {
      return q.current.useCallback(A, $)
    }),
    (Pe.useContext = function (A) {
      return q.current.useContext(A)
    }),
    (Pe.useDebugValue = function () {}),
    (Pe.useDeferredValue = function (A) {
      return q.current.useDeferredValue(A)
    }),
    (Pe.useEffect = function (A, $) {
      return q.current.useEffect(A, $)
    }),
    (Pe.useId = function () {
      return q.current.useId()
    }),
    (Pe.useImperativeHandle = function (A, $, J) {
      return q.current.useImperativeHandle(A, $, J)
    }),
    (Pe.useInsertionEffect = function (A, $) {
      return q.current.useInsertionEffect(A, $)
    }),
    (Pe.useLayoutEffect = function (A, $) {
      return q.current.useLayoutEffect(A, $)
    }),
    (Pe.useMemo = function (A, $) {
      return q.current.useMemo(A, $)
    }),
    (Pe.useReducer = function (A, $, J) {
      return q.current.useReducer(A, $, J)
    }),
    (Pe.useRef = function (A) {
      return q.current.useRef(A)
    }),
    (Pe.useState = function (A) {
      return q.current.useState(A)
    }),
    (Pe.useSyncExternalStore = function (A, $, J) {
      return q.current.useSyncExternalStore(A, $, J)
    }),
    (Pe.useTransition = function () {
      return q.current.useTransition()
    }),
    (Pe.version = '18.3.1'),
    Pe
  )
}
var ag
function uf() {
  return (ag || ((ag = 1), (qu.exports = RC())), qu.exports)
}
var lg
function AC() {
  if (lg) return si
  lg = 1
  var e = uf(),
    t = Symbol.for('react.element'),
    r = Symbol.for('react.fragment'),
    s = Object.prototype.hasOwnProperty,
    a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    l = { key: !0, ref: !0, __self: !0, __source: !0 }
  function u(f, p, g) {
    var x,
      h = {},
      w = null,
      S = null
    ;(g !== void 0 && (w = '' + g),
      p.key !== void 0 && (w = '' + p.key),
      p.ref !== void 0 && (S = p.ref))
    for (x in p) s.call(p, x) && !l.hasOwnProperty(x) && (h[x] = p[x])
    if (f && f.defaultProps) for (x in ((p = f.defaultProps), p)) h[x] === void 0 && (h[x] = p[x])
    return { $$typeof: t, type: f, key: w, ref: S, props: h, _owner: a.current }
  }
  return ((si.Fragment = r), (si.jsx = u), (si.jsxs = u), si)
}
var cg
function MC() {
  return (cg || ((cg = 1), (Xu.exports = AC())), Xu.exports)
}
var d = MC(),
  ol = {},
  Qu = { exports: {} },
  At = {},
  Zu = { exports: {} },
  Ju = {}
var ug
function _C() {
  return (
    ug ||
      ((ug = 1),
      (function (e) {
        function t(L, V) {
          var U = L.length
          L.push(V)
          e: for (; 0 < U; ) {
            var A = (U - 1) >>> 1,
              $ = L[A]
            if (0 < a($, V)) ((L[A] = V), (L[U] = $), (U = A))
            else break e
          }
        }
        function r(L) {
          return L.length === 0 ? null : L[0]
        }
        function s(L) {
          if (L.length === 0) return null
          var V = L[0],
            U = L.pop()
          if (U !== V) {
            L[0] = U
            e: for (var A = 0, $ = L.length, J = $ >>> 1; A < J; ) {
              var re = 2 * (A + 1) - 1,
                le = L[re],
                he = re + 1,
                Y = L[he]
              if (0 > a(le, U))
                he < $ && 0 > a(Y, le)
                  ? ((L[A] = Y), (L[he] = U), (A = he))
                  : ((L[A] = le), (L[re] = U), (A = re))
              else if (he < $ && 0 > a(Y, U)) ((L[A] = Y), (L[he] = U), (A = he))
              else break e
            }
          }
          return V
        }
        function a(L, V) {
          var U = L.sortIndex - V.sortIndex
          return U !== 0 ? U : L.id - V.id
        }
        if (typeof performance == 'object' && typeof performance.now == 'function') {
          var l = performance
          e.unstable_now = function () {
            return l.now()
          }
        } else {
          var u = Date,
            f = u.now()
          e.unstable_now = function () {
            return u.now() - f
          }
        }
        var p = [],
          g = [],
          x = 1,
          h = null,
          w = 3,
          S = !1,
          N = !1,
          C = !1,
          E = typeof setTimeout == 'function' ? setTimeout : null,
          P = typeof clearTimeout == 'function' ? clearTimeout : null,
          j = typeof setImmediate < 'u' ? setImmediate : null
        typeof navigator < 'u' &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling)
        function k(L) {
          for (var V = r(g); V !== null; ) {
            if (V.callback === null) s(g)
            else if (V.startTime <= L) (s(g), (V.sortIndex = V.expirationTime), t(p, V))
            else break
            V = r(g)
          }
        }
        function _(L) {
          if (((C = !1), k(L), !N))
            if (r(p) !== null) ((N = !0), X(I))
            else {
              var V = r(g)
              V !== null && q(_, V.startTime - L)
            }
        }
        function I(L, V) {
          ;((N = !1), C && ((C = !1), P(W), (W = -1)), (S = !0))
          var U = w
          try {
            for (k(V), h = r(p); h !== null && (!(h.expirationTime > V) || (L && !me())); ) {
              var A = h.callback
              if (typeof A == 'function') {
                ;((h.callback = null), (w = h.priorityLevel))
                var $ = A(h.expirationTime <= V)
                ;((V = e.unstable_now()),
                  typeof $ == 'function' ? (h.callback = $) : h === r(p) && s(p),
                  k(V))
              } else s(p)
              h = r(p)
            }
            if (h !== null) var J = !0
            else {
              var re = r(g)
              ;(re !== null && q(_, re.startTime - V), (J = !1))
            }
            return J
          } finally {
            ;((h = null), (w = U), (S = !1))
          }
        }
        var B = !1,
          z = null,
          W = -1,
          oe = 5,
          ne = -1
        function me() {
          return !(e.unstable_now() - ne < oe)
        }
        function te() {
          if (z !== null) {
            var L = e.unstable_now()
            ne = L
            var V = !0
            try {
              V = z(!0, L)
            } finally {
              V ? ue() : ((B = !1), (z = null))
            }
          } else B = !1
        }
        var ue
        if (typeof j == 'function')
          ue = function () {
            j(te)
          }
        else if (typeof MessageChannel < 'u') {
          var fe = new MessageChannel(),
            xe = fe.port2
          ;((fe.port1.onmessage = te),
            (ue = function () {
              xe.postMessage(null)
            }))
        } else
          ue = function () {
            E(te, 0)
          }
        function X(L) {
          ;((z = L), B || ((B = !0), ue()))
        }
        function q(L, V) {
          W = E(function () {
            L(e.unstable_now())
          }, V)
        }
        ;((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (L) {
            L.callback = null
          }),
          (e.unstable_continueExecution = function () {
            N || S || ((N = !0), X(I))
          }),
          (e.unstable_forceFrameRate = function (L) {
            0 > L || 125 < L
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (oe = 0 < L ? Math.floor(1e3 / L) : 5)
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return w
          }),
          (e.unstable_getFirstCallbackNode = function () {
            return r(p)
          }),
          (e.unstable_next = function (L) {
            switch (w) {
              case 1:
              case 2:
              case 3:
                var V = 3
                break
              default:
                V = w
            }
            var U = w
            w = V
            try {
              return L()
            } finally {
              w = U
            }
          }),
          (e.unstable_pauseExecution = function () {}),
          (e.unstable_requestPaint = function () {}),
          (e.unstable_runWithPriority = function (L, V) {
            switch (L) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break
              default:
                L = 3
            }
            var U = w
            w = L
            try {
              return V()
            } finally {
              w = U
            }
          }),
          (e.unstable_scheduleCallback = function (L, V, U) {
            var A = e.unstable_now()
            switch (
              (typeof U == 'object' && U !== null
                ? ((U = U.delay), (U = typeof U == 'number' && 0 < U ? A + U : A))
                : (U = A),
              L)
            ) {
              case 1:
                var $ = -1
                break
              case 2:
                $ = 250
                break
              case 5:
                $ = 1073741823
                break
              case 4:
                $ = 1e4
                break
              default:
                $ = 5e3
            }
            return (
              ($ = U + $),
              (L = {
                id: x++,
                callback: V,
                priorityLevel: L,
                startTime: U,
                expirationTime: $,
                sortIndex: -1,
              }),
              U > A
                ? ((L.sortIndex = U),
                  t(g, L),
                  r(p) === null && L === r(g) && (C ? (P(W), (W = -1)) : (C = !0), q(_, U - A)))
                : ((L.sortIndex = $), t(p, L), N || S || ((N = !0), X(I))),
              L
            )
          }),
          (e.unstable_shouldYield = me),
          (e.unstable_wrapCallback = function (L) {
            var V = w
            return function () {
              var U = w
              w = V
              try {
                return L.apply(this, arguments)
              } finally {
                w = U
              }
            }
          }))
      })(Ju)),
    Ju
  )
}
var dg
function DC() {
  return (dg || ((dg = 1), (Zu.exports = _C())), Zu.exports)
}
var fg
function IC() {
  if (fg) return At
  fg = 1
  var e = uf(),
    t = DC()
  function r(n) {
    for (
      var o = 'https://reactjs.org/docs/error-decoder.html?invariant=' + n, i = 1;
      i < arguments.length;
      i++
    )
      o += '&args[]=' + encodeURIComponent(arguments[i])
    return (
      'Minified React error #' +
      n +
      '; visit ' +
      o +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    )
  }
  var s = new Set(),
    a = {}
  function l(n, o) {
    ;(u(n, o), u(n + 'Capture', o))
  }
  function u(n, o) {
    for (a[n] = o, n = 0; n < o.length; n++) s.add(o[n])
  }
  var f = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    p = Object.prototype.hasOwnProperty,
    g =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    x = {},
    h = {}
  function w(n) {
    return p.call(h, n) ? !0 : p.call(x, n) ? !1 : g.test(n) ? (h[n] = !0) : ((x[n] = !0), !1)
  }
  function S(n, o, i, c) {
    if (i !== null && i.type === 0) return !1
    switch (typeof o) {
      case 'function':
      case 'symbol':
        return !0
      case 'boolean':
        return c
          ? !1
          : i !== null
            ? !i.acceptsBooleans
            : ((n = n.toLowerCase().slice(0, 5)), n !== 'data-' && n !== 'aria-')
      default:
        return !1
    }
  }
  function N(n, o, i, c) {
    if (o === null || typeof o > 'u' || S(n, o, i, c)) return !0
    if (c) return !1
    if (i !== null)
      switch (i.type) {
        case 3:
          return !o
        case 4:
          return o === !1
        case 5:
          return isNaN(o)
        case 6:
          return isNaN(o) || 1 > o
      }
    return !1
  }
  function C(n, o, i, c, m, y, b) {
    ;((this.acceptsBooleans = o === 2 || o === 3 || o === 4),
      (this.attributeName = c),
      (this.attributeNamespace = m),
      (this.mustUseProperty = i),
      (this.propertyName = n),
      (this.type = o),
      (this.sanitizeURL = y),
      (this.removeEmptyString = b))
  }
  var E = {}
  ;('children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (n) {
      E[n] = new C(n, 0, !1, n, null, !1, !1)
    }),
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (n) {
      var o = n[0]
      E[o] = new C(o, 1, !1, n[1], null, !1, !1)
    }),
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (n) {
      E[n] = new C(n, 2, !1, n.toLowerCase(), null, !1, !1)
    }),
    ['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(
      function (n) {
        E[n] = new C(n, 2, !1, n, null, !1, !1)
      }
    ),
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (n) {
        E[n] = new C(n, 3, !1, n.toLowerCase(), null, !1, !1)
      }),
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (n) {
      E[n] = new C(n, 3, !0, n, null, !1, !1)
    }),
    ['capture', 'download'].forEach(function (n) {
      E[n] = new C(n, 4, !1, n, null, !1, !1)
    }),
    ['cols', 'rows', 'size', 'span'].forEach(function (n) {
      E[n] = new C(n, 6, !1, n, null, !1, !1)
    }),
    ['rowSpan', 'start'].forEach(function (n) {
      E[n] = new C(n, 5, !1, n.toLowerCase(), null, !1, !1)
    }))
  var P = /[\-:]([a-z])/g
  function j(n) {
    return n[1].toUpperCase()
  }
  ;('accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (n) {
      var o = n.replace(P, j)
      E[o] = new C(o, 1, !1, n, null, !1, !1)
    }),
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (n) {
        var o = n.replace(P, j)
        E[o] = new C(o, 1, !1, n, 'http://www.w3.org/1999/xlink', !1, !1)
      }),
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (n) {
      var o = n.replace(P, j)
      E[o] = new C(o, 1, !1, n, 'http://www.w3.org/XML/1998/namespace', !1, !1)
    }),
    ['tabIndex', 'crossOrigin'].forEach(function (n) {
      E[n] = new C(n, 1, !1, n.toLowerCase(), null, !1, !1)
    }),
    (E.xlinkHref = new C('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1)),
    ['src', 'href', 'action', 'formAction'].forEach(function (n) {
      E[n] = new C(n, 1, !1, n.toLowerCase(), null, !0, !0)
    }))
  function k(n, o, i, c) {
    var m = E.hasOwnProperty(o) ? E[o] : null
    ;(m !== null
      ? m.type !== 0
      : c || !(2 < o.length) || (o[0] !== 'o' && o[0] !== 'O') || (o[1] !== 'n' && o[1] !== 'N')) &&
      (N(o, i, m, c) && (i = null),
      c || m === null
        ? w(o) && (i === null ? n.removeAttribute(o) : n.setAttribute(o, '' + i))
        : m.mustUseProperty
          ? (n[m.propertyName] = i === null ? (m.type === 3 ? !1 : '') : i)
          : ((o = m.attributeName),
            (c = m.attributeNamespace),
            i === null
              ? n.removeAttribute(o)
              : ((m = m.type),
                (i = m === 3 || (m === 4 && i === !0) ? '' : '' + i),
                c ? n.setAttributeNS(c, o, i) : n.setAttribute(o, i))))
  }
  var _ = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    I = Symbol.for('react.element'),
    B = Symbol.for('react.portal'),
    z = Symbol.for('react.fragment'),
    W = Symbol.for('react.strict_mode'),
    oe = Symbol.for('react.profiler'),
    ne = Symbol.for('react.provider'),
    me = Symbol.for('react.context'),
    te = Symbol.for('react.forward_ref'),
    ue = Symbol.for('react.suspense'),
    fe = Symbol.for('react.suspense_list'),
    xe = Symbol.for('react.memo'),
    X = Symbol.for('react.lazy'),
    q = Symbol.for('react.offscreen'),
    L = Symbol.iterator
  function V(n) {
    return n === null || typeof n != 'object'
      ? null
      : ((n = (L && n[L]) || n['@@iterator']), typeof n == 'function' ? n : null)
  }
  var U = Object.assign,
    A
  function $(n) {
    if (A === void 0)
      try {
        throw Error()
      } catch (i) {
        var o = i.stack.trim().match(/\n( *(at )?)/)
        A = (o && o[1]) || ''
      }
    return (
      `
` +
      A +
      n
    )
  }
  var J = !1
  function re(n, o) {
    if (!n || J) return ''
    J = !0
    var i = Error.prepareStackTrace
    Error.prepareStackTrace = void 0
    try {
      if (o)
        if (
          ((o = function () {
            throw Error()
          }),
          Object.defineProperty(o.prototype, 'props', {
            set: function () {
              throw Error()
            },
          }),
          typeof Reflect == 'object' && Reflect.construct)
        ) {
          try {
            Reflect.construct(o, [])
          } catch (F) {
            var c = F
          }
          Reflect.construct(n, [], o)
        } else {
          try {
            o.call()
          } catch (F) {
            c = F
          }
          n.call(o.prototype)
        }
      else {
        try {
          throw Error()
        } catch (F) {
          c = F
        }
        n()
      }
    } catch (F) {
      if (F && c && typeof F.stack == 'string') {
        for (
          var m = F.stack.split(`
`),
            y = c.stack.split(`
`),
            b = m.length - 1,
            T = y.length - 1;
          1 <= b && 0 <= T && m[b] !== y[T];

        )
          T--
        for (; 1 <= b && 0 <= T; b--, T--)
          if (m[b] !== y[T]) {
            if (b !== 1 || T !== 1)
              do
                if ((b--, T--, 0 > T || m[b] !== y[T])) {
                  var R =
                    `
` + m[b].replace(' at new ', ' at ')
                  return (
                    n.displayName &&
                      R.includes('<anonymous>') &&
                      (R = R.replace('<anonymous>', n.displayName)),
                    R
                  )
                }
              while (1 <= b && 0 <= T)
            break
          }
      }
    } finally {
      ;((J = !1), (Error.prepareStackTrace = i))
    }
    return (n = n ? n.displayName || n.name : '') ? $(n) : ''
  }
  function le(n) {
    switch (n.tag) {
      case 5:
        return $(n.type)
      case 16:
        return $('Lazy')
      case 13:
        return $('Suspense')
      case 19:
        return $('SuspenseList')
      case 0:
      case 2:
      case 15:
        return ((n = re(n.type, !1)), n)
      case 11:
        return ((n = re(n.type.render, !1)), n)
      case 1:
        return ((n = re(n.type, !0)), n)
      default:
        return ''
    }
  }
  function he(n) {
    if (n == null) return null
    if (typeof n == 'function') return n.displayName || n.name || null
    if (typeof n == 'string') return n
    switch (n) {
      case z:
        return 'Fragment'
      case B:
        return 'Portal'
      case oe:
        return 'Profiler'
      case W:
        return 'StrictMode'
      case ue:
        return 'Suspense'
      case fe:
        return 'SuspenseList'
    }
    if (typeof n == 'object')
      switch (n.$$typeof) {
        case me:
          return (n.displayName || 'Context') + '.Consumer'
        case ne:
          return (n._context.displayName || 'Context') + '.Provider'
        case te:
          var o = n.render
          return (
            (n = n.displayName),
            n ||
              ((n = o.displayName || o.name || ''),
              (n = n !== '' ? 'ForwardRef(' + n + ')' : 'ForwardRef')),
            n
          )
        case xe:
          return ((o = n.displayName || null), o !== null ? o : he(n.type) || 'Memo')
        case X:
          ;((o = n._payload), (n = n._init))
          try {
            return he(n(o))
          } catch {}
      }
    return null
  }
  function Y(n) {
    var o = n.type
    switch (n.tag) {
      case 24:
        return 'Cache'
      case 9:
        return (o.displayName || 'Context') + '.Consumer'
      case 10:
        return (o._context.displayName || 'Context') + '.Provider'
      case 18:
        return 'DehydratedFragment'
      case 11:
        return (
          (n = o.render),
          (n = n.displayName || n.name || ''),
          o.displayName || (n !== '' ? 'ForwardRef(' + n + ')' : 'ForwardRef')
        )
      case 7:
        return 'Fragment'
      case 5:
        return o
      case 4:
        return 'Portal'
      case 3:
        return 'Root'
      case 6:
        return 'Text'
      case 16:
        return he(o)
      case 8:
        return o === W ? 'StrictMode' : 'Mode'
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
        if (typeof o == 'function') return o.displayName || o.name || null
        if (typeof o == 'string') return o
    }
    return null
  }
  function ee(n) {
    switch (typeof n) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return n
      case 'object':
        return n
      default:
        return ''
    }
  }
  function we(n) {
    var o = n.type
    return (n = n.nodeName) && n.toLowerCase() === 'input' && (o === 'checkbox' || o === 'radio')
  }
  function Se(n) {
    var o = we(n) ? 'checked' : 'value',
      i = Object.getOwnPropertyDescriptor(n.constructor.prototype, o),
      c = '' + n[o]
    if (
      !n.hasOwnProperty(o) &&
      typeof i < 'u' &&
      typeof i.get == 'function' &&
      typeof i.set == 'function'
    ) {
      var m = i.get,
        y = i.set
      return (
        Object.defineProperty(n, o, {
          configurable: !0,
          get: function () {
            return m.call(this)
          },
          set: function (b) {
            ;((c = '' + b), y.call(this, b))
          },
        }),
        Object.defineProperty(n, o, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return c
          },
          setValue: function (b) {
            c = '' + b
          },
          stopTracking: function () {
            ;((n._valueTracker = null), delete n[o])
          },
        }
      )
    }
  }
  function Te(n) {
    n._valueTracker || (n._valueTracker = Se(n))
  }
  function Me(n) {
    if (!n) return !1
    var o = n._valueTracker
    if (!o) return !0
    var i = o.getValue(),
      c = ''
    return (
      n && (c = we(n) ? (n.checked ? 'true' : 'false') : n.value),
      (n = c),
      n !== i ? (o.setValue(n), !0) : !1
    )
  }
  function Je(n) {
    if (((n = n || (typeof document < 'u' ? document : void 0)), typeof n > 'u')) return null
    try {
      return n.activeElement || n.body
    } catch {
      return n.body
    }
  }
  function bt(n, o) {
    var i = o.checked
    return U({}, o, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: i ?? n._wrapperState.initialChecked,
    })
  }
  function er(n, o) {
    var i = o.defaultValue == null ? '' : o.defaultValue,
      c = o.checked != null ? o.checked : o.defaultChecked
    ;((i = ee(o.value != null ? o.value : i)),
      (n._wrapperState = {
        initialChecked: c,
        initialValue: i,
        controlled:
          o.type === 'checkbox' || o.type === 'radio' ? o.checked != null : o.value != null,
      }))
  }
  function Dn(n, o) {
    ;((o = o.checked), o != null && k(n, 'checked', o, !1))
  }
  function Dt(n, o) {
    Dn(n, o)
    var i = ee(o.value),
      c = o.type
    if (i != null)
      c === 'number'
        ? ((i === 0 && n.value === '') || n.value != i) && (n.value = '' + i)
        : n.value !== '' + i && (n.value = '' + i)
    else if (c === 'submit' || c === 'reset') {
      n.removeAttribute('value')
      return
    }
    ;(o.hasOwnProperty('value')
      ? It(n, o.type, i)
      : o.hasOwnProperty('defaultValue') && It(n, o.type, ee(o.defaultValue)),
      o.checked == null && o.defaultChecked != null && (n.defaultChecked = !!o.defaultChecked))
  }
  function ws(n, o, i) {
    if (o.hasOwnProperty('value') || o.hasOwnProperty('defaultValue')) {
      var c = o.type
      if (!((c !== 'submit' && c !== 'reset') || (o.value !== void 0 && o.value !== null))) return
      ;((o = '' + n._wrapperState.initialValue),
        i || o === n.value || (n.value = o),
        (n.defaultValue = o))
    }
    ;((i = n.name),
      i !== '' && (n.name = ''),
      (n.defaultChecked = !!n._wrapperState.initialChecked),
      i !== '' && (n.name = i))
  }
  function It(n, o, i) {
    ;(o !== 'number' || Je(n.ownerDocument) !== n) &&
      (i == null
        ? (n.defaultValue = '' + n._wrapperState.initialValue)
        : n.defaultValue !== '' + i && (n.defaultValue = '' + i))
  }
  var Wr = Array.isArray
  function tr(n, o, i, c) {
    if (((n = n.options), o)) {
      o = {}
      for (var m = 0; m < i.length; m++) o['$' + i[m]] = !0
      for (i = 0; i < n.length; i++)
        ((m = o.hasOwnProperty('$' + n[i].value)),
          n[i].selected !== m && (n[i].selected = m),
          m && c && (n[i].defaultSelected = !0))
    } else {
      for (i = '' + ee(i), o = null, m = 0; m < n.length; m++) {
        if (n[m].value === i) {
          ;((n[m].selected = !0), c && (n[m].defaultSelected = !0))
          return
        }
        o !== null || n[m].disabled || (o = n[m])
      }
      o !== null && (o.selected = !0)
    }
  }
  function lt(n, o) {
    if (o.dangerouslySetInnerHTML != null) throw Error(r(91))
    return U({}, o, {
      value: void 0,
      defaultValue: void 0,
      children: '' + n._wrapperState.initialValue,
    })
  }
  function In(n, o) {
    var i = o.value
    if (i == null) {
      if (((i = o.children), (o = o.defaultValue), i != null)) {
        if (o != null) throw Error(r(92))
        if (Wr(i)) {
          if (1 < i.length) throw Error(r(93))
          i = i[0]
        }
        o = i
      }
      ;(o == null && (o = ''), (i = o))
    }
    n._wrapperState = { initialValue: ee(i) }
  }
  function Yi(n, o) {
    var i = ee(o.value),
      c = ee(o.defaultValue)
    ;(i != null &&
      ((i = '' + i),
      i !== n.value && (n.value = i),
      o.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i)),
      c != null && (n.defaultValue = '' + c))
  }
  function Xi(n) {
    var o = n.textContent
    o === n._wrapperState.initialValue && o !== '' && o !== null && (n.value = o)
  }
  function Ur(n) {
    switch (n) {
      case 'svg':
        return 'http://www.w3.org/2000/svg'
      case 'math':
        return 'http://www.w3.org/1998/Math/MathML'
      default:
        return 'http://www.w3.org/1999/xhtml'
    }
  }
  function bs(n, o) {
    return n == null || n === 'http://www.w3.org/1999/xhtml'
      ? Ur(o)
      : n === 'http://www.w3.org/2000/svg' && o === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : n
  }
  var Hr,
    Co = (function (n) {
      return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
        ? function (o, i, c, m) {
            MSApp.execUnsafeLocalFunction(function () {
              return n(o, i, c, m)
            })
          }
        : n
    })(function (n, o) {
      if (n.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in n) n.innerHTML = o
      else {
        for (
          Hr = Hr || document.createElement('div'),
            Hr.innerHTML = '<svg>' + o.valueOf().toString() + '</svg>',
            o = Hr.firstChild;
          n.firstChild;

        )
          n.removeChild(n.firstChild)
        for (; o.firstChild; ) n.appendChild(o.firstChild)
      }
    })
  function Gt(n, o) {
    if (o) {
      var i = n.firstChild
      if (i && i === n.lastChild && i.nodeType === 3) {
        i.nodeValue = o
        return
      }
    }
    n.textContent = o
  }
  var nr = {
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
    rr = ['Webkit', 'ms', 'Moz', 'O']
  Object.keys(nr).forEach(function (n) {
    rr.forEach(function (o) {
      ;((o = o + n.charAt(0).toUpperCase() + n.substring(1)), (nr[o] = nr[n]))
    })
  })
  function qi(n, o, i) {
    return o == null || typeof o == 'boolean' || o === ''
      ? ''
      : i || typeof o != 'number' || o === 0 || (nr.hasOwnProperty(n) && nr[n])
        ? ('' + o).trim()
        : o + 'px'
  }
  function Qi(n, o) {
    n = n.style
    for (var i in o)
      if (o.hasOwnProperty(i)) {
        var c = i.indexOf('--') === 0,
          m = qi(i, o[i], c)
        ;(i === 'float' && (i = 'cssFloat'), c ? n.setProperty(i, m) : (n[i] = m))
      }
  }
  var Zi = U(
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
  function Eo(n, o) {
    if (o) {
      if (Zi[n] && (o.children != null || o.dangerouslySetInnerHTML != null)) throw Error(r(137, n))
      if (o.dangerouslySetInnerHTML != null) {
        if (o.children != null) throw Error(r(60))
        if (
          typeof o.dangerouslySetInnerHTML != 'object' ||
          !('__html' in o.dangerouslySetInnerHTML)
        )
          throw Error(r(61))
      }
      if (o.style != null && typeof o.style != 'object') throw Error(r(62))
    }
  }
  function Ss(n, o) {
    if (n.indexOf('-') === -1) return typeof o.is == 'string'
    switch (n) {
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
  var Gr = null
  function Kt(n) {
    return (
      (n = n.target || n.srcElement || window),
      n.correspondingUseElement && (n = n.correspondingUseElement),
      n.nodeType === 3 ? n.parentNode : n
    )
  }
  var Cs = null,
    or = null,
    On = null
  function Es(n) {
    if ((n = Us(n))) {
      if (typeof Cs != 'function') throw Error(r(280))
      var o = n.stateNode
      o && ((o = xa(o)), Cs(n.stateNode, n.type, o))
    }
  }
  function Ce(n) {
    or ? (On ? On.push(n) : (On = [n])) : (or = n)
  }
  function Ge() {
    if (or) {
      var n = or,
        o = On
      if (((On = or = null), Es(n), o)) for (n = 0; n < o.length; n++) Es(o[n])
    }
  }
  function et(n, o) {
    return n(o)
  }
  function pt() {}
  var sr = !1
  function Qe(n, o, i) {
    if (sr) return n(o, i)
    sr = !0
    try {
      return et(n, o, i)
    } finally {
      ;((sr = !1), (or !== null || On !== null) && (pt(), Ge()))
    }
  }
  function rt(n, o) {
    var i = n.stateNode
    if (i === null) return null
    var c = xa(i)
    if (c === null) return null
    i = c[o]
    e: switch (o) {
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
        ;((c = !c.disabled) ||
          ((n = n.type),
          (c = !(n === 'button' || n === 'input' || n === 'select' || n === 'textarea'))),
          (n = !c))
        break e
      default:
        n = !1
    }
    if (n) return null
    if (i && typeof i != 'function') throw Error(r(231, o, typeof i))
    return i
  }
  var ir = !1
  if (f)
    try {
      var ct = {}
      ;(Object.defineProperty(ct, 'passive', {
        get: function () {
          ir = !0
        },
      }),
        window.addEventListener('test', ct, ct),
        window.removeEventListener('test', ct, ct))
    } catch {
      ir = !1
    }
  function Ot(n, o, i, c, m, y, b, T, R) {
    var F = Array.prototype.slice.call(arguments, 3)
    try {
      o.apply(i, F)
    } catch (G) {
      this.onError(G)
    }
  }
  var ar = !1,
    Yt = null,
    Ns = !1,
    mc = null,
    O1 = {
      onError: function (n) {
        ;((ar = !0), (Yt = n))
      },
    }
  function L1(n, o, i, c, m, y, b, T, R) {
    ;((ar = !1), (Yt = null), Ot.apply(O1, arguments))
  }
  function F1(n, o, i, c, m, y, b, T, R) {
    if ((L1.apply(this, arguments), ar)) {
      if (ar) {
        var F = Yt
        ;((ar = !1), (Yt = null))
      } else throw Error(r(198))
      Ns || ((Ns = !0), (mc = F))
    }
  }
  function Kr(n) {
    var o = n,
      i = n
    if (n.alternate) for (; o.return; ) o = o.return
    else {
      n = o
      do ((o = n), (o.flags & 4098) !== 0 && (i = o.return), (n = o.return))
      while (n)
    }
    return o.tag === 3 ? i : null
  }
  function kp(n) {
    if (n.tag === 13) {
      var o = n.memoizedState
      if ((o === null && ((n = n.alternate), n !== null && (o = n.memoizedState)), o !== null))
        return o.dehydrated
    }
    return null
  }
  function Rp(n) {
    if (Kr(n) !== n) throw Error(r(188))
  }
  function V1(n) {
    var o = n.alternate
    if (!o) {
      if (((o = Kr(n)), o === null)) throw Error(r(188))
      return o !== n ? null : n
    }
    for (var i = n, c = o; ; ) {
      var m = i.return
      if (m === null) break
      var y = m.alternate
      if (y === null) {
        if (((c = m.return), c !== null)) {
          i = c
          continue
        }
        break
      }
      if (m.child === y.child) {
        for (y = m.child; y; ) {
          if (y === i) return (Rp(m), n)
          if (y === c) return (Rp(m), o)
          y = y.sibling
        }
        throw Error(r(188))
      }
      if (i.return !== c.return) ((i = m), (c = y))
      else {
        for (var b = !1, T = m.child; T; ) {
          if (T === i) {
            ;((b = !0), (i = m), (c = y))
            break
          }
          if (T === c) {
            ;((b = !0), (c = m), (i = y))
            break
          }
          T = T.sibling
        }
        if (!b) {
          for (T = y.child; T; ) {
            if (T === i) {
              ;((b = !0), (i = y), (c = m))
              break
            }
            if (T === c) {
              ;((b = !0), (c = y), (i = m))
              break
            }
            T = T.sibling
          }
          if (!b) throw Error(r(189))
        }
      }
      if (i.alternate !== c) throw Error(r(190))
    }
    if (i.tag !== 3) throw Error(r(188))
    return i.stateNode.current === i ? n : o
  }
  function Ap(n) {
    return ((n = V1(n)), n !== null ? Mp(n) : null)
  }
  function Mp(n) {
    if (n.tag === 5 || n.tag === 6) return n
    for (n = n.child; n !== null; ) {
      var o = Mp(n)
      if (o !== null) return o
      n = n.sibling
    }
    return null
  }
  var _p = t.unstable_scheduleCallback,
    Dp = t.unstable_cancelCallback,
    B1 = t.unstable_shouldYield,
    z1 = t.unstable_requestPaint,
    Ke = t.unstable_now,
    $1 = t.unstable_getCurrentPriorityLevel,
    hc = t.unstable_ImmediatePriority,
    Ip = t.unstable_UserBlockingPriority,
    Ji = t.unstable_NormalPriority,
    W1 = t.unstable_LowPriority,
    Op = t.unstable_IdlePriority,
    ea = null,
    yn = null
  function U1(n) {
    if (yn && typeof yn.onCommitFiberRoot == 'function')
      try {
        yn.onCommitFiberRoot(ea, n, void 0, (n.current.flags & 128) === 128)
      } catch {}
  }
  var sn = Math.clz32 ? Math.clz32 : K1,
    H1 = Math.log,
    G1 = Math.LN2
  function K1(n) {
    return ((n >>>= 0), n === 0 ? 32 : (31 - ((H1(n) / G1) | 0)) | 0)
  }
  var ta = 64,
    na = 4194304
  function Ps(n) {
    switch (n & -n) {
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
        return n & 4194240
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424
      case 134217728:
        return 134217728
      case 268435456:
        return 268435456
      case 536870912:
        return 536870912
      case 1073741824:
        return 1073741824
      default:
        return n
    }
  }
  function ra(n, o) {
    var i = n.pendingLanes
    if (i === 0) return 0
    var c = 0,
      m = n.suspendedLanes,
      y = n.pingedLanes,
      b = i & 268435455
    if (b !== 0) {
      var T = b & ~m
      T !== 0 ? (c = Ps(T)) : ((y &= b), y !== 0 && (c = Ps(y)))
    } else ((b = i & ~m), b !== 0 ? (c = Ps(b)) : y !== 0 && (c = Ps(y)))
    if (c === 0) return 0
    if (
      o !== 0 &&
      o !== c &&
      (o & m) === 0 &&
      ((m = c & -c), (y = o & -o), m >= y || (m === 16 && (y & 4194240) !== 0))
    )
      return o
    if (((c & 4) !== 0 && (c |= i & 16), (o = n.entangledLanes), o !== 0))
      for (n = n.entanglements, o &= c; 0 < o; )
        ((i = 31 - sn(o)), (m = 1 << i), (c |= n[i]), (o &= ~m))
    return c
  }
  function Y1(n, o) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return o + 250
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
        return o + 5e3
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
  function X1(n, o) {
    for (
      var i = n.suspendedLanes, c = n.pingedLanes, m = n.expirationTimes, y = n.pendingLanes;
      0 < y;

    ) {
      var b = 31 - sn(y),
        T = 1 << b,
        R = m[b]
      ;(R === -1
        ? ((T & i) === 0 || (T & c) !== 0) && (m[b] = Y1(T, o))
        : R <= o && (n.expiredLanes |= T),
        (y &= ~T))
    }
  }
  function gc(n) {
    return ((n = n.pendingLanes & -1073741825), n !== 0 ? n : n & 1073741824 ? 1073741824 : 0)
  }
  function Lp() {
    var n = ta
    return ((ta <<= 1), (ta & 4194240) === 0 && (ta = 64), n)
  }
  function vc(n) {
    for (var o = [], i = 0; 31 > i; i++) o.push(n)
    return o
  }
  function Ts(n, o, i) {
    ;((n.pendingLanes |= o),
      o !== 536870912 && ((n.suspendedLanes = 0), (n.pingedLanes = 0)),
      (n = n.eventTimes),
      (o = 31 - sn(o)),
      (n[o] = i))
  }
  function q1(n, o) {
    var i = n.pendingLanes & ~o
    ;((n.pendingLanes = o),
      (n.suspendedLanes = 0),
      (n.pingedLanes = 0),
      (n.expiredLanes &= o),
      (n.mutableReadLanes &= o),
      (n.entangledLanes &= o),
      (o = n.entanglements))
    var c = n.eventTimes
    for (n = n.expirationTimes; 0 < i; ) {
      var m = 31 - sn(i),
        y = 1 << m
      ;((o[m] = 0), (c[m] = -1), (n[m] = -1), (i &= ~y))
    }
  }
  function yc(n, o) {
    var i = (n.entangledLanes |= o)
    for (n = n.entanglements; i; ) {
      var c = 31 - sn(i),
        m = 1 << c
      ;((m & o) | (n[c] & o) && (n[c] |= o), (i &= ~m))
    }
  }
  var De = 0
  function Fp(n) {
    return ((n &= -n), 1 < n ? (4 < n ? ((n & 268435455) !== 0 ? 16 : 536870912) : 4) : 1)
  }
  var Vp,
    xc,
    Bp,
    zp,
    $p,
    wc = !1,
    oa = [],
    lr = null,
    cr = null,
    ur = null,
    js = new Map(),
    ks = new Map(),
    dr = [],
    Q1 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' '
      )
  function Wp(n, o) {
    switch (n) {
      case 'focusin':
      case 'focusout':
        lr = null
        break
      case 'dragenter':
      case 'dragleave':
        cr = null
        break
      case 'mouseover':
      case 'mouseout':
        ur = null
        break
      case 'pointerover':
      case 'pointerout':
        js.delete(o.pointerId)
        break
      case 'gotpointercapture':
      case 'lostpointercapture':
        ks.delete(o.pointerId)
    }
  }
  function Rs(n, o, i, c, m, y) {
    return n === null || n.nativeEvent !== y
      ? ((n = {
          blockedOn: o,
          domEventName: i,
          eventSystemFlags: c,
          nativeEvent: y,
          targetContainers: [m],
        }),
        o !== null && ((o = Us(o)), o !== null && xc(o)),
        n)
      : ((n.eventSystemFlags |= c),
        (o = n.targetContainers),
        m !== null && o.indexOf(m) === -1 && o.push(m),
        n)
  }
  function Z1(n, o, i, c, m) {
    switch (o) {
      case 'focusin':
        return ((lr = Rs(lr, n, o, i, c, m)), !0)
      case 'dragenter':
        return ((cr = Rs(cr, n, o, i, c, m)), !0)
      case 'mouseover':
        return ((ur = Rs(ur, n, o, i, c, m)), !0)
      case 'pointerover':
        var y = m.pointerId
        return (js.set(y, Rs(js.get(y) || null, n, o, i, c, m)), !0)
      case 'gotpointercapture':
        return ((y = m.pointerId), ks.set(y, Rs(ks.get(y) || null, n, o, i, c, m)), !0)
    }
    return !1
  }
  function Up(n) {
    var o = Yr(n.target)
    if (o !== null) {
      var i = Kr(o)
      if (i !== null) {
        if (((o = i.tag), o === 13)) {
          if (((o = kp(i)), o !== null)) {
            ;((n.blockedOn = o),
              $p(n.priority, function () {
                Bp(i)
              }))
            return
          }
        } else if (o === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null
          return
        }
      }
    }
    n.blockedOn = null
  }
  function sa(n) {
    if (n.blockedOn !== null) return !1
    for (var o = n.targetContainers; 0 < o.length; ) {
      var i = Sc(n.domEventName, n.eventSystemFlags, o[0], n.nativeEvent)
      if (i === null) {
        i = n.nativeEvent
        var c = new i.constructor(i.type, i)
        ;((Gr = c), i.target.dispatchEvent(c), (Gr = null))
      } else return ((o = Us(i)), o !== null && xc(o), (n.blockedOn = i), !1)
      o.shift()
    }
    return !0
  }
  function Hp(n, o, i) {
    sa(n) && i.delete(o)
  }
  function J1() {
    ;((wc = !1),
      lr !== null && sa(lr) && (lr = null),
      cr !== null && sa(cr) && (cr = null),
      ur !== null && sa(ur) && (ur = null),
      js.forEach(Hp),
      ks.forEach(Hp))
  }
  function As(n, o) {
    n.blockedOn === o &&
      ((n.blockedOn = null),
      wc || ((wc = !0), t.unstable_scheduleCallback(t.unstable_NormalPriority, J1)))
  }
  function Ms(n) {
    function o(m) {
      return As(m, n)
    }
    if (0 < oa.length) {
      As(oa[0], n)
      for (var i = 1; i < oa.length; i++) {
        var c = oa[i]
        c.blockedOn === n && (c.blockedOn = null)
      }
    }
    for (
      lr !== null && As(lr, n),
        cr !== null && As(cr, n),
        ur !== null && As(ur, n),
        js.forEach(o),
        ks.forEach(o),
        i = 0;
      i < dr.length;
      i++
    )
      ((c = dr[i]), c.blockedOn === n && (c.blockedOn = null))
    for (; 0 < dr.length && ((i = dr[0]), i.blockedOn === null); )
      (Up(i), i.blockedOn === null && dr.shift())
  }
  var No = _.ReactCurrentBatchConfig,
    ia = !0
  function eS(n, o, i, c) {
    var m = De,
      y = No.transition
    No.transition = null
    try {
      ;((De = 1), bc(n, o, i, c))
    } finally {
      ;((De = m), (No.transition = y))
    }
  }
  function tS(n, o, i, c) {
    var m = De,
      y = No.transition
    No.transition = null
    try {
      ;((De = 4), bc(n, o, i, c))
    } finally {
      ;((De = m), (No.transition = y))
    }
  }
  function bc(n, o, i, c) {
    if (ia) {
      var m = Sc(n, o, i, c)
      if (m === null) (Vc(n, o, c, aa, i), Wp(n, c))
      else if (Z1(m, n, o, i, c)) c.stopPropagation()
      else if ((Wp(n, c), o & 4 && -1 < Q1.indexOf(n))) {
        for (; m !== null; ) {
          var y = Us(m)
          if (
            (y !== null && Vp(y), (y = Sc(n, o, i, c)), y === null && Vc(n, o, c, aa, i), y === m)
          )
            break
          m = y
        }
        m !== null && c.stopPropagation()
      } else Vc(n, o, c, null, i)
    }
  }
  var aa = null
  function Sc(n, o, i, c) {
    if (((aa = null), (n = Kt(c)), (n = Yr(n)), n !== null))
      if (((o = Kr(n)), o === null)) n = null
      else if (((i = o.tag), i === 13)) {
        if (((n = kp(o)), n !== null)) return n
        n = null
      } else if (i === 3) {
        if (o.stateNode.current.memoizedState.isDehydrated)
          return o.tag === 3 ? o.stateNode.containerInfo : null
        n = null
      } else o !== n && (n = null)
    return ((aa = n), null)
  }
  function Gp(n) {
    switch (n) {
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
        switch ($1()) {
          case hc:
            return 1
          case Ip:
            return 4
          case Ji:
          case W1:
            return 16
          case Op:
            return 536870912
          default:
            return 16
        }
      default:
        return 16
    }
  }
  var fr = null,
    Cc = null,
    la = null
  function Kp() {
    if (la) return la
    var n,
      o = Cc,
      i = o.length,
      c,
      m = 'value' in fr ? fr.value : fr.textContent,
      y = m.length
    for (n = 0; n < i && o[n] === m[n]; n++);
    var b = i - n
    for (c = 1; c <= b && o[i - c] === m[y - c]; c++);
    return (la = m.slice(n, 1 < c ? 1 - c : void 0))
  }
  function ca(n) {
    var o = n.keyCode
    return (
      'charCode' in n ? ((n = n.charCode), n === 0 && o === 13 && (n = 13)) : (n = o),
      n === 10 && (n = 13),
      32 <= n || n === 13 ? n : 0
    )
  }
  function ua() {
    return !0
  }
  function Yp() {
    return !1
  }
  function Lt(n) {
    function o(i, c, m, y, b) {
      ;((this._reactName = i),
        (this._targetInst = m),
        (this.type = c),
        (this.nativeEvent = y),
        (this.target = b),
        (this.currentTarget = null))
      for (var T in n) n.hasOwnProperty(T) && ((i = n[T]), (this[T] = i ? i(y) : y[T]))
      return (
        (this.isDefaultPrevented = (
          y.defaultPrevented != null ? y.defaultPrevented : y.returnValue === !1
        )
          ? ua
          : Yp),
        (this.isPropagationStopped = Yp),
        this
      )
    }
    return (
      U(o.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0
          var i = this.nativeEvent
          i &&
            (i.preventDefault
              ? i.preventDefault()
              : typeof i.returnValue != 'unknown' && (i.returnValue = !1),
            (this.isDefaultPrevented = ua))
        },
        stopPropagation: function () {
          var i = this.nativeEvent
          i &&
            (i.stopPropagation
              ? i.stopPropagation()
              : typeof i.cancelBubble != 'unknown' && (i.cancelBubble = !0),
            (this.isPropagationStopped = ua))
        },
        persist: function () {},
        isPersistent: ua,
      }),
      o
    )
  }
  var Po = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (n) {
        return n.timeStamp || Date.now()
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ec = Lt(Po),
    _s = U({}, Po, { view: 0, detail: 0 }),
    nS = Lt(_s),
    Nc,
    Pc,
    Ds,
    da = U({}, _s, {
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
      getModifierState: jc,
      button: 0,
      buttons: 0,
      relatedTarget: function (n) {
        return n.relatedTarget === void 0
          ? n.fromElement === n.srcElement
            ? n.toElement
            : n.fromElement
          : n.relatedTarget
      },
      movementX: function (n) {
        return 'movementX' in n
          ? n.movementX
          : (n !== Ds &&
              (Ds && n.type === 'mousemove'
                ? ((Nc = n.screenX - Ds.screenX), (Pc = n.screenY - Ds.screenY))
                : (Pc = Nc = 0),
              (Ds = n)),
            Nc)
      },
      movementY: function (n) {
        return 'movementY' in n ? n.movementY : Pc
      },
    }),
    Xp = Lt(da),
    rS = U({}, da, { dataTransfer: 0 }),
    oS = Lt(rS),
    sS = U({}, _s, { relatedTarget: 0 }),
    Tc = Lt(sS),
    iS = U({}, Po, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    aS = Lt(iS),
    lS = U({}, Po, {
      clipboardData: function (n) {
        return 'clipboardData' in n ? n.clipboardData : window.clipboardData
      },
    }),
    cS = Lt(lS),
    uS = U({}, Po, { data: 0 }),
    qp = Lt(uS),
    dS = {
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
    fS = {
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
    pS = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' }
  function mS(n) {
    var o = this.nativeEvent
    return o.getModifierState ? o.getModifierState(n) : (n = pS[n]) ? !!o[n] : !1
  }
  function jc() {
    return mS
  }
  var hS = U({}, _s, {
      key: function (n) {
        if (n.key) {
          var o = dS[n.key] || n.key
          if (o !== 'Unidentified') return o
        }
        return n.type === 'keypress'
          ? ((n = ca(n)), n === 13 ? 'Enter' : String.fromCharCode(n))
          : n.type === 'keydown' || n.type === 'keyup'
            ? fS[n.keyCode] || 'Unidentified'
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
      getModifierState: jc,
      charCode: function (n) {
        return n.type === 'keypress' ? ca(n) : 0
      },
      keyCode: function (n) {
        return n.type === 'keydown' || n.type === 'keyup' ? n.keyCode : 0
      },
      which: function (n) {
        return n.type === 'keypress'
          ? ca(n)
          : n.type === 'keydown' || n.type === 'keyup'
            ? n.keyCode
            : 0
      },
    }),
    gS = Lt(hS),
    vS = U({}, da, {
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
    Qp = Lt(vS),
    yS = U({}, _s, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: jc,
    }),
    xS = Lt(yS),
    wS = U({}, Po, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    bS = Lt(wS),
    SS = U({}, da, {
      deltaX: function (n) {
        return 'deltaX' in n ? n.deltaX : 'wheelDeltaX' in n ? -n.wheelDeltaX : 0
      },
      deltaY: function (n) {
        return 'deltaY' in n
          ? n.deltaY
          : 'wheelDeltaY' in n
            ? -n.wheelDeltaY
            : 'wheelDelta' in n
              ? -n.wheelDelta
              : 0
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    CS = Lt(SS),
    ES = [9, 13, 27, 32],
    kc = f && 'CompositionEvent' in window,
    Is = null
  f && 'documentMode' in document && (Is = document.documentMode)
  var NS = f && 'TextEvent' in window && !Is,
    Zp = f && (!kc || (Is && 8 < Is && 11 >= Is)),
    Jp = ' ',
    em = !1
  function tm(n, o) {
    switch (n) {
      case 'keyup':
        return ES.indexOf(o.keyCode) !== -1
      case 'keydown':
        return o.keyCode !== 229
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0
      default:
        return !1
    }
  }
  function nm(n) {
    return ((n = n.detail), typeof n == 'object' && 'data' in n ? n.data : null)
  }
  var To = !1
  function PS(n, o) {
    switch (n) {
      case 'compositionend':
        return nm(o)
      case 'keypress':
        return o.which !== 32 ? null : ((em = !0), Jp)
      case 'textInput':
        return ((n = o.data), n === Jp && em ? null : n)
      default:
        return null
    }
  }
  function TS(n, o) {
    if (To)
      return n === 'compositionend' || (!kc && tm(n, o))
        ? ((n = Kp()), (la = Cc = fr = null), (To = !1), n)
        : null
    switch (n) {
      case 'paste':
        return null
      case 'keypress':
        if (!(o.ctrlKey || o.altKey || o.metaKey) || (o.ctrlKey && o.altKey)) {
          if (o.char && 1 < o.char.length) return o.char
          if (o.which) return String.fromCharCode(o.which)
        }
        return null
      case 'compositionend':
        return Zp && o.locale !== 'ko' ? null : o.data
      default:
        return null
    }
  }
  var jS = {
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
  function rm(n) {
    var o = n && n.nodeName && n.nodeName.toLowerCase()
    return o === 'input' ? !!jS[n.type] : o === 'textarea'
  }
  function om(n, o, i, c) {
    ;(Ce(c),
      (o = ga(o, 'onChange')),
      0 < o.length &&
        ((i = new Ec('onChange', 'change', null, i, c)), n.push({ event: i, listeners: o })))
  }
  var Os = null,
    Ls = null
  function kS(n) {
    Sm(n, 0)
  }
  function fa(n) {
    var o = Mo(n)
    if (Me(o)) return n
  }
  function RS(n, o) {
    if (n === 'change') return o
  }
  var sm = !1
  if (f) {
    var Rc
    if (f) {
      var Ac = 'oninput' in document
      if (!Ac) {
        var im = document.createElement('div')
        ;(im.setAttribute('oninput', 'return;'), (Ac = typeof im.oninput == 'function'))
      }
      Rc = Ac
    } else Rc = !1
    sm = Rc && (!document.documentMode || 9 < document.documentMode)
  }
  function am() {
    Os && (Os.detachEvent('onpropertychange', lm), (Ls = Os = null))
  }
  function lm(n) {
    if (n.propertyName === 'value' && fa(Ls)) {
      var o = []
      ;(om(o, Ls, n, Kt(n)), Qe(kS, o))
    }
  }
  function AS(n, o, i) {
    n === 'focusin'
      ? (am(), (Os = o), (Ls = i), Os.attachEvent('onpropertychange', lm))
      : n === 'focusout' && am()
  }
  function MS(n) {
    if (n === 'selectionchange' || n === 'keyup' || n === 'keydown') return fa(Ls)
  }
  function _S(n, o) {
    if (n === 'click') return fa(o)
  }
  function DS(n, o) {
    if (n === 'input' || n === 'change') return fa(o)
  }
  function IS(n, o) {
    return (n === o && (n !== 0 || 1 / n === 1 / o)) || (n !== n && o !== o)
  }
  var an = typeof Object.is == 'function' ? Object.is : IS
  function Fs(n, o) {
    if (an(n, o)) return !0
    if (typeof n != 'object' || n === null || typeof o != 'object' || o === null) return !1
    var i = Object.keys(n),
      c = Object.keys(o)
    if (i.length !== c.length) return !1
    for (c = 0; c < i.length; c++) {
      var m = i[c]
      if (!p.call(o, m) || !an(n[m], o[m])) return !1
    }
    return !0
  }
  function cm(n) {
    for (; n && n.firstChild; ) n = n.firstChild
    return n
  }
  function um(n, o) {
    var i = cm(n)
    n = 0
    for (var c; i; ) {
      if (i.nodeType === 3) {
        if (((c = n + i.textContent.length), n <= o && c >= o)) return { node: i, offset: o - n }
        n = c
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
      i = cm(i)
    }
  }
  function dm(n, o) {
    return n && o
      ? n === o
        ? !0
        : n && n.nodeType === 3
          ? !1
          : o && o.nodeType === 3
            ? dm(n, o.parentNode)
            : 'contains' in n
              ? n.contains(o)
              : n.compareDocumentPosition
                ? !!(n.compareDocumentPosition(o) & 16)
                : !1
      : !1
  }
  function fm() {
    for (var n = window, o = Je(); o instanceof n.HTMLIFrameElement; ) {
      try {
        var i = typeof o.contentWindow.location.href == 'string'
      } catch {
        i = !1
      }
      if (i) n = o.contentWindow
      else break
      o = Je(n.document)
    }
    return o
  }
  function Mc(n) {
    var o = n && n.nodeName && n.nodeName.toLowerCase()
    return (
      o &&
      ((o === 'input' &&
        (n.type === 'text' ||
          n.type === 'search' ||
          n.type === 'tel' ||
          n.type === 'url' ||
          n.type === 'password')) ||
        o === 'textarea' ||
        n.contentEditable === 'true')
    )
  }
  function OS(n) {
    var o = fm(),
      i = n.focusedElem,
      c = n.selectionRange
    if (o !== i && i && i.ownerDocument && dm(i.ownerDocument.documentElement, i)) {
      if (c !== null && Mc(i)) {
        if (((o = c.start), (n = c.end), n === void 0 && (n = o), 'selectionStart' in i))
          ((i.selectionStart = o), (i.selectionEnd = Math.min(n, i.value.length)))
        else if (
          ((n = ((o = i.ownerDocument || document) && o.defaultView) || window), n.getSelection)
        ) {
          n = n.getSelection()
          var m = i.textContent.length,
            y = Math.min(c.start, m)
          ;((c = c.end === void 0 ? y : Math.min(c.end, m)),
            !n.extend && y > c && ((m = c), (c = y), (y = m)),
            (m = um(i, y)))
          var b = um(i, c)
          m &&
            b &&
            (n.rangeCount !== 1 ||
              n.anchorNode !== m.node ||
              n.anchorOffset !== m.offset ||
              n.focusNode !== b.node ||
              n.focusOffset !== b.offset) &&
            ((o = o.createRange()),
            o.setStart(m.node, m.offset),
            n.removeAllRanges(),
            y > c
              ? (n.addRange(o), n.extend(b.node, b.offset))
              : (o.setEnd(b.node, b.offset), n.addRange(o)))
        }
      }
      for (o = [], n = i; (n = n.parentNode); )
        n.nodeType === 1 && o.push({ element: n, left: n.scrollLeft, top: n.scrollTop })
      for (typeof i.focus == 'function' && i.focus(), i = 0; i < o.length; i++)
        ((n = o[i]), (n.element.scrollLeft = n.left), (n.element.scrollTop = n.top))
    }
  }
  var LS = f && 'documentMode' in document && 11 >= document.documentMode,
    jo = null,
    _c = null,
    Vs = null,
    Dc = !1
  function pm(n, o, i) {
    var c = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument
    Dc ||
      jo == null ||
      jo !== Je(c) ||
      ((c = jo),
      'selectionStart' in c && Mc(c)
        ? (c = { start: c.selectionStart, end: c.selectionEnd })
        : ((c = ((c.ownerDocument && c.ownerDocument.defaultView) || window).getSelection()),
          (c = {
            anchorNode: c.anchorNode,
            anchorOffset: c.anchorOffset,
            focusNode: c.focusNode,
            focusOffset: c.focusOffset,
          })),
      (Vs && Fs(Vs, c)) ||
        ((Vs = c),
        (c = ga(_c, 'onSelect')),
        0 < c.length &&
          ((o = new Ec('onSelect', 'select', null, o, i)),
          n.push({ event: o, listeners: c }),
          (o.target = jo))))
  }
  function pa(n, o) {
    var i = {}
    return (
      (i[n.toLowerCase()] = o.toLowerCase()),
      (i['Webkit' + n] = 'webkit' + o),
      (i['Moz' + n] = 'moz' + o),
      i
    )
  }
  var ko = {
      animationend: pa('Animation', 'AnimationEnd'),
      animationiteration: pa('Animation', 'AnimationIteration'),
      animationstart: pa('Animation', 'AnimationStart'),
      transitionend: pa('Transition', 'TransitionEnd'),
    },
    Ic = {},
    mm = {}
  f &&
    ((mm = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete ko.animationend.animation,
      delete ko.animationiteration.animation,
      delete ko.animationstart.animation),
    'TransitionEvent' in window || delete ko.transitionend.transition)
  function ma(n) {
    if (Ic[n]) return Ic[n]
    if (!ko[n]) return n
    var o = ko[n],
      i
    for (i in o) if (o.hasOwnProperty(i) && i in mm) return (Ic[n] = o[i])
    return n
  }
  var hm = ma('animationend'),
    gm = ma('animationiteration'),
    vm = ma('animationstart'),
    ym = ma('transitionend'),
    xm = new Map(),
    wm =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      )
  function pr(n, o) {
    ;(xm.set(n, o), l(o, [n]))
  }
  for (var Oc = 0; Oc < wm.length; Oc++) {
    var Lc = wm[Oc],
      FS = Lc.toLowerCase(),
      VS = Lc[0].toUpperCase() + Lc.slice(1)
    pr(FS, 'on' + VS)
  }
  ;(pr(hm, 'onAnimationEnd'),
    pr(gm, 'onAnimationIteration'),
    pr(vm, 'onAnimationStart'),
    pr('dblclick', 'onDoubleClick'),
    pr('focusin', 'onFocus'),
    pr('focusout', 'onBlur'),
    pr(ym, 'onTransitionEnd'),
    u('onMouseEnter', ['mouseout', 'mouseover']),
    u('onMouseLeave', ['mouseout', 'mouseover']),
    u('onPointerEnter', ['pointerout', 'pointerover']),
    u('onPointerLeave', ['pointerout', 'pointerover']),
    l('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    l(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    l('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    l('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    l(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    l(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ))
  var Bs =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    BS = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Bs))
  function bm(n, o, i) {
    var c = n.type || 'unknown-event'
    ;((n.currentTarget = i), F1(c, o, void 0, n), (n.currentTarget = null))
  }
  function Sm(n, o) {
    o = (o & 4) !== 0
    for (var i = 0; i < n.length; i++) {
      var c = n[i],
        m = c.event
      c = c.listeners
      e: {
        var y = void 0
        if (o)
          for (var b = c.length - 1; 0 <= b; b--) {
            var T = c[b],
              R = T.instance,
              F = T.currentTarget
            if (((T = T.listener), R !== y && m.isPropagationStopped())) break e
            ;(bm(m, T, F), (y = R))
          }
        else
          for (b = 0; b < c.length; b++) {
            if (
              ((T = c[b]),
              (R = T.instance),
              (F = T.currentTarget),
              (T = T.listener),
              R !== y && m.isPropagationStopped())
            )
              break e
            ;(bm(m, T, F), (y = R))
          }
      }
    }
    if (Ns) throw ((n = mc), (Ns = !1), (mc = null), n)
  }
  function Le(n, o) {
    var i = o[Hc]
    i === void 0 && (i = o[Hc] = new Set())
    var c = n + '__bubble'
    i.has(c) || (Cm(o, n, 2, !1), i.add(c))
  }
  function Fc(n, o, i) {
    var c = 0
    ;(o && (c |= 4), Cm(i, n, c, o))
  }
  var ha = '_reactListening' + Math.random().toString(36).slice(2)
  function zs(n) {
    if (!n[ha]) {
      ;((n[ha] = !0),
        s.forEach(function (i) {
          i !== 'selectionchange' && (BS.has(i) || Fc(i, !1, n), Fc(i, !0, n))
        }))
      var o = n.nodeType === 9 ? n : n.ownerDocument
      o === null || o[ha] || ((o[ha] = !0), Fc('selectionchange', !1, o))
    }
  }
  function Cm(n, o, i, c) {
    switch (Gp(o)) {
      case 1:
        var m = eS
        break
      case 4:
        m = tS
        break
      default:
        m = bc
    }
    ;((i = m.bind(null, o, i, n)),
      (m = void 0),
      !ir || (o !== 'touchstart' && o !== 'touchmove' && o !== 'wheel') || (m = !0),
      c
        ? m !== void 0
          ? n.addEventListener(o, i, { capture: !0, passive: m })
          : n.addEventListener(o, i, !0)
        : m !== void 0
          ? n.addEventListener(o, i, { passive: m })
          : n.addEventListener(o, i, !1))
  }
  function Vc(n, o, i, c, m) {
    var y = c
    if ((o & 1) === 0 && (o & 2) === 0 && c !== null)
      e: for (;;) {
        if (c === null) return
        var b = c.tag
        if (b === 3 || b === 4) {
          var T = c.stateNode.containerInfo
          if (T === m || (T.nodeType === 8 && T.parentNode === m)) break
          if (b === 4)
            for (b = c.return; b !== null; ) {
              var R = b.tag
              if (
                (R === 3 || R === 4) &&
                ((R = b.stateNode.containerInfo),
                R === m || (R.nodeType === 8 && R.parentNode === m))
              )
                return
              b = b.return
            }
          for (; T !== null; ) {
            if (((b = Yr(T)), b === null)) return
            if (((R = b.tag), R === 5 || R === 6)) {
              c = y = b
              continue e
            }
            T = T.parentNode
          }
        }
        c = c.return
      }
    Qe(function () {
      var F = y,
        G = Kt(i),
        K = []
      e: {
        var H = xm.get(n)
        if (H !== void 0) {
          var se = Ec,
            ce = n
          switch (n) {
            case 'keypress':
              if (ca(i) === 0) break e
            case 'keydown':
            case 'keyup':
              se = gS
              break
            case 'focusin':
              ;((ce = 'focus'), (se = Tc))
              break
            case 'focusout':
              ;((ce = 'blur'), (se = Tc))
              break
            case 'beforeblur':
            case 'afterblur':
              se = Tc
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
              se = Xp
              break
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              se = oS
              break
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              se = xS
              break
            case hm:
            case gm:
            case vm:
              se = aS
              break
            case ym:
              se = bS
              break
            case 'scroll':
              se = nS
              break
            case 'wheel':
              se = CS
              break
            case 'copy':
            case 'cut':
            case 'paste':
              se = cS
              break
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              se = Qp
          }
          var de = (o & 4) !== 0,
            Ye = !de && n === 'scroll',
            D = de ? (H !== null ? H + 'Capture' : null) : H
          de = []
          for (var M = F, O; M !== null; ) {
            O = M
            var Q = O.stateNode
            if (
              (O.tag === 5 &&
                Q !== null &&
                ((O = Q), D !== null && ((Q = rt(M, D)), Q != null && de.push($s(M, Q, O)))),
              Ye)
            )
              break
            M = M.return
          }
          0 < de.length && ((H = new se(H, ce, null, i, G)), K.push({ event: H, listeners: de }))
        }
      }
      if ((o & 7) === 0) {
        e: {
          if (
            ((H = n === 'mouseover' || n === 'pointerover'),
            (se = n === 'mouseout' || n === 'pointerout'),
            H && i !== Gr && (ce = i.relatedTarget || i.fromElement) && (Yr(ce) || ce[Ln]))
          )
            break e
          if (
            (se || H) &&
            ((H =
              G.window === G
                ? G
                : (H = G.ownerDocument)
                  ? H.defaultView || H.parentWindow
                  : window),
            se
              ? ((ce = i.relatedTarget || i.toElement),
                (se = F),
                (ce = ce ? Yr(ce) : null),
                ce !== null &&
                  ((Ye = Kr(ce)), ce !== Ye || (ce.tag !== 5 && ce.tag !== 6)) &&
                  (ce = null))
              : ((se = null), (ce = F)),
            se !== ce)
          ) {
            if (
              ((de = Xp),
              (Q = 'onMouseLeave'),
              (D = 'onMouseEnter'),
              (M = 'mouse'),
              (n === 'pointerout' || n === 'pointerover') &&
                ((de = Qp), (Q = 'onPointerLeave'), (D = 'onPointerEnter'), (M = 'pointer')),
              (Ye = se == null ? H : Mo(se)),
              (O = ce == null ? H : Mo(ce)),
              (H = new de(Q, M + 'leave', se, i, G)),
              (H.target = Ye),
              (H.relatedTarget = O),
              (Q = null),
              Yr(G) === F &&
                ((de = new de(D, M + 'enter', ce, i, G)),
                (de.target = O),
                (de.relatedTarget = Ye),
                (Q = de)),
              (Ye = Q),
              se && ce)
            )
              t: {
                for (de = se, D = ce, M = 0, O = de; O; O = Ro(O)) M++
                for (O = 0, Q = D; Q; Q = Ro(Q)) O++
                for (; 0 < M - O; ) ((de = Ro(de)), M--)
                for (; 0 < O - M; ) ((D = Ro(D)), O--)
                for (; M--; ) {
                  if (de === D || (D !== null && de === D.alternate)) break t
                  ;((de = Ro(de)), (D = Ro(D)))
                }
                de = null
              }
            else de = null
            ;(se !== null && Em(K, H, se, de, !1),
              ce !== null && Ye !== null && Em(K, Ye, ce, de, !0))
          }
        }
        e: {
          if (
            ((H = F ? Mo(F) : window),
            (se = H.nodeName && H.nodeName.toLowerCase()),
            se === 'select' || (se === 'input' && H.type === 'file'))
          )
            var pe = RS
          else if (rm(H))
            if (sm) pe = DS
            else {
              pe = MS
              var ge = AS
            }
          else
            (se = H.nodeName) &&
              se.toLowerCase() === 'input' &&
              (H.type === 'checkbox' || H.type === 'radio') &&
              (pe = _S)
          if (pe && (pe = pe(n, F))) {
            om(K, pe, i, G)
            break e
          }
          ;(ge && ge(n, H, F),
            n === 'focusout' &&
              (ge = H._wrapperState) &&
              ge.controlled &&
              H.type === 'number' &&
              It(H, 'number', H.value))
        }
        switch (((ge = F ? Mo(F) : window), n)) {
          case 'focusin':
            ;(rm(ge) || ge.contentEditable === 'true') && ((jo = ge), (_c = F), (Vs = null))
            break
          case 'focusout':
            Vs = _c = jo = null
            break
          case 'mousedown':
            Dc = !0
            break
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ;((Dc = !1), pm(K, i, G))
            break
          case 'selectionchange':
            if (LS) break
          case 'keydown':
          case 'keyup':
            pm(K, i, G)
        }
        var ve
        if (kc)
          e: {
            switch (n) {
              case 'compositionstart':
                var be = 'onCompositionStart'
                break e
              case 'compositionend':
                be = 'onCompositionEnd'
                break e
              case 'compositionupdate':
                be = 'onCompositionUpdate'
                break e
            }
            be = void 0
          }
        else
          To
            ? tm(n, i) && (be = 'onCompositionEnd')
            : n === 'keydown' && i.keyCode === 229 && (be = 'onCompositionStart')
        ;(be &&
          (Zp &&
            i.locale !== 'ko' &&
            (To || be !== 'onCompositionStart'
              ? be === 'onCompositionEnd' && To && (ve = Kp())
              : ((fr = G), (Cc = 'value' in fr ? fr.value : fr.textContent), (To = !0))),
          (ge = ga(F, be)),
          0 < ge.length &&
            ((be = new qp(be, n, null, i, G)),
            K.push({ event: be, listeners: ge }),
            ve ? (be.data = ve) : ((ve = nm(i)), ve !== null && (be.data = ve)))),
          (ve = NS ? PS(n, i) : TS(n, i)) &&
            ((F = ga(F, 'onBeforeInput')),
            0 < F.length &&
              ((G = new qp('onBeforeInput', 'beforeinput', null, i, G)),
              K.push({ event: G, listeners: F }),
              (G.data = ve))))
      }
      Sm(K, o)
    })
  }
  function $s(n, o, i) {
    return { instance: n, listener: o, currentTarget: i }
  }
  function ga(n, o) {
    for (var i = o + 'Capture', c = []; n !== null; ) {
      var m = n,
        y = m.stateNode
      ;(m.tag === 5 &&
        y !== null &&
        ((m = y),
        (y = rt(n, i)),
        y != null && c.unshift($s(n, y, m)),
        (y = rt(n, o)),
        y != null && c.push($s(n, y, m))),
        (n = n.return))
    }
    return c
  }
  function Ro(n) {
    if (n === null) return null
    do n = n.return
    while (n && n.tag !== 5)
    return n || null
  }
  function Em(n, o, i, c, m) {
    for (var y = o._reactName, b = []; i !== null && i !== c; ) {
      var T = i,
        R = T.alternate,
        F = T.stateNode
      if (R !== null && R === c) break
      ;(T.tag === 5 &&
        F !== null &&
        ((T = F),
        m
          ? ((R = rt(i, y)), R != null && b.unshift($s(i, R, T)))
          : m || ((R = rt(i, y)), R != null && b.push($s(i, R, T)))),
        (i = i.return))
    }
    b.length !== 0 && n.push({ event: o, listeners: b })
  }
  var zS = /\r\n?/g,
    $S = /\u0000|\uFFFD/g
  function Nm(n) {
    return (typeof n == 'string' ? n : '' + n)
      .replace(
        zS,
        `
`
      )
      .replace($S, '')
  }
  function va(n, o, i) {
    if (((o = Nm(o)), Nm(n) !== o && i)) throw Error(r(425))
  }
  function ya() {}
  var Bc = null,
    zc = null
  function $c(n, o) {
    return (
      n === 'textarea' ||
      n === 'noscript' ||
      typeof o.children == 'string' ||
      typeof o.children == 'number' ||
      (typeof o.dangerouslySetInnerHTML == 'object' &&
        o.dangerouslySetInnerHTML !== null &&
        o.dangerouslySetInnerHTML.__html != null)
    )
  }
  var Wc = typeof setTimeout == 'function' ? setTimeout : void 0,
    WS = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Pm = typeof Promise == 'function' ? Promise : void 0,
    US =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Pm < 'u'
          ? function (n) {
              return Pm.resolve(null).then(n).catch(HS)
            }
          : Wc
  function HS(n) {
    setTimeout(function () {
      throw n
    })
  }
  function Uc(n, o) {
    var i = o,
      c = 0
    do {
      var m = i.nextSibling
      if ((n.removeChild(i), m && m.nodeType === 8))
        if (((i = m.data), i === '/$')) {
          if (c === 0) {
            ;(n.removeChild(m), Ms(o))
            return
          }
          c--
        } else (i !== '$' && i !== '$?' && i !== '$!') || c++
      i = m
    } while (i)
    Ms(o)
  }
  function mr(n) {
    for (; n != null; n = n.nextSibling) {
      var o = n.nodeType
      if (o === 1 || o === 3) break
      if (o === 8) {
        if (((o = n.data), o === '$' || o === '$!' || o === '$?')) break
        if (o === '/$') return null
      }
    }
    return n
  }
  function Tm(n) {
    n = n.previousSibling
    for (var o = 0; n; ) {
      if (n.nodeType === 8) {
        var i = n.data
        if (i === '$' || i === '$!' || i === '$?') {
          if (o === 0) return n
          o--
        } else i === '/$' && o++
      }
      n = n.previousSibling
    }
    return null
  }
  var Ao = Math.random().toString(36).slice(2),
    xn = '__reactFiber$' + Ao,
    Ws = '__reactProps$' + Ao,
    Ln = '__reactContainer$' + Ao,
    Hc = '__reactEvents$' + Ao,
    GS = '__reactListeners$' + Ao,
    KS = '__reactHandles$' + Ao
  function Yr(n) {
    var o = n[xn]
    if (o) return o
    for (var i = n.parentNode; i; ) {
      if ((o = i[Ln] || i[xn])) {
        if (((i = o.alternate), o.child !== null || (i !== null && i.child !== null)))
          for (n = Tm(n); n !== null; ) {
            if ((i = n[xn])) return i
            n = Tm(n)
          }
        return o
      }
      ;((n = i), (i = n.parentNode))
    }
    return null
  }
  function Us(n) {
    return (
      (n = n[xn] || n[Ln]),
      !n || (n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3) ? null : n
    )
  }
  function Mo(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode
    throw Error(r(33))
  }
  function xa(n) {
    return n[Ws] || null
  }
  var Gc = [],
    _o = -1
  function hr(n) {
    return { current: n }
  }
  function Fe(n) {
    0 > _o || ((n.current = Gc[_o]), (Gc[_o] = null), _o--)
  }
  function Oe(n, o) {
    ;(_o++, (Gc[_o] = n.current), (n.current = o))
  }
  var gr = {},
    mt = hr(gr),
    Pt = hr(!1),
    Xr = gr
  function Do(n, o) {
    var i = n.type.contextTypes
    if (!i) return gr
    var c = n.stateNode
    if (c && c.__reactInternalMemoizedUnmaskedChildContext === o)
      return c.__reactInternalMemoizedMaskedChildContext
    var m = {},
      y
    for (y in i) m[y] = o[y]
    return (
      c &&
        ((n = n.stateNode),
        (n.__reactInternalMemoizedUnmaskedChildContext = o),
        (n.__reactInternalMemoizedMaskedChildContext = m)),
      m
    )
  }
  function Tt(n) {
    return ((n = n.childContextTypes), n != null)
  }
  function wa() {
    ;(Fe(Pt), Fe(mt))
  }
  function jm(n, o, i) {
    if (mt.current !== gr) throw Error(r(168))
    ;(Oe(mt, o), Oe(Pt, i))
  }
  function km(n, o, i) {
    var c = n.stateNode
    if (((o = o.childContextTypes), typeof c.getChildContext != 'function')) return i
    c = c.getChildContext()
    for (var m in c) if (!(m in o)) throw Error(r(108, Y(n) || 'Unknown', m))
    return U({}, i, c)
  }
  function ba(n) {
    return (
      (n = ((n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext) || gr),
      (Xr = mt.current),
      Oe(mt, n),
      Oe(Pt, Pt.current),
      !0
    )
  }
  function Rm(n, o, i) {
    var c = n.stateNode
    if (!c) throw Error(r(169))
    ;(i
      ? ((n = km(n, o, Xr)),
        (c.__reactInternalMemoizedMergedChildContext = n),
        Fe(Pt),
        Fe(mt),
        Oe(mt, n))
      : Fe(Pt),
      Oe(Pt, i))
  }
  var Fn = null,
    Sa = !1,
    Kc = !1
  function Am(n) {
    Fn === null ? (Fn = [n]) : Fn.push(n)
  }
  function YS(n) {
    ;((Sa = !0), Am(n))
  }
  function vr() {
    if (!Kc && Fn !== null) {
      Kc = !0
      var n = 0,
        o = De
      try {
        var i = Fn
        for (De = 1; n < i.length; n++) {
          var c = i[n]
          do c = c(!0)
          while (c !== null)
        }
        ;((Fn = null), (Sa = !1))
      } catch (m) {
        throw (Fn !== null && (Fn = Fn.slice(n + 1)), _p(hc, vr), m)
      } finally {
        ;((De = o), (Kc = !1))
      }
    }
    return null
  }
  var Io = [],
    Oo = 0,
    Ca = null,
    Ea = 0,
    Xt = [],
    qt = 0,
    qr = null,
    Vn = 1,
    Bn = ''
  function Qr(n, o) {
    ;((Io[Oo++] = Ea), (Io[Oo++] = Ca), (Ca = n), (Ea = o))
  }
  function Mm(n, o, i) {
    ;((Xt[qt++] = Vn), (Xt[qt++] = Bn), (Xt[qt++] = qr), (qr = n))
    var c = Vn
    n = Bn
    var m = 32 - sn(c) - 1
    ;((c &= ~(1 << m)), (i += 1))
    var y = 32 - sn(o) + m
    if (30 < y) {
      var b = m - (m % 5)
      ;((y = (c & ((1 << b) - 1)).toString(32)),
        (c >>= b),
        (m -= b),
        (Vn = (1 << (32 - sn(o) + m)) | (i << m) | c),
        (Bn = y + n))
    } else ((Vn = (1 << y) | (i << m) | c), (Bn = n))
  }
  function Yc(n) {
    n.return !== null && (Qr(n, 1), Mm(n, 1, 0))
  }
  function Xc(n) {
    for (; n === Ca; ) ((Ca = Io[--Oo]), (Io[Oo] = null), (Ea = Io[--Oo]), (Io[Oo] = null))
    for (; n === qr; )
      ((qr = Xt[--qt]),
        (Xt[qt] = null),
        (Bn = Xt[--qt]),
        (Xt[qt] = null),
        (Vn = Xt[--qt]),
        (Xt[qt] = null))
  }
  var Ft = null,
    Vt = null,
    Be = !1,
    ln = null
  function _m(n, o) {
    var i = en(5, null, null, 0)
    ;((i.elementType = 'DELETED'),
      (i.stateNode = o),
      (i.return = n),
      (o = n.deletions),
      o === null ? ((n.deletions = [i]), (n.flags |= 16)) : o.push(i))
  }
  function Dm(n, o) {
    switch (n.tag) {
      case 5:
        var i = n.type
        return (
          (o = o.nodeType !== 1 || i.toLowerCase() !== o.nodeName.toLowerCase() ? null : o),
          o !== null ? ((n.stateNode = o), (Ft = n), (Vt = mr(o.firstChild)), !0) : !1
        )
      case 6:
        return (
          (o = n.pendingProps === '' || o.nodeType !== 3 ? null : o),
          o !== null ? ((n.stateNode = o), (Ft = n), (Vt = null), !0) : !1
        )
      case 13:
        return (
          (o = o.nodeType !== 8 ? null : o),
          o !== null
            ? ((i = qr !== null ? { id: Vn, overflow: Bn } : null),
              (n.memoizedState = { dehydrated: o, treeContext: i, retryLane: 1073741824 }),
              (i = en(18, null, null, 0)),
              (i.stateNode = o),
              (i.return = n),
              (n.child = i),
              (Ft = n),
              (Vt = null),
              !0)
            : !1
        )
      default:
        return !1
    }
  }
  function qc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0
  }
  function Qc(n) {
    if (Be) {
      var o = Vt
      if (o) {
        var i = o
        if (!Dm(n, o)) {
          if (qc(n)) throw Error(r(418))
          o = mr(i.nextSibling)
          var c = Ft
          o && Dm(n, o) ? _m(c, i) : ((n.flags = (n.flags & -4097) | 2), (Be = !1), (Ft = n))
        }
      } else {
        if (qc(n)) throw Error(r(418))
        ;((n.flags = (n.flags & -4097) | 2), (Be = !1), (Ft = n))
      }
    }
  }
  function Im(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return
    Ft = n
  }
  function Na(n) {
    if (n !== Ft) return !1
    if (!Be) return (Im(n), (Be = !0), !1)
    var o
    if (
      ((o = n.tag !== 3) &&
        !(o = n.tag !== 5) &&
        ((o = n.type), (o = o !== 'head' && o !== 'body' && !$c(n.type, n.memoizedProps))),
      o && (o = Vt))
    ) {
      if (qc(n)) throw (Om(), Error(r(418)))
      for (; o; ) (_m(n, o), (o = mr(o.nextSibling)))
    }
    if ((Im(n), n.tag === 13)) {
      if (((n = n.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(r(317))
      e: {
        for (n = n.nextSibling, o = 0; n; ) {
          if (n.nodeType === 8) {
            var i = n.data
            if (i === '/$') {
              if (o === 0) {
                Vt = mr(n.nextSibling)
                break e
              }
              o--
            } else (i !== '$' && i !== '$!' && i !== '$?') || o++
          }
          n = n.nextSibling
        }
        Vt = null
      }
    } else Vt = Ft ? mr(n.stateNode.nextSibling) : null
    return !0
  }
  function Om() {
    for (var n = Vt; n; ) n = mr(n.nextSibling)
  }
  function Lo() {
    ;((Vt = Ft = null), (Be = !1))
  }
  function Zc(n) {
    ln === null ? (ln = [n]) : ln.push(n)
  }
  var XS = _.ReactCurrentBatchConfig
  function Hs(n, o, i) {
    if (((n = i.ref), n !== null && typeof n != 'function' && typeof n != 'object')) {
      if (i._owner) {
        if (((i = i._owner), i)) {
          if (i.tag !== 1) throw Error(r(309))
          var c = i.stateNode
        }
        if (!c) throw Error(r(147, n))
        var m = c,
          y = '' + n
        return o !== null && o.ref !== null && typeof o.ref == 'function' && o.ref._stringRef === y
          ? o.ref
          : ((o = function (b) {
              var T = m.refs
              b === null ? delete T[y] : (T[y] = b)
            }),
            (o._stringRef = y),
            o)
      }
      if (typeof n != 'string') throw Error(r(284))
      if (!i._owner) throw Error(r(290, n))
    }
    return n
  }
  function Pa(n, o) {
    throw (
      (n = Object.prototype.toString.call(o)),
      Error(
        r(31, n === '[object Object]' ? 'object with keys {' + Object.keys(o).join(', ') + '}' : n)
      )
    )
  }
  function Lm(n) {
    var o = n._init
    return o(n._payload)
  }
  function Fm(n) {
    function o(D, M) {
      if (n) {
        var O = D.deletions
        O === null ? ((D.deletions = [M]), (D.flags |= 16)) : O.push(M)
      }
    }
    function i(D, M) {
      if (!n) return null
      for (; M !== null; ) (o(D, M), (M = M.sibling))
      return null
    }
    function c(D, M) {
      for (D = new Map(); M !== null; )
        (M.key !== null ? D.set(M.key, M) : D.set(M.index, M), (M = M.sibling))
      return D
    }
    function m(D, M) {
      return ((D = Nr(D, M)), (D.index = 0), (D.sibling = null), D)
    }
    function y(D, M, O) {
      return (
        (D.index = O),
        n
          ? ((O = D.alternate),
            O !== null ? ((O = O.index), O < M ? ((D.flags |= 2), M) : O) : ((D.flags |= 2), M))
          : ((D.flags |= 1048576), M)
      )
    }
    function b(D) {
      return (n && D.alternate === null && (D.flags |= 2), D)
    }
    function T(D, M, O, Q) {
      return M === null || M.tag !== 6
        ? ((M = Wu(O, D.mode, Q)), (M.return = D), M)
        : ((M = m(M, O)), (M.return = D), M)
    }
    function R(D, M, O, Q) {
      var pe = O.type
      return pe === z
        ? G(D, M, O.props.children, Q, O.key)
        : M !== null &&
            (M.elementType === pe ||
              (typeof pe == 'object' && pe !== null && pe.$$typeof === X && Lm(pe) === M.type))
          ? ((Q = m(M, O.props)), (Q.ref = Hs(D, M, O)), (Q.return = D), Q)
          : ((Q = qa(O.type, O.key, O.props, null, D.mode, Q)),
            (Q.ref = Hs(D, M, O)),
            (Q.return = D),
            Q)
    }
    function F(D, M, O, Q) {
      return M === null ||
        M.tag !== 4 ||
        M.stateNode.containerInfo !== O.containerInfo ||
        M.stateNode.implementation !== O.implementation
        ? ((M = Uu(O, D.mode, Q)), (M.return = D), M)
        : ((M = m(M, O.children || [])), (M.return = D), M)
    }
    function G(D, M, O, Q, pe) {
      return M === null || M.tag !== 7
        ? ((M = so(O, D.mode, Q, pe)), (M.return = D), M)
        : ((M = m(M, O)), (M.return = D), M)
    }
    function K(D, M, O) {
      if ((typeof M == 'string' && M !== '') || typeof M == 'number')
        return ((M = Wu('' + M, D.mode, O)), (M.return = D), M)
      if (typeof M == 'object' && M !== null) {
        switch (M.$$typeof) {
          case I:
            return (
              (O = qa(M.type, M.key, M.props, null, D.mode, O)),
              (O.ref = Hs(D, null, M)),
              (O.return = D),
              O
            )
          case B:
            return ((M = Uu(M, D.mode, O)), (M.return = D), M)
          case X:
            var Q = M._init
            return K(D, Q(M._payload), O)
        }
        if (Wr(M) || V(M)) return ((M = so(M, D.mode, O, null)), (M.return = D), M)
        Pa(D, M)
      }
      return null
    }
    function H(D, M, O, Q) {
      var pe = M !== null ? M.key : null
      if ((typeof O == 'string' && O !== '') || typeof O == 'number')
        return pe !== null ? null : T(D, M, '' + O, Q)
      if (typeof O == 'object' && O !== null) {
        switch (O.$$typeof) {
          case I:
            return O.key === pe ? R(D, M, O, Q) : null
          case B:
            return O.key === pe ? F(D, M, O, Q) : null
          case X:
            return ((pe = O._init), H(D, M, pe(O._payload), Q))
        }
        if (Wr(O) || V(O)) return pe !== null ? null : G(D, M, O, Q, null)
        Pa(D, O)
      }
      return null
    }
    function se(D, M, O, Q, pe) {
      if ((typeof Q == 'string' && Q !== '') || typeof Q == 'number')
        return ((D = D.get(O) || null), T(M, D, '' + Q, pe))
      if (typeof Q == 'object' && Q !== null) {
        switch (Q.$$typeof) {
          case I:
            return ((D = D.get(Q.key === null ? O : Q.key) || null), R(M, D, Q, pe))
          case B:
            return ((D = D.get(Q.key === null ? O : Q.key) || null), F(M, D, Q, pe))
          case X:
            var ge = Q._init
            return se(D, M, O, ge(Q._payload), pe)
        }
        if (Wr(Q) || V(Q)) return ((D = D.get(O) || null), G(M, D, Q, pe, null))
        Pa(M, Q)
      }
      return null
    }
    function ce(D, M, O, Q) {
      for (
        var pe = null, ge = null, ve = M, be = (M = 0), it = null;
        ve !== null && be < O.length;
        be++
      ) {
        ve.index > be ? ((it = ve), (ve = null)) : (it = ve.sibling)
        var Re = H(D, ve, O[be], Q)
        if (Re === null) {
          ve === null && (ve = it)
          break
        }
        ;(n && ve && Re.alternate === null && o(D, ve),
          (M = y(Re, M, be)),
          ge === null ? (pe = Re) : (ge.sibling = Re),
          (ge = Re),
          (ve = it))
      }
      if (be === O.length) return (i(D, ve), Be && Qr(D, be), pe)
      if (ve === null) {
        for (; be < O.length; be++)
          ((ve = K(D, O[be], Q)),
            ve !== null &&
              ((M = y(ve, M, be)), ge === null ? (pe = ve) : (ge.sibling = ve), (ge = ve)))
        return (Be && Qr(D, be), pe)
      }
      for (ve = c(D, ve); be < O.length; be++)
        ((it = se(ve, D, be, O[be], Q)),
          it !== null &&
            (n && it.alternate !== null && ve.delete(it.key === null ? be : it.key),
            (M = y(it, M, be)),
            ge === null ? (pe = it) : (ge.sibling = it),
            (ge = it)))
      return (
        n &&
          ve.forEach(function (Pr) {
            return o(D, Pr)
          }),
        Be && Qr(D, be),
        pe
      )
    }
    function de(D, M, O, Q) {
      var pe = V(O)
      if (typeof pe != 'function') throw Error(r(150))
      if (((O = pe.call(O)), O == null)) throw Error(r(151))
      for (
        var ge = (pe = null), ve = M, be = (M = 0), it = null, Re = O.next();
        ve !== null && !Re.done;
        be++, Re = O.next()
      ) {
        ve.index > be ? ((it = ve), (ve = null)) : (it = ve.sibling)
        var Pr = H(D, ve, Re.value, Q)
        if (Pr === null) {
          ve === null && (ve = it)
          break
        }
        ;(n && ve && Pr.alternate === null && o(D, ve),
          (M = y(Pr, M, be)),
          ge === null ? (pe = Pr) : (ge.sibling = Pr),
          (ge = Pr),
          (ve = it))
      }
      if (Re.done) return (i(D, ve), Be && Qr(D, be), pe)
      if (ve === null) {
        for (; !Re.done; be++, Re = O.next())
          ((Re = K(D, Re.value, Q)),
            Re !== null &&
              ((M = y(Re, M, be)), ge === null ? (pe = Re) : (ge.sibling = Re), (ge = Re)))
        return (Be && Qr(D, be), pe)
      }
      for (ve = c(D, ve); !Re.done; be++, Re = O.next())
        ((Re = se(ve, D, be, Re.value, Q)),
          Re !== null &&
            (n && Re.alternate !== null && ve.delete(Re.key === null ? be : Re.key),
            (M = y(Re, M, be)),
            ge === null ? (pe = Re) : (ge.sibling = Re),
            (ge = Re)))
      return (
        n &&
          ve.forEach(function (jC) {
            return o(D, jC)
          }),
        Be && Qr(D, be),
        pe
      )
    }
    function Ye(D, M, O, Q) {
      if (
        (typeof O == 'object' &&
          O !== null &&
          O.type === z &&
          O.key === null &&
          (O = O.props.children),
        typeof O == 'object' && O !== null)
      ) {
        switch (O.$$typeof) {
          case I:
            e: {
              for (var pe = O.key, ge = M; ge !== null; ) {
                if (ge.key === pe) {
                  if (((pe = O.type), pe === z)) {
                    if (ge.tag === 7) {
                      ;(i(D, ge.sibling), (M = m(ge, O.props.children)), (M.return = D), (D = M))
                      break e
                    }
                  } else if (
                    ge.elementType === pe ||
                    (typeof pe == 'object' &&
                      pe !== null &&
                      pe.$$typeof === X &&
                      Lm(pe) === ge.type)
                  ) {
                    ;(i(D, ge.sibling),
                      (M = m(ge, O.props)),
                      (M.ref = Hs(D, ge, O)),
                      (M.return = D),
                      (D = M))
                    break e
                  }
                  i(D, ge)
                  break
                } else o(D, ge)
                ge = ge.sibling
              }
              O.type === z
                ? ((M = so(O.props.children, D.mode, Q, O.key)), (M.return = D), (D = M))
                : ((Q = qa(O.type, O.key, O.props, null, D.mode, Q)),
                  (Q.ref = Hs(D, M, O)),
                  (Q.return = D),
                  (D = Q))
            }
            return b(D)
          case B:
            e: {
              for (ge = O.key; M !== null; ) {
                if (M.key === ge)
                  if (
                    M.tag === 4 &&
                    M.stateNode.containerInfo === O.containerInfo &&
                    M.stateNode.implementation === O.implementation
                  ) {
                    ;(i(D, M.sibling), (M = m(M, O.children || [])), (M.return = D), (D = M))
                    break e
                  } else {
                    i(D, M)
                    break
                  }
                else o(D, M)
                M = M.sibling
              }
              ;((M = Uu(O, D.mode, Q)), (M.return = D), (D = M))
            }
            return b(D)
          case X:
            return ((ge = O._init), Ye(D, M, ge(O._payload), Q))
        }
        if (Wr(O)) return ce(D, M, O, Q)
        if (V(O)) return de(D, M, O, Q)
        Pa(D, O)
      }
      return (typeof O == 'string' && O !== '') || typeof O == 'number'
        ? ((O = '' + O),
          M !== null && M.tag === 6
            ? (i(D, M.sibling), (M = m(M, O)), (M.return = D), (D = M))
            : (i(D, M), (M = Wu(O, D.mode, Q)), (M.return = D), (D = M)),
          b(D))
        : i(D, M)
    }
    return Ye
  }
  var Fo = Fm(!0),
    Vm = Fm(!1),
    Ta = hr(null),
    ja = null,
    Vo = null,
    Jc = null
  function eu() {
    Jc = Vo = ja = null
  }
  function tu(n) {
    var o = Ta.current
    ;(Fe(Ta), (n._currentValue = o))
  }
  function nu(n, o, i) {
    for (; n !== null; ) {
      var c = n.alternate
      if (
        ((n.childLanes & o) !== o
          ? ((n.childLanes |= o), c !== null && (c.childLanes |= o))
          : c !== null && (c.childLanes & o) !== o && (c.childLanes |= o),
        n === i)
      )
        break
      n = n.return
    }
  }
  function Bo(n, o) {
    ;((ja = n),
      (Jc = Vo = null),
      (n = n.dependencies),
      n !== null &&
        n.firstContext !== null &&
        ((n.lanes & o) !== 0 && (jt = !0), (n.firstContext = null)))
  }
  function Qt(n) {
    var o = n._currentValue
    if (Jc !== n)
      if (((n = { context: n, memoizedValue: o, next: null }), Vo === null)) {
        if (ja === null) throw Error(r(308))
        ;((Vo = n), (ja.dependencies = { lanes: 0, firstContext: n }))
      } else Vo = Vo.next = n
    return o
  }
  var Zr = null
  function ru(n) {
    Zr === null ? (Zr = [n]) : Zr.push(n)
  }
  function Bm(n, o, i, c) {
    var m = o.interleaved
    return (
      m === null ? ((i.next = i), ru(o)) : ((i.next = m.next), (m.next = i)),
      (o.interleaved = i),
      zn(n, c)
    )
  }
  function zn(n, o) {
    n.lanes |= o
    var i = n.alternate
    for (i !== null && (i.lanes |= o), i = n, n = n.return; n !== null; )
      ((n.childLanes |= o),
        (i = n.alternate),
        i !== null && (i.childLanes |= o),
        (i = n),
        (n = n.return))
    return i.tag === 3 ? i.stateNode : null
  }
  var yr = !1
  function ou(n) {
    n.updateQueue = {
      baseState: n.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    }
  }
  function zm(n, o) {
    ;((n = n.updateQueue),
      o.updateQueue === n &&
        (o.updateQueue = {
          baseState: n.baseState,
          firstBaseUpdate: n.firstBaseUpdate,
          lastBaseUpdate: n.lastBaseUpdate,
          shared: n.shared,
          effects: n.effects,
        }))
  }
  function $n(n, o) {
    return { eventTime: n, lane: o, tag: 0, payload: null, callback: null, next: null }
  }
  function xr(n, o, i) {
    var c = n.updateQueue
    if (c === null) return null
    if (((c = c.shared), (je & 2) !== 0)) {
      var m = c.pending
      return (
        m === null ? (o.next = o) : ((o.next = m.next), (m.next = o)),
        (c.pending = o),
        zn(n, i)
      )
    }
    return (
      (m = c.interleaved),
      m === null ? ((o.next = o), ru(c)) : ((o.next = m.next), (m.next = o)),
      (c.interleaved = o),
      zn(n, i)
    )
  }
  function ka(n, o, i) {
    if (((o = o.updateQueue), o !== null && ((o = o.shared), (i & 4194240) !== 0))) {
      var c = o.lanes
      ;((c &= n.pendingLanes), (i |= c), (o.lanes = i), yc(n, i))
    }
  }
  function $m(n, o) {
    var i = n.updateQueue,
      c = n.alternate
    if (c !== null && ((c = c.updateQueue), i === c)) {
      var m = null,
        y = null
      if (((i = i.firstBaseUpdate), i !== null)) {
        do {
          var b = {
            eventTime: i.eventTime,
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          }
          ;(y === null ? (m = y = b) : (y = y.next = b), (i = i.next))
        } while (i !== null)
        y === null ? (m = y = o) : (y = y.next = o)
      } else m = y = o
      ;((i = {
        baseState: c.baseState,
        firstBaseUpdate: m,
        lastBaseUpdate: y,
        shared: c.shared,
        effects: c.effects,
      }),
        (n.updateQueue = i))
      return
    }
    ;((n = i.lastBaseUpdate),
      n === null ? (i.firstBaseUpdate = o) : (n.next = o),
      (i.lastBaseUpdate = o))
  }
  function Ra(n, o, i, c) {
    var m = n.updateQueue
    yr = !1
    var y = m.firstBaseUpdate,
      b = m.lastBaseUpdate,
      T = m.shared.pending
    if (T !== null) {
      m.shared.pending = null
      var R = T,
        F = R.next
      ;((R.next = null), b === null ? (y = F) : (b.next = F), (b = R))
      var G = n.alternate
      G !== null &&
        ((G = G.updateQueue),
        (T = G.lastBaseUpdate),
        T !== b && (T === null ? (G.firstBaseUpdate = F) : (T.next = F), (G.lastBaseUpdate = R)))
    }
    if (y !== null) {
      var K = m.baseState
      ;((b = 0), (G = F = R = null), (T = y))
      do {
        var H = T.lane,
          se = T.eventTime
        if ((c & H) === H) {
          G !== null &&
            (G = G.next =
              {
                eventTime: se,
                lane: 0,
                tag: T.tag,
                payload: T.payload,
                callback: T.callback,
                next: null,
              })
          e: {
            var ce = n,
              de = T
            switch (((H = o), (se = i), de.tag)) {
              case 1:
                if (((ce = de.payload), typeof ce == 'function')) {
                  K = ce.call(se, K, H)
                  break e
                }
                K = ce
                break e
              case 3:
                ce.flags = (ce.flags & -65537) | 128
              case 0:
                if (
                  ((ce = de.payload),
                  (H = typeof ce == 'function' ? ce.call(se, K, H) : ce),
                  H == null)
                )
                  break e
                K = U({}, K, H)
                break e
              case 2:
                yr = !0
            }
          }
          T.callback !== null &&
            T.lane !== 0 &&
            ((n.flags |= 64), (H = m.effects), H === null ? (m.effects = [T]) : H.push(T))
        } else
          ((se = {
            eventTime: se,
            lane: H,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null,
          }),
            G === null ? ((F = G = se), (R = K)) : (G = G.next = se),
            (b |= H))
        if (((T = T.next), T === null)) {
          if (((T = m.shared.pending), T === null)) break
          ;((H = T),
            (T = H.next),
            (H.next = null),
            (m.lastBaseUpdate = H),
            (m.shared.pending = null))
        }
      } while (!0)
      if (
        (G === null && (R = K),
        (m.baseState = R),
        (m.firstBaseUpdate = F),
        (m.lastBaseUpdate = G),
        (o = m.shared.interleaved),
        o !== null)
      ) {
        m = o
        do ((b |= m.lane), (m = m.next))
        while (m !== o)
      } else y === null && (m.shared.lanes = 0)
      ;((to |= b), (n.lanes = b), (n.memoizedState = K))
    }
  }
  function Wm(n, o, i) {
    if (((n = o.effects), (o.effects = null), n !== null))
      for (o = 0; o < n.length; o++) {
        var c = n[o],
          m = c.callback
        if (m !== null) {
          if (((c.callback = null), (c = i), typeof m != 'function')) throw Error(r(191, m))
          m.call(c)
        }
      }
  }
  var Gs = {},
    wn = hr(Gs),
    Ks = hr(Gs),
    Ys = hr(Gs)
  function Jr(n) {
    if (n === Gs) throw Error(r(174))
    return n
  }
  function su(n, o) {
    switch ((Oe(Ys, o), Oe(Ks, n), Oe(wn, Gs), (n = o.nodeType), n)) {
      case 9:
      case 11:
        o = (o = o.documentElement) ? o.namespaceURI : bs(null, '')
        break
      default:
        ;((n = n === 8 ? o.parentNode : o),
          (o = n.namespaceURI || null),
          (n = n.tagName),
          (o = bs(o, n)))
    }
    ;(Fe(wn), Oe(wn, o))
  }
  function zo() {
    ;(Fe(wn), Fe(Ks), Fe(Ys))
  }
  function Um(n) {
    Jr(Ys.current)
    var o = Jr(wn.current),
      i = bs(o, n.type)
    o !== i && (Oe(Ks, n), Oe(wn, i))
  }
  function iu(n) {
    Ks.current === n && (Fe(wn), Fe(Ks))
  }
  var ze = hr(0)
  function Aa(n) {
    for (var o = n; o !== null; ) {
      if (o.tag === 13) {
        var i = o.memoizedState
        if (i !== null && ((i = i.dehydrated), i === null || i.data === '$?' || i.data === '$!'))
          return o
      } else if (o.tag === 19 && o.memoizedProps.revealOrder !== void 0) {
        if ((o.flags & 128) !== 0) return o
      } else if (o.child !== null) {
        ;((o.child.return = o), (o = o.child))
        continue
      }
      if (o === n) break
      for (; o.sibling === null; ) {
        if (o.return === null || o.return === n) return null
        o = o.return
      }
      ;((o.sibling.return = o.return), (o = o.sibling))
    }
    return null
  }
  var au = []
  function lu() {
    for (var n = 0; n < au.length; n++) au[n]._workInProgressVersionPrimary = null
    au.length = 0
  }
  var Ma = _.ReactCurrentDispatcher,
    cu = _.ReactCurrentBatchConfig,
    eo = 0,
    $e = null,
    tt = null,
    ot = null,
    _a = !1,
    Xs = !1,
    qs = 0,
    qS = 0
  function ht() {
    throw Error(r(321))
  }
  function uu(n, o) {
    if (o === null) return !1
    for (var i = 0; i < o.length && i < n.length; i++) if (!an(n[i], o[i])) return !1
    return !0
  }
  function du(n, o, i, c, m, y) {
    if (
      ((eo = y),
      ($e = o),
      (o.memoizedState = null),
      (o.updateQueue = null),
      (o.lanes = 0),
      (Ma.current = n === null || n.memoizedState === null ? eC : tC),
      (n = i(c, m)),
      Xs)
    ) {
      y = 0
      do {
        if (((Xs = !1), (qs = 0), 25 <= y)) throw Error(r(301))
        ;((y += 1), (ot = tt = null), (o.updateQueue = null), (Ma.current = nC), (n = i(c, m)))
      } while (Xs)
    }
    if (
      ((Ma.current = Oa),
      (o = tt !== null && tt.next !== null),
      (eo = 0),
      (ot = tt = $e = null),
      (_a = !1),
      o)
    )
      throw Error(r(300))
    return n
  }
  function fu() {
    var n = qs !== 0
    return ((qs = 0), n)
  }
  function bn() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null }
    return (ot === null ? ($e.memoizedState = ot = n) : (ot = ot.next = n), ot)
  }
  function Zt() {
    if (tt === null) {
      var n = $e.alternate
      n = n !== null ? n.memoizedState : null
    } else n = tt.next
    var o = ot === null ? $e.memoizedState : ot.next
    if (o !== null) ((ot = o), (tt = n))
    else {
      if (n === null) throw Error(r(310))
      ;((tt = n),
        (n = {
          memoizedState: tt.memoizedState,
          baseState: tt.baseState,
          baseQueue: tt.baseQueue,
          queue: tt.queue,
          next: null,
        }),
        ot === null ? ($e.memoizedState = ot = n) : (ot = ot.next = n))
    }
    return ot
  }
  function Qs(n, o) {
    return typeof o == 'function' ? o(n) : o
  }
  function pu(n) {
    var o = Zt(),
      i = o.queue
    if (i === null) throw Error(r(311))
    i.lastRenderedReducer = n
    var c = tt,
      m = c.baseQueue,
      y = i.pending
    if (y !== null) {
      if (m !== null) {
        var b = m.next
        ;((m.next = y.next), (y.next = b))
      }
      ;((c.baseQueue = m = y), (i.pending = null))
    }
    if (m !== null) {
      ;((y = m.next), (c = c.baseState))
      var T = (b = null),
        R = null,
        F = y
      do {
        var G = F.lane
        if ((eo & G) === G)
          (R !== null &&
            (R = R.next =
              {
                lane: 0,
                action: F.action,
                hasEagerState: F.hasEagerState,
                eagerState: F.eagerState,
                next: null,
              }),
            (c = F.hasEagerState ? F.eagerState : n(c, F.action)))
        else {
          var K = {
            lane: G,
            action: F.action,
            hasEagerState: F.hasEagerState,
            eagerState: F.eagerState,
            next: null,
          }
          ;(R === null ? ((T = R = K), (b = c)) : (R = R.next = K), ($e.lanes |= G), (to |= G))
        }
        F = F.next
      } while (F !== null && F !== y)
      ;(R === null ? (b = c) : (R.next = T),
        an(c, o.memoizedState) || (jt = !0),
        (o.memoizedState = c),
        (o.baseState = b),
        (o.baseQueue = R),
        (i.lastRenderedState = c))
    }
    if (((n = i.interleaved), n !== null)) {
      m = n
      do ((y = m.lane), ($e.lanes |= y), (to |= y), (m = m.next))
      while (m !== n)
    } else m === null && (i.lanes = 0)
    return [o.memoizedState, i.dispatch]
  }
  function mu(n) {
    var o = Zt(),
      i = o.queue
    if (i === null) throw Error(r(311))
    i.lastRenderedReducer = n
    var c = i.dispatch,
      m = i.pending,
      y = o.memoizedState
    if (m !== null) {
      i.pending = null
      var b = (m = m.next)
      do ((y = n(y, b.action)), (b = b.next))
      while (b !== m)
      ;(an(y, o.memoizedState) || (jt = !0),
        (o.memoizedState = y),
        o.baseQueue === null && (o.baseState = y),
        (i.lastRenderedState = y))
    }
    return [y, c]
  }
  function Hm() {}
  function Gm(n, o) {
    var i = $e,
      c = Zt(),
      m = o(),
      y = !an(c.memoizedState, m)
    if (
      (y && ((c.memoizedState = m), (jt = !0)),
      (c = c.queue),
      hu(Xm.bind(null, i, c, n), [n]),
      c.getSnapshot !== o || y || (ot !== null && ot.memoizedState.tag & 1))
    ) {
      if (((i.flags |= 2048), Zs(9, Ym.bind(null, i, c, m, o), void 0, null), st === null))
        throw Error(r(349))
      ;(eo & 30) !== 0 || Km(i, o, m)
    }
    return m
  }
  function Km(n, o, i) {
    ;((n.flags |= 16384),
      (n = { getSnapshot: o, value: i }),
      (o = $e.updateQueue),
      o === null
        ? ((o = { lastEffect: null, stores: null }), ($e.updateQueue = o), (o.stores = [n]))
        : ((i = o.stores), i === null ? (o.stores = [n]) : i.push(n)))
  }
  function Ym(n, o, i, c) {
    ;((o.value = i), (o.getSnapshot = c), qm(o) && Qm(n))
  }
  function Xm(n, o, i) {
    return i(function () {
      qm(o) && Qm(n)
    })
  }
  function qm(n) {
    var o = n.getSnapshot
    n = n.value
    try {
      var i = o()
      return !an(n, i)
    } catch {
      return !0
    }
  }
  function Qm(n) {
    var o = zn(n, 1)
    o !== null && fn(o, n, 1, -1)
  }
  function Zm(n) {
    var o = bn()
    return (
      typeof n == 'function' && (n = n()),
      (o.memoizedState = o.baseState = n),
      (n = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qs,
        lastRenderedState: n,
      }),
      (o.queue = n),
      (n = n.dispatch = JS.bind(null, $e, n)),
      [o.memoizedState, n]
    )
  }
  function Zs(n, o, i, c) {
    return (
      (n = { tag: n, create: o, destroy: i, deps: c, next: null }),
      (o = $e.updateQueue),
      o === null
        ? ((o = { lastEffect: null, stores: null }),
          ($e.updateQueue = o),
          (o.lastEffect = n.next = n))
        : ((i = o.lastEffect),
          i === null
            ? (o.lastEffect = n.next = n)
            : ((c = i.next), (i.next = n), (n.next = c), (o.lastEffect = n))),
      n
    )
  }
  function Jm() {
    return Zt().memoizedState
  }
  function Da(n, o, i, c) {
    var m = bn()
    ;(($e.flags |= n), (m.memoizedState = Zs(1 | o, i, void 0, c === void 0 ? null : c)))
  }
  function Ia(n, o, i, c) {
    var m = Zt()
    c = c === void 0 ? null : c
    var y = void 0
    if (tt !== null) {
      var b = tt.memoizedState
      if (((y = b.destroy), c !== null && uu(c, b.deps))) {
        m.memoizedState = Zs(o, i, y, c)
        return
      }
    }
    ;(($e.flags |= n), (m.memoizedState = Zs(1 | o, i, y, c)))
  }
  function eh(n, o) {
    return Da(8390656, 8, n, o)
  }
  function hu(n, o) {
    return Ia(2048, 8, n, o)
  }
  function th(n, o) {
    return Ia(4, 2, n, o)
  }
  function nh(n, o) {
    return Ia(4, 4, n, o)
  }
  function rh(n, o) {
    if (typeof o == 'function')
      return (
        (n = n()),
        o(n),
        function () {
          o(null)
        }
      )
    if (o != null)
      return (
        (n = n()),
        (o.current = n),
        function () {
          o.current = null
        }
      )
  }
  function oh(n, o, i) {
    return ((i = i != null ? i.concat([n]) : null), Ia(4, 4, rh.bind(null, o, n), i))
  }
  function gu() {}
  function sh(n, o) {
    var i = Zt()
    o = o === void 0 ? null : o
    var c = i.memoizedState
    return c !== null && o !== null && uu(o, c[1]) ? c[0] : ((i.memoizedState = [n, o]), n)
  }
  function ih(n, o) {
    var i = Zt()
    o = o === void 0 ? null : o
    var c = i.memoizedState
    return c !== null && o !== null && uu(o, c[1])
      ? c[0]
      : ((n = n()), (i.memoizedState = [n, o]), n)
  }
  function ah(n, o, i) {
    return (eo & 21) === 0
      ? (n.baseState && ((n.baseState = !1), (jt = !0)), (n.memoizedState = i))
      : (an(i, o) || ((i = Lp()), ($e.lanes |= i), (to |= i), (n.baseState = !0)), o)
  }
  function QS(n, o) {
    var i = De
    ;((De = i !== 0 && 4 > i ? i : 4), n(!0))
    var c = cu.transition
    cu.transition = {}
    try {
      ;(n(!1), o())
    } finally {
      ;((De = i), (cu.transition = c))
    }
  }
  function lh() {
    return Zt().memoizedState
  }
  function ZS(n, o, i) {
    var c = Cr(n)
    if (((i = { lane: c, action: i, hasEagerState: !1, eagerState: null, next: null }), ch(n)))
      uh(o, i)
    else if (((i = Bm(n, o, i, c)), i !== null)) {
      var m = Ct()
      ;(fn(i, n, c, m), dh(i, o, c))
    }
  }
  function JS(n, o, i) {
    var c = Cr(n),
      m = { lane: c, action: i, hasEagerState: !1, eagerState: null, next: null }
    if (ch(n)) uh(o, m)
    else {
      var y = n.alternate
      if (
        n.lanes === 0 &&
        (y === null || y.lanes === 0) &&
        ((y = o.lastRenderedReducer), y !== null)
      )
        try {
          var b = o.lastRenderedState,
            T = y(b, i)
          if (((m.hasEagerState = !0), (m.eagerState = T), an(T, b))) {
            var R = o.interleaved
            ;(R === null ? ((m.next = m), ru(o)) : ((m.next = R.next), (R.next = m)),
              (o.interleaved = m))
            return
          }
        } catch {}
      ;((i = Bm(n, o, m, c)), i !== null && ((m = Ct()), fn(i, n, c, m), dh(i, o, c)))
    }
  }
  function ch(n) {
    var o = n.alternate
    return n === $e || (o !== null && o === $e)
  }
  function uh(n, o) {
    Xs = _a = !0
    var i = n.pending
    ;(i === null ? (o.next = o) : ((o.next = i.next), (i.next = o)), (n.pending = o))
  }
  function dh(n, o, i) {
    if ((i & 4194240) !== 0) {
      var c = o.lanes
      ;((c &= n.pendingLanes), (i |= c), (o.lanes = i), yc(n, i))
    }
  }
  var Oa = {
      readContext: Qt,
      useCallback: ht,
      useContext: ht,
      useEffect: ht,
      useImperativeHandle: ht,
      useInsertionEffect: ht,
      useLayoutEffect: ht,
      useMemo: ht,
      useReducer: ht,
      useRef: ht,
      useState: ht,
      useDebugValue: ht,
      useDeferredValue: ht,
      useTransition: ht,
      useMutableSource: ht,
      useSyncExternalStore: ht,
      useId: ht,
      unstable_isNewReconciler: !1,
    },
    eC = {
      readContext: Qt,
      useCallback: function (n, o) {
        return ((bn().memoizedState = [n, o === void 0 ? null : o]), n)
      },
      useContext: Qt,
      useEffect: eh,
      useImperativeHandle: function (n, o, i) {
        return ((i = i != null ? i.concat([n]) : null), Da(4194308, 4, rh.bind(null, o, n), i))
      },
      useLayoutEffect: function (n, o) {
        return Da(4194308, 4, n, o)
      },
      useInsertionEffect: function (n, o) {
        return Da(4, 2, n, o)
      },
      useMemo: function (n, o) {
        var i = bn()
        return ((o = o === void 0 ? null : o), (n = n()), (i.memoizedState = [n, o]), n)
      },
      useReducer: function (n, o, i) {
        var c = bn()
        return (
          (o = i !== void 0 ? i(o) : o),
          (c.memoizedState = c.baseState = o),
          (n = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: n,
            lastRenderedState: o,
          }),
          (c.queue = n),
          (n = n.dispatch = ZS.bind(null, $e, n)),
          [c.memoizedState, n]
        )
      },
      useRef: function (n) {
        var o = bn()
        return ((n = { current: n }), (o.memoizedState = n))
      },
      useState: Zm,
      useDebugValue: gu,
      useDeferredValue: function (n) {
        return (bn().memoizedState = n)
      },
      useTransition: function () {
        var n = Zm(!1),
          o = n[0]
        return ((n = QS.bind(null, n[1])), (bn().memoizedState = n), [o, n])
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (n, o, i) {
        var c = $e,
          m = bn()
        if (Be) {
          if (i === void 0) throw Error(r(407))
          i = i()
        } else {
          if (((i = o()), st === null)) throw Error(r(349))
          ;(eo & 30) !== 0 || Km(c, o, i)
        }
        m.memoizedState = i
        var y = { value: i, getSnapshot: o }
        return (
          (m.queue = y),
          eh(Xm.bind(null, c, y, n), [n]),
          (c.flags |= 2048),
          Zs(9, Ym.bind(null, c, y, i, o), void 0, null),
          i
        )
      },
      useId: function () {
        var n = bn(),
          o = st.identifierPrefix
        if (Be) {
          var i = Bn,
            c = Vn
          ;((i = (c & ~(1 << (32 - sn(c) - 1))).toString(32) + i),
            (o = ':' + o + 'R' + i),
            (i = qs++),
            0 < i && (o += 'H' + i.toString(32)),
            (o += ':'))
        } else ((i = qS++), (o = ':' + o + 'r' + i.toString(32) + ':'))
        return (n.memoizedState = o)
      },
      unstable_isNewReconciler: !1,
    },
    tC = {
      readContext: Qt,
      useCallback: sh,
      useContext: Qt,
      useEffect: hu,
      useImperativeHandle: oh,
      useInsertionEffect: th,
      useLayoutEffect: nh,
      useMemo: ih,
      useReducer: pu,
      useRef: Jm,
      useState: function () {
        return pu(Qs)
      },
      useDebugValue: gu,
      useDeferredValue: function (n) {
        var o = Zt()
        return ah(o, tt.memoizedState, n)
      },
      useTransition: function () {
        var n = pu(Qs)[0],
          o = Zt().memoizedState
        return [n, o]
      },
      useMutableSource: Hm,
      useSyncExternalStore: Gm,
      useId: lh,
      unstable_isNewReconciler: !1,
    },
    nC = {
      readContext: Qt,
      useCallback: sh,
      useContext: Qt,
      useEffect: hu,
      useImperativeHandle: oh,
      useInsertionEffect: th,
      useLayoutEffect: nh,
      useMemo: ih,
      useReducer: mu,
      useRef: Jm,
      useState: function () {
        return mu(Qs)
      },
      useDebugValue: gu,
      useDeferredValue: function (n) {
        var o = Zt()
        return tt === null ? (o.memoizedState = n) : ah(o, tt.memoizedState, n)
      },
      useTransition: function () {
        var n = mu(Qs)[0],
          o = Zt().memoizedState
        return [n, o]
      },
      useMutableSource: Hm,
      useSyncExternalStore: Gm,
      useId: lh,
      unstable_isNewReconciler: !1,
    }
  function cn(n, o) {
    if (n && n.defaultProps) {
      ;((o = U({}, o)), (n = n.defaultProps))
      for (var i in n) o[i] === void 0 && (o[i] = n[i])
      return o
    }
    return o
  }
  function vu(n, o, i, c) {
    ;((o = n.memoizedState),
      (i = i(c, o)),
      (i = i == null ? o : U({}, o, i)),
      (n.memoizedState = i),
      n.lanes === 0 && (n.updateQueue.baseState = i))
  }
  var La = {
    isMounted: function (n) {
      return (n = n._reactInternals) ? Kr(n) === n : !1
    },
    enqueueSetState: function (n, o, i) {
      n = n._reactInternals
      var c = Ct(),
        m = Cr(n),
        y = $n(c, m)
      ;((y.payload = o),
        i != null && (y.callback = i),
        (o = xr(n, y, m)),
        o !== null && (fn(o, n, m, c), ka(o, n, m)))
    },
    enqueueReplaceState: function (n, o, i) {
      n = n._reactInternals
      var c = Ct(),
        m = Cr(n),
        y = $n(c, m)
      ;((y.tag = 1),
        (y.payload = o),
        i != null && (y.callback = i),
        (o = xr(n, y, m)),
        o !== null && (fn(o, n, m, c), ka(o, n, m)))
    },
    enqueueForceUpdate: function (n, o) {
      n = n._reactInternals
      var i = Ct(),
        c = Cr(n),
        m = $n(i, c)
      ;((m.tag = 2),
        o != null && (m.callback = o),
        (o = xr(n, m, c)),
        o !== null && (fn(o, n, c, i), ka(o, n, c)))
    },
  }
  function fh(n, o, i, c, m, y, b) {
    return (
      (n = n.stateNode),
      typeof n.shouldComponentUpdate == 'function'
        ? n.shouldComponentUpdate(c, y, b)
        : o.prototype && o.prototype.isPureReactComponent
          ? !Fs(i, c) || !Fs(m, y)
          : !0
    )
  }
  function ph(n, o, i) {
    var c = !1,
      m = gr,
      y = o.contextType
    return (
      typeof y == 'object' && y !== null
        ? (y = Qt(y))
        : ((m = Tt(o) ? Xr : mt.current),
          (c = o.contextTypes),
          (y = (c = c != null) ? Do(n, m) : gr)),
      (o = new o(i, y)),
      (n.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null),
      (o.updater = La),
      (n.stateNode = o),
      (o._reactInternals = n),
      c &&
        ((n = n.stateNode),
        (n.__reactInternalMemoizedUnmaskedChildContext = m),
        (n.__reactInternalMemoizedMaskedChildContext = y)),
      o
    )
  }
  function mh(n, o, i, c) {
    ;((n = o.state),
      typeof o.componentWillReceiveProps == 'function' && o.componentWillReceiveProps(i, c),
      typeof o.UNSAFE_componentWillReceiveProps == 'function' &&
        o.UNSAFE_componentWillReceiveProps(i, c),
      o.state !== n && La.enqueueReplaceState(o, o.state, null))
  }
  function yu(n, o, i, c) {
    var m = n.stateNode
    ;((m.props = i), (m.state = n.memoizedState), (m.refs = {}), ou(n))
    var y = o.contextType
    ;(typeof y == 'object' && y !== null
      ? (m.context = Qt(y))
      : ((y = Tt(o) ? Xr : mt.current), (m.context = Do(n, y))),
      (m.state = n.memoizedState),
      (y = o.getDerivedStateFromProps),
      typeof y == 'function' && (vu(n, o, y, i), (m.state = n.memoizedState)),
      typeof o.getDerivedStateFromProps == 'function' ||
        typeof m.getSnapshotBeforeUpdate == 'function' ||
        (typeof m.UNSAFE_componentWillMount != 'function' &&
          typeof m.componentWillMount != 'function') ||
        ((o = m.state),
        typeof m.componentWillMount == 'function' && m.componentWillMount(),
        typeof m.UNSAFE_componentWillMount == 'function' && m.UNSAFE_componentWillMount(),
        o !== m.state && La.enqueueReplaceState(m, m.state, null),
        Ra(n, i, m, c),
        (m.state = n.memoizedState)),
      typeof m.componentDidMount == 'function' && (n.flags |= 4194308))
  }
  function $o(n, o) {
    try {
      var i = '',
        c = o
      do ((i += le(c)), (c = c.return))
      while (c)
      var m = i
    } catch (y) {
      m =
        `
Error generating stack: ` +
        y.message +
        `
` +
        y.stack
    }
    return { value: n, source: o, stack: m, digest: null }
  }
  function xu(n, o, i) {
    return { value: n, source: null, stack: i ?? null, digest: o ?? null }
  }
  function wu(n, o) {
    try {
      console.error(o.value)
    } catch (i) {
      setTimeout(function () {
        throw i
      })
    }
  }
  var rC = typeof WeakMap == 'function' ? WeakMap : Map
  function hh(n, o, i) {
    ;((i = $n(-1, i)), (i.tag = 3), (i.payload = { element: null }))
    var c = o.value
    return (
      (i.callback = function () {
        ;(Ua || ((Ua = !0), (Iu = c)), wu(n, o))
      }),
      i
    )
  }
  function gh(n, o, i) {
    ;((i = $n(-1, i)), (i.tag = 3))
    var c = n.type.getDerivedStateFromError
    if (typeof c == 'function') {
      var m = o.value
      ;((i.payload = function () {
        return c(m)
      }),
        (i.callback = function () {
          wu(n, o)
        }))
    }
    var y = n.stateNode
    return (
      y !== null &&
        typeof y.componentDidCatch == 'function' &&
        (i.callback = function () {
          ;(wu(n, o),
            typeof c != 'function' && (br === null ? (br = new Set([this])) : br.add(this)))
          var b = o.stack
          this.componentDidCatch(o.value, { componentStack: b !== null ? b : '' })
        }),
      i
    )
  }
  function vh(n, o, i) {
    var c = n.pingCache
    if (c === null) {
      c = n.pingCache = new rC()
      var m = new Set()
      c.set(o, m)
    } else ((m = c.get(o)), m === void 0 && ((m = new Set()), c.set(o, m)))
    m.has(i) || (m.add(i), (n = vC.bind(null, n, o, i)), o.then(n, n))
  }
  function yh(n) {
    do {
      var o
      if (
        ((o = n.tag === 13) &&
          ((o = n.memoizedState), (o = o !== null ? o.dehydrated !== null : !0)),
        o)
      )
        return n
      n = n.return
    } while (n !== null)
    return null
  }
  function xh(n, o, i, c, m) {
    return (n.mode & 1) === 0
      ? (n === o
          ? (n.flags |= 65536)
          : ((n.flags |= 128),
            (i.flags |= 131072),
            (i.flags &= -52805),
            i.tag === 1 &&
              (i.alternate === null ? (i.tag = 17) : ((o = $n(-1, 1)), (o.tag = 2), xr(i, o, 1))),
            (i.lanes |= 1)),
        n)
      : ((n.flags |= 65536), (n.lanes = m), n)
  }
  var oC = _.ReactCurrentOwner,
    jt = !1
  function St(n, o, i, c) {
    o.child = n === null ? Vm(o, null, i, c) : Fo(o, n.child, i, c)
  }
  function wh(n, o, i, c, m) {
    i = i.render
    var y = o.ref
    return (
      Bo(o, m),
      (c = du(n, o, i, c, y, m)),
      (i = fu()),
      n !== null && !jt
        ? ((o.updateQueue = n.updateQueue), (o.flags &= -2053), (n.lanes &= ~m), Wn(n, o, m))
        : (Be && i && Yc(o), (o.flags |= 1), St(n, o, c, m), o.child)
    )
  }
  function bh(n, o, i, c, m) {
    if (n === null) {
      var y = i.type
      return typeof y == 'function' &&
        !$u(y) &&
        y.defaultProps === void 0 &&
        i.compare === null &&
        i.defaultProps === void 0
        ? ((o.tag = 15), (o.type = y), Sh(n, o, y, c, m))
        : ((n = qa(i.type, null, c, o, o.mode, m)), (n.ref = o.ref), (n.return = o), (o.child = n))
    }
    if (((y = n.child), (n.lanes & m) === 0)) {
      var b = y.memoizedProps
      if (((i = i.compare), (i = i !== null ? i : Fs), i(b, c) && n.ref === o.ref))
        return Wn(n, o, m)
    }
    return ((o.flags |= 1), (n = Nr(y, c)), (n.ref = o.ref), (n.return = o), (o.child = n))
  }
  function Sh(n, o, i, c, m) {
    if (n !== null) {
      var y = n.memoizedProps
      if (Fs(y, c) && n.ref === o.ref)
        if (((jt = !1), (o.pendingProps = c = y), (n.lanes & m) !== 0))
          (n.flags & 131072) !== 0 && (jt = !0)
        else return ((o.lanes = n.lanes), Wn(n, o, m))
    }
    return bu(n, o, i, c, m)
  }
  function Ch(n, o, i) {
    var c = o.pendingProps,
      m = c.children,
      y = n !== null ? n.memoizedState : null
    if (c.mode === 'hidden')
      if ((o.mode & 1) === 0)
        ((o.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          Oe(Uo, Bt),
          (Bt |= i))
      else {
        if ((i & 1073741824) === 0)
          return (
            (n = y !== null ? y.baseLanes | i : i),
            (o.lanes = o.childLanes = 1073741824),
            (o.memoizedState = { baseLanes: n, cachePool: null, transitions: null }),
            (o.updateQueue = null),
            Oe(Uo, Bt),
            (Bt |= n),
            null
          )
        ;((o.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          (c = y !== null ? y.baseLanes : i),
          Oe(Uo, Bt),
          (Bt |= c))
      }
    else
      (y !== null ? ((c = y.baseLanes | i), (o.memoizedState = null)) : (c = i),
        Oe(Uo, Bt),
        (Bt |= c))
    return (St(n, o, m, i), o.child)
  }
  function Eh(n, o) {
    var i = o.ref
    ;((n === null && i !== null) || (n !== null && n.ref !== i)) &&
      ((o.flags |= 512), (o.flags |= 2097152))
  }
  function bu(n, o, i, c, m) {
    var y = Tt(i) ? Xr : mt.current
    return (
      (y = Do(o, y)),
      Bo(o, m),
      (i = du(n, o, i, c, y, m)),
      (c = fu()),
      n !== null && !jt
        ? ((o.updateQueue = n.updateQueue), (o.flags &= -2053), (n.lanes &= ~m), Wn(n, o, m))
        : (Be && c && Yc(o), (o.flags |= 1), St(n, o, i, m), o.child)
    )
  }
  function Nh(n, o, i, c, m) {
    if (Tt(i)) {
      var y = !0
      ba(o)
    } else y = !1
    if ((Bo(o, m), o.stateNode === null)) (Va(n, o), ph(o, i, c), yu(o, i, c, m), (c = !0))
    else if (n === null) {
      var b = o.stateNode,
        T = o.memoizedProps
      b.props = T
      var R = b.context,
        F = i.contextType
      typeof F == 'object' && F !== null
        ? (F = Qt(F))
        : ((F = Tt(i) ? Xr : mt.current), (F = Do(o, F)))
      var G = i.getDerivedStateFromProps,
        K = typeof G == 'function' || typeof b.getSnapshotBeforeUpdate == 'function'
      ;(K ||
        (typeof b.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof b.componentWillReceiveProps != 'function') ||
        ((T !== c || R !== F) && mh(o, b, c, F)),
        (yr = !1))
      var H = o.memoizedState
      ;((b.state = H),
        Ra(o, c, b, m),
        (R = o.memoizedState),
        T !== c || H !== R || Pt.current || yr
          ? (typeof G == 'function' && (vu(o, i, G, c), (R = o.memoizedState)),
            (T = yr || fh(o, i, T, c, H, R, F))
              ? (K ||
                  (typeof b.UNSAFE_componentWillMount != 'function' &&
                    typeof b.componentWillMount != 'function') ||
                  (typeof b.componentWillMount == 'function' && b.componentWillMount(),
                  typeof b.UNSAFE_componentWillMount == 'function' &&
                    b.UNSAFE_componentWillMount()),
                typeof b.componentDidMount == 'function' && (o.flags |= 4194308))
              : (typeof b.componentDidMount == 'function' && (o.flags |= 4194308),
                (o.memoizedProps = c),
                (o.memoizedState = R)),
            (b.props = c),
            (b.state = R),
            (b.context = F),
            (c = T))
          : (typeof b.componentDidMount == 'function' && (o.flags |= 4194308), (c = !1)))
    } else {
      ;((b = o.stateNode),
        zm(n, o),
        (T = o.memoizedProps),
        (F = o.type === o.elementType ? T : cn(o.type, T)),
        (b.props = F),
        (K = o.pendingProps),
        (H = b.context),
        (R = i.contextType),
        typeof R == 'object' && R !== null
          ? (R = Qt(R))
          : ((R = Tt(i) ? Xr : mt.current), (R = Do(o, R))))
      var se = i.getDerivedStateFromProps
      ;((G = typeof se == 'function' || typeof b.getSnapshotBeforeUpdate == 'function') ||
        (typeof b.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof b.componentWillReceiveProps != 'function') ||
        ((T !== K || H !== R) && mh(o, b, c, R)),
        (yr = !1),
        (H = o.memoizedState),
        (b.state = H),
        Ra(o, c, b, m))
      var ce = o.memoizedState
      T !== K || H !== ce || Pt.current || yr
        ? (typeof se == 'function' && (vu(o, i, se, c), (ce = o.memoizedState)),
          (F = yr || fh(o, i, F, c, H, ce, R) || !1)
            ? (G ||
                (typeof b.UNSAFE_componentWillUpdate != 'function' &&
                  typeof b.componentWillUpdate != 'function') ||
                (typeof b.componentWillUpdate == 'function' && b.componentWillUpdate(c, ce, R),
                typeof b.UNSAFE_componentWillUpdate == 'function' &&
                  b.UNSAFE_componentWillUpdate(c, ce, R)),
              typeof b.componentDidUpdate == 'function' && (o.flags |= 4),
              typeof b.getSnapshotBeforeUpdate == 'function' && (o.flags |= 1024))
            : (typeof b.componentDidUpdate != 'function' ||
                (T === n.memoizedProps && H === n.memoizedState) ||
                (o.flags |= 4),
              typeof b.getSnapshotBeforeUpdate != 'function' ||
                (T === n.memoizedProps && H === n.memoizedState) ||
                (o.flags |= 1024),
              (o.memoizedProps = c),
              (o.memoizedState = ce)),
          (b.props = c),
          (b.state = ce),
          (b.context = R),
          (c = F))
        : (typeof b.componentDidUpdate != 'function' ||
            (T === n.memoizedProps && H === n.memoizedState) ||
            (o.flags |= 4),
          typeof b.getSnapshotBeforeUpdate != 'function' ||
            (T === n.memoizedProps && H === n.memoizedState) ||
            (o.flags |= 1024),
          (c = !1))
    }
    return Su(n, o, i, c, y, m)
  }
  function Su(n, o, i, c, m, y) {
    Eh(n, o)
    var b = (o.flags & 128) !== 0
    if (!c && !b) return (m && Rm(o, i, !1), Wn(n, o, y))
    ;((c = o.stateNode), (oC.current = o))
    var T = b && typeof i.getDerivedStateFromError != 'function' ? null : c.render()
    return (
      (o.flags |= 1),
      n !== null && b
        ? ((o.child = Fo(o, n.child, null, y)), (o.child = Fo(o, null, T, y)))
        : St(n, o, T, y),
      (o.memoizedState = c.state),
      m && Rm(o, i, !0),
      o.child
    )
  }
  function Ph(n) {
    var o = n.stateNode
    ;(o.pendingContext
      ? jm(n, o.pendingContext, o.pendingContext !== o.context)
      : o.context && jm(n, o.context, !1),
      su(n, o.containerInfo))
  }
  function Th(n, o, i, c, m) {
    return (Lo(), Zc(m), (o.flags |= 256), St(n, o, i, c), o.child)
  }
  var Cu = { dehydrated: null, treeContext: null, retryLane: 0 }
  function Eu(n) {
    return { baseLanes: n, cachePool: null, transitions: null }
  }
  function jh(n, o, i) {
    var c = o.pendingProps,
      m = ze.current,
      y = !1,
      b = (o.flags & 128) !== 0,
      T
    if (
      ((T = b) || (T = n !== null && n.memoizedState === null ? !1 : (m & 2) !== 0),
      T ? ((y = !0), (o.flags &= -129)) : (n === null || n.memoizedState !== null) && (m |= 1),
      Oe(ze, m & 1),
      n === null)
    )
      return (
        Qc(o),
        (n = o.memoizedState),
        n !== null && ((n = n.dehydrated), n !== null)
          ? ((o.mode & 1) === 0
              ? (o.lanes = 1)
              : n.data === '$!'
                ? (o.lanes = 8)
                : (o.lanes = 1073741824),
            null)
          : ((b = c.children),
            (n = c.fallback),
            y
              ? ((c = o.mode),
                (y = o.child),
                (b = { mode: 'hidden', children: b }),
                (c & 1) === 0 && y !== null
                  ? ((y.childLanes = 0), (y.pendingProps = b))
                  : (y = Qa(b, c, 0, null)),
                (n = so(n, c, i, null)),
                (y.return = o),
                (n.return = o),
                (y.sibling = n),
                (o.child = y),
                (o.child.memoizedState = Eu(i)),
                (o.memoizedState = Cu),
                n)
              : Nu(o, b))
      )
    if (((m = n.memoizedState), m !== null && ((T = m.dehydrated), T !== null)))
      return sC(n, o, b, c, T, m, i)
    if (y) {
      ;((y = c.fallback), (b = o.mode), (m = n.child), (T = m.sibling))
      var R = { mode: 'hidden', children: c.children }
      return (
        (b & 1) === 0 && o.child !== m
          ? ((c = o.child), (c.childLanes = 0), (c.pendingProps = R), (o.deletions = null))
          : ((c = Nr(m, R)), (c.subtreeFlags = m.subtreeFlags & 14680064)),
        T !== null ? (y = Nr(T, y)) : ((y = so(y, b, i, null)), (y.flags |= 2)),
        (y.return = o),
        (c.return = o),
        (c.sibling = y),
        (o.child = c),
        (c = y),
        (y = o.child),
        (b = n.child.memoizedState),
        (b =
          b === null
            ? Eu(i)
            : { baseLanes: b.baseLanes | i, cachePool: null, transitions: b.transitions }),
        (y.memoizedState = b),
        (y.childLanes = n.childLanes & ~i),
        (o.memoizedState = Cu),
        c
      )
    }
    return (
      (y = n.child),
      (n = y.sibling),
      (c = Nr(y, { mode: 'visible', children: c.children })),
      (o.mode & 1) === 0 && (c.lanes = i),
      (c.return = o),
      (c.sibling = null),
      n !== null &&
        ((i = o.deletions), i === null ? ((o.deletions = [n]), (o.flags |= 16)) : i.push(n)),
      (o.child = c),
      (o.memoizedState = null),
      c
    )
  }
  function Nu(n, o) {
    return (
      (o = Qa({ mode: 'visible', children: o }, n.mode, 0, null)),
      (o.return = n),
      (n.child = o)
    )
  }
  function Fa(n, o, i, c) {
    return (
      c !== null && Zc(c),
      Fo(o, n.child, null, i),
      (n = Nu(o, o.pendingProps.children)),
      (n.flags |= 2),
      (o.memoizedState = null),
      n
    )
  }
  function sC(n, o, i, c, m, y, b) {
    if (i)
      return o.flags & 256
        ? ((o.flags &= -257), (c = xu(Error(r(422)))), Fa(n, o, b, c))
        : o.memoizedState !== null
          ? ((o.child = n.child), (o.flags |= 128), null)
          : ((y = c.fallback),
            (m = o.mode),
            (c = Qa({ mode: 'visible', children: c.children }, m, 0, null)),
            (y = so(y, m, b, null)),
            (y.flags |= 2),
            (c.return = o),
            (y.return = o),
            (c.sibling = y),
            (o.child = c),
            (o.mode & 1) !== 0 && Fo(o, n.child, null, b),
            (o.child.memoizedState = Eu(b)),
            (o.memoizedState = Cu),
            y)
    if ((o.mode & 1) === 0) return Fa(n, o, b, null)
    if (m.data === '$!') {
      if (((c = m.nextSibling && m.nextSibling.dataset), c)) var T = c.dgst
      return ((c = T), (y = Error(r(419))), (c = xu(y, c, void 0)), Fa(n, o, b, c))
    }
    if (((T = (b & n.childLanes) !== 0), jt || T)) {
      if (((c = st), c !== null)) {
        switch (b & -b) {
          case 4:
            m = 2
            break
          case 16:
            m = 8
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
            m = 32
            break
          case 536870912:
            m = 268435456
            break
          default:
            m = 0
        }
        ;((m = (m & (c.suspendedLanes | b)) !== 0 ? 0 : m),
          m !== 0 && m !== y.retryLane && ((y.retryLane = m), zn(n, m), fn(c, n, m, -1)))
      }
      return (zu(), (c = xu(Error(r(421)))), Fa(n, o, b, c))
    }
    return m.data === '$?'
      ? ((o.flags |= 128), (o.child = n.child), (o = yC.bind(null, n)), (m._reactRetry = o), null)
      : ((n = y.treeContext),
        (Vt = mr(m.nextSibling)),
        (Ft = o),
        (Be = !0),
        (ln = null),
        n !== null &&
          ((Xt[qt++] = Vn),
          (Xt[qt++] = Bn),
          (Xt[qt++] = qr),
          (Vn = n.id),
          (Bn = n.overflow),
          (qr = o)),
        (o = Nu(o, c.children)),
        (o.flags |= 4096),
        o)
  }
  function kh(n, o, i) {
    n.lanes |= o
    var c = n.alternate
    ;(c !== null && (c.lanes |= o), nu(n.return, o, i))
  }
  function Pu(n, o, i, c, m) {
    var y = n.memoizedState
    y === null
      ? (n.memoizedState = {
          isBackwards: o,
          rendering: null,
          renderingStartTime: 0,
          last: c,
          tail: i,
          tailMode: m,
        })
      : ((y.isBackwards = o),
        (y.rendering = null),
        (y.renderingStartTime = 0),
        (y.last = c),
        (y.tail = i),
        (y.tailMode = m))
  }
  function Rh(n, o, i) {
    var c = o.pendingProps,
      m = c.revealOrder,
      y = c.tail
    if ((St(n, o, c.children, i), (c = ze.current), (c & 2) !== 0))
      ((c = (c & 1) | 2), (o.flags |= 128))
    else {
      if (n !== null && (n.flags & 128) !== 0)
        e: for (n = o.child; n !== null; ) {
          if (n.tag === 13) n.memoizedState !== null && kh(n, i, o)
          else if (n.tag === 19) kh(n, i, o)
          else if (n.child !== null) {
            ;((n.child.return = n), (n = n.child))
            continue
          }
          if (n === o) break e
          for (; n.sibling === null; ) {
            if (n.return === null || n.return === o) break e
            n = n.return
          }
          ;((n.sibling.return = n.return), (n = n.sibling))
        }
      c &= 1
    }
    if ((Oe(ze, c), (o.mode & 1) === 0)) o.memoizedState = null
    else
      switch (m) {
        case 'forwards':
          for (i = o.child, m = null; i !== null; )
            ((n = i.alternate), n !== null && Aa(n) === null && (m = i), (i = i.sibling))
          ;((i = m),
            i === null ? ((m = o.child), (o.child = null)) : ((m = i.sibling), (i.sibling = null)),
            Pu(o, !1, m, i, y))
          break
        case 'backwards':
          for (i = null, m = o.child, o.child = null; m !== null; ) {
            if (((n = m.alternate), n !== null && Aa(n) === null)) {
              o.child = m
              break
            }
            ;((n = m.sibling), (m.sibling = i), (i = m), (m = n))
          }
          Pu(o, !0, i, null, y)
          break
        case 'together':
          Pu(o, !1, null, null, void 0)
          break
        default:
          o.memoizedState = null
      }
    return o.child
  }
  function Va(n, o) {
    ;(o.mode & 1) === 0 &&
      n !== null &&
      ((n.alternate = null), (o.alternate = null), (o.flags |= 2))
  }
  function Wn(n, o, i) {
    if (
      (n !== null && (o.dependencies = n.dependencies), (to |= o.lanes), (i & o.childLanes) === 0)
    )
      return null
    if (n !== null && o.child !== n.child) throw Error(r(153))
    if (o.child !== null) {
      for (n = o.child, i = Nr(n, n.pendingProps), o.child = i, i.return = o; n.sibling !== null; )
        ((n = n.sibling), (i = i.sibling = Nr(n, n.pendingProps)), (i.return = o))
      i.sibling = null
    }
    return o.child
  }
  function iC(n, o, i) {
    switch (o.tag) {
      case 3:
        ;(Ph(o), Lo())
        break
      case 5:
        Um(o)
        break
      case 1:
        Tt(o.type) && ba(o)
        break
      case 4:
        su(o, o.stateNode.containerInfo)
        break
      case 10:
        var c = o.type._context,
          m = o.memoizedProps.value
        ;(Oe(Ta, c._currentValue), (c._currentValue = m))
        break
      case 13:
        if (((c = o.memoizedState), c !== null))
          return c.dehydrated !== null
            ? (Oe(ze, ze.current & 1), (o.flags |= 128), null)
            : (i & o.child.childLanes) !== 0
              ? jh(n, o, i)
              : (Oe(ze, ze.current & 1), (n = Wn(n, o, i)), n !== null ? n.sibling : null)
        Oe(ze, ze.current & 1)
        break
      case 19:
        if (((c = (i & o.childLanes) !== 0), (n.flags & 128) !== 0)) {
          if (c) return Rh(n, o, i)
          o.flags |= 128
        }
        if (
          ((m = o.memoizedState),
          m !== null && ((m.rendering = null), (m.tail = null), (m.lastEffect = null)),
          Oe(ze, ze.current),
          c)
        )
          break
        return null
      case 22:
      case 23:
        return ((o.lanes = 0), Ch(n, o, i))
    }
    return Wn(n, o, i)
  }
  var Ah, Tu, Mh, _h
  ;((Ah = function (n, o) {
    for (var i = o.child; i !== null; ) {
      if (i.tag === 5 || i.tag === 6) n.appendChild(i.stateNode)
      else if (i.tag !== 4 && i.child !== null) {
        ;((i.child.return = i), (i = i.child))
        continue
      }
      if (i === o) break
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === o) return
        i = i.return
      }
      ;((i.sibling.return = i.return), (i = i.sibling))
    }
  }),
    (Tu = function () {}),
    (Mh = function (n, o, i, c) {
      var m = n.memoizedProps
      if (m !== c) {
        ;((n = o.stateNode), Jr(wn.current))
        var y = null
        switch (i) {
          case 'input':
            ;((m = bt(n, m)), (c = bt(n, c)), (y = []))
            break
          case 'select':
            ;((m = U({}, m, { value: void 0 })), (c = U({}, c, { value: void 0 })), (y = []))
            break
          case 'textarea':
            ;((m = lt(n, m)), (c = lt(n, c)), (y = []))
            break
          default:
            typeof m.onClick != 'function' && typeof c.onClick == 'function' && (n.onclick = ya)
        }
        Eo(i, c)
        var b
        i = null
        for (F in m)
          if (!c.hasOwnProperty(F) && m.hasOwnProperty(F) && m[F] != null)
            if (F === 'style') {
              var T = m[F]
              for (b in T) T.hasOwnProperty(b) && (i || (i = {}), (i[b] = ''))
            } else
              F !== 'dangerouslySetInnerHTML' &&
                F !== 'children' &&
                F !== 'suppressContentEditableWarning' &&
                F !== 'suppressHydrationWarning' &&
                F !== 'autoFocus' &&
                (a.hasOwnProperty(F) ? y || (y = []) : (y = y || []).push(F, null))
        for (F in c) {
          var R = c[F]
          if (((T = m?.[F]), c.hasOwnProperty(F) && R !== T && (R != null || T != null)))
            if (F === 'style')
              if (T) {
                for (b in T)
                  !T.hasOwnProperty(b) || (R && R.hasOwnProperty(b)) || (i || (i = {}), (i[b] = ''))
                for (b in R) R.hasOwnProperty(b) && T[b] !== R[b] && (i || (i = {}), (i[b] = R[b]))
              } else (i || (y || (y = []), y.push(F, i)), (i = R))
            else
              F === 'dangerouslySetInnerHTML'
                ? ((R = R ? R.__html : void 0),
                  (T = T ? T.__html : void 0),
                  R != null && T !== R && (y = y || []).push(F, R))
                : F === 'children'
                  ? (typeof R != 'string' && typeof R != 'number') || (y = y || []).push(F, '' + R)
                  : F !== 'suppressContentEditableWarning' &&
                    F !== 'suppressHydrationWarning' &&
                    (a.hasOwnProperty(F)
                      ? (R != null && F === 'onScroll' && Le('scroll', n), y || T === R || (y = []))
                      : (y = y || []).push(F, R))
        }
        i && (y = y || []).push('style', i)
        var F = y
        ;(o.updateQueue = F) && (o.flags |= 4)
      }
    }),
    (_h = function (n, o, i, c) {
      i !== c && (o.flags |= 4)
    }))
  function Js(n, o) {
    if (!Be)
      switch (n.tailMode) {
        case 'hidden':
          o = n.tail
          for (var i = null; o !== null; ) (o.alternate !== null && (i = o), (o = o.sibling))
          i === null ? (n.tail = null) : (i.sibling = null)
          break
        case 'collapsed':
          i = n.tail
          for (var c = null; i !== null; ) (i.alternate !== null && (c = i), (i = i.sibling))
          c === null
            ? o || n.tail === null
              ? (n.tail = null)
              : (n.tail.sibling = null)
            : (c.sibling = null)
      }
  }
  function gt(n) {
    var o = n.alternate !== null && n.alternate.child === n.child,
      i = 0,
      c = 0
    if (o)
      for (var m = n.child; m !== null; )
        ((i |= m.lanes | m.childLanes),
          (c |= m.subtreeFlags & 14680064),
          (c |= m.flags & 14680064),
          (m.return = n),
          (m = m.sibling))
    else
      for (m = n.child; m !== null; )
        ((i |= m.lanes | m.childLanes),
          (c |= m.subtreeFlags),
          (c |= m.flags),
          (m.return = n),
          (m = m.sibling))
    return ((n.subtreeFlags |= c), (n.childLanes = i), o)
  }
  function aC(n, o, i) {
    var c = o.pendingProps
    switch ((Xc(o), o.tag)) {
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
        return (gt(o), null)
      case 1:
        return (Tt(o.type) && wa(), gt(o), null)
      case 3:
        return (
          (c = o.stateNode),
          zo(),
          Fe(Pt),
          Fe(mt),
          lu(),
          c.pendingContext && ((c.context = c.pendingContext), (c.pendingContext = null)),
          (n === null || n.child === null) &&
            (Na(o)
              ? (o.flags |= 4)
              : n === null ||
                (n.memoizedState.isDehydrated && (o.flags & 256) === 0) ||
                ((o.flags |= 1024), ln !== null && (Fu(ln), (ln = null)))),
          Tu(n, o),
          gt(o),
          null
        )
      case 5:
        iu(o)
        var m = Jr(Ys.current)
        if (((i = o.type), n !== null && o.stateNode != null))
          (Mh(n, o, i, c, m), n.ref !== o.ref && ((o.flags |= 512), (o.flags |= 2097152)))
        else {
          if (!c) {
            if (o.stateNode === null) throw Error(r(166))
            return (gt(o), null)
          }
          if (((n = Jr(wn.current)), Na(o))) {
            ;((c = o.stateNode), (i = o.type))
            var y = o.memoizedProps
            switch (((c[xn] = o), (c[Ws] = y), (n = (o.mode & 1) !== 0), i)) {
              case 'dialog':
                ;(Le('cancel', c), Le('close', c))
                break
              case 'iframe':
              case 'object':
              case 'embed':
                Le('load', c)
                break
              case 'video':
              case 'audio':
                for (m = 0; m < Bs.length; m++) Le(Bs[m], c)
                break
              case 'source':
                Le('error', c)
                break
              case 'img':
              case 'image':
              case 'link':
                ;(Le('error', c), Le('load', c))
                break
              case 'details':
                Le('toggle', c)
                break
              case 'input':
                ;(er(c, y), Le('invalid', c))
                break
              case 'select':
                ;((c._wrapperState = { wasMultiple: !!y.multiple }), Le('invalid', c))
                break
              case 'textarea':
                ;(In(c, y), Le('invalid', c))
            }
            ;(Eo(i, y), (m = null))
            for (var b in y)
              if (y.hasOwnProperty(b)) {
                var T = y[b]
                b === 'children'
                  ? typeof T == 'string'
                    ? c.textContent !== T &&
                      (y.suppressHydrationWarning !== !0 && va(c.textContent, T, n),
                      (m = ['children', T]))
                    : typeof T == 'number' &&
                      c.textContent !== '' + T &&
                      (y.suppressHydrationWarning !== !0 && va(c.textContent, T, n),
                      (m = ['children', '' + T]))
                  : a.hasOwnProperty(b) && T != null && b === 'onScroll' && Le('scroll', c)
              }
            switch (i) {
              case 'input':
                ;(Te(c), ws(c, y, !0))
                break
              case 'textarea':
                ;(Te(c), Xi(c))
                break
              case 'select':
              case 'option':
                break
              default:
                typeof y.onClick == 'function' && (c.onclick = ya)
            }
            ;((c = m), (o.updateQueue = c), c !== null && (o.flags |= 4))
          } else {
            ;((b = m.nodeType === 9 ? m : m.ownerDocument),
              n === 'http://www.w3.org/1999/xhtml' && (n = Ur(i)),
              n === 'http://www.w3.org/1999/xhtml'
                ? i === 'script'
                  ? ((n = b.createElement('div')),
                    (n.innerHTML = '<script><\/script>'),
                    (n = n.removeChild(n.firstChild)))
                  : typeof c.is == 'string'
                    ? (n = b.createElement(i, { is: c.is }))
                    : ((n = b.createElement(i)),
                      i === 'select' &&
                        ((b = n), c.multiple ? (b.multiple = !0) : c.size && (b.size = c.size)))
                : (n = b.createElementNS(n, i)),
              (n[xn] = o),
              (n[Ws] = c),
              Ah(n, o, !1, !1),
              (o.stateNode = n))
            e: {
              switch (((b = Ss(i, c)), i)) {
                case 'dialog':
                  ;(Le('cancel', n), Le('close', n), (m = c))
                  break
                case 'iframe':
                case 'object':
                case 'embed':
                  ;(Le('load', n), (m = c))
                  break
                case 'video':
                case 'audio':
                  for (m = 0; m < Bs.length; m++) Le(Bs[m], n)
                  m = c
                  break
                case 'source':
                  ;(Le('error', n), (m = c))
                  break
                case 'img':
                case 'image':
                case 'link':
                  ;(Le('error', n), Le('load', n), (m = c))
                  break
                case 'details':
                  ;(Le('toggle', n), (m = c))
                  break
                case 'input':
                  ;(er(n, c), (m = bt(n, c)), Le('invalid', n))
                  break
                case 'option':
                  m = c
                  break
                case 'select':
                  ;((n._wrapperState = { wasMultiple: !!c.multiple }),
                    (m = U({}, c, { value: void 0 })),
                    Le('invalid', n))
                  break
                case 'textarea':
                  ;(In(n, c), (m = lt(n, c)), Le('invalid', n))
                  break
                default:
                  m = c
              }
              ;(Eo(i, m), (T = m))
              for (y in T)
                if (T.hasOwnProperty(y)) {
                  var R = T[y]
                  y === 'style'
                    ? Qi(n, R)
                    : y === 'dangerouslySetInnerHTML'
                      ? ((R = R ? R.__html : void 0), R != null && Co(n, R))
                      : y === 'children'
                        ? typeof R == 'string'
                          ? (i !== 'textarea' || R !== '') && Gt(n, R)
                          : typeof R == 'number' && Gt(n, '' + R)
                        : y !== 'suppressContentEditableWarning' &&
                          y !== 'suppressHydrationWarning' &&
                          y !== 'autoFocus' &&
                          (a.hasOwnProperty(y)
                            ? R != null && y === 'onScroll' && Le('scroll', n)
                            : R != null && k(n, y, R, b))
                }
              switch (i) {
                case 'input':
                  ;(Te(n), ws(n, c, !1))
                  break
                case 'textarea':
                  ;(Te(n), Xi(n))
                  break
                case 'option':
                  c.value != null && n.setAttribute('value', '' + ee(c.value))
                  break
                case 'select':
                  ;((n.multiple = !!c.multiple),
                    (y = c.value),
                    y != null
                      ? tr(n, !!c.multiple, y, !1)
                      : c.defaultValue != null && tr(n, !!c.multiple, c.defaultValue, !0))
                  break
                default:
                  typeof m.onClick == 'function' && (n.onclick = ya)
              }
              switch (i) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  c = !!c.autoFocus
                  break e
                case 'img':
                  c = !0
                  break e
                default:
                  c = !1
              }
            }
            c && (o.flags |= 4)
          }
          o.ref !== null && ((o.flags |= 512), (o.flags |= 2097152))
        }
        return (gt(o), null)
      case 6:
        if (n && o.stateNode != null) _h(n, o, n.memoizedProps, c)
        else {
          if (typeof c != 'string' && o.stateNode === null) throw Error(r(166))
          if (((i = Jr(Ys.current)), Jr(wn.current), Na(o))) {
            if (
              ((c = o.stateNode),
              (i = o.memoizedProps),
              (c[xn] = o),
              (y = c.nodeValue !== i) && ((n = Ft), n !== null))
            )
              switch (n.tag) {
                case 3:
                  va(c.nodeValue, i, (n.mode & 1) !== 0)
                  break
                case 5:
                  n.memoizedProps.suppressHydrationWarning !== !0 &&
                    va(c.nodeValue, i, (n.mode & 1) !== 0)
              }
            y && (o.flags |= 4)
          } else
            ((c = (i.nodeType === 9 ? i : i.ownerDocument).createTextNode(c)),
              (c[xn] = o),
              (o.stateNode = c))
        }
        return (gt(o), null)
      case 13:
        if (
          (Fe(ze),
          (c = o.memoizedState),
          n === null || (n.memoizedState !== null && n.memoizedState.dehydrated !== null))
        ) {
          if (Be && Vt !== null && (o.mode & 1) !== 0 && (o.flags & 128) === 0)
            (Om(), Lo(), (o.flags |= 98560), (y = !1))
          else if (((y = Na(o)), c !== null && c.dehydrated !== null)) {
            if (n === null) {
              if (!y) throw Error(r(318))
              if (((y = o.memoizedState), (y = y !== null ? y.dehydrated : null), !y))
                throw Error(r(317))
              y[xn] = o
            } else (Lo(), (o.flags & 128) === 0 && (o.memoizedState = null), (o.flags |= 4))
            ;(gt(o), (y = !1))
          } else (ln !== null && (Fu(ln), (ln = null)), (y = !0))
          if (!y) return o.flags & 65536 ? o : null
        }
        return (o.flags & 128) !== 0
          ? ((o.lanes = i), o)
          : ((c = c !== null),
            c !== (n !== null && n.memoizedState !== null) &&
              c &&
              ((o.child.flags |= 8192),
              (o.mode & 1) !== 0 &&
                (n === null || (ze.current & 1) !== 0 ? nt === 0 && (nt = 3) : zu())),
            o.updateQueue !== null && (o.flags |= 4),
            gt(o),
            null)
      case 4:
        return (zo(), Tu(n, o), n === null && zs(o.stateNode.containerInfo), gt(o), null)
      case 10:
        return (tu(o.type._context), gt(o), null)
      case 17:
        return (Tt(o.type) && wa(), gt(o), null)
      case 19:
        if ((Fe(ze), (y = o.memoizedState), y === null)) return (gt(o), null)
        if (((c = (o.flags & 128) !== 0), (b = y.rendering), b === null))
          if (c) Js(y, !1)
          else {
            if (nt !== 0 || (n !== null && (n.flags & 128) !== 0))
              for (n = o.child; n !== null; ) {
                if (((b = Aa(n)), b !== null)) {
                  for (
                    o.flags |= 128,
                      Js(y, !1),
                      c = b.updateQueue,
                      c !== null && ((o.updateQueue = c), (o.flags |= 4)),
                      o.subtreeFlags = 0,
                      c = i,
                      i = o.child;
                    i !== null;

                  )
                    ((y = i),
                      (n = c),
                      (y.flags &= 14680066),
                      (b = y.alternate),
                      b === null
                        ? ((y.childLanes = 0),
                          (y.lanes = n),
                          (y.child = null),
                          (y.subtreeFlags = 0),
                          (y.memoizedProps = null),
                          (y.memoizedState = null),
                          (y.updateQueue = null),
                          (y.dependencies = null),
                          (y.stateNode = null))
                        : ((y.childLanes = b.childLanes),
                          (y.lanes = b.lanes),
                          (y.child = b.child),
                          (y.subtreeFlags = 0),
                          (y.deletions = null),
                          (y.memoizedProps = b.memoizedProps),
                          (y.memoizedState = b.memoizedState),
                          (y.updateQueue = b.updateQueue),
                          (y.type = b.type),
                          (n = b.dependencies),
                          (y.dependencies =
                            n === null ? null : { lanes: n.lanes, firstContext: n.firstContext })),
                      (i = i.sibling))
                  return (Oe(ze, (ze.current & 1) | 2), o.child)
                }
                n = n.sibling
              }
            y.tail !== null &&
              Ke() > Ho &&
              ((o.flags |= 128), (c = !0), Js(y, !1), (o.lanes = 4194304))
          }
        else {
          if (!c)
            if (((n = Aa(b)), n !== null)) {
              if (
                ((o.flags |= 128),
                (c = !0),
                (i = n.updateQueue),
                i !== null && ((o.updateQueue = i), (o.flags |= 4)),
                Js(y, !0),
                y.tail === null && y.tailMode === 'hidden' && !b.alternate && !Be)
              )
                return (gt(o), null)
            } else
              2 * Ke() - y.renderingStartTime > Ho &&
                i !== 1073741824 &&
                ((o.flags |= 128), (c = !0), Js(y, !1), (o.lanes = 4194304))
          y.isBackwards
            ? ((b.sibling = o.child), (o.child = b))
            : ((i = y.last), i !== null ? (i.sibling = b) : (o.child = b), (y.last = b))
        }
        return y.tail !== null
          ? ((o = y.tail),
            (y.rendering = o),
            (y.tail = o.sibling),
            (y.renderingStartTime = Ke()),
            (o.sibling = null),
            (i = ze.current),
            Oe(ze, c ? (i & 1) | 2 : i & 1),
            o)
          : (gt(o), null)
      case 22:
      case 23:
        return (
          Bu(),
          (c = o.memoizedState !== null),
          n !== null && (n.memoizedState !== null) !== c && (o.flags |= 8192),
          c && (o.mode & 1) !== 0
            ? (Bt & 1073741824) !== 0 && (gt(o), o.subtreeFlags & 6 && (o.flags |= 8192))
            : gt(o),
          null
        )
      case 24:
        return null
      case 25:
        return null
    }
    throw Error(r(156, o.tag))
  }
  function lC(n, o) {
    switch ((Xc(o), o.tag)) {
      case 1:
        return (
          Tt(o.type) && wa(),
          (n = o.flags),
          n & 65536 ? ((o.flags = (n & -65537) | 128), o) : null
        )
      case 3:
        return (
          zo(),
          Fe(Pt),
          Fe(mt),
          lu(),
          (n = o.flags),
          (n & 65536) !== 0 && (n & 128) === 0 ? ((o.flags = (n & -65537) | 128), o) : null
        )
      case 5:
        return (iu(o), null)
      case 13:
        if ((Fe(ze), (n = o.memoizedState), n !== null && n.dehydrated !== null)) {
          if (o.alternate === null) throw Error(r(340))
          Lo()
        }
        return ((n = o.flags), n & 65536 ? ((o.flags = (n & -65537) | 128), o) : null)
      case 19:
        return (Fe(ze), null)
      case 4:
        return (zo(), null)
      case 10:
        return (tu(o.type._context), null)
      case 22:
      case 23:
        return (Bu(), null)
      case 24:
        return null
      default:
        return null
    }
  }
  var Ba = !1,
    vt = !1,
    cC = typeof WeakSet == 'function' ? WeakSet : Set,
    ae = null
  function Wo(n, o) {
    var i = n.ref
    if (i !== null)
      if (typeof i == 'function')
        try {
          i(null)
        } catch (c) {
          Ue(n, o, c)
        }
      else i.current = null
  }
  function ju(n, o, i) {
    try {
      i()
    } catch (c) {
      Ue(n, o, c)
    }
  }
  var Dh = !1
  function uC(n, o) {
    if (((Bc = ia), (n = fm()), Mc(n))) {
      if ('selectionStart' in n) var i = { start: n.selectionStart, end: n.selectionEnd }
      else
        e: {
          i = ((i = n.ownerDocument) && i.defaultView) || window
          var c = i.getSelection && i.getSelection()
          if (c && c.rangeCount !== 0) {
            i = c.anchorNode
            var m = c.anchorOffset,
              y = c.focusNode
            c = c.focusOffset
            try {
              ;(i.nodeType, y.nodeType)
            } catch {
              i = null
              break e
            }
            var b = 0,
              T = -1,
              R = -1,
              F = 0,
              G = 0,
              K = n,
              H = null
            t: for (;;) {
              for (
                var se;
                K !== i || (m !== 0 && K.nodeType !== 3) || (T = b + m),
                  K !== y || (c !== 0 && K.nodeType !== 3) || (R = b + c),
                  K.nodeType === 3 && (b += K.nodeValue.length),
                  (se = K.firstChild) !== null;

              )
                ((H = K), (K = se))
              for (;;) {
                if (K === n) break t
                if (
                  (H === i && ++F === m && (T = b),
                  H === y && ++G === c && (R = b),
                  (se = K.nextSibling) !== null)
                )
                  break
                ;((K = H), (H = K.parentNode))
              }
              K = se
            }
            i = T === -1 || R === -1 ? null : { start: T, end: R }
          } else i = null
        }
      i = i || { start: 0, end: 0 }
    } else i = null
    for (zc = { focusedElem: n, selectionRange: i }, ia = !1, ae = o; ae !== null; )
      if (((o = ae), (n = o.child), (o.subtreeFlags & 1028) !== 0 && n !== null))
        ((n.return = o), (ae = n))
      else
        for (; ae !== null; ) {
          o = ae
          try {
            var ce = o.alternate
            if ((o.flags & 1024) !== 0)
              switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  break
                case 1:
                  if (ce !== null) {
                    var de = ce.memoizedProps,
                      Ye = ce.memoizedState,
                      D = o.stateNode,
                      M = D.getSnapshotBeforeUpdate(
                        o.elementType === o.type ? de : cn(o.type, de),
                        Ye
                      )
                    D.__reactInternalSnapshotBeforeUpdate = M
                  }
                  break
                case 3:
                  var O = o.stateNode.containerInfo
                  O.nodeType === 1
                    ? (O.textContent = '')
                    : O.nodeType === 9 && O.documentElement && O.removeChild(O.documentElement)
                  break
                case 5:
                case 6:
                case 4:
                case 17:
                  break
                default:
                  throw Error(r(163))
              }
          } catch (Q) {
            Ue(o, o.return, Q)
          }
          if (((n = o.sibling), n !== null)) {
            ;((n.return = o.return), (ae = n))
            break
          }
          ae = o.return
        }
    return ((ce = Dh), (Dh = !1), ce)
  }
  function ei(n, o, i) {
    var c = o.updateQueue
    if (((c = c !== null ? c.lastEffect : null), c !== null)) {
      var m = (c = c.next)
      do {
        if ((m.tag & n) === n) {
          var y = m.destroy
          ;((m.destroy = void 0), y !== void 0 && ju(o, i, y))
        }
        m = m.next
      } while (m !== c)
    }
  }
  function za(n, o) {
    if (((o = o.updateQueue), (o = o !== null ? o.lastEffect : null), o !== null)) {
      var i = (o = o.next)
      do {
        if ((i.tag & n) === n) {
          var c = i.create
          i.destroy = c()
        }
        i = i.next
      } while (i !== o)
    }
  }
  function ku(n) {
    var o = n.ref
    if (o !== null) {
      var i = n.stateNode
      ;(n.tag, (n = i), typeof o == 'function' ? o(n) : (o.current = n))
    }
  }
  function Ih(n) {
    var o = n.alternate
    ;(o !== null && ((n.alternate = null), Ih(o)),
      (n.child = null),
      (n.deletions = null),
      (n.sibling = null),
      n.tag === 5 &&
        ((o = n.stateNode),
        o !== null && (delete o[xn], delete o[Ws], delete o[Hc], delete o[GS], delete o[KS])),
      (n.stateNode = null),
      (n.return = null),
      (n.dependencies = null),
      (n.memoizedProps = null),
      (n.memoizedState = null),
      (n.pendingProps = null),
      (n.stateNode = null),
      (n.updateQueue = null))
  }
  function Oh(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4
  }
  function Lh(n) {
    e: for (;;) {
      for (; n.sibling === null; ) {
        if (n.return === null || Oh(n.return)) return null
        n = n.return
      }
      for (
        n.sibling.return = n.return, n = n.sibling;
        n.tag !== 5 && n.tag !== 6 && n.tag !== 18;

      ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e
        ;((n.child.return = n), (n = n.child))
      }
      if (!(n.flags & 2)) return n.stateNode
    }
  }
  function Ru(n, o, i) {
    var c = n.tag
    if (c === 5 || c === 6)
      ((n = n.stateNode),
        o
          ? i.nodeType === 8
            ? i.parentNode.insertBefore(n, o)
            : i.insertBefore(n, o)
          : (i.nodeType === 8
              ? ((o = i.parentNode), o.insertBefore(n, i))
              : ((o = i), o.appendChild(n)),
            (i = i._reactRootContainer),
            i != null || o.onclick !== null || (o.onclick = ya)))
    else if (c !== 4 && ((n = n.child), n !== null))
      for (Ru(n, o, i), n = n.sibling; n !== null; ) (Ru(n, o, i), (n = n.sibling))
  }
  function Au(n, o, i) {
    var c = n.tag
    if (c === 5 || c === 6) ((n = n.stateNode), o ? i.insertBefore(n, o) : i.appendChild(n))
    else if (c !== 4 && ((n = n.child), n !== null))
      for (Au(n, o, i), n = n.sibling; n !== null; ) (Au(n, o, i), (n = n.sibling))
  }
  var ut = null,
    un = !1
  function wr(n, o, i) {
    for (i = i.child; i !== null; ) (Fh(n, o, i), (i = i.sibling))
  }
  function Fh(n, o, i) {
    if (yn && typeof yn.onCommitFiberUnmount == 'function')
      try {
        yn.onCommitFiberUnmount(ea, i)
      } catch {}
    switch (i.tag) {
      case 5:
        vt || Wo(i, o)
      case 6:
        var c = ut,
          m = un
        ;((ut = null),
          wr(n, o, i),
          (ut = c),
          (un = m),
          ut !== null &&
            (un
              ? ((n = ut),
                (i = i.stateNode),
                n.nodeType === 8 ? n.parentNode.removeChild(i) : n.removeChild(i))
              : ut.removeChild(i.stateNode)))
        break
      case 18:
        ut !== null &&
          (un
            ? ((n = ut),
              (i = i.stateNode),
              n.nodeType === 8 ? Uc(n.parentNode, i) : n.nodeType === 1 && Uc(n, i),
              Ms(n))
            : Uc(ut, i.stateNode))
        break
      case 4:
        ;((c = ut),
          (m = un),
          (ut = i.stateNode.containerInfo),
          (un = !0),
          wr(n, o, i),
          (ut = c),
          (un = m))
        break
      case 0:
      case 11:
      case 14:
      case 15:
        if (!vt && ((c = i.updateQueue), c !== null && ((c = c.lastEffect), c !== null))) {
          m = c = c.next
          do {
            var y = m,
              b = y.destroy
            ;((y = y.tag),
              b !== void 0 && ((y & 2) !== 0 || (y & 4) !== 0) && ju(i, o, b),
              (m = m.next))
          } while (m !== c)
        }
        wr(n, o, i)
        break
      case 1:
        if (!vt && (Wo(i, o), (c = i.stateNode), typeof c.componentWillUnmount == 'function'))
          try {
            ;((c.props = i.memoizedProps), (c.state = i.memoizedState), c.componentWillUnmount())
          } catch (T) {
            Ue(i, o, T)
          }
        wr(n, o, i)
        break
      case 21:
        wr(n, o, i)
        break
      case 22:
        i.mode & 1
          ? ((vt = (c = vt) || i.memoizedState !== null), wr(n, o, i), (vt = c))
          : wr(n, o, i)
        break
      default:
        wr(n, o, i)
    }
  }
  function Vh(n) {
    var o = n.updateQueue
    if (o !== null) {
      n.updateQueue = null
      var i = n.stateNode
      ;(i === null && (i = n.stateNode = new cC()),
        o.forEach(function (c) {
          var m = xC.bind(null, n, c)
          i.has(c) || (i.add(c), c.then(m, m))
        }))
    }
  }
  function dn(n, o) {
    var i = o.deletions
    if (i !== null)
      for (var c = 0; c < i.length; c++) {
        var m = i[c]
        try {
          var y = n,
            b = o,
            T = b
          e: for (; T !== null; ) {
            switch (T.tag) {
              case 5:
                ;((ut = T.stateNode), (un = !1))
                break e
              case 3:
                ;((ut = T.stateNode.containerInfo), (un = !0))
                break e
              case 4:
                ;((ut = T.stateNode.containerInfo), (un = !0))
                break e
            }
            T = T.return
          }
          if (ut === null) throw Error(r(160))
          ;(Fh(y, b, m), (ut = null), (un = !1))
          var R = m.alternate
          ;(R !== null && (R.return = null), (m.return = null))
        } catch (F) {
          Ue(m, o, F)
        }
      }
    if (o.subtreeFlags & 12854) for (o = o.child; o !== null; ) (Bh(o, n), (o = o.sibling))
  }
  function Bh(n, o) {
    var i = n.alternate,
      c = n.flags
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((dn(o, n), Sn(n), c & 4)) {
          try {
            ;(ei(3, n, n.return), za(3, n))
          } catch (de) {
            Ue(n, n.return, de)
          }
          try {
            ei(5, n, n.return)
          } catch (de) {
            Ue(n, n.return, de)
          }
        }
        break
      case 1:
        ;(dn(o, n), Sn(n), c & 512 && i !== null && Wo(i, i.return))
        break
      case 5:
        if ((dn(o, n), Sn(n), c & 512 && i !== null && Wo(i, i.return), n.flags & 32)) {
          var m = n.stateNode
          try {
            Gt(m, '')
          } catch (de) {
            Ue(n, n.return, de)
          }
        }
        if (c & 4 && ((m = n.stateNode), m != null)) {
          var y = n.memoizedProps,
            b = i !== null ? i.memoizedProps : y,
            T = n.type,
            R = n.updateQueue
          if (((n.updateQueue = null), R !== null))
            try {
              ;(T === 'input' && y.type === 'radio' && y.name != null && Dn(m, y), Ss(T, b))
              var F = Ss(T, y)
              for (b = 0; b < R.length; b += 2) {
                var G = R[b],
                  K = R[b + 1]
                G === 'style'
                  ? Qi(m, K)
                  : G === 'dangerouslySetInnerHTML'
                    ? Co(m, K)
                    : G === 'children'
                      ? Gt(m, K)
                      : k(m, G, K, F)
              }
              switch (T) {
                case 'input':
                  Dt(m, y)
                  break
                case 'textarea':
                  Yi(m, y)
                  break
                case 'select':
                  var H = m._wrapperState.wasMultiple
                  m._wrapperState.wasMultiple = !!y.multiple
                  var se = y.value
                  se != null
                    ? tr(m, !!y.multiple, se, !1)
                    : H !== !!y.multiple &&
                      (y.defaultValue != null
                        ? tr(m, !!y.multiple, y.defaultValue, !0)
                        : tr(m, !!y.multiple, y.multiple ? [] : '', !1))
              }
              m[Ws] = y
            } catch (de) {
              Ue(n, n.return, de)
            }
        }
        break
      case 6:
        if ((dn(o, n), Sn(n), c & 4)) {
          if (n.stateNode === null) throw Error(r(162))
          ;((m = n.stateNode), (y = n.memoizedProps))
          try {
            m.nodeValue = y
          } catch (de) {
            Ue(n, n.return, de)
          }
        }
        break
      case 3:
        if ((dn(o, n), Sn(n), c & 4 && i !== null && i.memoizedState.isDehydrated))
          try {
            Ms(o.containerInfo)
          } catch (de) {
            Ue(n, n.return, de)
          }
        break
      case 4:
        ;(dn(o, n), Sn(n))
        break
      case 13:
        ;(dn(o, n),
          Sn(n),
          (m = n.child),
          m.flags & 8192 &&
            ((y = m.memoizedState !== null),
            (m.stateNode.isHidden = y),
            !y || (m.alternate !== null && m.alternate.memoizedState !== null) || (Du = Ke())),
          c & 4 && Vh(n))
        break
      case 22:
        if (
          ((G = i !== null && i.memoizedState !== null),
          n.mode & 1 ? ((vt = (F = vt) || G), dn(o, n), (vt = F)) : dn(o, n),
          Sn(n),
          c & 8192)
        ) {
          if (
            ((F = n.memoizedState !== null), (n.stateNode.isHidden = F) && !G && (n.mode & 1) !== 0)
          )
            for (ae = n, G = n.child; G !== null; ) {
              for (K = ae = G; ae !== null; ) {
                switch (((H = ae), (se = H.child), H.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ei(4, H, H.return)
                    break
                  case 1:
                    Wo(H, H.return)
                    var ce = H.stateNode
                    if (typeof ce.componentWillUnmount == 'function') {
                      ;((c = H), (i = H.return))
                      try {
                        ;((o = c),
                          (ce.props = o.memoizedProps),
                          (ce.state = o.memoizedState),
                          ce.componentWillUnmount())
                      } catch (de) {
                        Ue(c, i, de)
                      }
                    }
                    break
                  case 5:
                    Wo(H, H.return)
                    break
                  case 22:
                    if (H.memoizedState !== null) {
                      Wh(K)
                      continue
                    }
                }
                se !== null ? ((se.return = H), (ae = se)) : Wh(K)
              }
              G = G.sibling
            }
          e: for (G = null, K = n; ; ) {
            if (K.tag === 5) {
              if (G === null) {
                G = K
                try {
                  ;((m = K.stateNode),
                    F
                      ? ((y = m.style),
                        typeof y.setProperty == 'function'
                          ? y.setProperty('display', 'none', 'important')
                          : (y.display = 'none'))
                      : ((T = K.stateNode),
                        (R = K.memoizedProps.style),
                        (b = R != null && R.hasOwnProperty('display') ? R.display : null),
                        (T.style.display = qi('display', b))))
                } catch (de) {
                  Ue(n, n.return, de)
                }
              }
            } else if (K.tag === 6) {
              if (G === null)
                try {
                  K.stateNode.nodeValue = F ? '' : K.memoizedProps
                } catch (de) {
                  Ue(n, n.return, de)
                }
            } else if (
              ((K.tag !== 22 && K.tag !== 23) || K.memoizedState === null || K === n) &&
              K.child !== null
            ) {
              ;((K.child.return = K), (K = K.child))
              continue
            }
            if (K === n) break e
            for (; K.sibling === null; ) {
              if (K.return === null || K.return === n) break e
              ;(G === K && (G = null), (K = K.return))
            }
            ;(G === K && (G = null), (K.sibling.return = K.return), (K = K.sibling))
          }
        }
        break
      case 19:
        ;(dn(o, n), Sn(n), c & 4 && Vh(n))
        break
      case 21:
        break
      default:
        ;(dn(o, n), Sn(n))
    }
  }
  function Sn(n) {
    var o = n.flags
    if (o & 2) {
      try {
        e: {
          for (var i = n.return; i !== null; ) {
            if (Oh(i)) {
              var c = i
              break e
            }
            i = i.return
          }
          throw Error(r(160))
        }
        switch (c.tag) {
          case 5:
            var m = c.stateNode
            c.flags & 32 && (Gt(m, ''), (c.flags &= -33))
            var y = Lh(n)
            Au(n, y, m)
            break
          case 3:
          case 4:
            var b = c.stateNode.containerInfo,
              T = Lh(n)
            Ru(n, T, b)
            break
          default:
            throw Error(r(161))
        }
      } catch (R) {
        Ue(n, n.return, R)
      }
      n.flags &= -3
    }
    o & 4096 && (n.flags &= -4097)
  }
  function dC(n, o, i) {
    ;((ae = n), zh(n))
  }
  function zh(n, o, i) {
    for (var c = (n.mode & 1) !== 0; ae !== null; ) {
      var m = ae,
        y = m.child
      if (m.tag === 22 && c) {
        var b = m.memoizedState !== null || Ba
        if (!b) {
          var T = m.alternate,
            R = (T !== null && T.memoizedState !== null) || vt
          T = Ba
          var F = vt
          if (((Ba = b), (vt = R) && !F))
            for (ae = m; ae !== null; )
              ((b = ae),
                (R = b.child),
                b.tag === 22 && b.memoizedState !== null
                  ? Uh(m)
                  : R !== null
                    ? ((R.return = b), (ae = R))
                    : Uh(m))
          for (; y !== null; ) ((ae = y), zh(y), (y = y.sibling))
          ;((ae = m), (Ba = T), (vt = F))
        }
        $h(n)
      } else (m.subtreeFlags & 8772) !== 0 && y !== null ? ((y.return = m), (ae = y)) : $h(n)
    }
  }
  function $h(n) {
    for (; ae !== null; ) {
      var o = ae
      if ((o.flags & 8772) !== 0) {
        var i = o.alternate
        try {
          if ((o.flags & 8772) !== 0)
            switch (o.tag) {
              case 0:
              case 11:
              case 15:
                vt || za(5, o)
                break
              case 1:
                var c = o.stateNode
                if (o.flags & 4 && !vt)
                  if (i === null) c.componentDidMount()
                  else {
                    var m = o.elementType === o.type ? i.memoizedProps : cn(o.type, i.memoizedProps)
                    c.componentDidUpdate(m, i.memoizedState, c.__reactInternalSnapshotBeforeUpdate)
                  }
                var y = o.updateQueue
                y !== null && Wm(o, y, c)
                break
              case 3:
                var b = o.updateQueue
                if (b !== null) {
                  if (((i = null), o.child !== null))
                    switch (o.child.tag) {
                      case 5:
                        i = o.child.stateNode
                        break
                      case 1:
                        i = o.child.stateNode
                    }
                  Wm(o, b, i)
                }
                break
              case 5:
                var T = o.stateNode
                if (i === null && o.flags & 4) {
                  i = T
                  var R = o.memoizedProps
                  switch (o.type) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      R.autoFocus && i.focus()
                      break
                    case 'img':
                      R.src && (i.src = R.src)
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
                if (o.memoizedState === null) {
                  var F = o.alternate
                  if (F !== null) {
                    var G = F.memoizedState
                    if (G !== null) {
                      var K = G.dehydrated
                      K !== null && Ms(K)
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
                throw Error(r(163))
            }
          vt || (o.flags & 512 && ku(o))
        } catch (H) {
          Ue(o, o.return, H)
        }
      }
      if (o === n) {
        ae = null
        break
      }
      if (((i = o.sibling), i !== null)) {
        ;((i.return = o.return), (ae = i))
        break
      }
      ae = o.return
    }
  }
  function Wh(n) {
    for (; ae !== null; ) {
      var o = ae
      if (o === n) {
        ae = null
        break
      }
      var i = o.sibling
      if (i !== null) {
        ;((i.return = o.return), (ae = i))
        break
      }
      ae = o.return
    }
  }
  function Uh(n) {
    for (; ae !== null; ) {
      var o = ae
      try {
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            var i = o.return
            try {
              za(4, o)
            } catch (R) {
              Ue(o, i, R)
            }
            break
          case 1:
            var c = o.stateNode
            if (typeof c.componentDidMount == 'function') {
              var m = o.return
              try {
                c.componentDidMount()
              } catch (R) {
                Ue(o, m, R)
              }
            }
            var y = o.return
            try {
              ku(o)
            } catch (R) {
              Ue(o, y, R)
            }
            break
          case 5:
            var b = o.return
            try {
              ku(o)
            } catch (R) {
              Ue(o, b, R)
            }
        }
      } catch (R) {
        Ue(o, o.return, R)
      }
      if (o === n) {
        ae = null
        break
      }
      var T = o.sibling
      if (T !== null) {
        ;((T.return = o.return), (ae = T))
        break
      }
      ae = o.return
    }
  }
  var fC = Math.ceil,
    $a = _.ReactCurrentDispatcher,
    Mu = _.ReactCurrentOwner,
    Jt = _.ReactCurrentBatchConfig,
    je = 0,
    st = null,
    Ze = null,
    dt = 0,
    Bt = 0,
    Uo = hr(0),
    nt = 0,
    ti = null,
    to = 0,
    Wa = 0,
    _u = 0,
    ni = null,
    kt = null,
    Du = 0,
    Ho = 1 / 0,
    Un = null,
    Ua = !1,
    Iu = null,
    br = null,
    Ha = !1,
    Sr = null,
    Ga = 0,
    ri = 0,
    Ou = null,
    Ka = -1,
    Ya = 0
  function Ct() {
    return (je & 6) !== 0 ? Ke() : Ka !== -1 ? Ka : (Ka = Ke())
  }
  function Cr(n) {
    return (n.mode & 1) === 0
      ? 1
      : (je & 2) !== 0 && dt !== 0
        ? dt & -dt
        : XS.transition !== null
          ? (Ya === 0 && (Ya = Lp()), Ya)
          : ((n = De), n !== 0 || ((n = window.event), (n = n === void 0 ? 16 : Gp(n.type))), n)
  }
  function fn(n, o, i, c) {
    if (50 < ri) throw ((ri = 0), (Ou = null), Error(r(185)))
    ;(Ts(n, i, c),
      ((je & 2) === 0 || n !== st) &&
        (n === st && ((je & 2) === 0 && (Wa |= i), nt === 4 && Er(n, dt)),
        Rt(n, c),
        i === 1 && je === 0 && (o.mode & 1) === 0 && ((Ho = Ke() + 500), Sa && vr())))
  }
  function Rt(n, o) {
    var i = n.callbackNode
    X1(n, o)
    var c = ra(n, n === st ? dt : 0)
    if (c === 0) (i !== null && Dp(i), (n.callbackNode = null), (n.callbackPriority = 0))
    else if (((o = c & -c), n.callbackPriority !== o)) {
      if ((i != null && Dp(i), o === 1))
        (n.tag === 0 ? YS(Gh.bind(null, n)) : Am(Gh.bind(null, n)),
          US(function () {
            ;(je & 6) === 0 && vr()
          }),
          (i = null))
      else {
        switch (Fp(c)) {
          case 1:
            i = hc
            break
          case 4:
            i = Ip
            break
          case 16:
            i = Ji
            break
          case 536870912:
            i = Op
            break
          default:
            i = Ji
        }
        i = eg(i, Hh.bind(null, n))
      }
      ;((n.callbackPriority = o), (n.callbackNode = i))
    }
  }
  function Hh(n, o) {
    if (((Ka = -1), (Ya = 0), (je & 6) !== 0)) throw Error(r(327))
    var i = n.callbackNode
    if (Go() && n.callbackNode !== i) return null
    var c = ra(n, n === st ? dt : 0)
    if (c === 0) return null
    if ((c & 30) !== 0 || (c & n.expiredLanes) !== 0 || o) o = Xa(n, c)
    else {
      o = c
      var m = je
      je |= 2
      var y = Yh()
      ;(st !== n || dt !== o) && ((Un = null), (Ho = Ke() + 500), ro(n, o))
      do
        try {
          hC()
          break
        } catch (T) {
          Kh(n, T)
        }
      while (!0)
      ;(eu(), ($a.current = y), (je = m), Ze !== null ? (o = 0) : ((st = null), (dt = 0), (o = nt)))
    }
    if (o !== 0) {
      if ((o === 2 && ((m = gc(n)), m !== 0 && ((c = m), (o = Lu(n, m)))), o === 1))
        throw ((i = ti), ro(n, 0), Er(n, c), Rt(n, Ke()), i)
      if (o === 6) Er(n, c)
      else {
        if (
          ((m = n.current.alternate),
          (c & 30) === 0 &&
            !pC(m) &&
            ((o = Xa(n, c)),
            o === 2 && ((y = gc(n)), y !== 0 && ((c = y), (o = Lu(n, y)))),
            o === 1))
        )
          throw ((i = ti), ro(n, 0), Er(n, c), Rt(n, Ke()), i)
        switch (((n.finishedWork = m), (n.finishedLanes = c), o)) {
          case 0:
          case 1:
            throw Error(r(345))
          case 2:
            oo(n, kt, Un)
            break
          case 3:
            if ((Er(n, c), (c & 130023424) === c && ((o = Du + 500 - Ke()), 10 < o))) {
              if (ra(n, 0) !== 0) break
              if (((m = n.suspendedLanes), (m & c) !== c)) {
                ;(Ct(), (n.pingedLanes |= n.suspendedLanes & m))
                break
              }
              n.timeoutHandle = Wc(oo.bind(null, n, kt, Un), o)
              break
            }
            oo(n, kt, Un)
            break
          case 4:
            if ((Er(n, c), (c & 4194240) === c)) break
            for (o = n.eventTimes, m = -1; 0 < c; ) {
              var b = 31 - sn(c)
              ;((y = 1 << b), (b = o[b]), b > m && (m = b), (c &= ~y))
            }
            if (
              ((c = m),
              (c = Ke() - c),
              (c =
                (120 > c
                  ? 120
                  : 480 > c
                    ? 480
                    : 1080 > c
                      ? 1080
                      : 1920 > c
                        ? 1920
                        : 3e3 > c
                          ? 3e3
                          : 4320 > c
                            ? 4320
                            : 1960 * fC(c / 1960)) - c),
              10 < c)
            ) {
              n.timeoutHandle = Wc(oo.bind(null, n, kt, Un), c)
              break
            }
            oo(n, kt, Un)
            break
          case 5:
            oo(n, kt, Un)
            break
          default:
            throw Error(r(329))
        }
      }
    }
    return (Rt(n, Ke()), n.callbackNode === i ? Hh.bind(null, n) : null)
  }
  function Lu(n, o) {
    var i = ni
    return (
      n.current.memoizedState.isDehydrated && (ro(n, o).flags |= 256),
      (n = Xa(n, o)),
      n !== 2 && ((o = kt), (kt = i), o !== null && Fu(o)),
      n
    )
  }
  function Fu(n) {
    kt === null ? (kt = n) : kt.push.apply(kt, n)
  }
  function pC(n) {
    for (var o = n; ; ) {
      if (o.flags & 16384) {
        var i = o.updateQueue
        if (i !== null && ((i = i.stores), i !== null))
          for (var c = 0; c < i.length; c++) {
            var m = i[c],
              y = m.getSnapshot
            m = m.value
            try {
              if (!an(y(), m)) return !1
            } catch {
              return !1
            }
          }
      }
      if (((i = o.child), o.subtreeFlags & 16384 && i !== null)) ((i.return = o), (o = i))
      else {
        if (o === n) break
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === n) return !0
          o = o.return
        }
        ;((o.sibling.return = o.return), (o = o.sibling))
      }
    }
    return !0
  }
  function Er(n, o) {
    for (
      o &= ~_u, o &= ~Wa, n.suspendedLanes |= o, n.pingedLanes &= ~o, n = n.expirationTimes;
      0 < o;

    ) {
      var i = 31 - sn(o),
        c = 1 << i
      ;((n[i] = -1), (o &= ~c))
    }
  }
  function Gh(n) {
    if ((je & 6) !== 0) throw Error(r(327))
    Go()
    var o = ra(n, 0)
    if ((o & 1) === 0) return (Rt(n, Ke()), null)
    var i = Xa(n, o)
    if (n.tag !== 0 && i === 2) {
      var c = gc(n)
      c !== 0 && ((o = c), (i = Lu(n, c)))
    }
    if (i === 1) throw ((i = ti), ro(n, 0), Er(n, o), Rt(n, Ke()), i)
    if (i === 6) throw Error(r(345))
    return (
      (n.finishedWork = n.current.alternate),
      (n.finishedLanes = o),
      oo(n, kt, Un),
      Rt(n, Ke()),
      null
    )
  }
  function Vu(n, o) {
    var i = je
    je |= 1
    try {
      return n(o)
    } finally {
      ;((je = i), je === 0 && ((Ho = Ke() + 500), Sa && vr()))
    }
  }
  function no(n) {
    Sr !== null && Sr.tag === 0 && (je & 6) === 0 && Go()
    var o = je
    je |= 1
    var i = Jt.transition,
      c = De
    try {
      if (((Jt.transition = null), (De = 1), n)) return n()
    } finally {
      ;((De = c), (Jt.transition = i), (je = o), (je & 6) === 0 && vr())
    }
  }
  function Bu() {
    ;((Bt = Uo.current), Fe(Uo))
  }
  function ro(n, o) {
    ;((n.finishedWork = null), (n.finishedLanes = 0))
    var i = n.timeoutHandle
    if ((i !== -1 && ((n.timeoutHandle = -1), WS(i)), Ze !== null))
      for (i = Ze.return; i !== null; ) {
        var c = i
        switch ((Xc(c), c.tag)) {
          case 1:
            ;((c = c.type.childContextTypes), c != null && wa())
            break
          case 3:
            ;(zo(), Fe(Pt), Fe(mt), lu())
            break
          case 5:
            iu(c)
            break
          case 4:
            zo()
            break
          case 13:
            Fe(ze)
            break
          case 19:
            Fe(ze)
            break
          case 10:
            tu(c.type._context)
            break
          case 22:
          case 23:
            Bu()
        }
        i = i.return
      }
    if (
      ((st = n),
      (Ze = n = Nr(n.current, null)),
      (dt = Bt = o),
      (nt = 0),
      (ti = null),
      (_u = Wa = to = 0),
      (kt = ni = null),
      Zr !== null)
    ) {
      for (o = 0; o < Zr.length; o++)
        if (((i = Zr[o]), (c = i.interleaved), c !== null)) {
          i.interleaved = null
          var m = c.next,
            y = i.pending
          if (y !== null) {
            var b = y.next
            ;((y.next = m), (c.next = b))
          }
          i.pending = c
        }
      Zr = null
    }
    return n
  }
  function Kh(n, o) {
    do {
      var i = Ze
      try {
        if ((eu(), (Ma.current = Oa), _a)) {
          for (var c = $e.memoizedState; c !== null; ) {
            var m = c.queue
            ;(m !== null && (m.pending = null), (c = c.next))
          }
          _a = !1
        }
        if (
          ((eo = 0),
          (ot = tt = $e = null),
          (Xs = !1),
          (qs = 0),
          (Mu.current = null),
          i === null || i.return === null)
        ) {
          ;((nt = 1), (ti = o), (Ze = null))
          break
        }
        e: {
          var y = n,
            b = i.return,
            T = i,
            R = o
          if (
            ((o = dt),
            (T.flags |= 32768),
            R !== null && typeof R == 'object' && typeof R.then == 'function')
          ) {
            var F = R,
              G = T,
              K = G.tag
            if ((G.mode & 1) === 0 && (K === 0 || K === 11 || K === 15)) {
              var H = G.alternate
              H
                ? ((G.updateQueue = H.updateQueue),
                  (G.memoizedState = H.memoizedState),
                  (G.lanes = H.lanes))
                : ((G.updateQueue = null), (G.memoizedState = null))
            }
            var se = yh(b)
            if (se !== null) {
              ;((se.flags &= -257),
                xh(se, b, T, y, o),
                se.mode & 1 && vh(y, F, o),
                (o = se),
                (R = F))
              var ce = o.updateQueue
              if (ce === null) {
                var de = new Set()
                ;(de.add(R), (o.updateQueue = de))
              } else ce.add(R)
              break e
            } else {
              if ((o & 1) === 0) {
                ;(vh(y, F, o), zu())
                break e
              }
              R = Error(r(426))
            }
          } else if (Be && T.mode & 1) {
            var Ye = yh(b)
            if (Ye !== null) {
              ;((Ye.flags & 65536) === 0 && (Ye.flags |= 256), xh(Ye, b, T, y, o), Zc($o(R, T)))
              break e
            }
          }
          ;((y = R = $o(R, T)),
            nt !== 4 && (nt = 2),
            ni === null ? (ni = [y]) : ni.push(y),
            (y = b))
          do {
            switch (y.tag) {
              case 3:
                ;((y.flags |= 65536), (o &= -o), (y.lanes |= o))
                var D = hh(y, R, o)
                $m(y, D)
                break e
              case 1:
                T = R
                var M = y.type,
                  O = y.stateNode
                if (
                  (y.flags & 128) === 0 &&
                  (typeof M.getDerivedStateFromError == 'function' ||
                    (O !== null &&
                      typeof O.componentDidCatch == 'function' &&
                      (br === null || !br.has(O))))
                ) {
                  ;((y.flags |= 65536), (o &= -o), (y.lanes |= o))
                  var Q = gh(y, T, o)
                  $m(y, Q)
                  break e
                }
            }
            y = y.return
          } while (y !== null)
        }
        qh(i)
      } catch (pe) {
        ;((o = pe), Ze === i && i !== null && (Ze = i = i.return))
        continue
      }
      break
    } while (!0)
  }
  function Yh() {
    var n = $a.current
    return (($a.current = Oa), n === null ? Oa : n)
  }
  function zu() {
    ;((nt === 0 || nt === 3 || nt === 2) && (nt = 4),
      st === null || ((to & 268435455) === 0 && (Wa & 268435455) === 0) || Er(st, dt))
  }
  function Xa(n, o) {
    var i = je
    je |= 2
    var c = Yh()
    ;(st !== n || dt !== o) && ((Un = null), ro(n, o))
    do
      try {
        mC()
        break
      } catch (m) {
        Kh(n, m)
      }
    while (!0)
    if ((eu(), (je = i), ($a.current = c), Ze !== null)) throw Error(r(261))
    return ((st = null), (dt = 0), nt)
  }
  function mC() {
    for (; Ze !== null; ) Xh(Ze)
  }
  function hC() {
    for (; Ze !== null && !B1(); ) Xh(Ze)
  }
  function Xh(n) {
    var o = Jh(n.alternate, n, Bt)
    ;((n.memoizedProps = n.pendingProps), o === null ? qh(n) : (Ze = o), (Mu.current = null))
  }
  function qh(n) {
    var o = n
    do {
      var i = o.alternate
      if (((n = o.return), (o.flags & 32768) === 0)) {
        if (((i = aC(i, o, Bt)), i !== null)) {
          Ze = i
          return
        }
      } else {
        if (((i = lC(i, o)), i !== null)) {
          ;((i.flags &= 32767), (Ze = i))
          return
        }
        if (n !== null) ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null))
        else {
          ;((nt = 6), (Ze = null))
          return
        }
      }
      if (((o = o.sibling), o !== null)) {
        Ze = o
        return
      }
      Ze = o = n
    } while (o !== null)
    nt === 0 && (nt = 5)
  }
  function oo(n, o, i) {
    var c = De,
      m = Jt.transition
    try {
      ;((Jt.transition = null), (De = 1), gC(n, o, i, c))
    } finally {
      ;((Jt.transition = m), (De = c))
    }
    return null
  }
  function gC(n, o, i, c) {
    do Go()
    while (Sr !== null)
    if ((je & 6) !== 0) throw Error(r(327))
    i = n.finishedWork
    var m = n.finishedLanes
    if (i === null) return null
    if (((n.finishedWork = null), (n.finishedLanes = 0), i === n.current)) throw Error(r(177))
    ;((n.callbackNode = null), (n.callbackPriority = 0))
    var y = i.lanes | i.childLanes
    if (
      (q1(n, y),
      n === st && ((Ze = st = null), (dt = 0)),
      ((i.subtreeFlags & 2064) === 0 && (i.flags & 2064) === 0) ||
        Ha ||
        ((Ha = !0),
        eg(Ji, function () {
          return (Go(), null)
        })),
      (y = (i.flags & 15990) !== 0),
      (i.subtreeFlags & 15990) !== 0 || y)
    ) {
      ;((y = Jt.transition), (Jt.transition = null))
      var b = De
      De = 1
      var T = je
      ;((je |= 4),
        (Mu.current = null),
        uC(n, i),
        Bh(i, n),
        OS(zc),
        (ia = !!Bc),
        (zc = Bc = null),
        (n.current = i),
        dC(i),
        z1(),
        (je = T),
        (De = b),
        (Jt.transition = y))
    } else n.current = i
    if (
      (Ha && ((Ha = !1), (Sr = n), (Ga = m)),
      (y = n.pendingLanes),
      y === 0 && (br = null),
      U1(i.stateNode),
      Rt(n, Ke()),
      o !== null)
    )
      for (c = n.onRecoverableError, i = 0; i < o.length; i++)
        ((m = o[i]), c(m.value, { componentStack: m.stack, digest: m.digest }))
    if (Ua) throw ((Ua = !1), (n = Iu), (Iu = null), n)
    return (
      (Ga & 1) !== 0 && n.tag !== 0 && Go(),
      (y = n.pendingLanes),
      (y & 1) !== 0 ? (n === Ou ? ri++ : ((ri = 0), (Ou = n))) : (ri = 0),
      vr(),
      null
    )
  }
  function Go() {
    if (Sr !== null) {
      var n = Fp(Ga),
        o = Jt.transition,
        i = De
      try {
        if (((Jt.transition = null), (De = 16 > n ? 16 : n), Sr === null)) var c = !1
        else {
          if (((n = Sr), (Sr = null), (Ga = 0), (je & 6) !== 0)) throw Error(r(331))
          var m = je
          for (je |= 4, ae = n.current; ae !== null; ) {
            var y = ae,
              b = y.child
            if ((ae.flags & 16) !== 0) {
              var T = y.deletions
              if (T !== null) {
                for (var R = 0; R < T.length; R++) {
                  var F = T[R]
                  for (ae = F; ae !== null; ) {
                    var G = ae
                    switch (G.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ei(8, G, y)
                    }
                    var K = G.child
                    if (K !== null) ((K.return = G), (ae = K))
                    else
                      for (; ae !== null; ) {
                        G = ae
                        var H = G.sibling,
                          se = G.return
                        if ((Ih(G), G === F)) {
                          ae = null
                          break
                        }
                        if (H !== null) {
                          ;((H.return = se), (ae = H))
                          break
                        }
                        ae = se
                      }
                  }
                }
                var ce = y.alternate
                if (ce !== null) {
                  var de = ce.child
                  if (de !== null) {
                    ce.child = null
                    do {
                      var Ye = de.sibling
                      ;((de.sibling = null), (de = Ye))
                    } while (de !== null)
                  }
                }
                ae = y
              }
            }
            if ((y.subtreeFlags & 2064) !== 0 && b !== null) ((b.return = y), (ae = b))
            else
              e: for (; ae !== null; ) {
                if (((y = ae), (y.flags & 2048) !== 0))
                  switch (y.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ei(9, y, y.return)
                  }
                var D = y.sibling
                if (D !== null) {
                  ;((D.return = y.return), (ae = D))
                  break e
                }
                ae = y.return
              }
          }
          var M = n.current
          for (ae = M; ae !== null; ) {
            b = ae
            var O = b.child
            if ((b.subtreeFlags & 2064) !== 0 && O !== null) ((O.return = b), (ae = O))
            else
              e: for (b = M; ae !== null; ) {
                if (((T = ae), (T.flags & 2048) !== 0))
                  try {
                    switch (T.tag) {
                      case 0:
                      case 11:
                      case 15:
                        za(9, T)
                    }
                  } catch (pe) {
                    Ue(T, T.return, pe)
                  }
                if (T === b) {
                  ae = null
                  break e
                }
                var Q = T.sibling
                if (Q !== null) {
                  ;((Q.return = T.return), (ae = Q))
                  break e
                }
                ae = T.return
              }
          }
          if (((je = m), vr(), yn && typeof yn.onPostCommitFiberRoot == 'function'))
            try {
              yn.onPostCommitFiberRoot(ea, n)
            } catch {}
          c = !0
        }
        return c
      } finally {
        ;((De = i), (Jt.transition = o))
      }
    }
    return !1
  }
  function Qh(n, o, i) {
    ;((o = $o(i, o)),
      (o = hh(n, o, 1)),
      (n = xr(n, o, 1)),
      (o = Ct()),
      n !== null && (Ts(n, 1, o), Rt(n, o)))
  }
  function Ue(n, o, i) {
    if (n.tag === 3) Qh(n, n, i)
    else
      for (; o !== null; ) {
        if (o.tag === 3) {
          Qh(o, n, i)
          break
        } else if (o.tag === 1) {
          var c = o.stateNode
          if (
            typeof o.type.getDerivedStateFromError == 'function' ||
            (typeof c.componentDidCatch == 'function' && (br === null || !br.has(c)))
          ) {
            ;((n = $o(i, n)),
              (n = gh(o, n, 1)),
              (o = xr(o, n, 1)),
              (n = Ct()),
              o !== null && (Ts(o, 1, n), Rt(o, n)))
            break
          }
        }
        o = o.return
      }
  }
  function vC(n, o, i) {
    var c = n.pingCache
    ;(c !== null && c.delete(o),
      (o = Ct()),
      (n.pingedLanes |= n.suspendedLanes & i),
      st === n &&
        (dt & i) === i &&
        (nt === 4 || (nt === 3 && (dt & 130023424) === dt && 500 > Ke() - Du)
          ? ro(n, 0)
          : (_u |= i)),
      Rt(n, o))
  }
  function Zh(n, o) {
    o === 0 &&
      ((n.mode & 1) === 0
        ? (o = 1)
        : ((o = na), (na <<= 1), (na & 130023424) === 0 && (na = 4194304)))
    var i = Ct()
    ;((n = zn(n, o)), n !== null && (Ts(n, o, i), Rt(n, i)))
  }
  function yC(n) {
    var o = n.memoizedState,
      i = 0
    ;(o !== null && (i = o.retryLane), Zh(n, i))
  }
  function xC(n, o) {
    var i = 0
    switch (n.tag) {
      case 13:
        var c = n.stateNode,
          m = n.memoizedState
        m !== null && (i = m.retryLane)
        break
      case 19:
        c = n.stateNode
        break
      default:
        throw Error(r(314))
    }
    ;(c !== null && c.delete(o), Zh(n, i))
  }
  var Jh
  Jh = function (n, o, i) {
    if (n !== null)
      if (n.memoizedProps !== o.pendingProps || Pt.current) jt = !0
      else {
        if ((n.lanes & i) === 0 && (o.flags & 128) === 0) return ((jt = !1), iC(n, o, i))
        jt = (n.flags & 131072) !== 0
      }
    else ((jt = !1), Be && (o.flags & 1048576) !== 0 && Mm(o, Ea, o.index))
    switch (((o.lanes = 0), o.tag)) {
      case 2:
        var c = o.type
        ;(Va(n, o), (n = o.pendingProps))
        var m = Do(o, mt.current)
        ;(Bo(o, i), (m = du(null, o, c, n, m, i)))
        var y = fu()
        return (
          (o.flags |= 1),
          typeof m == 'object' &&
          m !== null &&
          typeof m.render == 'function' &&
          m.$$typeof === void 0
            ? ((o.tag = 1),
              (o.memoizedState = null),
              (o.updateQueue = null),
              Tt(c) ? ((y = !0), ba(o)) : (y = !1),
              (o.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null),
              ou(o),
              (m.updater = La),
              (o.stateNode = m),
              (m._reactInternals = o),
              yu(o, c, n, i),
              (o = Su(null, o, c, !0, y, i)))
            : ((o.tag = 0), Be && y && Yc(o), St(null, o, m, i), (o = o.child)),
          o
        )
      case 16:
        c = o.elementType
        e: {
          switch (
            (Va(n, o),
            (n = o.pendingProps),
            (m = c._init),
            (c = m(c._payload)),
            (o.type = c),
            (m = o.tag = bC(c)),
            (n = cn(c, n)),
            m)
          ) {
            case 0:
              o = bu(null, o, c, n, i)
              break e
            case 1:
              o = Nh(null, o, c, n, i)
              break e
            case 11:
              o = wh(null, o, c, n, i)
              break e
            case 14:
              o = bh(null, o, c, cn(c.type, n), i)
              break e
          }
          throw Error(r(306, c, ''))
        }
        return o
      case 0:
        return (
          (c = o.type),
          (m = o.pendingProps),
          (m = o.elementType === c ? m : cn(c, m)),
          bu(n, o, c, m, i)
        )
      case 1:
        return (
          (c = o.type),
          (m = o.pendingProps),
          (m = o.elementType === c ? m : cn(c, m)),
          Nh(n, o, c, m, i)
        )
      case 3:
        e: {
          if ((Ph(o), n === null)) throw Error(r(387))
          ;((c = o.pendingProps),
            (y = o.memoizedState),
            (m = y.element),
            zm(n, o),
            Ra(o, c, null, i))
          var b = o.memoizedState
          if (((c = b.element), y.isDehydrated))
            if (
              ((y = {
                element: c,
                isDehydrated: !1,
                cache: b.cache,
                pendingSuspenseBoundaries: b.pendingSuspenseBoundaries,
                transitions: b.transitions,
              }),
              (o.updateQueue.baseState = y),
              (o.memoizedState = y),
              o.flags & 256)
            ) {
              ;((m = $o(Error(r(423)), o)), (o = Th(n, o, c, i, m)))
              break e
            } else if (c !== m) {
              ;((m = $o(Error(r(424)), o)), (o = Th(n, o, c, i, m)))
              break e
            } else
              for (
                Vt = mr(o.stateNode.containerInfo.firstChild),
                  Ft = o,
                  Be = !0,
                  ln = null,
                  i = Vm(o, null, c, i),
                  o.child = i;
                i;

              )
                ((i.flags = (i.flags & -3) | 4096), (i = i.sibling))
          else {
            if ((Lo(), c === m)) {
              o = Wn(n, o, i)
              break e
            }
            St(n, o, c, i)
          }
          o = o.child
        }
        return o
      case 5:
        return (
          Um(o),
          n === null && Qc(o),
          (c = o.type),
          (m = o.pendingProps),
          (y = n !== null ? n.memoizedProps : null),
          (b = m.children),
          $c(c, m) ? (b = null) : y !== null && $c(c, y) && (o.flags |= 32),
          Eh(n, o),
          St(n, o, b, i),
          o.child
        )
      case 6:
        return (n === null && Qc(o), null)
      case 13:
        return jh(n, o, i)
      case 4:
        return (
          su(o, o.stateNode.containerInfo),
          (c = o.pendingProps),
          n === null ? (o.child = Fo(o, null, c, i)) : St(n, o, c, i),
          o.child
        )
      case 11:
        return (
          (c = o.type),
          (m = o.pendingProps),
          (m = o.elementType === c ? m : cn(c, m)),
          wh(n, o, c, m, i)
        )
      case 7:
        return (St(n, o, o.pendingProps, i), o.child)
      case 8:
        return (St(n, o, o.pendingProps.children, i), o.child)
      case 12:
        return (St(n, o, o.pendingProps.children, i), o.child)
      case 10:
        e: {
          if (
            ((c = o.type._context),
            (m = o.pendingProps),
            (y = o.memoizedProps),
            (b = m.value),
            Oe(Ta, c._currentValue),
            (c._currentValue = b),
            y !== null)
          )
            if (an(y.value, b)) {
              if (y.children === m.children && !Pt.current) {
                o = Wn(n, o, i)
                break e
              }
            } else
              for (y = o.child, y !== null && (y.return = o); y !== null; ) {
                var T = y.dependencies
                if (T !== null) {
                  b = y.child
                  for (var R = T.firstContext; R !== null; ) {
                    if (R.context === c) {
                      if (y.tag === 1) {
                        ;((R = $n(-1, i & -i)), (R.tag = 2))
                        var F = y.updateQueue
                        if (F !== null) {
                          F = F.shared
                          var G = F.pending
                          ;(G === null ? (R.next = R) : ((R.next = G.next), (G.next = R)),
                            (F.pending = R))
                        }
                      }
                      ;((y.lanes |= i),
                        (R = y.alternate),
                        R !== null && (R.lanes |= i),
                        nu(y.return, i, o),
                        (T.lanes |= i))
                      break
                    }
                    R = R.next
                  }
                } else if (y.tag === 10) b = y.type === o.type ? null : y.child
                else if (y.tag === 18) {
                  if (((b = y.return), b === null)) throw Error(r(341))
                  ;((b.lanes |= i),
                    (T = b.alternate),
                    T !== null && (T.lanes |= i),
                    nu(b, i, o),
                    (b = y.sibling))
                } else b = y.child
                if (b !== null) b.return = y
                else
                  for (b = y; b !== null; ) {
                    if (b === o) {
                      b = null
                      break
                    }
                    if (((y = b.sibling), y !== null)) {
                      ;((y.return = b.return), (b = y))
                      break
                    }
                    b = b.return
                  }
                y = b
              }
          ;(St(n, o, m.children, i), (o = o.child))
        }
        return o
      case 9:
        return (
          (m = o.type),
          (c = o.pendingProps.children),
          Bo(o, i),
          (m = Qt(m)),
          (c = c(m)),
          (o.flags |= 1),
          St(n, o, c, i),
          o.child
        )
      case 14:
        return ((c = o.type), (m = cn(c, o.pendingProps)), (m = cn(c.type, m)), bh(n, o, c, m, i))
      case 15:
        return Sh(n, o, o.type, o.pendingProps, i)
      case 17:
        return (
          (c = o.type),
          (m = o.pendingProps),
          (m = o.elementType === c ? m : cn(c, m)),
          Va(n, o),
          (o.tag = 1),
          Tt(c) ? ((n = !0), ba(o)) : (n = !1),
          Bo(o, i),
          ph(o, c, m),
          yu(o, c, m, i),
          Su(null, o, c, !0, n, i)
        )
      case 19:
        return Rh(n, o, i)
      case 22:
        return Ch(n, o, i)
    }
    throw Error(r(156, o.tag))
  }
  function eg(n, o) {
    return _p(n, o)
  }
  function wC(n, o, i, c) {
    ;((this.tag = n),
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
      (this.pendingProps = o),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = c),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null))
  }
  function en(n, o, i, c) {
    return new wC(n, o, i, c)
  }
  function $u(n) {
    return ((n = n.prototype), !(!n || !n.isReactComponent))
  }
  function bC(n) {
    if (typeof n == 'function') return $u(n) ? 1 : 0
    if (n != null) {
      if (((n = n.$$typeof), n === te)) return 11
      if (n === xe) return 14
    }
    return 2
  }
  function Nr(n, o) {
    var i = n.alternate
    return (
      i === null
        ? ((i = en(n.tag, o, n.key, n.mode)),
          (i.elementType = n.elementType),
          (i.type = n.type),
          (i.stateNode = n.stateNode),
          (i.alternate = n),
          (n.alternate = i))
        : ((i.pendingProps = o),
          (i.type = n.type),
          (i.flags = 0),
          (i.subtreeFlags = 0),
          (i.deletions = null)),
      (i.flags = n.flags & 14680064),
      (i.childLanes = n.childLanes),
      (i.lanes = n.lanes),
      (i.child = n.child),
      (i.memoizedProps = n.memoizedProps),
      (i.memoizedState = n.memoizedState),
      (i.updateQueue = n.updateQueue),
      (o = n.dependencies),
      (i.dependencies = o === null ? null : { lanes: o.lanes, firstContext: o.firstContext }),
      (i.sibling = n.sibling),
      (i.index = n.index),
      (i.ref = n.ref),
      i
    )
  }
  function qa(n, o, i, c, m, y) {
    var b = 2
    if (((c = n), typeof n == 'function')) $u(n) && (b = 1)
    else if (typeof n == 'string') b = 5
    else
      e: switch (n) {
        case z:
          return so(i.children, m, y, o)
        case W:
          ;((b = 8), (m |= 8))
          break
        case oe:
          return ((n = en(12, i, o, m | 2)), (n.elementType = oe), (n.lanes = y), n)
        case ue:
          return ((n = en(13, i, o, m)), (n.elementType = ue), (n.lanes = y), n)
        case fe:
          return ((n = en(19, i, o, m)), (n.elementType = fe), (n.lanes = y), n)
        case q:
          return Qa(i, m, y, o)
        default:
          if (typeof n == 'object' && n !== null)
            switch (n.$$typeof) {
              case ne:
                b = 10
                break e
              case me:
                b = 9
                break e
              case te:
                b = 11
                break e
              case xe:
                b = 14
                break e
              case X:
                ;((b = 16), (c = null))
                break e
            }
          throw Error(r(130, n == null ? n : typeof n, ''))
      }
    return ((o = en(b, i, o, m)), (o.elementType = n), (o.type = c), (o.lanes = y), o)
  }
  function so(n, o, i, c) {
    return ((n = en(7, n, c, o)), (n.lanes = i), n)
  }
  function Qa(n, o, i, c) {
    return (
      (n = en(22, n, c, o)),
      (n.elementType = q),
      (n.lanes = i),
      (n.stateNode = { isHidden: !1 }),
      n
    )
  }
  function Wu(n, o, i) {
    return ((n = en(6, n, null, o)), (n.lanes = i), n)
  }
  function Uu(n, o, i) {
    return (
      (o = en(4, n.children !== null ? n.children : [], n.key, o)),
      (o.lanes = i),
      (o.stateNode = {
        containerInfo: n.containerInfo,
        pendingChildren: null,
        implementation: n.implementation,
      }),
      o
    )
  }
  function SC(n, o, i, c, m) {
    ;((this.tag = o),
      (this.containerInfo = n),
      (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = vc(0)),
      (this.expirationTimes = vc(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = vc(0)),
      (this.identifierPrefix = c),
      (this.onRecoverableError = m),
      (this.mutableSourceEagerHydrationData = null))
  }
  function Hu(n, o, i, c, m, y, b, T, R) {
    return (
      (n = new SC(n, o, i, T, R)),
      o === 1 ? ((o = 1), y === !0 && (o |= 8)) : (o = 0),
      (y = en(3, null, null, o)),
      (n.current = y),
      (y.stateNode = n),
      (y.memoizedState = {
        element: c,
        isDehydrated: i,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      ou(y),
      n
    )
  }
  function CC(n, o, i) {
    var c = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
    return {
      $$typeof: B,
      key: c == null ? null : '' + c,
      children: n,
      containerInfo: o,
      implementation: i,
    }
  }
  function tg(n) {
    if (!n) return gr
    n = n._reactInternals
    e: {
      if (Kr(n) !== n || n.tag !== 1) throw Error(r(170))
      var o = n
      do {
        switch (o.tag) {
          case 3:
            o = o.stateNode.context
            break e
          case 1:
            if (Tt(o.type)) {
              o = o.stateNode.__reactInternalMemoizedMergedChildContext
              break e
            }
        }
        o = o.return
      } while (o !== null)
      throw Error(r(171))
    }
    if (n.tag === 1) {
      var i = n.type
      if (Tt(i)) return km(n, i, o)
    }
    return o
  }
  function ng(n, o, i, c, m, y, b, T, R) {
    return (
      (n = Hu(i, c, !0, n, m, y, b, T, R)),
      (n.context = tg(null)),
      (i = n.current),
      (c = Ct()),
      (m = Cr(i)),
      (y = $n(c, m)),
      (y.callback = o ?? null),
      xr(i, y, m),
      (n.current.lanes = m),
      Ts(n, m, c),
      Rt(n, c),
      n
    )
  }
  function Za(n, o, i, c) {
    var m = o.current,
      y = Ct(),
      b = Cr(m)
    return (
      (i = tg(i)),
      o.context === null ? (o.context = i) : (o.pendingContext = i),
      (o = $n(y, b)),
      (o.payload = { element: n }),
      (c = c === void 0 ? null : c),
      c !== null && (o.callback = c),
      (n = xr(m, o, b)),
      n !== null && (fn(n, m, b, y), ka(n, m, b)),
      b
    )
  }
  function Ja(n) {
    return ((n = n.current), n.child ? (n.child.tag === 5, n.child.stateNode) : null)
  }
  function rg(n, o) {
    if (((n = n.memoizedState), n !== null && n.dehydrated !== null)) {
      var i = n.retryLane
      n.retryLane = i !== 0 && i < o ? i : o
    }
  }
  function Gu(n, o) {
    ;(rg(n, o), (n = n.alternate) && rg(n, o))
  }
  function EC() {
    return null
  }
  var og =
    typeof reportError == 'function'
      ? reportError
      : function (n) {
          console.error(n)
        }
  function Ku(n) {
    this._internalRoot = n
  }
  ;((el.prototype.render = Ku.prototype.render =
    function (n) {
      var o = this._internalRoot
      if (o === null) throw Error(r(409))
      Za(n, o, null, null)
    }),
    (el.prototype.unmount = Ku.prototype.unmount =
      function () {
        var n = this._internalRoot
        if (n !== null) {
          this._internalRoot = null
          var o = n.containerInfo
          ;(no(function () {
            Za(null, n, null, null)
          }),
            (o[Ln] = null))
        }
      }))
  function el(n) {
    this._internalRoot = n
  }
  el.prototype.unstable_scheduleHydration = function (n) {
    if (n) {
      var o = zp()
      n = { blockedOn: null, target: n, priority: o }
      for (var i = 0; i < dr.length && o !== 0 && o < dr[i].priority; i++);
      ;(dr.splice(i, 0, n), i === 0 && Up(n))
    }
  }
  function Yu(n) {
    return !(!n || (n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11))
  }
  function tl(n) {
    return !(
      !n ||
      (n.nodeType !== 1 &&
        n.nodeType !== 9 &&
        n.nodeType !== 11 &&
        (n.nodeType !== 8 || n.nodeValue !== ' react-mount-point-unstable '))
    )
  }
  function sg() {}
  function NC(n, o, i, c, m) {
    if (m) {
      if (typeof c == 'function') {
        var y = c
        c = function () {
          var F = Ja(b)
          y.call(F)
        }
      }
      var b = ng(o, c, n, 0, null, !1, !1, '', sg)
      return (
        (n._reactRootContainer = b),
        (n[Ln] = b.current),
        zs(n.nodeType === 8 ? n.parentNode : n),
        no(),
        b
      )
    }
    for (; (m = n.lastChild); ) n.removeChild(m)
    if (typeof c == 'function') {
      var T = c
      c = function () {
        var F = Ja(R)
        T.call(F)
      }
    }
    var R = Hu(n, 0, !1, null, null, !1, !1, '', sg)
    return (
      (n._reactRootContainer = R),
      (n[Ln] = R.current),
      zs(n.nodeType === 8 ? n.parentNode : n),
      no(function () {
        Za(o, R, i, c)
      }),
      R
    )
  }
  function nl(n, o, i, c, m) {
    var y = i._reactRootContainer
    if (y) {
      var b = y
      if (typeof m == 'function') {
        var T = m
        m = function () {
          var R = Ja(b)
          T.call(R)
        }
      }
      Za(o, b, n, m)
    } else b = NC(i, o, n, m, c)
    return Ja(b)
  }
  ;((Vp = function (n) {
    switch (n.tag) {
      case 3:
        var o = n.stateNode
        if (o.current.memoizedState.isDehydrated) {
          var i = Ps(o.pendingLanes)
          i !== 0 && (yc(o, i | 1), Rt(o, Ke()), (je & 6) === 0 && ((Ho = Ke() + 500), vr()))
        }
        break
      case 13:
        ;(no(function () {
          var c = zn(n, 1)
          if (c !== null) {
            var m = Ct()
            fn(c, n, 1, m)
          }
        }),
          Gu(n, 1))
    }
  }),
    (xc = function (n) {
      if (n.tag === 13) {
        var o = zn(n, 134217728)
        if (o !== null) {
          var i = Ct()
          fn(o, n, 134217728, i)
        }
        Gu(n, 134217728)
      }
    }),
    (Bp = function (n) {
      if (n.tag === 13) {
        var o = Cr(n),
          i = zn(n, o)
        if (i !== null) {
          var c = Ct()
          fn(i, n, o, c)
        }
        Gu(n, o)
      }
    }),
    (zp = function () {
      return De
    }),
    ($p = function (n, o) {
      var i = De
      try {
        return ((De = n), o())
      } finally {
        De = i
      }
    }),
    (Cs = function (n, o, i) {
      switch (o) {
        case 'input':
          if ((Dt(n, i), (o = i.name), i.type === 'radio' && o != null)) {
            for (i = n; i.parentNode; ) i = i.parentNode
            for (
              i = i.querySelectorAll('input[name=' + JSON.stringify('' + o) + '][type="radio"]'),
                o = 0;
              o < i.length;
              o++
            ) {
              var c = i[o]
              if (c !== n && c.form === n.form) {
                var m = xa(c)
                if (!m) throw Error(r(90))
                ;(Me(c), Dt(c, m))
              }
            }
          }
          break
        case 'textarea':
          Yi(n, i)
          break
        case 'select':
          ;((o = i.value), o != null && tr(n, !!i.multiple, o, !1))
      }
    }),
    (et = Vu),
    (pt = no))
  var PC = { usingClientEntryPoint: !1, Events: [Us, Mo, xa, Ce, Ge, Vu] },
    oi = {
      findFiberByHostInstance: Yr,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom',
    },
    TC = {
      bundleType: oi.bundleType,
      version: oi.version,
      rendererPackageName: oi.rendererPackageName,
      rendererConfig: oi.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: _.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (n) {
        return ((n = Ap(n)), n === null ? null : n.stateNode)
      },
      findFiberByHostInstance: oi.findFiberByHostInstance || EC,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    }
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var rl = __REACT_DEVTOOLS_GLOBAL_HOOK__
    if (!rl.isDisabled && rl.supportsFiber)
      try {
        ;((ea = rl.inject(TC)), (yn = rl))
      } catch {}
  }
  return (
    (At.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = PC),
    (At.createPortal = function (n, o) {
      var i = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
      if (!Yu(o)) throw Error(r(200))
      return CC(n, o, null, i)
    }),
    (At.createRoot = function (n, o) {
      if (!Yu(n)) throw Error(r(299))
      var i = !1,
        c = '',
        m = og
      return (
        o != null &&
          (o.unstable_strictMode === !0 && (i = !0),
          o.identifierPrefix !== void 0 && (c = o.identifierPrefix),
          o.onRecoverableError !== void 0 && (m = o.onRecoverableError)),
        (o = Hu(n, 1, !1, null, null, i, !1, c, m)),
        (n[Ln] = o.current),
        zs(n.nodeType === 8 ? n.parentNode : n),
        new Ku(o)
      )
    }),
    (At.findDOMNode = function (n) {
      if (n == null) return null
      if (n.nodeType === 1) return n
      var o = n._reactInternals
      if (o === void 0)
        throw typeof n.render == 'function'
          ? Error(r(188))
          : ((n = Object.keys(n).join(',')), Error(r(268, n)))
      return ((n = Ap(o)), (n = n === null ? null : n.stateNode), n)
    }),
    (At.flushSync = function (n) {
      return no(n)
    }),
    (At.hydrate = function (n, o, i) {
      if (!tl(o)) throw Error(r(200))
      return nl(null, n, o, !0, i)
    }),
    (At.hydrateRoot = function (n, o, i) {
      if (!Yu(n)) throw Error(r(405))
      var c = (i != null && i.hydratedSources) || null,
        m = !1,
        y = '',
        b = og
      if (
        (i != null &&
          (i.unstable_strictMode === !0 && (m = !0),
          i.identifierPrefix !== void 0 && (y = i.identifierPrefix),
          i.onRecoverableError !== void 0 && (b = i.onRecoverableError)),
        (o = ng(o, null, n, 1, i ?? null, m, !1, y, b)),
        (n[Ln] = o.current),
        zs(n),
        c)
      )
        for (n = 0; n < c.length; n++)
          ((i = c[n]),
            (m = i._getVersion),
            (m = m(i._source)),
            o.mutableSourceEagerHydrationData == null
              ? (o.mutableSourceEagerHydrationData = [i, m])
              : o.mutableSourceEagerHydrationData.push(i, m))
      return new el(o)
    }),
    (At.render = function (n, o, i) {
      if (!tl(o)) throw Error(r(200))
      return nl(null, n, o, !1, i)
    }),
    (At.unmountComponentAtNode = function (n) {
      if (!tl(n)) throw Error(r(40))
      return n._reactRootContainer
        ? (no(function () {
            nl(null, null, n, !1, function () {
              ;((n._reactRootContainer = null), (n[Ln] = null))
            })
          }),
          !0)
        : !1
    }),
    (At.unstable_batchedUpdates = Vu),
    (At.unstable_renderSubtreeIntoContainer = function (n, o, i, c) {
      if (!tl(i)) throw Error(r(200))
      if (n == null || n._reactInternals === void 0) throw Error(r(38))
      return nl(n, o, i, !1, c)
    }),
    (At.version = '18.3.1-next-f1338f8080-20240426'),
    At
  )
}
var pg
function by() {
  if (pg) return Qu.exports
  pg = 1
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
      } catch (t) {
        console.error(t)
      }
  }
  return (e(), (Qu.exports = IC()), Qu.exports)
}
var mg
function OC() {
  if (mg) return ol
  mg = 1
  var e = by()
  return ((ol.createRoot = e.createRoot), (ol.hydrateRoot = e.hydrateRoot), ol)
}
var LC = OC(),
  v = uf()
const Z = wy(v),
  df = kC({ __proto__: null, default: Z }, [v])
const FC = (e) => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Sy = (...e) =>
    e
      .filter((t, r, s) => !!t && t.trim() !== '' && s.indexOf(t) === r)
      .join(' ')
      .trim()
var VC = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
const BC = v.forwardRef(
  (
    {
      color: e = 'currentColor',
      size: t = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: s,
      className: a = '',
      children: l,
      iconNode: u,
      ...f
    },
    p
  ) =>
    v.createElement(
      'svg',
      {
        ref: p,
        ...VC,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: s ? (Number(r) * 24) / Number(t) : r,
        className: Sy('lucide', a),
        ...f,
      },
      [...u.map(([g, x]) => v.createElement(g, x)), ...(Array.isArray(l) ? l : [l])]
    )
)
const Ae = (e, t) => {
  const r = v.forwardRef(({ className: s, ...a }, l) =>
    v.createElement(BC, { ref: l, iconNode: t, className: Sy(`lucide-${FC(e)}`, s), ...a })
  )
  return ((r.displayName = `${e}`), r)
}
const zC = Ae('Activity', [
  [
    'path',
    {
      d: 'M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2',
      key: '169zse',
    },
  ],
])
const $C = Ae('ArrowRight', [
  ['path', { d: 'M5 12h14', key: '1ays0h' }],
  ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
])
const WC = Ae('ArrowUp', [
  ['path', { d: 'm5 12 7-7 7 7', key: 'hav0vg' }],
  ['path', { d: 'M12 19V5', key: 'x0mq9r' }],
])
const jd = Ae('Bell', [
  ['path', { d: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', key: '1qo2s2' }],
  ['path', { d: 'M10.3 21a1.94 1.94 0 0 0 3.4 0', key: 'qgo35s' }],
])
const UC = Ae('BookOpen', [
  ['path', { d: 'M12 7v14', key: '1akyts' }],
  [
    'path',
    {
      d: 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
      key: 'ruj8y',
    },
  ],
])
const HC = Ae('Brain', [
  [
    'path',
    {
      d: 'M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z',
      key: 'l5xja',
    },
  ],
  [
    'path',
    {
      d: 'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z',
      key: 'ep3f8r',
    },
  ],
  ['path', { d: 'M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4', key: '1p4c4q' }],
  ['path', { d: 'M17.599 6.5a3 3 0 0 0 .399-1.375', key: 'tmeiqw' }],
  ['path', { d: 'M6.003 5.125A3 3 0 0 0 6.401 6.5', key: '105sqy' }],
  ['path', { d: 'M3.477 10.896a4 4 0 0 1 .585-.396', key: 'ql3yin' }],
  ['path', { d: 'M19.938 10.5a4 4 0 0 1 .585.396', key: '1qfode' }],
  ['path', { d: 'M6 18a4 4 0 0 1-1.967-.516', key: '2e4loj' }],
  ['path', { d: 'M19.967 17.484A4 4 0 0 1 18 18', key: '159ez6' }],
])
const GC = Ae('ChartColumn', [
  ['path', { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' }],
  ['path', { d: 'M18 17V9', key: '2bz60n' }],
  ['path', { d: 'M13 17V5', key: '1frdt8' }],
  ['path', { d: 'M8 17v-3', key: '17ska0' }],
])
const ff = Ae('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]])
const pf = Ae('ChevronDown', [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]])
const KC = Ae('ChevronRight', [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]])
const Cy = Ae('ChevronUp', [['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]])
const sl = Ae('CircleCheckBig', [
  ['path', { d: 'M21.801 10A10 10 0 1 1 17 3.335', key: 'yps3ct' }],
  ['path', { d: 'm9 11 3 3L22 4', key: '1pflzl' }],
])
const YC = Ae('Circle', [['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }]])
const XC = Ae('Database', [
  ['ellipse', { cx: '12', cy: '5', rx: '9', ry: '3', key: 'msslwz' }],
  ['path', { d: 'M3 5V19A9 3 0 0 0 21 19V5', key: '1wlel7' }],
  ['path', { d: 'M3 12A9 3 0 0 0 21 12', key: 'mv7ke4' }],
])
const qC = Ae('DollarSign', [
  ['line', { x1: '12', x2: '12', y1: '2', y2: '22', key: '7eqyqh' }],
  ['path', { d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', key: '1b0p4s' }],
])
const QC = Ae('FileCheck', [
  ['path', { d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', key: '1rqfz7' }],
  ['path', { d: 'M14 2v4a2 2 0 0 0 2 2h4', key: 'tnqrlb' }],
  ['path', { d: 'm9 15 2 2 4-4', key: '1grp1n' }],
])
const ZC = Ae('Layers', [
  [
    'path',
    {
      d: 'm12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z',
      key: '8b97xw',
    },
  ],
  ['path', { d: 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', key: 'dd6zsq' }],
  ['path', { d: 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65', key: 'ep9fru' }],
])
const ki = Ae('LoaderCircle', [['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }]])
const JC = Ae('Lock', [
  ['rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2', key: '1w4ew1' }],
  ['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4', key: 'fwvmzm' }],
])
const hg = Ae('LogIn', [
  ['path', { d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', key: 'u53s6r' }],
  ['polyline', { points: '10 17 15 12 10 7', key: '1ail0h' }],
  ['line', { x1: '15', x2: '3', y1: '12', y2: '12', key: 'v6grx8' }],
])
const eE = Ae('Mail', [
  ['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
  ['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
])
const tE = Ae('Menu', [
  ['line', { x1: '4', x2: '20', y1: '12', y2: '12', key: '1e0a9i' }],
  ['line', { x1: '4', x2: '20', y1: '6', y2: '6', key: '1owob3' }],
  ['line', { x1: '4', x2: '20', y1: '18', y2: '18', key: 'yk5zj1' }],
])
const nE = Ae('Moon', [['path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z', key: 'a7tn18' }]])
const rE = Ae('Network', [
  ['rect', { x: '16', y: '16', width: '6', height: '6', rx: '1', key: '4q2zg0' }],
  ['rect', { x: '2', y: '16', width: '6', height: '6', rx: '1', key: '8cvhb9' }],
  ['rect', { x: '9', y: '2', width: '6', height: '6', rx: '1', key: '1egb70' }],
  ['path', { d: 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', key: '1jsf9p' }],
  ['path', { d: 'M12 12V8', key: '2874zd' }],
])
const oE = Ae('Search', [
  ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
  ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
])
const sE = Ae('Shield', [
  [
    'path',
    {
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
      key: 'oel41y',
    },
  ],
])
const iE = Ae('SlidersHorizontal', [
  ['line', { x1: '21', x2: '14', y1: '4', y2: '4', key: 'obuewd' }],
  ['line', { x1: '10', x2: '3', y1: '4', y2: '4', key: '1q6298' }],
  ['line', { x1: '21', x2: '12', y1: '12', y2: '12', key: '1iu8h1' }],
  ['line', { x1: '8', x2: '3', y1: '12', y2: '12', key: 'ntss68' }],
  ['line', { x1: '21', x2: '16', y1: '20', y2: '20', key: '14d8ph' }],
  ['line', { x1: '12', x2: '3', y1: '20', y2: '20', key: 'm0wm8r' }],
  ['line', { x1: '14', x2: '14', y1: '2', y2: '6', key: '14e1ph' }],
  ['line', { x1: '8', x2: '8', y1: '10', y2: '14', key: '1i6ji0' }],
  ['line', { x1: '16', x2: '16', y1: '18', y2: '22', key: '1lctlv' }],
])
const mf = Ae('TrendingUp', [
  ['polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17', key: '126l90' }],
  ['polyline', { points: '16 7 22 7 22 13', key: 'kwv8wd' }],
])
const aE = Ae('TriangleAlert', [
  [
    'path',
    {
      d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
      key: 'wmoenq',
    },
  ],
  ['path', { d: 'M12 9v4', key: 'juzpu7' }],
  ['path', { d: 'M12 17h.01', key: 'p32p05' }],
])
const Ey = Ae('X', [
  ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
  ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
])
const lE = Ae('Zap', [
    [
      'path',
      {
        d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
        key: '1xq2db',
      },
    ],
  ]),
  hf = v.createContext({})
function zl(e) {
  const t = v.useRef(null)
  return (t.current === null && (t.current = e()), t.current)
}
const $l = v.createContext(null),
  gf = v.createContext({ transformPagePoint: (e) => e, isStatic: !1, reducedMotion: 'never' })
class cE extends v.Component {
  getSnapshotBeforeUpdate(t) {
    const r = this.props.childRef.current
    if (r && t.isPresent && !this.props.isPresent) {
      const s = this.props.sizeRef.current
      ;((s.height = r.offsetHeight || 0),
        (s.width = r.offsetWidth || 0),
        (s.top = r.offsetTop),
        (s.left = r.offsetLeft))
    }
    return null
  }
  componentDidUpdate() {}
  render() {
    return this.props.children
  }
}
function uE({ children: e, isPresent: t }) {
  const r = v.useId(),
    s = v.useRef(null),
    a = v.useRef({ width: 0, height: 0, top: 0, left: 0 }),
    { nonce: l } = v.useContext(gf)
  return (
    v.useInsertionEffect(() => {
      const { width: u, height: f, top: p, left: g } = a.current
      if (t || !s.current || !u || !f) return
      s.current.dataset.motionPopId = r
      const x = document.createElement('style')
      return (
        l && (x.nonce = l),
        document.head.appendChild(x),
        x.sheet &&
          x.sheet.insertRule(`
          [data-motion-pop-id="${r}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${f}px !important;
            top: ${p}px !important;
            left: ${g}px !important;
          }
        `),
        () => {
          document.head.removeChild(x)
        }
      )
    }, [t]),
    d.jsx(cE, { isPresent: t, childRef: s, sizeRef: a, children: v.cloneElement(e, { ref: s }) })
  )
}
const dE = ({
  children: e,
  initial: t,
  isPresent: r,
  onExitComplete: s,
  custom: a,
  presenceAffectsLayout: l,
  mode: u,
}) => {
  const f = zl(fE),
    p = v.useId(),
    g = v.useCallback(
      (h) => {
        f.set(h, !0)
        for (const w of f.values()) if (!w) return
        s && s()
      },
      [f, s]
    ),
    x = v.useMemo(
      () => ({
        id: p,
        initial: t,
        isPresent: r,
        custom: a,
        onExitComplete: g,
        register: (h) => (f.set(h, !1), () => f.delete(h)),
      }),
      l ? [Math.random(), g] : [r, g]
    )
  return (
    v.useMemo(() => {
      f.forEach((h, w) => f.set(w, !1))
    }, [r]),
    v.useEffect(() => {
      !r && !f.size && s && s()
    }, [r]),
    u === 'popLayout' && (e = d.jsx(uE, { isPresent: r, children: e })),
    d.jsx($l.Provider, { value: x, children: e })
  )
}
function fE() {
  return new Map()
}
function Ny(e = !0) {
  const t = v.useContext($l)
  if (t === null) return [!0, null]
  const { isPresent: r, onExitComplete: s, register: a } = t,
    l = v.useId()
  v.useEffect(() => {
    e && a(l)
  }, [e])
  const u = v.useCallback(() => e && s && s(l), [l, s, e])
  return !r && s ? [!1, u] : [!0]
}
const il = (e) => e.key || ''
function gg(e) {
  const t = []
  return (
    v.Children.forEach(e, (r) => {
      v.isValidElement(r) && t.push(r)
    }),
    t
  )
}
const vf = typeof window < 'u',
  yf = vf ? v.useLayoutEffect : v.useEffect,
  os = ({
    children: e,
    custom: t,
    initial: r = !0,
    onExitComplete: s,
    presenceAffectsLayout: a = !0,
    mode: l = 'sync',
    propagate: u = !1,
  }) => {
    const [f, p] = Ny(u),
      g = v.useMemo(() => gg(e), [e]),
      x = u && !f ? [] : g.map(il),
      h = v.useRef(!0),
      w = v.useRef(g),
      S = zl(() => new Map()),
      [N, C] = v.useState(g),
      [E, P] = v.useState(g)
    yf(() => {
      ;((h.current = !1), (w.current = g))
      for (let _ = 0; _ < E.length; _++) {
        const I = il(E[_])
        x.includes(I) ? S.delete(I) : S.get(I) !== !0 && S.set(I, !1)
      }
    }, [E, x.length, x.join('-')])
    const j = []
    if (g !== N) {
      let _ = [...g]
      for (let I = 0; I < E.length; I++) {
        const B = E[I],
          z = il(B)
        x.includes(z) || (_.splice(I, 0, B), j.push(B))
      }
      ;(l === 'wait' && j.length && (_ = j), P(gg(_)), C(g))
      return
    }
    const { forceRender: k } = v.useContext(hf)
    return d.jsx(d.Fragment, {
      children: E.map((_) => {
        const I = il(_),
          B = u && !f ? !1 : g === E || x.includes(I),
          z = () => {
            if (S.has(I)) S.set(I, !0)
            else return
            let W = !0
            ;(S.forEach((oe) => {
              oe || (W = !1)
            }),
              W && (k?.(), P(w.current), u && p?.(), s && s()))
          }
        return d.jsx(
          dE,
          {
            isPresent: B,
            initial: !h.current || r ? void 0 : !1,
            custom: B ? void 0 : t,
            presenceAffectsLayout: a,
            mode: l,
            onExitComplete: B ? void 0 : z,
            children: _,
          },
          I
        )
      }),
    })
  },
  Et = (e) => e
let pE = Et,
  Py = Et
function xf(e) {
  let t
  return () => (t === void 0 && (t = e()), t)
}
const mo = (e, t, r) => {
    const s = t - e
    return s === 0 ? 1 : (r - e) / s
  },
  Kn = (e) => e * 1e3,
  Yn = (e) => e / 1e3,
  mE = { useManualTiming: !1 }
function hE(e) {
  let t = new Set(),
    r = new Set(),
    s = !1,
    a = !1
  const l = new WeakSet()
  let u = { delta: 0, timestamp: 0, isProcessing: !1 }
  function f(g) {
    ;(l.has(g) && (p.schedule(g), e()), g(u))
  }
  const p = {
    schedule: (g, x = !1, h = !1) => {
      const S = h && s ? t : r
      return (x && l.add(g), S.has(g) || S.add(g), g)
    },
    cancel: (g) => {
      ;(r.delete(g), l.delete(g))
    },
    process: (g) => {
      if (((u = g), s)) {
        a = !0
        return
      }
      ;((s = !0),
        ([t, r] = [r, t]),
        t.forEach(f),
        t.clear(),
        (s = !1),
        a && ((a = !1), p.process(g)))
    },
  }
  return p
}
const al = ['read', 'resolveKeyframes', 'update', 'preRender', 'render', 'postRender'],
  gE = 40
function Ty(e, t) {
  let r = !1,
    s = !0
  const a = { delta: 0, timestamp: 0, isProcessing: !1 },
    l = () => (r = !0),
    u = al.reduce((P, j) => ((P[j] = hE(l)), P), {}),
    { read: f, resolveKeyframes: p, update: g, preRender: x, render: h, postRender: w } = u,
    S = () => {
      const P = performance.now()
      ;((r = !1),
        (a.delta = s ? 1e3 / 60 : Math.max(Math.min(P - a.timestamp, gE), 1)),
        (a.timestamp = P),
        (a.isProcessing = !0),
        f.process(a),
        p.process(a),
        g.process(a),
        x.process(a),
        h.process(a),
        w.process(a),
        (a.isProcessing = !1),
        r && t && ((s = !1), e(S)))
    },
    N = () => {
      ;((r = !0), (s = !0), a.isProcessing || e(S))
    }
  return {
    schedule: al.reduce((P, j) => {
      const k = u[j]
      return ((P[j] = (_, I = !1, B = !1) => (r || N(), k.schedule(_, I, B))), P)
    }, {}),
    cancel: (P) => {
      for (let j = 0; j < al.length; j++) u[al[j]].cancel(P)
    },
    state: a,
    steps: u,
  }
}
const {
    schedule: _e,
    cancel: kn,
    state: at,
    steps: ed,
  } = Ty(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : Et, !0),
  jy = v.createContext({ strict: !1 }),
  vg = {
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
  ss = {}
for (const e in vg) ss[e] = { isEnabled: (t) => vg[e].some((r) => !!t[r]) }
function vE(e) {
  for (const t in e) ss[t] = { ...ss[t], ...e[t] }
}
const yE = new Set([
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
function Nl(e) {
  return (
    e.startsWith('while') ||
    (e.startsWith('drag') && e !== 'draggable') ||
    e.startsWith('layout') ||
    e.startsWith('onTap') ||
    e.startsWith('onPan') ||
    e.startsWith('onLayout') ||
    yE.has(e)
  )
}
let ky = (e) => !Nl(e)
function xE(e) {
  e && (ky = (t) => (t.startsWith('on') ? !Nl(t) : e(t)))
}
try {
  xE(require('@emotion/is-prop-valid').default)
} catch {}
function wE(e, t, r) {
  const s = {}
  for (const a in e)
    (a === 'values' && typeof e.values == 'object') ||
      ((ky(a) ||
        (r === !0 && Nl(a)) ||
        (!t && !Nl(a)) ||
        (e.draggable && a.startsWith('onDrag'))) &&
        (s[a] = e[a]))
  return s
}
function bE(e) {
  if (typeof Proxy > 'u') return e
  const t = new Map(),
    r = (...s) => e(...s)
  return new Proxy(r, {
    get: (s, a) => (a === 'create' ? e : (t.has(a) || t.set(a, e(a)), t.get(a))),
  })
}
const Wl = v.createContext({})
function bi(e) {
  return typeof e == 'string' || Array.isArray(e)
}
function Ul(e) {
  return e !== null && typeof e == 'object' && typeof e.start == 'function'
}
const wf = ['animate', 'whileInView', 'whileFocus', 'whileHover', 'whileTap', 'whileDrag', 'exit'],
  bf = ['initial', ...wf]
function Hl(e) {
  return Ul(e.animate) || bf.some((t) => bi(e[t]))
}
function Ry(e) {
  return !!(Hl(e) || e.variants)
}
function SE(e, t) {
  if (Hl(e)) {
    const { initial: r, animate: s } = e
    return { initial: r === !1 || bi(r) ? r : void 0, animate: bi(s) ? s : void 0 }
  }
  return e.inherit !== !1 ? t : {}
}
function CE(e) {
  const { initial: t, animate: r } = SE(e, v.useContext(Wl))
  return v.useMemo(() => ({ initial: t, animate: r }), [yg(t), yg(r)])
}
function yg(e) {
  return Array.isArray(e) ? e.join(' ') : e
}
const EE = Symbol.for('motionComponentSymbol')
function qo(e) {
  return e && typeof e == 'object' && Object.prototype.hasOwnProperty.call(e, 'current')
}
function NE(e, t, r) {
  return v.useCallback(
    (s) => {
      ;(s && e.onMount && e.onMount(s),
        t && (s ? t.mount(s) : t.unmount()),
        r && (typeof r == 'function' ? r(s) : qo(r) && (r.current = s)))
    },
    [t]
  )
}
const Sf = (e) => e.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase(),
  PE = 'framerAppearId',
  Ay = 'data-' + Sf(PE),
  { schedule: Cf } = Ty(queueMicrotask, !1),
  My = v.createContext({})
function TE(e, t, r, s, a) {
  var l, u
  const { visualElement: f } = v.useContext(Wl),
    p = v.useContext(jy),
    g = v.useContext($l),
    x = v.useContext(gf).reducedMotion,
    h = v.useRef(null)
  ;((s = s || p.renderer),
    !h.current &&
      s &&
      (h.current = s(e, {
        visualState: t,
        parent: f,
        props: r,
        presenceContext: g,
        blockInitialAnimation: g ? g.initial === !1 : !1,
        reducedMotionConfig: x,
      })))
  const w = h.current,
    S = v.useContext(My)
  w && !w.projection && a && (w.type === 'html' || w.type === 'svg') && jE(h.current, r, a, S)
  const N = v.useRef(!1)
  v.useInsertionEffect(() => {
    w && N.current && w.update(r, g)
  })
  const C = r[Ay],
    E = v.useRef(
      !!C &&
        !(!((l = window.MotionHandoffIsComplete) === null || l === void 0) && l.call(window, C)) &&
        ((u = window.MotionHasOptimisedAnimation) === null || u === void 0
          ? void 0
          : u.call(window, C))
    )
  return (
    yf(() => {
      w &&
        ((N.current = !0),
        (window.MotionIsMounted = !0),
        w.updateFeatures(),
        Cf.render(w.render),
        E.current && w.animationState && w.animationState.animateChanges())
    }),
    v.useEffect(() => {
      w &&
        (!E.current && w.animationState && w.animationState.animateChanges(),
        E.current &&
          (queueMicrotask(() => {
            var P
            ;(P = window.MotionHandoffMarkAsComplete) === null || P === void 0 || P.call(window, C)
          }),
          (E.current = !1)))
    }),
    w
  )
}
function jE(e, t, r, s) {
  const { layoutId: a, layout: l, drag: u, dragConstraints: f, layoutScroll: p, layoutRoot: g } = t
  ;((e.projection = new r(e.latestValues, t['data-framer-portal-id'] ? void 0 : _y(e.parent))),
    e.projection.setOptions({
      layoutId: a,
      layout: l,
      alwaysMeasureLayout: !!u || (f && qo(f)),
      visualElement: e,
      animationType: typeof l == 'string' ? l : 'both',
      initialPromotionConfig: s,
      layoutScroll: p,
      layoutRoot: g,
    }))
}
function _y(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : _y(e.parent)
}
function kE({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: r,
  useVisualState: s,
  Component: a,
}) {
  var l, u
  e && vE(e)
  function f(g, x) {
    let h
    const w = { ...v.useContext(gf), ...g, layoutId: RE(g) },
      { isStatic: S } = w,
      N = CE(g),
      C = s(g, S)
    if (!S && vf) {
      AE()
      const E = ME(w)
      ;((h = E.MeasureLayout), (N.visualElement = TE(a, C, w, t, E.ProjectionNode)))
    }
    return d.jsxs(Wl.Provider, {
      value: N,
      children: [
        h && N.visualElement ? d.jsx(h, { visualElement: N.visualElement, ...w }) : null,
        r(a, g, NE(C, N.visualElement, x), C, S, N.visualElement),
      ],
    })
  }
  f.displayName = `motion.${typeof a == 'string' ? a : `create(${(u = (l = a.displayName) !== null && l !== void 0 ? l : a.name) !== null && u !== void 0 ? u : ''})`}`
  const p = v.forwardRef(f)
  return ((p[EE] = a), p)
}
function RE({ layoutId: e }) {
  const t = v.useContext(hf).id
  return t && e !== void 0 ? t + '-' + e : e
}
function AE(e, t) {
  v.useContext(jy).strict
}
function ME(e) {
  const { drag: t, layout: r } = ss
  if (!t && !r) return {}
  const s = { ...t, ...r }
  return {
    MeasureLayout: t?.isEnabled(e) || r?.isEnabled(e) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode,
  }
}
const _E = [
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
function Ef(e) {
  return typeof e != 'string' || e.includes('-') ? !1 : !!(_E.indexOf(e) > -1 || /[A-Z]/u.test(e))
}
function xg(e) {
  const t = [{}, {}]
  return (
    e?.values.forEach((r, s) => {
      ;((t[0][s] = r.get()), (t[1][s] = r.getVelocity()))
    }),
    t
  )
}
function Nf(e, t, r, s) {
  if (typeof t == 'function') {
    const [a, l] = xg(s)
    t = t(r !== void 0 ? r : e.custom, a, l)
  }
  if ((typeof t == 'string' && (t = e.variants && e.variants[t]), typeof t == 'function')) {
    const [a, l] = xg(s)
    t = t(r !== void 0 ? r : e.custom, a, l)
  }
  return t
}
const kd = (e) => Array.isArray(e),
  DE = (e) => !!(e && typeof e == 'object' && e.mix && e.toValue),
  IE = (e) => (kd(e) ? e[e.length - 1] || 0 : e),
  xt = (e) => !!(e && e.getVelocity)
function vl(e) {
  const t = xt(e) ? e.get() : e
  return DE(t) ? t.toValue() : t
}
function OE({ scrapeMotionValuesFromProps: e, createRenderState: t, onUpdate: r }, s, a, l) {
  const u = { latestValues: LE(s, a, l, e), renderState: t() }
  return (
    r && ((u.onMount = (f) => r({ props: s, current: f, ...u })), (u.onUpdate = (f) => r(f))),
    u
  )
}
const Dy = (e) => (t, r) => {
  const s = v.useContext(Wl),
    a = v.useContext($l),
    l = () => OE(e, t, s, a)
  return r ? l() : zl(l)
}
function LE(e, t, r, s) {
  const a = {},
    l = s(e, {})
  for (const w in l) a[w] = vl(l[w])
  let { initial: u, animate: f } = e
  const p = Hl(e),
    g = Ry(e)
  t &&
    g &&
    !p &&
    e.inherit !== !1 &&
    (u === void 0 && (u = t.initial), f === void 0 && (f = t.animate))
  let x = r ? r.initial === !1 : !1
  x = x || u === !1
  const h = x ? f : u
  if (h && typeof h != 'boolean' && !Ul(h)) {
    const w = Array.isArray(h) ? h : [h]
    for (let S = 0; S < w.length; S++) {
      const N = Nf(e, w[S])
      if (N) {
        const { transitionEnd: C, transition: E, ...P } = N
        for (const j in P) {
          let k = P[j]
          if (Array.isArray(k)) {
            const _ = x ? k.length - 1 : 0
            k = k[_]
          }
          k !== null && (a[j] = k)
        }
        for (const j in C) a[j] = C[j]
      }
    }
  }
  return a
}
const us = [
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
  wo = new Set(us),
  Iy = (e) => (t) => typeof t == 'string' && t.startsWith(e),
  Oy = Iy('--'),
  FE = Iy('var(--'),
  Pf = (e) => (FE(e) ? VE.test(e.split('/*')[0].trim()) : !1),
  VE = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  Ly = (e, t) => (t && typeof e == 'number' ? t.transform(e) : e),
  Rn = (e, t, r) => (r > t ? t : r < e ? e : r),
  ds = { test: (e) => typeof e == 'number', parse: parseFloat, transform: (e) => e },
  Si = { ...ds, transform: (e) => Rn(0, 1, e) },
  ll = { ...ds, default: 1 },
  Ri = (e) => ({
    test: (t) => typeof t == 'string' && t.endsWith(e) && t.split(' ').length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  Rr = Ri('deg'),
  Pn = Ri('%'),
  ye = Ri('px'),
  BE = Ri('vh'),
  zE = Ri('vw'),
  wg = { ...Pn, parse: (e) => Pn.parse(e) / 100, transform: (e) => Pn.transform(e * 100) },
  $E = {
    borderWidth: ye,
    borderTopWidth: ye,
    borderRightWidth: ye,
    borderBottomWidth: ye,
    borderLeftWidth: ye,
    borderRadius: ye,
    radius: ye,
    borderTopLeftRadius: ye,
    borderTopRightRadius: ye,
    borderBottomRightRadius: ye,
    borderBottomLeftRadius: ye,
    width: ye,
    maxWidth: ye,
    height: ye,
    maxHeight: ye,
    top: ye,
    right: ye,
    bottom: ye,
    left: ye,
    padding: ye,
    paddingTop: ye,
    paddingRight: ye,
    paddingBottom: ye,
    paddingLeft: ye,
    margin: ye,
    marginTop: ye,
    marginRight: ye,
    marginBottom: ye,
    marginLeft: ye,
    backgroundPositionX: ye,
    backgroundPositionY: ye,
  },
  WE = {
    rotate: Rr,
    rotateX: Rr,
    rotateY: Rr,
    rotateZ: Rr,
    scale: ll,
    scaleX: ll,
    scaleY: ll,
    scaleZ: ll,
    skew: Rr,
    skewX: Rr,
    skewY: Rr,
    distance: ye,
    translateX: ye,
    translateY: ye,
    translateZ: ye,
    x: ye,
    y: ye,
    z: ye,
    perspective: ye,
    transformPerspective: ye,
    opacity: Si,
    originX: wg,
    originY: wg,
    originZ: ye,
  },
  bg = { ...ds, transform: Math.round },
  Tf = { ...$E, ...WE, zIndex: bg, size: ye, fillOpacity: Si, strokeOpacity: Si, numOctaves: bg },
  UE = { x: 'translateX', y: 'translateY', z: 'translateZ', transformPerspective: 'perspective' },
  HE = us.length
function GE(e, t, r) {
  let s = '',
    a = !0
  for (let l = 0; l < HE; l++) {
    const u = us[l],
      f = e[u]
    if (f === void 0) continue
    let p = !0
    if (
      (typeof f == 'number'
        ? (p = f === (u.startsWith('scale') ? 1 : 0))
        : (p = parseFloat(f) === 0),
      !p || r)
    ) {
      const g = Ly(f, Tf[u])
      if (!p) {
        a = !1
        const x = UE[u] || u
        s += `${x}(${g}) `
      }
      r && (t[u] = g)
    }
  }
  return ((s = s.trim()), r ? (s = r(t, a ? '' : s)) : a && (s = 'none'), s)
}
function jf(e, t, r) {
  const { style: s, vars: a, transformOrigin: l } = e
  let u = !1,
    f = !1
  for (const p in t) {
    const g = t[p]
    if (wo.has(p)) {
      u = !0
      continue
    } else if (Oy(p)) {
      a[p] = g
      continue
    } else {
      const x = Ly(g, Tf[p])
      p.startsWith('origin') ? ((f = !0), (l[p] = x)) : (s[p] = x)
    }
  }
  if (
    (t.transform ||
      (u || r ? (s.transform = GE(t, e.transform, r)) : s.transform && (s.transform = 'none')),
    f)
  ) {
    const { originX: p = '50%', originY: g = '50%', originZ: x = 0 } = l
    s.transformOrigin = `${p} ${g} ${x}`
  }
}
const KE = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  YE = { offset: 'strokeDashoffset', array: 'strokeDasharray' }
function XE(e, t, r = 1, s = 0, a = !0) {
  e.pathLength = 1
  const l = a ? KE : YE
  e[l.offset] = ye.transform(-s)
  const u = ye.transform(t),
    f = ye.transform(r)
  e[l.array] = `${u} ${f}`
}
function Sg(e, t, r) {
  return typeof e == 'string' ? e : ye.transform(t + r * e)
}
function qE(e, t, r) {
  const s = Sg(t, e.x, e.width),
    a = Sg(r, e.y, e.height)
  return `${s} ${a}`
}
function kf(
  e,
  {
    attrX: t,
    attrY: r,
    attrScale: s,
    originX: a,
    originY: l,
    pathLength: u,
    pathSpacing: f = 1,
    pathOffset: p = 0,
    ...g
  },
  x,
  h
) {
  if ((jf(e, g, h), x)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox)
    return
  }
  ;((e.attrs = e.style), (e.style = {}))
  const { attrs: w, style: S, dimensions: N } = e
  ;(w.transform && (N && (S.transform = w.transform), delete w.transform),
    N &&
      (a !== void 0 || l !== void 0 || S.transform) &&
      (S.transformOrigin = qE(N, a !== void 0 ? a : 0.5, l !== void 0 ? l : 0.5)),
    t !== void 0 && (w.x = t),
    r !== void 0 && (w.y = r),
    s !== void 0 && (w.scale = s),
    u !== void 0 && XE(w, u, f, p, !1))
}
const Rf = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} }),
  Fy = () => ({ ...Rf(), attrs: {} }),
  Af = (e) => typeof e == 'string' && e.toLowerCase() === 'svg'
function Vy(e, { style: t, vars: r }, s, a) {
  Object.assign(e.style, t, a && a.getProjectionStyles(s))
  for (const l in r) e.style.setProperty(l, r[l])
}
const By = new Set([
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
function zy(e, t, r, s) {
  Vy(e, t, void 0, s)
  for (const a in t.attrs) e.setAttribute(By.has(a) ? a : Sf(a), t.attrs[a])
}
const Pl = {}
function QE(e) {
  Object.assign(Pl, e)
}
function $y(e, { layout: t, layoutId: r }) {
  return (
    wo.has(e) || e.startsWith('origin') || ((t || r !== void 0) && (!!Pl[e] || e === 'opacity'))
  )
}
function Mf(e, t, r) {
  var s
  const { style: a } = e,
    l = {}
  for (const u in a)
    (xt(a[u]) ||
      (t.style && xt(t.style[u])) ||
      $y(u, e) ||
      ((s = r?.getValue(u)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) &&
      (l[u] = a[u])
  return l
}
function Wy(e, t, r) {
  const s = Mf(e, t, r)
  for (const a in e)
    if (xt(e[a]) || xt(t[a])) {
      const l = us.indexOf(a) !== -1 ? 'attr' + a.charAt(0).toUpperCase() + a.substring(1) : a
      s[l] = e[a]
    }
  return s
}
function ZE(e, t) {
  try {
    t.dimensions = typeof e.getBBox == 'function' ? e.getBBox() : e.getBoundingClientRect()
  } catch {
    t.dimensions = { x: 0, y: 0, width: 0, height: 0 }
  }
}
const Cg = ['x', 'y', 'width', 'height', 'cx', 'cy', 'r'],
  JE = {
    useVisualState: Dy({
      scrapeMotionValuesFromProps: Wy,
      createRenderState: Fy,
      onUpdate: ({ props: e, prevProps: t, current: r, renderState: s, latestValues: a }) => {
        if (!r) return
        let l = !!e.drag
        if (!l) {
          for (const f in a)
            if (wo.has(f)) {
              l = !0
              break
            }
        }
        if (!l) return
        let u = !t
        if (t)
          for (let f = 0; f < Cg.length; f++) {
            const p = Cg[f]
            e[p] !== t[p] && (u = !0)
          }
        u &&
          _e.read(() => {
            ;(ZE(r, s),
              _e.render(() => {
                ;(kf(s, a, Af(r.tagName), e.transformTemplate), zy(r, s))
              }))
          })
      },
    }),
  },
  eN = { useVisualState: Dy({ scrapeMotionValuesFromProps: Mf, createRenderState: Rf }) }
function Uy(e, t, r) {
  for (const s in t) !xt(t[s]) && !$y(s, r) && (e[s] = t[s])
}
function tN({ transformTemplate: e }, t) {
  return v.useMemo(() => {
    const r = Rf()
    return (jf(r, t, e), Object.assign({}, r.vars, r.style))
  }, [t])
}
function nN(e, t) {
  const r = e.style || {},
    s = {}
  return (Uy(s, r, e), Object.assign(s, tN(e, t)), s)
}
function rN(e, t) {
  const r = {},
    s = nN(e, t)
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((r.draggable = !1),
      (s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = 'none'),
      (s.touchAction = e.drag === !0 ? 'none' : `pan-${e.drag === 'x' ? 'y' : 'x'}`)),
    e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (r.tabIndex = 0),
    (r.style = s),
    r
  )
}
function oN(e, t, r, s) {
  const a = v.useMemo(() => {
    const l = Fy()
    return (kf(l, t, Af(s), e.transformTemplate), { ...l.attrs, style: { ...l.style } })
  }, [t])
  if (e.style) {
    const l = {}
    ;(Uy(l, e.style, e), (a.style = { ...l, ...a.style }))
  }
  return a
}
function sN(e = !1) {
  return (r, s, a, { latestValues: l }, u) => {
    const p = (Ef(r) ? oN : rN)(s, l, u, r),
      g = wE(s, typeof r == 'string', e),
      x = r !== v.Fragment ? { ...g, ...p, ref: a } : {},
      { children: h } = s,
      w = v.useMemo(() => (xt(h) ? h.get() : h), [h])
    return v.createElement(r, { ...x, children: w })
  }
}
function iN(e, t) {
  return function (s, { forwardMotionProps: a } = { forwardMotionProps: !1 }) {
    const u = {
      ...(Ef(s) ? JE : eN),
      preloadedFeatures: e,
      useRender: sN(a),
      createVisualElement: t,
      Component: s,
    }
    return kE(u)
  }
}
function Hy(e, t) {
  if (!Array.isArray(t)) return !1
  const r = t.length
  if (r !== e.length) return !1
  for (let s = 0; s < r; s++) if (t[s] !== e[s]) return !1
  return !0
}
function Gl(e, t, r) {
  const s = e.getProps()
  return Nf(s, t, r !== void 0 ? r : s.custom, e)
}
const Gy = xf(() => window.ScrollTimeline !== void 0)
class aN {
  constructor(t) {
    ;((this.stop = () => this.runAll('stop')), (this.animations = t.filter(Boolean)))
  }
  get finished() {
    return Promise.all(this.animations.map((t) => ('finished' in t ? t.finished : t)))
  }
  getAll(t) {
    return this.animations[0][t]
  }
  setAll(t, r) {
    for (let s = 0; s < this.animations.length; s++) this.animations[s][t] = r
  }
  attachTimeline(t, r) {
    const s = this.animations.map((a) => {
      if (Gy() && a.attachTimeline) return a.attachTimeline(t)
      if (typeof r == 'function') return r(a)
    })
    return () => {
      s.forEach((a, l) => {
        ;(a && a(), this.animations[l].stop())
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
    for (let r = 0; r < this.animations.length; r++) t = Math.max(t, this.animations[r].duration)
    return t
  }
  runAll(t) {
    this.animations.forEach((r) => r[t]())
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
class lN extends aN {
  then(t, r) {
    return Promise.all(this.animations).then(t).catch(r)
  }
}
function _f(e, t) {
  return e ? e[t] || e.default || e : void 0
}
const Rd = 2e4
function Ky(e) {
  let t = 0
  const r = 50
  let s = e.next(t)
  for (; !s.done && t < Rd; ) ((t += r), (s = e.next(t)))
  return t >= Rd ? 1 / 0 : t
}
function Df(e) {
  return typeof e == 'function'
}
function Eg(e, t) {
  ;((e.timeline = t), (e.onfinish = null))
}
const If = (e) => Array.isArray(e) && typeof e[0] == 'number',
  cN = { linearEasing: void 0 }
function uN(e, t) {
  const r = xf(e)
  return () => {
    var s
    return (s = cN[t]) !== null && s !== void 0 ? s : r()
  }
}
const Tl = uN(() => {
    try {
      document.createElement('div').animate({ opacity: 0 }, { easing: 'linear(0, 1)' })
    } catch {
      return !1
    }
    return !0
  }, 'linearEasing'),
  Yy = (e, t, r = 10) => {
    let s = ''
    const a = Math.max(Math.round(t / r), 2)
    for (let l = 0; l < a; l++) s += e(mo(0, a - 1, l)) + ', '
    return `linear(${s.substring(0, s.length - 2)})`
  }
function Xy(e) {
  return !!(
    (typeof e == 'function' && Tl()) ||
    !e ||
    (typeof e == 'string' && (e in Ad || Tl())) ||
    If(e) ||
    (Array.isArray(e) && e.every(Xy))
  )
}
const ui = ([e, t, r, s]) => `cubic-bezier(${e}, ${t}, ${r}, ${s})`,
  Ad = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: ui([0, 0.65, 0.55, 1]),
    circOut: ui([0.55, 0, 1, 0.45]),
    backIn: ui([0.31, 0.01, 0.66, -0.59]),
    backOut: ui([0.33, 1.53, 0.69, 0.99]),
  }
function qy(e, t) {
  if (e)
    return typeof e == 'function' && Tl()
      ? Yy(e, t)
      : If(e)
        ? ui(e)
        : Array.isArray(e)
          ? e.map((r) => qy(r, t) || Ad.easeOut)
          : Ad[e]
}
const pn = { x: !1, y: !1 }
function Qy() {
  return pn.x || pn.y
}
function Of(e, t, r) {
  var s
  if (e instanceof Element) return [e]
  if (typeof e == 'string') {
    let a = document
    const l = (s = void 0) !== null && s !== void 0 ? s : a.querySelectorAll(e)
    return l ? Array.from(l) : []
  }
  return Array.from(e)
}
function Zy(e, t) {
  const r = Of(e),
    s = new AbortController(),
    a = { passive: !0, ...t, signal: s.signal }
  return [r, a, () => s.abort()]
}
function Ng(e) {
  return (t) => {
    t.pointerType === 'touch' || Qy() || e(t)
  }
}
function dN(e, t, r = {}) {
  const [s, a, l] = Zy(e, r),
    u = Ng((f) => {
      const { target: p } = f,
        g = t(f)
      if (typeof g != 'function' || !p) return
      const x = Ng((h) => {
        ;(g(h), p.removeEventListener('pointerleave', x))
      })
      p.addEventListener('pointerleave', x, a)
    })
  return (
    s.forEach((f) => {
      f.addEventListener('pointerenter', u, a)
    }),
    l
  )
}
const Jy = (e, t) => (t ? (e === t ? !0 : Jy(e, t.parentElement)) : !1),
  Lf = (e) =>
    e.pointerType === 'mouse' ? typeof e.button != 'number' || e.button <= 0 : e.isPrimary !== !1,
  fN = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'])
function pN(e) {
  return fN.has(e.tagName) || e.tabIndex !== -1
}
const di = new WeakSet()
function Pg(e) {
  return (t) => {
    t.key === 'Enter' && e(t)
  }
}
function td(e, t) {
  e.dispatchEvent(new PointerEvent('pointer' + t, { isPrimary: !0, bubbles: !0 }))
}
const mN = (e, t) => {
  const r = e.currentTarget
  if (!r) return
  const s = Pg(() => {
    if (di.has(r)) return
    td(r, 'down')
    const a = Pg(() => {
        td(r, 'up')
      }),
      l = () => td(r, 'cancel')
    ;(r.addEventListener('keyup', a, t), r.addEventListener('blur', l, t))
  })
  ;(r.addEventListener('keydown', s, t),
    r.addEventListener('blur', () => r.removeEventListener('keydown', s), t))
}
function Tg(e) {
  return Lf(e) && !Qy()
}
function hN(e, t, r = {}) {
  const [s, a, l] = Zy(e, r),
    u = (f) => {
      const p = f.currentTarget
      if (!Tg(f) || di.has(p)) return
      di.add(p)
      const g = t(f),
        x = (S, N) => {
          ;(window.removeEventListener('pointerup', h),
            window.removeEventListener('pointercancel', w),
            !(!Tg(S) || !di.has(p)) &&
              (di.delete(p), typeof g == 'function' && g(S, { success: N })))
        },
        h = (S) => {
          x(S, r.useGlobalTarget || Jy(p, S.target))
        },
        w = (S) => {
          x(S, !1)
        }
      ;(window.addEventListener('pointerup', h, a), window.addEventListener('pointercancel', w, a))
    }
  return (
    s.forEach((f) => {
      ;(!pN(f) && f.getAttribute('tabindex') === null && (f.tabIndex = 0),
        (r.useGlobalTarget ? window : f).addEventListener('pointerdown', u, a),
        f.addEventListener('focus', (g) => mN(g, a), a))
    }),
    l
  )
}
function gN(e) {
  return e === 'x' || e === 'y'
    ? pn[e]
      ? null
      : ((pn[e] = !0),
        () => {
          pn[e] = !1
        })
    : pn.x || pn.y
      ? null
      : ((pn.x = pn.y = !0),
        () => {
          pn.x = pn.y = !1
        })
}
const ex = new Set(['width', 'height', 'top', 'left', 'right', 'bottom', ...us])
let yl
function vN() {
  yl = void 0
}
const Tn = {
  now: () => (
    yl === void 0 &&
      Tn.set(at.isProcessing || mE.useManualTiming ? at.timestamp : performance.now()),
    yl
  ),
  set: (e) => {
    ;((yl = e), queueMicrotask(vN))
  },
}
function Ff(e, t) {
  e.indexOf(t) === -1 && e.push(t)
}
function Vf(e, t) {
  const r = e.indexOf(t)
  r > -1 && e.splice(r, 1)
}
class Bf {
  constructor() {
    this.subscriptions = []
  }
  add(t) {
    return (Ff(this.subscriptions, t), () => Vf(this.subscriptions, t))
  }
  notify(t, r, s) {
    const a = this.subscriptions.length
    if (a)
      if (a === 1) this.subscriptions[0](t, r, s)
      else
        for (let l = 0; l < a; l++) {
          const u = this.subscriptions[l]
          u && u(t, r, s)
        }
  }
  getSize() {
    return this.subscriptions.length
  }
  clear() {
    this.subscriptions.length = 0
  }
}
function zf(e, t) {
  return t ? e * (1e3 / t) : 0
}
const jg = 30,
  yN = (e) => !isNaN(parseFloat(e))
class xN {
  constructor(t, r = {}) {
    ;((this.version = '11.18.2'),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (s, a = !0) => {
        const l = Tn.now()
        ;(this.updatedAt !== l && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(s),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          a && this.events.renderRequest && this.events.renderRequest.notify(this.current))
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = r.owner))
  }
  setCurrent(t) {
    ;((this.current = t),
      (this.updatedAt = Tn.now()),
      this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = yN(this.current)))
  }
  setPrevFrameValue(t = this.current) {
    ;((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt))
  }
  onChange(t) {
    return this.on('change', t)
  }
  on(t, r) {
    this.events[t] || (this.events[t] = new Bf())
    const s = this.events[t].add(r)
    return t === 'change'
      ? () => {
          ;(s(),
            _e.read(() => {
              this.events.change.getSize() || this.stop()
            }))
        }
      : s
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear()
  }
  attach(t, r) {
    ;((this.passiveEffect = t), (this.stopPassiveEffect = r))
  }
  set(t, r = !0) {
    !r || !this.passiveEffect
      ? this.updateAndNotify(t, r)
      : this.passiveEffect(t, this.updateAndNotify)
  }
  setWithVelocity(t, r, s) {
    ;(this.set(r),
      (this.prev = void 0),
      (this.prevFrameValue = t),
      (this.prevUpdatedAt = this.updatedAt - s))
  }
  jump(t, r = !0) {
    ;(this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      r && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect())
  }
  get() {
    return this.current
  }
  getPrevious() {
    return this.prev
  }
  getVelocity() {
    const t = Tn.now()
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > jg)
      return 0
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, jg)
    return zf(parseFloat(this.current) - parseFloat(this.prevFrameValue), r)
  }
  start(t) {
    return (
      this.stop(),
      new Promise((r) => {
        ;((this.hasAnimated = !0),
          (this.animation = t(r)),
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
function Gn(e, t) {
  return new xN(e, t)
}
function wN(e, t, r) {
  e.hasValue(t) ? e.getValue(t).set(r) : e.addValue(t, Gn(r))
}
function bN(e, t) {
  const r = Gl(e, t)
  let { transitionEnd: s = {}, transition: a = {}, ...l } = r || {}
  l = { ...l, ...s }
  for (const u in l) {
    const f = IE(l[u])
    wN(e, u, f)
  }
}
function SN(e) {
  return !!(xt(e) && e.add)
}
function Md(e, t) {
  const r = e.getValue('willChange')
  if (SN(r)) return r.add(t)
}
function tx(e) {
  return e.props[Ay]
}
const nx = (e, t, r) => (((1 - 3 * r + 3 * t) * e + (3 * r - 6 * t)) * e + 3 * t) * e,
  CN = 1e-7,
  EN = 12
function NN(e, t, r, s, a) {
  let l,
    u,
    f = 0
  do ((u = t + (r - t) / 2), (l = nx(u, s, a) - e), l > 0 ? (r = u) : (t = u))
  while (Math.abs(l) > CN && ++f < EN)
  return u
}
function Ai(e, t, r, s) {
  if (e === t && r === s) return Et
  const a = (l) => NN(l, 0, 1, e, r)
  return (l) => (l === 0 || l === 1 ? l : nx(a(l), t, s))
}
const rx = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  ox = (e) => (t) => 1 - e(1 - t),
  sx = Ai(0.33, 1.53, 0.69, 0.99),
  $f = ox(sx),
  ix = rx($f),
  ax = (e) => ((e *= 2) < 1 ? 0.5 * $f(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1)))),
  Wf = (e) => 1 - Math.sin(Math.acos(e)),
  lx = ox(Wf),
  cx = rx(Wf),
  ux = (e) => /^0[^.\s]+$/u.test(e)
function PN(e) {
  return typeof e == 'number' ? e === 0 : e !== null ? e === 'none' || e === '0' || ux(e) : !0
}
const hi = (e) => Math.round(e * 1e5) / 1e5,
  Uf = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu
function TN(e) {
  return e == null
}
const jN =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  Hf = (e, t) => (r) =>
    !!(
      (typeof r == 'string' && jN.test(r) && r.startsWith(e)) ||
      (t && !TN(r) && Object.prototype.hasOwnProperty.call(r, t))
    ),
  dx = (e, t, r) => (s) => {
    if (typeof s != 'string') return s
    const [a, l, u, f] = s.match(Uf)
    return {
      [e]: parseFloat(a),
      [t]: parseFloat(l),
      [r]: parseFloat(u),
      alpha: f !== void 0 ? parseFloat(f) : 1,
    }
  },
  kN = (e) => Rn(0, 255, e),
  nd = { ...ds, transform: (e) => Math.round(kN(e)) },
  fo = {
    test: Hf('rgb', 'red'),
    parse: dx('red', 'green', 'blue'),
    transform: ({ red: e, green: t, blue: r, alpha: s = 1 }) =>
      'rgba(' +
      nd.transform(e) +
      ', ' +
      nd.transform(t) +
      ', ' +
      nd.transform(r) +
      ', ' +
      hi(Si.transform(s)) +
      ')',
  }
function RN(e) {
  let t = '',
    r = '',
    s = '',
    a = ''
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (r = e.substring(3, 5)),
        (s = e.substring(5, 7)),
        (a = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (r = e.substring(2, 3)),
        (s = e.substring(3, 4)),
        (a = e.substring(4, 5)),
        (t += t),
        (r += r),
        (s += s),
        (a += a)),
    {
      red: parseInt(t, 16),
      green: parseInt(r, 16),
      blue: parseInt(s, 16),
      alpha: a ? parseInt(a, 16) / 255 : 1,
    }
  )
}
const _d = { test: Hf('#'), parse: RN, transform: fo.transform },
  Qo = {
    test: Hf('hsl', 'hue'),
    parse: dx('hue', 'saturation', 'lightness'),
    transform: ({ hue: e, saturation: t, lightness: r, alpha: s = 1 }) =>
      'hsla(' +
      Math.round(e) +
      ', ' +
      Pn.transform(hi(t)) +
      ', ' +
      Pn.transform(hi(r)) +
      ', ' +
      hi(Si.transform(s)) +
      ')',
  },
  yt = {
    test: (e) => fo.test(e) || _d.test(e) || Qo.test(e),
    parse: (e) => (fo.test(e) ? fo.parse(e) : Qo.test(e) ? Qo.parse(e) : _d.parse(e)),
    transform: (e) =>
      typeof e == 'string' ? e : e.hasOwnProperty('red') ? fo.transform(e) : Qo.transform(e),
  },
  AN =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu
function MN(e) {
  var t, r
  return (
    isNaN(e) &&
    typeof e == 'string' &&
    (((t = e.match(Uf)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((r = e.match(AN)) === null || r === void 0 ? void 0 : r.length) || 0) >
      0
  )
}
const fx = 'number',
  px = 'color',
  _N = 'var',
  DN = 'var(',
  kg = '${}',
  IN =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu
function Ci(e) {
  const t = e.toString(),
    r = [],
    s = { color: [], number: [], var: [] },
    a = []
  let l = 0
  const f = t
    .replace(
      IN,
      (p) => (
        yt.test(p)
          ? (s.color.push(l), a.push(px), r.push(yt.parse(p)))
          : p.startsWith(DN)
            ? (s.var.push(l), a.push(_N), r.push(p))
            : (s.number.push(l), a.push(fx), r.push(parseFloat(p))),
        ++l,
        kg
      )
    )
    .split(kg)
  return { values: r, split: f, indexes: s, types: a }
}
function mx(e) {
  return Ci(e).values
}
function hx(e) {
  const { split: t, types: r } = Ci(e),
    s = t.length
  return (a) => {
    let l = ''
    for (let u = 0; u < s; u++)
      if (((l += t[u]), a[u] !== void 0)) {
        const f = r[u]
        f === fx ? (l += hi(a[u])) : f === px ? (l += yt.transform(a[u])) : (l += a[u])
      }
    return l
  }
}
const ON = (e) => (typeof e == 'number' ? 0 : e)
function LN(e) {
  const t = mx(e)
  return hx(e)(t.map(ON))
}
const Dr = { test: MN, parse: mx, createTransformer: hx, getAnimatableNone: LN },
  FN = new Set(['brightness', 'contrast', 'saturate', 'opacity'])
function VN(e) {
  const [t, r] = e.slice(0, -1).split('(')
  if (t === 'drop-shadow') return e
  const [s] = r.match(Uf) || []
  if (!s) return e
  const a = r.replace(s, '')
  let l = FN.has(t) ? 1 : 0
  return (s !== r && (l *= 100), t + '(' + l + a + ')')
}
const BN = /\b([a-z-]*)\(.*?\)/gu,
  Dd = {
    ...Dr,
    getAnimatableNone: (e) => {
      const t = e.match(BN)
      return t ? t.map(VN).join(' ') : e
    },
  },
  zN = {
    ...Tf,
    color: yt,
    backgroundColor: yt,
    outlineColor: yt,
    fill: yt,
    stroke: yt,
    borderColor: yt,
    borderTopColor: yt,
    borderRightColor: yt,
    borderBottomColor: yt,
    borderLeftColor: yt,
    filter: Dd,
    WebkitFilter: Dd,
  },
  Gf = (e) => zN[e]
function gx(e, t) {
  let r = Gf(e)
  return (r !== Dd && (r = Dr), r.getAnimatableNone ? r.getAnimatableNone(t) : void 0)
}
const $N = new Set(['auto', 'none', '0'])
function WN(e, t, r) {
  let s = 0,
    a
  for (; s < e.length && !a; ) {
    const l = e[s]
    ;(typeof l == 'string' && !$N.has(l) && Ci(l).values.length && (a = e[s]), s++)
  }
  if (a && r) for (const l of t) e[l] = gx(r, a)
}
const Rg = (e) => e === ds || e === ye,
  Ag = (e, t) => parseFloat(e.split(', ')[t]),
  Mg =
    (e, t) =>
    (r, { transform: s }) => {
      if (s === 'none' || !s) return 0
      const a = s.match(/^matrix3d\((.+)\)$/u)
      if (a) return Ag(a[1], t)
      {
        const l = s.match(/^matrix\((.+)\)$/u)
        return l ? Ag(l[1], e) : 0
      }
    },
  UN = new Set(['x', 'y', 'z']),
  HN = us.filter((e) => !UN.has(e))
function GN(e) {
  const t = []
  return (
    HN.forEach((r) => {
      const s = e.getValue(r)
      s !== void 0 && (t.push([r, s.get()]), s.set(r.startsWith('scale') ? 1 : 0))
    }),
    t
  )
}
const is = {
  width: ({ x: e }, { paddingLeft: t = '0', paddingRight: r = '0' }) =>
    e.max - e.min - parseFloat(t) - parseFloat(r),
  height: ({ y: e }, { paddingTop: t = '0', paddingBottom: r = '0' }) =>
    e.max - e.min - parseFloat(t) - parseFloat(r),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: Mg(4, 13),
  y: Mg(5, 14),
}
is.translateX = is.x
is.translateY = is.y
const po = new Set()
let Id = !1,
  Od = !1
function vx() {
  if (Od) {
    const e = Array.from(po).filter((s) => s.needsMeasurement),
      t = new Set(e.map((s) => s.element)),
      r = new Map()
    ;(t.forEach((s) => {
      const a = GN(s)
      a.length && (r.set(s, a), s.render())
    }),
      e.forEach((s) => s.measureInitialState()),
      t.forEach((s) => {
        s.render()
        const a = r.get(s)
        a &&
          a.forEach(([l, u]) => {
            var f
            ;(f = s.getValue(l)) === null || f === void 0 || f.set(u)
          })
      }),
      e.forEach((s) => s.measureEndState()),
      e.forEach((s) => {
        s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY)
      }))
  }
  ;((Od = !1), (Id = !1), po.forEach((e) => e.complete()), po.clear())
}
function yx() {
  po.forEach((e) => {
    ;(e.readKeyframes(), e.needsMeasurement && (Od = !0))
  })
}
function KN() {
  ;(yx(), vx())
}
class Kf {
  constructor(t, r, s, a, l, u = !1) {
    ;((this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = r),
      (this.name = s),
      (this.motionValue = a),
      (this.element = l),
      (this.isAsync = u))
  }
  scheduleResolve() {
    ;((this.isScheduled = !0),
      this.isAsync
        ? (po.add(this), Id || ((Id = !0), _e.read(yx), _e.resolveKeyframes(vx)))
        : (this.readKeyframes(), this.complete()))
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: r, element: s, motionValue: a } = this
    for (let l = 0; l < t.length; l++)
      if (t[l] === null)
        if (l === 0) {
          const u = a?.get(),
            f = t[t.length - 1]
          if (u !== void 0) t[0] = u
          else if (s && r) {
            const p = s.readValue(r, f)
            p != null && (t[0] = p)
          }
          ;(t[0] === void 0 && (t[0] = f), a && u === void 0 && a.set(t[0]))
        } else t[l] = t[l - 1]
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    ;((this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      po.delete(this))
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), po.delete(this))
  }
  resume() {
    this.isComplete || this.scheduleResolve()
  }
}
const xx = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  YN = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
function XN(e) {
  const t = YN.exec(e)
  if (!t) return [,]
  const [, r, s, a] = t
  return [`--${r ?? s}`, a]
}
function wx(e, t, r = 1) {
  const [s, a] = XN(e)
  if (!s) return
  const l = window.getComputedStyle(t).getPropertyValue(s)
  if (l) {
    const u = l.trim()
    return xx(u) ? parseFloat(u) : u
  }
  return Pf(a) ? wx(a, t, r + 1) : a
}
const bx = (e) => (t) => t.test(e),
  qN = { test: (e) => e === 'auto', parse: (e) => e },
  Sx = [ds, ye, Pn, Rr, zE, BE, qN],
  _g = (e) => Sx.find(bx(e))
class Cx extends Kf {
  constructor(t, r, s, a, l) {
    super(t, r, s, a, l, !0)
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: r, name: s } = this
    if (!r || !r.current) return
    super.readKeyframes()
    for (let p = 0; p < t.length; p++) {
      let g = t[p]
      if (typeof g == 'string' && ((g = g.trim()), Pf(g))) {
        const x = wx(g, r.current)
        ;(x !== void 0 && (t[p] = x), p === t.length - 1 && (this.finalKeyframe = g))
      }
    }
    if ((this.resolveNoneKeyframes(), !ex.has(s) || t.length !== 2)) return
    const [a, l] = t,
      u = _g(a),
      f = _g(l)
    if (u !== f)
      if (Rg(u) && Rg(f))
        for (let p = 0; p < t.length; p++) {
          const g = t[p]
          typeof g == 'string' && (t[p] = parseFloat(g))
        }
      else this.needsMeasurement = !0
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: r } = this,
      s = []
    for (let a = 0; a < t.length; a++) PN(t[a]) && s.push(a)
    s.length && WN(t, s, r)
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: r, name: s } = this
    if (!t || !t.current) return
    ;(s === 'height' && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = is[s](t.measureViewportBox(), window.getComputedStyle(t.current))),
      (r[0] = this.measuredOrigin))
    const a = r[r.length - 1]
    a !== void 0 && t.getValue(s, a).jump(a, !1)
  }
  measureEndState() {
    var t
    const { element: r, name: s, unresolvedKeyframes: a } = this
    if (!r || !r.current) return
    const l = r.getValue(s)
    l && l.jump(this.measuredOrigin, !1)
    const u = a.length - 1,
      f = a[u]
    ;((a[u] = is[s](r.measureViewportBox(), window.getComputedStyle(r.current))),
      f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f),
      !((t = this.removedTransforms) === null || t === void 0) &&
        t.length &&
        this.removedTransforms.forEach(([p, g]) => {
          r.getValue(p).set(g)
        }),
      this.resolveNoneKeyframes())
  }
}
const Dg = (e, t) =>
  t === 'zIndex'
    ? !1
    : !!(
        typeof e == 'number' ||
        Array.isArray(e) ||
        (typeof e == 'string' && (Dr.test(e) || e === '0') && !e.startsWith('url('))
      )
function QN(e) {
  const t = e[0]
  if (e.length === 1) return !0
  for (let r = 0; r < e.length; r++) if (e[r] !== t) return !0
}
function ZN(e, t, r, s) {
  const a = e[0]
  if (a === null) return !1
  if (t === 'display' || t === 'visibility') return !0
  const l = e[e.length - 1],
    u = Dg(a, t),
    f = Dg(l, t)
  return !u || !f ? !1 : QN(e) || ((r === 'spring' || Df(r)) && s)
}
const JN = (e) => e !== null
function Kl(e, { repeat: t, repeatType: r = 'loop' }, s) {
  const a = e.filter(JN),
    l = t && r !== 'loop' && t % 2 === 1 ? 0 : a.length - 1
  return !l || s === void 0 ? a[l] : s
}
const eP = 40
class Ex {
  constructor({
    autoplay: t = !0,
    delay: r = 0,
    type: s = 'keyframes',
    repeat: a = 0,
    repeatDelay: l = 0,
    repeatType: u = 'loop',
    ...f
  }) {
    ;((this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = Tn.now()),
      (this.options = {
        autoplay: t,
        delay: r,
        type: s,
        repeat: a,
        repeatDelay: l,
        repeatType: u,
        ...f,
      }),
      this.updateFinishedPromise())
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > eP
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt
  }
  get resolved() {
    return (!this._resolved && !this.hasAttemptedResolve && KN(), this._resolved)
  }
  onKeyframesResolved(t, r) {
    ;((this.resolvedAt = Tn.now()), (this.hasAttemptedResolve = !0))
    const {
      name: s,
      type: a,
      velocity: l,
      delay: u,
      onComplete: f,
      onUpdate: p,
      isGenerator: g,
    } = this.options
    if (!g && !ZN(t, s, a, l))
      if (u) this.options.duration = 0
      else {
        ;(p && p(Kl(t, this.options, r)), f && f(), this.resolveFinishedPromise())
        return
      }
    const x = this.initPlayback(t, r)
    x !== !1 && ((this._resolved = { keyframes: t, finalKeyframe: r, ...x }), this.onPostResolved())
  }
  onPostResolved() {}
  then(t, r) {
    return this.currentFinishedPromise.then(t, r)
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
const We = (e, t, r) => e + (t - e) * r
function rd(e, t, r) {
  return (
    r < 0 && (r += 1),
    r > 1 && (r -= 1),
    r < 1 / 6 ? e + (t - e) * 6 * r : r < 1 / 2 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e
  )
}
function tP({ hue: e, saturation: t, lightness: r, alpha: s }) {
  ;((e /= 360), (t /= 100), (r /= 100))
  let a = 0,
    l = 0,
    u = 0
  if (!t) a = l = u = r
  else {
    const f = r < 0.5 ? r * (1 + t) : r + t - r * t,
      p = 2 * r - f
    ;((a = rd(p, f, e + 1 / 3)), (l = rd(p, f, e)), (u = rd(p, f, e - 1 / 3)))
  }
  return {
    red: Math.round(a * 255),
    green: Math.round(l * 255),
    blue: Math.round(u * 255),
    alpha: s,
  }
}
function jl(e, t) {
  return (r) => (r > 0 ? t : e)
}
const od = (e, t, r) => {
    const s = e * e,
      a = r * (t * t - s) + s
    return a < 0 ? 0 : Math.sqrt(a)
  },
  nP = [_d, fo, Qo],
  rP = (e) => nP.find((t) => t.test(e))
function Ig(e) {
  const t = rP(e)
  if (!t) return !1
  let r = t.parse(e)
  return (t === Qo && (r = tP(r)), r)
}
const Og = (e, t) => {
    const r = Ig(e),
      s = Ig(t)
    if (!r || !s) return jl(e, t)
    const a = { ...r }
    return (l) => (
      (a.red = od(r.red, s.red, l)),
      (a.green = od(r.green, s.green, l)),
      (a.blue = od(r.blue, s.blue, l)),
      (a.alpha = We(r.alpha, s.alpha, l)),
      fo.transform(a)
    )
  },
  oP = (e, t) => (r) => t(e(r)),
  Mi = (...e) => e.reduce(oP),
  Ld = new Set(['none', 'hidden'])
function sP(e, t) {
  return Ld.has(e) ? (r) => (r <= 0 ? e : t) : (r) => (r >= 1 ? t : e)
}
function iP(e, t) {
  return (r) => We(e, t, r)
}
function Yf(e) {
  return typeof e == 'number'
    ? iP
    : typeof e == 'string'
      ? Pf(e)
        ? jl
        : yt.test(e)
          ? Og
          : cP
      : Array.isArray(e)
        ? Nx
        : typeof e == 'object'
          ? yt.test(e)
            ? Og
            : aP
          : jl
}
function Nx(e, t) {
  const r = [...e],
    s = r.length,
    a = e.map((l, u) => Yf(l)(l, t[u]))
  return (l) => {
    for (let u = 0; u < s; u++) r[u] = a[u](l)
    return r
  }
}
function aP(e, t) {
  const r = { ...e, ...t },
    s = {}
  for (const a in r) e[a] !== void 0 && t[a] !== void 0 && (s[a] = Yf(e[a])(e[a], t[a]))
  return (a) => {
    for (const l in s) r[l] = s[l](a)
    return r
  }
}
function lP(e, t) {
  var r
  const s = [],
    a = { color: 0, var: 0, number: 0 }
  for (let l = 0; l < t.values.length; l++) {
    const u = t.types[l],
      f = e.indexes[u][a[u]],
      p = (r = e.values[f]) !== null && r !== void 0 ? r : 0
    ;((s[l] = p), a[u]++)
  }
  return s
}
const cP = (e, t) => {
  const r = Dr.createTransformer(t),
    s = Ci(e),
    a = Ci(t)
  return s.indexes.var.length === a.indexes.var.length &&
    s.indexes.color.length === a.indexes.color.length &&
    s.indexes.number.length >= a.indexes.number.length
    ? (Ld.has(e) && !a.values.length) || (Ld.has(t) && !s.values.length)
      ? sP(e, t)
      : Mi(Nx(lP(s, a), a.values), r)
    : jl(e, t)
}
function Px(e, t, r) {
  return typeof e == 'number' && typeof t == 'number' && typeof r == 'number'
    ? We(e, t, r)
    : Yf(e)(e, t)
}
const uP = 5
function Tx(e, t, r) {
  const s = Math.max(t - uP, 0)
  return zf(r - e(s), t - s)
}
const He = {
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
  sd = 0.001
function dP({
  duration: e = He.duration,
  bounce: t = He.bounce,
  velocity: r = He.velocity,
  mass: s = He.mass,
}) {
  let a,
    l,
    u = 1 - t
  ;((u = Rn(He.minDamping, He.maxDamping, u)),
    (e = Rn(He.minDuration, He.maxDuration, Yn(e))),
    u < 1
      ? ((a = (g) => {
          const x = g * u,
            h = x * e,
            w = x - r,
            S = Fd(g, u),
            N = Math.exp(-h)
          return sd - (w / S) * N
        }),
        (l = (g) => {
          const h = g * u * e,
            w = h * r + r,
            S = Math.pow(u, 2) * Math.pow(g, 2) * e,
            N = Math.exp(-h),
            C = Fd(Math.pow(g, 2), u)
          return ((-a(g) + sd > 0 ? -1 : 1) * ((w - S) * N)) / C
        }))
      : ((a = (g) => {
          const x = Math.exp(-g * e),
            h = (g - r) * e + 1
          return -sd + x * h
        }),
        (l = (g) => {
          const x = Math.exp(-g * e),
            h = (r - g) * (e * e)
          return x * h
        })))
  const f = 5 / e,
    p = pP(a, l, f)
  if (((e = Kn(e)), isNaN(p))) return { stiffness: He.stiffness, damping: He.damping, duration: e }
  {
    const g = Math.pow(p, 2) * s
    return { stiffness: g, damping: u * 2 * Math.sqrt(s * g), duration: e }
  }
}
const fP = 12
function pP(e, t, r) {
  let s = r
  for (let a = 1; a < fP; a++) s = s - e(s) / t(s)
  return s
}
function Fd(e, t) {
  return e * Math.sqrt(1 - t * t)
}
const mP = ['duration', 'bounce'],
  hP = ['stiffness', 'damping', 'mass']
function Lg(e, t) {
  return t.some((r) => e[r] !== void 0)
}
function gP(e) {
  let t = {
    velocity: He.velocity,
    stiffness: He.stiffness,
    damping: He.damping,
    mass: He.mass,
    isResolvedFromDuration: !1,
    ...e,
  }
  if (!Lg(e, hP) && Lg(e, mP))
    if (e.visualDuration) {
      const r = e.visualDuration,
        s = (2 * Math.PI) / (r * 1.2),
        a = s * s,
        l = 2 * Rn(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(a)
      t = { ...t, mass: He.mass, stiffness: a, damping: l }
    } else {
      const r = dP(e)
      ;((t = { ...t, ...r, mass: He.mass }), (t.isResolvedFromDuration = !0))
    }
  return t
}
function jx(e = He.visualDuration, t = He.bounce) {
  const r = typeof e != 'object' ? { visualDuration: e, keyframes: [0, 1], bounce: t } : e
  let { restSpeed: s, restDelta: a } = r
  const l = r.keyframes[0],
    u = r.keyframes[r.keyframes.length - 1],
    f = { done: !1, value: l },
    {
      stiffness: p,
      damping: g,
      mass: x,
      duration: h,
      velocity: w,
      isResolvedFromDuration: S,
    } = gP({ ...r, velocity: -Yn(r.velocity || 0) }),
    N = w || 0,
    C = g / (2 * Math.sqrt(p * x)),
    E = u - l,
    P = Yn(Math.sqrt(p / x)),
    j = Math.abs(E) < 5
  ;(s || (s = j ? He.restSpeed.granular : He.restSpeed.default),
    a || (a = j ? He.restDelta.granular : He.restDelta.default))
  let k
  if (C < 1) {
    const I = Fd(P, C)
    k = (B) => {
      const z = Math.exp(-C * P * B)
      return u - z * (((N + C * P * E) / I) * Math.sin(I * B) + E * Math.cos(I * B))
    }
  } else if (C === 1) k = (I) => u - Math.exp(-P * I) * (E + (N + P * E) * I)
  else {
    const I = P * Math.sqrt(C * C - 1)
    k = (B) => {
      const z = Math.exp(-C * P * B),
        W = Math.min(I * B, 300)
      return u - (z * ((N + C * P * E) * Math.sinh(W) + I * E * Math.cosh(W))) / I
    }
  }
  const _ = {
    calculatedDuration: (S && h) || null,
    next: (I) => {
      const B = k(I)
      if (S) f.done = I >= h
      else {
        let z = 0
        C < 1 && (z = I === 0 ? Kn(N) : Tx(k, I, B))
        const W = Math.abs(z) <= s,
          oe = Math.abs(u - B) <= a
        f.done = W && oe
      }
      return ((f.value = f.done ? u : B), f)
    },
    toString: () => {
      const I = Math.min(Ky(_), Rd),
        B = Yy((z) => _.next(I * z).value, I, 30)
      return I + 'ms ' + B
    },
  }
  return _
}
function Fg({
  keyframes: e,
  velocity: t = 0,
  power: r = 0.8,
  timeConstant: s = 325,
  bounceDamping: a = 10,
  bounceStiffness: l = 500,
  modifyTarget: u,
  min: f,
  max: p,
  restDelta: g = 0.5,
  restSpeed: x,
}) {
  const h = e[0],
    w = { done: !1, value: h },
    S = (W) => (f !== void 0 && W < f) || (p !== void 0 && W > p),
    N = (W) => (f === void 0 ? p : p === void 0 || Math.abs(f - W) < Math.abs(p - W) ? f : p)
  let C = r * t
  const E = h + C,
    P = u === void 0 ? E : u(E)
  P !== E && (C = P - h)
  const j = (W) => -C * Math.exp(-W / s),
    k = (W) => P + j(W),
    _ = (W) => {
      const oe = j(W),
        ne = k(W)
      ;((w.done = Math.abs(oe) <= g), (w.value = w.done ? P : ne))
    }
  let I, B
  const z = (W) => {
    S(w.value) &&
      ((I = W),
      (B = jx({
        keyframes: [w.value, N(w.value)],
        velocity: Tx(k, W, w.value),
        damping: a,
        stiffness: l,
        restDelta: g,
        restSpeed: x,
      })))
  }
  return (
    z(0),
    {
      calculatedDuration: null,
      next: (W) => {
        let oe = !1
        return (
          !B && I === void 0 && ((oe = !0), _(W), z(W)),
          I !== void 0 && W >= I ? B.next(W - I) : (!oe && _(W), w)
        )
      },
    }
  )
}
const vP = Ai(0.42, 0, 1, 1),
  yP = Ai(0, 0, 0.58, 1),
  kx = Ai(0.42, 0, 0.58, 1),
  xP = (e) => Array.isArray(e) && typeof e[0] != 'number',
  wP = {
    linear: Et,
    easeIn: vP,
    easeInOut: kx,
    easeOut: yP,
    circIn: Wf,
    circInOut: cx,
    circOut: lx,
    backIn: $f,
    backInOut: ix,
    backOut: sx,
    anticipate: ax,
  },
  Vg = (e) => {
    if (If(e)) {
      Py(e.length === 4)
      const [t, r, s, a] = e
      return Ai(t, r, s, a)
    } else if (typeof e == 'string') return wP[e]
    return e
  }
function bP(e, t, r) {
  const s = [],
    a = r || Px,
    l = e.length - 1
  for (let u = 0; u < l; u++) {
    let f = a(e[u], e[u + 1])
    if (t) {
      const p = Array.isArray(t) ? t[u] || Et : t
      f = Mi(p, f)
    }
    s.push(f)
  }
  return s
}
function Rx(e, t, { clamp: r = !0, ease: s, mixer: a } = {}) {
  const l = e.length
  if ((Py(l === t.length), l === 1)) return () => t[0]
  if (l === 2 && t[0] === t[1]) return () => t[1]
  const u = e[0] === e[1]
  e[0] > e[l - 1] && ((e = [...e].reverse()), (t = [...t].reverse()))
  const f = bP(t, s, a),
    p = f.length,
    g = (x) => {
      if (u && x < e[0]) return t[0]
      let h = 0
      if (p > 1) for (; h < e.length - 2 && !(x < e[h + 1]); h++);
      const w = mo(e[h], e[h + 1], x)
      return f[h](w)
    }
  return r ? (x) => g(Rn(e[0], e[l - 1], x)) : g
}
function SP(e, t) {
  const r = e[e.length - 1]
  for (let s = 1; s <= t; s++) {
    const a = mo(0, t, s)
    e.push(We(r, 1, a))
  }
}
function Ax(e) {
  const t = [0]
  return (SP(t, e.length - 1), t)
}
function CP(e, t) {
  return e.map((r) => r * t)
}
function EP(e, t) {
  return e.map(() => t || kx).splice(0, e.length - 1)
}
function kl({ duration: e = 300, keyframes: t, times: r, ease: s = 'easeInOut' }) {
  const a = xP(s) ? s.map(Vg) : Vg(s),
    l = { done: !1, value: t[0] },
    u = CP(r && r.length === t.length ? r : Ax(t), e),
    f = Rx(u, t, { ease: Array.isArray(a) ? a : EP(t, a) })
  return { calculatedDuration: e, next: (p) => ((l.value = f(p)), (l.done = p >= e), l) }
}
const NP = (e) => {
    const t = ({ timestamp: r }) => e(r)
    return {
      start: () => _e.update(t, !0),
      stop: () => kn(t),
      now: () => (at.isProcessing ? at.timestamp : Tn.now()),
    }
  },
  PP = { decay: Fg, inertia: Fg, tween: kl, keyframes: kl, spring: jx },
  TP = (e) => e / 100
class Xf extends Ex {
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
        const { onStop: p } = this.options
        p && p()
      }))
    const { name: r, motionValue: s, element: a, keyframes: l } = this.options,
      u = a?.KeyframeResolver || Kf,
      f = (p, g) => this.onKeyframesResolved(p, g)
    ;((this.resolver = new u(l, f, r, s, a)), this.resolver.scheduleResolve())
  }
  flatten() {
    ;(super.flatten(),
      this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes)))
  }
  initPlayback(t) {
    const {
        type: r = 'keyframes',
        repeat: s = 0,
        repeatDelay: a = 0,
        repeatType: l,
        velocity: u = 0,
      } = this.options,
      f = Df(r) ? r : PP[r] || kl
    let p, g
    f !== kl && typeof t[0] != 'number' && ((p = Mi(TP, Px(t[0], t[1]))), (t = [0, 100]))
    const x = f({ ...this.options, keyframes: t })
    ;(l === 'mirror' && (g = f({ ...this.options, keyframes: [...t].reverse(), velocity: -u })),
      x.calculatedDuration === null && (x.calculatedDuration = Ky(x)))
    const { calculatedDuration: h } = x,
      w = h + a,
      S = w * (s + 1) - a
    return {
      generator: x,
      mirroredGenerator: g,
      mapPercentToKeyframes: p,
      calculatedDuration: h,
      resolvedDuration: w,
      totalDuration: S,
    }
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options
    ;(this.play(),
      this.pendingPlayState === 'paused' || !t
        ? this.pause()
        : (this.state = this.pendingPlayState))
  }
  tick(t, r = !1) {
    const { resolved: s } = this
    if (!s) {
      const { keyframes: W } = this.options
      return { done: !0, value: W[W.length - 1] }
    }
    const {
      finalKeyframe: a,
      generator: l,
      mirroredGenerator: u,
      mapPercentToKeyframes: f,
      keyframes: p,
      calculatedDuration: g,
      totalDuration: x,
      resolvedDuration: h,
    } = s
    if (this.startTime === null) return l.next(0)
    const { delay: w, repeat: S, repeatType: N, repeatDelay: C, onUpdate: E } = this.options
    ;(this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 && (this.startTime = Math.min(t - x / this.speed, this.startTime)),
      r
        ? (this.currentTime = t)
        : this.holdTime !== null
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(t - this.startTime) * this.speed))
    const P = this.currentTime - w * (this.speed >= 0 ? 1 : -1),
      j = this.speed >= 0 ? P < 0 : P > x
    ;((this.currentTime = Math.max(P, 0)),
      this.state === 'finished' && this.holdTime === null && (this.currentTime = x))
    let k = this.currentTime,
      _ = l
    if (S) {
      const W = Math.min(this.currentTime, x) / h
      let oe = Math.floor(W),
        ne = W % 1
      ;(!ne && W >= 1 && (ne = 1),
        ne === 1 && oe--,
        (oe = Math.min(oe, S + 1)),
        oe % 2 &&
          (N === 'reverse' ? ((ne = 1 - ne), C && (ne -= C / h)) : N === 'mirror' && (_ = u)),
        (k = Rn(0, 1, ne) * h))
    }
    const I = j ? { done: !1, value: p[0] } : _.next(k)
    f && (I.value = f(I.value))
    let { done: B } = I
    !j && g !== null && (B = this.speed >= 0 ? this.currentTime >= x : this.currentTime <= 0)
    const z =
      this.holdTime === null && (this.state === 'finished' || (this.state === 'running' && B))
    return (
      z && a !== void 0 && (I.value = Kl(p, this.options, a)),
      E && E(I.value),
      z && this.finish(),
      I
    )
  }
  get duration() {
    const { resolved: t } = this
    return t ? Yn(t.calculatedDuration) : 0
  }
  get time() {
    return Yn(this.currentTime)
  }
  set time(t) {
    ;((t = Kn(t)),
      (this.currentTime = t),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.speed))
  }
  get speed() {
    return this.playbackSpeed
  }
  set speed(t) {
    const r = this.playbackSpeed !== t
    ;((this.playbackSpeed = t), r && (this.time = Yn(this.currentTime)))
  }
  play() {
    if ((this.resolver.isScheduled || this.resolver.resume(), !this._resolved)) {
      this.pendingPlayState = 'running'
      return
    }
    if (this.isStopped) return
    const { driver: t = NP, onPlay: r, startTime: s } = this.options
    ;(this.driver || (this.driver = t((l) => this.tick(l))), r && r())
    const a = this.driver.now()
    ;(this.holdTime !== null
      ? (this.startTime = a - this.holdTime)
      : this.startTime
        ? this.state === 'finished' && (this.startTime = a)
        : (this.startTime = s ?? this.calcStartTime()),
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
const jP = new Set(['opacity', 'clipPath', 'filter', 'transform'])
function kP(
  e,
  t,
  r,
  {
    delay: s = 0,
    duration: a = 300,
    repeat: l = 0,
    repeatType: u = 'loop',
    ease: f = 'easeInOut',
    times: p,
  } = {}
) {
  const g = { [t]: r }
  p && (g.offset = p)
  const x = qy(f, a)
  return (
    Array.isArray(x) && (g.easing = x),
    e.animate(g, {
      delay: s,
      duration: a,
      easing: Array.isArray(x) ? 'linear' : x,
      fill: 'both',
      iterations: l + 1,
      direction: u === 'reverse' ? 'alternate' : 'normal',
    })
  )
}
const RP = xf(() => Object.hasOwnProperty.call(Element.prototype, 'animate')),
  Rl = 10,
  AP = 2e4
function MP(e) {
  return Df(e.type) || e.type === 'spring' || !Xy(e.ease)
}
function _P(e, t) {
  const r = new Xf({ ...t, keyframes: e, repeat: 0, delay: 0, isGenerator: !0 })
  let s = { done: !1, value: e[0] }
  const a = []
  let l = 0
  for (; !s.done && l < AP; ) ((s = r.sample(l)), a.push(s.value), (l += Rl))
  return { times: void 0, keyframes: a, duration: l - Rl, ease: 'linear' }
}
const Mx = { anticipate: ax, backInOut: ix, circInOut: cx }
function DP(e) {
  return e in Mx
}
class Bg extends Ex {
  constructor(t) {
    super(t)
    const { name: r, motionValue: s, element: a, keyframes: l } = this.options
    ;((this.resolver = new Cx(l, (u, f) => this.onKeyframesResolved(u, f), r, s, a)),
      this.resolver.scheduleResolve())
  }
  initPlayback(t, r) {
    let {
      duration: s = 300,
      times: a,
      ease: l,
      type: u,
      motionValue: f,
      name: p,
      startTime: g,
    } = this.options
    if (!f.owner || !f.owner.current) return !1
    if ((typeof l == 'string' && Tl() && DP(l) && (l = Mx[l]), MP(this.options))) {
      const { onComplete: h, onUpdate: w, motionValue: S, element: N, ...C } = this.options,
        E = _P(t, C)
      ;((t = E.keyframes),
        t.length === 1 && (t[1] = t[0]),
        (s = E.duration),
        (a = E.times),
        (l = E.ease),
        (u = 'keyframes'))
    }
    const x = kP(f.owner.current, p, t, { ...this.options, duration: s, times: a, ease: l })
    return (
      (x.startTime = g ?? this.calcStartTime()),
      this.pendingTimeline
        ? (Eg(x, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (x.onfinish = () => {
            const { onComplete: h } = this.options
            ;(f.set(Kl(t, this.options, r)), h && h(), this.cancel(), this.resolveFinishedPromise())
          }),
      { animation: x, duration: s, times: a, type: u, ease: l, keyframes: t }
    )
  }
  get duration() {
    const { resolved: t } = this
    if (!t) return 0
    const { duration: r } = t
    return Yn(r)
  }
  get time() {
    const { resolved: t } = this
    if (!t) return 0
    const { animation: r } = t
    return Yn(r.currentTime || 0)
  }
  set time(t) {
    const { resolved: r } = this
    if (!r) return
    const { animation: s } = r
    s.currentTime = Kn(t)
  }
  get speed() {
    const { resolved: t } = this
    if (!t) return 1
    const { animation: r } = t
    return r.playbackRate
  }
  set speed(t) {
    const { resolved: r } = this
    if (!r) return
    const { animation: s } = r
    s.playbackRate = t
  }
  get state() {
    const { resolved: t } = this
    if (!t) return 'idle'
    const { animation: r } = t
    return r.playState
  }
  get startTime() {
    const { resolved: t } = this
    if (!t) return null
    const { animation: r } = t
    return r.startTime
  }
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t
    else {
      const { resolved: r } = this
      if (!r) return Et
      const { animation: s } = r
      Eg(s, t)
    }
    return Et
  }
  play() {
    if (this.isStopped) return
    const { resolved: t } = this
    if (!t) return
    const { animation: r } = t
    ;(r.playState === 'finished' && this.updateFinishedPromise(), r.play())
  }
  pause() {
    const { resolved: t } = this
    if (!t) return
    const { animation: r } = t
    r.pause()
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')) return
    ;(this.resolveFinishedPromise(), this.updateFinishedPromise())
    const { resolved: t } = this
    if (!t) return
    const { animation: r, keyframes: s, duration: a, type: l, ease: u, times: f } = t
    if (r.playState === 'idle' || r.playState === 'finished') return
    if (this.time) {
      const { motionValue: g, onUpdate: x, onComplete: h, element: w, ...S } = this.options,
        N = new Xf({
          ...S,
          keyframes: s,
          duration: a,
          type: l,
          ease: u,
          times: f,
          isGenerator: !0,
        }),
        C = Kn(this.time)
      g.setWithVelocity(N.sample(C - Rl).value, N.sample(C).value, Rl)
    }
    const { onStop: p } = this.options
    ;(p && p(), this.cancel())
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
    const { motionValue: r, name: s, repeatDelay: a, repeatType: l, damping: u, type: f } = t
    if (!r || !r.owner || !(r.owner.current instanceof HTMLElement)) return !1
    const { onUpdate: p, transformTemplate: g } = r.owner.getProps()
    return RP() && s && jP.has(s) && !p && !g && !a && l !== 'mirror' && u !== 0 && f !== 'inertia'
  }
}
const IP = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  OP = (e) => ({
    type: 'spring',
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  LP = { type: 'keyframes', duration: 0.8 },
  FP = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  VP = (e, { keyframes: t }) =>
    t.length > 2 ? LP : wo.has(e) ? (e.startsWith('scale') ? OP(t[1]) : IP) : FP
function BP({
  when: e,
  delay: t,
  delayChildren: r,
  staggerChildren: s,
  staggerDirection: a,
  repeat: l,
  repeatType: u,
  repeatDelay: f,
  from: p,
  elapsed: g,
  ...x
}) {
  return !!Object.keys(x).length
}
const qf =
  (e, t, r, s = {}, a, l) =>
  (u) => {
    const f = _f(s, e) || {},
      p = f.delay || s.delay || 0
    let { elapsed: g = 0 } = s
    g = g - Kn(p)
    let x = {
      keyframes: Array.isArray(r) ? r : [null, r],
      ease: 'easeOut',
      velocity: t.getVelocity(),
      ...f,
      delay: -g,
      onUpdate: (w) => {
        ;(t.set(w), f.onUpdate && f.onUpdate(w))
      },
      onComplete: () => {
        ;(u(), f.onComplete && f.onComplete())
      },
      name: e,
      motionValue: t,
      element: l ? void 0 : a,
    }
    ;(BP(f) || (x = { ...x, ...VP(e, x) }),
      x.duration && (x.duration = Kn(x.duration)),
      x.repeatDelay && (x.repeatDelay = Kn(x.repeatDelay)),
      x.from !== void 0 && (x.keyframes[0] = x.from))
    let h = !1
    if (
      ((x.type === !1 || (x.duration === 0 && !x.repeatDelay)) &&
        ((x.duration = 0), x.delay === 0 && (h = !0)),
      h && !l && t.get() !== void 0)
    ) {
      const w = Kl(x.keyframes, f)
      if (w !== void 0)
        return (
          _e.update(() => {
            ;(x.onUpdate(w), x.onComplete())
          }),
          new lN([])
        )
    }
    return !l && Bg.supports(x) ? new Bg(x) : new Xf(x)
  }
function zP({ protectedKeys: e, needsAnimating: t }, r) {
  const s = e.hasOwnProperty(r) && t[r] !== !0
  return ((t[r] = !1), s)
}
function _x(e, t, { delay: r = 0, transitionOverride: s, type: a } = {}) {
  var l
  let { transition: u = e.getDefaultTransition(), transitionEnd: f, ...p } = t
  s && (u = s)
  const g = [],
    x = a && e.animationState && e.animationState.getState()[a]
  for (const h in p) {
    const w = e.getValue(h, (l = e.latestValues[h]) !== null && l !== void 0 ? l : null),
      S = p[h]
    if (S === void 0 || (x && zP(x, h))) continue
    const N = { delay: r, ..._f(u || {}, h) }
    let C = !1
    if (window.MotionHandoffAnimation) {
      const P = tx(e)
      if (P) {
        const j = window.MotionHandoffAnimation(P, h, _e)
        j !== null && ((N.startTime = j), (C = !0))
      }
    }
    ;(Md(e, h), w.start(qf(h, w, S, e.shouldReduceMotion && ex.has(h) ? { type: !1 } : N, e, C)))
    const E = w.animation
    E && g.push(E)
  }
  return (
    f &&
      Promise.all(g).then(() => {
        _e.update(() => {
          f && bN(e, f)
        })
      }),
    g
  )
}
function Vd(e, t, r = {}) {
  var s
  const a = Gl(
    e,
    t,
    r.type === 'exit'
      ? (s = e.presenceContext) === null || s === void 0
        ? void 0
        : s.custom
      : void 0
  )
  let { transition: l = e.getDefaultTransition() || {} } = a || {}
  r.transitionOverride && (l = r.transitionOverride)
  const u = a ? () => Promise.all(_x(e, a, r)) : () => Promise.resolve(),
    f =
      e.variantChildren && e.variantChildren.size
        ? (g = 0) => {
            const { delayChildren: x = 0, staggerChildren: h, staggerDirection: w } = l
            return $P(e, t, x + g, h, w, r)
          }
        : () => Promise.resolve(),
    { when: p } = l
  if (p) {
    const [g, x] = p === 'beforeChildren' ? [u, f] : [f, u]
    return g().then(() => x())
  } else return Promise.all([u(), f(r.delay)])
}
function $P(e, t, r = 0, s = 0, a = 1, l) {
  const u = [],
    f = (e.variantChildren.size - 1) * s,
    p = a === 1 ? (g = 0) => g * s : (g = 0) => f - g * s
  return (
    Array.from(e.variantChildren)
      .sort(WP)
      .forEach((g, x) => {
        ;(g.notify('AnimationStart', t),
          u.push(Vd(g, t, { ...l, delay: r + p(x) }).then(() => g.notify('AnimationComplete', t))))
      }),
    Promise.all(u)
  )
}
function WP(e, t) {
  return e.sortNodePosition(t)
}
function UP(e, t, r = {}) {
  e.notify('AnimationStart', t)
  let s
  if (Array.isArray(t)) {
    const a = t.map((l) => Vd(e, l, r))
    s = Promise.all(a)
  } else if (typeof t == 'string') s = Vd(e, t, r)
  else {
    const a = typeof t == 'function' ? Gl(e, t, r.custom) : t
    s = Promise.all(_x(e, a, r))
  }
  return s.then(() => {
    e.notify('AnimationComplete', t)
  })
}
const HP = bf.length
function Dx(e) {
  if (!e) return
  if (!e.isControllingVariants) {
    const r = e.parent ? Dx(e.parent) || {} : {}
    return (e.props.initial !== void 0 && (r.initial = e.props.initial), r)
  }
  const t = {}
  for (let r = 0; r < HP; r++) {
    const s = bf[r],
      a = e.props[s]
    ;(bi(a) || a === !1) && (t[s] = a)
  }
  return t
}
const GP = [...wf].reverse(),
  KP = wf.length
function YP(e) {
  return (t) => Promise.all(t.map(({ animation: r, options: s }) => UP(e, r, s)))
}
function XP(e) {
  let t = YP(e),
    r = zg(),
    s = !0
  const a = (p) => (g, x) => {
    var h
    const w = Gl(
      e,
      x,
      p === 'exit' ? ((h = e.presenceContext) === null || h === void 0 ? void 0 : h.custom) : void 0
    )
    if (w) {
      const { transition: S, transitionEnd: N, ...C } = w
      g = { ...g, ...C, ...N }
    }
    return g
  }
  function l(p) {
    t = p(e)
  }
  function u(p) {
    const { props: g } = e,
      x = Dx(e.parent) || {},
      h = [],
      w = new Set()
    let S = {},
      N = 1 / 0
    for (let E = 0; E < KP; E++) {
      const P = GP[E],
        j = r[P],
        k = g[P] !== void 0 ? g[P] : x[P],
        _ = bi(k),
        I = P === p ? j.isActive : null
      I === !1 && (N = E)
      let B = k === x[P] && k !== g[P] && _
      if (
        (B && s && e.manuallyAnimateOnMount && (B = !1),
        (j.protectedKeys = { ...S }),
        (!j.isActive && I === null) || (!k && !j.prevProp) || Ul(k) || typeof k == 'boolean')
      )
        continue
      const z = qP(j.prevProp, k)
      let W = z || (P === p && j.isActive && !B && _) || (E > N && _),
        oe = !1
      const ne = Array.isArray(k) ? k : [k]
      let me = ne.reduce(a(P), {})
      I === !1 && (me = {})
      const { prevResolvedValues: te = {} } = j,
        ue = { ...te, ...me },
        fe = (q) => {
          ;((W = !0), w.has(q) && ((oe = !0), w.delete(q)), (j.needsAnimating[q] = !0))
          const L = e.getValue(q)
          L && (L.liveStyle = !1)
        }
      for (const q in ue) {
        const L = me[q],
          V = te[q]
        if (S.hasOwnProperty(q)) continue
        let U = !1
        ;(kd(L) && kd(V) ? (U = !Hy(L, V)) : (U = L !== V),
          U
            ? L != null
              ? fe(q)
              : w.add(q)
            : L !== void 0 && w.has(q)
              ? fe(q)
              : (j.protectedKeys[q] = !0))
      }
      ;((j.prevProp = k),
        (j.prevResolvedValues = me),
        j.isActive && (S = { ...S, ...me }),
        s && e.blockInitialAnimation && (W = !1),
        W &&
          (!(B && z) || oe) &&
          h.push(...ne.map((q) => ({ animation: q, options: { type: P } }))))
    }
    if (w.size) {
      const E = {}
      ;(w.forEach((P) => {
        const j = e.getBaseTarget(P),
          k = e.getValue(P)
        ;(k && (k.liveStyle = !0), (E[P] = j ?? null))
      }),
        h.push({ animation: E }))
    }
    let C = !!h.length
    return (
      s && (g.initial === !1 || g.initial === g.animate) && !e.manuallyAnimateOnMount && (C = !1),
      (s = !1),
      C ? t(h) : Promise.resolve()
    )
  }
  function f(p, g) {
    var x
    if (r[p].isActive === g) return Promise.resolve()
    ;((x = e.variantChildren) === null ||
      x === void 0 ||
      x.forEach((w) => {
        var S
        return (S = w.animationState) === null || S === void 0 ? void 0 : S.setActive(p, g)
      }),
      (r[p].isActive = g))
    const h = u(p)
    for (const w in r) r[w].protectedKeys = {}
    return h
  }
  return {
    animateChanges: u,
    setActive: f,
    setAnimateFunction: l,
    getState: () => r,
    reset: () => {
      ;((r = zg()), (s = !0))
    },
  }
}
function qP(e, t) {
  return typeof t == 'string' ? t !== e : Array.isArray(t) ? !Hy(t, e) : !1
}
function io(e = !1) {
  return { isActive: e, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} }
}
function zg() {
  return {
    animate: io(!0),
    whileInView: io(),
    whileHover: io(),
    whileTap: io(),
    whileDrag: io(),
    whileFocus: io(),
    exit: io(),
  }
}
class Fr {
  constructor(t) {
    ;((this.isMounted = !1), (this.node = t))
  }
  update() {}
}
class QP extends Fr {
  constructor(t) {
    ;(super(t), t.animationState || (t.animationState = XP(t)))
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps()
    Ul(t) && (this.unmountControls = t.subscribe(this.node))
  }
  mount() {
    this.updateAnimationControlsSubscription()
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: r } = this.node.prevProps || {}
    t !== r && this.updateAnimationControlsSubscription()
  }
  unmount() {
    var t
    ;(this.node.animationState.reset(),
      (t = this.unmountControls) === null || t === void 0 || t.call(this))
  }
}
let ZP = 0
class JP extends Fr {
  constructor() {
    ;(super(...arguments), (this.id = ZP++))
  }
  update() {
    if (!this.node.presenceContext) return
    const { isPresent: t, onExitComplete: r } = this.node.presenceContext,
      { isPresent: s } = this.node.prevPresenceContext || {}
    if (!this.node.animationState || t === s) return
    const a = this.node.animationState.setActive('exit', !t)
    r && !t && a.then(() => r(this.id))
  }
  mount() {
    const { register: t } = this.node.presenceContext || {}
    t && (this.unmount = t(this.id))
  }
  unmount() {}
}
const eT = { animation: { Feature: QP }, exit: { Feature: JP } }
function Ei(e, t, r, s = { passive: !0 }) {
  return (e.addEventListener(t, r, s), () => e.removeEventListener(t, r))
}
function _i(e) {
  return { point: { x: e.pageX, y: e.pageY } }
}
const tT = (e) => (t) => Lf(t) && e(t, _i(t))
function gi(e, t, r, s) {
  return Ei(e, t, tT(r), s)
}
const $g = (e, t) => Math.abs(e - t)
function nT(e, t) {
  const r = $g(e.x, t.x),
    s = $g(e.y, t.y)
  return Math.sqrt(r ** 2 + s ** 2)
}
class Ix {
  constructor(t, r, { transformPagePoint: s, contextWindow: a, dragSnapToOrigin: l = !1 } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return
        const h = ad(this.lastMoveEventInfo, this.history),
          w = this.startEvent !== null,
          S = nT(h.offset, { x: 0, y: 0 }) >= 3
        if (!w && !S) return
        const { point: N } = h,
          { timestamp: C } = at
        this.history.push({ ...N, timestamp: C })
        const { onStart: E, onMove: P } = this.handlers
        ;(w || (E && E(this.lastMoveEvent, h), (this.startEvent = this.lastMoveEvent)),
          P && P(this.lastMoveEvent, h))
      }),
      (this.handlePointerMove = (h, w) => {
        ;((this.lastMoveEvent = h),
          (this.lastMoveEventInfo = id(w, this.transformPagePoint)),
          _e.update(this.updatePoint, !0))
      }),
      (this.handlePointerUp = (h, w) => {
        this.end()
        const { onEnd: S, onSessionEnd: N, resumeAnimation: C } = this.handlers
        if ((this.dragSnapToOrigin && C && C(), !(this.lastMoveEvent && this.lastMoveEventInfo)))
          return
        const E = ad(
          h.type === 'pointercancel' ? this.lastMoveEventInfo : id(w, this.transformPagePoint),
          this.history
        )
        ;(this.startEvent && S && S(h, E), N && N(h, E))
      }),
      !Lf(t))
    )
      return
    ;((this.dragSnapToOrigin = l),
      (this.handlers = r),
      (this.transformPagePoint = s),
      (this.contextWindow = a || window))
    const u = _i(t),
      f = id(u, this.transformPagePoint),
      { point: p } = f,
      { timestamp: g } = at
    this.history = [{ ...p, timestamp: g }]
    const { onSessionStart: x } = r
    ;(x && x(t, ad(f, this.history)),
      (this.removeListeners = Mi(
        gi(this.contextWindow, 'pointermove', this.handlePointerMove),
        gi(this.contextWindow, 'pointerup', this.handlePointerUp),
        gi(this.contextWindow, 'pointercancel', this.handlePointerUp)
      )))
  }
  updateHandlers(t) {
    this.handlers = t
  }
  end() {
    ;(this.removeListeners && this.removeListeners(), kn(this.updatePoint))
  }
}
function id(e, t) {
  return t ? { point: t(e.point) } : e
}
function Wg(e, t) {
  return { x: e.x - t.x, y: e.y - t.y }
}
function ad({ point: e }, t) {
  return { point: e, delta: Wg(e, Ox(t)), offset: Wg(e, rT(t)), velocity: oT(t, 0.1) }
}
function rT(e) {
  return e[0]
}
function Ox(e) {
  return e[e.length - 1]
}
function oT(e, t) {
  if (e.length < 2) return { x: 0, y: 0 }
  let r = e.length - 1,
    s = null
  const a = Ox(e)
  for (; r >= 0 && ((s = e[r]), !(a.timestamp - s.timestamp > Kn(t))); ) r--
  if (!s) return { x: 0, y: 0 }
  const l = Yn(a.timestamp - s.timestamp)
  if (l === 0) return { x: 0, y: 0 }
  const u = { x: (a.x - s.x) / l, y: (a.y - s.y) / l }
  return (u.x === 1 / 0 && (u.x = 0), u.y === 1 / 0 && (u.y = 0), u)
}
const Lx = 1e-4,
  sT = 1 - Lx,
  iT = 1 + Lx,
  Fx = 0.01,
  aT = 0 - Fx,
  lT = 0 + Fx
function Ut(e) {
  return e.max - e.min
}
function cT(e, t, r) {
  return Math.abs(e - t) <= r
}
function Ug(e, t, r, s = 0.5) {
  ;((e.origin = s),
    (e.originPoint = We(t.min, t.max, e.origin)),
    (e.scale = Ut(r) / Ut(t)),
    (e.translate = We(r.min, r.max, e.origin) - e.originPoint),
    ((e.scale >= sT && e.scale <= iT) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= aT && e.translate <= lT) || isNaN(e.translate)) && (e.translate = 0))
}
function vi(e, t, r, s) {
  ;(Ug(e.x, t.x, r.x, s ? s.originX : void 0), Ug(e.y, t.y, r.y, s ? s.originY : void 0))
}
function Hg(e, t, r) {
  ;((e.min = r.min + t.min), (e.max = e.min + Ut(t)))
}
function uT(e, t, r) {
  ;(Hg(e.x, t.x, r.x), Hg(e.y, t.y, r.y))
}
function Gg(e, t, r) {
  ;((e.min = t.min - r.min), (e.max = e.min + Ut(t)))
}
function yi(e, t, r) {
  ;(Gg(e.x, t.x, r.x), Gg(e.y, t.y, r.y))
}
function dT(e, { min: t, max: r }, s) {
  return (
    t !== void 0 && e < t
      ? (e = s ? We(t, e, s.min) : Math.max(e, t))
      : r !== void 0 && e > r && (e = s ? We(r, e, s.max) : Math.min(e, r)),
    e
  )
}
function Kg(e, t, r) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: r !== void 0 ? e.max + r - (e.max - e.min) : void 0,
  }
}
function fT(e, { top: t, left: r, bottom: s, right: a }) {
  return { x: Kg(e.x, r, a), y: Kg(e.y, t, s) }
}
function Yg(e, t) {
  let r = t.min - e.min,
    s = t.max - e.max
  return (t.max - t.min < e.max - e.min && ([r, s] = [s, r]), { min: r, max: s })
}
function pT(e, t) {
  return { x: Yg(e.x, t.x), y: Yg(e.y, t.y) }
}
function mT(e, t) {
  let r = 0.5
  const s = Ut(e),
    a = Ut(t)
  return (
    a > s ? (r = mo(t.min, t.max - s, e.min)) : s > a && (r = mo(e.min, e.max - a, t.min)),
    Rn(0, 1, r)
  )
}
function hT(e, t) {
  const r = {}
  return (
    t.min !== void 0 && (r.min = t.min - e.min),
    t.max !== void 0 && (r.max = t.max - e.min),
    r
  )
}
const Bd = 0.35
function gT(e = Bd) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Bd),
    { x: Xg(e, 'left', 'right'), y: Xg(e, 'top', 'bottom') }
  )
}
function Xg(e, t, r) {
  return { min: qg(e, t), max: qg(e, r) }
}
function qg(e, t) {
  return typeof e == 'number' ? e : e[t] || 0
}
const Qg = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Zo = () => ({ x: Qg(), y: Qg() }),
  Zg = () => ({ min: 0, max: 0 }),
  Xe = () => ({ x: Zg(), y: Zg() })
function nn(e) {
  return [e('x'), e('y')]
}
function Vx({ top: e, left: t, right: r, bottom: s }) {
  return { x: { min: t, max: r }, y: { min: e, max: s } }
}
function vT({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min }
}
function yT(e, t) {
  if (!t) return e
  const r = t({ x: e.left, y: e.top }),
    s = t({ x: e.right, y: e.bottom })
  return { top: r.y, left: r.x, bottom: s.y, right: s.x }
}
function ld(e) {
  return e === void 0 || e === 1
}
function zd({ scale: e, scaleX: t, scaleY: r }) {
  return !ld(e) || !ld(t) || !ld(r)
}
function co(e) {
  return zd(e) || Bx(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY
}
function Bx(e) {
  return Jg(e.x) || Jg(e.y)
}
function Jg(e) {
  return e && e !== '0%'
}
function Al(e, t, r) {
  const s = e - r,
    a = t * s
  return r + a
}
function ev(e, t, r, s, a) {
  return (a !== void 0 && (e = Al(e, a, s)), Al(e, r, s) + t)
}
function $d(e, t = 0, r = 1, s, a) {
  ;((e.min = ev(e.min, t, r, s, a)), (e.max = ev(e.max, t, r, s, a)))
}
function zx(e, { x: t, y: r }) {
  ;($d(e.x, t.translate, t.scale, t.originPoint), $d(e.y, r.translate, r.scale, r.originPoint))
}
const tv = 0.999999999999,
  nv = 1.0000000000001
function xT(e, t, r, s = !1) {
  const a = r.length
  if (!a) return
  t.x = t.y = 1
  let l, u
  for (let f = 0; f < a; f++) {
    ;((l = r[f]), (u = l.projectionDelta))
    const { visualElement: p } = l.options
    ;(p && p.props.style && p.props.style.display === 'contents') ||
      (s &&
        l.options.layoutScroll &&
        l.scroll &&
        l !== l.root &&
        es(e, { x: -l.scroll.offset.x, y: -l.scroll.offset.y }),
      u && ((t.x *= u.x.scale), (t.y *= u.y.scale), zx(e, u)),
      s && co(l.latestValues) && es(e, l.latestValues))
  }
  ;(t.x < nv && t.x > tv && (t.x = 1), t.y < nv && t.y > tv && (t.y = 1))
}
function Jo(e, t) {
  ;((e.min = e.min + t), (e.max = e.max + t))
}
function rv(e, t, r, s, a = 0.5) {
  const l = We(e.min, e.max, a)
  $d(e, t, r, l, s)
}
function es(e, t) {
  ;(rv(e.x, t.x, t.scaleX, t.scale, t.originX), rv(e.y, t.y, t.scaleY, t.scale, t.originY))
}
function $x(e, t) {
  return Vx(yT(e.getBoundingClientRect(), t))
}
function wT(e, t, r) {
  const s = $x(e, r),
    { scroll: a } = t
  return (a && (Jo(s.x, a.offset.x), Jo(s.y, a.offset.y)), s)
}
const Wx = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  bT = new WeakMap()
class ST {
  constructor(t) {
    ;((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = Xe()),
      (this.visualElement = t))
  }
  start(t, { snapToCursor: r = !1 } = {}) {
    const { presenceContext: s } = this.visualElement
    if (s && s.isPresent === !1) return
    const a = (x) => {
        const { dragSnapToOrigin: h } = this.getProps()
        ;(h ? this.pauseAnimation() : this.stopAnimation(), r && this.snapToCursor(_i(x).point))
      },
      l = (x, h) => {
        const { drag: w, dragPropagation: S, onDragStart: N } = this.getProps()
        if (
          w &&
          !S &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = gN(w)),
          !this.openDragLock)
        )
          return
        ;((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          nn((E) => {
            let P = this.getAxisMotionValue(E).get() || 0
            if (Pn.test(P)) {
              const { projection: j } = this.visualElement
              if (j && j.layout) {
                const k = j.layout.layoutBox[E]
                k && (P = Ut(k) * (parseFloat(P) / 100))
              }
            }
            this.originPoint[E] = P
          }),
          N && _e.postRender(() => N(x, h)),
          Md(this.visualElement, 'transform'))
        const { animationState: C } = this.visualElement
        C && C.setActive('whileDrag', !0)
      },
      u = (x, h) => {
        const {
          dragPropagation: w,
          dragDirectionLock: S,
          onDirectionLock: N,
          onDrag: C,
        } = this.getProps()
        if (!w && !this.openDragLock) return
        const { offset: E } = h
        if (S && this.currentDirection === null) {
          ;((this.currentDirection = CT(E)),
            this.currentDirection !== null && N && N(this.currentDirection))
          return
        }
        ;(this.updateAxis('x', h.point, E),
          this.updateAxis('y', h.point, E),
          this.visualElement.render(),
          C && C(x, h))
      },
      f = (x, h) => this.stop(x, h),
      p = () =>
        nn((x) => {
          var h
          return (
            this.getAnimationState(x) === 'paused' &&
            ((h = this.getAxisMotionValue(x).animation) === null || h === void 0
              ? void 0
              : h.play())
          )
        }),
      { dragSnapToOrigin: g } = this.getProps()
    this.panSession = new Ix(
      t,
      { onSessionStart: a, onStart: l, onMove: u, onSessionEnd: f, resumeAnimation: p },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: g,
        contextWindow: Wx(this.visualElement),
      }
    )
  }
  stop(t, r) {
    const s = this.isDragging
    if ((this.cancel(), !s)) return
    const { velocity: a } = r
    this.startAnimation(a)
    const { onDragEnd: l } = this.getProps()
    l && _e.postRender(() => l(t, r))
  }
  cancel() {
    this.isDragging = !1
    const { projection: t, animationState: r } = this.visualElement
    ;(t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0))
    const { dragPropagation: s } = this.getProps()
    ;(!s && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
      r && r.setActive('whileDrag', !1))
  }
  updateAxis(t, r, s) {
    const { drag: a } = this.getProps()
    if (!s || !cl(t, a, this.currentDirection)) return
    const l = this.getAxisMotionValue(t)
    let u = this.originPoint[t] + s[t]
    ;(this.constraints && this.constraints[t] && (u = dT(u, this.constraints[t], this.elastic[t])),
      l.set(u))
  }
  resolveConstraints() {
    var t
    const { dragConstraints: r, dragElastic: s } = this.getProps(),
      a =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (t = this.visualElement.projection) === null || t === void 0
            ? void 0
            : t.layout,
      l = this.constraints
    ;(r && qo(r)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : r && a
        ? (this.constraints = fT(a.layoutBox, r))
        : (this.constraints = !1),
      (this.elastic = gT(s)),
      l !== this.constraints &&
        a &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        nn((u) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(u) &&
            (this.constraints[u] = hT(a.layoutBox[u], this.constraints[u]))
        }))
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: r } = this.getProps()
    if (!t || !qo(t)) return !1
    const s = t.current,
      { projection: a } = this.visualElement
    if (!a || !a.layout) return !1
    const l = wT(s, a.root, this.visualElement.getTransformPagePoint())
    let u = pT(a.layout.layoutBox, l)
    if (r) {
      const f = r(vT(u))
      ;((this.hasMutatedConstraints = !!f), f && (u = Vx(f)))
    }
    return u
  }
  startAnimation(t) {
    const {
        drag: r,
        dragMomentum: s,
        dragElastic: a,
        dragTransition: l,
        dragSnapToOrigin: u,
        onDragTransitionEnd: f,
      } = this.getProps(),
      p = this.constraints || {},
      g = nn((x) => {
        if (!cl(x, r, this.currentDirection)) return
        let h = (p && p[x]) || {}
        u && (h = { min: 0, max: 0 })
        const w = a ? 200 : 1e6,
          S = a ? 40 : 1e7,
          N = {
            type: 'inertia',
            velocity: s ? t[x] : 0,
            bounceStiffness: w,
            bounceDamping: S,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...l,
            ...h,
          }
        return this.startAxisValueAnimation(x, N)
      })
    return Promise.all(g).then(f)
  }
  startAxisValueAnimation(t, r) {
    const s = this.getAxisMotionValue(t)
    return (Md(this.visualElement, t), s.start(qf(t, s, 0, r, this.visualElement, !1)))
  }
  stopAnimation() {
    nn((t) => this.getAxisMotionValue(t).stop())
  }
  pauseAnimation() {
    nn((t) => {
      var r
      return (r = this.getAxisMotionValue(t).animation) === null || r === void 0
        ? void 0
        : r.pause()
    })
  }
  getAnimationState(t) {
    var r
    return (r = this.getAxisMotionValue(t).animation) === null || r === void 0 ? void 0 : r.state
  }
  getAxisMotionValue(t) {
    const r = `_drag${t.toUpperCase()}`,
      s = this.visualElement.getProps(),
      a = s[r]
    return a || this.visualElement.getValue(t, (s.initial ? s.initial[t] : void 0) || 0)
  }
  snapToCursor(t) {
    nn((r) => {
      const { drag: s } = this.getProps()
      if (!cl(r, s, this.currentDirection)) return
      const { projection: a } = this.visualElement,
        l = this.getAxisMotionValue(r)
      if (a && a.layout) {
        const { min: u, max: f } = a.layout.layoutBox[r]
        l.set(t[r] - We(u, f, 0.5))
      }
    })
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return
    const { drag: t, dragConstraints: r } = this.getProps(),
      { projection: s } = this.visualElement
    if (!qo(r) || !s || !this.constraints) return
    this.stopAnimation()
    const a = { x: 0, y: 0 }
    nn((u) => {
      const f = this.getAxisMotionValue(u)
      if (f && this.constraints !== !1) {
        const p = f.get()
        a[u] = mT({ min: p, max: p }, this.constraints[u])
      }
    })
    const { transformTemplate: l } = this.visualElement.getProps()
    ;((this.visualElement.current.style.transform = l ? l({}, '') : 'none'),
      s.root && s.root.updateScroll(),
      s.updateLayout(),
      this.resolveConstraints(),
      nn((u) => {
        if (!cl(u, t, null)) return
        const f = this.getAxisMotionValue(u),
          { min: p, max: g } = this.constraints[u]
        f.set(We(p, g, a[u]))
      }))
  }
  addListeners() {
    if (!this.visualElement.current) return
    bT.set(this.visualElement, this)
    const t = this.visualElement.current,
      r = gi(t, 'pointerdown', (p) => {
        const { drag: g, dragListener: x = !0 } = this.getProps()
        g && x && this.start(p)
      }),
      s = () => {
        const { dragConstraints: p } = this.getProps()
        qo(p) && p.current && (this.constraints = this.resolveRefConstraints())
      },
      { projection: a } = this.visualElement,
      l = a.addEventListener('measure', s)
    ;(a && !a.layout && (a.root && a.root.updateScroll(), a.updateLayout()), _e.read(s))
    const u = Ei(window, 'resize', () => this.scalePositionWithinConstraints()),
      f = a.addEventListener('didUpdate', ({ delta: p, hasLayoutChanged: g }) => {
        this.isDragging &&
          g &&
          (nn((x) => {
            const h = this.getAxisMotionValue(x)
            h && ((this.originPoint[x] += p[x].translate), h.set(h.get() + p[x].translate))
          }),
          this.visualElement.render())
      })
    return () => {
      ;(u(), r(), l(), f && f())
    }
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: r = !1,
        dragDirectionLock: s = !1,
        dragPropagation: a = !1,
        dragConstraints: l = !1,
        dragElastic: u = Bd,
        dragMomentum: f = !0,
      } = t
    return {
      ...t,
      drag: r,
      dragDirectionLock: s,
      dragPropagation: a,
      dragConstraints: l,
      dragElastic: u,
      dragMomentum: f,
    }
  }
}
function cl(e, t, r) {
  return (t === !0 || t === e) && (r === null || r === e)
}
function CT(e, t = 10) {
  let r = null
  return (Math.abs(e.y) > t ? (r = 'y') : Math.abs(e.x) > t && (r = 'x'), r)
}
class ET extends Fr {
  constructor(t) {
    ;(super(t),
      (this.removeGroupControls = Et),
      (this.removeListeners = Et),
      (this.controls = new ST(t)))
  }
  mount() {
    const { dragControls: t } = this.node.getProps()
    ;(t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Et))
  }
  unmount() {
    ;(this.removeGroupControls(), this.removeListeners())
  }
}
const ov = (e) => (t, r) => {
  e && _e.postRender(() => e(t, r))
}
class NT extends Fr {
  constructor() {
    ;(super(...arguments), (this.removePointerDownListener = Et))
  }
  onPointerDown(t) {
    this.session = new Ix(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Wx(this.node),
    })
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: r, onPan: s, onPanEnd: a } = this.node.getProps()
    return {
      onSessionStart: ov(t),
      onStart: ov(r),
      onMove: s,
      onEnd: (l, u) => {
        ;(delete this.session, a && _e.postRender(() => a(l, u)))
      },
    }
  }
  mount() {
    this.removePointerDownListener = gi(this.node.current, 'pointerdown', (t) =>
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
const xl = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 }
function sv(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100
}
const ii = {
    correct: (e, t) => {
      if (!t.target) return e
      if (typeof e == 'string')
        if (ye.test(e)) e = parseFloat(e)
        else return e
      const r = sv(e, t.target.x),
        s = sv(e, t.target.y)
      return `${r}% ${s}%`
    },
  },
  PT = {
    correct: (e, { treeScale: t, projectionDelta: r }) => {
      const s = e,
        a = Dr.parse(e)
      if (a.length > 5) return s
      const l = Dr.createTransformer(e),
        u = typeof a[0] != 'number' ? 1 : 0,
        f = r.x.scale * t.x,
        p = r.y.scale * t.y
      ;((a[0 + u] /= f), (a[1 + u] /= p))
      const g = We(f, p, 0.5)
      return (
        typeof a[2 + u] == 'number' && (a[2 + u] /= g),
        typeof a[3 + u] == 'number' && (a[3 + u] /= g),
        l(a)
      )
    },
  }
class TT extends v.Component {
  componentDidMount() {
    const { visualElement: t, layoutGroup: r, switchLayoutGroup: s, layoutId: a } = this.props,
      { projection: l } = t
    ;(QE(jT),
      l &&
        (r.group && r.group.add(l),
        s && s.register && a && s.register(l),
        l.root.didUpdate(),
        l.addEventListener('animationComplete', () => {
          this.safeToRemove()
        }),
        l.setOptions({ ...l.options, onExitComplete: () => this.safeToRemove() })),
      (xl.hasEverUpdated = !0))
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: r, visualElement: s, drag: a, isPresent: l } = this.props,
      u = s.projection
    return (
      u &&
        ((u.isPresent = l),
        a || t.layoutDependency !== r || r === void 0 ? u.willUpdate() : this.safeToRemove(),
        t.isPresent !== l &&
          (l
            ? u.promote()
            : u.relegate() ||
              _e.postRender(() => {
                const f = u.getStack()
                ;(!f || !f.members.length) && this.safeToRemove()
              }))),
      null
    )
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement
    t &&
      (t.root.didUpdate(),
      Cf.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove()
      }))
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: r, switchLayoutGroup: s } = this.props,
      { projection: a } = t
    a &&
      (a.scheduleCheckAfterUnmount(),
      r && r.group && r.group.remove(a),
      s && s.deregister && s.deregister(a))
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props
    t && t()
  }
  render() {
    return null
  }
}
function Ux(e) {
  const [t, r] = Ny(),
    s = v.useContext(hf)
  return d.jsx(TT, {
    ...e,
    layoutGroup: s,
    switchLayoutGroup: v.useContext(My),
    isPresent: t,
    safeToRemove: r,
  })
}
const jT = {
  borderRadius: {
    ...ii,
    applyTo: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ],
  },
  borderTopLeftRadius: ii,
  borderTopRightRadius: ii,
  borderBottomLeftRadius: ii,
  borderBottomRightRadius: ii,
  boxShadow: PT,
}
function kT(e, t, r) {
  const s = xt(e) ? e : Gn(e)
  return (s.start(qf('', s, t, r)), s.animation)
}
function RT(e) {
  return e instanceof SVGElement && e.tagName !== 'svg'
}
const AT = (e, t) => e.depth - t.depth
class MT {
  constructor() {
    ;((this.children = []), (this.isDirty = !1))
  }
  add(t) {
    ;(Ff(this.children, t), (this.isDirty = !0))
  }
  remove(t) {
    ;(Vf(this.children, t), (this.isDirty = !0))
  }
  forEach(t) {
    ;(this.isDirty && this.children.sort(AT), (this.isDirty = !1), this.children.forEach(t))
  }
}
function _T(e, t) {
  const r = Tn.now(),
    s = ({ timestamp: a }) => {
      const l = a - r
      l >= t && (kn(s), e(l - t))
    }
  return (_e.read(s, !0), () => kn(s))
}
const Hx = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  DT = Hx.length,
  iv = (e) => (typeof e == 'string' ? parseFloat(e) : e),
  av = (e) => typeof e == 'number' || ye.test(e)
function IT(e, t, r, s, a, l) {
  a
    ? ((e.opacity = We(0, r.opacity !== void 0 ? r.opacity : 1, OT(s))),
      (e.opacityExit = We(t.opacity !== void 0 ? t.opacity : 1, 0, LT(s))))
    : l &&
      (e.opacity = We(
        t.opacity !== void 0 ? t.opacity : 1,
        r.opacity !== void 0 ? r.opacity : 1,
        s
      ))
  for (let u = 0; u < DT; u++) {
    const f = `border${Hx[u]}Radius`
    let p = lv(t, f),
      g = lv(r, f)
    if (p === void 0 && g === void 0) continue
    ;(p || (p = 0),
      g || (g = 0),
      p === 0 || g === 0 || av(p) === av(g)
        ? ((e[f] = Math.max(We(iv(p), iv(g), s), 0)), (Pn.test(g) || Pn.test(p)) && (e[f] += '%'))
        : (e[f] = g))
  }
  ;(t.rotate || r.rotate) && (e.rotate = We(t.rotate || 0, r.rotate || 0, s))
}
function lv(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius
}
const OT = Gx(0, 0.5, lx),
  LT = Gx(0.5, 0.95, Et)
function Gx(e, t, r) {
  return (s) => (s < e ? 0 : s > t ? 1 : r(mo(e, t, s)))
}
function cv(e, t) {
  ;((e.min = t.min), (e.max = t.max))
}
function tn(e, t) {
  ;(cv(e.x, t.x), cv(e.y, t.y))
}
function uv(e, t) {
  ;((e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin))
}
function dv(e, t, r, s, a) {
  return ((e -= t), (e = Al(e, 1 / r, s)), a !== void 0 && (e = Al(e, 1 / a, s)), e)
}
function FT(e, t = 0, r = 1, s = 0.5, a, l = e, u = e) {
  if (
    (Pn.test(t) && ((t = parseFloat(t)), (t = We(u.min, u.max, t / 100) - u.min)),
    typeof t != 'number')
  )
    return
  let f = We(l.min, l.max, s)
  ;(e === l && (f -= t), (e.min = dv(e.min, t, r, f, a)), (e.max = dv(e.max, t, r, f, a)))
}
function fv(e, t, [r, s, a], l, u) {
  FT(e, t[r], t[s], t[a], t.scale, l, u)
}
const VT = ['x', 'scaleX', 'originX'],
  BT = ['y', 'scaleY', 'originY']
function pv(e, t, r, s) {
  ;(fv(e.x, t, VT, r ? r.x : void 0, s ? s.x : void 0),
    fv(e.y, t, BT, r ? r.y : void 0, s ? s.y : void 0))
}
function mv(e) {
  return e.translate === 0 && e.scale === 1
}
function Kx(e) {
  return mv(e.x) && mv(e.y)
}
function hv(e, t) {
  return e.min === t.min && e.max === t.max
}
function zT(e, t) {
  return hv(e.x, t.x) && hv(e.y, t.y)
}
function gv(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max)
}
function Yx(e, t) {
  return gv(e.x, t.x) && gv(e.y, t.y)
}
function vv(e) {
  return Ut(e.x) / Ut(e.y)
}
function yv(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint
}
class $T {
  constructor() {
    this.members = []
  }
  add(t) {
    ;(Ff(this.members, t), t.scheduleRender())
  }
  remove(t) {
    if ((Vf(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead)) {
      const r = this.members[this.members.length - 1]
      r && this.promote(r)
    }
  }
  relegate(t) {
    const r = this.members.findIndex((a) => t === a)
    if (r === 0) return !1
    let s
    for (let a = r; a >= 0; a--) {
      const l = this.members[a]
      if (l.isPresent !== !1) {
        s = l
        break
      }
    }
    return s ? (this.promote(s), !0) : !1
  }
  promote(t, r) {
    const s = this.lead
    if (t !== s && ((this.prevLead = s), (this.lead = t), t.show(), s)) {
      ;(s.instance && s.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = s),
        r && (t.resumeFrom.preserveOpacity = !0),
        s.snapshot &&
          ((t.snapshot = s.snapshot),
          (t.snapshot.latestValues = s.animationValues || s.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0))
      const { crossfade: a } = t.options
      a === !1 && s.hide()
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: r, resumingFrom: s } = t
      ;(r.onExitComplete && r.onExitComplete(),
        s && s.options.onExitComplete && s.options.onExitComplete())
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
function WT(e, t, r) {
  let s = ''
  const a = e.x.translate / t.x,
    l = e.y.translate / t.y,
    u = r?.z || 0
  if (
    ((a || l || u) && (s = `translate3d(${a}px, ${l}px, ${u}px) `),
    (t.x !== 1 || t.y !== 1) && (s += `scale(${1 / t.x}, ${1 / t.y}) `),
    r)
  ) {
    const { transformPerspective: g, rotate: x, rotateX: h, rotateY: w, skewX: S, skewY: N } = r
    ;(g && (s = `perspective(${g}px) ${s}`),
      x && (s += `rotate(${x}deg) `),
      h && (s += `rotateX(${h}deg) `),
      w && (s += `rotateY(${w}deg) `),
      S && (s += `skewX(${S}deg) `),
      N && (s += `skewY(${N}deg) `))
  }
  const f = e.x.scale * t.x,
    p = e.y.scale * t.y
  return ((f !== 1 || p !== 1) && (s += `scale(${f}, ${p})`), s || 'none')
}
const uo = {
    type: 'projectionFrame',
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  fi = typeof window < 'u' && window.MotionDebug !== void 0,
  cd = ['', 'X', 'Y', 'Z'],
  UT = { visibility: 'hidden' },
  xv = 1e3
let HT = 0
function ud(e, t, r, s) {
  const { latestValues: a } = t
  a[e] && ((r[e] = a[e]), t.setStaticValue(e, 0), s && (s[e] = 0))
}
function Xx(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return
  const { visualElement: t } = e.options
  if (!t) return
  const r = tx(t)
  if (window.MotionHasOptimisedAnimation(r, 'transform')) {
    const { layout: a, layoutId: l } = e.options
    window.MotionCancelOptimisedAnimation(r, 'transform', _e, !(a || l))
  }
  const { parent: s } = e
  s && !s.hasCheckedOptimisedAppear && Xx(s)
}
function qx({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: r,
  checkIsScrollRoot: s,
  resetTransform: a,
}) {
  return class {
    constructor(u = {}, f = t?.()) {
      ;((this.id = HT++),
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
            fi && (uo.totalNodes = uo.resolvedTargetDeltas = uo.recalculatedProjection = 0),
            this.nodes.forEach(YT),
            this.nodes.forEach(JT),
            this.nodes.forEach(ej),
            this.nodes.forEach(XT),
            fi && window.MotionDebug.record(uo))
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = u),
        (this.root = f ? f.root || f : this),
        (this.path = f ? [...f.path, f] : []),
        (this.parent = f),
        (this.depth = f ? f.depth + 1 : 0))
      for (let p = 0; p < this.path.length; p++) this.path[p].shouldResetTransform = !0
      this.root === this && (this.nodes = new MT())
    }
    addEventListener(u, f) {
      return (
        this.eventHandlers.has(u) || this.eventHandlers.set(u, new Bf()),
        this.eventHandlers.get(u).add(f)
      )
    }
    notifyListeners(u, ...f) {
      const p = this.eventHandlers.get(u)
      p && p.notify(...f)
    }
    hasListeners(u) {
      return this.eventHandlers.has(u)
    }
    mount(u, f = this.root.hasTreeAnimated) {
      if (this.instance) return
      ;((this.isSVG = RT(u)), (this.instance = u))
      const { layoutId: p, layout: g, visualElement: x } = this.options
      if (
        (x && !x.current && x.mount(u),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        f && (g || p) && (this.isLayoutDirty = !0),
        e)
      ) {
        let h
        const w = () => (this.root.updateBlockedByResize = !1)
        e(u, () => {
          ;((this.root.updateBlockedByResize = !0),
            h && h(),
            (h = _T(w, 250)),
            xl.hasAnimatedSinceResize && ((xl.hasAnimatedSinceResize = !1), this.nodes.forEach(bv)))
        })
      }
      ;(p && this.root.registerSharedNode(p, this),
        this.options.animate !== !1 &&
          x &&
          (p || g) &&
          this.addEventListener(
            'didUpdate',
            ({ delta: h, hasLayoutChanged: w, hasRelativeTargetChanged: S, layout: N }) => {
              if (this.isTreeAnimationBlocked()) {
                ;((this.target = void 0), (this.relativeTarget = void 0))
                return
              }
              const C = this.options.transition || x.getDefaultTransition() || sj,
                { onLayoutAnimationStart: E, onLayoutAnimationComplete: P } = x.getProps(),
                j = !this.targetLayout || !Yx(this.targetLayout, N) || S,
                k = !w && S
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                k ||
                (w && (j || !this.currentAnimation))
              ) {
                ;(this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(h, k))
                const _ = { ..._f(C, 'layout'), onPlay: E, onComplete: P }
                ;((x.shouldReduceMotion || this.options.layoutRoot) &&
                  ((_.delay = 0), (_.type = !1)),
                  this.startAnimation(_))
              } else
                (w || bv(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete())
              this.targetLayout = N
            }
          ))
    }
    unmount() {
      ;(this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this))
      const u = this.getStack()
      ;(u && u.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        kn(this.updateProjection))
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
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(tj), this.animationId++)
    }
    getTransformTemplate() {
      const { visualElement: u } = this.options
      return u && u.getProps().transformTemplate
    }
    willUpdate(u = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete()
        return
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Xx(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return
      this.isLayoutDirty = !0
      for (let x = 0; x < this.path.length; x++) {
        const h = this.path[x]
        ;((h.shouldResetTransform = !0),
          h.updateScroll('snapshot'),
          h.options.layoutRoot && h.willUpdate(!1))
      }
      const { layoutId: f, layout: p } = this.options
      if (f === void 0 && !p) return
      const g = this.getTransformTemplate()
      ;((this.prevTransformTemplateValue = g ? g(this.latestValues, '') : void 0),
        this.updateSnapshot(),
        u && this.notifyListeners('willUpdate'))
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        ;(this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(wv))
        return
      }
      ;(this.isUpdating || this.nodes.forEach(QT),
        (this.isUpdating = !1),
        this.nodes.forEach(ZT),
        this.nodes.forEach(GT),
        this.nodes.forEach(KT),
        this.clearAllSnapshots())
      const f = Tn.now()
      ;((at.delta = Rn(0, 1e3 / 60, f - at.timestamp)),
        (at.timestamp = f),
        (at.isProcessing = !0),
        ed.update.process(at),
        ed.preRender.process(at),
        ed.render.process(at),
        (at.isProcessing = !1))
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), Cf.read(this.scheduleUpdate))
    }
    clearAllSnapshots() {
      ;(this.nodes.forEach(qT), this.sharedNodes.forEach(nj))
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), _e.preRender(this.updateProjection, !1, !0))
    }
    scheduleCheckAfterUnmount() {
      _e.postRender(() => {
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
        for (let p = 0; p < this.path.length; p++) this.path[p].updateScroll()
      const u = this.layout
      ;((this.layout = this.measure(!1)),
        (this.layoutCorrected = Xe()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox))
      const { visualElement: f } = this.options
      f && f.notify('LayoutMeasure', this.layout.layoutBox, u ? u.layoutBox : void 0)
    }
    updateScroll(u = 'measure') {
      let f = !!(this.options.layoutScroll && this.instance)
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === u &&
          (f = !1),
        f)
      ) {
        const p = s(this.instance)
        this.scroll = {
          animationId: this.root.animationId,
          phase: u,
          isRoot: p,
          offset: r(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p,
        }
      }
    }
    resetTransform() {
      if (!a) return
      const u = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        f = this.projectionDelta && !Kx(this.projectionDelta),
        p = this.getTransformTemplate(),
        g = p ? p(this.latestValues, '') : void 0,
        x = g !== this.prevTransformTemplateValue
      u &&
        (f || co(this.latestValues) || x) &&
        (a(this.instance, g), (this.shouldResetTransform = !1), this.scheduleRender())
    }
    measure(u = !0) {
      const f = this.measurePageBox()
      let p = this.removeElementScroll(f)
      return (
        u && (p = this.removeTransform(p)),
        ij(p),
        {
          animationId: this.root.animationId,
          measuredBox: f,
          layoutBox: p,
          latestValues: {},
          source: this.id,
        }
      )
    }
    measurePageBox() {
      var u
      const { visualElement: f } = this.options
      if (!f) return Xe()
      const p = f.measureViewportBox()
      if (
        !(((u = this.scroll) === null || u === void 0 ? void 0 : u.wasRoot) || this.path.some(aj))
      ) {
        const { scroll: x } = this.root
        x && (Jo(p.x, x.offset.x), Jo(p.y, x.offset.y))
      }
      return p
    }
    removeElementScroll(u) {
      var f
      const p = Xe()
      if ((tn(p, u), !((f = this.scroll) === null || f === void 0) && f.wasRoot)) return p
      for (let g = 0; g < this.path.length; g++) {
        const x = this.path[g],
          { scroll: h, options: w } = x
        x !== this.root &&
          h &&
          w.layoutScroll &&
          (h.wasRoot && tn(p, u), Jo(p.x, h.offset.x), Jo(p.y, h.offset.y))
      }
      return p
    }
    applyTransform(u, f = !1) {
      const p = Xe()
      tn(p, u)
      for (let g = 0; g < this.path.length; g++) {
        const x = this.path[g]
        ;(!f &&
          x.options.layoutScroll &&
          x.scroll &&
          x !== x.root &&
          es(p, { x: -x.scroll.offset.x, y: -x.scroll.offset.y }),
          co(x.latestValues) && es(p, x.latestValues))
      }
      return (co(this.latestValues) && es(p, this.latestValues), p)
    }
    removeTransform(u) {
      const f = Xe()
      tn(f, u)
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p]
        if (!g.instance || !co(g.latestValues)) continue
        zd(g.latestValues) && g.updateSnapshot()
        const x = Xe(),
          h = g.measurePageBox()
        ;(tn(x, h), pv(f, g.latestValues, g.snapshot ? g.snapshot.layoutBox : void 0, x))
      }
      return (co(this.latestValues) && pv(f, this.latestValues), f)
    }
    setTargetDelta(u) {
      ;((this.targetDelta = u), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0))
    }
    setOptions(u) {
      this.options = { ...this.options, ...u, crossfade: u.crossfade !== void 0 ? u.crossfade : !0 }
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
        this.relativeParent.resolvedRelativeTargetAt !== at.timestamp &&
        this.relativeParent.resolveTargetDelta(!0)
    }
    resolveTargetDelta(u = !1) {
      var f
      const p = this.getLead()
      ;(this.isProjectionDirty || (this.isProjectionDirty = p.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = p.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = p.isSharedProjectionDirty))
      const g = !!this.resumingFrom || this !== p
      if (
        !(
          u ||
          (g && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((f = this.parent) === null || f === void 0) && f.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return
      const { layout: h, layoutId: w } = this.options
      if (!(!this.layout || !(h || w))) {
        if (
          ((this.resolvedRelativeTargetAt = at.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const S = this.getClosestProjectingParent()
          S && S.layout && this.animationProgress !== 1
            ? ((this.relativeParent = S),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Xe()),
              (this.relativeTargetOrigin = Xe()),
              yi(this.relativeTargetOrigin, this.layout.layoutBox, S.layout.layoutBox),
              tn(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0)
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target || ((this.target = Xe()), (this.targetWithTransforms = Xe())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                uT(this.target, this.relativeTarget, this.relativeParent.target))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : tn(this.target, this.layout.layoutBox),
                  zx(this.target, this.targetDelta))
                : tn(this.target, this.layout.layoutBox),
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
                (this.relativeTarget = Xe()),
                (this.relativeTargetOrigin = Xe()),
                yi(this.relativeTargetOrigin, this.target, S.target),
                tn(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0)
          }
          fi && uo.resolvedTargetDeltas++
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || zd(this.parent.latestValues) || Bx(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
    }
    calcProjection() {
      var u
      const f = this.getLead(),
        p = !!this.resumingFrom || this !== f
      let g = !0
      if (
        ((this.isProjectionDirty ||
          (!((u = this.parent) === null || u === void 0) && u.isProjectionDirty)) &&
          (g = !1),
        p && (this.isSharedProjectionDirty || this.isTransformDirty) && (g = !1),
        this.resolvedRelativeTargetAt === at.timestamp && (g = !1),
        g)
      )
        return
      const { layout: x, layoutId: h } = this.options
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(x || h))
      )
        return
      tn(this.layoutCorrected, this.layout.layoutBox)
      const w = this.treeScale.x,
        S = this.treeScale.y
      ;(xT(this.layoutCorrected, this.treeScale, this.path, p),
        f.layout &&
          !f.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((f.target = f.layout.layoutBox), (f.targetWithTransforms = Xe())))
      const { target: N } = f
      if (!N) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender())
        return
      }
      ;(!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (uv(this.prevProjectionDelta.x, this.projectionDelta.x),
          uv(this.prevProjectionDelta.y, this.projectionDelta.y)),
        vi(this.projectionDelta, this.layoutCorrected, N, this.latestValues),
        (this.treeScale.x !== w ||
          this.treeScale.y !== S ||
          !yv(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !yv(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners('projectionUpdate', N)),
        fi && uo.recalculatedProjection++)
    }
    hide() {
      this.isVisible = !1
    }
    show() {
      this.isVisible = !0
    }
    scheduleRender(u = !0) {
      var f
      if (((f = this.options.visualElement) === null || f === void 0 || f.scheduleRender(), u)) {
        const p = this.getStack()
        p && p.scheduleRender()
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
    }
    createProjectionDeltas() {
      ;((this.prevProjectionDelta = Zo()),
        (this.projectionDelta = Zo()),
        (this.projectionDeltaWithTransform = Zo()))
    }
    setAnimationOrigin(u, f = !1) {
      const p = this.snapshot,
        g = p ? p.latestValues : {},
        x = { ...this.latestValues },
        h = Zo()
      ;((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !f))
      const w = Xe(),
        S = p ? p.source : void 0,
        N = this.layout ? this.layout.source : void 0,
        C = S !== N,
        E = this.getStack(),
        P = !E || E.members.length <= 1,
        j = !!(C && !P && this.options.crossfade === !0 && !this.path.some(oj))
      this.animationProgress = 0
      let k
      ;((this.mixTargetDelta = (_) => {
        const I = _ / 1e3
        ;(Sv(h.x, u.x, I),
          Sv(h.y, u.y, I),
          this.setTargetDelta(h),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (yi(w, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            rj(this.relativeTarget, this.relativeTargetOrigin, w, I),
            k && zT(this.relativeTarget, k) && (this.isProjectionDirty = !1),
            k || (k = Xe()),
            tn(k, this.relativeTarget)),
          C && ((this.animationValues = x), IT(x, g, this.latestValues, I, j, P)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = I))
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0))
    }
    startAnimation(u) {
      ;(this.notifyListeners('animationStart'),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation && (kn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = _e.update(() => {
          ;((xl.hasAnimatedSinceResize = !0),
            (this.currentAnimation = kT(0, xv, {
              ...u,
              onUpdate: (f) => {
                ;(this.mixTargetDelta(f), u.onUpdate && u.onUpdate(f))
              },
              onComplete: () => {
                ;(u.onComplete && u.onComplete(), this.completeAnimation())
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
      const u = this.getStack()
      ;(u && u.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners('animationComplete'))
    }
    finishAnimation() {
      ;(this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(xv), this.currentAnimation.stop()),
        this.completeAnimation())
    }
    applyTransformsToTarget() {
      const u = this.getLead()
      let { targetWithTransforms: f, target: p, layout: g, latestValues: x } = u
      if (!(!f || !p || !g)) {
        if (
          this !== u &&
          this.layout &&
          g &&
          Qx(this.options.animationType, this.layout.layoutBox, g.layoutBox)
        ) {
          p = this.target || Xe()
          const h = Ut(this.layout.layoutBox.x)
          ;((p.x.min = u.target.x.min), (p.x.max = p.x.min + h))
          const w = Ut(this.layout.layoutBox.y)
          ;((p.y.min = u.target.y.min), (p.y.max = p.y.min + w))
        }
        ;(tn(f, p), es(f, x), vi(this.projectionDeltaWithTransform, this.layoutCorrected, f, x))
      }
    }
    registerSharedNode(u, f) {
      ;(this.sharedNodes.has(u) || this.sharedNodes.set(u, new $T()),
        this.sharedNodes.get(u).add(f))
      const g = f.options.initialPromotionConfig
      f.promote({
        transition: g ? g.transition : void 0,
        preserveFollowOpacity:
          g && g.shouldPreserveFollowOpacity ? g.shouldPreserveFollowOpacity(f) : void 0,
      })
    }
    isLead() {
      const u = this.getStack()
      return u ? u.lead === this : !0
    }
    getLead() {
      var u
      const { layoutId: f } = this.options
      return f ? ((u = this.getStack()) === null || u === void 0 ? void 0 : u.lead) || this : this
    }
    getPrevLead() {
      var u
      const { layoutId: f } = this.options
      return f ? ((u = this.getStack()) === null || u === void 0 ? void 0 : u.prevLead) : void 0
    }
    getStack() {
      const { layoutId: u } = this.options
      if (u) return this.root.sharedNodes.get(u)
    }
    promote({ needsReset: u, transition: f, preserveFollowOpacity: p } = {}) {
      const g = this.getStack()
      ;(g && g.promote(this, p),
        u && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        f && this.setOptions({ transition: f }))
    }
    relegate() {
      const u = this.getStack()
      return u ? u.relegate(this) : !1
    }
    resetSkewAndRotation() {
      const { visualElement: u } = this.options
      if (!u) return
      let f = !1
      const { latestValues: p } = u
      if (
        ((p.z || p.rotate || p.rotateX || p.rotateY || p.rotateZ || p.skewX || p.skewY) && (f = !0),
        !f)
      )
        return
      const g = {}
      p.z && ud('z', u, g, this.animationValues)
      for (let x = 0; x < cd.length; x++)
        (ud(`rotate${cd[x]}`, u, g, this.animationValues),
          ud(`skew${cd[x]}`, u, g, this.animationValues))
      u.render()
      for (const x in g)
        (u.setStaticValue(x, g[x]), this.animationValues && (this.animationValues[x] = g[x]))
      u.scheduleRender()
    }
    getProjectionStyles(u) {
      var f, p
      if (!this.instance || this.isSVG) return
      if (!this.isVisible) return UT
      const g = { visibility: '' },
        x = this.getTransformTemplate()
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (g.opacity = ''),
          (g.pointerEvents = vl(u?.pointerEvents) || ''),
          (g.transform = x ? x(this.latestValues, '') : 'none'),
          g
        )
      const h = this.getLead()
      if (!this.projectionDelta || !this.layout || !h.target) {
        const C = {}
        return (
          this.options.layoutId &&
            ((C.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
            (C.pointerEvents = vl(u?.pointerEvents) || '')),
          this.hasProjected &&
            !co(this.latestValues) &&
            ((C.transform = x ? x({}, '') : 'none'), (this.hasProjected = !1)),
          C
        )
      }
      const w = h.animationValues || h.latestValues
      ;(this.applyTransformsToTarget(),
        (g.transform = WT(this.projectionDeltaWithTransform, this.treeScale, w)),
        x && (g.transform = x(w, g.transform)))
      const { x: S, y: N } = this.projectionDelta
      ;((g.transformOrigin = `${S.origin * 100}% ${N.origin * 100}% 0`),
        h.animationValues
          ? (g.opacity =
              h === this
                ? (p = (f = w.opacity) !== null && f !== void 0 ? f : this.latestValues.opacity) !==
                    null && p !== void 0
                  ? p
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : w.opacityExit)
          : (g.opacity =
              h === this
                ? w.opacity !== void 0
                  ? w.opacity
                  : ''
                : w.opacityExit !== void 0
                  ? w.opacityExit
                  : 0))
      for (const C in Pl) {
        if (w[C] === void 0) continue
        const { correct: E, applyTo: P } = Pl[C],
          j = g.transform === 'none' ? w[C] : E(w[C], h)
        if (P) {
          const k = P.length
          for (let _ = 0; _ < k; _++) g[P[_]] = j
        } else g[C] = j
      }
      return (
        this.options.layoutId &&
          (g.pointerEvents = h === this ? vl(u?.pointerEvents) || '' : 'none'),
        g
      )
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0
    }
    resetTree() {
      ;(this.root.nodes.forEach((u) => {
        var f
        return (f = u.currentAnimation) === null || f === void 0 ? void 0 : f.stop()
      }),
        this.root.nodes.forEach(wv),
        this.root.sharedNodes.clear())
    }
  }
}
function GT(e) {
  e.updateLayout()
}
function KT(e) {
  var t
  const r = ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) || e.snapshot
  if (e.isLead() && e.layout && r && e.hasListeners('didUpdate')) {
    const { layoutBox: s, measuredBox: a } = e.layout,
      { animationType: l } = e.options,
      u = r.source !== e.layout.source
    l === 'size'
      ? nn((h) => {
          const w = u ? r.measuredBox[h] : r.layoutBox[h],
            S = Ut(w)
          ;((w.min = s[h].min), (w.max = w.min + S))
        })
      : Qx(l, r.layoutBox, s) &&
        nn((h) => {
          const w = u ? r.measuredBox[h] : r.layoutBox[h],
            S = Ut(s[h])
          ;((w.max = w.min + S),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0), (e.relativeTarget[h].max = e.relativeTarget[h].min + S)))
        })
    const f = Zo()
    vi(f, s, r.layoutBox)
    const p = Zo()
    u ? vi(p, e.applyTransform(a, !0), r.measuredBox) : vi(p, s, r.layoutBox)
    const g = !Kx(f)
    let x = !1
    if (!e.resumeFrom) {
      const h = e.getClosestProjectingParent()
      if (h && !h.resumeFrom) {
        const { snapshot: w, layout: S } = h
        if (w && S) {
          const N = Xe()
          yi(N, r.layoutBox, w.layoutBox)
          const C = Xe()
          ;(yi(C, s, S.layoutBox),
            Yx(N, C) || (x = !0),
            h.options.layoutRoot &&
              ((e.relativeTarget = C), (e.relativeTargetOrigin = N), (e.relativeParent = h)))
        }
      }
    }
    e.notifyListeners('didUpdate', {
      layout: s,
      snapshot: r,
      delta: p,
      layoutDelta: f,
      hasLayoutChanged: g,
      hasRelativeTargetChanged: x,
    })
  } else if (e.isLead()) {
    const { onExitComplete: s } = e.options
    s && s()
  }
  e.options.transition = void 0
}
function YT(e) {
  ;(fi && uo.totalNodes++,
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
function XT(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1
}
function qT(e) {
  e.clearSnapshot()
}
function wv(e) {
  e.clearMeasurements()
}
function QT(e) {
  e.isLayoutDirty = !1
}
function ZT(e) {
  const { visualElement: t } = e.options
  ;(t && t.getProps().onBeforeLayoutMeasure && t.notify('BeforeLayoutMeasure'), e.resetTransform())
}
function bv(e) {
  ;(e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0))
}
function JT(e) {
  e.resolveTargetDelta()
}
function ej(e) {
  e.calcProjection()
}
function tj(e) {
  e.resetSkewAndRotation()
}
function nj(e) {
  e.removeLeadSnapshot()
}
function Sv(e, t, r) {
  ;((e.translate = We(t.translate, 0, r)),
    (e.scale = We(t.scale, 1, r)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint))
}
function Cv(e, t, r, s) {
  ;((e.min = We(t.min, r.min, s)), (e.max = We(t.max, r.max, s)))
}
function rj(e, t, r, s) {
  ;(Cv(e.x, t.x, r.x, s), Cv(e.y, t.y, r.y, s))
}
function oj(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0
}
const sj = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Ev = (e) =>
    typeof navigator < 'u' && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
  Nv = Ev('applewebkit/') && !Ev('chrome/') ? Math.round : Et
function Pv(e) {
  ;((e.min = Nv(e.min)), (e.max = Nv(e.max)))
}
function ij(e) {
  ;(Pv(e.x), Pv(e.y))
}
function Qx(e, t, r) {
  return e === 'position' || (e === 'preserve-aspect' && !cT(vv(t), vv(r), 0.2))
}
function aj(e) {
  var t
  return e !== e.root && ((t = e.scroll) === null || t === void 0 ? void 0 : t.wasRoot)
}
const lj = qx({
    attachResizeListener: (e, t) => Ei(e, 'resize', t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  dd = { current: void 0 },
  Zx = qx({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!dd.current) {
        const e = new lj({})
        ;(e.mount(window), e.setOptions({ layoutScroll: !0 }), (dd.current = e))
      }
      return dd.current
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : 'none'
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === 'fixed',
  }),
  cj = { pan: { Feature: NT }, drag: { Feature: ET, ProjectionNode: Zx, MeasureLayout: Ux } }
function Tv(e, t, r) {
  const { props: s } = e
  e.animationState && s.whileHover && e.animationState.setActive('whileHover', r === 'Start')
  const a = 'onHover' + r,
    l = s[a]
  l && _e.postRender(() => l(t, _i(t)))
}
class uj extends Fr {
  mount() {
    const { current: t } = this.node
    t && (this.unmount = dN(t, (r) => (Tv(this.node, r, 'Start'), (s) => Tv(this.node, s, 'End'))))
  }
  unmount() {}
}
class dj extends Fr {
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
    this.unmount = Mi(
      Ei(this.node.current, 'focus', () => this.onFocus()),
      Ei(this.node.current, 'blur', () => this.onBlur())
    )
  }
  unmount() {}
}
function jv(e, t, r) {
  const { props: s } = e
  e.animationState && s.whileTap && e.animationState.setActive('whileTap', r === 'Start')
  const a = 'onTap' + (r === 'End' ? '' : r),
    l = s[a]
  l && _e.postRender(() => l(t, _i(t)))
}
class fj extends Fr {
  mount() {
    const { current: t } = this.node
    t &&
      (this.unmount = hN(
        t,
        (r) => (
          jv(this.node, r, 'Start'),
          (s, { success: a }) => jv(this.node, s, a ? 'End' : 'Cancel')
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ))
  }
  unmount() {}
}
const Wd = new WeakMap(),
  fd = new WeakMap(),
  pj = (e) => {
    const t = Wd.get(e.target)
    t && t(e)
  },
  mj = (e) => {
    e.forEach(pj)
  }
function hj({ root: e, ...t }) {
  const r = e || document
  fd.has(r) || fd.set(r, {})
  const s = fd.get(r),
    a = JSON.stringify(t)
  return (s[a] || (s[a] = new IntersectionObserver(mj, { root: e, ...t })), s[a])
}
function gj(e, t, r) {
  const s = hj(t)
  return (
    Wd.set(e, r),
    s.observe(e),
    () => {
      ;(Wd.delete(e), s.unobserve(e))
    }
  )
}
const vj = { some: 0, all: 1 }
class yj extends Fr {
  constructor() {
    ;(super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1))
  }
  startObserver() {
    this.unmount()
    const { viewport: t = {} } = this.node.getProps(),
      { root: r, margin: s, amount: a = 'some', once: l } = t,
      u = {
        root: r ? r.current : void 0,
        rootMargin: s,
        threshold: typeof a == 'number' ? a : vj[a],
      },
      f = (p) => {
        const { isIntersecting: g } = p
        if (this.isInView === g || ((this.isInView = g), l && !g && this.hasEnteredView)) return
        ;(g && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive('whileInView', g))
        const { onViewportEnter: x, onViewportLeave: h } = this.node.getProps(),
          w = g ? x : h
        w && w(p)
      }
    return gj(this.node.current, u, f)
  }
  mount() {
    this.startObserver()
  }
  update() {
    if (typeof IntersectionObserver > 'u') return
    const { props: t, prevProps: r } = this.node
    ;['amount', 'margin', 'root'].some(xj(t, r)) && this.startObserver()
  }
  unmount() {}
}
function xj({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (r) => e[r] !== t[r]
}
const wj = {
    inView: { Feature: yj },
    tap: { Feature: fj },
    focus: { Feature: dj },
    hover: { Feature: uj },
  },
  bj = { layout: { ProjectionNode: Zx, MeasureLayout: Ux } },
  Ud = { current: null },
  Jx = { current: !1 }
function Sj() {
  if (((Jx.current = !0), !!vf))
    if (window.matchMedia) {
      const e = window.matchMedia('(prefers-reduced-motion)'),
        t = () => (Ud.current = e.matches)
      ;(e.addListener(t), t())
    } else Ud.current = !1
}
const Cj = [...Sx, yt, Dr],
  Ej = (e) => Cj.find(bx(e)),
  kv = new WeakMap()
function Nj(e, t, r) {
  for (const s in t) {
    const a = t[s],
      l = r[s]
    if (xt(a)) e.addValue(s, a)
    else if (xt(l)) e.addValue(s, Gn(a, { owner: e }))
    else if (l !== a)
      if (e.hasValue(s)) {
        const u = e.getValue(s)
        u.liveStyle === !0 ? u.jump(a) : u.hasAnimated || u.set(a)
      } else {
        const u = e.getStaticValue(s)
        e.addValue(s, Gn(u !== void 0 ? u : a, { owner: e }))
      }
  }
  for (const s in r) t[s] === void 0 && e.removeValue(s)
  return t
}
const Rv = [
  'AnimationStart',
  'AnimationComplete',
  'Update',
  'BeforeLayoutMeasure',
  'LayoutMeasure',
  'LayoutAnimationStart',
  'LayoutAnimationComplete',
]
class Pj {
  scrapeMotionValuesFromProps(t, r, s) {
    return {}
  }
  constructor(
    {
      parent: t,
      props: r,
      presenceContext: s,
      reducedMotionConfig: a,
      blockInitialAnimation: l,
      visualState: u,
    },
    f = {}
  ) {
    ;((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Kf),
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
        const S = Tn.now()
        this.renderScheduledAt < S && ((this.renderScheduledAt = S), _e.render(this.render, !1, !0))
      }))
    const { latestValues: p, renderState: g, onUpdate: x } = u
    ;((this.onUpdate = x),
      (this.latestValues = p),
      (this.baseTarget = { ...p }),
      (this.initialValues = r.initial ? { ...p } : {}),
      (this.renderState = g),
      (this.parent = t),
      (this.props = r),
      (this.presenceContext = s),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = a),
      (this.options = f),
      (this.blockInitialAnimation = !!l),
      (this.isControllingVariants = Hl(r)),
      (this.isVariantNode = Ry(r)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current)))
    const { willChange: h, ...w } = this.scrapeMotionValuesFromProps(r, {}, this)
    for (const S in w) {
      const N = w[S]
      p[S] !== void 0 && xt(N) && N.set(p[S], !1)
    }
  }
  mount(t) {
    ;((this.current = t),
      kv.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((r, s) => this.bindToMotionValue(s, r)),
      Jx.current || Sj(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === 'never'
          ? !1
          : this.reducedMotionConfig === 'always'
            ? !0
            : Ud.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext))
  }
  unmount() {
    ;(kv.delete(this.current),
      this.projection && this.projection.unmount(),
      kn(this.notifyUpdate),
      kn(this.render),
      this.valueSubscriptions.forEach((t) => t()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this))
    for (const t in this.events) this.events[t].clear()
    for (const t in this.features) {
      const r = this.features[t]
      r && (r.unmount(), (r.isMounted = !1))
    }
    this.current = null
  }
  bindToMotionValue(t, r) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)()
    const s = wo.has(t),
      a = r.on('change', (f) => {
        ;((this.latestValues[t] = f),
          this.props.onUpdate && _e.preRender(this.notifyUpdate),
          s && this.projection && (this.projection.isTransformDirty = !0))
      }),
      l = r.on('renderRequest', this.scheduleRender)
    let u
    ;(window.MotionCheckAppearSync && (u = window.MotionCheckAppearSync(this, t, r)),
      this.valueSubscriptions.set(t, () => {
        ;(a(), l(), u && u(), r.owner && r.stop())
      }))
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current)
  }
  updateFeatures() {
    let t = 'animation'
    for (t in ss) {
      const r = ss[t]
      if (!r) continue
      const { isEnabled: s, Feature: a } = r
      if (
        (!this.features[t] && a && s(this.props) && (this.features[t] = new a(this)),
        this.features[t])
      ) {
        const l = this.features[t]
        l.isMounted ? l.update() : (l.mount(), (l.isMounted = !0))
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props)
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Xe()
  }
  getStaticValue(t) {
    return this.latestValues[t]
  }
  setStaticValue(t, r) {
    this.latestValues[t] = r
  }
  update(t, r) {
    ;((t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = r))
    for (let s = 0; s < Rv.length; s++) {
      const a = Rv[s]
      this.propEventSubscriptions[a] &&
        (this.propEventSubscriptions[a](), delete this.propEventSubscriptions[a])
      const l = 'on' + a,
        u = t[l]
      u && (this.propEventSubscriptions[a] = this.on(a, u))
    }
    ;((this.prevMotionValues = Nj(
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
    const r = this.getClosestVariantNode()
    if (r) return (r.variantChildren && r.variantChildren.add(t), () => r.variantChildren.delete(t))
  }
  addValue(t, r) {
    const s = this.values.get(t)
    r !== s &&
      (s && this.removeValue(t),
      this.bindToMotionValue(t, r),
      this.values.set(t, r),
      (this.latestValues[t] = r.get()))
  }
  removeValue(t) {
    this.values.delete(t)
    const r = this.valueSubscriptions.get(t)
    ;(r && (r(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState))
  }
  hasValue(t) {
    return this.values.has(t)
  }
  getValue(t, r) {
    if (this.props.values && this.props.values[t]) return this.props.values[t]
    let s = this.values.get(t)
    return (
      s === void 0 &&
        r !== void 0 &&
        ((s = Gn(r === null ? void 0 : r, { owner: this })), this.addValue(t, s)),
      s
    )
  }
  readValue(t, r) {
    var s
    let a =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (s = this.getBaseTargetFromProps(this.props, t)) !== null && s !== void 0
          ? s
          : this.readValueFromInstance(this.current, t, this.options)
    return (
      a != null &&
        (typeof a == 'string' && (xx(a) || ux(a))
          ? (a = parseFloat(a))
          : !Ej(a) && Dr.test(r) && (a = gx(t, r)),
        this.setBaseTarget(t, xt(a) ? a.get() : a)),
      xt(a) ? a.get() : a
    )
  }
  setBaseTarget(t, r) {
    this.baseTarget[t] = r
  }
  getBaseTarget(t) {
    var r
    const { initial: s } = this.props
    let a
    if (typeof s == 'string' || typeof s == 'object') {
      const u = Nf(
        this.props,
        s,
        (r = this.presenceContext) === null || r === void 0 ? void 0 : r.custom
      )
      u && (a = u[t])
    }
    if (s && a !== void 0) return a
    const l = this.getBaseTargetFromProps(this.props, t)
    return l !== void 0 && !xt(l)
      ? l
      : this.initialValues[t] !== void 0 && a === void 0
        ? void 0
        : this.baseTarget[t]
  }
  on(t, r) {
    return (this.events[t] || (this.events[t] = new Bf()), this.events[t].add(r))
  }
  notify(t, ...r) {
    this.events[t] && this.events[t].notify(...r)
  }
}
class e0 extends Pj {
  constructor() {
    ;(super(...arguments), (this.KeyframeResolver = Cx))
  }
  sortInstanceNodePosition(t, r) {
    return t.compareDocumentPosition(r) & 2 ? 1 : -1
  }
  getBaseTargetFromProps(t, r) {
    return t.style ? t.style[r] : void 0
  }
  removeValueFromRenderState(t, { vars: r, style: s }) {
    ;(delete r[t], delete s[t])
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription)
    const { children: t } = this.props
    xt(t) &&
      (this.childSubscription = t.on('change', (r) => {
        this.current && (this.current.textContent = `${r}`)
      }))
  }
}
function Tj(e) {
  return window.getComputedStyle(e)
}
class jj extends e0 {
  constructor() {
    ;(super(...arguments), (this.type = 'html'), (this.renderInstance = Vy))
  }
  readValueFromInstance(t, r) {
    if (wo.has(r)) {
      const s = Gf(r)
      return (s && s.default) || 0
    } else {
      const s = Tj(t),
        a = (Oy(r) ? s.getPropertyValue(r) : s[r]) || 0
      return typeof a == 'string' ? a.trim() : a
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: r }) {
    return $x(t, r)
  }
  build(t, r, s) {
    jf(t, r, s.transformTemplate)
  }
  scrapeMotionValuesFromProps(t, r, s) {
    return Mf(t, r, s)
  }
}
class kj extends e0 {
  constructor() {
    ;(super(...arguments),
      (this.type = 'svg'),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = Xe))
  }
  getBaseTargetFromProps(t, r) {
    return t[r]
  }
  readValueFromInstance(t, r) {
    if (wo.has(r)) {
      const s = Gf(r)
      return (s && s.default) || 0
    }
    return ((r = By.has(r) ? r : Sf(r)), t.getAttribute(r))
  }
  scrapeMotionValuesFromProps(t, r, s) {
    return Wy(t, r, s)
  }
  build(t, r, s) {
    kf(t, r, this.isSVGTag, s.transformTemplate)
  }
  renderInstance(t, r, s, a) {
    zy(t, r, s, a)
  }
  mount(t) {
    ;((this.isSVGTag = Af(t.tagName)), super.mount(t))
  }
}
const Rj = (e, t) => (Ef(e) ? new kj(t) : new jj(t, { allowProjection: e !== v.Fragment })),
  Aj = iN({ ...eT, ...wj, ...cj, ...bj }, Rj),
  ft = bE(Aj)
function t0(e, t) {
  let r
  const s = () => {
    const { currentTime: a } = t,
      u = (a === null ? 0 : a.value) / 100
    ;(r !== u && e(u), (r = u))
  }
  return (_e.update(s, !0), () => kn(s))
}
const wl = new WeakMap()
let Ar
function Mj(e, t) {
  if (t) {
    const { inlineSize: r, blockSize: s } = t[0]
    return { width: r, height: s }
  } else
    return e instanceof SVGElement && 'getBBox' in e
      ? e.getBBox()
      : { width: e.offsetWidth, height: e.offsetHeight }
}
function _j({ target: e, contentRect: t, borderBoxSize: r }) {
  var s
  ;(s = wl.get(e)) === null ||
    s === void 0 ||
    s.forEach((a) => {
      a({
        target: e,
        contentSize: t,
        get size() {
          return Mj(e, r)
        },
      })
    })
}
function Dj(e) {
  e.forEach(_j)
}
function Ij() {
  typeof ResizeObserver > 'u' || (Ar = new ResizeObserver(Dj))
}
function Oj(e, t) {
  Ar || Ij()
  const r = Of(e)
  return (
    r.forEach((s) => {
      let a = wl.get(s)
      ;(a || ((a = new Set()), wl.set(s, a)), a.add(t), Ar?.observe(s))
    }),
    () => {
      r.forEach((s) => {
        const a = wl.get(s)
        ;(a?.delete(t), a?.size || Ar?.unobserve(s))
      })
    }
  )
}
const bl = new Set()
let xi
function Lj() {
  ;((xi = () => {
    const e = { width: window.innerWidth, height: window.innerHeight },
      t = { target: window, size: e, contentSize: e }
    bl.forEach((r) => r(t))
  }),
    window.addEventListener('resize', xi))
}
function Fj(e) {
  return (
    bl.add(e),
    xi || Lj(),
    () => {
      ;(bl.delete(e), !bl.size && xi && (xi = void 0))
    }
  )
}
function Vj(e, t) {
  return typeof e == 'function' ? Fj(e) : Oj(e, t)
}
const Bj = 50,
  Av = () => ({
    current: 0,
    offset: [],
    progress: 0,
    scrollLength: 0,
    targetOffset: 0,
    targetLength: 0,
    containerLength: 0,
    velocity: 0,
  }),
  zj = () => ({ time: 0, x: Av(), y: Av() }),
  $j = { x: { length: 'Width', position: 'Left' }, y: { length: 'Height', position: 'Top' } }
function Mv(e, t, r, s) {
  const a = r[t],
    { length: l, position: u } = $j[t],
    f = a.current,
    p = r.time
  ;((a.current = e[`scroll${u}`]),
    (a.scrollLength = e[`scroll${l}`] - e[`client${l}`]),
    (a.offset.length = 0),
    (a.offset[0] = 0),
    (a.offset[1] = a.scrollLength),
    (a.progress = mo(0, a.scrollLength, a.current)))
  const g = s - p
  a.velocity = g > Bj ? 0 : zf(a.current - f, g)
}
function Wj(e, t, r) {
  ;(Mv(e, 'x', t, r), Mv(e, 'y', t, r), (t.time = r))
}
function Uj(e, t) {
  const r = { x: 0, y: 0 }
  let s = e
  for (; s && s !== t; )
    if (s instanceof HTMLElement)
      ((r.x += s.offsetLeft), (r.y += s.offsetTop), (s = s.offsetParent))
    else if (s.tagName === 'svg') {
      const a = s.getBoundingClientRect()
      s = s.parentElement
      const l = s.getBoundingClientRect()
      ;((r.x += a.left - l.left), (r.y += a.top - l.top))
    } else if (s instanceof SVGGraphicsElement) {
      const { x: a, y: l } = s.getBBox()
      ;((r.x += a), (r.y += l))
      let u = null,
        f = s.parentNode
      for (; !u; ) (f.tagName === 'svg' && (u = f), (f = s.parentNode))
      s = u
    } else break
  return r
}
const Hd = { start: 0, center: 0.5, end: 1 }
function _v(e, t, r = 0) {
  let s = 0
  if ((e in Hd && (e = Hd[e]), typeof e == 'string')) {
    const a = parseFloat(e)
    e.endsWith('px')
      ? (s = a)
      : e.endsWith('%')
        ? (e = a / 100)
        : e.endsWith('vw')
          ? (s = (a / 100) * document.documentElement.clientWidth)
          : e.endsWith('vh')
            ? (s = (a / 100) * document.documentElement.clientHeight)
            : (e = a)
  }
  return (typeof e == 'number' && (s = t * e), r + s)
}
const Hj = [0, 0]
function Gj(e, t, r, s) {
  let a = Array.isArray(e) ? e : Hj,
    l = 0,
    u = 0
  return (
    typeof e == 'number'
      ? (a = [e, e])
      : typeof e == 'string' &&
        ((e = e.trim()), e.includes(' ') ? (a = e.split(' ')) : (a = [e, Hd[e] ? e : '0'])),
    (l = _v(a[0], r, s)),
    (u = _v(a[1], t)),
    l - u
  )
}
const Kj = {
    All: [
      [0, 0],
      [1, 1],
    ],
  },
  Yj = { x: 0, y: 0 }
function Xj(e) {
  return 'getBBox' in e && e.tagName !== 'svg'
    ? e.getBBox()
    : { width: e.clientWidth, height: e.clientHeight }
}
function qj(e, t, r) {
  const { offset: s = Kj.All } = r,
    { target: a = e, axis: l = 'y' } = r,
    u = l === 'y' ? 'height' : 'width',
    f = a !== e ? Uj(a, e) : Yj,
    p = a === e ? { width: e.scrollWidth, height: e.scrollHeight } : Xj(a),
    g = { width: e.clientWidth, height: e.clientHeight }
  t[l].offset.length = 0
  let x = !t[l].interpolate
  const h = s.length
  for (let w = 0; w < h; w++) {
    const S = Gj(s[w], g[u], p[u], f[l])
    ;(!x && S !== t[l].interpolatorOffsets[w] && (x = !0), (t[l].offset[w] = S))
  }
  ;(x &&
    ((t[l].interpolate = Rx(t[l].offset, Ax(s), { clamp: !1 })),
    (t[l].interpolatorOffsets = [...t[l].offset])),
    (t[l].progress = Rn(0, 1, t[l].interpolate(t[l].current))))
}
function Qj(e, t = e, r) {
  if (((r.x.targetOffset = 0), (r.y.targetOffset = 0), t !== e)) {
    let s = t
    for (; s && s !== e; )
      ((r.x.targetOffset += s.offsetLeft), (r.y.targetOffset += s.offsetTop), (s = s.offsetParent))
  }
  ;((r.x.targetLength = t === e ? t.scrollWidth : t.clientWidth),
    (r.y.targetLength = t === e ? t.scrollHeight : t.clientHeight),
    (r.x.containerLength = e.clientWidth),
    (r.y.containerLength = e.clientHeight))
}
function Zj(e, t, r, s = {}) {
  return {
    measure: () => Qj(e, s.target, r),
    update: (a) => {
      ;(Wj(e, r, a), (s.offset || s.target) && qj(e, r, s))
    },
    notify: () => t(r),
  }
}
const ai = new WeakMap(),
  Dv = new WeakMap(),
  pd = new WeakMap(),
  Iv = (e) => (e === document.documentElement ? window : e)
function Qf(e, { container: t = document.documentElement, ...r } = {}) {
  let s = pd.get(t)
  s || ((s = new Set()), pd.set(t, s))
  const a = zj(),
    l = Zj(t, e, a, r)
  if ((s.add(l), !ai.has(t))) {
    const f = () => {
        for (const w of s) w.measure()
      },
      p = () => {
        for (const w of s) w.update(at.timestamp)
      },
      g = () => {
        for (const w of s) w.notify()
      },
      x = () => {
        ;(_e.read(f, !1, !0), _e.read(p, !1, !0), _e.update(g, !1, !0))
      }
    ai.set(t, x)
    const h = Iv(t)
    ;(window.addEventListener('resize', x, { passive: !0 }),
      t !== document.documentElement && Dv.set(t, Vj(t, x)),
      h.addEventListener('scroll', x, { passive: !0 }))
  }
  const u = ai.get(t)
  return (
    _e.read(u, !1, !0),
    () => {
      var f
      kn(u)
      const p = pd.get(t)
      if (!p || (p.delete(l), p.size)) return
      const g = ai.get(t)
      ;(ai.delete(t),
        g &&
          (Iv(t).removeEventListener('scroll', g),
          (f = Dv.get(t)) === null || f === void 0 || f(),
          window.removeEventListener('resize', g)))
    }
  )
}
function Jj({ source: e, container: t, axis: r = 'y' }) {
  e && (t = e)
  const s = { value: 0 },
    a = Qf(
      (l) => {
        s.value = l[r].progress * 100
      },
      { container: t, axis: r }
    )
  return { currentTime: s, cancel: a }
}
const md = new Map()
function n0({ source: e, container: t = document.documentElement, axis: r = 'y' } = {}) {
  ;(e && (t = e), md.has(t) || md.set(t, {}))
  const s = md.get(t)
  return (
    s[r] || (s[r] = Gy() ? new ScrollTimeline({ source: t, axis: r }) : Jj({ source: t, axis: r })),
    s[r]
  )
}
function ek(e) {
  return e.length === 2
}
function r0(e) {
  return e && (e.target || e.offset)
}
function tk(e, t) {
  return ek(e) || r0(t)
    ? Qf((r) => {
        e(r[t.axis].progress, r)
      }, t)
    : t0(e, n0(t))
}
function nk(e, t) {
  if ((e.flatten(), r0(t)))
    return (
      e.pause(),
      Qf((r) => {
        e.time = e.duration * r[t.axis].progress
      }, t)
    )
  {
    const r = n0(t)
    return e.attachTimeline
      ? e.attachTimeline(
          r,
          (s) => (
            s.pause(),
            t0((a) => {
              s.time = s.duration * a
            }, r)
          )
        )
      : Et
  }
}
function rk(e, { axis: t = 'y', ...r } = {}) {
  const s = { axis: t, ...r }
  return typeof e == 'function' ? tk(e, s) : nk(e, s)
}
function Ov(e, t) {
  pE(!!(!t || t.current))
}
const ok = () => ({
  scrollX: Gn(0),
  scrollY: Gn(0),
  scrollXProgress: Gn(0),
  scrollYProgress: Gn(0),
})
function sk({ container: e, target: t, layoutEffect: r = !0, ...s } = {}) {
  const a = zl(ok)
  return (
    (r ? yf : v.useEffect)(
      () => (
        Ov('target', t),
        Ov('container', e),
        rk(
          (u, { x: f, y: p }) => {
            ;(a.scrollX.set(f.current),
              a.scrollXProgress.set(f.progress),
              a.scrollY.set(p.current),
              a.scrollYProgress.set(p.progress))
          },
          { ...s, container: e?.current || void 0, target: t?.current || void 0 }
        )
      ),
      [e, t, JSON.stringify(s.offset)]
    ),
    a
  )
}
const ik = { some: 0, all: 1 }
function ak(e, t, { root: r, margin: s, amount: a = 'some' } = {}) {
  const l = Of(e),
    u = new WeakMap(),
    f = (g) => {
      g.forEach((x) => {
        const h = u.get(x.target)
        if (x.isIntersecting !== !!h)
          if (x.isIntersecting) {
            const w = t(x)
            typeof w == 'function' ? u.set(x.target, w) : p.unobserve(x.target)
          } else typeof h == 'function' && (h(x), u.delete(x.target))
      })
    },
    p = new IntersectionObserver(f, {
      root: r,
      rootMargin: s,
      threshold: typeof a == 'number' ? a : ik[a],
    })
  return (l.forEach((g) => p.observe(g)), () => p.disconnect())
}
function Zf(e, { root: t, margin: r, amount: s, once: a = !1 } = {}) {
  const [l, u] = v.useState(!1)
  return (
    v.useEffect(() => {
      if (!e.current || (a && l)) return
      const f = () => (u(!0), a ? void 0 : () => u(!1)),
        p = { root: (t && t.current) || void 0, margin: r, amount: s }
      return ak(e.current, f, p)
    }, [t, e, r, a, s]),
    l
  )
}
function ie(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return function (a) {
    if ((e?.(a), r === !1 || !a.defaultPrevented)) return t?.(a)
  }
}
function Lv(e, t) {
  if (typeof e == 'function') return e(t)
  e != null && (e.current = t)
}
function An(...e) {
  return (t) => {
    let r = !1
    const s = e.map((a) => {
      const l = Lv(a, t)
      return (!r && typeof l == 'function' && (r = !0), l)
    })
    if (r)
      return () => {
        for (let a = 0; a < s.length; a++) {
          const l = s[a]
          typeof l == 'function' ? l() : Lv(e[a], null)
        }
      }
  }
}
function ke(...e) {
  return v.useCallback(An(...e), e)
}
function lk(e, t) {
  const r = v.createContext(t),
    s = (l) => {
      const { children: u, ...f } = l,
        p = v.useMemo(() => f, Object.values(f))
      return d.jsx(r.Provider, { value: p, children: u })
    }
  s.displayName = e + 'Provider'
  function a(l) {
    const u = v.useContext(r)
    if (u) return u
    if (t !== void 0) return t
    throw new Error(`\`${l}\` must be used within \`${e}\``)
  }
  return [s, a]
}
function Mn(e, t = []) {
  let r = []
  function s(l, u) {
    const f = v.createContext(u),
      p = r.length
    r = [...r, u]
    const g = (h) => {
      const { scope: w, children: S, ...N } = h,
        C = w?.[e]?.[p] || f,
        E = v.useMemo(() => N, Object.values(N))
      return d.jsx(C.Provider, { value: E, children: S })
    }
    g.displayName = l + 'Provider'
    function x(h, w) {
      const S = w?.[e]?.[p] || f,
        N = v.useContext(S)
      if (N) return N
      if (u !== void 0) return u
      throw new Error(`\`${h}\` must be used within \`${l}\``)
    }
    return [g, x]
  }
  const a = () => {
    const l = r.map((u) => v.createContext(u))
    return function (f) {
      const p = f?.[e] || l
      return v.useMemo(() => ({ [`__scope${e}`]: { ...f, [e]: p } }), [f, p])
    }
  }
  return ((a.scopeName = e), [s, ck(a, ...t)])
}
function ck(...e) {
  const t = e[0]
  if (e.length === 1) return t
  const r = () => {
    const s = e.map((a) => ({ useScope: a(), scopeName: a.scopeName }))
    return function (l) {
      const u = s.reduce((f, { useScope: p, scopeName: g }) => {
        const h = p(l)[`__scope${g}`]
        return { ...f, ...h }
      }, {})
      return v.useMemo(() => ({ [`__scope${t.scopeName}`]: u }), [u])
    }
  }
  return ((r.scopeName = t.scopeName), r)
}
var Di = by()
const o0 = wy(Di)
function uk(e) {
  const t = dk(e),
    r = v.forwardRef((s, a) => {
      const { children: l, ...u } = s,
        f = v.Children.toArray(l),
        p = f.find(pk)
      if (p) {
        const g = p.props.children,
          x = f.map((h) =>
            h === p
              ? v.Children.count(g) > 1
                ? v.Children.only(null)
                : v.isValidElement(g)
                  ? g.props.children
                  : null
              : h
          )
        return d.jsx(t, {
          ...u,
          ref: a,
          children: v.isValidElement(g) ? v.cloneElement(g, void 0, x) : null,
        })
      }
      return d.jsx(t, { ...u, ref: a, children: l })
    })
  return ((r.displayName = `${e}.Slot`), r)
}
function dk(e) {
  const t = v.forwardRef((r, s) => {
    const { children: a, ...l } = r
    if (v.isValidElement(a)) {
      const u = hk(a),
        f = mk(l, a.props)
      return (a.type !== v.Fragment && (f.ref = s ? An(s, u) : u), v.cloneElement(a, f))
    }
    return v.Children.count(a) > 1 ? v.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var fk = Symbol('radix.slottable')
function pk(e) {
  return (
    v.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === fk
  )
}
function mk(e, t) {
  const r = { ...t }
  for (const s in t) {
    const a = e[s],
      l = t[s]
    ;/^on[A-Z]/.test(s)
      ? a && l
        ? (r[s] = (...f) => {
            const p = l(...f)
            return (a(...f), p)
          })
        : a && (r[s] = a)
      : s === 'style'
        ? (r[s] = { ...a, ...l })
        : s === 'className' && (r[s] = [a, l].filter(Boolean).join(' '))
  }
  return { ...e, ...r }
}
function hk(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    r = t && 'isReactWarning' in t && t.isReactWarning
  return r
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (r = t && 'isReactWarning' in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref)
}
var gk = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  Ne = gk.reduce((e, t) => {
    const r = uk(`Primitive.${t}`),
      s = v.forwardRef((a, l) => {
        const { asChild: u, ...f } = a,
          p = u ? r : t
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          d.jsx(p, { ...f, ref: l })
        )
      })
    return ((s.displayName = `Primitive.${t}`), { ...e, [t]: s })
  }, {})
function s0(e, t) {
  e && Di.flushSync(() => e.dispatchEvent(t))
}
function qn(e) {
  const t = v.useRef(e)
  return (
    v.useEffect(() => {
      t.current = e
    }),
    v.useMemo(
      () =>
        (...r) =>
          t.current?.(...r),
      []
    )
  )
}
function vk(e, t = globalThis?.document) {
  const r = qn(e)
  v.useEffect(() => {
    const s = (a) => {
      a.key === 'Escape' && r(a)
    }
    return (
      t.addEventListener('keydown', s, { capture: !0 }),
      () => t.removeEventListener('keydown', s, { capture: !0 })
    )
  }, [r, t])
}
var yk = 'DismissableLayer',
  Gd = 'dismissableLayer.update',
  xk = 'dismissableLayer.pointerDownOutside',
  wk = 'dismissableLayer.focusOutside',
  Fv,
  i0 = v.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  fs = v.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: r = !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: l,
        onInteractOutside: u,
        onDismiss: f,
        ...p
      } = e,
      g = v.useContext(i0),
      [x, h] = v.useState(null),
      w = x?.ownerDocument ?? globalThis?.document,
      [, S] = v.useState({}),
      N = ke(t, (z) => h(z)),
      C = Array.from(g.layers),
      [E] = [...g.layersWithOutsidePointerEventsDisabled].slice(-1),
      P = C.indexOf(E),
      j = x ? C.indexOf(x) : -1,
      k = g.layersWithOutsidePointerEventsDisabled.size > 0,
      _ = j >= P,
      I = Ck((z) => {
        const W = z.target,
          oe = [...g.branches].some((ne) => ne.contains(W))
        !_ || oe || (a?.(z), u?.(z), z.defaultPrevented || f?.())
      }, w),
      B = Ek((z) => {
        const W = z.target
        ;[...g.branches].some((ne) => ne.contains(W)) ||
          (l?.(z), u?.(z), z.defaultPrevented || f?.())
      }, w)
    return (
      vk((z) => {
        j === g.layers.size - 1 && (s?.(z), !z.defaultPrevented && f && (z.preventDefault(), f()))
      }, w),
      v.useEffect(() => {
        if (x)
          return (
            r &&
              (g.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Fv = w.body.style.pointerEvents), (w.body.style.pointerEvents = 'none')),
              g.layersWithOutsidePointerEventsDisabled.add(x)),
            g.layers.add(x),
            Vv(),
            () => {
              r &&
                g.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (w.body.style.pointerEvents = Fv)
            }
          )
      }, [x, w, r, g]),
      v.useEffect(
        () => () => {
          x && (g.layers.delete(x), g.layersWithOutsidePointerEventsDisabled.delete(x), Vv())
        },
        [x, g]
      ),
      v.useEffect(() => {
        const z = () => S({})
        return (document.addEventListener(Gd, z), () => document.removeEventListener(Gd, z))
      }, []),
      d.jsx(Ne.div, {
        ...p,
        ref: N,
        style: { pointerEvents: k ? (_ ? 'auto' : 'none') : void 0, ...e.style },
        onFocusCapture: ie(e.onFocusCapture, B.onFocusCapture),
        onBlurCapture: ie(e.onBlurCapture, B.onBlurCapture),
        onPointerDownCapture: ie(e.onPointerDownCapture, I.onPointerDownCapture),
      })
    )
  })
fs.displayName = yk
var bk = 'DismissableLayerBranch',
  Sk = v.forwardRef((e, t) => {
    const r = v.useContext(i0),
      s = v.useRef(null),
      a = ke(t, s)
    return (
      v.useEffect(() => {
        const l = s.current
        if (l)
          return (
            r.branches.add(l),
            () => {
              r.branches.delete(l)
            }
          )
      }, [r.branches]),
      d.jsx(Ne.div, { ...e, ref: a })
    )
  })
Sk.displayName = bk
function Ck(e, t = globalThis?.document) {
  const r = qn(e),
    s = v.useRef(!1),
    a = v.useRef(() => {})
  return (
    v.useEffect(() => {
      const l = (f) => {
          if (f.target && !s.current) {
            let p = function () {
              a0(xk, r, g, { discrete: !0 })
            }
            const g = { originalEvent: f }
            f.pointerType === 'touch'
              ? (t.removeEventListener('click', a.current),
                (a.current = p),
                t.addEventListener('click', a.current, { once: !0 }))
              : p()
          } else t.removeEventListener('click', a.current)
          s.current = !1
        },
        u = window.setTimeout(() => {
          t.addEventListener('pointerdown', l)
        }, 0)
      return () => {
        ;(window.clearTimeout(u),
          t.removeEventListener('pointerdown', l),
          t.removeEventListener('click', a.current))
      }
    }, [t, r]),
    { onPointerDownCapture: () => (s.current = !0) }
  )
}
function Ek(e, t = globalThis?.document) {
  const r = qn(e),
    s = v.useRef(!1)
  return (
    v.useEffect(() => {
      const a = (l) => {
        l.target && !s.current && a0(wk, r, { originalEvent: l }, { discrete: !1 })
      }
      return (t.addEventListener('focusin', a), () => t.removeEventListener('focusin', a))
    }, [t, r]),
    { onFocusCapture: () => (s.current = !0), onBlurCapture: () => (s.current = !1) }
  )
}
function Vv() {
  const e = new CustomEvent(Gd)
  document.dispatchEvent(e)
}
function a0(e, t, r, { discrete: s }) {
  const a = r.originalEvent.target,
    l = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r })
  ;(t && a.addEventListener(e, t, { once: !0 }), s ? s0(a, l) : a.dispatchEvent(l))
}
var hd = 0
function Yl() {
  v.useEffect(() => {
    const e = document.querySelectorAll('[data-radix-focus-guard]')
    return (
      document.body.insertAdjacentElement('afterbegin', e[0] ?? Bv()),
      document.body.insertAdjacentElement('beforeend', e[1] ?? Bv()),
      hd++,
      () => {
        ;(hd === 1 &&
          document.querySelectorAll('[data-radix-focus-guard]').forEach((t) => t.remove()),
          hd--)
      }
    )
  }, [])
}
function Bv() {
  const e = document.createElement('span')
  return (
    e.setAttribute('data-radix-focus-guard', ''),
    (e.tabIndex = 0),
    (e.style.outline = 'none'),
    (e.style.opacity = '0'),
    (e.style.position = 'fixed'),
    (e.style.pointerEvents = 'none'),
    e
  )
}
var gd = 'focusScope.autoFocusOnMount',
  vd = 'focusScope.autoFocusOnUnmount',
  zv = { bubbles: !1, cancelable: !0 },
  Nk = 'FocusScope',
  Ii = v.forwardRef((e, t) => {
    const { loop: r = !1, trapped: s = !1, onMountAutoFocus: a, onUnmountAutoFocus: l, ...u } = e,
      [f, p] = v.useState(null),
      g = qn(a),
      x = qn(l),
      h = v.useRef(null),
      w = ke(t, (C) => p(C)),
      S = v.useRef({
        paused: !1,
        pause() {
          this.paused = !0
        },
        resume() {
          this.paused = !1
        },
      }).current
    ;(v.useEffect(() => {
      if (s) {
        let C = function (k) {
            if (S.paused || !f) return
            const _ = k.target
            f.contains(_) ? (h.current = _) : Mr(h.current, { select: !0 })
          },
          E = function (k) {
            if (S.paused || !f) return
            const _ = k.relatedTarget
            _ !== null && (f.contains(_) || Mr(h.current, { select: !0 }))
          },
          P = function (k) {
            if (document.activeElement === document.body)
              for (const I of k) I.removedNodes.length > 0 && Mr(f)
          }
        ;(document.addEventListener('focusin', C), document.addEventListener('focusout', E))
        const j = new MutationObserver(P)
        return (
          f && j.observe(f, { childList: !0, subtree: !0 }),
          () => {
            ;(document.removeEventListener('focusin', C),
              document.removeEventListener('focusout', E),
              j.disconnect())
          }
        )
      }
    }, [s, f, S.paused]),
      v.useEffect(() => {
        if (f) {
          Wv.add(S)
          const C = document.activeElement
          if (!f.contains(C)) {
            const P = new CustomEvent(gd, zv)
            ;(f.addEventListener(gd, g),
              f.dispatchEvent(P),
              P.defaultPrevented ||
                (Pk(Ak(l0(f)), { select: !0 }), document.activeElement === C && Mr(f)))
          }
          return () => {
            ;(f.removeEventListener(gd, g),
              setTimeout(() => {
                const P = new CustomEvent(vd, zv)
                ;(f.addEventListener(vd, x),
                  f.dispatchEvent(P),
                  P.defaultPrevented || Mr(C ?? document.body, { select: !0 }),
                  f.removeEventListener(vd, x),
                  Wv.remove(S))
              }, 0))
          }
        }
      }, [f, g, x, S]))
    const N = v.useCallback(
      (C) => {
        if ((!r && !s) || S.paused) return
        const E = C.key === 'Tab' && !C.altKey && !C.ctrlKey && !C.metaKey,
          P = document.activeElement
        if (E && P) {
          const j = C.currentTarget,
            [k, _] = Tk(j)
          k && _
            ? !C.shiftKey && P === _
              ? (C.preventDefault(), r && Mr(k, { select: !0 }))
              : C.shiftKey && P === k && (C.preventDefault(), r && Mr(_, { select: !0 }))
            : P === j && C.preventDefault()
        }
      },
      [r, s, S.paused]
    )
    return d.jsx(Ne.div, { tabIndex: -1, ...u, ref: w, onKeyDown: N })
  })
Ii.displayName = Nk
function Pk(e, { select: t = !1 } = {}) {
  const r = document.activeElement
  for (const s of e) if ((Mr(s, { select: t }), document.activeElement !== r)) return
}
function Tk(e) {
  const t = l0(e),
    r = $v(t, e),
    s = $v(t.reverse(), e)
  return [r, s]
}
function l0(e) {
  const t = [],
    r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (s) => {
        const a = s.tagName === 'INPUT' && s.type === 'hidden'
        return s.disabled || s.hidden || a
          ? NodeFilter.FILTER_SKIP
          : s.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP
      },
    })
  for (; r.nextNode(); ) t.push(r.currentNode)
  return t
}
function $v(e, t) {
  for (const r of e) if (!jk(r, { upTo: t })) return r
}
function jk(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === 'hidden') return !0
  for (; e; ) {
    if (t !== void 0 && e === t) return !1
    if (getComputedStyle(e).display === 'none') return !0
    e = e.parentElement
  }
  return !1
}
function kk(e) {
  return e instanceof HTMLInputElement && 'select' in e
}
function Mr(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement
    ;(e.focus({ preventScroll: !0 }), e !== r && kk(e) && t && e.select())
  }
}
var Wv = Rk()
function Rk() {
  let e = []
  return {
    add(t) {
      const r = e[0]
      ;(t !== r && r?.pause(), (e = Uv(e, t)), e.unshift(t))
    },
    remove(t) {
      ;((e = Uv(e, t)), e[0]?.resume())
    },
  }
}
function Uv(e, t) {
  const r = [...e],
    s = r.indexOf(t)
  return (s !== -1 && r.splice(s, 1), r)
}
function Ak(e) {
  return e.filter((t) => t.tagName !== 'A')
}
var wt = globalThis?.document ? v.useLayoutEffect : () => {},
  Mk = df[' useId '.trim().toString()] || (() => {}),
  _k = 0
function Xn(e) {
  const [t, r] = v.useState(Mk())
  return (
    wt(() => {
      r((s) => s ?? String(_k++))
    }, [e]),
    t ? `radix-${t}` : ''
  )
}
const Dk = ['top', 'right', 'bottom', 'left'],
  Ir = Math.min,
  $t = Math.max,
  Ml = Math.round,
  ul = Math.floor,
  jn = (e) => ({ x: e, y: e }),
  Ik = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
function Kd(e, t, r) {
  return $t(e, Ir(t, r))
}
function Qn(e, t) {
  return typeof e == 'function' ? e(t) : e
}
function Zn(e) {
  return e.split('-')[0]
}
function ps(e) {
  return e.split('-')[1]
}
function Jf(e) {
  return e === 'x' ? 'y' : 'x'
}
function ep(e) {
  return e === 'y' ? 'height' : 'width'
}
function Nn(e) {
  const t = e[0]
  return t === 't' || t === 'b' ? 'y' : 'x'
}
function tp(e) {
  return Jf(Nn(e))
}
function Ok(e, t, r) {
  r === void 0 && (r = !1)
  const s = ps(e),
    a = tp(e),
    l = ep(a)
  let u =
    a === 'x' ? (s === (r ? 'end' : 'start') ? 'right' : 'left') : s === 'start' ? 'bottom' : 'top'
  return (t.reference[l] > t.floating[l] && (u = _l(u)), [u, _l(u)])
}
function Lk(e) {
  const t = _l(e)
  return [Yd(e), t, Yd(t)]
}
function Yd(e) {
  return e.includes('start') ? e.replace('start', 'end') : e.replace('end', 'start')
}
const Hv = ['left', 'right'],
  Gv = ['right', 'left'],
  Fk = ['top', 'bottom'],
  Vk = ['bottom', 'top']
function Bk(e, t, r) {
  switch (e) {
    case 'top':
    case 'bottom':
      return r ? (t ? Gv : Hv) : t ? Hv : Gv
    case 'left':
    case 'right':
      return t ? Fk : Vk
    default:
      return []
  }
}
function zk(e, t, r, s) {
  const a = ps(e)
  let l = Bk(Zn(e), r === 'start', s)
  return (a && ((l = l.map((u) => u + '-' + a)), t && (l = l.concat(l.map(Yd)))), l)
}
function _l(e) {
  const t = Zn(e)
  return Ik[t] + e.slice(t.length)
}
function $k(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e }
}
function c0(e) {
  return typeof e != 'number' ? $k(e) : { top: e, right: e, bottom: e, left: e }
}
function Dl(e) {
  const { x: t, y: r, width: s, height: a } = e
  return { width: s, height: a, top: r, left: t, right: t + s, bottom: r + a, x: t, y: r }
}
function Kv(e, t, r) {
  let { reference: s, floating: a } = e
  const l = Nn(t),
    u = tp(t),
    f = ep(u),
    p = Zn(t),
    g = l === 'y',
    x = s.x + s.width / 2 - a.width / 2,
    h = s.y + s.height / 2 - a.height / 2,
    w = s[f] / 2 - a[f] / 2
  let S
  switch (p) {
    case 'top':
      S = { x, y: s.y - a.height }
      break
    case 'bottom':
      S = { x, y: s.y + s.height }
      break
    case 'right':
      S = { x: s.x + s.width, y: h }
      break
    case 'left':
      S = { x: s.x - a.width, y: h }
      break
    default:
      S = { x: s.x, y: s.y }
  }
  switch (ps(t)) {
    case 'start':
      S[u] -= w * (r && g ? -1 : 1)
      break
    case 'end':
      S[u] += w * (r && g ? -1 : 1)
      break
  }
  return S
}
async function Wk(e, t) {
  var r
  t === void 0 && (t = {})
  const { x: s, y: a, platform: l, rects: u, elements: f, strategy: p } = e,
    {
      boundary: g = 'clippingAncestors',
      rootBoundary: x = 'viewport',
      elementContext: h = 'floating',
      altBoundary: w = !1,
      padding: S = 0,
    } = Qn(t, e),
    N = c0(S),
    E = f[w ? (h === 'floating' ? 'reference' : 'floating') : h],
    P = Dl(
      await l.getClippingRect({
        element:
          (r = await (l.isElement == null ? void 0 : l.isElement(E))) == null || r
            ? E
            : E.contextElement ||
              (await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(f.floating))),
        boundary: g,
        rootBoundary: x,
        strategy: p,
      })
    ),
    j =
      h === 'floating'
        ? { x: s, y: a, width: u.floating.width, height: u.floating.height }
        : u.reference,
    k = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(f.floating)),
    _ = (await (l.isElement == null ? void 0 : l.isElement(k)))
      ? (await (l.getScale == null ? void 0 : l.getScale(k))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    I = Dl(
      l.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: f,
            rect: j,
            offsetParent: k,
            strategy: p,
          })
        : j
    )
  return {
    top: (P.top - I.top + N.top) / _.y,
    bottom: (I.bottom - P.bottom + N.bottom) / _.y,
    left: (P.left - I.left + N.left) / _.x,
    right: (I.right - P.right + N.right) / _.x,
  }
}
const Uk = 50,
  Hk = async (e, t, r) => {
    const {
        placement: s = 'bottom',
        strategy: a = 'absolute',
        middleware: l = [],
        platform: u,
      } = r,
      f = u.detectOverflow ? u : { ...u, detectOverflow: Wk },
      p = await (u.isRTL == null ? void 0 : u.isRTL(t))
    let g = await u.getElementRects({ reference: e, floating: t, strategy: a }),
      { x, y: h } = Kv(g, s, p),
      w = s,
      S = 0
    const N = {}
    for (let C = 0; C < l.length; C++) {
      const E = l[C]
      if (!E) continue
      const { name: P, fn: j } = E,
        {
          x: k,
          y: _,
          data: I,
          reset: B,
        } = await j({
          x,
          y: h,
          initialPlacement: s,
          placement: w,
          strategy: a,
          middlewareData: N,
          rects: g,
          platform: f,
          elements: { reference: e, floating: t },
        })
      ;((x = k ?? x),
        (h = _ ?? h),
        (N[P] = { ...N[P], ...I }),
        B &&
          S < Uk &&
          (S++,
          typeof B == 'object' &&
            (B.placement && (w = B.placement),
            B.rects &&
              (g =
                B.rects === !0
                  ? await u.getElementRects({ reference: e, floating: t, strategy: a })
                  : B.rects),
            ({ x, y: h } = Kv(g, w, p))),
          (C = -1)))
    }
    return { x, y: h, placement: w, strategy: a, middlewareData: N }
  },
  Gk = (e) => ({
    name: 'arrow',
    options: e,
    async fn(t) {
      const { x: r, y: s, placement: a, rects: l, platform: u, elements: f, middlewareData: p } = t,
        { element: g, padding: x = 0 } = Qn(e, t) || {}
      if (g == null) return {}
      const h = c0(x),
        w = { x: r, y: s },
        S = tp(a),
        N = ep(S),
        C = await u.getDimensions(g),
        E = S === 'y',
        P = E ? 'top' : 'left',
        j = E ? 'bottom' : 'right',
        k = E ? 'clientHeight' : 'clientWidth',
        _ = l.reference[N] + l.reference[S] - w[S] - l.floating[N],
        I = w[S] - l.reference[S],
        B = await (u.getOffsetParent == null ? void 0 : u.getOffsetParent(g))
      let z = B ? B[k] : 0
      ;(!z || !(await (u.isElement == null ? void 0 : u.isElement(B)))) &&
        (z = f.floating[k] || l.floating[N])
      const W = _ / 2 - I / 2,
        oe = z / 2 - C[N] / 2 - 1,
        ne = Ir(h[P], oe),
        me = Ir(h[j], oe),
        te = ne,
        ue = z - C[N] - me,
        fe = z / 2 - C[N] / 2 + W,
        xe = Kd(te, fe, ue),
        X =
          !p.arrow &&
          ps(a) != null &&
          fe !== xe &&
          l.reference[N] / 2 - (fe < te ? ne : me) - C[N] / 2 < 0,
        q = X ? (fe < te ? fe - te : fe - ue) : 0
      return {
        [S]: w[S] + q,
        data: { [S]: xe, centerOffset: fe - xe - q, ...(X && { alignmentOffset: q }) },
        reset: X,
      }
    },
  }),
  Kk = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn(t) {
          var r, s
          const {
              placement: a,
              middlewareData: l,
              rects: u,
              initialPlacement: f,
              platform: p,
              elements: g,
            } = t,
            {
              mainAxis: x = !0,
              crossAxis: h = !0,
              fallbackPlacements: w,
              fallbackStrategy: S = 'bestFit',
              fallbackAxisSideDirection: N = 'none',
              flipAlignment: C = !0,
              ...E
            } = Qn(e, t)
          if ((r = l.arrow) != null && r.alignmentOffset) return {}
          const P = Zn(a),
            j = Nn(f),
            k = Zn(f) === f,
            _ = await (p.isRTL == null ? void 0 : p.isRTL(g.floating)),
            I = w || (k || !C ? [_l(f)] : Lk(f)),
            B = N !== 'none'
          !w && B && I.push(...zk(f, C, N, _))
          const z = [f, ...I],
            W = await p.detectOverflow(t, E),
            oe = []
          let ne = ((s = l.flip) == null ? void 0 : s.overflows) || []
          if ((x && oe.push(W[P]), h)) {
            const fe = Ok(a, u, _)
            oe.push(W[fe[0]], W[fe[1]])
          }
          if (((ne = [...ne, { placement: a, overflows: oe }]), !oe.every((fe) => fe <= 0))) {
            var me, te
            const fe = (((me = l.flip) == null ? void 0 : me.index) || 0) + 1,
              xe = z[fe]
            if (
              xe &&
              (!(h === 'alignment' ? j !== Nn(xe) : !1) ||
                ne.every((L) => (Nn(L.placement) === j ? L.overflows[0] > 0 : !0)))
            )
              return { data: { index: fe, overflows: ne }, reset: { placement: xe } }
            let X =
              (te = ne
                .filter((q) => q.overflows[0] <= 0)
                .sort((q, L) => q.overflows[1] - L.overflows[1])[0]) == null
                ? void 0
                : te.placement
            if (!X)
              switch (S) {
                case 'bestFit': {
                  var ue
                  const q =
                    (ue = ne
                      .filter((L) => {
                        if (B) {
                          const V = Nn(L.placement)
                          return V === j || V === 'y'
                        }
                        return !0
                      })
                      .map((L) => [
                        L.placement,
                        L.overflows.filter((V) => V > 0).reduce((V, U) => V + U, 0),
                      ])
                      .sort((L, V) => L[1] - V[1])[0]) == null
                      ? void 0
                      : ue[0]
                  q && (X = q)
                  break
                }
                case 'initialPlacement':
                  X = f
                  break
              }
            if (a !== X) return { reset: { placement: X } }
          }
          return {}
        },
      }
    )
  }
function Yv(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  }
}
function Xv(e) {
  return Dk.some((t) => e[t] >= 0)
}
const Yk = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'hide',
        options: e,
        async fn(t) {
          const { rects: r, platform: s } = t,
            { strategy: a = 'referenceHidden', ...l } = Qn(e, t)
          switch (a) {
            case 'referenceHidden': {
              const u = await s.detectOverflow(t, { ...l, elementContext: 'reference' }),
                f = Yv(u, r.reference)
              return { data: { referenceHiddenOffsets: f, referenceHidden: Xv(f) } }
            }
            case 'escaped': {
              const u = await s.detectOverflow(t, { ...l, altBoundary: !0 }),
                f = Yv(u, r.floating)
              return { data: { escapedOffsets: f, escaped: Xv(f) } }
            }
            default:
              return {}
          }
        },
      }
    )
  },
  u0 = new Set(['left', 'top'])
async function Xk(e, t) {
  const { placement: r, platform: s, elements: a } = e,
    l = await (s.isRTL == null ? void 0 : s.isRTL(a.floating)),
    u = Zn(r),
    f = ps(r),
    p = Nn(r) === 'y',
    g = u0.has(u) ? -1 : 1,
    x = l && p ? -1 : 1,
    h = Qn(t, e)
  let {
    mainAxis: w,
    crossAxis: S,
    alignmentAxis: N,
  } = typeof h == 'number'
    ? { mainAxis: h, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: h.mainAxis || 0, crossAxis: h.crossAxis || 0, alignmentAxis: h.alignmentAxis }
  return (
    f && typeof N == 'number' && (S = f === 'end' ? N * -1 : N),
    p ? { x: S * x, y: w * g } : { x: w * g, y: S * x }
  )
}
const qk = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(t) {
          var r, s
          const { x: a, y: l, placement: u, middlewareData: f } = t,
            p = await Xk(t, e)
          return u === ((r = f.offset) == null ? void 0 : r.placement) &&
            (s = f.arrow) != null &&
            s.alignmentOffset
            ? {}
            : { x: a + p.x, y: l + p.y, data: { ...p, placement: u } }
        },
      }
    )
  },
  Qk = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn(t) {
          const { x: r, y: s, placement: a, platform: l } = t,
            {
              mainAxis: u = !0,
              crossAxis: f = !1,
              limiter: p = {
                fn: (P) => {
                  let { x: j, y: k } = P
                  return { x: j, y: k }
                },
              },
              ...g
            } = Qn(e, t),
            x = { x: r, y: s },
            h = await l.detectOverflow(t, g),
            w = Nn(Zn(a)),
            S = Jf(w)
          let N = x[S],
            C = x[w]
          if (u) {
            const P = S === 'y' ? 'top' : 'left',
              j = S === 'y' ? 'bottom' : 'right',
              k = N + h[P],
              _ = N - h[j]
            N = Kd(k, N, _)
          }
          if (f) {
            const P = w === 'y' ? 'top' : 'left',
              j = w === 'y' ? 'bottom' : 'right',
              k = C + h[P],
              _ = C - h[j]
            C = Kd(k, C, _)
          }
          const E = p.fn({ ...t, [S]: N, [w]: C })
          return { ...E, data: { x: E.x - r, y: E.y - s, enabled: { [S]: u, [w]: f } } }
        },
      }
    )
  },
  Zk = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: r, y: s, placement: a, rects: l, middlewareData: u } = t,
            { offset: f = 0, mainAxis: p = !0, crossAxis: g = !0 } = Qn(e, t),
            x = { x: r, y: s },
            h = Nn(a),
            w = Jf(h)
          let S = x[w],
            N = x[h]
          const C = Qn(f, t),
            E =
              typeof C == 'number'
                ? { mainAxis: C, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...C }
          if (p) {
            const k = w === 'y' ? 'height' : 'width',
              _ = l.reference[w] - l.floating[k] + E.mainAxis,
              I = l.reference[w] + l.reference[k] - E.mainAxis
            S < _ ? (S = _) : S > I && (S = I)
          }
          if (g) {
            var P, j
            const k = w === 'y' ? 'width' : 'height',
              _ = u0.has(Zn(a)),
              I =
                l.reference[h] -
                l.floating[k] +
                ((_ && ((P = u.offset) == null ? void 0 : P[h])) || 0) +
                (_ ? 0 : E.crossAxis),
              B =
                l.reference[h] +
                l.reference[k] +
                (_ ? 0 : ((j = u.offset) == null ? void 0 : j[h]) || 0) -
                (_ ? E.crossAxis : 0)
            N < I ? (N = I) : N > B && (N = B)
          }
          return { [w]: S, [h]: N }
        },
      }
    )
  },
  Jk = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(t) {
          var r, s
          const { placement: a, rects: l, platform: u, elements: f } = t,
            { apply: p = () => {}, ...g } = Qn(e, t),
            x = await u.detectOverflow(t, g),
            h = Zn(a),
            w = ps(a),
            S = Nn(a) === 'y',
            { width: N, height: C } = l.floating
          let E, P
          h === 'top' || h === 'bottom'
            ? ((E = h),
              (P =
                w === ((await (u.isRTL == null ? void 0 : u.isRTL(f.floating))) ? 'start' : 'end')
                  ? 'left'
                  : 'right'))
            : ((P = h), (E = w === 'end' ? 'top' : 'bottom'))
          const j = C - x.top - x.bottom,
            k = N - x.left - x.right,
            _ = Ir(C - x[E], j),
            I = Ir(N - x[P], k),
            B = !t.middlewareData.shift
          let z = _,
            W = I
          if (
            ((r = t.middlewareData.shift) != null && r.enabled.x && (W = k),
            (s = t.middlewareData.shift) != null && s.enabled.y && (z = j),
            B && !w)
          ) {
            const ne = $t(x.left, 0),
              me = $t(x.right, 0),
              te = $t(x.top, 0),
              ue = $t(x.bottom, 0)
            S
              ? (W = N - 2 * (ne !== 0 || me !== 0 ? ne + me : $t(x.left, x.right)))
              : (z = C - 2 * (te !== 0 || ue !== 0 ? te + ue : $t(x.top, x.bottom)))
          }
          await p({ ...t, availableWidth: W, availableHeight: z })
          const oe = await u.getDimensions(f.floating)
          return N !== oe.width || C !== oe.height ? { reset: { rects: !0 } } : {}
        },
      }
    )
  }
function Xl() {
  return typeof window < 'u'
}
function ms(e) {
  return d0(e) ? (e.nodeName || '').toLowerCase() : '#document'
}
function Wt(e) {
  var t
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}
function _n(e) {
  var t
  return (t = (d0(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement
}
function d0(e) {
  return Xl() ? e instanceof Node || e instanceof Wt(e).Node : !1
}
function hn(e) {
  return Xl() ? e instanceof Element || e instanceof Wt(e).Element : !1
}
function Jn(e) {
  return Xl() ? e instanceof HTMLElement || e instanceof Wt(e).HTMLElement : !1
}
function qv(e) {
  return !Xl() || typeof ShadowRoot > 'u'
    ? !1
    : e instanceof ShadowRoot || e instanceof Wt(e).ShadowRoot
}
function Oi(e) {
  const { overflow: t, overflowX: r, overflowY: s, display: a } = gn(e)
  return /auto|scroll|overlay|hidden|clip/.test(t + s + r) && a !== 'inline' && a !== 'contents'
}
function eR(e) {
  return /^(table|td|th)$/.test(ms(e))
}
function ql(e) {
  try {
    if (e.matches(':popover-open')) return !0
  } catch {}
  try {
    return e.matches(':modal')
  } catch {
    return !1
  }
}
const tR = /transform|translate|scale|rotate|perspective|filter/,
  nR = /paint|layout|strict|content/,
  ao = (e) => !!e && e !== 'none'
let yd
function np(e) {
  const t = hn(e) ? gn(e) : e
  return (
    ao(t.transform) ||
    ao(t.translate) ||
    ao(t.scale) ||
    ao(t.rotate) ||
    ao(t.perspective) ||
    (!rp() && (ao(t.backdropFilter) || ao(t.filter))) ||
    tR.test(t.willChange || '') ||
    nR.test(t.contain || '')
  )
}
function rR(e) {
  let t = Or(e)
  for (; Jn(t) && !as(t); ) {
    if (np(t)) return t
    if (ql(t)) return null
    t = Or(t)
  }
  return null
}
function rp() {
  return (
    yd == null &&
      (yd = typeof CSS < 'u' && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none')),
    yd
  )
}
function as(e) {
  return /^(html|body|#document)$/.test(ms(e))
}
function gn(e) {
  return Wt(e).getComputedStyle(e)
}
function Ql(e) {
  return hn(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY }
}
function Or(e) {
  if (ms(e) === 'html') return e
  const t = e.assignedSlot || e.parentNode || (qv(e) && e.host) || _n(e)
  return qv(t) ? t.host : t
}
function f0(e) {
  const t = Or(e)
  return as(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : Jn(t) && Oi(t) ? t : f0(t)
}
function Ni(e, t, r) {
  var s
  ;(t === void 0 && (t = []), r === void 0 && (r = !0))
  const a = f0(e),
    l = a === ((s = e.ownerDocument) == null ? void 0 : s.body),
    u = Wt(a)
  if (l) {
    const f = Xd(u)
    return t.concat(u, u.visualViewport || [], Oi(a) ? a : [], f && r ? Ni(f) : [])
  } else return t.concat(a, Ni(a, [], r))
}
function Xd(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}
function p0(e) {
  const t = gn(e)
  let r = parseFloat(t.width) || 0,
    s = parseFloat(t.height) || 0
  const a = Jn(e),
    l = a ? e.offsetWidth : r,
    u = a ? e.offsetHeight : s,
    f = Ml(r) !== l || Ml(s) !== u
  return (f && ((r = l), (s = u)), { width: r, height: s, $: f })
}
function op(e) {
  return hn(e) ? e : e.contextElement
}
function ts(e) {
  const t = op(e)
  if (!Jn(t)) return jn(1)
  const r = t.getBoundingClientRect(),
    { width: s, height: a, $: l } = p0(t)
  let u = (l ? Ml(r.width) : r.width) / s,
    f = (l ? Ml(r.height) : r.height) / a
  return (
    (!u || !Number.isFinite(u)) && (u = 1),
    (!f || !Number.isFinite(f)) && (f = 1),
    { x: u, y: f }
  )
}
const oR = jn(0)
function m0(e) {
  const t = Wt(e)
  return !rp() || !t.visualViewport
    ? oR
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
}
function sR(e, t, r) {
  return (t === void 0 && (t = !1), !r || (t && r !== Wt(e)) ? !1 : t)
}
function ho(e, t, r, s) {
  ;(t === void 0 && (t = !1), r === void 0 && (r = !1))
  const a = e.getBoundingClientRect(),
    l = op(e)
  let u = jn(1)
  t && (s ? hn(s) && (u = ts(s)) : (u = ts(e)))
  const f = sR(l, r, s) ? m0(l) : jn(0)
  let p = (a.left + f.x) / u.x,
    g = (a.top + f.y) / u.y,
    x = a.width / u.x,
    h = a.height / u.y
  if (l) {
    const w = Wt(l),
      S = s && hn(s) ? Wt(s) : s
    let N = w,
      C = Xd(N)
    for (; C && s && S !== N; ) {
      const E = ts(C),
        P = C.getBoundingClientRect(),
        j = gn(C),
        k = P.left + (C.clientLeft + parseFloat(j.paddingLeft)) * E.x,
        _ = P.top + (C.clientTop + parseFloat(j.paddingTop)) * E.y
      ;((p *= E.x),
        (g *= E.y),
        (x *= E.x),
        (h *= E.y),
        (p += k),
        (g += _),
        (N = Wt(C)),
        (C = Xd(N)))
    }
  }
  return Dl({ width: x, height: h, x: p, y: g })
}
function Zl(e, t) {
  const r = Ql(e).scrollLeft
  return t ? t.left + r : ho(_n(e)).left + r
}
function h0(e, t) {
  const r = e.getBoundingClientRect(),
    s = r.left + t.scrollLeft - Zl(e, r),
    a = r.top + t.scrollTop
  return { x: s, y: a }
}
function iR(e) {
  let { elements: t, rect: r, offsetParent: s, strategy: a } = e
  const l = a === 'fixed',
    u = _n(s),
    f = t ? ql(t.floating) : !1
  if (s === u || (f && l)) return r
  let p = { scrollLeft: 0, scrollTop: 0 },
    g = jn(1)
  const x = jn(0),
    h = Jn(s)
  if ((h || (!h && !l)) && ((ms(s) !== 'body' || Oi(u)) && (p = Ql(s)), h)) {
    const S = ho(s)
    ;((g = ts(s)), (x.x = S.x + s.clientLeft), (x.y = S.y + s.clientTop))
  }
  const w = u && !h && !l ? h0(u, p) : jn(0)
  return {
    width: r.width * g.x,
    height: r.height * g.y,
    x: r.x * g.x - p.scrollLeft * g.x + x.x + w.x,
    y: r.y * g.y - p.scrollTop * g.y + x.y + w.y,
  }
}
function aR(e) {
  return Array.from(e.getClientRects())
}
function lR(e) {
  const t = _n(e),
    r = Ql(e),
    s = e.ownerDocument.body,
    a = $t(t.scrollWidth, t.clientWidth, s.scrollWidth, s.clientWidth),
    l = $t(t.scrollHeight, t.clientHeight, s.scrollHeight, s.clientHeight)
  let u = -r.scrollLeft + Zl(e)
  const f = -r.scrollTop
  return (
    gn(s).direction === 'rtl' && (u += $t(t.clientWidth, s.clientWidth) - a),
    { width: a, height: l, x: u, y: f }
  )
}
const Qv = 25
function cR(e, t) {
  const r = Wt(e),
    s = _n(e),
    a = r.visualViewport
  let l = s.clientWidth,
    u = s.clientHeight,
    f = 0,
    p = 0
  if (a) {
    ;((l = a.width), (u = a.height))
    const x = rp()
    ;(!x || (x && t === 'fixed')) && ((f = a.offsetLeft), (p = a.offsetTop))
  }
  const g = Zl(s)
  if (g <= 0) {
    const x = s.ownerDocument,
      h = x.body,
      w = getComputedStyle(h),
      S =
        (x.compatMode === 'CSS1Compat' && parseFloat(w.marginLeft) + parseFloat(w.marginRight)) ||
        0,
      N = Math.abs(s.clientWidth - h.clientWidth - S)
    N <= Qv && (l -= N)
  } else g <= Qv && (l += g)
  return { width: l, height: u, x: f, y: p }
}
function uR(e, t) {
  const r = ho(e, !0, t === 'fixed'),
    s = r.top + e.clientTop,
    a = r.left + e.clientLeft,
    l = Jn(e) ? ts(e) : jn(1),
    u = e.clientWidth * l.x,
    f = e.clientHeight * l.y,
    p = a * l.x,
    g = s * l.y
  return { width: u, height: f, x: p, y: g }
}
function Zv(e, t, r) {
  let s
  if (t === 'viewport') s = cR(e, r)
  else if (t === 'document') s = lR(_n(e))
  else if (hn(t)) s = uR(t, r)
  else {
    const a = m0(e)
    s = { x: t.x - a.x, y: t.y - a.y, width: t.width, height: t.height }
  }
  return Dl(s)
}
function g0(e, t) {
  const r = Or(e)
  return r === t || !hn(r) || as(r) ? !1 : gn(r).position === 'fixed' || g0(r, t)
}
function dR(e, t) {
  const r = t.get(e)
  if (r) return r
  let s = Ni(e, [], !1).filter((f) => hn(f) && ms(f) !== 'body'),
    a = null
  const l = gn(e).position === 'fixed'
  let u = l ? Or(e) : e
  for (; hn(u) && !as(u); ) {
    const f = gn(u),
      p = np(u)
    ;(!p && f.position === 'fixed' && (a = null),
      (
        l
          ? !p && !a
          : (!p &&
              f.position === 'static' &&
              !!a &&
              (a.position === 'absolute' || a.position === 'fixed')) ||
            (Oi(u) && !p && g0(e, u))
      )
        ? (s = s.filter((x) => x !== u))
        : (a = f),
      (u = Or(u)))
  }
  return (t.set(e, s), s)
}
function fR(e) {
  let { element: t, boundary: r, rootBoundary: s, strategy: a } = e
  const u = [...(r === 'clippingAncestors' ? (ql(t) ? [] : dR(t, this._c)) : [].concat(r)), s],
    f = Zv(t, u[0], a)
  let p = f.top,
    g = f.right,
    x = f.bottom,
    h = f.left
  for (let w = 1; w < u.length; w++) {
    const S = Zv(t, u[w], a)
    ;((p = $t(S.top, p)), (g = Ir(S.right, g)), (x = Ir(S.bottom, x)), (h = $t(S.left, h)))
  }
  return { width: g - h, height: x - p, x: h, y: p }
}
function pR(e) {
  const { width: t, height: r } = p0(e)
  return { width: t, height: r }
}
function mR(e, t, r) {
  const s = Jn(t),
    a = _n(t),
    l = r === 'fixed',
    u = ho(e, !0, l, t)
  let f = { scrollLeft: 0, scrollTop: 0 }
  const p = jn(0)
  function g() {
    p.x = Zl(a)
  }
  if (s || (!s && !l))
    if (((ms(t) !== 'body' || Oi(a)) && (f = Ql(t)), s)) {
      const S = ho(t, !0, l, t)
      ;((p.x = S.x + t.clientLeft), (p.y = S.y + t.clientTop))
    } else a && g()
  l && !s && a && g()
  const x = a && !s && !l ? h0(a, f) : jn(0),
    h = u.left + f.scrollLeft - p.x - x.x,
    w = u.top + f.scrollTop - p.y - x.y
  return { x: h, y: w, width: u.width, height: u.height }
}
function xd(e) {
  return gn(e).position === 'static'
}
function Jv(e, t) {
  if (!Jn(e) || gn(e).position === 'fixed') return null
  if (t) return t(e)
  let r = e.offsetParent
  return (_n(e) === r && (r = r.ownerDocument.body), r)
}
function v0(e, t) {
  const r = Wt(e)
  if (ql(e)) return r
  if (!Jn(e)) {
    let a = Or(e)
    for (; a && !as(a); ) {
      if (hn(a) && !xd(a)) return a
      a = Or(a)
    }
    return r
  }
  let s = Jv(e, t)
  for (; s && eR(s) && xd(s); ) s = Jv(s, t)
  return s && as(s) && xd(s) && !np(s) ? r : s || rR(e) || r
}
const hR = async function (e) {
  const t = this.getOffsetParent || v0,
    r = this.getDimensions,
    s = await r(e.floating)
  return {
    reference: mR(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: s.width, height: s.height },
  }
}
function gR(e) {
  return gn(e).direction === 'rtl'
}
const vR = {
  convertOffsetParentRelativeRectToViewportRelativeRect: iR,
  getDocumentElement: _n,
  getClippingRect: fR,
  getOffsetParent: v0,
  getElementRects: hR,
  getClientRects: aR,
  getDimensions: pR,
  getScale: ts,
  isElement: hn,
  isRTL: gR,
}
function y0(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}
function yR(e, t) {
  let r = null,
    s
  const a = _n(e)
  function l() {
    var f
    ;(clearTimeout(s), (f = r) == null || f.disconnect(), (r = null))
  }
  function u(f, p) {
    ;(f === void 0 && (f = !1), p === void 0 && (p = 1), l())
    const g = e.getBoundingClientRect(),
      { left: x, top: h, width: w, height: S } = g
    if ((f || t(), !w || !S)) return
    const N = ul(h),
      C = ul(a.clientWidth - (x + w)),
      E = ul(a.clientHeight - (h + S)),
      P = ul(x),
      k = {
        rootMargin: -N + 'px ' + -C + 'px ' + -E + 'px ' + -P + 'px',
        threshold: $t(0, Ir(1, p)) || 1,
      }
    let _ = !0
    function I(B) {
      const z = B[0].intersectionRatio
      if (z !== p) {
        if (!_) return u()
        z
          ? u(!1, z)
          : (s = setTimeout(() => {
              u(!1, 1e-7)
            }, 1e3))
      }
      ;(z === 1 && !y0(g, e.getBoundingClientRect()) && u(), (_ = !1))
    }
    try {
      r = new IntersectionObserver(I, { ...k, root: a.ownerDocument })
    } catch {
      r = new IntersectionObserver(I, k)
    }
    r.observe(e)
  }
  return (u(!0), l)
}
function xR(e, t, r, s) {
  s === void 0 && (s = {})
  const {
      ancestorScroll: a = !0,
      ancestorResize: l = !0,
      elementResize: u = typeof ResizeObserver == 'function',
      layoutShift: f = typeof IntersectionObserver == 'function',
      animationFrame: p = !1,
    } = s,
    g = op(e),
    x = a || l ? [...(g ? Ni(g) : []), ...(t ? Ni(t) : [])] : []
  x.forEach((P) => {
    ;(a && P.addEventListener('scroll', r, { passive: !0 }), l && P.addEventListener('resize', r))
  })
  const h = g && f ? yR(g, r) : null
  let w = -1,
    S = null
  u &&
    ((S = new ResizeObserver((P) => {
      let [j] = P
      ;(j &&
        j.target === g &&
        S &&
        t &&
        (S.unobserve(t),
        cancelAnimationFrame(w),
        (w = requestAnimationFrame(() => {
          var k
          ;(k = S) == null || k.observe(t)
        }))),
        r())
    })),
    g && !p && S.observe(g),
    t && S.observe(t))
  let N,
    C = p ? ho(e) : null
  p && E()
  function E() {
    const P = ho(e)
    ;(C && !y0(C, P) && r(), (C = P), (N = requestAnimationFrame(E)))
  }
  return (
    r(),
    () => {
      var P
      ;(x.forEach((j) => {
        ;(a && j.removeEventListener('scroll', r), l && j.removeEventListener('resize', r))
      }),
        h?.(),
        (P = S) == null || P.disconnect(),
        (S = null),
        p && cancelAnimationFrame(N))
    }
  )
}
const wR = qk,
  bR = Qk,
  SR = Kk,
  CR = Jk,
  ER = Yk,
  ey = Gk,
  NR = Zk,
  PR = (e, t, r) => {
    const s = new Map(),
      a = { platform: vR, ...r },
      l = { ...a.platform, _c: s }
    return Hk(e, t, { ...a, platform: l })
  }
var TR = typeof document < 'u',
  jR = function () {},
  Sl = TR ? v.useLayoutEffect : jR
function Il(e, t) {
  if (e === t) return !0
  if (typeof e != typeof t) return !1
  if (typeof e == 'function' && e.toString() === t.toString()) return !0
  let r, s, a
  if (e && t && typeof e == 'object') {
    if (Array.isArray(e)) {
      if (((r = e.length), r !== t.length)) return !1
      for (s = r; s-- !== 0; ) if (!Il(e[s], t[s])) return !1
      return !0
    }
    if (((a = Object.keys(e)), (r = a.length), r !== Object.keys(t).length)) return !1
    for (s = r; s-- !== 0; ) if (!{}.hasOwnProperty.call(t, a[s])) return !1
    for (s = r; s-- !== 0; ) {
      const l = a[s]
      if (!(l === '_owner' && e.$$typeof) && !Il(e[l], t[l])) return !1
    }
    return !0
  }
  return e !== e && t !== t
}
function x0(e) {
  return typeof window > 'u' ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function ty(e, t) {
  const r = x0(e)
  return Math.round(t * r) / r
}
function wd(e) {
  const t = v.useRef(e)
  return (
    Sl(() => {
      t.current = e
    }),
    t
  )
}
function kR(e) {
  e === void 0 && (e = {})
  const {
      placement: t = 'bottom',
      strategy: r = 'absolute',
      middleware: s = [],
      platform: a,
      elements: { reference: l, floating: u } = {},
      transform: f = !0,
      whileElementsMounted: p,
      open: g,
    } = e,
    [x, h] = v.useState({
      x: 0,
      y: 0,
      strategy: r,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [w, S] = v.useState(s)
  Il(w, s) || S(s)
  const [N, C] = v.useState(null),
    [E, P] = v.useState(null),
    j = v.useCallback((L) => {
      L !== B.current && ((B.current = L), C(L))
    }, []),
    k = v.useCallback((L) => {
      L !== z.current && ((z.current = L), P(L))
    }, []),
    _ = l || N,
    I = u || E,
    B = v.useRef(null),
    z = v.useRef(null),
    W = v.useRef(x),
    oe = p != null,
    ne = wd(p),
    me = wd(a),
    te = wd(g),
    ue = v.useCallback(() => {
      if (!B.current || !z.current) return
      const L = { placement: t, strategy: r, middleware: w }
      ;(me.current && (L.platform = me.current),
        PR(B.current, z.current, L).then((V) => {
          const U = { ...V, isPositioned: te.current !== !1 }
          fe.current &&
            !Il(W.current, U) &&
            ((W.current = U),
            Di.flushSync(() => {
              h(U)
            }))
        }))
    }, [w, t, r, me, te])
  Sl(() => {
    g === !1 &&
      W.current.isPositioned &&
      ((W.current.isPositioned = !1), h((L) => ({ ...L, isPositioned: !1 })))
  }, [g])
  const fe = v.useRef(!1)
  ;(Sl(
    () => (
      (fe.current = !0),
      () => {
        fe.current = !1
      }
    ),
    []
  ),
    Sl(() => {
      if ((_ && (B.current = _), I && (z.current = I), _ && I)) {
        if (ne.current) return ne.current(_, I, ue)
        ue()
      }
    }, [_, I, ue, ne, oe]))
  const xe = v.useMemo(
      () => ({ reference: B, floating: z, setReference: j, setFloating: k }),
      [j, k]
    ),
    X = v.useMemo(() => ({ reference: _, floating: I }), [_, I]),
    q = v.useMemo(() => {
      const L = { position: r, left: 0, top: 0 }
      if (!X.floating) return L
      const V = ty(X.floating, x.x),
        U = ty(X.floating, x.y)
      return f
        ? {
            ...L,
            transform: 'translate(' + V + 'px, ' + U + 'px)',
            ...(x0(X.floating) >= 1.5 && { willChange: 'transform' }),
          }
        : { position: r, left: V, top: U }
    }, [r, f, X.floating, x.x, x.y])
  return v.useMemo(
    () => ({ ...x, update: ue, refs: xe, elements: X, floatingStyles: q }),
    [x, ue, xe, X, q]
  )
}
const RR = (e) => {
    function t(r) {
      return {}.hasOwnProperty.call(r, 'current')
    }
    return {
      name: 'arrow',
      options: e,
      fn(r) {
        const { element: s, padding: a } = typeof e == 'function' ? e(r) : e
        return s && t(s)
          ? s.current != null
            ? ey({ element: s.current, padding: a }).fn(r)
            : {}
          : s
            ? ey({ element: s, padding: a }).fn(r)
            : {}
      },
    }
  },
  AR = (e, t) => {
    const r = wR(e)
    return { name: r.name, fn: r.fn, options: [e, t] }
  },
  MR = (e, t) => {
    const r = bR(e)
    return { name: r.name, fn: r.fn, options: [e, t] }
  },
  _R = (e, t) => ({ fn: NR(e).fn, options: [e, t] }),
  DR = (e, t) => {
    const r = SR(e)
    return { name: r.name, fn: r.fn, options: [e, t] }
  },
  IR = (e, t) => {
    const r = CR(e)
    return { name: r.name, fn: r.fn, options: [e, t] }
  },
  OR = (e, t) => {
    const r = ER(e)
    return { name: r.name, fn: r.fn, options: [e, t] }
  },
  LR = (e, t) => {
    const r = RR(e)
    return { name: r.name, fn: r.fn, options: [e, t] }
  }
var FR = 'Arrow',
  w0 = v.forwardRef((e, t) => {
    const { children: r, width: s = 10, height: a = 5, ...l } = e
    return d.jsx(Ne.svg, {
      ...l,
      ref: t,
      width: s,
      height: a,
      viewBox: '0 0 30 10',
      preserveAspectRatio: 'none',
      children: e.asChild ? r : d.jsx('polygon', { points: '0,0 30,0 15,10' }),
    })
  })
w0.displayName = FR
var VR = w0
function b0(e) {
  const [t, r] = v.useState(void 0)
  return (
    wt(() => {
      if (e) {
        r({ width: e.offsetWidth, height: e.offsetHeight })
        const s = new ResizeObserver((a) => {
          if (!Array.isArray(a) || !a.length) return
          const l = a[0]
          let u, f
          if ('borderBoxSize' in l) {
            const p = l.borderBoxSize,
              g = Array.isArray(p) ? p[0] : p
            ;((u = g.inlineSize), (f = g.blockSize))
          } else ((u = e.offsetWidth), (f = e.offsetHeight))
          r({ width: u, height: f })
        })
        return (s.observe(e, { box: 'border-box' }), () => s.unobserve(e))
      } else r(void 0)
    }, [e]),
    t
  )
}
var sp = 'Popper',
  [S0, Vr] = Mn(sp),
  [BR, C0] = S0(sp),
  E0 = (e) => {
    const { __scopePopper: t, children: r } = e,
      [s, a] = v.useState(null)
    return d.jsx(BR, { scope: t, anchor: s, onAnchorChange: a, children: r })
  }
E0.displayName = sp
var N0 = 'PopperAnchor',
  P0 = v.forwardRef((e, t) => {
    const { __scopePopper: r, virtualRef: s, ...a } = e,
      l = C0(N0, r),
      u = v.useRef(null),
      f = ke(t, u),
      p = v.useRef(null)
    return (
      v.useEffect(() => {
        const g = p.current
        ;((p.current = s?.current || u.current), g !== p.current && l.onAnchorChange(p.current))
      }),
      s ? null : d.jsx(Ne.div, { ...a, ref: f })
    )
  })
P0.displayName = N0
var ip = 'PopperContent',
  [zR, $R] = S0(ip),
  T0 = v.forwardRef((e, t) => {
    const {
        __scopePopper: r,
        side: s = 'bottom',
        sideOffset: a = 0,
        align: l = 'center',
        alignOffset: u = 0,
        arrowPadding: f = 0,
        avoidCollisions: p = !0,
        collisionBoundary: g = [],
        collisionPadding: x = 0,
        sticky: h = 'partial',
        hideWhenDetached: w = !1,
        updatePositionStrategy: S = 'optimized',
        onPlaced: N,
        ...C
      } = e,
      E = C0(ip, r),
      [P, j] = v.useState(null),
      k = ke(t, (Y) => j(Y)),
      [_, I] = v.useState(null),
      B = b0(_),
      z = B?.width ?? 0,
      W = B?.height ?? 0,
      oe = s + (l !== 'center' ? '-' + l : ''),
      ne = typeof x == 'number' ? x : { top: 0, right: 0, bottom: 0, left: 0, ...x },
      me = Array.isArray(g) ? g : [g],
      te = me.length > 0,
      ue = { padding: ne, boundary: me.filter(UR), altBoundary: te },
      {
        refs: fe,
        floatingStyles: xe,
        placement: X,
        isPositioned: q,
        middlewareData: L,
      } = kR({
        strategy: 'fixed',
        placement: oe,
        whileElementsMounted: (...Y) => xR(...Y, { animationFrame: S === 'always' }),
        elements: { reference: E.anchor },
        middleware: [
          AR({ mainAxis: a + W, alignmentAxis: u }),
          p && MR({ mainAxis: !0, crossAxis: !1, limiter: h === 'partial' ? _R() : void 0, ...ue }),
          p && DR({ ...ue }),
          IR({
            ...ue,
            apply: ({ elements: Y, rects: ee, availableWidth: we, availableHeight: Se }) => {
              const { width: Te, height: Me } = ee.reference,
                Je = Y.floating.style
              ;(Je.setProperty('--radix-popper-available-width', `${we}px`),
                Je.setProperty('--radix-popper-available-height', `${Se}px`),
                Je.setProperty('--radix-popper-anchor-width', `${Te}px`),
                Je.setProperty('--radix-popper-anchor-height', `${Me}px`))
            },
          }),
          _ && LR({ element: _, padding: f }),
          HR({ arrowWidth: z, arrowHeight: W }),
          w && OR({ strategy: 'referenceHidden', ...ue }),
        ],
      }),
      [V, U] = R0(X),
      A = qn(N)
    wt(() => {
      q && A?.()
    }, [q, A])
    const $ = L.arrow?.x,
      J = L.arrow?.y,
      re = L.arrow?.centerOffset !== 0,
      [le, he] = v.useState()
    return (
      wt(() => {
        P && he(window.getComputedStyle(P).zIndex)
      }, [P]),
      d.jsx('div', {
        ref: fe.setFloating,
        'data-radix-popper-content-wrapper': '',
        style: {
          ...xe,
          transform: q ? xe.transform : 'translate(0, -200%)',
          minWidth: 'max-content',
          zIndex: le,
          '--radix-popper-transform-origin': [L.transformOrigin?.x, L.transformOrigin?.y].join(' '),
          ...(L.hide?.referenceHidden && { visibility: 'hidden', pointerEvents: 'none' }),
        },
        dir: e.dir,
        children: d.jsx(zR, {
          scope: r,
          placedSide: V,
          onArrowChange: I,
          arrowX: $,
          arrowY: J,
          shouldHideArrow: re,
          children: d.jsx(Ne.div, {
            'data-side': V,
            'data-align': U,
            ...C,
            ref: k,
            style: { ...C.style, animation: q ? void 0 : 'none' },
          }),
        }),
      })
    )
  })
T0.displayName = ip
var j0 = 'PopperArrow',
  WR = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
  k0 = v.forwardRef(function (t, r) {
    const { __scopePopper: s, ...a } = t,
      l = $R(j0, s),
      u = WR[l.placedSide]
    return d.jsx('span', {
      ref: l.onArrowChange,
      style: {
        position: 'absolute',
        left: l.arrowX,
        top: l.arrowY,
        [u]: 0,
        transformOrigin: { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[
          l.placedSide
        ],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: 'rotate(180deg)',
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[l.placedSide],
        visibility: l.shouldHideArrow ? 'hidden' : void 0,
      },
      children: d.jsx(VR, { ...a, ref: r, style: { ...a.style, display: 'block' } }),
    })
  })
k0.displayName = j0
function UR(e) {
  return e !== null
}
var HR = (e) => ({
  name: 'transformOrigin',
  options: e,
  fn(t) {
    const { placement: r, rects: s, middlewareData: a } = t,
      u = a.arrow?.centerOffset !== 0,
      f = u ? 0 : e.arrowWidth,
      p = u ? 0 : e.arrowHeight,
      [g, x] = R0(r),
      h = { start: '0%', center: '50%', end: '100%' }[x],
      w = (a.arrow?.x ?? 0) + f / 2,
      S = (a.arrow?.y ?? 0) + p / 2
    let N = '',
      C = ''
    return (
      g === 'bottom'
        ? ((N = u ? h : `${w}px`), (C = `${-p}px`))
        : g === 'top'
          ? ((N = u ? h : `${w}px`), (C = `${s.floating.height + p}px`))
          : g === 'right'
            ? ((N = `${-p}px`), (C = u ? h : `${S}px`))
            : g === 'left' && ((N = `${s.floating.width + p}px`), (C = u ? h : `${S}px`)),
      { data: { x: N, y: C } }
    )
  },
})
function R0(e) {
  const [t, r = 'center'] = e.split('-')
  return [t, r]
}
var ap = E0,
  Li = P0,
  Jl = T0,
  ec = k0,
  GR = 'Portal',
  hs = v.forwardRef((e, t) => {
    const { container: r, ...s } = e,
      [a, l] = v.useState(!1)
    wt(() => l(!0), [])
    const u = r || (a && globalThis?.document?.body)
    return u ? o0.createPortal(d.jsx(Ne.div, { ...s, ref: t }), u) : null
  })
hs.displayName = GR
function KR(e, t) {
  return v.useReducer((r, s) => t[r][s] ?? r, e)
}
var Ht = (e) => {
  const { present: t, children: r } = e,
    s = YR(t),
    a = typeof r == 'function' ? r({ present: s.isPresent }) : v.Children.only(r),
    l = ke(s.ref, XR(a))
  return typeof r == 'function' || s.isPresent ? v.cloneElement(a, { ref: l }) : null
}
Ht.displayName = 'Presence'
function YR(e) {
  const [t, r] = v.useState(),
    s = v.useRef(null),
    a = v.useRef(e),
    l = v.useRef('none'),
    u = e ? 'mounted' : 'unmounted',
    [f, p] = KR(u, {
      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
      unmounted: { MOUNT: 'mounted' },
    })
  return (
    v.useEffect(() => {
      const g = dl(s.current)
      l.current = f === 'mounted' ? g : 'none'
    }, [f]),
    wt(() => {
      const g = s.current,
        x = a.current
      if (x !== e) {
        const w = l.current,
          S = dl(g)
        ;(e
          ? p('MOUNT')
          : S === 'none' || g?.display === 'none'
            ? p('UNMOUNT')
            : p(x && w !== S ? 'ANIMATION_OUT' : 'UNMOUNT'),
          (a.current = e))
      }
    }, [e, p]),
    wt(() => {
      if (t) {
        let g
        const x = t.ownerDocument.defaultView ?? window,
          h = (S) => {
            const C = dl(s.current).includes(CSS.escape(S.animationName))
            if (S.target === t && C && (p('ANIMATION_END'), !a.current)) {
              const E = t.style.animationFillMode
              ;((t.style.animationFillMode = 'forwards'),
                (g = x.setTimeout(() => {
                  t.style.animationFillMode === 'forwards' && (t.style.animationFillMode = E)
                })))
            }
          },
          w = (S) => {
            S.target === t && (l.current = dl(s.current))
          }
        return (
          t.addEventListener('animationstart', w),
          t.addEventListener('animationcancel', h),
          t.addEventListener('animationend', h),
          () => {
            ;(x.clearTimeout(g),
              t.removeEventListener('animationstart', w),
              t.removeEventListener('animationcancel', h),
              t.removeEventListener('animationend', h))
          }
        )
      } else p('ANIMATION_END')
    }, [t, p]),
    {
      isPresent: ['mounted', 'unmountSuspended'].includes(f),
      ref: v.useCallback((g) => {
        ;((s.current = g ? getComputedStyle(g) : null), r(g))
      }, []),
    }
  )
}
function dl(e) {
  return e?.animationName || 'none'
}
function XR(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    r = t && 'isReactWarning' in t && t.isReactWarning
  return r
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (r = t && 'isReactWarning' in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref)
}
function qR(e) {
  const t = QR(e),
    r = v.forwardRef((s, a) => {
      const { children: l, ...u } = s,
        f = v.Children.toArray(l),
        p = f.find(JR)
      if (p) {
        const g = p.props.children,
          x = f.map((h) =>
            h === p
              ? v.Children.count(g) > 1
                ? v.Children.only(null)
                : v.isValidElement(g)
                  ? g.props.children
                  : null
              : h
          )
        return d.jsx(t, {
          ...u,
          ref: a,
          children: v.isValidElement(g) ? v.cloneElement(g, void 0, x) : null,
        })
      }
      return d.jsx(t, { ...u, ref: a, children: l })
    })
  return ((r.displayName = `${e}.Slot`), r)
}
function QR(e) {
  const t = v.forwardRef((r, s) => {
    const { children: a, ...l } = r
    if (v.isValidElement(a)) {
      const u = t2(a),
        f = e2(l, a.props)
      return (a.type !== v.Fragment && (f.ref = s ? An(s, u) : u), v.cloneElement(a, f))
    }
    return v.Children.count(a) > 1 ? v.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var ZR = Symbol('radix.slottable')
function JR(e) {
  return (
    v.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === ZR
  )
}
function e2(e, t) {
  const r = { ...t }
  for (const s in t) {
    const a = e[s],
      l = t[s]
    ;/^on[A-Z]/.test(s)
      ? a && l
        ? (r[s] = (...f) => {
            const p = l(...f)
            return (a(...f), p)
          })
        : a && (r[s] = a)
      : s === 'style'
        ? (r[s] = { ...a, ...l })
        : s === 'className' && (r[s] = [a, l].filter(Boolean).join(' '))
  }
  return { ...e, ...r }
}
function t2(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    r = t && 'isReactWarning' in t && t.isReactWarning
  return r
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (r = t && 'isReactWarning' in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref)
}
var n2 = df[' useInsertionEffect '.trim().toString()] || wt
function go({ prop: e, defaultProp: t, onChange: r = () => {}, caller: s }) {
  const [a, l, u] = r2({ defaultProp: t, onChange: r }),
    f = e !== void 0,
    p = f ? e : a
  {
    const x = v.useRef(e !== void 0)
    v.useEffect(() => {
      const h = x.current
      ;(h !== f &&
        console.warn(
          `${s} is changing from ${h ? 'controlled' : 'uncontrolled'} to ${f ? 'controlled' : 'uncontrolled'}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        ),
        (x.current = f))
    }, [f, s])
  }
  const g = v.useCallback(
    (x) => {
      if (f) {
        const h = o2(x) ? x(e) : x
        h !== e && u.current?.(h)
      } else l(x)
    },
    [f, e, l, u]
  )
  return [p, g]
}
function r2({ defaultProp: e, onChange: t }) {
  const [r, s] = v.useState(e),
    a = v.useRef(r),
    l = v.useRef(t)
  return (
    n2(() => {
      l.current = t
    }, [t]),
    v.useEffect(() => {
      a.current !== r && (l.current?.(r), (a.current = r))
    }, [r, a]),
    [r, s, l]
  )
}
function o2(e) {
  return typeof e == 'function'
}
var s2 = function (e) {
    if (typeof document > 'u') return null
    var t = Array.isArray(e) ? e[0] : e
    return t.ownerDocument.body
  },
  Ko = new WeakMap(),
  fl = new WeakMap(),
  pl = {},
  bd = 0,
  A0 = function (e) {
    return e && (e.host || A0(e.parentNode))
  },
  i2 = function (e, t) {
    return t
      .map(function (r) {
        if (e.contains(r)) return r
        var s = A0(r)
        return s && e.contains(s)
          ? s
          : (console.error('aria-hidden', r, 'in not contained inside', e, '. Doing nothing'), null)
      })
      .filter(function (r) {
        return !!r
      })
  },
  a2 = function (e, t, r, s) {
    var a = i2(t, Array.isArray(e) ? e : [e])
    pl[r] || (pl[r] = new WeakMap())
    var l = pl[r],
      u = [],
      f = new Set(),
      p = new Set(a),
      g = function (h) {
        !h || f.has(h) || (f.add(h), g(h.parentNode))
      }
    a.forEach(g)
    var x = function (h) {
      !h ||
        p.has(h) ||
        Array.prototype.forEach.call(h.children, function (w) {
          if (f.has(w)) x(w)
          else
            try {
              var S = w.getAttribute(s),
                N = S !== null && S !== 'false',
                C = (Ko.get(w) || 0) + 1,
                E = (l.get(w) || 0) + 1
              ;(Ko.set(w, C),
                l.set(w, E),
                u.push(w),
                C === 1 && N && fl.set(w, !0),
                E === 1 && w.setAttribute(r, 'true'),
                N || w.setAttribute(s, 'true'))
            } catch (P) {
              console.error('aria-hidden: cannot operate on ', w, P)
            }
        })
    }
    return (
      x(t),
      f.clear(),
      bd++,
      function () {
        ;(u.forEach(function (h) {
          var w = Ko.get(h) - 1,
            S = l.get(h) - 1
          ;(Ko.set(h, w),
            l.set(h, S),
            w || (fl.has(h) || h.removeAttribute(s), fl.delete(h)),
            S || h.removeAttribute(r))
        }),
          bd--,
          bd || ((Ko = new WeakMap()), (Ko = new WeakMap()), (fl = new WeakMap()), (pl = {})))
      }
    )
  },
  tc = function (e, t, r) {
    r === void 0 && (r = 'data-aria-hidden')
    var s = Array.from(Array.isArray(e) ? e : [e]),
      a = s2(e)
    return a
      ? (s.push.apply(s, Array.from(a.querySelectorAll('[aria-live], script'))),
        a2(s, a, r, 'aria-hidden'))
      : function () {
          return null
        }
  },
  En = function () {
    return (
      (En =
        Object.assign ||
        function (t) {
          for (var r, s = 1, a = arguments.length; s < a; s++) {
            r = arguments[s]
            for (var l in r) Object.prototype.hasOwnProperty.call(r, l) && (t[l] = r[l])
          }
          return t
        }),
      En.apply(this, arguments)
    )
  }
function M0(e, t) {
  var r = {}
  for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s])
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var a = 0, s = Object.getOwnPropertySymbols(e); a < s.length; a++)
      t.indexOf(s[a]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, s[a]) &&
        (r[s[a]] = e[s[a]])
  return r
}
function l2(e, t, r) {
  if (r || arguments.length === 2)
    for (var s = 0, a = t.length, l; s < a; s++)
      (l || !(s in t)) && (l || (l = Array.prototype.slice.call(t, 0, s)), (l[s] = t[s]))
  return e.concat(l || Array.prototype.slice.call(t))
}
var Cl = 'right-scroll-bar-position',
  El = 'width-before-scroll-bar',
  c2 = 'with-scroll-bars-hidden',
  u2 = '--removed-body-scroll-bar-size'
function Sd(e, t) {
  return (typeof e == 'function' ? e(t) : e && (e.current = t), e)
}
function d2(e, t) {
  var r = v.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return r.value
        },
        set current(s) {
          var a = r.value
          a !== s && ((r.value = s), r.callback(s, a))
        },
      },
    }
  })[0]
  return ((r.callback = t), r.facade)
}
var f2 = typeof window < 'u' ? v.useLayoutEffect : v.useEffect,
  ny = new WeakMap()
function p2(e, t) {
  var r = d2(null, function (s) {
    return e.forEach(function (a) {
      return Sd(a, s)
    })
  })
  return (
    f2(
      function () {
        var s = ny.get(r)
        if (s) {
          var a = new Set(s),
            l = new Set(e),
            u = r.current
          ;(a.forEach(function (f) {
            l.has(f) || Sd(f, null)
          }),
            l.forEach(function (f) {
              a.has(f) || Sd(f, u)
            }))
        }
        ny.set(r, e)
      },
      [e]
    ),
    r
  )
}
function m2(e) {
  return e
}
function h2(e, t) {
  t === void 0 && (t = m2)
  var r = [],
    s = !1,
    a = {
      read: function () {
        if (s)
          throw new Error(
            'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.'
          )
        return r.length ? r[r.length - 1] : e
      },
      useMedium: function (l) {
        var u = t(l, s)
        return (
          r.push(u),
          function () {
            r = r.filter(function (f) {
              return f !== u
            })
          }
        )
      },
      assignSyncMedium: function (l) {
        for (s = !0; r.length; ) {
          var u = r
          ;((r = []), u.forEach(l))
        }
        r = {
          push: function (f) {
            return l(f)
          },
          filter: function () {
            return r
          },
        }
      },
      assignMedium: function (l) {
        s = !0
        var u = []
        if (r.length) {
          var f = r
          ;((r = []), f.forEach(l), (u = r))
        }
        var p = function () {
            var x = u
            ;((u = []), x.forEach(l))
          },
          g = function () {
            return Promise.resolve().then(p)
          }
        ;(g(),
          (r = {
            push: function (x) {
              ;(u.push(x), g())
            },
            filter: function (x) {
              return ((u = u.filter(x)), r)
            },
          }))
      },
    }
  return a
}
function g2(e) {
  e === void 0 && (e = {})
  var t = h2(null)
  return ((t.options = En({ async: !0, ssr: !1 }, e)), t)
}
var _0 = function (e) {
  var t = e.sideCar,
    r = M0(e, ['sideCar'])
  if (!t) throw new Error('Sidecar: please provide `sideCar` property to import the right car')
  var s = t.read()
  if (!s) throw new Error('Sidecar medium not found')
  return v.createElement(s, En({}, r))
}
_0.isSideCarExport = !0
function v2(e, t) {
  return (e.useMedium(t), _0)
}
var D0 = g2(),
  Cd = function () {},
  nc = v.forwardRef(function (e, t) {
    var r = v.useRef(null),
      s = v.useState({ onScrollCapture: Cd, onWheelCapture: Cd, onTouchMoveCapture: Cd }),
      a = s[0],
      l = s[1],
      u = e.forwardProps,
      f = e.children,
      p = e.className,
      g = e.removeScrollBar,
      x = e.enabled,
      h = e.shards,
      w = e.sideCar,
      S = e.noRelative,
      N = e.noIsolation,
      C = e.inert,
      E = e.allowPinchZoom,
      P = e.as,
      j = P === void 0 ? 'div' : P,
      k = e.gapMode,
      _ = M0(e, [
        'forwardProps',
        'children',
        'className',
        'removeScrollBar',
        'enabled',
        'shards',
        'sideCar',
        'noRelative',
        'noIsolation',
        'inert',
        'allowPinchZoom',
        'as',
        'gapMode',
      ]),
      I = w,
      B = p2([r, t]),
      z = En(En({}, _), a)
    return v.createElement(
      v.Fragment,
      null,
      x &&
        v.createElement(I, {
          sideCar: D0,
          removeScrollBar: g,
          shards: h,
          noRelative: S,
          noIsolation: N,
          inert: C,
          setCallbacks: l,
          allowPinchZoom: !!E,
          lockRef: r,
          gapMode: k,
        }),
      u
        ? v.cloneElement(v.Children.only(f), En(En({}, z), { ref: B }))
        : v.createElement(j, En({}, z, { className: p, ref: B }), f)
    )
  })
nc.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }
nc.classNames = { fullWidth: El, zeroRight: Cl }
var y2 = function () {
  if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__
}
function x2() {
  if (!document) return null
  var e = document.createElement('style')
  e.type = 'text/css'
  var t = y2()
  return (t && e.setAttribute('nonce', t), e)
}
function w2(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t))
}
function b2(e) {
  var t = document.head || document.getElementsByTagName('head')[0]
  t.appendChild(e)
}
var S2 = function () {
    var e = 0,
      t = null
    return {
      add: function (r) {
        ;(e == 0 && (t = x2()) && (w2(t, r), b2(t)), e++)
      },
      remove: function () {
        ;(e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)))
      },
    }
  },
  C2 = function () {
    var e = S2()
    return function (t, r) {
      v.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove()
            }
          )
        },
        [t && r]
      )
    }
  },
  I0 = function () {
    var e = C2(),
      t = function (r) {
        var s = r.styles,
          a = r.dynamic
        return (e(s, a), null)
      }
    return t
  },
  E2 = { left: 0, top: 0, right: 0, gap: 0 },
  Ed = function (e) {
    return parseInt(e || '', 10) || 0
  },
  N2 = function (e) {
    var t = window.getComputedStyle(document.body),
      r = t[e === 'padding' ? 'paddingLeft' : 'marginLeft'],
      s = t[e === 'padding' ? 'paddingTop' : 'marginTop'],
      a = t[e === 'padding' ? 'paddingRight' : 'marginRight']
    return [Ed(r), Ed(s), Ed(a)]
  },
  P2 = function (e) {
    if ((e === void 0 && (e = 'margin'), typeof window > 'u')) return E2
    var t = N2(e),
      r = document.documentElement.clientWidth,
      s = window.innerWidth
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, s - r + t[2] - t[0]) }
  },
  T2 = I0(),
  ns = 'data-scroll-locked',
  j2 = function (e, t, r, s) {
    var a = e.left,
      l = e.top,
      u = e.right,
      f = e.gap
    return (
      r === void 0 && (r = 'margin'),
      `
  .`
        .concat(
          c2,
          ` {
   overflow: hidden `
        )
        .concat(
          s,
          `;
   padding-right: `
        )
        .concat(f, 'px ')
        .concat(
          s,
          `;
  }
  body[`
        )
        .concat(
          ns,
          `] {
    overflow: hidden `
        )
        .concat(
          s,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            t && 'position: relative '.concat(s, ';'),
            r === 'margin' &&
              `
    padding-left: `
                .concat(
                  a,
                  `px;
    padding-top: `
                )
                .concat(
                  l,
                  `px;
    padding-right: `
                )
                .concat(
                  u,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(f, 'px ')
                .concat(
                  s,
                  `;
    `
                ),
            r === 'padding' && 'padding-right: '.concat(f, 'px ').concat(s, ';'),
          ]
            .filter(Boolean)
            .join(''),
          `
  }
  
  .`
        )
        .concat(
          Cl,
          ` {
    right: `
        )
        .concat(f, 'px ')
        .concat(
          s,
          `;
  }
  
  .`
        )
        .concat(
          El,
          ` {
    margin-right: `
        )
        .concat(f, 'px ')
        .concat(
          s,
          `;
  }
  
  .`
        )
        .concat(Cl, ' .')
        .concat(
          Cl,
          ` {
    right: 0 `
        )
        .concat(
          s,
          `;
  }
  
  .`
        )
        .concat(El, ' .')
        .concat(
          El,
          ` {
    margin-right: 0 `
        )
        .concat(
          s,
          `;
  }
  
  body[`
        )
        .concat(
          ns,
          `] {
    `
        )
        .concat(u2, ': ')
        .concat(
          f,
          `px;
  }
`
        )
    )
  },
  ry = function () {
    var e = parseInt(document.body.getAttribute(ns) || '0', 10)
    return isFinite(e) ? e : 0
  },
  k2 = function () {
    v.useEffect(function () {
      return (
        document.body.setAttribute(ns, (ry() + 1).toString()),
        function () {
          var e = ry() - 1
          e <= 0 ? document.body.removeAttribute(ns) : document.body.setAttribute(ns, e.toString())
        }
      )
    }, [])
  },
  R2 = function (e) {
    var t = e.noRelative,
      r = e.noImportant,
      s = e.gapMode,
      a = s === void 0 ? 'margin' : s
    k2()
    var l = v.useMemo(
      function () {
        return P2(a)
      },
      [a]
    )
    return v.createElement(T2, { styles: j2(l, !t, a, r ? '' : '!important') })
  },
  qd = !1
if (typeof window < 'u')
  try {
    var ml = Object.defineProperty({}, 'passive', {
      get: function () {
        return ((qd = !0), !0)
      },
    })
    ;(window.addEventListener('test', ml, ml), window.removeEventListener('test', ml, ml))
  } catch {
    qd = !1
  }
var Yo = qd ? { passive: !1 } : !1,
  A2 = function (e) {
    return e.tagName === 'TEXTAREA'
  },
  O0 = function (e, t) {
    if (!(e instanceof Element)) return !1
    var r = window.getComputedStyle(e)
    return r[t] !== 'hidden' && !(r.overflowY === r.overflowX && !A2(e) && r[t] === 'visible')
  },
  M2 = function (e) {
    return O0(e, 'overflowY')
  },
  _2 = function (e) {
    return O0(e, 'overflowX')
  },
  oy = function (e, t) {
    var r = t.ownerDocument,
      s = t
    do {
      typeof ShadowRoot < 'u' && s instanceof ShadowRoot && (s = s.host)
      var a = L0(e, s)
      if (a) {
        var l = F0(e, s),
          u = l[1],
          f = l[2]
        if (u > f) return !0
      }
      s = s.parentNode
    } while (s && s !== r.body)
    return !1
  },
  D2 = function (e) {
    var t = e.scrollTop,
      r = e.scrollHeight,
      s = e.clientHeight
    return [t, r, s]
  },
  I2 = function (e) {
    var t = e.scrollLeft,
      r = e.scrollWidth,
      s = e.clientWidth
    return [t, r, s]
  },
  L0 = function (e, t) {
    return e === 'v' ? M2(t) : _2(t)
  },
  F0 = function (e, t) {
    return e === 'v' ? D2(t) : I2(t)
  },
  O2 = function (e, t) {
    return e === 'h' && t === 'rtl' ? -1 : 1
  },
  L2 = function (e, t, r, s, a) {
    var l = O2(e, window.getComputedStyle(t).direction),
      u = l * s,
      f = r.target,
      p = t.contains(f),
      g = !1,
      x = u > 0,
      h = 0,
      w = 0
    do {
      if (!f) break
      var S = F0(e, f),
        N = S[0],
        C = S[1],
        E = S[2],
        P = C - E - l * N
      ;(N || P) && L0(e, f) && ((h += P), (w += N))
      var j = f.parentNode
      f = j && j.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? j.host : j
    } while ((!p && f !== document.body) || (p && (t.contains(f) || t === f)))
    return (((x && Math.abs(h) < 1) || (!x && Math.abs(w) < 1)) && (g = !0), g)
  },
  hl = function (e) {
    return 'changedTouches' in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0]
  },
  sy = function (e) {
    return [e.deltaX, e.deltaY]
  },
  iy = function (e) {
    return e && 'current' in e ? e.current : e
  },
  F2 = function (e, t) {
    return e[0] === t[0] && e[1] === t[1]
  },
  V2 = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        e,
        ` {pointer-events: all;}
`
      )
  },
  B2 = 0,
  Xo = []
function z2(e) {
  var t = v.useRef([]),
    r = v.useRef([0, 0]),
    s = v.useRef(),
    a = v.useState(B2++)[0],
    l = v.useState(I0)[0],
    u = v.useRef(e)
  ;(v.useEffect(
    function () {
      u.current = e
    },
    [e]
  ),
    v.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add('block-interactivity-'.concat(a))
          var C = l2([e.lockRef.current], (e.shards || []).map(iy), !0).filter(Boolean)
          return (
            C.forEach(function (E) {
              return E.classList.add('allow-interactivity-'.concat(a))
            }),
            function () {
              ;(document.body.classList.remove('block-interactivity-'.concat(a)),
                C.forEach(function (E) {
                  return E.classList.remove('allow-interactivity-'.concat(a))
                }))
            }
          )
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    ))
  var f = v.useCallback(function (C, E) {
      if (('touches' in C && C.touches.length === 2) || (C.type === 'wheel' && C.ctrlKey))
        return !u.current.allowPinchZoom
      var P = hl(C),
        j = r.current,
        k = 'deltaX' in C ? C.deltaX : j[0] - P[0],
        _ = 'deltaY' in C ? C.deltaY : j[1] - P[1],
        I,
        B = C.target,
        z = Math.abs(k) > Math.abs(_) ? 'h' : 'v'
      if ('touches' in C && z === 'h' && B.type === 'range') return !1
      var W = window.getSelection(),
        oe = W && W.anchorNode,
        ne = oe ? oe === B || oe.contains(B) : !1
      if (ne) return !1
      var me = oy(z, B)
      if (!me) return !0
      if ((me ? (I = z) : ((I = z === 'v' ? 'h' : 'v'), (me = oy(z, B))), !me)) return !1
      if ((!s.current && 'changedTouches' in C && (k || _) && (s.current = I), !I)) return !0
      var te = s.current || I
      return L2(te, E, C, te === 'h' ? k : _)
    }, []),
    p = v.useCallback(function (C) {
      var E = C
      if (!(!Xo.length || Xo[Xo.length - 1] !== l)) {
        var P = 'deltaY' in E ? sy(E) : hl(E),
          j = t.current.filter(function (I) {
            return (
              I.name === E.type &&
              (I.target === E.target || E.target === I.shadowParent) &&
              F2(I.delta, P)
            )
          })[0]
        if (j && j.should) {
          E.cancelable && E.preventDefault()
          return
        }
        if (!j) {
          var k = (u.current.shards || [])
              .map(iy)
              .filter(Boolean)
              .filter(function (I) {
                return I.contains(E.target)
              }),
            _ = k.length > 0 ? f(E, k[0]) : !u.current.noIsolation
          _ && E.cancelable && E.preventDefault()
        }
      }
    }, []),
    g = v.useCallback(function (C, E, P, j) {
      var k = { name: C, delta: E, target: P, should: j, shadowParent: $2(P) }
      ;(t.current.push(k),
        setTimeout(function () {
          t.current = t.current.filter(function (_) {
            return _ !== k
          })
        }, 1))
    }, []),
    x = v.useCallback(function (C) {
      ;((r.current = hl(C)), (s.current = void 0))
    }, []),
    h = v.useCallback(function (C) {
      g(C.type, sy(C), C.target, f(C, e.lockRef.current))
    }, []),
    w = v.useCallback(function (C) {
      g(C.type, hl(C), C.target, f(C, e.lockRef.current))
    }, [])
  v.useEffect(function () {
    return (
      Xo.push(l),
      e.setCallbacks({ onScrollCapture: h, onWheelCapture: h, onTouchMoveCapture: w }),
      document.addEventListener('wheel', p, Yo),
      document.addEventListener('touchmove', p, Yo),
      document.addEventListener('touchstart', x, Yo),
      function () {
        ;((Xo = Xo.filter(function (C) {
          return C !== l
        })),
          document.removeEventListener('wheel', p, Yo),
          document.removeEventListener('touchmove', p, Yo),
          document.removeEventListener('touchstart', x, Yo))
      }
    )
  }, [])
  var S = e.removeScrollBar,
    N = e.inert
  return v.createElement(
    v.Fragment,
    null,
    N ? v.createElement(l, { styles: V2(a) }) : null,
    S ? v.createElement(R2, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  )
}
function $2(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode))
  return t
}
const W2 = v2(D0, z2)
var Fi = v.forwardRef(function (e, t) {
  return v.createElement(nc, En({}, e, { ref: t, sideCar: W2 }))
})
Fi.classNames = nc.classNames
var rc = 'Popover',
  [V0] = Mn(rc, [Vr]),
  Vi = Vr(),
  [U2, Br] = V0(rc),
  B0 = (e) => {
    const {
        __scopePopover: t,
        children: r,
        open: s,
        defaultOpen: a,
        onOpenChange: l,
        modal: u = !1,
      } = e,
      f = Vi(t),
      p = v.useRef(null),
      [g, x] = v.useState(!1),
      [h, w] = go({ prop: s, defaultProp: a ?? !1, onChange: l, caller: rc })
    return d.jsx(ap, {
      ...f,
      children: d.jsx(U2, {
        scope: t,
        contentId: Xn(),
        triggerRef: p,
        open: h,
        onOpenChange: w,
        onOpenToggle: v.useCallback(() => w((S) => !S), [w]),
        hasCustomAnchor: g,
        onCustomAnchorAdd: v.useCallback(() => x(!0), []),
        onCustomAnchorRemove: v.useCallback(() => x(!1), []),
        modal: u,
        children: r,
      }),
    })
  }
B0.displayName = rc
var z0 = 'PopoverAnchor',
  H2 = v.forwardRef((e, t) => {
    const { __scopePopover: r, ...s } = e,
      a = Br(z0, r),
      l = Vi(r),
      { onCustomAnchorAdd: u, onCustomAnchorRemove: f } = a
    return (v.useEffect(() => (u(), () => f()), [u, f]), d.jsx(Li, { ...l, ...s, ref: t }))
  })
H2.displayName = z0
var $0 = 'PopoverTrigger',
  W0 = v.forwardRef((e, t) => {
    const { __scopePopover: r, ...s } = e,
      a = Br($0, r),
      l = Vi(r),
      u = ke(t, a.triggerRef),
      f = d.jsx(Ne.button, {
        type: 'button',
        'aria-haspopup': 'dialog',
        'aria-expanded': a.open,
        'aria-controls': a.contentId,
        'data-state': Y0(a.open),
        ...s,
        ref: u,
        onClick: ie(e.onClick, a.onOpenToggle),
      })
    return a.hasCustomAnchor ? f : d.jsx(Li, { asChild: !0, ...l, children: f })
  })
W0.displayName = $0
var lp = 'PopoverPortal',
  [G2, K2] = V0(lp, { forceMount: void 0 }),
  U0 = (e) => {
    const { __scopePopover: t, forceMount: r, children: s, container: a } = e,
      l = Br(lp, t)
    return d.jsx(G2, {
      scope: t,
      forceMount: r,
      children: d.jsx(Ht, {
        present: r || l.open,
        children: d.jsx(hs, { asChild: !0, container: a, children: s }),
      }),
    })
  }
U0.displayName = lp
var ls = 'PopoverContent',
  H0 = v.forwardRef((e, t) => {
    const r = K2(ls, e.__scopePopover),
      { forceMount: s = r.forceMount, ...a } = e,
      l = Br(ls, e.__scopePopover)
    return d.jsx(Ht, {
      present: s || l.open,
      children: l.modal ? d.jsx(X2, { ...a, ref: t }) : d.jsx(q2, { ...a, ref: t }),
    })
  })
H0.displayName = ls
var Y2 = qR('PopoverContent.RemoveScroll'),
  X2 = v.forwardRef((e, t) => {
    const r = Br(ls, e.__scopePopover),
      s = v.useRef(null),
      a = ke(t, s),
      l = v.useRef(!1)
    return (
      v.useEffect(() => {
        const u = s.current
        if (u) return tc(u)
      }, []),
      d.jsx(Fi, {
        as: Y2,
        allowPinchZoom: !0,
        children: d.jsx(G0, {
          ...e,
          ref: a,
          trapFocus: r.open,
          disableOutsidePointerEvents: !0,
          onCloseAutoFocus: ie(e.onCloseAutoFocus, (u) => {
            ;(u.preventDefault(), l.current || r.triggerRef.current?.focus())
          }),
          onPointerDownOutside: ie(
            e.onPointerDownOutside,
            (u) => {
              const f = u.detail.originalEvent,
                p = f.button === 0 && f.ctrlKey === !0,
                g = f.button === 2 || p
              l.current = g
            },
            { checkForDefaultPrevented: !1 }
          ),
          onFocusOutside: ie(e.onFocusOutside, (u) => u.preventDefault(), {
            checkForDefaultPrevented: !1,
          }),
        }),
      })
    )
  }),
  q2 = v.forwardRef((e, t) => {
    const r = Br(ls, e.__scopePopover),
      s = v.useRef(!1),
      a = v.useRef(!1)
    return d.jsx(G0, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (l) => {
        ;(e.onCloseAutoFocus?.(l),
          l.defaultPrevented || (s.current || r.triggerRef.current?.focus(), l.preventDefault()),
          (s.current = !1),
          (a.current = !1))
      },
      onInteractOutside: (l) => {
        ;(e.onInteractOutside?.(l),
          l.defaultPrevented ||
            ((s.current = !0), l.detail.originalEvent.type === 'pointerdown' && (a.current = !0)))
        const u = l.target
        ;(r.triggerRef.current?.contains(u) && l.preventDefault(),
          l.detail.originalEvent.type === 'focusin' && a.current && l.preventDefault())
      },
    })
  }),
  G0 = v.forwardRef((e, t) => {
    const {
        __scopePopover: r,
        trapFocus: s,
        onOpenAutoFocus: a,
        onCloseAutoFocus: l,
        disableOutsidePointerEvents: u,
        onEscapeKeyDown: f,
        onPointerDownOutside: p,
        onFocusOutside: g,
        onInteractOutside: x,
        ...h
      } = e,
      w = Br(ls, r),
      S = Vi(r)
    return (
      Yl(),
      d.jsx(Ii, {
        asChild: !0,
        loop: !0,
        trapped: s,
        onMountAutoFocus: a,
        onUnmountAutoFocus: l,
        children: d.jsx(fs, {
          asChild: !0,
          disableOutsidePointerEvents: u,
          onInteractOutside: x,
          onEscapeKeyDown: f,
          onPointerDownOutside: p,
          onFocusOutside: g,
          onDismiss: () => w.onOpenChange(!1),
          children: d.jsx(Jl, {
            'data-state': Y0(w.open),
            role: 'dialog',
            id: w.contentId,
            ...S,
            ...h,
            ref: t,
            style: {
              ...h.style,
              '--radix-popover-content-transform-origin': 'var(--radix-popper-transform-origin)',
              '--radix-popover-content-available-width': 'var(--radix-popper-available-width)',
              '--radix-popover-content-available-height': 'var(--radix-popper-available-height)',
              '--radix-popover-trigger-width': 'var(--radix-popper-anchor-width)',
              '--radix-popover-trigger-height': 'var(--radix-popper-anchor-height)',
            },
          }),
        }),
      })
    )
  }),
  K0 = 'PopoverClose',
  Q2 = v.forwardRef((e, t) => {
    const { __scopePopover: r, ...s } = e,
      a = Br(K0, r)
    return d.jsx(Ne.button, {
      type: 'button',
      ...s,
      ref: t,
      onClick: ie(e.onClick, () => a.onOpenChange(!1)),
    })
  })
Q2.displayName = K0
var Z2 = 'PopoverArrow',
  J2 = v.forwardRef((e, t) => {
    const { __scopePopover: r, ...s } = e,
      a = Vi(r)
    return d.jsx(ec, { ...a, ...s, ref: t })
  })
J2.displayName = Z2
function Y0(e) {
  return e ? 'open' : 'closed'
}
var eA = B0,
  tA = W0,
  nA = U0,
  X0 = H0
function q0(e) {
  var t,
    r,
    s = ''
  if (typeof e == 'string' || typeof e == 'number') s += e
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var a = e.length
      for (t = 0; t < a; t++) e[t] && (r = q0(e[t])) && (s && (s += ' '), (s += r))
    } else for (r in e) e[r] && (s && (s += ' '), (s += r))
  return s
}
function Q0() {
  for (var e, t, r = 0, s = '', a = arguments.length; r < a; r++)
    (e = arguments[r]) && (t = q0(e)) && (s && (s += ' '), (s += t))
  return s
}
const cp = '-',
  rA = (e) => {
    const t = sA(e),
      { conflictingClassGroups: r, conflictingClassGroupModifiers: s } = e
    return {
      getClassGroupId: (u) => {
        const f = u.split(cp)
        return (f[0] === '' && f.length !== 1 && f.shift(), Z0(f, t) || oA(u))
      },
      getConflictingClassGroupIds: (u, f) => {
        const p = r[u] || []
        return f && s[u] ? [...p, ...s[u]] : p
      },
    }
  },
  Z0 = (e, t) => {
    if (e.length === 0) return t.classGroupId
    const r = e[0],
      s = t.nextPart.get(r),
      a = s ? Z0(e.slice(1), s) : void 0
    if (a) return a
    if (t.validators.length === 0) return
    const l = e.join(cp)
    return t.validators.find(({ validator: u }) => u(l))?.classGroupId
  },
  ay = /^\[(.+)\]$/,
  oA = (e) => {
    if (ay.test(e)) {
      const t = ay.exec(e)[1],
        r = t?.substring(0, t.indexOf(':'))
      if (r) return 'arbitrary..' + r
    }
  },
  sA = (e) => {
    const { theme: t, prefix: r } = e,
      s = { nextPart: new Map(), validators: [] }
    return (
      aA(Object.entries(e.classGroups), r).forEach(([l, u]) => {
        Qd(u, s, l, t)
      }),
      s
    )
  },
  Qd = (e, t, r, s) => {
    e.forEach((a) => {
      if (typeof a == 'string') {
        const l = a === '' ? t : ly(t, a)
        l.classGroupId = r
        return
      }
      if (typeof a == 'function') {
        if (iA(a)) {
          Qd(a(s), t, r, s)
          return
        }
        t.validators.push({ validator: a, classGroupId: r })
        return
      }
      Object.entries(a).forEach(([l, u]) => {
        Qd(u, ly(t, l), r, s)
      })
    })
  },
  ly = (e, t) => {
    let r = e
    return (
      t.split(cp).forEach((s) => {
        ;(r.nextPart.has(s) || r.nextPart.set(s, { nextPart: new Map(), validators: [] }),
          (r = r.nextPart.get(s)))
      }),
      r
    )
  },
  iA = (e) => e.isThemeGetter,
  aA = (e, t) =>
    t
      ? e.map(([r, s]) => {
          const a = s.map((l) =>
            typeof l == 'string'
              ? t + l
              : typeof l == 'object'
                ? Object.fromEntries(Object.entries(l).map(([u, f]) => [t + u, f]))
                : l
          )
          return [r, a]
        })
      : e,
  lA = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} }
    let t = 0,
      r = new Map(),
      s = new Map()
    const a = (l, u) => {
      ;(r.set(l, u), t++, t > e && ((t = 0), (s = r), (r = new Map())))
    }
    return {
      get(l) {
        let u = r.get(l)
        if (u !== void 0) return u
        if ((u = s.get(l)) !== void 0) return (a(l, u), u)
      },
      set(l, u) {
        r.has(l) ? r.set(l, u) : a(l, u)
      },
    }
  },
  J0 = '!',
  cA = (e) => {
    const { separator: t, experimentalParseClassName: r } = e,
      s = t.length === 1,
      a = t[0],
      l = t.length,
      u = (f) => {
        const p = []
        let g = 0,
          x = 0,
          h
        for (let E = 0; E < f.length; E++) {
          let P = f[E]
          if (g === 0) {
            if (P === a && (s || f.slice(E, E + l) === t)) {
              ;(p.push(f.slice(x, E)), (x = E + l))
              continue
            }
            if (P === '/') {
              h = E
              continue
            }
          }
          P === '[' ? g++ : P === ']' && g--
        }
        const w = p.length === 0 ? f : f.substring(x),
          S = w.startsWith(J0),
          N = S ? w.substring(1) : w,
          C = h && h > x ? h - x : void 0
        return {
          modifiers: p,
          hasImportantModifier: S,
          baseClassName: N,
          maybePostfixModifierPosition: C,
        }
      }
    return r ? (f) => r({ className: f, parseClassName: u }) : u
  },
  uA = (e) => {
    if (e.length <= 1) return e
    const t = []
    let r = []
    return (
      e.forEach((s) => {
        s[0] === '[' ? (t.push(...r.sort(), s), (r = [])) : r.push(s)
      }),
      t.push(...r.sort()),
      t
    )
  },
  dA = (e) => ({ cache: lA(e.cacheSize), parseClassName: cA(e), ...rA(e) }),
  fA = /\s+/,
  pA = (e, t) => {
    const { parseClassName: r, getClassGroupId: s, getConflictingClassGroupIds: a } = t,
      l = [],
      u = e.trim().split(fA)
    let f = ''
    for (let p = u.length - 1; p >= 0; p -= 1) {
      const g = u[p],
        {
          modifiers: x,
          hasImportantModifier: h,
          baseClassName: w,
          maybePostfixModifierPosition: S,
        } = r(g)
      let N = !!S,
        C = s(N ? w.substring(0, S) : w)
      if (!C) {
        if (!N) {
          f = g + (f.length > 0 ? ' ' + f : f)
          continue
        }
        if (((C = s(w)), !C)) {
          f = g + (f.length > 0 ? ' ' + f : f)
          continue
        }
        N = !1
      }
      const E = uA(x).join(':'),
        P = h ? E + J0 : E,
        j = P + C
      if (l.includes(j)) continue
      l.push(j)
      const k = a(C, N)
      for (let _ = 0; _ < k.length; ++_) {
        const I = k[_]
        l.push(P + I)
      }
      f = g + (f.length > 0 ? ' ' + f : f)
    }
    return f
  }
function mA() {
  let e = 0,
    t,
    r,
    s = ''
  for (; e < arguments.length; ) (t = arguments[e++]) && (r = ew(t)) && (s && (s += ' '), (s += r))
  return s
}
const ew = (e) => {
  if (typeof e == 'string') return e
  let t,
    r = ''
  for (let s = 0; s < e.length; s++) e[s] && (t = ew(e[s])) && (r && (r += ' '), (r += t))
  return r
}
function hA(e, ...t) {
  let r,
    s,
    a,
    l = u
  function u(p) {
    const g = t.reduce((x, h) => h(x), e())
    return ((r = dA(g)), (s = r.cache.get), (a = r.cache.set), (l = f), f(p))
  }
  function f(p) {
    const g = s(p)
    if (g) return g
    const x = pA(p, r)
    return (a(p, x), x)
  }
  return function () {
    return l(mA.apply(null, arguments))
  }
}
const Ve = (e) => {
    const t = (r) => r[e] || []
    return ((t.isThemeGetter = !0), t)
  },
  tw = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  gA = /^\d+\/\d+$/,
  vA = new Set(['px', 'full', 'screen']),
  yA = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  xA =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  wA = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  bA = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  SA =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Hn = (e) => rs(e) || vA.has(e) || gA.test(e),
  Tr = (e) => gs(e, 'length', RA),
  rs = (e) => !!e && !Number.isNaN(Number(e)),
  Nd = (e) => gs(e, 'number', rs),
  li = (e) => !!e && Number.isInteger(Number(e)),
  CA = (e) => e.endsWith('%') && rs(e.slice(0, -1)),
  Ee = (e) => tw.test(e),
  jr = (e) => yA.test(e),
  EA = new Set(['length', 'size', 'percentage']),
  NA = (e) => gs(e, EA, nw),
  PA = (e) => gs(e, 'position', nw),
  TA = new Set(['image', 'url']),
  jA = (e) => gs(e, TA, MA),
  kA = (e) => gs(e, '', AA),
  ci = () => !0,
  gs = (e, t, r) => {
    const s = tw.exec(e)
    return s ? (s[1] ? (typeof t == 'string' ? s[1] === t : t.has(s[1])) : r(s[2])) : !1
  },
  RA = (e) => xA.test(e) && !wA.test(e),
  nw = () => !1,
  AA = (e) => bA.test(e),
  MA = (e) => SA.test(e),
  _A = () => {
    const e = Ve('colors'),
      t = Ve('spacing'),
      r = Ve('blur'),
      s = Ve('brightness'),
      a = Ve('borderColor'),
      l = Ve('borderRadius'),
      u = Ve('borderSpacing'),
      f = Ve('borderWidth'),
      p = Ve('contrast'),
      g = Ve('grayscale'),
      x = Ve('hueRotate'),
      h = Ve('invert'),
      w = Ve('gap'),
      S = Ve('gradientColorStops'),
      N = Ve('gradientColorStopPositions'),
      C = Ve('inset'),
      E = Ve('margin'),
      P = Ve('opacity'),
      j = Ve('padding'),
      k = Ve('saturate'),
      _ = Ve('scale'),
      I = Ve('sepia'),
      B = Ve('skew'),
      z = Ve('space'),
      W = Ve('translate'),
      oe = () => ['auto', 'contain', 'none'],
      ne = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      me = () => ['auto', Ee, t],
      te = () => [Ee, t],
      ue = () => ['', Hn, Tr],
      fe = () => ['auto', rs, Ee],
      xe = () => [
        'bottom',
        'center',
        'left',
        'left-bottom',
        'left-top',
        'right',
        'right-bottom',
        'right-top',
        'top',
      ],
      X = () => ['solid', 'dashed', 'dotted', 'double', 'none'],
      q = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      L = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
      V = () => ['', '0', Ee],
      U = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'],
      A = () => [rs, Ee]
    return {
      cacheSize: 500,
      separator: ':',
      theme: {
        colors: [ci],
        spacing: [Hn, Tr],
        blur: ['none', '', jr, Ee],
        brightness: A(),
        borderColor: [e],
        borderRadius: ['none', '', 'full', jr, Ee],
        borderSpacing: te(),
        borderWidth: ue(),
        contrast: A(),
        grayscale: V(),
        hueRotate: A(),
        invert: V(),
        gap: te(),
        gradientColorStops: [e],
        gradientColorStopPositions: [CA, Tr],
        inset: me(),
        margin: me(),
        opacity: A(),
        padding: te(),
        saturate: A(),
        scale: A(),
        sepia: V(),
        skew: A(),
        space: te(),
        translate: te(),
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', 'video', Ee] }],
        container: ['container'],
        columns: [{ columns: [jr] }],
        'break-after': [{ 'break-after': U() }],
        'break-before': [{ 'break-before': U() }],
        'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
        'object-position': [{ object: [...xe(), Ee] }],
        overflow: [{ overflow: ne() }],
        'overflow-x': [{ 'overflow-x': ne() }],
        'overflow-y': [{ 'overflow-y': ne() }],
        overscroll: [{ overscroll: oe() }],
        'overscroll-x': [{ 'overscroll-x': oe() }],
        'overscroll-y': [{ 'overscroll-y': oe() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: [C] }],
        'inset-x': [{ 'inset-x': [C] }],
        'inset-y': [{ 'inset-y': [C] }],
        start: [{ start: [C] }],
        end: [{ end: [C] }],
        top: [{ top: [C] }],
        right: [{ right: [C] }],
        bottom: [{ bottom: [C] }],
        left: [{ left: [C] }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: ['auto', li, Ee] }],
        basis: [{ basis: me() }],
        'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
        'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
        flex: [{ flex: ['1', 'auto', 'initial', 'none', Ee] }],
        grow: [{ grow: V() }],
        shrink: [{ shrink: V() }],
        order: [{ order: ['first', 'last', 'none', li, Ee] }],
        'grid-cols': [{ 'grid-cols': [ci] }],
        'col-start-end': [{ col: ['auto', { span: ['full', li, Ee] }, Ee] }],
        'col-start': [{ 'col-start': fe() }],
        'col-end': [{ 'col-end': fe() }],
        'grid-rows': [{ 'grid-rows': [ci] }],
        'row-start-end': [{ row: ['auto', { span: [li, Ee] }, Ee] }],
        'row-start': [{ 'row-start': fe() }],
        'row-end': [{ 'row-end': fe() }],
        'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
        'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', Ee] }],
        'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', Ee] }],
        gap: [{ gap: [w] }],
        'gap-x': [{ 'gap-x': [w] }],
        'gap-y': [{ 'gap-y': [w] }],
        'justify-content': [{ justify: ['normal', ...L()] }],
        'justify-items': [{ 'justify-items': ['start', 'end', 'center', 'stretch'] }],
        'justify-self': [{ 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
        'align-content': [{ content: ['normal', ...L(), 'baseline'] }],
        'align-items': [{ items: ['start', 'end', 'center', 'baseline', 'stretch'] }],
        'align-self': [{ self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] }],
        'place-content': [{ 'place-content': [...L(), 'baseline'] }],
        'place-items': [{ 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] }],
        'place-self': [{ 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
        p: [{ p: [j] }],
        px: [{ px: [j] }],
        py: [{ py: [j] }],
        ps: [{ ps: [j] }],
        pe: [{ pe: [j] }],
        pt: [{ pt: [j] }],
        pr: [{ pr: [j] }],
        pb: [{ pb: [j] }],
        pl: [{ pl: [j] }],
        m: [{ m: [E] }],
        mx: [{ mx: [E] }],
        my: [{ my: [E] }],
        ms: [{ ms: [E] }],
        me: [{ me: [E] }],
        mt: [{ mt: [E] }],
        mr: [{ mr: [E] }],
        mb: [{ mb: [E] }],
        ml: [{ ml: [E] }],
        'space-x': [{ 'space-x': [z] }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': [z] }],
        'space-y-reverse': ['space-y-reverse'],
        w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', Ee, t] }],
        'min-w': [{ 'min-w': [Ee, t, 'min', 'max', 'fit'] }],
        'max-w': [
          { 'max-w': [Ee, t, 'none', 'full', 'min', 'max', 'fit', 'prose', { screen: [jr] }, jr] },
        ],
        h: [{ h: [Ee, t, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        'min-h': [{ 'min-h': [Ee, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        'max-h': [{ 'max-h': [Ee, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        size: [{ size: [Ee, t, 'auto', 'min', 'max', 'fit'] }],
        'font-size': [{ text: ['base', jr, Tr] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [
          {
            font: [
              'thin',
              'extralight',
              'light',
              'normal',
              'medium',
              'semibold',
              'bold',
              'extrabold',
              'black',
              Nd,
            ],
          },
        ],
        'font-family': [{ font: [ci] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', Ee] }],
        'line-clamp': [{ 'line-clamp': ['none', rs, Nd] }],
        leading: [{ leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', Hn, Ee] }],
        'list-image': [{ 'list-image': ['none', Ee] }],
        'list-style-type': [{ list: ['none', 'disc', 'decimal', Ee] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'placeholder-color': [{ placeholder: [e] }],
        'placeholder-opacity': [{ 'placeholder-opacity': [P] }],
        'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
        'text-color': [{ text: [e] }],
        'text-opacity': [{ 'text-opacity': [P] }],
        'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
        'text-decoration-style': [{ decoration: [...X(), 'wavy'] }],
        'text-decoration-thickness': [{ decoration: ['auto', 'from-font', Hn, Tr] }],
        'underline-offset': [{ 'underline-offset': ['auto', Hn, Ee] }],
        'text-decoration-color': [{ decoration: [e] }],
        'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: te() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              Ee,
            ],
          },
        ],
        whitespace: [
          { whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', Ee] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-opacity': [{ 'bg-opacity': [P] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: [...xe(), PA] }],
        'bg-repeat': [{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] }],
        'bg-size': [{ bg: ['auto', 'cover', 'contain', NA] }],
        'bg-image': [
          { bg: ['none', { 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, jA] },
        ],
        'bg-color': [{ bg: [e] }],
        'gradient-from-pos': [{ from: [N] }],
        'gradient-via-pos': [{ via: [N] }],
        'gradient-to-pos': [{ to: [N] }],
        'gradient-from': [{ from: [S] }],
        'gradient-via': [{ via: [S] }],
        'gradient-to': [{ to: [S] }],
        rounded: [{ rounded: [l] }],
        'rounded-s': [{ 'rounded-s': [l] }],
        'rounded-e': [{ 'rounded-e': [l] }],
        'rounded-t': [{ 'rounded-t': [l] }],
        'rounded-r': [{ 'rounded-r': [l] }],
        'rounded-b': [{ 'rounded-b': [l] }],
        'rounded-l': [{ 'rounded-l': [l] }],
        'rounded-ss': [{ 'rounded-ss': [l] }],
        'rounded-se': [{ 'rounded-se': [l] }],
        'rounded-ee': [{ 'rounded-ee': [l] }],
        'rounded-es': [{ 'rounded-es': [l] }],
        'rounded-tl': [{ 'rounded-tl': [l] }],
        'rounded-tr': [{ 'rounded-tr': [l] }],
        'rounded-br': [{ 'rounded-br': [l] }],
        'rounded-bl': [{ 'rounded-bl': [l] }],
        'border-w': [{ border: [f] }],
        'border-w-x': [{ 'border-x': [f] }],
        'border-w-y': [{ 'border-y': [f] }],
        'border-w-s': [{ 'border-s': [f] }],
        'border-w-e': [{ 'border-e': [f] }],
        'border-w-t': [{ 'border-t': [f] }],
        'border-w-r': [{ 'border-r': [f] }],
        'border-w-b': [{ 'border-b': [f] }],
        'border-w-l': [{ 'border-l': [f] }],
        'border-opacity': [{ 'border-opacity': [P] }],
        'border-style': [{ border: [...X(), 'hidden'] }],
        'divide-x': [{ 'divide-x': [f] }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': [f] }],
        'divide-y-reverse': ['divide-y-reverse'],
        'divide-opacity': [{ 'divide-opacity': [P] }],
        'divide-style': [{ divide: X() }],
        'border-color': [{ border: [a] }],
        'border-color-x': [{ 'border-x': [a] }],
        'border-color-y': [{ 'border-y': [a] }],
        'border-color-s': [{ 'border-s': [a] }],
        'border-color-e': [{ 'border-e': [a] }],
        'border-color-t': [{ 'border-t': [a] }],
        'border-color-r': [{ 'border-r': [a] }],
        'border-color-b': [{ 'border-b': [a] }],
        'border-color-l': [{ 'border-l': [a] }],
        'divide-color': [{ divide: [a] }],
        'outline-style': [{ outline: ['', ...X()] }],
        'outline-offset': [{ 'outline-offset': [Hn, Ee] }],
        'outline-w': [{ outline: [Hn, Tr] }],
        'outline-color': [{ outline: [e] }],
        'ring-w': [{ ring: ue() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: [e] }],
        'ring-opacity': [{ 'ring-opacity': [P] }],
        'ring-offset-w': [{ 'ring-offset': [Hn, Tr] }],
        'ring-offset-color': [{ 'ring-offset': [e] }],
        shadow: [{ shadow: ['', 'inner', 'none', jr, kA] }],
        'shadow-color': [{ shadow: [ci] }],
        opacity: [{ opacity: [P] }],
        'mix-blend': [{ 'mix-blend': [...q(), 'plus-lighter', 'plus-darker'] }],
        'bg-blend': [{ 'bg-blend': q() }],
        filter: [{ filter: ['', 'none'] }],
        blur: [{ blur: [r] }],
        brightness: [{ brightness: [s] }],
        contrast: [{ contrast: [p] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', jr, Ee] }],
        grayscale: [{ grayscale: [g] }],
        'hue-rotate': [{ 'hue-rotate': [x] }],
        invert: [{ invert: [h] }],
        saturate: [{ saturate: [k] }],
        sepia: [{ sepia: [I] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
        'backdrop-blur': [{ 'backdrop-blur': [r] }],
        'backdrop-brightness': [{ 'backdrop-brightness': [s] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [p] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': [g] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [x] }],
        'backdrop-invert': [{ 'backdrop-invert': [h] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [P] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [k] }],
        'backdrop-sepia': [{ 'backdrop-sepia': [I] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': [u] }],
        'border-spacing-x': [{ 'border-spacing-x': [u] }],
        'border-spacing-y': [{ 'border-spacing-y': [u] }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          { transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', Ee] },
        ],
        duration: [{ duration: A() }],
        ease: [{ ease: ['linear', 'in', 'out', 'in-out', Ee] }],
        delay: [{ delay: A() }],
        animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', Ee] }],
        transform: [{ transform: ['', 'gpu', 'none'] }],
        scale: [{ scale: [_] }],
        'scale-x': [{ 'scale-x': [_] }],
        'scale-y': [{ 'scale-y': [_] }],
        rotate: [{ rotate: [li, Ee] }],
        'translate-x': [{ 'translate-x': [W] }],
        'translate-y': [{ 'translate-y': [W] }],
        'skew-x': [{ 'skew-x': [B] }],
        'skew-y': [{ 'skew-y': [B] }],
        'transform-origin': [
          {
            origin: [
              'center',
              'top',
              'top-right',
              'right',
              'bottom-right',
              'bottom',
              'bottom-left',
              'left',
              'top-left',
              Ee,
            ],
          },
        ],
        accent: [{ accent: ['auto', e] }],
        appearance: [{ appearance: ['none', 'auto'] }],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              Ee,
            ],
          },
        ],
        'caret-color': [{ caret: [e] }],
        'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
        resize: [{ resize: ['none', 'y', 'x', ''] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': te() }],
        'scroll-mx': [{ 'scroll-mx': te() }],
        'scroll-my': [{ 'scroll-my': te() }],
        'scroll-ms': [{ 'scroll-ms': te() }],
        'scroll-me': [{ 'scroll-me': te() }],
        'scroll-mt': [{ 'scroll-mt': te() }],
        'scroll-mr': [{ 'scroll-mr': te() }],
        'scroll-mb': [{ 'scroll-mb': te() }],
        'scroll-ml': [{ 'scroll-ml': te() }],
        'scroll-p': [{ 'scroll-p': te() }],
        'scroll-px': [{ 'scroll-px': te() }],
        'scroll-py': [{ 'scroll-py': te() }],
        'scroll-ps': [{ 'scroll-ps': te() }],
        'scroll-pe': [{ 'scroll-pe': te() }],
        'scroll-pt': [{ 'scroll-pt': te() }],
        'scroll-pr': [{ 'scroll-pr': te() }],
        'scroll-pb': [{ 'scroll-pb': te() }],
        'scroll-pl': [{ 'scroll-pl': te() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', Ee] }],
        fill: [{ fill: [e, 'none'] }],
        'stroke-w': [{ stroke: [Hn, Tr, Nd] }],
        stroke: [{ stroke: [e, 'none'] }],
        sr: ['sr-only', 'not-sr-only'],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
    }
  },
  DA = hA(_A)
function Ie(...e) {
  return DA(Q0(e))
}
const IA = eA,
  OA = tA,
  rw = v.forwardRef(({ className: e, align: t = 'center', sideOffset: r = 4, ...s }, a) =>
    d.jsx(nA, {
      children: d.jsx(X0, {
        ref: a,
        align: t,
        sideOffset: r,
        className: Ie(
          'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]',
          e
        ),
        ...s,
      }),
    })
  )
rw.displayName = X0.displayName
const rn = v.forwardRef(({ className: e, type: t, ...r }, s) =>
  d.jsx('input', {
    type: t,
    className: Ie(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      e
    ),
    ref: s,
    ...r,
  })
)
rn.displayName = 'Input'
var LA = Symbol.for('react.lazy'),
  Ol = df[' use '.trim().toString()]
function FA(e) {
  return typeof e == 'object' && e !== null && 'then' in e
}
function ow(e) {
  return (
    e != null &&
    typeof e == 'object' &&
    '$$typeof' in e &&
    e.$$typeof === LA &&
    '_payload' in e &&
    FA(e._payload)
  )
}
function sw(e) {
  const t = BA(e),
    r = v.forwardRef((s, a) => {
      let { children: l, ...u } = s
      ow(l) && typeof Ol == 'function' && (l = Ol(l._payload))
      const f = v.Children.toArray(l),
        p = f.find($A)
      if (p) {
        const g = p.props.children,
          x = f.map((h) =>
            h === p
              ? v.Children.count(g) > 1
                ? v.Children.only(null)
                : v.isValidElement(g)
                  ? g.props.children
                  : null
              : h
          )
        return d.jsx(t, {
          ...u,
          ref: a,
          children: v.isValidElement(g) ? v.cloneElement(g, void 0, x) : null,
        })
      }
      return d.jsx(t, { ...u, ref: a, children: l })
    })
  return ((r.displayName = `${e}.Slot`), r)
}
var VA = sw('Slot')
function BA(e) {
  const t = v.forwardRef((r, s) => {
    let { children: a, ...l } = r
    if ((ow(a) && typeof Ol == 'function' && (a = Ol(a._payload)), v.isValidElement(a))) {
      const u = UA(a),
        f = WA(l, a.props)
      return (a.type !== v.Fragment && (f.ref = s ? An(s, u) : u), v.cloneElement(a, f))
    }
    return v.Children.count(a) > 1 ? v.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var zA = Symbol('radix.slottable')
function $A(e) {
  return (
    v.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === zA
  )
}
function WA(e, t) {
  const r = { ...t }
  for (const s in t) {
    const a = e[s],
      l = t[s]
    ;/^on[A-Z]/.test(s)
      ? a && l
        ? (r[s] = (...f) => {
            const p = l(...f)
            return (a(...f), p)
          })
        : a && (r[s] = a)
      : s === 'style'
        ? (r[s] = { ...a, ...l })
        : s === 'className' && (r[s] = [a, l].filter(Boolean).join(' '))
  }
  return { ...e, ...r }
}
function UA(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    r = t && 'isReactWarning' in t && t.isReactWarning
  return r
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (r = t && 'isReactWarning' in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref)
}
const cy = (e) => (typeof e == 'boolean' ? `${e}` : e === 0 ? '0' : e),
  uy = Q0,
  iw = (e, t) => (r) => {
    var s
    if (t?.variants == null) return uy(e, r?.class, r?.className)
    const { variants: a, defaultVariants: l } = t,
      u = Object.keys(a).map((g) => {
        const x = r?.[g],
          h = l?.[g]
        if (x === null) return null
        const w = cy(x) || cy(h)
        return a[g][w]
      }),
      f =
        r &&
        Object.entries(r).reduce((g, x) => {
          let [h, w] = x
          return (w === void 0 || (g[h] = w), g)
        }, {}),
      p =
        t == null || (s = t.compoundVariants) === null || s === void 0
          ? void 0
          : s.reduce((g, x) => {
              let { class: h, className: w, ...S } = x
              return Object.entries(S).every((N) => {
                let [C, E] = N
                return Array.isArray(E) ? E.includes({ ...l, ...f }[C]) : { ...l, ...f }[C] === E
              })
                ? [...g, h, w]
                : g
            }, [])
    return uy(e, u, p, r?.class, r?.className)
  },
  HA = iw(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground border border-primary-border',
          destructive:
            'bg-destructive text-destructive-foreground shadow-sm border-destructive-border',
          outline: ' border [border-color:var(--button-outline)] shadow-xs active:shadow-none ',
          secondary:
            'border bg-secondary text-secondary-foreground border border-secondary-border ',
          ghost: 'border border-transparent',
          link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
          default: 'min-h-9 px-4 py-2',
          sm: 'min-h-8 rounded-md px-3 text-xs',
          lg: 'min-h-10 rounded-md px-8',
          icon: 'h-9 w-9',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    }
  ),
  Lr = v.forwardRef(({ className: e, variant: t, size: r, asChild: s = !1, ...a }, l) => {
    const u = s ? VA : 'button'
    return d.jsx(u, { className: Ie(HA({ variant: t, size: r, className: e })), ref: l, ...a })
  })
Lr.displayName = 'Button'
function GA(e) {
  if (typeof document > 'u') return
  let t = document.head || document.getElementsByTagName('head')[0],
    r = document.createElement('style')
  ;((r.type = 'text/css'),
    t.appendChild(r),
    r.styleSheet ? (r.styleSheet.cssText = e) : r.appendChild(document.createTextNode(e)))
}
const KA = (e) => {
    switch (e) {
      case 'success':
        return qA
      case 'info':
        return ZA
      case 'warning':
        return QA
      case 'error':
        return JA
      default:
        return null
    }
  },
  YA = Array(12).fill(0),
  XA = ({ visible: e, className: t }) =>
    Z.createElement(
      'div',
      { className: ['sonner-loading-wrapper', t].filter(Boolean).join(' '), 'data-visible': e },
      Z.createElement(
        'div',
        { className: 'sonner-spinner' },
        YA.map((r, s) =>
          Z.createElement('div', { className: 'sonner-loading-bar', key: `spinner-bar-${s}` })
        )
      )
    ),
  qA = Z.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 20 20',
      fill: 'currentColor',
      height: '20',
      width: '20',
    },
    Z.createElement('path', {
      fillRule: 'evenodd',
      d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
      clipRule: 'evenodd',
    })
  ),
  QA = Z.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      height: '20',
      width: '20',
    },
    Z.createElement('path', {
      fillRule: 'evenodd',
      d: 'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z',
      clipRule: 'evenodd',
    })
  ),
  ZA = Z.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 20 20',
      fill: 'currentColor',
      height: '20',
      width: '20',
    },
    Z.createElement('path', {
      fillRule: 'evenodd',
      d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z',
      clipRule: 'evenodd',
    })
  ),
  JA = Z.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 20 20',
      fill: 'currentColor',
      height: '20',
      width: '20',
    },
    Z.createElement('path', {
      fillRule: 'evenodd',
      d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z',
      clipRule: 'evenodd',
    })
  ),
  eM = Z.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '12',
      height: '12',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '1.5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    Z.createElement('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
    Z.createElement('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
  ),
  tM = () => {
    const [e, t] = Z.useState(document.hidden)
    return (
      Z.useEffect(() => {
        const r = () => {
          t(document.hidden)
        }
        return (
          document.addEventListener('visibilitychange', r),
          () => window.removeEventListener('visibilitychange', r)
        )
      }, []),
      e
    )
  }
let Zd = 1
class nM {
  constructor() {
    ;((this.subscribe = (t) => (
      this.subscribers.push(t),
      () => {
        const r = this.subscribers.indexOf(t)
        this.subscribers.splice(r, 1)
      }
    )),
      (this.publish = (t) => {
        this.subscribers.forEach((r) => r(t))
      }),
      (this.addToast = (t) => {
        ;(this.publish(t), (this.toasts = [...this.toasts, t]))
      }),
      (this.create = (t) => {
        var r
        const { message: s, ...a } = t,
          l =
            typeof t?.id == 'number' || ((r = t.id) == null ? void 0 : r.length) > 0 ? t.id : Zd++,
          u = this.toasts.find((p) => p.id === l),
          f = t.dismissible === void 0 ? !0 : t.dismissible
        return (
          this.dismissedToasts.has(l) && this.dismissedToasts.delete(l),
          u
            ? (this.toasts = this.toasts.map((p) =>
                p.id === l
                  ? (this.publish({ ...p, ...t, id: l, title: s }),
                    { ...p, ...t, id: l, dismissible: f, title: s })
                  : p
              ))
            : this.addToast({ title: s, ...a, dismissible: f, id: l }),
          l
        )
      }),
      (this.dismiss = (t) => (
        t
          ? (this.dismissedToasts.add(t),
            requestAnimationFrame(() => this.subscribers.forEach((r) => r({ id: t, dismiss: !0 }))))
          : this.toasts.forEach((r) => {
              this.subscribers.forEach((s) => s({ id: r.id, dismiss: !0 }))
            }),
        t
      )),
      (this.message = (t, r) => this.create({ ...r, message: t })),
      (this.error = (t, r) => this.create({ ...r, message: t, type: 'error' })),
      (this.success = (t, r) => this.create({ ...r, type: 'success', message: t })),
      (this.info = (t, r) => this.create({ ...r, type: 'info', message: t })),
      (this.warning = (t, r) => this.create({ ...r, type: 'warning', message: t })),
      (this.loading = (t, r) => this.create({ ...r, type: 'loading', message: t })),
      (this.promise = (t, r) => {
        if (!r) return
        let s
        r.loading !== void 0 &&
          (s = this.create({
            ...r,
            promise: t,
            type: 'loading',
            message: r.loading,
            description: typeof r.description != 'function' ? r.description : void 0,
          }))
        const a = Promise.resolve(t instanceof Function ? t() : t)
        let l = s !== void 0,
          u
        const f = a
            .then(async (g) => {
              if (((u = ['resolve', g]), Z.isValidElement(g)))
                ((l = !1), this.create({ id: s, type: 'default', message: g }))
              else if (oM(g) && !g.ok) {
                l = !1
                const h =
                    typeof r.error == 'function'
                      ? await r.error(`HTTP error! status: ${g.status}`)
                      : r.error,
                  w =
                    typeof r.description == 'function'
                      ? await r.description(`HTTP error! status: ${g.status}`)
                      : r.description,
                  N = typeof h == 'object' && !Z.isValidElement(h) ? h : { message: h }
                this.create({ id: s, type: 'error', description: w, ...N })
              } else if (g instanceof Error) {
                l = !1
                const h = typeof r.error == 'function' ? await r.error(g) : r.error,
                  w = typeof r.description == 'function' ? await r.description(g) : r.description,
                  N = typeof h == 'object' && !Z.isValidElement(h) ? h : { message: h }
                this.create({ id: s, type: 'error', description: w, ...N })
              } else if (r.success !== void 0) {
                l = !1
                const h = typeof r.success == 'function' ? await r.success(g) : r.success,
                  w = typeof r.description == 'function' ? await r.description(g) : r.description,
                  N = typeof h == 'object' && !Z.isValidElement(h) ? h : { message: h }
                this.create({ id: s, type: 'success', description: w, ...N })
              }
            })
            .catch(async (g) => {
              if (((u = ['reject', g]), r.error !== void 0)) {
                l = !1
                const x = typeof r.error == 'function' ? await r.error(g) : r.error,
                  h = typeof r.description == 'function' ? await r.description(g) : r.description,
                  S = typeof x == 'object' && !Z.isValidElement(x) ? x : { message: x }
                this.create({ id: s, type: 'error', description: h, ...S })
              }
            })
            .finally(() => {
              ;(l && (this.dismiss(s), (s = void 0)), r.finally == null || r.finally.call(r))
            }),
          p = () =>
            new Promise((g, x) => f.then(() => (u[0] === 'reject' ? x(u[1]) : g(u[1]))).catch(x))
        return typeof s != 'string' && typeof s != 'number'
          ? { unwrap: p }
          : Object.assign(s, { unwrap: p })
      }),
      (this.custom = (t, r) => {
        const s = r?.id || Zd++
        return (this.create({ jsx: t(s), id: s, ...r }), s)
      }),
      (this.getActiveToasts = () => this.toasts.filter((t) => !this.dismissedToasts.has(t.id))),
      (this.subscribers = []),
      (this.toasts = []),
      (this.dismissedToasts = new Set()))
  }
}
const Mt = new nM(),
  rM = (e, t) => {
    const r = t?.id || Zd++
    return (Mt.addToast({ title: e, ...t, id: r }), r)
  },
  oM = (e) =>
    e &&
    typeof e == 'object' &&
    'ok' in e &&
    typeof e.ok == 'boolean' &&
    'status' in e &&
    typeof e.status == 'number',
  sM = rM,
  iM = () => Mt.toasts,
  aM = () => Mt.getActiveToasts(),
  Nt = Object.assign(
    sM,
    {
      success: Mt.success,
      info: Mt.info,
      warning: Mt.warning,
      error: Mt.error,
      custom: Mt.custom,
      message: Mt.message,
      promise: Mt.promise,
      dismiss: Mt.dismiss,
      loading: Mt.loading,
    },
    { getHistory: iM, getToasts: aM }
  )
GA(
  "[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}"
)
function gl(e) {
  return e.label !== void 0
}
const lM = 3,
  cM = '24px',
  uM = '16px',
  dy = 4e3,
  dM = 356,
  fM = 14,
  pM = 45,
  mM = 200
function Cn(...e) {
  return e.filter(Boolean).join(' ')
}
function hM(e) {
  const [t, r] = e.split('-'),
    s = []
  return (t && s.push(t), r && s.push(r), s)
}
const gM = (e) => {
  var t, r, s, a, l, u, f, p, g
  const {
      invert: x,
      toast: h,
      unstyled: w,
      interacting: S,
      setHeights: N,
      visibleToasts: C,
      heights: E,
      index: P,
      toasts: j,
      expanded: k,
      removeToast: _,
      defaultRichColors: I,
      closeButton: B,
      style: z,
      cancelButtonStyle: W,
      actionButtonStyle: oe,
      className: ne = '',
      descriptionClassName: me = '',
      duration: te,
      position: ue,
      gap: fe,
      expandByDefault: xe,
      classNames: X,
      icons: q,
      closeButtonAriaLabel: L = 'Close toast',
    } = e,
    [V, U] = Z.useState(null),
    [A, $] = Z.useState(null),
    [J, re] = Z.useState(!1),
    [le, he] = Z.useState(!1),
    [Y, ee] = Z.useState(!1),
    [we, Se] = Z.useState(!1),
    [Te, Me] = Z.useState(!1),
    [Je, bt] = Z.useState(0),
    [er, Dn] = Z.useState(0),
    Dt = Z.useRef(h.duration || te || dy),
    ws = Z.useRef(null),
    It = Z.useRef(null),
    Wr = P === 0,
    tr = P + 1 <= C,
    lt = h.type,
    In = h.dismissible !== !1,
    Yi = h.className || '',
    Xi = h.descriptionClassName || '',
    Ur = Z.useMemo(() => E.findIndex((Ce) => Ce.toastId === h.id) || 0, [E, h.id]),
    bs = Z.useMemo(() => {
      var Ce
      return (Ce = h.closeButton) != null ? Ce : B
    }, [h.closeButton, B]),
    Hr = Z.useMemo(() => h.duration || te || dy, [h.duration, te]),
    Co = Z.useRef(0),
    Gt = Z.useRef(0),
    nr = Z.useRef(0),
    rr = Z.useRef(null),
    [qi, Qi] = ue.split('-'),
    Zi = Z.useMemo(() => E.reduce((Ce, Ge, et) => (et >= Ur ? Ce : Ce + Ge.height), 0), [E, Ur]),
    Eo = tM(),
    Ss = h.invert || x,
    Gr = lt === 'loading'
  ;((Gt.current = Z.useMemo(() => Ur * fe + Zi, [Ur, Zi])),
    Z.useEffect(() => {
      Dt.current = Hr
    }, [Hr]),
    Z.useEffect(() => {
      re(!0)
    }, []),
    Z.useEffect(() => {
      const Ce = It.current
      if (Ce) {
        const Ge = Ce.getBoundingClientRect().height
        return (
          Dn(Ge),
          N((et) => [{ toastId: h.id, height: Ge, position: h.position }, ...et]),
          () => N((et) => et.filter((pt) => pt.toastId !== h.id))
        )
      }
    }, [N, h.id]),
    Z.useLayoutEffect(() => {
      if (!J) return
      const Ce = It.current,
        Ge = Ce.style.height
      Ce.style.height = 'auto'
      const et = Ce.getBoundingClientRect().height
      ;((Ce.style.height = Ge),
        Dn(et),
        N((pt) =>
          pt.find((Qe) => Qe.toastId === h.id)
            ? pt.map((Qe) => (Qe.toastId === h.id ? { ...Qe, height: et } : Qe))
            : [{ toastId: h.id, height: et, position: h.position }, ...pt]
        ))
    }, [J, h.title, h.description, N, h.id, h.jsx, h.action, h.cancel]))
  const Kt = Z.useCallback(() => {
    ;(he(!0),
      bt(Gt.current),
      N((Ce) => Ce.filter((Ge) => Ge.toastId !== h.id)),
      setTimeout(() => {
        _(h)
      }, mM))
  }, [h, _, N, Gt])
  ;(Z.useEffect(() => {
    if ((h.promise && lt === 'loading') || h.duration === 1 / 0 || h.type === 'loading') return
    let Ce
    return (
      k || S || Eo
        ? (() => {
            if (nr.current < Co.current) {
              const pt = new Date().getTime() - Co.current
              Dt.current = Dt.current - pt
            }
            nr.current = new Date().getTime()
          })()
        : Dt.current !== 1 / 0 &&
          ((Co.current = new Date().getTime()),
          (Ce = setTimeout(() => {
            ;(h.onAutoClose == null || h.onAutoClose.call(h, h), Kt())
          }, Dt.current))),
      () => clearTimeout(Ce)
    )
  }, [k, S, h, lt, Eo, Kt]),
    Z.useEffect(() => {
      h.delete && (Kt(), h.onDismiss == null || h.onDismiss.call(h, h))
    }, [Kt, h.delete]))
  function Cs() {
    var Ce
    if (q?.loading) {
      var Ge
      return Z.createElement(
        'div',
        {
          className: Cn(
            X?.loader,
            h == null || (Ge = h.classNames) == null ? void 0 : Ge.loader,
            'sonner-loader'
          ),
          'data-visible': lt === 'loading',
        },
        q.loading
      )
    }
    return Z.createElement(XA, {
      className: Cn(X?.loader, h == null || (Ce = h.classNames) == null ? void 0 : Ce.loader),
      visible: lt === 'loading',
    })
  }
  const or = h.icon || q?.[lt] || KA(lt)
  var On, Es
  return Z.createElement(
    'li',
    {
      tabIndex: 0,
      ref: It,
      className: Cn(
        ne,
        Yi,
        X?.toast,
        h == null || (t = h.classNames) == null ? void 0 : t.toast,
        X?.default,
        X?.[lt],
        h == null || (r = h.classNames) == null ? void 0 : r[lt]
      ),
      'data-sonner-toast': '',
      'data-rich-colors': (On = h.richColors) != null ? On : I,
      'data-styled': !(h.jsx || h.unstyled || w),
      'data-mounted': J,
      'data-promise': !!h.promise,
      'data-swiped': Te,
      'data-removed': le,
      'data-visible': tr,
      'data-y-position': qi,
      'data-x-position': Qi,
      'data-index': P,
      'data-front': Wr,
      'data-swiping': Y,
      'data-dismissible': In,
      'data-type': lt,
      'data-invert': Ss,
      'data-swipe-out': we,
      'data-swipe-direction': A,
      'data-expanded': !!(k || (xe && J)),
      'data-testid': h.testId,
      style: {
        '--index': P,
        '--toasts-before': P,
        '--z-index': j.length - P,
        '--offset': `${le ? Je : Gt.current}px`,
        '--initial-height': xe ? 'auto' : `${er}px`,
        ...z,
        ...h.style,
      },
      onDragEnd: () => {
        ;(ee(!1), U(null), (rr.current = null))
      },
      onPointerDown: (Ce) => {
        Ce.button !== 2 &&
          (Gr ||
            !In ||
            ((ws.current = new Date()),
            bt(Gt.current),
            Ce.target.setPointerCapture(Ce.pointerId),
            Ce.target.tagName !== 'BUTTON' &&
              (ee(!0), (rr.current = { x: Ce.clientX, y: Ce.clientY }))))
      },
      onPointerUp: () => {
        var Ce, Ge, et
        if (we || !In) return
        rr.current = null
        const pt = Number(
            ((Ce = It.current) == null
              ? void 0
              : Ce.style.getPropertyValue('--swipe-amount-x').replace('px', '')) || 0
          ),
          sr = Number(
            ((Ge = It.current) == null
              ? void 0
              : Ge.style.getPropertyValue('--swipe-amount-y').replace('px', '')) || 0
          ),
          Qe = new Date().getTime() - ((et = ws.current) == null ? void 0 : et.getTime()),
          rt = V === 'x' ? pt : sr,
          ir = Math.abs(rt) / Qe
        if (Math.abs(rt) >= pM || ir > 0.11) {
          ;(bt(Gt.current),
            h.onDismiss == null || h.onDismiss.call(h, h),
            $(V === 'x' ? (pt > 0 ? 'right' : 'left') : sr > 0 ? 'down' : 'up'),
            Kt(),
            Se(!0))
          return
        } else {
          var ct, Ot
          ;((ct = It.current) == null || ct.style.setProperty('--swipe-amount-x', '0px'),
            (Ot = It.current) == null || Ot.style.setProperty('--swipe-amount-y', '0px'))
        }
        ;(Me(!1), ee(!1), U(null))
      },
      onPointerMove: (Ce) => {
        var Ge, et, pt
        if (
          !rr.current ||
          !In ||
          ((Ge = window.getSelection()) == null ? void 0 : Ge.toString().length) > 0
        )
          return
        const Qe = Ce.clientY - rr.current.y,
          rt = Ce.clientX - rr.current.x
        var ir
        const ct = (ir = e.swipeDirections) != null ? ir : hM(ue)
        !V && (Math.abs(rt) > 1 || Math.abs(Qe) > 1) && U(Math.abs(rt) > Math.abs(Qe) ? 'x' : 'y')
        let Ot = { x: 0, y: 0 }
        const ar = (Yt) => 1 / (1.5 + Math.abs(Yt) / 20)
        if (V === 'y') {
          if (ct.includes('top') || ct.includes('bottom'))
            if ((ct.includes('top') && Qe < 0) || (ct.includes('bottom') && Qe > 0)) Ot.y = Qe
            else {
              const Yt = Qe * ar(Qe)
              Ot.y = Math.abs(Yt) < Math.abs(Qe) ? Yt : Qe
            }
        } else if (V === 'x' && (ct.includes('left') || ct.includes('right')))
          if ((ct.includes('left') && rt < 0) || (ct.includes('right') && rt > 0)) Ot.x = rt
          else {
            const Yt = rt * ar(rt)
            Ot.x = Math.abs(Yt) < Math.abs(rt) ? Yt : rt
          }
        ;((Math.abs(Ot.x) > 0 || Math.abs(Ot.y) > 0) && Me(!0),
          (et = It.current) == null || et.style.setProperty('--swipe-amount-x', `${Ot.x}px`),
          (pt = It.current) == null || pt.style.setProperty('--swipe-amount-y', `${Ot.y}px`))
      },
    },
    bs && !h.jsx && lt !== 'loading'
      ? Z.createElement(
          'button',
          {
            'aria-label': L,
            'data-disabled': Gr,
            'data-close-button': !0,
            onClick:
              Gr || !In
                ? () => {}
                : () => {
                    ;(Kt(), h.onDismiss == null || h.onDismiss.call(h, h))
                  },
            className: Cn(
              X?.closeButton,
              h == null || (s = h.classNames) == null ? void 0 : s.closeButton
            ),
          },
          (Es = q?.close) != null ? Es : eM
        )
      : null,
    (lt || h.icon || h.promise) && h.icon !== null && (q?.[lt] !== null || h.icon)
      ? Z.createElement(
          'div',
          {
            'data-icon': '',
            className: Cn(X?.icon, h == null || (a = h.classNames) == null ? void 0 : a.icon),
          },
          h.promise || (h.type === 'loading' && !h.icon) ? h.icon || Cs() : null,
          h.type !== 'loading' ? or : null
        )
      : null,
    Z.createElement(
      'div',
      {
        'data-content': '',
        className: Cn(X?.content, h == null || (l = h.classNames) == null ? void 0 : l.content),
      },
      Z.createElement(
        'div',
        {
          'data-title': '',
          className: Cn(X?.title, h == null || (u = h.classNames) == null ? void 0 : u.title),
        },
        h.jsx ? h.jsx : typeof h.title == 'function' ? h.title() : h.title
      ),
      h.description
        ? Z.createElement(
            'div',
            {
              'data-description': '',
              className: Cn(
                me,
                Xi,
                X?.description,
                h == null || (f = h.classNames) == null ? void 0 : f.description
              ),
            },
            typeof h.description == 'function' ? h.description() : h.description
          )
        : null
    ),
    Z.isValidElement(h.cancel)
      ? h.cancel
      : h.cancel && gl(h.cancel)
        ? Z.createElement(
            'button',
            {
              'data-button': !0,
              'data-cancel': !0,
              style: h.cancelButtonStyle || W,
              onClick: (Ce) => {
                gl(h.cancel) &&
                  In &&
                  (h.cancel.onClick == null || h.cancel.onClick.call(h.cancel, Ce), Kt())
              },
              className: Cn(
                X?.cancelButton,
                h == null || (p = h.classNames) == null ? void 0 : p.cancelButton
              ),
            },
            h.cancel.label
          )
        : null,
    Z.isValidElement(h.action)
      ? h.action
      : h.action && gl(h.action)
        ? Z.createElement(
            'button',
            {
              'data-button': !0,
              'data-action': !0,
              style: h.actionButtonStyle || oe,
              onClick: (Ce) => {
                gl(h.action) &&
                  (h.action.onClick == null || h.action.onClick.call(h.action, Ce),
                  !Ce.defaultPrevented && Kt())
              },
              className: Cn(
                X?.actionButton,
                h == null || (g = h.classNames) == null ? void 0 : g.actionButton
              ),
            },
            h.action.label
          )
        : null
  )
}
function fy() {
  if (typeof window > 'u' || typeof document > 'u') return 'ltr'
  const e = document.documentElement.getAttribute('dir')
  return e === 'auto' || !e ? window.getComputedStyle(document.documentElement).direction : e
}
function vM(e, t) {
  const r = {}
  return (
    [e, t].forEach((s, a) => {
      const l = a === 1,
        u = l ? '--mobile-offset' : '--offset',
        f = l ? uM : cM
      function p(g) {
        ;['top', 'right', 'bottom', 'left'].forEach((x) => {
          r[`${u}-${x}`] = typeof g == 'number' ? `${g}px` : g
        })
      }
      typeof s == 'number' || typeof s == 'string'
        ? p(s)
        : typeof s == 'object'
          ? ['top', 'right', 'bottom', 'left'].forEach((g) => {
              s[g] === void 0
                ? (r[`${u}-${g}`] = f)
                : (r[`${u}-${g}`] = typeof s[g] == 'number' ? `${s[g]}px` : s[g])
            })
          : p(f)
    }),
    r
  )
}
const yM = Z.forwardRef(function (t, r) {
  const {
      id: s,
      invert: a,
      position: l = 'bottom-right',
      hotkey: u = ['altKey', 'KeyT'],
      expand: f,
      closeButton: p,
      className: g,
      offset: x,
      mobileOffset: h,
      theme: w = 'light',
      richColors: S,
      duration: N,
      style: C,
      visibleToasts: E = lM,
      toastOptions: P,
      dir: j = fy(),
      gap: k = fM,
      icons: _,
      containerAriaLabel: I = 'Notifications',
    } = t,
    [B, z] = Z.useState([]),
    W = Z.useMemo(
      () => (s ? B.filter((J) => J.toasterId === s) : B.filter((J) => !J.toasterId)),
      [B, s]
    ),
    oe = Z.useMemo(
      () => Array.from(new Set([l].concat(W.filter((J) => J.position).map((J) => J.position)))),
      [W, l]
    ),
    [ne, me] = Z.useState([]),
    [te, ue] = Z.useState(!1),
    [fe, xe] = Z.useState(!1),
    [X, q] = Z.useState(
      w !== 'system'
        ? w
        : typeof window < 'u' &&
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    ),
    L = Z.useRef(null),
    V = u.join('+').replace(/Key/g, '').replace(/Digit/g, ''),
    U = Z.useRef(null),
    A = Z.useRef(!1),
    $ = Z.useCallback((J) => {
      z((re) => {
        var le
        return (
          ((le = re.find((he) => he.id === J.id)) != null && le.delete) || Mt.dismiss(J.id),
          re.filter(({ id: he }) => he !== J.id)
        )
      })
    }, [])
  return (
    Z.useEffect(
      () =>
        Mt.subscribe((J) => {
          if (J.dismiss) {
            requestAnimationFrame(() => {
              z((re) => re.map((le) => (le.id === J.id ? { ...le, delete: !0 } : le)))
            })
            return
          }
          setTimeout(() => {
            o0.flushSync(() => {
              z((re) => {
                const le = re.findIndex((he) => he.id === J.id)
                return le !== -1
                  ? [...re.slice(0, le), { ...re[le], ...J }, ...re.slice(le + 1)]
                  : [J, ...re]
              })
            })
          })
        }),
      [B]
    ),
    Z.useEffect(() => {
      if (w !== 'system') {
        q(w)
        return
      }
      if (
        (w === 'system' &&
          (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? q('dark')
            : q('light')),
        typeof window > 'u')
      )
        return
      const J = window.matchMedia('(prefers-color-scheme: dark)')
      try {
        J.addEventListener('change', ({ matches: re }) => {
          q(re ? 'dark' : 'light')
        })
      } catch {
        J.addListener(({ matches: le }) => {
          try {
            q(le ? 'dark' : 'light')
          } catch (he) {
            console.error(he)
          }
        })
      }
    }, [w]),
    Z.useEffect(() => {
      B.length <= 1 && ue(!1)
    }, [B]),
    Z.useEffect(() => {
      const J = (re) => {
        var le
        if (u.every((ee) => re[ee] || re.code === ee)) {
          var Y
          ;(ue(!0), (Y = L.current) == null || Y.focus())
        }
        re.code === 'Escape' &&
          (document.activeElement === L.current ||
            ((le = L.current) != null && le.contains(document.activeElement))) &&
          ue(!1)
      }
      return (
        document.addEventListener('keydown', J),
        () => document.removeEventListener('keydown', J)
      )
    }, [u]),
    Z.useEffect(() => {
      if (L.current)
        return () => {
          U.current &&
            (U.current.focus({ preventScroll: !0 }), (U.current = null), (A.current = !1))
        }
    }, [L.current]),
    Z.createElement(
      'section',
      {
        ref: r,
        'aria-label': `${I} ${V}`,
        tabIndex: -1,
        'aria-live': 'polite',
        'aria-relevant': 'additions text',
        'aria-atomic': 'false',
        suppressHydrationWarning: !0,
      },
      oe.map((J, re) => {
        var le
        const [he, Y] = J.split('-')
        return W.length
          ? Z.createElement(
              'ol',
              {
                key: J,
                dir: j === 'auto' ? fy() : j,
                tabIndex: -1,
                ref: L,
                className: g,
                'data-sonner-toaster': !0,
                'data-sonner-theme': X,
                'data-y-position': he,
                'data-x-position': Y,
                style: {
                  '--front-toast-height': `${((le = ne[0]) == null ? void 0 : le.height) || 0}px`,
                  '--width': `${dM}px`,
                  '--gap': `${k}px`,
                  ...C,
                  ...vM(x, h),
                },
                onBlur: (ee) => {
                  A.current &&
                    !ee.currentTarget.contains(ee.relatedTarget) &&
                    ((A.current = !1),
                    U.current && (U.current.focus({ preventScroll: !0 }), (U.current = null)))
                },
                onFocus: (ee) => {
                  ;(ee.target instanceof HTMLElement &&
                    ee.target.dataset.dismissible === 'false') ||
                    A.current ||
                    ((A.current = !0), (U.current = ee.relatedTarget))
                },
                onMouseEnter: () => ue(!0),
                onMouseMove: () => ue(!0),
                onMouseLeave: () => {
                  fe || ue(!1)
                },
                onDragEnd: () => ue(!1),
                onPointerDown: (ee) => {
                  ;(ee.target instanceof HTMLElement &&
                    ee.target.dataset.dismissible === 'false') ||
                    xe(!0)
                },
                onPointerUp: () => xe(!1),
              },
              W.filter((ee) => (!ee.position && re === 0) || ee.position === J).map((ee, we) => {
                var Se, Te
                return Z.createElement(gM, {
                  key: ee.id,
                  icons: _,
                  index: we,
                  toast: ee,
                  defaultRichColors: S,
                  duration: (Se = P?.duration) != null ? Se : N,
                  className: P?.className,
                  descriptionClassName: P?.descriptionClassName,
                  invert: a,
                  visibleToasts: E,
                  closeButton: (Te = P?.closeButton) != null ? Te : p,
                  interacting: fe,
                  position: J,
                  style: P?.style,
                  unstyled: P?.unstyled,
                  classNames: P?.classNames,
                  cancelButtonStyle: P?.cancelButtonStyle,
                  actionButtonStyle: P?.actionButtonStyle,
                  closeButtonAriaLabel: P?.closeButtonAriaLabel,
                  removeToast: $,
                  toasts: W.filter((Me) => Me.position == ee.position),
                  heights: ne.filter((Me) => Me.position == ee.position),
                  setHeights: me,
                  expandByDefault: f,
                  gap: k,
                  expanded: te,
                  swipeDirections: t.swipeDirections,
                })
              })
            )
          : null
      })
    )
  )
})
function py({ trigger: e }) {
  const [t, r] = v.useState(!1),
    [s, a] = v.useState(''),
    [l, u] = v.useState(!1),
    f = async (p) => {
      if ((p.preventDefault(), !!s)) {
        u(!0)
        try {
          const g = await fetch('/api/forms/notification-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: s }),
          })
          if (!g.ok) {
            const x = await g.json().catch(() => ({}))
            Nt.error(x.error ?? 'Something went wrong. Please try again.')
            return
          }
          ;(Nt.success("You're subscribed to Crown Labs updates."), r(!1), a(''))
        } catch {
          Nt.error('Network error. Please try again.')
        } finally {
          u(!1)
        }
      }
    }
  return d.jsxs(IA, {
    open: t,
    onOpenChange: r,
    children: [
      d.jsx(OA, { asChild: !0, children: e }),
      d.jsxs(rw, {
        className: 'w-80 p-4 border-border bg-card',
        align: 'end',
        children: [
          d.jsxs('div', {
            className: 'flex gap-3 items-start mb-3',
            children: [
              d.jsx('div', {
                className: 'mt-1 bg-primary/20 p-1.5 rounded-full text-primary shrink-0',
                children: d.jsx(jd, { className: 'h-4 w-4' }),
              }),
              d.jsxs('div', {
                children: [
                  d.jsx('h4', {
                    className: 'font-semibold text-foreground text-sm',
                    children: 'Stay updated',
                  }),
                  d.jsx('p', {
                    className: 'text-xs text-muted-foreground mt-1',
                    children:
                      'Get notified when products launch, beta opens, or portfolio updates.',
                  }),
                ],
              }),
            ],
          }),
          d.jsxs('form', {
            onSubmit: f,
            className: 'flex gap-2',
            children: [
              d.jsx(rn, {
                type: 'email',
                placeholder: 'Email address',
                className: 'h-8 text-xs border-border bg-background',
                value: s,
                onChange: (p) => a(p.target.value),
                required: !0,
                disabled: l,
              }),
              d.jsx(Lr, {
                type: 'submit',
                size: 'sm',
                disabled: l,
                className:
                  'h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 px-3 shrink-0',
                children: l ? d.jsx(ki, { className: 'h-3.5 w-3.5 animate-spin' }) : 'Subscribe',
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
function xM(e) {
  const t = wM(e),
    r = v.forwardRef((s, a) => {
      const { children: l, ...u } = s,
        f = v.Children.toArray(l),
        p = f.find(SM)
      if (p) {
        const g = p.props.children,
          x = f.map((h) =>
            h === p
              ? v.Children.count(g) > 1
                ? v.Children.only(null)
                : v.isValidElement(g)
                  ? g.props.children
                  : null
              : h
          )
        return d.jsx(t, {
          ...u,
          ref: a,
          children: v.isValidElement(g) ? v.cloneElement(g, void 0, x) : null,
        })
      }
      return d.jsx(t, { ...u, ref: a, children: l })
    })
  return ((r.displayName = `${e}.Slot`), r)
}
function wM(e) {
  const t = v.forwardRef((r, s) => {
    const { children: a, ...l } = r
    if (v.isValidElement(a)) {
      const u = EM(a),
        f = CM(l, a.props)
      return (a.type !== v.Fragment && (f.ref = s ? An(s, u) : u), v.cloneElement(a, f))
    }
    return v.Children.count(a) > 1 ? v.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var bM = Symbol('radix.slottable')
function SM(e) {
  return (
    v.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === bM
  )
}
function CM(e, t) {
  const r = { ...t }
  for (const s in t) {
    const a = e[s],
      l = t[s]
    ;/^on[A-Z]/.test(s)
      ? a && l
        ? (r[s] = (...f) => {
            const p = l(...f)
            return (a(...f), p)
          })
        : a && (r[s] = a)
      : s === 'style'
        ? (r[s] = { ...a, ...l })
        : s === 'className' && (r[s] = [a, l].filter(Boolean).join(' '))
  }
  return { ...e, ...r }
}
function EM(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    r = t && 'isReactWarning' in t && t.isReactWarning
  return r
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (r = t && 'isReactWarning' in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref)
}
var oc = 'Dialog',
  [aw] = Mn(oc),
  [NM, vn] = aw(oc),
  lw = (e) => {
    const {
        __scopeDialog: t,
        children: r,
        open: s,
        defaultOpen: a,
        onOpenChange: l,
        modal: u = !0,
      } = e,
      f = v.useRef(null),
      p = v.useRef(null),
      [g, x] = go({ prop: s, defaultProp: a ?? !1, onChange: l, caller: oc })
    return d.jsx(NM, {
      scope: t,
      triggerRef: f,
      contentRef: p,
      contentId: Xn(),
      titleId: Xn(),
      descriptionId: Xn(),
      open: g,
      onOpenChange: x,
      onOpenToggle: v.useCallback(() => x((h) => !h), [x]),
      modal: u,
      children: r,
    })
  }
lw.displayName = oc
var cw = 'DialogTrigger',
  uw = v.forwardRef((e, t) => {
    const { __scopeDialog: r, ...s } = e,
      a = vn(cw, r),
      l = ke(t, a.triggerRef)
    return d.jsx(Ne.button, {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': a.open,
      'aria-controls': a.contentId,
      'data-state': fp(a.open),
      ...s,
      ref: l,
      onClick: ie(e.onClick, a.onOpenToggle),
    })
  })
uw.displayName = cw
var up = 'DialogPortal',
  [PM, dw] = aw(up, { forceMount: void 0 }),
  fw = (e) => {
    const { __scopeDialog: t, forceMount: r, children: s, container: a } = e,
      l = vn(up, t)
    return d.jsx(PM, {
      scope: t,
      forceMount: r,
      children: v.Children.map(s, (u) =>
        d.jsx(Ht, {
          present: r || l.open,
          children: d.jsx(hs, { asChild: !0, container: a, children: u }),
        })
      ),
    })
  }
fw.displayName = up
var Ll = 'DialogOverlay',
  pw = v.forwardRef((e, t) => {
    const r = dw(Ll, e.__scopeDialog),
      { forceMount: s = r.forceMount, ...a } = e,
      l = vn(Ll, e.__scopeDialog)
    return l.modal
      ? d.jsx(Ht, { present: s || l.open, children: d.jsx(jM, { ...a, ref: t }) })
      : null
  })
pw.displayName = Ll
var TM = xM('DialogOverlay.RemoveScroll'),
  jM = v.forwardRef((e, t) => {
    const { __scopeDialog: r, ...s } = e,
      a = vn(Ll, r)
    return d.jsx(Fi, {
      as: TM,
      allowPinchZoom: !0,
      shards: [a.contentRef],
      children: d.jsx(Ne.div, {
        'data-state': fp(a.open),
        ...s,
        ref: t,
        style: { pointerEvents: 'auto', ...s.style },
      }),
    })
  }),
  vo = 'DialogContent',
  mw = v.forwardRef((e, t) => {
    const r = dw(vo, e.__scopeDialog),
      { forceMount: s = r.forceMount, ...a } = e,
      l = vn(vo, e.__scopeDialog)
    return d.jsx(Ht, {
      present: s || l.open,
      children: l.modal ? d.jsx(kM, { ...a, ref: t }) : d.jsx(RM, { ...a, ref: t }),
    })
  })
mw.displayName = vo
var kM = v.forwardRef((e, t) => {
    const r = vn(vo, e.__scopeDialog),
      s = v.useRef(null),
      a = ke(t, r.contentRef, s)
    return (
      v.useEffect(() => {
        const l = s.current
        if (l) return tc(l)
      }, []),
      d.jsx(hw, {
        ...e,
        ref: a,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ie(e.onCloseAutoFocus, (l) => {
          ;(l.preventDefault(), r.triggerRef.current?.focus())
        }),
        onPointerDownOutside: ie(e.onPointerDownOutside, (l) => {
          const u = l.detail.originalEvent,
            f = u.button === 0 && u.ctrlKey === !0
          ;(u.button === 2 || f) && l.preventDefault()
        }),
        onFocusOutside: ie(e.onFocusOutside, (l) => l.preventDefault()),
      })
    )
  }),
  RM = v.forwardRef((e, t) => {
    const r = vn(vo, e.__scopeDialog),
      s = v.useRef(!1),
      a = v.useRef(!1)
    return d.jsx(hw, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (l) => {
        ;(e.onCloseAutoFocus?.(l),
          l.defaultPrevented || (s.current || r.triggerRef.current?.focus(), l.preventDefault()),
          (s.current = !1),
          (a.current = !1))
      },
      onInteractOutside: (l) => {
        ;(e.onInteractOutside?.(l),
          l.defaultPrevented ||
            ((s.current = !0), l.detail.originalEvent.type === 'pointerdown' && (a.current = !0)))
        const u = l.target
        ;(r.triggerRef.current?.contains(u) && l.preventDefault(),
          l.detail.originalEvent.type === 'focusin' && a.current && l.preventDefault())
      },
    })
  }),
  hw = v.forwardRef((e, t) => {
    const { __scopeDialog: r, trapFocus: s, onOpenAutoFocus: a, onCloseAutoFocus: l, ...u } = e,
      f = vn(vo, r),
      p = v.useRef(null),
      g = ke(t, p)
    return (
      Yl(),
      d.jsxs(d.Fragment, {
        children: [
          d.jsx(Ii, {
            asChild: !0,
            loop: !0,
            trapped: s,
            onMountAutoFocus: a,
            onUnmountAutoFocus: l,
            children: d.jsx(fs, {
              role: 'dialog',
              id: f.contentId,
              'aria-describedby': f.descriptionId,
              'aria-labelledby': f.titleId,
              'data-state': fp(f.open),
              ...u,
              ref: g,
              onDismiss: () => f.onOpenChange(!1),
            }),
          }),
          d.jsxs(d.Fragment, {
            children: [
              d.jsx(AM, { titleId: f.titleId }),
              d.jsx(_M, { contentRef: p, descriptionId: f.descriptionId }),
            ],
          }),
        ],
      })
    )
  }),
  dp = 'DialogTitle',
  gw = v.forwardRef((e, t) => {
    const { __scopeDialog: r, ...s } = e,
      a = vn(dp, r)
    return d.jsx(Ne.h2, { id: a.titleId, ...s, ref: t })
  })
gw.displayName = dp
var vw = 'DialogDescription',
  yw = v.forwardRef((e, t) => {
    const { __scopeDialog: r, ...s } = e,
      a = vn(vw, r)
    return d.jsx(Ne.p, { id: a.descriptionId, ...s, ref: t })
  })
yw.displayName = vw
var xw = 'DialogClose',
  ww = v.forwardRef((e, t) => {
    const { __scopeDialog: r, ...s } = e,
      a = vn(xw, r)
    return d.jsx(Ne.button, {
      type: 'button',
      ...s,
      ref: t,
      onClick: ie(e.onClick, () => a.onOpenChange(!1)),
    })
  })
ww.displayName = xw
function fp(e) {
  return e ? 'open' : 'closed'
}
var bw = 'DialogTitleWarning',
  [bO, Sw] = lk(bw, { contentName: vo, titleName: dp, docsSlug: 'dialog' }),
  AM = ({ titleId: e }) => {
    const t = Sw(bw),
      r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`
    return (
      v.useEffect(() => {
        e && (document.getElementById(e) || console.error(r))
      }, [r, e]),
      null
    )
  },
  MM = 'DialogDescriptionWarning',
  _M = ({ contentRef: e, descriptionId: t }) => {
    const s = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Sw(MM).contentName}}.`
    return (
      v.useEffect(() => {
        const a = e.current?.getAttribute('aria-describedby')
        t && a && (document.getElementById(t) || console.warn(s))
      }, [s, e, t]),
      null
    )
  },
  DM = lw,
  IM = uw,
  OM = fw,
  Cw = pw,
  Ew = mw,
  Nw = gw,
  Pw = yw,
  LM = ww
const Bi = DM,
  zi = IM,
  FM = OM,
  Tw = v.forwardRef(({ className: e, ...t }, r) =>
    d.jsx(Cw, {
      ref: r,
      className: Ie(
        'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        e
      ),
      ...t,
    })
  )
Tw.displayName = Cw.displayName
const vs = v.forwardRef(({ className: e, children: t, ...r }, s) =>
  d.jsxs(FM, {
    children: [
      d.jsx(Tw, {}),
      d.jsxs(Ew, {
        ref: s,
        className: Ie(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          e
        ),
        ...r,
        children: [
          t,
          d.jsxs(LM, {
            className:
              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            children: [
              d.jsx(Ey, { className: 'h-4 w-4' }),
              d.jsx('span', { className: 'sr-only', children: 'Close' }),
            ],
          }),
        ],
      }),
    ],
  })
)
vs.displayName = Ew.displayName
const $i = ({ className: e, ...t }) =>
  d.jsx('div', { className: Ie('flex flex-col space-y-1.5 text-center sm:text-left', e), ...t })
$i.displayName = 'DialogHeader'
const ys = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx(Nw, { ref: r, className: Ie('text-lg font-semibold leading-none tracking-tight', e), ...t })
)
ys.displayName = Nw.displayName
const Wi = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx(Pw, { ref: r, className: Ie('text-sm text-muted-foreground', e), ...t })
)
Wi.displayName = Pw.displayName
var VM = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  BM = VM.reduce((e, t) => {
    const r = sw(`Primitive.${t}`),
      s = v.forwardRef((a, l) => {
        const { asChild: u, ...f } = a,
          p = u ? r : t
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          d.jsx(p, { ...f, ref: l })
        )
      })
    return ((s.displayName = `Primitive.${t}`), { ...e, [t]: s })
  }, {}),
  zM = 'Label',
  jw = v.forwardRef((e, t) =>
    d.jsx(BM.label, {
      ...e,
      ref: t,
      onMouseDown: (r) => {
        r.target.closest('button, input, select, textarea') ||
          (e.onMouseDown?.(r), !r.defaultPrevented && r.detail > 1 && r.preventDefault())
      },
    })
  )
jw.displayName = zM
var kw = jw
const $M = iw(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  ),
  qe = v.forwardRef(({ className: e, ...t }, r) =>
    d.jsx(kw, { ref: r, className: Ie($M(), e), ...t })
  )
qe.displayName = kw.displayName
const Ui = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx('textarea', {
    className: Ie(
      'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      e
    ),
    ref: r,
    ...t,
  })
)
Ui.displayName = 'Textarea'
function Rw(e) {
  const t = v.useRef({ value: e, previous: e })
  return v.useMemo(
    () => (
      t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)),
      t.current.previous
    ),
    [e]
  )
}
var sc = 'Checkbox',
  [WM] = Mn(sc),
  [UM, pp] = WM(sc)
function HM(e) {
  const {
      __scopeCheckbox: t,
      checked: r,
      children: s,
      defaultChecked: a,
      disabled: l,
      form: u,
      name: f,
      onCheckedChange: p,
      required: g,
      value: x = 'on',
      internal_do_not_use_render: h,
    } = e,
    [w, S] = go({ prop: r, defaultProp: a ?? !1, onChange: p, caller: sc }),
    [N, C] = v.useState(null),
    [E, P] = v.useState(null),
    j = v.useRef(!1),
    k = N ? !!u || !!N.closest('form') : !0,
    _ = {
      checked: w,
      disabled: l,
      setChecked: S,
      control: N,
      setControl: C,
      name: f,
      form: u,
      value: x,
      hasConsumerStoppedPropagationRef: j,
      required: g,
      defaultChecked: _r(a) ? !1 : a,
      isFormControl: k,
      bubbleInput: E,
      setBubbleInput: P,
    }
  return d.jsx(UM, { scope: t, ..._, children: GM(h) ? h(_) : s })
}
var Aw = 'CheckboxTrigger',
  Mw = v.forwardRef(({ __scopeCheckbox: e, onKeyDown: t, onClick: r, ...s }, a) => {
    const {
        control: l,
        value: u,
        disabled: f,
        checked: p,
        required: g,
        setControl: x,
        setChecked: h,
        hasConsumerStoppedPropagationRef: w,
        isFormControl: S,
        bubbleInput: N,
      } = pp(Aw, e),
      C = ke(a, x),
      E = v.useRef(p)
    return (
      v.useEffect(() => {
        const P = l?.form
        if (P) {
          const j = () => h(E.current)
          return (P.addEventListener('reset', j), () => P.removeEventListener('reset', j))
        }
      }, [l, h]),
      d.jsx(Ne.button, {
        type: 'button',
        role: 'checkbox',
        'aria-checked': _r(p) ? 'mixed' : p,
        'aria-required': g,
        'data-state': Lw(p),
        'data-disabled': f ? '' : void 0,
        disabled: f,
        value: u,
        ...s,
        ref: C,
        onKeyDown: ie(t, (P) => {
          P.key === 'Enter' && P.preventDefault()
        }),
        onClick: ie(r, (P) => {
          ;(h((j) => (_r(j) ? !0 : !j)),
            N && S && ((w.current = P.isPropagationStopped()), w.current || P.stopPropagation()))
        }),
      })
    )
  })
Mw.displayName = Aw
var mp = v.forwardRef((e, t) => {
  const {
    __scopeCheckbox: r,
    name: s,
    checked: a,
    defaultChecked: l,
    required: u,
    disabled: f,
    value: p,
    onCheckedChange: g,
    form: x,
    ...h
  } = e
  return d.jsx(HM, {
    __scopeCheckbox: r,
    checked: a,
    defaultChecked: l,
    disabled: f,
    required: u,
    onCheckedChange: g,
    name: s,
    form: x,
    value: p,
    internal_do_not_use_render: ({ isFormControl: w }) =>
      d.jsxs(d.Fragment, {
        children: [
          d.jsx(Mw, { ...h, ref: t, __scopeCheckbox: r }),
          w && d.jsx(Ow, { __scopeCheckbox: r }),
        ],
      }),
  })
})
mp.displayName = sc
var _w = 'CheckboxIndicator',
  Dw = v.forwardRef((e, t) => {
    const { __scopeCheckbox: r, forceMount: s, ...a } = e,
      l = pp(_w, r)
    return d.jsx(Ht, {
      present: s || _r(l.checked) || l.checked === !0,
      children: d.jsx(Ne.span, {
        'data-state': Lw(l.checked),
        'data-disabled': l.disabled ? '' : void 0,
        ...a,
        ref: t,
        style: { pointerEvents: 'none', ...e.style },
      }),
    })
  })
Dw.displayName = _w
var Iw = 'CheckboxBubbleInput',
  Ow = v.forwardRef(({ __scopeCheckbox: e, ...t }, r) => {
    const {
        control: s,
        hasConsumerStoppedPropagationRef: a,
        checked: l,
        defaultChecked: u,
        required: f,
        disabled: p,
        name: g,
        value: x,
        form: h,
        bubbleInput: w,
        setBubbleInput: S,
      } = pp(Iw, e),
      N = ke(r, S),
      C = Rw(l),
      E = b0(s)
    v.useEffect(() => {
      const j = w
      if (!j) return
      const k = window.HTMLInputElement.prototype,
        I = Object.getOwnPropertyDescriptor(k, 'checked').set,
        B = !a.current
      if (C !== l && I) {
        const z = new Event('click', { bubbles: B })
        ;((j.indeterminate = _r(l)), I.call(j, _r(l) ? !1 : l), j.dispatchEvent(z))
      }
    }, [w, C, l, a])
    const P = v.useRef(_r(l) ? !1 : l)
    return d.jsx(Ne.input, {
      type: 'checkbox',
      'aria-hidden': !0,
      defaultChecked: u ?? P.current,
      required: f,
      disabled: p,
      name: g,
      value: x,
      form: h,
      ...t,
      tabIndex: -1,
      ref: N,
      style: {
        ...t.style,
        ...E,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
        transform: 'translateX(-100%)',
      },
    })
  })
Ow.displayName = Iw
function GM(e) {
  return typeof e == 'function'
}
function _r(e) {
  return e === 'indeterminate'
}
function Lw(e) {
  return _r(e) ? 'indeterminate' : e ? 'checked' : 'unchecked'
}
const ic = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx(mp, {
    ref: r,
    className: Ie(
      'grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      e
    ),
    ...t,
    children: d.jsx(Dw, {
      className: Ie('grid place-content-center text-current'),
      children: d.jsx(ff, { className: 'h-4 w-4' }),
    }),
  })
)
ic.displayName = mp.displayName
function Jd({ trigger: e }) {
  const [t, r] = v.useState(!1),
    [s, a] = v.useState({}),
    [l, u] = v.useState(!1),
    [f, p] = v.useState([]),
    g = [
      'CrownCode Intelligence Suite',
      'CrownCam',
      'Crown SOS',
      'Pic Detective',
      'AI Cherry Pie',
      'CrownCast',
      'Crown WatchTower',
      'LumiLogix',
      'Presence Architect',
      'Crown Forensics Lab',
      'Crown Relations AI',
    ],
    x = (w) => {
      p((S) => (S.includes(w) ? S.filter((N) => N !== w) : [...S, w]))
    },
    h = async (w) => {
      w.preventDefault()
      const S = new FormData(w.currentTarget),
        N = S.get('name')?.trim(),
        C = S.get('email')?.trim(),
        E = S.get('expertise')?.trim(),
        P = {}
      if (
        (N || (P.name = 'Name is required'),
        C || (P.email = 'Email is required'),
        Object.keys(P).length > 0)
      ) {
        a(P)
        return
      }
      u(!0)
      try {
        const j = await fetch('/api/forms/beta-tester', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name: N, email: C, products: f, expertise: E }),
        })
        if (!j.ok) {
          const k = await j.json().catch(() => ({}))
          Nt.error(k.error ?? 'Something went wrong. Please try again.')
          return
        }
        ;(Nt.success("Welcome to the Crown Labs beta program. We'll reach out with next steps."),
          r(!1),
          a({}),
          p([]),
          w.target.reset())
      } catch {
        Nt.error('Network error. Please try again.')
      } finally {
        u(!1)
      }
    }
  return d.jsxs(Bi, {
    open: t,
    onOpenChange: r,
    children: [
      d.jsx(zi, { asChild: !0, children: e }),
      d.jsxs(vs, {
        className: 'sm:max-w-[500px] border-border bg-card max-h-[90vh] overflow-y-auto',
        children: [
          d.jsxs($i, {
            children: [
              d.jsx(ys, { className: 'text-xl', children: 'Become a Beta Tester' }),
              d.jsx(Wi, {
                children: 'Get early access to Crown Labs products before public release.',
              }),
            ],
          }),
          d.jsxs('form', {
            onSubmit: h,
            className: 'space-y-6 pt-4',
            children: [
              d.jsxs('div', {
                className: 'space-y-4',
                children: [
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'bt-name', children: 'Full Name *' }),
                      d.jsx(rn, {
                        id: 'bt-name',
                        name: 'name',
                        placeholder: 'John Doe',
                        className: 'border-border bg-background',
                      }),
                      s.name &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: s.name }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'bt-email', children: 'Email address *' }),
                      d.jsx(rn, {
                        id: 'bt-email',
                        name: 'email',
                        type: 'email',
                        placeholder: 'john@example.com',
                        className: 'border-border bg-background',
                      }),
                      s.email &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: s.email }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-3',
                    children: [
                      d.jsx(qe, { children: 'Which products interest you?' }),
                      d.jsx('div', {
                        className: 'grid grid-cols-1 sm:grid-cols-2 gap-2',
                        children: g.map((w) =>
                          d.jsxs(
                            'div',
                            {
                              className: 'flex items-center space-x-2',
                              children: [
                                d.jsx(ic, {
                                  id: `bt-product-${w}`,
                                  checked: f.includes(w),
                                  onCheckedChange: () => x(w),
                                }),
                                d.jsx(qe, {
                                  htmlFor: `bt-product-${w}`,
                                  className: 'text-xs font-normal leading-tight cursor-pointer',
                                  children: w,
                                }),
                              ],
                            },
                            w
                          )
                        ),
                      }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, {
                        htmlFor: 'bt-expertise',
                        children: 'Background / Expertise (optional)',
                      }),
                      d.jsx(Ui, {
                        id: 'bt-expertise',
                        name: 'expertise',
                        placeholder: 'Tell us about your technical or industry background...',
                        className: 'border-border bg-background min-h-[80px]',
                      }),
                    ],
                  }),
                ],
              }),
              d.jsx(Lr, {
                type: 'submit',
                disabled: l,
                className: 'w-full bg-primary text-primary-foreground hover:bg-primary/90',
                children: l
                  ? d.jsxs(d.Fragment, {
                      children: [
                        d.jsx(ki, { className: 'h-4 w-4 mr-2 animate-spin' }),
                        'Submitting...',
                      ],
                    })
                  : 'Join beta program',
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
function KM() {
  return { user: null, isAuthenticated: !1, logout: () => {}, login: () => {} }
}
function my(e) {
  const t = YM(e),
    r = v.forwardRef((s, a) => {
      const { children: l, ...u } = s,
        f = v.Children.toArray(l),
        p = f.find(qM)
      if (p) {
        const g = p.props.children,
          x = f.map((h) =>
            h === p
              ? v.Children.count(g) > 1
                ? v.Children.only(null)
                : v.isValidElement(g)
                  ? g.props.children
                  : null
              : h
          )
        return d.jsx(t, {
          ...u,
          ref: a,
          children: v.isValidElement(g) ? v.cloneElement(g, void 0, x) : null,
        })
      }
      return d.jsx(t, { ...u, ref: a, children: l })
    })
  return ((r.displayName = `${e}.Slot`), r)
}
function YM(e) {
  const t = v.forwardRef((r, s) => {
    const { children: a, ...l } = r
    if (v.isValidElement(a)) {
      const u = ZM(a),
        f = QM(l, a.props)
      return (a.type !== v.Fragment && (f.ref = s ? An(s, u) : u), v.cloneElement(a, f))
    }
    return v.Children.count(a) > 1 ? v.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var XM = Symbol('radix.slottable')
function qM(e) {
  return (
    v.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === XM
  )
}
function QM(e, t) {
  const r = { ...t }
  for (const s in t) {
    const a = e[s],
      l = t[s]
    ;/^on[A-Z]/.test(s)
      ? a && l
        ? (r[s] = (...f) => {
            const p = l(...f)
            return (a(...f), p)
          })
        : a && (r[s] = a)
      : s === 'style'
        ? (r[s] = { ...a, ...l })
        : s === 'className' && (r[s] = [a, l].filter(Boolean).join(' '))
  }
  return { ...e, ...r }
}
function ZM(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    r = t && 'isReactWarning' in t && t.isReactWarning
  return r
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (r = t && 'isReactWarning' in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref)
}
function hp(e) {
  const t = e + 'CollectionProvider',
    [r, s] = Mn(t),
    [a, l] = r(t, { collectionRef: { current: null }, itemMap: new Map() }),
    u = (C) => {
      const { scope: E, children: P } = C,
        j = Z.useRef(null),
        k = Z.useRef(new Map()).current
      return d.jsx(a, { scope: E, itemMap: k, collectionRef: j, children: P })
    }
  u.displayName = t
  const f = e + 'CollectionSlot',
    p = my(f),
    g = Z.forwardRef((C, E) => {
      const { scope: P, children: j } = C,
        k = l(f, P),
        _ = ke(E, k.collectionRef)
      return d.jsx(p, { ref: _, children: j })
    })
  g.displayName = f
  const x = e + 'CollectionItemSlot',
    h = 'data-radix-collection-item',
    w = my(x),
    S = Z.forwardRef((C, E) => {
      const { scope: P, children: j, ...k } = C,
        _ = Z.useRef(null),
        I = ke(E, _),
        B = l(x, P)
      return (
        Z.useEffect(
          () => (
            B.itemMap.set(_, { ref: _, ...k }),
            () => {
              B.itemMap.delete(_)
            }
          )
        ),
        d.jsx(w, { [h]: '', ref: I, children: j })
      )
    })
  S.displayName = x
  function N(C) {
    const E = l(e + 'CollectionConsumer', C)
    return Z.useCallback(() => {
      const j = E.collectionRef.current
      if (!j) return []
      const k = Array.from(j.querySelectorAll(`[${h}]`))
      return Array.from(E.itemMap.values()).sort(
        (B, z) => k.indexOf(B.ref.current) - k.indexOf(z.ref.current)
      )
    }, [E.collectionRef, E.itemMap])
  }
  return [{ Provider: u, Slot: g, ItemSlot: S }, N, s]
}
var JM = v.createContext(void 0)
function Fw(e) {
  const t = v.useContext(JM)
  return e || t || 'ltr'
}
var Pd = 'rovingFocusGroup.onEntryFocus',
  e_ = { bubbles: !1, cancelable: !0 },
  Hi = 'RovingFocusGroup',
  [ef, Vw, t_] = hp(Hi),
  [n_, Bw] = Mn(Hi, [t_]),
  [r_, o_] = n_(Hi),
  zw = v.forwardRef((e, t) =>
    d.jsx(ef.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: d.jsx(ef.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: d.jsx(s_, { ...e, ref: t }),
      }),
    })
  )
zw.displayName = Hi
var s_ = v.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: r,
        orientation: s,
        loop: a = !1,
        dir: l,
        currentTabStopId: u,
        defaultCurrentTabStopId: f,
        onCurrentTabStopIdChange: p,
        onEntryFocus: g,
        preventScrollOnEntryFocus: x = !1,
        ...h
      } = e,
      w = v.useRef(null),
      S = ke(t, w),
      N = Fw(l),
      [C, E] = go({ prop: u, defaultProp: f ?? null, onChange: p, caller: Hi }),
      [P, j] = v.useState(!1),
      k = qn(g),
      _ = Vw(r),
      I = v.useRef(!1),
      [B, z] = v.useState(0)
    return (
      v.useEffect(() => {
        const W = w.current
        if (W) return (W.addEventListener(Pd, k), () => W.removeEventListener(Pd, k))
      }, [k]),
      d.jsx(r_, {
        scope: r,
        orientation: s,
        dir: N,
        loop: a,
        currentTabStopId: C,
        onItemFocus: v.useCallback((W) => E(W), [E]),
        onItemShiftTab: v.useCallback(() => j(!0), []),
        onFocusableItemAdd: v.useCallback(() => z((W) => W + 1), []),
        onFocusableItemRemove: v.useCallback(() => z((W) => W - 1), []),
        children: d.jsx(Ne.div, {
          tabIndex: P || B === 0 ? -1 : 0,
          'data-orientation': s,
          ...h,
          ref: S,
          style: { outline: 'none', ...e.style },
          onMouseDown: ie(e.onMouseDown, () => {
            I.current = !0
          }),
          onFocus: ie(e.onFocus, (W) => {
            const oe = !I.current
            if (W.target === W.currentTarget && oe && !P) {
              const ne = new CustomEvent(Pd, e_)
              if ((W.currentTarget.dispatchEvent(ne), !ne.defaultPrevented)) {
                const me = _().filter((X) => X.focusable),
                  te = me.find((X) => X.active),
                  ue = me.find((X) => X.id === C),
                  xe = [te, ue, ...me].filter(Boolean).map((X) => X.ref.current)
                Uw(xe, x)
              }
            }
            I.current = !1
          }),
          onBlur: ie(e.onBlur, () => j(!1)),
        }),
      })
    )
  }),
  $w = 'RovingFocusGroupItem',
  Ww = v.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: r,
        focusable: s = !0,
        active: a = !1,
        tabStopId: l,
        children: u,
        ...f
      } = e,
      p = Xn(),
      g = l || p,
      x = o_($w, r),
      h = x.currentTabStopId === g,
      w = Vw(r),
      { onFocusableItemAdd: S, onFocusableItemRemove: N, currentTabStopId: C } = x
    return (
      v.useEffect(() => {
        if (s) return (S(), () => N())
      }, [s, S, N]),
      d.jsx(ef.ItemSlot, {
        scope: r,
        id: g,
        focusable: s,
        active: a,
        children: d.jsx(Ne.span, {
          tabIndex: h ? 0 : -1,
          'data-orientation': x.orientation,
          ...f,
          ref: t,
          onMouseDown: ie(e.onMouseDown, (E) => {
            s ? x.onItemFocus(g) : E.preventDefault()
          }),
          onFocus: ie(e.onFocus, () => x.onItemFocus(g)),
          onKeyDown: ie(e.onKeyDown, (E) => {
            if (E.key === 'Tab' && E.shiftKey) {
              x.onItemShiftTab()
              return
            }
            if (E.target !== E.currentTarget) return
            const P = l_(E, x.orientation, x.dir)
            if (P !== void 0) {
              if (E.metaKey || E.ctrlKey || E.altKey || E.shiftKey) return
              E.preventDefault()
              let k = w()
                .filter((_) => _.focusable)
                .map((_) => _.ref.current)
              if (P === 'last') k.reverse()
              else if (P === 'prev' || P === 'next') {
                P === 'prev' && k.reverse()
                const _ = k.indexOf(E.currentTarget)
                k = x.loop ? c_(k, _ + 1) : k.slice(_ + 1)
              }
              setTimeout(() => Uw(k))
            }
          }),
          children: typeof u == 'function' ? u({ isCurrentTabStop: h, hasTabStop: C != null }) : u,
        }),
      })
    )
  })
Ww.displayName = $w
var i_ = {
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageUp: 'first',
  Home: 'first',
  PageDown: 'last',
  End: 'last',
}
function a_(e, t) {
  return t !== 'rtl' ? e : e === 'ArrowLeft' ? 'ArrowRight' : e === 'ArrowRight' ? 'ArrowLeft' : e
}
function l_(e, t, r) {
  const s = a_(e.key, r)
  if (
    !(t === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(s)) &&
    !(t === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(s))
  )
    return i_[s]
}
function Uw(e, t = !1) {
  const r = document.activeElement
  for (const s of e)
    if (s === r || (s.focus({ preventScroll: t }), document.activeElement !== r)) return
}
function c_(e, t) {
  return e.map((r, s) => e[(t + s) % e.length])
}
var u_ = zw,
  d_ = Ww
function f_(e) {
  const t = p_(e),
    r = v.forwardRef((s, a) => {
      const { children: l, ...u } = s,
        f = v.Children.toArray(l),
        p = f.find(h_)
      if (p) {
        const g = p.props.children,
          x = f.map((h) =>
            h === p
              ? v.Children.count(g) > 1
                ? v.Children.only(null)
                : v.isValidElement(g)
                  ? g.props.children
                  : null
              : h
          )
        return d.jsx(t, {
          ...u,
          ref: a,
          children: v.isValidElement(g) ? v.cloneElement(g, void 0, x) : null,
        })
      }
      return d.jsx(t, { ...u, ref: a, children: l })
    })
  return ((r.displayName = `${e}.Slot`), r)
}
function p_(e) {
  const t = v.forwardRef((r, s) => {
    const { children: a, ...l } = r
    if (v.isValidElement(a)) {
      const u = v_(a),
        f = g_(l, a.props)
      return (a.type !== v.Fragment && (f.ref = s ? An(s, u) : u), v.cloneElement(a, f))
    }
    return v.Children.count(a) > 1 ? v.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var m_ = Symbol('radix.slottable')
function h_(e) {
  return (
    v.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === m_
  )
}
function g_(e, t) {
  const r = { ...t }
  for (const s in t) {
    const a = e[s],
      l = t[s]
    ;/^on[A-Z]/.test(s)
      ? a && l
        ? (r[s] = (...f) => {
            const p = l(...f)
            return (a(...f), p)
          })
        : a && (r[s] = a)
      : s === 'style'
        ? (r[s] = { ...a, ...l })
        : s === 'className' && (r[s] = [a, l].filter(Boolean).join(' '))
  }
  return { ...e, ...r }
}
function v_(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    r = t && 'isReactWarning' in t && t.isReactWarning
  return r
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (r = t && 'isReactWarning' in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref)
}
var tf = ['Enter', ' '],
  y_ = ['ArrowDown', 'PageUp', 'Home'],
  Hw = ['ArrowUp', 'PageDown', 'End'],
  x_ = [...y_, ...Hw],
  w_ = { ltr: [...tf, 'ArrowRight'], rtl: [...tf, 'ArrowLeft'] },
  b_ = { ltr: ['ArrowLeft'], rtl: ['ArrowRight'] },
  ac = 'Menu',
  [Pi, S_, C_] = hp(ac),
  [bo, Gw] = Mn(ac, [C_, Vr, Bw]),
  gp = Vr(),
  Kw = Bw(),
  [SO, So] = bo(ac),
  [CO, Gi] = bo(ac),
  E_ = 'MenuAnchor',
  vp = v.forwardRef((e, t) => {
    const { __scopeMenu: r, ...s } = e,
      a = gp(r)
    return d.jsx(Li, { ...a, ...s, ref: t })
  })
vp.displayName = E_
var yp = 'MenuPortal',
  [N_, Yw] = bo(yp, { forceMount: void 0 }),
  Xw = (e) => {
    const { __scopeMenu: t, forceMount: r, children: s, container: a } = e,
      l = So(yp, t)
    return d.jsx(N_, {
      scope: t,
      forceMount: r,
      children: d.jsx(Ht, {
        present: r || l.open,
        children: d.jsx(hs, { asChild: !0, container: a, children: s }),
      }),
    })
  }
Xw.displayName = yp
var on = 'MenuContent',
  [P_, xp] = bo(on),
  qw = v.forwardRef((e, t) => {
    const r = Yw(on, e.__scopeMenu),
      { forceMount: s = r.forceMount, ...a } = e,
      l = So(on, e.__scopeMenu),
      u = Gi(on, e.__scopeMenu)
    return d.jsx(Pi.Provider, {
      scope: e.__scopeMenu,
      children: d.jsx(Ht, {
        present: s || l.open,
        children: d.jsx(Pi.Slot, {
          scope: e.__scopeMenu,
          children: u.modal ? d.jsx(T_, { ...a, ref: t }) : d.jsx(j_, { ...a, ref: t }),
        }),
      }),
    })
  }),
  T_ = v.forwardRef((e, t) => {
    const r = So(on, e.__scopeMenu),
      s = v.useRef(null),
      a = ke(t, s)
    return (
      v.useEffect(() => {
        const l = s.current
        if (l) return tc(l)
      }, []),
      d.jsx(wp, {
        ...e,
        ref: a,
        trapFocus: r.open,
        disableOutsidePointerEvents: r.open,
        disableOutsideScroll: !0,
        onFocusOutside: ie(e.onFocusOutside, (l) => l.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => r.onOpenChange(!1),
      })
    )
  }),
  j_ = v.forwardRef((e, t) => {
    const r = So(on, e.__scopeMenu)
    return d.jsx(wp, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => r.onOpenChange(!1),
    })
  }),
  k_ = f_('MenuContent.ScrollLock'),
  wp = v.forwardRef((e, t) => {
    const {
        __scopeMenu: r,
        loop: s = !1,
        trapFocus: a,
        onOpenAutoFocus: l,
        onCloseAutoFocus: u,
        disableOutsidePointerEvents: f,
        onEntryFocus: p,
        onEscapeKeyDown: g,
        onPointerDownOutside: x,
        onFocusOutside: h,
        onInteractOutside: w,
        onDismiss: S,
        disableOutsideScroll: N,
        ...C
      } = e,
      E = So(on, r),
      P = Gi(on, r),
      j = gp(r),
      k = Kw(r),
      _ = S_(r),
      [I, B] = v.useState(null),
      z = v.useRef(null),
      W = ke(t, z, E.onContentChange),
      oe = v.useRef(0),
      ne = v.useRef(''),
      me = v.useRef(0),
      te = v.useRef(null),
      ue = v.useRef('right'),
      fe = v.useRef(0),
      xe = N ? Fi : v.Fragment,
      X = N ? { as: k_, allowPinchZoom: !0 } : void 0,
      q = (V) => {
        const U = ne.current + V,
          A = _().filter((Y) => !Y.disabled),
          $ = document.activeElement,
          J = A.find((Y) => Y.ref.current === $)?.textValue,
          re = A.map((Y) => Y.textValue),
          le = z_(re, U, J),
          he = A.find((Y) => Y.textValue === le)?.ref.current
        ;((function Y(ee) {
          ;((ne.current = ee),
            window.clearTimeout(oe.current),
            ee !== '' && (oe.current = window.setTimeout(() => Y(''), 1e3)))
        })(U),
          he && setTimeout(() => he.focus()))
      }
    ;(v.useEffect(() => () => window.clearTimeout(oe.current), []), Yl())
    const L = v.useCallback((V) => ue.current === te.current?.side && W_(V, te.current?.area), [])
    return d.jsx(P_, {
      scope: r,
      searchRef: ne,
      onItemEnter: v.useCallback(
        (V) => {
          L(V) && V.preventDefault()
        },
        [L]
      ),
      onItemLeave: v.useCallback(
        (V) => {
          L(V) || (z.current?.focus(), B(null))
        },
        [L]
      ),
      onTriggerLeave: v.useCallback(
        (V) => {
          L(V) && V.preventDefault()
        },
        [L]
      ),
      pointerGraceTimerRef: me,
      onPointerGraceIntentChange: v.useCallback((V) => {
        te.current = V
      }, []),
      children: d.jsx(xe, {
        ...X,
        children: d.jsx(Ii, {
          asChild: !0,
          trapped: a,
          onMountAutoFocus: ie(l, (V) => {
            ;(V.preventDefault(), z.current?.focus({ preventScroll: !0 }))
          }),
          onUnmountAutoFocus: u,
          children: d.jsx(fs, {
            asChild: !0,
            disableOutsidePointerEvents: f,
            onEscapeKeyDown: g,
            onPointerDownOutside: x,
            onFocusOutside: h,
            onInteractOutside: w,
            onDismiss: S,
            children: d.jsx(u_, {
              asChild: !0,
              ...k,
              dir: P.dir,
              orientation: 'vertical',
              loop: s,
              currentTabStopId: I,
              onCurrentTabStopIdChange: B,
              onEntryFocus: ie(p, (V) => {
                P.isUsingKeyboardRef.current || V.preventDefault()
              }),
              preventScrollOnEntryFocus: !0,
              children: d.jsx(Jl, {
                role: 'menu',
                'aria-orientation': 'vertical',
                'data-state': fb(E.open),
                'data-radix-menu-content': '',
                dir: P.dir,
                ...j,
                ...C,
                ref: W,
                style: { outline: 'none', ...C.style },
                onKeyDown: ie(C.onKeyDown, (V) => {
                  const A = V.target.closest('[data-radix-menu-content]') === V.currentTarget,
                    $ = V.ctrlKey || V.altKey || V.metaKey,
                    J = V.key.length === 1
                  A && (V.key === 'Tab' && V.preventDefault(), !$ && J && q(V.key))
                  const re = z.current
                  if (V.target !== re || !x_.includes(V.key)) return
                  V.preventDefault()
                  const he = _()
                    .filter((Y) => !Y.disabled)
                    .map((Y) => Y.ref.current)
                  ;(Hw.includes(V.key) && he.reverse(), V_(he))
                }),
                onBlur: ie(e.onBlur, (V) => {
                  V.currentTarget.contains(V.target) ||
                    (window.clearTimeout(oe.current), (ne.current = ''))
                }),
                onPointerMove: ie(
                  e.onPointerMove,
                  Ti((V) => {
                    const U = V.target,
                      A = fe.current !== V.clientX
                    if (V.currentTarget.contains(U) && A) {
                      const $ = V.clientX > fe.current ? 'right' : 'left'
                      ;((ue.current = $), (fe.current = V.clientX))
                    }
                  })
                ),
              }),
            }),
          }),
        }),
      }),
    })
  })
qw.displayName = on
var R_ = 'MenuGroup',
  bp = v.forwardRef((e, t) => {
    const { __scopeMenu: r, ...s } = e
    return d.jsx(Ne.div, { role: 'group', ...s, ref: t })
  })
bp.displayName = R_
var A_ = 'MenuLabel',
  Qw = v.forwardRef((e, t) => {
    const { __scopeMenu: r, ...s } = e
    return d.jsx(Ne.div, { ...s, ref: t })
  })
Qw.displayName = A_
var Fl = 'MenuItem',
  hy = 'menu.itemSelect',
  lc = v.forwardRef((e, t) => {
    const { disabled: r = !1, onSelect: s, ...a } = e,
      l = v.useRef(null),
      u = Gi(Fl, e.__scopeMenu),
      f = xp(Fl, e.__scopeMenu),
      p = ke(t, l),
      g = v.useRef(!1),
      x = () => {
        const h = l.current
        if (!r && h) {
          const w = new CustomEvent(hy, { bubbles: !0, cancelable: !0 })
          ;(h.addEventListener(hy, (S) => s?.(S), { once: !0 }),
            s0(h, w),
            w.defaultPrevented ? (g.current = !1) : u.onClose())
        }
      }
    return d.jsx(Zw, {
      ...a,
      ref: p,
      disabled: r,
      onClick: ie(e.onClick, x),
      onPointerDown: (h) => {
        ;(e.onPointerDown?.(h), (g.current = !0))
      },
      onPointerUp: ie(e.onPointerUp, (h) => {
        g.current || h.currentTarget?.click()
      }),
      onKeyDown: ie(e.onKeyDown, (h) => {
        const w = f.searchRef.current !== ''
        r ||
          (w && h.key === ' ') ||
          (tf.includes(h.key) && (h.currentTarget.click(), h.preventDefault()))
      }),
    })
  })
lc.displayName = Fl
var Zw = v.forwardRef((e, t) => {
    const { __scopeMenu: r, disabled: s = !1, textValue: a, ...l } = e,
      u = xp(Fl, r),
      f = Kw(r),
      p = v.useRef(null),
      g = ke(t, p),
      [x, h] = v.useState(!1),
      [w, S] = v.useState('')
    return (
      v.useEffect(() => {
        const N = p.current
        N && S((N.textContent ?? '').trim())
      }, [l.children]),
      d.jsx(Pi.ItemSlot, {
        scope: r,
        disabled: s,
        textValue: a ?? w,
        children: d.jsx(d_, {
          asChild: !0,
          ...f,
          focusable: !s,
          children: d.jsx(Ne.div, {
            role: 'menuitem',
            'data-highlighted': x ? '' : void 0,
            'aria-disabled': s || void 0,
            'data-disabled': s ? '' : void 0,
            ...l,
            ref: g,
            onPointerMove: ie(
              e.onPointerMove,
              Ti((N) => {
                s
                  ? u.onItemLeave(N)
                  : (u.onItemEnter(N),
                    N.defaultPrevented || N.currentTarget.focus({ preventScroll: !0 }))
              })
            ),
            onPointerLeave: ie(
              e.onPointerLeave,
              Ti((N) => u.onItemLeave(N))
            ),
            onFocus: ie(e.onFocus, () => h(!0)),
            onBlur: ie(e.onBlur, () => h(!1)),
          }),
        }),
      })
    )
  }),
  M_ = 'MenuCheckboxItem',
  Jw = v.forwardRef((e, t) => {
    const { checked: r = !1, onCheckedChange: s, ...a } = e
    return d.jsx(ob, {
      scope: e.__scopeMenu,
      checked: r,
      children: d.jsx(lc, {
        role: 'menuitemcheckbox',
        'aria-checked': Vl(r) ? 'mixed' : r,
        ...a,
        ref: t,
        'data-state': Cp(r),
        onSelect: ie(a.onSelect, () => s?.(Vl(r) ? !0 : !r), { checkForDefaultPrevented: !1 }),
      }),
    })
  })
Jw.displayName = M_
var eb = 'MenuRadioGroup',
  [__, D_] = bo(eb, { value: void 0, onValueChange: () => {} }),
  tb = v.forwardRef((e, t) => {
    const { value: r, onValueChange: s, ...a } = e,
      l = qn(s)
    return d.jsx(__, {
      scope: e.__scopeMenu,
      value: r,
      onValueChange: l,
      children: d.jsx(bp, { ...a, ref: t }),
    })
  })
tb.displayName = eb
var nb = 'MenuRadioItem',
  rb = v.forwardRef((e, t) => {
    const { value: r, ...s } = e,
      a = D_(nb, e.__scopeMenu),
      l = r === a.value
    return d.jsx(ob, {
      scope: e.__scopeMenu,
      checked: l,
      children: d.jsx(lc, {
        role: 'menuitemradio',
        'aria-checked': l,
        ...s,
        ref: t,
        'data-state': Cp(l),
        onSelect: ie(s.onSelect, () => a.onValueChange?.(r), { checkForDefaultPrevented: !1 }),
      }),
    })
  })
rb.displayName = nb
var Sp = 'MenuItemIndicator',
  [ob, I_] = bo(Sp, { checked: !1 }),
  sb = v.forwardRef((e, t) => {
    const { __scopeMenu: r, forceMount: s, ...a } = e,
      l = I_(Sp, r)
    return d.jsx(Ht, {
      present: s || Vl(l.checked) || l.checked === !0,
      children: d.jsx(Ne.span, { ...a, ref: t, 'data-state': Cp(l.checked) }),
    })
  })
sb.displayName = Sp
var O_ = 'MenuSeparator',
  ib = v.forwardRef((e, t) => {
    const { __scopeMenu: r, ...s } = e
    return d.jsx(Ne.div, { role: 'separator', 'aria-orientation': 'horizontal', ...s, ref: t })
  })
ib.displayName = O_
var L_ = 'MenuArrow',
  ab = v.forwardRef((e, t) => {
    const { __scopeMenu: r, ...s } = e,
      a = gp(r)
    return d.jsx(ec, { ...a, ...s, ref: t })
  })
ab.displayName = L_
var F_ = 'MenuSub',
  [EO, lb] = bo(F_),
  pi = 'MenuSubTrigger',
  cb = v.forwardRef((e, t) => {
    const r = So(pi, e.__scopeMenu),
      s = Gi(pi, e.__scopeMenu),
      a = lb(pi, e.__scopeMenu),
      l = xp(pi, e.__scopeMenu),
      u = v.useRef(null),
      { pointerGraceTimerRef: f, onPointerGraceIntentChange: p } = l,
      g = { __scopeMenu: e.__scopeMenu },
      x = v.useCallback(() => {
        ;(u.current && window.clearTimeout(u.current), (u.current = null))
      }, [])
    return (
      v.useEffect(() => x, [x]),
      v.useEffect(() => {
        const h = f.current
        return () => {
          ;(window.clearTimeout(h), p(null))
        }
      }, [f, p]),
      d.jsx(vp, {
        asChild: !0,
        ...g,
        children: d.jsx(Zw, {
          id: a.triggerId,
          'aria-haspopup': 'menu',
          'aria-expanded': r.open,
          'aria-controls': a.contentId,
          'data-state': fb(r.open),
          ...e,
          ref: An(t, a.onTriggerChange),
          onClick: (h) => {
            ;(e.onClick?.(h),
              !(e.disabled || h.defaultPrevented) &&
                (h.currentTarget.focus(), r.open || r.onOpenChange(!0)))
          },
          onPointerMove: ie(
            e.onPointerMove,
            Ti((h) => {
              ;(l.onItemEnter(h),
                !h.defaultPrevented &&
                  !e.disabled &&
                  !r.open &&
                  !u.current &&
                  (l.onPointerGraceIntentChange(null),
                  (u.current = window.setTimeout(() => {
                    ;(r.onOpenChange(!0), x())
                  }, 100))))
            })
          ),
          onPointerLeave: ie(
            e.onPointerLeave,
            Ti((h) => {
              x()
              const w = r.content?.getBoundingClientRect()
              if (w) {
                const S = r.content?.dataset.side,
                  N = S === 'right',
                  C = N ? -5 : 5,
                  E = w[N ? 'left' : 'right'],
                  P = w[N ? 'right' : 'left']
                ;(l.onPointerGraceIntentChange({
                  area: [
                    { x: h.clientX + C, y: h.clientY },
                    { x: E, y: w.top },
                    { x: P, y: w.top },
                    { x: P, y: w.bottom },
                    { x: E, y: w.bottom },
                  ],
                  side: S,
                }),
                  window.clearTimeout(f.current),
                  (f.current = window.setTimeout(() => l.onPointerGraceIntentChange(null), 300)))
              } else {
                if ((l.onTriggerLeave(h), h.defaultPrevented)) return
                l.onPointerGraceIntentChange(null)
              }
            })
          ),
          onKeyDown: ie(e.onKeyDown, (h) => {
            const w = l.searchRef.current !== ''
            e.disabled ||
              (w && h.key === ' ') ||
              (w_[s.dir].includes(h.key) &&
                (r.onOpenChange(!0), r.content?.focus(), h.preventDefault()))
          }),
        }),
      })
    )
  })
cb.displayName = pi
var ub = 'MenuSubContent',
  db = v.forwardRef((e, t) => {
    const r = Yw(on, e.__scopeMenu),
      { forceMount: s = r.forceMount, ...a } = e,
      l = So(on, e.__scopeMenu),
      u = Gi(on, e.__scopeMenu),
      f = lb(ub, e.__scopeMenu),
      p = v.useRef(null),
      g = ke(t, p)
    return d.jsx(Pi.Provider, {
      scope: e.__scopeMenu,
      children: d.jsx(Ht, {
        present: s || l.open,
        children: d.jsx(Pi.Slot, {
          scope: e.__scopeMenu,
          children: d.jsx(wp, {
            id: f.contentId,
            'aria-labelledby': f.triggerId,
            ...a,
            ref: g,
            align: 'start',
            side: u.dir === 'rtl' ? 'left' : 'right',
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (x) => {
              ;(u.isUsingKeyboardRef.current && p.current?.focus(), x.preventDefault())
            },
            onCloseAutoFocus: (x) => x.preventDefault(),
            onFocusOutside: ie(e.onFocusOutside, (x) => {
              x.target !== f.trigger && l.onOpenChange(!1)
            }),
            onEscapeKeyDown: ie(e.onEscapeKeyDown, (x) => {
              ;(u.onClose(), x.preventDefault())
            }),
            onKeyDown: ie(e.onKeyDown, (x) => {
              const h = x.currentTarget.contains(x.target),
                w = b_[u.dir].includes(x.key)
              h && w && (l.onOpenChange(!1), f.trigger?.focus(), x.preventDefault())
            }),
          }),
        }),
      }),
    })
  })
db.displayName = ub
function fb(e) {
  return e ? 'open' : 'closed'
}
function Vl(e) {
  return e === 'indeterminate'
}
function Cp(e) {
  return Vl(e) ? 'indeterminate' : e ? 'checked' : 'unchecked'
}
function V_(e) {
  const t = document.activeElement
  for (const r of e) if (r === t || (r.focus(), document.activeElement !== t)) return
}
function B_(e, t) {
  return e.map((r, s) => e[(t + s) % e.length])
}
function z_(e, t, r) {
  const a = t.length > 1 && Array.from(t).every((g) => g === t[0]) ? t[0] : t,
    l = r ? e.indexOf(r) : -1
  let u = B_(e, Math.max(l, 0))
  a.length === 1 && (u = u.filter((g) => g !== r))
  const p = u.find((g) => g.toLowerCase().startsWith(a.toLowerCase()))
  return p !== r ? p : void 0
}
function $_(e, t) {
  const { x: r, y: s } = e
  let a = !1
  for (let l = 0, u = t.length - 1; l < t.length; u = l++) {
    const f = t[l],
      p = t[u],
      g = f.x,
      x = f.y,
      h = p.x,
      w = p.y
    x > s != w > s && r < ((h - g) * (s - x)) / (w - x) + g && (a = !a)
  }
  return a
}
function W_(e, t) {
  if (!t) return !1
  const r = { x: e.clientX, y: e.clientY }
  return $_(r, t)
}
function Ti(e) {
  return (t) => (t.pointerType === 'mouse' ? e(t) : void 0)
}
var U_ = vp,
  H_ = Xw,
  G_ = qw,
  K_ = bp,
  Y_ = Qw,
  X_ = lc,
  q_ = Jw,
  Q_ = tb,
  Z_ = rb,
  J_ = sb,
  eD = ib,
  tD = ab,
  nD = cb,
  rD = db,
  pb = 'DropdownMenu',
  [oD] = Mn(pb, [Gw]),
  _t = Gw(),
  [NO, mb] = oD(pb),
  hb = 'DropdownMenuTrigger',
  sD = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, disabled: s = !1, ...a } = e,
      l = mb(hb, r),
      u = _t(r)
    return d.jsx(U_, {
      asChild: !0,
      ...u,
      children: d.jsx(Ne.button, {
        type: 'button',
        id: l.triggerId,
        'aria-haspopup': 'menu',
        'aria-expanded': l.open,
        'aria-controls': l.open ? l.contentId : void 0,
        'data-state': l.open ? 'open' : 'closed',
        'data-disabled': s ? '' : void 0,
        disabled: s,
        ...a,
        ref: An(t, l.triggerRef),
        onPointerDown: ie(e.onPointerDown, (f) => {
          !s &&
            f.button === 0 &&
            f.ctrlKey === !1 &&
            (l.onOpenToggle(), l.open || f.preventDefault())
        }),
        onKeyDown: ie(e.onKeyDown, (f) => {
          s ||
            (['Enter', ' '].includes(f.key) && l.onOpenToggle(),
            f.key === 'ArrowDown' && l.onOpenChange(!0),
            ['Enter', ' ', 'ArrowDown'].includes(f.key) && f.preventDefault())
        }),
      }),
    })
  })
sD.displayName = hb
var iD = 'DropdownMenuPortal',
  gb = (e) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      s = _t(t)
    return d.jsx(H_, { ...s, ...r })
  }
gb.displayName = iD
var vb = 'DropdownMenuContent',
  yb = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = mb(vb, r),
      l = _t(r),
      u = v.useRef(!1)
    return d.jsx(G_, {
      id: a.contentId,
      'aria-labelledby': a.triggerId,
      ...l,
      ...s,
      ref: t,
      onCloseAutoFocus: ie(e.onCloseAutoFocus, (f) => {
        ;(u.current || a.triggerRef.current?.focus(), (u.current = !1), f.preventDefault())
      }),
      onInteractOutside: ie(e.onInteractOutside, (f) => {
        const p = f.detail.originalEvent,
          g = p.button === 0 && p.ctrlKey === !0,
          x = p.button === 2 || g
        ;(!a.modal || x) && (u.current = !0)
      }),
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    })
  })
yb.displayName = vb
var aD = 'DropdownMenuGroup',
  lD = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(K_, { ...a, ...s, ref: t })
  })
lD.displayName = aD
var cD = 'DropdownMenuLabel',
  xb = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(Y_, { ...a, ...s, ref: t })
  })
xb.displayName = cD
var uD = 'DropdownMenuItem',
  wb = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(X_, { ...a, ...s, ref: t })
  })
wb.displayName = uD
var dD = 'DropdownMenuCheckboxItem',
  bb = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(q_, { ...a, ...s, ref: t })
  })
bb.displayName = dD
var fD = 'DropdownMenuRadioGroup',
  pD = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(Q_, { ...a, ...s, ref: t })
  })
pD.displayName = fD
var mD = 'DropdownMenuRadioItem',
  Sb = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(Z_, { ...a, ...s, ref: t })
  })
Sb.displayName = mD
var hD = 'DropdownMenuItemIndicator',
  Cb = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(J_, { ...a, ...s, ref: t })
  })
Cb.displayName = hD
var gD = 'DropdownMenuSeparator',
  Eb = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(eD, { ...a, ...s, ref: t })
  })
Eb.displayName = gD
var vD = 'DropdownMenuArrow',
  yD = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(tD, { ...a, ...s, ref: t })
  })
yD.displayName = vD
var xD = 'DropdownMenuSubTrigger',
  Nb = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(nD, { ...a, ...s, ref: t })
  })
Nb.displayName = xD
var wD = 'DropdownMenuSubContent',
  Pb = v.forwardRef((e, t) => {
    const { __scopeDropdownMenu: r, ...s } = e,
      a = _t(r)
    return d.jsx(rD, {
      ...a,
      ...s,
      ref: t,
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    })
  })
Pb.displayName = wD
var bD = gb,
  Tb = yb,
  jb = xb,
  kb = wb,
  Rb = bb,
  Ab = Sb,
  Mb = Cb,
  _b = Eb,
  Db = Nb,
  Ib = Pb
const SD = v.forwardRef(({ className: e, inset: t, children: r, ...s }, a) =>
  d.jsxs(Db, {
    ref: a,
    className: Ie(
      'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      t && 'pl-8',
      e
    ),
    ...s,
    children: [r, d.jsx(KC, { className: 'ml-auto' })],
  })
)
SD.displayName = Db.displayName
const CD = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx(Ib, {
    ref: r,
    className: Ie(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
      e
    ),
    ...t,
  })
)
CD.displayName = Ib.displayName
const ED = v.forwardRef(({ className: e, sideOffset: t = 4, ...r }, s) =>
  d.jsx(bD, {
    children: d.jsx(Tb, {
      ref: s,
      sideOffset: t,
      className: Ie(
        'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
        e
      ),
      ...r,
    }),
  })
)
ED.displayName = Tb.displayName
const ND = v.forwardRef(({ className: e, inset: t, ...r }, s) =>
  d.jsx(kb, {
    ref: s,
    className: Ie(
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
      t && 'pl-8',
      e
    ),
    ...r,
  })
)
ND.displayName = kb.displayName
const PD = v.forwardRef(({ className: e, children: t, checked: r, ...s }, a) =>
  d.jsxs(Rb, {
    ref: a,
    className: Ie(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    checked: r,
    ...s,
    children: [
      d.jsx('span', {
        className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: d.jsx(Mb, { children: d.jsx(ff, { className: 'h-4 w-4' }) }),
      }),
      t,
    ],
  })
)
PD.displayName = Rb.displayName
const TD = v.forwardRef(({ className: e, children: t, ...r }, s) =>
  d.jsxs(Ab, {
    ref: s,
    className: Ie(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    ...r,
    children: [
      d.jsx('span', {
        className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: d.jsx(Mb, { children: d.jsx(YC, { className: 'h-2 w-2 fill-current' }) }),
      }),
      t,
    ],
  })
)
TD.displayName = Ab.displayName
const jD = v.forwardRef(({ className: e, inset: t, ...r }, s) =>
  d.jsx(jb, { ref: s, className: Ie('px-2 py-1.5 text-sm font-semibold', t && 'pl-8', e), ...r })
)
jD.displayName = jb.displayName
const kD = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx(_b, { ref: r, className: Ie('-mx-1 my-1 h-px bg-muted', e), ...t })
)
kD.displayName = _b.displayName
function RD() {
  const [e, t] = v.useState(!1),
    [r, s] = v.useState(!1),
    { isLoading: a, login: l } = KM()
  return (
    v.useEffect(() => {
      const u = () => s(window.scrollY > 20)
      return (window.addEventListener('scroll', u), () => window.removeEventListener('scroll', u))
    }, []),
    d.jsxs('header', {
      className: `fixed top-0 left-0 right-0 z-50 border-b border-border/60 transition-colors duration-300 ${r ? 'bg-background/90 backdrop-blur-md' : 'bg-background/0'}`,
      children: [
        d.jsxs('div', {
          className: 'max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14',
          children: [
            d.jsxs('div', {
              className: 'flex items-center gap-4',
              children: [
                d.jsx('a', {
                  href: '/',
                  className: 'flex items-center gap-2',
                  children: d.jsx('img', {
                    src: '/logo.png',
                    alt: 'Crown Labs',
                    className: 'h-8 w-auto',
                  }),
                }),
                d.jsxs('div', {
                  className: 'hidden sm:block',
                  children: [
                    d.jsx('p', {
                      className:
                        'text-xs font-semibold tracking-widest text-foreground/90 uppercase',
                      children: 'Crown Labs',
                    }),
                    d.jsx('p', {
                      className: 'text-[10px] tracking-wider text-muted-foreground uppercase',
                      children: 'Applied Intelligence Studio',
                    }),
                  ],
                }),
              ],
            }),
            d.jsxs('nav', {
              className: 'hidden md:flex items-center gap-1',
              children: [
                d.jsx(py, {
                  trigger: d.jsxs('button', {
                    className:
                      'flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors',
                    children: [d.jsx(jd, { className: 'h-3.5 w-3.5' }), 'Get notifications'],
                  }),
                }),
                a
                  ? d.jsx('span', {
                      className: 'px-3 py-1.5 text-xs text-muted-foreground',
                      children: '...',
                    })
                  : d.jsxs('button', {
                      onClick: l,
                      className:
                        'flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors',
                      children: [d.jsx(hg, { className: 'h-3.5 w-3.5' }), 'Lab login'],
                    }),
                d.jsx('button', {
                  className:
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors',
                  children: d.jsx(nE, { className: 'h-3.5 w-3.5' }),
                }),
                d.jsx(Jd, {
                  trigger: d.jsx('button', {
                    className:
                      'ml-2 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity',
                    children: 'Beta Testers',
                  }),
                }),
              ],
            }),
            d.jsx('button', {
              className: 'md:hidden p-2 text-muted-foreground relative z-50',
              onClick: () => t(!e),
              children: d.jsx(os, {
                mode: 'wait',
                children: e
                  ? d.jsx(
                      ft.div,
                      {
                        initial: { opacity: 0, rotate: -90 },
                        animate: { opacity: 1, rotate: 0 },
                        exit: { opacity: 0, rotate: 90 },
                        transition: { duration: 0.2 },
                        children: d.jsx(Ey, { className: 'h-5 w-5' }),
                      },
                      'close'
                    )
                  : d.jsx(
                      ft.div,
                      {
                        initial: { opacity: 0, rotate: 90 },
                        animate: { opacity: 1, rotate: 0 },
                        exit: { opacity: 0, rotate: -90 },
                        transition: { duration: 0.2 },
                        children: d.jsx(tE, { className: 'h-5 w-5' }),
                      },
                      'menu'
                    ),
              }),
            }),
          ],
        }),
        d.jsx(os, {
          children:
            e &&
            d.jsxs(d.Fragment, {
              children: [
                d.jsx(ft.div, {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  onClick: () => t(!1),
                  className: 'md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm',
                }),
                d.jsxs(ft.div, {
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                  transition: { type: 'spring', bounce: 0, duration: 0.3 },
                  className:
                    'md:hidden relative z-40 border-t border-border bg-card px-4 py-3 flex flex-col gap-2 shadow-xl',
                  children: [
                    d.jsx(ft.div, {
                      initial: { opacity: 0, x: -10 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.1 },
                      children: d.jsx(py, {
                        trigger: d.jsxs('button', {
                          className:
                            'flex w-full items-center gap-2 py-2 text-sm text-muted-foreground',
                          children: [d.jsx(jd, { className: 'h-4 w-4' }), ' Get notifications'],
                        }),
                      }),
                    }),
                    !a &&
                      d.jsxs(ft.button, {
                        initial: { opacity: 0, x: -10 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.15 },
                        onClick: l,
                        className: 'flex items-center gap-2 py-2 text-sm text-muted-foreground',
                        children: [d.jsx(hg, { className: 'h-4 w-4' }), ' Lab login'],
                      }),
                    d.jsx(ft.div, {
                      initial: { opacity: 0, x: -10 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.25 },
                      children: d.jsx(Jd, {
                        trigger: d.jsx('button', {
                          className:
                            'w-full mt-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold text-center',
                          children: 'Beta Testers',
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
        }),
      ],
    })
  )
}
const wi = [
    {
      id: 'crowncode-intelligence-suite',
      abbr: 'CIS',
      name: 'CrownCode Intelligence Suite',
      status: 'Stage 1 Beta',
      category: 'Intelligence',
      categoryLabel: 'Flagship Intelligence Platform',
      description:
        'A multimodal AI intelligence suite that documents, correlates, profiles, forecasts, and explains evidence-grade insights.',
      valuationAsIs: '$6M–$10M',
      valuationProjected: '$22M–$38M',
      trend: 'Rising',
      trendLow: 12,
      trendAvg: 47,
      trendHigh: 82,
      metrics: [
        { value: '100%', label: 'Chain-of-custody' },
        { value: '5 modes', label: 'Signal scope' },
        { value: '<30s', label: 'Alert latency' },
      ],
      features: [
        'Multimodal intelligence extraction across text, image, audio, video, metadata',
        'Predictive behavioral modeling and psychological threat assessment',
        'Evidence-grade reporting with audit trails and chain-of-custody',
      ],
      nextGate: 'Complete Stage 1 beta with validated evidence-ready reporting.',
      flagship: !0,
      readiness: {
        stage: 'Stage 1 Beta',
        focus: 'Flagship Intelligence Platform',
        nextGate: 'Stage 1 beta preparation with controlled testing underway',
      },
    },
    {
      id: 'crowncam',
      abbr: 'C',
      name: 'CrownCam',
      status: 'Beta',
      category: 'Security',
      categoryLabel: 'Security & Situational Awareness',
      description:
        'A browser-based security camera platform that turns any device into an intelligent, real-time surveillance system.',
      valuationAsIs: '$1.2M–$2M',
      valuationProjected: '$5M–$8M',
      trend: 'Rising',
      trendLow: 8,
      trendAvg: 33,
      trendHigh: 60,
      metrics: [
        { value: '99.1%', label: 'Stream uptime' },
        { value: '120ms', label: 'Avg latency' },
        { value: '240', label: 'Active cams' },
      ],
      features: [
        '100% browser-based camera deployment with QR or secure links',
        '4K+ resolution feeds and multi-monitor control-room layouts',
        'AI-powered motion detection with smart alerts',
      ],
      nextGate: 'Finalize AI resolution upgrades and stabilize control-room workflows.',
    },
    {
      id: 'crown-sos',
      abbr: 'CS',
      name: 'Crown SOS',
      status: 'Beta',
      category: 'Security',
      categoryLabel: 'Security & Emergency Response',
      description:
        'A real-time emergency response and proof-of-life platform with live location, audio, and evidence capture.',
      valuationAsIs: '$900K–$1.5M',
      valuationProjected: '$3M–$5M',
      trend: 'Rising',
      trendLow: 6,
      trendAvg: 28,
      trendHigh: 52,
      metrics: [
        { value: '97%', label: 'Alert delivery' },
        { value: '42s', label: 'Avg response' },
        { value: '38', label: 'Trusted nodes' },
      ],
      features: [
        'One-tap emergency activation with trusted contact routing',
        'Live location broadcasting with audio/video evidence capture',
        'Automated proof-of-life check-ins and session history',
      ],
      nextGate: 'Validate beta response workflows and proof-of-life sequencing.',
    },
    {
      id: 'pic-detective',
      abbr: 'PD',
      name: 'Pic Detective',
      status: 'Beta',
      category: 'Forensics',
      categoryLabel: 'Forensic & Analytical Systems',
      description:
        'Transforms a single image into a structured intelligence artifact with forensic reporting.',
      valuationAsIs: '$1.8M–$3M',
      valuationProjected: '$5M–$8M',
      trend: 'Rising',
      trendLow: 10,
      trendAvg: 41,
      trendHigh: 72,
      metrics: [
        { value: '4.8/5', label: 'Report fidelity' },
        { value: '3', label: 'Export formats' },
        { value: '40s', label: 'Avg analysis' },
      ],
      features: [
        'Environmental inventory extraction and spatial mapping',
        'Behavioral indicator flagging with analyst overlays',
        'Structured forensic reporting with multi-format exports',
      ],
      nextGate: 'Finalize interface polish and reporting export workflows.',
    },
    {
      id: 'ai-cherry-pie',
      abbr: 'ACP',
      name: 'AI Cherry Pie',
      status: 'Beta',
      category: 'Creative',
      categoryLabel: 'Creative, Communication & Behavioral Systems',
      description:
        "Analyzes rhythm, pacing, and emotional flow to remove AI residue while preserving the author's voice.",
      valuationAsIs: '$1M–$1.8M',
      valuationProjected: '$4M–$6M',
      trend: 'Rising',
      trendLow: 11,
      trendAvg: 38,
      trendHigh: 66,
      metrics: [
        { value: '97%', label: 'Voice fidelity' },
        { value: '1.2s', label: 'Processing' },
        { value: '2', label: 'Output modes' },
      ],
      features: [
        'AI writing fingerprint detection with cadence analysis',
        'Emotional flow restoration and human rhythm modeling',
        'Batch and single-text processing with publishing-ready outputs',
      ],
      nextGate: 'Finalize packaging, distribution, and launch channels.',
    },
    {
      id: 'crowncast',
      abbr: 'C',
      name: 'CrownCast',
      status: 'Beta',
      category: 'Creative',
      categoryLabel: 'Creative, Communication & Behavioral Systems',
      description:
        'A daily generative insight engine grounded in psychology, emotional regulation, and agency.',
      valuationAsIs: '$600K–$1M',
      valuationProjected: '$2M–$3M',
      trend: 'Rising',
      trendLow: 5,
      trendAvg: 27,
      trendHigh: 50,
      metrics: [
        { value: '365', label: 'Daily prompts' },
        { value: '64%', label: 'Retention' },
        { value: '95%', label: 'Voice fidelity' },
      ],
      features: [
        'Daily psychologically grounded insights with agency-first framing',
        'Emotion and decision-cycle modeling without superstition',
        'Mobile-first delivery with subscription-ready architecture',
      ],
      nextGate: 'Finalize distribution and delivery pipelines.',
    },
    {
      id: 'crown-watchtower',
      abbr: 'CW',
      name: 'Crown WatchTower',
      status: 'Prototype',
      category: 'Security',
      categoryLabel: 'Forensic & Analytical Systems',
      description:
        'Deep visibility into network traffic, wireless signals, and environmental indicators for real-time anomaly detection.',
      valuationAsIs: '$1.3M–$2.2M',
      valuationProjected: '$4M–$6M',
      trend: 'Rising',
      trendLow: 7,
      trendAvg: 30,
      trendHigh: 54,
      metrics: [
        { value: '6', label: 'Signal zones' },
        { value: '18', label: 'Anomaly cues' },
        { value: '2m', label: 'Scan latency' },
      ],
      features: [
        'Network traffic inspection and wireless signal scanning',
        'Device fingerprinting and environment mapping',
        'Real-time anomaly detection with forensic logging',
      ],
      nextGate: 'Finalize initial prototype scope and monitoring dashboards.',
    },
    {
      id: 'lumilogix',
      abbr: 'L',
      name: 'LumiLogix',
      status: 'Prototype',
      category: 'Creative',
      categoryLabel: 'Creative, Communication & Behavioral Systems',
      description:
        'An emotionally intelligent marketing engine blending psychology, narrative structure, and data-driven insight.',
      valuationAsIs: '$2.5M–$4M',
      valuationProjected: '$8M–$12M',
      trend: 'Rising',
      trendLow: 9,
      trendAvg: 41,
      trendHigh: 74,
      metrics: [
        { value: '12', label: 'Archetypes' },
        { value: '96%', label: 'Voice fidelity' },
        { value: '8', label: 'Channel outputs' },
      ],
      features: [
        'Emotional intelligence modeling with archetype logic',
        'Narrative tone alignment across campaigns',
        'Ethical emotion safeguards with brand voice preservation',
      ],
      nextGate: 'Complete module integrations and validate ethical safeguards.',
    },
    {
      id: 'presence-architect',
      abbr: 'PA',
      name: 'Presence Architect',
      status: 'Prototype',
      category: 'Relationship',
      categoryLabel: 'Relationship & Cultural Products',
      description:
        'A strategic system for cultivating attraction, authority, and emotional gravity without chasing attention.',
      valuationAsIs: '$700K–$1.2M',
      valuationProjected: '$3M–$5M',
      trend: 'Rising',
      trendLow: 4,
      trendAvg: 24,
      trendHigh: 48,
      metrics: [
        { value: '18', label: 'Playbooks' },
        { value: '+24%', label: 'Signal lift' },
        { value: '3', label: 'Cohorts' },
      ],
      features: [
        'Social signaling frameworks with restraint and timing logic',
        'Emotional regulation and confidence projection models',
        'DM playbooks and platform-specific presence strategies',
      ],
      nextGate: 'Move from prototype to pilot cohort validation.',
    },
    {
      id: 'couples-connection-playground',
      abbr: 'CCP',
      name: 'Couples Connection Playground',
      status: 'Concept',
      category: 'Relationship',
      categoryLabel: 'Relationship & Cultural Products',
      description:
        'A playful, guided platform for couples to build connection without therapy language or pressure.',
      valuationAsIs: '$500K–$900K',
      valuationProjected: '$2M–$3M',
      trend: 'Rising',
      trendLow: 3,
      trendAvg: 21,
      trendHigh: 44,
      metrics: [
        { value: '6', label: 'Session modes' },
        { value: '30', label: 'Exercises' },
        { value: '74%', label: 'Completion' },
      ],
      features: [
        'Interactive relationship games with emotional check-ins',
        'Guided conversation flows and conflict repair experiences',
        'Private shared couple spaces with mobile-first design',
      ],
      nextGate: 'Finalize game loops and interaction design prototypes.',
    },
    {
      id: 'hotag',
      abbr: 'H',
      name: 'HoTag',
      status: 'Concept',
      category: 'Cultural',
      categoryLabel: 'Relationship & Cultural Products',
      description:
        'A culturally sharp consumer tech concept blending satire, behavioral insight, and tracking tech.',
      valuationAsIs: '$250K–$500K',
      valuationProjected: '$1.5M–$2.5M',
      trend: 'Rising',
      trendLow: 2,
      trendAvg: 14,
      trendHigh: 30,
      metrics: [
        { value: '12', label: 'Brand drops' },
        { value: '180k', label: 'Audience reach' },
        { value: '3', label: 'Launch kits' },
      ],
      features: [
        'Location tracking product concept with branded device IP',
        'Companion mobile app framework and viral branding',
        'Merchandise and licensing extensions with cultural commentary',
      ],
      nextGate: 'Move from concept to prototype brand ecosystem.',
    },
  ],
  gy = ['Stage 1 Beta', 'Beta', 'Prototype', 'Concept', 'Live']
function Ob(e) {
  switch (e) {
    case 'Stage 1 Beta':
      return 'text-red-400 bg-red-950/50 border-red-800/50'
    case 'Beta':
      return 'text-amber-400 bg-amber-950/50 border-amber-800/50'
    case 'Prototype':
      return 'text-blue-400 bg-blue-950/50 border-blue-800/50'
    case 'Concept':
      return 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50'
    case 'Live':
      return 'text-green-400 bg-green-950/50 border-green-800/50'
    default:
      return 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50'
  }
}
function Lb(e) {
  switch (e) {
    case 'Intelligence':
      return 'text-violet-400 bg-violet-950/50 border-violet-800/50'
    case 'Security':
      return 'text-blue-400 bg-blue-950/50 border-blue-800/50'
    case 'Forensics':
      return 'text-amber-400 bg-amber-950/50 border-amber-800/50'
    case 'Creative':
      return 'text-pink-400 bg-pink-950/50 border-pink-800/50'
    case 'Relationship':
      return 'text-rose-400 bg-rose-950/50 border-rose-800/50'
    case 'Cultural':
      return 'text-orange-400 bg-orange-950/50 border-orange-800/50'
    case 'Frameworks':
      return 'text-teal-400 bg-teal-950/50 border-teal-800/50'
    default:
      return 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50'
  }
}
function vy(e, [t, r]) {
  return Math.min(r, Math.max(t, e))
}
function AD(e) {
  const t = MD(e),
    r = v.forwardRef((s, a) => {
      const { children: l, ...u } = s,
        f = v.Children.toArray(l),
        p = f.find(DD)
      if (p) {
        const g = p.props.children,
          x = f.map((h) =>
            h === p
              ? v.Children.count(g) > 1
                ? v.Children.only(null)
                : v.isValidElement(g)
                  ? g.props.children
                  : null
              : h
          )
        return d.jsx(t, {
          ...u,
          ref: a,
          children: v.isValidElement(g) ? v.cloneElement(g, void 0, x) : null,
        })
      }
      return d.jsx(t, { ...u, ref: a, children: l })
    })
  return ((r.displayName = `${e}.Slot`), r)
}
function MD(e) {
  const t = v.forwardRef((r, s) => {
    const { children: a, ...l } = r
    if (v.isValidElement(a)) {
      const u = OD(a),
        f = ID(l, a.props)
      return (a.type !== v.Fragment && (f.ref = s ? An(s, u) : u), v.cloneElement(a, f))
    }
    return v.Children.count(a) > 1 ? v.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var _D = Symbol('radix.slottable')
function DD(e) {
  return (
    v.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === _D
  )
}
function ID(e, t) {
  const r = { ...t }
  for (const s in t) {
    const a = e[s],
      l = t[s]
    ;/^on[A-Z]/.test(s)
      ? a && l
        ? (r[s] = (...f) => {
            const p = l(...f)
            return (a(...f), p)
          })
        : a && (r[s] = a)
      : s === 'style'
        ? (r[s] = { ...a, ...l })
        : s === 'className' && (r[s] = [a, l].filter(Boolean).join(' '))
  }
  return { ...e, ...r }
}
function OD(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    r = t && 'isReactWarning' in t && t.isReactWarning
  return r
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (r = t && 'isReactWarning' in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref)
}
var Fb = Object.freeze({
    position: 'absolute',
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
  }),
  LD = 'VisuallyHidden',
  Vb = v.forwardRef((e, t) => d.jsx(Ne.span, { ...e, ref: t, style: { ...Fb, ...e.style } }))
Vb.displayName = LD
var FD = Vb,
  VD = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
  BD = [' ', 'Enter'],
  yo = 'Select',
  [cc, uc, zD] = hp(yo),
  [xs] = Mn(yo, [zD, Vr]),
  dc = Vr(),
  [$D, zr] = xs(yo),
  [WD, UD] = xs(yo),
  Bb = (e) => {
    const {
        __scopeSelect: t,
        children: r,
        open: s,
        defaultOpen: a,
        onOpenChange: l,
        value: u,
        defaultValue: f,
        onValueChange: p,
        dir: g,
        name: x,
        autoComplete: h,
        disabled: w,
        required: S,
        form: N,
      } = e,
      C = dc(t),
      [E, P] = v.useState(null),
      [j, k] = v.useState(null),
      [_, I] = v.useState(!1),
      B = Fw(g),
      [z, W] = go({ prop: s, defaultProp: a ?? !1, onChange: l, caller: yo }),
      [oe, ne] = go({ prop: u, defaultProp: f, onChange: p, caller: yo }),
      me = v.useRef(null),
      te = E ? N || !!E.closest('form') : !0,
      [ue, fe] = v.useState(new Set()),
      xe = Array.from(ue)
        .map((X) => X.props.value)
        .join(';')
    return d.jsx(ap, {
      ...C,
      children: d.jsxs($D, {
        required: S,
        scope: t,
        trigger: E,
        onTriggerChange: P,
        valueNode: j,
        onValueNodeChange: k,
        valueNodeHasChildren: _,
        onValueNodeHasChildrenChange: I,
        contentId: Xn(),
        value: oe,
        onValueChange: ne,
        open: z,
        onOpenChange: W,
        dir: B,
        triggerPointerDownPosRef: me,
        disabled: w,
        children: [
          d.jsx(cc.Provider, {
            scope: t,
            children: d.jsx(WD, {
              scope: e.__scopeSelect,
              onNativeOptionAdd: v.useCallback((X) => {
                fe((q) => new Set(q).add(X))
              }, []),
              onNativeOptionRemove: v.useCallback((X) => {
                fe((q) => {
                  const L = new Set(q)
                  return (L.delete(X), L)
                })
              }, []),
              children: r,
            }),
          }),
          te
            ? d.jsxs(
                u1,
                {
                  'aria-hidden': !0,
                  required: S,
                  tabIndex: -1,
                  name: x,
                  autoComplete: h,
                  value: oe,
                  onChange: (X) => ne(X.target.value),
                  disabled: w,
                  form: N,
                  children: [oe === void 0 ? d.jsx('option', { value: '' }) : null, Array.from(ue)],
                },
                xe
              )
            : null,
        ],
      }),
    })
  }
Bb.displayName = yo
var zb = 'SelectTrigger',
  $b = v.forwardRef((e, t) => {
    const { __scopeSelect: r, disabled: s = !1, ...a } = e,
      l = dc(r),
      u = zr(zb, r),
      f = u.disabled || s,
      p = ke(t, u.onTriggerChange),
      g = uc(r),
      x = v.useRef('touch'),
      [h, w, S] = f1((C) => {
        const E = g().filter((k) => !k.disabled),
          P = E.find((k) => k.value === u.value),
          j = p1(E, C, P)
        j !== void 0 && u.onValueChange(j.value)
      }),
      N = (C) => {
        ;(f || (u.onOpenChange(!0), S()),
          C &&
            (u.triggerPointerDownPosRef.current = {
              x: Math.round(C.pageX),
              y: Math.round(C.pageY),
            }))
      }
    return d.jsx(Li, {
      asChild: !0,
      ...l,
      children: d.jsx(Ne.button, {
        type: 'button',
        role: 'combobox',
        'aria-controls': u.contentId,
        'aria-expanded': u.open,
        'aria-required': u.required,
        'aria-autocomplete': 'none',
        dir: u.dir,
        'data-state': u.open ? 'open' : 'closed',
        disabled: f,
        'data-disabled': f ? '' : void 0,
        'data-placeholder': d1(u.value) ? '' : void 0,
        ...a,
        ref: p,
        onClick: ie(a.onClick, (C) => {
          ;(C.currentTarget.focus(), x.current !== 'mouse' && N(C))
        }),
        onPointerDown: ie(a.onPointerDown, (C) => {
          x.current = C.pointerType
          const E = C.target
          ;(E.hasPointerCapture(C.pointerId) && E.releasePointerCapture(C.pointerId),
            C.button === 0 &&
              C.ctrlKey === !1 &&
              C.pointerType === 'mouse' &&
              (N(C), C.preventDefault()))
        }),
        onKeyDown: ie(a.onKeyDown, (C) => {
          const E = h.current !== ''
          ;(!(C.ctrlKey || C.altKey || C.metaKey) && C.key.length === 1 && w(C.key),
            !(E && C.key === ' ') && VD.includes(C.key) && (N(), C.preventDefault()))
        }),
      }),
    })
  })
$b.displayName = zb
var Wb = 'SelectValue',
  Ub = v.forwardRef((e, t) => {
    const { __scopeSelect: r, className: s, style: a, children: l, placeholder: u = '', ...f } = e,
      p = zr(Wb, r),
      { onValueNodeHasChildrenChange: g } = p,
      x = l !== void 0,
      h = ke(t, p.onValueNodeChange)
    return (
      wt(() => {
        g(x)
      }, [g, x]),
      d.jsx(Ne.span, {
        ...f,
        ref: h,
        style: { pointerEvents: 'none' },
        children: d1(p.value) ? d.jsx(d.Fragment, { children: u }) : l,
      })
    )
  })
Ub.displayName = Wb
var HD = 'SelectIcon',
  Hb = v.forwardRef((e, t) => {
    const { __scopeSelect: r, children: s, ...a } = e
    return d.jsx(Ne.span, { 'aria-hidden': !0, ...a, ref: t, children: s || '▼' })
  })
Hb.displayName = HD
var GD = 'SelectPortal',
  Gb = (e) => d.jsx(hs, { asChild: !0, ...e })
Gb.displayName = GD
var xo = 'SelectContent',
  Kb = v.forwardRef((e, t) => {
    const r = zr(xo, e.__scopeSelect),
      [s, a] = v.useState()
    if (
      (wt(() => {
        a(new DocumentFragment())
      }, []),
      !r.open)
    ) {
      const l = s
      return l
        ? Di.createPortal(
            d.jsx(Yb, {
              scope: e.__scopeSelect,
              children: d.jsx(cc.Slot, {
                scope: e.__scopeSelect,
                children: d.jsx('div', { children: e.children }),
              }),
            }),
            l
          )
        : null
    }
    return d.jsx(Xb, { ...e, ref: t })
  })
Kb.displayName = xo
var mn = 10,
  [Yb, $r] = xs(xo),
  KD = 'SelectContentImpl',
  YD = AD('SelectContent.RemoveScroll'),
  Xb = v.forwardRef((e, t) => {
    const {
        __scopeSelect: r,
        position: s = 'item-aligned',
        onCloseAutoFocus: a,
        onEscapeKeyDown: l,
        onPointerDownOutside: u,
        side: f,
        sideOffset: p,
        align: g,
        alignOffset: x,
        arrowPadding: h,
        collisionBoundary: w,
        collisionPadding: S,
        sticky: N,
        hideWhenDetached: C,
        avoidCollisions: E,
        ...P
      } = e,
      j = zr(xo, r),
      [k, _] = v.useState(null),
      [I, B] = v.useState(null),
      z = ke(t, (Y) => _(Y)),
      [W, oe] = v.useState(null),
      [ne, me] = v.useState(null),
      te = uc(r),
      [ue, fe] = v.useState(!1),
      xe = v.useRef(!1)
    ;(v.useEffect(() => {
      if (k) return tc(k)
    }, [k]),
      Yl())
    const X = v.useCallback(
        (Y) => {
          const [ee, ...we] = te().map((Me) => Me.ref.current),
            [Se] = we.slice(-1),
            Te = document.activeElement
          for (const Me of Y)
            if (
              Me === Te ||
              (Me?.scrollIntoView({ block: 'nearest' }),
              Me === ee && I && (I.scrollTop = 0),
              Me === Se && I && (I.scrollTop = I.scrollHeight),
              Me?.focus(),
              document.activeElement !== Te)
            )
              return
        },
        [te, I]
      ),
      q = v.useCallback(() => X([W, k]), [X, W, k])
    v.useEffect(() => {
      ue && q()
    }, [ue, q])
    const { onOpenChange: L, triggerPointerDownPosRef: V } = j
    ;(v.useEffect(() => {
      if (k) {
        let Y = { x: 0, y: 0 }
        const ee = (Se) => {
            Y = {
              x: Math.abs(Math.round(Se.pageX) - (V.current?.x ?? 0)),
              y: Math.abs(Math.round(Se.pageY) - (V.current?.y ?? 0)),
            }
          },
          we = (Se) => {
            ;(Y.x <= 10 && Y.y <= 10 ? Se.preventDefault() : k.contains(Se.target) || L(!1),
              document.removeEventListener('pointermove', ee),
              (V.current = null))
          }
        return (
          V.current !== null &&
            (document.addEventListener('pointermove', ee),
            document.addEventListener('pointerup', we, { capture: !0, once: !0 })),
          () => {
            ;(document.removeEventListener('pointermove', ee),
              document.removeEventListener('pointerup', we, { capture: !0 }))
          }
        )
      }
    }, [k, L, V]),
      v.useEffect(() => {
        const Y = () => L(!1)
        return (
          window.addEventListener('blur', Y),
          window.addEventListener('resize', Y),
          () => {
            ;(window.removeEventListener('blur', Y), window.removeEventListener('resize', Y))
          }
        )
      }, [L]))
    const [U, A] = f1((Y) => {
        const ee = te().filter((Te) => !Te.disabled),
          we = ee.find((Te) => Te.ref.current === document.activeElement),
          Se = p1(ee, Y, we)
        Se && setTimeout(() => Se.ref.current.focus())
      }),
      $ = v.useCallback(
        (Y, ee, we) => {
          const Se = !xe.current && !we
          ;((j.value !== void 0 && j.value === ee) || Se) && (oe(Y), Se && (xe.current = !0))
        },
        [j.value]
      ),
      J = v.useCallback(() => k?.focus(), [k]),
      re = v.useCallback(
        (Y, ee, we) => {
          const Se = !xe.current && !we
          ;((j.value !== void 0 && j.value === ee) || Se) && me(Y)
        },
        [j.value]
      ),
      le = s === 'popper' ? nf : qb,
      he =
        le === nf
          ? {
              side: f,
              sideOffset: p,
              align: g,
              alignOffset: x,
              arrowPadding: h,
              collisionBoundary: w,
              collisionPadding: S,
              sticky: N,
              hideWhenDetached: C,
              avoidCollisions: E,
            }
          : {}
    return d.jsx(Yb, {
      scope: r,
      content: k,
      viewport: I,
      onViewportChange: B,
      itemRefCallback: $,
      selectedItem: W,
      onItemLeave: J,
      itemTextRefCallback: re,
      focusSelectedItem: q,
      selectedItemText: ne,
      position: s,
      isPositioned: ue,
      searchRef: U,
      children: d.jsx(Fi, {
        as: YD,
        allowPinchZoom: !0,
        children: d.jsx(Ii, {
          asChild: !0,
          trapped: j.open,
          onMountAutoFocus: (Y) => {
            Y.preventDefault()
          },
          onUnmountAutoFocus: ie(a, (Y) => {
            ;(j.trigger?.focus({ preventScroll: !0 }), Y.preventDefault())
          }),
          children: d.jsx(fs, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: l,
            onPointerDownOutside: u,
            onFocusOutside: (Y) => Y.preventDefault(),
            onDismiss: () => j.onOpenChange(!1),
            children: d.jsx(le, {
              role: 'listbox',
              id: j.contentId,
              'data-state': j.open ? 'open' : 'closed',
              dir: j.dir,
              onContextMenu: (Y) => Y.preventDefault(),
              ...P,
              ...he,
              onPlaced: () => fe(!0),
              ref: z,
              style: { display: 'flex', flexDirection: 'column', outline: 'none', ...P.style },
              onKeyDown: ie(P.onKeyDown, (Y) => {
                const ee = Y.ctrlKey || Y.altKey || Y.metaKey
                if (
                  (Y.key === 'Tab' && Y.preventDefault(),
                  !ee && Y.key.length === 1 && A(Y.key),
                  ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(Y.key))
                ) {
                  let Se = te()
                    .filter((Te) => !Te.disabled)
                    .map((Te) => Te.ref.current)
                  if (
                    (['ArrowUp', 'End'].includes(Y.key) && (Se = Se.slice().reverse()),
                    ['ArrowUp', 'ArrowDown'].includes(Y.key))
                  ) {
                    const Te = Y.target,
                      Me = Se.indexOf(Te)
                    Se = Se.slice(Me + 1)
                  }
                  ;(setTimeout(() => X(Se)), Y.preventDefault())
                }
              }),
            }),
          }),
        }),
      }),
    })
  })
Xb.displayName = KD
var XD = 'SelectItemAlignedPosition',
  qb = v.forwardRef((e, t) => {
    const { __scopeSelect: r, onPlaced: s, ...a } = e,
      l = zr(xo, r),
      u = $r(xo, r),
      [f, p] = v.useState(null),
      [g, x] = v.useState(null),
      h = ke(t, (z) => x(z)),
      w = uc(r),
      S = v.useRef(!1),
      N = v.useRef(!0),
      { viewport: C, selectedItem: E, selectedItemText: P, focusSelectedItem: j } = u,
      k = v.useCallback(() => {
        if (l.trigger && l.valueNode && f && g && C && E && P) {
          const z = l.trigger.getBoundingClientRect(),
            W = g.getBoundingClientRect(),
            oe = l.valueNode.getBoundingClientRect(),
            ne = P.getBoundingClientRect()
          if (l.dir !== 'rtl') {
            const Te = ne.left - W.left,
              Me = oe.left - Te,
              Je = z.left - Me,
              bt = z.width + Je,
              er = Math.max(bt, W.width),
              Dn = window.innerWidth - mn,
              Dt = vy(Me, [mn, Math.max(mn, Dn - er)])
            ;((f.style.minWidth = bt + 'px'), (f.style.left = Dt + 'px'))
          } else {
            const Te = W.right - ne.right,
              Me = window.innerWidth - oe.right - Te,
              Je = window.innerWidth - z.right - Me,
              bt = z.width + Je,
              er = Math.max(bt, W.width),
              Dn = window.innerWidth - mn,
              Dt = vy(Me, [mn, Math.max(mn, Dn - er)])
            ;((f.style.minWidth = bt + 'px'), (f.style.right = Dt + 'px'))
          }
          const me = w(),
            te = window.innerHeight - mn * 2,
            ue = C.scrollHeight,
            fe = window.getComputedStyle(g),
            xe = parseInt(fe.borderTopWidth, 10),
            X = parseInt(fe.paddingTop, 10),
            q = parseInt(fe.borderBottomWidth, 10),
            L = parseInt(fe.paddingBottom, 10),
            V = xe + X + ue + L + q,
            U = Math.min(E.offsetHeight * 5, V),
            A = window.getComputedStyle(C),
            $ = parseInt(A.paddingTop, 10),
            J = parseInt(A.paddingBottom, 10),
            re = z.top + z.height / 2 - mn,
            le = te - re,
            he = E.offsetHeight / 2,
            Y = E.offsetTop + he,
            ee = xe + X + Y,
            we = V - ee
          if (ee <= re) {
            const Te = me.length > 0 && E === me[me.length - 1].ref.current
            f.style.bottom = '0px'
            const Me = g.clientHeight - C.offsetTop - C.offsetHeight,
              Je = Math.max(le, he + (Te ? J : 0) + Me + q),
              bt = ee + Je
            f.style.height = bt + 'px'
          } else {
            const Te = me.length > 0 && E === me[0].ref.current
            f.style.top = '0px'
            const Je = Math.max(re, xe + C.offsetTop + (Te ? $ : 0) + he) + we
            ;((f.style.height = Je + 'px'), (C.scrollTop = ee - re + C.offsetTop))
          }
          ;((f.style.margin = `${mn}px 0`),
            (f.style.minHeight = U + 'px'),
            (f.style.maxHeight = te + 'px'),
            s?.(),
            requestAnimationFrame(() => (S.current = !0)))
        }
      }, [w, l.trigger, l.valueNode, f, g, C, E, P, l.dir, s])
    wt(() => k(), [k])
    const [_, I] = v.useState()
    wt(() => {
      g && I(window.getComputedStyle(g).zIndex)
    }, [g])
    const B = v.useCallback(
      (z) => {
        z && N.current === !0 && (k(), j?.(), (N.current = !1))
      },
      [k, j]
    )
    return d.jsx(QD, {
      scope: r,
      contentWrapper: f,
      shouldExpandOnScrollRef: S,
      onScrollButtonChange: B,
      children: d.jsx('div', {
        ref: p,
        style: { display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: _ },
        children: d.jsx(Ne.div, {
          ...a,
          ref: h,
          style: { boxSizing: 'border-box', maxHeight: '100%', ...a.style },
        }),
      }),
    })
  })
qb.displayName = XD
var qD = 'SelectPopperPosition',
  nf = v.forwardRef((e, t) => {
    const { __scopeSelect: r, align: s = 'start', collisionPadding: a = mn, ...l } = e,
      u = dc(r)
    return d.jsx(Jl, {
      ...u,
      ...l,
      ref: t,
      align: s,
      collisionPadding: a,
      style: {
        boxSizing: 'border-box',
        ...l.style,
        '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    })
  })
nf.displayName = qD
var [QD, Ep] = xs(xo, {}),
  rf = 'SelectViewport',
  Qb = v.forwardRef((e, t) => {
    const { __scopeSelect: r, nonce: s, ...a } = e,
      l = $r(rf, r),
      u = Ep(rf, r),
      f = ke(t, l.onViewportChange),
      p = v.useRef(0)
    return d.jsxs(d.Fragment, {
      children: [
        d.jsx('style', {
          dangerouslySetInnerHTML: {
            __html:
              '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
          },
          nonce: s,
        }),
        d.jsx(cc.Slot, {
          scope: r,
          children: d.jsx(Ne.div, {
            'data-radix-select-viewport': '',
            role: 'presentation',
            ...a,
            ref: f,
            style: { position: 'relative', flex: 1, overflow: 'hidden auto', ...a.style },
            onScroll: ie(a.onScroll, (g) => {
              const x = g.currentTarget,
                { contentWrapper: h, shouldExpandOnScrollRef: w } = u
              if (w?.current && h) {
                const S = Math.abs(p.current - x.scrollTop)
                if (S > 0) {
                  const N = window.innerHeight - mn * 2,
                    C = parseFloat(h.style.minHeight),
                    E = parseFloat(h.style.height),
                    P = Math.max(C, E)
                  if (P < N) {
                    const j = P + S,
                      k = Math.min(N, j),
                      _ = j - k
                    ;((h.style.height = k + 'px'),
                      h.style.bottom === '0px' &&
                        ((x.scrollTop = _ > 0 ? _ : 0), (h.style.justifyContent = 'flex-end')))
                  }
                }
              }
              p.current = x.scrollTop
            }),
          }),
        }),
      ],
    })
  })
Qb.displayName = rf
var Zb = 'SelectGroup',
  [ZD, JD] = xs(Zb),
  eI = v.forwardRef((e, t) => {
    const { __scopeSelect: r, ...s } = e,
      a = Xn()
    return d.jsx(ZD, {
      scope: r,
      id: a,
      children: d.jsx(Ne.div, { role: 'group', 'aria-labelledby': a, ...s, ref: t }),
    })
  })
eI.displayName = Zb
var Jb = 'SelectLabel',
  e1 = v.forwardRef((e, t) => {
    const { __scopeSelect: r, ...s } = e,
      a = JD(Jb, r)
    return d.jsx(Ne.div, { id: a.id, ...s, ref: t })
  })
e1.displayName = Jb
var Bl = 'SelectItem',
  [tI, t1] = xs(Bl),
  n1 = v.forwardRef((e, t) => {
    const { __scopeSelect: r, value: s, disabled: a = !1, textValue: l, ...u } = e,
      f = zr(Bl, r),
      p = $r(Bl, r),
      g = f.value === s,
      [x, h] = v.useState(l ?? ''),
      [w, S] = v.useState(!1),
      N = ke(t, (j) => p.itemRefCallback?.(j, s, a)),
      C = Xn(),
      E = v.useRef('touch'),
      P = () => {
        a || (f.onValueChange(s), f.onOpenChange(!1))
      }
    if (s === '')
      throw new Error(
        'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.'
      )
    return d.jsx(tI, {
      scope: r,
      value: s,
      disabled: a,
      textId: C,
      isSelected: g,
      onItemTextChange: v.useCallback((j) => {
        h((k) => k || (j?.textContent ?? '').trim())
      }, []),
      children: d.jsx(cc.ItemSlot, {
        scope: r,
        value: s,
        disabled: a,
        textValue: x,
        children: d.jsx(Ne.div, {
          role: 'option',
          'aria-labelledby': C,
          'data-highlighted': w ? '' : void 0,
          'aria-selected': g && w,
          'data-state': g ? 'checked' : 'unchecked',
          'aria-disabled': a || void 0,
          'data-disabled': a ? '' : void 0,
          tabIndex: a ? void 0 : -1,
          ...u,
          ref: N,
          onFocus: ie(u.onFocus, () => S(!0)),
          onBlur: ie(u.onBlur, () => S(!1)),
          onClick: ie(u.onClick, () => {
            E.current !== 'mouse' && P()
          }),
          onPointerUp: ie(u.onPointerUp, () => {
            E.current === 'mouse' && P()
          }),
          onPointerDown: ie(u.onPointerDown, (j) => {
            E.current = j.pointerType
          }),
          onPointerMove: ie(u.onPointerMove, (j) => {
            ;((E.current = j.pointerType),
              a
                ? p.onItemLeave?.()
                : E.current === 'mouse' && j.currentTarget.focus({ preventScroll: !0 }))
          }),
          onPointerLeave: ie(u.onPointerLeave, (j) => {
            j.currentTarget === document.activeElement && p.onItemLeave?.()
          }),
          onKeyDown: ie(u.onKeyDown, (j) => {
            ;(p.searchRef?.current !== '' && j.key === ' ') ||
              (BD.includes(j.key) && P(), j.key === ' ' && j.preventDefault())
          }),
        }),
      }),
    })
  })
n1.displayName = Bl
var mi = 'SelectItemText',
  r1 = v.forwardRef((e, t) => {
    const { __scopeSelect: r, className: s, style: a, ...l } = e,
      u = zr(mi, r),
      f = $r(mi, r),
      p = t1(mi, r),
      g = UD(mi, r),
      [x, h] = v.useState(null),
      w = ke(
        t,
        (P) => h(P),
        p.onItemTextChange,
        (P) => f.itemTextRefCallback?.(P, p.value, p.disabled)
      ),
      S = x?.textContent,
      N = v.useMemo(
        () => d.jsx('option', { value: p.value, disabled: p.disabled, children: S }, p.value),
        [p.disabled, p.value, S]
      ),
      { onNativeOptionAdd: C, onNativeOptionRemove: E } = g
    return (
      wt(() => (C(N), () => E(N)), [C, E, N]),
      d.jsxs(d.Fragment, {
        children: [
          d.jsx(Ne.span, { id: p.textId, ...l, ref: w }),
          p.isSelected && u.valueNode && !u.valueNodeHasChildren
            ? Di.createPortal(l.children, u.valueNode)
            : null,
        ],
      })
    )
  })
r1.displayName = mi
var o1 = 'SelectItemIndicator',
  s1 = v.forwardRef((e, t) => {
    const { __scopeSelect: r, ...s } = e
    return t1(o1, r).isSelected ? d.jsx(Ne.span, { 'aria-hidden': !0, ...s, ref: t }) : null
  })
s1.displayName = o1
var of = 'SelectScrollUpButton',
  i1 = v.forwardRef((e, t) => {
    const r = $r(of, e.__scopeSelect),
      s = Ep(of, e.__scopeSelect),
      [a, l] = v.useState(!1),
      u = ke(t, s.onScrollButtonChange)
    return (
      wt(() => {
        if (r.viewport && r.isPositioned) {
          let f = function () {
            const g = p.scrollTop > 0
            l(g)
          }
          const p = r.viewport
          return (f(), p.addEventListener('scroll', f), () => p.removeEventListener('scroll', f))
        }
      }, [r.viewport, r.isPositioned]),
      a
        ? d.jsx(l1, {
            ...e,
            ref: u,
            onAutoScroll: () => {
              const { viewport: f, selectedItem: p } = r
              f && p && (f.scrollTop = f.scrollTop - p.offsetHeight)
            },
          })
        : null
    )
  })
i1.displayName = of
var sf = 'SelectScrollDownButton',
  a1 = v.forwardRef((e, t) => {
    const r = $r(sf, e.__scopeSelect),
      s = Ep(sf, e.__scopeSelect),
      [a, l] = v.useState(!1),
      u = ke(t, s.onScrollButtonChange)
    return (
      wt(() => {
        if (r.viewport && r.isPositioned) {
          let f = function () {
            const g = p.scrollHeight - p.clientHeight,
              x = Math.ceil(p.scrollTop) < g
            l(x)
          }
          const p = r.viewport
          return (f(), p.addEventListener('scroll', f), () => p.removeEventListener('scroll', f))
        }
      }, [r.viewport, r.isPositioned]),
      a
        ? d.jsx(l1, {
            ...e,
            ref: u,
            onAutoScroll: () => {
              const { viewport: f, selectedItem: p } = r
              f && p && (f.scrollTop = f.scrollTop + p.offsetHeight)
            },
          })
        : null
    )
  })
a1.displayName = sf
var l1 = v.forwardRef((e, t) => {
    const { __scopeSelect: r, onAutoScroll: s, ...a } = e,
      l = $r('SelectScrollButton', r),
      u = v.useRef(null),
      f = uc(r),
      p = v.useCallback(() => {
        u.current !== null && (window.clearInterval(u.current), (u.current = null))
      }, [])
    return (
      v.useEffect(() => () => p(), [p]),
      wt(() => {
        f()
          .find((x) => x.ref.current === document.activeElement)
          ?.ref.current?.scrollIntoView({ block: 'nearest' })
      }, [f]),
      d.jsx(Ne.div, {
        'aria-hidden': !0,
        ...a,
        ref: t,
        style: { flexShrink: 0, ...a.style },
        onPointerDown: ie(a.onPointerDown, () => {
          u.current === null && (u.current = window.setInterval(s, 50))
        }),
        onPointerMove: ie(a.onPointerMove, () => {
          ;(l.onItemLeave?.(), u.current === null && (u.current = window.setInterval(s, 50)))
        }),
        onPointerLeave: ie(a.onPointerLeave, () => {
          p()
        }),
      })
    )
  }),
  nI = 'SelectSeparator',
  c1 = v.forwardRef((e, t) => {
    const { __scopeSelect: r, ...s } = e
    return d.jsx(Ne.div, { 'aria-hidden': !0, ...s, ref: t })
  })
c1.displayName = nI
var af = 'SelectArrow',
  rI = v.forwardRef((e, t) => {
    const { __scopeSelect: r, ...s } = e,
      a = dc(r),
      l = zr(af, r),
      u = $r(af, r)
    return l.open && u.position === 'popper' ? d.jsx(ec, { ...a, ...s, ref: t }) : null
  })
rI.displayName = af
var oI = 'SelectBubbleInput',
  u1 = v.forwardRef(({ __scopeSelect: e, value: t, ...r }, s) => {
    const a = v.useRef(null),
      l = ke(s, a),
      u = Rw(t)
    return (
      v.useEffect(() => {
        const f = a.current
        if (!f) return
        const p = window.HTMLSelectElement.prototype,
          x = Object.getOwnPropertyDescriptor(p, 'value').set
        if (u !== t && x) {
          const h = new Event('change', { bubbles: !0 })
          ;(x.call(f, t), f.dispatchEvent(h))
        }
      }, [u, t]),
      d.jsx(Ne.select, { ...r, style: { ...Fb, ...r.style }, ref: l, defaultValue: t })
    )
  })
u1.displayName = oI
function d1(e) {
  return e === '' || e === void 0
}
function f1(e) {
  const t = qn(e),
    r = v.useRef(''),
    s = v.useRef(0),
    a = v.useCallback(
      (u) => {
        const f = r.current + u
        ;(t(f),
          (function p(g) {
            ;((r.current = g),
              window.clearTimeout(s.current),
              g !== '' && (s.current = window.setTimeout(() => p(''), 1e3)))
          })(f))
      },
      [t]
    ),
    l = v.useCallback(() => {
      ;((r.current = ''), window.clearTimeout(s.current))
    }, [])
  return (v.useEffect(() => () => window.clearTimeout(s.current), []), [r, a, l])
}
function p1(e, t, r) {
  const a = t.length > 1 && Array.from(t).every((g) => g === t[0]) ? t[0] : t,
    l = r ? e.indexOf(r) : -1
  let u = sI(e, Math.max(l, 0))
  a.length === 1 && (u = u.filter((g) => g !== r))
  const p = u.find((g) => g.textValue.toLowerCase().startsWith(a.toLowerCase()))
  return p !== r ? p : void 0
}
function sI(e, t) {
  return e.map((r, s) => e[(t + s) % e.length])
}
var iI = Bb,
  m1 = $b,
  aI = Ub,
  lI = Hb,
  cI = Gb,
  h1 = Kb,
  uI = Qb,
  g1 = e1,
  v1 = n1,
  dI = r1,
  fI = s1,
  y1 = i1,
  x1 = a1,
  w1 = c1
const b1 = iI,
  S1 = aI,
  Np = v.forwardRef(({ className: e, children: t, ...r }, s) =>
    d.jsxs(m1, {
      ref: s,
      className: Ie(
        'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        e
      ),
      ...r,
      children: [
        t,
        d.jsx(lI, { asChild: !0, children: d.jsx(pf, { className: 'h-4 w-4 opacity-50' }) }),
      ],
    })
  )
Np.displayName = m1.displayName
const C1 = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx(y1, {
    ref: r,
    className: Ie('flex cursor-default items-center justify-center py-1', e),
    ...t,
    children: d.jsx(Cy, { className: 'h-4 w-4' }),
  })
)
C1.displayName = y1.displayName
const E1 = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx(x1, {
    ref: r,
    className: Ie('flex cursor-default items-center justify-center py-1', e),
    ...t,
    children: d.jsx(pf, { className: 'h-4 w-4' }),
  })
)
E1.displayName = x1.displayName
const Pp = v.forwardRef(({ className: e, children: t, position: r = 'popper', ...s }, a) =>
  d.jsx(cI, {
    children: d.jsxs(h1, {
      ref: a,
      className: Ie(
        'relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]',
        r === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        e
      ),
      position: r,
      ...s,
      children: [
        d.jsx(C1, {}),
        d.jsx(uI, {
          className: Ie(
            'p-1',
            r === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          ),
          children: t,
        }),
        d.jsx(E1, {}),
      ],
    }),
  })
)
Pp.displayName = h1.displayName
const pI = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx(g1, { ref: r, className: Ie('px-2 py-1.5 text-sm font-semibold', e), ...t })
)
pI.displayName = g1.displayName
const zt = v.forwardRef(({ className: e, children: t, ...r }, s) =>
  d.jsxs(v1, {
    ref: s,
    className: Ie(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    ...r,
    children: [
      d.jsx('span', {
        className: 'absolute right-2 flex h-3.5 w-3.5 items-center justify-center',
        children: d.jsx(fI, { children: d.jsx(ff, { className: 'h-4 w-4' }) }),
      }),
      d.jsx(dI, { children: t }),
    ],
  })
)
zt.displayName = v1.displayName
const mI = v.forwardRef(({ className: e, ...t }, r) =>
  d.jsx(w1, { ref: r, className: Ie('-mx-1 my-1 h-px bg-muted', e), ...t })
)
mI.displayName = w1.displayName
function hI({ trigger: e }) {
  const [t, r] = v.useState(!1),
    [s, a] = v.useState({}),
    [l, u] = v.useState(!1),
    [f, p] = v.useState('frontend'),
    [g, x] = v.useState(!1),
    h = async (w) => {
      w.preventDefault()
      const S = new FormData(w.currentTarget),
        N = S.get('name')?.trim(),
        C = S.get('email')?.trim(),
        E = S.get('url')?.trim(),
        P = S.get('about')?.trim(),
        j = {}
      if (
        (N || (j.name = 'Name is required'),
        C || (j.email = 'Email is required'),
        E || (j.url = 'Portfolio/GitHub URL is required'),
        P || (j.about = 'Please tell us about yourself'),
        Object.keys(j).length > 0)
      ) {
        a(j)
        return
      }
      u(!0)
      try {
        const k = await fetch('/api/forms/developer-application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name: N, email: C, url: E, expertise: f, about: P, available: g }),
        })
        if (!k.ok) {
          const _ = await k.json().catch(() => ({}))
          Nt.error(_.error ?? 'Something went wrong. Please try again.')
          return
        }
        ;(Nt.success("Application submitted. We'll be in touch."),
          r(!1),
          a({}),
          x(!1),
          p('frontend'),
          w.target.reset())
      } catch {
        Nt.error('Network error. Please try again.')
      } finally {
        u(!1)
      }
    }
  return d.jsxs(Bi, {
    open: t,
    onOpenChange: r,
    children: [
      d.jsx(zi, { asChild: !0, children: e }),
      d.jsxs(vs, {
        className: 'sm:max-w-[500px] border-border bg-card max-h-[90vh] overflow-y-auto',
        children: [
          d.jsxs($i, {
            children: [
              d.jsx(ys, { className: 'text-xl', children: 'Crown Labs Developer Application' }),
              d.jsx(Wi, { children: 'Join the team building applied intelligence systems.' }),
            ],
          }),
          d.jsxs('form', {
            onSubmit: h,
            className: 'space-y-6 pt-4',
            children: [
              d.jsxs('div', {
                className: 'space-y-4',
                children: [
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'da-name', children: 'Full Name *' }),
                      d.jsx(rn, {
                        id: 'da-name',
                        name: 'name',
                        placeholder: 'Ada Lovelace',
                        className: 'border-border bg-background',
                      }),
                      s.name &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: s.name }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'da-email', children: 'Email address *' }),
                      d.jsx(rn, {
                        id: 'da-email',
                        name: 'email',
                        type: 'email',
                        placeholder: 'ada@example.com',
                        className: 'border-border bg-background',
                      }),
                      s.email &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: s.email }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'da-url', children: 'GitHub or Portfolio URL *' }),
                      d.jsx(rn, {
                        id: 'da-url',
                        name: 'url',
                        placeholder: 'https://github.com/...',
                        className: 'border-border bg-background',
                      }),
                      s.url &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: s.url }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { children: 'Primary expertise' }),
                      d.jsxs(b1, {
                        value: f,
                        onValueChange: p,
                        children: [
                          d.jsx(Np, {
                            className: 'border-border bg-background',
                            children: d.jsx(S1, { placeholder: 'Select expertise' }),
                          }),
                          d.jsxs(Pp, {
                            children: [
                              d.jsx(zt, { value: 'ai', children: 'AI / ML' }),
                              d.jsx(zt, { value: 'security', children: 'Security' }),
                              d.jsx(zt, { value: 'frontend', children: 'Frontend' }),
                              d.jsx(zt, { value: 'backend', children: 'Backend' }),
                              d.jsx(zt, { value: 'mobile', children: 'Mobile' }),
                              d.jsx(zt, { value: 'forensics', children: 'Forensics' }),
                              d.jsx(zt, { value: 'other', children: 'Other' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'da-about', children: 'Tell us about yourself *' }),
                      d.jsx(Ui, {
                        id: 'da-about',
                        name: 'about',
                        placeholder: 'What are you building? What drives you?',
                        className: 'border-border bg-background min-h-[100px]',
                      }),
                      s.about &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: s.about }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'flex items-center space-x-2 pt-2',
                    children: [
                      d.jsx(ic, { id: 'da-available', checked: g, onCheckedChange: (w) => x(!!w) }),
                      d.jsx(qe, {
                        htmlFor: 'da-available',
                        className: 'text-sm font-normal cursor-pointer',
                        children: "I'm available for contract or full-time work",
                      }),
                    ],
                  }),
                ],
              }),
              d.jsx(Lr, {
                type: 'submit',
                disabled: l,
                className: 'w-full bg-primary text-primary-foreground hover:bg-primary/90',
                children: l
                  ? d.jsxs(d.Fragment, {
                      children: [
                        d.jsx(ki, { className: 'h-4 w-4 mr-2 animate-spin' }),
                        'Submitting...',
                      ],
                    })
                  : 'Submit application',
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
function Td({ value: e }) {
  const [t, r] = v.useState(0),
    s = v.useRef(null),
    a = Zf(s, { once: !0 })
  return (
    v.useEffect(() => {
      if (a) {
        let l = 0
        const u = e
        if (l === u) return
        const f = 2e3
        let p = null
        const g = (x) => {
          p || (p = x)
          const h = Math.min((x - p) / f, 1),
            w = h * (2 - h)
          ;(r(Math.floor(w * (u - l) + l)), h < 1 && window.requestAnimationFrame(g))
        }
        window.requestAnimationFrame(g)
      }
    }, [a, e]),
    d.jsx('span', { ref: s, children: t })
  )
}
const lo = wi.find((e) => e.flagship)
function gI() {
  const e = wi.length,
    t = wi.filter((l) => l.status === 'Beta' || l.status === 'Stage 1 Beta').length,
    r = wi.filter((l) => l.status === 'Concept').length,
    a = 'Applied Intelligence Studio for Real-World Product Outcomes'.split(' ')
  return d.jsx('section', {
    className: 'relative pt-28 pb-16 px-4 sm:px-6',
    children: d.jsx('div', {
      className: 'max-w-7xl mx-auto',
      children: d.jsxs('div', {
        className: 'grid lg:grid-cols-2 gap-12 items-start',
        children: [
          d.jsxs('div', {
            className: 'space-y-6',
            children: [
              d.jsx('p', {
                className: 'text-xs font-semibold tracking-widest uppercase text-muted-foreground',
                children: 'Crown Labs',
              }),
              d.jsx('h1', {
                className:
                  'text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground flex flex-wrap gap-x-3 gap-y-2',
                children: a.map((l, u) =>
                  d.jsx(
                    ft.span,
                    {
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.5, delay: u * 0.1 },
                      children: l,
                    },
                    u
                  )
                ),
              }),
              d.jsx('p', {
                className: 'text-base text-muted-foreground font-medium',
                children:
                  'Shipping evidence-ready platforms, behavioral systems, and defensible IP.',
              }),
              d.jsx('p', {
                className: 'text-sm text-muted-foreground leading-relaxed',
                children:
                  'Crown Labs is a vertically integrated product studio building applied intelligence systems across security, forensics, behavioral psychology, emotionally intelligent marketing, and relationship frameworks.',
              }),
              d.jsx('p', {
                className: 'text-sm font-semibold text-foreground leading-relaxed',
                children:
                  'Every product is designed to stand alone while compounding the value of a coordinated, interoperable ecosystem.',
              }),
              d.jsxs('div', {
                className: 'flex flex-wrap gap-3 pt-2',
                children: [
                  d.jsxs('a', {
                    href: '#portfolio',
                    className:
                      'inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity',
                    children: ['See the portfolio', d.jsx($C, { className: 'h-4 w-4' })],
                  }),
                  d.jsx(Jd, {
                    trigger: d.jsx('button', {
                      className:
                        'inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border text-sm text-foreground hover:bg-card transition-colors',
                      children: 'Beta Testers',
                    }),
                  }),
                  d.jsx(hI, {
                    trigger: d.jsx('button', {
                      className:
                        'inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border text-sm text-foreground hover:bg-card transition-colors',
                      children: 'Become A Crown Labs Developer',
                    }),
                  }),
                ],
              }),
              d.jsxs('div', {
                className: 'grid grid-cols-3 gap-4 pt-4',
                children: [
                  d.jsxs('div', {
                    className: 'rounded-xl border border-border bg-card p-4',
                    children: [
                      d.jsxs('div', {
                        className: 'flex items-center gap-2 mb-2',
                        children: [
                          d.jsx(ZC, { className: 'h-4 w-4 text-muted-foreground' }),
                          d.jsx('p', {
                            className:
                              'text-[10px] uppercase tracking-widest text-muted-foreground',
                            children: 'Total products',
                          }),
                        ],
                      }),
                      d.jsx('p', {
                        className: 'text-3xl font-bold text-foreground',
                        children: d.jsx(Td, { value: e }),
                      }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'rounded-xl border border-border bg-card p-4',
                    children: [
                      d.jsxs('div', {
                        className: 'flex items-center gap-2 mb-2',
                        children: [
                          d.jsx(zC, { className: 'h-4 w-4 text-muted-foreground' }),
                          d.jsx('p', {
                            className:
                              'text-[10px] uppercase tracking-widest text-muted-foreground',
                            children: 'Active beta builds',
                          }),
                        ],
                      }),
                      d.jsx('p', {
                        className: 'text-3xl font-bold text-foreground',
                        children: d.jsx(Td, { value: t }),
                      }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'rounded-xl border border-border bg-card p-4',
                    children: [
                      d.jsxs('div', {
                        className: 'flex items-center gap-2 mb-2',
                        children: [
                          d.jsx(lE, { className: 'h-4 w-4 text-muted-foreground' }),
                          d.jsx('p', {
                            className:
                              'text-[10px] uppercase tracking-widest text-muted-foreground',
                            children: 'Concepts in pipeline',
                          }),
                        ],
                      }),
                      d.jsx('p', {
                        className: 'text-3xl font-bold text-foreground',
                        children: d.jsx(Td, { value: r }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          d.jsx('div', {
            className: 'space-y-4',
            children: d.jsxs('div', {
              className: 'rounded-xl border border-border bg-card overflow-hidden',
              children: [
                d.jsxs('div', {
                  className: 'flex items-center justify-between px-5 py-3 border-b border-border',
                  children: [
                    d.jsx('p', {
                      className:
                        'text-[10px] font-semibold uppercase tracking-widest text-muted-foreground',
                      children: 'Flagship Intelligence',
                    }),
                    d.jsx('span', {
                      className:
                        'px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground',
                      children: 'Most Ready',
                    }),
                  ],
                }),
                d.jsxs('div', {
                  className: 'p-5 space-y-5',
                  children: [
                    d.jsxs('div', {
                      children: [
                        d.jsx('h2', {
                          className: 'text-xl font-bold text-foreground',
                          children: lo.name,
                        }),
                        d.jsx('p', {
                          className: 'mt-2 text-sm text-muted-foreground leading-relaxed',
                          children: "The flagship system leading the portfolio's readiness curve.",
                        }),
                      ],
                    }),
                    d.jsxs('div', {
                      className: 'rounded-lg border border-border bg-background/50 p-4 space-y-4',
                      children: [
                        d.jsxs('div', {
                          children: [
                            d.jsx('p', {
                              className:
                                'text-[10px] uppercase tracking-widest text-muted-foreground mb-1',
                              children: 'Readiness',
                            }),
                            d.jsx('p', {
                              className: 'text-sm font-semibold text-foreground',
                              children: lo.readiness?.stage,
                            }),
                          ],
                        }),
                        d.jsxs('div', {
                          children: [
                            d.jsx('p', {
                              className:
                                'text-[10px] uppercase tracking-widest text-muted-foreground mb-1',
                              children: 'Focus',
                            }),
                            d.jsx('p', {
                              className: 'text-sm font-semibold text-foreground',
                              children: lo.readiness?.focus,
                            }),
                          ],
                        }),
                        d.jsxs('div', {
                          children: [
                            d.jsx('p', {
                              className:
                                'text-[10px] uppercase tracking-widest text-muted-foreground mb-1',
                              children: 'Next Gate',
                            }),
                            d.jsx('p', {
                              className: 'text-sm font-semibold text-foreground',
                              children: lo.readiness?.nextGate,
                            }),
                          ],
                        }),
                      ],
                    }),
                    d.jsxs('div', {
                      className: 'flex flex-wrap gap-2',
                      children: [
                        d.jsxs('span', {
                          className:
                            'px-2.5 py-1 rounded-md border border-border text-xs text-muted-foreground',
                          children: ['Stage: ', lo.readiness?.stage],
                        }),
                        d.jsxs('span', {
                          className:
                            'px-2.5 py-1 rounded-md border border-border text-xs text-muted-foreground',
                          children: ['Focus: ', lo.readiness?.focus],
                        }),
                      ],
                    }),
                    d.jsxs('p', {
                      className: 'text-xs text-muted-foreground',
                      children: ['Next gate: ', lo.readiness?.nextGate],
                    }),
                    d.jsxs('div', {
                      className: 'rounded-lg border border-border bg-background/50 p-4',
                      children: [
                        d.jsx('p', {
                          className: 'text-sm font-semibold text-foreground mb-1',
                          children: 'Portfolio discipline',
                        }),
                        d.jsx('p', {
                          className: 'text-xs text-muted-foreground leading-relaxed',
                          children:
                            'Every product lists the single milestone that advances its next phase.',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  })
}
const vI = [
  {
    icon: d.jsx(sE, { className: 'h-5 w-5 text-primary' }),
    title: 'Architect of the Crown Labs stack',
    description:
      'Daren Prince designs the portfolio as a unified system, aligning applied intelligence, behavioral strategy, and defensible IP into one interoperable product studio.',
  },
  {
    icon: d.jsx(HC, { className: 'h-5 w-5 text-primary' }),
    title: 'Behavioral and intelligence focus',
    description:
      'The approach blends psychology, security, and intelligence analysis to ship products that perform in high-trust, real-world environments.',
  },
  {
    icon: d.jsx(QC, { className: 'h-5 w-5 text-primary' }),
    title: 'Evidence-ready execution',
    description:
      'Every asset is built with accountability, auditability, and operational clarity to support enterprise-grade outcomes.',
  },
  {
    icon: d.jsx(rE, { className: 'h-5 w-5 text-primary' }),
    title: 'Portfolio-level leverage',
    description:
      'Products are structured to stand alone while compounding the valuation of the entire ecosystem through strategic interoperability.',
  },
]
function yI() {
  return d.jsx('section', {
    className: 'py-20 px-4 sm:px-6 border-t border-border',
    children: d.jsxs('div', {
      className: 'max-w-7xl mx-auto',
      children: [
        d.jsxs('div', {
          className: 'mb-10',
          children: [
            d.jsxs('h2', {
              className: 'text-2xl sm:text-3xl font-bold',
              children: [
                'Meet the Founder & Chief Architect —',
                ' ',
                d.jsx('span', { className: 'text-primary', children: 'Daren Prince' }),
              ],
            }),
            d.jsx('p', {
              className: 'mt-2 text-sm text-muted-foreground',
              children: 'The strategic mind behind the Crown Labs ecosystem.',
            }),
          ],
        }),
        d.jsx('div', {
          className: 'grid sm:grid-cols-2 gap-4',
          children: vI.map((e, t) =>
            d.jsxs(
              'div',
              {
                className:
                  'rounded-xl border border-border bg-card p-6 space-y-3 hover:border-primary/30 transition-colors',
                children: [
                  d.jsxs('div', {
                    className: 'flex items-center gap-3',
                    children: [
                      e.icon,
                      d.jsx('h3', {
                        className: 'text-sm font-semibold text-foreground',
                        children: e.title,
                      }),
                    ],
                  }),
                  d.jsx('p', {
                    className: 'text-sm text-muted-foreground leading-relaxed',
                    children: e.description,
                  }),
                ],
              },
              t
            )
          ),
        }),
      ],
    }),
  })
}
const xI = [
    'Evidence-ready intelligence over hype.',
    'Behavioral insight grounded in psychology.',
    'Privacy-first systems with accountable outputs.',
    'Interoperable platforms that compound value.',
  ],
  wI = [
    'Revenue-ready or near-launch platforms.',
    'Mid-term scale assets for licensing or acquisition.',
    'High-upside IP positioned for defensible growth.',
    'Strategic interoperability across the stack.',
  ],
  bI = [
    'Evidence-ready outputs and audit trails.',
    'Behavioral modeling without manipulation.',
    'Operational clarity for high-trust environments.',
    'Consistent, premium-grade product readiness.',
    'Scalable technology with ethical guardrails.',
  ],
  SI = [
    'Narrative product descriptions with full context.',
    'Current and projected valuations per asset.',
    'Completion status, time-to-market, and revenue projections.',
  ]
function CI() {
  return d.jsx('section', {
    className: 'py-20 px-4 sm:px-6 border-t border-border bg-card/30',
    children: d.jsxs('div', {
      className: 'max-w-7xl mx-auto',
      children: [
        d.jsxs('div', {
          className: 'mb-10',
          children: [
            d.jsx('h2', {
              className: 'text-2xl sm:text-3xl font-bold text-foreground',
              children: 'Executive Overview',
            }),
            d.jsx('p', {
              className: 'mt-2 text-sm text-muted-foreground',
              children: 'A complete, uncompressed accounting of the Crown Labs portfolio.',
            }),
          ],
        }),
        d.jsxs('div', {
          className: 'grid md:grid-cols-2 gap-6',
          children: [
            d.jsxs('div', {
              className: 'rounded-xl border border-border bg-card p-6 space-y-4',
              children: [
                d.jsx('h3', {
                  className: 'text-base font-semibold text-foreground',
                  children: 'What This Portfolio Represents',
                }),
                d.jsx('p', {
                  className: 'text-sm text-muted-foreground leading-relaxed',
                  children:
                    'Crown Labs is a vertically integrated product studio focused on applied intelligence. Each asset is designed to be revenue-generating on its own while compounding the defensible value of the entire ecosystem.',
                }),
                d.jsx('p', {
                  className: 'text-sm text-muted-foreground leading-relaxed',
                  children:
                    'The portfolio spans AI intelligence engines, security and situational awareness systems, forensic analysis products, emotionally intelligent marketing, and relationship frameworks built for real-world outcomes.',
                }),
              ],
            }),
            d.jsxs('div', {
              className: 'rounded-xl border border-border bg-card p-6 space-y-4',
              children: [
                d.jsx('h3', {
                  className: 'text-base font-semibold text-foreground',
                  children: 'Design Intent',
                }),
                d.jsx('p', {
                  className: 'text-sm text-muted-foreground',
                  children:
                    'Nothing in this portfolio is speculative. Each asset is defined, structured, and positioned for scale.',
                }),
                d.jsx('ul', {
                  className: 'space-y-2',
                  children: xI.map((e, t) =>
                    d.jsxs(
                      'li',
                      {
                        className: 'flex items-start gap-2 text-sm text-muted-foreground',
                        children: [
                          d.jsx(sl, { className: 'h-4 w-4 text-primary mt-0.5 shrink-0' }),
                          e,
                        ],
                      },
                      t
                    )
                  ),
                }),
              ],
            }),
            d.jsxs('div', {
              className: 'rounded-xl border border-border bg-card p-6 space-y-4',
              children: [
                d.jsx('h3', {
                  className: 'text-base font-semibold text-foreground',
                  children: 'Portfolio Structure',
                }),
                d.jsx('p', {
                  className: 'text-sm text-muted-foreground',
                  children:
                    'Designed to balance immediate monetization with long-term enterprise value:',
                }),
                d.jsx('ul', {
                  className: 'space-y-2',
                  children: wI.map((e, t) =>
                    d.jsxs(
                      'li',
                      {
                        className: 'flex items-start gap-2 text-sm text-muted-foreground',
                        children: [
                          d.jsx(sl, { className: 'h-4 w-4 text-primary mt-0.5 shrink-0' }),
                          e,
                        ],
                      },
                      t
                    )
                  ),
                }),
              ],
            }),
            d.jsxs('div', {
              className: 'rounded-xl border border-border bg-card p-6 space-y-4',
              children: [
                d.jsx('h3', {
                  className: 'text-base font-semibold text-foreground',
                  children: 'Execution Discipline',
                }),
                d.jsx('ul', {
                  className: 'space-y-2',
                  children: bI.map((e, t) =>
                    d.jsxs(
                      'li',
                      {
                        className: 'flex items-start gap-2 text-sm text-muted-foreground',
                        children: [
                          d.jsx(sl, { className: 'h-4 w-4 text-primary mt-0.5 shrink-0' }),
                          e,
                        ],
                      },
                      t
                    )
                  ),
                }),
              ],
            }),
            d.jsx('div', {
              className: 'md:col-span-2 rounded-xl border border-border bg-card p-6',
              children: d.jsxs('div', {
                className: 'grid sm:grid-cols-2 gap-6',
                children: [
                  d.jsxs('div', {
                    className: 'space-y-3',
                    children: [
                      d.jsx('h3', {
                        className: 'text-base font-semibold text-foreground',
                        children: 'Portfolio Status',
                      }),
                      d.jsx('p', {
                        className: 'text-sm text-muted-foreground leading-relaxed',
                        children:
                          'Several platforms are revenue-ready or nearing launch, while others represent high-upside intellectual property positioned for scale, licensing, or acquisition.',
                      }),
                      d.jsx('p', {
                        className: 'text-sm text-muted-foreground leading-relaxed',
                        children:
                          'This report is the full, uncompressed accounting of the portfolio.',
                      }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-3',
                    children: [
                      d.jsx('h3', {
                        className: 'text-base font-semibold text-foreground',
                        children: "What you'll see",
                      }),
                      d.jsx('ul', {
                        className: 'space-y-2',
                        children: SI.map((e, t) =>
                          d.jsxs(
                            'li',
                            {
                              className: 'flex items-start gap-2 text-sm text-muted-foreground',
                              children: [
                                d.jsx(sl, { className: 'h-4 w-4 text-primary mt-0.5 shrink-0' }),
                                e,
                              ],
                            },
                            t
                          )
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    }),
  })
}
function N1({ trigger: e, productName: t }) {
  const [r, s] = v.useState(!1),
    [a, l] = v.useState({}),
    [u, f] = v.useState(!1),
    [p, g] = v.useState(!1),
    x = async (h) => {
      h.preventDefault()
      const w = new FormData(h.currentTarget),
        S = w.get('name')?.trim(),
        N = w.get('email')?.trim(),
        C = w.get('org')?.trim(),
        E = w.get('usecase')?.trim(),
        P = {}
      if (
        (S || (P.name = 'Name is required'),
        N || (P.email = 'Email is required'),
        p || (P.understand = 'You must acknowledge this is a pre-release product'),
        Object.keys(P).length > 0)
      ) {
        l(P)
        return
      }
      f(!0)
      try {
        const j = await fetch('/api/forms/request-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name: S, email: N, productName: t, org: C, usecase: E }),
        })
        if (!j.ok) {
          const k = await j.json().catch(() => ({}))
          Nt.error(k.error ?? 'Something went wrong. Please try again.')
          return
        }
        ;(Nt.success("Your request has been submitted. We'll be in touch."),
          s(!1),
          l({}),
          g(!1),
          h.target.reset())
      } catch {
        Nt.error('Network error. Please try again.')
      } finally {
        f(!1)
      }
    }
  return d.jsxs(Bi, {
    open: r,
    onOpenChange: s,
    children: [
      d.jsx(zi, { asChild: !0, children: e }),
      d.jsxs(vs, {
        className: 'sm:max-w-[500px] border-border bg-card max-h-[90vh] overflow-y-auto',
        children: [
          d.jsxs($i, {
            children: [
              d.jsxs(ys, { className: 'text-xl', children: ['Request Access — ', t] }),
              d.jsx(Wi, {
                children: 'Early access is limited. Submit your details to be considered.',
              }),
            ],
          }),
          d.jsxs('form', {
            onSubmit: x,
            className: 'space-y-6 pt-4',
            children: [
              d.jsxs('div', {
                className: 'space-y-4',
                children: [
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'ra-name', children: 'Full Name *' }),
                      d.jsx(rn, {
                        id: 'ra-name',
                        name: 'name',
                        placeholder: 'John Doe',
                        className: 'border-border bg-background',
                      }),
                      a.name &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: a.name }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'ra-email', children: 'Email address *' }),
                      d.jsx(rn, {
                        id: 'ra-email',
                        name: 'email',
                        type: 'email',
                        placeholder: 'john@example.com',
                        className: 'border-border bg-background',
                      }),
                      a.email &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: a.email }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'ra-org', children: 'Organization (optional)' }),
                      d.jsx(rn, {
                        id: 'ra-org',
                        name: 'org',
                        placeholder: 'Company Inc.',
                        className: 'border-border bg-background',
                      }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'ra-usecase', children: 'Role / Use case' }),
                      d.jsx(Ui, {
                        id: 'ra-usecase',
                        name: 'usecase',
                        placeholder: 'How do you plan to use this product?',
                        className: 'border-border bg-background min-h-[80px]',
                      }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'flex items-start space-x-2 pt-2',
                    children: [
                      d.jsx(ic, {
                        id: 'ra-understand',
                        checked: p,
                        onCheckedChange: (h) => {
                          ;(g(!!h), l((w) => ({ ...w, understand: '' })))
                        },
                        className: 'mt-1',
                      }),
                      d.jsxs('div', {
                        className: 'grid gap-1.5 leading-none',
                        children: [
                          d.jsx(qe, {
                            htmlFor: 'ra-understand',
                            className: 'text-sm font-normal cursor-pointer',
                            children: 'I understand this is a pre-release product',
                          }),
                          a.understand &&
                            d.jsx('p', {
                              className: 'text-xs text-destructive',
                              children: a.understand,
                            }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              d.jsx(Lr, {
                type: 'submit',
                disabled: u,
                className: 'w-full bg-primary text-primary-foreground hover:bg-primary/90',
                children: u
                  ? d.jsxs(d.Fragment, {
                      children: [
                        d.jsx(ki, { className: 'h-4 w-4 mr-2 animate-spin' }),
                        'Submitting...',
                      ],
                    })
                  : 'Submit request',
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
var EI = Symbol('radix.slottable')
function NI(e) {
  const t = ({ children: r }) => d.jsx(d.Fragment, { children: r })
  return ((t.displayName = `${e}.Slottable`), (t.__radixId = EI), t)
}
var [fc] = Mn('Tooltip', [Vr]),
  pc = Vr(),
  P1 = 'TooltipProvider',
  PI = 700,
  lf = 'tooltip.open',
  [TI, Tp] = fc(P1),
  T1 = (e) => {
    const {
        __scopeTooltip: t,
        delayDuration: r = PI,
        skipDelayDuration: s = 300,
        disableHoverableContent: a = !1,
        children: l,
      } = e,
      u = v.useRef(!0),
      f = v.useRef(!1),
      p = v.useRef(0)
    return (
      v.useEffect(() => {
        const g = p.current
        return () => window.clearTimeout(g)
      }, []),
      d.jsx(TI, {
        scope: t,
        isOpenDelayedRef: u,
        delayDuration: r,
        onOpen: v.useCallback(() => {
          ;(window.clearTimeout(p.current), (u.current = !1))
        }, []),
        onClose: v.useCallback(() => {
          ;(window.clearTimeout(p.current),
            (p.current = window.setTimeout(() => (u.current = !0), s)))
        }, [s]),
        isPointerInTransitRef: f,
        onPointerInTransitChange: v.useCallback((g) => {
          f.current = g
        }, []),
        disableHoverableContent: a,
        children: l,
      })
    )
  }
T1.displayName = P1
var ji = 'Tooltip',
  [jI, Ki] = fc(ji),
  j1 = (e) => {
    const {
        __scopeTooltip: t,
        children: r,
        open: s,
        defaultOpen: a,
        onOpenChange: l,
        disableHoverableContent: u,
        delayDuration: f,
      } = e,
      p = Tp(ji, e.__scopeTooltip),
      g = pc(t),
      [x, h] = v.useState(null),
      w = Xn(),
      S = v.useRef(0),
      N = u ?? p.disableHoverableContent,
      C = f ?? p.delayDuration,
      E = v.useRef(!1),
      [P, j] = go({
        prop: s,
        defaultProp: a ?? !1,
        onChange: (z) => {
          ;(z ? (p.onOpen(), document.dispatchEvent(new CustomEvent(lf))) : p.onClose(), l?.(z))
        },
        caller: ji,
      }),
      k = v.useMemo(() => (P ? (E.current ? 'delayed-open' : 'instant-open') : 'closed'), [P]),
      _ = v.useCallback(() => {
        ;(window.clearTimeout(S.current), (S.current = 0), (E.current = !1), j(!0))
      }, [j]),
      I = v.useCallback(() => {
        ;(window.clearTimeout(S.current), (S.current = 0), j(!1))
      }, [j]),
      B = v.useCallback(() => {
        ;(window.clearTimeout(S.current),
          (S.current = window.setTimeout(() => {
            ;((E.current = !0), j(!0), (S.current = 0))
          }, C)))
      }, [C, j])
    return (
      v.useEffect(
        () => () => {
          S.current && (window.clearTimeout(S.current), (S.current = 0))
        },
        []
      ),
      d.jsx(ap, {
        ...g,
        children: d.jsx(jI, {
          scope: t,
          contentId: w,
          open: P,
          stateAttribute: k,
          trigger: x,
          onTriggerChange: h,
          onTriggerEnter: v.useCallback(() => {
            p.isOpenDelayedRef.current ? B() : _()
          }, [p.isOpenDelayedRef, B, _]),
          onTriggerLeave: v.useCallback(() => {
            N ? I() : (window.clearTimeout(S.current), (S.current = 0))
          }, [I, N]),
          onOpen: _,
          onClose: I,
          disableHoverableContent: N,
          children: r,
        }),
      })
    )
  }
j1.displayName = ji
var cf = 'TooltipTrigger',
  k1 = v.forwardRef((e, t) => {
    const { __scopeTooltip: r, ...s } = e,
      a = Ki(cf, r),
      l = Tp(cf, r),
      u = pc(r),
      f = v.useRef(null),
      p = ke(t, f, a.onTriggerChange),
      g = v.useRef(!1),
      x = v.useRef(!1),
      h = v.useCallback(() => (g.current = !1), [])
    return (
      v.useEffect(() => () => document.removeEventListener('pointerup', h), [h]),
      d.jsx(Li, {
        asChild: !0,
        ...u,
        children: d.jsx(Ne.button, {
          'aria-describedby': a.open ? a.contentId : void 0,
          'data-state': a.stateAttribute,
          ...s,
          ref: p,
          onPointerMove: ie(e.onPointerMove, (w) => {
            w.pointerType !== 'touch' &&
              !x.current &&
              !l.isPointerInTransitRef.current &&
              (a.onTriggerEnter(), (x.current = !0))
          }),
          onPointerLeave: ie(e.onPointerLeave, () => {
            ;(a.onTriggerLeave(), (x.current = !1))
          }),
          onPointerDown: ie(e.onPointerDown, () => {
            ;(a.open && a.onClose(),
              (g.current = !0),
              document.addEventListener('pointerup', h, { once: !0 }))
          }),
          onFocus: ie(e.onFocus, () => {
            g.current || a.onOpen()
          }),
          onBlur: ie(e.onBlur, a.onClose),
          onClick: ie(e.onClick, a.onClose),
        }),
      })
    )
  })
k1.displayName = cf
var jp = 'TooltipPortal',
  [kI, RI] = fc(jp, { forceMount: void 0 }),
  R1 = (e) => {
    const { __scopeTooltip: t, forceMount: r, children: s, container: a } = e,
      l = Ki(jp, t)
    return d.jsx(kI, {
      scope: t,
      forceMount: r,
      children: d.jsx(Ht, {
        present: r || l.open,
        children: d.jsx(hs, { asChild: !0, container: a, children: s }),
      }),
    })
  }
R1.displayName = jp
var cs = 'TooltipContent',
  A1 = v.forwardRef((e, t) => {
    const r = RI(cs, e.__scopeTooltip),
      { forceMount: s = r.forceMount, side: a = 'top', ...l } = e,
      u = Ki(cs, e.__scopeTooltip)
    return d.jsx(Ht, {
      present: s || u.open,
      children: u.disableHoverableContent
        ? d.jsx(M1, { side: a, ...l, ref: t })
        : d.jsx(AI, { side: a, ...l, ref: t }),
    })
  }),
  AI = v.forwardRef((e, t) => {
    const r = Ki(cs, e.__scopeTooltip),
      s = Tp(cs, e.__scopeTooltip),
      a = v.useRef(null),
      l = ke(t, a),
      [u, f] = v.useState(null),
      { trigger: p, onClose: g } = r,
      x = a.current,
      { onPointerInTransitChange: h } = s,
      w = v.useCallback(() => {
        ;(f(null), h(!1))
      }, [h]),
      S = v.useCallback(
        (N, C) => {
          const E = N.currentTarget,
            P = { x: N.clientX, y: N.clientY },
            j = OI(P, E.getBoundingClientRect()),
            k = LI(P, j),
            _ = FI(C.getBoundingClientRect()),
            I = BI([...k, ..._])
          ;(f(I), h(!0))
        },
        [h]
      )
    return (
      v.useEffect(() => () => w(), [w]),
      v.useEffect(() => {
        if (p && x) {
          const N = (E) => S(E, x),
            C = (E) => S(E, p)
          return (
            p.addEventListener('pointerleave', N),
            x.addEventListener('pointerleave', C),
            () => {
              ;(p.removeEventListener('pointerleave', N), x.removeEventListener('pointerleave', C))
            }
          )
        }
      }, [p, x, S, w]),
      v.useEffect(() => {
        if (u) {
          const N = (C) => {
            const E = C.target,
              P = { x: C.clientX, y: C.clientY },
              j = p?.contains(E) || x?.contains(E),
              k = !VI(P, u)
            j ? w() : k && (w(), g())
          }
          return (
            document.addEventListener('pointermove', N),
            () => document.removeEventListener('pointermove', N)
          )
        }
      }, [p, x, u, g, w]),
      d.jsx(M1, { ...e, ref: l })
    )
  }),
  [MI, _I] = fc(ji, { isInside: !1 }),
  DI = NI('TooltipContent'),
  M1 = v.forwardRef((e, t) => {
    const {
        __scopeTooltip: r,
        children: s,
        'aria-label': a,
        onEscapeKeyDown: l,
        onPointerDownOutside: u,
        ...f
      } = e,
      p = Ki(cs, r),
      g = pc(r),
      { onClose: x } = p
    return (
      v.useEffect(
        () => (document.addEventListener(lf, x), () => document.removeEventListener(lf, x)),
        [x]
      ),
      v.useEffect(() => {
        if (p.trigger) {
          const h = (w) => {
            w.target?.contains(p.trigger) && x()
          }
          return (
            window.addEventListener('scroll', h, { capture: !0 }),
            () => window.removeEventListener('scroll', h, { capture: !0 })
          )
        }
      }, [p.trigger, x]),
      d.jsx(fs, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: l,
        onPointerDownOutside: u,
        onFocusOutside: (h) => h.preventDefault(),
        onDismiss: x,
        children: d.jsxs(Jl, {
          'data-state': p.stateAttribute,
          ...g,
          ...f,
          ref: t,
          style: {
            ...f.style,
            '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-tooltip-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-tooltip-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-tooltip-trigger-height': 'var(--radix-popper-anchor-height)',
          },
          children: [
            d.jsx(DI, { children: s }),
            d.jsx(MI, {
              scope: r,
              isInside: !0,
              children: d.jsx(FD, { id: p.contentId, role: 'tooltip', children: a || s }),
            }),
          ],
        }),
      })
    )
  })
A1.displayName = cs
var _1 = 'TooltipArrow',
  II = v.forwardRef((e, t) => {
    const { __scopeTooltip: r, ...s } = e,
      a = pc(r)
    return _I(_1, r).isInside ? null : d.jsx(ec, { ...a, ...s, ref: t })
  })
II.displayName = _1
function OI(e, t) {
  const r = Math.abs(t.top - e.y),
    s = Math.abs(t.bottom - e.y),
    a = Math.abs(t.right - e.x),
    l = Math.abs(t.left - e.x)
  switch (Math.min(r, s, a, l)) {
    case l:
      return 'left'
    case a:
      return 'right'
    case r:
      return 'top'
    case s:
      return 'bottom'
    default:
      throw new Error('unreachable')
  }
}
function LI(e, t, r = 5) {
  const s = []
  switch (t) {
    case 'top':
      s.push({ x: e.x - r, y: e.y + r }, { x: e.x + r, y: e.y + r })
      break
    case 'bottom':
      s.push({ x: e.x - r, y: e.y - r }, { x: e.x + r, y: e.y - r })
      break
    case 'left':
      s.push({ x: e.x + r, y: e.y - r }, { x: e.x + r, y: e.y + r })
      break
    case 'right':
      s.push({ x: e.x - r, y: e.y - r }, { x: e.x - r, y: e.y + r })
      break
  }
  return s
}
function FI(e) {
  const { top: t, right: r, bottom: s, left: a } = e
  return [
    { x: a, y: t },
    { x: r, y: t },
    { x: r, y: s },
    { x: a, y: s },
  ]
}
function VI(e, t) {
  const { x: r, y: s } = e
  let a = !1
  for (let l = 0, u = t.length - 1; l < t.length; u = l++) {
    const f = t[l],
      p = t[u],
      g = f.x,
      x = f.y,
      h = p.x,
      w = p.y
    x > s != w > s && r < ((h - g) * (s - x)) / (w - x) + g && (a = !a)
  }
  return a
}
function BI(e) {
  const t = e.slice()
  return (
    t.sort((r, s) => (r.x < s.x ? -1 : r.x > s.x ? 1 : r.y < s.y ? -1 : r.y > s.y ? 1 : 0)),
    zI(t)
  )
}
function zI(e) {
  if (e.length <= 1) return e.slice()
  const t = []
  for (let s = 0; s < e.length; s++) {
    const a = e[s]
    for (; t.length >= 2; ) {
      const l = t[t.length - 1],
        u = t[t.length - 2]
      if ((l.x - u.x) * (a.y - u.y) >= (l.y - u.y) * (a.x - u.x)) t.pop()
      else break
    }
    t.push(a)
  }
  t.pop()
  const r = []
  for (let s = e.length - 1; s >= 0; s--) {
    const a = e[s]
    for (; r.length >= 2; ) {
      const l = r[r.length - 1],
        u = r[r.length - 2]
      if ((l.x - u.x) * (a.y - u.y) >= (l.y - u.y) * (a.x - u.x)) r.pop()
      else break
    }
    r.push(a)
  }
  return (
    r.pop(),
    t.length === 1 && r.length === 1 && t[0].x === r[0].x && t[0].y === r[0].y ? t : t.concat(r)
  )
}
var $I = T1,
  WI = j1,
  UI = k1,
  HI = R1,
  D1 = A1
const GI = $I,
  KI = WI,
  YI = UI,
  I1 = v.forwardRef(({ className: e, sideOffset: t = 4, ...r }, s) =>
    d.jsx(HI, {
      children: d.jsx(D1, {
        ref: s,
        sideOffset: t,
        className: Ie(
          'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]',
          e
        ),
        ...r,
      }),
    })
  )
I1.displayName = D1.displayName
function XI({ product: e, trigger: t }) {
  const [r, s] = v.useState(!1)
  return d.jsxs(Bi, {
    open: r,
    onOpenChange: s,
    children: [
      d.jsx(zi, { asChild: !0, children: t }),
      d.jsxs(vs, {
        className:
          'sm:max-w-[600px] border-border bg-card p-0 overflow-hidden max-h-[90vh] flex flex-col',
        children: [
          d.jsxs('div', {
            className: 'p-6 overflow-y-auto',
            children: [
              d.jsxs('div', {
                className: 'flex flex-wrap gap-2 mb-4',
                children: [
                  d.jsx('span', {
                    className: `px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-widest ${Ob(e.status)}`,
                    children: e.status,
                  }),
                  d.jsx('span', {
                    className: `px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-widest ${Lb(e.category)}`,
                    children: e.category,
                  }),
                ],
              }),
              d.jsx(ys, { className: 'text-2xl font-bold text-foreground mb-2', children: e.name }),
              d.jsx('p', {
                className: 'text-sm text-muted-foreground mb-6',
                children: e.description,
              }),
              d.jsxs('div', {
                className: 'grid sm:grid-cols-2 gap-4 mb-6',
                children: [
                  d.jsxs('div', {
                    className: 'rounded-lg border border-border bg-background/40 p-4',
                    children: [
                      d.jsxs('div', {
                        className: 'flex items-center justify-between mb-3',
                        children: [
                          d.jsx('p', {
                            className:
                              'text-[10px] uppercase tracking-widest text-muted-foreground',
                            children: 'Valuation signal',
                          }),
                          d.jsxs('div', {
                            className: 'flex items-center gap-1 text-green-400',
                            children: [
                              d.jsx(mf, { className: 'h-3 w-3' }),
                              d.jsx('span', {
                                className: 'text-[10px] font-semibold',
                                children: 'Rising',
                              }),
                            ],
                          }),
                        ],
                      }),
                      d.jsxs('div', {
                        className: 'space-y-1',
                        children: [
                          d.jsxs('div', {
                            className: 'flex justify-between items-end',
                            children: [
                              d.jsx('span', {
                                className: 'text-xs text-muted-foreground',
                                children: 'As-is:',
                              }),
                              d.jsx('span', {
                                className: 'text-sm font-bold text-foreground',
                                children: e.valuationAsIs,
                              }),
                            ],
                          }),
                          d.jsxs('div', {
                            className: 'flex justify-between items-end',
                            children: [
                              d.jsx('span', {
                                className: 'text-xs text-muted-foreground',
                                children: 'Projected:',
                              }),
                              d.jsx('span', {
                                className: 'text-sm font-bold text-foreground',
                                children: e.valuationProjected,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  d.jsx('div', {
                    className: 'grid grid-cols-2 gap-2',
                    children: e.metrics.map((a, l) =>
                      d.jsxs(
                        'div',
                        {
                          className:
                            'rounded-lg border border-border bg-background/40 p-3 flex flex-col justify-center items-center text-center',
                          children: [
                            d.jsx('p', {
                              className: 'text-lg font-bold text-foreground',
                              children: a.value,
                            }),
                            d.jsx('p', {
                              className: 'text-[10px] text-muted-foreground leading-tight mt-1',
                              children: a.label,
                            }),
                          ],
                        },
                        l
                      )
                    ),
                  }),
                ],
              }),
              d.jsxs('div', {
                className: 'mb-6',
                children: [
                  d.jsx('p', {
                    className:
                      'text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3',
                    children: 'Core Capabilities',
                  }),
                  d.jsx('ul', {
                    className: 'space-y-2',
                    children: e.features.map((a, l) =>
                      d.jsxs(
                        'li',
                        {
                          className: 'flex items-start gap-2 text-sm text-foreground',
                          children: [
                            d.jsx('span', { className: 'text-primary mt-0.5', children: '•' }),
                            a,
                          ],
                        },
                        l
                      )
                    ),
                  }),
                ],
              }),
              d.jsxs('div', {
                className: 'rounded-lg border border-border bg-background/60 p-4 mb-2',
                children: [
                  d.jsx('p', {
                    className: 'text-[10px] uppercase tracking-widest text-muted-foreground mb-1',
                    children: 'Next gate',
                  }),
                  d.jsx('p', { className: 'text-sm text-foreground', children: e.nextGate }),
                ],
              }),
            ],
          }),
          d.jsxs('div', {
            className:
              'p-4 border-t border-border bg-background/50 flex flex-col sm:flex-row gap-3 justify-end items-center mt-auto',
            children: [
              d.jsx(GI, {
                children: d.jsxs(KI, {
                  children: [
                    d.jsx(YI, {
                      asChild: !0,
                      children: d.jsx('div', {
                        className: 'w-full sm:w-auto',
                        children: d.jsx(Lr, {
                          variant: 'outline',
                          className:
                            'w-full sm:w-auto border-border text-muted-foreground pointer-events-none opacity-50',
                          children: 'View full page',
                        }),
                      }),
                    }),
                    d.jsx(I1, { children: d.jsx('p', { children: 'Coming soon' }) }),
                  ],
                }),
              }),
              d.jsx(N1, {
                productName: e.name,
                trigger: d.jsx(Lr, {
                  className:
                    'w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90',
                  children: 'Request access',
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
function qI({ product: e }) {
  const [t, r] = v.useState(!1),
    s = v.useRef(null),
    a = Zf(s, { once: !0 }),
    l =
      e.status === 'Stage 1 Beta'
        ? 85
        : e.status === 'Beta'
          ? 65
          : e.status === 'Prototype'
            ? 35
            : e.status === 'Concept'
              ? 15
              : 100
  return d.jsx(ft.div, {
    whileHover: { scale: 1.01, boxShadow: '0 0 15px -3px rgba(255, 59, 59, 0.15)' },
    className:
      'rounded-xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/50 flex flex-col h-full',
    children: d.jsxs('div', {
      className: 'p-5 flex flex-col flex-1',
      children: [
        d.jsxs('div', {
          className: 'flex items-start gap-4',
          children: [
            d.jsx('div', {
              className:
                'flex-shrink-0 w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center',
              children: d.jsx('span', {
                className: 'text-xs font-bold text-muted-foreground',
                children: e.abbr,
              }),
            }),
            d.jsxs('div', {
              children: [
                d.jsxs('div', {
                  className: 'flex flex-wrap gap-1.5 mb-2',
                  children: [
                    d.jsx('span', {
                      className: `px-2 py-0.5 rounded text-[10px] font-semibold border ${Ob(e.status)}`,
                      children: e.status,
                    }),
                    d.jsx('span', {
                      className: `px-2 py-0.5 rounded text-[10px] font-semibold border ${Lb(e.category)}`,
                      children: e.category,
                    }),
                  ],
                }),
                d.jsx('h3', { className: 'text-base font-bold text-foreground', children: e.name }),
                d.jsx('p', {
                  className: 'text-xs text-muted-foreground mt-0.5',
                  children: e.categoryLabel,
                }),
              ],
            }),
          ],
        }),
        d.jsx('p', {
          className: 'mt-4 text-sm text-muted-foreground leading-relaxed',
          children: e.description,
        }),
        d.jsxs('div', {
          className: 'mt-4',
          children: [
            d.jsx('p', {
              className:
                'text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2',
              children: 'Core capabilities',
            }),
            d.jsx('ul', {
              className: 'space-y-1.5',
              children: e.features.map((u, f) =>
                d.jsxs(
                  'li',
                  {
                    className: 'flex items-start gap-2 text-xs text-muted-foreground',
                    children: [
                      d.jsx('span', { className: 'text-primary mt-0.5 shrink-0', children: '—' }),
                      u,
                    ],
                  },
                  f
                )
              ),
            }),
          ],
        }),
        d.jsxs('div', {
          className: 'mt-4 rounded-lg border border-border bg-background/40 p-3',
          children: [
            d.jsx('p', {
              className: 'text-[10px] uppercase tracking-widest text-muted-foreground mb-1',
              children: 'Next gate',
            }),
            d.jsx('p', {
              className: 'text-xs text-foreground leading-relaxed',
              children: e.nextGate,
            }),
          ],
        }),
        d.jsx(os, {
          initial: !1,
          children:
            t &&
            d.jsx(
              ft.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: 'auto' },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.25, ease: 'easeInOut' },
                className: 'overflow-hidden',
                children: d.jsxs('div', {
                  className: 'mt-4 space-y-4 border-t border-border pt-4',
                  children: [
                    d.jsxs('div', {
                      className: 'rounded-lg border border-border bg-background/40 p-3',
                      children: [
                        d.jsxs('div', {
                          className: 'flex items-center justify-between mb-2',
                          children: [
                            d.jsx('p', {
                              className:
                                'text-[10px] uppercase tracking-widest text-muted-foreground',
                              children: 'Valuation signal',
                            }),
                            d.jsxs('div', {
                              className: 'flex items-center gap-1 text-green-400',
                              children: [
                                d.jsx(mf, { className: 'h-3 w-3' }),
                                d.jsx('span', {
                                  className: 'text-[10px] font-semibold',
                                  children: 'Rising',
                                }),
                              ],
                            }),
                          ],
                        }),
                        d.jsxs('div', {
                          className: 'mb-2',
                          children: [
                            d.jsxs('span', {
                              className: 'text-sm font-bold text-foreground',
                              children: ['As-is: ', e.valuationAsIs],
                            }),
                            d.jsxs('span', {
                              className: 'text-xs text-muted-foreground ml-2',
                              children: ['Projected: ', e.valuationProjected],
                            }),
                          ],
                        }),
                        d.jsxs('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            d.jsxs('span', {
                              className: 'text-[10px] text-muted-foreground',
                              children: [
                                'Low ',
                                d.jsx('span', {
                                  className: 'font-semibold text-foreground',
                                  children: e.trendLow,
                                }),
                              ],
                            }),
                            d.jsx('div', {
                              className: 'flex-1 h-1.5 bg-border rounded-full overflow-hidden',
                              children: d.jsx('div', {
                                className: 'h-full bg-primary rounded-full',
                                style: { width: `${(e.trendAvg / e.trendHigh) * 100}%` },
                              }),
                            }),
                            d.jsxs('span', {
                              className: 'text-[10px] text-muted-foreground',
                              children: [
                                'Avg ',
                                d.jsx('span', {
                                  className: 'font-semibold text-foreground',
                                  children: e.trendAvg,
                                }),
                              ],
                            }),
                            d.jsxs('span', {
                              className: 'text-[10px] text-muted-foreground',
                              children: [
                                'High ',
                                d.jsx('span', {
                                  className: 'font-semibold text-foreground',
                                  children: e.trendHigh,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    d.jsx('div', {
                      className: 'grid grid-cols-3 gap-3',
                      children: e.metrics.map((u, f) =>
                        d.jsxs(
                          'div',
                          {
                            className:
                              'text-center rounded-lg border border-border bg-background/40 p-3',
                            children: [
                              d.jsx('p', {
                                className: 'text-base font-bold text-foreground',
                                children: u.value,
                              }),
                              d.jsx('p', {
                                className: 'text-[10px] text-muted-foreground leading-tight mt-0.5',
                                children: u.label,
                              }),
                            ],
                          },
                          f
                        )
                      ),
                    }),
                    d.jsxs('div', {
                      ref: s,
                      children: [
                        d.jsxs('div', {
                          className: 'flex justify-between items-end mb-1.5',
                          children: [
                            d.jsx('p', {
                              className:
                                'text-[10px] text-muted-foreground uppercase tracking-widest',
                              children: 'Readiness score',
                            }),
                            d.jsxs('span', {
                              className: 'text-xs font-bold text-foreground',
                              children: [l, '%'],
                            }),
                          ],
                        }),
                        d.jsx('div', {
                          className: 'h-1.5 bg-border rounded-full overflow-hidden',
                          children: d.jsx(ft.div, {
                            className: 'h-full bg-primary rounded-full',
                            initial: { width: '0%' },
                            animate: a ? { width: `${l}%` } : { width: '0%' },
                            transition: { duration: 1, ease: 'easeOut', delay: 0.1 },
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              },
              'details'
            ),
        }),
        d.jsxs('div', {
          className:
            'mt-4 pt-4 border-t border-border flex items-center justify-between gap-3 flex-wrap',
          children: [
            d.jsx('button', {
              onClick: () => r(!t),
              className:
                'flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors',
              children: t
                ? d.jsxs(d.Fragment, {
                    children: [d.jsx(Cy, { className: 'h-3.5 w-3.5' }), ' Hide details'],
                  })
                : d.jsxs(d.Fragment, {
                    children: [d.jsx(pf, { className: 'h-3.5 w-3.5' }), ' Financials & details'],
                  }),
            }),
            d.jsxs('div', {
              className: 'flex items-center gap-3',
              children: [
                d.jsx(XI, {
                  product: e,
                  trigger: d.jsx('button', {
                    className:
                      'text-xs text-muted-foreground hover:text-foreground transition-colors',
                    children: 'Quick view',
                  }),
                }),
                d.jsx('span', { className: 'text-border', children: '|' }),
                d.jsx(N1, {
                  productName: e.name,
                  trigger: d.jsx('button', {
                    className: 'text-xs text-primary font-medium hover:underline transition-colors',
                    children: 'Request access',
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  })
}
const QI = ['Stage 1 Beta', 'Beta', 'Prototype', 'Concept', 'Live'],
  ZI = ['Intelligence', 'Security', 'Forensics', 'Creative', 'Relationship', 'Cultural']
function JI() {
  const [e, t] = v.useState('All'),
    [r, s] = v.useState('All'),
    [a, l] = v.useState(''),
    [u, f] = v.useState('readiness'),
    [p, g] = v.useState(!1),
    x = v.useMemo(() => {
      let h = wi.filter((w) => {
        const S = e === 'All' || w.status === e,
          N = r === 'All' || w.category === r,
          C =
            !a ||
            w.name.toLowerCase().includes(a.toLowerCase()) ||
            w.description.toLowerCase().includes(a.toLowerCase())
        return S && N && C
      })
      return (
        u === 'readiness'
          ? (h = [...h].sort((w, S) => gy.indexOf(w.status) - gy.indexOf(S.status)))
          : u === 'alpha'
            ? (h = [...h].sort((w, S) => w.name.localeCompare(S.name)))
            : u === 'strategic' &&
              (h = [...h].sort((w, S) => {
                const N = parseFloat(w.valuationProjected.replace(/[^0-9.]/g, ''))
                return parseFloat(S.valuationProjected.replace(/[^0-9.]/g, '')) - N
              })),
        h
      )
    }, [e, r, a, u])
  return d.jsx('section', {
    id: 'portfolio',
    className: 'py-20 px-4 sm:px-6 border-t border-border',
    children: d.jsxs('div', {
      className: 'max-w-7xl mx-auto',
      children: [
        d.jsxs('div', {
          className: 'mb-10',
          children: [
            d.jsx('h2', {
              className: 'text-2xl sm:text-3xl font-bold text-foreground',
              children: 'Product Portfolio',
            }),
            d.jsx('p', {
              className: 'mt-2 text-sm text-muted-foreground',
              children:
                'Scan what exists, filter by readiness, and expand details without losing the high-level view.',
            }),
          ],
        }),
        d.jsxs('div', {
          className: 'mb-6 space-y-4',
          children: [
            d.jsxs('div', {
              className: 'flex flex-wrap items-center gap-3',
              children: [
                d.jsxs('div', {
                  className: 'relative flex-1 min-w-48',
                  children: [
                    d.jsx(oE, {
                      className:
                        'absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground',
                    }),
                    d.jsx('input', {
                      type: 'search',
                      placeholder: 'Search products...',
                      value: a,
                      onChange: (h) => l(h.target.value),
                      className:
                        'w-full pl-8 pr-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring',
                    }),
                  ],
                }),
                d.jsxs('button', {
                  onClick: () => g(!p),
                  className:
                    'flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:text-foreground transition-colors',
                  children: [d.jsx(iE, { className: 'h-3.5 w-3.5' }), 'Filters'],
                }),
                d.jsxs('select', {
                  value: u,
                  onChange: (h) => f(h.target.value),
                  className:
                    'px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none',
                  children: [
                    d.jsx('option', { value: 'readiness', children: 'Most ready first' }),
                    d.jsx('option', { value: 'strategic', children: 'Most strategic first' }),
                    d.jsx('option', { value: 'alpha', children: 'Alphabetical' }),
                  ],
                }),
              ],
            }),
            d.jsx(os, {
              children:
                p &&
                d.jsx(ft.div, {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: 'auto', opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  className: 'overflow-hidden',
                  children: d.jsxs('div', {
                    className: 'rounded-xl border border-border bg-card p-4 space-y-4 mb-2',
                    children: [
                      d.jsxs('div', {
                        children: [
                          d.jsx('p', {
                            className:
                              'text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2',
                            children: 'Status',
                          }),
                          d.jsxs('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              d.jsx('button', {
                                onClick: () => t('All'),
                                className: `px-3 py-1 rounded-md text-xs font-medium border transition-colors ${e === 'All' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`,
                                children: 'All',
                              }),
                              QI.map((h) =>
                                d.jsx(
                                  'button',
                                  {
                                    onClick: () => t(h),
                                    className: `px-3 py-1 rounded-md text-xs font-medium border transition-colors ${e === h ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`,
                                    children: h,
                                  },
                                  h
                                )
                              ),
                            ],
                          }),
                        ],
                      }),
                      d.jsxs('div', {
                        children: [
                          d.jsx('p', {
                            className:
                              'text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2',
                            children: 'Category',
                          }),
                          d.jsxs('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              d.jsx('button', {
                                onClick: () => s('All'),
                                className: `px-3 py-1 rounded-md text-xs font-medium border transition-colors ${r === 'All' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`,
                                children: 'All',
                              }),
                              ZI.map((h) =>
                                d.jsx(
                                  'button',
                                  {
                                    onClick: () => s(h),
                                    className: `px-3 py-1 rounded-md text-xs font-medium border transition-colors ${r === h ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`,
                                    children: h,
                                  },
                                  h
                                )
                              ),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
            }),
          ],
        }),
        x.length === 0
          ? d.jsxs('div', {
              className: 'text-center py-16 text-muted-foreground',
              children: [
                d.jsx('p', {
                  className: 'text-lg font-medium',
                  children: 'No products match your filters.',
                }),
                d.jsx('button', {
                  onClick: () => {
                    ;(t('All'), s('All'), l(''))
                  },
                  className: 'mt-3 text-sm text-primary hover:underline',
                  children: 'Clear filters',
                }),
              ],
            })
          : d.jsx(ft.div, {
              layout: !0,
              className: 'grid sm:grid-cols-2 xl:grid-cols-3 gap-4',
              children: d.jsx(os, {
                children: x.map((h, w) =>
                  d.jsx(
                    ft.div,
                    {
                      layout: !0,
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      exit: { opacity: 0, scale: 0.9 },
                      transition: { duration: 0.2, delay: w * 0.05 },
                      children: d.jsx(qI, { product: h }),
                    },
                    h.id
                  )
                ),
              }),
            }),
      ],
    }),
  })
}
const eO = [
    {
      status: 'Prototype',
      name: 'Presence Architect',
      description:
        'A strategic system for cultivating attraction, authority, and emotional gravity through restraint and consistency.',
      items: ['Social signaling frameworks', 'DM playbooks', 'Presence audits'],
    },
    {
      status: 'Concept',
      name: 'Emotional Intelligence Stack',
      description:
        'A behavioral framework integrating psychology, emotional regulation, and decision-cycle mapping across products.',
      items: ['Emotion modeling', 'Decision-cycle cues', 'Ethical influence guardrails'],
    },
  ],
  tO = [
    {
      abbr: 'GOM',
      status: 'Published',
      name: 'Game On! Master the Conversation & Win Her Heart',
      description: 'Published title anchored in Game On principles and conversational clarity.',
      cta: 'Buy book',
      ctaHref: 'https://www.darenprince.com/book.html',
    },
    {
      abbr: 'U',
      status: 'In progress',
      name: 'Unshakeable',
      description: 'In-progress manuscript focused on resilience and steadiness under pressure.',
      cta: 'Get updates',
      ctaHref: '#',
    },
  ]
function yy(e) {
  return (
    {
      Prototype: 'text-blue-400 bg-blue-950/50 border-blue-800/50',
      Concept: 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50',
      Published: 'text-green-400 bg-green-950/50 border-green-800/50',
      'In progress': 'text-amber-400 bg-amber-950/50 border-amber-800/50',
    }[e] || 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50'
  )
}
function nO() {
  return d.jsxs(d.Fragment, {
    children: [
      d.jsx('section', {
        className: 'py-20 px-4 sm:px-6 border-t border-border',
        children: d.jsxs('div', {
          className: 'max-w-7xl mx-auto',
          children: [
            d.jsxs('div', {
              className: 'mb-10',
              children: [
                d.jsx('h2', {
                  className: 'text-2xl sm:text-3xl font-bold text-foreground',
                  children: 'Frameworks',
                }),
                d.jsx('p', {
                  className: 'mt-2 text-sm text-muted-foreground',
                  children:
                    "Behavioral and communication systems that expand the portfolio's leverage.",
                }),
              ],
            }),
            d.jsx('div', {
              className: 'grid sm:grid-cols-2 gap-4',
              children: eO.map((e, t) =>
                d.jsxs(
                  'div',
                  {
                    className: 'rounded-xl border border-border bg-card p-6 space-y-4',
                    children: [
                      d.jsx('div', {
                        children: d.jsx('span', {
                          className: `px-2 py-0.5 rounded text-[10px] font-semibold border ${yy(e.status)}`,
                          children: e.status,
                        }),
                      }),
                      d.jsx('h3', {
                        className: 'text-base font-bold text-foreground',
                        children: e.name,
                      }),
                      d.jsx('p', {
                        className: 'text-sm text-muted-foreground leading-relaxed',
                        children: e.description,
                      }),
                      d.jsx('ul', {
                        className: 'space-y-1',
                        children: e.items.map((r, s) =>
                          d.jsxs(
                            'li',
                            {
                              className: 'flex items-center gap-2 text-xs text-muted-foreground',
                              children: [
                                d.jsx('span', { className: 'text-primary', children: '—' }),
                                ' ',
                                r,
                              ],
                            },
                            s
                          )
                        ),
                      }),
                      d.jsxs('button', {
                        className:
                          'flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors',
                        children: [
                          d.jsx(eE, { className: 'h-3.5 w-3.5' }),
                          'Request framework brief',
                        ],
                      }),
                    ],
                  },
                  t
                )
              ),
            }),
          ],
        }),
      }),
      d.jsx('section', {
        className: 'py-20 px-4 sm:px-6 border-t border-border bg-card/30',
        children: d.jsxs('div', {
          className: 'max-w-7xl mx-auto',
          children: [
            d.jsxs('div', {
              className: 'mb-10',
              children: [
                d.jsx('h2', {
                  className: 'text-2xl sm:text-3xl font-bold text-foreground',
                  children: 'Books & IP',
                }),
                d.jsx('p', {
                  className: 'mt-2 text-sm text-muted-foreground',
                  children: 'Published and in-progress IP that anchors the portfolio narrative.',
                }),
              ],
            }),
            d.jsx('div', {
              className: 'grid sm:grid-cols-2 gap-4',
              children: tO.map((e, t) =>
                d.jsxs(
                  'div',
                  {
                    className: 'rounded-xl border border-border bg-card p-6 space-y-4',
                    children: [
                      d.jsxs('div', {
                        className: 'flex items-start justify-between',
                        children: [
                          d.jsx('div', {
                            className:
                              'w-14 h-16 rounded-lg border border-border bg-background flex items-center justify-center',
                            children: d.jsx('span', {
                              className: 'text-xs font-bold text-muted-foreground',
                              children: e.abbr,
                            }),
                          }),
                          d.jsx('span', {
                            className: `px-2 py-0.5 rounded text-[10px] font-semibold border ${yy(e.status)}`,
                            children: e.status,
                          }),
                        ],
                      }),
                      d.jsx('h3', {
                        className: 'text-base font-bold text-foreground',
                        children: e.name,
                      }),
                      d.jsx('p', {
                        className: 'text-sm text-muted-foreground leading-relaxed',
                        children: e.description,
                      }),
                      d.jsxs('a', {
                        href: e.ctaHref,
                        target: e.ctaHref.startsWith('http') ? '_blank' : void 0,
                        className:
                          'inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors',
                        children: [d.jsx(UC, { className: 'h-3.5 w-3.5' }), e.cta],
                      }),
                    ],
                  },
                  t
                )
              ),
            }),
          ],
        }),
      }),
    ],
  })
}
const xy = [
  {
    label: 'Concept',
    meaning: 'Defined asset with structure and intent, not yet built.',
    nextGate: 'Finalize scope, prototype requirements, and core validation plan.',
    color: 'text-zinc-400',
    bg: 'bg-zinc-900/50',
  },
  {
    label: 'Prototype',
    meaning: 'Functional build exists with scoped feature set.',
    nextGate: 'Validate with real-world users and harden the core workflows.',
    color: 'text-blue-400',
    bg: 'bg-blue-950/50',
  },
  {
    label: 'Beta',
    meaning: 'Product is usable by testers, not yet hardened for scale.',
    nextGate: 'Stabilize critical workflows and close priority feedback loops.',
    color: 'text-amber-400',
    bg: 'bg-amber-950/50',
  },
  {
    label: 'Stage 1 Beta',
    meaning: 'Structured beta preparation with controlled testing.',
    nextGate: 'Complete Stage 1 testing and confirm readiness criteria.',
    color: 'text-red-400',
    bg: 'bg-red-950/50',
  },
  {
    label: 'Live',
    meaning: 'Publicly available and maintained.',
    nextGate: 'Maintain reliability and scale responsibly.',
    color: 'text-green-400',
    bg: 'bg-green-950/50',
  },
]
function rO() {
  return d.jsx('section', {
    className: 'py-20 px-4 sm:px-6 border-t border-border bg-card/30',
    children: d.jsxs('div', {
      className: 'max-w-7xl mx-auto',
      children: [
        d.jsxs('div', {
          className: 'mb-10',
          children: [
            d.jsx('h2', {
              className: 'text-2xl sm:text-3xl font-bold text-foreground',
              children: 'Status definitions',
            }),
            d.jsx('p', {
              className: 'mt-2 text-sm text-muted-foreground',
              children: 'Readiness labels used across every Crown Labs asset.',
            }),
          ],
        }),
        d.jsxs('div', {
          className: 'rounded-xl border border-border bg-card overflow-hidden',
          children: [
            d.jsxs('div', {
              className: 'grid grid-cols-3 px-5 py-3 border-b border-border',
              children: [
                d.jsx('p', {
                  className:
                    'text-xs font-semibold uppercase tracking-widest text-muted-foreground',
                  children: 'Status',
                }),
                d.jsx('p', {
                  className:
                    'text-xs font-semibold uppercase tracking-widest text-muted-foreground',
                  children: 'What it means',
                }),
                d.jsx('p', {
                  className:
                    'text-xs font-semibold uppercase tracking-widest text-muted-foreground',
                  children: 'Next gate',
                }),
              ],
            }),
            xy.map((e, t) =>
              d.jsxs(
                'div',
                {
                  className: `grid grid-cols-3 gap-4 px-5 py-4 ${t < xy.length - 1 ? 'border-b border-border' : ''}`,
                  children: [
                    d.jsx('div', {
                      children: d.jsx('span', {
                        className: `inline-flex px-2 py-0.5 rounded text-xs font-semibold ${e.bg} ${e.color} border border-current/20`,
                        children: e.label,
                      }),
                    }),
                    d.jsx('p', { className: 'text-sm text-muted-foreground', children: e.meaning }),
                    d.jsx('p', {
                      className: 'text-sm text-muted-foreground',
                      children: e.nextGate,
                    }),
                  ],
                },
                t
              )
            ),
          ],
        }),
      ],
    }),
  })
}
const oO = [
    { year: 'Year 1', revenue: '$6,350,000' },
    { year: 'Year 2', revenue: '$18,150,000' },
    { year: 'Year 3', revenue: '$39,900,000' },
  ],
  sO = [
    'Multiple products are revenue-capable within 90 days.',
    'Flagship systems support long-term enterprise deployment.',
    'Assets are defined, structured, and positioned for scale.',
  ],
  iO = [
    'Deliberate convergence of technical depth and behavioral intelligence.',
    'Capital accelerates value realization, not discovery.',
    'Portfolio readiness supports licensing, scale, and acquisition.',
  ]
function aO() {
  return d.jsx('section', {
    className: 'py-20 px-4 sm:px-6 border-t border-border',
    children: d.jsxs('div', {
      className: 'max-w-7xl mx-auto',
      children: [
        d.jsxs('div', {
          className: 'mb-10',
          children: [
            d.jsx('h2', {
              className: 'text-2xl sm:text-3xl font-bold text-foreground',
              children: 'Portfolio Valuation & Net Worth Statement',
            }),
            d.jsx('p', {
              className: 'mt-2 text-sm text-muted-foreground',
              children:
                "This section reflects the portfolio's as-is valuation, projected completed valuation, and consolidated revenue outlook across all products.",
            }),
          ],
        }),
        d.jsxs('div', {
          className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6',
          children: [
            d.jsxs('div', {
              className: 'rounded-xl border border-border bg-card p-6 space-y-4',
              children: [
                d.jsxs('div', {
                  className: 'flex items-center gap-3',
                  children: [
                    d.jsx(qC, { className: 'h-5 w-5 text-primary' }),
                    d.jsx('h3', {
                      className: 'text-sm font-semibold text-foreground',
                      children: 'As-is portfolio valuation',
                    }),
                  ],
                }),
                d.jsxs('div', {
                  className: 'space-y-1',
                  children: [
                    d.jsxs('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        d.jsx('span', {
                          className: 'text-xs text-muted-foreground',
                          children: 'Low estimate',
                        }),
                        d.jsx('span', {
                          className: 'text-sm font-bold text-foreground',
                          children: '$17,750,000',
                        }),
                      ],
                    }),
                    d.jsxs('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        d.jsx('span', {
                          className: 'text-xs text-muted-foreground',
                          children: 'High estimate',
                        }),
                        d.jsx('span', {
                          className: 'text-sm font-bold text-foreground',
                          children: '$28,100,000',
                        }),
                      ],
                    }),
                  ],
                }),
                d.jsx('p', {
                  className: 'text-xs text-muted-foreground',
                  children: 'Current valuation reflects active development status.',
                }),
              ],
            }),
            d.jsxs('div', {
              className: 'rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4',
              children: [
                d.jsxs('div', {
                  className: 'flex items-center gap-3',
                  children: [
                    d.jsx(mf, { className: 'h-5 w-5 text-primary' }),
                    d.jsx('h3', {
                      className: 'text-sm font-semibold text-foreground',
                      children: 'Projected valuation (completed)',
                    }),
                  ],
                }),
                d.jsxs('div', {
                  className: 'space-y-1',
                  children: [
                    d.jsxs('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        d.jsx('span', {
                          className: 'text-xs text-muted-foreground',
                          children: 'Low estimate',
                        }),
                        d.jsx('span', {
                          className: 'text-sm font-bold text-primary',
                          children: '$56,500,000',
                        }),
                      ],
                    }),
                    d.jsxs('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        d.jsx('span', {
                          className: 'text-xs text-muted-foreground',
                          children: 'High estimate',
                        }),
                        d.jsx('span', {
                          className: 'text-sm font-bold text-primary',
                          children: '$94,500,000',
                        }),
                      ],
                    }),
                  ],
                }),
                d.jsx('p', {
                  className: 'text-xs text-muted-foreground',
                  children: 'Completion unlocks enterprise, licensing, and acquisition pathways.',
                }),
              ],
            }),
            d.jsxs('div', {
              className: 'rounded-xl border border-border bg-card p-6 space-y-4',
              children: [
                d.jsxs('div', {
                  className: 'flex items-center gap-3',
                  children: [
                    d.jsx(GC, { className: 'h-5 w-5 text-primary' }),
                    d.jsx('h3', {
                      className: 'text-sm font-semibold text-foreground',
                      children: 'Projected annual revenue',
                    }),
                  ],
                }),
                d.jsx('p', {
                  className: 'text-xs text-muted-foreground',
                  children: 'Three-year consolidated outlook.',
                }),
                d.jsx('div', {
                  className: 'space-y-2',
                  children: oO.map((e) =>
                    d.jsxs(
                      'div',
                      {
                        className: 'flex items-center justify-between',
                        children: [
                          d.jsx('span', {
                            className: 'text-xs text-muted-foreground',
                            children: e.year,
                          }),
                          d.jsx('span', {
                            className: 'text-sm font-bold text-foreground',
                            children: e.revenue,
                          }),
                        ],
                      },
                      e.year
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
        d.jsxs('div', {
          className: 'grid sm:grid-cols-2 gap-4',
          children: [
            d.jsxs('div', {
              className: 'rounded-xl border border-border bg-card p-6 space-y-3',
              children: [
                d.jsx('h3', {
                  className: 'text-sm font-semibold text-foreground',
                  children: 'Portfolio statement',
                }),
                d.jsx('ul', {
                  className: 'space-y-2',
                  children: sO.map((e, t) =>
                    d.jsxs(
                      'li',
                      {
                        className: 'flex items-start gap-2 text-xs text-muted-foreground',
                        children: [
                          d.jsx('span', { className: 'text-primary mt-0.5', children: '—' }),
                          ' ',
                          e,
                        ],
                      },
                      t
                    )
                  ),
                }),
              ],
            }),
            d.jsxs('div', {
              className: 'rounded-xl border border-border bg-card p-6 space-y-3',
              children: [
                d.jsx('h3', {
                  className: 'text-sm font-semibold text-foreground',
                  children: 'Closing statement',
                }),
                d.jsx('ul', {
                  className: 'space-y-2',
                  children: iO.map((e, t) =>
                    d.jsxs(
                      'li',
                      {
                        className: 'flex items-start gap-2 text-xs text-muted-foreground',
                        children: [
                          d.jsx('span', { className: 'text-primary mt-0.5', children: '—' }),
                          ' ',
                          e,
                        ],
                      },
                      t
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  })
}
const lO = [
  {
    icon: d.jsx(JC, { className: 'h-5 w-5 text-primary' }),
    title: 'Privacy-first defaults',
    description:
      'Products that handle sensitive inputs default to minimal retention, clear consent, and transparent control.',
  },
  {
    icon: d.jsx(aE, { className: 'h-5 w-5 text-primary' }),
    title: 'Decision-support only',
    description:
      'No product positions itself as medical, legal, or therapy advice. Outputs are support signals, not directives.',
  },
  {
    icon: d.jsx(XC, { className: 'h-5 w-5 text-primary' }),
    title: 'No retention by design',
    description:
      'Where applicable, products avoid storing data. If retention is required, it is explicit, scoped, and documented.',
  },
]
function cO() {
  return d.jsx('section', {
    className: 'py-20 px-4 sm:px-6 border-t border-border',
    children: d.jsxs('div', {
      className: 'max-w-7xl mx-auto',
      children: [
        d.jsxs('div', {
          className: 'mb-10',
          children: [
            d.jsx('h2', {
              className: 'text-2xl sm:text-3xl font-bold text-foreground',
              children: 'Ethics & Limits',
            }),
            d.jsx('p', {
              className: 'mt-2 text-sm text-muted-foreground',
              children: 'Hard boundaries that keep the work honest.',
            }),
          ],
        }),
        d.jsx('div', {
          className: 'grid sm:grid-cols-3 gap-4',
          children: lO.map((e, t) =>
            d.jsxs(
              'div',
              {
                className: 'rounded-xl border border-border bg-card p-6 space-y-3',
                children: [
                  d.jsxs('div', {
                    className: 'flex items-center gap-3',
                    children: [
                      e.icon,
                      d.jsx('h3', {
                        className: 'text-sm font-semibold text-foreground',
                        children: e.title,
                      }),
                    ],
                  }),
                  d.jsx('p', {
                    className: 'text-sm text-muted-foreground leading-relaxed',
                    children: e.description,
                  }),
                ],
              },
              t
            )
          ),
        }),
      ],
    }),
  })
}
function uO({ trigger: e }) {
  const [t, r] = v.useState(!1),
    [s, a] = v.useState({}),
    [l, u] = v.useState(!1),
    [f, p] = v.useState('general'),
    g = async (x) => {
      x.preventDefault()
      const h = new FormData(x.currentTarget),
        w = h.get('name')?.trim(),
        S = h.get('email')?.trim(),
        N = h.get('message')?.trim(),
        C = {}
      if (
        (w || (C.name = 'Name is required'),
        S || (C.email = 'Email is required'),
        N || (C.message = 'Message is required'),
        Object.keys(C).length > 0)
      ) {
        a(C)
        return
      }
      u(!0)
      try {
        const E = await fetch('/api/forms/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name: w, email: S, subject: f, message: N }),
        })
        if (!E.ok) {
          const P = await E.json().catch(() => ({}))
          Nt.error(P.error ?? 'Something went wrong. Please try again.')
          return
        }
        ;(Nt.success("Message sent. We'll be in touch soon."),
          r(!1),
          a({}),
          p('general'),
          x.target.reset())
      } catch {
        Nt.error('Network error. Please try again.')
      } finally {
        u(!1)
      }
    }
  return d.jsxs(Bi, {
    open: t,
    onOpenChange: r,
    children: [
      d.jsx(zi, { asChild: !0, children: e }),
      d.jsxs(vs, {
        className: 'sm:max-w-[500px] border-border bg-card max-h-[90vh] overflow-y-auto',
        children: [
          d.jsxs($i, {
            children: [
              d.jsx(ys, { className: 'text-xl', children: 'Start a conversation with the Lab.' }),
              d.jsx(Wi, {
                children: 'Reach out for general inquiries, partnerships, or investment.',
              }),
            ],
          }),
          d.jsxs('form', {
            onSubmit: g,
            className: 'space-y-6 pt-4',
            children: [
              d.jsxs('div', {
                className: 'space-y-4',
                children: [
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'ct-name', children: 'Full Name *' }),
                      d.jsx(rn, {
                        id: 'ct-name',
                        name: 'name',
                        placeholder: 'John Doe',
                        className: 'border-border bg-background',
                      }),
                      s.name &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: s.name }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'ct-email', children: 'Email address *' }),
                      d.jsx(rn, {
                        id: 'ct-email',
                        name: 'email',
                        type: 'email',
                        placeholder: 'john@example.com',
                        className: 'border-border bg-background',
                      }),
                      s.email &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: s.email }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { children: 'Subject' }),
                      d.jsxs(b1, {
                        value: f,
                        onValueChange: p,
                        children: [
                          d.jsx(Np, {
                            className: 'border-border bg-background',
                            children: d.jsx(S1, { placeholder: 'Select subject' }),
                          }),
                          d.jsxs(Pp, {
                            children: [
                              d.jsx(zt, { value: 'general', children: 'General inquiry' }),
                              d.jsx(zt, { value: 'partnership', children: 'Partnership' }),
                              d.jsx(zt, { value: 'investment', children: 'Investment' }),
                              d.jsx(zt, { value: 'media', children: 'Media' }),
                              d.jsx(zt, { value: 'other', children: 'Other' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  d.jsxs('div', {
                    className: 'space-y-2',
                    children: [
                      d.jsx(qe, { htmlFor: 'ct-message', children: 'Message *' }),
                      d.jsx(Ui, {
                        id: 'ct-message',
                        name: 'message',
                        placeholder: 'How can we help?',
                        className: 'border-border bg-background min-h-[120px]',
                      }),
                      s.message &&
                        d.jsx('p', { className: 'text-xs text-destructive', children: s.message }),
                    ],
                  }),
                ],
              }),
              d.jsx(Lr, {
                type: 'submit',
                disabled: l,
                className: 'w-full bg-primary text-primary-foreground hover:bg-primary/90',
                children: l
                  ? d.jsxs(d.Fragment, {
                      children: [
                        d.jsx(ki, { className: 'h-4 w-4 mr-2 animate-spin' }),
                        'Sending...',
                      ],
                    })
                  : 'Send message',
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
function dO() {
  return d.jsx('footer', {
    className: 'border-t border-border bg-card/50 py-10 px-4 sm:px-6',
    children: d.jsxs('div', {
      className: 'max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4',
      children: [
        d.jsxs('div', {
          className: 'flex items-center gap-3',
          children: [
            d.jsx('img', {
              src: '/logo.png',
              alt: 'Crown Labs',
              className: 'h-6 w-auto opacity-60',
            }),
            d.jsxs('p', {
              className: 'text-xs text-muted-foreground',
              children: [
                '© ',
                new Date().getFullYear(),
                ' Crown Labs · Applied Intelligence Studio',
              ],
            }),
          ],
        }),
        d.jsxs('div', {
          className: 'flex items-center gap-4',
          children: [
            d.jsx('a', {
              href: '#portfolio',
              className: 'text-xs text-muted-foreground hover:text-foreground transition-colors',
              children: 'Portfolio',
            }),
            d.jsx(uO, {
              trigger: d.jsx('button', {
                className: 'text-xs text-muted-foreground hover:text-foreground transition-colors',
                children: 'Contact',
              }),
            }),
            d.jsx('a', {
              href: 'https://www.darenprince.com/book.html',
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'text-xs text-muted-foreground hover:text-foreground transition-colors',
              children: 'Buy book',
            }),
          ],
        }),
      ],
    }),
  })
}
var fO = (e, t, r, s, a, l, u, f) => {
    let p = document.documentElement,
      g = ['light', 'dark']
    function x(S) {
      ;((Array.isArray(e) ? e : [e]).forEach((N) => {
        let C = N === 'class',
          E = C && l ? a.map((P) => l[P] || P) : a
        C ? (p.classList.remove(...E), p.classList.add(l && l[S] ? l[S] : S)) : p.setAttribute(N, S)
      }),
        h(S))
    }
    function h(S) {
      f && g.includes(S) && (p.style.colorScheme = S)
    }
    function w() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    if (s) x(s)
    else
      try {
        let S = localStorage.getItem(t) || r,
          N = u && S === 'system' ? w() : S
        x(N)
      } catch {}
  },
  pO = v.createContext(void 0),
  mO = { setTheme: (e) => {}, themes: [] },
  hO = () => {
    var e
    return (e = v.useContext(pO)) != null ? e : mO
  }
v.memo(
  ({
    forcedTheme: e,
    storageKey: t,
    attribute: r,
    enableSystem: s,
    enableColorScheme: a,
    defaultTheme: l,
    value: u,
    themes: f,
    nonce: p,
    scriptProps: g,
  }) => {
    let x = JSON.stringify([r, t, l, e, f, u, s, a]).slice(1, -1)
    return v.createElement('script', {
      ...g,
      suppressHydrationWarning: !0,
      nonce: typeof window > 'u' ? p : '',
      dangerouslySetInnerHTML: { __html: `(${fO.toString()})(${x})` },
    })
  }
)
const gO = ({ ...e }) => {
  const { theme: t = 'system' } = hO()
  return d.jsx(yM, {
    theme: t,
    className: 'toaster group',
    toastOptions: {
      classNames: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    },
    ...e,
  })
}
function vO() {
  const [e, t] = v.useState(!1)
  v.useEffect(() => {
    const s = () => {
      window.scrollY > 300 ? t(!0) : t(!1)
    }
    return (window.addEventListener('scroll', s), () => window.removeEventListener('scroll', s))
  }, [])
  const r = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return d.jsx(os, {
    children:
      e &&
      d.jsx(ft.button, {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        onClick: r,
        className:
          'fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors',
        'aria-label': 'Scroll to top',
        children: d.jsx(WC, { className: 'h-5 w-5' }),
      }),
  })
}
function yO() {
  const { scrollYProgress: e } = sk()
  return d.jsx(ft.div, {
    className: 'fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left',
    style: { scaleX: e },
  })
}
function kr({ children: e, delay: t = 0 }) {
  const r = v.useRef(null),
    s = Zf(r, { once: !0, margin: '-100px 0px' })
  return d.jsx(ft.div, {
    ref: r,
    initial: { opacity: 0, y: 30 },
    animate: s ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.6, delay: t, ease: 'easeOut' },
    children: e,
  })
}
function xO() {
  return d.jsxs('div', {
    className: 'min-h-screen bg-background text-foreground',
    children: [
      d.jsx(yO, {}),
      d.jsx(RD, {}),
      d.jsxs('main', {
        children: [
          d.jsx(kr, { children: d.jsx(gI, {}) }),
          d.jsx(kr, { children: d.jsx(yI, {}) }),
          d.jsx(kr, { children: d.jsx(CI, {}) }),
          d.jsx(kr, { children: d.jsx(JI, {}) }),
          d.jsx(kr, { children: d.jsx(nO, {}) }),
          d.jsx(kr, { children: d.jsx(rO, {}) }),
          d.jsx(kr, { children: d.jsx(aO, {}) }),
          d.jsx(kr, { children: d.jsx(cO, {}) }),
        ],
      }),
      d.jsx(dO, {}),
      d.jsx(vO, {}),
      d.jsx(gO, {}),
    ],
  })
}
LC.createRoot(document.getElementById('root')).render(d.jsx(xO, {}))
