import '../index.css'

const AdminLogin = () => {
    return ( 
        <div className="loginadmin">
            <br />
            <br />
            <br />
            <form className="adminLogin">
                <input type="email" name="" id=""  placeholder='Email' required/>
                <br />
                <br />
                <input type="password" name="" id="" placeholder="Password" required/>
                <br />
                <br />
                <input type="submit" value='Login' name="" id="" />
            </form>
        </div>
     );
}

export default AdminLogin;