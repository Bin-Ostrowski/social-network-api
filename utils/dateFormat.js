// createdAt: {
//     type: Date,
//     default: Date.now,
//     //getters to transform data using utils function dateFormat
//     // get: (createdAtVal) => dateFormat(createdAtVal), - this was the original code from module that had bugs with 0
//     get: (createdAtVal) => {
//       console.log(new Date(createdAtVal).getTime());
//       return Intl.DateTimeFormat("en-us", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         // timeStyle: "long",
//       }).format(new Date(createdAtVal).getTime());
//     },
//   },