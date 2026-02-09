

const githubAPIPath = `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/contents/${path}`,


export function GET(
    _: Request,
    { params }: { params: { path: string[] } }
) {

    const response =await fetch(
        githubAPIPath,
        {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: `application/vnd.github${params ?? "." + params}+json`
            }
        })
    if (!response || !response.ok) {
        throw new Error("")
    }
)
}
