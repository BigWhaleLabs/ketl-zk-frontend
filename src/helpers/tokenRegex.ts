export default function (token: string) {
  return /^[0-9]{60,80}$/gm.test(token)
}
