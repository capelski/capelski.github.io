import React from 'react';

interface Day {
    number: number;
    isOddMonth: boolean;
}

interface Month {
    days: number[];
    name: string;
    weeks: number;
}

const getNumbers = (length: number) =>
    ' '
        .repeat(length)
        .split('')
        .map((_, i) => i + 1);

const getDays = (months: Month[]) =>
    months.reduce<Day[]>((_reduced, next, index) => {
        const days = next.days.map((day) => ({ number: day, isOddMonth: index % 2 === 0 }));
        return _reduced.concat(days);
    }, []);

const getYearWeeks = (months: Month[]) => {
    const yearDays = getDays(months);
    const yearWeeks = [];
    for (let i = 0; i < yearDays.length; i += 7) {
        yearWeeks.push(yearDays.slice(i, i + 7));
    }
    return yearWeeks;
};

interface YearBaseProps {
    onDayClick: (day: number) => void;
    selectedDay: number;
}

interface YearProps extends YearBaseProps {
    months: Month[];
    weeks: Day[][];
}

const dayBorder = '1px solid black';
const dayHeight = 50;
const oddMonthColor = '#ddd8e4';
const selectedDayColor = '#fed136'; // Keep in sync with variables.scss $primaryColor

const Year: React.FC<YearProps> = (props) => (
    <div className="year" style={{ display: 'flex', marginTop: 20 }}>
        <div className="months" style={{ display: 'flex', flexDirection: 'column', width: '10%' }}>
            {props.months.map((month, monthIndex) => (
                <div
                    key={monthIndex}
                    className="month"
                    style={{
                        backgroundColor: monthIndex % 2 === 0 ? oddMonthColor : undefined,
                        borderBottom: dayBorder,
                        borderLeft: dayBorder,
                        borderTop: monthIndex === 0 ? dayBorder : undefined,
                        boxSizing: 'border-box',
                        height: month.weeks * dayHeight
                    }}
                >
                    <div
                        className="name"
                        style={{
                            height: '100%',
                            margin: 'auto',
                            textAlign: 'center',
                            writingMode: 'vertical-rl'
                        }}
                    >
                        {month.name}
                    </div>
                </div>
            ))}
        </div>
        <div className="weeks" style={{ width: '90%' }}>
            {props.weeks.map((week, weekIndex) => (
                <div
                    key={weekIndex}
                    className="week"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    {week.map((day, dayIndex) => {
                        const dayKey = weekIndex * 7 + dayIndex;
                        const isSelected = props.selectedDay === dayKey;

                        return (
                            <div
                                key={dayKey}
                                className="day"
                                onClick={() => props.onDayClick(dayKey)}
                                style={{
                                    backgroundColor: isSelected
                                        ? selectedDayColor
                                        : day.isOddMonth
                                          ? oddMonthColor
                                          : undefined,
                                    borderBottom: dayBorder,
                                    borderLeft: dayBorder,
                                    borderRight:
                                        dayIndex === week.length - 1 ? dayBorder : undefined,
                                    borderTop: weekIndex === 0 ? dayBorder : undefined,
                                    boxSizing: 'border-box',
                                    cursor: 'pointer',
                                    height: dayHeight,
                                    lineHeight: '20px',
                                    padding: '15px 0',
                                    textAlign: 'center',
                                    width: '14.28%'
                                }}
                            >
                                {day.number}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    </div>
);

const conventionalMonths: Month[] = [
    {
        days: getNumbers(31),
        name: 'January',
        weeks: 5
    },
    {
        days: getNumbers(28),
        name: 'February',
        weeks: 4
    },
    {
        days: getNumbers(31),
        name: 'March',
        weeks: 4
    },
    {
        days: getNumbers(30),
        name: 'April',
        weeks: 5
    },
    {
        days: getNumbers(31),
        name: 'May',
        weeks: 4
    },
    {
        days: getNumbers(30),
        name: 'June',
        weeks: 4
    },
    {
        days: getNumbers(31),
        name: 'July',
        weeks: 5
    },
    {
        days: getNumbers(31),
        name: 'August',
        weeks: 4
    },
    {
        days: getNumbers(30),
        name: 'September',
        weeks: 4
    },
    {
        days: getNumbers(31),
        name: 'October',
        weeks: 5
    },
    {
        days: getNumbers(30),
        name: 'November',
        weeks: 4
    },
    {
        days: getNumbers(31),
        name: 'December',
        weeks: 5
    }
];

export const ConventionalYear: React.FC<YearBaseProps> = (props) => (
    <Year {...props} months={conventionalMonths} weeks={getYearWeeks(conventionalMonths)} />
);

export const TrecemberYear: React.FC<YearBaseProps> = (props) => {
    const trecemberMonths: Month[] = conventionalMonths
        .map((m) => ({ days: getNumbers(28), name: m.name, weeks: 4 }))
        .concat({ days: getNumbers(29), name: 'Trecember', weeks: 5 });

    return <Year {...props} months={trecemberMonths} weeks={getYearWeeks(trecemberMonths)} />;
};
