import React from 'react'

function Error({ status, message }) {
    return (
        <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div class="text-center">
                <h1 class="font-bold text-5xl text-red-600">Status: {status = "400"}</h1>
                <h1 class="text-3xl my-8 py-4 font-bold text-gray-900 sm:text-5xl">{message = "Some Error Occured!"}</h1>
                <p class="mt-6 text-base leading-7 text-gray-600"></p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Navigate Home</a>
                    <a href="#" class="text-sm font-semibold p-3 rounded-lg hover:bg-slate-300 border text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </main>
    )
}

export default Error