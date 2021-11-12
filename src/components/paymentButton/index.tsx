import React, {useState} from 'react';
import metamask from '../../assets/images/metamask.png';
import fortmatic from '../../assets/images/fortmatic.png';
import phantom from '../../assets/images/phantom.png';
import anim from '../../assets/images/anim.png';
import walletconnect from '../../assets/images/walletconnect.png';
import close from '../../assets/images/close.png';
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {useInactiveListener} from "../../hooks";
import {ConnectorNames, connectorsByName} from "../../WalletWrapper";
import { ethers } from "ethers";
import {toast} from "react-toastify";


const PaymentButton = () => {

    const [isActive, setIsActive] = useState(false);
    const [amount, setAmount] = useState(0);
    const [tipMsg, setTipMsg] = useState(false);

    const context = useWeb3React<Web3Provider>()
    const { connector, activate, deactivate,  } = context

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState<any>()
    React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!!activatingConnector)

    const FundError = () => {
        return(
            <>
                <p>
                    Insufficient funds in your wallet, please add funds from <a href='https://faucet.ropsten.be/' rel='noreferrer' target='_blank'>https://faucet.ropsten.be/</a> for testing purposes
                </p>
                <p>
                    or make sure that your metamask is set to <b>Ropsten Test Network</b>
                </p>
            </>
        )
    }

    const doc = window as any;
    const startPayment = async ({ ether } : any) => {
        try {
            if (!doc.ethereum)
                throw new Error("No crypto wallet found. Please install it.");
            await doc.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(doc.ethereum);
            const signer = provider.getSigner();
            const tx = await signer.sendTransaction({
                to: ethers.utils.getAddress('0x843d6614dD71fB135D06452Ec3e31878dD840A3f'),
                value: ethers.utils.parseEther(ether)
            });
            console.log("ETH",signer._isSigner);
            console.log("TX", tx);
            setTipMsg(signer._isSigner);
            if (signer._isSigner){
                setAmount(0);
            }
        } catch (err) {
            toast.error(FundError);
        }
    };
    setTimeout(() => {
        setTipMsg(false);
    }, 5000)

    const handlePayment = async () => {
        await deactivate()
        await activate(connectorsByName[ConnectorNames.Injected])

        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT`);
        const json = await response.json();
        const cost = Number(amount/json.price).toFixed(8);

        setIsActive(false);

        await startPayment({
            ether: cost,
        });
    }

    const data = [
        {
            id: 1,
            value: 1,
            label: '$1'
        },
        {
            id: 2,
            value: 3,
            label: '$3'
        },
        {
            id: 3,
            value: 5,
            label: '$5'
        },
    ]
    return(
        <div className='wrapper'>
            <div className='wallet-msg'>
                <div className={isActive ? 'wallet-wrapper' : 'hide'}>
                    <div className='wallet' onClick={handlePayment}>
                        <img src={metamask} className='wallet-img' alt='Wallet'/>
                    </div>
                    <div className='wallet'>
                        <img src={walletconnect} className='wallet-img' alt='Wallet'/>
                    </div>
                    <div className='wallet'>
                        <img src={fortmatic} className='wallet-img' alt='Wallet'/>
                    </div>
                    <div className='wallet'>
                        <img src={anim} className='wallet-img' alt='Wallet'/>
                    </div>
                    <div className='wallet'>
                        <img src={phantom} className='wallet-img' alt='Wallet'/>
                    </div>
                    <div className='wallet' onClick={() => {
                        setIsActive(false)
                        setAmount(0)
                    }}>
                        <img src={close} className='close-img' alt='Wallet'/>
                    </div>
                </div>
                <div className={tipMsg ? 'thanks-message' : 'hide'}>
                    <p>Thank you for the tip!</p>
                </div>
            </div>
            <div className='btn-wrapper'>
                {data.map(e => {
                   return(
                       <button className={`pay-btn ${amount === e.value ? 'active' : ''}`} onClick={() => {
                           setAmount(e.value)
                           if(amount === e.value && isActive){
                               setIsActive(false);
                               setAmount(0);
                           } else {
                                setIsActive(true)
                           }
                       }}>{e.label}</button>
                   )
                })}
            </div>
        </div>
    )
}
export default PaymentButton;
