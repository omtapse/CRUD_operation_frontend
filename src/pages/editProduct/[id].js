import { notification } from "antd";
import axios from "axios";
import Form from "../../components/Form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const [data, setData] = useState();

  const handleSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3003/${router.query.id}`,
        { data }
      );
      if (response.status == 200) {
        notification.success({
          message: "Product edited successfully",
        });
        router.push("/");
      } else {
        console.error("Error in editing product.");
      }
    } catch (error) {
      console.error("Error editing product", error);
    }
  };

  const getProductDetails = async () => {
    const responce = await axios.get(
      "http://localhost:3003/getProductDetails/" + router.query.id
    );
    setData(responce.data);
  };

  useEffect(() => {
    if (router.query.id) {
      getProductDetails();
    }
  }, [router.query]);

  return <Form handleData={handleSubmit} setData={setData} data={data} />;
};

export default index;
