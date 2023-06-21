import CreatePasswordProofParams from 'models/CreatePasswordProofParams'
import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'

export enum MessageType {
  CreateAttestationProof = 'CreateAttestationProof',
  CreatePasswordProof = 'CreatePasswordProof',
  ValidateParams = 'ValidateParams',
  FindAttestationType = 'FindAttestationType',
  Status = 'Status',
}

type Message = {
  type: MessageType
  params: CreateProofParams | CreatePasswordProofParams
  signature?: Signature
}

export default Message
