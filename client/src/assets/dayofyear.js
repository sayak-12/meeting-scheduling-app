const dayofyear = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    const startTime = new Date(year, 0, 1).getTime();
    const timeDifference = date.getTime() - startTime;
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000)) + 1;
    return days+1;
}
 
export default dayofyear;