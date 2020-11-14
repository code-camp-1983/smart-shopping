import React, { useRef, useState } from "react";
import axios from "axios";

function App() {
  const config = {
    headers: {
      AUTHORIZATION: `apiKey ${process.env.REACT_APP_VERIFY_USERNAME}:${process.env.REACT_APP_VERIFY_API_KEY}`,
      "CLIENT-ID": process.env.REACT_APP_VERYFI_CLIENT_ID,
    },
  };

  console.log(config);

  const [file, setFile] = useState(""); // storing the uploaded file    // storing the recived file from backend
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState(null);
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element

  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accessing file
    console.log(file);
    setFile(file); // storing file
  };

  const uploadFile = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const formData = new FormData();
    formData.append("file", file); // appending file
    axios
      .post("/api/v7/partner/documents/", formData, {
        onUploadProgress: (ProgressEvent) => {
          const progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) + "%";
          setProgess(progress);
        },
        ...config,
      })
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setIsSubmit(false);
      });
  };

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column">
              <form className="form">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">File</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input className="input" type="file" ref={el} onChange={handleChange} />{" "}
                      </div>
                    </div>
                  </div>
                </div>
                {isSubmit && (
                  <div className="field">
                    <div className="control">
                      <progress className="progress" value={progress} max="100">
                        {progress}%
                      </progress>
                    </div>
                  </div>
                )}
                <div className="field">
                  <div className="control has-text-centered">
                    <button
                      onClick={uploadFile}
                      className={"button is-primary" + (isSubmit ? " is-loading" : "")}
                      disabled={!file}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="column">
              <PlaceholderBox isSubmit={isSubmit} data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlaceholderBox({ data, isSubmit }) {
  return (
    <div
      className="box"
      style={{ minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {!data && <div>Results here</div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}

export default App;
