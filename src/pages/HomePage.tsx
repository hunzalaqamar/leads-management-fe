import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLeads } from "../context/LeadsContext";
import { getLeads } from "../service/api";
import { Lead } from "../types/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const HomePage: React.FC = () => {
  const { logout } = useAuth();
  const { leads, setLeads, deleteLeads } = useLeads();
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);

  useEffect(() => {
    const fetchLeads = async () => {
      const result = await getLeads();
      if (result?.success) {
        setLeads(result.leads);
      } else {
        toast.error(result?.message);
      }
    };

    fetchLeads();
  }, [setLeads]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setFilteredLeads(leads);
      return;
    }

    const lowerCaseQuery = debouncedSearchQuery.toLowerCase();
    const filtered = leads.filter(
      (lead) =>
        lead.fullName.toLowerCase().includes(lowerCaseQuery) ||
        lead.email.toLowerCase().includes(lowerCaseQuery) ||
        lead.companyName?.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredLeads(filtered);
  }, [leads, debouncedSearchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredLeads(leads);
    }
  }, [leads, searchQuery]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLeads([]);
      setSelectAll(false);
    } else {
      const allLeadIds = filteredLeads.map((lead) => lead.id!);
      setSelectedLeads(allLeadIds);
      setSelectAll(true);
    }
  };

  const handleCheckboxChange = (leadId: string) => {
    setSelectedLeads((prev) => {
      const newSelected = prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId];

      setSelectAll(newSelected.length === filteredLeads.length);
      return newSelected;
    });
  };

  const handleDelete = () => {
    deleteLeads(selectedLeads);
    setSelectedLeads([]);
    setSelectAll(false);
  };

  const formatDate = (dateString: string) => {
    const formattedDateString = dateString.endsWith("Z")
      ? dateString
      : `${dateString}Z`;
    const date = new Date(formattedDateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#FFF5E1] to-[#E1DFFF]">
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6">
        <div className="mb-8">
          <div className="w-8 h-8 bg-gray-800 rounded"></div>
        </div>
        <div className="flex flex-col space-y-6 flex-1">
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
        </div>
        <div className="mt-auto">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">Leads</h2>
              <span className="ml-2 text-sm text-gray-500">
                ({leads.length})
              </span>
            </div>
            <button
              onClick={logout}
              className="ml-2 px-4 py-2 bg-black text-white rounded-md flex items-center hover:cursor-pointer"
            >
              Log Out
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type to search"
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            {filteredLeads.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No leads found.</p>
            ) : (
              <>
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-xs uppercase">
                      <th className="p-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Company</th>
                      <th className="p-3">Notes</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={selectedLeads.includes(lead.id!)}
                            onChange={() => handleCheckboxChange(lead.id!)}
                          />
                        </td>
                        <td className="p-3">{lead.fullName}</td>
                        <td className="p-3">{lead.companyName || "-"}</td>
                        <td className="p-3">{lead.notes || "-"}</td>
                        <td className="p-3">
                          {formatDate(lead.createdAt || "")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {selectedLeads.length > 0 && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
