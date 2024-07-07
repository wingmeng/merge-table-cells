var C = Object.defineProperty;
var v = (a, n, s) => n in a ? C(a, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : a[n] = s;
var p = (a, n, s) => v(a, typeof n != "symbol" ? n + "" : n, s);
function M(a, n) {
  const { count: s = 0, children: r = /* @__PURE__ */ new Map() } = a.get(n) || {};
  return a.set(n, { count: s + 1, children: r }), a.get(n);
}
function D(a) {
  const n = [];
  if (a.length < 2)
    return n;
  for (let s = 0; s < a.length; s++)
    for (let r = s + 1; r < a.length; r++) {
      const c = a.slice(s, r + 1);
      c.length >= 2 && n.push(c);
    }
  return n.sort((s, r) => r.length - s.length), n;
}
class I {
  constructor(n) {
    p(this, "mergeKeys", {
      rowspan: [],
      colspan: []
    });
    p(this, "alias", "_span");
    const s = Array.isArray(n) ? {
      rowspan: n,
      colspan: n
    } : n;
    this.mergeKeys.rowspan = (s == null ? void 0 : s.rowspan) || [], this.mergeKeys.colspan = (s == null ? void 0 : s.colspan) || [];
  }
  format(n, s) {
    const { rowspan: r, colspan: c } = this.mergeKeys, i = (t, l) => {
      if (typeof s == "function")
        return s(t, l);
      for (let f of r) {
        const u = String(t[f] ?? ""), g = String(l[f] ?? "");
        if (u !== g)
          return u.localeCompare(g);
      }
      return 0;
    }, w = [...n].sort(i), K = w.reduce((t, l) => (r.reduce(
      (f, u) => M(f.children || t, l[u]),
      {}
    ), t), /* @__PURE__ */ new Map()), b = D(c);
    return w.map((t, l, f) => {
      t[this.alias] = {
        rowspan: {},
        colspan: {}
      };
      const u = b.find(
        (e) => e.every((o, h) => h === 0 ? !0 : t[o] === t[e[h - 1]])
      ) || [];
      u.forEach((e, o) => {
        t[this.alias].colspan[e] = o === 0 ? u.length : 0;
      });
      const g = r.reduce((e, o, h) => (h === 0 ? e.push(K.get(t[o])) : e.push(e[h - 1].children.get(t[o])), e), []);
      if (l === 0)
        return r.forEach((e, o) => {
          t[this.alias].rowspan[e] = g[o].count;
        }), t;
      const y = (e) => t[e] === f[l - 1][e];
      return r.reduce((e, o, h) => {
        const d = e && y(o);
        return t[this.alias].rowspan[o] = d ? 0 : g[h].count, d;
      }, !0), t;
    });
  }
  span(n, s) {
    const r = s[this.alias] || {}, c = {
      rowspan: 1,
      colspan: 1
    };
    return Object.keys(c).forEach((i) => {
      ({}).hasOwnProperty.call(r[i] || {}, n) && (c[i] = r[i][n]);
    }), c;
  }
}
export {
  I as default
};
