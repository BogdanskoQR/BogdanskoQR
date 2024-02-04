import { UploadOutlined } from "@ant-design/icons";
import { Modal, Select, Input, Button } from "antd";
import { Formik, Form, useFormikContext } from "formik";
import React from "react";
import { Category, Drink } from "../Types/types";
import { NotificationType } from "@/app/dashboard/[id]/page";

interface CreateProductModalProps {
  isCreateDrinkModalOpen: boolean;
  setIsCreateDrinkModalOpen: (value: boolean) => void;
  closeModal: (modalType: "category" | "drink" | "editMenu") => void;
  openNotificationWithIcon: (
    type: NotificationType,
    point: string,
    drinkName?: string
  ) => void;
  productImgUrl:
    | {
        url: string;
        thumbmailUrl: string | null;
      }
    | undefined;
  categories: any;
  setSelectedNewDrink: any;
  setProductImgFile: (value: File | undefined) => void;
  productImgFile: File | undefined;
  edgestore: any;
  setProductImgUrl: (
    value:
      | {
          url: string;
          thumbmailUrl: string | null;
        }
      | undefined
  ) => void;
  handleCreateProduct: (value: any) => void;
}

const CreateProductModal = ({
  isCreateDrinkModalOpen,
  setIsCreateDrinkModalOpen,
  closeModal,
  openNotificationWithIcon,
  productImgUrl,
  categories,
  setSelectedNewDrink,
  setProductImgFile,
  productImgFile,
  edgestore,
  setProductImgUrl,
  handleCreateProduct,
}: CreateProductModalProps) => {
  return (
    <Formik
      initialValues={{
        categoryName: 0,
        drinkName: "",
        drinkPrice: 0,
        productImage: productImgUrl,
      }}
      onSubmit={(values) => {
        handleCreateProduct(values);
        console.log("pavic values", values);
        openNotificationWithIcon(
          "success",
          "create",
          `product with name ${values.drinkName}`
        );
        setIsCreateDrinkModalOpen(false);
      }}
    >
      {({values, handleSubmit, setFieldValue,resetForm }) => (
        <Modal
          title="Create Product"
          open={isCreateDrinkModalOpen}
          onOk={() => {
            handleSubmit();
            closeModal("drink");
            setTimeout(()=> {
              resetForm()
            },1000)
            
          }}
          onCancel={() => {
            closeModal("drink");
          }}
        >
          <Form>
            <div className="createProductField">
              <label>Drink Category:</label>
              <Select
                className="createProductSelect"
                options={categories?.map((oneCategory: Category) => ({
                  value: oneCategory.categoryId,
                  label: oneCategory.categoryName,
                }))}
                onSelect={(value: Category) =>
                  setFieldValue("categoryName", value.categoryName)
                }
              />
            </div>
            <div className="createProductField">
              <label htmlFor="drinkName">Drink Name:</label>
              <Input
                type="text"
                id="drinkName"
                name="drinkName"
                value={values.drinkName}
                onChange={(e) => setFieldValue("drinkName", e.target.value)}
              />
            </div>
            <div className="createProductField">
              <label htmlFor="drinkPrice">Drink Price:</label>
              <Input
                type="number"
                id="drinkPrice"
                value={values.drinkPrice}
                name="drinkPrice"
                style={{ marginBottom: "10px" }}
                onChange={(e) => setFieldValue("drinkPrice", e.target.value)}
              />
            </div>
            <div className="createProductImageField">
              <label htmlFor="drinkPrice">Product Photo(optional):</label>
              <div className="productModalImgInput">
                <input
                  className="createProductInput"
                  type="file"
                  onChange={(e) => {
                    setProductImgFile(e.target.files?.[0]);
                  }}
                />
                <Button
                  icon={<UploadOutlined />}
                  onClick={async () => {
                    if (productImgFile) {
                      const res = await edgestore.myPublicImages.upload({
                        file: productImgFile,
                      });
                      setProductImgUrl({
                        url: res.url,
                        thumbmailUrl: res.thumbnailUrl,
                      });
                      setFieldValue("productImage", res.url);
                    }
                  }}
                >
                  Upload
                </Button>
              </div>
            </div>
            {productImgUrl?.url ? (
              <img
                className="createProductImg"
                src={productImgUrl?.url}
                alt=""
              />
            ) : null}
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default CreateProductModal;
