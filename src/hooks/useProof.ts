import { useCallback, useState } from 'preact/hooks'
import CreateProofParams from 'models/CreateProofParams'
import Messages from 'models/Messages'
import generateProof from 'helpers/createProof'
import postWebViewMessage from 'helpers/postWebViewMessage'

function isValidProofMessage(params: object): params is CreateProofParams {
  return 'type' in params
}

export default function useProof() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const createProof = useCallback(async function (params: CreateProofParams) {
    try {
      setError('')
      setLoading(true)

      if (!isValidProofMessage(params)) return

      const proof = await generateProof(params)

      postWebViewMessage({
        data: proof,
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
  }, [])

  return {
    createProof,
    error,
    loading,
    setLoading,
    setError,
  }
}
