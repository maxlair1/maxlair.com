import * as React from 'react';
import matter from 'gray-matter';

import GET from '@root/api/github';
import { relative } from 'node:path';

export interface Doc {
    name: string;
    slug: string;
    path: string;
    pathRelative: string;
    type: "file" | "dir"
}

export interface DocContent<T = Record<string, any>> {
  content: string;
  meta: T;
}

export function decodeBase64(input: string): string {
    const binary = atob(input);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

const calcRelativePath = (fullPath: string) => {
    const marker = "_pub/docs/";
    const index = fullPath.indexOf(marker);
    return index >= 0
        ? fullPath.slice(index + marker.length)
        : fullPath;
}

export function useDocs() {
    const list = async (dir?: string): Promise<Doc[]> => {
        const data = (await GET('json', undefined, dir)) as Doc[];

        return data
            .map((item) => ({
                name: item.name,
                slug: item.name.replace(/\.md$/, ""),
                path: item.path,
                pathRelative: calcRelativePath(item.path),
                type: item.type
            }));
        }

    const read = async <T = Record<string, any>>(slug: string, path?: string): Promise<DocContent<T>>  => {
        const filename  = `${slug}.md`;
        const raw = await GET('raw', path, filename);
        const { content, data } = matter(raw);

        return {
            content,
            meta: data as T,
        };
    }

    return {list, read};
}