import React from 'react';
import styles from './page.module.css';

import Brands from './Brands';
import Link from 'next/link';
import FeaturedCard from '@root/components/bespoke/FeaturedCard';
import ActionList, { ActionListItemProps } from '@root/components/ActionListItem';
import ActionListItem from '@root/components/ActionListItem';

const fillColor = 'var(--theme-foreground)'

const quickLinks: ActionListItemProps[] = [
    {
        icon: '>',
        children: "Explore Site",
        href: "/explore"
    },
    {
        icon: '!',
        children: "PANIC!",
    }
]

export default function Page() {
    return (
        <>
            <div className={styles.container}>
                <section>
                    <h2>hello</h2>
                    <p className={styles.tip}>&nbsp;<strong style={{opacity: 0.5, fontWeight: 800}}>&gt;</strong> Click "Explore" on the left, or use <kbd>SHIFT+E</kbd> to open navigation.</p>
                    <p>I'm a systems-driven <Link href="#">full-stack product designer</Link>, and <Link href='#'>developer</Link> from Dayton, OH.
                    Currently lead product designer and shareholder at <Link href="https://hearthero.app/">HeartFitt</Link>. 
                    Founder of design consultancy, <Link href="https://designersdrinkcoffee.com/">Designers Drink Coffee</Link>, 
                    primarily focused on design systems and product development. I enjoy solving complex design challenges with recursive
                    solutions.</p>
                </section>

                <section>
                    <Brands containerStyle={styles.brandsContainer} itemHeight={'2ch'}/>
                </section>

                <section>
                    <ActionListItem href='/experience' icon={`⭢`}>Learn more about my experience and skills</ActionListItem>
                    <ActionListItem href='/docs/thoughts' icon={`⭢`}>Read some of my thoughts</ActionListItem>
                    <ActionListItem href='/snacks' icon={`⭢`}>Check out Snacks</ActionListItem>
                    <ActionListItem href='/' icon={`⭢`}>View design case studies</ActionListItem>
                    <ActionListItem href='/' icon={`⭢`}>All the stuff</ActionListItem>
                </section>
                
                <br/>
                <section>
                    <h3>New Stuff</h3>
                    <div className={styles.featuredContainer}>
                        <FeaturedCard href='/' title='Welcome to my new Portfolio' description='03/10/2026' src="/dayton.jpg" dithered color='daybreak'/>
                        {/* <FeaturedCard title='Learn More About Me' src="/temple.jpg" dithered color='green'/>s */}
                    </div>
                </section>
            </div>
        </>
    );
}