import * as React from 'react';
import styles from '@components/bespoke/DocLoader.module.css';
import MarkdownFormatter from '../md/Markdown.formatter';
import useContent from '@root/app/content/useContent';

export interface DocLoaderProps {
  path?: string; // root of the `/_pub/docs/` directory in the GitHub repo
  onDoc?: () => void;
  onDocLoading?: () => void;
}

export default function DocLoader({ path }: DocLoaderProps): React.ReactNode {
    const [loading, setLoading] = React.useState(false);
    const [doc, setDoc] = React.useState<string>();
    const [meta, setMeta] = React.useState<Record<string, any> | undefined>(undefined);
    const [images, setImages] = React.useState<any[] | undefined>(undefined);
    const { load, index } = useContent();

    React.useEffect(() => {
        async function loadDoc() {
          if (!path) return;
          setLoading(true);
          const doc = await load(path)
          .then(async (doc) => {
              setDoc(doc.content);
              setMeta(doc.frontmatter);
              setLoading(false);
          })
          .catch(err => console.error("Error rendering markdown:", err));
        }
        loadDoc();
      }, [path]);
      
  return (
    !path
      ? <div>no doc specified</div>
      : (
        <div className={`prose ${styles.prose} ${styles.root}`}>
            {/* <MarkdownFormatter md={doc ?? ''} frontmatter={meta ?? undefined}/> */}
            <pre className={styles.raw}>
                {doc}
            </pre>
        </div>
      )
  );
}


