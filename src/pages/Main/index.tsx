import StatsCell from "./StatsBlock/StatsCell";
import GraphCell from "./StatsBlock/GraphCell";
import BlocksActivitySection from "./BlocksActivitySection";
import TxnActivitySection from "./TxnActivitySection";
import HStack from "@/components/HStack";
import useWebSocket from "@/hooks/WebSocket";

import styles from "./Main.module.scss";

function Main() {
  useWebSocket();
  return (
    <div className={styles.Container}>
      <HStack className={styles.SubStatsTop}>
        <StatsCell />
        <GraphCell />
      </HStack>
      <HStack className={styles.SubStatsBottom}>
        <BlocksActivitySection />
        <TxnActivitySection />
      </HStack>
    </div>
  );
}

export default Main;
