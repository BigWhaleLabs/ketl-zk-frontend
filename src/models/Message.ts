import CreatePasswordProofParams from 'models/CreatePasswordProofParams'
import CreateProofParams from 'models/CreateProofParams'
import FindIdParams from 'models/FindIdParams'
import Signature from 'models/Signature'
import ValidateProofParams from 'models/ValidateProofParams'

export enum MessageType {
  CreateAttestationProof = 'CreateAttestationProof',
  CreatePasswordProof = 'CreatePasswordProof',
  ValidateParams = 'ValidateParams',
  FindAttestationType = 'FindAttestationType',
  Status = 'Status',
}

type Message = {
  type: MessageType
  params:
    | CreateProofParams
    | CreatePasswordProofParams
    | ValidateProofParams
    | FindIdParams
  signature?: Signature
}

export default Message
