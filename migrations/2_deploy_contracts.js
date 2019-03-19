web3.eth.getTransactionReceiptMined=function(txnHash,interval){var transactionReceiptAsync;interval=interval?interval:500;transactionReceiptAsync=function(txnHash,resolve,reject
){web3.eth.getTransactionReceipt(txnHash,(error,receipt)=>{if(error){reject(error);}else{if(receipt==null){setTimeout(function(){transactionReceiptAsync(txnHash,resolve,reject
);},interval);}else{resolve(receipt);}}});};if(Array.isArray(txnHash)){var promises=[];txnHash.forEach(function(oneTxHash){promises.push(web3.eth.getTransactionReceiptMined(
oneTxHash,interval));});return Promise.all(promises);}else{return new Promise(function(resolve,reject){transactionReceiptAsync(txnHash,resolve,reject);});}};

execFunction = function(func, obj, args) {
  var result;
  if(typeof args === "undefined")
    args = [];
  else if(typeof args != "object")
    args = [args];
  return func.call(...args, obj).then((res)=>{
    result=res; 
    return func.sendTransaction(...args, obj);
  }).then((tx)=>{
    return web3.eth.getTransactionReceiptMined(tx);
  }).then(receipt=>result);
};

var cr, hub;

module.exports = function(deployer) {
	deployer.deploy(Hub).then(_=> {
		hub = Hub.deployed();
  		return deployer.deploy(Creator);
  	}).then(_=>{
  		cr = Creator.deployed();
  		return execFunction(hub.registerCreator, {from: web3.eth.accounts[0]}, cr.address);
  	}).then(_=>{ 		
  		return execFunction(hub.createContract, {from: web3.eth.accounts[0]});
  	}).then(_=>{
  		return execFunction(hub.getContractAddress, {from: web3.eth.accounts[0]});
  	}).then((add)=>{
  		console.log("contract address=" + add);
  		return execFunction(hub.getContractValue, {from: web3.eth.accounts[0]});
  	}).then((val)=>{
  		console.log("contract value=" + val);
  	}).then(_=>{ 		
  		return execFunction(hub.createContract, {from: web3.eth.accounts[0]});
  	}).then(_=>{
  		return execFunction(hub.getContractAddress, {from: web3.eth.accounts[0]});
  	}).then((add)=>{
  		console.log("new contract address=" + add);
  		return execFunction(hub.getContractValue, {from: web3.eth.accounts[0]});
  	}).then((val)=>{
  		console.log("new contract value=" + val);
  		return;
  	});
};
