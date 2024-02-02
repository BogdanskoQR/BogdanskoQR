import { NotificationType } from "@/app/dashboard/[id]/page";
import { UploadOutlined } from "@ant-design/icons";
import { Modal,Input, Button } from "antd";
import { Formik,Form } from "formik";
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
  openNotificationWithIcon: (
    type: NotificationType,
    point: string,
    drinkName?: string
  ) => void;
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
  openNotificationWithIcon,
}: EditProductModalProps) => {
  return (
    <Modal
      title="Edit Product"
      open={isEditProductModalShown}
      onOk={() => {
        setEditDrinkName("");
        setEditDrinkPrice("");
        setEditProductImage("");
        setEditProductImgUrl(undefined);
        setIsEditProductModalShown(false);
        openNotificationWithIcon("success", "update", editDrinkName);
      }}
      onCancel={() => {
        setEditDrinkName("");
        setEditDrinkPrice("");
        setEditProductImage("");
        setEditProductImgUrl(undefined);
        setIsEditProductModalShown(false);
      }}
    >
      <Formik
        initialValues={{
          drinkName: editDrinkName,
          drinkPrice: editDrinkPrice,
          productImage: editProductImage,
        }}
        onSubmit={(values) => {
          console.log("edit Drink Form values:", values);
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
                  editProductImgUrl ? editProductImgUrl.url : editProductImage
                }
                alt=""
              />
              <label htmlFor="drinkPrice">Edit product photo(optional):</label>
              <Input
                type="file"
                onChange={(e) => setEditProductImgFile(e.target.files?.[0])}
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
                    // we can save to database here
                  }
                }}
              >
                Upload
              </Button>
            </div>

            {/* <Button htmlType="submit">Add Drink</Button> */}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditProductModal;
