'use client';

import * as React from 'react';
import styles from './page.module.css';

import Link from 'next/link';
// import FeaturedCard from '@components/bespoke/FeaturedCard';
import ActionListItem from '@components/ActionListItem';
import ContentLayout from '@root/components/bespoke/ContentLayout';
import Button from '@root/components/Button';
import Section from '@root/components/Section';
import { AsciiLogo } from './lib/constants';

export default function Page() {    
    return (
        <ContentLayout className={styles.root}>
            <Section bleed='readable' backgroundColor='var(--theme-background-2)'>
                <div className={styles.notice} role='alert'>  
                    <p>
                        
                        This site is still a work in progress. Please be patient &lt;3.
                    </p>
                    <Link href="https://old.maxlair.com">
                        <Button theme='PRIMARY' size="sm" aria-label='Old Site' style={{maxWidth: '200px'}} onClick={() => localStorage.clear()}>Old Site</Button>
                    </Link>
                </div>
                <br/>
                <br/>
                <pre className={styles.logo} role='logo'>
                    {AsciiLogo}
                </pre>
            </Section>
            <Section>
                <br/>
                <br/>
                <aside className={styles.tip}>&nbsp;<strong style={{opacity: 0.5, fontWeight: 800}}>&gt;</strong> Click "Explore" on the left, or use <kbd>SHIFT+E</kbd> to open navigation.</aside>
                <p>I'm a systems-driven <Link href="#">full-stack product designer</Link>, and <Link href='#'>developer</Link> from Dayton, OH.
                Currently lead product designer and shareholder at <Link href="https://hearthero.app/">HeartFitt</Link>. 
                Founder of design consultancy, <Link href="https://designersdrinkcoffee.com/">Designers Drink Coffee</Link>, 
                primarily focused on design systems and product development. I enjoy solving complex design challenges with recursive
                solutions.</p>
            </Section>
            <Section>
                <h3>Stuff to do</h3>
                <ul>
                    <ActionListItem href='/content/experience' icon={`⭢`}>View my experience and skills</ActionListItem>
                    <ActionListItem href='/docs/thoughts' icon={`⭢`}>Read some of my thoughts</ActionListItem>
                    <ActionListItem href='/content/snacks' icon={`⭢`}>Check out Snacks</ActionListItem>
                    <ActionListItem href='/docs/projects#featured' icon={`⭢`}>View design case studies</ActionListItem>
                    <ActionListItem href='/content/stuff' icon={`⭢`}>All the stuff</ActionListItem>
                    <br/>
                    <ActionListItem href='https://github.com/maxlair1/maxlair.com' icon={`>_`}>Check out the source code</ActionListItem>
                </ul>
            </Section>
            
            <br/>
            {/* <Section>
                <h3>New Stuff</h3>
                <h4>Articles</h4>
                <div className={styles.featuredContainer}>
                    <FeaturedCard href='/' title='Welcome to my new Portfolio' description='03/10/2026' src="/dayton.jpg" dithered color='daybreak'/>
                    <FeaturedCard title='Learn More About Me' src="/temple.jpg" dithered color='green'/>
                </div>
                <h4>Snacks</h4>
            </Section> 
            */}
        </ContentLayout>
    );
}