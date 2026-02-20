import {SyncLoader} from 'react-spinners'

import {useT} from '@/components/providers/I81nProvider'
import {Ltlogo} from '@/components/utils/LtLogo'

export const loaderColor = '#305199'

const LtSyncLoader = ({msg = 'loading'}) => {
	const t = useT()

	return (
		<div
			className="flex h-full select-none flex-col items-center justify-center overflow-hidden"
			suppressHydrationWarning>
			<Ltlogo></Ltlogo>
			<div suppressHydrationWarning>
				<SyncLoader color={loaderColor} />
			</div>
			<span suppressHydrationWarning>{t(msg)}</span>
		</div>
	)
}

export default LtSyncLoader
