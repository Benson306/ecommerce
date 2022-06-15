const NotificationProvider = (props) => {
    const notifications =[
        {
            id: v4
        }
    ]
  return ( 
        <div>
            {props.children}
        </div>
     );
}
 
export default NotificationProvider;