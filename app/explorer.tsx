'use client';

import * as React from 'react';

import Indent from '@root/components/Indent';
import ActionBar from '@root/components/ActionBar';
import actions from '@root/common/actions';
import DocTreeView from '@root/components/bespoke/DocTreeView';
import Image from 'next/image';
import HeaderImage from '../public/hero_logo.svg';

export default function Explorer(): React.ReactNode {

    return (
        <div className="theme-override-dark">
            <div style={{ display: 'flex', padding: '0.5rem' }}>
                <Image src={HeaderImage} alt='Max Lair Logo' width={200}/>
            </div>
            <ActionBar items={actions}/>
            <Indent>
                <DocTreeView />
            </Indent>
        </div>
    );
}