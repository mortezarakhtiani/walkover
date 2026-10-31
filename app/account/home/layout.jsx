import Link from 'next/link';
import { Home } from 'lucide-react';
import { ProfileMenu } from '@/store/account/home/user-profile/components/profile-menu';

export default function AccountHomeLayout({ children }) {
    return (
        <div className="container-fixed mt-8 px-5 lg:px-7.5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-7.5">
                <aside className="self-start lg:sticky lg:top-5 lg:z-30">
                    <div className="mb-4">
                        <Link
                            href="/landing-v2"
                            className="flex items-center gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                            <Home className="size-5 text-muted-foreground" />
                            <span>بازگشت به صفحه اصلی</span>
                        </Link>
                    </div>

                    <ProfileMenu />
                </aside>

                <main className="min-w-0 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}