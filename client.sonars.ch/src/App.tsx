import { useState } from "react";

import "./App.css";

function App() {
  const [autonomy, setAutonomy] = useState(0);
  const [selectedMake, setSelectedMake] = useState("");

  const fetchCarAutonomy = async (make: string) => {
    try {
      const response = await fetch(
        `https://zamgpilluc.execute-api.us-east-1.amazonaws.com/dev/api/cars/${make}`
      );
      const data = await response.json();

      setAutonomy(data.autonomy);
      setSelectedMake(data.make);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      {selectedMake ? (
        <>
          <h1>Autonomy</h1>
          <div className="card">
            <p>
              {selectedMake} has {autonomy} as its autonomy
            </p>
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
