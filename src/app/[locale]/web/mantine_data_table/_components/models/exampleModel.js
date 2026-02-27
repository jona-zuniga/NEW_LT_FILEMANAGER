import Icons from '@/components/utils/Icons'

 
function ActionsCell({row}) {
	return (
		<div className="flex gap-2">
			<button className="w-max rounded-md bg-blue-600 p-2 text-white">
				<Icons.Options.Edit />
			</button>
			<button className="w-max rounded-md bg-red-600 p-2 text-white">
				<Icons.Options.Delete />
			</button>
		</div>
	)
}

const exampleModel = [
	{
		accessor: 'actions',
		title: 'actions',
		width: '0%',
		textAlign: 'left',
		render: (row) => <ActionsCell row={row} />,
	},
	{
		accessor: 'code',
		title: 'code',
		width: '0%',
		textAlign: 'left',
	},
	{
		accessor: 'animal',
		title: 'animal',
	},
]

export default exampleModel
