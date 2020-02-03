function getBalance(addr){
    var response = axios({
        url: 'https://freshmintrecords.com:8001/api/getunspents/' + addr,
        method: 'get',
    }).then(function(response) {
        var con = loadBalance(response.data);
        if (con == false) return;
    }).then(function (err) {
        console.log(err);
    })
}
function loadBalance(data){
    var dec = window.atob(data);
    var info = JSON.parse(dec);
    var balance = info.balance;
    //if (info.balance == 0) return false;

    var num = wallet.updateBalance(balance);
    if(!num) num = 0;
    document.getElementById("balance").textContent = num + " TAO";
    if(num > 0) $("#import-seed").css("background-color","#c5e0b4");
    unspents = info.last_txs;
    /*
    for (var i = 0; i < unspents.length; i++) {
        if(unspents[i].type == "vout") {
            wallet.addUnspent(unspents[i].addresses);
        }
    }
*/
    
    return true;
}

function getOutputs(res){
    var data = JSON.parse(res)
    return data
}

function loadTransaction(rawTx){
    var raw = {}
    raw.tx = rawTx
    axios({
            url: "https://freshmintrecords.com:8001/api/decoderawtransaction/",
            method: 'post',
            data: raw
        }).then(function (response) {
            getOutputs(response.data);
        }).then(function (err) {
            console.log(err);
        })
}

function checkUnspent(txid) {
    axios({
        url: "https://freshmintrecords.com:8001/api/gettxdata/" + txid,
        method: 'get',
    }).then(function (response) {
        loadTransaction(response.data);
    }).then(function (err) {
        console.log(err);
    })
}