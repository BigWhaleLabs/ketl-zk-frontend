import { useCallback, useState } from 'preact/hooks'
import CreateProofParams from 'models/CreateProofParams'
import Messages from 'models/Messages'
import isValidProofMessage from 'helpers/isValidProofMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'
import createPasswordProof from 'helpers/createPasswordProof'
import createAttestationProof from 'helpers/createAttestationProof'
import requestSignature from 'helpers/requestSignature'
import Signature from 'models/Signature'

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

      const messageAndSignature =
        signature || (await requestSignature(params.id, params.type, params))

      const attestationProof = await createAttestationProof(
        params,
        messageAndSignature
      )

      const passwordProof = await createPasswordProof(
        params,
        attestationProof.publicSignals[2],
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
