import * as React from 'react';

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
    children?: ContentNode[];
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

const constructNodes = (): ContentNode[] => {
    return [];
}

//load, list, index
export default async function useContent(data: ContentNode[]) {

    const load = async (path: string, node?: ContentNode ): Promise<ContentData> => {
        
        
        return {
            ...node,
            content: "", // load content based on the content node
            frontmatter: {}
        }
    }

    return { load }
}