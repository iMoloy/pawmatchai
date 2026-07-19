"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ManagePetsPage() {
  const queryClient = useQueryClient();
  const [petToDelete, setPetToDelete] = useState(null);

  // Fetch user's pets (Mock endpoint for now, assuming it returns { pets: [] })
  const { data: pets = [], isLoading, isError } = useQuery({
    queryKey: ["myPets"],
    queryFn: async () => {
      // If the backend doesn't have /api/pets/mine yet, we will gracefully fallback to an empty array
      // or mock data just for visual demonstration if it fails.
      try {
        const response = await axios.get("http://localhost:5000/api/pets/mine", {
          // Pass token here if we had real auth hooked up to axios interceptors
          headers: { Authorization: `Bearer mock-token` }
        });
        return response.data.pets || [];
      } catch (err) {
        console.warn("Backend /api/pets/mine failed or missing, using fallback empty state for UI.");
        return [];
      }
    }
  });

  // Optimistic Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:5000/api/pets/${id}`);
    },
    // When mutate is called:
    onMutate: async (deletedId) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["myPets"] });
      // Snapshot the previous value
      const previousPets = queryClient.getQueryData(["myPets"]);
      // Optimistically update to the new value
      queryClient.setQueryData(["myPets"], (old) => (old ? old.filter(pet => pet.id !== deletedId) : []));
      return { previousPets };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, deletedId, context) => {
      console.error("Delete failed, rolling back.");
      queryClient.setQueryData(["myPets"], context.previousPets);
    },
    // Always refetch after error or success to ensure sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myPets"] });
      setPetToDelete(null); // Close modal
    },
  });

  const handleDeleteConfirm = () => {
    if (petToDelete) {
      deleteMutation.mutate(petToDelete.id);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "adopted":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-slate-50 relative">
        <Navbar />

        {/* Delete Confirmation Modal */}
        {petToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Delete Listing?</h3>
              <p className="text-slate-500 mt-2 text-sm">
                Are you sure you want to delete <span className="font-bold text-slate-700">{petToDelete.name}</span>? This action cannot be undone.
              </p>
              <div className="mt-8 flex gap-3">
                <button onClick={() => setPetToDelete(null)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button onClick={handleDeleteConfirm} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Manage My Pets</h1>
              <p className="text-slate-500 mt-2">View, edit, and manage your current adoption listings.</p>
            </div>
            <Link href="/pets/add" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-sm shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add New Pet
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            
            {isLoading ? (
              <LoadingSpinner message="Loading your pets..." />
            ) : isError || pets.length === 0 ? (
              
              /* Empty State */
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No pets listed yet</h3>
                <p className="text-slate-500 max-w-sm mb-8">You haven't added any pets for adoption yet. Start by creating your first listing!</p>
                <Link href="/pets/add" className="px-8 py-3.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors shadow-sm">
                  Add Your First Pet
                </Link>
              </div>

            ) : (
              
              /* Desktop Table / Mobile Cards */
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse hidden md:table">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pet</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Added</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pets.map((pet) => (
                      <tr key={pet.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={pet.imageUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200"} alt={pet.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                            <div>
                              <div className="font-bold text-slate-800">{pet.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{pet.species} • {pet.breed || "Mixed"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${getStatusStyle(pet.status || "Available")}`}>
                            {pet.status || "Available"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                          {new Date(pet.createdAt || Date.now()).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 text-right space-x-3">
                          <Link href={`/pets/${pet.id}`} className="text-sm font-bold text-teal-600 hover:text-teal-800 transition-colors">
                            View
                          </Link>
                          <button onClick={() => setPetToDelete(pet)} className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Cards View */}
                <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                  {pets.map((pet) => (
                    <div key={pet.id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <img src={pet.imageUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200"} alt={pet.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="font-bold text-slate-800 text-lg">{pet.name}</div>
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${getStatusStyle(pet.status || "Available")}`}>
                              {pet.status || "Available"}
                            </span>
                          </div>
                          <div className="text-sm text-slate-500 mt-0.5">{pet.species} • {pet.breed || "Mixed"}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <Link href={`/pets/${pet.id}`} className="flex-1 py-2 bg-slate-50 text-slate-700 text-center text-sm font-bold rounded-lg hover:bg-slate-100">
                          View Details
                        </Link>
                        <button onClick={() => setPetToDelete(pet)} className="px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-lg hover:bg-red-100">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
