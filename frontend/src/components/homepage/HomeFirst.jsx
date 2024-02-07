import robopng from "../../assets/img/robot.png"
import crosspng from "../../assets/img/Discount.svg"
import arrowup from "../../assets/img/arrow-up.svg"
import Rating from "../reusable/Rating"


const HomeFirst = () => {
    const number1 = 2515;
    const number2 = 3000;
    const number3 = 3800;

    const text1 ="User Active"
    const text2 ="TRUSTED BY COMPANY"
    const text3 ="TRANSACTION"


    return (
        <div className="bg-black min-h-screen text-white flex justify-between flex-col px-[10%]">
            <div className="flex items-center justify-between ">
                <div className="w-1/2 flex flex-col gap-5">
                    <div className="w-fit flex items-center px-2 rounded-lg gap-2 bg-gradient-to-r from-gray-800 to-gray-900">
                        <img src={crosspng} alt="" />
                        <p className="text-sm text-gray-400"><span className="text-white">20%</span> DISCOUNT FOR <span className="text-white">1 MONTH</span> ACCOUNT</p>
                    </div>
                    <div className="relative">
                        <div className="flex flex-col gap-3 font-extrabold text-5xl tracking-wide">
                            <p>The Next </p>
                            <p className="w-fit bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent">Generation</p>
                            <p>Payment Method.</p>
                        </div>
                        <div className="border-2 h-28 w-28  flex flex-col items-center justify-center rounded-full border-cyan-400 absolute top-2 right-10">
                            <div className="flex ">Get<img src={arrowup} alt="" /></div>
                            <p>Started</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-end">
                    <img src={robopng} alt="" className="h-full" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center leading-7 tracking-wide gap-1">
                <p className="w-1/3">Our team of experts uses a methodology to identify the credit cards most likely to fit your needs.
                    We examine annual percentage rates, annual fees.</p>
                <div className="flex justify-between w-full">
                    <Rating number = {number1} text={text1}/>
                    <Rating number = {number2} text={text2}/>
                    <Rating number = {number3} text={text3}/>
                </div>
            </div>
        </div>
    )
}

export default HomeFirst