import { Outlet } from 'react-router-dom';
import { ArrowNav } from '../components/ArrowNav';

export const Layout: React.FC = () => {
  return (
    <div>
      <nav>
        <ArrowNav left />
        <ArrowNav right />
      </nav>
      <Outlet />
    </div>
  );
};
