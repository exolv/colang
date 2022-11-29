import moment from 'moment';
import { Link } from 'react-router-dom';

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
      <div className='bg-white border border-gray-200 hover:border-gray-300 transition-colors ease-linear rounded-lg px-6 py-5'>
        <Tag>{translations.length} translations</Tag>
        <Text size='base' color='dark' weight='500' className='mt-4 mb-1'>{title}</Text>
        <Text size='xs' color='light'>{moment(createDate).format('DD MMMM, YYYY')}</Text>
        <div className='mt-6 flex items-start gap-2'>
          <Tag color='gray'>Deutsch</Tag>
          <Tag color='gray'>Espanol</Tag>
          <Tag color='gray'>+1 more</Tag>
        </div>
      </div>
    </Link>
  );
};

export default ProjectBox;