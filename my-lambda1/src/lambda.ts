export const handler = async (event: any) => {
  console.log("we got an event IN LAMBDA 1:");
  console.log(event);

  return {
    locations: [
      { country: "finland" },
      { country: "sweden" },
      { country: "norway" },
    ],
  };
};
