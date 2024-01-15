import React from "react";

const loading = () => {
  return (
    <div className="container md:mt-12 mt-6 grid md:grid-cols-2  gap-12">
      <div className="px-4 flex justify-center h-full">
        <div className="min-h-48 h-full  animate-pulse  w-1/2 rounded-md bg-muted"></div>
      </div>
      <div className="flex flex-col gap-12 py-12">
        <div>
          <div className="h-6 bg-muted rounded"></div>
          <div className="h-2 mt-3  bg-muted rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted rounded h-12 w-full"></div>
          <div className="bg-muted rounded h-12 w-full"></div>
        </div>
        <div>
          <div className="h-3 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default loading;
