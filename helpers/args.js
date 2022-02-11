

const getArgs = (args) => {
	const result = {}
	const [executor, file, ...rest] = args

	rest.forEach((el, idx, array) => {
		if (el.charAt(0) === '-') {
			const elWithoutDash = el.slice(1)
			const afterElement = array[idx + 1]

			if (idx === array.length - 1) {
				result[elWithoutDash] = true
			} else if (afterElement.charAt(0) !== '-') {
				result[elWithoutDash] = afterElement
			} else {
				result[elWithoutDash] = true
			}
		}
	})

	return result
}

export { getArgs }