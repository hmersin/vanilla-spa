export const isFolder = (node) => {
    return node.type === "folder";
};
// We don't have mimetypes or anything,
// so we are using the file extension
export const getFileType = (node) => {
    return isFolder(node) ? "folder" : node.name.split(".").at(1);
};
export const addPathInformation = (data, parentPath = []) => {
    const newData = [];
    data.forEach((item) => {
        // deconstruct non-children fields as the newItem
        const { children, ...rest } = item;
        const newItem = {
            ...rest,
            hasSubfolders: children?.some(isFolder) ?? false,
            path: [...parentPath, item.name],
        };
        newItem.urlPath = newItem?.path?.join("/");
        if (children?.length) {
            newItem.hasSubfolders = true;
            newItem.children = addPathInformation(children, newItem?.path || []);
        }
        newData.push(newItem);
    });
    return newData;
};
// Find the first node by path
export const findFirstNode = (data, path) => {
    if (!data || !Array.isArray(data)) {
        return;
    }
    let result;
    for (let i = 0; i < data.length; i++) {
        const current = data[i];
        if (current.urlPath === path) {
            result = current;
            break;
        }
        else if (!result && isFolder(current)) {
            result = findFirstNode(current?.children || [], path);
            if (result) {
                break;
            }
        }
    }
    return result;
};
