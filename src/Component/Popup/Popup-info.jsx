import { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import { doc, collection,setDoc,getDocs, deleteDoc} from "firebase/firestore"; 
import { database } from "../../Firebase/Config/firebaseConfig";
const PopupInfo=(props)=>{
    const {info}=props;
    const [changePasswordStatus,setChangePasswordStatus]=useState(false);
    const handleStatus=()=>{
        setChangePasswordStatus(!changePasswordStatus)
    }
    const {popupSettingMobile}=props;
    const onClose=()=>{
        props.getStatusPopupSettingMobile(false);
        props.getLayoutStatus(false);
        setChangePasswordStatus(false);
        clearForm();
    }
    const [fieldsInput, setFieldsInput]=useState({
        fields:{},
        errors:{}
    })
    const checkValidInput=(errors,formIsEnter)=>{
        let fields = fieldsInput.fields;
        if (typeof fields['oldPassword']=='undefined') {
            formIsEnter = false;
            errors['oldPassword'] = 'Please enter password'
        }
        else{
            if(fields['oldPassword']!==info.password){
                formIsEnter = false;
                errors['oldPassword'] = 'The old password wrong';
            }
        }
        if (typeof fields['newPassword']=='undefined') {
            formIsEnter = false;
            errors['newPassword'] = 'Please enter password'
        }
        else{
            if ((fields['newPassword'].length) < 6) {
                formIsEnter = false;
                errors['newPassword'] = 'The password must be at least 6 characters'
            }
        }
        if (typeof fields['confirmPassword']=="undefined") {
            formIsEnter = false;
            errors['confirmPassword'] = 'Please enter password confirmation'
        }
        else{
            if ((fields['confirmPassword'] !== fields['newPassword'])) {
                formIsEnter = false;
                errors['confirmPassword'] = 'The password confirmation does not match '
            }
        }
        setFieldsInput({
            ...fieldsInput,
            errors// hoặc errors: errors ES6
        })
        return formIsEnter;
    }
    const clearForm=()=>{
        let fields={};
        let errors={};
        setFieldsInput({
            fields,
            errors
        })
    }
    const handleChange=(e)=>{
        const target=e.target;
        const value=target.value;
        const name=target.name;
        let fields=fieldsInput.fields;
        setFieldsInput({
            ...fieldsInput,
            fields:{
                ...fields,
                [name]:value
            }
        })
    }
    const saveDataToFirebase=(email, newPassword)=>{
        const data={
            userName:info.userName,
            email:info.email,
            nickName:info.userName,
            password:newPassword,
            avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGz0V-QocsAAlQaM-8ynkCJtVBmPmRllKRHQ&usqp=CAU'
        }
        setDoc(doc(database, "users",email),data);
    }
    const saveInfo=(e)=>{
        e.preventDefault();
        let errors={};
        let formIsEnter=true;
        if(checkValidInput(errors,formIsEnter)){
        const auth = getAuth();
        const user = auth.currentUser;
        const newPassword = fieldsInput.fields['newPassword'];
        saveDataToFirebase(info.email, newPassword)
        updatePassword(user, newPassword).then(() => {
                let errors={};
                errors['success']='Update successfully';
                setFieldsInput({
                    ...fieldsInput,
                    errors
                })
        })
    }
}
    return (
        <div className={`${popupSettingMobile?'scale-setting-1':'scale-setting-0'} absolute w-full top-[-30px] p-5 z-50 md:w-1/2 md:left-[25%] lg:w-1/3 lg:left-[35%]`}>
            <div className="bg-hover p-5">
                <p className="font-bold text-slate-700">CÀI ĐẶT</p>
                <div className="p-2 my-5">
                    <p className="font-bold">CÀI ĐẶT TÀI KHOẢN</p>
                    <p className="text-xs my-2 lg:text-md">TÊN ĐĂNG NHẬP: <span className="ml-3">{info.userName}</span></p>
                    <p className="text-xs my-2 lg:text-md">EMAIL: <span className="ml-3">{info.email}</span></p>
                    <button className="bg-blue-100 text-xs py-2 px-3 rounded-lg my-5 text-white" onClick={handleStatus}>Đổi mật khẩu</button>
                    <div className={`${changePasswordStatus?'block':'hidden'}`}>
                        <p className="mb-4 font-bold">ĐỔI MẬT KHẨU</p>
                        <div>
                            <input className="rounded-xl px-5 py-1 placeholder" type="password" placeholder="Mật khẩu cũ" name='oldPassword' onChange={handleChange}/>
                            <p className="text-red-500 text-xs ml-3 mt-1 mb-3">{fieldsInput.errors['oldPassword']}</p>
                            <input className="rounded-xl px-5 py-1  placeholder" type="password" placeholder="Mật khẩu mới" name='newPassword' onChange={handleChange}/>
                            <p className="text-red-500 text-xs ml-3 mt-1 mb-3">{fieldsInput.errors['newPassword']}</p>
                            <input className="rounded-xl px-5 py-1  placeholder" type="password" placeholder="Xác nhận mật khẩu" name='confirmPassword' onChange={handleChange} />
                            <p className="text-red-500 text-xs ml-3 mt-1 mb-3">{fieldsInput.errors['confirmPassword']}</p>
                        </div>
                    </div>
                    <p className="text-center my-5 text-blue-100 font-bold">{fieldsInput.errors['success']}</p>
                    <div className="flex items-center justify-center mt-4">
                        <div className="flex space-x-3">
                            <button className="text-xs px-4 py-2 bg-white rounded-md" onClick={onClose}>Đóng</button>
                            <button className="text-xs px-4 py-2 rounded-md bg-blue-100 text-white" onClick={saveInfo}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopupInfo;