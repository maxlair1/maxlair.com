import * as React from 'react';

import Row from '@root/components/Row';
import ListItem from '@root/components/ListItem';


export default function Page() {
    const things = [
        'Keeping the internet weird.',
        'Authenticity and honest design',
        'Making the internet more about community than discovery.',
        'Elegantly solving mildly-infuriating problems.',
        'Treatings all users with dignity.',
        'Technology should be fun.',
        'Being style agnostic, and embodying the vision of my client.',
        'Making the best couch forts for my Daughter.',
        'Being the most optimistic guy in the room',
    ] 
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <Row>
                <ul>
                    {things.map((thing, index) => (
                        <ListItem key={index}>{thing}</ListItem>
                    ))}
                </ul>
            </Row>
        </div>
    )
}