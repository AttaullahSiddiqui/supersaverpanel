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
    icon: 'icon-screen-desktop'
  },
  {
    name: 'Users',
    url: '',
    icon: 'fa fa-user-o',
    class: 'stop',
    children: [
      {
        name: 'Add User',
        url: '/addUser',
        icon: 'icon-user-follow'
      },
      {
        name: 'All User',
        url: '/allUser',
        icon: 'icon-options-vertical'
      },
      {
        name: 'Assign Role',
        url: '/assignRole',
        icon: 'icon-mustache'
      }
    ]
  },
  // {
  //   name: 'Network',
  //   url: '',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Add Network',
  //       url: '/addNetwork',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },
  {
    name: 'Categories',
    url: '',
    icon: 'icon-directions',
    class: 'stop',
    children: [
      {
        name: 'Add Category',
        url: '/addCategory',
        icon: 'fa fa-plus'
      },
      {
        name: 'All Categories',
        url: '/allCategories',
        icon: 'fa fa-cubes'
      }
    ]
  }, {
    name: 'Stores',
    url: '',
    icon: 'icon-home',
    class: 'stop',
    children: [
      {
        name: 'Add Store',
        url: '/addStore',
        icon: 'fa fa-plus'
      },
      {
        name: 'Edit Store',
        url: '/editStore',
        icon: 'fa fa-edit'
      },
      {
        name: 'Sort Top Stores',
        url: '/topStores',
        icon: 'fa fa-sort-alpha-asc'
      }
    ]
  },
  {
    name: 'Coupons',
    url: '',
    icon: 'icon-present',
    children: [
      {
        name: 'Add Coupon',
        url: '/addCoupon',
        icon: 'fa fa-plus'
      },
      {
        name: 'All Coupon',
        url: '/allCoupon',
        icon: 'fa fa-ticket'
      },
      {
        name: 'Sort Coupon',
        url: '/sortCoupon',
        icon: 'fa fa-sort-amount-asc'
      }
    ]
  },
  {
    name: 'Deals',
    url: '',
    icon: 'icon-badge',
    class: 'stop',
    children: [
      {
        name: 'Deal Page',
        url: '/deals',
        icon: 'fa fa-newspaper-o'
      },
      {
        name: 'All Deal',
        url: '/allDeals',
        icon: 'fa fa-database'
      }
    ]
  },
  {
    name: 'Blog Post',
    url: '',
    icon: 'icon-book-open',
    class: 'stop',
    children: [
      {
        name: 'Add Blog',
        url: '/addBlog',
        icon: 'fa fa-pencil'
      },
      {
        name: 'All Blog',
        url: '/allBlog',
        icon: 'fa fa-reorder'
      }
    ]
  },
  {
    name: 'Slider',
    url: '/users',
    icon: 'fa fa-film'
  }
  // {
  //   name: 'General Setting',
  //   url: '/generalSetting',
  //   icon: 'icon-puzzle'
  // },
  // {
  //   name: 'Media',
  //   url: '/users',
  //   icon: 'icon-puzzle'
  // },
  // {
  //   name: 'Image Compressor',
  //   url: '/users',
  //   icon: 'icon-puzzle'
  // }
];
