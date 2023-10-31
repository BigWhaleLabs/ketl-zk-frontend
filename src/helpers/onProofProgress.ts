import Messages from 'models/Messages'
import ProofResultStatus from 'models/ProofResultStatus'
import getProofProgress from 'helpers/getProofProgress'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default function onProofProgress(id: string) {
  return (info: string) => {
    postWebViewMessage({
      data: {
        info,
        percent: getProofProgress(info),
        status: ProofResultStatus.ProofGeneration,
      },
      id,
      type: Messages.GetProofStatus,
    })
  }
}
