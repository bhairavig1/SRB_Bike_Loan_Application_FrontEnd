import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function GenerateSanctionLetter() {

  const {id}=useParams()
  const {register,handleSubmit}=useForm();
  const navigate = useNavigate();

  
  



  const generateSanction=(data)=>{
    console.log(data);
      axios.put(`http://localhost:1004/cm/addsanction/${id}/${data.tenure}`)
      .then(res=>{
        if(res.status===200){
          axios.get(`http://localhost:1004/mail/sendSantionLetterMail/${id}`)
          .then(res=>{alert("mail send")
            navigate("/dashboard")

          })


        }
       })
  }

  return (
    <div>
     <form onSubmit={handleSubmit(generateSanction)} >
      Tenure:<input type='number' {...register("tenure")}/>
      <button type='submit'>Submit</button>
     </form>
    </div>
  )
}

export default GenerateSanctionLetter