import type { AppProps } from "next/app";
import { ThirdwebProvider, embeddedWallet,  metamaskWallet, smartWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={"ethereum"}
      supportedWallets={[embeddedWallet()]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
