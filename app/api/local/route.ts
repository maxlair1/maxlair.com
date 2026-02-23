import * as fs from 'node:fs/promises';
import path from 'path';
import { removeExtension } from '../../lib/utilities';

const defaultPath = 'app/content';

async function getContentTree(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return await Promise.all(
    entries.map(async (entry) => ({
      title: removeExtension(entry.name),
      path: path.join(dir, removeExtension(entry.name)),
      source: 'local',
      type: entry.isDirectory() ? 'dir' : 'file',
      children: entry.isDirectory()
        ? await getContentTree(path.join(dir, entry.name))
        : undefined,
    }))
  );
}

export async function GET() {
  try {
    const tree = await getContentTree('app/content');

    return Response.json({ tree });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to load tree" }),
      { status: 500 }
    );
  }
}