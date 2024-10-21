import { CircularProgress, TableBody as TableBodyMUI, TableCell, TableRow } from "@mui/material";
import { Empty, Form, Popconfirm, message } from "antd";
import ModalForm from "./ModalForm";
import { useState } from "react";
import { missionCategoryKey, useUpdateMissionCategory } from "@/supabase/api/missionCategory/service";
import { useQueryClient } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";

interface ITableBodyProps {
  data: TMissionCategoryModel[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

function TableBody({ data, isLoading, onDelete }: ITableBodyProps) {
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
          className="transition-effect hover:cursor-pointer hover:bg-gray-200 group"
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
          <TableCell
            sx={{
              width: "44px",
              padding: "4px",
            }}
          >
            <Popconfirm
              title="Delete the category"
              description="Are you sure to delete this category?"
              okText="Delete"
              onCancel={(event) => {
                event?.stopPropagation();
              }}
              onConfirm={(event) => {
                event?.stopPropagation();
                onDelete(String(row.id));
              }}
            >
              <div
                className="size-8 flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition-effect hover:bg-red-500/20"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <MdDeleteOutline className="text-red-500 size-5" />
              </div>
            </Popconfirm>
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
