import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Code2, Database, Globe, Smartphone, Cloud, Shield, Cpu, LineChart } from 'lucide-react'

const roadmaps = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Learn to build modern user interfaces and web applications',
    icon: <Globe className="w-6 h-6" />,
    color: 'bg-blue-500',
    topics: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js']
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Master server-side programming and API development',
    icon: <Database className="w-6 h-6" />,
    color: 'bg-green-500',
    topics: ['Node.js', 'Python', 'Databases', 'APIs', 'Security']
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Become proficient in both frontend and backend technologies',
    icon: <Code2 className="w-6 h-6" />,
    color: 'bg-purple-500',
    topics: ['Web Dev', 'Databases', 'APIs', 'DevOps', 'Testing']
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Build native and cross-platform mobile applications',
    icon: <Smartphone className="w-6 h-6" />,
    color: 'bg-orange-500',
    topics: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile Design']
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Learn cloud platforms, CI/CD, and infrastructure automation',
    icon: <Cloud className="w-6 h-6" />,
    color: 'bg-red-500',
    topics: ['Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring']
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description: 'Master security principles and protect digital assets',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-yellow-500',
    topics: ['Network Security', 'Cryptography', 'Pen Testing', 'Security Tools']
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Dive into artificial intelligence and machine learning',
    icon: <Cpu className="w-6 h-6" />,
    color: 'bg-pink-500',
    topics: ['Python', 'Math', 'ML Algorithms', 'Deep Learning', 'NLP']
  },
  {
    id: 'data',
    title: 'Data Science',
    description: 'Learn data analysis, visualization, and statistical modeling',
    icon: <LineChart className="w-6 h-6" />,
    color: 'bg-cyan-500',
    topics: ['Statistics', 'Python', 'R', 'Data Visualization', 'Big Data']
  }
]

export default function Roadmaps() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRoadmaps = roadmaps.filter(roadmap => 
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    roadmap.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Career Roadmaps
          </h1>
          <p className="text-xl text-gray-600">
            Choose your path and start learning today
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search roadmaps..."
            className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-md shadow-sm  hover:scale-105"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRoadmaps.map((roadmap) => (
            <Link 
              key={roadmap.id} 
              to={`/roadmaps/${roadmap.id}`}
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <div className="h-full p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
                <div>
                  <div className={`${roadmap.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 transition-transform duration-200 ease-in-out transform -rotate-15 hover:rotate-0`}>
                    {roadmap.icon}
                  </div>
                  <h3 className="text-xl font-bold font-sans text-gray-900 mb-2">
                    {roadmap.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {roadmap.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {roadmap.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 transition duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

