import CodeBlock from '@components/CodeBlock';
import Badge from '@components/Badge';
import AlertBanner from '../AlertBanner';
import {findAndReplace, type FindAndReplaceTuple} from 'mdast-util-find-and-replace';
import { removeExtension } from "@root/app/lib/utilities";
import useContent from '@root/app/content/useContent';

export const MarkdownComponents = {

  // Code Block and Inline using SRCL 
  code: ({node, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '');
    
    return match 
      ? <CodeBlock className={className}>{children}</CodeBlock>
      // replace badge with custom inline code component
      : <Badge {...props}>{children}</Badge>;
  },
}

export function remarkWikis() {
  const { index } = useContent();

  // https://regex101.com/r/5R0WQ1/1
  // Captures: [[slug]] [[slug#anchor]] [[slug|display]] [[slug#anchor|display]]
  const replaceNode: FindAndReplaceTuple = [
  /\[\[([^\]#|]+?)(?:#([^\]|]+?))?(?:\|([^\]]+?))?\]\]/g, 
    (match, slug, anchor, displayText) => {
    const docIndex = index.byTitle[slug];
    const anchorFormatted = String(anchor).toLowerCase().replace(/\s+/g, '-');
    if (docIndex) {
      return {
        type: "link",
        url: `/docs/${removeExtension(docIndex.path)}${anchor ? `#${anchorFormatted}` : ''}`,
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