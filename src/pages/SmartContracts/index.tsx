import TimeStamp from "@/components/TimeStamp";
import VStack from "@/components/VStack";
import Box from "@/components/Box";
import Cell from "@/components/Table/Cell";
import Table from "@/components/Table";
import SkeletonTable from "@/components/SkeletonTable";
import Title from "@/components/Title";
import Row from "@/components/Table/Row";
import Button from "@/components/Button";
import ContractIcon from "@/components/ContractIcon";
import { ContractType } from "@/types/index";
import styles from "./SmartContract.module.scss";

interface Props {
  status: number;
  chaincode: ContractType[];
}
function SmartContract({ status, chaincode }: Props) {
  return (
    <VStack className={styles.SmartContact}>
      <VStack className={styles.SmartContactContainer}>
        <Box position="center" bottomLine={false} className={styles.Header}>
          <Title title={"Smart Contract".toUpperCase()} />
        </Box>
        <VStack className={styles.TableHeader}>
          <Row className={styles.TitleRow}>
            <Cell centered className={styles.Cell}>
              Name
            </Cell>
            <Cell centered className={styles.Cell}>
              Icon
            </Cell>
            <Cell centered className={styles.Cell}>
              Ver.
            </Cell>
            <Cell centered className={styles.Cell}>
              Last Updated
            </Cell>
          </Row>
          {status !== 200 ? (
            <SkeletonTable row={3} size="medium" />
          ) : (
            <Table>
              {chaincode?.map((contract) => {
                const index = contract.codes.length - 1;
                return (
                  <Row key={contract.chaincodename} className={styles.Row}>
                    <Cell centered className={styles.ContractNameCell}>
                      <Button
                        variant="ghost"
                        link={`/smart-contracts/${contract.chaincodename}`}
                      >
                        {contract.chaincodename.toUpperCase()}
                      </Button>
                    </Cell>
                    <Cell className={styles.Cell} centered>
                      <ContractIcon
                        className={styles.Icon}
                        contractName={contract.chaincodename}
                      />
                    </Cell>
                    <Cell className={styles.Cell} centered>
                      {contract.codes[index].version}
                    </Cell>
                    <Cell className={styles.Cell} centered>
                      <TimeStamp time={contract.codes[index].createdt} />
                    </Cell>
                  </Row>
                );
              })}
            </Table>
          )}
        </VStack>
      </VStack>

      <div className={styles.Github}>READ MORE ON GITHUB</div>
    </VStack>
  );
}

export default SmartContract;
