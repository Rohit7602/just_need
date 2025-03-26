/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { supabase } from "./supabaseCreateClient";

const SubscriptionProvider = createContext();

export const useSubscriptionContext = () => useContext(SubscriptionProvider);

export const SubscriptionContext = ({ children }) => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const addPlan = async (planData) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("Subscription")
                .insert([planData])
                .select();

            if (error) throw error;

            console.log("Plan added successfully", data);
            setPlans((prev) => [...prev, data[0]]); // Update local state
            setShowPopup(false);
            return { success: true };
        } catch (error) {
            console.error("Error adding plan:", error);
            return { error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const deletePlan = async (planId) => {
        try {
            const { error } = await supabase
                .from("Subscription")
                .delete()
                .eq("id", planId); // Ensure this matches your Supabase column

            if (error) throw error;

            console.log("Plan deleted successfully!");
            setPlans((prev) => prev.filter((plan) => plan.id !== planId)); // Update local state
            return { success: true };
        } catch (error) {
            console.error("Error deleting plan:", error);
            return { error: error.message };
        }
    };

    const updatePlan = async (updatedData, planId) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("Subscription")
                .update(updatedData)
                .eq("planId", planId) // Ensure this matches your Supabase column
                .select();

            if (error) throw error;

            console.log("Plan updated successfully:", data);
            setPlans((prev) =>
                prev.map((plan) =>
                    plan.planId === planId ? { ...plan, ...updatedData } : plan
                )
            );
            setShowPopup(false);
            return { success: true, data };
        } catch (error) {
            console.error("Error updating plan:", error);
            return { error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const fetchSubscription = async () => {
        try {
            const { data, error } = await supabase.from("Subscription").select("*");

            if (error) throw error;
            setPlans(data); // Update local state
            return data;
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
            return [];
        }
    };

    const fetchSubscriptionById = async (id) => {
        try {
            const { data, error } = await supabase
                .from("Subscription")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error fetching subscription:", error);
            return null;
        }
    };

    return (
        <SubscriptionProvider.Provider
            value={{
                plans,
                loading,
                showPopup,
                setShowPopup,
                addPlan,
                deletePlan,
                updatePlan,
                fetchSubscription,
                fetchSubscriptionById,
                setPlans,
            }}
        >
            {children}
        </SubscriptionProvider.Provider>
    );
};