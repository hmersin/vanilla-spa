// Utility functions for html, document, and elements
export const createElement = (
  tag: string = "div",
  content: string = "",
  attributes: Record<string, string> = {},
  children: (Element | DocumentFragment)[] = [],
  prepend: (Element | DocumentFragment)[] = []
) => {
  const el = document.createElement(tag);
  el.innerText = content;
  Object.entries(attributes).forEach(([key, val]) => el.setAttribute(key, val));
  children.filter(Boolean).forEach((child) => el.appendChild(child));
  prepend.filter(Boolean).forEach((child) => el.prepend(child));
  return el;
};

export const isExpanded = (element: Element | null) => {
  return element?.getAttribute("aria-expanded") === "true";
};

export const expand = (element: Element | null) => {
  element?.setAttribute("aria-expanded", "true");
};

export const collapse = (element: Element | null) => {
  element?.setAttribute("aria-expanded", "false");
};

export const toggle = (element: Element | null) => {
  isExpanded(element) ? collapse(element) : expand(element);
};

export const convertToDOM = (html: string) => {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
};
