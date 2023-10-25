import GeneratorError from 'helpers/GeneratorError'
import env from 'helpers/env'

export default async function getProof(id: number, hash: string) {
  try {
    const response = await fetch(
      `${env.VITE_KETL_INVITES_BACKEND}/merkle/proof?attestationType=${id}&hash=${hash}`
    )

    return response.json() as Promise<{
      siblings: string[]
      pathIndices: number[]
    }>
  } catch (e) {
    throw new GeneratorError(
      `Can't get invitation list, please try again later`,
      { cause: e }
    )
  }
}
