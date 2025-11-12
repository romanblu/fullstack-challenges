const ErrorMessage = ({ message = "Something went wrong." }) => (
  <div className="flex justify-center py-20 text-red-500">{message}</div>
);

export default ErrorMessage;