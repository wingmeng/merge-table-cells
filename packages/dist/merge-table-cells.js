var M = Object.defineProperty;
var D = (o, n, t) => n in o ? M(o, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[n] = t;
var i = (o, n, t) => D(o, typeof n != "symbol" ? n + "" : n, t);
function E(o, n) {
  const { count: t = 0, children: r = /* @__PURE__ */ new Map() } = o.get(n) || {};
  return o.set(n, { count: t + 1, children: r }), o.get(n);
}
function I(o) {
  const n = [];
  if (o.length < 2)
    return n;
  for (let t = 0; t < o.length; t++)
    for (let r = t + 1; r < o.length; r++) {
      const u = o.slice(t, r + 1);
      u.length >= 2 && n.push(u);
    }
  return n.sort((t, r) => r.length - t.length);
}
class j {
  constructor(n) {
    i(this, "mergeKeys", {
      rowspan: [],
      colspan: []
    });
    i(this, "alias", "_span");
    const t = Array.isArray(n) ? {
      rowspan: n,
      colspan: n
    } : n;
    this.mergeKeys.rowspan = (t == null ? void 0 : t.rowspan) || [], this.mergeKeys.colspan = (t == null ? void 0 : t.colspan) || [];
  }
  format(n, t) {
    const { rowspan: r, colspan: u } = this.mergeKeys, g = (s, a) => {
      if (typeof t == "function")
        return t(s, a);
      for (let c of r) {
        const e = String(s[c] ?? ""), h = String(a[c] ?? "");
        if (e !== h)
          return e.localeCompare(h);
      }
      return 0;
    }, d = [...n].sort(g), K = d.reduce((s, a) => (r.reduce(
      (c, e) => E(c.children || s, a[e]),
      {}
    ), s), /* @__PURE__ */ new Map()), v = (s) => r.reduce((a, c, e) => (e === 0 ? a.push(K.get(s[c])) : a.push(a[e - 1].children.get(s[c])), a), []), y = I(u), w = (s, a) => {
      const c = {};
      for (let e of y)
        if (e.every((f, l) => l === 0 ? !0 : a[f] === a[e[l - 1]] && s[f] > 0 && s[f] === s[e[l - 1]])) {
          e.forEach((f, l) => {
            c[f] = l === 0 ? e.length : 0;
          });
          break;
        }
      return c;
    };
    return d.map((s, a, c) => {
      const e = {
        rowspan: {},
        colspan: {}
      }, h = v(s);
      if (a === 0)
        return r.forEach((l, p) => {
          e.rowspan[l] = h[p].count;
        }), e.colspan = w(e.rowspan, s), s[this.alias] = e, s;
      const f = (l) => s[l] === c[a - 1][l];
      return r.reduce((l, p, C) => {
        const b = l && f(p);
        return e.rowspan[p] = b ? 0 : h[C].count, b;
      }, !0), e.colspan = w(e.rowspan, s), s[this.alias] = e, s;
    });
  }
  span(n, t) {
    const r = t[this.alias] || {}, u = {
      rowspan: 1,
      colspan: 1
    };
    return Object.keys(u).forEach((g) => {
      ({}).hasOwnProperty.call(r[g] || {}, n) && (u[g] = r[g][n]);
    }), u;
  }
}
export {
  j as default
};
