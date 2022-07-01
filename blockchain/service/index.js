console.clear()
require("dotenv").config();

const { 
    Client,
    AccountId,
    PrivateKey,
    FileCreateTransaction,
    Hbar,
    ContractCreateTransaction,
    ContractFunctionParameters,
 } = require("@hashgraph/sdk");

const fs = require("fs");

const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const client = Client.forTestnet().setOperator(myAccountId, myPrivateKey);

async function main() {
    const contractByteCode = fs.readFileSync("../build/cryptInsta_sol_Cryptinsta.bin");
    
    const fileCreateTx = new FileCreateTransaction()
    .setContents(contractByteCode)
    .setKeys([myPrivateKey])
    .setMaxTransactionFee(new Hbar(0.25))
    .freezeWith(client)

    const fileCreateSign = await fileCreateTx.sign(myPrivateKey);
    const fileCreateSubmit = await fileCreateSign.execute(client);
    const fileCreateRx = await fileCreateSubmit.getReceipt(client);
    const bytecodeFileId = fileCreateRx.fileId;
    console.log(`The bytecode file ID is:- ${bytecodeFileId}`);

    // Smart Contract on Hedera

    const contractInstantiateTx = new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId)
    .setGas(100000000)
    const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
    const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
    const contractID = await contractInstantiateRx.contractId;
    const contractAddress = contractID.toSolidityAddress();
    console.log(`HEDERA::: The smart contract ID is: ${contractID}`);
    console.log(
    `HEDERA::: Smart contract ID in Solidity format: ${contractAddress}`);

}
main()
.then(() => {
    console.log("Script executed successfully at: ", new Date().toISOString());
    process.exit(0);
  })
  .catch((err) => {
    console.log("Script executed with errors!");
    console.error(err);
    process.exit(1);
  });

