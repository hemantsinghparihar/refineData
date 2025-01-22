import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCallsData, fetchEmailsData } from '../features/refineSlice';

const TeritoryTable = () => {
  const dispatch = useDispatch();
  const { 
    callsData, 
    emailData, 
    teritoryData,
    status,
    error 
  } = useSelector((state) => state.refine);

  useEffect(() => {
    dispatch(fetchCallsData());
    dispatch(fetchEmailsData());
  }, [dispatch]);

  // Calculate statistics for each row
  const getRowStats = (id) => {
    const calls = callsData.filter(call => 
      call.accountId === id && 
      (call.callType === "Face to Face" || call.callType === "Phone")
    );
    
    const emails = emailData.filter(email => email.accountId === id);

    const latestCall = calls.length > 0 
      ? new Date(Math.max(...calls.map(call => new Date(call.callDate))))
      : null;

    const latestEmail = emails.length > 0
      ? new Date(Math.max(...emails.map(email => new Date(email.emailDate))))
      : null;

    return {
      totalCalls: calls.length,
      totalEmails: emails.length,
      latestCall: latestCall ? latestCall.toLocaleDateString() : '-',
      latestEmail: latestEmail ? latestEmail.toLocaleDateString() : '-'
    };
  };

  // Show loading state
  if (status.calls === 'loading' || status.emails === 'loading') {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Show error state
  if (error.calls || error.emails) {
    return <div className="text-center text-red-500 p-4">
      Error loading data: {error.calls || error.emails}
    </div>;
  }

  return (
    <div className='w-full teritory-table'>
      <div className='w-full'>
        <h5 className='text-blue-600 text-center'>
          Userx Territory Account
        </h5>
      </div>

      <div className="max-w-5xl mx-auto mt-10">
        <div className="grid grid-cols-5 bg-gray-800 text-white font-semibold text-sm">
          <div className="p-4">Account Name</div>
          <div className="p-4">Total Calls</div>
          <div className="p-4">Total Emails</div>
          <div className="p-4">Latest Call Date</div>
          <div className="p-4">Latest Email Date</div>
        </div>
        
        {teritoryData.map((row, index) => {
          const stats = getRowStats(row.id);
          return (
            <div
              key={row.id}
              className={`grid grid-cols-5 text-sm ${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
              }`}
            >
              <div className="p-4">{row.name}</div>
              <div className="p-4">{stats.totalCalls}</div>
              <div className="p-4">{stats.totalEmails}</div>
              <div className="p-4">{stats.latestCall}</div>
              <div className="p-4">{stats.latestEmail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeritoryTable;