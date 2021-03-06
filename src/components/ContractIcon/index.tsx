import React from "react";
import classNames from "classnames";

import BridgeIcon from "@/assets/icons/bridge-smart.svg";
import DriveIcon from "@/assets/icons/drive-smart.svg";
import ConxIcon from "@/assets/icons/conx-smart.svg";

import styles from "./ContractIcon.module.scss";

interface Props {
  contractName: string;
  className?: string;
}

function Icon({ contractName }: { contractName: string }) {
  const contract = contractName.toLowerCase();
  if (contract === "drive") {
    return <DriveIcon className={styles.Icon} />;
  }
  if (contract === "bridge") {
    return <BridgeIcon className={styles.Icon} />;
  }
  return <ConxIcon className={styles.Icon} />;
}

function ContractIcon({ contractName, className }: Props) {
  return <Icon contractName={classNames(contractName, className)} />;
}

export default ContractIcon;
