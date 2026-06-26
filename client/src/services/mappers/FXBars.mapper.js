const FXBarsMapper = (bars) => {
  return bars.map(({ v, c, h, t, o, l }) => ({
    volume: v,
    close: c,
    high: h,
    timestamp: t,
    open: o,
    low: l,
  }));
};

export default FXBarsMapper;
