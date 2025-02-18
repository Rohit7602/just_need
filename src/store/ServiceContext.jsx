import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseCreateClient";
import Loader from "../Components/Common/Loader";

const serviceProvider = createContext();
export const useServiceContext = () => useContext(serviceProvider);

function ServiceContext({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCategoriesWithSubcategories() {
    setLoading(true);

    try {
      //  Fetch categories with subcategories
      const { data, error } = await supabase.from("categories").select(`
          id,
          categoryName,
          isActive,
          featured,
          metadata,
          subcategories(*)
        `);

      if (error) throw error;

      console.log("Categories with subcategories fetched:", data);

      setCategories(data); // Store data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const addCategoriesSubCategories = async (categoryName, subCategories) => {
    try {
      // Step 1: Insert Category
      const { data: category, error: categoryError } = await supabase
        .from("categories")
        .insert([
          {
            categoryName: categoryName,
            isActive: true,
            featured: false,
            metadata: JSON.stringify({
              totalListings: 0,
              averageRating: 0,
              totalFavorites: 0,
              tags: [],
            }),
          },
        ])
        .select()
        .single(); // Ensure we get a single category object

      if (categoryError) throw categoryError;
      if (!category) throw new Error("Category insertion failed.");

      console.log("Category inserted:", category);

      //  Step 2: Prepare and Insert Subcategories
      if (subCategories.length === 0) {
        console.log("No subcategories to insert.");
        return;
      }

      const subcategoryData = subCategories.map((subCategoryName) => ({
        parentsCategoryId: category.id, // Link to category ID
        subCategoryName: subCategoryName,
        description: "",
        isActive: true,
      }));

      console.log("Inserting subcategories...");

      const { data: subcategories, error: subcategoryError } = await supabase
        .from("subcategories")
        .insert(subcategoryData)
        .select();

      if (subcategoryError) throw subcategoryError;
      if (!subcategories) throw new Error("Subcategory insertion failed.");

      console.log("✅ Subcategories inserted:", subcategories);

      //  Step 3: Update State with New Data
      setCategories((prevCategories) => [
        ...prevCategories,
        {
          ...category, // Use actual category data
          subcategories: subcategories.map((sub) => ({
            id: sub.id,
            subCategoryName: sub.subCategoryName,
            description: sub.description,
            isActive: sub.isActive,
            parentsCategoryId: sub.parentsCategoryId,
          })),
        },
      ]);

      console.log("✅ Data successfully added to state.");
    } catch (error) {
      console.error("Error inserting category and subcategories:", error);
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
