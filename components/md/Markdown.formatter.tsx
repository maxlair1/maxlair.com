import * as React from 'react'
import ReactMarkdown from 'react-markdown';
import {MarkdownComponents} from './Markdown.components';
import Card from '@components/Card';
import { Suspense } from 'react';
// plugins
import remarkGfm from 'remark-gfm';
import remarkWikis from '@root/lib/remarkWikis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

/** GOALS:  
 *      1. Input Markdown, handle either RAW or .md files.
 *      2. Use ReactMarkdown for renderer
 *      3. Bring in custom Markdown.Components
 *      4. Use Remark, and appropriate Plugins for Obsidian Flavored MD
 *          - https://github.com/heavycircle/remark-obsidian
 *      5. Additionally use remark-gfm, and rehype-raw, as well as remark-wiki-link-plus. Save these as an array for easy import.
 */

const remarkPlugins = [
    remarkGfm,
    remarkWikis, // custom wiki links
]

const rehypePlugins = [
    rehypeAutolinkHeadings,
    rehypeSlug,
    // rehypeRaw,
]

export default function MarkdownFormatter({ md, frontmatter, title, loaded = true }: { md: string, frontmatter?: Record<string, any>, title?: string, loaded?: boolean }): React.ReactNode {

    return (
        <Suspense fallback={<div>Loading...</div>} >
            <h1>{frontmatter?.title ?? title}</h1>
            {frontmatter && Object.keys(frontmatter).length > 0 ? <Card title='META' mode='left'>
                {Object.entries(frontmatter || {}).map(([key, value]) => (
                <div key={key} style={{marginRight: '1rem'}}>
                    <strong>{key}: </strong>{String(value)}
                </div>
                ))}
            </Card> : null}
            <ReactMarkdown 
                components={MarkdownComponents}
                rehypePlugins={rehypePlugins} 
                remarkPlugins={remarkPlugins}
            >
                {md}
            </ReactMarkdown>
        </Suspense>
    );
}