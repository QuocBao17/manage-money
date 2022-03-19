import { useState } from "react";
import { Link } from "react-router-dom";
import { app, database } from "./../../../Firebase/Config/firebaseConfig";
import { doc, collection,setDoc,getDocs, deleteDoc} from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Popup from "../../Popup/Popup";
const Register =()=>{
    const [popupStatus,setPopupStatus]=useState(false);
    const [fieldsInput, setFieldsInput]=useState({
        fields:{},
        errors:{},
        isAgreed:false
    })
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
    const handleCheck=()=>{
        setFieldsInput({
            ...fieldsInput,
            isAgreed:!fieldsInput.isAgreed
        })
    }
    const checkValidInput=(errors,formIsEnter)=>{
        let fields = fieldsInput.fields;
        let isAgreed = fieldsInput.isAgreed;
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
        if (typeof fields['userName']=='undefined') {
            formIsEnter = false;
            errors['userName'] = 'Please enter username'
        }
        else{
            if ((fields['userName'].length) < 6) {
                formIsEnter = false;
                errors['userName'] = 'The username must be at least 6 characters'
            }
        }
        if (typeof fields['confirm']=="undefined") {
            formIsEnter = false;
            errors['confirm'] = 'Please enter password confirmation'
        }
        else{
            if ((fields['confirm'] !== fields['password'])) {
                formIsEnter = false;
                errors['confirm'] = 'The password confirmation does not match '
            }
        }
        if (isAgreed === false) {
            formIsEnter = false;
            errors['policy'] = 'You must accept the privacy policy before registering'
        }
        setFieldsInput({
            ...fieldsInput,
            errors// hoặc errors: errors ES6
        })
        return formIsEnter;
    }
    const saveDataToFirebase=(userName,email,password)=>{
        const data={
            userName:userName,
            email:email,
            nickName:userName,
            password:password,
            avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGz0V-QocsAAlQaM-8ynkCJtVBmPmRllKRHQ&usqp=CAU'
        }
        setDoc(doc(database, "users",email),data);
        const money={
            email:email,
            income:0,
            expense:0
        }
        setDoc(doc(database, "money",email),money);
        const history={
            email:email,
            arr : [ 
            ]
        }
        setDoc(doc(database, "history",email),history);
        const jars={
            email:email,
            jar:[
                { name: 'Thiết yếu', value: 65 },
                { name: 'Giáo dục', value: 10 },
                { name: 'Tiết kiệm', value:10 },
                { name: 'Hưởng thụ', value: 5 },
                { name: 'Đầu tư', value:5 },
                { name: 'Thiện tâm', value: 5 }
            ]
        }
        setDoc(doc(database, "jar",email),jars);
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        let formIsEnter=true;
        if(checkValidInput(errors,formIsEnter)){
            let email=fieldsInput.fields['email'];
            let password=fieldsInput.fields['password']
            let userName=fieldsInput.fields['userName']
            const auth = getAuth(app);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setPopupStatus(true);
                    saveDataToFirebase(userName,email,password);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    let errors={};
                    if(errorCode==='auth/email-already-in-use'){
                        errors['confirm']='Email address has been use'
                        setFieldsInput({
                            ...fieldsInput,
                            errors
                        })
                    }
                });
        }
    }
    const closePopup=(status)=>{
        setPopupStatus(status);
    }
    const namePage ='Sign Up Successful!';
    const textPage='You are already a member of our family';
    return (
            <div className="w-full flex items-center justify-center position:relative z-10">
                {
                    popupStatus? <div className="w-full h-full bg-slate-900 opacity-20 position: absolute top-0 z-20 py-0"></div>:null
                }
                <Popup namePage={namePage} textPage={textPage} popupStatus={popupStatus} closePopup={closePopup}></Popup>
                <div className="lg:w-1/3 2xl:w-1/4 bg-gray w-full sm:w-1/2 p-5 sm:rounded-xl lg:rounded-xl">
                    <div>
                        <img className="w-20 rounded-full mx-auto mt-10 mb-5 2xl:w-60" src="https://cdn.dribbble.com/users/942818/screenshots/16438903/media/ec9b36d9b19617d00d4040840566bb8a.jpg?compress=1&resize=400x300&vertical=top" alt="" />
                    </div>
                    <p className="font-bold text-center text-2xl text-slate-700 mb-10 2xl:text-4xl">Get started!</p>
                    <div>
                        <form action="" className="flex flex-col">
                            <label className="text-slate-700 2xl:mb-3 2xl:text-2xl text-md pl-3 pb-0.5">UserName</label>
                            <input type="text" className="p-2 2xl:p-5 text-xs px-3 rounded-md  outline-slate-300 border-neutral-300 border" name='userName' value={fieldsInput.fields['userName'] || ''} onChange={handleChange}/>
                            <span className="text-xs text-red-500 ml-3 mt-1 mb-2">{fieldsInput.errors['userName']}</span>
                            <label className="text-slate-700 2xl:mb-3 2xl:text-2xl text-md pl-3 pb-0.5">Email</label>
                            <input type="email" className="p-2 2xl:p-5 text-xs px-3 rounded-md  outline-slate-300 border-neutral-300 border" name='email' value={fieldsInput.fields['email'] || ''} onChange={handleChange}/>
                            <span className="text-xs text-red-500 ml-3 mt-1 mb-2">{fieldsInput.errors['email']}</span>
                            <label className="text-slate-700 2xl:mb-3 2xl:text-2xl text-md pl-2 pb-2">Password</label>
                            <input type="password" className=" rounded-md p-2 2xl:p-5 px-3 text-xs outline-slate-300 border-neutral-300 border" name='password' value={fieldsInput.fields['password']||''} onChange={handleChange} />
                            <span className="text-xs text-red-500 ml-3 mt-1 mb-2">{fieldsInput.errors['password']}</span>
                            <label className="text-slate-700 2xl:mb-3 2xl:text-2xl text-md pl-2 pb-2">Confirm Password</label>
                            <input type="password" className=" rounded-md p-2 2xl:p-5 px-3 text-xs outline-slate-300 border-neutral-300 border" name='confirm' value={fieldsInput.fields['confirm']||''} onChange={handleChange} />
                            <span className="text-xs text-red-500 ml-3 mt-1 mb-2">{fieldsInput.errors['confirm']}</span>
                            <div className="flex items-center space-x-2 mt-1">
                                <input type="checkbox" onClick={handleCheck}/>
                                <p className="text-xs 2xl:text-xl">I accept the term of service and privacy policy</p>
                            </div>
                            <span  className="text-xs text-red-500 ml-3 mt-1 mb-2">{fieldsInput.errors['policy']}</span>
                            <button className="px-5 py-2 2xl:py-4 2xl:text-xl bg-blue my-10 text-white text-sm cursor-pointer hover:bg-blue-100 duration-700 " type="submit" onClick={onSubmit}>Sign Up</button>
                        </form>
                    </div>
                    <p className="text-xs 2xl:text-lg text-center text-slate-600 mb-8">Already registered? <span className="text-blue-100 cursor-pointer"><Link to={'/sign-in'}>Sign in</Link></span></p>
                </div>
            </div>
    )
}

export default Register;