const {execSync} = require('child_process');

module.exports = {
    name: 'addToOrder',
    execute(payload, ...args) {
        //console.log('type:', args);
        //const output = execSync(`php ./php/${args.shift()}.php `+args.join(" ")).toString();
        output = "";
        console.log(output);

        query('SELECT 1', function(data) {
            console.log(data);
        });

        return output;
    },
};