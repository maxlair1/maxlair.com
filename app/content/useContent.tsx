import * as React from 'react';
import { removeExtension, slicePathAtRoot } from '@lib/utilities';
import matter from 'gray-matter';
import GET from '@root/app/api/github';


export interface ContentNode {
    title: string;
    path: string; // path object later
    route?: string;
    source: 'local' | 'remote';
    /**
     * local: page, dir, or file stored locally, used for static content
     * remote: .md or .mdx file stored remotely, used for dynamic content that can be updated without redeploying the app
     */
    type: 'file' | 'dir' | 'page';
    /**
     * file: .md, .mdx, .txt, .png, .jpeg, and other static files.
     * dir: standard directory, has children files or pages.
     * page: route accessible Next.js .tsx file.
     */
    children?: ContentNode[] | undefined;
    hidden?: boolean;
    order?: number;
    description?: string;
}

export interface ContentData extends ContentNode {
    content: string; // for file nodes, the actual markdown content
    frontmatter?: Record<string, any>;
}

export interface ContentIndex {
    byPath: Record<string, ContentNode>;
    byTitle: Record<string, ContentNode>;
}

export interface MergedTrees {
    local?: ContentNode[];
    remote?: ContentNode[];
}

export type Content = {
    index: ContentIndex; // lookup and nav
    load: (path: string, node?: ContentNode) => Promise<ContentData>; // node => full data
    tree: MergedTrees | undefined; // list directories from point
    loading: boolean;
}

const ContentContext = React.createContext<Content | null>(null);

// get content from dirs, build tree, index
export function ContentContextProvider({children}: {children: React.ReactNode}) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [tree, setTree] = React.useState<MergedTrees>();
    const [index, setIndex] = React.useState<ContentIndex>({
        byPath: {},
        byTitle: {},
    });
    
    // uses api/local
    async function initLocal(): Promise<ContentNode[] | undefined> {
        try {
            const response = await fetch('/api/local');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json() as { tree: ContentNode[] };
            return data.tree ?? [];
        } catch (err) {
            console.error(err);
            return undefined;
        } finally {
            setLoading(false);
        }
    }
    //returns tree: ContentNode[]

    
    // uses api/github.ts
    /**
     * TODO: SLICE PATH to get rel path to call children. 
     */
    async function initRemote(path?: string):Promise<ContentNode[]> {

        const calcRelativePath = (fullPath: string) => {
            const marker = "_pub/docs/";
            const index = fullPath.indexOf(marker);
            return index >= 0
                ? fullPath.slice(index + marker.length)
                : fullPath;
        }

        const normalizePath = (path: string): string => {
            const normalizedPath = calcRelativePath(
                removeExtension(
                    slicePathAtRoot(path
                        .toLowerCase()
                        .replace(/ /g, '%20') // replace spaces in filenames with underscores
                    )
                )
            );
            return normalizedPath;
        }
        return await GET('json', path).then((data) => {
            const tree = data.map(async (item: any) => ({
                title: removeExtension(item.name),
                path: item.path,
                route: `/docs/${normalizePath(item.path)}`,
                source: 'remote',
                type: item.type,
                children: item.type === 'dir' ? await initRemote(calcRelativePath(item.path)) : []
            }));
            return Promise.all(tree);
        });
    }
    //returns tree: ContentNode[]
    
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
            const localTree = await initLocal(); // get local
            const localIndex = indexTree(localTree!);
            const remoteTree = await initRemote(); // get remote
            const remoteIndex = indexTree(remoteTree!);

            setTree({local: localTree, remote: remoteTree});
            setIndex({byPath: {...localIndex.byPath, ...remoteIndex.byPath}, byTitle: {...localIndex.byTitle, ...remoteIndex.byTitle}});
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

//old copied stuff

// export interface DocContent<T = Record<string, any>> {
//   content: string;
//   meta: T;
// }