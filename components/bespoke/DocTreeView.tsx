import React from 'react';
import { useRouter } from 'next/navigation';
import { useDocsContext, type DocTreeItem } from '@root/contexts/DocsContext';

import TreeView from '../TreeView';

export default function DocTreeView(): React.ReactNode {
    const { tree } = useDocsContext();
    const router = useRouter();

    function renderTree(items: DocTreeItem[]): React.ReactNode {
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