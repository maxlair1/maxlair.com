import * as React from 'react';
import SidebarLayout from '@root/components/SidebarLayout';
import ExplorerPage from './explorer';
import Layout from './layout';
import { Logo } from '@root/common/constants';
import Footer from '@root/components/Footer'
import Drawer from '@root/components/Drawer';
import RowSpaceBetween from '@root/components/RowSpaceBetween';
import ContentFluid from '@root/components/ContentFluid';



const styles = {
    content: {
        display: 'flex',
        margin: '0 auto',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
}

const Content = (
    <>
        <div style={styles.content}>
            <div style={{textAlign: 'center'}}>
                <pre style={{ margin: 0, fontFamily: 'monospace', color: 'var(--theme-focused-foreground)' }}>
                    {Logo.map(row => row.join('')).join('\n')}
                </pre>
            </div>
        </div>
        {/* <div>
            <Footer></Footer>
        </div> */}
    </>
)


export default function Welcome() {

  return (
    <Layout sidebar={<ExplorerPage />}>
        {Content}
    </Layout>
  );
}
