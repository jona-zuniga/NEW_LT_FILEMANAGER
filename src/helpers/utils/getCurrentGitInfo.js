import fs from 'fs'
import { simpleGit } from 'simple-git'

const git = simpleGit()

export async function getAppVersion() {
	try {
		const tags = await git.tags()

		const latestTag = tags.latest

		const log = await git.log()
		const latestCommit = log.latest
		const commitId = latestCommit.hash.slice(0, 8) // Obtener los primeros 8 caracteres del ID del commit
		let version = commitId

		if (!latestTag) {
			version = commitId
		}

		const isTag = latestCommit.refs.includes(`tag: ${latestTag}`)

		if (isTag) {
			version = latestTag
		} else {
			if (latestTag) {
				version = `${latestTag}-${version}`
			} else {
				version = `${version}`
			}
		}

		// updatePackageVersion(version);
		return version
	} catch (error) {
		return 'unknown'
	}
}

export const updatePackageVersion = (version) => {
	try {
		const packageJson = fs.readFileSync('./package.json', 'utf8')
		const json = JSON.parse(packageJson)

		if (json.version != version) {
			json.version = version
			const newPackageJson = JSON.stringify(json, null, '\t')
			fs.writeFileSync('./package.json', newPackageJson)
		}
	} catch (error) {
		console.error(error)
	}
}
