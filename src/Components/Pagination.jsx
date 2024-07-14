import { useDispatch, useSelector } from 'react-redux';
import { setPage, getMenu } from '../redux-toolkit/features/menuSlice';

const Pagination = () => {
    const dispatch = useDispatch();
    const { page, totalPages } = useSelector((state) => state);
    // console.log(page, totalPages);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            dispatch(setPage(newPage));
            dispatch(getMenu({ page: newPage, limit: 10 }));
        }
    };

    return (
        <div>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l'
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
            >
                Previous
            </button>
            <span>{page} of {totalPages}</span>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r'
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;