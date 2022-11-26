import { useParams } from 'react-router-dom';

const Project: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div>project {id}</div>
  );
};

export default Project;