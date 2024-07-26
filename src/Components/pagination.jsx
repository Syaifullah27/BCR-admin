// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageLimit = 4;
    const pageGroup = Math.ceil(currentPage / pageLimit);
    const startPage = (pageGroup - 1) * pageLimit + 1;
    const endPage = Math.min(pageGroup * pageLimit, totalPages);
    const getButtonClass = (number) => {
        return number === currentPage
            ? 'mx-1 px-4 py-2 border border-blue-500 rounded text-blue-500 max-sm:px-2'
            : 'mx-1 px-4 py-2 border border-gray-300 rounded text-gray-500 max-sm:px-2';
    };
    let itemsPagination = []
    if (startPage > 1) {
        itemsPagination.push(
            <button
                key={1}
                onClick={() => onPageChange(1)}
                className={getButtonClass(1)}
            >
                1
            </button>
        );
        if (startPage > 2) {
            itemsPagination.push(
                <span key="left-dots" className="mx-1 px-4 py-2 text-gray-500 max-sm:px-1">...</span>
            );
        }
    }for (let number = startPage; number <= endPage; number++) {
        itemsPagination.push(
            <button
                key={number}
                onClick={() => onPageChange(number)}
                className={getButtonClass(number)}
            >
                {number}
            </button>
        );
    }
    // 
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            itemsPagination.push(
                <span key="right-dots" className="mx-1 px-4 py-2 text-gray-500 max-sm:px-1">...</span>
            );
        }
        itemsPagination.push(
            <button
                key={totalPages}
                onClick={() => onPageChange(totalPages)}
                className={getButtonClass(totalPages)}
            >
                {totalPages}
            </button>
        );
    }
    return (
        <div className="flex justify-center items-center mt-4 space-x-2 pt-10 pb-10 pr-8">
            <button
                onClick={() => onPageChange(1)}
                className="mx-1 px-4 py-2 border border-gray-300 rounded text-gray-500 max-sm:px-1"
                disabled={currentPage === 1}
            >
                «
            </button>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className="mx-1 px-4 py-2 border border-gray-300 rounded text-gray-500 max-sm:px-1"
                disabled={currentPage === 1}
            >
                ‹
            </button>
            {itemsPagination}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className="mx-1 px-4 py-2 border border-gray-300 rounded text-gray-500 max-sm:px-1"
                disabled={currentPage === totalPages}
            >
                ›
            </button>
            <button
                onClick={() => onPageChange(totalPages)}
                className="mx-1 px-4 py-2 border border-gray-300 rounded text-gray-500 max-sm:px-1"
                disabled={currentPage === totalPages}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;