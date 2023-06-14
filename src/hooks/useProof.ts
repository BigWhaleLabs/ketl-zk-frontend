import { useCallback } from 'preact/hooks'
import CreatePasswordProofParams from 'models/CreatePasswordProofParams'
import CreateProofParams from 'models/CreateProofParams'
import Messages from 'models/Messages'
import Signature from 'models/Signature'
import createAttestationProof from 'helpers/createAttestationProof'
import createPasswordProof from 'helpers/createPasswordProof'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default function useProof() {
  const createAttestation = useCallback(async function (
    params: CreateProofParams,
    signature: Signature
  ) {
    try {
      const attestationProof = await createAttestationProof(params, signature)

      postWebViewMessage({
        data: {
          attestationMessage: signature.message,
          attestationProof,
        },
        type: Messages.GetAttestationProof,
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
    }
  },
  [])

  const createPassword = useCallback(async function (
    params: CreatePasswordProofParams
  ) {
    try {
      const data = await createPasswordProof(params)

      postWebViewMessage({
        data,
        type: Messages.GetPasswordProof,
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
    }
  },
  [])

  return {
    createAttestation,
    createPassword,
  }
}
