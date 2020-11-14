import Receipt from "./Receipt";

function ResultBox({ response, isSubmit }) {
  return (
    <div
      className="box"
      style={{ minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {!response && <div>Results here</div>}
      {response && <Receipt data={response.data} />}
    </div>
  );
}

export default ResultBox;
