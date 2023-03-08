import svgDownArrow from "../icons/downArrow.svg?raw";
import svgUpArrow from "../icons/upArrow.svg?raw";
import { NodeType } from "../types/types";
import { createElement, createSVG, formatBytes, formatDate, getFileType, getIcon, isFolder, } from "../utils";
const downArrow = createSVG(svgDownArrow);
const upArrow = createSVG(svgUpArrow);
// Definition of the table
const filesTable = {
    columns: [
        {
            id: "name",
            header: "Name",
            sortKey: "name",
            width: "100%",
            renderValue: (dataRow) => dataRow.name,
            renderIcon: (dataRow) => getIcon(getFileType(dataRow) ?? ""),
        },
        {
            id: "modified",
            header: "Date Modified",
            sortKey: "modified",
            width: "200px",
            renderValue: (dataRow) => formatDate(dataRow.modified),
        },
        {
            id: "size",
            header: "File Size",
            sortKey: "size",
            width: "170px",
            // Don't show size info for folders, only for files
            renderValue: (dataRow) => dataRow.type === NodeType.Folder ? "" : formatBytes(dataRow.size),
        },
    ],
};
export class Table {
    parent;
    data;
    sortKey;
    sortDirection;
    constructor(parent, data, sortKey = "name", sortDirection = "ASC") {
        this.parent = parent;
        this.data = data;
        this.sortKey = sortKey;
        this.sortDirection = sortDirection;
    }
    render = () => {
        if (this.parent) {
            this.sortData();
            filesTable.rows = this.data;
            const table = this.createTable(filesTable);
            this.parent.replaceChildren(table);
        }
    };
    // Sort the items so that all the folders are listed before the files
    // Each group gets sorted based on the sortKey
    sortData = () => {
        const multiplier = this.sortDirection === "DESC" ? -1 : 1;
        this.data.sort((a, b) => a[this.sortKey] < b[this.sortKey]
            ? -1 * multiplier
            : a[this.sortKey] > b[this.sortKey]
                ? 1 * multiplier
                : 0);
    };
    updateSort = (sortKey) => {
        if (sortKey) {
            // if the data is already being sorted for this key, then reverse the direction
            if (sortKey === this.sortKey) {
                this.sortDirection = this.sortDirection === "ASC" ? "DESC" : "ASC";
            }
            else {
                this.sortKey = sortKey;
                this.sortDirection = "ASC";
            }
            this.render();
        }
    };
    // Generate table header
    createTableHeader = (tableDefinition) => {
        const tableHeaders = tableDefinition.columns.map((c) => {
            const appendElements = [];
            if (this.sortKey === c.sortKey) {
                appendElements.push(this.sortDirection === "ASC" ? downArrow : upArrow);
            }
            // Create a button to sort by the column
            const buttonSort = createElement("button", c.header, {}, appendElements, []);
            buttonSort.id = `buttonSort_${c.id}`;
            buttonSort.addEventListener("click", () => {
                this.updateSort(c?.sortKey);
            });
            return createElement("th", "", { width: c?.width || "auto" }, [buttonSort], []);
        });
        return createElement("tr", "", {}, [...tableHeaders]);
    };
    // Create a table data row for the given tree node
    createTableRow = (tableDefinition, node) => {
        // Create a cell (TD Element) for each column
        // and populate it using the data value
        const cells = tableDefinition.columns.map((c) => {
            const elements = [];
            if (c?.renderIcon) {
                elements.push(c?.renderIcon?.(node));
            }
            // Create a link for navigating to the folder details
            const link = createElement("a", c.renderValue(node), { href: `#/${node.urlPath}`, class: !isFolder(node) ? "disabled" : "" }, [], elements);
            return createElement("td", "", {}, [link]);
        });
        // Create a row (TR Element) for each ITreeNode in the data array
        // and populate it with previously created cells
        return createElement("tr", "", {}, [...cells]);
    };
    // Create a table
    createTable = (tableDefinition) => {
        // Create a header
        const tableHeader = this.createTableHeader(tableDefinition);
        // Create data rows
        const rows = tableDefinition.rows?.map((row) => this.createTableRow(tableDefinition, row)) ?? [];
        // Create the table with the header + data rows and return it
        return createElement("table", "", { id: "node_list_table", class: "table" }, [tableHeader, ...rows]);
    };
}
