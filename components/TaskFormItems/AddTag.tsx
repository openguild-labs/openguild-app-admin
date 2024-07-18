import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Flex, Input, Tag, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { intentLinkParamsStore, setParamsValue } from "@/redux/slides/intentLinkParams";

function AddTag() {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const {
    params: { hashtags },
  } = useAppSelector(intentLinkParamsStore);
  const dispatch = useAppDispatch();

  const setTags = (newTags: string[]) => {
    dispatch(setParamsValue({ hashtags: newTags }));
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = hashtags.filter((tag: string) => tag !== removedTag);
    setTags(newTags);
  };

  const handleInputConfirm = () => {
    if (inputValue && !hashtags.includes(inputValue)) {
      setTags([...hashtags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputConfirm = () => {
    const newTags = [...hashtags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  return (
    <Flex gap="4px 0" wrap>
      {hashtags.map<React.ReactNode>((tag: string, index: number) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              value={editInputValue}
              onChange={(e) => {
                setEditInputValue(e.target.value);
              }}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
              className="h-6 text-xs xl:text-sm"
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={true}
            className="text-xs xl:text-sm flex-center"
            style={{ userSelect: "none" }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="h-6 w-[80px] text-xs xl:text-sm"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag
          className="h-6 border border-dashed text-xs xl:text-sm flex-center"
          icon={<PlusOutlined />}
          onClick={() => {
            setInputVisible(true);
          }}
        >
          New Tag
        </Tag>
      )}
    </Flex>
  );
}

export default AddTag;
