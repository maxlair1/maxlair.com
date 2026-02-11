import * as React from 'react';
import matter from 'gray-matter';

import GET from '@root/lib/github';

interface GitHubDirItem {
  name: string;
  path: string;
  type: "file" | "dir";
}

export interface DocListItem {
  name: string;
  slug: string;
  path: string;
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

export function isb64(v: unknown): v is GHMD {
    if (!v || typeof v !== "object") return false;
    const obj = v as Record<string, unknown>;
    return obj.encoding === "base64" && typeof obj.content === "string";
}

export function useDocs() {

    const list = async (): Promise<DocListItem[]> => {
        const data = (await GET('json')) as GitHubDirItem[];

        return data
            .map((item) => ({
            name: item.name,
            slug: item.name.replace(/\.md$/, ""),
            path: item.path,
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