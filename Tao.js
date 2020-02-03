var tao = require('taojs-lib');
var bip32 = require('bip32');
var bip39 = require('bip39');
var i = 0;

var taoWallet = {
    node: "",
}

var generateMnemonic = () => {
    var m = bip39.generateMnemonic();
    return m;
}

var importMnemonic = (m) => {
    var s = bip39.mnemonicToSeedSync(m);
    taoWallet.node = bip32.fromSeed(s);
    var wallet = taoWallet.node.derive(i);
    var key = tao.ECKey.fromWIF(wallet.toWIF());   
    return key;
}


var getAddress = () => {
    var wallet = taoWallet.node.derive(i);
    var key = tao.ECKey.fromWIF(wallet.toWIF());   
    return key;
}

var nextAddress = () => {
    i++;
    var wallet = taoWallet.node.derive(i);
    var key = tao.ECKey.fromWIF(wallet.toWIF());   
    return key;
}


    

var newTransaction = () => {
    var tx = new tao.Transaction();
    return tx;
}

var addInput = (tx, txid, idx) => {
    tx.addInput(txid, idx);
    return tx;
}

var addOutput = (tx, addr, amt) => {
    tx.addOutput(addr, amt);
    return tx;
}

var signTx = (tx, input, key) => {
    tx.sign(input, key);
    return tx;
}


var Tao = {
    generateMnemonic: this.generateMnemonic,
    importMnemonic: this.importMnemonic,
    getAddress: this.getAddress,
    nextAddress: this.nextAddress,
    newTransaction: this.newTransaction,
    addInput: this.addInput,
    addOutput: this.addOutput,
    signTx: this.signTx
}
console.log("Test")
module.exports = Tao;