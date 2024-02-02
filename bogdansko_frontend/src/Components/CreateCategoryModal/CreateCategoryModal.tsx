import { Modal, Input, Button } from "antd";
import { Formik, FieldArray, Form } from "formik";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

interface CreateCategoryModalProps {
  categoryImgFIle: File | undefined;
  edgestore: any;
  handleAddMoreDrinks: any;
  isOpen: boolean;
  onAddMoreDrinks: any;
  onCategorySubmit: () => void;
  onClose: () => void;
  setCategoryImgFile: (value: File | undefined) => void;
  setCategoryUrlImg: any;
  categoryImgUrl:
    | {
        url: string;
        thumbmailUrl: string | null;
      }
    | undefined;
}
const CreateCategoryModal = ({
  categoryImgFIle,
  edgestore,
  handleAddMoreDrinks,
  isOpen,
  onAddMoreDrinks,
  onCategorySubmit,
  onClose,
  setCategoryImgFile,
  setCategoryUrlImg,
  categoryImgUrl,
}: CreateCategoryModalProps) => {
  return (
    <Modal
      width={600}
      title="Create Category"
      visible={isOpen}
      onOk={onClose}
      onCancel={onClose}
    >
      <Formik
        initialValues={{
          categoryName: "",
          drinks: [{ name: "", price: 0 }],
        }}
        onSubmit={(values, { resetForm }) => {
          console.log("Form values:", values, "category img", categoryImgUrl);
          onCategorySubmit();
          resetForm();
        }}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="createCategoryField">
              <label htmlFor="categoryName" aria-hidden="true">
                Category Name
              </label>

              <Input
                type="text"
                name="categoryName"
                placeholder="Enter Category Name"
                required
              />
            </div>

            <div className="createCategoryField">
              <p>Drinks:</p>
              <FieldArray
                name="drinks"
                render={(arrayHelpers) => (
                  <div>
                    {values.drinks.map((drink, index) => (
                      <div key={index} className="addNewDrink">
                        <Input
                          type="text"
                          placeholder={`New Drink Name ${index + 1}`}
                          name={`drinks.${index}.name`}
                        />
                        <Input
                          className="newPriceInput"
                          type="number"
                          placeholder={`New Drink Price ${index + 1}`}
                          name={`drinks.${index}.price`}
                        />
                        {index === values.drinks.length - 1 && (
                          <button
                            onClick={() => handleAddMoreDrinks(arrayHelpers)}
                          >
                            <PlusOutlined />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
            <div className="createCategoryFieldImage">
              <input
                type="file"
                onChange={(e) => {
                  setCategoryImgFile(e.target.files?.[0]);
                }}
              />
              <Button
                style={{marginLeft: '10px'}}
                icon={<UploadOutlined />}
                onClick={async () => {
                  if (categoryImgFIle) {
                    const res = await edgestore.myPublicImages.upload({
                      file: categoryImgFIle,
                    });
                    setCategoryUrlImg({
                      url: res.url,
                      thumbmailUrl: res.thumbnailUrl,
                    });
                  }
                }}
              >
                Upload
              </Button>
            </div>
            <img className="createCategoryImg" src={categoryImgUrl?.url} alt="" />

            {/* <Button htmlType="submit">Add more drinks</Button> */}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateCategoryModal;
