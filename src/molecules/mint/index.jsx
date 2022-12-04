import Button from "../../atoms/buttons";
import React, { useState, Component } from "react";
import { CONTRACT_ABI } from './contractABI'
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import "./index.css";
import "react-css-dropdown/dist/index.css";

let mintingApp;
let contract;
let contractAddress = "0x4DbeE7709053aa4126Ac13EA1A2A6CD49e4797D7";
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
      amountMinted: 0,
      quantity: 0,
      submitError: "",
      transactionHash: null,
      NFT_STOCK: 0,
      title: "Sale is NOT Live",
      selectedAccount: ""
    }
  }

  async setTitle() {
    const saleLive = await contract.methods.saleLive().call()
    const presaleLive = await contract.methods.presaleLive().call()
    if (saleLive) {
      mintingApp.setState({title: "Sale is LIVE"})
      return
    } else if (presaleLive) {
      mintingApp.setState({title: "Presale is LIVE"})
      return
    } else {
      mintingApp.setState({title: "Sale is NOT LIVE"})
      return
    }
  }

  async getTotalSupply() {
    const NFT_STOCK = parseInt(await contract.methods.NFT_MAX().call())
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
      if (accounts[0]) {
        mintingApp.web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
        mintingApp.web3.eth.handleRevert = false;
        contract = new mintingApp.web3.eth.Contract(JSON.parse(JSON.stringify(CONTRACT_ABI)), contractAddress);
        mintingApp.getTotalSupply()
        mintingApp.setTitle();
        setInterval(mintingApp.getTotalSupply, 20000)
      }
      return true
      
      } else{
        mintingApp.setState({selectedAccount: "Please connect your wallet" + ` ❌`} )
        return false
      }
  } catch(err) {
      console.log(err)
      mintingApp.setState({selectedAccount: "Please connect your wallet" + ` ❌`} )
      return false
  }
  }

  async setQuantity(e) {
    await mintingApp.setState({quantity: parseInt(e)})
  }

  async testMint(quantity, valueToSend, currentGasPriceWei) {
    let transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: mintingApp.state.selectedAccount, // must match user's active address.
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



  async mint(quantity) {
    try {
      console.log(quantity)
      if (!quantity || typeof quantity !== 'number' || quantity < 0) {
          mintingApp.setState({submitError: "Please type a valid quantity"})
          return
      }
      // let amountMinted = await contract.methods.addressMinted(mintingApp.state.selectedAccount).call()
      let currentGasPriceWei = await web3.eth.getGasPrice()
      let mintPrice = await contract.methods.NFT_PRICE().call()
      const saleLive = await contract.methods.saleLive().call()
      const presaleLive = await contract.methods.presaleLive().call()


      let transactionParameters = {}
      let valueToSend = mintPrice * quantity;
      let testCall = await mintingApp.testMint(quantity, valueToSend, currentGasPriceWei);
      if ((presaleLive || saleLive) && testCall === "") {
        transactionParameters = {
          to: contractAddress, // Required except during contract publications.
          from: mintingApp.state.selectedAccount, // must match user's active address.
          gasPrice: currentGasPriceWei, // 10000000000000
          value: valueToSend, 
          data: contract.methods.mint(quantity).encodeABI(),
        };
        
        await web3.eth.sendTransaction(transactionParameters, async function(err, transactionHash) {
            if (err) { 
              mintingApp.setState({submitError : "Minted failed"})
            } else {
              mintingApp.setState({submitError : "Minted succesfully"})
            }
        })
      } else {
        mintingApp.setState({submitError : testCall})
      }


    } catch (error) {
      mintingApp.setState({submitError : "Mint Failed"})

      if (error && error.message) {
        console.log(error.message)
        if (error.message == "MetaMask Tx Signature: User denied transaction signature.") {
          mintingApp.setState({submitError : `Transaction Rejected`})
        } else {
          mintingApp.setState({submitError : "Mint Failed"})
        }
      } else {
        mintingApp.setState({submitError : `Minting failed.`})
      }
    }
  }
  async testWhitelistMint(quantity, valueToSend, currentGasPriceWei) {
    let transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: mintingApp.state.selectedAccount, // must match user's active address.
        // gasPrice: 10000000000000, // 10000000000000
        value: valueToSend, 
      };
    try {
        let testCall = await contract.methods.whitelistMint(quantity).call(transactionParameters)
        return ""
  
    } catch (err) {
        let splitString = err.message.split(":");
        let reason = splitString[1].split("{")[0]
        return reason
    }
  }
  async whitelistMint(quantity) {
    try {
      console.log(quantity)
      if (!quantity || typeof quantity !== 'number' || quantity < 0) {
          mintingApp.setState({submitError: "Please type a valid quantity"})
          return
      }
      // let amountMinted = await contract.methods.addressMinted(mintingApp.state.selectedAccount).call()
      let currentGasPriceWei = await web3.eth.getGasPrice()
      let mintPrice = await contract.methods.NFT_WHITELIST_PRICE().call()
      const saleLive = await contract.methods.saleLive().call()
      const presaleLive = await contract.methods.presaleLive().call()


      let transactionParameters = {}
      let valueToSend = mintPrice * quantity;
      let testCall = await mintingApp.testWhitelistMint(quantity, valueToSend, currentGasPriceWei);
      if ((presaleLive) && testCall === "") {
        transactionParameters = {
          to: contractAddress, // Required except during contract publications.
          from: mintingApp.state.selectedAccount, // must match user's active address.
          gasPrice: currentGasPriceWei, // 10000000000000
          value: valueToSend, 
          data: contract.methods.whitelistMint(quantity).encodeABI(),
        };
        
        await web3.eth.sendTransaction(transactionParameters, async function(err, transactionHash) {
            if (err) { 
              mintingApp.setState({submitError : "Minted failed"})
            } else {
              mintingApp.setState({submitError : "Minted succesfully"})
            }
        })
      } else {
        mintingApp.setState({submitError : testCall})
      }


    } catch (error) {
      mintingApp.setState({submitError : "Mint Failed"})

      if (error && error.message) {
        console.log(error.message)
        if (error.message == "MetaMask Tx Signature: User denied transaction signature.") {
          mintingApp.setState({submitError : `Transaction Rejected`})
        } else {
          mintingApp.setState({submitError : "Mint Failed"})
        }
      } else {
        mintingApp.setState({submitError : `Minting failed.`})
      }
    }
  }

  updateInput(event){
    mintingApp.setState({quantity : Number(event.target.value)})
  }


  render() {
    return (
      <div id="how" className="about-container">
      <h1>Minting</h1>

          {
            mintingApp.state.selectedAccount === "" ?
            <Button
            extraClasses="button-cta button-icon"
            label="connect wallet"
            onclick={() => mintingApp.connectWallet()}
          /> :<>
          <div className='selector'>
            <h3>{mintingApp.state.title}</h3>
            <h4>{mintingApp.state.amountMinted}/{mintingApp.state.NFT_STOCK}</h4>
            <h4>{mintingApp.state.selectedAccount + ` ✔️`}</h4>
            <h4>enter mint quantity</h4>
            <input type="text" id="fname" name="fname" onChange={this.updateInput}/>
            
            <Button
              extraClasses="button-cta button-icon"
              label="mint"
              onclick={() => mintingApp.mint(mintingApp.state.quantity)}
            />
            <h4>{mintingApp.state.submitError}</h4>
          </div>
          </>
          }

      </div>
    );
    }
};

export default Minting;
