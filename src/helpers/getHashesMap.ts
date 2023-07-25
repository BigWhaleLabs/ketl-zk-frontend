import env from 'helpers/env'

export default async function getHashesMap(
  id: number
): Promise<{ [key: string]: boolean }> {
  const response = await fetch(
    `${env.VITE_KETL_HASHES_SOURCE}/hashes/maps/${id}.json`
  )

  return response.json()
}
