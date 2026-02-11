const docPath = `/projects/maxlair.com`
const githubAPIPath = `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/contents/${docPath}`

console.log('ENV CHECK:', {
    user: process.env.GITHUB_USER,
    repo: process.env.GITHUB_REPO,
    hasToken: !!process.env.GITHUB_TOKEN,
    allEnv: Object.keys(process.env).filter(k => k.includes('GITHUB'))
});

export async function GET(
    // _: Request,
    // { params }: { params: { path: string[] } }
) {

    const response = await fetch(
        githubAPIPath,
        {
            // method: "GET",
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                // Accept: `application/vnd.github${params ?? "." + params}+json`,
                Accept: `application/vnd.github+json`,
                'User-Agent': `maxlair.com API Client`,
            },
        }
    );

    return response;

    // if (!response || !response.ok) {
    //     throw new Error("");
    // }
}
