(function (window, document) {
  "use strict";

  var DEFAULT_DURATION = 4500;

  function ensureStack() {
    var stack = document.querySelector(".v-toast-stack");
    if (stack) {
      return stack;
    }

    stack = document.createElement("div");
    stack.className = "v-toast-stack";
    stack.setAttribute("aria-live", "polite");
    stack.setAttribute("aria-atomic", "false");
    document.body.appendChild(stack);
    return stack;
  }

  function removeToast(toast) {
    if (!toast || toast.classList.contains("is-leaving")) {
      return;
    }
    toast.classList.add("is-leaving");
    window.setTimeout(function () {
      toast.remove();
    }, 150);
  }

  function normalizeOptions(options) {
    if (typeof options === "string") {
      return { variant: options };
    }
    return options || {};
  }

  function toast(message, options) {
    options = normalizeOptions(options);

    var stack = ensureStack();
    var element = document.createElement("div");
    var variant = String(options.variant || "info").toLowerCase();
    var allowedVariants = ["info", "success", "warning", "danger"];
    if (allowedVariants.indexOf(variant) === -1) {
      variant = "info";
    }

    element.className = "v-toast v-toast-" + variant;
    element.setAttribute("role", variant === "danger" ? "alert" : "status");

    var content = document.createElement("div");
    content.className = "v-toast-content";

    if (options.title) {
      var title = document.createElement("strong");
      title.className = "v-toast-title";
      title.textContent = String(options.title);
      content.appendChild(title);
    }

    var text = document.createElement("div");
    text.className = "v-toast-message";
    text.textContent = String(message == null ? "" : message);
    content.appendChild(text);

    var close = document.createElement("button");
    close.className = "v-toast-close";
    close.type = "button";
    close.setAttribute("aria-label", "Cerrar aviso");
    close.textContent = "x";
    close.addEventListener("click", function () {
      removeToast(element);
    });

    element.appendChild(content);
    element.appendChild(close);
    stack.appendChild(element);

    var duration = options.duration === undefined
      ? DEFAULT_DURATION
      : Number(options.duration);
    var timer = null;
    if (Number.isFinite(duration) && duration > 0) {
      timer = window.setTimeout(function () {
        removeToast(element);
      }, duration);
    }

    return {
      element: element,
      dismiss: function () {
        if (timer !== null) {
          window.clearTimeout(timer);
        }
        removeToast(element);
      },
    };
  }

  function dismissAll() {
    document.querySelectorAll(".v-toast").forEach(removeToast);
  }

  function renderNavigation(container, items, options) {
    options = options || {};
    var links = new Map();
    var nodes = items.map(function (item) {
      var link = item.element || document.createElement("a");
      link.className = item.className || "v-button v-button-ghost";
      link.href = item.href;
      link.textContent = item.label;
      if (item.domId) link.id = item.domId;
      if (item.hidden !== undefined) link.hidden = Boolean(item.hidden);
      if (item.id === options.currentId) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
      links.set(item.id, link);
      return link;
    });
    container.replaceChildren.apply(container, nodes.concat(options.trailingNodes || []));
    return links;
  }

  window.VallUI = window.VallUI || {};
  window.VallUI.renderNavigation = renderNavigation;
  window.VallUI.toast = toast;
  window.VallUI.dismissToasts = dismissAll;
})(window, document);
