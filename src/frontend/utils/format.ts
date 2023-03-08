export const formatDate = (dateInMilliseconds: any) => {
  return new Date(parseInt(dateInMilliseconds)).toLocaleDateString("en-US");
};

/**
 * Formats bytes into a more readable form
 * taken from: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * @param {number} bytes in binary
 * @param {number} decimals
 * @returns string
 */
export const formatBytes = (bytes: number) => {
  const decimals = 2;
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
