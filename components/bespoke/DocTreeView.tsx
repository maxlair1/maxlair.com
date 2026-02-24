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
                        console.log("Comparing paths:", { pathName, itemPath: item.pathRelative });
                        return item.pathRelative === pathName;
                    })()
                }
                isLastChild={item.children === undefined && item.level >= 1}
                children={item.children ? renderTree(item.children) : undefined}
                onClick={() => {
                    if (item.type === "file") {
                        router.push(`${item.pathRelative.slice(0, -3)}`);
                    }
                }}
            />
        ));
    }

    return renderTree(tree);
}