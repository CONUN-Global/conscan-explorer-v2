import React from "react";
import Cell from "@/components/Table/Cell";
import HStack from "@/components/HStack";
import Button from "@/components/Button";
import HashTimeCell from "@/components/Table/HashTimeCell";
import FromToTxnCell from "@/components/Table/FromToTxnCell";
import ActionCell from "@/components/Table/ActionCell";

import { getTxnsActionIcon } from "@/helpers/index";
import { TxnActivityDataType } from "@/types/index";
import styles from "./TxnsTable.module.scss";

interface Props {
  txn: TxnActivityDataType;

  className?: string;
}

function TxnsTable({ txn, className }: Props) {
  const txnsIcon = getTxnsActionIcon(txn?.chaincodename);

  return (
    <HStack className={(styles.Row, className)}>
      <Button variant="ghost">
        <Cell>{txnsIcon}</Cell>
      </Button>
      <Button variant="ghost" className={styles.HashTimeCell}>
        <HashTimeCell
          variant="dark-grey"
          identicon
          hash={txn.txhash}
          time={txn.createdt}
          link={`Txns/${txn.txhash}`}
          activityId={txn.id.toString()}
          hashLeft={6}
          hashRight={4}
        />
      </Button>
      <FromToTxnCell
        className={styles.FromToTxnCell}
        from={txn.tx_from}
        to={txn.tx_to}
        leftHash={6}
        rightHash={4}
      />
      <ActionCell
        action={txn.tx_action}
        value={txn.tx_value}
        coinName={txn.chaincodename}
      />
    </HStack>
  );
}
export default TxnsTable;
