import { NotificationType } from "@/app/dashboard/[id]/page";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import { Formik } from "formik";
import React from "react";

interface EditCategoryModalProps {
  isEditCategoryModalOpen: boolean;
  setIsEditCategoryModalOpen: (value: boolean) => void;
  editCategoryName: string | undefined;
  setEditCategoryName: (value: string) => void;
  editCategoryImageUrl?:
    | {
        url: string;
        thumbmailUrl: string | null;
      }
    | undefined;
  setEditCategoryImageUrl: (
    value: { url: string; thumbmailUrl: string } | undefined
  ) => void;
  editCategoryImgFile: File | undefined;
  setEditCategoryImgFile: (value: File | undefined) => void;
  edgestore: any;
  openNotificationWithIcon: (
    type: NotificationType,
    point: string,
    drinkName?: string
  ) => void;
  editCategoryImg: string | undefined;
}
const EditCategoryModal = ({
  isEditCategoryModalOpen,
  setIsEditCategoryModalOpen,
  editCategoryName,
  setEditCategoryName,
  editCategoryImageUrl,
  setEditCategoryImageUrl,
  editCategoryImgFile,
  setEditCategoryImgFile,
  edgestore,
  openNotificationWithIcon,
  editCategoryImg,
}: EditCategoryModalProps) => {
  return (
    <Modal
      title="Edit Category"
      open={isEditCategoryModalOpen}
      onOk={() => {
        setEditCategoryName("");
        setIsEditCategoryModalOpen(false);
        openNotificationWithIcon("success", "update", editCategoryName);
      }}
      onCancel={() => {
        setEditCategoryName("");
        setIsEditCategoryModalOpen(false);
      }}
    >
      <Formik
        initialValues={{
          editCategoryName: editCategoryName,
          editCategoryImageUrl: editCategoryImageUrl,
        }}
        onSubmit={(values) => {
          console.log("edit Drink Form values:", values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="createProductField">
              <label>Category Name:</label>
              <Input
                className="createProductSelect"
                value={editCategoryName}
                onChange={(e) => {
                  setEditCategoryName(e.target.value);
                }}
              />
            </div>

            <br />
            <div className="createProductField">
              <label htmlFor="drinkPrice">Category Image:</label>
              <img
                src={
                  editCategoryImageUrl?.url
                    ? editCategoryImageUrl?.url
                    : editCategoryImg
                }
                alt=""
              />
              <label htmlFor="drinkPrice">Edit category photo(optional):</label>
              <Input
                type="file"
                onChange={(e) => setEditCategoryImgFile(e.target.files?.[0])}
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div className="createProductField">
              <Button
                icon={<UploadOutlined />}
                onClick={async () => {
                  if (editCategoryImgFile) {
                    const res = await edgestore.myPublicImages.upload({
                      file: editCategoryImgFile,
                    });
                    setEditCategoryImageUrl({
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

export default EditCategoryModal;
