'use client';

import * as React from 'react';

import styles from './page.module.css';
import ContentLayout from '@components/bespoke/ContentLayout';
import FeaturedProject, { type Project } from '@components/bespoke/FeaturedProject';
import Section from '@root/components/Section';


export default function Page(): React.ReactElement {

    const Projects: Project[] = [
        {title: 'Dedoro', appicon: '/doro_appicon.png', date: '2024-05-01', screen: '/doro_screen.png', screenType: 'mobile', highlights: [
            {title: 'yeet.', icon: '$'},
            {title: 'yeet.', icon: '&'},
            {title: 'yeet.', icon: '@'},
        ]},
        {title: 'Local Bean', appicon: '/bean_appicon.png', date: '2024-05-01', screen: '/bean_screen.png', screenType: 'mobile', highlights: [
            {title: 'yeet.', icon: '$'},
            {title: 'yeet.', icon: '&'},
            {title: 'yeet.', icon: '@'},
        ]},
        {title: 'Grokadok', appicon: '/grok_appicon.png', date: '2024-05-01', screen: '/grok_screen.png', screenType: 'web', highlights: [
            {title: 'yeet.', icon: '$'},
            {title: 'yeet.', icon: '&'},
            {title: 'yeet.', icon: '@'},
        ]},
    ]

    return (
        <ContentLayout bleed>


            <Section escaped>
                <h2>featured</h2>
                <div className={styles.featured}>
                    {Projects.map((project, index) => {
                        return (
                            <FeaturedProject key={index} project={project}/>
                        )
                    })}
                </div>
            </Section>
                
        </ContentLayout>
    )
}