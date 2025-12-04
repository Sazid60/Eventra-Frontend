
import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbarWrapper from "@/components/shared/PublicNavbarWrapper";



const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <PublicNavbarWrapper />
            <div className="px-2 md:px-3">{children}</div>
            <PublicFooter />
        </>
    );
};

export default CommonLayout;