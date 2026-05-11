'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Tester = {
  id: string;
  name: string;
  certificateNumber: string;
  certificateBody: string;
  examProvider: string;
  certification: string;
  countryOfIssue: string;
  certificationDate: string;
  createdAt: string;
};

export default function CertifiedTestersPage() {
  const [testers, setTesters] = useState<Tester[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const disablePagination = searchTerm !== '' && testers.length === 0;

  const fetchTesters = async () => {
    setLoading(true);
    try {
      const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';
      const res = await fetch(`/api/certified-testers?page=${page}&limit=20${searchParam}`);
      const data = await res.json();

      if (res.ok) {
        setTesters(data.data);
        setTotalPages(data.totalPages);
      } else {
        toast.error(data.error || 'Failed to fetch testers');
      }
    } catch (error) {
      toast.error('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTesters();
  }, [page, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTesters();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: '#FAFAFA',
        minHeight: '100vh',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

        :root {
          --crimson: #8B1A1A;
          --crimson-deep: #6B1414;
          --crimson-light: #F5EDED;
          --crimson-muted: #C0524A;
          --white: #FFFFFF;
          --off-white: #FAFAFA;
          --border: #EDEDED;
          --text-primary: #1A1A1A;
          --text-secondary: #6B6B6B;
          --text-muted: #9B9B9B;
        }

        .page-wrapper {
          max-width: 1280px;
          margin: 0 auto;
          padding: 48px 32px;
        }

        /* Header */
        .header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border);
        }

        .header-left {}

        .header-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--crimson);
          margin-bottom: 8px;
        }

        .header-title {
          font-family: ;
          font-size: 36px;
          font-weight: 500;
          
          color: var(--text-primary);
          line-height: 1.1;
          margin: 0 0 8px 0;
        }

        .header-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 400;
          margin: 0;
        }

        .header-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: var(--crimson-light);
          border: 1px solid rgba(139,26,26,0.15);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          color: var(--crimson);
          white-space: nowrap;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: var(--crimson);
          border-radius: 50%;
        }

        /* Search */
        .search-row {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
        }

        .search-input-wrap {
          flex: 1;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 100%;
          padding: 10px 14px 10px 40px;
          font-size: 14px;
          font-family: inherit;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 8px;
          outline: none;
          color: var(--text-primary);
          box-sizing: border-box;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .search-input:focus {
          border-color: var(--crimson);
          box-shadow: 0 0 0 3px rgba(139,26,26,0.08);
        }

        .btn-search {
          padding: 10px 22px;
          background: var(--crimson);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }

        .btn-search:hover {
          background: var(--crimson-deep);
        }

        .btn-clear {
          padding: 10px 18px;
          background: var(--white);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
          white-space: nowrap;
        }

        .btn-clear:hover {
          border-color: var(--crimson);
          color: var(--crimson);
        }

        /* Table card */
        .table-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .table-scroll {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead tr {
          background: var(--white);
          border-bottom: 2px solid var(--crimson-light);
        }

        th {
          padding: 14px 20px;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--crimson);
          white-space: nowrap;
        }

        td {
          padding: 14px 20px;
          font-size: 14px;
          color: var(--text-primary);
          vertical-align: middle;
        }

        tbody tr {
          border-bottom: 1px solid var(--border);
          transition: background 0.1s;
        }

        tbody tr:last-child {
          border-bottom: none;
        }

        tbody tr:hover {
          background: #FDFAFA;
        }

        .td-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .td-cert-no {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 12.5px;
          color: var(--crimson);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .td-secondary {
          color: var(--text-secondary);
          font-size: 13.5px;
        }

        .cert-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          // background: ;
          // border: 1px solid rgba(139,26,26,0.15);
          border-radius: 20px;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--crimson);
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .td-date {
          color: var(--text-secondary);
          font-size: 13px;
          white-space: nowrap;
        }

        /* Empty / Loading */
        .state-cell {
          padding: 60px 20px;
          text-align: center;
        }

        .spinner {
          width: 28px;
          height: 28px;
          border: 2px solid var(--border);
          border-top-color: var(--crimson);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin: 0 auto 12px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .state-text {
          font-size: 14px;
          color: var(--text-muted);
        }

        /* Pagination */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          background: var(--white);
          flex-wrap: wrap;
          gap: 12px;
        }

        .pagination-info {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .pagination-info strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .search-label {
          color: var(--crimson);
          font-weight: 500;
        }

        .pagination-controls {
          display: flex;
          gap: 6px;
        }

        .btn-page {
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          font-family: inherit;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.15s;
          border: 1px solid var(--border);
          background: var(--white);
          color: var(--text-primary);
        }

        .btn-page:hover:not(:disabled) {
          border-color: var(--crimson);
          color: var(--crimson);
        }

        .btn-page:disabled {
          background: var(--off-white);
          color: var(--text-muted);
          cursor: not-allowed;
          border-color: var(--border);
        }

        @media (max-width: 640px) {
          .page-wrapper { padding: 24px 16px; }
          .header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .header-title { font-size: 40px; }
          .search-row { flex-direction: column; }
        }
      `}</style>

      <div className="page-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <p className="header-eyebrow">ISTQB® Registry</p>
            <h1 className="header-title font-bold ">Certified Testers</h1>
            <p className="header-subtitle">
              Verified professionals with internationally recognised software testing certifications
            </p>
          </div>
          {/* <div className="header-badge">
            <span className="badge-dot" />
            Verified Registry
          </div> */}
        </div>

        {/* Search */}
        <form className="search-row" onSubmit={handleSearch}>
          <div className="search-input-wrap">
            <span className="search-icon">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              className="search-input"
              type="text"
              placeholder="Search by name, certificate number, certification, or country…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-search" type="submit">Search</button>
          {searchTerm && (
            <button className="btn-clear" type="button" onClick={clearSearch}>Clear</button>
          )}
        </form>

        {/* Table */}
        <div className="table-card">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Certificate No.</th>
                  <th>Certifying Body</th>
                  <th>Exam Provider</th>
                  <th>Certification</th>
                  <th>Country</th>
                  <th>Certified On</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="state-cell">
                        <div className="spinner" />
                        <p className="state-text">Loading certified testers…</p>
                      </div>
                    </td>
                  </tr>
                ) : testers.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="state-cell">
                        <p className="state-text">
                          {searchTerm ? 'No testers found matching your search.' : 'No certified testers found.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  testers.map((tester) => (
                    <tr key={tester.id}>
                      <td className="td-name">{tester.name}</td>
                      <td className="td-cert-no">{tester.certificateNumber}</td>
                      <td className="td-secondary">{tester.certificateBody}</td>
                      <td className="td-secondary">{tester.examProvider}</td>
                      <td>
                        <span className="cert-badge">{tester.certification}</span>
                      </td>
                      <td className="td-secondary">{tester.countryOfIssue}</td>
                      <td className="td-date">
                        {new Date(tester.certificationDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <span className="pagination-info">
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              {searchTerm && (
                <span> — results for <span className="search-label">"{searchTerm}"</span></span>
              )}
            </span>
            <div className="pagination-controls">
              <button
                className="btn-page"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1 || disablePagination}
              >
                ← Previous
              </button>
              <button
                className="btn-page"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages || disablePagination}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}