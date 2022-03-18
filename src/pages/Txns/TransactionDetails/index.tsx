import React, { useState } from "react";
import ValidityIcon from "./ValidityIcon/index";

import VStack from "@/components/VStack";
import Box from "@/components/Box/index";
import Button from "@/components/Button/index";
import Table from "@/components/Table/index";
import SkeletonTable from "@/components/SkeletonTable";
import DetailRow from "@/components/Table/DetailRow/index";

import useActivityDetailsData from "@/hooks/useActivityDetailsData";

import {
  getTimeDistance,
  getLocalTime,
  FormatValue,
  uniformValue,
} from "@/helpers/index";

import NextUpwards from "@/assets/icons/next-upwards.svg";
import PreviousDownwards from "@/assets/icons/previous-downwards.svg";
import Contract from "@/assets/icons/conx-smart.svg";
import styles from "./TransactionDetails.module.scss";

function TransactionDetails({
  txnHash,
  channelHash,
}: {
  txnHash: string;
  channelHash: string;
}) {
  const [page] = useState(txnHash);
  const { isLoading, dataDetails } = useActivityDetailsData(
    channelHash,
    page,
    "transaction"
  );

  return (
    <div className={styles.TxnsDetailsPage}>
      <div className={styles.TxnsDataSection}>
        <Box
          position="start"
          bottomLine={false}
          className={styles.TitleContainer}
          goBackButton
          title="Transaction Details"
        />
        <VStack className={styles.Table}>
          {isLoading || dataDetails.error ? (
            <SkeletonTable loading={isLoading} row={9} />
          ) : (
            <Table>
              <DetailRow title="Transaction Hash">
                {dataDetails?.row?.txhash}
              </DetailRow>
              <DetailRow title="Timestamp">{`${getTimeDistance(
                dataDetails?.row?.createdt
              )} [${getLocalTime(dataDetails?.row?.createdt)}]`}</DetailRow>
              <DetailRow title="Validity">
                <ValidityIcon validity={dataDetails?.row?.validation_code} />
              </DetailRow>
              <DetailRow title="Contract">
                {dataDetails?.row?.chaincodename ? (
                  <div className={styles.ContractIconContainer}>
                    <Contract />
                    {dataDetails?.row?.chaincodename}
                  </div>
                ) : (
                  <div>{dataDetails?.row?.chaincodename}</div>
                )}
              </DetailRow>
              <DetailRow title="FROM">
                <Button
                  variant="ghost"
                  className={styles.TxnsFrom}
                  link={`/wallet/${dataDetails?.row?.tx_from}`}
                >
                  {dataDetails?.row?.tx_from}
                </Button>
              </DetailRow>
              <DetailRow title="TO">
                <Button
                  variant="ghost"
                  className={styles.TxnsTo}
                  link={`/wallet/${dataDetails?.row?.tx_to}`}
                >
                  {dataDetails?.row?.tx_to}
                </Button>
              </DetailRow>
              <DetailRow title="Action">
                {dataDetails?.row?.tx_action}
              </DetailRow>
              <DetailRow title="Value">
                {FormatValue(dataDetails?.row?.tx_value) +
                  " " +
                  uniformValue(dataDetails?.row?.tx_action)}
              </DetailRow>
              <DetailRow title="Payload ProposalHash">
                {dataDetails?.row?.payload_proposal_hash}
              </DetailRow>
            </Table>
          )}
        </VStack>
      </div>
      <div className={styles.BlueVerticalBar}>
        <div className={styles.ButtonContainer}>
          <Button variant="ghost">
            <NextUpwards />
          </Button>
          <Button variant="ghost">
            <PreviousDownwards />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default TransactionDetails;
