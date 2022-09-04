function dateFormat() {
    // console.log(new Date().getTime());
    //"en-us" is enligh in US so it will use AM and PM
    return Intl.DateTimeFormat("en-us", {
        //month: Jan - use "long" for January 
        month: "short",
        // day: 01
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
       }).format(new Date().getTime());
};
    
module.exports = (dateFormat);