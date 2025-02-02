const log = console.log;
console.log = (...args)=>{};

const allowedLogs = [
    "✅ Database connected successfully", 
    "✅ Your server is up and running...", 
];

export const logger = (...args)=>{
    if(allowedLogs.some((msg=> args.includes(msg)))){
        log(...args);
    }
}