export interface NavLink {
  name: string;
  href: string;
}

export const primaryNavLinks: NavLink[] = [
  {
    name: 'Discover apps',
    href: '/blockstack',
  },
  {
    name: 'About app.co',
    href: '/faq',
  },
  {
    name: 'Submit app',
    href: '/submit-your-app',
  },
];

export const adminLinks: NavLink[] = [
  {
    name: 'Admin',
    href: '/admin',
  },
  {
    name: 'Pending',
    href: '/admin/pending',
  },
  {
    name: 'Mining',
    href: '/admin/mining/months',
  },
];

export const termsLinks: NavLink[] = [
  {
    name: 'Privacy Policy',
    href: '/privacy',
  },
  {
    name: 'Terms of Use',
    href: '/terms',
  },
];
