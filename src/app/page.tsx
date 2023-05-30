'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3Button } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { useEffect } from 'react'

const chains = [arbitrum, mainnet, polygon]
const projectId = '6fd7429b8661660487778334acaedf0a'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
function App() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Web3Button />
      </div>
    </main>
  )
}
declare global {
  interface Window {
    ReactNativeWebView: any; // 👈️ turn off type checking
  }
}
// 
export default function Home() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (address) {
      window?.ReactNativeWebView?.postMessage(`${address}`);
    }
  }, [address])

  console.log('=====address======', address, isConnected);
  // if()
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>

  )
}
