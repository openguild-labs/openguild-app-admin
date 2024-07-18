import { Form, FormInstance, Input, Modal, ModalProps } from "antd";

interface IModalFormProps extends ModalProps {
  form: FormInstance;
}

function ModalForm({ form, ...props }: IModalFormProps) {
  return (
    <Modal centered closeIcon={null} {...props}>
      <Form name="category_creation" form={form}>
        <h4 className="text-sm xl:text-base text-black font-bold mb-1">Name</h4>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input category name",
            },
          ]}
        >
          <Input placeholder="Input category name" className="text-sm xl:text-base" />
        </Form.Item>
        <h4 className="text-sm xl:text-base text-black font-bold mb-1">Description</h4>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please input category description",
            },
          ]}
        >
          <Input.TextArea placeholder="Input category description" className="text-sm xl:text-base" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalForm;
