/**
 * Get base64 from file object
 * @param {*} file File Object 
 * @returns 
 */
export const getBase64File = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		if (!(file instanceof Blob)) {
			console.error('Isnot a instance of blob')
			return resolve(null)
		}
		reader.readAsDataURL(file)

		reader.onload = () => {
			resolve(reader.result)
		}

		reader.onerror = (error) => {
			console.error('Error: ', error)
			reject(error)
		}
	})
}
