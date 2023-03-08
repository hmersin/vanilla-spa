export const getUrlHash = (url) => {
    return decodeURI(((url || window.location.hash).split("#/").at(1)?.split("?").at(0) || ""));
};
export const getUrlPath = () => {
    return `${window.location.origin}${window.location.pathname}`;
};
export const getCurrentUrl = () => `${getUrlPath()}#/${getUrlHash()}`;
