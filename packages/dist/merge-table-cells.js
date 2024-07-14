var m = Object.defineProperty;
var M = (a, t, n) => t in a ? m(a, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : a[t] = n;
var p = (a, t, n) => M(a, typeof t != "symbol" ? t + "" : t, n);
function S(a, t) {
  const { count: n = 0, children: o = /* @__PURE__ */ new Map() } = a.get(t) || {};
  return a.set(t, { count: n + 1, children: o }), a.get(t);
}
function D(a) {
  const t = [];
  if (a.length < 2)
    return t;
  for (let n = 0; n < a.length; n++)
    for (let o = n + 1; o < a.length; o++) {
      const f = a.slice(n, o + 1);
      f.length >= 2 && t.push(f);
    }
  return t.sort((n, o) => o.length - n.length);
}
class j {
  constructor(t) {
    p(this, "mergeKeys", {
      rowspan: [],
      colspan: []
    });
    p(this, "alias", "_span");
    const n = Array.isArray(t) ? {
      rowspan: t,
      colspan: t
    } : t;
    this.mergeKeys.rowspan = (n == null ? void 0 : n.rowspan) || [], this.mergeKeys.colspan = (n == null ? void 0 : n.colspan) || [];
  }
  format(t, n) {
    const { rowspan: o, colspan: f } = this.mergeKeys, i = (s, r) => {
      if (typeof n == "function")
        return n(s, r);
      for (let l of o) {
        const e = String(s[l] ?? ""), h = String(r[l] ?? "");
        if (e !== h)
          return e.localeCompare(h);
      }
      return 0;
    }, d = [...t].sort(i), y = d.reduce((s, r) => (o.reduce(
      (l, e) => S(l.children || s, r[e]),
      {}
    ), s), /* @__PURE__ */ new Map()), C = (s) => o.reduce((r, l, e) => (e === 0 ? r.push(y.get(s[l])) : r.push(r[e - 1].children.get(s[l])), r), []), K = D(f), b = (s, r) => {
      const l = {};
      for (let e of K)
        if (e.every((u, c) => {
          if (c === 0)
            return !0;
          const g = r[u] === r[e[c - 1]];
          return typeof s[u] == "number" ? g && s[u] > 0 && s[u] === s[e[c - 1]] : r[u] === r[e[c - 1]];
        })) {
          e.forEach((u, c) => {
            l[u] = c === 0 ? e.length : 0;
          });
          break;
        }
      return l;
    };
    return d.map((s, r, l) => {
      const e = {
        rowspan: {},
        colspan: {}
      }, h = C(s);
      if (r === 0)
        return o.forEach((c, g) => {
          e.rowspan[c] = h[g].count;
        }), e.colspan = b(e.rowspan, s), s[this.alias] = e, s;
      const u = (c) => s[c] === l[r - 1][c];
      return o.reduce((c, g, v) => {
        const w = c && u(g);
        return e.rowspan[g] = w ? 0 : h[v].count, w;
      }, !0), e.colspan = b(e.rowspan, s), s[this.alias] = e, s;
    });
  }
  span(t, n) {
    const o = n[this.alias] || {}, f = {
      rowspan: 1,
      colspan: 1
    };
    return Object.keys(f).forEach((i) => {
      ({}).hasOwnProperty.call(o[i] || {}, t) && (f[i] = o[i][t]);
    }), f;
  }
}
export {
  j as default
};
