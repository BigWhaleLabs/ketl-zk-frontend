export default function tokenRegex(token: string) {
  return /^[0-9]{60,80}$/gm.test(token)
}
