import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, Users, Star, ArrowRight, Play, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JH</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Job Hive</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Find Jobs</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Companies</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Resources</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-700 px-4 py-1 text-sm font-medium">
                  🎯 Find Your Dream Job Today
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Your 
                  <span className="text-blue-600"> Perfect Career </span>
                  Match
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                  Connect with top companies worldwide and find opportunities that match your skills and aspirations.
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl">
                <div className="flex-1 flex items-center px-4 py-3 gap-3">
                  <Search className="text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Job title, keywords, or company"
                    className="flex-1 outline-none text-gray-700"
                  />
                </div>
                <div className="flex items-center px-4 py-3 gap-3 border-l">
                  <MapPin className="text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Location"
                    className="flex-1 outline-none text-gray-700 min-w-[120px]"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
                  Search Jobs
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">200+</div>
                  <div className="text-sm text-gray-600">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Job Seekers</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                <div className="relative z-10 text-white">
                  <div className="w-full h-80 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-16 h-16 text-white/80" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-lg font-semibold">Watch Success Stories</p>
                  </div>
                </div>
                {/* Floating cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Job Match Found!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-xl text-gray-600">Hand-picked jobs from top companies</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((job) => (
              <Card key={job} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">C</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Full-time
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      Senior Frontend Developer
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Company Name
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>2 days ago</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">React</Badge>
                    <Badge variant="outline" className="text-xs">TypeScript</Badge>
                    <Badge variant="outline" className="text-xs">Node.js</Badge>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-semibold text-gray-900">$120K - $150K</span>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              View All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Explore opportunities by industry</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Technology', count: '12,000+', icon: '💻', color: 'from-blue-500 to-cyan-500' },
              { name: 'Marketing', count: '8,500+', icon: '📈', color: 'from-green-500 to-teal-500' },
              { name: 'Design', count: '6,200+', icon: '🎨', color: 'from-purple-500 to-pink-500' },
              { name: 'Finance', count: '9,100+', icon: '💰', color: 'from-yellow-500 to-orange-500' },
              { name: 'Healthcare', count: '5,800+', icon: '🏥', color: 'from-red-500 to-pink-500' },
              { name: 'Education', count: '4,300+', icon: '📚', color: 'from-indigo-500 to-blue-500' },
              { name: 'Sales', count: '7,600+', icon: '📊', color: 'from-emerald-500 to-green-500' },
              { name: 'Operations', count: '3,900+', icon: '⚙️', color: 'from-slate-500 to-gray-500' },
            ].map((category) => (
              <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 hover:-translate-y-1">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.count} jobs</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Ready to Start Your
                <br />Career Journey?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Join thousands of professionals who found their dream jobs through Job Hive
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  Find Jobs Now
                </Button>
              </Link>
              <Link href="/recruiter/signup">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JH</span>
                </div>
                <span className="text-xl font-bold">Job Hive</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect career opportunities.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Salary Tools</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Post Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Candidates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Job Hive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;