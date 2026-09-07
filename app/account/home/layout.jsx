import {ProfileMenu} from '@/store/account/home/user-profile/components/profile-menu';

export default function AccountHomeLayout({children}) {
    return (
        <div className="container-fixed px-5 lg:px-7.5">

            <div className="grid grid-cols-1 xl:grid-cols-10 gap-5 lg:gap-7.5">

                {/* منوی حساب کاربری */}
                <div className="xl:col-span-3">
                    <ProfileMenu/>
                </div>

                {/* محتوای صفحه */}
                <div className="xl:col-span-7">
                    <div className="w-[90%]">
                        {children}
                    </div>
                </div>

            </div>

        </div>
    );
}