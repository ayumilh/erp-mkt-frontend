import React from 'react';
import Link from "next/link";

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="breadcrumb">
      <ol className="flex space-x-2">
        {paths.map((path, index) => (
          <li key={index} className="breadcrumb-item mt-1">
            {index < paths.length - 1 ? (
              <Link href={path.href}>
                <span className="text-lg lg:text-base font-semibold text-neutral-700 hover:underline">{path.label}</span> 
                <span className='text-lg lg:text-base font-medium text-neutral-700 ml-1'>/</span>
              </Link>
            ) : (
                <h2 className='text-lg lg:text-xl font-semibold text-neutral-700 hover:underline'>{path.title}</h2>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;