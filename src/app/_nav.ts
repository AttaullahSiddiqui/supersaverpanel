interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Users',
    url: '',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Add User',
        url: '/addUser',
        icon: 'icon-puzzle'
      },
      {
        name: 'All User',
        url: '/allUser',
        icon: 'icon-puzzle'
      },
      {
        name: 'Assign Role',
        url: '/assignRole',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Network',
    url: '',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Add Network',
        url: '/addNetwork',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Categories',
    url: '',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Add Category',
        url: '/addCategory',
        icon: 'icon-puzzle'
      },
      {
        name: 'All Categories',
        url: '/allCategories',
        icon: 'icon-puzzle'
      }
    ]
  }, {
    name: 'Stores',
    url: '',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Add Store',
        url: '/addStore',
        icon: 'icon-puzzle'
      },
      {
        name: 'Edit Store',
        url: '/editStore',
        icon: 'icon-puzzle'
      },
      {
        name: 'Sort Top Stores',
        url: '/topStores',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Coupons',
    url: '',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Add Coupon',
        url: '/addCoupon',
        icon: 'icon-puzzle'
      },
      {
        name: 'All Coupon',
        url: '/allCoupon',
        icon: 'icon-puzzle'
      },
      {
        name: 'Sort Coupon',
        url: '/sortCoupon',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Deals',
    url: '',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Deal Page',
        url: '/deals',
        icon: 'icon-puzzle'
      },
      {
        name: 'All Deal',
        url: '/allDeals',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Blog Post',
    url: '',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Add Blog',
        url: '/addBlog',
        icon: 'icon-puzzle'
      },
      {
        name: 'All Blog',
        url: '/allBlog',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Advertising',
    url: '/users',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Slider',
        url: '/base/cards',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'General Setting',
    url: '/generalSetting',
    icon: 'icon-puzzle'
  },
  {
    name: 'Media',
    url: '/users',
    icon: 'icon-puzzle'
  },
  {
    name: 'Image Compressor',
    url: '/users',
    icon: 'icon-puzzle'
  }
];
