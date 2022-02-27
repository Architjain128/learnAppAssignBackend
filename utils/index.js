const roundInfo = {
  no: 0,
  totalEvents: 0,
  totalQuantity: 0,
  totalPrice: 0
};

export const startNewRound = (data) => {
  // noting to publish for first event
  roundInfo.no && log();
  resetRound(data.T);
  addToRound(data);
};

export const addToRound = (data) => {
  roundInfo.totalEvents += 1;
  roundInfo.totalQuantity += data.q * 1;
  roundInfo.totalPrice += data.p * 1;
};

// resets round info object for new bucket
const resetRound = (epoch) => {
  roundInfo.no += 1;
  roundInfo.totalEvents = 0;
  roundInfo.startTime = new Date(epoch).toISOString();
  roundInfo.totalQuantity = 0;
  roundInfo.totalPrice = 0;
}

const log = () => {
  roundInfo.averagePrice = roundInfo.totalPrice / roundInfo.totalQuantity;
  console.log(`no: ${roundInfo.no} | totalEvents: ${roundInfo.totalEvents} | startTime: ${roundInfo.startTime} | totalQuantity: ${roundInfo.totalQuantity} | averagePrice: ${roundInfo.averagePrice}\n`);
}