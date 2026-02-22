import * as React from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { removeExtension } from '../lib/utilities';

export type ContentNodeSource = 'local' | 'remote' | 'component' | 'route';
/**
 * route: points to another route in the app, used for linking to other docs pages
 * component: points to a React component, used for displaying components as content
 * local: .md or .mdx file stored locally, used for static content
 * remote: .md or .mdx file stored remotely, used for dynamic content that can be updated without redeploying the app
 */

export interface ContentNode {
    title: string;
    path: string; // path object later
    source: ContentNodeSource;
    type: 'file' | 'dir';
    children?: ContentNode[] | undefined;
}

export interface ContentData extends ContentNode {
    content: string; // for file nodes, the actual markdown content
    frontmatter?: Record<string, any>;
}

export interface ContentIndex {
    tree: ContentNode[];
    byPath: Record<string, ContentNode>;
    byTitle: Record<string, ContentNode>;
}

export type Content = {
    index: ContentIndex; // lookup and nav
    load: (path: string, node?: ContentNode) => Promise<ContentData>; // node => full data
    list: (path: string) => Promise<ContentNode[]>; // list directories from point
}

const ContentContext = React.createContext<Content | null>(null);

// get content from dirs, build tree, index
export function ContentContextProvider({dir, children}: {dir: string, children: React.ReactNode}) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [tree, setTree] = React.useState<ContentNode[] | undefined>(undefined);

    async function growLocalTree(dir: string, baseUrl = '/content'): Promise<ContentNode[]> {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        return Promise.all(
            entries.map(async (entry) => ({
                title: entry.name,
                path: `${baseUrl}/${removeExtension(entry.name)}`,
                source: 'local',
                type: entry.isDirectory() ? 'dir' : 'file',
                children: entry.isDirectory()
                    ? await growLocalTree(path.join(dir, entry.name), `${baseUrl}/${removeExtension(entry.name)}`)
                    : undefined,
            }))
        );
    }

    React.useEffect(() => {
        setLoading(true);
        growLocalTree(dir)
            .then((localTree) => {
                setTree(localTree);
                console.log(tree);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }, [dir]);
    return (
        // ...
        null
    );

} 

//load, list, index
// export default async function useContent () {


//     React.useEffect(() => {
     

//     },[]);

//     const load = async (path: string, node?: ContentNode ): Promise<ContentData> => {
        
//         return {
//             ...node,
//             content: "", // load content based on the content node
//             frontmatter: {}
//         }
//     }

//     return { load }
// }