import CreateProofParams from 'models/CreateProofParams'

export enum MessageType {
  CreateProof = 'CreateProof',
  Reset = 'Reset',
  Error = 'Error',
}

type Message = {
  type: MessageType
  params: CreateProofParams
}

export default Message
