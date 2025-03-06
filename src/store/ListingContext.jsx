import React, { createContext, useContext, useState } from "react";
import { supabase } from "./supabaseCreateClient";
const ListingContext = createContext();

export const useListingContext = () => useContext(ListingContext);





function ListingProvider({ children }) {

  //get listing

  const fetchlisting = async () => {
    const { data, error } = await supabase
      .from("service_listings")
      .select("*");
    if (!error) {
      return data
    }
  }
    // get listing with id

    const fetchlistingWithId = async (id) => {
      const { data, error } = await supabase
        .from("service_listings")
        .select("*")
        .eq("id", id) // Fetch data where id matches
        .single(); // Get only one record
      if (!error) {
        return data
      }

    };

    return (
      <ListingContext.Provider value={{ fetchlisting, fetchlistingWithId }}>
        {children}
      </ListingContext.Provider>
    );
  }

  export default ListingProvider;