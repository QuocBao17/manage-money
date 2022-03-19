const PopupSettingMobile=(props)=>{
    const {popupInfoMobile,popupSettingMobile}=props;
    const handleClick=()=>{
        props.getStatusPopupSettingMobile(!popupSettingMobile);
        props.getLayoutStatus(true)
    }
    return (
        <div className={`${popupInfoMobile?'scale-setting-1':'scale-setting-0'} w-40 absolute p-5 bg-hover shadow-sm shadow-slate-600 right-7 top-[-10px] clip-path lg:hidden md:w-60`}>
            <p className="font-bold text-slate-600 mb-3" onClick={handleClick}>Cài đặt</p>
            <p className="font-bold text-slate-600">Đăng xuất</p>
        </div>
    )   
}
export default PopupSettingMobile;