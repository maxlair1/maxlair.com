import * as React from 'react';
import Layout from './layout';
import { Logo } from '@root/lib/constants';
import ActionListItem, { ActionListItemProps } from '@root/components/ActionListItem';
import Grid from '@root/components/Grid';
import Card from '@root/components/Card';
import Image from 'next/image';


const styles = {
    content: {
        display: 'flex',
        flex: '1',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

const someActions: ActionListItemProps[] = [
    {
        children: 'View Resume or CV',
        icon: '+',
    },
    {
        children: 'Check out Designers Drink Coffee',
        icon: '+',
        href: 'https://designersdrink.coffee/',
    },
    {
        children: 'Contact Me',
        icon: '+',
    },
    {
        children: 'Test Anchor Link',
        icon: '+',
        href: '/docs/testDir/testDir2/test5#block-elements',
    },
];

const Content = (
    <>
        <div style={styles.content}>
            <div style={{textAlign: 'center'}} >
                <pre style={{ margin: 0, fontFamily: 'monospace', color: 'var(--theme-focused)' }}>
                    {/* <code>
                        {Logo.map(row => row.join('')).join('\n')}
                    </code> */}
                    <Image loading='eager' src="/ordered_dither.png" alt="Description" width={200} height={200} />
                </pre>
                <Grid>
                    <Card title={'START HERE'} mode="left">
                        {/* some actions! */}       
                        {someActions.map((action, index) => (
                            <ActionListItem key={index} {...action} />
                        ))}
                    </Card>
                </Grid>
            </div>
        </div>
    </>
)


export default function Welcome() {
  return Content;
}
