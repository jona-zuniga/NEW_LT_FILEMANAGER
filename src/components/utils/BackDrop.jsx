import {Ltlogo} from './LtLogo'
import {PulseLoader} from 'react-spinners'

export const LtBackdrop = ({show, onClick, children}) => {
	return show ? (
		<div
			className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black/50"
			onClick={onClick}>
			<Ltlogo></Ltlogo>
			<div className="flex w-full flex-col items-center justify-center opacity-100">
				{children}
			</div>
			<PulseLoader color="#2563eb" size={15} />
		</div>
	) : null
}
