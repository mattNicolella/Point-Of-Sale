const { query } = require('../utils/functions');

module.exports = {
    name: 'sendToMake',
    handle: false,
    execute(sender, ...args) {
        //console.log(orderId, args);

        const orderId = args[0];
        query('UPDATE orders SET status=1 WHERE idrec='+orderId, function(data) {
            sendOrderUpdate(orderId);
        });
    },
};