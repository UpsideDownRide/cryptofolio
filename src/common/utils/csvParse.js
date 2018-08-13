import papa from 'papaparse'

const csvParse = (file) => {
    return new Promise((complete, error) => papa.parse(file, {complete, error, skipEmptyLines: true}))
}

export default csvParse
