'use client';

import * as React from "react";
import styles from './page.module.css'
import Link from "next/link";
import ContentLayout from "@root/components/bespoke/ContentLayout";
import Section from "@root/components/Section";
import ActionListItem from "@root/components/ActionListItem";
import AlertBanner from "@root/components/AlertBanner";
import layout from "@root/app/layout";
import Accordion from "@root/components/Accordion";

export default function Page(): React.JSX.Element {
    return (
        <>
            <ContentLayout className={styles.root}>
                <section role="banner">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, at.</section>
                <section className={styles.section}>
                    {/* <aside className={styles.tip}>&nbsp;<strong style={{opacity: 0.5, fontWeight: 800}}>&gt;</strong> Click "Explore" on the left, or use <kbd>SHIFT+E</kbd> to open navigation.</aside> */}
                    <p>I'm a systems-driven <Link href="#">full-stack product designer</Link>, and <Link href='#'>developer</Link> from Dayton, OH.
                    Currently lead product designer and shareholder at <Link href="https://hearthero.app/">HeartFitt</Link>. 
                    Founder of design consultancy, <Link href="https://designersdrinkcoffee.com/">Designers Drink Coffee</Link>, 
                    primarily focused on design systems and product development. I enjoy solving complex design challenges with recursive
                    solutions.</p>
                </section>
                <section>
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
                <section>
                    <div className={styles.gridLayout}>
                        <div className={styles.gridItem}>
                            <header>little header</header>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores aperiam voluptate similique a nihil molestiae, nam magni possimus porro fuga esse repellendus eius deleniti placeat corporis sunt laboriosam? Dolorum, alias. Mollitia tempora ab reiciendis minima at quia pariatur dolores consequuntur minus repellat! Nihil quasi quod numquam unde. Animi, voluptas deserunt?
                            </p>
                        </div>
                        <div className={styles.gridItem}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat maiores soluta quis ut pariatur a amet necessitatibus illum sint officia!</div>
                        <div className={styles.gridItem}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, blanditiis.</div>
                        <div className={styles.gridItem}>Lorem ipsum dolor sit amet.</div>
                        <div className={styles.gridItem}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ab, doloribus quod accusamus nostrum officiis laboriosam consequuntur necessitatibus dignissimos corrupti architecto quasi voluptatem incidunt ullam debitis aliquid nobis rerum ex, tempore velit reiciendis. Praesentium, iure consequatur inventore consectetur enim tenetur aspernatur, quidem ducimus libero esse, nemo quo ullam unde nulla?</div>
                        <div className={styles.gridItem}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi omnis quas voluptatum, voluptatem doloribus nam veniam nisi, vitae quis inventore, sapiente unde architecto ratione facere!</div>
                    </div>
                </section>
                
                <br/>
            </ContentLayout>
        </>
    )
    
}