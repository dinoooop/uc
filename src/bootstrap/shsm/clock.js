// The class based on 'Y-m-d' (dateStr)
export class clock {

    static age(dob, fullAge = false) {

        if (!dob) {
            return ''
        }
        const birthDate = new Date(dob);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // Adjust months and years if days are negative
        if (days < 0) {
            months--;
            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += previousMonth.getDate();
        }

        // Adjust years if months are negative
        if (months < 0) {
            years--;
            months += 12;
        }

        if (fullAge) {
            return `${years} years ${months} months ${days} days`;
        } else {
            return years;
        }

    }

    static pad(n) {
        return n < 10 ? '0' + n : n;
    }

    static getYmd(dateObj = null) {
        const date = new Date(dateObj);
        return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}`;
    }


    // datestr => Sat May 03 2025 10:12:34 GMT+0530
    // Get 2025-05-03 09:55:07 format
    static getYmdhisFormat(datestr, dateOnly = false) {

        let date = '';

        if (['now', 'today'].includes(datestr)) {
            date = new Date();
        } else {
            date = new Date(datestr);
        }

        const pad = this.pad;

        if (datestr == 'today') {
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 00:00:00`;
        }

        const formatted = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
            `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

        return formatted;
    }

    static now() {
        return this.getYmdhisFormat('now')
    }

    static today() {
        const date = new Date();
        return this.getYmd(date);
    }

    static tommorrow() {
        const date = new Date();
        const tomorrow = this.addNumToDate(date, 1);
        return this.getYmd(tomorrow);
    }

    static year(dateStr) {
        if (dateStr) {
            const date = new Date(dateStr);
            return date.getFullYear();
        }
        return new Date().getFullYear();
    }

    static month(dateStr) {
        if (dateStr) {
            const date = new Date(dateStr);
            return date.getMonth() + 1;
        }
        return new Date().getMonth() + 1;
    }

    static day(dateStr) {
        if (dateStr) {
            const date = new Date(dateStr);
            return date.getDate();
        }
    }

    static addNumToDate(dateStr, num) {
        const date = new Date(dateStr);
        date.setDate(date.getDate() + num);
        return this.getYmd(date);
    }

    static firstDayOfMonth(year, month) {
        return `${year}-${this.pad(month)}-01`;
    }

    static lastDayOfMonth(year, month) {
        const date = new Date(year, month, 0);
        return `${year}-${this.pad(month)}-${this.pad(date.getDate())}`;
    }

    // Get all dates between startDate and endDate
    // startDate and endDate should be in 'YYYY-MM-DD' format
    static getDatesBetween(startDate, endDate) {
        const dates = [];
        let current = new Date(startDate);
        const end = new Date(endDate); // convert once

        while (current <= end) {
            dates.push(this.getYmd(new Date(current))); // clone to avoid mutation issues
            current.setDate(current.getDate() + 1);
        }

        return dates;
    }

    static updateYear(dateStr, year = null) {
        if (!year) {
            return dateStr
        }
        const date = new Date(dateStr);
        date.setFullYear(year);
        return this.getYmd(date);
    }

    // convert 2025-05-01T00:00:00.000Z to 2025-05-01
    static theDate(dateString = null) {

        let date = '';
        if (dateString === 'local') {
            const lastEntryDate = localStorage.getItem('last_entry_date');
            if (lastEntryDate) {
                date = new Date(lastEntryDate);
            } else {
                date = new Date();
                date.setDate(date.getDate() - 1);
            }

        } else if (dateString) {
            date = new Date(dateString);
        } else {
            date = new Date();
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    static appDisplayDate(isoDate = null) {
        const date = new Date(isoDate);

        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short", // 'Aug'
            day: "numeric", // '7'
        });

        // remove year if it is current year
        const currentYear = new Date().getFullYear();
        if (date.getFullYear() === currentYear) {
            return formattedDate.replace(`, ${currentYear}`, '');
        }

        return formattedDate;
    }

    static getWeekday(dateString) {
        // dateString should be in "YYYY-MM-DD" format
        const [year, month, day] = dateString.split('-').map(Number);

        // month is 0-based in JS Date, so subtract 1
        const date = new Date(year, month - 1, day);

        // Array of weekday names
        const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

        return weekdays[date.getDay()];
    }

}