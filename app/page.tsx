import * as React from 'react';
import Layout from './layout';
import { Logo } from '@root/common/constants';



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
    <Layout>
        {Content}
    </Layout>
  );
}
