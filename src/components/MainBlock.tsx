import { BigNumber } from 'ethers'
import { BodyText, HeaderText } from 'components/Text'
import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'
import { Suspense } from 'preact/compat'
import { buildPoseidon } from 'circomlibjs'
import { randomBytes } from 'crypto-browserify'
import { test } from 'helpers/getMerkleTreeProof'
import UserCount from 'components/UserCount'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-2')
)
export default function () {
  return (
    <div className={container}>
      <HeaderText>Frontend Template</HeaderText>
      <Suspense fallback={<BodyText>Loading...</BodyText>}>
        <UserCount />
      </Suspense>
      <button
        onClick={async () => {
          console.log(await test(BigNumber.from(randomBytes(32)).toBigInt()))
        }}
      >
        hello
      </button>
    </div>
  )
}
