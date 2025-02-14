// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import Child from './Child'

// const Practice = () => {

//     const [string,setString] = useState("siddharth")
//     const [count,setCount] = useState(0)

// const callBack=useCallback(()=>{
//   return string
  
// },[string])

// const calculate = useMemo(()=>{
// const a = 10 + 10
// console.log(a)
// },[])
// useEffect(() => {
//     console.log("String updated:", string)
// }, [count])
// // useEffect(()=>{

// // },[])
//   return (
//     <>
//     <div>{count}</div>
//     <button onClick={()=>setCount(count+1)}>Increase Count</button>
//     <div>
//       <Child string={callBack}/>
//     </div>
//     </>
//   )
// }

// export default  Practice
// import React, { useEffect, useMemo, useState } from 'react';
// import Child from './Child';

// const Practice = () => {
//     const [string, setString] = useState("siddhart");
//     const [count, setCount] = useState(0);

//     // ✅ useMemo to memoize the computed string value
//     const memoizedString = useMemo(() => {
//         console.log("Memoized function executed");
//         return string;
//     }, [string]);

//     useEffect(() => {
//         console.log("String updated:", string);
//     }, [string]);

//     return (
//         <>
//             <div>Count: {count}</div>
//             <button onClick={() => setCount(count + 1)}>Increase Count</button>
//             <div>
//                 <Child string={memoizedString} />
//             </div>
//         </>
//     );
// };

// export default Practice;


import React, { Suspense } from 'react'

const ChildComponent = React.lazy(()=>{
    return new Promise((resolve,reject)=>{
   setTimeout(()=> resolve (import("./Child")),2000)
    })
})
const Practice = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading</div>}>
        <ChildComponent/>
        </Suspense>
     
    </div>
  )
}

export default Practice

