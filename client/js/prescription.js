export const requestpresc = async (doctor, prescription, furtherInfo) => {
    const url = "http://127.0.0.1:3000/api/prescriptions/request";
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doctor, prescription, furtherInfo }),
    });
  
    const data = await res.json();
  
    return data;
  };
  