import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabaseCreateClient";
import Loader from "../Components/Common/Loader";

const SubscriptionContext = createContext();
export const useSubscriptionContext = () => useContext(SubscriptionContext);

function SubscriptionProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    async function fetchSubscriptionPlans() {
      setLoading(true); 
      const { data, error } = await supabase.from("subscriptionPlans").select("*");

      if (error) {
        console.error("Error fetching plans:", error);
      } else {
        setPlans(data);
        setShowPopup(false);
      }
      setLoading(false);
    }

    fetchSubscriptionPlans();
  }, []);

  const addPlan = async (planData) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("subscriptionPlans")
      .insert([planData])
      .select();

    if (error) {
      console.log("Plan is not added, there is an error:", error);
    } else {
      console.log("Plan is added successfully", data);
      setPlans([...plans, { ...planData, planId: data[0].planId, cancellationPolicy: data[0].cancellationPolicy }]);
      setShowPopup(false);
    }
    setLoading(false);
  };

  const deletePlan = async (planId) => {
    setLoading(true);
    const { error } = await supabase.from("subscriptionPlans").delete().eq("planId", planId);

    if (error) {
      console.error("Error deleting row:", error);
    } else {
      console.log("Row deleted successfully!");
      const { data: updatedPlans } = await supabase.from("subscriptionPlans").select("*");
      setPlans(updatedPlans);
    }
    setLoading(false);
  };

  const updatePlan = async (updatedData, planId) => {
    setLoading(true);
    const { data, error } = await supabase.from("subscriptionPlans").update(updatedData).eq("planId", planId).select();

    if (error) {
      console.error("Data is not updated:", error);
    } else {
      console.log("Plan is updated successfully:", data);
      setPlans((prev) => prev.map((value) => (value.planId === planId ? { ...value, ...updatedData } : value)));
      setShowPopup(false);
    }
    setLoading(false);
  };

  return (
    <SubscriptionContext.Provider value={{ plans, addPlan, deletePlan, updatePlan, showPopup, setShowPopup }}>
      {children}
      {loading && <Loader />}
    </SubscriptionContext.Provider>
  );
}

export default SubscriptionProvider;
