
import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbarWrapper from "@/components/shared/PublicNavbarWrapper";



const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <>  
            <PublicNavbarWrapper/>
            {children}
            <PublicFooter/>
        </>
    );
};

export default CommonLayout;