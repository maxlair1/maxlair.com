import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedProject.module.css';

export interface Project {
    title: string,
    appicon: string,
    date: string,
    screen: string,
    highlights: ProjectHighlights[],
    link?: string,
    screenType: 'mobile' | 'web'
}

interface ProjectHighlights {
    title: React.ReactNode,
    icon: string
}

export default function FeaturedProject({project, ...rest }: {project: Project}): React.ReactElement {
    return (
        <Link href={project.link || '#'} className={styles.root} {...rest}>
            <div className={styles.visual}>
                <header>
                    <p>{project.title}</p>
                    <p>{project.date}</p>
                </header>
                <Image aria-label='Project App Icon' className={styles.appicon} src={project.appicon} alt={project.title} width={100} height={100} />
                <div className={styles[project.screenType]}>
                    <Image aria-label='Project Screenshot' className={styles.image} src={project.screen} alt={project.title} fill={true} />
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