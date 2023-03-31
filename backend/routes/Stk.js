let express = require('express');
let app = express.Router();
let unirest = require('unirest');

let bodyParser = require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

let Stk = require('../models/StkModel');
let Product = require('../models/ProductsModel');
let Order = require('../models/OrdersModel');

function accessToken(req, res, next){

    bearer = Buffer.from(process.env.CONSUMER_KEY+":"+process.env.CONSUMER_SECRET).toString('base64');

    unirest('GET', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
      .headers({
        'Authorization': 'Basic '+bearer
      })
      .end(function (response) { 
        if (response.error) throw new Error(response.error); 
        let token = JSON.parse(response.raw_body).access_token;
        req.access_token = token;
       next();
      });
 }

function stk_push(req, res, amount, phone, transId){

    let token = "Bearer " + req.access_token;
    let unirest = require('unirest');

    let currentdate = new Date();
    const timestamp = currentdate.getFullYear() + "" + "" + ("0"+ (currentdate.getMonth()+1)).slice(-2) + "" + "" + ("0"+currentdate.getDate()).slice(-2) + "" + "" + ("0"+currentdate.getHours()).slice(-2) + "" + "" + ("0"+currentdate.getMinutes()).slice(-2)  + "" + "" + ("0"+currentdate.getSeconds()).slice(-2);
    
    const password = new Buffer.from(process.env.Short_Code + process.env.PASS_KEY + timestamp ).toString('base64');


   let request = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
    .headers({
        'Content-Type': 'application/json',
        'Authorization': token
    })
    .send(JSON.stringify({
        "BusinessShortCode": process.env.Short_Code,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": process.env.Short_Code,
        "PhoneNumber": phone,
        "CallBackURL": process.env.Callback_url,
        "AccountReference": transId,
        "TransactionDesc": "Payment of Goods at Eccom" 
    }))
    .end(response => {
        if (response.error) {console.log(response.error)};
        let result = JSON.parse(response.raw_body);
        console.log(request);
        res.json(result)
    });
};



app.post('/callback', urlEncoded, function(req,res){
    
        if(req.body.Body.stkCallback.ResultDesc === 'The service request is processed successfully.'){
            let result = { 
                TransactionId : req.body.Body.stkCallback.CallbackMetadata.Item[1].Value,
                PhoneNumber : req.body.Body.stkCallback.CallbackMetadata.Item[4].Value,
                Amount: req.body.Body.stkCallback.CallbackMetadata.Item[0].Value, 
                TransactionDate : req.body.Body.stkCallback.CallbackMetadata.Item[3].Value,
                status: 'pending'
                
            }
                Stk(result).save(function(err,data){
                        if(err) throw err;
                    })
        }else{
            res.json('not done')
        }
   

});

app.post('/stk_push', accessToken, urlEncoded,  function(req, res){
    stk_push(req, res, 1 ,req.body.phone, req.params.id); //initialize cost on production... 1 is for testing
})

app.get('/payment/:id', function(req, res){
    Stk.find({order_id: req.params.id}, function(err, data){
        res.json(data)
    })
})

function getTodayDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

app.post('/confirm_payment', urlEncoded, function(req, res){

    let today = getTodayDate();


    var someDate = new Date();
    var numberOfDaysToAdd = 2;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    let newDate = new Date(result);

    var ddd = String(newDate.getDate()).padStart(2, '0');
    var mmm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyyy = newDate.getFullYear();

    let deliveryDate = ddd + '/' + mmm + '/' + yyyyy;


    Stk.find({TransactionId: req.body.code}, function(err, data){
        if(data.length !== 0){

            if(data[0].status === 'confirmed'){
                    res.json('existing')
            }else if(data[0].status === 'pending'){
                Order.findByIdAndUpdate(req.body.data,{completion_status: 'completed', order_date: today, delivery_date: deliveryDate}, function(err3, date3){})
                Stk.findOneAndUpdate({TransactionId: req.body.code},{order_id: req.body.data, status: 'confirmed'}, {new: true},function(err1, data1){
                    res.json('confirmed')
                })
            }
        }else{
            res.json('pending')
        }
    })
})


module.exports = app;