// import {Separator} from '../../ui/separator'
// import {Toggle} from '../../ui/toggle'
// import {TooltipBasic} from '../TooltipBasic'
// import './style.css'
// import TipTapHeading from '@tiptap/extension-heading'
// import TiTapImage from '@tiptap/extension-image'
// import TipTapLink from '@tiptap/extension-link'
// import TipTapTextAlign from '@tiptap/extension-text-align'
// import TipTapUnderline from '@tiptap/extension-underline'
// import {EditorContent, FloatingMenu, useEditor} from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import {
// 	AlignCenter,
// 	AlignJustify,
// 	AlignLeft,
// 	AlignRight,
// 	Bold,
// 	Heading,
// 	Image,
// 	Italic,
// 	Link,
// 	List,
// 	ListOrdered,
// 	Strikethrough,
// 	Underline,
// } from 'lucide-react'
// import {useCallback} from 'react'

// import {getBase64File} from '@/helpers/utils/getBase64'

// import {cn} from '@/lib/utils'

// const headingLevels = [1, 2, 3]

// const extensions = [
// 	TipTapLink.configure({
// 		openOnClick: true,
// 		autolink: true,
// 		defaultProtocol: 'https',
// 		HTMLAttributes: {
// 			class: 'underline underline-offset-2 text-blue-500 cursor-pointer',
// 		},
// 	}),
// 	TipTapUnderline,
// 	StarterKit.configure({
// 		orderedList: {
// 			HTMLAttributes: {
// 				class: 'list-decimal pl-4',
// 			},
// 		},
// 		bulletList: {
// 			HTMLAttributes: {
// 				class: 'list-disc pl-4',
// 			},
// 		},
// 	}),
// 	TiTapImage.configure({
// 		allowBase64: true,
// 		HTMLAttributes: {
// 			class: 'rounded-md block my-6 max-w-full h-[500px] outline-hidden focus:ring-1 focus:ring-blue-500',
// 		},
// 	}),
// 	TipTapHeading.configure({
// 		levels: headingLevels,
// 	}),
// 	TipTapTextAlign.configure({
// 		types: ['heading', 'paragraph'],
// 	}),
// ]

// export default function TextEditor({value, onChange, floatingMenu = false}) {
// 	const editor = useEditor({
// 		editorProps: {
// 			attributes: {
// 				class: 'w-full h-full min-h-[400px] bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
// 			},
// 		},
// 		extensions,
// 		content: value, // Set the initial content with the provided value
// 		onUpdate: ({editor}) => {
// 			onChange(editor.getHTML()) // Call the onChange callback with the updated HTML content
// 		},
// 	})

// 	return (
// 		<div className="flex h-full w-full flex-col gap-2 overflow-y-auto">
// 			{editor ? <TextEditorToolBar editor={editor} /> : null}
// 			<div className="h-full w-full flex-1 overflow-y-auto rounded-md border">
// 				{editor && floatingMenu && (
// 					<FloatingMenu editor={editor} tippyOptions={{duration: 100}}>
// 						<TextEditorToolBar editor={editor} floating />
// 					</FloatingMenu>
// 				)}
// 				<EditorContent editor={editor} />
// 			</div>
// 		</div>
// 	)
// }

// const TextEditorToolBar = ({editor, floating = false}) => {
// 	const setLink = useCallback(() => {
// 		const previousUrl = editor.getAttributes('link').href
// 		const url = window.prompt('URL', previousUrl)

// 		if (url === null) {
// 			return
// 		}

// 		if (url === '') {
// 			editor.chain().focus().extendMarkRange('link').unsetLink().run()

// 			return
// 		}

// 		editor.chain().focus().extendMarkRange('link').setLink({href: url}).run()
// 	}, [editor])

// 	const addImage = useCallback(() => {
// 		// Crear un input de tipo file
// 		const input = document.createElement('input')
// 		input.type = 'file'
// 		input.accept = 'image/*'

// 		input.onchange = async () => {
// 			const file = input.files[0]

// 			if (!file) {
// 				return
// 			}

// 			const urlBase64 = await getBase64File(file)

// 			editor.chain().focus().setImage({src: urlBase64}).run()
// 		}

// 		input.click()
// 	}, [editor])

// 	if (!editor) {
// 		return null
// 	}

// 	return (
// 		<div
// 			className={cn(
// 				'flex flex-row items-center gap-1 rounded-md rounded-tr-md border bg-white p-1',
// 				{
// 					'w-fit border-gray-500 shadow-md': floating,
// 				},
// 			)}>
// 			{headingLevels.map((level) => (
// 				<Toggle
// 					key={level}
// 					size="sm"
// 					pressed={editor.isActive(`heading`, {level})}
// 					onPressedChange={() => editor.chain().focus().toggleHeading({level}).run()}>
// 					<Heading size={level} className="h-3 w-3" /> {level}
// 				</Toggle>
// 			))}
// 			<Separator orientation="vertical" className="h-8 w-px" />
// 			<TooltipBasic>
// 				<Toggle
// 					size="sm"
// 					pressed={editor.isActive({textAlign: 'left'})}
// 					onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}>
// 					<AlignLeft className="h-4 w-4" />
// 				</Toggle>
// 			</TooltipBasic>
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive({textAlign: 'center'})}
// 				onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}>
// 				<AlignCenter className="h-4 w-4" />
// 			</Toggle>
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive({textAlign: 'right'})}
// 				onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}>
// 				<AlignRight className="h-4 w-4" />
// 			</Toggle>
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive({textAlign: 'justify'})}
// 				onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()}>
// 				<AlignJustify className="h-4 w-4" />
// 			</Toggle>
// 			<Separator orientation="vertical" className="h-8 w-px" />
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive('bold')}
// 				onPressedChange={() => editor.chain().focus().toggleBold().run()}>
// 				<Bold className="h-4 w-4" />
// 			</Toggle>
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive('italic')}
// 				onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
// 				<Italic className="h-4 w-4" />
// 			</Toggle>
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive('underline')}
// 				onPressedChange={() => editor.chain().focus().toggleUnderline().run()}>
// 				<Underline className="h-4 w-4" />
// 			</Toggle>
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive('strike')}
// 				onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
// 				<Strikethrough className="h-4 w-4" />
// 			</Toggle>
// 			<Separator orientation="vertical" className="h-8 w-px" />
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive('bulletList')}
// 				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
// 				<List className="h-4 w-4" />
// 			</Toggle>
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive('orderedList')}
// 				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
// 				<ListOrdered className="h-4 w-4" />
// 			</Toggle>
// 			<Separator orientation="vertical" className="h-8 w-px" />
// 			<Toggle
// 				size="sm"
// 				pressed={editor.isActive('link')}
// 				onPressedChange={() => {
// 					editor.isActive('link') ? editor.chain().focus().unsetLink().run() : setLink()
// 				}}>
// 				<Link className="h-4 w-4" />
// 			</Toggle>
// 			<Toggle size="sm" pressed={false} onClick={addImage}>
// 				<Image className="h-4 w-4" />
// 			</Toggle>
// 		</div>
// 	)
// }

export default function TextEditor({value, onChange, floatingMenu = false}) {
	return <div>{JSON.stringify({value, onChange, floatingMenu})}</div>
}
