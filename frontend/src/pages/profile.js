import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"
import Router from "next/router";
import { signOut } from "next-auth/react"


export default function Profile() {
  const [savedjobs, setSavedJobs] = useState([]);
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");

  
  if (status === "unauthenticated") {
    Router.push("/");
  }

  useEffect(() => {
    if (session){
    const accessToken = session.accessToken;
    fetch("http://127.0.0.1:8000/api/user/", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        
    }).then((res) => res.json())
    .then((res) => setUsername(res.username));

    // Fetch job list from API
    fetch("http://127.0.0.1:8000/api/savedjobslist", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        
    })
      .then((response) => response.json())
      .then((data) => setSavedJobs(data))
      .catch((error) => console.log(error));
    }
  }, [status]);




  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24 mt-30 relative bg-white">
        <div className="flex flex-row">
            <h1 className="text-2xl font-bold mb-4">Profile of {username}</h1>
            <button
                className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-16"
                onClick={() => signOut()}
            >
                Sign out
            </button>
        </div>
      <div className="relative flex flex-col w-max-[1500px] mx-auto min-h-44 h-auto w-full">
        {savedjobs.map((job) => (
          <div key={job.id} className="relative flex flex-row justify-between mb-4 w-full h-auto border border-gray-900 bg-gray-300 rounded-2xl m-2 p-8">
            <div className="flex flex-col"><h2 className="text-lg text-gray-950 font-semibold">{job.title}</h2>
            <p className="text-slate-800">{job.company}</p>
            <p className="text-gray-800">{job.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
