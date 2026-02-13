import * as React from 'react';

import { useDocs, type DocContent } from '@root/api/useDoc';
import ReactMarkdown from 'react-markdown';

export interface DocLoaderProps {
    docSlug: string;
    onDoc?: () => void;
    onDocLoading?: () => void;
    
}

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
        <ReactMarkdown>
            {doc?.content || "Loading..."}
        </ReactMarkdown>
      )
  );
}


