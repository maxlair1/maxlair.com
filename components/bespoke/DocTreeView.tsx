import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDocsContext, type DocTreeItem } from '@root/contexts/DocsContext';

import TreeView from '../TreeView';

export default function DocTreeView(): React.ReactNode {
    const { tree, index } = useDocsContext();
    const router = useRouter();
    const pathName= usePathname();



    function renderTree(items: DocTreeItem[]): React.ReactNode {
        return items.map((item) => (
            <TreeView 
                key={item.path}
                title={item.slug}
                isFile={item.type === "file"}
                defaultValue={true}
                isActive={
                    !!pathName &&
                    (() => {
                        const relMarker = pathName.indexOf(item.pathRelative);
                        if (relMarker === -1) return false;
                        const currentPath = pathName.slice(relMarker + item.pathRelative.length) + item.slug;
                        console.log("Comparing paths:", { currentPath, itemPath: item.pathRelative }, item.pathRelative === currentPath);
                        return item.pathRelative === currentPath;
                    })()
                }
                isLastChild={item.children === undefined && item.level >= 1}
                children={item.children ? renderTree(item.children) : undefined}
                onClick={() => {
                    if (item.type === "file") {
                        router.push(`/docs/${item.pathRelative.slice(0, -3)}`);
                    }
                }}
            />
        ));
    }

    return (
        <TreeView title="DOCUMENTS" defaultValue={true}>
            {renderTree(tree)}
        </TreeView>
    );
}