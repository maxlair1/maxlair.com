'use client';

import * as React from "react";
import styles from './page.module.css'
import Link from "next/link";
import ContentLayout from "@root/components/bespoke/ContentLayout";
import Accordion from "@root/components/Accordion";
import Slip from "@root/components/bespoke/Slip";
import Three from "@root/components/bespoke/Three";

export default function Page(): React.JSX.Element {
    return (
        <>
            <ContentLayout className={styles.root}>
                <section role="banner">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, at.</section>
                <br/>
                <section>
                    <Three/>
                </section>
                <br/>
                <section className={styles.section}>
                    {/* <aside className={styles.tip}>&nbsp;<strong style={{opacity: 0.5, fontWeight: 800}}>&gt;</strong> Click "Explore" on the left, or use <kbd>SHIFT+E</kbd> to open navigation.</aside> */}
                    <p>I'm a systems-driven <Link href="#">full-stack product designer</Link>, and <Link href='#'>developer</Link> from Dayton, OH.
                    Currently lead product designer and shareholder at <Link href="https://hearthero.app/">HeartFitt</Link>. 
                    Founder of design consultancy, <Link href="https://designersdrinkcoffee.com/">Designers Drink Coffee</Link>, 
                    primarily focused on design systems and product development. I enjoy solving complex design challenges with recursive
                    solutions.</p>
                </section>
                <br/>
                <section className={styles.section}>
                        <div className={styles.card}>
                        <Accordion title="WHAT I DO" defaultValue style="GRADIENT">
                            {/* <header>
                                <p>What I do</p>
                            </header> */}
                            <p className={styles.content}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ullam itaque fuga mollitia consequuntur temporibus numquam doloremque nobis deserunt, obcaecati id recusandae autem quisquam reprehenderit odio ducimus veritatis voluptatem? Unde, voluptatum facilis tenetur consequuntur quibusdam maiores? Quibusdam, sint iusto modi cum maxime earum, assumenda tempora officia eos dolorem dignissimos obcaecati!
                            </p>
                        </Accordion>
                        </div>
                        <div className={styles.card}>
                        <Accordion title="WHAT I DO" defaultValue style="GRADIENT">
                            {/* <header>
                                <p>What I do</p>
                            </header> */}
                            <p className={styles.content}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ullam itaque fuga mollitia consequuntur temporibus numquam doloremque nobis deserunt, obcaecati id recusandae autem quisquam reprehenderit odio ducimus veritatis voluptatem? Unde, voluptatum facilis tenetur consequuntur quibusdam maiores? Quibusdam, sint iusto modi cum maxime earum, assumenda tempora officia eos dolorem dignissimos obcaecati!
                            </p>
                        </Accordion>
                        </div>
                </section>
                <br/>
                <section className={styles.section}>
                    <div className={styles.gridLayout}>
                        <Slip title="Big title" subtitle="this is subtitle" src="/bean_ipad_shop-50.png" color="teal" >
                            <p>
                                Lorem, ipsum dolor sit amet<a href="#"><sup>[1]</sup></a> consectetur adipisicing elit. Maiores aperiam voluptate similique a nihil molestiae, nam magni possimus porro fuga esse repellendus eius deleniti placeat corporis sunt laboriosam? Dolorum, alias. Mollitia tempora ab reiciendis minima at quia pariatur dolores consequuntur minus repellat! Nihil quasi quod numquam unde. Animi, voluptas deserunt?
                            </p>
                        </Slip>
                        <Slip title="Big title" subtitle="this is subtitle" src="/bean_ipad_shop-50.png" color="green" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nisi.</Slip>
                        <Slip title="Big title" subtitle="this is subtitle" src="/bean_ipad_shop-50.png" color="maroon" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nisi.</Slip>
                    </div>
                </section>
                
                <br/>
            </ContentLayout>
        </>
    )
    
}