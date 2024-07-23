import { CircularProgress, TableBody as TableBodyMUI, TableCell, TableRow } from "@mui/material";
import { Empty, Form, message } from "antd";
import ModalForm from "./ModalForm";
import { useState } from "react";
import { missionCategoryKey, useUpdateMissionCategory } from "@/supabase/api/missionCategory/service";
import { useQueryClient } from "@tanstack/react-query";

interface ITableBodyProps {
  data: TMissionCategoryModel[];
  isLoading: boolean;
}

function TableBody({ data, isLoading }: ITableBodyProps) {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const { mutate } = useUpdateMissionCategory();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <TableBodyMUI>
        <TableRow>
          <TableCell colSpan={5} style={{ borderBottom: "none" }}>
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          </TableCell>
        </TableRow>
      </TableBodyMUI>
    );
  }

  if (data.length === 0) {
    return (
      <TableBodyMUI>
        <TableRow>
          <TableCell colSpan={5} style={{ borderBottom: "none" }}>
            <div className="flex justify-center">
              <Empty description="Have no category" />
            </div>
          </TableCell>
        </TableRow>
      </TableBodyMUI>
    );
  }

  return (
    <TableBodyMUI>
      {data.map((row) => (
        <TableRow
          key={row.id}
          className="transition-effect hover:cursor-pointer hover:bg-gray-200"
          onClick={() => {
            form.setFieldValue("name", row.name);
            form.setFieldValue("description", row.description);
            setCurrentID(row.id);
            setOpenModal(true);
          }}
        >
          <TableCell className="w-[30%]">
            <span className="text-start text-ellipsis line-clamp-1">{row.name}</span>
          </TableCell>
          <TableCell>
            <div className="text-sm xl:text-base text-ellipsis line-clamp-1">{row.description}</div>
          </TableCell>
        </TableRow>
      ))}
      <ModalForm
        form={form}
        open={openModal}
        title="Category Update Form"
        okText="Update"
        onCancel={() => setOpenModal(false)}
        onOk={() => {
          form
            .validateFields()
            .then((value) => {
              mutate(
                {
                  id: currentID,
                  request: value,
                },
                {
                  onSuccess: (resp) => {
                    if (resp !== undefined) {
                      message.success("Category is updated");
                      queryClient.invalidateQueries({
                        queryKey: [missionCategoryKey.missionCategories],
                      });
                      form.resetFields();
                      setCurrentID(0);
                      setOpenModal(false);
                    }
                  },
                }
              );
              setOpenModal(false);
            })
            .catch(() => {});
        }}
      />
    </TableBodyMUI>
  );
}

export default TableBody;
