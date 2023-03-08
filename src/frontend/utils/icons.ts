// Utility functions for icons
import svgDefault from "../icons/default.svg?raw";
import svgFolder from "../icons/folder.svg?raw";
import svgHTML from "../icons/html.svg?raw";
import svgImage from "../icons/image.svg?raw";
import svgPDF from "../icons/pdf.svg?raw";
import svgText from "../icons/text.svg?raw";
import svgPPT from "../icons/ppt.svg?raw";
import svgAVI from "../icons/avi.svg?raw";
import svgAudio from "../icons/audio.svg?raw";
import svgXLS from "../icons/xls.svg?raw";
import svgDOC from "../icons/doc.svg?raw";

export const createSVG = (
  svgString: string = "",
  attributes: Record<string, string> = {}
) => {
  var span = document.createElement("span");
  span.setAttribute("width", "16px");
  span.setAttribute("height", "16px");
  span.innerHTML = svgString;
  Object.entries(attributes).forEach(([key, val]) => {
    span.setAttribute(key, val);
  });
  return span;
};

// Create an SVG elenent
export const createSvgElement = (
  svgString: string = "",
  attributes: Record<string, string> = {}
) => {
  // @TODO find a better typing here
  const svg = document
    .createRange()
    .createContextualFragment(svgString) as unknown as SVGElement;

  Object.entries(attributes).forEach(([key, val]) => {
    svg.setAttribute(key, val);
  });
  return svg;
};

// based on the type we return an svg to display as the icon
export const getIcon = (
  type: string,
  attributes: Record<string, string> = {}
) => {
  let svg;
  switch (type) {
    case "gif":
    case "tiff":
    case "png":
    case "jpg":
    case "jpeg":
      svg = svgImage;
      break;

    case "mp3":
    case "aud":
    case "wav":
    case "snd":
    case "mid":
    case "aac":
    case "ac3":
      svg = svgAudio;
      break;

    case "txt":
    case "json":
      svg = svgText;
      break;

    case "doc":
    case "docx":
      svg = svgDOC;
      break;

    case "xls":
    case "xlsx":
      svg = svgXLS;
      break;

    case "avi":
    case "mov":
    case "mp4":
    case "mpeg":
      svg = svgAVI;
      break;

    case "html":
      svg = svgHTML;
      break;

    case "ppt":
      svg = svgPPT;
      break;

    case "pdf":
      svg = svgPDF;
      break;

    case "folder":
      svg = svgFolder;
      attributes.class = "folder_icon";
      break;

    default:
      svg = svgDefault;
      break;
  }

  return createSVG(svg, attributes);
};
