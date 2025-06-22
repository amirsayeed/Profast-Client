import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
    const {signIn,setUser} = useAuth();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const location = useLocation();
    //console.log(location);
    const navigate = useNavigate();

    const onSubmit = data =>{;
        console.log(data);
        signIn(data.email,data.password).then(result=>{
            setUser(result.user);
            toast.success('Login successful');
            navigate(`${location?.state ? location.state : '/'}`);
        })
        .catch(error=>{
            console.log(error);
            toast.error(error.message);
        })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <div className="space-y-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                <label className="label">Email</label>
                <input type="email" {...register("email")} className="input" placeholder="Email" />
                
                <label className="label">Password</label>
                <input type="password" {...register("password", {
                    required: true, minLength: 6
                })} 
                className="input" placeholder="Password" />
                {
                    errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                }
                {
                    errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be atleast 6 characters</p>
                }

                <div><a className="link link-hover">Forgot password?</a></div>
                <button type='submit' className="btn btn-primary text-black mt-4">Login</button>
                </fieldset>
            </form>
            <SocialLogin location={location} />
            <div className='mt-4 text-center'><p className="link link-hover">New to this website? Please <span className='text-blue-400 underline'><Link to='/register'>Register</Link></span></p></div>
            </div>
        </div>    
    );
};

export default Login;