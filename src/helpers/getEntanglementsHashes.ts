import getKetlAttestationContract from 'helpers/getKetlAttestationContract'

export default async function getEntanglementsHashes(type: number) {
  const count = await getKetlAttestationContract().entanglementsCounts(type)

  const records = []
  for (let i = 0; i < count.toNumber(); i += 1) {
    const record = await getKetlAttestationContract().entanglements(type, i)
    records.push(record.toHexString())
    console.log('record', record.toString())
  }

  console.log('records', count.toNumber(), records)

  return records
}
