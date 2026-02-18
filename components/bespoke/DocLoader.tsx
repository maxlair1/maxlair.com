import * as React from 'react';

import styles from '@components/bespoke/DocLoader.module.css';

import { useDocs, type DocContent } from '@root/api/useDocs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownComponents } from '@root/components/md/Markdown.components';
import Card from '@components/Card';

const DEV_MODE = true;

export interface DocLoaderProps {
    docSlug: string;
    onDoc?: () => void;
    onDocLoading?: () => void;
    
}

export const DocMetadata = ({})

export default function DocLoader({ docSlug }: DocLoaderProps): React.ReactNode {
    const [loading, setLoading] = React.useState(false);
    const [doc, setDoc] = React.useState<DocContent | null>(null);
    const [meta, setMeta] = React.useState<Record<string, any> | null>(null);
    const { read } = useDocs();

    React.useEffect(() => {
        if (!docSlug) return;
        
        //read a doc!
        async function readDoc() {
            setLoading(true);
            const doc = await read(docSlug)
            .then(async (doc) => {
                setDoc(doc);
                setMeta(doc.meta);
                setLoading(false);
            })
            .catch(err => console.error("Error rendering markdown:", err));
        }
        readDoc();

    }, [docSlug]);

  return (
    !docSlug
      ? <div>no doc specified</div>
      : (
        <div className={styles.root} style={{ maxWidth: '120ch', margin: '0 auto', padding: '1rem' }}>
            <Card>
                test
                <h1>{meta?.title || docSlug}</h1>
                {meta?.description && <p>{meta.description}</p>}
            </Card>
            <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {doc?.content || "Loading..."}
            </ReactMarkdown>
        </div>
      )
  );
}


