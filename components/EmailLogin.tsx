import { useEmbeddedWallet } from "@thirdweb-dev/react";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function EmailSignIn() {
  const [state, setState] = useState<
    "init" | "sending_email" | "email_verification"
  >("init");

  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const { connect, sendVerificationEmail } = useEmbeddedWallet();

  const handleEmailEntered = async () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }
    setState("sending_email");
    await sendVerificationEmail({ email });
    setState("email_verification");
  };

  const handleEmailVerification = async () => {
    if (!email || !verificationCode) {
      alert("Please enter an verification code");
      return;
    }
    await connect({ strategy: "email_verification", email, verificationCode });
  };

  if (state === "sending_email") {
    return <div className={styles.spinner} />;
  }

  if (state === "email_verification") {
    return (
      <>
        <p style={{ color: "#333" }}>
          Enter the verification code sent to your email
        </p>
        <input
          className={styles.emailSignInInput}
          placeholder="Enter verification code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button
          className={styles.emailSignInBtn}
          onClick={handleEmailVerification}
        >
          Verify
        </button>
        <a onClick={() => setState("init")}>
          <p
            style={{
              color: "royalblue",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Go Back
          </p>
        </a>
      </>
    );
  }

  return (
    <>
      <p>Sign in with email or social login below.</p>
      <input
        className={styles.emailSignInInput}
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className={styles.emailSignInBtn} onClick={handleEmailEntered}>
        Sign In
      </button>
    </>
  );
}
