import { NodeType } from "../types/types";
export const mockData = [
    {
        type: NodeType.Folder,
        name: "Users",
        modified: "1660018217506",
        size: 50000000,
        children: [
            {
                type: NodeType.Folder,
                name: "John Doe",
                modified: "1660018217506",
                size: 0,
                children: [
                    {
                        type: NodeType.Folder,
                        name: "work_related",
                        modified: "1660015217906",
                        size: 0,
                        children: [
                            {
                                type: NodeType.File,
                                name: "company-logo.jpg",
                                modified: "1580018217506",
                                size: 334523452,
                                children: [],
                            },
                            {
                                type: NodeType.File,
                                name: "wireframe.png",
                                modified: "1670018217506",
                                size: 53523452,
                                children: [],
                            },
                            {
                                type: NodeType.File,
                                name: "budget.xls",
                                modified: "1650018217506",
                                size: 63452345,
                                children: [],
                            },
                        ],
                    },
                    {
                        type: NodeType.Folder,
                        name: "family",
                        modified: "1660015217906",
                        size: 0,
                        children: [
                            {
                                type: NodeType.File,
                                name: "dog.jpg",
                                modified: "1580018217506",
                                size: 334523452,
                                children: [],
                            },
                            {
                                type: NodeType.File,
                                name: "cat.png",
                                modified: "1670018217506",
                                size: 53523452,
                                children: [],
                            },
                            {
                                type: NodeType.File,
                                name: "familytree.txt",
                                modified: "1650018217506",
                                size: 63452345,
                                children: [],
                            },
                        ],
                    },
                    {
                        type: NodeType.File,
                        name: "myimage.jpg",
                        modified: "1660018217506",
                        size: 234523452,
                        children: [],
                    },
                    {
                        type: NodeType.File,
                        name: "avatar.png",
                        modified: "1660018217506",
                        size: 43523452,
                        children: [],
                    },
                    {
                        type: NodeType.File,
                        name: "index.html",
                        modified: "1660018217506",
                        size: 23452345,
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        type: NodeType.File,
        name: "some-logo.jpg",
        modified: "1580018217506",
        size: 334523452,
        children: [],
    },
];
