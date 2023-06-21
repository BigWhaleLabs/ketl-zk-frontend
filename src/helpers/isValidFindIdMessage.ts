import FindIdParams from 'models/FindIdParams'

export default function isValidFindIdMessage(
  params: object
): params is FindIdParams {
  return 'type' in params && 'email' in params
}
