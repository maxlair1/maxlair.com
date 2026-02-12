import * as React from 'react';
import matter from 'gray-matter';

import GET from '@root/lib/github';

export interface GitHubDirItem {
  name: string;
  path: string;
  type: "file" | "dir";
}

export interface DocListItem {
  name: string;
  slug: string;
  path: string;
  pathRelative: string;
  type: "file" | "dir"
}

export interface DocData<T = Record<string, any>> {
  content: string;
  meta: T;
}

export function decodeBase64(input: string): string {
    const binary = atob(input);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

export function useDocs() {

    const list = async (dir?: string): Promise<DocListItem[]> => {
        const data = (await GET('json', undefined, dir)) as GitHubDirItem[];

        const calcRelativePath = (fullPath: string) => {
            const marker = "_pub/docs/";
            const index = fullPath.indexOf(marker);
            return index >= 0
                ? fullPath.slice(index + marker.length)
                : fullPath;
        }

        return data
            .map((item) => ({
                name: item.name,
                slug: item.name.replace(/\.md$/, ""),
                path: item.path,
                pathRelative: calcRelativePath(item.path),
                type: item.type
            }));
        }

    const getDoc = async <T = Record<string, any>>(
        slug: string
    ): Promise<DocData<T>>  => {
        const docRef = `${slug}.md`;

        const raw = await GET('raw', docRef);

        const { content, data } = matter(raw);

        return {
            content,
            meta: data as T,
        };
    }

    return {list, getDoc};
}