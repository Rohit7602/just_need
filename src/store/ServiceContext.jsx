import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseCreateClient";

const serviceProvider = createContext();
export const useServiceContext = () => useContext(serviceProvider);

function ServiceContext({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategoriesWithSubcategories() {
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
    }
    getCategoriesWithSubcategories();
  }, []);

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

    const subcategoryData = subCategories.map((subCategoryName) => ({
      parentsCategoryId: category[0].id,
      subCategoryName: subCategoryName,
      description: "",
      isActive: true,
    }));

    const { data: subcategories, error: subcategoryError } = await supabase
      .from("subcategories")
      .insert(subcategoryData);

    if (subcategoryError) {
      console.error("Error inserting subcategories:", subcategoryError);
    } else {
      console.log("Category and subcategories inserted successfully:", {
        category,
        subcategories,
      });
    }

    // const getcategory = category.flat(Infinity)

    // setCategories([...categories , {getcategory , subcategoryData}])
  };

  const updateCategoryName = async (categoryId, updatedName) => {
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
  };

  const toggleCategoryStatus = async (categoryId, isActive) => {
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
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    const { data , error } = await supabase
      .from("subcategories")
      .delete()
      .eq("id", subCategoryId);

    if (error) {
      console.error("Error deleting subcategory:", error);
    } else {
      console.log("Subcategory deleted successfully");
      console.log(data);
      
      const filteredCategories = categories.filter((value)=>value) 
    }
  };

  const handleEditSubCategory = async (subCategoryId, updatedName) => {
    const { error } = await supabase
      .from("subcategories")
      .update({ subCategoryName: updatedName })
      .eq("id", subCategoryId);

    if (error) {
      console.error("Error updating subcategory:", error);
    } else {
      console.log("Subcategory updated successfully");
    }
  };

  console.log(categories);
  

  return (
    <serviceProvider.Provider
      value={{
        categories,
        addCategoriesSubCategories,
        updateCategoryName,
        toggleCategoryStatus,
        handleEditSubCategory,
        handleDeleteSubCategory,
      }}
    >
      {children}
    </serviceProvider.Provider>
  );
}

export default ServiceContext;
