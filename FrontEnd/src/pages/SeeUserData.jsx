import React from "react";
import { LiaSkullCrossbonesSolid } from "react-icons/lia";
// import { ImCross } from "react-icons/im";

const SeeUserData = ({userDivData, userDiv, setuserDiv}) => {
    return(
        <>
        <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}
        ></div>
        <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}
        >
            <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-zinc-800">
                <div className="flex items-center justify-between  flex flex-row">
                    <h1 className="text-2xl font-semibold items-center justify-center"> User Information...</h1>
                    <button className="text-2xl font-bold transform transition-transform duration-200 hover:text-red-700 hover:scale-150 " onClick={() => setuserDiv("hidden")}>
                    <LiaSkullCrossbonesSolid />
                    {/* <ImCross /> */}
                    </button>
                </div>

            

                <div className="mt-2">
                    <label htmlFor="">
                        Username: {" "}
                        <span className="font-semibold"> {userDivData.username}</span>
                    </label>
                </div>
                <div className="mt-4">
                    <label htmlFor="">
                        Email: <span className="font-semibold"> {userDivData.email}</span>
                    </label>
                </div>

                <div className="mt-4">
                    <label htmlFor="">
                        Address: {" "} <span className="font-semibold"> {userDivData.address}</span>
                    </label>
                </div>
            
            
            </div>
        </div>
        </>
    )
}
export default SeeUserData;