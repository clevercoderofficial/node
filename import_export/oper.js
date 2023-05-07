const add = (a,b) => {
    return a + b;
};

const sub = (a,b) => {
    return a - b;
}

const multi = (a,b) => {
    return a * b;
}

// for single variable
// module.exports = add 

// passing as object
// module.exports.add = add; 
// module.exports.sub = sub; 

module.exports = {add, sub, multi}