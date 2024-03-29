import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import { FC, useCallback } from 'react'
import { useToasts } from 'react-toast-notifications'

type Prop = {
  addr?: string
}
const CopyAddress: FC<Prop> = ({ addr }) => {
  const { addToast } = useToasts()

  const onCopy = useCallback(() => {
    addToast('Copy successful', { appearance: 'success' })
  }, [addToast])

  const { address } = useParams<{ address: string; chainType: string }>()
  const showAddr = addr || address || ''
  return (
    <CopyToClipboard text={showAddr} onCopy={() => onCopy()}>
      <ClipboardDocumentIcon data-tooltip-id="tooltip" data-tooltip-content="Copy to clipboard" className=" h-4 w-4 cursor-pointer "></ClipboardDocumentIcon>
    </CopyToClipboard>
  )
}

export default CopyAddress
