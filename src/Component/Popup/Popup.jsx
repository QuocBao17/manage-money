import { Link } from "react-router-dom";
const Popup=(props)=>{
    const {popupStatus, namePage, textPage}=props;
    return(
        <div className={`flex items-center justify-center position: absolute top-32 z-30 w-full ${popupStatus?'show-popup':'unshow-popup'}`}>
            <div className="rounded-3xl px-5 py-10 flex bg-gray-200 shadow-xl shadow-slate-500 w-[90%] sm:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-2/5 position: relative">
                <p className=" position: absolute top-3 right-8 sm:top-3 2xl:text-5xl text-xl cursor-pointer " onClick={()=>props.closePopup(false)}><i className="fa-solid fa-xmark"></i></p>
                <img className="rounded-50 w-20 h-20 top-[-40px] sm:w-40 sm:h-40 sm:top-[30px] 2xl:w-72 2xl:h-72 2xl:top-[80px] 2xl:left-[60px] position: absolute"  src="https://cdn.dribbble.com/users/942818/screenshots/16438903/media/ec9b36d9b19617d00d4040840566bb8a.jpg?compress=1&resize=400x300&vertical=top" alt="" />
                <div className="pl-3 sm:pl-48 2xl:pl-96">
                <h1 className="font-bold text-xl text-slate-600 2xl:text-6xl 2xl:mt-10 ">{namePage}</h1>
                <p className="w-11/12 text-md my-3 text-slate-500 2xl:text-4xl 2xl:mt-10">{textPage}</p>
                <button className="shadow-md shadow-slate-400 font-bold px-8 py-2 2xl:text-4xl 2xl:py-5 2xl:px-12 2xl:mt-10 2xl:mb-10 bg-blue rounded-xl text-white text-lg cursor-pointer hover:bg-white hover:text-blue duration-700 border-blue border-2"><Link to='/sign-in'>Continues</Link> </button>
                </div>
            </div>
        </div>
    )
}
export default Popup;