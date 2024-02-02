import { UploadOutlined } from "@ant-design/icons";
import { Modal, Form, Select, Input, Button } from "antd";
import { Formik } from "formik";
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
}: CreateProductModalProps) => {
  return (
    <Modal
      title="Create Product"
      open={isCreateDrinkModalOpen}
      onOk={() => setIsCreateDrinkModalOpen(false)}
      onCancel={() => closeModal("drink")}
    >
      <Formik
        initialValues={{
          categoryName: 0,
          drinkName: "",
          drinkPrice: 0,
          productImage: productImgUrl,
        }}
        onSubmit={(values) => {
          console.log("Add Drink Form values:", values);
          openNotificationWithIcon(
            "success",
            "create",
            `product with name ${values.drinkName}`
          );
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="createProductField">
              <label>Drink Category:</label>
              <br />
              <Select
                className="createProductSelect"
                options={categories?.map((oneCategory: Category) => ({
                  value: oneCategory.categoryId,
                  label: oneCategory.categoryName,
                }))}
                onSelect={(value: Drink) => setSelectedNewDrink(value)}
              />
            </div>

            <br />
            <div className="createProductField">
              <label htmlFor="drinkName">Drink Name:</label>
              <Input
                type="text"
                id="drinkName"
                name="drinkName"
                value={values.drinkName}
                onChange={handleChange}
              />
            </div>
            <div className="createProductField">
              <label htmlFor="drinkPrice">Drink Price:</label>
              <Input
                type="number"
                id="drinkPrice"
                name="drinkPrice"
                value={values.drinkPrice}
                onChange={handleChange}
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div className="createProductField">
              <label htmlFor="drinkPrice">Product Photo(optional):</label>
              <br />
              <input
                type="file"
                onChange={(e) => {
                  setProductImgFile(e.target.files?.[0]);
                }}
              />
              {productImgUrl?.url ? (
                <img src={productImgUrl?.url} alt="" />
              ) : null}
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
                    // we can save to database here
                  }
                }}
              >
                Upload
              </Button>
            </div>

            <Button htmlType="submit">Add Drink</Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateProductModal;
