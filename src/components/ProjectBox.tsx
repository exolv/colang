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
        <Text size='text-base' color='text-slate-700' weight='font-medium' className='mt-4 mb-1'>{title}</Text>
        <Text size='text-sm' color='text-slate-500'>{moment(createDate).format('DD MMMM, YYYY')}</Text>
        <div className='mt-6 flex items-start gap-2'>
          <Tag bg='bg-gray-100' color='text-gray-500'>Deutsch</Tag>
          <Tag bg='bg-gray-100' color='text-gray-500'>Espanol</Tag>
          <Tag bg='bg-gray-100' color='text-gray-500'>+1 more</Tag>
        </div>
      </div>
    </Link>
  );
};

export default ProjectBox;