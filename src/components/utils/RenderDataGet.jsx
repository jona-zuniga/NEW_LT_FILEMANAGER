import {useT} from '../providers/I81nProvider'
import {Button} from '../ui/button'
import Icons from './Icons'
import {JSONViewer} from './JSONViewer'
import {LtlogoFull} from './LtLogo'
import LtSyncLoader from './LtSyncLoader'

/**
 * Renders data obtained from a react query object.
 * @param {Object} props - The component props.
 * @param {Object} props.Get - The react query object.
 * @param {Function} props.children - The function that renders the data.
 * @param {Object} [props.filter=null] - The filter object.
 * @param {string} [props.className=""] - The class name for the component.
 * @param {number} [props.limit=undefined] - The limit of data to render.
 * @param {string} [props.msgNoData="No data yet"] - The message to display when there is no data.
 * @returns {JSX.Element} - The rendered component.
 */
function RenderDataGet({
	Get = {},
	children = ({e}) => (
		<div className="flex items-center space-x-2">
			<JSONViewer src={e}></JSONViewer>
			<span>{e.id}</span>
		</div>
	),
	filter = null,
	limit = undefined,
	msgNoDataParam = null,
	hidden = false,
	className = '',
}) {
	const data = Get?.data ?? []
	const isError = Get?.isError ?? false
	const isLoading = Get?.isLoading ?? false
	const isSuccess = Get?.isSuccess ?? data?.length > 0
	const refetch = typeof Get?.refetch === 'function' ? Get.refetch : () => {}

	const t = useT()

	const msgNoData = msgNoDataParam ?? t('no_data_yet')

	if (isError)
		return (
			<div className="mx-auto flex w-full flex-col items-center rounded-lg p-2 font-bold text-slate-900">
				<Icons.Misc.Warning className="h-12 w-12" />
				<label>{t('error')}</label>
				<Button onClick={refetch}>{t('try_again')}</Button>
			</div>
		)
	if (isLoading)
		return (
			<div className="flex w-full flex-col items-center justify-center">
				<LtSyncLoader></LtSyncLoader>
			</div>
		)

	if (data === null || data?.length === 0) {
		return (
			<div
				className="mx-auto flex flex-col items-center rounded-lg p-2 font-bold text-slate-900"
				hidden={hidden}>
				<Icons.Misc.NoData className="h-12 w-12" />
				<label className="text-lg font-bold">{msgNoData}</label>
				<div className="scale-50 opacity-20">
					<LtlogoFull></LtlogoFull>
				</div>
			</div>
		)
	}

	return (
		<div className={className}>
			{isSuccess &&
				typeof children === 'function' &&
				Get.data?.slice(0, limit)?.map((e, i) => children({e, i, filter}))}
		</div>
	)
}

export default RenderDataGet
