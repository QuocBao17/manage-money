const Header =()=>{
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
    return (
        <div className="w-full mx-auto flex justify-between px-10 py-5 items-center bg-main">
            <div className="">
                <p className="font-bold text-white text-lg">Chào buổi chiều Quốc Bảo!</p>
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
           
                <i className="fa-solid fa-gear cursor-pointer text-white text-lg"></i>
                <i className="fa-solid fa-arrow-right-from-bracket cursor-pointer text-white text-lg"></i>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGz0V-QocsAAlQaM-8ynkCJtVBmPmRllKRHQ&usqp=CAU" alt="" className="w-10 h-10 rounded-50"/>
            </div>
        </div>
    )
}
export default Header;