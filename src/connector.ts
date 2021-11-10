import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'
import { FrameConnector } from '@web3-react/frame-connector'

const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
    1: process.env.RPC_URL_1 as string,
    4: process.env.RPC_URL_4 as string
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

export const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC_URLS[1] },
    qrcode: true,
    //@ts-ignore
    pollingInterval: POLLING_INTERVAL
})

export const walletlink = new WalletLinkConnector({
    url: RPC_URLS[1],
    appName: 'web3-react example',
    supportedChainIds: [1, 3, 4, 5, 42, 10, 137, 69, 420, 80001]
})

export const ledger = new LedgerConnector({ chainId: 1, url: RPC_URLS[1], pollingInterval: POLLING_INTERVAL })

export const trezor = new TrezorConnector({
    chainId: 1,
    url: RPC_URLS[1],
    pollingInterval: POLLING_INTERVAL,
    manifestEmail: 'dummy@abc.xyz',
    manifestAppUrl: 'http://localhost:1234'
})

export const frame = new FrameConnector({ supportedChainIds: [1] })
