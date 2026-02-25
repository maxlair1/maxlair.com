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
import { slicePathAtRoot } from './lib/utilities';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import useContent from './content/useContent';
import { ContentNode } from './content/useContent';
import Link from 'next/link';

export default function Explorer(): React.ReactNode {
    const pathname = usePathname();
    const Router = useRouter();
    const { load, tree, index, loading, images } = useContent();
    
    

    const renderContent = (nodes: ContentNode[]): React.ReactNode => {
        const rendered:React.ReactNode = nodes.map((node) => {
            return (
                <TreeView
                key={node.title}
                title={node.title}
                isFile={node.type === "file" || node.type === "page"}
                defaultValue
                isActive={slicePathAtRoot(node.route ?? node.path) === pathname}
                onClick={(e) => {
                    e.stopPropagation();
                    if (node.type !== 'dir') {
                        Router.push(node.route ?? node.path)
                    }
                }
                } 
            >
                {node.children ? renderContent(node.children) : undefined}
            </TreeView>
            )
        })
        return rendered
    }


    return (
        <div className="theme-override-dark">
            <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                    <Image src={HeaderImage} alt='Max Lair Logo' width={200}/>
                </div>
            </Link>
            <ActionBar items={actions}/>
            {/* Pages */}
            <Accordion style='GRADIENT' defaultValue title='CONTENT'>
                {tree ? renderContent(tree.local ?? []) : <div>Loading...</div>}
            </Accordion>
            {/* Github .md documents via Obsidian */}
            <Accordion style='GRADIENT' defaultValue title='DOCS'>
                {tree ? renderContent(tree.remote ?? []) : <div>Loading...</div>}
            </Accordion>
        </div>
    );
}
