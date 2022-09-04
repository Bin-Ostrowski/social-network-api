function dateFormat() {
    console.log(new Date().getTime());
    return Intl.DateTimeFormat("en-us", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
       }).format(new Date().getTime());
};
    
module.exports = (dateFormat);