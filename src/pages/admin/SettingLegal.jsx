import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function SettingLegal() {
  const [serviceData, setServiceData] = useState(
    "Terms of Services"
  );
  const [privacyData, setPrivacyData] = useState(
    "Privacy Police"
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    history: {
      delay: 1000,
      maxStack: 500,
    },
  };

  const formats = [
    "header",
    "font",
    "list",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "link",
    "blockquote",
    "code-block",
    "color",
    "background",
  ];

  return (
    <div className="p-[15px]">
      <div className="flex items-center justify-end">
        <div>
          <button className="text-base font-normal text-black py-2.5 h-[42px] px-[28px] rounded-[10px] bg-[#F1F1F1] me-[15px]">
            Discard
          </button>
          <button className="text-base font-normal text-white py-2.5 h-[42px] px-[28px] rounded-[10px] bg-[#0832DE]">
            Update
          </button>
        </div>
      </div>
      <div className="my-[15px] border-t-[1px] border-[#00000033]"></div>
      <p className="text-base font-medium text-black">Terms of Services</p>
      <div className="mt-[15px]">
        <ReactQuill
          value={serviceData}
          onChange={setServiceData}
          modules={modules}
          formats={formats}
          theme="snow"
          className="bg-white border  border-gray-300 rounded-lg min-h-[300px] max-h-[500px]"
        />
      </div>
      <p className="text-base font-medium text-black mt-[15px]">Privacy Policy</p>
      <div className="mt-[15px]">
        <ReactQuill
          value={privacyData}
          onChange={setPrivacyData}
          modules={modules}
          formats={formats}
          theme="snow"
          className="bg-white border  border-gray-300 rounded-lg  min-h-[300px] max-h-[500px]"
        />
      </div>
    </div>
  );
}

export default SettingLegal;
