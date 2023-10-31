import CreatePasswordProofParams from 'models/CreatePasswordProofParams'
import createPasswordInput from 'helpers/createPasswordInput'
import generatePasswordProof from 'helpers/generatePasswordProof'

export default async function createPasswordProof(
  params: CreatePasswordProofParams,
  logger: (message: string) => void
) {
  const input = await createPasswordInput(params)
  const proof = await generatePasswordProof(input, logger)

  return proof
}
