import Message from 'models/Message'

export default function isMessage(data: object): data is Message {
  return 'type' in data
}
