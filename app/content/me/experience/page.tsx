'use client';

import * as React from 'react';

import styles from './page.module.css';
import TableColumn from '@root/components/TableColumn';
import TableRow from '@root/components/TableRow';
import Table from '@root/components/Table';
import BarProgress from '@root/components/BarProgress';
import Badge from '@root/components/Badge';
import Link from 'next/link';
import ContentLayout from '@components/bespoke/ContentLayout';
import Brands from '@components/bespoke/Brands';
import Section from '@root/components/Section';
import ButtonGroup from '@root/components/ButtonGroup';

const experienceData = [
    { company: 'Designer\'s Drink Coffee', role: 'Full-Stack Product Consultant', date: 'CUR', description: 'B2C, and B2B SaaS product consulting; Design and development.', link: 'https://hearthero.app'},
    { company: 'HeartFitt LLC', role: 'Head UX Developer', date: 'NOV25 - CUR', description: 'Development team-- Science-backed heart rate workout software.', note: 'Logo, marketing, product design, portal development, and web development', link: 'https://hearthero.app'},
    { company: 'Hominy Homes', role: 'UX/UI Designer', date: 'JUL25 - OCT25', description: 'AI property management.'},
    { company: 'LMI', role: 'Product Designer', date: 'OCT24 - MAY25', description: 'Design systems for the US Army.', link: 'https://lmi.org' },
    { company: 'FAAVIATOR', role: 'Lead Product Designer', date: 'MAY24 - SEP24', description: 'Airspace approval app for first-responder drone deployment.', link: 'https://faaviator.com' },
    { company: 'NeuralDev AI', role: 'Lead Product Designer', date: 'SEP23 - MAR24', description: 'AI powered notetaking and self-care apps.' },
    { company: 'Matchset Tennis', role: 'Graphic Designer', date: 'MAY22 - OCT23', description: 'Brand elements, marketing material, commercial production.', link: 'https://matchset.com' },
    { company: 'LifeQuest Studios', role: 'Designer', date: 'MAR21 - OCT23', description: 'Refining the mundane with gamification.', link: 'https://lifequeststudios.com' },
]

const educationData = [
    { title: 'CS50 @ Harvard University', progressPercentage: 50, desc: 'Intro to CompSci, focusing on C and Python.', link: 'https://cs50.harvard.edu/x/2026/' },
    { title: 'Google UX Professional Certificate', progressPercentage: 40, desc: 'Equitable design-thinking for enterprise.', link: 'https://grow.google/certificates/ux-design/' },
    { title: 'BFA in Graphic Design', progressPercentage: 100, desc: 'Foundations of design, typography, and branding.'},
]

const metricsData = [
    { label: 'Years in\nProduct Design', value: '6' },
    { label: 'Years in\nWeb Development', value: '5' },
    { label: 'Startups\nWorked With', value: '8' },
    { label: 'Coffee\'s Consumed\n(estimated)', value: '20,000+' },
]

export default function Page() {
    return (
        <ContentLayout>
            <Section backgroundColor='var(--theme-background-2)'>
                <h1>Experience</h1>
                <div className={styles.subhead}>
                    <span>
                    Max Lair :: Updated <Badge>MAR 2026</Badge>
                    </span>
                    <ButtonGroup items={
                        [
                            { body: 'Download Resume', onClick: () => window.open('/MAX_LAIR_RESUME_2026.pdf', '_blank') },
                            // Maybe add ability to save how many times this is clicked, maybe with new API db
                            { body: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/maxlair/', '_blank') },
                            { body: 'GitHub', onClick: () => window.open('https://github.com/maxlair1', '_blank') },
                        ]
                    }/> 
                </div>            
                <br/>
                <div className={styles.metricsSection}>
                    {metricsData.map((metric, idx) => (
                        <div key={idx} className={styles.metric}>
                            <h3 className={styles.metricValue}>{metric.value}</h3>
                            <div className={styles.metricLabel}>{metric.label}</div>
                        </div>
                    ))}
                </div>
                <br />
                <br />
                <Brands containerStyle={styles.brandsContainer} itemHeight={'2ch'}/>
                <br />
                <br />
            </Section>
            <Section bleed='full'>
                <br/>
                <div className={styles.header}>
                </div>
                <div>
                    <Table style={{ minWidth: '70ch'}}>
                        <TableRow className={styles.gradient}>
                            <TableColumn>DATES</TableColumn>
                            <TableColumn>COMPANY</TableColumn>
                            <TableColumn>ROLE</TableColumn>
                            <TableColumn>DESCRIPTION</TableColumn>
                        </TableRow>
                        {/* <TableRow><TableColumn>{' '}</TableColumn></TableRow> */}
                        {
                            experienceData.map((i, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableColumn>{i.date}</TableColumn>
                                        <TableColumn>
                                            {i.link ? <a href={i.link} target="_blank" rel="noopener noreferrer">{i.company}</a> : i.company}
                                        </TableColumn>
                                        <TableColumn>{i.role}</TableColumn>
                                        <TableColumn>{i.description}</TableColumn>
                                    </TableRow>
                                )
                            })
                        }
                    </Table>
                </div>
                <br/>
                <div>
                    <Table style={{ minWidth: '50ch' }}>
                        <TableRow className={styles.gradient}>
                            <TableColumn>EDUCATION</TableColumn>
                            <TableColumn>PROGRESS</TableColumn>
                            <TableColumn>{''}</TableColumn>
                            <TableColumn>DESC</TableColumn>
                        </TableRow>
                        {/* <TableRow><TableColumn>{' '}</TableColumn></TableRow> */}
                        {
                            educationData.map((i, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableColumn>{i.link ? <Link href={i.link} target="_blank" rel="noopener noreferrer">{i.title}</Link> : i.title}</TableColumn>
                                        <TableColumn style={{ maxWidth: '30ch' }}>
                                            <BarProgress progress={i.progressPercentage}></BarProgress>
                                        </TableColumn>
                                        <TableColumn>{i.progressPercentage}%</TableColumn>
                                        <TableColumn>{i.desc}</TableColumn>
                                    </TableRow>
                                )
                            })
                        }
                    </Table>
                </div>
                {/* Add startups and metrics */}
            </Section>
        </ContentLayout>
    )
}