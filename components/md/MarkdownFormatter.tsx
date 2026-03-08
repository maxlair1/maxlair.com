import * as React from 'react'
import styles from './MarkdownFormatter.module.css';
import {MarkdownComponents, remarkWikis} from './MarkdownComponents';
// plugins
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import useContent, { ImageData as ContentImageData } from '@root/app/content/useContent';
import rehypeRaw from 'rehype-raw'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm';
import Gallery from '../bespoke/Gallery';
// import rehypeRaw from 'rehype-raw';

/** GOALS:  
 *      1. Input Markdown, handle either RAW or .md files.
 *      2. Use ReactMarkdown for renderer
 *      3. Bring in custom Markdown.Components
 *      4. Use Remark, and appropriate Plugins for Obsidian Flavored MD
 *          - https://github.com/heavycircle/remark-obsidian
 *      5. Additionally use remark-gfm, and rehype-raw, as well as remark-wiki-link-plus. Save these as an array for easy import.
 */

export interface DocLoaderProps {
    path?: string; // root of the `/_pub/docs/` directory in the GitHub repo
    onDoc?: () => void;
    onDocLoading?: () => void;
}

export default function MarkdownFormatter({ path }: DocLoaderProps): React.ReactNode {
    const { load, images: allImages } = useContent();
    const [images, setImages] = React.useState<ContentImageData[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [file, setFile] = React.useState<string>();
    const [frontmatter, setFrontmatter] = React.useState<Record<string, any> | undefined>(undefined);
    
    React.useEffect(() => {
        if (!path) return;
        (async () => {
            try {
                setLoading(true);
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
        loading
        ? <div>Loading...</div>
        : (
            <div className={styles.root}>
                <div className={`${styles.content} ${styles.prose}`}>
                    <div className={styles.justified}>
                        {frontmatter?.title && <h1>{frontmatter.title}</h1>}
                        <ReactMarkdown
                            components={MarkdownComponents}
                            remarkPlugins={[remarkParse, remarkGfm, remarkWikis]}
                            rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw]}
                        >
                            {file}
                        </ReactMarkdown>
                    </div>
                </div>
                {images.length > 0 && frontmatter?.gallery ? (
                    <div className={styles.gallery}>
                        <Gallery images={images} />
                    </div>
                ) : null}
            </div>
        ) 
    );
}