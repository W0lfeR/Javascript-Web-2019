const fs = require('fs');
const dataFile = 'storage.json';


let data = {};

// The purpose of the module is to store key-value pairs where the key is always a string. 
function validateKey(key) {
    if (typeof key !== 'string') {
        throw new Error('Key must be a string');
    }
}

function validateKeyExists(key) {
    return data.hasOwnProperty(key);
}

const put = (key, value) => {
    validateKey(key);
    if (validateKeyExists(key)) {
        throw new Error('Key already exists');
    }
    data[key] = value;
}

const get = (key) => {
    validateKey(key);
    if (!validateKey(key)) {
        throw new Error('Key not found');
    }

    return data[key];
}

const getAll = () => {
    if (Object.keys(data).length === 0) {
        throw new Error('The storage is empty!');
    } else {
        return data;
    }
}

const update = (key, value) => {
    validateKey(key);
    if (!validateKeyExists(key)) {
        throw new Error('Key not found');
    }
    // Otherwise you should update the key-value pair in memory
    data[key] = value
}

const deleteItem = (key) => {
    validateKey(key);
    if (!validateKeyExists(key)) {
        throw new Error('Key not found');
    }
    // Otherwise you should delete the key-value pair from the memory storage

    delete data[key];
}

const clear = () => {
    // The "clear" function should delete all saved key-value pairs in the storage.
    data = {};
}

const save = () => {
    fs.writeFileSync("storage.json", JSON.stringify(data), "utf-8")
}


const load = () => {
    if (fs.existsSync('storage.json')) {
        const date = fs.readFileSync('storage.json');
        data = JSON.parse(date)
    }
}

module.exports = {
    put: put,
    get: get, 
    getAll: getAll,
    update: update,
    deleteItem: deleteItem,
    clear: clear,
    save: save,
    load: load
}