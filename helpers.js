function convertArray(numString) {
    let result = [];

    for(let i = 0; i < numString.length; i++) {
        let convertNum = Number(numString[i]);

        if (Number.isNaN(convertNum)) {
            return new Error(`${numString[i]} is not a number`);
        }
        result.push(convertNum)
    }
    return result;
}

function findMean(nums){
    if(nums.length === 0) return 0;
    // reduce array to single value
    return nums.reduce(function(acctual, current){
        return acctual + current;
    }) / nums.length
}

function findMedian(nums){
    nums.sort((a, b) => a -b);

    let middle = Math.floor(nums.length / 2);
    let median;

    if(nums.length % 2 === 0){
        median = (nums[middle] + nums[middle-1]) /2;
    } else {
        median = nums[middle];
    }
    return median
}

function countFreq(arr){
    return arr.reduce(function(acctual, next) {
        acctual[next] = (acctual[next] || 0) + 1;
        return acctual;
    }, {});
}

function findMode(arr){
    let freqCounter = countFreq(arr);
    let count = 0;
    let mostFrequent;
    for(let key in freqCounter) {
        if(freqCounter[key] > count) {
            mostFrequent = key;
            count = freqCounter[key];
        }
    }
    // + makes it a number
    return +mostFrequent;
}

module.exports = {
    convertArray,
    findMean,
    findMedian, 
    findMode
};