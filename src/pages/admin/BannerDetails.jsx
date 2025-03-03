import React, { useEffect, useState } from "react";
import { supabase } from "../../store/supabaseCreateClient";
import { toast } from "react-toastify";
import {
  DeleteSvg,
  EditSvg,
  PlusIcon,
  PluswhiteIcon,
} from "../../assets/icon/Icon";
import { useNavigate } from "react-router-dom";

function BannerDetails() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState(""); // New state for image name
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offer, setOffer] = useState([]);
  const [tag, setTag] = useState("");
  const [discount, setDiscount] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [editingOffer, setEditingOffer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOffer();
  }, []);

  const fetchOffer = async () => {
    try {
      const { data, error } = await supabase.from("offers").select("*");
      if (error) throw error;
      setOffer(data);
    } catch (error) {
      toast.error("Error fetching Offers");
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setImageName(file.name); // Set the new image name
    }
  };

  const handleSubmit = async () => {
    if (!tag || !discount || !service || !description) {
      toast.error("Please fill all fields");
      return;
    }

    if (!editingOffer && !image) {
      toast.error("Please upload an image for new banners");
      return;
    }

    try {
      let uploadedImageUrl = editingOffer ? editingOffer.image : "";

      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `banners/${fileName}`;

        const { data: imageData, error: imageError } = await supabase.storage
          .from("just_need")
          .upload(filePath, image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (imageError) {
          throw new Error("Image upload failed: " + imageError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("just_need")
          .getPublicUrl(imageData.path);

        if (!publicUrlData?.publicUrl) {
          throw new Error("Failed to get public URL");
        }

        uploadedImageUrl = publicUrlData.publicUrl;
      }

      if (editingOffer) {
        const { error } = await supabase
          .from("offers")
          .update({
            tagOffer: tag,
            discount,
            service,
            description,
            image: uploadedImageUrl,
          })
          .eq("id", editingOffer.id);

        if (error) throw error;
        toast.success("Banner updated successfully!");
      } else {
        const { error } = await supabase.from("offers").insert([
          {
            tagOffer: tag,
            discount,
            service,
            description,
            image: uploadedImageUrl,
          },
        ]);

        if (error) throw error;
        toast.success("Banner added successfully!");
      }

      fetchOffer();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("offers").delete().eq("id", id);
      if (error) throw error;
      toast.success("Banner deleted successfully!");
      fetchOffer();
    } catch (error) {
      toast.error("Error deleting banner");
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setEditingOffer(item);
    setTag(item.tagOffer || "");
    setDiscount(item.discount || "");
    setService(item.service || "");
    setDescription(item.description || "");
    setImageUrl(item.image || "");

    // Extract filename from the image URL
    const imagePath = item.image ? item.image.split("/").pop() : "";
    setImageName(imagePath || "Existing Image"); // Set the name from URL or fallback
    setImage(null); // Reset the file input
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setTag("");
    setDiscount("");
    setService("");
    setDescription("");
    setImage(null);
    setImageUrl("");
    setImageName(""); // Reset image name
    setEditingOffer(null);
  };

  function handleAddNew() {
    resetForm(); // Reset all fields including editingOffer
    setIsModalOpen(true);
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mt-5 flex justify-end mx-10">
        <button
          onClick={handleAddNew}
          className="bg-[#0832DE] text-white rounded-[10px] py-2 px-4 flex items-center gap-2"
        >
          <PluswhiteIcon />
          Add New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-5 my-5">
        {offer.map((item) => (
          <div className="relative" key={item.id}>
            <img
              src={item.image}
              alt="Banner"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => handleDelete(item.id)}
            >
              <DeleteSvg />
            </div>
            <div
              className="absolute top-2 right-10 cursor-pointer"
              onClick={() => handleEdit(item)}
            >
              <EditSvg />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[500px] p-6 rounded-lg shadow-lg relative"
          >
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-lg font-medium">
                {editingOffer ? "Edit Banner" : "Add Banner"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-3xl font-light absolute top-1.5 right-5"
              >
                ×
              </button>
            </div>
            <div className="border-b border-gray-300 mb-4"></div>

            <label className="text-gray-600 block mb-2">
              {editingOffer ? "Update Image (optional)" : "Upload Image"}
            </label>
            <div className="flex items-center gap-2 bg-[#F2F2F2] rounded-lg p-2">
              <input
                type="text"
                value={image ? image.name : imageName || "No Image Chosen"}
                className="flex-1 px-4 py-2 bg-transparent border-none text-gray-500"
                disabled
              />
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="fileUpload"
                className="px-2.5 py-1 border border-[#E03F3F] text-[#E03F3F] rounded-lg cursor-pointer flex items-center"
              >
                <PlusIcon className="mr-1" />
                Upload
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-gray-600 block text-base mb-2">
                  Tag
                </label>
                <input
                  type="text"
                  placeholder="Enter Tag Name"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-[#F2F2F2] text-gray-600"
                />
              </div>
              <div>
                <label className="text-gray-600 block text-base mb-2">
                  Discount %
                </label>
                <input
                  type="text"
                  value={discount}
                  placeholder="Discount"
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-[#F2F2F2] text-gray-600"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-600 block text-base mb-2">
                Select Service
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-[#F2F2F2] text-gray-600"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="Painting">Painting</option>
                <option value="Dress">Dress</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-gray-600 block text-base mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg bg-[#F2F2F2] text-gray-600"
                placeholder="Type Here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-[#0832DE] text-white py-2 rounded-lg"
            >
              {editingOffer ? "Update Details" : "Save Details"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerDetails;
