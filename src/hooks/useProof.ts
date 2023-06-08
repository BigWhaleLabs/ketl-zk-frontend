import { useCallback, useState } from 'preact/hooks'
import CreateProofParams from 'models/CreateProofParams'
import Messages from 'models/Messages'
import Signature from 'models/Signature'
import createAttestationProof from 'helpers/createAttestationProof'
import createPasswordProof from 'helpers/createPasswordProof'
import findVerificationId from 'helpers/findVerificationId'
import isValidProofMessage from 'helpers/isValidProofMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'
import requestSignature from 'helpers/requestSignature'

export default function useProof() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const createProof = useCallback(async function (
    params: CreateProofParams,
    signature?: Signature
  ) {
    try {
      setError('')
      setLoading(true)

      if (!isValidProofMessage(params))
        throw new Error('Invalid params! Try again!')

      const id = params.id || (await findVerificationId(params))

      const messageAndSignature =
        signature || (await requestSignature(id, params.type, params))

      const attestationProof = await createAttestationProof(
        id,
        params,
        messageAndSignature
      )

      const passwordProof = await createPasswordProof(
        id,
        params,
        attestationProof.publicSignals[2],
        attestationProof.publicSignals[3],
        messageAndSignature
      )

      const data = {
        attestationProof,
        passwordProof,
      }

      postWebViewMessage({
        data,
        type: Messages.GetProof,
      })
    } catch (e) {
      postWebViewMessage({
        data: {
          e: JSON.stringify(e, Object.getOwnPropertyNames(e)),
          message: `Can't generate valid proof with this token`,
        },
        type: Messages.GetProofError,
      })
      console.error(e)
      setLoading(false)
      if (typeof e === 'string') {
        setError(e)
      } else if (e instanceof Error) {
        setError(e.message)
      }
    }
  },
  [])

  return {
    createProof,
    error,
    loading,
    setError,
    setLoading,
  }
}
