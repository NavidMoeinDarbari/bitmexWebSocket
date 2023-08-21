let ws = new WebSocket('wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25');


let list = [];
ws.onmessage = (e) => {
    let data = JSON.parse(e.data);
    let priceData = data.data == null ? {} : data.data[0];
    if(data.data != null && priceData.price != null && priceData.symbol.indexOf('.') < 0){
        if(list.some(l => l.symbol === priceData.symbol)){
            document.getElementById(priceData.symbol).innerHTML = `${priceData.symbol} : ${priceData.price}`;
        }
        else {
            list.push(priceData);
            document.getElementById('price').append(`<div id="${priceData.symbol}">${priceData.symbol} : ${priceData.price}</div>`);
        }
    }
    
}