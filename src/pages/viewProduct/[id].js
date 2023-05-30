import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import parse from "html-react-parser";

const index = () => {
  const [data, setData] = useState();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(data?.product_images[0]);

  const getProductDetails = async () => {
    console.log(router);
    const responce = await axios.get(
      "http://localhost:3003/getProductDetails/" + router.query.id
    );
    console.log(responce);
    setData(responce.data);
    setSelectedImage(responce.data.product_images[0]);
  };

  useEffect(() => {
    if (router.query.id) {
      getProductDetails();
    }
  }, [router.query]);

  if (data) {
    return (
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <img className={styles.active} src={selectedImage} alt="" />
          <div className={styles.allImages}>
            {data &&
              data?.product_images?.map((item) => {
                return (
                  <img
                    className={styles.bottomImages}
                    onClick={() => setSelectedImage(item)}
                    src={item}
                  />
                );
              })}
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.productDescription}>
            <h1>{data.product_name}</h1>
            <h3>Category : {data.category}</h3>
            <p>Sub-Category : {data.subCategory}</p>
            <div>{parse(data.product_description)}</div>
            <p>Created at : {data.createdAt}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default index;
