const GITHUB_API_BASE = "https://api.github.com/repos/"; // Ensure no '/' on end

const docPath = `_pub/docs/`; // default path to docs
const imgPath = `_pub/_img/`; // path to img dir 

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
/**
    NOTE: 
    NO slash at start. If directory, always END with Slash.
*/
export default async function GET(
    accept: 'json' | 'raw' = 'json',
    path?: string,
    type: 'img' | 'docs' = 'docs'
) {

    const githubAPIPath = `
        ${GITHUB_API_BASE}${owner}/${repo}/contents/${type === 'docs' ? docPath : imgPath}${path ?? ""}
    `;

    const response = await fetch(
        githubAPIPath,
        {
            method: "GET",
            headers: getHeaders(accept),
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(`GitHub RAW fetch failed: ${response.status}`);
    }

    if (accept === 'json') {
        return response.json();
    } else return response.text();
    
}
