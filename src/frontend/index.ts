import "./style.css";

import { TreeView } from "./components/Navigation";
import { Table } from "./components/Table";
import DataService from "./data/Service";
import { addPathInformation, findFirstNode, getUrlHash } from "./utils";

const toggleDarkMode = () => {
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
};

const App = async () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  darkModeToggle?.addEventListener("click", toggleDarkMode);

  const navigation = document.getElementById("navigation");
  const main = document.getElementById("main");

  // Get the file system data in the format of ITreeNode[]
  const rawData = await DataService.getInstance().getItems();

  // Process the rawData and add path information
  const data = addPathInformation(rawData, []);

  const treeview = new TreeView(navigation, data);
  treeview.render();

  const render = () => {
    // Find the target node based on the url
    let activeNode = findFirstNode(data, getUrlHash());
    treeview.update();
    const table = new Table(main, activeNode?.children ?? []);
    table.render();
  };

  // Initial render;
  render();

  /* 
    Attach the hashchange event handler for listening to hash changes so
    We can get the new hash and navigate to the correct folder
    
    i.e #/Folder1/Folder2
  */
  window.addEventListener("hashchange", () => {
    render();
  });
};

App();
