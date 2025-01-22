import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCallsData } from '../features/refineSlice';

const CallTable = () => {
  const dispatch = useDispatch();
  const teritoryData = useSelector((state) => state.refine.teritoryData);
  const callsData = useSelector((state) => state.refine.callsData);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust this number

  useEffect(() => {
    dispatch(fetchCallsData());
  }, [dispatch]);

  // Function to get calls for a specific account
  const getCallsForAccount = (accountId) => {
    return callsData.filter(call => call.accountId === accountId)
      .map(call => ({
        id: call.id,
        accountName: teritoryData.find(acc => acc.id === call.accountId)?.name || 'Unknown Account',
        date: new Date(call.callDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        status: call.callStatus
      }));
  };

  // Get all combined data
  const getCombinedData = () => {
    const allCalls = [];
    teritoryData.forEach(account => {
      const accountCalls = getCallsForAccount(account.id);
      allCalls.push(...accountCalls);
    });
    return allCalls;
  };

  const combinedData = getCombinedData();

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = combinedData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(combinedData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='w-full teritory-table'>
      <div className='w-full'>
        <h5 className='text-blue-600 text-center'>
          Userx Territory Account
        </h5>
      </div>

      <div className="max-w-5xl mx-auto mt-10">
        <div className="grid grid-cols-4 bg-gray-800 text-white font-semibold text-sm">
          <div className="p-4">Call Id</div>
          <div className="p-4">Account Name</div>
          <div className="p-4">Call Date</div>
          <div className="p-4">Call Status</div>
        </div>
        
        {currentItems.map((call, index) => (
          <div
            key={call.id}
            className={`grid grid-cols-4 text-sm ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
            }`}
          >
            <div className="p-4">{call.id}</div>
            <div className="p-4">{call.accountName}</div>
            <div className="p-4">{call.date}</div>
            <div className="p-4">{call.status}</div>
          </div>
        ))}

        {combinedData.length === 0 && (
          <div className="text-center p-4 text-gray-500">
            No calls data available
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(num => {
                // Show first page, last page, current page, and pages around current page
                return (
                  num === 1 ||
                  num === totalPages ||
                  (num >= currentPage - 1 && num <= currentPage + 1)
                );
              })
              .map((number) => (
                <React.Fragment key={number}>
                  {number !== 1 && number !== totalPages && 
                   number !== currentPage - 1 && 
                   number !== currentPage + 1 && (
                    <span className="px-2">...</span>
                  )}
                  <button
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded ${
                      currentPage === number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {number}
                  </button>
                </React.Fragment>
              ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Next
          </button>
        </div>

        {/* Page info */}
        <div className="mt-2 text-center text-sm text-gray-600">
          Page {currentPage} of {totalPages} | 
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, combinedData.length)} of {combinedData.length} items
        </div>
      </div>
    </div>
  );
};

export default CallTable;





// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCallsData } from '../features/refineSlice';

// const CallTable = () => {
//   const dispatch = useDispatch();
//   const teritoryData = useSelector((state) => state.refine.teritoryData);
//   const callsData = useSelector((state) => state.refine.callsData);

//   useEffect(() => {
//     dispatch(fetchCallsData());
//   }, [dispatch]);

//   // Function to get calls for a specific account
//   const getCallsForAccount = (accountId) => {
//     return callsData.filter(call => call.accountId === accountId)
//       .map(call => ({
//         id: call.id,
//         accountName: teritoryData.find(acc => acc.id === call.accountId)?.name || 'Unknown Account',
//         date: new Date(call.callDate).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric'
//         }),
//         status: call.callStatus
//       }));
//   };

//   // Get all combined data
//   const getCombinedData = () => {
//     const allCalls = [];
//     teritoryData.forEach(account => {
//       const accountCalls = getCallsForAccount(account.id);
//       allCalls.push(...accountCalls);
//     });
//     return allCalls;
//   };

//   const combinedData = getCombinedData();

//   return (
//     <div className='w-full teritory-table'>
//       <div className='w-full'>
//         <h5 className='text-blue-600 text-center'>
//           Userx Territory Account
//         </h5>
//       </div>

//       <div className="max-w-5xl mx-auto mt-10">
//         <div className="grid grid-cols-4 bg-gray-800 text-white font-semibold text-sm">
//           <div className="p-4">Call Id</div>
//           <div className="p-4">Account Name</div>
//           <div className="p-4">Call Date</div>
//           <div className="p-4">Call Status</div>
//         </div>
        
//         {combinedData.map((call, index) => (
//           <div
//             key={call.id}
//             className={`grid grid-cols-4 text-sm ${
//               index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
//             }`}
//           >
//             <div className="p-4">{call.id}</div>
//             <div className="p-4">{call.accountName}</div>
//             <div className="p-4">{call.date}</div>
//             <div className="p-4">{call.status}</div>
//           </div>
//         ))}

//         {combinedData.length === 0 && (
//           <div className="text-center p-4 text-gray-500">
//             No calls data available
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CallTable;









// import React,{useEffect} from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCallsData } from '../features/refineSlice';

// const CallTable = () => {
//      const dispatch = useDispatch();
//      const teritoryData=useSelector((state)=>state.refine.teritoryData)
// console.log('✌️teritoryData in the call table--->', teritoryData);
//         const callsData=useSelector((state)=>state.refine.callsData)

//     console.log('✌️callsData in the call table--->', callsData);

//      useEffect(() => {
//          dispatch(fetchCallsData());
//        }, [dispatch]);


       



//   return (
//     <div className='w-full teritory-table'>
//       <div className='w-full'>
//         <h5 className='text-blue-600 text-center'>
//           Userx Territory Account
//         </h5>
//       </div>

//       <div className="max-w-5xl mx-auto mt-10">
//         <div className="grid grid-cols-4 bg-gray-800 text-white font-semibold text-sm">
//           <div className="p-4">Call Id</div>
//           <div className="p-4">Account Name</div>
//           <div className="p-4">Call Date</div>
//           <div className="p-4">Call Status</div>
//         </div>
        
//         {teritoryData.map((row, index) => {
//         //   const stats = getRowStats(row.id);
//           return (
//             <div>
//                  <div className="p-4"> </div>
//               <div className="p-4">{row.name} </div>
//               {/* <div className="p-4">{row.name} </div>
//               <div className="p-4">{row.name} </div> */}
             
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   )
// }

// export default CallTable
