import axios from "axios";
import { useEffect, useState } from "react";
import { getMyStore, updateStoreInfo } from "../api/store";

const StoreForm = () => {

    const [form, setForm] = useState({
        name: '',
        slug: '',
        description: '',
        tags: [],
        contactEmail: '',
        contactPhone: '',
        location: ''
    });

    const [originalForm, setOriginalForm] = useState({
        name: '',
        slug: '',
        description: '',
        tags: [],
        contactEmail: '',
        contactPhone: '',
        location: ''
    });

    const [isEditting, setIsEditting] = useState(false);

    useEffect(() => {
        getMyStore().then((data) => {
            setForm(data )
            setOriginalForm(data )
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value});
    }

    const handleEditToggle = () => {
        setIsEditting(prev => !prev);
        console.log("isEditting:", isEditting);
    }

    const handleDiscard = () => {   
        setForm(originalForm);
        setIsEditting(false);
    }

    const handleSave = async () => {
        try {
            const updatedForm = await updateStoreInfo(form)
            setForm(updatedForm);
            setOriginalForm(updatedForm);
            setIsEditting(false);
        } catch (error) {
            console.error("Error saving store data:", error);
        }
    }

    const FormButton = () => {
        return (
            
                isEditting ? (
                    <div>
                        <button type="button" onClick={handleSave} className="border bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition duration-200 shadow-lg hover:shadow-xl">Save</button>
                        <button type="button" onClick={handleDiscard} className="border bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition duration-200 shadow-lg hover:shadow-xl">Discard</button>
                    </div>
                )
                :
                <button type="button" onClick={handleEditToggle} className="border bg-slate-200 border-gray-200 px-3 py-1 rounded-lg hover:bg-slate-300 hover:text-green-700 transition duration-200 shadow-lg hover:shadow-xl">Edit</button>
            
        )
    }

    return(
        <div>
            <form className={`max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-md  flex flex-col gap-4 `}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold mb-4 ">Edit Seller Profile</h2>
                    <FormButton />
                </div>
                <div className={`${isEditting ? '' : 'pointer-events-none opacity-70' } flex flex-col gap-4`}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Store Name</label>
                        <input
                            name="name"
                            placeholder="Store Name"
                            value={form.name}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            />

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug URL</label>
                        <input
                        name="slug"
                        placeholder="Store URL Slug"
                        value={form.slug}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                        />

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Contact Phone</label>
                        <input
                            name="contactPhone"
                            placeholder="Contact Phone"
                            value={form.contactPhone}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Contact Email</label>
                        <input
                            name="contactEmail"
                            placeholder="Contact Email"
                            value={form.contactEmail}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            />

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Select an option</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                            name="location"
                            placeholder="Location"
                            value={form.location}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            />

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            />

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Picture / Logo</label>
                        <span className="text-gray-700">Attach File (optional)</span>
                        <input
                            type="file"
                            name="attachment"
                            className="mt-2 block  text-sm text-gray-700
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-green-600 file:text-white
                                    hover:file:bg-green-700
                                    cursor-pointer"
                        />

                    </div>
                </div>
            </form>
        </div>
    )
}
export default StoreForm