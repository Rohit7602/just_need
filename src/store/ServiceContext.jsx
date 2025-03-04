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
      const { data, error } = await supabase.from("catview").select("*");
      if (error) throw error;

      const formattedData = data.map((category) => ({
        ...category,
        subcategory: category.subcategory ?? [],
      }));

      setCategories(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addSubcategory(categoryId, subcategoryName) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("subcategories")
        .insert([
          {
            catId: categoryId,
            categoryName: subcategoryName,
            isActive: true, // Default to active
            createdAt: Date.now(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Update local state with the new subcategory
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                subcategory: [...(cat.subcategory || []), data],
              }
            : cat
        )
      );
    } catch (error) {
      console.error("Error adding subcategory:", error);
      throw error; // Propagate error to caller
    } finally {
      setLoading(false);
    }
  }

  const addCategoriesSubCategories = async (categoryName, subCategories) => {
    setLoading(true);
    try {
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
      if (!category) throw new Error("Category insertion failed.");

      if (!subCategories?.length) {
        setLoading(false); // ✅ Ensure loader stops
        return;
      }

      const subcategoryData = subCategories.map((name) => ({
        catId: category.id,
        categoryName: name?.categoryName ?? name,
        description: name?.description ?? "",
        isActive: name?.isActive ?? false,
        createdAt: name?.createdAt ?? Date.now(),
      }));

      const { data: insertedSubcategories, error: subCategoryError } =
        await supabase.from("subcategories").insert(subcategoryData).select();

      if (subCategoryError) throw subCategoryError;

      setCategories((prevCategories) => [
        ...prevCategories,
        { ...category, subcategory: insertedSubcategories },
      ]);
    } catch (error) {
      console.error("Error inserting category and subcategories:", error);
    } finally {
      setLoading(false); // ✅ Always stops loading
    }
  };

  const updateSubcategoryName = async (subcategoryId, updatedName) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("subcategories")
        .update({ categoryName: updatedName })
        .eq("id", subcategoryId)
        .select();

      if (error) throw error;

      setCategories((prevCategories) =>
        prevCategories.map((cat) => ({
          ...cat,
          subcategory: cat.subcategory.map((sub) =>
            sub.id === subcategoryId
              ? { ...sub, categoryName: updatedName }
              : sub
          ),
        }))
      );
      return true;
    } catch (error) {
      console.error("Error updating subcategory:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryName = async (categoryId, newName) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .update({ categoryName: newName })
        .eq("id", categoryId)
        .select();
      if (error) throw error;
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId ? { ...cat, categoryName: newName } : cat
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating category:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleCategoryStatus = async (categoryId, newStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("categories")
        .update({ isActive: newStatus })
        .eq("id", categoryId);

      if (error) throw error;

      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === categoryId ? { ...cat, isActive: newStatus } : cat
        )
      );
      return true;
    } catch (error) {
      console.error("Error toggling category status:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleSubcategoryStatus = async (subcategoryId, newStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("subcategories")
        .update({ isActive: newStatus })
        .eq("id", subcategoryId);

      if (error) throw error;

      setCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          subcategory: category.subcategory.map((sub) =>
            sub.id === subcategoryId ? { ...sub, isActive: newStatus } : sub
          ),
        }))
      );
      return true;
    } catch (error) {
      console.error("Error toggling subcategory status:", error.message);
      return false;
    } finally {
      setLoading(false); // ✅ Ensure loading stops
    }
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("subcategories")
        .delete()
        .eq("id", subCategoryId);

      if (error) throw error;

      setCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          subcategory: category.subcategory.filter(
            (sub) => sub.id !== subCategoryId
          ),
        }))
      );
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubCategory = async (subCategoryId, updatedName) => {
    setLoading(true);
    if (!subCategoryId) {
      console.error("Error: subCategoryId is undefined or invalid");
      return;
    }
    try {
      const { error } = await supabase
        .from("subcategories")
        .update({ categoryName: updatedName })
        .eq("id", subCategoryId);

      if (error) throw error;

      setCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          subcategory: category.subcategory.map((sub) =>
            sub.id === subCategoryId
              ? { ...sub, categoryName: updatedName }
              : sub
          ),
        }))
      );
    } catch (error) {
      console.error("Error updating subcategory:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <serviceProvider.Provider
      value={{
        categories,
        addCategoriesSubCategories,
        updateSubcategoryName,
        toggleSubcategoryStatus,
        handleEditSubCategory,
        handleDeleteSubCategory,
        getCategoriesWithSubcategories,
        updateCategoryName,
        toggleCategoryStatus,
        addSubcategory,
      }}
    >
      {children}
      {/* {loading && <Loader />} */}
    </serviceProvider.Provider>
  );
}

export default ServiceContext;
