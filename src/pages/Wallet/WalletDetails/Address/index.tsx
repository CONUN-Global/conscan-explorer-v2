import React, { useState } from "react";
import classNames from "classnames";
import useStore from "@/store/store";
import QRCodeGenerator from "../QRCodeGenerator";
import CopyButton from "@/components/Button/CopyButton";
import HStack from "@/components/HStack";

import styles from "./Address.module.scss";

function Address({ walletAddress }: { walletAddress: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const isMobile = useStore((state) => state.isMobile);

  return (
    <div className={styles.WalletAddress}>
      {isMobile ? (
        <div className={styles.MobileWalletContainer}>
          <div className={styles.IconContainer}>
            <div className={styles.Title}>WALLET ADDRESS</div>
            <CopyButton
              className={styles.Icon}
              setIsCopied={setIsCopied}
              textToCopy={walletAddress}
            />
            <QRCodeGenerator walletQR={walletAddress} className={styles.Icon} />
          </div>
          <div
            className={classNames(styles.AddressHash, {
              [styles.copied]: isCopied,
            })}
          >
            {walletAddress}
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.Title}>WALLET ADDRESS</div>
          <HStack className={styles.DescriptionContainer}>
            <div
              className={classNames(styles.AddressHash, {
                [styles.copied]: isCopied,
              })}
            >
              {walletAddress}
            </div>
            <CopyButton
              className={styles.Icon}
              setIsCopied={setIsCopied}
              textToCopy={walletAddress}
            />
            <QRCodeGenerator walletQR={walletAddress} className={styles.Icon} />
          </HStack>
        </div>
      )}
    </div>
  );
}
export default Address;
