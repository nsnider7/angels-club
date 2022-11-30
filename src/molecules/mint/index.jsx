import Button from "../../atoms/buttons";
import React, { useState, Component } from "react";
import { CONTRACT_ABI } from './contractABI'
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Dropdown } from "react-css-dropdown";
// import './polyfill.js';

import "./index.css";
import "react-css-dropdown/dist/index.css";

let mintingApp;
let contract;
let contractAddress;
let web3;
let provider;
const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad';

class Minting extends Component {
  constructor(props) {
    super(props)
    mintingApp = this;
    this.connectWallet = this.connectWallet.bind(this);
    mintingApp.state = {
      walletAddress:'Open Meta Mask',
      status: '',
      url: '',
      count: 0,
      amountMinted: 0,
      quantity: 0,
      submitError: "",
      transactionHash: null,
      NFT_STOCK: 0,
      title: "Sale is NOT Live",
      selectedAccount: ""
    }
    mintingApp.props = {
      options: [
        { name: "Oranges", value: "oranges" },
        { name: "Apples", value: "apples" },
        { name: "Pears", value: "pears" },
        { name: "Grapes", value: "grapes" }
      ],
      handleSelect: event => alert(`You chose ${event.target.value}`)
    };
    // if (mintingApp.connectWallet()) {
    //   mintingApp.web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    //   mintingApp.web3.eth.handleRevert = false;
    //   contract = new mintingApp.web3.eth.Contract(JSON.parse(JSON.stringify(CONTRACT_ABI)), contractAddress);
    //   mintingApp.getTotalSupply()
    //   mintingApp.setTitle();
    //   setInterval(mintingApp.getTotalSupply, 20000)
    // }
  }

  async setTitle() {
    const saleLive = await contract.methods.saleLive().call()
    if (saleLive) {
      mintingApp.setState({title: "Sale is LIVE"})
      return
    } else {
      mintingApp.setState({title: "Sale is NOT LIVE"})
      return
    }
  }

  async getTotalSupply() {
    const NFT_STOCK = parseInt(await contract.methods.NFT_STOCK().call())
    let totalSupply = parseInt(await contract.methods.totalSupply().call());
    mintingApp.setState({NFT_STOCK:NFT_STOCK})
    mintingApp.setState({amountMinted:totalSupply})
  }

  async connectWallet() {
    try {
      console.log("testing wallet")
      if (window.ethereum) {
      const providerOptions = {
          walletconnect: {
              package: WalletConnectProvider, // required
              options: {
                  infuraId: INFURA_ID, // required
              },
          },
          }
      let web3Modal = new Web3Modal({
          cacheProvider: false, 
          providerOptions, 
          disableInjectedProvider: false, 
      });
      provider = await web3Modal.connect()
      web3 = new Web3(provider)
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0])
      mintingApp.setState({selectedAccount: accounts[0]} )
      console.log(mintingApp.state.selectedAccount + ` ✔️`)
      return true
      
      } else{
      // document.getElementById("wallet").textContent = "" + ` ❌`
      return false
      }
  } catch(err) {
      console.log(err)
      // document.getElementById("wallet").textContent = "Please connect your wallet" + ` ❌`
      return false
  }
  }

  async setQuantity(e) {
    await mintingApp.setState({quantity: parseInt(e)})
  }

  async testMint(quantity, valueToSend, currentGasPriceWei) {
    let transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: mintingApp.selectedAccount, // must match user's active address.
        // gasPrice: 10000000000000, // 10000000000000
        value: valueToSend, 
      };
    try {
        let testCall = await contract.methods.mint(quantity).call(transactionParameters)
        return ""

    } catch (err) {
        let splitString = err.message.split(":");
        let reason = splitString[1].split("{")[0]
        return reason
    }
}

  async mintNFT(quantity) {
    try {
        let amountMinted = await contract.methods.addressMinted(mintingApp.selectedAccount).call()
        let currentGasPriceWei = await web3.eth.getGasPrice()
        let mintPrice = await contract.methods.NFT_PRICE().call()
        const saleLive = await contract.methods.saleLive().call()

        let transactionParameters = {}
        let valueToSend = 0;
        if (amountMinted > 0) {
            valueToSend = mintPrice * quantity;
        } else if(amountMinted == 0) {
            valueToSend = mintPrice * (quantity - 1);
        }
      let testCall = await mintingApp.testMint(quantity, valueToSend, currentGasPriceWei);
      if (saleLive && testCall === "") {

        transactionParameters = {
          to: contractAddress, // Required except during contract publications.
          from: mintingApp.selectedAccount, // must match user's active address.
          gasPrice: currentGasPriceWei, // 10000000000000
          value: valueToSend, 
          data: contract.methods.mint(quantity).encodeABI(),
        };
        
        await web3.eth.sendTransaction(transactionParameters, async function(err, transactionHash) {
            if (err) { 
                document.getElementById("buttonString").textContent = "Minted failed"; 
            } else {
                document.getElementById("buttonString").textContent = "Minted succesfully"; 
            }
        })
      } else {
        document.getElementById("buttonString").textContent = testCall; 
      }


    } catch (error) {
        document.getElementById("buttonString").textContent = `Minting failed.`
      if (error && error.message) {
        console.log(error.message)
        if (error.message == "MetaMask Tx Signature: User denied transaction signature.") {
            document.getElementById("buttonString").textContent = `Transaction Rejected`
        } else {
            document.getElementById("buttonString").textContent = `Minting failed.`
        }
      } else {
        document.getElementById("buttonString").textContent = `Minting failed.`
      }
    }
  }

  // render() {
  //   return (
  //     <div className="phantom-pals-hero">
  //       <h2>{mintingApp.state.title}</h2>
  //       <p className="walletAddress">Wallet Address:<br></br> {mintingApp.state.walletAddress}</p>
  //       <p className="quantityCount">NFT Limits:<br></br>5 per Transaction<br></br>25 per Wallet</p>
  //       <p className="quantityCount">{mintingApp.state.amountMinted}/{mintingApp.state.NFT_STOCK} Minted</p>
  //       <label htmlFor="quantity"><p className="quantityLabel">Quantity </p></label>
  //         <input type="number" name="quantity" id="quantity" onChange={(e) => mintingApp.setQuantity(e.target.value)} required />

  //         <Button type="mint" extraClasses="mint-button" click={() => mintingApp.mintNFT()}>
  //             Mint
  //         </Button>
  //         <p className="mintResponse">{mintingApp.state.submitError}</p>
  //     </div>
  //   );
  // }


  render() {
    return (
      <div id="how" className="about-container">
          {
            mintingApp.state.selectedAccount !== "" ?
            <Button
            extraClasses="button-cta button-icon"
            label="connect wallet"
            onclick={() => mintingApp.connectWallet()}
          /> :<>
          <h4 style={{"text-align": "center"}}>{mintingApp.state.selectedAccount + ` ✔️`}</h4>
          <div className='selector'>

    </div>
          <Button
            extraClasses="button-cta button-icon"
            label="mint"
            onclick={() => mintingApp.mintNft()}
          />
          </>
          }

      </div>
    );
    }
};

export default Minting;
