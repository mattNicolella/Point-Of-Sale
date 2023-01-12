module.exports = {
    name: 'markComplete',
    handle: false,
    execute(payload, ...args) {
        console.log(args[0]);
        query('UPDATE orders SET status=2 WHERE idrec='+args[0]);
    },
};