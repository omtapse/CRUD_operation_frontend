import { useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function TextEditor({ quill, quillRef }) {
  useEffect(() => {
    if (quill) quill.setText("Product Description......");
  }, []);

  return (
    <div style={{ width: "600px", height: "250px" }}>
      <div ref={quillRef} />
    </div>
  );
}
