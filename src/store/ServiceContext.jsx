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
        console.log("Categories with subcategories:", data);
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
        tags: [] 
      }
    };
  
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .insert([categoryData])
      .select(); 
  
    if (categoryError) {
      console.error("Error inserting category:", categoryError);
      return;
    }
  
    // Check if category is returned and has data
    if (!category || category.length === 0) {
      console.error("No category data returned after insertion.");
      return;
    }
  
    // Insert subcategories
    const subcategoryData = subCategories.map((subCategoryName) => ({
      parentsCategoryId: category[0].id, 
      subCategoryName: subCategoryName,
      description: "", 
      isActive: true
    }));
  
    const { data: subcategories, error: subcategoryError } = await supabase
      .from('subcategories')
      .insert(subcategoryData);
  
    if (subcategoryError) {
      console.error("Error inserting subcategories:", subcategoryError);
    } else {
      console.log("Category and subcategories inserted successfully:", { category, subcategories });
    }
  };
  return (
    <serviceProvider.Provider value={{ categories,addCategoriesSubCategories }}>
      {children}
    </serviceProvider.Provider>
  );
}

export default ServiceContext;
