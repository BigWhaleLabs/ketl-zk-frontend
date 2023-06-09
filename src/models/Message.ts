import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'

export enum MessageType {
  CreateProof = 'CreateProof',
  Reset = 'Reset',
  Error = 'Error',
  Status = 'Status',
}

type Message = {
  type: MessageType
  params: CreateProofParams
  signature?: Signature
}

export default Message
