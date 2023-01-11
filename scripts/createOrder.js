const {execSync} = require('child_process');

module.exports = {
    name: 'createOrder',
    execute(payload, ...args) {
        //console.log('type:', args);
        //const output = execSync(`php ./php/${args.shift()}.php `+args.join(" ")).toString();
        output = "";
        console.log("Create Order");

        query('INSERT INTO orders () VALUES ()', function(data) {
            console.log(data);
        });

        return output;
    },
};