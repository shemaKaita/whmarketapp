import React, { FC, PropsWithChildren } from "react";
import styles from "./PageWrapper.module.scss";

const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.pageWrapper}>{children}</div>;
};

export default PageWrapper;
