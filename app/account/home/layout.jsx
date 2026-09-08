import {ProfileMenu} from '@/store/account/home/user-profile/components/profile-menu';

export default function AccountHomeLayout({children}) {
    return (
        <div className="container-fixed px-5 lg:px-7.5 mt-8">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-5 lg:gap-7.5">
                <div>
                    <ProfileMenu/>
                </div>

                <div className="min-w-0 w-full">
                    {children}
                </div>
            </div>

        </div>
    );
}