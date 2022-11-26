import { useRouteError } from 'react-router-dom';

const Error: React.FC = () => {
  const error: any = useRouteError();
  console.log(error);
  
  return (
    <>
      {error.statusText || error.message}
    </>
  );
};
export default Error;