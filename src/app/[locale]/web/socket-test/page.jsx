'use client'

import { useState } from 'react'

import { useUser } from '@/components/providers/UserProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import useSocketEvent from '@/hooks/useSocketEvent'

//* From implement sockets, you need to uncomment code in src/socket.js and src/app/providers.jsx

export default function Page() {
	const [messages, setMessages] = useState([])
	const [msgText, setMsgText] = useState('')
	const user = useUser()
	const { emit, isConnected, socket } = useSocketEvent('hello', (data) => {
		console.info('Hello', data)
		setMessages([...messages, data])
	})

	const handleSend = () => {
		emit({ name: user.name, msg: msgText })
		setMsgText('')
	}

	return (
		<div className="flex h-full w-full flex-col space-y-2 overflow-y-auto">
			<div>SOCKET TEST</div>
			{socket && (
				<>
					<Input
						placeholder="Type message..."
						value={msgText}
						onChange={(e) => setMsgText(e.target.value)}
					/>
					<Button disabled={!isConnected} onClick={handleSend}>
						{isConnected ? 'Emit' : 'Connecting...'}
					</Button>
					<div className="flex-1 overflow-y-auto rounded-md border border-gray-200 p-2">
						{messages.map((msg, index) => (
							<div key={index}>{JSON.stringify(msg)}</div>
						))}
					</div>
				</>
			)}
			{!socket && <div>Socket.io is not implemented</div>}
		</div>
	)
}
