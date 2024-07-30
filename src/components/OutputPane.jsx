import React from 'react';
const OutputPane = ({ output }) => (
  <div className="bg-white w-full h-full mt-10 mx-2">
    <iframe
      srcDoc={output}
      title="Output"
      sandbox="allow-scripts"
      width="100%"
      height="100%"
      className="w-full h-full"
    />
  </div>
);
export default OutputPane;