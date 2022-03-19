import React, { PureComponent, useState, useRef, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { doc, collection,setDoc,getDocs, deleteDoc, getDoc} from "firebase/firestore"; 
import { PieChart,BarChart,Bar, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer,LineChart,XAxis, YAxis,CartesianGrid } from 'recharts';
import { database } from '../../../Firebase/Config/firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from '../../Header/Header';
import PopupInfo from '../../Popup/Popup-info';
import PopupSettingMobile from '../../Popup/Popup-setting-mobile';
import { async } from '@firebase/util';
import PopupTransaction from '../../Popup/Popup-transaction';
const IndexPage =(props)=>{
    const [change,setChange]=useState(false);
    const getChange=(status)=>{
        setChange(status)
    }
    const [info,setInfo]=useState({}); // save info currentUser
    const myRef = useRef();
    const [fieldsInput,setFieldsInput]=useState([]) // get input fields of 6 jar
    const COLORS = ['#8B4FE4','#F4365C'];
    const [totalExpense, setTotalExpense]=useState(); //get total expense to design bar of jar
    const [transactionHistory,setTransactionHistory]=useState([]);
    const [money,setMoney]=useState([]); // save income and expense
    const [message,setMessage]=useState(); // send message total = 100
    const [addTransaction,setAddTransaction]=useState(false); // set status for popup add transaction
    const [layoutStatus, setLayoutStatus]=useState(false); // set status for layout
    const [popupSettingMobile, setPopupSettingMobile]=useState(false); // set status for popup
    const [popupInfoMobile,setPopupInfoMobile]=useState(false);// set status for popup
    const [date,setDate]=useState();
    const getMinAndMaxOfDate=()=>{
        var a= new Date();
        var month= a.getMonth();
        if(month<10){
            month=Number(month)+1;
            month='0'+month;
        }
        if(month===4||month===6||month===9||month===11){
            var day=30;
        }
        else if(month===2){
            var day=28;
        }
        else{
            var day=31;
        }
        var year =a.getFullYear()
        setDate({
            'day':day,
            "month":month,
            "year":year
        })
    }
    const getLayoutStatus=(status)=>{
        setLayoutStatus(status);
    }
    const getStatusTransaction=(status)=>{
        setAddTransaction(status);
    }
    const getStatusPopupInfoMobile =(status)=>{
       setPopupInfoMobile(status);
    }
    const getStatusPopupSettingMobile=(status)=>{
        setPopupSettingMobile(status);
    }
    const handleClickOutside = (e) => {
        if (!myRef.current.contains(e.target)) {
            setPopupInfoMobile(false);
        }
    };
    const getInfo=async(email)=>{
        const docRef = doc(database, "users", email);
        const docSnap = await getDoc(docRef);
        setInfo(docSnap.data());
    }
    const getJars=async(email)=>{
        const docRef = doc(database, "jar", email);
        const docSnap = await getDoc(docRef);
        setFieldsInput(docSnap.data().jar)
    }
    const getMoney=async(email)=>{
        const docRef = doc(database, "money", email);
        const docSnap = await getDoc(docRef);
        setMoney([
            { name: 'Group A', value:docSnap.data().income },
            { name: 'Group B', value: docSnap.data().expense },
        ])
    }
    const getHistory=async(email)=>{
        const docRef = doc(database, "history", email);
        const docSnap = await getDoc(docRef);
        setTransactionHistory(docSnap.data().arr);
        getTotalExpense(docSnap.data().arr);

    }
 
    const getTotalExpense=async(data)=>{
        let thietyeu=0;
        let thientam=0;
        let dautu=0;
        let giaoduc=0;
        let tietkiem=0;
        let huongthu=0;
        for(let i=0;i<data.length;i++){
            if(data[i].jar==='Thiết yếu'){
                thietyeu=Number(thietyeu)+Number(data[i].money);
            }
            if(data[i].jar=="Thiện tâm"){
                thientam=Number(thientam)+Number(data[i].money);
            }
            if(data[i].jar=="Giáo dục"){
                giaoduc=Number(giaoduc)+Number(data[i].money);
            }
            if(data[i].jar=="Đầu tư"){
                dautu=Number(dautu)+Number(data[i].money);
            }
            if(data[i].jar=="Hưởng thụ"){
                huongthu=Number(huongthu)+Number(data[i].money);
            }
            if(data[i].jar=="Tiết kiệm"){
                tietkiem=Number(tietkiem)+Number(data[i].money);
            }
        }
        
        setTotalExpense([
            { name: 'Thiết yếu', value: thietyeu },
            { name: 'Giáo dục', value: giaoduc},
            { name: 'Tiết kiệm', value:tietkiem },
            { name: 'Hưởng thụ', value: huongthu },
            { name: 'Đầu tư', value:dautu },
            { name: 'Thiện tâm', value: thientam }
        ])
    }
    const getCurrentUser=()=>{
        const auth = getAuth(); 
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            getInfo(user.email);
            getMoney(user.email);
            getJars(user.email);
            getHistory(user.email);
            getMinAndMaxOfDate();
          }
        });
    }
    const handleChange=(e,index)=>{
        const target=e.target;
        const value=target.value;
        const name=target.name;
        fieldsInput[index].value = Number(value);
        setFieldsInput([...fieldsInput]);
    }
    const onSave=(email)=>{
        var total=fieldsInput.reduce((accumulator, item)=>{
            return accumulator+item.value
        },0)
        if(total!==100){
            setMessage('Tổng các hủ phải bằng 100')
        }
        else{
            setMessage(undefined)
            const jars={
                email:email,
                jar:fieldsInput
            }
            setDoc(doc(database, "jar",email),jars);
        }
    }
    useEffect(()=>{
        getCurrentUser();
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[change]);
    
    return(
       <div>
           {
               typeof info.email==='undefined'||money.length===0||totalExpense===undefined?
                <div className='flex items-center justify-center'> <ReactLoading type='bars' color={'#183153'} height={200} width={100} /></div>:
               <div className='w-full'>
                    <Header myRef={myRef} 
                            info={info}
                            popupInfoMobile={popupInfoMobile} 
                            popupSettingMobile={popupSettingMobile}
                            layoutStatus={layoutStatus}
                            getLayoutStatus={getLayoutStatus}
                            getStatusPopupInfoMobile={getStatusPopupInfoMobile}
                            getStatusPopupSettingMobile={getStatusPopupSettingMobile}
                    ></Header>
                    <div className="w-full bg-slate-100 lg:flex relative">
                        {
                            layoutStatus? <div className="w-full h-full bg-slate-900 opacity-20 position: absolute top-0 z-20 py-0"></div>:null
                        }
                        <PopupTransaction
                        date={date} 
                        income={money[0].value} 
                        expense={money[1].value} 
                        change={change} 
                        getChange={getChange} 
                        addTransaction={addTransaction} 
                        getStatusTransaction={getStatusTransaction} 
                        info={info} 
                        transactionHistory={transactionHistory}
                        money={money}
                        input={fieldsInput}
                        totalExpense={totalExpense}
                        ></PopupTransaction>
                        <PopupSettingMobile 
                        popupInfoMobile={popupInfoMobile} 
                        popupSettingMobile={popupSettingMobile} 
                        getStatusPopupSettingMobile={getStatusPopupSettingMobile}
                        getLayoutStatus={getLayoutStatus}>
                        </PopupSettingMobile>
                        <PopupInfo 
                        info={info}
                        popupSettingMobile={popupSettingMobile} 
                        getStatusPopupSettingMobile={getStatusPopupSettingMobile}
                        getLayoutStatus={getLayoutStatus}
                        ></PopupInfo>
                        <div className='w-full py-2 px-2 lg:w-1/4 lg:my-3 lg:mx-3 xl:my-8 xl:mx-8 lg:p-0'>
                            <SpendingManager data={money} COLORS={COLORS}></SpendingManager>
                            <TransactionHistory getStatusTransaction={getStatusTransaction} transactionHistory={transactionHistory}></TransactionHistory>
                        </div>
                            <div className='w-full px-2 py-2 lg:w-1/2 lg:my-3 xl:my-8 lg:p-0'>
                                <Spending message={message} handleChange={handleChange} onSave={()=>onSave(info.email)} fieldsInput={fieldsInput} setFieldsInput={setFieldsInput}></Spending>
                                <SpendingChart transactionHistory={transactionHistory}></SpendingChart>
                            </div>
                            <div className='w-full  px-2 py-2 lg:w-1/4 lg:my-3 lg:mx-3 xl:my-8 xl:mx-8 lg:p-0'><ListSpending fieldsInput={fieldsInput} money={money} totalExpense={totalExpense}></ListSpending></div>
                    </div>
                </div>
           }
       </div>
    )
}
const SpendingManager=props=>{
    const { data,COLORS}=props;
   const tempMoney=[
    { name: 'Group A', value:1 },
    { name: 'Group B', value: 0 },
   ]
    return(
        <div>
             <div className="w-full bg-white rounded-2xl p-8 hidden lg:block">
                <div className='flex items-center justify-between'>
                    <div className='flex xl:space-x-4 items-center lg:space-x-2'>
                        <span className='xl:w-12 xl:h-4 bg-purple lg:w-6 lg:h-3'></span>
                        <p className='text-sm text-slate-500'>Thu nhập</p>
                    </div>
                    <div className='flex xl:space-x-4 items-center lg:space-x-2'>
                        <span className='xl:w-12 xl:h-4 bg-pink lg:w-6 lg:h-3'></span>
                        <p className='text-sm text-slate-500'>Chi tiêu</p>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <PieChart width={300} height={200}>
                            <Pie
                            data={data[0].value===0?tempMoney:data}
                            cx={150}
                            cy={100}
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={1}
                            dataKey="value"
                            >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                    </PieChart>
                </div>
                <p className='text-slate-500 text-center'>Số dư khả dụng</p>
                <h3 className='text-center font-bold text-2xl'>{data[0].value -data[1].value }vnđ</h3>
                <div className='flex items-center justify-center'>
                    <div className='flex my-5 space-x-5'>
                        <button className='xl:px-5 xl:py-0.5 lg:px-3 bg-purple rounded-xl text-center'>
                            <i className="fa-solid fa-circle-plus text-xs text-white mr-1"></i>
                            <span className='text-xs text-white'>Thu nhập</span>
                            <p className='text-xs text-white mb-1'>{data[0].value}vnđ</p>
                        </button>
                        <button className='xl:px-5 xl:py-0.5 lg:px-3 bg-pink rounded-xl text-center'>
                            <i className="fa-solid fa-circle-minus text-xs text-white mr-1"></i>
                            <span className='text-xs text-white'>Chi tiêu</span>
                            <p className='text-xs text-white mb-1'>{data[1].value}vnđ</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full bg-white rounded-xl lg:hidden'>
                <div className='flex items-center'>
                    <div className='relative z-0' >
                        <PieChart width={100} height={100}>
                            <Pie
                            data={data}
                            cx={50}
                            cy={45}
                            innerRadius={25}
                            outerRadius={30}
                            paddingAngle={1}
                            dataKey="value"
                            >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                        </PieChart>
                    </div>
                    <div className='ml-5'>
                        <p className='text-xl text-slate-600 font-bold'>Số dư khả dụng</p>
                        <h6 className='text-sm text-slate-500'>{data[0].value-data[1].value}đ</h6>
                    </div>  
                </div>
                <div className='flex justify-between px-5 pb-5'>
                    <div className='p-3 bg-slate-50 w-[45%] rounded-xl'>
                        <div className='flex items-center space-x-2'>
                            <p className='text-slate-600 text-md font-bold'>Thu nhập</p>
                            <i className="fa-solid fa-plus text-slate-600 text-xs"></i>
                        </div>
                        <p className='text-xs'>{data[0].value}đ</p>
                    </div>
                    <div className='p-3 bg-slate-50 w-[45%]  rounded-xl '>
                        <div className='flex items-center space-x-2'>
                            <p  className='text-slate-600 text-md font-bold'> Chi tiêu</p>
                            <i className="fa-solid fa-minus"></i>
                        </div>
                        <p className='text-xs'>{data[1].value}đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Spending=props=>{
    const {fieldsInput,message}=props;
    const COLORS =['#4197E6','#E3B456','#EE5387','#8D4DE9','#7BD220','#43D598']
    const a='#4197E6';
   return(
    <div className='w-full bg-white rounded-2xl p-5 pt-10'>
        <div className='flex justify-between'>
            <p className='text-slate-600 font-bold'>THIẾT LẬP CÁC HỦ</p>
            <button className='bg-purple px-5 py-1 rounded text-white text-sm' onClick={props.onSave}>Lưu</button>
        </div>
        <div className='flex justify-center'>
            <span className='my-5 text-red-500  font-bold'>{message!==undefined?message:null}</span>
        </div>
        <div className='flex flex-col mt-10 xl:flex-row'>
            <div className='w-full mt-3 xl:w-1/2 xl:mt-5'>
                <p className='text-center text-slate-600 font-bold'>Tổng 100%</p>
                <div className='flex justify-center items-center'>
                    <PieChart width={400} height={280}>
                        <Pie
                        data={fieldsInput}
                        cx={200}
                        cy={130}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={1}
                        label='1'
                        dataKey="value"
                        >
                        {fieldsInput.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                    </PieChart>
                </div>
            </div>
            <div className='flex items-center justify-center w-full'>
                <div className='w-4/5 xl:ml-32 xl:block'>
                    {
                        fieldsInput.map((item,index)=>(
                            <div className='flex my-5 space-x-10 items-center' key={index}>
                                <div className='w-1/2 flex items-center space-x-1'>
                                <div className='w-2 h-1' style={{backgroundColor:`${COLORS[index]}`}}></div>
                                <h6 >{item.name}</h6>
                                </div>
                                <input type="number" className='w-16 p-1 shadow-md shadow-slate-300 text-left' value={item.value||''} onChange={(e)=>props.handleChange(e,index)}  />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
   )
}
const ListSpending=props=>{
    const {fieldsInput,money,totalExpense}=props;
    const COLORS =['#4197E6','#E3B456','#EE5387','#8D4DE9','#7BD220','#43D598']
    var a=[];
    for(let i=0;i<fieldsInput.length;i++){
        a[i]=(((totalExpense[i].value)/((money[0].value)*fieldsInput[i].value/100))*100);
    }
    return(
        <div className='w-full rounded-xl bg-white p-8'>
            <p className='text-slate-600 font-bold mb-10'>DANH SÁCH HŨ</p>
            {
                fieldsInput.map((item,index)=>(
                    <div className='my-5' key={index}>
                        <div className='flex justify-between'>
                            <p className='py-0.5 px-3 text-center rounded-xl bg-slate-100 text-xs'>{item.name}</p>
                            <p className='text-xs text-slate-500'>{(money[0].value)*fieldsInput[index].value/100-totalExpense[index].value}đ</p> 

                        </div>
                        <input  type="range" step='1' min='0' max='100' defaultValue={100-a[index]}  className='my-2 w-full h-1' />
                    </div>
                ))
            }
        </div>
    )
}
const TransactionHistory=props=>{
    const {transactionHistory}=props;
    const openTransaction=(e)=>{
        e.preventDefault();
        props.getStatusTransaction(true);
    }
    var newTrans=transactionHistory.reverse().slice(0,6);
    console.log(transactionHistory);
    console.log(newTrans);
    return(
        <div className='w-full rounded-xl bg-white p-5 mt-5' >
            <h2 className='text-slate-700 font-bold mt-3 mb-5'>GIAO DỊCH MỚI NHẤT</h2>
            <button className='px-5 py-2 text-white bg-blue rounded-xl mb-5 cursor-pointer hover:bg-blue-100 duration-700' onClick={openTransaction}>Thêm giao dịch</button>
            {
                newTrans.length===0?<p className='py-10 font-bold text-slate-600'>Chưa có thông tin giao dịch nào</p>: <div>
                {
                    newTrans.map((item,index)=>(
                        <div className='my-3 flex justify-between' key={index}>
                            <div className='flex items-center'>
                                <div className='w-8 h-8 flex items-center justify-center bg-slate-200 rounded-lg text-sm mr-3'>
                                    <i className="fa-solid fa-burger"></i>
                                </div>
                                <div>
                                    <p className='font-bold text-slate-600 text'>{item.jar}</p>
                                    <p className='text-sm text-slate-500'>{item.decription}</p>
                                </div>
                            </div>
                            <div>
                                <p className={`text-sm ${item.jar==='Thu nhập'?'text-purple':'text-rose-500'} font-bold`}>{item.jar==='Thu nhập'?null:'-'}{item.money}đ</p>
                                <p className='text-sm text-slate-500 float-right'>{item.date}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            }
        </div>
    )
}
const SpendingChart=props=>{
    const {transactionHistory}=props;
    var income=[0,0,0,0];
    var expense=[0,0,0,0];
    for(let i=0;i<transactionHistory.length;i++){
        var parts =transactionHistory[i].date.split('-');
        var day=Number(parts[2]);
        if(day<8){
            if(transactionHistory[i].action==='income'){
               income[0]=Number(income[0])+Number(transactionHistory[i].money);
            }
            else{
                expense[0]=Number(expense[0])+Number(transactionHistory[i].money);
            }
        }
        if(day<15 && day>7){
            if(transactionHistory[i].action==='income'){
               income[1]=Number(income[1])+Number(transactionHistory[i].money);
            }
            else{
                expense[1]=Number(expense[1])+Number(transactionHistory[i].money);
            }
        }
        if(day<22 && day>14){
            if(transactionHistory[i].action==='income'){
               income[2]=Number(income[2])+Number(transactionHistory[i].money);
            }
            else{
                expense[2]=Number(expense[2])+Number(transactionHistory[i].money);
            }
        }
        if(day>21){
            if(transactionHistory[i].action==='income'){
               income[3]=Number(income[3])+Number(transactionHistory[i].money);
            }
            else{
                expense[3]=Number(expense[3])+Number(transactionHistory[i].money);
            }
        }
    } 
    const arr=[
        { name: 'Tuần 1', 'Thu nhập':income[0], "Chi tiêu":expense[0]},
        { name: 'Tuần 2',  'Thu nhập':income[1], "Chi tiêu":expense[1]},
        { name: 'Tuần 3',  'Thu nhập':income[2], "Chi tiêu":expense[2]},
        { name: 'Tuần 4',  'Thu nhập':income[3], "Chi tiêu":expense[3]}
    ]
    return(
        <div className='p-5 bg-white rounded-xl my-5'>
            <p className='font-bold text-slate-700'>BÁO CÁO THU CHI</p>
            <p className='text-center text-slate-500 my-5'>Báo cáo thu chi (Vnđ)</p>
            <div className='overflow-x-scroll'>
            <BarChart width={630} height={250} data={arr}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Thu nhập" fill="#8B4FE4" />
                <Bar dataKey="Chi tiêu" fill="#F43F5E" />
            </BarChart>
            </div>
        </div>
    )
}
export default IndexPage;