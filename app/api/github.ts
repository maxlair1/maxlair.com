const GITHUB_API_BASE = "https://api.github.com/repos/";

const pubPath = "_pub/";

const owner = process.env.NEXT_PUBLIC_GITHUB_USER!;
const repo  = process.env.NEXT_PUBLIC_GITHUB_REPO!;
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN!;

export async function getStaticProps() {
  
}

function getHeaders(type: "json" | "raw") {
  return {
    Authorization: `token ${token}`,
    Accept: `application/vnd.github${type === "raw" ? ".raw" : ""}+json`,
    "User-Agent": "maxlair.com",
  };
}

/**
 * Fetches content from your repo's _pub/ folder (or subpath)
 * @param accept 'json' or 'raw'
 * @param path Optional subpath (no leading slash, end with / if directory)
 */
export default async function githubFetch(
  accept: "json" | "raw" = "json",
  path: string = ""
) {
  const url = `${GITHUB_API_BASE}${owner}/${repo}/contents/${pubPath}${path}`;

  const res = await fetch(url, {
    method: "GET",
    headers: getHeaders(accept),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GitHub fetch failed: ${res.status} ${res.statusText}`);
  }

  return accept === "json" ? res.json() : res.text();
}