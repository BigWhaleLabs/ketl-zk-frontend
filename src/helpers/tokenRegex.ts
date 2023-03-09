export default function (token: string) {
  return /^[0-9]{76,78}$/gm.test(token)
}
