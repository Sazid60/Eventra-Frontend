"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton"; import DateFilter from "@/components/shared/DateFilter";
;
import SearchFilter from "@/components/shared/SearchFilter";

const EventsFilter = () => {
  return (
    <div className="space-y-3 mb-6">
      {/*  Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        {/* Email Filter */}

        <div className="flex items-center gap-2 ">
          <SearchFilter paramName="searchTerm" placeholder="Title Search...." />

          {/* Search Filter */}
          <SearchFilter paramName="searchTerm" placeholder="Location Search...." />
        </div>

        <div className="flex flex-col md:flex-row mt-4 md:mt-0">
          <DateFilter paramName="date" placeholder="Select Date...." />

          <ClearFiltersButton />
        </div>
      </div>
    </div>
  );
};

export default EventsFilter;
