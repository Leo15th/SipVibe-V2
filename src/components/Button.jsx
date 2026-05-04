export default function Button({btnName, onClickListener, type = "button", disabled = false, key}){
    return(
        <button type={type} onClick={onClickListener} className="text-lg px-2 py-1 lg:px-3 lg:py-1 font-bold capitalize bg-slate-400/20 border border-white/30 rounded-lg hover:scale-110 hover:border-2 hover:border-amber-400 hover:bg-slate-300/40 hover:black-text-shadow-sm w-full hover:my-1" disabled={disabled}>
            {btnName}
        </button> 
    )
}