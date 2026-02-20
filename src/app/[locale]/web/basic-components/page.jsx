'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCounter } from '@uidotdev/usehooks'
import { MoreHorizontal } from 'lucide-react'
import moment from 'moment'

import { useFocusContext } from '@/components/providers/FocusProviderManager'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
	Dialog,
	DialogCloseButton,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LtBackdrop } from '@/components/utils/BackDrop'
import { Combobox } from '@/components/utils/Combobox'
import CounterManager from '@/components/utils/Counter'
import DatePickerWithRange from '@/components/utils/DateRangePicker'
import DialogBasic from '@/components/utils/DialogBasic'
import LtImageViewer from '@/components/utils/ImageViewer'
import { Ltlogo, LtlogoFull } from '@/components/utils/LtLogo'
import LtSyncLoader from '@/components/utils/LtSyncLoader'
import { initLoading, notifyLoaded } from '@/components/utils/Notifications'
import { PopoverBasic } from '@/components/utils/PopOverBasic'
import { TooltipBasic } from '@/components/utils/TooltipBasic'

import { queryKeys } from '@/constants/queryKeys'
import { ERR400, ERR409, ERR500, OK200 } from '@/constants/responses'

import { downloadFile } from '@/helpers/utils/downloadFile'

import { useCombobox } from '@/hooks/useCombobox'
import { useDateRangePicker, useDateRangePickerSingle } from '@/hooks/useDateRangePicker'
import { useDialog } from '@/hooks/useDialog'

import { __example } from '@/services/ex.service'

const ExampleComboboxDataAnimals = [
	{
		id: 1,
		name: 'Dog',
		desc: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
	},
	{
		id: 2,
		name: 'Cat',
		desc: 'A cat is a small, typically furry, carnivorous mammal. Known for its independent and playful nature, it is the only domesticated species in the family Felidae.',
	},
	{
		id: 3,
		name: 'Cow',
		desc: 'Cows are domesticated mammals in the wild. They are most commonly kept as livestock, but can also be bred and milked.',
	},
]

export default function page() {
	/** Dialog sets*/
	const openSet = useDialog()
	const openSetLoading = useDialog()
	const openSetEvent = useDialog()
	const openSetUsingBasic = useDialog()
	const openSetUsingBasicIsLoading = useDialog()

	/** Combobox sets */
	const comboboxSet = useCombobox()
	const comboboxSetCleareable = useCombobox(ExampleComboboxDataAnimals[0])
	const comboboxSetAsync = useCombobox()
	const comboboxSetFocus = useCombobox()
	const { registerFocusElem, setFocus } = useFocusContext()

	const queryClient = useQueryClient()
	const QExample = useQuery({
		queryFn: __example.get.all,
		queryKey: [queryKeys.example],
	})

	/** Range Date picker sets */
	const dateRangeSet = useDateRangePicker()
	const dateRangeSetSingle = useDateRangePickerSingle()
	const dateRangeSetCleareble = useDateRangePicker({
		from: moment().format('YYYY-MM-DD'),
		to: moment().add(7, 'days').format('YYYY-MM-DD'),
	})

	/** Counter Manager set */
	const counterSet = useCounter(0, {
		min: 0,
		max: 10000000,
	})

	/** Backdrop */
	const backdropSet = useDialog()

	/** PDF */
	const pdfOpen = useDialog()

	return (
		<div className="flex h-full w-full flex-col space-y-5 overflow-y-auto">
			{/** Logos */}
			<Badge>Logos</Badge>
			<div className="flex space-x-2">
				<LtlogoFull></LtlogoFull>
				<Ltlogo></Ltlogo>
			</div>

			{/** Badges */}
			<Badge>Badges</Badge>
			<div className="flex space-x-2">
				<Badge>Default</Badge>
				<Badge variant="confirm">Success</Badge>
				<Badge variant="destructive">Detructive</Badge>
				<Badge variant="danger">Danger</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="outline">Outline</Badge>
				<Badge variant="ghost">Ghost</Badge>
			</div>

			{/** Buttons */}
			<Badge>Buttons</Badge>
			<div className="flex flex-col space-y-2">
				<div className="flex space-x-2">
					<Button>Default</Button>
					<Button variant="confirm">Confirm</Button>
					<Button variant="destructive">Delete</Button>
					<Button variant="danger">Danger</Button>
					<Button variant="info">Confirm</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
					<a href="#" className={buttonVariants({ variant: 'link' })}>
						Anchor with fn buttonvariant
					</a>
				</div>
				<div className="flex space-x-2">
					<Button variant="ghost-primary">Ghost Primary</Button>
					<Button variant="ghost-default">Ghost Default</Button>
					<Button variant="ghost-danger">Ghost Danger</Button>
					<Button variant="ghost-confirm">Ghost Confirm</Button>
					<Button variant="ghost-destructive">Ghost Destructive</Button>
				</div>
			</div>

			{/** Inputs */}
			<Badge>Inputs</Badge>
			<div className="flex space-x-2">
				<Input placeholder="Placeholder" value="Value" onChange={() => { }}></Input>
				<Textarea
					placeholder="Placeholder"
					onChange={() => { }}
					value={`Cillum Lorem fugiat aute occaecat deserunt occaecat occaecat occaecat labore cillum proident cillum. Laboris occaecat anim excepteur tempor. Enim excepteur labore minim aliquip enim nulla nulla est excepteur non in enim. Officia commodo labore consequat amet dolore incididunt minim enim. Ad officia minim cillum aliqua ea do sit. Eu elit aute eiusmod minim quis sint id et cupidatat anim consequat.`}
					rows={5}></Textarea>
			</div>

			{/** Comboboxes */}
			<Badge>Comobobox with dynamic search</Badge>
			<div className="flex w-full space-x-2">
				<div className="w-full">
					<Badge variant="secondary">Comobobox Basic</Badge>
					<Combobox
						id={'id'}
						label={'name'}
						Get={{
							data: ExampleComboboxDataAnimals,
						}}></Combobox>
				</div>
				<div className="w-full">
					<Badge variant="secondary">Comobobox trigger loading</Badge>
					<Combobox
						id={'id'}
						label={'name'}
						Get={{
							data: ExampleComboboxDataAnimals,
							isLoading: true,
						}}></Combobox>
				</div>
				<div className="w-full">
					<Badge variant="secondary">Comobobox trigger error</Badge>
					<Combobox
						id={'id'}
						label={'name'}
						Get={{
							data: ExampleComboboxDataAnimals,
							isError: true,
						}}></Combobox>
				</div>
				<div className="w-full">
					<Badge variant="secondary">Combobox using set</Badge>
					<Combobox
						comboboxSet={comboboxSet}
						id={'id'}
						label={'name'}
						Get={{
							data: ExampleComboboxDataAnimals,
						}}></Combobox>
				</div>
				<div className="w-full space-y-2">
					<div className="w-full">
						<Badge variant="secondary">Combobox cleareable</Badge>
						<Combobox
							comboboxSet={comboboxSetCleareable}
							id={'id'}
							label={'name'}
							Get={{
								data: ExampleComboboxDataAnimals,
							}}
							cleareable></Combobox>
					</div>

					<Button
						onClick={() => {
							comboboxSetCleareable.clear()
						}}
						variant="danger">
						x External clear
					</Button>
				</div>
				<div className="w-full space-y-2">
					<div className="w-full">
						<Badge variant="secondary">Combobox Async</Badge>
						<Combobox
							comboboxSet={comboboxSetAsync}
							id={'code'}
							label={'animal'}
							Get={QExample}
							cleareable></Combobox>
					</div>

					<Button
						onClick={() => queryClient.resetQueries([queryKeys.example])}
						variant="danger">
						Reset state
					</Button>
				</div>
				<div className="w-full space-y-2">
					<div className="w-full">
						<Badge variant="secondary">Combobox focus</Badge>
						<Combobox
							comboboxSet={comboboxSetFocus}
							triggerRef={registerFocusElem('comboboxFocusRef')}
							id={'code'}
							label={'animal'}
							Get={QExample}
							//* Next focus is true by default if is false, the combobox next focus is self before change option
							// isNextFocus={true}
							cleareable></Combobox>
					</div>

					<Button onClick={() => setFocus('comboboxFocusRef')} variant="danger">
						Focus
					</Button>
				</div>
			</div>

			{/** Dialogs */}
			<Badge>Dialogs</Badge>
			<div className="flex justify-center space-x-2">
				<Button onClick={() => openSet.on()}>Dialog Open</Button>
				<Dialog openSet={openSet} onOpen={() => console.info('onOpen')}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>TITLE</DialogTitle>
							<DialogDescription>Description</DialogDescription>
						</DialogHeader>
						<div>Content</div>
						<DialogFooter className="justify-center sm:justify-start">
							<DialogCloseButton></DialogCloseButton>
							<Button variant="confirm" onClick={() => openSet.off()}>
								Action
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Button onClick={() => openSetLoading.on()}>Dialog Loading trigger</Button>
				<Dialog
					openSet={openSetLoading}
					onOpen={() => {
						setTimeout(() => {
							openSetLoading.off()
						}, 3000)
					}}>
					<DialogContent isLoading={true}>
						<DialogHeader>
							<DialogTitle>TITLE</DialogTitle>
							<DialogDescription>Description using trigger loading</DialogDescription>
						</DialogHeader>
						<div>Content</div>
						<DialogFooter className="justify-center sm:justify-start">
							<DialogCloseButton></DialogCloseButton>
							<Button variant="confirm" onClick={() => openSetLoading.off()}>
								Action
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Button onClick={() => openSetEvent.on()}>Dialog using events</Button>
				<Dialog
					openSet={openSetEvent}
					onOpen={() => {
						alert('onOpen')
					}}
					onClose={() => {
						alert('onClose')
					}}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>TITLE</DialogTitle>
							<DialogDescription>Description using events</DialogDescription>
						</DialogHeader>
						<div>Content</div>
						<DialogFooter className="justify-center sm:justify-start">
							<DialogCloseButton></DialogCloseButton>
							<Button variant="confirm" onClick={() => openSetLoading.off()}>
								Action
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Button onClick={() => openSetUsingBasic.on()}>Dialog using basic</Button>
				<DialogBasic
					openSet={openSetUsingBasic}
					onOpen={() => {
						alert('onOpen')
					}}
					onClose={() => {
						alert('onClose')
					}}
					actionText={'Action'}
					title={'TITLE'}
					showActions={true}
					showCancelButton={true}>
					<div>Content</div>
				</DialogBasic>

				<Button onClick={() => openSetUsingBasicIsLoading.on()}>
					Dialog using basic isLoading
				</Button>
				<DialogBasic
					openSet={openSetUsingBasicIsLoading}
					onOpen={() => {
						setTimeout(() => {
							openSetUsingBasicIsLoading.off()
						}, 3000)
					}}
					actionText={'Action'}
					title={'TITLE'}
					showActions={true}
					showCancelButton={true}
					isLoading={true}>
					<div>Content</div>
				</DialogBasic>
			</div>

			{/** Dropdown menu */}
			<Badge>Dropdown menu</Badge>
			<div className="flex space-x-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" className="h-8 w-8 p-0">
							<span className="sr-only">{'open_menu'}</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>{'actions'}</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								alert(
									JSON.stringify(
										{
											Hola: 'Chau',
										},
										null,
										2,
									),
								)
							}}>
							{'show'}
						</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<span>Invite users</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem>
										<span>Email</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<span>Message</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<span>More...</span>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/** Tooltips */}
			<Badge>Tooltips</Badge>
			<div className="flex space-x-2">
				<TooltipBasic content={'Hello World'}>
					<Button>Hover for show tooltip</Button>
				</TooltipBasic>
			</div>

			{/** Popover */}
			<Badge>Popover</Badge>
			<div className="flex space-x-2">
				<PopoverBasic
					content={
						<div>
							<div>Hello World</div>
							<Input value={'Hello World'} onChange={() => { }}></Input>
						</div>
					}>
					<Button>Hover for show popover</Button>
				</PopoverBasic>
				{/* If you use lengthTrigger follow the trigger length*/}
				<PopoverBasic
					content={
						<div>
							<div>Hello World</div>
							<Input value={'Hello World'} onChange={() => { }}></Input>
						</div>
					}
					lengthTrigger>
					<Button>Hover for show popove with dynamic length</Button>
				</PopoverBasic>
			</div>

			{/** Calendar */}
			<Badge>Date range selector</Badge>
			<div className="flex w-full space-x-2">
				<div className="w-full">
					<Badge variant="secondary">Date range basic</Badge>
					<DatePickerWithRange dateState={dateRangeSet} />
				</div>
				<div className="w-full">
					<Badge variant="secondary">Single selection</Badge>
					{/* Note: use autoClose for close when select neccessary dates */}
					<DatePickerWithRange dateState={dateRangeSetSingle} single autoClose />
				</div>
				<div className="w-full space-y-2">
					<div className="w-full">
						<Badge variant="secondary">Date range basic</Badge>
						<DatePickerWithRange dateState={dateRangeSetCleareble} cleareable />
					</div>
					<Button onClick={() => dateRangeSetCleareble.clear()} variant="danger">
						External Clear
					</Button>
				</div>
			</div>

			{/** Counter manager */}
			<Badge>Counter manager</Badge>
			<div className="flex w-1/3 space-x-2">
				<CounterManager counterSet={counterSet}></CounterManager>
			</div>

			{/** Notifications display */}
			<Badge>Notifications display</Badge>
			<div className="flex w-full space-x-2">
				<Button
					variant="confirm"
					onClick={() => {
						notifyLoaded(null, OK200.status, 'OK')
					}}>
					OK
				</Button>
				<Button
					variant="danger"
					onClick={() => {
						notifyLoaded(null, ERR400.status, 'BAD REQUEST')
					}}>
					BAD REQUEST
				</Button>
				<Button
					variant="destructive"
					onClick={() => {
						notifyLoaded(null, ERR500.status, 'ERROR')
					}}>
					ERROR
				</Button>
				<Button
					variant="info"
					onClick={() => {
						notifyLoaded(null, ERR409.status, 'INFO')
					}}>
					INFO
				</Button>
				<Button
					variant="outline"
					onClick={() => {
						const id = initLoading()

						setTimeout(() => {
							notifyLoaded(id, ERR409.status, 'ENDING LOAD')
						}, 2000)
					}}>
					TRIGGER LOAD & MODIFY NOTIFICATION BY ID
				</Button>
			</div>

			{/** Sync Loader */}
			<Badge>Sync Loader</Badge>
			<div className="flex">
				<LtSyncLoader msg="loading_custom_msg"></LtSyncLoader>
			</div>

			{/** Backdrop */}
			<Badge>Backdrop</Badge>
			<div className="flex w-[300px] space-x-2">
				<LtBackdrop show={backdropSet.show}></LtBackdrop>
				<Button
					variant="confirm"
					onClick={() => {
						backdropSet.on()

						setTimeout(() => {
							backdropSet.off()
						}, 2000)
					}}>
					Open Backdrop
				</Button>
			</div>

			{/* Image Preview */}
			<Badge>Image Preview</Badge>
			<div className="flex flex-col space-x-2">
				<span>Click to image for see the full-image preview</span>
				<LtImageViewer src="/img/lt-logo-full.png">
					<img src={'/img/lt-logo-full.png'} alt="LT Logo" />
				</LtImageViewer>
			</div>

			{/* PDF */}
			<Badge>PDF generation</Badge>
			<div className="flex space-x-2">
				<Button variant="ghost-confirm" onClick={() => downloadFile('/api/example_pdf')}>
					Download PDF
				</Button>
				<Button variant="ghost-confirm" onClick={() => pdfOpen.on()}>
					Show
				</Button>
			</div>
			<Dialog openSet={pdfOpen} onOpen={() => console.info('onOpen')}>
				<DialogContent className="flex h-screen min-w-full flex-col">
					<DialogHeader>
						<DialogTitle>PDF</DialogTitle>
					</DialogHeader>
					<div className="h-[calc(100vh-150px)] w-full sm:h-[calc(100vh-120px)]">
						<iframe className="h-full w-full" src="/api/example_pdf"></iframe>
					</div>
					<DialogFooter className="justify-center sm:justify-start">
						<DialogCloseButton></DialogCloseButton>
						<Button variant="confirm" onClick={() => pdfOpen.off()}>
							Action
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<div className="flex h-[300px] w-full"></div>
		</div>
	)
}
