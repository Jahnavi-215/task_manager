import './KPIStats.css';

const KPIStats = ({ stats }) => {
  const kpiData = [
    {
      label: 'Total Tasks',
      value: stats?.total || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: '#6C63FF',
      bgColor: '#EEF2FF',
      trend: null,
    },
    {
      label: 'In Progress',
      value: stats?.inProgress || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: '#3B82F6',
      bgColor: '#DBEAFE',
      trend: null,
    },
    {
      label: 'Completed',
      value: stats?.completed || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#10B981',
      bgColor: '#D1FAE5',
      trend: '+12%',
    },
    {
      label: 'Overdue',
      value: stats?.overdue || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: '#EF4444',
      bgColor: '#FEE2E2',
      trend: null,
    },
  ];

  return (
    <div className="kpi-stats-grid">
      {kpiData.map((kpi, index) => (
        <div key={index} className="kpi-stat-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-wrapper" style={{ 
              backgroundColor: kpi.bgColor,
              color: kpi.color 
            }}>
              {kpi.icon}
            </div>
            {kpi.trend && (
              <span className="kpi-trend positive">{kpi.trend}</span>
            )}
          </div>
          <div className="kpi-card-body">
            <div className="kpi-label-text">{kpi.label}</div>
            <div className="kpi-value-text" style={{ color: kpi.color }}>
              {kpi.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIStats;
