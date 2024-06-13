import Router from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react"


const AddJob = () => {
    const { register, handleSubmit } = useForm();
    const { data: session, status } = useSession()

    if (status === "unauthenticated") {
        Router.push("/");
    }


    const onSubmit = (data) => {
        // Handle form submission logic here
        console.log(data);
        const accessToken = session.accessToken;
        fetch("http://127.0.0.1:8000/api/joblist/", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        toast.success('Job added successfully');
        Router.reload()
    };

    return (
        <div className="container mx-auto lg:w-[70%] px-4 pt-10">
            <h1 className="text-2xl font-bold mb-4">Add Job</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        {...register("title")}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
                        Company
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        {...register("company")}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        {...register("description")}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Job
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default AddJob;