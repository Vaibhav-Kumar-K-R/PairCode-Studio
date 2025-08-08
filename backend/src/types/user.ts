enum USER_CONNECTION_STATUS {
	OFFLINE = "offline",
	ONLINE = "online",
}

interface User {
	username: string
	roomId: string
	socketId: string
	status: USER_CONNECTION_STATUS
	typing: boolean
	currentFile: string | null
	cursorPosition: number
}

export { USER_CONNECTION_STATUS, User }
