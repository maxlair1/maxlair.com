'use client';

import * as React from 'react';

// import DocTreeView from '@root/components/bespoke/DocTreeView';
import ActionBar, { ActionBarItem } from '@root/components/ActionBar';
import Image from 'next/image';
import HeaderImage from '../public/hero_logo.svg';
import TreeView from '@root/components/TreeView';
import NumberRangeSlider from '@root/components/NumberRangeSlider';
import Accordion from '@root/components/Accordion';
import { onHandleAppearanceModeChange, slicePathAtRoot } from './lib/utilities';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import useContent from './content/useContent';
import { ContentNode } from './content/useContent';
import Link from 'next/link';
import ActionButton from '@root/components/ActionButton';

export default function Explorer(): React.ReactNode {
    const pathname = usePathname();
    const Router = useRouter();
    const { load, tree, index, loading, images } = useContent();
    
    const actions: ActionBarItem[] = [
        {
            hotkey:'CTRL+E',
            body: "TOGGLE EXPLORER",
        },
        // {
        //     body: "PREFS",
        //     items: [
        //         {
        //             icon: '⊹',
        //             children: 'Light',
        //         },
        //         {
        //             icon: '⊹',
        //             children: 'Dark',
        //         },
        //     ]
        // },
        {
            body: "PANIC!",
        }
    ];

    const renderContent = (nodes: ContentNode[]): React.ReactNode => {
        const rendered:React.ReactNode = nodes.map((node) => {
            return (
                <TreeView
                key={node.title}
                title={node.title}
                isFile={node.type === "file" || node.type === "page"}
                defaultValue={node.defaultOpen ?? true}
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
        <div style={{overflow: 'hidden'}}>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                    <Image src={HeaderImage} alt='Max Lair Logo' width={200}/>
                </div>
            </Link>
            <ActionBar items={actions}/>
            <ActionButton>{'<- Back to Welcome'}</ActionButton>
            {/* Pages */}
            <Accordion style='GRADIENT' defaultValue title='CONTENT'>
                <TreeView title='Home' isFile={true} defaultValue isActive={pathname === '/'} onClick={() => Router.push('/')}/>
                {tree ? renderContent(tree.local ?? []) : <div>Loading...</div>}
            </Accordion>
            {/* Github .md documents via Obsidian */}
            <Accordion style='GRADIENT' defaultValue title='DOCS'>
                {tree ? renderContent(tree.remote ?? []) : <div>Loading...</div>}
            </Accordion>
            {/* Preferences */}
            <Accordion style='GRADIENT' title='PREFERENCES' defaultValue>
                
                <TreeView title='Color Mode' isFile={false} defaultValue>
                    <TreeView radio radioChecked title='Light' isFile={true} defaultValue onClick={() => onHandleAppearanceModeChange('light')}/>
                    <TreeView radio title='Dark' isFile={true} defaultValue onClick={() => onHandleAppearanceModeChange('dark')}/>
                </TreeView>
                
                <TreeView title='Accessibility'>
                    <TreeView radio title='Supress Animations' isFile/>
                </TreeView>
                <TreeView title='Appearance'>
                    <NumberRangeSlider 
                        label='Font Size'
                        defaultValue={16}
                        min={12}
                        max={24}
                        step={1}
                        suffix='px'
                    />
                </TreeView>

            </Accordion>
        </div>
    );
}
