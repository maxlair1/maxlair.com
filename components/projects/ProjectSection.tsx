import * as React from 'react';
import styles from './ProjectSection.module.css';

export interface sectionImage extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string,
    position?: 'left' | 'right' | 'full'
    caption?: ''
}

export interface ProjectSectionProps {
    sectionTitle?: string | null
    sectionImage?: sectionImage | null,
    children: React.ReactNode, 
}

export default function ProjectSection(
    {
        sectionImage = null,
        sectionTitle = null,
        children,
    } : ProjectSectionProps
): React.ReactElement {

    const { src, alt, caption, position, ...imgRest } = sectionImage ?? {};
    const sectionImageElement = (
        <figure className={styles.sectionImage}>
            <img className={styles.image} src={src} alt={alt} {...imgRest}/>
            <figcaption className={styles.caption}>{caption}</figcaption>
        </figure>
    )

    return (
        <section className={styles.root}>
            {/** STYLING WRAPPER
             * root, more acceptable max-width for images. (space 16)
             * wrapper, space images, inline, (space 16)
             * Body = Style it with max-width or TEXT, the 'valley', (space 8)
             * */ }

                {sectionImage && sectionImage.position === 'full' ? (
                    sectionImageElement
                ): null}

                <main className={styles.bodyWrapper}>
                    
                    {sectionImage && sectionImage.position === 'left' ? (
                        sectionImageElement
                    ): null}

                    <div className={styles.body}>
                        <span>
                            <h4>{sectionTitle ?? null}</h4>
                        </span>
                        {children}
                    </div>
                    
                    {sectionImage && sectionImage.position === 'right' ? (
                        sectionImageElement
                    ): null}
                </main>

        </section>


    )
}