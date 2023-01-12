const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, ...data) => {
            // whitelist channels
            let validChannels = ["loadPages", "test1", "createOrder", 'updateOrder', 'cancelAll', 'sendToMake','sendForPayment', 'markComplete'];
            if (validChannels.includes(channel)) {
                //console.log(data);
                ipcRenderer.send(channel, ...data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["sendPages", "loadComplete", "orderId", "orderUpdate"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        call: (channel, ...data) => {
            let validChannels = ["getInfo", "addToOrder"];
            if (validChannels.includes(channel)) {
                //console.log(data);
                const output = ipcRenderer.invoke(channel, ...data);

                //console.log(output);

                return output;
            }
        }
    }
);

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
});
