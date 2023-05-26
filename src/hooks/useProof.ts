import { useCallback, useState } from 'preact/hooks'
import CreateProofParams from 'models/CreateProofParams'
import Messages from 'models/Messages'
import isValidProofMessage from 'helpers/isValidProofMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'
import createPasswordProof from 'helpers/createPasswordProof'
import createAttestationProof from 'helpers/createAttestationProof'

export default function useProof() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const createProof = useCallback(async function (params: CreateProofParams) {
    postWebViewMessage({
      data: { message: 'create proof' },
      type: Messages.Debug,
    })
    try {
      setError('')
      setLoading(true)

      if (!isValidProofMessage(params)) return

      console.log('params', params)

      const attestationProof = await createAttestationProof(params)

      console.log('attestationProof', attestationProof)

      const passwordProof = await createPasswordProof(
        params,
        attestationProof.publicSignals[2]
      )

      console.log('passwordProof', passwordProof)

      const data = {
        attestationProof,
        passwordProof,
      }

      console.log('data', data)

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
  }, [])

  return {
    createProof,
    error,
    loading,
    setError,
    setLoading,
  }
}
