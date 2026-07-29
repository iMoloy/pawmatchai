"use client";

import React, { useState, useEffect } from "react";

interface Shelter {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  availablePets: number;
}

const SHELTERS: Shelter[] = [
  {
    id: "austin-rescue",
    name: "Austin Paw Alliance & Rescue",
    city: "Austin, TX",
    lat: 30.2672,
    lng: -97.7431,
    address: "701 W Riverside Dr, Austin, TX 78704",
    phone: "(512) 555-0199",
    availablePets: 14,
  },
  {
    id: "seattle-paws",
    name: "Emerald City Pet Shelter",
    city: "Seattle, WA",
    lat: 47.6062,
    lng: -122.3321,
    address: "1201 3rd Ave, Seattle, WA 98101",
    phone: "(206) 555-0142",
    availablePets: 9,
  },
  {
    id: "portland-haven",
    name: "Rose City Animal Haven",
    city: "Portland, OR",
    lat: 45.5152,
    lng: -122.6784,
    address: "1000 SW Broadway, Portland, OR 97205",
    phone: "(503) 555-0188",
    availablePets: 11,
  },
  {
    id: "nyc-friends",
    name: "Manhattan Paws & Sanctuary",
    city: "New York, NY",
    lat: 40.7128,
    lng: -74.006,
    address: "350 5th Ave, New York, NY 10118",
    phone: "(212) 555-0123",
    availablePets: 18,
  },
];

// Haversine formula to calculate distance in KM
function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export default function ShelterMapLocator({ petLocation }: { petLocation?: string }) {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<Shelter>(SHELTERS[0]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          setGeoError("Geolocation permission denied. Showing estimated distances.");
          // Default fallback coordinates (Austin, TX center)
          setUserCoords({ lat: 30.2672, lng: -97.7431 });
        }
      );
    } else {
      setUserCoords({ lat: 30.2672, lng: -97.7431 });
    }
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
            📍 GPS Shelter Locator
          </span>
          <h3 className="text-xl font-black text-slate-800">
            Nearby Partner Shelters
          </h3>
        </div>
        {userCoords && (
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100 flex items-center gap-1">
            <span>📡</span> GPS Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Shelter List with Distance */}
        <div className="lg:col-span-5 space-y-3">
          {SHELTERS.map((shelter) => {
            const distance = userCoords
              ? calculateDistanceKm(
                  userCoords.lat,
                  userCoords.lng,
                  shelter.lat,
                  shelter.lng
                )
              : null;

            const isSelected = selectedShelter.id === shelter.id;

            return (
              <div
                key={shelter.id}
                onClick={() => setSelectedShelter(shelter)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-teal-500 bg-teal-50/60 shadow-sm"
                    : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {shelter.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{shelter.city}</p>
                  </div>
                  {distance !== null && (
                    <span className="text-xs font-extrabold text-teal-700 bg-teal-100/80 px-2.5 py-1 rounded-lg">
                      {distance} km away
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <span>🐾 {shelter.availablePets} pets ready</span>
                  <span className="font-bold text-teal-600">Select →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Map Visualizer Panel */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px] border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              Selected Shelter Location
            </div>
            <h4 className="text-2xl font-black">{selectedShelter.name}</h4>
            <p className="text-sm text-slate-300">{selectedShelter.address}</p>
          </div>

          {/* Pin Graphic */}
          <div className="relative z-10 my-8 flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-teal-500/20 rounded-full animate-ping absolute -inset-2"></div>
              <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-full flex items-center justify-center text-3xl shadow-xl border-2 border-white">
                🏠
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
            <div className="text-xs text-slate-300">
              📞 <span className="font-bold text-white">{selectedShelter.phone}</span>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedShelter.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md text-center"
            >
              Open Directions in Google Maps 🗺️
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
