import SpinnerLoader from "@/components/shared/SpinnerLoader";

const HomeLoading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SpinnerLoader />
    </div>
  );
};

export default HomeLoading;