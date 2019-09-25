import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { SortablejsModule } from 'ngx-sortablejs';

import { MenuRoutes } from './menu.routing';

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
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { AllBlogComponent } from '../all-blog/all-blog.component';
import { GeneralSettingComponent } from '../general-setting/general-setting.component';
import { DealsPageComponent } from '../deals-page/deals-page.component';
import { AllDealsComponent } from '../all-deals/all-deals.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MenuRoutes),
        FormsModule,
        HttpClientModule,
        NgxEditorModule,
        SortablejsModule
    ],
    declarations: [
        DashboardComponent,
        AddUserComponent,
        AllUserComponent,
        AssignRoleComponent,
        AddCategoryComponent,
        AllCategoriesComponent,
        AddStoreComponent,
        EditStoreComponent,
        TopStoresComponent,
        AddCouponComponent,
        AllCouponComponent,
        SortCouponComponent,
        AddBlogComponent,
        AllBlogComponent,
        GeneralSettingComponent,
        DealsPageComponent,
        AllDealsComponent,
    ]
})

export class MenuModule { }