const log = console.log;
// console.log = (...args)=>{};

const allowedLogs = [
    "✅ Database connected successfully", 
    "✅ Your server is up and running...",
    "✅ Your server is up and running on PORT 4000", 
    "🔌 New client connected: "
];

export const logger = (...args)=>{
    if(allowedLogs.some((msg=> args.includes(msg)))){
        log(...args);
    }
}