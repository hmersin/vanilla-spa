// Utility functions for html, document, and elements
export const createElement = (tag = "div", content = "", attributes = {}, children = [], prepend = []) => {
    const el = document.createElement(tag);
    el.innerText = content;
    Object.entries(attributes).forEach(([key, val]) => el.setAttribute(key, val));
    children.filter(Boolean).forEach((child) => el.appendChild(child));
    prepend.filter(Boolean).forEach((child) => el.prepend(child));
    return el;
};
export const isExpanded = (element) => {
    return element?.getAttribute("aria-expanded") === "true";
};
export const expand = (element) => {
    element?.setAttribute("aria-expanded", "true");
};
export const collapse = (element) => {
    element?.setAttribute("aria-expanded", "false");
};
export const toggle = (element) => {
    isExpanded(element) ? collapse(element) : expand(element);
};
export const convertToDOM = (html) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
};
