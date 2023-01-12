const {execSync} = require('child_process');

module.exports = {
    name: 'addToOrder',
    execute(payload, ...args) {
        //console.log('type:', args);
        //const output = execSync(`php ./php/${args.shift()}.php `+args.join(" ")).toString();
        output = "";
        console.log(args);

        if(args[1] == 0) {
            query('INSERT INTO orders () VALUES ()', function(data) {
                console.log(data);
                data.insertId;
                sendBackOrder(data.insertId);

                query('INSERT INTO order_items(idproduct, idorder) VALUES ('+args[0]+', '+data.insertId+')', function(data) {
                    sendOrderUpdate(data.insertId);
                });
            });
        } else
            query('INSERT INTO order_items(idproduct, idorder) VALUES ('+args[0]+', '+args[1]+')', function(data) {
                sendOrderUpdate(args[1]);
            });

        return output;
    },
};