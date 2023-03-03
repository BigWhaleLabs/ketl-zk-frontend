export default function (token: string) {
  return /^[0-9]{77}$/gm.test(token)
}
