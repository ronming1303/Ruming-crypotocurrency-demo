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
ticker = '';
bid_ask_data = 0;
x_data = [];
y_data = [];
const guessSubmit = document.querySelector('.guessSubmit');
guessSubmit.addEventListener('click', function () {
    // alert("This is " + (document.querySelector('input').value) + "-USDT quote");
    document.querySelector('#huobi > caption > b').textContent = "Huobi Order Book of " + (document.querySelector('input').value);
    ticker = (document.querySelector('input').value);
    setInterval(function () {
        guessSubmit.click();
    }, 5000);
});

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
        bid_ask_data = huobi_bid_ask;
        x_data = [
            bid_ask_data['tick']['bids'][4][0],
            bid_ask_data['tick']['bids'][3][0],
            bid_ask_data['tick']['bids'][2][0],
            bid_ask_data['tick']['bids'][1][0],
            bid_ask_data['tick']['bids'][0][0],
            bid_ask_data['tick']['asks'][0][0],
            bid_ask_data['tick']['asks'][1][0],
            bid_ask_data['tick']['asks'][2][0],
            bid_ask_data['tick']['asks'][3][0],
            bid_ask_data['tick']['asks'][4][0],];
        y_data = [bid_ask_data['tick']['bids'][4][1],
            bid_ask_data['tick']['bids'][3][1],
            bid_ask_data['tick']['bids'][2][1],
            bid_ask_data['tick']['bids'][1][1],
            bid_ask_data['tick']['bids'][0][1],
            bid_ask_data['tick']['asks'][0][1],
            bid_ask_data['tick']['asks'][1][1],
            bid_ask_data['tick']['asks'][2][1],
            bid_ask_data['tick']['asks'][3][1],
            bid_ask_data['tick']['asks'][4][1]];
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
    };
});


guessSubmit.addEventListener('click', function () {
    var myChart = echarts.init(document.getElementById('plot'));
// 指定图表的配置项和数据
    var option = {
        title: {
            text: 'Trading Depth'
        },
        tooltip: {},
        legend: {
            data: ['Quantity']
        },
        xAxis: {
            data: x_data
        },
        yAxis: {},
        series: [{
            name: 'Quantity',
            type: 'bar',
            itemStyle: {
            normal: {
                // 随机显示
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

                // 定制显示（按顺序）
                color: function(params) {
                    var colorList = ['#64BD3D', '#64BD3D', '#64BD3D', '#64BD3D', '#64BD3D',
                    '#C33531', '#C33531', '#C33531', '#C33531', '#C33531'];
                    return colorList[params.dataIndex]
                }
            },
        },
            data: y_data
        }],


    };


// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});




