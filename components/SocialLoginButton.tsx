import {
  MediaRenderer,
  embeddedWallet,
  smartWallet,
  useConnect,
  useEmbeddedWallet,
} from "@thirdweb-dev/react";
import { ACCOUNT_FACTORY_ADDRESS } from "../constants/contracts";
import styles from "../styles/Home.module.css";

type SocialLoginProps = {
  strategy: any;
};

export const SocialLoginButton = ({ strategy }: SocialLoginProps) => {
  const { connect } = useEmbeddedWallet();
  const connectSmartWallet = useConnect();
  const smartWalletConfig = smartWallet(embeddedWallet(), {
    factoryAddress: ACCOUNT_FACTORY_ADDRESS,
    gasless: true,
  });

  const firstChar = strategy.charAt(0).toUpperCase();
  const rest = strategy.slice(1);
  const strategyName = firstChar + rest;

  const signInWithSocial = async () => {
    const personalWallet = await connect({
      strategy: strategy,
    });
    await connectSmartWallet(smartWalletConfig, {
      personalWallet: personalWallet,
      chainId: 1,
    });
  };

  return (
    <button className={styles.socialLoginBtn} onClick={signInWithSocial}>
      <span style={{ marginRight: "10px" }}>
        <MediaRenderer
          src={`/images/${strategy}-icon.png`}
          height="24px"
          width="24px"
        />
      </span>{" "}
      Sign in with {strategyName}
    </button>
  );
};
