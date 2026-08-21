export function CustomerTableSkeleton() {
  const rows = Array.from({ length: 6 });

  return (
    <div
      className="customer-table-wrapper"
      aria-label="Loading customers"
      aria-busy="true"
    >
      <table className="customer-table">
        <thead>
          <tr>   
            <th>Business</th>
            <th>Contact Person</th>
            <th>Contact Details</th>
            <th>Type</th>
            <th>Industry</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((_, index) => (
            <tr key={index}>
              <td>
                <div className="skeleton-business">
                  <div className="skeleton skeleton-avatar" />

                  <div className="skeleton-text-group">
                    <div className="skeleton skeleton-business-name" />
                    <div className="skeleton skeleton-small" />
                  </div>
                </div>
              </td>

              <td>
                <div className="skeleton skeleton-contact" />
              </td>

              <td>
                <div className="skeleton-contact-details">
                  <div className="skeleton skeleton-email" />
                  <div className="skeleton skeleton-phone" />
                </div>
              </td>

              <td>
                <div className="skeleton skeleton-type" />
              </td>

              <td>
                <div className="skeleton skeleton-industry" />
              </td>

              <td>
                <div className="skeleton skeleton-status" />
              </td>

              <td>
                <div className="skeleton skeleton-date" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}