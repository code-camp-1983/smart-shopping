function Receipt({ data }) {
  if (!data) {
    return null;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.line_items.map((item) => {
          return (
            <tr>
              <td>{item.description}</td>
              <td className="has-text-centered">{item.quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Receipt;