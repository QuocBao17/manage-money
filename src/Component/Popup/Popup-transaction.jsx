import { useState } from "react";
import { database } from "../../Firebase/Config/firebaseConfig";
import { doc,setDoc} from "firebase/firestore"; 
const PopupTransaction =(props)=>{
    const {addTransaction,info,transactionHistory,change,date,money,totalExpense,input}=props;
    let {income,expense}=props;
    const clearForm=()=>{;
        setFieldsInput({
        })
        let errors={};
        setErrors(errors)
        setMess(null);
    }
    const onClose=(e)=>{
        e.preventDefault();
        props.getStatusTransaction(false);
        clearForm();
    }
    const [mess,setMess]=useState();
    const [incomeStatus,setIncomeStatus]=useState(true);
    const [expenseStatus,setExpenseStatus]=useState(false);
    const incomeCheck=()=>{
        setIncomeStatus(true);
        setExpenseStatus(false);
    }
    const expenseCheck=()=>{
        setExpenseStatus(true);
        setIncomeStatus(false);
    }
    const [fieldsInput,setFieldsInput]=useState([]);
    const [errors,setErrors]=useState([]);
    var moneyCanUse =[];
    for(let i=0;i<totalExpense.length;i++){
        moneyCanUse[i]=(money[0].value)*input[i].value/100-totalExpense[i].value;
    }
    const checkValidInput=(errors,formIsEnter)=>{
        if (typeof fieldsInput['money']=='undefined' || fieldsInput['money']==='') {
            formIsEnter = false;
            errors['money'] = 'Please enter money'
        }
        if(typeof fieldsInput['decription']=='undefined'){
            formIsEnter = false;
            errors['decription'] = 'Please enter decription'
        }
        if(typeof fieldsInput['date']=='undefined' ||fieldsInput['decription'===''] ){
            formIsEnter = false;
            errors['date'] = 'Please enter date'
        }
        setErrors(errors)
        return formIsEnter;
    }
    const handleChange=(e)=>{
        const target=e.target;
        const value=target.value;
        const name=target.name;
        if(name == "money" && value > 9000000000) return; 
        setFieldsInput(
            {
                ...fieldsInput,
                [name]:value
            }
        )
        
    }

    const onSave=(email)=>{
        const formIsEnter =true;
        let errors={};
        if(checkValidInput(errors,formIsEnter)){
            let checkmoney=true;
            if(fieldsInput.action===undefined){
                if(incomeStatus){
                    fieldsInput.action='income'
                }
                if(expenseStatus){
                    fieldsInput.action='expense'
                }
            }
            if(fieldsInput.jar===undefined && fieldsInput.action==='expense'){
                fieldsInput.jar='Thiết yếu'
            }
            if(fieldsInput.jar===undefined && fieldsInput.action==='income'){
                fieldsInput.jar='Thu nhập'
            }
            if(fieldsInput.jar==="Thiết yếu"&&fieldsInput.money>moneyCanUse[0]){
                setMess('Vượt quá số tiền hiện có trong hũ')
                checkmoney=false;
            }
            if(fieldsInput.jar==="Giáo dục"&&fieldsInput.money>moneyCanUse[1]){
                setMess('Vượt quá số tiền hiện có trong hũ')
                checkmoney=false
            }
            if(fieldsInput.jar==="Tiết kiệm"&&fieldsInput.money>moneyCanUse[2]){
                setMess('Vượt quá số tiền hiện có trong hũ')
                checkmoney=false
            }
            if(fieldsInput.jar==="Hưởng thụ"&&fieldsInput.money>moneyCanUse[3]){
                setMess('Vượt quá số tiền hiện có trong hũ')
                checkmoney=false
            }
            if(fieldsInput.jar==="Đầu tư"&&fieldsInput.money>moneyCanUse[4]){
                setMess('Vượt quá số tiền hiện có trong hũ')
                checkmoney=false
            }
            if(fieldsInput.jar==="Thiện tâm"&&fieldsInput.money>moneyCanUse[5]){
                setMess('Vượt quá số tiền hiện có trong hũ')
                checkmoney=false
            }
            if(checkmoney){
                clearForm();
                props.getChange(!change);
                props.getStatusTransaction(false);
                transactionHistory.push(fieldsInput);
                const data={
                    email:email,
                    arr:transactionHistory
                }
                setDoc(doc(database, "history",email),data);
                if(fieldsInput.action==='income'){
                    const data={
                        email:email,
                        income:Number(money[0].value)+Number(fieldsInput.money),
                        expense:money[1].value
                    }
                    setDoc(doc(database, "money",email),data);
                }
                else{
                    const data={
                        email:email,
                        income:money[0].value,
                        expense:Number(money[1].value)+Number(fieldsInput.money)
                    }
                    setDoc(doc(database, "money",email),data);
                }
            }
        }
    }
    return (
        <div className={`${addTransaction?'scale-setting-1':'scale-setting-0'} absolute w-full top-[150px] xl:top-[300px] p-5 z-50 md:w-1/2 md:left-[25%] lg:w-1/3 lg:left-[35%] rounded-lg`}>
            <div className="bg-hover p-5">
                <p className="font-bold text-slate-700">THÊM GIAO DỊCH</p>
                <div className="p-2 my-5 flex flex-col">
                    
                    <div className=" flex space-x-3 ">
                        <div className="my-5 ">
                        <label htmlFor="thunhap" className={`${incomeStatus?'bg-blue-100 text-white':'bg-white text-slate-600'} px-6 py-2 rounded-md lg:w-1/2 text-xs `}>Thu Nhập</label>
                            <input name='action' value='income' className="hidden"  id='thunhap' type="radio" onClick={incomeCheck} onChange={handleChange} />
                        </div>
                        <div className="my-5">
                            <label htmlFor="chitieu" className={`${expenseStatus?'bg-blue-100 text-white':'bg-white text-slate-600'} px-6 py-2 rounded-md lg:w-1/2 w-40 text-xs `}>Chi tiêu</label>
                            <input name='action' value='expense' className="hidden"  id="chitieu" type="radio" onClick={expenseCheck}onChange={handleChange}  />
                        </div>
                    </div>
                    <div>
                        <input type="number"  placeholder="0đ"  className="w-full px-4 py-2 bg-white my-2 rounded-md" onChange={handleChange} name='money' value={fieldsInput.money||''} />
                        <p className="text-red-500 text-xs mb-2 ml-2">{errors['money']}</p>
                        <input type="date" min={`${date.year}-${date.month}-01`} max={`${date.year}-${date.month}-${date.day}`}  className="w-full px-4 py-2 bg-white my-2 rounded-md" onChange={handleChange} name='date' value={fieldsInput.date||''} />
                        <p className="text-red-500 text-xs mb-2 ml-2">{errors['date']}</p>
                        <input type="text" placeholder="Mô tả" className="w-full px-4 py-2 bg-white my-2 rounded-md"  onChange={handleChange} name='decription' value={fieldsInput.decription||''}/>
                        <p className="text-red-500 text-xs mb-2 ml-2">{errors['decription']}</p>
                        {
                            expenseStatus?  <select className="w-40 px-4 py-2 bg-white my-2 rounded-md lg:w-1/2" onChange={handleChange}  name='jar' value={fieldsInput.jar}>
                            
                            <option>Thiết yếu</option>
                            <option>Giáo dục</option>
                            <option>Đầu tư</option>
                            <option>Tiết kiệm</option>
                            <option>Hưởng thụ</option>
                            <option >Thiện tâm</option>
                        </select>:null
                        }
                    </div>
                </div>
                <p className="text-red-500 text-xs mb-2 ml-2 text-center mb-5">{mess}</p>
                <div className="flex space-x-3 items-center justify-center">
                    <button className="text-xs px-4 py-2 bg-white rounded-md" onClick={onClose}>Đóng</button>
                    <button className="text-xs px-4 py-2 rounded-md bg-blue-100 text-white" onClick={()=>onSave(info.email)}>Lưu</button>
                </div>
                
            </div>
        </div>
    )
}
export default PopupTransaction;