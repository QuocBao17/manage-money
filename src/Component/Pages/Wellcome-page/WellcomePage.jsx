import { Link } from "react-router-dom";

const WellcomePage=()=>{
    const listButton =[
        {
            display:'Register',
            path:'/register'
        },
        {
            display:'Sign In',
            path:'sign-in'
        }
    ]
    return(
        <div className="w-full flex items-center justify-center">
            <div className="lg:w-1/3 2xl:w-1/4 sm:w-1/2 sm:my-8 bg-gray sm:rounded-xl lg:rounded-xl">
                <div className="p-3">
                    <img className="rounded-xl shadow-md shadow-slate-500 mx-auto 2xl:w-full" src="https://cdn.dribbble.com/users/942818/screenshots/16438903/media/ec9b36d9b19617d00d4040840566bb8a.jpg?compress=1&resize=400x300&vertical=top" alt="" />
                </div>
                <div className="flex items-center justify-center mt-12 2xl:my-16"><p className="text-center font-bold text-slate-800 text-2xl 2xl:text-5xl w-2/3 ">Get rich slow, or get poor fast</p></div>
                <div className="flex items-center justify-center my-5 2xl:my-12"><p className="w-10/12 text-center text-slate-600 2xl:text-2xl">There is no time like the present when it comes to learning how to manage money better.</p></div>
                <div className="my-10 flex justify-between w-4/5 xl:w-3/5 mx-auto 2xl:w-2/3">
                        {
                            listButton.map((item,index)=>(
                            <Link key={index} to={item.path}> <button className="py-2 px-8 2xl:py-5 2xl:px-10 bg-white rounded-xl shadow-md hover:bg-blue hover:text-white duration-700">{item.display}</button></Link>
                            ))
                        }
                </div>
            </div>
        </div>
    )
}
export default WellcomePage;