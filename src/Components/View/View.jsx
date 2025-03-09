import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { db } from '../../firebase/config'; 
import { collection, query, where, getDocs } from 'firebase/firestore';

function View() {
  const [userDetail, setUserDetails] = useState(null);
  console.log('userdetail',userDetail)
  const { postDetail } = useContext(PostContext);

  useEffect(() => {
    if (!postDetail) return; 

    const fetchUserDetails = async () => {
      try {
        const userQuery = query(collection(db, 'users'), where('id', '==', postDetail.userId));
        const querySnapshot = await getDocs(userQuery);
        
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []); 

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetail.url} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetail.price}</p>
          <span>{postDetail.name}</span>
          <p>{postDetail.category}</p>
          <span>{postDetail.createdAt}</span>
        </div>
        {userDetail && <div className="contactDetails">
          <p>Seller details</p>
         
              <p>{userDetail.username }</p>
              <p>{userDetail.phone }</p>
            
        </div>}
      </div>
    </div>
  );
}

export default View;
