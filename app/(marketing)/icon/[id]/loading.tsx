import React from "react"

const loading = () => {
  return (
    <div className="container mt-6 grid gap-12 md:mt-12  md:grid-cols-2">
      <div className="flex h-full justify-center px-4">
        <div className="h-full min-h-48  w-1/2  animate-pulse rounded-md bg-muted"></div>
      </div>
      <div className="flex flex-col gap-12 py-12">
        <div>
          <div className="h-6 rounded bg-muted"></div>
          <div className="mt-3 h-2  w-1/3 rounded bg-muted"></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-12 w-full rounded bg-muted"></div>
          <div className="h-12 w-full rounded bg-muted"></div>
        </div>
        <div>
          <div className="h-3 rounded bg-muted"></div>
        </div>
      </div>
    </div>
  )
}

export default loading
