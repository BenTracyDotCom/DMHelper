//all new actions will be in 'features' slices

export const increment = () => {
  return {
    type: 'COUNT_INCRESE',
  };
};

export const decrement = () => {
  return {
    type: 'COUNT_DECRESE',
  };
};