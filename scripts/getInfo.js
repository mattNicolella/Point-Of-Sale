const {execSync} = require('child_process');

module.exports = {
    name: 'getInfo',
    execute(payload, ...args) {
        const output = execSync(`php ./php/${args.shift()}.php `+args.join(" ")).toString();
        return output;
    },
};