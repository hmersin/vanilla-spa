export enum NodeType {
  Folder = "folder",
  File = "file",
}

export interface ITreeNode {
  type: NodeType;
  name: string;
  modified: string;
  size: number;
  children?: ITreeNode[];
}

export interface IExtendedTreeNode extends ITreeNode {
  path?: string[];
  urlPath?: string;
  hasSubfolders?: boolean;
  children?: IExtendedTreeNode[];
}

export interface IColumnDefinition {
  id: string;
  header?: string;
  sortKey?: string;
  width?: string;
  renderIcon?: (rowData: ITreeNode) => Element;
  renderValue: (rowData: ITreeNode) => string;
}

export interface ITableDefinition {
  columns: IColumnDefinition[];
  rows?: ITreeNode[];
}
