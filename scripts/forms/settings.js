module.exports = {
    name: 'settings',
    handle: false,
    execute(payload) {
        const changes = payload['settingsChange'];

        if(changes.includes('add-employee-settings')) {
            console.log(payload);

            query(`INSERT INTO admins(first_name, last_name, password) VALUES ('${payload.fname}', '${payload.lname}', '${encrypt(payload.password)}')`);
        }
    },
};