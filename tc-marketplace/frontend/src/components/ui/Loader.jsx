
const Loader = ({ text = "Loading..." }) => (
  <div className="flex justify-center py-20 text-gray-500 animate-pulse">{text}</div>
);

export default Loader;
