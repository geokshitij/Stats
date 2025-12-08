
import React from 'react';

const Formula: React.FC<{ formula: React.ReactNode }> = ({ formula }) => {
    const css = `
      .frac { display: inline-block; position: relative; vertical-align: middle; letter-spacing: 0.001em; text-align: center; }
      .frac > span { display: block; padding: 0.1em; }
      .frac span.bottom { border-top: 1px solid currentColor; }
      .frac span.symbol { display: none; }
    `;
    return (
      <>
        <style>{css}</style>
        <div className="bg-gray-800 p-4 rounded-lg my-4 flex justify-center items-center overflow-x-auto min-h-[80px]">
            {formula}
        </div>
      </>
    );
};

export default Formula;
