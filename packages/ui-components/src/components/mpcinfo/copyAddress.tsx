
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ClipboardDocumentIcon} from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import { FC, useCallback } from 'react'
import { useToasts } from 'react-toast-notifications'

const CopyAddress:FC = () => {
    const { addToast } = useToasts()
    
    const onCopy = useCallback(() => {
        addToast('Copy successful', { appearance: 'success' })
      }, [addToast])

    const { address } = useParams<{ address: string; chainType: string }>()

    return (
        <CopyToClipboard text={address ? address : ''} onCopy={() => onCopy()}>
            <ClipboardDocumentIcon className=" h-4 w-4 "></ClipboardDocumentIcon>
          </CopyToClipboard>
    );
};

export default CopyAddress;