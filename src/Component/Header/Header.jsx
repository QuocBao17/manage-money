import { Link,useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
const Header =(props)=>{
    const Nav =[
        {
            display:'Trang chủ',
            path:''
        },
        {
            display:'Lịch sử giao dịch',
            path:''
        },
        {
            display:'Báo cáo thu chi',
            path:''
        }
    ]
    const handleClick=()=>{
        props.getStatusPopupSettingMobile(true);
        props.getLayoutStatus(true);
    }
    const {info}=props;
    let navigate =useNavigate();
    const auth = getAuth();
    const signOutButton=()=>{      
        signOut(auth).then(() => {
            navigate('/sign-in');
        }).catch((error) => {
        // An error happened.
        });
    }
    return (
        <div>
            <div className="hidden lg:block">
                <div className=" w-full mx-auto flex justify-between px-10 py-5 items-center bg-blue">
                    <div className="">
                        <p className="font-bold text-white text-lg">Chào buổi chiều {info.userName}!</p>
                        <h6 className="text-slate-300">Hôm nay bạn có gì mới không?</h6>
                    </div>
                    <div className="">
                        <ul className="flex space-x-10 ">
                            {
                                Nav.map((item,index)=>(
                                    <li key={index} className="cursor-pointer text-white font-bold text-lg">{item.display}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className=" flex space-x-4 items-center ">
                
                        <i className="fa-solid fa-gear cursor-pointer text-white text-lg" onClick={handleClick} ></i>
                        <i className="fa-solid fa-arrow-right-from-bracket cursor-pointer text-white text-lg" onClick={signOutButton}></i>
                        <img src={info.avatar} alt="" className="w-10 h-10 rounded-50"/>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="bg-blue p-5 w-full flex justify-between items-center lg:hidden">
                    <div>
                        <p className="text-white">Chào buổi chiều {info.userName}</p>
                        <h6 className="text-white text-xs">Hôm nay bạn có gì mới không?</h6>
                    </div>
                    <div >
                        <img ref={props.myRef} className="w-10 h-10 rounded-50 cursor-pointer" onClick={()=>props.getStatusPopupInfoMobile(true)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGz0V-QocsAAlQaM-8ynkCJtVBmPmRllKRHQ&usqp=CAU" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;