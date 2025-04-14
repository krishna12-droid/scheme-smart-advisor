
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { CheckCircle } from "lucide-react";

const HomePage = () => {
  const features = [
    "Personalized policy recommendations",
    "Multiple provider coverage (LIC, Star Health)",
    "Government scheme eligibility checker",
    "Complete benefits comparison",
    "Easy application process"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-scheme-light to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-scheme-dark mb-4">
                  Find the Perfect Insurance & Welfare Schemes
                </h1>
                <p className="text-lg mb-8 text-gray-700">
                  Smart Scheme Recommender helps you discover personalized insurance policies 
                  and government welfare programs you're eligible for - all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-scheme-blue hover:bg-scheme-blue/90">
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/login">Log In</Link>
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-10">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 text-scheme-blue">Why Use Smart Scheme Recommender?</h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-scheme-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-scheme-blue text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                <p className="text-gray-600">Enter your personal details, income, and health information to help us understand your situation.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-scheme-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-scheme-blue text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
                <p className="text-gray-600">Our system intelligently matches you with schemes and policies you're eligible for.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-scheme-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-scheme-blue text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Apply with Ease</h3>
                <p className="text-gray-600">Compare options and apply directly through our platform with minimal paperwork.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-scheme-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Smart Scheme Recommender. All rights reserved.</p>
            <p className="text-sm mt-2 text-gray-400">
              This is a demonstration platform and not affiliated with any insurance provider or government agency.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
