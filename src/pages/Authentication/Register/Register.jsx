import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const Register = () => {
    const {signUp,setUser} = useAuth();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = data =>{
        console.log(data);
        
        signUp(data.email,data.password).then(result=>{
            console.log(result.user);
            setUser(result.user);
            toast.success("Registration successful!");
            navigate('/');
        })
        .catch(error=>{
            console.log(error);
            toast.error(error.message);
        })
    }


    return (
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6">
            <h1 className="text-4xl font-bold mb-4">Create an Account!</h1>
            <div className="space-y-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register("email", {required: true})} className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }
                        <label className="label">Password</label>
                        <input type="password"
                        {...register("password", {required: true, minLength: 6})}
                        className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be atleast 6 characters long</p>
                        }
                        <div className='mt-2'><p className="link link-hover">Already have an account? Please <span className='text-blue-400 underline'><Link to='/login'>Login</Link></span></p></div>
                        <button type='submit' className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                </form>
            </div>
            </div>
    );
};

export default Register;