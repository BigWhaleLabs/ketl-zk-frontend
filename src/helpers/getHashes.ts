export default async function getHashes(id: number) {
  const response = await fetch(`/trees/${id}.json`)

  return response.json()
}
