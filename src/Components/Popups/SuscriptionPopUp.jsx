/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";
import { useSubscriptionContext } from "../../store/SubscriptionContext";

function SuscriptionPopUp({ handlePopup, updateItemId }) {
    const { addPlan, updatePlan, plans, loading } = useSubscriptionContext();

    const initialData = {
        planName: "",
        price: "",
        durationInDays: "",
        currency: "₹",
        color: "#0832DE",
        cancellationPolicy: "",
        features: [], // Initialize as an empty array
    };

    const [subscriptionData, setSubscriptionData] = useState(initialData);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [errors, setErrors] = useState({}); // For form validation
    const [newFeature, setNewFeature] = useState(""); // State for the new feature input
    const colorPickerRef = useRef(null);

    // Load existing plan data for editing
    useEffect(() => {
        if (updateItemId) {
            const existingPlan = plans.find((plan) => plan.id === updateItemId);
            if (existingPlan) {
                setSubscriptionData({
                    planName: existingPlan.planName || "",
                    price: existingPlan.price?.toString() || "",
                    durationInDays: existingPlan.durationInDays?.toString() || "",
                    currency: existingPlan.currency || "₹",
                    color: existingPlan.color || "#0832DE",
                    cancellationPolicy: existingPlan.cancellationPolicy || "",
                    features: Array.isArray(existingPlan.features) ? existingPlan.features : [], // Ensure features is an array
                });
            }
        } else {
            setSubscriptionData(initialData);
        }
    }, [updateItemId, plans]);

    // Handle color picker change
    const handleColorChange = (color) => {
        setSubscriptionData((prev) => ({
            ...prev,
            color: color.hex,
        }));
    };

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubscriptionData((prev) => ({ ...prev, [name]: value }));
        // Clear error for the field
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Handle new feature input change
    const handleNewFeatureChange = (e) => {
        setNewFeature(e.target.value);
    };

    // Add a new feature to the list
    const addFeatureField = () => {
        if (newFeature.trim() === "") return; // Prevent adding empty features
        setSubscriptionData((prev) => ({
            ...prev,
            features: [...prev.features, newFeature.trim()],
        }));
        setNewFeature(""); // Clear the input field
    };

    // Remove a feature from the list
    const removeFeatureField = (index) => {
        const newFeatures = subscriptionData.features.filter((_, i) => i !== index);
        setSubscriptionData((prev) => ({ ...prev, features: newFeatures }));
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        if (!subscriptionData.planName.trim()) {
            newErrors.planName = "Plan name is required";
        }
        if (!subscriptionData.price || isNaN(subscriptionData.price) || parseFloat(subscriptionData.price) <= 0) {
            newErrors.price = "Valid price is required";
        }
        if (
            !subscriptionData.durationInDays ||
            isNaN(subscriptionData.durationInDays) ||
            parseInt(subscriptionData.durationInDays) <= 0
        ) {
            newErrors.durationInDays = "Valid duration (in years) is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (!validateForm()) {
            return;
        }

        const payload = {
            planName: subscriptionData.planName,
            price: parseFloat(subscriptionData.price),
            durationInDays: parseInt(subscriptionData.durationInDays),
            currency: subscriptionData.currency,
            color: subscriptionData.color,
            cancellationPolicy: subscriptionData.cancellationPolicy,
            features: subscriptionData.features.filter((f) => f.trim() !== ""), // Remove empty features
        };

        try {
            if (updateItemId) {
                await updatePlan(payload, updateItemId);
            } else {
                await addPlan(payload);
            }
            handlePopup(); // Close popup on success
        } catch (error) {
            console.error("Error saving subscription:", error);
        }
    };

    // Close color picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
                setShowColorPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle Enter key press to add feature
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            addFeatureField();
        }
    };

    return (
        <>
            <div
                onClick={handlePopup}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 h-[458px] w-[500px] xl:w-[694px] m-auto">
                <div className="w-full bg-white rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
                    <button
                        onClick={handlePopup}
                        className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                    <p className="font-normal text-lg text-black text-start pb-[15px] border-b-[0.5px] border-dashed border-[#00000066]">
                        {updateItemId ? "Edit Subscription" : "Add Subscription"}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-[15px]">
                            <label className="block text-base font-normal text-gray-700 mb-2.5">
                                Subscription Name
                            </label>
                            <input
                                name="planName"
                                value={subscriptionData.planName}
                                onChange={handleInputChange}
                                placeholder="Standard"
                                className={`w-full px-3 py-[12px] rounded-[7px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.planName ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.planName && (
                                <p className="text-red-500 text-sm mt-1">{errors.planName}</p>
                            )}
                        </div>

                        <div className="flex justify-between mt-[15px]">
                            <div className="w-[25%]">
                                <label className="block text-base font-normal text-gray-700 mb-2.5">
                                    Currency
                                </label>
                                <div className="w-full pe-3 rounded-[7px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <select
                                        name="currency"
                                        value={subscriptionData.currency}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-[12px] rounded-[7px] bg-gray-100 focus:outline-none"
                                    >
                                        <option value="₹">Ind (Rs)</option>
                                        <option value="$">US Dollar ($)</option>
                                        <option value="€">Euro (€)</option>
                                        <option value="£">Pound (£)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-[35%]">
                                <label className="block text-base font-normal text-gray-700 mb-2.5">
                                    Price
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    value={subscriptionData.price}
                                    onChange={handleInputChange}
                                    placeholder="₹199.00"
                                    className={`w-full px-3 py-[12px] rounded-[7px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? "border-red-500" : ""
                                        }`}
                                    onWheel={(e) => e.target.blur()}
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                                )}
                            </div>
                            <div className="w-[35%]">
                                <label className="block text-base font-normal text-gray-700 mb-2.5">
                                    Duration (In years)
                                </label>
                                <input
                                    name="durationInDays"
                                    type="number"
                                    value={subscriptionData.durationInDays}
                                    onChange={handleInputChange}
                                    placeholder="1"
                                    className={`w-full px-3 py-[12px] rounded-[7px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.durationInDays ? "border-red-500" : ""
                                        }`}
                                    onWheel={(e) => e.target.blur()}
                                />
                                {errors.durationInDays && (
                                    <p className="text-red-500 text-sm mt-1">{errors.durationInDays}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-[15px]">
                            <label className="block text-base font-normal text-gray-700 mb-2.5">
                                Cancellation Policy
                            </label>
                            <input
                                name="cancellationPolicy"
                                value={subscriptionData.cancellationPolicy}
                                onChange={handleInputChange}
                                placeholder="Standard policy"
                                className="w-full px-3 py-[12px] rounded-[7px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-base font-normal text-gray-700 mb-2.5">
                                    Features
                                </label>
                                <button
                                    type="button"
                                    onClick={addFeatureField}
                                    className="text-[#6C4DEF] px-4 py-2 rounded"
                                >
                                    + Add Feature
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    value={newFeature}
                                    onChange={handleNewFeatureChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter a feature"
                                    className="w-full px-3 py-2 rounded bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                />

                            </div>
                            {subscriptionData.features.length > 0 && (
                                <div className="mt-3">
                                    {subscriptionData.features.map((feature, index) => (
                                        <div key={index} className="relative mt-2">
                                            <input
                                                value={feature}
                                                readOnly
                                                className="w-full px-3 py-2 rounded bg-gray-200 text-gray-700 cursor-default"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFeatureField(index)}
                                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-sm"
                                                aria-label="Remove feature"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {subscriptionData.features.length === 0 && (
                                <p className="text-gray-500 text-sm mt-2">No features added yet.</p>
                            )}
                        </div>

                        <div className="mt-[15px] relative">
                            <label className="block text-base font-normal text-gray-700 mb-2.5">
                                Plan Color
                            </label>
                            <div className="flex items-center gap-2.5">
                                <button
                                    type="button"
                                    className="h-[42px] w-[163px] px-4 rounded-[10px] text-white"
                                    style={{ backgroundColor: subscriptionData.color }}
                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                />
                                <button
                                    type="button"
                                    className="h-[42px] w-[calc(100%-163px)] text-start px-4 rounded-[10px] text-black/70 bg-[#F2F2F2]"
                                >
                                    {subscriptionData.color}
                                </button>
                                {showColorPicker && (
                                    <div ref={colorPickerRef} className="absolute z-10 top-full mt-2">
                                        <ChromePicker
                                            color={subscriptionData.color}
                                            onChange={handleColorChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0832DE] text-base text-white font-medium py-2.5 h-[42px] rounded-[10px] mt-[15px] disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Plan"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SuscriptionPopUp;