// app
const app = require('./src/express');

// get config details from env
const {app_host: host, app_port: port} = require('./src/config/env');

// listen on port
app.listen(port, host, () => {
    console.log("App sever started on " + port);
});

// // server setup
// const cluster = require("cluster");
// const os = require("os");
// const cpuCount = os.cpus().length;

// if(cluster.isPrimary || cluster.isMaster){
//     for (let i = 0; i < cpuCount; i++) {
//         cluster.fork();
//     }
    
//     cluster.on('exit', (worker, code, signal) => {
//         cluster.fork();
//     })
// }
// else {

//     // listen on port
//     app.listen(port, host, () => {
//         console.log("App sever started on " + port);
//     });
// }