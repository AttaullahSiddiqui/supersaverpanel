import { Routes } from '@angular/router';
import { UtilityService } from '../utility.service'

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
import { SliderComponent } from '../slider/slider.component';


export const MenuRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [UtilityService] },
    { path: 'addUser', component: AddUserComponent, canActivate: [UtilityService] },
    { path: 'allUser', component: AllUserComponent, canActivate: [UtilityService] },
    { path: 'assignRole', component: AssignRoleComponent, canActivate: [UtilityService] },
    { path: 'addCategory', component: AddCategoryComponent, canActivate: [UtilityService] },
    { path: 'allCategories', component: AllCategoriesComponent, canActivate: [UtilityService] },
    { path: 'addStore', component: AddStoreComponent, canActivate: [UtilityService] },
    { path: 'editStore', component: EditStoreComponent, canActivate: [UtilityService] },
    { path: 'topStores', component: TopStoresComponent, canActivate: [UtilityService] },
    { path: 'addCoupon', component: AddCouponComponent, canActivate: [UtilityService] },
    { path: 'allCoupon', component: AllCouponComponent, canActivate: [UtilityService] },
    { path: 'sortCoupon', component: SortCouponComponent, canActivate: [UtilityService] },
    { path: 'deals', component: DealsPageComponent, canActivate: [UtilityService] },
    { path: 'allDeals', component: AllDealsComponent, canActivate: [UtilityService] },
    { path: 'addBlog', component: AddBlogComponent, canActivate: [UtilityService] },
    { path: 'allBlog', component: AllBlogComponent, canActivate: [UtilityService] },
    { path: 'addSlider', component: SliderComponent, canActivate: [UtilityService] },

    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    }
];
