import * as React from 'react';
import styles from './NothingHere.module.css';
import Image from 'next/image';
import constructionGif from '../../public/construct.gif';
import constructionTextGif from '../../public/construction_text.gif';
import shrug from '../../public/shrug.gif';

export default function NothingHere({type}: {type: 'construction' | 'not-found' | 'placeholder'}): React.ReactElement {
  const content = {
    construction: (
        <div className={styles.construction}>
            <br/>
            <p>Whoops!</p>
            <br/>
            <p>This page seems to be under</p>
            <Image src={constructionTextGif} alt="Under construction" unoptimized/>
            <p>Please check back later!</p>
            <Image src={constructionGif} alt="Under construction" unoptimized/>
            <a href="/">go home</a>
        </div>
    ),
    'not-found': (
        <div className={styles.notFound}>
            404: Not found
            <Image src={shrug} alt="Shrug" unoptimized/>
        </div>
    ),
    placeholder: <div>Placeholder</div>,
  };

  return content[type];
}
