const { rejects } = require('assert');
const { resolve } = require('path');
const https = require('https');
const crypto = require('crypto');

const handleCreatePayment = async (data) => {
    let partnerCode = "MOMO";
    let accessKey = "F8BBA842ECF85";
    let secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    let requestId = partnerCode + new Date().getTime();
    let orderInfo = "Thanh toán bằng Momo";
    let ipnUrl = "http:localhost:4200";
    let redirectUrl = "http:localhost:4200/checkout-result"
    let requestType = "captureWallet"
    let extraData = "";
    let lang = "vi";
    let amount = data.totalPrice;
    let orderId = data._id + '-' + new Date().getTime();

    let rawSignature =
        "accessKey=" + accessKey +
        "&amount=" + amount +
        "&extraData=" + extraData +
        "&ipnUrl=" + ipnUrl +
        "&orderId=" + orderId +
        "&orderInfo=" + orderInfo +
        "&partnerCode=" + partnerCode +
        "&redirectUrl=" + redirectUrl +
        "&requestId=" + requestId +
        "&requestType=" + requestType

    let signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: lang
    });

    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }


    let payUrl = '';
    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            res.setEncoding('utf8');
            res.on('data', (body) => {
                payUrl += JSON.parse(body).payUrl;
                console.log(body);
            });
            res.on('end', () => {
                resolve({
                    payUrl
                });
            });

            res.on('error', () => {
                reject({
                    payUrl: null
                })
            });

        })
        req.write(requestBody);
        req.end();
    })
}

module.exports = {
    handleCreatePayment
}