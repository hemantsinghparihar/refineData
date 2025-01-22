import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setTeritoryData } from '../features/refineSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [accounts, setAccounts] = useState([]);

    // Move the territory filtering logic into a useEffect to prevent infinite renders
    useEffect(() => {
        if (selectedUser && accounts.length > 0) {
            const teritoryDataFilter = accounts.filter(account =>
                account.territory === selectedUser?.territory
            );
            
            // Dispatch the filtered data
            dispatch(setTeritoryData(teritoryDataFilter));
        }
    }, [selectedUser, accounts, dispatch]); // Dependencies that should trigger this effect

    // Effect to update selected user when ID changes
    useEffect(() => {
        const findUser = users.find((user) => user.id === selectedUserId);
        setSelectedUser(findUser);
    }, [selectedUserId, users]);

    // Effect to fetch initial data
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3001/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchAccounts = async () => {
            try {
                const response = await fetch("http://localhost:3001/accounts");
                if (!response.ok) {
                    throw new Error("Failed to fetch accounts");
                }
                const data = await response.json();
                setAccounts(data);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        fetchUsers();
        fetchAccounts();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className='navbar bg-blue-500 w-full'>
            <div className="nav-in py-2 px-4">
                <div className="selection-option">
                    <h5 className='text-white'>
                        Select User
                    </h5>
                    <select
                        className='min-w-[200px]'
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                    >
                        <option value="">-- Select a User --</option>
                        {users.map((user) => (
                            <option value={user.id} key={user.id}>
                                {user.userName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Navbar;





// import React,{useState,useEffect} from 'react'
// import { useSelector,useDispatch } from 'react-redux';
// import { setTeritoryData } from '../features/refineSlice';

// const Navbar = () => {
//     const dispatch=useDispatch();
// const [users, setUsers] = useState([]);
// const [selectedUserId, setSelectedUserId] = useState("");
// console.log('✌️selectedUserId --->', selectedUserId);
// const [selectedUser, setSelectedUser] = useState(null);
// console.log('✌️selectedUser --->', selectedUser);

// const [accounts, setAccounts] = useState([]);
// console.log('✌️accounts --->', accounts);

// const [teritoryData,setTeritoryData]=useState([])

// const teritoryDataFilter=accounts.filter((account)=>
//     // console.log('✌️account --->', account)
//     account.territory===selectedUser?.territory
// )
// console.log('✌️teritoryDataFilter --->', teritoryDataFilter.slice(0,99));


//   useEffect(() => {
//     if(teritoryDataFilter){
//       // dispatch(setTeritoryData(teritoryDataFilter.slice(0, 99)));
//       dispatch(setTeritoryData([{ id: 1, name: 'Sample Territory' }]));
//     }
    
//   }, [dispatch, teritoryDataFilter]);   

//     useEffect(()=>{
//         const findUser=users.find((user)=>user.id===selectedUserId)
//         setSelectedUser(findUser)
//     },[selectedUserId])


//     useEffect(()=>{
//         const fetchUsers = async () => {
//             try {
//               const response = await fetch("http://localhost:3001/users"); // Fetch API
//               if (!response.ok) {
//                 throw new Error("Failed to fetch users");
//               }
//               const data = await response.json(); // Parse JSON data
//               setUsers(data); // Update state with fetched users
//             } catch (error) {
//               console.error("Error fetching users:", error);
//             }
//           };

//           const fetchAccounts=async()=>{
//             try {
//               const response = await fetch("http://localhost:3001/accounts"); // Fetch API
//               if (!response.ok) {
//                 throw new Error("Failed to fetch accounts");
//               }
//               const data = await response.json(); // Parse JSON data
//               setAccounts(data); // Update state with fetched accounts
//             }catch{
//                 console.error("Error fetching users:", error);
//             }
//           }
      
//           fetchUsers();
//           fetchAccounts();
//     },[])



//   return (
//     <div className='navbar bg-blue-500 w-full '>
//       <div className="nav-in py-2 px-4">
//         <div className="selection-option ">
//             <h5 className='text-white'>
//                 Select User
//             </h5>

//             <select name="" id="" className='min-w-[200px]'
//              value={selectedUserId}
//              onChange={(e) => setSelectedUserId(e.target.value)}
//             >
//             <option value="">-- Select a User --</option>
//             {users.map((user) => (
//               <option value={user.id} key={user.id}>
//                 {user.userName}
//               </option>
//             ))}
               
                
//             </select>

//         </div>

//       </div>
//     </div>
//   )
// }

// export default Navbar


















