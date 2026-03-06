import * as React from 'react';
import CodeBlock from '@components/CodeBlock';
import Badge from '@components/Badge';
import {findAndReplace, type FindAndReplaceTuple} from 'mdast-util-find-and-replace';
import { removeExtension } from "@root/app/lib/utilities";
import useContent from '@root/app/content/useContent';
import Divider from '../Divider';
import Image from 'next/image';
import ListItem from '../ListItem';

export const MarkdownComponents = {
  // Code Block and Inline using SRCL 
  code: ({node, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '');
    
    return match 
      ? <CodeBlock className={className}>{children}</CodeBlock>
      // replace badge with custom inline code component
      : <Badge {...props}>{children}</Badge>;
  },
  hr: () => <Divider type="GRADIENT" />,
  img: ({node, alt, src, width, height, ...props}) => {
    const { getImageUrl, imageIndex } = useContent();
    const filename = src.split('/').pop() ?? '';
    
    console.log('Rendering image:', {src, filename, url: getImageUrl(filename), index: imageIndex});
    if (!getImageUrl(filename)) {
      return <span {...props}>{`Image not found: ${alt}`}</span>;
    }
    return (
      // <em style={{position: 'relative', width: '100%', height: 'auto'}}>
        <Image
          alt={alt}
          src={String(getImageUrl(filename)!)}
          width={1000}
          height={500}
          style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
          loading='lazy'
          {...props}
        />
      // </em>
    );
  },
  ul: ({node, children, ...props}) => <ul {...props} style={{paddingLeft: '1.5em'}}>{children}</ul>,
  li: ({node, children, ...props}) => <ListItem {...props} style={{marginBottom: '0.5em'}}>{children}</ListItem>,
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