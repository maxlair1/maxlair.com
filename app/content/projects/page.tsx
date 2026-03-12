'use client';

import * as React from 'react';
import Link from 'next/link';

import styles from './page.module.css';

import ContentLayout from '@components/bespoke/ContentLayout';
import Image from 'next/image';
import * as Utilities from '@lib/utilities';

interface ProjectHighlights {
    title: React.ReactNode,
    icon: string
}

interface Project {
    title: string,
    appicon: string,
    date: string,
    screen: string,
    highlights: ProjectHighlights[],
    link?: string,
    screenPosition?: 'cover' | 'contain'
}


const FeaturedProject = ({project, ...rest }: {project: Project}): React.ReactElement => {
    return (
        <Link href={project.link || '#'} className={styles.root}>
            <div className={styles.featuredContainer}>
                <header>
                    <p>{project.title}</p>
                    <p>{project.date}</p>
                </header>
                <Image className={styles.appicon} src={project.appicon} alt={project.title} width={100} height={100} />
                <div className={styles.imageContainer}>
                    <Image className={Utilities.classNames(styles.image, project.screenPosition === 'cover' ? styles.cover : styles.contain)} src={project.screen} alt={project.title} fill={true} />
                </div>
            </div>
            <section>
                <div className={styles.notice} role='alert'>  
                    {project.highlights.map((highlight, index) => {
                        return (
                            <div key={index} className={styles.highlight}>
                                <span role='icon'>{highlight.icon}</span>
                                <p>{highlight.title}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </Link>
    )
}

export default function Page(): React.ReactElement {

    const Projects: Project[] = [
        {title: 'Dedoro', appicon: '/doro_appicon.png', date: '2024-05-01', screen: '/doro_screen.png', highlights: [
            {title: 'yeet.', icon: '$'},
            {title: 'yeet.', icon: '&'},
            {title: 'yeet.', icon: '@'},
        ]},
        {title: 'Local Bean', appicon: '/bean_appicon.png', date: '2024-05-01', screen: '/bean_screen.png', highlights: [
            {title: 'yeet.', icon: '$'},
            {title: 'yeet.', icon: '&'},
            {title: 'yeet.', icon: '@'},
        ]},
        {title: 'Grokadok', appicon: '/grok_appicon.png', date: '2024-05-01', screen: '/grok_screen.png', highlights: [
            {title: 'yeet.', icon: '$'},
            {title: 'yeet.', icon: '&'},
            {title: 'yeet.', icon: '@'},
        ]},
    ]


    return (
        <ContentLayout bleed={false}>
            <header style={{width: '100%', textAlign: 'left'}}>
                <h1>Projects</h1>
            </header>

            <section>
                <div className={styles.featured}>
                    {Projects.map((project, index) => {
                        return (
                            <FeaturedProject key={index} project={project}/>
                        )
                    })}
                </div>
            </section>
        </ContentLayout>
    )
}