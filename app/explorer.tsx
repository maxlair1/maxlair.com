'use client';

import * as React from 'react';

import styles from './explorer.module.css';

import ActionBar, { ActionBarItem } from '@root/components/ActionBar';
import Logo from '@components/bespoke/logo';
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
import Button from '@root/components/Button';

export default function Explorer(): React.ReactNode {
    const pathname = usePathname();
    const Router = useRouter();
    const { tree, loading } = useContent();
    const { theme, setTheme } = useTheme();
    
    const actions: ActionBarItem[] = [
        {
            hotkey:'CTRL+E',
            body: "TOGGLE EXPLORER",
        },
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
        <div className={styles.root}>
            <section className={styles.trees}>
                <Link href="/">
                    <header className={styles.header}>
                        <Logo></Logo>
                    </header>
                </Link>
                <ActionBar items={actions}/>
                <ActionButton>{'<- Back to Welcome'}</ActionButton>

                <Accordion style='GRADIENT' defaultValue title='CONTENT'>
                    <TreeView title='Home' isFile={true} defaultValue isActive={pathname === '/'} onClick={() => Router.push('/')}/>
                    {tree ? renderContent(tree.local ?? []) : <BlockLoader mode={1} />}
                </Accordion>

                <Accordion style='GRADIENT' defaultValue title='DOCS'>
                    {tree ? renderContent(tree.remote ?? []) : <BlockLoader mode={1}/>}
                </Accordion>

                <Accordion style='GRADIENT' title='PREFERENCES' defaultValue>
                    <TreeView title='Color Mode' isFile={false} defaultValue>
                        <TreeView radio radioChecked={theme === 'light'} title='Light' isFile={true} defaultValue onClick={() => setTheme('light')}/>
                        <TreeView radio radioChecked={theme === 'dark'} title='Dark' isFile={true} defaultValue onClick={() => setTheme('dark')}/>
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
            </section>
            <footer className={styles.footer}>
                <Button>{'Shoot me a message'}</Button>
            </footer>
        </div>
    );
}
