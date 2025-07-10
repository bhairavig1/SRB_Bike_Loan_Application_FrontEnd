
import React from 'react'

function Profile() {

  const adminJson = localStorage.getItem("admin");
  const { usertype,empFirstName,empLastName,empImage } = JSON.parse(adminJson);
  console.log("UserType"+usertype);
  console.log(empFirstName);
  console.log(empLastName);

  
  return (
    <div >
         <h2>UserType:{usertype}</h2>
         <h2>Name:{empFirstName}</h2>
         <h2>LastName:{empLastName}</h2>
         <img src={'data:image/jpeg;base64, '+empImage} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%" }}></img>

    </div>
  )
}

export default Profile