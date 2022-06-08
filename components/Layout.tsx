import TopBar from "./TopBar";
import NavigationBar from "./NavigationBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen font-sans antialiased">
      <TopBar />
      <NavigationBar />

      <div className="pb-24">{children}</div>
    </div>
  );
};

export default Layout;
