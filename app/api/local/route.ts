import * as fs from 'node:fs/promises';
// import { pathToFileURL } from 'node:url';
import path from 'path';
import { removeExtension } from '../../lib/utilities';

type pageMeta = {
  title?: string,
  description?: string,
  order?: number,
  hidden?: boolean 
  defaultOpen?: boolean
}

async function getContentTree(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  const results = await Promise.all(entries.map(async (entry) => {
    // TODO: account for md files.
    // || entry.isFile() && ['.md', '.mdx'].includes(path.extname(entry.name))
    if (entry.isDirectory()) {
      const parentPath = path.join(dir, entry.name);
      const pagePath = path.join(parentPath, 'page.tsx');
      const metaPath = path.join(parentPath, 'meta.json');
      
      let hasPage = false;
      let meta: pageMeta = {};  

      try {
        await fs.access(pagePath);
        hasPage = true;
      } catch {}

      try {
        const raw = await fs.readFile(metaPath, 'utf-8');
        meta = JSON.parse(raw);
      } catch {}  
      
      console.log('processing entry', entry.name, 'has page?', hasPage, 'meta:', meta, 'at path', metaPath);
      return {
        ...meta,
        title: meta.title ?? removeExtension(entry.name),
        defaultOpen: meta.defaultOpen,
        path: path.join(dir, entry.name),
        route: `/${path.relative('app/', path.join(dir, entry.name)).replace(/\\/g, '/')}`,
        source: 'local',
        type: hasPage ? 'page' : 'dir',
        children: hasPage
          ? undefined
          : await getContentTree(path.join(dir, entry.name)),
      }
    }
  }));

  return results.filter(Boolean);
  
}

export async function GET() {
  try {
    const tree = await getContentTree(path.join(process.cwd(), 'app/content'));
    return Response.json({ tree });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to load tree" }),
      { status: 500 }
    );
  }
}

//OLD:
//
// async function getContentTree(dir: string) {
//   const entries = await fs.readdir(dir, { withFileTypes: true });
//   return await Promise.all(
//     entries.map(async (entry) => ({
//       title: removeExtension(entry.name),
//       path: path.join(dir, removeExtension(entry.name)),
//       source: 'local',
//       type: entry.isDirectory() ? 'dir' : 'file',
//       children: entry.isDirectory()
//         ? await getContentTree(path.join(dir, entry.name))
//         : undefined,
//     }))
//   );
// }