/* @ds-bundle: {"format":4,"namespace":"ACMEDesignSystem_739be1","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Alert","sourcePath":"components/display/Alert.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Table","sourcePath":"components/display/Table.jsx"},{"name":"Choice","sourcePath":"components/forms/Choice.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Topbar","sourcePath":"components/navigation/Topbar.jsx"},{"name":"Modal","sourcePath":"components/overlay/Modal.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"3549ee5e9e12","components/brand/Wordmark.jsx":"6bd29ffaa40b","components/display/Alert.jsx":"c3f8dff818c6","components/display/Badge.jsx":"d90fef42c8d4","components/display/Card.jsx":"396448c02533","components/display/Table.jsx":"e8791911fbd8","components/forms/Choice.jsx":"0e5c5c883e43","components/forms/Field.jsx":"bcb4c7edd388","components/forms/Input.jsx":"a89af1f8b786","components/forms/Select.jsx":"730218c777a2","components/forms/Switch.jsx":"1436c0df8246","components/forms/Textarea.jsx":"8db51ce9bc53","components/navigation/Breadcrumbs.jsx":"036d727f9ee9","components/navigation/Tabs.jsx":"001f4f96fddc","components/navigation/Topbar.jsx":"f18de18edb90","components/overlay/Modal.jsx":"00b8820a9a35"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ACMEDesignSystem_739be1 = window.ACMEDesignSystem_739be1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'secondary',
  size,
  className = '',
  children,
  ...rest
}) {
  const cls = ['acme-btn', 'acme-btn--' + variant, size ? 'acme-btn--' + size : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Wordmark({
  href = '/',
  markOnly = false,
  style,
  ...rest
}) {
  const mark = /*#__PURE__*/React.createElement("span", {
    className: "acme-wordmark__mark",
    "aria-hidden": markOnly ? undefined : 'true'
  }, "A");
  if (markOnly) return /*#__PURE__*/React.createElement("span", _extends({
    className: "acme-wordmark",
    style: style
  }, rest), mark);
  return /*#__PURE__*/React.createElement("a", _extends({
    className: "acme-wordmark",
    href: href,
    style: style
  }, rest), mark, "ACME");
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/display/Alert.jsx
try { (() => {
function Alert({
  variant,
  title,
  children
}) {
  const role = variant === 'warning' || variant === 'danger' ? 'alert' : 'status';
  return /*#__PURE__*/React.createElement("div", {
    className: 'acme-alert' + (variant ? ' acme-alert--' + variant : ''),
    role: role
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("p", {
    className: "acme-alert__title"
  }, title), typeof children === 'string' ? /*#__PURE__*/React.createElement("p", null, children) : children));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Alert.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function Badge({
  variant,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'acme-badge' + (variant ? ' acme-badge--' + variant : '')
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  media,
  title,
  footer,
  interactive = false,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    className: 'acme-card' + (interactive ? ' acme-card--interactive' : ''),
    style: style
  }, rest), media !== undefined && /*#__PURE__*/React.createElement("div", {
    className: "acme-card__media"
  }, media), /*#__PURE__*/React.createElement("div", {
    className: "acme-card__body"
  }, title && /*#__PURE__*/React.createElement("h3", {
    className: "acme-card__title"
  }, title), children), footer && /*#__PURE__*/React.createElement("div", {
    className: "acme-card__footer"
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Table.jsx
try { (() => {
function Table({
  columns,
  rows,
  caption,
  children
}) {
  if (children) return /*#__PURE__*/React.createElement("table", {
    className: "acme-table"
  }, caption && /*#__PURE__*/React.createElement("caption", {
    style: {
      position: 'absolute',
      clip: 'rect(0 0 0 0)'
    }
  }, caption), children);
  return /*#__PURE__*/React.createElement("table", {
    className: "acme-table"
  }, caption && /*#__PURE__*/React.createElement("caption", {
    style: {
      position: 'absolute',
      clip: 'rect(0 0 0 0)'
    }
  }, caption), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, (columns || []).map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    scope: "col",
    className: c.numeric ? 'acme-table__num' : undefined
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, (rows || []).map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, (columns || []).map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    className: c.numeric ? 'acme-table__num' : undefined
  }, r[c.key]))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Table.jsx", error: String((e && e.message) || e) }); }

// components/forms/Choice.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Choice({
  type = 'checkbox',
  label,
  description,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "acme-choice"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, rest)), /*#__PURE__*/React.createElement("span", null, label, description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--acme-text-xs)',
      color: 'var(--acme-color-text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Choice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Choice.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  optional = false,
  help,
  error,
  htmlFor,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "acme-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "acme-label",
    htmlFor: htmlFor
  }, label, optional && /*#__PURE__*/React.createElement("span", {
    className: "acme-label__optional"
  }, " (optional)")), children, error ? /*#__PURE__*/React.createElement("p", {
    className: "acme-error"
  }, error) : help ? /*#__PURE__*/React.createElement("p", {
    className: "acme-help"
  }, help) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  invalid = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    className: ('acme-input ' + className).trim(),
    "aria-invalid": invalid || undefined
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  invalid = false,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("select", _extends({
    className: ('acme-input ' + className).trim(),
    "aria-invalid": invalid || undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "acme-switch"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  invalid = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    className: ('acme-input ' + className).trim(),
    "aria-invalid": invalid || undefined
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
function Breadcrumbs({
  items = []
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb"
  }, /*#__PURE__*/React.createElement("div", {
    className: "acme-breadcrumbs"
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    const label = typeof it === 'string' ? it : it.label;
    const href = typeof it === 'string' ? '#' : it.href || '#';
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "/"), last ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page"
    }, label) : /*#__PURE__*/React.createElement("a", {
      href: href
    }, label));
  })));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "acme-tabs",
    role: "tablist"
  }, tabs.map(t => {
    const id = typeof t === 'string' ? t : t.id;
    const label = typeof t === 'string' ? t : t.label;
    const count = typeof t === 'string' ? undefined : t.count;
    const sel = id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      role: "tab",
      className: "acme-tab",
      "aria-selected": sel,
      onClick: onChange ? () => onChange(id) : undefined
    }, label, count !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        color: sel ? undefined : 'var(--acme-color-text-subtle)',
        marginInlineStart: 6
      }
    }, count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Topbar.jsx
try { (() => {
function Topbar({
  links = [],
  current,
  children
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "acme-topbar"
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, null), /*#__PURE__*/React.createElement("nav", {
    className: "acme-topbar__nav",
    "aria-label": "Primary"
  }, links.map(l => {
    const label = typeof l === 'string' ? l : l.label;
    const href = typeof l === 'string' ? '#' : l.href || '#';
    return /*#__PURE__*/React.createElement("a", {
      key: label,
      className: "acme-topbar__link",
      href: href,
      "aria-current": label === current ? 'page' : undefined
    }, label);
  })), children);
}
Object.assign(__ds_scope, { Topbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Topbar.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Modal.jsx
try { (() => {
function Modal({
  open = true,
  title,
  footer,
  onClose,
  dismissOnBackdrop = true,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "acme-modal-backdrop",
    onClick: dismissOnBackdrop && onClose ? e => {
      if (e.target === e.currentTarget) onClose();
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "acme-modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": typeof title === 'string' ? title : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "acme-modal__header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "acme-modal__title"
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "acme-btn acme-btn--ghost acme-btn--sm",
    "aria-label": "Close",
    onClick: onClose
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    className: "acme-modal__body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "acme-modal__footer"
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Modal.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Choice = __ds_scope.Choice;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Topbar = __ds_scope.Topbar;

__ds_ns.Modal = __ds_scope.Modal;

})();
