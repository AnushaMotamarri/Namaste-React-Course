import logo from '../../public/images/hungerpangslogo.png'
const Title =()=> (
    <a href="/">
 <img className="logo" src={logo}></img>
    </a> 
    
 )
export default  Header = () =>{
    return  <div className="header">
        <Title/>
<div className="nav-items">
    <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Cart</li>
    </ul>
</div>
    </div> 
}