import { expect, test } from "vitest";
import { IExtendedTreeNode } from "../types/types";
import {
  isFolder,
  getFileType,
  addPathInformation,
  findFirstNode,
} from "./index";

import { mockData } from "./mockNodes";

const [mockFolderNode, mockFileNode] = mockData;

test("Should determine whether node is a folder", () => {
  expect(isFolder(mockFolderNode)).toBe(true);
  expect(isFolder(mockFileNode)).toBe(false);
});

test("Should get the correct file type", () => {
  expect(getFileType(mockFileNode)).toBe("jpg");
});

test("Should correctly iterate over the tree and add path information for each node", () => {
  const extendedData = addPathInformation(mockData);
  const nestedNode: IExtendedTreeNode | undefined =
    extendedData?.[0]?.children?.[0]?.children?.[0];
  expect(nestedNode).toBeDefined();
  expect(nestedNode?.name).toBe("work_related");
  expect(nestedNode?.path).toStrictEqual (["Users", "John Doe", "work_related"]);
  expect(nestedNode?.urlPath).toBe("Users/John Doe/work_related");
  expect(nestedNode?.hasSubfolders).toBe(true);
});

test("Should find the correct node for the given path", () => {
  const extendedData = addPathInformation(mockData);
  const targetPath = "Users/John Doe/work_related"
  const foundNode = findFirstNode(extendedData, targetPath);

  expect(foundNode).toBeDefined();
  expect(foundNode?.name).toBe("work_related");
  expect(foundNode?.path).toStrictEqual (["Users", "John Doe", "work_related"]);
  expect(foundNode?.hasSubfolders).toBe(true);
});
