
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { allSchemes, users, userProfiles } from "@/services/mockData";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { UserProfile, Scheme } from "@/types";
import { Search } from "lucide-react";

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Prepare data for Provider Breakdown chart
  const providerData = [
    { name: "LIC", value: allSchemes.filter(s => s.provider === "LIC").length },
    { name: "Star Health", value: allSchemes.filter(s => s.provider === "Star Health").length },
    { name: "Government", value: allSchemes.filter(s => s.provider === "Government").length },
  ];
  
  // Prepare data for Age Distribution chart
  const getAgeGroup = (age: number) => {
    if (age < 18) return "Under 18";
    if (age < 30) return "18-29";
    if (age < 45) return "30-44";
    if (age < 60) return "45-59";
    return "60+";
  };
  
  const ageGroupCounts: Record<string, number> = {};
  userProfiles.forEach(profile => {
    const ageGroup = getAgeGroup(profile.age);
    ageGroupCounts[ageGroup] = (ageGroupCounts[ageGroup] || 0) + 1;
  });
  
  const ageDistributionData = Object.entries(ageGroupCounts).map(([group, count]) => ({
    name: group,
    value: count
  }));
  
  // Filter schemes based on search term
  const filteredSchemes = allSchemes.filter(scheme => 
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const COLORS = ['#0074cc', '#00a3a3', '#ffa500', '#ff5733', '#c70039'];
  
  const renderColorfulPieChart = (entry: any, index: number) => COLORS[index % COLORS.length];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Complete Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userProfiles.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Schemes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{allSchemes.length}</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="schemes" className="space-y-6">
            <TabsList className="grid grid-cols-4 md:w-auto md:inline-grid">
              <TabsTrigger value="schemes">Schemes</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schemes">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <CardTitle>Manage Schemes</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search schemes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 w-full md:w-[250px]"
                        />
                      </div>
                      <Button>Add New Scheme</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSchemes.map((scheme) => (
                          <TableRow key={scheme.id}>
                            <TableCell className="font-medium">{scheme.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{scheme.provider}</Badge>
                            </TableCell>
                            <TableCell>{scheme.type}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Profile Status</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => {
                          const hasProfile = userProfiles.some(p => p.userId === user.id);
                          return (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge variant={hasProfile ? "default" : "outline"} className={hasProfile ? "bg-green-500 hover:bg-green-600" : ""}>
                                  {hasProfile ? "Complete" : "Incomplete"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.isAdmin ? "secondary" : "outline"}>
                                  {user.isAdmin ? "Admin" : "User"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">View</Button>
                                  <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheme Provider Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={providerData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {providerData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Age Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={ageDistributionData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="Users" fill="#0074cc" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    System settings would be configured here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
