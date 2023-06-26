import env from 'helpers/env'

export default async function getHashes(id: number) {
  const response = await fetch(
    `${env.VITE_KETL_HASHES_SOURCE}/hashes/${id}.json`
  )

  return response.json()
}
