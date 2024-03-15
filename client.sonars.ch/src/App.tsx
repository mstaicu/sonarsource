import { useState } from "react";

import "./App.css";

function App() {
  const [autonomy, setAutonomy] = useState(0);
  const [selectedMake, setSelectedMake] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchCarAutonomy = async (make: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://zamgpilluc.execute-api.us-east-1.amazonaws.com/dev/api/cars/${make}`
      );
      const data = await response.json();

      setAutonomy(data.autonomy);
      setSelectedMake(data.make);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    fetchCarAutonomy(selectedValue);
  };

  return (
    <>
      <div>
        <select onChange={handleSelectChange}>
          <option value="TESLA">Tesla</option>
          <option value="RIVIAN">Rivian</option>
          <option value="LUCID">Lucid</option>
        </select>
      </div>

      <div>
        <h1>{loading ? "Loading autonomy" : "Autonomy"}</h1>
        {selectedMake ? (
          <div className="card">
            <p>
              {selectedMake} has {autonomy} as its autonomy
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
