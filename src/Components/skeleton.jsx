const Skeleton = () => {
    return (
        <div className="flex flex-col items-center gap-4 border w-[351px] h-[442px] bg-[#F9F9F9] rounded-md ">
            <div className="skeleton-animation mt-9 h-[160px] w-[290px] bg-gray-500 rounded-md"></div>
            <div className="skeleton-animation w-[290px] bg-gray-500 rounded-md h-8"></div>
            <div className="skeleton-animation w-[290px] bg-gray-500 rounded-md h-9"></div>
            <div className="skeleton-animation w-[290px] bg-gray-500 rounded-md h-4"></div>
            <div className="skeleton-animation w-[290px] bg-gray-500 rounded-md h-4"></div>
            <div className="flex gap-4 w-full px-7">
                <div className="skeleton-animation w-1/2 bg-gray-500 rounded-md h-10"></div>
                <div className="skeleton-animation w-1/2 bg-gray-500 rounded-md h-10"></div>
            </div>
        </div>
    );
}

export default Skeleton 