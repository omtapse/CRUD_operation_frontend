import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";

export default function Home() {
  const [data, setData] = useState([]);

  const router = useRouter();
  const getData = async () => {
    const responce = await axios.get("http://localhost:3003/");
    console.log(responce);
    setData(responce.data);
  };

  const deleteProduct = async (id) => {
    const responce = await axios.delete(`http://localhost:3003/${id}`);
    if (responce.status == 200) {
      notification.success({
        message: "Product deleted successfully",
      });
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="table">
        <div className="table-header">
          <div className="header__item">
            <p id="product_name" className="filter__link">
              Product Name
            </p>
          </div>
          <div className="header__item">
            <p id="category" className="filter__link filter__link--number">
              Category
            </p>
          </div>
          <div className="header__item">
            <p id="sub_category" className="filter__link filter__link--number">
              Subcategory
            </p>
          </div>
          <div className="header__item">
            <p id="View" className="filter__link filter__link--number">
              View
            </p>
          </div>
          <div className="header__item">
            <p id="Edit" className="filter__link filter__link--number">
              Edit
            </p>
          </div>
          <div className="header__item">
            <p id="Delete" className="filter__link filter__link--number">
              Delete
            </p>
          </div>
        </div>

        <div className="table-content">
          {data.map((item) => {
            return (
              <>
                <div className="table-row">
                  <div className="table-data">{item.product_name}</div>
                  <div className="table-data">{item.category}</div>
                  <div className="table-data">{item.subCategory}</div>
                  <div
                    className="table-data"
                    onClick={() => {
                      router.push(`/viewProduct/${item._id}`);
                    }}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </div>
                  <div
                    className="table-data"
                    onClick={() => {
                      router.push(`/editProduct/${item._id}`);
                    }}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="table-data"
                    onClick={() => {
                      deleteProduct(item._id);
                    }}
                    style={{
                      color: "red",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
