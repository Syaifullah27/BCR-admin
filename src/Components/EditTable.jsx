
import  { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PopupContext } from '../context/messagePopup';


function EditContent() {
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [data, setData] = useState({});
    const [name, setName] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { showPopupMessage } = useContext(PopupContext);

    const [form, setForm] = useState({
        name: '',
        category: '',
        price: '',
    });

    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setName(file.name);
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };



    const getCarData = async () => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc',
            },
        };
        try {
            const response = await axios.get(
                `https://api-car-rental.binaracademy.org/admin/car/${id}`,
                config
            );
            setData(response.data);
            setForm({
                name: response.data.name,
                category: response.data.category,
                price: response.data.price,
            });
        } catch (error) { 
            console.log(error?.response);
        }
    };

    const handleSave = async () => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc',
            },
        };
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('category', form.category);
        formData.append('price', form.price);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        try {
            await axios.put(
                `https://api-car-rental.binaracademy.org/admin/car/${id}`,
                formData,
                config
            );
            showPopupMessage('Data Berhasil Diedit');
            setTimeout(() => {
                navigate('/car');
            }, 1000);
        } catch (error) { 
            showPopupMessage('Terjadi kesalahan saat mengedit data mobil');
            console.log(error?.response);
        }
    };

    useEffect(() => {
        getCarData();
    }, []);

    return (
            <div className="flex flex-col gap-4 px-8 pt-6">
                <h1 className="text-xl font-semibold">Edit Car</h1>
                <div className="bg-white p-4 flex flex-col gap-4">
                    <div className="flex items-baseline gap-2">
                        <p className="w-[147px]">
                            Nama/tipe mobil<span className="text-red-500">*</span>
                        </p>
                        <input
                            className="w-[339px] h-[36px] py-2 px-3 border-[1px] border-[#D0D0D0] rounded-md"
                            type="text"
                            placeholder="Input Nama/Tipe Mobil"
                            name="name"
                            value={form.name}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="w-[147px]">
                            Harga<span className="text-red-500">*</span>
                        </p>
                        <input
                            className="w-[339px] h-[36px] py-2 px-3 border-[1px] border-[#D0D0D0] rounded-md"
                            type="number"
                            placeholder="Input Harga sewa mobil"
                            name="price"
                            value={form.price}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="flex items-start gap-2">
                        <p className="w-[147px]">
                            Foto<span className="text-red-500">*</span>
                        </p>
                        <div>
                            <input
                                className="hidden"
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileInputChange}
                            />
                            <div
                                className="relative w-[339px] h-[36px] py-2 px-3 border-[1px] border-[#D0D0D0] rounded-md flex items-center cursor-pointer justify-between overflow-hidden"
                                onClick={handleFileInputClick}
                            >
                                {previewUrl ? (
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-[30px] h-[30px]"
                                        />
                                        <div className='absolute left-12 w-full text-sm'>{name}</div>
                                    </div>
                                ) : (
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src={data.image}
                                            alt="Preview"
                                            className="w-[30px] h-[30px]"
                                        />
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-[#8A8A8A] mt-1">
                                File size max. 2MB
                            </p>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="w-[147px]">
                            Kategori<span className="text-red-500">*</span>
                        </p>
                        <select
                            className={`w-[339px] h-[36px] py-2 px-3 border-[1px] border-[#D0D0D0] text-sm rounded-md ${form.category ? 'appearance-none' : ''}`}
                            type="text"
                            placeholder="Input Nama/Tipe Mobil"
                            name="category"
                            value={form.category}
                            onChange={handleFormChange}
                        >
                            <option value={''} className="text-sm text-[#8A8A8A]">
                                Pilih Kategori Mobil
                            </option>
                            <option value={'small'} className="">
                                2 - 4 orang
                            </option>
                            <option value={'medium'} className="">
                                4 - 6 orang
                            </option>
                            <option value={'large'} className="">
                                6 - 8 orang
                            </option>
                        </select>
                    </div>
            </div>
            
                <div className="flex gap-4 mt-10 absolute bottom-10 left-30">
                    <button
                        onClick={() => navigate('/car')}
                        className="border-[1px] border-[#0D28A6] text-[#0D28A6] font-medium p-1 px-5"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={selectedFile ? false : true}
                        className={`px-5 py-2 ${selectedFile ? 'bg-[#0D28A6] border-[#0D28A6]' : 'bg-[#CFD4ED] border-[#CFD4ED]'} border-[1px]  text-[#ffffff] font-bold text-sm`}
                    >
                        Save
                    </button>
                </div>
            </div>
    );
}

export default EditContent;