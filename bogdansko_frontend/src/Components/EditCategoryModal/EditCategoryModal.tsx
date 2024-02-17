import { UploadOutlined } from "@ant-design/icons";
import { Modal, Input, Button } from "antd";
import { Formik, Form } from "formik";
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
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
  editCategoryImg: string | undefined;
  handleUpdateCategory: (value:any) => void;
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
  editCategoryImg,
  handleUpdateCategory
}: EditCategoryModalProps) => {
  return (
    <Formik
      initialValues={{
        editCategoryName: editCategoryName,
        editCategoryImageUrl: editCategoryImageUrl ? editCategoryImageUrl : editCategoryImg,
        productView: true
      }}
      onSubmit={(values) => {
        handleUpdateCategory({
          editCategoryName: values.editCategoryName ? values.editCategoryName : editCategoryName,
          editCategoryImageUrl: values.editCategoryImageUrl ? values.editCategoryImageUrl : editCategoryImg,
          productView: values.productView
        });        
        setIsEditCategoryModalOpen(false);
      }}
      
    >
      {({ values, handleChange, handleSubmit,setFieldValue }) => (
        <Modal
          title="Edit Category"
          open={isEditCategoryModalOpen}
          onOk={()=> {handleSubmit()}}
          onCancel={() => {
            setEditCategoryName("");
            setIsEditCategoryModalOpen(false);
            setEditCategoryImageUrl(undefined)
          }}
        >
          <Form onSubmit={handleSubmit}>
            <div className="createProductField">
              <label>Category Name:</label>
              <Input
                className="createProductSelect"
                value={editCategoryName}
                onChange={(e) => {
                  setEditCategoryName(e.target.value)
                  setFieldValue("editCategoryName",e.target.value);
                }}
              />
            </div>
            <div className="viewProductPhotos">
              <label>View Product Photos:</label>
              <Checkbox value={values.productView} onChange={(value)=> setFieldValue('productView',value.target.checked)}>Checkbox</Checkbox>

            </div>
            <br />
            <div className="createProductField">
              <label htmlFor="drinkPrice">Category Image:</label>
              <img
                src={
                  editCategoryImageUrl?.url ? editCategoryImageUrl.url : editCategoryImg
                }
                alt=""
              />
              <label htmlFor="drinkPrice">
                Edit category photo(optional):
              </label>
              <Input
                type="file"
                onChange={(e) => {
                  handleChange(e);
                  setEditCategoryImgFile(e.target.files?.[0]);
                }}
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
                    setFieldValue('editCategoryImageUrl', res.url)
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

export default EditCategoryModal;
