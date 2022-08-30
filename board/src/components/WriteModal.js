import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import { render } from "@testing-library/react";

const UpdateBtn = styled.button`
  margin-top: 3em;
`;

function WriteModal({
  modalIsOpen,
  setIsOpen,
  closeModal,
  dataSource,
  setDataSource,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  function closeModal() {
    const htmlParse = watch("content").replace(/<[^>]*>?/g, "");
    setDataSource((prev) => [
      ...prev,
      {
        key: String(dataSource.length + 1),
        writer: watch("author"),
        content: htmlParse,
        data: new Date().toLocaleString(),
        edit: 32,
      },
    ]);
    setValue("content", "");
    reset({ author: "" });

    setIsOpen(false);
  }

  useEffect(() => {
    register("content");
  }, [register]);

  const editorContent = watch("content");

  const onEditorStateChange = (editorState, b, c, d) => {
    setValue("content", editorState);
    // console.log("b", b);
    // console.log("c", c);
    // console.log("d", d);
  };

  const onChangeSelection = (range, source, editor) => {
    console.log(range);
    console.log(source);
    console.log(editor);
  };

  return (
    <Modal isOpen={modalIsOpen} ariaHideApp={false}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>작성자</h1>
        <input {...register("author")} />
        <h1>작성 내용</h1>
        <ReactQuill
          theme="snow"
          onChange={onEditorStateChange}
          value={editorContent}
          onChangeSelection={onChangeSelection}
        />
        <UpdateBtn type="submit" onClick={closeModal}>
          작성하기
        </UpdateBtn>
      </form>
    </Modal>
  );
}

export default WriteModal;
