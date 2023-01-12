const { query } = require('../utils/functions');

module.exports = {
    name: 'cancelAll',
    handle: false,
    execute(sender, ...args) {
        //console.log(orderId, args);

        const orderId = args[0];
        query('DELETE FROM order_items WHERE idorder='+orderId, function(data) {
            sendOrderUpdate(orderId);
        });
    },
};