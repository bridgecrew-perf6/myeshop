// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// import{ useEffect, useState } from 'react'
// import axios from 'axios'; 


// export default function BasicColumnsGrid() {
//     const [cart, setcart] = useState([]);

//     useEffect(() => {
//         axios.post('http://localhost:4000/review-list').then(
//           (res) => {
//             console.log(res.data.data);
//             setcart(res.data.data);
    
//           },
//         )
//       }, []);
//   return (
//     <div style={{ height: 250, width: '100%' }}>
//       <DataGrid
//         columns={
//             [
//                 { field: 'id' },
//                 { field: 'Name' },
//                 { field: 'Review' },
//                 { field: 'Rating' },

            
//             ]
           

//         }
//         rows ={ cart.map((e)=>{
//             [
          
//                 {
//                   id: 1,
//                   Name: e,
//                   Review:"uiu",
//                   Rating: 20,
//                 },
//                 {
//                   id: 2,
//                   Name: '@MUI',
//                   Review:"uiu",
//                   Rating: 20,
//                 },
//                 {
//                   id: 3,
//                   Name: '@MUI',
//                   Review:"uiu",
//                   Rating: 20,
//                 }
//               ]    
//         })
//     }
      
//       />
      
//     </div>
//   );
// }
