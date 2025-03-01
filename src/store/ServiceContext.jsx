import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseCreateClient";
import Loader from "../Components/Common/Loader";

const serviceProvider = createContext();
export const useServiceContext = () => useContext(serviceProvider);

function ServiceContext({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(categories, "categories main here");

  async function getCategoriesWithSubcategories() {
    try {
      const { data, error } = await supabase.from("catview").select("*");

      if (error) throw error;
      
      // console.log(" Categories with subcategories fetched:", data);

      // Ensure subcategories are always an array
      const formattedData = data.map((category) => ({
        ...category,
        subcategories: category.subcategories ?? [], //  Always ensure an array
      }));

      setCategories(formattedData); // Store formatted data in state
    } catch (error) {
      console.error(" Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const addCategoriesSubCategories = async (categoryName, subCategories) => {
    try {
      //  Insert Category
      const { data: category, error: categoryError } = await supabase
        .from("categories")
        .insert([
          {
            categoryName,
            isActive: true,
            featured: false,
            metadatas: {
              totalListings: 0,
              averageRating: 0,
              totalFavorites: 0,
              tags: [],
            },
          },
        ])
        .select()
        .single();

      if (categoryError) throw categoryError;
      if (!category) throw new Error(" Category insertion failed.");

      console.log(" Category inserted:", category);

      //  Ensure subCategories exist
      if (!subCategories?.length) return;

      //  Correcting Data Mapping
      const subcategoryData = subCategories.map((name) => ({
        catId: category.id,
        categoryName: name?.categoryName ?? name,
        description: name?.description ?? "",
        isActive: name?.isActive ?? false,
        createdAt: name?.createdAt ?? Date.now(),
      }));

      console.log(subcategoryData, " Subcategory data before insert");

      const { data: insertedSubcategories, error: subCategoryError } =
        await supabase.from("subcategories").insert(subcategoryData).select();

      if (subCategoryError) throw subCategoryError;

      console.log(" Subcategories inserted:", insertedSubcategories);

      //  Update State Correctly
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === category.id
            ? {
                ...cat,
                subcategories: [
                  ...(cat.subcategories || []),
                  ...insertedSubcategories,
                ],
              }
            : cat
        )
      );

      console.log(" Data successfully added to state.");
    } catch (error) {
      console.error(" Error inserting category and subcategories:", error);
    }
  };

  const updateCategoryName = async (categoryId, updatedName) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .update({ categoryName: updatedName })
      .eq("id", categoryId)
      .select();

    if (error) {
      console.error("Error updating category:", error);
    } else {
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === categoryId ? { ...cat, categoryName: updatedName } : cat
        )
      );
    }
    setLoading(false);
  };

  const toggleCategoryStatus = async (categoryId, isActive) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .update({ isActive: isActive })
      .eq("id", categoryId)
      .select();

    if (error) {
      console.error("Error toggling category status:", error);
    } else {
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === categoryId ? { ...cat, isActive: isActive } : cat
        )
      );
    }
    setLoading(false);
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    setLoading(true);
    const { error } = await supabase
      .from("subcategories")
      .delete()
      .eq("id", subCategoryId);

    if (error) {
      console.error("Error deleting subcategory:", error);
    } else {
      console.log("Subcategory deleted successfully");

      setCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          subcategories: category.subcategories.filter(
            (sub) => sub.id !== subCategoryId
          ),
        }))
      );
    }
    setLoading(false);
  };

  const handleEditSubCategory = async (subCategoryId, updatedName) => {
    if (!subCategoryId) {
      console.error("Error: subCategoryId is undefined or invalid");
      console.log(subCategoryId);
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("subcategories")
      .update({ subCategoryName: updatedName })
      .eq("id", subCategoryId);

    if (error) {
      console.error("Error updating subcategory:", error);
    } else {
      console.log("Subcategory updated successfully");

      setCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          subcategories: category.subcategories.map((sub) =>
            sub.id === subCategoryId
              ? { ...sub, subCategoryName: updatedName }
              : sub
          ),
        }))
      );
    }

    setLoading(false);
  };

  return (
    <serviceProvider.Provider
      value={{
        categories,
        addCategoriesSubCategories,
        updateCategoryName,
        toggleCategoryStatus,
        handleEditSubCategory,
        handleDeleteSubCategory,
        getCategoriesWithSubcategories,
      }}
    >
      {children}
      {loading && <Loader />}
    </serviceProvider.Provider>
  );
}

export default ServiceContext;
