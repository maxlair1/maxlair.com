import * as React from 'react';

import styles from '@root/components/DocLoader.module.css';

import { useDocs, type DocContent } from '@root/api/useDoc';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import Badge from './Badge';

export interface DocLoaderProps {
    docSlug: string;
    docRelativePath?: string; // root of the `/_pub/docs/` directory in the GitHub repo
    onDoc?: () => void;
    onDocLoading?: () => void;
}

const mdComponents = {
    code: ({node, className, children, ...props}) => {
      const match = /language-(\w+)/.exec(className || '');
      
      return match 
        ? <CodeBlock className={className}>{children}</CodeBlock>
        // replace badge with custom inline code component
        : <Badge {...props}>{children}</Badge>;
    }
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
            <ReactMarkdown components={mdComponents} remarkPlugins={[remarkGfm]}>
                {doc?.content || "Loading..."}
            </ReactMarkdown>
        </div>
      )
  );
}


