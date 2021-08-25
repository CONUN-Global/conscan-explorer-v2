import React, { useState } from "react";
import classnames from "classnames";

import ContractIcon from "@/components/ContractIcon";

import { getTimeDistance } from "@/helpers/getTimeDistance";

import { SmartContractDetailsType } from "src/types";

import styles from "./InfoTable.module.scss";

function InfoTable({
  smartContract,
}: {
  smartContract: SmartContractDetailsType;
}) {
  const [showTimeStamp, setShowTimeStamp] = useState(false);

  return (
    <div className={styles.Table}>
      <div className={styles.Cell}>
        <div className={styles.CellTitle}>Title</div>
        <div className={styles.CellContents}>{smartContract.name}</div>
      </div>
      <div className={styles.Cell}>
        <div className={styles.CellTitle}>Author</div>
        <div className={styles.CellContents}>CONUN</div>
      </div>
      <div className={styles.Cell}>
        <div className={styles.CellTitle}>Type</div>
        <div className={styles.CellContents}>
          <ContractIcon contractName={smartContract.name} showLabel />
        </div>
      </div>
      <div className={classnames(styles.Cell, styles.DateCell)}>
        <div className={styles.CellTitle}>Updated</div>
        <div
          className={styles.CellContents}
          onClick={() => setShowTimeStamp(!showTimeStamp)}
        >
          {showTimeStamp
            ? smartContract.updated.toDateString()
            : getTimeDistance(smartContract.updated.toDateString())}
        </div>
      </div>
    </div>
  );
}

export default InfoTable;
