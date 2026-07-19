"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AddPetPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    species: "Dog",
    age: "",
    size: "Medium",
    gender: "Unknown",
    location: "",
    fee: "",
    shortDescription: "",
    fullDescription: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.breed.trim()) newErrors.breed = "Breed is required";
    if (!formData.age.trim())
      newErrors.age = "Age is required (e.g. '2 years')";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.fee.trim()) newErrors.fee = "Adoption fee is required";
    if (!formData.shortDescription.trim())
      newErrors.shortDescription = "Short description is required";
    if (formData.shortDescription.length > 100)
      newErrors.shortDescription = "Keep it under 100 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // API call to backend (assuming endpoint exists on server)
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://pawmatchai-server.onrender.com";
      await axios.post(`${apiBaseUrl}/api/pets`, formData);

      setToastMessage("Pet successfully added!");

      // Give time for user to see the success toast before redirecting
      setTimeout(() => {
        router.push("/pets/manage");
      }, 1500);
    } catch (error) {
      console.error("Failed to add pet:", error);
      setErrors({
        submit: "Failed to add pet. Please try again or check backend server.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-24 right-4 sm:right-8 bg-teal-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-bold">{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Add a Pet
            </h1>
            <p className="text-slate-500 mt-2">
              Create a new listing to help a furry friend find their forever
              home.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 sm:p-10">
              {errors.submit && (
                <div className="mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium flex items-center gap-2">
                  <svg
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info Section */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Pet Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Luna"
                        className={`w-full px-4 py-3 bg-slate-50 border ${errors.name ? "border-red-300 focus:ring-red-500" : "border-slate-200 focus:ring-teal-500"} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 font-medium mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Species
                      </label>
                      <select
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm"
                      >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Breed
                      </label>
                      <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        placeholder="e.g. Golden Retriever"
                        className={`w-full px-4 py-3 bg-slate-50 border ${errors.breed ? "border-red-300 focus:ring-red-500" : "border-slate-200 focus:ring-teal-500"} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm`}
                      />
                      {errors.breed && (
                        <p className="text-xs text-red-500 font-medium mt-1">
                          {errors.breed}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Age
                      </label>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="e.g. 2 years, 3 months"
                        className={`w-full px-4 py-3 bg-slate-50 border ${errors.age ? "border-red-300 focus:ring-red-500" : "border-slate-200 focus:ring-teal-500"} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm`}
                      />
                      {errors.age && (
                        <p className="text-xs text-red-500 font-medium mt-1">
                          {errors.age}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Size
                      </label>
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm"
                      >
                        <option value="Small">Small (0-15 lbs)</option>
                        <option value="Medium">Medium (16-40 lbs)</option>
                        <option value="Large">Large (41-100 lbs)</option>
                        <option value="Extra Large">
                          Extra Large (101+ lbs)
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">
                    Adoption Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Location (City, State)
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Austin, TX"
                        className={`w-full px-4 py-3 bg-slate-50 border ${errors.location ? "border-red-300 focus:ring-red-500" : "border-slate-200 focus:ring-teal-500"} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm`}
                      />
                      {errors.location && (
                        <p className="text-xs text-red-500 font-medium mt-1">
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Adoption Fee ($)
                      </label>
                      <input
                        type="text"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                        placeholder="e.g. 150"
                        className={`w-full px-4 py-3 bg-slate-50 border ${errors.fee ? "border-red-300 focus:ring-red-500" : "border-slate-200 focus:ring-teal-500"} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm`}
                      />
                      {errors.fee && (
                        <p className="text-xs text-red-500 font-medium mt-1">
                          {errors.fee}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm"
                      />
                      <p className="text-xs text-slate-400 mt-1">
                        Leave blank to use a default placeholder image.
                      </p>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Short Description
                      </label>
                      <input
                        type="text"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        placeholder="A brief, catchy intro for this pet..."
                        className={`w-full px-4 py-3 bg-slate-50 border ${errors.shortDescription ? "border-red-300 focus:ring-red-500" : "border-slate-200 focus:ring-teal-500"} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm`}
                      />
                      <div className="flex justify-between items-center mt-1">
                        {errors.shortDescription ? (
                          <p className="text-xs text-red-500 font-medium">
                            {errors.shortDescription}
                          </p>
                        ) : (
                          <div></div>
                        )}
                        <p
                          className={`text-xs ${formData.shortDescription.length > 100 ? "text-red-500" : "text-slate-400"}`}
                        >
                          {formData.shortDescription.length}/100
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Full Description (Optional)
                      </label>
                      <textarea
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleChange}
                        placeholder="Tell us everything about this pet's personality, history, and needs..."
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-850 active:scale-[0.98] transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "List Pet"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
