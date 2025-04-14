
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-scheme-blue to-scheme-teal py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center space-x-2">
          <span>Smart Scheme Recommender</span>
        </Link>
        
        <nav>
          <ul className="flex space-x-6 items-center">
            {currentUser ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-white hover:text-scheme-light">
                    Dashboard
                  </Link>
                </li>
                {currentUser.isAdmin && (
                  <li>
                    <Link to="/admin" className="text-white hover:text-scheme-light">
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <Button 
                    variant="outline" 
                    onClick={logout}
                    className="text-white border-white hover:bg-white/10"
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-scheme-light">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <Button variant="secondary">Sign Up</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
