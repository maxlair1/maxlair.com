import CodeBlock from '@components/CodeBlock';
import Badge from '@components/Badge';
import AlertBanner from '../AlertBanner';
import {findAndReplace, type FindAndReplaceTuple} from 'mdast-util-find-and-replace';
import { useDocsContext } from "@root/contexts/DocsContext";
import { removeExtension } from "@root/app/lib/utilities";

export const MarkdownComponents = {

  // Code Block and Inline using SRCL 
  code: ({node, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '');
    
    return match 
      ? <CodeBlock className={className}>{children}</CodeBlock>
      // replace badge with custom inline code component
      : <Badge {...props}>{children}</Badge>;
  },

  blockquote: ({node, children, ...props}) => {
    return <AlertBanner {...props}>{children}</AlertBanner>;
  }
}

export function remarkWikis() {
  const { index } = useDocsContext();

  // https://regex101.com/r/5R0WQ1/1
  // Captures: [[slug]] [[slug#anchor]] [[slug|display]] [[slug#anchor|display]]
  const replaceNode: FindAndReplaceTuple = [
  /\[\[([^\]#|]+?)(?:#([^\]|]+?))?(?:\|([^\]]+?))?\]\]/g, 
    (match, slug, anchor, displayText) => {
    const docIndex = index.bySlug[slug];
    const anchorFormatted = String(anchor).toLowerCase().replace(/\s+/g, '-');
    if (docIndex) {
      return {
        type: "link",
        url: `/docs/${removeExtension(docIndex.pathRelative)}${anchor ? `#${anchorFormatted}` : ''}`,
        children: [{ type: "text", value: displayText ?? slug }],
        data: {
          hProperties: {
            className: "wiki-link",
          },
        },
      };
    }
  }];
  return (tree) => findAndReplace(tree, replaceNode);
};