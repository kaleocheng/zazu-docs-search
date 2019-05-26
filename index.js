const { exec } = require('child_process')

module.exports = (pluginContext) => {
    return (search, env = {}) => {
        return new Promise((resolve, reject) => {
            exec(`ag -i -l ${search} /Users/kaleocheng/WorkSpace/src/github.com/kaleocheng/blog/content`, (err, stdout, stderr) => {
                if (err) {
                    return
                }

                let results = stdout.split(/\r?\n/).map(fullpath => {
                    let s = fullpath.split('/')
                    let r = {}
                    r.fullpath = fullpath
                    r.name = s[s.length - 1]
                })
                resolve(results.map(r => {
                    return {
                        icon: 'fa-book',
                        title: r.name,
                        vaule: r.fullpath
                    }
                }))
            })
        })
    }
}
