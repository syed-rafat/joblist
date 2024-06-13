import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"
import { FaHeart } from "react-icons/fa";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [candidate, setCandidateUser] = useState(false);
  const [company, setCompanyUser] = useState(false);
  const { data: session, status } = useSession()

  

  const saveJob = (job_id) => {
    console.log(job_id, "JOB ID in save button")
    const accessToken = session.accessToken;
    fetch("http://127.0.0.1:8000/api/savejob/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job_id),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    console.log(status, "STATUS")
    console.log(session, "SESSION")
    if (status === "unauthenticated") {
      window.localStorage.removeItem("usertype");
    }
    // Fetch job list from API
    fetch("http://127.0.0.1:8000/api/joblist")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.log(error));
  }, [status]);

  useEffect(() => {
    // Check if user is candidate
    const userType = window.localStorage.getItem("usertype");
    console.log(userType);
    if (userType === "CANDIDATE") {
      setCandidateUser(true);
    }
    if (userType === "COMPANY") {
      setCompanyUser(true);
    }
    console.log(jobs)
  }, []);



  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24 mt-30 relative bg-white">
      {company && (
        <Link href="/addJob" className="relative flex justify-center mb-10 mx-20 rounded-lg w-[50%] h-12 bg-slate-900">
        <div className="text-2xl font-semibold text-center text-slate-300 pt-1">
            Add Job
            </div>
          </Link>
        
      )}

      <div className="relative flex flex-col w-max-[1500px] mx-auto min-h-44 h-auto w-full">
        {jobs.map((job) => (
          <div key={job.id} className="relative flex flex-row justify-between mb-4 w-full h-auto border border-gray-900 bg-gray-300 rounded-2xl m-2 p-8">
            <div className="flex flex-col"><h2 className="text-lg text-gray-950 font-semibold">{job.title}</h2>
            <p className="text-slate-800">{job.company}</p>
            <p className="text-gray-800">{job.description}</p>
            </div>
            {candidate && (
              <button onClick={() => saveJob(job.id)}>
              <div className="flex flex-col items-center justify-center">
                <FaHeart className="" />
                <p className="text-gray-800">Save</p>
              </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
