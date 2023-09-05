import {useState} from 'react'
import axios from 'axios'
import './HomePage.css'
let HomePage=()=>{
  let [data,setData]=useState({uid: '', title: '', desc: '', dedline: ''})
  let [todo,setTodo]=useState([])
  let [ind,setInd]=useState()
  let [f,setFlag]=useState(true)
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
    console.log(data)

  }
  let add=async()=>
  {
    try{
       await axios.post('/addHomePageData', data);
       setTodo([...todo,data])
       setData({uid: '', title: '', desc: '', dedline: ''})
    }
    catch (error) {
           console.error('Error adding data:', error);
          }
  }
  let del=(index)=>{
    todo.splice(index,1)
    setTodo([...todo])
  }
  

  let edit=(index)=>{
    setData(todo[index])
    setInd(index)
    setFlag(false)
  }
  let upd=()=>{
    todo[ind]=data
    setTodo([...todo])
    setFlag(true)
    setData({uid: '', title: '', desc: '', dedline: ''})
 
  }

  return(
    <div>
      <h2>Laptop Details</h2>
      <input type="text" name="uid" value={data.uid} onChange={fun} placeholder='Name of Brand'/>
      <input type="text" name="title" value={data.title} onChange={fun} placeholder='Series'/>
      <input type="text" name="desc" value={data.desc} onChange={fun} placeholder='Price'/>
      <input type="date" name="dedline" value={data.dedline} onChange={fun} placeholder='Date of Purchase'/>
    {f&&<button onClick={add}>Add</button>}
    {!f&&<button onClick={upd}>Update</button>}

    <div>
      <table border={1}>
      <tr><th>Laptop Brand</th><th>OS</th><th>Price</th><th>Date of Purchase</th></tr>
        {
          todo.map((item,index)=>{
            return(
              <tr>
                <td>{item.uid}</td>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>{item.dedline}</td>
                <td><button onClick={()=>edit(index)}>edit</button></td>
                <td><button onClick={()=>del(index)}>delete</button></td>
              </tr>
            )

          })
        }
      </table>
    </div>
    </div>
  )

}
export default HomePage


// import React, { useState } from 'react';
// import axios from 'axios';

// let HomePage = () => {
//   // ... your existing code ...
//   let [data,setData]=useState({uid: '', title: '', desc: '', dedline: ''})
//   let [todo,setTodo]=useState([])
//   let [ind,setInd]=useState()
//   let [f,setFlag]=useState(true)
//   let fun=(e)=>{
//     setData({...data,[e.target.name]:e.target.value})
//     console.log(data)

//   }
//   let add = async () => {
//     try {
//       await axios.post('/addHomePageData', data);
//       setTodo([...todo, data]);
//       setData({ uid: '', title: '', desc: '', dedline: '' });
//     } catch (error) {
//       console.error('Error adding data:', error);
//     }
//   };

//   let del=(index)=>{
//     todo.splice(index,1)
//     setTodo([...todo])
//   }
  

//   let edit=(index)=>{
//     setData(todo[index])
//     setInd(index)
//     setFlag(false)
//   }
//   let upd=()=>{
//     todo[ind]=data
//     setTodo([...todo])
//     setFlag(true)
//     setData({uid: '', title: '', desc: '', dedline: ''})
 
//   }


//   // ... your existing code ...

//   return(
//     <div>
//       <input type="text" name="uid" value={data.uid} onChange={fun} placeholder='Name of Brand'/>
//       <input type="text" name="title" value={data.title} onChange={fun} placeholder='Series'/>
//       <input type="text" name="desc" value={data.desc} onChange={fun} placeholder='Price'/>
//       <input type="date" name="dedline" value={data.dedline} onChange={fun} placeholder='Date of Purchase'/>
//     {f&&<button onClick={add}>Add</button>}
//     {!f&&<button onClick={upd}>Update</button>}

//     <div>
//       <table border={1}>
//       <tr><th>Laptop Brand</th><th>OS</th><th>Price</th><th>Date of Purchase</th></tr>
//         {
//           todo.map((item,index)=>{
//             return(
//               <tr>
//                 <td>{item.uid}</td>
//                 <td>{item.title}</td>
//                 <td>{item.desc}</td>
//                 <td>{item.dedline}</td>
//                 <td><button onClick={()=>edit(index)}>edit</button></td>
//                 <td><button onClick={()=>del(index)}>delete</button></td>
//               </tr>
//             )

//           })
//         }
//       </table>
//     </div>
//     </div>
//   )
// };

// export default HomePage;



// import React, { useState } from 'react';
// import axios from 'axios';

// let HomePage = () => {
//   // ... your existing code ...
//   let [data,setData]=useState({uid: '', title: '', desc: '', dedline: ''})
//   let [todo,setTodo]=useState([])
//   let [ind,setInd]=useState()
//   let [f,setFlag]=useState(true)
//   let fun=(e)=>{
//     setData({...data,[e.target.name]:e.target.value})
//     console.log(data)

//   }
//   let add = async () => {
//     try {
//       await axios.post('/addHomePageData', data);
//       setTodo([...todo, data]);
//       setData({ uid: '', title: '', desc: '', dedline: '' });
//     } catch (error) {
//       console.error('Error adding data:', error);
//     }
//   };

//   let del=(index)=>{
//     todo.splice(index,1)
//     setTodo([...todo])
//   }
  

//   let edit=(index)=>{
//     setData(todo[index])
//     setInd(index)
//     setFlag(false)
//   }
//   let upd=()=>{
//     todo[ind]=data
//     setTodo([...todo])
//     setFlag(true)
//     setData({uid: '', title: '', desc: '', dedline: ''})
 
//   }


//   // ... your existing code ...

//   return(
//     <div>
//       <input type="text" name="uid" value={data.uid} onChange={fun} placeholder='Name of Brand'/>
//       <input type="text" name="title" value={data.title} onChange={fun} placeholder='Series'/>
//       <input type="text" name="desc" value={data.desc} onChange={fun} placeholder='Price'/>
//       <input type="date" name="dedline" value={data.dedline} onChange={fun} placeholder='Date of Purchase'/>
//     {f&&<button onClick={add}>Add</button>}
//     {!f&&<button onClick={upd}>Update</button>}

//     <div>
//       <table border={1}>
//       <tr><th>Laptop Brand</th><th>OS</th><th>Price</th><th>Date of Purchase</th></tr>
//         {
//           todo.map((item,index)=>{
//             return(
//               <tr>
//                 <td>{item.uid}</td>
//                 <td>{item.title}</td>
//                 <td>{item.desc}</td>
//                 <td>{item.dedline}</td>
//                 <td><button onClick={()=>edit(index)}>edit</button></td>
//                 <td><button onClick={()=>del(index)}>delete</button></td>
//               </tr>
//             )

//           })
//         }
//       </table>
//     </div>
//     </div>
//   )
// };

// export default HomePage;
