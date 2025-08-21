const fs = require('fs')

const read_file = (filename) => {
    return JSON.parse(fs.readFileSync(`./module/${filename}`, 'utf-8'))
}

const write_file = (filename, data) => {
    return fs.writeFileSync(`./module/${filename}`, JSON.stringify(data, null ,4))
}

module.exports = {
    read_file,
    write_file
}