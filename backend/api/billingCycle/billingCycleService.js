const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get','post','put','delete'])
BillingCycle.updateOptions({new: true, runValidators: true})//return the new object after the update

BillingCycle.route('count', function(req, res, next){
    //mongodb count method
    BillingCycle.count(function(error, value){
        //callback function in case of error
        if(error){
            res.status(500).json({errors: [error]})
        } else {
            res.json({valule})
        }
    })
})

module.exports = BillingCycle
