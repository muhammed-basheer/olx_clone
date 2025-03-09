import { createContext, useState } from "react";

export const PostContext =  createContext(null);

function Post({children}){
    const [postDetail, setPostDetails] = useState();
    console.log("postDetai////////////",postDetail);
    

    return(
        <PostContext.Provider value={{postDetail,setPostDetails}}>
            {children}
        </PostContext.Provider> 
    )
}

export default Post