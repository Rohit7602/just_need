import React, { useState, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";
import Logo from "../../assets/logo.png"; // Default logo image
import { toast } from "react-toastify";
import { supabase } from "../../store/supabaseCreateClient"; // Supabase client

function SettinGeneral() {
  // State for form fields
  const [image, setImage] = useState(Logo); // Platform logo
  const [primaryColor, setPrimaryColor] = useState("#6C4DEF"); // Primary theme color
  const [secondaryColor, setSecondaryColor] = useState("#F1F1F1"); // Secondary theme color
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false); // Toggle primary color picker
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false); // Toggle secondary color picker
  const [title, setTitle] = useState(""); // Application title
  const [email, setEmail] = useState(""); // Contact email
  const [whatsapp, setWhatsapp] = useState(""); // WhatsApp number
  const [tollFree, setTollFree] = useState(""); // Toll-free number
  const [supportEmail, setSupportEmail] = useState(""); // Support email
  const [accountDeleteLink, setAccountDeleteLink] = useState(""); // Account deletion URL

  // Refs for color picker elements to detect outside clicks
  const primaryColorPickerRef = useRef(null);
  const secondaryColorPickerRef = useRef(null);

  // Handle image file upload and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create temporary URL for preview
      setImage(imageURL);
    }
  };

  // Fetch existing configuration from Supabase on component mount
  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase.from("Config").select("*"); // Fetch all config data
      if (error) throw error;
      console.log("Fetched Config Data:", data);
      if (data && data.length > 0) {
        const config = data[0]; // Use first record (modify if multiple records exist)
        setImage(config.logo || Logo); // Set logo or default
        setPrimaryColor(config.theme?.primaryColor || "#6C4DEF"); // Set primary color or default
        setSecondaryColor(config.theme?.secondaryColor || "#F1F1F1"); // Set secondary color or default
        setTitle(config.title || ""); // Set title or empty
        setEmail(config.email || ""); // Set email or empty
        setWhatsapp(config.whatsapp || ""); // Set WhatsApp or empty
        setTollFree(config.tollFree || ""); // Set toll-free or empty
        setSupportEmail(config.supportEmail || ""); // Set support email or empty
        setAccountDeleteLink(config.deletionLink || ""); // Set deletion link or empty
      }
    } catch (error) {
      toast.error("Error fetching config: " + error.message);
      console.error("Fetch Error:", error);
    }
  };

  // Update configuration in Supabase
  const handleUpdate = async () => {
    try {
      const newConfig = {
        title: title,
        email: email,
        platformlogo: image, // Note: If using Supabase Storage, replace with uploaded URL
        theme: {
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
        },
        whatsapp: whatsapp,
        tollFree: tollFree,
        deletionLink: accountDeleteLink,
        underMaintenance: false, // Static value; adjust as needed
        supportEmail: supportEmail,
      };

      // Update record in Supabase (assuming ID = 4; adjust as needed)
      const { error } = await supabase
        .from("Config")
        .update(newConfig)
        .eq("id", 4); // Replace '4' with dynamic ID if required

      if (error) throw error;

      toast.success("Data updated in Supabase successfully!");
      console.log("Updated Data:", newConfig);
    } catch (error) {
      toast.error("Error updating data: " + error.message);
      console.error("Update Error:", error);
    }
  };

  // Handle outside clicks to close color pickers
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Close primary picker if click is outside
      if (
        primaryColorPickerRef.current &&
        !primaryColorPickerRef.current.contains(e.target)
      ) {
        setShowPrimaryPicker(false);
      }
      // Close secondary picker if click is outside
      if (
        secondaryColorPickerRef.current &&
        !secondaryColorPickerRef.current.contains(e.target)
      ) {
        setShowSecondaryPicker(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick); // Cleanup on unmount
  }, []);

  return (
    <div className="p-[15px] bg-white rounded-[10px]">
      {/* Action Buttons */}
      <div className="flex items-center justify-end">
        <div>
          <button className="text-base font-normal text-black py-2.5 h-[42px] px-[28px] rounded-[10px] bg-[#F1F1F1] me-[15px]">
            Discard
          </button>
          <button
            onClick={handleUpdate}
            className="text-base font-normal text-white py-2.5 h-[42px] px-[28px] rounded-[10px] bg-[#0832DE]"
          >
            Update
          </button>
        </div>
      </div>
      <div className="mt-[15px] border-t-[1px] border-[#00000033]"></div>

      {/* General Settings Section */}
      <div className="py-5 mt-[15px]">
        <div className="flex items-center flex-wrap justify-between">
          {/* Title Input */}
          <div className="flex items-center justify-between lg:w-[48%] gap-5">
            <label
              htmlFor="title"
              className="min-w-[160px] text-base font-normal text-black"
            >
              Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Application Title"
              className="py-3 h-[42px] px-[15px] w-full rounded-[10px] bg-[#F2F2F2] placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] border-none"
            />
          </div>
          {/* Email Input */}
          <div className="flex items-center justify-between lg:w-[48%] gap-5 mt-4 lg:mt-0">
            <label
              htmlFor="email"
              className="min-w-[160px] text-base font-normal text-black"
            >
              Email Address:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="py-3 h-[42px] px-[15px] w-full rounded-[10px] bg-[#F2F2F2] placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] border-none"
            />
          </div>
        </div>

        {/* Platform Logo Upload */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center mt-[30px]">
          <p className="min-w-[160px] text-base font-normal text-black">
            Platform Logo:
          </p>
          <div className="border-[1px] border-[#00000033] rounded-[10px] w-[222px] h-[64px]">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt="Platform Logo"
            />
          </div>
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex items-center border-[1px] border-[#00000033] rounded-[10px] bg-white ps-4 w-full justify-between xl:w-[500px]"
          >
            <input
              type="text"
              value={image}
              readOnly
              className="px-2 w-[250px] xl:w-[356px] text-sm text-gray-600 bg-white pe-4 py-3 h-[42px] outline-none border-none"
            />
            <div className="bg-[#335ACB1A] border-s-[1px] border-[#00000033] rounded-[10px] py-3 h-[42px] px-4 text-sm font-medium text-gray-700">
              Upload Image
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Platform Appearance (Color Pickers) */}
        <div className="flex flex-col lg:flex-row gap-5 lg:items-center mt-[30px]">
          <p className="min-w-[160px] text-base font-normal text-black">
            Platform Appearance:
          </p>
          {/* Primary Color */}
          <div className="flex items-center gap-2.5">
            <p className="min-w-[160px] text-base font-normal text-black">
              Primary Colour
            </p>
            <button
              className="px-[50px] lg:px-[15px] xl:px-[50px] py-3 h-[42px] rounded-[10px] text-white text-sm font-normal"
              style={{ backgroundColor: primaryColor }}
              onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
            >
              {primaryColor}
            </button>
            {showPrimaryPicker && (
              <div ref={primaryColorPickerRef} className="absolute z-10">
                <ChromePicker
                  color={primaryColor}
                  onChange={(color) => setPrimaryColor(color.hex)}
                />
              </div>
            )}
          </div>
          {/* Secondary Color */}
          <div className="flex items-center gap-2.5">
            <p className="min-w-[160px] text-base font-normal text-black">
              Secondary Colour
            </p>
            <button
              className="px-[50px] lg:px-[15px] xl:px-[50px] py-3 h-[42px] rounded-[10px] text-black text-sm font-normal"
              style={{ backgroundColor: secondaryColor }}
              onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
            >
              {secondaryColor}
            </button>
            {showSecondaryPicker && (
              <div ref={secondaryColorPickerRef} className="absolute z-10">
                <ChromePicker
                  color={secondaryColor}
                  onChange={(color) => setSecondaryColor(color.hex)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Support and Assistance Section */}
      <div className="my-[15px] border-t-[1px] border-[#00000033]"></div>
      <h1 className="font-medium text-xl text-black leading-[35px]">
        Support and Assistance
      </h1>
      <p className="text-base font-normal opacity-70 text-black">
        Manage your platform Appearance
      </p>
      <div className="py-5 mt-[15px]">
        {/* WhatsApp Support */}
        <div className="flex items-center justify-between gap-5">
          <label
            htmlFor="whatsapp"
            className="text-base font-normal text-[#000000] min-w-[160px] xl:min-w-[260px]"
          >
            Whatsapp Support:
          </label>
          <input
            onInput={
              (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, "")) // Allow only numbers
            }
            id="whatsapp"
            name="whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Enter Whatsapp Number"
            className="px-4 py-2.5 h-[42px] placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] w-full border-[1px] border-[#00000033] rounded-[10px]"
          />
        </div>
        {/* Toll-Free Number */}
        <div className="flex items-center justify-between gap-5 mt-5">
          <label
            htmlFor="tollFree"
            className="text-base font-normal text-[#000000] min-w-[160px] xl:min-w-[260px]"
          >
            Tollfree Number:
          </label>
          <input
            id="tollFree"
            name="tollFree"
            value={tollFree}
            onChange={(e) => setTollFree(e.target.value)}
            placeholder="Enter Tollfree Number"
            className="px-4 py-2.5 h-[42px] placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] w-full border-[1px] border-[#00000033] rounded-[10px]"
          />
        </div>
        {/* Support Email */}
        <div className="flex items-center justify-between gap-5 mt-5">
          <label
            htmlFor="supportEmail"
            className="text-base font-normal text-[#000000] min-w-[160px] xl:min-w-[260px]"
          >
            Support Email:
          </label>
          <input
            id="supportEmail"
            name="supportEmail"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            placeholder="support@example.com"
            className="px-4 py-2.5 h-[42px] placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] w-full border-[1px] border-[#00000033] rounded-[10px]"
          />
        </div>
        {/* Account Deletion Link */}
        <div className="flex items-center justify-between gap-5 mt-5">
          <label
            htmlFor="accountDeleteLink"
            className="text-base font-normal text-[#000000] min-w-[160px] xl:min-w-[260px]"
          >
            Account Deletion Link:
          </label>
          <input
            id="accountDeleteLink"
            name="accountDeleteLink"
            value={accountDeleteLink}
            onChange={(e) => setAccountDeleteLink(e.target.value)}
            placeholder="Enter Account Deletion Url"
            className="px-4 py-2.5 h-[42px] placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] w-full border-[1px] border-[#00000033] rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
}

export default SettinGeneral;
