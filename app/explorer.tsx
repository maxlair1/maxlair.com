'use client';

import * as React from 'react';

import TreeView from '@root/components/TreeView';
import { useDocs, type Doc  } from '@root/api/useDoc';
import Indent from '@root/components/Indent';
import { useRouter } from 'next/navigation';
import ActionBar from '@root/components/ActionBar';
import actions from '@root/common/actions';

interface docTreeItem extends Doc {
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
    const [loading, setLoading] = React.useState<boolean>(true);
    const [tree, setTree] = React.useState<docTreeItem[]>([]);
    const router = useRouter();


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

    React.useEffect(() => {
        async function initTree() {
            const tree = await buildTree();
            console.log(tree);
            setTree(tree);
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
                children={item.children ? renderTree(item.children) : undefined}
                onClick={() => {
                    if (item.type === "file") {
                        router.push(`${item.slug}`);
                    }
                }}
            />
        ));
    }

    return (
        <div className="theme-override-dark">
            <ActionBar items={actions}/>
            <Indent>
                <TreeView title="DOCUMENTS" defaultValue={true}>
                    {renderTree(tree)}
                </TreeView>
            </Indent>
        </div>
    );
}