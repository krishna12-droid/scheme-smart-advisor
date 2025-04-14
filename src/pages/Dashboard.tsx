
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import Header from "@/components/Header";
import SchemeCard from "@/components/SchemeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Download, Printer } from "lucide-react";

const educationOptions = [
  "Primary School", "High School", "Diploma", "Graduate", "Post Graduate", "Doctorate"
];

const occupationOptions = [
  "Student", "Private Sector", "Government", "Self-Employed", "Business Owner", 
  "Agriculture", "Retired", "Unemployed", "Homemaker"
];

const healthConditions = [
  "None", "Diabetes", "Hypertension", "Heart Disease", "Cancer", 
  "Asthma", "Thyroid Disease", "Kidney Disease"
];

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { profile, recommendedSchemes, loading, saveProfile, hasProfile } = useProfile();
  
  const [selectedTab, setSelectedTab] = useState(hasProfile ? "recommendations" : "profile");
  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState<string[]>([]);
  
  // Form state
  const [age, setAge] = useState(profile?.age || 30);
  const [gender, setGender] = useState<"male" | "female" | "other">(profile?.gender || "male");
  const [state, setState] = useState(profile?.state || "");
  const [district, setDistrict] = useState(profile?.district || "");
  const [income, setIncome] = useState(profile?.income || 0);
  const [maritalStatus, setMaritalStatus] = useState<"single" | "married" | "divorced" | "widowed">(
    profile?.maritalStatus || "single"
  );
  const [occupation, setOccupation] = useState(profile?.occupation || "");
  const [education, setEducation] = useState(profile?.education || "");
  const [conditions, setConditions] = useState<string[]>(profile?.healthConditions || []);
  const [dependents, setDependents] = useState(profile?.dependents || 0);
  
  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    saveProfile({
      age,
      gender,
      state,
      district,
      income,
      maritalStatus,
      occupation,
      education,
      healthConditions: conditions,
      dependents
    });
    
    setSelectedTab("recommendations");
  };
  
  const toggleProviderFilter = (provider: string) => {
    if (providerFilter.includes(provider)) {
      setProviderFilter(providerFilter.filter(p => p !== provider));
    } else {
      setProviderFilter([...providerFilter, provider]);
    }
  };
  
  const filteredSchemes = recommendedSchemes.filter(scheme => {
    // Apply search filter
    const matchesSearch = searchTerm === "" || 
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply provider filter
    const matchesProvider = providerFilter.length === 0 || providerFilter.includes(scheme.provider);
    
    return matchesSearch && matchesProvider;
  });
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {hasProfile ? `Welcome back, ${currentUser?.name}` : "Complete Your Profile"}
          </h1>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-2">
              <TabsTrigger value="profile">Your Profile</TabsTrigger>
              <TabsTrigger value="recommendations" disabled={!hasProfile}>
                Recommendations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age" 
                          type="number" 
                          value={age}
                          onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender} onValueChange={(value: "male" | "female" | "other") => setGender(value)}>
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          type="text" 
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Input 
                          id="district" 
                          type="text" 
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="income">Annual Income (₹)</Label>
                        <Input 
                          id="income" 
                          type="number" 
                          value={income}
                          onChange={(e) => setIncome(parseInt(e.target.value) || 0)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Marital Status</Label>
                        <Select 
                          value={maritalStatus} 
                          onValueChange={(value: "single" | "married" | "divorced" | "widowed") => setMaritalStatus(value)}
                        >
                          <SelectTrigger id="maritalStatus">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dependents">Number of Dependents</Label>
                        <Input 
                          id="dependents" 
                          type="number" 
                          value={dependents}
                          onChange={(e) => setDependents(parseInt(e.target.value) || 0)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="education">Education Level</Label>
                        <Select value={education} onValueChange={setEducation}>
                          <SelectTrigger id="education">
                            <SelectValue placeholder="Select education" />
                          </SelectTrigger>
                          <SelectContent>
                            {educationOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Select value={occupation} onValueChange={setOccupation}>
                          <SelectTrigger id="occupation">
                            <SelectValue placeholder="Select occupation" />
                          </SelectTrigger>
                          <SelectContent>
                            {occupationOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Health Conditions</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {healthConditions.map(condition => (
                          <div key={condition} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`condition-${condition}`}
                              checked={conditions.includes(condition)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  if (condition === "None") {
                                    setConditions(["None"]);
                                  } else {
                                    setConditions([...conditions.filter(c => c !== "None"), condition]);
                                  }
                                } else {
                                  setConditions(conditions.filter(c => c !== condition));
                                }
                              }}
                            />
                            <Label 
                              htmlFor={`condition-${condition}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {condition}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full md:w-auto">
                      {hasProfile ? "Update Profile" : "Save Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations">
              {loading ? (
                <div className="text-center py-12">Loading recommendations...</div>
              ) : (
                <>
                  <div className="mb-6 space-y-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search schemes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="max-w-md"
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center">
                          <Filter className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium mr-2">Filter by:</span>
                        </div>
                        
                        <Button
                          variant={providerFilter.includes("LIC") ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => toggleProviderFilter("LIC")}
                        >
                          LIC
                        </Button>
                        <Button
                          variant={providerFilter.includes("Star Health") ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => toggleProviderFilter("Star Health")}
                        >
                          Star Health
                        </Button>
                        <Button
                          variant={providerFilter.includes("Government") ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => toggleProviderFilter("Government")}
                        >
                          Government
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handlePrint}>
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        {filteredSchemes.length} Recommended Schemes
                      </h2>
                    </div>
                  </div>
                  
                  {filteredSchemes.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <p className="text-lg text-gray-500">No matching schemes found.</p>
                      <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search criteria.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredSchemes.map((scheme) => (
                        <SchemeCard key={scheme.id} scheme={scheme} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
