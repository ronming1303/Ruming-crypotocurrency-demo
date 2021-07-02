//刷新时间的函数
function refresh() {
    const bjt = document.querySelector("#beijingtime");
    const lat = document.querySelector("#latime");
    // const nyt = document.querySelector("#nytime");
    lat.textContent = "Los Angeles time is: " + new Date();
    setTimeout(refresh, 1000);
}

refresh();

//当鼠标移动到列表时高亮显示
function highlight(e) {
    e.style.backgroundColor = 'grey';
}

function cancel_hightlight(e) {
    e.style.backgroundColor = 'white';
}

const lbls = document.querySelectorAll('a');
for (let i = 0; i < lbls.length; i++) {
    lbls[i].addEventListener('mouseover', function () {
        highlight(lbls[i]);
    })
    lbls[i].addEventListener('mouseout', function () {
        cancel_hightlight(lbls[i]);
    })
}

//输入你想要的ticker
let ticker1 = '';
const confirm1 = document.querySelector('#confirm1');
confirm1.addEventListener('click', function () {
    // alert("This is " + (document.querySelector('#tick_input1').value) + "-USDT quote");
    ticker1 = (document.querySelector('#tick_input1 > input').value);
    document.querySelector('#tick_input1 > table > caption').textContent = 'Last Price of ' + ticker1;
    // let tick_list = new Array();
    tick_list = ticker1.split(",");

    for (i = 0; i < tick_list.length; i++) {

        setTimeout(1000);
        let latest_huobi_requestURL = 'https://api.huobi.pro/market/trade?symbol=' + tick_list[i].toLowerCase() + 'usdt';
        let latest_huobi_request = new XMLHttpRequest();
        latest_huobi_request.open('GET', latest_huobi_requestURL);
        latest_huobi_request.responseType = 'json';
        latest_huobi_request.send();

        let latest_binance_requestURL = 'https://api.binance.com/api/v3/ticker/price?symbol=' + tick_list[i].toUpperCase() + 'USDT';
        let latest_binance_request = new XMLHttpRequest();
        latest_binance_request.open('GET', latest_binance_requestURL);
        latest_binance_request.responseType = 'json';
        latest_binance_request.send();

        latest_huobi_request.onload = function () {
            let latest_huobi = latest_huobi_request.response;
            document.querySelector('#tick_input1 > table > tbody > tr:nth-child(' + String(i) + ') > th:nth-child(3)').style.color = 'green';
            document.querySelector('#tick_input1 > table > tbody > tr:nth-child(' + String(i) + ') > th:nth-child(3)').textContent = latest_huobi['tick']['data'][0]['price'];
        };



        latest_binance_request.onload = function () {
            let latest_binance = latest_binance_request.response;

            document.querySelector('#tick_input1 > table > tbody > tr:nth-child(' + String(i) + ') > th:nth-child(5)').textContent = Number(latest_binance['price']);
            document.querySelector('#tick_input1 > table > tbody > tr:nth-child(' + String(i) + ') > th:nth-child(5)').style.color = 'green';
        };

        document.querySelector('#tick_input1 > table > tbody > tr:nth-child(' + String(i + 1) + ') > th:nth-child(1)').textContent = tick_list[i];
        document.querySelector('#tick_input1 > table > tbody > tr:nth-child(' + String(i + 1) + ') > th:nth-child(1)').style.color = 'green';


        // setInterval(function () {
        //     confirm1.click();
        // }, 5000);
    }
});

