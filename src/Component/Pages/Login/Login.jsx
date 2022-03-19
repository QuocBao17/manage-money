import { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "./../../../Firebase/Config/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const Login=(props)=>{
    const [popupStatus,setPopupStatus]=useState(false);
    const [fieldsInput, setFieldsInput]=useState({
        fields:{},
        errors:{},
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const target =e.target;
        const value=target.value;
        const name=target.name;
        const fileds=fieldsInput.fields;
        setFieldsInput({
            ...fieldsInput,
            fields:{
                ...fileds,
                [name]:value // thêm phần tử fields vào inputField, thêm name value vào filed có sẵn
            }
        })
    };
    const checkValidInput=(errors,formIsEnter)=>{
        let fields = fieldsInput.fields;
        if (typeof fields['email']=='undefined') {
            formIsEnter = false;
            errors['email'] = 'Please enter email'
        }
        else{
            let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
            if (!regex.test(fields['email'])) {
                formIsEnter = false;
                errors['email'] = 'The input is not valid email address'
            }
        }
        if (typeof fields['password']=='undefined') {
            formIsEnter = false;
            errors['password'] = 'Please enter password'
        }
        else{
            if ((fields['password'].length) < 6) {
                formIsEnter = false;
                errors['password'] = 'The password must be at least 6 characters'
            }
        }
        setFieldsInput({
            ...fieldsInput,
            errors// hoặc errors: errors ES6
        })
        return formIsEnter;
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        let formIsEnter=true;
        if(checkValidInput(errors,formIsEnter)){
            let email=fieldsInput.fields['email'];
            let password=fieldsInput.fields['password']
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/index')
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              let errors={};
              console.log(errorCode);
              if(errorCode==='auth/user-not-found'||errorCode==='auth/wrong-password'){
                  errors['password']='Email or password wrong';
                  setFieldsInput({
                    ...fieldsInput,
                    errors
                })
              }
            });
        }
    }
    // const loginGoogle=(e)=>{
    //     const auth = getAuth();
    //     getRedirectResult(auth)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access Google APIs.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;

    //         // The signed-in user info.
    //         const user = result.user;
    //         navigate('/index')
    //         console.log(user);
    //     }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         // ...
    //     });
    // }
    return(
        <div className="w-full flex items-center justify-center position: relative z-10">
        <div className="lg:w-1/3 2xl:w-1/4 bg-gray w-full sm:w-1/2 p-5 sm:rounded-xl lg:rounded-xl">
            <p className="font-bold text-center text-2xl text-slate-700 mb-4 2xl:text-4xl">Hello Again!</p>
            <p className=" text-center text-xl text-slate-600 mb-8 2xl:text-2xl">Wellcome back you've been missed</p>
            <div>
                <form action="" className="flex flex-col">
                    <label className="text-slate-700 2xl:mb-3 2xl:text-2xl text-md pl-3 pb-0.5">Email</label>
                    <input type="email" className="p-2 2xl:p-5 text-xs px-3 rounded-md  outline-slate-300 border-neutral-300 border" name='email' value={fieldsInput.fields['email'] || ''} onChange={handleChange}/>
                    <span className="text-xs text-red-500 ml-3 mt-1 mb-2">{fieldsInput.errors['email']}</span>
                    <label className="text-slate-700 2xl:mb-3 2xl:text-2xl text-md pl-2 pb-2">Password</label>
                    <input type="password" className=" rounded-md p-2 2xl:p-5 px-3 text-xs outline-slate-300 border-neutral-300 border" name='password' value={fieldsInput.fields['password']||''} onChange={handleChange} />
                    <span className="text-xs text-red-500 ml-3 mt-1 mb-2">{fieldsInput.errors['password']}</span>
                    <p className="text-blue cursor-pointer text-xs 2xl:text-lg text-right text-blue-100 hover:underline duration-500"><Link to='/recovery'>Recovery Password</Link></p>
                    <button className="px-5 py-2 2xl:py-4 2xl:text-xl bg-blue hover:bg-blue-100 my-5 text-white text-sm cursor-pointer hover:bg-violet duration-700 2xl:my-10 2xl:py-4 2xl:text-xl " type="submit" onClick={onSubmit}>Sign In</button>
                </form>
                <p className="relative text-center before:left-[30px] md:before:w-14 md:after:w-14 xl:after:w-28 xl:before:w-28 2xl:before:w-32 2xl:before:h-1 2xl:before:top-[17px] 2xl:after:top-[17px] 2xl:after:w-32 2xl:text-3xl before:top-[12px] before:absolute before:bg-blue before:w-10 before:h-0.5 z-30 after:top-[12px] after:right-[30px] after:absolute after:bg-blue after:w-10 after:h-0.5 z-30">Or continue with</p>
                <div className="flex justify-between w-2/3 mx-auto my-5">
                        <div className="cursor-pointer hover:border-blue hover:border-2 hover:bg-blue hover:text-white duration-700 border-white bg-white rounded-xl w-10 h-10 2xl:my-10     md:w-14 md:h-14 flex items-center justify-center 2xl:w-24 2xl:h-24"><i className="2xl:text-4xl text-xl fa-brands fa-facebook"></i></div>
                        <div className="cursor-pointer hover:border-blue hover:border-2 hover:bg-blue hover:text-white duration-700 border-white bg-white rounded-xl w-10 h-10 2xl:my-10     md:w-14 md:h-14 flex items-center justify-center 2xl:w-24 2xl:h-24"><i className="2xl:text-4xl text-xl fa-brands fa-google"></i></div>
                        <div className="cursor-pointer hover:border-blue hover:border-2 hover:bg-blue hover:text-white duration-700 border-white bg-white rounded-xl w-10 h-10 2xl:my-10     md:w-14 md:h-14 flex items-center justify-center 2xl:w-24 2xl:h-24"><i className="2xl:text-4xl text-xl fa-brands fa-twitter-square"></i></div>
                    </div>
            </div>
            <p className="text-xs 2xl:text-lg text-center text-slate-600 mb-8">Not a member? <span className="text-blue-100  cursor-pointer hover:underline duration-500"><Link to={'/register'}>Register now</Link></span></p>
        </div>
    </div>
    )
}
export default Login;