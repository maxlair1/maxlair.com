import {findAndReplace, type FindAndReplaceTuple} from 'mdast-util-find-and-replace';
import { useDocsContext } from "@root/contexts/DocsContext";
import { rmExtension } from "@lib/regexTransforms";


export default function remarkWikis() {
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
        url: `/docs/${rmExtension(docIndex.pathRelative)}${anchor ? `#${anchorFormatted}` : ''}`,
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
