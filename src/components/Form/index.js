import styles from "./styles.module.css";
import TextEditor from "@/components/textEditor";
import { useQuill } from "react-quilljs";
import { notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const index = ({ handleData, setData, data }) => {
  const { quill, quillRef } = useQuill();
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [product_description, setProduct_description] = useState("");
  const [formValues, setFormValues] = useState({
    product_name: "",
    product_features: "",
    category: "",
    subCategory: "",
  });

  const categories = [
    {
      name: "Mobile Phones",
      value: "mobilePhones",
      subCategory: [
        {
          name: "Cases",
          value: "cases",
        },
        {
          name: "Chargers",
          value: "chargers",
        },
        {
          name: "Headphones",
          value: "headphones",
        },
      ],
    },
    {
      name: "Men's Fashion",
      value: "mensFassion",
      subCategory: [
        {
          name: "Clothing",
          value: "clothing",
        },
        {
          name: "Sun Glasses",
          value: "sunGlasses",
        },
      ],
    },
  ];

  const onChangeSetValues = (value, name) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const uploadImages = async () => {
    // Append each file to the formData
    if (images.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      try {
        const response = await axios.post(
          "http://localhost:3003/uploadImage",
          formData
        );
        if (response.status == 200) {
          return response.data.data;
        } else {
          console.error("Images upload failed.");
        }
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }else {
        return []
    }
  };

  const removeImage = (index,removeFrom) => {
    if(removeFrom == "oldImages"){
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      setOldImages(newImages);
    }else{
        const newImages = [...imageURL];
        newImages.splice(index, 1);
        setImageURL(newImages);
        }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProduct_description(quill.root.innerHTML);
    if (imageURL.length + oldImages.length < 3) {
      notification.error({
        message: "Please select atleast 3 images",
      });
      return;
    } else if (quill.root.innerText.toString().trim() == "") {
      notification.error({
        message: "Please add product description",
      });
      return;
    }
    for (let key in formValues) {
      if (formValues[key] == "") {
        notification.error({
          message: "Please fill all the fields",
        });
        return;
      }
    }

    let imagePaths = await uploadImages();
    imagePaths = [...imagePaths, ...oldImages];
    const data = {
      product_name: formValues.product_name,
      product_features: formValues.product_features,
      product_description: quill.root.innerHTML.toString(),
      product_images: imagePaths,
      category: formValues.category,
      subCategory: formValues.subCategory,
    };
    handleData(data);
  };

  useEffect(() => {
    if (images.length > 0) {
      const imageURLs = [];
      for (let i = 0; i < images.length; i++) {
        imageURLs.push(URL.createObjectURL(images[i]));
      }
          setImageURL([...imageURLs]);
    }
  }, [images]);

  useEffect(() => {
    if (data) {
      setFormValues({
        product_name: data.product_name,
        product_features: data.product_features,
        category: data.category,
        subCategory: data.subCategory,
      });
      setProduct_description(data.product_description);
      quill.root.innerHTML = data.product_description;
      setOldImages([...data.product_images]);
    }
  }, [data]);

  return (
    <div className={styles.formboldmainwrapper}>
      <div className={styles.formboldformwrapper}>
        <div className={styles.formboldformtitle}>
          <h2 className="">Add new product</h2>
        </div>
        <div className={styles.formboldinputflex}>
          <div>
            <label htmlFor="product_name" className={styles.formboldformlabel}>
              {" "}
              Product Name{" "}
            </label>
            <input
              type="text"
              name="product_name"
              id="product_name"
              onChange={(e) => {
                onChangeSetValues(e.target.value, e.target.name);
              }}
              value={formValues?.product_name}
              className={styles.formboldforminput}
            />
          </div>
        </div>
        <div className={styles.formboldinputflex}>
          <div>
            <label
              htmlFor="product_features"
              className={styles.formboldformlabel}
            >
              {" "}
              Product Features{" "}
            </label>
            <input
              type="text"
              name="product_features"
              id="product_features"
              onChange={(e) => {
                onChangeSetValues(e.target.value, e.target.name);
              }}
              value={formValues?.product_features}
              className={styles.formboldforminput}
            />
          </div>
        </div>
        <div className={styles.formboldinputflex}>
          <div style={{ marginBottom: "5rem" }}>
            <label
              htmlFor="product_description"
              className={styles.formboldformlabel}
            >
              {" "}
              Product Description{" "}
            </label>
            <TextEditor quill={quill} quillRef={quillRef} />
          </div>
        </div>

        <div className={styles.formboldinputflex}>
          <div>
            <label
              htmlFor="product_images"
              className={styles.formboldformlabel}
            >
              {" "}
              Product Features{" "}
            </label>
            <input
              type="file"
              accept="image/*"
              name="product_images"
              id="product_images"
              multiple={true}
              onChange={(e) => {
                setImages((old) => {
                  return [...old, ...e.target.files];
                });
              }}
              className={styles.formboldforminput}
            />
            {(imageURL?.length > 0 || oldImages?.length > 0) && (
              <div>
                <label
                  htmlFor="product_images"
                  className={styles.formboldformlabel}
                >
                  {" "}
                  Selected Images{" "}
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: "2.5rem",
                    flexWrap: "wrap",
                    width: " ",
                  }}
                >
                  {imageURL.map((image, index) => {
                    return (
                      <>
                        <div className={styles.imagesContainer}>
                          <p
                            key={imageURL + index}
                            onClick={(e) => removeImage(index,"imageURL")}
                          >
                            x
                          </p>
                          <img
                            key={imageURL}
                            style={{ height: "6rem" }}
                            src={image}
                            alt="image"
                          />
                        </div>
                      </>
                    );
                  })}
                  {oldImages.map((image, index) => {
                    return (
                      <>
                        <div className={styles.imagesContainer}>
                          <p
                            key={imageURL + index}
                            onClick={(e) => removeImage(index,"oldImages")}
                          >
                            x
                          </p>
                          <img
                            key={imageURL}
                            style={{ height: "6rem" }}
                            src={image}
                            alt="image"
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formboldinputflex}>
          <div>
            <label htmlFor="category" className={styles.formboldformlabel}>
              {" "}
              Product category{" "}
            </label>
            <select
              onChange={(e) => onChangeSetValues(e.target.value, e.target.name)}
              name="category"
              className={styles.formboldforminput}
              defaultValue={"Category"}
              value={formValues?.category}
            >
              <option value="Category" defaultValue disabled>
                Select Category
              </option>
              {categories.map((category) => {
                return (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          {formValues.category != "" && (
            <div>
              <label htmlFor="subCategory" className={styles.formboldformlabel}>
                {" "}
                Product sub-category{" "}
              </label>
              <select
                onChange={(e) =>
                  onChangeSetValues(e.target.value, e.target.name)
                }
                name="subCategory"
                defaultValue={"Sub-Category"}
                className={styles.formboldforminput}
                value={formValues?.subCategory}
              >
                <option value="Sub-Category" disabled>
                  Select Sub-Category
                </option>

                {categories.map((category, index) => {
                  if (category.value == formValues.category) {
                    return categories[index].subCategory.map((subCategory) => {
                      return (
                        <option
                          key={subCategory.value}
                          value={subCategory.value}
                        >
                          {subCategory.name}
                        </option>
                      );
                    });
                  }
                })}
              </select>
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          className={styles.formboldbtn}
        >
          {!data ? "Add Product" : "Update Product"}
        </button>
      </div>
    </div>
  );
};

export default index;
