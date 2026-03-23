import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { SUPERADMIN_API_END_POINT } from "../utils/constants";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
} from "chart.js";
import { toast } from "sonner";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const StatCard = ({ title, value, color }) => (
    <div className={`bg-white rounded-xl shadow p-6 border-l-4 ${color}`}>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
);

const SuperAdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [recruiters, setRecruiters] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, companiesRes, recruitersRes, candidatesRes] = await Promise.all([
                axios.get(`${SUPERADMIN_API_END_POINT}/stats`, { withCredentials: true }),
                axios.get(`${SUPERADMIN_API_END_POINT}/companies`, { withCredentials: true }),
                axios.get(`${SUPERADMIN_API_END_POINT}/recruiters`, { withCredentials: true }),
                axios.get(`${SUPERADMIN_API_END_POINT}/candidates`, { withCredentials: true }),
            ]);
            setStats(statsRes.data.stats);
            setCompanies(companiesRes.data.companies);
            setRecruiters(recruitersRes.data.recruiters);
            setCandidates(candidatesRes.data.candidates);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const getMonthlyLabels = () => {
        const labels = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            labels.push(`${MONTHS[d.getMonth()]} ${d.getFullYear()}`);
        }
        return labels;
    };

    const getMonthlyData = (monthlyData, role) => {
        const labels = getMonthlyLabels();
        return labels.map((label) => {
            const [mon, yr] = label.split(" ");
            const monthIndex = MONTHS.indexOf(mon) + 1;
            const year = parseInt(yr);
            const found = monthlyData?.find(
                (d) => d._id.month === monthIndex && d._id.year === year && (!role || d._id.role === role)
            );
            return found ? found.count : 0;
        });
    };

    const getMonthlyJobData = (monthlyData) => {
        const labels = getMonthlyLabels();
        return labels.map((label) => {
            const [mon, yr] = label.split(" ");
            const monthIndex = MONTHS.indexOf(mon) + 1;
            const year = parseInt(yr);
            const found = monthlyData?.find(
                (d) => d._id.month === monthIndex && d._id.year === year
            );
            return found ? found.count : 0;
        });
    };

    // Chart data
    const userGrowthData = {
        labels: getMonthlyLabels(),
        datasets: [
            {
                label: "Candidates",
                data: getMonthlyData(stats?.monthlyUsers, "student"),
                backgroundColor: "rgba(106, 56, 194, 0.7)",
                borderColor: "#6A38C2",
                borderWidth: 2,
            },
            {
                label: "Recruiters",
                data: getMonthlyData(stats?.monthlyUsers, "recruiter"),
                backgroundColor: "rgba(248, 48, 2, 0.7)",
                borderColor: "#F83002",
                borderWidth: 2,
            },
        ],
    };

    const applicationStatusData = {
        labels: ["Pending", "Accepted", "Rejected"],
        datasets: [
            {
                data: [
                    stats?.applicationStatus?.pending || 0,
                    stats?.applicationStatus?.accepted || 0,
                    stats?.applicationStatus?.rejected || 0,
                ],
                backgroundColor: ["#FBBF24", "#34D399", "#F87171"],
                borderWidth: 1,
            },
        ],
    };

    const jobTrendData = {
        labels: getMonthlyLabels(),
        datasets: [
            {
                label: "Jobs Posted",
                data: getMonthlyJobData(stats?.monthlyJobs),
                borderColor: "#6A38C2",
                backgroundColor: "rgba(106, 56, 194, 0.1)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const overviewDistributionData = {
        labels: ["Candidates", "Recruiters", "Companies", "Jobs"],
        datasets: [
            {
                data: [
                    stats?.totalStudents || 0,
                    stats?.totalRecruiters || 0,
                    stats?.totalCompanies || 0,
                    stats?.totalJobs || 0,
                ],
                backgroundColor: ["#6A38C2", "#F83002", "#3B82F6", "#10B981"],
                borderWidth: 1,
            },
        ],
    };

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "companies", label: "Companies" },
        { id: "recruiters", label: "Recruiters" },
        { id: "candidates", label: "Candidates" },
    ];

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="max-w-7xl mx-auto p-6">
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500 text-lg">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">
                    Super Admin <span className="text-[#6A38C2]">Dashboard</span>
                </h1>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    <StatCard title="Total Candidates" value={stats?.totalStudents || 0} color="border-purple-500" />
                    <StatCard title="Total Recruiters" value={stats?.totalRecruiters || 0} color="border-red-500" />
                    <StatCard title="Total Companies" value={stats?.totalCompanies || 0} color="border-blue-500" />
                    <StatCard title="Total Jobs" value={stats?.totalJobs || 0} color="border-green-500" />
                    <StatCard title="Total Applications" value={stats?.totalApplications || 0} color="border-yellow-500" />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                                activeTab === tab.id
                                    ? "bg-[#6A38C2] text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">User Growth (Last 6 Months)</h3>
                            <Bar data={userGrowthData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Application Status</h3>
                            <div className="flex justify-center">
                                <div className="w-64 h-64">
                                    <Doughnut data={applicationStatusData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Jobs Posted (Last 6 Months)</h3>
                            <Line data={jobTrendData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Platform Distribution</h3>
                            <div className="flex justify-center">
                                <div className="w-64 h-64">
                                    <Doughnut data={overviewDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "companies" && (
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-4 font-medium text-gray-600">Logo</th>
                                        <th className="p-4 font-medium text-gray-600">Name</th>
                                        <th className="p-4 font-medium text-gray-600">Location</th>
                                        <th className="p-4 font-medium text-gray-600">Website</th>
                                        <th className="p-4 font-medium text-gray-600">Created By</th>
                                        <th className="p-4 font-medium text-gray-600">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.length === 0 ? (
                                        <tr><td colSpan="6" className="p-4 text-center text-gray-500">No companies found</td></tr>
                                    ) : (
                                        companies.map((company) => (
                                            <tr key={company._id} className="border-t hover:bg-gray-50">
                                                <td className="p-4">
                                                    <img src={company.logo || "https://via.placeholder.com/40"} alt={company.name} className="w-10 h-10 rounded-full object-cover" />
                                                </td>
                                                <td className="p-4 font-medium">{company.name}</td>
                                                <td className="p-4 text-gray-600">{company.location || "N/A"}</td>
                                                <td className="p-4">
                                                    {company.website ? (
                                                        <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                            Visit
                                                        </a>
                                                    ) : "N/A"}
                                                </td>
                                                <td className="p-4 text-gray-600">{company.userId?.fullname || "N/A"}</td>
                                                <td className="p-4 text-gray-600">{new Date(company.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "recruiters" && (
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-4 font-medium text-gray-600">Photo</th>
                                        <th className="p-4 font-medium text-gray-600">Name</th>
                                        <th className="p-4 font-medium text-gray-600">Email</th>
                                        <th className="p-4 font-medium text-gray-600">Phone</th>
                                        <th className="p-4 font-medium text-gray-600">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recruiters.length === 0 ? (
                                        <tr><td colSpan="5" className="p-4 text-center text-gray-500">No recruiters found</td></tr>
                                    ) : (
                                        recruiters.map((recruiter) => (
                                            <tr key={recruiter._id} className="border-t hover:bg-gray-50">
                                                <td className="p-4">
                                                    <img src={recruiter.profile?.profilePhoto || "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Free-PNG-Clip-Art.png"} alt={recruiter.fullname} className="w-10 h-10 rounded-full object-cover" />
                                                </td>
                                                <td className="p-4 font-medium">{recruiter.fullname}</td>
                                                <td className="p-4 text-gray-600">{recruiter.email}</td>
                                                <td className="p-4 text-gray-600">{recruiter.phoneNumber || "N/A"}</td>
                                                <td className="p-4 text-gray-600">{new Date(recruiter.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "candidates" && (
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-4 font-medium text-gray-600">Photo</th>
                                        <th className="p-4 font-medium text-gray-600">Name</th>
                                        <th className="p-4 font-medium text-gray-600">Email</th>
                                        <th className="p-4 font-medium text-gray-600">Phone</th>
                                        <th className="p-4 font-medium text-gray-600">Skills</th>
                                        <th className="p-4 font-medium text-gray-600">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.length === 0 ? (
                                        <tr><td colSpan="6" className="p-4 text-center text-gray-500">No candidates found</td></tr>
                                    ) : (
                                        candidates.map((candidate) => (
                                            <tr key={candidate._id} className="border-t hover:bg-gray-50">
                                                <td className="p-4">
                                                    <img src={candidate.profile?.profilePhoto || "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Free-PNG-Clip-Art.png"} alt={candidate.fullname} className="w-10 h-10 rounded-full object-cover" />
                                                </td>
                                                <td className="p-4 font-medium">{candidate.fullname}</td>
                                                <td className="p-4 text-gray-600">{candidate.email}</td>
                                                <td className="p-4 text-gray-600">{candidate.phoneNumber || "N/A"}</td>
                                                <td className="p-4 text-gray-600">
                                                    <div className="flex flex-wrap gap-1">
                                                        {candidate.profile?.skills?.slice(0, 3).map((skill, i) => (
                                                            <span key={i} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {(candidate.profile?.skills?.length || 0) > 3 && (
                                                            <span className="text-xs text-gray-400">+{candidate.profile.skills.length - 3}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-gray-600">{new Date(candidate.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
