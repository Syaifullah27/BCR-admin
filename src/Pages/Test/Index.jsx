import { useSelector } from "react-redux";
import { getMenu } from "../../redux-toolkit/features/menuSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const TestPage = () => {
    const dispatch = useDispatch()
    const { menuReducer } = useSelector(state => state)

    console.log(menuReducer);

    useEffect(() => {
        dispatch(getMenu())
    }, [])
    return (
        <div>
            <h1>test</h1>
            {
                menuReducer.menu.map((item, index) => {
                    return (
                        <div key={index} className="w-[351px]  bg-[#ffffff] shadow-md border rounded-md flex flex-col p-4 gap-4">
                            <div className="w-full flex justify-center pt-6">
                                <img src={item.image} alt="" className="w-[270px] h-[160px] rounded-lg" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h1>{item.name}</h1>
                                <h1 className="text-lg font-semibold">{item.price} / hari</h1>
                                <div className="flex gap-2 items-center">
                                    <img src="fi_key.png" alt="" />
                                    <p className="text-sm">Start rent - Finish rent</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <img src="fi_clock.png" alt="" />
                                    <p className="text-sm">Updated at 4 Apr 2022, 09.00</p>
                                </div>
                                <div className="flex gap-6 pt-4 pb-2">
                                    <button
                                        className="border-2 border-[#FA2C5A] w-1/2 p-2 rounded-sm text-[#FA2C5A] font-medium flex gap-2 items-center justify-center">
                                        <img src="fi_trash-2.png" alt="" className="" />
                                        Delete
                                    </button>
                                    <button
                                        // onClick={navigateToEditCar}
                                        className="border w-1/2 p-2 rounded-sm bg-[#5CB85F] text-[#ffffff] font-medium flex gap-2 items-center justify-center">
                                        <img src="fi_edit.png" alt="" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TestPage