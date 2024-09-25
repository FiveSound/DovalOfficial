type Result = { userID: string; follow: boolean };
type OldData = any[];

const mutate = (oldData: OldData, result: Result) => {
  return oldData.map((row) => {
    if (result.userID === row.userID) {
      return {
        ...row,
        following: result.follow ? 1 : 0,
      };
    }
    return row;
  });
};

export default mutate;