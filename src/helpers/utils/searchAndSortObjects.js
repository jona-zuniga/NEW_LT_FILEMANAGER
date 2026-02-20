/**
 * Function for search and sort list of object
 * @param {*} list list of object
 * @param {*} searchString string to search
 * @param {*} properties properties to search ins each object
 * @returns 
 */
export function searchAndSortObjects(list = [], searchString, properties) {
	let matches = [];
	const preSearchArray = searchString.split('%').filter((item) => item !== '');
	const searchArray = preSearchArray.length > 0 ? preSearchArray : [searchString];

	// Search for matches in specified properties and store the index
	list.forEach((object) => {
		let previousMatch = false;
		properties.forEach((property) => {
			let value = object[property]?.toLowerCase();
			if (value !== undefined) {
				let positionExt = null;

				const searchMatcher = searchArray
					.map((search) => {
						let position = value.indexOf(search?.toLowerCase());
						if (position !== -1) {
							if (searchArray.length == 1) positionExt = position;
							return true;
						}

						return false;
					})
					.reduce((acc, isMatch) => {
						return isMatch ? acc + 1 : acc;
					}, 0);

				if (searchMatcher != 0 && previousMatch == false) {
					matches.push({object: object, index: positionExt, matchesCount: searchMatcher});
                    previousMatch = true;
				}

			}
		});
	});

	// Sort matches by index
	if (searchArray.length == 1) {
		matches.sort((a, b) => a.index - b.index);
	} else {
		matches.sort((a, b) => b.matchesCount - a.matchesCount);
	}

	// Get only the sorted objects
	let sortedResult = matches.map((item) => item.object);

	return sortedResult;
}
