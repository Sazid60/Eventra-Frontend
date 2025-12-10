
import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbarWrapper from "@/components/shared/PublicNavbarWrapper";
export const dynamic = 'force-dynamic';


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <PublicNavbarWrapper />
            <div>{children}</div>
            <PublicFooter />
        </>
    );
};

export default CommonLayout;