const BASE_URL = 'http://dev.getezpay.com:3010';
const postData = (data, site_url) => {
    let url = `${BASE_URL}/api/ezpayPaymentTransactions/openEdgeWebhooks?redirectUrl=${site_url}`;
    return fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json());
}

const paymentStatus = () => {
    let transactionId = '';
    let paymentSuccessUrl = '';
    let paymentFailureUrl = '';
    let site_url = '';
    let paymentUrl = window.location.search;
    let paymentUrlList = paymentUrl.split('?');
    paymentUrlList = paymentUrlList[1].split('&');
    if (paymentUrl.includes('response_code=1')) {
        transactionId = paymentUrlList[0];
        paymentSuccessUrl = paymentUrlList[1];
        let dataObj = {
            "transactionId": transactionId,
            "paymentStatus": true
        };
        alert('Payment successful.');
        site_url = `${paymentSuccessUrl}?success=true`;
        postData(dataObj, site_url).then(data => {
            window.location.href = site_url;
        }).catch(error => {
            console.log("successsError", error);
        });
    }
    else {
        transactionId = paymentUrlList[0];
        paymentFailureUrl = paymentUrlList[2];
        let dataObj = {
            "transactionId": transactionId,
            "paymentStatus": false
        };
        alert('Payment Failed.');
        postData(dataObj, paymentFailureUrl).then(data => {
            window.location.href = paymentFailureUrl;
        }).catch(error => {
            console.log("FailureError", error);
        });
    }
}
paymentStatus();