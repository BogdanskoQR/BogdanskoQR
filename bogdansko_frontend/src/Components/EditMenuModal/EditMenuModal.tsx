import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, ColorPicker } from "antd";
import React from "react";
import { Category, categoriesTest } from "../Types/types";

interface EditMenuModalProps {
  isEditMenuModalOpen: boolean;
  menuBackgroundColor: string | undefined;
  categoryTitleBackgroundColor: string | undefined;
  categoryTextColor: string | undefined;
  closeModal: (modalType: "category" | "drink" | "editMenu") => void;
  headerImgUrl?:
    | {
        url: string;
        thumbmailUrl: string | null;
      }
    | undefined;
  companyHeaderImg?: string;
  headerTextColor: string | undefined;
  categories?: Category[] | undefined;
  setHeaderImgFile: (file: File | undefined) => void;
  headerImgFile?: File | null;
  setHeaderImgUrl: (url: { url: string; thumbmailUrl: string }) => void;
  edgestore: any;
  setMenuBackgroundColor: (color: string) => void;
  setCategoryTitleBackgroundColor: (color: string) => void;
  setCategoryTextColor: (color: string) => void;
  setHeaderTextColor: (color: string) => void;
  handleUpdateEditMenu: (value: any) => void;
}
const EditMenuModal = ({
  isEditMenuModalOpen,
  menuBackgroundColor,
  categoryTitleBackgroundColor,
  categoryTextColor,
  closeModal,
  headerImgUrl,
  companyHeaderImg,
  headerTextColor,
  categories,
  setHeaderImgFile,
  headerImgFile,
  setHeaderImgUrl,
  edgestore,
  setMenuBackgroundColor,
  setCategoryTitleBackgroundColor,
  setCategoryTextColor,
  setHeaderTextColor,
  handleUpdateEditMenu,
}: EditMenuModalProps) => {
  return (
    <Modal
      width={1000}
      className="editMenuModal"
      title="Edit Menu"
      open={isEditMenuModalOpen}
      onOk={() => {
        closeModal("editMenu");
        console.log(
          "pavic",
          menuBackgroundColor,
          categoryTitleBackgroundColor,
          categoryTextColor,
          headerImgUrl,
          companyHeaderImg
        );
        handleUpdateEditMenu({
          menuBackgroundColor,
          categoryTitleBackgroundColor,
          categoryTextColor,
          headerImgUrl,
        });
      }}
      onCancel={() => closeModal("editMenu")}
    >
      <div className="editMenuModalWrapper" >
        <div className="leftSideEditMenu">
        <div className="menuLandingPageWrapper" >
            <div className="landingPageMiddleSection" style={{ backgroundImage: headerImgUrl?.url ? `url(${headerImgUrl.url})` : `url(${companyHeaderImg})` }}>
              <h1 style={{color: categoryTextColor}}>Welcome to Maxim </h1>
              <h1 style={{color: categoryTextColor}}>Caffe</h1>
              <p style={{ marginTop: "10px", color: categoryTextColor }}>
                Explore out wide range of premium coffee and tea
              </p>
              <p style={{color: categoryTextColor}}>products</p>
              <button style={{backgroundColor: headerTextColor, color: categoryTextColor}}>View All Products</button>
            </div>
            <div className="categoriesList" style={{backgroundColor: menuBackgroundColor}}>
              <h2 style={{color: categoryTextColor}}>Categories</h2>
              <div className="categoires">
                {categoriesTest?.slice(0,2).map((category: Category) => (
                  <div className="oneCategory">
                    <img src={category.backgroundImage} alt="categoryImage" />
                    <h4>{category.name}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="ladningPageFooter">
              <p>© 2023 Maxim Coffee. All rights reserved.</p>
            </div>
          </div>
        </div>
        <div className="rightSideEditMenu">
          <div className="editSettingWrapper">
            <div className="menuBackgorundColor">
              <p>Change Header Picture</p>
              <input
                type="file"
                onChange={(e) => {
                  setHeaderImgFile(e.target.files?.[0]);
                }}
              />
              <Button
                icon={<UploadOutlined />}
                onClick={async () => {
                  if (headerImgFile) {
                    const res = await edgestore.myPublicImages.upload({
                      file: headerImgFile,
                    });
                    setHeaderImgUrl({
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
            <div className="menuBackgorundColor">
              <p>Menu Background Color</p>
              <ColorPicker
                value={menuBackgroundColor}
                defaultValue="linear-gradient(to right, #ffffff, #dfe6e9)"
                onChange={(color) =>
                  setMenuBackgroundColor(color.toHexString())
                }
              />
            </div>
            <div className="menuBackgorundColor">
              <p>Text Color</p>
              <ColorPicker
                defaultValue="#c8d0db"
                value={categoryTextColor}
                onChange={(color) => setCategoryTextColor(color.toHexString())}
              />
            </div>
            <div className="menuBackgorundColor">
              <p>Button Color</p>
              <ColorPicker
                defaultValue="#c8d0db"
                value={headerTextColor}
                onChange={(color) => setHeaderTextColor(color.toHexString())}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditMenuModal;
