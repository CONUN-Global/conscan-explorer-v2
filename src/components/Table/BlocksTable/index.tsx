import React from "react";

import Row from "@/components/Table/Row";
import Cell from "@/components/Table/Cell";
import Button from "@/components/Button";
import HashTimeCell from "@/components/Table/HashTimeCell";
import TxnsCell from "@/components/Table/TxnsCell";
import { BlockActivityDataType } from "@/types/index";

import styles from "./BlocksTable.module.scss";

function BlocksTable({
  block,
  activityId,
}: {
  block: BlockActivityDataType;
  activityId: string;
}) {
  return (
    <Row className={styles.BlocksRow} fullLength={true}>
      <Button variant="ghost" className={styles.NumberCell}>
        <Cell>
          <a>{block.blocknum}</a>
        </Cell>
      </Button>

      <Button variant="ghost" className={styles.HashCell}>
        <HashTimeCell
          variant="dark-grey"
          hash={block.blockhash}
          time={block.createdt}
          activityId={activityId}
          identicon
          hashLeft={15}
          hashRight={15}
          link={`/blocks/${block.blocknum}`}
        />
      </Button>

      <TxnsCell className={styles.TxnsCell} txcount={block.txcount} />
    </Row>
  );
}
export default BlocksTable;