//Codigo para comunicarse con la api
const request = require('request-promise');
const baseApi = "http://localhost:3500/";

export function getAllConfigurations() {
    var options = {
        method: 'GET',
        uri: baseApi + "getConfigurations",
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

export function deleteConfiguration(id) {
    var options = {
        method: 'DELETE',
        uri: baseApi + "deleteConfiguration?id=" + id,
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

export function saveConfig(color, rangeType, range) {
    var options = {
        method: 'POST',
        uri: baseApi + "saveConfiguration",
        json: true, // Automatically stringifies the body to JSON
        body: {
            color: color,
            rangeType: rangeType,
            range: range
        },
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

export function editConfig(body) {
    var options = {
        method: 'PUT',
        uri: baseApi + "updateConfigurations",
        json: true, // Automatically stringifies the body to JSON
        body: body,
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

// export function createNewManager(emailManager, managerid) {
//     var options = {
//         method: 'POST',
//         uri: baseApi + "manager",
//         body: {
//             email: emailManager,
//             id: managerid
//         },
//         json: true // Automatically stringifies the body to JSON
//     };

//     return new Promise((resolve, reject) => {
//         request(options).then(data =>{
//             resolve(data);
//         }).catch(error => {
//             reject();
//         })
//     });
// }

// export function deleteManager(managerid) {
//     var options = {
//         method: 'DELETE',
//         uri: baseApi + "manager?id=" + managerid,
//         json: true // Automatically stringifies the body to JSON
//     };

//     return new Promise((resolve, reject) => {
//         request(options).then(data =>{
//             resolve(data);
//         }).catch(error => {
//             reject();
//         })
//     });
// }
