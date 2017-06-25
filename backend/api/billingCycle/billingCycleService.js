const BillingCycle = require('./billingCycle');
const _ = require('lodash');

BillingCycle.methods(['get','post','put','delete']);
BillingCycle.updateOptions({new: true, runValidators: true});//return the new object after the update

BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext);

//function to override the objects passed when errors happen
function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle;
    if(bundle.errors){
        var errors = parseErrors(bundle.errors);
        res.status(500).json({errors});
    }else{
        //if there is no errors, go to the next
        next();
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = [];
    //iterate through the array of errors and get only the message, and then it pushes the message to the final array of errors
    _.forIn(nodeRestfulErrors, error => errors.push(error.message));
    return errors;
}

BillingCycle.route('count', function(req, res, next){
    //mongodb count method
    BillingCycle.count(function(error, value){
        //callback function 
        if(error){
            //in case of error
            res.status(500).json({errors: [error]});
        } else {
            //send result
            res.json({value});
        }
    })
});

module.exports = BillingCycle;
