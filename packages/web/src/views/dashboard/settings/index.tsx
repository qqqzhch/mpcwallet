import { FC } from 'react'
import SetTab from '@monorepo/ui-components/src/components/setting/setTab'

const Settings: FC = () => {
  return (
    <div className="p-4 ">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Settings</h2>
      </div>
      <SetTab></SetTab>
    </div>
  )
}

export default Settings
