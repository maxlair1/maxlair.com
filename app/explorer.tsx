'use client';

import * as React from 'react';

import Indent from '@root/components/Indent';
import ActionBar from '@root/components/ActionBar';
import actions from '@root/app/lib/actions';
import DocTreeView from '@root/components/bespoke/DocTreeView';
import Image from 'next/image';
import HeaderImage from '../public/hero_logo.svg';
import TreeView from '@root/components/TreeView';
import Divider from '@root/components/Divider';
import Accordion from '@root/components/Accordion';

import useContent from './content/useContent';
import { ContentNode } from './content/useContent';


interface TreePage {
    title: string;
    type: 'dir' | 'file';
    path?: string;
    children?: TreePage[];
}

const samplePages: TreePage[] = [
    { title: "Getting Started", path: "/docs/getting-started", type: "file" },
    { title: "API Reference", path: "/docs/api-reference", type: "file" },
    { title: "Tutorials", path: "/docs/tutorials", type: "file" },
    { title: "FAQ", path: "/docs/faq", type: "file" },
    { title: "Release Notes", type: "dir", children: [
        { title: "v1.0.0", path: "/docs/release-notes/v1.0.0", type: "file" },
        { title: "v1.1.0", path: "/docs/release-notes/v1.1.0", type: "file" },
    ]},
]

const renderContent = (nodes: ContentNode[]): React.ReactNode => {

    const rendered:React.ReactNode = nodes.map((node) => {
        return (
            <TreeView
            key={node.title}
            title={node.title}
            isFile={node.type === "file"}
            defaultValue
        >
            {node.children ? renderContent(node.children) : undefined}
        </TreeView>
        )
    })
    return rendered
}

export default function Explorer(): React.ReactNode {
    const { load, tree, index, loading } = useContent();
    
    React.useEffect(() => {
        console.log(tree, index, loading);
    },[loading]);

    return (
        <div className="theme-override-dark">
            <div style={{ display: 'flex', padding: '0.5rem' }}>
                <Image src={HeaderImage} alt='Max Lair Logo' width={200}/>
            </div>
            <ActionBar items={actions}/>
            {/* Pages */}
            <Accordion style='GRADIENT' defaultValue title='CONTENT'>
                {tree ? renderContent(tree) : <div>Loading...</div>}
            </Accordion>
            {/* Github .md documents via Obsidian */}
            <Accordion style='GRADIENT' defaultValue title='DOCS'>
                <DocTreeView />
            </Accordion>
        </div>
    );
}
