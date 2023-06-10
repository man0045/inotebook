import React, {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Signup = (props) => {
    
        const [credentials, setCredentials] = useState({name: "",email: "",password: "", cpassword:""}) 

        let history=useHistory();
        const handleSubmit = async (e) => {
            e.preventDefault();
            const {name , email, password, cpassword}=credentials;
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name , email, password})
            });
            const json = await response.json()
            console.log(json);
            if(json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken); 
                history.push("/");
                props.showAlert("Successfully created a account", "success")
            }
            else{
                props.showAlert("Invalid Credentials", "danger")
            }
    
           
        }
    
        const onChange = (e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
        }
    return (
        <div className="container mt-2">
            <h2 className="my-2">Signup to continue the steps</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlfor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="none" name="name"onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlfor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlfor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" name="Password"onChange={onChange} minlength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlfor="cPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cPassword1" name="cPassword"onChange={onChange} minlemgth={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
     )
}

export default Signup