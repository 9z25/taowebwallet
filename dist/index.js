var unspent;
var key;
var tao = new Tao().newTransaction();
var wallet =  new Wallet();

document.getElementById("send-tao").addEventListener("click", function() {
    if(document.getElementById("recipient").value !== "") {
        var utxid = document.getElementById("utxid").value
        var output = document.getElementById("output").value
        var amt = document.getElementById("amount").value

        amt = amt.replace(".","");
        while(amt.length < 9) {
            amt += 0
        }

        var coins = Number(amt)
        console.log("COINS:: " + amt)
/*
        var unspents = wallet.getUnspents();
        for (var i = 0; i < unspents.length; i++) {
            var utx = checkUnspent(unspents[i]);
            console.log(utx);
        }
*/
        var obj = Tao.getAddress();
        var addr = document.getElementById("recipient").value
        var tx = Tao.newTransaction();
        tx = Tao.addInput(tx, utxid, parseInt(output))
        tx = Tao.addOutput(tx, addr, coins)
        tx = Tao.signTx(tx, 0, key)
        var raw = {};
        raw.tx = tx.toHex()

        var response = axios({
            url: 'https://freshmintrecords.com:8001/api/sendrawtransaction/',
            method: 'post',
            data: raw,
        }).then(function (response) {
            console.log(response);
        }).then(function (err) {
            console.log(err);
        })
    }
});


$("#recieve").click(() => {
    $("#modal").modal();
    $("#modal-body").text(key.pub.getAddress().toString());
});
console.log("new-mnemonic")
$("#new-mnemonic").click(() => {
    
    var m = Tao.generateMnemonic();
    key = Tao.importMnemonic(m);
    $("#import-seed").val(m)
    var addr = key.pub.getAddress().toString();
    getBalance(addr)
    $("#modal").modal();
    $("#modal-body").html("Save your mnemonic!! <br/>" + m);
});

$("#submit-seed").click(() => {
    key = Tao.importMnemonic($("#import-seed").val());
    var addr = key.pub.getAddress().toString();
    getBalance(addr)
});