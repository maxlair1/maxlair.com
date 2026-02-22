'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { useDocs, type Doc } from "@root/app/api/useGithubAPI";

export interface DocTreeItem extends Doc {
    level: number;
    children?: DocTreeItem[];
}

export interface DocIndex {
    bySlug: Record<string, DocTreeItem>;
    byPath: Record<string, DocTreeItem>;
    byPathRelative: Record<string, DocTreeItem>;
}

type DocsContextType = {
  tree: DocTreeItem[];
  index: DocIndex;
  loading: boolean;
};

const DocsContext = createContext<DocsContextType | null>(null);

export function DocsProvider({ children }: { children: React.ReactNode }) {
    const { list } = useDocs();

    const [tree, setTree] = useState<DocTreeItem[]>([]);
    const [index, setIndex] = useState<DocIndex>({
        bySlug: {},
        byPath: {},
        byPathRelative: {},
    });
    const [loading, setLoading] = useState(true);
    
    // returns tree data
    async function buildTree(
        dir?: string,
        level: number = 0
    ): Promise<DocTreeItem[]> {
        const res = await list(dir);
        return Promise.all(
            res.map(async (item) => ({
                ...item,
                level,
                children: item.type === "dir" 
                    ? await buildTree(item.pathRelative, level + 1)
                    : undefined,
            }))
        );
    }

    // adds tree data to index for easy lookup
    function indexTree(
        tree: DocTreeItem[], 
    ): DocIndex {
        const bySlug: Record<string, DocTreeItem> = {};
        const byPath: Record<string, DocTreeItem> = {};
        const byPathRelative: Record<string, DocTreeItem> = {};

        function climb(nodes: DocTreeItem[]) {
            for (const node of nodes) {
                bySlug[node.slug] = node;
                byPath[node.path] = node;
                byPathRelative[node.pathRelative] = node;

                if (node.children) climb(node.children);
            }
        }

        climb(tree);
        
        return { bySlug, byPath, byPathRelative };
    }

    useEffect(() => {
        async function init() {
            const tree = await buildTree();
            const index = indexTree(tree);

            setTree(tree);
            setIndex(index);
            setLoading(false);
        }

        init();
    }, []);

    return (
        <DocsContext.Provider value={{ tree, index, loading }}>
          {children}
        </DocsContext.Provider>
  );

}

export function useDocsContext() {
  const ctx = useContext(DocsContext);
  if (!ctx) throw new Error("useDocsContext must be used inside DocsProvider");
  return ctx;
}
