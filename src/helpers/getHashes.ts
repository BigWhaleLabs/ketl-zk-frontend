import GeneratorError from 'helpers/GeneratorError'
import env from 'helpers/env'

export default async function getHashes(id: number) {
  try {
    const response = await fetch(
      `${env.VITE_KETL_INVITES_BACKEND}/merkle/hashes?attestationType=${id}`
    )

    return response.json()
  } catch (e) {
    throw new GeneratorError(
      `Can't get invitation list, please try again later`,
      { cause: e }
    )
  }
}
