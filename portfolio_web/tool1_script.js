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
ticker = ''
const guessSubmit = document.querySelector('.guessSubmit');
guessSubmit.addEventListener('click', function () {
    // alert("This is " + (document.querySelector('input').value) + "-USDT quote");
    document.querySelector('#tool > h3').textContent = "Tool 1 Quote Book of " + (document.querySelector('input').value);
    ticker = (document.querySelector('input').value);
    setInterval(function () {
        guessSubmit.click();
    }, 5000);
});


//动态载入binance,huobi, okex的api数据
guessSubmit.addEventListener('click', function () {
        let huobi_requestURL = 'https://api.huobi.pro/market/depth?symbol=' + ticker.toLowerCase() + 'usdt&type=step2&depth=5';
        let huobi_request = new XMLHttpRequest();
        huobi_request.open('GET', huobi_requestURL);
        huobi_request.responseType = 'json';
        huobi_request.send();
        let latest_huobi_requestURL = 'https://api.huobi.pro/market/trade?symbol=' + ticker.toLowerCase() + 'usdt';
        let latest_huobi_request = new XMLHttpRequest();
        latest_huobi_request.open('GET', latest_huobi_requestURL);
        latest_huobi_request.responseType = 'json';
        latest_huobi_request.send();


        huobi_request.onload = function () {
            const huobi_bid_ask = huobi_request.response;

            const huobi_table = document.querySelector("#huobi");
            const huobi_rows = huobi_table.querySelectorAll("tr");
            for (i = 1; i < huobi_rows.length; i++) {
                if (i <= 5) {
                    huobi_rows[6 - i].querySelectorAll('td')[0].textContent = huobi_bid_ask['tick']['asks'][i - 1][1];
                    huobi_rows[6 - i].querySelectorAll('td')[0].style.color = 'red';
                    huobi_rows[6 - i].querySelectorAll('td')[1].textContent = huobi_bid_ask['tick']['asks'][i - 1][0];
                    huobi_rows[6 - i].querySelectorAll('td')[1].style.color = 'red';
                } else if (i === 6) {
                    huobi_rows[i].querySelectorAll('td')[0].style.color = 'blue';
                    huobi_rows[i].querySelectorAll('td')[1].style.color = 'blue';
                } else {
                    huobi_rows[i].querySelectorAll('td')[0].textContent = huobi_bid_ask['tick']['bids'][i - 7][1];
                    huobi_rows[i].querySelectorAll('td')[0].style.color = 'green';
                    huobi_rows[i].querySelectorAll('td')[1].textContent = huobi_bid_ask['tick']['bids'][i - 7][0];
                    huobi_rows[i].querySelectorAll('td')[1].style.color = 'green';
                }
            }
        };

        latest_huobi_request.onload = function () {
            const latest_huobi = latest_huobi_request.response;
            const huobi_table = document.querySelector("#huobi");
            const huobi_rows = huobi_table.querySelectorAll("tr");
            huobi_rows[6].querySelectorAll('td')[0].textContent = latest_huobi['tick']['data'][0]['amount'];
            huobi_rows[6].querySelectorAll('td')[1].textContent = latest_huobi['tick']['data'][0]['price'];
            document.querySelector("#spread_table > tbody > tr:nth-child(2) > td:nth-child(2)").textContent = latest_huobi['tick']['data'][0]['price'];
        };


        let binance_requestURL = 'https://api.binance.com/api/v3/depth?symbol=' + ticker.toUpperCase() + 'USDT&limit=5';
        let binance_request = new XMLHttpRequest();
        binance_request.open('GET', binance_requestURL);
        binance_request.responseType = 'json';
        binance_request.send();

        let latest_binance_requestURL = 'https://api.binance.com/api/v3/ticker/price?symbol=' + ticker.toUpperCase() + 'USDT';
        let latest_binance_request = new XMLHttpRequest();
        latest_binance_request.open('GET', latest_binance_requestURL);
        latest_binance_request.responseType = 'json';
        latest_binance_request.send();

        binance_request.onload = function () {
            const binance_bid_ask = binance_request.response;

            const binance_table = document.querySelector("#binance");
            const binance_rows = binance_table.querySelectorAll("tr");
            for (i = 1; i < binance_rows.length; i++) {
                if (i <= 5) {
                    binance_rows[6 - i].querySelectorAll('td')[0].textContent = binance_bid_ask['asks'][i - 1][1];
                    binance_rows[6 - i].querySelectorAll('td')[0].style.color = 'red';
                    binance_rows[6 - i].querySelectorAll('td')[1].textContent = binance_bid_ask['asks'][i - 1][0];
                    binance_rows[6 - i].querySelectorAll('td')[1].style.color = 'red';
                } else if (i === 6) {
                    binance_rows[i].querySelectorAll('td')[0].style.color = 'blue';
                    binance_rows[i].querySelectorAll('td')[1].style.color = 'blue';
                } else {
                    binance_rows[i].querySelectorAll('td')[0].textContent = binance_bid_ask['bids'][i - 7][1];
                    binance_rows[i].querySelectorAll('td')[0].style.color = 'green';
                    binance_rows[i].querySelectorAll('td')[1].textContent = binance_bid_ask['bids'][i - 7][0];
                    binance_rows[i].querySelectorAll('td')[1].style.color = 'green';
                }
            }
        }

        latest_binance_request.onload = function () {
            const latest_binance = latest_binance_request.response;

            const binance_table = document.querySelector("#binance");
            const binance_rows = binance_table.querySelectorAll("tr");

            binance_rows[6].querySelectorAll('td')[0].textContent = 0;
            binance_rows[6].querySelectorAll('td')[1].textContent = Number(latest_binance['price']);
            document.querySelector("#spread_table > tbody > tr:nth-child(3) > td:nth-child(2)").textContent = Number(latest_binance['price']);
        }


        document.querySelector("#spread_table > tbody > tr:nth-child(4) > td:nth-child(2)").textContent =
            document.querySelector("#spread_table > tbody > tr:nth-child(2) > td:nth-child(2)").textContent - document.querySelector("#spread_table > tbody > tr:nth-child(3) > td:nth-child(2)").textContent

        //  let okex_requestURL = 'https://www.okex.com/api/spot/v3/instruments/BTC-USDT/book?size=5&depth=0.2';
        // let okex_request = new XMLHttpRequest();
        // okex_request.open('GET', okex_requestURL);
        // okex_request.responseType = 'json';
        // okex_request.send();

        // okex_request.onload = function () {
        //     const okex_bid_ask = okex_request.response;
        //
        //     const okex_table = document.querySelector("#okex");
        //     const okex_rows = okex_table.querySelectorAll("tr");
        //     for (i = 1; i < binance_rows.length; i++) {
        //         if (i <= 5) {
        //             okex_rows[6-i].querySelectorAll('td')[0].textContent = okex_bid_ask['asks'][i - 1][1];
        //             okex_rows[6-i].querySelectorAll('td')[0].style.color = 'red';
        //             okex_rows[6-i].querySelectorAll('td')[1].textContent = okex_bid_ask['asks'][i - 1][0];
        //             okex_rows[6-i].querySelectorAll('td')[1].style.color = 'red';
        //         } else if (i===6) {
        //             okex_rows[i].querySelectorAll('td')[1].style.color = 'grey';
        //         }
        //         else {
        //             okex_rows[i].querySelectorAll('td')[0].textContent = okex_bid_ask['bids'][i - 6][1];
        //             okex_rows[i].querySelectorAll('td')[0].style.color = 'green';
        //             okex_rows[i].querySelectorAll('td')[1].textContent = okex_bid_ask['bids'][i - 6][0];
        //             okex_rows[i].querySelectorAll('td')[1].style.color = 'green';
        //         }
        //     }
        //
        //
        // }


    }
)

//画图





