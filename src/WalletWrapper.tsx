import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
// import {
//     NoEthereumProviderError,
//     UserRejectedRequestError as UserRejectedRequestErrorInjected
// } from '@web3-react/injected-connector'
// import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
// import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { Web3Provider } from '@ethersproject/providers'
// import { formatEther } from '@ethersproject/units'

// import { useEagerConnect, useInactiveListener } from './hooks'
import {
    injected,
    walletconnect,
    walletlink,
    ledger,
    trezor,
    frame,
} from './connector'
// import { Spinner } from './components/Spinner'
import App from "./App";

export enum ConnectorNames {
    Injected = 'Injected',
    // Network = 'Network',
    WalletConnect = 'WalletConnect',
    WalletLink = 'WalletLink',
    Ledger = 'Ledger',
    Trezor = 'Trezor',
    // Lattice = 'Lattice',
    Frame = 'Frame',
    // Authereum = 'Authereum',
    // Fortmatic = 'Fortmatic',
    // Magic = 'Magic',
    // Portis = 'Portis',
    // Torus = 'Torus'
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    // [ConnectorNames.Network]: network,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.WalletLink]: walletlink,
    [ConnectorNames.Ledger]: ledger,
    [ConnectorNames.Trezor]: trezor,
    // [ConnectorNames.Lattice]: lattice,
    [ConnectorNames.Frame]: frame,
    // [ConnectorNames.Authereum]: authereum,
    // [ConnectorNames.Fortmatic]: fortmatic,
    // [ConnectorNames.Magic]: magic,
    // [ConnectorNames.Portis]: portis,
    // [ConnectorNames.Torus]: torus
}

// function getErrorMessage(error: Error) {
//     if (error instanceof NoEthereumProviderError) {
//         return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
//     } else if (error instanceof UnsupportedChainIdError) {
//         return "You're connected to an unsupported network."
//     } else if (
//         error instanceof UserRejectedRequestErrorInjected ||
//         error instanceof UserRejectedRequestErrorWalletConnect ||
//         error instanceof UserRejectedRequestErrorFrame
//     ) {
//         return 'Please authorize this website to access your Ethereum account.'
//     } else {
//         console.error(error)
//         return 'An unknown error occurred. Check the console for more details.'
//     }
// }

function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}

const WalletWrapper = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <App />
        </Web3ReactProvider>
    )
}
export default WalletWrapper;
