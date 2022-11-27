import { GlobeEuropeAfricaIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProjectBox from '../../components/ProjectBox';

import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/form/Button';
import Input from '../../components/ui/form/Input';
import Select from '../../components/ui/form/Select';
import Icon from '../../components/ui/Icon';
import Modal from '../../components/ui/Modal';
import Tag from '../../components/ui/Tag';
import Text from '../../components/ui/typography/Text';
import Title from '../../components/ui/typography/Title';

const UI: React.FC = () => {
  const [modalToggled, setModalToggled] = useState(false);

  const { register, control, formState: { errors } } = useForm({ mode: 'onTouched' });

  return (
    <div className='p-20'>
      <div className='grid grid-cols-3 mb-12'>
        <div className='col-span-1'><Title size='lg'>Typography</Title></div>
        <div className='col-span-2'>
          <div className='grid grid-cols-4'>
            <div>
              <Title size='lg'>Title lg</Title>
              <Title size='base'>Title base</Title>
              <Title size='sm'>Title sm</Title>
            </div>
            <div>
              <Text size='lg' color='dark' weight='400'>Text lg</Text>
              <Text size='base' color='dark' weight='400'>Text base</Text>
              <Text size='sm' color='dark' weight='400'>Text sm</Text>
              <Text size='xs' color='dark' weight='400'>Text xs</Text>
            </div>
            <div>
              <Text size='base' color='dark' weight='400'>Text dark</Text>
              <Text size='base' color='light' weight='400'>Text light</Text>
              <Text size='base' color='primary' weight='400'>Text primary</Text>
              <Text size='base' color='red' weight='400'>Text red</Text>
              <Text size='base' color='green' weight='400'>Text green</Text>
              <Text size='base' color='yellow' weight='400'>Text yellow</Text>
            </div>
            <div>
              <Text size='base' color='light' weight='600'>Text 600</Text>
              <Text size='base' color='light' weight='500'>Text 500</Text>
              <Text size='base' color='light' weight='400'>Text 400</Text>
              <Text size='base' color='light' weight='300'>Text 300</Text>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 mb-12'>
        <div className='col-span-1'><Title size='lg'>Form</Title></div>
        <div className='col-span-2'>
          <div className='mb-10'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center gap-4'>
                <Button
                  type='button'
                  size='lg'
                  color='primary'
                >Button lg</Button>
                <Button
                  type='button'
                  size='base'
                  color='primary'
                >Button base</Button>
                <Button
                  type='button'
                  size='sm'
                  color='primary'
                >Button sm</Button>
              </div>
              <div className='flex items-center gap-4'>
                <Button
                  type='button'
                  size='base'
                  color='primary'
                  flat
                >Button flat</Button>
                <Button
                  type='button'
                  size='base'
                  color='primary'
                  outlined
                >Button outlined</Button>
              </div>
              <div className='flex items-center gap-4'>
                <Button
                  type='button'
                  size='sm'
                  color='red'
                  shadow
                >Button red</Button>
                <Button
                  type='button'
                  size='sm'
                  color='green'
                  shadow
                >Button green</Button>
                <Button
                  type='button'
                  size='sm'
                  color='yellow'
                  shadow
                >Button yellow</Button>
              </div>
              <div className='flex items-center gap-4'>
                <Button
                  type='button'
                  size='base'
                  color='primary'
                  shadow
                >Button shadow</Button>
                <Button
                  type='button'
                  size='base'
                  color='primary'
                  icon={<UserCircleIcon />}
                >Button icon</Button>
                <Button
                  type='button'
                  size='base'
                  color='primary'
                  loading
                >Button loading</Button>
              </div>
            </div>
          </div>
          <div className='mb-10'>
            <div className='grid grid-cols-2 gap-10'>
              <div className='flex flex-col gap-4'>
                <Input
                  register={register('fullName1', {
                    required: 'This field is required.'
                  })}
                  control={control}
                  type='text'
                  name='fullName1'
                  label='Full name'
                  placeholder='Your full name'
                  size='lg'
                  icon={<UserCircleIcon />}
                />
                <Input
                  register={register('fullName2', {
                    required: 'This field is required.'
                  })}
                  control={control}
                  type='text'
                  name='fullName2'
                  label='Full name'
                  placeholder='Your full name'
                  size='base'
                  icon={<UserCircleIcon />}
                />
                <Input
                  register={register('fullName3', {
                    required: 'This field is required.'
                  })}
                  control={control}
                  type='text'
                  name='fullName3'
                  label='Full name'
                  placeholder='Your full name'
                  size='sm'
                  icon={<UserCircleIcon />}
                />
              </div>
              <div className='flex flex-col gap-4'>
                <Input
                  register={register('fullName4', {
                    required: 'This field is required.'
                  })}
                  control={control}
                  type='text'
                  name='fullName4'
                  label='Full name'
                  placeholder='Your full name'
                  size='base'
                />
                <Input
                  register={register('fullName5', {
                    required: 'This field is required.'
                  })}
                  control={control}
                  error={errors.fullName5}
                  type='text'
                  name='fullName5'
                  label='Full name'
                  placeholder='Your full name'
                  size='base'
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-10'>
            <Select
              control={control}
              name='country'
              label='Country'
              icon={<GlobeEuropeAfricaIcon />}
              placeholder='Your country'
              options={[
                { value: 'RO', label: 'Romania' },
                { value: 'DE', label: 'Germany' },
                { value: 'ES', label: 'Spain' }
              ]}
              rules={{ required: 'This field is required.' }}
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 mb-12'>
        <div className='col-span-1'><Title size='lg'>Components</Title></div>
        <div className='col-span-2'>
          <div className='mb-10'>
            <Alert type='success' title='Success Alert' className='mb-4'>Lorem ipsum dolor amet simena eldunt.</Alert>
            <Alert type='error' title='Error Alert' className='mb-4'>Lorem ipsum dolor amet simena eldunt.</Alert>
            <Alert type='warning' title='Warning Alert' className='mb-4'>Lorem ipsum dolor amet simena eldunt.</Alert>
            <Alert type='info' title='Info Alert'>Lorem ipsum dolor amet simena eldunt.</Alert>
          </div>
          <div className='mb-10'>
            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-4 mb-4'>
                <Icon size='lg'><UserCircleIcon /></Icon>
                <Icon size='base'><UserCircleIcon /></Icon>
                <Icon size='sm'><UserCircleIcon /></Icon>
              </div>
              <div className='flex items-center gap-4'>
                <Icon color='primary'><UserCircleIcon /></Icon>
                <Icon color='red'><UserCircleIcon /></Icon>
                <Icon color='green'><UserCircleIcon /></Icon>
                <Icon color='yellow'><UserCircleIcon /></Icon>
                <Icon color='gray'><UserCircleIcon /></Icon>
              </div>
            </div>
          </div>
          <div className='mb-10'>
            <div className='flex items-center gap-4'>
              <Tag color='primary'>Tag primary</Tag>
              <Tag color='red'>Tag red</Tag>
              <Tag color='green'>Tag green</Tag>
              <Tag color='yellow'>Tag yellow</Tag>
              <Tag color='gray'>Tag gray</Tag>
            </div>
          </div>
          <div className='mb-10'>
            <Button onClick={() => setModalToggled(!modalToggled)}>Toggle modal</Button>
            <Modal
              color='primary'
              icon={<UserCircleIcon />}
              title='Welcome to colang!'
              buttons={[
                <Button color='gray' flat onClick={() => setModalToggled(!modalToggled)}>Close</Button>,
                <Button type='submit'>Get started</Button>
              ]}
              toggled={modalToggled}
            >Lorem ipsum dolor amet simena eldunt.</Modal>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3'>
        <div className='col-span-1'><Title size='lg'>Application</Title></div>
        <div className='col-span-2'>
          <div className='mb-10'>
            <div className='grid grid-cols-4'>
              <ProjectBox id='1' title='colang Project' createDate={Date.now()} translations={[1, 2, 3]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UI;