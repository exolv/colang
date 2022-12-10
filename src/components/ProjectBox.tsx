import moment from 'moment';
import { Link } from 'react-router-dom';
import Avatar from './ui/Avatar';
import Progress from './ui/Progress';

import profile from '../assets/profile.svg';

import Tag from './ui/Tag';
import Text from './ui/typography/Text';

export interface ProjectData {
  id: string;
  title: string;
  createDate: number;
  translations: any[];
};

const ProjectBox: React.FC<ProjectData> = ({ id, title, createDate, translations }) => {
  return (
    <Link to={`project/${id}`}>
      <div className='relative bg-white border border-gray-200 hover:border-gray-300 transition-colors ease-linear rounded-lg px-6 py-5'>
        <Text size='base' color='dark' weight='500' className='mb-1'>{title}</Text>
        <Text size='xs' color='light'>{moment(createDate).format('DD MMMM, YYYY')}</Text>
        <div className='mt-6 flex items-start gap-2'>
          <Tag color='gray'>Deutsch</Tag>
          <Tag color='gray'>Espanol</Tag>
          <Tag color='gray'>+1 more</Tag>
        </div>
        <div className='flex justify-between gap-6 mt-6'>
          <Avatar size='sm' profiles={[profile, profile, profile]} />
          <Progress color='primary' percentage={80} showPercentage />
        </div>
      </div>
    </Link>
  );
};

export default ProjectBox;