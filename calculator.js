const express = require('express');
const app = express();
const CalculatorError = require('./errorHandler');

const { convertArray, findMean, findMedian, findMode} = require('./helpers');

app.get('/mean', function(req, res, next){
        if(!req.query.nums) {
            throw new CalculatorError('please pass a list of numbers', 400)
        }
        // split string into an array 
        let numString = req.query.nums.split(',');
        let nums = convertArray(numString);
        if (nums instanceof Error) {
            throw new CalculatorError(nums.msg);
        }
        let result = {
            operation: "mean",
            result: findMean(nums)
        }
        return res.send(result);
});

app.get('/median', function(req, res, next){
    if (!req.query.nums) {
        throw new CalculatorError('please pass a list of numbers', 400)
    }
    let numString = req.query.nums.split(',');
    let nums = convertArray(numString);
    if (nums instanceof Error) {
        throw new CalculatorError(nums.msg)
    }
    let result = {
        operation: "median",
        result: findMedian(nums)
    }
    return res.send(result);
});

app.get('/mode', function(req, res, next){
    if(!req.query.nums) {
        throw new CalculatorError('please pass a list of numbers', 400)
    }
    let numString = req.query.nums.split(',');
    let nums = convertArray(numString)
    if (nums instanceof Error) {
        throw new CalculatorError(nums.msg)
    }
    let result = {
        operation: "mode",
        result: findMode(nums)
    }
    return res.send(result);
});

app.use(function(req, res, next) {
    const err = new CalculatorError('page not found', 404);
    return next(err);
})

app.use(function(err, req, res, next) {
    // the default status is 500 internal server error
	let status = err.status || 500;
	let msg = err.msg || 'not a number';

    // set the status and alert the user
	return res.status(status).json({
		error: {msg, status}
	});
});

app.listen(3000, () => {
    console.log('server running on port 3000')
});