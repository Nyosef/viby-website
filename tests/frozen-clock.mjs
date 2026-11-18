const frozenTime = process.env.VIBY_FROZEN_NOW;

if (frozenTime) {
  const RealDate = Date;
  const timestamp = new RealDate(frozenTime).getTime();
  if (!Number.isFinite(timestamp)) throw new Error(`Invalid VIBY_FROZEN_NOW: ${frozenTime}`);

  globalThis.Date = class FrozenDate extends RealDate {
    constructor(...args) {
      super(...(args.length ? args : [timestamp]));
    }

    static now() {
      return timestamp;
    }
  };
}
