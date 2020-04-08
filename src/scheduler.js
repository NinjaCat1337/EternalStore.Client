const scheduler = Object.freeze({
    daysOfWeek() {
        return [
            { id: 1, value: "Monday" },
            { id: 2, value: "Thursday" },
            { id: 3, value: "Wednesday" },
            { id: 4, value: "Tuesday" },
            { id: 5, value: "Friday" },
            { id: 6, value: "Saturday" },
            { id: 7, value: "Sunday" }
        ];
    },
    executionFrequencies() {
        return [
            { id: 1, value: "Daily" },
            { id: 2, value: "Weekly" }
        ];
    }
});

export default scheduler;
