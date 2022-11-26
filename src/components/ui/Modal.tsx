import Text from './typography/Text';

interface ModalProps {
  children: JSX.Element;
  className?: string;
  header?: JSX.Element;
  title: string;
  text: string;
  content: JSX.Element | string;
};

const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  header,
  title,
  text,
  content
}) => {
  return (
    <div className='fixed w-full h-full top-0 right-0 button-0 left-0 flex justify-center items-center bg-slate-900/30'>
      <div className={`font-montserrat bg-white rounded-xl max-w-[450px] p-10 flex flex-col justify-center text-center ${className}`}>
        <div className='flex justify-center mb-6'>{header}</div>
        <Text size='text-base' color='text-slate-700' weight='font-medium' className='mb-2'>{title}</Text>
        <Text size='text-sm' color='text-slate-500'>{text}</Text>
        <div className='mt-6'>{content}</div>
        <div className='flex justify-around mt-6'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;