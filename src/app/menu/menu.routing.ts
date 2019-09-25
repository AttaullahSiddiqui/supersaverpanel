import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { AllUserComponent } from '../all-user/all-user.component';
import { AssignRoleComponent } from '../assign-role/assign-role.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AllCategoriesComponent } from '../all-categories/all-categories.component';
import { AddStoreComponent } from '../add-store/add-store.component';
import { EditStoreComponent } from '../edit-store/edit-store.component';
import { TopStoresComponent } from '../top-stores/top-stores.component';
import { AddCouponComponent } from '../add-coupon/add-coupon.component';
import { AllCouponComponent } from '../all-coupon/all-coupon.component';
import { SortCouponComponent } from '../sort-coupon/sort-coupon.component';
import { DealsPageComponent } from '../deals-page/deals-page.component';
import { AllDealsComponent } from '../all-deals/all-deals.component';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { AllBlogComponent } from '../all-blog/all-blog.component';
import { GeneralSettingComponent } from '../general-setting/general-setting.component';


export const MenuRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'allUser', component: AllUserComponent },
    { path: 'assignRole', component: AssignRoleComponent },
    { path: 'addCategory', component: AddCategoryComponent },
    { path: 'allCategories', component: AllCategoriesComponent },
    { path: 'addStore', component: AddStoreComponent },
    { path: 'editStore', component: EditStoreComponent },
    { path: 'topStores', component: TopStoresComponent },
    { path: 'addCoupon', component: AddCouponComponent },
    { path: 'allCoupon', component: AllCouponComponent },
    { path: 'sortCoupon', component: SortCouponComponent },
    { path: 'deals', component: DealsPageComponent },
    { path: 'allDeals', component: AllDealsComponent },
    { path: 'addBlog', component: AddBlogComponent },
    { path: 'allBlog', component: AllBlogComponent },
    { path: 'generalSetting', component: GeneralSettingComponent },

    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    }
];
