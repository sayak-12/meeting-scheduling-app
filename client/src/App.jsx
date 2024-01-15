import './App.css'
import { useState, useEffect } from 'react'
import daysinmonth from './assets/datemonth';
import dayofyear from './assets/dayofyear';
import axios from "axios"
function App() {
  const currentMonth = new Date().getMonth() +1;
  var currentDay = new Date().getDate();
  const [month, setMonth] = useState();
  const [meetTime, setmeetTime] = useState();
  const [meetDate, setmeetDate] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [urli, setUrli] = useState(null);
  const [index, setIndex] = useState(null);
  const [table, setTable] = useState(false);
  const [submit, setSubmit] = useState(false);
  useEffect(()=>{
    if (meetDate && meetTime) {
      setError(null);
      var url = `Sheet1!${meetTime}${meetDate}`;
      setUrli(url)
      console.log(url);
      axios.post("http://localhost:3000/", {url: url}).then((data)=>{
        if (data.data.data.values) {
          setError("Slot Already Occupied");
        }
      })
    }
  }, [meetDate, meetTime])
  useEffect(()=>{
    axios.post("http://localhost:3000/", {url: "Sheet1!A:L"}).then((data)=>{
        if (data.data.data.values) {
          setIndex(data.data.data.values);
        }
      })
  },[submit])
  const isMonthPassed = (month) => {
    return month < currentMonth;
  };
  const isMonthComing = (month) => {
    return month > currentMonth;
  };
  const handleMonthchange = (event) => {
    const selectedMonth = event.target.selectedIndex;
    const daysInSelectedMonth = daysinmonth()[selectedMonth -1];
    if (isMonthComing(selectedMonth)) {
      currentDay = 1;
    }
    document.getElementById('meetDate').classList.remove('inactive');
    const meetDateSelect = document.querySelector('.daypicker');
    meetDateSelect.innerHTML = '';
    for (let day = currentDay; day <= daysInSelectedMonth; day++) {
      const option = document.createElement('option');
      option.value = day;
      option.textContent = day;
      meetDateSelect.appendChild(option);
    }
    setMonth(selectedMonth);
  };
  const handleDateChange=(event)=>{
    const selectedDayIndex = event.target.selectedIndex;
    const selectedDay = event.target.options[selectedDayIndex].text;
    const dayyear = dayofyear(2024, month, selectedDay);
    setmeetDate(dayyear);
  }
  const handleTimeChange=(event)=>{
    const selectedTimeIndex = event.target.selectedIndex;
    const selectedTime = event.target.options[selectedTimeIndex].value;
    setmeetTime(selectedTime);
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    setError(null);
    setSuccess(null);
    var meetfor = document.getElementById("meetFor").value;
    var meetby = document.getElementById("meetBy").value;
    var topic = `${meetfor} - ${meetby}`;
    console.log(topic);
    if (!error) {
      axios.post("http://localhost:3000/submit", {url:urli, topic:topic}).then((data)=>{
        setSuccess("Data Successfully Submitted : "+topic)
        setSubmit(true)
      }).catch((err)=>console.log(err))
    }
  }
  const handletableshow = ()=>{
    setTable(!table)
  }
  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit}>
        <label htmlFor="meetFor">
          Enter Meeting Subject
          <input type="text"  id='meetFor' required/>
        </label><br />
        <label htmlFor="meetBy">
          Enter Meeting Host Name
          <input type="text"  id='meetBy' required/>
        </label><br />
        <label htmlFor="meetTime">
          Select Meeting Time
          <select name="" id="meetTime" onChange={handleTimeChange}>
            <option value="">Select Time</option>
            <option value="D">10 AM to 11 AM</option>
            <option value="E">11 AM to 12 PM</option>
            <option value="F">12 PM to 01 PM</option>
            <option value="G">01 PM to 02 PM</option>
            <option value="H">02 PM to 03 PM</option>
            <option value="I">03 PM to 04 PM</option>
            <option value="J">04 PM to 05 PM</option>
            <option value="K">05 PM to 06 PM</option>
            <option value="L">06 PM to 07 PM</option>
          </select>
        </label><br />
        <label htmlFor="meetDate">
          Enter Meeting Date
          <select name=""  id="" className='date monthpicker' onChange={handleMonthchange}>
          <option value="" className='disabled'>Select month</option>
            <option value="" className={isMonthPassed(1) ? 'disabled' : ''}>january</option>
            <option value="" className={isMonthPassed(2) ? 'disabled' : ''}>february</option>
            <option value="" className={isMonthPassed(3) ? 'disabled' : ''}>march</option>
            <option value="" className={isMonthPassed(4) ? 'disabled' : ''}>april</option>
            <option value="" className={isMonthPassed(5) ? 'disabled' : ''}>may</option>
            <option value="" className={isMonthPassed(6) ? 'disabled' : ''}>june</option>
            <option value="" className={isMonthPassed(7) ? 'disabled' : ''}>july</option>
            <option value="" className={isMonthPassed(8) ? 'disabled' : ''}>august</option>
            <option value="" className={isMonthPassed(9) ? 'disabled' : ''}>september</option>
            <option value="" className={isMonthPassed(10) ? 'disabled' : ''}>october</option>
            <option value="" className={isMonthPassed(11) ? 'disabled' : ''}>november</option>
            <option value="" className={isMonthPassed(12) ? 'disabled' : ''}>december</option>
          </select>
          <select name=""  id="meetDate" className='date daypicker inactive'  onChange={handleDateChange}>
            <option value="">Select date</option>
          </select>
        </label><br />
        {error ? (<p className='error'>{error}</p>): ""}
        {success ? (<p className='success'>{success}</p>): ""}
        <button type="submit">Schedule Meeting</button>

      </form>
    <button onClick={handletableshow}>
      {table ? "Hide Table":"Show Table"}
    </button>
      {table && index ? (
    <table>
        <tbody>
  {index.map((ind, index) => (
    <tr key={index}>
      {ind.map((inds) => (
        <td key={`${Math.floor(Math.random() * 100000)}_${inds}`}>{inds}</td>
      ))}
    </tr>
  ))}
</tbody>

    </table>
) : ""}
    </>
  )
}

export default App
