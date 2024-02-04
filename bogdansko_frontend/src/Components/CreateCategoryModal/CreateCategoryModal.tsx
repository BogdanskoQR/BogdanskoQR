import { Modal, Input, Button } from "antd";
import { Formik, FieldArray, Form, Field } from "formik";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

interface CreateCategoryModalProps {
  categoryImgFIle: File | undefined;
  edgestore: any;
  handleAddMoreDrinks: any;
  isOpen: boolean;
  onAddMoreDrinks: any;
  onCategorySubmit: (value: any) => void;
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
    <Formik
      initialValues={{
        categoryName: "",
        drinks: [{ name: "", price: 0 }],
        img: categoryImgUrl?.url,
      }}
      onSubmit={(values) => {
        console.log("pavic values", values);
        onCategorySubmit(values);
        setTimeout(()=> {
          setCategoryImgFile(undefined)
          setCategoryUrlImg('')
        },1000)
       
      }}
    >
      {({ values, handleSubmit, setFieldValue, resetForm }) => (
        <Modal
          width={600}
          title="Create Category"
          open={isOpen}
          onOk={() => {
            handleSubmit();
            onClose();
            setTimeout(() => {
              resetForm();
            }, 1000);
          }}
          onCancel={() => {
            onClose();
          }}
        >
          <Form onSubmit={handleSubmit}>
            <div className="createCategoryField">
              <label htmlFor="categoryName" aria-hidden="true">
                Category Name
              </label>

              <Input
                type="text"
                name="categoryName"
                onChange={(e) => setFieldValue("categoryName", e.target.value)}
                value={values.categoryName}
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
                        <Field
                          as={Input}
                          type="text"
                          placeholder={`New Drink Name ${index + 1}`}
                          name={`drinks.${index}.name`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFieldValue(
                              `drinks.${index}.name`,
                              e.target.value
                            )
                          }
                        />
                        <Field
                          as={Input}
                          className="newPriceInput"
                          type="number"
                          placeholder={`New Drink Price ${index + 1}`}
                          name={`drinks.${index}.price`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFieldValue(
                              `drinks.${index}.price`,
                              e.target.value
                            )
                          }
                        />
                        {index === values.drinks.length - 1 && (
                          <Button
                            onClick={() => handleAddMoreDrinks(arrayHelpers)}
                          >
                            <PlusOutlined />
                          </Button>
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
                style={{ marginLeft: "10px" }}
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
                    setFieldValue("img", res.url);
                  }
                }}
              >
                Upload
              </Button>
            </div>
            <img
              className="createCategoryImg"
              src={categoryImgUrl?.url}
              alt=""
            />

            {/* <Button htmlType="submit">Add more drinks</Button> */}
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default CreateCategoryModal;
