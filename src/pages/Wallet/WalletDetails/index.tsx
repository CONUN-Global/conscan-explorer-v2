import React, { useState, useRef } from "react";
import useStore from "@/store/store";
import Address from "./Address";
import WalletDescription from "./WalletDescription/";

import ContractTxnsTab from "../../SmartContracts/ContractDetails/ContractTxnsTab";
import VStack from "@/components/VStack";

import Box from "@/components/Box";
import Table from "@/components/Table";
import Tabs from "@/components/Tabs";
import Pagination from "@/components/Pagination";
import SkeletonTable from "@/components/SkeletonTable";
import CodeSnippetTab from "@/components/CodeSnippetTab";
import useWalletStatus from "@/hooks/useWalletStatus";
import useFilteredTransactionList from "@/hooks/useFilteredTransactionList";
import useWidthDetect from "@/hooks/useWidthDetect";
import useHasMounted from "@/hooks/useHasMounted";
import { TxnActivityDataType } from "@/types/index";

import styles from "./WalletDetails.module.scss";

interface Props {
  txnsList: Array<TxnActivityDataType>;
  channelHash: string;
  walletAddress: string;
}
function WalletDetails({ txnsList, channelHash, walletAddress }: Props) {
  const { walletStatus, isLoading } = useWalletStatus(
    channelHash,
    walletAddress
  );
  const [activeTab, setActiveTab] = useState<string>("txns");
  const [page, setPage] = useState<string>(
    localStorage.getItem("page") || txnsList[0]?.id?.toString()
  );
  const isMobile = useStore((state) => state.isMobile);
  const refWidth = useRef<HTMLDivElement>(null);
  const size = useWidthDetect(refWidth);
  const hasMounted = useHasMounted();
  const TABS_ITEMS = [
    { tabId: "details", label: "Details" },
    { tabId: "txns", label: "Transactions" },
    { tabId: "code", label: "Code" },
  ];
  const { listOfTransactions, loadingTransactionsList } =
    useFilteredTransactionList("wallet", walletAddress, page);
  const navigation = {
    initial: Number(page),
    prevSteps: 5,
    nextSteps: 5,
    latestPage: txnsList[0]?.id,
  };

  let loadTabData;
  if (activeTab === "txns") {
    loadTabData = (
      <Table>
        {listOfTransactions?.map(
          (transaction: TxnActivityDataType, index: number) => {
            if (index < 5) {
              return (
                <ContractTxnsTab key={transaction.id} txns={transaction} />
              );
            }
          }
        )}
        {isMobile && (
          <Pagination
            className={styles.MobilePagination}
            setPage={setPage}
            navigation={navigation}
          />
        )}
      </Table>
    );
  }
  if (activeTab === "details") {
    loadTabData = (
      <Table className={styles.DetailsTab}>
        {hasMounted && <Address walletAddress={walletAddress} />}
        <WalletDescription
          loading={isLoading}
          walletStatus={walletStatus?.tx_count}
        />
      </Table>
    );
  }
  if (activeTab === "code") {
    loadTabData = (
      <Table scrollable>
        <CodeSnippetTab tableWidth={size} contractName="drive" />
      </Table>
    );
  }
  return (
    <div className={styles.WalletPage}>
      <Box
        className={styles.TitleBox}
        bottomLine={false}
        goBackButton
        title="Wallet Details"
      />
      {hasMounted && (
        <VStack className={styles.TableContainer}>
          {!isMobile && (
            <>
              <Address walletAddress={walletAddress} />
              <WalletDescription
                loading={isLoading}
                walletStatus={walletStatus?.tx_count}
              />
            </>
          )}

          <div className={styles.TableHeader}>
            <Tabs
              walletPage
              setActiveTab={setActiveTab}
              tabs={TABS_ITEMS}
              activeTab={activeTab}
            />
            {!isMobile && (
              <Pagination setPage={setPage} navigation={navigation} />
            )}
          </div>
          <div className={styles.WalletDetailContainer} ref={refWidth}>
            {loadingTransactionsList ? (
              <SkeletonTable size="large" row={5} />
            ) : (
              loadTabData
            )}
          </div>
        </VStack>
      )}
    </div>
  );
}

export default WalletDetails;
