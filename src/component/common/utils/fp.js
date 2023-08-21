export function h0(timestamp = Date.now()) {
    const target = new Date(timestamp); // 將時間戳轉換為國際時間
    target.setHours(0);
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);
    
    return target.getTime(); // 當前時間算至毫秒數的時間戳
} 
