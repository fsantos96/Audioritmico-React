//Codigo para comunicarse con la api
const request = require('request-promise');
const baseApi = "http://localhost:3500/";

export function setDeviceAlertsTimes(ackAlertTime, doneAlertTime) {
    var options = {
        method: 'POST',
        uri: baseApi + "device/setAlarms",
        body: {
            timeAck: ackAlertTime,
            timeCharge: doneAlertTime
        },
        json: true // Automatically stringifies the body to JSON
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

export function createNewManager(emailManager, managerid) {
    var options = {
        method: 'POST',
        uri: baseApi + "manager",
        body: {
            email: emailManager,
            id: managerid
        },
        json: true // Automatically stringifies the body to JSON
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

export function deleteManager(managerid) {
    var options = {
        method: 'DELETE',
        uri: baseApi + "manager?id=" + managerid,
        json: true // Automatically stringifies the body to JSON
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

export function getManagerList(managerId) {
    var param = managerId ? "?id=" + managerId : "";
    var options = {
        method: 'GET',
        uri: baseApi + "manager" + param,
        json: true // Automatically stringifies the body to JSON
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

// export function getDeviceData() {
//     return new Promise((resolve, reject) => {
//         sentRequest().then(data =>{
//             resolve(data);
//         }).catch(error => {
//             reject();
//         })
//     });
// }