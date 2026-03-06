import * as React from 'react';
import { removeExtension, slicePathAtRoot, getExtension } from '@lib/utilities';
import matter from 'gray-matter';
import GET from '@root/app/api/github';
import { url } from 'node:inspector';
import { title } from 'node:process';


export interface ContentNode {
    title: string;
    path: string;
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
    route?: string;
    url?: string;
    extension?: string;
    hidden?: boolean;
    order?: number;
    description?: string;
    defaultOpen?: boolean;
    children?: ContentNode[] | undefined;
}

export interface ContentIndex {
    byPath: Record<string, ContentNode>;
    byTitle: Record<string, ContentNode>;
}

export interface MarkdownData extends ContentNode {
    content: string; // for file nodes, the actual markdown content
    frontmatter?: Record<string, any>;
}

export interface ImageData  {
    title: string;
    url: string;
    project: string;
}

export interface MergedTrees {
    local?: ContentNode[];
    remote?: ContentNode[];
}

export interface Content {
    index: ContentIndex; // lookup and nav
    load: (path: string, node?: ContentNode) => Promise<MarkdownData>; // node => full data
    tree: MergedTrees | undefined; // list directories from point
    loading: boolean;
    images: ImageData[];
}

const ContentContext = React.createContext<Content | null>(null);

/**
 * Steps to retrieve content
 * 1. GET recursively from Github
 * 2. Map to ContentNode
 * 3. Index Tree
 * 4. In Init, sort by dir and file, and then by file extension into full items. Dir stays as Node
 * 
 */


// get content from dirs, build tree, index
export function ContentProvider({children}: {children: React.ReactNode}) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [tree, setTree] = React.useState<MergedTrees>();
    const [images, setImages] = React.useState<ImageData[]>();
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
    async function initRemote(path?: string):Promise<{tree: ContentNode[]; images: ImageData[]}> {

        const calcRelativePath = (fullPath: string) => {
            const marker = "_pub/";
            const index = fullPath.indexOf(marker);
            return index >= 0
                ? fullPath.slice(index + marker.length)
                : fullPath;
        }

        const normalizePath = (path: string): string => {
            const normalizedPath = calcRelativePath(
                slicePathAtRoot(path
                    .replace(/ /g, '%20') // replace spaces in filenames with underscores
                )
            );
            return normalizedPath;
        }

        return await GET('json', path).then(async (data) => {
            const tree = await Promise.all(data.map(async (item: any): Promise<ContentNode> => {
                return {
                    title: removeExtension(item.name),
                    url: item.download_url,
                    path: item.path,
                    route: `/${normalizePath(item.path)}`,
                    source: 'remote',
                    type: item.type,
                    extension: getExtension(item.path),
                    children: item.type === 'dir' ? await initRemote(calcRelativePath(item.path)).then(res => res.tree) : []
                };
            }));
            
            const images: ImageData[] = [];
            const collectImages = (nodes: ContentNode[]) => {
                for (const node of nodes) {
                    if (node.extension && ['png', 'jpg', 'jpeg', 'gif'].includes(node.extension)) {
                        images.push({
                            title: node.title,
                            url: node.url!,
                            project: node.path.split('/')[0],
                        });
                    }
                    if (node.children) collectImages(node.children);
                }
            };
            collectImages(tree);
            
            console.log('Remote tree initialized:', {tree, images});
            return {tree, images};
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
            const {tree: remoteTree, images} = await initRemote(); // get remote
            const remoteIndex = indexTree(remoteTree!);
            

            setTree({local: localTree, remote: remoteTree});
            setIndex({byPath: {...localIndex.byPath, ...remoteIndex.byPath}, byTitle: {...localIndex.byTitle, ...remoteIndex.byTitle}});
            setImages(images);
        }
        init();
    }, []);
    
    const load = async (path: string, node?: ContentNode): Promise<MarkdownData> => {
        // note: maybe eventually use this as the onClick for the tree item.
        return await GET('raw', path).then(n => {
            const {data, content} = matter(n);
            if (node) {
                return {
                    ...node,
                    frontmatter: data,
                    content: content,
                };
            } else {
                // fallback: create minimal ContentData
                return {
                    title: data.title ?? removeExtension(path),
                    path,
                    source: 'remote',
                    type: 'file',
                    content,
                    frontmatter: data,
                };
            }
        });
    }

    return (
        <ContentContext.Provider value={{
            tree,
            load,
            index,
            loading,
            images: images ?? [],
        }}>
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