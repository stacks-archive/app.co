export interface NavLink {
  name: string;
  href: string;
}

export const primaryNavLinks = [
  {
    name: 'Discover apps',
    href: '/blockstack'
  },
  {
    name: 'About app.co',
    href: '/faq'
  },
  {
    name: 'App Mining',
    href: '/mining'
  },
  {
    name: 'Submit app',
    href: '/submit-your-app'
  },
  {
    name: 'Manage your apps',
    href: '/maker/apps'
  }
]

export const adminLinks = [
  {
    name: 'Admin',
    href: '/admin'
  },
  {
    name: 'Pending',
    href: '/admin/pending'
  },
  {
    name: 'Mining',
    href: '/admin/mining/months'
  }
]

export const termsLinks = [
  {
    name: 'Privacy Policy',
    href: '/privacy'
  },
  {
    name: 'Terms of Use',
    href: '/terms'
  },
  {
    name: 'App Mining Terms',
    href: '/mining/terms'
  }
]
