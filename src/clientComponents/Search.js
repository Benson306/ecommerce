const Search = () => {
    return ( <div className="search">
        <form action="" style={{display:'flex'}}>
                        <input type="text" name="" placeholder="Search products, brands and categories" required style={{width:'70%',padding:'10px', marginRight:'20px'}} />
                        <input type="submit" value="Search" id="" style={{height:'30px',backgroundColor:'#030c3b', border:'1px solid orange', borderRadius:'5px',width:'20%', marginTop:'5px',color:'white',fontSize:'16px'}} />
        </form>
    </div> );
}
 
export default Search;