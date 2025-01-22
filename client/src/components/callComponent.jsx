import React, { useState, useMemo, useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";

const CallList = ({ selectedUserId }) => {
  const userStore = useUserStore();
  const [selectedCallType, setSelectedCallType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const callTypes = ["All", "Face to Face", "In-Person", "Email", "Phone", "Others"];

  // Filtered Calls
  const filteredCalls = useMemo(() => {
    if (!selectedUserId) return [];

    const user = userStore.users.find((u) => u.userId === selectedUserId);
    if (!user) return [];

    const userTerritory = user.territory;

    const callsInTerritory = userStore.calls.filter((call) => {
      const account = userStore.accounts.find((acc) => acc.id === call.accountId);
      return account?.territory === userTerritory;
    });

    if (selectedCallType === "All") {
      return callsInTerritory;
    }

    return callsInTerritory.filter((call) => call.callType === selectedCallType);
  }, [selectedUserId, selectedCallType, userStore.calls, userStore.accounts]);

  // Pagination
  const paginatedCalls = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredCalls.slice(start, end);
  }, [filteredCalls, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => Math.ceil(filteredCalls.length / itemsPerPage), [filteredCalls, itemsPerPage]);

  const changePage = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Reset state when selectedUserId changes
  useEffect(() => {
    setSelectedCallType("All");
    setCurrentPage(1);
  }, [selectedUserId]);

  return (
    <div>
      {/* Call Type Filter */}
      <div className="flex justify-center mb-4">
        <label htmlFor="call-type" className="mr-2 font-semibold">Call Type:</label>
        <select
          id="call-type"
          value={selectedCallType}
          onChange={(e) => setSelectedCallType(e.target.value)}
          className="block w-48 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {callTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Call Details Table */}
      <table className="min-w-full border-collapse border border-gray-300 mb-4">
        <thead className="bg-blue-200">
          <tr className="text-blue-600">
            <th className="border px-4 py-2">Call ID</th>
            <th className="border px-4 py-2">Account Name</th>
            <th className="border px-4 py-2">Call Date</th>
            <th className="border px-4 py-2">Call Type</th>
            <th className="border px-4 py-2">Call Status</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {paginatedCalls.map((call) => (
            <tr key={call.id}>
              <td className="border px-4 py-2">{call.id}</td>
              <td className="border px-4 py-2">
                {userStore.accounts.find((acc) => acc.id === call.accountId)?.name || "Unknown"}
              </td>
              <td className="border px-4 py-2">{new Date(call.callDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{call.callType}</td>
              <td className="border px-4 py-2">{call.callStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => changePage("prev")}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => changePage("next")}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CallList;
