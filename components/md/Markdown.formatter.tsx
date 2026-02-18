import * as React from 'react'
import ReactMarkdown from 'react-markdown';
import {MarkdownComponents} from './Markdown.components';
// plugins
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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
]

const rehypePlugins = [
    rehypeRaw,
]

export function MarkdownFormatter(md: string) {
    return (
        <div>
            <ReactMarkdown 
                components={MarkdownComponents}
                rehypePlugins={rehypePlugins} 
                remarkPlugins={remarkPlugins}>
                {md || "Loading..."}
            </ReactMarkdown>
        </div>
    );
}