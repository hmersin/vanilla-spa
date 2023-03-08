import svgFolder from "../icons/folder.svg?raw";
import { isFolder, createElement, createSVG, toggle, collapse, expand, getUrlHash, getUrlPath, getCurrentUrl, } from "../utils";
export class TreeView {
    parent;
    data;
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
        // Add Event Handlers
        this.parent?.addEventListener("click", this.handleMouseEvent);
        this.parent?.addEventListener("keydown", this.handleKeyboardEvent);
    }
    render = () => {
        if (this.parent) {
            const navigation = this.getBranchContent(this.data, createElement("ul", "", { role: "tree" }));
            this.parent?.replaceChildren(navigation);
        }
    };
    getBranchContent = (dataFragment = [], parentNode) => {
        dataFragment
            .filter(isFolder)
            .map((node) => {
            // Check if this folder has child folders
            const hasChildFolders = node?.children?.some(isFolder);
            const prepends = [
                createSVG(svgFolder, { class: "folder_icon" }),
            ];
            // Add an arrow icon if this node has child folders
            if (hasChildFolders) {
                prepends.push(createElement("span", "▼", { class: "icon" }));
            }
            else {
                prepends.push(createElement("span", "▼", { class: "icon-placeholder" }));
            }
            const linkAttributes = hasChildFolders && {
                "aria-owns": node.urlPath,
                "aria-expanded": Boolean(
                // if this node's name is in the path mark it active
                getUrlHash().split("/").includes(node.name) ||
                    getUrlHash() === node.urlPath).toString(),
            };
            const link = createElement("a", node.name, {
                href: `${getUrlPath()}#/${node.urlPath}`,
                class: `node_link ${getUrlHash() === node.urlPath ? "Active" : ""}`,
                role: "treeitem",
                ...linkAttributes,
            }, [], prepends);
            const ul = hasChildFolders &&
                this.getBranchContent(node?.children, createElement("ul", "", {
                    id: node?.urlPath || "",
                    role: "group",
                }));
            const appends = [link];
            if (ul) {
                appends.push(ul);
            }
            const li = createElement("li", "", { role: "listitem" }, appends);
            return li;
        })
            .forEach((el) => {
            parentNode.appendChild(el);
        });
        return parentNode;
    };
    update = () => {
        // Remove all actives
        this.parent?.querySelectorAll(".node_link")?.forEach((el) => {
            el.classList.remove("active");
        });
        // Find the correct node and mark it active
        const el = this.parent?.querySelector(`[href='${getCurrentUrl()}'`);
        if (el) {
            el.classList.add("active");
            expand(el.closest(".node_link"));
        }
    };
    handleMouseEvent = (e) => {
        const target = e?.target;
        if (target instanceof Element) {
            const dropdown = target.closest(".icon");
            if (dropdown) {
                toggle(target.parentElement);
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };
    handleKeyboardEvent = (e) => {
        const target = e?.target;
        if (target instanceof Element) {
            switch (e.key) {
                case "Enter":
                case "Space":
                    toggle(target);
                case "ArrowLeft":
                    collapse(target);
                    break;
                case "ArrowRight":
                    expand(target);
                    break;
                default:
                    break;
            }
        }
    };
}
