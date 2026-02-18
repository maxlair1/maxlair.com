import { RootContent } from "mdast";
import { visit } from "unist-util-visit";
import {findAndReplace} from 'mdast-util-find-and-replace';


export default function remarkies() {
  return (tree: any) => {
    visit(tree, "text", (node, index, parent) => {
      const regex = /\[\[(.*?)\]\]/g;
      let match;

      const newNodes: RootContent[] = [];
      let lastIndex = 0;

      while ((match = regex.exec(node.value)) !== null) {
        const [fullMatch, linkText] = match;

        // Push text before match
        if (match.index > lastIndex) {
          newNodes.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }

        // Push link node
        newNodes.push({
          type: "link",
          url: `/docs/${slugify(linkText)}`,
          children: [{ type: "text", value: linkText }],
          data: {
            hProperties: {
              className: "wiki-link",
            },
          },
        });

        lastIndex = match.index + fullMatch.length;
      }

      // Push remaining text
      if (lastIndex < node.value.length) {
        newNodes.push({
          type: "text",
          value: node.value.slice(lastIndex),
        });
      }

      if (newNodes.length) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}
