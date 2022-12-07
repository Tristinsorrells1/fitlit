class Sleep {
  constructor(sleepData){
     this.sleepData = sleepData;
 }
  findSleepAvrg(id) {
   const getUserSleepInfo = this.sleepData.filter((data) => {
     return data.userID === id;
     })
     const calculateAvrgSleep = getUserSleepInfo.reduce((accum, data) => {
     return accum += data.hoursSlept;
     }, 0) / getUserSleepInfo.length;
     return parseInt(calculateAvrgSleep.toFixed(1)) 
 }
  findSleepQualityAvrg(id) {
   const getUserSleepQualityInfo = this.sleepData.filter(data => data.userID === id)
     const calculateAvrgSleepQuality = getUserSleepQualityInfo.reduce((accum, data) => {
     return accum += data.sleepQuality;
     }, 0) / getUserSleepQualityInfo.length;
     return parseInt(calculateAvrgSleepQuality.toFixed(1)) 
 }

 findHoursSleptByDay(id, day) {
     const getDailySleep = this.sleepData.filter(data => data.date === day) 
     const findUserSleepOnDate = getDailySleep.find((data) => {
      return data.userID === id;
     }) 
     return findUserSleepOnDate.hoursSlept;
 }

 findSleepQualityByDay(id, day) {
     const getDailySleepQuality = this.sleepData.filter(data => data.date === day) 
     const findUserSleepQualityOnDate = getDailySleepQuality.find((data) => {
      return data.userID === id;
     }) 
     return findUserSleepQualityOnDate.sleepQuality;
 }

 findWeeklySleepHours(id) {
   const sleepUserIdInfo = this.sleepData.filter((data) => {
     return data.userID === id;
     }) 
     const weeklySleep = () => {
     let sleepByDay = {}
     sleepByDay.dayOne = sleepUserIdInfo[0].hoursSlept;
     sleepByDay.dayTwo = sleepUserIdInfo[1].hoursSlept;
     sleepByDay.dayThree = sleepUserIdInfo[2].hoursSlept;
     sleepByDay.dayFour = sleepUserIdInfo[3].hoursSlept;
     sleepByDay.dayFive = sleepUserIdInfo[4].hoursSlept;
     sleepByDay.daySix = sleepUserIdInfo[5].hoursSlept;
     sleepByDay.daySeven = sleepUserIdInfo[6].hoursSlept;
     return sleepByDay;
     };
     return weeklySleep(); 
 } 
 findWeeklySleepQuality(id) {
  const sleepQualityUserIdInfo = this.sleepData.filter((data) => {
     return data.userID === id;
     }) 
     const weeklySleepQuality = () => {
     let sleepQualityByDay = {}
     sleepQualityByDay.dayOne = sleepQualityUserIdInfo[0].sleepQuality;
     sleepQualityByDay.dayTwo = sleepQualityUserIdInfo[1].sleepQuality;
     sleepQualityByDay.dayThree = sleepQualityUserIdInfo[2].sleepQuality;
     sleepQualityByDay.dayFour = sleepQualityUserIdInfo[3].sleepQuality;
     sleepQualityByDay.dayFive = sleepQualityUserIdInfo[4].sleepQuality;
     sleepQualityByDay.daySix = sleepQualityUserIdInfo[5].sleepQuality;
     sleepQualityByDay.daySeven = sleepQualityUserIdInfo[6].sleepQuality;
     return sleepQualityByDay;
     };
     return weeklySleepQuality(); 
 }
 findAllUserSleepQuality(data) {
  const calculateAvrgSleepQltyForAll =
     this.sleepData.reduce((accum, data) => {
               return (accum += data.sleepQuality);
          }, 0) / data.length;
     return parseInt(calculateAvrgSleepQltyForAll.toFixed(1));
 }
};

export default Sleep;