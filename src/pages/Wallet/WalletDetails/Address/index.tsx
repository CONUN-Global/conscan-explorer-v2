import React, { useState } from "react";
import classNames from "classnames";
import useStore from "@/store/store";
import QRCodeGenerator from "../QRCodeGenerator";
import CopyButton from "@/components/Button/CopyButton";
import HStack from "@/components/HStack";
import Backdrop from "@/components/Layout/Navbar/Backdrop";
import styles from "./Address.module.scss";

function Address({ walletAddress }: { walletAddress: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toggleQR, setToggleQR] = useState<boolean>(false);
  const isMobile = useStore((state) => state.isMobile);

  const handleToggleQR = () => {
    setToggleQR((prev) => !prev);
  };

  return (
    <div className={styles.WalletAddress}>
      {isMobile ? (
        <div className={styles.MobileWalletContainer}>
          {toggleQR && (
            <Backdrop handleBackdrop={() => setToggleQR(false)}></Backdrop>
          )}
          <div className={styles.IconContainer}>
            <div className={styles.Title}>WALLET ADDRESS</div>
            <CopyButton
              className={styles.Icon}
              setIsCopied={setIsCopied}
              textToCopy={walletAddress}
            />
            <QRCodeGenerator
              toggleQrCode={handleToggleQR}
              toggleQR={toggleQR}
              walletQR={walletAddress}
              className={styles.Icon}
            />
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
          </HStack>
        </div>
      )}
    </div>
  );
}
export default Address;
