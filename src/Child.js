// import React from 'react'

// const Child = ({string}) => {
//     console.log(string(),"childcallback")
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default React.memo(Child)
import React, { memo } from 'react';

const Child = memo(({ string }) => {
    console.log("Child rendered with string:", string);
    return <div>String from Parent: {string}</div>;
});

export default Child;
