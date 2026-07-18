const PetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Image */}
      <div className="aspect-4/3 bg-slate-200 relative">
        <div className="w-full h-full flex items-center justify-center">
          <svg
            className="w-16 h-16 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6.75 6.75h.01M12 6.75h.01M17.25 6.75h.01"
            />
          </svg>
        </div>
        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-teal-700 text-white text-sm font-medium rounded-full">
            {pet.badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          {pet.name}
        </h3>
        <p className="text-sm text-slate-600 mb-3">{pet.breed}</p>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <span>{pet.age} years</span>
          <span>•</span>
          <span>{pet.location}</span>
        </div>

        <button className="mt-auto w-full py-2 px-4 bg-teal-50 text-teal-700 font-medium rounded-lg hover:bg-teal-100 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PetCard;
