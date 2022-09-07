import { useEffect, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";

const Profile = () => {

    const [ email, setEmail ]=useState('');
    const [ phone, setPhone ] = useState('');
    const [ password, setPassword ] = useState('');


    useEffect(()=>{
        const abortCont = new AbortController();
        fetch('',{signal: abortCont.signal})
        .then(res=>{
            if(res.ok){
                res.json();
            }
        })
        .then((res)=>{

        })
        .catch((err)=>{

        })
    })

    return ( <div className="profile">
        <ProfileSidebar />
    </div> );
}
 
export default Profile;