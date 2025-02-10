import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseCreateClient";
import Loader from "../Components/Common/Loader"

const serviceProvider = createContext();
export const useServiceContext = () => useContext(serviceProvider);

function ServiceContext({ children }) {
  const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true); 

   async function getCategoriesWithSubcategories() {
    setLoading(true)
    const { data, error } = await supabase.from("categories").select(`
              id,
              categoryName,
              isActive,
              featured,
              metadata,
              subcategories:subcategories(*)
          `);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setCategories(data);
    }
    setLoading(false)
  }

  const addCategoriesSubCategories = async (categoryName, subCategories) => {
    const categoryData = {
      categoryName: categoryName,
      isActive: true,
      featured: false,
      metadata: {
        totalListings: 0,
        averageRating: 0,
        totalFavorites: 0,
        tags: [],
      },
    };
  
    // Insert category and get the response
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .insert([categoryData])
      .select();
  
    if (categoryError) {
      console.error("Error inserting category:", categoryError);
      return;
    }
  
    if (!category || category.length === 0) {
      console.error("No category data returned after insertion.");
      return;
    }
  
    // Prepare subcategory data with category ID
    const subcategoryData = subCategories.map((subCategoryName) => ({
      parentsCategoryId: category[0].id,
      subCategoryName: subCategoryName,
      description: "",
      isActive: true,
    }));
  
    // Insert subcategories and get actual IDs
    const { data: subcategories, error: subcategoryError } = await supabase
      .from("subcategories")
      .insert(subcategoryData)
      .select();
  
    if (subcategoryError) {
      console.error("Error inserting subcategories:", subcategoryError);
      return;
    }
  
    console.log("Category and subcategories inserted successfully:", {
      category,
      subcategories,
    });
  
    // Update state with real subcategory IDs
    setCategories((prevCategories) => [
      ...prevCategories,
      { 
        ...categoryData, 
        id: category[0].id, // Use real category ID
        subcategories: subcategories.map((sub) => ({
          id: sub.id, // Assign actual subcategory ID
          subCategoryName: sub.subCategoryName,
          description: sub.description,
          isActive: sub.isActive,
          parentsCategoryId: sub.parentsCategoryId, // Ensure relationship
        })),
      },
    ]);
  };
  

  const updateCategoryName = async (categoryId, updatedName) => {
    setLoading(true)
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
   setLoading(false)
  };

  const toggleCategoryStatus = async (categoryId, isActive) => {
    setLoading(true)
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
    setLoading(false)
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    setLoading(true)
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
    setLoading(false)
  };
  

  const handleEditSubCategory = async (subCategoryId, updatedName) => {
    if (!subCategoryId) {
      console.error("Error: subCategoryId is undefined or invalid");
      console.log(subCategoryId)
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
            sub.id === subCategoryId ? { ...sub, subCategoryName: updatedName } : sub
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
