import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, ColorPicker } from "antd";
import React from "react";
import { Category } from "../Types/types";
import { NotificationType } from "@/app/dashboard/[id]/page";

interface EditMenuModalProps {
  isEditMenuModalOpen: boolean;
  menuBackgroundColor: string | undefined;
  categoryTitleBackgroundColor: string | undefined;
  categoryTextColor: string | undefined;
  closeModal: (modalType: "category" | "drink" | "editMenu") => void;
  openNotificationWithIcon: (type: NotificationType, modalType: string) => void;
  headerImgUrl?:
    | {
        url: string;
        thumbmailUrl: string | null;
      }
    | undefined;
  company?: { headerImage: string };
  headerTextColor: string | undefined;
  categories?: any[];
  setHeaderImgFile: (file: File | undefined) => void;
  headerImgFile?: File | null;
  setHeaderImgUrl: (url: { url: string; thumbmailUrl: string }) => void;
  edgestore: any;
  setMenuBackgroundColor: (color: string) => void;
  setCategoryTitleBackgroundColor: (color: string) => void;
  setCategoryTextColor: (color: string) => void;
  setHeaderTextColor: (color: string) => void;
  handleUpdateEditMenu: (value:any) => void
}
const EditMenuModal = ({
  isEditMenuModalOpen,
  menuBackgroundColor,
  categoryTitleBackgroundColor,
  categoryTextColor,
  closeModal,
  openNotificationWithIcon,
  headerImgUrl,
  company,
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
  handleUpdateEditMenu
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
          menuBackgroundColor,categoryTitleBackgroundColor,categoryTextColor,headerImgUrl,company?.headerImage
        );
        handleUpdateEditMenu({menuBackgroundColor,categoryTitleBackgroundColor,categoryTextColor,headerImgUrl})
      }}
      onCancel={() => closeModal("editMenu")}
    >
      <div className="editMenuModalWrapper">
        <div className="leftSideEditMenu">
          <div className="menuPageWrapper">
            <div className="coffeeImage">
              <img
                src={
                  headerImgUrl?.url ? headerImgUrl.url : company?.headerImage
                }
                alt="companyImage"
              />
            </div>
            <div className="heading">
              <div className="headingName">
                <h2 style={{ color: headerTextColor }}>Maxim</h2>
                <h3 style={{ color: headerTextColor }}>Coffee Bar</h3>
              </div>
            </div>
            <div
              className="categoriesWrapper"
              style={{ background: menuBackgroundColor }}
            >
              {categories?.slice(0, 3).map((oneCategory: Category) => (
                <div
                  key={oneCategory.categoryName}
                  className="oneCategorieCart"
                >
                  <div
                    className="categorieTitle"
                    style={{ background: categoryTitleBackgroundColor }}
                  >
                    <h3 style={{ color: categoryTextColor }}>
                      {oneCategory.categoryName}
                    </h3>
                  </div>
                  <img src={oneCategory.categoryBackgroundImg} alt="img" />
                </div>
              ))}
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
            <div className="categoryTitleColor">
              <p>Category Title Color</p>
              <ColorPicker
                defaultValue="linear-gradient(to top, #dfe6e9, #d6e2eb)"
                value={categoryTitleBackgroundColor}
                onChange={(color) =>
                  setCategoryTitleBackgroundColor(color.toHexString())
                }
              />
            </div>
            <div className="menuBackgorundColor">
              <p>Category Title Text Color</p>
              <ColorPicker
                defaultValue="#c8d0db"
                value={categoryTextColor}
                onChange={(color) => setCategoryTextColor(color.toHexString())}
              />
            </div>
            <div className="menuBackgorundColor">
              <p>Header Title Text Color</p>
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
