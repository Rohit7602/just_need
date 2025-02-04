import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabaseCreateClient";

const SubscriptionContext = createContext();
export const useSubscriptionContext = () => useContext(SubscriptionContext);

function SubscriptionProvider({ children }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchSubscriptionPlans() {
      const { data, error } = await supabase
        .from("subscriptionPlans")
        .select("*");

      if (error) {
        console.error("Error fetching plans:", error);
      } else {
        setPlans(data);
      }
    }
    fetchSubscriptionPlans();
  }, []);

  const addPlan = async (planData) => {
    const { data, error } = await supabase
      .from("subscriptionPlans")
      .insert([planData])
      .select();
    if (error) {
      console.log("Plan is not added , there is a error", error);
    } else {
      console.log("Plan is added successfully", data);
    }
  };

  const deletePlan = async (planId) => {
    const { error } = await supabase
      .from("subscriptionPlans")
      .delete()
      .eq("planId", planId);
    if (error) {
      console.error("Error deleting row:", error);
    } else {
      console.log("Row deleted successfully!");
      const { data: updatedPlans } = await supabase
        .from("subscriptionPlans")
        .select("*");
      setPlans(updatedPlans);
    }
  };

  const updatePlan = async (updatedData, planId) => {
    const { data, error } = await supabase
      .from("subscriptionPlans")
      .update(updatedData)
      .eq("planId", planId)
      .select();
      if(error){
        console.error("data is not updated " , error)
      }else{
        console.log("plan is updated successfully " , data)
      }
  };

  return (
    <SubscriptionContext.Provider value={{ plans, addPlan, deletePlan , updatePlan }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export default SubscriptionProvider;
