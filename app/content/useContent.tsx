import * as React from 'react';
import { removeExtension } from '@lib/utilities';
import matter from 'gray-matter';

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
    active?: boolean;
    children?: ContentNode[] | undefined;
}

export interface ContentData extends ContentNode {
    content: string; // for file nodes, the actual markdown content
    frontmatter?: Record<string, any>;
}

export interface ContentIndex {
    byPath: Record<string, ContentNode>;
    byTitle: Record<string, ContentNode>;
}

export type Content = {
    index: ContentIndex; // lookup and nav
    load: (path: string, node?: ContentNode) => Promise<ContentData>; // node => full data
    tree: ContentNode[] | undefined; // list directories from point
    loading: boolean;
}

const ContentContext = React.createContext<Content | null>(null);

// get content from dirs, build tree, index
export function ContentContextProvider({children}: {children: React.ReactNode}) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [tree, setTree] = React.useState<ContentNode[] | undefined>([]);
    const [index, setIndex] = React.useState<ContentIndex>({
        byPath: {},
        byTitle: {},
    });
    
    async function initTree() {
        try {
            const response = await fetch(`/api/local/`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                return [];
            }

            const data = await response.json() as { tree: ContentNode[] };

            return data.tree
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // adds tree data to index for easy lookup
    function indexTree(
        tree: ContentNode[], 
    ): ContentIndex {
        const byPath: Record<string, ContentNode> = {};
        const byTitle: Record<string, ContentNode> = {};

        function climb(nodes: ContentNode[]) {
            for (const node of nodes) {
                byPath[node.path] = node;
                byTitle[node.title] = node;
                
                if (node.children) climb(node.children);
            }
        }

        climb(tree);
        
        return { byTitle, byPath };
    }
    
    React.useEffect(() => {
        setLoading(true);
        async function init() {
            const tree = await initTree();
            const index = indexTree(tree || []);
            console.log(tree, index);
            setTree(tree);
            setIndex(index);
        }
        init();
    }, []);
    
    const load = async (path: string, node?: ContentNode): Promise<ContentData> => {
        return { 
            content: "",
            frontmatter: {},
            title: node?.title || '',
            path, source: 'local',
            type: 'file' 
        };
    }

    return (
        <ContentContext.Provider value={{ tree, load, index, loading }}>
            {children}
        </ContentContext.Provider>
    );
} 

export default function useContent() {
  const ctx = React.useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentContextProvider");
  return ctx;
}