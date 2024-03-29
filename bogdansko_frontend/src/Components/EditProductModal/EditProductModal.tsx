import { NotificationType } from "@/app/dashboard/[id]/page";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Input, Button } from "antd";
import { Formik, Form, useFormik } from "formik";
import React from "react";

interface EditProductModalProps {
  isEditProductModalShown: boolean;
  setIsEditProductModalShown: (value: boolean) => void;
  editDrinkName: string;
  setEditDrinkName: (value: string) => void;
  editDrinkPrice: string;
  setEditDrinkPrice: (value: string) => void;
  editProductImage: string | undefined;
  setEditProductImage: (value: string) => void;
  editProductImgUrl?:
    | {
        url: string;
        thumbmailUrl: string | null;
      }
    | undefined;
  setEditProductImgUrl: (
    value: { url: string; thumbmailUrl: string } | undefined
  ) => void;
  edgestore: any;
  editProductImgFile: File | undefined;
  setEditProductImgFile: (value: File | undefined) => void;
  handleUpdateProduct: (value: any) => any;
}

const EditProductModal = ({
  isEditProductModalShown,
  setIsEditProductModalShown,
  editDrinkName,
  setEditDrinkName,
  editDrinkPrice,
  setEditDrinkPrice,
  editProductImage,
  setEditProductImage,
  editProductImgUrl,
  setEditProductImgUrl,
  edgestore,
  editProductImgFile,
  setEditProductImgFile,
  handleUpdateProduct,
}: EditProductModalProps) => {
  return (
    <Formik
      initialValues={{
        drinkName: editDrinkName,
        drinkPrice: editDrinkPrice,
        productImage: editProductImage,
      }}
      onSubmit={async (values) => {
        await handleUpdateProduct({
          editDrinkName: editDrinkName ? editDrinkName : values.drinkName,
          editDrinkPrice: editDrinkPrice ? editDrinkPrice : values.drinkPrice,
          editProductImgUrl: editProductImgUrl ? editProductImgUrl.url : editProductImage
        });
        
        setIsEditProductModalShown(false);
        setEditProductImage('')
        setEditProductImgFile(undefined)
        setEditProductImgUrl(undefined)
        setEditDrinkName('')
        setEditDrinkPrice('')
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <Modal
          title="Edit Product"
          open={isEditProductModalShown}
          onOk={async () => {
            handleSubmit();
            setIsEditProductModalShown(false);
          }}
          onCancel={() => {
            setEditDrinkName("");
            setEditDrinkPrice("");
            setEditProductImage("");
            setEditProductImgUrl(undefined);
            setIsEditProductModalShown(false);
          }}
        >
          <Form onSubmit={handleSubmit}>
            <div className="createProductField">
              <label>Drink Name:</label>
              <Input
                className="createProductSelect"
                value={editDrinkName}
                onChange={(e) => {
                  setEditDrinkName(e.target.value);
                }}
              />
            </div>

            <br />
            <div className="createProductField">
              <label htmlFor="drinkName">Drink Price:</label>
              <Input
                type="number"
                value={editDrinkPrice}
                onChange={(e) => setEditDrinkPrice(e.target.value)}
              />
            </div>
            <div className="createProductField">
              <label htmlFor="drinkPrice">Drink Image:</label>
              <img
                src={
                  editProductImgUrl
                    ? editProductImgUrl.url
                    : editProductImage
                    ? editProductImage
                    : "https://totalcomp.com/images/no-image.jpeg"
                }
                alt=""
              />
              <label htmlFor="drinkPrice">Edit product photo(optional):</label>
              <Input
                type="file"
                onChange={(e) => {
                  setFieldValue("productImage", e.target.files?.[0]);
                  setEditProductImgFile(e.target.files?.[0]);
                }}
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div className="createProductField">
              <Button
                icon={<UploadOutlined />}
                onClick={async () => {
                  if (editProductImgFile) {
                    const res = await edgestore.myPublicImages.upload({
                      file: editProductImgFile,
                    });
                    setEditProductImgUrl({
                      url: res.url,
                      thumbmailUrl: res.thumbnailUrl,
                    });
                    setFieldValue('productImage', res.url)
                  }
                }}
              >
                Upload
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default EditProductModal;
