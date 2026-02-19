import {findAndReplace, type FindAndReplaceTuple} from 'mdast-util-find-and-replace';
import { useDocsContext } from "@root/contexts/DocsContext";
import { rmExtension } from "@lib/regexTransforms";


export default function remarkWikis() {
  const { index } = useDocsContext();
  const replaceNode: FindAndReplaceTuple = [/\[\[(.+?)(#(.+?))?\]\]/g, (match, slug) => {
    const docIndex = index.bySlug[slug];
    console.log(match, slug, docIndex);
    if (docIndex) {
      return {
        type: "link",
        url: `/docs/${rmExtension(docIndex.pathRelative)}${match[2]}`,
        children: [{ type: "text", value: slug }],
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
