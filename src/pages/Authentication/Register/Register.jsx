import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const Register = () => {
    const {signUp,setUser,updateUser} = useAuth();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [profilePic,setProfilePic] = useState('');

    const onSubmit = data =>{
        console.log(data);

        signUp(data.email,data.password).then(async(result)=>{
            const user = result.user;
            
            // update in database        
            const userInfo = {
                email: data.email,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            }
            
            const userRes = await axiosInstance.post('/users',userInfo);
            console.log(userRes.data);


            // update in firebase
            const userProfile = {
                displayName: data.name,
                photoURL: profilePic
            }
            updateUser(userProfile)
            .then(()=>{
                console.log('profile name and pic updated');

                const updatedUser = {
                    ...user,
                    displayName: data.name,
                    photoURL: profilePic
                }

                setUser(updatedUser);
                toast.success("Registration successful!");
                navigate('/');
            })
            .catch(error=>{
                console.log(error);
            })
        })
        .catch(error=>{
            console.log(error);
            toast.error(error.message);
        })
    }

    const handleImgUpload = async(e) =>{
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image',image);
    
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,formData);
        setProfilePic(res.data.data.url);
    }


    return (
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6">
            <h1 className="text-4xl font-bold mb-4">Create an Account!</h1>
            <div className="space-y-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input type="name" {...register("name", {required: true})} className="input" placeholder="Your name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                        }
                        <label className="label">Image</label>
                        <input type="file"
                        onChange={handleImgUpload}
                        className="input" placeholder="Your profile picture" />
                        
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
                        <button type='submit' className="btn btn-primary text-black mt-4">Register</button>
                    </fieldset>
                </form>
                <SocialLogin/>
            </div>
            </div>
    );
};

export default Register;