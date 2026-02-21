'use client';

import * as React from 'react';

import Indent from '@root/components/Indent';
import ActionBar from '@root/components/ActionBar';
import actions from '@root/lib/actions';
import DocTreeView from '@root/components/bespoke/DocTreeView';
import Image from 'next/image';
import HeaderImage from '../public/hero_logo.svg';
import TreeView from '@root/components/TreeView';
import Divider from '@root/components/Divider';
import Accordion from '@root/components/Accordion';

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

const renderPages = (items: TreePage[]): React.ReactNode => {
    console.log('rendering level')
    console.log(items)
    const rendered:React.ReactNode = items.map((item) => {
        return (
        <TreeView
            key={item.title}
            title={item.title}
            isFile={item.type === "file"}
            defaultValue
        >
            {item.children ? renderPages(item.children) : undefined}
        </TreeView>
        )
    })
    return rendered
}

export default function Explorer(): React.ReactNode {

    return (
        <div className="theme-override-dark">
            <div style={{ display: 'flex', padding: '0.5rem' }}>
                <Image src={HeaderImage} alt='Max Lair Logo' width={200}/>
            </div>
            <ActionBar items={actions}/>
            <Accordion style='GRADIENT' defaultValue title='DOCS'>
                <DocTreeView />
            </Accordion>
            <Accordion style='GRADIENT' defaultValue title='PAGES'>
                {renderPages(samplePages)}
            </Accordion>
        </div>
    );
}
