'use client';

import * as React from 'react';

import styles from './explorer.module.css';

import ActionBar, { ActionBarItem } from '@root/components/ActionBar';
import Logo from '@root/components/bespoke/Logo';
import TreeView from '@root/components/TreeView';
import NumberRangeSlider from '@root/components/NumberRangeSlider';
import Accordion from '@root/components/Accordion';
import { slicePathAtRoot } from './lib/utilities';
import BlockLoader from '@root/components/BlockLoader';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import useContent from './content/useContent';
import { ContentNode } from './content/useContent';
import Link from 'next/link';
import ActionButton from '@root/components/ActionButton';
import useTheme from './lib/theme.provider';

export default function Explorer(): React.ReactNode {
    const pathname = usePathname();
    const Router = useRouter();
    const { tree, loading } = useContent();
    const { theme, setTheme } = useTheme();
    
    const actions: ActionBarItem[] = [
        {
            hotkey:'SHIFT+E',
            body: "TOGGLE EXPLORER",
        },
        {
            body: "PANIC!",
        }
    ];

    const renderContent = (nodes: ContentNode[]): React.ReactNode => {
        const rendered:React.ReactNode = nodes.map((node) => {
            if (['png', 'jpeg', 'jpg', 'gif'].includes(node.extension ?? '') || node.title.startsWith('_')) return;
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

    // if (loading) {
    //     return (
    //         <div className={styles.root}>
    //             <BlockLoader mode={1}/>
    //         </div>
    //     )
    // }

    return (
        <React.Suspense fallback={(
            <div className={styles.root}>
                <BlockLoader mode={1}/>
            </div> 
        )}>
            <div className={styles.root}>
                <nav className={styles.trees}>
                    <Link href="/">
                        <header className={styles.header}>
                            <Logo></Logo>
                        </header>
                    </Link>
                    {/* <ActionBar items={actions}/> */}
                    {/* <ActionButton>{'<- Back to Welcome'}</ActionButton> */}

                    <Accordion style='GRADIENT' defaultValue title='CONTENT'>
                        <div className={styles.treeContainer}>
                            <TreeView title='Welcome' isFile={true} defaultValue isActive={pathname === '/'} onClick={() => Router.push('/')}/>
                            {tree ? renderContent(tree.local ?? []) : <BlockLoader mode={1} />}
                        </div>
                    </Accordion>

                    <Accordion style='GRADIENT' defaultValue title='DOCS'>
                        <div className={styles.treeContainer}>
                            {tree ? renderContent(tree.remote?.find((n, idx) => n.title === 'docs')?.children ?? []) : <BlockLoader mode={1}/>}
                        </div>
                    </Accordion>

                    <Accordion style='GRADIENT' title='PREFERENCES'>
                        <div className={styles.treeContainer}>
                            <TreeView title='Color Mode' isFile={false} defaultValue>
                                <TreeView radio radioChecked={theme === 'light'} title='Light' isFile={true} defaultValue onClick={() => setTheme('light')}/>
                                <TreeView radio radioChecked={theme === 'dark'} title='Dark' isFile={true} defaultValue onClick={() => setTheme('dark')}/>
                            </TreeView>
                            <TreeView title='Clear Cookies' isFile={true} onClick={() => { document.cookie = ''; }}/>
                        </div>
                    </Accordion>
                </nav>
                <footer className={styles.footer}>
                    <small>{new Date().getFullYear()} &copy; Copywrite Max Lair</small>
                    <br/>
                </footer>
            </div>
        </React.Suspense>
    );
}
