import Link from "next/link";
import classNames from "classnames";

import { PAGES_MAIN, PAGES_SMARTCONTRACT, LOCALES } from "src/const";

import useToggle from "@/hooks/useToggle";
import ConunLogoLight from "@/assets/icons/logo-white.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import ArrowUp from "@/assets/icons/arrow-up.svg";
import styles from "./MenuDrawer.module.scss";

function MenuDrawer({ open }: { open: boolean }) {
  const [mainToggle, setMainToggle] = useToggle(false);
  const [contractToggle, setContractToggle] = useToggle(false);
  const [languageToggle, setLanguageToggle] = useToggle(false);
  return (
    <div className={classNames(styles.MenuDrawer, { [styles.open]: open })}>
      <Link href="/">
        <a className={styles.Logo}>
          <ConunLogoLight />
        </a>
      </Link>
      <div className={styles.ListContainer}>
        <div className={styles.List}>
          <div className={styles.ListItem}>
            <div onClick={setMainToggle} className={styles.ListTitle}>
              <span>Main</span>
              {mainToggle ? <ArrowUp /> : <ArrowDown />}
            </div>
            {mainToggle && (
              <div className={styles.SubItems}>
                {PAGES_MAIN.map((main) => (
                  <Link key={main.id} href={main.path}>
                    <a>{main.name}</a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className={styles.ListItem}>
            <div onClick={setContractToggle} className={styles.ListTitle}>
              Smart Contracts
              {contractToggle ? <ArrowUp /> : <ArrowDown />}
            </div>
            {contractToggle && (
              <div className={styles.SubItems}>
                {PAGES_SMARTCONTRACT.map((contract) => (
                  <Link key={contract.id} href={contract.path}>
                    <a>{contract.name}</a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className={styles.ListItem}>
            <div onClick={setLanguageToggle} className={styles.ListTitle}>
              Language
              {languageToggle ? <ArrowUp /> : <ArrowDown />}
            </div>

            {languageToggle && (
              <div className={styles.SubItems}>
                {LOCALES.map((lang) => (
                  <div key={lang.value}>{lang.label}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MenuDrawer;
