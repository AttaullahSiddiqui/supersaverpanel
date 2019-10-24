interface NavAttributes {
  [propName: string]: any;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  title?: boolean;
  children?: NavData[];
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-screen-desktop'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Configuration',
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
        icon: 'icon-user-follow',
        attributes: { disabled: true }
      },
      {
        name: 'All User',
        url: '/allUser',
        icon: 'icon-options-vertical'
      },
      {
        name: 'Assign Role',
        url: '/assignRole',
        icon: 'icon-mustache',
        attributes: { disabled: true }
      }
    ]
  },
  { divider: true },
  {
    title: true,
    name: 'Data Entry'
  },
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
    class: 'stop',
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
        icon: 'fa fa-database',
        attributes: { disabled: true }
      }
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
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
    url: '/addSlider',
    icon: 'fa fa-film'
  }
];
