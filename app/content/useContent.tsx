import * as React from 'react';
import { removeExtension, slicePathAtRoot, getExtension } from '@lib/utilities';
import matter from 'gray-matter';
import GET from '@root/app/api/github';
import { url } from 'node:inspector';


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
    children?: ContentNode[] | undefined;
    hidden?: boolean;
    order?: number;
    description?: string;
    defaultOpen?: boolean;
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

export interface Content {
    index: ContentIndex; // lookup and nav
    load: (path: string, node?: ContentNode) => Promise<ContentData>; // node => full data
    tree: MergedTrees | undefined; // list directories from point
    loading: boolean;
    imageIndex: { name: string, url: string }[];
    getImageUrl: (filename: string) => string | undefined;
}

export interface ImageIndex {
    byFilename: Record<string, Image>;
    byProject: Record<string, Image[]>;
}

export interface Image extends ContentNode {
    /**
     * AVAILABLE RESPONSE FIELDS
     * {
        "name": "image.png",
        "path": "assets/image.png",
        "sha": "abcdef1234567890abcdef1234567890abcdef12",
        "size": 2048,
        "url": "https://api.github.com/repos/octocat/Hello-World/contents/assets/image.png",
        "html_url": "https://github.com/octocat/Hello-World/blob/main/assets/image.png",
        "download_url": "https://raw.githubusercontent.com/octocat/Hello-World/main/assets/image.png",
        "type": "file",
        "content": "
     */
    download_url?: string;
    project?: string; //parent dir if not root of _img
    size: number;
}

const ContentContext = React.createContext<Content | null>(null);

// get content from dirs, build tree, index
export function ContentProvider({children}: {children: React.ReactNode}) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [tree, setTree] = React.useState<MergedTrees>();
    const [imageIndex, setImageIndex] = React.useState<{ name: string, url: string }[]>([]);
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
                slicePathAtRoot(path
                    .replace(/ /g, '%20') // replace spaces in filenames with underscores
                )
            );
            return normalizedPath;
        }
        return await GET('json', path).then(async (data) => {
            const filtered = data.filter((item: any) => !(item.type === 'dir' && item.name.startsWith('_')));
            const tree = await Promise.all(filtered.map(async (item: any): Promise<ContentNode> => {
                return {
                    title: removeExtension(item.name),
                    url: item.download_url,
                    path: item.path,
                    route: `/docs/${normalizePath(item.path)}`,
                    source: 'remote',
                    type: item.type,
                    extension: getExtension(item.path),
                    children: item.type === 'dir' ? await initRemote(calcRelativePath(item.path)) : []
                };
            }));
            return tree;
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
 

    // Fetch all images from _img and build index
    const fetchImageIndex = React.useCallback(async () => {
        try {
            const images = await GET('json', '', 'img');
            const index = images
                .filter((item: any) => item.type === 'file')
                .map((item: any) => ({
                    name: item.name,
                    url: item.download_url
                }));
            setImageIndex(index);
        } catch (err) {
            console.error('Failed to fetch image index:', err);
        }
    }, []);

    React.useEffect(() => {
        fetchImageIndex();
    }, [fetchImageIndex]);

    // Helper to get image URL by filename
    const getImageUrl = React.useCallback((filename: string) => {
        const found = imageIndex.find(img => img.name === filename);
        return found ? found.url : undefined;
    }, [imageIndex]);

    React.useEffect(() => {
        setLoading(true);
        async function init() {
            const localTree = await initLocal(); // get local
            const localIndex = indexTree(localTree!);
            const remoteTree = await initRemote(); // get remote
            const remoteIndex = indexTree(remoteTree!);
            await fetchImageIndex();

            setTree({local: localTree, remote: remoteTree});
            setIndex({byPath: {...localIndex.byPath, ...remoteIndex.byPath}, byTitle: {...localIndex.byTitle, ...remoteIndex.byTitle}});
            // setImages(images);
        }
        init();
    }, []);
    
    const load = async (path: string, node?: ContentNode, type: string = 'doc', accept: string = 'raw'): Promise<ContentData> => {
        // note: maybe eventually use this as the onClick for the tree item.
        return await GET('raw', path, 'docs').then(n => {
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
            imageIndex,
            getImageUrl,
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