// Mock API without axios (temporary)

export const getLiveMatches = async () => {
  return [
    { id: 1, teamA: 'Tigers', teamB: 'Lions', scoreA: 145, scoreB: 130, status: 'Live' },
    { id: 2, teamA: 'Falcons', teamB: 'Eagles', scoreA: 200, scoreB: 198, status: 'Live' },
  ];
};

export const getUpcomingFixtures = async () => {
  return [
    { id: 3, teamA: 'Wolves', teamB: 'Bulls', date: '2025-05-20' },
    { id: 4, teamA: 'Dragons', teamB: 'Knights', date: '2025-05-22' },
  ];
};

export const bookTicket = async (matchId, seatId) => {
  return { success: true, matchId, seatId };
};

export const getSeatingChart = async (matchId) => {
  return {
    VIP: [{ id: 'vip1', booked: false }, { id: 'vip2', booked: true }],
    General: [{ id: 'gen1', booked: false }, { id: 'gen2', booked: false }]
  };
};

export const updateScore = async (matchId, scoreData) => {
  return { success: true, matchId, ...scoreData };
};

export const createFixture = async (data) => {
  return { success: true, fixture: data };
};
