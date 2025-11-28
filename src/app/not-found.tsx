import Link from "next/link";
import { ROUTES } from "@/common/constants";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>The page or product you&apos;re looking for doesn&apos;t exist.</p>
      <Link href={ROUTES.HOME} className={styles.button}>
        Go back home
      </Link>
    </div>
  );
}
