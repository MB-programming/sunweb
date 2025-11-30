import React from "react";

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-background2 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              {[...Array(columns)].map((_, index) => (
                <th key={index} className="p-4">
                  <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t border-stroke">
                {[...Array(columns)].map((_, colIndex) => (
                  <td key={colIndex} className="p-4">
                    <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
