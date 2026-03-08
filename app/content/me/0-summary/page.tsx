import React from 'react';
import styles from './page.module.css';

import Brands from './brands';
import Link from 'next/link';

const fillColor = 'var(--theme-foreground)'

export default function Page() {
    return (
        <>
            <div className={styles.container}>
                <h2>hello</h2>
                <p>I'm a systems-driven <Link href="#">full-stack product designer</Link>, and <Link href='#'>developer</Link> from Dayton, OH.
                Currently lead product designer and shareholder at <Link href="https://hearthero.app/">HeartFitt</Link>. 
                Founder of design consultancy, <Link href="https://designersdrinkcoffee.com/">Designers Drink Coffee</Link>, 
                primarily focused on design systems and product development. I enjoy solving complex design challenges with recursive
                solutions.</p>

                <p>Learn more about my experience and skills <Link href="/content/me/experience">here</Link></p>
                <section>
                    <Brands containerStyle={styles.brandsContainer} itemHeight={'2ch'} />
                </section>
            </div>
        </>
    );
}