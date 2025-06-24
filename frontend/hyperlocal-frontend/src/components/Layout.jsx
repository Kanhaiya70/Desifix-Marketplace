const Layout = ({ children }) =>{
  return(
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;