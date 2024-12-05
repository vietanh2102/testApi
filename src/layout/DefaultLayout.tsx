import Header from "../components/Header/Header";

function DefaultLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      <div className="mt-[112px] w-full max-w-[1170px] min-h-[100vh] mx-auto px-8">
        {children}
      </div>
      <footer className="bg-[#f6f8fa] h-[80px] w-full mt-8"></footer>
    </>
  );
}

export default DefaultLayout;
