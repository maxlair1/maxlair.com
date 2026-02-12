import * as React from 'react';
import TreeView from '@root/components/TreeView';
import { useDocs, type DocListItem  } from '@root/lib/useDoc';
import build from 'next/dist/build';
import { Suspense } from 'react';
import PageLoading from '@root/components/PageLoading';

interface docTreeItem extends DocListItem {
    level: number;
    children?: docTreeItem[];
}

// 1. get docs in path,
// 2. find out which are dirs (by mapping?)
// 3. recursively run same function on children
// 4. repeat until all paths are exhausted
// 5. render in tree components, make sure to reflect the TreeView api

export default function Explorer(): React.ReactNode {
    const { list } = useDocs(); //load promise
    const [loading, setLoading] = React.useState(true);
    const [tree, setTree] = React.useState<docTreeItem[]>([]);

    //Maybe map these directly to React.FC<TreeViewProps>?
    async function buildTree(
        dir?: string,
        level: number = 0
    ): Promise<docTreeItem[]> {
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

    React.useEffect(() => { // digest promise to content at start
        async function initTree() {
            const tree = await buildTree();
            console.log(tree);
            setTree(tree); // ← this is what you actually want
        }
        initTree();
    },[]);

    function renderTree(items: docTreeItem[]): React.ReactNode {
        return items.map((item) => (
            <TreeView 
                key={item.path}
                title={item.slug}
                isFile={item.type === "file"}
                defaultValue={true}
                isLastChild={item.children === undefined && item.level >= 1}
            >
                {item.children ? renderTree(item.children) : undefined}
            </TreeView>
        ));
    }

    return (
        <div className="theme-override-dark">
                {renderTree(tree)}
        </div>
    );
}