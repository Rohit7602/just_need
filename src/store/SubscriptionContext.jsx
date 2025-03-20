/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { supabase } from "./supabaseCreateClient";

const SubsciptionProvider = createContext()

export const useSubscriptionContext = () => useContext(SubsciptionProvider)

export const SubscriptionContext = ({ children }) => {





    // useEffect(() => {
    //     async function fetchSubscriptionPlans() {

    //         const { data, error } = await supabase.from("Subscription").select("*");

    //         if (error) {
    //             console.error("Error fetching plans:", error);
    //         } else {
    //             setPlans(data);
    //         }

    //     }

    //     fetchSubscriptionPlans();
    // }, []);

    // const addPlan = async (planData) => {
    //     setLoading(true);
    //     const { data, error } = await supabase
    //         .from("subscriptionPlans")
    //         .insert([planData])
    //         .select();

    //     if (error) {
    //         console.log("Plan is not added, there is an error:", error);
    //     } else {
    //         console.log("Plan is added successfully", data);
    //         setPlans([...plans, { ...planData, planId: data[0].planId, cancellationPolicy: data[0].cancellationPolicy }]);
    //         setShowPopup(false);
    //     }
    //     setLoading(false);
    // };

    // const deletePlan = async (planId) => {
    //     const { error } = await supabase.from("subscriptionPlans").delete().eq("planId", planId);

    //     if (error) {
    //         console.error("Error deleting row:", error);
    //     } else {
    //         console.log("Row deleted successfully!");
    //         const { data: updatedPlans } = await supabase.from("subscriptionPlans").select("*");
    //         setPlans(updatedPlans);
    //     }
    // };

    // const updatePlan = async (updatedData, planId) => {
    //     setLoading(true);
    //     const { data, error } = await supabase.from("subscriptionPlans").update(updatedData).eq("planId", planId).select();

    //     if (error) {
    //         console.error("Data is not updated:", error);
    //     } else {
    //         console.log("Plan is updated successfully:", data);
    //         setPlans((prev) => prev.map((value) => (value.planId === planId ? { ...value, ...updatedData } : value)));
    //         setShowPopup(false);
    //     }
    //     setLoading(false);
    // };

    const fetchSubscription = async () => {
        const { data, error } = await supabase.from("Subscription").select("*")

        if (!error) {
            return data
        }
    }

    // const fetchSubscritptionId = async (id) => {
    //     const { data, error } = await supabase.from("Subscription").select("*").eq("id", id).single()

    //     if (!error) {
    //         return data
    //     }
    // }
    return (
        <SubsciptionProvider.Provider value={{ fetchSubscription }}>
            {children}
        </SubsciptionProvider.Provider>
    )
}

