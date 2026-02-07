import * as React from 'react';
import SidebarLayout from '@root/components/SidebarLayout';
import ExplorerPage from './explorer';
import PageLoading from '@root/components/PageLoading';
import { RootLayout } from '../components/layouts/layouts';
import DebugGrid from '@root/components/DebugGrid';
import { Logo } from '@root/common/constants';
import Divider from '@root/components/Divider';
import Link from 'next/link';
import DataTable from '@root/components/DataTable';
import Footer from '@root/components/Footer'
import { dina } from '@root/common/type';

const styles = {
    display: 'flex',
    margin: '0 auto',
    paddingBlock: '30vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}


const links = [
    ["check out my thoughts", "[link]"],
    ["check out my thoughts", "[link]"],
    ["check out my thoughts", "[link]"],
    ["check out my thoughts", "[link]"],
]

export default function Welcome() {
  

  return (
    <RootLayout>
        {/* <PageLoading progress={10}></PageLoading> */}
        <div style={styles} className={dina.variable}>
            <div style={{textAlign: 'center'}}>
                <pre style={{ margin: 0, fontFamily: 'monospace', color: 'var(--theme-focused-foreground)' }}>
                    {Logo.map(row => row.join('')).join('\n')}
                </pre>
            </div>
        </div>
        <div>
            <Divider />
            <DataTable data={links}>

            </DataTable>
            {/* <Link href="#">check out my thoughts</Link><br/>
            <Link href="#">look at cool stuff</Link><br/> */}
            <Footer></Footer>
        </div>
    </RootLayout>
  );
}
