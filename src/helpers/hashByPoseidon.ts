import { buildPoseidon } from 'circomlibjs'

export default async function hashByPoseidon() {
  const poseidon = await buildPoseidon()

  return (values: string[]) => {
    const F = poseidon.F
    return F.toString(poseidon(values))
  }
}
