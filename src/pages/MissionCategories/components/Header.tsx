import { missionCategoryKey, useCreateMissionCategory } from "@/supabase/api/missionCategory/service";
import { Breadcrumbs, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, message } from "antd";
import { useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import ModalForm from "./ModalForm";

function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const { mutate } = useCreateMissionCategory();
  const queryClient = useQueryClient();
  return (
    <div className="flex items-center justify-between h-10 mb-4">
      <div className="flex items-end">
        <h1 className="text-primary-color font-bold text-2xl xl:text-3xl pr-3 mr-3 border-r-2 border-primary-color">Mission Category</h1>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">
            <span className="text-base xl:text-lg">list</span>
          </Typography>
        </Breadcrumbs>
      </div>
      <Button type="primary" icon={<GrFormAdd />} className="h-9 rounded-lg" onClick={() => setOpenModal(true)}>
        <span className="lowercase text-sm xl:text-base font-normal">Add category</span>
      </Button>

      <ModalForm
        form={form}
        open={openModal}
        title="Category Creation Form"
        onCancel={() => setOpenModal(false)}
        okText="Create"
        onOk={() => {
          form
            .validateFields()
            .then((value: TMissionCategoryCreation) => {
              mutate(value, {
                onSuccess: (resp) => {
                  if (resp !== undefined) {
                    message.success("Category is created");
                    queryClient.invalidateQueries({
                      queryKey: [missionCategoryKey.missionCategories],
                    });
                    form.resetFields();
                    setOpenModal(false);
                  }
                },
              });
            })
            .catch(() => {});
        }}
      />
    </div>
  );
}

export default Header;
