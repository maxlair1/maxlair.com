'use client';

import * as React from 'react'

import styles from './page.module.css'

import Link from 'next/link'
import Accordion from '@root/components/Accordion'
import TableColumn from '@root/components/TableColumn'
import Table from '@root/components/Table'
import BlockLoader from '@root/components/BlockLoader'
import TableRow from '@root/components/TableRow';
import ContentLayout from '@components/bespoke/ContentLayout';

interface RecommendationItem {
    src: string,
    name: string,
    role: string,
    company: string,
    link: string,
    email: string,
    phone: string
}

const recommendations: RecommendationItem[] = [
    {src: '/bo_recommendation.txt', name:'Bo Campbell', role:'Design Team Lead', company:'LMI', link: 'https://www.linkedin.com/in/bojcampbell/', email: 'bo.campbell@lmi.org', phone: '805-453-0028'},
    {src: '/kevin_recommendation.txt', name:'Kevin Boswell', role:'Software Developer', company:'NeuralDev', link: 'https://www.linkedin.com/in/kevinboswell/', email: 'kevin@neuraldev.ai', phone: ''}
]


function FetchLetter({ src }: { src: string }): React.ReactElement {
    const [content, setContent] = React.useState<string>('');

    React.useEffect(() => {
        console.log('Fetching recommendation letter from:', src);
        try {
            const data = fetch(src)
              .then(res => res.text())
              .then(setContent);
        } catch (err) {
            console.error('Error fetching recommendation letter:', err);
            setContent('Error loading recommendation letter.');
        }
    }, [])

    return <>{content}</>
}


export default function Page(): React.ReactElement {

    React.useEffect(() => {

    }, []);

    return (
        <ContentLayout readableLineLength={false}>
            <h2>recommendations</h2>
            <p>During my career, I have recieved some really kind words from my peers, supervisors, and mentors.</p>
            {recommendations.map((rec, key) => {
                return <Accordion key={key} style='GRADIENT' title={`${rec.name} - ${rec.role}@${rec.company}`} children={
                    <article className='readableLineLength prose'>
                        <aside>
                            <Table>
                                <TableRow>
                                    <TableColumn>
                                        <Link href={rec.link}>LinkedIn</Link>
                                    </TableColumn>
                                    <TableColumn>
                                        {rec.email}
                                    </TableColumn>
                                    <TableColumn>
                                        {rec.phone}
                                    </TableColumn>
                                </TableRow>
                            </Table>
                        </aside>
                        <br/>
                        <React.Suspense fallback={<BlockLoader mode={1} />}>
                            <FetchLetter src={rec.src}/>
                            <br/>
                        </React.Suspense>
                    </article>
                    }
                />
            })}
        </ContentLayout>
    )

}