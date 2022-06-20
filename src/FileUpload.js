import { useState } from 'react'

const FileUpload = () => {

    const [file1, setFile1] = useState("");
    const [file2, setFile2] = useState("");

    const [name, setName] = useState("");

    console.log(name)

    function handleSubmit(e){
        e.preventDefault();
    

        let formData = new FormData(); 
        formData.append('file1',file1)
        formData.append('file2',file2)
        formData.append("name",name)
        
        fetch('http://localhost:8001/images',{
            method: 'POST',
            body: formData
        })
        .then(()=>{
            console.log("sent")
        })
    }



    return ( <div>
        <br />
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={e => { setFile1(e.target.files[0])}} />
            <br />
            <br />
            <input type="file" onChange={e => { setFile2(e.target.files[0])}} />
            <br />
            <br />
            <input type="text" onChange={e => setName(e.target.value) }/>
            <input type="submit"/>
        </form>


    </div> );
}
 
export default FileUpload;