import { useRouter } from "next/router";
import styles from "./styles.module.css";

const index = () => {
  const router = useRouter();

  return (
    <ul className={styles.parent}>
      <li
        onClick={() => {
          router.push("/addProduct");
        }}
      >
        Add product
      </li>
      <li
        onClick={() => {
          router.push("/");
        }}
      >
        View product
      </li>
    </ul>
  );
};

export default index;
