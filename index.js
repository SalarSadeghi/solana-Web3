const {
    Keypair,
    Connection,
    clusterApiUrl,
    getBalance,
    PublicKey,
    LAMPORTS_PER_SOL
} = {...solanaWeb3} 
const publickeyInp = document.getElementById("publickey")
const checkBalanceBtn = document.getElementById("check-balance-btn")
const airDropBtn = document.getElementById("airdrop-btn")
const balanceValue = document.getElementById("balance-value")
const accountAddress = document.getElementById("account-address")
const signatureEl = document.getElementById("signature")



const inputValidation = ()=> {
    
}

const getConnect = () => {
    return new Connection(clusterApiUrl(), "confirmed")
}

const getBalanceOf = async (event) => {
    try {
        event.preventDefault();
        checkBalanceBtn.disabled = true
        airDropBtn.disabled = true
        checkBalanceBtn.style.cursor = 'wait'
        const myAddress = new PublicKey(publickeyInp.value);
        accountAddress.innerHTML = `Account Address: \u2003 <strong>${myAddress}</strong>`
        const connection = getConnect();
        const balance = await connection.getBalance(myAddress);
        checkBalanceBtn.style.cursor = 'auto'
        checkBalanceBtn.disabled = false
        airDropBtn.disabled = false
        balanceValue.innerHTML = `Current Balance: \u2003 <strong>${balance/LAMPORTS_PER_SOL}</strong>`
    }
    catch (err) {
        alert(`${err.name}\n${err.message}`)
        checkBalanceBtn.disabled = false
        airDropBtn.disabled = false
    }
}

const getAirdrop = async (event) => {
    try {
        event.preventDefault();
        checkBalanceBtn.disabled = true;
        airDropBtn.disabled = true;
        airDropBtn.style.cursor = 'wait';
        const myAddress = new PublicKey(publickeyInp.value);
        const connection = getConnect();
        const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL*2);
        signatureEl.innerHTML = `Signature: \u2003 <strong><small>${signature}</small></strong>`
        await connection.confirmTransaction(signature);
        await getBalanceOf(event)
    }
    catch (err){
        alert(`${err.name}\n${err.message}`)
        checkBalanceBtn.disabled = false
        airDropBtn.disabled = false
    }
}

const getAccountInfoOf = async (event) => {
    try {}
    catch (err) {
        alert(`${err.name}\n${err.message}`)
    }

}