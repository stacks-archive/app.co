import dynamic from 'next/dynamic';

const Select = dynamic(() => import('./select'), {
  ssr: false,
});

export { Select };
