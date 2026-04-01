export default async function Page({
  params,
}: {
  params: Promise<{ entry: string }>
}) {
  const { entry } = await params
  return <div>My Post: {entry}</div>
}