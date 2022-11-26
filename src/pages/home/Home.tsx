import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      Home
      <Link to='/platform'>Platform</Link>
    </div>
  );
};
export default Home;