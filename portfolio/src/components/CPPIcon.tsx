import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

interface CPlusPlusIconProps extends SvgIconProps {
  fill?: string;
}

const CPlusPlusIcon = ({ fill = '#00599C', ...props }: CPlusPlusIconProps) => (
  <SvgIcon {...props} viewBox="0 0 128 128">
    <path fill={fill} d="M64 0L0 64l64 64 64-64L64 0zM31.2 80c-4.4-4.4-6.6-9.7-6.6-16s2.2-11.6 6.6-16c4.4-4.4 9.7-6.6 16-6.6 5.5 0 10.3 1.7 14.3 5.1l-6.4 7.8c-2.2-1.9-4.8-2.9-7.8-2.9-3.4 0-6.2 1.2-8.5 3.5s-3.5 5.1-3.5 8.5 1.2 6.2 3.5 8.5c2.3 2.3 5.1 3.5 8.5 3.5 3.1 0 5.8-1.1 8.2-3.2l6.1 7.8c-3.9 3.6-8.8 5.4-14.7 5.4-6.3.1-11.6-2.1-16-6.5zM91.5 69.1H81.3v10.2h-7.7V69.1H63.4v-7.7h10.2V51.2h7.7v10.2h10.2v7.7zm24.5 0h-10.2v10.2h-7.7V69.1H87.9v-7.7h10.2V51.2h7.7v10.2h10.2v7.7z"/>
  </SvgIcon>
);

export default CPlusPlusIcon;