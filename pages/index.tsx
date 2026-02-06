import * as React from 'react';
import SidebarLayout from '@root/components/SidebarLayout';
import ExplorerPage from './explorer';
import PageLoading from '@root/components/PageLoading';
import { RootLayout } from '../components/layouts/layouts';
import DebugGrid from '@root/components/DebugGrid';
import { Logo } from '@root/common/constants';
import Divider from '@root/components/Divider';
import Link from 'next/link';

const styles = {
    display: 'flex',
    margin: '0 auto',
    paddingBlock: '30vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}

export default function Welcome() {
  

  return (
    <RootLayout>
        {/* <PageLoading progress={10}></PageLoading> */}
        <div style={styles}>
            <div style={{textAlign: 'center'}}>
                <p style={{fontFamily: 'Junicode', fontSize: '16px'}}>
                    Max Lair
                </p>
                <pre style={{ margin: 0, fontFamily: 'monospace', color: 'var(--theme-focused-foreground)' }}>
                    {Logo.map(row => row.join('')).join('\n')}
                </pre>
            </div>
        </div>
        <div>
            <Divider />
            Welcome to my labratory site. It's a pleasure to meet you.
            <br/>
            Feel free to parooze 
            <br/>
            <Link href="#">check out my thoughts</Link><br/>
            <Link href="#">look at cool stuff</Link><br/>
        </div>
    </RootLayout>
  );
}
