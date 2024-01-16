const DateinMonth = () => {
    const currentYear = new Date().getFullYear();
const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);

const febday = isLeapYear ? 29 : 28;
    return [31,
        febday,
         31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31]
        
      ;
}
 
export default DateinMonth;