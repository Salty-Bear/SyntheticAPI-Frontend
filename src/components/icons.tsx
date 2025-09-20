import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z" />
      <path d="M2.5 7.5l9.5 5.5 9.5-5.5" />
      <path d="M12 13v11" />
    </svg>
  );
}
