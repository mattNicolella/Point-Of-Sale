const {execSync} = require('child_process');

module.exports = {
    name: 'getInfo',
    execute(payload, ...args) {
        //console.log('type:', args);
        const output = execSync(`php ./php/${args.shift()}.php `+args.join(" ")).toString();
        console.log(output);

        return output;
    },
};