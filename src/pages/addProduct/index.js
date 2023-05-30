import { notification } from "antd";
import axios from "axios";
import Form from "../../components/Form";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const handleSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3003/", { data });
      if (response.status == 200) {
        notification.success({
          message: "Product added successfully",
        });
      } else {
        console.error("Error in adding product.");
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
    router.push("/");
  };

  return <Form handleData={handleSubmit} />;
};

export default index;
