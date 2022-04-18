import React from "react";
import VStack from "@/components/VStack";
import NotFoundIcon from "@/assets/icons/404-error.svg";

import styles from "./505.module.scss";

function Custom500() {
  return (
    <VStack centered>
      <NotFoundIcon className={styles.Icon} />
      <div>
        <h1>500 Internal Server Error</h1>
      </div>
    </VStack>
  );
}

export default Custom500;
