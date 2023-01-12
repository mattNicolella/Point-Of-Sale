const {execSync} = require('child_process');

module.exports = {
    name: 'createOrder',
    handle: false,
    execute(payload, ...args) {
        //console.log('type:', args);
        //const output = execSync(`php ./php/${args.shift()}.php `+args.join(" ")).toString();
        console.log("Create Order");

        query('INSERT INTO orders () VALUES ()', function(data) {
            console.log(data);
            data.insertId;
            sendBackOrder(data.insertId);
        });
    },
};