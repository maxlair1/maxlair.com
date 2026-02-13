const GITHUB_API_BASE = "https://api.github.com/repos"; // Ensure no '/' on end

const pubPath = `/_pub/docs/`; // default path to docs
const owner = process.env.NEXT_PUBLIC_GITHUB_USER!;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPO!;
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN!;

function getHeaders(type: 'json' | 'raw' ) {
    return {
        Authorization: `token ${token}`,
        Accept: `application/vnd.github${type === 'raw' ? '.raw' : ''}+json`,
        "User-Agent": "maxlair.com",
    };  
}

export default async function GET(
    type: 'json' | 'raw',
    ref?: string,
    path: string = pubPath,
) {

    const githubAPIPath = `
        ${GITHUB_API_BASE}/${owner}/${repo}/contents${path}${ref ?? ""}
    `;

    const response = await fetch(
        githubAPIPath,
        {
            method: "GET",
            headers: getHeaders(type),
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(`GitHub RAW fetch failed: ${response.status}`);
    }

    if (type === 'json') {
        return response.json();
    } else return response.text();
    
}
