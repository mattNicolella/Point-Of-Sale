const fs = require('fs');

const formManager = {};
const forms = fs.readdirSync('./scripts/forms').filter(file => file.endsWith('.js'));
for (const func of forms) {
    const item = require(`./forms/${func}`);
    formManager[item.name] = (...args) => item.execute(...args);
}

module.exports = {
    name: 'formSubmit',
    handle: true,
    execute(sender, form, ...args) {
        //console.log(orderId, args);
        //console.log('form submit');
        //console.log
        formManager[form](...args);
    },
};