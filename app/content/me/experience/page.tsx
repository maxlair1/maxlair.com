import * as React from 'react';

import styles from './page.module.css';
import TableColumn from '@root/components/TableColumn';
import TableRow from '@root/components/TableRow';
import Table from '@root/components/Table';
import BarProgress from '@root/components/BarProgress';
import Row from '@root/components/Row';
import Badge from '@root/components/Badge';
import Link from 'next/link';
import ContentLayout from '@components/bespoke/ContentLayout';

const experienceData = [
    { company: 'Designer\'s Drink Coffee', role: 'Full-Stack Product Consultant', date: 'CUR', description: 'Development team-- Science-backed heart rate workout software.', note: 'Logo, marketing, product design, portal development, and web development', link: 'https://hearthero.app'},
    { company: 'HeartFitt LLC', role: 'Head of Project & Brand', date: 'NOV25-> CUR', description: 'Development team-- Science-backed heart rate workout software.', note: 'Logo, marketing, product design, portal development, and web development', link: 'https://hearthero.app'},
    { company: 'Hominy Homes', role: 'UX/UI Designer', date: 'JUL25-> OCT24', description: 'AI property management.'},
    { company: 'LMI', role: 'Product Designer', description: 'Design systems for the US Army.', link: 'https://lmi.org' },
    { company: 'FAAVIATOR', role: 'Lead Product Designer', description: 'Airspace approval app for first-responder drone deployment.', link: 'https://faaviator.com' },
    { company: 'NeuralDev AI', role: 'Lead Product Designer', description: 'AI powered notetaking and self-care apps.' },
    { company: 'Matchset Tennis', role: 'Graphic Designer', description: 'Brand elements, marketing material, commercial production.', link: 'https://matchset.com' },
    { company: 'LifeQuest Studios', role: 'Designer', description: 'Refining the mundane with gamification.', link: 'https://lifequeststudios.com' },
]

const educationData = [
    { title: 'CS50 @ Harvard University', progressPercentage: 50, desc: 'Intro to CompSci, focusing on C and Python.', link: 'https://cs50.harvard.edu/x/2026/' },
    { title: 'Google UX Professional Certificate', progressPercentage: 40, desc: 'Equitable design-thinking for enterprise.', link: 'https://grow.google/certificates/ux-design/' },
    { title: 'BFA in Graphic Design', progressPercentage: 100, desc: 'Foundations of design, typography, and branding.'},
]

export default function Page() {
    return (
        <ContentLayout readableLineLength={false}>
            <Row>
            M.A. Lair. Updated <Badge>MAR 2026</Badge>
            </Row>
            <br/>
            <br/>

            <div className={styles.header}>
            </div>
            <div>
                <Table style={{ minWidth: '50ch' }}>
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
                                    <TableColumn>
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
            <br />
        </ContentLayout>
    )
}