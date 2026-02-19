import * as React from 'react';

import styles from '@components/bespoke/DocLoader.module.css';

import { useDocs, type DocContent } from '@root/api/useDocs';
import MarkdownFormatter from '../md/Markdown.formatter';
import Card from '@components/Card';
import DataTable from '@components/DataTable';

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
    const { read } = useDocs();

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
        readDoc();

    }, [docRelativePath, docSlug]);

  return (
    !docSlug
      ? <div>no doc specified</div>
      : (
        <div className={styles.root} style={{ maxWidth: '120ch', margin: '0 auto', padding: '1rem' }}>
            <MarkdownFormatter md={doc?.content || ''} frontmatter={meta ?? undefined}/>
        </div>
      )
  );
}


