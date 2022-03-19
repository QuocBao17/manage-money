import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../../Firebase/Config/firebaseConfig";
import { Link } from "react-router-dom";
import Popup from './../../Popup/Popup'
const Recovery=()=>{
    const [fieldsInput, setFieldsInput]= useState({
        fields:{},
        errors:{}
    })
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
        setFieldsInput({
            ...fieldsInput,
            errors// hoặc errors: errors ES6
        })
        return formIsEnter;
    }
    const handleChange=(e)=>{
        const target=e.target;
        const name=target.name;
        const value=target.value;
        const fields =fieldsInput.fields;
        setFieldsInput({
            ...fieldsInput,
            fields:{
                ...fields,
                [name]:value
            }
        })
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        let formIsEnter=true;
        if(checkValidInput(errors,formIsEnter)){
            let email=fieldsInput.fields['email'];
            const auth = getAuth(app);
            sendPasswordResetEmail(auth, email)
            .then(() => {
                setPopupStatus(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode==='auth/user-not-found'){
                    let errors={};
                    errors['email']='Email address wrong!';
                    setFieldsInput({
                        ...fieldsInput,
                        errors
                    })
                }
            });
        }
    }
    const namePage='Successful password reset';
    const textPage='Please check your email to get new password'
    const [popupStatus, setPopupStatus]=useState(false);
    const closePopup=(status)=>{
        setPopupStatus(status);
    }
    return(
        <div className="w-full flex items-center justify-center position: relative z-10">
                {
                    popupStatus? <div className="w-full h-screen bg-slate-900 opacity-20 position: absolute top-0 z-20 py-0"></div>:null
                }
                <Popup namePage={namePage} textPage={textPage} popupStatus={popupStatus} closePopup={closePopup}></Popup>
                 <div className="lg:w-1/3 2xl:w-1/4 bg-gray w-full sm:w-1/2 p-5 sm:rounded-xl lg:rounded-xl">
                <Link to='/sign-in'><i className="2xl:text-3xl fa-solid fa-arrow-left"></i></Link>
                <p className="mt-5 font-bold text-center text-2xl text-slate-700 mb-4 2xl:text-4xl">Forgot your password</p>
                <p className=" text-center text-sm text-slate-600 mb-8 2xl:text-2xl">Enter your registered email below to recevice password reset instruction</p>
                <div>
                    <img className="my-5 rounded-3xl" src="https://www.digital38.com.vn/wp-content/uploads/2020/12/email-marketing-1.jpeg" alt="" />
                </div>
                <form>
                    <input className="w-full p-3 2xl:p-5 text-xs px-3 rounded-md  outline-slate-300 border-neutral-300 border" type="text" placeholder="Email" value={fieldsInput.fields['email']||''} name='email' onChange={handleChange} />
                    <span className="text-xs text-red-500 ml-3 mt-1">{fieldsInput.errors['email']}</span>
                    <p className="mt-5 text-xs 2xl:text-lg text-center text-slate-600 text-center">Remember password? <span className="text-blue-100  cursor-pointer hover:underline duration-500"><Link to='/sign-in'>Login</Link></span></p>
                    <button className="px-5 py-2 2xl:py-4 2xl:text-xl bg-blue hover:bg-blue-100 my-5 text-white text-sm cursor-pointer hover:bg-violet duration-700 2xl:my-10 2xl:py-4 2xl:text-xl w-full" type="submit" onClick={onSubmit}>Send</button>
                </form>
            </div>
        </div>
    )
}
export default Recovery;