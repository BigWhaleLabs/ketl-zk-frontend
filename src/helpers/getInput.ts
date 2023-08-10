import { getMerkleTreeInputs } from 'helpers/getMerkleTreeProof'
import GeneratorError from 'helpers/GeneratorError'
import hashByPoseidon from 'helpers/hashByPoseidon'

export default async function getInput(id: string, ids: string[]) {
  if (!ids.includes(id))
    throw new GeneratorError(`Didn't find the invite in the list`)
  try {
    const hashFunc = await hashByPoseidon()
    return getMerkleTreeInputs(20, hashFunc, id, ids)
  } catch (e) {
    throw new GeneratorError('Failed to check invite in list', { cause: e })
  }
}
