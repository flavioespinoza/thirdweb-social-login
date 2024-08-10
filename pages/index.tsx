import { NextPage } from "next";
import { ConnectWallet, MediaRenderer, useAddress } from "@thirdweb-dev/react";
import { SocialLoginButton } from "../components/SocialLoginButton";
import EmailSignIn from "../components/EmailLogin";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();

  return (
    <>
      {address ? (
        <div className={styles.connectWallet}>
          <ConnectWallet />
        </div>
      ) : (
        <div className={styles.signInContainer}>
          <div className={styles.signInLeftColumn}>
            <div className={styles.logoBlockless}>
              <MediaRenderer
                src={"/images/logo-blockless-black-on-white.png"}
                height="48px"
                width="48px"
              />
            </div>
            <div className={styles.signInLeftWrapper}>
              <h1>Sign In</h1>
              <EmailSignIn />
              <div className={styles.signInLeftDivider}>
                <hr className={styles.dividerLine} />
                <p>or</p>
                <hr className={styles.dividerLine} />
              </div>
              <SocialLoginButton strategy="google" />
              <SocialLoginButton strategy="facebook" />
              <SocialLoginButton strategy="apple" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
