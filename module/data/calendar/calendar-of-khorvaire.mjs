import CalendarData5e from "./calendar-data.mjs";

/**
 * Extension of the core calendar with support for extra formatters.
 */
export class CalendarKhorvaire extends CalendarData5e {

  /* -------------------------------------------- */
  /*  Formatter Functions                         */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static formatMonthDay(calendar, components, options) {
    return CalendarKhorvaire.formatLocalized(
      "NIH.CALENDAR.Khorvaire.Formatters.DayMonth", calendar, components, options
    );
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  static formatMonthDayYear(calendar, components, options) {
    return CalendarKhorvaire.formatLocalized(
      "NIH.CALENDAR.Khorvaire.Formatters.DayMonthYear", calendar, components, options
    );
  }
}

/* -------------------------------------------- */

export const CALENDAR_OF_KHORVAIRE = {
  name: "Common Calendar of Khorvaire",
  years: {
    yearZero: 998,
    firstWeekday: 0
  },
  months: {
    values: [
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Zarantyr",
        ordinal: 1, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Olarune",
        ordinal: 2, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Therendor",
        ordinal: 3, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Eyre",
        ordinal: 4, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Dravago",
        ordinal: 5, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Nymm",
        ordinal: 6, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Lharvion",
        ordinal: 7, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Barrakas",
        ordinal: 8, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Rhaan",
        ordinal: 9, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Sypheros",
        ordinal: 10, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Aryth",
        ordinal: 11, days: 28
      },
      {
        name: "NIH.CALENDAR.Khorvaire.Month.Vult",
        ordinal: 12, days: 28
      }
    ]
  },
  days: {
    values: [
      { name: "NIH.CALENDAR.Khorvaire.Day.Sul", ordinal: 1 },
      { name: "NIH.CALENDAR.Khorvaire.Day.Mol", ordinal: 2 },
      { name: "NIH.CALENDAR.Khorvaire.Day.Zol", ordinal: 3 },
      { name: "NIH.CALENDAR.Khorvaire.Day.Wir", ordinal: 4 },
      { name: "NIH.CALENDAR.Khorvaire.Day.Zor", ordinal: 5 },
      { name: "NIH.CALENDAR.Khorvaire.Day.Far", ordinal: 6 },
      { name: "NIH.CALENDAR.Khorvaire.Day.Sar", ordinal: 7 }
    ],
    daysPerYear: 336,
    hoursPerDay: 24,
    minutesPerHour: 60,
    secondsPerMinute: 60
  },
  seasons: {
    values: [
      { name: "NIH.CALENDAR.Khorvaire.Season.Spring", monthStart: 3,  monthEnd: 5 }, // Therendor–Dravago
      { name: "NIH.CALENDAR.Khorvaire.Season.Summer", monthStart: 6, monthEnd: 8 }, // Nymm–Barrakas
      { name: "NIH.CALENDAR.Khorvaire.Season.Autumn", monthStart: 9, monthEnd: 11 }, // Rhaan–Aryth
      { name: "NIH.CALENDAR.Khorvaire.Season.Winter", monthStart: 12, monthEnd: 2 } // Vult–Olarune
    ]
  }
};
