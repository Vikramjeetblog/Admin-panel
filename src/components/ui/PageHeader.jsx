const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      
      {/* LEFT */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
          Admin Panel
        </p>

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* RIGHT (Action Area) */}
      <div className="flex items-center gap-3">
        
        {/* Live badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white shadow-sm">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs tracking-wider text-gray-600">
            LIVE
          </span>
        </div>

        {/* Optional button */}
        <button className="px-4 py-2 rounded-xl bg-black text-white text-sm hover:bg-gray-800 transition">
          + New
        </button>
      </div>

    </div>
  );
};

export default PageHeader;