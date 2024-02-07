import logoImage from "../../assets/img/logo.svg"


const Navbar = () => {
    return (
        <div className="h-20 bg-black flex justify-between px-[10%] items-center">
            <img src={logoImage} alt="" className="h-12" />
            <ul className="text-white flex h-12 items-center gap-10">
                <li className="cursor-pointer hover:text-cyan-400 duration-300 text-sm font-medium">HOME</li>
                <li className="cursor-pointer hover:text-cyan-400 duration-300 text-sm font-medium">ABOUT</li>
                <li className="cursor-pointer hover:text-cyan-400 duration-300 text-sm font-medium">FEATURE</li>
                <li className="cursor-pointer hover:text-cyan-400 duration-300 text-sm font-medium">SOLUTION</li>
            </ul>
        </div>
    )
}

export default Navbar