import * as React from 'react'
import styles from './MarkdownFormatter.module.css';
import { usePathname } from 'next/navigation';
import {MarkdownComponents, remarkWikis} from './MarkdownComponents';
import * as Utilities from '@lib/utilities';
// plugins
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import useContent, { ImageData as ContentImageData } from '@root/app/content/useContent';
import rehypeRaw from 'rehype-raw'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm';
// import Gallery from '@components/bespoke/Gallery';
import Avatar from '@components/Avatar';
import Indent from '../Indent';
import BlockLoader from '../BlockLoader';

import portrait from '@root/public/portrait.png'

/** GOALS:  
 *      1. Input Markdown, handle either RAW or .md files.
 *      2. Use ReactMarkdown for renderer
 *      3. Bring in custom Markdown.Components
 *      4. Use Remark, and appropriate Plugins for Obsidian Flavored MD
 *          - https://github.com/heavycircle/remark-obsidian
 *      5. Additionally use remark-gfm, and rehype-raw, as well as remark-wiki-link-plus. Save these as an array for easy import.
 */

export interface MarkdownFormatterProps {
    path?: string; // root of the `/_pub/docs/` directory in the GitHub repo
    onDoc?: () => void;
    onDocLoading?: () => void;
}

export default function MarkdownFormatter({ path }: MarkdownFormatterProps): React.ReactNode {
    const { load, images: allImages } = useContent();
    const pathname = usePathname();
    const [images, setImages] = React.useState<ContentImageData[]>([]);
    const [file, setFile] = React.useState<string>();
    const [frontmatter, setFrontmatter] = React.useState<Record<string, any> | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(true);
    
    React.useEffect(() => {
        if (!path) return;
        (async () => {
            setLoading(true);
            try {
                const f = await load(path);
                console.log(f);
                setFile(f.content);
                setFrontmatter(f.frontmatter);
                if (f.frontmatter?.project) {
                    const filteredImages = allImages.filter(img => f.frontmatter!.project.includes(img.project));
                    setImages(filteredImages);
                }
            } catch (err) {
                console.error("Error rendering markdown:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [path, allImages]);
      
    return (
        loading ? 
        (<span className={styles.loading}>
            <BlockLoader mode={1}/>
            Loading...
        </span>)
        : (
            <article className={styles.prose}>
                <hgroup className={styles.header}>
                    <h1>{frontmatter?.title ?? Utilities.titleCase(Utilities.getCurrentSlug(pathname))}</h1>
                    {frontmatter ? <Avatar src={portrait.src}>
                        <Indent>
                            MAX LAIR
                            {frontmatter!.date ? <><br />{frontmatter!.date}</> : null}
                        </Indent>
                    </Avatar> : null}
                </hgroup>
                <ReactMarkdown
                    components={MarkdownComponents}
                    remarkPlugins={[remarkParse, remarkGfm, remarkWikis]}
                    rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw]}
                >
                    {file}
                </ReactMarkdown>
            </article>
            )
    );
}