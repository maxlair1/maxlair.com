import * as React from 'react';
import { usePathname } from 'next/navigation';

import styles from '@components/bespoke/DocLoader.module.css';

import { useDocs, type DocContent } from '@root/api/useDocs';
import { useDocsContext } from '@root/contexts/DocsContext';
import MarkdownFormatter from '../md/Markdown.formatter';
import BreadCrumbs, { BreadCrumbsItem } from '../BreadCrumbs';
import { get } from 'node:http';
import path from 'node:path';

export interface DocLoaderProps {
    docSlug: string;
    docRelativePath?: string; // root of the `/_pub/docs/` directory in the GitHub repo
    onDoc?: () => void;
    onDocLoading?: () => void;
}

export default function DocLoader({ docSlug, docRelativePath }: DocLoaderProps): React.ReactNode {
    const [loading, setLoading] = React.useState(false);
    const [doc, setDoc] = React.useState<DocContent | null>(null);
    const [meta, setMeta] = React.useState<Record<string, any> | null>(null);
    const [BreadCrumbsItems, setBreadCrumbsItems] = React.useState<BreadCrumbsItem[]>([]);
    const { read } = useDocs();
    const { index } = useDocsContext();
    const pathname = usePathname();

    React.useEffect(() => {
        if (!doc) setBreadCrumbsItems([]);

        const parts = ['docs', ...(docRelativePath?.split('/') || []), docSlug];
        
        const isDir = (path: string) => {
            const doc = index.byPathRelative[path];
            return doc && doc.type === 'dir';
        } 
        
        const gethref = (part: string) => {
            if (isDir(part)) return '';
            const pathAsArray: string[] = pathname ? pathname.split('/') : [];
            const marker = pathAsArray.indexOf(part);
            const href = '/' + pathAsArray.slice(0, marker + 1).join('/');
            console.log(href);
            return '/' + href;
        }

        const breadCrumbs: BreadCrumbsItem[] = parts.map((part) => ({ name: part, url: gethref(part)}));
        setBreadCrumbsItems(breadCrumbs);
    },[])

    React.useEffect(() => {
        async function readDoc() {
            setLoading(true);
            const doc = await read(docSlug, docRelativePath)
            .then(async (doc) => {
                setDoc(doc);
                setMeta(doc.meta);
                setLoading(false);
            })
            .catch(err => console.error("Error rendering markdown:", err));
        }
        readDoc(); '/'
        
      }, [docRelativePath, docSlug]);
      
  return (
    !docSlug
      ? <div>no doc specified</div>
      : (
        <div className={`prose ${styles.root}`} style={{ maxWidth: '120ch', margin: '0 auto', padding: '1rem' }}>
            <div className={styles.header}>
                <BreadCrumbs items={BreadCrumbsItems}></BreadCrumbs>
            </div>
            <MarkdownFormatter md={doc?.content || ''} frontmatter={meta ?? undefined}/>
        </div>
      )
  );
}


